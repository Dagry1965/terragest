const fs = require("fs");
const path = require("path");

const root = process.cwd();

const formRel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05E-C-FIX1-move-readonlyif-fields.md";

const formPath = path.join(root, formRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(formPath)) {
  fail("Missing file: " + formRel);
}

const backupPath = formPath + ".bak-rebuild-05e-c-fix1-move-readonlyif-fields";
fs.copyFileSync(formPath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(formPath, "utf8");
const before = content;

const blockRegex = /  const readonlyIfFields =\r?\n[\s\S]*?          \.map\(\(field\) => field\.key\);\r?\n\r?\n/;

const match = content.match(blockRegex);

if (!match) {
  fail("Cannot find readonlyIfFields block");
}

const readonlyIfBlock = match[0];

// Remove current misplaced block.
content = content.replace(blockRegex, "");

// Find visibleFields declaration.
const visibleIndex = content.indexOf("  const visibleFields =");

if (visibleIndex === -1) {
  fail("Cannot find visibleFields declaration");
}

// Find the end of visibleFields declaration.
// Usually it ends before nonRelationFields or relationFields.
const candidateMarkers = [
  "  const nonRelationFields =",
  "  const relationFields =",
  "  const statusGovernance =",
];

let insertIndex = -1;

for (const marker of candidateMarkers) {
  const idx = content.indexOf(marker, visibleIndex);
  if (idx !== -1 && (insertIndex === -1 || idx < insertIndex)) {
    insertIndex = idx;
  }
}

if (insertIndex === -1) {
  fail("Cannot find insertion point after visibleFields");
}

// Insert readonlyIfFields after visibleFields and before derived field groups.
content = content.slice(0, insertIndex) + readonlyIfBlock + content.slice(insertIndex);

fs.writeFileSync(formPath, content, "utf8");

const newVisibleIndex = content.indexOf("  const visibleFields =");
const newReadonlyIndex = content.indexOf("  const readonlyIfFields =");
const newLockedIndex = content.indexOf("  const lockedFields =");

const checks = [
  {
    label: "readonlyIfFields présent",
    ok: newReadonlyIndex !== -1,
  },
  {
    label: "visibleFields présent",
    ok: newVisibleIndex !== -1,
  },
  {
    label: "readonlyIfFields placé après visibleFields",
    ok: newVisibleIndex !== -1 && newReadonlyIndex !== -1 && newReadonlyIndex > newVisibleIndex,
  },
  {
    label: "readonlyIfFields placé avant lockedFields si lockedFields existe après",
    ok: newLockedIndex === -1 || newReadonlyIndex < newLockedIndex || newLockedIndex < newVisibleIndex,
  },
  {
    label: "readonlyIfFields injecté dans readOnlyFields",
    ok: content.includes("...readonlyIfFields"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-05E-C-FIX1 — Déplacement readonlyIfFields",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Cause",
  "",
  "readonlyIfFields était calculé avant la déclaration de visibleFields.",
  "",
  "## Correction",
  "",
  "- Déplacement de readonlyIfFields juste après visibleFields.",
  "- Conservation de l'injection dans readOnlyFields.",
  "",
  "## Checks",
  "",
  ...checks.map((c) => `- ${c.ok ? "OK" : "FAIL"} — ${c.label}`),
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-05E-C-FIX1] Move readonlyIfFields after visibleFields");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05E-C-FIX1] DONE");
console.log("[NEXT] pnpm build, then manual UI check.");