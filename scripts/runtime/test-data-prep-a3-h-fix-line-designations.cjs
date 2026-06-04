const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const confirmFix = process.argv.includes("--confirm-fix-line-designations");

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    console.log("[ENV] .env.local not found.");
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }

  console.log("[ENV] .env.local loaded.");
}

function initDb() {
  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    "terragest-dev";

  console.log("[FIREBASE] Project:", projectId);
  console.log("[FIREBASE] Credentials:", process.env.GOOGLE_APPLICATION_CREDENTIALS || "(default)");

  if (!admin.apps.length) {
    admin.initializeApp({
      projectId,
      credential: admin.credential.applicationDefault(),
    });
  }

  return admin.firestore();
}

function looksCorrupted(value) {
  if (typeof value !== "string") {
    return false;
  }

  return (
    value.includes("Ã") ||
    value.includes("Â") ||
    value.includes("â€") ||
    value.includes("�") ||
    value.length > 180
  );
}

async function main() {
  console.log("[TEST-DATA-PREP-A3-H] Fix corrupted line designations");
  console.log(confirmFix ? "[MODE] REAL FIX" : "[MODE] DRY-RUN");

  loadEnvLocal();

  const db = initDb();

  const snap = await db.collection("lignesinterventionauto").get();

  const candidates = [];

  for (const doc of snap.docs) {
    const data = doc.data();

    if (!looksCorrupted(data.designation)) {
      continue;
    }

    const produitId = data.produitId || "";

    if (!produitId) {
      candidates.push({
        id: doc.id,
        produitId,
        oldLength: String(data.designation || "").length,
        newDesignation: "",
        status: "NO_PRODUCT_ID",
      });
      continue;
    }

    const productDoc = await db.collection("produitsauto").doc(produitId).get();

    if (!productDoc.exists) {
      candidates.push({
        id: doc.id,
        produitId,
        oldLength: String(data.designation || "").length,
        newDesignation: "",
        status: "PRODUCT_NOT_FOUND",
      });
      continue;
    }

    const product = productDoc.data();
    const newDesignation = product.nom || product.designation || "";

    candidates.push({
      id: doc.id,
      produitId,
      oldLength: String(data.designation || "").length,
      newDesignation,
      status: newDesignation ? "READY" : "EMPTY_PRODUCT_NAME",
    });
  }

  console.log(`[CANDIDATES] ${candidates.length}`);

  for (const item of candidates) {
    console.log(`- ${item.id} | ${item.status} | produitId=${item.produitId} | oldLength=${item.oldLength} | new="${item.newDesignation}"`);
  }

  const ready = candidates.filter((item) => item.status === "READY");

  if (!confirmFix) {
    console.log("");
    console.log("[DRY-RUN DONE]");
    console.log("To apply the fix, run:");
    console.log("node .\\scripts\\runtime\\test-data-prep-a3-h-fix-line-designations.cjs --confirm-fix-line-designations");
    return;
  }

  console.log("");
  console.log("[FIX START]");

  for (const item of ready) {
    await db.collection("lignesinterventionauto").doc(item.id).set(
      {
        designation: item.newDesignation,
        updatedAt: new Date().toISOString(),
        mojibakeFixedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    console.log(`[FIXED] lignesinterventionauto/${item.id} -> ${item.newDesignation}`);
  }

  console.log("[FIX DONE]");
  console.log(`[FIXED COUNT] ${ready.length}`);
}

main().catch((error) => {
  console.error("[ERROR]", error);
  process.exitCode = 1;
});