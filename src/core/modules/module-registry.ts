export type ERPModuleGroup =
  | "Pilotage"
  | "MÃ©tier"
  | "OpÃ©rations"
  | "Finance"
  | "SystÃ¨me";

export type ERPModuleFeature = {
  workflow?: boolean;
  audit?: boolean;
  supervision?: boolean;
  notifications?: boolean;
};

export type ERPModule = {
  key: string;
  label: string;
  pluralLabel: string;
  description?: string;
  group: ERPModuleGroup;
  enabled: boolean;
  routes: {
    list: string;
    create: string;
    details: (id: string) => string;
    edit: (id: string) => string;
  };
  permissions?: string[];
  features?: ERPModuleFeature;
};

export const moduleRegistry: ERPModule[] = [
  {
    key: "exploitations",
    label: "Exploitation",
    pluralLabel: "Exploitations",
    group: "MÃ©tier",
    enabled: true,
    description: "Gestion des exploitations agricoles et patrimoniales.",
    routes: {
      list: "/exploitations",
      create: "/exploitations/nouveau",
      details: (id) => `/exploitations/${id}`,
      edit: (id) => `/exploitations/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
      supervision: true,
    },
  },
  {
    key: "terrains",
    label: "Terrain",
    pluralLabel: "Terrains",
    group: "MÃ©tier",
    enabled: true,
    description: "Gestion des terrains rattachÃ©s aux exploitations.",
    routes: {
      list: "/terrains",
      create: "/terrains/nouveau",
      details: (id) => `/terrains/${id}`,
      edit: (id) => `/terrains/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
    },
  },
  {
    key: "produits",
    label: "Produit",
    pluralLabel: "Produits",
    group: "MÃ©tier",
    enabled: true,
    description: "Gestion des produits agricoles, animaux et intrants.",
    routes: {
      list: "/produits",
      create: "/produits/nouveau",
      details: (id) => `/produits/${id}`,
      edit: (id) => `/produits/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
    },
  },
  {
    key: "stocks",
    label: "Stock",
    pluralLabel: "Stocks",
    group: "OpÃ©rations",
    enabled: true,
    description: "Suivi des stocks, entrÃ©es, sorties et mouvements.",
    routes: {
      list: "/stocks",
      create: "/stocks/nouveau",
      details: (id) => `/stocks/${id}`,
      edit: (id) => `/stocks/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
      supervision: true,
      notifications: true,
    },
  },
  {
    key: "materiels",
    label: "MatÃ©riel",
    pluralLabel: "MatÃ©riels",
    group: "OpÃ©rations",
    enabled: true,
    description: "Gestion des matÃ©riels, Ã©tats, affectations et pannes.",
    routes: {
      list: "/materiels",
      create: "/materiels/nouveau",
      details: (id) => `/materiels/${id}`,
      edit: (id) => `/materiels/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
      supervision: true,
      notifications: true,
    },
  },
  {
    key: "interventions",
    label: "Intervention",
    pluralLabel: "Interventions",
    group: "OpÃ©rations",
    enabled: true,
    description: "Suivi des interventions terrain et maintenance.",
    routes: {
      list: "/interventions",
      create: "/interventions/nouveau",
      details: (id) => `/interventions/${id}`,
      edit: (id) => `/interventions/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
      supervision: true,
    },
  },
  {
    key: "contrats",
    label: "Contrat",
    pluralLabel: "Contrats",
    group: "Finance",
    enabled: true,
    description: "Gestion des contrats, Ã©chÃ©ances et engagements.",
    routes: {
      list: "/contrats",
      create: "/contrats/nouveau",
      details: (id) => `/contrats/${id}`,
      edit: (id) => `/contrats/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
      notifications: true,
    },
  },
  {
    key: "paiements",
    label: "Paiement",
    pluralLabel: "Paiements",
    group: "Finance",
    enabled: true,
    description: "Suivi des paiements, dÃ©penses et revenus.",
    routes: {
      list: "/paiements",
      create: "/paiements/nouveau",
      details: (id) => `/paiements/${id}`,
      edit: (id) => `/paiements/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
      supervision: true,
    },
  },
];

export function getEnabledModules() {
  return moduleRegistry.filter((module) => module.enabled);
}

export function getModuleByKey(key: string) {
  return moduleRegistry.find((module) => module.key === key);
}
