import {
  allERPModules,
} from "@/runtime/modules";

export type ERPModuleGroup =
  | "Pilotage"
  | "Metier"
  | "Operations"
  | "Finance"
  | "Systeme"
  | "Administration"
  | "Foncier"
  | "Logistique"
  | "Referentiel";

export type ERPModuleFeature = {
  workflow?: boolean;
  audit?: boolean;
  supervision?: boolean;
  notifications?: boolean;
};

export type ERPModule = {
  key: string;
  label: string;
  pluralLabel: string;
  description?: string;
  group: ERPModuleGroup;
  enabled: boolean;
  routes: {
    list: string;
    create: string;
    details: (id: string) => string;
    edit: (id: string) => string;
  };
  permissions?: string[];
  features?: ERPModuleFeature;
};

function normalizeGroup(
  value: string | undefined
): ERPModuleGroup {
  switch (value) {
    case "Pilotage":
    case "Finance":
    case "Administration":
    case "Foncier":
    case "Logistique":
      return value;

    case "Referentiel":
    case "RÃ©fÃ©rentiel":
      return "Referentiel";

    case "Operations":
    case "OpÃ©rations":
      return "Operations";

    case "Metier":
    case "MÃ©tier":
      return "Metier";

    case "Systeme":
    case "SystÃ¨me":
      return "Systeme";

    default:
      return "Metier";
  }
}

function toCoreNavigationModule(
  module: (typeof allERPModules)[number]
): ERPModule {
  const key =
    module.metadata.key;

  const routes =
    module.metadata.routes;

  return {
    key,

    label:
      module.metadata.label,

    pluralLabel:
      module.metadata.label,

    description:
      module.metadata.description,

    group:
      normalizeGroup(
        module.metadata.category
      ),

    enabled:
      module.metadata.enabled !== false,

    routes: {
      list:
        routes?.list ??
        `/${key}`,

      create:
        routes?.create ??
        `/${key}/nouveau`,

      details:
        (id: string) =>
          `${routes?.details ?? `/${key}`}/${id}`,

      edit:
        (id: string) =>
          `${routes?.edit ?? `/${key}`}/${id}/edit`,
    },

    permissions:
      module.permissions
        ? Object.entries(module.permissions)
            .filter(([, enabled]) => enabled)
            .map(([permission]) => permission)
        : [
            "create",
            "read",
            "update",
            "delete",
          ],

    features: {
      workflow:
        Boolean(
          module.metadata.features?.workflows
        ),

      audit:
        Boolean(
          module.metadata.features?.audit
        ),

      supervision:
        Boolean(
          module.metadata.features?.observability
        ),

      notifications:
        Boolean(
          module.metadata.features?.notifications
        ),
    },
  };
}

export const moduleRegistry:
  ERPModule[] =
    allERPModules.map(
      toCoreNavigationModule
    );

export function getEnabledModules() {
  return moduleRegistry.filter(
    (module) => module.enabled
  );
}

export function getModuleByKey(
  key: string
) {
  return moduleRegistry.find(
    (module) => module.key === key
  );
}