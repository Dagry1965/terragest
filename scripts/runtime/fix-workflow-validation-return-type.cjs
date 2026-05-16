const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const target = path.join(ROOT, "src/runtime/actions/RuntimeActionEngine.ts");

if (!fs.existsSync(target)) {
  throw new Error(`File not found: ${target}`);
}

let content = fs.readFileSync(target, "utf8");
const original = content;

content = content.replace(
  `        if (!validation.valid) {
          return {
            success: false,
            message:
              "Veuillez renseigner les champs obligatoires avant de continuer.",
            errors: validation.errors,
            action,
            record,
          };
        }`,
  `        if (validation.length > 0) {
          return {
            success: false,
            message:
              "Veuillez renseigner les champs obligatoires avant de continuer.",
            errors: validation,
            action,
            record,
          };
        }`
);

if (content === original) {
  throw new Error("Bloc validation.valid non trouvé. Aucun changement appliqué.");
}

fs.writeFileSync(target, content, "utf8");

console.log("OK RuntimeActionEngine corrigé : validate() retourne un tableau d'erreurs.");
console.log("Fichier modifié :", path.relative(ROOT, target));