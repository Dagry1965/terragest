const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const receptionId = process.argv[2];

if (!receptionId) {
  console.error("Usage: node scripts/runtime/audit-q21c-stock-reception.cjs <receptionId>");
  process.exit(1);
}

const envFiles = [
  ".env.local",
  ".env",
];

for (const envFile of envFiles) {
  const full = path.join(ROOT, envFile);

  if (!fs.existsSync(full)) continue;

  const lines = fs.readFileSync(full, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");

    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

async function main() {
  const { initializeApp, getApps } = await import("firebase/app");
  const {
    getFirestore,
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    where,
  } = await import("firebase/firestore");

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if (!firebaseConfig.projectId) {
    console.error("[ERROR] Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID");
    process.exit(1);
  }

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function read(collectionName, id) {
    const snap = await getDoc(doc(db, collectionName, id));

    if (!snap.exists()) return null;

    return {
      id: snap.id,
      ...snap.data(),
    };
  }

  async function listWhere(collectionName, field, op, value) {
    const snap = await getDocs(
      query(
        collection(db, collectionName),
        where(field, op, value)
      )
    );

    return snap.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
  }

  function display(value) {
    if (value && typeof value === "object" && "seconds" in value) {
      return new Date(value.seconds * 1000).toISOString();
    }

    return value ?? "";
  }

  console.log("");
  console.log("[Q21C] Audit reception stock");
  console.log("Reception ID:", receptionId);
  console.log("");

  const reception = await read("receptionsstockauto", receptionId);

  if (!reception) {
    console.log("[ERROR] Reception introuvable.");
    return;
  }

  console.log("=== RECEPTION ===");
  for (const key of [
    "id",
    "commandeId",
    "ligneCommandeId",
    "produitId",
    "stockId",
    "quantiteRecue",
    "statut",
    "mouvementStockId",
    "stockProcessedAt",
    "stockProcessedQuantity",
    "createdAt",
    "updatedAt",
  ]) {
    console.log(`${key}:`, display(reception[key]));
  }

  const stockId = String(reception.stockId ?? "");
  const movementId = String(reception.mouvementStockId ?? "");

  console.log("");

  let linkedMovement = null;

  if (movementId) {
    linkedMovement = await read("mouvementsstockauto", movementId);

    console.log("=== MOUVEMENT LIE PAR mouvementStockId ===");

    if (!linkedMovement) {
      console.log("[WARN] mouvementStockId renseigne mais mouvement introuvable:", movementId);
    } else {
      for (const key of [
        "id",
        "typeMouvement",
        "sourceModule",
        "sourceId",
        "receptionId",
        "commandeId",
        "ligneCommandeId",
        "produitId",
        "stockId",
        "quantite",
        "quantiteAvant",
        "quantiteApres",
        "statut",
        "dateMouvement",
        "createdAt",
      ]) {
        console.log(`${key}:`, display(linkedMovement[key]));
      }
    }
  } else {
    console.log("=== MOUVEMENT LIE PAR mouvementStockId ===");
    console.log("[INFO] Aucun mouvementStockId sur la reception.");
  }

  console.log("");

  const movementsBySource =
    await listWhere("mouvementsstockauto", "sourceId", "==", receptionId);

  console.log("=== MOUVEMENTS AVEC sourceId = receptionId ===");
  console.log("Nombre:", movementsBySource.length);

  for (const movement of movementsBySource) {
    console.log("");
    console.log(`--- ${movement.id} ---`);
    console.log("typeMouvement:", display(movement.typeMouvement));
    console.log("sourceModule:", display(movement.sourceModule));
    console.log("sourceId:", display(movement.sourceId));
    console.log("quantite:", display(movement.quantite));
    console.log("quantiteAvant:", display(movement.quantiteAvant));
    console.log("quantiteApres:", display(movement.quantiteApres));
    console.log("stockId:", display(movement.stockId));
    console.log("produitId:", display(movement.produitId));
  }

  console.log("");

  if (stockId) {
    const stock = await read("stocksauto", stockId);

    console.log("=== STOCK DESTINATION ===");

    if (!stock) {
      console.log("[WARN] Stock introuvable:", stockId);
    } else {
      for (const key of [
        "id",
        "produitId",
        "nom",
        "emplacement",
        "quantite",
        "seuilAlerte",
        "statut",
        "updatedAt",
      ]) {
        console.log(`${key}:`, display(stock[key]));
      }
    }
  }

  console.log("");
  console.log("=== DIAGNOSTIC RAPIDE ===");

  const expectedQuantity = Number(reception.quantiteRecue ?? 0);
  const movementQuantity = Number(linkedMovement?.quantite ?? 0);

  if (!movementId) {
    console.log("INFO: Reception validee sans mouvementStockId ou encore brouillon.");
  } else if (!linkedMovement) {
    console.log("WARN: mouvementStockId pointe vers un mouvement inexistant.");
  } else if (movementQuantity !== expectedQuantity) {
    console.log(
      `WARN: quantite mouvement (${movementQuantity}) differente de quantiteRecue (${expectedQuantity}).`
    );
  } else {
    console.log("OK: mouvement lie coherent avec la quantite recue.");
  }

  if (movementsBySource.length > 1) {
    console.log("WARN: plusieurs mouvements ont sourceId = receptionId. Risque de double traitement.");
  } else {
    console.log("OK: pas de doublon sourceId detecte.");
  }

  console.log("");
  console.log("[DONE] Audit termine. Aucun document modifie.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});