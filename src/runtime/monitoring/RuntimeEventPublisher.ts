import {
  LiveObservabilityService
}
from "../../features/observability/services/live/LiveObservabilityService";

export class
RuntimeEventPublisher {

  private service =
    new LiveObservabilityService();

  publish(
    type: string,
    payload?: unknown
  ) {

    this.service.publish(
      type,
      payload
    );
  }
}
