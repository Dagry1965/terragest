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

const INTERVENTION_ID = "q2lb3h-create-invoice-ui-test";
const FACTURE_ID = "g2pZWQ7lwbuQFHVNmqgQ";

async function main() {
  console.log("[Q2-L-C-B0B] Repair test invoice tenant context");

  const interventionSnap = await db.collection("interventionsauto").doc(INTERVENTION_ID).get();
  const factureRef = db.collection("facturesauto").doc(FACTURE_ID);
  const factureSnap = await factureRef.get();

  if (!interventionSnap.exists) {
    throw new Error(`[Q2-L-C-B0B] Missing intervention ${INTERVENTION_ID}`);
  }

  if (!factureSnap.exists) {
    throw new Error(`[Q2-L-C-B0B] Missing facture ${FACTURE_ID}`);
  }

  const intervention = interventionSnap.data();

  const tenantId = String(intervention.tenantId ?? "");
  const workspace = String(intervention.workspace ?? "amarkhys");

  if (!tenantId) {
    throw new Error("[Q2-L-C-B0B] Source intervention has no tenantId");
  }

  await factureRef.update({
    tenantId,
    workspace,
    userId: String(intervention.userId ?? "system"),
    moduleKey: "facturesauto",
    contextPath: `${tenantId}/${workspace}/facturesauto`,
    updatedAt: new Date().toISOString(),
    updatedBy: "q2lc-b0b-repair",
  });

  console.log("[REPAIRED]", {
    factureId: FACTURE_ID,
    tenantId,
    workspace,
    contextPath: `${tenantId}/${workspace}/facturesauto`,
  });
}

main().catch((error) => {
  console.error("[Q2-L-C-B0B][ERROR]", error);
  process.exit(1);
});