const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-06C-FIX1-interventionsauto-ui.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-06c-fix1-interventionsauto-ui";
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
  if (blockStart === -1) fail("Cannot find block start for " + key);

  const blockEnd = findMatchingBrace(source, blockStart);
  if (blockEnd === -1) fail("Cannot find block end for " + key);

  return { blockStart, blockEnd, block: source.slice(blockStart, blockEnd + 1) };
}

function replaceFieldBlock(source, key, mutateBlock) {
  const found = findFieldBlock(source, key);
  if (!found) return source;

  const next = mutateBlock(found.block);
  return source.slice(0, found.blockStart) + next + source.slice(found.blockEnd + 1);
}

function replaceObjectBlockByMarker(source, marker, mutateBlock) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) return source;

  const blockStart = source.lastIndexOf("{", markerIndex);
  if (blockStart === -1) fail("Cannot find object start for marker " + marker);

  const blockEnd = findMatchingBrace(source, blockStart);
  if (blockEnd === -1) fail("Cannot find object end for marker " + marker);

  const block = source.slice(blockStart, blockEnd + 1);
  const next = mutateBlock(block);

  return source.slice(0, blockStart) + next + source.slice(blockEnd + 1);
}

function ensureInArrayAfter(source, anchor, item, max = 4) {
  if (source.includes(`"${item}"`)) return source;

  let output = source;
  let count = 0;
  let index = 0;
  const needle = `"${anchor}",`;

  while (count < max) {
    const idx = output.indexOf(needle, index);
    if (idx === -1) break;

    output =
      output.slice(0, idx + needle.length) +
      `\n        "${item}",` +
      output.slice(idx + needle.length);

    index = idx + needle.length + item.length + 20;
    count++;
  }

  return output;
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

// 1. Statut : verrouillage robuste même si statut est vide/undefined.
// En edit, readonlyIf est évalué. En create, ERPEnterpriseForm ignore readonlyIf.
content = replaceFieldBlock(content, "statut", (block) => {
  let next = block;

  next = next.replace(/readonlyIf:\s*\{[\s\S]*?\},\s*/m, "");

  const readonlyIf = `readonlyIf: {
          field: "statut",
          operator: "notEquals",
          value: "__never_editable__",
        },
        helperText: "Statut piloté par les actions. Utilisez les boutons d’action pour changer l’état de l’intervention.",`;

  if (next.includes("helperText:")) {
    next = next.replace(/helperText:\s*"[^"]*",\s*/m, "");
  }

  next = next.replace('label: "Statut",', `label: "Statut",
        ${readonlyIf}`);

  return next;
});

// 2. mecanicienId doit être dans les layouts visibles.
// Si le champ existe déjà, on ajoute seulement dans les tableaux de fields.
content = ensureInArrayAfter(content, "rendezVousId", "mecanicienId", 4);

// 3. Montants : s’assurer que montantHT / montantTTC sont dans les layouts visibles.
// Le module peut avoir coutTotal legacy + montantHT runtime + montantTTC.
content = ensureInArrayAfter(content, "coutTotal", "montantHT", 4);
content = ensureInArrayAfter(content, "montantHT", "montantTTC", 4);

// 4. Montants et contexte en lecture seule.
[
  "clientId",
  "vehiculeId",
  "rendezVousId",
  "coutPieces",
  "coutMainOeuvre",
  "coutTotal",
  "montantHT",
  "montantTTC",
].forEach((field) => {
  content = ensureReadOnlyField(content, field);
});

// 5. Ne pas verrouiller kilometrage.
// Si kilométrage avait été ajouté aux readOnlyFields, on le retire.
content = content.replace(/^\s*"kilometrage",\r?\n/gm, "");

// 6. Panneau facture : pas de création facture depuis le panneau.
// On conserve la consultation éventuelle, mais allowCreate false.
content = replaceObjectBlockByMarker(content, 'moduleKey: "facturesauto"', (block) => {
  let next = block;

  if (/allowCreate\s*:/.test(next)) {
    next = next.replace(/allowCreate\s*:\s*true/g, "allowCreate: false");
  } else {
    next = next.replace(/openLabel:\s*"[^"]*",/, (m) => `${m}
        allowCreate: false,`);
  }

  return next;
});

fs.writeFileSync(modulePath, content, "utf8");

const checks = [
  {
    label: "statut verrouillé avec readonlyIf notEquals",
    ok:
      /key:\s*"statut"[\s\S]*?readonlyIf[\s\S]*?operator:\s*"notEquals"[\s\S]*?__never_editable__/.test(content),
  },
  {
    label: "mecanicienId présent dans le module",
    ok: content.includes('key: "mecanicienId"'),
  },
  {
    label: "mecanicienId présent dans les layouts",
    ok: content.includes('"mecanicienId"'),
  },
  {
    label: "montantHT présent dans les layouts",
    ok: content.includes('"montantHT"'),
  },
  {
    label: "montantTTC présent dans les layouts",
    ok: content.includes('"montantTTC"'),
  },
  {
    label: "montants verrouillés",
    ok:
      /readOnlyFields:\s*\[[\s\S]*?"montantHT"/.test(content) &&
      /readOnlyFields:\s*\[[\s\S]*?"montantTTC"/.test(content) &&
      /readOnlyFields:\s*\[[\s\S]*?"coutTotal"/.test(content),
  },
  {
    label: "kilometrage non verrouillé",
    ok: !/readOnlyFields:\s*\[[\s\S]*?"kilometrage"/.test(content),
  },
  {
    label: "panneau factures sans création directe",
    ok:
      /moduleKey:\s*"facturesauto"[\s\S]*?allowCreate:\s*false/.test(content) &&
      !/moduleKey:\s*"facturesauto"[\s\S]*?allowCreate:\s*true/.test(content),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-06C-FIX1 — Correction UI interventionsauto",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Corrections appliquées",
  "",
  "- Verrouillage robuste du statut intervention via readonlyIf notEquals.",
  "- Ajout de mecanicienId aux layouts visibles.",
  "- Ajout de montantHT / montantTTC aux layouts visibles.",
  "- Verrouillage des montants calculés et du contexte hérité.",
  "- Kilométrage explicitement non verrouillé.",
  "- Désactivation de la création facture depuis le panneau enfant facturesauto.",
  "",
  "## Règle métier",
  "",
  "- Une intervention peut avoir une facture, mais la facture doit être créée par action runtime contrôlée.",
  "- Le panneau facture sert à consulter/ouvrir, pas à créer librement.",
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

console.log("[AMARKHYS-REBUILD-06C-FIX1] Interventionsauto UI fix");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06C-FIX1] DONE");
console.log("[NEXT] Rerun 06C audit, build, then manual UI check.");