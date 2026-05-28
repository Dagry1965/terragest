const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const searchRoots = [
  path.join(ROOT, "src", "components"),
  path.join(ROOT, "src", "runtime"),
  path.join(ROOT, "src", "app"),
];

const targets = [
  "ERPOperationalExpandedChildren",
  "ExpandedChildren",
  "OperationalExpanded",
  "composition.children",
  "RuntimeDataBinding.list",
];

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) {
    return results;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === ".git"
      ) {
        continue;
      }

      walk(fullPath, results);
      continue;
    }

    if (
      entry.isFile() &&
      (
        entry.name.endsWith(".ts") ||
        entry.name.endsWith(".tsx") ||
        entry.name.endsWith(".js") ||
        entry.name.endsWith(".jsx")
      )
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

const files = searchRoots.flatMap((root) => walk(root));

const matches = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");

  const found = targets.filter((target) => content.includes(target));

  if (found.length > 0) {
    matches.push({
      file: path.relative(ROOT, file),
      found,
    });
  }
}

console.log("");
console.log("[Q2-F-D-A2] Locate expanded children implementation");
console.log("");

if (matches.length === 0) {
  console.log("[FAIL] No matching file found");
  process.exit(1);
}

for (const match of matches) {
  console.log(`[MATCH] ${match.file}`);
  console.log(`        ${match.found.join(", ")}`);
}

console.log("");
console.log(`[SUMMARY] Matches: ${matches.length}`);
console.log("");
console.log("[DONE] Send this output before wiring.");
