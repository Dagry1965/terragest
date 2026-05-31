const fs = require("fs");
const path = require("path");

const root = process.cwd();

const formRel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05C-FIX2-remove-business-status-render.md";

const formPath = path.join(root, formRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(formPath)) {
  fail("Missing file: " + formRel);
}

const backupPath = formPath + ".bak-rebuild-05c-fix2-remove-business-status-render";
fs.copyFileSync(formPath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(formPath, "utf8");
const before = content;

const startMarker = "              {businessStatusAction ? (";
const start = content.indexOf(startMarker);

if (start === -1) {
  fail("Cannot find businessStatusAction render block start");
}

/**
 * The businessStatusAction JSX block is followed by a closing:
 *               ) : null}
 *
 * We remove the whole conditional render block.
 */
const endMarker = "              ) : null}";
const end = content.indexOf(endMarker, start);

if (end === -1) {
  fail("Cannot find businessStatusAction render block end");
}

const replacement = `              {/* AMARKHYS-REBUILD-05C-FIX2
                  Form-level business/status actions are disabled.
                  Runtime actions are rendered by ERPRuntimePage / ERPRuntimeActionBar. */}
`;

content = content.slice(0, start) + replacement + content.slice(end + endMarker.length);

fs.writeFileSync(formPath, content, "utf8");

const checks = [
  {
    label: "rendu businessStatusAction supprimé",
    ok: !content.includes("{businessStatusAction ? ("),
  },
  {
    label: "ancienne lecture businessStatusAction.label supprimée",
    ok: !content.includes("{businessStatusAction.label}"),
  },
  {
    label: "marker FIX2 présent",
    ok: content.includes("AMARKHYS-REBUILD-05C-FIX2"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-05C-FIX2 — Suppression rendu businessStatusAction",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Cause",
  "",
  "Après neutralisation de getBusinessStatusAction() et handleBusinessStatusAction(), le JSX lisait encore businessStatusAction.label, que TypeScript déduit comme never.",
  "",
  "## Correction",
  "",
  "Le bloc JSX de rendu businessStatusAction est supprimé. Les actions métier restent portées par ERPRuntimePage / ERPRuntimeActionBar.",
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

console.log("[AMARKHYS-REBUILD-05C-FIX2] Remove businessStatusAction render");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05C-FIX2] DONE");