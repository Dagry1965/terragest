const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = "src/runtime/modules/generated/clientsauto/clientsauto.module.ts";
const full = path.join(ROOT, file);
const tag = "q21e-d2-fix-clients-children-array-holes";

const backup = `${full}.bak-${tag}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(full, backup);
  console.log(`[BACKUP] ${file}.bak-${tag}`);
}

let content = fs.readFileSync(full, "utf8");
const before = content;

// Supprime toute ligne qui ne contient qu'une virgule dans le tableau.
// C'est ce qui crée un slot undefined dans children: [ ... ].
content = content.replace(/^\s*,\s*$/gm, "");

// Corrige les cas où une virgule vide reste collée entre deux objets.
content = content.replace(/},\s*,\s*(\n\s*\/\/)/g, "},$1");
content = content.replace(/},\s*,\s*{/g, "},\n      {");

// Corrige les doubles virgules restantes.
content = content.replace(/,\s*,/g, ",");

// Corrige une virgule juste après l'ouverture de children.
content = content.replace(/children\s*:\s*\[\s*,/g, "children: [");

// Sécurise aussi les tableaux displayIn éventuels.
content = content.replace(/\[\s*,/g, "[");

if (content === before) {
  console.log("[WARN] No change applied. Inspect clientsauto.module.ts around children manually.");
} else {
  fs.writeFileSync(full, content, "utf8");
  console.log(`[WRITTEN] ${file}`);
}

console.log("");
console.log("[Q21E_D2_DONE] clientsauto children array holes cleaned.");
console.log("");
console.log("Next:");
console.log("  pnpm build");