# Q2-D-A — Audit global operational runtime consolidation

OK: 67
FAIL: 0
WARN_FINDINGS: 11

## Checks

- [OK] src/runtime/modules/ERPModule.ts — Contrat ERPOperationalModuleConfig présent
- [OK] src/runtime/modules/ERPModule.ts — Contrat KPI opérationnel présent
- [OK] src/runtime/modules/ERPModule.ts — Contrat filtre opérationnel présent
- [OK] src/runtime/modules/ERPModule.ts — Contrat table opérationnelle présent
- [OK] src/runtime/modules/ERPModule.ts — Contrat childTotals présent
- [OK] src/components/erp/runtime/ERPRuntimePage.tsx — ERPRuntimePage détecte les pages opérationnelles
- [OK] src/components/erp/runtime/ERPRuntimePage.tsx — ERPRuntimePage branche la page opérationnelle générique
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare operational
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous active operational.enabled
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare operational.kpis
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare operational.filters
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare operational.table
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare operational.rightPanel
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous déclare relationLabelFields
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous table.fields contient "clientId"
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous table.fields contient "vehiculeId"
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous table.fields contient "dateRendezVous"
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous table.fields contient "heureRendezVous"
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous table.fields contient "typeService"
- [OK] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — rendezvous table.fields contient "statut"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare operational
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto active operational.enabled
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare operational.kpis
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare operational.filters
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare operational.table
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare operational.rightPanel
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto déclare relationLabelFields
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "clientId"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "vehiculeId"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "dateIntervention"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "typeIntervention"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "kilometrage"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "coutTotal"
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto table.fields contient "statut"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare operational
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto active operational.enabled
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare operational.kpis
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare operational.filters
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare operational.table
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare operational.rightPanel
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare relationLabelFields
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "numeroFacture"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "clientId"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "vehiculeId"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "dateFacture"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "montantTTC"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "montantPaye"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "resteAPayer"
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto table.fields contient "statutPaiement"
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ModulePage consomme module.operational
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ModulePage affiche l'utilisateur connecté
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — ModulePage affiche la date du jour
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table résout les libellés relationnels
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table supporte les totaux enfants
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — Table passe par RuntimeDataBinding pour les lectures auxiliaires
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand charge les enfants via RuntimeDataBinding
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand utilise composition.children
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Expand construit les liens de navigation génériques
- [OK] src/components/erp/operational/ERPOperationalKpiStrip.tsx — KPI strip consomme une configuration KPI opérationnelle via props
- [OK] src/components/erp/operational/ERPOperationalFilters.tsx — Filtres consomment une configuration de filtres opérationnels via props
- [OK] src/components/erp/operational/ERPOperationalRightPanel.tsx — RightPanel existe et consomme la configuration
- [OK] src/components/erp/operational/ERPOperationalModulePage.tsx — src/components/erp/operational/ERPOperationalModulePage.tsx ne lit pas Firestore directement
- [OK] src/components/erp/operational/ERPOperationalTable.tsx — src/components/erp/operational/ERPOperationalTable.tsx ne lit pas Firestore directement
- [OK] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — src/components/erp/operational/ERPOperationalExpandedChildren.tsx ne lit pas Firestore directement
- [OK] src/components/erp/operational/ERPOperationalKpiStrip.tsx — src/components/erp/operational/ERPOperationalKpiStrip.tsx ne lit pas Firestore directement
- [OK] src/components/erp/operational/ERPOperationalFilters.tsx — src/components/erp/operational/ERPOperationalFilters.tsx ne lit pas Firestore directement
- [OK] src/components/erp/operational/ERPOperationalRightPanel.tsx — src/components/erp/operational/ERPOperationalRightPanel.tsx ne lit pas Firestore directement

## Findings

- [WARN] src/components/erp/operational/ERPOperationalModulePage.tsx — Chaîne métier hardcodée détectée: AMARKHYS
- [WARN] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Chaîne métier hardcodée détectée: Ouvrir intervention
- [WARN] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — Chaîne métier hardcodée détectée: Ouvrir facture
- [WARN] src/runtime/modules/generated/rendezvous/rendezvous.module.ts — Chaîne métier hardcodée détectée: AMARKHYS
- [WARN] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Chaîne métier hardcodée détectée: AMARKHYS
- [WARN] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — Chaîne métier hardcodée détectée: Atelier aujourd'hui
- [WARN] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Chaîne métier hardcodée détectée: AMARKHYS
- [WARN] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — Chaîne métier hardcodée détectée: Facturation aujourd'hui
- [WARN] src/components/erp/operational/ERPOperationalTable.tsx — La table effectue plusieurs RuntimeDataBinding.list pour relations/totaux ; prévoir cache/resolver opérationnel.
- [WARN] src/components/erp/operational/ERPOperationalExpandedChildren.tsx — L'expand charge récursivement les enfants ; prévoir batch/cache/lazy resolver pour gros volumes.
- [WARN] src/components/erp/operational/ERPOperationalTable.tsx — Dépendance useMemo basée sur fieldKeys.join ; acceptable court terme, à consolider.

## Décision

Le socle opérationnel est consolidable. Les warnings doivent guider les prochaines passes Q2-D-B/C/D.
