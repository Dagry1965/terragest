
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const folders = [
  "src/components/erp/forms",
  "src/components/erp/runtime",
  "src/runtime/modules/generated",
  "src/runtime/modules/definitions/generated",
];

const replacements = [
  ["â€”", "—"],
  ["â€“", "–"],
  ["â€˜", "‘"],
  ["â€™", "’"],
  ["â€œ", "“"],
  ["â€", "”"],
  ["â€¦", "…"],

  ["CrÃ©ation", "Création"],
  ["crÃ©ation", "création"],
  ["CrÃ©er", "Créer"],
  ["crÃ©er", "créer"],
  ["crÃ©Ã©", "créé"],
  ["crÃ©Ã©e", "créée"],

  ["DÃ©marrer", "Démarrer"],
  ["dÃ©marrer", "démarrer"],
  ["DÃ©tails", "Détails"],
  ["dÃ©tail", "détail"],
  ["dÃ©tails", "détails"],
  ["DÃ©clenchement", "Déclenchement"],
  ["dÃ©clenchement", "déclenchement"],
  ["dÃ©clenchÃ©", "déclenché"],

  ["VÃ©hicule", "Véhicule"],
  ["vÃ©hicule", "véhicule"],
  ["VÃ©hicules", "Véhicules"],
  ["vÃ©hicules", "véhicules"],

  ["mÃ©tier", "métier"],
  ["MÃ©tier", "Métier"],
  ["donnÃ©es", "données"],
  ["DonnÃ©es", "Données"],
  ["gÃ©nÃ©rÃ©e", "générée"],
  ["gÃ©nÃ©rÃ©", "généré"],
  ["gÃ©nÃ©riques", "génériques"],
  ["gÃ©nÃ©rique", "générique"],

  ["rÃ¨gles", "règles"],
  ["RÃ¨gles", "Règles"],
  ["Ã©lÃ©ment", "élément"],
  ["Ã©lÃ©ments", "éléments"],
  ["Ã©tat", "état"],
  ["Ã‰tat", "État"],
  ["Ã©tape", "étape"],
  ["Ã©tapes", "étapes"],
  ["Ã©chÃ©ance", "échéance"],
  ["Ã©chÃ©ances", "échéances"],
  ["Ã©chec", "échec"],

  ["Ã ", "à"],
  ["Ã¢", "â"],
  ["Ã§", "ç"],
  ["Ã¨", "è"],
  ["Ã©", "é"],
  ["Ãª", "ê"],
  ["Ã«", "ë"],
  ["Ã®", "î"],
  ["Ã¯", "ï"],
  ["Ã´", "ô"],
  ["Ã¹", "ù"],
  ["Ã»", "û"],
  ["Ã¼", "ü"],
  ["Ã€", "À"],
  ["Ã‰", "É"],
  ["Ãˆ", "È"],
  ["Ã‡", "Ç"],

  ["Â°", "°"],
  ["Â ", " "],
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      walk(full, files);
      continue;
    }

    if (
      entry.name.endsWith(".ts") ||
      entry.name.endsWith(".tsx")
    ) {
      files.push(full);
    }
  }

  return files;
}

const files = folders.flatMap((folder) =>
  walk(path.join(ROOT, folder))
);

const changedFiles = [];

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  const original = content;

  for (const [bad, good] of replacements) {
    content = content.split(bad).join(good);
  }

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    changedFiles.push(path.relative(ROOT, file));
  }
}

console.log("");
console.log("=== ENCODING FIX DONE ===");
console.log("");

if (changedFiles.length === 0) {
  console.log("Aucun fichier modifié.");
} else {
  for (const file of changedFiles) {
    console.log("FIXED:", file);
  }
}