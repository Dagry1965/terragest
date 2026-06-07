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
const INTERVENTION_ID = "q2lb3h-create-invoice-ui-test";

async function getDoc(collection, id) {
  const snap = await db.collection(collection).doc(id).get();
  return snap.exists ? { id: snap.id, ...snap.data() } : null;
}

async function listByTenantWorkspace(collection) {
  const snap = await db.collection(collection)
    .where("tenantId", "==", TENANT_ID)
    .where("workspace", "==", WORKSPACE)
    .get();

  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

function active(record) {
  return record && !record.deletedAt && !record.removedAt;
}

async function main() {
  console.log("[Q2-L-B3-H3] Audit created invoice result");

  const intervention = await getDoc("interventionsauto", INTERVENTION_ID);
  const factures = (await listByTenantWorkspace("facturesauto"))
    .filter(active)
    .filter((record) => {
      const interventionId = String(record.interventionId || record.sourceRecordId || "").trim();
      return interventionId === INTERVENTION_ID;
    });

  const lignesFacture = (await listByTenantWorkspace("lignesfactureauto"))
    .filter(active)
    .filter((record) => {
      const factureId = String(record.factureId || record.parentRecordId || "").trim();
      return factures.some((facture) => facture.id === factureId);
    });

  const lignesIntervention = (await listByTenantWorkspace("lignesinterventionauto"))
    .filter(active)
    .filter((record) => String(record.interventionId || "").trim() === INTERVENTION_ID);

  console.log("");
  console.log("[INTERVENTION]");
  console.log({
    id: intervention?.id,
    code: intervention?.code || intervention?.numeroIntervention,
    statut: intervention?.statut,
    montantHT: intervention?.montantHT,
    montantTTC: intervention?.montantTTC,
  });

  console.log("");
  console.log("[FACTURES]", factures.length);
  console.table(factures.map((facture) => ({
    id: facture.id,
    numeroFacture: facture.numeroFacture || facture.code || "",
    statutFacture: facture.statutFacture,
    statutPaiement: facture.statutPaiement,
    interventionId: facture.interventionId || "",
    sourceModule: facture.sourceModule || "",
    sourceRecordId: facture.sourceRecordId || "",
    montantHT: facture.montantHT,
    montantTTC: facture.montantTTC,
  })));

  console.log("");
  console.log("[LIGNES_INTERVENTION]", lignesIntervention.length);
  console.table(lignesIntervention.map((line) => ({
    id: line.id,
    designation: line.designation,
    statut: line.statut,
    montantHT: line.montantHT,
    montantTTC: line.montantTTC,
  })));

  console.log("");
  console.log("[LIGNES_FACTURE]", lignesFacture.length);
  console.table(lignesFacture.map((line) => ({
    id: line.id,
    factureId: line.factureId || line.parentRecordId || "",
    designation: line.designation,
    sourceLineId: line.sourceLineId || line.ligneInterventionId || "",
    montantHT: line.montantHT,
    montantTTC: line.montantTTC,
  })));

  const ok =
    intervention?.statut === "terminee" &&
    factures.length === 1 &&
    lignesFacture.length === 2;

  console.log("");
  console.log("[CHECK]");
  console.log("intervention.statut terminee =", intervention?.statut === "terminee");
  console.log("factureCount == 1 =", factures.length === 1);
  console.log("lignesFactureCount == 2 =", lignesFacture.length === 2);

  if (!ok) {
    console.log("[Q2-L-B3-H3] FAIL");
    process.exitCode = 1;
    return;
  }

  console.log("[Q2-L-B3-H3] OK");
}

main().catch((error) => {
  console.error("[Q2-L-B3-H3][ERROR]", error);
  process.exit(1);
});