import type { ERPModule } from "../../ERPModule";

export const campagnesModule: ERPModule = {
  metadata: {
    key: "campagnes",
    label: "Campagnes",
    description: "Module ERP généré pour Campagnes.",
    icon: "database",
    category: "Métier",
    routes: {
      list: "/campagnes",
      create: "/campagnes/nouveau",
      details: "/campagnes/[id]",
      edit: "/campagnes/[id]/edit",
    },
  },

  schema: {
    collection: "campagnes",
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
