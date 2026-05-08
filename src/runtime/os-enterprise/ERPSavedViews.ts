import type { ERPSavedView } from "./ERPSavedView";

export class ERPSavedViews {
  static views(): ERPSavedView[] {
    return [
      {
        id: "view-operations",
        label: "Vue operations",
        description: "Vue globale des operations actives.",
        href: "/dashboard",
      },
      {
        id: "view-maintenance",
        label: "Vue maintenance",
        description: "Suivi des equipements et interventions.",
        href: "/materiels",
      },
      {
        id: "view-stocks",
        label: "Vue stocks",
        description: "Surveillance des niveaux et alertes.",
        href: "/stocks",
      },
    ];
  }
}