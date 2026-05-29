const fs = require("fs");
const path = require("path");

const root = process.cwd();

const includeDirs = [
  "src/app",
  "src/components",
  "src/runtime",
];

const interestingNames = [
  "ProductStockOperationalHub",
  "RuntimeProductStockOperationalHub",
  "ERPRecordHub",
  "RecordHub",
  "produitsauto/hub",
];

const mojibakePatterns = [
  "Ã",
  "Â",
  "â",
  "\uFFFD",
];

const results = [];
const mojibakeHits = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === ".git"
      ) {
        continue;
      }
      walk(full);
      continue;
    }

    if (!/\.(ts|tsx|js|jsx|cjs|md)$/.test(entry.name)) continue;

    let content = "";
    try {
      content = fs.readFileSync(full, "utf8");
    } catch {
      continue;
    }

    const relative = path.relative(root, full).replace(/\\/g, "/");

    const matchedTerms = interestingNames.filter((term) =>
      content.includes(term) || relative.includes(term)
    );

    if (matchedTerms.length > 0) {
      results.push({
        file: relative,
        terms: matchedTerms,
      });
    }

    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      const found = mojibakePatterns.filter((pattern) => line.includes(pattern));
      if (found.length > 0) {
        mojibakeHits.push({
          file: relative,
          line: index + 1,
          patterns: found,
          text: line.slice(0, 220),
        });
      }
    });
  }
}

for (const dir of includeDirs) {
  walk(path.join(root, dir));
}

console.log("[Q2-OK-A2] Discover Product / Stock Hub files");
console.log("[ROOT]", root);
console.log("");

console.log("[MATCHED_FILES]", results.length);
for (const result of results) {
  console.log(`- ${result.file}`);
  console.log(`  terms: ${result.terms.join(", ")}`);
}

console.log("");
console.log("[MOJIBAKE_HITS]", mojibakeHits.length);

for (const hit of mojibakeHits.slice(0, 80)) {
  console.log(`- ${hit.file}:${hit.line}`);
  console.log(`  patterns: ${hit.patterns.join(", ")}`);
  console.log(`  text: ${hit.text}`);
}

if (mojibakeHits.length > 80) {
  console.log(`... ${mojibakeHits.length - 80} more mojibake hits not printed`);
}

const reportLines = [];

reportLines.push("# Q2-OK-A2 Product / Stock Hub file discovery");
reportLines.push("");
reportLines.push("## Matched files");
reportLines.push("");

for (const result of results) {
  reportLines.push(`- \`${result.file}\` — ${result.terms.join(", ")}`);
}

reportLines.push("");
reportLines.push("## Mojibake hits");
reportLines.push("");

if (mojibakeHits.length === 0) {
  reportLines.push("No mojibake hit detected.");
} else {
  for (const hit of mojibakeHits) {
    reportLines.push(`- \`${hit.file}:${hit.line}\` — patterns: ${hit.patterns.join(", ")}`);
    reportLines.push(`  - \`${hit.text.replace(/`/g, "'")}\``);
  }
}

const reportPath = path.join(
  root,
  "docs/audits/Q2-OK-A2-product-stock-hub-file-discovery.md"
);

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

console.log("");
console.log("[REPORT]", path.relative(root, reportPath));

if (results.length === 0) {
  console.log("[FAIL_HIGH] No Product / Stock Hub related file found.");
  process.exitCode = 1;
}