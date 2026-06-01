const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  lignes: "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  produits: "src/runtime/modules/generated/produitsauto/produitsauto.module.ts",
  stocks: "src/runtime/modules/generated/stocksauto/stocksauto.module.ts",
  formField: "src/components/erp/forms/enterprise/ERPFormField.tsx",
  enterpriseForm: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  formTabs: "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
  relationFilterEngine: "src/runtime/relations/RuntimeRelationFilterEngine.ts",
  relationDataLoader: "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-07C-A-audit-line-relation-filters.md";
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

function hits(content, patterns) {
  const lines = content.split(/\r?\n/);
  const found = [];

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (line.includes(pattern)) {
        found.push({
          pattern,
          line: index + 1,
          text: line.trim().slice(0, 260),
        });
      }
    }
  });

  return found;
}

const lignes = read(files.lignes);
const produits = read(files.produits);
const stocks = read(files.stocks);
const formField = read(files.formField);
const enterpriseForm = read(files.enterpriseForm);
const formTabs = read(files.formTabs);
const relationFilterEngine = read(files.relationFilterEngine);
const relationDataLoader = read(files.relationDataLoader);

const typeArticleBlock =
  extractObjectBlock(lignes, 'key: "typeArticle"') ||
  extractObjectBlock(lignes, 'key: "typeLigne"') ||
  extractObjectBlock(lignes, 'key: "categorieArticle"');

const produitIdBlock = extractObjectBlock(lignes, 'key: "produitId"');
const stockIdBlock = extractObjectBlock(lignes, 'key: "stockId"');

const checks = [
  {
    group: "Module lignes",
    label: "champ typeArticle/typeLigne présent",
    ok:
      lignes.includes('key: "typeArticle"') ||
      lignes.includes('key: "typeLigne"') ||
      lignes.includes('key: "categorieArticle"'),
  },
  {
    group: "Module lignes",
    label: "produitId présent",
    ok: produitIdBlock.includes('key: "produitId"'),
  },
  {
    group: "Module lignes",
    label: "produitId pointe vers produitsauto",
    ok: produitIdBlock.includes('module: "produitsauto"'),
  },
  {
    group: "Module lignes",
    label: "produitId filtré par typeArticle/typeLigne",
    ok:
      produitIdBlock.includes("dependsOn") ||
      produitIdBlock.includes("typeArticle") ||
      produitIdBlock.includes("typeLigne") ||
      produitIdBlock.includes("filter") ||
      produitIdBlock.includes("criteria") ||
      lignes.includes("relationFilters"),
  },
  {
    group: "Module lignes",
    label: "stockId présent",
    ok: stockIdBlock.includes('key: "stockId"'),
  },
  {
    group: "Module lignes",
    label: "stockId pointe vers stocksauto",
    ok: stockIdBlock.includes('module: "stocksauto"'),
  },
  {
    group: "Module lignes",
    label: "stockId dépend de produitId",
    ok:
      stockIdBlock.includes('dependsOn: "produitId"') ||
      stockIdBlock.includes("produitId") ||
      stockIdBlock.includes("filter") ||
      stockIdBlock.includes("criteria"),
  },

  {
    group: "Module produits",
    label: "produitsauto possède typeArticle/typeLigne/type",
    ok:
      produits.includes('key: "typeArticle"') ||
      produits.includes('key: "typeLigne"') ||
      produits.includes('key: "type"') ||
      produits.includes('key: "categorie"'),
  },
  {
    group: "Module stocks",
    label: "stocksauto possède produitId",
    ok: stocks.includes('key: "produitId"'),
  },

  {
    group: "Runtime générique",
    label: "RuntimeRelationFilterEngine existe",
    ok: exists(files.relationFilterEngine) && relationFilterEngine.includes("RuntimeRelationFilterEngine"),
  },
  {
    group: "Runtime générique",
    label: "ERPFormField utilise moteur relation/filter",
    ok:
      formField.includes("RuntimeRelationFilterEngine") ||
      formField.includes("relationFilter") ||
      formField.includes("dependsOn") ||
      formField.includes("criteria"),
  },
  {
    group: "Runtime générique",
    label: "ERPEnterpriseForm propage formValues",
    ok:
      enterpriseForm.includes("formValues") &&
      (enterpriseForm.includes("ERPFormField") || enterpriseForm.includes("field")),
  },
  {
    group: "Runtime générique",
    label: "ERPFormTabs propage formValues",
    ok:
      formTabs.includes("formValues") ||
      formTabs.includes("onFieldChange") ||
      formTabs.includes("values"),
  },
  {
    group: "Runtime générique",
    label: "RelationDataLoader existe",
    ok: exists(files.relationDataLoader) && relationDataLoader.includes("ERPRelationDataLoader"),
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

report.push("# AMARKHYS-REBUILD-07C-A — Audit relation filters lignes intervention");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Objectif");
report.push("");
report.push("Auditer la chaîne générique typeArticle/typeLigne -> produitId -> stockId.");
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

report.push("## Blocs lignesinterventionauto");
report.push("");
report.push("### typeArticle/typeLigne");
report.push("");
report.push(typeArticleBlock || "- Non trouvé.");
report.push("");
report.push("### produitId");
report.push("");
report.push(produitIdBlock || "- Non trouvé.");
report.push("");
report.push("### stockId");
report.push("");
report.push(stockIdBlock || "- Non trouvé.");
report.push("");

const patterns = [
  "typeArticle",
  "typeLigne",
  "categorieArticle",
  "produitId",
  "stockId",
  "dependsOn",
  "relationFilters",
  "filter",
  "criteria",
  "RuntimeRelationFilterEngine",
  "ERPRelationDataLoader",
  "formValues",
];

function writeHits(title, rel, content) {
  report.push(`## Hits ${title} — ${rel}`);
  report.push("");
  const found = hits(content, patterns);
  if (!found.length) {
    report.push("- Aucun hit.");
  } else {
    for (const hit of found) {
      report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
    }
  }
  report.push("");
}

writeHits("lignes", files.lignes, lignes);
writeHits("produits", files.produits, produits);
writeHits("stocks", files.stocks, stocks);
writeHits("ERPFormField", files.formField, formField);
writeHits("ERPEnterpriseForm", files.enterpriseForm, enterpriseForm);
writeHits("ERPFormTabs", files.formTabs, formTabs);
writeHits("RuntimeRelationFilterEngine", files.relationFilterEngine, relationFilterEngine);

report.push("## Lecture attendue");
report.push("");
report.push("- Si le moteur générique existe, le renforcer ou l'utiliser, pas créer un filtre local.");
report.push("- produitId doit dépendre de typeArticle/typeLigne.");
report.push("- stockId doit dépendre de produitId.");
report.push("- Le cycle attendu est refresh -> rebuild criteria -> replace options.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-07C-A] Audit line relation filters");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);
console.log("[NEXT] Extract FAILs and generic filter hits.");