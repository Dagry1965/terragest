export interface ERPEvent {

  type: string;

  module: string;

  payload:
    Record<string, unknown>;
}

type ERPEventHandler = (
  event: ERPEvent
) => void;

export class ERPEventBus {

  private handlers:
    ERPEventHandler[] = [];

  subscribe(
    handler: ERPEventHandler
  ) {

    this.handlers.push(
      handler
    );
  }

  publish(
    event: ERPEvent
  ) {

    this.handlers.forEach(
      handler =>
        handler(event)
    );
  }
}

export const erpEventBus =
  new ERPEventBus();