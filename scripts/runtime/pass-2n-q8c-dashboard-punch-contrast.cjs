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
 * PASS 2N-Q8C
 * Dashboard AMARKHYS : plus de punch, plus de contraste.
 * Objectif : garder le thème facture clair, mais rendre le cockpit lisible et premium.
 */

function punch(content) {
  let next = content;

  const replacements = [
    /**
     * Textes trop pâles -> contraste fort.
     */
    ["text-white", "text-[#020617]"],
    ["text-white/90", "text-[#020617]"],
    ["text-white/80", "text-[#0F172A]"],
    ["text-slate-300", "text-[#334155]"],
    ["text-slate-400", "text-[#475569]"],
    ["text-slate-500", "text-[#475569]"],
    ["text-[var(--erp-text-muted)]", "text-[#475569]"],

    /**
     * Titres / KPI en bleu nuit fort.
     */
    ["text-[var(--erp-table-head-text)]", "text-white"],
    ["text-[var(--erp-text)]", "text-[#020617]"],

    /**
     * Cartes plus nettes.
     */
    ["bg-[var(--erp-bg)]", "bg-[#F3F8FA]"],
    ["bg-[var(--erp-bg-soft)]", "bg-[#EEF6F7]"],
    ["bg-[var(--erp-surface)]", "bg-white"],
    ["border-[var(--erp-border)]", "border-[#D5E4E8]"],
    ["border-[var(--erp-border-strong)]", "border-[#8EDFD4]"],

    /**
     * Vert AMARKHYS plus visible.
     */
    ["text-[var(--erp-primary)]", "text-[#007F6D]"],
    ["bg-[var(--erp-primary)]", "bg-[#00A68A]"],
    ["hover:bg-[#007F6D]", "hover:bg-[#006B5D]"],
    ["bg-[var(--erp-primary-soft)]", "bg-[#DDF8F1]"],

    /**
     * Boutons qui semblaient gris/désactivés.
     */
    ["bg-gray-200", "bg-[#00A68A]"],
    ["bg-slate-200", "bg-[#00A68A]"],
    ["bg-slate-300", "bg-[#00A68A]"],
    ["text-gray-400", "text-[#475569]"],
    ["text-slate-400", "text-[#475569]"],

    /**
     * Ombres plus visibles mais propres.
     */
    [
      "shadow-[0_14px_40px_rgba(15,23,42,0.07)]",
      "shadow-[0_18px_55px_rgba(15,23,42,0.10)]"
    ],
    [
      "shadow-[0_1px_2px_rgba(15,23,42,0.05)]",
      "shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
    ],
  ];

  for (const [from, to] of replacements) {
    next = next.replaceAll(from, to);
  }

  /**
   * Hero cockpit : fond punchy clair + titre sombre + accent vert.
   */
  next = next.replaceAll(
    "bg-[var(--erp-surface)] shadow-[0_18px_55px_rgba(15,23,42,0.10)]",
    "bg-[radial-gradient(circle_at_top_right,rgba(0,166,138,0.22),transparent_34%),linear-gradient(135deg,#FFFFFF_0%,#F8FCFD_48%,#DDF8F1_100%)] shadow-[0_22px_70px_rgba(15,23,42,0.12)]"
  );

  /**
   * Badges KPI : vert visible, pas gris.
   */
  next = next.replaceAll(
    "bg-[#DDF8F1] text-[#007F6D]",
    "bg-[#DDF8F1] text-[#006B5D]"
  );

  next = next.replaceAll(
    "border-[#D5E4E8] bg-[#DDF8F1]",
    "border-[#8EDFD4] bg-[#DDF8F1]"
  );

  /**
   * Boutons “Voir le module” : éviter l’effet désactivé gris.
   */
  next = next.replaceAll(
    "bg-[#00A68A] text-[#475569]",
    "bg-[#00A68A] text-white"
  );

  next = next.replaceAll(
    "bg-[#00A68A] text-[#020617]",
    "bg-[#00A68A] text-white"
  );

  next = next.replaceAll(
    "bg-[#00A68A] text-[#0F172A]",
    "bg-[#00A68A] text-white"
  );

  /**
   * Empty states : plus propres.
   */
  next = next.replaceAll(
    "bg-[#00A68A] px",
    "bg-white px"
  );

  /**
   * Nettoyage doublons.
   */
  next = next
    .replaceAll("shadow-[0_18px_55px_rgba(15,23,42,0.10)] shadow-[0_18px_55px_rgba(15,23,42,0.10)]", "shadow-[0_18px_55px_rgba(15,23,42,0.10)]")
    .replaceAll("text-[#020617] text-[#020617]", "text-[#020617]")
    .replaceAll("bg-white bg-white", "bg-white");

  return next;
}

const files = [
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

for (const target of files) {
  patch(target, punch);
}

/**
 * Scan large dashboard/cockpit/widgets.
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

      patch(relative, punch);
    }
  }
}

/**
 * Renforcer légèrement le thème AMARKHYS lui-même.
 */
patch("src/runtime/theme/ERPWorkspaceTheme.ts", (content) => {
  return content
    .replaceAll('text: "#020617"', 'text: "#020617"')
    .replaceAll('textMuted: "#587083"', 'textMuted: "#475569"')
    .replaceAll('primary: "#00A68A"', 'primary: "#00A68A"')
    .replaceAll('secondary: "#007F6D"', 'secondary: "#006B5D"')
    .replaceAll('"--erp-text": "#020617"', '"--erp-text": "#020617"')
    .replaceAll('"--erp-text-muted": "#587083"', '"--erp-text-muted": "#475569"')
    .replaceAll('"--erp-primary": "#00A68A"', '"--erp-primary": "#00A68A"')
    .replaceAll('"--erp-secondary": "#007F6D"', '"--erp-secondary": "#006B5D"')
    .replaceAll('"--erp-primary-soft": "#E6FBF4"', '"--erp-primary-soft": "#DDF8F1"');
});

console.log("PASS 2N-Q8C OK: dashboard punch and contrast restored.");