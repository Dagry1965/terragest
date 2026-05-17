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

// 1. Ajouter lockedFields dans l'interface props
if (!content.includes("lockedFields?: string[];")) {
  content = content.replace(
    `  fieldErrors?: Record<string, string>;
}`,
    `  fieldErrors?: Record<string, string>;
  lockedFields?: string[];
}`
  );
}

// 2. Ajouter lockedFields = [] dans le destructuring
if (!content.includes("lockedFields = []")) {
  content = content.replace(
    `  fieldErrors = {},
}: ERPFormTabsProps) {`,
    `  fieldErrors = {},
  lockedFields = [],
}: ERPFormTabsProps) {`
  );
}

// 3. Passer lockedFields aux ERPFormField si absent
content = content.replace(
  /error=\{fieldErrors\[field\.key\]\}\s*\/>/g,
  `error={fieldErrors[field.key]}
                        lockedFields={lockedFields}
                      />`
);

// 4. Corriger les doublons éventuels si le script précédent a déjà partiellement injecté
content = content.replace(
  /lockedFields=\{lockedFields\}\s+lockedFields=\{lockedFields\}/g,
  `lockedFields={lockedFields}`
);

if (content === original) {
  console.log("Aucune modification appliquée. Vérification du contenu actuel :");
} else {
  fs.writeFileSync(target, content, "utf8");
  console.log("OK ERPFormTabsProps corrigé avec lockedFields.");
}

console.log("");
console.log("Vérification interface :");
const lines = fs.readFileSync(target, "utf8").split(/\r?\n/);
for (let i = 16; i <= 32; i++) {
  console.log(`${String(i).padStart(4)}: ${lines[i - 1] ?? ""}`);
}