const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const targetRel = "scripts/runtime/q2i-g0-b-inspect-atelier-invoice-firestore-data.cjs";
const target = path.join(ROOT, targetRel);

if (!fs.existsSync(target)) {
  throw new Error("File not found: " + targetRel);
}

const original = fs.readFileSync(target, "utf8");
fs.writeFileSync(target + ".bak-q2i-g0-b2-env-loader", original, "utf8");

let next = original;

const envLoader = `
function loadDotEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const content = fs.readFileSync(envPath, "utf8");

  for (const rawLine of content.split(/\\r?\\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const eq = line.indexOf("=");

    if (eq === -1) {
      continue;
    }

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

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

loadDotEnvLocal();

function getFirebaseProjectId() {
  return (
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECTID ||
    ""
  ).trim();
}
`;

if (!next.includes("function loadDotEnvLocal()")) {
  next = next.replace(
    'const REQUIRED_ENV = [\n  "FIREBASE_PROJECT_ID",\n];',
    envLoader
  );
  console.log("[ADDED] .env.local loader + project id fallback");
} else {
  console.log("[SKIP] env loader already exists");
}

next = next.replace(
  `function requireEnv(name) {
  const value = process.env[name];
  if (!value || !String(value).trim()) {
    throw new Error("Missing required environment variable: " + name);
  }
  return String(value).trim();
}

`,
  ""
);

next = next.replace(
  `  for (const name of REQUIRED_ENV) {
    requireEnv(name);
  }

`,
  `  const projectId = getFirebaseProjectId();

  if (!projectId) {
    throw new Error(
      "Missing Firebase project id. Define FIREBASE_PROJECT_ID or NEXT_PUBLIC_FIREBASE_PROJECT_ID in .env.local."
    );
  }

`
);

next = next.replace(
  `    projectId: process.env.FIREBASE_PROJECT_ID,`,
  `    projectId,`
);

next = next.replace(
  `  console.log("[FIREBASE] Project:", process.env.FIREBASE_PROJECT_ID);`,
  `  console.log("[FIREBASE] Project:", projectId);`
);

if (next.includes("REQUIRED_ENV")) {
  throw new Error("REQUIRED_ENV still present after patch.");
}

if (!next.includes("NEXT_PUBLIC_FIREBASE_PROJECT_ID")) {
  throw new Error("NEXT_PUBLIC_FIREBASE_PROJECT_ID fallback missing.");
}

fs.writeFileSync(target, next, "utf8");

console.log("[DONE] Q2-I-G0-B2 Firestore inspection env loading fixed.");
console.log("[WRITTEN]", targetRel);
