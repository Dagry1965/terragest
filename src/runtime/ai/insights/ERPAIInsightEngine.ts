import { ERPRegistry } from "@/runtime/registry";
import { getERPMonitoringSnapshot } from "@/runtime/monitoring";
import type { ERPAIInsight } from "./ERPAIInsight";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function generateERPAIInsights(): ERPAIInsight[] {
  const monitoring = getERPMonitoringSnapshot();
  const modules = ERPRegistry.modules();

  return [
    {
      id: createId("ai_insight"),
      title: "Couverture runtime elevee",
      description: `${modules.length} modules sont raccordes au registre ERP central.`,
      module: "runtime",
      level: "info",
      confidence: 92,
      createdAt: new Date().toISOString(),
    },
    {
      id: createId("ai_insight"),
      title: "Surveillance des erreurs active",
      description: `${monitoring.errors.total} signaux d'erreur sont suivis par le Monitoring Center.`,
      module: "monitoring",
      level: monitoring.errors.total > 0 ? "warning" : "info",
      confidence: 88,
      createdAt: new Date().toISOString(),
    },
    {
      id: createId("ai_insight"),
      title: "Architecture SaaS prete",
      description: "Les couches tenant, security, persistence, workers et streams sont presentes.",
      module: "platform",
      level: "info",
      confidence: 86,
      createdAt: new Date().toISOString(),
    },
  ];
}