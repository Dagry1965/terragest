import {
  RuntimeEventRepository
}
from "../persistence/events/RuntimeEventRepository";

import {
  ConnectedRuntimeEventPublisher
}
from "./ConnectedRuntimeEventPublisher";

export class
PersistentRuntimePublisher {

  private repository =
    new RuntimeEventRepository();

  private publisher =
    new ConnectedRuntimeEventPublisher();

  async publish(
    type: string,
    payload?: unknown
  ) {

    await this.repository.append({
      type,
      payload,
    });

    this.publisher.publish(
      type,
      payload
    );

    console.log(
      "[PersistentRuntimePublisher]",
      type
    );
  }
}
