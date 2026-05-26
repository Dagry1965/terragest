const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q-PUBLIC-SCHED-D-C-selected-runtime-slot-audit.md"
);

function full(rel) {
  return path.join(ROOT, rel);
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
  landing: "src/components/public/AmarkhysPublicAppointmentLanding.tsx",
  service: "src/components/public/PublicAppointmentService.ts",
  availability:
    "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const checks = [];

check(
  checks,
  "Q-PUBLIC-SCHED-D-C-01",
  "Landing exige un créneau choisi avant soumission",
  has(content.landing, "Choisissez un créneau disponible."),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-C-02",
  "Landing envoie dateSouhaitee et heureSouhaitee à createPublicAppointment",
  has(content.landing, "dateSouhaitee: form.dateSouhaitee") &&
    has(content.landing, "heureSouhaitee: form.heureSouhaitee"),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-C-03",
  "Landing calcule durationMinutes depuis selectedSlot",
  has(content.landing, "durationMinutes") &&
    has(content.landing, "selectedSlot") &&
    has(content.landing, "selectedSlot.endTime") &&
    has(content.landing, "selectedSlot.startTime"),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-C-04",
  "PublicAppointmentInput accepte les champs de créneau public",
  has(content.service, "dateSouhaitee?: string") &&
    has(content.service, "heureSouhaitee?: string") &&
    has(content.service, "durationMinutes?: number"),
  files.service
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-C-05",
  "PublicAppointmentService normalise date/heure/durée",
  has(content.service, "normalizePublicAppointmentDate") &&
    has(content.service, "normalizePublicAppointmentTime") &&
    has(content.service, "normalizePublicAppointmentDuration"),
  files.service
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-C-06",
  "Rendezvous public utilise le créneau choisi",
  has(content.service, "dateRendezVous,") &&
    has(content.service, "heureRendezVous,") &&
    has(content.service, "durationMinutes,") &&
    !has(content.service, "dateRendezVous: now") &&
    !has(content.service, 'heureRendezVous: ""'),
  files.service
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-C-07",
  "PublicAppointmentService retourne toujours un DTO public sécurisé",
  has(content.service, "PublicAppointmentResult") &&
    !has(content.service, "return rendezvous;") &&
    !has(content.service, /return\s+client\s*;/) &&
    !has(content.service, /return\s+vehicule\s*;/),
  files.service
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-C-08",
  "Landing ne touche pas Firestore directement",
  !has(content.landing, "firebase/firestore") &&
    !has(content.landing, "runtimeFirestore") &&
    !has(content.landing, "setDoc(") &&
    !has(content.landing, "getDoc("),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-C-09",
  "Landing ne rend pas d'identifiants internes",
  !has(content.landing, /codeClient|clientId|vehiculeId|rendezvousId/i),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-C-10",
  "Availability service reste source des créneaux publics",
  has(content.availability, "RuntimeSchedulingEngine") &&
    has(content.availability, "getAvailableSlotsWithBookings"),
  files.availability
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q-PUBLIC-SCHED-D-C — Selected runtime slot submit audit

Date: ${new Date().toISOString()}

## Objectif

Auditer l'envoi du créneau runtime sélectionné depuis la page publique /rdv vers createPublicAppointment.

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
  report += `Des échecs HIGH existent. Corriger avant commit.\n`;
} else {
  report += `Aucun échec HIGH. La page publique peut créer un RDV avec le créneau runtime sélectionné.\n`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q-PUBLIC-SCHED-D-C] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);