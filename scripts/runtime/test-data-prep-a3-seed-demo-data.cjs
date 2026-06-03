const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const ROOT = process.cwd();
const EXPECTED_PROJECT_ID = "terragest-dev";

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
  "rappelsauto",
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

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");

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

  if (projectId !== EXPECTED_PROJECT_ID) {
    throw new Error(
      `Unsafe project. Expected ${EXPECTED_PROJECT_ID}, received ${projectId}.`
    );
  }

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error(
      "Missing GOOGLE_APPLICATION_CREDENTIALS. Set it to the local Firebase service account JSON."
    );
  }

  if (!fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    throw new Error(
      "GOOGLE_APPLICATION_CREDENTIALS file not found: " +
        process.env.GOOGLE_APPLICATION_CREDENTIALS
    );
  }

  console.log("[FIREBASE] Project:", projectId);
  console.log("[FIREBASE] Credentials:", process.env.GOOGLE_APPLICATION_CREDENTIALS);

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

async function assertSafeTargetCollections() {
  const protectedOverlap = TARGET_COLLECTIONS.filter((collectionName) =>
    PROTECTED_COLLECTIONS.includes(collectionName)
  );

  if (protectedOverlap.length > 0) {
    throw new Error(
      "Unsafe configuration. Target collections include protected collections: " +
        protectedOverlap.join(", ")
    );
  }
}

async function assertBusinessCollectionsAreEmpty(db) {
  console.log("[GUARD] Checking target business collections are empty.");

  const nonEmpty = [];

  for (const collectionName of TARGET_COLLECTIONS) {
    const count = await countCollection(db, collectionName);
    console.log(`- ${collectionName}: ${count}`);

    if (count > 0) {
      nonEmpty.push({ collectionName, count });
    }
  }

  if (nonEmpty.length > 0) {
    const details = nonEmpty
      .map((item) => `${item.collectionName}=${item.count}`)
      .join(", ");

    throw new Error(
      "Seed aborted. Target business collections are not empty: " + details
    );
  }

  console.log("[GUARD] OK — target business collections are empty.");
}

async function main() {
  console.log("[TEST-DATA-PREP-A3-C1-A] Seed skeleton + guards");
  console.log("");

  loadEnvLocal();
  await assertSafeTargetCollections();

  const db = initFirebaseAdmin();

  await assertBusinessCollectionsAreEmpty(db);

  console.log("");
  console.log("[C1-A DONE]");
  console.log("Environment, credentials, project and empty collection guards are valid.");
  console.log("No document was written to Firestore.");
}

main().catch((error) => {
  console.error("[ERROR]", error);
  process.exitCode = 1;
});