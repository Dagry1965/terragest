import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  FirestoreRuntimeRepository,
} from "@/runtime/firestore/FirestoreRuntimeRepository";

import {
  RuntimeSchedulingEngine,
  type RuntimeRecord,
} from "@/runtime/scheduling/RuntimeSchedulingEngine";

export interface RuntimeBeforeMutationGuardContext {
  operation: "create" | "update";
  id?: string;
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

function isRendezvousModule(module: ERPModule): boolean {
  return module.metadata.key === "rendezvous";
}

function hasRealAppointmentDateAndTime(record: RuntimeRecord): boolean {
  return Boolean(
    asString(record.dateRendezVous) &&
    asString(record.heureRendezVous)
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

async function loadExistingRendezvousForConflictCheck(
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

async function guardRendezvousMutation(
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

  const mergedRecord = {
    ...currentRecord,
    ...data,
    id:
      context.id ??
      data.id ??
      currentRecord.id,
  };

  if (
    !hasRealAppointmentDateAndTime(mergedRecord) &&
    isPublicAppointmentRequest(mergedRecord)
  ) {
    return data;
  }

  if (!hasRealAppointmentDateAndTime(mergedRecord)) {
    throw new Error(
      "Le rendez-vous doit avoir une date et une heure réelles avant sauvegarde."
    );
  }

  const normalizedRecord =
    RuntimeSchedulingEngine.normalizeAppointmentForScheduling(
      mergedRecord
    );

  const existingAppointments =
    await loadExistingRendezvousForConflictCheck(
      module,
      normalizedRecord
    );

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

  if (context.operation === "update") {
    return {
      ...data,
      durationMinutes:
        normalizedRecord.durationMinutes,
      startAt:
        normalizedRecord.startAt,
      endAt:
        normalizedRecord.endAt,
    };
  }

  return normalizedRecord;
}

export async function processRuntimeBeforeMutationGuards(
  module: ERPModule,
  data: Record<string, unknown>,
  context: RuntimeBeforeMutationGuardContext
): Promise<Record<string, unknown>> {
  if (!isRendezvousModule(module)) {
    return data;
  }

  if (
    context.operation !== "create" &&
    context.operation !== "update"
  ) {
    return data;
  }

  return guardRendezvousMutation(
    module,
    data,
    context
  );
}
