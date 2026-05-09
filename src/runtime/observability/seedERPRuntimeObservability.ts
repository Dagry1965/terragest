import {
  ERPObservabilityTimeline,
} from "./ERPObservabilityTimeline";

export function seedERPRuntimeObservability() {
  ERPObservabilityTimeline.add({
    id: "observability-1",
    title: "Runtime observability initialized",
    description: "Le module observability ERP est initialisé.",
    module: "runtime",
    action: "observability.bootstrap",
    actor: "system",
    level: "info",
    type: "info",
    createdAt: new Date().toISOString(),
  });
}