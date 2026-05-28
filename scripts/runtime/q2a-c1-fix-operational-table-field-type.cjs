const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalTable.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

const backup = file + ".bak-q2a-c1-fix-operational-table-field-type";
fs.writeFileSync(backup, original, "utf8");

if (!content.includes("type OperationalColumn =")) {
  const marker = "type ERPOperationalTableProps = {";

  const helper = `type OperationalColumn = {
  key: string;
  field: ERPModuleField;
};

function hasOperationalField(
  column: {
    key: string;
    field: ERPModuleField | undefined;
  }
): column is OperationalColumn {
  return Boolean(column.field);
}

`;

  const index = content.indexOf(marker);

  if (index < 0) {
    throw new Error("Point insertion introuvable: type ERPOperationalTableProps");
  }

  content = content.slice(0, index) + helper + content.slice(index);
}

content = content.replace(
  /\.filter\(\(column\) => Boolean\(column\.field\)\)/,
  `.filter(hasOperationalField)`
);

if (!content.includes(".filter(hasOperationalField)")) {
  throw new Error("Remplacement filter(hasOperationalField) non appliqué.");
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-A-C1 ERPOperationalTable field type guard ajouté.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next:");
console.log("pnpm build");
