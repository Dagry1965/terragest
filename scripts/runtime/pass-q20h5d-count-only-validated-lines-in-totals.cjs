const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "runtime",
  "interventions",
  "RuntimeInterventionTotalsService.ts"
);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function backup(file, suffix) {
  const backupPath = `${file}.bak-${suffix}`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

if (!fs.existsSync(target)) {
  throw new Error(`Fichier introuvable: ${target}`);
}

backup(target, "q20h5d-validated-lines-totals");

let content = read(target);

if (content.includes("Q20H5D_VALIDATED_LINES_ONLY")) {
  console.log("[SKIP] Q20H5D déjà appliqué.");
  process.exit(0);
}

content = content.replace(
`function isCancelled(line: RuntimeRecord): boolean {
  return asText(line.statut) === "annulee";
}`,
`function isCountableLine(line: RuntimeRecord): boolean {
  // Q20H5D_VALIDATED_LINES_ONLY
  // Une ligne est comptabilisée uniquement lorsqu'elle est validée
  // et qu'elle n'a pas été retirée techniquement.
  return (
    asText(line.statut) === "validee" &&
    !line.removedAt
  );
}`
);

content = content.replace(
`      if (isCancelled(line)) {
        return totals;
      }`,
`      if (!isCountableLine(line)) {
        return totals;
      }`
);

write(target, content);

console.log("");
console.log("[Q20H5D_DONE] Totaux intervention limités aux lignes validées non retirées.");
console.log("");
console.log("Next:");
console.log("  pnpm build");