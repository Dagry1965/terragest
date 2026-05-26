# Q22E-9L-B2 — RDV → intervention extraction audit

## Objectif

Identifier tous les usages de la logique RDV → intervention avant extraction hors `RuntimeSchedulingEngine`.

## Doctrine

Le scheduling engine calcule des disponibilités, slots, conflits, buffers et capacités. Il ne construit pas d'intervention métier.

## Résumé

- Findings : 97

## Findings

| Cible | Fichier | Ligne | Extrait |
|---|---|---:|---|
| buildInterventionFromRendezvous | `src/runtime/business-rules/runtimeBusinessRules.ts` | 370 | `buildInterventionFromRendezvousRecord(` |
| buildInterventionFromRendezvous | `src/runtime/business-rules/runtimeBusinessRules.ts` | 532 | `buildInterventionFromRendezvousRecord(` |
| buildInterventionFromRendezvous | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1803 | `function buildInterventionFromRendezvousRecord(` |
| consumedByInterventionId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 343 | `if (effectiveRendezvous.consumedByInterventionId) {` |
| consumedByInterventionId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 413 | `consumedByInterventionId:` |
| consumedByInterventionId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 505 | `if (effectiveRendezvous.consumedByInterventionId) {` |
| consumedByInterventionId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 575 | `consumedByInterventionId:` |
| typeIntervention | `src/runtime/business-rules/runtimeBusinessRules.ts` | 141 | `payload.typeIntervention ===` |
| typeIntervention | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1810 | `typeIntervention: {` |
| rendezVousId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1809 | `rendezVousId: "id",` |
| dateIntervention | `src/runtime/business-rules/runtimeBusinessRules.ts` | 772 | `intervention.dateIntervention ??` |
| dateIntervention | `src/runtime/business-rules/runtimeBusinessRules.ts` | 774 | `payload.dateIntervention ??` |
| dateIntervention | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1814 | `dateIntervention: "dateRendezVous",` |
| typeIntervention | `src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts` | 291 | `labelField: "typeIntervention",` |
| dateIntervention | `src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts` | 292 | `dateField: "dateIntervention",` |
| typeIntervention | `src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts` | 362 | `record.typeIntervention ??` |
| rendezVousId | `src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts` | 376 | `const appointmentLabel = await resolveRelationLabel("rendezvous", record.rendezVousId);` |
| rendezVousId | `src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts` | 396 | `relationFragment("RDV", appointmentLabel, record.rendezVousId),` |
| dateIntervention | `src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts` | 388 | `formatDate(record.dateIntervention) \|\|` |
| rendezVousId | `src/runtime/guards/RuntimeChronologyGuard.ts` | 133 | `const rendezVousId =` |
| rendezVousId | `src/runtime/guards/RuntimeChronologyGuard.ts` | 134 | `asString(record.rendezVousId);` |
| rendezVousId | `src/runtime/guards/RuntimeChronologyGuard.ts` | 136 | `if (!rendezVousId) {` |
| rendezVousId | `src/runtime/guards/RuntimeChronologyGuard.ts` | 143 | `rendezVousId` |
| rendezVousId | `src/runtime/guards/RuntimeChronologyGuard.ts` | 275 | `["dateIntervention", "rendezVousId"]` |
| dateIntervention | `src/runtime/guards/RuntimeChronologyGuard.ts` | 150 | `const dateIntervention =` |
| dateIntervention | `src/runtime/guards/RuntimeChronologyGuard.ts` | 151 | `asDateOnly(record.dateIntervention);` |
| dateIntervention | `src/runtime/guards/RuntimeChronologyGuard.ts` | 157 | `dateIntervention &&` |
| dateIntervention | `src/runtime/guards/RuntimeChronologyGuard.ts` | 159 | `compareDateOnly(dateIntervention, dateRendezVous) < 0` |
| dateIntervention | `src/runtime/guards/RuntimeChronologyGuard.ts` | 190 | `const dateIntervention =` |
| dateIntervention | `src/runtime/guards/RuntimeChronologyGuard.ts` | 191 | `asDateOnly(intervention.dateIntervention);` |
| dateIntervention | `src/runtime/guards/RuntimeChronologyGuard.ts` | 195 | `dateIntervention &&` |
| dateIntervention | `src/runtime/guards/RuntimeChronologyGuard.ts` | 196 | `compareDateOnly(dateFacture, dateIntervention) < 0` |
| dateIntervention | `src/runtime/guards/RuntimeChronologyGuard.ts` | 275 | `["dateIntervention", "rendezVousId"]` |
| dateIntervention | `src/runtime/modules/factory/businessFields.ts` | 429 | `{ key: "dateIntervention", label: "Date intervention", type: "date" },` |
| typeIntervention | `src/runtime/modules/generated/clientsauto/clientsauto.module.ts` | 312 | `labelFields: ["dateIntervention", "typeIntervention", "statut"],` |
| typeIntervention | `src/runtime/modules/generated/clientsauto/clientsauto.module.ts` | 354 | `labelFields: ["dateIntervention", "typeIntervention", "statut"],` |
| rendezVousId | `src/runtime/modules/generated/clientsauto/clientsauto.module.ts` | 313 | `subtitleFields: ["vehiculeId", "rendezVousId"],` |
| rendezVousId | `src/runtime/modules/generated/clientsauto/clientsauto.module.ts` | 322 | `field: "rendezVousId",` |
| dateIntervention | `src/runtime/modules/generated/clientsauto/clientsauto.module.ts` | 312 | `labelFields: ["dateIntervention", "typeIntervention", "statut"],` |
| dateIntervention | `src/runtime/modules/generated/clientsauto/clientsauto.module.ts` | 354 | `labelFields: ["dateIntervention", "typeIntervention", "statut"],` |
| typeIntervention | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 371 | `"typeIntervention",` |
| dateIntervention | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 372 | `"dateIntervention",` |
| typeIntervention | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 69 | `key: "typeIntervention",` |
| typeIntervention | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 157 | `"typeIntervention",` |
| typeIntervention | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 171 | `"typeIntervention",` |
| typeIntervention | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 266 | `"typeIntervention",` |
| rendezVousId | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 52 | `key: "rendezVousId",` |
| rendezVousId | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 155 | `"rendezVousId",` |
| rendezVousId | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 169 | `"rendezVousId",` |
| rendezVousId | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 251 | `relationField: "rendezVousId",` |
| rendezVousId | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 290 | `field: "rendezVousId",` |
| rendezVousId | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 336 | `field: "rendezVousId",` |
| rendezVousId | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 358 | `"rendezVousId",` |
| dateIntervention | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 61 | `key: "dateIntervention",` |
| dateIntervention | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 156 | `"dateIntervention",` |
| dateIntervention | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 170 | `"dateIntervention",` |
| dateIntervention | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 265 | `"dateIntervention",` |
| dateIntervention | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 365 | `"dateIntervention",` |
| typeIntervention | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 321 | `"typeIntervention",` |
| typeIntervention | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 372 | `"typeIntervention",` |
| typeIntervention | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 384 | `"typeIntervention",` |
| typeIntervention | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 392 | `"typeIntervention",` |
| rendezVousId | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 390 | `"rendezVousId",` |
| dateIntervention | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 322 | `"dateIntervention",` |
| dateIntervention | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 371 | `"dateIntervention",` |
| dateIntervention | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 383 | `"dateIntervention",` |
| dateIntervention | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 391 | `"dateIntervention",` |
| consumedByInterventionId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 97 | `key: "consumedByInterventionId",` |
| typeIntervention | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 275 | `labelFields: ["dateIntervention", "typeIntervention", "statut"],` |
| rendezVousId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 261 | `foreignKey: "rendezVousId",` |
| rendezVousId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 270 | `rendezVousId: "id",` |
| rendezVousId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 274 | `lockFields: ["rendezVousId", "clientId", "vehiculeId"],` |
| dateIntervention | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 275 | `labelFields: ["dateIntervention", "typeIntervention", "statut"],` |
| typeIntervention | `src/runtime/modules/generated/vehicules/vehicules.module.ts` | 474 | `labelFields: ["dateIntervention", "typeIntervention", "statut"],` |
| dateIntervention | `src/runtime/modules/generated/vehicules/vehicules.module.ts` | 474 | `labelFields: ["dateIntervention", "typeIntervention", "statut"],` |
| typeIntervention | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | 595 | `statusLabel(value("typeIntervention")) \|\| value("designation") \|\| "Intervention",` |
| typeIntervention | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | 814 | `const typeIntervention =` |
| typeIntervention | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | 815 | `value("typeIntervention");` |
| typeIntervention | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | 820 | `if (typeIntervention) {` |
| typeIntervention | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | 821 | `return compact(typeIntervention, dateIntervention);` |
| dateIntervention | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | 580 | `value("dateIntervention");` |
| dateIntervention | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | 596 | `value("dateIntervention") ? dateLabel(value("dateIntervention")) : "",` |
| dateIntervention | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | 596 | `value("dateIntervention") ? dateLabel(value("dateIntervention")) : "",` |
| dateIntervention | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | 817 | `const dateIntervention =` |
| dateIntervention | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | 818 | `value("dateIntervention");` |
| dateIntervention | `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts` | 821 | `return compact(typeIntervention, dateIntervention);` |
| consumedByInterventionId | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 746 | `if (asString(rendezvous.consumedByInterventionId)) {` |
| typeIntervention | `src/components/erp/billing/InvoiceDocumentActions.tsx` | 266 | `value(intervention, "typeIntervention"),` |
| dateIntervention | `src/components/erp/billing/InvoiceDocumentActions.tsx` | 267 | `value(intervention, "dateIntervention"),` |
| typeIntervention | `src/components/erp/context/ERPContextBanner.tsx` | 189 | `"typeIntervention",` |
| rendezVousId | `src/components/erp/context/ERPContextBanner.tsx` | 80 | `rendezVousId: "Rendez-vous",` |
| dateIntervention | `src/components/erp/context/ERPContextBanner.tsx` | 190 | `"dateIntervention",` |
| dateIntervention | `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx` | 209 | `record.dateIntervention,` |
| dateIntervention | `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx` | 232 | `record.dateIntervention,` |
| typeIntervention | `src/app/facture/[token]/details/page.tsx` | 475 | `{value(intervention, "typeIntervention", "Intervention")}` |
| typeIntervention | `src/app/facture/[token]/page.tsx` | 207 | `value(intervention, "typeIntervention"),` |
| dateIntervention | `src/app/facture/[token]/page.tsx` | 208 | `value(intervention, "dateIntervention"),` |

## Décision attendue

- Ce qui reste dans BusinessRule.
- Ce qui devient mapping metadata.
- Ce qui est supprimé du SchedulingEngine.