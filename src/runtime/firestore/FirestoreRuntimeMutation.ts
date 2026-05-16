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
  ERPSessionContext,
} from "@/runtime/security/sessions/ERPSessionContext";

function applyRuntimeIsolation(
  module: ERPModule,
  data: Record<string, unknown>
) {
  const session =
    ERPSessionContext.current();

  return {
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
      session.userId,
  };
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

  return nextData;
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

    const result =
      await FirestoreRuntimeRepository.create(
        module,
        computedData
      );

    await runtimeEventBus.emit(
      `${module.metadata.key}.created`,
      {
        ...computedData,
        result,
      }
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

    const result =
      await FirestoreRuntimeRepository.update(
        module,
        id,
        computedData
      );

    await runtimeEventBus.emit(
      `${module.metadata.key}.updated`,
      {
        id,
        ...computedData,
        result,
      }
    );

    return result;
  }

  static async delete(
    module: ERPModule,
    id: string
  ) {
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