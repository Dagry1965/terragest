const fs = require("fs");
const path = require("path");

const root = process.cwd();

function write(file, content) {
  fs.writeFileSync(file, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, file)}`);
}

const loaderFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "lifecycle",
  "ERPRelationDataLoader.ts"
);

const formFieldFile = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPFormField.tsx"
);

if (!fs.existsSync(loaderFile)) {
  console.error(`MISSING ${loaderFile}`);
  process.exit(1);
}

let loader = fs.readFileSync(loaderFile, "utf8");

loader = loader.replace(
  /const numero = value\("numero"\);/,
  `const numero = value("numero");
    const numeroFacture = value("numeroFacture");
    const dateFacture = value("dateFacture");
    const montantTTC = value("montantTTC");
    const montantPaye = value("montantPaye");
    const resteAPayer = value("resteAPayer");`
);

loader = loader.replace(
  `    /**
     * Contrats / factures / documents métier
     */`,
  `    /**
     * Factures AMARKHYS
     * Exemple attendu :
     * FAC-2026-0001 • 11 000 FCFA
     */
    const factureLabel = compact(
      numeroFacture || reference || numero,
      montantTTC ? montantTTC + " FCFA" : "",
      dateFacture
    );

    if (factureLabel) {
      return factureLabel;
    }

    /**
     * Contrats / factures / documents métier
     */`
);

loader = loader
  .replaceAll("Véhicules", "Véhicules")
  .replaceAll("propriétaires", "propriétaires")
  .replaceAll("où", "où")
  .replaceAll("déjÃ", "déjà")
  .replaceAll("métier", "métier");

write(loaderFile, loader);

if (fs.existsSync(formFieldFile)) {
  let formField = fs.readFileSync(formFieldFile, "utf8");

  formField = formField.replace(
    /const selectedLabel\s*=\s*selectedOption\?\.label\s*\|\|\s*\([\s\S]*?\);/,
    `const selectedLabel =
      selectedOption?.label ||
      (currentValue
        ? "Relation métier sélectionnée"
        : "Aucune relation renseignée");`
  );

  formField = formField.replaceAll(
    "Relation verrouillée",
    "Relation métier verrouillée"
  );

  write(formFieldFile, formField);
}

console.log("DONE fix relation labels for billing");