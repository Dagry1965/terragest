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

assertProjectRoot();

const targetPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

let content = fs.readFileSync(targetPath, "utf8");

const oldMessage =
  "Ce véhicule a déjà un rendez-vous sur ce créneau. Choisissez une autre heure ou modifiez le rendez-vous existant.";

const newMessage =
  "Ce véhicule a déjà un rendez-vous sur cette plage horaire. Choisissez un autre créneau ou modifiez le rendez-vous existant.";

if (!content.includes(oldMessage)) {
  throw new Error("Message de conflit planning introuvable.");
}

content = content.replace(oldMessage, newMessage);

fs.writeFileSync(targetPath, content, { encoding: "utf8" });

console.log("[OK] Message conflit planning affiné.");