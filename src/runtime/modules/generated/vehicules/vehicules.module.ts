import type { ERPModule } from "@/runtime/modules/ERPModule";
import { vehiculesActions } from "./vehicules.actions";

export const vehiculesModule: ERPModule = {
  actions: vehiculesActions,

  metadata: {
    businessCode: {
      field: "codeVehicule",
      prefix: "VEH",
      sequenceScope: "year",
      padLength: 6,
      readonly: true,
      required: true,
    },

    key: "vehicules",

    label: "Véhicules",

    description:
      "Parc automobile AMARKHYS",

    icon: "truck",

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

    collection: "vehicules",

    fields: [
{
        key:"codeVehicule",
        label:"Code véhicule",
        type:"text",
        required:true,
        unique:true,
        searchable:true,
        list:{ visible:true, order:1 },
        grid:{ cols:4 }
      },
{
        key:"immatriculation",
        label:"Immatriculation",
        type:"text",
        required:true,
        unique: true,
        searchable:true,
        list: { visible: true, order: 2 },
        grid:{ cols:4 }
      },
{
        key:"marque",
        label:"Marque",
        type:"text",
        required:true,
        list: { visible: true, order: 3 },
        grid:{ cols:4 }
      },
{
        key:"modele",
        label:"Modèle",
        type:"text",
        required:true,
        list: { visible: true, order: 4 },
        grid:{ cols:4 }
      },
{
        key:"annee",
        label:"Année",
        type:"number",
        list: { visible: false },
        grid:{ cols:3 }
      },
{
        key:"vin",
        label:"VIN",
        type:"text",
        list: { visible: false },
        grid:{ cols:9 }
      },
{
        key:"carburant",

        label:"Carburant",

        type:"select",

        options:[
          { label:"Essence", value:"essence" },
          { label:"Diesel", value:"diesel" },
          { label:"Hybride", value:"hybride" },
          { label:"Électrique", value:"electrique" }
        ],
        list: { visible: false },

        grid:{ cols:6 }
      },
{
        key:"kilometrage",
        label:"Kilométrage",
        type:"number",
        list: { visible: true, order: 6 },
        grid:{ cols:6 }
      },
{
        key:"dateMiseEnCirculation",
        label:"Mise en circulation",
        type:"date",
        list: { visible: false },
        grid:{ cols:6 }
      },
{
        key:"clientId",

        label:"Client",

        type:"relation",

        relation: { module: "clientsauto"
        },

        searchable:true,
        list: { visible: true, order: 6 },

        grid:{ cols:6 }
      },
{
        key:"prochaineVidange",
        label:"Prochaine vidange",
        type:"date",
        list: { visible: false },
        grid:{ cols:6 }
      },
{
        key:"prochainControleTechnique",
        label:"Contrôle technique",
        type:"date",
        list: { visible: false },
        grid:{ cols:6 }
      },
{
        key:"assuranceExpiration",
        label:"Expiration assurance",
        type:"date",
        list: { visible: false },
        grid:{ cols:6 }
      },
{
        key:"observations",
        label:"Observations",
        type:"textarea",
        list: { visible: false },
        grid:{ cols:12 }
      },
{
        key:"statut",

        label:"Statut",

        type:"select",

        defaultValue:"actif",

        options:[
          { label:"Actif", value:"actif" },
          { label:"Entretien requis", value:"entretien" },
          { label:"Immobilisé", value:"immobilise" },
          { label:"Archivé", value:"archive" }
        ],

        list: { visible: true, order: 7 },

        grid:{ cols:6 }
      },
    
    {
      key: "energie",
      label: "Énergie",
      type: "select",
      required: false,
      options: [
        { label: "Essence", value: "essence" },
        { label: "Diesel", value: "diesel" },
        { label: "GPL", value: "gpl" },
        { label: "GNV", value: "gnv" },
        { label: "Bioéthanol", value: "bioethanol" },
        { label: "Électrique", value: "electrique" },
        { label: "Hybride", value: "hybride" },
        { label: "Hydrogène", value: "hydrogene" },
      ],
    },

    {
      key: "dateFinGarantie",
      label: "Date fin garantie",
      type: "date",
      required: false,
    },
]

  },

  form: {

    layout:"tabs",

    tabs:[

      {

        key:"identite",

        label:"Identité",

        fields:[
          "immatriculation",
          "marque",
          "modele",
          "annee",
          "vin",
          "carburant",
          "kilometrage"
        ],

        sections:[

          {

            key:"vehicule",

            title:"Informations véhicule",

            fields:[
              "immatriculation",
              "marque",
              "modele",
              "annee",
              "vin",
              "carburant",
              "kilometrage"
            ]

          }

        ]

      },

      {

        key:"proprietaire",

        label:"Client",

        fields:[
          "clientId"
        ],

        sections:[

          {

            key:"client",

            title:"Propriétaire",

            fields:[
              "clientId"
            ]

          }

        ]

      },

      {

        key:"maintenance",

        label:"Maintenance",

        fields:[
          "prochaineVidange",
          "prochainControleTechnique",
          "assuranceExpiration",
          "statut"
        ],

        sections:[

          {

            key:"suivi",

            title:"Suivi",

            fields:[
              "prochaineVidange",
              "prochainControleTechnique",
              "assuranceExpiration",
              "statut"
            ]

          }

        ]

      },

      {

        key:"notes",

        label:"Notes",

        fields:[
          "observations"
        ],

        sections:[

          {

            key:"obs",

            title:"Observations",

            fields:[
              "observations"
            ]

          }

        ]

      }

    ]

  },

  operational: {
    enabled: true,
    title: "Véhicules",
    subtitle: "Vue opérationnelle des véhicules, rendez-vous et interventions atelier.",
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
        icon: "car",
        description: "Nombre total de véhicules affichés.",
      },
      {
        key: "actifs",
        label: "Actifs",
        field: "statut",
        equals: "actif",
        tone: "green",
        icon: "check",
      },
      {
        key: "entretien",
        label: "En entretien",
        field: "statut",
        equals: "entretien",
        tone: "orange",
        icon: "wrench",
      },
    ],
    table: {
      enableSearch: true,
      enableSelection: true,
      enableDensityToggle: true,
      fields: [
        "codeVehicule",
        "immatriculation",
        "marque",
        "modele",
        "clientId",
        "statut",
      ],
      relationLabelFields: {
        clientId: [
          "nom",
          "prenom",
          "telephone",
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
      title: "Parc véhicules",
      type: "summary",
      metrics: [
        {
          key: "total",
          label: "Véhicules affichés",
          type: "count",
          format: "number",
        },
        {
          key: "actifs",
          label: "Véhicules actifs",
          type: "countWhere",
          field: "statut",
          equals: "actif",
          format: "number",
        },
      ],
    },
  },

  composition: {
    contextBanner: {
      title: "Contexte véhicule",
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
      ],
    },

    labelFields: [
      "immatriculation",
      "marque",
      "modele",
    ],

    breadcrumbs: [
      {
        field: "clientId",
        moduleKey: "clientsauto",
        labelFields: [
          "nom",
          "prenom",
          "telephone",
        ],
      },
    ],

    relations: [
      {
        field: "clientId",
        moduleKey: "clientsauto",
        labelFields: [
          "nom",
          "prenom",
          "telephone",
        ],
        snapshotFields: [
          "codeClient",
          "nom",
          "prenom",
          "telephone",
          "email",
        ],
        displayAs: "card",
        lockDerivedFields: true,
      },
    ],

    lockedFields: [
    ],

    children: [
      {
        key: "rendezvous",
        moduleKey: "rendezvous",
        foreignKey: "vehiculeId",
        title: "Rendez-vous du véhicule",
        createLabel: "Ajouter un rendez-vous pour ce véhicule",
        displayIn: [
          "detail",
        ],
        position: "after",
        lazy: true,
        mode: "readonly",
        allowCreate: true,
        badgeLabel: "rendez-vous liés",
        description: "Crée un rendez-vous dans le contexte du véhicule avec client et véhicule préremplis.",
        openLabel: "Ouvrir rendez-vous",
        prefillFromParent: {
          vehiculeId: "id",
          clientId: "clientId",
        },
        lockFields: [
          "clientId",
          "vehiculeId",
        ],
        labelFields: [
          "dateRendezVous",
          "heureRendezVous",
          "typeService",
          "statut",
        ],
        subtitleFields: [
          "motif",
          "statut",
        ],
      },
      {
        key: "interventions",
        moduleKey: "interventionsauto",
        foreignKey: "vehiculeId",
        title: "Interventions du véhicule",
        createLabel: "Ajouter une intervention pour ce véhicule",
        allowCreate: true,
        prefillFromParent: {
          vehiculeId: "id",
          clientId: "clientId",
        },
        lockFields: [
          "clientId",
          "vehiculeId",
        ],
        displayIn: [
          "detail",
        ],
        position: "after",
        lazy: true,
        totalField: "coutTotal",
        relations: [
          {
            field: "clientId",
            moduleKey: "clientsauto",
            labelFields: [
              "nom",
              "prenom",
              "telephone",
            ],
            displayAs: "inline",
          },
        ],
      },

      // Q21E_D_VEHICLE_BILLING_CHILDREN
      {
        key: "factures-vehicule",
        moduleKey: "facturesauto",
        foreignKey: "vehiculeId",
        title: "Factures du véhicule",
        createLabel: "Ajouter une facture",
        displayIn: ["detail"],
        lazy: true,
        position: "after",
        allowCreate: true,
        prefillFromParent: {
          vehiculeId: "id",
          clientId: "clientId",
        },
        lockFields: ["clientId", "vehiculeId"],
        labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
        subtitleFields: ["clientId", "interventionId", "dateFacture"],
        totalField: "montantTTC",
        relations: [
          {
            field: "clientId",
            moduleKey: "clientsauto",
            labelFields: ["prenom", "nom", "telephone"],
          },
          {
            field: "interventionId",
            moduleKey: "interventionsauto",
            labelFields: ["dateIntervention", "typeIntervention", "statut"],
          },
        ],
      }],
  },

  workflows:[

    {

      key:"vehicule",

      label:"Cycle véhicule",

      initialState:"actif",

      states:[

        {
          key:"actif",
          label:"Actif",
          color:"success"
        },

        {
          key:"entretien",
          label:"Entretien requis",
          color:"warning"
        },

        {
          key:"immobilise",
          label:"Immobilisé",
          color:"danger"
        },

        {
          key:"archive",
          label:"Archivé",
          color:"default"
        }

      ],

      transitions:[

        {
          from:"actif",
          to:"entretien",
          action:"Planifier entretien"
        },

        {
          from:"entretien",
          to:"actif",
          action:"Réparer"
        },

        {
          from:"actif",
          to:"immobilise",
          action:"Immobiliser"
        }

      ]

    }

  ]

};