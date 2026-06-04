const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const root = "C:\\Users\\Admin\\terragest";
const passName = "BILLING-MODEL-D-D3-C";

const interventionIds = [
  "billing-dd1-intervention",
  "billing-dd2-intervention",
  "billing-dd3-intervention",
];

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

  console.log(`[${passName}] Project: ${projectId}`);

  const rows = [];

  for (const interventionId of interventionIds) {
    const interventionDoc = await db.collection("interventionsauto").doc(interventionId).get();
    const intervention = interventionDoc.exists ? interventionDoc.data() : null;

    const factureSnap = await db
      .collection("facturesauto")
      .where("interventionId", "==", interventionId)
      .get();

    const factures = factureSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const factureIds = new Set(factures.map((f) => f.id));

    const linesSnap = await db
      .collection("lignesfactureauto")
      .where("interventionId", "==", interventionId)
      .get();

    const lines = linesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const sourceLinesSnap = await db
      .collection("lignesinterventionauto")
      .where("interventionId", "==", interventionId)
      .get();

    rows.push({
      interventionId,
      exists: interventionDoc.exists,
      statut: intervention?.statut,
      tenantId: intervention?.tenantId,
      workspace: intervention?.workspace,
      userId: intervention?.userId,
      factures: factures.length,
      factureIds: [...factureIds].join(", "),
      lignesIntervention: sourceLinesSnap.size,
      lignesFacture: lines.length,
    });
  }

  console.table(rows);

  const reportPath = path.join(
    root,
    "docs",
    "audits",
    "BILLING-MODEL-D-D3-C-audit-three-billing-scenarios.md"
  );

  let report = "# BILLING-MODEL-D-D3-C — Audit des 3 scénarios facturation\n\n";
  report += "## Résultat attendu\n\n";
  report += "- 3 interventions D-D1 / D-D2 / D-D3.\n";
  report += "- 3 factures au total après finalisation.\n";
  report += "- 6 lignes facture au total.\n\n";
  report += "## État constaté\n\n";

  for (const row of rows) {
    report += `- ${row.interventionId}: statut=${row.statut}, factures=${row.factures}, lignesIntervention=${row.lignesIntervention}, lignesFacture=${row.lignesFacture}, factureIds=${row.factureIds}\n`;
  }

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, report, "utf8");

  console.log(`[${passName}] Report: ${path.relative(root, reportPath)}`);
}

main().catch((error) => {
  console.error(`[${passName}] FAIL`, error);
  process.exit(1);
});
