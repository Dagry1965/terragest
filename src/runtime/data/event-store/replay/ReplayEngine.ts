import { PersistentEventStore }
from "../PersistentEventStore";

export class ReplayEngine {

  private store =
    new PersistentEventStore();

  replay(
    stream: string
  ) {

    return this.store.replay(
      stream
    );
  }
}
