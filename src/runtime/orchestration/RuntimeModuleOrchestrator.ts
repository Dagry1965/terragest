import {
  RuntimePublisher
}
from "../core/services/RuntimePublisher";

export class
RuntimeModuleOrchestrator {

  private publisher =
    new RuntimePublisher();

  async emit(

    module: string,

    type: string,

    payload?: unknown
  ) {

    await this.publisher.publish({

      type,

      source:
        module,

      module,

      payload,
    });

    console.log(
      `[RuntimeModuleOrchestrator] ${type}`
    );
  }
}