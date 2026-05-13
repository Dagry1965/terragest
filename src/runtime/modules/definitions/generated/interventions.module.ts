import type { ERPModule } from "../../ERPModule";

export const interventionsModule: ERPModule = {
  metadata: {
    key: "interventions",
    label: "Interventions",
    description: "Module ERP gÃ©nÃ©rÃ© pour Interventions.",
    icon: "database",
    category: "MÃ©tier",
    routes: {
      list: "/interventions",
      create: "/interventions/nouveau",
      details: "/interventions/[id]",
      edit: "/interventions/[id]/edit",
    },
  },

  schema: {
    collection: "interventions",
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
