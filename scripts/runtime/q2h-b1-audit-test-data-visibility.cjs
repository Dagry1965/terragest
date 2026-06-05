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

  if (!projectId) {
    throw new Error("Missing Firebase project id");
  }

  if (!admin.apps.length) {
    admin.initializeApp({ projectId });
  }

  const db = admin.firestore();

  const collections = [
    "clientsauto",
    "vehicules",
    "rendezvous",
    "interventionsauto",
    "lignesinterventionauto",
    "facturesauto",
    "encaissementsauto",
    "echeancespaiementauto",
  ];

  console.log("[Q2-H-B1] Test data visibility audit");
  console.log("[PROJECT]", projectId);
  console.log("");

  for (const collection of collections) {
    const snap = await db.collection(collection).limit(50).get();

    console.log(`[${collection}] count(limit50)=`, snap.size);

    const byContext = {};

    for (const doc of snap.docs) {
      const data = doc.data();

      const key = [
        data.tenantId ?? "NO_TENANT",
        data.workspace ?? data.workspaceId ?? "NO_WORKSPACE",
        data.moduleKey ?? "NO_MODULE",
      ].join(" / ");

      byContext[key] = (byContext[key] ?? 0) + 1;
    }

    for (const [context, count] of Object.entries(byContext)) {
      console.log("  -", context, "=>", count);
    }

    if (collection === "rendezvous") {
      console.log("  [SAMPLE RDV]");
      for (const doc of snap.docs.slice(0, 5)) {
        const data = doc.data();
        console.log("  -", doc.id, {
          tenantId: data.tenantId,
          workspace: data.workspace,
          workspaceId: data.workspaceId,
          moduleKey: data.moduleKey,
          clientId: data.clientId,
          vehiculeId: data.vehiculeId,
          dateRendezVous: data.dateRendezVous,
          heureRendezVous: data.heureRendezVous,
          typeService: data.typeService,
          statut: data.statut,
        });
      }
    }

    console.log("");
  }
}

main().catch((error) => {
  console.error("[ERROR]", error);
  process.exit(1);
});
