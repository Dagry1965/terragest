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

// 1. Ajouter fieldErrors dans l'interface props si absent
if (!content.includes("fieldErrors?: Record<string, string>;")) {
  content = content.replace(
    /(\s+onFieldChange:\s*\(key:\s*string,\s*value:\s*unknown\)\s*=>\s*void;\s*)/,
    `$1  fieldErrors?: Record<string, string>;
`
  );
}

// 2. Ajouter fieldErrors = {} dans le destructuring de la fonction
if (!content.includes("fieldErrors = {}")) {
  content = content.replace(
    /(export function ERPFormTabs\s*\(\s*{\s*[\s\S]*?onFieldChange,)(\s*}\s*:\s*ERPFormTabsProps\s*\))/,
    `$1
  fieldErrors = {},$2`
  );
}

// 3. Passer error aux ERPFormField dans les tabs
content = content.replace(
  /(<ERPFormField\s+key=\{field\.key\}\s+field=\{field\}\s+value=\{formValues\[field\.key\]\}\s+onChange=\{onFieldChange\})(\s*\/>)/g,
  `$1
                  error={fieldErrors[field.key]}$2`
);

// 4. Variante avec indentation différente
content = content.replace(
  /(<ERPFormField[\s\S]*?field=\{field\}[\s\S]*?value=\{formValues\[field\.key\]\}[\s\S]*?onChange=\{onFieldChange\})(\s*\/>)/g,
  (match) => {
    if (match.includes("error={fieldErrors[field.key]}")) {
      return match;
    }

    return match.replace(
      /\s*\/>$/,
      `
                  error={fieldErrors[field.key]}
                />`
    );
  }
);

if (content === original) {
  throw new Error("Aucune modification appliquée dans ERPFormTabs.");
}

fs.writeFileSync(target, content, "utf8");

console.log("OK ERPFormTabs accepte fieldErrors et les transmet aux champs.");
console.log("Fichier modifié :", path.relative(ROOT, target));