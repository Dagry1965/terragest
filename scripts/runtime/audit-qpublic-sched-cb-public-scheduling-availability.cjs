const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q-PUBLIC-SCHED-C-B-public-scheduling-availability-audit.md"
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
  types:
    "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityTypes.ts",
  service:
    "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts",
  actions:
    "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts",
  index:
    "src/runtime/scheduling/public/index.ts",
  publicLanding:
    "src/components/public/AmarkhysPublicAppointmentLanding.tsx",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const checks = [];

check(
  checks,
  "Q-PUBLIC-SCHED-C-B-01",
  "Types public scheduling availability existent",
  exists(files.types) &&
    has(content.types, "RuntimePublicSchedulingSlot") &&
    has(content.types, "RuntimePublicSchedulingAvailabilityResult"),
  files.types
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-B-02",
  "Service public scheduling availability existe",
  exists(files.service) &&
    has(content.service, "RuntimePublicSchedulingAvailabilityService") &&
    has(content.service, "getAvailability"),
  files.service
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-B-03",
  "Action server public availability existe",
  exists(files.actions) &&
    has(content.actions, '"use server"') &&
    has(content.actions, "getPublicSchedulingAvailabilityAction"),
  files.actions
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-B-04",
  "Service utilise le resolver settings scheduling",
  has(content.service, "RuntimeSchedulingSettingsResolver") &&
    has(content.service, "resolveForRuntimeGuard"),
  files.service
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-B-05",
  "Service utilise RuntimeSchedulingEngine.getAvailableSlotsWithBookings",
  has(content.service, "RuntimeSchedulingEngine") &&
    has(content.service, "getAvailableSlotsWithBookings"),
  files.service
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-B-06",
  "Service retourne des DTO publics de slots",
  has(content.service, "toPublicSlot") &&
    has(content.service, "startTime") &&
    has(content.service, "endTime") &&
    has(content.service, "available") &&
    has(content.service, "remainingCapacity"),
  files.service
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-B-07",
  "Service ne retourne pas d'identifiants internes publics",
  !has(content.types, /clientId|codeClient|vehiculeId|rendezvousId/i) &&
    !has(content.service, /codeClient/i) &&
    !has(content.service, /return\s+records\s*;/) &&
    !has(content.service, /return\s+client\s*;/) &&
    !has(content.service, /return\s+vehicule\s*;/) &&
    !has(content.service, /return\s+rendezvous\s*;/),
  `${files.types}, ${files.service}`
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-B-08",
  "Service ne touche pas Firestore directement",
  !has(content.service, "firebase/firestore") &&
    !has(content.service, "runtimeFirestore") &&
    !has(content.service, "collection(") &&
    !has(content.service, "doc(") &&
    !has(content.service, "setDoc(") &&
    !has(content.service, "getDoc("),
  files.service
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-B-09",
  "Action ne touche pas Firestore et délègue au service",
  has(content.actions, "RuntimePublicSchedulingAvailabilityService.getAvailability") &&
    !has(content.actions, "firebase/firestore") &&
    !has(content.actions, "runtimeFirestore") &&
    !has(content.actions, "setDoc(") &&
    !has(content.actions, "getDoc("),
  files.actions
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-B-10",
  "Index exporte types/service/actions",
  has(content.index, "RuntimePublicSchedulingAvailabilityTypes") &&
    has(content.index, "RuntimePublicSchedulingAvailabilityService") &&
    has(content.index, "RuntimePublicSchedulingAvailabilityActions"),
  files.index
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-B-11",
  "Page publique n'est pas encore connectée à l'action availability",
  !has(content.publicLanding, "getPublicSchedulingAvailabilityAction"),
  files.publicLanding,
  "INFO"
);

check(
  checks,
  "Q-PUBLIC-SCHED-C-B-12",
  "Jours/créneaux statiques restent à remplacer dans la page publique",
  has(content.publicLanding, "const days = [") ||
    has(content.publicLanding, "dots:") ||
    has(content.publicLanding, "27 MAI"),
  files.publicLanding,
  "INFO"
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q-PUBLIC-SCHED-C-B — Public scheduling availability audit

Date: ${new Date().toISOString()}

## Objectif

Auditer la couche public scheduling availability créée pour exposer des créneaux publics issus du RuntimeSchedulingEngine.

Doctrine:
- La page publique ne calcule pas les slots.
- La couche availability appelle le runtime scheduling.
- Le DTO public n'expose aucun identifiant interne.
- Pas d'accès Firestore direct dans l'action/service.

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
  report += `Des échecs HIGH existent. Corriger avant de connecter /rdv.\n`;
} else {
  report += `Aucun échec HIGH. La couche public availability est prête.

Suite recommandée:
- Q-PUBLIC-SCHED-D — connecter AmarkhysPublicAppointmentLanding à getPublicSchedulingAvailabilityAction.
- Remplacer les jours statiques par les créneaux DTO publics.
`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q-PUBLIC-SCHED-C-B] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);