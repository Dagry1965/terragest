const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx"
);

if (!fs.existsSync(target)) {
  throw new Error(`File not found: ${target}`);
}

let content = fs.readFileSync(target, "utf8");
const original = content;

// Remplace proprement le header de fonction jusqu'à la fin du destructuring.
const functionHeaderRegex =
  /export function ERPFormTabs\(\{\s*module,\s*initialData = \{\},\s*formValues = \{\},\s*onFieldChange,(\s*fieldErrors = \{\},)?(\s*lockedFields = \[\],)?\s*\}:\s*ERPFormTabsProps\)\s*\{/m;

if (!functionHeaderRegex.test(content)) {
  console.log("Header standard non trouvé. Affichage des 40 premières lignes :");
  const lines = content.split(/\r?\n/);
  for (let i = 1; i <= 40; i++) {
    console.log(`${String(i).padStart(4)}: ${lines[i - 1] ?? ""}`);
  }
  throw new Error("Impossible de localiser le header ERPFormTabs.");
}

content = content.replace(
  functionHeaderRegex,
  `export function ERPFormTabs({
  module,
  initialData = {},
  formValues = {},
  onFieldChange,
  fieldErrors = {},
  lockedFields = [],
}: ERPFormTabsProps) {`
);

// Sécurité : vérifier que l'interface contient aussi lockedFields
if (!content.includes("lockedFields?: string[];")) {
  content = content.replace(
    `  fieldErrors?: Record<string, string>;
}`,
    `  fieldErrors?: Record<string, string>;
  lockedFields?: string[];
}`
  );
}

if (content === original) {
  throw new Error("Aucune modification appliquée.");
}

fs.writeFileSync(target, content, "utf8");

console.log("OK ERPFormTabs destructuring corrigé avec lockedFields.");
console.log("");
console.log("Vérification début fichier :");

const lines = fs.readFileSync(target, "utf8").split(/\r?\n/);
for (let i = 16; i <= 36; i++) {
  console.log(`${String(i).padStart(4)}: ${lines[i - 1] ?? ""}`);
}