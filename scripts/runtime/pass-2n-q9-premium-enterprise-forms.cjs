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
  const absolute = file(filePath);

  if (!fs.existsSync(absolute)) {
    console.log("SKIP", filePath);
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
 * PASS 2N-Q9
 * Premium Enterprise Forms AMARKHYS.
 *
 * Objectif :
 * - garder le thème clair facture
 * - renforcer le rendu premium
 * - améliorer header, sections, champs, tabs, résumé, actions
 * - ne pas créer de formulaire spécifique page par page
 */

function premiumFormPolish(content) {
  let next = content;

  const replacements = [
    /**
     * Surfaces.
     */
    ["bg-slate-50", "bg-[var(--erp-bg)]"],
    ["bg-slate-100", "bg-[var(--erp-bg-soft)]"],
    ["bg-white", "bg-[var(--erp-surface)]"],
    ["bg-[var(--erp-primary-soft)]", "bg-[#DDF8F1]"],

    /**
     * Borders.
     */
    ["border-slate-200", "border-[#D5E4E8]"],
    ["border-slate-300", "border-[#D5E4E8]"],
    ["border-[var(--erp-border)]", "border-[#D5E4E8]"],
    ["border-[var(--erp-border-strong)]", "border-[#8EDFD4]"],

    /**
     * Text.
     */
    ["text-slate-950", "text-[#020617]"],
    ["text-slate-900", "text-[#020617]"],
    ["text-slate-800", "text-[#0F172A]"],
    ["text-slate-700", "text-[#0F172A]"],
    ["text-slate-600", "text-[#475569]"],
    ["text-slate-500", "text-[#64748B]"],
    ["text-[var(--erp-text)]", "text-[#020617]"],
    ["text-[var(--erp-text-muted)]", "text-[#475569]"],

    /**
     * AMARKHYS green.
     */
    ["text-emerald-700", "text-[#007F6D]"],
    ["text-[var(--erp-primary)]", "text-[#007F6D]"],
    ["bg-emerald-600", "bg-[#00A68A]"],
    ["bg-[var(--erp-primary)]", "bg-[#00A68A]"],
    ["hover:bg-emerald-500", "hover:bg-[#007F6D]"],
    ["hover:bg-[var(--erp-secondary)]", "hover:bg-[#007F6D]"],
    ["focus:border-emerald-500", "focus:border-[#00A68A]"],
    ["focus:ring-emerald-500", "focus:ring-[#00A68A]"],

    /**
     * Shadows.
     */
    [
      "shadow-[0_14px_40px_rgba(15,23,42,0.07)]",
      "shadow-[0_18px_55px_rgba(15,23,42,0.09)]"
    ],
    [
      "shadow-[0_1px_2px_rgba(15,23,42,0.05)]",
      "shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
    ],
    ["shadow-sm", "shadow-[0_8px_24px_rgba(15,23,42,0.06)]"],
  ];

  for (const [from, to] of replacements) {
    next = next.replaceAll(from, to);
  }

  /**
   * Hero / header formulaire : plus premium, clair avec halo vert doux.
   */
  next = next.replaceAll(
    "bg-[var(--erp-bg)]",
    "bg-[radial-gradient(circle_at_88%_12%,rgba(0,166,138,0.16),transparent_28%),linear-gradient(135deg,#F8FCFD_0%,#F3F8FA_54%,#DDF8F1_100%)]"
  );

  /**
   * Cartes principales : plus nettes, plus premium.
   */
  next = next.replaceAll(
    "rounded-3xl border border-[#D5E4E8] bg-[var(--erp-surface)]",
    "rounded-3xl border border-[#D5E4E8] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.09)]"
  );

  next = next.replaceAll(
    "rounded-2xl border border-[#D5E4E8] bg-[var(--erp-surface)]",
    "rounded-2xl border border-[#D5E4E8] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
  );

  /**
   * Blocs accent / résumé : vert doux visible mais pas agressif.
   */
  next = next.replaceAll(
    "bg-[#DDF8F1]",
    "bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)]"
  );

  /**
   * Boutons primaires premium.
   */
  next = next.replaceAll(
    "bg-[#00A68A] px",
    "bg-[#00A68A] px"
  );

  next = next.replaceAll(
    "bg-[#00A68A] shadow-[0_18px_55px_rgba(15,23,42,0.09)]",
    "bg-[#00A68A] shadow-[0_12px_30px_rgba(0,166,138,0.22)]"
  );

  next = next.replaceAll(
    "bg-[#00A68A] text-white",
    "bg-[#00A68A] text-white shadow-[0_12px_30px_rgba(0,166,138,0.22)] transition hover:-translate-y-0.5 hover:bg-[#007F6D] hover:shadow-[0_18px_40px_rgba(0,127,109,0.24)] active:translate-y-0"
  );

  /**
   * Champs : rendu plus tactile/premium.
   */
  next = next.replaceAll(
    "rounded-xl border border-[#D5E4E8]",
    "rounded-2xl border border-[#D5E4E8]"
  );

  next = next.replaceAll(
    "focus:shadow-[0_0_0_3px_var(--erp-focus-ring)]",
    "focus:shadow-[0_0_0_4px_rgba(0,166,138,0.13)]"
  );

  /**
   * Tabs : plus premium.
   */
  next = next.replaceAll(
    "rounded-xl",
    "rounded-2xl"
  );

  /**
   * Responsive : plus confortable.
   */
  next = next
    .replaceAll("p-8", "p-4 sm:p-6 lg:p-8")
    .replaceAll("p-6", "p-4 sm:p-5 lg:p-6")
    .replaceAll("gap-8", "gap-4 sm:gap-6 lg:gap-8")
    .replaceAll("gap-6", "gap-4 sm:gap-5 lg:gap-6")
    .replaceAll("space-y-8", "space-y-5 sm:space-y-6 lg:space-y-8")
    .replaceAll("text-4xl", "text-2xl sm:text-3xl lg:text-4xl")
    .replaceAll("text-3xl", "text-2xl sm:text-3xl")
    .replaceAll("text-2xl", "text-xl sm:text-2xl");

  /**
   * Nettoyage doublons.
   */
  next = next
    .replaceAll("transition transition", "transition")
    .replaceAll("shadow-[0_18px_55px_rgba(15,23,42,0.09)] shadow-[0_18px_55px_rgba(15,23,42,0.09)]", "shadow-[0_18px_55px_rgba(15,23,42,0.09)]")
    .replaceAll("shadow-[0_12px_30px_rgba(0,166,138,0.22)] shadow-[0_12px_30px_rgba(0,166,138,0.22)]", "shadow-[0_12px_30px_rgba(0,166,138,0.22)]")
    .replaceAll("hover:bg-[#007F6D] hover:bg-[#007F6D]", "hover:bg-[#007F6D]")
    .replaceAll("hover:-translate-y-0.5 hover:-translate-y-0.5", "hover:-translate-y-0.5");

  return next;
}

const files = [
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  "src/components/erp/forms/enterprise/ERPFormSection.tsx",
  "src/components/erp/forms/enterprise/ERPFormField.tsx",
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
  "src/components/erp/forms/enterprise/ERPFormSummaryPanel.tsx",
  "src/components/erp/forms/enterprise/ERPFormActions.tsx",
];

for (const target of files) {
  patch(target, premiumFormPolish);
}

/**
 * Theme variables : renforcer légèrement le clair premium.
 */
patch("src/runtime/theme/ERPWorkspaceTheme.ts", (content) => {
  return content
    .replaceAll('"--erp-bg": "#F3F8FA"', '"--erp-bg": "#F3F8FA"')
    .replaceAll('"--erp-bg-soft": "#EEF6F7"', '"--erp-bg-soft": "#EEF6F7"')
    .replaceAll('"--erp-surface": "#FFFFFF"', '"--erp-surface": "#FFFFFF"')
    .replaceAll('"--erp-primary": "#00A68A"', '"--erp-primary": "#00A68A"')
    .replaceAll('"--erp-secondary": "#006B5D"', '"--erp-secondary": "#007F6D"')
    .replaceAll('"--erp-primary-soft": "#DDF8F1"', '"--erp-primary-soft": "#DDF8F1"')
    .replaceAll('"--erp-border": "#D5E4E8"', '"--erp-border": "#D5E4E8"')
    .replaceAll('"--erp-border-strong": "#8EDFD4"', '"--erp-border-strong": "#8EDFD4"')
    .replaceAll('"--erp-focus-ring": "rgba(0, 169, 157, 0.12)"', '"--erp-focus-ring": "rgba(0, 166, 138, 0.13)"');
});

console.log("PASS 2N-Q9 OK: premium enterprise forms polish applied.");