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

function context(id) {
  return {
    id,
    tenantId: "ORG_AMARKHYS_001",
    workspace: "amarkhys",
    moduleKey: "produitsauto",
    contextPath: "ORG_AMARKHYS_001/amarkhys/produitsauto",
    userId: "RGHcNSezlSbFQDUJQBUBfy0vMo13",
    createdAt: now(),
    updatedAt: now(),
    statut: "actif",
  };
}

function product(item) {
  return {
    ...context(item.reference),
    reference: item.reference,
    nom: item.nom,
    marque: item.marque,
    typeRecord: item.typeRecord,
    parentProductId: item.parentProductId || "",
    typeArticle: item.typeArticle,
    categorie: item.categorie,
    sousCategorie: item.sousCategorie,
    typeProduit: item.typeProduit,
    stockable: item.stockable,
    unite: item.unite,
    prixAchat: item.prixAchat || 0,
    prixVente: item.prixVente || 0,
    tauxTVA: item.tauxTVA || 18,
    prixPromo: item.prixPromo || 0,
    seuilMinimum: item.seuilMinimum || 0,
    contenance: item.contenance || 0,
    uniteContenance: item.uniteContenance || "",
    poids: item.poids || 0,
    unitePoids: item.unitePoids || "",
    taille: item.taille || "",
    couleur: item.couleur || "",
    modele: item.modele || "",
    compatibilites: item.compatibilites || "",
    visibleBoutique: item.visibleBoutique || false,
    slugBoutique: slugify(item.nom),
    seoTitle: item.nom,
    seoDescription: item.description || item.nom,
    imageOriginalUrl: "",
    imageThumbnailUrl: "",
    imageMediumUrl: "",
    imageLargeUrl: "",
    imageAlt: item.nom,
    imageStoragePath: "",
    ...profitability(item),
    description: item.description || "",
  };
}

const products = [
  {
    reference: "FAM-HUILES-MOTEUR",
    nom: "Huiles moteur",
    marque: "PETRONAS",
    typeRecord: "family",
    typeArticle: "consommable",
    categorie: "Entretien moteur",
    sousCategorie: "Huile moteur",
    typeProduit: "non_stockable",
    stockable: false,
    unite: "famille",
    description: "Famille regroupant les huiles moteur essence et diesel.",
  },
  {
    reference: "FAM-BATTERIES",
    nom: "Batteries automobiles",
    marque: "Bosch",
    typeRecord: "family",
    typeArticle: "piece",
    categorie: "Electricite",
    sousCategorie: "Batterie",
    typeProduit: "non_stockable",
    stockable: false,
    unite: "famille",
    description: "Famille regroupant les batteries voitures et utilitaires.",
  },
  {
    reference: "FAM-LUB-GRAISSES",
    nom: "Lubrifiants et graisses",
    marque: "PETRONAS",
    typeRecord: "family",
    typeArticle: "consommable",
    categorie: "Entretien mecanique",
    sousCategorie: "Graisse mecanique",
    typeProduit: "non_stockable",
    stockable: false,
    unite: "famille",
    description: "Famille regroupant les graisses mecaniques et lubrifiants atelier.",
  },
  {
    reference: "FAM-LIQUIDES-TECH",
    nom: "Liquides techniques",
    marque: "Valeo",
    typeRecord: "family",
    typeArticle: "consommable",
    categorie: "Refroidissement",
    sousCategorie: "Liquide de refroidissement",
    typeProduit: "non_stockable",
    stockable: false,
    unite: "famille",
    description: "Famille regroupant les liquides de refroidissement et liquides techniques.",
  },
  {
    reference: "PET-HUI-10W40-5L",
    nom: "PETRONAS Syntium 10W40 5L",
    marque: "PETRONAS",
    typeRecord: "simple",
    typeArticle: "consommable",
    categorie: "Entretien moteur",
    sousCategorie: "Huile moteur essence",
    typeProduit: "stockable",
    stockable: true,
    unite: "bidon",
    contenance: 5,
    uniteContenance: "l",
    prixAchat: 18000,
    prixVente: 25000,
    seuilMinimum: 5,
    description: "Huile moteur PETRONAS Syntium 10W40 en bidon de 5 litres.",
  },
  {
    reference: "BOS-BAT-60AH",
    nom: "Batterie Bosch 60Ah",
    marque: "Bosch",
    typeRecord: "simple",
    typeArticle: "piece",
    categorie: "Electricite",
    sousCategorie: "Batterie voiture",
    typeProduit: "stockable",
    stockable: true,
    unite: "piece",
    modele: "60Ah",
    compatibilites: "Vehicules legers essence et diesel selon compatibilite constructeur.",
    prixAchat: 42000,
    prixVente: 60000,
    seuilMinimum: 3,
    description: "Batterie Bosch 60Ah pour vehicule leger.",
  },
  {
    reference: "VAL-FREIN-AV",
    nom: "Plaquettes de frein avant Valeo",
    marque: "Valeo",
    typeRecord: "simple",
    typeArticle: "piece",
    categorie: "Freinage",
    sousCategorie: "Freinage avant",
    typeProduit: "stockable",
    stockable: true,
    unite: "jeu",
    compatibilites: "Train avant, vehicules compatibles selon reference constructeur.",
    prixAchat: 18000,
    prixVente: 28000,
    seuilMinimum: 4,
    description: "Jeu de plaquettes de frein avant Valeo.",
  },
  {
    reference: "VAL-LDR-5L",
    nom: "Liquide de refroidissement Valeo 5L",
    marque: "Valeo",
    typeRecord: "simple",
    typeArticle: "consommable",
    categorie: "Refroidissement",
    sousCategorie: "Liquide de refroidissement",
    typeProduit: "stockable",
    stockable: true,
    unite: "bidon",
    contenance: 5,
    uniteContenance: "l",
    prixAchat: 8000,
    prixVente: 14000,
    seuilMinimum: 6,
    description: "Liquide de refroidissement Valeo en bidon de 5 litres.",
  },
  {
    reference: "PET-HUI-5W30-1L",
    parentProductId: "FAM-HUILES-MOTEUR",
    nom: "PETRONAS Syntium 5W30 1L",
    marque: "PETRONAS",
    typeRecord: "variant",
    typeArticle: "consommable",
    categorie: "Entretien moteur",
    sousCategorie: "Huile moteur essence",
    typeProduit: "stockable",
    stockable: true,
    unite: "bidon",
    contenance: 1,
    uniteContenance: "l",
    prixAchat: 4500,
    prixVente: 7000,
    seuilMinimum: 10,
    description: "Variante 1 litre de l'huile moteur PETRONAS Syntium 5W30.",
  },
  {
    reference: "PET-HUI-5W30-5L",
    parentProductId: "FAM-HUILES-MOTEUR",
    nom: "PETRONAS Syntium 5W30 5L",
    marque: "PETRONAS",
    typeRecord: "variant",
    typeArticle: "consommable",
    categorie: "Entretien moteur",
    sousCategorie: "Huile moteur essence",
    typeProduit: "stockable",
    stockable: true,
    unite: "bidon",
    contenance: 5,
    uniteContenance: "l",
    prixAchat: 19000,
    prixVente: 28000,
    seuilMinimum: 5,
    description: "Variante 5 litres de l'huile moteur PETRONAS Syntium 5W30.",
  },
  {
    reference: "BOS-BAT-45AH",
    parentProductId: "FAM-BATTERIES",
    nom: "Batterie Bosch 45Ah",
    marque: "Bosch",
    typeRecord: "variant",
    typeArticle: "piece",
    categorie: "Electricite",
    sousCategorie: "Batterie voiture",
    typeProduit: "stockable",
    stockable: true,
    unite: "piece",
    modele: "45Ah",
    compatibilites: "Vehicules legers urbains selon compatibilite constructeur.",
    prixAchat: 32000,
    prixVente: 48000,
    seuilMinimum: 3,
    description: "Variante batterie Bosch 45Ah pour vehicule leger.",
  },
  {
    reference: "BOS-BAT-75AH",
    parentProductId: "FAM-BATTERIES",
    nom: "Batterie Bosch 75Ah",
    marque: "Bosch",
    typeRecord: "variant",
    typeArticle: "piece",
    categorie: "Electricite",
    sousCategorie: "Batterie utilitaire",
    typeProduit: "stockable",
    stockable: true,
    unite: "piece",
    modele: "75Ah",
    compatibilites: "Vehicules utilitaires et grosses cylindrees selon compatibilite constructeur.",
    prixAchat: 58000,
    prixVente: 78000,
    seuilMinimum: 2,
    description: "Variante batterie Bosch 75Ah pour vehicule utilitaire.",
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
  console.log("[SEED]", products.length, "produits");

  for (const item of products) {
    const payload = product(item);
    const ref = doc(db, "produitsauto", payload.reference);

    await setDoc(ref, payload, { merge: true });

    const check = await getDoc(ref);

    if (!check.exists()) {
      throw new Error("Ecriture non confirmee pour " + payload.reference);
    }

    console.log("[" + payload.typeRecord.toUpperCase() + "]", payload.reference, "-", payload.nom);
  }

  console.log("");
  console.log("[DONE] Catalogue produits AMARKHYS importe.");
  console.log("Total : 12");
}

main().catch((error) => {
  console.error("[SEED_ERROR]", error);
  process.exit(1);
});