import {
  FeatureRegistry
}
from "../registry/FeatureRegistry";

import {
  FeatureGuard
}
from "../security/guards/FeatureGuard";

import type {
  ERPUserRole
}
from "../security/roles/RoleDefinition";

export type NavigationItem = {
  label: string;
  route: string;
};

const guard =
  new FeatureGuard();

export function
buildNavigation(
  role: ERPUserRole
):
  NavigationItem[] {

  return FeatureRegistry
    .getEnabled()

    .filter(
      feature =>
        Boolean(
          feature.route
        )
    )

    .filter(
      feature =>
        guard.canAccess(
          role,
          feature
        )
    )

    .map(
      feature => ({
        label:
          feature.label,

        route:
          feature.route!,
      })
    );
}