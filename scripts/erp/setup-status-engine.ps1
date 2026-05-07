Write-Host "=== TERRAGEST_V2 - SETUP ERP STATUS ENGINE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/status" | Out-Null

@'
export type ERPStatusDefinition = {
  value: string;

  label: string;

  color:
    | "gray"
    | "blue"
    | "green"
    | "yellow"
    | "red";

  transitions?: string[];
};

export type ERPModuleStatuses = {
  module: string;

  statuses:
    ERPStatusDefinition[];
};

const statusRegistry:
  ERPModuleStatuses[] = [];

export function registerStatuses(
  config: ERPModuleStatuses
) {
  statusRegistry.push(config);
}

export function getModuleStatuses(
  module: string
) {
  return statusRegistry.find(
    (entry) =>
      entry.module === module
  );
}

export function canTransition(
  module: string,
  from: string,
  to: string
) {
  const config =
    getModuleStatuses(module);

  if (!config) {
    return false;
  }

  const current =
    config.statuses.find(
      (status) =>
        status.value === from
    );

  if (!current) {
    return false;
  }

  return (
    current.transitions?.includes(
      to
    ) ?? false
  );
}
'@ | Set-Content "src/core/status/status-engine.ts"

@'
import {
  registerStatuses,
} from "@/core/status/status-engine";

registerStatuses({
  module: "materiels",

  statuses: [
    {
      value: "operationnel",
      label: "Opérationnel",
      color: "green",

      transitions: [
        "maintenance",
        "panne",
      ],
    },

    {
      value: "maintenance",
      label: "Maintenance",
      color: "yellow",

      transitions: [
        "operationnel",
        "panne",
      ],
    },

    {
      value: "panne",
      label: "En panne",
      color: "red",

      transitions: [
        "maintenance",
      ],
    },
  ],
});

registerStatuses({
  module: "contrats",

  statuses: [
    {
      value: "actif",
      label: "Actif",
      color: "green",

      transitions: [
        "suspendu",
        "expire",
      ],
    },

    {
      value: "suspendu",
      label: "Suspendu",
      color: "yellow",

      transitions: [
        "actif",
        "expire",
      ],
    },

    {
      value: "expire",
      label: "Expiré",
      color: "red",

      transitions: [],
    },
  ],
});

registerStatuses({
  module: "workflows",

  statuses: [
    {
      value: "pending",
      label: "Pending",
      color: "gray",

      transitions: [
        "running",
        "failed",
      ],
    },

    {
      value: "running",
      label: "Running",
      color: "blue",

      transitions: [
        "completed",
        "failed",
      ],
    },

    {
      value: "completed",
      label: "Completed",
      color: "green",

      transitions: [],
    },

    {
      value: "failed",
      label: "Failed",
      color: "red",

      transitions: [
        "running",
      ],
    },
  ],
});
'@ | Set-Content "src/core/status/register-statuses.ts"

Write-Host "=== ERP STATUS ENGINE créé avec succès ===" -ForegroundColor Green