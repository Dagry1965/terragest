const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "src/runtime/hub/RuntimeHubTypes.ts",
  "src/runtime/hub/RuntimeHubRelationResolver.ts",
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx",
  "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
  "src/app/(private)/clientsauto/hub/page.tsx"
];

let ok = 0;
let fail = 0;

console.log("[Q2-OF] Client Hub polish audit");
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
}

const page = fs.readFileSync(path.join(root, "src/components/erp/hub/ERPRecordHubPage.tsx"), "utf8");
const route = fs.readFileSync(path.join(root, "src/app/(private)/clientsauto/hub/page.tsx"), "utf8");
const resolver = fs.readFileSync(path.join(root, "src/runtime/hub/RuntimeHubRelationResolver.ts"), "utf8");
const types = fs.readFileSync(path.join(root, "src/runtime/hub/RuntimeHubTypes.ts"), "utf8");

const expected = [
  [page, "useRouter"],
  [page, "selectionQueryParam"],
  [route, "selectionQueryParam"],
  [route, "open-vehicle"],
  [route, "open-intervention"],
  [route, "open-facture"],
  [resolver, "labelFields"],
  [resolver, "actions"],
  [types, "selectionQueryParam"]
];

for (const [content, marker] of expected) {
  if (content.includes(marker)) {
    console.log("[OK] Marker detected: " + marker);
    ok += 1;
  } else {
    console.log("[FAIL] Marker missing: " + marker);
    fail += 1;
  }
}

const forbidden = ["firebase/firestore", "getDocs(", "collection("];

for (const file of files) {
  const content = fs.readFileSync(path.join(root, file), "utf8");

  for (const marker of forbidden) {
    if (content.includes(marker)) {
      console.log("[FAIL] Forbidden local Firestore marker " + marker + " in " + file);
      fail += 1;
    }
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

    if (entry.name.includes(".bak-q2of")) {
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
  console.log("[OK] No Q2-OF backup detected");
  ok += 1;
}

console.log("[OK] " + ok);
console.log("[FAIL] " + fail);

if (fail > 0) {
  process.exit(1);
}

console.log("[Q2-OF] Client Hub polish audit completed successfully.");
