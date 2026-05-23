const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function backup(rel, suffix) {
  const source = p(rel);
  const target = source + suffix;

  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", rel + suffix);
  }
}

function write(rel, content) {
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

const frontPage = "src/app/facture/[token]/page.tsx";
const backPage = "src/app/facture/[token]/details/page.tsx";

backup(frontPage, ".bak-q19h12f-recto-verso");
backup(backPage, ".bak-q19h12f-recto-verso");

let front = fs.readFileSync(p(frontPage), "utf8");
let back = fs.readFileSync(p(backPage), "utf8");

// Recto : wording du bouton détail.
front = front.replaceAll(
  "Voir le détail",
  "Retourner la facture"
);

front = front.replaceAll(
  "Cette facture présente la synthèse financière. Le détail des actes,",
  "Vous consultez le recto de la facture. Le verso contient le détail des actes,"
);

front = front.replaceAll(
  "prestations, quantités et prix est disponible dans une page dédiée.",
  "prestations, quantités et prix liés à l’intervention."
);

// Recto : ajouter une mention discrète si absente.
if (!front.includes("Recto de facture")) {
  front = front.replace(
    '<p className="text-xs font-black uppercase tracking-[0.28em] text-[#0f766e]">',
    '<p className="mb-2 inline-flex rounded-full border border-[#0f766e]/20 bg-[#ecfdf5] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#0f766e]">Recto de facture</p>\\n\\n                      <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0f766e]">'
  );
}

// Recto : léger effet document interactif.
front = front.replace(
  'className="overflow-hidden rounded-[1.6rem] border border-[#d7a83f]/24 bg-[#fffaf0] text-[#0f172a] shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#d7a83f]/18"',
  'className="overflow-hidden rounded-[1.6rem] border border-[#d7a83f]/24 bg-[#fffaf0] text-[#0f172a] shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#d7a83f]/18 transition duration-300 hover:-translate-y-1 hover:shadow-[0_48px_130px_rgba(0,0,0,0.62)]"'
);

write(frontPage, front);

// Verso : wording retour.
back = back.replaceAll(
  "Retour à la facture",
  "Retour au recto"
);

back = back.replaceAll(
  "Détail de l’intervention",
  "Verso de facture"
);

back = back.replaceAll(
  "Actes, prestations, quantités et prix liés à la facture",
  "Détail des actes, prestations, quantités et prix liés à la facture"
);

// Verso : ajouter badge verso si absent.
if (!back.includes("Verso de facture")) {
  back = back.replace(
    '<p className="text-xs font-black uppercase tracking-[0.28em] text-[#0f766e]">',
    '<p className="mb-2 inline-flex rounded-full border border-[#0f766e]/20 bg-[#ecfdf5] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#0f766e]">Verso de facture</p>\\n\\n                    <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0f766e]">'
  );
}

back = back.replace(
  'className="overflow-hidden rounded-[1.6rem] border border-[#d7a83f]/24 bg-[#fffaf0] text-[#0f172a] shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#d7a83f]/18"',
  'className="overflow-hidden rounded-[1.6rem] border border-[#d7a83f]/24 bg-[#fffaf0] text-[#0f172a] shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#d7a83f]/18 transition duration-300 hover:-translate-y-1 hover:shadow-[0_48px_130px_rgba(0,0,0,0.62)]"'
);

write(backPage, back);

console.log("");
console.log("[Q19H12F_DONE] Public invoice recto/verso wording and document feeling applied.");
console.log("");
console.log("Next:");
console.log("  pnpm build");