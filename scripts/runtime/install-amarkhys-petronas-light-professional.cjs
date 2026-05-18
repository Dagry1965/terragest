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
  if (content.includes(importBlock.trim())) {
    return content;
  }

  if (content.includes('from "@/runtime/theme"')) {
    return content;
  }

  const lines = content.split("\n");
  let lastImportIndex = -1;

  for (let i = 0; i < lines.length; i += 1) {
    if (
      lines[i].startsWith("import ") ||
      lines[i].startsWith("} from")
    ) {
      lastImportIndex = i;
    }
  }

  if (lastImportIndex === -1) {
    return importBlock + "\n\n" + content;
  }

  lines.splice(lastImportIndex + 1, 0, importBlock);
  return lines.join("\n");
}

/**
 * 1. Installer le thème AMARKHYS Petronas Light Professional.
 */
const themePath = "src/runtime/theme/ERPWorkspaceTheme.ts";
let theme = read(themePath);

const amarkhysThemeRegex =
  /export const amarkhysPetronasTheme: ERPWorkspaceThemeTokens = \{[\s\S]*?\n\};\n\nexport const agriEnterpriseTheme/;

const replacement =
`export const amarkhysPetronasTheme: ERPWorkspaceThemeTokens = {
  key: "amarkhys-petronas",
  label: "AMARKHYS / Petronas Light Professional",
  mode: "light",
  universe: "garage-automobile",
  description:
    "Thème backoffice garage automobile clair, professionnel et premium, inspiré PETRONAS : blanc, slate, turquoise et accent doré.",

  colors: {
    background: "#F6FAFA",
    backgroundSoft: "#EEF7F5",
    surface: "#FFFFFF",
    surfaceMuted: "#F8FCFB",
    surfaceDark: "#081726",
    border: "#D9E7E5",
    borderStrong: "#A7DAD5",
    text: "#0B1726",
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
    soft: "0 10px 28px rgba(15, 23, 42, 0.06)",
    card: "0 20px 55px rgba(15, 23, 42, 0.08)",
    cockpit: "0 32px 90px rgba(0, 169, 157, 0.16)",
  },

  gradients: {
    hero: "linear-gradient(135deg, #FFFFFF 0%, #F6FAFA 48%, #E6F7F4 100%)",
    cockpit: "linear-gradient(135deg, #081726 0%, #0B2B35 52%, #00665F 100%)",
    card: "linear-gradient(135deg, #FFFFFF 0%, #F8FCFB 100%)",
    accent: "linear-gradient(135deg, #00A99D 0%, #00877E 100%)",
  },

  cssVariables: {
    "--erp-bg": "#F6FAFA",
    "--erp-bg-soft": "#EEF7F5",
    "--erp-surface": "#FFFFFF",
    "--erp-surface-muted": "#F8FCFB",
    "--erp-surface-dark": "#081726",
    "--erp-border": "#D9E7E5",
    "--erp-border-strong": "#A7DAD5",
    "--erp-text": "#0B1726",
    "--erp-text-muted": "#64748B",
    "--erp-primary": "#00A99D",
    "--erp-primary-soft": "#E6F7F4",
    "--erp-secondary": "#00877E",
    "--erp-accent": "#D97706",
    "--erp-danger": "#E11D48",
    "--erp-warning": "#EAB308",
    "--erp-success": "#00877E",
    "--erp-input-bg": "#FFFFFF",
    "--erp-card-bg": "linear-gradient(135deg, #FFFFFF 0%, #F8FCFB 100%)",
    "--erp-gradient-hero": "linear-gradient(135deg, #FFFFFF 0%, #F6FAFA 48%, #E6F7F4 100%)",
    "--erp-gradient-cockpit": "linear-gradient(135deg, #081726 0%, #0B2B35 52%, #00665F 100%)",
  },
};

export const agriEnterpriseTheme`;

if (!amarkhysThemeRegex.test(theme)) {
  console.error("FAILED: amarkhysPetronasTheme block not found.");
  process.exit(1);
}

theme = theme.replace(amarkhysThemeRegex, replacement);
write(themePath, theme);

/**
 * 2. S'assurer que le workspace AMARKHYS utilise bien ce thème.
 */
const registryPath = "src/runtime/workspaces/ERPWorkspaceRegistry.ts";

if (fs.existsSync(file(registryPath))) {
  let registry = read(registryPath);

  if (!registry.includes('themeKey: "amarkhys-petronas"')) {
    registry = registry.replace(
      `key: "amarkhys",`,
      `key: "amarkhys",
    themeKey: "amarkhys-petronas",`
    );
  }

  registry = registry
    .replaceAll("Vue GÃ©nÃ©rale", "Vue Générale")
    .replaceAll("VÃ©hicules", "Véhicules")
    .replaceAll("MatÃ©riels", "Matériels")
    .replaceAll("RÃ©coltes", "Récoltes")
    .replaceAll("DÃ©penses", "Dépenses")
    .replaceAll("ObservabilitÃ©", "Observabilité");

  write(registryPath, registry);
}

/**
 * 3. Sécuriser le type workspace.
 */
const typesPath = "src/runtime/workspaces/ERPWorkspaceTypes.ts";

if (fs.existsSync(file(typesPath))) {
  let types = read(typesPath);

  if (!types.includes("themeKey?: string;")) {
    types = types.replace(
      `export type ERPWorkspace = {
  key: ERPWorkspaceKey;`,
      `export type ERPWorkspace = {
  key: ERPWorkspaceKey;
  themeKey?: string;`
    );
  }

  write(typesPath, types);
}

/**
 * 4. Brancher les formulaires sur le thème workspace.
 */
const enterpriseFormPath =
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";

if (fs.existsSync(file(enterpriseFormPath))) {
  let form = read(enterpriseFormPath);

  form = ensureImport(
    form,
`import {
  getWorkspaceThemeStyle,
} from "@/runtime/theme";`
  );

  const themeExpression =
`module.metadata.category === "amarkhys" ||
          module.metadata.key.endsWith("auto")
            ? "amarkhys-petronas"
            : module.metadata.category === "production" ||
                module.metadata.category === "agri"
              ? "agri-enterprise"
              : "default-enterprise"`;

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
    .replaceAll("bg-[image:var(--erp-gradient-hero)]", "bg-[var(--erp-bg)]")
    .replaceAll("bg-[var(--erp-bg)]", "bg-[var(--erp-bg)]")
    .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
    .replaceAll("border-slate-200 bg-slate-50", "border-[var(--erp-border)] bg-[var(--erp-surface-muted)]")
    .replaceAll("border-[var(--erp-border)] bg-[image:var(--erp-card-bg)]", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
    .replaceAll("text-slate-950", "text-[var(--erp-text)]")
    .replaceAll("text-slate-900", "text-[var(--erp-text)]")
    .replaceAll("text-slate-700", "text-[var(--erp-text)]")
    .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
    .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]")
    .replaceAll("bg-emerald-600", "bg-[var(--erp-primary)]")
    .replaceAll("hover:bg-emerald-500", "hover:bg-[var(--erp-secondary)]")
    .replaceAll("text-emerald-700", "text-[var(--erp-secondary)]")
    .replaceAll("text-emerald-300", "text-[var(--erp-secondary)]")
    .replaceAll("border-emerald-200", "border-[var(--erp-border-strong)]")
    .replaceAll("bg-emerald-50", "bg-[var(--erp-primary-soft)]");

  write(enterpriseFormPath, form);
}

/**
 * 5. Form fields : Light Professional.
 */
const formFieldPath =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

if (fs.existsSync(file(formFieldPath))) {
  let field = read(formFieldPath);

  field = field
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
    .replaceAll("text-emerald-700", "text-[var(--erp-secondary)]")
    .replaceAll("border-emerald-200 bg-emerald-50", "border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)]")
    .replaceAll("shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.18)]", "shadow-[0_8px_24px_rgba(15,23,42,0.04)]")
    .replaceAll("focus:shadow-[0_0_0_4px_rgba(127,255,232,0.08)]", "focus:shadow-[0_0_0_4px_rgba(0,169,157,0.12)]");

  write(formFieldPath, field);
}

/**
 * 6. Sections.
 */
const sectionPath =
  "src/components/erp/forms/enterprise/ERPFormSection.tsx";

if (fs.existsSync(file(sectionPath))) {
  let section = read(sectionPath);

  section = section
    .replaceAll("bg-[image:var(--erp-card-bg)]", "bg-[var(--erp-surface)]")
    .replaceAll("border-slate-200 bg-white", "border-[var(--erp-border)] bg-[var(--erp-surface)]")
    .replaceAll("border-slate-200 bg-slate-50", "border-[var(--erp-border)] bg-[var(--erp-surface-muted)]")
    .replaceAll("text-slate-950", "text-[var(--erp-text)]")
    .replaceAll("text-slate-900", "text-[var(--erp-text)]")
    .replaceAll("text-slate-700", "text-[var(--erp-text)]")
    .replaceAll("text-slate-600", "text-[var(--erp-text-muted)]")
    .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]")
    .replaceAll("shadow-[0_28px_90px_rgba(0,0,0,0.32)]", "shadow-[0_20px_55px_rgba(15,23,42,0.08)]");

  write(sectionPath, section);
}

/**
 * 7. Tabs.
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
    .replaceAll("text-slate-500", "text-[var(--erp-text-muted)]");

  write(tabsPath, tabs);
}

console.log("PASS 2N-O5 OK: AMARKHYS Petronas Light Professional installed.");
