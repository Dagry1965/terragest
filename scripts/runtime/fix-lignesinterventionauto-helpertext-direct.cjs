const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

const lines = content.split(/\r?\n/);

const fixedLines = lines.map((line) => {
  if (
    line.includes("helperText:") &&
    line.includes("Produit filtré selon le type") &&
    line.includes("article sélectionné")
  ) {
    return `        helperText: "Produit filtré selon le type d'article sélectionné.",`;
  }

  if (
    line.includes("description:") &&
    line.includes("Pièces, services et main") &&
    line.includes("uvre consommés sur une intervention AMARKHYS")
  ) {
    return `    description: "Pièces, services et main d'oeuvre consommés sur une intervention AMARKHYS",`;
  }

  return line;
});

content = fixedLines.join("\n");

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[FIX] lignesinterventionauto direct string repair done");