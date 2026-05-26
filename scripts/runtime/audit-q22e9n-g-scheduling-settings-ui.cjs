const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9N-G-scheduling-settings-ui-audit.md"
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
  panel:
    "src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx",
  page:
    "src/app/(private)/settings/scheduling/page.tsx",
  actions:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const checks = [];

check(
  checks,
  "Q22E-9N-G-01",
  "ERPSchedulingSettingsPanel existe",
  exists(files.panel),
  files.panel
);

check(
  checks,
  "Q22E-9N-G-02",
  "Route settings/scheduling existe",
  exists(files.page),
  files.page
);

check(
  checks,
  "Q22E-9N-G-03",
  "UI appelle les server actions read/save",
  has(content.panel, "readRuntimeSchedulingSettingsAction") &&
    has(content.panel, "saveRuntimeSchedulingSettingsAction"),
  files.panel
);

check(
  checks,
  "Q22E-9N-G-04",
  "UI ne touche pas directement Firestore",
  !has(content.panel, "firebase/firestore") &&
    !has(content.panel, "runtimeFirestore") &&
    !has(content.panel, "collection(") &&
    !has(content.panel, "doc(") &&
    !has(content.panel, "setDoc(") &&
    !has(content.panel, "getDoc("),
  files.panel
);

check(
  checks,
  "Q22E-9N-G-05",
  "UI ne consomme pas le repository directement",
  !has(content.panel, "RuntimeSchedulingSettingsRepository"),
  files.panel
);

check(
  checks,
  "Q22E-9N-G-06",
  "UI ne hardcode pas AMARKHYS/garage",
  !has(content.panel, /amarkhys|garage/i),
  files.panel
);

check(
  checks,
  "Q22E-9N-G-07",
  "UI évite la sauvegarde des mappings structurels non persistables",
  !has(content.panel, "dateField: form.dateField") &&
    !has(content.panel, "timeField: form.timeField") &&
    !has(content.panel, "durationField: form.durationField") &&
    !has(content.panel, "startField: form.startField") &&
    !has(content.panel, "endField: form.endField"),
  files.panel
);

check(
  checks,
  "Q22E-9N-G-08",
  "UI affiche les mappings structurels en lecture seule",
  has(content.panel, "readOnly") &&
    has(content.panel, "dateField") &&
    has(content.panel, "timeField") &&
    has(content.panel, "durationField") &&
    has(content.panel, "startField") &&
    has(content.panel, "endField"),
  files.panel
);

check(
  checks,
  "Q22E-9N-G-09",
  "UI édite les paramètres persistables",
  has(content.panel, "defaultDurationMinutes") &&
    has(content.panel, "bufferMinutes") &&
    has(content.panel, "capacity") &&
    has(content.panel, "enabled") &&
    has(content.panel, "resourceField"),
  files.panel
);

check(
  checks,
  "Q22E-9N-G-10",
  "Page utilise le panel générique",
  has(content.page, "ERPSchedulingSettingsPanel"),
  files.page
);

check(
  checks,
  "Q22E-9N-G-11",
  "Page ne touche pas Firestore ni repository",
  !has(content.page, "firebase/firestore") &&
    !has(content.page, "runtimeFirestore") &&
    !has(content.page, "RuntimeSchedulingSettingsRepository"),
  files.page
);

check(
  checks,
  "Q22E-9N-G-12",
  "Actions existent toujours",
  exists(files.actions) &&
    has(content.actions, "readRuntimeSchedulingSettingsAction") &&
    has(content.actions, "saveRuntimeSchedulingSettingsAction"),
  files.actions
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q22E-9N-G — Scheduling settings UI audit

Date: ${new Date().toISOString()}

## Objectif

Auditer l'UI générique de paramètres planning.

Règles:
- UI générique.
- Pas de Firestore direct.
- Pas de repository direct.
- Appel uniquement aux server actions.
- Les mappings structurels sont affichés mais pas sauvegardés comme settings éditables.

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
  report += `Des échecs HIGH existent. Corriger l'UI avant commit.\n`;
} else {
  report += `Aucun échec HIGH. L'UI générique de paramètres planning est prête pour test visuel et commit.\n`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q22E-9N-G] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);