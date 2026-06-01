const fs = require("fs");
const path = require("path");

const root = process.cwd();

const reportRel = "docs/audits/AMARKHYS-REBUILD-07C-H-audit-firestore-filter-data.md";
const reportPath = path.join(root, reportRel);

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};

  const env = {};
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

function compact(value) {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

async function main() {
  const env = {
    ...readEnvFile(path.join(root, ".env.local")),
    ...process.env,
  };

  const required = [
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  ];

  const missing = required.filter((key) => !env[key]);

  if (missing.length) {
    console.error("[FAIL] Missing Firebase env:", missing.join(", "));
    process.exit(1);
  }

  const { initializeApp, getApps } = await import("firebase/app");
  const {
    getFirestore,
    collection,
    getDocs,
  } = await import("firebase/firestore");

  const app =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({
          apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
        });

  const db = getFirestore(app);

  async function loadCollection(name) {
    const snapshot = await getDocs(collection(db, name));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  const produits = await loadCollection("produitsauto");
  const stocks = await loadCollection("stocksauto");

  const productTypeValues = Array.from(
    new Set(produits.map((item) => compact(item.typeArticle)).filter(Boolean))
  ).sort();

  const expectedTypes = ["piece", "main_oeuvre", "service", "remise"];

  const productsByType = expectedTypes.map((type) => {
    const items = produits.filter((item) => compact(item.typeArticle) === type);
    return {
      type,
      count: items.length,
      samples: items.slice(0, 10).map((item) => ({
        id: item.id,
        code: item.code ?? item.reference ?? "",
        nom: item.nom ?? item.designation ?? "",
        typeArticle: item.typeArticle ?? "",
      })),
    };
  });

  const productsMissingType = produits
    .filter((item) => !compact(item.typeArticle))
    .slice(0, 20)
    .map((item) => ({
      id: item.id,
      code: item.code ?? item.reference ?? "",
      nom: item.nom ?? item.designation ?? "",
      typeArticle: item.typeArticle ?? "",
    }));

  const stocksMissingProduct = stocks
    .filter((item) => !compact(item.produitId))
    .slice(0, 20)
    .map((item) => ({
      id: item.id,
      produitId: item.produitId ?? "",
      emplacement: item.emplacement ?? "",
      quantite: item.quantite ?? "",
      statut: item.statut ?? "",
    }));

  const productIds = new Set(produits.map((item) => String(item.id)));

  const stocksWithUnknownProduct = stocks
    .filter((item) => compact(item.produitId) && !productIds.has(String(item.produitId)))
    .slice(0, 20)
    .map((item) => ({
      id: item.id,
      produitId: item.produitId ?? "",
      emplacement: item.emplacement ?? "",
      quantite: item.quantite ?? "",
      statut: item.statut ?? "",
    }));

  const stocksByProduct = new Map();

  for (const stock of stocks) {
    const produitId = compact(stock.produitId);
    if (!produitId) continue;

    if (!stocksByProduct.has(produitId)) {
      stocksByProduct.set(produitId, []);
    }

    stocksByProduct.get(produitId).push(stock);
  }

  const productsWithoutStock = produits
    .filter((item) => compact(item.typeArticle) === "piece")
    .filter((item) => !stocksByProduct.has(String(item.id)))
    .slice(0, 20)
    .map((item) => ({
      id: item.id,
      code: item.code ?? item.reference ?? "",
      nom: item.nom ?? item.designation ?? "",
      typeArticle: item.typeArticle ?? "",
    }));

  const checks = [
    {
      label: "produitsauto contient des documents",
      ok: produits.length > 0,
    },
    {
      label: "stocksauto contient des documents",
      ok: stocks.length > 0,
    },
    {
      label: "au moins un produit piece existe",
      ok: produits.some((item) => compact(item.typeArticle) === "piece"),
    },
    {
      label: "au moins un produit main_oeuvre existe",
      ok: produits.some((item) => compact(item.typeArticle) === "main_oeuvre"),
    },
    {
      label: "tous les stocks ont produitId",
      ok: stocksMissingProduct.length === 0,
    },
    {
      label: "tous les stock.produitId correspondent à un produit existant",
      ok: stocksWithUnknownProduct.length === 0,
    },
    {
      label: "au moins une piece a un stock lié",
      ok:
        produits
          .filter((item) => compact(item.typeArticle) === "piece")
          .some((item) => stocksByProduct.has(String(item.id))),
    },
  ];

  const okCount = checks.filter((check) => check.ok).length;
  const failCount = checks.length - okCount;

  const report = [
    "# AMARKHYS-REBUILD-07C-H — Audit Firestore filter data",
    "",
    `Date: ${new Date().toISOString()}`,
    "",
    "## Synthèse",
    "",
    `- OK: ${okCount}`,
    `- FAIL: ${failCount}`,
    "",
    "## Counts",
    "",
    `- produitsauto: ${produits.length}`,
    `- stocksauto: ${stocks.length}`,
    `- product type values: ${JSON.stringify(productTypeValues)}`,
    "",
    "## Checks",
    "",
    ...checks.map((check) => `- ${check.ok ? "OK" : "FAIL"} — ${check.label}`),
    "",
    "## Produits par typeArticle",
    "",
    "```json",
    JSON.stringify(productsByType, null, 2),
    "```",
    "",
    "## Produits sans typeArticle",
    "",
    "```json",
    JSON.stringify(productsMissingType, null, 2),
    "```",
    "",
    "## Stocks sans produitId",
    "",
    "```json",
    JSON.stringify(stocksMissingProduct, null, 2),
    "```",
    "",
    "## Stocks avec produitId inconnu",
    "",
    "```json",
    JSON.stringify(stocksWithUnknownProduct, null, 2),
    "```",
    "",
    "## Produits piece sans stock lié",
    "",
    "```json",
    JSON.stringify(productsWithoutStock, null, 2),
    "```",
    "",
    "## Lecture",
    "",
    "- Si produits sans typeArticle : corriger/backfill typeArticle.",
    "- Si stocks sans produitId : corriger/backfill stock.produitId.",
    "- Si stock.produitId inconnu : rattacher au bon produit.",
    "- Si produit piece sans stock : normal que stockId soit vide pour ce produit.",
    "",
  ].join("\n");

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, report, "utf8");

  console.log("[AMARKHYS-REBUILD-07C-H] Audit Firestore filter data");
  console.log("[REPORT]", reportRel);
  console.log("[OK]", okCount);
  console.log("[FAIL]", failCount);
  console.log("[PRODUITS]", produits.length);
  console.log("[STOCKS]", stocks.length);
  console.log("[TYPE_VALUES]", JSON.stringify(productTypeValues));
  console.log("[PRODUCTS_WITHOUT_TYPE]", productsMissingType.length);
  console.log("[STOCKS_WITHOUT_PRODUCT]", stocksMissingProduct.length);
  console.log("[STOCKS_UNKNOWN_PRODUCT]", stocksWithUnknownProduct.length);
  console.log("[PIECES_WITHOUT_STOCK]", productsWithoutStock.length);

  if (failCount > 0) {
    console.log("[NEXT] Open report and fix data/backfill only.");
    process.exit(1);
  }

  console.log("[AMARKHYS-REBUILD-07C-H] DONE");
}

main().catch((error) => {
  console.error("[FAIL]", error);
  process.exit(1);
});