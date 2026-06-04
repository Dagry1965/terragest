const fs = require("fs");
const path = require("path");

const root = process.cwd();
const passName = "BILLING-MODEL-D-D2-A";

const interventionId = "billing-dd1-intervention";

function log(message, data) {
  if (data === undefined) {
    console.log(`[${passName}] ${message}`);
  } else {
    console.log(`[${passName}] ${message}`, data);
  }
}

function fail(message) {
  console.error(`[${passName}] FAIL: ${message}`);
  process.exit(1);
}

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const content = fs.readFileSync(envPath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalIndex = trimmed.indexOf("=");

    if (equalIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalIndex).trim();
    let value = trimmed.slice(equalIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

async function main() {
  loadEnvLocal();

  let admin;

  try {
    admin = require("firebase-admin");
  } catch {
    fail("firebase-admin is not available.");
  }

  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    process.env.GCLOUD_PROJECT;

  if (!projectId) {
    fail("Missing Firebase project id.");
  }

  if (!admin.apps.length) {
    admin.initializeApp({ projectId });
  }

  const db = admin.firestore();

  log(`Project: ${projectId}`);
  log(`Intervention: ${interventionId}`);

  const interventionDoc = await db
    .collection("interventionsauto")
    .doc(interventionId)
    .get();

  if (!interventionDoc.exists) {
    fail(`Intervention not found: ${interventionId}`);
  }

  const intervention = {
    id: interventionDoc.id,
    ...interventionDoc.data(),
  };

  log("Intervention statut", intervention.statut);
  log("Intervention montants", {
    montantHT: intervention.montantHT,
    montantTVA: intervention.montantTVA,
    montantTTC: intervention.montantTTC,
  });

  const lignesInterventionSnapshot = await db
    .collection("lignesinterventionauto")
    .where("interventionId", "==", interventionId)
    .get();

  const lignesIntervention = lignesInterventionSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  log("Lignes intervention count", lignesIntervention.length);
  console.table(
    lignesIntervention.map((line) => ({
      id: line.id,
      designation: line.designation,
      statut: line.statut,
      statutLigne: line.statutLigne,
      removedAt: line.removedAt,
      montantHT: line.montantHT,
      montantTTC: line.montantTTC,
    }))
  );

  const facturesSnapshot = await db
    .collection("facturesauto")
    .where("interventionId", "==", interventionId)
    .get();

  const factures = facturesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  log("Factures count", factures.length);
  console.table(
    factures.map((facture) => ({
      id: facture.id,
      numeroFacture: facture.numeroFacture,
      statutFacture: facture.statutFacture,
      statutPaiement: facture.statutPaiement,
      montantHT: facture.montantHT,
      montantTTC: facture.montantTTC,
      sourceModule: facture.sourceModule,
      sourceRecordId: facture.sourceRecordId,
      sourceLabel: facture.sourceLabel,
    }))
  );

  const allInvoiceLinesSnapshot = await db
    .collection("lignesfactureauto")
    .get();

  const allInvoiceLines = allInvoiceLinesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const invoiceIds = new Set(factures.map((facture) => String(facture.id)));

  const linesByFactureId = allInvoiceLines.filter((line) =>
    invoiceIds.has(String(line.factureId ?? ""))
  );

  const linesByInterventionId = allInvoiceLines.filter(
    (line) => String(line.interventionId ?? "") === interventionId
  );

  const linesBySourceRecordId = allInvoiceLines.filter(
    (line) => String(line.sourceRecordId ?? "") === interventionId
  );

  log("lignesfactureauto total count", allInvoiceLines.length);
  log("lignesfactureauto linked by factureId count", linesByFactureId.length);
  log("lignesfactureauto linked by interventionId count", linesByInterventionId.length);
  log("lignesfactureauto linked by sourceRecordId count", linesBySourceRecordId.length);

  console.log("\n[LINES BY FACTURE ID]");
  console.table(
    linesByFactureId.map((line) => ({
      id: line.id,
      factureId: line.factureId,
      interventionId: line.interventionId,
      designation: line.designation,
      montantHT: line.montantHT,
      montantTTC: line.montantTTC,
      sourceModule: line.sourceModule,
      sourceRecordId: line.sourceRecordId,
      sourceLineId: line.sourceLineId,
    }))
  );

  console.log("\n[LINES BY INTERVENTION ID]");
  console.table(
    linesByInterventionId.map((line) => ({
      id: line.id,
      factureId: line.factureId,
      interventionId: line.interventionId,
      designation: line.designation,
      montantHT: line.montantHT,
      montantTTC: line.montantTTC,
      sourceModule: line.sourceModule,
      sourceRecordId: line.sourceRecordId,
      sourceLineId: line.sourceLineId,
    }))
  );

  const reportPath = path.join(
    root,
    "docs",
    "audits",
    "BILLING-MODEL-D-D2-A-diagnose-created-invoice-lines.md"
  );

  let report = "# BILLING-MODEL-D-D2-A — Diagnostic facture et lignes facture\n\n";

  report += "## Scénario\n\n";
  report += `- Intervention : \`${interventionId}\`\n`;
  report += `- Statut intervention : \`${intervention.statut}\`\n`;
  report += `- Lignes intervention : ${lignesIntervention.length}\n`;
  report += `- Factures liées : ${factures.length}\n`;
  report += `- Lignes facture liées par factureId : ${linesByFactureId.length}\n`;
  report += `- Lignes facture liées par interventionId : ${linesByInterventionId.length}\n`;
  report += `- Lignes facture liées par sourceRecordId : ${linesBySourceRecordId.length}\n\n`;

  report += "## Factures\n\n";
  for (const facture of factures) {
    report += `- \`${facture.id}\` / ${facture.numeroFacture} / sourceModule=${facture.sourceModule} / sourceRecordId=${facture.sourceRecordId} / montantTTC=${facture.montantTTC}\n`;
  }

  report += "\n## Lignes facture par factureId\n\n";
  for (const line of linesByFactureId) {
    report += `- \`${line.id}\` / factureId=${line.factureId} / interventionId=${line.interventionId} / ${line.designation} / ${line.montantTTC} / sourceLineId=${line.sourceLineId}\n`;
  }

  report += "\n## Diagnostic attendu\n\n";
  if (factures.length > 0 && linesByFactureId.length === 0) {
    report += "- KO : facture créée, mais aucune ligne facture rattachée par factureId.\n";
  } else if (factures.length > 0 && linesByFactureId.length > 0) {
    report += "- OK base : les lignes facture existent. Si elles ne s'affichent pas, problème panneau enfant / affichage.\n";
  } else {
    report += "- KO : aucune facture liée à l'intervention.\n";
  }

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, report, "utf8");

  log(`Report: ${path.relative(root, reportPath)}`);
}

main().catch((error) => {
  console.error(`[${passName}] FAIL`, error);
  process.exit(1);
});
