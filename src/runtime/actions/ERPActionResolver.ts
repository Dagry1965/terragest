import type { ERPModule } from "@/runtime/modules";
import type { ERPAction } from "./ERPAction";

export class ERPActionResolver {
  static resolve(module: ERPModule): ERPAction[] {
    const routes = module.metadata.routes ?? {};
    const basePath = routes.list ?? `/${module.metadata.key}`;

    const actions: ERPAction[] = [
      {
        key: "create",
        label: "Nouveau",
        href: routes.create ?? `${basePath}/nouveau`,
        variant: "primary",
      },
      {
        key: "export",
        label: "Exporter",
        href: `${basePath}/export`,
        variant: "secondary",
      },
      {
        key: "import",
        label: "Importer",
        href: `${basePath}/import`,
        variant: "ghost",
      },
      {
        key: "workflow",
        label: "Workflow",
        href: `${basePath}/workflows`,
        variant: "ghost",
        visible: module.metadata.features?.workflows === true,
      },
      {
        key: "audit",
        label: "Audit",
        href: `${basePath}/audit`,
        variant: "ghost",
        visible: module.metadata.features?.audit === true,
      },
      {
        key: "relations",
        label: "Relations",
        href: `${basePath}/relations`,
        variant: "ghost",
      },
    ];

    return actions.filter((action) => action.visible !== false);
  }

  static resolveRowActions(module: ERPModule, id?: string): ERPAction[] {
    const basePath = module.metadata.routes?.list ?? `/${module.metadata.key}`;

    const actions: ERPAction[] = [
      {
        key: "details",
        label: "Ouvrir",
        href: id ? `${basePath}/${id}` : basePath,
        variant: "ghost",
      },
      {
        key: "edit",
        label: "Modifier",
        href: id ? `${basePath}/${id}/edit` : basePath,
        variant: "secondary",
      },
    ];

    return actions;
  }
}