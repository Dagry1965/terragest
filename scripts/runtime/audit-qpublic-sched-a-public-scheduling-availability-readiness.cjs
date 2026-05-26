const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q-PUBLIC-SCHED-A-public-scheduling-availability-readiness-audit.md"
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

function walk(dir, matcher, results = []) {
  const root = full(dir);
  if (!fs.existsSync(root)) return results;

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    const rel = path.relative(ROOT, absolute).split(path.sep).join("/");

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === ".git"
      ) {
        continue;
      }

      walk(rel, matcher, results);
      continue;
    }

    if (matcher(rel, entry.name)) {
      results.push(rel);
    }
  }

  return results;
}

function has(content, pattern) {
  if (!content) return false;
  if (pattern instanceof RegExp) return pattern.test(content);
  return content.includes(pattern);
}

function grep(files, tokens) {
  return [
    ...new Set(
      files.filter((file) => {
        const content = read(file);
        return tokens.some((token) =>
          token instanceof RegExp ? token.test(content) : content.includes(token)
        );
      })
    ),
  ];
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
  publicPage: "src/app/rdv/page.tsx",
  publicLanding: "src/components/public/AmarkhysPublicAppointmentLanding.tsx",
  publicService: "src/components/public/PublicAppointmentService.ts",
  schedulingSettingsResolver:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts",
  schedulingSettingsEngine:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts",
  schedulingPolicyResolver:
    "src/runtime/scheduling/SchedulingSlotPolicy.ts",
  schedulingEngine:
    "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  schedulingTypes:
    "src/runtime/scheduling/RuntimeSchedulingTypes.ts",
  planningView:
    "src/components/erp/scheduling/ERPSchedulingPlanningView.tsx",
  rendezvousModule:
    "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const sourceFiles = walk("src", (rel, name) =>
  name.endsWith(".ts") || name.endsWith(".tsx")
);

const publicSchedulingCandidates = grep(sourceFiles, [
  "PublicScheduling",
  "public scheduling",
  "getPublicSchedulingAvailability",
  "availability",
  "availableSlots",
  "getAvailableSlots",
]);

const directFirestoreInPublic = grep(
  [
    files.publicPage,
    files.publicLanding,
    files.publicService,
  ],
  [
    "firebase/firestore",
    "runtimeFirestore",
    "collection(",
    "doc(",
    "setDoc(",
    "getDoc(",
  ]
);

const publicInternalLeakageCandidates = grep(
  [
    files.publicLanding,
    files.publicService,
  ],
  [
    "codeClient",
    "clientId",
    "vehiculeId",
    "rendezvousId",
    "return rendezvous",
    "return client",
    "return vehicule",
  ]
);

const checks = [];

check(
  checks,
  "Q-PUBLIC-SCHED-A-01",
  "Page publique /rdv existe",
  exists(files.publicPage),
  files.publicPage
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-02",
  "Page /rdv utilise le composant public RDV",
  has(content.publicPage, "AmarkhysPublicAppointmentLanding"),
  files.publicPage
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-03",
  "Composant public RDV existe",
  exists(files.publicLanding),
  files.publicLanding
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-04",
  "Service public RDV existe",
  exists(files.publicService) &&
    has(content.publicService, "createPublicAppointment"),
  files.publicService
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-05",
  "Le service public crée actuellement des records internes client/véhicule/rdv",
  has(content.publicService, "RuntimeDataBinding.create") &&
    has(content.publicService, "clientsautoModule") &&
    has(content.publicService, "vehiculesModule") &&
    has(content.publicService, "rendezvousModule"),
  files.publicService,
  "INFO"
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-06",
  "Le service public ne doit pas retourner de record runtime complet",
  !has(content.publicService, "return rendezvous;") &&
    !has(content.publicService, "return client;") &&
    !has(content.publicService, "return vehicule;"),
  files.publicService
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-07",
  "Aucun accès Firestore direct dans page/landing/service public",
  directFirestoreInPublic.length === 0,
  directFirestoreInPublic.join(", ") || "OK"
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-08",
  "La page publique ne calcule pas encore les slots via runtime availability",
  !has(content.publicLanding, "RuntimeSchedulingEngine") &&
    !has(content.publicLanding, "RuntimeSchedulingSettingsResolver") &&
    !has(content.publicLanding, "getAvailableSlots") &&
    !has(content.publicLanding, "availableSlots"),
  files.publicLanding,
  "INFO"
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-09",
  "Le composant public contient encore des jours/créneaux statiques à remplacer",
  has(content.publicLanding, "const days = [") ||
    has(content.publicLanding, "dots:") ||
    has(content.publicLanding, "27 MAI"),
  files.publicLanding,
  "INFO"
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-10",
  "Settings resolver scheduling existe",
  exists(files.schedulingSettingsResolver),
  files.schedulingSettingsResolver
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-11",
  "Scheduling engine runtime existe et reste générique",
  exists(files.schedulingEngine) &&
    !has(content.schedulingEngine, /dateRendezVous|heureRendezVous|typeService|vehiculeId/i),
  files.schedulingEngine
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-12",
  "Planning view privé consomme déjà le resolver/settings runtime",
  has(content.planningView, "RuntimeSchedulingSettingsResolver") &&
    has(content.planningView, "resolve"),
  files.planningView
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-13",
  "Module rendezvous déclare la configuration scheduling",
  has(content.rendezvousModule, /scheduling[\s\S]*enabled/) &&
    has(content.rendezvousModule, /dateField|dateRendezVous/) &&
    has(content.rendezvousModule, /timeField|heureRendezVous/),
  files.rendezvousModule
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-14",
  "Aucune couche public scheduling availability dédiée n'existe encore",
  publicSchedulingCandidates.length === 0,
  publicSchedulingCandidates.join(", ") || "Aucune couche dédiée détectée",
  "INFO"
);

check(
  checks,
  "Q-PUBLIC-SCHED-A-15",
  "Risque de fuite interne public détecté à traiter avant branchement complet",
  publicInternalLeakageCandidates.length === 0,
  publicInternalLeakageCandidates.join(", ") || "OK",
  "INFO"
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q-PUBLIC-SCHED-A — Public scheduling availability readiness audit

Date: ${new Date().toISOString()}

## Objectif

Auditer la readiness pour permettre à la page publique /rdv d'afficher les disponibilités réelles du RuntimeSchedulingEngine.

Doctrine:
- La page publique ne calcule pas les slots.
- La page publique ne lit pas Firestore.
- La page publique ne reçoit pas d'identifiants internes.
- Le runtime scheduling calcule.
- Une couche public availability retourne un DTO public.

## Résumé

- Checks: ${checks.length}
- OK: ${checks.filter((c) => c.ok).length}
- FAIL: ${checks.filter((c) => !c.ok).length}
- FAIL_HIGH: ${highFails.length}
- FAIL_INFO: ${infoFails.length}

## Fichiers inspectés

${Object.values(files).map((file) => `- \`${file}\``).join("\n")}

## Candidats public scheduling existants

${
  publicSchedulingCandidates.length
    ? publicSchedulingCandidates.map((file) => `- \`${file}\``).join("\n")
    : "- Aucun."
}

## Accès Firestore direct public

${
  directFirestoreInPublic.length
    ? directFirestoreInPublic.map((file) => `- \`${file}\``).join("\n")
    : "- Aucun."
}

## Risques de fuite interne

${
  publicInternalLeakageCandidates.length
    ? publicInternalLeakageCandidates.map((file) => `- \`${file}\``).join("\n")
    : "- Aucun."
}

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
  report += `Des échecs HIGH existent. Corriger les fuites/contrats publics avant de brancher l'availability UI.\n`;
} else {
  report += `Aucun échec HIGH bloquant pour démarrer la conception.

Suite recommandée:
1. Q-PUBLIC-SCHED-B — corriger le DTO public de createPublicAppointment.
2. Q-PUBLIC-SCHED-C — créer une couche Public Scheduling Availability service/action.
3. Q-PUBLIC-SCHED-D — connecter /rdv à cette availability.
4. Q-PUBLIC-SCHED-E — envoyer le créneau choisi dans createPublicAppointment.
`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q-PUBLIC-SCHED-A] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);