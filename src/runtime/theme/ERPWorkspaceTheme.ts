export type ERPWorkspaceThemeMode =
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
