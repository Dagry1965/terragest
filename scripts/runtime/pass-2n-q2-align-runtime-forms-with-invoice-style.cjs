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

function replaceIfExists(content, from, to) {
  return content.includes(from)
    ? content.replaceAll(from, to)
    : content;
}

/**
 * PASS 2N-Q2
 * Objectif :
 * Remonter le style facture AMARKHYS dans les composants runtime génériques.
 */

/**
 * 1. Thème AMARKHYS : Soft Green Backoffice renforcé.
 */
const themePath =
  "src/runtime/theme/ERPWorkspaceTheme.ts";

if (fs.existsSync(file(themePath))) {
  let theme = read(themePath);

  const regex =
    /export const amarkhysPetronasTheme: ERPWorkspaceThemeTokens = \{[\s\S]*?\n\};\n\nexport const agriEnterpriseTheme/;

  const replacement =
`export const amarkhysPetronasTheme: ERPWorkspaceThemeTokens = {
  key: "amarkhys-petronas",
  label: "AMARKHYS / Soft Green Backoffice",
  mode: "light",
  universe: "garage-automobile",
  description:
    "Thème backoffice AMARKHYS inspiré de la page facture : fond clair doux, cartes blanches, vert PETRONAS léger, tableaux lisibles et formulaires premium.",

  colors: {
    background: "#F3F8FA",
    backgroundSoft: "#EEF6F7",
    surface: "#FFFFFF",
    surfaceMuted: "#ECFDF7",
    surfaceDark: "#020617",
    border: "#D9E5EA",
    borderStrong: "#A7E4DC",
    text: "#020617",
    textMuted: "#587083",
    primary: "#009B7D",
    primarySoft: "#E6FBF4",
    secondary: "#00A99D",
    accent: "#0EA5A0",
    danger: "#E11D48",
    warning: "#F59E0B",
    success: "#059669",
  },

  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
  },

  shadow: {
    soft: "0 1px 2px rgba(15, 23, 42, 0.05)",
    card: "0 14px 40px rgba(15, 23, 42, 0.07)",
    cockpit: "0 24px 70px rgba(0, 169, 157, 0.14)",
  },

  gradients: {
    hero: "linear-gradient(135deg, #F8FBFC 0%, #EEF6F7 52%, #E6FBF4 100%)",
    cockpit: "linear-gradient(135deg, #020617 0%, #062B2A 52%, #009B7D 100%)",
    card: "linear-gradient(135deg, #FFFFFF 0%, #FBFEFD 100%)",
    accent: "linear-gradient(135deg, #009B7D 0%, #00A99D 100%)",
  },

  cssVariables: {
    "--erp-bg": "#F3F8FA",
    "--erp-bg-soft": "#EEF6F7",
    "--erp-surface": "#FFFFFF",
    "--erp-surface-muted": "#ECFDF7",
    "--erp-surface-dark": "#020617",
    "--erp-border": "#D9E5EA",
    "--erp-border-strong": "#A7E4DC",
    "--erp-text": "#020617",
    "--erp-text-muted": "#587083",
    "--erp-primary": "#009B7D",
    "--erp-primary-soft": "#E6FBF4",
    "--erp-secondary": "#00A99D",
    "--erp-accent": "#0EA5A0",
    "--erp-danger": "#E11D48",
    "--erp-warning": "#F59E0B",
    "--erp-success": "#059669",
    "--erp-input-bg": "#FFFFFF",
    "--erp-card-bg": "#FFFFFF",
    "--erp-focus-ring": "rgba(0, 169, 157, 0.12)",
    "--erp-table-head": "#020617",
    "--erp-table-head-text": "#FFFFFF",
    "--erp-gradient-hero": "linear-gradient(135deg, #F8FBFC 0%, #EEF6F7 52%, #E6FBF4 100%)",
    "--erp-gradient-cockpit": "linear-gradient(135deg, #020617 0%, #062B2A 52%, #009B7D 100%)",
  },
};

export const agriEnterpriseTheme`;

  if (regex.test(theme)) {
    theme = theme.replace(regex, replacement);
    write(themePath, theme);
  } else {
    console.log("SKIP theme block not found");
  }
}

/**
 * 2. ERPEnterpriseForm : supprimer le gros bandeau bleu et rapprocher de la facture.
 */
const formPath =
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";

if (fs.existsSync(file(formPath))) {
  let content = read(formPath);

  /**
   * Fond global du formulaire.
   */
  content = replaceIfExists(
    content,
    `bg-[image:var(--erp-gradient-hero)]`,
    `bg-[var(--erp-bg)]`
  );

  content = replaceIfExists(
    content,
    `bg-[var(--erp-bg-soft)]`,
    `bg-[var(--erp-bg)]`
  );

  content = replaceIfExists(
    content,
    `shadow-[0_35px_110px_rgba(0,0,0,0.38)]`,
    `shadow-[0_14px_40px_rgba(15,23,42,0.07)]`
  );

  /**
   * Cartes : blanc + bordure douce.
   */
  content = replaceIfExists(
    content,
    `border-[var(--erp-border)] bg-[image:var(--erp-card-bg)]`,
    `border-[var(--erp-border)] bg-[var(--erp-surface)]`
  );

  content = replaceIfExists(
    content,
    `border-[var(--erp-border)] bg-[var(--erp-primary-soft)]`,
    `border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)]`
  );

  content = replaceIfExists(
    content,
    `border-slate-200 bg-white`,
    `border-[var(--erp-border)] bg-[var(--erp-surface)]`
  );

  content = replaceIfExists(
    content,
    `border-slate-200 bg-slate-50`,
    `border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)]`
  );

  /**
   * Couleurs texte.
   */
  [
    ["text-slate-950", "text-[var(--erp-text)]"],
    ["text-slate-900", "text-[var(--erp-text)]"],
    ["text-slate-700", "text-[var(--erp-text)]"],
    ["text-slate-600", "text-[var(--erp-text-muted)]"],
    ["text-slate-500", "text-[var(--erp-text-muted)]"],
    ["text-emerald-700", "text-[var(--erp-primary)]"],
    ["text-emerald-300", "text-[var(--erp-primary)]"],
  ].forEach(([from, to]) => {
    content = replaceIfExists(content, from, to);
  });

  /**
   * Boutons.
   */
  [
    ["bg-emerald-600", "bg-[var(--erp-primary)]"],
    ["hover:bg-emerald-500", "hover:bg-[var(--erp-secondary)]"],
    ["bg-blue-600", "bg-[var(--erp-primary)]"],
    ["hover:bg-blue-500", "hover:bg-[var(--erp-secondary)]"],
    ["bg-violet-600", "bg-white border border-[var(--erp-border)] text-[var(--erp-text)]"],
    ["hover:bg-violet-500", "hover:bg-[var(--erp-primary-soft)]"],
    ["bg-purple-600", "bg-white border border-[var(--erp-border)] text-[var(--erp-text)]"],
    ["hover:bg-purple-500", "hover:bg-[var(--erp-primary-soft)]"],
  ].forEach(([from, to]) => {
    content = replaceIfExists(content, from, to);
  });

  /**
   * Bordures vertes douces.
   */
  [
    ["border-emerald-200", "border-[var(--erp-border-strong)]"],
    ["border-emerald-300/30", "border-[var(--erp-border-strong)]"],
    ["bg-emerald-50", "bg-[var(--erp-primary-soft)]"],
    ["bg-emerald-500/10", "bg-[var(--erp-primary-soft)]"],
  ].forEach(([from, to]) => {
    content = replaceIfExists(content, from, to);
  });

  /**
   * Le bandeau création bleu nuit est le plus gros écart.
   * On neutralise les classes dark/blue si présentes.
   */
  [
    ["bg-slate-950", "bg-[var(--erp-surface)]"],
    ["from-slate-950", "from-white"],
    ["via-slate-900", "via-white"],
    ["to-blue-950", "to-[var(--erp-primary-soft)]"],
    ["text-white", "text-[var(--erp-text)]"],
    ["border-white/10", "border-[var(--erp-border)]"],
  ].forEach(([from, to]) => {
    content = replaceIfExists(content, from, to);
  });

  write(formPath, content);
}

/**
 * 3. ERPFormSection : cartes comme la facture.
 */
const sectionPath =
  "src/components/erp/forms/enterprise/ERPFormSection.tsx";

if (fs.existsSync(file(sectionPath))) {
  let content = read(sectionPath);

  [
    ["bg-[image:var(--erp-card-bg)]", "bg-[var(--erp-surface)]"],
    ["bg-[var(--erp-primary-soft)]", "bg-[var(--erp-surface)]"],
    ["border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]"],
    ["border-slate-200 bg-slate-50", "border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)]"],
    ["text-slate-950", "text-[var(--erp-text)]"],
    ["text-slate-900", "text-[var(--erp-text)]"],
    ["text-slate-700", "text-[var(--erp-text)]"],
    ["text-slate-600", "text-[var(--erp-text-muted)]"],
    ["text-slate-500", "text-[var(--erp-text-muted)]"],
    ["rounded-[2rem]", "rounded-3xl"],
    ["shadow-[0_28px_90px_rgba(0,0,0,0.32)]", "shadow-[0_14px_40px_rgba(15,23,42,0.07)]"],
    ["shadow-[0_22px_55px_rgba(15,23,42,0.08)]", "shadow-[0_14px_40px_rgba(15,23,42,0.07)]"],
    ["shadow-sm", "shadow-[0_14px_40px_rgba(15,23,42,0.07)]"],
  ].forEach(([from, to]) => {
    content = replaceIfExists(content, from, to);
  });

  write(sectionPath, content);
}

/**
 * 4. ERPFormField : champs propres, focus doux.
 */
const fieldPath =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

if (fs.existsSync(file(fieldPath))) {
  let content = read(fieldPath);

  [
    ["bg-white", "bg-[var(--erp-input-bg)]"],
    ["border-slate-300", "border-[var(--erp-border)]"],
    ["focus:border-emerald-500", "focus:border-[var(--erp-primary)]"],
    ["focus:ring-emerald-500", "focus:ring-[var(--erp-primary)]"],
    ["focus:border-[var(--erp-secondary)]", "focus:border-[var(--erp-primary)]"],
    ["focus:ring-[var(--erp-secondary)]", "focus:ring-[var(--erp-primary)]"],
    ["text-slate-950", "text-[var(--erp-text)]"],
    ["text-slate-900", "text-[var(--erp-text)]"],
    ["text-slate-700", "text-[var(--erp-text)]"],
    ["text-slate-600", "text-[var(--erp-text-muted)]"],
    ["text-slate-500", "text-[var(--erp-text-muted)]"],
    ["text-emerald-700", "text-[var(--erp-primary)]"],
    ["border-emerald-200 bg-emerald-50", "border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)]"],
    ["rounded-[1.35rem]", "rounded-xl"],
    ["rounded-lg", "rounded-xl"],
    ["shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.18)]", "shadow-[0_1px_2px_rgba(15,23,42,0.05)]"],
    ["shadow-[0_10px_30px_rgba(15,23,42,0.06)]", "shadow-[0_1px_2px_rgba(15,23,42,0.05)]"],
    ["focus:shadow-[0_0_0_4px_rgba(127,255,232,0.08)]", "focus:shadow-[0_0_0_3px_var(--erp-focus-ring)]"],
  ].forEach(([from, to]) => {
    content = replaceIfExists(content, from, to);
  });

  write(fieldPath, content);
}

/**
 * 5. ERPFormTabs : onglets verts doux.
 */
const tabsPath =
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx";

if (fs.existsSync(file(tabsPath))) {
  let content = read(tabsPath);

  [
    ["bg-[rgba(2,8,7,0.72)]", "bg-[var(--erp-surface)]"],
    ["border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]"],
    ["bg-emerald-600", "bg-[var(--erp-primary)]"],
    ["bg-emerald-50", "bg-[var(--erp-primary-soft)]"],
    ["border-emerald-200", "border-[var(--erp-border-strong)]"],
    ["text-emerald-700", "text-[var(--erp-primary)]"],
    ["text-slate-950", "text-[var(--erp-text)]"],
    ["text-slate-900", "text-[var(--erp-text)]"],
    ["text-slate-700", "text-[var(--erp-text)]"],
    ["text-slate-600", "text-[var(--erp-text-muted)]"],
    ["text-slate-500", "text-[var(--erp-text-muted)]"],
    ["rounded-[1.35rem]", "rounded-xl"],
  ].forEach(([from, to]) => {
    content = replaceIfExists(content, from, to);
  });

  write(tabsPath, content);
}

/**
 * 6. Table runtime : header sombre facture.
 */
const tablePath =
  "src/components/erp/runtime/ERPRuntimeTable.tsx";

if (fs.existsSync(file(tablePath))) {
  let content = read(tablePath);

  [
    ["bg-slate-950", "bg-[var(--erp-table-head)]"],
    ["text-white", "text-[var(--erp-table-head-text)]"],
    ["border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]"],
    ["text-slate-950", "text-[var(--erp-text)]"],
    ["text-slate-900", "text-[var(--erp-text)]"],
    ["text-slate-700", "text-[var(--erp-text)]"],
    ["text-slate-600", "text-[var(--erp-text-muted)]"],
    ["text-slate-500", "text-[var(--erp-text-muted)]"],
  ].forEach(([from, to]) => {
    content = replaceIfExists(content, from, to);
  });

  write(tablePath, content);
}

console.log("PASS 2N-Q2 OK: invoice style propagated to runtime UI.");