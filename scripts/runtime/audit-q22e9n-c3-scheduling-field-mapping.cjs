const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9N-C3-scheduling-field-mapping-audit.md"
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

function check(checks, id, label, ok, details = "", severity = "HIGH") {
  checks.push({
    id,
    label,
    ok: Boolean(ok),
    details,
    severity,
  });
}

function lineMatches(file, patterns) {
  const content = read(file);
  if (!content) return [];

  const lines = content.split(/\r?\n/);
  const matches = [];

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (pattern.test(line)) {
        matches.push(`${file}:${index + 1} — ${line.trim()}`);
        break;
      }
    }
  });

  return matches;
}

fs.mkdirSync(REPORT_DIR, { recursive: true });

const files = {
  engine: "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  types: "src/runtime/scheduling/RuntimeSchedulingTypes.ts",
  policy: "src/runtime/scheduling/SchedulingSlotPolicy.ts",
  settingsTypes:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts",
  settingsEngine:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts",
  settingsResolver:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts",
  guards: "src/runtime/guards/processRuntimeBeforeMutationGuards.ts",
  rendezvousModule:
    "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const checks = [];

check(
  checks,
  "Q22E-9N-C3-01",
  "RuntimeSchedulingEngine existe",
  exists(files.engine),
  files.engine
);

check(
  checks,
  "Q22E-9N-C3-02",
  "Le moteur expose ou consomme des champs configurables date/time",
  has(content.engine, "dateField") &&
    has(content.engine, "timeField") &&
    !has(content.engine, /dateField:\s*"dateRendezVous"/),
  "dateField/timeField dans engine sans default rendezvous hardcodé"
);

check(
  checks,
  "Q22E-9N-C3-03",
  "Le moteur n'a pas de message d'erreur hardcodé dateRendezVous/heureRendezVous",
  !has(content.engine, /dateRendezVous|heureRendezVous/),
  lineMatches(files.engine, [/dateRendezVous/, /heureRendezVous/]).join("\n") ||
    "OK"
);

check(
  checks,
  "Q22E-9N-C3-04",
  "Types scheduling prévoient une configuration de mapping champs",
  has(content.types, "dateField") &&
    has(content.types, "timeField"),
  "RuntimeSchedulingTypes.ts"
);

check(
  checks,
  "Q22E-9N-C3-05",
  "Policy scheduling transporte le mapping champs",
  has(content.policy, "dateField") &&
    has(content.policy, "timeField"),
  "SchedulingSlotPolicy.ts"
);

check(
  checks,
  "Q22E-9N-C3-06",
  "Settings types peuvent porter mapping date/time/duration/resource/status",
  has(content.settingsTypes, "dateField") &&
    has(content.settingsTypes, "timeField") &&
    has(content.settingsTypes, "durationField"),
  "RuntimeSchedulingSettingsTypes.ts",
  "INFO"
);

check(
  checks,
  "Q22E-9N-C3-07",
  "Metadata rendezvous déclare explicitement son mapping scheduling",
  has(content.rendezvousModule, /scheduling[\s\S]*dateField/) &&
    has(content.rendezvousModule, /scheduling[\s\S]*timeField/),
  "rendezvous.module.ts"
);

check(
  checks,
  "Q22E-9N-C3-08",
  "Guards ne doivent pas nommer rendezvous comme règle générique",
  !has(content.guards, /isRendezvousModule|guardRendezvousMutation|loadExistingRendezvousForConflictCheck/),
  lineMatches(files.guards, [
    /isRendezvousModule/,
    /guardRendezvousMutation/,
    /loadExistingRendezvousForConflictCheck/,
  ]).join("\n") || "OK"
);

check(
  checks,
  "Q22E-9N-C3-09",
  "Guards ne doivent pas dépendre de typeService pour scheduling générique",
  !has(content.guards, /typeService/),
  lineMatches(files.guards, [/typeService/]).join("\n") || "OK"
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q22E-9N-C3 — Scheduling field mapping audit

Date: ${new Date().toISOString()}

## Objectif

Auditer si le runtime scheduling est réellement metadata-driven pour les champs métier.

Doctrine:

- Le moteur scheduling ne doit pas connaître dateRendezVous/heureRendezVous.
- Le moteur scheduling doit recevoir un mapping depuis metadata/settings/policy.
- Le module rendezvous peut déclarer son mapping.
- Les guards doivent protéger les modules schedulables, pas un module rendezvous hardcodé.

## Résumé

- Checks: ${checks.length}
- OK: ${checks.filter((c) => c.ok).length}
- FAIL: ${checks.filter((c) => !c.ok).length}
- FAIL_HIGH: ${highFails.length}
- FAIL_INFO: ${infoFails.length}

## Fichiers inspectés

${Object.values(files).map((file) => `- \`${file}\``).join("\n")}

## Mentions dateRendezVous / heureRendezVous dans engine

${
  lineMatches(files.engine, [/dateRendezVous/, /heureRendezVous/]).join("\n") ||
  "Aucune."
}

## Mentions rendezvous dans guards

${
  lineMatches(files.guards, [
    /isRendezvousModule/,
    /guardRendezvousMutation/,
    /loadExistingRendezvousForConflictCheck/,
    /rendezvous/,
  ]).join("\n") || "Aucune."
}

## Mentions typeService dans guards

${lineMatches(files.guards, [/typeService/]).join("\n") || "Aucune."}

## Checks détaillés

`;

for (const c of checks) {
  report += `\n### ${c.ok ? "OK" : "FAIL"} — ${c.id}\n\n`;
  report += `- Label: ${c.label}\n`;
  report += `- Severity: ${c.severity}\n`;
  report += `- Details:\n${c.details || "-"}\n`;
}

report += `\n## Décision recommandée\n\n`;

if (highFails.length > 0) {
  report += `Le runtime scheduling n'est pas encore complètement metadata-driven.

Suite recommandée:
- Q22E-9N-C4 — extraire le mapping scheduling vers metadata/policy.
- Q22E-9N-C5 — remplacer les guards rendezvous par guards schedulable modules.
- Refaire Q22E-9N-C3 puis Q22E-9N-C2.
`;
} else {
  report += `Le mapping scheduling semble metadata-driven.

Suite recommandée:
- Refaire Q22E-9N-C2.
- Puis reprendre Q22E-9N-C service/action readiness.
`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q22E-9N-C3] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).replace(/\\/g, "/")}`);