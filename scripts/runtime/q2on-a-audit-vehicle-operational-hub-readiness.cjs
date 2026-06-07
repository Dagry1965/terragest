const fs = require("fs");
const path = require("path");

const root = process.cwd();

const candidates = {
  vehicleModule: [
    "src/runtime/modules/generated/vehicules/vehicules.module.ts",
    "src/runtime/modules/generated/vehiculesauto/vehiculesauto.module.ts",
  ],
  clientModule: [
    "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  ],
  rendezvousModule: [
    "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  ],
  interventionsModule: [
    "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  ],
  lignesInterventionModule: [
    "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  ],
  facturesModule: [
    "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  ],
  encaissementsModule: [
    "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  ],
  clientHubPage: [
    "src/app/(private)/clientsauto/hub/page.tsx",
  ],
  productHubPage: [
    "src/app/(private)/produitsauto/hub/page.tsx",
  ],
  productHubClient: [
    "src/app/(private)/produitsauto/hub/ProductStockOperationalHubClient.tsx",
  ],
  runtimeHubTypes: [
    "src/runtime/hub/RuntimeHubTypes.ts",
  ],
  runtimeHubEngine: [
    "src/runtime/hub/RuntimeHubEngine.ts",
  ],
  runtimeHubKpiResolver: [
    "src/runtime/hub/RuntimeHubKpiResolver.ts",
  ],
  runtimeClientLoader: [
    "src/runtime/hub/RuntimeClientOperationalHubLoader.ts",
  ],
  runtimeProductLoader: [
    "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts",
  ],
  hubPageComponent: [
    "src/components/erp/hub/ERPRecordHubPage.tsx",
  ],
  hubPrimaryComponent: [
    "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx",
  ],
  hubSelectedComponent: [
    "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
  ],
};

const checks = [];

function add(area, status, severity, message) {
  checks.push({ area, status, severity, message });
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  const full = path.join(root, relativePath);
  if (!fs.existsSync(full)) return "";
  return fs.readFileSync(full, "utf8");
}

function firstExisting(paths) {
  return paths.find(exists) || null;
}

function hasAny(content, terms) {
  return terms.some((term) => content.includes(term));
}

function hasAll(content, terms) {
  return terms.every((term) => content.includes(term));
}

const resolved = {};

for (const [key, paths] of Object.entries(candidates)) {
  const found = firstExisting(paths);
  resolved[key] = found;

  if (found) {
    add("files", "OK", "LOW", `${key} found: ${found}`);
  } else {
    const severity = [
      "encaissementsModule",
      "lignesInterventionModule",
    ].includes(key)
      ? "MEDIUM"
      : "HIGH";

    add("files", "FAIL", severity, `${key} not found in candidates: ${paths.join(", ")}`);
  }
}

const modules = {
  vehicle: resolved.vehicleModule ? read(resolved.vehicleModule) : "",
  client: resolved.clientModule ? read(resolved.clientModule) : "",
  rendezvous: resolved.rendezvousModule ? read(resolved.rendezvousModule) : "",
  interventions: resolved.interventionsModule ? read(resolved.interventionsModule) : "",
  lignesIntervention: resolved.lignesInterventionModule ? read(resolved.lignesInterventionModule) : "",
  factures: resolved.facturesModule ? read(resolved.facturesModule) : "",
  encaissements: resolved.encaissementsModule ? read(resolved.encaissementsModule) : "",
};

const hubRuntime = {
  types: resolved.runtimeHubTypes ? read(resolved.runtimeHubTypes) : "",
  engine: resolved.runtimeHubEngine ? read(resolved.runtimeHubEngine) : "",
  kpi: resolved.runtimeHubKpiResolver ? read(resolved.runtimeHubKpiResolver) : "",
  clientLoader: resolved.runtimeClientLoader ? read(resolved.runtimeClientLoader) : "",
  productLoader: resolved.runtimeProductLoader ? read(resolved.runtimeProductLoader) : "",
};

const components = {
  page: resolved.hubPageComponent ? read(resolved.hubPageComponent) : "",
  primary: resolved.hubPrimaryComponent ? read(resolved.hubPrimaryComponent) : "",
  selected: resolved.hubSelectedComponent ? read(resolved.hubSelectedComponent) : "",
};

/**
 * Vehicle module readiness.
 */
if (modules.vehicle) {
  if (hasAny(modules.vehicle, ["clientId", "proprietaireId", "ownerId"])) {
    add("vehicle-relations", "OK", "HIGH", "Vehicle module has a client/owner relation field");
  } else {
    add("vehicle-relations", "FAIL", "HIGH", "Vehicle module lacks obvious client/owner relation field");
  }

  if (hasAny(modules.vehicle, ["immatriculation", "marque", "modele", "modèle", "vin", "numeroChassis"])) {
    add("vehicle-labels", "OK", "HIGH", "Vehicle module has business label fields");
  } else {
    add("vehicle-labels", "FAIL", "HIGH", "Vehicle module lacks obvious vehicle business label fields");
  }

  if (hasAny(modules.vehicle, ["composition", "breadcrumbs", "relations", "labelFields"])) {
    add("vehicle-metadata", "OK", "MEDIUM", "Vehicle module appears to have runtime metadata/composition");
  } else {
    add("vehicle-metadata", "WARN", "MEDIUM", "Vehicle module runtime composition metadata unclear");
  }
}

/**
 * Downstream relations.
 */
if (modules.rendezvous) {
  if (hasAny(modules.rendezvous, ["vehiculeId", "vehicleId"])) {
    add("downstream-relations", "OK", "HIGH", "Rendezvous module links to vehicle");
  } else {
    add("downstream-relations", "FAIL", "HIGH", "Rendezvous module lacks vehicle relation");
  }

  if (hasAny(modules.rendezvous, ["clientId", "date", "dateRendezVous", "heure", "statut"])) {
    add("downstream-fields", "OK", "MEDIUM", "Rendezvous module has useful hub fields");
  } else {
    add("downstream-fields", "WARN", "MEDIUM", "Rendezvous hub fields unclear");
  }
}

if (modules.interventions) {
  if (hasAny(modules.interventions, ["vehiculeId", "vehicleId"])) {
    add("downstream-relations", "OK", "HIGH", "Interventions module links to vehicle");
  } else {
    add("downstream-relations", "FAIL", "HIGH", "Interventions module lacks vehicle relation");
  }

  if (hasAny(modules.interventions, ["clientId", "rendezVousId", "rendezvousId", "montantHT", "montantTTC", "statut"])) {
    add("downstream-fields", "OK", "MEDIUM", "Interventions module has useful hub fields");
  } else {
    add("downstream-fields", "WARN", "MEDIUM", "Intervention hub fields unclear");
  }
}

if (modules.lignesIntervention) {
  if (hasAny(modules.lignesIntervention, ["interventionId"])) {
    add("deep-relations", "OK", "MEDIUM", "Intervention lines module links to intervention");
  } else {
    add("deep-relations", "WARN", "MEDIUM", "Intervention lines module lacks obvious interventionId");
  }
}

if (modules.factures) {
  if (hasAny(modules.factures, ["vehiculeId", "vehicleId", "interventionId", "clientId"])) {
    add("billing-relations", "OK", "HIGH", "Factures module has relation fields usable from vehicle hub");
  } else {
    add("billing-relations", "FAIL", "HIGH", "Factures module lacks obvious vehicle/intervention/client relation fields");
  }

  if (hasAny(modules.factures, ["montantTTC", "montantHT", "statut", "numero", "dateFacture"])) {
    add("billing-fields", "OK", "MEDIUM", "Factures module has useful business fields");
  } else {
    add("billing-fields", "WARN", "MEDIUM", "Factures business fields unclear");
  }
}

if (modules.encaissements) {
  if (hasAny(modules.encaissements, ["factureId", "clientId", "vehiculeId", "interventionId"])) {
    add("payment-relations", "OK", "MEDIUM", "Encaissements module has relation fields usable from vehicle hub");
  } else {
    add("payment-relations", "WARN", "MEDIUM", "Encaissements relation fields unclear");
  }
}

/**
 * Hub runtime readiness.
 */
if (hubRuntime.types) {
  if (
    hasAll(hubRuntime.types, [
      "ERPRecordHubConfig",
      "ERPRecordHubPrimaryCollectionConfig",
      "ERPRecordHubRelatedSectionConfig",
      "ERPRecordHubKpiConfig",
    ])
  ) {
    add("hub-runtime", "OK", "HIGH", "Hub runtime types support config, primary collection, related sections and KPI");
  } else {
    add("hub-runtime", "FAIL", "HIGH", "Hub runtime types are incomplete for vehicle hub");
  }
}

if (hubRuntime.engine) {
  if (hasAny(hubRuntime.engine, ["RuntimeHubKpiResolver", "RuntimeHubLayoutResolver", "RuntimeHubRelationResolver"])) {
    add("hub-runtime", "OK", "HIGH", "RuntimeHubEngine composes hub resolvers");
  } else {
    add("hub-runtime", "WARN", "HIGH", "RuntimeHubEngine resolver composition unclear");
  }
}

if (hubRuntime.kpi) {
  if (hasAll(hubRuntime.kpi, ["rootRecord[kpi.field]", "normalizeKpiValue"])) {
    add("hub-runtime", "OK", "HIGH", "RuntimeHubKpiResolver reads KPI fields from rootRecord");
  } else {
    add("hub-runtime", "FAIL", "HIGH", "RuntimeHubKpiResolver cannot resolve vehicle KPI fields cleanly");
  }
}

if (components.page && components.primary && components.selected) {
  if (
    hasAll(components.page, ["ERPRecordHubHeader", "ERPRecordHubKpiStrip", "ERPRecordHubPrimaryCollection", "ERPRecordHubSelectedDetails"]) ||
    hasAny(components.page, ["ERPRecordHub"])
  ) {
    add("hub-components", "OK", "HIGH", "Generic hub page component exists and composes hub sections");
  } else {
    add("hub-components", "WARN", "MEDIUM", "Generic hub page composition unclear");
  }

  if (hasAny(components.primary, ["displayLabel", "labelFields", "subtitleFields"])) {
    add("hub-components", "OK", "MEDIUM", "Primary collection supports labels/subtitles");
  } else {
    add("hub-components", "WARN", "MEDIUM", "Primary collection label support unclear");
  }

  if (hasAny(components.selected, ["selectedRecord", "relatedRecordsBySection", "labelFields", "subtitleFields"])) {
    add("hub-components", "OK", "MEDIUM", "Selected details supports related sections");
  } else {
    add("hub-components", "WARN", "MEDIUM", "Selected details related sections support unclear");
  }
}

/**
 * Existing hub pattern reuse.
 */
const productPage = resolved.productHubPage ? read(resolved.productHubPage) : "";
const productClient = resolved.productHubClient ? read(resolved.productHubClient) : "";
const clientPage = resolved.clientHubPage ? read(resolved.clientHubPage) : "";

if (productPage) {
  if (
    hasAll(productPage, [
      "ERPRecordHubConfig",
      "ProductStockOperationalHubClient",
      "kpis:",
      "primaryCollection:",
      "selectedRecordDetails:",
    ])
  ) {
    add("pattern-reuse", "OK", "HIGH", "Product hub provides reusable server page + client boundary + metadata pattern");
  } else {
    add("pattern-reuse", "FAIL", "HIGH", "Product hub pattern is incomplete");
  }
}

if (productClient) {
  if (
    productClient.includes('"use client"') &&
    productClient.includes("useEffect") &&
    productClient.includes("RuntimeProductStockOperationalHubLoader")
  ) {
    add("pattern-reuse", "OK", "HIGH", "Product client component confirms client-side runtime loader pattern");
  } else {
    add("pattern-reuse", "FAIL", "HIGH", "Product client component pattern is not reusable");
  }
}

if (clientPage) {
  if (hasAny(clientPage, ["ERPRecordHubConfig", "RuntimeClientOperationalHubLoader", "ERPRecordHubPage"])) {
    add("pattern-reuse", "OK", "MEDIUM", "Client hub can inform vehicle hub metadata");
  } else {
    add("pattern-reuse", "WARN", "MEDIUM", "Client hub pattern unclear");
  }
}

/**
 * Proposed route readiness.
 */
const vehicleHubRouteCandidates = [
  "src/app/(private)/vehicules/hub/page.tsx",
  "src/app/(private)/vehiculesauto/hub/page.tsx",
];

const existingVehicleHubRoute = vehicleHubRouteCandidates.find(exists);

if (existingVehicleHubRoute) {
  add("vehicle-hub-route", "WARN", "MEDIUM", `Vehicle hub route already exists: ${existingVehicleHubRoute}`);
} else {
  add("vehicle-hub-route", "OK", "MEDIUM", "No vehicle hub route exists yet; Q2-ON can create it cleanly");
}

/**
 * Mojibake in relevant files.
 */
const mojibakePatterns = ["Ã", "Â", "'", """, "\uFFFD"];

const mojibakeTargets = {
  vehicleModule: modules.vehicle,
  rendezvousModule: modules.rendezvous,
  interventionsModule: modules.interventions,
  facturesModule: modules.factures,
  runtimeHubTypes: hubRuntime.types,
  runtimeHubEngine: hubRuntime.engine,
  runtimeHubKpiResolver: hubRuntime.kpi,
  hubPageComponent: components.page,
  hubPrimaryComponent: components.primary,
  hubSelectedComponent: components.selected,
};

for (const [key, content] of Object.entries(mojibakeTargets)) {
  if (!content) continue;

  const found = mojibakePatterns.filter((pattern) => content.includes(pattern));

  if (found.length > 0) {
    add("mojibake", "FAIL", "HIGH", `${key} contains mojibake: ${found.join(", ")}`);
  } else {
    add("mojibake", "OK", "HIGH", `${key} has no mojibake`);
  }
}

const ok = checks.filter((c) => c.status === "OK").length;
const info = checks.filter((c) => c.status === "INFO").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

console.log("[Q2-ON-A] Vehicle Operational Hub readiness audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[INFO]", info);
console.log("[WARN]", warn);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);

for (const check of checks) {
  if (check.status === "FAIL" || check.status === "WARN") {
    console.log(`[${check.status}] [${check.severity}] [${check.area}] ${check.message}`);
  }
}

const reportLines = [];
reportLines.push("# Q2-ON-A Vehicle Operational Hub readiness audit");
reportLines.push("");
reportLines.push(`- OK: ${ok}`);
reportLines.push(`- INFO: ${info}`);
reportLines.push(`- WARN: ${warn}`);
reportLines.push(`- FAIL: ${fail}`);
reportLines.push(`- HIGH FAIL: ${failHigh}`);
reportLines.push("");
reportLines.push("## Resolved files");
reportLines.push("");

for (const [key, value] of Object.entries(resolved)) {
  reportLines.push(`- ${key}: \`${value || "NOT_FOUND"}\``);
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
  reportLines.push("HIGH failures exist. Fix module relations or runtime hub foundation before creating the vehicle hub.");
} else if (fail > 0 || warn > 0) {
  reportLines.push("No HIGH blocker. Review warnings and decide the minimal viable Vehicle Operational Hub scope.");
} else {
  reportLines.push("Readiness is clean. Proceed with Vehicle Operational Hub route, client boundary, loader and metadata.");
}

const reportPath = path.join(root, "docs/audits/Q2-ON-A-vehicle-operational-hub-readiness.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

console.log("[REPORT]", path.relative(root, reportPath));

if (failHigh > 0) {
  process.exitCode = 1;
}