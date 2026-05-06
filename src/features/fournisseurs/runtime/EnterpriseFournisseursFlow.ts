import {
  RuntimeModuleOrchestrator
}
from "@/runtime/orchestration/RuntimeModuleOrchestrator";

import {
  RuntimeEventRegistry
}
from "@/runtime/events/RuntimeEventRegistry";

export class EnterpriseFournisseursFlow {
  private orchestrator =
    new RuntimeModuleOrchestrator();

  async create(
    payload?: unknown
  ) {
    await this.orchestrator.emit(
      "fournisseurs",
      RuntimeEventRegistry.FOURNISSEURS_CREATED,
      payload
    );

    console.log(
      "[EnterpriseFournisseursFlow]"
    );
  }
}