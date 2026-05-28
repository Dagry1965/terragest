import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  rendezvousActions,
} from "./rendezvous.actions";

export const rendezvousModule: ERPModule = {
  metadata: {
    businessCode: {
      field: "codeRendezVous",
      prefix: "RDV",
      sequenceScope: "year",
      padLength: 6,
      readonly: true,
      required: true,
    },
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
        key: "codeRendezVous",
          label: "Code rendez-vous",
        type: "text",
        required: true,
        unique: true,
        searchable: true,
        list: { visible: true, order: 1 },
        grid: { cols: 4 },
      },
{
        key: "clientId",
        label: "Client",
        type: "relation",
        relation: { module: "clientsauto" },
        required: true,
        searchable: true,
        list: { visible: true, order: 2 },
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
        list: { visible: true, order: 3 },
        grid: { cols: 6 },
      },
{
        key: "dateRendezVous",
        label: "Date rendez-vous",
        type: "date",
        required: true,
        list: { visible: true, order: 4 },
        grid: { cols: 4 },
      },
{
        key: "heureRendezVous",
        label: "Heure",
        type: "text",
        required: true,
        list: { visible: true, order: 5 },
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
      required: true,
        type: "select",
        options: [
          { label: "Vidange", value: "vidange" },
          { label: "Diagnostic", value: "diagnostic" },
          { label: "Réparation", value: "reparation" },
          { label: "Contrôle", value: "controle" },
          { label: "Autre", value: "autre" },
        ],
        list: { visible: true, order: 6 },
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
          { label: "Annulé", value: "annule" },
        ],
        list: { visible: true, order: 7 },
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

  operational: {
    enabled: true,
    title: "Rendez-vous",
    subtitle: "Vue opérationnelle des rendez-vous atelier.",
    branding: {
      brandName: "AMARKHYS",
      runtimeLabel: "Runtime ERP",
      eyebrow: "AMARKHYS · Runtime ERP",
    },
    kpis: [
      {
        key: "total",
        label: "Total",
        count: true,
        tone: "blue",
        icon: "calendar",
        description: "Nombre total de rendez-vous affichés.",
      },
      {
        key: "confirmes",
        label: "Confirmés",
        field: "statut",
        equals: "confirme",
        tone: "green",
        icon: "check",
      },
      {
        key: "en_cours",
        label: "En cours",
        field: "statut",
        equals: "en_cours",
        tone: "orange",
        icon: "clock",
      },
      {
        key: "annules",
        label: "Annulés",
        field: "statut",
        equals: "annule",
        tone: "gray",
        icon: "x",
      },
    ],
    filters: [
      {
        key: "statut",
        label: "Statut",
        field: "statut",
        type: "select",
        options: [
          { label: "Planifié", value: "planifie" },
          { label: "Confirmé", value: "confirme" },
          { label: "En cours", value: "en_cours" },
          { label: "Terminé", value: "termine" },
          { label: "Annulé", value: "annule" },
        ],
      },
      {
        key: "typeService",
        label: "Type de service",
        field: "typeService",
        type: "select",
        options: [
          { label: "Vidange", value: "vidange" },
          { label: "Diagnostic", value: "diagnostic" },
          { label: "Réparation", value: "reparation" },
          { label: "Contrôle", value: "controle" },
          { label: "Autre", value: "autre" },
        ],
      },
      {
        key: "vehiculeId",
        label: "Véhicule",
        field: "vehiculeId",
        type: "relation",
      },
    ],
    table: {
      title: "Liste des rendez-vous",
      description: "Rendez-vous issus du runtime ERP.",
      fields: [
        "clientId",
        "vehiculeId",
        "dateRendezVous",
        "heureRendezVous",
        "typeService",
        "statut",
      ],
      hiddenFields: [
        "codeRendezVous",
        "consumedByInterventionId",
      ],
      relationLabelFields: {
        clientId: ["nom", "prenom", "telephone"],
        vehiculeId: ["immatriculation", "modele"],
      },
      childTotals: [
        {
          key: "montantTotalIntervention",
          label: "Montant total",
          moduleKey: "interventionsauto",
          foreignKey: "rendezVousId",
          totalField: "coutTotal",
          currency: "FCFA",
        },
      ],
      enableSearch: true,
      enableSelection: true,
      enableDensityToggle: true,
    },
    rightPanel: {
      enabled: true,
      title: "Planning du jour",
      type: "planning",
      metrics: [
        {
          key: "total",
          label: "Rendez-vous affichés",
          type: "count",
          format: "number",
        },
        {
          key: "confirmes",
          label: "Confirmés",
          type: "countWhere",
          field: "statut",
          equals: "confirme",
          format: "number",
        },
        {
          key: "en_cours",
          label: "En cours",
          type: "countWhere",
          field: "statut",
          equals: "en_cours",
          format: "number",
        },
      ],
    },
  },

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
    capacity: 1,

    calendarExceptions: [
      // Q22F2A_RENDEZVOUS_CALENDAR_EXCEPTIONS_EXAMPLE
      // Exemple générique désactivé : à remplacer plus tard par une configuration tenant/workspace.
      // { date: "2026-01-01", isClosed: true, reason: "Jour fermé" },
    ],
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
        openLabel: "Ouvrir intervention",
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
        { key: "annule", label: "Annulé", color: "danger" },
      ],

      transitions: [
        { from: "planifie", to: "confirme", action: "Confirmer" },
        { from: "confirme", to: "en_cours", action: "Démarrer" },
        { from: "en_cours", to: "termine", action: "Terminer" },
        { from: "planifie", to: "annule", action: "Annuler" },
        { from: "confirme", to: "annule", action: "Annuler" },
        { from: "en_cours", to: "annule", action: "Annuler" },
      ],
    },
  ],
};