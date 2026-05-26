const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET =
  "scripts/runtime/audit-q22e9n-a-planning-settings-readiness.cjs";

const targetPath = path.join(ROOT, TARGET);

if (!fs.existsSync(targetPath)) {
  throw new Error(`Fichier introuvable: ${TARGET}`);
}

const backupPath = `${targetPath}.bak-q22e9n-a3b-policy-resolver-location`;
fs.copyFileSync(targetPath, backupPath);

let content = fs.readFileSync(targetPath, "utf8");

const oldPath = "src/runtime/scheduling/policy/SchedulingSlotPolicyResolver.ts";
const realPath = "src/runtime/scheduling/SchedulingSlotPolicy.ts";

if (!content.includes(oldPath) && !content.includes(realPath)) {
  throw new Error(
    "Aucun chemin SchedulingSlotPolicyResolver/SchedulingSlotPolicy détecté dans l'audit. Inspection manuelle nécessaire."
  );
}

content = content.replaceAll(oldPath, realPath);

const checkRegex =
  /check\(\s*checks,\s*"Q22E-9N-A-03",\s*"SchedulingSlotPolicyResolver existe",\s*exists\(files\.slotPolicyResolver\),\s*files\.slotPolicyResolver\s*\);/m;

const replacement = `check(
  checks,
  "Q22E-9N-A-03",
  "SchedulingSlotPolicyResolver existe",
  exists(files.slotPolicyResolver) &&
    has(contents.slotPolicyResolver, "SchedulingSlotPolicyResolver"),
  files.slotPolicyResolver
);`;

if (!checkRegex.test(content)) {
  console.log("[WARN] Bloc check exact non trouvé. Tentative de remplacement plus souple...");

  const looseRegex =
    /check\([\s\S]*?"Q22E-9N-A-03"[\s\S]*?"SchedulingSlotPolicyResolver existe"[\s\S]*?\);/m;

  if (!looseRegex.test(content)) {
    fs.writeFileSync(targetPath, content, "utf8");
    throw new Error(
      "Bloc Q22E-9N-A-03 introuvable même en recherche souple. Le chemin a été aligné, mais le check n'a pas été renforcé."
    );
  }

  content = content.replace(looseRegex, replacement);
} else {
  content = content.replace(checkRegex, replacement);
}

fs.writeFileSync(targetPath, content, "utf8");

console.log("");
console.log("[Q22E-9N-A3-B] DONE");
console.log(`[BACKUP] ${path.relative(ROOT, backupPath).replace(/\\/g, "/")}`);
console.log(`[UPDATED] ${TARGET}`);
console.log("");
console.log("Next:");
console.log("node .\\scripts\\runtime\\audit-q22e9n-a-planning-settings-readiness.cjs");