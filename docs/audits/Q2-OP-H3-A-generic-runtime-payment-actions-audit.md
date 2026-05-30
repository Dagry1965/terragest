# Q2-OP-H3-A Generic runtime payment actions audit

Goal: find the generic mechanism that still renders invoice payment actions.

- OK: 2
- INFO: 41
- WARN: 1
- FAIL: 0
- HIGH FAIL: 0

## Top candidates

| Score | Manual href | Builder | Actions | Href template | Runtime only | File | Hits |
|---:|---:|---:|---:|---:|---:|---|---|
| 18 | false | true | true | false | false | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | Enregistrer un paiement, Encaissement facture, encaissementsauto, facturesauto, paiement, payment, RuntimeActionEngine, Action |
| 17 | false | true | true | false | false | `src/components/erp/runtime/ERPRuntimePage.tsx` | facturesauto, paiement, payment, actions:, RuntimeActionEngine, ERPRuntimePage, Action |
| 16 | false | false | true | false | false | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` | encaissementsauto, facturesauto, paiement, payment, actions:, Action |
| 16 | false | false | true | false | false | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | encaissementsauto, facturesauto, paiement, payment, actions:, Action |
| 16 | false | false | true | true | false | `src/app/(private)/clientsauto/hub/page.tsx` | encaissementsauto, facturesauto, paiement, hrefTemplate, actions:, Action |
| 16 | false | false | true | true | false | `src/app/(private)/vehicules/hub/page.tsx` | encaissementsauto, facturesauto, paiement, hrefTemplate, actions:, Action |
| 15 | false | false | true | false | false | `src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts` | encaissementsauto, facturesauto, paiement, actions:, Action |
| 15 | false | false | true | false | false | `src/runtime/modules/generated/clientsauto/clientsauto.module.ts` | encaissementsauto, facturesauto, paiement, actions:, Action |
| 15 | false | false | true | false | false | `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts` | facturesauto, paiement, payment, actions:, Action |
| 15 | false | false | false | false | false | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` | Enregistrer un paiement, facturesauto, paiement, actions:, Action |
| 14 | false | false | true | false | false | `src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts` | facturesauto, paiement, actions:, Action |
| 14 | false | false | true | false | false | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | facturesauto, paiement, actions:, Action |
| 13 | false | false | true | false | true | `src/runtime/actions/RuntimeActionEngine.ts` | runtimeOnly, RuntimeActionEngine, Action |
| 13 | false | false | true | false | false | `src/runtime/automation-runtime/AutomationRuntimeRules.ts` | paiement, actions:, Action |
| 13 | false | false | true | false | true | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | runtimeOnly, actions:, Action |
| 13 | false | false | true | true | false | `src/app/(private)/produitsauto/hub/page.tsx` | hrefTemplate, actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/automation-runtime/AutomationRuntimeQueue.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/automation-runtime/AutomationRuntimeTypes.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/cockpit/index.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/hub/RuntimeHubRelationResolver.ts` | actions:, Action |
| 12 | false | false | true | true | false | `src/runtime/hub/RuntimeHubTypes.ts` | hrefTemplate, Action |
| 12 | false | false | true | false | true | `src/runtime/modules/ERPModule.ts` | runtimeOnly, Action |
| 12 | false | false | true | false | false | `src/runtime/modules/ERPModuleDefinition.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/modules/factory/createBusinessModule.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/registry/modules/ERPRegistryModules.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/registry/types.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/security/policies/ERPPolicy.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/security/policies/ERPPolicyRegistry.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/security-runtime/RuntimeActionGuard.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/status/RuntimeStatusGovernanceEngine.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/status/RuntimeStatusGovernanceTypes.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/runtime/ui/ERPUIComposition.ts` | actions:, Action |
| 12 | false | false | true | false | false | `src/components/erp/actions/ERPActionToolbar.tsx` | actions:, Action |
| 12 | false | false | true | false | false | `src/components/erp/dashboard/ERPDashboardQuickActions.tsx` | actions:, Action |
| 12 | false | false | true | true | false | `src/components/erp/hub/ERPRecordHubSelectedDetails.tsx` | hrefTemplate, Action |
| 6 | false | true | false | false | false | `src/components/erp/billing/InvoicePaymentsHistory.tsx` | Ajouter un paiement, encaissementsauto, facturesauto, paiement, payment, Action |
| 5 | false | false | false | false | false | `src/components/erp/billing/PaymentReceiptActions.tsx` | encaissementsauto, facturesauto, paiement, payment, Action |
| 4 | false | false | false | false | false | `src/runtime/business-rules/runtimeBusinessRules.ts` | encaissementsauto, facturesauto, paiement, Action |
| 4 | false | false | false | false | false | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | encaissementsauto, facturesauto, paiement, Action |
| 4 | false | false | false | false | false | `src/runtime/workspaces/ERPWorkspaceRegistry.ts` | facturesauto, paiement, actions:, Action |
| 4 | false | false | false | false | false | `src/components/erp/billing/InvoiceDocumentActions.tsx` | facturesauto, paiement, payment, Action |
| 4 | false | false | false | false | false | `src/components/erp/hub/ERPClientOperationalSheet.tsx` | encaissementsauto, facturesauto, payment, Action |
| 4 | false | false | false | false | false | `src/components/erp/runtime/ERPRuntimeDetails.tsx` | Encaissement facture, facturesauto, paiement, Action |
| 3 | false | false | true | false | false | `src/runtime/domain/rules/TerragestBusinessRules.ts` | paiement, payment, Action |
| 3 | false | false | false | false | false | `src/runtime/guards/RuntimeChronologyGuard.ts` | encaissementsauto, facturesauto, paiement |
| 3 | false | false | false | false | false | `src/runtime/hub/RuntimeClientOperationalHubLoader.ts` | encaissementsauto, facturesauto, payment |
| 3 | false | false | false | false | false | `src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts` | encaissementsauto, facturesauto, payment |
| 3 | false | false | false | false | false | `src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts` | encaissementsauto, facturesauto, paiement |
| 3 | false | false | false | false | false | `src/runtime/modules/definitions/coreModules.ts` | encaissementsauto, facturesauto, paiement |

## Checks

| Area | Status | Severity | File | Message |
|---|---:|---:|---|---|
| candidate | INFO | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | score=18; manualHref=false; builder=true; actions=true; hrefTemplate=false; runtimeOnly=false; hits=Enregistrer un paiement, Encaissement facture, encaissementsauto, facturesauto, paiement, payment, RuntimeActionEngine, Action |
| candidate | INFO | MEDIUM | `src/components/erp/runtime/ERPRuntimePage.tsx` | score=17; manualHref=false; builder=true; actions=true; hrefTemplate=false; runtimeOnly=false; hits=facturesauto, paiement, payment, actions:, RuntimeActionEngine, ERPRuntimePage, Action |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` | score=16; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=encaissementsauto, facturesauto, paiement, payment, actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | score=16; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=encaissementsauto, facturesauto, paiement, payment, actions:, Action |
| candidate | INFO | MEDIUM | `src/app/(private)/clientsauto/hub/page.tsx` | score=16; manualHref=false; builder=false; actions=true; hrefTemplate=true; runtimeOnly=false; hits=encaissementsauto, facturesauto, paiement, hrefTemplate, actions:, Action |
| candidate | INFO | MEDIUM | `src/app/(private)/vehicules/hub/page.tsx` | score=16; manualHref=false; builder=false; actions=true; hrefTemplate=true; runtimeOnly=false; hits=encaissementsauto, facturesauto, paiement, hrefTemplate, actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts` | score=15; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=encaissementsauto, facturesauto, paiement, actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/clientsauto/clientsauto.module.ts` | score=15; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=encaissementsauto, facturesauto, paiement, actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts` | score=15; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=facturesauto, paiement, payment, actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` | score=15; manualHref=false; builder=false; actions=false; hrefTemplate=false; runtimeOnly=false; hits=Enregistrer un paiement, facturesauto, paiement, actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts` | score=14; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=facturesauto, paiement, actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | score=14; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=facturesauto, paiement, actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | score=13; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=true; hits=runtimeOnly, RuntimeActionEngine, Action |
| candidate | INFO | MEDIUM | `src/runtime/automation-runtime/AutomationRuntimeRules.ts` | score=13; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=paiement, actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | score=13; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=true; hits=runtimeOnly, actions:, Action |
| candidate | INFO | MEDIUM | `src/app/(private)/produitsauto/hub/page.tsx` | score=13; manualHref=false; builder=false; actions=true; hrefTemplate=true; runtimeOnly=false; hits=hrefTemplate, actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/automation-runtime/AutomationRuntimeQueue.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/automation-runtime/AutomationRuntimeTypes.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/cockpit/index.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/hub/RuntimeHubRelationResolver.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/hub/RuntimeHubTypes.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=true; runtimeOnly=false; hits=hrefTemplate, Action |
| candidate | INFO | MEDIUM | `src/runtime/modules/ERPModule.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=true; hits=runtimeOnly, Action |
| candidate | INFO | MEDIUM | `src/runtime/modules/ERPModuleDefinition.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/modules/factory/createBusinessModule.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/registry/modules/ERPRegistryModules.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/registry/types.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/security/policies/ERPPolicy.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/security/policies/ERPPolicyRegistry.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/security-runtime/RuntimeActionGuard.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/status/RuntimeStatusGovernanceEngine.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/status/RuntimeStatusGovernanceTypes.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/runtime/ui/ERPUIComposition.ts` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/components/erp/actions/ERPActionToolbar.tsx` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/components/erp/dashboard/ERPDashboardQuickActions.tsx` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=false; runtimeOnly=false; hits=actions:, Action |
| candidate | INFO | MEDIUM | `src/components/erp/hub/ERPRecordHubSelectedDetails.tsx` | score=12; manualHref=false; builder=false; actions=true; hrefTemplate=true; runtimeOnly=false; hits=hrefTemplate, Action |
| candidate | INFO | MEDIUM | `src/components/erp/billing/InvoicePaymentsHistory.tsx` | score=6; manualHref=false; builder=true; actions=false; hrefTemplate=false; runtimeOnly=false; hits=Ajouter un paiement, encaissementsauto, facturesauto, paiement, payment, Action |
| candidate | INFO | MEDIUM | `src/components/erp/billing/PaymentReceiptActions.tsx` | score=5; manualHref=false; builder=false; actions=false; hrefTemplate=false; runtimeOnly=false; hits=encaissementsauto, facturesauto, paiement, payment, Action |
| candidate | INFO | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` | score=4; manualHref=false; builder=false; actions=false; hrefTemplate=false; runtimeOnly=false; hits=encaissementsauto, facturesauto, paiement, Action |
| candidate | INFO | MEDIUM | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | score=4; manualHref=false; builder=false; actions=false; hrefTemplate=false; runtimeOnly=false; hits=encaissementsauto, facturesauto, paiement, Action |
| factures-module | WARN | HIGH | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | facturesauto module declares or references payment/encaissement action |
| factures-module | INFO | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | facturesauto module has actions metadata |
| runtime-actions | OK | HIGH |  | Runtime action rendering/engine candidates found: src/components/erp/runtime/ERPRuntimePage.tsx, src/runtime/modules/generated/facturesauto/facturesauto.actions.ts, src/runtime/actions/RuntimeActionEngine.ts, src/runtime/security-runtime/RuntimeActionGuard.ts, src/components/erp/actions/ERPActionToolbar.tsx, src/components/erp/dashboard/ERPDashboardQuickActions.tsx, src/components/erp/billing/PaymentReceiptActions.tsx, src/components/erp/billing/InvoiceDocumentActions.tsx |
| manual-href | OK | HIGH |  | No manual encaissementsauto/nouveau href detected in scanned files |

## Recommendation

Do not patch UI blindly. If the remaining button comes from module actions metadata, either remove/hide the duplicate action at metadata level or route it through RuntimeChildCreateHrefBuilder.