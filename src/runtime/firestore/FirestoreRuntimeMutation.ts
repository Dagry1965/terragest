import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  RuntimeComputedEngine,
} from "@/runtime/computed/RuntimeComputedEngine";

import {
  runtimeEventBus,
} from "@/runtime/events/RuntimeEventBus";

import {
  FirestoreRuntimeRepository,
} from "./FirestoreRuntimeRepository";

import {
  RuntimeReferentialIntegrityEngine,
} from "@/runtime/integrity/RuntimeReferentialIntegrityEngine";

import {
  ERPSessionContext,
} from "@/runtime/security/sessions/ERPSessionContext";

function sanitizeFirestoreData(
  data: Record<string, unknown>
): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) {
      continue;
    }

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      sanitized[key] = sanitizeFirestoreData(
        value as Record<string, unknown>
      );

      continue;
    }

    if (Array.isArray(value)) {
      sanitized[key] = value.filter(
        (item) => item !== undefined
      );

      continue;
    }

    sanitized[key] = value;
  }

  return sanitized;
}

function applyRuntimeIsolation(
  module: ERPModule,
  data: Record<string, unknown>
) {
  const session =
    ERPSessionContext.current();

  return sanitizeFirestoreData({
    ...data,

    tenantId:
      data.tenantId ??
      session.tenantId ??
      "default",

    workspace:
      data.workspace ??
      module.metadata.category ??
      "general",

    moduleKey:
      module.metadata.key,

    userId:
      data.userId ??
      session.userId ??
      "system",
  });
}

function canComputeRuntimeField(
  dependsOn: string[] | undefined,
  data: Record<string, unknown>
): boolean {
  if (!dependsOn || dependsOn.length === 0) {
    return true;
  }

  return dependsOn.every((key) => {
    const value =
      data[key];

    return (
      value !== undefined &&
      value !== null &&
      value !== ""
    );
  });
}

function applyComputedFields(
  module: ERPModule,
  data: Record<string, unknown>
) {
  const nextData = {
    ...data,
  };

  for (const field of module.schema.fields) {
    if (!field.computed) {
      continue;
    }

    const computedValue =
      RuntimeComputedEngine.compute(
        field.computed.formula,
        nextData
      );

    nextData[field.key] =
      computedValue;
  }

  return sanitizeFirestoreData(nextData);
}


async function processRuntimePostMutationSideEffects(
  module: ERPModule,
  record: Record<string, unknown>
): Promise<void> {
  if (module.metadata.key !== "lignesinterventionauto") {
    return;
  }

  try {
    const { RuntimeStockMovementService } =
      await import("@/runtime/stock");

    const result =
      await RuntimeStockMovementService.processInterventionLineStock({
        line: record,
      });

    if (result.processed) {
      console.info(
        "[RUNTIME_STOCK_MOVEMENT_PROCESSED]",
        {
          moduleKey: module.metadata.key,
          recordId: String(record.id ?? record._id ?? ""),
          movementId: result.movementId,
        }
      );
    } else if (
      result.reason &&
      result.reason !== "not-piece-line" &&
      result.reason !== "line-not-validated" &&
      result.reason !== "already-processed"
    ) {
      console.warn(
        "[RUNTIME_STOCK_MOVEMENT_SKIPPED]",
        {
          moduleKey: module.metadata.key,
          recordId: String(record.id ?? record._id ?? ""),
          reason: result.reason,
        }
      );
    }
  } catch (error) {
    console.error(
      "[RUNTIME_STOCK_MOVEMENT_ERROR]",
      error
    );
  }
}

export class FirestoreRuntimeMutation {
  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    const isolatedData =
      applyRuntimeIsolation(
        module,
        data
      );

    const computedData =
      applyComputedFields(
        module,
        isolatedData
      );

    const safeData =
      sanitizeFirestoreData(
        computedData
      );

    const result =
      await FirestoreRuntimeRepository.create(
        module,
        safeData
      );

    await runtimeEventBus.emit(
      `${module.metadata.key}.created`,
      {
        ...safeData,
        result,
      }
    );

    const persistedRecordForSideEffects = {
      ...safeData,
      ...(typeof result === "object" && result !== null ? result : {}),
      id:
        (typeof result === "object" && result !== null
          ? (result as Record<string, unknown>).id
          : undefined) ??
        safeData.id,
    };

    await processRuntimePostMutationSideEffects(
      module,
      persistedRecordForSideEffects
    );

    return result;
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    const isolatedData =
      applyRuntimeIsolation(
        module,
        data
      );

    const computedData =
      applyComputedFields(
        module,
        isolatedData
      );

    const safeData =
      sanitizeFirestoreData(
        computedData
      );

    const result =
      await FirestoreRuntimeRepository.update(
        module,
        id,
        safeData
      );

    await runtimeEventBus.emit(
      `${module.metadata.key}.updated`,
      {
        id,
        ...safeData,
        result,
      }
    );

    const updatedRecordForSideEffects = {
      ...safeData,
      ...(typeof result === "object" && result !== null ? result : {}),
      id,
    };

    await processRuntimePostMutationSideEffects(
      module,
      updatedRecordForSideEffects
    );

    return result;
  }

  static async delete(
    module: ERPModule,
    id: string
  ) {
    await RuntimeReferentialIntegrityEngine.assertCanDelete(
      module,
      id
    );

    const result =
      await FirestoreRuntimeRepository.delete(
        module,
        id
      );

    await runtimeEventBus.emit(
      `${module.metadata.key}.deleted`,
      {
        id,
        result,
      }
    );

    return result;
  }
}