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

    if (!process.env[key]) {
      process.env[key] = value;
    }
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
const PAYMENT_ID = "q2lc-b3-clean-balance-payment-001";

function amount(value) {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

function isValidTenantPayment(record) {
  return (
    String(record.factureId ?? "") === FACTURE_ID &&
    String(record.tenantId ?? "") === TENANT_ID &&
    String(record.workspace ?? "") === WORKSPACE &&
    String(record.statut ?? "") === "valide" &&
    !record.deletedAt &&
    !record.removedAt
  );
}

async function recomputeInvoice(factureRef, facture) {
  const paymentsSnap = await db.collection("encaissementsauto")
    .where("factureId", "==", FACTURE_ID)
    .get();

  const validPayments = paymentsSnap.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter(isValidTenantPayment);

  const montantTTC = amount(facture.montantTTC);

  const montantPaye = validPayments.reduce(
    (total, payment) => total + amount(payment.montant),
    0
  );

  const resteAPayer = Math.max(0, montantTTC - montantPaye);

  const statutPaiement =
    montantPaye <= 0
      ? "en_attente"
      : montantPaye < montantTTC
        ? "partiel"
        : "paye";

  await factureRef.update({
    montantPaye,
    resteAPayer,
    statutPaiement,
    dernierEncaissementAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    updatedBy: "q2lc-b3-clean-payment",
  });

  return {
    validPayments: validPayments.length,
    montantTTC,
    montantPaye,
    resteAPayer,
    statutPaiement,
  };
}

async function main() {
  console.log("[Q2-L-C-B3] Create clean balance payment in tenant scope");

  const factureRef = db.collection("facturesauto").doc(FACTURE_ID);
  const factureSnap = await factureRef.get();

  if (!factureSnap.exists) {
    throw new Error(`[Q2-L-C-B3] Missing facture ${FACTURE_ID}`);
  }

  const facture = { id: factureSnap.id, ...factureSnap.data() };

  if (
    String(facture.tenantId ?? "") !== TENANT_ID ||
    String(facture.workspace ?? "") !== WORKSPACE
  ) {
    throw new Error(
      `[Q2-L-C-B3] Facture tenant/workspace mismatch: ${facture.tenantId}/${facture.workspace}`
    );
  }

  const paymentRef = db.collection("encaissementsauto").doc(PAYMENT_ID);
  const paymentSnap = await paymentRef.get();

  if (paymentSnap.exists) {
    const data = paymentSnap.data();

    if (
      String(data.tenantId ?? "") === TENANT_ID &&
      String(data.workspace ?? "") === WORKSPACE &&
      String(data.factureId ?? "") === FACTURE_ID &&
      String(data.statut ?? "") === "valide" &&
      !data.deletedAt &&
      !data.removedAt
    ) {
      console.log("[SKIP] Clean balance payment already exists", PAYMENT_ID);
      const recompute = await recomputeInvoice(factureRef, facture);
      console.log("[RECOMPUTED]", recompute);
      console.log("[Q2-L-C-B3] OK");
      return;
    }

    throw new Error(
      `[Q2-L-C-B3] Payment id already exists with incompatible data: ${PAYMENT_ID}`
    );
  }

  await paymentRef.set({
    id: PAYMENT_ID,
    tenantId: TENANT_ID,
    workspace: WORKSPACE,
    userId: "q2lc-system-test",
    moduleKey: "encaissementsauto",
    contextPath: `${TENANT_ID}/${WORKSPACE}/encaissementsauto`,

    factureId: FACTURE_ID,
    parentModuleKey: "facturesauto",
    parentRecordId: FACTURE_ID,
    parentForeignKey: "factureId",

    clientId: facture.clientId,
    vehiculeId: facture.vehiculeId,
    interventionId: facture.interventionId,

    numeroRecu: "REC-Q2-L-C-B3-001",
    montant: 39000,
    datePaiement: "2026-06-07",
    modePaiement: "mobile_money",
    referenceTransaction: "Q2-L-C-B3-BALANCE",
    statut: "valide",

    notes: "Test Q2-L-C-B3 encaissement solde propre dans le bon tenant.",
    createdAt: new Date().toISOString(),
    createdBy: "q2lc-b3-clean-payment",
    updatedAt: new Date().toISOString(),
    updatedBy: "q2lc-b3-clean-payment",
  });

  console.log("[CREATED]", PAYMENT_ID);

  const recompute = await recomputeInvoice(factureRef, facture);
  console.log("[RECOMPUTED]", recompute);

  if (
    recompute.montantPaye !== 59000 ||
    recompute.resteAPayer !== 0 ||
    recompute.statutPaiement !== "paye"
  ) {
    throw new Error(
      `[Q2-L-C-B3] Unexpected recompute result: ${JSON.stringify(recompute)}`
    );
  }

  console.log("[Q2-L-C-B3] OK");
}

main().catch((error) => {
  console.error("[Q2-L-C-B3][ERROR]", error);
  process.exit(1);
});