const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    console.log("[ENV] .env.local not found.");
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }

  console.log("[ENV] .env.local loaded.");
}

function initDb() {
  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    "terragest-dev";

  console.log("[FIREBASE] Project:", projectId);
  console.log("[FIREBASE] Credentials:", process.env.GOOGLE_APPLICATION_CREDENTIALS || "(default)");

  if (!admin.apps.length) {
    admin.initializeApp({
      projectId,
      credential: admin.credential.applicationDefault(),
    });
  }

  return admin.firestore();
}

async function getAll(db, collectionName) {
  const snap = await db.collection(collectionName).get();
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

function byId(records) {
  return new Map(records.map((record) => [record.id, record]));
}

function addCheck(checks, ok, label, details = "") {
  checks.push({ ok, label, details });
}

function countBy(records, field) {
  const result = {};

  for (const record of records) {
    const value = record[field] || "(vide)";
    result[value] = (result[value] || 0) + 1;
  }

  return result;
}

function renderCountBy(title, map) {
  const lines = [`### ${title}`, ""];

  for (const [key, value] of Object.entries(map)) {
    lines.push(`- ${key}: ${value}`);
  }

  lines.push("");
  return lines.join("\n");
}

async function main() {
  console.log("[TEST-DATA-PREP-A3-C1-F] Global demo seed audit");

  loadEnvLocal();

  const db = initDb();

  const collections = [
    "fournisseursauto",
    "produitsauto",
    "stocksauto",
    "clientsauto",
    "vehicules",
    "commandesstockauto",
    "lignescommandestockauto",
    "receptionsstockauto",
    "mouvementsstockauto",
    "rendezvous",
    "interventionsauto",
    "lignesinterventionauto",
    "facturesauto",
    "encaissementsauto",
    "rappelsauto",
  ];

  const data = {};

  for (const collectionName of collections) {
    data[collectionName] = await getAll(db, collectionName);
    console.log(`- ${collectionName}: ${data[collectionName].length}`);
  }

  const checks = [];

  const expectedCounts = {
    fournisseursauto: 3,
    produitsauto: 26,
    stocksauto: 23,
    clientsauto: 20,
    vehicules: 20,
    commandesstockauto: 3,
    lignescommandestockauto: 10,
    receptionsstockauto: 8,
    rendezvous: 7,
    interventionsauto: 5,
    lignesinterventionauto: 12,
    facturesauto: 0,
    encaissementsauto: 0,
    rappelsauto: 0,
  };

  for (const [collectionName, expected] of Object.entries(expectedCounts)) {
    const actual = data[collectionName].length;
    addCheck(
      checks,
      actual === expected,
      `${collectionName} count`,
      `expected=${expected}, actual=${actual}`
    );
  }

  const clients = byId(data.clientsauto);
  const vehicules = byId(data.vehicules);
  const produits = byId(data.produitsauto);
  const stocks = byId(data.stocksauto);
  const commandes = byId(data.commandesstockauto);
  const lignesCommande = byId(data.lignescommandestockauto);
  const rdvs = byId(data.rendezvous);
  const interventions = byId(data.interventionsauto);

  for (const vehicule of data.vehicules) {
    addCheck(
      checks,
      clients.has(vehicule.clientId),
      `vehicule ${vehicule.id} has valid clientId`,
      vehicule.clientId || "(vide)"
    );
  }

  for (const rdv of data.rendezvous) {
    addCheck(checks, clients.has(rdv.clientId), `rdv ${rdv.id} has valid clientId`, rdv.clientId || "(vide)");
    addCheck(checks, vehicules.has(rdv.vehiculeId), `rdv ${rdv.id} has valid vehiculeId`, rdv.vehiculeId || "(vide)");
  }

  for (const intervention of data.interventionsauto) {
    addCheck(checks, clients.has(intervention.clientId), `intervention ${intervention.id} has valid clientId`, intervention.clientId || "(vide)");
    addCheck(checks, vehicules.has(intervention.vehiculeId), `intervention ${intervention.id} has valid vehiculeId`, intervention.vehiculeId || "(vide)");

    if (intervention.rendezVousId) {
      addCheck(
        checks,
        rdvs.has(intervention.rendezVousId),
        `intervention ${intervention.id} has valid rendezVousId`,
        intervention.rendezVousId
      );
    }
  }

  for (const line of data.lignesinterventionauto) {
    addCheck(checks, interventions.has(line.interventionId), `line ${line.id} has valid interventionId`, line.interventionId || "(vide)");
    addCheck(checks, produits.has(line.produitId), `line ${line.id} has valid produitId`, line.produitId || "(vide)");

    if (line.stockId) {
      addCheck(checks, stocks.has(line.stockId), `line ${line.id} has valid stockId`, line.stockId);
    }
  }

  for (const line of data.lignescommandestockauto) {
    addCheck(checks, commandes.has(line.commandeId), `order line ${line.id} has valid commandeId`, line.commandeId || "(vide)");
    addCheck(checks, produits.has(line.produitId), `order line ${line.id} has valid produitId`, line.produitId || "(vide)");

    if (line.stockId) {
      addCheck(checks, stocks.has(line.stockId), `order line ${line.id} has valid stockId`, line.stockId);
    }
  }

  for (const reception of data.receptionsstockauto) {
    addCheck(checks, commandes.has(reception.commandeId), `reception ${reception.id} has valid commandeId`, reception.commandeId || "(vide)");
    addCheck(checks, lignesCommande.has(reception.ligneCommandeId), `reception ${reception.id} has valid ligneCommandeId`, reception.ligneCommandeId || "(vide)");
    addCheck(checks, produits.has(reception.produitId), `reception ${reception.id} has valid produitId`, reception.produitId || "(vide)");
    addCheck(checks, stocks.has(reception.stockId), `reception ${reception.id} has valid stockId`, reception.stockId || "(vide)");
  }

  const stockMovements = data.mouvementsstockauto;
  const entreeCount = stockMovements.filter((item) => item.typeMouvement === "entree").length;
  const sortieCount = stockMovements.filter((item) => item.typeMouvement === "sortie").length;

  addCheck(checks, entreeCount === 8, "stock entries count", `expected=8, actual=${entreeCount}`);
  addCheck(checks, sortieCount >= 1, "stock sorties exist", `actual=${sortieCount}`);

  const okCount = checks.filter((check) => check.ok).length;
  const failCount = checks.filter((check) => !check.ok).length;

  const reportLines = [
    "# TEST-DATA-PREP-A3-C1-F â€” Global demo seed audit",
    "",
    "## Summary",
    "",
    `- OK: ${okCount}`,
    `- FAIL: ${failCount}`,
    "",
    "## Collection counts",
    "",
  ];

  for (const collectionName of collections) {
    reportLines.push(`- ${collectionName}: ${data[collectionName].length}`);
  }

  reportLines.push("");
  reportLines.push(renderCountBy("Rendez-vous by statut", countBy(data.rendezvous, "statut")));
  reportLines.push(renderCountBy("Interventions by statut", countBy(data.interventionsauto, "statut")));
  reportLines.push(renderCountBy("Lignes intervention by statut", countBy(data.lignesinterventionauto, "statut")));
  reportLines.push(renderCountBy("Mouvements stock by type", countBy(data.mouvementsstockauto, "typeMouvement")));

  reportLines.push("## Checks", "");

  for (const check of checks) {
    reportLines.push(`- ${check.ok ? "OK" : "FAIL"} â€” ${check.label} â€” ${check.details}`);
  }

  const reportPath = path.join(
    process.cwd(),
    "docs",
    "audits",
    "TEST-DATA-PREP-A3-C1-F-global-demo-seed-audit.md"
  );

  fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

  console.log(`[REPORT] ${reportPath}`);
  console.log(`[OK] ${okCount}`);
  console.log(`[FAIL] ${failCount}`);

  if (failCount > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("[ERROR]", error);
  process.exitCode = 1;
});