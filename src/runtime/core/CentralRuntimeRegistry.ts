import { runtimeRetryRegistry } from "./RuntimeRetryRegistry";

export function getRuntimeRetries() {
  return runtimeRetryRegistry.getRetries();
}
