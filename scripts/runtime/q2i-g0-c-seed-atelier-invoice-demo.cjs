const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const ROOT = process.cwd();

const CONFIRM_FLAG = "--confirm-seed-atelier-invoice";
const SHOULD_WRITE = process.argv.includes(CONFIRM_FLAG);

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

const REPORT_REL = "docs/audits/Q2-I-G0-C-atelier-invoice-seed.md";
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

  throw new Error(
    "No Firebase service account found. Expected secrets/terragest-dev-service-account.json or GOOGLE_APPLICATION_CREDENTIALS."
  );
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


function removeUndefinedValues(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => removeUndefinedValues(item))
      .filter((item) => item !== undefined);
  }

  if (value && typeof value === "object") {
    const cleaned = {};

    for (const [key, item] of Object.entries(value)) {
      const cleanedValue = removeUndefinedValues(item);

      if (cleanedValue !== undefined) {
        cleaned[key] = cleanedValue;
      }
    }

    return cleaned;
  }

  if (value === undefined) {
    return undefined;
  }

  return value;
}

function getRecordId(record) {
  return String(record.id ?? record._id ?? record.uid ?? "").trim();
}

function numberValue(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function pickFirstDefined(record, keys, fallback = undefined) {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null && record[key] !== "") {
      return record[key];
    }
  }

  return fallback;
}

function buildSourceLabel({ intervention, client, vehicule }) {
  const numeroIntervention =
    pickFirstDefined(intervention, ["numeroIntervention", "code"], SOURCE_INTERVENTION_ID);

  const clientLabel =
    pickFirstDefined(client, ["raisonSociale", "nom", "codeClient"], "Client atelier");

  const vehiculeLabel =
    pickFirstDefined(vehicule, ["immatriculation", "modele", "marque"], "Vehicule atelier");

  return `${numeroIntervention} · ${clientLabel} · ${vehiculeLabel}`;
}

async function getDoc(db, collection, id) {
  const snap = await db.collection(collection).doc(id).get();
  return snap.exists ? { id: snap.id, data: snap.data() } : null;
}

async function getCollectionByField(db, collection, field, value) {
  const snap = await db.collection(collection).where(field, "==", value).get();

  return snap.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
}

async function assertNoExistingSeed(db) {
  const targets = [
    ["facturesauto", IDS.factureId],
    ["lignesfactureauto", IDS.ligneFactureMainOeuvreId],
    ["lignesfactureauto", IDS.ligneFacturePieceId],
    ["encaissementsauto", IDS.encaissementId],
    ["echeancespaiementauto", IDS.echeanceId],
    ["rappelsauto", IDS.rappelFactureId],
    ["rappelsauto", IDS.rappelEcheanceId],
  ];

  const existing = [];

  for (const [collection, id] of targets) {
    const snap = await db.collection(collection).doc(id).get();

    if (snap.exists) {
      existing.push(`${collection}/${id}`);
    }
  }

  return existing;
}

function buildSeedDocuments({ intervention, client, vehicule, interventionLines }) {
  const clientId = String(intervention.clientId ?? "").trim();
  const vehiculeId = String(intervention.vehiculeId ?? "").trim();

  const sourceLabel = buildSourceLabel({ intervention, client, vehicule });

  const mainLineSource = interventionLines[0];
  const pieceLineSource = interventionLines[1] ?? interventionLines[0];

  const mainLineLabel =
    pickFirstDefined(mainLineSource?.data ?? {}, ["designation", "libelle", "nom"], "Main d'oeuvre atelier");

  const pieceLineLabel =
    pickFirstDefined(pieceLineSource?.data ?? {}, ["designation", "libelle", "nom"], "Piece atelier");

  const line1Qty = 1;
  const line1Unit = 85000;
  const line1HT = line1Qty * line1Unit;

  const line2Qty = 2;
  const line2Unit = 27500;
  const line2HT = line2Qty * line2Unit;

  const montantHT = line1HT + line2HT;
  const tva = Math.round(montantHT * 0.18);
  const montantTTC = montantHT + tva;
  const montantPaye = 90000;
  const resteAPayer = montantTTC - montantPaye;

  const now = new Date().toISOString();

  const commonContext = {
    tenantId: intervention.tenantId,
    workspace: intervention.workspace,
    userId: intervention.userId,
    clientId,
    vehiculeId,
    interventionId: SOURCE_INTERVENTION_ID,
    sourceScope: "atelier",
    sourceType: "intervention",
    sourceModule: "interventionsauto",
    sourceRecordId: SOURCE_INTERVENTION_ID,
    sourceLabel,
    createdAt: now,
    updatedAt: now,
    createdBy: "q2i-g0-c-seed",
    updatedBy: "q2i-g0-c-seed",
  };

  const facture = {
    id: IDS.factureId,
    ...commonContext,
    moduleKey: "facturesauto",
    numeroFacture: "FAC-ATELIER-Q2I-001",
    dateFacture: now.slice(0, 10),
    typeFacture: "atelier",
    statutFacture: "emise",
    statutPaiement: "partiel",
    montantHT,
    tva,
    montantTTC,
    montantPaye,
    resteAPayer,
    modePaiement: "mixte",
    statutEnvoiFacture: "envoyee",
    notes:
      "Seed Q2-I-G0-C — facture atelier source-aware pour validation arbre operationnel.",
  };

  const ligneFacture1 = {
    id: IDS.ligneFactureMainOeuvreId,
    ...commonContext,
    moduleKey: "lignesfactureauto",
    factureId: IDS.factureId,
    designation: String(mainLineLabel),
    typeLigne: "main_oeuvre",
    quantite: line1Qty,
    prixUnitaireHT: line1Unit,
    montantHT: line1HT,
    tva: Math.round(line1HT * 0.18),
    montantTTC: line1HT + Math.round(line1HT * 0.18),
    sourceModule: "lignesinterventionauto",
    sourceRecordId: mainLineSource?.id ?? "",
    sourceLineId: mainLineSource?.id ?? "",
    sourceType: "ligne_intervention",
    sourceScope: "atelier",
    sourceLabel: String(mainLineLabel),
    statut: "validee",
  };

  const ligneFacture2 = {
    id: IDS.ligneFacturePieceId,
    ...commonContext,
    moduleKey: "lignesfactureauto",
    factureId: IDS.factureId,
    designation: String(pieceLineLabel),
    typeLigne: "piece",
    quantite: line2Qty,
    prixUnitaireHT: line2Unit,
    montantHT: line2HT,
    tva: Math.round(line2HT * 0.18),
    montantTTC: line2HT + Math.round(line2HT * 0.18),
    sourceModule: "lignesinterventionauto",
    sourceRecordId: pieceLineSource?.id ?? "",
    sourceLineId: pieceLineSource?.id ?? "",
    sourceType: "ligne_intervention",
    sourceScope: "atelier",
    sourceLabel: String(pieceLineLabel),
    statut: "validee",
  };

  const encaissement = {
    id: IDS.encaissementId,
    ...commonContext,
    moduleKey: "encaissementsauto",
    factureId: IDS.factureId,
    montant: montantPaye,
    modePaiement: "mobile_money",
    referenceTransaction: "Q2I-ATELIER-PAY-001",
    statut: "valide",
    numeroRecu: "REC-Q2I-ATELIER-001",
    notes: "Paiement partiel seed Q2-I-G0-C.",
  };

  const echeance = {
    id: IDS.echeanceId,
    ...commonContext,
    moduleKey: "echeancespaiementauto",
    factureId: IDS.factureId,
    montant: resteAPayer,
    montantEcheance: resteAPayer,
    dateEcheance: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15)
      .toISOString()
      .slice(0, 10),
    statut: "en_attente",
    notes: "Echeance restante seed Q2-I-G0-C.",
  };

  const rappelFacture = {
    id: IDS.rappelFactureId,
    ...commonContext,
    moduleKey: "rappelsauto",
    factureId: IDS.factureId,
    typeRappel: "facture",
    dateRappel: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
      .toISOString()
      .slice(0, 10),
    canal: "email",
    message: "Rappel facture atelier partiellement payee.",
    statut: "planifie",
  };

  const rappelEcheance = {
    id: IDS.rappelEcheanceId,
    ...commonContext,
    moduleKey: "rappelsauto",
    factureId: IDS.factureId,
    echeanceId: IDS.echeanceId,
    typeRappel: "echeance",
    dateRappel: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12)
      .toISOString()
      .slice(0, 10),
    canal: "sms",
    message: "Rappel echeance facture atelier.",
    statut: "planifie",
  };

  return {
    facture,
    ligneFacture1,
    ligneFacture2,
    encaissement,
    echeance,
    rappelFacture,
    rappelEcheance,
  };
}

async function writeDocs(db, docs) {
  const batch = db.batch();

  const writes = [
    ["facturesauto", IDS.factureId, docs.facture],
    ["lignesfactureauto", IDS.ligneFactureMainOeuvreId, docs.ligneFacture1],
    ["lignesfactureauto", IDS.ligneFacturePieceId, docs.ligneFacture2],
    ["encaissementsauto", IDS.encaissementId, docs.encaissement],
    ["echeancespaiementauto", IDS.echeanceId, docs.echeance],
    ["rappelsauto", IDS.rappelFactureId, docs.rappelFacture],
    ["rappelsauto", IDS.rappelEcheanceId, docs.rappelEcheance],
  ];

  for (const [collection, id, payload] of writes) {
    batch.set(db.collection(collection).doc(id), removeUndefinedValues(payload), { merge: false });
  }

  await batch.commit();

  return writes;
}

async function verifyDocs(db) {
  const targets = [
    ["facturesauto", IDS.factureId],
    ["lignesfactureauto", IDS.ligneFactureMainOeuvreId],
    ["lignesfactureauto", IDS.ligneFacturePieceId],
    ["encaissementsauto", IDS.encaissementId],
    ["echeancespaiementauto", IDS.echeanceId],
    ["rappelsauto", IDS.rappelFactureId],
    ["rappelsauto", IDS.rappelEcheanceId],
  ];

  const result = [];

  for (const [collection, id] of targets) {
    const snap = await db.collection(collection).doc(id).get();

    result.push({
      collection,
      id,
      exists: snap.exists,
      data: snap.exists ? snap.data() : null,
    });
  }

  return result;
}

async function main() {
  const db = initFirebase();

  const sourceIntervention = await getDoc(db, "interventionsauto", SOURCE_INTERVENTION_ID);

  if (!sourceIntervention) {
    throw new Error("Source intervention not found: " + SOURCE_INTERVENTION_ID);
  }

  const intervention = sourceIntervention.data;
  const clientId = String(intervention.clientId ?? "").trim();
  const vehiculeId = String(intervention.vehiculeId ?? "").trim();

  if (!clientId) {
    throw new Error("Source intervention has no clientId.");
  }

  if (!vehiculeId) {
    throw new Error("Source intervention has no vehiculeId.");
  }

  const client = await getDoc(db, "clientsauto", clientId);
  const vehicule = await getDoc(db, "vehicules", vehiculeId);
  const interventionLines = await getCollectionByField(
    db,
    "lignesinterventionauto",
    "interventionId",
    SOURCE_INTERVENTION_ID
  );

  if (!client) {
    throw new Error("Client not found: " + clientId);
  }

  if (!vehicule) {
    throw new Error("Vehicule not found: " + vehiculeId);
  }

  if (interventionLines.length === 0) {
    throw new Error("No intervention lines found for: " + SOURCE_INTERVENTION_ID);
  }

  const existingSeed = await assertNoExistingSeed(db);
  const docs = buildSeedDocuments({
    intervention,
    client: client.data,
    vehicule: vehicule.data,
    interventionLines,
  });

  const writes = [
    ["facturesauto", IDS.factureId],
    ["lignesfactureauto", IDS.ligneFactureMainOeuvreId],
    ["lignesfactureauto", IDS.ligneFacturePieceId],
    ["encaissementsauto", IDS.encaissementId],
    ["echeancespaiementauto", IDS.echeanceId],
    ["rappelsauto", IDS.rappelFactureId],
    ["rappelsauto", IDS.rappelEcheanceId],
  ];

  let written = [];

  if (SHOULD_WRITE) {
    if (existingSeed.length > 0) {
      throw new Error(
        "Seed already exists. Refusing overwrite. Existing docs: " +
          existingSeed.join(", ")
      );
    }

    written = await writeDocs(db, docs);
  }

  const verification = SHOULD_WRITE ? await verifyDocs(db) : [];

  const lines = [];

  lines.push("# Q2-I-G0-C — Atelier invoice controlled seed");
  lines.push("");
  lines.push("## Scope");
  lines.push("");
  lines.push("- Controlled atelier invoice seed.");
  lines.push("- Source intervention: `" + SOURCE_INTERVENTION_ID + "`");
  lines.push("- Boutique and mixed invoices are excluded.");
  lines.push("- Deterministic IDs.");
  lines.push("- Write mode: `" + (SHOULD_WRITE ? "CONFIRMED" : "DRY_RUN") + "`");
  lines.push("");
  lines.push("## Source context");
  lines.push("");
  lines.push("```json");
  lines.push(
    JSON.stringify(
      {
        interventionId: SOURCE_INTERVENTION_ID,
        clientId,
        vehiculeId,
        interventionLineCount: interventionLines.length,
        sourceLabel: docs.facture.sourceLabel,
      },
      null,
      2
    )
  );
  lines.push("```");
  lines.push("");
  lines.push("## Planned writes");
  lines.push("");
  lines.push("| Collection | ID |");
  lines.push("|---|---|");

  for (const [collection, id] of writes) {
    lines.push("| " + collection + " | " + id + " |");
  }

  lines.push("");
  lines.push("## Existing deterministic docs before write");
  lines.push("");
  if (existingSeed.length === 0) {
    lines.push("- None.");
  } else {
    for (const item of existingSeed) {
      lines.push("- " + item);
    }
  }

  lines.push("");
  lines.push("## Seed preview");
  lines.push("");
  lines.push("```json");
  lines.push(JSON.stringify(docs, null, 2));
  lines.push("```");
  lines.push("");

  if (SHOULD_WRITE) {
    lines.push("## Write result");
    lines.push("");
    lines.push("- Written documents: " + written.length);
    lines.push("");
    lines.push("## Verification");
    lines.push("");
    lines.push("| Collection | ID | Exists |");
    lines.push("|---|---|---|");

    for (const item of verification) {
      lines.push(
        "| " +
          item.collection +
          " | " +
          item.id +
          " | " +
          (item.exists ? "YES" : "NO") +
          " |"
      );
    }
    lines.push("");
  } else {
    lines.push("## Decision");
    lines.push("");
    lines.push("Dry-run completed. Re-run with `" + CONFIRM_FLAG + "` to write the atelier invoice seed.");
    lines.push("");
  }

  fs.mkdirSync(path.dirname(REPORT), { recursive: true });
  fs.writeFileSync(REPORT, lines.join("\n"), "utf8");

  console.log("[Q2-I-G0-C] Atelier invoice controlled seed");
  console.log("[MODE]", SHOULD_WRITE ? "CONFIRMED_WRITE" : "DRY_RUN");
  console.log("[SOURCE]", SOURCE_INTERVENTION_ID);
  console.log("[PLANNED_WRITES]", writes.length);
  console.log("[EXISTING_SEED]", existingSeed.length);
  console.log("[REPORT]", REPORT_REL);

  if (SHOULD_WRITE) {
    console.log("[WRITTEN]", written.length);
  } else {
    console.log("[NEXT] node", path.relative(ROOT, __filename), CONFIRM_FLAG);
  }
}

main().catch((error) => {
  console.error("[Q2-I-G0-C][ERROR]", error);
  process.exit(1);
});
