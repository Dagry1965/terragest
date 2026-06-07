const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

// Fix the visible page title separator.
// We replace any corrupted template line using getRuntimePageTypeLabel(type)
// with a clean ASCII-safe separator.
const lines = content.split(/\r?\n/);

const fixedLines = lines.map((line) => {
  if (
    line.includes("getRuntimePageTypeLabel(type)") &&
    line.includes("moduleLabel")
  ) {
    const indent = line.match(/^\s*/)?.[0] ?? "";
    return `${indent}title ?? \`\${moduleLabel} - \${getRuntimePageTypeLabel(type)}\`;`;
  }

  return line
    .replaceAll("Actions mÃ©tier", "Actions métier")
    .replaceAll("Actions mÃƒÂ©tier", "Actions métier")
    .replaceAll("Actions mÃƒÆ’Ã‚Â©tier", "Actions métier")
    .replaceAll("Formulaire mÃ©tier", "Formulaire métier")
    .replaceAll("Formulaire mÃƒÂ©tier", "Formulaire métier")
    .replaceAll("connectÃ©", "connecté")
    .replaceAll("connectÃƒÂ©", "connecté")
    .replaceAll("opÃ©rationnelle", "opérationnelle")
    .replaceAll("opÃƒÂ©rationnelle", "opérationnelle")
    .replaceAll("gÃ©nÃ©rÃ©e", "générée")
    .replaceAll("gÃƒÂ©nÃƒÂ©rÃƒÂ©e", "générée")
    .replaceAll("crÃ©ation", "création")
    .replaceAll("Ã©dition", "édition")
    .replaceAll("dÃ©tail", "détail")
    .replaceAll("â€“", "-")
    .replaceAll("â€”", "-")
    .replaceAll("ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â", "-");
});

content = fixedLines.join("\n");

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[FIX] Runtime page visible title mojibake repaired");