export type RuntimeSchedulingSource =
  | "public"
  | "private"
  | "system";

export type RuntimeSchedulingServiceOption = {
  id: string;
  code: string;
  label: string;
  category?: string;
  description?: string;
  durationMinutes: number;
  price?: number;
  order: number;
  source?: RuntimeSchedulingSource;
};

export type RuntimeSchedulingReservationSummary = {
  id: string;
  sourceModule?: string;
  sourceRecordId?: string;

  date: string;
  startTime: string;
  endTime: string;

  serviceCode?: string;
  serviceLabel?: string;
  durationMinutes: number;

  status?: string;
  clientLabel?: string;
  vehicleLabel?: string;
};

export type RuntimeSchedulingSlotAvailabilityStatus =
  | "available"
  | "limited"
  | "full";

export type RuntimeSchedulingSlotView = {
  date: string;
  startTime: string;
  endTime: string;
  label: string;

  availabilityStatus: RuntimeSchedulingSlotAvailabilityStatus;
  selectable: boolean;

  capacity: number;
  usedCapacity: number;
  remainingCapacity: number;

  serviceCode?: string;
  serviceLabel?: string;
  durationMinutes: number;

  reservations: RuntimeSchedulingReservationSummary[];

  reason?: string;
};

export type RuntimeAppointmentInput = {
  id?: string;
  source?: RuntimeSchedulingSource;

  tenantId?: string;
  workspace?: string;
  workspaceId?: string;
  moduleKey?: string;

  date?: unknown;
  dateRendezVous?: unknown;

  time?: unknown;
  heureRendezVous?: unknown;
  startTime?: unknown;

  durationMinutes?: unknown;
  dureeMinutes?: unknown;

  startAt?: unknown;
  endAt?: unknown;

  service?: unknown;
  serviceCode?: unknown;
  serviceId?: unknown;
  typeService?: unknown;

  status?: unknown;
  statut?: unknown;

  clientId?: unknown;
  clientLabel?: unknown;
  vehiculeId?: unknown;
  vehicleLabel?: unknown;
  vehiculeLabel?: unknown;
};

export type RuntimeNormalizedAppointment = {
  id?: string;
  source: RuntimeSchedulingSource;

  tenantId: string;
  workspace: string;
  moduleKey: string;

  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;

  startAt: string;
  endAt: string;

  serviceCode: string;
  serviceLabel: string;

  status: string;

  clientId?: string;
  clientLabel?: string;
  vehiculeId?: string;
  vehicleLabel?: string;

  raw: RuntimeAppointmentInput;
};

export type RuntimeSchedulingContractContext = {
  tenantId: string;
  workspace: string;
  moduleKey: string;
};
