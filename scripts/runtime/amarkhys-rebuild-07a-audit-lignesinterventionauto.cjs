const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  module: "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  actions: "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.actions.ts",
  interventionModule: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  productModule: "src/runtime/modules/generated/produitsauto/produitsauto.module.ts",
  stockModule: "src/runtime/modules/generated/stocksauto/stocksauto.module.ts",
  stockMovementService: "src/runtime/stock/RuntimeStockMovementService.ts",
  lineRemovalService: "src/runtime/line-items/RuntimeLineRemovalService.ts",
  actionEngine: "src/runtime/actions/RuntimeActionEngine.ts",
  businessRules: "src/runtime/business-rules/runtimeBusinessRules.ts",
  mutation: "src/runtime/firebase/FirestoreRuntimeMutation.ts",
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-07A-audit-lignesinterventionauto.md";
const reportPath = path.join(root, reportRel);

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function extractObjectBlock(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) return "";

  const start = source.lastIndexOf("{", markerIndex);
  if (start === -1) return "";

  let depth = 0;
  let quote = null;
  let escape = false;

  for (let i = start; i < source.length; i++) {
    const ch = source[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (ch === "\\") {
      escape = true;
      continue;
    }

    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }

    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }

  return "";
}

function lineHits(content, patterns) {
  const lines = content.split(/\r?\n/);
  const hits = [];

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (line.includes(pattern)) {
        hits.push({
          pattern,
          line: index + 1,
          text: line.trim().slice(0, 260),
        });
      }
    }
  });

  return hits;
}

const moduleContent = read(files.module);
const actionsContent = read(files.actions);
const interventionContent = read(files.interventionModule);
const productContent = read(files.productModule);
const stockContent = read(files.stockModule);
const stockMovementService = read(files.stockMovementService);
const lineRemovalService = read(files.lineRemovalService);
const actionEngine = read(files.actionEngine);
const businessRules = read(files.businessRules);
const mutation = read(files.mutation);
const form = read(files.form);

const statutBlock = extractObjectBlock(moduleContent, 'key: "statut"');
const interventionIdBlock = extractObjectBlock(moduleContent, 'key: "interventionId"');
const produitIdBlock = extractObjectBlock(moduleContent, 'key: "produitId"');
const stockIdBlock = extractObjectBlock(moduleContent, 'key: "stockId"');
const quantiteBlock = extractObjectBlock(moduleContent, 'key: "quantite"');
const prixBlock = extractObjectBlock(moduleContent, 'key: "prixUnitaireHT"');
const montantHTBlock = extractObjectBlock(moduleContent, 'key: "montantHT"');
const montantTTCBlock = extractObjectBlock(moduleContent, 'key: "montantTTC"');
const readOnlyMatch = moduleContent.match(/readOnlyFields:\s*\[[\s\S]*?\]/);
const readOnlyBlock = readOnlyMatch ? readOnlyMatch[0] : "";

const checks = [
  {
    group: "Fichiers",
    label: "lignesinterventionauto.module.ts existe",
    ok: exists(files.module),
  },
  {
    group: "Fichiers",
    label: "lignesinterventionauto.actions.ts existe",
    ok: exists(files.actions),
  },

  {
    group: "Statuts",
    label: "champ statut présent",
    ok: statutBlock.includes('key: "statut"'),
  },
  {
    group: "Statuts",
    label: "statuts utilisateur limités à brouillon / validée",
    ok:
      statutBlock.includes('"brouillon"') &&
      (statutBlock.includes('"validee"') || statutBlock.includes('"validée"')) &&
      !statutBlock.includes('"facturee"') &&
      !statutBlock.includes('"annulee"'),
  },
  {
    group: "Statuts",
    label: "guidance brouillon / validée possible",
    ok:
      moduleContent.includes("brouillon") &&
      (moduleContent.includes("validee") || moduleContent.includes("validée")),
  },

  {
    group: "Relations",
    label: "interventionId présent",
    ok: interventionIdBlock.includes('key: "interventionId"'),
  },
  {
    group: "Relations",
    label: "interventionId pointe vers interventionsauto",
    ok: interventionIdBlock.includes('relation: { module: "interventionsauto" }') || interventionIdBlock.includes('module: "interventionsauto"'),
  },
  {
    group: "Relations",
    label: "produitId présent",
    ok: produitIdBlock.includes('key: "produitId"'),
  },
  {
    group: "Relations",
    label: "produitId pointe vers produitsauto",
    ok: produitIdBlock.includes('relation: { module: "produitsauto" }') || produitIdBlock.includes('module: "produitsauto"'),
  },
  {
    group: "Relations",
    label: "stockId présent",
    ok: stockIdBlock.includes('key: "stockId"'),
  },
  {
    group: "Relations",
    label: "stockId pointe vers stocksauto",
    ok: stockIdBlock.includes('relation: { module: "stocksauto" }') || stockIdBlock.includes('module: "stocksauto"'),
  },
  {
    group: "Relations",
    label: "stockId filtré/dépendant du produit",
    ok:
      stockIdBlock.includes("dependsOn") ||
      stockIdBlock.includes("produitId") ||
      stockIdBlock.includes("filter") ||
      moduleContent.includes("relationFilters") ||
      moduleContent.includes("filterBy"),
  },

  {
    group: "Calculs",
    label: "quantite présent",
    ok: quantiteBlock.includes('key: "quantite"'),
  },
  {
    group: "Calculs",
    label: "prixUnitaireHT présent",
    ok: prixBlock.includes('key: "prixUnitaireHT"') || moduleContent.includes("prixUnitaire"),
  },
  {
    group: "Calculs",
    label: "montantHT présent",
    ok: montantHTBlock.includes('key: "montantHT"'),
  },
  {
    group: "Calculs",
    label: "montantTTC présent",
    ok: montantTTCBlock.includes('key: "montantTTC"'),
  },
  {
    group: "Calculs",
    label: "montants verrouillés ou calculés",
    ok:
      readOnlyBlock.includes('"montantHT"') ||
      readOnlyBlock.includes('"montantTTC"') ||
      moduleContent.includes("computed") ||
      businessRules.includes("lignesinterventionauto") ||
      mutation.includes("lignesinterventionauto"),
  },

  {
    group: "Stock",
    label: "RuntimeStockMovementService existe",
    ok: exists(files.stockMovementService) && stockMovementService.includes("RuntimeStockMovementService"),
  },
  {
    group: "Stock",
    label: "logique stock liée aux lignes intervention",
    ok:
      stockMovementService.includes("lignesinterventionauto") ||
      mutation.includes("lignesinterventionauto") ||
      businessRules.includes("lignesinterventionauto"),
  },
  {
    group: "Stock",
    label: "stock traité une seule fois / idempotence possible",
    ok:
      moduleContent.includes("stockMovementId") ||
      mutation.includes("stockMovementId") ||
      stockMovementService.includes("stockMovementId") ||
      stockMovementService.includes("processed"),
  },

  {
    group: "Retrait ligne",
    label: "RuntimeLineRemovalService existe",
    ok: exists(files.lineRemovalService) && lineRemovalService.includes("RuntimeLineRemovalService"),
  },
  {
    group: "Retrait ligne",
    label: "action retirer ligne présente",
    ok:
      actionsContent.includes("Retirer la ligne") ||
      moduleContent.includes("Retirer la ligne") ||
      moduleContent.includes("retirer-ligne"),
  },
  {
    group: "Retrait ligne",
    label: "action retirer ligne runtimeOnly ou contrôlée",
    ok:
      actionsContent.includes("runtimeOnly") ||
      moduleContent.includes("runtimeOnly") ||
      actionEngine.includes("runtimeOnly"),
  },
  {
    group: "Retrait ligne",
    label: "champs techniques removedAt/removedBy/removedReason présents",
    ok:
      moduleContent.includes("removedAt") &&
      moduleContent.includes("removedBy") &&
      moduleContent.includes("removedReason"),
  },

  {
    group: "Verrouillage",
    label: "interventionId verrouillé depuis parent",
    ok:
      readOnlyBlock.includes('"interventionId"') ||
      moduleContent.includes('lockFields: ["interventionId"') ||
      moduleContent.includes("lockedFields"),
  },
  {
    group: "Verrouillage",
    label: "pas de factureId / paiementId / encaissementId directs visibles",
    ok:
      !moduleContent.includes('key: "factureId"') &&
      !moduleContent.includes('key: "paiementId"') &&
      !moduleContent.includes('key: "encaissementId"'),
  },

  {
    group: "Parent intervention",
    label: "interventionsauto déclare lignesinterventionauto comme child",
    ok:
      interventionContent.includes('moduleKey: "lignesinterventionauto"') &&
      interventionContent.includes('foreignKey: "interventionId"'),
  },
  {
    group: "Form runtime",
    label: "ERPEnterpriseForm supporte readOnlyFields",
    ok: form.includes("readOnlyFields"),
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const grouped = checks.reduce((acc, check) => {
  acc[check.group] ||= [];
  acc[check.group].push(check);
  return acc;
}, {});

const report = [];

report.push("# AMARKHYS-REBUILD-07A — Audit lignesinterventionauto");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Objectif");
report.push("");
report.push("Auditer les lignes d'intervention : statuts, relations, calculs, stock, retrait, verrouillages et absence de facture/paiement direct.");
report.push("");
report.push("## Synthèse");
report.push("");
report.push(`- OK: ${okCount}`);
report.push(`- FAIL: ${failCount}`);
report.push("");
report.push("## Checks");
report.push("");

for (const [group, items] of Object.entries(grouped)) {
  report.push(`### ${group}`);
  report.push("");
  for (const item of items) {
    report.push(`- ${item.ok ? "OK" : "FAIL"} — ${item.label}`);
  }
  report.push("");
}

report.push("## Blocs clés");
report.push("");
report.push("### statut");
report.push("");
report.push(statutBlock || "- Non trouvé.");
report.push("");
report.push("### interventionId");
report.push("");
report.push(interventionIdBlock || "- Non trouvé.");
report.push("");
report.push("### produitId");
report.push("");
report.push(produitIdBlock || "- Non trouvé.");
report.push("");
report.push("### stockId");
report.push("");
report.push(stockIdBlock || "- Non trouvé.");
report.push("");
report.push("### readOnlyFields");
report.push("");
report.push(readOnlyBlock || "- Non trouvé.");
report.push("");

const patterns = [
  "statut",
  "brouillon",
  "validee",
  "validée",
  "facturee",
  "annulee",
  "interventionId",
  "produitId",
  "stockId",
  "quantite",
  "prixUnitaireHT",
  "montantHT",
  "montantTTC",
  "stockMovementId",
  "removedAt",
  "removedBy",
  "removedReason",
  "retirer-ligne",
  "Retirer la ligne",
  "runtimeOnly",
];

report.push("## Hits module/actions");
report.push("");
for (const hit of lineHits(moduleContent + "\n" + actionsContent, patterns)) {
  report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
}
report.push("");

report.push("## Lecture attendue");
report.push("");
report.push("- Corriger uniquement les FAIL.");
report.push("- Statuts visibles lignes : brouillon / validée.");
report.push("- Retrait ligne par action contrôlée, pas statut annulée utilisateur.");
report.push("- Stock traité par runtime, pas saisie directe désordonnée.");
report.push("- InterventionId verrouillé depuis parent.");
report.push("- Facture/paiement/encaissement absents des lignes.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-07A] Audit lignesinterventionauto");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.log("[NEXT] Extract FAILs and fix only those.");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-07A] DONE");