const fs = require("fs");
const path = require("path");

const root = process.cwd();

const requiredFiles = [
  "src/runtime/hub/RuntimeHubTypes.ts",
  "src/runtime/hub/RuntimeHubConfigResolver.ts",
  "src/runtime/hub/RuntimeHubLayoutResolver.ts",
  "src/runtime/hub/RuntimeHubKpiResolver.ts",
  "src/runtime/hub/RuntimeHubRelationResolver.ts",
  "src/runtime/hub/RuntimeHubEngine.ts",
  "src/runtime/hub/index.ts",
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/components/erp/hub/ERPRecordHubHeader.tsx",
  "src/components/erp/hub/ERPRecordHubKpiStrip.tsx",
  "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx",
  "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
  "src/components/erp/hub/index.ts",
];

const forbiddenPatterns = [
  "getDocs(",
  "collection(",
  "firebase/firestore",
  "clientsauto",
  "produitsauto",
  "amarkhys",
  "AMARKHYS",
];

let ok = 0;
let fail = 0;

console.log("[Q2-OB] Record Hub foundation audit");
console.log("[ROOT] " + root);

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);

  if (!fs.existsSync(fullPath)) {
    console.log("[FAIL] Missing file: " + file);
    fail += 1;
    continue;
  }

  console.log("[OK] Found: " + file);
  ok += 1;

  const content = fs.readFileSync(fullPath, "utf8");

  for (const pattern of forbiddenPatterns) {
    if (content.includes(pattern)) {
      console.log('[FAIL] Forbidden pattern "' + pattern + '" in ' + file);
      fail += 1;
    }
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

    if (entry.name.includes(".bak-q2ob")) {
      backups.push(fullPath);
    }
  }
}

const backups = [];
walk(root, backups);

if (backups.length > 0) {
  for (const file of backups) {
    console.log("[FAIL] Backup still present: " + path.relative(root, file));
    fail += 1;
  }
} else {
  console.log("[OK] No Q2-OB backup detected");
  ok += 1;
}

console.log("[OK] " + ok);
console.log("[WARN] 0");
console.log("[FAIL] " + fail);

if (fail > 0) {
  process.exit(1);
}

console.log("[Q2-OB] Foundation audit completed successfully.");