import type {
  RuntimeOperationalCockpitData,
} from "./RuntimeOperationalCockpitTypes";

export class RuntimeOperationalCockpitResolver {
  static async resolveAmarkhys(): Promise<RuntimeOperationalCockpitData> {
    const now = new Date();

    const dateLabel =
      new Intl.DateTimeFormat("fr-CH", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(now);

    return {
      title: "AMARKHYS Atelier",
      dateLabel,
      greeting: "Bonjour 👋",
      kpis: [
        {
          key: "appointments_today",
          label: "RDV aujourd’hui",
          value: "0",
          tone: "info",
        },
        {
          key: "vehicles_workshop",
          label: "Véhicules en atelier",
          value: "0",
          tone: "success",
        },
        {
          key: "late_interventions",
          label: "Interventions en retard",
          value: "0",
          tone: "default",
        },
        {
          key: "monthly_revenue",
          label: "CA du mois",
          value: "0 CHF",
          tone: "success",
        },
      ],
      upcomingAppointments: [],
      workshopItems: [],
    };
  }
}
