export interface RuntimeSchedulingSettingsScope {
  tenantId?: string;
  workspaceId?: string;
  moduleKey?: string;
}


import type {
  RuntimeCalendarException,
  RuntimeOpeningHoursProfile,
} from "@/runtime/scheduling/RuntimeSchedulingTypes";

export type RuntimeSchedulingSettingsLevel =
  | "engine"
  | "module"
  | "tenant"
  | "workspace"
  | "moduleSettings";

export type RuntimeSchedulingSettingsCriticity =
  | "critical"
  | "high"
  | "medium"
  | "low";

export interface RuntimeSchedulingOpeningPeriodSettings {
  start: string;
  end: string;
}

export interface RuntimeSchedulingOpeningDaySettings {
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  isOpen: boolean;
  periods: RuntimeSchedulingOpeningPeriodSettings[];
}

export interface RuntimeSchedulingOpeningHoursSettings {
  timezone?: string;
  defaultSlotDurationMinutes?: number;
  days: RuntimeSchedulingOpeningDaySettings[];
}

export interface RuntimeSchedulingCalendarExceptionSettings
  extends RuntimeCalendarException {}

export interface RuntimeSchedulingEditableSettings {
  /**
   * Can disable planning for a module/workspace without removing metadata.
   */
  enabled?: boolean;

  /**
   * Visible default appointment duration.
   * This must not include bufferMinutes.
   */
  defaultDurationMinutes?: number;

  /**
   * Invisible transition/security margin after bookings.
   */
  bufferMinutes?: number;

  /**
   * Number of bookings allowed for the same slot.
   */
  capacity?: number;

  /**
   * Status values that block availability.
   */
  blockingStatuses?: string[];

  /**
   * Opening hours configurable by tenant/workspace/module.
   */
  openingHours?: RuntimeSchedulingOpeningHoursSettings;

  /**
   * Closed days or special periods.
   */
  calendarExceptions?: RuntimeSchedulingCalendarExceptionSettings[];

  /**
   * Advanced setting. Should remain admin-only.
   */
  resourceField?: string;

  /**
   * Advanced setting. Used later for resource-specific capacity.
   */
  resourceCapacity?: Record<string, number>;
}

export interface RuntimeSchedulingStructuralConfig {
  dateField: string;
  timeField: string;
  durationField?: string;
  startField?: string;
  endField?: string;
  statusField?: string;
  resourceField?: string;
}

export interface RuntimeSchedulingSettings
  extends RuntimeSchedulingSettingsScope,
    RuntimeSchedulingEditableSettings {
  id?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface RuntimeSchedulingEffectiveConfig
  extends RuntimeSchedulingStructuralConfig,
    RuntimeSchedulingEditableSettings {
  /**
   * Source trace helps audits explain where the effective config came from.
   */
  sourceTrace: RuntimeSchedulingSettingsLevel[];

  /**
   * Original module key used to resolve this config.
   */
  moduleKey: string;

  /**
   * Final enabled state after merging metadata and settings.
   */
  enabled: boolean;

  /**
   * Final duration used by UI and slot generation.
   */
  defaultDurationMinutes: number;

  /**
   * Final buffer used by availability/guards.
   */
  bufferMinutes: number;

  /**
   * Final slot capacity used by availability/guards.
   */
  capacity: number;

  /**
   * Final opening hours profile accepted by RuntimeSchedulingEngine.
   */
  openingHoursProfile?: RuntimeOpeningHoursProfile;

  /**
   * Final calendar exceptions.
   */
  calendarExceptions: RuntimeSchedulingCalendarExceptionSettings[];

  /**
   * Final blocking statuses.
   */
  blockingStatuses: string[];
}

export interface RuntimeSchedulingSettingsResolutionInput {
  moduleKey: string;
  moduleScheduling?: Partial<RuntimeSchedulingStructuralConfig & RuntimeSchedulingEditableSettings>;
  tenantSettings?: RuntimeSchedulingSettings | null;
  workspaceSettings?: RuntimeSchedulingSettings | null;
  moduleSettings?: RuntimeSchedulingSettings | null;
}

export interface RuntimeSchedulingSettingsValidationIssue {
  field: string;
  message: string;
  criticity: RuntimeSchedulingSettingsCriticity;
}

export interface RuntimeSchedulingSettingsValidationResult {
  ok: boolean;
  issues: RuntimeSchedulingSettingsValidationIssue[];
}

export interface RuntimeStoredSchedulingSettings {
  scope: RuntimeSchedulingSettingsStorageScope;
  tenantId: string;
  workspaceId?: string;
  moduleKey?: string;
  settings: RuntimeSchedulingSettings;
  updatedAt?: unknown;
  updatedBy?: string;
}

export type RuntimeSchedulingSettingsStorageScope = "tenant" | "workspace" | "module";
