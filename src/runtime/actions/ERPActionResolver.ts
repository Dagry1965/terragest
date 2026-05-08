import type { ERPModule } from "@/runtime/modules";
import type { ERPAction } from "./ERPAction";

function getBasePath(
  module: ERPModule
): string {
  const routes =
    module.metadata.routes ?? {};

  return routes.list ?? "/";
}

export function resolveERPModuleActions(
  module: ERPModule
): ERPAction[] {
  const basePath =
    getBasePath(module);

  return [
    {
      key: "create",
      label: "Nouveau",
      href: `${basePath}/nouveau`,
      variant: "primary",
    },
    {
      key: "import",
      label: "Importer",
      href: `${basePath}/import`,
      variant: "secondary",
    },
    {
      key: "export",
      label: "Exporter",
      href: `${basePath}/export`,
      variant: "secondary",
    },
    {
      key: "audit",
      label: "Audit",
      href: `${basePath}/audit`,
      variant: "ghost",
    },
    {
      key: "workflows",
      label: "Workflows",
      href: `${basePath}/workflows`,
      variant: "ghost",
    },
    {
      key: "relations",
      label: "Relations",
      href: `${basePath}/relations`,
      variant: "ghost",
    },
    {
      key: "delete",
      label: "Supprimer",
      variant: "danger",
      visible: false,
    },
  ];
}

export const ERPActionResolver = {
  forModule(
    module: ERPModule
  ): ERPAction[] {
    return resolveERPModuleActions(module);
  },

  resolve(
    module: ERPModule
  ): ERPAction[] {
    return resolveERPModuleActions(module);
  },
};