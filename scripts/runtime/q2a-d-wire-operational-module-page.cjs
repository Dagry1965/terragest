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

const backup = file + ".bak-q2a-d-wire-operational-module-page";
fs.writeFileSync(backup, original, "utf8");

const importLine =
  'import { ERPOperationalModulePage } from "@/components/erp/operational";';

if (!content.includes(importLine)) {
  const importMarker =
    'import { ERPContextBanner } from "@/components/erp/context/ERPContextBanner";';

  if (!content.includes(importMarker)) {
    throw new Error("Point insertion import introuvable: ERPContextBanner");
  }

  content = content.replace(
    importMarker,
    importMarker + "\n" + importLine
  );
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
  const marker = "  return (\n    <ERPPage";

  const index = content.indexOf(marker);

  if (index < 0) {
    throw new Error("Point insertion introuvable: return ERPPage");
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

  content = content.slice(0, index) + guard + content.slice(index);
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

console.log("[DONE] Q2-A-D ERPOperationalModulePage branchee dans ERPRuntimePage.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next:");
console.log("pnpm build");
