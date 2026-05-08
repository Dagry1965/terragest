import type { ERPModule } from "@/runtime/modules";
import type { SmartPrediction } from "./SmartIntelligenceTypes";

export class SmartPredictionEngine {
  static predict(module: ERPModule): SmartPrediction[] {
    if (module.metadata.key === "stocks") {
      return [
        {
          id: "stock-rupture-prediction",
          moduleKey: module.metadata.key,
          title: "Rupture possible",
          description:
            "Une rupture peut survenir si le rythme actuel continue.",
          probability: 76,
        },
      ];
    }

    if (module.metadata.key === "materiels") {
      return [
        {
          id: "materiel-downtime-prediction",
          moduleKey: module.metadata.key,
          title: "Immobilisation possible",
          description:
            "Risque d'immobilisation si aucune maintenance n'est planifiee.",
          probability: 68,
        },
      ];
    }

    return [
      {
        id: `${module.metadata.key}-stability-prediction`,
        moduleKey: module.metadata.key,
        title: "Stabilite probable",
        description:
          "Aucun risque majeur n'est detecte a court terme.",
        probability: 24,
      },
    ];
  }
}