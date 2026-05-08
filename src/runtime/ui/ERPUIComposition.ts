import type { ERPModule } from "@/runtime/modules";
import { ERPActionRegistry } from "@/runtime/actions";

export interface ERPUIComposition {
  title: string;
  description?: string;
  category?: string;
  actions: ReturnType<typeof ERPActionRegistry.forModule>;
  tabs: string[];
  kpis: {
    label: string;
    value: string;
    helper: string;
  }[];
}

export class ERPUIComposer {
  static compose(module: ERPModule): ERPUIComposition {
    return {
      title: module.metadata.label,
      description: module.metadata.description,
      category: module.metadata.category,
      actions: ERPActionRegistry.forModule(module),
      tabs: ["Vue generale", "Liste", "Activite", "Workflows", "Audit"],
      kpis: [
        {
          label: "Total",
          value: "182",
          helper: "enregistrements",
        },
        {
          label: "Actifs",
          value: "148",
          helper: "operationnels",
        },
        {
          label: "En suivi",
          value: "28",
          helper: "a surveiller",
        },
        {
          label: "Alertes",
          value: "6",
          helper: "priorites",
        },
      ],
    };
  }
}