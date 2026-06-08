const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/modules/generated/clientsauto/clientsauto.module.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

content = content
  .replaceAll('label:"ArchivÃ©"', 'label:"Archivé"')
  .replaceAll('label:"Archiv\\u00e9"', 'label:"Archivé"');

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[CLIENT-WORKFLOW-A1-SAFE-3B] Done");