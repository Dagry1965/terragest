const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  "src/runtime/modules/generated",
  "src/runtime/business-rules",
  "src/runtime/domain",
  "src/runtime/modules/v2",
  "src/runtime/modules/factory",
  "src/runtime/README.md",
  "src/components/erp",
];

const replacements = [
  ["Côte d'Ivoire", "Côte d'Ivoire"],
  ["Véhicules", "Véhicules"],
  ["Véhicule", "Véhicule"],
  ["véhicules", "véhicules"],
  ["véhicule", "véhicule"],
  ["Modèle", "Modèle"],
  ["Année", "Année"],
  ["Électrique", "Électrique"],
  ["Équipements", "Équipements"],
  ["Échéances", "Échéances"],
  ["Échéance", "Échéance"],
  ["Élevage", "Élevage"],
  ["À venir", "À venir"],
  ["À faire", "À faire"],
  ["Kilométrage", "Kilométrage"],
  ["Contrôle", "Contrôle"],
  ["contrôle", "contrôle"],
  ["Immobilisé", "Immobilisé"],
  ["Archivé", "Archivé"],
  ["Annulé", "Annulé"],
  ["Annulée", "Annulée"],
  ["Validé", "Validé"],
  ["Rejeté", "Rejeté"],
  ["Payé", "Payé"],
  ["payé", "payé"],
  ["payée", "payée"],
  ["Partiellement payée", "Partiellement payée"],
  ["Montant payé", "Montant payé"],
  ["Montant prévu", "Montant prévu"],
  ["Montant encaissé", "Montant encaissé"],
  ["Reste àpayer", "Reste à payer"],
  ["Reste à payer", "Reste à payer"],
  ["Reste à payer", "Reste à payer"],
  ["Espèces", "Espèces"],
  ["Chèque", "Chèque"],
  ["Référence", "Référence"],
  ["Réparation", "Réparation"],
  ["Réparer", "Réparer"],
  ["Récentes", "Récentes"],
  ["Détails", "Détails"],
  ["Détail", "Détail"],
  ["Déjàpayé", "Déjà payé"],
  ["Déjà payé", "Déjà payé"],
  ["Déjà payé", "Déjà payé"],
  ["Création", "Création"],
  ["création", "création"],
  ["Créer", "Créer"],
  ["créer", "créer"],
  ["connecté", "connecté"],
  ["métier", "métier"],
  ["métier", "métier"],
  ["règles", "règles"],
  ["centralisées", "centralisées"],
  ["compatibilité", "compatibilité"],
  ["rentabilité", "rentabilité"],
  ["opérationnel", "opérationnel"],
  ["Responsabilités", "Responsabilités"],
  ["élément", "élément"],
  ["éléments", "éléments"],
  ["échéance", "échéance"],
  ["échéances", "échéances"],
  ["élément", "élément"],
  ["é", "é"],
  ["è", "è"],
  ["ê", "ê"],
  ["ë", "ë"],
  ["à", "à"],
  ["â", "â"],
  ["ô", "ô"],
  ["û", "û"],
  ["ç", "ç"],
  ["É", "É"],
  ["À", "À"],
  ["Ç", "Ç"],
  ["'", "’"],
  [""", "“"],
  [""", "”"],
  [""¢", "•"],
  ["â†’", "→"],
  ["â†", "←"],
  ["°", "°"],
  ["N°", "N°"],
  ["Â", ""],
];

const allowedExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".cjs",
  ".mjs",
  ".json",
  ".md",
]);

function walk(target, files = []) {
  const fullTarget = path.join(root, target);

  if (!fs.existsSync(fullTarget)) {
    return files;
  }

  const stat = fs.statSync(fullTarget);

  if (stat.isFile()) {
    files.push(fullTarget);
    return files;
  }

  for (const entry of fs.readdirSync(fullTarget, { withFileTypes: true })) {
    const fullPath = path.join(fullTarget, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === ".git"
      ) {
        continue;
      }

      walk(path.relative(root, fullPath), files);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (allowedExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = targets.flatMap((target) => walk(target));
let changedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  const before = content;

  for (const [bad, good] of replacements) {
    content = content.split(bad).join(good);
  }

  if (content !== before) {
    fs.writeFileSync(file, content, { encoding: "utf8" });
    console.log("FIXED " + path.relative(root, file));
    changedCount++;
  }
}

console.log("");
console.log("Changed files: " + changedCount);
console.log("DONE controlled mojibake fix");