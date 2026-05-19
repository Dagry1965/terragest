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
 * PASS 2N-Q9Q
 * 1. Sidebar : menu sélectionné vert cockpit + texte blanc fort.
 * 2. Facture : bouton "Enregistrer un paiement" mieux aligné dans le bloc.
 */

const cockpitGreenSelected =
  "rounded-[999px] border border-[#27F3D5]/60 bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-white shadow-[0_16px_38px_rgba(14,175,170,0.30),inset_0_1px_0_rgba(255,255,255,0.40)] scale-[1.025] -translate-y-0.5";

const normalGlassHoverSoftGreen =
  "rounded-[999px] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(248,250,252,0.58))] text-[#475569] shadow-[0_8px_22px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] hover:scale-[1.035] hover:-translate-y-0.5 hover:border-[#8EDFD4]/70 hover:bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)] hover:text-[#064E3B] hover:shadow-[0_16px_36px_rgba(0,166,138,0.16),inset_0_1px_0_rgba(255,255,255,0.72)]";

/**
 * 1. Sidebar : remplacer les sélections verre doux par vert cockpit.
 */
patch("src/components/erp/shell/ErpSidebar.tsx", (content) => {
  let next = content;

  const selectedSoftGlassPatterns = [
    `rounded-[999px] border border-[#8EDFD4]/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(221,248,241,0.72))] text-[#064E3B] shadow-[0_14px_34px_rgba(0,166,138,0.14),inset_0_1px_0_rgba(255,255,255,0.78)] scale-[1.02] -translate-y-0.5`,
    `rounded-[999px] border border-[#8EDFD4]/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(221,248,241,0.68))] text-[#064E3B] shadow-[0_12px_28px_rgba(0,166,138,0.12),inset_0_1px_0_rgba(255,255,255,0.76)] scale-[1.018] -translate-y-0.5`,
  ];

  for (const pattern of selectedSoftGlassPatterns) {
    next = next.replaceAll(pattern, cockpitGreenSelected);
  }

  /**
   * Si une sélection sombre résiduelle existe encore, la forcer en vert cockpit.
   */
  next = next.replace(
    /\?\s*"[^"]*(?:bg-black|bg-slate-950|bg-slate-900|bg-\[#0F172A\]|bg-\[#111827\]|bg-\[#1F2937\]|bg-\[#334155\])[^"]*"/g,
    `? "${cockpitGreenSelected}"`
  );

  /**
   * Normal : verre doux. Hover : vert doux.
   */
  next = next.replace(
    /:\s*"[^"]*text-\[#475569\][^"]*hover[^"]*"/g,
    `: "${normalGlassHoverSoftGreen}"`
  );

  /**
   * Renforcer spécifiquement le texte blanc de l’état sélectionné.
   */
  next = next
    .replaceAll("text-[#02110F]", "text-white")
    .replaceAll("text-[#064E3B] shadow-[0_16px_38px_rgba(14,175,170,0.30)", "text-white shadow-[0_16px_38px_rgba(14,175,170,0.30)")
    .replaceAll("rounded-[999px] rounded-[999px]", "rounded-[999px]")
    .replaceAll("text-white text-white", "text-white")
    .replaceAll("scale-[1.025] scale-[1.025]", "scale-[1.025]")
    .replaceAll("-translate-y-0.5 -translate-y-0.5", "-translate-y-0.5");

  return next;
});

/**
 * 2. Facture : trouver le composant qui contient "Enregistrer un paiement"
 *    et améliorer son alignement.
 */
const billingDirs = [
  "src/components/erp/billing",
  "src/components/erp/forms/enterprise",
  "src/components/erp/runtime",
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

for (const dir of billingDirs) {
  for (const file of walk(dir)) {
    const content = fs.readFileSync(file, "utf8");

    if (content.includes("Enregistrer un paiement")) {
      paymentFiles.push(file);
    }
  }
}

if (paymentFiles.length === 0) {
  console.log("NO PAYMENT BUTTON FILE FOUND");
} else {
  for (const file of paymentFiles) {
    const relative = path.relative(root, file).replaceAll("\\", "/");

    patch(relative, (content) => {
      let next = content;

      /**
       * Aligner les containers fréquents du bloc paiement.
       */
      next = next
        .replaceAll(
          "items-end justify-between",
          "items-center justify-between"
        )
        .replaceAll(
          "lg:items-end",
          "lg:items-center"
        )
        .replaceAll(
          "justify-end",
          "justify-center lg:justify-end"
        )
        .replaceAll(
          "ml-auto",
          "mx-auto lg:ml-auto lg:mr-0"
        );

      /**
       * Bouton “Enregistrer un paiement” : largeur propre, centré verticalement.
       */
      next = next.replace(
        /className="([^"]*(?:bg-\[#00A68A\]|bg-\[#009B7A\]|bg-emerald|bg-\[var\(--erp-primary\)\])[^"]*)"\s*>\s*Enregistrer un paiement/g,
        (match, classes) => {
          let updatedClasses = classes;

          if (!updatedClasses.includes("min-w-[220px]")) {
            updatedClasses += " min-w-[220px]";
          }

          if (!updatedClasses.includes("justify-center")) {
            updatedClasses += " justify-center";
          }

          if (!updatedClasses.includes("self-center")) {
            updatedClasses += " self-center";
          }

          if (!updatedClasses.includes("lg:self-center")) {
            updatedClasses += " lg:self-center";
          }

          updatedClasses = updatedClasses
            .replaceAll("bg-[#334155]", "bg-[#00A68A]")
            .replaceAll("hover:bg-[#1F2937]", "hover:bg-[#007F6D]")
            .replaceAll("text-[#0F172A]", "text-white")
            .replaceAll("text-[#02110F]", "text-white")
            .replaceAll("  ", " ");

          return `className="${updatedClasses}">\n              Enregistrer un paiement`;
        }
      );

      /**
       * Cas bouton déjà gris : le remettre cohérent vert facture.
       */
      next = next.replace(
        /className="([^"]*min-w-\[220px\][^"]*)"\s*>\s*Enregistrer un paiement/g,
        (match, classes) => {
          let updatedClasses = classes
            .replaceAll("bg-[#334155]", "bg-[#00A68A]")
            .replaceAll("hover:bg-[#1F2937]", "hover:bg-[#007F6D]")
            .replaceAll("text-[#0F172A]", "text-white")
            .replaceAll("text-[#02110F]", "text-white");

          if (!updatedClasses.includes("shadow-[0_12px_30px_rgba(0,166,138,0.22)]")) {
            updatedClasses += " shadow-[0_12px_30px_rgba(0,166,138,0.22)]";
          }

          return `className="${updatedClasses}">\n              Enregistrer un paiement`;
        }
      );

      /**
       * Nettoyage.
       */
      next = next
        .replaceAll("justify-center lg:justify-end-center", "justify-center lg:justify-end")
        .replaceAll("justify-center lg:justify-end justify-center lg:justify-end", "justify-center lg:justify-end")
        .replaceAll("self-center self-center", "self-center")
        .replaceAll("lg:self-center lg:self-center", "lg:self-center")
        .replaceAll("min-w-[220px] min-w-[220px]", "min-w-[220px]")
        .replaceAll("mx-auto lg:ml-auto lg:mr-0 mx-auto lg:ml-auto lg:mr-0", "mx-auto lg:ml-auto lg:mr-0")
        .replaceAll("text-white text-white", "text-white");

      return next;
    });
  }
}

console.log("PASS 2N-Q9Q OK: payment button aligned and sidebar selected state green.");