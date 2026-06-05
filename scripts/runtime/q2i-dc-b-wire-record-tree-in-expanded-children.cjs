const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/components/erp/operational/ERPOperationalExpandedChildren.tsx";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak-q2i-dc-b-wire-record-tree", original, "utf8");

let next = original;

if (!next.includes('import { ERPOperationalRecordTree } from "./ERPOperationalRecordTree";')) {
  next = next.replace(
    'import { operationalUiTokens } from "./operationalUiTokens";',
    'import { operationalUiTokens } from "./operationalUiTokens";\nimport { ERPOperationalRecordTree } from "./ERPOperationalRecordTree";'
  );
  console.log("[ADDED] ERPOperationalRecordTree import");
} else {
  console.log("[SKIP] ERPOperationalRecordTree import already present");
}

if (!next.includes("<ERPOperationalRecordTree")) {
  next = next.replace(
    '  return (\n    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">',
    `  return (
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

  next = next.replace(
    '    </div>\n  );\n}',
    '      </div>\n    </div>\n  );\n}'
  );

  console.log("[ADDED] ERPOperationalRecordTree mounted in expanded children flow");
} else {
  console.log("[SKIP] ERPOperationalRecordTree already mounted");
}

if (!next.includes("<ERPOperationalRecordTree")) {
  throw new Error("ERPOperationalRecordTree was not mounted.");
}

if (/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(next)) {
  throw new Error("Hardcoded AMARKHYS context detected.");
}

fs.writeFileSync(file, next, "utf8");

console.log("[DONE] Q2-I-D-C-B record tree wired into expanded children.");
console.log("[WRITTEN]", rel);
