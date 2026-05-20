const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function assertProjectRoot() {
  if (
    !fs.existsSync(path.join(ROOT, "package.json")) ||
    !fs.existsSync(path.join(ROOT, "src"))
  ) {
    throw new Error("Ce script doit être lancé depuis la racine du projet Terragest.");
  }
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log("[WRITTEN] " + path.relative(ROOT, filePath));
}

assertProjectRoot();

const targetPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPFormTabs.tsx"
);

let content = readFile(targetPath);

if (!content.includes("readOnlyFields?: string[];")) {
  content = content.replace(
    "  lockedFields?: string[];\n}",
    "  lockedFields?: string[];\n  readOnlyFields?: string[];\n}"
  );
}

if (!content.includes("readOnlyFields = [],")) {
  content = content.replace(
    "  fieldErrors = {},\n  lockedFields = [],\n}: ERPFormTabsProps) {",
    "  fieldErrors = {},\n  lockedFields = [],\n  readOnlyFields = [],\n}: ERPFormTabsProps) {"
  );
}

content = content.replaceAll(
  "                        lockedFields={lockedFields}\n                      />",
  "                        lockedFields={lockedFields}\n                        readOnlyFields={readOnlyFields}\n                      />"
);

writeFile(targetPath, content);

console.log("");
console.log("[OK] ERPFormTabs accepte et transmet readOnlyFields.");