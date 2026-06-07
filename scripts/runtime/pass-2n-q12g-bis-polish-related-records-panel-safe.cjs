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

const backup = `${file}.bak-q12g-bis-polish-safe`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

// 1. Corrige les mojibake visibles dans ce panneau.
content = content.replace(/·/g, "·");
content = content.replace(/lié/g, "lié");

// 2. Panneau principal : plus premium, sans changer la structure.
content = content.replace(
  `className="rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4 shadow-sm sm:p-5"`,
  `className="overflow-hidden rounded-[2rem] border border-[var(--erp-border)] bg-[var(--erp-surface)] shadow-[0_18px_50px_rgba(15,23,42,0.08)]"`
);

// 3. Header : meilleur contraste et meilleur spacing.
content = content.replace(
  `className="flex flex-col gap-4 rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-bg)] p-4 sm:flex-row sm:items-center sm:justify-between"`,
  `className="flex flex-col gap-5 border-b border-[var(--erp-border)] bg-gradient-to-br from-[var(--erp-bg)] to-[var(--erp-surface)] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"`
);

// 4. Titre plus fort.
content = content.replace(
  `className="text-base font-black text-[var(--erp-text)]"`,
  `className="text-xl font-black tracking-tight text-[var(--erp-text)] sm:text-2xl"`
);

// 5. Sous-texte / compteur plus lisible.
content = content.replace(
  `className="mt-1 text-sm text-[var(--erp-text-muted)]"`,
  `className="mt-1 text-sm font-semibold text-[var(--erp-text-muted)]"`
);

// 6. Bouton CTA plus visible.
content = content.replace(
  `className="inline-flex items-center justify-center rounded-2xl bg-[var(--erp-primary)] px-5 py-3 text-sm font-black text-white transition hover:opacity-90"`,
  `className="inline-flex items-center justify-center rounded-2xl bg-[var(--erp-primary)] px-5 py-3 text-sm font-black text-white shadow-[0_12px_24px_rgba(0,155,125,0.20)] transition hover:-translate-y-0.5 hover:opacity-95 hover:shadow-[0_18px_34px_rgba(0,155,125,0.28)] active:translate-y-0"`
);

// 7. Conteneur des lignes : plus d’air.
content = content.replace(
  `className="mt-4 space-y-3"`,
  `className="space-y-3 p-4 sm:p-5"`
);

// 8. Empty state plus propre.
content = content.replace(
  `className="rounded-2xl border border-dashed border-[var(--erp-border)] p-4 text-sm font-semibold text-[var(--erp-text-muted)]"`,
  `className="rounded-2xl border border-dashed border-[var(--erp-border)] bg-[var(--erp-bg)] p-5 text-sm font-semibold text-[var(--erp-text-muted)]"`
);

// 9. Carte ligne : plus premium.
content = content.replace(
  `className="flex flex-col gap-2 rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4 transition hover:bg-[var(--erp-bg)] sm:flex-row sm:items-center sm:justify-between"`,
  `className="group flex flex-col gap-4 rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--erp-primary)] hover:bg-[var(--erp-bg)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between"`
);

// 10. Label ligne plus lisible.
content = content.replace(
  `className="font-black text-[var(--erp-text)]"`,
  `className="text-base font-black text-[var(--erp-text)]"`
);

// 11. Montant : carte dédiée au lieu d'un simple texte.
content = content.replace(
  `<p className="text-sm font-black text-[var(--erp-text)]">
                  {formatMoney(amount)}
                </p>`,
  `<div className="rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-bg)] px-4 py-3 text-right">
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--erp-text-muted)]">
                    Montant
                  </p>
                  <p className="mt-1 whitespace-nowrap text-base font-black text-[var(--erp-text)]">
                    {formatMoney(amount)}
                  </p>
                </div>`
);

fs.writeFileSync(file, content, "utf8");

console.log("OK: polish sécurisé appliqué à ERPRelatedRecordsPanel.tsx");