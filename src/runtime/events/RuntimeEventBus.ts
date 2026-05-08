import {
  RuntimeBusinessRulesEngine,
}
from "@/runtime/business-rules/RuntimeBusinessRulesEngine";

export class RuntimeEventBus {

  private listeners:
    Record<
      string,
      Function[]
    > = {};

  on(
    event: string,
    callback: Function
  ) {

    if (
      !this.listeners[event]
    ) {

      this.listeners[event] = [];
    }

    this.listeners[event]
      .push(callback);
  }

  async emit(

    event: string,

    payload?: any,

  ) {

    console.log(
      "Runtime Event",
      event,
      payload
    );

    // =====================================================
    // BUSINESS RULES
    // =====================================================

    await RuntimeBusinessRulesEngine
      .execute(
        event,
        payload
      );

    // =====================================================
    // EVENT LISTENERS
    // =====================================================

    const listeners =
      this.listeners[event] || [];

    for (
      const callback of listeners
    ) {

      await callback(
        payload
      );
    }
  }
}

export const runtimeEventBus =
  new RuntimeEventBus();
