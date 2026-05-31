const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-06B-B-fix-interventionsauto-fails.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-06b-b-fix-interventionsauto-fails";
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
    return { source, changed: false };
  }

  const blockStart = source.lastIndexOf("{", keyIndex);
  if (blockStart === -1) {
    fail("Cannot find block start for " + key);
  }

  const blockEnd = findMatchingBrace(source, blockStart);
  if (blockEnd === -1) {
    fail("Cannot find block end for " + key);
  }

  const block = source.slice(blockStart, blockEnd + 1);
  const next = mutateBlock(block);

  return {
    source: source.slice(0, blockStart) + next + source.slice(blockEnd + 1),
    changed: block !== next,
  };
}

function insertBeforeField(source, beforeKey, fieldBlock) {
  const marker = `key: "${beforeKey}"`;
  const keyIndex = source.indexOf(marker);

  if (keyIndex === -1) {
    fail("Cannot find insertion target key: " + beforeKey);
  }

  const blockStart = source.lastIndexOf("{", keyIndex);
  if (blockStart === -1) {
    fail("Cannot find insertion block start for " + beforeKey);
  }

  return source.slice(0, blockStart) + fieldBlock + "\n" + source.slice(blockStart);
}

function insertAfterField(source, afterKey, fieldBlock) {
  const marker = `key: "${afterKey}"`;
  const keyIndex = source.indexOf(marker);

  if (keyIndex === -1) {
    fail("Cannot find insertion source key: " + afterKey);
  }

  const blockStart = source.lastIndexOf("{", keyIndex);
  if (blockStart === -1) {
    fail("Cannot find block start for " + afterKey);
  }

  const blockEnd = findMatchingBrace(source, blockStart);
  if (blockEnd === -1) {
    fail("Cannot find block end for " + afterKey);
  }

  let insertIndex = blockEnd + 1;

  if (source.slice(insertIndex, insertIndex + 1) === ",") {
    insertIndex += 1;
  }

  return source.slice(0, insertIndex) + "\n" + fieldBlock + source.slice(insertIndex);
}

// 1) Add mecanicienId if absent.
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

// 2) Add montantHT if absent. Keep coutTotal as legacy/old display field.
if (!content.includes('key: "montantHT"')) {
  const montantHTField = `      {
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        list: { visible: true, order: 6 },
        grid: { cols: 4 },
        helperText: "Montant calculé depuis les lignes validées. Ancien équivalent legacy : coutTotal.",
      },`;

  content = insertBeforeField(content, "montantTTC", montantHTField);
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

// 4) Ensure form fields include mecanicienId and montantHT.
function addToArrayAfter(source, arrayLabel, afterItem, itemToAdd) {
  if (source.includes(`"${itemToAdd}"`)) return source;

  const after = `"${afterItem}",`;
  const idx = source.indexOf(after);
  if (idx === -1) return source;

  return source.slice(0, idx + after.length) + `\n        "${itemToAdd}",` + source.slice(idx + after.length);
}

// Add mecanicienId after rendezVousId in tabs/sections/visible arrays where possible.
content = addToArrayAfter(content, "fields", "rendezVousId", "mecanicienId");

// Add montantHT near totals if missing from form arrays.
if (!/"montantHT"/.test(content)) {
  // Safety fallback impossible because field was added above; this branch should not run.
}

// If field exists but not in layout arrays, add after coutTotal once.
const coutTotalArrayIndex = content.indexOf('"coutTotal",');
if (coutTotalArrayIndex !== -1) {
  const local = content.slice(Math.max(0, coutTotalArrayIndex - 300), coutTotalArrayIndex + 300);
  if (!local.includes('"montantHT"')) {
    content = content.slice(0, coutTotalArrayIndex + '"coutTotal",'.length) +
      '\n        "montantHT",' +
      content.slice(coutTotalArrayIndex + '"coutTotal",'.length);
  }
}

// 5) Ensure readOnlyFields locks derived totals and inherited context.
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
    label: "montantTTC conservé",
    ok: content.includes('key: "montantTTC"'),
  },
  {
    label: "coutTotal conservé comme legacy",
    ok: content.includes('key: "coutTotal"'),
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
  "# AMARKHYS-REBUILD-06B-B — Fix interventionsauto FAILs",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Corrections appliquées",
  "",
  "- Verrouillage du statut intervention via readonlyIf.",
  "- Ajout du champ mecanicienId comme mécanicien responsable réel.",
  "- Ajout du champ montantHT comme total HT runtime explicite.",
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

console.log("[AMARKHYS-REBUILD-06B-B] Fix interventionsauto FAILs");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06B-B] DONE");
console.log("[NEXT] Rerun 06A audit, then pnpm build.");