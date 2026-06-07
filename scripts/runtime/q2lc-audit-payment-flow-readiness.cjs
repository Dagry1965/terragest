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

const TENANT_ID = "ORG_AMARKHYS_001";
const WORKSPACE = "amarkhys";
const FACTURE_ID = "g2pZWQ7lwbuQFHVNmqgQ";

function active(record) {
  const status = String(record?.statut ?? record?.status ?? "").toLowerCase();
  return Boolean(record) &&
    !record.deletedAt &&
    !record.removedAt &&
    status !== "annulee" &&
    status !== "annulée";
}

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

function amount(value) {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

async function main() {
  console.log("[Q2-L-C] Audit payment flow readiness");

  const facture = await getDoc("facturesauto", FACTURE_ID);

  const encaissements = (await listByTenantWorkspace("encaissementsauto"))
    .filter(active)
    .filter((record) => String(record.factureId ?? "").trim() === FACTURE_ID);

  const totalEncaisse = encaissements.reduce(
    (sum, item) => sum + amount(item.montant ?? item.montantPaye ?? item.total),
    0
  );

  const montantTTC = amount(facture?.montantTTC);
  const montantPaye = amount(facture?.montantPaye);
  const resteAPayer = amount(facture?.resteAPayer);

  console.log("");
  console.log("[FACTURE]");
  console.log({
    id: facture?.id,
    numeroFacture: facture?.numeroFacture || facture?.code,
    statutFacture: facture?.statutFacture,
    statutPaiement: facture?.statutPaiement,
    montantTTC,
    montantPaye,
    resteAPayer,
  });

  console.log("");
  console.log("[ENCAISSEMENTS]", encaissements.length);
  console.table(encaissements.map((item) => ({
    id: item.id,
    factureId: item.factureId,
    montant: item.montant ?? item.montantPaye ?? item.total,
    datePaiement: item.datePaiement,
    modePaiement: item.modePaiement,
    statut: item.statut,
  })));

  console.log("");
  console.log("[CALCUL]");
  console.log({
    montantTTC,
    totalEncaisse,
    expectedResteAPayer: Math.max(0, montantTTC - totalEncaisse),
    currentMontantPaye: montantPaye,
    currentResteAPayer: resteAPayer,
  });

  console.log("");
  console.log("[READINESS]");
  console.log("facture exists =", Boolean(facture));
  console.log("montantTTC > 0 =", montantTTC > 0);
  console.log("encaissement count =", encaissements.length);
}

main().catch((error) => {
  console.error("[Q2-L-C][ERROR]", error);
  process.exit(1);
});