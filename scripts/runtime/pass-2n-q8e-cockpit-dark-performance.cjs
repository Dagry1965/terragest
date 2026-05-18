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
 * PASS 2N-Q8E
 * Cockpit AMARKHYS Dark Performance.
 *
 * Important :
 * - dashboard/cockpit seulement
 * - ne touche pas aux formulaires/listes/détails déjà validés
 */

function darkCockpit(content) {
  let next = content;

  const replacements = [
    /**
     * Fond cockpit intense.
     */
    ["bg-[var(--erp-bg)]", "bg-[#020807]"],
    ["bg-[#F3F8FA]", "bg-[#020807]"],
    ["bg-[#EEF6F7]", "bg-[#061412]"],
    ["bg-[var(--erp-bg-soft)]", "bg-[#061412]"],

    /**
     * Cartes dark premium.
     */
    ["bg-[var(--erp-surface)]", "bg-[#0B201D]"],
    ["bg-white", "bg-[#0B201D]"],
    ["bg-[#FFFFFF]", "bg-[#0B201D]"],
    ["bg-[var(--erp-primary-soft)]", "bg-[rgba(14,175,170,0.12)]"],
    ["bg-[#DDF8F1]", "bg-[rgba(14,175,170,0.12)]"],

    /**
     * Bordures dark transparentes.
     */
    ["border-[var(--erp-border)]", "border-white/10"],
    ["border-[#D5E4E8]", "border-white/10"],
    ["border-[var(--erp-border-strong)]", "border-[#7FFFE8]/30"],
    ["border-[#8EDFD4]", "border-[#7FFFE8]/30"],

    /**
     * Texte lisible sur dark.
     */
    ["text-[var(--erp-text)]", "text-white"],
    ["text-[#020617]", "text-white"],
    ["text-[#0F172A]", "text-white"],
    ["text-[var(--erp-text-muted)]", "text-slate-300"],
    ["text-[#475569]", "text-slate-300"],
    ["text-[#334155]", "text-slate-300"],

    /**
     * Accent PETRONAS.
     */
    ["text-[var(--erp-primary)]", "text-[#7FFFE8]"],
    ["text-[#007F6D]", "text-[#7FFFE8]"],
    ["text-[#006B5D]", "text-[#7FFFE8]"],
    ["bg-[var(--erp-primary)]", "bg-[#0EAFAA]"],
    ["hover:bg-[var(--erp-secondary)]", "hover:bg-[#0B8F86]"],
    ["hover:bg-[#006B5D]", "hover:bg-[#0B8F86]"],

    /**
     * Ombres dark.
     */
    [
      "shadow-[0_22px_70px_rgba(15,23,42,0.12)]",
      "shadow-[0_30px_90px_rgba(0,0,0,0.38)]"
    ],
    [
      "shadow-[0_18px_55px_rgba(15,23,42,0.10)]",
      "shadow-[0_26px_70px_rgba(0,0,0,0.32)]"
    ],
    [
      "shadow-[0_14px_40px_rgba(15,23,42,0.07)]",
      "shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
    ],
  ];

  for (const [from, to] of replacements) {
    next = next.replaceAll(from, to);
  }

  /**
   * Hero cockpit : noir intense + halos PETRONAS.
   */
  next = next.replaceAll(
    "bg-[radial-gradient(circle_at_85%_20%,rgba(0,166,138,0.26),transparent_32%),radial-gradient(circle_at_15%_85%,rgba(0,169,157,0.10),transparent_26%),linear-gradient(135deg,#FFFFFF_0%,#F8FCFD_50%,#DDF8F1_100%)]",
    "bg-[radial-gradient(circle_at_82%_18%,rgba(127,255,232,0.22),transparent_34%),radial-gradient(circle_at_12%_90%,rgba(14,175,170,0.14),transparent_28%),linear-gradient(135deg,#020807_0%,#061412_52%,#0B2B26_100%)]"
  );

  next = next.replaceAll(
    "bg-[radial-gradient(circle_at_top_right,rgba(0,166,138,0.22),transparent_34%),linear-gradient(135deg,#FFFFFF_0%,#F8FCFD_48%,#DDF8F1_100%)]",
    "bg-[radial-gradient(circle_at_82%_18%,rgba(127,255,232,0.22),transparent_34%),radial-gradient(circle_at_12%_90%,rgba(14,175,170,0.14),transparent_28%),linear-gradient(135deg,#020807_0%,#061412_52%,#0B2B26_100%)]"
  );

  /**
   * Boutons dashboard : vert performance + texte sombre/clair selon fond.
   */
  next = next.replaceAll(
    "bg-[#0B201D] text-white",
    "bg-[#0EAFAA] text-[#02110F]"
  );

  next = next.replaceAll(
    "bg-[#0EAFAA] text-white",
    "bg-[#0EAFAA] text-[#02110F]"
  );

  /**
   * Mais les cartes doivent rester dark, pas devenir boutons.
   * On corrige les remplacements trop larges sur les cartes principales.
   */
  next = next.replaceAll(
    "rounded-3xl border border-white/10 bg-[#0EAFAA] text-[#02110F]",
    "rounded-3xl border border-white/10 bg-[#0B201D] text-white"
  );

  next = next.replaceAll(
    "relative overflow-hidden rounded-3xl border border-white/10 bg-[#0EAFAA] text-[#02110F]",
    "relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B201D] text-white"
  );

  /**
   * Empty states / lignes internes : ne pas mettre gris.
   */
  next = next.replaceAll(
    "bg-gray-200",
    "bg-white/10"
  );

  next = next.replaceAll(
    "bg-slate-200",
    "bg-white/10"
  );

  next = next.replaceAll(
    "bg-slate-300",
    "bg-white/10"
  );

  /**
   * Badges.
   */
  next = next.replaceAll(
    "bg-[rgba(14,175,170,0.12)] text-slate-300",
    "bg-[#0EAFAA]/15 text-[#7FFFE8]"
  );

  next = next.replaceAll(
    "border-[#7FFFE8]/30 bg-[rgba(14,175,170,0.12)]",
    "border-[#7FFFE8]/30 bg-[#0EAFAA]/15"
  );

  /**
   * Nettoyage doublons.
   */
  next = next
    .replaceAll("bg-[#020807] bg-[#020807]", "bg-[#020807]")
    .replaceAll("bg-[#0B201D] bg-[#0B201D]", "bg-[#0B201D]")
    .replaceAll("text-white text-white", "text-white")
    .replaceAll("border-white/10 border-white/10", "border-white/10")
    .replaceAll("shadow-[0_30px_90px_rgba(0,0,0,0.38)] shadow-[0_30px_90px_rgba(0,0,0,0.38)]", "shadow-[0_30px_90px_rgba(0,0,0,0.38)]");

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
  patch(target, darkCockpit);
}

/**
 * Scan dashboard/cockpit/widgets.
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

      patch(relative, darkCockpit);
    }
  }
}

console.log("PASS 2N-Q8E OK: cockpit dark performance applied.");