/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const AUDIT_ID = "Q22E-9L-B2-C";

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "Q22E-9L-B2-C-rdv-consumption-validation-audit.md"
);

const SEARCH_DIRS = [
  "src/runtime",
  "src/components",
  "src/app",
];

const TARGETS = [
  "validateRendezvousForIntervention",
  "consumedByInterventionId",
  "isCancelledAppointment",
  "Impossible de créer une intervention",
  "déjà utilisé",
  "deja utilise",
  "already consumed",
  "already used",
];

function rel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function walk(dir) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) return [];

  const files = [];

  function visit(current) {
    if (
      current.includes(`${path.sep}node_modules${path.sep}`) ||
      current.includes(`${path.sep}.next${path.sep}`) ||
      current.includes(`${path.sep}.git${path.sep}`) ||
      current.includes(`${path.sep}coverage${path.sep}`)
    ) {
      return;
    }

    const stat = fs.statSync(current);

    if (stat.isDirectory()) {
      for (const child of fs.readdirSync(current)) {
        visit(path.join(current, child));
      }
      return;
    }

    if (/\.(ts|tsx|js|jsx|cjs|mjs)$/.test(current)) {
      files.push(current);
    }
  }

  visit(base);
  return files;
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

function classify(file, target, line) {
  const normalized = rel(file);

  if (normalized.includes("src/runtime/scheduling/RuntimeSchedulingEngine.ts")) {
    return {
      severity: "HIGH",
      layer: "Engine violation",
      decision:
        "À sortir du scheduling engine : validation métier RDV/intervention.",
    };
  }

  if (normalized.includes("src/runtime/business-rules/runtimeBusinessRules.ts")) {
    return {
      severity: "REVIEW",
      layer: "BusinessRule",
      decision:
        "Acceptable provisoirement si la validation métier est portée par business rule.",
    };
  }

  if (normalized.includes("src/runtime/guards/")) {
    return {
      severity: "REVIEW",
      layer: "Guard",
      decision:
        "Acceptable si le guard est explicitement métier ou metadata-driven.",
    };
  }

  if (normalized.includes("src/runtime/modules/generated/")) {
    return {
      severity: "INFO",
      layer: "Module metadata",
      decision:
        "Acceptable si c’est une déclaration de champ, relation ou composition.",
    };
  }

  return {
    severity: "INFO",
    layer: "Other",
    decision: "À vérifier selon contexte.",
  };
}

const findings = [];

for (const file of SEARCH_DIRS.flatMap(walk)) {
  const content = fs.readFileSync(file, "utf8");

  for (const target of TARGETS) {
    const regex = new RegExp(
      target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "gi"
    );

    let match;
    while ((match = regex.exec(content)) !== null) {
      const info = lineInfo(content, match.index);
      const classification = classify(file, target, info.line);

      findings.push({
        target,
        file: rel(file),
        line: info.lineNumber,
        text: info.line,
        ...classification,
      });

      if (match.index === regex.lastIndex) regex.lastIndex++;
    }
  }
}

const high = findings.filter((f) => f.severity === "HIGH");
const review = findings.filter((f) => f.severity === "REVIEW");
const info = findings.filter((f) => f.severity === "INFO");

function escapeMd(value) {
  return String(value || "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ");
}

function table(rows) {
  if (rows.length === 0) return "_Aucun finding._\n";

  return [
    "| Sévérité | Couche | Cible | Fichier | Ligne | Extrait | Décision |",
    "|---|---|---|---|---:|---|---|",
    ...rows.map(
      (f) =>
        `| ${f.severity} | ${escapeMd(f.layer)} | ${escapeMd(f.target)} | \`${escapeMd(f.file)}\` | ${f.line} | \`${escapeMd(f.text).slice(0, 180)}\` | ${escapeMd(f.decision)} |`
    ),
  ].join("\n") + "\n";
}

const report = [
  `# ${AUDIT_ID} — RDV consumption validation audit`,
  "",
  "## Objectif",
  "",
  "Identifier les usages restants de `validateRendezvousForIntervention` et `consumedByInterventionId` avant extraction hors `RuntimeSchedulingEngine`.",
  "",
  "## Doctrine",
  "",
  "Le scheduling engine calcule les slots, disponibilités, conflits, buffers et capacités. Il ne valide pas la création métier d’une intervention depuis un rendez-vous.",
  "",
  "## Résumé",
  "",
  `- Findings : ${findings.length}`,
  `- HIGH : ${high.length}`,
  `- REVIEW : ${review.length}`,
  `- INFO : ${info.length}`,
  "",
  "## Findings HIGH — à sortir du scheduling engine",
  "",
  table(high),
  "",
  "## Findings REVIEW — à classer",
  "",
  table(review),
  "",
  "## Findings INFO — probablement metadata/UI",
  "",
  table(info),
  "",
  "## Décision attendue",
  "",
  "- Ce qui reste en BusinessRule.",
  "- Ce qui doit aller en Guard.",
  "- Ce qui doit rester en Metadata.",
  "- Ce qui doit être supprimé du RuntimeSchedulingEngine.",
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