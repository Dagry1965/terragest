const fs = require("fs");
const path = require("path");

const {
  initializeApp,
  getApps,
} = require("firebase/app");

const {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} = require("firebase/firestore");

const ROOT = process.cwd();

function loadEnvFile(fileName) {
  const fullPath = path.join(ROOT, fileName);

  if (!fs.existsSync(fullPath)) {
    return {};
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const env = {};

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const index = trimmed.indexOf("=");

    if (index === -1) {
      continue;
    }

    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

function envValue(env, key) {
  return process.env[key] || env[key];
}

function formatValue(value) {
  if (value == null) {
    return "";
  }

  if (typeof value === "object") {
    if (typeof value.toDate === "function") {
      return value.toDate().toISOString();
    }

    if (
      typeof value.seconds === "number" &&
      typeof value.nanoseconds === "number"
    ) {
      return new Date(value.seconds * 1000).toISOString();
    }

    return JSON.stringify(value);
  }

  return String(value);
}

function money(value) {
  const n = Number(value ?? 0);

  if (!Number.isFinite(n)) {
    return 0;
  }

  return n;
}

function pick(record, keys) {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null && record[key] !== "") {
      return record[key];
    }
  }

  return "";
}

async function readCollectionByField(db, collectionName, fieldName, value) {
  try {
    const snap = await getDocs(
      query(collection(db, collectionName), where(fieldName, "==", value))
    );

    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  } catch (error) {
    console.log(
      `[WARN] Impossible de lire ${collectionName} where ${fieldName} == ${value}: ${error.code || error.message}`
    );
    return [];
  }
}

async function readDoc(db, collectionName, id) {
  const ref = doc(db, collectionName, id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return null;
  }

  return {
    id: snap.id,
    ...snap.data(),
  };
}

function printRecord(title, record) {
  console.log("");
  console.log(`=== ${title} ===`);

  if (!record) {
    console.log("Introuvable.");
    return;
  }

  const interestingKeys = [
    "id",
    "code",
    "numero",
    "libelle",
    "designation",
    "nom",
    "statut",
    "etat",
    "clientId",
    "vehiculeId",
    "rendezVousId",
    "interventionId",
    "produitId",
    "stockId",
    "quantite",
    "prixUnitaire",
    "montantHT",
    "montantTTC",
    "montantTotal",
    "total",
    "totalLignes",
    "totalLignesValidees",
    "montantLignesValidees",
    "stockMovementId",
    "stockReversalMovementId",
    "removedAt",
    "removedBy",
    "removedReason",
    "removedFromStatus",
    "createdAt",
    "updatedAt",
  ];

  for (const key of interestingKeys) {
    if (record[key] !== undefined) {
      console.log(`${key}: ${formatValue(record[key])}`);
    }
  }
}

async function main() {
  const interventionId = process.argv[2];

  if (!interventionId) {
    console.error("");
    console.error("Usage:");
    console.error("  node scripts/runtime/audit-q20h5i-intervention-lines.cjs <interventionId>");
    process.exit(1);
  }

  const env = {
    ...loadEnvFile(".env.local"),
    ...loadEnvFile(".env"),
  };

  const firebaseConfig = {
    apiKey: envValue(env, "NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: envValue(env, "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: envValue(env, "NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: envValue(env, "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: envValue(env, "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId: envValue(env, "NEXT_PUBLIC_FIREBASE_APP_ID"),
  };

  const missing = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error("[ERROR] Configuration Firebase incomplète.");
    console.error("Champs manquants:", missing.join(", "));
    console.error("Vérifie .env.local / .env.");
    process.exit(1);
  }

  const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log("");
  console.log("[Q20H5I] Audit intervention / lignes");
  console.log(`Intervention ID: ${interventionId}`);

  const intervention = await readDoc(db, "interventionsauto", interventionId);

  printRecord("INTERVENTION", intervention);

  if (!intervention) {
    process.exit(1);
  }

  const lineCollectionCandidates = [
    "lignesinterventionauto",
    "lignesinterventionsauto",
    "interventionlinesauto",
  ];

  let lines = [];

  for (const collectionName of lineCollectionCandidates) {
    const found = await readCollectionByField(
      db,
      collectionName,
      "interventionId",
      interventionId
    );

    if (found.length > 0) {
      console.log("");
      console.log(`[OK] Lignes trouvées dans ${collectionName}: ${found.length}`);
      lines = found.map((line) => ({
        ...line,
        __collectionName: collectionName,
      }));
      break;
    }
  }

  if (lines.length === 0) {
    console.log("");
    console.log("[INFO] Aucune ligne trouvée par interventionId.");
  }

  const activeLines = lines.filter((line) => !line.removedAt);
  const removedLines = lines.filter((line) => !!line.removedAt);
  const validatedActiveLines = activeLines.filter(
    (line) => String(line.statut || line.etat || "").toLowerCase() === "validee"
  );
  const draftActiveLines = activeLines.filter(
    (line) => String(line.statut || line.etat || "").toLowerCase() === "brouillon"
  );

  const expectedValidatedTotal = validatedActiveLines.reduce((sum, line) => {
    return sum + money(pick(line, ["montantTotal", "montantTTC", "total"]));
  }, 0);

  console.log("");
  console.log("=== SYNTHÈSE LIGNES ===");
  console.log(`Total lignes trouvées: ${lines.length}`);
  console.log(`Lignes actives: ${activeLines.length}`);
  console.log(`Lignes retirées: ${removedLines.length}`);
  console.log(`Lignes actives validées: ${validatedActiveLines.length}`);
  console.log(`Lignes actives brouillon: ${draftActiveLines.length}`);
  console.log(`Total attendu lignes validées actives: ${expectedValidatedTotal} FCFA`);

  console.log("");
  console.log("=== DÉTAIL LIGNES ===");

  for (const line of lines) {
    const statut = String(line.statut || line.etat || "");
    const montant = money(pick(line, ["montantTotal", "montantTTC", "total"]));
    const isRemoved = Boolean(line.removedAt);
    const isCounted =
      !isRemoved && statut.toLowerCase() === "validee";

    console.log("");
    console.log(`--- Ligne ${line.id} ---`);
    console.log(`collection: ${line.__collectionName}`);
    console.log(`designation: ${formatValue(pick(line, ["designation", "libelle", "nom", "label"]))}`);
    console.log(`statut: ${statut}`);
    console.log(`quantite: ${formatValue(line.quantite)}`);
    console.log(`montant: ${montant} FCFA`);
    console.log(`produitId: ${formatValue(line.produitId)}`);
    console.log(`stockId: ${formatValue(line.stockId)}`);
    console.log(`stockMovementId: ${formatValue(line.stockMovementId)}`);
    console.log(`stockReversalMovementId: ${formatValue(line.stockReversalMovementId)}`);
    console.log(`removedAt: ${formatValue(line.removedAt)}`);
    console.log(`removedFromStatus: ${formatValue(line.removedFromStatus)}`);
    console.log(`removedReason: ${formatValue(line.removedReason)}`);
    console.log(`COMPTÉE_DANS_TOTAL_VALIDÉ: ${isCounted ? "OUI" : "NON"}`);
  }

  const movementCollectionCandidates = [
    "mouvementsstockauto",
    "mouvementsstocksauto",
    "stockmovementsauto",
    "mouvementsauto",
  ];

  console.log("");
  console.log("=== MOUVEMENTS STOCK LIÉS AUX LIGNES ===");

  const movementIds = Array.from(
    new Set(
      lines
        .flatMap((line) => [
          line.stockMovementId,
          line.stockReversalMovementId,
        ])
        .filter(Boolean)
    )
  );

  if (movementIds.length === 0) {
    console.log("Aucun stockMovementId / stockReversalMovementId trouvé sur les lignes.");
  }

  for (const movementId of movementIds) {
    let movement = null;
    let movementCollection = "";

    for (const collectionName of movementCollectionCandidates) {
      try {
        const found = await readDoc(db, collectionName, movementId);

        if (found) {
          movement = found;
          movementCollection = collectionName;
          break;
        }
      } catch (error) {
        // ignore candidate errors
      }
    }

    if (!movement) {
      console.log("");
      console.log(`Mouvement ${movementId}: introuvable dans les collections candidates.`);
      continue;
    }

    console.log("");
    console.log(`--- Mouvement ${movementId} (${movementCollection}) ---`);
console.log(`typeMouvement: ${formatValue(movement.typeMouvement)}`);
console.log(`sourceId: ${formatValue(movement.sourceId)}`);
console.log(`ligneInterventionId: ${formatValue(movement.ligneInterventionId)}`);
console.log(`interventionId: ${formatValue(movement.interventionId)}`);
console.log(`originalStockMovementId: ${formatValue(movement.originalStockMovementId)}`);
    console.log(`statut: ${formatValue(movement.statut)}`);
    console.log(`produitId: ${formatValue(movement.produitId)}`);
    console.log(`stockId: ${formatValue(movement.stockId)}`);
    console.log(`quantite: ${formatValue(movement.quantite)}`);
    console.log(`motif: ${formatValue(movement.motif)}`);
    console.log(`sourceModule: ${formatValue(movement.sourceModule)}`);
    console.log(`sourceRecordId: ${formatValue(movement.sourceRecordId)}`);
    console.log(`createdAt: ${formatValue(movement.createdAt)}`);
  }

  console.log("");
  console.log("=== DIAGNOSTIC RAPIDE ===");

  if (removedLines.length > 0) {
    const removedWithoutReadonlyRisk = removedLines.length;
    console.log(`OK: ${removedWithoutReadonlyRisk} ligne(s) retirée(s) conservée(s) pour audit.`);
  }

  if (draftActiveLines.length > 0) {
    console.log(
      `INFO: ${draftActiveLines.length} ligne(s) brouillon active(s), visible(s) mais non comptée(s).`
    );
  }

  if (validatedActiveLines.length > 0) {
    console.log(
      `OK: ${validatedActiveLines.length} ligne(s) validée(s) active(s), comptée(s) dans le total.`
    );
  }

  const interventionTotalCandidates = [
    "totalLignesValidees",
    "montantLignesValidees",
    "totalLignes",
    "montantTotal",
    "total",
  ];

  console.log("");
  console.log("Totaux stockés sur intervention:");
  for (const key of interventionTotalCandidates) {
    if (intervention[key] !== undefined) {
      console.log(`${key}: ${formatValue(intervention[key])}`);
    }
  }

  console.log("");
  console.log("[DONE] Audit terminé. Aucun document n'a été modifié.");
}

main().catch((error) => {
  console.error("");
  console.error("[ERROR]", error);
  process.exit(1);
});