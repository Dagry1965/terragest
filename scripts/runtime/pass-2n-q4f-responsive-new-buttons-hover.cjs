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
 * PASS 2N-Q4F
 * Boutons "Nouveau ..." :
 * - responsive mobile
 * - hover visible mais doux
 * - vert AMARKHYS
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

    /**
     * 1. Supprimer hover noirs / trop faibles.
     */
    const replacements = [
      ["hover:bg-black", "hover:bg-[#007F6D]"],
      ["hover:bg-slate-950", "hover:bg-[#007F6D]"],
      ["hover:bg-slate-900", "hover:bg-[#007F6D]"],
      ["hover:bg-slate-800", "hover:bg-[#007F6D]"],
      ["hover:bg-gray-950", "hover:bg-[#007F6D]"],
      ["hover:bg-gray-900", "hover:bg-[#007F6D]"],
      ["hover:bg-gray-800", "hover:bg-[#007F6D]"],

      ["hover:bg-[var(--erp-secondary)]", "hover:bg-[#007F6D]"],
      ["hover:bg-emerald-500", "hover:bg-[#007F6D]"],
      ["hover:bg-emerald-600", "hover:bg-[#007F6D]"],
      ["hover:bg-blue-500", "hover:bg-[#007F6D]"],
      ["hover:bg-blue-600", "hover:bg-[#007F6D]"],
      ["hover:bg-indigo-500", "hover:bg-[#007F6D]"],
      ["hover:bg-violet-500", "hover:bg-[#007F6D]"],
      ["hover:bg-purple-500", "hover:bg-[#007F6D]"],

      ["bg-slate-950", "bg-[var(--erp-primary)]"],
      ["bg-slate-900", "bg-[var(--erp-primary)]"],
      ["bg-black", "bg-[var(--erp-primary)]"],
      ["bg-blue-600", "bg-[var(--erp-primary)]"],
      ["bg-emerald-600", "bg-[var(--erp-primary)]"],
      ["bg-indigo-600", "bg-[var(--erp-primary)]"],
      ["bg-violet-600", "bg-[var(--erp-primary)]"],
      ["bg-purple-600", "bg-[var(--erp-primary)]"],
    ];

    for (const [from, to] of replacements) {
      next = next.replaceAll(from, to);
    }

    /**
     * 2. Rendre les boutons responsive.
     * On cible les boutons primaires déjà passés en var(--erp-primary).
     */
    const responsivePrimary =
      "w-full justify-center sm:w-auto rounded-2xl bg-[var(--erp-primary)] px-5 py-3 text-sm font-black text-white shadow-[0_8px_18px_rgba(0,155,125,0.16)] transition hover:-translate-y-0.5 hover:bg-[#007F6D] hover:shadow-[0_14px_30px_rgba(0,127,109,0.24)] active:translate-y-0";

    /**
     * Cas Link/Button avec className commençant par rounded-2xl.
     */
    next = next.replace(
      /className="rounded-2xl bg-\[var\(--erp-primary\)\][^"]*"/g,
      `className="${responsivePrimary}"`
    );

    next = next.replace(
      /className="rounded-xl bg-\[var\(--erp-primary\)\][^"]*"/g,
      `className="${responsivePrimary.replace("rounded-2xl", "rounded-xl")}"`
    );

    /**
     * Cas où className contient déjà w-full ou inline-flex.
     */
    next = next.replace(
      /className="([^"]*)bg-\[var\(--erp-primary\)\]([^"]*)"/g,
      (match) => {
        if (
          match.includes("Précédent") ||
          match.includes("Suivant")
        ) {
          return match;
        }

        if (
          match.includes("rounded-2xl") ||
          match.includes("rounded-xl")
        ) {
          return `className="${responsivePrimary}"`;
        }

        return match;
      }
    );

    /**
     * 3. Header liste responsive :
     * titre + bouton bien empilés sur mobile.
     */
    next = next.replaceAll(
      "flex items-center justify-between",
      "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    );

    /**
     * 4. Nettoyage doublons.
     */
    next = next
      .replaceAll("transition transition", "transition")
      .replaceAll("w-full justify-center sm:w-auto w-full", "w-full")
      .replaceAll("hover:bg-[#007F6D] hover:bg-[#007F6D]", "hover:bg-[#007F6D]")
      .replaceAll("hover:-translate-y-0.5 hover:-translate-y-0.5", "hover:-translate-y-0.5")
      .replaceAll("active:translate-y-0 active:translate-y-0", "active:translate-y-0");

    return next;
  });
}

/**
 * Thème : garder le vert normal doux et hover plus profond.
 */
patch("src/runtime/theme/ERPWorkspaceTheme.ts", (content) => {
  return content
    .replaceAll('primary: "#009B7D"', 'primary: "#00A68A"')
    .replaceAll('primary: "#00A68A"', 'primary: "#00A68A"')
    .replaceAll('secondary: "#00A99D"', 'secondary: "#007F6D"')
    .replaceAll('secondary: "#00BFA5"', 'secondary: "#007F6D"')
    .replaceAll('secondary: "#008F7A"', 'secondary: "#007F6D"')
    .replaceAll('"--erp-primary": "#009B7D"', '"--erp-primary": "#00A68A"')
    .replaceAll('"--erp-primary": "#00A68A"', '"--erp-primary": "#00A68A"')
    .replaceAll('"--erp-secondary": "#00A99D"', '"--erp-secondary": "#007F6D"')
    .replaceAll('"--erp-secondary": "#00BFA5"', '"--erp-secondary": "#007F6D"')
    .replaceAll('"--erp-secondary": "#008F7A"', '"--erp-secondary": "#007F6D"');
});

console.log("PASS 2N-Q4F OK: responsive new buttons with visible hover.");