type EventCallback =
(payload: any) => void;

class EnterpriseEventBus {

  private listeners:
  Record<
    string,
    EventCallback[]
  > = {};

  on(
    event: string,
    callback: EventCallback
  ) {

    if (
      !this.listeners[event]
    ) {

      this.listeners[event] = [];
    }

    this.listeners[event].push(
      callback
    );
  }

  emit(
    event: string,
    payload: any
  ) {

    const callbacks =
      this.listeners[event] || [];

    callbacks.forEach(
      (callback) => {

        callback(payload);
      }
    );
  }
}

export const EventBus =
new EnterpriseEventBus();
