# Q22E-9N-A2 — Scheduling policy resolver shape audit

Date: 2026-05-26T14:43:07.390Z

## Objectif

Vérifier si le resolver de policy planning existe déjà conceptuellement ou s'il faut créer une couche explicite.

Doctrine:
- pas d'UI avant policy claire;
- pas de duplication;
- pas de logique locale;
- pas de hardcode AMARKHYS/garage/rendezvous dans le moteur;
- le resolver transforme settings/metadata/context en policy consommable par RuntimeSchedulingEngine.

## Résumé

- Checks: 8
- OK: 8
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers scheduling

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

## Exports détectés

### SchedulingSlotPolicy.ts

- `export interface SchedulingSlotPolicyInput`
- `export interface SchedulingSlotPolicy`
- `export const DEFAULT_SCHEDULING_VISIBLE_DURATION_MINUTES`
- `export const DEFAULT_SCHEDULING_BUFFER_MINUTES`
- `export const DEFAULT_SCHEDULING_CAPACITY`
- `export const DEFAULT_SCHEDULING_STATUS_FIELD`
- `export const DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES`
- `export class SchedulingSlotPolicyResolver`

### RuntimeSchedulingEngine.ts

- `export type RuntimeRecord`
- `export interface RuntimeAppointmentSlot`
- `export interface AppointmentConflictOptions`
- `export interface SchedulingValidationResult`
- `export class RuntimeSchedulingEngine`

### RuntimeSchedulingSettingsTypes.ts

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


### OK — Q22E-9N-A2-01

- Label: SchedulingSlotPolicy.ts existe
- Severity: HIGH
- Details: src/runtime/scheduling/SchedulingSlotPolicy.ts

### OK — Q22E-9N-A2-02

- Label: SchedulingSlotPolicy.ts expose une policy ou une fonction de résolution
- Severity: HIGH
- Details: export interface SchedulingSlotPolicyInput, export interface SchedulingSlotPolicy, export const DEFAULT_SCHEDULING_VISIBLE_DURATION_MINUTES, export const DEFAULT_SCHEDULING_BUFFER_MINUTES, export const DEFAULT_SCHEDULING_CAPACITY, export const DEFAULT_SCHEDULING_STATUS_FIELD, export const DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES, export class SchedulingSlotPolicyResolver

### OK — Q22E-9N-A2-03

- Label: Un SchedulingSlotPolicyResolver explicite existe
- Severity: INFO
- Details: src/runtime/scheduling/SchedulingSlotPolicy.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts

### OK — Q22E-9N-A2-04

- Label: RuntimeSchedulingEngine consomme une policy externe
- Severity: HIGH
- Details: RuntimeSchedulingEngine.ts

### OK — Q22E-9N-A2-05

- Label: RuntimeSchedulingSettingsEngine produit buffer/capacity/duration
- Severity: HIGH
- Details: RuntimeSchedulingSettingsEngine.ts

### OK — Q22E-9N-A2-06

- Label: RuntimeSchedulingSettingsRepository existe et expose lecture/écriture
- Severity: HIGH
- Details: RuntimeSchedulingSettingsRepository.ts

### OK — Q22E-9N-A2-07

- Label: Exports scheduling index à vérifier
- Severity: INFO
- Details: export * from "./RuntimeSchedulingTypes";
export * from "./RuntimeOpeningHours";
export * from "./RuntimeSchedulingEngine";
export * from "./SchedulingSlotPolicy";


### OK — Q22E-9N-A2-08

- Label: Exports settings index à vérifier
- Severity: INFO
- Details: export * from "./RuntimeSchedulingSettingsTypes";
export * from "./RuntimeSchedulingSettingsEngine";
export * from "./RuntimeSchedulingSettingsRepository";
export * from "./RuntimeSchedulingSettingsResolver";


## Décision recommandée

La base policy/settings semble présente, mais aucun resolver explicite n'est détecté.

Suite recommandée:
- Q22E-9N-B — créer SchedulingSlotPolicyResolver générique.
