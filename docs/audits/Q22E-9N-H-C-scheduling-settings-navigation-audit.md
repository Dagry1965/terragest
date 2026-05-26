# Q22E-9N-H-C — Scheduling settings navigation audit

Date: 2026-05-26T16:51:05.428Z

## Objectif

Auditer le branchement de /settings/scheduling dans la navigation runtime.

## Résumé

- Checks: 8
- OK: 8
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers inspectés

- `src/runtime/navigation/ERPNavigationEngine.ts`
- `src/components/erp/layout/ERPAppShell.tsx`
- `src/components/erp/shell/ErpSidebar.tsx`
- `src/core/layout/Sidebar.tsx`
- `src/app/(private)/settings/scheduling/page.tsx`

## Checks détaillés


### OK — Q22E-9N-H-C-01

- Label: ERPNavigationEngine existe
- Severity: HIGH
- Details: src/runtime/navigation/ERPNavigationEngine.ts

### OK — Q22E-9N-H-C-02

- Label: Navigation runtime contient le workspace Paramètres ERP
- Severity: HIGH
- Details: src/runtime/navigation/ERPNavigationEngine.ts

### OK — Q22E-9N-H-C-03

- Label: Navigation runtime contient le lien /settings/scheduling
- Severity: HIGH
- Details: src/runtime/navigation/ERPNavigationEngine.ts

### OK — Q22E-9N-H-C-04

- Label: Le lien est ajouté dans le moteur runtime, pas dans la sidebar AMARKHYS
- Severity: HIGH
- Details: src/components/erp/shell/ErpSidebar.tsx

### OK — Q22E-9N-H-C-05

- Label: Les shells génériques consomment getERPWorkspacesNavigation
- Severity: HIGH
- Details: src/components/erp/layout/ERPAppShell.tsx, src/components/erp/shell/ErpSidebar.tsx, src/core/layout/Sidebar.tsx

### OK — Q22E-9N-H-C-06

- Label: Route settings/scheduling existe toujours
- Severity: HIGH
- Details: src/app/(private)/settings/scheduling/page.tsx

### OK — Q22E-9N-H-C-07

- Label: Navigation settings ne hardcode pas AMARKHYS/garage
- Severity: HIGH
- Details: src/runtime/navigation/ERPNavigationEngine.ts

### OK — Q22E-9N-H-C-08

- Label: Navigation settings ne touche pas Firestore
- Severity: HIGH
- Details: src/runtime/navigation/ERPNavigationEngine.ts

## Décision recommandée

Aucun échec HIGH. La navigation runtime expose proprement /settings/scheduling.
