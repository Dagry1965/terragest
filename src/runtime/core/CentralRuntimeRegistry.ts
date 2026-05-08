import { runtimeMetricsRegistry } from "./RuntimeMetricsRegistry";

export function getRuntimeMetrics() {
  return runtimeMetricsRegistry.getMetrics();
}
