const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22b1-scheduling-generic-types-opening-hours";

function full(p) {
  return path.join(ROOT, p);
}

function ensureDir(p) {
  fs.mkdirSync(full(p), { recursive: true });
}

function writeFile(p, content) {
  const target = full(p);

  if (fs.existsSync(target)) {
    const backup = `${target}.bak-${TAG}`;

    if (!fs.existsSync(backup)) {
      fs.copyFileSync(target, backup);
      console.log(`[BACKUP] ${p}.bak-${TAG}`);
    }
  }

  fs.writeFileSync(target, content, "utf8");
  console.log(`[WRITTEN] ${p}`);
}

ensureDir("src/runtime/scheduling");

writeFile(
  "src/runtime/scheduling/RuntimeSchedulingTypes.ts",
`export type RuntimeWeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface RuntimeTimeRange {
  start: string;
  end: string;
}

export interface RuntimeDateTimeRange {
  startAt: string;
  endAt: string;
}

export interface RuntimeOpeningPeriod {
  start: string;
  end: string;
}

export interface RuntimeOpeningDay {
  day: RuntimeWeekDay;
  isOpen: boolean;
  periods: RuntimeOpeningPeriod[];
}

export interface RuntimeOpeningHoursProfile {
  key: string;
  label: string;
  timezone?: string;
  defaultSlotDurationMinutes: number;
  days: RuntimeOpeningDay[];
}

export interface RuntimeSchedulableResource {
  id: string;
  type: string;
  label?: string;
  capacity?: number;
}

export interface RuntimeSchedulingContext {
  tenantId?: string;
  workspaceId?: string;
  moduleKey?: string;
  resourceType?: string;
  resourceId?: string;
  resourceField?: string;
}

export interface RuntimeAvailabilitySlot {
  start: string;
  end: string;
  label: string;
  available: boolean;
  capacity?: number;
}

export interface RuntimeBooking {
  id?: string;
  resourceId?: string;
  resourceType?: string;
  startAt: string;
  endAt: string;
  status?: string;
}

export interface RuntimeCalendarException {
  date: string;
  isClosed?: boolean;
  periods?: RuntimeOpeningPeriod[];
  reason?: string;
}
`
);

writeFile(
  "src/runtime/scheduling/RuntimeOpeningHours.ts",
`import type {
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
`
);

const indexPath = "src/runtime/scheduling/index.ts";
const indexFull = full(indexPath);

let indexContent = "";

if (fs.existsSync(indexFull)) {
  indexContent = fs.readFileSync(indexFull, "utf8");
}

if (!indexContent.includes("./RuntimeSchedulingTypes")) {
  indexContent += `export * from "./RuntimeSchedulingTypes";\n`;
}

if (!indexContent.includes("./RuntimeOpeningHours")) {
  indexContent += `export * from "./RuntimeOpeningHours";\n`;
}

if (!indexContent.includes("./RuntimeSchedulingEngine")) {
  indexContent += `export * from "./RuntimeSchedulingEngine";\n`;
}

writeFile(indexPath, indexContent);

console.log("");
console.log("[Q22B1_DONE] Generic ERP scheduling types and opening hours installed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");