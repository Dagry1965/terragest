const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const scanDirs = [
  "src/components",
  "src/runtime",
  "src/app",
];

const allowedMetadataDirs = [
  "src/runtime/modules/generated",
  "src/runtime/modules/definitions",
];

const suspiciousPatterns = [
  {
    key: "module-metadata-key-conditional",
    regex: /module\.metadata\.key\s*(===|!==)\s*["'`][^"'`]+["'`]/g,
    severity: "HIGH",
    message: "Condition directe sur module.metadata.key dans du code générique.",
    target: "Remonter vers metadata + moteur runtime générique.",
  },
  {
    key: "module-key-conditional",
    regex: /moduleKey\s*(===|!==)\s*["'`][^"'`]+["'`]/g,
    severity: "HIGH",
    message: "Condition directe sur moduleKey.",
    target: "Remonter vers metadata + moteur runtime générique.",
  },
  {
    key: "metadata-key-conditional",
    regex: /metadata\.key\s*(===|!==)\s*["'`][^"'`]+["'`]/g,
    severity: "HIGH",
    message: "Condition directe sur metadata.key.",
    target: "Remonter vers metadata + moteur runtime générique.",
  },
  {
    key: "hardcoded-business-module",
    regex: /\b(receptionsstockauto|lignescommandestockauto|commandesstockauto|mouvementsstockauto|facturesauto|interventionsauto|lignesinterventionauto|clientsauto|vehicules|encaissementsauto)\b/g,
    severity: "MEDIUM",
    message: "Nom de module métier codé en dur.",
    target: "Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.",
  },
  {
    key: "business-status-action-local",
    regex: /\b(getBusinessStatusAction|businessStatusAction|handleBusinessStatusAction)\b/g,
    severity: "HIGH",
    message: "Action métier probablement codée dans un composant générique.",
    target: "Remonter vers RuntimeActionEngine + module.actions metadata.",
  },
  {
    key: "manual-amount-calculation",
    regex: /\b(montantHT|montantTTC|prixUnitaireHT|quantiteCommandee|tauxTVA)\b/g,
    severity: "INFO",
    message: "Calcul financier ou champ montant détecté.",
    target: "Vérifier si le calcul passe par RuntimeComputedFieldsEngine.",
  },
];

const sensitiveGenericFiles = [
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  "src/components/erp/forms/enterprise/ERPFormField.tsx",
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx",
  "src/runtime/actions/RuntimeActionEngine.ts",
  "src/runtime/firestore/FirestoreRuntimeMutation.ts",
  "src/runtime/business-rules/runtimeBusinessRules.ts",
  "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts",
  "src/runtime/status/RuntimeStatusGovernanceEngine.ts",
];

function walk(dir) {
  const full = path.join(ROOT, dir);

  if (!fs.existsSync(full)) {
    return [];
  }

  const entries = fs.readdirSync(full, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(full, entry.name);
    const relPath = path.relative(ROOT, fullPath).replaceAll("\\", "/");

    if (entry.isDirectory()) {
      if (
        relPath.includes("/node_modules/") ||
        relPath.includes("/.next/") ||
        relPath.includes("/dist/")
      ) {
        continue;
      }

      files.push(...walk(relPath));
      continue;
    }

    if (!entry.isFile()) continue;

    if (!/\.(ts|tsx|js|jsx)$/.test(entry.name)) continue;
    if (entry.name.includes(".bak")) continue;

    files.push(relPath);
  }

  return files;
}

function isAllowedMetadataFile(relPath) {
  return allowedMetadataDirs.some((dir) => relPath.startsWith(dir + "/"));
}

function getLineNumber(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function getLine(content, lineNumber) {
  return content.split(/\r?\n/)[lineNumber - 1] ?? "";
}

function classifyFinding(relPath, pattern) {
  if (isAllowedMetadataFile(relPath)) {
    return {
      severity: "OK_METADATA",
      action: "Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.",
    };
  }

  if (relPath.startsWith("src/app/")) {
    return {
      severity: pattern.severity === "INFO" ? "INFO" : "HIGH",
      action: "Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.",
    };
  }

  if (sensitiveGenericFiles.includes(relPath)) {
    return {
      severity: pattern.severity,
      action: pattern.target,
    };
  }

  if (relPath.startsWith("src/runtime/")) {
    return {
      severity: pattern.severity === "HIGH" ? "MEDIUM" : pattern.severity,
      action: "Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.",
    };
  }

  return {
    severity: pattern.severity,
    action: pattern.target,
  };
}

function main() {
  const files = Array.from(
    new Set(scanDirs.flatMap((dir) => walk(dir)))
  ).sort();

  const findings = [];

  for (const relPath of files) {
    const fullPath = path.join(ROOT, relPath);
    const content = fs.readFileSync(fullPath, "utf8");

    for (const pattern of suspiciousPatterns) {
      let match;

      pattern.regex.lastIndex = 0;

      while ((match = pattern.regex.exec(content)) !== null) {
        const line = getLineNumber(content, match.index);
        const lineText = getLine(content, line).trim();
        const classification = classifyFinding(relPath, pattern);

        findings.push({
          file: relPath,
          line,
          key: pattern.key,
          severity: classification.severity,
          match: match[0],
          code: lineText,
          message: pattern.message,
          action: classification.action,
        });
      }
    }
  }

  const reportDir = path.join(ROOT, "reports");
  fs.mkdirSync(reportDir, { recursive: true });

  const jsonPath = path.join(reportDir, "audit-local-logic.json");
  const mdPath = path.join(reportDir, "audit-local-logic.md");

  fs.writeFileSync(jsonPath, JSON.stringify(findings, null, 2), "utf8");

  const grouped = findings.reduce((acc, finding) => {
    acc[finding.severity] = acc[finding.severity] ?? [];
    acc[finding.severity].push(finding);
    return acc;
  }, {});

  const severityOrder = ["HIGH", "MEDIUM", "INFO", "OK_METADATA"];

  const md = [
    "# Audit local logic / ERP generic compliance",
    "",
    `Date: ${new Date().toISOString()}`,
    "",
    "## Synthèse",
    "",
    ...severityOrder.map(
      (severity) => `- ${severity}: ${(grouped[severity] ?? []).length}`
    ),
    "",
    "## Règle",
    "",
    "Aucune logique métier locale ne doit être ajoutée dans les composants génériques, les pages ou les formulaires.",
    "Toute logique doit passer par metadata + moteur runtime générique, sauf exception temporaire documentée.",
    "",
    "## Résultats",
    "",
    ...severityOrder.flatMap((severity) => {
      const items = grouped[severity] ?? [];

      if (items.length === 0) return [];

      return [
        `### ${severity}`,
        "",
        ...items.flatMap((finding) => [
          `#### ${finding.file}:${finding.line}`,
          "",
          `- Type: ${finding.key}`,
          `- Match: \`${finding.match}\``,
          `- Code: \`${finding.code.replaceAll("`", "'")}\``,
          `- Diagnostic: ${finding.message}`,
          `- Action cible: ${finding.action}`,
          "",
        ]),
      ];
    }),
  ].join("\n");

  fs.writeFileSync(mdPath, md, "utf8");

  const highCount = (grouped.HIGH ?? []).length;
  const mediumCount = (grouped.MEDIUM ?? []).length;

  console.log("");
  console.log("[Q21X_AUDIT_LOCAL_LOGIC]");
  console.log(`Files scanned: ${files.length}`);
  console.log(`Findings: ${findings.length}`);
  console.log(`HIGH: ${highCount}`);
  console.log(`MEDIUM: ${mediumCount}`);
  console.log("");
  console.log(`[REPORT] ${path.relative(ROOT, mdPath)}`);
  console.log(`[JSON]   ${path.relative(ROOT, jsonPath)}`);
  console.log("");
  console.log("Mode: REPORT ONLY. This audit does not block commits yet.");
}

main();