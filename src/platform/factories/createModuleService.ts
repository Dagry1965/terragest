// src/platform/factories/createModuleService.ts

import { ModuleRuntime }
from "@/platform/modules/runtime/ModuleRuntime";

import { ExecutionMode }
from "@/platform/modules/types/ExecutionMode";

export function createModuleService(
  domain: string
) {

  return {

    async create(
      payload: unknown
    ) {

      await ModuleRuntime.create({

        domain,

        action: "create",

        mode:
          ExecutionMode.STANDARD,

        payload
      });
    }
  };
}
