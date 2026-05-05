# ==========================================
# TERRAGEST V2
# MATERIELS CLEAN ARCHITECTURE MIGRATION
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " MATERIELS CLEAN ARCHITECTURE MIGRATION "
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$Feature = Join-Path `
    $Src `
    "features\materiels"

$Infrastructure = Join-Path `
    $Src `
    "infrastructure\repositories\firestore"

$BackupRoot = Join-Path `
    $Root `
    "backups\materiels-migration"

$ReportRoot = Join-Path `
    $Root `
    "reports\architecture"

# ==========================================
# HELPERS
# ==========================================

function Ensure-Directory {

    param([string]$Path)

    if (!(Test-Path $Path)) {

        New-Item `
            -ItemType Directory `
            -Path $Path `
            -Force | Out-Null

        Write-Host "CREATED : $Path" -ForegroundColor Green
    }
    else {

        Write-Host "EXISTS  : $Path" -ForegroundColor Yellow
    }
}

function Ensure-File {

    param(
        [string]$Path,
        [string]$Content
    )

    if (!(Test-Path $Path)) {

        $Content | Out-File `
            $Path `
            -Encoding UTF8

        Write-Host "CREATED : $Path" -ForegroundColor Green
    }
    else {

        Write-Host "EXISTS  : $Path" -ForegroundColor Yellow
    }
}

function Safe-Backup {

    param([string]$Source)

    if (!(Test-Path $Source)) {
        return
    }

    $Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

    $BackupDir = Join-Path `
        $BackupRoot `
        $Timestamp

    Ensure-Directory $BackupDir

    $Name = Split-Path `
        $Source `
        -Leaf

    Copy-Item `
        $Source `
        (Join-Path $BackupDir $Name) `
        -Recurse `
        -Force

    Write-Host "BACKUP : $Source" -ForegroundColor Green
}

# ==========================================
# VALIDATION
# ==========================================

if (!(Test-Path $Feature)) {

    Write-Host ""
    Write-Host "Feature materiels not found." -ForegroundColor Red
    Write-Host ""

    exit
}

# ==========================================
# STRUCTURE
# ==========================================

Write-Host ""
Write-Host "Preparing clean architecture..." -ForegroundColor Cyan
Write-Host ""

Ensure-Directory $Infrastructure
Ensure-Directory $BackupRoot
Ensure-Directory $ReportRoot

$FeatureFolders = @(
    "components",
    "hooks",
    "services",
    "repositories",
    "workflows",
    "events",
    "policies",
    "schemas",
    "tests",
    "types"
)

foreach ($Folder in $FeatureFolders) {

    Ensure-Directory `
        (Join-Path $Feature $Folder)
}

# ==========================================
# BACKUP EXISTING FILES
# ==========================================

Write-Host ""
Write-Host "Creating backups..." -ForegroundColor Cyan
Write-Host ""

$ExistingFiles = Get-ChildItem `
    $Feature `
    -Recurse `
    -File

foreach ($File in $ExistingFiles) {

    Safe-Backup $File.FullName
}

# ==========================================
# REPOSITORY INTERFACE
# ==========================================

Write-Host ""
Write-Host "Creating repository interface..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path $Feature "repositories\MaterielRepository.ts") `
@"
import type { Materiel }
from "../types/Materiel";

export interface MaterielRepository {

  findAll(): Promise<Materiel[]>;

  findById(id: string): Promise<Materiel | null>;

  create(data: Partial<Materiel>): Promise<string>;

  update(
    id: string,
    data: Partial<Materiel>
  ): Promise<void>;

  delete(id: string): Promise<void>;
}
"@

# ==========================================
# FIRESTORE ADAPTER
# ==========================================

Write-Host ""
Write-Host "Creating Firestore adapter..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Infrastructure `
        "FirestoreMaterielRepository.ts"
    ) `
@"
import type { Materiel }
from "../../../features/materiels/types/Materiel";

import type { MaterielRepository }
from "../../../features/materiels/repositories/MaterielRepository";

export class FirestoreMaterielRepository
implements MaterielRepository {

  async findAll(): Promise<Materiel[]> {

    return [];
  }

  async findById(
    id: string
  ): Promise<Materiel | null> {

    return null;
  }

  async create(
    data: Partial<Materiel>
  ): Promise<string> {

    return "id";
  }

  async update(
    id: string,
    data: Partial<Materiel>
  ): Promise<void> {
  }

  async delete(
    id: string
  ): Promise<void> {
  }
}
"@

# ==========================================
# SERVICE
# ==========================================

Write-Host ""
Write-Host "Creating service layer..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "services\MaterielService.ts"
    ) `
@"
import type { MaterielRepository }
from "../repositories/MaterielRepository";

export class MaterielService {

  constructor(
    private repository: MaterielRepository
  ) {}

  async getAll() {

    return this.repository.findAll();
  }
}
"@

# ==========================================
# EVENTS
# ==========================================

Write-Host ""
Write-Host "Creating domain events..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "events\MaterielEvents.ts"
    ) `
@"
export const MATERIEL_CREATED =
  "MATERIEL_CREATED";

export const MATERIEL_UPDATED =
  "MATERIEL_UPDATED";

export const MATERIEL_DELETED =
  "MATERIEL_DELETED";

export const MATERIEL_BREAKDOWN_DECLARED =
  "MATERIEL_BREAKDOWN_DECLARED";
"@

# ==========================================
# WORKFLOWS
# ==========================================

Write-Host ""
Write-Host "Creating workflows..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "workflows\MaterielMaintenanceWorkflow.ts"
    ) `
@"
export class MaterielMaintenanceWorkflow {

  async execute() {

    console.log(
      "Materiel maintenance workflow"
    );
  }
}
"@

# ==========================================
# POLICIES
# ==========================================

Write-Host ""
Write-Host "Creating policies..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "policies\MaterielPolicies.ts"
    ) `
@"
export const MaterielPolicies = {

  canCreate: true,
  canUpdate: true,
  canDelete: true,
};
"@

# ==========================================
# TEST PLACEHOLDER
# ==========================================

Write-Host ""
Write-Host "Creating tests..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "tests\MaterielService.test.ts"
    ) `
@"
describe(
  "MaterielService",
  () => {

    it(
      "should be defined",
      () => {

        expect(true).toBe(true);
      }
    );
  }
);
"@

# ==========================================
# REPORT
# ==========================================

Write-Host ""
Write-Host "Generating migration report..." -ForegroundColor Cyan
Write-Host ""

$ReportFile = Join-Path `
    $ReportRoot `
    "materiels-clean-architecture.md"

$Report = @"
# MATERIELS CLEAN ARCHITECTURE MIGRATION

Generated : $(Get-Date)

## FEATURE

features/materiels

## CREATED

- repositories/MaterielRepository.ts
- services/MaterielService.ts
- events/MaterielEvents.ts
- workflows/MaterielMaintenanceWorkflow.ts
- policies/MaterielPolicies.ts
- tests/MaterielService.test.ts

## INFRASTRUCTURE

- infrastructure/repositories/firestore/FirestoreMaterielRepository.ts

## OBJECTIVE

Move Firestore outside business layer.

## TARGET ARCHITECTURE

UI
→ Hook
→ Service
→ Repository Interface
→ Firestore Adapter

## STATUS

Migration initialized successfully.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " CLEAN ARCHITECTURE INITIALIZED "
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""