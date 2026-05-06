import { RuntimeEventPublisher }
from "../../monitoring/RuntimeEventPublisher";

import type { RuntimeContext }
from "../context/RuntimeContext";

import type { RuntimeEvent }
from "../types/RuntimeEvent";

export class RuntimePublisher {

  private publisher =
    new RuntimeEventPublisher();

  async publish(
    event: Omit<RuntimeEvent, "timestamp">,
    context?: RuntimeContext
  ) {

    const runtimeEvent: RuntimeEvent = {
      ...event,
      timestamp:
        Date.now(),
      metadata: {
        ...event.metadata,
        ...context,
      },
    };

    await this.publisher.publish(
      runtimeEvent.type,
      runtimeEvent
    );

    return runtimeEvent;
  }
}