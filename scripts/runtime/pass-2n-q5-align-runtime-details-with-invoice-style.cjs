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
 * PASS 2N-Q5
 * Harmoniser les pages détail runtime avec le thème facture AMARKHYS.
 */

const detailFiles = [
  "src/components/erp/runtime/ERPRuntimeDetails.tsx",
  "src/components/erp/generic/GenericDetailPage.tsx",
  "src/components/erp/runtime/ERPRuntimePage.tsx",
];

for (const target of detailFiles) {
  patch(target, (content) => {
    let next = content;

    const replacements = [
      /**
       * Fonds / surfaces.
       */
      ["bg-slate-50", "bg-[var(--erp-bg)]"],
      ["bg-slate-100", "bg-[var(--erp-bg-soft)]"],
      ["bg-white", "bg-[var(--erp-surface)]"],
      ["bg-slate-950", "bg-[var(--erp-table-head)]"],
      ["bg-slate-900", "bg-[var(--erp-table-head)]"],

      /**
       * Bordures.
       */
      ["border-black", "border-[var(--erp-border)]"],
      ["border-slate-950", "border-[var(--erp-border)]"],
      ["border-slate-900", "border-[var(--erp-border)]"],
      ["border-slate-300", "border-[var(--erp-border)]"],
      ["border-slate-200", "border-[var(--erp-border)]"],
      ["border-gray-200", "border-[var(--erp-border)]"],

      /**
       * Texte.
       */
      ["text-white", "text-[var(--erp-table-head-text)]"],
      ["text-slate-950", "text-[var(--erp-text)]"],
      ["text-slate-900", "text-[var(--erp-text)]"],
      ["text-slate-800", "text-[var(--erp-text)]"],
      ["text-slate-700", "text-[var(--erp-text)]"],
      ["text-slate-600", "text-[var(--erp-text-muted)]"],
      ["text-slate-500", "text-[var(--erp-text-muted)]"],
      ["text-gray-900", "text-[var(--erp-text)]"],
      ["text-gray-600", "text-[var(--erp-text-muted)]"],

      /**
       * Vert AMARKHYS.
       */
      ["bg-emerald-600", "bg-[var(--erp-primary)]"],
      ["hover:bg-emerald-500", "hover:bg-[#007F6D]"],
      ["text-emerald-700", "text-[var(--erp-primary)]"],
      ["bg-emerald-50", "bg-[var(--erp-primary-soft)]"],
      ["border-emerald-200", "border-[var(--erp-border-strong)]"],

      /**
       * Bleu/violet/noir actions -> vert ou blanc doux.
       */
      ["bg-blue-600", "bg-[var(--erp-primary)]"],
      ["hover:bg-blue-500", "hover:bg-[#007F6D]"],
      ["bg-indigo-600", "bg-[var(--erp-primary)]"],
      ["hover:bg-indigo-500", "hover:bg-[#007F6D]"],
      ["bg-violet-600", "bg-white border border-[var(--erp-border)] text-[var(--erp-text)]"],
      ["hover:bg-violet-500", "hover:bg-[var(--erp-primary-soft)]"],
      ["bg-purple-600", "bg-white border border-[var(--erp-border)] text-[var(--erp-text)]"],
      ["hover:bg-purple-500", "hover:bg-[var(--erp-primary-soft)]"],

      /**
       * Ombres / arrondis.
       */
      ["shadow-sm", "shadow-[0_14px_40px_rgba(15,23,42,0.07)]"],
      ["shadow-lg", "shadow-[0_14px_40px_rgba(15,23,42,0.07)]"],
      ["rounded-[2rem]", "rounded-3xl"],
    ];

    for (const [from, to] of replacements) {
      next = next.replaceAll(from, to);
    }

    /**
     * Responsive détail : les layouts côte-à-côte deviennent empilables.
     */
    next = next
      .replaceAll(
        "grid grid-cols-2",
        "grid grid-cols-1 lg:grid-cols-2"
      )
      .replaceAll(
        "grid grid-cols-3",
        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      )
      .replaceAll(
        "flex items-center justify-between",
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      )
      .replaceAll(
        "p-8",
        "p-4 sm:p-6 lg:p-8"
      )
      .replaceAll(
        "p-6",
        "p-4 sm:p-5 lg:p-6"
      );

    return next;
  });
}

/**
 * Actions runtime si elles sont dans des composants séparés.
 */
const actionFiles = [
  "src/components/erp/actions/ERPActionButton.tsx",
  "src/components/erp/actions/ERPActionBar.tsx",
  "src/components/erp/runtime/ERPRuntimeActions.tsx",
  "src/runtime/actions/ERPActionButton.tsx",
];

for (const target of actionFiles) {
  patch(target, (content) => {
    return content
      .replaceAll("bg-slate-950", "bg-[var(--erp-primary)]")
      .replaceAll("hover:bg-slate-900", "hover:bg-[#007F6D]")
      .replaceAll("hover:bg-slate-800", "hover:bg-[#007F6D]")
      .replaceAll("bg-blue-600", "bg-[var(--erp-primary)]")
      .replaceAll("hover:bg-blue-500", "hover:bg-[#007F6D]")
      .replaceAll("bg-emerald-600", "bg-[var(--erp-primary)]")
      .replaceAll("hover:bg-emerald-500", "hover:bg-[#007F6D]")
      .replaceAll("bg-violet-600", "bg-white border border-[var(--erp-border)] text-[var(--erp-text)]")
      .replaceAll("hover:bg-violet-500", "hover:bg-[var(--erp-primary-soft)]")
      .replaceAll("text-slate-950", "text-[var(--erp-text)]")
      .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
      .replaceAll("border-slate-200", "border-[var(--erp-border)]");
  });
}

/**
 * Badges éventuels.
 */
const badgeFiles = [
  "src/components/erp/ui/ERPBadge.tsx",
  "src/components/erp/ui/Badge.tsx",
  "src/components/erp/ui/index.tsx",
];

for (const target of badgeFiles) {
  patch(target, (content) => {
    return content
      .replaceAll("bg-emerald-50", "bg-[var(--erp-primary-soft)]")
      .replaceAll("text-emerald-700", "text-[var(--erp-primary)]")
      .replaceAll("border-emerald-200", "border-[var(--erp-border-strong)]")
      .replaceAll("bg-slate-100", "bg-[var(--erp-bg-soft)]")
      .replaceAll("text-slate-700", "text-[var(--erp-text)]")
      .replaceAll("border-slate-200", "border-[var(--erp-border)]");
  });
}

console.log("PASS 2N-Q5 OK: runtime details aligned with invoice style.");