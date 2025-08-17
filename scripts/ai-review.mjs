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

if (!OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY"); process.exit(1);
}

const [owner, repo] = GITHUB_REPOSITORY.split("/");
const prNumber = Number(GITHUB_PR_NUMBER);
const octokit = new Octokit({ auth: GITHUB_TOKEN });

/** Fetch PR files (diffs) */
const { data: files } = await octokit.pulls.listFiles({ owner, repo, pull_number: prNumber });

const MAX_PATCH_CHARS = 12000; // keep prompt reasonable
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
  console.log("No diff to review; exiting.");
  process.exit(0);
}

/** Build prompt */
const prompt = `
You are a senior frontend+devops reviewer. Provide a concise review for the PR diff below.

Focus on:
1) correctness, bugs, and edge cases
2) performance & rendering (React/Next/TS)
3) security (secrets, SSRF/XSS, auth checks)
4) DX & maintainability (naming, structure, tests)
5) CI/CD & infra impacts

Output format:
- Title line with an overall verdict (e.g., "LGTM with nits" or "Changes requested")
- 4-8 bullet points with actionable suggestions
- A short "next steps" checklist

PR DIFF:
${patches}
`;

/** Call OpenAI (responses API) */
const model = OPENAI_MODEL || "gpt-4o-mini";
const aiRes = await request("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2
  })
});
const aiJson = await aiRes.body.json();
const content = aiJson?.choices?.[0]?.message?.content?.trim();

if (!content) {
  console.log("No AI content produced; exiting.");
  process.exit(0);
}

/** Post a single summary comment on the PR */
await octokit.issues.createComment({
  owner, repo,
  issue_number: prNumber,
  body: `### 🤖 AI Review\n${content}`
});

console.log("AI review posted.");
