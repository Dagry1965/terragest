import type { ERPDashboardConfig } from "./ERPDashboardTypes";

export const ERPBusinessAmarkhysDashboardConfig: ERPDashboardConfig = {
  key: "amarkhys-dashboard",
  title: "Cockpit AMARKHYS",
  subtitle:
    "Pilotage garage : leads entrants, clients, véhicules, rendez-vous, interventions, factures, rappels et acquisition.",
  widgets: [
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
      key: "clientsauto-total",
      type: "kpi",
      moduleKey: "clientsauto",
      title: "Clients",
      description: "Base clients et prospects AMARKHYS.",
      href: "/clientsauto",
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
          value: "termine",
        },
      ],
    },
    {
      key: "factures-total",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "Factures",
      description: "Factures atelier générées.",
      href: "/facturesauto",
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
          field: "statut",
          operator: "equals",
          value: "en_attente",
        },
      ],
    },
    {
      key: "factures-payees",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "Factures payées",
      description: "Encaissements validés.",
      href: "/facturesauto",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "payee",
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
      key: "prochains-rdv",
      type: "timeline",
      moduleKey: "rendezvous",
      title: "Prochains rendez-vous",
      description: "Rendez-vous actifs à suivre.",
      labelField: "motif",
      dateField: "dateRendezVous",
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "annule",
        },
      ],
    },
    {
      key: "rappels-prochains",
      type: "timeline",
      moduleKey: "rappelsauto",
      title: "Prochains rappels",
      description: "Actions de relance à venir.",
      labelField: "message",
      dateField: "dateRappel",
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
