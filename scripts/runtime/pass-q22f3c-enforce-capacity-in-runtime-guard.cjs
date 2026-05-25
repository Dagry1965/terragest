const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22f3c-enforce-capacity-in-runtime-guard";

const targetFile =
  "src/runtime/guards/processRuntimeBeforeMutationGuards.ts";

const target = path.join(ROOT, targetFile);

if (!fs.existsSync(target)) {
  throw new Error(`[MISSING] ${targetFile}`);
}

const backup = `${target}.bak-${TAG}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(target, backup);
  console.log(`[BACKUP] ${targetFile}.bak-${TAG}`);
}

let content = fs.readFileSync(target, "utf8");

if (content.includes("Q22F3C_CAPACITY_GUARD")) {
  console.log("[SKIP] Q22F-3C already installed.");
  process.exit(0);
}

const conflictMarker = `  const conflict =
    RuntimeSchedulingEngine.assertNoAppointmentConflict(
      normalizedRecord,
      {
        existingAppointments,
        ignoreAppointmentId:
          context.id ??
          asString(normalizedRecord.id),
      }
    );

  if (!conflict.ok) {
    throw new Error(
      conflict.reason ??
      "Conflit de planning dÃ©tectÃ©."
    );
  }`;

const replacement = `  const schedulingConfig =
    getSchedulingConfig(module);

  const capacity =
    Math.max(
      1,
      Number(schedulingConfig?.capacity ?? 1) || 1
    );

  if (capacity <= 1) {
    const conflict =
      RuntimeSchedulingEngine.assertNoAppointmentConflict(
        normalizedRecord,
        {
          existingAppointments,
          ignoreAppointmentId:
            context.id ??
            asString(normalizedRecord.id),
        }
      );

    if (!conflict.ok) {
      throw new Error(
        conflict.reason ??
        "Conflit de planning détecté."
      );
    }
  } else {
    const resourceField =
      schedulingConfig?.resourceField;

    const resourceValue =
      resourceField
        ? asString(normalizedRecord[resourceField])
        : "";

    const blockingStatuses =
      schedulingConfig?.blockingStatuses ?? [];

    const statusField =
      schedulingConfig?.statusField;

    const startField =
      schedulingConfig?.startField ?? "startAt";

    const endField =
      schedulingConfig?.endField ?? "endAt";

    const bookings =
      existingAppointments
        // Q22F3C_CAPACITY_GUARD
        // Generic ERP scheduling guard: capacity is enforced before persistence.
        .filter((record) => {
          if (!resourceField) {
            return true;
          }

          if (!resourceValue) {
            return false;
          }

          return asString(record[resourceField]) === resourceValue;
        })
        .filter((record) => {
          if (!statusField || blockingStatuses.length === 0) {
            return true;
          }

          return blockingStatuses.includes(
            asString(record[statusField])
          );
        })
        .map((record) => ({
          id: asString(record.id ?? record._id),
          startAt: asString(record[startField]),
          endAt: asString(record[endField]),
          status: statusField
            ? asString(record[statusField])
            : undefined,
        }))
        .filter((booking) =>
          Boolean(booking.startAt && booking.endAt)
        );

    const slots =
      RuntimeSchedulingEngine.getAvailableSlotsWithBookings({
        date: asString(mergedRecord.dateRendezVous),
        durationMinutes:
          typeof normalizedRecord.durationMinutes === "number"
            ? normalizedRecord.durationMinutes
            : Number(normalizedRecord.durationMinutes ?? 0) || undefined,
        bookings,
        ignoreBookingId:
          context.id ??
          asString(normalizedRecord.id),
        bufferMinutes:
          schedulingConfig?.bufferMinutes,
        calendarExceptions:
          schedulingConfig?.calendarExceptions,
        capacity,
      });

    const selectedTime =
      asString(mergedRecord.heureRendezVous);

    const selectedSlot =
      slots.find((slot) => slot.start === selectedTime);

    if (!selectedSlot || !selectedSlot.available) {
      throw new Error(
        selectedSlot?.reason ??
        "Créneau complet : la capacité maximale est atteinte."
      );
    }
  }`;

if (!content.includes(conflictMarker)) {
  throw new Error("[MISSING] conflict guard marker");
}

content = content.replace(conflictMarker, replacement);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22F3C_DONE] scheduling capacity enforced in runtime guard.");
console.log("");
console.log("Next:");
console.log("  pnpm build");