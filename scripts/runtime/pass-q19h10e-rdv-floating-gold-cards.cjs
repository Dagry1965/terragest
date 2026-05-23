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

const componentPath =
  "src/components/public/AmarkhysPublicAppointmentLanding.tsx";

backup(componentPath, ".bak-q19h10e-floating-gold-cards");

let content = fs.readFileSync(p(componentPath), "utf8");

// Carte métrique : plus flottante + accent or.
content = content.replace(
  'className="rounded-[1.35rem] border border-[#17d9c3]/20 bg-gradient-to-br from-[#075f53] via-[#064c43] to-[#042a26] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.35)]"',
  'className="group relative -translate-y-1 rounded-[1.35rem] border border-[#f7c948]/25 bg-gradient-to-br from-[#075f53] via-[#064c43] to-[#041f1c] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.42)] transition duration-300 hover:-translate-y-2 hover:border-[#f7c948]/45 hover:shadow-[0_35px_90px_rgba(247,201,72,0.12)]"'
);

content = content.replace(
  'className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#2cf5df]/25 bg-[#063f39] text-[#37ffe4] shadow-[0_0_30px_rgba(45,245,223,0.12)]"',
  'className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#f7c948]/35 bg-gradient-to-br from-[#f7c948] to-[#b8860b] text-[#06110f] shadow-[0_0_34px_rgba(247,201,72,0.18)]"'
);

// Carte image principale : bordure et glow or/teal.
content = content.replace(
  'className="overflow-hidden rounded-[2rem] border border-[#1dd8c2]/25 bg-[#05110f] shadow-[0_35px_90px_rgba(0,0,0,0.45)]"',
  'className="relative -translate-y-1 overflow-hidden rounded-[2rem] border border-[#f7c948]/25 bg-[#05110f] shadow-[0_35px_100px_rgba(0,0,0,0.52)] ring-1 ring-[#1dd8c2]/10"'
);

// Panneau agenda flottant : or subtil.
content = content.replace(
  'className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/55 p-5 shadow-2xl backdrop-blur-xl"',
  'className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-[#f7c948]/25 bg-black/60 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl ring-1 ring-[#37ffe4]/10"'
);

content = content.replace(
  'className="rounded-full border border-[#37ffe4]/25 bg-[#063f39] px-3 py-1 text-xs font-black text-[#37ffe4]"',
  'className="rounded-full border border-[#f7c948]/35 bg-[#2a2108]/70 px-3 py-1 text-xs font-black text-[#f7c948] shadow-[0_0_22px_rgba(247,201,72,0.12)]"'
);

// Carte formulaire : accent or + flottement.
content = content.replace(
  'className="rounded-[2rem] border border-[#1dd8c2]/25 bg-gradient-to-br from-[#074e45] via-[#063b35] to-[#041715] p-5 shadow-[0_35px_90px_rgba(0,0,0,0.45)] sm:p-7"',
  'className="relative -translate-y-2 rounded-[2rem] border border-[#f7c948]/25 bg-gradient-to-br from-[#075f53] via-[#053d36] to-[#041715] p-5 shadow-[0_42px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#37ffe4]/10 sm:p-7"'
);

// Icône formulaire : or premium.
content = content.replace(
  'className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#37ffe4]/30 bg-[#052e2a] text-[#37ffe4] shadow-[0_0_45px_rgba(55,255,228,0.12)]"',
  'className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f7c948]/35 bg-gradient-to-br from-[#f7c948] to-[#b8860b] text-[#06110f] shadow-[0_0_45px_rgba(247,201,72,0.18)]"'
);

// CTA principal : or/teal plus luxueux.
content = content.replace(
  'className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#18d5c0] px-6 py-4 text-sm font-black text-[#021111] shadow-[0_0_55px_rgba(24,213,192,0.24)] transition hover:bg-[#37ffe4] disabled:cursor-not-allowed disabled:opacity-60"',
  'className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#f7c948] via-[#d6a526] to-[#18d5c0] px-6 py-4 text-sm font-black text-[#021111] shadow-[0_0_60px_rgba(247,201,72,0.20)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"'
);

// Pills header : petit accent or.
content = content.replaceAll(
  'border border-white/15 bg-white/[0.055]',
  'border border-[#f7c948]/20 bg-white/[0.055]'
);

// Ajouter un glow or décoratif dans le fond si absent.
content = content.replace(
  '<div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(18,245,210,0.12),transparent_30%),radial-gradient(circle_at_80%_5%,rgba(20,184,166,0.12),transparent_25%),linear-gradient(135deg,#020807_0%,#03130f_50%,#020807_100%)]" />',
  '<div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(18,245,210,0.12),transparent_30%),radial-gradient(circle_at_80%_5%,rgba(247,201,72,0.10),transparent_24%),radial-gradient(circle_at_78%_75%,rgba(20,184,166,0.10),transparent_28%),linear-gradient(135deg,#020807_0%,#03130f_50%,#020807_100%)]" />'
);

write(componentPath, content);

console.log("");
console.log("[Q19H10E_DONE] RDV floating gold premium cards applied.");
console.log("");
console.log("Next:");
console.log("  pnpm build");