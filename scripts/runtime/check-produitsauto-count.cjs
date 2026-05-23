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

async function main() {
  readEnvLocal();

  const { initializeApp, getApps } = await import("firebase/app");
  const {
    getFirestore,
    collection,
    getDocs,
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

  const snapshot = await getDocs(collection(db, "produitsauto"));

  console.log("[PROJECT]", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  console.log("[COUNT]", snapshot.size);

  snapshot.docs.forEach((doc) => {
    const data = doc.data();

    console.log({
      id: doc.id,
      reference: data.reference,
      nom: data.nom,
      tenantId: data.tenantId,
      workspace: data.workspace,
      moduleKey: data.moduleKey,
      contextPath: data.contextPath,
    });
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
