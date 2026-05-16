import type { ERPModule } from "../../ERPModule";

export const stocksModule: ERPModule = {
  metadata: {
    key: "stocks",
    label: "Stocks",
    description: "Module ERP gÃ©nÃ©rÃ© pour Stocks.",
    icon: "database",
    category: "MÃ©tier",
    routes: {
      list: "/stocks",
      create: "/stocks/nouveau",
      details: "/stocks/[id]",
      edit: "/stocks/[id]/edit",
    },
  },

  schema: {
    collection: "stocks",
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
