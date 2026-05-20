const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "interventionsauto",
  "interventionsauto.module.ts"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q12c-composition`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

if (content.includes("composition: {")) {
  console.log("INFO: composition existe déjà dans interventionsauto.module.ts");
  process.exit(0);
}

const compositionBlock = `
  composition: {
    labelFields: [
      "dateIntervention",
      "typeIntervention",
      "statut",
    ],

    breadcrumbs: [
      {
        field: "clientId",
        moduleKey: "clientsauto",
        labelFields: [
          "nom",
          "prenoms",
          "telephone",
        ],
      },
      {
        field: "vehiculeId",
        moduleKey: "vehicules",
        labelFields: [
          "marque",
          "modele",
          "immatriculation",
        ],
      },
      {
        field: "rendezVousId",
        moduleKey: "rendezvous",
        labelFields: [
          "dateRendezVous",
          "heureRendezVous",
          "motif",
        ],
      },
    ],

    relations: [
      {
        field: "clientId",
        moduleKey: "clientsauto",
        labelFields: [
          "nom",
          "prenoms",
          "telephone",
        ],
        snapshotFields: [
          "nom",
          "prenoms",
          "telephone",
          "email",
        ],
        displayAs: "card",
        lockDerivedFields: true,
      },
      {
        field: "vehiculeId",
        moduleKey: "vehicules",
        labelFields: [
          "marque",
          "modele",
          "immatriculation",
        ],
        snapshotFields: [
          "marque",
          "modele",
          "immatriculation",
          "clientId",
        ],
        displayAs: "card",
        lockDerivedFields: true,
      },
      {
        field: "rendezVousId",
        moduleKey: "rendezvous",
        labelFields: [
          "dateRendezVous",
          "heureRendezVous",
          "motif",
        ],
        snapshotFields: [
          "dateRendezVous",
          "heureRendezVous",
          "motif",
          "clientId",
          "vehiculeId",
        ],
        displayAs: "inline",
        lockDerivedFields: true,
      },
    ],

    lockedFields: [
      "clientId",
      "vehiculeId",
      "rendezVousId",
      "coutPieces",
      "coutMainOeuvre",
      "coutTotal",
    ],

    children: [
      {
        key: "lignes",
        moduleKey: "lignesinterventionauto",
        foreignKey: "interventionId",
        title: "Lignes de l’intervention",
        createLabel: "Ajouter une ligne",
        displayIn: [
          "detail",
          "edit",
        ],
        position: "after",
        lazy: true,
        totalField: "montantTotal",
        relations: [
          {
            field: "produitId",
            moduleKey: "produitsauto",
            labelFields: [
              "nom",
              "reference",
              "code",
            ],
            displayAs: "inline",
          },
          {
            field: "stockId",
            moduleKey: "stocksauto",
            labelFields: [
              "nom",
              "emplacement",
              "reference",
            ],
            displayAs: "inline",
          },
        ],
      },
    ],
  },

`;

const marker = "  actions: interventionsautoActions,";

if (!content.includes(marker)) {
  throw new Error(`Marqueur introuvable: ${marker}`);
}

content = content.replace(marker, compositionBlock + marker);

fs.writeFileSync(file, content, "utf8");

console.log("OK: composition ajoutée à interventionsauto.module.ts");