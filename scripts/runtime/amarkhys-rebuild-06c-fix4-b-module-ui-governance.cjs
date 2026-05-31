const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-06C-FIX4-B-module-ui-governance.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-06c-fix4-b-module-ui-governance";
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

function removeFromReadOnlyFields(source, field) {
  const idx = source.indexOf("readOnlyFields: [");
  if (idx === -1) return source;

  const end = source.indexOf("]", idx);
  if (end === -1) return source;

  const beforeBlock = source.slice(0, idx);
  let block = source.slice(idx, end + 1);
  const afterBlock = source.slice(end + 1);

  const lineRegex = new RegExp(`\\r?\\n\\s*"${field}",?`, "g");
  block = block.replace(lineRegex, "");

  return beforeBlock + block + afterBlock;
}

function ensureInFirstSectionAfter(source, anchor, item) {
  if (source.includes(`"${item}"`)) return source;

  const anchorText = `"${anchor}",`;
  const idx = source.indexOf(anchorText);
  if (idx === -1) return source;

  return source.slice(0, idx + anchorText.length) + `\n        "${item}",` + source.slice(idx + anchorText.length);
}

function ensureInAnySectionAfter(source, anchor, item) {
  if (source.includes(`"${item}"`)) return source;

  const anchorText = `"${anchor}",`;
  const idx = source.indexOf(anchorText);
  if (idx === -1) return source;

  return source.slice(0, idx + anchorText.length) + `\n              "${item}",` + source.slice(idx + anchorText.length);
}

// 1. Déverrouiller dateIntervention et kilometrage.
content = removeFromReadOnlyFields(content, "dateIntervention");
content = removeFromReadOnlyFields(content, "kilometrage");

// 2. Renforcer visibilité mecanicienId dans les layouts.
// Si déjà présent, rien ne change. Sinon on l'ajoute après rendezVousId.
content = ensureInFirstSectionAfter(content, "rendezVousId", "mecanicienId");
content = ensureInAnySectionAfter(content, "rendezVousId", "mecanicienId");

// 3. Renforcer le panneau factures : consultation seulement, pas création.
// - allowCreate false
// - mode readonly
// - suppression createLabel pour éviter qu'un bouton utilise encore le libellé.
content = replaceObjectBlockByMarker(content, 'moduleKey: "facturesauto"', (block) => {
  let next = block;

  next = next.replace(/\r?\n\s*createLabel:\s*"Ajouter une facture",?/g, "");

  if (/allowCreate\s*:/.test(next)) {
    next = next.replace(/allowCreate\s*:\s*true/g, "allowCreate: false");
  } else {
    next = next.replace(/position:\s*"after",?/, (m) => `${m}
        allowCreate: false,`);
  }

  if (!/mode\s*:/.test(next)) {
    next = next.replace(/allowCreate:\s*false,?/, (m) => `${m}
        mode: "readonly",`);
  } else {
    next = next.replace(/mode\s*:\s*"[^"]+"/g, 'mode: "readonly"');
  }

  return next;
});

// 4. Garder les montants calculés verrouillés.
function ensureReadOnlyField(source, field) {
  const idx = source.indexOf("readOnlyFields: [");
  if (idx === -1) return source;

  const end = source.indexOf("]", idx);
  if (end === -1) return source;

  const block = source.slice(idx, end);
  if (block.includes(`"${field}"`)) return source;

  return source.slice(0, end) + `      "${field}",\n` + source.slice(end);
}

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

fs.writeFileSync(modulePath, content, "utf8");

const facturesBlock = (() => {
  const idx = content.indexOf('moduleKey: "facturesauto"');
  if (idx === -1) return "";
  const start = content.lastIndexOf("{", idx);
  const end = findMatchingBrace(content, start);
  return end === -1 ? "" : content.slice(start, end + 1);
})();

const readOnlyMatch = content.match(/readOnlyFields:\s*\[[\s\S]*?\]/);
const readOnlyBlock = readOnlyMatch ? readOnlyMatch[0] : "";

const checks = [
  {
    label: "dateIntervention déverrouillée",
    ok: !readOnlyBlock.includes('"dateIntervention"'),
  },
  {
    label: "kilometrage déverrouillé",
    ok: !readOnlyBlock.includes('"kilometrage"'),
  },
  {
    label: "mecanicienId présent",
    ok: content.includes('key: "mecanicienId"'),
  },
  {
    label: "mecanicienId dans layout",
    ok: content.includes('"mecanicienId"'),
  },
  {
    label: "facturesauto allowCreate false",
    ok: /allowCreate:\s*false/.test(facturesBlock),
  },
  {
    label: "facturesauto mode readonly",
    ok: /mode:\s*"readonly"/.test(facturesBlock),
  },
  {
    label: "createLabel Ajouter une facture supprimé",
    ok: !facturesBlock.includes('createLabel: "Ajouter une facture"'),
  },
  {
    label: "montants restent verrouillés",
    ok:
      readOnlyBlock.includes('"montantHT"') &&
      readOnlyBlock.includes('"montantTTC"') &&
      readOnlyBlock.includes('"coutTotal"'),
  },
  {
    label: "contexte hérité reste verrouillé",
    ok:
      readOnlyBlock.includes('"clientId"') &&
      readOnlyBlock.includes('"vehiculeId"') &&
      readOnlyBlock.includes('"rendezVousId"'),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-06C-FIX4-B — Module UI governance interventionsauto",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Corrections",
  "",
  "- Déverrouillage de dateIntervention.",
  "- Déverrouillage de kilometrage.",
  "- Renforcement de la visibilité mecanicienId dans les layouts.",
  "- Panneau facturesauto en consultation uniquement : allowCreate false + mode readonly + createLabel supprimé.",
  "- Conservation du verrouillage des montants calculés et du contexte hérité.",
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

console.log("[AMARKHYS-REBUILD-06C-FIX4-B] Module UI governance");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06C-FIX4-B] DONE");
console.log("[NEXT] Rerun governance audit, 06C audit, build, manual UI check.");