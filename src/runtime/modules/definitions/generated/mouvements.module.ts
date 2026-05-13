import type { ERPModule } from "../../ERPModule";

export const mouvementsModule: ERPModule = {
  metadata: {
    key: "mouvements",
    label: "Mouvements",
    description: "Module ERP gÃ©nÃ©rÃ© pour Mouvements.",
    icon: "database",
    category: "MÃ©tier",
    routes: {
      list: "/mouvements",
      create: "/mouvements/nouveau",
      details: "/mouvements/[id]",
      edit: "/mouvements/[id]/edit",
    },
  },

  schema: {
    collection: "mouvements",
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
