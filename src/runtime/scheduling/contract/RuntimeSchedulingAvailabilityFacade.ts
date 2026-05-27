import {
  RuntimeSchedulingEngine,
} from "@/runtime/scheduling/RuntimeSchedulingEngine";

import type {
  RuntimeNormalizedAppointment,
  RuntimeSchedulingSlotView,
} from "./RuntimeSchedulingContractTypes";

function toReservationSummary(
  booking: RuntimeNormalizedAppointment
) {
  return {
    id: booking.id ?? booking.startAt,
    sourceModule: booking.moduleKey,
    sourceRecordId: booking.id,

    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,

    serviceCode: booking.serviceCode,
    serviceLabel: booking.serviceLabel,
    durationMinutes: booking.durationMinutes,

    status: booking.status,
    clientLabel: booking.clientLabel,
    vehicleLabel: booking.vehicleLabel,
  };
}

export class RuntimeSchedulingAvailabilityFacade {
  static buildSlotViews(params: {
    date: string;
    durationMinutes: number;
    bookings: RuntimeNormalizedAppointment[];
    capacity?: number;
    bufferMinutes?: number;
  }): RuntimeSchedulingSlotView[] {
    const slots =
      RuntimeSchedulingEngine.getAvailableSlotsWithBookings({
        date: params.date,
        durationMinutes: params.durationMinutes,
        bookings: params.bookings.map((booking) => ({
          id: booking.id,
          startAt: booking.startAt,
          endAt: booking.endAt,
        })),
        capacity: params.capacity,
        bufferMinutes: params.bufferMinutes,
      });

    return slots.map((slot) => {
      const reservations =
        params.bookings
          .filter((booking) =>
            booking.date === params.date &&
            booking.startTime === slot.start
          )
          .map(toReservationSummary);

      const capacity =
        Math.max(
          1,
          Number(params.capacity ?? slot.remainingCapacity ?? 1) +
            reservations.length
        );

      const usedCapacity =
        reservations.length;

      const remainingCapacity =
        Math.max(0, capacity - usedCapacity);

      const availabilityStatus =
        remainingCapacity <= 0
          ? "full"
          : usedCapacity > 0
            ? "limited"
            : "available";

      return {
        date: params.date,
        startTime: slot.start,
        endTime: slot.end,
        label: slot.label,

        availabilityStatus,
        selectable: availabilityStatus !== "full",

        capacity,
        usedCapacity,
        remainingCapacity,

        durationMinutes: params.durationMinutes,

        reservations,
        reason:
          availabilityStatus === "full"
            ? "Créneau complet"
            : availabilityStatus === "limited"
              ? "Créneau partiellement réservé"
              : undefined,
      };
    });
  }
}
