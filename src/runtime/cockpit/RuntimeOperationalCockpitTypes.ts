export type RuntimeCockpitKpi = {
  key: string;
  label: string;
  value: string;
  tone?: "default" | "success" | "warning" | "danger" | "info";
};

export type RuntimeCockpitAppointment = {
  id: string;
  time: string;
  clientLabel: string;
  vehicleLabel: string;
  serviceLabel: string;
  status?: string;
};

export type RuntimeCockpitWorkshopItem = {
  id: string;
  vehicleLabel: string;
  clientLabel: string;
  status: string;
  durationLabel?: string;
};

export type RuntimeOperationalCockpitData = {
  title: string;
  dateLabel: string;
  greeting: string;
  kpis: RuntimeCockpitKpi[];
  upcomingAppointments: RuntimeCockpitAppointment[];
  workshopItems: RuntimeCockpitWorkshopItem[];
};
