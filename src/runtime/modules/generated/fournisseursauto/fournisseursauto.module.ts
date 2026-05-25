import type { ERPModule } from "@/runtime/modules/ERPModule";

export const fournisseursautoModule: ERPModule = {
  metadata: {
    key: "fournisseursauto",
    label: "Fournisseurs",
    description: "Fournisseurs pieces, consommables et services AMARKHYS",
    icon: "truck",
    category: "amarkhys",
    features: {
      dashboard: true,
      analytics: true,
      workflows: true,
      automation: true,
      notifications: true,
      observability: true,
      audit: true,
      realtime: true,
    },
  },

  schema: {
    collection: "fournisseursauto",
    fields: [
      {
        key: "nom",
        label: "Nom fournisseur",
        type: "text",
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 6 },
      },
      {
        key: "codeFournisseur",
        label: "Code fournisseur",
        type: "text",
        searchable: true,
        list: { order: 2 },
        grid: { cols: 3 },
      },
      {
        key: "telephone",
        label: "Telephone",
        type: "text",
        searchable: true,
        list: { order: 3 },
        grid: { cols: 3 },
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        searchable: true,
        grid: { cols: 4 },
      },
      {
        key: "adresse",
        label: "Adresse",
        type: "text",
        grid: { cols: 8 },
      },
      {
        key: "ville",
        label: "Ville",
        type: "text",
        grid: { cols: 4 },
      },
      {
        key: "typeFournisseur",
        label: "Type fournisseur",
        type: "select",
        options: [
          { label: "Pieces", value: "pieces" },
          { label: "Consommables", value: "consommables" },
          { label: "Services", value: "services" },
          { label: "Mixte", value: "mixte" },
        ],
        list: { order: 4 },
        grid: { cols: 4 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "actif",
        options: [
          { label: "Actif", value: "actif" },
          { label: "Suspendu", value: "suspendu" },
          { label: "Archive", value: "archive" },
        ],
        list: { order: 5 },
        grid: { cols: 4 },
      },
      {
        key: "notes",
        label: "Notes",
        type: "textarea",
        grid: { cols: 12 },
      },
    ],
  },

  composition: {
    // Q21X_C2B_SUPPLIER_LABEL_METADATA
    // Metadata-driven relation label:
    // used by commande.fournisseurId and every generic relation select.
    labelFields: ["nom", "codeFournisseur", "telephone"],
  },

  form: {
    layout: "tabs",
    tabs: [
      {
        key: "identite",
        label: "Identite",
        fields: [
          "nom",
          "codeFournisseur",
          "telephone",
          "email",
          "adresse",
          "ville",
          "typeFournisseur",
          "statut",
          "notes",
        ],
        sections: [
          {
            key: "general",
            title: "Informations fournisseur",
            fields: [
              "nom",
              "codeFournisseur",
              "telephone",
              "email",
              "adresse",
              "ville",
              "typeFournisseur",
              "statut",
              "notes",
            ],
          },
        ],
      },
    ],
  },
};
