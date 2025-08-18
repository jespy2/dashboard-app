import { Octokit } from "@octokit/rest";
import { request } from "undici";

const {
  GITHUB_TOKEN,
  GITHUB_REPOSITORY,
  GITHUB_PR_NUMBER,
  OPENAI_API_KEY,
  OPENAI_MODEL,          // default "gpt-4o-mini" set in workflow env
  DEEP_MODEL,            // "gpt-4o"
  DEEP_TRIGGER_LABEL,    // "deep-review"
  WORKFLOW_INPUT_MODEL,  // manual override from workflow_dispatch
  MAX_PATCH_CHARS: MAX_PATCH_CHARS_ENV
} = process.env;

if (!GITHUB_TOKEN || !GITHUB_REPOSITORY || !GITHUB_PR_NUMBER) {
  console.error("Missing GITHUB env vars"); process.exit(1);
}

const [owner, repo] = GITHUB_REPOSITORY.split("/");
const prNumber = Number(GITHUB_PR_NUMBER);
const octokit = new Octokit({ auth: GITHUB_TOKEN });

/** ---------- Model selection: input > label > default ---------- */
let model = OPENAI_MODEL || "gpt-4o-mini";
try {
  if (WORKFLOW_INPUT_MODEL && ["gpt-4o-mini", "gpt-4o"].includes(WORKFLOW_INPUT_MODEL)) {
    model = WORKFLOW_INPUT_MODEL;
  } else {
    const { data: pr } = await octokit.pulls.get({ owner, repo, pull_number: prNumber });
    const hasDeep = (pr.labels || []).some(l => (l.name || "").toLowerCase() === (DEEP_TRIGGER_LABEL || "deep-review"));
    if (hasDeep) model = DEEP_MODEL || "gpt-4o";
  }
} catch { /* default to mini */ }

/** ---------- Budgeting ---------- */
const MAX_PATCH_CHARS = Number(MAX_PATCH_CHARS_ENV || "12000");   // global budget
const PER_FILE_CAP = Math.max(1500, Math.floor(MAX_PATCH_CHARS * 0.25)); // per-file ceiling

/** ---------- File filters ---------- */
// Skip obviously noisy/huge/non-text files
const SKIP_FILE_RE = /\.(lock|min\.js|map|png|jpe?g|gif|webp|svg|ico|mp4|mov|zip|tgz|gz|woff2?)$/i;

// Priority buckets
const PRI_1 = /\.(tsx|ts)$/i;
const PRI_2 = /\.(jsx|js)$/i;
const PRI_3 = /\.(json|ya?ml|md|mdx|graphql|gql|css|scss|less|toml|ini|env|conf|cjs|mjs)$/i;

/** ---------- Collect & prioritize diffs ---------- */
const { data: files } = await octokit.pulls.listFiles({ owner, repo, pull_number: prNumber });

// shape: { filename, patch?, status }
const candidateFiles = files
  .filter(f => f.status !== "removed")
  .filter(f => !SKIP_FILE_RE.test(f.filename))
  .map(f => ({ name: f.filename, patch: f.patch || "", p: priorityOf(f.filename) }))
  .filter(f => f.patch && f.patch.trim().length > 0);

// Sort by priority first, then by filename length (shorter paths first as a weak proxy for app code)
candidateFiles.sort((a, b) => (a.p - b.p) || (a.name.length - b.name.length));

let patches = "";
for (const f of candidateFiles) {
  const header = `\n---\nFILE: ${f.name}\n`;
  const slice = f.patch.length > PER_FILE_CAP ? f.patch.slice(0, PER_FILE_CAP) + "\n... (truncated)\n" : f.patch;
  if (patches.length + header.length + slice.length > MAX_PATCH_CHARS) break;
  patches += header + slice;
}

if (!patches) {
  await postPRComment(octokit, owner, repo, prNumber,
    "### 🤖 AI Review\nNo diffs selected for review (files were skipped or too large). " +
    "Consider splitting the PR or reducing generated/minified files."
  );
  console.log("No usable diff; posted skip note.");
  process.exit(0);
}

/** ---------- Prompt & call LLM ---------- */
const prompt = `
You are a senior frontend + devops reviewer. Provide a concise, actionable review.

Priorities:
1) Correctness, bugs, edge cases, data flow
2) Performance & rendering (React/Next/TS), accessibility
3) Security (secrets, XSS, SSRF, auth), error handling
4) Maintainability & DX (naming, structure, tests)
5) CI/CD & infra impacts (workflows, Docker, IaC)

Rules:
- Be specific; reference code hunks by FILE name and lines if obvious
- Prefer fixes over vague suggestions
- Include a short "Next steps" checklist

PR DIFF (truncated to budget, prioritized by file type):
${patches}
`.trim();

let content = "";
if (!OPENAI_API_KEY) {
  content = "AI disabled (missing OPENAI_API_KEY). Add it as a repo secret to enable automated reviews.";
} else {
  try {
    const aiRes = await request("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2
      })
    });
    const aiJson = await aiRes.body.json();
    if (aiJson?.error) {
      console.error("OpenAI error:", aiJson.error);
      content = `AI error: ${aiJson.error.message || "unknown"}\n(Posting minimal notes so the run is visible.)`;
    } else {
      content = aiJson?.choices?.[0]?.message?.content?.trim() || "";
      if (!content) {
        console.error("OpenAI returned no content. Full response:", JSON.stringify(aiJson).slice(0, 2000));
        content = "AI returned no content. Verify model, quota, or token limits. See workflow logs.";
      }
    }
  } catch (e) {
    console.error("OpenAI request failed:", e);
    content = "AI request failed (network or rate limit). See logs; posting minimal notes for visibility.";
  }
}

console.log(`Commenting on PR #${prNumber} using model=${model} (budget=${MAX_PATCH_CHARS}, per-file=${PER_FILE_CAP})`);
await postPRComment(octokit, owner, repo, prNumber, `### 🤖 AI Review (model: \`${model}\`)\n${content}`);
console.log("AI review posted.");

/** ---------- helpers ---------- */
function priorityOf(name) {
  if (PRI_1.test(name)) return 1;
  if (PRI_2.test(name)) return 2;
  if (PRI_3.test(name)) return 3;
  return 4;
}

async function postPRComment(octokit, owner, repo, issue_number, body) {
  return octokit.issues.createComment({ owner, repo, issue_number, body });
}
