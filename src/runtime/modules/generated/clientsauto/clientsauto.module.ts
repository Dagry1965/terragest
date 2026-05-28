import type { ERPModule } from "@/runtime/modules/ERPModule";

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
      },
      {
        key: "interventions-client",
        moduleKey: "interventionsauto",
        foreignKey: "clientId",
        title: "Interventions du client",
        createLabel: "Ajouter une intervention",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        prefillFromParent: {
          clientId: "id",
        },
        lockFields: ["clientId"],
        labelFields: ["dateIntervention", "typeIntervention", "statut"],
        subtitleFields: ["vehiculeId", "rendezVousId"],
        totalField: "coutTotal",
        relations: [
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
          {
            field: "rendezVousId",
            moduleKey: "rendezvous",
            labelFields: ["dateRendezVous", "heureRendezVous", "typeService", "statut"],
          },
        ],
      },
      {
        key: "factures-client",
        moduleKey: "facturesauto",
        foreignKey: "clientId",
        title: "Factures du client",
        createLabel: "Ajouter une facture",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        prefillFromParent: {
          clientId: "id",
        },
        lockFields: ["clientId"],
        labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
        subtitleFields: ["vehiculeId", "interventionId", "dateFacture"],
        totalField: "montantTTC",
        relations: [
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
          {
            field: "interventionId",
            moduleKey: "interventionsauto",
            labelFields: ["dateIntervention", "typeIntervention", "statut"],
          },
        ],
      },
      {
        key: "encaissements-client",
        moduleKey: "encaissementsauto",
        foreignKey: "clientId",
        title: "Encaissements du client",
        createLabel: "Ajouter un encaissement",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        prefillFromParent: {
          clientId: "id",
        },
        lockFields: ["clientId"],
        labelFields: ["numeroRecu", "montant", "datePaiement", "statut"],
        subtitleFields: ["factureId", "vehiculeId", "modePaiement"],
        totalField: "montant",
        relations: [
          {
            field: "factureId",
            moduleKey: "facturesauto",
            labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
          },
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
        ],
      }],
  },


  actions: [
    {
      key: "nouveau-rdv-client",
      label: "Nouveau RDV",
      type: "primary",
      href: "/rendezvous/nouveau",
    },
      {
      key: "client360-demo",
      label: "Fiche 360 demo",
      type: "secondary",
      href: "/client360-demo",
    },
],
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
