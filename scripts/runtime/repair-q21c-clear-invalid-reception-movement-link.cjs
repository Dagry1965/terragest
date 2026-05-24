const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const receptionId = process.argv[2];

if (!receptionId) {
  console.error("Usage: node scripts/runtime/repair-q21c-clear-invalid-reception-movement-link.cjs <receptionId>");
  process.exit(1);
}

for (const envFile of [".env.local", ".env"]) {
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
    updateDoc,
    deleteField,
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

  const receptionRef = doc(db, "receptionsstockauto", receptionId);
  const receptionSnap = await getDoc(receptionRef);

  if (!receptionSnap.exists()) {
    console.error("[ERROR] Reception introuvable:", receptionId);
    process.exit(1);
  }

  const reception = {
    id: receptionSnap.id,
    ...receptionSnap.data(),
  };

  const movementId = String(reception.mouvementStockId ?? "");

  console.log("");
  console.log("[Q21C_REPAIR] Clear invalid reception movement link");
  console.log("Reception:", receptionId);
  console.log("Current mouvementStockId:", movementId || "(vide)");

  if (!movementId) {
    console.log("[SKIP] Aucun mouvementStockId a nettoyer.");
    return;
  }

  const movementRef = doc(db, "mouvementsstockauto", movementId);
  const movementSnap = await getDoc(movementRef);

  if (movementSnap.exists()) {
    const movement = {
      id: movementSnap.id,
      ...movementSnap.data(),
    };

    console.log("Linked movement sourceModule:", movement.sourceModule ?? "");
    console.log("Linked movement sourceId:", movement.sourceId ?? "");
    console.log("Linked movement receptionId:", movement.receptionId ?? "");
    console.log("Linked movement quantite:", movement.quantite ?? "");

    const isValidReceptionMovement =
      String(movement.sourceModule ?? "") === "receptionsstockauto" &&
      String(movement.sourceId ?? "") === receptionId;

    if (isValidReceptionMovement) {
      console.log("[SKIP] Le mouvement lie est coherent. Aucun nettoyage.");
      return;
    }
  } else {
    console.log("[WARN] Mouvement lie introuvable. Nettoyage de la reference reception.");
  }

  await updateDoc(receptionRef, {
    mouvementStockId: deleteField(),
    stockProcessedAt: deleteField(),
    stockProcessedQuantity: deleteField(),
    updatedAt: new Date().toISOString(),
  });

  console.log("[DONE] mouvementStockId invalide supprime de la reception.");
  console.log("");
  console.log("Next:");
  console.log(`  node scripts/runtime/audit-q21c-stock-reception.cjs ${receptionId}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});