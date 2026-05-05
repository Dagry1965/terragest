import {
  liveEventStore
}
from "../../stores/live/liveEventStore";

export class
LiveObservabilityService {

  publish(
    type: string,
    payload?: unknown
  ) {

    liveEventStore.push({
      type,
      timestamp:
        Date.now(),
      payload,
    });
  }
}
