const fs = require("fs");
const path = require("path");

const root = process.cwd();
const passName = "BILLING-MODEL-D-D2";

const scenarioKey = "D-D2";
const interventionId = "billing-dd2-intervention";
const line1Id = "billing-dd2-line-diagnostic";
const line2Id = "billing-dd2-line-main-oeuvre";

const reportPath = path.join(
  root,
  "docs",
  "audits",
  "BILLING-MODEL-D-D2-seed-invoice-line-test-scenario.md"
);

function log(message) {
  console.log(`[${passName}] ${message}`);
}

function fail(message) {
  console.error(`[${passName}] FAIL: ${message}`);
  process.exit(1);
}

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");

  if (!fs.existsSync(envPath)) {
    log("No .env.local found. Continuing with process env.");
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

function money(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

async function main() {
  loadEnvLocal();

  let admin;

  try {
    admin = require("firebase-admin");
  } catch {
    fail("firebase-admin is not available. Use an existing Firestore seed script pattern if your project uses another admin loader.");
  }

  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    process.env.GCLOUD_PROJECT;

  if (!projectId) {
    fail("Missing Firebase project id. Expected NEXT_PUBLIC_FIREBASE_PROJECT_ID or FIREBASE_PROJECT_ID.");
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      projectId,
    });
  }

  const db = admin.firestore();

  log(`Project: ${projectId}`);

  const existingIntervention = await db
    .collection("interventionsauto")
    .doc(interventionId)
    .get();

  const existingFactures = await db
    .collection("facturesauto")
    .where("interventionId", "==", interventionId)
    .get();

  if (existingIntervention.exists) {
    log(`Scenario intervention already exists: ${interventionId}`);
  }

  if (!existingFactures.empty) {
    fail(`A facture already exists for ${interventionId}. Refusing to seed a polluted D-D2 scenario.`);
  }

  const clientsSnapshot = await db
    .collection("clientsauto")
    .limit(20)
    .get();

  if (clientsSnapshot.empty) {
    fail("No clientsauto document found. Seed clients first.");
  }

  const vehiculesSnapshot = await db
    .collection("vehicules")
    .limit(50)
    .get();

  if (vehiculesSnapshot.empty) {
    fail("No vehicules document found. Seed vehicles first.");
  }

  const clients = clientsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const vehicules = vehiculesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  let selectedVehicle = null;
  let selectedClient = null;

  for (const vehicle of vehicules) {
    const vehicleClientId = String(vehicle.clientId ?? "");
    const client = clients.find((item) => item.id === vehicleClientId);

    if (client) {
      selectedVehicle = vehicle;
      selectedClient = client;
      break;
    }
  }

  if (!selectedVehicle) {
    selectedVehicle = vehicules[0];
    selectedClient =
      clients.find((client) => client.id === String(selectedVehicle.clientId ?? "")) ||
      clients[0];
  }

  const clientId = String(selectedClient.id);
  const vehiculeId = String(selectedVehicle.id);

  const tenantId =
    selectedClient.tenantId ||
    selectedVehicle.tenantId ||
    "demo-tenant";

  const workspace =
    selectedClient.workspace ||
    selectedVehicle.workspace ||
    "amarkhys";

  const userId =
    selectedClient.userId ||
    selectedVehicle.userId ||
    "seed-billing-dd2";

  const tauxTVA = 18;

  const line1HT = 25000;
  const line2HT = 40000;

  const line1TVA = money(line1HT * tauxTVA / 100);
  const line2TVA = money(line2HT * tauxTVA / 100);

  const line1TTC = money(line1HT + line1TVA);
  const line2TTC = money(line2HT + line2TVA);

  const montantHT = money(line1HT + line2HT);
  const montantTVA = money(line1TVA + line2TVA);
  const montantTTC = money(line1TTC + line2TTC);

  const now = new Date().toISOString();

  const interventionPayload = {
    billingModelTestScenario: scenarioKey,
    code: "BILL-D-D2-INTERVENTION",
    numeroIntervention: "BILL-D-D2-INTERVENTION",
    titre: "Test facturation lignes depuis intervention",
    description:
      "Scénario contrôlé D-D2 : intervention avec deux lignes validées, sans facture initiale.",
    clientId,
    vehiculeId,
    statut: "en_cours",
    dateIntervention: now.split("T")[0],
    montantHT,
    montantTVA,
    tva: tauxTVA,
    montantTTC,
    coutTotal: montantHT,
    tenantId,
    workspace,
    userId,
    createdAt: now,
    updatedAt: now,
  };

  const lineBase = {
    billingModelTestScenario: scenarioKey,
    interventionId,
    clientId,
    vehiculeId,
    statutLigne: "validee",
    statut: "validee",
    tauxTVA,
    tenantId,
    workspace,
    userId,
    createdAt: now,
    updatedAt: now,
  };

  const line1Payload = {
    ...lineBase,
    code: "BILL-D-D2-L1",
    designation: "Diagnostic électronique D-D2",
    description: "Ligne test diagnostic pour génération ligne facture.",
    typeLigne: "service",
    quantite: 1,
    prixUnitaireHT: line1HT,
    montantHT: line1HT,
    montantTVA: line1TVA,
    montantTTC: line1TTC,
  };

  const line2Payload = {
    ...lineBase,
    code: "BILL-D-D2-L2",
    designation: "Main d’œuvre atelier D-D2",
    description: "Ligne test main d’œuvre pour génération ligne facture.",
    typeLigne: "main_oeuvre",
    quantite: 2,
    prixUnitaireHT: 20000,
    montantHT: line2HT,
    montantTVA: line2TVA,
    montantTTC: line2TTC,
  };

  const batch = db.batch();

  batch.set(
    db.collection("interventionsauto").doc(interventionId),
    interventionPayload,
    { merge: true }
  );

  batch.set(
    db.collection("lignesinterventionauto").doc(line1Id),
    line1Payload,
    { merge: true }
  );

  batch.set(
    db.collection("lignesinterventionauto").doc(line2Id),
    line2Payload,
    { merge: true }
  );

  await batch.commit();

  const afterFactures = await db
    .collection("facturesauto")
    .where("interventionId", "==", interventionId)
    .get();

  const afterLines = await db
    .collection("lignesinterventionauto")
    .where("interventionId", "==", interventionId)
    .get();

  let report = "# BILLING-MODEL-D-D2 — Seed scénario test facturation\n\n";

  report += "## Résultat\n\n";
  report += `- Intervention test : \`${interventionId}\`\n`;
  report += `- Client utilisé : \`${clientId}\`\n`;
  report += `- Véhicule utilisé : \`${vehiculeId}\`\n`;
  report += `- Lignes intervention créées : ${afterLines.size}\n`;
  report += `- Factures liées au départ : ${afterFactures.size}\n`;
  report += `- Montant HT : ${montantHT}\n`;
  report += `- Montant TVA : ${montantTVA}\n`;
  report += `- Montant TTC : ${montantTTC}\n\n`;

  report += "## Garde-fous\n\n";
  report += "- Le scénario porte `billingModelTestScenario = D-D2`.\n";
  report += "- L'intervention reste `en_cours` après seed.\n";
  report += "- Le script refuse de continuer si une facture existe déjà pour cette intervention.\n";
  report += "- La génération facture/lignes facture doit être déclenchée ensuite par le runtime applicatif en passant l'intervention à `terminee`.\n\n";

  report += "## Prochaine étape\n\n";
  report += "BILLING-MODEL-D-D2 : passer l'intervention `billing-dd2-intervention` à `terminee` via l'application, puis vérifier `facturesauto` et `lignesfactureauto`.\n";

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, report, "utf8");

  log("DONE");
  log(`Intervention: ${interventionId}`);
  log(`Client: ${clientId}`);
  log(`Vehicle: ${vehiculeId}`);
  log(`Lines: ${afterLines.size}`);
  log(`Existing invoices: ${afterFactures.size}`);
  log(`Report: ${path.relative(root, reportPath)}`);
}

main().catch((error) => {
  console.error(`[${passName}] FAIL`, error);
  process.exit(1);
});
