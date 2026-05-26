# Q22E-9N-A — Planning settings runtime repository/UI readiness audit

Date: 2026-05-26T14:45:17.905Z

## Objectif

Auditer l'existant avant de créer un repository ou une interface de paramétrage planning.

Doctrine appliquée:

- Settings / metadata déclarent.
- Resolver calcule la configuration effective.
- Policy résout les paramètres métier.
- Engine calcule les slots.
- Guards protègent.
- Repository persiste.
- Vue affiche/édite sans recalculer les règles métier.


## Résumé

- Checks: 10
- OK: 9
- FAIL: 1
- FAIL_HIGH: 0
- FAIL_INFO: 1

## Fichiers scheduling détectés

- `src/app/(private)/rendezvous/planning/page.tsx`
- `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx`
- `src/components/erp/scheduling/index.ts`
- `src/platform/scheduling/DomainQueues.ts`
- `src/platform/scheduling/WorkflowPriority.ts`
- `src/platform/scheduling/WorkflowSchedulerPolicy.ts`
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

## Settings / resolvers / policy détectés

- `src/platform/scheduling/WorkflowSchedulerPolicy.ts`
- `src/runtime/scheduling/SchedulingSlotPolicy.ts`
- `src/runtime/scheduling/settings/index.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts`

## Repository candidates

- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts`

## Routes/pages candidates

- `src/app/(private)/rendezvous/analytics/page.tsx`
- `src/app/(private)/rendezvous/audit/page.tsx`
- `src/app/(private)/rendezvous/dashboard/page.tsx`
- `src/app/(private)/rendezvous/export/page.tsx`
- `src/app/(private)/rendezvous/import/page.tsx`
- `src/app/(private)/rendezvous/nouveau/page.tsx`
- `src/app/(private)/rendezvous/page.tsx`
- `src/app/(private)/rendezvous/planning/page.tsx`
- `src/app/(private)/rendezvous/relations/page.tsx`
- `src/app/(private)/rendezvous/workflows/page.tsx`
- `src/app/(private)/rendezvous/[id]/edit/page.tsx`
- `src/app/(private)/rendezvous/[id]/page.tsx`

## UI candidates

- `src/app/(private)/rendezvous/planning/page.tsx`
- `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx`
- `src/components/erp/scheduling/index.ts`
- `src/platform/scheduling/DomainQueues.ts`
- `src/platform/scheduling/WorkflowPriority.ts`
- `src/platform/scheduling/WorkflowSchedulerPolicy.ts`
- `src/runtime/scheduling/settings/index.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts`

## Checks détaillés


### OK — Q22E-9N-A-01

- Label: RuntimeSchedulingSettingsEngine existe
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts

### OK — Q22E-9N-A-02

- Label: RuntimeSchedulingSettingsResolver existe
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts

### OK — Q22E-9N-A-03

- Label: SchedulingSlotPolicyResolver existe
- Severity: HIGH
- Details: src/runtime/scheduling/SchedulingSlotPolicy.ts

### OK — Q22E-9N-A-04

- Label: RuntimeSchedulingEngine consomme une policy de slots
- Severity: HIGH
- Details: src/runtime/scheduling/RuntimeSchedulingEngine.ts

### OK — Q22E-9N-A-05

- Label: La vue planning ne doit pas recalculer localement duration/buffer/capacity
- Severity: HIGH
- Details: src/components/erp/scheduling/ERPSchedulingPlanningView.tsx

### OK — Q22E-9N-A-06

- Label: Les guards ne doivent pas recalculer localement la policy scheduling
- Severity: HIGH
- Details: src/runtime/guards/processRuntimeBeforeMutationGuards.ts

### OK — Q22E-9N-A-07

- Label: Metadata rendezvous expose des paramètres scheduling exploitables
- Severity: INFO
- Details: src/runtime/modules/generated/rendezvous/rendezvous.module.ts

### OK — Q22E-9N-A-08

- Label: Repository settings scheduling détecté
- Severity: INFO
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts

### FAIL — Q22E-9N-A-09

- Label: Routes/pages de paramétrage scheduling détectées
- Severity: INFO
- Details: src/app/(private)/rendezvous/analytics/page.tsx, src/app/(private)/rendezvous/audit/page.tsx, src/app/(private)/rendezvous/dashboard/page.tsx, src/app/(private)/rendezvous/export/page.tsx, src/app/(private)/rendezvous/import/page.tsx, src/app/(private)/rendezvous/nouveau/page.tsx, src/app/(private)/rendezvous/page.tsx, src/app/(private)/rendezvous/planning/page.tsx, src/app/(private)/rendezvous/relations/page.tsx, src/app/(private)/rendezvous/workflows/page.tsx, src/app/(private)/rendezvous/[id]/edit/page.tsx, src/app/(private)/rendezvous/[id]/page.tsx

### OK — Q22E-9N-A-10

- Label: UI settings scheduling détectée
- Severity: INFO
- Details: src/app/(private)/rendezvous/planning/page.tsx, src/components/erp/scheduling/ERPSchedulingPlanningView.tsx, src/components/erp/scheduling/index.ts, src/platform/scheduling/DomainQueues.ts, src/platform/scheduling/WorkflowPriority.ts, src/platform/scheduling/WorkflowSchedulerPolicy.ts, src/runtime/scheduling/settings/index.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts

## Décision recommandée

Un repository ou candidat repository existe déjà.

Suite recommandée:
- inspecter le repository existant avant d'en créer un nouveau;
- si suffisant, passer à Q22E-9N-B — UI générique de paramètres planning;
- sinon renforcer le repository existant.

