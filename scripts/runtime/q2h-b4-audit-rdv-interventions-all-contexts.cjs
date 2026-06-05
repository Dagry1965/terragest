const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const ROOT = process.cwd();

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
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

  console.log("[Q2-H-B4] Audit RDV/interventions all contexts");
  console.log("[PROJECT]", projectId);
  console.log("");

  const rdvSnap = await db.collection("rendezvous").limit(50).get();
  const itvSnap = await db.collection("interventionsauto").limit(100).get();

  const interventions = itvSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("[RENDEZVOUS]", rdvSnap.size);
  console.log("[INTERVENTIONS]", itvSnap.size);
  console.log("");

  for (const rdvDoc of rdvSnap.docs) {
    const rdv = rdvDoc.data();

    const linked = interventions.filter((itv) =>
      String(itv.rendezVousId ?? "") === rdvDoc.id ||
      String(itv.rendezvousId ?? "") === rdvDoc.id ||
      String(itv.rdvId ?? "") === rdvDoc.id
    );

    console.log("[RDV]", rdvDoc.id, {
      tenantId: rdv.tenantId,
      workspace: rdv.workspace,
      workspaceId: rdv.workspaceId,
      moduleKey: rdv.moduleKey,
      clientId: rdv.clientId,
      vehiculeId: rdv.vehiculeId,
      dateRendezVous: rdv.dateRendezVous,
      heureRendezVous: rdv.heureRendezVous,
      typeService: rdv.typeService,
      statut: rdv.statut,
      linkedInterventions: linked.length,
    });

    for (const itv of linked) {
      console.log("  [LINKED INTERVENTION]", itv.id, {
        tenantId: itv.tenantId,
        workspace: itv.workspace,
        workspaceId: itv.workspaceId,
        moduleKey: itv.moduleKey,
        rendezVousId: itv.rendezVousId,
        rendezvousId: itv.rendezvousId,
        rdvId: itv.rdvId,
        clientId: itv.clientId,
        vehiculeId: itv.vehiculeId,
        statut: itv.statut,
      });
    }
  }

  console.log("");
  console.log("[ORPHAN INTERVENTIONS WITH RDV FIELD]");
  for (const itv of interventions) {
    const rdvId = itv.rendezVousId ?? itv.rendezvousId ?? itv.rdvId;
    if (!rdvId) continue;

    const exists = rdvSnap.docs.some((doc) => doc.id === rdvId);
    if (exists) continue;

    console.log("[ORPHAN]", itv.id, {
      tenantId: itv.tenantId,
      workspace: itv.workspace,
      moduleKey: itv.moduleKey,
      rendezVousId: itv.rendezVousId,
      rendezvousId: itv.rendezvousId,
      rdvId: itv.rdvId,
      statut: itv.statut,
    });
  }

  console.log("");
  console.log("[RESULT] AUDIT ONLY — aucune donnée modifiée.");
}

main().catch((error) => {
  console.error("[ERROR]", error);
  process.exit(1);
});
