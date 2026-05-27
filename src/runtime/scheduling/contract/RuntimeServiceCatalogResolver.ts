import type {
  RuntimeSchedulingServiceOption,
} from "./RuntimeSchedulingContractTypes";

function normalizeCode(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

const DEFAULT_RUNTIME_SERVICES: RuntimeSchedulingServiceOption[] = [
  {
    id: "vidange",
    code: "vidange",
    label: "Vidange",
    category: "Entretien",
    description: "Vidange moteur et vérifications courantes.",
    durationMinutes: 60,
    order: 10,
    source: "system",
  },
  {
    id: "diagnostic",
    code: "diagnostic",
    label: "Diagnostic",
    category: "Diagnostic",
    description: "Contrôle et identification du besoin avant intervention.",
    durationMinutes: 60,
    order: 20,
    source: "system",
  },
  {
    id: "reparation",
    code: "reparation",
    label: "Réparation",
    category: "Atelier",
    description: "Intervention ou réparation atelier.",
    durationMinutes: 75,
    order: 30,
    source: "system",
  },
  {
    id: "controle",
    code: "controle",
    label: "Contrôle",
    category: "Contrôle",
    description: "Contrôle atelier ou vérification ciblée.",
    durationMinutes: 60,
    order: 40,
    source: "system",
  },
  {
    id: "autre",
    code: "autre",
    label: "Autre",
    category: "Autre",
    description: "Demande spécifique à qualifier.",
    durationMinutes: 60,
    order: 999,
    source: "system",
  },
];

export class RuntimeServiceCatalogResolver {
  static getDefaultServices(): RuntimeSchedulingServiceOption[] {
    return DEFAULT_RUNTIME_SERVICES;
  }

  static normalizeServices(
    services: RuntimeSchedulingServiceOption[]
  ): RuntimeSchedulingServiceOption[] {
    const seen = new Set<string>();

    return services
      .map((service, index) => {
        const code =
          service.code ||
          normalizeCode(service.label) ||
          "service_" + String(index + 1);

        return {
          ...service,
          id: service.id || code,
          code,
          durationMinutes:
            Math.max(1, Number(service.durationMinutes || 60)),
          order:
            Number.isFinite(Number(service.order))
              ? Number(service.order)
              : 999,
        };
      })
      .filter((service) => {
        if (seen.has(service.code)) {
          return false;
        }

        seen.add(service.code);
        return true;
      })
      .sort((a, b) =>
        a.order - b.order ||
        a.label.localeCompare(b.label)
      );
  }

  static mergeWithDefaults(
    services: RuntimeSchedulingServiceOption[]
  ): RuntimeSchedulingServiceOption[] {
    if (services.length === 0) {
      return DEFAULT_RUNTIME_SERVICES;
    }

    return RuntimeServiceCatalogResolver.normalizeServices(services);
  }
}
