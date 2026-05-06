import { EventBus }
from "../../events/EventBus";

import type { RuntimeEvent }
from "../types/RuntimeEvent";

type RuntimeEventHandler =
  (event: RuntimeEvent) => void | Promise<void>;

export class RuntimeSubscriber {

  constructor(
    private eventBus: EventBus
  ) {}

  on(
    type: string,
    handler: RuntimeEventHandler
  ) {

    this.eventBus.on(
      type,
      async payload => {

        await handler(
          payload as RuntimeEvent
        );
      }
    );
  }
}