import type { ERPModule } from "../../ERPModule";

export const culturesModule: ERPModule = {
  metadata: {
    key: "cultures",
    label: "Cultures",
    description: "Module ERP généré pour Cultures.",
    icon: "sprout",
    category: "Production",
    routes: {
      list: "/cultures",
      create: "/cultures/nouveau",
      details: "/cultures/[id]",
      edit: "/cultures/[id]/edit",
    },
  },

  schema: {
    collection: "cultures",
    fields: [
      {
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        options: [
          { label: "Actif", value: "actif" },
          { label: "Inactif", value: "inactif" },
          { label: "En attente", value: "en_attente" },
        ],
        required: true,
      },
    ],
  },

  form: {
    layout: "tabs",
    tabs: [
      {
        key: "general",
        label: "Général",
        fields: ["nom", "description", "statut"],
      },
    ],
  },
};