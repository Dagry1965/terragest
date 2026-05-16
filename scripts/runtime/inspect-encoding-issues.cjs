const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const folders = [
  "src/components/erp/forms",
  "src/components/erp/runtime",
  "src/runtime/modules/generated",
  "src/runtime/modules/definitions/generated",
  "src/app",
];

const mojibakePatterns = [
  "Ã",
  "Â",
  "â€”",
  "â€“",
  "â€˜",
  "â€™",
  "â€œ",
  "â€",
  "â€¦",
  "CrÃ",
  "mÃ",
  "donnÃ",
  "gÃ",
  "rÃ",
  "DÃ",
  "VÃ",
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      walk(full, files);
      continue;
    }

    if (
      entry.name.endsWith(".ts") ||
      entry.name.endsWith(".tsx")
    ) {
      files.push(full);
    }
  }

  return files;
}

const files = folders.flatMap((folder) =>
  walk(path.join(ROOT, folder))
);

console.log("");
console.log("=== ENCODING ISSUES AUDIT ===");
console.log("");

let total = 0;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);

  const hits = [];

  lines.forEach((line, index) => {
    for (const pattern of mojibakePatterns) {
      if (line.includes(pattern)) {
        hits.push({
          line: index + 1,
          pattern,
          text: line.trim(),
        });
        break;
      }
    }
  });

  if (hits.length > 0) {
    total += hits.length;

    console.log("FILE:", path.relative(ROOT, file));

    for (const hit of hits) {
      console.log(`  L${hit.line} ${hit.text}`);
    }

    console.log("");
  }
}

console.log("TOTAL HITS:", total);