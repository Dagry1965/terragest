import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  interventionsautoActions,
} from "./interventionsauto.actions";

export const interventionsautoModule: ERPModule = {
  metadata: {
    key: "interventionsauto",
    label: "Interventions",
    description: "Interventions atelier AMARKHYS",
    icon: "wrench",
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
    collection: "interventionsauto",

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
        key: "rendezVousId",
        label: "Rendez-vous",
        type: "relation",
        relation: { module: "rendezvous" },
        searchable: true,
        grid: { cols: 6 },
      },
      {
        key: "dateIntervention",
        label: "Date intervention",
        type: "date",
        required: true,
        list: { order: 3 },
        grid: { cols: 6 },
      },
      {
        key: "typeIntervention",
        label: "Type intervention",
        type: "select",
        options: [
          { label: "Vidange", value: "vidange" },
          { label: "Diagnostic", value: "diagnostic" },
          { label: "Réparation", value: "reparation" },
          { label: "Pneumatiques", value: "pneumatiques" },
          { label: "Contrôle", value: "controle" },
          { label: "Autre", value: "autre" },
        ],
        grid: { cols: 6 },
      },
      {
        key: "kilometrage",
        label: "Kilométrage",
        type: "number",
        grid: { cols: 6 },
      },
      {
        key: "diagnostic",
        label: "Diagnostic",
        type: "textarea",
        grid: { cols: 12 },
      },
      {
        key: "travauxEffectues",
        label: "Travaux effectués",
        type: "textarea",
        grid: { cols: 12 },
      },
      {
        key: "coutPieces",
        label: "Coût pièces",
        type: "number",
        grid: { cols: 4 },
      },
      {
        key: "coutMainOeuvre",
        label: "Coût main d'oeuvre",
        type: "number",
        grid: { cols: 4 },
      },
      {
        key: "coutTotal",
        label: "Coût total",
        type: "number",
        grid: { cols: 4 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "ouverte",
        options: [
          { label: "Ouverte", value: "ouverte" },
          { label: "Diagnostic", value: "diagnostic" },
          { label: "En cours", value: "en_cours" },
          { label: "Terminée", value: "terminee" },
          { label: "Facturée", value: "facturee" },
          { label: "Annulée", value: "annulee" },
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
        key: "contexte",
        label: "Contexte",

        fields: [
          "clientId",
          "vehiculeId",
          "rendezVousId",
          "dateIntervention",
          "typeIntervention",
          "kilometrage",
          "statut",
        ],

        sections: [
          {
            key: "infos",
            title: "Informations intervention",
            fields: [
              "clientId",
              "vehiculeId",
              "rendezVousId",
              "dateIntervention",
              "typeIntervention",
              "kilometrage",
              "statut",
            ],
          },
        ],
      },

      {
        key: "atelier",
        label: "Atelier",

        fields: [
          "diagnostic",
          "travauxEffectues",
        ],

        sections: [
          {
            key: "travaux",
            title: "Diagnostic et travaux",
            fields: [
              "diagnostic",
              "travauxEffectues",
            ],
          },
        ],
      },

      {
        key: "couts",
        label: "Coûts",

        fields: [
          "coutPieces",
          "coutMainOeuvre",
          "coutTotal",
        ],

        sections: [
          {
            key: "financier",
            title: "Coûts intervention",
            fields: [
              "coutPieces",
              "coutMainOeuvre",
              "coutTotal",
            ],
          },
        ],
      },
    ],
  },

  actions: interventionsautoActions,

  workflows: [
    {
      key: "intervention",
      label: "Cycle intervention",
      initialState: "ouverte",

      states: [
        { key: "ouverte", label: "Ouverte", color: "default" },
        { key: "diagnostic", label: "Diagnostic", color: "warning" },
        { key: "en_cours", label: "En cours", color: "warning" },
        { key: "terminee", label: "Terminée", color: "success" },
        { key: "facturee", label: "Facturée", color: "success" },
        { key: "annulee", label: "Annulée", color: "danger" },
      ],

      transitions: [
        { from: "ouverte", to: "diagnostic", action: "Diagnostiquer" },
        { from: "diagnostic", to: "en_cours", action: "Démarrer" },
        { from: "en_cours", to: "terminee", action: "Terminer" },
        { from: "terminee", to: "facturee", action: "Facturer" },
        { from: "ouverte", to: "annulee", action: "Annuler" },
      ],
    },
  ],
};