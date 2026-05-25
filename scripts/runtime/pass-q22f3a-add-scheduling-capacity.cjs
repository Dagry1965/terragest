const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22f3a-add-scheduling-capacity";

const moduleTypeFile = "src/runtime/modules/ERPModule.ts";
const schedulingTypesFile = "src/runtime/scheduling/RuntimeSchedulingTypes.ts";
const schedulingEngineFile = "src/runtime/scheduling/RuntimeSchedulingEngine.ts";
const rendezvousFile = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";

function full(p) {
  return path.join(ROOT, p);
}

function backup(p) {
  const target = full(p);
  const backupPath = `${target}.bak-${TAG}`;

  if (!fs.existsSync(target)) {
    throw new Error(`[MISSING] ${p}`);
  }

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(target, backupPath);
    console.log(`[BACKUP] ${p}.bak-${TAG}`);
  }
}

function write(p, content) {
  fs.writeFileSync(full(p), content, "utf8");
  console.log(`[WRITTEN] ${p}`);
}

backup(moduleTypeFile);
backup(schedulingTypesFile);
backup(schedulingEngineFile);
backup(rendezvousFile);

let moduleType = fs.readFileSync(full(moduleTypeFile), "utf8");

if (!moduleType.includes("capacity?: number;")) {
  moduleType = moduleType.replace(
    `  bufferMinutes?: number;`,
    `  bufferMinutes?: number;

  /**
   * Q22F3A_SCHEDULING_CAPACITY_METADATA
   * Nombre maximal de bookings acceptés sur un même créneau.
   */
  capacity?: number;`
  );
}

write(moduleTypeFile, moduleType);

let schedulingTypes = fs.readFileSync(full(schedulingTypesFile), "utf8");

if (!schedulingTypes.includes("usedCapacity?: number;")) {
  schedulingTypes = schedulingTypes.replace(
    `export interface RuntimeAvailabilitySlot {
  start: string;
  end: string;
  label: string;
  available: boolean;
  capacity?: number;
}`,
    `export interface RuntimeAvailabilitySlot {
  start: string;
  end: string;
  label: string;
  available: boolean;
  capacity?: number;

  /**
   * Q22F3A_RUNTIME_SLOT_CAPACITY
   * Capacity-aware availability details.
   */
  usedCapacity?: number;
  remainingCapacity?: number;
  reason?: string;
}`
  );
}

write(schedulingTypesFile, schedulingTypes);

let engine = fs.readFileSync(full(schedulingEngineFile), "utf8");

if (!engine.includes("Q22F3A_CAPACITY_AWARE_AVAILABILITY")) {
  const paramsMarker = `    bufferMinutes?: number;
    calendarExceptions?: RuntimeCalendarException[];
  }): RuntimeAvailabilitySlot[] {`;

  const paramsReplacement = `    bufferMinutes?: number;
    calendarExceptions?: RuntimeCalendarException[];
    capacity?: number;
  }): RuntimeAvailabilitySlot[] {`;

  if (!engine.includes(paramsMarker)) {
    throw new Error("[MISSING] getAvailableSlotsWithBookings params marker");
  }

  engine = engine.replace(paramsMarker, paramsReplacement);

  const bufferMarker = `    const bufferMinutes = Math.max(
      0,
      asNumber(params.bufferMinutes, 0)
    );

    const bookings = params.bookings ?? [];`;

  const bufferReplacement = `    const bufferMinutes = Math.max(
      0,
      asNumber(params.bufferMinutes, 0)
    );

    const capacity = Math.max(
      1,
      asNumber(params.capacity, 1)
    );

    const bookings = params.bookings ?? [];`;

  if (!engine.includes(bufferMarker)) {
    throw new Error("[MISSING] buffer/bookings marker");
  }

  engine = engine.replace(bufferMarker, bufferReplacement);

  const mapMarker = `    return slots.map((slot) => {
      const slotRange = RuntimeSchedulingEngine.buildDateTimeRange({
        date: params.date,
        time: slot.start,
        durationMinutes: params.durationMinutes,
      });

      const occupied = bookings.some((booking) => {`;

  const mapReplacement = `    return slots.map((slot) => {
      const slotRange = RuntimeSchedulingEngine.buildDateTimeRange({
        date: params.date,
        time: slot.start,
        durationMinutes: params.durationMinutes,
      });

      let usedCapacity = 0;

      const overlappingBookings = bookings.filter((booking) => {`;

  if (!engine.includes(mapMarker)) {
    throw new Error("[MISSING] slots map occupied marker");
  }

  engine = engine.replace(mapMarker, mapReplacement);

  const returnOverlapMarker = `        return rangesOverlap(
          {
            startAt: slotRange.startAt,
            endAt: slotRange.endAt,
            durationMinutes:
              params.durationMinutes ??
              RuntimeSchedulingEngine.defaultDurationMinutes,
          },
          {
            // Q22F1_SCHEDULING_BUFFER_MINUTES
            // The visible booking ends at endAt, but the blocked range may include bufferMinutes.
            startAt: bookingStart.toISOString(),
            endAt: bookingEndWithBuffer.toISOString(),
            durationMinutes:
              params.durationMinutes ??
              RuntimeSchedulingEngine.defaultDurationMinutes,
          }
        );
      });

      return {
        ...slot,
        available: !occupied,
      };
    });`;

  const returnOverlapReplacement = `        return rangesOverlap(
          {
            startAt: slotRange.startAt,
            endAt: slotRange.endAt,
            durationMinutes:
              params.durationMinutes ??
              RuntimeSchedulingEngine.defaultDurationMinutes,
          },
          {
            // Q22F1_SCHEDULING_BUFFER_MINUTES
            // The visible booking ends at endAt, but the blocked range may include bufferMinutes.
            startAt: bookingStart.toISOString(),
            endAt: bookingEndWithBuffer.toISOString(),
            durationMinutes:
              params.durationMinutes ??
              RuntimeSchedulingEngine.defaultDurationMinutes,
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
    });`;

  if (!engine.includes(returnOverlapMarker)) {
    throw new Error("[MISSING] overlap return block");
  }

  engine = engine.replace(returnOverlapMarker, returnOverlapReplacement);
}

write(schedulingEngineFile, engine);

let rendezvous = fs.readFileSync(full(rendezvousFile), "utf8");

if (!rendezvous.includes("capacity: 1")) {
  rendezvous = rendezvous.replace(
    `    bufferMinutes: 15,`,
    `    bufferMinutes: 15,
    capacity: 1,`
  );
}

write(rendezvousFile, rendezvous);

console.log("");
console.log("[Q22F3A_DONE] Scheduling capacity support added.");
console.log("");
console.log("Next:");
console.log("  pnpm build");