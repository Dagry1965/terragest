const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const root = "C:\\Users\\Admin\\terragest";
const interventionId = "billing-dd3-intervention";

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;

    const i = t.indexOf("=");
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");

    if (!process.env[k]) process.env[k] = v;
  }
}

async function main() {
  loadEnvLocal();

  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    process.env.GCLOUD_PROJECT;

  if (!projectId) throw new Error("Missing Firebase project id");

  if (!admin.apps.length) admin.initializeApp({ projectId });

  const db = admin.firestore();

  console.log("[PROJECT]", projectId);

  const doc = await db.collection("interventionsauto").doc(interventionId).get();

  console.log("[D-D3 INTERVENTION EXISTS]", doc.exists);

  if (!doc.exists) {
    process.exit(0);
  }

  const data = doc.data();

  console.log("[D-D3 INTERVENTION]");
  console.log({
    id: doc.id,
    tenantId: data.tenantId,
    workspace: data.workspace,
    userId: data.userId,
    clientId: data.clientId,
    vehiculeId: data.vehiculeId,
    statut: data.statut,
    code: data.code,
    numeroIntervention: data.numeroIntervention,
    titre: data.titre,
    dateIntervention: data.dateIntervention,
    montantHT: data.montantHT,
    montantTVA: data.montantTVA,
    montantTTC: data.montantTTC,
    billingModelTestScenario: data.billingModelTestScenario,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  });

  const clientId = String(data.clientId ?? "");
  const vehiculeId = String(data.vehiculeId ?? "");

  if (clientId) {
    const client = await db.collection("clientsauto").doc(clientId).get();
    console.log("[CLIENT EXISTS]", clientId, client.exists);
    if (client.exists) {
      const c = client.data();
      console.log({
        id: client.id,
        tenantId: c.tenantId,
        workspace: c.workspace,
        nom: c.nom,
        prenom: c.prenom,
        statut: c.statut,
      });
    }
  }

  if (vehiculeId) {
    const vehicle = await db.collection("vehicules").doc(vehiculeId).get();
    console.log("[VEHICLE EXISTS]", vehiculeId, vehicle.exists);
    if (vehicle.exists) {
      const v = vehicle.data();
      console.log({
        id: vehicle.id,
        tenantId: v.tenantId,
        workspace: v.workspace,
        clientId: v.clientId,
        marque: v.marque,
        modele: v.modele,
        immatriculation: v.immatriculation,
        statut: v.statut,
      });
    }
  }

  const lines = await db
    .collection("lignesinterventionauto")
    .where("interventionId", "==", interventionId)
    .get();

  console.log("[LINES INTERVENTION]", lines.size);
  lines.docs.forEach((line) => {
    const l = line.data();
    console.log({
      id: line.id,
      designation: l.designation,
      statut: l.statut,
      statutLigne: l.statutLigne,
      montantHT: l.montantHT,
      montantTTC: l.montantTTC,
    });
  });

  console.log("[SAMPLE INTERVENTIONS]");
  const sample = await db.collection("interventionsauto").limit(5).get();
  sample.docs.forEach((item) => {
    const x = item.data();
    console.log({
      id: item.id,
      tenantId: x.tenantId,
      workspace: x.workspace,
      userId: x.userId,
      clientId: x.clientId,
      vehiculeId: x.vehiculeId,
      statut: x.statut,
      code: x.code,
      numeroIntervention: x.numeroIntervention,
      titre: x.titre,
      dateIntervention: x.dateIntervention,
    });
  });
}

main().catch((error) => {
  console.error("[FAIL]", error);
  process.exit(1);
});
