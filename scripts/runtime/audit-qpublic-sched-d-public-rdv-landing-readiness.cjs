const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q-PUBLIC-SCHED-D-public-rdv-landing-readiness-audit.md"
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
  landing: "src/components/public/AmarkhysPublicAppointmentLanding.tsx",
  availabilityActions:
    "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts",
  availabilityService:
    "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts",
  availabilityTypes:
    "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityTypes.ts",
  appointmentService: "src/components/public/PublicAppointmentService.ts",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const landingLines = findLines(content.landing, [
  /useState/,
  /useEffect/,
  /createPublicAppointment/,
  /const days =/,
  /dots:/,
  /active:/,
  /handleSubmit/,
  /success/,
  /saving/,
  /form\./,
]);

const slotUiLines = findLines(content.landing, [
  /days\.map/,
  /slots/,
  /cr[eé]neau/i,
  /date/,
  /heure/i,
  /button/i,
  /active/,
  /dots/,
]);

const checks = [];

check(
  checks,
  "Q-PUBLIC-SCHED-D-A-01",
  "Landing public RDV existe",
  exists(files.landing),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-A-02",
  "Action public availability existe",
  exists(files.availabilityActions) &&
    has(content.availabilityActions, "getPublicSchedulingAvailabilityAction"),
  files.availabilityActions
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-A-03",
  "Types publics availability existent",
  exists(files.availabilityTypes) &&
    has(content.availabilityTypes, "RuntimePublicSchedulingDay") &&
    has(content.availabilityTypes, "RuntimePublicSchedulingSlot"),
  files.availabilityTypes
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-A-04",
  "Service public availability utilise le moteur runtime",
  has(content.availabilityService, "RuntimeSchedulingEngine") &&
    has(content.availabilityService, "getAvailableSlotsWithBookings"),
  files.availabilityService
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-A-05",
  "Landing utilise createPublicAppointment",
  has(content.landing, "createPublicAppointment"),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-A-06",
  "Landing contient encore les jours/créneaux statiques à remplacer",
  has(content.landing, "const days = [") ||
    has(content.landing, "dots:") ||
    has(content.landing, "27 MAI"),
  files.landing,
  "INFO"
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-A-07",
  "Landing n'est pas encore connectée à public availability",
  !has(content.landing, "getPublicSchedulingAvailabilityAction"),
  files.landing,
  "INFO"
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-A-08",
  "Landing ne touche pas Firestore directement",
  !has(content.landing, "firebase/firestore") &&
    !has(content.landing, "runtimeFirestore") &&
    !has(content.landing, "collection(") &&
    !has(content.landing, "doc(") &&
    !has(content.landing, "setDoc(") &&
    !has(content.landing, "getDoc("),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-A-09",
  "PublicAppointmentService retourne un DTO public sécurisé",
  has(content.appointmentService, "PublicAppointmentResult") &&
    !has(content.appointmentService, "return rendezvous;"),
  files.appointmentService
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-A-10",
  "Landing ne rend pas explicitement codeClient",
  !has(content.landing, /codeClient|clientId|vehiculeId|rendezvousId/i),
  files.landing
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q-PUBLIC-SCHED-D-A — Public RDV landing readiness audit

Date: ${new Date().toISOString()}

## Objectif

Auditer AmarkhysPublicAppointmentLanding avant branchement à Runtime Public Scheduling Availability.

Doctrine:
- La page publique ne calcule pas les slots.
- La page publique appelle getPublicSchedulingAvailabilityAction.
- Les jours/créneaux statiques doivent être remplacés par des DTO publics.
- Aucun identifiant interne ne doit être affiché.

## Résumé

- Checks: ${checks.length}
- OK: ${checks.filter((c) => c.ok).length}
- FAIL: ${checks.filter((c) => !c.ok).length}
- FAIL_HIGH: ${highFails.length}
- FAIL_INFO: ${infoFails.length}

## Fichiers inspectés

${Object.values(files).map((file) => `- \`${file}\``).join("\n")}

## Lignes candidates landing

\`\`\`txt
${landingLines.slice(0, 180).join("\n") || "Aucune ligne candidate"}
\`\`\`

## Lignes candidates UI slots

\`\`\`txt
${slotUiLines.slice(0, 180).join("\n") || "Aucune ligne candidate"}
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
  report += `Des échecs HIGH existent. Corriger avant de brancher la page publique.\n`;
} else {
  report += `Aucun échec HIGH. La page publique peut être connectée à l'action public availability.

Suite:
- Q-PUBLIC-SCHED-D-B — patch landing pour charger les disponibilités runtime.
- Q-PUBLIC-SCHED-D-C — envoyer le créneau choisi à createPublicAppointment.
`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q-PUBLIC-SCHED-D-A] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);