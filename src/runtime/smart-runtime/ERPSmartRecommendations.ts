import type { ERPModule } from "@/runtime/modules";

export class ERPSmartRecommendations {
  static generate(module: ERPModule): string[] {
    return [
      `Analyser les donnees du module ${module.metadata.label}.`,
      "Verifier les elements critiques.",
      "Optimiser les automatisations.",
      "Controler les dependances metier.",
    ];
  }
}