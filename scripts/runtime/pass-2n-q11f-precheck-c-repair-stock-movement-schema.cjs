const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "mouvementsstockauto",
  "mouvementsstockauto.module.ts"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q11f-precheck-c-repair-schema`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

// Répare les clés supprimées par erreur dans schema.fields.
content = content.replace(
  /key:\s*label:\s*"Module source"/g,
  `key: "sourceModule",
        label: "Module source"`
);

content = content.replace(
  /key:\s*label:\s*"Source"/g,
  `key: "sourceId",
        label: "Source"`
);

content = content.replace(
  /key:\s*label:\s*"Ligne intervention"/g,
  `key: "ligneInterventionId",
        label: "Ligne intervention"`
);

// Sécurité : dans le bloc form uniquement, on retire ces champs s'ils sont encore listés.
const formIndex = content.indexOf("form:");
const workflowsIndex = content.indexOf("workflows:", formIndex);

if (formIndex !== -1 && workflowsIndex !== -1) {
  const beforeForm = content.slice(0, formIndex);
  let formBlock = content.slice(formIndex, workflowsIndex);
  const afterForm = content.slice(workflowsIndex);

  for (const field of ["sourceModule", "sourceId", "ligneInterventionId"]) {
    formBlock = formBlock.replace(
      new RegExp(`\\s*"${field}",\\n`, "g"),
      ""
    );
  }

  content = beforeForm + formBlock + afterForm;
}

fs.writeFileSync(file, content, "utf8");

console.log("OK: schema mouvementsstockauto réparé, champs techniques masqués du formulaire.");