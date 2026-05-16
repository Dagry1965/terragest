import type {
  ERPWorkspace,
} from "./ERPWorkspaceTypes";

export const ERPWorkspaceRegistry:
  ERPWorkspace[] = [

  {
    key: "general",

    label: "Vue Générale",

    description:
      "Cockpit global Terragest",

    defaultHref:
      "/dashboard",

    modules: [

      {
        key: "terrains",
        label: "Terrains",
      },

      {
        key: "exploitations",
        label: "Exploitations",
      },

      {
        key: "stocks",
        label: "Stocks",
      },

      {
        key: "produits",
        label: "Produits",
      },

      {
        key: "materiels",
        label: "Matériels",
      },

      {
        key: "interventions",
        label: "Interventions",
      },

      {
        key: "paiements",
        label: "Paiements",
      },
    ],

    kpis: [

      {
        key: "production",
        label: "Production",
      },

      {
        key: "maintenance",
        label: "Maintenance",
      },

      {
        key: "finance",
        label: "Finance",
      },
    ],

    quickActions: [

      {
        key: "new-terrain",
        label: "Nouveau terrain",
        href: "/terrains/nouveau",
      },

      {
        key: "new-exploitation",
        label: "Nouvelle exploitation",
        href: "/exploitations/nouveau",
      },

      {
        key: "new-maintenance",
        label: "Nouvelle maintenance",
        href: "/maintenance/nouveau",
      },
    ],
  },

  {
    key: "production",

    label: "Production",

    description:
      "Gestion de la production agricole",

    defaultHref:
      "/exploitations",

    modules: [

      {
        key: "campagnes",
        label: "Campagnes",
      },

      {
        key: "exploitations",
        label: "Exploitations",
      },

      {
        key: "parcelles",
        label: "Parcelles",
      },

      {
        key: "intrants",
        label: "Intrants",
      },

      {
        key: "recoltes",
        label: "Récoltes",
      },

      {
        key: "stocks",
        label: "Stocks",
      },
    ],

    kpis: [],

    quickActions: [],
  },

  {
    key: "maintenance",

    label: "Maintenance",

    description:
      "Gestion des matériels et interventions",

    defaultHref:
      "/maintenance",

    modules: [

      {
        key: "materiels",
        label: "Matériels",
      },

      {
        key: "maintenance",
        label: "Maintenance",
      },

      {
        key: "interventions",
        label: "Interventions",
      },

      {
        key: "stocks",
        label: "Stocks",
      },
    ],

    kpis: [],

    quickActions: [],
  },

  {
    key: "finance",

    label: "Finance",

    description:
      "Gestion financière et comptable",

    defaultHref:
      "/paiements",

    modules: [

      {
        key: "paiements",
        label: "Paiements",
      },

      {
        key: "factures",
        label: "Factures",
      },

      {
        key: "devis",
        label: "Devis",
      },

      {
        key: "depenses",
        label: "Dépenses",
      },

      {
        key: "recettes",
        label: "Recettes",
      },
    ],

    kpis: [],

    quickActions: [],
  },

  {
    key: "administration",

    label: "Administration",

    description:
      "Administration ERP",

    defaultHref:
      "/admin",

    modules: [

      {
        key: "utilisateurs",
        label: "Utilisateurs",
      },

      {
        key: "workflows",
        label: "Workflows",
      },

      {
        key: "audit",
        label: "Audit",
      },
    ],

    kpis: [],

    quickActions: [],
  },

  {
    key: "supervision",

    label: "Supervision",

    description:
      "Supervision runtime ERP",

    defaultHref:
      "/supervision",

    modules: [

      {
        key: "runtime",
        label: "Runtime",
      },

      {
        key: "observability",
        label: "Observabilité",
      },
    ],

    kpis: [],

    quickActions: [],
  },
{
  key:"amarkhys",

  label:"AMARKHYS",

  description:
    "ERP automobile, atelier, CRM, stock, interventions et facturation",

  defaultHref:
    "/clientsauto",

  modules:[

    {
      key:"clientsauto",
      label:"Clients"
    },

    {
      key:"vehicules",
      label:"Véhicules"
    },

    {
      key:"rendezvous",
      label:"Rendez-vous"
    },

    {
      key:"interventionsauto",
      label:"Interventions"
    },

    {
      key:"facturesauto",
      label:"Factures"
    },

    {
      key:"produitsauto",
      label:"Produits"
    },

    {
      key:"stocksauto",
      label:"Stocks"
    },

    {
      key:"rappelsauto",
      label:"Rappels"
    }

  ],

  kpis:[

    {
      key:"clients",
      label:"Clients"
    },

    {
      key:"vehicules",
      label:"Véhicules"
    },

    {
      key:"interventions",
      label:"Interventions"
    },

    {
      key:"factures",
      label:"Factures"
    }

  ],

  quickActions:[

    {

      key:"new-client",

      label:"Nouveau client",

      href:"/clientsauto/nouveau"

    },

    {

      key:"new-rdv",

      label:"Nouveau RDV",

      href:"/rendezvous/nouveau"

    },

    {

      key:"new-intervention",

      label:"Nouvelle intervention",

      href:"/interventionsauto/nouveau"

    }

  ]

},
];