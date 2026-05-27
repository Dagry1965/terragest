import {
  PublicRuntimeReadAdapter,
} from "@/runtime/public-read";

import {
  rendezvousModule,
} from "@/runtime/modules/generated/rendezvous/rendezvous.module";

import {
  RuntimeSchedulingEngine,
} from "@/runtime/scheduling/RuntimeSchedulingEngine";

import {
  PublicSchedulingAvailabilityMirrorService,
} from "@/runtime/scheduling/public-availability";

import type {
  RuntimeBooking,
} from "@/runtime/scheduling/RuntimeSchedulingTypes";

import {
  RuntimeSchedulingSettingsResolver,
} from "@/runtime/scheduling/settings";

import type {
  RuntimePublicSchedulingAvailabilityInput,
  RuntimePublicSchedulingAvailabilityResult,
  RuntimePublicSchedulingDay,
  RuntimePublicSchedulingSlot,
} from "./RuntimePublicSchedulingAvailabilityTypes";

type RuntimeRecord = Record<string, unknown>;

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function getRecordId(record: RuntimeRecord): string {
  return asString(record.id) || asString(record._id);
}

function toDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatPublicDayLabel(dateOnly: string): string {
  const date = new Date(dateOnly + "T00:00:00");

  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(date);
}

function normalizeDays(value: unknown): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 7;
  }

  return Math.max(1, Math.min(Math.trunc(parsed), 21));
}

function buildPublicAvailabilityDateTimeRange(params: {
  date: string;
  time: string;
  durationMinutes?: number;
}) {
  const durationMinutes =
    typeof params.durationMinutes === "number" &&
    Number.isFinite(params.durationMinutes)
      ? Math.max(1, Math.trunc(params.durationMinutes))
      : 60;

  if (!params.date || !params.time) {
    return {
      startAt: "",
      endAt: "",
    };
  }

  return RuntimeSchedulingEngine.buildDateTimeRange({
    date: params.date,
    time: params.time,
    durationMinutes,
  });
}

function buildBookingsForDate(
  records: RuntimeRecord[],
  dateOnly: string,
  config: {
    dateField: string;
    startField: string;
    endField: string;
    timeField?: string;
    durationField?: string;
    statusField?: string;
    blockingStatuses?: string[];
  }
): RuntimeBooking[] {
  const blockingStatuses = config.blockingStatuses ?? [];

  return records
    .filter((record) => {
      const dateValue = asString(record[config.dateField]);
      const startAt = asString(record[config.startField]);

      return dateValue === dateOnly || startAt.startsWith(dateOnly);
    })
    .filter((record) => {
      if (!config.statusField) {
        return true;
      }

      return !isPublicSchedulingCancelledStatus(
        record[config.statusField]
      );
    })
    .map((record) => {
      const directStartAt =
        asString(record[config.startField]);

      const directEndAt =
        asString(record[config.endField]);

      const timeField =
        config.timeField ?? "time";

      const durationField =
        config.durationField ?? "durationMinutes";

      const fallbackRange =
        directStartAt && directEndAt
          ? { startAt: directStartAt, endAt: directEndAt }
          : buildPublicAvailabilityDateTimeRange({
              date:
                asString(record[config.dateField]) ||
                asString(record.dateRendezVous) ||
                asString(record.date),
              time:
                asString(record[timeField]) ||
                asString(record.heureRendezVous) ||
                asString(record.time),
              durationMinutes:
                typeof record[durationField] === "number"
                  ? record[durationField] as number
                  : Number(
                      record[durationField] ??
                        record.durationMinutes ??
                        60
                    ),
            });

      return {
        id: getRecordId(record),
        startAt: directStartAt || fallbackRange.startAt,
        endAt: directEndAt || fallbackRange.endAt,
        status: config.statusField
          ? asString(record[config.statusField])
          : undefined,
      };
    })
    .filter((booking) =>
      Boolean(booking.startAt && booking.endAt)
    );
}

function isPublicSchedulingCancelledStatus(value: unknown): boolean {
  const status = String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return [
    "annule",
    "annulee",
    "cancelled",
    "canceled",
    "inactive",
  ].includes(status);
}

function buildOccupiedStartTimesForDate(
  records: RuntimeRecord[],
  dateOnly: string,
  config: {
    dateField: string;
    timeField?: string;
    statusField?: string;
    blockingStatuses?: string[];
  }
): Set<string> {
  const blockingStatuses = config.blockingStatuses ?? [];
  const occupied = new Set<string>();

  for (const record of records) {
    const recordDate =
      asString(record[config.dateField]) ||
      asString(record.dateRendezVous) ||
      asString(record.date);

    if (recordDate !== dateOnly) {
      continue;
    }

    if (
      config.statusField &&
      isPublicSchedulingCancelledStatus(record[config.statusField])
    ) {
      continue;
    }

    const timeField = config.timeField ?? "time";

    const recordTime =
      asString(record[timeField]) ||
      asString(record.heureRendezVous) ||
      asString(record.time);

    if (recordTime) {
      occupied.add(recordTime);
    }
  }

  return occupied;
}

function toPublicSlot(
  date: string,
  slot: {
    start: string;
    end: string;
    label: string;
    available: boolean;
    remainingCapacity?: number;
    reason?: string;
  }
): RuntimePublicSchedulingSlot {
  return {
    date,
    startTime: slot.start,
    endTime: slot.end,
    label: slot.label,
    available: slot.available,
    remainingCapacity: slot.remainingCapacity,
    reason: slot.reason,
  };
}

export class RuntimePublicSchedulingAvailabilityService {
  static async getAvailability(
    input: RuntimePublicSchedulingAvailabilityInput = {}
  ): Promise<RuntimePublicSchedulingAvailabilityResult> {
    const moduleKey = input.moduleKey || "rendezvous";
    const tenantId = input.tenantId || "runtime";
    const workspaceId = input.workspaceId || "default";

    if (moduleKey !== "rendezvous") {
      throw new Error(
        "Le module public de disponibilités planning n'est pas encore exposé."
      );
    }

    const schedulingConfig =
      await RuntimeSchedulingSettingsResolver.resolveForRuntimeGuard({
        module: rendezvousModule,
        context: {
          tenantId,
          workspaceId,
          moduleKey,
        },
      });

    const readOptions = {
      context: {
        tenantId,
        workspace: workspaceId,
      },
    };

    const publicRead =
      await PublicRuntimeReadAdapter.list({
        module: PublicSchedulingAvailabilityMirrorService.module,
        context: readOptions,
        purpose: "availability",
        policy: {
          allowedFields: [
            "id",
            "tenantId",
            "workspace",
            "moduleKey",
            "date",
            "startTime",
            "endTime",
            "status",
            "blocking",
            "capacityUsed",
            "sourceModule",
            "sourceRecordId",
          ],
        },
      });

    const records =
      publicRead.records
        .filter((record) =>
          String(record.moduleKey ?? "") === moduleKey &&
          record.blocking !== false
        )
        .map((record) => ({
          id: record.id,
          tenantId: record.tenantId,
          workspace: record.workspace,
          moduleKey: record.moduleKey,
          dateRendezVous: record.date,
          heureRendezVous: record.startTime,
          durationMinutes: 60,
          startAt: record.date && record.startTime
            ? String(record.date) + "T" + String(record.startTime) + ":00"
            : "",
          endAt: record.date && record.endTime
            ? String(record.date) + "T" + String(record.endTime) + ":00"
            : "",
          statut: record.status ?? "blocked",
        })) as RuntimeRecord[];

    const startDate =
      input.startDate && input.startDate.trim()
        ? input.startDate.trim()
        : toDateOnly(new Date());

    const daysCount = normalizeDays(input.days);

    const days: RuntimePublicSchedulingDay[] = [];

    for (let index = 0; index < daysCount; index += 1) {
      const date = toDateOnly(
        addDays(
          new Date(startDate + "T00:00:00"),
          index
        )
      );

      const bookings = buildBookingsForDate(
        records,
        date,
        {
          dateField: schedulingConfig.dateField ?? "dateRendezVous",
          startField: schedulingConfig.startField ?? "startAt",
          endField: schedulingConfig.endField ?? "endAt",
          timeField: schedulingConfig.timeField ?? "heureRendezVous",
          durationField: schedulingConfig.durationField ?? "durationMinutes",
          statusField: schedulingConfig.statusField,
          blockingStatuses: schedulingConfig.blockingStatuses,
        }
      );

      const slots =
        RuntimeSchedulingEngine.getAvailableSlotsWithBookings({
          date,
          bookings,
          calendarExceptions:
            schedulingConfig.calendarExceptions,
          bufferMinutes:
            schedulingConfig.bufferMinutes,
          capacity:
            schedulingConfig.capacity,
        });

      const occupiedStartTimes =
        buildOccupiedStartTimesForDate(
          records,
          date,
          {
            dateField: schedulingConfig.dateField ?? "dateRendezVous",
            timeField: schedulingConfig.timeField ?? "heureRendezVous",
            statusField: schedulingConfig.statusField,
            blockingStatuses: schedulingConfig.blockingStatuses,
          }
        );

      days.push({
        date,
        label: formatPublicDayLabel(date),
        slots: slots.map((slot) =>
          toPublicSlot(
            date,
            occupiedStartTimes.has(slot.start)
              ? {
                  ...slot,
                  available: false,
                  remainingCapacity: 0,
                  reason: slot.reason ?? "Créneau complet",
                }
              : slot
          )
        ),
      });
    }

    return {
      ok: true,
      days,
    };
  }
}
