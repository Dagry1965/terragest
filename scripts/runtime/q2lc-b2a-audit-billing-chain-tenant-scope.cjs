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

async function getDoc(collection, id) {
  const snap = await db.collection(collection).doc(id).get();
  return snap.exists ? { id: snap.id, ...snap.data() } : null;
}

function pick(record) {
  if (!record) return null;

  return {
    id: record.id,
    tenantId: record.tenantId,
    workspace: record.workspace,
    userId: record.userId,
    moduleKey: record.moduleKey,
    contextPath: record.contextPath,
    statut: record.statut,
    statutFacture: record.statutFacture,
    statutPaiement: record.statutPaiement,
    clientId: record.clientId,
    vehiculeId: record.vehiculeId,
    interventionId: record.interventionId,
    factureId: record.factureId,
    sourceModule: record.sourceModule,
    sourceRecordId: record.sourceRecordId,
    montantTTC: record.montantTTC,
    montantPaye: record.montantPaye,
    resteAPayer: record.resteAPayer,
  };
}

async function listByField(collection, field, value) {
  const snap = await db.collection(collection)
    .where(field, "==", value)
    .get();

  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function main() {
  console.log("[Q2-L-C-B2A] Audit billing chain tenant scope");

  const intervention = await getDoc("interventionsauto", INTERVENTION_ID);
  const facture = await getDoc("facturesauto", FACTURE_ID);
  const lignesIntervention = await listByField("lignesinterventionauto", "interventionId", INTERVENTION_ID);
  const facturesByIntervention = await listByField("facturesauto", "interventionId", INTERVENTION_ID);
  const lignesFacture = await listByField("lignesfactureauto", "factureId", FACTURE_ID);
  const encaissements = await listByField("encaissementsauto", "factureId", FACTURE_ID);

  console.log("");
  console.log("[INTERVENTION]");
  console.log(pick(intervention));

  console.log("");
  console.log("[FACTURE DIRECT]");
  console.log(pick(facture));

  console.log("");
  console.log("[FACTURES BY INTERVENTION]", facturesByIntervention.length);
  facturesByIntervention.forEach((item) => console.log(pick(item)));

  console.log("");
  console.log("[LIGNES INTERVENTION]", lignesIntervention.length);
  lignesIntervention.forEach((item) => console.log(pick(item)));

  console.log("");
  console.log("[LIGNES FACTURE]", lignesFacture.length);
  lignesFacture.forEach((item) => console.log(pick(item)));

  console.log("");
  console.log("[ENCAISSEMENTS]", encaissements.length);
  encaissements.forEach((item) => console.log(pick(item)));

  console.log("");
  console.log("[TENANT CONSISTENCY]");
  const expectedTenant = intervention?.tenantId;
  const expectedWorkspace = intervention?.workspace;

  console.log({
    expectedTenant,
    expectedWorkspace,
    factureMatchesIntervention:
      facture?.tenantId === expectedTenant &&
      facture?.workspace === expectedWorkspace,
    lignesFactureAllMatch:
      lignesFacture.every((item) =>
        item.tenantId === facture?.tenantId &&
        item.workspace === facture?.workspace
      ),
    encaissementsAllMatch:
      encaissements.every((item) =>
        item.tenantId === facture?.tenantId &&
        item.workspace === facture?.workspace
      ),
  });
}

main().catch((error) => {
  console.error("[Q2-L-C-B2A][ERROR]", error);
  process.exit(1);
});