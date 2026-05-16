import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  facturesautoActions,
} from "./facturesauto.actions";

export const facturesautoModule: ERPModule = {
  metadata: {
    key: "facturesauto",
    label: "Factures",
    description: "Facturation atelier AMARKHYS",
    icon: "receipt",
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
    collection: "facturesauto",
    fields: [
      {
        key: "numeroFacture",
        label: "Numéro facture",
        type: "text",
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 4 }
      },
      {
        key: "dateFacture",
        label: "Date facture",
        type: "date",
        required: true,
        list: { order: 2 },
        grid: { cols: 4 }
      },
      {
        key: "statutPaiement",
        label: "Statut paiement",
        type: "select",
        defaultValue: "en_attente",
        options: [
          { label: "En attente", value: "en_attente" },
          { label: "Partiel", value: "partiel" },
          { label: "Payé", value: "paye" }
        ],
        grid: { cols: 4 }
      },
      {
        key: "clientId",
        label: "Client",
        type: "relation",
        relation: {
          module: "clientsauto"
        },
        searchable: true,
        grid: { cols: 6 }
      },
      {
        key: "vehiculeId",
        label: "Véhicule",
        type: "relation",
        relation: { module: "vehicules"
        },
        searchable: true,
        grid: { cols: 6 }
      },
      {
        key: "interventionId",
        label: "Intervention",
        type: "relation",
        relation: { module: "interventionsauto"
        },
        searchable: true,
        grid: { cols: 12 }
      },
      {
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        grid: { cols: 4 }
      },
      {
        key: "tva",
        label: "TVA",
        type: "number",
        defaultValue: 18,
        grid: { cols: 4 }
      },
      {
        key: "montantTTC",
        label: "Montant TTC",
        type: "number",
        computed: {
          formula: "montantHT + (montantHT * tva / 100)",
          dependsOn: ["montantHT", "tva"]
        },
        grid: { cols: 4 }
      },
      {
        key: "modePaiement",
        label: "Mode paiement",
        type: "select",
        options: [
          { label: "Espèces", value: "especes" },
          { label: "Carte", value: "carte" },
          { label: "Virement", value: "virement" },
          { label: "Mobile Money", value: "mobile_money" }
        ],
        grid: { cols: 6 }
      },
      {
        key: "observations",
        label: "Observations",
        type: "textarea",
        grid: { cols: 12 }
      }
    ]
  },

  form: {
    layout: "tabs",
    tabs: [
      {
        key: "facture",
        label: "Facture",
        fields: [
          "numeroFacture",
          "dateFacture",
          "statutPaiement",
          "modePaiement"
        ],
        sections: [
          {
            key: "infos",
            title: "Informations facture",
            fields: [
              "numeroFacture",
              "dateFacture",
              "statutPaiement",
              "modePaiement"
            ]
          }
        ]
      },

      {
        key: "relations",
        label: "Relations",
        fields: [
          "clientId",
          "vehiculeId",
          "interventionId"
        ],
        sections: [
          {
            key: "liens",
            title: "Relations métier",
            fields: [
              "clientId",
              "vehiculeId",
              "interventionId"
            ]
          }
        ]
      },

      {
        key: "finance",
        label: "Finance",
        fields: [
          "montantHT",
          "tva",
          "montantTTC"
        ],
        sections: [
          {
            key: "couts",
            title: "Montants",
            fields: [
              "montantHT",
              "tva",
              "montantTTC"
            ]
          }
        ]
      },

      {
        key: "notes",
        label: "Notes",
        fields: [
          "observations"
        ],
        sections: [
          {
            key: "obs",
            title: "Observations",
            fields: [
              "observations"
            ]
          }
        ]
      }
    ]
  },

  actions: facturesautoActions,

  workflows: [
    {
      key: "facture",
      label: "Cycle facture",
      initialState: "en_attente",
      states: [
        {
          key: "en_attente",
          label: "En attente",
          color: "warning"
        },
        {
          key: "partiel",
          label: "Paiement partiel",
          color: "default"
        },
        {
          key: "paye",
          label: "Payé",
          color: "success"
        }
      ],
      transitions: [
        {
          from: "en_attente",
          to: "partiel",
          action: "Paiement partiel"
        },
        {
          from: "partiel",
          to: "paye",
          action: "Finaliser"
        }
      ]
    }
  ]
};