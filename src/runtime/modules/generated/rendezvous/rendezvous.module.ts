import type { ERPModule } from "@/runtime/modules/ERPModule";

export const rendezvousModule: ERPModule = {
  metadata: {
    key: "rendezvous",
    label: "Rendez-vous",
    description: "Gestion des rendez-vous atelier AMARKHYS",
    icon: "calendar",
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
    collection: "rendezvous",

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
        required: true,
        searchable: true,
        list: { order: 2 },
        grid: { cols: 6 },
      },
      {
        key: "dateRendezVous",
        label: "Date rendez-vous",
        type: "date",
        required: true,
        list: { order: 3 },
        grid: { cols: 4 },
      },
      {
        key: "heureRendezVous",
        label: "Heure",
        type: "text",
        required: true,
        grid: { cols: 4 },
      },
      {
        key: "typeService",
        label: "Type service",
        type: "select",
        options: [
          { label: "Vidange", value: "vidange" },
          { label: "Diagnostic", value: "diagnostic" },
          { label: "Réparation", value: "reparation" },
          { label: "Contrôle", value: "controle" },
          { label: "Autre", value: "autre" },
        ],
        grid: { cols: 4 },
      },
      {
        key: "motif",
        label: "Motif",
        type: "textarea",
        grid: { cols: 12 },
      },
      {
        key: "commentaire",
        label: "Commentaire",
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
          { label: "Confirmé", value: "confirme" },
          { label: "En cours", value: "en_cours" },
          { label: "Terminé", value: "termine" },
          { label: "Facturé", value: "facture" },
          { label: "Annulé", value: "annule" },
        ],
        list: { order: 4 },
        grid: { cols: 6 },
      },
    ],
  },

  form: {
    layout: "tabs",

    tabs: [
      {
        key: "planification",
        label: "Planification",

        fields: [
          "clientId",
          "vehiculeId",
          "dateRendezVous",
          "heureRendezVous",
          "typeService",
          "statut",
        ],

        sections: [
          {
            key: "rdv",
            title: "Rendez-vous",
            fields: [
              "clientId",
              "vehiculeId",
              "dateRendezVous",
              "heureRendezVous",
              "typeService",
              "statut",
            ],
          },
        ],
      },

      {
        key: "details",
        label: "Détails",

        fields: [
          "motif",
          "commentaire",
        ],

        sections: [
          {
            key: "description",
            title: "Détails du rendez-vous",
            fields: [
              "motif",
              "commentaire",
            ],
          },
        ],
      },
    ],
  },

  workflows: [
    {
      key: "rendezvous",
      label: "Cycle rendez-vous",
      initialState: "planifie",

      states: [
        { key: "planifie", label: "Planifié", color: "default" },
        { key: "confirme", label: "Confirmé", color: "success" },
        { key: "en_cours", label: "En cours", color: "warning" },
        { key: "termine", label: "Terminé", color: "success" },
        { key: "facture", label: "Facturé", color: "default" },
        { key: "annule", label: "Annulé", color: "danger" },
      ],

      transitions: [
        { from: "planifie", to: "confirme", action: "Confirmer" },
        { from: "confirme", to: "en_cours", action: "Démarrer" },
        { from: "en_cours", to: "termine", action: "Terminer" },
        { from: "termine", to: "facture", action: "Facturer" },
        { from: "planifie", to: "annule", action: "Annuler" },
      ],
    },
  ],
};