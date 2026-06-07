const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

content = content.replace(
  'description: "Interventions à diagnostiquer, terminer ou facturer.",',
  'description: "Interventions à diagnostiquer, suivre ou clôturer côté atelier.",'
);

content = content.replace(
  'description: "Interventions Ã  diagnostiquer, terminer ou facturer.",',
  'description: "Interventions à diagnostiquer, suivre ou clôturer côté atelier.",'
);

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[Q2-L-B3-G3] Done");