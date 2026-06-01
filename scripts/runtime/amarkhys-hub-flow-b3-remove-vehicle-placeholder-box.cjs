const fs = require("fs");
const path = require("path");

const root = process.cwd();

const fileRel = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const reportRel = "docs/audits/AMARKHYS-HUB-FLOW-B3-remove-vehicle-placeholder-box.md";

const filePath = path.join(root, fileRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  fail("Missing file: " + fileRel);
}

const backupPath = filePath + ".bak-hub-flow-b3-remove-vehicle-placeholder-box";
fs.copyFileSync(filePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(filePath, "utf8");
const before = content;

const exactBlock =
  '                        <div className="mb-4 flex h-28 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-slate-200 to-slate-100 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Vehicule</div>\n';

if (content.includes(exactBlock)) {
  content = content.replace(exactBlock, "");
} else {
  const regex = /\n\s*<div className="mb-4 flex h-28 items-center justify-center rounded-\[1\.5rem\] bg-gradient-to-br from-slate-200 to-slate-100 text-xs font-black uppercase tracking-\[0\.18em\] text-slate-500">Vehicule<\/div>/;

  if (!regex.test(content)) {
    fail("Vehicle placeholder gray box not found");
  }

  content = content.replace(regex, "");
}

fs.writeFileSync(filePath, content, "utf8");

const checks = [
  {
    label: "cadre gris Vehicule supprimé",
    ok: !content.includes('bg-gradient-to-br from-slate-200 to-slate-100') && !content.includes(">Vehicule</div>"),
  },
  {
    label: "carte véhicule conservée",
    ok:
      content.includes("Voir la fiche véhicule") &&
      content.includes('text(vehicle, ["displayLabel", "immatriculation", "marque"])'),
  },
  {
    label: "Année reste masquée",
    ok: !content.includes("Année :"),
  },
  {
    label: "Carburant reste masqué",
    ok: !content.includes("Carburant :"),
  },
  {
    label: "états expandables conservés",
    ok:
      content.includes("expandedInterventionId") &&
      content.includes("expandedFactureId") &&
      content.includes("expandedEncaissementId"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-HUB-FLOW-B3 — Remove vehicle placeholder box",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Objectif",
  "",
  "- Supprimer le cadre gris décoratif vide dans la carte véhicule.",
  "- Conserver les informations utiles du véhicule.",
  "- Ne pas toucher aux rendez-vous, interventions, factures ou encaissements.",
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- ${check.ok ? "OK" : "FAIL"} — ${check.label}`),
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-HUB-FLOW-B3] Remove vehicle placeholder box");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-HUB-FLOW-B3] DONE");
console.log("[NEXT] Build and UI check.");