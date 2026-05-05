# =========================================================
# TERRAGEST - CONNECT MAINTENANCE WORKFLOW
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " CONNECT MAINTENANCE WORKFLOW"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\domains\materiels\store",

  ".\src\domains\interventions\store",

  ".\src\domains\maintenance\services"
)

foreach ($directory in $directories) {

  if (!(Test-Path $directory)) {

    New-Item `
      -ItemType Directory `
      -Path $directory `
      | Out-Null

    Write-Host "[CREATED] $directory"
  }
}

# =========================================================
# MATERIEL STORE
# =========================================================

$materielStore = @'
// src/domains/materiels/store/MaterielsStore.ts

export interface MaterielItem {

  id: string;

  nom: string;

  statut: string;

  historique:
    string[];
}

class MaterielsStoreManager {

  private items:
    MaterielItem[] = [];

  add(
    item: MaterielItem
  ) {

    this.items.unshift(
      item
    );
  }

  find(
    id: string
  ) {

    return this.items.find(
      item =>
        item.id === id
    );
  }

  setStatus(

    id: string,

    statut: string
  ) {

    const item =
      this.find(id);

    if (!item) {

      return;
    }

    item.statut =
      statut;

    item.historique.unshift(

      `${new Date().toLocaleString()} - ${statut}`
    );
  }

  all() {

    return this.items;
  }
}

export const MaterielsStore =
  new MaterielsStoreManager();
'@

Set-Content `
  ".\src\domains\materiels\store\MaterielsStore.ts" `
  $materielStore

Write-Host ""
Write-Host "[UPDATED] MaterielsStore.ts"

# =========================================================
# INTERVENTIONS STORE
# =========================================================

$interventionStore = @'
// src/domains/interventions/store/InterventionsStore.ts

export interface InterventionItem {

  id: string;

  materielId: string;

  description: string;

  workflow: string;
}

class InterventionsStoreManager {

  private items:
    InterventionItem[] = [];

  add(
    item: InterventionItem
  ) {

    this.items.unshift(
      item
    );

    console.log(
      "[INTERVENTION CREATED]",
      item.id
    );
  }

  all() {

    return this.items;
  }
}

export const InterventionsStore =
  new InterventionsStoreManager();
'@

Set-Content `
  ".\src\domains\interventions\store\InterventionsStore.ts" `
  $interventionStore

Write-Host "[UPDATED] InterventionsStore.ts"

# =========================================================
# MAINTENANCE SERVICE
# =========================================================

$maintenanceService = @'
// src/domains/maintenance/services/MaintenanceWorkflowService.ts

import { MaterielsStore }
from "@/domains/materiels/store/MaterielsStore";

import { InterventionsStore }
from "@/domains/interventions/store/InterventionsStore";

export class MaintenanceWorkflowService {

  static declarePanne(

    materielId: string,

    description: string
  ) {

    MaterielsStore.setStatus(

      materielId,

      "EN_PANNE"
    );

    InterventionsStore.add({

      id:
        crypto.randomUUID(),

      materielId,

      description,

      workflow:
        "OPEN"
    });

    console.log(
      "[PANNE DECLARED]",
      materielId
    );
  }

  static resolvePanne(
    materielId: string
  ) {

    MaterielsStore.setStatus(

      materielId,

      "OPERATIONNEL"
    );

    console.log(
      "[PANNE RESOLVED]",
      materielId
    );
  }
}
'@

Set-Content `
  ".\src\domains\maintenance\services\MaintenanceWorkflowService.ts" `
  $maintenanceService

Write-Host "[CREATED] MaintenanceWorkflowService.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " MAINTENANCE WORKFLOW CONNECTED"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\connect-maintenance-workflow.ps1"
Write-Host "pnpm build"
Write-Host ""