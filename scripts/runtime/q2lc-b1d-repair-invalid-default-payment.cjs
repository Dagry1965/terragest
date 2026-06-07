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

async function main() {
  console.log("[Q2-L-C-B1D] Repair invalid default-tenant payment");

  const factureRef = db.collection("facturesauto").doc(FACTURE_ID);
  const factureSnap = await factureRef.get();

  if (!factureSnap.exists) {
    throw new Error(`[Q2-L-C-B1D] Missing facture ${FACTURE_ID}`);
  }

  const facture = { id: factureSnap.id, ...factureSnap.data() };

  const paymentsSnap = await db.collection("encaissementsauto")
    .where("factureId", "==", FACTURE_ID)
    .get();

  console.log("[PAYMENTS FOUND]", paymentsSnap.size);

  for (const doc of paymentsSnap.docs) {
    const data = doc.data();

    console.log("[PAYMENT]", {
      docId: doc.id,
      dataId: data.id,
      tenantId: data.tenantId,
      workspace: data.workspace,
      statut: data.statut,
      montant: data.montant,
      referenceTransaction: data.referenceTransaction,
    });

    const sameTenant =
      String(data.tenantId ?? "") === TENANT_ID &&
      String(data.workspace ?? "") === WORKSPACE;

    if (!sameTenant && String(data.statut ?? "") === "valide") {
      await doc.ref.update({
        statut: "annule",
        removedAt: new Date().toISOString(),
        removedBy: "q2lc-b1d-repair",
        removedReason:
          "Encaissement de test créé hors tenant cible. Exclu du recalcul paiement.",
      });

      console.log("[REPAIRED INVALID PAYMENT]", doc.id);
    }
  }

  const refreshedSnap = await db.collection("encaissementsauto")
    .where("factureId", "==", FACTURE_ID)
    .get();

  const validPayments = refreshedSnap.docs
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
    updatedAt: new Date().toISOString(),
    updatedBy: "q2lc-b1d-repair",
  });

  console.log("[FACTURE REPAIRED]", {
    factureId: FACTURE_ID,
    montantTTC,
    validTenantPayments: validPayments.length,
    montantPaye,
    resteAPayer,
    statutPaiement,
  });
}

main().catch((error) => {
  console.error("[Q2-L-C-B1D][ERROR]", error);
  process.exit(1);
});