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
 * PASS 2N-Q9C
 * Boutons formulaires en gris premium.
 *
 * Objectif :
 * - formulaires moins cheap
 * - boutons principaux graphite / gris premium
 * - hover vert AMARKHYS discret
 * - boutons secondaires blancs / gris clair
 * - ne pas toucher au cockpit
 */

const files = [
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  "src/components/erp/forms/enterprise/ERPFormActions.tsx",
  "src/components/erp/forms/enterprise/ERPFormSummaryPanel.tsx",
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
  "src/components/erp/ui/ERPButton.tsx",
  "src/components/erp/ui/Button.tsx",
  "src/components/erp/ui/index.tsx",
];

function polishButtons(content) {
  let next = content;

  const pairs = [
    /**
     * Boutons verts trop présents -> gris graphite premium.
     */
    ["bg-[#00A68A] text-white", "bg-[#334155] text-white"],
    ["bg-[var(--erp-primary)] text-white", "bg-[#334155] text-white"],
    ["bg-emerald-600 text-white", "bg-[#334155] text-white"],
    ["bg-slate-950 text-white", "bg-[#334155] text-white"],
    ["bg-black text-white", "bg-[#334155] text-white"],

    /**
     * Hover vert agressif -> hover graphite plus profond + contour vert discret.
     */
    ["hover:bg-[#007F6D]", "hover:bg-[#1F2937] hover:border-[#00A68A]"],
    ["hover:bg-[var(--erp-secondary)]", "hover:bg-[#1F2937] hover:border-[#00A68A]"],
    ["hover:bg-emerald-500", "hover:bg-[#1F2937] hover:border-[#00A68A]"],
    ["hover:bg-slate-800", "hover:bg-[#1F2937] hover:border-[#00A68A]"],
    ["hover:bg-slate-900", "hover:bg-[#1F2937] hover:border-[#00A68A]"],

    /**
     * Violet/indigo résiduel -> gris premium.
     */
    ["bg-violet-600 text-white", "bg-[#334155] text-white"],
    ["bg-purple-600 text-white", "bg-[#334155] text-white"],
    ["bg-indigo-600 text-white", "bg-[#334155] text-white"],

    /**
     * Ombres boutons verts -> ombres graphite.
     */
    [
      "shadow-[0_12px_30px_rgba(0,166,138,0.22)]",
      "shadow-[0_12px_28px_rgba(15,23,42,0.18)]"
    ],
    [
      "shadow-[0_18px_40px_rgba(0,127,109,0.24)]",
      "shadow-[0_18px_40px_rgba(15,23,42,0.22)]"
    ],
    [
      "shadow-[0_10px_24px_rgba(0,166,138,0.20)]",
      "shadow-[0_10px_24px_rgba(15,23,42,0.16)]"
    ],
  ];

  for (const [from, to] of pairs) {
    next = next.replaceAll(from, to);
  }

  /**
   * Forcer un style propre quand la classe commence par rounded-2xl.
   */
  next = next.replaceAll(
    "rounded-2xl bg-[#334155] text-white",
    "rounded-2xl border border-[#475569] bg-[#334155] text-white"
  );

  next = next.replaceAll(
    "rounded-xl bg-[#334155] text-white",
    "rounded-xl border border-[#475569] bg-[#334155] text-white"
  );

  /**
   * Boutons secondaires : éviter gris mort.
   */
  next = next.replaceAll(
    "bg-[#F8FCFD] text-[#0F172A]",
    "bg-white text-[#0F172A]"
  );

  next = next.replaceAll(
    "bg-[#F8FCFD]/95 text-[#0F172A]",
    "bg-white text-[#0F172A]"
  );

  /**
   * Si un bouton blanc bordé existe, lui donner un hover vert très doux.
   */
  next = next.replaceAll(
    "border border-[#D5E4E8] bg-white",
    "border border-[#D5E4E8] bg-white transition hover:border-[#8EDFD4] hover:bg-[#DDF8F1]"
  );

  /**
   * Nettoyage doublons.
   */
  next = next
    .replaceAll("transition transition", "transition")
    .replaceAll("border border-[#475569] border border-[#475569]", "border border-[#475569]")
    .replaceAll("hover:border-[#00A68A] hover:border-[#00A68A]", "hover:border-[#00A68A]")
    .replaceAll("hover:bg-[#1F2937] hover:bg-[#1F2937]", "hover:bg-[#1F2937]")
    .replaceAll("hover:border-[#8EDFD4] hover:border-[#8EDFD4]", "hover:border-[#8EDFD4]")
    .replaceAll("hover:bg-[#DDF8F1] hover:bg-[#DDF8F1]", "hover:bg-[#DDF8F1]")
    .replaceAll("shadow-[0_12px_28px_rgba(15,23,42,0.18)] shadow-[0_12px_28px_rgba(15,23,42,0.18)]", "shadow-[0_12px_28px_rgba(15,23,42,0.18)]");

  return next;
}

for (const target of files) {
  patch(target, polishButtons);
}

console.log("PASS 2N-Q9C OK: premium grey form buttons applied.");