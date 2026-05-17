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
  ["CÃ´te d'Ivoire", "Côte d'Ivoire"],
  ["VÃ©hicules", "Véhicules"],
  ["VÃ©hicule", "Véhicule"],
  ["vÃ©hicules", "véhicules"],
  ["vÃ©hicule", "véhicule"],
  ["ModÃ¨le", "Modèle"],
  ["AnnÃ©e", "Année"],
  ["Ã‰lectrique", "Électrique"],
  ["Ã‰quipements", "Équipements"],
  ["Ã‰chÃ©ances", "Échéances"],
  ["Ã‰chÃ©ance", "Échéance"],
  ["Ã‰levage", "Élevage"],
  ["Ã€ venir", "À venir"],
  ["Ã€ faire", "À faire"],
  ["KilomÃ©trage", "Kilométrage"],
  ["ContrÃ´le", "Contrôle"],
  ["contrÃ´le", "contrôle"],
  ["ImmobilisÃ©", "Immobilisé"],
  ["ArchivÃ©", "Archivé"],
  ["AnnulÃ©", "Annulé"],
  ["AnnulÃ©e", "Annulée"],
  ["ValidÃ©", "Validé"],
  ["RejetÃ©", "Rejeté"],
  ["PayÃ©", "Payé"],
  ["payÃ©", "payé"],
  ["payÃ©e", "payée"],
  ["Partiellement payÃ©e", "Partiellement payée"],
  ["Montant payÃ©", "Montant payé"],
  ["Montant prÃ©vu", "Montant prévu"],
  ["Montant encaissÃ©", "Montant encaissé"],
  ["Reste Ã payer", "Reste à payer"],
  ["Reste Ã  payer", "Reste à payer"],
  ["Reste Ã  payer", "Reste à payer"],
  ["EspÃ¨ces", "Espèces"],
  ["ChÃ¨que", "Chèque"],
  ["RÃ©fÃ©rence", "Référence"],
  ["RÃ©paration", "Réparation"],
  ["RÃ©parer", "Réparer"],
  ["RÃ©centes", "Récentes"],
  ["DÃ©tails", "Détails"],
  ["DÃ©tail", "Détail"],
  ["DÃ©jÃ payÃ©", "Déjà payé"],
  ["DÃ©jÃ  payÃ©", "Déjà payé"],
  ["DÃ©jÃ  payÃ©", "Déjà payé"],
  ["CrÃ©ation", "Création"],
  ["crÃ©ation", "création"],
  ["CrÃ©er", "Créer"],
  ["crÃ©er", "créer"],
  ["connectÃ©", "connecté"],
  ["mÃ©tier", "métier"],
  ["mÃ©tier", "métier"],
  ["rÃ¨gles", "règles"],
  ["centralisÃ©es", "centralisées"],
  ["compatibilitÃ©", "compatibilité"],
  ["rentabilitÃ©", "rentabilité"],
  ["opÃ©rationnel", "opérationnel"],
  ["ResponsabilitÃ©s", "Responsabilités"],
  ["Ã©lÃ©ment", "élément"],
  ["Ã©lÃ©ments", "éléments"],
  ["Ã©chÃ©ance", "échéance"],
  ["Ã©chÃ©ances", "échéances"],
  ["Ã©lÃ©ment", "élément"],
  ["Ã©", "é"],
  ["Ã¨", "è"],
  ["Ãª", "ê"],
  ["Ã«", "ë"],
  ["Ã ", "à"],
  ["Ã¢", "â"],
  ["Ã´", "ô"],
  ["Ã»", "û"],
  ["Ã§", "ç"],
  ["Ã‰", "É"],
  ["Ã€", "À"],
  ["Ã‡", "Ç"],
  ["â€™", "’"],
  ["â€œ", "“"],
  ["â€", "”"],
  ["â€¢", "•"],
  ["â†’", "→"],
  ["â†", "←"],
  ["Â°", "°"],
  ["NÂ°", "N°"],
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