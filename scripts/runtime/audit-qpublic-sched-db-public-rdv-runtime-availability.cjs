const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q-PUBLIC-SCHED-D-B-public-rdv-runtime-availability-audit.md"
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
  landing:
    "src/components/public/AmarkhysPublicAppointmentLanding.tsx",
  availabilityActions:
    "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts",
  availabilityService:
    "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts",
  availabilityTypes:
    "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityTypes.ts",
  appointmentService:
    "src/components/public/PublicAppointmentService.ts",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const checks = [];

check(
  checks,
  "Q-PUBLIC-SCHED-D-B-01",
  "Landing importe getPublicSchedulingAvailabilityAction",
  has(content.landing, "getPublicSchedulingAvailabilityAction"),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-B-02",
  "Landing charge les disponibilités via useEffect",
  has(content.landing, "useEffect") &&
    has(content.landing, "loadAvailability") &&
    has(content.landing, "getPublicSchedulingAvailabilityAction"),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-B-03",
  "Landing stocke availabilityDays et selectedSlot",
  has(content.landing, "availabilityDays") &&
    has(content.landing, "setAvailabilityDays") &&
    has(content.landing, "selectedSlot") &&
    has(content.landing, "setSelectedSlot"),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-B-04",
  "Landing affiche chargement/erreur/disponibilités runtime",
  has(content.landing, "Chargement des disponibilités") &&
    has(content.landing, "availabilityError") &&
    has(content.landing, "Aucun créneau disponible"),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-B-05",
  "Landing remplace les dots statiques par des boutons de créneaux",
  has(content.landing, "selectRuntimeSlot") &&
    has(content.landing, "slot.startTime") &&
    !has(content.landing, "day.dots") &&
    !has(content.landing, "day.gold") &&
    !has(content.landing, "27 MAI"),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-B-06",
  "Landing alimente dateSouhaitee et heureSouhaitee depuis le slot sélectionné",
  has(content.landing, 'updateField("dateSouhaitee", slot.date)') &&
    has(content.landing, 'updateField("heureSouhaitee", slot.startTime)'),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-B-07",
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
  "Q-PUBLIC-SCHED-D-B-08",
  "Landing ne rend pas d'identifiants internes",
  !has(content.landing, /codeClient|clientId|vehiculeId|rendezvousId/i),
  files.landing
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-B-09",
  "Availability action existe",
  exists(files.availabilityActions) &&
    has(content.availabilityActions, "getPublicSchedulingAvailabilityAction"),
  files.availabilityActions
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-B-10",
  "Availability service utilise RuntimeSchedulingEngine",
  exists(files.availabilityService) &&
    has(content.availabilityService, "RuntimeSchedulingEngine") &&
    has(content.availabilityService, "getAvailableSlotsWithBookings"),
  files.availabilityService
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-B-11",
  "Appointment service retourne toujours un DTO public sécurisé",
  has(content.appointmentService, "PublicAppointmentResult") &&
    !has(content.appointmentService, "return rendezvous;"),
  files.appointmentService
);

check(
  checks,
  "Q-PUBLIC-SCHED-D-B-12",
  "Le créneau choisi n'est pas encore envoyé à createPublicAppointment",
  !has(content.appointmentService, "dateSouhaitee") &&
    !has(content.appointmentService, "heureSouhaitee"),
  files.appointmentService,
  "INFO"
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q-PUBLIC-SCHED-D-B — Public RDV runtime availability audit

Date: ${new Date().toISOString()}

## Objectif

Auditer le branchement de la page publique /rdv à la couche Runtime Public Scheduling Availability.

Doctrine:
- La page publique consomme l'action public availability.
- Elle ne calcule pas les slots.
- Elle ne lit pas Firestore.
- Elle n'expose aucun identifiant interne.
- Le créneau choisi alimente seulement dateSouhaitee / heureSouhaitee à ce stade.

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
  report += `Des échecs HIGH existent. Corriger avant d'envoyer le créneau choisi au service public.\n`;
} else {
  report += `Aucun échec HIGH. La page publique consomme les disponibilités runtime.

Suite recommandée:
- Q-PUBLIC-SCHED-D-C — envoyer dateSouhaitee/heureSouhaitee/durée à createPublicAppointment.
- Puis valider que le rendez-vous créé utilise le créneau choisi.
`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q-PUBLIC-SCHED-D-B] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);