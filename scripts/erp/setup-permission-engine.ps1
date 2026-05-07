Write-Host "=== TERRAGEST_V2 - SETUP ERP PERMISSION ENGINE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/permissions" | Out-Null

@'
export type ERPUserRole =
  | "admin"
  | "direction"
  | "gestionnaire"
  | "technicien"
  | "stock"
  | "finance"
  | "supervision";

type PermissionAction =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "validate"
  | "workflow"
  | "supervise";

type PermissionRegistry =
  Record<
    string,
    Record<
      ERPUserRole,
      PermissionAction[]
    >
  >;

const permissionRegistry:
  PermissionRegistry = {
    materiels: {
      admin: [
        "create",
        "read",
        "update",
        "delete",
        "validate",
      ],

      gestionnaire: [
        "create",
        "read",
        "update",
      ],

      technicien: [
        "read",
        "update",
      ],

      supervision: [
        "read",
        "supervise",
      ],

      stock: ["read"],

      finance: ["read"],

      direction: [
        "read",
        "validate",
      ],
    },

    stocks: {
      admin: [
        "create",
        "read",
        "update",
        "delete",
      ],

      stock: [
        "create",
        "read",
        "update",
      ],

      supervision: [
        "read",
        "supervise",
      ],

      gestionnaire: [
        "read",
      ],

      finance: [
        "read",
      ],

      technicien: [
        "read",
      ],

      direction: [
        "read",
      ],
    },
  };

export function hasPermission(
  module: string,
  role: ERPUserRole,
  action: PermissionAction
) {
  const permissions =
    permissionRegistry[
      module
    ]?.[role];

  if (!permissions) {
    return false;
  }

  return permissions.includes(
    action
  );
}

export function getPermissions(
  module: string
) {
  return (
    permissionRegistry[
      module
    ] || {}
  );
}
'@ | Set-Content "src/core/permissions/permission-engine.ts"

Write-Host "=== ERP PERMISSION ENGINE créé avec succès ===" -ForegroundColor Green