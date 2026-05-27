import {
  RuntimeAppointmentNormalizer,
  RuntimeServiceCatalogResolver,
} from "@/runtime/scheduling/contract";

import type {
  RuntimeAppointmentInput,
  RuntimeNormalizedAppointment,
  RuntimeSchedulingServiceOption,
  RuntimeSchedulingSlotView,
} from "@/runtime/scheduling/contract";

export type PublicSchedulingContractSlotInput = {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
  available?: boolean;
  remainingCapacity?: number;
  capacity?: number;
  reason?: string;
  label?: string;
};

export type PublicSchedulingContractDayInput = {
  date: string;
  label?: string;
  slots: PublicSchedulingContractSlotInput[];
};

export type PublicSchedulingContractDayView = {
  date: string;
  label?: string;
  slots: RuntimeSchedulingSlotView[];
};

function normalizeBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function normalizePositiveNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? Math.trunc(value)
    : fallback;
}

function normalizeCapacity(value: unknown, fallback = 1) {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.trunc(value))
    : fallback;
}

function parseLocalDateTime(date: string, time: string) {
  return new Date(date + "T" + time + ":00");
}

function computeDurationMinutes(params: {
  date: string;
  startTime: string;
  endTime: string;
}) {
  const start = parseLocalDateTime(params.date, params.startTime);
  const end = parseLocalDateTime(params.date, params.endTime);
  const diff = Math.round((end.getTime() - start.getTime()) / 60000);

  return normalizePositiveNumber(diff, 60);
}

function buildStatus(params: {
  available: boolean;
  remainingCapacity?: number;
  capacity?: number;
}): "available" | "limited" | "full" {
  if (!params.available) {
    return "full";
  }

  if (
    typeof params.remainingCapacity === "number" &&
    typeof params.capacity === "number" &&
    params.remainingCapacity < params.capacity
  ) {
    return "limited";
  }

  return "available";
}

export class RuntimePublicSchedulingContractBridge {
  static getPublicServices(
    services?: RuntimeSchedulingServiceOption[]
  ): RuntimeSchedulingServiceOption[] {
    return RuntimeServiceCatalogResolver.mergeWithDefaults(services ?? []);
  }

  static normalizePublicAppointment(
    input: RuntimeAppointmentInput
  ): RuntimeNormalizedAppointment | null {
    return RuntimeAppointmentNormalizer.normalize(input);
  }

  static normalizePublicSlot(
    slot: PublicSchedulingContractSlotInput
  ): RuntimeSchedulingSlotView {
    const available = normalizeBoolean(slot.available, true);
    const capacity = normalizeCapacity(slot.capacity, 1);
    const remainingCapacity = normalizeCapacity(
      slot.remainingCapacity,
      available ? capacity : 0
    );
    const durationMinutes = computeDurationMinutes({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });

    return {
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      label: slot.label ?? slot.startTime,
      durationMinutes,
      available,
      capacity,
      remainingCapacity,
      status: buildStatus({
        available,
        remainingCapacity,
        capacity,
      }),
      reason: slot.reason,
    };
  }

  static normalizePublicDays(
    days: PublicSchedulingContractDayInput[]
  ): PublicSchedulingContractDayView[] {
    return days.map((day) => ({
      date: day.date,
      label: day.label,
      slots: day.slots.map((slot) =>
        RuntimePublicSchedulingContractBridge.normalizePublicSlot(slot)
      ),
    }));
  }
}
