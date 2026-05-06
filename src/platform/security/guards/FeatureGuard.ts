import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

import {
  PermissionEngine
}
from "../permissions/PermissionEngine";

import type {
  ERPUserRole
}
from "../roles/RoleDefinition";

export class FeatureGuard {

  private permissions =
    new PermissionEngine();

  canAccess(
    role: ERPUserRole,
    feature: FeatureDefinition
  ) {

    return this.permissions.canAccessFeature(
      role,
      feature
    );
  }
}