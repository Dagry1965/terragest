import "dotenv/config";
import { db } from "@/infrastructure/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function seedERP() {
  console.log("Seed ERP Terragest demo data...");

  const exploitationRef = await addDoc(collection(db, "exploitations"), {
    nom: "Ferme Démo Terragest",
    type: "agricole",
    statut: "active",
    localisation: "Zone pilote",
    createdAt: serverTimestamp(),
  });

  const materielRef = await addDoc(collection(db, "materiels"), {
    nom: "Tracteur Démo",
    type: "tracteur",
    statut: "operationnel",
    exploitationId: exploitationRef.id,
    createdAt: serverTimestamp(),
  });

  const produitRef = await addDoc(collection(db, "produits"), {
    nom: "Engrais NPK Démo",
    categorie: "intrant",
    unite: "sac",
    createdAt: serverTimestamp(),
  });

  await addDoc(collection(db, "stocks"), {
    produitId: produitRef.id,
    quantite: 100,
    seuilAlerte: 20,
    emplacement: "Magasin principal",
    createdAt: serverTimestamp(),
  });

  await addDoc(collection(db, "interventions"), {
    materielId: materielRef.id,
    type: "maintenance_preventive",
    statut: "planifiee",
    description: "Contrôle général du tracteur démo",
    createdAt: serverTimestamp(),
  });

  await addDoc(collection(db, "paiements"), {
    objet: "Maintenance tracteur démo",
    montant: 250,
    statut: "en_attente",
    devise: "CHF",
    createdAt: serverTimestamp(),
  });

  await addDoc(collection(db, "notifications"), {
    titre: "Données ERP démo créées",
    message: "Le jeu de données de démonstration Terragest a été initialisé.",
    lu: false,
    createdAt: serverTimestamp(),
  });

  console.log("Seed ERP terminé.");
}

seedERP().catch((error) => {
  console.error("Erreur seed ERP:", error);
  process.exit(1);
});

