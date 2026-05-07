import {
  RuntimePermission,
}
from "@/runtime/permissions/RuntimePermission";

export const runtimePermissions:
  RuntimePermission[] = [

  {
    module: "maintenance",
    action: "create",
    roles: ["technicien", "superviseur"],
  },

  {
    module: "maintenance",
    action: "validate",
    roles: ["superviseur"],
  },

  {
    module: "maintenance",
    action: "close",
    roles: ["superviseur"],
  },

  {
    module: "maintenance",
    action: "Diagnostiquer",
    roles: ["technicien", "superviseur"],
  },

  {
    module: "maintenance",
    action: "Planifier intervention",
    roles: ["superviseur"],
  },

  {
    module: "maintenance",
    action: "Clôturer",
    roles: ["superviseur"],
  },

  {
    module: "stocks",
    action: "update",
    roles: ["gestionnaire"],
  },

  {
    module: "produits",
    action: "create",
    roles: ["gestionnaire"],
  },

  {
    module: "exploitations",
    action: "create",
    roles: ["gestionnaire", "superviseur"],
  },
];
