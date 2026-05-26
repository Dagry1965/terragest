# Q22E-9N-I — Scheduling settings runtime flow audit

Date: 2026-05-26T16:57:15.698Z

## Objectif

Auditer le flux runtime avant test manuel de l'UI paramètres planning.

Chaîne attendue:

- Navigation runtime
- Route /settings/scheduling
- ERPSchedulingSettingsPanel
- RuntimeSchedulingSettingsActions
- RuntimeSchedulingSettingsService
- RuntimeSchedulingSettingsRepository
- RuntimeSchedulingSettingsResolver
- RuntimeSchedulingSettingsEngine
- SchedulingSlotPolicy
- RuntimeSchedulingEngine
- Planning view

## Résumé

- Checks: 15
- OK: 15
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers inspectés

- `src/app/(private)/settings/scheduling/page.tsx`
- `src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts`
- `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx`
- `src/runtime/scheduling/SchedulingSlotPolicy.ts`
- `src/runtime/scheduling/RuntimeSchedulingEngine.ts`
- `src/runtime/navigation/ERPNavigationEngine.ts`

## Checks détaillés


### OK — Q22E-9N-I-01

- Label: Route /settings/scheduling existe et rend le panel
- Severity: HIGH
- Details: src/app/(private)/settings/scheduling/page.tsx

### OK — Q22E-9N-I-02

- Label: Panel charge via readRuntimeSchedulingSettingsAction
- Severity: HIGH
- Details: src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx

### OK — Q22E-9N-I-03

- Label: Panel sauvegarde via saveRuntimeSchedulingSettingsAction
- Severity: HIGH
- Details: src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx

### OK — Q22E-9N-I-04

- Label: Panel sauvegarde uniquement les settings éditables persistables
- Severity: HIGH
- Details: src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx

### OK — Q22E-9N-I-05

- Label: Actions délèguent au service
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts

### OK — Q22E-9N-I-06

- Label: Service délègue au repository et au resolver
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts

### OK — Q22E-9N-I-07

- Label: Repository persiste dans runtimeSchedulingSettings
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts

### OK — Q22E-9N-I-08

- Label: Resolver consomme les settings stockés tenant/workspace/module
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts

### OK — Q22E-9N-I-09

- Label: Settings engine fusionne settings et produit effective config
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts

### OK — Q22E-9N-I-10

- Label: Planning view consomme RuntimeSchedulingSettingsResolver
- Severity: HIGH
- Details: src/components/erp/scheduling/ERPSchedulingPlanningView.tsx

### OK — Q22E-9N-I-11

- Label: Policy transporte buffer/capacity/duration
- Severity: HIGH
- Details: src/runtime/scheduling/SchedulingSlotPolicy.ts

### OK — Q22E-9N-I-12

- Label: RuntimeSchedulingEngine consomme la policy/config générique
- Severity: HIGH
- Details: src/runtime/scheduling/RuntimeSchedulingEngine.ts

### OK — Q22E-9N-I-13

- Label: Navigation expose /settings/scheduling
- Severity: HIGH
- Details: src/runtime/navigation/ERPNavigationEngine.ts

### OK — Q22E-9N-I-14

- Label: UI/action/service ne touchent pas Firestore directement hors repository
- Severity: HIGH
- Details: page/panel/actions/service

### OK — Q22E-9N-I-15

- Label: Aucun hardcode AMARKHYS/garage dans la chaîne settings scheduling
- Severity: HIGH
- Details: page/panel/actions/service/navigation

## Décision recommandée

Aucun échec HIGH. Le test manuel UI runtime peut être lancé.

Test manuel recommandé:
1. Ouvrir /settings/scheduling.
2. Cliquer Charger.
3. Modifier Durée visible, Buffer, Capacité.
4. Cliquer Enregistrer.
5. Vérifier document runtimeSchedulingSettings côté Firestore.
6. Ouvrir le planning et vérifier le recalcul des slots.
