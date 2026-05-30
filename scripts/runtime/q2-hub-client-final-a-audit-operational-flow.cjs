const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  clientHubPage: "src/app/(private)/clientsauto/hub/page.tsx",
  clientHubClient: "src/components/amarkhys/hub/ClientOperationalHubClient.tsx",
  runtimeClientLoader: "src/runtime/hub/RuntimeClientOperationalHubLoader.ts",
  recordHubPage: "src/components/erp/hub/ERPRecordHubPage.tsx",
  recordHub: "src/components/erp/hub/ERPRecordHub.tsx",
  selectedDetails: "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
  childrenResolver: "src/runtime/hub/RuntimeOperationalChildrenResolver.ts",
};

const expectedMarkers = [
  {
    area: "server-client-boundary",
    file: files.clientHubPage,
    markers: [
      "ClientOperationalHubClient",
      "searchParams",
      "id",
    ],
  },
  {
    area: "client-hub-state",
    file: files.clientHubClient,
    markers: [
      "selectedVehicle",
      "selectedVehicleId",
      "selectedRendezVous",
      "selectedIntervention",
      "useState",
      "onClick",
    ],
  },
  {
    area: "runtime-loader",
    file: files.runtimeClientLoader,
    markers: [
      "clientsauto",
      "vehicules",
      "rendezvous",
      "interventionsauto",
      "lignesinterventionauto",
      "facturesauto",
      "encaissementsauto",
    ],
  },
  {
    area: "generic-hub-components",
    file: files.recordHub,
    markers: [
      "children",
      "selectedRecord",
      "onSelect",
      "records",
    ],
  },
  {
    area: "selected-details",
    file: files.selectedDetails,
    markers: [
      "selectedRecord",
      "secondary",
      "details",
      "children",
    ],
  },
  {
    area: "children-resolver",
    file: files.childrenResolver,
    markers: [
      "parent",
      "children",
      "moduleKey",
      "foreignKey",
      "recordId",
    ],
  },
];

function full(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  const file = full(relativePath);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function write(relativePath, content) {
  const file = full(relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function findLines(content, marker) {
  const lower = content.toLowerCase();
  const needle = marker.toLowerCase();
  const hits = [];
  let index = lower.indexOf(needle);

  while (index !== -1) {
    hits.push(lineNumberAt(content, index));
    index = lower.indexOf(needle, index + needle.length);
  }

  return hits;
}

const checks = [];

function add(area, status, severity, message, file = "", lines = "") {
  checks.push({ area, status, severity, message, file, lines });
}

for (const [name, file] of Object.entries(files)) {
  const exists = fs.existsSync(full(file));
  add("file", exists ? "OK" : "WARN", exists ? "LOW" : "MEDIUM", `${file} ${exists ? "found" : "missing"}`, file);
}

for (const group of expectedMarkers) {
  const source = read(group.file);

  for (const marker of group.markers) {
    const lines = findLines(source, marker);
    add(
      group.area,
      lines.length > 0 ? "OK" : "WARN",
      "MEDIUM",
      `${marker} ${lines.length > 0 ? "found" : "not found"}`,
      group.file,
      lines.join(", ")
    );
  }
}

const ok = checks.filter((c) => c.status === "OK").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const warnHigh = checks.filter((c) => c.status === "WARN" && c.severity === "HIGH").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

const report = [];

report.push("# Q2-HUB-CLIENT-FINAL-A — Audit parcours opérationnel fiche client");
report.push("");
report.push("Objectif : vérifier les briques existantes avant de finaliser le parcours Client → Véhicule → RDV → Intervention → Lignes → Facture → Encaissements.");
report.push("");
report.push("## Principe confirmé");
report.push("");
report.push("- Les “tableaux” attendus sont des listes runtime/opérationnelles.");
report.push("- Ne pas recréer de tableau local.");
report.push("- Réutiliser les listes et composants génériques déjà réalisés.");
report.push("- Affiner progressivement le hub client sans casser la généricité ERP.");
report.push("");
report.push("## Résumé");
report.push("");
report.push(`- OK : ${ok}`);
report.push(`- WARN : ${warn}`);
report.push(`- WARN HIGH : ${warnHigh}`);
report.push(`- FAIL : ${fail}`);
report.push(`- FAIL HIGH : ${failHigh}`);
report.push("");
report.push("## Checks");
report.push("");
report.push("| Area | Status | Severity | File | Lines | Message |");
report.push("|---|---:|---:|---|---|---|");

for (const check of checks) {
  report.push(
    `| ${check.area} | ${check.status} | ${check.severity} | ${check.file ? "`" + check.file + "`" : ""} | ${check.lines || ""} | ${check.message.replace(/\|/g, "/")} |`
  );
}

report.push("");
report.push("## Décision de suite");
report.push("");
report.push("La prochaine passe doit brancher ou renforcer le parcours central sans créer de nouveau système local :");
report.push("");
report.push("1. Agrandir les KPI haut gauche.");
report.push("2. Stabiliser la sélection véhicule.");
report.push("3. Afficher la liste RDV filtrée par véhicule.");
report.push("4. Sélectionner un RDV.");
report.push("5. Afficher la liste interventions filtrée par RDV.");
report.push("6. Afficher lignes, facture et encaissements depuis l’intervention sélectionnée.");
report.push("7. Synchroniser le panneau droit avec la sélection courante.");

write("docs/audits/Q2-HUB-CLIENT-FINAL-A-operational-flow-audit.md", report.join("\n"));

console.log("[Q2-HUB-CLIENT-FINAL-A] Client operational hub flow audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-HUB-CLIENT-FINAL-A-operational-flow-audit.md");
console.log("[IMPORTANT]");
for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}${check.lines ? " :: lines " + check.lines : ""}`
    );
  }
}