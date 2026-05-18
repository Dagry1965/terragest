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
 * 1. Revenir à un thème AMARKHYS Light Professional compatible TailAdmin.
 */
const themePath =
  "src/runtime/theme/ERPWorkspaceTheme.ts";

let theme = read(themePath);

const amarkhysThemeRegex =
  /export const amarkhysPetronasTheme: ERPWorkspaceThemeTokens = \{[\s\S]*?\n\};\n\nexport const agriEnterpriseTheme/;

const amarkhysTheme =
`export const amarkhysPetronasTheme: ERPWorkspaceThemeTokens = {
  key: "amarkhys-petronas",
  label: "AMARKHYS / Petronas Light Professional",
  mode: "light",
  universe: "garage-automobile",
  description:
    "Thème backoffice garage automobile clair, professionnel et premium, inspiré PETRONAS et TailAdmin.",

  colors: {
    background: "#F6FAFA",
    backgroundSoft: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceMuted: "#F8FCFB",
    surfaceDark: "#081726",
    border: "#E5E7EB",
    borderStrong: "#A7DAD5",
    text: "#111827",
    textMuted: "#64748B",
    primary: "#00A99D",
    primarySoft: "#E6F7F4",
    secondary: "#00877E",
    accent: "#D97706",
    danger: "#E11D48",
    warning: "#EAB308",
    success: "#00877E",
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
    card: "0 8px 30px rgba(15, 23, 42, 0.06)",
    cockpit: "0 24px 70px rgba(0, 169, 157, 0.14)",
  },

  gradients: {
    hero: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 52%, #E6F7F4 100%)",
    cockpit: "linear-gradient(135deg, #081726 0%, #0B2B35 52%, #00665F 100%)",
    card: "linear-gradient(135deg, #FFFFFF 0%, #F8FCFB 100%)",
    accent: "linear-gradient(135deg, #00A99D 0%, #00877E 100%)",
  },

  cssVariables: {
    "--erp-bg": "#F6FAFA",
    "--erp-bg-soft": "#F8FAFC",
    "--erp-surface": "#FFFFFF",
    "--erp-surface-muted": "#F8FCFB",
    "--erp-surface-dark": "#081726",
    "--erp-border": "#E5E7EB",
    "--erp-border-strong": "#A7DAD5",
    "--erp-text": "#111827",
    "--erp-text-muted": "#64748B",
    "--erp-primary": "#00A99D",
    "--erp-primary-soft": "#E6F7F4",
    "--erp-secondary": "#00877E",
    "--erp-accent": "#D97706",
    "--erp-danger": "#E11D48",
    "--erp-warning": "#EAB308",
    "--erp-success": "#00877E",
    "--erp-input-bg": "#FFFFFF",
    "--erp-card-bg": "#FFFFFF",
    "--erp-focus-ring": "rgba(0,169,157,0.12)",
    "--erp-gradient-hero": "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 52%, #E6F7F4 100%)",
    "--erp-gradient-cockpit": "linear-gradient(135deg, #081726 0%, #0B2B35 52%, #00665F 100%)",
  },
};

export const agriEnterpriseTheme`;

if (!amarkhysThemeRegex.test(theme)) {
  console.error("FAILED: amarkhysPetronasTheme block not found.");
  process.exit(1);
}

theme = theme.replace(amarkhysThemeRegex, amarkhysTheme);
write(themePath, theme);

/**
 * 2. ERPEnterpriseForm : wrapper backoffice clair TailAdmin-like.
 */
const enterpriseFormPath =
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";

let form = read(enterpriseFormPath);

form = ensureImport(
  form,
`import {
  getWorkspaceThemeStyle,
} from "@/runtime/theme";`
);

form = form.replace(
  /style=\{getWorkspaceThemeStyle\([\s\S]*?\)\}/,
  `style={getWorkspaceThemeStyle(
          ${themeExpression}
        )}`
);

if (!form.includes("style={getWorkspaceThemeStyle(")) {
  form = form.replace(
    `ref={formRef}`,
    `ref={formRef}
        style={getWorkspaceThemeStyle(
          ${themeExpression}
        )}`
  );
}

form = form.replace(
  /data-erp-form-theme=\{[\s\S]*?\}/,
  `data-erp-form-theme={
          ${themeExpression}
        }`
);

if (!form.includes("data-erp-form-theme=")) {
  form = form.replace(
    `onSubmit={handleSubmit}`,
    `data-erp-form-theme={
          ${themeExpression}
        }
        onSubmit={handleSubmit}`
  );
}

form = form
  .replaceAll("bg-[image:var(--erp-gradient-hero)]", "bg-[var(--erp-bg-soft)]")
  .replaceAll("bg-[var(--erp-bg)]", "bg-[var(--erp-bg-soft)]")
  .replaceAll("border-[var(--erp-border)] bg-[image:var(--erp-card-bg)]", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
  .replaceAll("border-[var(--erp-border)] bg-[var(--erp-primary-soft)]", "border-[var(--erp-border)] bg-[var(--erp-surface-muted)]")
  .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
  .replaceAll("border-slate-200 bg-slate-50", "border-[var(--erp-border)] bg-[var(--erp-surface-muted)]")
  .replaceAll("text-slate-950", "text-[var(--erp-text)]")
  .replaceAll("text-slate-900", "text-[var(--erp-text)]")
  .replaceAll("text-slate-700", "text-[var(--erp-text)]")
  .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
  .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]")
  .replaceAll("text-emerald-700", "text-[var(--erp-secondary)]")
  .replaceAll("text-emerald-300", "text-[var(--erp-secondary)]")
  .replaceAll("bg-emerald-600", "bg-[var(--erp-primary)]")
  .replaceAll("hover:bg-emerald-500", "hover:bg-[var(--erp-secondary)]")
  .replaceAll("border-emerald-200", "border-[var(--erp-border-strong)]")
  .replaceAll("bg-emerald-50", "bg-[var(--erp-primary-soft)]")
  .replaceAll("shadow-[0_35px_110px_rgba(0,0,0,0.38)]", "shadow-[0_8px_30px_rgba(15,23,42,0.06)]")
  .replaceAll("rounded-[2rem]", "rounded-2xl");

write(enterpriseFormPath, form);

/**
 * 3. ERPFormField : champs TailAdmin h-11 / rounded-lg / focus ring.
 */
const fieldPath =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

let field = read(fieldPath);

field = field
  .replaceAll("bg-[var(--erp-input-bg)]", "bg-[var(--erp-input-bg)]")
  .replaceAll("bg-white", "bg-[var(--erp-input-bg)]")
  .replaceAll("border-slate-300", "border-[var(--erp-border)]")
  .replaceAll("border-[var(--erp-border)]", "border-[var(--erp-border)]")
  .replaceAll("text-slate-950", "text-[var(--erp-text)]")
  .replaceAll("text-slate-900", "text-[var(--erp-text)]")
  .replaceAll("text-slate-700", "text-[var(--erp-text)]")
  .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
  .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]")
  .replaceAll("text-emerald-700", "text-[var(--erp-secondary)]")
  .replaceAll("focus:border-emerald-500", "focus:border-[var(--erp-primary)]")
  .replaceAll("focus:ring-emerald-500", "focus:ring-[var(--erp-primary)]")
  .replaceAll("focus:border-[var(--erp-secondary)]", "focus:border-[var(--erp-primary)]")
  .replaceAll("focus:ring-[var(--erp-secondary)]", "focus:ring-[var(--erp-primary)]")
  .replaceAll("rounded-[1.35rem]", "rounded-lg")
  .replaceAll("rounded-2xl", "rounded-lg")
  .replaceAll("py-3", "py-2.5")
  .replaceAll("shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.18)]", "shadow-[0_1px_2px_rgba(15,23,42,0.05)]")
  .replaceAll("shadow-[0_10px_30px_rgba(15,23,42,0.06)]", "shadow-[0_1px_2px_rgba(15,23,42,0.05)]")
  .replaceAll("focus:shadow-[0_0_0_4px_rgba(127,255,232,0.08)]", "focus:shadow-[0_0_0_3px_var(--erp-focus-ring)]");

field = field
  .replaceAll("Relation mÃ©tier sÃ©lectionnÃ©e", "Relation métier sélectionnée")
  .replaceAll("Aucune relation renseignÃ©e", "Aucune relation renseignée")
  .replaceAll("Relation mÃ©tier verrouillÃ©e", "Relation métier verrouillée")
  .replaceAll("SÃ©lectionner", "Sélectionner")
  .replaceAll("â€¢", "•");

write(fieldPath, field);

/**
 * 4. ERPFormSection : cartes TailAdmin.
 */
const sectionPath =
  "src/components/erp/forms/enterprise/ERPFormSection.tsx";

if (fs.existsSync(file(sectionPath))) {
  let section = read(sectionPath);

  section = section
    .replaceAll("bg-[image:var(--erp-card-bg)]", "bg-[var(--erp-surface)]")
    .replaceAll("bg-[var(--erp-primary-soft)]", "bg-[var(--erp-surface-muted)]")
    .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
    .replaceAll("border-slate-200 bg-slate-50", "border-[var(--erp-border)] bg-[var(--erp-surface-muted)]")
    .replaceAll("text-slate-950", "text-[var(--erp-text)]")
    .replaceAll("text-slate-900", "text-[var(--erp-text)]")
    .replaceAll("text-slate-700", "text-[var(--erp-text)]")
    .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
    .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]")
    .replaceAll("rounded-[2rem]", "rounded-2xl")
    .replaceAll("rounded-3xl", "rounded-2xl")
    .replaceAll("shadow-[0_28px_90px_rgba(0,0,0,0.32)]", "shadow-[0_8px_30px_rgba(15,23,42,0.06)]")
    .replaceAll("shadow-[0_22px_55px_rgba(15,23,42,0.08)]", "shadow-[0_8px_30px_rgba(15,23,42,0.06)]");

  write(sectionPath, section);
}

/**
 * 5. ERPFormTabs : tabs backoffice.
 */
const tabsPath =
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx";

if (fs.existsSync(file(tabsPath))) {
  let tabs = read(tabsPath);

  tabs = tabs
    .replaceAll("bg-[rgba(2,8,7,0.72)]", "bg-[var(--erp-surface)]")
    .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
    .replaceAll("bg-emerald-600", "bg-[var(--erp-primary)]")
    .replaceAll("bg-emerald-50", "bg-[var(--erp-primary-soft)]")
    .replaceAll("border-emerald-200", "border-[var(--erp-border-strong)]")
    .replaceAll("text-emerald-700", "text-[var(--erp-secondary)]")
    .replaceAll("text-slate-950", "text-[var(--erp-text)]")
    .replaceAll("text-slate-900", "text-[var(--erp-text)]")
    .replaceAll("text-slate-700", "text-[var(--erp-text)]")
    .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
    .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]")
    .replaceAll("rounded-[1.35rem]", "rounded-lg")
    .replaceAll("rounded-[2rem]", "rounded-2xl")
    .replaceAll("rounded-3xl", "rounded-2xl");

  write(tabsPath, tabs);
}

console.log("PASS 2N-P2 OK: TailAdmin design language applied to runtime forms.");