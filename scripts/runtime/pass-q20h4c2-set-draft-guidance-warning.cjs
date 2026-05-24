const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "runtime",
  "status",
  "RuntimeStatusGovernanceEngine.ts"
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

backup(target, "q20h4c2-draft-guidance-warning");

let content = read(target);

content = content.replace(
`        status: "brouillon",
        title: "Ligne en préparation",
        message:
          "Cette ligne n'est pas encore comptabilisée. Elle ne sortira pas du stock tant qu'elle n'est pas validée.",
        tone: "default",`,
`        status: "brouillon",
        title: "Ligne en préparation",
        message:
          "Cette ligne n'est pas encore comptabilisée. Elle ne sortira pas du stock tant qu'elle n'est pas validée.",
        tone: "warning",`
);

write(target, content);

console.log("");
console.log("[Q20H4C2_DONE] Brouillon passé en tone warning.");
console.log("");
console.log("Next:");
console.log("  pnpm build");