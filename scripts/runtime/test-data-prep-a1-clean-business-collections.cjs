const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    console.log("[ENV] .env.local not found, using current process.env only.");
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }

  console.log("[ENV] .env.local loaded.");
}

loadEnvLocal();

const TARGET_COLLECTIONS = [
  "clientsauto",
  "vehicules",
  "rendezvous",
  "interventionsauto",
  "lignesinterventionauto",
  "facturesauto",
  "encaissementsauto",
  "produitsauto",
  "stocksauto",
  "fournisseursauto",
  "commandesstockauto",
  "lignescommandestockauto",
  "receptionsstockauto",
  "mouvementsstockauto",
];

const PROTECTED_COLLECTIONS = [
  "users",
  "utilisateurs",
  "employees",
  "employes",
  "erpUsers",
  "userProfiles",
  "tenants",
  "workspaces",
  "roles",
  "permissions",
  "runtimeSchedulingSettings",
];

const args = process.argv.slice(2);
const dryRun = !args.includes("--confirm-delete-business-data");
const batchSize = 300;

function initFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!projectId) {
    throw new Error(
      "Missing Firebase project id. Expected FIREBASE_PROJECT_ID or NEXT_PUBLIC_FIREBASE_PROJECT_ID."
    );
  }

  console.log("[FIREBASE] Project:", projectId);

  admin.initializeApp({
    projectId,
    credential: admin.credential.applicationDefault(),
  });

  return admin.firestore();
}

async function countCollection(db, collectionName) {
  const snapshot = await db.collection(collectionName).count().get();
  return snapshot.data().count || 0;
}

async function deleteCollection(db, collectionName) {
  let totalDeleted = 0;

  while (true) {
    const snapshot = await db.collection(collectionName).limit(batchSize).get();

    if (snapshot.empty) {
      break;
    }

    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    totalDeleted += snapshot.size;

    console.log(
      `[DELETE] ${collectionName}: ${totalDeleted} document(s) deleted so far`
    );
  }

  return totalDeleted;
}

async function main() {
  console.log("[TEST-DATA-PREP-A1] Business collections cleanup");
  console.log("");

  if (dryRun) {
    console.log("[MODE] DRY-RUN");
    console.log(
      "No data will be deleted. Add --confirm-delete-business-data to delete."
    );
  } else {
    console.log("[MODE] REAL DELETE");
    console.log("Business data deletion is enabled.");
  }

  console.log("");

  const protectedOverlap = TARGET_COLLECTIONS.filter((collectionName) =>
    PROTECTED_COLLECTIONS.includes(collectionName)
  );

  if (protectedOverlap.length > 0) {
    throw new Error(
      "Unsafe configuration. Target collections include protected collections: " +
        protectedOverlap.join(", ")
    );
  }

  const db = initFirebaseAdmin();

  const existingCollections = await db.listCollections();
  const existingCollectionIds = existingCollections.map((c) => c.id).sort();

  console.log("[EXISTING COLLECTIONS]");
  existingCollectionIds.forEach((collectionName) => {
    console.log("- " + collectionName);
  });

  console.log("");
  console.log("[TARGET BUSINESS COLLECTIONS]");

  const report = [];

  for (const collectionName of TARGET_COLLECTIONS) {
    const exists = existingCollectionIds.includes(collectionName);
    const count = exists ? await countCollection(db, collectionName) : 0;

    report.push({
      collectionName,
      exists,
      count,
    });

    console.log(
      `- ${collectionName}: ${exists ? "FOUND" : "MISSING"} / ${count} document(s)`
    );
  }

  console.log("");
  console.log("[PROTECTED COLLECTIONS CHECK]");

  for (const collectionName of PROTECTED_COLLECTIONS) {
    if (existingCollectionIds.includes(collectionName)) {
      const count = await countCollection(db, collectionName);
      console.log(`- ${collectionName}: PROTECTED / ${count} document(s)`);
    }
  }

  console.log("");

  const totalToDelete = report.reduce((sum, item) => sum + item.count, 0);

  console.log(`[SUMMARY] Documents targeted: ${totalToDelete}`);

  if (dryRun) {
    console.log("");
    console.log("[DRY-RUN DONE]");
    console.log("No document was deleted.");
    console.log("");
    console.log("To delete only the target business collections, run:");
    console.log(
      "node .\\scripts\\runtime\\test-data-prep-a1-clean-business-collections.cjs --confirm-delete-business-data"
    );
    return;
  }

  console.log("");
  console.log("[DELETE START]");

  let totalDeleted = 0;

  for (const item of report) {
    if (!item.exists || item.count === 0) {
      console.log(`[SKIP] ${item.collectionName}: nothing to delete`);
      continue;
    }

    const deleted = await deleteCollection(db, item.collectionName);
    totalDeleted += deleted;

    console.log(`[DONE] ${item.collectionName}: ${deleted} document(s) deleted`);
  }

  console.log("");
  console.log(`[DELETE DONE] Total deleted: ${totalDeleted}`);

  console.log("");
  console.log("[POST-CHECK]");

  for (const collectionName of TARGET_COLLECTIONS) {
    const count = await countCollection(db, collectionName);
    console.log(`- ${collectionName}: ${count} document(s) remaining`);
  }
}

main().catch((error) => {
  console.error("[ERROR]", error);
  process.exitCode = 1;
});