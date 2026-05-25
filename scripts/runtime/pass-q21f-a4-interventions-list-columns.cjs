const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q21f-a4-interventions-list-columns";

const targetFile =
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";

const wanted = new Map([
  ["clientId", 1],
  ["vehiculeId", 2],
  ["dateIntervention", 3],
  ["typeIntervention", 4],
  ["statut", 5],
  ["coutTotal", 6],
]);

function file(p) {
  return path.join(ROOT, p);
}

function backup(p) {
  const src = file(p);
  const dest = file(`${p}.bak-${TAG}`);

  if (!fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`[BACKUP] ${p}.bak-${TAG}`);
  }
}

function findMatchingBrace(content, openIndex, openChar, closeChar) {
  let depth = 0;

  for (let i = openIndex; i < content.length; i += 1) {
    const char = content[i];

    if (char === openChar) depth += 1;

    if (char === closeChar) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function findSchemaFieldsArray(content) {
  const schemaIndex = content.indexOf("schema:");
  if (schemaIndex === -1) throw new Error("[MISSING] schema:");

  const fieldsIndex = content.indexOf("fields:", schemaIndex);
  if (fieldsIndex === -1) throw new Error("[MISSING] schema.fields:");

  const bracketStart = content.indexOf("[", fieldsIndex);
  if (bracketStart === -1) throw new Error("[MISSING] fields [");

  const bracketEnd = findMatchingBrace(content, bracketStart, "[", "]");
  if (bracketEnd === -1) throw new Error("[MISSING] fields ]");

  return { bracketStart, bracketEnd };
}

function splitFieldObjects(arrayText) {
  const objects = [];
  let index = 0;

  while (index < arrayText.length) {
    const start = arrayText.indexOf("{", index);
    if (start === -1) break;

    const end = findMatchingBrace(arrayText, start, "{", "}");
    if (end === -1) throw new Error("[MISSING] field object closing brace");

    objects.push(arrayText.slice(start, end + 1));
    index = end + 1;
  }

  return objects;
}

function getKey(block) {
  return block.match(/key\s*:\s*["']([^"']+)["']/)?.[1] ?? null;
}

function ensureTrailingCommaBeforeInsert(block) {
  const closing = block.lastIndexOf("\n      }");
  if (closing === -1) return block;

  const before = block.slice(0, closing);
  const after = block.slice(closing);
  const trimmed = before.trimEnd();

  if (trimmed.endsWith(",")) return block;

  return before.replace(/\s*$/, ",") + after;
}

function setList(block, key) {
  const order = wanted.get(key);
  const listValue =
    order === undefined
      ? "list: { visible: false }"
      : `list: { visible: true, order: ${order} }`;

  let next = block;

  if (/list\s*:\s*\{[^{}]*\}/m.test(next)) {
    next = next.replace(/list\s*:\s*\{[^{}]*\}/m, listValue);
    return next;
  }

  const gridMatch = next.match(/\n\s*grid\s*:/);

  if (gridMatch && gridMatch.index !== undefined) {
    return (
      next.slice(0, gridMatch.index) +
      `\n        ${listValue},` +
      next.slice(gridMatch.index)
    );
  }

  next = ensureTrailingCommaBeforeInsert(next);

  const closing = next.lastIndexOf("\n      }");
  if (closing === -1) return next;

  return next.slice(0, closing) + `\n        ${listValue},` + next.slice(closing);
}

backup(targetFile);

const target = file(targetFile);
const original = fs.readFileSync(target, "utf8");

const { bracketStart, bracketEnd } = findSchemaFieldsArray(original);

const before = original.slice(0, bracketStart + 1);
const arrayText = original.slice(bracketStart + 1, bracketEnd);
const after = original.slice(bracketEnd);

const fieldObjects = splitFieldObjects(arrayText);

const patchedObjects = fieldObjects.map((block) => {
  const key = getKey(block);
  if (!key) return block;
  return setList(block, key);
});

const rebuilt =
  before +
  "\n" +
  patchedObjects.join(",\n") +
  "\n    " +
  after;

fs.writeFileSync(target, rebuilt, "utf8");

console.log("[Q21F_A4_DONE] interventionsauto list columns harmonized.");
console.log("");
console.log("Visible columns:");
for (const [key, order] of wanted.entries()) {
  console.log(`  ${order}. ${key}`);
}
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  test /interventionsauto");