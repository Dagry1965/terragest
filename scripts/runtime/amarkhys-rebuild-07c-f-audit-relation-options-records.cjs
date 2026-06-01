const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  relationDataLoader: "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts",
  relationFilterEngine: "src/runtime/relations/RuntimeRelationFilterEngine.ts",
  formField: "src/components/erp/forms/enterprise/ERPFormField.tsx",
  lignes: "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  produits: "src/runtime/modules/generated/produitsauto/produitsauto.module.ts",
  stocks: "src/runtime/modules/generated/stocksauto/stocksauto.module.ts",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-07C-F-audit-relation-options-records.md";
const reportPath = path.join(root, reportRel);

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  const file = path.join(root, rel);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function hits(content, patterns) {
  const lines = content.split(/\r?\n/);
  const out = [];

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (line.includes(pattern)) {
        out.push({
          pattern,
          line: index + 1,
          text: line.trim().slice(0, 260),
        });
      }
    }
  });

  return out;
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

const relationDataLoader = read(files.relationDataLoader);
const relationFilterEngine = read(files.relationFilterEngine);
const formField = read(files.formField);
const lignes = read(files.lignes);
const produits = read(files.produits);
const stocks = read(files.stocks);

const produitIdBlock = extractObjectBlock(lignes, 'key: "produitId"');
const stockIdBlock = extractObjectBlock(lignes, 'key: "stockId"');
const productTypeBlock = extractObjectBlock(produits, 'key: "typeArticle"');
const stockProductBlock = extractObjectBlock(stocks, 'key: "produitId"');

const checks = [
  {
    group: "Loader",
    label: "ERPRelationDataLoader existe",
    ok: exists(files.relationDataLoader),
  },
  {
    group: "Loader",
    label: "ERPRelationDataLoader retourne record brut dans option",
    ok:
      relationDataLoader.includes("record:") ||
      relationDataLoader.includes("record,") ||
      relationDataLoader.includes("...record") ||
      relationDataLoader.includes("data:"),
  },
  {
    group: "Loader",
    label: "ERPRelationDataLoader conserve id",
    ok:
      relationDataLoader.includes("id:") ||
      relationDataLoader.includes(".id"),
  },

  {
    group: "Engine",
    label: "RuntimeRelationFilterEngine lit option.record",
    ok: relationFilterEngine.includes("option.record"),
  },
  {
    group: "Engine",
    label: "RuntimeRelationFilterEngine compare source/target",
    ok:
      relationFilterEngine.includes("sourceField") &&
      relationFilterEngine.includes("targetField") &&
      relationFilterEngine.includes("formValues"),
  },
  {
    group: "Engine",
    label: "RuntimeRelationFilterEngine normalise valeurs",
    ok:
      relationFilterEngine.includes("normalize") ||
      relationFilterEngine.includes("String("),
  },

  {
    group: "FormField",
    label: "ERPFormField map select avec safeFilteredOptions",
    ok: formField.includes("safeFilteredOptions.map"),
  },
  {
    group: "FormField",
    label: "ERPFormField utilise RuntimeRelationFilterEngine.apply",
    ok: formField.includes("RuntimeRelationFilterEngine.apply"),
  },

  {
    group: "Metadata",
    label: "produitId filterBy typeArticle -> typeArticle",
    ok:
      produitIdBlock.includes("filterBy") &&
      produitIdBlock.includes('sourceField: "typeArticle"') &&
      produitIdBlock.includes('targetField: "typeArticle"'),
  },
  {
    group: "Metadata",
    label: "stockId filterBy produitId -> produitId",
    ok:
      stockIdBlock.includes("filterBy") &&
      stockIdBlock.includes('sourceField: "produitId"') &&
      stockIdBlock.includes('targetField: "produitId"'),
  },
  {
    group: "Metadata",
    label: "produitsauto possède champ typeArticle",
    ok: productTypeBlock.includes('key: "typeArticle"'),
  },
  {
    group: "Metadata",
    label: "stocksauto possède champ produitId",
    ok: stockProductBlock.includes('key: "produitId"'),
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

report.push("# AMARKHYS-REBUILD-07C-F — Audit relation options records");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Objectif");
report.push("");
report.push("Vérifier si les options relationnelles contiennent le record brut nécessaire à RuntimeRelationFilterEngine.");
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

const patterns = [
  "record",
  "data",
  "id:",
  "label",
  "map",
  "return",
  "option.record",
  "sourceField",
  "targetField",
  "formValues",
  "safeFilteredOptions",
  "RuntimeRelationFilterEngine.apply",
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

writeHits("ERPRelationDataLoader", files.relationDataLoader, relationDataLoader);
writeHits("RuntimeRelationFilterEngine", files.relationFilterEngine, relationFilterEngine);
writeHits("ERPFormField", files.formField, formField);

report.push("## Blocs metadata");
report.push("");
report.push("### lignes.produitId");
report.push("");
report.push(produitIdBlock || "- Non trouvé.");
report.push("");
report.push("### lignes.stockId");
report.push("");
report.push(stockIdBlock || "- Non trouvé.");
report.push("");
report.push("### produits.typeArticle");
report.push("");
report.push(productTypeBlock || "- Non trouvé.");
report.push("");
report.push("### stocks.produitId");
report.push("");
report.push(stockProductBlock || "- Non trouvé.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-07C-F] Audit relation options records");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.log("[NEXT] Extract FAILs and fix generic loader/filter only.");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-07C-F] DONE");
console.log("[NEXT] If UI still KO, inspect actual data values in Firestore.");