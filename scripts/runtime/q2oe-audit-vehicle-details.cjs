const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "src/runtime/hub/RuntimeClientOperationalHubLoader.ts",
  "src/app/(private)/clientsauto/hub/page.tsx",
];

let ok = 0;
let fail = 0;

console.log("[Q2-OE] Vehicle details audit");
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

  for (const pattern of forbidden) {
    if (content.includes(pattern)) {
      console.log("[FAIL] Forbidden local Firestore pattern " + pattern + " in " + file);
      fail += 1;
    }
  }
}

const loader = fs.readFileSync(
  path.join(root, "src/runtime/hub/RuntimeClientOperationalHubLoader.ts"),
  "utf8"
);

const expected = [
  "interventionsautoModule",
  "facturesautoModule",
  "selectedVehicleId",
  "relatedRecordsBySection.interventions",
  "relatedRecordsBySection.factures",
];

for (const item of expected) {
  if (loader.includes(item)) {
    console.log("[OK] Loader contains " + item);
    ok += 1;
  } else {
    console.log("[FAIL] Loader missing " + item);
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

    if (entry.name.includes(".bak-q2oe")) {
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
  console.log("[OK] No Q2-OE backup detected");
  ok += 1;
}

console.log("[OK] " + ok);
console.log("[FAIL] " + fail);

if (fail > 0) {
  process.exit(1);
}

console.log("[Q2-OE] Vehicle details audit completed successfully.");
