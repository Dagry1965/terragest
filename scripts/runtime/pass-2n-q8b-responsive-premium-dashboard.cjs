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

function applyResponsiveDashboardPolish(content) {
  let next = content;

  const replacements = [
    /**
     * Padding responsive.
     */
    ["px-8 py-8", "px-4 py-6 sm:px-6 lg:px-8 lg:py-8"],
    ["p-8", "p-4 sm:p-6 lg:p-8"],
    ["p-6", "p-4 sm:p-5 lg:p-6"],
    ["p-5", "p-4 sm:p-5"],

    /**
     * Espacements.
     */
    ["gap-8", "gap-4 sm:gap-6 lg:gap-8"],
    ["gap-6", "gap-4 sm:gap-5 lg:gap-6"],
    ["space-y-8", "space-y-5 sm:space-y-6 lg:space-y-8"],
    ["space-y-6", "space-y-4 sm:space-y-5 lg:space-y-6"],

    /**
     * Grilles responsive.
     */
    ["grid-cols-4", "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"],
    ["grid-cols-3", "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"],
    ["grid-cols-2", "grid-cols-1 lg:grid-cols-2"],

    /**
     * Header dashboard responsive.
     */
    [
      "flex items-center justify-between",
      "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    ],

    /**
     * Typographie responsive.
     */
    ["text-4xl", "text-2xl sm:text-3xl lg:text-4xl"],
    ["text-3xl", "text-2xl sm:text-3xl"],
    ["text-2xl", "text-xl sm:text-2xl"],

    /**
     * Cartes premium.
     */
    ["rounded-[2rem]", "rounded-2xl sm:rounded-[2rem]"],
    ["rounded-3xl", "rounded-2xl sm:rounded-3xl"],

    /**
     * Boutons responsive.
     */
    [
      "inline-flex items-center",
      "inline-flex w-full items-center justify-center sm:w-auto"
    ],
    [
      "flex items-center gap-3 rounded-2xl",
      "flex w-full items-center justify-center gap-3 rounded-2xl sm:w-auto"
    ],
  ];

  for (const [from, to] of replacements) {
    next = next.replaceAll(from, to);
  }

  /**
   * Style cockpit facture / soft green.
   */
  const styleReplacements = [
    ["bg-slate-950", "bg-[var(--erp-bg)]"],
    ["bg-slate-900", "bg-[var(--erp-bg)]"],
    ["bg-slate-50", "bg-[var(--erp-bg)]"],
    ["bg-white", "bg-[var(--erp-surface)]"],

    ["border-slate-200", "border-[var(--erp-border)]"],
    ["border-slate-300", "border-[var(--erp-border)]"],
    ["border-white/10", "border-[var(--erp-border)]"],

    ["text-white", "text-[var(--erp-text)]"],
    ["text-slate-950", "text-[var(--erp-text)]"],
    ["text-slate-900", "text-[var(--erp-text)]"],
    ["text-slate-700", "text-[var(--erp-text)]"],
    ["text-slate-600", "text-[var(--erp-text-muted)]"],
    ["text-slate-500", "text-[var(--erp-text-muted)]"],

    ["bg-emerald-600", "bg-[var(--erp-primary)]"],
    ["hover:bg-emerald-500", "hover:bg-[#007F6D]"],
    ["text-emerald-700", "text-[var(--erp-primary)]"],
    ["bg-emerald-50", "bg-[var(--erp-primary-soft)]"],
    ["border-emerald-200", "border-[var(--erp-border-strong)]"],

    ["shadow-2xl", "shadow-[0_14px_40px_rgba(15,23,42,0.07)]"],
    ["shadow-xl", "shadow-[0_14px_40px_rgba(15,23,42,0.07)]"],
    ["shadow-lg", "shadow-[0_14px_40px_rgba(15,23,42,0.07)]"],
    ["shadow-sm", "shadow-[0_1px_2px_rgba(15,23,42,0.05)]"],
  ];

  for (const [from, to] of styleReplacements) {
    next = next.replaceAll(from, to);
  }

  /**
   * Cartes dashboard : rendu lisse.
   */
  next = next.replaceAll(
    "border border-[var(--erp-border)] bg-[var(--erp-surface)]",
    "border border-[var(--erp-border)] bg-[var(--erp-surface)] shadow-[0_14px_40px_rgba(15,23,42,0.07)]"
  );

  /**
   * Nettoyage doublons.
   */
  next = next
    .replaceAll("shadow-[0_14px_40px_rgba(15,23,42,0.07)] shadow-[0_14px_40px_rgba(15,23,42,0.07)]", "shadow-[0_14px_40px_rgba(15,23,42,0.07)]")
    .replaceAll("w-full items-center justify-center sm:w-auto w-full", "w-full items-center justify-center sm:w-auto")
    .replaceAll("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between");

  return next;
}

const explicitFiles = [
  "src/app/(private)/dashboard/page.tsx",
  "src/app/(private)/dashboard/amarkhys/page.tsx",
  "src/components/erp/dashboard/ERPDashboardRenderer.tsx",
  "src/components/erp/dashboard/generic/ERPGenericDashboard.tsx",
  "src/components/erp/dashboard/generic/widgets/ERPKpiWidget.tsx",
  "src/components/erp/dashboard/generic/widgets/ERPAlertWidget.tsx",
  "src/components/erp/dashboard/generic/widgets/ERPListWidget.tsx",
  "src/components/erp/dashboard/generic/widgets/ERPQuickActionsWidget.tsx",
  "src/components/erp/dashboard/generic/widgets/ERPChartWidget.tsx",
  "src/components/erp/dashboard/generic/widgets/ERPWidgetShell.tsx",
  "src/components/erp/cockpit/ERPCockpitLayout.tsx",
  "src/components/erp/cockpit/ERPCockpitHeader.tsx",
  "src/components/erp/cockpit/ERPCockpitKpiCard.tsx",
  "src/components/erp/cockpit/ERPCockpitWidget.tsx",
];

for (const target of explicitFiles) {
  patch(target, applyResponsiveDashboardPolish);
}

/**
 * Scan global des dossiers dashboard/cockpit/widgets.
 */
const dirs = [
  "src/components/erp/dashboard",
  "src/components/erp/cockpit",
  "src/components/erp/widgets",
];

for (const dir of dirs) {
  const absoluteDir = file(dir);

  if (!fs.existsSync(absoluteDir)) {
    continue;
  }

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

      const relative =
        path.relative(root, absolute).replaceAll("\\", "/");

      patch(relative, applyResponsiveDashboardPolish);
    }
  }
}

console.log("PASS 2N-Q8B OK: responsive premium dashboard applied.");