export const EventBus = {

  listeners: {} as any,

  on(
    event: string,
    callback: any
  ) {

    if (
      !this.listeners[event]
    ) {

      this.listeners[event] = [];
    }

    this.listeners[event].push(
      callback
    );
  },

  emit(
    event: string,
    payload: any
  ) {

    const callbacks =
      this.listeners[event] || [];

    callbacks.forEach(
      (callback: any) =>
        callback(payload)
    );
  },
};
