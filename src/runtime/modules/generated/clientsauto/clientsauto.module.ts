import { clientsautoActions } from "./clientsauto.actions";
﻿import type { ERPModule } from "@/runtime/modules/ERPModule";

export const clientsautoModule: ERPModule = {
  metadata: {
    businessCode: {
      field: "codeClient",
      prefix: "CLI",
      sequenceScope: "year",
      padLength: 6,
      readonly: true,
      required: true,
    },
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
        unique: true,
        searchable: true,
        list: { visible: true, order: 1 },
        grid: { cols: 4 }
      },
{
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
        searchable: true,
        list: { visible: true, order: 2 },
        grid: { cols: 4 }
      },
{
        key: "prenom",
        label: "Prénom",
        type: "text",
        required: true,
        list: { visible: true, order: 3 },
        grid: { cols: 4 }
      },
{
        key: "telephone",
        label: "Téléphone",
        type: "text",
        searchable: true,
        list: { visible: true, order: 4 },
        grid: { cols: 6 }
      },
{
        key: "email",
        label: "Email",
        type: "email",
        searchable: true,
        list: { visible: true, order: 5 },
        grid: { cols: 6 }
      },
{
        key: "adresse",
        label: "Adresse",
        type: "textarea",
        list: { visible: false },
        grid: { cols: 12 }
      },
{
        key: "ville",
        label: "Ville",
        type: "text",
        list: { visible: false },
        grid: { cols: 6 }
      },
{
        key: "pays",
        label: "Pays",
        type: "text",
        defaultValue: "Côte d'Ivoire",
        list: { visible: false },
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
        list: { visible: false },
        grid:{ cols:6 }
      },
{
        key:"dateInscription",
        label:"Date inscription",
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
          {
            label:"Actif",
            value:"actif"
          },
            {
              label:"Suspendu",
              value:"suspendu"
            },
          {
            label:"Prospect",
            value:"prospect"
          },
          {
            label:"Inactif",
            value:"inactif"
          },
            {
              label:"Archivé",
              value:"archive"
            }
        ],
        list: { visible: true, order: 6 },
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

  operational: {
    enabled: true,
    title: "Clients",
    subtitle: "Vue opérationnelle des clients, véhicules et suivi atelier.",
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
        icon: "users",
        description: "Nombre total de clients affichés.",
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
        key: "prospects",
        label: "Prospects",
        field: "statut",
        equals: "prospect",
        tone: "orange",
        icon: "user-plus",
      },
    ],
    table: {
      enableSearch: true,
      enableSelection: true,
      enableDensityToggle: true,
      fields: [
        "codeClient",
        "nom",
        "prenom",
        "telephone",
        "email",
        "statut",
      ],
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
      title: "Portefeuille clients",
      type: "summary",
      metrics: [
        {
          key: "total",
          label: "Clients affichés",
          type: "count",
          format: "number",
        },
        {
          key: "actifs",
          label: "Clients actifs",
          type: "countWhere",
          field: "statut",
          equals: "actif",
          format: "number",
        },
        {
          key: "prospects",
          label: "Prospects",
          type: "countWhere",
          field: "statut",
          equals: "prospect",
          format: "number",
        },
      ],
    },
  },

  composition: {
    labelFields: [
      "codeClient",
      "nom",
      "prenom",
      "telephone",
    ],

    children: [
      {
        key: "vehicules",
        moduleKey: "vehicules",
        foreignKey: "clientId",
        title: "Véhicules du client",
        createLabel: "Ajouter un véhicule à ce client",
        displayIn: [
          "detail",
          "edit",
        ],
        position: "after",
        lazy: true,
        mode: "readonly",
        allowCreate: true,
        badgeLabel: "véhicules liés",
        description: "Source de vérité : le champ Client dans chaque fiche véhicule. Cette section affiche les véhicules liés sans modifier la relation.",
        openLabel: "Ouvrir véhicule",
        labelFields: [
          "marque",
          "modele",
        ],
        subtitleFields: [
          "immatriculation",
          "statut",
          "kilometrage",
        ],
      },

      // Q21E_D_CLIENT_RELATIONSHIP_CHILDREN
      {
        key: "rendezvous-client",
        moduleKey: "rendezvous",
        foreignKey: "clientId",
        title: "Rendez-vous du client",
        createLabel: "Ajouter un rendez-vous",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        prefillFromParent: {
          clientId: "id",
        },
        lockFields: ["clientId"],
        labelFields: ["dateRendezVous", "heureRendezVous", "typeService", "statut"],
        subtitleFields: ["vehiculeId", "motif"],
        relations: [
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
        ],
      }],
  },


  actions: clientsautoActions,
workflows:[
      {
        key:"client",
        label:"Cycle client",
        stateField:"statut",
        initialState:"prospect",
        states:[
          {
            key:"prospect",
            label:"Prospect",
            color:"warning"
          },
          {
            key:"actif",
            label:"Actif",
            color:"success"
          },
          {
            key:"suspendu",
            label:"Suspendu",
            color:"warning"
          },
          {
            key:"inactif",
            label:"Inactif",
            color:"default"
          },
          {
            key:"archive",
            label:"Archivé",
            color:"muted"
          }
        ],
        transitions:[
          {
            from:"prospect",
            to:"actif",
            action:"clientsauto.activer"
          },
          {
            from:"actif",
            to:"suspendu",
            action:"clientsauto.suspendre"
          },
          {
            from:"suspendu",
            to:"actif",
            action:"clientsauto.reactiver"
          },
          {
            from:"actif",
            to:"inactif",
            action:"clientsauto.desactiver"
          },
          {
            from:"suspendu",
            to:"inactif",
            action:"clientsauto.desactiver"
          },
          {
            from:"inactif",
            to:"actif",
            action:"clientsauto.reactiver"
          },
          {
            from:"prospect",
            to:"archive",
            action:"clientsauto.archiver"
          },
          {
            from:"actif",
            to:"archive",
            action:"clientsauto.archiver"
          },
          {
            from:"suspendu",
            to:"archive",
            action:"clientsauto.archiver"
          },
          {
            from:"inactif",
            to:"archive",
            action:"clientsauto.archiver"
          },
          {
            from:"archive",
            to:"actif",
            action:"clientsauto.restaurer"
          }
        ]
      }
    ]
  };
