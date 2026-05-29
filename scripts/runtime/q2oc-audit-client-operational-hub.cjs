const fs = require("fs");
const path = require("path");

const root = process.cwd();

const requiredFiles = [
  "src/runtime/hub/RuntimeClientOperationalHubLoader.ts",
  "src/app/(private)/clientsauto/hub/page.tsx",
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/runtime/hub/RuntimeHubEngine.ts",
];

const forbiddenPatterns = [
  "firebase/firestore",
  "getDocs(",
  "collection(",
];

let ok = 0;
let fail = 0;

console.log("[Q2-OC] Client Operational Hub audit");
console.log("[ROOT] " + root);

for (const file of requiredFiles) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    console.log("[FAIL] Missing file: " + file);
    fail += 1;
    continue;
  }

  console.log("[OK] Found: " + file);
  ok += 1;

  const content = fs.readFileSync(full, "utf8");

  for (const pattern of forbiddenPatterns) {
    if (content.includes(pattern)) {
      console.log("[FAIL] Forbidden Firestore-local pattern " + pattern + " in " + file);
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

    if (entry.name.includes(".bak-q2oc")) {
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
  console.log("[OK] No Q2-OC backup detected");
  ok += 1;
}

console.log("[OK] " + ok);
console.log("[FAIL] " + fail);

if (fail > 0) {
  process.exit(1);
}

console.log("[Q2-OC] Client hub audit completed successfully.");