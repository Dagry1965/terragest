# TERRAGEST V2 - AUDIT DOUBLONS / CONVERGENCE
Date : 2026-05-13 15:26:22
Racine : C:\Users\Admin\terragest

# 1. Dossiers UI concurrents

- $Folder : 35 fichiers
- $Folder : absent
- $Folder : absent
- $Folder : 11 fichiers
- $Folder : absent
- $Folder : absent
- $Folder : absent
- $Folder : absent

# 2. Imports legacy encore utilises


## @/components/ui

- OK : aucun usage

## @/components/crud

- OK : aucun usage

## @/components/layout

- OK : aucun usage

## @/components/shell

- OK : aucun usage

## @/components/erp/page

- OK : aucun usage

## @/components/erp/theme

- OK : aucun usage

## @/components/erp/forms/ERPButton

- OK : aucun usage

## @/components/erp/forms/ERPInput

- OK : aucun usage

# 3. Composants portant le meme nom


## details - 3 occurrences
- \src\components\erp\details
- \src\components\materiels\details
- \src\components\stock\details

## ERPTopBar.tsx - 2 occurrences
- \src\components\erp\layout\ERPTopBar.tsx
- \src\components\erp\shell\ErpTopbar.tsx

## ERPKPIGrid.tsx - 2 occurrences
- \src\components\erp\kpi\ERPKPIGrid.tsx
- \src\components\erp\layout\ERPKpiGrid.tsx

## ERPDataList.tsx - 2 occurrences
- \src\components\erp\lists\ERPDataList.tsx
- \src\components\erp\ui\ERPDataList.tsx

## ERPTable.tsx - 2 occurrences
- \src\components\erp\ui\ERPTable.tsx
- \src\components\erp\ui\table\ERPTable.tsx

## ERPFormSection.tsx - 2 occurrences
- \src\components\erp\forms\enterprise\ERPFormSection.tsx
- \src\components\erp\ui\ERPFormSection.tsx

## ConfirmDialog.tsx - 2 occurrences
- \src\components\dialogs\ConfirmDialog.tsx
- \src\components\erp\ui\ConfirmDialog.tsx

## notifications - 2 occurrences
- \src\components\notifications
- \src\components\erp\notifications

## widgets - 2 occurrences
- \src\components\erp\dashboard\business\widgets
- \src\components\erp\dashboard\generic\widgets

## generic - 2 occurrences
- \src\components\erp\generic
- \src\components\erp\dashboard\generic

# 4. Pages module dupliquees ou variantes


## achats
- pages : 4
- backups : 7
  - backup: \src\app\(private)\achats\nouveau
  - backup: \src\app\(private)\achats\[id]
  - backup: \src\app\(private)\achats\page.tsx
  - backup: \src\app\(private)\achats\nouveau\page.tsx
  - backup: \src\app\(private)\achats\[id]\edit
  - backup: \src\app\(private)\achats\[id]\page.tsx
  - backup: \src\app\(private)\achats\[id]\edit\page.tsx

## actifs
- pages : 4
- backups : 7
  - backup: \src\app\(private)\actifs\nouveau
  - backup: \src\app\(private)\actifs\[id]
  - backup: \src\app\(private)\actifs\page.tsx
  - backup: \src\app\(private)\actifs\nouveau\page.tsx
  - backup: \src\app\(private)\actifs\[id]\edit
  - backup: \src\app\(private)\actifs\[id]\page.tsx
  - backup: \src\app\(private)\actifs\[id]\edit\page.tsx

## ai-runtime
- pages : 1
- backups : 1
  - backup: \src\app\(private)\ai-runtime\page.tsx

## automation
- pages : 1
- backups : 1
  - backup: \src\app\(private)\automation\page.tsx

## billing
- pages : 1
- backups : 1
  - backup: \src\app\(private)\billing\page.tsx

## clients
- pages : 4
- backups : 7
  - backup: \src\app\(private)\clients\nouveau
  - backup: \src\app\(private)\clients\[id]
  - backup: \src\app\(private)\clients\page.tsx
  - backup: \src\app\(private)\clients\nouveau\page.tsx
  - backup: \src\app\(private)\clients\[id]\edit
  - backup: \src\app\(private)\clients\[id]\page.tsx
  - backup: \src\app\(private)\clients\[id]\edit\page.tsx

## commandes
- pages : 4
- backups : 7
  - backup: \src\app\(private)\commandes\nouveau
  - backup: \src\app\(private)\commandes\[id]
  - backup: \src\app\(private)\commandes\page.tsx
  - backup: \src\app\(private)\commandes\nouveau\page.tsx
  - backup: \src\app\(private)\commandes\[id]\edit
  - backup: \src\app\(private)\commandes\[id]\page.tsx
  - backup: \src\app\(private)\commandes\[id]\edit\page.tsx

## compliance
- pages : 1
- backups : 1
  - backup: \src\app\(private)\compliance\page.tsx

## contrats
- pages : 9
- backups : 17
  - backup: \src\app\(private)\contrats\audit
  - backup: \src\app\(private)\contrats\export
  - backup: \src\app\(private)\contrats\import
  - backup: \src\app\(private)\contrats\nouveau
  - backup: \src\app\(private)\contrats\relations
  - backup: \src\app\(private)\contrats\workflows
  - backup: \src\app\(private)\contrats\[id]
  - backup: \src\app\(private)\contrats\page.tsx
  - backup: \src\app\(private)\contrats\audit\page.tsx
  - backup: \src\app\(private)\contrats\export\page.tsx
  - backup: \src\app\(private)\contrats\import\page.tsx
  - backup: \src\app\(private)\contrats\nouveau\page.tsx
  - backup: \src\app\(private)\contrats\relations\page.tsx
  - backup: \src\app\(private)\contrats\workflows\page.tsx
  - backup: \src\app\(private)\contrats\[id]\edit
  - backup: \src\app\(private)\contrats\[id]\page.tsx
  - backup: \src\app\(private)\contrats\[id]\edit\page.tsx

## dashboard
- pages : 2
- backups : 4
  - backup: \src\app\(private)\dashboard\[dashboardKey]
  - backup: \src\app\(private)\dashboard\page.tsx
  - backup: \src\app\(private)\dashboard\page.tsx.bak.dashboard-split
  - backup: \src\app\(private)\dashboard\[dashboardKey]\page.tsx

## depenses
- pages : 4
- backups : 7
  - backup: \src\app\(private)\depenses\nouveau
  - backup: \src\app\(private)\depenses\[id]
  - backup: \src\app\(private)\depenses\page.tsx
  - backup: \src\app\(private)\depenses\nouveau\page.tsx
  - backup: \src\app\(private)\depenses\[id]\edit
  - backup: \src\app\(private)\depenses\[id]\page.tsx
  - backup: \src\app\(private)\depenses\[id]\edit\page.tsx

## devis
- pages : 4
- backups : 7
  - backup: \src\app\(private)\devis\nouveau
  - backup: \src\app\(private)\devis\[id]
  - backup: \src\app\(private)\devis\page.tsx
  - backup: \src\app\(private)\devis\nouveau\page.tsx
  - backup: \src\app\(private)\devis\[id]\edit
  - backup: \src\app\(private)\devis\[id]\page.tsx
  - backup: \src\app\(private)\devis\[id]\edit\page.tsx

## employes
- pages : 4
- backups : 7
  - backup: \src\app\(private)\employes\nouveau
  - backup: \src\app\(private)\employes\[id]
  - backup: \src\app\(private)\employes\page.tsx
  - backup: \src\app\(private)\employes\nouveau\page.tsx
  - backup: \src\app\(private)\employes\[id]\edit
  - backup: \src\app\(private)\employes\[id]\page.tsx
  - backup: \src\app\(private)\employes\[id]\edit\page.tsx

## exploitations
- pages : 10
- backups : 19
  - backup: \src\app\(private)\exploitations\audit
  - backup: \src\app\(private)\exploitations\details
  - backup: \src\app\(private)\exploitations\export
  - backup: \src\app\(private)\exploitations\import
  - backup: \src\app\(private)\exploitations\nouveau
  - backup: \src\app\(private)\exploitations\relations
  - backup: \src\app\(private)\exploitations\workflows
  - backup: \src\app\(private)\exploitations\[id]
  - backup: \src\app\(private)\exploitations\page.tsx
  - backup: \src\app\(private)\exploitations\audit\page.tsx
  - backup: \src\app\(private)\exploitations\details\page.tsx
  - backup: \src\app\(private)\exploitations\export\page.tsx
  - backup: \src\app\(private)\exploitations\import\page.tsx
  - backup: \src\app\(private)\exploitations\nouveau\page.tsx
  - backup: \src\app\(private)\exploitations\relations\page.tsx
  - backup: \src\app\(private)\exploitations\workflows\page.tsx
  - backup: \src\app\(private)\exploitations\[id]\edit
  - backup: \src\app\(private)\exploitations\[id]\page.tsx
  - backup: \src\app\(private)\exploitations\[id]\edit\page.tsx

## factures
- pages : 4
- backups : 7
  - backup: \src\app\(private)\factures\nouveau
  - backup: \src\app\(private)\factures\[id]
  - backup: \src\app\(private)\factures\page.tsx
  - backup: \src\app\(private)\factures\nouveau\page.tsx
  - backup: \src\app\(private)\factures\[id]\edit
  - backup: \src\app\(private)\factures\[id]\page.tsx
  - backup: \src\app\(private)\factures\[id]\edit\page.tsx

## fournisseurs
- pages : 4
- backups : 11
  - backup: \src\app\(private)\fournisseurs\nouveau
  - backup: \src\app\(private)\fournisseurs\[id]
  - backup: \src\app\(private)\fournisseurs\page.tsx
  - backup: \src\app\(private)\fournisseurs\page.tsx.bak
  - backup: \src\app\(private)\fournisseurs\nouveau\page.tsx
  - backup: \src\app\(private)\fournisseurs\nouveau\page.tsx.bak
  - backup: \src\app\(private)\fournisseurs\[id]\edit
  - backup: \src\app\(private)\fournisseurs\[id]\page.tsx
  - backup: \src\app\(private)\fournisseurs\[id]\page.tsx.bak
  - backup: \src\app\(private)\fournisseurs\[id]\edit\page.tsx
  - backup: \src\app\(private)\fournisseurs\[id]\edit\page.tsx.bak

## incidents
- pages : 4
- backups : 7
  - backup: \src\app\(private)\incidents\nouveau
  - backup: \src\app\(private)\incidents\[id]
  - backup: \src\app\(private)\incidents\page.tsx
  - backup: \src\app\(private)\incidents\nouveau\page.tsx
  - backup: \src\app\(private)\incidents\[id]\edit
  - backup: \src\app\(private)\incidents\[id]\page.tsx
  - backup: \src\app\(private)\incidents\[id]\edit\page.tsx

## interventions
- pages : 10
- backups : 19
  - backup: \src\app\(private)\interventions\audit
  - backup: \src\app\(private)\interventions\export
  - backup: \src\app\(private)\interventions\import
  - backup: \src\app\(private)\interventions\nouveau
  - backup: \src\app\(private)\interventions\relations
  - backup: \src\app\(private)\interventions\workflow
  - backup: \src\app\(private)\interventions\workflows
  - backup: \src\app\(private)\interventions\[id]
  - backup: \src\app\(private)\interventions\page.tsx
  - backup: \src\app\(private)\interventions\audit\page.tsx
  - backup: \src\app\(private)\interventions\export\page.tsx
  - backup: \src\app\(private)\interventions\import\page.tsx
  - backup: \src\app\(private)\interventions\nouveau\page.tsx
  - backup: \src\app\(private)\interventions\relations\page.tsx
  - backup: \src\app\(private)\interventions\workflow\page.tsx
  - backup: \src\app\(private)\interventions\workflows\page.tsx
  - backup: \src\app\(private)\interventions\[id]\edit
  - backup: \src\app\(private)\interventions\[id]\page.tsx
  - backup: \src\app\(private)\interventions\[id]\edit\page.tsx

## intrants
- pages : 4
- backups : 7
  - backup: \src\app\(private)\intrants\nouveau
  - backup: \src\app\(private)\intrants\[id]
  - backup: \src\app\(private)\intrants\page.tsx
  - backup: \src\app\(private)\intrants\nouveau\page.tsx
  - backup: \src\app\(private)\intrants\[id]\edit
  - backup: \src\app\(private)\intrants\[id]\page.tsx
  - backup: \src\app\(private)\intrants\[id]\edit\page.tsx

## livraisons
- pages : 4
- backups : 7
  - backup: \src\app\(private)\livraisons\nouveau
  - backup: \src\app\(private)\livraisons\[id]
  - backup: \src\app\(private)\livraisons\page.tsx
  - backup: \src\app\(private)\livraisons\nouveau\page.tsx
  - backup: \src\app\(private)\livraisons\[id]\edit
  - backup: \src\app\(private)\livraisons\[id]\page.tsx
  - backup: \src\app\(private)\livraisons\[id]\edit\page.tsx

## maintenance
- pages : 9
- backups : 17
  - backup: \src\app\(private)\maintenance\audit
  - backup: \src\app\(private)\maintenance\export
  - backup: \src\app\(private)\maintenance\import
  - backup: \src\app\(private)\maintenance\nouveau
  - backup: \src\app\(private)\maintenance\relations
  - backup: \src\app\(private)\maintenance\workflows
  - backup: \src\app\(private)\maintenance\[id]
  - backup: \src\app\(private)\maintenance\page.tsx
  - backup: \src\app\(private)\maintenance\audit\page.tsx
  - backup: \src\app\(private)\maintenance\export\page.tsx
  - backup: \src\app\(private)\maintenance\import\page.tsx
  - backup: \src\app\(private)\maintenance\nouveau\page.tsx
  - backup: \src\app\(private)\maintenance\relations\page.tsx
  - backup: \src\app\(private)\maintenance\workflows\page.tsx
  - backup: \src\app\(private)\maintenance\[id]\edit
  - backup: \src\app\(private)\maintenance\[id]\page.tsx
  - backup: \src\app\(private)\maintenance\[id]\edit\page.tsx

## materiels
- pages : 10
- backups : 21
  - backup: \src\app\(private)\materiels\audit
  - backup: \src\app\(private)\materiels\export
  - backup: \src\app\(private)\materiels\import
  - backup: \src\app\(private)\materiels\nouveau
  - backup: \src\app\(private)\materiels\pannes
  - backup: \src\app\(private)\materiels\relations
  - backup: \src\app\(private)\materiels\workflows
  - backup: \src\app\(private)\materiels\[id]
  - backup: \src\app\(private)\materiels\page.tsx
  - backup: \src\app\(private)\materiels\page.tsx.bak
  - backup: \src\app\(private)\materiels\audit\page.tsx
  - backup: \src\app\(private)\materiels\export\page.tsx
  - backup: \src\app\(private)\materiels\import\page.tsx
  - backup: \src\app\(private)\materiels\nouveau\page.tsx
  - backup: \src\app\(private)\materiels\pannes\nouveau
  - backup: \src\app\(private)\materiels\pannes\nouveau\page.tsx
  - backup: \src\app\(private)\materiels\relations\page.tsx
  - backup: \src\app\(private)\materiels\workflows\page.tsx
  - backup: \src\app\(private)\materiels\[id]\edit
  - backup: \src\app\(private)\materiels\[id]\page.tsx
  - backup: \src\app\(private)\materiels\[id]\edit\page.tsx

## monitoring
- pages : 1
- backups : 1
  - backup: \src\app\(private)\monitoring\page.tsx

## mouvements
- pages : 4
- backups : 7
  - backup: \src\app\(private)\mouvements\nouveau
  - backup: \src\app\(private)\mouvements\[id]
  - backup: \src\app\(private)\mouvements\page.tsx
  - backup: \src\app\(private)\mouvements\nouveau\page.tsx
  - backup: \src\app\(private)\mouvements\[id]\edit
  - backup: \src\app\(private)\mouvements\[id]\page.tsx
  - backup: \src\app\(private)\mouvements\[id]\edit\page.tsx

## notifications
- pages : 1
- backups : 1
  - backup: \src\app\(private)\notifications\page.tsx

## observability
- pages : 1
- backups : 1
  - backup: \src\app\(private)\observability\page.tsx

## offline
- pages : 1
- backups : 1
  - backup: \src\app\(private)\offline\page.tsx

## operations
- pages : 1
- backups : 1
  - backup: \src\app\(private)\operations\page.tsx

## organization-analytics
- pages : 1
- backups : 1
  - backup: \src\app\(private)\organization-analytics\page.tsx

## paiements
- pages : 9
- backups : 17
  - backup: \src\app\(private)\paiements\audit
  - backup: \src\app\(private)\paiements\export
  - backup: \src\app\(private)\paiements\import
  - backup: \src\app\(private)\paiements\nouveau
  - backup: \src\app\(private)\paiements\relations
  - backup: \src\app\(private)\paiements\workflows
  - backup: \src\app\(private)\paiements\[id]
  - backup: \src\app\(private)\paiements\page.tsx
  - backup: \src\app\(private)\paiements\audit\page.tsx
  - backup: \src\app\(private)\paiements\export\page.tsx
  - backup: \src\app\(private)\paiements\import\page.tsx
  - backup: \src\app\(private)\paiements\nouveau\page.tsx
  - backup: \src\app\(private)\paiements\relations\page.tsx
  - backup: \src\app\(private)\paiements\workflows\page.tsx
  - backup: \src\app\(private)\paiements\[id]\edit
  - backup: \src\app\(private)\paiements\[id]\page.tsx
  - backup: \src\app\(private)\paiements\[id]\edit\page.tsx

## parcelles
- pages : 4
- backups : 7
  - backup: \src\app\(private)\parcelles\nouveau
  - backup: \src\app\(private)\parcelles\[id]
  - backup: \src\app\(private)\parcelles\page.tsx
  - backup: \src\app\(private)\parcelles\nouveau\page.tsx
  - backup: \src\app\(private)\parcelles\[id]\edit
  - backup: \src\app\(private)\parcelles\[id]\page.tsx
  - backup: \src\app\(private)\parcelles\[id]\edit\page.tsx

## persistence
- pages : 1
- backups : 1
  - backup: \src\app\(private)\persistence\page.tsx

## platform
- pages : 1
- backups : 1
  - backup: \src\app\(private)\platform\page.tsx

## production
- pages : 1
- backups : 1
  - backup: \src\app\(private)\production\page.tsx

## produits
- pages : 9
- backups : 17
  - backup: \src\app\(private)\produits\audit
  - backup: \src\app\(private)\produits\export
  - backup: \src\app\(private)\produits\import
  - backup: \src\app\(private)\produits\nouveau
  - backup: \src\app\(private)\produits\relations
  - backup: \src\app\(private)\produits\workflows
  - backup: \src\app\(private)\produits\[id]
  - backup: \src\app\(private)\produits\page.tsx
  - backup: \src\app\(private)\produits\audit\page.tsx
  - backup: \src\app\(private)\produits\export\page.tsx
  - backup: \src\app\(private)\produits\import\page.tsx
  - backup: \src\app\(private)\produits\nouveau\page.tsx
  - backup: \src\app\(private)\produits\relations\page.tsx
  - backup: \src\app\(private)\produits\workflows\page.tsx
  - backup: \src\app\(private)\produits\[id]\edit
  - backup: \src\app\(private)\produits\[id]\page.tsx
  - backup: \src\app\(private)\produits\[id]\edit\page.tsx

## pwa
- pages : 1
- backups : 1
  - backup: \src\app\(private)\pwa\page.tsx

## realtime
- pages : 1
- backups : 1
  - backup: \src\app\(private)\realtime\page.tsx

## recettes
- pages : 4
- backups : 7
  - backup: \src\app\(private)\recettes\nouveau
  - backup: \src\app\(private)\recettes\[id]
  - backup: \src\app\(private)\recettes\page.tsx
  - backup: \src\app\(private)\recettes\nouveau\page.tsx
  - backup: \src\app\(private)\recettes\[id]\edit
  - backup: \src\app\(private)\recettes\[id]\page.tsx
  - backup: \src\app\(private)\recettes\[id]\edit\page.tsx

## recoltes
- pages : 4
- backups : 7
  - backup: \src\app\(private)\recoltes\nouveau
  - backup: \src\app\(private)\recoltes\[id]
  - backup: \src\app\(private)\recoltes\page.tsx
  - backup: \src\app\(private)\recoltes\nouveau\page.tsx
  - backup: \src\app\(private)\recoltes\[id]\edit
  - backup: \src\app\(private)\recoltes\[id]\page.tsx
  - backup: \src\app\(private)\recoltes\[id]\edit\page.tsx

## resilience
- pages : 1
- backups : 1
  - backup: \src\app\(private)\resilience\page.tsx

## runtime
- pages : 1
- backups : 2
  - backup: \src\app\(private)\runtime\[module]
  - backup: \src\app\(private)\runtime\[module]\page.tsx

## runtime-cockpit
- pages : 1
- backups : 1
  - backup: \src\app\(private)\runtime-cockpit\page.tsx

## runtime-registry
- pages : 1
- backups : 1
  - backup: \src\app\(private)\runtime-registry\page.tsx

## runtime-supervision
- pages : 1
- backups : 1
  - backup: \src\app\(private)\runtime-supervision\page.tsx

## security
- pages : 1
- backups : 1
  - backup: \src\app\(private)\security\page.tsx

## stocks
- pages : 10
- backups : 19
  - backup: \src\app\(private)\stocks\audit
  - backup: \src\app\(private)\stocks\export
  - backup: \src\app\(private)\stocks\import
  - backup: \src\app\(private)\stocks\new
  - backup: \src\app\(private)\stocks\nouveau
  - backup: \src\app\(private)\stocks\relations
  - backup: \src\app\(private)\stocks\workflows
  - backup: \src\app\(private)\stocks\[id]
  - backup: \src\app\(private)\stocks\page.tsx
  - backup: \src\app\(private)\stocks\audit\page.tsx
  - backup: \src\app\(private)\stocks\export\page.tsx
  - backup: \src\app\(private)\stocks\import\page.tsx
  - backup: \src\app\(private)\stocks\new\page.tsx
  - backup: \src\app\(private)\stocks\nouveau\page.tsx
  - backup: \src\app\(private)\stocks\relations\page.tsx
  - backup: \src\app\(private)\stocks\workflows\page.tsx
  - backup: \src\app\(private)\stocks\[id]\edit
  - backup: \src\app\(private)\stocks\[id]\page.tsx
  - backup: \src\app\(private)\stocks\[id]\edit\page.tsx

## streams
- pages : 1
- backups : 1
  - backup: \src\app\(private)\streams\page.tsx

## supervision
- pages : 1
- backups : 2
  - backup: \src\app\(private)\supervision\page.tsx
  - backup: \src\app\(private)\supervision\page.tsx.bak.dashboard-split

## taches
- pages : 4
- backups : 7
  - backup: \src\app\(private)\taches\nouveau
  - backup: \src\app\(private)\taches\[id]
  - backup: \src\app\(private)\taches\page.tsx
  - backup: \src\app\(private)\taches\nouveau\page.tsx
  - backup: \src\app\(private)\taches\[id]\edit
  - backup: \src\app\(private)\taches\[id]\page.tsx
  - backup: \src\app\(private)\taches\[id]\edit\page.tsx

## team
- pages : 1
- backups : 1
  - backup: \src\app\(private)\team\page.tsx

## tenants
- pages : 1
- backups : 1
  - backup: \src\app\(private)\tenants\page.tsx

## terrains
- pages : 9
- backups : 17
  - backup: \src\app\(private)\terrains\audit
  - backup: \src\app\(private)\terrains\export
  - backup: \src\app\(private)\terrains\import
  - backup: \src\app\(private)\terrains\nouveau
  - backup: \src\app\(private)\terrains\relations
  - backup: \src\app\(private)\terrains\workflows
  - backup: \src\app\(private)\terrains\[id]
  - backup: \src\app\(private)\terrains\page.tsx
  - backup: \src\app\(private)\terrains\audit\page.tsx
  - backup: \src\app\(private)\terrains\export\page.tsx
  - backup: \src\app\(private)\terrains\import\page.tsx
  - backup: \src\app\(private)\terrains\nouveau\page.tsx
  - backup: \src\app\(private)\terrains\relations\page.tsx
  - backup: \src\app\(private)\terrains\workflows\page.tsx
  - backup: \src\app\(private)\terrains\[id]\edit
  - backup: \src\app\(private)\terrains\[id]\page.tsx
  - backup: \src\app\(private)\terrains\[id]\edit\page.tsx

## testing
- pages : 1
- backups : 1
  - backup: \src\app\(private)\testing\page.tsx

## vehicules
- pages : 4
- backups : 7
  - backup: \src\app\(private)\vehicules\nouveau
  - backup: \src\app\(private)\vehicules\[id]
  - backup: \src\app\(private)\vehicules\page.tsx
  - backup: \src\app\(private)\vehicules\nouveau\page.tsx
  - backup: \src\app\(private)\vehicules\[id]\edit
  - backup: \src\app\(private)\vehicules\[id]\page.tsx
  - backup: \src\app\(private)\vehicules\[id]\edit\page.tsx

## workers
- pages : 1
- backups : 1
  - backup: \src\app\(private)\workers\page.tsx

## workflows-runtime
- pages : 1
- backups : 1
  - backup: \src\app\(private)\workflows-runtime\page.tsx

# 5. Scripts potentiellement concurrents


## persistence - 4 scripts
- \scripts\persistence
- \scripts\erp\connect-runtime-persistence.ps1
- \scripts\erp\setup-runtime-persistence.ps1
- \scripts\persistence\connect-runtime-persistence.ps1

## bootstrap - 3 scripts
- \scripts\bootstrap
- \scripts\setup-runtime-bootstrap.ps1
- \scripts\erp\setup-runtime-bootstrap.ps1

## erp-module - 3 scripts
- \scripts\create-erp-module.ps1
- \scripts\config\generate-erp-module.ps1
- \scripts\generators\generate-erp-module.ps1

## dashboard - 3 scripts
- \scripts\dashboard
- \scripts\config\setup-dashboard.ps1
- \scripts\dashboard\setup-dashboard.ps1

## erp-core - 2 scripts
- \scripts\config\setup-erp-core.ps1
- \scripts\platform\setup-erp-core.ps1

## erp-ui-core - 2 scripts
- \scripts\erp\connect-erp-ui-core.ps1
- \scripts\erp\setup-erp-ui-core.ps1

## automation-engine - 2 scripts
- \scripts\automation\setup-automation-engine.ps1
- \scripts\erp\setup-automation-engine.ps1

## erp-rules-engine - 2 scripts
- \scripts\erp\connect-erp-rules-engine.ps1
- \scripts\erp\setup-erp-rules-engine.ps1

## event-bus - 2 scripts
- \scripts\erp\connect-event-bus.ps1
- \scripts\erp\setup-event-bus.ps1

## enterprise-os - 2 scripts
- \scripts\erp-os\setup-enterprise-os.ps1
- \scripts\os\setup-enterprise-os.ps1

## terragest-domain-bridge - 2 scripts
- \scripts\runtime\create-terragest-domain-runtime-bridge.ps1
- \scripts\runtime\fix-terragest-domain-runtime-bridge.ps1

## enterprise-testing-platform - 2 scripts
- \scripts\runtime\fix-enterprise-testing-platform.ps1
- \scripts\runtime\setup-enterprise-testing-platform.ps1

## timeline-ui - 2 scripts
- \scripts\erp\connect-runtime-timeline-ui.ps1
- \scripts\erp\setup-runtime-timeline-ui.ps1

## timeline - 2 scripts
- \scripts\erp\connect-runtime-timeline.ps1
- \scripts\erp\setup-runtime-timeline.ps1

## transition-engine - 2 scripts
- \scripts\erp\connect-transition-engine.ps1
- \scripts\erp\setup-transition-engine.ps1

## fix - 2 scripts
- \scripts\fix
- \scripts\fix\scripts\fix

## governance - 2 scripts
- \scripts\governance
- \scripts\setup-runtime-governance.ps1

## features - 2 scripts
- \scripts\features
- \scripts\generators\registry\features.ps1

## encoding - 2 scripts
- \scripts\encoding
- \scripts\shared\encoding.ps1

## erp-layout - 2 scripts
- \scripts\erp-layout
- \scripts\layout\setup-erp-layout.ps1

## modules - 2 scripts
- \scripts\modules
- \scripts\runtime-modules

## architecture-governance - 2 scripts
- \scripts\architecture\setup-architecture-governance.ps1
- \scripts\governance\setup-architecture-governance.ps1

## enterprise-foundation - 2 scripts
- \scripts\architecture\setup-enterprise-foundation.ps1
- \scripts\setup\setup-enterprise-foundation.ps1

## firestore-persistence - 2 scripts
- \scripts\setup-firestore-persistence.ps1
- \scripts\persistence\setup-firestore-persistence.ps1

## observability - 2 scripts
- \scripts\observability
- \scripts\observability\setup-runtime-observability.ps1

## domain - 2 scripts
- \scripts\generate-domain.ps1
- \scripts\generators\Generate-Domain.ps1

# 6. Classification proposee

## Officiel
- src/components/erp/ui
- src/components/erp/generic
- src/runtime/modules
- src/runtime/dashboard
- scripts/erp/create-business-module-v2.ps1

## Wrappers temporaires
- src/components/erp/page
- src/components/erp/theme
- src/components/erp/forms/ERPButton.tsx
- src/components/erp/forms/ERPInput.tsx

## Legacy a migrer puis supprimer
- src/components/ui
- src/components/crud
- src/components/layout
- src/components/shell

## Regle
- Ne rien supprimer avant migration complete + build OK.
- Supprimer par petits lots.
- Apres chaque lot : pnpm build.
