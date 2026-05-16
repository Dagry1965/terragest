import type { ERPModule } from "../../ERPModule";

export const paiementsModule: ERPModule = {
  metadata: {
    key: "paiements",
    label: "Paiements",
    description: "Module ERP généré pour Paiements.",
    icon: "database",
    category: "Métier",
    routes: {
      list: "/paiements",
      create: "/paiements/nouveau",
      details: "/paiements/[id]",
      edit: "/paiements/[id]/edit",
    },
  },

  schema: {
    collection: "paiements",
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
