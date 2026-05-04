# =========================================================
# ERP TERRAGEST
# ARCHITECTURE GOVERNANCE SETUP
# =========================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "ERP TERRAGEST - ARCHITECTURE GOVERNANCE" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$root = "C:\Users\Admin\terragest"

# =========================================================
# HELPERS
# =========================================================

function Ensure-Directory {

    param(
        [string]$Path
    )

    if (!(Test-Path $Path)) {

        New-Item -ItemType Directory -Path $Path | Out-Null

        Write-Host "[CREATED] $Path" -ForegroundColor Green
    }
    else {

        Write-Host "[EXISTS ] $Path" -ForegroundColor Yellow
    }
}

function Create-File {

    param(
        [string]$Path,
        [string]$Content
    )

    $Content | Set-Content `
        -Path $Path `
        -Encoding UTF8

    Write-Host "[CREATED] $Path" -ForegroundColor Green
}

# =========================================================
# DIRECTORIES
# =========================================================

Ensure-Directory "$root\docs"
Ensure-Directory "$root\docs\architecture"
Ensure-Directory "$root\scripts"
Ensure-Directory "$root\scripts\architecture"

# =========================================================
# 01 - SYSTEM OVERVIEW
# =========================================================

$systemOverview = @'
# ERP Terragest - System Overview

## Vision

Terragest est une plateforme ERP SaaS orientée agriculture,
gestion opérationnelle, mobilité terrain et orchestration métier.

## Core Platform

- execution runtime
- orchestration
- event bus
- workflow engine
- rule engine
- monitoring

## Business Domains

- stocks
- exploitations
- contrats
- interventions
- paiements
- matériels

## Experience Layer

### Web

- Next.js
- dashboards
- reporting

### Mobile

- offline-first
- GPS
- QR
- synchronisation

## Architecture Principles

- mutualisation avant duplication
- génération avant implémentation manuelle
- observabilité native
- tests obligatoires
'@

Create-File `
    -Path "$root\docs\architecture\01-system-overview.md" `
    -Content $systemOverview

# =========================================================
# 02 - DOMAIN MAP
# =========================================================

$domainMap = @'
# ERP Terragest - Domain Map

| Domaine | Etat | Tests |
|----------|------|--------|
| stocks | stable | oui |
| exploitations | en cours | oui |
| contrats | intermédiaire | partiel |
| workflow | avancé | partiel |
| interventions | intermédiaire | non |

## Objectifs

- standardiser les domaines
- harmoniser les structures
- réduire les doublons
'@

Create-File `
    -Path "$root\docs\architecture\02-domain-map.md" `
    -Content $domainMap

# =========================================================
# 03 - PLATFORM MAP
# =========================================================

$platformMap = @'
# ERP Terragest - Platform Map

## Core Platform

### Execution

- runtime executor
- orchestration

### Events

- event bus
- realtime

### Workflow

- workflow engine

### Monitoring

- metrics
- analytics
- logs

## Objectifs

- centraliser les briques transverses
- réduire les duplications
'@

Create-File `
    -Path "$root\docs\architecture\03-platform-map.md" `
    -Content $platformMap

# =========================================================
# 04 - GENERATORS MAP
# =========================================================

$generatorMap = @'
# ERP Terragest - Generators Map

## Générateurs Existants

- Generate-EnterpriseModule.ps1
- Generate-CoreFoundation.ps1
- Generate-Domain.ps1

## Shared Helpers

- template-engine.ps1
- naming.ps1
- filesystem.ps1

## Objectif

Créer un générateur central officiel ERP.
'@

Create-File `
    -Path "$root\docs\architecture\04-generators-map.md" `
    -Content $generatorMap

# =========================================================
# 05 - ARCHITECTURE RULES
# =========================================================

$rules = @'
# ERP Terragest - Architecture Rules

## Règles

- vérifier l’existant avant création
- mutualiser avant créer
- tests obligatoires
- observabilité native
- architecture standard obligatoire
'@

Create-File `
    -Path "$root\docs\architecture\05-architecture-rules.md" `
    -Content $rules

# =========================================================
# 06 - MODULE STANDARD
# =========================================================

$moduleStandard = @'
# ERP Terragest - Module Standard

## Structure Officielle

application/
domain/
infrastructure/
presentation/
tests/

## Standards

- générable
- testable
- observable
- standardisé
'@

Create-File `
    -Path "$root\docs\architecture\06-module-standard.md" `
    -Content $moduleStandard

# =========================================================
# DONE
# =========================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "ARCHITECTURE GOVERNANCE READY" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""