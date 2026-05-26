const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9N-F-scheduling-settings-ui-readiness-audit.md"
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

function check(checks, id, label, ok, details = "", severity = "HIGH") {
  checks.push({
    id,
    label,
    ok: Boolean(ok),
    details,
    severity,
  });
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

fs.mkdirSync(REPORT_DIR, { recursive: true });

const files = {
  actions:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts",
  service:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts",
  repository:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts",
  resolver:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts",
  engine:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts",
  settingsTypes:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts",
  schedulingTypes:
    "src/runtime/scheduling/RuntimeSchedulingTypes.ts",
  policy:
    "src/runtime/scheduling/SchedulingSlotPolicy.ts",
  runtimeEngine:
    "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  guard:
    "src/runtime/guards/processRuntimeBeforeMutationGuards.ts",
  settingsIndex:
    "src/runtime/scheduling/settings/index.ts",
  schedulingIndex:
    "src/runtime/scheduling/index.ts",
  rendezvousModule:
    "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const allTsxFiles = walk("src", (rel, name) =>
  name.endsWith(".tsx") || name.endsWith(".ts")
);

const existingSettingsUiCandidates = allTsxFiles.filter((file) =>
  /settings|param|planning|scheduling/i.test(file)
);

const formComponentCandidates = allTsxFiles.filter((file) =>
  /form|field|settings|panel|page|runtime/i.test(file)
);

const directFirestoreInUiCandidates = grep(
  existingSettingsUiCandidates.filter((file) =>
    file.startsWith("src/components/") || file.startsWith("src/app/")
  ),
  [
    "firebase/firestore",
    "runtimeFirestore",
    "collection(",
    "doc(",
    "setDoc(",
    "getDoc(",
  ]
);

const checks = [];

check(
  checks,
  "Q22E-9N-F-01",
  "Server actions scheduling settings existent",
  exists(files.actions),
  files.actions
);

check(
  checks,
  "Q22E-9N-F-02",
  "Actions exposent read/save et passent par le service",
  has(content.actions, '"use server"') &&
    has(content.actions, "readRuntimeSchedulingSettingsAction") &&
    has(content.actions, "saveRuntimeSchedulingSettingsAction") &&
    has(content.actions, "RuntimeSchedulingSettingsService.read") &&
    has(content.actions, "RuntimeSchedulingSettingsService.save"),
  files.actions
);

check(
  checks,
  "Q22E-9N-F-03",
  "Service scheduling settings existe et expose read/save/validateEffectiveConfig",
  exists(files.service) &&
    has(content.service, "static async read") &&
    has(content.service, "static async save") &&
    has(content.service, "static validateEffectiveConfig"),
  files.service
);

check(
  checks,
  "Q22E-9N-F-04",
  "Repository scheduling settings existe avec read/write tenant/workspace/module",
  exists(files.repository) &&
    has(content.repository, "readTenantSettings") &&
    has(content.repository, "readWorkspaceSettings") &&
    has(content.repository, "readModuleSettings") &&
    has(content.repository, "saveTenantSettings") &&
    has(content.repository, "saveWorkspaceSettings") &&
    has(content.repository, "saveModuleSettings"),
  files.repository
);

check(
  checks,
  "Q22E-9N-F-05",
  "Resolver/settings engine existent",
  exists(files.resolver) &&
    exists(files.engine) &&
    has(content.resolver, "RuntimeSchedulingSettingsEngine") &&
    has(content.engine, "static resolve") &&
    has(content.engine, "static validate"),
  `${files.resolver}, ${files.engine}`
);

check(
  checks,
  "Q22E-9N-F-06",
  "Settings types couvrent les paramètres UI attendus",
  has(content.settingsTypes, "defaultDurationMinutes") &&
    has(content.settingsTypes, "bufferMinutes") &&
    has(content.settingsTypes, "capacity") &&
    has(content.settingsTypes, "openingHours") &&
    has(content.settingsTypes, "calendarExceptions") &&
    has(content.settingsTypes, "resourceField") &&
    has(content.settingsTypes, "dateField") &&
    has(content.settingsTypes, "timeField") &&
    has(content.settingsTypes, "durationField") &&
    has(content.settingsTypes, "startField") &&
    has(content.settingsTypes, "endField"),
  files.settingsTypes
);

check(
  checks,
  "Q22E-9N-F-07",
  "Runtime scheduling field mapping existe",
  has(content.schedulingTypes, "RuntimeSchedulingFieldMapping") &&
    has(content.schedulingTypes, "dateField") &&
    has(content.schedulingTypes, "timeField") &&
    has(content.schedulingTypes, "durationField") &&
    has(content.schedulingTypes, "resourceField") &&
    has(content.schedulingTypes, "statusField"),
  files.schedulingTypes
);

check(
  checks,
  "Q22E-9N-F-08",
  "SchedulingSlotPolicy transporte le fieldMapping",
  has(content.policy, "fieldMapping") &&
    has(content.policy, "DEFAULT_SCHEDULING_FIELD_MAPPING"),
  files.policy
);

check(
  checks,
  "Q22E-9N-F-09",
  "RuntimeSchedulingEngine ne hardcode plus les champs rendezvous",
  !has(content.runtimeEngine, /dateRendezVous|heureRendezVous|typeService|vehiculeId/i),
  files.runtimeEngine
);

check(
  checks,
  "Q22E-9N-F-10",
  "Guard scheduling est générique schedulable et non rendezvous",
  has(content.guard, "isSchedulableModule") &&
    has(content.guard, "guardSchedulableMutation") &&
    !has(content.guard, /isRendezvousModule|guardRendezvousMutation|loadExistingRendezvousForConflictCheck|typeService|dateRendezVous|heureRendezVous/i),
  files.guard
);

check(
  checks,
  "Q22E-9N-F-11",
  "Module rendezvous déclare une configuration scheduling consommable",
  has(content.rendezvousModule, /scheduling[\s\S]*enabled/) &&
    has(content.rendezvousModule, /dateField|dateRendezVous/) &&
    has(content.rendezvousModule, /timeField|heureRendezVous/) &&
    has(content.rendezvousModule, /durationField|durationMinutes/),
  files.rendezvousModule
);

check(
  checks,
  "Q22E-9N-F-12",
  "Settings/actions/service sont exportés depuis index",
  has(content.settingsIndex, "RuntimeSchedulingSettingsActions") &&
    has(content.settingsIndex, "RuntimeSchedulingSettingsService") &&
    has(content.settingsIndex, "RuntimeSchedulingSettingsRepository") &&
    has(content.settingsIndex, "RuntimeSchedulingSettingsResolver") &&
    has(content.settingsIndex, "RuntimeSchedulingSettingsEngine"),
  files.settingsIndex
);

check(
  checks,
  "Q22E-9N-F-13",
  "Aucun accès Firestore direct détecté dans les candidats UI settings/planning",
  directFirestoreInUiCandidates.length === 0,
  directFirestoreInUiCandidates.join(", ") || "OK"
);

check(
  checks,
  "Q22E-9N-F-14",
  "Candidats UI/form existants détectés pour réutilisation avant création",
  formComponentCandidates.length > 0,
  formComponentCandidates.slice(0, 40).join(", ") || "Aucun candidat",
  "INFO"
);

check(
  checks,
  "Q22E-9N-F-15",
  "Aucune UI settings scheduling dédiée n'existe encore",
  !existingSettingsUiCandidates.some((file) =>
    /scheduling-settings|planning-settings|parametres-planning|settings-scheduling/i.test(file)
  ),
  existingSettingsUiCandidates.slice(0, 40).join(", ") || "Aucun candidat",
  "INFO"
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q22E-9N-F — Scheduling settings UI readiness audit

Date: ${new Date().toISOString()}

## Objectif

Auditer la readiness avant création d'une UI générique de paramètres planning.

Chaîne attendue:

- UI future
- RuntimeSchedulingSettingsActions
- RuntimeSchedulingSettingsService
- RuntimeSchedulingSettingsRepository
- RuntimeSchedulingSettingsResolver
- RuntimeSchedulingSettingsEngine
- SchedulingSlotPolicyResolver
- RuntimeSchedulingEngine
- Generic schedulable guard

## Résumé

- Checks: ${checks.length}
- OK: ${checks.filter((c) => c.ok).length}
- FAIL: ${checks.filter((c) => !c.ok).length}
- FAIL_HIGH: ${highFails.length}
- FAIL_INFO: ${infoFails.length}

## Fichiers inspectés

${Object.values(files).map((file) => `- \`${file}\``).join("\n")}

## Candidats UI/form à considérer

${
  formComponentCandidates.length
    ? formComponentCandidates.slice(0, 80).map((file) => `- \`${file}\``).join("\n")
    : "- Aucun."
}

## Candidats settings/planning existants

${
  existingSettingsUiCandidates.length
    ? existingSettingsUiCandidates.slice(0, 80).map((file) => `- \`${file}\``).join("\n")
    : "- Aucun."
}

## Accès Firestore direct UI détectés

${
  directFirestoreInUiCandidates.length
    ? directFirestoreInUiCandidates.map((file) => `- \`${file}\``).join("\n")
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
  report += `Des échecs HIGH existent. Ne pas créer l'UI.

Priorité:
1. Corriger la chaîne runtime/action/service/settings.
2. Refaire Q22E-9N-F.
`;
} else {
  report += `Aucun échec HIGH. La chaîne est prête pour la création d'une UI générique de paramètres planning.

Suite recommandée:
- Q22E-9N-G — create generic scheduling settings UI.
- L'UI devra appeler les server actions, jamais Firestore ni repository directement.
- L'UI devra rester générique et module-driven.
`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q22E-9N-F] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);