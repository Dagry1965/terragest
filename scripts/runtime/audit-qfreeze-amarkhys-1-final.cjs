const fs = require("fs");
const path = require("path");

const root = process.cwd();

const checks = [];
const files = {};

function exists(rel) {
  const full = path.join(root, rel);
  const ok = fs.existsSync(full);
  files[rel] = { exists: ok };
  return ok;
}

function read(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    files[rel] = { exists: false };
    return "";
  }

  const content = fs.readFileSync(full, "utf8");
  files[rel] = {
    exists: true,
    length: content.length,
  };
  return content;
}

function check(level, label, ok, details = "") {
  checks.push({
    level: ok ? "OK" : level,
    label,
    ok,
    details,
  });
}

const targets = {
  dashboard: "src/app/(private)/dashboard/page.tsx",
  cockpit: "src/components/erp/cockpit/AmarkhysOperationalCockpit.tsx",
  cockpitResolver: "src/runtime/cockpit/RuntimeOperationalCockpitResolver.ts",

  publicRdv: "src/app/rdv/page.tsx",
  publicAppointmentService: "src/components/public/PublicAppointmentService.ts",
  publicSchedulingBridge: "src/runtime/scheduling/public/RuntimePublicSchedulingContractBridge.ts",

  clients: "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  vehicules: "src/runtime/modules/generated/vehicules/vehicules.module.ts",
  rendezvous: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  interventions: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  lignesIntervention: "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  factures: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  encaissements: "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  produits: "src/runtime/modules/generated/produitsauto/produitsauto.module.ts",
  stocks: "src/runtime/modules/generated/stocksauto/stocksauto.module.ts",

  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  relatedPanel: "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx",
  enterpriseForm: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  formField: "src/components/erp/forms/enterprise/ERPFormField.tsx",

  schedulingEngine: "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  schedulingSettingsEngine: "src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts",
  schedulingRepository: "src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts",

  stockMovementService: "src/runtime/stock/RuntimeStockMovementService.ts",
  lineRemovalService: "src/runtime/line-items/RuntimeLineRemovalService.ts",
  actionEngine: "src/runtime/actions/RuntimeActionEngine.ts",
  statusGovernance: "src/runtime/status/RuntimeStatusGovernanceEngine.ts",
  contextEnforcer: "src/runtime/context/RuntimeContextEnforcer.ts",
};

for (const [key, rel] of Object.entries(targets)) {
  check("HIGH", `Fichier présent: ${key}`, exists(rel), rel);
}

const dashboard = read(targets.dashboard);
check(
  "HIGH",
  "/dashboard branché sur AmarkhysOperationalCockpit",
  dashboard.includes("AmarkhysOperationalCockpit"),
  targets.dashboard
);

const clients = read(targets.clients);
check(
  "HIGH",
  "clientsauto possède composition.children",
  /composition\s*:\s*\{[\s\S]*children\s*:\s*\[/m.test(clients),
  targets.clients
);
check(
  "MEDIUM",
  "clientsauto contient action Nouveau RDV",
  clients.includes("nouveau-rdv-client") || clients.includes("Nouveau RDV"),
  targets.clients
);
check(
  "MEDIUM",
  "clientsauto expose véhicules liés",
  clients.includes("Véhicules du client") && clients.includes('moduleKey: "vehicules"'),
  targets.clients
);
check(
  "MEDIUM",
  "clientsauto expose RDV/interventions/factures/encaissements liés",
  clients.includes("Rendez-vous du client") &&
    clients.includes("Interventions du client") &&
    clients.includes("Factures du client") &&
    clients.includes("Encaissements du client"),
  targets.clients
);

const formField = read(targets.formField);
check(
  "HIGH",
  "ERPFormField FieldWrapper lisible",
  formField.includes("rounded-2xl") &&
    formField.includes("bg-white") &&
    formField.includes("shadow-sm") &&
    formField.includes("text-slate-950"),
  targets.formField
);

const runtimePage = read(targets.runtimePage);
check(
  "HIGH",
  "ERPRuntimePage rend ERPRelatedRecordsPanel",
  runtimePage.includes("ERPRelatedRecordsPanel") &&
    runtimePage.includes("relatedChildren"),
  targets.runtimePage
);
check(
  "HIGH",
  "ERPRuntimePage rend ERPEnterpriseForm en edit",
  runtimePage.includes("mode=\"edit\"") &&
    runtimePage.includes("initialData={record}"),
  targets.runtimePage
);

const relatedPanel = read(targets.relatedPanel);
check(
  "HIGH",
  "ERPRelatedRecordsPanel filtre les enfants par foreignKey",
  relatedPanel.includes("child.foreignKey") &&
    relatedPanel.includes("parentRecordId"),
  targets.relatedPanel
);
check(
  "MEDIUM",
  "ERPRelatedRecordsPanel permet création enfant contextualisée",
  relatedPanel.includes("parentModuleKey") &&
    relatedPanel.includes("parentRecordId") &&
    relatedPanel.includes("lockFields"),
  targets.relatedPanel
);

const rendezvous = read(targets.rendezvous);
check(
  "HIGH",
  "rendezvous déclare scheduling",
  /scheduling\s*:\s*\{/m.test(rendezvous) || rendezvous.includes("dateField") || rendezvous.includes("timeField"),
  targets.rendezvous
);

const schedulingEngine = read(targets.schedulingEngine);
check(
  "HIGH",
  "RuntimeSchedulingEngine présent avec slots/bookings",
  schedulingEngine.includes("getAvailableSlots") || schedulingEngine.includes("bookings"),
  targets.schedulingEngine
);

const publicRdv = read(targets.publicRdv);
const publicLanding = read("src/components/public/AmarkhysPublicAppointmentLanding.tsx");
const publicAppointmentService = read(targets.publicAppointmentService);

check(
  "HIGH",
  "Service RDV public expose createPublicAppointment",
  publicAppointmentService.includes("export async function createPublicAppointment") &&
    publicAppointmentService.includes("RuntimePublicSchedulingContractBridge") &&
    publicAppointmentService.includes("durationMinutes") &&
    publicAppointmentService.includes("typeService"),
  targets.publicAppointmentService
);

check(
  "MEDIUM",
  "/rdv public consomme le landing public AMARKHYS",
  publicRdv.includes("AmarkhysPublicAppointmentLanding"),
  targets.publicRdv
);

check(
  "MEDIUM",
  "Landing public consomme disponibilité scheduling runtime",
  publicLanding.includes("getPublicSchedulingAvailabilityAction") &&
    publicLanding.includes("RuntimePublicSchedulingContractBridge") &&
    publicLanding.includes("createPublicAppointment"),
  "src/components/public/AmarkhysPublicAppointmentLanding.tsx"
);

const stockService = read(targets.stockMovementService);
check(
  "HIGH",
  "RuntimeStockMovementService protège mouvements stock",
  stockService.includes("typeMouvement") &&
    stockService.includes("quantite"),
  targets.stockMovementService
);

const actionEngine = read(targets.actionEngine);
check(
  "MEDIUM",
  "RuntimeActionEngine présent",
  actionEngine.includes("RuntimeActionEngine"),
  targets.actionEngine
);

const contextEnforcer = read(targets.contextEnforcer);
check(
  "HIGH",
  "RuntimeContextEnforcer protège tenant/workspace/moduleKey",
  contextEnforcer.includes("tenantId") &&
    contextEnforcer.includes("workspace") &&
    contextEnforcer.includes("moduleKey"),
  targets.contextEnforcer
);

const diagnostics = [
  "GENERIC_EDIT_RECORD_LOADED",
  "ERP_RUNTIME_PAGE_RENDER",
  "ERP_ENTERPRISE_FORM_RENDER",
  "ERP_FORM_TABS_RENDER",
  "QCLIENT360_VISIBLE_FIELDS_DEBUG",
  "QCLIENT360_SECTION_FIELDS_DEBUG",
  "QCLIENT360_FIELD_WRAPPER_DEBUG",
];

const scanned = [
  targets.enterpriseForm,
  targets.formField,
  targets.runtimePage,
  targets.relatedPanel,
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
  "src/components/erp/generic/GenericEditPage.tsx",
].map((rel) => [rel, read(rel)]);

for (const marker of diagnostics) {
  const foundIn = scanned
    .filter(([, content]) => content.includes(marker))
    .map(([rel]) => rel);

  check(
    "MEDIUM",
    `Aucun diagnostic temporaire: ${marker}`,
    foundIn.length === 0,
    foundIn.join(", ")
  );
}

const okCount = checks.filter((item) => item.ok).length;
const failCount = checks.filter((item) => !item.ok).length;
const highFailCount = checks.filter((item) => !item.ok && item.level === "HIGH").length;

const outDir = path.join(root, "docs", "audits");
fs.mkdirSync(outDir, { recursive: true });

const json = {
  audit: "Q-FREEZE-AMARKHYS-1",
  title: "Audit final avant gel / présentation",
  generatedAt: new Date().toISOString(),
  summary: {
    okCount,
    failCount,
    highFailCount,
  },
  checks,
  files,
};

const jsonPath = path.join(outDir, "Q-FREEZE-AMARKHYS-1-final-audit.json");
const mdPath = path.join(outDir, "Q-FREEZE-AMARKHYS-1-final-audit.md");

fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2), "utf8");

const md = [
  "# Q-FREEZE-AMARKHYS-1 — Audit final avant gel / présentation",
  "",
  `Generated: ${json.generatedAt}`,
  "",
  "## Résumé",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  `- FAIL HIGH: ${highFailCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((item) => {
    const icon = item.ok ? "✅" : item.level === "HIGH" ? "🟥" : "⚠️";
    return `- ${icon} **${item.ok ? "OK" : item.level}** — ${item.label}${item.details ? ` — \`${item.details}\`` : ""}`;
  }),
  "",
  "## Décision",
  "",
  highFailCount === 0
    ? "Aucun blocage HIGH détecté par l’audit structurel. Faire maintenant le test fonctionnel navigateur avant gel."
    : "Blocage HIGH détecté. Ne pas geler avant correction.",
  "",
].join("\n");

fs.writeFileSync(mdPath, md, "utf8");

console.log("[Q-FREEZE-AMARKHYS-1] DONE");
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);
console.log("[FAIL_HIGH]", highFailCount);
console.log("[REPORT]", path.relative(root, mdPath));
console.log("[JSON]", path.relative(root, jsonPath));
console.log("");
console.log("Next:");
console.log("  Get-Content .\\docs\\audits\\Q-FREEZE-AMARKHYS-1-final-audit.md");
