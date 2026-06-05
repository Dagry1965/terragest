const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/components/erp/operational/index.ts";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak-q2i-db-export-operational-record-tree", original, "utf8");

let next = original;

const exportsToAdd = [
  'export { ERPOperationalTreeView } from "./ERPOperationalTreeView";',
  'export { ERPOperationalRecordTree } from "./ERPOperationalRecordTree";',
];

for (const line of exportsToAdd) {
  if (!next.includes(line)) {
    next = next.trimEnd() + "\n" + line + "\n";
    console.log("[ADDED]", line);
  } else {
    console.log("[SKIP] Already exported:", line);
  }
}

fs.writeFileSync(file, next, "utf8");

console.log("[DONE] Q2-I-D-B operational tree exports updated.");
console.log("[WRITTEN]", rel);
