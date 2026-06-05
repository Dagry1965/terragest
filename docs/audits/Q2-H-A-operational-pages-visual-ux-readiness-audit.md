# Q2-H-A — Audit readiness UX visuel operational pages

OK: 117
FAIL: 0
MANUAL: 4

## Scope

- /rendezvous
- /interventionsauto
- /facturesauto
- KPI / filters / table / right panel / expanded children
- Readiness avant contrôle visuel utilisateur

## Checks

- [OK] src/components/erp/runtime/ERPRuntimePage.tsx — Runtime page détecte operational.enabled
- [OK] src/components/erp/runtime/ERPRuntimePage.tsx — Runtime page branche la page opérationnelle
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ModulePage contient config?.branding
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ModulePage contient {eyebrow}
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ModulePage contient Aujourd
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ModulePage contient Connect
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ModulePage contient <ERPOperationalKpiStrip
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ModulePage contient <ERPOperationalFilters
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ModulePage contient <ERPOperationalTable
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ModulePage contient <ERPOperationalRightPanel
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ModulePage contient data={filteredData}
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle contient RuntimeOperationalDataResolver
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle contient resolveRelationLabels
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle contient resolveChildTotals
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle contient expandedRows
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table opérationnelle contient ERPOperationalExpandedChildren
- [OK] src/components/erp/operational/ERPOperationalRightPanel.tsx — RightPanel contient panel.metrics
- [OK] src/components/erp/operational/ERPOperationalRightPanel.tsx — RightPanel contient resolveMetricValue
- [OK] src/components/erp/operational/ERPOperationalRightPanel.tsx — RightPanel contient formatMetricValue
- [OK] src/components/erp/operational/ERPOperationalRightPanel.tsx — RightPanel contient metric.type === "count"
- [OK] src/components/erp/operational/ERPOperationalRightPanel.tsx — RightPanel contient metric.type === "countWhere"
- [OK] src/components/erp/operational/ERPOperationalRightPanel.tsx — RightPanel contient metric.type === "sum"
- [OK] src/components/erp/operational/ERPOperationalRightPanel.tsx — RightPanel contient metric.type === "average"
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — ExpandedChildren contient RuntimeOperationalChildrenResolver
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — ExpandedChildren contient resolveExpandedChildren
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — ExpandedChildren contient maxDepth: 2
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — ExpandedChildren contient child.openLabel ?? "Ouvrir"
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — ExpandedChildren contient grandchildrenByParentId
- [OK] src/components/erp/operational/ERPOperationalKpiStrip.tsx — KpiStrip consomme les KPI metadata
- [OK] src/components/erp/operational/ERPOperationalFilters.tsx — Filters consomme les filtres metadata
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous operational.enabled
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous branding metadata
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous kpis metadata
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous filters metadata
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous table metadata
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous rightPanel metadata
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous rightPanel.metrics metadata
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous relationLabelFields metadata
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous table field clientId
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous table field vehiculeId
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous table field dateRendezVous
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous table field heureRendezVous
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous table field typeService
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous table field statut
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous filter statut
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous filter typeService
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous filter clientId
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous rightPanel metric total
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Rendez-vous child interventionsauto
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions operational.enabled
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions branding metadata
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions kpis metadata
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions filters metadata
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions table metadata
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions rightPanel metadata
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions rightPanel.metrics metadata
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions relationLabelFields metadata
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions table field clientId
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions table field vehiculeId
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions table field dateIntervention
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions table field typeIntervention
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions table field kilometrage
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions table field coutTotal
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions table field statut
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions filter statut
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions filter typeIntervention
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions filter clientId
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions rightPanel metric total
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions rightPanel metric en_cours
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions rightPanel metric cout_total
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions child lignesinterventionauto
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Interventions child facturesauto
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures operational.enabled
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures branding metadata
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures kpis metadata
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures filters metadata
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures table metadata
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures rightPanel metadata
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures rightPanel.metrics metadata
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures relationLabelFields metadata
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures table field numeroFacture
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures table field clientId
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures table field vehiculeId
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures table field dateFacture
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures table field montantTTC
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures table field montantPaye
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures table field resteAPayer
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures table field statutPaiement
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures filter statutPaiement
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures filter statutFacture
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures filter clientId
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures rightPanel metric total
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures rightPanel metric montant_ttc
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures rightPanel metric reste_a_payer
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures child encaissementsauto
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Factures child echeancespaiementauto
- [OK] src/runtime/operational/RuntimeOperationalDataResolver.ts — DataResolver contient export class RuntimeOperationalDataResolver
- [OK] src/runtime/operational/RuntimeOperationalDataResolver.ts — DataResolver contient resolveRelationLabels
- [OK] src/runtime/operational/RuntimeOperationalDataResolver.ts — DataResolver contient resolveChildTotals
- [OK] src/runtime/operational/RuntimeOperationalDataResolver.ts — DataResolver contient RuntimeDataBinding.list
- [OK] src/runtime/operational/RuntimeOperationalChildrenResolver.ts — ChildrenResolver contient export class RuntimeOperationalChildrenResolver
- [OK] src/runtime/operational/RuntimeOperationalChildrenResolver.ts — ChildrenResolver contient resolveExpandedChildren
- [OK] src/runtime/operational/RuntimeOperationalChildrenResolver.ts — ChildrenResolver contient RuntimeDataBinding.list
- [OK] src/runtime/operational/RuntimeOperationalChildrenResolver.ts — ChildrenResolver contient maxDepth
- [OK] src/runtime/operational/RuntimeOperationalChildrenResolver.ts — ChildrenResolver contient moduleKey: string
- [OK] src/runtime/operational/RuntimeOperationalChildrenResolver.ts — ChildrenResolver contient parentRecordId?: string
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — src/components/erp/operational/ERPOperationalModulePage.tsx pas de Firestore direct
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — src/components/erp/operational/ERPOperationalTable.tsx pas de Firestore direct
- [OK] src/components/erp/operational/ERPOperationalRightPanel.tsx — src/components/erp/operational/ERPOperationalRightPanel.tsx pas de Firestore direct
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — src/components/erp/operational/ERPOperationalExpandedChildren.tsx pas de Firestore direct
- [OK] src/components/erp/operational/ERPOperationalKpiStrip.tsx — src/components/erp/operational/ERPOperationalKpiStrip.tsx pas de Firestore direct
- [OK] src/components/erp/operational/ERPOperationalFilters.tsx — src/components/erp/operational/ERPOperationalFilters.tsx pas de Firestore direct
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — src/components/erp/operational/ERPOperationalTable.tsx pas de RuntimeDataBinding.list direct
- [OK] src/components/erp/operational/ERPOperationalRightPanel.tsx — src/components/erp/operational/ERPOperationalRightPanel.tsx pas de RuntimeDataBinding.list direct
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — src/components/erp/operational/ERPOperationalExpandedChildren.tsx pas de RuntimeDataBinding.list direct
- [OK] docs/audits/Q2-G-final-operational-ux-runtime-audit.md — Q2-G final audit validé sans FAIL
- [OK] docs/audits/Q2-G-final-operational-ux-runtime-audit.md — Q2-G final audit validé sans FAIL_FINDINGS

## Manual checks à réaliser

- [MANUAL] Vérifier visuellement /rendezvous : KPI, filtres, table, RightPanel, expand interventions.
- [MANUAL] Vérifier visuellement /interventionsauto : kilometrage visible, coût total, statut, expand lignes/factures.
- [MANUAL] Vérifier visuellement /facturesauto : montant payé, reste à payer, statut paiement visibles, expand enfants.
- [MANUAL] Vérifier absence de crash console et lisibilité mobile/desktop.

## Décision

Readiness UX visuel validée. Passer au test manuel des trois pages.
