/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const AUDIT_ID = "Q22E-9M-D-A";

const TARGET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "Q22E-9M-D-A-planning-view-policy-leak-audit.md"
);

const TARGETS = [
  {
    key: "getVisibleSchedulingDurationMinutes",
    severity: "HIGH",
    decision: "La résolution de durée doit sortir de la vue vers SchedulingSlotPolicy/runtime.",
  },
  {
    key: "durationMinutes",
    severity: "REVIEW",
    decision: "Acceptable seulement si affichage d'une valeur déjà résolue.",
  },
  {
    key: "bufferMinutes",
    severity: "HIGH",
    decision: "Le buffer est une règle runtime/policy, pas une règle UI.",
  },
  {
    key: "capacity",
    severity: "REVIEW",
    decision: "Acceptable si affichage de slot.capacity, suspect si calcul/config.",
  },
  {
    key: "remainingCapacity",
    severity: "INFO",
    decision: "Affichage UI acceptable si déjà calculé par runtime.",
  },
  {
    key: "RuntimeSchedulingEngine.defaultDurationMinutes",
    severity: "HIGH",
    decision: "La vue ne doit pas dépendre du fallback engine.",
  },
  {
    key: "RuntimeSchedulingEngine.getAvailableSlotsForDate",
    severity: "HIGH",
    decision: "La vue ne doit pas orchestrer les règles si une couche runtime les fournit déjà.",
  },
  {
    key: "getAvailableSlotsForDate",
    severity: "HIGH",
    decision: "À vérifier : génération de slots dans la vue ou appel runtime direct.",
  },
];

function rel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`[${AUDIT_ID}] Fichier introuvable: ${rel(file)}`);
  }
  return fs.readFileSync(file, "utf8");
}

function lineInfo(content, index) {
  const before = content.slice(0, index);
  const lineNumber = before.split(/\r?\n/).length;
  const line = content.split(/\r?\n/)[lineNumber - 1] || "";
  return {
    lineNumber,
    line: line.trim(),
  };
}

function escapeMd(value) {
  return String(value || "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ");
}

const content = read(TARGET);
const findings = [];

for (const target of TARGETS) {
  const regex = new RegExp(
    target.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    "gi"
  );

  let match;
  while ((match = regex.exec(content)) !== null) {
    const info = lineInfo(content, match.index);

    findings.push({
      key: target.key,
      severity: target.severity,
      decision: target.decision,
      file: rel(TARGET),
      line: info.lineNumber,
      text: info.line,
    });

    if (match.index === regex.lastIndex) regex.lastIndex++;
  }
}

const high = findings.filter((f) => f.severity === "HIGH");
const review = findings.filter((f) => f.severity === "REVIEW");
const info = findings.filter((f) => f.severity === "INFO");

function table(rows) {
  if (rows.length === 0) return "_Aucun finding._\n";

  return [
    "| Sévérité | Cible | Ligne | Extrait | Décision |",
    "|---|---|---:|---|---|",
    ...rows.map(
      (f) =>
        `| ${f.severity} | ${escapeMd(f.key)} | ${f.line} | \`${escapeMd(f.text).slice(0, 180)}\` | ${escapeMd(f.decision)} |`
    ),
  ].join("\n") + "\n";
}

const report = [
  `# ${AUDIT_ID} — Planning view policy leak audit`,
  "",
  "## Objectif",
  "",
  "Identifier précisément ce que `ERPSchedulingPlanningView` calcule encore alors que cela devrait venir du runtime ou de `SchedulingSlotPolicy`.",
  "",
  "## Doctrine",
  "",
  "La vue affiche. Elle ne résout pas duration, buffer, capacity, policy ni fallback engine.",
  "",
  "## Résumé",
  "",
  `- Findings : ${findings.length}`,
  `- HIGH : ${high.length}`,
  `- REVIEW : ${review.length}`,
  `- INFO : ${info.length}`,
  "",
  "## Findings HIGH — à sortir de la vue",
  "",
  table(high),
  "",
  "## Findings REVIEW — affichage ou logique à classer",
  "",
  table(review),
  "",
  "## Findings INFO — affichage probablement acceptable",
  "",
  table(info),
  "",
  "## Décision attendue",
  "",
  "- Supprimer les helpers de résolution runtime dans la vue.",
  "- Garder les affichages de valeurs déjà résolues.",
  "- Remplacer les dépendances directes au fallback engine.",
  "- Ne pas déplacer de logique vers AMARKHYS.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, report, "utf8");

console.log(`[${AUDIT_ID}] DONE`);
console.log(`[FINDINGS] ${findings.length}`);
console.log(`[HIGH] ${high.length}`);
console.log(`[REVIEW] ${review.length}`);
console.log(`[INFO] ${info.length}`);
console.log(`[REPORT] ${rel(REPORT)}`);