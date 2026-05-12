import type { ERPModule } from "../ERPModule";

type BusinessModuleOptions = {
  key: string;
  label: string;
  description?: string;
  category?: string;
  icon?: string;
  fields?: any[];
};

export function createBusinessModule(
  options: BusinessModuleOptions
): ERPModule {

  const key =
    options.key;

  const label =
    options.label;

  return {

    metadata: {
      key,
      label,

      description:
        options.description ??
        `Module ERP ${label}.`,

      icon:
        options.icon ??
        "package",

      category:
        options.category ??
        "Metier",

      enabled: true,
      visible: true,

      routes: {
        list: `/${key}`,
        create: `/${key}/nouveau`,
        details: `/${key}`,
        edit: `/${key}`,
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    permissions: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },

    persistence: {
      firestore: true,
      timestamps: true,
      softDelete: true,
    },

    schema: {
      module: key,

      collection: key,

      timestamps: true,

      softDelete: true,

      fields:
        options.fields ??
        [
          {
            key: "nom",
            label: "Nom",
            type: "text",
            required: true,
            searchable: true,
            sortable: true,
          },

          {
            key: "statut",
            label: "Statut",
            type: "status",
            required: true,
            filterable: true,
          },
        ],
    },

    actions: [
      {
        key: "create",
        label: "Créer",
        type: "primary",
        href: `/${key}/nouveau`,
        event: `${key.toUpperCase()}_CREATED`,
      },

      {
        key: "edit",
        label: "Modifier",
        type: "secondary",
        event: `${key.toUpperCase()}_UPDATED`,
      },

      {
        key: "archive",
        label: "Archiver",
        type: "danger",
        event: `${key.toUpperCase()}_ARCHIVED`,
      },
    ],

    workflows: [
      {
        key: `create-${key}`,

        label:
          `Création ${label}`,

        initialState: "draft",

        states: [
          "draft",
          "validated",
          "active",
          "archived",
        ],
      },
    ],
  };
}