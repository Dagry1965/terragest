const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "lignesfactureauto",
  "lignesfactureauto.module.ts"
);

const passName = "BILLING-MODEL-C-B17";

function fail(message) {
  console.error(`[${passName}] FAIL: ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[${passName}] OK: ${message}`);
}

if (!fs.existsSync(target)) {
  fail(`Target file not found: ${target}`);
}

let source = fs.readFileSync(target, "utf8");

const backup = `${target}.bak-billing-model-c-b17-fix-composition-relations-array`;
if (!fs.existsSync(backup)) {
  fs.writeFileSync(backup, source, "utf8");
  ok(`Backup created: ${backup}`);
}

const before = source;

source = source.replace(
  /relations:\s*{\s*[\s\S]*?\n\s*},\s*\n\s*},\s*\n};/m,
  `relations: [
      {
        field: "factureId",
        moduleKey: "facturesauto",
        labelFields: ["numeroFacture", "dateFacture", "montantTTC"],
      },
      {
        field: "clientId",
        moduleKey: "clientsauto",
        labelFields: ["prenom", "nom", "telephone"],
      },
      {
        field: "vehiculeId",
        moduleKey: "vehicules",
        labelFields: ["marque", "modele", "immatriculation"],
      },
      {
        field: "interventionId",
        moduleKey: "interventionsauto",
        labelFields: ["typeIntervention", "dateIntervention", "statut"],
      },
      {
        field: "produitId",
        moduleKey: "produitsauto",
        labelFields: ["code", "nom", "designation"],
      },
    ],
  },
};
`
);

if (source === before) {
  fail("Could not replace composition.relations object with array.");
}

fs.writeFileSync(target, source, "utf8");

ok("Converted composition.relations to ERPCompositionRelation[] shape.");
ok("Next: run npm run build.");
