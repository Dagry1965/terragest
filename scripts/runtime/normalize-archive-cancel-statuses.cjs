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
    .replaceAll("PrÃ©nom", "Prénom")
    .replaceAll("TÃ©lÃ©phone", "Téléphone")
    .replaceAll("CÃ´te d'Ivoire", "Côte d'Ivoire")
    .replaceAll("IdentitÃ©", "Identité")
    .replaceAll("DÃ©sactiver", "Désactiver");

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
    .replaceAll("VÃ©hicules", "Véhicules")
    .replaceAll("ModÃ¨le", "Modèle")
    .replaceAll("AnnÃ©e", "Année")
    .replaceAll("Ã‰lectrique", "Électrique")
    .replaceAll("KilomÃ©trage", "Kilométrage")
    .replaceAll("ContrÃ´le technique", "Contrôle technique")
    .replaceAll("ImmobilisÃ©", "Immobilisé")
    .replaceAll("ArchivÃ©", "Archivé")
    .replaceAll("IdentitÃ©", "Identité")
    .replaceAll("PropriÃ©taire", "Propriétaire")
    .replaceAll("vÃ©hicule", "véhicule")
    .replaceAll("RÃ©parer", "Réparer")
);

patch(facturesFile, (content) =>
  content
    .replaceAll("NumÃ©ro facture", "Numéro facture")
    .replaceAll("VÃ©hicule", "Véhicule")
    .replaceAll("PayÃ©", "Payé")
    .replaceAll("EspÃ¨ces", "Espèces")
);

patch(encaissementsFile, (content) =>
  content
    .replaceAll("EspÃ¨ces", "Espèces")
    .replaceAll("ChÃ¨que", "Chèque")
    .replaceAll("RÃ©fÃ©rence transaction", "Référence transaction")
    .replaceAll("ValidÃ©", "Validé")
    .replaceAll("RejetÃ©", "Rejeté")
    .replaceAll("AnnulÃ©", "Annulé")
);

patch(echeancesFile, (content) =>
  content
    .replaceAll("Ã€ venir", "À venir")
    .replaceAll("Partiellement payÃ©e", "Partiellement payée")
    .replaceAll("PayÃ©e", "Payée")
    .replaceAll("AnnulÃ©e", "Annulée")
    .replaceAll("TÃ©lÃ©phone", "Téléphone")
);

console.log("DONE normalize archive cancel statuses");