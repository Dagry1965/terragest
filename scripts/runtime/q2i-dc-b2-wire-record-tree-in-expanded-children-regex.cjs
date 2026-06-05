const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/components/erp/operational/ERPOperationalExpandedChildren.tsx";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak-q2i-dc-b2-wire-record-tree-regex", original, "utf8");

let next = original;

const importLine = 'import { ERPOperationalRecordTree } from "./ERPOperationalRecordTree";';

if (!next.includes(importLine)) {
  const importAnchor = 'import { operationalUiTokens } from "./operationalUiTokens";';

  if (!next.includes(importAnchor)) {
    throw new Error("Import anchor not found: " + importAnchor);
  }

  next = next.replace(importAnchor, importAnchor + "\n" + importLine);
  console.log("[ADDED] ERPOperationalRecordTree import");
} else {
  console.log("[SKIP] ERPOperationalRecordTree import already present");
}

if (!/<ERPOperationalRecordTree\b/.test(next)) {
  const returnWrapperRegex =
    /return\s*\(\s*<div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">/;

  if (!returnWrapperRegex.test(next)) {
    throw new Error("Return wrapper anchor not found. Inspect ERPOperationalExpandedChildren return block.");
  }

  next = next.replace(
    returnWrapperRegex,
    `return (
    <div className="space-y-4">
      <ERPOperationalRecordTree
        parentModule={parentModule}
        parentRecord={parentRecord}
        title="Arbre operationnel"
        emptyLabel="Aucun arbre operationnel disponible."
        defaultExpandedDepth={2}
      />

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">`
  );

  const lastCloseRegex = /(\n\s*<\/div>\s*\n\s*\);\s*\n}\s*)$/;

  if (!lastCloseRegex.test(next)) {
    throw new Error("Final return close anchor not found. Refusing unsafe write.");
  }

  next = next.replace(lastCloseRegex, "\n      </div>\n    </div>\n  );\n}\n");

  console.log("[ADDED] ERPOperationalRecordTree mounted in expanded children flow");
} else {
  console.log("[SKIP] ERPOperationalRecordTree already mounted");
}

if (!/<ERPOperationalRecordTree\b/.test(next)) {
  throw new Error("ERPOperationalRecordTree was not mounted.");
}

if (/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(next)) {
  throw new Error("Hardcoded AMARKHYS context detected.");
}

fs.writeFileSync(file, next, "utf8");

console.log("[DONE] Q2-I-D-C-B2 record tree wired into expanded children.");
console.log("[WRITTEN]", rel);
