const fs = require("fs");
const os = require("os");
const path = require("path");

const root = process.cwd();

const backupDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "terragest-q12h-")
);

function backup(file) {
  const backupFile = path.join(
    backupDir,
    path.basename(file) + ".bak"
  );

  fs.writeFileSync(
    backupFile,
    fs.readFileSync(file, "utf8"),
    "utf8"
  );

  console.log("BACKUP:", backupFile);
}

function insertCompositionBeforeWorkflows(file, compositionBlock) {
  if (!fs.existsSync(file)) {
    throw new Error(`Fichier introuvable: ${file}`);
  }

  let content = fs.readFileSync(file, "utf8");

  backup(file);

  if (content.includes("composition: {")) {
    console.log("INFO: composition déjà présente:", file);
    return;
  }

  const marker = "\n  workflows:";

  if (!content.includes(marker)) {
    throw new Error(`Marqueur workflows introuvable dans ${file}`);
  }

  content = content.replace(
    marker,
    "\n" + compositionBlock + marker
  );

  fs.writeFileSync(file, content, "utf8");

  console.log("OK: composition ajoutée:", file);
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

const clientsComposition = `  composition: {
    labelFields: [
      "codeClient",
      "nom",
      "prenom",
      "telephone",
    ],

    children: [
      {
        key: "vehicules",
        moduleKey: "vehicules",
        foreignKey: "clientId",
        title: "Véhicules du client",
        createLabel: "Ajouter un véhicule",
        displayIn: [
          "detail",
          "edit",
        ],
        position: "after",
        lazy: true,
      },
    ],
  },
`;

const vehiculesComposition = `  composition: {
    labelFields: [
      "immatriculation",
      "marque",
      "modele",
    ],

    breadcrumbs: [
      {
        field: "clientId",
        moduleKey: "clientsauto",
        labelFields: [
          "nom",
          "prenom",
          "telephone",
        ],
      },
    ],

    relations: [
      {
        field: "clientId",
        moduleKey: "clientsauto",
        labelFields: [
          "nom",
          "prenom",
          "telephone",
        ],
        snapshotFields: [
          "codeClient",
          "nom",
          "prenom",
          "telephone",
          "email",
        ],
        displayAs: "card",
        lockDerivedFields: true,
      },
    ],

    lockedFields: [
      "clientId",
    ],

    children: [
      {
        key: "interventions",
        moduleKey: "interventionsauto",
        foreignKey: "vehiculeId",
        title: "Interventions du véhicule",
        createLabel: "Ajouter une intervention",
        displayIn: [
          "detail",
          "edit",
        ],
        position: "after",
        lazy: true,
        totalField: "coutTotal",
        relations: [
          {
            field: "clientId",
            moduleKey: "clientsauto",
            labelFields: [
              "nom",
              "prenom",
              "telephone",
            ],
            displayAs: "inline",
          },
        ],
      },
    ],
  },
`;

insertCompositionBeforeWorkflows(
  clientsFile,
  clientsComposition
);

insertCompositionBeforeWorkflows(
  vehiculesFile,
  vehiculesComposition
);

console.log("OK: Q12H-B compositions client/véhicule ajoutées.");