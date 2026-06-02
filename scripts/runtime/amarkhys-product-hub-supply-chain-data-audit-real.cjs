const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts",
  "src/runtime/modules/generated/produitsauto/produitsauto.module.ts",
  "src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts",
  "src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts",
  "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
  "src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts",
];

function read(file) {
  return fs.existsSync(path.join(root, file))
    ? fs.readFileSync(path.join(root, file), "utf8")
    : "";
}

function has(file, needle) {
  return read(file).includes(needle);
}

const checks = [];

function check(label, ok, detail = "") {
  checks.push({ label, ok, detail });
}

check(
  "Loader exists",
  fs.existsSync(path.join(root, "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts"))
);

check(
  "Loader imports lignescommandestockautoModule",
  has(
    "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts",
    "lignescommandestockautoModule"
  )
);

check(
  "Loader still uses direct productOrders filter",
  has(
    "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts",
    "const productOrders = filterByAnyProductKey(commandes, productId);"
  ),
  "If true, commandes are not resolved via lines yet."
);

check(
  "Loader still uses direct productReceptions filter",
  has(
    "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts",
    "const productReceptions = filterByAnyProductKey(receptions, productId);"
  ),
  "If true, receptions are not resolved via lines yet."
);

check(
  "Lignes commande module has produitId",
  has(
    "src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts",
    'key: "produitId"'
  )
);

check(
  "Lignes commande module has commandeId",
  has(
    "src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts",
    'key: "commandeId"'
  )
);

check(
  "Lignes commande module has quantiteCommandee",
  has(
    "src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts",
    "quantiteCommandee"
  )
);

check(
  "Receptions module has ligneCommandeId",
  has(
    "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
    'key: "ligneCommandeId"'
  )
);

check(
  "Receptions module has commandeId",
  has(
    "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
    'key: "commandeId"'
  )
);

check(
  "Receptions module has produitId",
  has(
    "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
    'key: "produitId"'
  )
);

check(
  "Receptions module has stockId",
  has(
    "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
    'key: "stockId"'
  )
);

check(
  "Receptions module has quantiteRecue",
  has(
    "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
    "quantiteRecue"
  )
);

const okCount = checks.filter((item) => item.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-PRODUCT-HUB-SUPPLY-CHAIN-DATA-AUDIT-REAL",
  "",
  "## Objectif",
  "",
  "Audit lecture seule de la chaîne produit -> lignes commande -> commandes -> réceptions.",
  "",
  "## Résultat",
  "",
  `- OK: ${okCount}`,
  `- KO: ${failCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((item) => {
    return `- ${item.ok ? "OK" : "KO"} — ${item.label}${item.detail ? " — " + item.detail : ""}`;
  }),
  "",
  "## Conclusion attendue",
  "",
  "Si le loader utilise encore productOrders/productReceptions par filtre direct, il faut corriger le loader.",
  "Si les modules portent bien produitId / commandeId / ligneCommandeId, la correction doit se faire via lignescommandestockauto.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(root, "docs/audits/AMARKHYS-PRODUCT-HUB-SUPPLY-CHAIN-DATA-AUDIT-REAL.md"),
  report,
  "utf8"
);

console.log(report);