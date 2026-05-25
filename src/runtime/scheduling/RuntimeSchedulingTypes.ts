export type RuntimeWeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface RuntimeTimeRange {
  start: string;
  end: string;
}

export interface RuntimeDateTimeRange {
  startAt: string;
  endAt: string;
}

export interface RuntimeOpeningPeriod {
  start: string;
  end: string;
}

export interface RuntimeOpeningDay {
  day: RuntimeWeekDay;
  isOpen: boolean;
  periods: RuntimeOpeningPeriod[];
}

export interface RuntimeOpeningHoursProfile {
  key: string;
  label: string;
  timezone?: string;
  defaultSlotDurationMinutes: number;
  days: RuntimeOpeningDay[];
}

export interface RuntimeSchedulableResource {
  id: string;
  type: string;
  label?: string;
  capacity?: number;
}

export interface RuntimeSchedulingContext {
  tenantId?: string;
  workspaceId?: string;
  moduleKey?: string;
  resourceType?: string;
  resourceId?: string;
  resourceField?: string;
}

export interface RuntimeAvailabilitySlot {
  start: string;
  end: string;
  label: string;
  available: boolean;
  capacity?: number;
}

export interface RuntimeBooking {
  id?: string;
  resourceId?: string;
  resourceType?: string;
  startAt: string;
  endAt: string;
  status?: string;
}

export interface RuntimeCalendarException {
  // Q22F2A_RUNTIME_CALENDAR_EXCEPTION
  // Generic ERP calendar exception: close or override opening periods for a specific date.
  date: string;
  isClosed?: boolean;
  periods?: RuntimeOpeningPeriod[];
  reason?: string;
}
