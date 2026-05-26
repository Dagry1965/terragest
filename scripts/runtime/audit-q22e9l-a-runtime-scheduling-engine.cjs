/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const AUDIT_ID = "Q22E-9L-A";
const TARGET_FILE = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9L-A-runtime-scheduling-engine-audit.md"
);

const RULES = [
  {
    key: "LOCAL_MODULE_RENDEZVOUS",
    level: "Engine violation",
    targetLayer: "BusinessRule / Metadata / Mapping",
    regex: /\brendezvous\b/gi,
    decision:
      "Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config.",
  },
  {
    key: "LOCAL_FIELD_VEHICULE_ID",
    level: "Engine violation",
    targetLayer: "Module metadata / Resolved resourceField",
    regex: /\bvehiculeId\b/g,
    decision:
      "vehiculeId doit venir de scheduling.resourceField ou d'une config résolue, jamais être hardcodé dans le moteur.",
  },
  {
    key: "LOCAL_FIELD_CLIENT_ID",
    level: "Mapping métier",
    targetLayer: "BusinessRule / Mapping metadata",
    regex: /\bclientId\b/g,
    decision:
      "clientId est un champ métier. Le scheduling engine ne doit pas le manipuler directement.",
  },
  {
    key: "LOCAL_FIELD_TYPE_SERVICE",
    level: "Mapping métier",
    targetLayer: "BusinessRule / Mapping metadata",
    regex: /\btypeService\b/g,
    decision:
      "typeService est métier AMARKHYS. À sortir du scheduling engine.",
  },
  {
    key: "LOCAL_FIELD_DATE_RENDEZVOUS",
    level: "Metadata violation",
    targetLayer: "Module metadata scheduling.dateField",
    regex: /\bdateRendezVous\b/g,
    decision:
      "dateRendezVous doit venir de scheduling.dateField résolu, pas du moteur.",
  },
  {
    key: "BUILD_INTERVENTION_FROM_RENDEZVOUS",
    level: "Business workflow violation",
    targetLayer: "RuntimeBusinessRule / RuntimeWorkflowAction / Mapping engine",
    regex: /\bbuildInterventionFromRendezvous\b/g,
    decision:
      "La création intervention depuis RDV est une règle métier/workflow, pas une responsabilité scheduling.",
  },
  {
    key: "VALIDATE_RENDEZVOUS_FOR_INTERVENTION",
    level: "Business workflow violation",
    targetLayer: "RuntimeBusinessRule / RuntimeWorkflowAction / Guard métier déclaratif",
    regex: /\bvalidateRendezvousForIntervention\b/g,
    decision:
      "La validation RDV -> intervention ne doit pas vivre dans RuntimeSchedulingEngine.",
  },
  {
    key: "BUFFER_MINUTES",
    level: "Scheduling policy",
    targetLayer: "SchedulingSlotPolicy / Settings / Resolver",
    regex: /\bbufferMinutes\b/g,
    decision:
      "Le buffer est légitime dans le moteur seulement s'il est appliqué depuis config résolue ou policy.",
  },
  {
    key: "CAPACITY",
    level: "Scheduling policy + Guard",
    targetLayer: "SchedulingSlotPolicy / RuntimeSchedulingGuard",
    regex: /\bcapacity\b/g,
    decision:
      "La capacité est légitime dans le moteur si elle calcule les slots, mais doit être protégée par guard à l'écriture.",
  },
  {
    key: "DIRECT_DATE_MATH",
    level: "Date policy",
    targetLayer: "RuntimeSchedulingEngine / Date utility",
    regex: /\bnew Date\b|\bsetHours\b|\bsetMinutes\b|\bgetHours\b|\bgetMinutes\b/g,
    decision:
      "La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable.",
  },
  {
    key: "SLOT_GENERATION",
    level: "Core scheduling",
    targetLayer: "RuntimeSchedulingEngine / SchedulingSlotPolicy",
    regex: /\bslot\b|\bslots\b|\bavailable\b|\bconflict\b|\boverlap\b/gi,
    decision:
      "La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques.",
  },
  {
    key: "MODULE_KEY_BRANCH",
    level: "Genericity risk",
    targetLayer: "Metadata / Resolver / Strategy",
    regex: /\bmoduleKey\b|\bmodule\.metadata\.key\b|\bmetadata\.key\b/g,
    decision:
      "Toute branche par moduleKey doit être vérifiée. Le moteur ne doit pas faire de if moduleKey === rendezvous.",
  },
];

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function readFile(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`Fichier introuvable: ${normalizePath(path.relative(ROOT, file))}`);
  }

  return fs.readFileSync(file, "utf8");
}

function getLineInfo(content, index) {
  const before = content.slice(0, index);
  const lineNumber = before.split(/\r?\n/).length;
  const lines = content.split(/\r?\n/);
  return {
    lineNumber,
    line: (lines[lineNumber - 1] || "").trim(),
  };
}

function scan(content) {
  const findings = [];

  for (const rule of RULES) {
    const regex = new RegExp(rule.regex.source, rule.regex.flags);
    let match;

    while ((match = regex.exec(content)) !== null) {
      const lineInfo = getLineInfo(content, match.index);

      findings.push({
        key: rule.key,
        level: rule.level,
        targetLayer: rule.targetLayer,
        decision: rule.decision,
        lineNumber: lineInfo.lineNumber,
        line: lineInfo.line,
      });

      if (match.index === regex.lastIndex) regex.lastIndex++;
    }
  }

  return findings.sort((a, b) => a.lineNumber - b.lineNumber);
}

function severityOf(finding) {
  if (
    finding.key.includes("RENDEZVOUS") ||
    finding.key.includes("VEHICULE") ||
    finding.key.includes("TYPE_SERVICE") ||
    finding.key.includes("CLIENT_ID") ||
    finding.key.includes("DATE_RENDEZVOUS")
  ) {
    return "HIGH";
  }

  if (
    finding.key.includes("BUFFER") ||
    finding.key.includes("CAPACITY") ||
    finding.key.includes("MODULE_KEY_BRANCH")
  ) {
    return "REVIEW";
  }

  return "INFO";
}

function escapeMd(value) {
  return String(value || "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ");
}

function renderTable(findings) {
  if (findings.length === 0) return "_Aucun finding._\n";

  const lines = [];
  lines.push("| Sévérité | Ligne | Règle | Niveau | Cible ERP | Extrait | Décision |");
  lines.push("|---|---:|---|---|---|---|---|");

  for (const f of findings) {
    lines.push(
      `| ${severityOf(f)} | ${f.lineNumber} | ${escapeMd(f.key)} | ${escapeMd(f.level)} | ${escapeMd(f.targetLayer)} | \`${escapeMd(f.line).slice(0, 180)}\` | ${escapeMd(f.decision)} |`
    );
  }

  return lines.join("\n") + "\n";
}

function groupBySeverity(findings) {
  return {
    HIGH: findings.filter((f) => severityOf(f) === "HIGH"),
    REVIEW: findings.filter((f) => severityOf(f) === "REVIEW"),
    INFO: findings.filter((f) => severityOf(f) === "INFO"),
  };
}

function main() {
  console.log(`[${AUDIT_ID}] Audit ciblé RuntimeSchedulingEngine...`);

  const content = readFile(TARGET_FILE);
  const findings = scan(content);
  const grouped = groupBySeverity(findings);

  const report = [
    `# ${AUDIT_ID} — Audit ciblé RuntimeSchedulingEngine`,
    "",
    "## 1. Objectif",
    "",
    "Ce rapport inspecte uniquement `src/runtime/scheduling/RuntimeSchedulingEngine.ts`.",
    "",
    "But : décider ce qui reste dans le scheduling générique et ce qui doit sortir vers metadata, settings, resolver, guard, business rules ou mapping.",
    "",
    "## 2. Doctrine appliquée",
    "",
    "```text",
    "Est-ce vraiment UI ou est-ce une règle runtime ?",
    "```",
    "",
    "Réponse : le calcul planning est runtime. Le moteur peut calculer les slots, mais ne doit pas connaître AMARKHYS, rendezvous, vehiculeId, typeService ou intervention.",
    "",
    "## 3. Classification cible",
    "",
    "| Élément | Couche correcte | Décision |",
    "|---|---|---|",
    "| Génération de slots | Engine / SchedulingSlotPolicy | À garder si générique |",
    "| Buffer | Settings + Resolver + SchedulingSlotPolicy | À garder seulement via config résolue |",
    "| Capacity | Engine + Guard | Calcul moteur, protection guard |",
    "| Resource | Metadata + Resolver | Via resourceField, jamais via vehiculeId direct |",
    "| Rendezvous -> Intervention | BusinessRule / Workflow / Mapping | À sortir du scheduling engine |",
    "| Champs AMARKHYS | Module metadata / Mapping | Interdits dans moteur générique |",
    "",
    "## 4. Résumé",
    "",
    `- Total findings : ${findings.length}`,
    `- HIGH : ${grouped.HIGH.length}`,
    `- REVIEW : ${grouped.REVIEW.length}`,
    `- INFO : ${grouped.INFO.length}`,
    "",
    "## 5. Findings HIGH — à sortir du moteur",
    "",
    renderTable(grouped.HIGH),
    "",
    "## 6. Findings REVIEW — à vérifier",
    "",
    renderTable(grouped.REVIEW),
    "",
    "## 7. Findings INFO — probablement légitimes",
    "",
    renderTable(grouped.INFO),
    "",
    "## 8. Décision attendue après lecture",
    "",
    "Classer chaque bloc de code du moteur en :",
    "",
    "- KEEP_IN_ENGINE",
    "- MOVE_TO_SLOT_POLICY",
    "- MOVE_TO_SETTINGS_RESOLVER",
    "- MOVE_TO_GUARD",
    "- MOVE_TO_BUSINESS_RULE",
    "- MOVE_TO_MAPPING_METADATA",
    "- REMOVE_FROM_SCHEDULING",
    "",
    "## 9. Prochaine passe",
    "",
    "Après validation du rapport : préparer Q22E-9L-B pour extraire du scheduling engine la logique RDV -> intervention et les champs métier hardcodés.",
    "",
  ].join("\n");

  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(REPORT_FILE, report, "utf8");

  console.log("");
  console.log(`[${AUDIT_ID}] DONE`);
  console.log(`[TARGET] ${normalizePath(path.relative(ROOT, TARGET_FILE))}`);
  console.log(`[FINDINGS] ${findings.length}`);
  console.log(`[HIGH] ${grouped.HIGH.length}`);
  console.log(`[REVIEW] ${grouped.REVIEW.length}`);
  console.log(`[INFO] ${grouped.INFO.length}`);
  console.log(`[REPORT] ${normalizePath(path.relative(ROOT, REPORT_FILE))}`);
}

main();
