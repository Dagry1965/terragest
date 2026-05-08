import type {
  ERPEventRuntimeEvent,
  ERPEventRuntimeLevel,
} from "./ERPEventRuntimeTypes";
import { ERPEventRuntimeStore } from "./ERPEventRuntimeStore";
import { ERPEventRuntimeSubscriptionRegistry } from "./ERPEventRuntimeSubscriptionRegistry";

interface EmitOptions {
  name: string;
  sourceModule: string;
  payload?: Record<string, unknown>;
  level?: ERPEventRuntimeLevel;
}

export class ERPEventRuntimeBus {
  static emit({
    name,
    sourceModule,
    payload = {},
    level = "info",
  }: EmitOptions): ERPEventRuntimeEvent {
    const subscriptions =
      ERPEventRuntimeSubscriptionRegistry.forEvent(name);

    const event: ERPEventRuntimeEvent = {
      id: `${name}-${Date.now()}`,
      name,
      sourceModule,
      targetModules: subscriptions.map(
        (subscription) => subscription.moduleKey
      ),
      payload,
      level,
      createdAt: new Date().toISOString(),
    };

    ERPEventRuntimeStore.push(event);

    console.log("ERP EVENT EMITTED", event);

    return event;
  }

  static replay(moduleKey?: string) {
    if (moduleKey) {
      return ERPEventRuntimeStore.forModule(moduleKey);
    }

    return ERPEventRuntimeStore.all();
  }
}