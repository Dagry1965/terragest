const fs = require("fs");
const path = require("path");

const root = process.cwd();

function file(filePath) {
  return path.join(root, filePath);
}

function read(filePath) {
  return fs.readFileSync(file(filePath), "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(file(filePath), content, "utf8");
  console.log("UPDATED", filePath);
}

function patch(filePath, updater) {
  if (!fs.existsSync(file(filePath))) {
    console.log("SKIP missing", filePath);
    return;
  }

  const before = read(filePath);
  const after = updater(before);

  if (before !== after) {
    write(filePath, after);
  } else {
    console.log("NO CHANGE", filePath);
  }
}

/**
 * PASS 2N-Q4C
 * Polish liste runtime AMARKHYS :
 * - contour gris clair lisse
 * - carte blanche premium
 * - recherche douce
 * - pagination propre
 * - bouton Nouveau vert
 */

patch("src/components/erp/runtime/ERPRuntimeTable.tsx", (content) => {
  let next = content;

  const replacements = [
    /**
     * Supprimer contours noirs/agressifs.
     */
    ["border-black", "border-[var(--erp-border)]"],
    ["border-slate-950", "border-[var(--erp-border)]"],
    ["border-slate-900", "border-[var(--erp-border)]"],
    ["border-gray-950", "border-[var(--erp-border)]"],
    ["border-gray-900", "border-[var(--erp-border)]"],

    /**
     * Cadre principal doux.
     */
    ["border border-[var(--erp-table-head)]", "border border-[var(--erp-border)]"],
    ["border-2", "border"],
    ["ring-1 ring-slate-900", "ring-1 ring-[var(--erp-border)]"],
    ["ring-slate-900", "ring-[var(--erp-border)]"],

    /**
     * Carte liste.
     */
    ["bg-slate-50", "bg-[var(--erp-bg)]"],
    ["bg-white", "bg-[var(--erp-surface)]"],
    ["border-slate-200", "border-[var(--erp-border)]"],
    ["border-slate-300", "border-[var(--erp-border)]"],
    ["shadow-none", "shadow-[0_14px_40px_rgba(15,23,42,0.06)]"],
    ["shadow-sm", "shadow-[0_14px_40px_rgba(15,23,42,0.06)]"],

    /**
     * Search.
     */
    ["focus:border-slate-900", "focus:border-[var(--erp-primary)]"],
    ["focus:ring-slate-900", "focus:ring-[var(--erp-primary)]"],
    ["placeholder:text-slate-400", "placeholder:text-slate-400"],

    /**
     * Pagination.
     */
    ["border-slate-950 bg-white", "border-[var(--erp-border)] bg-white"],
    ["border-slate-900 bg-white", "border-[var(--erp-border)] bg-white"],
    ["hover:bg-slate-950 hover:text-white", "hover:border-[var(--erp-primary)] hover:bg-[var(--erp-primary-soft)] hover:text-[var(--erp-primary)]"],
    ["hover:bg-slate-900 hover:text-white", "hover:border-[var(--erp-primary)] hover:bg-[var(--erp-primary-soft)] hover:text-[var(--erp-primary)]"],

    /**
     * Textes.
     */
    ["text-slate-950", "text-[var(--erp-text)]"],
    ["text-slate-900", "text-[var(--erp-text)]"],
    ["text-slate-600", "text-[var(--erp-text-muted)]"],
    ["text-slate-500", "text-[var(--erp-text-muted)]"],

    /**
     * Header table.
     */
    ["bg-slate-950", "bg-[var(--erp-table-head)]"],
    ["bg-slate-900", "bg-[var(--erp-table-head)]"],
    ["text-white", "text-[var(--erp-table-head-text)]"],

    /**
     * Hover lignes.
     */
    ["hover:bg-slate-50", "hover:bg-[var(--erp-primary-soft)]"],
    ["hover:bg-gray-50", "hover:bg-[var(--erp-primary-soft)]"],
  ];

  for (const [from, to] of replacements) {
    next = next.replaceAll(from, to);
  }

  /**
   * Si le conteneur table a été injecté avec une bordure trop marquée,
   * on le rend plus lisse.
   */
  next = next.replaceAll(
    `className="w-full overflow-x-auto rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)]"`,
    `className="w-full overflow-x-auto rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] shadow-[0_1px_2px_rgba(15,23,42,0.04)]"`
  );

  /**
   * Boutons pagination : normaliser les classes fréquentes.
   */
  next = next.replaceAll(
    `className="rounded-xl border px-4 py-2 text-sm font-bold`,
    `className="rounded-xl border border-[var(--erp-border)] bg-white px-4 py-2 text-sm font-bold text-[var(--erp-text)] shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition hover:border-[var(--erp-primary)] hover:bg-[var(--erp-primary-soft)] hover:text-[var(--erp-primary)]`
  );

  next = next.replaceAll(
    `className="rounded-2xl border px-4 py-2 text-sm font-bold`,
    `className="rounded-2xl border border-[var(--erp-border)] bg-white px-4 py-2 text-sm font-bold text-[var(--erp-text)] shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition hover:border-[var(--erp-primary)] hover:bg-[var(--erp-primary-soft)] hover:text-[var(--erp-primary)]`
  );

  /**
   * Input recherche : normaliser si possible.
   */
  next = next.replaceAll(
    `className="w-full rounded-2xl border-[var(--erp-border)] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]`,
    `className="w-full rounded-2xl border border-[var(--erp-border)] bg-white px-4 py-3 text-sm text-[var(--erp-text)] shadow-[0_1px_2px_rgba(15,23,42,0.05)] outline-none transition placeholder:text-slate-400 focus:border-[var(--erp-primary)] focus:shadow-[0_0_0_3px_var(--erp-focus-ring)]`
  );

  /**
   * Ajouter overflow-hidden aux cartes arrondies si absent.
   */
  next = next.replaceAll(
    "rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)]",
    "overflow-hidden rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)]"
  );

  return next;
});

patch("src/components/erp/generic/GenericListPage.tsx", (content) => {
  let next = content;

  const replacements = [
    /**
     * Fond page.
     */
    ["bg-slate-50", "bg-[var(--erp-bg)]"],
    ["bg-white", "bg-[var(--erp-surface)]"],

    /**
     * Bordures/cadres.
     */
    ["border-black", "border-[var(--erp-border)]"],
    ["border-slate-950", "border-[var(--erp-border)]"],
    ["border-slate-900", "border-[var(--erp-border)]"],
    ["border-slate-200", "border-[var(--erp-border)]"],
    ["border-slate-300", "border-[var(--erp-border)]"],

    /**
     * Bouton Nouveau.
     */
    ["bg-slate-950", "bg-[var(--erp-primary)]"],
    ["hover:bg-slate-800", "hover:bg-[var(--erp-secondary)]"],
    ["bg-blue-600", "bg-[var(--erp-primary)]"],
    ["hover:bg-blue-500", "hover:bg-[var(--erp-secondary)]"],
    ["text-white", "text-white"],

    /**
     * Ombres / texte.
     */
    ["shadow-sm", "shadow-[0_14px_40px_rgba(15,23,42,0.06)]"],
    ["text-slate-950", "text-[var(--erp-text)]"],
    ["text-slate-900", "text-[var(--erp-text)]"],
    ["text-slate-600", "text-[var(--erp-text-muted)]"],
    ["text-slate-500", "text-[var(--erp-text-muted)]"],
  ];

  for (const [from, to] of replacements) {
    next = next.replaceAll(from, to);
  }

  /**
   * Le bouton Nouveau doit être vert et doux, pas noir.
   */
  next = next.replaceAll(
    `className="rounded-2xl bg-[var(--erp-primary)]`,
    `className="rounded-2xl bg-[var(--erp-primary)] shadow-[0_10px_24px_rgba(0,155,125,0.18)]`
  );

  return next;
});

patch("src/components/erp/runtime/ERPRuntimePage.tsx", (content) => {
  let next = content;

  const replacements = [
    ["border-black", "border-[var(--erp-border)]"],
    ["border-slate-950", "border-[var(--erp-border)]"],
    ["border-slate-900", "border-[var(--erp-border)]"],
    ["border-slate-200", "border-[var(--erp-border)]"],
    ["bg-slate-50", "bg-[var(--erp-bg)]"],
    ["bg-white", "bg-[var(--erp-surface)]"],
    ["bg-slate-950", "bg-[var(--erp-table-head)]"],
    ["text-white", "text-[var(--erp-table-head-text)]"],
    ["text-slate-950", "text-[var(--erp-text)]"],
    ["text-slate-900", "text-[var(--erp-text)]"],
    ["text-slate-600", "text-[var(--erp-text-muted)]"],
  ];

  for (const [from, to] of replacements) {
    next = next.replaceAll(from, to);
  }

  return next;
});

console.log("PASS 2N-Q4C OK: runtime list frame and pagination polished.");