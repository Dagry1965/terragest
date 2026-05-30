# Q2-OP-B9-A Existing expand components audit

Goal: reuse existing expandable/related/amount-aware ERP components for the Client Operational Sheet path.

- OK: 5
- INFO: 30
- WARN: 0
- FAIL: 0
- HIGH FAIL: 0

## Top candidates

| Score | File | Expanded | Related | Amounts | Exports | Hits |
|---:|---|---:|---:|---:|---:|---|
| 38 | `src/runtime/hub/RuntimeClientOperationalHubLoader.ts` | false | true | true | false | relatedRecords, relatedRecordsBySection, line, lignes, montant, amount, total, facture, encaissement, intervention |
| 37 | `src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts` | false | true | true | false | relatedRecords, relatedRecordsBySection, line, lignes, montant, total, facture, encaissement, intervention, strong:relatedRecordsBySection |
| 28 | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | false | false | true | true | line, lignes, montant, amount, total, facture, encaissement, intervention, strong:montant, strong:montantTTC |
| 28 | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | false | false | true | false | line, lignes, montant, amount, total, facture, encaissement, intervention, strong:montant, strong:montantTTC |
| 27 | `src/components/erp/hub/ERPClientOperationalSheet.tsx` | false | true | true | true | children, relatedRecords, relatedRecordsBySection, line, lignes, montant, amount, total, facture, encaissement |
| 27 | `src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts` | false | false | true | true | line, lignes, montant, total, facture, encaissement, intervention, strong:montant, strong:montantTTC, strong:totalTTC |
| 25 | `src/runtime/business-rules/runtimeBusinessRules.ts` | false | false | true | true | montant, total, facture, encaissement, intervention, strong:montant, strong:montantTTC, strong:totalTTC, strong:factures, strong:encaissements |
| 23 | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | false | true | true | true | children, line, lignes, montant, total, facture, intervention, strong:montant, strong:montantTTC, strong:lignesintervention |
| 22 | `src/components/erp/runtime/ERPRuntimeDetails.tsx` | false | false | true | true | line, montant, amount, total, facture, encaissement, strong:montant, strong:montantTTC, strong:factures, strong:encaissements |
| 22 | `src/runtime/modules/generated/clientsauto/clientsauto.module.ts` | false | true | true | true | children, montant, total, facture, encaissement, intervention, strong:montant, strong:montantTTC, strong:factures, strong:encaissements |
| 22 | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | false | true | true | true | children, montant, total, facture, encaissement, intervention, strong:montant, strong:montantTTC, strong:factures, strong:encaissements |
| 21 | `src/components/erp/billing/InvoicePaymentsHistory.tsx` | false | false | true | true | line, montant, total, facture, encaissement, strong:montant, strong:montantTTC, strong:factures, strong:encaissements |
| 21 | `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx` | false | true | true | true | relatedRecords, line, lignes, montant, amount, total, facture, encaissement, intervention, strong:montant |
| 21 | `src/components/erp/runtime/ERPRuntimePage.tsx` | false | true | true | true | children, relatedRecords, montant, facture, encaissement, strong:montant, strong:montantTTC, strong:factures, strong:encaissements |
| 21 | `src/runtime/hub/RuntimeClientOperationalTodayLoader.ts` | false | false | true | false | montant, amount, total, facture, intervention, strong:montant, strong:montantTTC, strong:totalTTC, strong:factures |
| 20 | `src/runtime/dashboard/ERPBusinessMetricsEngine.ts` | false | false | true | false | montant, total, facture, intervention, strong:montant, strong:montantTTC, strong:totalTTC, strong:factures |
| 18 | `src/components/erp/billing/InvoiceDocumentActions.tsx` | false | false | true | true | line, montant, amount, total, facture, intervention, strong:montant, strong:montantTTC, strong:factures |
| 18 | `src/runtime/modules/generated/vehicules/vehicules.module.ts` | false | true | true | true | children, line, montant, total, facture, intervention, strong:montant, strong:montantTTC, strong:factures |
| 17 | `src/components/erp/billing/PaymentReceiptActions.tsx` | false | false | true | true | line, montant, amount, facture, encaissement, strong:montant, strong:factures, strong:encaissements |
| 17 | `src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts` | false | false | true | false | montant, amount, total, facture, intervention, strong:montant, strong:montantTTC, strong:factures |
| 17 | `src/runtime/interventions/RuntimeInterventionTotalsService.ts` | false | false | true | true | line, lignes, montant, total, intervention, strong:montant, strong:montantTTC, strong:lignesintervention |
| 17 | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | false | false | true | true | line, lignes, montant, total, intervention, strong:montant, strong:montantTTC, strong:lignesintervention |
| 16 | `src/components/erp/billing/InvoicePaymentSchedule.tsx` | false | false | true | true | line, montant, total, facture, strong:montant, strong:montantTTC, strong:factures |
| 16 | `src/runtime/modules/definitions/coreModules.ts` | false | false | false | true | lignes, facture, encaissement, intervention, strong:lignesintervention, strong:factures, strong:encaissements |
| 15 | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` | false | false | true | true | montant, facture, encaissement, strong:montant, strong:factures, strong:encaissements |
| 13 | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | false | true | true | true | children, line, lignes, montant, total, strong:montant, strong:montantTTC |
| 12 | `src/runtime/line-items/RuntimeLineItemEngine.ts` | false | false | true | false | line, montant, total, intervention, strong:montant, strong:montantTTC |
| 12 | `src/runtime/modules/factory/businessFields.ts` | false | false | true | true | montant, total, facture, intervention, strong:montant, strong:montantTTC |
| 12 | `src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts` | false | true | true | true | children, line, lignes, montant, strong:montant, strong:montantTTC |
| 11 | `src/components/erp/operational/ERPOperationalTable.tsx` | true | true | true | true | expand, expanded, collapse, children, line, amount, total, strong:expanded |

## Checks

| Area | Status | Severity | File | Message |
|---|---:|---:|---|---|
| candidate | INFO | MEDIUM | `src/runtime/hub/RuntimeClientOperationalHubLoader.ts` | score=38; expanded=false; related=true; amounts=true; exports=false; hits=relatedRecords, relatedRecordsBySection, line, lignes, montant, amount, total, facture, encaissement, intervention, strong:relatedRecordsBySection, strong:montant |
| candidate | INFO | MEDIUM | `src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts` | score=37; expanded=false; related=true; amounts=true; exports=false; hits=relatedRecords, relatedRecordsBySection, line, lignes, montant, total, facture, encaissement, intervention, strong:relatedRecordsBySection, strong:montant, strong:montantTTC |
| candidate | INFO | LOW | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | score=28; expanded=false; related=false; amounts=true; exports=true; hits=line, lignes, montant, amount, total, facture, encaissement, intervention, strong:montant, strong:montantTTC, strong:lignesintervention, strong:factures |
| candidate | INFO | LOW | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | score=28; expanded=false; related=false; amounts=true; exports=false; hits=line, lignes, montant, amount, total, facture, encaissement, intervention, strong:montant, strong:montantTTC, strong:lignesintervention, strong:factures |
| candidate | INFO | MEDIUM | `src/components/erp/hub/ERPClientOperationalSheet.tsx` | score=27; expanded=false; related=true; amounts=true; exports=true; hits=children, relatedRecords, relatedRecordsBySection, line, lignes, montant, amount, total, facture, encaissement, intervention, strong:relatedRecordsBySection |
| candidate | INFO | LOW | `src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts` | score=27; expanded=false; related=false; amounts=true; exports=true; hits=line, lignes, montant, total, facture, encaissement, intervention, strong:montant, strong:montantTTC, strong:totalTTC, strong:factures, strong:encaissements |
| candidate | INFO | LOW | `src/runtime/business-rules/runtimeBusinessRules.ts` | score=25; expanded=false; related=false; amounts=true; exports=true; hits=montant, total, facture, encaissement, intervention, strong:montant, strong:montantTTC, strong:totalTTC, strong:factures, strong:encaissements |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | score=23; expanded=false; related=true; amounts=true; exports=true; hits=children, line, lignes, montant, total, facture, intervention, strong:montant, strong:montantTTC, strong:lignesintervention, strong:factures |
| candidate | INFO | LOW | `src/components/erp/runtime/ERPRuntimeDetails.tsx` | score=22; expanded=false; related=false; amounts=true; exports=true; hits=line, montant, amount, total, facture, encaissement, strong:montant, strong:montantTTC, strong:factures, strong:encaissements |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/clientsauto/clientsauto.module.ts` | score=22; expanded=false; related=true; amounts=true; exports=true; hits=children, montant, total, facture, encaissement, intervention, strong:montant, strong:montantTTC, strong:factures, strong:encaissements |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | score=22; expanded=false; related=true; amounts=true; exports=true; hits=children, montant, total, facture, encaissement, intervention, strong:montant, strong:montantTTC, strong:factures, strong:encaissements |
| candidate | INFO | LOW | `src/components/erp/billing/InvoicePaymentsHistory.tsx` | score=21; expanded=false; related=false; amounts=true; exports=true; hits=line, montant, total, facture, encaissement, strong:montant, strong:montantTTC, strong:factures, strong:encaissements |
| candidate | INFO | MEDIUM | `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx` | score=21; expanded=false; related=true; amounts=true; exports=true; hits=relatedRecords, line, lignes, montant, amount, total, facture, encaissement, intervention, strong:montant, strong:lignesintervention, strong:encaissements |
| candidate | INFO | MEDIUM | `src/components/erp/runtime/ERPRuntimePage.tsx` | score=21; expanded=false; related=true; amounts=true; exports=true; hits=children, relatedRecords, montant, facture, encaissement, strong:montant, strong:montantTTC, strong:factures, strong:encaissements |
| candidate | INFO | LOW | `src/runtime/hub/RuntimeClientOperationalTodayLoader.ts` | score=21; expanded=false; related=false; amounts=true; exports=false; hits=montant, amount, total, facture, intervention, strong:montant, strong:montantTTC, strong:totalTTC, strong:factures |
| candidate | INFO | LOW | `src/runtime/dashboard/ERPBusinessMetricsEngine.ts` | score=20; expanded=false; related=false; amounts=true; exports=false; hits=montant, total, facture, intervention, strong:montant, strong:montantTTC, strong:totalTTC, strong:factures |
| candidate | INFO | LOW | `src/components/erp/billing/InvoiceDocumentActions.tsx` | score=18; expanded=false; related=false; amounts=true; exports=true; hits=line, montant, amount, total, facture, intervention, strong:montant, strong:montantTTC, strong:factures |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/vehicules/vehicules.module.ts` | score=18; expanded=false; related=true; amounts=true; exports=true; hits=children, line, montant, total, facture, intervention, strong:montant, strong:montantTTC, strong:factures |
| candidate | INFO | LOW | `src/components/erp/billing/PaymentReceiptActions.tsx` | score=17; expanded=false; related=false; amounts=true; exports=true; hits=line, montant, amount, facture, encaissement, strong:montant, strong:factures, strong:encaissements |
| candidate | INFO | LOW | `src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts` | score=17; expanded=false; related=false; amounts=true; exports=false; hits=montant, amount, total, facture, intervention, strong:montant, strong:montantTTC, strong:factures |
| candidate | INFO | LOW | `src/runtime/interventions/RuntimeInterventionTotalsService.ts` | score=17; expanded=false; related=false; amounts=true; exports=true; hits=line, lignes, montant, total, intervention, strong:montant, strong:montantTTC, strong:lignesintervention |
| candidate | INFO | LOW | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | score=17; expanded=false; related=false; amounts=true; exports=true; hits=line, lignes, montant, total, intervention, strong:montant, strong:montantTTC, strong:lignesintervention |
| candidate | INFO | LOW | `src/components/erp/billing/InvoicePaymentSchedule.tsx` | score=16; expanded=false; related=false; amounts=true; exports=true; hits=line, montant, total, facture, strong:montant, strong:montantTTC, strong:factures |
| candidate | INFO | LOW | `src/runtime/modules/definitions/coreModules.ts` | score=16; expanded=false; related=false; amounts=false; exports=true; hits=lignes, facture, encaissement, intervention, strong:lignesintervention, strong:factures, strong:encaissements |
| candidate | INFO | LOW | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` | score=15; expanded=false; related=false; amounts=true; exports=true; hits=montant, facture, encaissement, strong:montant, strong:factures, strong:encaissements |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | score=13; expanded=false; related=true; amounts=true; exports=true; hits=children, line, lignes, montant, total, strong:montant, strong:montantTTC |
| candidate | INFO | LOW | `src/runtime/line-items/RuntimeLineItemEngine.ts` | score=12; expanded=false; related=false; amounts=true; exports=false; hits=line, montant, total, intervention, strong:montant, strong:montantTTC |
| candidate | INFO | LOW | `src/runtime/modules/factory/businessFields.ts` | score=12; expanded=false; related=false; amounts=true; exports=true; hits=montant, total, facture, intervention, strong:montant, strong:montantTTC |
| candidate | INFO | MEDIUM | `src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts` | score=12; expanded=false; related=true; amounts=true; exports=true; hits=children, line, lignes, montant, strong:montant, strong:montantTTC |
| candidate | INFO | HIGH | `src/components/erp/operational/ERPOperationalTable.tsx` | score=11; expanded=true; related=true; amounts=true; exports=true; hits=expand, expanded, collapse, children, line, amount, total, strong:expanded |
| recommendation | OK | HIGH | `src/components/erp/operational/ERPOperationalTable.tsx` | Best reusable expand candidate detected: src/components/erp/operational/ERPOperationalTable.tsx |
| known-path | OK | MEDIUM | `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx` | src/components/erp/runtime/ERPRelatedRecordsPanel.tsx exists |
| known-path | OK | MEDIUM | `src/components/erp/hub/ERPRecordHubSelectedDetails.tsx` | src/components/erp/hub/ERPRecordHubSelectedDetails.tsx exists |
| known-path | OK | MEDIUM | `src/components/erp/operational/ERPOperationalTable.tsx` | src/components/erp/operational/ERPOperationalTable.tsx exists |
| known-path | OK | MEDIUM | `src/runtime/line-items` | src/runtime/line-items exists |

## Recommendation

Reuse or adapt `src/components/erp/operational/ERPOperationalTable.tsx` for the central path Client -> Vehicle -> RDV -> Intervention -> Lines -> Invoice -> Payments.