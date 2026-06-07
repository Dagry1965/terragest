const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

content = content.replace(
  `description: "Pièces, services et main d"â„¢Ã…"uvre consommés sur une intervention AMARKHYS",`,
  `description: "Pièces, services et main d'oeuvre consommés sur une intervention AMARKHYS",`
);

content = content.replace(
  /description:\s*"Pièces, services et main d["'][^"]*uvre consommés sur une intervention AMARKHYS",/,
  `description: "Pièces, services et main d'oeuvre consommés sur une intervention AMARKHYS",`
);

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[FIX] lignesinterventionauto description repaired");