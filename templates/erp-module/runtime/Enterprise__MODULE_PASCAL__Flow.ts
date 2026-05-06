import {
  RuntimeModuleOrchestrator
}
from "@/runtime/orchestration/RuntimeModuleOrchestrator";

import {
  RuntimeEventRegistry
}
from "@/runtime/events/RuntimeEventRegistry";

export class Enterprise__MODULE_PASCAL__Flow {
  private orchestrator =
    new RuntimeModuleOrchestrator();

  async create(
    payload?: unknown
  ) {
    await this.orchestrator.emit(
      "__MODULE__",
      RuntimeEventRegistry.__MODULE_EVENT_PREFIX___CREATED,
      payload
    );

    console.log(
      "[Enterprise__MODULE_PASCAL__Flow]"
    );
  }
}