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

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

const backup = file + ".bak-q1a6c-remove-image-keep-rdv-content-toggle";
fs.writeFileSync(backup, original, "utf8");

/**
 * Q1-A6C
 * Supprimer la photo réelle, garder le contenu RDV,
 * convertir l'ancien bloc image en bloc auto-height,
 * et transformer le bouton en afficher/masquer.
 */

// 1. Supprimer l'import Image.
content = content.replace(/import Image from "next\/image";\s*/g, "");

// 2. Supprimer uniquement le composant Image RDV.
content = content.replace(
  /\s*<Image\s+src="\/images\/amarkhys\/rdv-hero-premium\.png"[\s\S]*?\/>\s*/g,
  "\n"
);

// 3. Supprimer les overlays liés à la photo.
content = content.replace(
  /\s*<div className="absolute inset-0 bg-gradient-to-t from-\[#020807\][\s\S]*?\/>\s*/g,
  "\n"
);

content = content.replace(
  /\s*<div className="absolute inset-0 bg-gradient-to-r from-\[#020807\][\s\S]*?\/>\s*/g,
  "\n"
);

// 4. L'ancien conteneur image ne doit plus imposer aspect ratio.
content = content.replace(
  /className="relative aspect-\[16\/10\]"/g,
  `className="relative h-auto min-h-0 overflow-visible"`
);

// 5. Le panneau qui était posé par-dessus la photo devient un bloc normal.
content = content.replace(
  /className="absolute bottom-4 left-4 right-4 rounded-\[1\.45rem\]/g,
  `className="relative rounded-[1.45rem]`
);

// 6. Le bouton devient un vrai toggle.
content = content.replace(
  /setShowAllPublicSlots\(true\);/g,
  `setShowAllPublicSlots((current) => !current);`
);

// 7. Remplacer le texte du bouton, même avec encodage cassé.
content = content.replace(
  />\s*Voir tous les [^<]*\s*<\/button>/g,
  `>
                        {showAllPublicSlots
                          ? "Masquer les créneaux occupés"
                          : "Afficher tous les créneaux"}
                      </button>`
);

// 8. Rendre visible le bouton s'il était hidden.
content = content.replace(
  /className="hidden rounded-xl border border-\[#d7a83f\]\/45/g,
  `className="rounded-xl border border-[#d7a83f]/45`
);

// 9. Vérifications.
const problems = [];

if (content.includes('import Image from "next/image"')) {
  problems.push("import Image encore présent");
}

if (content.includes("/images/amarkhys/rdv-hero-premium.png")) {
  problems.push("image rdv-hero-premium encore présente");
}

if (content.includes("setShowAllPublicSlots(true);")) {
  problems.push("setShowAllPublicSlots(true) encore présent");
}

if (!content.includes("Afficher tous les créneaux")) {
  problems.push("libellé Afficher tous les créneaux absent");
}

if (!content.includes("Masquer les créneaux occupés")) {
  problems.push("libellé Masquer les créneaux occupés absent");
}

if (problems.length > 0) {
  console.log("[FAIL] Correction incomplète:");
  for (const problem of problems) {
    console.log(" - " + problem);
  }
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(1);
}

if (content === original) {
  console.log("[FAIL] Aucun changement appliqué.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Image RDV supprimée, contenu conservé, bouton toggle corrigé.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next:");
console.log("pnpm build");
