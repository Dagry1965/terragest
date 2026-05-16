import type { ERPModule } from "../../ERPModule";

export const maintenanceModule: ERPModule = {
  metadata: {
    key: "maintenance",
    label: "Maintenance",
    description: "Module ERP gÃ©nÃ©rÃ© pour Maintenance.",
    icon: "database",
    category: "MÃ©tier",
    routes: {
      list: "/maintenance",
      create: "/maintenance/nouveau",
      details: "/maintenance/[id]",
      edit: "/maintenance/[id]/edit",
    },
  },

  schema: {
    collection: "maintenance",
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
