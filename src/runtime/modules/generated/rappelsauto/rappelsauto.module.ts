import type { ERPModule } from "@/runtime/modules/ERPModule";

export const rappelsautoModule: ERPModule = {
  metadata: {
    key: "rappelsauto",
    label: "Rappels",
    description: "Rappels clients et véhicules AMARKHYS",
    icon: "bell",
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
    collection: "rappelsauto",

    fields: [
      {
        key: "clientId",
        label: "Client",
        type: "relation",
        relation: { module: "clientsauto" },
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 6 },
      },
      {
        key: "vehiculeId",
        label: "Véhicule",
        type: "relation",
        relation: { module: "vehicules" },
        searchable: true,
        list: { order: 2 },
        grid: { cols: 6 },
      },
      {
        key: "typeRappel",
        label: "Type rappel",
        type: "select",
        required: true,
        options: [
          { label: "Vidange", value: "vidange" },
          { label: "Contrôle technique", value: "controle_technique" },
          { label: "Assurance", value: "assurance" },
          { label: "Rendez-vous", value: "rendezvous" },
          { label: "Facture impayée", value: "facture_impayee" },
          { label: "Marketing", value: "marketing" },
          { label: "Autre", value: "autre" },
        ],
        list: { order: 3 },
        grid: { cols: 6 },
      },
      {
        key: "dateRappel",
        label: "Date rappel",
        type: "date",
        required: true,
        list: { order: 4 },
        grid: { cols: 6 },
      },
      {
        key: "canal",
        label: "Canal",
        type: "select",
        defaultValue: "sms",
        options: [
          { label: "SMS", value: "sms" },
          { label: "Email", value: "email" },
          { label: "Téléphone", value: "telephone" },
          { label: "WhatsApp", value: "whatsapp" },
          { label: "Notification", value: "notification" },
        ],
        grid: { cols: 6 },
      },
      {
        key: "message",
        label: "Message",
        type: "textarea",
        grid: { cols: 12 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "planifie",
        options: [
          { label: "Planifié", value: "planifie" },
          { label: "Envoyé", value: "envoye" },
          { label: "Échoué", value: "echoue" },
          { label: "Annulé", value: "annule" },
        ],
        list: { order: 5 },
        grid: { cols: 6 },
      },
    ],
  },

  form: {
    layout: "tabs",

    tabs: [
      {
        key: "cible",
        label: "Cible",

        fields: [
          "clientId",
          "vehiculeId",
          "typeRappel",
          "dateRappel",
          "canal",
          "statut",
        ],

        sections: [
          {
            key: "infos",
            title: "Informations rappel",
            fields: [
              "clientId",
              "vehiculeId",
              "typeRappel",
              "dateRappel",
              "canal",
              "statut",
            ],
          },
        ],
      },

      {
        key: "message",
        label: "Message",

        fields: [
          "message",
        ],

        sections: [
          {
            key: "contenu",
            title: "Message",
            fields: [
              "message",
            ],
          },
        ],
      },
    ],
  },

  workflows: [
    {
      key: "rappel",
      label: "Cycle rappel",
      initialState: "planifie",

      states: [
        { key: "planifie", label: "Planifié", color: "warning" },
        { key: "envoye", label: "Envoyé", color: "success" },
        { key: "echoue", label: "Échoué", color: "danger" },
        { key: "annule", label: "Annulé", color: "default" },
      ],

      transitions: [
        { from: "planifie", to: "envoye", action: "Marquer envoyé" },
        { from: "planifie", to: "echoue", action: "Marquer échoué" },
        { from: "planifie", to: "annule", action: "Annuler" },
        { from: "echoue", to: "planifie", action: "Replanifier" },
      ],
    },
  ],
};