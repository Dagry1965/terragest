const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q-PUBLIC-SCHED-C-public-availability-api-readiness-audit.md"
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

function findLines(content, patterns) {
  return content
    .split(/\r?\n/)
    .map((line, index) => ({ line, number: index + 1 }))
    .filter(({ line }) =>
      patterns.some((pattern) =>
        pattern instanceof RegExp ? pattern.test(line) : line.includes(pattern)
      )
    )
    .map(({ line, number }) => `${number}: ${line.trim()}`);
}

fs.mkdirSync(REPORT_DIR, { recursive: true });

const files = {
  publicLanding:
    "src/components/public/AmarkhysPublicAppointmentLanding.tsx",
  publicAppointmentService:
    "src/components/public/PublicAppointmentService.ts",
  runtimeSchedulingEngine:
    "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  runtimeSchedulingTypes:
    "src/runtime/scheduling/RuntimeSchedulingTypes.ts",
  schedulingSlotPolicy:
    "src/runtime/scheduling/SchedulingSlotPolicy.ts",
  settingsResolver:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts",
  settingsEngine:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts",
  rendezvousModule:
    "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  planningView:
    "src/components/erp/scheduling/ERPSchedulingPlanningView.tsx",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const engineApiLines = findLines(content.runtimeSchedulingEngine, [
  /static\s+/,
  /function\s+/,
  /getAvailable/i,
  /availability/i,
  /slot/i,
  /generate/i,
  /build/i,
]);

const policyLines = findLines(content.schedulingSlotPolicy, [
  /export/,
  /slotDurationMinutes/,
  /bufferMinutes/,
  /capacity/,
  /fieldMapping/,
  /resolve/i,
]);

const resolverLines = findLines(content.settingsResolver, [
  /resolve/,
  /resolveForRuntimeGuard/,
  /RuntimeSchedulingSettingsResolver/,
]);

const planningUsageLines = findLines(content.planningView, [
  /RuntimeSchedulingSettingsResolver/,
  /RuntimeSchedulingEngine/,
  /SchedulingSlotPolicy/,
  /slot/,
  /availability/,
]);

const checks = [];

check(
  checks,
  "Q-PUBLIC-SCHED-C-A-01",
  "RuntimeSchedulingEngine existe",
  exists(files.runtimeSchedulingEngine),
  files.runtimeSchedulingEngine
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-A-02",
  "RuntimeSchedulingEngine expose des APIs candidates de slots/disponibilités",
  engineApiLines.length > 0,
  engineApiLines.slice(0, 80).join("\n") || "Aucune ligne candidate"
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-A-03",
  "SchedulingSlotPolicy expose durée/buffer/capacité/mapping",
  has(content.schedulingSlotPolicy, "slotDurationMinutes") &&
    has(content.schedulingSlotPolicy, "bufferMinutes") &&
    has(content.schedulingSlotPolicy, "capacity") &&
    has(content.schedulingSlotPolicy, "fieldMapping"),
  files.schedulingSlotPolicy
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-A-04",
  "RuntimeSchedulingSettingsResolver existe et expose resolve",
  exists(files.settingsResolver) &&
    has(content.settingsResolver, "RuntimeSchedulingSettingsResolver") &&
    has(content.settingsResolver, "resolve"),
  files.settingsResolver
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-A-05",
  "Planning privé consomme déjà la chaîne scheduling runtime",
  has(content.planningView, "RuntimeSchedulingSettingsResolver") &&
    has(content.planningView, "RuntimeSchedulingEngine"),
  files.planningView,
  "INFO"
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-A-06",
  "Page publique contient encore des jours/créneaux statiques à remplacer",
  has(content.publicLanding, "const days = [") ||
    has(content.publicLanding, "dots:") ||
    has(content.publicLanding, "27 MAI"),
  files.publicLanding,
  "INFO"
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-A-07",
  "PublicAppointmentService retourne un DTO public sécurisé",
  has(content.publicAppointmentService, "PublicAppointmentResult") &&
    !has(content.publicAppointmentService, "return rendezvous;"),
  files.publicAppointmentService
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-A-08",
  "Aucun accès Firestore direct dans la page publique",
  !has(content.publicLanding, "firebase/firestore") &&
    !has(content.publicLanding, "runtimeFirestore") &&
    !has(content.publicLanding, "collection(") &&
    !has(content.publicLanding, "doc(") &&
    !has(content.publicLanding, "setDoc(") &&
    !has(content.publicLanding, "getDoc("),
  files.publicLanding
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-A-09",
  "Module rendezvous déclare un scheduling metadata-driven",
  has(content.rendezvousModule, /scheduling[\s\S]*enabled/) &&
    has(content.rendezvousModule, /dateField|dateRendezVous/) &&
    has(content.rendezvousModule, /timeField|heureRendezVous/),
  files.rendezvousModule
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-A-10",
  "Aucune couche public availability n'existe encore",
  !exists("src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts") &&
    !exists("src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts"),
  "src/runtime/scheduling/public",
  "INFO"
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q-PUBLIC-SCHED-C-A — Public scheduling availability API readiness audit

Date: ${new Date().toISOString()}

## Objectif

Inspecter les APIs existantes avant de créer la couche Public Scheduling Availability.

Doctrine:
- Ne pas calculer les slots dans la page publique.
- Ne pas lire Firestore depuis la page publique.
- Ne pas inventer une API RuntimeSchedulingEngine.
- Réutiliser la chaîne runtime existante.

## Résumé

- Checks: ${checks.length}
- OK: ${checks.filter((c) => c.ok).length}
- FAIL: ${checks.filter((c) => !c.ok).length}
- FAIL_HIGH: ${highFails.length}
- FAIL_INFO: ${infoFails.length}

## Fichiers inspectés

${Object.values(files).map((file) => `- \`${file}\``).join("\n")}

## API candidates — RuntimeSchedulingEngine

\`\`\`txt
${engineApiLines.slice(0, 160).join("\n") || "Aucune ligne candidate"}
\`\`\`

## API candidates — SchedulingSlotPolicy

\`\`\`txt
${policyLines.slice(0, 120).join("\n") || "Aucune ligne candidate"}
\`\`\`

## API candidates — RuntimeSchedulingSettingsResolver

\`\`\`txt
${resolverLines.slice(0, 120).join("\n") || "Aucune ligne candidate"}
\`\`\`

## Usage planning privé existant

\`\`\`txt
${planningUsageLines.slice(0, 160).join("\n") || "Aucune ligne candidate"}
\`\`\`

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
  report += `Des échecs HIGH existent. Corriger avant création de la couche public availability.\n`;
} else {
  report += `Aucun échec HIGH. Créer ensuite une couche public availability dans src/runtime/scheduling/public, en s'appuyant sur les APIs réellement disponibles.\n`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q-PUBLIC-SCHED-C-A] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);