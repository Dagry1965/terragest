import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  FirestoreRuntimeRepository,
} from "@/runtime/firestore/FirestoreRuntimeRepository";

import {
  RuntimeContextEnforcer,
} from "@/runtime/context";

import {
  allERPModules,
} from "@/runtime/modules/definitions/coreModules";

import {
  RuntimeSchedulingEngine,
  type RuntimeRecord,
} from "@/runtime/scheduling/RuntimeSchedulingEngine";
import { RuntimeSchedulingSettingsResolver } from "@/runtime/scheduling/settings";
import { SchedulingSlotPolicyResolver } from "@/runtime/scheduling";

import {
  guardRuntimeChronologyMutation,
} from "./RuntimeChronologyGuard";

export interface RuntimeBeforeMutationGuardContext {
  operation: "create" | "update";
  id?: string;
  tenantId?: string;
  workspaceId?: string;
  moduleKey?: string;
  systemMutation?: boolean;
  mutationSource?: string;
}

function asString(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return "";
}

function getModuleByKey(
  moduleKey: string
): ERPModule | null {
  return (
    allERPModules.find(
      (item) => item.metadata.key === moduleKey
    ) ?? null
  );
}

function hasAnyParentContextField(
  data: RuntimeRecord
): boolean {
  return Boolean(
    asString(data.parentModuleKey) ||
    asString(data.parentRecordId) ||
    asString(data.parentForeignKey)
  );
}

async function guardParentChildContextMutation(
  module: ERPModule,
  data: RuntimeRecord
): Promise<RuntimeRecord> {
  // Q15F_PARENT_CHILD_CONTEXT_GUARD
  // Sécurise les créations/modifications enfant quand un contexte parent est transmis.

  // Q15F_B_REQUIRED_PARENT_CONTEXT_GUARD
  // Si le module déclare requiresParentContext, le parent devient obligatoire.
  const requiresParentContext =
    Boolean(module.composition?.requiresParentContext);

  const allowedParents =
    module.composition?.allowedParents ?? [];

  const hasParentContext =
    hasAnyParentContextField(data);

  if (!hasParentContext && !requiresParentContext) {
    return data;
  }

  if (!hasParentContext && requiresParentContext) {
    throw new Error(
      "Contexte parent obligatoire : cet enregistrement doit être créé depuis son parent métier."
    );
  }

  const parentModuleKey =
    asString(data.parentModuleKey);

  const parentRecordId =
    asString(data.parentRecordId);

  const parentForeignKey =
    asString(data.parentForeignKey);

  if (
    !parentModuleKey ||
    !parentRecordId ||
    !parentForeignKey
  ) {
    throw new Error(
      "Contexte parent incomplet : impossible d’enregistrer cet enfant sans parent valide."
    );
  }

  if (allowedParents.length > 0) {
    const parentAllowed =
      allowedParents.some((parent) =>
        parent.moduleKey === parentModuleKey &&
        parent.foreignKey === parentForeignKey
      );

    if (!parentAllowed) {
      throw new Error(
        "Contexte parent refusé : ce module enfant ne peut pas être rattaché à ce parent."
      );
    }
  }

  const childForeignValue =
    asString(data[parentForeignKey]);

  if (
    childForeignValue &&
    childForeignValue !== parentRecordId
  ) {
    throw new Error(
      "Contexte parent incohérent : la référence enfant ne correspond pas au parent."
    );
  }

  const parentModule =
    getModuleByKey(parentModuleKey);

  if (!parentModule) {
    throw new Error(
      "Contexte parent invalide : module parent introuvable."
    );
  }

  const parentRecord =
    await FirestoreRuntimeRepository.findById(
      parentModule,
      parentRecordId
    );

  if (!parentRecord) {
    throw new Error(
      "Contexte parent invalide : enregistrement parent introuvable."
    );
  }

  RuntimeContextEnforcer.assertRecordInContext(
    parentModule,
    parentRecord
  );

  return {
    ...data,
    [parentForeignKey]: parentRecordId,
    parentModuleKey,
    parentRecordId,
    parentForeignKey,
  };
}

function isSchedulableModule(module: ERPModule): boolean {
  const metadata = module.metadata as ERPModule["metadata"] &
    Record<string, unknown>;

  const scheduling = metadata.scheduling as
    | { enabled?: boolean }
    | undefined;

  return scheduling?.enabled === true;
}

async function getSchedulingConfig(
  module: ERPModule,
  context: RuntimeBeforeMutationGuardContext
) {
  const effectiveSchedulingConfig =
    await RuntimeSchedulingSettingsResolver.resolveForRuntimeGuard({
      module,
      context: {
        tenantId: context.tenantId ?? "runtime",
        workspaceId: context.workspaceId,
        moduleKey: context.moduleKey ?? module.metadata.key,
      },
    });

  return effectiveSchedulingConfig.enabled
    ? effectiveSchedulingConfig
    : null;
}

function hasRealSchedulingDateAndTime(
  record: RuntimeRecord,
  fieldConfig: {
    dateField: string;
    timeField: string;
  }
): boolean {
  return Boolean(
    asString(record[fieldConfig.dateField]) &&
    asString(record[fieldConfig.timeField])
  );
}

function isPublicAppointmentRequest(record: RuntimeRecord): boolean {
  const motif =
    asString(record.motif).toLowerCase();

  const commentaire =
    asString(record.commentaire).toLowerCase();

  const source =
    asString(record.source).toLowerCase();

  return (
    motif.includes("demande de rendez-vous depuis le site public") ||
    commentaire.includes("demande de rendez-vous depuis le site public") ||
    source === "public" ||
    source === "site_public"
  );
}

function sameRuntimeScope(
  candidate: RuntimeRecord,
  reference: RuntimeRecord
): boolean {
  const tenantCandidate =
    asString(candidate.tenantId);

  const tenantReference =
    asString(reference.tenantId);

  const workspaceCandidate =
    asString(candidate.workspace);

  const workspaceReference =
    asString(reference.workspace);

  if (
    tenantCandidate &&
    tenantReference &&
    tenantCandidate !== tenantReference
  ) {
    return false;
  }

  if (
    workspaceCandidate &&
    workspaceReference &&
    workspaceCandidate !== workspaceReference
  ) {
    return false;
  }

  return true;
}

async function loadExistingSchedulableRecordsForConflictCheck(
  module: ERPModule,
  reference: RuntimeRecord
): Promise<RuntimeRecord[]> {
  const records =
    await FirestoreRuntimeRepository.findMany(module);

  return records.filter((record) =>
    sameRuntimeScope(record, reference)
  );
}

async function loadCurrentRecordForUpdate(
  module: ERPModule,
  id: string | undefined
): Promise<RuntimeRecord> {
  if (!id) {
    return {};
  }

  const currentRecord =
    await FirestoreRuntimeRepository.findById(
      module,
      id
    );

  if (!currentRecord) {
    return {};
  }

  return currentRecord;
}

async function guardSchedulableMutation(
  module: ERPModule,
  data: RuntimeRecord,
  context: RuntimeBeforeMutationGuardContext
): Promise<RuntimeRecord> {
  const currentRecord =
    context.operation === "update"
      ? await loadCurrentRecordForUpdate(
          module,
          context.id
        )
      : {};

  const mergedRecord: RuntimeRecord = {
    ...currentRecord,
    ...data,
    id:
      context.id ??
      data.id ??
      currentRecord.id,
  };

  const schedulingConfig =
    await getSchedulingConfig(module, context);

  if (!schedulingConfig) {
    return data;
  }

  const dateField = schedulingConfig.dateField ?? "date";
  const timeField = schedulingConfig.timeField ?? "time";
  const durationField = schedulingConfig.durationField ?? "durationMinutes";
  const startField = schedulingConfig.startField ?? "startAt";
  const endField = schedulingConfig.endField ?? "endAt";

  const schedulingFieldConfig = {
    dateField,
    timeField,
  };

  if (
    !hasRealSchedulingDateAndTime(mergedRecord, schedulingFieldConfig) &&
    isPublicAppointmentRequest(mergedRecord)
  ) {
    return data;
  }

  if (!hasRealSchedulingDateAndTime(mergedRecord, schedulingFieldConfig)) {
    throw new Error(
      "Le module planifiable doit avoir une date et une heure reelles avant sauvegarde."
    );
  }

  const slotPolicy = SchedulingSlotPolicyResolver.resolve({
    durationMinutes:
      typeof mergedRecord[durationField] === "number"
        ? (mergedRecord[durationField] as number)
        : Number(mergedRecord[durationField] ?? 0) || undefined,
    bufferMinutes: schedulingConfig?.bufferMinutes,
    capacity: schedulingConfig?.capacity,
  });

  const openingHoursValidation =
    RuntimeSchedulingEngine.assertWithinOpeningHours({
      // Q22C_OPENING_HOURS_GUARD
      // First consumer of the generic ERP Scheduling Runtime.
      // This remains generic: rendezvous provides date/time/duration, the engine validates the slot.
      date: asString(mergedRecord[dateField]),
      time: asString(mergedRecord[timeField]),
      durationMinutes:
        typeof mergedRecord[durationField] === "number"
        ? (mergedRecord[durationField] as number)
        : Number(mergedRecord[durationField] ?? 0) || undefined,
      // Q22F2B_PASS_CALENDAR_EXCEPTIONS_TO_GUARD
      // Generic ERP scheduling: persistence guard also applies calendar exceptions.
      calendarExceptions: schedulingConfig?.calendarExceptions,
    });

  if (!openingHoursValidation.ok) {
    throw new Error(
      openingHoursValidation.reason ??
      "Créneau indisponible selon les horaires d'ouverture."
    );
  }

  const normalizedRecord =
    RuntimeSchedulingEngine.normalizeAppointmentForScheduling(
      mergedRecord
    );

  const existingAppointments =
    await loadExistingSchedulableRecordsForConflictCheck(
      module,
      normalizedRecord
    );

  const capacity = slotPolicy.capacity;

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
        date: asString(mergedRecord[dateField]),
        durationMinutes: slotPolicy.visibleDurationMinutes,
        bookings,
        ignoreBookingId:
          context.id ??
          asString(normalizedRecord.id),
        bufferMinutes: slotPolicy.bufferMinutes,
        calendarExceptions:
          schedulingConfig?.calendarExceptions,
        capacity,
      });

    const selectedTime =
      asString(mergedRecord[timeField]);

    const selectedSlot =
      slots.find((slot) => slot.start === selectedTime);

    if (!selectedSlot || !selectedSlot.available) {
      throw new Error(
        selectedSlot?.reason ??
        "Créneau complet : la capacité maximale est atteinte."
      );
    }
  }

  if (context.operation === "update") {
    return {
      ...data,
      [durationField]:
        normalizedRecord[durationField],
      [startField]:
        normalizedRecord[startField],
      [endField]:
        normalizedRecord[endField],
    };
  }

  return normalizedRecord;
}

export async function processRuntimeBeforeMutationGuards(
  module: ERPModule,
  data: Record<string, unknown>,
  context: RuntimeBeforeMutationGuardContext
): Promise<Record<string, unknown>> {
  if (
    context.operation !== "create" &&
    context.operation !== "update"
  ) {
    return data;
  }

  let guardedData =
    await guardParentChildContextMutation(
      module,
      data as RuntimeRecord
    );

  if (isSchedulableModule(module)) {
    guardedData =
      await guardSchedulableMutation(
        module,
        guardedData,
        context
      );
  }

  guardedData =
    await guardRuntimeChronologyMutation(
      module,
      guardedData,
      context
    );

  return guardedData;
}
