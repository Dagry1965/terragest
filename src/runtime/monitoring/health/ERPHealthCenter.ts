import { ERPRegistry } from "@/runtime/registry";
import { ERPCircuitBreaker } from "@/runtime/resilience";
import { ERPTenantRegistry } from "@/runtime/tenant";
import { ERPWorkerRegistry } from "@/runtime/workers";
import type { ERPHealthCheck } from "./ERPHealthCheck";

export function getERPHealthChecks(): ERPHealthCheck[] {
  const modules = ERPRegistry.modules();
  const workers = ERPWorkerRegistry;
  const tenants = ERPTenantRegistry;

  return [
    {
      key: "registry",
      label: "Runtime Registry",
      status: modules.length > 0 ? "healthy" : "critical",
      description: `${modules.length} modules enregistres`,
    },
    {
      key: "workers",
      label: "Workers",
      status: workers.some((worker) => worker.status === "running")
        ? "healthy"
        : "warning",
      description: `${workers.length} workers declares`,
    },
    {
      key: "tenants",
      label: "Tenants",
      status: tenants.some((tenant) => tenant.status === "active")
        ? "healthy"
        : "critical",
      description: `${tenants.length} tenants declares`,
    },
    {
      key: "circuit-breaker",
      label: "Circuit Breaker",
      status:
        ERPCircuitBreaker.currentState() === "open"
          ? "critical"
          : "healthy",
      description: `Etat: ${ERPCircuitBreaker.currentState()}`,
    },
  ];
}