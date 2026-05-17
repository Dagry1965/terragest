const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "clientsauto",
  "clientsauto.module.ts"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

/**
 * 1) Retirer le champ "vehicules" du formulaire client.
 * On garde vehicules.clientId comme seule source de vérité.
 */
content = content.replace(
  /,\s*\{\s*key:"vehicules",\s*label:"VÃ©hicules",[\s\S]*?type:"relation",[\s\S]*?grid:\{ cols:12 \}\s*\}/,
  ""
);

content = content.replace(
  /,\s*\{\s*key:"vehicules",\s*label:"Véhicules",[\s\S]*?type:"relation",[\s\S]*?grid:\{ cols:12 \}\s*\}/,
  ""
);

/**
 * 2) Retirer l’onglet "vehicules" du formulaire.
 */
content = content.replace(
  /,\s*\{\s*key:"vehicules",\s*label:"VÃ©hicules",[\s\S]*?fields:\[\s*"vehicules"\s*\][\s\S]*?\}\s*\}\s*\]/,
  "]"
);

content = content.replace(
  /,\s*\{\s*key:"vehicules",\s*label:"Véhicules",[\s\S]*?fields:\[\s*"vehicules"\s*\][\s\S]*?\}\s*\}\s*\]/,
  "]"
);

/**
 * 3) Corriger les accents visibles.
 */
content = content
  .replaceAll("PrÃ©nom", "Prénom")
  .replaceAll("TÃ©lÃ©phone", "Téléphone")
  .replaceAll("CÃ´te d'Ivoire", "Côte d'Ivoire")
  .replaceAll("IdentitÃ©", "Identité")
  .replaceAll("VÃ©hicules", "Véhicules")
  .replaceAll("DÃ©sactiver", "Désactiver");

if (content === before) {
  console.log("NO CHANGE");
  console.log("Inspect clientsauto.module.ts manually.");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/runtime/modules/generated/clientsauto/clientsauto.module.ts");
console.log("DONE normalize client vehicle ownership");