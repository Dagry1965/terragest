const fs = require("fs");
const path = require("path");

const root = process.cwd();

function patch(file, updater) {
  if (!fs.existsSync(file)) {
    console.log(`SKIP missing ${file}`);
    return;
  }

  const before = fs.readFileSync(file, "utf8");
  const after = updater(before);

  if (after !== before) {
    fs.writeFileSync(file, after, { encoding: "utf8" });
    console.log(`UPDATED ${path.relative(root, file)}`);
  } else {
    console.log(`UNCHANGED ${path.relative(root, file)}`);
  }
}

const clientsFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "clientsauto",
  "clientsauto.module.ts"
);

const vehiculesFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "vehicules",
  "vehicules.module.ts"
);

const facturesFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "facturesauto",
  "facturesauto.module.ts"
);

const encaissementsFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "encaissementsauto",
  "encaissementsauto.module.ts"
);

const echeancesFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "echeancespaiementauto",
  "echeancespaiementauto.module.ts"
);

patch(clientsFile, (content) => {
  let next = content
    .replaceAll("Prénom", "Prénom")
    .replaceAll("Téléphone", "Téléphone")
    .replaceAll("Côte d'Ivoire", "Côte d'Ivoire")
    .replaceAll("Identité", "Identité")
    .replaceAll("Désactiver", "Désactiver");

  if (!next.includes('value:"archive"')) {
    next = next.replace(
      `            {
              label:"Inactif",
              value:"inactif"
            }`,
      `            {
              label:"Inactif",
              value:"inactif"
            },
            {
              label:"Archivé",
              value:"archive"
            }`
    );
  }

  return next;
});

patch(vehiculesFile, (content) =>
  content
    .replaceAll("Véhicules", "Véhicules")
    .replaceAll("Modèle", "Modèle")
    .replaceAll("Année", "Année")
    .replaceAll("Électrique", "Électrique")
    .replaceAll("Kilométrage", "Kilométrage")
    .replaceAll("Contrôle technique", "Contrôle technique")
    .replaceAll("Immobilisé", "Immobilisé")
    .replaceAll("Archivé", "Archivé")
    .replaceAll("Identité", "Identité")
    .replaceAll("Propriétaire", "Propriétaire")
    .replaceAll("véhicule", "véhicule")
    .replaceAll("Réparer", "Réparer")
);

patch(facturesFile, (content) =>
  content
    .replaceAll("Numéro facture", "Numéro facture")
    .replaceAll("Véhicule", "Véhicule")
    .replaceAll("Payé", "Payé")
    .replaceAll("Espèces", "Espèces")
);

patch(encaissementsFile, (content) =>
  content
    .replaceAll("Espèces", "Espèces")
    .replaceAll("Chèque", "Chèque")
    .replaceAll("Référence transaction", "Référence transaction")
    .replaceAll("Validé", "Validé")
    .replaceAll("Rejeté", "Rejeté")
    .replaceAll("Annulé", "Annulé")
);

patch(echeancesFile, (content) =>
  content
    .replaceAll("À venir", "À venir")
    .replaceAll("Partiellement payée", "Partiellement payée")
    .replaceAll("Payée", "Payée")
    .replaceAll("Annulée", "Annulée")
    .replaceAll("Téléphone", "Téléphone")
);

console.log("DONE normalize archive cancel statuses");