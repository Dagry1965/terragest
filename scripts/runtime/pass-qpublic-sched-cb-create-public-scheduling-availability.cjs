const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  types:
    "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityTypes.ts",
  service:
    "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts",
  actions:
    "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts",
  index:
    "src/runtime/scheduling/public/index.ts",
};

function full(rel) {
  return path.join(ROOT, rel);
}

function ensureDir(rel) {
  fs.mkdirSync(path.dirname(full(rel)), { recursive: true });
}

function write(rel, content) {
  ensureDir(rel);
  fs.writeFileSync(full(rel), content, "utf8");
}

for (const rel of Object.values(files)) {
  if (fs.existsSync(full(rel))) {
    throw new Error(`Fichier existe déjà: ${rel}`);
  }
}

const types = `export interface RuntimePublicSchedulingAvailabilityInput {
  tenantId?: string;
  workspaceId?: string;
  moduleKey?: string;
  startDate?: string;
  days?: number;
}

export interface RuntimePublicSchedulingSlot {
  date: string;
  startTime: string;
  endTime: string;
  label: string;
  available: boolean;
  remainingCapacity?: number;
  reason?: string;
}

export interface RuntimePublicSchedulingDay {
  date: string;
  label: string;
  slots: RuntimePublicSchedulingSlot[];
}

export interface RuntimePublicSchedulingAvailabilityResult {
  ok: true;
  days: RuntimePublicSchedulingDay[];
}
`;

const service = `import {
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
          dateField: schedulingConfig.dateField,
          startField: schedulingConfig.startField,
          endField: schedulingConfig.endField,
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
`;

const actions = `"use server";

import {
  RuntimePublicSchedulingAvailabilityService,
} from "./RuntimePublicSchedulingAvailabilityService";

import type {
  RuntimePublicSchedulingAvailabilityInput,
} from "./RuntimePublicSchedulingAvailabilityTypes";

export async function getPublicSchedulingAvailabilityAction(
  input: RuntimePublicSchedulingAvailabilityInput = {}
) {
  return RuntimePublicSchedulingAvailabilityService.getAvailability(input);
}
`;

const index = `export * from "./RuntimePublicSchedulingAvailabilityTypes";
export * from "./RuntimePublicSchedulingAvailabilityService";
export * from "./RuntimePublicSchedulingAvailabilityActions";
`;

write(files.types, types);
write(files.service, service);
write(files.actions, actions);
write(files.index, index);

console.log("");
console.log("[Q-PUBLIC-SCHED-C-B] DONE");
console.log("[CREATED]");
for (const rel of Object.values(files)) {
  console.log(`- ${rel}`);
}
console.log("");
console.log("Next:");
console.log("pnpm build");