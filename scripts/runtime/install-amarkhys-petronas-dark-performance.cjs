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
 * PASS 2N-O4
 * AMARKHYS Theme v1 — PETRONAS Dark Performance
 */

const themePath = "src/runtime/theme/ERPWorkspaceTheme.ts";

let theme = read(themePath);

/**
 * 1. Remplacer le thème amarkhys-petronas par la version Dark Performance.
 */
const amarkhysThemeRegex =
  /export const amarkhysPetronasTheme: ERPWorkspaceThemeTokens = \{[\s\S]*?\n\};\n\nexport const agriEnterpriseTheme/;

const amarkhysThemeReplacement =
`export const amarkhysPetronasTheme: ERPWorkspaceThemeTokens = {
  key: "amarkhys-petronas",
  label: "AMARKHYS / PETRONAS Dark Performance",
  mode: "dark",
  universe: "garage-automobile",
  description:
    "Thème garage automobile premium inspiré PETRONAS : graphite profond, vert pétrole, turquoise performance et cockpit atelier.",

  colors: {
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
  },

  radius: {
    sm: "0.5rem",
    md: "0.875rem",
    lg: "1.125rem",
    xl: "1.375rem",
    "2xl": "1.75rem",
    "3xl": "2.25rem",
  },

  shadow: {
    soft: "0 18px 45px rgba(0, 0, 0, 0.28)",
    card: "0 28px 80px rgba(0, 0, 0, 0.38)",
    cockpit: "0 40px 120px rgba(0, 161, 156, 0.22)",
  },

  gradients: {
    hero: "radial-gradient(circle at 72% 24%, rgba(14,175,170,0.18), transparent 34%), linear-gradient(135deg, #020807 0%, #061412 52%, #0B2B26 100%)",
    cockpit: "radial-gradient(circle at top right, rgba(127,255,232,0.22), transparent 34%), linear-gradient(135deg, #020807 0%, #061412 52%, #0B2B26 100%)",
    card: "linear-gradient(145deg, rgba(20,70,62,0.92) 0%, rgba(10,34,31,0.96) 100%)",
    accent: "linear-gradient(135deg, #0EAFAA 0%, #22E6D1 100%)",
  },

  cssVariables: {
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
  },
};

export const agriEnterpriseTheme`;

if (!amarkhysThemeRegex.test(theme)) {
  console.error("FAILED: amarkhysPetronasTheme block not found.");
  process.exit(1);
}

theme = theme.replace(amarkhysThemeRegex, amarkhysThemeReplacement);

write(themePath, theme);

/**
 * 2. Appliquer les variables du thème aux formulaires Enterprise.
 */
const enterpriseFormPath =
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";

let enterpriseForm = read(enterpriseFormPath);

if (!enterpriseForm.includes("getWorkspaceThemeStyle")) {
  enterpriseForm = enterpriseForm.replace(
`import type {
  ERPModuleAction,
} from "@/runtime/modules/ERPModule";`,
`import type {
  ERPModuleAction,
} from "@/runtime/modules/ERPModule";

import {
  getWorkspaceThemeStyle,
} from "@/runtime/theme";`
  );
}

if (!enterpriseForm.includes("function getERPEnterpriseFormThemeKey(")) {
  enterpriseForm = enterpriseForm.replace(
`interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
  initialData?: Record<string, unknown>;
  workflowActions?: ERPModuleAction[];
}`,
`interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
  initialData?: Record<string, unknown>;
  workflowActions?: ERPModuleAction[];
}

function getERPEnterpriseFormThemeKey(
  module: ERPModule
): string {
  if (
    module.metadata.category === "amarkhys" ||
    module.metadata.key.endsWith("auto")
  ) {
    return "amarkhys-petronas";
  }

  if (
    module.metadata.category === "production" ||
    module.metadata.category === "agri"
  ) {
    return "agri-enterprise";
  }

  return "default-enterprise";
}`
  );
}

if (!enterpriseForm.includes("const formThemeKey =")) {
  enterpriseForm = enterpriseForm.replace(
`    const form =
      ERPModuleBuilder.buildForm(module);`,
`    const form =
      ERPModuleBuilder.buildForm(module);

    const formThemeKey =
      getERPEnterpriseFormThemeKey(module);`
  );
}

enterpriseForm = enterpriseForm.replace(
/<form\s+ref=\{formRef\}\s+className="space-y-8"\s+onSubmit=\{handleSubmit\}\s+>/,
`<form
        ref={formRef}
        style={getWorkspaceThemeStyle(formThemeKey)}
        className="
          space-y-8
          rounded-[2rem]
          border
          border-[var(--erp-border)]
          bg-[var(--erp-bg)]
          bg-[image:var(--erp-gradient-hero)]
          p-4
          shadow-[0_35px_110px_rgba(0,0,0,0.38)]
          md:p-6
        "
        data-erp-form-theme={formThemeKey}
        onSubmit={handleSubmit}
      >`
);

enterpriseForm = enterpriseForm
  .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[image:var(--erp-card-bg)]")
  .replaceAll("border-slate-200 bg-slate-50", "border-[var(--erp-border)] bg-[var(--erp-primary-soft)]")
  .replaceAll("text-slate-950", "text-[var(--erp-text)]")
  .replaceAll("text-slate-900", "text-[var(--erp-text)]")
  .replaceAll("text-slate-700", "text-[var(--erp-text)]")
  .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
  .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]")
  .replaceAll("bg-emerald-600", "bg-[var(--erp-primary)]")
  .replaceAll("hover:bg-emerald-500", "hover:brightness-110")
  .replaceAll("border-emerald-300/30", "border-[var(--erp-border-strong)]")
  .replaceAll("bg-emerald-500/10", "bg-[var(--erp-primary-soft)]")
  .replaceAll("text-emerald-300", "text-[var(--erp-secondary)]")
  .replaceAll("text-emerald-700", "text-[var(--erp-secondary)]");

write(enterpriseFormPath, enterpriseForm);

/**
 * 3. Appliquer le style dark premium aux champs.
 */
const formFieldPath =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

let formField = read(formFieldPath);

formField = formField
  .replaceAll("border-slate-300", "border-[var(--erp-border)]")
  .replaceAll("bg-white", "bg-[var(--erp-input-bg)]")
  .replaceAll("text-slate-950", "text-[var(--erp-text)]")
  .replaceAll("text-slate-900", "text-[var(--erp-text)]")
  .replaceAll("text-slate-700", "text-[var(--erp-text)]")
  .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
  .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]")
  .replaceAll("border-emerald-200 bg-emerald-50", "border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)]")
  .replaceAll("text-emerald-700", "text-[var(--erp-secondary)]")
  .replaceAll("focus:border-emerald-500", "focus:border-[var(--erp-secondary)]")
  .replaceAll("focus:ring-emerald-500", "focus:ring-[var(--erp-secondary)]");

if (!formField.includes("focus:shadow-[0_0_0_4px_rgba(127,255,232,0.08)]")) {
  formField = formField.replaceAll(
    "transition",
    "transition focus:shadow-[0_0_0_4px_rgba(127,255,232,0.08)]"
  );
}

formField = formField.replaceAll(
  "shadow-[0_10px_30px_rgba(15,23,42,0.06)]",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.18)]"
);

write(formFieldPath, formField);

/**
 * 4. Sections.
 */
const formSectionPath =
  "src/components/erp/forms/enterprise/ERPFormSection.tsx";

if (fs.existsSync(file(formSectionPath))) {
  let formSection = read(formSectionPath);

  formSection = formSection
    .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[image:var(--erp-card-bg)]")
    .replaceAll("border-slate-200 bg-slate-50", "border-[var(--erp-border)] bg-[var(--erp-primary-soft)]")
    .replaceAll("text-slate-950", "text-[var(--erp-text)]")
    .replaceAll("text-slate-900", "text-[var(--erp-text)]")
    .replaceAll("text-slate-700", "text-[var(--erp-text)]")
    .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
    .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]")
    .replaceAll("shadow-sm", "shadow-[0_28px_90px_rgba(0,0,0,0.32)]");

  write(formSectionPath, formSection);
}

/**
 * 5. Tabs.
 */
const formTabsPath =
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx";

if (fs.existsSync(file(formTabsPath))) {
  let formTabs = read(formTabsPath);

  formTabs = formTabs
    .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[rgba(2,8,7,0.72)]")
    .replaceAll("bg-emerald-600", "bg-[var(--erp-primary)]")
    .replaceAll("bg-emerald-50", "bg-[var(--erp-primary-soft)]")
    .replaceAll("border-emerald-200", "border-[var(--erp-border-strong)]")
    .replaceAll("text-emerald-700", "text-[var(--erp-secondary)]")
    .replaceAll("text-slate-950", "text-[var(--erp-text)]")
    .replaceAll("text-slate-900", "text-[var(--erp-text)]")
    .replaceAll("text-slate-700", "text-[var(--erp-text)]")
    .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
    .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]");

  write(formTabsPath, formTabs);
}

console.log("PASS 2N-O4 OK: PETRONAS Dark Performance theme installed.");