const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  clientHubPage: "src/app/(private)/clientsauto/hub/page.tsx",
  clientLoader: "src/runtime/hub/RuntimeClientOperationalHubLoader.ts",
  hubTypes: "src/runtime/hub/RuntimeHubTypes.ts",
  hubPage: "src/components/erp/hub/ERPRecordHubPage.tsx",
  hubHeader: "src/components/erp/hub/ERPRecordHubHeader.tsx",
  hubKpiStrip: "src/components/erp/hub/ERPRecordHubKpiStrip.tsx",
  hubPrimary: "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx",
  hubSelected: "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
  clientsModule: "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  vehiclesModule: "src/runtime/modules/generated/vehicules/vehicules.module.ts",
  rendezvousModule: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  interventionsModule: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  linesModule: "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  invoicesModule: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  paymentsModule: "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts"
};

const checks = [];

function full(relativePath) {
  return path.join(root, relativePath);
}

function exists(relativePath) {
  return fs.existsSync(full(relativePath));
}

function read(relativePath) {
  if (!exists(relativePath)) return "";
  return fs.readFileSync(full(relativePath), "utf8");
}

function add(area, status, severity, message) {
  checks.push({ area, status, severity, message });
}

function hasAny(content, terms) {
  return terms.some((term) => content.includes(term));
}

function hasAll(content, terms) {
  return terms.every((term) => content.includes(term));
}

const loaded = {};
for (const [key, file] of Object.entries(files)) {
  loaded[key] = read(file);

  if (exists(file)) {
    add("files", "OK", "LOW", `${key} exists: ${file}`);
  } else {
    const optional = key === "paymentsModule";
    add("files", optional ? "INFO" : "FAIL", optional ? "LOW" : "HIGH", `${key} missing: ${file}`);
  }
}

const allClientScope = [
  loaded.clientHubPage,
  loaded.clientLoader,
  loaded.hubTypes,
  loaded.hubPage,
  loaded.hubHeader,
  loaded.hubKpiStrip,
  loaded.hubPrimary,
  loaded.hubSelected,
  loaded.clientsModule
].join("\n");

/**
 * Exact target sections from the approved visual reference.
 */
const targetSections = [
  {
    key: "main-title",
    label: "Titre FICHE CLIENT OPERATIONNELLE",
    terms: ["FICHE CLIENT OP", "Fiche Client Op", "fiche client op"]
  },
  {
    key: "subtitle",
    label: "Sous-texte vue 360 client",
    terms: ["Vue 360", "véhicules jusqu", "factures et encaissements"]
  },
  {
    key: "client-identity-card",
    label: "Carte identité client",
    terms: ["codeClient", "telephone", "email", "adresse", "derniereVisite", "prochain"]
  },
  {
    key: "kpi-vehicles",
    label: "KPI Véhicules",
    terms: ["vehiclesCount", "vehiculesCount", "nombreVehicules", "Véhicules"]
  },
  {
    key: "kpi-active-interventions",
    label: "KPI Interventions actives",
    terms: ["activeInterventions", "interventionsActives", "Interventions actives"]
  },
  {
    key: "kpi-unpaid-invoices",
    label: "KPI Factures impayées",
    terms: ["unpaidInvoices", "facturesImpayees", "Factures impayées", "impay"]
  },
  {
    key: "kpi-revenue",
    label: "KPI CA cumulé",
    terms: ["revenueTotal", "chiffreAffaires", "CA cumulé", "caCumule"]
  },
  {
    key: "kpi-last-visit",
    label: "KPI Dernière visite",
    terms: ["lastVisit", "derniereVisite", "Dernière visite"]
  },
  {
    key: "kpi-next-appointment",
    label: "KPI Prochain RDV",
    terms: ["nextAppointment", "prochainRendezVous", "Prochain RDV", "Prochain rendez-vous"]
  },
  {
    key: "vehicles-section",
    label: "Bloc Véhicules du client",
    terms: ["Véhicules du client", "vehicules", "primaryCollection"]
  },
  {
    key: "recent-activity",
    label: "Bloc Activité récente",
    terms: ["Activité récente", "recentActivity", "activité"]
  },
  {
    key: "upcoming",
    label: "Bloc À venir",
    terms: ["À venir", "A venir", "upcoming", "prochains"]
  },
  {
    key: "client-type-adaptation",
    label: "Bloc Adaptation selon le type de client",
    terms: ["Particulier", "Flotte", "Entreprise", "displayModeSourceField", "displayModes"]
  },
  {
    key: "quick-navigation",
    label: "Bloc Navigation rapide",
    terms: ["Navigation rapide", "Fiche véhicule", "Fiche intervention", "Facture complète"]
  },
  {
    key: "detailed-path",
    label: "Bloc Parcours détaillé : du véhicule à la facture",
    terms: ["Parcours détaillé", "du véhicule à la facture", "Sélection du véhicule", "Facture liée", "Encaissements"]
  },
  {
    key: "business-benefits",
    label: "Bloc Bénéfices métier",
    terms: ["Bénéfices métier", "Vue 360", "impayés", "Gain de temps"]
  }
];

for (const section of targetSections) {
  if (hasAny(allClientScope, section.terms)) {
    add("target-sections", "OK", "HIGH", `Detected target section: ${section.label}`);
  } else {
    add("target-sections", "WARN", "HIGH", `Missing target section: ${section.label}`);
  }
}

/**
 * Data chain required by the visual target.
 */
const chainChecks = [
  {
    key: "client-to-vehicles",
    label: "Client -> Véhicules",
    source: loaded.vehiclesModule + "\n" + loaded.clientLoader + "\n" + loaded.clientHubPage,
    terms: ["clientId", "proprietaireId", "ownerId", "vehicules"]
  },
  {
    key: "vehicle-to-rdv",
    label: "Véhicule -> Rendez-vous",
    source: loaded.rendezvousModule + "\n" + loaded.clientLoader,
    terms: ["vehiculeId", "vehicleId", "rendezvous"]
  },
  {
    key: "vehicle-to-interventions",
    label: "Véhicule -> Interventions",
    source: loaded.interventionsModule + "\n" + loaded.clientLoader,
    terms: ["vehiculeId", "vehicleId", "interventionsauto"]
  },
  {
    key: "intervention-to-lines",
    label: "Intervention -> Lignes",
    source: loaded.linesModule + "\n" + loaded.clientLoader,
    terms: ["interventionId", "lignesinterventionauto"]
  },
  {
    key: "intervention-to-invoices",
    label: "Intervention -> Factures",
    source: loaded.invoicesModule + "\n" + loaded.clientLoader,
    terms: ["interventionId", "facturesauto"]
  },
  {
    key: "invoice-to-payments",
    label: "Factures -> Encaissements",
    source: loaded.paymentsModule + "\n" + loaded.clientLoader,
    terms: ["factureId", "encaissementsauto"]
  }
];

for (const chain of chainChecks) {
  if (hasAny(chain.source, chain.terms)) {
    add("data-chain", "OK", "HIGH", `Detected relation chain: ${chain.label}`);
  } else {
    add("data-chain", "FAIL", "HIGH", `Missing relation chain: ${chain.label}`);
  }
}

/**
 * Runtime constraints.
 */
if (loaded.clientHubPage.includes("firebase/firestore")) {
  add("runtime-boundary", "FAIL", "HIGH", "Client hub page imports firebase/firestore");
} else {
  add("runtime-boundary", "OK", "HIGH", "Client hub page does not import firebase/firestore");
}

if (hasAny(loaded.clientHubPage, ["ERPRecordHubConfig", "ERPRecordHubPage", "RuntimeClientOperationalHubLoader"])) {
  add("runtime-boundary", "OK", "HIGH", "Client hub uses runtime/generic hub concepts");
} else {
  add("runtime-boundary", "FAIL", "HIGH", "Client hub runtime/generic structure unclear");
}

if (hasAny(loaded.hubTypes, ["displayModeSourceField", "displayModes"])) {
  add("adaptive-display", "OK", "HIGH", "Runtime types support adaptive display by client type");
} else {
  add("adaptive-display", "FAIL", "HIGH", "Runtime types lack adaptive display support");
}

/**
 * Mojibake.
 */
const mojibakePatterns = ["Ã", "Â", "'", """, "\uFFFD"];
for (const [key, content] of Object.entries(loaded)) {
  if (!content) continue;
  const found = mojibakePatterns.filter((pattern) => content.includes(pattern));

  if (found.length > 0) {
    add("mojibake", "FAIL", "HIGH", `${files[key]} contains mojibake: ${found.join(", ")}`);
  } else {
    add("mojibake", "OK", "HIGH", `${files[key]} has no mojibake`);
  }
}

const ok = checks.filter((c) => c.status === "OK").length;
const info = checks.filter((c) => c.status === "INFO").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

console.log("[Q2-OP-A1] Client Operational Sheet exact target audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[INFO]", info);
console.log("[WARN]", warn);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);

for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(`[${check.status}] [${check.severity}] [${check.area}] ${check.message}`);
  }
}

const reportLines = [];
reportLines.push("# Q2-OP-A1 Client Operational Sheet exact target audit");
reportLines.push("");
reportLines.push("Reference: approved visual target Mode_Phare / FICHE CLIENT OPERATIONNELLE.");
reportLines.push("");
reportLines.push(`- OK: ${ok}`);
reportLines.push(`- INFO: ${info}`);
reportLines.push(`- WARN: ${warn}`);
reportLines.push(`- FAIL: ${fail}`);
reportLines.push(`- HIGH FAIL: ${failHigh}`);
reportLines.push("");
reportLines.push("## Mandatory target sections");
reportLines.push("");
for (const section of targetSections) {
  reportLines.push(`- ${section.label}`);
}
reportLines.push("");
reportLines.push("## Checks");
reportLines.push("");
reportLines.push("| Area | Status | Severity | Message |");
reportLines.push("|---|---:|---:|---|");
for (const check of checks) {
  reportLines.push(`| ${check.area} | ${check.status} | ${check.severity} | ${check.message.replace(/\|/g, "/")} |`);
}
reportLines.push("");
reportLines.push("## Recommendation");
reportLines.push("");
if (failHigh > 0) {
  reportLines.push("Fix HIGH failures before implementation.");
} else {
  reportLines.push("Proceed with Q2-OP-B: implement the exact Client Operational Sheet layout and runtime view model.");
}

const reportPath = path.join(root, "docs/audits/Q2-OP-A1-client-operational-sheet-exact-target-audit.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

console.log("[REPORT]", path.relative(root, reportPath));

if (failHigh > 0) {
  process.exitCode = 1;
}