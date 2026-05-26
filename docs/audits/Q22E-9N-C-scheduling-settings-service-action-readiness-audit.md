# Q22E-9N-C — Scheduling settings service/action layer readiness audit

Date: 2026-05-26T15:35:37.374Z

## Objectif

Auditer la couche service/action avant de créer une UI générique de paramètres planning.

## Résumé

- Checks: 14
- OK: 12
- FAIL: 2
- FAIL_HIGH: 0
- FAIL_INFO: 2

## Server actions candidates

- Aucune.

## API route candidates

- `src/app/api/health/route.ts`
- `src/app/api/platform/status/route.ts`
- `src/app/api/stripe/checkout/route.ts`
- `src/app/api/stripe/webhook/route.ts`

## Forbidden generic scheduling hardcodes

- Aucun.

## Forbidden generic rendezvous hardcodes

- Aucun.

## Checks détaillés


### OK — Q22E-9N-C-01

- Label: Repository settings scheduling existe
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts

### OK — Q22E-9N-C-02

- Label: Resolver settings scheduling existe
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts

### OK — Q22E-9N-C-03

- Label: Settings engine scheduling existe
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts

### FAIL — Q22E-9N-C-04

- Label: Une server action candidate existe pour settings/runtime/scheduling
- Severity: INFO
- Details: Aucune server action candidate détectée

### FAIL — Q22E-9N-C-05

- Label: Une API route candidate existe pour settings/runtime/scheduling
- Severity: INFO
- Details: src/app/api/health/route.ts, src/app/api/platform/status/route.ts, src/app/api/stripe/checkout/route.ts, src/app/api/stripe/webhook/route.ts

### OK — Q22E-9N-C-06

- Label: Un consommateur applicatif du repository scheduling settings existe
- Severity: INFO
- Details: src/runtime/scheduling/settings/index.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts

### OK — Q22E-9N-C-07

- Label: Un consommateur applicatif du resolver/settings engine existe
- Severity: INFO
- Details: src/components/erp/scheduling/ERPSchedulingPlanningView.tsx, src/runtime/guards/processRuntimeBeforeMutationGuards.ts, src/runtime/scheduling/settings/index.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts

### OK — Q22E-9N-C-08

- Label: Des candidats permission/guard existent pour protéger les writes settings
- Severity: INFO
- Details: src/components/erp/cockpit/ERPRuntimeCockpitDashboard.tsx, src/components/erp/runtime-ui/ERPRuntimeRegistryDashboard.tsx, src/components/erp/security-runtime/ERPProtectedAction.tsx, src/components/erp/security-runtime/ERPRuntimeSecurityBadge.tsx, src/components/erp/security-runtime/ERPSecurityContextPanel.tsx, src/features/auth/services/PermissionService.ts, src/features/auth/services/RBACEngine.ts, src/features/invitations/services/InvitationService.ts, src/features/materiels/runtime/EnterpriseMaterielFlow.ts, src/features/teams/services/TeamService.ts, src/features/tenancy/services/TenantService.ts, src/platform/auth/AuthService.ts, src/platform/governance/GovernanceRuntime.ts, src/platform/rules/runtime/RulePipelineRuntime.ts, src/runtime/actions/ERPAction.ts, src/runtime/actions/ERPActionExecutor.ts, src/runtime/actions/RuntimeActionEngine.ts, src/runtime/ai/assistant/ERPAIAssistantEngine.ts, src/runtime/ai/assistant/ERPAIAssistantMessage.ts, src/runtime/automation-runtime/AutomationRuntimeRules.ts, src/runtime/cockpit/ERPCockpitSnapshot.ts, src/runtime/context/RuntimeContextEnforcer.ts, src/runtime/context/RuntimeContextEngine.ts, src/runtime/core/RuntimeBindings.ts, src/runtime/core/RuntimeContracts.ts, src/runtime/core/RuntimeModuleConnector.ts, src/runtime/core/RuntimePermissionRegistry.ts, src/runtime/core/RuntimePipeline.ts, src/runtime/domain/models/TerragestDomainModel.ts, src/runtime/firestore/FirestoreRuntimeMutation.ts

### OK — Q22E-9N-C-09

- Label: Aucun hardcode AMARKHYS/garage/vehiculeId/typeService dans runtime scheduling générique
- Severity: HIGH
- Details: OK

### OK — Q22E-9N-C-10

- Label: Aucun hardcode rendezvous/dateRendezVous/heureRendezVous dans runtime scheduling générique
- Severity: HIGH
- Details: OK

### OK — Q22E-9N-C-11

- Label: Aucun accès Firestore direct détecté dans UI scheduling existante
- Severity: HIGH
- Details: OK

### OK — Q22E-9N-C-12

- Label: Settings repository est exporté pour être consommé par une couche service/action
- Severity: HIGH
- Details: src/runtime/scheduling/settings/index.ts

### OK — Q22E-9N-C-13

- Label: Types settings sont exportés pour formulaires/service/action
- Severity: HIGH
- Details: src/runtime/scheduling/settings/index.ts

### OK — Q22E-9N-C-14

- Label: La future couche service/action devra probablement être créée
- Severity: INFO
- Details: Check informatif

## Décision recommandée

Aucun échec HIGH. Aucune couche service/action claire n'a été détectée pour exposer les settings scheduling à une UI.

Suite recommandée:
- Q22E-9N-D — créer une couche service/action générique pour scheduling settings.
