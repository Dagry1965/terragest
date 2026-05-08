$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
$RuntimeCore = Join-Path $ProjectRoot "src\runtime\core"
$ReportsRoot = Join-Path $ProjectRoot "reports\runtime"
$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

Set-Location -LiteralPath $ProjectRoot

New-Item -ItemType Directory -Force -Path $RuntimeCore | Out-Null
New-Item -ItemType Directory -Force -Path $ReportsRoot | Out-Null

Set-Content -LiteralPath (Join-Path $RuntimeCore "RuntimeContracts.ts") -Encoding UTF8 -Value @'
export type RuntimeModuleId = string;

export type RuntimeStatus =
  | "idle"
  | "active"
  | "warning"
  | "error"
  | "disabled";

export type RuntimeCapability =
  | "list"
  | "create"
  | "read"
  | "update"
  | "delete"
  | "export"
  | "import"
  | "audit"
  | "workflow"
  | "automation"
  | "supervision"
  | "realtime"
  | "permissions"
  | "states"
  | "relations"
  | "observability";

export interface RuntimeModuleContract {
  id: RuntimeModuleId;
  label: string;
  domain: string;
  version: string;
  status: RuntimeStatus;
  capabilities: RuntimeCapability[];
  events: string[];
  workflows: string[];
  permissions: string[];
  states: string[];
  relations: string[];
}
'@

Set-Content -LiteralPath (Join-Path $RuntimeCore "RuntimePipeline.ts") -Encoding UTF8 -Value @'
export const ERP_RUNTIME_PIPELINE = [
  "event",
  "rule",
  "workflow",
  "state",
  "permission",
  "persistence",
  "notification",
  "observability",
] as const;

export type ERPRuntimePipelineStep =
  typeof ERP_RUNTIME_PIPELINE[number];
'@

Set-Content -LiteralPath (Join-Path $RuntimeCore "RuntimeBindings.ts") -Encoding UTF8 -Value @'
import type { RuntimeModuleContract } from "./RuntimeContracts";

export interface RuntimeBinding {
  module: RuntimeModuleContract;
  enabled: boolean;
  connectedAt: string;
}
'@

Set-Content -LiteralPath (Join-Path $RuntimeCore "RuntimeModuleConnector.ts") -Encoding UTF8 -Value @'
import type { RuntimeModuleContract } from "./RuntimeContracts";
import type { RuntimeBinding } from "./RuntimeBindings";

export function connectRuntimeModule(
  module: RuntimeModuleContract
): RuntimeBinding {
  return {
    module,
    enabled: true,
    connectedAt: new Date().toISOString(),
  };
}
'@

Set-Content -LiteralPath (Join-Path $RuntimeCore "RuntimeLifecycle.ts") -Encoding UTF8 -Value @'
import type { RuntimeModuleContract } from "./RuntimeContracts";

export function activateRuntimeModule(
  module: RuntimeModuleContract
): RuntimeModuleContract {
  return {
    ...module,
    status: "active",
  };
}

export function disableRuntimeModule(
  module: RuntimeModuleContract
): RuntimeModuleContract {
  return {
    ...module,
    status: "disabled",
  };
}
'@

Set-Content -LiteralPath (Join-Path $RuntimeCore "RuntimeHealthRegistry.ts") -Encoding UTF8 -Value @'
import type { RuntimeStatus } from "./RuntimeContracts";

export interface RuntimeHealthEntry {
  moduleId: string;
  status: RuntimeStatus;
  checkedAt: string;
  issues: string[];
}

export class RuntimeHealthRegistry {
  private entries = new Map<string, RuntimeHealthEntry>();

  set(entry: RuntimeHealthEntry) {
    this.entries.set(entry.moduleId, entry);
  }

  get(moduleId: string) {
    return this.entries.get(moduleId);
  }

  all() {
    return Array.from(this.entries.values());
  }
}
'@

Set-Content -LiteralPath (Join-Path $RuntimeCore "RuntimeEventTopology.ts") -Encoding UTF8 -Value @'
export interface RuntimeEventTopologyNode {
  moduleId: string;
  emits: string[];
  listensTo: string[];
}

export class RuntimeEventTopology {
  private nodes = new Map<string, RuntimeEventTopologyNode>();

  register(node: RuntimeEventTopologyNode) {
    this.nodes.set(node.moduleId, node);
  }

  get(moduleId: string) {
    return this.nodes.get(moduleId);
  }

  all() {
    return Array.from(this.nodes.values());
  }
}
'@

Set-Content -LiteralPath (Join-Path $RuntimeCore "RuntimeCapabilities.ts") -Encoding UTF8 -Value @'
export type {
  RuntimeCapability,
} from "./RuntimeContracts";
'@

Set-Content -LiteralPath (Join-Path $RuntimeCore "CentralRuntimeRegistry.ts") -Encoding UTF8 -Value @'
import type {
  RuntimeModuleContract,
  RuntimeModuleId,
} from "./RuntimeContracts";

import type {
  RuntimeBinding,
} from "./RuntimeBindings";

import {
  connectRuntimeModule,
} from "./RuntimeModuleConnector";

import {
  RuntimeHealthRegistry,
} from "./RuntimeHealthRegistry";

import {
  RuntimeEventTopology,
} from "./RuntimeEventTopology";

export class CentralRuntimeRegistry {
  private modules = new Map<RuntimeModuleId, RuntimeBinding>();

  readonly health = new RuntimeHealthRegistry();

  readonly topology = new RuntimeEventTopology();

  registerModule(module: RuntimeModuleContract) {
    const binding = connectRuntimeModule(module);

    this.modules.set(module.id, binding);

    this.health.set({
      moduleId: module.id,
      status: module.status,
      checkedAt: new Date().toISOString(),
      issues: [],
    });

    this.topology.register({
      moduleId: module.id,
      emits: module.events,
      listensTo: [],
    });

    return binding;
  }

  getModule(moduleId: RuntimeModuleId) {
    return this.modules.get(moduleId);
  }

  getModules() {
    return Array.from(this.modules.values());
  }

  hasModule(moduleId: RuntimeModuleId) {
    return this.modules.has(moduleId);
  }

  getModuleCount() {
    return this.modules.size;
  }

  reset() {
    this.modules.clear();
  }
}

export const centralRuntimeRegistry =
  new CentralRuntimeRegistry();
'@

Set-Content -LiteralPath (Join-Path $RuntimeCore "index.ts") -Encoding UTF8 -Value @'
export * from "./CentralRuntimeRegistry";
export * from "./RuntimeBindings";
export * from "./RuntimeCapabilities";
export * from "./RuntimeContracts";
export * from "./RuntimeLifecycle";
export * from "./RuntimePipeline";
export * from "./RuntimeModuleConnector";
export * from "./RuntimeHealthRegistry";
export * from "./RuntimeEventTopology";
'@

Set-Content -LiteralPath (Join-Path $ReportsRoot "runtime-registry-foundation.md") -Encoding UTF8 -Value @"
# TERRAGEST_V2 — Runtime Registry Foundation

Generated: $(Get-Date)

## Status

Runtime Registry Foundation installed.

## Created / Updated

- CentralRuntimeRegistry.ts
- RuntimeContracts.ts
- RuntimeBindings.ts
- RuntimeCapabilities.ts
- RuntimeLifecycle.ts
- RuntimePipeline.ts
- RuntimeModuleConnector.ts
- RuntimeHealthRegistry.ts
- RuntimeEventTopology.ts
- index.ts

## Result

The ERP now has the first real central runtime registry layer.

## Next phase

Register real business modules into the central runtime registry.
"@

Write-Host ""
Write-Host "Runtime Registry Foundation installed." -ForegroundColor Green
Write-Host "Report: reports\runtime\runtime-registry-foundation.md" -ForegroundColor Yellow
Write-Host ""