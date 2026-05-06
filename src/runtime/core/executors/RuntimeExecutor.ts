import type { RuntimeEvent }
from "../types/RuntimeEvent";

import { RuntimeRegistry }
from "../registry/RuntimeRegistry";

export class RuntimeExecutor {

  constructor(
    private registry: RuntimeRegistry
  ) {}

  async execute(
    event: RuntimeEvent
  ) {

    const handlers =
      this.registry.getHandlers(
        event.type
      );

    for (const handler of handlers) {
      await handler(event);
    }

    return {
      executed: handlers.length,
      event,
    };
  }
}