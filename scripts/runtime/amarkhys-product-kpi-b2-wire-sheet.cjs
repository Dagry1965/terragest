const fs = require("fs");
const path = require("path");

const root = process.cwd();

const sheetPath = path.join(root, "src/components/erp/hub/ERPProductStockOperationalSheet.tsx");
const reportPath = path.join(root, "docs/audits/AMARKHYS-PRODUCT-KPI-B2.md");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function fail(message) {
  throw new Error(message);
}

let content = read(sheetPath);

write(sheetPath + ".bak-product-kpi-b2", content);

/**
 * 1. Importer RuntimeProductKpiEngine.
 */
if (!content.includes('import { RuntimeProductKpiEngine } from "@/runtime/kpi/RuntimeProductKpiEngine";')) {
  content = content.replace(
    'import type { ReactNode } from "react";',
    'import type { ReactNode } from "react";\nimport { RuntimeProductKpiEngine } from "@/runtime/kpi/RuntimeProductKpiEngine";'
  );
}

/**
 * 2. Remplacer uniquement le corps de productOperationalSummary,
 * sans modifier l’appel ni le rendu visuel.
 */
const functionStart = content.indexOf("function productOperationalSummary({");

if (functionStart < 0) {
  fail("Fonction productOperationalSummary introuvable.");
}

let depth = 0;
let started = false;
let functionEnd = -1;

for (let i = functionStart; i < content.length; i += 1) {
  const char = content[i];

  if (char === "{") {
    depth += 1;
    started = true;
  }

  if (char === "}") {
    depth -= 1;

    if (started && depth === 0) {
      functionEnd = i + 1;
      break;
    }
  }
}

if (functionEnd < 0) {
  fail("Fin de productOperationalSummary introuvable.");
}

const newFunction = `function productOperationalSummary({
  rootRecord,
  stocks,
  mouvements,
}: {
  rootRecord: ERPRecordHubRecord | null;
  stocks: ERPRecordHubRecord[];
  mouvements: ERPRecordHubRecord[];
}) {
  return RuntimeProductKpiEngine.compute({
    rootRecord,
    stocks,
    mouvements,
    orderLineDeliveryItems: orderLineDeliveryItems(rootRecord),
  });
}`;

content = content.slice(0, functionStart) + newFunction + content.slice(functionEnd);

/**
 * 3. Vérifications ciblées.
 */
const checks = [
  ["engine import", content.includes('import { RuntimeProductKpiEngine } from "@/runtime/kpi/RuntimeProductKpiEngine";')],
  ["delegates to engine", content.includes("RuntimeProductKpiEngine.compute")],
  ["summary component kept", content.includes("function ProductOperationalSummary(")],
  ["Approvisionnement card kept", content.includes('title="Approvisionnement"')],
  ["Stock card kept", content.includes('title="Stock"')],
  ["Atelier card kept", content.includes('title="Atelier"')],
  ["Performance card kept", content.includes('title="Performance"')],
  ["product search kept", content.includes('id="product-hub-search"')],
];

console.table(checks.map(([label, ok]) => ({ label, ok })));

const failed = checks.filter(([, ok]) => !ok);

if (failed.length > 0) {
  fail("Vérifications échouées.");
}

write(sheetPath, content);

write(
  reportPath,
  [
    "# AMARKHYS-PRODUCT-KPI-B2",
    "",
    "## Objectif",
    "",
    "Brancher la fiche produit opérationnelle sur RuntimeProductKpiEngine sans changer le rendu visuel.",
    "",
    "## Correction",
    "",
    "- Import de RuntimeProductKpiEngine.",
    "- productOperationalSummary délègue maintenant à RuntimeProductKpiEngine.compute().",
    "- Les cartes existantes restent inchangées : Approvisionnement, Stock, Atelier, Performance.",
    "- La recherche produit en en-tête reste inchangée.",
    "",
    "## Hors périmètre",
    "",
    "- Aucun changement loader.",
    "- Aucun changement moteur stock.",
    "- Aucun changement mutation stock.",
    "- Aucun dashboard global produits.",
    "",
  ].join("\n")
);

console.log("[OK] AMARKHYS-PRODUCT-KPI-B2 applied");