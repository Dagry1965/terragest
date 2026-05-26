import type { RuntimeOpeningHoursProfile } from "./RuntimeSchedulingTypes";

export interface SchedulingSlotPolicyInput {
  durationMinutes?: number;
  defaultDurationMinutes?: number;
  slotDurationMinutes?: number;
  bufferMinutes?: number;
  capacity?: number;
  statusField?: string;
  nonBlockingStatuses?: string[];
  openingHoursProfile?: RuntimeOpeningHoursProfile;
}

export interface SchedulingSlotPolicy {
  visibleDurationMinutes: number;
  bufferMinutes: number;
  slotDurationMinutes: number;
  capacity: number;
  statusField: string;
  nonBlockingStatuses: string[];
  openingHoursProfile?: RuntimeOpeningHoursProfile;
}

export const DEFAULT_SCHEDULING_VISIBLE_DURATION_MINUTES = 60;
export const DEFAULT_SCHEDULING_BUFFER_MINUTES = 0;
export const DEFAULT_SCHEDULING_CAPACITY = 1;
export const DEFAULT_SCHEDULING_STATUS_FIELD = "statut";

export const DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES = [
  "annule",
  "annulee",
  "annulé",
  "annulée",
  "cancelled",
  "canceled",
];

function asPositiveInteger(value: unknown, fallback: number): number {
  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

function asNonNegativeInteger(value: unknown, fallback: number): number {
  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

export class SchedulingSlotPolicyResolver {
  static resolve(input: SchedulingSlotPolicyInput = {}): SchedulingSlotPolicy {
    const visibleDurationMinutes = asPositiveInteger(
      input.durationMinutes ??
        input.defaultDurationMinutes ??
        input.slotDurationMinutes,
      DEFAULT_SCHEDULING_VISIBLE_DURATION_MINUTES
    );

    const bufferMinutes = asNonNegativeInteger(
      input.bufferMinutes,
      DEFAULT_SCHEDULING_BUFFER_MINUTES
    );

    const slotDurationMinutes = asPositiveInteger(
      input.slotDurationMinutes,
      visibleDurationMinutes + bufferMinutes
    );

    const capacity = asPositiveInteger(
      input.capacity,
      DEFAULT_SCHEDULING_CAPACITY
    );

    return {
      visibleDurationMinutes,
      bufferMinutes,
      slotDurationMinutes,
      capacity,
      statusField: input.statusField || DEFAULT_SCHEDULING_STATUS_FIELD,
      nonBlockingStatuses:
        input.nonBlockingStatuses && input.nonBlockingStatuses.length > 0
          ? input.nonBlockingStatuses
          : DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES,
      openingHoursProfile: input.openingHoursProfile,
    };
  }

  static isNonBlockingRecord(
    record: Record<string, unknown>,
    policy: SchedulingSlotPolicy
  ): boolean {
    const rawStatus = record[policy.statusField];

    if (rawStatus === undefined || rawStatus === null) {
      return false;
    }

    const status = String(rawStatus).trim().toLowerCase();

    return policy.nonBlockingStatuses
      .map((item) => String(item).trim().toLowerCase())
      .includes(status);
  }
}
