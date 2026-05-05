import { EventBus }
from "../../src/runtime/events/EventBus";

describe(
  "EventBus",
  () => {

    it(
      "should dispatch event",
      () => {

        const bus =
          new EventBus();

        let triggered =
          false;

        bus.on(
          "TEST_EVENT",
          () => {

            triggered = true;
          }
        );

        bus.emit(
          "TEST_EVENT"
        );

        expect(
          triggered
        ).toBe(true);
      }
    );
  }
);
