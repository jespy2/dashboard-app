import { Octokit } from "@octokit/rest";
import { request } from "undici";

const {
  GITHUB_TOKEN,
  GITHUB_REPOSITORY,
  GITHUB_PR_NUMBER,
  OPENAI_API_KEY,
  OPENAI_MODEL
} = process.env;

if (!GITHUB_TOKEN || !GITHUB_REPOSITORY || !GITHUB_PR_NUMBER) {
  console.error("Missing GITHUB env vars"); process.exit(1);
}

const [owner, repo] = GITHUB_REPOSITORY.split("/");
const prNumber = Number(GITHUB_PR_NUMBER);
const octokit = new Octokit({ auth: GITHUB_TOKEN });

// 1) Gather diffs
const { data: files } = await octokit.pulls.listFiles({ owner, repo, pull_number: prNumber });

const MAX_PATCH_CHARS = 12000;
let patches = "";
for (const f of files) {
  if (f.status === "removed") continue;
  const patch = f.patch || "";
  if (!patch) continue;
  const header = `\n---\nFILE: ${f.filename}\n`;
  if (patches.length + header.length + patch.length > MAX_PATCH_CHARS) break;
  patches += header + patch;
}

if (!patches) {
  await octokit.issues.createComment({
    owner, repo, issue_number: prNumber,
    body: "### 🤖 AI Review\nNo diffs detected in this PR (nothing to review)."
  });
  console.log("No diff; posted skip note.");
  process.exit(0);
}

// 2) Build prompt
const prompt = `
You are a senior frontend+devops reviewer. Provide a concise PR review.

Focus on:
1) correctness, bugs, edge cases
2) performance (React/Next/TS) + accessibility
3) security (secrets, XSS, auth)
4) DX & maintainability (naming, structure, tests)
5) CI/CD & infra impacts

Output:
- One-line verdict
- 4–8 actionable bullets
- A short next-steps checklist

PR DIFF:
${patches}
`.trim();

// 3) Call OpenAI (robustly)
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
        model: OPENAI_MODEL || "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2
      })
    });
    const aiJson = await aiRes.body.json();

    if (aiJson?.error) {
      console.error("OpenAI error:", aiJson.error);
      content = `AI error: ${aiJson.error.message || "unknown"}\n(Review posted with minimal info so the job is visible.)`;
    } else {
      content = aiJson?.choices?.[0]?.message?.content?.trim() || "";
      if (!content) {
        console.error("OpenAI returned no content. Full response:", JSON.stringify(aiJson).slice(0, 2000));
        content = "AI returned no content. Check model name, token limits, or API quota. See workflow logs for details.";
      }
    }
  } catch (e) {
    console.error("OpenAI request failed:", e);
    content = "AI request failed (network or rate limit). See logs; posting minimal notes for visibility.";
  }
}

// 4) Post a single comment to the PR
console.log(`About to comment on PR #${prNumber} in ${owner}/${repo}`);
await octokit.issues.createComment({
  owner, repo, issue_number: prNumber,
  body: `### 🤖 AI Review\n${content}`
});

console.log("AI review posted.");
