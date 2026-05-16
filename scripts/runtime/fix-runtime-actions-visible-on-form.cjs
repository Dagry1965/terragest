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

content = content.replace(
  `  const runtimeActions =
    type === "detail" && record
      ? RuntimeActionEngine.getAvailableActions({`,
  `  const runtimeActions =
    type !== "list" && record
      ? RuntimeActionEngine.getAvailableActions({`
);

if (content === original) {
  throw new Error("Bloc runtimeActions non trouvé. Aucun changement appliqué.");
}

fs.writeFileSync(target, content, "utf8");

console.log("OK boutons workflow visibles en detail/edit, cachés en liste.");
console.log("Fichier modifié :", path.relative(ROOT, target));