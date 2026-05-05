import {
  PersistentEventStore
}
from "../../src/runtime/data/event-store/PersistentEventStore";

describe(
  "PersistentEventStore",
  () => {

    it(
      "should append event",
      () => {

        const store =
          new PersistentEventStore();

        store.append({
          id: "1",
          type:
            "TEST_EVENT",
          stream:
            "test",
          timestamp:
            Date.now(),
        });

        const events =
          store.load("test");

        expect(
          events.length
        ).toBe(1);
      }
    );
  }
);
