import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

import type {
  ERPUserRole,
  RoleDefinition,
}
from "../roles/RoleDefinition";

const roles:
  RoleDefinition[] = [
    {
      role: "ADMIN",
      allowedCapabilities: ["*"],
    },
    {
      role: "MANAGER",
      allowedCapabilities: [
        "crud",
        "runtime",
        "workflow",
        "observability",
        "realtime",
      ],
    },
    {
      role: "MAINTENANCE",
      allowedCapabilities: [
        "crud",
        "workflow",
        "realtime",
      ],
      allowedFeatures: [
        "materiels",
        "interventions",
      ],
    },
    {
      role: "FINANCE",
      allowedCapabilities: [
        "crud",
        "billing",
      ],
      allowedFeatures: [
        "billing",
        "payments",
      ],
    },
    {
      role: "OPERATOR",
      allowedCapabilities: [
        "crud",
        "realtime",
      ],
    },
    {
      role: "VIEWER",
      allowedCapabilities: [
        "observability",
        "realtime",
      ],
    },
  ];

export class PermissionEngine {

  canAccessFeature(
    role: ERPUserRole,
    feature: FeatureDefinition
  ) {

    const definition =
      roles.find(
        item =>
          item.role === role
      );

    if (!definition) {
      return false;
    }

    if (
      definition.allowedCapabilities.includes("*")
    ) {
      return true;
    }

    if (
      definition.allowedFeatures &&
      !definition.allowedFeatures.includes(
        feature.name
      )
    ) {
      return false;
    }

    return feature.capabilities.some(
      capability =>
        definition.allowedCapabilities.includes(
          capability
        )
    );
  }
}