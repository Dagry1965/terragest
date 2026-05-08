import type { ERPModule } from "@/runtime/modules";
import type { SmartRecommendation } from "./SmartIntelligenceTypes";

export class SmartRecommendationEngine {
  static recommend(module: ERPModule): SmartRecommendation[] {
    const common: SmartRecommendation[] = [
      {
        id: `${module.metadata.key}-audit-review`,
        moduleKey: module.metadata.key,
        title: "Verifier l'audit recent",
        description:
          "Consulter les derniers evenements pour confirmer la coherence operationnelle.",
        actionLabel: "Ouvrir audit",
        priority: "medium",
      },
    ];

    if (module.metadata.key === "stocks") {
      return [
        {
          id: "stock-reorder",
          moduleKey: module.metadata.key,
          title: "Preparer un reapprovisionnement",
          description:
            "Une commande preventive peut eviter une rupture.",
          actionLabel: "Lancer workflow",
          priority: "critical",
        },
        ...common,
      ];
    }

    if (module.metadata.key === "materiels") {
      return [
        {
          id: "materiel-maintenance-plan",
          moduleKey: module.metadata.key,
          title: "Planifier une maintenance preventive",
          description:
            "Les signaux indiquent une priorite de maintenance.",
          actionLabel: "Creer intervention",
          priority: "high",
        },
        ...common,
      ];
    }

    return common;
  }
}