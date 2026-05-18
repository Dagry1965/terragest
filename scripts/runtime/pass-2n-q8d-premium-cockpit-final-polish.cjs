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
 * PASS 2N-Q8D
 * Premium cockpit final polish.
 * Objectif :
 * - cockpit plus large
 * - hero plus premium
 * - KPI cards plus contrastées
 * - boutons Voir le module verts/blancs, jamais gris
 * - empty states propres
 * - widgets plus vivants
 */

function premiumCockpit(content) {
  let next = content;

  const replacements = [
    /**
     * Largeur cockpit.
     */
    ["max-w-5xl", "max-w-screen-2xl"],
    ["max-w-6xl", "max-w-screen-2xl"],
    ["max-w-7xl", "max-w-screen-2xl"],

    /**
     * Fonds / cartes.
     */
    ["bg-[#F3F8FA]", "bg-[var(--erp-bg)]"],
    ["bg-[#EEF6F7]", "bg-[var(--erp-bg-soft)]"],
    ["bg-white", "bg-[var(--erp-surface)]"],
    ["border-[#D5E4E8]", "border-[var(--erp-border)]"],
    ["border-[#8EDFD4]", "border-[var(--erp-border-strong)]"],

    /**
     * Textes forts.
     */
    ["text-[#020617]", "text-[var(--erp-text)]"],
    ["text-[#0F172A]", "text-[var(--erp-text)]"],
    ["text-[#334155]", "text-[var(--erp-text-muted)]"],
    ["text-[#475569]", "text-[var(--erp-text-muted)]"],

    /**
     * Vert AMARKHYS.
     */
    ["text-[#007F6D]", "text-[var(--erp-primary)]"],
    ["text-[#006B5D]", "text-[var(--erp-primary)]"],
    ["bg-[#00A68A]", "bg-[var(--erp-primary)]"],
    ["hover:bg-[#006B5D]", "hover:bg-[var(--erp-secondary)]"],
    ["hover:bg-[#007F6D]", "hover:bg-[var(--erp-secondary)]"],
    ["bg-[#DDF8F1]", "bg-[var(--erp-primary-soft)]"],

    /**
     * Gris désactivé -> blanc ou vert doux.
     */
    ["bg-gray-200", "bg-[var(--erp-primary-soft)]"],
    ["bg-slate-200", "bg-[var(--erp-primary-soft)]"],
    ["bg-slate-300", "bg-[var(--erp-primary-soft)]"],
    ["bg-gray-300", "bg-[var(--erp-primary-soft)]"],

    /**
     * Ombres premium.
     */
    [
      "shadow-[0_18px_55px_rgba(15,23,42,0.10)]",
      "shadow-[0_22px_70px_rgba(15,23,42,0.12)]"
    ],
    [
      "shadow-[0_14px_40px_rgba(15,23,42,0.07)]",
      "shadow-[0_18px_55px_rgba(15,23,42,0.10)]"
    ],
  ];

  for (const [from, to] of replacements) {
    next = next.replaceAll(from, to);
  }

  /**
   * Hero premium clair + halo vert + bordure douce.
   */
  next = next.replaceAll(
    "bg-[radial-gradient(circle_at_top_right,rgba(0,166,138,0.22),transparent_34%),linear-gradient(135deg,#FFFFFF_0%,#F8FCFD_48%,#DDF8F1_100%)]",
    "bg-[radial-gradient(circle_at_85%_20%,rgba(0,166,138,0.26),transparent_32%),radial-gradient(circle_at_15%_85%,rgba(0,169,157,0.10),transparent_26%),linear-gradient(135deg,#FFFFFF_0%,#F8FCFD_50%,#DDF8F1_100%)]"
  );

  /**
   * Boutons de modules : jamais gris.
   * On force les boutons larges gris vers un bouton vert premium.
   */
  next = next.replaceAll(
    "bg-[var(--erp-primary-soft)] text-[var(--erp-text-muted)]",
    "bg-[var(--erp-primary)] text-white"
  );

  next = next.replaceAll(
    "bg-[var(--erp-primary-soft)] text-[var(--erp-text)]",
    "bg-[var(--erp-primary)] text-white"
  );

  next = next.replaceAll(
    "bg-[var(--erp-primary-soft)] px",
    "bg-[var(--erp-primary)] px"
  );

  next = next.replaceAll(
    "text-[var(--erp-text-muted)] uppercase",
    "text-white uppercase"
  );

  /**
   * Empty states gris -> bloc blanc bordé / vert doux.
   */
  next = next.replaceAll(
    "bg-[var(--erp-primary-soft)] p-4",
    "bg-white border border-[var(--erp-border)] p-4"
  );

  next = next.replaceAll(
    "bg-[var(--erp-primary-soft)] px-4 py-3",
    "bg-white border border-[var(--erp-border)] px-4 py-3"
  );

  /**
   * KPI cards : ajouter une impression premium si on trouve les cartes.
   */
  next = next.replaceAll(
    "rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)]",
    "relative overflow-hidden rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)]"
  );

  /**
   * Nettoyage répétitions.
   */
  next = next
    .replaceAll("relative overflow-hidden relative overflow-hidden", "relative overflow-hidden")
    .replaceAll("border border-[var(--erp-border)] border border-[var(--erp-border)]", "border border-[var(--erp-border)]")
    .replaceAll("bg-[var(--erp-surface)] bg-[var(--erp-surface)]", "bg-[var(--erp-surface)]")
    .replaceAll("shadow-[0_22px_70px_rgba(15,23,42,0.12)] shadow-[0_22px_70px_rgba(15,23,42,0.12)]", "shadow-[0_22px_70px_rgba(15,23,42,0.12)]")
    .replaceAll("text-white text-white", "text-white");

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
  patch(target, premiumCockpit);
}

/**
 * Scan global dashboard/cockpit/widgets.
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

      patch(relative, premiumCockpit);
    }
  }
}

/**
 * Thème AMARKHYS : contraste premium stabilisé.
 */
patch("src/runtime/theme/ERPWorkspaceTheme.ts", (content) => {
  return content
    .replaceAll('textMuted: "#587083"', 'textMuted: "#475569"')
    .replaceAll('secondary: "#007F6D"', 'secondary: "#006B5D"')
    .replaceAll('"--erp-text-muted": "#587083"', '"--erp-text-muted": "#475569"')
    .replaceAll('"--erp-secondary": "#007F6D"', '"--erp-secondary": "#006B5D"')
    .replaceAll('"--erp-primary-soft": "#E6FBF4"', '"--erp-primary-soft": "#DDF8F1"')
    .replaceAll('"--erp-border": "#D9E5EA"', '"--erp-border": "#D5E4E8"')
    .replaceAll('"--erp-border-strong": "#A7E4DC"', '"--erp-border-strong": "#8EDFD4"');
});

console.log("PASS 2N-Q8D OK: premium cockpit final polish applied.");
