import type { ERPModule } from "../../ERPModule";

export const livraisonsModule: ERPModule = {
  metadata: {
    key: "livraisons",
    label: "Livraisons",
    description: "Module ERP gÃƒÂ©nÃƒÂ©rÃƒÂ© pour Livraisons.",
    icon: "database",
    category: "MÃƒÂ©tier",
    routes: {
      list: "/livraisons",
      create: "/livraisons/nouveau",
      details: "/livraisons/[id]",
      edit: "/livraisons/[id]/edit",
    },
  },

  schema: {
    collection: "livraisons",
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
