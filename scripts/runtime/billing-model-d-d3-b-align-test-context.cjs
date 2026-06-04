const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const root = "C:\\Users\\Admin\\terragest";
const passName = "BILLING-MODEL-D-D3-B";

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

  if (!admin.apps.length) {
    admin.initializeApp({ projectId });
  }

  const db = admin.firestore();

  const tenantId = "ORG_AMARKHYS_001";
  const workspace = "amarkhys";
  const userId = "RGHcNSezlSbFQDUJQBUBfy0vMo13";

  const interventionId = "billing-dd3-intervention";
  const lineIds = [
    "billing-dd3-line-diagnostic",
    "billing-dd3-line-main-oeuvre",
  ];

  const now = new Date().toISOString();

  const batch = db.batch();

  batch.set(
    db.collection("interventionsauto").doc(interventionId),
    {
      tenantId,
      workspace,
      userId,
      statut: "en_cours",
      updatedAt: now,
    },
    { merge: true }
  );

  for (const lineId of lineIds) {
    batch.set(
      db.collection("lignesinterventionauto").doc(lineId),
      {
        tenantId,
        workspace,
        userId,
        updatedAt: now,
      },
      { merge: true }
    );
  }

  await batch.commit();

  const reportPath = path.join(
    root,
    "docs",
    "audits",
    "BILLING-MODEL-D-D3-B-align-test-context.md"
  );

  let report = "# BILLING-MODEL-D-D3-B — Alignement contexte scénario test\n\n";
  report += "## Résultat\n\n";
  report += `- Intervention : \`${interventionId}\`\n`;
  report += `- tenantId : \`${tenantId}\`\n`;
  report += `- workspace : \`${workspace}\`\n`;
  report += `- userId : \`${userId}\`\n`;
  report += "- Statut remis à `en_cours` pour permettre le test UI.\n";
  report += "- Les 2 lignes intervention D-D3 sont alignées sur le même contexte.\n\n";
  report += "## Cause\n\n";
  report += "- Le scénario D-D3 avait été créé avec `tenantId = demo-tenant` et `userId = seed-billing-dd3`.\n";
  report += "- Le runtime détail filtrait donc le record hors contexte, provoquant un 404.\n";

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, report, "utf8");

  console.log(`[${passName}] DONE`);
  console.log(`[${passName}] Intervention aligned: ${interventionId}`);
  console.log(`[${passName}] tenantId=${tenantId}`);
  console.log(`[${passName}] userId=${userId}`);
  console.log(`[${passName}] Report: ${path.relative(root, reportPath)}`);
}

main().catch((error) => {
  console.error(`[${passName}] FAIL`, error);
  process.exit(1);
});
