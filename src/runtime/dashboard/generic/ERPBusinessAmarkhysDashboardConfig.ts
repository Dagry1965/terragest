import type { ERPDashboardConfig } from "./ERPDashboardTypes";

export const ERPBusinessAmarkhysDashboardConfig: ERPDashboardConfig = {
  key: "amarkhys-dashboard",
  title: "Cockpit AMARKHYS",
  subtitle:
    "Pilotage garage : leads entrants, clients, véhicules, rendez-vous, interventions, factures, rappels, activité atelier et performance financière.",
  widgets: [
    {
      key: "quick-actions",
      type: "quickActions",
      title: "Actions rapides",
      description: "Accès direct aux opérations quotidiennes du garage.",
      actions: [
        {
          label: "Nouveau rendez-vous",
          href: "/rendezvous/nouveau",
          description: "Créer un rendez-vous manuel.",
          tone: "primary",
        },
        {
          label: "Clients",
          href: "/clientsauto",
          description: "Voir les prospects et clients.",
        },
        {
          label: "Interventions",
          href: "/interventionsauto",
          description: "Suivre l’activité atelier.",
        },
        {
          label: "Factures",
          href: "/facturesauto",
          description: "Consulter la facturation.",
        },
      ],
    },
    {
      key: "conversion-funnel",
      type: "funnel",
      title: "Funnel garage",
      description:
        "Lecture du parcours commercial et opérationnel : lead, rendez-vous, intervention, facture, paiement.",
      steps: [
        {
          key: "leads",
          label: "Leads",
          moduleKey: "clientsauto",
          href: "/clientsauto",
          filters: [
            {
              field: "source",
              operator: "equals",
              value: "site_public",
            },
          ],
        },
        {
          key: "rdv",
          label: "RDV",
          moduleKey: "rendezvous",
          href: "/rendezvous",
        },
        {
          key: "interventions",
          label: "Interventions",
          moduleKey: "interventionsauto",
          href: "/interventionsauto",
        },
        {
          key: "factures",
          label: "Factures",
          moduleKey: "facturesauto",
          href: "/facturesauto",
        },
        {
          key: "paiements",
          label: "Payées",
          moduleKey: "facturesauto",
          href: "/facturesauto",
          filters: [
            {
              field: "statutPaiement",
              operator: "equals",
              value: "paye",
            },
          ],
        },
      ],
    },
    {
      key: "ca-total-ttc",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "CA total TTC",
      description: "Montant TTC total des factures atelier.",
      href: "/facturesauto",
      aggregation: "sum",
      sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],
      valueSuffix: "FCFA",
    },
    {
      key: "ca-encaisse",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "CA encaissé",
      description: "Montant TTC des factures payées.",
      href: "/facturesauto",
      aggregation: "sum",
      sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],
      valueSuffix: "FCFA",
      filters: [
        {
          field: "statutPaiement",
          operator: "equals",
          value: "paye",
        },
      ],
    },
    {
      key: "ca-en-attente",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "CA en attente",
      description: "Montant TTC des factures non encore payées.",
      href: "/facturesauto",
      aggregation: "sum",
      sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],
      valueSuffix: "FCFA",
      filters: [
        {
          field: "statutPaiement",
          operator: "notEquals",
          value: "paye",
        },
      ],
    },
    {
      key: "leads-site-public",
      type: "kpi",
      moduleKey: "clientsauto",
      title: "Leads site public",
      description: "Prospects créés depuis le formulaire public.",
      href: "/clientsauto",
      filters: [
        {
          field: "source",
          operator: "equals",
          value: "site_public",
        },
      ],
    },
    {
      key: "vehicules-total",
      type: "kpi",
      moduleKey: "vehicules",
      title: "Véhicules",
      description: "Véhicules suivis dans le garage.",
      href: "/vehicules",
    },
    {
      key: "rdv-planifies",
      type: "kpi",
      moduleKey: "rendezvous",
      title: "RDV planifiés",
      description: "Rendez-vous à traiter ou confirmer.",
      href: "/rendezvous",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "planifie",
        },
      ],
    },
    {
      key: "rdv-confirmes",
      type: "kpi",
      moduleKey: "rendezvous",
      title: "RDV confirmés",
      description: "Rendez-vous confirmés par le garage.",
      href: "/rendezvous",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "confirme",
        },
      ],
    },
    {
      key: "interventions-en-cours",
      type: "kpi",
      moduleKey: "interventionsauto",
      title: "Interventions en cours",
      description: "Travaux actuellement ouverts à l’atelier.",
      href: "/interventionsauto",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "en_cours",
        },
      ],
    },
    {
      key: "interventions-terminees",
      type: "kpi",
      moduleKey: "interventionsauto",
      title: "Interventions terminées",
      description: "Travaux finalisés.",
      href: "/interventionsauto",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "terminee",
        },
      ],
    },
    {
      key: "factures-en-attente",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "Factures en attente",
      description: "Factures non encore payées.",
      href: "/facturesauto",
      filters: [
        {
          field: "statutPaiement",
          operator: "equals",
          value: "en_attente",
        },
      ],
    },
    {
      key: "factures-partielles",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "Paiements partiels",
      description: "Factures partiellement réglées.",
      href: "/facturesauto",
      filters: [
        {
          field: "statutPaiement",
          operator: "equals",
          value: "partiel",
        },
      ],
    },
    {
      key: "factures-payees",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "Factures payées",
      description: "Factures encaissées.",
      href: "/facturesauto",
      filters: [
        {
          field: "statutPaiement",
          operator: "equals",
          value: "paye",
        },
      ],
    },
    {
      key: "rappels-a-traiter",
      type: "kpi",
      moduleKey: "rappelsauto",
      title: "Rappels à traiter",
      description: "Relances client et actions de suivi à exécuter.",
      href: "/rappelsauto",
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "traite",
        },
      ],
    },
    {
      key: "derniers-leads",
      type: "activity",
      moduleKey: "clientsauto",
      title: "Derniers leads entrants",
      description: "Prospects créés depuis le site public.",
      labelField: "nom",
      dateField: "createdAt",
      href: "/clientsauto",
      limit: 6,
      filters: [
        {
          field: "source",
          operator: "equals",
          value: "site_public",
        },
      ],
    },
    {
      key: "derniers-rdv-publics",
      type: "activity",
      moduleKey: "rendezvous",
      title: "Derniers RDV publics",
      description: "Demandes issues du formulaire public.",
      labelField: "motif",
      dateField: "dateRendezVous",
      href: "/rendezvous",
      limit: 6,
      filters: [
        {
          field: "source",
          operator: "equals",
          value: "site_public",
        },
      ],
    },
    {
      key: "dernieres-factures",
      type: "activity",
      moduleKey: "facturesauto",
      title: "Dernières factures",
      description: "Factures atelier récentes.",
      labelField: "numeroFacture",
      dateField: "dateFacture",
      href: "/facturesauto",
      limit: 6,
    },
    {
      key: "prochains-rappels",
      type: "timeline",
      moduleKey: "rappelsauto",
      title: "Prochains rappels",
      description: "Actions de relance à venir.",
      labelField: "message",
      dateField: "dateRappel",
      href: "/rappelsauto",
      limit: 8,
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "traite",
        },
      ],
    },
  ],
};
