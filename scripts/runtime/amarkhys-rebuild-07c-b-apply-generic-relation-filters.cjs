const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-07C-B-apply-generic-relation-filters.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-07c-b-generic-relation-filters";
fs.copyFileSync(modulePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(modulePath, "utf8");
const before = content;

function findMatchingBrace(source, openIndex) {
  let depth = 0;
  let quote = null;
  let escape = false;

  for (let i = openIndex; i < source.length; i++) {
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
      if (depth === 0) return i;
    }
  }

  return -1;
}

function replaceFieldBlock(source, key, mutateBlock) {
  const marker = `key: "${key}"`;
  const keyIndex = source.indexOf(marker);
  if (keyIndex === -1) {
    fail("Missing field: " + key);
  }

  const blockStart = source.lastIndexOf("{", keyIndex);
  if (blockStart === -1) {
    fail("Cannot find field start for " + key);
  }

  const blockEnd = findMatchingBrace(source, blockStart);
  if (blockEnd === -1) {
    fail("Cannot find field end for " + key);
  }

  const block = source.slice(blockStart, blockEnd + 1);
  const next = mutateBlock(block);

  return source.slice(0, blockStart) + next + source.slice(blockEnd + 1);
}

function setRelationFilter(block, moduleName, sourceField, targetField) {
  let next = block;

  const relationRegex = new RegExp(
    `relation:\\s*\\{\\s*module:\\s*"${moduleName}"[\\s\\S]*?\\}`,
    "m"
  );

  const relationMatch = next.match(relationRegex);

  if (!relationMatch) {
    fail("Cannot find relation block for " + moduleName);
  }

  const replacement = `relation: {
    module: "${moduleName}",
    filterBy: {
      sourceField: "${sourceField}",
      targetField: "${targetField}",
    },
  }`;

  next = next.replace(relationRegex, replacement);

  return next;
}

// 1. produitId doit être filtré par typeArticle.
content = replaceFieldBlock(content, "produitId", (block) => {
  let next = setRelationFilter(block, "produitsauto", "typeArticle", "typeArticle");

  if (!next.includes('dependsOn: "typeArticle"')) {
    next = next.replace(
      /relation:\s*\{[\s\S]*?\},/,
      (match) => `${match}
  dependsOn: "typeArticle",`
    );
  }

  if (!next.includes("Produit filtré")) {
    next = next.replace(
      /searchable:\s*true,?/,
      `searchable: true,
  helperText: "Produit filtré selon le type d’article sélectionné.",`
    );
  }

  return next;
});

// 2. stockId doit être filtré par produitId.
content = replaceFieldBlock(content, "stockId", (block) => {
  let next = setRelationFilter(block, "stocksauto", "produitId", "produitId");

  if (!next.includes('dependsOn: "produitId"')) {
    next = next.replace(
      /relation:\s*\{[\s\S]*?\},/,
      (match) => `${match}
  dependsOn: "produitId",`
    );
  }

  return next;
});

fs.writeFileSync(modulePath, content, "utf8");

function getFieldBlock(source, key) {
  const marker = `key: "${key}"`;
  const keyIndex = source.indexOf(marker);
  if (keyIndex === -1) return "";

  const blockStart = source.lastIndexOf("{", keyIndex);
  const blockEnd = findMatchingBrace(source, blockStart);
  return blockEnd === -1 ? "" : source.slice(blockStart, blockEnd + 1);
}

const produitIdBlock = getFieldBlock(content, "produitId");
const stockIdBlock = getFieldBlock(content, "stockId");

const checks = [
  {
    label: "produitId relation produitsauto conservée",
    ok: produitIdBlock.includes('module: "produitsauto"'),
  },
  {
    label: "produitId filtré par typeArticle",
    ok:
      produitIdBlock.includes("filterBy") &&
      produitIdBlock.includes('sourceField: "typeArticle"') &&
      produitIdBlock.includes('targetField: "typeArticle"'),
  },
  {
    label: "produitId dependsOn typeArticle",
    ok: produitIdBlock.includes('dependsOn: "typeArticle"'),
  },
  {
    label: "stockId relation stocksauto conservée",
    ok: stockIdBlock.includes('module: "stocksauto"'),
  },
  {
    label: "stockId filtré par produitId",
    ok:
      stockIdBlock.includes("filterBy") &&
      stockIdBlock.includes('sourceField: "produitId"') &&
      stockIdBlock.includes('targetField: "produitId"'),
  },
  {
    label: "stockId dependsOn produitId",
    ok: stockIdBlock.includes('dependsOn: "produitId"'),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-07C-B — Apply generic relation filters",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Correction",
  "",
  "- produitId utilise relation.filterBy typeArticle -> typeArticle.",
  "- stockId utilise relation.filterBy produitId -> produitId.",
  "- dependsOn est conservé pour déclencher le reset/refresh générique.",
  "",
  "## Règle générique",
  "",
  "- typeArticle sélectionné filtre les produits.",
  "- produit sélectionné filtre les stocks.",
  "- Le moteur générique RuntimeRelationFilterEngine applique les critères.",
  "",
  "## Checks",
  "",
  ...checks.map((c) => `- ${c.ok ? "OK" : "FAIL"} — ${c.label}`),
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-07C-B] Apply generic relation filters");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-07C-B] DONE");
console.log("[NEXT] Rerun audit, build, UI check.");