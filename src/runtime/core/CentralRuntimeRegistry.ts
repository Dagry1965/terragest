import { runtimeAlertRegistry } from "./RuntimeAlertRegistry";

export function getRuntimeAlerts() {
  return runtimeAlertRegistry.getAlerts();
}
