param()

# ============================================
# ROOT
# ============================================

$root = Resolve-Path "$PSScriptRoot\..\.."

# ============================================
# HELPERS
# ============================================

function Ensure-Directory {

    param(
        [string]$Path
    )

    if (-not (Test-Path $Path)) {

        New-Item `
            -ItemType Directory `
            -Path $Path `
            -Force | Out-Null

        Write-Host "[CREATED] $Path"
    }
}

function Write-File {

    param(
        [string]$Path,
        [string]$Content
    )

    Set-Content `
        -Path $Path `
        -Value $Content `
        -Encoding UTF8

    Write-Host "[FILE] $Path"
}

# ============================================
# DIRECTORIES
# ============================================

$directories = @(

    "src/platform/events",
    "src/platform/workflows",
    "src/platform/notifications",
    "src/platform/audit",
    "src/platform/orchestration",
    "src/platform/registry",
    "src/platform/dependencies",
    "src/platform/health",
    "src/platform/rules",
    "src/platform/automation",
    "src/platform/bootstrap"
)

foreach ($directory in $directories) {

    Ensure-Directory `
        "$root\$directory"
}

# ============================================
# DOMAIN EVENTS
# ============================================

Write-File `
"$root\src\platform\events\DomainEvents.ts" `
@'
// src/platform/events/DomainEvents.ts

type EventHandler =
(payload: unknown) => void;

class DomainEventsManager {

  private handlers:
  Record<string, EventHandler[]>
  = {};

  subscribe(
    event: string,
    handler: EventHandler
  ) {

    if (!this.handlers[event]) {

      this.handlers[event] = [];
    }

    this.handlers[event]
      .push(handler);
  }

  dispatch(
    event: string,
    payload?: unknown
  ) {

    console.log(
      `[EVENT] ${event}`,
      payload
    );

    const handlers =
      this.handlers[event] || [];

    for (const handler of handlers) {

      handler(payload);
    }
  }
}

export const DomainEvents =
  new DomainEventsManager();
'@

# ============================================
# EVENT TYPES
# ============================================

Write-File `
"$root\src\platform\events\EventTypes.ts" `
@'
// src/platform/events/EventTypes.ts

export const ERPEventTypes = {

  STOCK_CREATED:
    "stock.created",

  PAIEMENT_CREATED:
    "paiement.created",

  MAINTENANCE_CREATED:
    "maintenance.created",

  INTERVENTION_CREATED:
    "intervention.created"
};
'@

# ============================================
# NOTIFICATION BUS
# ============================================

Write-File `
"$root\src\platform\notifications\NotificationBus.ts" `
@'
// src/platform/notifications/NotificationBus.ts

export class NotificationBus {

  static success(message: string) {

    console.log(
      "[SUCCESS]",
      message
    );
  }

  static warning(message: string) {

    console.log(
      "[WARNING]",
      message
    );
  }

  static error(message: string) {

    console.log(
      "[ERROR]",
      message
    );
  }

  static info(message: string) {

    console.log(
      "[INFO]",
      message
    );
  }
}
'@

# ============================================
# AUDIT
# ============================================

Write-File `
"$root\src\platform\audit\AuditTrail.ts" `
@'
// src/platform/audit/AuditTrail.ts

export class AuditTrail {

  static log(
    event: string,
    payload?: unknown
  ) {

    console.log(
      "[AUDIT]",
      {
        event,
        payload,
        timestamp: new Date()
      }
    );
  }
}
'@

# ============================================
# MODULE REGISTRY
# ============================================

Write-File `
"$root\src\platform\registry\ModuleRegistry.ts" `
@'
// src/platform/registry/ModuleRegistry.ts

export interface ERPModule {

  name: string;

  enabled: boolean;

  version: string;
}

class ModuleRegistryManager {

  private modules:
    ERPModule[] = [];

  register(
    module: ERPModule
  ) {

    console.log(
      "[MODULE REGISTERED]",
      module.name
    );

    this.modules.push(module);
  }

  getModules() {

    return this.modules;
  }

  getEnabledModules() {

    return this.modules.filter(
      module => module.enabled
    );
  }
}

export const ModuleRegistry =
  new ModuleRegistryManager();
'@

# ============================================
# HEALTH CHECK
# ============================================

Write-File `
"$root\src\platform\health\ERPHealthCheck.ts" `
@'
// src/platform/health/ERPHealthCheck.ts

import { ModuleRegistry }
from "@/platform/registry/ModuleRegistry";

export class ERPHealthCheck {

  static run() {

    console.log(
      "[ERP HEALTH CHECK]"
    );

    const modules =
      ModuleRegistry.getEnabledModules();

    console.log(
      `[MODULES]
       ${modules.length} active`
    );

    for (const module of modules) {

      console.log(
        `[MODULE OK]
         ${module.name}`
      );
    }

    return true;
  }
}
'@

# ============================================
# DONE
# ============================================

Write-Host ""
Write-Host "================================="
Write-Host "ERP CORE PLATFORM READY"
Write-Host "================================="
Write-Host ""