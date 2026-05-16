import type { ERPModule } from "../../ERPModule";

export const facturesModule: ERPModule = {
  metadata: {
    key: "factures",
    label: "Factures",
    description: "Module ERP généré pour Factures.",
    icon: "database",
    category: "Métier",
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
