Write-Host "=== TERRAGEST_V2 - SETUP ERP MODULE CAPABILITIES ENGINE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/modules/capabilities" | Out-Null

@'
export type ModuleCapability = {
  workflows?: boolean;

  automations?: boolean;

  supervision?: boolean;

  transactions?: boolean;

  eventStore?: boolean;

  runtimeMetrics?: boolean;

  permissions?: boolean;

  relations?: boolean;

  notifications?: boolean;
};

export type ERPModuleCapabilities = {
  module: string;

  capabilities:
    ModuleCapability;
};

const capabilitiesRegistry:
  ERPModuleCapabilities[] = [
    {
      module:
        "materiels",

      capabilities: {
        workflows: true,

        automations: true,

        supervision: true,

        transactions: true,

        eventStore: true,

        runtimeMetrics: true,

        permissions: true,

        relations: true,

        notifications: true,
      },
    },

    {
      module:
        "stocks",

      capabilities: {
        workflows: true,

        automations: true,

        supervision: true,

        transactions: true,

        eventStore: true,

        runtimeMetrics: true,

        permissions: true,

        relations: true,
      },
    },

    {
      module:
        "contrats",

      capabilities: {
        workflows: true,

        automations: true,

        supervision: true,

        transactions: true,

        eventStore: true,

        permissions: true,

        relations: true,

        notifications: true,
      },
    },

    {
      module:
        "exploitations",

      capabilities: {
        supervision: true,

        permissions: true,

        relations: true,
      },
    },
  ];

export function getModuleCapabilities(
  module: string
) {
  return capabilitiesRegistry.find(
    (entry) =>
      entry.module ===
      module
  );
}

export function getAllCapabilities() {
  return capabilitiesRegistry;
}
'@ | Set-Content "src/core/modules/capabilities/module-capabilities-engine.ts"

Write-Host "=== ERP MODULE CAPABILITIES ENGINE créé avec succès ===" -ForegroundColor Green