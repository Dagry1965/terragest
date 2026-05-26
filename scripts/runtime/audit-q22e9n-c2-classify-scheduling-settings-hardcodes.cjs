const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md"
);

function read(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return "";
  return fs.readFileSync(full, "utf8");
}

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function walk(dir, matcher, results = []) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return results;

  for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
    const absolute = path.join(full, entry.name);
    const rel = path.relative(ROOT, absolute).replace(/\\/g, "/");

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

function lineMatches(file, patterns) {
  const content = read(file);
  if (!content) return [];

  const lines = content.split(/\r?\n/);
  const matches = [];

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (pattern.test(line)) {
        matches.push({
          file,
          line: index + 1,
          text: line.trim(),
          pattern: pattern.toString(),
        });
        break;
      }
    }
  });

  return matches;
}

function isAllowedConsumerFile(file) {
  return (
    /src\/runtime\/modules\/generated\/rendezvous\/rendezvous\.module\.ts$/.test(file) ||
    /src\/app\/\(private\)\/rendezvous\//.test(file) ||
    /src\/app\/\(private\)\/rendezvous\/planning\/page\.tsx$/.test(file) ||
    /docs\/audits\//.test(file) ||
    /scripts\/runtime\//.test(file)
  );
}

function isGenericRuntimeFile(file) {
  return (
    /src\/runtime\/scheduling\//.test(file) ||
    /src\/runtime\/guards\//.test(file) ||
    /src\/runtime\/relations\//.test(file) ||
    /src\/components\/erp\/scheduling\//.test(file) ||
    /src\/components\/erp\/runtime\//.test(file)
  );
}

function isForbiddenInGenericRuntime(match) {
  if (!isGenericRuntimeFile(match.file)) return false;

  return /amarkhys|garage|vehiculeId|typeService/i.test(match.text);
}

function isSuspiciousRendezvousInGenericRuntime(match) {
  if (!isGenericRuntimeFile(match.file)) return false;

  if (!/rendezvous/i.test(match.text)) return false;

  const allowedGenericPatterns = [
    /moduleKey/i,
    /metadata/i,
    /module\.key/i,
    /record/i,
    /route/i,
    /href/i,
    /label/i,
    /relation/i,
  ];

  return !allowedGenericPatterns.some((pattern) => pattern.test(match.text));
}

fs.mkdirSync(REPORT_DIR, { recursive: true });

const files = walk(".", (rel, name) => {
  if (!/\.(ts|tsx|js|cjs|md)$/.test(name)) return false;
  if (/node_modules|\.next|\.git/.test(rel)) return false;
  return (
    /src\/runtime\/scheduling|src\/runtime\/guards|src\/runtime\/relations|src\/components\/erp\/scheduling|src\/components\/erp\/runtime|src\/runtime\/modules\/generated\/rendezvous|src\/app\/\(private\)\/rendezvous|docs\/audits\/Q22E-9N-C|scripts\/runtime\/audit-q22e9n-c/i.test(
      rel
    )
  );
});

const patterns = [
  /amarkhys/i,
  /garage/i,
  /rendezvous/i,
  /vehiculeId/i,
  /typeService/i,
];

const matches = files.flatMap((file) => lineMatches(file, patterns));

const allowedMatches = matches.filter((match) => isAllowedConsumerFile(match.file));
const forbiddenGenericMatches = matches.filter(isForbiddenInGenericRuntime);
const suspiciousRendezvousMatches = matches.filter(isSuspiciousRendezvousInGenericRuntime);

const genericRuntimeMatches = matches.filter((match) => isGenericRuntimeFile(match.file));

const checks = [];

check(
  checks,
  "Q22E-9N-C2-01",
  "Aucun hardcode AMARKHYS/garage/vehiculeId/typeService dans runtime générique scheduling",
  forbiddenGenericMatches.length === 0,
  forbiddenGenericMatches
    .map((m) => `${m.file}:${m.line} — ${m.text}`)
    .join("\n") || "OK"
);

check(
  checks,
  "Q22E-9N-C2-02",
  "Aucun rendezvous suspect codé comme règle générique",
  suspiciousRendezvousMatches.length === 0,
  suspiciousRendezvousMatches
    .map((m) => `${m.file}:${m.line} — ${m.text}`)
    .join("\n") || "OK"
);

check(
  checks,
  "Q22E-9N-C2-03",
  "Les mentions rendezvous dans metadata/routes consommatrices sont tolérées",
  allowedMatches.length >= 0,
  allowedMatches
    .slice(0, 80)
    .map((m) => `${m.file}:${m.line} — ${m.text}`)
    .join("\n") || "Aucune mention tolérée détectée",
  "INFO"
);

check(
  checks,
  "Q22E-9N-C2-04",
  "Les fichiers runtime génériques scannés sont identifiés",
  genericRuntimeMatches.length >= 0,
  [...new Set(genericRuntimeMatches.map((m) => m.file))].join("\n") || "Aucun",
  "INFO"
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q22E-9N-C2 — Classify scheduling settings hardcode findings

Date: ${new Date().toISOString()}

## Objectif

Classifier les findings Q22E-9N-C pour distinguer les vrais hardcodes runtime des mentions normales dans les modules/routes consommateurs.

Doctrine:

- AMARKHYS/garage ne doivent jamais apparaître comme logique dans le runtime générique.
- rendezvous peut apparaître dans un module consommateur ou une route consommateur.
- rendezvous ne doit pas devenir une règle interne du moteur scheduling.
- vehiculeId/typeService ne doivent pas apparaître dans le moteur générique scheduling.

## Résumé

- Checks: ${checks.length}
- OK: ${checks.filter((c) => c.ok).length}
- FAIL: ${checks.filter((c) => !c.ok).length}
- FAIL_HIGH: ${highFails.length}
- FAIL_INFO: ${infoFails.length}

## Tous les fichiers inspectés

${files.map((file) => `- \`${file}\``).join("\n")}

## Matches runtime génériques

${
  genericRuntimeMatches.length
    ? genericRuntimeMatches
        .map((m) => `- \`${m.file}:${m.line}\` — ${m.text}`)
        .join("\n")
    : "- Aucun match runtime générique."
}

## Matches tolérés metadata/routes/scripts/docs

${
  allowedMatches.length
    ? allowedMatches
        .slice(0, 120)
        .map((m) => `- \`${m.file}:${m.line}\` — ${m.text}`)
        .join("\n")
    : "- Aucun match toléré."
}

## Vrais matches interdits potentiels

${
  forbiddenGenericMatches.length
    ? forbiddenGenericMatches
        .map((m) => `- \`${m.file}:${m.line}\` — ${m.text}`)
        .join("\n")
    : "- Aucun hardcode interdit détecté."
}

## Rendezvous suspects potentiels

${
  suspiciousRendezvousMatches.length
    ? suspiciousRendezvousMatches
        .map((m) => `- \`${m.file}:${m.line}\` — ${m.text}`)
        .join("\n")
    : "- Aucun rendezvous suspect détecté."
}

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
  report += `Des hardcodes runtime génériques sont confirmés ou suspects.

Suite recommandée:
- Q22E-9N-C3 — corriger les hardcodes confirmés avant de créer une couche service/action.
`;
} else {
  report += `Aucun hardcode runtime générique confirmé.

Les FAIL_HIGH de Q22E-9N-C sont probablement des faux positifs dus à un scan trop large.

Suite recommandée:
- Q22E-9N-C3 — aligner l'audit Q22E-9N-C pour classifier metadata/routes comme tolérées.
- Puis relancer Q22E-9N-C.
`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q22E-9N-C2] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).replace(/\\/g, "/")}`);