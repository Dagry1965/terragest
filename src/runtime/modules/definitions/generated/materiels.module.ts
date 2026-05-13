import type { ERPModule } from "../../ERPModule";

export const materielsModule: ERPModule = {
  metadata: {
    key: "materiels",
    label: "Materiels",
    description: "Module ERP gÃ©nÃ©rÃ© pour Materiels.",
    icon: "database",
    category: "MÃ©tier",
    routes: {
      list: "/materiels",
      create: "/materiels/nouveau",
      details: "/materiels/[id]",
      edit: "/materiels/[id]/edit",
    },
  },

  schema: {
    collection: "materiels",
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
