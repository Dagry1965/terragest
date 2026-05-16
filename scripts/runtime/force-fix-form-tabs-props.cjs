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

if (!content.includes("fieldErrors?: Record<string, string>;")) {
  content = content.replace(
    `  onFieldChange?: (key: string, value: unknown) => void;
}`,
    `  onFieldChange?: (key: string, value: unknown) => void;
  fieldErrors?: Record<string, string>;
}`
  );
}

content = content
  .split("Aucun champ Ã  afficher pour cet onglet.")
  .join("Aucun champ à afficher pour cet onglet.")
  .split("Aucun champ Ã  afficher pour cet onglet.")
  .join("Aucun champ à afficher pour cet onglet.");

if (content === original) {
  console.log("Aucune modification appliquée. Vérification du contenu actuel :");
} else {
  fs.writeFileSync(target, content, "utf8");
  console.log("OK ERPFormTabsProps corrigé.");
}

console.log("");
console.log("Vérification interface :");
const lines = fs.readFileSync(target, "utf8").split(/\r?\n/);
for (let i = 15; i <= 24; i++) {
  console.log(`${String(i).padStart(4)}: ${lines[i - 1] ?? ""}`);
}