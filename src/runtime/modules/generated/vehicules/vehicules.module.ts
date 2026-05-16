import type { ERPModule } from "@/runtime/modules/ERPModule";

export const vehiculesModule: ERPModule = {

  metadata: {

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
        key:"immatriculation",
        label:"Immatriculation",
        type:"text",
        required:true,
        searchable:true,
        list:{ order:1 },
        grid:{ cols:4 }
      },

      {
        key:"marque",
        label:"Marque",
        type:"text",
        required:true,
        grid:{ cols:4 }
      },

      {
        key:"modele",
        label:"Modèle",
        type:"text",
        required:true,
        grid:{ cols:4 }
      },

      {
        key:"annee",
        label:"Année",
        type:"number",
        grid:{ cols:3 }
      },

      {
        key:"vin",
        label:"VIN",
        type:"text",
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

        grid:{ cols:6 }
      },

      {
        key:"kilometrage",
        label:"Kilométrage",
        type:"number",
        grid:{ cols:6 }
      },

      {
        key:"dateMiseEnCirculation",
        label:"Mise en circulation",
        type:"date",
        grid:{ cols:6 }
      },

      {
        key:"clientId",

        label:"Client",

        type:"relation",

        relation:{
          module:"clientsauto"
        },

        searchable:true,

        grid:{ cols:6 }
      },

      {
        key:"prochaineVidange",
        label:"Prochaine vidange",
        type:"date",
        grid:{ cols:6 }
      },

      {
        key:"prochainControleTechnique",
        label:"Contrôle technique",
        type:"date",
        grid:{ cols:6 }
      },

      {
        key:"assuranceExpiration",
        label:"Expiration assurance",
        type:"date",
        grid:{ cols:6 }
      },

      {
        key:"observations",
        label:"Observations",
        type:"textarea",
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

        list:{ order:2 },

        grid:{ cols:6 }
      }

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