import type { RuntimeEvent }
from "../types/RuntimeEvent";

type RuntimeHandler =
  (event: RuntimeEvent) => void | Promise<void>;

export class RuntimeRegistry {

  private handlers =
    new Map<string, RuntimeHandler[]>();

  register(
    type: string,
    handler: RuntimeHandler
  ) {

    const handlers =
      this.handlers.get(type) ?? [];

    handlers.push(handler);

    this.handlers.set(
      type,
      handlers
    );
  }

  getHandlers(
    type: string
  ) {

    return this.handlers.get(type) ?? [];
  }
}