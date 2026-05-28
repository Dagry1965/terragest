# Q2-D-E — Audit global post-consolidation des pages opérationnelles

OK: 77
FAIL: 0
WARN: 2

## Checks

- [OK] src/components/erp/runtime/ERPRuntimePage.tsx — ERPRuntimePage détecte les pages opérationnelles
- [OK] src/components/erp/runtime/ERPRuntimePage.tsx — ERPRuntimePage branche ERPOperationalModulePage
- [OK] src/runtime/modules/ERPModule.ts — ERPModule contient ERPOperationalModuleConfig
- [OK] src/runtime/modules/ERPModule.ts — ERPCompositionChild supporte openLabel metadata-driven
- [OK] src/runtime/modules/ERPModule.ts — ERPModule contient ERPOperationalChildTotalConfig
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare operational
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous active operational
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare kpis
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare filters
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare table
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare rightPanel
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare relationLabelFields
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous table.fields contient "clientId"
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous table.fields contient "vehiculeId"
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous table.fields contient "dateRendezVous"
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous table.fields contient "heureRendezVous"
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous table.fields contient "typeService"
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous table.fields contient "statut"
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare enfant interventionsauto
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare operational
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto active operational
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare kpis
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare filters
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare table
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare rightPanel
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare relationLabelFields
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "clientId"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "vehiculeId"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "dateIntervention"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "typeIntervention"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "kilometrage"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "coutTotal"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "statut"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare enfant lignesinterventionauto
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare enfant facturesauto
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare operational
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto active operational
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare kpis
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare filters
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare table
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare rightPanel
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare relationLabelFields
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "numeroFacture"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "clientId"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "vehiculeId"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "dateFacture"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "montantTTC"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "montantPaye"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "resteAPayer"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "statutPaiement"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare enfant encaissementsauto
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare enfant echeancespaiementauto
- [OK] src/runtime/operational/RuntimeOperationalDataResolver.ts — RuntimeOperationalDataResolver est présent
- [OK] src/runtime/operational/RuntimeOperationalDataResolver.ts — Resolver expose resolveRelationLabels
- [OK] src/runtime/operational/RuntimeOperationalDataResolver.ts — Resolver expose resolveChildTotals
- [OK] src/runtime/operational/index.ts — src/runtime/operational/index.ts exporte le resolver
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable utilise RuntimeOperationalDataResolver
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable utilise resolveRelationLabels
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable utilise resolveChildTotals
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — ERPOperationalTable ne lit plus RuntimeDataBinding.list directement
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ERPOperationalModulePage consomme module.operational
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — Header opérationnel affiche l’utilisateur connecté
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — Header opérationnel affiche la date du jour
- [OK] src/components/erp/operational/ERPOperationalKpiStrip.tsx — KPI strip consomme les KPI via props
- [OK] src/components/erp/operational/ERPOperationalFilters.tsx — Filters consomme les filtres via props
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand utilise composition.children
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand utilise openLabel metadata-driven
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand ne hardcode plus Ouvrir intervention
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand ne hardcode plus Ouvrir facture
- [OK] src/components/erp/operational/ERPOperationalRightPanel.tsx — RightPanel existe
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — src/components/erp/operational/ERPOperationalModulePage.tsx ne lit pas Firestore directement
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — src/components/erp/operational/ERPOperationalTable.tsx ne lit pas Firestore directement
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — src/components/erp/operational/ERPOperationalExpandedChildren.tsx ne lit pas Firestore directement
- [OK] src/components/erp/operational/ERPOperationalKpiStrip.tsx — src/components/erp/operational/ERPOperationalKpiStrip.tsx ne lit pas Firestore directement
- [OK] src/components/erp/operational/ERPOperationalFilters.tsx — src/components/erp/operational/ERPOperationalFilters.tsx ne lit pas Firestore directement
- [OK] src/components/erp/operational/ERPOperationalRightPanel.tsx — src/components/erp/operational/ERPOperationalRightPanel.tsx ne lit pas Firestore directement
- [OK] src/runtime/operational/RuntimeOperationalDataResolver.ts — src/runtime/operational/RuntimeOperationalDataResolver.ts ne lit pas Firestore directement

## Findings

- [WARN] src/components/erp/operational/ERPOperationalModulePage.tsx — AMARKHYS reste hardcodé dans le header opérationnel ; prévoir tenant/company branding metadata-driven.
- [WARN] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand charge encore ses enfants directement via RuntimeDataBinding.list ; acceptable lazy court terme.

## Décision

Les trois pages opérationnelles sont stables après consolidation du resolver.
