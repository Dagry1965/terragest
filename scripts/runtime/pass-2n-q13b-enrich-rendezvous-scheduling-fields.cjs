const fs = require("fs");
const os = require("os");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "rendezvous",
  "rendezvous.module.ts"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

const backupDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "terragest-q13b-rendezvous-")
);

const backupFile = path.join(
  backupDir,
  "rendezvous.module.ts.bak"
);

let content = fs.readFileSync(file, "utf8");
fs.writeFileSync(backupFile, content, "utf8");

console.log("BACKUP:", backupFile);

const schedulingFields = `      {
        key: "durationMinutes",
        label: "Durée prévue",
        type: "number",
        defaultValue: 60,
        grid: { cols: 4 },
      },
      {
        key: "startAt",
        label: "Début créneau",
        type: "text",
        grid: { cols: 4 },
      },
      {
        key: "endAt",
        label: "Fin créneau",
        type: "text",
        grid: { cols: 4 },
      },
      {
        key: "consumedByInterventionId",
        label: "Intervention liée",
        type: "relation",
        relation: { module: "interventionsauto" },
        searchable: true,
        grid: { cols: 4 },
      },
`;

// 1. Ajouter les champs dans schema.fields juste avant typeService.
if (!content.includes(`key: "durationMinutes"`)) {
  const typeServiceIndex = content.indexOf(`key: "typeService"`);

  if (typeServiceIndex === -1) {
    throw new Error("Champ typeService introuvable.");
  }

  const fieldStart = content.lastIndexOf("      {", typeServiceIndex);

  if (fieldStart === -1) {
    throw new Error("Début du bloc typeService introuvable.");
  }

  content =
    content.slice(0, fieldStart) +
    schedulingFields +
    content.slice(fieldStart);

  console.log("OK: champs scheduling ajoutés dans schema.fields.");
} else {
  console.log("INFO: champs scheduling déjà présents dans schema.fields.");
}

// 2. Ajouter durationMinutes dans le formulaire, après heureRendezVous.
// On ne met PAS startAt/endAt/consumedByInterventionId dans le formulaire.
if (!content.includes(`"durationMinutes",`)) {
  content = content.replaceAll(
    `"heureRendezVous",
          "typeService",`,
    `"heureRendezVous",
          "durationMinutes",
          "typeService",`
  );

  content = content.replaceAll(
    `"heureRendezVous",
              "typeService",`,
    `"heureRendezVous",
              "durationMinutes",
              "typeService",`
  );

  console.log("OK: durationMinutes ajouté dans le formulaire.");
} else {
  console.log("INFO: durationMinutes déjà présent dans le formulaire.");
}

fs.writeFileSync(file, content, "utf8");

console.log("OK: module rendezvous enrichi pour scheduling.");