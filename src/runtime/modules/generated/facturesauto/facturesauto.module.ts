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
        unique: true,
        searchable: true,
        list: { visible: true, order: 1 },
        grid: { cols: 4 },
      },
{
        key: "dateFacture",
        label: "Date facture",
        type: "date",
        required: true,
        unique: true,
        list: { visible: true, order: 4 },
        grid: { cols: 4 },
      },
{
        key: "statutFacture",
        label: "Statut facture",
        type: "select",
        defaultValue: "emise",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Émise", value: "emise" },
          { label: "Annulée", value: "annulee" },
        ],
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "statutPaiement",
        label: "Statut paiement",
        type: "select",
        defaultValue: "en_attente",
        options: [
          { label: "En attente", value: "en_attente" },
          { label: "Partiel", value: "partiel" },
          { label: "Payé", value: "paye" },
        ],
        list: { visible: true, order: 7 },
        grid: { cols: 4 },
      },
{
        key: "clientId",
        label: "Client",
        type: "relation",
        relation: {
          module: "clientsauto",
        },
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
        },
        searchable: true,
        list: { visible: true, order: 3 },
        grid: { cols: 6 },
      },
{
        key: "interventionId",
        label: "Intervention",
        type: "relation",
        relation: {
          module: "interventionsauto",
        },
        searchable: true,
        list: { visible: false },
        grid: { cols: 12 },
      },
{
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "tva",
        label: "Taux TVA (%)",
        type: "number",
        defaultValue: 18,
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "montantTTC",
        label: "Montant TTC",
        type: "number",
        computed: {
          formula: "montantHT + (montantHT * tva / 100)",
          dependsOn: ["montantHT", "tva"],
        },
        list: { visible: true, order: 5 },
        grid: { cols: 4 },
      },
{
        key: "montantPaye",
        label: "Montant payé",
        type: "number",
        defaultValue: 0,
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "resteAPayer",
        label: "Reste à payer",
        type: "number",
        defaultValue: 0,
        list: { visible: true, order: 6 },
        grid: { cols: 4 },
      },
{
        key: "modePaiement",
        label: "Mode paiement",
        type: "select",
        options: [
          { label: "Espèces", value: "especes" },
          { label: "Carte", value: "carte" },
          { label: "Virement", value: "virement" },
          { label: "Mobile Money", value: "mobile_money" },
        ],
        list: { visible: false },
        grid: { cols: 6 },
      },
{
        key: "statutEnvoiFacture",
        label: "Statut envoi facture",
        type: "select",
        defaultValue: "non_envoyee",
        options: [
          { label: "Non envoyée", value: "non_envoyee" },
          { label: "Envoyée", value: "envoyee" },
          { label: "Échec envoi", value: "echec" },
        ],
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "dernierEnvoiFactureAt",
        label: "Dernier envoi facture",
        type: "datetime",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "canalDernierEnvoiFacture",
        label: "Canal dernier envoi",
        type: "select",
        options: [
          { label: "WhatsApp", value: "whatsapp" },
          { label: "SMS", value: "sms" },
          { label: "Email", value: "email" },
          { label: "Lien", value: "lien" },
          { label: "Manuel", value: "manuel" },
        ],
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "destinataireDernierEnvoiFacture",
        label: "Destinataire dernier envoi",
        type: "text",
        list: { visible: false },
        grid: { cols: 6 },
      },
{
        key: "nombreEnvoisFacture",
        label: "Nombre d'envois",
        type: "number",
        defaultValue: 0,
        list: { visible: false },
        grid: { cols: 6 },
      },
{
        key: "observations",
        label: "Observations",
        type: "textarea",
        list: { visible: false },
        grid: { cols: 12 },
      }
    ],
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
          "statutFacture",
          "statutPaiement",
          "modePaiement",
        ],
        sections: [
          {
            key: "infos",
            title: "Informations facture",
            fields: [
              "numeroFacture",
              "dateFacture",
              "statutFacture",
              "statutPaiement",
              "modePaiement",
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
          "interventionId",
        ],
        sections: [
          {
            key: "liens",
            title: "Relations métier",
            fields: [
              "clientId",
              "vehiculeId",
              "interventionId",
            ],
          },
        ],
      },

      {
        key: "finance",
        label: "Finance",
        fields: [
          "montantHT",
          "tva",
          "montantTTC",
          "montantPaye",
          "resteAPayer",
        ],
        sections: [
          {
            key: "couts",
            title: "Montants",
            fields: [
              "montantHT",
              "tva",
              "montantTTC",
              "montantPaye",
              "resteAPayer",
            ],
          },
        ],
      },

      {
        key: "envoi",
        label: "Envoi",
        fields: [
          "statutEnvoiFacture",
          "dernierEnvoiFactureAt",
          "canalDernierEnvoiFacture",
          "destinataireDernierEnvoiFacture",
          "nombreEnvoisFacture",
        ],
        sections: [
          {
            key: "suivi-envoi",
            title: "Suivi d'envoi facture",
            fields: [
              "statutEnvoiFacture",
              "dernierEnvoiFactureAt",
              "canalDernierEnvoiFacture",
              "destinataireDernierEnvoiFacture",
              "nombreEnvoisFacture",
            ],
          },
        ],
      },

      {
        key: "notes",
        label: "Notes",
        fields: [
          "observations",
        ],
        sections: [
          {
            key: "obs",
            title: "Observations",
            fields: [
              "observations",
            ],
          },
        ],
      },
    ],
  },

  operational: {
    enabled: true,
    title: "Factures",
    subtitle: "Vue opérationnelle de la facturation atelier.",
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
        icon: "receipt",
        description: "Nombre total de factures affichées.",
      },
      {
        key: "en_attente",
        label: "En attente",
        field: "statutPaiement",
        equals: "en_attente",
        tone: "orange",
        icon: "clock",
      },
      {
        key: "partiel",
        label: "Partielles",
        field: "statutPaiement",
        equals: "partiel",
        tone: "purple",
        icon: "activity",
      },
      {
        key: "payees",
        label: "Payées",
        field: "statutPaiement",
        equals: "paye",
        tone: "green",
        icon: "check",
      },
      {
        key: "annulees",
        label: "Annulées",
        field: "statutFacture",
        equals: "annulee",
        tone: "gray",
        icon: "x",
      },
    ],
    filters: [
      {
        key: "statutPaiement",
        label: "Statut paiement",
        field: "statutPaiement",
        type: "select",
        options: [
          { label: "En attente", value: "en_attente" },
          { label: "Partiel", value: "partiel" },
          { label: "Payé", value: "paye" },
        ],
      },
      {
        key: "statutFacture",
        label: "Statut facture",
        field: "statutFacture",
        type: "select",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Émise", value: "emise" },
          { label: "Annulée", value: "annulee" },
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
        "numeroFacture",
        "dateFacture",
        "clientId",
        "vehiculeId",
        "montantTTC",
        "statut",
      ],
      relationLabelFields: {
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
        interventionId: [
          "dateIntervention",
          "typeIntervention",
          "statut",
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
      title: "Facturation aujourd'hui",
      type: "summary",
      metrics: [
        {
          key: "total",
          label: "Factures affichées",
          type: "count",
          format: "number",
        },
        {
          key: "montant_ttc",
          label: "Montant TTC",
          type: "sum",
          field: "montantTTC",
          format: "currency",
          currency: "FCFA",
        },
        {
          key: "reste_a_payer",
          label: "Reste à payer",
          type: "sum",
          field: "resteAPayer",
          format: "currency",
          currency: "FCFA",
        },
      ],
    },
  },


  composition: {
    // Q21E_C_BILLING_RELATIONSHIP_COMPOSITION
    // Facture knows its payments and payment schedules.
    labelFields: ["numeroFacture", "clientId", "montantTTC", "resteAPayer", "statutPaiement"],

    contextBanner: {
      title: "Contexte facture",
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
          relationField: "interventionId",
          moduleKey: "interventionsauto",
          labelFields: [
            "typeIntervention",
            "dateIntervention",
            "statut",
          ],
          tone: "workshop",
        },
      ],
    },

    lockedFields: [
      "numeroFacture",
      "clientId",
      "vehiculeId",
      "interventionId",
    ],

    readOnlyFields: [
      "statutPaiement",
      "montantTTC",
      "montantPaye",
      "resteAPayer",
      "dernierEnvoiFactureAt",
      "canalDernierEnvoiFacture",
      "destinataireDernierEnvoiFacture",
      "nombreEnvoisFacture",
    ],

    children: [
      {
        key: "encaissements-facture",
        moduleKey: "encaissementsauto",
        foreignKey: "factureId",
        title: "Encaissements",
        description: "Paiements enregistrés pour cette facture.",
        displayIn: [],
        lazy: true,
        position: "after",
        allowCreate: false,
        createLabel: "Ajouter un encaissement",
        openLabel: "Ouvrir encaissement",
        labelFields: ["numeroRecu", "montant", "datePaiement", "statut"],
        subtitleFields: ["clientId", "vehiculeId", "modePaiement", "referenceTransaction"],
        totalField: "montant",
        prefillFromParent: {
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["factureId", "clientId", "vehiculeId"],
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
      {
        key: "echeances-facture",
        moduleKey: "echeancespaiementauto",
        foreignKey: "factureId",
        title: "Échéances de paiement",
        description: "Plan de paiement et relances liées à cette facture.",
        displayIn: [],
        lazy: true,
        position: "after",
        allowCreate: false,
        createLabel: "Ajouter une échéance",
        openLabel: "Ouvrir échéance",
        labelFields: ["montantPrevu", "montantPaye", "dateEcheance", "statut"],
        subtitleFields: ["clientId", "vehiculeId", "canalRelance"],
        totalField: "montantPrevu",
        prefillFromParent: {
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["factureId", "clientId", "vehiculeId"],
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
          color: "warning",
        },
        {
          key: "partiel",
          label: "Paiement partiel",
          color: "default",
        },
        {
          key: "paye",
          label: "Payé",
          color: "success",
        },
      ],
      transitions: [
        {
          from: "en_attente",
          to: "partiel",
          action: "Paiement partiel",
        },
        {
          from: "partiel",
          to: "paye",
          action: "Finaliser",
        },
      ],
    },
  ],
};
