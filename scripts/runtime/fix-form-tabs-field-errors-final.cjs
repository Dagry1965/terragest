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

// 1. Ajouter fieldErrors dans l'interface props
if (!content.includes("fieldErrors?: Record<string, string>;")) {
  content = content.replace(
    `  onFieldChange?: (key: string, value: unknown) => void;
}`,
    `  onFieldChange?: (key: string, value: unknown) => void;
  fieldErrors?: Record<string, string>;
}`
  );
}

// 2. Nettoyer le rendu ERPFormField dans les sections
content = content.replace(
  /<ERPFormField\s+key=\{field\.key\}\s+field=\{field\}\s+value=\{formValues\[field\.key\]\}\s+onChange=\{onFieldChange\}\s+error=\{fieldErrors\[field\.key\]\}\s*\/>/g,
  `<ERPFormField
                        key={field.key}
                        field={field}
                        value={formValues[field.key]}
                        onChange={onFieldChange}
                        error={fieldErrors[field.key]}
                      />`
);

// 3. Nettoyer les blocs déjà cassés par indentation irrégulière
content = content.replace(
  /<ERPFormField\s*\n\s*key=\{field\.key\}\s*\n\s*field=\{field\}\s*\n\s*value=\{formValues\[field\.key\]\}\s*\n\s*onChange=\{onFieldChange\}\s*\n\s*error=\{fieldErrors\[field\.key\]\}\s*\n\s*\/>/g,
  `<ERPFormField
                        key={field.key}
                        field={field}
                        value={formValues[field.key]}
                        onChange={onFieldChange}
                        error={fieldErrors[field.key]}
                      />`
);

// 4. Corriger l'encodage résiduel
content = content
  .split("Aucun champ Ã  afficher pour cet onglet.")
  .join("Aucun champ à afficher pour cet onglet.");

// 5. Petite correction indentation return si nécessaire
content = content.replace(
  `  return (
  <div className="space-y-6">`,
  `  return (
    <div className="space-y-6">`
);

if (content === original) {
  throw new Error("Aucune modification appliquée.");
}

fs.writeFileSync(target, content, "utf8");

console.log("OK ERPFormTabs corrigé : props fieldErrors + JSX + encodage.");
console.log("Fichier modifié :", path.relative(ROOT, target));