import { runtimeQueueRegistry } from "./RuntimeQueueRegistry";

export function getRuntimeQueues() {
  return runtimeQueueRegistry.getJobs();
}
