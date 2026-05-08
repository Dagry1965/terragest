import { ERPRegistry } from "@/runtime/registry";
import type { ERPPermission } from "./ERPPermission";

const actions = [
  "read",
  "create",
  "update",
  "delete",
  "approve",
  "export",
  "import",
  "audit",
  "execute",
  "admin",
] as const;

export const ERPPermissionRegistry: ERPPermission[] =
  ERPRegistry.modules().flatMap((module) =>
    actions.map((action) => ({
      key: `${module.key}:${action}`,
      module: module.key,
      action,
      label: `${module.label} - ${action}`,
    }))
  );