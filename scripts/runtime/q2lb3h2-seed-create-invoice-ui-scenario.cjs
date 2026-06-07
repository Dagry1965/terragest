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
const USER_ID = "q2lb3h-system-seed";

const INTERVENTION_ID = "q2lb3h-create-invoice-ui-test";
const LINE_1_ID = "q2lb3h-create-invoice-ui-line-001";
const LINE_2_ID = "q2lb3h-create-invoice-ui-line-002";

const CLIENT_ID = "demo-client-new-001";
const VEHICULE_ID = "demo-vehicle-new-001";

function nowIso() {
  return new Date().toISOString();
}

function contextPath(moduleKey) {
  return `${TENANT_ID}/${WORKSPACE}/${moduleKey}`;
}

async function upsert(collection, id, data) {
  const ref = db.collection(collection).doc(id);
  const snap = await ref.get();

  await ref.set(
    {
      ...data,
      updatedAt: nowIso(),
      updatedBy: USER_ID,
      ...(snap.exists ? {} : {
        createdAt: nowIso(),
        createdBy: USER_ID,
      }),
    },
    { merge: true }
  );

  return ref;
}

async function assertNoActiveInvoice() {
  const snap = await db.collection("facturesauto")
    .where("tenantId", "==", TENANT_ID)
    .where("workspace", "==", WORKSPACE)
    .get();

  const linked = snap.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((record) => {
      const interventionId = String(record.interventionId || record.sourceRecordId || "").trim();
      return interventionId === INTERVENTION_ID && !record.deletedAt && !record.removedAt;
    });

  if (linked.length > 0) {
    throw new Error(
      `[Q2-L-B3-H2] Scenario already has active invoice(s): ${linked.map((item) => item.id).join(", ")}`
    );
  }
}

async function cleanupOldScenarioLinesAndInvoices() {
  const lineSnap = await db.collection("lignesinterventionauto")
    .where("tenantId", "==", TENANT_ID)
    .where("workspace", "==", WORKSPACE)
    .where("interventionId", "==", INTERVENTION_ID)
    .get();

  for (const doc of lineSnap.docs) {
    if (![LINE_1_ID, LINE_2_ID].includes(doc.id)) {
      await doc.ref.update({
        removedAt: nowIso(),
        removedBy: USER_ID,
        removedReason: "Q2-L-B3-H2 scenario cleanup",
      });
    }
  }
}

async function main() {
  console.log("[Q2-L-B3-H2] Seed create invoice UI scenario");

  await cleanupOldScenarioLinesAndInvoices();
  await assertNoActiveInvoice();

  await upsert("interventionsauto", INTERVENTION_ID, {
    id: INTERVENTION_ID,
    tenantId: TENANT_ID,
    workspace: WORKSPACE,
    userId: USER_ID,
    moduleKey: "interventionsauto",
    contextPath: contextPath("interventionsauto"),

    code: "Q2-L-B3-H-INTERVENTION",
    numeroIntervention: "Q2-L-B3-H-INTERVENTION",

    clientId: CLIENT_ID,
    vehiculeId: VEHICULE_ID,
    rendezVousId: "",
    rendezvousId: "",

    statut: "terminee",
    typeIntervention: "diagnostic",
    libelle: "Validation UI creation facture separee",
    description: "Scenario Q2-L-B3-H pour verifier action runtimeOnly creer-facture.",

    dateIntervention: "2026-06-07",
    montantHT: 50000,
    montantTVA: 9000,
    montantTTC: 59000,
    tva: 18,
  });

  await upsert("lignesinterventionauto", LINE_1_ID, {
    id: LINE_1_ID,
    tenantId: TENANT_ID,
    workspace: WORKSPACE,
    userId: USER_ID,
    moduleKey: "lignesinterventionauto",
    contextPath: contextPath("lignesinterventionauto"),

    interventionId: INTERVENTION_ID,
    parentModuleKey: "interventionsauto",
    parentRecordId: INTERVENTION_ID,
    parentForeignKey: "interventionId",

    code: "Q2-L-B3-H-LIGNE-001",
    designation: "Diagnostic electronique",
    typeLigne: "service",
    typeArticle: "service",
    statut: "validee",

    quantite: 1,
    prixUnitaireHT: 30000,
    montantHT: 30000,
    tauxTVA: 18,
    montantTVA: 5400,
    montantTTC: 35400,
  });

  await upsert("lignesinterventionauto", LINE_2_ID, {
    id: LINE_2_ID,
    tenantId: TENANT_ID,
    workspace: WORKSPACE,
    userId: USER_ID,
    moduleKey: "lignesinterventionauto",
    contextPath: contextPath("lignesinterventionauto"),

    interventionId: INTERVENTION_ID,
    parentModuleKey: "interventionsauto",
    parentRecordId: INTERVENTION_ID,
    parentForeignKey: "interventionId",

    code: "Q2-L-B3-H-LIGNE-002",
    designation: "Main d'oeuvre mecanique",
    typeLigne: "service",
    typeArticle: "service",
    statut: "validee",

    quantite: 1,
    prixUnitaireHT: 20000,
    montantHT: 20000,
    tauxTVA: 18,
    montantTVA: 3600,
    montantTTC: 23600,
  });

  await assertNoActiveInvoice();

  console.log("[OK] intervention", INTERVENTION_ID);
  console.log("[OK] line", LINE_1_ID);
  console.log("[OK] line", LINE_2_ID);
  console.log("[NEXT] Run q2lb3h audit again. BEST_CANDIDATE should be q2lb3h-create-invoice-ui-test.");
}

main().catch((error) => {
  console.error("[Q2-L-B3-H2][ERROR]", error);
  process.exit(1);
});