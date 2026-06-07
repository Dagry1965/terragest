const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/modules/generated/facturesauto/facturesauto.module.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

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

  const beforeBlock = content.slice(0, start);
  let block = content.slice(start, end);
  const afterBlock = content.slice(end);

  if (!/displayIn:\s*\[[^\]]*\]/.test(block)) {
    throw new Error(`[MISSING displayIn] ${childKey}`);
  }

  block = block.replace(
    /displayIn:\s*\[[^\]]*\]/,
    `displayIn: ${newDisplayIn}`
  );

  return beforeBlock + block + afterBlock;
}

content = replaceChildDisplayIn(
  content,
  "encaissements-facture",
  '["detail", "edit"]'
);

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[Q2-L-C-A1] Done");