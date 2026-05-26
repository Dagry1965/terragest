# Q22E-9N-F — Scheduling settings UI readiness audit

Date: 2026-05-26T16:23:20.172Z

## Objectif

Auditer la readiness avant création d'une UI générique de paramètres planning.

Chaîne attendue:

- UI future
- RuntimeSchedulingSettingsActions
- RuntimeSchedulingSettingsService
- RuntimeSchedulingSettingsRepository
- RuntimeSchedulingSettingsResolver
- RuntimeSchedulingSettingsEngine
- SchedulingSlotPolicyResolver
- RuntimeSchedulingEngine
- Generic schedulable guard

## Résumé

- Checks: 15
- OK: 15
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers inspectés

- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts`
- `src/runtime/scheduling/RuntimeSchedulingTypes.ts`
- `src/runtime/scheduling/SchedulingSlotPolicy.ts`
- `src/runtime/scheduling/RuntimeSchedulingEngine.ts`
- `src/runtime/guards/processRuntimeBeforeMutationGuards.ts`
- `src/runtime/scheduling/settings/index.ts`
- `src/runtime/scheduling/index.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`

## Candidats UI/form à considérer

- `src/app/(private)/achats/audit/page.tsx`
- `src/app/(private)/achats/export/page.tsx`
- `src/app/(private)/achats/import/page.tsx`
- `src/app/(private)/achats/nouveau/page.tsx`
- `src/app/(private)/achats/page.tsx`
- `src/app/(private)/achats/relations/page.tsx`
- `src/app/(private)/achats/workflows/page.tsx`
- `src/app/(private)/achats/[id]/edit/page.tsx`
- `src/app/(private)/achats/[id]/page.tsx`
- `src/app/(private)/actifs/nouveau/page.tsx`
- `src/app/(private)/actifs/page.tsx`
- `src/app/(private)/actifs/[id]/edit/page.tsx`
- `src/app/(private)/actifs/[id]/page.tsx`
- `src/app/(private)/ai-runtime/page.tsx`
- `src/app/(private)/automation/page.tsx`
- `src/app/(private)/billing/page.tsx`
- `src/app/(private)/budgets/nouveau/page.tsx`
- `src/app/(private)/budgets/page.tsx`
- `src/app/(private)/budgets/[id]/edit/page.tsx`
- `src/app/(private)/budgets/[id]/page.tsx`
- `src/app/(private)/campagnes/analytics/page.tsx`
- `src/app/(private)/campagnes/audit/page.tsx`
- `src/app/(private)/campagnes/dashboard/page.tsx`
- `src/app/(private)/campagnes/export/page.tsx`
- `src/app/(private)/campagnes/import/page.tsx`
- `src/app/(private)/campagnes/nouveau/page.tsx`
- `src/app/(private)/campagnes/page.tsx`
- `src/app/(private)/campagnes/relations/page.tsx`
- `src/app/(private)/campagnes/workflows/page.tsx`
- `src/app/(private)/campagnes/[id]/edit/page.tsx`
- `src/app/(private)/campagnes/[id]/page.tsx`
- `src/app/(private)/clients/audit/page.tsx`
- `src/app/(private)/clients/export/page.tsx`
- `src/app/(private)/clients/import/page.tsx`
- `src/app/(private)/clients/nouveau/page.tsx`
- `src/app/(private)/clients/page.tsx`
- `src/app/(private)/clients/relations/page.tsx`
- `src/app/(private)/clients/workflows/page.tsx`
- `src/app/(private)/clients/[id]/edit/page.tsx`
- `src/app/(private)/clients/[id]/page.tsx`
- `src/app/(private)/clientsauto/analytics/page.tsx`
- `src/app/(private)/clientsauto/audit/page.tsx`
- `src/app/(private)/clientsauto/dashboard/page.tsx`
- `src/app/(private)/clientsauto/export/page.tsx`
- `src/app/(private)/clientsauto/import/page.tsx`
- `src/app/(private)/clientsauto/nouveau/page.tsx`
- `src/app/(private)/clientsauto/page.tsx`
- `src/app/(private)/clientsauto/relations/page.tsx`
- `src/app/(private)/clientsauto/workflows/page.tsx`
- `src/app/(private)/clientsauto/[id]/edit/page.tsx`
- `src/app/(private)/clientsauto/[id]/page.tsx`
- `src/app/(private)/commandes/audit/page.tsx`
- `src/app/(private)/commandes/export/page.tsx`
- `src/app/(private)/commandes/import/page.tsx`
- `src/app/(private)/commandes/nouveau/page.tsx`
- `src/app/(private)/commandes/page.tsx`
- `src/app/(private)/commandes/relations/page.tsx`
- `src/app/(private)/commandes/workflows/page.tsx`
- `src/app/(private)/commandes/[id]/edit/page.tsx`
- `src/app/(private)/commandes/[id]/page.tsx`
- `src/app/(private)/commandesstockauto/analytics/page.tsx`
- `src/app/(private)/commandesstockauto/audit/page.tsx`
- `src/app/(private)/commandesstockauto/dashboard/page.tsx`
- `src/app/(private)/commandesstockauto/export/page.tsx`
- `src/app/(private)/commandesstockauto/import/page.tsx`
- `src/app/(private)/commandesstockauto/nouveau/page.tsx`
- `src/app/(private)/commandesstockauto/page.tsx`
- `src/app/(private)/commandesstockauto/relations/page.tsx`
- `src/app/(private)/commandesstockauto/workflows/page.tsx`
- `src/app/(private)/commandesstockauto/[id]/edit/page.tsx`
- `src/app/(private)/commandesstockauto/[id]/page.tsx`
- `src/app/(private)/compliance/page.tsx`
- `src/app/(private)/contrats/analytics/page.tsx`
- `src/app/(private)/contrats/audit/page.tsx`
- `src/app/(private)/contrats/dashboard/page.tsx`
- `src/app/(private)/contrats/export/page.tsx`
- `src/app/(private)/contrats/import/page.tsx`
- `src/app/(private)/contrats/nouveau/page.tsx`
- `src/app/(private)/contrats/page.tsx`
- `src/app/(private)/contrats/relations/page.tsx`

## Candidats settings/planning existants

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
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts`

## Accès Firestore direct UI détectés

- Aucun.

## Checks détaillés


### OK — Q22E-9N-F-01

- Label: Server actions scheduling settings existent
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts

### OK — Q22E-9N-F-02

- Label: Actions exposent read/save et passent par le service
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts

### OK — Q22E-9N-F-03

- Label: Service scheduling settings existe et expose read/save/validateEffectiveConfig
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts

### OK — Q22E-9N-F-04

- Label: Repository scheduling settings existe avec read/write tenant/workspace/module
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts

### OK — Q22E-9N-F-05

- Label: Resolver/settings engine existent
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts

### OK — Q22E-9N-F-06

- Label: Settings types couvrent les paramètres UI attendus
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts

### OK — Q22E-9N-F-07

- Label: Runtime scheduling field mapping existe
- Severity: HIGH
- Details: src/runtime/scheduling/RuntimeSchedulingTypes.ts

### OK — Q22E-9N-F-08

- Label: SchedulingSlotPolicy transporte le fieldMapping
- Severity: HIGH
- Details: src/runtime/scheduling/SchedulingSlotPolicy.ts

### OK — Q22E-9N-F-09

- Label: RuntimeSchedulingEngine ne hardcode plus les champs rendezvous
- Severity: HIGH
- Details: src/runtime/scheduling/RuntimeSchedulingEngine.ts

### OK — Q22E-9N-F-10

- Label: Guard scheduling est générique schedulable et non rendezvous
- Severity: HIGH
- Details: src/runtime/guards/processRuntimeBeforeMutationGuards.ts

### OK — Q22E-9N-F-11

- Label: Module rendezvous déclare une configuration scheduling consommable
- Severity: HIGH
- Details: src/runtime/modules/generated/rendezvous/rendezvous.module.ts

### OK — Q22E-9N-F-12

- Label: Settings/actions/service sont exportés depuis index
- Severity: HIGH
- Details: src/runtime/scheduling/settings/index.ts

### OK — Q22E-9N-F-13

- Label: Aucun accès Firestore direct détecté dans les candidats UI settings/planning
- Severity: HIGH
- Details: OK

### OK — Q22E-9N-F-14

- Label: Candidats UI/form existants détectés pour réutilisation avant création
- Severity: INFO
- Details: src/app/(private)/achats/audit/page.tsx, src/app/(private)/achats/export/page.tsx, src/app/(private)/achats/import/page.tsx, src/app/(private)/achats/nouveau/page.tsx, src/app/(private)/achats/page.tsx, src/app/(private)/achats/relations/page.tsx, src/app/(private)/achats/workflows/page.tsx, src/app/(private)/achats/[id]/edit/page.tsx, src/app/(private)/achats/[id]/page.tsx, src/app/(private)/actifs/nouveau/page.tsx, src/app/(private)/actifs/page.tsx, src/app/(private)/actifs/[id]/edit/page.tsx, src/app/(private)/actifs/[id]/page.tsx, src/app/(private)/ai-runtime/page.tsx, src/app/(private)/automation/page.tsx, src/app/(private)/billing/page.tsx, src/app/(private)/budgets/nouveau/page.tsx, src/app/(private)/budgets/page.tsx, src/app/(private)/budgets/[id]/edit/page.tsx, src/app/(private)/budgets/[id]/page.tsx, src/app/(private)/campagnes/analytics/page.tsx, src/app/(private)/campagnes/audit/page.tsx, src/app/(private)/campagnes/dashboard/page.tsx, src/app/(private)/campagnes/export/page.tsx, src/app/(private)/campagnes/import/page.tsx, src/app/(private)/campagnes/nouveau/page.tsx, src/app/(private)/campagnes/page.tsx, src/app/(private)/campagnes/relations/page.tsx, src/app/(private)/campagnes/workflows/page.tsx, src/app/(private)/campagnes/[id]/edit/page.tsx, src/app/(private)/campagnes/[id]/page.tsx, src/app/(private)/clients/audit/page.tsx, src/app/(private)/clients/export/page.tsx, src/app/(private)/clients/import/page.tsx, src/app/(private)/clients/nouveau/page.tsx, src/app/(private)/clients/page.tsx, src/app/(private)/clients/relations/page.tsx, src/app/(private)/clients/workflows/page.tsx, src/app/(private)/clients/[id]/edit/page.tsx, src/app/(private)/clients/[id]/page.tsx

### OK — Q22E-9N-F-15

- Label: Aucune UI settings scheduling dédiée n'existe encore
- Severity: INFO
- Details: src/app/(private)/rendezvous/planning/page.tsx, src/components/erp/scheduling/ERPSchedulingPlanningView.tsx, src/components/erp/scheduling/index.ts, src/platform/scheduling/DomainQueues.ts, src/platform/scheduling/WorkflowPriority.ts, src/platform/scheduling/WorkflowSchedulerPolicy.ts, src/runtime/scheduling/index.ts, src/runtime/scheduling/RuntimeOpeningHours.ts, src/runtime/scheduling/RuntimeSchedulingEngine.ts, src/runtime/scheduling/RuntimeSchedulingTypes.ts, src/runtime/scheduling/SchedulingSlotPolicy.ts, src/runtime/scheduling/settings/index.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts

## Décision recommandée

Aucun échec HIGH. La chaîne est prête pour la création d'une UI générique de paramètres planning.

Suite recommandée:
- Q22E-9N-G — create generic scheduling settings UI.
- L'UI devra appeler les server actions, jamais Firestore ni repository directement.
- L'UI devra rester générique et module-driven.
