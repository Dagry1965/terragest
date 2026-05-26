const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9N-E-scheduling-settings-actions-audit.md"
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
  actions:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts",
  service:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts",
  repository:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts",
  index:
    "src/runtime/scheduling/settings/index.ts",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const checks = [];

check(
  checks,
  "Q22E-9N-E-01",
  "RuntimeSchedulingSettingsActions existe",
  exists(files.actions),
  files.actions
);

check(
  checks,
  "Q22E-9N-E-02",
  "Actions utilisent use server",
  has(content.actions, '"use server"') || has(content.actions, "'use server'"),
  files.actions
);

check(
  checks,
  "Q22E-9N-E-03",
  "Actions exposent read/save",
  has(content.actions, "readRuntimeSchedulingSettingsAction") &&
    has(content.actions, "saveRuntimeSchedulingSettingsAction"),
  files.actions
);

check(
  checks,
  "Q22E-9N-E-04",
  "Actions passent par RuntimeSchedulingSettingsService",
  has(content.actions, "RuntimeSchedulingSettingsService.read") &&
    has(content.actions, "RuntimeSchedulingSettingsService.save"),
  files.actions
);

check(
  checks,
  "Q22E-9N-E-05",
  "Actions ne touchent pas directement Firestore",
  !has(content.actions, "firebase/firestore") &&
    !has(content.actions, "runtimeFirestore") &&
    !has(content.actions, "collection(") &&
    !has(content.actions, "doc(") &&
    !has(content.actions, "setDoc(") &&
    !has(content.actions, "getDoc("),
  files.actions
);

check(
  checks,
  "Q22E-9N-E-06",
  "Actions imposent tenantId",
  has(content.actions, "assertActionContext") &&
    has(content.actions, "tenantId"),
  files.actions
);

check(
  checks,
  "Q22E-9N-E-07",
  "Actions ne hardcodent pas AMARKHYS/garage/rendezvous",
  !has(content.actions, /amarkhys|garage|rendezvous|dateRendezVous|heureRendezVous|vehiculeId|typeService/i),
  files.actions
);

check(
  checks,
  "Q22E-9N-E-08",
  "Actions sont exportées depuis settings/index.ts",
  has(content.index, "RuntimeSchedulingSettingsActions"),
  files.index
);

check(
  checks,
  "Q22E-9N-E-09",
  "Actions ne contournent pas le service avec le repository",
  !has(content.actions, "RuntimeSchedulingSettingsRepository"),
  files.actions
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q22E-9N-E — Scheduling settings actions audit

Date: ${new Date().toISOString()}

## Objectif

Auditer la couche server action générique entre la future UI paramètres planning et le service runtime.

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
  report += `Des échecs HIGH existent. Corriger les actions avant toute UI.\n`;
} else {
  report += `Aucun échec HIGH. La couche server action est prête pour une future UI générique de paramètres planning.\n`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q22E-9N-E] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);