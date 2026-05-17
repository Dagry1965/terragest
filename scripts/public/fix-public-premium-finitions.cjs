const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const publicFiles = [
  "src/components/public/PublicNavbar.tsx",
  "src/components/public/PublicHero.tsx",
  "src/components/public/PublicServices.tsx",
  "src/components/public/PublicWhy.tsx",
  "src/components/public/PublicCTA.tsx",
  "src/components/public/PublicContact.tsx",
  "src/components/public/PublicFooter.tsx",
  "src/app/rdv/page.tsx",
  "src/components/public/PublicAppointmentService.ts",
];

const replacements = [
  ["â€¢", "•"],
  ["â€™", "’"],
  ["â€˜", "‘"],
  ["â€œ", "“"],
  ["â€", "”"],
  ["â€“", "–"],
  ["â€”", "—"],
  ["â€¦", "…"],

  ["digitalisÃ©", "digitalisé"],
  ["expÃ©rience", "expérience"],
  ["vÃ©hicule", "véhicule"],
  ["vÃ©hicules", "véhicules"],
  ["prÃ©cis", "précis"],
  ["DÃ©couvrir", "Découvrir"],
  ["exÃ©cution", "exécution"],
  ["SÃ©curitÃ©", "Sécurité"],
  ["RÃ©server", "Réserver"],
  ["TÃ©lÃ©phone", "Téléphone"],
  ["VÃ©hicule", "Véhicule"],
  ["demandÃ©", "demandé"],
  ["PrÃ©parer", "Préparer"],
  ["aprÃ¨s", "après"],

  ["Ã©", "é"],
  ["Ã¨", "è"],
  ["Ãª", "ê"],
  ["Ã ", "à"],
  ["Ã¢", "â"],
  ["Ã´", "ô"],
  ["Ã¹", "ù"],
  ["Ã§", "ç"],
  ["Ã‰", "É"],
  ["Â ", " "],
];

for (const relativePath of publicFiles) {
  const file = path.join(ROOT, relativePath);

  if (!fs.existsSync(file)) {
    continue;
  }

  let content = fs.readFileSync(file, "utf8");
  const original = content;

  for (const [bad, good] of replacements) {
    content = content.split(bad).join(good);
  }

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    console.log("FIXED", relativePath);
  }
}

const layoutPath = path.join(ROOT, "src/app/layout.tsx");

if (!fs.existsSync(layoutPath)) {
  throw new Error("src/app/layout.tsx introuvable.");
}

let layout = fs.readFileSync(layoutPath, "utf8");

if (!layout.includes("export const metadata")) {
  layout = layout.replace(
    `import "./globals.css";`,
    `import "./globals.css";

export const metadata = {
  title: "AMARKHYS — Garage premium digitalisé",
  description:
    "AMARKHYS est un garage automobile premium pour diagnostic, vidange, entretien, suivi atelier et rendez-vous digital.",
  keywords: [
    "AMARKHYS",
    "garage premium",
    "garage automobile",
    "vidange",
    "diagnostic automobile",
    "entretien véhicule",
    "PETRONAS",
  ],
};`
  );

  fs.writeFileSync(layoutPath, layout, "utf8");
  console.log("UPDATED src/app/layout.tsx metadata");
}

console.log("");
console.log("Public premium finitions done.");