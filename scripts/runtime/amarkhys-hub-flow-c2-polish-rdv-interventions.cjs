const fs = require("fs");
const path = require("path");

const root = process.cwd();

const fileRel = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const reportRel = "docs/audits/AMARKHYS-HUB-FLOW-C2-polish-rdv-interventions.md";

const filePath = path.join(root, fileRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  fail("Missing file: " + fileRel);
}

const backupPath = filePath + ".bak-hub-flow-c2-polish-rdv-interventions";
fs.copyFileSync(filePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(filePath, "utf8");
const before = content;

const replacements = [
  {
    from: "1. Rendez-vous du véhicule",
    to: "1. Choisir un rendez-vous",
  },
  {
    from: "Sélectionnez un rendez-vous",
    to: "Rendez-vous du véhicule",
  },
  {
    from: "2. Interventions du rendez-vous sélectionné",
    to: "2. Interventions liées au rendez-vous",
  },
  {
    from: "Rendez-vous sélectionné :",
    to: "Filtre actif :",
  },
  {
    from: "Aucun rendez-vous lié au véhicule sélectionné.",
    to: "Aucun rendez-vous trouvé pour ce véhicule.",
  },
];

for (const replacement of replacements) {
  if (content.includes(replacement.from)) {
    content = content.replaceAll(replacement.from, replacement.to);
  }
}

// Améliorer le message quand aucune intervention ne correspond au rendez-vous.
content = content.replace(
  /Aucune intervention liée au rendez-vous sélectionné\./g,
  "Aucune intervention n’est encore liée à ce rendez-vous. Sélectionnez un autre rendez-vous ou créez une intervention depuis le parcours atelier."
);

content = content.replace(
  /Aucune intervention pour ce rendez-vous\./g,
  "Aucune intervention n’est encore liée à ce rendez-vous. Sélectionnez un autre rendez-vous ou créez une intervention depuis le parcours atelier."
);

// Ajouter un hint clair si le texte n'existe pas déjà.
if (
  content.includes("2. Interventions liées au rendez-vous") &&
  !content.includes("Les interventions ci-dessous sont filtrées par le rendez-vous sélectionné.")
) {
  content = content.replace(
    '<p className="text-xs font-bold uppercase tracking-wide text-slate-500">\n                          2. Interventions liées au rendez-vous\n                        </p>',
    '<p className="text-xs font-bold uppercase tracking-wide text-slate-500">\n                          2. Interventions liées au rendez-vous\n                        </p>\n                        <p className="mt-1 text-xs font-medium text-slate-500">\n                          Les interventions ci-dessous sont filtrées par le rendez-vous sélectionné.\n                        </p>'
  );
}

// Garde-fous.
const requiredMarkers = [
  "selectedRendezvousId",
  "selectedRendezvous",
  "interventionsForSelectedRendezvous",
  "setSelectedRendezvousId",
  "setSelectedInterventionId(null)",
  "rendezvous.map",
  "interventionsForSelectedRendezvous",
];

for (const marker of requiredMarkers) {
  if (!content.includes(marker)) {
    fail("Required marker disappeared: " + marker);
  }
}

fs.writeFileSync(filePath, content, "utf8");

const checks = [
  {
    label: "titre RDV clarifié",
    ok: content.includes("1. Choisir un rendez-vous"),
  },
  {
    label: "titre liste RDV clarifié",
    ok: content.includes("Rendez-vous du véhicule"),
  },
  {
    label: "titre interventions clarifié",
    ok: content.includes("2. Interventions liées au rendez-vous"),
  },
  {
    label: "hint filtrage interventions ajouté",
    ok: content.includes("Les interventions ci-dessous sont filtrées par le rendez-vous sélectionné."),
  },
  {
    label: "selectedRendezvousId conservé",
    ok: content.includes("selectedRendezvousId"),
  },
  {
    label: "filtrage interventions conservé",
    ok: content.includes("interventionsForSelectedRendezvous"),
  },
  {
    label: "reset intervention au changement RDV conservé",
    ok: content.includes("setSelectedInterventionId(null)"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-HUB-FLOW-C2 — Polish RDV / interventions separation",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Objectif",
  "",
  "- Séparer clairement la liste des rendez-vous et la liste des interventions.",
  "- Garder le rendez-vous comme filtre de sélection.",
  "- Garder les interventions filtrées par rendez-vous.",
  "- Ne pas encore activer l’expansion + / -.",
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

console.log("[AMARKHYS-HUB-FLOW-C2] Polish RDV / interventions separation");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-HUB-FLOW-C2] DONE");
console.log("[NEXT] Build and UI check.");