import type { ERPDashboardConfig } from "./ERPDashboardTypes";

export const ERPBusinessAmarkhysDashboardConfig: ERPDashboardConfig = {
  key: "amarkhys-dashboard",
  title: "Cockpit AMARKHYS",
  subtitle:
    "Pilotage garage : clients, véhicules, rendez-vous, interventions, factures, rappels et acquisition.",
  widgets: [
    {
      key: "clientsauto-total",
      type: "kpi",
      moduleKey: "clientsauto",
      title: "Clients",
      href: "/clientsauto",
    },
    {
      key: "vehicules-total",
      type: "kpi",
      moduleKey: "vehicules",
      title: "Véhicules",
      href: "/vehicules",
    },
    {
      key: "rdv-total",
      type: "kpi",
      moduleKey: "rendezvous",
      title: "RDV",
      href: "/rendezvous",
    },
    {
      key: "rdv-planifies",
      type: "kpi",
      moduleKey: "rendezvous",
      title: "RDV planifiés",
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
      key: "interventions-total",
      type: "kpi",
      moduleKey: "interventionsauto",
      title: "Interventions",
      href: "/interventionsauto",
    },
    {
      key: "interventions-terminees",
      type: "kpi",
      moduleKey: "interventionsauto",
      title: "Interventions terminées",
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
      href: "/facturesauto",
    },
    {
      key: "factures-payees",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "Factures payées",
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
      key: "rappels-total",
      type: "kpi",
      moduleKey: "rappelsauto",
      title: "Rappels",
      href: "/rappelsauto",
    },
    {
      key: "prochains-rdv",
      type: "timeline",
      moduleKey: "rendezvous",
      title: "Prochains rendez-vous",
      labelField: "typeService",
      dateField: "dateRendezVous",
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "annule",
        },
      ],
    },
  ],
};