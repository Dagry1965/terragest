const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const inputPath = path.join(ROOT, "reports/audit-local-logic.json");
const outputJsonPath = path.join(ROOT, "reports/audit-local-logic-classified.json");
const outputMdPath = path.join(ROOT, "reports/audit-local-logic-classified.md");

if (!fs.existsSync(inputPath)) {
  console.error("[ERROR] Missing reports/audit-local-logic.json");
  console.error("Run first: pnpm audit:local");
  process.exit(1);
}

const findings = JSON.parse(fs.readFileSync(inputPath, "utf8"));

const criticalGenericFiles = [
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  "src/components/erp/forms/enterprise/ERPFormField.tsx",
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx",
];

const runtimeEngineFiles = [
  "src/runtime/actions/RuntimeActionEngine.ts",
  "src/runtime/business-rules/runtimeBusinessRules.ts",
  "src/runtime/firestore/FirestoreRuntimeMutation.ts",
  "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts",
  "src/runtime/status/RuntimeStatusGovernanceEngine.ts",
  "src/runtime/stock/RuntimeStockMovementService.ts",
];

function classify(finding) {
  const file = String(finding.file ?? "");
  const key = String(finding.key ?? "");
  const code = String(finding.code ?? "");

  if (file.startsWith("src/runtime/modules/generated/")) {
    return {
      category: "MODULE_METADATA_OK",
      priority: "P4",
      recommendation:
        "Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.",
      targetEngine: "Module metadata / schema",
    };
  }

  if (criticalGenericFiles.includes(file)) {
    return {
      category: "CRITICAL_GENERIC_COMPONENT",
      priority: "P1",
      recommendation:
        "À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.",
      targetEngine:
        "RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine",
    };
  }

  if (runtimeEngineFiles.includes(file)) {
    return {
      category: "RUNTIME_ENGINE_TO_GENERALIZE",
      priority: "P2",
      recommendation:
        "Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.",
      targetEngine: "Runtime engine générique",
    };
  }

  if (file.startsWith("src/app/")) {
    return {
      category: "PAGE_SHOULD_BE_THIN",
      priority: "P1",
      recommendation:
        "Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.",
      targetEngine: "GenericPage / ModuleRegistry / RuntimePage",
    };
  }

  if (
    key === "manual-amount-calculation" &&
    !criticalGenericFiles.includes(file)
  ) {
    return {
      category: "FALSE_POSITIVE_OR_LOW",
      priority: "P5",
      recommendation:
        "Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.",
      targetEngine: "RuntimeComputedFieldsEngine",
    };
  }

  if (code.includes("routes") || code.includes("href")) {
    return {
      category: "FALSE_POSITIVE_OR_LOW",
      priority: "P5",
      recommendation:
        "Probable usage navigation/route. À vérifier, mais pas prioritaire.",
      targetEngine: "Navigation metadata",
    };
  }

  return {
    category: "TO_REVIEW",
    priority: "P3",
    recommendation:
      "À examiner manuellement pour décider s’il faut généraliser ou documenter.",
    targetEngine: "À déterminer",
  };
}

const classified = findings.map((finding) => ({
  ...finding,
  ...classify(finding),
}));

const groups = classified.reduce((acc, item) => {
  acc[item.category] = acc[item.category] ?? [];
  acc[item.category].push(item);
  return acc;
}, {});

const priorityOrder = [
  "CRITICAL_GENERIC_COMPONENT",
  "PAGE_SHOULD_BE_THIN",
  "RUNTIME_ENGINE_TO_GENERALIZE",
  "TO_REVIEW",
  "MODULE_METADATA_OK",
  "FALSE_POSITIVE_OR_LOW",
];

fs.writeFileSync(outputJsonPath, JSON.stringify(classified, null, 2), "utf8");

const md = [
  "# Q21X-B — Classification audit local logic",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Synthèse",
  "",
  ...priorityOrder.map(
    (category) => `- ${category}: ${(groups[category] ?? []).length}`
  ),
  "",
  "## Priorité immédiate",
  "",
  "Traiter d’abord les catégories P1 :",
  "",
  "- CRITICAL_GENERIC_COMPONENT",
  "- PAGE_SHOULD_BE_THIN",
  "",
  "Ne pas corriger les 897 résultats un par un. Remonter les répétitions vers des moteurs génériques.",
  "",
  "## Résultats classifiés",
  "",
  ...priorityOrder.flatMap((category) => {
    const items = groups[category] ?? [];
    if (items.length === 0) return [];

    return [
      `## ${category}`,
      "",
      ...items.slice(0, 80).flatMap((item) => [
        `### ${item.file}:${item.line}`,
        "",
        `- Priorité: ${item.priority}`,
        `- Type audit: ${item.key}`,
        `- Match: \`${String(item.match ?? "").replaceAll("`", "'")}\``,
        `- Code: \`${String(item.code ?? "").replaceAll("`", "'")}\``,
        `- Recommandation: ${item.recommendation}`,
        `- Moteur cible: ${item.targetEngine}`,
        "",
      ]),
      items.length > 80
        ? `> ${items.length - 80} autres entrées masquées dans ce rapport Markdown. Voir JSON complet.`
        : "",
      "",
    ];
  }),
].join("\n");

fs.writeFileSync(outputMdPath, md, "utf8");

console.log("");
console.log("[Q21X_B_CLASSIFICATION]");
console.log(`Input findings: ${findings.length}`);
for (const category of priorityOrder) {
  console.log(`${category}: ${(groups[category] ?? []).length}`);
}
console.log("");
console.log(`[REPORT] ${path.relative(ROOT, outputMdPath)}`);
console.log(`[JSON]   ${path.relative(ROOT, outputJsonPath)}`);
console.log("");
console.log("Next:");
console.log("  notepad reports/audit-local-logic-classified.md");