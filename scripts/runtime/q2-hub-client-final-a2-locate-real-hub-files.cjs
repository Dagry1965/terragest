const fs = require("fs");
const path = require("path");

const root = process.cwd();

const searchRoots = [
  "src/app",
  "src/components",
  "src/runtime",
];

const keywords = [
  "clientsauto",
  "Client",
  "OperationalHub",
  "Hub",
  "selectedVehicle",
  "selectedVehicleId",
  "vehicules",
  "rendezvous",
  "interventionsauto",
  "lignesinterventionauto",
  "facturesauto",
  "encaissementsauto",
  "AB-123-CD",
  "Parcours opérationnel",
  "Dossier véhicule sélectionné",
];

const extensions = new Set([".ts", ".tsx", ".js", ".jsx"]);

function full(relativePath) {
  return path.join(root, relativePath);
}

function walk(dir) {
  const result = [];
  const absolute = full(dir);

  if (!fs.existsSync(absolute)) {
    return result;
  }

  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const entryPath = path.join(absolute, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === ".git"
      ) {
        continue;
      }

      result.push(...walk(path.relative(root, entryPath)));
      continue;
    }

    if (extensions.has(path.extname(entry.name))) {
      result.push(path.relative(root, entryPath).replaceAll("\\", "/"));
    }
  }

  return result;
}

function read(relativePath) {
  const file = full(relativePath);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

const files = searchRoots.flatMap(walk);

const matches = [];

for (const file of files) {
  const source = read(file);
  const fileMatches = [];

  for (const keyword of keywords) {
    const lower = source.toLowerCase();
    const needle = keyword.toLowerCase();

    let index = lower.indexOf(needle);
    const lines = [];

    while (index !== -1) {
      lines.push(lineNumberAt(source, index));
      index = lower.indexOf(needle, index + needle.length);
    }

    if (lines.length > 0) {
      fileMatches.push({
        keyword,
        count: lines.length,
        lines: lines.slice(0, 10),
      });
    }
  }

  if (fileMatches.length > 0) {
    matches.push({
      file,
      score: fileMatches.reduce((sum, item) => sum + item.count, 0),
      matchedKeywords: fileMatches.length,
      fileMatches,
    });
  }
}

matches.sort((a, b) => {
  if (b.matchedKeywords !== a.matchedKeywords) {
    return b.matchedKeywords - a.matchedKeywords;
  }

  return b.score - a.score;
});

const report = [];

report.push("# Q2-HUB-CLIENT-FINAL-A2 — Localisation vrais fichiers hub client");
report.push("");
report.push("Objectif : trouver les vrais fichiers du hub client opérationnel avant modification.");
report.push("");
report.push("## Top fichiers candidats");
report.push("");

for (const match of matches.slice(0, 40)) {
  report.push(`### ${match.file}`);
  report.push("");
  report.push(`- Score : ${match.score}`);
  report.push(`- Keywords distincts : ${match.matchedKeywords}`);
  report.push("");
  for (const item of match.fileMatches) {
    report.push(`- \`${item.keyword}\` count=${item.count} lines=${item.lines.join(", ")}`);
  }
  report.push("");
}

const out = "docs/audits/Q2-HUB-CLIENT-FINAL-A2-real-hub-files-location.md";
const outPath = full(out);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, report.join("\n"), "utf8");

console.log("[Q2-HUB-CLIENT-FINAL-A2] Locate real client hub files");
console.log("[ROOT]", root);
console.log("[MATCHES]", matches.length);
console.log("[REPORT]", out);
console.log("[IMPORTANT]");

for (const match of matches.slice(0, 20)) {
  console.log(
    `[CANDIDATE] ${match.file} keywords=${match.matchedKeywords} score=${match.score}`
  );

  for (const item of match.fileMatches.slice(0, 8)) {
    console.log(
      `  - ${item.keyword} count=${item.count} lines=${item.lines.join(",")}`
    );
  }
}