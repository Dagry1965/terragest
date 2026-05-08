import type { RuntimeRole } from "./RuntimeRole";
import type { RuntimePermission } from "./RuntimePermission";

export const runtimeRolePermissions: Record<RuntimeRole, RuntimePermission[]> = {
  admin: [
    "module.read",
    "module.create",
    "module.update",
    "module.delete",
    "module.export",
    "module.import",
    "workflow.start",
    "workflow.transition",
    "workflow.validate",
    "audit.read",
    "relations.read",
    "security.manage",
  ],

  supervisor: [
    "module.read",
    "module.create",
    "module.update",
    "module.export",
    "workflow.start",
    "workflow.transition",
    "workflow.validate",
    "audit.read",
    "relations.read",
  ],

  operator: [
    "module.read",
    "module.create",
    "module.update",
    "workflow.start",
    "workflow.transition",
    "relations.read",
  ],

  viewer: [
    "module.read",
    "audit.read",
    "relations.read",
  ],
};