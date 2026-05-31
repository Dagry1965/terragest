const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-07B-fix-lignesinterventionauto-fails.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-07b-fix-lignesinterventionauto-fails";
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

function findFieldBlock(source, key) {
  const marker = `key: "${key}"`;
  const keyIndex = source.indexOf(marker);

  if (keyIndex === -1) return null;

  const blockStart = source.lastIndexOf("{", keyIndex);
  if (blockStart === -1) fail("Cannot find field start for " + key);

  const blockEnd = findMatchingBrace(source, blockStart);
  if (blockEnd === -1) fail("Cannot find field end for " + key);

  let endWithComma = blockEnd + 1;
  if (source.slice(endWithComma, endWithComma + 1) === ",") {
    endWithComma++;
  }

  return {
    blockStart,
    blockEnd,
    endWithComma,
    block: source.slice(blockStart, blockEnd + 1),
  };
}

function replaceFieldBlock(source, key, mutateBlock) {
  const found = findFieldBlock(source, key);
  if (!found) return source;

  const next = mutateBlock(found.block);
  return source.slice(0, found.blockStart) + next + source.slice(found.blockEnd + 1);
}

function insertAfterField(source, afterKey, fieldBlock) {
  const found = findFieldBlock(source, afterKey);
  if (!found) fail("Cannot find field to insert after: " + afterKey);

  return source.slice(0, found.endWithComma) + "\n" + fieldBlock + source.slice(found.endWithComma);
}

function ensureReadOnlyField(source, field) {
  const idx = source.indexOf("readOnlyFields: [");
  if (idx === -1) return source;

  const end = source.indexOf("]", idx);
  if (end === -1) return source;

  const block = source.slice(idx, end);
  if (block.includes(`"${field}"`)) return source;

  return source.slice(0, end) + `      "${field}",\n` + source.slice(end);
}

// 1. stockId doit dépendre de produitId.
// Correction metadata générique minimale, compatible avec le moteur existant.
content = replaceFieldBlock(content, "stockId", (block) => {
  let next = block;

  if (!next.includes("dependsOn")) {
    next = next.replace(
      /relation:\s*\{\s*module:\s*"stocksauto"\s*\},/,
      `relation: { module: "stocksauto" },
        dependsOn: "produitId",`
    );
  }

  if (!next.includes("helperText")) {
    next = next.replace(
      /grid:\s*\{\s*cols:\s*6\s*\},/,
      `grid: { cols: 6 },
        helperText: "Stock source filtré selon le produit sélectionné.",`
    );
  }

  return next;
});

// 2. Champs techniques de retrait.
// Ils ne doivent pas être exposés comme statut utilisateur.
const technicalFields = [
  {
    key: "removedAt",
    block: `      {
        key: "removedAt",
        label: "Retirée le",
        type: "datetime",
        list: { visible: false },
        grid: { cols: 6 },
      },`,
  },
  {
    key: "removedBy",
    block: `      {
        key: "removedBy",
        label: "Retirée par",
        type: "text",
        list: { visible: false },
        grid: { cols: 6 },
      },`,
  },
  {
    key: "removedReason",
    block: `      {
        key: "removedReason",
        label: "Motif du retrait",
        type: "textarea",
        list: { visible: false },
        grid: { cols: 12 },
      },`,
  },
];

let insertAfter = "stockMovementId";

for (const field of technicalFields) {
  if (!content.includes(`key: "${field.key}"`)) {
    content = insertAfterField(content, insertAfter, field.block);
  }
  insertAfter = field.key;
}

// 3. Verrouiller les champs techniques.
[
  "removedAt",
  "removedBy",
  "removedReason",
].forEach((field) => {
  content = ensureReadOnlyField(content, field);
});

fs.writeFileSync(modulePath, content, "utf8");

const stockIdBlock = findFieldBlock(content, "stockId")?.block ?? "";
const readOnlyMatch = content.match(/readOnlyFields:\s*\[[\s\S]*?\]/);
const readOnlyBlock = readOnlyMatch ? readOnlyMatch[0] : "";

const checks = [
  {
    label: "stockId dépend de produitId",
    ok: stockIdBlock.includes('dependsOn: "produitId"'),
  },
  {
    label: "stockId conserve relation stocksauto",
    ok: stockIdBlock.includes('relation: { module: "stocksauto" }'),
  },
  {
    label: "removedAt présent",
    ok: content.includes('key: "removedAt"'),
  },
  {
    label: "removedBy présent",
    ok: content.includes('key: "removedBy"'),
  },
  {
    label: "removedReason présent",
    ok: content.includes('key: "removedReason"'),
  },
  {
    label: "champs techniques retrait verrouillés",
    ok:
      readOnlyBlock.includes('"removedAt"') &&
      readOnlyBlock.includes('"removedBy"') &&
      readOnlyBlock.includes('"removedReason"'),
  },
  {
    label: "statuts utilisateur restent brouillon / validee",
    ok:
      content.includes('"brouillon"') &&
      content.includes('"validee"') &&
      !content.includes('"facturee"') &&
      !content.includes('"annulee"'),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-07B — Fix lignesinterventionauto FAILs",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Corrections",
  "",
  "- Ajout de dependsOn: produitId sur stockId.",
  "- Ajout des champs techniques removedAt / removedBy / removedReason.",
  "- Verrouillage des champs techniques de retrait.",
  "- Conservation des statuts utilisateur brouillon / validée uniquement.",
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

console.log("[AMARKHYS-REBUILD-07B] Fix lignesinterventionauto FAILs");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-07B] DONE");
console.log("[NEXT] Rerun 07A audit, then build.");