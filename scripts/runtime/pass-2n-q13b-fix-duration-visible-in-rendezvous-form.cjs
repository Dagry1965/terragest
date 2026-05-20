const fs = require("fs");
const os = require("os");
const path = require("path");

const root = process.cwd();

const rendezvousFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "rendezvous",
  "rendezvous.module.ts"
);

const auditFile = path.join(
  root,
  "scripts",
  "runtime",
  "pass-2n-q11f-precheck-audit-technical-form-fields.cjs"
);

function backup(file, suffix) {
  const backupDir = fs.mkdtempSync(
    path.join(os.tmpdir(), `terragest-${suffix}-`)
  );

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

if (!fs.existsSync(rendezvousFile)) {
  throw new Error(`Fichier introuvable: ${rendezvousFile}`);
}

let content = fs.readFileSync(rendezvousFile, "utf8");
backup(rendezvousFile, "q13b-duration-form");

const formIndex = content.indexOf("form:");
const workflowsIndex = content.indexOf("workflows:", formIndex);

if (formIndex === -1 || workflowsIndex === -1) {
  throw new Error("Bloc form/workflows introuvable dans rendezvous.module.ts");
}

const beforeForm = content.slice(0, formIndex);
let formBlock = content.slice(formIndex, workflowsIndex);
const afterForm = content.slice(workflowsIndex);

if (!formBlock.includes(`"durationMinutes",`)) {
  formBlock = formBlock.replaceAll(
    `"heureRendezVous",
          "typeService",`,
    `"heureRendezVous",
          "durationMinutes",
          "typeService",`
  );

  formBlock = formBlock.replaceAll(
    `"heureRendezVous",
              "typeService",`,
    `"heureRendezVous",
              "durationMinutes",
              "typeService",`
  );

  console.log("OK: durationMinutes ajouté dans le formulaire rendezvous.");
} else {
  console.log("INFO: durationMinutes déjà présent dans le formulaire.");
}

for (const technicalField of [
  "startAt",
  "endAt",
  "consumedByInterventionId",
]) {
  if (formBlock.includes(`"${technicalField}",`)) {
    throw new Error(
      `Champ technique visible dans le formulaire: ${technicalField}`
    );
  }
}

content = beforeForm + formBlock + afterForm;
fs.writeFileSync(rendezvousFile, content, "utf8");

// Mettre à jour l'audit pour surveiller les nouveaux champs techniques scheduling.
if (fs.existsSync(auditFile)) {
  let auditContent = fs.readFileSync(auditFile, "utf8");
  backup(auditFile, "q13b-audit-tech-fields");

  const marker = `"ligneInterventionId",`;

  if (
    auditContent.includes(marker) &&
    !auditContent.includes(`"consumedByInterventionId",`)
  ) {
    auditContent = auditContent.replace(
      marker,
      `${marker}
  "startAt",
  "endAt",
  "consumedByInterventionId",`
    );

    fs.writeFileSync(auditFile, auditContent, "utf8");
    console.log("OK: audit enrichi avec champs techniques scheduling.");
  } else {
    console.log("INFO: audit déjà à jour ou marqueur introuvable.");
  }
}

console.log("OK: Q13B form rendezvous corrigé.");