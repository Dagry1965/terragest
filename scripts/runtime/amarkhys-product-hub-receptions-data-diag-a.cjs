const fs = require("fs");
const path = require("path");

const root = process.cwd();

const loaderPath = path.join(root, "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts");
const receptionsModulePath = path.join(root, "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts");
const lignesCommandeModulePath = path.join(root, "src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts");
const commandesModulePath = path.join(root, "src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts");

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

const loader = read(loaderPath);
const receptionsModule = read(receptionsModulePath);
const lignesCommandeModule = read(lignesCommandeModulePath);
const commandesModule = read(commandesModulePath);

const checks = [];

function check(label, ok, detail = "") {
  checks.push({ label, ok, detail });
}

check(
  "Loader imports lignescommandestockautoModule",
  loader.includes("lignescommandestockautoModule")
);

check(
  "Loader loads lignesCommande in Promise.all",
  loader.includes("const [mouvements, commandes, lignesCommande, receptions] = await Promise.all")
);

check(
  "Loader computes productOrderLines",
  loader.includes("const productOrderLines = lignesCommande.filter")
);

check(
  "Loader computes productReceptionsFromLines",
  loader.includes("const productReceptionsFromLines = receptions")
);

check(
  "Loader matches reception.ligneCommandeId",
  loader.includes("reception.ligneCommandeId")
);

check(
  "Loader matches reception.commandeId",
  loader.includes("reception.commandeId")
);

check(
  "Loader includes productReceptionsByStock",
  loader.includes("const productReceptionsByStock")
);

check(
  "Loader assigns relatedRecordsBySection.receptions = productReceptions",
  loader.includes("relatedRecordsBySection.receptions = productReceptions;")
);

check(
  "Receptions module has ligneCommandeId",
  receptionsModule.includes('key: "ligneCommandeId"')
);

check(
  "Receptions module has commandeId",
  receptionsModule.includes('key: "commandeId"')
);

check(
  "Receptions module has produitId",
  receptionsModule.includes('key: "produitId"')
);

check(
  "Receptions module has stockId",
  receptionsModule.includes('key: "stockId"')
);

check(
  "Receptions module has quantiteRecue",
  receptionsModule.includes("quantiteRecue")
);

check(
  "Receptions module has dateReception",
  receptionsModule.includes("dateReception")
);

check(
  "Lignes commande module has produitId",
  lignesCommandeModule.includes('key: "produitId"')
);

check(
  "Lignes commande module has commandeId",
  lignesCommandeModule.includes('key: "commandeId"')
);

check(
  "Commandes module has fournisseurId",
  commandesModule.includes('key: "fournisseurId"')
);

check(
  "Commandes module has dateCommande",
  commandesModule.includes("dateCommande")
);

const okCount = checks.filter((item) => item.ok).length;
const koCount = checks.length - okCount;

const reportLines = [
  "# AMARKHYS-PRODUCT-HUB-RECEPTIONS-DATA-DIAG-A",
  "",
  "## Objectif",
  "",
  "Diagnostiquer pourquoi le bloc Réceptions stock reste vide dans la fiche produit opérationnelle.",
  "",
  "## Résultat",
  "",
  `- OK: ${okCount}`,
  `- KO: ${koCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((item) => {
    return `- ${item.ok ? "OK" : "KO"} — ${item.label}${item.detail ? " — " + item.detail : ""}`;
  }),
  "",
  "## Lecture",
  "",
  "- Si tous les checks loader/module sont OK mais que la fiche reste vide, le problème est probablement dans les données Firestore réelles.",
  "- Si les réceptions existent en base mais ne remontent pas, il faudra inspecter les valeurs réelles de ligneCommandeId / commandeId / produitId / stockId.",
  "- Si aucune réception réelle n’existe pour la ligne commande du produit, le bloc vide est cohérent et il faudra créer ou réparer les données de démo.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(root, "docs/audits/AMARKHYS-PRODUCT-HUB-RECEPTIONS-DATA-DIAG-A.md"),
  reportLines,
  "utf8"
);

console.log(reportLines);