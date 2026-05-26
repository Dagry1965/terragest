import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import {
  rendezvousModule,
} from "@/runtime/modules/generated/rendezvous/rendezvous.module";

import {
  RuntimeSchedulingEngine,
} from "@/runtime/scheduling/RuntimeSchedulingEngine";

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

function buildBookingsForDate(
  records: RuntimeRecord[],
  dateOnly: string,
  config: {
    dateField: string;
    startField: string;
    endField: string;
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
      if (!config.statusField || blockingStatuses.length === 0) {
        return true;
      }

      return blockingStatuses.includes(
        asString(record[config.statusField])
      );
    })
    .map((record) => ({
      id: getRecordId(record),
      startAt: asString(record[config.startField]),
      endAt: asString(record[config.endField]),
      status: config.statusField
        ? asString(record[config.statusField])
        : undefined,
    }))
    .filter((booking) =>
      Boolean(booking.startAt && booking.endAt)
    );
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

    const records =
      (await RuntimeDataBinding.list(rendezvousModule)) as RuntimeRecord[];

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

      days.push({
        date,
        label: formatPublicDayLabel(date),
        slots: slots.map((slot) =>
          toPublicSlot(date, slot)
        ),
      });
    }

    return {
      ok: true,
      days,
    };
  }
}
