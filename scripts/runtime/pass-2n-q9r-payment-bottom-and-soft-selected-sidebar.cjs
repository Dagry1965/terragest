const fs = require("fs");
const path = require("path");

const root = process.cwd();

function abs(filePath) {
  return path.join(root, filePath);
}

function patch(filePath, updater) {
  const target = abs(filePath);

  if (!fs.existsSync(target)) {
    console.log("SKIP", filePath);
    return;
  }

  const before = fs.readFileSync(target, "utf8");
  const after = updater(before);

  if (before !== after) {
    fs.writeFileSync(target, after, "utf8");
    console.log("UPDATED", filePath);
  } else {
    console.log("NO CHANGE", filePath);
  }
}

/**
 * PASS 2N-Q9R
 *
 * 1. Facture :
 *    - descendre le bouton "Enregistrer un paiement"
 *    - aligner le bas du bouton avec le bas des cartes de montants
 *
 * 2. Sidebar :
 *    - sélection = vert doux du hover
 *    - pas de noir
 *    - pas de vert cockpit trop fort
 */

const softGreenSelected =
  "rounded-[999px] border border-[#8EDFD4]/70 bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)] text-[#064E3B] shadow-[0_14px_32px_rgba(0,166,138,0.16),inset_0_1px_0_rgba(255,255,255,0.72)] scale-[1.025] -translate-y-0.5";

const normalGlassHoverSoftGreen =
  "rounded-[999px] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(248,250,252,0.58))] text-[#475569] shadow-[0_8px_22px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] hover:scale-[1.035] hover:-translate-y-0.5 hover:border-[#8EDFD4]/70 hover:bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)] hover:text-[#064E3B] hover:shadow-[0_14px_32px_rgba(0,166,138,0.16),inset_0_1px_0_rgba(255,255,255,0.72)]";

/**
 * 1. Sidebar : selected = vert doux du hover.
 */
patch("src/components/erp/shell/ErpSidebar.tsx", (content) => {
  let next = content;

  /**
   * Remplacer les sélections vert cockpit fortes.
   */
  next = next.replace(
    /\?\s*"[^"]*bg-\[linear-gradient\(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%\)[^"]*"/g,
    `? "${softGreenSelected}"`
  );

  next = next.replace(
    /\?\s*"[^"]*bg-\[linear-gradient\(135deg,#0EAFAA_0%,#0B8F86_100%\)[^"]*"/g,
    `? "${softGreenSelected}"`
  );

  /**
   * Remplacer les sélections verre doux déjà existantes par la version hover douce.
   */
  next = next.replace(
    /\?\s*"[^"]*bg-\[linear-gradient\(135deg,rgba\(255,255,255,0\.[0-9]+\),rgba\(221,248,241,0\.[0-9]+\)\)\][^"]*"/g,
    `? "${softGreenSelected}"`
  );

  /**
   * Remplacer toute sélection sombre résiduelle.
   */
  next = next.replace(
    /\?\s*"[^"]*(?:bg-black|bg-slate-950|bg-slate-900|bg-slate-800|bg-\[#020403\]|bg-\[#020807\]|bg-\[#0F172A\]|bg-\[#111827\]|bg-\[#17212F\]|bg-\[#1F2937\]|bg-\[#334155\])[^"]*"/g,
    `? "${softGreenSelected}"`
  );

  /**
   * Normal : verre doux ; hover : même vert doux que selected.
   */
  next = next.replace(
    /:\s*"[^"]*text-\[#475569\][^"]*hover[^"]*"/g,
    `: "${normalGlassHoverSoftGreen}"`
  );

  next = next
    .replaceAll("text-white", "text-[#0F172A]")
    .replaceAll("rounded-[999px] rounded-[999px]", "rounded-[999px]")
    .replaceAll("scale-[1.025] scale-[1.025]", "scale-[1.025]")
    .replaceAll("-translate-y-0.5 -translate-y-0.5", "-translate-y-0.5")
    .replaceAll("hover:scale-[1.035] hover:scale-[1.035]", "hover:scale-[1.035]")
    .replaceAll("hover:-translate-y-0.5 hover:-translate-y-0.5", "hover:-translate-y-0.5")
    .replaceAll("text-[#064E3B] text-[#064E3B]", "text-[#064E3B]");

  return next;
});

/**
 * 2. Facture : trouver le fichier contenant "Enregistrer un paiement".
 */
const searchDirs = [
  "src/components/erp/billing",
  "src/components/erp/forms/enterprise",
  "src/components/erp/runtime",
  "src/components/erp/generic",
];

function walk(dir) {
  const absoluteDir = abs(dir);

  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  const result = [];
  const stack = [absoluteDir];

  while (stack.length > 0) {
    const current = stack.pop();

    for (const item of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, item.name);

      if (item.isDirectory()) {
        stack.push(absolute);
        continue;
      }

      if (!item.isFile()) {
        continue;
      }

      if (!item.name.endsWith(".tsx") && !item.name.endsWith(".ts")) {
        continue;
      }

      result.push(absolute);
    }
  }

  return result;
}

const paymentFiles = [];

for (const dir of searchDirs) {
  for (const file of walk(dir)) {
    const content = fs.readFileSync(file, "utf8");

    if (content.includes("Enregistrer un paiement")) {
      paymentFiles.push(path.relative(root, file).replaceAll("\\", "/"));
    }
  }
}

if (paymentFiles.length === 0) {
  console.log("NO PAYMENT FILE FOUND");
} else {
  console.log("PAYMENT FILES", paymentFiles);
}

/**
 * 3. Descendre le bouton :
 *    - container en items-end
 *    - bouton en self-end
 *    - alignement bas sur desktop
 *    - centré uniquement sur mobile si besoin
 */
for (const relative of paymentFiles) {
  patch(relative, (content) => {
    let next = content;

    /**
     * Annuler les centrages précédents.
     */
    next = next
      .replaceAll("items-center justify-between", "items-end justify-between")
      .replaceAll("lg:items-center", "lg:items-end")
      .replaceAll("self-center", "self-end")
      .replaceAll("lg:self-center", "lg:self-end")
      .replaceAll("mx-auto lg:ml-auto lg:mr-0", "ml-auto")
      .replaceAll("justify-center lg:justify-end", "justify-end")
      .replaceAll("justify-center", "justify-center");

    /**
     * Trouver la classe du bouton contenant le texte et forcer :
     * - self-end
     * - mt-auto pour descendre dans la colonne
     * - mb-0
     * - min-w propre
     */
    next = next.replace(
      /className="([^"]*)"\s*>\s*Enregistrer un paiement/g,
      (match, classes) => {
        let updated = classes;

        const mustHave = [
          "min-w-[220px]",
          "justify-center",
          "self-end",
          "mt-auto",
          "mb-0",
          "lg:self-end",
        ];

        for (const cls of mustHave) {
          if (!updated.includes(cls)) {
            updated += ` ${cls}`;
          }
        }

        updated = updated
          .replaceAll("self-center", "self-end")
          .replaceAll("lg:self-center", "lg:self-end")
          .replaceAll("mx-auto", "ml-auto")
          .replaceAll("bg-[#334155]", "bg-[#00A68A]")
          .replaceAll("hover:bg-[#1F2937]", "hover:bg-[#007F6D]")
          .replaceAll("text-[#0F172A]", "text-white")
          .replaceAll("text-[#02110F]", "text-white")
          .replaceAll("  ", " ");

        if (!updated.includes("shadow-[0_12px_30px_rgba(0,166,138,0.22)]")) {
          updated += " shadow-[0_12px_30px_rgba(0,166,138,0.22)]";
        }

        return `className="${updated}">\n              Enregistrer un paiement`;
      }
    );

    /**
     * Si le bouton est dans une colonne/flex parent, renforcer l'alignement bas.
     */
    next = next
      .replaceAll(
        "className=\"flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between\"",
        "className=\"flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between\""
      )
      .replaceAll(
        "className=\"flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between\"",
        "className=\"flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between\""
      )
      .replaceAll(
        "className=\"flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between\"",
        "className=\"flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between\""
      )
      .replaceAll(
        "className=\"flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between\"",
        "className=\"flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between\""
      );

    /**
     * Nettoyage.
     */
    next = next
      .replaceAll("self-end self-end", "self-end")
      .replaceAll("lg:self-end lg:self-end", "lg:self-end")
      .replaceAll("mt-auto mt-auto", "mt-auto")
      .replaceAll("mb-0 mb-0", "mb-0")
      .replaceAll("min-w-[220px] min-w-[220px]", "min-w-[220px]")
      .replaceAll("shadow-[0_12px_30px_rgba(0,166,138,0.22)] shadow-[0_12px_30px_rgba(0,166,138,0.22)]", "shadow-[0_12px_30px_rgba(0,166,138,0.22)]")
      .replaceAll("text-white text-white", "text-white");

    return next;
  });
}

console.log("PASS 2N-Q9R OK: payment button bottom-aligned and selected sidebar soft green.");