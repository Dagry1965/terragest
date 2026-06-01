const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  lignes: "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  produits: "src/runtime/modules/generated/produitsauto/produitsauto.module.ts",
  stocks: "src/runtime/modules/generated/stocksauto/stocksauto.module.ts",
  filterEngine: "src/runtime/relations/RuntimeRelationFilterEngine.ts",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-07C-G-audit-filter-values-contract.md";
const reportPath = path.join(root, reportRel);

function read(rel) {
  const file = path.join(root, rel);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
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

function extractValues(block) {
  const values = [];
  const regex = /value:\s*"([^"]+)"/g;
  let match;

  while ((match = regex.exec(block))) {
    values.push(match[1]);
  }

  return Array.from(new Set(values));
}

const lignes = read(files.lignes);
const produits = read(files.produits);
const stocks = read(files.stocks);
const filterEngine = read(files.filterEngine);

const ligneTypeArticleBlock = extractObjectBlock(lignes, 'key: "typeArticle"');
const produitTypeArticleBlock = extractObjectBlock(produits, 'key: "typeArticle"');
const ligneProduitIdBlock = extractObjectBlock(lignes, 'key: "produitId"');
const ligneStockIdBlock = extractObjectBlock(lignes, 'key: "stockId"');
const stockProduitIdBlock = extractObjectBlock(stocks, 'key: "produitId"');

const ligneTypeValues = extractValues(ligneTypeArticleBlock);
const produitTypeValues = extractValues(produitTypeArticleBlock);

const missingInProduits = ligneTypeValues.filter((value) => !produitTypeValues.includes(value));
const missingInLignes = produitTypeValues.filter((value) => !ligneTypeValues.includes(value));

const checks = [
  {
    label: "lignes.typeArticle existe",
    ok: Boolean(ligneTypeArticleBlock),
  },
  {
    label: "produits.typeArticle existe",
    ok: Boolean(produitTypeArticleBlock),
  },
  {
    label: "valeurs typeArticle lignes non vides",
    ok: ligneTypeValues.length > 0,
  },
  {
    label: "valeurs typeArticle produits non vides",
    ok: produitTypeValues.length > 0,
  },
  {
    label: "valeurs lignes couvertes par produits",
    ok: missingInProduits.length === 0,
  },
  {
    label: "valeurs produits couvertes par lignes",
    ok: missingInLignes.length === 0,
  },
  {
    label: "produitId filterBy typeArticle exact",
    ok:
      ligneProduitIdBlock.includes('sourceField: "typeArticle"') &&
      ligneProduitIdBlock.includes('targetField: "typeArticle"'),
  },
  {
    label: "stockId filterBy produitId exact",
    ok:
      ligneStockIdBlock.includes('sourceField: "produitId"') &&
      ligneStockIdBlock.includes('targetField: "produitId"'),
  },
  {
    label: "stocks.produitId existe",
    ok: Boolean(stockProduitIdBlock),
  },
  {
    label: "filter engine compare en string normalisé",
    ok:
      filterEngine.includes("normalizeRelationValue") &&
      filterEngine.includes("option.record") &&
      filterEngine.includes("formValues"),
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-07C-G — Audit filter values contract",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
  "## Valeurs typeArticle",
  "",
  `- lignes.typeArticle values: ${JSON.stringify(ligneTypeValues)}`,
  `- produits.typeArticle values: ${JSON.stringify(produitTypeValues)}`,
  `- valeurs lignes absentes dans produits: ${JSON.stringify(missingInProduits)}`,
  `- valeurs produits absentes dans lignes: ${JSON.stringify(missingInLignes)}`,
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- ${check.ok ? "OK" : "FAIL"} — ${check.label}`),
  "",
  "## Blocs clés",
  "",
  "### lignes.typeArticle",
  "",
  ligneTypeArticleBlock || "- Non trouvé.",
  "",
  "### produits.typeArticle",
  "",
  produitTypeArticleBlock || "- Non trouvé.",
  "",
  "### lignes.produitId",
  "",
  ligneProduitIdBlock || "- Non trouvé.",
  "",
  "### lignes.stockId",
  "",
  ligneStockIdBlock || "- Non trouvé.",
  "",
  "### stocks.produitId",
  "",
  stockProduitIdBlock || "- Non trouvé.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-07C-G] Audit filter values contract");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);
console.log("[LIGNES_TYPE_VALUES]", JSON.stringify(ligneTypeValues));
console.log("[PRODUITS_TYPE_VALUES]", JSON.stringify(produitTypeValues));
console.log("[MISSING_IN_PRODUITS]", JSON.stringify(missingInProduits));
console.log("[MISSING_IN_LIGNES]", JSON.stringify(missingInLignes));

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-07C-G] DONE");