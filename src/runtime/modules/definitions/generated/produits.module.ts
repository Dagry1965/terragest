import type { ERPModule } from "../../ERPModule";

export const produitsModule: ERPModule = {
  metadata: {
    key: "produits",
    label: "Produits",
    description: "Module ERP gÃƒÂ©nÃƒÂ©rÃƒÂ© pour Produits.",
    icon: "database",
    category: "MÃƒÂ©tier",
    routes: {
      list: "/produits",
      create: "/produits/nouveau",
      details: "/produits/[id]",
      edit: "/produits/[id]/edit",
    },
  },

  schema: {
    collection: "produits",
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
