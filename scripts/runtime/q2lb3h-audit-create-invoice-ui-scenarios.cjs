const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

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

const TENANT_ID = "ORG_AMARKHYS_001";
const WORKSPACE = "amarkhys";

async function getCollection(name) {
  const snap = await db.collection(name)
    .where("tenantId", "==", TENANT_ID)
    .where("workspace", "==", WORKSPACE)
    .limit(200)
    .get();

  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

function active(record) {
  return !record.deletedAt && !record.removedAt;
}

async function main() {
  const interventions = (await getCollection("interventionsauto")).filter(active);
  const factures = (await getCollection("facturesauto")).filter(active);
  const lignes = (await getCollection("lignesinterventionauto")).filter(active);

  const factureByIntervention = new Map();
  for (const facture of factures) {
    const interventionId = String(facture.interventionId || facture.sourceRecordId || "").trim();
    if (!interventionId) continue;
    if (!factureByIntervention.has(interventionId)) factureByIntervention.set(interventionId, []);
    factureByIntervention.get(interventionId).push(facture);
  }

  const linesByIntervention = new Map();
  for (const line of lignes) {
    const interventionId = String(line.interventionId || "").trim();
    if (!interventionId) continue;
    if (!linesByIntervention.has(interventionId)) linesByIntervention.set(interventionId, []);
    linesByIntervention.get(interventionId).push(line);
  }

  const candidates = interventions
    .filter((intervention) => String(intervention.statut || "").toLowerCase() === "terminee")
    .map((intervention) => ({
      id: intervention.id,
      code: intervention.code || intervention.numeroIntervention || "",
      statut: intervention.statut,
      clientId: intervention.clientId || "",
      vehiculeId: intervention.vehiculeId || "",
      rendezVousId: intervention.rendezVousId || intervention.rendezvousId || "",
      factureCount: (factureByIntervention.get(intervention.id) || []).length,
      lineCount: (linesByIntervention.get(intervention.id) || []).length,
      facturableLineCount: (linesByIntervention.get(intervention.id) || []).filter((line) => {
        const status = String(line.statut || "").toLowerCase();
        return !line.removedAt && status !== "annulee" && status !== "annulée";
      }).length,
    }))
    .sort((a, b) => a.factureCount - b.factureCount || b.facturableLineCount - a.facturableLineCount);

  console.log("[Q2-L-B3-H] Create invoice UI scenario audit");
  console.log("[INTERVENTIONS]", interventions.length);
  console.log("[FACTURES]", factures.length);
  console.log("[LIGNES_INTERVENTION]", lignes.length);
  console.log("");

  console.table(candidates.slice(0, 20));

  const best = candidates.find((item) => item.factureCount === 0 && item.facturableLineCount > 0);
  console.log("");
  if (best) {
    console.log("[BEST_CANDIDATE]", JSON.stringify(best, null, 2));
  } else {
    console.log("[BEST_CANDIDATE] none");
    console.log("[NEXT] Create a clean test intervention with validated lines, then run UI validation.");
  }
}

main().catch((error) => {
  console.error("[Q2-L-B3-H][ERROR]", error);
  process.exit(1);
});