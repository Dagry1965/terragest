const fs = require("fs");
const path = require("path");

const root = process.cwd();

const formRel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05E-C-FIX2-place-readonlyif-before-readonlyfields.md";

const formPath = path.join(root, formRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(formPath)) {
  fail("Missing file: " + formRel);
}

const backupPath = formPath + ".bak-rebuild-05e-c-fix2-place-readonlyif";
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

const visibleIndex = content.indexOf("  const visibleFields =");
if (visibleIndex === -1) {
  fail("Cannot find visibleFields declaration");
}

const readOnlyIndex = content.indexOf("  const readOnlyFields =");
if (readOnlyIndex === -1) {
  fail("Cannot find readOnlyFields declaration");
}

if (readOnlyIndex < visibleIndex) {
  fail("readOnlyFields is before visibleFields; cannot safely insert readonlyIfFields");
}

// Insert readonlyIfFields immediately before readOnlyFields.
content =
  content.slice(0, readOnlyIndex) +
  readonlyIfBlock +
  content.slice(readOnlyIndex);

fs.writeFileSync(formPath, content, "utf8");

const newVisibleIndex = content.indexOf("  const visibleFields =");
const newReadonlyIfIndex = content.indexOf("  const readonlyIfFields =");
const newReadOnlyIndex = content.indexOf("  const readOnlyFields =");

const checks = [
  {
    label: "visibleFields présent",
    ok: newVisibleIndex !== -1,
  },
  {
    label: "readonlyIfFields présent",
    ok: newReadonlyIfIndex !== -1,
  },
  {
    label: "readOnlyFields présent",
    ok: newReadOnlyIndex !== -1,
  },
  {
    label: "readonlyIfFields après visibleFields",
    ok: newReadonlyIfIndex > newVisibleIndex,
  },
  {
    label: "readonlyIfFields avant readOnlyFields",
    ok: newReadonlyIfIndex < newReadOnlyIndex,
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
  "# AMARKHYS-REBUILD-05E-C-FIX2 — Placement readonlyIfFields avant readOnlyFields",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Cause",
  "",
  "readOnlyFields utilisait readonlyIfFields avant sa déclaration.",
  "",
  "## Correction",
  "",
  "- Déplacement de readonlyIfFields après visibleFields.",
  "- Placement de readonlyIfFields avant readOnlyFields.",
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

console.log("[AMARKHYS-REBUILD-05E-C-FIX2] Place readonlyIfFields before readOnlyFields");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05E-C-FIX2] DONE");
console.log("[NEXT] pnpm build, then manual UI check.");