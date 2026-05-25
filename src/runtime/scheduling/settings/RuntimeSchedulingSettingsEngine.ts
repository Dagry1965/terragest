import {
  DEFAULT_WORKSPACE_OPENING_HOURS,
} from "@/runtime/scheduling/RuntimeOpeningHours";

import type {
  RuntimeOpeningHoursProfile,
} from "@/runtime/scheduling/RuntimeSchedulingTypes";

import type {
  RuntimeSchedulingEffectiveConfig,
  RuntimeSchedulingEditableSettings,
  RuntimeSchedulingSettings,
  RuntimeSchedulingSettingsLevel,
  RuntimeSchedulingSettingsResolutionInput,
  RuntimeSchedulingSettingsValidationIssue,
  RuntimeSchedulingSettingsValidationResult,
  RuntimeSchedulingOpeningHoursSettings,
} from "./RuntimeSchedulingSettingsTypes";

function asPositiveNumber(
  value: unknown,
  fallback: number
) {
  const number =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : NaN;

  return Number.isFinite(number) && number > 0
    ? number
    : fallback;
}

function asNonNegativeNumber(
  value: unknown,
  fallback: number
) {
  const number =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : NaN;

  return Number.isFinite(number) && number >= 0
    ? number
    : fallback;
}

function mergeEditableSettings(
  base: RuntimeSchedulingEditableSettings,
  override?: RuntimeSchedulingEditableSettings | null
): RuntimeSchedulingEditableSettings {
  if (!override) {
    return base;
  }

  return {
    ...base,
    ...Object.fromEntries(
      Object.entries(override).filter(
        ([, value]) =>
          value !== undefined &&
          value !== null
      )
    ),
  };
}

function hasEditableSettings(
  settings?: RuntimeSchedulingEditableSettings | null
) {
  if (!settings) {
    return false;
  }

  return Object.entries(settings).some(
    ([key, value]) =>
      ![
        "id",
        "tenantId",
        "workspaceKey",
        "moduleKey",
        "createdAt",
        "createdBy",
        "updatedAt",
        "updatedBy",
      ].includes(key) &&
      value !== undefined &&
      value !== null
  );
}

function toOpeningHoursProfile(
  settings?: RuntimeSchedulingOpeningHoursSettings
): RuntimeOpeningHoursProfile | undefined {
  if (!settings) {
    return undefined;
  }

  return {
    key:
      DEFAULT_WORKSPACE_OPENING_HOURS.key,
    label:
      DEFAULT_WORKSPACE_OPENING_HOURS.label,
    timezone:
      settings.timezone ??
      DEFAULT_WORKSPACE_OPENING_HOURS.timezone,
    defaultSlotDurationMinutes:
      settings.defaultSlotDurationMinutes ??
      DEFAULT_WORKSPACE_OPENING_HOURS.defaultSlotDurationMinutes,
    days: settings.days.map((day) => ({
      day: day.day,
      isOpen: day.isOpen,
      periods: day.periods.map((period) => ({
        start: period.start,
        end: period.end,
      })),
    })),
  };
}

function validateTime(value: string) {
  return /^\d{2}:\d{2}$/.test(value);
}

export class RuntimeSchedulingSettingsEngine {
  static readonly engineDefaults = {
    enabled: false,
    defaultDurationMinutes: 60,
    bufferMinutes: 0,
    capacity: 1,
    blockingStatuses: [] as string[],
    calendarExceptions: [],
  };

  static resolve(
    input: RuntimeSchedulingSettingsResolutionInput
  ): RuntimeSchedulingEffectiveConfig {
    // Q22E9C_SCHEDULING_SETTINGS_ENGINE
    // Resolve effective scheduling config without mutating module metadata.
    const sourceTrace: RuntimeSchedulingSettingsLevel[] = [
      "engine",
    ];

    const moduleScheduling =
      input.moduleScheduling ?? {};

    const structural = {
      dateField:
        moduleScheduling.dateField ?? "date",
      timeField:
        moduleScheduling.timeField ?? "time",
      durationField:
        moduleScheduling.durationField,
      startField:
        moduleScheduling.startField,
      endField:
        moduleScheduling.endField,
      statusField:
        moduleScheduling.statusField,
      resourceField:
        moduleScheduling.resourceField,
    };

    let editable: RuntimeSchedulingEditableSettings = {
      enabled:
        moduleScheduling.enabled ??
        RuntimeSchedulingSettingsEngine.engineDefaults.enabled,
      defaultDurationMinutes:
        moduleScheduling.defaultDurationMinutes,
      bufferMinutes:
        moduleScheduling.bufferMinutes ??
        RuntimeSchedulingSettingsEngine.engineDefaults.bufferMinutes,
      capacity:
        moduleScheduling.capacity ??
        RuntimeSchedulingSettingsEngine.engineDefaults.capacity,
      blockingStatuses:
        moduleScheduling.blockingStatuses ??
        RuntimeSchedulingSettingsEngine.engineDefaults.blockingStatuses,
      calendarExceptions:
        moduleScheduling.calendarExceptions ??
        RuntimeSchedulingSettingsEngine.engineDefaults.calendarExceptions,
      resourceField:
        moduleScheduling.resourceField,
    };

    if (input.moduleScheduling) {
      sourceTrace.push("module");
    }

    if (hasEditableSettings(input.tenantSettings)) {
      editable = mergeEditableSettings(
        editable,
        input.tenantSettings
      );
      sourceTrace.push("tenant");
    }

    if (hasEditableSettings(input.workspaceSettings)) {
      editable = mergeEditableSettings(
        editable,
        input.workspaceSettings
      );
      sourceTrace.push("workspace");
    }

    if (hasEditableSettings(input.moduleSettings)) {
      editable = mergeEditableSettings(
        editable,
        input.moduleSettings
      );
      sourceTrace.push("moduleSettings");
    }

    const defaultDurationMinutes =
      asPositiveNumber(
        editable.defaultDurationMinutes,
        RuntimeSchedulingSettingsEngine.engineDefaults.defaultDurationMinutes
      );

    const bufferMinutes =
      asNonNegativeNumber(
        editable.bufferMinutes,
        RuntimeSchedulingSettingsEngine.engineDefaults.bufferMinutes
      );

    const capacity =
      Math.max(
        1,
        asPositiveNumber(
          editable.capacity,
          RuntimeSchedulingSettingsEngine.engineDefaults.capacity
        )
      );

    const openingHoursProfile =
      toOpeningHoursProfile(editable.openingHours) ??
      DEFAULT_WORKSPACE_OPENING_HOURS;

    return {
      ...structural,
      ...editable,
      moduleKey: input.moduleKey,
      enabled:
        Boolean(editable.enabled),
      defaultDurationMinutes,
      bufferMinutes,
      capacity,
      blockingStatuses:
        Array.isArray(editable.blockingStatuses)
          ? editable.blockingStatuses
          : [],
      calendarExceptions:
        Array.isArray(editable.calendarExceptions)
          ? editable.calendarExceptions
          : [],
      openingHoursProfile,
      sourceTrace,
    };
  }

  static validate(
    config: RuntimeSchedulingEffectiveConfig
  ): RuntimeSchedulingSettingsValidationResult {
    const issues: RuntimeSchedulingSettingsValidationIssue[] = [];

    if (!config.moduleKey) {
      issues.push({
        field: "moduleKey",
        message: "moduleKey est obligatoire.",
        criticity: "critical",
      });
    }

    if (!config.dateField) {
      issues.push({
        field: "dateField",
        message: "dateField est obligatoire.",
        criticity: "critical",
      });
    }

    if (!config.timeField) {
      issues.push({
        field: "timeField",
        message: "timeField est obligatoire.",
        criticity: "critical",
      });
    }

    if (config.defaultDurationMinutes <= 0) {
      issues.push({
        field: "defaultDurationMinutes",
        message: "La durée par défaut doit être supérieure à 0.",
        criticity: "high",
      });
    }

    if (config.bufferMinutes < 0) {
      issues.push({
        field: "bufferMinutes",
        message: "Le buffer ne peut pas être négatif.",
        criticity: "high",
      });
    }

    if (config.capacity < 1) {
      issues.push({
        field: "capacity",
        message: "La capacité doit être au moins égale à 1.",
        criticity: "high",
      });
    }

    for (const day of config.openingHoursProfile?.days ?? []) {
      for (const period of day.periods ?? []) {
        if (!validateTime(period.start) || !validateTime(period.end)) {
          issues.push({
            field: "openingHours",
            message: "Les horaires doivent être au format HH:mm.",
            criticity: "high",
          });
        }

        if (
          validateTime(period.start) &&
          validateTime(period.end) &&
          period.start >= period.end
        ) {
          issues.push({
            field: "openingHours",
            message: "Une période d'ouverture doit finir après son début.",
            criticity: "high",
          });
        }
      }
    }

    return {
      ok: issues.length === 0,
      issues,
    };
  }
}
