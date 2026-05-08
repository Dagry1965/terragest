import type { ERPModule } from "@/runtime/modules";
import type { SmartAnomaly } from "./SmartIntelligenceTypes";

export class SmartAnomalyDetector {
  static detect(module: ERPModule): SmartAnomaly[] {
    if (module.metadata.key === "stocks") {
      return [
        {
          id: "stock-consumption-anomaly",
          moduleKey: module.metadata.key,
          title: "Consommation anormale",
          description:
            "Le rythme de consommation semble superieur au comportement habituel.",
          level: "high",
        },
        {
          id: "stock-rupture-risk",
          moduleKey: module.metadata.key,
          title: "Risque de rupture",
          description:
            "Certains niveaux de stock peuvent devenir critiques prochainement.",
          level: "critical",
        },
      ];
    }

    if (module.metadata.key === "materiels") {
      return [
        {
          id: "materiel-maintenance-risk",
          moduleKey: module.metadata.key,
          title: "Maintenance sensible",
          description:
            "Plusieurs signaux indiquent un risque de panne ou d'immobilisation.",
          level: "high",
        },
      ];
    }

    return [
      {
        id: `${module.metadata.key}-activity-variation`,
        moduleKey: module.metadata.key,
        title: "Variation d'activite",
        description:
          "Une variation operationnelle merite une verification rapide.",
        level: "medium",
      },
    ];
  }
}