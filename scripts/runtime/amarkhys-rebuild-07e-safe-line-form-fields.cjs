const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-07E-SAFE-line-form-fields.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-07e-safe-line-form-fields";
fs.copyFileSync(modulePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(modulePath, "utf8");
const before = content;

function assertContains(label, text) {
  if (!content.includes(text)) {
    fail(label + " not found: " + text);
  }
}

assertContains("produitId sourceField", 'sourceField: "typeArticle"');
assertContains("produitId targetField", 'targetField: "typeArticle"');
assertContains("stockId sourceField", 'sourceField: "produitId"');
assertContains("stockId targetField", 'targetField: "produitId"');
assertContains("typeArticle field", 'key: "typeArticle"');
assertContains("designation field", 'key: "designation"');
assertContains("typeLigne field", 'key: "typeLigne"');

// 1. Ne remplacer que les entrées standalone de layout.
// Exemple autorisé :
//   "typeLigne",
// Interdit :
//   key: "typeLigne"
//   typeLigne: ["typeArticle"]
let lines = content.split(/\r?\n/);

lines = lines.map((line) => {
  const trimmed = line.trim();

  if (trimmed === '"typeLigne",' || trimmed === '"typeLigne"') {
    return line.replace('"typeLigne"', '"typeArticle"');
  }

  return line;
});

// 2. Dédupliquer uniquement les entrées string dans les tableaux fields.
// Ne touche pas aux blocs de définition schema.
const deduped = [];
let inFieldsArray = false;
let fieldArrayDepth = 0;
let currentFieldEntries = new Set();

for (const line of lines) {
  const trimmed = line.trim();

  if (trimmed.startsWith("fields: [")) {
    inFieldsArray = true;
    fieldArrayDepth = 1;
    currentFieldEntries = new Set();
    deduped.push(line);
    continue;
  }

  if (inFieldsArray) {
    const entryMatch = trimmed.match(/^"([^"]+)"[,]?$/);

    if (entryMatch) {
      const value = entryMatch[1];

      if (currentFieldEntries.has(value)) {
        continue;
      }

      currentFieldEntries.add(value);
    }

    if (trimmed === "]," || trimmed === "]") {
      fieldArrayDepth = 0;
      inFieldsArray = false;
      currentFieldEntries = new Set();
      deduped.push(line);
      continue;
    }
  }

  deduped.push(line);
}

content = deduped.join("\n");

// 3. Corriger required sur typeArticle et designation par petite fenêtre de lignes.
function setRequiredInField(source, key, value) {
  const fieldMarker = `key: "${key}"`;
  const start = source.indexOf(fieldMarker);

  if (start === -1) {
    fail("Missing field marker: " + fieldMarker);
  }

  const nextKey = source.indexOf("key: ", start + fieldMarker.length);
  const end = nextKey === -1 ? source.length : nextKey;
  let block = source.slice(start, end);

  if (/required:\s*(true|false)/.test(block)) {
    block = block.replace(/required:\s*(true|false)/, `required: ${value}`);
  } else {
    block = block.replace(/label:\s*"[^"]+",/, (match) => `${match}
        required: ${value},`);
  }

  return source.slice(0, start) + block + source.slice(end);
}

content = setRequiredInField(content, "typeArticle", "true");
content = setRequiredInField(content, "designation", "false");

// 4. Corriger readOnlyFields sans toucher lockedFields.
function updateReadOnlyFields(source) {
  const marker = "readOnlyFields: [";
  const start = source.indexOf(marker);

  if (start === -1) {
    fail("readOnlyFields not found");
  }

  const end = source.indexOf("]", start);

  if (end === -1) {
    fail("readOnlyFields closing bracket not found");
  }

  const beforeBlock = source.slice(0, start);
  const block = source.slice(start, end + 1);
  const afterBlock = source.slice(end + 1);

  let blockLines = block.split(/\r?\n/);

  // Retirer typeArticle du readonly.
  blockLines = blockLines.filter((line) => !line.includes('"typeArticle"'));

  // Ajouter designation si absent.
  if (!blockLines.some((line) => line.includes('"designation"'))) {
    const closingIndex = blockLines.findIndex((line) => line.trim() === "]");

    if (closingIndex === -1) {
      fail("Cannot find readOnlyFields closing line");
    }

    blockLines.splice(closingIndex, 0, '      "designation",');
  }

  return beforeBlock + blockLines.join("\n") + afterBlock;
}

content = updateReadOnlyFields(content);

// 5. Garde-fous : les relations doivent être intactes.
if (!content.includes('sourceField: "typeArticle"') || !content.includes('targetField: "typeArticle"')) {
  fail("produitId filterBy typeArticle broken");
}

if (!content.includes('sourceField: "produitId"') || !content.includes('targetField: "produitId"')) {
  fail("stockId filterBy produitId broken");
}

if (!content.includes('dependsOn: "typeArticle"')) {
  fail("produitId dependsOn typeArticle missing");
}

if (!content.includes('dependsOn: "produitId"')) {
  fail("stockId dependsOn produitId missing");
}

fs.writeFileSync(modulePath, content, "utf8");

// 6. Checks.
function getWindow(source, marker, maxChars = 900) {
  const index = source.indexOf(marker);
  if (index === -1) return "";
  const next = source.indexOf("key: ", index + marker.length);
  const end = next === -1 ? Math.min(source.length, index + maxChars) : next;
  return source.slice(index, end);
}

const typeArticleWindow = getWindow(content, 'key: "typeArticle"');
const designationWindow = getWindow(content, 'key: "designation"');

const readOnlyStart = content.indexOf("readOnlyFields: [");
const readOnlyEnd = readOnlyStart === -1 ? -1 : content.indexOf("]", readOnlyStart);
const readOnlyBlock =
  readOnlyStart === -1 || readOnlyEnd === -1
    ? ""
    : content.slice(readOnlyStart, readOnlyEnd + 1);

const standaloneTypeLigneRefs = content
  .split(/\r?\n/)
  .filter((line) => {
    const trimmed = line.trim();
    return trimmed === '"typeLigne",' || trimmed === '"typeLigne"';
  });

const checks = [
  {
    label: "typeLigne key conservée comme champ technique",
    ok: content.includes('key: "typeLigne"'),
  },
  {
    label: "typeLigne retiré des layouts visibles standalone",
    ok: standaloneTypeLigneRefs.length === 0,
  },
  {
    label: "typeArticle existe",
    ok: content.includes('key: "typeArticle"'),
  },
  {
    label: "typeArticle obligatoire",
    ok: /required:\s*true/.test(typeArticleWindow),
  },
  {
    label: "typeArticle non verrouillé",
    ok: !readOnlyBlock.includes('"typeArticle"'),
  },
  {
    label: "designation existe",
    ok: content.includes('key: "designation"'),
  },
  {
    label: "designation non obligatoire manuellement",
    ok: /required:\s*false/.test(designationWindow),
  },
  {
    label: "designation verrouillée",
    ok: readOnlyBlock.includes('"designation"'),
  },
  {
    label: "produitId filtre toujours typeArticle",
    ok:
      content.includes('sourceField: "typeArticle"') &&
      content.includes('targetField: "typeArticle"') &&
      content.includes('dependsOn: "typeArticle"'),
  },
  {
    label: "stockId filtre toujours produitId",
    ok:
      content.includes('sourceField: "produitId"') &&
      content.includes('targetField: "produitId"') &&
      content.includes('dependsOn: "produitId"'),
  },
  {
    label: "aucun pattern cassé sourceField targetField",
    ok: !content.includes("sourceField:      targetField:"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-07E-SAFE — Line form fields",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Corrections",
  "",
  "- Remplacement uniquement des entrées standalone de layout `typeLigne` par `typeArticle`.",
  "- Conservation de la définition technique `typeLigne`.",
  "- `typeArticle` rendu obligatoire et éditable.",
  "- `designation` rendue non obligatoire manuellement et verrouillée.",
  "- Conservation stricte de `relation.filterBy` et `dependsOn`.",
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- ${check.ok ? "OK" : "FAIL"} — ${check.label}`),
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
  "## readOnlyFields",
  "",
  readOnlyBlock || "- Non trouvé.",
  "",
  "## typeArticle window",
  "",
  typeArticleWindow || "- Non trouvé.",
  "",
  "## designation window",
  "",
  designationWindow || "- Non trouvé.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-07E-SAFE] Line form fields");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-07E-SAFE] DONE");
console.log("[NEXT] Run 07C-A, build, UI check.");