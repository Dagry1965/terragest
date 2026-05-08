import { runtimeExecutionRegistry } from "./RuntimeExecutionRegistry";

export function getRuntimeExecutions() {
  return runtimeExecutionRegistry.getExecutions();
}
