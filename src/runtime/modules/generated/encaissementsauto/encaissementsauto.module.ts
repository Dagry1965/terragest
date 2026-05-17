import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  encaissementsautoActions,
} from "./encaissementsauto.actions";

export const encaissementsautoModule: ERPModule = {
  metadata: {
    key: "encaissementsauto",
    label: "Encaissements",
    description:
      "Suivi des paiements clients, paiements partiels et encaissements AMARKHYS.",
    icon: "wallet",
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
    collection: "encaissementsauto",

    fields: [
      {
        key: "factureId",
        label: "Facture",
        type: "relation",
        relation: {
          module: "facturesauto",
        },
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 6 },
      },
      {
        key: "clientId",
        label: "Client",
        type: "relation",
        relation: {
          module: "clientsauto",
        },
        searchable: true,
        list: { order: 2 },
        grid: { cols: 6 },
      },
      {
        key: "vehiculeId",
        label: "Véhicule",
        type: "relation",
        relation: {
          module: "vehicules",
        },
        searchable: true,
        grid: { cols: 6 },
      },
      {
        key: "montant",
        label: "Montant encaissé",
        type: "number",
        required: true,
        list: { order: 3 },
        grid: { cols: 6 },
      },
      {
        key: "datePaiement",
        label: "Date paiement",
        type: "date",
        required: true,
        list: { order: 4 },
        grid: { cols: 6 },
      },
      {
        key: "modePaiement",
        label: "Mode paiement",
        type: "select",
        defaultValue: "mobile_money",
        options: [
          { label: "Espèces", value: "especes" },
          { label: "Mobile Money", value: "mobile_money" },
          { label: "Carte", value: "carte" },
          { label: "Virement", value: "virement" },
          { label: "Chèque", value: "cheque" },
          { label: "Autre", value: "autre" },
        ],
        list: { order: 5 },
        grid: { cols: 6 },
      },
      {
        key: "referenceTransaction",
        label: "Référence transaction",
        type: "text",
        searchable: true,
        grid: { cols: 6 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "valide",
        options: [
          { label: "En attente", value: "en_attente" },
          { label: "Validé", value: "valide" },
          { label: "Rejeté", value: "rejete" },
          { label: "Annulé", value: "annule" },
        ],
        list: { order: 6 },
        grid: { cols: 6 },
      },
      {
        key: "notes",
        label: "Notes",
        type: "textarea",
        grid: { cols: 12 },
      },
    ],
  },

  form: {
    layout: "tabs",

    tabs: [
      {
        key: "paiement",
        label: "Paiement",
        fields: [
          "factureId",
          "montant",
          "datePaiement",
          "modePaiement",
          "referenceTransaction",
          "statut",
        ],
        sections: [
          {
            key: "infos",
            title: "Informations paiement",
            fields: [
              "factureId",
              "montant",
              "datePaiement",
              "modePaiement",
              "referenceTransaction",
              "statut",
            ],
          },
        ],
      },
      {
        key: "relations",
        label: "Relations",
        fields: [
          "clientId",
          "vehiculeId",
        ],
        sections: [
          {
            key: "liens",
            title: "Relations métier",
            fields: [
              "clientId",
              "vehiculeId",
            ],
          },
        ],
      },
      {
        key: "notes",
        label: "Notes",
        fields: [
          "notes",
        ],
        sections: [
          {
            key: "observations",
            title: "Observations",
            fields: [
              "notes",
            ],
          },
        ],
      },
    ],
  },

  actions: encaissementsautoActions,

  workflows: [
    {
      key: "encaissement",
      label: "Cycle encaissement",
      initialState: "en_attente",

      states: [
        {
          key: "en_attente",
          label: "En attente",
          color: "warning",
        },
        {
          key: "valide",
          label: "Validé",
          color: "success",
        },
        {
          key: "rejete",
          label: "Rejeté",
          color: "danger",
        },
        {
          key: "annule",
          label: "Annulé",
          color: "default",
        },
      ],

      transitions: [
        {
          from: "en_attente",
          to: "valide",
          action: "Valider",
        },
        {
          from: "en_attente",
          to: "rejete",
          action: "Rejeter",
        },
        {
          from: "en_attente",
          to: "annule",
          action: "Annuler",
        },
      ],
    },
  ],
};
