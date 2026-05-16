import { getERPMonitoringSnapshot } from "@/runtime/monitoring";

import {
  RuntimeMetrics,
} from "@/runtime/metrics/RuntimeMetrics";

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

  const revenueReal =
    RuntimeMetrics.aggregateSum(
      "amarkhys.revenue.real",
      { workspace: "amarkhys" }
    );

  const revenuePredicted =
    RuntimeMetrics.aggregateSum(
      "amarkhys.revenue.predicted",
      { workspace: "amarkhys" }
    );

  const facturesPaid =
    RuntimeMetrics.count(
      "amarkhys.factures.paid",
      { workspace: "amarkhys" }
    );

  const interventionsCompleted =
    RuntimeMetrics.count(
      "amarkhys.interventions.completed",
      { workspace: "amarkhys" }
    );

  if (
    revenuePredicted > 0 &&
    revenueReal === 0
  ) {
    anomalies.push({
      id: createId("ai_anomaly"),
      module: "facturesauto",
      signal: "PREDICTED_REVENUE_WITHOUT_REAL_REVENUE",
      severity: "medium",
      description: "CA previsionnel detecte mais aucun CA reel encaisse.",
      detectedAt: new Date().toISOString(),
    });
  }

  if (
    interventionsCompleted >= 10 &&
    facturesPaid === 0
  ) {
    anomalies.push({
      id: createId("ai_anomaly"),
      module: "interventionsauto",
      signal: "COMPLETED_INTERVENTIONS_WITHOUT_PAID_INVOICES",
      severity: "high",
      description: "Nombre eleve d'interventions terminees sans factures payees.",
      detectedAt: new Date().toISOString(),
    });
  }

  if (
    revenueReal > 0 &&
    revenuePredicted > 0 &&
    revenueReal < revenuePredicted * 0.3
  ) {
    anomalies.push({
      id: createId("ai_anomaly"),
      module: "facturesauto",
      signal: "LOW_REAL_REVENUE_CONVERSION",
      severity: "medium",
      description: "Le CA reel represente moins de 30% du CA previsionnel.",
      detectedAt: new Date().toISOString(),
    });
  }

  return anomalies;
}