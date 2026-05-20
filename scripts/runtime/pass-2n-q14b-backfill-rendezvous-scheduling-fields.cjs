const path = require("path");
const fs = require("fs");

const ROOT = process.cwd();
const WRITE = process.argv.includes("--write");


function loadEnvFile(fileName) {
  const filePath = path.join(ROOT, fileName);

  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (
      !trimmed ||
      trimmed.startsWith("#") ||
      !trimmed.includes("=")
    ) {
      continue;
    }

    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();

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
}

loadEnvFile(".env.local");
loadEnvFile(".env.development.local");
loadEnvFile(".env");

function assertProjectRoot() {
  if (
    !fs.existsSync(path.join(ROOT, "package.json")) ||
    !fs.existsSync(path.join(ROOT, "src"))
  ) {
    throw new Error("Ce script doit être lancé depuis la racine du projet Terragest.");
  }
}

function env(name) {
  return process.env[name] || "";
}

function asString(value) {
  if (typeof value === "string") return value.trim();

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (
    value &&
    typeof value === "object" &&
    typeof value.seconds === "number"
  ) {
    return new Date(Number(value.seconds) * 1000).toISOString();
  }

  return "";
}

function asNumber(value, fallback) {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }

  return fallback;
}

function normalizeDateOnly(value) {
  const text = asString(value);

  if (!text) return "";

  const yyyyMmDd = text.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (yyyyMmDd) {
    return yyyyMmDd[1] + "-" + yyyyMmDd[2] + "-" + yyyyMmDd[3];
  }

  const ddMmYyyy = text.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/);

  if (ddMmYyyy) {
    return (
      ddMmYyyy[3] +
      "-" +
      String(Number(ddMmYyyy[2])).padStart(2, "0") +
      "-" +
      String(Number(ddMmYyyy[1])).padStart(2, "0")
    );
  }

  const date = new Date(text);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return (
    String(date.getFullYear()).padStart(4, "0") +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
}

function normalizeTimeOnly(value) {
  const text = asString(value);

  if (!text) return "";

  const isoTime = text.match(/T(\d{1,2}):(\d{2})/);

  if (isoTime) {
    return isoTime[1].padStart(2, "0") + ":" + isoTime[2];
  }

  const colonTime = text.match(/^(\d{1,2}):(\d{2})/);

  if (colonTime) {
    return colonTime[1].padStart(2, "0") + ":" + colonTime[2];
  }

  const frenchTime = text.match(/^(\d{1,2})\s*h\s*(\d{0,2})$/i);

  if (frenchTime) {
    return (
      frenchTime[1].padStart(2, "0") +
      ":" +
      String(frenchTime[2] || "00").padStart(2, "0")
    );
  }

  const compactTime = text.match(/^(\d{1,2})(\d{2})$/);

  if (compactTime) {
    return compactTime[1].padStart(2, "0") + ":" + compactTime[2];
  }

  return "";
}

function computeSlot(record) {
  const dateOnly = normalizeDateOnly(record.dateRendezVous);
  const timeOnly = normalizeTimeOnly(record.heureRendezVous);

  if (!dateOnly || !timeOnly) {
    return null;
  }

  const [year, month, day] = dateOnly.split("-").map(Number);
  const [hour, minute] = timeOnly.split(":").map(Number);

  const durationMinutes = Math.max(
    1,
    asNumber(record.durationMinutes, 60)
  );

  const startDate = new Date(
    year,
    month - 1,
    day,
    hour,
    minute,
    0,
    0
  );

  if (Number.isNaN(startDate.getTime())) {
    return null;
  }

  const endDate = new Date(
    startDate.getTime() + durationMinutes * 60 * 1000
  );

  return {
    durationMinutes,
    startAt: startDate.toISOString(),
    endAt: endDate.toISOString(),
  };
}

function getFirebaseConfig() {
  const config = {
    apiKey: env("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: env("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: env("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: env("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: env("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId: env("NEXT_PUBLIC_FIREBASE_APP_ID"),
  };

  if (!config.apiKey || !config.projectId || !config.appId) {
    throw new Error(
      "Configuration Firebase manquante. Vérifie les variables NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_PROJECT_ID et NEXT_PUBLIC_FIREBASE_APP_ID."
    );
  }

  return config;
}

async function main() {
  assertProjectRoot();

  const { initializeApp, getApps } = await import("firebase/app");
  const {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc,
  } = await import("firebase/firestore");

  const app =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp(getFirebaseConfig());

  const db = getFirestore(app);

  const snapshot = await getDocs(
    collection(db, "rendezvous")
  );

  let inspected = 0;
  let skipped = 0;
  let candidates = 0;
  let updated = 0;

  console.log("");
  console.log("PASS 2N-Q14B — Backfill rendezvous scheduling fields");
  console.log(WRITE ? "MODE: WRITE" : "MODE: DRY-RUN");
  console.log("");

  for (const item of snapshot.docs) {
    inspected++;

    const record = {
      id: item.id,
      ...item.data(),
    };

    const hasDate =
      Boolean(asString(record.dateRendezVous));

    const hasTime =
      Boolean(asString(record.heureRendezVous));

    if (!hasDate || !hasTime) {
      skipped++;
      continue;
    }

    const slot = computeSlot(record);

    if (!slot) {
      skipped++;
      continue;
    }

    const patch = {};

    if (
      record.durationMinutes === undefined ||
      record.durationMinutes === null ||
      record.durationMinutes === ""
    ) {
      patch.durationMinutes = slot.durationMinutes;
    }

    if (!asString(record.startAt)) {
      patch.startAt = slot.startAt;
    }

    if (!asString(record.endAt)) {
      patch.endAt = slot.endAt;
    }

    if (Object.keys(patch).length === 0) {
      skipped++;
      continue;
    }

    candidates++;

    console.log(
      "-",
      item.id,
      "=>",
      JSON.stringify(patch)
    );

    if (WRITE) {
      await updateDoc(
        doc(db, "rendezvous", item.id),
        patch
      );

      updated++;
    }
  }

  console.log("");
  console.log("Résumé");
  console.log("Inspectés :", inspected);
  console.log("À corriger :", candidates);
  console.log("Mis à jour :", updated);
  console.log("Ignorés :", skipped);
  console.log("");

  if (!WRITE) {
    console.log("Dry-run terminé. Pour appliquer :");
    console.log("node .\\scripts\\runtime\\pass-2n-q14b-backfill-rendezvous-scheduling-fields.cjs --write");
  }
}

main().catch((error) => {
  console.error("[Q14B_BACKFILL_ERROR]", error);
  process.exit(1);
});