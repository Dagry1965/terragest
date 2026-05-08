import {
  PersistentRuntimePublisher
}
from "../../../runtime/monitoring/PersistentRuntimePublisher";

export class
MaterielRuntimeHook {

  private runtime =
    new PersistentRuntimePublisher();

  async emit(
    type: string,
    payload?: unknown
  ) {

    await this.runtime.publish(
      type,
      payload
    );
  }
}
