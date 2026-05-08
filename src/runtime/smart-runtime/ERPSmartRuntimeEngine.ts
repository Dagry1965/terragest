import type { ERPModule } from "@/runtime/modules";
import type { ERPSmartInsight } from "./ERPSmartInsight";

export class ERPSmartRuntimeEngine {
  static analyse(module: ERPModule): ERPSmartInsight[] {
    return [
      {
        id: `${module.metadata.key}-smart-1`,
        title: "Activite inhabituelle detectee",
        description:
          "Le volume d'activite est plus eleve que la normale.",
        level: "warning",
        recommendation:
          "Verifier les workflows en attente.",
      },
      {
        id: `${module.metadata.key}-smart-2`,
        title: "Performance stable",
        description:
          "Le module reste dans une plage operationnelle correcte.",
        level: "success",
        recommendation:
          "Maintenir les controles actuels.",
      },
      {
        id: `${module.metadata.key}-smart-3`,
        title: "Optimisation possible",
        description:
          "Des automatisations supplementaires peuvent etre activees.",
        level: "info",
        recommendation:
          "Activer les traitements automatiques.",
      },
    ];
  }
}