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
const INTERVENTION_ID = "q2lb3h-create-invoice-ui-test";

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

function readFile(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

async function main() {
  console.log("[Q2-L-B3-K1] Audit separated billing regression");

  const checks = [];

  function check(name, ok, details = "") {
    checks.push({ name, ok, details });
    console.log(ok ? "[OK]" : "[FAIL]", name, details);
  }

  const intervention = await getDoc("interventionsauto", INTERVENTION_ID);

  const factures = (await listByTenantWorkspace("facturesauto"))
    .filter(active)
    .filter((record) => {
      const linkedInterventionId =
        String(record.interventionId || record.sourceRecordId || "").trim();

      return linkedInterventionId === INTERVENTION_ID;
    });

  const factureIds = new Set(factures.map((facture) => facture.id));

  const lignesFacture = (await listByTenantWorkspace("lignesfactureauto"))
    .filter(active)
    .filter((record) => {
      const factureId =
        String(record.factureId || record.parentRecordId || "").trim();

      return factureIds.has(factureId);
    });

  const lignesIntervention = (await listByTenantWorkspace("lignesinterventionauto"))
    .filter(active)
    .filter((record) =>
      String(record.interventionId || "").trim() === INTERVENTION_ID
    );

  check(
    "Intervention test exists",
    Boolean(intervention),
    INTERVENTION_ID
  );

  check(
    "Intervention remains atelier status terminee",
    intervention?.statut === "terminee",
    `statut=${intervention?.statut}`
  );

  check(
    "Exactly one active invoice linked to intervention",
    factures.length === 1,
    `count=${factures.length}`
  );

  check(
    "Exactly two source intervention lines",
    lignesIntervention.length === 2,
    `count=${lignesIntervention.length}`
  );

  check(
    "Exactly two invoice lines generated",
    lignesFacture.length === 2,
    `count=${lignesFacture.length}`
  );

  const invoice = factures[0];

  check(
    "Invoice source module is interventionsauto",
    invoice?.sourceModule === "interventionsauto",
    `sourceModule=${invoice?.sourceModule}`
  );

  check(
    "Invoice source record id is intervention id",
    invoice?.sourceRecordId === INTERVENTION_ID,
    `sourceRecordId=${invoice?.sourceRecordId}`
  );

  check(
    "Invoice has accounting status emise",
    invoice?.statutFacture === "emise",
    `statutFacture=${invoice?.statutFacture}`
  );

  check(
    "Invoice payment status is en_attente",
    invoice?.statutPaiement === "en_attente",
    `statutPaiement=${invoice?.statutPaiement}`
  );

  const actionsFile =
    readFile("src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts");

  check(
    "creer-facture action exists",
    actionsFile.includes('key: "creer-facture"')
  );

  check(
    "creer-facture visible only on terminee",
    actionsFile.includes('{ field: "statut", equals: "terminee" }')
  );

  check(
    "creer-facture has relation governance",
    actionsFile.includes("disabledWhenRelationExists") &&
      actionsFile.includes('moduleKey: "facturesauto"') &&
      actionsFile.includes('foreignKey: "interventionId"')
  );

  check(
    "creer-facture has user-facing disabled reason",
    actionsFile.includes("Une facture existe déjà pour cette intervention.")
  );

  const actionEngineFile =
    readFile("src/runtime/actions/RuntimeActionEngine.ts");

  check(
    "RuntimeActionEngine has async availability resolver",
    actionEngineFile.includes("getAvailableActionsAsync")
  );

  check(
    "RuntimeActionEngine has relation governance execute guard",
    actionEngineFile.includes("getRelationGovernanceBlockReason") &&
      actionEngineFile.includes("disabledWhenRelationExists")
  );

  const runtimePageFile =
    readFile("src/components/erp/runtime/ERPRuntimePage.tsx");

  check(
    "ERPRuntimePage resolves actions asynchronously",
    runtimePageFile.includes("getAvailableActionsAsync") &&
      runtimePageFile.includes("setRuntimeActions")
  );

  const actionBarFile =
    readFile("src/components/erp/runtime/ERPRuntimeActionBar.tsx");

  check(
    "ERPRuntimeActionBar displays disabled reason",
    actionBarFile.includes("data-runtime-action-disabled-reason") &&
      actionBarFile.includes("action.description")
  );

  const failed = checks.filter((item) => !item.ok);

  console.log("");
  console.log("[SUMMARY]");
  console.log("OK:", checks.length - failed.length);
  console.log("FAIL:", failed.length);

  if (failed.length > 0) {
    process.exitCode = 1;
    return;
  }

  console.log("[Q2-L-B3-K1] OK");
}

main().catch((error) => {
  console.error("[Q2-L-B3-K1][ERROR]", error);
  process.exit(1);
});