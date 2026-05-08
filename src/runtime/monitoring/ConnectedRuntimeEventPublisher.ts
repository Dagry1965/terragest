import {
  runtimeActivityStore
}
from "../../features/platform/components/runtime/runtimeActivityStore";

import {
  liveEventStore
}
from "../../features/observability/stores/live/liveEventStore";

export class
ConnectedRuntimeEventPublisher {

  publish(
    type: string,
    payload?: unknown
  ) {

    const event = {
      type,
      timestamp:
        Date.now(),
      payload,
    };

    runtimeActivityStore.push(
      event
    );

    liveEventStore.push(
      event
    );

    console.log(
      "[ConnectedRuntimeEvent]",
      type
    );
  }
}
