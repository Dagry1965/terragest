const fs = require("fs");
const path = require("path");

const root = process.cwd();

const formRel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05C-FIX3-remove-remaining-business-status-render.md";

const formPath = path.join(root, formRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(formPath)) {
  fail("Missing file: " + formRel);
}

const backupPath = formPath + ".bak-rebuild-05c-fix3-remove-remaining-business-status-render";
fs.copyFileSync(formPath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(formPath, "utf8");
const before = content;

function removeConditionalBlock(source, startNeedle) {
  let removed = 0;
  let output = source;

  while (true) {
    const start = output.indexOf(startNeedle);
    if (start === -1) break;

    const endPatterns = [
      ") : null}",
      ") : null }",
      ") : null}",
      ") : null }",
    ];

    let bestEnd = -1;
    let bestPattern = "";

    for (const pattern of endPatterns) {
      const idx = output.indexOf(pattern, start);
      if (idx !== -1 && (bestEnd === -1 || idx < bestEnd)) {
        bestEnd = idx;
        bestPattern = pattern;
      }
    }

    if (bestEnd === -1) {
      fail("Cannot find end of businessStatusAction conditional render block");
    }

    const replacement = `{/* AMARKHYS-REBUILD-05C-FIX3: form-level business/status action render removed. Runtime actions are rendered by ERPRuntimePage / ERPRuntimeActionBar. */}`;

    output = output.slice(0, start) + replacement + output.slice(bestEnd + bestPattern.length);
    removed++;
  }

  return { output, removed };
}

let totalRemoved = 0;

for (const needle of [
  "{businessStatusAction ? (",
  "businessStatusAction ? (",
]) {
  const result = removeConditionalBlock(content, needle);
  content = result.output;
  totalRemoved += result.removed;
}

// Sécurité : si une lecture isolée reste, elle est remplacée par un commentaire neutre.
content = content.replace(/\{businessStatusAction\.label\}/g, "{/* businessStatusAction.label removed by AMARKHYS-REBUILD-05C-FIX3 */}");

fs.writeFileSync(formPath, content, "utf8");

const checks = [
  {
    label: "au moins un bloc businessStatusAction supprimé ou fichier déjà nettoyé",
    ok: totalRemoved > 0 || !before.includes("businessStatusAction.label"),
  },
  {
    label: "plus aucune lecture businessStatusAction.label",
    ok: !content.includes("businessStatusAction.label"),
  },
  {
    label: "plus aucun rendu conditionnel businessStatusAction",
    ok: !content.includes("businessStatusAction ? ("),
  },
  {
    label: "marker FIX3 présent",
    ok: content.includes("AMARKHYS-REBUILD-05C-FIX3"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-05C-FIX3 — Suppression robuste rendu businessStatusAction restant",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Cause",
  "",
  "Le bloc JSX contenant businessStatusAction.label était encore présent après FIX2.",
  "",
  "## Correction",
  "",
  `- Blocs conditionnels supprimés: ${totalRemoved}`,
  "- Toute lecture businessStatusAction.label restante est neutralisée.",
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

console.log("[AMARKHYS-REBUILD-05C-FIX3] Remove remaining businessStatusAction render");
console.log("[REPORT]", reportRel);
console.log("[REMOVED_BLOCKS]", totalRemoved);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05C-FIX3] DONE");