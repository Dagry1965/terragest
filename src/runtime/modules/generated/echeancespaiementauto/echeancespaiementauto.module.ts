import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  echeancespaiementautoActions,
} from "./echeancespaiementauto.actions";

export const echeancespaiementautoModule: ERPModule = {
  metadata: {
    key: "echeancespaiementauto",
    label: "Échéances paiement",
    description:
      "Suivi des échéances de paiement, paiements fractionnés et relances de recouvrement AMARKHYS.",
    icon: "calendar-clock",
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
    collection: "echeancespaiementauto",

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
        key: "montantPrevu",
        label: "Montant prévu",
        type: "number",
        required: true,
        list: { order: 3 },
        grid: { cols: 6 },
      },
      {
        key: "montantPaye",
        label: "Montant payé",
        type: "number",
        defaultValue: 0,
        list: { order: 4 },
        grid: { cols: 6 },
      },
      {
        key: "dateEcheance",
        label: "Date échéance",
        type: "date",
        required: true,
        list: { order: 5 },
        grid: { cols: 6 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "a_venir",
        options: [
          { label: "À venir", value: "a_venir" },
          { label: "En retard", value: "en_retard" },
          { label: "Partiellement payée", value: "partiellement_payee" },
          { label: "Payée", value: "payee" },
          { label: "Annulée", value: "annulee" },
        ],
        list: { order: 6 },
        grid: { cols: 6 },
      },
      {
        key: "canalRelance",
        label: "Canal relance",
        type: "select",
        defaultValue: "whatsapp",
        options: [
          { label: "WhatsApp", value: "whatsapp" },
          { label: "SMS", value: "sms" },
          { label: "Notification", value: "notification" },
          { label: "Téléphone", value: "telephone" },
          { label: "Email", value: "email" },
        ],
        grid: { cols: 6 },
      },
      {
        key: "dernierRappelAt",
        label: "Dernier rappel",
        type: "date",
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
        key: "echeance",
        label: "Échéance",
        fields: [
          "factureId",
          "montantPrevu",
          "montantPaye",
          "dateEcheance",
          "statut",
          "canalRelance",
        ],
        sections: [
          {
            key: "infos",
            title: "Informations échéance",
            fields: [
              "factureId",
              "montantPrevu",
              "montantPaye",
              "dateEcheance",
              "statut",
              "canalRelance",
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
        key: "relance",
        label: "Relance",
        fields: [
          "dernierRappelAt",
          "notes",
        ],
        sections: [
          {
            key: "suivi",
            title: "Suivi relance",
            fields: [
              "dernierRappelAt",
              "notes",
            ],
          },
        ],
      },
    ],
  },

  actions: echeancespaiementautoActions,

  workflows: [
    {
      key: "echeance",
      label: "Cycle échéance",
      initialState: "a_venir",

      states: [
        {
          key: "a_venir",
          label: "À venir",
          color: "warning",
        },
        {
          key: "en_retard",
          label: "En retard",
          color: "danger",
        },
        {
          key: "partiellement_payee",
          label: "Partiellement payée",
          color: "default",
        },
        {
          key: "payee",
          label: "Payée",
          color: "success",
        },
        {
          key: "annulee",
          label: "Annulée",
          color: "default",
        },
      ],

      transitions: [
        {
          from: "a_venir",
          to: "en_retard",
          action: "Marquer en retard",
        },
        {
          from: "a_venir",
          to: "payee",
          action: "Marquer payée",
        },
        {
          from: "en_retard",
          to: "payee",
          action: "Marquer payée",
        },
        {
          from: "a_venir",
          to: "annulee",
          action: "Annuler",
        },
      ],
    },
  ],
};
