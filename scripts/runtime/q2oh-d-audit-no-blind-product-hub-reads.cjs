const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts";
const full = path.join(root, file);

let ok = 0;
let fail = 0;

console.log("[Q2-OH-D] No blind Product Hub reads audit");
console.log("[ROOT] " + root);

if (!fs.existsSync(full)) {
  console.log("[FAIL] Missing file: " + file);
  process.exit(1);
}

console.log("[OK] Found: " + file);
ok += 1;

const content = fs.readFileSync(full, "utf8");

const expected = [
  "if (!productId)",
  "Do not blindly list products",
  "safeDetail(produitsautoModule, productId)",
  "safeList(stocksautoModule)",
  "relatedRecordsBySection",
];

for (const marker of expected) {
  if (content.includes(marker)) {
    console.log("[OK] Marker detected: " + marker);
    ok += 1;
  } else {
    console.log("[FAIL] Marker missing: " + marker);
    fail += 1;
  }
}

const forbidden = [
  "RuntimeDataBinding.list(produitsautoModule)",
  "safeList(produitsautoModule)",
  "firebase/firestore",
  "getDocs(",
  "collection(",
];

for (const marker of forbidden) {
  if (content.includes(marker)) {
    console.log("[FAIL] Forbidden marker detected: " + marker);
    fail += 1;
  }
}

function walk(dir, backups) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, backups);
      continue;
    }

    if (entry.name.includes(".bak-q2oh-d")) {
      backups.push(fullPath);
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
  console.log("[OK] No Q2-OH-D backup detected");
  ok += 1;
}

console.log("[OK] " + ok);
console.log("[FAIL] " + fail);

if (fail > 0) {
  process.exit(1);
}

console.log("[Q2-OH-D] No blind reads audit completed successfully.");
