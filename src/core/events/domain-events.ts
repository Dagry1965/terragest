export type ERPDomainEvent = {
  name: string;
  module: string;
  timestamp: string;
  payload?: any;
};

export function createDomainEvent(
  event: ERPDomainEvent
) {
  console.log(
    "ERP DOMAIN EVENT CREATED",
    event
  );

  return event;
}
