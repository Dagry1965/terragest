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
        list: { visible: true, order: 1 },
        grid: { cols: 6 },
      },
{
        key: "vehiculeId",
        label: "VÃ©hicule",
        type: "relation",
        relation: { module: "vehicules" },
        required: true,
        searchable: true,
        list: { visible: true, order: 2 },
        grid: { cols: 6 },
      },
{
        key: "rendezVousId",
        label: "Rendez-vous",
        type: "relation",
        relation: { module: "rendezvous" },
        searchable: true,
        list: { visible: false },
        grid: { cols: 6 },
      },
      {
        key: "mecanicienId",
        label: "MÃ©canicien responsable",
        type: "relation",
        relation: { module: "employes" },
        searchable: true,
        list: { visible: true, order: 5 },
        grid: { cols: 6 },
        helperText: "MÃ©canicien responsable rÃ©el de lâ€™intervention.",
      },
{
        key: "dateIntervention",
        label: "Date intervention",
        type: "date",
        required: true,
        list: { visible: true, order: 3 },
        grid: { cols: 6 },
      },
{
        key: "typeIntervention",
        label: "Type intervention",
        type: "select",
        options: [
          { label: "Vidange", value: "vidange" },
          { label: "Diagnostic", value: "diagnostic" },
          { label: "RÃ©paration", value: "reparation" },
          { label: "Pneumatiques", value: "pneumatiques" },
          { label: "ContrÃ´le", value: "controle" },
          { label: "Autre", value: "autre" },
        ],
        list: { visible: true, order: 4 },
        grid: { cols: 6 },
      },
{
        key: "kilometrage",
        label: "KilomÃ©trage",
        type: "number",
        list: { visible: false },
        grid: { cols: 6 },
      },
{
        key: "diagnostic",
        label: "Diagnostic",
        type: "textarea",
        list: { visible: false },
        grid: { cols: 12 },
      },
{
        key: "travauxEffectues",
        label: "Travaux effectuÃ©s",
        type: "textarea",
        list: { visible: false },
        grid: { cols: 12 },
      },
{
        key: "coutPieces",
        label: "CoÃ»t piÃ¨ces",
        type: "number",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "coutMainOeuvre",
        label: "CoÃ»t main d'oeuvre",
        type: "number",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "coutTotal",
        label: "CoÃ»t total",
        type: "number",
        list: { visible: true, order: 6 },
        grid: { cols: 4 },
      },
      {
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        list: { visible: true, order: 7 },
        grid: { cols: 4 },
        helperText: "Montant calculÃ© depuis les lignes validÃ©es. Ancien Ã©quivalent legacy : coutTotal.",
      },
{
        key: "statut",
        label: "Statut",
        readonlyIf: {
          field: "statut",
          operator: "notEquals",
          value: "__never_editable__",
        },
        helperText: "Statut pilotÃ© par les actions. Utilisez les boutons dâ€™action pour changer lâ€™Ã©tat de lâ€™intervention.",
        type: "select",
        defaultValue: "ouverte",
        options: [
          { label: "Ouverte", value: "ouverte" },
          { label: "Diagnostic", value: "diagnostic" },
          { label: "En cours", value: "en_cours" },
          { label: "TerminÃ©e", value: "terminee" },
          { label: "AnnulÃ©e", value: "annulee" },
        ],
        list: { visible: true, order: 5 },
        grid: { cols: 6 },
      }
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
              "mecanicienId",
          "dateIntervention",
          "typeIntervention",          "statut",
        ],

        sections: [
          {
            key: "infos",
            title: "Informations intervention",
            fields: [
              "clientId",
              "vehiculeId",
              "rendezVousId",
              "mecanicienId",
              "dateIntervention",
              "typeIntervention",              "statut",
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
        label: "CoÃ»ts",

        fields: [
          "coutPieces",
          "coutMainOeuvre",
          "coutTotal",
        ],

        sections: [
          {
            key: "financier",
            title: "CoÃ»ts intervention",
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


  operational: {
    enabled: true,
    title: "Interventions",
    subtitle: "Vue opÃ©rationnelle des interventions atelier.",
    branding: {
      brandName: "AMARKHYS",
      runtimeLabel: "Runtime ERP",
      eyebrow: "AMARKHYS Â· Runtime ERP",
    },
    kpis: [
      {
        key: "total",
        label: "Total",
        count: true,
        tone: "blue",
        icon: "activity",
        description: "Nombre total d'interventions affichÃ©es.",
      },
      {
        key: "ouvertes",
        label: "Ouvertes",
        field: "statut",
        equals: "ouverte",
        tone: "blue",
        icon: "calendar",
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
        key: "terminees",
        label: "TerminÃ©es",
        field: "statut",
        equals: "terminee",
        tone: "green",
        icon: "check",
      },
      {
        key: "annulees",
        label: "AnnulÃ©es",
        field: "statut",
        equals: "annulee",
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
          { label: "Ouverte", value: "ouverte" },
          { label: "Diagnostic", value: "diagnostic" },
          { label: "En cours", value: "en_cours" },
          { label: "TerminÃ©e", value: "terminee" },
          { label: "AnnulÃ©e", value: "annulee" },
        ],
      },
      {
        key: "typeIntervention",
        label: "Type intervention",
        field: "typeIntervention",
        type: "select",
        options: [
          { label: "Vidange", value: "vidange" },
          { label: "Diagnostic", value: "diagnostic" },
          { label: "RÃ©paration", value: "reparation" },
          { label: "Pneumatiques", value: "pneumatiques" },
          { label: "ContrÃ´le", value: "controle" },
          { label: "Autre", value: "autre" },
        ],
      },
      {
        key: "clientId",
        label: "Client",
        field: "clientId",
        type: "relation",
      },
    ],
    table: {
      enableSearch: true,
      enableSelection: true,
      enableDensityToggle: true,
      fields: [
          "clientId",
          "vehiculeId",
          "dateIntervention",
          "typeIntervention",
          "kilometrage",
          "coutTotal",
          "statut",
        ],
      relationLabelFields: {
        mecanicienId: ["prenom", "nom", "fonction", "telephone"],
        clientId: [
          "nom",
          "prenom",
          "telephone",
        ],
        vehiculeId: [
          "marque",
          "modele",
          "immatriculation",
        ],
        rendezVousId: [
          "dateRendezVous",
          "heureRendezVous",
          "typeService",
        ],
      },
      hiddenFields: [
        "id",
        "_id",
        "uid",
        "tenantId",
        "workspaceId",
        "createdAt",
        "updatedAt",
        "removedAt",
      ],
    },
    rightPanel: {
      enabled: true,
      title: "Atelier aujourd'hui",
      type: "summary",
      metrics: [
        {
          key: "total",
          label: "Interventions affichÃ©es",
          type: "count",
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
        {
          key: "cout_total",
          label: "CoÃ»t total",
          type: "sum",
          field: "coutTotal",
          format: "currency",
          currency: "FCFA",
        },
      ],
    },
  },


  composition: {
    contextBanner: {
      title: "Contexte intervention",
      items: [
        {
          relationField: "clientId",
          moduleKey: "clientsauto",
          labelFields: [
            "prenom",
            "nom",
            "telephone",
          ],
          tone: "client",
        },
        {
          relationField: "vehiculeId",
          moduleKey: "vehicules",
          labelFields: [
            "marque",
            "modele",
            "immatriculation",
          ],
          tone: "vehicle",
        },
        {
          relationField: "rendezVousId",
          moduleKey: "rendezvous",
          labelFields: [
            "dateRendezVous",
            "heureRendezVous",
            "typeService",
            "statut",
          ],
          tone: "workshop",
        },
      ],
    },

    labelFields: [
      "dateIntervention",
      "typeIntervention",
      "statut",
    ],

    breadcrumbs: [
      {
        field: "clientId",
        moduleKey: "clientsauto",
        labelFields: [
          "nom",
          "prenoms",
          "telephone",
        ],
      },
      {
        field: "vehiculeId",
        moduleKey: "vehicules",
        labelFields: [
          "marque",
          "modele",
          "immatriculation",
        ],
      },
      {
        field: "rendezVousId",
        moduleKey: "rendezvous",
        labelFields: [
          "dateRendezVous",
          "heureRendezVous",
          "motif",
        ],
      },
    ],

    relations: [
      {
        field: "clientId",
        moduleKey: "clientsauto",
        labelFields: [
          "nom",
          "prenoms",
          "telephone",
        ],
        snapshotFields: [
          "nom",
          "prenoms",
          "telephone",
          "email",
        ],
        displayAs: "card",
        lockDerivedFields: true,
      },
      {
        field: "vehiculeId",
        moduleKey: "vehicules",
        labelFields: [
          "marque",
          "modele",
          "immatriculation",
        ],
        snapshotFields: [
          "marque",
          "modele",
          "immatriculation",
          "clientId",
        ],
        displayAs: "card",
        lockDerivedFields: true,
      },
      {
        field: "rendezVousId",
        moduleKey: "rendezvous",
        labelFields: [
          "dateRendezVous",
          "heureRendezVous",
          "motif",
        ],
        snapshotFields: [
          "dateRendezVous",
          "heureRendezVous",
          "motif",
          "clientId",
          "vehiculeId",
        ],
        displayAs: "inline",
        lockDerivedFields: true,
      },
    ],

    lockedFields: [
      "clientId",
      "vehiculeId",
      "rendezVousId",
      "coutPieces",
      "coutMainOeuvre",
      "coutTotal",
    ],

    readOnlyFields: [
          "clientId",
      "vehiculeId",
      "rendezVousId",
      "coutPieces",
      "coutMainOeuvre",
      "coutTotal",
      "montantHT",
      "montantTTC",
],

    children: [
      {
        key: "lignes",
        moduleKey: "lignesinterventionauto",
        foreignKey: "interventionId",
        title: "Lignes de lâ€™intervention",
        createLabel: "Ajouter une ligne",
        openLabel: "Ouvrir ligne",
        displayIn: ["detail", "edit"],
        position: "after",
        lazy: true,

        // Q20H5E_B1_CLEAN_LINE_PANEL_LABELS
        // Affichage mÃ©tier lisible des lignes liÃ©es :
        // titre non dupliquÃ© + statut/quantitÃ©/montant en informations secondaires.
        labelFields: [
          "designation",
        ],
        subtitleFields: [
          "statut",
          "quantite",
          "typeLigne",
          "montantTotal",
          "stockId",
        ],

        totalField: "montantTotal",
        relations: [
          {
            field: "produitId",
            moduleKey: "produitsauto",
            labelFields: [
              "nom",
              "reference",
              "code",
            ],
            displayAs: "inline",
          },
          {
            field: "stockId",
            moduleKey: "stocksauto",
            labelFields: [
              "nom",
              "emplacement",
              "reference",
            ],
            displayAs: "inline",
          },
        ],
      },

      // Q21E_D_INTERVENTION_BILLING_CHILDREN
      {
        key: "factures-intervention",
        moduleKey: "facturesauto",
        foreignKey: "interventionId",
        title: "Factures de l'intervention",
        openLabel: "Ouvrir facture",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: false,
        mode: "readonly",
        prefillFromParent: {
          interventionId: "id",
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["interventionId", "clientId", "vehiculeId"],
        labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
        subtitleFields: ["clientId", "vehiculeId", "dateFacture"],
        totalField: "montantTTC",
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
      }],
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
        { key: "terminee", label: "TerminÃ©e", color: "success" },
        { key: "annulee", label: "AnnulÃ©e", color: "danger" },
      ],

      transitions: [
        { from: "ouverte", to: "diagnostic", action: "Diagnostiquer" },
        { from: "diagnostic", to: "en_cours", action: "DÃ©marrer" },
        { from: "en_cours", to: "terminee", action: "Terminer" },
        { from: "ouverte", to: "annulee", action: "Annuler" },
      ],
    },
  ],
};