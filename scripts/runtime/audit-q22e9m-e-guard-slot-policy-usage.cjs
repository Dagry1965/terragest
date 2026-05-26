/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const AUDIT_ID = "Q22E-9M-E-A";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
);

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "Q22E-9M-E-A-guard-slot-policy-usage-audit.md"
);

const TARGETS = [
  {
    key: "durationMinutes",
    severity: "REVIEW",
    decision:
      "Le guard peut utiliser la durée, mais elle doit venir de SchedulingSlotPolicyResolver.",
  },
  {
    key: "bufferMinutes",
    severity: "REVIEW",
    decision:
      "Le buffer doit venir de SchedulingSlotPolicyResolver, pas d’un recalcul local.",
  },
  {
    key: "capacity",
    severity: "REVIEW",
    decision:
      "Le guard protège la capacité, mais doit consommer une policy résolue.",
  },
  {
    key: "RuntimeSchedulingEngine.assertWithinOpeningHours",
    severity: "REVIEW",
    decision:
      "Acceptable provisoirement : guard d’intégrité horaire. Plus tard, brancher sur policy/settings effective.",
  },
  {
    key: "RuntimeSchedulingEngine.assertNoAppointmentConflict",
    severity: "REVIEW",
    decision:
      "Acceptable si les paramètres transmis viennent de policy/settings.",
  },
  {
    key: "Number(schedulingConfig?.capacity",
    severity: "HIGH",
    decision:
      "Calcul local suspect : remplacer par SchedulingSlotPolicyResolver.resolve(...).capacity.",
  },
  {
    key: "Number(normalizedRecord.durationMinutes",
    severity: "HIGH",
    decision:
      "Calcul local suspect : remplacer ou encapsuler via policy.",
  },
  {
    key: "schedulingConfig?.bufferMinutes",
    severity: "REVIEW",
    decision:
      "Acceptable si cette lecture est uniquement l'input transmis à SchedulingSlotPolicyResolver.resolve(...).",
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


function isPolicyResolverInput(content, index) {
  const start = content.lastIndexOf("SchedulingSlotPolicyResolver.resolve({", index);

  if (start === -1) {
    return false;
  }

  const end = content.indexOf("});", start);

  if (end === -1) {
    return false;
  }

  return index > start && index < end;
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
  `# ${AUDIT_ID} — Guard slot policy usage audit`,
  "",
  "## Objectif",
  "",
  "Identifier où `processRuntimeBeforeMutationGuards.ts` recalcule encore duration, buffer ou capacity au lieu de consommer `SchedulingSlotPolicyResolver`.",
  "",
  "## Doctrine",
  "",
  "Le guard protège les écritures. Il ne doit pas maintenir une policy parallèle. Il doit consommer la même policy que le scheduling engine.",
  "",
  "## Résumé",
  "",
  `- Findings : ${findings.length}`,
  `- HIGH : ${high.length}`,
  `- REVIEW : ${review.length}`,
  "",
  "## Findings HIGH — calculs locaux suspects",
  "",
  table(high),
  "",
  "## Findings REVIEW — guard acceptable mais à brancher",
  "",
  table(review),
  "",
  "## Décision attendue",
  "",
  "- Ce qui doit être remplacé par `SchedulingSlotPolicyResolver.resolve(...)`.",
  "- Ce qui reste dans le guard comme protection d’intégrité.",
  "- Ce qui reste dans `RuntimeSchedulingEngine`.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, report, "utf8");

console.log(`[${AUDIT_ID}] DONE`);
console.log(`[FINDINGS] ${findings.length}`);
console.log(`[HIGH] ${high.length}`);
console.log(`[REVIEW] ${review.length}`);
console.log(`[REPORT] ${rel(REPORT)}`);