import { getERPMonitoringSnapshot } from "@/runtime/monitoring";
import type { ERPAIAnomaly } from "./ERPAIAnomaly";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function detectERPAIAnomalies(): ERPAIAnomaly[] {
  const monitoring = getERPMonitoringSnapshot();
  const anomalies: ERPAIAnomaly[] = [];

  if (monitoring.errors.total > 0) {
    anomalies.push({
      id: createId("ai_anomaly"),
      module: "monitoring",
      signal: "ERROR_SIGNALS",
      severity: "medium",
      description: `${monitoring.errors.total} signaux d'erreur detectes.`,
      detectedAt: new Date().toISOString(),
    });
  }

  if (monitoring.metrics.healthCritical > 0) {
    anomalies.push({
      id: createId("ai_anomaly"),
      module: "health",
      signal: "CRITICAL_HEALTH",
      severity: "high",
      description: "Des health checks critiques sont presents.",
      detectedAt: new Date().toISOString(),
    });
  }

  return anomalies;
}