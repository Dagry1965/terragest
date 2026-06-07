const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRelatedRecordsPanel.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q12g-c-align-formlist`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

// Panneau principal : style form/list opérationnel clair
content = content.replace(
  /className="overflow-hidden rounded-\[2rem\] border border-\[var\(--erp-border\)\] bg-\[var\(--erp-surface\)\] shadow-\[0_18px_50px_rgba\(15,23,42,0\.08\)\]"/g,
  `className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.07)]"`
);

content = content.replace(
  /className="rounded-2xl border border-\[var\(--erp-border\)\] bg-\[var\(--erp-surface\)\] p-4 shadow-sm sm:p-5"/g,
  `className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.07)]"`
);

// Header : plus proche des headers de listes opérationnelles
content = content.replace(
  /className="flex flex-col gap-5 border-b border-\[var\(--erp-border\)\] bg-gradient-to-br from-\[var\(--erp-bg\)\] to-\[var\(--erp-surface\)\] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"/g,
  `className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between"`
);

content = content.replace(
  /className="flex flex-col gap-4 rounded-2xl border border-\[var\(--erp-border\)\] bg-\[var\(--erp-bg\)\] p-4 sm:flex-row sm:items-center sm:justify-between"/g,
  `className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between"`
);

// Titre
content = content.replace(
  /className="text-xl font-black tracking-tight text-\[var\(--erp-text\)\] sm:text-2xl"/g,
  `className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl"`
);

content = content.replace(
  /className="text-base font-black text-\[var\(--erp-text\)\]"/g,
  `className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl"`
);

// Sous-texte / compteur
content = content.replace(
  /className="mt-1 text-sm font-semibold text-\[var\(--erp-text-muted\)\]"/g,
  `className="mt-1 text-sm font-semibold text-slate-600"`
);

content = content.replace(
  /className="mt-1 text-sm text-\[var\(--erp-text-muted\)\]"/g,
  `className="mt-1 text-sm font-semibold text-slate-600"`
);

// Bouton : vert AMARKHYS bien visible, comme les boutons Nouveau
content = content.replace(
  /className="inline-flex items-center justify-center rounded-2xl bg-\[var\(--erp-primary\)\] px-5 py-3 text-sm font-black text-white shadow-\[0_12px_24px_rgba\(0,155,125,0\.20\)\] transition hover:-translate-y-0\.5 hover:opacity-95 hover:shadow-\[0_18px_34px_rgba\(0,155,125,0\.28\)\] active:translate-y-0"/g,
  `className="inline-flex items-center justify-center rounded-2xl bg-[#009B7D] px-5 py-3 text-sm font-black text-white shadow-[0_10px_22px_rgba(0,155,125,0.24)] transition hover:-translate-y-0.5 hover:bg-[#007F6D] hover:shadow-[0_16px_30px_rgba(0,127,109,0.28)] active:translate-y-0"`
);

content = content.replace(
  /className="inline-flex items-center justify-center rounded-2xl bg-\[var\(--erp-primary\)\] px-5 py-3 text-sm font-black text-white transition hover:opacity-90"/g,
  `className="inline-flex items-center justify-center rounded-2xl bg-[#009B7D] px-5 py-3 text-sm font-black text-white shadow-[0_10px_22px_rgba(0,155,125,0.24)] transition hover:-translate-y-0.5 hover:bg-[#007F6D] hover:shadow-[0_16px_30px_rgba(0,127,109,0.28)] active:translate-y-0"`
);

// Conteneur des lignes
content = content.replace(
  /className="space-y-3 p-4 sm:p-5"/g,
  `className="space-y-3 bg-white p-4 sm:p-5"`
);

content = content.replace(
  /className="mt-4 space-y-3"/g,
  `className="space-y-3 bg-white p-4 sm:p-5"`
);

// Empty state
content = content.replace(
  /className="rounded-2xl border border-dashed border-\[var\(--erp-border\)\] bg-\[var\(--erp-bg\)\] p-5 text-sm font-semibold text-\[var\(--erp-text-muted\)\]"/g,
  `className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-500"`
);

content = content.replace(
  /className="rounded-2xl border border-dashed border-\[var\(--erp-border\)\] p-4 text-sm font-semibold text-\[var\(--erp-text-muted\)\]"/g,
  `className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-500"`
);

// Carte ligne : style liste opérationnelle
content = content.replace(
  /className="group flex flex-col gap-4 rounded-2xl border border-\[var\(--erp-border\)\] bg-\[var\(--erp-surface\)\] p-4 shadow-sm transition hover:-translate-y-0\.5 hover:border-\[var\(--erp-primary\)\] hover:bg-\[var\(--erp-bg\)\] hover:shadow-\[0_14px_32px_rgba\(15,23,42,0\.08\)\] sm:flex-row sm:items-center sm:justify-between"/g,
  `className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#009B7D]/40 hover:bg-emerald-50/30 hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between"`
);

content = content.replace(
  /className="flex flex-col gap-2 rounded-2xl border border-\[var\(--erp-border\)\] bg-\[var\(--erp-surface\)\] p-4 transition hover:bg-\[var\(--erp-bg\)\] sm:flex-row sm:items-center sm:justify-between"/g,
  `className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#009B7D]/40 hover:bg-emerald-50/30 hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between"`
);

// Texte ligne
content = content.replace(
  /className="text-base font-black text-\[var\(--erp-text\)\]"/g,
  `className="text-base font-black text-slate-950"`
);

content = content.replace(
  /className="font-black text-\[var\(--erp-text\)\]"/g,
  `className="text-base font-black text-slate-950"`
);

content = content.replace(
  /className="mt-1 text-xs font-semibold text-\[var\(--erp-text-muted\)\]"/g,
  `className="mt-1 text-xs font-semibold text-slate-500"`
);

// Montant
content = content.replace(
  /className="rounded-2xl border border-\[var\(--erp-border\)\] bg-\[var\(--erp-bg\)\] px-4 py-3 text-right"/g,
  `className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-right"`
);

content = content.replace(
  /className="text-xs font-bold uppercase tracking-wide text-\[var\(--erp-text-muted\)\]"/g,
  `className="text-xs font-black uppercase tracking-wide text-emerald-700"`
);

content = content.replace(
  /className="mt-1 whitespace-nowrap text-base font-black text-\[var\(--erp-text\)\]"/g,
  `className="mt-1 whitespace-nowrap text-base font-black text-slate-950"`
);

content = content.replace(
  /className="text-sm font-black text-\[var\(--erp-text\)\]"/g,
  `className="text-sm font-black text-slate-950"`
);

// Mojibake courant
content = content.replace(/·/g, "·");
content = content.replace(/lié/g, "lié");

fs.writeFileSync(file, content, "utf8");

console.log("OK: panneau related records aligné sur le style form/list opérationnel.");