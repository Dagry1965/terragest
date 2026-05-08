import { ERPRegistry } from "@/runtime/registry";
import type { ERPPolicy } from "./ERPPolicy";

const allActions = [
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

const managerActions = [
  "read",
  "create",
  "update",
  "approve",
  "export",
  "audit",
  "execute",
] as const;

const operatorActions = [
  "read",
  "create",
  "update",
  "execute",
] as const;

const viewerActions = [
  "read",
] as const;

export const ERPPolicyRegistry: ERPPolicy[] =
  ERPRegistry.modules().flatMap((module) => [
    {
      role: "super_admin",
      module: module.key,
      actions: [...allActions],
    },
    {
      role: "admin",
      module: module.key,
      actions: [...allActions],
    },
    {
      role: "manager",
      module: module.key,
      actions: [...managerActions],
    },
    {
      role: "operator",
      module: module.key,
      actions: [...operatorActions],
    },
    {
      role: "viewer",
      module: module.key,
      actions: [...viewerActions],
    },
  ]);