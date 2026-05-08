import type { ERPModule } from "@/runtime/modules";

export interface ERPSmartPriority {
  label: string;
  value: string;
}

export class ERPSmartPriorityEngine {
  static priorities(module: ERPModule): ERPSmartPriority[] {
    return [
      {
        label: "Priorite haute",
        value: "4 actions critiques",
      },
      {
        label: "Suivi operationnel",
        value: "2 workflows ouverts",
      },
      {
        label: "Verification",
        value: "1 controle recommande",
      },
    ];
  }
}