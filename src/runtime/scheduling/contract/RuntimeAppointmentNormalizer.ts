import {
  RuntimeSchedulingEngine,
} from "@/runtime/scheduling/RuntimeSchedulingEngine";

import type {
  RuntimeAppointmentInput,
  RuntimeNormalizedAppointment,
  RuntimeSchedulingServiceOption,
  RuntimeSchedulingSource,
} from "./RuntimeSchedulingContractTypes";

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown, fallback: number): number {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeTextCode(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizeDateOnly(value: unknown): string {
  const raw = value;

  if (typeof raw === "string") {
    const trimmed = raw.trim();

    const yyyyMmDd =
      trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);

    if (yyyyMmDd) {
      return (
        yyyyMmDd[1] +
        "-" +
        String(Number(yyyyMmDd[2])).padStart(2, "0") +
        "-" +
        String(Number(yyyyMmDd[3])).padStart(2, "0")
      );
    }

    const ddMmYyyy =
      trimmed.match(/^(\d{1,2})[\/. -](\d{1,2})[\/. -](\d{4})$/);

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

    if (!Number.isNaN(date.getTime())) {
      return (
        String(date.getFullYear()).padStart(4, "0") +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0")
      );
    }
  }

  if (
    raw &&
    typeof raw === "object" &&
    "seconds" in raw &&
    typeof (raw as { seconds?: unknown }).seconds === "number"
  ) {
    const date =
      new Date(Number((raw as { seconds: number }).seconds) * 1000);

    return (
      String(date.getFullYear()).padStart(4, "0") +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  }

  return "";
}

function normalizeTimeOnly(value: unknown): string {
  const raw =
    asString(value)
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace("h", ":");

  if (!raw) {
    return "";
  }

  const isoTime =
    raw.match(/T(\d{1,2}):(\d{2})/);

  if (isoTime) {
    return (
      String(Number(isoTime[1])).padStart(2, "0") +
      ":" +
      String(Number(isoTime[2])).padStart(2, "0")
    );
  }

  const match =
    raw.match(/^(\d{1,2})(?::(\d{1,2}))?$/);

  if (!match) {
    return "";
  }

  const hour = Number(match[1]);
  const minute = Number(match[2] ?? "0");

  if (
    !Number.isFinite(hour) ||
    !Number.isFinite(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return "";
  }

  return String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0");
}

function resolveService(
  input: RuntimeAppointmentInput,
  services: RuntimeSchedulingServiceOption[]
): RuntimeSchedulingServiceOption {
  const raw =
    asString(input.serviceCode) ||
    asString(input.serviceId) ||
    asString(input.typeService) ||
    asString(input.service) ||
    "autre";

  const normalized =
    normalizeTextCode(raw);

  const found =
    services.find((service) =>
      service.code === raw ||
      service.id === raw ||
      service.label === raw ||
      normalizeTextCode(service.code) === normalized ||
      normalizeTextCode(service.label) === normalized
    );

  if (found) {
    return found;
  }

  return {
    id: normalized || "autre",
    code: normalized || "autre",
    label: raw || "Autre",
    durationMinutes: 60,
    order: 999,
  };
}

export class RuntimeAppointmentNormalizer {
  static normalize(
    input: RuntimeAppointmentInput,
    params: {
      source?: RuntimeSchedulingSource;
      tenantId?: string;
      workspace?: string;
      moduleKey?: string;
      services?: RuntimeSchedulingServiceOption[];
    } = {}
  ): RuntimeNormalizedAppointment | null {
    const services =
      params.services ?? [];

    const service =
      resolveService(input, services);

    const date =
      normalizeDateOnly(input.dateRendezVous ?? input.date);

    const startTime =
      normalizeTimeOnly(
        input.heureRendezVous ??
          input.startTime ??
          input.time ??
          input.startAt
      );

    const durationMinutes =
      Math.max(
        1,
        asNumber(
          input.durationMinutes ??
            input.dureeMinutes ??
            service.durationMinutes,
          service.durationMinutes || 60
        )
      );

    if (!date || !startTime) {
      return null;
    }

    const range =
      RuntimeSchedulingEngine.buildDateTimeRange({
        date,
        time: startTime,
        durationMinutes,
      });

    const endTime =
      normalizeTimeOnly(range.endAt);

    return {
      id: asString(input.id) || undefined,
      source: params.source ?? input.source ?? "system",

      tenantId:
        params.tenantId ??
        asString(input.tenantId) ??
        "runtime",

      workspace:
        params.workspace ??
        asString(input.workspace) ??
        asString(input.workspaceId) ??
        "default",

      moduleKey:
        params.moduleKey ??
        asString(input.moduleKey) ??
        "rendezvous",

      date,
      startTime,
      endTime,
      durationMinutes,

      startAt: range.startAt,
      endAt: range.endAt,

      serviceCode: service.code,
      serviceLabel: service.label,

      status:
        asString(input.statut) ||
        asString(input.status) ||
        "planifie",

      clientId:
        asString(input.clientId) || undefined,
      clientLabel:
        asString(input.clientLabel) || undefined,
      vehiculeId:
        asString(input.vehiculeId) || undefined,
      vehicleLabel:
        asString(input.vehicleLabel) ||
        asString(input.vehiculeLabel) ||
        undefined,

      raw: input,
    };
  }
}
