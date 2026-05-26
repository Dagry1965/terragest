import {
  DEFAULT_WORKSPACE_OPENING_HOURS,
  getOpeningDayForDate,
} from "./RuntimeOpeningHours";

import type {
  RuntimeAvailabilitySlot,
  RuntimeDateTimeRange,
  RuntimeOpeningHoursProfile,
  RuntimeBooking,
  RuntimeCalendarException,
} from "./RuntimeSchedulingTypes";

import { SchedulingSlotPolicyResolver } from "./SchedulingSlotPolicy";
export type RuntimeRecord = Record<string, unknown>;

interface RuntimeSchedulingFieldConfig {
  dateField: string;
  timeField: string;
  durationField: string;
  startField: string;
  endField: string;
  resourceField?: string;
}

const DEFAULT_RUNTIME_SCHEDULING_FIELD_CONFIG: RuntimeSchedulingFieldConfig = {
  dateField: "dateRendezVous",
  timeField: "heureRendezVous",
  durationField: "durationMinutes",
  startField: "startAt",
  endField: "endAt",
  resourceField: "resourceId",
};

function resolveRuntimeSchedulingFieldConfig(
  config?: Partial<RuntimeSchedulingFieldConfig>
): RuntimeSchedulingFieldConfig {
  return {
    ...DEFAULT_RUNTIME_SCHEDULING_FIELD_CONFIG,
    ...(config || {}),
  };
}

function getRuntimeSchedulingFieldValue(
  record: RuntimeRecord,
  fieldName?: string
): unknown {
  if (!fieldName) return undefined;
  return record[fieldName];
}

function getRuntimeSchedulingFieldString(
  record: RuntimeRecord,
  fieldName?: string
): string {
  return asString(getRuntimeSchedulingFieldValue(record, fieldName));
}

function getRuntimeSchedulingFieldNumber(
  record: RuntimeRecord,
  fieldName?: string,
  fallback = 0
): number {
  return asNumber(getRuntimeSchedulingFieldValue(record, fieldName), fallback);
}

export interface RuntimeAppointmentSlot {
  startAt: string;
  endAt: string;
  durationMinutes: number;
}

export interface AppointmentConflictOptions {
  existingAppointments?: RuntimeRecord[];
  ignoreAppointmentId?: string;
}

export interface SchedulingValidationResult {
  ok: boolean;
  reason?: string;
}

function asString(value: unknown): string {
  if (typeof value === "string") return value.trim();

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (
    value &&
    typeof value === "object" &&
    "seconds" in value &&
    typeof (value as { seconds?: unknown }).seconds === "number"
  ) {
    return new Date(
      Number((value as { seconds: number }).seconds) * 1000
    ).toISOString();
  }

  return "";
}

function asNumber(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }

  return fallback;
}

function hasRealDateAndTime(record: RuntimeRecord): boolean {
  const dateRendezVous = asString(record.dateRendezVous);
  const heureRendezVous = asString(record.heureRendezVous);

  return Boolean(dateRendezVous && heureRendezVous);
}

function normalizeDateOnly(value: string): string {
  if (!value) return "";

  const trimmed = value.trim();

  const yyyyMmDd = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (yyyyMmDd) {
    return yyyyMmDd[1] + "-" + yyyyMmDd[2] + "-" + yyyyMmDd[3];
  }

  const ddMmYyyy = trimmed.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/);
  if (ddMmYyyy) {
    return (
      ddMmYyyy[3] +
      "-" +
      String(Number(ddMmYyyy[2])).padStart(2, "0") +
      "-" +
      String(Number(ddMmYyyy[1])).padStart(2, "0")
    );
  }

  const date = new Date(trimmed);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return (
    String(date.getFullYear()).padStart(4, "0") +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
}

function normalizeTimeOnly(value: string): string {
  if (!value) return "";

  const trimmed = value.trim();

  const isoTime = trimmed.match(/T(\d{1,2}):(\d{2})/);
  if (isoTime) {
    return (
      String(Math.max(0, Math.min(23, Number(isoTime[1])))).padStart(2, "0") +
      ":" +
      String(Math.max(0, Math.min(59, Number(isoTime[2])))).padStart(2, "0")
    );
  }

  const colonTime = trimmed.match(/^(\d{1,2}):(\d{2})/);
  if (colonTime) {
    return (
      String(Math.max(0, Math.min(23, Number(colonTime[1])))).padStart(2, "0") +
      ":" +
      String(Math.max(0, Math.min(59, Number(colonTime[2])))).padStart(2, "0")
    );
  }

  const frenchTime = trimmed.match(/^(\d{1,2})\s*h\s*(\d{0,2})$/i);
  if (frenchTime) {
    return (
      String(Math.max(0, Math.min(23, Number(frenchTime[1])))).padStart(2, "0") +
      ":" +
      String(Math.max(0, Math.min(59, Number(frenchTime[2] || 0)))).padStart(2, "0")
    );
  }

  const compactTime = trimmed.match(/^(\d{1,2})(\d{2})$/);
  if (compactTime) {
    return (
      String(Math.max(0, Math.min(23, Number(compactTime[1])))).padStart(2, "0") +
      ":" +
      String(Math.max(0, Math.min(59, Number(compactTime[2])))).padStart(2, "0")
    );
  }

  const date = new Date(trimmed);

  if (!Number.isNaN(date.getTime())) {
    return (
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0")
    );
  }

  return "";
}

function buildLocalDateTime(dateOnly: string, timeOnly: string): Date | null {
  const normalizedDate = normalizeDateOnly(dateOnly);
  const normalizedTime = normalizeTimeOnly(timeOnly);

  if (!normalizedDate || !normalizedTime) {
    return null;
  }

  const dateParts = normalizedDate.split("-").map(Number);
  const timeParts = normalizedTime.split(":").map(Number);

  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  const hour = timeParts[0];
  const minute = timeParts[1];

  const date = new Date(
    year,
    month - 1,
    day,
    hour,
    minute,
    0,
    0
  );

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function isNonBlockingSchedulingRecord(record: RuntimeRecord): boolean {
  const policy = SchedulingSlotPolicyResolver.resolve();
  return SchedulingSlotPolicyResolver.isNonBlockingRecord(record, policy);
}

function sameVehicle(
  a: RuntimeRecord,
  b: RuntimeRecord,
  resourceField?: string
): boolean {
  const resolvedResourceField =
    resourceField || resolveRuntimeSchedulingFieldConfig().resourceField;

  const resourceA = getRuntimeSchedulingFieldString(a, resolvedResourceField);
  const resourceB = getRuntimeSchedulingFieldString(b, resolvedResourceField);

  return Boolean(resourceA && resourceB && resourceA === resourceB);
}

function rangesOverlap(
  left: {
    startAt: string | Date;
    endAt: string | Date;
    durationMinutes?: unknown;
  },
  right: {
    startAt: string | Date;
    endAt: string | Date;
    durationMinutes?: unknown;
  }
): boolean {
  const leftStart =
    left.startAt instanceof Date
      ? left.startAt.getTime()
      : new Date(left.startAt).getTime();

  const leftEnd =
    left.endAt instanceof Date
      ? left.endAt.getTime()
      : new Date(left.endAt).getTime();

  const rightStart =
    right.startAt instanceof Date
      ? right.startAt.getTime()
      : new Date(right.startAt).getTime();

  const rightEnd =
    right.endAt instanceof Date
      ? right.endAt.getTime()
      : new Date(right.endAt).getTime();

  if (
    !Number.isFinite(leftStart) ||
    !Number.isFinite(leftEnd) ||
    !Number.isFinite(rightStart) ||
    !Number.isFinite(rightEnd)
  ) {
    return false;
  }

  return leftStart < rightEnd && rightStart < leftEnd;
}


function parseRuntimeTimeToMinutes(value: string): number {
  const normalized = normalizeTimeOnly(value);

  if (!normalized) {
    throw new Error(`Invalid runtime time value: ${value}`);
  }

  const [hours, minutes] = normalized.split(":").map(Number);

  return hours * 60 + minutes;
}

function formatRuntimeMinutesToTime(value: number): string {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0")
  );
}

function buildRuntimeDateTimeIso(dateOnly: string, timeOnly: string): string {
  const date = buildLocalDateTime(dateOnly, timeOnly);

  if (!date) {
    throw new Error(
      "Impossible de construire le créneau : date ou heure invalide."
    );
  }

  return date.toISOString();
}

export class RuntimeSchedulingEngine {
  static readonly defaultDurationMinutes = 60;

  static buildDateTimeRange(params: {
    date: string;
    time: string;
    durationMinutes?: number;
  }): RuntimeDateTimeRange {
    // Q22B2_GENERIC_OPENING_HOURS
    const durationMinutes = Math.max(
      1,
      asNumber(params.durationMinutes, RuntimeSchedulingEngine.defaultDurationMinutes)
    );

    const startAt = buildRuntimeDateTimeIso(params.date, params.time);
    const startDate = new Date(startAt);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

    return {
      startAt,
      endAt: endDate.toISOString(),
    };
  }

  static getAvailableSlotsForDate(params: {
    date: string;
    durationMinutes?: number;
    profile?: RuntimeOpeningHoursProfile;
    calendarExceptions?: RuntimeCalendarException[];
  }): RuntimeAvailabilitySlot[] {
    const profile = params.profile ?? DEFAULT_WORKSPACE_OPENING_HOURS;

    const slotPolicy = SchedulingSlotPolicyResolver.resolve({
      durationMinutes: params.durationMinutes,
      defaultDurationMinutes: profile.defaultSlotDurationMinutes,
      openingHoursProfile: profile,
    });

    const durationMinutes = slotPolicy.slotDurationMinutes;

    const normalizedDate = normalizeDateOnly(params.date);

    if (!normalizedDate) {
      return [];
    }

    const date = new Date(normalizedDate + "T00:00:00");
    const openingDay = getOpeningDayForDate(profile, date);

    const exception =
      (params.calendarExceptions ?? []).find(
        (item) => item.date === normalizedDate
      );

    if (exception?.isClosed) {
      return [];
    }

    if (!openingDay || !openingDay.isOpen) {
      return [];
    }

    // Q22F2A_APPLY_CALENDAR_EXCEPTIONS
    // Calendar exception can override the standard opening periods for this date.
    const periods =
      exception?.periods && exception.periods.length > 0
        ? exception.periods
        : openingDay.periods;

    const slots: RuntimeAvailabilitySlot[] = [];

    for (const period of periods) {
      const periodStart = parseRuntimeTimeToMinutes(period.start);
      const periodEnd = parseRuntimeTimeToMinutes(period.end);

      for (
        let cursor = periodStart;
        cursor + durationMinutes <= periodEnd;
        cursor += durationMinutes
      ) {
        const start = formatRuntimeMinutesToTime(cursor);
        const end = formatRuntimeMinutesToTime(cursor + durationMinutes);

        slots.push({
          start,
          end,
          label: start + " - " + end,
          available: true,
        });
      }
    }

    return slots;
  }


  static getAvailableSlotsWithBookings(params: {
    date: string;
    durationMinutes?: number;
    profile?: RuntimeOpeningHoursProfile;
    bookings?: RuntimeBooking[];
    ignoreBookingId?: string;
    bufferMinutes?: number;
    calendarExceptions?: RuntimeCalendarException[];
    capacity?: number;
  }): RuntimeAvailabilitySlot[] {
    // Q22D1_BOOKING_AWARE_AVAILABILITY
    // Generic ERP availability: opening-hours slots minus existing bookings.
    const slotPolicy = SchedulingSlotPolicyResolver.resolve({
      durationMinutes: params.durationMinutes,
      bufferMinutes: params.bufferMinutes,
      capacity: params.capacity,
      openingHoursProfile: params.profile,
    });

    const visibleDurationMinutes = slotPolicy.visibleDurationMinutes;
    const bufferMinutes = slotPolicy.bufferMinutes;
    const slotDurationMinutes = slotPolicy.slotDurationMinutes;
const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
      date: params.date,
      durationMinutes: slotDurationMinutes,
      profile: params.profile,
      calendarExceptions: params.calendarExceptions,
    });

    const capacity = slotPolicy.capacity;

    const bookings = params.bookings ?? [];
    const ignoredId = asString(params.ignoreBookingId);

    return slots.map((slot) => {
      const slotRange = RuntimeSchedulingEngine.buildDateTimeRange({
        date: params.date,
        time: slot.start,
        durationMinutes: slotDurationMinutes,
      });

      let usedCapacity = 0;

      const overlappingBookings = bookings.filter((booking) => {
        if (!booking) {
          return false;
        }

        if (
          ignoredId &&
          asString(booking.id) === ignoredId
        ) {
          return false;
        }

        if (
          !asString(booking.startAt) ||
          !asString(booking.endAt)
        ) {
          return false;
        }

        const bookingStart =
          new Date(asString(booking.startAt));

        const bookingEnd =
          new Date(asString(booking.endAt));

        const bookingEndWithBuffer =
          new Date(
            bookingEnd.getTime() +
            bufferMinutes * 60 * 1000
          );

        return rangesOverlap(
          {
            startAt: slotRange.startAt,
            endAt: slotRange.endAt,
            durationMinutes: slotDurationMinutes,
          },
          {
            // Q22F1_SCHEDULING_BUFFER_MINUTES
            // The visible booking ends at endAt, but the blocked range may include bufferMinutes.
            startAt: bookingStart.toISOString(),
            endAt: bookingEndWithBuffer.toISOString(),
            durationMinutes: slotDurationMinutes,
          }
        );
      });

      usedCapacity = overlappingBookings.length;

      const remainingCapacity =
        Math.max(capacity - usedCapacity, 0);

      const available =
        remainingCapacity > 0;

      return {
        // Q22F3A_CAPACITY_AWARE_AVAILABILITY
        ...slot,
        available,
        capacity,
        usedCapacity,
        remainingCapacity,
        reason: available
          ? undefined
          : "Créneau complet",
      };
    });
  }

  static assertWithinOpeningHours(params: {
    date: string;
    time: string;
    durationMinutes?: number;
    profile?: RuntimeOpeningHoursProfile;
    calendarExceptions?: RuntimeCalendarException[];
  }): SchedulingValidationResult {
    const profile = params.profile ?? DEFAULT_WORKSPACE_OPENING_HOURS;

    const slotPolicy = SchedulingSlotPolicyResolver.resolve({
      durationMinutes: params.durationMinutes,
      defaultDurationMinutes: profile.defaultSlotDurationMinutes,
      openingHoursProfile: profile,
    });

    const durationMinutes = slotPolicy.slotDurationMinutes;

    const normalizedTime = normalizeTimeOnly(params.time);

    if (!normalizedTime) {
      return {
        ok: false,
        reason: "L'heure sélectionnée est invalide.",
      };
    }

    const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
      date: params.date,
      durationMinutes,
      profile,
      calendarExceptions: params.calendarExceptions,
    });

    const allowed = slots.some((slot) => slot.start === normalizedTime);

    if (!allowed) {
      return {
        ok: false,
        reason:
          "Le créneau sélectionné est en dehors des horaires d'ouverture.",
      };
    }

    return { ok: true };
  }

  static computeAppointmentSlot(
    record: RuntimeRecord,
    config?: Partial<RuntimeSchedulingFieldConfig>
  ): RuntimeAppointmentSlot {
    const fieldConfig = resolveRuntimeSchedulingFieldConfig(config);
    if (!hasRealDateAndTime(record)) {
      throw new Error(
        "Impossible de calculer le créneau : dateRendezVous et heureRendezVous sont obligatoires."
      );
    }

    const startDate = buildLocalDateTime(
      getRuntimeSchedulingFieldString(record, fieldConfig.dateField),
      getRuntimeSchedulingFieldString(record, fieldConfig.timeField)
    );

    if (!startDate) {
      throw new Error(
        "Impossible de calculer le créneau : date ou heure de planification invalide."
      );
    }

    const durationMinutes = Math.max(
      1,
      getRuntimeSchedulingFieldNumber(
      record,
      fieldConfig.durationField,
      RuntimeSchedulingEngine.defaultDurationMinutes
    )
    );

    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

    return {
      startAt: startDate.toISOString(),
      endAt: endDate.toISOString(),
      durationMinutes,
    };
  }

  static normalizeAppointmentForScheduling(record: RuntimeRecord,
    config?: Partial<RuntimeSchedulingFieldConfig>): RuntimeRecord {
    if (!hasRealDateAndTime(record)) {
      return {
        ...record,
        durationMinutes: asNumber(
          record.durationMinutes,
          RuntimeSchedulingEngine.defaultDurationMinutes
        ),
      };
    }

    const slot = RuntimeSchedulingEngine.computeAppointmentSlot(record, config);

    return {
      ...record,
      durationMinutes: slot.durationMinutes,
      startAt: slot.startAt,
      endAt: slot.endAt,
    };
  }

  static assertNoAppointmentConflict(
    record: RuntimeRecord,
    options: AppointmentConflictOptions = {}
  ): SchedulingValidationResult {
    if (isNonBlockingSchedulingRecord(record)) {
      return { ok: true };
    }

    if (!hasRealDateAndTime(record)) {
      return {
        ok: false,
        reason:
          "Le rendez-vous doit avoir une date et une heure réelles avant vérification de conflit.",
      };
    }

    const currentSlot = RuntimeSchedulingEngine.computeAppointmentSlot(record);
    const currentId = asString(record.id);
    const ignoredId = options.ignoreAppointmentId || currentId;

    const conflictingAppointment = (options.existingAppointments || []).find((existing) => {
      if (!existing || isNonBlockingSchedulingRecord(existing)) return false;

      const existingId = asString(existing.id);

      if (ignoredId && existingId === ignoredId) {
        return false;
      }

      if (!sameVehicle(record, existing)) {
        return false;
      }

      if (!hasRealDateAndTime(existing) && (!existing.startAt || !existing.endAt)) {
        return false;
      }

      const existingSlot =
        existing.startAt && existing.endAt
          ? {
              startAt: asString(existing.startAt),
              endAt: asString(existing.endAt),
              durationMinutes: asNumber(
                existing.durationMinutes,
                RuntimeSchedulingEngine.defaultDurationMinutes
              ),
            }
          : RuntimeSchedulingEngine.computeAppointmentSlot(existing);

      return rangesOverlap(currentSlot, existingSlot);
    });

    if (conflictingAppointment) {
      return {
        ok: false,
        reason:
          "Conflit de planning : ce véhicule possède déjà un rendez-vous sur ce créneau.",
      };
    }

    return { ok: true };
  }

}
