import type { ERPModule } from "../../ERPModule";

export const employesModule: ERPModule = {
  metadata: {
    key: "employes",
    label: "Employes",
    description: "Module ERP généré pour Employes.",
    icon: "database",
    category: "Métier",
    routes: {
      list: "/employes",
      create: "/employes/nouveau",
      details: "/employes/[id]",
      edit: "/employes/[id]/edit",
    },
  },

  schema: {
    collection: "employes",
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
