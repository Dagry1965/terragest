const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22f2a-add-calendar-exceptions";

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

if (!moduleType.includes("calendarExceptions?:")) {
  moduleType = moduleType.replace(
    `  bufferMinutes?: number;
}`,
    `  bufferMinutes?: number;

  /**
   * Q22F2A_CALENDAR_EXCEPTIONS_METADATA
   * Dates ponctuelles qui sortent ou modifient la planification standard.
   */
  calendarExceptions?: Array<{
    date: string;
    isClosed?: boolean;
    periods?: Array<{
      start: string;
      end: string;
      capacity?: number;
    }>;
    reason?: string;
  }>;
}`
  );
}

write(moduleTypeFile, moduleType);

let schedulingTypes = fs.readFileSync(full(schedulingTypesFile), "utf8");

if (!schedulingTypes.includes("Q22F2A_RUNTIME_CALENDAR_EXCEPTION")) {
  schedulingTypes = schedulingTypes.replace(
    `export interface RuntimeCalendarException {
  date: string;
  isClosed?: boolean;
  periods?: RuntimeOpeningPeriod[];
  reason?: string;
}`,
    `export interface RuntimeCalendarException {
  // Q22F2A_RUNTIME_CALENDAR_EXCEPTION
  // Generic ERP calendar exception: close or override opening periods for a specific date.
  date: string;
  isClosed?: boolean;
  periods?: RuntimeOpeningPeriod[];
  reason?: string;
}`
  );
}

write(schedulingTypesFile, schedulingTypes);

let engine = fs.readFileSync(full(schedulingEngineFile), "utf8");

if (!engine.includes("RuntimeCalendarException")) {
  engine = engine.replace(
    `RuntimeBooking,`,
    `RuntimeBooking,
  RuntimeCalendarException,`
  );
}

if (!engine.includes("Q22F2A_APPLY_CALENDAR_EXCEPTIONS")) {
  const paramsMarker = `  static getAvailableSlotsForDate(params: {
    date: string;
    durationMinutes?: number;
    profile?: RuntimeOpeningHoursProfile;
  }): RuntimeAvailabilitySlot[] {`;

  const paramsReplacement = `  static getAvailableSlotsForDate(params: {
    date: string;
    durationMinutes?: number;
    profile?: RuntimeOpeningHoursProfile;
    calendarExceptions?: RuntimeCalendarException[];
  }): RuntimeAvailabilitySlot[] {`;

  if (!engine.includes(paramsMarker)) {
    throw new Error("[MISSING] getAvailableSlotsForDate params marker");
  }

  engine = engine.replace(paramsMarker, paramsReplacement);

  const openingMarker = `    const openingDay = getOpeningDayForDate(profile, date);

    if (!openingDay || !openingDay.isOpen) {
      return [];
    }

    const slots: RuntimeAvailabilitySlot[] = [];

    for (const period of openingDay.periods) {`;

  const openingReplacement = `    const openingDay = getOpeningDayForDate(profile, date);

    const exception =
      (params.calendarExceptions ?? []).find(
        (item) => item.date === normalizedDate
      );

    if (exception?.isClosed) {
      return [];
    }

    if (!openingDay || !openingDay.isOpen) {
      return [];
    }

    // Q22F2A_APPLY_CALENDAR_EXCEPTIONS
    // Calendar exception can override the standard opening periods for this date.
    const periods =
      exception?.periods && exception.periods.length > 0
        ? exception.periods
        : openingDay.periods;

    const slots: RuntimeAvailabilitySlot[] = [];

    for (const period of periods) {`;

  if (!engine.includes(openingMarker)) {
    throw new Error("[MISSING] opening day marker");
  }

  engine = engine.replace(openingMarker, openingReplacement);

  const withBookingsMarker = `    profile?: RuntimeOpeningHoursProfile;
    bookings?: RuntimeBooking[];
    ignoreBookingId?: string;
    bufferMinutes?: number;
  }): RuntimeAvailabilitySlot[] {`;

  const withBookingsReplacement = `    profile?: RuntimeOpeningHoursProfile;
    bookings?: RuntimeBooking[];
    ignoreBookingId?: string;
    bufferMinutes?: number;
    calendarExceptions?: RuntimeCalendarException[];
  }): RuntimeAvailabilitySlot[] {`;

  if (!engine.includes(withBookingsMarker)) {
    throw new Error("[MISSING] getAvailableSlotsWithBookings params marker");
  }

  engine = engine.replace(withBookingsMarker, withBookingsReplacement);

  const callMarker = `    const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
      date: params.date,
      durationMinutes: params.durationMinutes,
      profile: params.profile,
    });`;

  const callReplacement = `    const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
      date: params.date,
      durationMinutes: params.durationMinutes,
      profile: params.profile,
      calendarExceptions: params.calendarExceptions,
    });`;

  if (!engine.includes(callMarker)) {
    throw new Error("[MISSING] getAvailableSlotsForDate call marker");
  }

  engine = engine.replace(callMarker, callReplacement);

  const assertParamsMarker = `  static assertWithinOpeningHours(params: {
    date: string;
    time: string;
    durationMinutes?: number;
    profile?: RuntimeOpeningHoursProfile;
  }): SchedulingValidationResult {`;

  const assertParamsReplacement = `  static assertWithinOpeningHours(params: {
    date: string;
    time: string;
    durationMinutes?: number;
    profile?: RuntimeOpeningHoursProfile;
    calendarExceptions?: RuntimeCalendarException[];
  }): SchedulingValidationResult {`;

  if (!engine.includes(assertParamsMarker)) {
    throw new Error("[MISSING] assertWithinOpeningHours params marker");
  }

  engine = engine.replace(assertParamsMarker, assertParamsReplacement);

  const assertCallMarker = `    const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
      date: params.date,
      durationMinutes,
      profile,
    });`;

  const assertCallReplacement = `    const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
      date: params.date,
      durationMinutes,
      profile,
      calendarExceptions: params.calendarExceptions,
    });`;

  if (!engine.includes(assertCallMarker)) {
    throw new Error("[MISSING] assertWithinOpeningHours slots call marker");
  }

  engine = engine.replace(assertCallMarker, assertCallReplacement);
}

write(schedulingEngineFile, engine);

let rendezvous = fs.readFileSync(full(rendezvousFile), "utf8");

if (!rendezvous.includes("calendarExceptions:")) {
  rendezvous = rendezvous.replace(
    `    bufferMinutes: 15,
  },`,
    `    bufferMinutes: 15,

    calendarExceptions: [
      // Q22F2A_RENDEZVOUS_CALENDAR_EXCEPTIONS_EXAMPLE
      // Exemple générique désactivé : à remplacer plus tard par une configuration tenant/workspace.
      // { date: "2026-01-01", isClosed: true, reason: "Jour fermé" },
    ],
  },`
  );
}

write(rendezvousFile, rendezvous);

console.log("");
console.log("[Q22F2A_DONE] Calendar exceptions support added to generic scheduling runtime.");
console.log("");
console.log("Next:");
console.log("  pnpm build");