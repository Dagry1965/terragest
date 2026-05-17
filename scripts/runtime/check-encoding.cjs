const fs = require("fs");
const path = require("path");

const root = process.cwd();

/**
 * Produit runtime à protéger strictement.
 * Les scripts historiques de correction sont exclus pour éviter les faux positifs
 * du type .replaceAll("VÃ©hicule", "Véhicule").
 */
const targets = [
  "src/runtime/modules/generated",
  "src/runtime/business-rules",
  "src/runtime/domain",
  "src/runtime/modules/v2",
  "src/runtime/modules/factory",
  "src/runtime/README.md",
  "src/components/erp",
];

const mojibakePatterns = [
  "Ã©",
  "Ã¨",
  "Ãª",
  "Ã«",
  "Ã ",
  "Ã¢",
  "Ã´",
  "Ã»",
  "Ã§",
  "Ã‰",
  "Ã€",
  "Ã‡",
  "â€™",
  "â€œ",
  "â€",
  "â€¢",
  "â†",
  "Â",
];

const allowedExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".cjs",
  ".mjs",
  ".json",
  ".md",
]);

function walk(target, files = []) {
  const fullTarget = path.join(root, target);

  if (!fs.existsSync(fullTarget)) {
    return files;
  }

  const stat = fs.statSync(fullTarget);

  if (stat.isFile()) {
    files.push(fullTarget);
    return files;
  }

  for (const entry of fs.readdirSync(fullTarget, { withFileTypes: true })) {
    const fullPath = path.join(fullTarget, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === ".git"
      ) {
        continue;
      }

      walk(path.relative(root, fullPath), files);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const ext = path.extname(entry.name);

    if (allowedExtensions.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

function scanFile(file) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);
  const hits = [];

  lines.forEach((line, index) => {
    const matchedPatterns =
      mojibakePatterns.filter((pattern) =>
        line.includes(pattern)
      );

    if (matchedPatterns.length > 0) {
      hits.push({
        line: index + 1,
        patterns: matchedPatterns,
        text: line.trim(),
      });
    }
  });

  return hits;
}

const files =
  targets.flatMap((target) =>
    walk(target)
  );

const results = [];

for (const file of files) {
  const hits = scanFile(file);

  if (hits.length > 0) {
    results.push({
      file,
      hits,
    });
  }
}

if (results.length === 0) {
  console.log("OK: no mojibake detected in protected runtime sources.");
  process.exit(0);
}

console.log("");
console.log("MOJIBAKE DETECTED IN PROTECTED SOURCES");
console.log("======================================");
console.log("");

for (const result of results) {
  console.log(path.relative(root, result.file));

  for (const hit of result.hits.slice(0, 20)) {
    console.log(
      `  L${hit.line} [${hit.patterns.join(", ")}] ${hit.text}`
    );
  }

  if (result.hits.length > 20) {
    console.log(`  ... ${result.hits.length - 20} more hits`);
  }

  console.log("");
}

console.log(`Files with mojibake: ${results.length}`);
console.log("Encoding check failed.");
process.exit(1);
