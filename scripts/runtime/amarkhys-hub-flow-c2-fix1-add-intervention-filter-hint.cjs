const fs = require("fs");
const path = require("path");

const root = process.cwd();

const fileRel = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const reportRel = "docs/audits/AMARKHYS-HUB-FLOW-C2-FIX1-add-intervention-filter-hint.md";

const filePath = path.join(root, fileRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  fail("Missing file: " + fileRel);
}

const backupPath = filePath + ".bak-hub-flow-c2-fix1-add-intervention-filter-hint";
fs.copyFileSync(filePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(filePath, "utf8");
const before = content;

const hint = "Les interventions ci-dessous sont filtrées par le rendez-vous sélectionné.";

if (!content.includes("2. Interventions liées au rendez-vous")) {
  fail("Missing interventions title");
}

if (!content.includes(hint)) {
  const marker = `                        2. Interventions liées au rendez-vous
                      </p>`;

  if (!content.includes(marker)) {
    fail("Cannot find exact title marker");
  }

  content = content.replace(
    marker,
    `${marker}
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        ${hint}
                      </p>`
  );
}

fs.writeFileSync(filePath, content, "utf8");

const checks = [
  {
    label: "hint filtrage interventions ajouté",
    ok: content.includes(hint),
  },
  {
    label: "titre interventions conservé",
    ok: content.includes("2. Interventions liées au rendez-vous"),
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
    label: "fichier modifié ou déjà conforme",
    ok: before !== content || content.includes(hint),
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-HUB-FLOW-C2-FIX1 — Add intervention filter hint",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Objectif",
  "",
  "- Corriger uniquement le hint manquant du contrôle C2.",
  "- Ne pas changer la logique RDV / interventions.",
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

console.log("[AMARKHYS-HUB-FLOW-C2-FIX1] Add intervention filter hint");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-HUB-FLOW-C2-FIX1] DONE");
console.log("[NEXT] Rerun C2 audit, build, UI check.");