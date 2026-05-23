const fs = require("fs");
const path = require("path");

const root = process.cwd();

function readEnvLocal() {
  const envPath = path.join(root, ".env.local");

  if (!fs.existsSync(envPath)) {
    throw new Error(".env.local introuvable");
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const index = trimmed.indexOf("=");

    if (index === -1) {
      continue;
    }

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function now() {
  return Date.now();
}

function context(moduleKey) {
  return {
    tenantId: "ORG_AMARKHYS_001",
    workspace: "amarkhys",
    moduleKey,
    contextPath: "ORG_AMARKHYS_001/amarkhys/" + moduleKey,
    userId: "RGHcNSezlSbFQDUJQBUBfy0vMo13",
    updatedAt: now(),
  };
}

function money(value) {
  return Math.round(Number(value || 0));
}

function round(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

function computeLine({
  quantite,
  prixUnitaireTTC,
  tauxTVA = 18,
}) {
  const montantTTC = money(quantite * prixUnitaireTTC);
  const montantHT = money(montantTTC / (1 + tauxTVA / 100));
  const montantTVA = money(montantTTC - montantHT);
  const prixUnitaireHT = round(prixUnitaireTTC / (1 + tauxTVA / 100));

  return {
    quantite,
    prixUnitaire: prixUnitaireTTC,
    prixUnitaireHT,
    tauxTVA,
    montantHT,
    montantTVA,
    montantTTC,
    montantTotal: montantTTC,
  };
}

async function setStableDoc(db, collectionName, id, payload) {
  const {
    doc,
    setDoc,
    getDoc,
  } = await import("firebase/firestore");

  const ref = doc(db, collectionName, id);

  await setDoc(
    ref,
    {
      id,
      ...payload,
      createdAt: payload.createdAt || now(),
      updatedAt: now(),
    },
    {
      merge: true,
    }
  );

  const check = await getDoc(ref);

  if (!check.exists()) {
    throw new Error("Ecriture non confirmee : " + collectionName + "/" + id);
  }

  console.log("[OK]", collectionName + "/" + id);
}

async function main() {
  readEnvLocal();

  const {
    initializeApp,
    getApps,
  } = await import("firebase/app");

  const {
    getFirestore,
  } = await import("firebase/firestore");

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const app =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp(firebaseConfig);

  const db = getFirestore(app);

  console.log("[PROJECT]", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  console.log("[Q19H14A] Seed scenario demo AMARKHYS propre");
  console.log("");

  const clientId = "DEMO-CLIENT-001";
  const vehiculeId = "DEMO-VEH-001";
  const rendezVousId = "DEMO-RDV-001";
  const interventionId = "DEMO-INT-001";
  const factureId = "DEMO-FAC-001";
  const encaissementId = "DEMO-ENC-001";

  const dateRendezVous = "2026-05-27";
  const heureRendezVous = "10:00";
  const startAt = "2026-05-27T10:00:00.000";
  const endAt = "2026-05-27T11:15:00.000";
  const dateIntervention = "2026-05-27";
  const dateFacture = "2026-05-27";
  const datePaiement = "2026-05-27";

  const line1 = {
    id: "DEMO-LIGNE-001",
    interventionId,
    produitId: "MO-TECHNIQUE",
    stockId: "",
    produitCode: "MO-TECHNIQUE",
    produitNom: "Main d'oeuvre technique",
    typeArticle: "service",
    designation: "Main d'oeuvre technique - vidange et contrôle atelier",
    typeLigne: "main_oeuvre",
    ...computeLine({
      quantite: 1,
      prixUnitaireTTC: 25000,
    }),
    statut: "facturee",
    stockMovementId: "",
    stockProcessedAt: "",
    stockProcessedQuantity: 0,
    observations: "Forfait intervention mécanique courante.",
    ...context("lignesinterventionauto"),
  };

  const line2 = {
    id: "DEMO-LIGNE-002",
    interventionId,
    produitId: "PET-HUI-10W40-5L",
    stockId: "",
    produitCode: "PET-HUI-10W40-5L",
    produitNom: "PETRONAS Syntium 10W40 5L",
    typeArticle: "consommable",
    designation: "Huile moteur PETRONAS Syntium 10W40 5L",
    typeLigne: "piece",
    ...computeLine({
      quantite: 1,
      prixUnitaireTTC: 25000,
    }),
    statut: "facturee",
    stockMovementId: "",
    stockProcessedAt: "",
    stockProcessedQuantity: 1,
    observations: "Consommable utilisé pour la vidange.",
    ...context("lignesinterventionauto"),
  };

  const line3 = {
    id: "DEMO-LIGNE-003",
    interventionId,
    produitId: "VAL-LDR-5L",
    stockId: "",
    produitCode: "VAL-LDR-5L",
    produitNom: "Liquide de refroidissement Valeo 5L",
    typeArticle: "consommable",
    designation: "Contrôle et appoint liquide de refroidissement",
    typeLigne: "piece",
    ...computeLine({
      quantite: 1,
      prixUnitaireTTC: 14000,
    }),
    statut: "facturee",
    stockMovementId: "",
    stockProcessedAt: "",
    stockProcessedQuantity: 1,
    observations: "Appoint et contrôle circuit de refroidissement.",
    ...context("lignesinterventionauto"),
  };

  const lines = [
    line1,
    line2,
    line3,
  ];

  const montantHT =
    lines.reduce((sum, line) => sum + line.montantHT, 0);

  const montantTVA =
    lines.reduce((sum, line) => sum + line.montantTVA, 0);

  const montantTTC =
    lines.reduce((sum, line) => sum + line.montantTTC, 0);

  const montantPaye = 40000;
  const resteAPayer =
    Math.max(montantTTC - montantPaye, 0);

  await setStableDoc(db, "clientsauto", clientId, {
    codeClient: "CLI-DEMO-001",
    nom: "Kouassi",
    prenom: "Jean-Marc",
    telephone: "+225 07 11 22 33 44",
    email: "jeanmarc.kouassi@example.com",
    adresse: "Cocody Angré, Abidjan",
    ville: "Abidjan",
    pays: "Côte d'Ivoire",
    typeClient: "particulier",
    dateInscription: "2026-05-20",
    observations: "Client démonstration AMARKHYS pour présentation.",
    statut: "actif",
    ...context("clientsauto"),
  });

  await setStableDoc(db, "vehicules", vehiculeId, {
    immatriculation: "AB-123-CD",
    marque: "Toyota",
    modele: "Corolla",
    annee: 2019,
    vin: "DEMOAMARKHYSVIN001",
    carburant: "essence",
    kilometrage: 84500,
    dateMiseEnCirculation: "2019-06-15",
    clientId,
    prochaineVidange: "2026-08-27",
    prochainControleTechnique: "2026-12-15",
    assuranceExpiration: "2026-11-30",
    observations: "Véhicule démonstration pour parcours atelier complet.",
    statut: "actif",
    ...context("vehicules"),
  });

  await setStableDoc(db, "rendezvous", rendezVousId, {
    clientId,
    vehiculeId,
    dateRendezVous,
    heureRendezVous,
    durationMinutes: 75,
    startAt,
    endAt,
    consumedByInterventionId: interventionId,
    typeService: "vidange",
    motif: "Vidange moteur, contrôle niveaux et diagnostic rapide.",
    commentaire: "Rendez-vous confirmé pour démonstration AMARKHYS.",
    statut: "confirme",
    ...context("rendezvous"),
  });

  await setStableDoc(db, "interventionsauto", interventionId, {
    clientId,
    vehiculeId,
    rendezVousId,
    dateIntervention,
    typeIntervention: "Vidange et contrôle atelier",
    kilometrage: 84500,
    diagnostic: "Huile moteur à remplacer. Contrôle des niveaux recommandé.",
    travauxEffectues:
      "Vidange moteur, remplacement huile PETRONAS 10W40, contrôle liquide de refroidissement, inspection visuelle.",
    coutPieces: line2.montantTTC + line3.montantTTC,
    coutMainOeuvre: line1.montantTTC,
    coutTotal: montantTTC,
    statut: "facturee",
    ...context("interventionsauto"),
  });

  for (const line of lines) {
    await setStableDoc(
      db,
      "lignesinterventionauto",
      line.id,
      line
    );
  }

  await setStableDoc(db, "facturesauto", factureId, {
    numeroFacture: "FAC-DEMO-2026-001",
    publicToken: "demo-facture-amarkhys",
    token: "demo-facture-amarkhys",
    dateFacture,
    statutFacture: "emise",
    statutPaiement: resteAPayer > 0 ? "partiel" : "paye",
    clientId,
    vehiculeId,
    interventionId,
    montantHT,
    tva: montantTVA,
    montantTTC,
    montantPaye,
    resteAPayer,
    modePaiement: "mobile_money",
    statutEnvoiFacture: "envoyee",
    dernierEnvoiFactureAt: now(),
    canalDernierEnvoiFacture: "whatsapp",
    destinataireDernierEnvoiFacture: "+225 07 11 22 33 44",
    nombreEnvoisFacture: 1,
    observations:
      "Facture démonstration AMARKHYS liée au parcours RDV → intervention → facture → paiement.",
    ...context("facturesauto"),
  });

  await setStableDoc(db, "encaissementsauto", encaissementId, {
    factureId,
    clientId,
    vehiculeId,
    montant: montantPaye,
    datePaiement,
    modePaiement: "mobile_money",
    referenceTransaction: "MM-DEMO-2026-001",
    statut: "valide",
    numeroRecu: "REC-DEMO-2026-001",
    statutEnvoiRecu: "envoye",
    dernierEnvoiRecuAt: now(),
    canalDernierEnvoiRecu: "whatsapp",
    destinataireDernierEnvoiRecu: "+225 07 11 22 33 44",
    nombreEnvoisRecu: 1,
    notes: "Encaissement partiel démonstration AMARKHYS.",
    observations: "Reçu généré pour démonstration.",
    ...context("encaissementsauto"),
  });

  console.log("");
  console.log("[DONE] Scenario demo AMARKHYS propre seedé.");
  console.log("");
  console.log("Client:", clientId);
  console.log("Vehicule:", vehiculeId);
  console.log("RDV:", rendezVousId);
  console.log("Intervention:", interventionId);
  console.log("Facture:", factureId);
  console.log("Encaissement:", encaissementId);
  console.log("");
  console.log("Lien facture publique:");
  console.log("/facture/demo-facture-amarkhys");
  console.log("/facture/demo-facture-amarkhys/details");
  console.log("");
  console.log("Montant TTC:", montantTTC, "FCFA");
  console.log("Montant paye:", montantPaye, "FCFA");
  console.log("Reste a payer:", resteAPayer, "FCFA");
}

main().catch((error) => {
  console.error("[SEED_ERROR]", error);
  process.exit(1);
});