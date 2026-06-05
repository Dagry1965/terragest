const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const ROOT = process.cwd();

const TARGET_TENANT = "ORG_AMARKHYS_001";
const TARGET_WORKSPACE = "amarkhys";

const modules = [
  "clientsauto",
  "vehicules",
  "rendezvous",
  "interventionsauto",
  "lignesinterventionauto",
  "facturesauto",
  "encaissementsauto",
  "echeancespaiementauto",
];

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

function needsContextRepair(data, moduleKey) {
  return (
    data.tenantId !== TARGET_TENANT ||
    data.workspace !== TARGET_WORKSPACE ||
    data.moduleKey !== moduleKey
  );
}

async function main() {
  loadEnvLocal();

  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    process.env.GCLOUD_PROJECT;

  if (!projectId) throw new Error("Missing Firebase project id");

  if (!admin.apps.length) {
    admin.initializeApp({ projectId });
  }

  const db = admin.firestore();

  console.log("[Q2-H-B2] DRY-RUN alignement contexte données de test");
  console.log("[PROJECT]", projectId);
  console.log("[TARGET]", {
    tenantId: TARGET_TENANT,
    workspace: TARGET_WORKSPACE,
  });
  console.log("");

  let total = 0;
  let toRepair = 0;

  for (const moduleKey of modules) {
    const snap = await db.collection(moduleKey).limit(200).get();

    let moduleRepair = 0;

    console.log(`[${moduleKey}] count(limit200)=`, snap.size);

    for (const doc of snap.docs) {
      total += 1;

      const data = doc.data();

      if (!needsContextRepair(data, moduleKey)) continue;

      toRepair += 1;
      moduleRepair += 1;

      console.log("  [WOULD_REPAIR]", doc.id, {
        from: {
          tenantId: data.tenantId,
          workspace: data.workspace,
          workspaceId: data.workspaceId,
          moduleKey: data.moduleKey,
        },
        to: {
          tenantId: TARGET_TENANT,
          workspace: TARGET_WORKSPACE,
          moduleKey,
        },
      });
    }

    console.log(`  repair candidates: ${moduleRepair}`);
    console.log("");
  }

  console.log("[SUMMARY]");
  console.log("Documents scanned:", total);
  console.log("Repair candidates:", toRepair);
  console.log("");
  console.log("[RESULT] DRY-RUN ONLY — aucune donnée modifiée.");
}

main().catch((error) => {
  console.error("[ERROR]", error);
  process.exit(1);
});
