import type { ERPModule } from "../../ERPModule";

export const facturesModule: ERPModule = {
  metadata: {
    key: "factures",
    label: "Factures",
    description: "Module ERP gÃ©nÃ©rÃ© pour Factures.",
    icon: "database",
    category: "MÃ©tier",
    routes: {
      list: "/factures",
      create: "/factures/nouveau",
      details: "/factures/[id]",
      edit: "/factures/[id]/edit",
    },
  },

  schema: {
    collection: "factures",
    fields: [
      {
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        options: [
          { label: "Actif", value: "actif" },
          { label: "Inactif", value: "inactif" },
        ],
        required: true,
      },
    ],
  },
};
