const fs = require("fs");
const path = require("path");

const root = process.cwd();

function abs(file) {
  return path.join(root, file);
}

function read(file) {
  return fs.readFileSync(abs(file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(abs(file), content, "utf8");
}

function replaceChildDisplayIn(content, childKey, newDisplayIn) {
  const marker = `key: "${childKey}"`;
  const start = content.indexOf(marker);

  if (start === -1) {
    throw new Error(`[MISSING CHILD KEY] ${childKey}`);
  }

  const nextChild = content.indexOf("\n        {", start + marker.length);
  const end = nextChild === -1 ? content.indexOf("\n  ],", start) : nextChild;

  if (end === -1) {
    throw new Error(`[MISSING CHILD END] ${childKey}`);
  }

  const before = content.slice(0, start);
  let block = content.slice(start, end);
  const after = content.slice(end);

  if (!/displayIn:\s*\[[^\]]*\]/.test(block)) {
    throw new Error(`[MISSING displayIn] ${childKey}`);
  }

  block = block.replace(
    /displayIn:\s*\[[^\]]*\]/,
    `displayIn: ${newDisplayIn}`
  );

  return before + block + after;
}

let changed = 0;

// 1) Intervention -> Factures visibles en detail + edit
{
  const file = "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";
  const before = read(file);

  const after = replaceChildDisplayIn(
    before,
    "factures-intervention",
    '["detail", "edit"]'
  );

  if (after !== before) {
    write(file, after);
    changed++;
    console.log("[UPDATED]", file);
  } else {
    console.log("[UNCHANGED]", file);
  }
}

// 2) Facture -> Lignes facture visibles en detail + edit
{
  const file = "src/runtime/modules/generated/facturesauto/facturesauto.module.ts";
  const before = read(file);

  const after = replaceChildDisplayIn(
    before,
    "lignes-facture",
    '["detail", "edit"]'
  );

  if (after !== before) {
    write(file, after);
    changed++;
    console.log("[UPDATED]", file);
  } else {
    console.log("[UNCHANGED]", file);
  }
}

console.log("[Q2-L-B3-H4B] Changed files:", changed);