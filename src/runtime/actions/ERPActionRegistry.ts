import type { ERPModule } from "@/runtime/modules";
import type { ERPAction } from "./ERPAction";

import {
  ERPActionResolver,
  resolveERPModuleActions,
} from "./ERPActionResolver";

function getModuleBasePath(
  module: ERPModule
): string {
  const routes =
    module.metadata.routes ?? {};

  return routes.list ?? "/";
}

export const ERPActionRegistry = {
  forModule(
    module: ERPModule
  ): ERPAction[] {
    return ERPActionResolver.forModule(module);
  },

  forRow(
    module: ERPModule,
    id?: string
  ): ERPAction[] {
    const basePath =
      getModuleBasePath(module);

    const safeId =
      id ?? "";

    return [
      {
        key: "view",
        label: "Voir",
        href: `${basePath}/${safeId}`,
        variant: "ghost",
      },
      {
        key: "edit",
        label: "Modifier",
        href: `${basePath}/${safeId}/edit`,
        variant: "secondary",
      },
      {
        key: "audit",
        label: "Audit",
        href: `${basePath}/${safeId}/audit`,
        variant: "ghost",
      },
      {
        key: "delete",
        label: "Supprimer",
        variant: "danger",
        visible: false,
      },
    ];
  },

  resolve(
    module: ERPModule
  ): ERPAction[] {
    return resolveERPModuleActions(module);
  },
};