const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function loadEnv() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^"|"$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

const FACTURE_ID = "g2pZWQ7lwbuQFHVNmqgQ";
const PAYMENT_ID = "q2lc-b1-partial-payment-001";

async function main() {
  console.log("[Q2-L-C-B1B] Check payment document");

  const direct = await db.collection("encaissementsauto").doc(PAYMENT_ID).get();

  console.log("");
  console.log("[DIRECT PAYMENT DOC EXISTS]", direct.exists);

  if (direct.exists) {
    console.log({
      id: direct.id,
      ...direct.data(),
    });
  }

  const byFacture = await db.collection("encaissementsauto")
    .where("factureId", "==", FACTURE_ID)
    .get();

  console.log("");
  console.log("[PAYMENTS BY FACTURE WITHOUT TENANT FILTER]", byFacture.size);

  byFacture.docs.forEach((doc) => {
    console.log({
      id: doc.id,
      ...doc.data(),
    });
  });

  const byFactureTenant = await db.collection("encaissementsauto")
    .where("factureId", "==", FACTURE_ID)
    .where("tenantId", "==", "ORG_AMARKHYS_001")
    .where("workspace", "==", "amarkhys")
    .get();

  console.log("");
  console.log("[PAYMENTS BY FACTURE WITH TENANT FILTER]", byFactureTenant.size);

  byFactureTenant.docs.forEach((doc) => {
    console.log({
      id: doc.id,
      ...doc.data(),
    });
  });
}

main().catch((error) => {
  console.error("[Q2-L-C-B1B-CHECK][ERROR]", error);
  process.exit(1);
});