const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const filePath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalFilters.tsx"
);

function fail(message) {
  console.log("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  fail("ERPOperationalFilters.tsx not found");
}

let content = fs.readFileSync(filePath, "utf8");

const backupPath = filePath + ".bak-q2i-e-k2-search-without-filters";
fs.writeFileSync(backupPath, content, "utf8");

console.log("[BACKUP]", path.relative(ROOT, backupPath));

const oldBlock = `  if (filters.length === 0) {
    return null;
  }

`;

if (!content.includes(oldBlock)) {
  fail("Expected early return block not found");
}

content = content.replace(oldBlock, "");

fs.writeFileSync(filePath, content, "utf8");

const updated = fs.readFileSync(filePath, "utf8");

const checks = [
  {
    label: "ERPOperationalFilters no longer returns null when filters are empty",
    ok: !updated.includes("if (filters.length === 0)") && !updated.includes("return null;"),
  },
  {
    label: "Search prop preserved",
    ok: updated.includes("search: string") && updated.includes("search,"),
  },
  {
    label: "onSearchChange prop preserved",
    ok: updated.includes("onSearchChange") && updated.includes("event.target.value"),
  },
  {
    label: "Search input still rendered",
    ok: updated.includes("Recherche rapide") && updated.includes("<input"),
  },
  {
    label: "Filter map still preserved",
    ok: updated.includes("filters.slice(0, 3).map"),
  },
  {
    label: "Reset still clears search",
    ok: updated.includes('onSearchChange("")'),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-I-E-K2] Keep operational search visible without filters");
console.log("");

for (const check of checks) {
  console.log(`${check.ok ? "[OK]" : "[FAIL]"} ${check.label}`);
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.length - failed.length} FAIL: ${failed.length}`);

if (failed.length > 0) {
  process.exit(1);
}

console.log("");
console.log("[DONE] Search now renders even when operational.filters is empty.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
