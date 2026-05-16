import type {
  ERPDashboardConfig,
}
from "../ERPDashboardTypes";

export const ERPBusinessDashboardConfig:
  ERPDashboardConfig = {

  key:
    "business-dashboard",

  title:
    "Cockpit TerraGest",

  subtitle:
    "Pilotage opérationnel ERP.",

  widgets: [

    {
      key:
        "terrains-total",

      type:
        "kpi",

      moduleKey:
        "terrains",

      title:
        "Terrains",
    },

    {
      key:
        "exploitations-total",

      type:
        "kpi",

      moduleKey:
        "exploitations",

      title:
        "Exploitations",
    },

    {
      key:
        "contrats-actifs",

      type:
        "kpi",

      moduleKey:
        "contrats",

      title:
        "Contrats actifs",

      filters: [
        {
          field:
            "statutContrat",

          operator:
            "equals",

          value:
            "Actif",
        },
      ],
    },

    {
      key:
        "campagnes-actives",

      type:
        "kpi",

      moduleKey:
        "campagnes",

      title:
        "Campagnes actives",

      filters: [
        {
          field:
            "statutCampagne",

          operator:
            "equals",

          value:
            "En cours",
        },
      ],
    },

    {
      key:
        "stocks-critiques",

      type:
        "alert",

      moduleKey:
        "stocks",

      title:
        "Stocks critiques",

      filters: [
        {
          field:
            "statutStock",

          operator:
            "equals",

          value:
            "Bas",
        },
      ],
    },

    {
      key:
        "timeline-campagnes",

      type:
        "timeline",

      moduleKey:
        "campagnes",

      title:
        "Timeline campagnes",

      dateField:
        "dateFinPrevue",
    },
  ],
};