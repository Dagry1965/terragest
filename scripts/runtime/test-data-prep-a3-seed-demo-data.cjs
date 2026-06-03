const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const ROOT = process.cwd();
const EXPECTED_PROJECT_ID = "terragest-dev";

const TARGET_COLLECTIONS = [
  "clientsauto",
  "vehicules",
  "rendezvous",
  "interventionsauto",
  "lignesinterventionauto",
  "facturesauto",
  "encaissementsauto",
  "produitsauto",
  "stocksauto",
  "fournisseursauto",
  "commandesstockauto",
  "lignescommandestockauto",
  "receptionsstockauto",
  "mouvementsstockauto",
  "rappelsauto",
];

const PROTECTED_COLLECTIONS = [
  "users",
  "utilisateurs",
  "employees",
  "employes",
  "erpUsers",
  "userProfiles",
  "tenants",
  "workspaces",
  "roles",
  "permissions",
  "runtimeSchedulingSettings",
];

const FOUNDATION_COLLECTIONS = [
  "fournisseursauto",
  "produitsauto",
  "stocksauto",
];

const CLIENTS_VEHICLES_COLLECTIONS = [
  "clientsauto",
  "vehicules",
];

const DOWNSTREAM_COLLECTIONS = [
  "rendezvous",
  "interventionsauto",
  "lignesinterventionauto",
  "facturesauto",
  "encaissementsauto",
  "commandesstockauto",
  "lignescommandestockauto",
  "receptionsstockauto",
  "mouvementsstockauto",
  "rappelsauto",
];
const args = process.argv.slice(2);
const writeEnabled = args.includes("--confirm-seed-foundation");
const seedClientsVehiclesEnabled = args.includes("--confirm-seed-clients-vehicles");

const NOW_ISO = new Date().toISOString();

const SUPPLIERS = [
  {
    id: "demo-supplier-main",
    data: {
      nom: "GarageParts Distribution",
      codeFournisseur: "FOU-GPD-001",
      telephone: "+2250700000000",
      email: "contact@garageparts.example",
      adresse: "Zone industrielle, Abidjan",
      observations: "Fournisseur principal huiles, filtres et consommables.",
      statut: "actif",
    },
  },
  {
    id: "demo-supplier-brake",
    data: {
      nom: "BrakePro Services",
      codeFournisseur: "FOU-BRK-002",
      telephone: "+2250700000001",
      email: "contact@brakepro.example",
      adresse: "Boulevard de Marseille, Abidjan",
      observations: "Fournisseur freinage : plaquettes, disques, liquide DOT4.",
      statut: "actif",
    },
  },
  {
    id: "demo-supplier-battery",
    data: {
      nom: "EnergyAuto Batteries",
      codeFournisseur: "FOU-BAT-003",
      telephone: "+2250700000002",
      email: "contact@energyauto.example",
      adresse: "Cocody, Abidjan",
      observations: "Fournisseur batteries et accessoires Ã©lectriques.",
      statut: "actif",
    },
  },
];

const PRODUCTS = [
  product("demo-product-oil-5w30", "HUI-5W30-001", "Huile moteur 5W30 synthÃ¨se", {
    marque: "PETRONAS",
    categorie: "huile_moteur",
    typeArticle: "piece",
    unite: "bidon",
    contenance: 5,
    uniteContenance: "L",
    prixAchat: 6500,
    prixVente: 8500,
    seuilMinimum: 8,
    stock: 40,
  }),
  product("demo-product-oil-10w40", "HUI-10W40-002", "Huile moteur 10W40", {
    marque: "TotalEnergies",
    categorie: "huile_moteur",
    typeArticle: "piece",
    unite: "bidon",
    contenance: 5,
    uniteContenance: "L",
    prixAchat: 4800,
    prixVente: 6500,
    seuilMinimum: 8,
    stock: 30,
  }),
  product("demo-product-gear-oil-75w80", "HUI-BV-75W80", "Huile boÃ®te 75W80", {
    marque: "Motul",
    categorie: "huile_moteur",
    typeArticle: "piece",
    unite: "bidon",
    contenance: 2,
    uniteContenance: "L",
    prixAchat: 7000,
    prixVente: 9500,
    seuilMinimum: 4,
    stock: 12,
  }),
  product("demo-product-oil-filter", "FIL-HUI-001", "Filtre Ã  huile", {
    marque: "Bosch",
    categorie: "filtre",
    typeArticle: "piece",
    unite: "unitÃ©",
    prixAchat: 3000,
    prixVente: 4500,
    seuilMinimum: 10,
    stock: 50,
  }),
  product("demo-product-air-filter", "FIL-AIR-001", "Filtre Ã  air", {
    marque: "Mann Filter",
    categorie: "filtre",
    typeArticle: "piece",
    unite: "unitÃ©",
    prixAchat: 3800,
    prixVente: 5500,
    seuilMinimum: 6,
    stock: 25,
  }),
  product("demo-product-cabin-filter", "FIL-HAB-001", "Filtre habitacle", {
    marque: "Mann Filter",
    categorie: "filtre",
    typeArticle: "piece",
    unite: "unitÃ©",
    prixAchat: 4200,
    prixVente: 6000,
    seuilMinimum: 5,
    stock: 20,
  }),
  product("demo-product-drain-plug-seal", "JNT-VID-001", "Joint bouchon vidange", {
    marque: "AMARKHYS",
    categorie: "piece",
    typeArticle: "piece",
    unite: "unitÃ©",
    prixAchat: 200,
    prixVente: 500,
    seuilMinimum: 25,
    stock: 100,
  }),
  product("demo-product-brake-fluid-dot4", "LIQ-FRE-DOT4", "Liquide de frein DOT4", {
    marque: "ATE",
    categorie: "liquide",
    typeArticle: "piece",
    unite: "bidon",
    contenance: 1,
    uniteContenance: "L",
    prixAchat: 2300,
    prixVente: 3500,
    seuilMinimum: 5,
    stock: 20,
  }),
  product("demo-product-front-brake-pads", "FRN-PLA-AV", "Plaquettes frein avant", {
    marque: "Bosch",
    categorie: "piece",
    typeArticle: "piece",
    unite: "jeu",
    prixAchat: 13000,
    prixVente: 18000,
    seuilMinimum: 4,
    stock: 16,
  }),
  product("demo-product-rear-brake-pads", "FRN-PLA-AR", "Plaquettes frein arriÃ¨re", {
    marque: "Bosch",
    categorie: "piece",
    typeArticle: "piece",
    unite: "jeu",
    prixAchat: 11500,
    prixVente: 16000,
    seuilMinimum: 4,
    stock: 14,
  }),
  product("demo-product-front-brake-discs", "FRN-DSQ-AV", "Disques frein avant", {
    marque: "Brembo",
    categorie: "piece",
    typeArticle: "piece",
    unite: "paire",
    prixAchat: 24000,
    prixVente: 32000,
    seuilMinimum: 3,
    stock: 8,
  }),
  product("demo-product-brake-cleaner", "NET-FRE-001", "Nettoyant frein", {
    marque: "Liqui Moly",
    categorie: "consommable",
    typeArticle: "piece",
    unite: "aÃ©rosol",
    prixAchat: 1500,
    prixVente: 2500,
    seuilMinimum: 8,
    stock: 35,
  }),
  product("demo-product-coolant", "LIQ-REF-001", "Liquide de refroidissement universel", {
    marque: "TotalEnergies",
    categorie: "liquide",
    typeArticle: "piece",
    unite: "bidon",
    contenance: 5,
    uniteContenance: "L",
    prixAchat: 2800,
    prixVente: 4000,
    seuilMinimum: 6,
    stock: 24,
  }),
  product("demo-product-washer-fluid", "LAV-HIV-001", "Lave-glace hiver", {
    marque: "AMARKHYS",
    categorie: "consommable",
    typeArticle: "piece",
    unite: "bidon",
    contenance: 5,
    uniteContenance: "L",
    prixAchat: 1200,
    prixVente: 2000,
    seuilMinimum: 10,
    stock: 40,
  }),
  product("demo-product-penetrating-oil", "SPR-DEG-001", "Spray dÃ©grippant", {
    marque: "WD-40",
    categorie: "consommable",
    typeArticle: "piece",
    unite: "aÃ©rosol",
    prixAchat: 2000,
    prixVente: 3000,
    seuilMinimum: 5,
    stock: 18,
  }),
  product("demo-product-injector-cleaner", "NET-INJ-001", "Nettoyant injecteurs", {
    marque: "Bardahl",
    categorie: "consommable",
    typeArticle: "piece",
    unite: "flacon",
    prixAchat: 3200,
    prixVente: 4500,
    seuilMinimum: 4,
    stock: 12,
  }),
  product("demo-product-bulb-h7", "AMP-H7-001", "Ampoule H7", {
    marque: "Philips",
    categorie: "piece",
    typeArticle: "piece",
    unite: "unitÃ©",
    prixAchat: 2300,
    prixVente: 3500,
    seuilMinimum: 6,
    stock: 20,
  }),
  product("demo-product-wiper-blades", "ESS-AV-001", "Balai essuie-glace avant", {
    marque: "Valeo",
    categorie: "piece",
    typeArticle: "piece",
    unite: "paire",
    prixAchat: 5000,
    prixVente: 7000,
    seuilMinimum: 5,
    stock: 18,
  }),
  product("demo-product-fuse-kit", "FUS-KIT-001", "Fusibles assortis", {
    marque: "AMARKHYS",
    categorie: "piece",
    typeArticle: "piece",
    unite: "kit",
    prixAchat: 800,
    prixVente: 1500,
    seuilMinimum: 10,
    stock: 40,
  }),
  product("demo-product-battery-45ah", "BAT-45AH-001", "Batterie 45Ah", {
    marque: "Varta",
    categorie: "piece",
    typeArticle: "piece",
    unite: "unitÃ©",
    prixAchat: 38000,
    prixVente: 48000,
    seuilMinimum: 2,
    stock: 6,
  }),
  product("demo-product-battery-60ah", "BAT-60AH-001", "Batterie 60Ah", {
    marque: "Varta",
    categorie: "piece",
    typeArticle: "piece",
    unite: "unitÃ©",
    prixAchat: 50000,
    prixVente: 62000,
    seuilMinimum: 2,
    stock: 5,
  }),
  product("demo-product-clamp", "COL-SER-001", "Collier de serrage", {
    marque: "AMARKHYS",
    categorie: "piece",
    typeArticle: "piece",
    unite: "unitÃ©",
    prixAchat: 300,
    prixVente: 800,
    seuilMinimum: 20,
    stock: 80,
  }),
  product("demo-product-battery-terminal", "COS-BAT-001", "Cosse batterie", {
    marque: "AMARKHYS",
    categorie: "piece",
    typeArticle: "piece",
    unite: "unitÃ©",
    prixAchat: 1500,
    prixVente: 2500,
    seuilMinimum: 6,
    stock: 25,
  }),
  service("demo-service-diagnostic", "SRV-DIAG-001", "Diagnostic Ã©lectronique", {
    prixAchat: 0,
    prixVente: 15000,
    typeArticle: "service",
  }),
  service("demo-service-labor", "SRV-MO-001", "Main dâ€™Å“uvre mÃ©canique", {
    prixAchat: 0,
    prixVente: 12000,
    typeArticle: "main_oeuvre",
  }),
  service("demo-service-oil-change", "SRV-VID-001", "Forfait vidange", {
    prixAchat: 0,
    prixVente: 18000,
    typeArticle: "service",
  }),
];

function product(id, reference, nom, options) {
  const stock = Number(options.stock || 0);
  const seuilMinimum = Number(options.seuilMinimum || 0);

  return {
    id,
    stockable: true,
    stock,
    stockId: `demo-stock-main-${id.replace("demo-product-", "")}`,
    data: {
      reference,
      nom,
      marque: options.marque || "AMARKHYS",
      typeRecord: "simple",
      typeArticle: options.typeArticle || "piece",
      categorie: options.categorie,
      typeProduit: "stockable",
      stockable: true,
      unite: options.unite || "unitÃ©",
      contenance: options.contenance || null,
      uniteContenance: options.uniteContenance || null,
      prixAchat: Number(options.prixAchat || 0),
      prixVente: Number(options.prixVente || 0),
      tauxTVA: 18,
      seuilMinimum,
      description: `Produit de dÃ©monstration AMARKHYS â€” ${nom}.`,
      statut: stock <= 0 ? "rupture" : stock <= seuilMinimum ? "rupture" : "actif",
      createdAt: NOW_ISO,
      updatedAt: NOW_ISO,
      seedTag: "TEST-DATA-PREP-A3",
    },
  };
}

function service(id, reference, nom, options) {
  return {
    id,
    stockable: false,
    stock: 0,
    stockId: null,
    data: {
      reference,
      nom,
      marque: "AMARKHYS",
      typeRecord: "simple",
      typeArticle: options.typeArticle || "service",
      categorie: "service",
      typeProduit: "non_stockable",
      stockable: false,
      unite: "prestation",
      prixAchat: Number(options.prixAchat || 0),
      prixVente: Number(options.prixVente || 0),
      tauxTVA: 18,
      seuilMinimum: 0,
      description: `Prestation de dÃ©monstration AMARKHYS â€” ${nom}.`,
      statut: "actif",
      createdAt: NOW_ISO,
      updatedAt: NOW_ISO,
      seedTag: "TEST-DATA-PREP-A3",
    },
  };
}

function buildStockForProduct(item) {
  const quantity = Number(item.stock || 0);
  const seuilAlerte = Number(item.data.seuilMinimum || 0);

  return {
    id: item.stockId,
    data: {
      produitId: item.id,
      quantite: quantity,
      seuilAlerte,
      emplacement: "Stock principal atelier",
      typeStock: "atelier",
      statut:
        quantity <= 0
          ? "rupture"
          : quantity <= seuilAlerte
            ? "stock_faible"
            : "disponible",
      observations:
        "Stock de dÃ©monstration gÃ©nÃ©rÃ© pour AMARKHYS. Emplacement logique commun.",
      createdAt: NOW_ISO,
      updatedAt: NOW_ISO,
      seedTag: "TEST-DATA-PREP-A3",
    },
  };
}

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");

  if (!fs.existsSync(envPath)) {
    console.log("[ENV] .env.local not found, using current process.env only.");
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

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

  console.log("[ENV] .env.local loaded.");
}

function initFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!projectId) {
    throw new Error(
      "Missing Firebase project id. Expected FIREBASE_PROJECT_ID or NEXT_PUBLIC_FIREBASE_PROJECT_ID."
    );
  }

  if (projectId !== EXPECTED_PROJECT_ID) {
    throw new Error(
      `Unsafe project. Expected ${EXPECTED_PROJECT_ID}, received ${projectId}.`
    );
  }

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error(
      "Missing GOOGLE_APPLICATION_CREDENTIALS. Set it to the local Firebase service account JSON."
    );
  }

  if (!fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    throw new Error(
      "GOOGLE_APPLICATION_CREDENTIALS file not found: " +
        process.env.GOOGLE_APPLICATION_CREDENTIALS
    );
  }

  console.log("[FIREBASE] Project:", projectId);
  console.log("[FIREBASE] Credentials:", process.env.GOOGLE_APPLICATION_CREDENTIALS);

  admin.initializeApp({
    projectId,
    credential: admin.credential.applicationDefault(),
  });

  return admin.firestore();
}

async function countCollection(db, collectionName) {
  const snapshot = await db.collection(collectionName).count().get();
  return snapshot.data().count || 0;
}

async function assertSafeTargetCollections() {
  const protectedOverlap = TARGET_COLLECTIONS.filter((collectionName) =>
    PROTECTED_COLLECTIONS.includes(collectionName)
  );

  if (protectedOverlap.length > 0) {
    throw new Error(
      "Unsafe configuration. Target collections include protected collections: " +
        protectedOverlap.join(", ")
    );
  }
}

async function assertBusinessCollectionsAreEmpty(db) {
  console.log("[GUARD] Checking target business collections are empty.");

  const nonEmpty = [];

  for (const collectionName of TARGET_COLLECTIONS) {
    const count = await countCollection(db, collectionName);
    console.log(`- ${collectionName}: ${count}`);

    if (count > 0) {
      nonEmpty.push({ collectionName, count });
    }
  }

  if (nonEmpty.length > 0) {
    const details = nonEmpty
      .map((item) => `${item.collectionName}=${item.count}`)
      .join(", ");

    throw new Error(
      "Seed aborted. Target business collections are not empty: " + details
    );
  }

  console.log("[GUARD] OK â€” target business collections are empty.");
}

async function writeDoc(db, collectionName, id, data) {
  await db.collection(collectionName).doc(id).set(data, { merge: false });
}

async function assertCollectionsEmpty(db, collectionNames, label) {
  console.log(`[GUARD] Checking ${label} collections are empty.`);

  const nonEmpty = [];

  for (const collectionName of collectionNames) {
    const count = await countCollection(db, collectionName);
    console.log(`- ${collectionName}: ${count}`);

    if (count > 0) {
      nonEmpty.push({ collectionName, count });
    }
  }

  if (nonEmpty.length > 0) {
    const details = nonEmpty
      .map((item) => `${item.collectionName}=${item.count}`)
      .join(", ");

    throw new Error(`${label} collections are not empty: ${details}`);
  }

  console.log(`[GUARD] OK — ${label} collections are empty.`);
}

async function assertFoundationExists(db) {
  console.log("[GUARD] Checking foundation seed exists.");

  const expected = {
    fournisseursauto: SUPPLIERS.length,
    produitsauto: PRODUCTS.length,
    stocksauto: PRODUCTS.filter((item) => item.stockable).length,
  };

  const invalid = [];

  for (const [collectionName, expectedCount] of Object.entries(expected)) {
    const count = await countCollection(db, collectionName);
    console.log(`- ${collectionName}: ${count} / expected ${expectedCount}`);

    if (count !== expectedCount) {
      invalid.push(`${collectionName}=${count}, expected ${expectedCount}`);
    }
  }

  if (invalid.length > 0) {
    throw new Error(
      "Foundation seed is not ready. " +
        invalid.join("; ") +
        ". Run --confirm-seed-foundation after a clean reset first."
    );
  }

  console.log("[GUARD] OK — foundation seed exists.");
}

async function validateClientsVehiclesPhase(db) {
  await assertFoundationExists(db);
  await assertCollectionsEmpty(db, CLIENTS_VEHICLES_COLLECTIONS, "clients/vehicles");
  await assertCollectionsEmpty(db, DOWNSTREAM_COLLECTIONS, "downstream business");
}

async function seedClientsVehicles(db) {
  console.log("");
  console.log("[PLAN] Clients/Vehicles seed");
  console.log("- clientsauto: 20");
  console.log("- vehicules: 20");
  console.log("");

  if (!seedClientsVehiclesEnabled) {
    console.log("[DRY-RUN] No client or vehicle will be written.");
    console.log("To write clients/vehicles data, run with --confirm-seed-clients-vehicles");
    return;
  }

  console.log("[WRITE SKIPPED]");
  console.log("C1-C-A only validates phase guards. C1-C-B will add actual client/vehicle documents.");
}
async function seedFoundation(db) {
  const stockableProducts = PRODUCTS.filter((item) => item.stockable);
  const stockDocs = stockableProducts.map(buildStockForProduct);

  console.log("");
  console.log("[PLAN] Foundation seed");
  console.log(`- fournisseursauto: ${SUPPLIERS.length}`);
  console.log(`- produitsauto: ${PRODUCTS.length}`);
  console.log(`- stocksauto: ${stockDocs.length}`);
  console.log("");

  if (!writeEnabled) {
    console.log("[DRY-RUN] No document will be written.");
    console.log("To write foundation data, run with --confirm-seed-foundation");
    return;
  }

  console.log("[WRITE START]");

  for (const supplier of SUPPLIERS) {
    await writeDoc(db, "fournisseursauto", supplier.id, {
      ...supplier.data,
      createdAt: NOW_ISO,
      updatedAt: NOW_ISO,
      seedTag: "TEST-DATA-PREP-A3",
    });
    console.log(`[WRITE] fournisseursauto/${supplier.id}`);
  }

  for (const item of PRODUCTS) {
    await writeDoc(db, "produitsauto", item.id, item.data);
    console.log(`[WRITE] produitsauto/${item.id}`);
  }

  for (const stock of stockDocs) {
    await writeDoc(db, "stocksauto", stock.id, stock.data);
    console.log(`[WRITE] stocksauto/${stock.id}`);
  }

  console.log("[WRITE DONE]");
}

async function main() {
  console.log("[TEST-DATA-PREP-A3-C1] Seed demo data");
  console.log("");

  loadEnvLocal();
  await assertSafeTargetCollections();

  const db = initFirebaseAdmin();

  if (seedClientsVehiclesEnabled) {
    console.log("[PHASE] clients/vehicles");
    await validateClientsVehiclesPhase(db);
    await seedClientsVehicles(db);

    console.log("");
    console.log("[C1-C-A DONE]");
    console.log("Clients/vehicles phase guards are valid.");
    console.log("No client or vehicle was written in this guard-only pass.");
    return;
  }

  console.log("[PHASE] foundation");
  await assertBusinessCollectionsAreEmpty(db);
  await seedFoundation(db);

  console.log("");
  console.log("[C1-B DONE]");
  if (writeEnabled) {
    console.log("Foundation data written to Firestore.");
  } else {
    console.log("Dry-run completed. No document was written to Firestore.");
  }
}

main().catch((error) => {
  console.error("[ERROR]", error);
  process.exitCode = 1;
});