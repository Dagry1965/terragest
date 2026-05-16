const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/components/erp/runtime/ERPRuntimePage.tsx"
);

if (!fs.existsSync(target)) {
  throw new Error(`File not found: ${target}`);
}

let content = fs.readFileSync(target, "utf8");
const original = content;

const editFormRegex =
  /<ERPEnterpriseForm\s+module=\{module\}\s+mode="edit"\s+initialData=\{record\}\s*\/>/m;

if (!editFormRegex.test(content)) {
  throw new Error("Bloc ERPEnterpriseForm edit non trouvé avec regex.");
}

content = content.replace(
  editFormRegex,
  `<ERPEnterpriseForm
            module={module}
            mode="edit"
            initialData={record}
            workflowActions={runtimeActions}
          />`
);

if (content === original) {
  throw new Error("Aucune modification appliquée.");
}

fs.writeFileSync(target, content, "utf8");

console.log("OK workflowActions transmis au formulaire edit.");
console.log("Fichier modifié :", path.relative(ROOT, target));