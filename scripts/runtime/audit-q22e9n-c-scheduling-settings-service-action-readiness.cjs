const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md"
);

function toRel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function full(relPath) {
  return path.join(ROOT, relPath);
}

function exists(relPath) {
  return fs.existsSync(full(relPath));
}

function read(relPath) {
  const filePath = full(relPath);
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf8");
}

function walk(dir, matcher, results = []) {
  const rootDir = full(dir);
  if (!fs.existsSync(rootDir)) return results;

  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    const absolute = path.join(rootDir, entry.name);
    const rel = toRel(absolute);

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

function containsAny(content, tokens) {
  return tokens.some((token) =>
    typeof token === "string" ? content.includes(token) : token.test(content)
  );
}

function grep(files, tokens) {
  return [
    ...new Set(
      files.filter((file) => containsAny(read(file), tokens))
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

function isTsFile(name) {
  return name.endsWith(".ts") || name.endsWith(".tsx");
}

function isGenericRuntimeSchedulingFile(file) {
  return (
    file.startsWith("src/runtime/scheduling/") ||
    file === "src/runtime/guards/processRuntimeBeforeMutationGuards.ts" ||
    file.startsWith("src/components/erp/scheduling/")
  );
}

function isAllowedSchedulingConsumerFile(file) {
  return (
    file === "src/runtime/modules/generated/rendezvous/rendezvous.module.ts" ||
    file.startsWith("src/app/(private)/rendezvous/")
  );
}

function fileHasForbiddenGenericSchedulingHardcode(file) {
  if (!isGenericRuntimeSchedulingFile(file)) return false;

  const content = read(file);

  return containsAny(content.toLowerCase(), [
    "amarkhys",
    "garage",
    "vehiculeid",
    "typeservice",
  ]);
}

function fileHasForbiddenGenericRendezvousHardcode(file) {
  if (!isGenericRuntimeSchedulingFile(file)) return false;
  if (isAllowedSchedulingConsumerFile(file)) return false;

  const content = read(file);

  return containsAny(content, [
    "isRendezvousModule",
    "guardRendezvousMutation",
    "loadExistingRendezvousForConflictCheck",
    "dateRendezVous",
    "heureRendezVous",
  ]);
}

fs.mkdirSync(REPORT_DIR, { recursive: true });

const allTsFiles = walk("src", (rel, name) => isTsFile(name));

const candidateFiles = allTsFiles.filter((file) =>
  containsAny(file.toLowerCase(), [
    "scheduling",
    "planning",
    "settings",
    "runtime",
    "action",
    "service",
    "server",
    "api",
    "param",
  ])
);

const files = {
  repository:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts",
  resolver:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts",
  engine:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts",
  settingsIndex: "src/runtime/scheduling/settings/index.ts",
  schedulingIndex: "src/runtime/scheduling/index.ts",
};

const contents = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const serverActionFiles = candidateFiles.filter((file) =>
  containsAny(read(file), ['"use server"', "'use server'"])
);

const apiRouteFiles = allTsFiles.filter((file) =>
  file.startsWith("src/app/api/") && file.endsWith("/route.ts")
);

const repositoryConsumerFiles = grep(candidateFiles, [
  "RuntimeSchedulingSettingsRepository",
  "readTenantSettings",
  "readWorkspaceSettings",
  "readModuleSettings",
  "saveTenantSettings",
  "saveWorkspaceSettings",
  "saveModuleSettings",
  "resolveStoredSettings",
]);

const resolverConsumerFiles = grep(candidateFiles, [
  "RuntimeSchedulingSettingsResolver",
  "resolveEffective",
  "resolveSettings",
  "RuntimeSchedulingSettingsEngine",
]);

const permissionCandidateFiles = grep(candidateFiles, [
  "RuntimePermissionEngine",
  "permission",
  "permissions",
  "canExecute",
  "role",
  "roles",
  "guard",
]);

const schedulingSettingsActionCandidates = candidateFiles.filter((file) => {
  const content = read(file).toLowerCase();

  return (
    containsAny(content, ["scheduling", "planning"]) &&
    containsAny(content, ["settings", "param", "configuration"]) &&
    containsAny(content, ["save", "update", "read", "load", "resolve", "get"])
  );
});

const forbiddenGenericSchedulingHardcodes =
  schedulingSettingsActionCandidates.filter((file) =>
    fileHasForbiddenGenericSchedulingHardcode(file)
  );

const forbiddenGenericRendezvousHardcodes =
  schedulingSettingsActionCandidates.filter((file) =>
    fileHasForbiddenGenericRendezvousHardcode(file)
  );

const uiSchedulingFiles = allTsFiles.filter((file) =>
  file.startsWith("src/components/erp/scheduling/") ||
  file.includes("/planning/")
);

const directFirestoreInUi = grep(uiSchedulingFiles, [
  "firebase/firestore",
  "runtimeFirestore",
  "collection(",
  "doc(",
  "setDoc(",
  "getDoc(",
]);

const checks = [];

check(
  checks,
  "Q22E-9N-C-01",
  "Repository settings scheduling existe",
  exists(files.repository),
  files.repository
);

check(
  checks,
  "Q22E-9N-C-02",
  "Resolver settings scheduling existe",
  exists(files.resolver),
  files.resolver
);

check(
  checks,
  "Q22E-9N-C-03",
  "Settings engine scheduling existe",
  exists(files.engine),
  files.engine
);

check(
  checks,
  "Q22E-9N-C-04",
  "Une server action candidate existe pour settings/runtime/scheduling",
  serverActionFiles.some((file) =>
    containsAny(file.toLowerCase(), [
      "scheduling",
      "planning",
      "settings",
      "runtime",
      "param",
    ])
  ),
  serverActionFiles.join(", ") || "Aucune server action candidate détectée",
  "INFO"
);

check(
  checks,
  "Q22E-9N-C-05",
  "Une API route candidate existe pour settings/runtime/scheduling",
  apiRouteFiles.some((file) =>
    containsAny(file.toLowerCase(), [
      "scheduling",
      "planning",
      "settings",
      "runtime",
      "param",
    ])
  ),
  apiRouteFiles.join(", ") || "Aucune API route candidate détectée",
  "INFO"
);

check(
  checks,
  "Q22E-9N-C-06",
  "Un consommateur applicatif du repository scheduling settings existe",
  repositoryConsumerFiles.some((file) => file !== files.repository),
  repositoryConsumerFiles.join(", ") ||
    "Aucun consommateur du repository détecté hors repository lui-même",
  "INFO"
);

check(
  checks,
  "Q22E-9N-C-07",
  "Un consommateur applicatif du resolver/settings engine existe",
  resolverConsumerFiles.some(
    (file) =>
      file !== files.resolver &&
      file !== files.engine &&
      file !== files.settingsIndex
  ),
  resolverConsumerFiles.join(", ") ||
    "Aucun consommateur applicatif resolver/settings engine détecté",
  "INFO"
);

check(
  checks,
  "Q22E-9N-C-08",
  "Des candidats permission/guard existent pour protéger les writes settings",
  permissionCandidateFiles.length > 0,
  permissionCandidateFiles.slice(0, 30).join(", ") ||
    "Aucun candidat permission/guard détecté",
  "INFO"
);

check(
  checks,
  "Q22E-9N-C-09",
  "Aucun hardcode AMARKHYS/garage/vehiculeId/typeService dans runtime scheduling générique",
  forbiddenGenericSchedulingHardcodes.length === 0,
  forbiddenGenericSchedulingHardcodes.join(", ") || "OK"
);

check(
  checks,
  "Q22E-9N-C-10",
  "Aucun hardcode rendezvous/dateRendezVous/heureRendezVous dans runtime scheduling générique",
  forbiddenGenericRendezvousHardcodes.length === 0,
  forbiddenGenericRendezvousHardcodes.join(", ") || "OK"
);

check(
  checks,
  "Q22E-9N-C-11",
  "Aucun accès Firestore direct détecté dans UI scheduling existante",
  directFirestoreInUi.length === 0,
  directFirestoreInUi.join(", ") || "OK"
);

check(
  checks,
  "Q22E-9N-C-12",
  "Settings repository est exporté pour être consommé par une couche service/action",
  contents.settingsIndex.includes("RuntimeSchedulingSettingsRepository"),
  files.settingsIndex
);

check(
  checks,
  "Q22E-9N-C-13",
  "Types settings sont exportés pour formulaires/service/action",
  contents.settingsIndex.includes("RuntimeSchedulingSettingsTypes") ||
    contents.settingsIndex.includes("RuntimeSchedulingSettings"),
  files.settingsIndex
);

check(
  checks,
  "Q22E-9N-C-14",
  "La future couche service/action devra probablement être créée",
  true,
  "Check informatif",
  "INFO"
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q22E-9N-C — Scheduling settings service/action layer readiness audit

Date: ${new Date().toISOString()}

## Objectif

Auditer la couche service/action avant de créer une UI générique de paramètres planning.

## Résumé

- Checks: ${checks.length}
- OK: ${checks.filter((c) => c.ok).length}
- FAIL: ${checks.filter((c) => !c.ok).length}
- FAIL_HIGH: ${highFails.length}
- FAIL_INFO: ${infoFails.length}

## Server actions candidates

${serverActionFiles.length ? serverActionFiles.map((file) => `- \`${file}\``).join("\n") : "- Aucune."}

## API route candidates

${apiRouteFiles.length ? apiRouteFiles.map((file) => `- \`${file}\``).join("\n") : "- Aucune."}

## Forbidden generic scheduling hardcodes

${forbiddenGenericSchedulingHardcodes.length ? forbiddenGenericSchedulingHardcodes.map((file) => `- \`${file}\``).join("\n") : "- Aucun."}

## Forbidden generic rendezvous hardcodes

${forbiddenGenericRendezvousHardcodes.length ? forbiddenGenericRendezvousHardcodes.map((file) => `- \`${file}\``).join("\n") : "- Aucun."}

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
  report += `Des échecs HIGH existent. Ne pas créer l'UI.\n`;
} else if (
  !serverActionFiles.some((file) =>
    containsAny(file.toLowerCase(), [
      "scheduling",
      "planning",
      "settings",
      "runtime",
      "param",
    ])
  ) &&
  !apiRouteFiles.some((file) =>
    containsAny(file.toLowerCase(), [
      "scheduling",
      "planning",
      "settings",
      "runtime",
      "param",
    ])
  )
) {
  report += `Aucun échec HIGH. Aucune couche service/action claire n'a été détectée pour exposer les settings scheduling à une UI.

Suite recommandée:
- Q22E-9N-D — créer une couche service/action générique pour scheduling settings.
`;
} else {
  report += `Aucun échec HIGH. Des candidats service/action existent. Inspecter avant création.\n`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q22E-9N-C] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);
