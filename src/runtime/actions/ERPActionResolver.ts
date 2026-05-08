import type { ERPModule } from "@/runtime/modules";
import type { ERPAction } from "./ERPAction";

export class ERPActionResolver {
  static resolve(module: ERPModule): ERPAction[] {
    const routes = module.metadata.routes ?? {};

    return [
      {
        key: "create",
        label: "Nouveau",
        href: routes.create,
        variant: "primary",
      },
      {
        key: "export",
        label: "Exporter",
        variant: "secondary",
      },
      {
        key: "import",
        label: "Importer",
        variant: "ghost",
      },
      {
        key: "workflow",
        label: "Workflow",
        variant: "ghost",
        visible: module.metadata.features?.workflows === true,
      },
      {
        key: "audit",
        label: "Audit",
        variant: "ghost",
        visible: module.metadata.features?.audit === true,
      },
      {
        key: "relations",
        label: "Relations",
        variant: "ghost",
      },
    ].filter((action) => action.visible !== false);
  }

  static resolveRowActions(module: ERPModule, id?: string): ERPAction[] {
    const basePath = module.metadata.routes?.list ?? `/${module.metadata.key}`;

    return [
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
  }
}