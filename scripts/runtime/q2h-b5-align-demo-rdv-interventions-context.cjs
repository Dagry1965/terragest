const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const ROOT = process.cwd();

const TARGET_TENANT = "ORG_AMARKHYS_001";
const TARGET_WORKSPACE = "amarkhys";

const COLLECTIONS = [
  "rendezvous",
  "interventionsauto",
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

function isDemoRecord(id, data) {
  return (
    id.startsWith("demo-") ||
    String(data.clientId ?? "").startsWith("demo-client-") ||
    String(data.vehiculeId ?? "").startsWith("demo-vehicle-")
  );
}

function needsRepair(data, moduleKey) {
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

  if (!admin.apps.length) admin.initializeApp({ projectId });

  const db = admin.firestore();

  const confirm = process.argv.includes("--confirm");

  console.log("[Q2-H-B5] Align demo RDV/interventions context");
  console.log("[PROJECT]", projectId);
  console.log("[MODE]", confirm ? "CONFIRM WRITE" : "DRY-RUN ONLY");
  console.log("[TARGET]", {
    tenantId: TARGET_TENANT,
    workspace: TARGET_WORKSPACE,
  });
  console.log("");

  let scanned = 0;
  let candidates = 0;
  let written = 0;

  for (const collection of COLLECTIONS) {
    const snap = await db.collection(collection).limit(200).get();

    console.log(`[${collection}] count(limit200)=`, snap.size);

    for (const doc of snap.docs) {
      scanned += 1;

      const data = doc.data();

      if (!isDemoRecord(doc.id, data)) {
        continue;
      }

      if (!needsRepair(data, collection)) {
        continue;
      }

      candidates += 1;

      const patch = {
        tenantId: TARGET_TENANT,
        workspace: TARGET_WORKSPACE,
        moduleKey: collection,
        contextPath: `${TARGET_TENANT}/${TARGET_WORKSPACE}/${collection}`,
      };

      console.log("  [CANDIDATE]", collection, doc.id, {
        from: {
          tenantId: data.tenantId,
          workspace: data.workspace,
          moduleKey: data.moduleKey,
          contextPath: data.contextPath,
        },
        to: patch,
      });

      if (confirm) {
        await doc.ref.set(patch, { merge: true });
        written += 1;
      }
    }

    console.log("");
  }

  console.log("[SUMMARY]");
  console.log("Scanned:", scanned);
  console.log("Candidates:", candidates);
  console.log("Written:", written);
  console.log("");
  console.log(confirm ? "[RESULT] WRITE DONE" : "[RESULT] DRY-RUN ONLY");
}

main().catch((error) => {
  console.error("[ERROR]", error);
  process.exit(1);
});
