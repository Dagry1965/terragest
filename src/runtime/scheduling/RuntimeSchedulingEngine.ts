import {
  DEFAULT_WORKSPACE_OPENING_HOURS,
  getOpeningDayForDate,
} from "./RuntimeOpeningHours";

import type {
  RuntimeAvailabilitySlot,
  RuntimeDateTimeRange,
  RuntimeOpeningHoursProfile,
} from "./RuntimeSchedulingTypes";

export type RuntimeRecord = Record<string, unknown>;

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

function isCancelledAppointment(record: RuntimeRecord): boolean {
  return asString(record.statut).toLowerCase() === "annule";
}

function sameVehicle(a: RuntimeRecord, b: RuntimeRecord): boolean {
  const vehicleA = asString(a.vehiculeId);
  const vehicleB = asString(b.vehiculeId);

  return Boolean(vehicleA && vehicleB && vehicleA === vehicleB);
}

function rangesOverlap(a: RuntimeAppointmentSlot, b: RuntimeAppointmentSlot): boolean {
  const startA = new Date(a.startAt).getTime();
  const endA = new Date(a.endAt).getTime();
  const startB = new Date(b.startAt).getTime();
  const endB = new Date(b.endAt).getTime();

  if (
    Number.isNaN(startA) ||
    Number.isNaN(endA) ||
    Number.isNaN(startB) ||
    Number.isNaN(endB)
  ) {
    return false;
  }

  return startA < endB && startB < endA;
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
  }): RuntimeAvailabilitySlot[] {
    const profile = params.profile ?? DEFAULT_WORKSPACE_OPENING_HOURS;

    const durationMinutes = Math.max(
      1,
      asNumber(params.durationMinutes, profile.defaultSlotDurationMinutes)
    );

    const normalizedDate = normalizeDateOnly(params.date);

    if (!normalizedDate) {
      return [];
    }

    const date = new Date(normalizedDate + "T00:00:00");
    const openingDay = getOpeningDayForDate(profile, date);

    if (!openingDay || !openingDay.isOpen) {
      return [];
    }

    const slots: RuntimeAvailabilitySlot[] = [];

    for (const period of openingDay.periods) {
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

  static assertWithinOpeningHours(params: {
    date: string;
    time: string;
    durationMinutes?: number;
    profile?: RuntimeOpeningHoursProfile;
  }): SchedulingValidationResult {
    const profile = params.profile ?? DEFAULT_WORKSPACE_OPENING_HOURS;

    const durationMinutes = Math.max(
      1,
      asNumber(params.durationMinutes, profile.defaultSlotDurationMinutes)
    );

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

  static computeAppointmentSlot(record: RuntimeRecord): RuntimeAppointmentSlot {
    if (!hasRealDateAndTime(record)) {
      throw new Error(
        "Impossible de calculer le créneau : dateRendezVous et heureRendezVous sont obligatoires."
      );
    }

    const startDate = buildLocalDateTime(
      asString(record.dateRendezVous),
      asString(record.heureRendezVous)
    );

    if (!startDate) {
      throw new Error(
        "Impossible de calculer le créneau : dateRendezVous ou heureRendezVous invalide."
      );
    }

    const durationMinutes = Math.max(
      1,
      asNumber(record.durationMinutes, RuntimeSchedulingEngine.defaultDurationMinutes)
    );

    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

    return {
      startAt: startDate.toISOString(),
      endAt: endDate.toISOString(),
      durationMinutes,
    };
  }

  static normalizeAppointmentForScheduling(record: RuntimeRecord): RuntimeRecord {
    if (!hasRealDateAndTime(record)) {
      return {
        ...record,
        durationMinutes: asNumber(
          record.durationMinutes,
          RuntimeSchedulingEngine.defaultDurationMinutes
        ),
      };
    }

    const slot = RuntimeSchedulingEngine.computeAppointmentSlot(record);

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
    if (isCancelledAppointment(record)) {
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
      if (!existing || isCancelledAppointment(existing)) return false;

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

  static assertRendezvousCanCreateIntervention(
    rendezvous: RuntimeRecord
  ): SchedulingValidationResult {
    if (!rendezvous) {
      return {
        ok: false,
        reason: "Rendez-vous introuvable.",
      };
    }

    if (isCancelledAppointment(rendezvous)) {
      return {
        ok: false,
        reason: "Impossible de créer une intervention depuis un rendez-vous annulé.",
      };
    }

    if (asString(rendezvous.consumedByInterventionId)) {
      return {
        ok: false,
        reason:
          "Impossible de créer une intervention : ce rendez-vous a déjà été consommé.",
      };
    }

    if (!asString(rendezvous.clientId)) {
      return {
        ok: false,
        reason: "Impossible de créer une intervention : clientId manquant.",
      };
    }

    if (!asString(rendezvous.vehiculeId)) {
      return {
        ok: false,
        reason: "Impossible de créer une intervention : vehiculeId manquant.",
      };
    }

    if (!asString(rendezvous.id)) {
      return {
        ok: false,
        reason: "Impossible de créer une intervention : identifiant rendez-vous manquant.",
      };
    }

    return { ok: true };
  }

  static buildInterventionFromRendezvous(rendezvous: RuntimeRecord): RuntimeRecord {
    const validation = RuntimeSchedulingEngine.assertRendezvousCanCreateIntervention(
      rendezvous
    );

    if (!validation.ok) {
      throw new Error(validation.reason || "Rendez-vous invalide.");
    }

    return {
      clientId: rendezvous.clientId,
      vehiculeId: rendezvous.vehiculeId,
      rendezVousId: rendezvous.id,
      typeIntervention: rendezvous.typeService || "autre",
      dateIntervention: rendezvous.dateRendezVous,
      statut: "ouverte",
    };
  }
}
