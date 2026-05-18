const fs = require("fs");
const path = require("path");

const root = process.cwd();

function write(filePath, content) {
  const absolutePath = path.join(root, filePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, "utf8");
  console.log("WRITTEN", filePath);
}

write(
  "src/runtime/workspaces/ERPWorkspaceTypes.ts",
`export type ERPWorkspaceKey =
 | "general"
 | "production"
 | "maintenance"
 | "finance"
 | "administration"
 | "supervision"
 | "amarkhys";

export type ERPWorkspaceModule = {
  key: string;
  label: string;
  description?: string;
};

export type ERPWorkspaceKpi = {
  key: string;
  label: string;
  value?: string;
  module?: string;
};

export type ERPWorkspaceQuickAction = {
  key: string;
  label: string;
  href: string;
};

export type ERPWorkspace = {
  key: ERPWorkspaceKey;
  themeKey?: string;
  label: string;
  description: string;
  defaultHref: string;
  modules: ERPWorkspaceModule[];
  kpis: ERPWorkspaceKpi[];
  quickActions: ERPWorkspaceQuickAction[];
};
`
);

write(
  "src/runtime/workspaces/ERPWorkspaceRegistry.ts",
`import type {
  ERPWorkspace,
} from "./ERPWorkspaceTypes";

export const ERPWorkspaceRegistry: ERPWorkspace[] = [
  {
    key: "general",
    themeKey: "default-enterprise",
    label: "Vue Générale",
    description: "Cockpit global Terragest",
    defaultHref: "/dashboard",

    modules: [
      {
        key: "terrains",
        label: "Terrains",
      },
      {
        key: "exploitations",
        label: "Exploitations",
      },
      {
        key: "stocks",
        label: "Stocks",
      },
      {
        key: "produits",
        label: "Produits",
      },
      {
        key: "materiels",
        label: "Matériels",
      },
      {
        key: "interventions",
        label: "Interventions",
      },
      {
        key: "paiements",
        label: "Paiements",
      },
    ],

    kpis: [
      {
        key: "production",
        label: "Production",
      },
      {
        key: "maintenance",
        label: "Maintenance",
      },
      {
        key: "finance",
        label: "Finance",
      },
    ],

    quickActions: [
      {
        key: "cockpit-amarkhys",
        label: "Cockpit AMARKHYS",
        href: "/dashboard/amarkhys",
      },
      {
        key: "new-terrain",
        label: "Nouveau terrain",
        href: "/terrains/nouveau",
      },
      {
        key: "new-exploitation",
        label: "Nouvelle exploitation",
        href: "/exploitations/nouveau",
      },
      {
        key: "new-maintenance",
        label: "Nouvelle maintenance",
        href: "/maintenance/nouveau",
      },
    ],
  },

  {
    key: "production",
    themeKey: "agri-enterprise",
    label: "Production",
    description: "Gestion de la production agricole",
    defaultHref: "/exploitations",

    modules: [
      {
        key: "campagnes",
        label: "Campagnes",
      },
      {
        key: "exploitations",
        label: "Exploitations",
      },
      {
        key: "parcelles",
        label: "Parcelles",
      },
      {
        key: "intrants",
        label: "Intrants",
      },
      {
        key: "recoltes",
        label: "Récoltes",
      },
      {
        key: "stocks",
        label: "Stocks",
      },
    ],

    kpis: [],
    quickActions: [],
  },

  {
    key: "maintenance",
    themeKey: "default-enterprise",
    label: "Maintenance",
    description: "Gestion des matériels et interventions",
    defaultHref: "/maintenance",

    modules: [
      {
        key: "materiels",
        label: "Matériels",
      },
      {
        key: "maintenance",
        label: "Maintenance",
      },
      {
        key: "interventions",
        label: "Interventions",
      },
      {
        key: "stocks",
        label: "Stocks",
      },
    ],

    kpis: [],
    quickActions: [],
  },

  {
    key: "finance",
    themeKey: "default-enterprise",
    label: "Finance",
    description: "Gestion financière et comptable",
    defaultHref: "/paiements",

    modules: [
      {
        key: "paiements",
        label: "Paiements",
      },
      {
        key: "factures",
        label: "Factures",
      },
      {
        key: "devis",
        label: "Devis",
      },
      {
        key: "depenses",
        label: "Dépenses",
      },
      {
        key: "recettes",
        label: "Recettes",
      },
    ],

    kpis: [],
    quickActions: [],
  },

  {
    key: "administration",
    themeKey: "default-enterprise",
    label: "Administration",
    description: "Administration ERP",
    defaultHref: "/admin",

    modules: [
      {
        key: "utilisateurs",
        label: "Utilisateurs",
      },
      {
        key: "workflows",
        label: "Workflows",
      },
      {
        key: "audit",
        label: "Audit",
      },
    ],

    kpis: [],
    quickActions: [],
  },

  {
    key: "supervision",
    themeKey: "default-enterprise",
    label: "Supervision",
    description: "Supervision runtime ERP",
    defaultHref: "/supervision",

    modules: [
      {
        key: "runtime",
        label: "Runtime",
      },
      {
        key: "observability",
        label: "Observabilité",
      },
    ],

    kpis: [],
    quickActions: [],
  },

  {
    key: "amarkhys",
    themeKey: "amarkhys-petronas",
    label: "AMARKHYS",
    description: "ERP automobile, atelier, CRM, stock, interventions et facturation",
    defaultHref: "/dashboard/amarkhys",

    modules: [
      {
        key: "clientsauto",
        label: "Clients",
      },
      {
        key: "vehicules",
        label: "Véhicules",
      },
      {
        key: "rendezvous",
        label: "Rendez-vous",
      },
      {
        key: "interventionsauto",
        label: "Interventions",
      },
      {
        key: "facturesauto",
        label: "Factures",
      },
      {
        key: "produitsauto",
        label: "Produits",
      },
      {
        key: "stocksauto",
        label: "Stocks",
      },
      {
        key: "rappelsauto",
        label: "Rappels",
      },
    ],

    kpis: [
      {
        key: "clients",
        label: "Clients",
      },
      {
        key: "vehicules",
        label: "Véhicules",
      },
      {
        key: "interventions",
        label: "Interventions",
      },
      {
        key: "factures",
        label: "Factures",
      },
    ],

    quickActions: [
      {
        key: "cockpit-amarkhys",
        label: "Cockpit AMARKHYS",
        href: "/dashboard/amarkhys",
      },
      {
        key: "new-client",
        label: "Nouveau client",
        href: "/clientsauto/nouveau",
      },
      {
        key: "new-rdv",
        label: "Nouveau RDV",
        href: "/rendezvous/nouveau",
      },
      {
        key: "new-intervention",
        label: "Nouvelle intervention",
        href: "/interventionsauto/nouveau",
      },
    ],
  },
];
`
);

console.log("OK: workspace registry and types cleaned.");