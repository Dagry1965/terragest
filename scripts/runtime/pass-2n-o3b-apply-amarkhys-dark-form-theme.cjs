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

/**
 * 1. Mettre AMARKHYS en vrai thème dark PETRONAS,
 * proche du site public.
 */
const themePath =
  "src/runtime/theme/ERPWorkspaceTheme.ts";

let theme = read(themePath);

theme = theme.replace(
`  colors: {
    background: "#F8FAFC",
    backgroundSoft: "#EEF7F7",
    surface: "#FFFFFF",
    surfaceMuted: "#F4FBFA",
    surfaceDark: "#07111F",
    border: "#D7E7E6",
    borderStrong: "#9DD8D3",
    text: "#0B1726",
    textMuted: "#5F7376",
    primary: "#00A19C",
    primarySoft: "#D7FFFA",
    secondary: "#7FFFE8",
    accent: "#00D6C9",
    danger: "#E11D48",
    warning: "#F59E0B",
    success: "#059669",
  },`,
`  colors: {
    background: "#020807",
    backgroundSoft: "#061412",
    surface: "#0B201D",
    surfaceMuted: "#102D28",
    surfaceDark: "#020807",
    border: "rgba(127,255,232,0.14)",
    borderStrong: "rgba(127,255,232,0.34)",
    text: "#F7FFFC",
    textMuted: "#9DB7B2",
    primary: "#0EAFAA",
    primarySoft: "rgba(14,175,170,0.14)",
    secondary: "#7FFFE8",
    accent: "#22E6D1",
    danger: "#FB7185",
    warning: "#FBBF24",
    success: "#34D399",
  },`
);

theme = theme.replace(
`  shadow: {
    soft: "0 14px 34px rgba(0, 161, 156, 0.10)",
    card: "0 22px 55px rgba(15, 23, 42, 0.12)",
    cockpit: "0 35px 90px rgba(0, 161, 156, 0.22)",
  },`,
`  shadow: {
    soft: "0 18px 45px rgba(0, 0, 0, 0.28)",
    card: "0 28px 80px rgba(0, 0, 0, 0.38)",
    cockpit: "0 40px 120px rgba(0, 161, 156, 0.22)",
  },`
);

theme = theme.replace(
`  gradients: {
    hero: "linear-gradient(135deg, #07111F 0%, #0B2532 48%, #00A19C 135%)",
    cockpit: "radial-gradient(circle at top right, rgba(127,255,232,0.24), transparent 34%), linear-gradient(135deg, #07111F 0%, #0B1726 52%, #063B3B 100%)",
    card: "linear-gradient(135deg, #FFFFFF 0%, #F4FBFA 100%)",
    accent: "linear-gradient(135deg, #00A19C 0%, #7FFFE8 100%)",
  },`,
`  gradients: {
    hero: "radial-gradient(circle at 72% 24%, rgba(14,175,170,0.18), transparent 34%), linear-gradient(135deg, #020807 0%, #061412 52%, #0B2B26 100%)",
    cockpit: "radial-gradient(circle at top right, rgba(127,255,232,0.22), transparent 34%), linear-gradient(135deg, #020807 0%, #061412 52%, #0B2B26 100%)",
    card: "linear-gradient(145deg, rgba(20,70,62,0.92) 0%, rgba(10,34,31,0.96) 100%)",
    accent: "linear-gradient(135deg, #0EAFAA 0%, #22E6D1 100%)",
  },`
);

theme = theme.replace(
`  cssVariables: {
    "--erp-bg": "#F8FAFC",
    "--erp-bg-soft": "#EEF7F7",
    "--erp-surface": "#FFFFFF",
    "--erp-surface-muted": "#F4FBFA",
    "--erp-surface-dark": "#07111F",
    "--erp-border": "#D7E7E6",
    "--erp-border-strong": "#9DD8D3",
    "--erp-text": "#0B1726",
    "--erp-text-muted": "#5F7376",
    "--erp-primary": "#00A19C",
    "--erp-primary-soft": "#D7FFFA",
    "--erp-secondary": "#7FFFE8",
    "--erp-accent": "#00D6C9",
    "--erp-danger": "#E11D48",
    "--erp-warning": "#F59E0B",
    "--erp-success": "#059669",
    "--erp-gradient-hero": "linear-gradient(135deg, #07111F 0%, #0B2532 48%, #00A19C 135%)",
    "--erp-gradient-cockpit": "radial-gradient(circle at top right, rgba(127,255,232,0.24), transparent 34%), linear-gradient(135deg, #07111F 0%, #0B1726 52%, #063B3B 100%)",
  },`,
`  cssVariables: {
    "--erp-bg": "#020807",
    "--erp-bg-soft": "#061412",
    "--erp-surface": "#0B201D",
    "--erp-surface-muted": "#102D28",
    "--erp-surface-dark": "#020807",
    "--erp-border": "rgba(127,255,232,0.14)",
    "--erp-border-strong": "rgba(127,255,232,0.34)",
    "--erp-text": "#F7FFFC",
    "--erp-text-muted": "#9DB7B2",
    "--erp-primary": "#0EAFAA",
    "--erp-primary-soft": "rgba(14,175,170,0.14)",
    "--erp-secondary": "#7FFFE8",
    "--erp-accent": "#22E6D1",
    "--erp-danger": "#FB7185",
    "--erp-warning": "#FBBF24",
    "--erp-success": "#34D399",
    "--erp-input-bg": "rgba(4, 22, 20, 0.92)",
    "--erp-card-bg": "linear-gradient(145deg, rgba(20,70,62,0.92) 0%, rgba(10,34,31,0.96) 100%)",
    "--erp-gradient-hero": "radial-gradient(circle at 72% 24%, rgba(14,175,170,0.18), transparent 34%), linear-gradient(135deg, #020807 0%, #061412 52%, #0B2B26 100%)",
    "--erp-gradient-cockpit": "radial-gradient(circle at top right, rgba(127,255,232,0.22), transparent 34%), linear-gradient(135deg, #020807 0%, #061412 52%, #0B2B26 100%)",
  },`
);

write(themePath, theme);

/**
 * 2. Formulaire enterprise : ambiance dark site public.
 */
const enterpriseFormPath =
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";

let enterpriseForm = read(enterpriseFormPath);

enterpriseForm = enterpriseForm
  .replaceAll("bg-[var(--erp-bg-soft)]", "bg-[var(--erp-bg)]")
  .replaceAll("border-[var(--erp-border)]", "border-[var(--erp-border)]")
  .replaceAll("shadow-[0_24px_70px_rgba(15,23,42,0.10)]", "shadow-[0_35px_110px_rgba(0,0,0,0.38)]");

if (!enterpriseForm.includes("bg-[image:var(--erp-gradient-hero)]")) {
  enterpriseForm = enterpriseForm.replace(
`          bg-[var(--erp-bg)]
          p-4`,
`          bg-[var(--erp-bg)]
          bg-[image:var(--erp-gradient-hero)]
          p-4`
  );
}

enterpriseForm = enterpriseForm
  .replaceAll("border-[var(--erp-border)] bg-[var(--erp-surface)]", "border-[var(--erp-border)] bg-[image:var(--erp-card-bg)]")
  .replaceAll("border-[var(--erp-border)] bg-[var(--erp-surface-muted)]", "border-[var(--erp-border)] bg-[var(--erp-primary-soft)]")
  .replaceAll("text-[var(--erp-text-muted)]", "text-[var(--erp-text-muted)]")
  .replaceAll("text-[var(--erp-text)]", "text-[var(--erp-text)]");

write(enterpriseFormPath, enterpriseForm);

/**
 * 3. Champs : inputs sombres arrondis comme le site public.
 */
const formFieldPath =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

let formField = read(formFieldPath);

formField = formField
  .replaceAll("bg-[var(--erp-surface)]", "bg-[var(--erp-input-bg)]")
  .replaceAll("border-[var(--erp-border)]", "border-[var(--erp-border)]")
  .replaceAll("text-[var(--erp-text)]", "text-[var(--erp-text)]")
  .replaceAll("text-[var(--erp-text-muted)]", "text-[var(--erp-text-muted)]")
  .replaceAll("placeholder-slate-400", "placeholder:text-[#6F8783]")
  .replaceAll("focus:border-[var(--erp-primary)]", "focus:border-[var(--erp-secondary)]")
  .replaceAll("focus:ring-[var(--erp-primary)]", "focus:ring-[var(--erp-secondary)]")
  .replaceAll("shadow-[0_10px_30px_rgba(15,23,42,0.06)]", "shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.18)]");

if (!formField.includes("focus:shadow-[0_0_0_4px_rgba(127,255,232,0.08)]")) {
  formField = formField.replaceAll(
    "transition",
    "transition focus:shadow-[0_0_0_4px_rgba(127,255,232,0.08)]"
  );
}

write(formFieldPath, formField);

/**
 * 4. Sections : cartes dark glass comme le site.
 */
const formSectionPath =
  "src/components/erp/forms/enterprise/ERPFormSection.tsx";

if (fs.existsSync(file(formSectionPath))) {
  let formSection = read(formSectionPath);

  formSection = formSection
    .replaceAll("bg-[var(--erp-surface)]", "bg-[image:var(--erp-card-bg)]")
    .replaceAll("bg-[var(--erp-surface-muted)]", "bg-[var(--erp-primary-soft)]")
    .replaceAll("border-[var(--erp-border)]", "border-[var(--erp-border)]")
    .replaceAll("shadow-[0_22px_55px_rgba(15,23,42,0.08)]", "shadow-[0_28px_90px_rgba(0,0,0,0.32)]")
    .replaceAll("text-[var(--erp-text)]", "text-[var(--erp-text)]")
    .replaceAll("text-[var(--erp-text-muted)]", "text-[var(--erp-text-muted)]");

  write(formSectionPath, formSection);
}

/**
 * 5. Tabs : boutons dark avec actif turquoise.
 */
const formTabsPath =
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx";

if (fs.existsSync(file(formTabsPath))) {
  let formTabs = read(formTabsPath);

  formTabs = formTabs
    .replaceAll("bg-[var(--erp-surface)]", "bg-[rgba(2,8,7,0.72)]")
    .replaceAll("bg-[var(--erp-primary)]", "bg-[var(--erp-primary)]")
    .replaceAll("bg-[var(--erp-primary-soft)]", "bg-[var(--erp-primary-soft)]")
    .replaceAll("border-[var(--erp-border)]", "border-[var(--erp-border)]")
    .replaceAll("border-[var(--erp-border-strong)]", "border-[var(--erp-border-strong)]")
    .replaceAll("text-[var(--erp-primary)]", "text-[var(--erp-secondary)]")
    .replaceAll("text-[var(--erp-text)]", "text-[var(--erp-text)]")
    .replaceAll("text-[var(--erp-text-muted)]", "text-[var(--erp-text-muted)]");

  write(formTabsPath, formTabs);
}

console.log("PASS 2N-O3B OK: AMARKHYS public dark premium style applied to runtime forms.");