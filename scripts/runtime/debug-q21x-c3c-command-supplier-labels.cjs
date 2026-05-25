const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

for (const envFile of [".env.local", ".env"]) {
  const full = path.join(ROOT, envFile);
  if (!fs.existsSync(full)) continue;

  for (const line of fs.readFileSync(full, "utf8").split(/\r?\n/)) {
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
    collection,
    getDocs,
    doc,
    getDoc,
    limit,
    query,
  } = await import("firebase/firestore");

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const commandesSnap = await getDocs(
    query(collection(db, "commandesstockauto"), limit(20))
  );

  console.log("");
  console.log("[Q21X-C3C] Diagnostic commandes -> fournisseurs");
  console.log("Commandes trouvees:", commandesSnap.size);

  for (const commandeDoc of commandesSnap.docs) {
    const commande = commandeDoc.data();
    const fournisseurId = String(commande.fournisseurId ?? "").trim();

    console.log("");
    console.log("==================================================");
    console.log("Commande ID        :", commandeDoc.id);
    console.log("Numero commande    :", commande.numeroCommande ?? "");
    console.log("fournisseurId brut :", fournisseurId || "[VIDE]");
    console.log("statut             :", commande.statut ?? "");

    if (!fournisseurId) {
      console.log("DIAG: KO - aucun fournisseurId sur cette commande.");
      continue;
    }

    const fournisseursAutoSnap = await getDoc(
      doc(db, "fournisseursauto", fournisseurId)
    );

    const fournisseursSnap = await getDoc(
      doc(db, "fournisseurs", fournisseurId)
    );

    console.log("Existe fournisseursauto :", fournisseursAutoSnap.exists());
    console.log("Existe fournisseurs     :", fournisseursSnap.exists());

    const supplierSnap = fournisseursAutoSnap.exists()
      ? fournisseursAutoSnap
      : fournisseursSnap.exists()
        ? fournisseursSnap
        : null;

    if (!supplierSnap) {
      console.log("DIAG: KO - fournisseur introuvable pour cet ID.");
      continue;
    }

    const supplier = supplierSnap.data();

    console.log("Nom fournisseur     :", supplier.nom ?? "");
    console.log("Code fournisseur    :", supplier.codeFournisseur ?? "");
    console.log("Telephone           :", supplier.telephone ?? "");
    console.log("Email               :", supplier.email ?? "");

    const label = [
      commande.numeroCommande,
      supplier.nom,
      commande.statut,
    ]
      .filter(Boolean)
      .join(" · ");

    console.log("Label attendu       :", label);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});