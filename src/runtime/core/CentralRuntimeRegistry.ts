import { runtimeWorkerRegistry } from "./RuntimeWorkerRegistry";

export function getRuntimeWorkers() {
  return runtimeWorkerRegistry.getWorkers();
}
