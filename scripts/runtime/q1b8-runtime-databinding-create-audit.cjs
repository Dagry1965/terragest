const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name.endsWith(".bak")) {
      continue;
    }

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, files);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(full);
    }
  }

  return files;
}

const files = walk(path.join(ROOT, "src", "runtime"));

const patterns = [
  "RuntimeDataBinding",
  "static async create",
  "FirestoreRuntimeMutation",
  "RuntimeMutationEngine",
  "create(module",
  "create(",
];

console.log("");
console.log("[Q1-B8-RUNTIME-DATABINDING-CREATE-AUDIT]");
console.log("");

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");

  if (!content.includes("RuntimeDataBinding") && !content.includes("FirestoreRuntimeMutation") && !content.includes("RuntimeMutationEngine")) {
    continue;
  }

  const rel = path.relative(ROOT, file);
  const lines = content.split(/\r?\n/);

  console.log("");
  console.log("============================================================");
  console.log("FILE:", rel);
  console.log("============================================================");

  for (const pattern of patterns) {
    const hits = [];

    lines.forEach((line, index) => {
      if (line.toLowerCase().includes(pattern.toLowerCase())) {
        hits.push(index);
      }
    });

    if (hits.length === 0) continue;

    console.log("");
    console.log("---- PATTERN:", pattern, "----");

    for (const hit of hits.slice(0, 6)) {
      const start = Math.max(0, hit - 5);
      const end = Math.min(lines.length, hit + 12);

      console.log(
        lines
          .slice(start, end)
          .map((line, idx) => String(start + idx + 1).padStart(4, "0") + ": " + line)
          .join("\n")
      );
      console.log("");
    }
  }
}

console.log("");
console.log("[NEXT]");
console.log("Copie-colle les sections RuntimeDataBinding / create.");
