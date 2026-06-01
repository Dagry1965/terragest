const fs = require("fs");
const path = require("path");

const root = process.cwd();

const reportRel = "docs/audits/AMARKHYS-REBUILD-07C-I-backfill-product-typearticle.md";
const reportPath = path.join(root, reportRel);

const apply = process.env.APPLY_BACKFILL === "1";

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

function normalizeText(value) {
  return compact(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function inferTypeArticle(product) {
  const id = compact(product.id);
  const code = compact(product.code ?? product.reference);
  const nom = compact(product.nom ?? product.designation);
  const current = compact(product.typeArticle);

  const text = normalizeText(`${id} ${code} ${nom}`);

  if (
    id.startsWith("MO-") ||
    code.startsWith("MO-") ||
    text.includes("main d'oeuvre") ||
    text.includes("main d œuvre") ||
    text.includes("main doeuvre")
  ) {
    return "main_oeuvre";
  }

  if (!current) {
    return "piece";
  }

  if (current === "consommable") {
    return "piece";
  }

  return current;
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
    doc,
    updateDoc,
    serverTimestamp,
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

  const snapshot = await getDocs(collection(db, "produitsauto"));

  const products = snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));

  const changes = [];

  for (const product of products) {
    const before = compact(product.typeArticle);
    const after = inferTypeArticle(product);

    if (before !== after) {
      changes.push({
        id: product.id,
        code: product.code ?? product.reference ?? "",
        nom: product.nom ?? product.designation ?? "",
        before,
        after,
      });
    }
  }

  if (apply) {
    for (const change of changes) {
      await updateDoc(doc(db, "produitsauto", change.id), {
        typeArticle: change.after,
        updatedAt: serverTimestamp(),
        updatedBy: "runtime-backfill",
        backfillTag: "AMARKHYS-REBUILD-07C-I",
      });
    }
  }

  const countsAfter = {};

  for (const product of products) {
    const change = changes.find((item) => item.id === product.id);
    const typeArticle = change ? change.after : compact(product.typeArticle);
    countsAfter[typeArticle || "(vide)"] = (countsAfter[typeArticle || "(vide)"] ?? 0) + 1;
  }

  const checks = [
    {
      label: "au moins un produit main_oeuvre après backfill",
      ok:
        products.some((item) => inferTypeArticle(item) === "main_oeuvre"),
    },
    {
      label: "aucun produit vide après backfill",
      ok:
        products.every((item) => Boolean(inferTypeArticle(item))),
    },
    {
      label: "aucun consommable après backfill",
      ok:
        products.every((item) => inferTypeArticle(item) !== "consommable"),
    },
  ];

  const okCount = checks.filter((check) => check.ok).length;
  const failCount = checks.length - okCount;

  const report = [
    "# AMARKHYS-REBUILD-07C-I — Backfill product typeArticle",
    "",
    `Date: ${new Date().toISOString()}`,
    "",
    `Mode: ${apply ? "APPLY" : "DRY_RUN"}`,
    "",
    "## Synthèse",
    "",
    `- OK: ${okCount}`,
    `- FAIL: ${failCount}`,
    `- Produits analysés: ${products.length}`,
    `- Changements: ${changes.length}`,
    "",
    "## Counts après backfill théorique",
    "",
    "```json",
    JSON.stringify(countsAfter, null, 2),
    "```",
    "",
    "## Checks",
    "",
    ...checks.map((check) => `- ${check.ok ? "OK" : "FAIL"} — ${check.label}`),
    "",
    "## Changements",
    "",
    "```json",
    JSON.stringify(changes, null, 2),
    "```",
    "",
  ].join("\n");

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, report, "utf8");

  console.log("[AMARKHYS-REBUILD-07C-I] Backfill product typeArticle");
  console.log("[MODE]", apply ? "APPLY" : "DRY_RUN");
  console.log("[REPORT]", reportRel);
  console.log("[OK]", okCount);
  console.log("[FAIL]", failCount);
  console.log("[PRODUCTS]", products.length);
  console.log("[CHANGES]", changes.length);
  console.log("[COUNTS_AFTER]", JSON.stringify(countsAfter));

  if (!apply) {
    console.log("[NEXT] Review report, then run with APPLY_BACKFILL=1.");
  } else {
    console.log("[AMARKHYS-REBUILD-07C-I] DONE");
    console.log("[NEXT] Rerun 07C-H audit, then UI test.");
  }

  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("[FAIL]", error);
  process.exit(1);
});