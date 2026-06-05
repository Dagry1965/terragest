const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const ROOT = process.cwd();

const SOURCE_INTERVENTION_ID = "demo-intervention-old-001";

const IDS = {
  factureId: "q2i-atelier-facture-001",
  ligneFactureMainOeuvreId: "q2i-atelier-lignefacture-001",
  ligneFacturePieceId: "q2i-atelier-lignefacture-002",
  encaissementId: "q2i-atelier-encaissement-001",
  echeanceId: "q2i-atelier-echeance-001",
  rappelFactureId: "q2i-atelier-rappel-facture-001",
  rappelEcheanceId: "q2i-atelier-rappel-echeance-001",
};

const REPORT_REL = "docs/audits/Q2-I-G0-D-atelier-invoice-post-seed-audit.md";
const REPORT = path.join(ROOT, REPORT_REL);

function loadDotEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const content = fs.readFileSync(envPath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const eq = line.indexOf("=");

    if (eq === -1) {
      continue;
    }

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

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

loadDotEnvLocal();

function getFirebaseProjectId() {
  return (
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECTID ||
    ""
  ).trim();
}

function loadServiceAccount() {
  const candidates = [
    path.join(ROOT, "secrets", "terragest-dev-service-account.json"),
    path.join(ROOT, "secrets", "firebase-service-account.json"),
    path.join(ROOT, ".secrets", "firebase-service-account.json"),
    path.join(ROOT, "firebase-service-account.json"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return {
        source: candidate,
        value: JSON.parse(fs.readFileSync(candidate, "utf8")),
      };
    }
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const credentialPath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    if (fs.existsSync(credentialPath)) {
      return {
        source: credentialPath,
        value: JSON.parse(fs.readFileSync(credentialPath, "utf8")),
      };
    }
  }

  throw new Error("No Firebase service account found.");
}

function initFirebase() {
  const projectId = getFirebaseProjectId();

  if (!projectId) {
    throw new Error(
      "Missing Firebase project id. Define FIREBASE_PROJECT_ID or NEXT_PUBLIC_FIREBASE_PROJECT_ID in .env.local."
    );
  }

  if (admin.apps.length > 0) {
    return admin.firestore();
  }

  const serviceAccount = loadServiceAccount();

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.value),
    projectId,
  });

  console.log("[FIREBASE] Project:", projectId);
  console.log("[FIREBASE] Credentials:", serviceAccount.source);

  return admin.firestore();
}

async function getDoc(db, collection, id) {
  const snap = await db.collection(collection).doc(id).get();

  return {
    collection,
    id,
    exists: snap.exists,
    data: snap.exists ? snap.data() : null,
  };
}

async function queryByField(db, collection, field, value) {
  const snap = await db.collection(collection).where(field, "==", value).get();

  return snap.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
}

function addCheck(checks, status, label, details = "") {
  checks.push({ status, label, details });
}

function summarizeRecord(record, fields) {
  if (!record) return null;

  const result = {};

  for (const field of fields) {
    if (record[field] !== undefined) {
      result[field] = record[field];
    }
  }

  return result;
}

async function main() {
  const db = initFirebase();

  const checks = [];

  const sourceIntervention = await getDoc(db, "interventionsauto", SOURCE_INTERVENTION_ID);

  const facture = await getDoc(db, "facturesauto", IDS.factureId);
  const ligne1 = await getDoc(db, "lignesfactureauto", IDS.ligneFactureMainOeuvreId);
  const ligne2 = await getDoc(db, "lignesfactureauto", IDS.ligneFacturePieceId);
  const encaissement = await getDoc(db, "encaissementsauto", IDS.encaissementId);
  const echeance = await getDoc(db, "echeancespaiementauto", IDS.echeanceId);
  const rappelFacture = await getDoc(db, "rappelsauto", IDS.rappelFactureId);
  const rappelEcheance = await getDoc(db, "rappelsauto", IDS.rappelEcheanceId);

  const docs = [
    facture,
    ligne1,
    ligne2,
    encaissement,
    echeance,
    rappelFacture,
    rappelEcheance,
  ];

  addCheck(
    checks,
    sourceIntervention.exists ? "OK" : "FAIL",
    "Source intervention exists",
    "interventionsauto/" + SOURCE_INTERVENTION_ID
  );

  for (const doc of docs) {
    addCheck(
      checks,
      doc.exists ? "OK" : "FAIL",
      "Seed document exists: " + doc.collection + "/" + doc.id,
      doc.exists ? "Found" : "Missing"
    );
  }

  addCheck(
    checks,
    facture.data?.sourceScope === "atelier" ? "OK" : "FAIL",
    "Invoice sourceScope is atelier",
    String(facture.data?.sourceScope)
  );

  addCheck(
    checks,
    facture.data?.sourceType === "intervention" ? "OK" : "FAIL",
    "Invoice sourceType is intervention",
    String(facture.data?.sourceType)
  );

  addCheck(
    checks,
    facture.data?.sourceModule === "interventionsauto" ? "OK" : "FAIL",
    "Invoice sourceModule is interventionsauto",
    String(facture.data?.sourceModule)
  );

  addCheck(
    facture.data?.sourceRecordId === SOURCE_INTERVENTION_ID ? checks : checks,
    facture.data?.sourceRecordId === SOURCE_INTERVENTION_ID ? "OK" : "FAIL",
    "Invoice sourceRecordId targets source intervention",
    String(facture.data?.sourceRecordId)
  );

  addCheck(
    checks,
    facture.data?.interventionId === SOURCE_INTERVENTION_ID ? "OK" : "FAIL",
    "Invoice interventionId targets source intervention",
    String(facture.data?.interventionId)
  );

  const lignesByFacture = await queryByField(
    db,
    "lignesfactureauto",
    "factureId",
    IDS.factureId
  );

  const encaissementsByFacture = await queryByField(
    db,
    "encaissementsauto",
    "factureId",
    IDS.factureId
  );

  const echeancesByFacture = await queryByField(
    db,
    "echeancespaiementauto",
    "factureId",
    IDS.factureId
  );

  const rappelsByFacture = await queryByField(
    db,
    "rappelsauto",
    "factureId",
    IDS.factureId
  );

  const rappelsByEcheance = await queryByField(
    db,
    "rappelsauto",
    "echeanceId",
    IDS.echeanceId
  );

  addCheck(
    checks,
    lignesByFacture.length >= 2 ? "OK" : "FAIL",
    "Invoice has at least 2 invoice lines",
    String(lignesByFacture.length)
  );

  addCheck(
    checks,
    encaissementsByFacture.length >= 1 ? "OK" : "FAIL",
    "Invoice has at least 1 payment",
    String(encaissementsByFacture.length)
  );

  addCheck(
    checks,
    echeancesByFacture.length >= 1 ? "OK" : "FAIL",
    "Invoice has at least 1 payment schedule",
    String(echeancesByFacture.length)
  );

  addCheck(
    checks,
    rappelsByFacture.length >= 2 ? "OK" : "FAIL",
    "Invoice has reminders by factureId",
    String(rappelsByFacture.length)
  );

  addCheck(
    checks,
    rappelsByEcheance.length >= 1 ? "OK" : "FAIL",
    "Payment schedule has reminder by echeanceId",
    String(rappelsByEcheance.length)
  );

  const montantHT = Number(facture.data?.montantHT ?? 0);
  const tva = Number(facture.data?.tva ?? 0);
  const montantTTC = Number(facture.data?.montantTTC ?? 0);
  const montantPaye = Number(facture.data?.montantPaye ?? 0);
  const resteAPayer = Number(facture.data?.resteAPayer ?? 0);

  addCheck(
    checks,
    montantHT + tva === montantTTC ? "OK" : "FAIL",
    "Invoice amount consistency: HT + TVA = TTC",
    `${montantHT} + ${tva} = ${montantTTC}`
  );

  addCheck(
    checks,
    montantTTC - montantPaye === resteAPayer ? "OK" : "FAIL",
    "Invoice payment consistency: TTC - paid = remaining",
    `${montantTTC} - ${montantPaye} = ${resteAPayer}`
  );

  const ok = checks.filter((check) => check.status === "OK");
  const fail = checks.filter((check) => check.status === "FAIL");

  const lines = [];

  lines.push("# Q2-I-G0-D — Atelier invoice post-seed audit");
  lines.push("");
  lines.push("## Scope");
  lines.push("");
  lines.push("- Firestore post-seed verification.");
  lines.push("- Source intervention: `" + SOURCE_INTERVENTION_ID + "`");
  lines.push("- Scope: atelier invoice only.");
  lines.push("- Boutique and mixed invoices are excluded.");
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push("- OK: " + ok.length);
  lines.push("- FAIL: " + fail.length);
  lines.push("");
  lines.push("## Checks");
  lines.push("");
  lines.push("| Status | Check | Details |");
  lines.push("|---|---|---|");

  for (const check of checks) {
    lines.push(
      "| " +
        check.status +
        " | " +
        check.label.replace(/\|/g, "\\|") +
        " | " +
        String(check.details || "").replace(/\|/g, "\\|") +
        " |"
    );
  }

  lines.push("");
  lines.push("## Seeded invoice summary");
  lines.push("");
  lines.push("```json");
  lines.push(
    JSON.stringify(
      {
        facture: summarizeRecord(facture.data, [
          "numeroFacture",
          "typeFacture",
          "sourceScope",
          "sourceType",
          "sourceModule",
          "sourceRecordId",
          "sourceLabel",
          "statutFacture",
          "statutPaiement",
          "montantHT",
          "tva",
          "montantTTC",
          "montantPaye",
          "resteAPayer",
        ]),
        children: {
          lignesfactureauto: lignesByFacture.length,
          encaissementsauto: encaissementsByFacture.length,
          echeancespaiementauto: echeancesByFacture.length,
          rappelsautoByFacture: rappelsByFacture.length,
          rappelsautoByEcheance: rappelsByEcheance.length,
        },
      },
      null,
      2
    )
  );
  lines.push("```");
  lines.push("");
  lines.push("## Decision");
  lines.push("");

  if (fail.length === 0) {
    lines.push("Q2-I-G0-D is validated. The atelier invoice seed exists and has the expected source, child records, schedule and reminder relations.");
    lines.push("");
    lines.push("Next step: Q2-I-G — visual validation of atelier invoice in the operational graphic tree.");
  } else {
    lines.push("Q2-I-G0-D is blocked. Fix failed post-seed checks before visual validation.");
    lines.push("");
    for (const item of fail) {
      lines.push("- " + item.label + ": " + item.details);
    }
  }

  fs.mkdirSync(path.dirname(REPORT), { recursive: true });
  fs.writeFileSync(REPORT, lines.join("\n"), "utf8");

  console.log("[Q2-I-G0-D] Atelier invoice post-seed audit");
  console.log("[OK]", ok.length);
  console.log("[FAIL]", fail.length);
  console.log("[REPORT]", REPORT_REL);

  if (fail.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("[Q2-I-G0-D][ERROR]", error);
  process.exit(1);
});
