const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-06C-FIX5-generic-child-governance.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-06c-fix5-generic-child-governance";
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

function replaceFieldBlock(source, key, mutateBlock) {
  const marker = `key: "${key}"`;
  const keyIndex = source.indexOf(marker);
  if (keyIndex === -1) return source;

  const blockStart = source.lastIndexOf("{", keyIndex);
  if (blockStart === -1) fail("Cannot find field start for " + key);

  const blockEnd = findMatchingBrace(source, blockStart);
  if (blockEnd === -1) fail("Cannot find field end for " + key);

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

function ensureReadOnlyField(source, field) {
  const idx = source.indexOf("readOnlyFields: [");
  if (idx === -1) return source;

  const end = source.indexOf("]", idx);
  if (end === -1) return source;

  const block = source.slice(idx, end);
  if (block.includes(`"${field}"`)) return source;

  return source.slice(0, end) + `      "${field}",\n` + source.slice(end);
}

function ensureFieldInSection(source, sectionKey, fieldToAdd, afterFieldCandidates) {
  const sectionIndex = source.indexOf(`key: "${sectionKey}"`);
  if (sectionIndex === -1) return source;

  const sectionStart = source.lastIndexOf("{", sectionIndex);
  if (sectionStart === -1) return source;

  const sectionEnd = findMatchingBrace(source, sectionStart);
  if (sectionEnd === -1) return source;

  const section = source.slice(sectionStart, sectionEnd + 1);
  if (section.includes(`"${fieldToAdd}"`)) return source;

  let newSection = section;

  for (const candidate of afterFieldCandidates) {
    const needle = `"${candidate}",`;
    const idx = newSection.indexOf(needle);
    if (idx !== -1) {
      newSection =
        newSection.slice(0, idx + needle.length) +
        `\n              "${fieldToAdd}",` +
        newSection.slice(idx + needle.length);

      return source.slice(0, sectionStart) + newSection + source.slice(sectionEnd + 1);
    }
  }

  const fieldsIdx = newSection.indexOf("fields: [");
  if (fieldsIdx !== -1) {
    const insertAt = newSection.indexOf("[", fieldsIdx) + 1;
    newSection =
      newSection.slice(0, insertAt) +
      `\n              "${fieldToAdd}",` +
      newSection.slice(insertAt);

    return source.slice(0, sectionStart) + newSection + source.slice(sectionEnd + 1);
  }

  return source;
}

// 1. Déverrouiller les champs réellement modifiables.
content = removeFromReadOnlyFields(content, "dateIntervention");
content = removeFromReadOnlyFields(content, "kilometrage");

// 2. Garder verrouillés uniquement contexte hérité + montants calculés.
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

// 3. Rendre mecanicienId visible dans le formulaire.
// On ne change pas le moteur générique : on alimente correctement les metadata.
content = ensureFieldInSection(content, "identification", "mecanicienId", [
  "rendezVousId",
  "vehiculeId",
  "clientId",
]);

content = ensureFieldInSection(content, "contexte", "mecanicienId", [
  "rendezVousId",
  "vehiculeId",
  "clientId",
]);

content = ensureFieldInSection(content, "planification", "mecanicienId", [
  "dateIntervention",
  "rendezVousId",
  "vehiculeId",
]);

content = replaceFieldBlock(content, "mecanicienId", (block) => {
  let next = block;

  if (!/helperText\s*:/.test(next)) {
    next = next.replace(
      /grid:\s*\{\s*cols:\s*6\s*\},/,
      `grid: { cols: 6 },
        helperText: "Mécanicien responsable réel de l’intervention.",`
    );
  }

  return next;
});

// 4. Règle générique metadata pour child readonly/action-controlled.
// Facture : pas de panneau en edit, pas de création libre.
// On ne supprime pas la relation : elle reste consultable en detail si besoin.
content = replaceObjectBlockByMarker(content, 'moduleKey: "facturesauto"', (block) => {
  let next = block;

  // Pas de bouton création.
  next = next.replace(/\r?\n\s*createLabel:\s*"Ajouter une facture",?/g, "");

  if (/allowCreate\s*:/.test(next)) {
    next = next.replace(/allowCreate\s*:\s*true/g, "allowCreate: false");
  } else {
    next = next.replace(/openLabel:\s*"[^"]*",?/, (m) => `${m}
        allowCreate: false,`);
  }

  if (/mode\s*:/.test(next)) {
    next = next.replace(/mode\s*:\s*"[^"]+"/g, 'mode: "readonly"');
  } else {
    next = next.replace(/allowCreate:\s*false,?/, (m) => `${m}
        mode: "readonly",`);
  }

  // Règle générique : readonly child seulement en detail, pas en edit.
  if (/displayIn\s*:/.test(next)) {
    next = next.replace(/displayIn\s*:\s*\[[^\]]*\]/, 'displayIn: ["detail"]');
  } else {
    next = next.replace(/mode:\s*"readonly",?/, (m) => `${m}
        displayIn: ["detail"],`);
  }

  return next;
});

// 5. Vérifier que les lignes intervention restent opérationnelles.
content = replaceObjectBlockByMarker(content, 'moduleKey: "lignesinterventionauto"', (block) => {
  let next = block;

  if (/displayIn\s*:/.test(next)) {
    next = next.replace(/displayIn\s*:\s*\[[^\]]*\]/, 'displayIn: ["detail", "edit"]');
  }

  if (/allowCreate\s*:/.test(next)) {
    next = next.replace(/allowCreate\s*:\s*false/g, "allowCreate: true");
  }

  return next;
});

fs.writeFileSync(modulePath, content, "utf8");

function extractObjectBlock(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) return "";

  const start = source.lastIndexOf("{", markerIndex);
  if (start === -1) return "";

  const end = findMatchingBrace(source, start);
  return end === -1 ? "" : source.slice(start, end + 1);
}

const facturesBlock = extractObjectBlock(content, 'moduleKey: "facturesauto"');
const lignesBlock = extractObjectBlock(content, 'moduleKey: "lignesinterventionauto"');
const readOnlyMatch = content.match(/readOnlyFields:\s*\[[\s\S]*?\]/);
const readOnlyBlock = readOnlyMatch ? readOnlyMatch[0] : "";

const checks = [
  {
    label: "dateIntervention non verrouillée",
    ok: !readOnlyBlock.includes('"dateIntervention"'),
  },
  {
    label: "kilometrage non verrouillé",
    ok: !readOnlyBlock.includes('"kilometrage"'),
  },
  {
    label: "mecanicienId existe",
    ok: content.includes('key: "mecanicienId"'),
  },
  {
    label: "mecanicienId dans metadata form",
    ok: content.includes('"mecanicienId"'),
  },
  {
    label: "facturesauto reste relation consultable",
    ok: facturesBlock.includes('moduleKey: "facturesauto"'),
  },
  {
    label: "facturesauto absent du edit via displayIn detail only",
    ok: /displayIn:\s*\["detail"\]/.test(facturesBlock),
  },
  {
    label: "facturesauto readonly",
    ok: /mode:\s*"readonly"/.test(facturesBlock),
  },
  {
    label: "facturesauto sans création libre",
    ok: /allowCreate:\s*false/.test(facturesBlock) && !facturesBlock.includes("Ajouter une facture"),
  },
  {
    label: "lignesinterventionauto visible detail/edit",
    ok: /displayIn:\s*\["detail",\s*"edit"\]/.test(lignesBlock),
  },
  {
    label: "lignesinterventionauto conserve Ajouter une ligne",
    ok: lignesBlock.includes('createLabel: "Ajouter une ligne"'),
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
  "# AMARKHYS-REBUILD-06C-FIX5 — Gouvernance générique des children readonly",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Règle générique appliquée",
  "",
  "- Un child readonly / document généré par action runtime contrôlée ne s'affiche pas en edit.",
  "- Il peut rester consultable en detail.",
  "- Il ne doit pas afficher de création libre.",
  "",
  "## Application interventionsauto",
  "",
  "- lignesinterventionauto reste visible en detail/edit avec ajout de ligne.",
  "- facturesauto reste consultable en detail uniquement.",
  "- facturesauto est readonly et sans création libre.",
  "- dateIntervention et kilometrage sont modifiables.",
  "- mecanicienId est renforcé dans les metadata formulaire.",
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

console.log("[AMARKHYS-REBUILD-06C-FIX5] Generic child governance metadata");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06C-FIX5] DONE");
console.log("[NEXT] Rerun audits, build, UI check.");