import type { ERPModule } from "../../ERPModule";

export const commandesModule: ERPModule = {
  metadata: {
    key: "commandes",
    label: "Commandes",
    description: "Module ERP gÃ©nÃ©rÃ© pour Commandes.",
    icon: "database",
    category: "MÃ©tier",
    routes: {
      list: "/commandes",
      create: "/commandes/nouveau",
      details: "/commandes/[id]",
      edit: "/commandes/[id]/edit",
    },
  },

  schema: {
    collection: "commandes",
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
