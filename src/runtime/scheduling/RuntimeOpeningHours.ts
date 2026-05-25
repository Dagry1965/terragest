import type {
  RuntimeOpeningDay,
  RuntimeOpeningHoursProfile,
  RuntimeWeekDay,
} from "./RuntimeSchedulingTypes";

export const DEFAULT_WORKSPACE_OPENING_HOURS: RuntimeOpeningHoursProfile = {
  key: "workspace-standard",
  label: "Horaires standards",
  timezone: "Africa/Abidjan",
  defaultSlotDurationMinutes: 60,
  days: [
    {
      day: "monday",
      isOpen: true,
      periods: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],
    },
    {
      day: "tuesday",
      isOpen: true,
      periods: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],
    },
    {
      day: "wednesday",
      isOpen: true,
      periods: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],
    },
    {
      day: "thursday",
      isOpen: true,
      periods: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],
    },
    {
      day: "friday",
      isOpen: true,
      periods: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],
    },
    {
      day: "saturday",
      isOpen: true,
      periods: [
        { start: "08:00", end: "13:00" },
      ],
    },
    {
      day: "sunday",
      isOpen: false,
      periods: [],
    },
  ],
};

export function getRuntimeWeekDay(date: Date): RuntimeWeekDay {
  const day = date.getDay();

  if (day === 0) return "sunday";
  if (day === 1) return "monday";
  if (day === 2) return "tuesday";
  if (day === 3) return "wednesday";
  if (day === 4) return "thursday";
  if (day === 5) return "friday";

  return "saturday";
}

export function getOpeningDayForDate(
  profile: RuntimeOpeningHoursProfile,
  date: Date
): RuntimeOpeningDay | null {
  const weekDay = getRuntimeWeekDay(date);

  return profile.days.find((day) => day.day === weekDay) ?? null;
}
