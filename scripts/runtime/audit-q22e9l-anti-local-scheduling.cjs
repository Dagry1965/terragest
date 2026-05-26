/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const AUDIT_ID = "Q22E-9L";
const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(REPORT_DIR, "Q22E-9L-anti-local-scheduling-audit.md");

const CANDIDATE_DIRS = [
  "src/runtime/scheduling",
  "src/runtime/scheduling/settings",
  "src/components/erp/scheduling",
  "src/runtime/modules/generated/rendezvous",
  "src/runtime/modules/definitions",
  "src/runtime/guards",
  "src/runtime/repositories",
  "src/runtime/business-rules",
  "src/app",
];

const EXCLUDED_DIR_PARTS = [
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "coverage",
];

const INCLUDED_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".cjs",
  ".mjs",
]);

const GENERIC_ALLOWED_METADATA_FILES = [
  "rendezvous.module.ts",
  "coreModules.ts",
];

const SUSPICIOUS_HARDCODES = [
  {
    key: "rendezvous",
    regex: /\brendezvous\b/gi,
    level: "Architecture / Runtime audit",
    message:
      "Référence directe à rendezvous. Acceptable dans metadata ou route déclarative, suspect dans moteur/vue générique.",
  },
  {
    key: "vehiculeId",
    regex: /\bvehiculeId\b/g,
    level: "Module metadata / Runtime audit",
    message:
      "Référence directe à vehiculeId. Acceptable comme resourceField metadata, suspect dans moteur générique.",
  },
  {
    key: "amarkhys",
    regex: /\bamarkhys\b/gi,
    level: "Architecture / Runtime audit",
    message:
      "Référence directe à AMARKHYS. Interdite dans moteur générique sauf config explicite.",
  },
  {
    key: "garage",
    regex: /\bgarage\b/gi,
    level: "Architecture / Runtime audit",
    message:
      "Référence directe à garage. Interdite dans moteur générique sauf config explicite.",
  },
  {
    key: "typeService",
    regex: /\btypeService\b/g,
    level: "Module metadata / Runtime audit",
    message:
      "Référence directe à typeService. Acceptable si metadata déclarative, suspect si logique moteur.",
  },
  {
    key: "clientsauto",
    regex: /\bclientsauto\b/gi,
    level: "Architecture / Runtime audit",
    message:
      "Référence directe à clientsauto. Suspect hors metadata, routes ou règles explicitement déclarées.",
  },
  {
    key: "interventionsauto",
    regex: /\binterventionsauto\b/gi,
    level: "Architecture / Runtime audit",
    message:
      "Référence directe à interventionsauto. Suspect hors metadata, routes ou règles explicitement déclarées.",
  },
  {
    key: "facturesauto",
    regex: /\bfacturesauto\b/gi,
    level: "Architecture / Runtime audit",
    message:
      "Référence directe à facturesauto. Suspect hors metadata, routes ou règles explicitement déclarées.",
  },
];

const VIEW_LOGIC_PATTERNS = [
  {
    key: "bufferMinutes",
    regex: /\bbufferMinutes\b/g,
    level: "Engine + Settings",
    message:
      "Usage de bufferMinutes. Dans une vue, cela doit normalement venir d’un slot déjà calculé ou d’une config résolue.",
  },
  {
    key: "capacity",
    regex: /\bcapacity\b/g,
    level: "Engine + Guard",
    message:
      "Usage de capacity. La capacité doit être calculée par moteur et protégée par guard.",
  },
  {
    key: "generate slot",
    regex: /\b(generate|build|create|compute|calculate).{0,40}\b(slot|slots|creneau|créneau|plage|plages)\b/gi,
    level: "Engine / SchedulingSlotPolicy",
    message:
      "La génération de slots est une responsabilité RuntimeSchedulingEngine / SchedulingSlotPolicy.",
  },
  {
    key: "slot loop",
    regex: /\bwhile\s*\(|\bfor\s*\(/g,
    level: "Engine / SchedulingSlotPolicy",
    message:
      "Boucle détectée. À vérifier si elle génère des slots, capacités ou périodes dans une vue.",
  },
  {
    key: "working hours",
    regex: /\b(opening|closing|startHour|endHour|workday|working|pause|break|lunch|midi|fermeture|ouverture)\b/gi,
    level: "Settings + Resolver + Engine",
    message:
      "Horaires/pause détectés. Ces règles doivent être configurées, résolues puis appliquées par moteur.",
  },
  {
    key: "date math",
    regex: /\bsetHours\b|\bsetMinutes\b|\bgetHours\b|\bgetMinutes\b|\bnew Date\b/g,
    level: "Engine / Date policy",
    message:
      "Manipulation de dates détectée. À vérifier : la vue ne doit pas porter la règle temporelle métier.",
  },
];

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function exists(p) {
  return fs.existsSync(path.join(ROOT, p));
}

function shouldExclude(fullPath) {
  const normalized = normalizePath(fullPath);
  return EXCLUDED_DIR_PARTS.some((part) => normalized.includes(`/${part}/`) || normalized.endsWith(`/${part}`));
}

function walk(dir) {
  const absolute = path.join(ROOT, dir);
  if (!fs.existsSync(absolute)) return [];

  const results = [];

  function visit(current) {
    if (shouldExclude(current)) return;

    const stat = fs.statSync(current);

    if (stat.isDirectory()) {
      for (const child of fs.readdirSync(current)) {
        visit(path.join(current, child));
      }
      return;
    }

    const ext = path.extname(current);
    if (!INCLUDED_EXTENSIONS.has(ext)) return;

    results.push(current);
  }

  visit(absolute);
  return results;
}

function readFileSafe(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch (error) {
    return null;
  }
}

function getLineInfo(content, index) {
  const before = content.slice(0, index);
  const lineNumber = before.split(/\r?\n/).length;
  const lines = content.split(/\r?\n/);
  const line = lines[lineNumber - 1] || "";
  return {
    lineNumber,
    line: line.trim(),
  };
}

function isViewFile(file) {
  const n = normalizePath(file).toLowerCase();
  return (
    n.includes("/components/") ||
    n.includes("/app/") ||
    n.endsWith(".tsx")
  );
}

function isRuntimeEngineFile(file) {
  const n = normalizePath(file).toLowerCase();
  return (
    n.includes("/runtime/") &&
    (
      n.includes("engine") ||
      n.includes("policy") ||
      n.includes("resolver") ||
      n.includes("guard") ||
      n.includes("repository") ||
      n.includes("settings")
    )
  );
}

function isMetadataAllowedFile(file) {
  const base = path.basename(file);
  return GENERIC_ALLOWED_METADATA_FILES.includes(base);
}

function classifyFinding(file, pattern, category) {
  const normalized = normalizePath(path.relative(ROOT, file));
  const base = path.basename(file);

  if (category === "hardcode") {
    if (isMetadataAllowedFile(file)) {
      return {
        severity: "INFO",
        decision:
          "Probablement acceptable si c’est une déclaration metadata et non une logique impérative.",
      };
    }

    if (normalized.includes("src/app/")) {
      return {
        severity: "WARN",
        decision:
          "À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier.",
      };
    }

    if (isRuntimeEngineFile(file)) {
      return {
        severity: "HIGH",
        decision:
          "Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur.",
      };
    }

    return {
      severity: "WARN",
      decision:
        "À vérifier : référence métier potentiellement locale hors metadata.",
    };
  }

  if (category === "view-logic") {
    if (isViewFile(file)) {
      return {
        severity: "HIGH",
        decision:
          "Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings.",
      };
    }

    if (isRuntimeEngineFile(file)) {
      return {
        severity: "INFO",
        decision:
          "Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte.",
      };
    }

    return {
      severity: "WARN",
      decision:
        "À vérifier : responsabilité potentiellement runtime.",
    };
  }

  return {
    severity: "WARN",
    decision: "À vérifier.",
  };
}

function scanPattern(file, content, pattern, category) {
  const findings = [];
  const regex = new RegExp(pattern.regex.source, pattern.regex.flags);

  let match;
  while ((match = regex.exec(content)) !== null) {
    const lineInfo = getLineInfo(content, match.index);
    const classification = classifyFinding(file, pattern, category);

    findings.push({
      category,
      key: pattern.key,
      level: pattern.level,
      message: pattern.message,
      severity: classification.severity,
      decision: classification.decision,
      file: normalizePath(path.relative(ROOT, file)),
      lineNumber: lineInfo.lineNumber,
      line: lineInfo.line,
    });

    if (match.index === regex.lastIndex) regex.lastIndex++;
  }

  return findings;
}

function groupBySeverity(findings) {
  return findings.reduce(
    (acc, finding) => {
      acc[finding.severity] = acc[finding.severity] || [];
      acc[finding.severity].push(finding);
      return acc;
    },
    {}
  );
}

function uniqueFiles(files) {
  return Array.from(new Set(files.map((f) => normalizePath(path.relative(ROOT, f))))).sort();
}

function markdownEscape(value) {
  return String(value || "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ");
}

function renderFindingsTable(findings) {
  if (findings.length === 0) {
    return "_Aucun résultat._\n";
  }

  const lines = [];
  lines.push("| Sévérité | Niveau | Motif | Fichier | Ligne | Extrait | Décision |");
  lines.push("|---|---|---|---|---:|---|---|");

  for (const f of findings) {
    lines.push(
      `| ${markdownEscape(f.severity)} | ${markdownEscape(f.level)} | ${markdownEscape(f.key)} | \`${markdownEscape(f.file)}\` | ${f.lineNumber} | \`${markdownEscape(f.line).slice(0, 180)}\` | ${markdownEscape(f.decision)} |`
    );
  }

  return lines.join("\n") + "\n";
}

function renderSummary(findings) {
  const total = findings.length;
  const high = findings.filter((f) => f.severity === "HIGH").length;
  const warn = findings.filter((f) => f.severity === "WARN").length;
  const info = findings.filter((f) => f.severity === "INFO").length;

  return [
    `- Total findings : ${total}`,
    `- HIGH : ${high}`,
    `- WARN : ${warn}`,
    `- INFO : ${info}`,
  ].join("\n");
}

function main() {
  console.log(`[${AUDIT_ID}] Audit anti-local scheduling...`);

  const existingDirs = CANDIDATE_DIRS.filter(exists);
  const missingDirs = CANDIDATE_DIRS.filter((dir) => !exists(dir));

  const files = existingDirs.flatMap(walk);
  const scannedFiles = uniqueFiles(files);

  const findings = [];

  for (const file of files) {
    const content = readFileSafe(file);
    if (!content) continue;

    for (const pattern of SUSPICIOUS_HARDCODES) {
      findings.push(...scanPattern(file, content, pattern, "hardcode"));
    }

    for (const pattern of VIEW_LOGIC_PATTERNS) {
      findings.push(...scanPattern(file, content, pattern, "view-logic"));
    }
  }

  const bySeverity = groupBySeverity(findings);
  const highFindings = bySeverity.HIGH || [];
  const warnFindings = bySeverity.WARN || [];
  const infoFindings = bySeverity.INFO || [];

  const report = [
    `# ${AUDIT_ID} — Anti-local Scheduling Audit`,
    "",
    "## 1. Objectif",
    "",
    "Cet audit vérifie que le scheduling reste ERP générique, runtime-driven et metadata-driven.",
    "",
    "Il détecte :",
    "",
    "- les hardcodes métier hors metadata ;",
    "- les références directes à `rendezvous`, `vehiculeId`, `amarkhys`, `garage`, `typeService` ;",
    "- la logique de buffer/capacity/slot generation potentiellement placée dans une vue ;",
    "- les responsabilités qui devraient appartenir à `RuntimeSchedulingEngine`, `SchedulingSlotPolicy`, settings/resolver/guards/repositories.",
    "",
    "Aucun fichier applicatif n’est modifié par cet audit.",
    "",
    "## 2. Doctrine appliquée",
    "",
    "Question obligatoire :",
    "",
    "```text",
    "Est-ce vraiment UI ou est-ce une règle runtime ?",
    "```",
    "",
    "Rappel :",
    "",
    "- Les modules déclarent.",
    "- Les vues affichent.",
    "- Les engines calculent.",
    "- Les resolvers résolvent.",
    "- Les settings configurent.",
    "- Les guards protègent.",
    "- Les repositories persistent.",
    "",
    "## 3. Dossiers inspectés",
    "",
    existingDirs.map((dir) => `- \`${dir}\``).join("\n") || "_Aucun dossier inspecté._",
    "",
    "## 4. Dossiers absents",
    "",
    missingDirs.map((dir) => `- \`${dir}\``).join("\n") || "_Aucun._",
    "",
    "## 5. Fichiers scannés",
    "",
    scannedFiles.map((file) => `- \`${file}\``).join("\n") || "_Aucun fichier scanné._",
    "",
    "## 6. Résumé",
    "",
    renderSummary(findings),
    "",
    "## 7. Findings HIGH",
    "",
    renderFindingsTable(highFindings),
    "",
    "## 8. Findings WARN",
    "",
    renderFindingsTable(warnFindings),
    "",
    "## 9. Findings INFO",
    "",
    renderFindingsTable(infoFindings),
    "",
    "## 10. Lecture attendue",
    "",
    "### HIGH",
    "",
    "À traiter en priorité. Indique généralement une logique runtime ou métier placée au mauvais endroit.",
    "",
    "### WARN",
    "",
    "À examiner manuellement. Peut être acceptable selon contexte.",
    "",
    "### INFO",
    "",
    "Souvent acceptable si la logique est déclarative, metadata-driven ou déjà dans une couche runtime correcte.",
    "",
    "## 11. Décision attendue après audit",
    "",
    "Après lecture du rapport, classer chaque anomalie en :",
    "",
    "- UI / Vue ;",
    "- Module metadata ;",
    "- Settings ;",
    "- Resolver ;",
    "- Engine ;",
    "- Guard ;",
    "- Repository.",
    "",
    "Puis décider seulement ensuite des corrections.",
    "",
    "## 12. Prochaine étape proposée",
    "",
    "Après cet audit :",
    "",
    "1. identifier les `HIGH` réellement problématiques ;",
    "2. décider ce qui remonte dans `RuntimeSchedulingEngine` ;",
    "3. décider si une `SchedulingSlotPolicy` générique est nécessaire ;",
    "4. décider ce qui reste dans `ERPSchedulingPlanningView` ;",
    "5. préparer une passe corrective séparée, sans patch local AMARKHYS.",
    "",
  ].join("\n");

  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(REPORT_FILE, report, "utf8");

  console.log("");
  console.log(`[${AUDIT_ID}] DONE`);
  console.log(`[SCANNED FILES] ${scannedFiles.length}`);
  console.log(`[FINDINGS] ${findings.length}`);
  console.log(`[HIGH] ${highFindings.length}`);
  console.log(`[WARN] ${warnFindings.length}`);
  console.log(`[INFO] ${infoFindings.length}`);
  console.log(`[REPORT] ${normalizePath(path.relative(ROOT, REPORT_FILE))}`);

  if (highFindings.length > 0) {
    console.log("");
    console.log("[NEXT]");
    console.log("Lire les findings HIGH avant toute correction.");
  }
}

main();