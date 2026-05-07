export type SupervisionEvent = {
  module: string;
  level:
    | "info"
    | "warning"
    | "critical";
  message: string;
};

export function pushSupervisionEvent(
  event: SupervisionEvent
) {
  console.log(
    "ERP SUPERVISION EVENT",
    event
  );
}
