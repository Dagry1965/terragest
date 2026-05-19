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
 * PASS 2N-Q9A
 * AMARKHYS Anthracite Premium Form Shell.
 *
 * Objectif :
 * - donner plus de niveau premium aux formulaires
 * - fond/enveloppe anthracite
 * - sections et champs clairs pour la saisie
 * - boutons verts AMARKHYS
 * - ne pas toucher au cockpit dark dédié
 */

function applyAnthraciteFormShell(content) {
  let next = content;

  /**
   * Enveloppes / fonds globaux.
   */
  const replacements = [
    /**
     * Fond clair global -> shell graphite premium.
     */
    [
      "bg-[radial-gradient(circle_at_88%_12%,rgba(0,166,138,0.16),transparent_28%),linear-gradient(135deg,#F8FCFD_0%,#F3F8FA_54%,#DDF8F1_100%)]",
      "bg-[radial-gradient(circle_at_88%_12%,rgba(0,166,138,0.22),transparent_30%),linear-gradient(135deg,#111827_0%,#1F2933_48%,#0F2F2B_100%)]"
    ],
    [
      "bg-[var(--erp-bg)]",
      "bg-[radial-gradient(circle_at_88%_12%,rgba(0,166,138,0.22),transparent_30%),linear-gradient(135deg,#111827_0%,#1F2933_48%,#0F2F2B_100%)]"
    ],
    [
      "bg-[#F3F8FA]",
      "bg-[radial-gradient(circle_at_88%_12%,rgba(0,166,138,0.22),transparent_30%),linear-gradient(135deg,#111827_0%,#1F2933_48%,#0F2F2B_100%)]"
    ],

    /**
     * Textes sur shell anthracite.
     */
    ["text-[#020617]", "text-white"],
    ["text-[#0F172A]", "text-white"],
    ["text-[#475569]", "text-slate-300"],
    ["text-[#64748B]", "text-slate-400"],

    /**
     * Cartes / sections : on garde une surface claire.
     */
    [
      "rounded-3xl border border-[#D5E4E8] bg-white",
      "rounded-3xl border border-white/10 bg-[#F8FCFD]"
    ],
    [
      "rounded-2xl border border-[#D5E4E8] bg-white",
      "rounded-2xl border border-[#D5E4E8] bg-white"
    ],

    /**
     * Blocs vert doux : garder clairs.
     */
    [
      "bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)]",
      "bg-[linear-gradient(135deg,#FFFFFF_0%,#DDF8F1_100%)]"
    ],

    /**
     * Boutons.
     */
    ["bg-[#00A68A]", "bg-[#00A68A]"],
    ["hover:bg-[#007F6D]", "hover:bg-[#007F6D]"],

    /**
     * Bordures.
     */
    ["border-[#D5E4E8]", "border-[#D5E4E8]"],
    ["border-[#8EDFD4]", "border-[#8EDFD4]"],
  ];

  for (const [from, to] of replacements) {
    next = next.replaceAll(from, to);
  }

  /**
   * Après avoir mis le shell en dark, on force les zones de saisie à rester lisibles.
   */
  const lightFieldClasses = [
    "bg-white",
    "text-[#020617]",
    "placeholder:text-slate-400",
    "border-[#D5E4E8]",
    "focus:border-[#00A68A]",
    "focus:shadow-[0_0_0_4px_rgba(0,166,138,0.13)]",
  ].join(" ");

  /**
   * Normalisation des inputs/select/textarea si les classes simples existent.
   */
  next = next.replaceAll(
    "rounded-2xl border border-[#D5E4E8]",
    "rounded-2xl border border-[#D5E4E8]"
  );

  /**
   * Corriger textes dans les cartes claires : les sections doivent garder du texte sombre.
   * On cible les fichiers de sections/champs via classes fréquentes.
   */
  next = next.replaceAll(
    "bg-[#F8FCFD] shadow-[0_18px_55px_rgba(15,23,42,0.09)]",
    "bg-[#F8FCFD] text-[#020617] shadow-[0_22px_70px_rgba(0,0,0,0.18)]"
  );

  next = next.replaceAll(
    "bg-[#F8FCFD] shadow-[0_18px_55px_rgba(15,23,42,0.10)]",
    "bg-[#F8FCFD] text-[#020617] shadow-[0_22px_70px_rgba(0,0,0,0.18)]"
  );

  /**
   * Panneaux résumé / contrôle : graphite premium.
   */
  next = next.replaceAll(
    "border-[#D5E4E8] bg-[#F8FCFD] text-[#020617]",
    "border-white/10 bg-[#111827] text-white"
  );

  /**
   * Mais éviter que les champs deviennent dark : si input/select/textarea contiennent text-white,
   * on les remet en texte sombre via remplacement de patterns communs.
   */
  next = next.replaceAll(
    "bg-white text-white",
    "bg-white text-[#020617]"
  );

  next = next.replaceAll(
    "bg-[var(--erp-input-bg)] text-white",
    "bg-white text-[#020617]"
  );

  /**
   * Labels dans champs : lisibles selon contexte.
   */
  next = next.replaceAll(
    "text-white sm:text",
    "text-[#020617] sm:text"
  );

  /**
   * Tabs : look graphite premium, onglet actif vert.
   */
  next = next.replaceAll(
    "border-[#D5E4E8] bg-white",
    "border-white/10 bg-[#111827]"
  );

  next = next.replaceAll(
    "bg-[#111827] text-[#020617]",
    "bg-[#111827] text-white"
  );

  next = next.replaceAll(
    "bg-[#00A68A] text-white shadow-[0_12px_30px_rgba(0,166,138,0.22)]",
    "bg-[#00A68A] text-white shadow-[0_12px_30px_rgba(0,166,138,0.28)]"
  );

  /**
   * Nettoyage doublons.
   */
  next = next
    .replaceAll("transition transition", "transition")
    .replaceAll("text-white text-white", "text-white")
    .replaceAll("text-[#020617] text-[#020617]", "text-[#020617]")
    .replaceAll("bg-white bg-white", "bg-white")
    .replaceAll("border-white/10 border-white/10", "border-white/10")
    .replaceAll("shadow-[0_22px_70px_rgba(0,0,0,0.18)] shadow-[0_22px_70px_rgba(0,0,0,0.18)]", "shadow-[0_22px_70px_rgba(0,0,0,0.18)]");

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
  patch(target, applyAnthraciteFormShell);
}

/**
 * Renforcer les variables thème sans impacter cockpit dédié.
 */
patch("src/runtime/theme/ERPWorkspaceTheme.ts", (content) => {
  return content
    .replaceAll('"--erp-bg": "#F3F8FA"', '"--erp-bg": "#111827"')
    .replaceAll('"--erp-bg-soft": "#EEF6F7"', '"--erp-bg-soft": "#1F2933"')
    .replaceAll('"--erp-surface": "#FFFFFF"', '"--erp-surface": "#F8FCFD"')
    .replaceAll('"--erp-surface-muted": "#ECFDF7"', '"--erp-surface-muted": "#DDF8F1"')
    .replaceAll('"--erp-text": "#020617"', '"--erp-text": "#020617"')
    .replaceAll('"--erp-text-muted": "#475569"', '"--erp-text-muted": "#475569"')
    .replaceAll('"--erp-primary": "#00A68A"', '"--erp-primary": "#00A68A"')
    .replaceAll('"--erp-secondary": "#007F6D"', '"--erp-secondary": "#007F6D"')
    .replaceAll('"--erp-focus-ring": "rgba(0, 166, 138, 0.13)"', '"--erp-focus-ring": "rgba(0, 166, 138, 0.16)"');
});

console.log("PASS 2N-Q9A OK: anthracite premium form shell applied.");