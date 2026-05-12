import type { ERPDashboardConfig } from "./ERPDashboardTypes";

export const ERPBusinessDashboardConfig: ERPDashboardConfig = {
  key: "business-dashboard",
  title: "Cockpit TerraGest",
  subtitle:
    "Pilotage ERP des terrains, contrats, exploitations, campagnes, stocks et actifs.",
  widgets: [
    {
      key: "terrains-total",
      type: "kpi",
      moduleKey: "terrains",
      title: "Terrains",
      href: "/terrains",
    },
    {
      key: "exploitations-total",
      type: "kpi",
      moduleKey: "exploitations",
      title: "Exploitations",
      href: "/exploitations",
    },
    {
      key: "contrats-actifs",
      type: "kpi",
      moduleKey: "contrats",
      title: "Contrats actifs",
      href: "/contrats",
      filters: [
        {
          field: "statutContrat",
          operator: "equals",
          value: "Actif",
        },
      ],
    },
    {
      key: "campagnes-actives",
      type: "kpi",
      moduleKey: "campagnes",
      title: "Campagnes actives",
      href: "/campagnes",
      filters: [
        {
          field: "statutCampagne",
          operator: "equals",
          value: "En cours",
        },
      ],
    },
    {
      key: "stocks-bas",
      type: "kpi",
      moduleKey: "stocks",
      title: "Stocks bas",
      href: "/stocks",
      filters: [
        {
          field: "statutStock",
          operator: "equals",
          value: "Bas",
        },
      ],
    },
    {
      key: "actifs-maintenance",
      type: "kpi",
      moduleKey: "actifs",
      title: "Actifs maintenance",
      href: "/actifs",
      filters: [
        {
          field: "statutActif",
          operator: "equals",
          value: "Maintenance",
        },
      ],
    },
    {
      key: "contrats-expiration",
      type: "alert",
      moduleKey: "contrats",
      title: "Contrats proches expiration",
      labelField: "code",
      dateField: "dateFin",
      level: "warning",
      filters: [
        {
          field: "statutContrat",
          operator: "equals",
          value: "Actif",
        },
        {
          field: "dateFin",
          operator: "lteDaysFromNow",
          value: 30,
        },
      ],
    },
    {
      key: "timeline-campagnes",
      type: "timeline",
      moduleKey: "campagnes",
      title: "Timeline campagnes",
      labelField: "nom",
      dateField: "dateFinPrevue",
      filters: [
        {
          field: "statutCampagne",
          operator: "notEquals",
          value: "ArchivÃ©e",
        },
      ],
    },
  ],
};