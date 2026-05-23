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

const pagePath = "src/app/facture/[token]/page.tsx";

backup(pagePath, ".bak-q19h12b-public-invoice-document-contrast");

let content = fs.readFileSync(p(pagePath), "utf8");

// Bloc facture principal : passer de carte sombre à document blanc/ivoire.
content = content.replace(
  'className="overflow-hidden rounded-[1.6rem] border border-[#d7a83f]/20 bg-gradient-to-br from-[#075f53] via-[#053d36] to-[#031612] shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#23ead4]/12"',
  'className="overflow-hidden rounded-[1.6rem] border border-[#d7a83f]/24 bg-[#fffaf0] text-[#0f172a] shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#d7a83f]/18"'
);

// Header facture document : ivoire / papier.
content = content.replace(
  'className="border-b border-white/10 p-6 sm:p-8"',
  'className="border-b border-[#e8dcc0] bg-gradient-to-br from-white via-[#fffaf0] to-[#f5eddc] p-6 sm:p-8"'
);

// Icône facture : rester premium mais sur fond clair.
content = content.replace(
  'className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#23ead4]/35 bg-[#052e2a] text-[#23ead4] shadow-[0_0_45px_rgba(35,234,212,0.12)]"',
  'className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#d7a83f]/45 bg-[#2b2208] text-[#f8d479] shadow-[0_0_35px_rgba(215,168,63,0.16)]"'
);

// Textes header facture clair.
content = content.replaceAll(
  'text-[#23ead4]',
  'text-[#0f766e]'
);

content = content.replace(
  'className="mt-2 text-3xl font-black text-white"',
  'className="mt-2 text-3xl font-black text-[#0f172a]"'
);

content = content.replace(
  'className="mt-1 text-sm text-cyan-50/75"',
  'className="mt-1 text-sm font-semibold text-slate-600"'
);

// Badge document officiel sur fond clair.
content = content.replace(
  'className="rounded-xl border border-[#d7a83f]/45 bg-[#2b2208]/60 px-4 py-3 text-sm font-black text-[#f8d479]"',
  'className="rounded-xl border border-[#d7a83f]/45 bg-[#fff6d8] px-4 py-3 text-sm font-black text-[#8a640f]"'
);

// Corps facture : texte sombre.
content = content.replace(
  'className="grid gap-5 p-6 sm:p-8"',
  'className="grid gap-5 bg-[#fffaf0] p-6 sm:p-8"'
);

content = content.replaceAll(
  'text-[#f8d479]',
  'text-[#8a640f]'
);

content = content.replaceAll(
  'text-white',
  'text-[#0f172a]'
);

content = content.replaceAll(
  'text-cyan-50/75',
  'text-slate-600'
);

content = content.replaceAll(
  'text-cyan-50/85',
  'text-slate-700'
);

// Les cartes InfoItem et MoneyCard doivent devenir documents clairs.
content = content.replaceAll(
  'border-[#d7a83f]/28 bg-[#2b2208]/35',
  'border-[#e8dcc0] bg-white'
);

content = content.replaceAll(
  'border-[#23ead4]/18 bg-black/18',
  'border-[#e8dcc0] bg-white'
);

content = content.replaceAll(
  'border-[#d7a83f]/45 bg-[#2b2208]/50',
  'border-[#d7a83f]/45 bg-[#fff6d8]'
);

content = content.replaceAll(
  'border-red-400/30 bg-red-500/10',
  'border-red-200 bg-red-50'
);

content = content.replaceAll(
  'text-red-100',
  'text-red-700'
);

// Icônes internes sur document clair.
content = content.replaceAll(
  'border-white/10 bg-white/[0.055]',
  'border-[#e8dcc0] bg-[#fffaf0]'
);

// Important : restaurer les zones sombres des panneaux rapides et page autour si remplacées trop large.
content = content.replace(
  'className="rounded-[1.6rem] border border-[#d7a83f]/24 bg-gradient-to-br from-[#1a1608]/78 via-[#061915]/84 to-[#041b18] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38)]"',
  'className="rounded-[1.6rem] border border-[#d7a83f]/24 bg-gradient-to-br from-[#1a1608]/78 via-[#061915]/84 to-[#041b18] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38)] text-white"'
);

content = content.replace(
  'className="rounded-[1.35rem] border border-[#23ead4]/22 bg-gradient-to-br from-[#075f53] via-[#06443d] to-[#041b18] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)]"',
  'className="rounded-[1.35rem] border border-[#23ead4]/22 bg-gradient-to-br from-[#075f53] via-[#06443d] to-[#041b18] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)] text-white"'
);

// Corriger certains labels de section pour document clair.
content = content.replaceAll(
  'text-slate-400',
  'text-slate-500'
);

// Restaurer le texte blanc du header général externe.
content = content.replace(
  'className="text-4xl font-black uppercase tracking-tight text-[#0f172a] sm:text-5xl"',
  'className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl"'
);

content = content.replace(
  'className="pb-1 text-xl font-black text-slate-300"',
  'className="pb-1 text-xl font-black text-slate-300"'
);

content = content.replace(
  'className="mt-6 text-3xl font-black text-[#0f172a] sm:text-4xl"',
  'className="mt-6 text-3xl font-black text-white sm:text-4xl"'
);

content = content.replace(
  'className="mt-2 max-w-2xl text-base leading-7 text-slate-600"',
  'className="mt-2 max-w-2xl text-base leading-7 text-slate-300"'
);

write(pagePath, content);

console.log("");
console.log("[Q19H12B_DONE] Public invoice now uses a white/ivory document card inside premium AMARKHYS shell.");
console.log("");
console.log("Next:");
console.log("  pnpm build");