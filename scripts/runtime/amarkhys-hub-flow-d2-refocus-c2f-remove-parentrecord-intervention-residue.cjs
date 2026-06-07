const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "hub",
  "ERPClientOperationalSheet.tsx"
);

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "AMARKHYS-HUB-FLOW-D2-REFOCUS-C2F-remove-parentrecord-intervention-residue.md"
);

const BACKUP = `${TARGET}.bak-c2f-remove-parentrecord-intervention-residue`;

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function writeUtf8NoBom(filePath, content) {
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
}

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C2F] Remove parentRecord={intervention} orphan residue");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = fs.readFileSync(TARGET, "utf8");
const lines = before.split(/\r?\n/);

writeUtf8NoBom(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

const residueIndex = lines.findIndex((line) => line.includes("parentRecord={intervention}"));

if (residueIndex === -1) {
  fail("Could not find parentRecord={intervention}. Nothing to remove.");
}

const childIndex = lines.findIndex((line) => line.includes("child={lignesInterventionChild}"));

if (childIndex === -1) {
  fail("Could not find child={lignesInterventionChild}. Nothing to remove.");
}

if (Math.abs(childIndex - residueIndex) > 5) {
  fail("Safety check failed: parentRecord and child markers are not in the same residue block.");
}

/**
 * From the previous inspection, the orphan residue is:
 *
 *   {isSelected ? (
 *     <div ...>
 *       <ERPRelatedRecordsPanel ... />
 *     </div>
 *   ) : null}
 * </div>
 * );
 * })}
 *
 * We locate the start by walking upward to "{isSelected ? ("
 * and the end by walking downward to the line containing "})}".
 */
let start = residueIndex;
while (start >= 0 && !lines[start].includes("{isSelected ? (")) {
  start--;
}

if (start < 0) {
  fail("Could not find start of orphan residue: {isSelected ? (");
}

let end = residueIndex;
while (end < lines.length && !lines[end].includes("})}")) {
  end++;
}

if (end >= lines.length) {
  fail("Could not find end of orphan residue: })}");
}

const removedBlock = lines.slice(start, end + 1).join("\n");

const requiredInsideRemovedBlock = [
  "{isSelected ? (",
  "ERPRelatedRecordsPanel",
  "parentRecord={intervention}",
  "child={lignesInterventionChild}",
  "})}",
];

for (const marker of requiredInsideRemovedBlock) {
  if (!removedBlock.includes(marker)) {
    fail(`Safety check failed: removed block does not contain ${marker}`);
  }
}

const nextFallbackLine = lines.slice(end + 1, end + 6).join("\n");
if (!nextFallbackLine.includes(") : (")) {
  fail("Safety check failed: expected ternary fallback immediately after removed block.");
}

const afterLines = [
  ...lines.slice(0, start),
  ...lines.slice(end + 1),
];

const after = afterLines.join("\n");

const checks = [
  ["component changed", after !== before],
  ["orphan parentRecord removed", !after.includes("parentRecord={intervention}")],
  ["orphan child lignes removed", !after.includes("child={lignesInterventionChild}")],
  ["compact table marker preserved", after.includes("INTERVENTION_COMPACT_ROW")],
  ["interventions list preserved", after.includes("interventionsForSelectedRendezvous.map")],
  ["fallback preserved", after.includes("Aucune intervention")],
  ["factures downstream preserved", after.includes("child={facturesChild}")],
  ["encaissements downstream preserved", after.includes("InvoicePaymentsHistory")],
  ["rdv block preserved", after.includes("Choisir un rendez-vous") || after.includes("Choisir un rendez-vous".replace("é", "é"))],
  ["intervention block preserved", after.includes("Interventions")],
];

const okCount = checks.filter(([, passed]) => passed).length;
const failCount = checks.length - okCount;

if (failCount > 0) {
  const failed = checks
    .filter(([, passed]) => !passed)
    .map(([name]) => name)
    .join(", ");
  fail(`Checks failed before write: ${failed}`);
}

writeUtf8NoBom(TARGET, after);
ok(`Written: ${path.relative(ROOT, TARGET)}`);

const report = [
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS-C2F — Remove parentRecord intervention residue",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  `Backup: \`${path.relative(ROOT, BACKUP)}\``,
  "",
  "## Removed block",
  "",
  "```tsx",
  removedBlock,
  "```",
  "",
  "## Checks",
  "",
  ...checks.map(([name, passed]) => `- ${passed ? "OK" : "FAIL"} — ${name}`),
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
writeUtf8NoBom(REPORT, report);

console.log(`[REPORT] ${path.relative(ROOT, REPORT)}`);
console.log(`[REMOVED_LINES] ${start + 1}-${end + 1}`);
console.log(`[OK] ${okCount}`);
console.log(`[FAIL] ${failCount}`);
console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C2F] DONE");
console.log("[NEXT] pnpm build");