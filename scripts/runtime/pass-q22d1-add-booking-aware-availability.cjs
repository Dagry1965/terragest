const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22d1-add-booking-aware-availability";

const targetFile = "src/runtime/scheduling/RuntimeSchedulingEngine.ts";
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

if (content.includes("Q22D1_BOOKING_AWARE_AVAILABILITY")) {
  console.log("[SKIP] Q22D-1 already installed.");
  process.exit(0);
}

if (!content.includes("RuntimeBooking")) {
  content = content.replace(
    `RuntimeOpeningHoursProfile,`,
    `RuntimeOpeningHoursProfile,
  RuntimeBooking,`
  );
}

const marker = `  static assertWithinOpeningHours(params: {`;

const method = `
  static getAvailableSlotsWithBookings(params: {
    date: string;
    durationMinutes?: number;
    profile?: RuntimeOpeningHoursProfile;
    bookings?: RuntimeBooking[];
    ignoreBookingId?: string;
  }): RuntimeAvailabilitySlot[] {
    // Q22D1_BOOKING_AWARE_AVAILABILITY
    // Generic ERP availability: opening-hours slots minus existing bookings.
    const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
      date: params.date,
      durationMinutes: params.durationMinutes,
      profile: params.profile,
    });

    const bookings = params.bookings ?? [];
    const ignoredId = asString(params.ignoreBookingId);

    return slots.map((slot) => {
      const slotRange = RuntimeSchedulingEngine.buildDateTimeRange({
        date: params.date,
        time: slot.start,
        durationMinutes: params.durationMinutes,
      });

      const occupied = bookings.some((booking) => {
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

        return rangesOverlap(
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
        );
      });

      return {
        ...slot,
        available: !occupied,
      };
    });
  }

`;

if (!content.includes(marker)) {
  throw new Error("[MISSING] assertWithinOpeningHours marker");
}

content = content.replace(marker, method + marker);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22D1_DONE] Booking-aware availability added to RuntimeSchedulingEngine.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
