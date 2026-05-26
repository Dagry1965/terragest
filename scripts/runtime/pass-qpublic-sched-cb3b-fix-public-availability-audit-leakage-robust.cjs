const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET =
  "scripts/runtime/audit-qpublic-sched-cb-public-scheduling-availability.cjs";

const targetPath = path.join(ROOT, TARGET);

if (!fs.existsSync(targetPath)) {
  throw new Error(`Fichier introuvable: ${TARGET}`);
}

const backupPath = `${targetPath}.bak-qpublic-sched-cb3b-leakage-audit`;
fs.copyFileSync(targetPath, backupPath);

let content = fs.readFileSync(targetPath, "utf8");

const checkPattern =
  /check\(\s*checks,\s*"Q-PUBLIC-SCHED-C-B-07"[\s\S]*?\n\);/m;

if (!checkPattern.test(content)) {
  throw new Error("Check Q-PUBLIC-SCHED-C-B-07 introuvable.");
}

const replacement = `check(
  checks,
  "Q-PUBLIC-SCHED-C-B-07",
  "Service ne retourne pas d'identifiants internes publics",
  !has(content.types, /clientId|codeClient|vehiculeId|rendezvousId/i) &&
    !has(content.service, /codeClient/i) &&
    !has(content.service, /return\\s+records\\s*;/) &&
    !has(content.service, /return\\s+client\\s*;/) &&
    !has(content.service, /return\\s+vehicule\\s*;/) &&
    !has(content.service, /return\\s+rendezvous\\s*;/),
  \`\${files.types}, \${files.service}\`
);`;

content = content.replace(checkPattern, replacement);

if (!content.includes("/return\\s+records\\s*;/")) {
  throw new Error("Le check robuste return records n'a pas été installé.");
}

fs.writeFileSync(targetPath, content, "utf8");

console.log("");
console.log("[Q-PUBLIC-SCHED-C-B3B] DONE");
console.log(`[BACKUP] ${path.relative(ROOT, backupPath).replace(/\\\\/g, "/")}`);
console.log(`[UPDATED] ${TARGET}`);
console.log("");
console.log("Next:");
console.log("node .\\scripts\\runtime\\audit-qpublic-sched-cb-public-scheduling-availability.cjs");