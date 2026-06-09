/**
 * Pushes the CoinGuard workspace to GitHub using the Git Data API.
 * Sequential blob upload at ~7 req/s; skips files that exceed proxy body limit.
 */
import { ReplitConnectors } from "@replit/connectors-sdk";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const connectors = new ReplitConnectors();
const OWNER  = "kalidevelopedit";
const REPO   = "coin-guard";
const BRANCH = "main";
const ROOT   = "/home/runner/workspace";

const IGNORE_DIRS = new Set([
  ".git", "node_modules", ".cache", "dist", ".tsbuildinfo",
  "__pycache__", ".breakpoints", ".local", ".agents",
]);
const IGNORE_EXT = new Set([".log", ".map"]);
// Proxy body limit is roughly 1MB; base64 inflates by 4/3 → raw limit ~720KB
const MAX_BYTES = 720 * 1024;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// Token-bucket: 7 req/s, burst 3
let tokens = 3;
let lastRefill = Date.now();
async function rateLimit() {
  while (true) {
    const now = Date.now();
    tokens = Math.min(3, tokens + ((now - lastRefill) / 1000) * 7);
    lastRefill = now;
    if (tokens >= 1) { tokens -= 1; return; }
    await sleep(50);
  }
}

async function api(path, opts = {}) {
  await rateLimit();
  const res = await connectors.proxy("github", path, {
    method: opts.method || "GET",
    body:   opts.body ? JSON.stringify(opts.body) : undefined,
    headers: { "Content-Type": "application/json" },
  });
  const text = await res.text();
  if (res.status === 429) {
    console.log("\n  ⏳ 429 — waiting 2s...");
    await sleep(2000);
    return api(path, opts);
  }
  if (!res.ok) throw new Error(`${res.status} ${path}: ${text.slice(0, 200)}`);
  return JSON.parse(text);
}

function walkFiles(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    if (IGNORE_DIRS.has(e)) continue;
    const full = join(dir, e);
    const st   = statSync(full);
    if (st.isDirectory()) { out.push(...walkFiles(full)); continue; }
    const ext = e.includes(".") ? "." + e.split(".").pop().toLowerCase() : "";
    if (IGNORE_EXT.has(ext)) continue;
    out.push({ path: full, size: st.size });
  }
  return out;
}

async function uploadBlobs(entries) {
  const items   = [];
  const skipped = [];

  for (let i = 0; i < entries.length; i++) {
    const { path: f, size } = entries[i];
    const rel = relative(ROOT, f);

    if (size > MAX_BYTES) {
      skipped.push(rel);
      process.stdout.write(`  blobs: ${i + 1}/${entries.length} (skip large)\r`);
      continue;
    }

    try {
      const data = await api(`/repos/${OWNER}/${REPO}/git/blobs`, {
        method: "POST",
        body: { content: readFileSync(f).toString("base64"), encoding: "base64" },
      });
      items.push({ path: rel, mode: "100644", type: "blob", sha: data.sha });
    } catch (err) {
      if (err.message.startsWith("413")) {
        skipped.push(rel);
      } else {
        throw err;
      }
    }

    if ((i + 1) % 10 === 0 || i === entries.length - 1) {
      process.stdout.write(`  blobs: ${i + 1}/${entries.length}\r`);
    }
  }

  console.log(`  blobs: ${entries.length}/${entries.length} ✓   (${skipped.length} skipped)`);
  if (skipped.length) console.log("  Skipped (too large):\n   " + skipped.join("\n   "));
  return items;
}

async function getBase() {
  try {
    const ref    = await api(`/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`);
    const commit = await api(`/repos/${OWNER}/${REPO}/git/commits/${ref.object.sha}`);
    return { baseSha: ref.object.sha, baseTree: commit.tree.sha };
  } catch { return null; }
}

async function main() {
  console.log("\n🌱 Checking repo state...");
  let base = await getBase();
  if (!base) {
    const init = await api(`/repos/${OWNER}/${REPO}/contents/.gitkeep`, {
      method: "PUT",
      body: { message: "init", content: Buffer.from("").toString("base64") },
    });
    base = { baseSha: init.commit.sha, baseTree: init.commit.tree.sha };
    console.log(`  Bootstrap: ${base.baseSha}`);
  } else {
    console.log(`  Base commit: ${base.baseSha}`);
  }

  console.log(`\n📦 Collecting files...`);
  const entries = walkFiles(ROOT).filter(e => relative(ROOT, e.path) !== ".gitkeep");
  const total   = entries.reduce((s, e) => s + e.size, 0);
  console.log(`  ${entries.length} files  (${(total / 1024 / 1024).toFixed(1)} MB total)`);

  console.log("\n🔵 Uploading blobs (7 req/s)...");
  const treeItems = await uploadBlobs(entries);

  console.log("\n🌲 Creating tree...");
  const tree = await api(`/repos/${OWNER}/${REPO}/git/trees`, {
    method: "POST",
    body: {
      base_tree: base.baseTree,
      tree: [
        ...treeItems,
        { path: ".gitkeep", mode: "100644", type: "blob", sha: null },
      ],
    },
  });
  console.log(`  Tree: ${tree.sha}`);

  console.log("\n💾 Creating commit...");
  const commit = await api(`/repos/${OWNER}/${REPO}/git/commits`, {
    method: "POST",
    body: {
      message: "chore: full CoinGuard workspace — initial push",
      tree: tree.sha,
      parents: [base.baseSha],
      author: {
        name:  "kalidevelopedit",
        email: "kalidevelopedit@users.noreply.github.com",
        date:  new Date().toISOString(),
      },
    },
  });
  console.log(`  Commit: ${commit.sha}`);

  console.log("\n🔗 Updating branch...");
  await api(`/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    method: "PATCH",
    body: { sha: commit.sha, force: true },
  });

  console.log(`\n✅  https://github.com/${OWNER}/${REPO}\n`);
}

main().catch(e => { console.error("\n❌", e.message); process.exit(1); });
