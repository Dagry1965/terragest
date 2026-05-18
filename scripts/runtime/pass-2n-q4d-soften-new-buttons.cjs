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
 * PASS 2N-Q4D
 * Adoucir les boutons "Nouveau ..." des listes AMARKHYS.
 * Objectif : remplacer le noir trop profond par un vert PETRONAS premium.
 */

const files = [
  "src/components/erp/generic/GenericListPage.tsx",
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/components/erp/runtime/ERPRuntimeTable.tsx",
  "src/components/erp/ui/ERPButton.tsx",
  "src/components/erp/ui/Button.tsx",
  "src/components/erp/ui/index.tsx",
];

for (const target of files) {
  patch(target, (content) => {
    let next = content;

    const replacements = [
      /**
       * Noir profond → vert AMARKHYS.
       */
      ["bg-slate-950", "bg-[var(--erp-primary)]"],
      ["hover:bg-slate-900", "hover:bg-[var(--erp-secondary)]"],
      ["hover:bg-slate-800", "hover:bg-[var(--erp-secondary)]"],

      ["bg-gray-950", "bg-[var(--erp-primary)]"],
      ["hover:bg-gray-900", "hover:bg-[var(--erp-secondary)]"],
      ["hover:bg-gray-800", "hover:bg-[var(--erp-secondary)]"],

      ["bg-black", "bg-[var(--erp-primary)]"],
      ["hover:bg-black", "hover:bg-[var(--erp-secondary)]"],

      /**
       * Bleu/violet restants → vert AMARKHYS.
       */
      ["bg-blue-600", "bg-[var(--erp-primary)]"],
      ["hover:bg-blue-500", "hover:bg-[var(--erp-secondary)]"],

      ["bg-indigo-600", "bg-[var(--erp-primary)]"],
      ["hover:bg-indigo-500", "hover:bg-[var(--erp-secondary)]"],

      ["bg-violet-600", "bg-[var(--erp-primary)]"],
      ["hover:bg-violet-500", "hover:bg-[var(--erp-secondary)]"],

      ["bg-purple-600", "bg-[var(--erp-primary)]"],
      ["hover:bg-purple-500", "hover:bg-[var(--erp-secondary)]"],

      /**
       * Texte.
       */
      ["text-white", "text-white"],
    ];

    for (const [from, to] of replacements) {
      next = next.replaceAll(from, to);
    }

    /**
     * Si un bouton est déjà en var(--erp-primary), on lui donne un rendu premium doux.
     */
    next = next.replaceAll(
      `className="rounded-2xl bg-[var(--erp-primary)]`,
      `className="rounded-2xl bg-[var(--erp-primary)] shadow-[0_10px_24px_rgba(0,155,125,0.18)] transition hover:bg-[var(--erp-secondary)] hover:shadow-[0_12px_30px_rgba(0,169,157,0.22)]`
    );

    next = next.replaceAll(
      `className="rounded-xl bg-[var(--erp-primary)]`,
      `className="rounded-xl bg-[var(--erp-primary)] shadow-[0_10px_24px_rgba(0,155,125,0.18)] transition hover:bg-[var(--erp-secondary)] hover:shadow-[0_12px_30px_rgba(0,169,157,0.22)]`
    );

    /**
     * Nettoyer les doublons possibles si le script est relancé.
     */
    next = next.replaceAll(
      "transition transition",
      "transition"
    );

    next = next.replaceAll(
      "hover:bg-[var(--erp-secondary)] hover:bg-[var(--erp-secondary)]",
      "hover:bg-[var(--erp-secondary)]"
    );

    return next;
  });
}

/**
 * Ajuster le thème pour que le vert soit un peu plus doux.
 */
patch("src/runtime/theme/ERPWorkspaceTheme.ts", (content) => {
  let next = content;

  next = next
    .replaceAll('primary: "#009B7D"', 'primary: "#00A68A"')
    .replaceAll('secondary: "#00A99D"', 'secondary: "#00BFA5"')
    .replaceAll('"--erp-primary": "#009B7D"', '"--erp-primary": "#00A68A"')
    .replaceAll('"--erp-secondary": "#00A99D"', '"--erp-secondary": "#00BFA5"');

  return next;
});

console.log("PASS 2N-Q4D OK: new buttons softened.");