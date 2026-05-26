const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9N-B-scheduling-settings-repository-readiness-audit.md"
);

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function read(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return "";
  return fs.readFileSync(full, "utf8");
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

function findExports(content) {
  return (
    content.match(
      /export\s+(interface|type|class|function|const|enum)\s+[A-Za-z0-9_]+/g
    ) ?? []
  );
}

function listFiles(dir) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];

  const out = [];

  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const p = path.join(current, entry.name);
      const rel = path.relative(ROOT, p).replace(/\\/g, "/");

      if (entry.isDirectory()) {
        if (
          entry.name === "node_modules" ||
          entry.name === ".next" ||
          entry.name === ".git"
        ) {
          continue;
        }
        walk(p);
      } else if (/\.(ts|tsx)$/.test(entry.name)) {
        out.push(rel);
      }
    }
  }

  walk(full);
  return out;
}

fs.mkdirSync(REPORT_DIR, { recursive: true });

const files = {
  repository:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts",
  types:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts",
  resolver:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts",
  engine:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts",
  settingsIndex: "src/runtime/scheduling/settings/index.ts",
  schedulingIndex: "src/runtime/scheduling/index.ts",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const checks = [];

check(
  checks,
  "Q22E-9N-B-01",
  "RuntimeSchedulingSettingsRepository existe",
  exists(files.repository),
  files.repository
);

check(
  checks,
  "Q22E-9N-B-02",
  "Repository expose un contexte générique tenant/workspace/module/user",
  has(content.repository, "tenantId") &&
    has(content.repository, "workspaceId") &&
    has(content.repository, "moduleKey") &&
    has(content.repository, "userId"),
  "RuntimeSchedulingSettingsRepositoryContext"
);

check(
  checks,
  "Q22E-9N-B-03",
  "Repository lit les settings tenant/workspace/module",
  has(content.repository, "readTenantSettings") &&
    has(content.repository, "readWorkspaceSettings") &&
    has(content.repository, "readModuleSettings"),
  "readTenantSettings/readWorkspaceSettings/readModuleSettings"
);

check(
  checks,
  "Q22E-9N-B-04",
  "Repository écrit les settings tenant/workspace/module",
  has(content.repository, "saveTenantSettings") &&
    has(content.repository, "saveWorkspaceSettings") &&
    has(content.repository, "saveModuleSettings"),
  "saveTenantSettings/saveWorkspaceSettings/saveModuleSettings"
);

check(
  checks,
  "Q22E-9N-B-05",
  "Repository résout un bundle stocké tenant/workspace/module",
  has(content.repository, "resolveStoredSettings") &&
    has(content.repository, "tenantSettings") &&
    has(content.repository, "workspaceSettings") &&
    has(content.repository, "moduleSettings"),
  "resolveStoredSettings"
);

check(
  checks,
  "Q22E-9N-B-06",
  "Repository utilise une collection Firestore dédiée aux settings scheduling",
  has(content.repository, "runtimeSchedulingSettings"),
  "collection runtimeSchedulingSettings"
);

check(
  checks,
  "Q22E-9N-B-07",
  "Repository utilise setDoc merge pour ne pas écraser brutalement",
  has(content.repository, "setDoc") && has(content.repository, "{ merge: true }"),
  "setDoc(..., { merge: true })"
);

check(
  checks,
  "Q22E-9N-B-08",
  "Repository nettoie les valeurs undefined avant persistance",
  has(content.repository, "cleanSettings") &&
    has(content.repository, "value !== undefined"),
  "cleanSettings"
);

check(
  checks,
  "Q22E-9N-B-09",
  "Repository horodate et trace updatedBy",
  has(content.repository, "serverTimestamp") &&
    has(content.repository, "updatedAt") &&
    has(content.repository, "updatedBy"),
  "updatedAt/updatedBy"
);

check(
  checks,
  "Q22E-9N-B-10",
  "Repository impose tenantId",
  has(content.repository, "requireTenantId") &&
    has(content.repository, "tenantId est requis"),
  "requireTenantId"
);

check(
  checks,
  "Q22E-9N-B-11",
  "Repository impose workspaceId pour workspace/module",
  has(content.repository, "requireWorkspaceId") &&
    has(content.repository, "workspaceId est requis"),
  "requireWorkspaceId"
);

check(
  checks,
  "Q22E-9N-B-12",
  "Repository impose moduleKey pour module",
  has(content.repository, "requireModuleKey") &&
    has(content.repository, "moduleKey est requis"),
  "requireModuleKey"
);

check(
  checks,
  "Q22E-9N-B-13",
  "Types settings contiennent les champs de paramétrage planning attendus",
  has(content.types, "defaultSlotDurationMinutes") &&
    has(content.types, "bufferMinutes") &&
    has(content.types, "capacity") &&
    has(content.types, "openingHours") &&
    has(content.types, "exceptions"),
  "duration/buffer/capacity/openingHours/exceptions"
);

check(
  checks,
  "Q22E-9N-B-14",
  "Types settings exposent une notion de scope de persistance",
  has(content.types, "RuntimeSchedulingSettingsStorageScope") &&
    has(content.types, /tenant|workspace|module/),
  "RuntimeSchedulingSettingsStorageScope"
);

check(
  checks,
  "Q22E-9N-B-15",
  "Resolver consomme ou peut consommer les settings stockés",
  has(content.resolver, "tenantSettings") ||
    has(content.resolver, "workspaceSettings") ||
    has(content.resolver, "moduleSettings") ||
    has(content.resolver, "RuntimeStoredSchedulingSettings") ||
    has(content.resolver, "RuntimeSchedulingSettingsRepository"),
  "RuntimeSchedulingSettingsResolver",
  "HIGH"
);

check(
  checks,
  "Q22E-9N-B-16",
  "Settings index exporte le repository",
  has(content.settingsIndex, "RuntimeSchedulingSettingsRepository"),
  files.settingsIndex
);

check(
  checks,
  "Q22E-9N-B-17",
  "Aucun hardcode AMARKHYS/garage dans le repository",
  !has(content.repository, /amarkhys|garage/i),
  "repository générique"
);

check(
  checks,
  "Q22E-9N-B-18",
  "Aucun hardcode rendezvous dans le repository",
  !has(content.repository, /rendezvous/i),
  "repository indépendant des modules"
);

check(
  checks,
  "Q22E-9N-B-19",
  "Aucun hardcode vehiculeId/typeService dans le repository",
  !has(content.repository, /vehiculeId|typeService/i),
  "repository indépendant métier"
);

check(
  checks,
  "Q22E-9N-B-20",
  "Repository injectable/testable via Firestore optionnel",
  has(content.repository, "firestore?: Firestore") &&
    has(content.repository, "context?.firestore") &&
    has(content.repository, "runtimeFirestore"),
  "firestore optionnel"
);

const schedulingFiles = listFiles("src/runtime/scheduling");
const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q22E-9N-B — RuntimeSchedulingSettingsRepository readiness audit

Date: ${new Date().toISOString()}

## Objectif

Auditer le repository de paramètres planning avant de créer une UI générique.

Doctrine appliquée:

- Repository persiste.
- Resolver calcule la configuration effective.
- Settings engine fusionne/valide.
- Policy transforme la configuration en paramètres métier de slots.
- Engine calcule.
- UI affiche/édite seulement.

## Résumé

- Checks: ${checks.length}
- OK: ${checks.filter((c) => c.ok).length}
- FAIL: ${checks.filter((c) => !c.ok).length}
- FAIL_HIGH: ${highFails.length}
- FAIL_INFO: ${infoFails.length}

## Fichiers inspectés

${Object.values(files).map((f) => `- \`${f}\``).join("\n")}

## Fichiers scheduling détectés

${schedulingFiles.map((f) => `- \`${f}\``).join("\n")}

## Exports repository

${findExports(content.repository).map((e) => `- \`${e}\``).join("\n") || "- Aucun export détecté"}

## Exports types

${findExports(content.types).map((e) => `- \`${e}\``).join("\n") || "- Aucun export détecté"}

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
1. Corriger/renforcer le repository ou le resolver.
2. Refaire Q22E-9N-B.
3. Ensuite seulement créer l'UI générique de paramètres planning.
`;
} else {
  report += `Aucun échec HIGH. Le repository est prêt architecturalement pour être consommé par une UI générique ou une couche service.

Suite recommandée:
- Q22E-9N-C — audit service/action layer pour lecture/écriture settings depuis l'UI.
- Puis Q22E-9N-D — UI générique de paramètres planning.
`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q22E-9N-B] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).replace(/\\/g, "/")}`);

if (highFails.length > 0) {
  console.log("");
  console.log("[HIGH FAILS]");
  for (const fail of highFails) {
    console.log(`- ${fail.id}: ${fail.label}`);
  }
}
