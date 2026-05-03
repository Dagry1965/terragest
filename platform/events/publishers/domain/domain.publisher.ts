import { EventBus }
from "../../core/event-bus";

const eventBus =
  new EventBus();

export function publishDomainEvent(
  type: string,
  payload?: any
) {

  eventBus.publish({

    type,

    payload,

    timestamp: new Date(),
  });
}
