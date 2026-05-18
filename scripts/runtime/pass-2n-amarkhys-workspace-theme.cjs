const fs = require("fs");
const path = require("path");

const root = process.cwd();

function writeFile(filePath, content) {
  const absolutePath = path.join(root, filePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, "utf8");
  console.log("WRITTEN", filePath);
}

function readFile(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function writeExisting(filePath, content) {
  fs.writeFileSync(path.join(root, filePath), content, "utf8");
  console.log("UPDATED", filePath);
}

writeFile(
  "src/runtime/theme/ERPWorkspaceTheme.ts",
`export type ERPWorkspaceThemeMode =
  | "light"
  | "dark"
  | "hybrid";

export type ERPWorkspaceThemeKey =
  | "default-enterprise"
  | "amarkhys-petronas"
  | "agri-enterprise";

export interface ERPWorkspaceThemeTokens {
  key: ERPWorkspaceThemeKey;
  label: string;
  mode: ERPWorkspaceThemeMode;
  universe: string;
  description: string;

  colors: {
    background: string;
    backgroundSoft: string;
    surface: string;
    surfaceMuted: string;
    surfaceDark: string;
    border: string;
    borderStrong: string;
    text: string;
    textMuted: string;
    primary: string;
    primarySoft: string;
    secondary: string;
    accent: string;
    danger: string;
    warning: string;
    success: string;
  };

  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
  };

  shadow: {
    soft: string;
    card: string;
    cockpit: string;
  };

  gradients: {
    hero: string;
    cockpit: string;
    card: string;
    accent: string;
  };

  cssVariables: Record<string, string>;
}

export const defaultEnterpriseTheme: ERPWorkspaceThemeTokens = {
  key: "default-enterprise",
  label: "Enterprise SaaS",
  mode: "light",
  universe: "erp",
  description: "Thème ERP générique clair, neutre et professionnel.",

  colors: {
    background: "#F8FAFC",
    backgroundSoft: "#F1F5F9",
    surface: "#FFFFFF",
    surfaceMuted: "#F8FAFC",
    surfaceDark: "#0F172A",
    border: "#E2E8F0",
    borderStrong: "#CBD5E1",
    text: "#0F172A",
    textMuted: "#64748B",
    primary: "#0F766E",
    primarySoft: "#CCFBF1",
    secondary: "#0891B2",
    accent: "#10B981",
    danger: "#DC2626",
    warning: "#D97706",
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
    soft: "0 12px 30px rgba(15, 23, 42, 0.08)",
    card: "0 20px 50px rgba(15, 23, 42, 0.10)",
    cockpit: "0 30px 80px rgba(15, 23, 42, 0.18)",
  },

  gradients: {
    hero: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 45%, #ECFDF5 100%)",
    cockpit: "linear-gradient(135deg, #0F172A 0%, #111827 55%, #064E3B 100%)",
    card: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
    accent: "linear-gradient(135deg, #0F766E 0%, #0891B2 100%)",
  },

  cssVariables: {
    "--erp-bg": "#F8FAFC",
    "--erp-bg-soft": "#F1F5F9",
    "--erp-surface": "#FFFFFF",
    "--erp-surface-muted": "#F8FAFC",
    "--erp-surface-dark": "#0F172A",
    "--erp-border": "#E2E8F0",
    "--erp-border-strong": "#CBD5E1",
    "--erp-text": "#0F172A",
    "--erp-text-muted": "#64748B",
    "--erp-primary": "#0F766E",
    "--erp-primary-soft": "#CCFBF1",
    "--erp-secondary": "#0891B2",
    "--erp-accent": "#10B981",
    "--erp-danger": "#DC2626",
    "--erp-warning": "#D97706",
    "--erp-success": "#059669",
    "--erp-gradient-hero": "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 45%, #ECFDF5 100%)",
    "--erp-gradient-cockpit": "linear-gradient(135deg, #0F172A 0%, #111827 55%, #064E3B 100%)",
  },
};

export const amarkhysPetronasTheme: ERPWorkspaceThemeTokens = {
  key: "amarkhys-petronas",
  label: "AMARKHYS Garage / PETRONAS",
  mode: "hybrid",
  universe: "garage-automobile",
  description:
    "Univers garage automobile premium inspiré PETRONAS : graphite, turquoise, précision atelier et performance moteur.",

  colors: {
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
    soft: "0 14px 34px rgba(0, 161, 156, 0.10)",
    card: "0 22px 55px rgba(15, 23, 42, 0.12)",
    cockpit: "0 35px 90px rgba(0, 161, 156, 0.22)",
  },

  gradients: {
    hero: "linear-gradient(135deg, #07111F 0%, #0B2532 48%, #00A19C 135%)",
    cockpit: "radial-gradient(circle at top right, rgba(127,255,232,0.24), transparent 34%), linear-gradient(135deg, #07111F 0%, #0B1726 52%, #063B3B 100%)",
    card: "linear-gradient(135deg, #FFFFFF 0%, #F4FBFA 100%)",
    accent: "linear-gradient(135deg, #00A19C 0%, #7FFFE8 100%)",
  },

  cssVariables: {
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
  },
};

export const agriEnterpriseTheme: ERPWorkspaceThemeTokens = {
  key: "agri-enterprise",
  label: "Agri Enterprise",
  mode: "light",
  universe: "agriculture",
  description: "Univers agricole et foncier : vert naturel, terre, exploitation et suivi terrain.",

  colors: {
    background: "#F8FAF5",
    backgroundSoft: "#EFF6E8",
    surface: "#FFFFFF",
    surfaceMuted: "#F7FBF2",
    surfaceDark: "#102014",
    border: "#DDE8CE",
    borderStrong: "#B7CA99",
    text: "#172312",
    textMuted: "#68745F",
    primary: "#3F7D20",
    primarySoft: "#E8F5D8",
    secondary: "#8B5E34",
    accent: "#65A30D",
    danger: "#DC2626",
    warning: "#B45309",
    success: "#15803D",
  },

  radius: defaultEnterpriseTheme.radius,
  shadow: defaultEnterpriseTheme.shadow,

  gradients: {
    hero: "linear-gradient(135deg, #FFFFFF 0%, #F7FBF2 52%, #E8F5D8 100%)",
    cockpit: "linear-gradient(135deg, #102014 0%, #1E3A1A 55%, #3F7D20 100%)",
    card: "linear-gradient(135deg, #FFFFFF 0%, #F7FBF2 100%)",
    accent: "linear-gradient(135deg, #3F7D20 0%, #65A30D 100%)",
  },

  cssVariables: {
    "--erp-bg": "#F8FAF5",
    "--erp-bg-soft": "#EFF6E8",
    "--erp-surface": "#FFFFFF",
    "--erp-surface-muted": "#F7FBF2",
    "--erp-surface-dark": "#102014",
    "--erp-border": "#DDE8CE",
    "--erp-border-strong": "#B7CA99",
    "--erp-text": "#172312",
    "--erp-text-muted": "#68745F",
    "--erp-primary": "#3F7D20",
    "--erp-primary-soft": "#E8F5D8",
    "--erp-secondary": "#8B5E34",
    "--erp-accent": "#65A30D",
    "--erp-danger": "#DC2626",
    "--erp-warning": "#B45309",
    "--erp-success": "#15803D",
    "--erp-gradient-hero": "linear-gradient(135deg, #FFFFFF 0%, #F7FBF2 52%, #E8F5D8 100%)",
    "--erp-gradient-cockpit": "linear-gradient(135deg, #102014 0%, #1E3A1A 55%, #3F7D20 100%)",
  },
};

export const workspaceThemes: Record<ERPWorkspaceThemeKey, ERPWorkspaceThemeTokens> = {
  "default-enterprise": defaultEnterpriseTheme,
  "amarkhys-petronas": amarkhysPetronasTheme,
  "agri-enterprise": agriEnterpriseTheme,
};

export function getWorkspaceTheme(
  themeKey?: string | null
): ERPWorkspaceThemeTokens {
  if (
    themeKey &&
    themeKey in workspaceThemes
  ) {
    return workspaceThemes[themeKey as ERPWorkspaceThemeKey];
  }

  return defaultEnterpriseTheme;
}

export function getWorkspaceThemeStyle(
  themeKey?: string | null
): Record<string, string> {
  return getWorkspaceTheme(themeKey).cssVariables;
}
`
);

writeFile(
  "src/runtime/theme/index.ts",
`export * from "./ERPWorkspaceTheme";
`
);

const registryPath =
  "src/runtime/workspaces/ERPWorkspaceRegistry.ts";

if (fs.existsSync(path.join(root, registryPath))) {
  let registry = readFile(registryPath);

  registry = registry
    .replaceAll("Vue GÃ©nÃ©rale", "Vue Générale")
    .replaceAll("MatÃ©riels", "Matériels")
    .replaceAll("RÃ©coltes", "Récoltes")
    .replaceAll("matÃ©riels", "matériels")
    .replaceAll("financiÃ¨re", "financière")
    .replaceAll("DÃ©penses", "Dépenses")
    .replaceAll("ObservabilitÃ©", "Observabilité")
    .replaceAll("VÃ©hicules", "Véhicules");

  if (!registry.includes('themeKey: "amarkhys-petronas"')) {
    registry = registry.replace(
      /key:\s*"amarkhys",/,
      `key: "amarkhys",
  themeKey: "amarkhys-petronas",`
    );
  }

  if (!registry.includes('themeKey: "agri-enterprise"')) {
    registry = registry.replace(
      /key:\s*"production",/,
      `key: "production",
    themeKey: "agri-enterprise",`
    );
  }

  if (!registry.includes('themeKey: "default-enterprise"')) {
    registry = registry.replace(
      /key:\s*"general",/,
      `key: "general",
    themeKey: "default-enterprise",`
    );
  }

  writeExisting(registryPath, registry);
}

console.log("PASS 2N-O OK: AMARKHYS workspace theme installed.");