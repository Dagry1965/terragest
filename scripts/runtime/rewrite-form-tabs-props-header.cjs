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

const interfaceStart = content.indexOf("interface ERPFormTabsProps {");
const functionStart = content.indexOf("export function ERPFormTabs({");

if (interfaceStart === -1) {
  throw new Error("interface ERPFormTabsProps introuvable.");
}

if (functionStart === -1) {
  throw new Error("export function ERPFormTabs introuvable.");
}

const beforeInterface = content.slice(0, interfaceStart);
const afterFunction = content.slice(functionStart);

const cleanInterface = `interface ERPFormTabsProps {
  module: ERPModule;
  initialData?: Record<string, unknown>;
  formValues?: Record<string, unknown>;
  onFieldChange?: (key: string, value: unknown) => void;
  fieldErrors?: Record<string, string>;
  lockedFields?: string[];
}

`;

content = beforeInterface + cleanInterface + afterFunction;

// S'assurer que le destructuring contient bien lockedFields = []
content = content.replace(
  `  fieldErrors = {},
}: ERPFormTabsProps) {`,
  `  fieldErrors = {},
  lockedFields = [],
}: ERPFormTabsProps) {`
);

// Si fieldErrors n'était pas encore dans le destructuring, on corrige le bloc complet connu
content = content.replace(
  `export function ERPFormTabs({
  module,
  initialData = {},
  formValues = {},
  onFieldChange,
}: ERPFormTabsProps) {`,
  `export function ERPFormTabs({
  module,
  initialData = {},
  formValues = {},
  onFieldChange,
  fieldErrors = {},
  lockedFields = [],
}: ERPFormTabsProps) {`
);

// Passer lockedFields aux champs qui ont déjà error
content = content.replace(
  /error=\{fieldErrors\[field\.key\]\}\s*\/>/g,
  `error={fieldErrors[field.key]}
                        lockedFields={lockedFields}
                      />`
);

// Corriger doublons éventuels
content = content.replace(
  /lockedFields=\{lockedFields\}\s+lockedFields=\{lockedFields\}/g,
  "lockedFields={lockedFields}"
);

fs.writeFileSync(target, content, "utf8");

console.log("OK ERPFormTabsProps réécrit proprement.");
console.log("");
console.log("Vérification début fichier :");

const lines = fs.readFileSync(target, "utf8").split(/\r?\n/);
for (let i = 1; i <= 36; i++) {
  console.log(`${String(i).padStart(4)}: ${lines[i - 1] ?? ""}`);
}