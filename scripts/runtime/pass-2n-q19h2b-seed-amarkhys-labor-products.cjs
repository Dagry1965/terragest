const fs = require("fs");
const path = require("path");

const root = process.cwd();

function readEnvLocal() {
  const envPath = path.join(root, ".env.local");
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index === -1) continue;

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

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function roundMoney(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

function profitability(item) {
  const prixAchat = Number(item.prixAchat || 0);
  const prixVente = Number(item.prixVente || 0);
  const tauxTVA = Number(item.tauxTVA || 18);

  const prixVenteHT =
    prixVente > 0
      ? roundMoney(prixVente / (1 + tauxTVA / 100))
      : 0;

  const montantTVA =
    roundMoney(prixVente - prixVenteHT);

  const margeBrute =
    roundMoney(prixVente - prixAchat);

  const margeNetteEstimee =
    roundMoney(prixVenteHT - prixAchat);

  const tauxMarge =
    prixAchat > 0
      ? roundMoney((margeBrute / prixAchat) * 100)
      : 0;

  const tauxRentabilite =
    prixVente > 0
      ? roundMoney((margeBrute / prixVente) * 100)
      : 0;

  return {
    prixVenteHT,
    montantTVA,
    margeBrute,
    margeNetteEstimee,
    tauxMarge,
    tauxRentabilite,
  };
}

function product(item) {
  return {
    id: item.reference,
    tenantId: "ORG_AMARKHYS_001",
    workspace: "amarkhys",
    moduleKey: "produitsauto",
    contextPath: "ORG_AMARKHYS_001/amarkhys/produitsauto",
    userId: "RGHcNSezlSbFQDUJQBUBfy0vMo13",
    createdAt: now(),
    updatedAt: now(),

    reference: item.reference,
    nom: item.nom,
    marque: item.marque,
    typeRecord: "simple",
    parentProductId: "",

    typeArticle: "service",
    categorie: "Main d’œuvre",
    sousCategorie: item.sousCategorie,
    typeProduit: "non_stockable",

    stockable: false,
    unite: "forfait",

    prixAchat: item.prixAchat,
    prixVente: item.prixVente,
    tauxTVA: 18,
    prixPromo: 0,
    seuilMinimum: 0,

    contenance: 0,
    uniteContenance: "",
    poids: 0,
    unitePoids: "",
    taille: "",
    couleur: "",
    modele: "",
    compatibilites: item.compatibilites,

    visibleBoutique: false,
    slugBoutique: slugify(item.nom),
    seoTitle: item.nom,
    seoDescription: item.description,

    imageOriginalUrl: "",
    imageThumbnailUrl: "",
    imageMediumUrl: "",
    imageLargeUrl: "",
    imageAlt: item.nom,
    imageStoragePath: "",

    ...profitability(item),

    description: item.description,
    statut: "actif",
  };
}

const laborProducts = [
  {
    reference: "MO-LEGERE",
    nom: "Main d’œuvre légère",
    marque: "AMARKHYS Garage",
    sousCategorie: "Petite intervention",
    prixAchat: 0,
    prixVente: 10000,
    compatibilites: "Diagnostic rapide, contrôle simple, petite opération atelier.",
    description: "Forfait main d’œuvre pour intervention légère ou diagnostic simple.",
  },
  {
    reference: "MO-STANDARD",
    nom: "Main d’œuvre standard",
    marque: "AMARKHYS Garage",
    sousCategorie: "Intervention courante",
    prixAchat: 0,
    prixVente: 25000,
    compatibilites: "Vidange, remplacement courant, contrôle approfondi, intervention mécanique standard.",
    description: "Forfait main d’œuvre pour intervention mécanique courante.",
  },
  {
    reference: "MO-RENFORCEE",
    nom: "Main d’œuvre renforcée",
    marque: "AMARKHYS Garage",
    sousCategorie: "Intervention complexe",
    prixAchat: 0,
    prixVente: 50000,
    compatibilites: "Diagnostic complexe, démontage important, intervention longue ou technique.",
    description: "Forfait main d’œuvre pour intervention complexe ou longue durée.",
  },
];

async function main() {
  readEnvLocal();

  const { initializeApp, getApps } = await import("firebase/app");
  const { getFirestore, doc, setDoc, getDoc } = await import("firebase/firestore");

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

  console.log("[PROJECT]", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  console.log("[SEED]", laborProducts.length, "prestations main d’œuvre");

  for (const item of laborProducts) {
    const payload = product(item);
    const ref = doc(db, "produitsauto", payload.reference);

    await setDoc(ref, payload, { merge: true });

    const check = await getDoc(ref);

    if (!check.exists()) {
      throw new Error("Ecriture non confirmee pour " + payload.reference);
    }

    console.log("[SERVICE]", payload.reference, "-", payload.nom);
  }

  console.log("");
  console.log("[DONE] Prestations main d’œuvre AMARKHYS importées.");
  console.log("Total : 3");
}

main().catch((error) => {
  console.error("[SEED_ERROR]", error);
  process.exit(1);
});