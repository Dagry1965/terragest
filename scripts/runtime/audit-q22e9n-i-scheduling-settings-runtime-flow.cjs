const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9N-I-scheduling-settings-runtime-flow-audit.md"
);

function full(rel) {
  return path.join(ROOT, rel);
}

function exists(rel) {
  return fs.existsSync(full(rel));
}

function read(rel) {
  const file = full(rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function has(content, pattern) {
  if (!content) return false;
  if (pattern instanceof RegExp) return pattern.test(content);
  return content.includes(pattern);
}

function check(checks, id, label, ok, details = "", severity = "HIGH") {
  checks.push({
    id,
    label,
    ok: Boolean(ok),
    details,
    severity,
  });
}

fs.mkdirSync(REPORT_DIR, { recursive: true });

const files = {
  page: "src/app/(private)/settings/scheduling/page.tsx",
  panel:
    "src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx",
  actions:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts",
  service:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts",
  repository:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts",
  resolver:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts",
  settingsEngine:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts",
  planningView:
    "src/components/erp/scheduling/ERPSchedulingPlanningView.tsx",
  policy:
    "src/runtime/scheduling/SchedulingSlotPolicy.ts",
  schedulingEngine:
    "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  navigation:
    "src/runtime/navigation/ERPNavigationEngine.ts",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const checks = [];

check(
  checks,
  "Q22E-9N-I-01",
  "Route /settings/scheduling existe et rend le panel",
  exists(files.page) &&
    has(content.page, "ERPSchedulingSettingsPanel"),
  files.page
);

check(
  checks,
  "Q22E-9N-I-02",
  "Panel charge via readRuntimeSchedulingSettingsAction",
  has(content.panel, "readRuntimeSchedulingSettingsAction") &&
    has(content.panel, "loadSettings"),
  files.panel
);

check(
  checks,
  "Q22E-9N-I-03",
  "Panel sauvegarde via saveRuntimeSchedulingSettingsAction",
  has(content.panel, "saveRuntimeSchedulingSettingsAction") &&
    has(content.panel, "saveSettings"),
  files.panel
);

check(
  checks,
  "Q22E-9N-I-04",
  "Panel sauvegarde uniquement les settings éditables persistables",
  has(content.panel, "defaultDurationMinutes") &&
    has(content.panel, "bufferMinutes") &&
    has(content.panel, "capacity") &&
    has(content.panel, "resourceField") &&
    !has(content.panel, "dateField: form.dateField") &&
    !has(content.panel, "timeField: form.timeField") &&
    !has(content.panel, "durationField: form.durationField") &&
    !has(content.panel, "startField: form.startField") &&
    !has(content.panel, "endField: form.endField"),
  files.panel
);

check(
  checks,
  "Q22E-9N-I-05",
  "Actions délèguent au service",
  has(content.actions, "RuntimeSchedulingSettingsService.read") &&
    has(content.actions, "RuntimeSchedulingSettingsService.save"),
  files.actions
);

check(
  checks,
  "Q22E-9N-I-06",
  "Service délègue au repository et au resolver",
  has(content.service, "RuntimeSchedulingSettingsRepository") &&
    has(content.service, "RuntimeSchedulingSettingsResolver") &&
    has(content.service, "resolveEffectiveConfigIfPossible"),
  files.service
);

check(
  checks,
  "Q22E-9N-I-07",
  "Repository persiste dans runtimeSchedulingSettings",
  has(content.repository, "runtimeSchedulingSettings") &&
    has(content.repository, "saveTenantSettings") &&
    has(content.repository, "saveWorkspaceSettings") &&
    has(content.repository, "saveModuleSettings") &&
    has(content.repository, "setDoc") &&
    has(content.repository, "{ merge: true }"),
  files.repository
);

check(
  checks,
  "Q22E-9N-I-08",
  "Resolver consomme les settings stockés tenant/workspace/module",
  has(content.resolver, "resolveStoredSettings") ||
    has(content.resolver, "tenantSettings") ||
    has(content.resolver, "workspaceSettings") ||
    has(content.resolver, "moduleSettings"),
  files.resolver
);

check(
  checks,
  "Q22E-9N-I-09",
  "Settings engine fusionne settings et produit effective config",
  has(content.settingsEngine, "static resolve") &&
    has(content.settingsEngine, "tenantSettings") &&
    has(content.settingsEngine, "workspaceSettings") &&
    has(content.settingsEngine, "moduleSettings") &&
    has(content.settingsEngine, "sourceTrace"),
  files.settingsEngine
);

check(
  checks,
  "Q22E-9N-I-10",
  "Planning view consomme RuntimeSchedulingSettingsResolver",
  has(content.planningView, "RuntimeSchedulingSettingsResolver") &&
    has(content.planningView, "resolve"),
  files.planningView
);

check(
  checks,
  "Q22E-9N-I-11",
  "Policy transporte buffer/capacity/duration",
  has(content.policy, "bufferMinutes") &&
    has(content.policy, "capacity") &&
    has(content.policy, "slotDurationMinutes") &&
    has(content.policy, "fieldMapping"),
  files.policy
);

check(
  checks,
  "Q22E-9N-I-12",
  "RuntimeSchedulingEngine consomme la policy/config générique",
  has(content.schedulingEngine, "resolveRuntimeSchedulingFieldConfig") &&
    !has(content.schedulingEngine, /dateRendezVous|heureRendezVous|typeService|vehiculeId/i),
  files.schedulingEngine
);

check(
  checks,
  "Q22E-9N-I-13",
  "Navigation expose /settings/scheduling",
  has(content.navigation, 'href: "/settings/scheduling"') &&
    has(content.navigation, 'key: "settings-scheduling"'),
  files.navigation
);

check(
  checks,
  "Q22E-9N-I-14",
  "UI/action/service ne touchent pas Firestore directement hors repository",
  !has(content.page, "firebase/firestore") &&
    !has(content.panel, "firebase/firestore") &&
    !has(content.actions, "firebase/firestore") &&
    !has(content.service, "firebase/firestore") &&
    !has(content.panel, "runtimeFirestore") &&
    !has(content.actions, "runtimeFirestore") &&
    !has(content.service, "runtimeFirestore") &&
    !has(content.panel, "setDoc(") &&
    !has(content.actions, "setDoc(") &&
    !has(content.service, "setDoc("),
  "page/panel/actions/service"
);

check(
  checks,
  "Q22E-9N-I-15",
  "Aucun hardcode AMARKHYS/garage dans la chaîne settings scheduling",
  !has(content.page, /amarkhys|garage/i) &&
    !has(content.panel, /amarkhys|garage/i) &&
    !has(content.actions, /amarkhys|garage/i) &&
    !has(content.service, /amarkhys|garage/i) &&
    !has(content.navigation, /amarkhys|garage/i),
  "page/panel/actions/service/navigation"
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q22E-9N-I — Scheduling settings runtime flow audit

Date: ${new Date().toISOString()}

## Objectif

Auditer le flux runtime avant test manuel de l'UI paramètres planning.

Chaîne attendue:

- Navigation runtime
- Route /settings/scheduling
- ERPSchedulingSettingsPanel
- RuntimeSchedulingSettingsActions
- RuntimeSchedulingSettingsService
- RuntimeSchedulingSettingsRepository
- RuntimeSchedulingSettingsResolver
- RuntimeSchedulingSettingsEngine
- SchedulingSlotPolicy
- RuntimeSchedulingEngine
- Planning view

## Résumé

- Checks: ${checks.length}
- OK: ${checks.filter((c) => c.ok).length}
- FAIL: ${checks.filter((c) => !c.ok).length}
- FAIL_HIGH: ${highFails.length}
- FAIL_INFO: ${infoFails.length}

## Fichiers inspectés

${Object.values(files).map((file) => `- \`${file}\``).join("\n")}

## Checks détaillés

`;

for (const c of checks) {
  report += `\n### ${c.ok ? "OK" : "FAIL"} — ${c.id}\n\n`;
  report += `- Label: ${c.label}\n`;
  report += `- Severity: ${c.severity}\n`;
  report += `- Details: ${c.details || "-"}\n`;
}

report += `\n## Décision recommandée\n\n`;

if (highFails.length > 0) {
  report += `Des échecs HIGH existent. Ne pas faire le test manuel tant que la chaîne n'est pas corrigée.\n`;
} else {
  report += `Aucun échec HIGH. Le test manuel UI runtime peut être lancé.

Test manuel recommandé:
1. Ouvrir /settings/scheduling.
2. Cliquer Charger.
3. Modifier Durée visible, Buffer, Capacité.
4. Cliquer Enregistrer.
5. Vérifier document runtimeSchedulingSettings côté Firestore.
6. Ouvrir le planning et vérifier le recalcul des slots.
`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q22E-9N-I-A] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);