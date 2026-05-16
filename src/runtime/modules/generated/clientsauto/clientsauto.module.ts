import type { ERPModule } from "@/runtime/modules/ERPModule";

export const clientsautoModule: ERPModule = {
  metadata: {
    key: "clientsauto",
    label: "Clients",
    description: "CRM clients automobile",
    icon: "users",
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
    collection: "clientsauto",
    fields: [
      {
        key: "codeClient",
        label: "Code client",
        type: "text",
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 4 }
      },
      {
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
        searchable: true,
        list: { order: 2 },
        grid: { cols: 4 }
      },
      {
        key: "prenom",
        label: "Prénom",
        type: "text",
        required: true,
        list: { order: 3 },
        grid: { cols: 4 }
      },
      {
        key: "telephone",
        label: "Téléphone",
        type: "text",
        searchable: true,
        grid: { cols: 6 }
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        searchable: true,
        grid: { cols: 6 }
      },
      {
        key: "adresse",
        label: "Adresse",
        type: "textarea",
        grid: { cols: 12 }
      },
      {
        key: "ville",
        label: "Ville",
        type: "text",
        grid: { cols: 6 }
      },
      {
        key: "pays",
        label: "Pays",
        type: "text",
        defaultValue: "Côte d'Ivoire",
        grid: { cols: 6 }
      },
      {
        key: "typeClient",
        label: "Type client",
        type: "select",
        options: [
          { label:"Particulier", value:"particulier" },
          { label:"Entreprise", value:"entreprise" },
          { label:"Flotte", value:"flotte" }
        ],
        grid:{ cols:6 }
      },
      {
        key:"dateInscription",
        label:"Date inscription",
        type:"date",
        grid:{ cols:6 }
      },
      {
        key:"vehicules",
        label:"Véhicules",
        type:"relation",
        relation:{
          module:"vehicules"
        },
        searchable:true,
        grid:{ cols:12 }
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
          {
            label:"Actif",
            value:"actif"
          },
          {
            label:"Prospect",
            value:"prospect"
          },
          {
            label:"Inactif",
            value:"inactif"
          }
        ],
        list:{ order:4 },
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
          "codeClient",
          "nom",
          "prenom",
          "telephone",
          "email",
          "typeClient",
          "dateInscription",
          "statut"
        ],
        sections:[
          {
            key:"infos",
            title:"Informations client",
            fields:[
              "codeClient",
              "nom",
              "prenom",
              "telephone",
              "email",
              "typeClient",
              "dateInscription",
              "statut"
            ]
          }
        ]
      },

      {
        key:"adresse",
        label:"Adresse",
        fields:[
          "adresse",
          "ville",
          "pays"
        ],
        sections:[
          {
            key:"localisation",
            title:"Adresse",
            fields:[
              "adresse",
              "ville",
              "pays"
            ]
          }
        ]
      },

      {
        key:"vehicules",
        label:"Véhicules",
        fields:[
          "vehicules"
        ],
        sections:[
          {
            key:"parc",
            title:"Parc automobile",
            fields:[
              "vehicules"
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
            key:"observations",
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
      key:"client",
      label:"Cycle client",
      initialState:"prospect",
      states:[
        {
          key:"prospect",
          label:"Prospect",
          color:"warning"
        },
        {
          key:"active",
          label:"Client",
          color:"success"
        },
        {
          key:"inactive",
          label:"Inactif",
          color:"default"
        }
      ],
      transitions:[
        {
          from:"prospect",
          to:"active",
          action:"Convertir"
        },
        {
          from:"active",
          to:"inactive",
          action:"Désactiver"
        }
      ]
    }
  ]
};