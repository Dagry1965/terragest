const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRuntimePage.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

const backup = file + ".bak-q2a-d2-wire-operational-module-page-robust";
fs.writeFileSync(backup, original, "utf8");

const importLine =
  'import { ERPOperationalModulePage } from "@/components/erp/operational";';

if (!content.includes(importLine)) {
  const importMatches = [...content.matchAll(/^import[\s\S]*?;\s*$/gm)];

  if (importMatches.length === 0) {
    throw new Error("Aucun import trouvé dans ERPRuntimePage.tsx");
  }

  const lastImport = importMatches[importMatches.length - 1];
  const insertAt = lastImport.index + lastImport[0].length;

  content =
    content.slice(0, insertAt) +
    "\n" +
    importLine +
    content.slice(insertAt);
}

if (!content.includes("const shouldUseOperationalPage")) {
  const marker = "  const moduleLabel =";
  const index = content.indexOf(marker);

  if (index < 0) {
    throw new Error("Point insertion introuvable: const moduleLabel");
  }

  const block = `
  const shouldUseOperationalPage =
    type === "list" &&
    Boolean(module?.operational?.enabled);

`;

  content = content.slice(0, index) + block + content.slice(index);
}

if (!content.includes("<ERPOperationalModulePage")) {
  const erpPageIndex = content.indexOf("<ERPPage");

  if (erpPageIndex < 0) {
    throw new Error("Balise <ERPPage introuvable");
  }

  const beforeErpPage = content.slice(0, erpPageIndex);
  const returnIndex = beforeErpPage.lastIndexOf("return (");

  if (returnIndex < 0) {
    throw new Error("return ( avant <ERPPage introuvable");
  }

  const guard = `
  if (shouldUseOperationalPage && module) {
    return (
      <ERPPage
        title={title ?? module.metadata.label}
        description={
          description ??
          module.operational?.subtitle ??
          module.metadata.description ??
          "Vue opérationnelle générée par le Runtime ERP."
        }
      >
        <ERPOperationalModulePage
          module={module}
          data={runtimeData}
        />
      </ERPPage>
    );
  }

`;

  content = content.slice(0, returnIndex) + guard + content.slice(returnIndex);
}

const problems = [];

if (!content.includes(importLine)) {
  problems.push("import ERPOperationalModulePage absent");
}

if (!content.includes("const shouldUseOperationalPage")) {
  problems.push("shouldUseOperationalPage absent");
}

if (!content.includes("<ERPOperationalModulePage")) {
  problems.push("rendu ERPOperationalModulePage absent");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) {
    console.log(" - " + problem);
  }
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(1);
}

if (content === original) {
  console.log("[INFO] Aucun changement applique. Branchement peut-etre deja present.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(0);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-A-D2 ERPOperationalModulePage branchee robustement.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next:");
console.log("pnpm build");
