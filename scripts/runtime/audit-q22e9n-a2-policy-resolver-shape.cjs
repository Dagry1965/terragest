const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9N-A2-scheduling-policy-resolver-shape-audit.md"
);

function read(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return "";
  return fs.readFileSync(full, "utf8");
}

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function has(content, pattern) {
  if (!content) return false;
  if (pattern instanceof RegExp) return pattern.test(content);
  return content.includes(pattern);
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
        walk(p);
      } else if (/\.(ts|tsx)$/.test(entry.name)) {
        out.push(rel);
      }
    }
  }

  walk(full);
  return out;
}

function findExports(content) {
  const matches = content.match(/export\s+(interface|type|class|function|const|enum)\s+[A-Za-z0-9_]+/g);
  return matches ?? [];
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
  schedulingIndex: "src/runtime/scheduling/index.ts",
  settingsIndex: "src/runtime/scheduling/settings/index.ts",
  slotPolicy: "src/runtime/scheduling/SchedulingSlotPolicy.ts",
  runtimeEngine: "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  types: "src/runtime/scheduling/RuntimeSchedulingTypes.ts",
  settingsTypes: "src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts",
  settingsEngine: "src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts",
  settingsResolver: "src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts",
  settingsRepository: "src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts",
};

const contents = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const schedulingFiles = listFiles("src/runtime/scheduling");

const checks = [];

check(
  checks,
  "Q22E-9N-A2-01",
  "SchedulingSlotPolicy.ts existe",
  exists(files.slotPolicy),
  files.slotPolicy
);

check(
  checks,
  "Q22E-9N-A2-02",
  "SchedulingSlotPolicy.ts expose une policy ou une fonction de résolution",
  has(contents.slotPolicy, /export\s+(interface|type|class|function|const)\s+.*Policy/i) ||
    has(contents.slotPolicy, /resolve/i),
  findExports(contents.slotPolicy).join(", ") || "Aucun export policy détecté"
);

check(
  checks,
  "Q22E-9N-A2-03",
  "Un SchedulingSlotPolicyResolver explicite existe",
  schedulingFiles.some((f) => /SchedulingSlotPolicyResolver\.ts$/.test(f)) ||
    Object.values(contents).some((c) => has(c, "SchedulingSlotPolicyResolver")),
  schedulingFiles.filter((f) => /Policy|Resolver/i.test(f)).join(", ") ||
    "Aucun resolver explicite détecté",
  "INFO"
);

check(
  checks,
  "Q22E-9N-A2-04",
  "RuntimeSchedulingEngine consomme une policy externe",
  has(contents.runtimeEngine, /SchedulingSlotPolicy|slotPolicy|resolveSlotPolicy/i),
  "RuntimeSchedulingEngine.ts"
);

check(
  checks,
  "Q22E-9N-A2-05",
  "RuntimeSchedulingSettingsEngine produit buffer/capacity/duration",
  has(contents.settingsEngine, "bufferMinutes") &&
    has(contents.settingsEngine, "capacity") &&
    has(contents.settingsEngine, "defaultSlotDurationMinutes"),
  "RuntimeSchedulingSettingsEngine.ts"
);

check(
  checks,
  "Q22E-9N-A2-06",
  "RuntimeSchedulingSettingsRepository existe et expose lecture/écriture",
  has(contents.settingsRepository, "resolveStoredSettings") &&
    has(contents.settingsRepository, "saveTenantSettings") &&
    has(contents.settingsRepository, "saveWorkspaceSettings") &&
    has(contents.settingsRepository, "saveModuleSettings"),
  "RuntimeSchedulingSettingsRepository.ts"
);

check(
  checks,
  "Q22E-9N-A2-07",
  "Exports scheduling index à vérifier",
  exists(files.schedulingIndex),
  findExports(contents.schedulingIndex).join(", ") || contents.schedulingIndex,
  "INFO"
);

check(
  checks,
  "Q22E-9N-A2-08",
  "Exports settings index à vérifier",
  exists(files.settingsIndex),
  findExports(contents.settingsIndex).join(", ") || contents.settingsIndex,
  "INFO"
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q22E-9N-A2 — Scheduling policy resolver shape audit

Date: ${new Date().toISOString()}

## Objectif

Vérifier si le resolver de policy planning existe déjà conceptuellement ou s'il faut créer une couche explicite.

Doctrine:
- pas d'UI avant policy claire;
- pas de duplication;
- pas de logique locale;
- pas de hardcode AMARKHYS/garage/rendezvous dans le moteur;
- le resolver transforme settings/metadata/context en policy consommable par RuntimeSchedulingEngine.

## Résumé

- Checks: ${checks.length}
- OK: ${checks.filter((c) => c.ok).length}
- FAIL: ${checks.filter((c) => !c.ok).length}
- FAIL_HIGH: ${highFails.length}
- FAIL_INFO: ${infoFails.length}

## Fichiers scheduling

${schedulingFiles.map((f) => `- \`${f}\``).join("\n")}

## Exports détectés

### SchedulingSlotPolicy.ts

${findExports(contents.slotPolicy).map((e) => `- \`${e}\``).join("\n") || "- Aucun export détecté"}

### RuntimeSchedulingEngine.ts

${findExports(contents.runtimeEngine).map((e) => `- \`${e}\``).join("\n") || "- Aucun export détecté"}

### RuntimeSchedulingSettingsTypes.ts

${findExports(contents.settingsTypes).map((e) => `- \`${e}\``).join("\n") || "- Aucun export détecté"}

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
  report += `Il reste un problème HIGH. Ne pas créer l'UI.

Priorité:
1. Corriger/clarifier la policy.
2. Refaire Q22E-9N-A.
3. Ensuite seulement passer repository/UI.
`;
} else if (!schedulingFiles.some((f) => /SchedulingSlotPolicyResolver\.ts$/.test(f))) {
  report += `La base policy/settings semble présente, mais aucun resolver explicite n'est détecté.

Suite recommandée:
- Q22E-9N-B — créer SchedulingSlotPolicyResolver générique.
`;
} else {
  report += `Un resolver explicite semble déjà présent.

Suite recommandée:
- vérifier les exports;
- refaire Q22E-9N-A;
- si FAIL_HIGH 0, passer à l'étape suivante.
`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q22E-9N-A2] DONE");
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