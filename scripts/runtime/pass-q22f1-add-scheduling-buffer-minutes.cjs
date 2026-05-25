const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22f1-add-scheduling-buffer-minutes";

const moduleTypeFile = "src/runtime/modules/ERPModule.ts";
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
backup(schedulingEngineFile);
backup(rendezvousFile);

let moduleType = fs.readFileSync(full(moduleTypeFile), "utf8");

if (!moduleType.includes("bufferMinutes?: number;")) {
  moduleType = moduleType.replace(
    `  blockingStatuses?: string[];
}`,
    `  blockingStatuses?: string[];
  bufferMinutes?: number;
}`
  );
}

write(moduleTypeFile, moduleType);

let engine = fs.readFileSync(full(schedulingEngineFile), "utf8");

if (!engine.includes("Q22F1_SCHEDULING_BUFFER_MINUTES")) {
  const paramsMarker = `    ignoreBookingId?: string;
  }): RuntimeAvailabilitySlot[] {`;

  const paramsReplacement = `    ignoreBookingId?: string;
    bufferMinutes?: number;
  }): RuntimeAvailabilitySlot[] {`;

  if (!engine.includes(paramsMarker)) {
    throw new Error("[MISSING] getAvailableSlotsWithBookings params marker");
  }

  engine = engine.replace(paramsMarker, paramsReplacement);

  const slotsMarker = `    const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
      date: params.date,
      durationMinutes: params.durationMinutes,
      profile: params.profile,
    });

    const bookings = params.bookings ?? [];`;

  const slotsReplacement = `    const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
      date: params.date,
      durationMinutes: params.durationMinutes,
      profile: params.profile,
    });

    const bufferMinutes = Math.max(
      0,
      asNumber(params.bufferMinutes, 0)
    );

    const bookings = params.bookings ?? [];`;

  if (!engine.includes(slotsMarker)) {
    throw new Error("[MISSING] slots/bookings marker");
  }

  engine = engine.replace(slotsMarker, slotsReplacement);

  const overlapMarker = `        return rangesOverlap(
          {
            startAt: slotRange.startAt,
            endAt: slotRange.endAt,
            durationMinutes:
              params.durationMinutes ??
              RuntimeSchedulingEngine.defaultDurationMinutes,
          },
          {
            startAt: asString(booking.startAt),
            endAt: asString(booking.endAt),
            durationMinutes:
              params.durationMinutes ??
              RuntimeSchedulingEngine.defaultDurationMinutes,
          }
        );`;

  const overlapReplacement = `        const bookingStart =
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
        );`;

  if (!engine.includes(overlapMarker)) {
    throw new Error("[MISSING] overlap marker");
  }

  engine = engine.replace(overlapMarker, overlapReplacement);
}

write(schedulingEngineFile, engine);

let rendezvous = fs.readFileSync(full(rendezvousFile), "utf8");

if (!rendezvous.includes("bufferMinutes: 15")) {
  rendezvous = rendezvous.replace(
    `    blockingStatuses: ["planifie", "confirme", "en_cours"],
  },`,
    `    blockingStatuses: ["planifie", "confirme", "en_cours"],
    bufferMinutes: 15,
  },`
  );
}

write(rendezvousFile, rendezvous);

console.log("");
console.log("[Q22F1_DONE] Scheduling bufferMinutes support added.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  test /rendezvous/nouveau");