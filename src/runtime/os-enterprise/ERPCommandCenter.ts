import type { ERPCommand } from "./ERPCommand";

export class ERPCommandCenter {
  static commands(): ERPCommand[] {
    return [
      {
        id: "dashboard",
        label: "Ouvrir le dashboard",
        description: "Acceder au cockpit principal.",
        href: "/dashboard",
        group: "Navigation",
      },
      {
        id: "exploitations",
        label: "Ouvrir Exploitations",
        description: "Piloter les exploitations.",
        href: "/exploitations",
        group: "Modules",
      },
      {
        id: "materiels",
        label: "Ouvrir Materiels",
        description: "Suivre les equipements.",
        href: "/materiels",
        group: "Modules",
      },
      {
        id: "stocks",
        label: "Ouvrir Stocks",
        description: "Superviser les stocks.",
        href: "/stocks",
        group: "Modules",
      },
      {
        id: "audit",
        label: "Consulter les audits",
        description: "Verifier les traces operationnelles.",
        href: "/exploitations/audit",
        group: "Controle",
      },
    ];
  }
}