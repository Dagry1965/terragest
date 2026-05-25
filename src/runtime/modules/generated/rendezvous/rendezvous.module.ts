import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  rendezvousActions,
} from "./rendezvous.actions";

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
        list: { visible: true, order: 1 },
        grid: { cols: 6 },
      },
{
        key: "vehiculeId",
        label: "Véhicule",
        type: "relation",
        relation: {
          module: "vehicules",
          filterBy: {
            sourceField: "clientId",
            targetField: "clientId",
            includeEmptyTarget: true,
          },
        },
        required: true,
        searchable: true,
        list: { visible: true, order: 2 },
        grid: { cols: 6 },
      },
{
        key: "dateRendezVous",
        label: "Date rendez-vous",
        type: "date",
        required: true,
        list: { visible: true, order: 3 },
        grid: { cols: 4 },
      },
{
        key: "heureRendezVous",
        label: "Heure",
        type: "text",
        required: true,
        list: { visible: true, order: 4 },
        grid: { cols: 4 },
      },
{
        key: "durationMinutes",
        label: "Durée prévue",
        type: "number",
        defaultValue: 60,
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "startAt",
        label: "Début créneau",
        type: "text",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "endAt",
        label: "Fin créneau",
        type: "text",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "consumedByInterventionId",
        label: "Intervention liée",
        type: "relation",
        relation: { module: "interventionsauto" },
        searchable: true,
        list: { visible: false },
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
        list: { visible: true, order: 5 },
        grid: { cols: 4 },
      },
{
        key: "motif",
        label: "Motif",
        type: "textarea",
        list: { visible: false },
        grid: { cols: 12 },
      },
{
        key: "commentaire",
        label: "Commentaire",
        type: "textarea",
        list: { visible: false },
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
        list: { visible: true, order: 6 },
        grid: { cols: 6 },
      }
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
          "durationMinutes",
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
              "durationMinutes",
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

  actions: rendezvousActions,

  scheduling: {
    // Q22D3A_RENDEZVOUS_SCHEDULING_METADATA
    // First consumer of the generic ERP Scheduling Runtime.
    enabled: true,
    dateField: "dateRendezVous",
    timeField: "heureRendezVous",
    durationField: "durationMinutes",
    startField: "startAt",
    endField: "endAt",
    statusField: "statut",
    resourceField: "vehiculeId",
    blockingStatuses: ["planifie", "confirme", "en_cours"],
    bufferMinutes: 15,
  },
  composition: {
    // Q21E_D_APPOINTMENT_RELATIONSHIP_COMPOSITION
    // Rendez-vous knows its client, vehicle and generated intervention.
    labelFields: ["clientId", "vehiculeId", "dateRendezVous", "heureRendezVous", "typeService", "statut"],

    contextBanner: {
      title: "Contexte rendez-vous",
      items: [
        {
          relationField: "clientId",
          moduleKey: "clientsauto",
          labelFields: ["prenom", "nom", "telephone"],
          tone: "client",
        },
        {
          relationField: "vehiculeId",
          moduleKey: "vehicules",
          labelFields: ["marque", "modele", "immatriculation"],
          tone: "vehicle",
        },
      ],
    },

    children: [
      {
        key: "interventions-rendezvous",
        moduleKey: "interventionsauto",
        foreignKey: "rendezVousId",
        title: "Intervention générée",
        description: "Intervention créée ou liée à ce rendez-vous.",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        createLabel: "Créer une intervention",
        prefillFromParent: {
          rendezVousId: "id",
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["rendezVousId", "clientId", "vehiculeId"],
        labelFields: ["dateIntervention", "typeIntervention", "statut"],
        subtitleFields: ["clientId", "vehiculeId", "coutTotal"],
        totalField: "coutTotal",
        relations: [
          {
            field: "clientId",
            moduleKey: "clientsauto",
            labelFields: ["prenom", "nom", "telephone"],
          },
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
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