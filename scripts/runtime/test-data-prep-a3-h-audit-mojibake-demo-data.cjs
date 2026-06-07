const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    console.log("[ENV] .env.local not found.");
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }

  console.log("[ENV] .env.local loaded.");
}

function initDb() {
  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    "terragest-dev";

  console.log("[FIREBASE] Project:", projectId);
  console.log("[FIREBASE] Credentials:", process.env.GOOGLE_APPLICATION_CREDENTIALS || "(default)");

  if (!admin.apps.length) {
    admin.initializeApp({
      projectId,
      credential: admin.credential.applicationDefault(),
    });
  }

  return admin.firestore();
}

function looksCorrupted(value) {
  if (typeof value !== "string") {
    return false;
  }

  return (
    value.includes("Ã") ||
    value.includes("Â") ||
    value.includes(""") ||
    value.includes("�") ||
    value.length > 180
  );
}

async function auditCollection(db, collectionName, fields) {
  const snap = await db.collection(collectionName).get();
  const issues = [];

  for (const doc of snap.docs) {
    const data = doc.data();

    for (const field of fields) {
      const value = data[field];

      if (looksCorrupted(value)) {
        issues.push({
          collectionName,
          id: doc.id,
          field,
          length: String(value || "").length,
          value: String(value || "").slice(0, 260),
        });
      }
    }
  }

  return issues;
}

async function main() {
  console.log("[TEST-DATA-PREP-A3-H] Mojibake demo data audit");

  loadEnvLocal();

  const db = initDb();

  const audits = [
    ["produitsauto", ["nom", "description", "categorie", "sousCategorie"]],
    ["lignesinterventionauto", ["designation", "notes"]],
    ["interventionsauto", ["diagnostic", "description"]],
    ["rendezvous", ["motif", "commentaire"]],
    ["facturesauto", ["observations"]],
    ["rappelsauto", ["message"]],
  ];

  const allIssues = [];

  for (const [collectionName, fields] of audits) {
    const issues = await auditCollection(db, collectionName, fields);
    allIssues.push(...issues);
    console.log(`- ${collectionName}: ${issues.length} issue(s)`);
  }

  const lines = [
    "# TEST-DATA-PREP-A3-H — Mojibake demo data audit",
    "",
    "## Summary",
    "",
    `- Issues: ${allIssues.length}`,
    "",
    "## Issues",
    "",
  ];

  for (const issue of allIssues) {
    lines.push(`### ${issue.collectionName}/${issue.id}`);
    lines.push("");
    lines.push(`- Field: ${issue.field}`);
    lines.push(`- Length: ${issue.length}`);
    lines.push("");
    lines.push("```txt");
    lines.push(issue.value);
    lines.push("```");
    lines.push("");
  }

  const reportPath = path.join(
    process.cwd(),
    "docs",
    "audits",
    "TEST-DATA-PREP-A3-H-mojibake-demo-data-audit.md"
  );

  fs.writeFileSync(reportPath, lines.join("\n"), "utf8");

  console.log(`[REPORT] ${reportPath}`);
  console.log(`[ISSUES] ${allIssues.length}`);

  if (allIssues.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("[ERROR]", error);
  process.exitCode = 1;
});