// src/domains/stock/services/StockService.ts

import { ModuleRuntime }
from "@/platform/modules/runtime/ModuleRuntime";

import { ExecutionMode }
from "@/platform/modules/types/ExecutionMode";

export class StockService {

  static async create(
    payload: unknown
  ) {

    await ModuleRuntime.create({

      domain: "stock",

      action: "create",

      mode:
        ExecutionMode.STANDARD,

      payload
    });
  }
}
