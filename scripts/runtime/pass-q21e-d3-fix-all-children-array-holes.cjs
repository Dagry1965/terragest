const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q21e-d3-fix-all-children-array-holes";

const files = [
  "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  "src/runtime/modules/generated/vehicules/vehicules.module.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
];

function full(file) {
  return path.join(ROOT, file);
}

function cleanArrayHoles(content) {
  let next = content;

  // Ligne qui ne contient qu'une virgule : crée un élément undefined dans un tableau.
  next = next.replace(/^\s*,\s*$/gm, "");

  // Cas classiques après insertion : }, , { ou }, , // commentaire
  next = next.replace(/},\s*,\s*{/g, "},\n      {");
  next = next.replace(/},\s*,\s*(\n\s*\/\/)/g, "},$1");

  // Cas objet suivi d'une virgule vide puis fermeture/continuité.
  next = next.replace(/,\s*,/g, ",");

  // Virgule vide juste après ouverture de tableau.
  next = next.replace(/children\s*:\s*\[\s*,/g, "children: [");
  next = next.replace(/displayIn\s*:\s*\[\s*,/g, "displayIn: [");
  next = next.replace(/labelFields\s*:\s*\[\s*,/g, "labelFields: [");
  next = next.replace(/subtitleFields\s*:\s*\[\s*,/g, "subtitleFields: [");
  next = next.replace(/relations\s*:\s*\[\s*,/g, "relations: [");

  // Cas fréquent : commentaire précédé d'une virgule vide entre deux enfants.
  next = next.replace(/\n\s*,\s*\n(\s*\/\/ Q21E_D_)/g, "\n$1");

  return next;
}

for (const file of files) {
  const target = full(file);

  if (!fs.existsSync(target)) {
    console.log(`[SKIP] Missing ${file}`);
    continue;
  }

  const backup = `${target}.bak-${TAG}`;

  if (!fs.existsSync(backup)) {
    fs.copyFileSync(target, backup);
    console.log(`[BACKUP] ${file}.bak-${TAG}`);
  }

  const before = fs.readFileSync(target, "utf8");
  const after = cleanArrayHoles(before);

  if (after !== before) {
    fs.writeFileSync(target, after, "utf8");
    console.log(`[WRITTEN] ${file}`);
  } else {
    console.log(`[OK] ${file}`);
  }
}

console.log("");
console.log("[Q21E_D3_DONE] Empty array holes cleaned in Q21E-D modules.");
console.log("");
console.log("Next:");
console.log("  pnpm build");