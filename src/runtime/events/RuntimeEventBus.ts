import {
  RuntimeBusinessRulesEngine,
}
from "@/runtime/business-rules/RuntimeBusinessRulesEngine";

import {
  RuntimeMetrics,
}
from "@/runtime/metrics/RuntimeMetrics";

export class RuntimeEventBus {
  private listeners: Record<string, Function[]> = {};

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  async emit(event: string, payload?: any) {
    RuntimeMetrics.increment(
      event,
      {
        tenantId: payload?.tenantId,
        workspace: payload?.workspace,
        moduleKey: payload?.moduleKey,
        userId: payload?.userId,
        source: "runtimeEventBus",
      }
    );

    console.log(
      "[Runtime Event]",
      event,
      payload
    );

    await RuntimeBusinessRulesEngine.execute(
      event,
      payload
    );

    const listeners =
      this.listeners[event] || [];

    for (const callback of listeners) {
      await callback(payload);
    }
  }
}

export const runtimeEventBus =
  new RuntimeEventBus();
