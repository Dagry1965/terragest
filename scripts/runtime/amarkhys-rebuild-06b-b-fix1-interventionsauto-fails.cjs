const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-06B-B-FIX1-interventionsauto-fails.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-06b-b-fix1-interventionsauto-fails";
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

  if (keyIndex === -1) {
    return null;
  }

  const blockStart = source.lastIndexOf("{", keyIndex);
  if (blockStart === -1) {
    fail("Cannot find block start for " + key);
  }

  const blockEnd = findMatchingBrace(source, blockStart);
  if (blockEnd === -1) {
    fail("Cannot find block end for " + key);
  }

  let endWithComma = blockEnd + 1;
  if (source.slice(endWithComma, endWithComma + 1) === ",") {
    endWithComma += 1;
  }

  return { blockStart, blockEnd, endWithComma, block: source.slice(blockStart, blockEnd + 1) };
}

function replaceFieldBlock(source, key, mutateBlock) {
  const found = findFieldBlock(source, key);
  if (!found) {
    return { source, changed: false };
  }

  const next = mutateBlock(found.block);

  return {
    source: source.slice(0, found.blockStart) + next + source.slice(found.blockEnd + 1),
    changed: found.block !== next,
  };
}

function insertAfterField(source, afterKey, fieldBlock) {
  const found = findFieldBlock(source, afterKey);
  if (!found) {
    fail("Cannot find insertion source key: " + afterKey);
  }

  return source.slice(0, found.endWithComma) + "\n" + fieldBlock + source.slice(found.endWithComma);
}

function addToNearbyArrays(source, anchorItem, itemToAdd, maxReplacements = 3) {
  if (source.includes(`"${itemToAdd}"`)) {
    return source;
  }

  let replaced = 0;
  const anchor = `"${anchorItem}",`;
  let index = 0;
  let output = source;

  while (replaced < maxReplacements) {
    const idx = output.indexOf(anchor, index);
    if (idx === -1) break;

    output =
      output.slice(0, idx + anchor.length) +
      `\n        "${itemToAdd}",` +
      output.slice(idx + anchor.length);

    index = idx + anchor.length + itemToAdd.length + 20;
    replaced++;
  }

  return output;
}

// 1) Add mecanicienId after rendezVousId if absent.
if (!content.includes('key: "mecanicienId"')) {
  const mecanicienField = `      {
        key: "mecanicienId",
        label: "Mécanicien responsable",
        type: "relation",
        relation: { module: "employes" },
        searchable: true,
        list: { visible: true, order: 5 },
        grid: { cols: 6 },
      },`;

  content = insertAfterField(content, "rendezVousId", mecanicienField);
}

// 2) Add montantHT after coutTotal if absent.
// coutTotal is conserved as legacy/fallback; montantHT becomes explicit runtime total.
if (!content.includes('key: "montantHT"')) {
  const montantHTField = `      {
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        list: { visible: true, order: 7 },
        grid: { cols: 4 },
        helperText: "Montant calculé depuis les lignes validées. Ancien équivalent legacy : coutTotal.",
      },`;

  content = insertAfterField(content, "coutTotal", montantHTField);
}

// 3) Lock statut with readonlyIf.
{
  const result = replaceFieldBlock(content, "statut", (block) => {
    let next = block;

    if (!next.includes("readonlyIf")) {
      const statuses = Array.from(next.matchAll(/value:\s*"([^"]+)"/g)).map((m) => m[1]);
      const values = statuses.length
        ? statuses
        : ["ouverte", "diagnostic", "en_cours", "terminee", "facturee", "annulee"];

      const readonlyIf = `readonlyIf: {
          field: "statut",
          operator: "in",
          values: [${values.map((v) => `"${v}"`).join(", ")}],
        },
        helperText: "Statut piloté par les actions. Utilisez les boutons d’action pour changer l’état de l’intervention.",`;

      next = next.replace('label: "Statut",', `label: "Statut",
        ${readonlyIf}`);
    }

    return next;
  });

  content = result.source;
}

// 4) Add fields to form/list layout arrays when obvious.
content = addToNearbyArrays(content, "rendezVousId", "mecanicienId", 3);
content = addToNearbyArrays(content, "coutTotal", "montantHT", 3);

// 5) Ensure readOnlyFields locks inherited context and calculated totals.
const readOnlyFieldsIndex = content.indexOf("readOnlyFields: [");
if (readOnlyFieldsIndex !== -1) {
  const endIndex = content.indexOf("]", readOnlyFieldsIndex);
  if (endIndex !== -1) {
    const currentBlock = content.slice(readOnlyFieldsIndex, endIndex);
    const additions = [
      "clientId",
      "vehiculeId",
      "rendezVousId",
      "coutPieces",
      "coutMainOeuvre",
      "coutTotal",
      "montantHT",
      "montantTTC",
    ].filter((field) => !currentBlock.includes(`"${field}"`));

    if (additions.length) {
      const insertion = additions.map((field) => `      "${field}",`).join("\n") + "\n";
      content = content.slice(0, endIndex) + insertion + content.slice(endIndex);
    }
  }
}

fs.writeFileSync(modulePath, content, "utf8");

const checks = [
  {
    label: "statut verrouillé avec readonlyIf",
    ok:
      /key:\s*"statut"[\s\S]*?readonlyIf/.test(content) &&
      /key:\s*"statut"[\s\S]*?operator:\s*"in"/.test(content),
  },
  {
    label: "mecanicienId ajouté",
    ok: content.includes('key: "mecanicienId"') && content.includes('relation: { module: "employes" }'),
  },
  {
    label: "montantHT ajouté",
    ok: content.includes('key: "montantHT"'),
  },
  {
    label: "coutTotal conservé comme legacy",
    ok: content.includes('key: "coutTotal"'),
  },
  {
    label: "montantHT ajouté aux layouts",
    ok: content.includes('"montantHT"'),
  },
  {
    label: "montantHT verrouillé dans readOnlyFields",
    ok: /readOnlyFields:\s*\[[\s\S]*?"montantHT"/.test(content),
  },
  {
    label: "contexte hérité verrouillé",
    ok:
      /readOnlyFields:\s*\[[\s\S]*?"clientId"/.test(content) &&
      /readOnlyFields:\s*\[[\s\S]*?"vehiculeId"/.test(content) &&
      /readOnlyFields:\s*\[[\s\S]*?"rendezVousId"/.test(content),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-06B-B-FIX1 — Fix interventionsauto FAILs",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Corrections appliquées",
  "",
  "- Verrouillage du statut intervention via readonlyIf.",
  "- Ajout du champ mecanicienId comme mécanicien responsable réel.",
  "- Ajout du champ montantHT après coutTotal.",
  "- Conservation de coutTotal comme legacy/fallback existant.",
  "- Verrouillage des champs hérités et calculés via readOnlyFields.",
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

console.log("[AMARKHYS-REBUILD-06B-B-FIX1] Fix interventionsauto FAILs");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06B-B-FIX1] DONE");
console.log("[NEXT] Rerun 06A audit, then pnpm build.");