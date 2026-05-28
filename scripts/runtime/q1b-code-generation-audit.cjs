const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const targets = [
  "src/runtime",
  "src/components/public",
  "src/runtime/modules/generated/clientsauto",
  "src/runtime/modules/generated/vehicules",
  "src/runtime/modules/generated/rendezvous",
  "src/runtime/modules/factory",
  "src/runtime/modules/lifecycle",
];

const patterns = [
  "codeClient",
  "codeVehicule",
  "codeRendezVous",
  "numeroClient",
  "numero",
  "reference",
  "referenceNumber",
  "generateCode",
  "CodeGenerator",
  "sequence",
  "counter",
  "year",
  "crypto.randomUUID",
  "randomUUID",
  "dateInscription",
  "dateContact",
  "createdAt",
  "PublicAppointmentService",
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name === "node_modules" ||
      entry.name === ".next" ||
      entry.name.endsWith(".bak")
    ) {
      continue;
    }

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, files);
    } else if (/\.(ts|tsx|js|jsx|cjs)$/.test(entry.name)) {
      files.push(full);
    }
  }

  return files;
}

const files = targets.flatMap((target) => walk(path.join(ROOT, target)));
const rows = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const found = patterns.filter((pattern) =>
    content.toLowerCase().includes(pattern.toLowerCase())
  );

  if (found.length > 0) {
    rows.push({
      file: path.relative(ROOT, file),
      score: found.length,
      found,
    });
  }
}

rows.sort((a, b) => b.score - a.score);

console.log("");
console.log("[Q1-B-CODE-GENERATION-AUDIT]");
console.log("[FILES]", files.length);
console.log("[MATCHES]", rows.length);
console.log("");

for (const row of rows.slice(0, 80)) {
  console.log(row.score.toString().padStart(2, "0") + " | " + row.file);
  console.log("   " + row.found.join(", "));
}

const outDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(outDir, { recursive: true });

const reportPath = path.join(outDir, "Q1-B-CODE-GENERATION-AUDIT.md");
fs.writeFileSync(
  reportPath,
  [
    "# Q1-B-CODE-GENERATION-AUDIT",
    "",
    "Audit générateurs de codes métier / références lisibles.",
    "",
    ...rows.map((row) => {
      return [
        "## " + row.file,
        "",
        "- Score: " + row.score,
        "- Termes: " + row.found.join(", "),
        "",
      ].join("\n");
    }),
  ].join("\n"),
  "utf8"
);

console.log("");
console.log("[REPORT]", path.relative(ROOT, reportPath));
console.log("");
console.log("[NEXT] Copie-colle les 40 premières lignes candidates.");
