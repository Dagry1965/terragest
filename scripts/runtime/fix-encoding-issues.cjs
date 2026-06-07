
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
  [""”", "—"],
  [""“", "–"],
  ["'", "‘"],
  ["'", "’"],
  [""", "“"],
  [""", "”"],
  [""¦", "…"],

  ["Création", "Création"],
  ["création", "création"],
  ["Créer", "Créer"],
  ["créer", "créer"],
  ["créé", "créé"],
  ["créée", "créée"],

  ["Démarrer", "Démarrer"],
  ["démarrer", "démarrer"],
  ["Détails", "Détails"],
  ["détail", "détail"],
  ["détails", "détails"],
  ["Déclenchement", "Déclenchement"],
  ["déclenchement", "déclenchement"],
  ["déclenché", "déclenché"],

  ["Véhicule", "Véhicule"],
  ["véhicule", "véhicule"],
  ["Véhicules", "Véhicules"],
  ["véhicules", "véhicules"],

  ["métier", "métier"],
  ["Métier", "Métier"],
  ["données", "données"],
  ["Données", "Données"],
  ["générée", "générée"],
  ["généré", "généré"],
  ["génériques", "génériques"],
  ["générique", "générique"],

  ["règles", "règles"],
  ["Règles", "Règles"],
  ["élément", "élément"],
  ["éléments", "éléments"],
  ["état", "état"],
  ["État", "État"],
  ["étape", "étape"],
  ["étapes", "étapes"],
  ["échéance", "échéance"],
  ["échéances", "échéances"],
  ["échec", "échec"],

  ["à", "à"],
  ["â", "â"],
  ["ç", "ç"],
  ["è", "è"],
  ["é", "é"],
  ["ê", "ê"],
  ["ë", "ë"],
  ["Ã®", "î"],
  ["Ã¯", "ï"],
  ["ô", "ô"],
  ["ù", "ù"],
  ["û", "û"],
  ["Ã¼", "ü"],
  ["À", "À"],
  ["É", "É"],
  ["Ãˆ", "È"],
  ["Ç", "Ç"],

  ["°", "°"],
  [" ", " "],
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