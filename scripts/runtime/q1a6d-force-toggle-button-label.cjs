const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = path.join(
  ROOT,
  "src",
  "components",
  "public",
  "AmarkhysPublicAppointmentLanding.tsx"
);

const original = fs.readFileSync(file, "utf8");
let content = original;

const backup = file + ".bak-q1a6d-force-toggle-button-label";
fs.writeFileSync(backup, original, "utf8");

content = content.replace(
  /(<button[\s\S]*?setShowAllPublicSlots\(\(current\) => !current\);[\s\S]*?>)([\s\S]*?)(<\/button>)/,
  `$1
                        {showAllPublicSlots
                          ? "Masquer les créneaux occupés"
                          : "Afficher tous les créneaux"}
                      $3`
);

if (
  !content.includes("Afficher tous les créneaux") ||
  !content.includes("Masquer les créneaux occupés")
) {
  console.log("[FAIL] Libellé toggle non appliqué.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(1);
}

if (content === original) {
  console.log("[INFO] Aucun changement, libellé probablement déjà présent.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(0);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Libellé bouton afficher/masquer créneaux appliqué.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next:");
console.log("pnpm build");
