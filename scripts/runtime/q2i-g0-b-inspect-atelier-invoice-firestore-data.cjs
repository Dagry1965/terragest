const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const ROOT = process.cwd();

const REPORT_REL = "docs/audits/Q2-I-G0-B-atelier-invoice-firestore-inspection.md";
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
    "No Firebase service account found. Expected secrets/firebase-service-account.json or GOOGLE_APPLICATION_CREDENTIALS."
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

function asDateValue(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value.toDate && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }
  return String(value);
}

function pick(record, keys) {
  const result = {};
  for (const key of keys) {
    if (record[key] !== undefined) {
      result[key] = record[key];
    }
  }
  return result;
}

function displayRecord(id, record, keys) {
  return {
    id,
    ...pick(record, keys),
  };
}

async function listCollection(db, collectionName, limit = 50) {
  const snap = await db.collection(collectionName).limit(limit).get();
  return snap.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
}

async function main() {
  const db = initFirebase();

  const collections = [
    "clientsauto",
    "vehicules",
    "interventionsauto",
    "lignesinterventionauto",
    "facturesauto",
    "lignesfactureauto",
    "encaissementsauto",
    "echeancespaiementauto",
    "rappelsauto",
  ];

  const loaded = {};

  for (const collectionName of collections) {
    loaded[collectionName] = await listCollection(db, collectionName, 200);
    console.log("[READ]", collectionName, loaded[collectionName].length);
  }

  const clientsById = new Map(
    loaded.clientsauto.map((entry) => [entry.id, entry.data])
  );

  const vehiculesById = new Map(
    loaded.vehicules.map((entry) => [entry.id, entry.data])
  );

  const facturesByInterventionId = new Map();
  for (const facture of loaded.facturesauto) {
    const interventionId = String(facture.data.interventionId ?? "").trim();
    if (!interventionId) continue;
    if (!facturesByInterventionId.has(interventionId)) {
      facturesByInterventionId.set(interventionId, []);
    }
    facturesByInterventionId.get(interventionId).push(facture);
  }

  const lignesByInterventionId = new Map();
  for (const ligne of loaded.lignesinterventionauto) {
    const interventionId = String(ligne.data.interventionId ?? "").trim();
    if (!interventionId) continue;
    if (!lignesByInterventionId.has(interventionId)) {
      lignesByInterventionId.set(interventionId, []);
    }
    lignesByInterventionId.get(interventionId).push(ligne);
  }

  const candidateInterventions = loaded.interventionsauto
    .map((entry) => {
      const record = entry.data;
      const id = entry.id;
      const statut = String(record.statut ?? record.status ?? "").toLowerCase();
      const clientId = String(record.clientId ?? "").trim();
      const vehiculeId = String(record.vehiculeId ?? "").trim();
      const lines = lignesByInterventionId.get(id) ?? [];
      const invoices = facturesByInterventionId.get(id) ?? [];

      const score =
        (statut.includes("terminee") || statut.includes("termin")) * 5 +
        (clientId ? 2 : 0) +
        (vehiculeId ? 2 : 0) +
        Math.min(lines.length, 4) -
        Math.min(invoices.length, 4);

      return {
        id,
        score,
        statut,
        clientId,
        vehiculeId,
        lineCount: lines.length,
        invoiceCount: invoices.length,
        record,
        client: clientsById.get(clientId),
        vehicule: vehiculesById.get(vehiculeId),
        lines,
        invoices,
      };
    })
    .sort((a, b) => b.score - a.score);

  const bestCandidates = candidateInterventions.slice(0, 10);

  const deterministicPlan = {
    scenario: "atelier-partial-schedule",
    recommendedSourceInterventionId: bestCandidates[0]?.id ?? null,
    ids: {
      factureId: "q2i-atelier-facture-001",
      ligneFactureMainOeuvreId: "q2i-atelier-lignefacture-001",
      ligneFacturePieceId: "q2i-atelier-lignefacture-002",
      encaissementId: "q2i-atelier-encaissement-001",
      echeanceId: "q2i-atelier-echeance-001",
      rappelFactureId: "q2i-atelier-rappel-facture-001",
      rappelEcheanceId: "q2i-atelier-rappel-echeance-001",
    },
  };

  const lines = [];
  lines.push("# Q2-I-G0-B — Atelier invoice Firestore inspection");
  lines.push("");
  lines.push("## Scope");
  lines.push("");
  lines.push("- Read-only Firestore inspection.");
  lines.push("- Goal: identify existing atelier data usable for invoice/source tree validation.");
  lines.push("- No Firestore write in this pass.");
  lines.push("- Scope: atelier invoices only. Boutique and mixed invoices are excluded.");
  lines.push("");
  lines.push("## Collection counts");
  lines.push("");
  lines.push("| Collection | Count read |");
  lines.push("|---|---:|");

  for (const collectionName of collections) {
    lines.push("| " + collectionName + " | " + loaded[collectionName].length + " |");
  }

  lines.push("");
  lines.push("## Best intervention candidates");
  lines.push("");
  lines.push("| Rank | Intervention | Score | Statut | Client | Véhicule | Lines | Existing invoices |");
  lines.push("|---:|---|---:|---|---|---|---:|---:|");

  bestCandidates.forEach((candidate, index) => {
    const clientLabel =
      candidate.client?.nom ??
      candidate.client?.raisonSociale ??
      candidate.client?.codeClient ??
      candidate.clientId;

    const vehicleLabel =
      candidate.vehicule?.immatriculation ??
      candidate.vehicule?.marque ??
      candidate.vehicule?.codeVehicule ??
      candidate.vehiculeId;

    lines.push(
      "| " +
        (index + 1) +
        " | " +
        candidate.id +
        " | " +
        candidate.score +
        " | " +
        candidate.statut +
        " | " +
        String(clientLabel ?? "") +
        " | " +
        String(vehicleLabel ?? "") +
        " | " +
        candidate.lineCount +
        " | " +
        candidate.invoiceCount +
        " |"
    );
  });

  lines.push("");
  lines.push("## Recommended deterministic seed plan");
  lines.push("");
  lines.push("```json");
  lines.push(JSON.stringify(deterministicPlan, null, 2));
  lines.push("```");
  lines.push("");
  lines.push("## Candidate details");
  lines.push("");

  for (const candidate of bestCandidates.slice(0, 3)) {
    lines.push("### Intervention `" + candidate.id + "`");
    lines.push("");
    lines.push("```json");
    lines.push(
      JSON.stringify(
        {
          intervention: displayRecord(candidate.id, candidate.record, [
            "numeroIntervention",
            "code",
            "statut",
            "clientId",
            "vehiculeId",
            "rendezVousId",
            "dateIntervention",
            "montantHT",
            "montantTTC",
          ]),
          client: candidate.client
            ? pick(candidate.client, ["codeClient", "nom", "prenom", "raisonSociale", "telephone", "email"])
            : null,
          vehicule: candidate.vehicule
            ? pick(candidate.vehicule, ["immatriculation", "marque", "modele", "clientId"])
            : null,
          lines: candidate.lines.map((line) =>
            displayRecord(line.id, line.data, [
              "designation",
              "typeLigne",
              "produitId",
              "quantite",
              "prixUnitaireHT",
              "montantHT",
              "montantTTC",
              "statut",
            ])
          ),
          existingInvoices: candidate.invoices.map((invoice) =>
            displayRecord(invoice.id, invoice.data, [
              "numeroFacture",
              "statutFacture",
              "statutPaiement",
              "sourceScope",
              "sourceType",
              "sourceModule",
              "sourceRecordId",
              "sourceLabel",
              "montantHT",
              "montantTTC",
              "resteAPayer",
            ])
          ),
        },
        null,
        2
      )
    );
    lines.push("```");
    lines.push("");
  }

  lines.push("## Decision");
  lines.push("");
  if (bestCandidates.length > 0 && bestCandidates[0].lineCount > 0) {
    lines.push("Q2-I-G0-B is validated. Existing atelier data can be used as source context for a deterministic invoice seed.");
    lines.push("");
    lines.push("Next step: Q2-I-G0-C should create a controlled seed using deterministic IDs and only atelier invoice records.");
  } else {
    lines.push("Q2-I-G0-B is not sufficient. No intervention with usable lines was found; create a source intervention and lines before invoice seed.");
  }

  fs.mkdirSync(path.dirname(REPORT), { recursive: true });
  fs.writeFileSync(REPORT, lines.join("\n"), "utf8");

  console.log("[Q2-I-G0-B] Atelier invoice Firestore inspection");
  console.log("[REPORT]", REPORT_REL);
  console.log("[CANDIDATES]", bestCandidates.length);
  console.log("[RECOMMENDED]", deterministicPlan.recommendedSourceInterventionId);
}

main().catch((error) => {
  console.error("[Q2-I-G0-B][ERROR]", error);
  process.exit(1);
});
