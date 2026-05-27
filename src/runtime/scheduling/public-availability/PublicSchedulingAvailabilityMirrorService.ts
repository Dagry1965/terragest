import type {
  ERPModule,
} from "@/runtime/modules";

import {
  FirestoreRuntimeRepository,
} from "@/runtime/firestore/FirestoreRuntimeRepository";

import type {
  RuntimeRecord,
} from "@/runtime/data-binding";

import type {
  PublicSchedulingAvailabilityLock,
  PublicSchedulingAvailabilityMirrorInput,
  PublicSchedulingAvailabilitySourceRecord,
} from "./PublicSchedulingAvailabilityMirrorTypes";

const publicSchedulingAvailabilityModule: ERPModule = {
  metadata: {
    key: "publicSchedulingAvailability",
    label: "Disponibilités publiques",
  },
  schema: {
    collection: "publicSchedulingAvailability",
    fields: [],
  },
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown, fallback = 0): number {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeStatus(value: unknown): string {
  return asString(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isNonBlockingStatus(value: unknown): boolean {
  return [
    "annule",
    "annulee",
    "cancelled",
    "canceled",
    "inactive",
  ].includes(normalizeStatus(value));
}

function resolveTenantId(record: PublicSchedulingAvailabilitySourceRecord): string {
  return (
    asString(record.tenantId) ||
    "runtime"
  );
}

function resolveWorkspace(record: PublicSchedulingAvailabilitySourceRecord): string {
  return (
    asString(record.workspace) ||
    asString(record.workspaceId) ||
    asString(record.runtimeWorkspaceId) ||
    "default"
  );
}

function resolveDate(record: PublicSchedulingAvailabilitySourceRecord): string {
  return (
    asString(record.dateRendezVous) ||
    asString(record.date) ||
    asString(record.startAt).slice(0, 10)
  );
}

function normalizePublicSchedulingTime(value: unknown): string {
  const raw = asString(value)
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace("h", ":");

  if (!raw) {
    return "";
  }

  const match =
    raw.match(/^(\d{1,2})(?::(\d{1,2}))?$/);

  if (!match) {
    return raw;
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

function resolveStartTime(record: PublicSchedulingAvailabilitySourceRecord): string {
  const explicitTime =
    asString(record.heureRendezVous) ||
    asString(record.startTime) ||
    asString(record.time);

  if (explicitTime) {
    return normalizePublicSchedulingTime(explicitTime);
  }

  const startAt = asString(record.startAt);

  if (startAt.includes("T")) {
    return normalizePublicSchedulingTime(startAt.slice(11, 16));
  }

  return "";
}

function resolveEndTime(record: PublicSchedulingAvailabilitySourceRecord): string {
  const explicitEnd =
    asString(record.endTime) ||
    asString(record.finRendezVous);

  if (explicitEnd) {
    return normalizePublicSchedulingTime(explicitEnd);
  }

  const endAt = asString(record.endAt);

  if (endAt.includes("T")) {
    return normalizePublicSchedulingTime(endAt.slice(11, 16));
  }

  return "";
}

function addMinutesToTime(time: string, minutes: number): string {
  const [rawHour, rawMinute] = time.split(":");
  const hour = Number(rawHour);
  const minute = Number(rawMinute);

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) {
    return "";
  }

  const date = new Date("2000-01-01T00:00:00");
  date.setHours(hour, minute, 0, 0);
  date.setMinutes(date.getMinutes() + Math.max(1, Math.trunc(minutes)));

  return date.toTimeString().slice(0, 5);
}

function buildLock(
  input: PublicSchedulingAvailabilityMirrorInput
): PublicSchedulingAvailabilityLock | null {
  const record = input.record;
  const sourceRecordId =
    asString(record.id) ||
    asString(record._id);

  if (!sourceRecordId) {
    return null;
  }

  const date = resolveDate(record);
  const startTime = resolveStartTime(record);
  const durationMinutes = asNumber(record.durationMinutes, 60);
  const endTime =
    resolveEndTime(record) ||
    addMinutesToTime(startTime, durationMinutes);

  if (!date || !startTime || !endTime) {
    return null;
  }

  const status =
    asString(record.statut) ||
    asString(record.status);

  const blocking =
    !isNonBlockingStatus(status);

  if (!blocking) {
    return null;
  }

  const now = Date.now();

  return {
    tenantId: resolveTenantId(record),
    workspace: resolveWorkspace(record),
    moduleKey: input.moduleKey,

    date,
    startTime,
    endTime,

    status,
    blocking: true,
    capacityUsed: 1,

    sourceModule: input.moduleKey,
    sourceRecordId,

    createdAt: now,
    updatedAt: now,
  };
}

async function removeExistingLocks(
  sourceModule: string,
  sourceRecordId: string
): Promise<void> {
  const existing =
    await FirestoreRuntimeRepository.findMany(
      publicSchedulingAvailabilityModule
    );

  const matching =
    existing.filter((lock) =>
      String(lock.sourceModule ?? "") === sourceModule &&
      String(lock.sourceRecordId ?? "") === sourceRecordId
    );

  for (const lock of matching) {
    const id = String(lock.id ?? "").trim();

    if (!id) {
      continue;
    }

    await FirestoreRuntimeRepository.delete(
      publicSchedulingAvailabilityModule,
      id
    );
  }
}

export class PublicSchedulingAvailabilityMirrorService {
  static readonly module =
    publicSchedulingAvailabilityModule;

  static async syncFromRecord(
    input: PublicSchedulingAvailabilityMirrorInput
  ): Promise<void> {
    if (input.moduleKey !== "rendezvous") {
      return;
    }

    const sourceRecordId =
      asString(input.record.id) ||
      asString(input.record._id);

    if (!sourceRecordId) {
      return;
    }

    await removeExistingLocks(
      input.moduleKey,
      sourceRecordId
    );

    if (input.operation === "delete") {
      return;
    }

    const lock =
      buildLock(input);

    if (!lock) {
      return;
    }

    await FirestoreRuntimeRepository.create(
      publicSchedulingAvailabilityModule,
      lock as unknown as RuntimeRecord
    );
  }
}
