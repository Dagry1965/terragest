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

function ensureImport(content, importBlock) {
  if (content.includes('from "@/runtime/theme"')) {
    return content;
  }

  const lines = content.split("\n");
  let lastImportIndex = -1;

  for (let index = 0; index < lines.length; index += 1) {
    if (
      lines[index].startsWith("import ") ||
      lines[index].startsWith("} from")
    ) {
      lastImportIndex = index;
    }
  }

  if (lastImportIndex === -1) {
    return importBlock + "\n\n" + content;
  }

  lines.splice(lastImportIndex + 1, 0, importBlock);
  return lines.join("\n");
}

const themeExpression =
`module.metadata.category === "amarkhys" ||
          module.metadata.key.endsWith("auto")
            ? "amarkhys-petronas"
            : module.metadata.category === "production" ||
                module.metadata.category === "agri"
              ? "agri-enterprise"
              : "default-enterprise"`;

/**
 * 1. Thème AMARKHYS Soft Green Backoffice.
 */
const themePath =
  "src/runtime/theme/ERPWorkspaceTheme.ts";

let theme = read(themePath);

const amarkhysThemeRegex =
  /export const amarkhysPetronasTheme: ERPWorkspaceThemeTokens = \{[\s\S]*?\n\};\n\nexport const agriEnterpriseTheme/;

const softGreenTheme =
`export const amarkhysPetronasTheme: ERPWorkspaceThemeTokens = {
  key: "amarkhys-petronas",
  label: "AMARKHYS / Soft Green Backoffice",
  mode: "light",
  universe: "garage-automobile",
  description:
    "Thème backoffice AMARKHYS inspiré de la page facture : fond clair doux, cartes blanches, vert PETRONAS léger, formulaires et tableaux lisibles.",

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

if (!amarkhysThemeRegex.test(theme)) {
  console.error("FAILED: amarkhysPetronasTheme block not found.");
  process.exit(1);
}

theme = theme.replace(amarkhysThemeRegex, softGreenTheme);
write(themePath, theme);

/**
 * 2. Form container.
 */
const enterpriseFormPath =
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";

if (fs.existsSync(file(enterpriseFormPath))) {
  let content = read(enterpriseFormPath);

  content = ensureImport(
    content,
`import {
  getWorkspaceThemeStyle,
} from "@/runtime/theme";`
  );

  content = content.replace(
    /style=\{getWorkspaceThemeStyle\([\s\S]*?\)\}/,
    `style={getWorkspaceThemeStyle(
          ${themeExpression}
        )}`
  );

  if (!content.includes("style={getWorkspaceThemeStyle(")) {
    content = content.replace(
      `ref={formRef}`,
      `ref={formRef}
        style={getWorkspaceThemeStyle(
          ${themeExpression}
        )}`
    );
  }

  content = content.replace(
    /data-erp-form-theme=\{[\s\S]*?\}/,
    `data-erp-form-theme={
          ${themeExpression}
        }`
  );

  if (!content.includes("data-erp-form-theme=")) {
    content = content.replace(
      `onSubmit={handleSubmit}`,
      `data-erp-form-theme={
          ${themeExpression}
        }
        onSubmit={handleSubmit}`
    );
  }

  content = content
    .replaceAll("bg-[image:var(--erp-gradient-hero)]", "bg-[var(--erp-bg)]")
    .replaceAll("bg-[var(--erp-bg-soft)]", "bg-[var(--erp-bg)]")
    .replaceAll("border-[var(--erp-border)] bg-[image:var(--erp-card-bg)]", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
    .replaceAll("border-[var(--erp-border)] bg-[var(--erp-surface-muted)]", "border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)]")
    .replaceAll("border-[var(--erp-border)] bg-[var(--erp-primary-soft)]", "border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)]")
    .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
    .replaceAll("border-slate-200 bg-slate-50", "border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)]")
    .replaceAll("text-slate-950", "text-[var(--erp-text)]")
    .replaceAll("text-slate-900", "text-[var(--erp-text)]")
    .replaceAll("text-slate-700", "text-[var(--erp-text)]")
    .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
    .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]")
    .replaceAll("text-emerald-700", "text-[var(--erp-primary)]")
    .replaceAll("text-emerald-300", "text-[var(--erp-primary)]")
    .replaceAll("bg-emerald-600", "bg-[var(--erp-primary)]")
    .replaceAll("hover:bg-emerald-500", "hover:bg-[var(--erp-secondary)]")
    .replaceAll("bg-emerald-50", "bg-[var(--erp-primary-soft)]")
    .replaceAll("border-emerald-200", "border-[var(--erp-border-strong)]")
    .replaceAll("border-emerald-300/30", "border-[var(--erp-border-strong)]")
    .replaceAll("bg-emerald-500/10", "bg-[var(--erp-primary-soft)]")
    .replaceAll("shadow-[0_35px_110px_rgba(0,0,0,0.38)]", "shadow-[0_14px_40px_rgba(15,23,42,0.07)]")
    .replaceAll("shadow-[0_8px_30px_rgba(15,23,42,0.06)]", "shadow-[0_14px_40px_rgba(15,23,42,0.07)]");

  write(enterpriseFormPath, content);
}

/**
 * 3. Fields.
 */
const fieldPath =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

if (fs.existsSync(file(fieldPath))) {
  let content = read(fieldPath);

  content = content
    .replaceAll("bg-[var(--erp-input-bg)]", "bg-[var(--erp-input-bg)]")
    .replaceAll("bg-white", "bg-[var(--erp-input-bg)]")
    .replaceAll("border-slate-300", "border-[var(--erp-border)]")
    .replaceAll("focus:border-emerald-500", "focus:border-[var(--erp-primary)]")
    .replaceAll("focus:ring-emerald-500", "focus:ring-[var(--erp-primary)]")
    .replaceAll("focus:border-[var(--erp-secondary)]", "focus:border-[var(--erp-primary)]")
    .replaceAll("focus:ring-[var(--erp-secondary)]", "focus:ring-[var(--erp-primary)]")
    .replaceAll("text-slate-950", "text-[var(--erp-text)]")
    .replaceAll("text-slate-900", "text-[var(--erp-text)]")
    .replaceAll("text-slate-700", "text-[var(--erp-text)]")
    .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
    .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]")
    .replaceAll("text-emerald-700", "text-[var(--erp-primary)]")
    .replaceAll("border-emerald-200 bg-emerald-50", "border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)]")
    .replaceAll("rounded-[1.35rem]", "rounded-xl")
    .replaceAll("rounded-lg", "rounded-xl")
    .replaceAll("shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.18)]", "shadow-[0_1px_2px_rgba(15,23,42,0.05)]")
    .replaceAll("shadow-[0_10px_30px_rgba(15,23,42,0.06)]", "shadow-[0_1px_2px_rgba(15,23,42,0.05)]")
    .replaceAll("focus:shadow-[0_0_0_4px_rgba(127,255,232,0.08)]", "focus:shadow-[0_0_0_3px_var(--erp-focus-ring)]");

  write(fieldPath, content);
}

/**
 * 4. Sections.
 */
const sectionPath =
  "src/components/erp/forms/enterprise/ERPFormSection.tsx";

if (fs.existsSync(file(sectionPath))) {
  let content = read(sectionPath);

  content = content
    .replaceAll("bg-[image:var(--erp-card-bg)]", "bg-[var(--erp-surface)]")
    .replaceAll("bg-[var(--erp-primary-soft)]", "bg-[var(--erp-primary-soft)]")
    .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
    .replaceAll("border-slate-200 bg-slate-50", "border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)]")
    .replaceAll("text-slate-950", "text-[var(--erp-text)]")
    .replaceAll("text-slate-900", "text-[var(--erp-text)]")
    .replaceAll("text-slate-700", "text-[var(--erp-text)]")
    .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
    .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]")
    .replaceAll("rounded-[2rem]", "rounded-3xl")
    .replaceAll("shadow-[0_28px_90px_rgba(0,0,0,0.32)]", "shadow-[0_14px_40px_rgba(15,23,42,0.07)]")
    .replaceAll("shadow-[0_22px_55px_rgba(15,23,42,0.08)]", "shadow-[0_14px_40px_rgba(15,23,42,0.07)]");

  write(sectionPath, content);
}

/**
 * 5. Tabs.
 */
const tabsPath =
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx";

if (fs.existsSync(file(tabsPath))) {
  let content = read(tabsPath);

  content = content
    .replaceAll("bg-[rgba(2,8,7,0.72)]", "bg-[var(--erp-surface)]")
    .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
    .replaceAll("bg-emerald-600", "bg-[var(--erp-primary)]")
    .replaceAll("bg-emerald-50", "bg-[var(--erp-primary-soft)]")
    .replaceAll("border-emerald-200", "border-[var(--erp-border-strong)]")
    .replaceAll("text-emerald-700", "text-[var(--erp-primary)]")
    .replaceAll("text-slate-950", "text-[var(--erp-text)]")
    .replaceAll("text-slate-900", "text-[var(--erp-text)]")
    .replaceAll("text-slate-700", "text-[var(--erp-text)]")
    .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
    .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]");

  write(tabsPath, content);
}

/**
 * 6. Table runtime si présente.
 */
const tablePath =
  "src/components/erp/runtime/ERPRuntimeTable.tsx";

if (fs.existsSync(file(tablePath))) {
  let content = read(tablePath);

  content = content
    .replaceAll("bg-slate-950", "bg-[var(--erp-table-head)]")
    .replaceAll("text-white", "text-[var(--erp-table-head-text)]")
    .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
    .replaceAll("text-slate-950", "text-[var(--erp-text)]")
    .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
    .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]");

  write(tablePath, content);
}

console.log("PASS 2N-Q OK: AMARKHYS Soft Green Backoffice applied.");