const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts",
  "src/app/(private)/produitsauto/hub/page.tsx",
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
];

let ok = 0;
let fail = 0;

console.log("[Q2-OH-B] Product / Stock Hub route audit");
console.log("[ROOT] " + root);

for (const file of files) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    console.log("[FAIL] Missing file: " + file);
    fail += 1;
    continue;
  }

  console.log("[OK] Found: " + file);
  ok += 1;

  const content = fs.readFileSync(full, "utf8");

  const forbidden = ["firebase/firestore", "getDocs(", "collection("];

  for (const marker of forbidden) {
    if (content.includes(marker)) {
      console.log("[FAIL] Forbidden local Firestore marker " + marker + " in " + file);
      fail += 1;
    }
  }
}

const loader = fs.readFileSync(
  path.join(root, "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts"),
  "utf8"
);

const route = fs.readFileSync(
  path.join(root, "src/app/(private)/produitsauto/hub/page.tsx"),
  "utf8"
);

const expectedLoader = [
  "produitsautoModule",
  "stocksautoModule",
  "mouvementsstockautoModule",
  "commandesstockautoModule",
  "receptionsstockautoModule",
  "RuntimeDataBinding",
  "relatedRecordsBySection.mouvements",
  "relatedRecordsBySection.commandes",
  "relatedRecordsBySection.receptions",
];

for (const marker of expectedLoader) {
  if (loader.includes(marker)) {
    console.log("[OK] Loader marker detected: " + marker);
    ok += 1;
  } else {
    console.log("[FAIL] Loader marker missing: " + marker);
    fail += 1;
  }
}

const expectedRoute = [
  "Fiche Produit / Stock Opérationnelle",
  "selectedStockId",
  "selectionQueryParam",
  "open-stock",
  "open-mouvement",
  "open-commande",
  "open-reception",
];

for (const marker of expectedRoute) {
  if (route.includes(marker)) {
    console.log("[OK] Route marker detected: " + marker);
    ok += 1;
  } else {
    console.log("[FAIL] Route marker missing: " + marker);
    fail += 1;
  }
}

function walk(dir, backups) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, backups);
      continue;
    }

    if (entry.name.includes(".bak-q2oh-b")) {
      backups.push(full);
    }
  }
}

const backups = [];
walk(root, backups);

if (backups.length > 0) {
  for (const backup of backups) {
    console.log("[FAIL] Backup still present: " + path.relative(root, backup));
    fail += 1;
  }
} else {
  console.log("[OK] No Q2-OH-B backup detected");
  ok += 1;
}

console.log("[OK] " + ok);
console.log("[FAIL] " + fail);

if (fail > 0) {
  process.exit(1);
}

console.log("[Q2-OH-B] Product / Stock Hub route audit completed successfully.");
