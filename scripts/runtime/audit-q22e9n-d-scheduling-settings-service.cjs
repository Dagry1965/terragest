const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9N-D-scheduling-settings-service-audit.md"
);

function full(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  const file = full(rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function exists(rel) {
  return fs.existsSync(full(rel));
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
  service:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts",
  repository:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts",
  resolver:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts",
  engine:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts",
  index:
    "src/runtime/scheduling/settings/index.ts",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const checks = [];

check(
  checks,
  "Q22E-9N-D-01",
  "RuntimeSchedulingSettingsService existe",
  exists(files.service),
  files.service
);

check(
  checks,
  "Q22E-9N-D-02",
  "Service expose read/save/validateEffectiveConfig",
  has(content.service, "static async read") &&
    has(content.service, "static async save") &&
    has(content.service, "static validateEffectiveConfig"),
  files.service
);

check(
  checks,
  "Q22E-9N-D-03",
  "Service utilise le repository sans accès Firestore direct",
  has(content.service, "RuntimeSchedulingSettingsRepository") &&
    !has(content.service, "firebase/firestore") &&
    !has(content.service, "runtimeFirestore") &&
    !has(content.service, "collection(") &&
    !has(content.service, "setDoc(") &&
    !has(content.service, "getDoc("),
  files.service
);

check(
  checks,
  "Q22E-9N-D-04",
  "Service valide uniquement une config effective",
  has(content.service, "RuntimeSchedulingSettingsEngine.validate(config)") &&
    !has(content.service, "RuntimeSchedulingSettingsEngine.validate(settings)"),
  files.service
);

check(
  checks,
  "Q22E-9N-D-05",
  "Service peut résoudre la config effective via resolver",
  has(content.service, "RuntimeSchedulingSettingsResolver") &&
    has(content.service, "resolveForRuntimeGuard"),
  files.service
);

check(
  checks,
  "Q22E-9N-D-06",
  "Service impose tenant/workspace/module selon scope",
  has(content.service, "requireRuntimeContext") &&
    has(content.service, "assertScopeContext") &&
    has(content.service, "tenantId") &&
    has(content.service, "workspaceId") &&
    has(content.service, "moduleKey"),
  files.service
);

check(
  checks,
  "Q22E-9N-D-07",
  "Service ne hardcode pas AMARKHYS/garage/rendezvous",
  !has(content.service, /amarkhys|garage|rendezvous|dateRendezVous|heureRendezVous|vehiculeId|typeService/i),
  files.service
);

check(
  checks,
  "Q22E-9N-D-08",
  "Service est exporté depuis settings/index.ts",
  has(content.index, "RuntimeSchedulingSettingsService"),
  files.index
);

check(
  checks,
  "Q22E-9N-D-09",
  "Service n'entre pas en collision avec les types repository",
  !has(content.service, "export interface RuntimeSchedulingSettingsSaveInput") &&
    !has(content.service, "export interface RuntimeSchedulingSettingsReadInput"),
  files.service
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q22E-9N-D — Scheduling settings service audit

Date: ${new Date().toISOString()}

## Objectif

Auditer la couche service générique créée entre la future UI paramètres planning et le repository.

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
  report += `Des échecs HIGH existent. Corriger le service avant toute UI.\n`;
} else {
  report += `Aucun échec HIGH. La couche service est prête pour une future server action ou UI générique.\n`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q22E-9N-D] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);