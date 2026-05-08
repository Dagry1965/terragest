import type {
  ERPDomainEvent,
} from "@/runtime/events/ERPDomainEvent";

type ERPRuntimeHook =
  (event: ERPDomainEvent) => void;

class ERPRuntimeHooksClass {

  private hooks:
    ERPRuntimeHook[] = [];

  register(
    hook: ERPRuntimeHook
  ) {

    this.hooks.push(hook);
  }

  trigger(
    event: ERPDomainEvent
  ) {

    for (
      const hook
      of this.hooks
    ) {

      hook(event);
    }
  }
}

export const ERPRuntimeHooks =
  new ERPRuntimeHooksClass();