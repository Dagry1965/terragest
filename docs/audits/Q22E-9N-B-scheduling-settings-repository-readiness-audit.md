# Q22E-9N-B — RuntimeSchedulingSettingsRepository readiness audit

Date: 2026-05-26T14:52:29.267Z

## Objectif

Auditer le repository de paramètres planning avant de créer une UI générique.

Doctrine appliquée:

- Repository persiste.
- Resolver calcule la configuration effective.
- Settings engine fusionne/valide.
- Policy transforme la configuration en paramètres métier de slots.
- Engine calcule.
- UI affiche/édite seulement.

## Résumé

- Checks: 20
- OK: 20
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers inspectés

- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts`
- `src/runtime/scheduling/settings/index.ts`
- `src/runtime/scheduling/index.ts`

## Fichiers scheduling détectés

- `src/runtime/scheduling/index.ts`
- `src/runtime/scheduling/RuntimeOpeningHours.ts`
- `src/runtime/scheduling/RuntimeSchedulingEngine.ts`
- `src/runtime/scheduling/RuntimeSchedulingTypes.ts`
- `src/runtime/scheduling/SchedulingSlotPolicy.ts`
- `src/runtime/scheduling/settings/index.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts`

## Exports repository

- `export interface RuntimeSchedulingSettingsRepositoryContext`
- `export interface RuntimeSchedulingStoredSettingsBundle`
- `export interface RuntimeSchedulingSettingsSaveInput`
- `export class RuntimeSchedulingSettingsRepository`

## Exports types

- `export interface RuntimeSchedulingSettingsScope`
- `export type RuntimeSchedulingSettingsLevel`
- `export type RuntimeSchedulingSettingsCriticity`
- `export interface RuntimeSchedulingOpeningPeriodSettings`
- `export interface RuntimeSchedulingOpeningDaySettings`
- `export interface RuntimeSchedulingOpeningHoursSettings`
- `export interface RuntimeSchedulingCalendarExceptionSettings`
- `export interface RuntimeSchedulingEditableSettings`
- `export interface RuntimeSchedulingStructuralConfig`
- `export interface RuntimeSchedulingSettings`
- `export interface RuntimeSchedulingEffectiveConfig`
- `export interface RuntimeSchedulingSettingsResolutionInput`
- `export interface RuntimeSchedulingSettingsValidationIssue`
- `export interface RuntimeSchedulingSettingsValidationResult`
- `export interface RuntimeStoredSchedulingSettings`
- `export type RuntimeSchedulingSettingsStorageScope`

## Checks détaillés


### OK — Q22E-9N-B-01

- Label: RuntimeSchedulingSettingsRepository existe
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts

### OK — Q22E-9N-B-02

- Label: Repository expose un contexte générique tenant/workspace/module/user
- Severity: HIGH
- Details: RuntimeSchedulingSettingsRepositoryContext

### OK — Q22E-9N-B-03

- Label: Repository lit les settings tenant/workspace/module
- Severity: HIGH
- Details: readTenantSettings/readWorkspaceSettings/readModuleSettings

### OK — Q22E-9N-B-04

- Label: Repository écrit les settings tenant/workspace/module
- Severity: HIGH
- Details: saveTenantSettings/saveWorkspaceSettings/saveModuleSettings

### OK — Q22E-9N-B-05

- Label: Repository résout un bundle stocké tenant/workspace/module
- Severity: HIGH
- Details: resolveStoredSettings

### OK — Q22E-9N-B-06

- Label: Repository utilise une collection Firestore dédiée aux settings scheduling
- Severity: HIGH
- Details: collection runtimeSchedulingSettings

### OK — Q22E-9N-B-07

- Label: Repository utilise setDoc merge pour ne pas écraser brutalement
- Severity: HIGH
- Details: setDoc(..., { merge: true })

### OK — Q22E-9N-B-08

- Label: Repository nettoie les valeurs undefined avant persistance
- Severity: HIGH
- Details: cleanSettings

### OK — Q22E-9N-B-09

- Label: Repository horodate et trace updatedBy
- Severity: HIGH
- Details: updatedAt/updatedBy

### OK — Q22E-9N-B-10

- Label: Repository impose tenantId
- Severity: HIGH
- Details: requireTenantId

### OK — Q22E-9N-B-11

- Label: Repository impose workspaceId pour workspace/module
- Severity: HIGH
- Details: requireWorkspaceId

### OK — Q22E-9N-B-12

- Label: Repository impose moduleKey pour module
- Severity: HIGH
- Details: requireModuleKey

### OK — Q22E-9N-B-13

- Label: Types settings contiennent les champs de paramétrage planning attendus
- Severity: HIGH
- Details: duration/buffer/capacity/openingHours/exceptions

### OK — Q22E-9N-B-14

- Label: Types settings exposent une notion de scope de persistance
- Severity: HIGH
- Details: RuntimeSchedulingSettingsStorageScope

### OK — Q22E-9N-B-15

- Label: Resolver consomme ou peut consommer les settings stockés
- Severity: HIGH
- Details: RuntimeSchedulingSettingsResolver

### OK — Q22E-9N-B-16

- Label: Settings index exporte le repository
- Severity: HIGH
- Details: src/runtime/scheduling/settings/index.ts

### OK — Q22E-9N-B-17

- Label: Aucun hardcode AMARKHYS/garage dans le repository
- Severity: HIGH
- Details: repository générique

### OK — Q22E-9N-B-18

- Label: Aucun hardcode rendezvous dans le repository
- Severity: HIGH
- Details: repository indépendant des modules

### OK — Q22E-9N-B-19

- Label: Aucun hardcode vehiculeId/typeService dans le repository
- Severity: HIGH
- Details: repository indépendant métier

### OK — Q22E-9N-B-20

- Label: Repository injectable/testable via Firestore optionnel
- Severity: HIGH
- Details: firestore optionnel

## Décision recommandée

Aucun échec HIGH. Le repository est prêt architecturalement pour être consommé par une UI générique ou une couche service.

Suite recommandée:
- Q22E-9N-C — audit service/action layer pour lecture/écriture settings depuis l'UI.
- Puis Q22E-9N-D — UI générique de paramètres planning.
