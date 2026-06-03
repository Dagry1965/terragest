const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  loader: "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts",
  sheet: "src/components/erp/hub/ERPProductStockOperationalSheet.tsx",
  commandes: "src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts",
  lignesCommande: "src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts",
  receptions: "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
  fournisseurs: "src/runtime/modules/generated/fournisseursauto/fournisseursauto.module.ts",
};

function read(file) {
  const full = path.join(root, file);
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : "";
}

function has(file, needle) {
  return read(file).includes(needle);
}

const checks = [];

function check(label, ok, detail = "") {
  checks.push({ label, ok, detail });
}

check(
  "Loader charges lignescommandestockauto",
  has(files.loader, "lignescommandestockautoModule")
);

check(
  "Loader charges fournisseursauto",
  has(files.loader, "fournisseursautoModule")
);

check(
  "Loader computes productOrderLines",
  has(files.loader, "const productOrderLines = lignesCommande.filter")
);

check(
  "Loader computes productOrdersFromLines",
  has(files.loader, "const productOrdersFromLines = commandes")
);

check(
  "Loader computes productReceptionsFromLines",
  has(files.loader, "const productReceptionsFromLines = receptions")
);

check(
  "Loader has productOrderLineIds",
  has(files.loader, "productOrderLineIds")
);

check(
  "Loader has productOrderIds",
  has(files.loader, "productOrderIds")
);

check(
  "Loader enriches orders with product line",
  has(files.loader, "enrichOrderWithProductLine")
);

check(
  "Loader enriches receptions with product line",
  has(files.loader, "enrichReceptionWithProductLine")
);

check(
  "Loader does not yet expose supplyChainByOrder",
  !has(files.loader, "supplyChainByOrder"),
  "Expected for audit A. This will be added in the next implementation pass."
);

check(
  "Commande module has fournisseurId",
  has(files.commandes, 'key: "fournisseurId"')
);

check(
  "Commande module has dateCommande",
  has(files.commandes, 'key: "dateCommande"')
);

check(
  "Commande module has montantTTC",
  has(files.commandes, 'key: "montantTTC"')
);

check(
  "Commande module has statut",
  has(files.commandes, 'key: "statut"')
);

check(
  "Ligne commande module has commandeId",
  has(files.lignesCommande, 'key: "commandeId"')
);

check(
  "Ligne commande module has produitId",
  has(files.lignesCommande, 'key: "produitId"')
);

check(
  "Ligne commande module has quantiteCommandee",
  has(files.lignesCommande, "quantiteCommandee")
);

check(
  "Ligne commande module has montantTTC",
  has(files.lignesCommande, "montantTTC")
);

check(
  "Réception module has commandeId",
  has(files.receptions, 'key: "commandeId"')
);

check(
  "Réception module has ligneCommandeId",
  has(files.receptions, 'key: "ligneCommandeId"')
);

check(
  "Réception module has produitId",
  has(files.receptions, 'key: "produitId"')
);

check(
  "Réception module has quantiteRecue",
  has(files.receptions, "quantiteRecue")
);

check(
  "Réception module has dateReception",
  has(files.receptions, "dateReception")
);

check(
  "Réception module has statut",
  has(files.receptions, 'key: "statut"')
);

check(
  "Sheet currently renders Commandes fournisseurs panel",
  has(files.sheet, 'title="Commandes fournisseurs"')
);

check(
  "Sheet currently renders Réceptions stock panel",
  has(files.sheet, 'title="Réceptions stock"')
);

check(
  "Sheet does not yet render expandable supply cascade",
  !has(files.sheet, "SupplyCascade"),
  "Expected for audit A. This will be added later."
);

const okCount = checks.filter((item) => item.ok).length;
const koCount = checks.length - okCount;

const conclusion = [];

if (checks.find((item) => item.label === "Loader computes productOrderLines")?.ok) {
  conclusion.push("- Le loader dispose déjà des lignes de commande du produit.");
}

if (checks.find((item) => item.label === "Loader computes productReceptionsFromLines")?.ok) {
  conclusion.push("- Le loader dispose déjà des réceptions liées aux lignes/commandes.");
}

conclusion.push("- La prochaine passe doit exposer une structure supplyChainByOrder ou équivalent.");
conclusion.push("- La fiche pourra ensuite afficher une cascade Commande → Ligne commande → Réception.");
conclusion.push("- Le bloc Approvisionnement en colonne droite doit rester synthétique.");

const report = [
  "# AMARKHYS-PRODUCT-HUB-SUPPLY-CASCADE-A",
  "",
  "## Objectif",
  "",
  "Préparer la structure Commande fournisseur → Ligne commande → Ligne réception dans la fiche produit opérationnelle.",
  "",
  "## Besoin métier",
  "",
  "Voir la vie du produit dans le stock :",
  "",
  "- commandes fournisseurs synthétiques",
  "- lignes de commande du produit",
  "- lignes de réception associées",
  "- quantités commandées / livrées / restantes",
  "- montants et statuts",
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
  "## Conclusion",
  "",
  ...conclusion,
  "",
  "## Décision",
  "",
  "La passe suivante ne doit pas modifier les moteurs stock.",
  "Elle doit seulement structurer les données déjà disponibles pour permettre une présentation expandable.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(root, "docs/audits/AMARKHYS-PRODUCT-HUB-SUPPLY-CASCADE-A.md"),
  report,
  "utf8"
);

console.log(report);