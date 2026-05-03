Write-Host ""
Write-Host "==========================================="
Write-Host " EVENT ORCHESTRATION ENGINE INITIALIZATION"
Write-Host "==========================================="
Write-Host ""

# ============================================
# ROOT
# ============================================

$root =
    "platform/events"

# ============================================
# DIRECTORIES
# ============================================

$folders = @(

    "$root",

    "$root/handlers",

    "$root/publishers"
)

foreach ($folder in $folders) {

    New-Item `
        -ItemType Directory `
        -Force `
        -Path $folder | Out-Null
}

# ============================================
# TYPES FILE
# ============================================

$typesPath =
    "$root/types.ts"

$typesContent = @"
export interface DomainEvent {

  type: string;

  payload?: any;

  timestamp: Date;
}
"@

Set-Content `
    -Path $typesPath `
    -Value $typesContent

# ============================================
# EVENT BUS FILE
# ============================================

$eventBusPath =
    "$root/event-bus.ts"

$eventBusContent = @"
import { DomainEvent } from "./types";

export class EventBus {

  publish(event: DomainEvent) {

    console.log(
      "[EVENT]",
      event.type
    );
  }
}
"@

Set-Content `
    -Path $eventBusPath `
    -Value $eventBusContent

# ============================================
# SUCCESS
# ============================================

Write-Host ""
Write-Host "==========================================="
Write-Host " EVENT ENGINE INITIALIZED"
Write-Host "==========================================="
Write-Host ""

Write-Host "Created directories:"
Write-Host " - $root"
Write-Host " - $root/handlers"
Write-Host " - $root/publishers"
Write-Host ""

Write-Host "Created files:"
Write-Host " - $typesPath"
Write-Host " - $eventBusPath"
Write-Host ""

Write-Host "Next recommended steps:"
Write-Host ""
Write-Host "1. pnpm build"
Write-Host "2. git status"
Write-Host "3. git add ."
Write-Host "4. git commit -m 'feat(events): introduce ERP event orchestration engine'"
Write-Host "5. git push"
Write-Host ""