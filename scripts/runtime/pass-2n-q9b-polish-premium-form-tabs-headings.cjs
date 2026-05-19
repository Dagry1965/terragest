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
 * PASS 2N-Q9B
 * Polish premium forms :
 * - adoucir le noir des onglets
 * - supprimer violet/indigo
 * - utiliser un style de rubrique proche "Paiement en plusieurs fois"
 * - garder le premium clair/anthracite doux sans cheap
 */

function replaceAll(content, pairs) {
  let next = content;

  for (const [from, to] of pairs) {
    next = next.replaceAll(from, to);
  }

  return next;
}

/**
 * 1. Onglets : noir trop dur -> graphite doux / vert doux.
 */
patch("src/components/erp/forms/enterprise/ERPFormTabs.tsx", (content) => {
  let next = content;

  next = replaceAll(next, [
    /**
     * Noir trop profond.
     */
    ["bg-[#111827]", "bg-[#F8FCFD]"],
    ["bg-[#020403]", "bg-[#F8FCFD]"],
    ["bg-[#020807]", "bg-[#F8FCFD]"],
    ["bg-slate-950", "bg-[#F8FCFD]"],
    ["bg-slate-900", "bg-[#F8FCFD]"],
    ["bg-black", "bg-[#F8FCFD]"],

    /**
     * Bordure dark -> bordure douce.
     */
    ["border-white/10", "border-[#D5E4E8]"],
    ["border-white/15", "border-[#D5E4E8]"],

    /**
     * Texte trop blanc dans les onglets clairs.
     */
    ["text-white", "text-[#0F172A]"],
    ["text-slate-300", "text-[#475569]"],
    ["text-slate-400", "text-[#64748B]"],

    /**
     * Violet / indigo -> teal AMARKHYS.
     */
    ["bg-violet-600", "bg-[#00A68A]"],
    ["hover:bg-violet-500", "hover:bg-[#007F6D]"],
    ["text-violet-600", "text-[#007F6D]"],
    ["text-violet-700", "text-[#007F6D]"],
    ["border-violet-200", "border-[#8EDFD4]"],
    ["bg-violet-50", "bg-[#DDF8F1]"],

    ["bg-purple-600", "bg-[#00A68A]"],
    ["hover:bg-purple-500", "hover:bg-[#007F6D]"],
    ["text-purple-600", "text-[#007F6D]"],
    ["text-purple-700", "text-[#007F6D]"],
    ["border-purple-200", "border-[#8EDFD4]"],
    ["bg-purple-50", "bg-[#DDF8F1]"],

    ["bg-indigo-600", "bg-[#00A68A]"],
    ["hover:bg-indigo-500", "hover:bg-[#007F6D]"],
    ["text-indigo-600", "text-[#007F6D]"],
    ["text-indigo-700", "text-[#007F6D]"],
    ["border-indigo-200", "border-[#8EDFD4]"],
    ["bg-indigo-50", "bg-[#DDF8F1]"],
  ]);

  /**
   * Style global tab container : clair premium, pas noir.
   */
  next = next.replaceAll(
    "rounded-2xl border border-[#D5E4E8] bg-[#F8FCFD]",
    "rounded-2xl border border-[#D5E4E8] bg-[#F8FCFD]/95 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
  );

  /**
   * Onglet actif : vert AMARKHYS visible.
   */
  next = next.replaceAll(
    "bg-[#00A68A] text-[#0F172A]",
    "bg-[#00A68A] text-white"
  );

  next = next.replaceAll(
    "bg-[#00A68A] text-white shadow-[0_12px_30px_rgba(0,166,138,0.22)]",
    "bg-[#00A68A] text-white shadow-[0_10px_24px_rgba(0,166,138,0.20)]"
  );

  next = next
    .replaceAll("shadow-[0_8px_24px_rgba(15,23,42,0.06)] shadow-[0_8px_24px_rgba(15,23,42,0.06)]", "shadow-[0_8px_24px_rgba(15,23,42,0.06)]")
    .replaceAll("text-[#0F172A] text-[#0F172A]", "text-[#0F172A]")
    .replaceAll("bg-[#F8FCFD]/95/95", "bg-[#F8FCFD]/95");

  return next;
});

/**
 * 2. Sections : reprendre l'esprit typographique "Paiement en plusieurs fois".
 *    Rubrique = petit label uppercase vert + titre fort + sous-texte doux.
 */
patch("src/components/erp/forms/enterprise/ERPFormSection.tsx", (content) => {
  let next = content;

  next = replaceAll(next, [
    /**
     * Violet/indigo éventuels.
     */
    ["text-violet-600", "text-[#007F6D]"],
    ["text-violet-700", "text-[#007F6D]"],
    ["bg-violet-50", "bg-[#DDF8F1]"],
    ["border-violet-200", "border-[#8EDFD4]"],

    ["text-purple-600", "text-[#007F6D]"],
    ["text-purple-700", "text-[#007F6D]"],
    ["bg-purple-50", "bg-[#DDF8F1]"],
    ["border-purple-200", "border-[#8EDFD4]"],

    ["text-indigo-600", "text-[#007F6D]"],
    ["text-indigo-700", "text-[#007F6D]"],
    ["bg-indigo-50", "bg-[#DDF8F1]"],
    ["border-indigo-200", "border-[#8EDFD4]"],

    /**
     * Noir trop fort dans les rubriques.
     */
    ["bg-[#111827]", "bg-[#F8FCFD]"],
    ["border-white/10", "border-[#D5E4E8]"],
    ["text-white", "text-[#020617]"],
    ["text-slate-300", "text-[#475569]"],

    /**
     * Accent AMARKHYS.
     */
    ["text-emerald-700", "text-[#007F6D]"],
    ["bg-emerald-50", "bg-[#DDF8F1]"],
    ["border-emerald-200", "border-[#8EDFD4]"],
  ]);

  /**
   * Carte section : plus facture premium.
   */
  next = next.replaceAll(
    "rounded-3xl border border-[#D5E4E8] bg-[#F8FCFD]",
    "rounded-3xl border border-[#D5E4E8] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]"
  );

  next = next.replaceAll(
    "rounded-3xl border border-[#D5E4E8] bg-white shadow-[0_22px_70px_rgba(0,0,0,0.18)]",
    "rounded-3xl border border-[#D5E4E8] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]"
  );

  /**
   * Titres de sections : style rubrique facture.
   * On fait des remplacements de classes fréquentes sans casser le JSX.
   */
  next = next.replaceAll(
    "text-xl font-black tracking-tight text-[#020617]",
    "text-2xl font-black tracking-tight text-[#020617]"
  );

  next = next.replaceAll(
    "text-lg font-black tracking-tight text-[#020617]",
    "text-2xl font-black tracking-tight text-[#020617]"
  );

  next = next.replaceAll(
    "text-sm font-medium text-[#475569]",
    "text-sm leading-6 text-[#475569]"
  );

  /**
   * Petite pastille/label éventuelle : uppercase vert.
   */
  next = next.replaceAll(
    "text-xs font-black uppercase tracking",
    "text-xs font-black uppercase tracking-[0.22em]"
  );

  next = next
    .replaceAll("shadow-[0_18px_55px_rgba(15,23,42,0.08)] shadow-[0_18px_55px_rgba(15,23,42,0.08)]", "shadow-[0_18px_55px_rgba(15,23,42,0.08)]")
    .replaceAll("text-[#020617] text-[#020617]", "text-[#020617]");

  return next;
});

/**
 * 3. Form wrapper : garder l’enveloppe actuelle, mais adoucir les noirs.
 */
patch("src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx", (content) => {
  let next = content;

  next = replaceAll(next, [
    /**
     * Noir trop dur -> graphite/bleu nuit doux.
     */
    ["bg-[#020403]", "bg-[#0F172A]"],
    ["bg-[#020807]", "bg-[#0F172A]"],
    ["bg-[#111827]", "bg-[#17212F]"],
    ["bg-slate-950", "bg-[#0F172A]"],
    ["bg-black", "bg-[#0F172A]"],

    /**
     * Violet/indigo -> AMARKHYS.
     */
    ["bg-violet-600", "bg-[#00A68A]"],
    ["hover:bg-violet-500", "hover:bg-[#007F6D]"],
    ["text-violet-600", "text-[#007F6D]"],
    ["text-violet-700", "text-[#007F6D]"],
    ["bg-violet-50", "bg-[#DDF8F1]"],
    ["border-violet-200", "border-[#8EDFD4]"],

    ["bg-purple-600", "bg-[#00A68A]"],
    ["hover:bg-purple-500", "hover:bg-[#007F6D]"],
    ["text-purple-600", "text-[#007F6D]"],
    ["text-purple-700", "text-[#007F6D]"],
    ["bg-purple-50", "bg-[#DDF8F1]"],
    ["border-purple-200", "border-[#8EDFD4]"],

    ["bg-indigo-600", "bg-[#00A68A]"],
    ["hover:bg-indigo-500", "hover:bg-[#007F6D]"],
    ["text-indigo-600", "text-[#007F6D]"],
    ["text-indigo-700", "text-[#007F6D]"],
    ["bg-indigo-50", "bg-[#DDF8F1]"],
    ["border-indigo-200", "border-[#8EDFD4]"],

    /**
     * Garder le texte des zones claires sombre.
     */
    ["bg-white text-white", "bg-white text-[#020617]"],
    ["bg-[#F8FCFD] text-white", "bg-[#F8FCFD] text-[#020617]"],
  ]);

  /**
   * Shell : moins noir, plus premium graphite.
   */
  next = next.replaceAll(
    "linear-gradient(135deg,#111827_0%,#1F2933_48%,#0F2F2B_100%)",
    "linear-gradient(135deg,#17212F_0%,#223244_48%,#123A35_100%)"
  );

  /**
   * Header / rubrique : plus proche facture.
   */
  next = next.replaceAll(
    "text-xl sm:text-2xl",
    "text-2xl sm:text-3xl"
  );

  next = next
    .replaceAll("hover:bg-[#007F6D] hover:bg-[#007F6D]", "hover:bg-[#007F6D]")
    .replaceAll("bg-[#00A68A] bg-[#00A68A]", "bg-[#00A68A]")
    .replaceAll("text-white text-white", "text-white");

  return next;
});

/**
 * 4. Champs : supprimer violet, garder clair lisible.
 */
patch("src/components/erp/forms/enterprise/ERPFormField.tsx", (content) => {
  let next = content;

  next = replaceAll(next, [
    ["text-violet-600", "text-[#007F6D]"],
    ["text-violet-700", "text-[#007F6D]"],
    ["bg-violet-50", "bg-[#DDF8F1]"],
    ["border-violet-200", "border-[#8EDFD4]"],
    ["focus:border-violet-500", "focus:border-[#00A68A]"],
    ["focus:ring-violet-500", "focus:ring-[#00A68A]"],

    ["text-purple-600", "text-[#007F6D]"],
    ["text-purple-700", "text-[#007F6D]"],
    ["bg-purple-50", "bg-[#DDF8F1]"],
    ["border-purple-200", "border-[#8EDFD4]"],
    ["focus:border-purple-500", "focus:border-[#00A68A]"],
    ["focus:ring-purple-500", "focus:ring-[#00A68A]"],

    ["text-indigo-600", "text-[#007F6D]"],
    ["text-indigo-700", "text-[#007F6D]"],
    ["bg-indigo-50", "bg-[#DDF8F1]"],
    ["border-indigo-200", "border-[#8EDFD4]"],
    ["focus:border-indigo-500", "focus:border-[#00A68A]"],
    ["focus:ring-indigo-500", "focus:ring-[#00A68A]"],

    ["bg-[#111827]", "bg-white"],
    ["text-white", "text-[#020617]"],
    ["text-slate-300", "text-[#475569]"],
  ]);

  /**
   * Labels / champs : rester haut de gamme, mais lisibles.
   */
  next = next.replaceAll(
    "rounded-2xl border border-[#D5E4E8]",
    "rounded-2xl border border-[#D5E4E8] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.04)]"
  );

  next = next.replaceAll(
    "shadow-[0_4px_14px_rgba(15,23,42,0.04)] bg-white",
    "shadow-[0_4px_14px_rgba(15,23,42,0.04)]"
  );

  next = next
    .replaceAll("bg-white bg-white", "bg-white")
    .replaceAll("text-[#020617] text-[#020617]", "text-[#020617]")
    .replaceAll("shadow-[0_4px_14px_rgba(15,23,42,0.04)] shadow-[0_4px_14px_rgba(15,23,42,0.04)]", "shadow-[0_4px_14px_rgba(15,23,42,0.04)]");

  return next;
});

/**
 * 5. Résumé/actions : supprimer violet et adoucir panneaux.
 */
const secondaryFiles = [
  "src/components/erp/forms/enterprise/ERPFormSummaryPanel.tsx",
  "src/components/erp/forms/enterprise/ERPFormActions.tsx",
];

for (const target of secondaryFiles) {
  patch(target, (content) => {
    let next = content;

    next = replaceAll(next, [
      ["bg-violet-600", "bg-[#00A68A]"],
      ["hover:bg-violet-500", "hover:bg-[#007F6D]"],
      ["text-violet-600", "text-[#007F6D]"],
      ["text-violet-700", "text-[#007F6D]"],
      ["bg-violet-50", "bg-[#DDF8F1]"],
      ["border-violet-200", "border-[#8EDFD4]"],

      ["bg-purple-600", "bg-[#00A68A]"],
      ["hover:bg-purple-500", "hover:bg-[#007F6D]"],
      ["text-purple-600", "text-[#007F6D]"],
      ["text-purple-700", "text-[#007F6D]"],
      ["bg-purple-50", "bg-[#DDF8F1]"],
      ["border-purple-200", "border-[#8EDFD4]"],

      ["bg-indigo-600", "bg-[#00A68A]"],
      ["hover:bg-indigo-500", "hover:bg-[#007F6D]"],
      ["text-indigo-600", "text-[#007F6D]"],
      ["text-indigo-700", "text-[#007F6D]"],
      ["bg-indigo-50", "bg-[#DDF8F1]"],
      ["border-indigo-200", "border-[#8EDFD4]"],

      ["bg-[#111827]", "bg-[#17212F]"],
      ["bg-[#020403]", "bg-[#17212F]"],
      ["bg-black", "bg-[#17212F]"],
    ]);

    next = next
      .replaceAll("text-white text-white", "text-white")
      .replaceAll("bg-[#00A68A] bg-[#00A68A]", "bg-[#00A68A]");

    return next;
  });
}

console.log("PASS 2N-Q9B OK: premium forms tabs/headings polished.");
