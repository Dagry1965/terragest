# TERRAGEST ERP RUNTIME CONSISTENCY AUDIT

Date : 2026-05-12 15:58:00

# MODULE NORMALIZATION

- Normalized modules : 12
- Legacy modules : 2

# RELATION SYSTEM

- Structured relations : 9
- Legacy relations : 0

# DUPLICATION


## Old CRUD patterns

```txt
```

## Manual fetch logic

```txt
C:\Users\Admin\terragest\src\analytics\repositories\AnalyticsRepository.ts:17 collection(
C:\Users\Admin\terragest\src\analytics\repositories\AnalyticsRepository.ts:38 collection(
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:18 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\components\dashboard\RealtimeKpiCard.tsx:22 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:27 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:38 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:56 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:67 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:85 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:96 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:114 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:125 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:143 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:154 collection(
C:\Users\Admin\terragest\src\features\audit\services\AuditService.ts:18 collection(db, "audit_logs"),
C:\Users\Admin\terragest\src\features\audit\services\AuditService.ts:28 collection(db, "audit_logs"),
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:37 collection(
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:57 collection(
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:125 collection(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationRepository.ts:20 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationRepository.ts:30 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:34 collection(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:120 collection(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:28 collection(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:40 collection(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:36 collection(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:85 collection(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:28 collection(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:40 collection(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:28 collection(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:40 collection(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:28 collection(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:40 collection(
C:\Users\Admin\terragest\src\features\mouvements\repositories\MouvementRepository.ts:21 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\mouvements\repositories\MouvementRepository.ts:31 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:22 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:38 collection(
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:26 collection(
C:\Users\Admin\terragest\src\features\organisations\repositories\OrganisationRepository.ts:18 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\organisations\repositories\OrganisationRepository.ts:26 collection(db, COLLECTION_NAME)
C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts:17 collection(
C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts:29 collection(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:28 collection(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:40 collection(
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:23 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:33 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:22 collection(
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:81 collection(
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:37 collection(
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:52 collection(
C:\Users\Admin\terragest\src\features\superadmin\services\SuperAdminService.ts:20 collection(
C:\Users\Admin\terragest\src\features\superadmin\services\SuperAdminService.ts:27 collection(
C:\Users\Admin\terragest\src\features\superadmin\services\SuperAdminService.ts:34 collection(
C:\Users\Admin\terragest\src\features\superadmin\services\SuperAdminService.ts:41 collection(
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:20 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:30 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:22 collection(
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:81 collection(
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:42 collection(
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:56 q = collection(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:38 collection(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:52 collection(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:123 collection(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:24 collection(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:90 collection(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:109 collection(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:22 collection(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:21 collection(runtimeFirestore, module.schema.collection)
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:53 collection(runtimeFirestore, module.schema.collection),
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:23 collection(db, "audit_logs"),
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:23 collection(db, "notifications"),
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:33 collection(
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:36 collection(
C:\Users\Admin\terragest\src\runtime\notifications\RuntimeNotificationEngine.ts:32 collection(
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:36 collection(
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:29 collection(
C:\Users\Admin\terragest\src\runtime\persistence\analytics\AnalyticsRepository.ts:17 collection(
C:\Users\Admin\terragest\src\runtime\persistence\audit\AuditRepository.ts:17 collection(
C:\Users\Admin\terragest\src\runtime\persistence\events\RuntimeEventRepository.ts:19 collection(
C:\Users\Admin\terragest\src\runtime\persistence\events\RuntimeEventRepository.ts:35 collection(
C:\Users\Admin\terragest\src\runtime\persistence\processes\ProcessRepository.ts:17 collection(
C:\Users\Admin\terragest\src\runtime\persistence\projections\ProjectionRepository.ts:17 collection(
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:17 collection(
C:\Users\Admin\terragest\src\runtime\resilience\dlq\DeadLetterQueue.ts:25 collection(
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:27 collection(
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:28 collection(
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:30 collection(
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:42 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\subscribeToAlertes.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\subscribeToClients.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\subscribeToContrats.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\subscribeToExploitations.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\subscribeToFactures.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\subscribeToFournisseurs.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\subscribeToInterventions.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\subscribeToMaintenance.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\subscribeToMateriels.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\subscribeToMobile.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\subscribeToMouvementsStock.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\subscribeToPaiements.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\subscribeToProductions.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\subscribeToRecoltes.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\subscribeToSync.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\subscribeToTerrains.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\subscribeToUtilisateurs.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:23 collection(
```

## Legacy forms

```txt
C:\Users\Admin\terragest\src\components\erp\forms\ERPFormRenderer.tsx:13 <form className="space-y-5">
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:242 <form
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:17 <form className="grid gap-5 md:grid-cols-2">
C:\Users\Admin\terragest\src\components\ui\EnterpriseForm.tsx:20 <form
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:164 <form
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationForm.tsx:85 <form
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:48 <form
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:119 <form onSubmit={handleSubmit} className="space-y-6">
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:31 <form
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursForm.tsx:31 <form
```

## Legacy relation format

```txt
```

# RUNTIME ENGINES


## ERP runtime engines

```txt
C:\Users\Admin\terragest\src\analytics\aggregation\AggregationService.ts:8 runtimeHealth: "healthy",
C:\Users\Admin\terragest\src\analytics\services\AggregationService.ts:9 runtimeHealth: "healthy",
C:\Users\Admin\terragest\src\app\layout.tsx:6 RuntimeBootstrapProvider
C:\Users\Admin\terragest\src\app\layout.tsx:8 from "@/components/bootstrap/RuntimeBootstrapProvider";
C:\Users\Admin\terragest\src\app\layout.tsx:25 <RuntimeBootstrapProvider>
C:\Users\Admin\terragest\src\app\layout.tsx:29 </RuntimeBootstrapProvider>
C:\Users\Admin\terragest\src\app\(private)\achats\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\achats\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\automation\page.tsx:2 ERPRuntimeAutomationDashboard,
C:\Users\Admin\terragest\src\app\(private)\automation\page.tsx:8 <ERPRuntimeAutomationDashboard />
C:\Users\Admin\terragest\src\app\(private)\clients\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\clients\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\commandes\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\commandes\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\compliance\page.tsx:1 import { ERPComplianceChecker } from "@/runtime/compliance/ERPComplianceChecker";
C:\Users\Admin\terragest\src\app\(private)\compliance\page.tsx:2 import { ERPModuleRegistry } from "@/runtime/modules/ERPModuleRegistry";
C:\Users\Admin\terragest\src\app\(private)\compliance\page.tsx:3 import { registerCoreERPModules } from "@/runtime/modules/registerCoreERPModules";
C:\Users\Admin\terragest\src\app\(private)\contrats\page.tsx:9 description="Page raccordee au template ERP enterprise centralise pour stabiliser le build et preparer la convergence runtime."
C:\Users\Admin\terragest\src\app\(private)\dashboard\page.tsx:6 import { EnterpriseRuntimeConsolidationPanel } from "@/components/erp/enterprise-runtime";
C:\Users\Admin\terragest\src\app\(private)\dashboard\page.tsx:41 <ERPBadge tone="success">Runtime protege</ERPBadge>
C:\Users\Admin\terragest\src\app\(private)\dashboard\page.tsx:49 Vue globale du runtime, de la consolidation enterprise et de la readiness production.
C:\Users\Admin\terragest\src\app\(private)\dashboard\page.tsx:63 <EnterpriseRuntimeConsolidationPanel />
C:\Users\Admin\terragest\src\app\(private)\depenses\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\depenses\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\devis\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\devis\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\employes\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\employes\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\exploitations\page.tsx:9 description="Page raccordee au template ERP enterprise centralise pour stabiliser le build et preparer la convergence runtime."
C:\Users\Admin\terragest\src\app\(private)\exploitations\details\page.tsx:126 Runtime exploitation
C:\Users\Admin\terragest\src\app\(private)\factures\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\factures\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\page.tsx:2 import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\page.tsx:3 import type { ERPModule } from "@/runtime/modules/ERPModule";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\nouveau\page.tsx:2 import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\nouveau\page.tsx:3 import type { ERPModule } from "@/runtime/modules/ERPModule";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\page.tsx:2 import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\page.tsx:3 import type { ERPModule } from "@/runtime/modules/ERPModule";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\edit\page.tsx:2 import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\edit\page.tsx:3 import type { ERPModule } from "@/runtime/modules/ERPModule";
C:\Users\Admin\terragest\src\app\(private)\incidents\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\incidents\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\interventions\page.tsx:9 description="Page raccordee au template ERP enterprise centralise pour stabiliser le build et preparer la convergence runtime."
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:28 description="Le runtime ERP a enregistré une anomalie."
C:\Users\Admin\terragest\src\app\(private)\intrants\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\intrants\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\livraisons\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\livraisons\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\maintenance\page.tsx:9 description="Page raccordee au template ERP enterprise centralise pour stabiliser le build et preparer la convergence runtime."
C:\Users\Admin\terragest\src\app\(private)\materiels\page.tsx:9 description="Page raccordee au template ERP enterprise centralise pour stabiliser le build et preparer la convergence runtime."
C:\Users\Admin\terragest\src\app\(private)\observability\page.tsx:2 ERPRuntimeObservabilityDashboard,
C:\Users\Admin\terragest\src\app\(private)\observability\page.tsx:8 <ERPRuntimeObservabilityDashboard />
C:\Users\Admin\terragest\src\app\(private)\operations\page.tsx:90 Supervision runtime ERP
C:\Users\Admin\terragest\src\app\(private)\paiements\page.tsx:9 description="Page raccordee au template ERP enterprise centralise pour stabiliser le build et preparer la convergence runtime."
C:\Users\Admin\terragest\src\app\(private)\parcelles\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\parcelles\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\realtime\page.tsx:1 import { ERPRuntimeRealtimeDashboard } from "@/components/erp/realtime";
C:\Users\Admin\terragest\src\app\(private)\realtime\page.tsx:4 return <ERPRuntimeRealtimeDashboard />;
C:\Users\Admin\terragest\src\app\(private)\recettes\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recettes\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recoltes\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recoltes\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\resilience\page.tsx:1 import { ERPRuntimeResilienceDashboard } from "@/components/erp/resilience";
C:\Users\Admin\terragest\src\app\(private)\resilience\page.tsx:4 return <ERPRuntimeResilienceDashboard />;
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:1 import { ERPModuleRegistry } from "@/runtime/modules/ERPModuleRegistry";
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:2 import { registerCoreERPModules } from "@/runtime/modules/registerCoreERPModules";
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:3 import { ERPModuleListRenderer } from "@/runtime/modules/renderer/ERPModuleListRenderer";
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:11 export default async function RuntimeModulePage({ params }: Props) {
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:16 const runtimeModule = ERPModuleRegistry.get(module);
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:18 if (!runtimeModule) {
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:22 Module runtime introuvable
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:34 <ERPModuleListRenderer module={runtimeModule} />
C:\Users\Admin\terragest\src\app\(private)\runtime-cockpit\page.tsx:1 import { ERPRuntimeCockpitDashboard } from "@/components/erp/cockpit";
C:\Users\Admin\terragest\src\app\(private)\runtime-cockpit\page.tsx:4 return <ERPRuntimeCockpitDashboard />;
C:\Users\Admin\terragest\src\app\(private)\runtime-registry\page.tsx:2 ERPRuntimeRegistryDashboard,
C:\Users\Admin\terragest\src\app\(private)\runtime-registry\page.tsx:3 } from "@/components/erp/runtime-ui";
C:\Users\Admin\terragest\src\app\(private)\runtime-registry\page.tsx:8 <ERPRuntimeRegistryDashboard />
C:\Users\Admin\terragest\src\app\(private)\runtime-supervision\page.tsx:2 RuntimeSupervisionDashboard,
C:\Users\Admin\terragest\src\app\(private)\runtime-supervision\page.tsx:4 from "@/features/runtime-supervision/RuntimeSupervisionDashboard";
C:\Users\Admin\terragest\src\app\(private)\runtime-supervision\page.tsx:6 export default function RuntimeSupervisionPage() {
C:\Users\Admin\terragest\src\app\(private)\runtime-supervision\page.tsx:9 <RuntimeSupervisionDashboard />
C:\Users\Admin\terragest\src\app\(private)\stocks\page.tsx:9 description="Page raccordee au template ERP enterprise centralise pour stabiliser le build et preparer la convergence runtime."
C:\Users\Admin\terragest\src\app\(private)\taches\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\taches\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\vehicules\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\vehicules\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\workflows-runtime\page.tsx:1 import { ERPRuntimeWorkflowDashboard } from "@/components/erp/workflows";
C:\Users\Admin\terragest\src\app\(private)\workflows-runtime\page.tsx:4 return <ERPRuntimeWorkflowDashboard />;
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:1 // src/components/bootstrap/RuntimeBootstrapProvider.tsx
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:12 import { RuntimeBootstrap }
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:13 from "@/platform/runtime/RuntimeBootstrap";
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:15 interface RuntimeBootstrapProviderProps {
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:21 export function RuntimeBootstrapProvider({
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:24 }: RuntimeBootstrapProviderProps) {
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:33 await RuntimeBootstrap
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:55 Chargement runtime ERP...
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:14 import { ModuleRuntime }
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:15 from "@/platform/modules/runtime/ModuleRuntime";
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:35 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\components\erp\actions\ERPActionButton.tsx:5 import type { ERPAction } from "@/runtime/actions";
C:\Users\Admin\terragest\src\components\erp\actions\ERPActionButton.tsx:6 import { ERPActionExecutor } from "@/runtime/actions/ERPActionExecutor";
C:\Users\Admin\terragest\src\components\erp\actions\ERPActionToolbar.tsx:1 import type { ERPAction } from "@/runtime/actions";
C:\Users\Admin\terragest\src\components\erp\actions\ERPActionToolbar.tsx:2 import { RuntimeActionGuard } from "@/runtime/security-runtime";
C:\Users\Admin\terragest\src\components\erp\actions\ERPActionToolbar.tsx:12 const allowedActions = RuntimeActionGuard.filter(actions);
C:\Users\Admin\terragest\src\components\erp\actions\ERPRowActions.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\actions\ERPRowActions.tsx:2 import { ERPActionRegistry } from "@/runtime/actions";
C:\Users\Admin\terragest\src\components\erp\actions\ERPRowActions.tsx:3 import { RuntimeActionGuard } from "@/runtime/security-runtime";
C:\Users\Admin\terragest\src\components\erp\actions\ERPRowActions.tsx:16 RuntimeActionGuard.filter(
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIAnomaliesPanel.tsx:2 import type { getERPAISnapshot } from "@/runtime/ai";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIAnomaliesPanel.tsx:20 Detection des signaux runtime inhabituels.
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:2 import { getERPAISnapshot } from "@/runtime/ai";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:17 title="Enterprise AI Runtime Layer"
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:18 description="Insights, recommandations, detection d'anomalies et recherche semantique runtime."
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIInsightsPanel.tsx:2 import type { getERPAISnapshot } from "@/runtime/ai";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIInsightsPanel.tsx:20 Analyse intelligente du runtime ERP.
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIMetricsGrid.tsx:2 import type { getERPAISnapshot } from "@/runtime/ai";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIMetricsGrid.tsx:15 <ERPStatCard label="Insights" value={snapshot.metrics.insights} helper="Runtime intelligence" />
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIRecommendationsPanel.tsx:2 import type { getERPAISnapshot } from "@/runtime/ai";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAISearchPanel.tsx:2 import type { getERPAISnapshot } from "@/runtime/ai";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAISearchPanel.tsx:17 Semantic Runtime Search
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:16 label: "Synchronisation runtime effectuée",
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimelinePanel.tsx:3 } from "@/runtime/automation";
C:\Users\Admin\terragest\src\components\erp\automation\ERPNotificationsPanel.tsx:3 } from "@/runtime/automation";
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:7 seedERPRuntimeAutomation,
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:8 } from "@/runtime/automation";
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:18 seedERPRuntimeAutomation();
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:20 export function ERPRuntimeAutomationDashboard() {
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:27 title="Automation Runtime Engine"
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:28 description="Execution des automations, hooks runtime et notifications ERP."
C:\Users\Admin\terragest\src\components\erp\automation\index.ts:5 export * from "./ERPRuntimeAutomationDashboard";
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:5 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:7 AutomationRuntimeEngine,
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:8 AutomationRuntimeQueue,
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:9 AutomationRuntimeRegistry,
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:10 type AutomationRuntimeJob,
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:11 } from "@/runtime/automation-runtime";
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:13 interface ERPAutomationRuntimePanelProps {
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:17 export function ERPAutomationRuntimePanel({
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:19 }: ERPAutomationRuntimePanelProps) {
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:20 const rules = AutomationRuntimeRegistry.forModule(module.metadata.key);
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:23 useState<AutomationRuntimeJob[]>(AutomationRuntimeQueue.all());
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:26 AutomationRuntimeEngine.evaluate(module.metadata.key, {
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:32 setJobs([...AutomationRuntimeQueue.all()]);
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:36 await AutomationRuntimeEngine.runPending();
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:37 setJobs([...AutomationRuntimeQueue.all()]);
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:45 Automation runtime
C:\Users\Admin\terragest\src\components\erp\automation-runtime\index.ts:1 export { ERPAutomationRuntimePanel } from "./ERPAutomationRuntimePanel";
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitHealthPanel.tsx:2 import type { getERPCockpitSnapshot } from "@/runtime/cockpit";
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitHealthPanel.tsx:47 Controle minimal de coherence du runtime.
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitMetricGrid.tsx:2 import type { getERPCockpitSnapshot } from "@/runtime/cockpit";
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitMetricGrid.tsx:15 <ERPStatCard label="Modules" value={snapshot.modulesCount} helper="Modules runtime" />
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:2 import type { getERPCockpitSnapshot } from "@/runtime/cockpit";
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:20 Controle de couverture runtime par module.
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx:2 import type { getERPCockpitSnapshot } from "@/runtime/cockpit";
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx:40 Flux runtime
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpit.tsx:8 export function ERPRuntimeCockpit() {
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpit.tsx:13 title="Supervision runtime"
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpit.tsx:26 title="Cockpit runtime pret"
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpit.tsx:27 description="Connecter les flux runtime reels."
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpitDashboard.tsx:2 import { getERPCockpitSnapshot } from "@/runtime/cockpit";
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpitDashboard.tsx:9 export function ERPRuntimeCockpitDashboard() {
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpitDashboard.tsx:16 title="Cockpit runtime Terragest"
C:\Users\Admin\terragest\src\components\erp\cockpit\index.ts:5 export * from "./ERPRuntimeCockpitDashboard";
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:18 getRuntimeTimeline,
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:19 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:25 const runtime =
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:26 getRuntimeTimeline();
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:44 runtime.filter(
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:50 runtime.filter(
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:56 runtime.filter(
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:62 runtime.filter(
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:93 Supervision Runtime ERP
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:97 Observability, supervision, runtime timeline,
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:105 Runtime Events
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:135 Runtime Failures
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:742 Runtime Timeline
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:747 {runtime.length === 0 && (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:749 Aucun événement runtime ERP.
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:753 {runtime.map((entry) => (
C:\Users\Admin\terragest\src\components\erp\dashboard\ErpDashboard.tsx:17 Runtime ERP opérationnel.
C:\Users\Admin\terragest\src\components\erp\dashboard\ERPDashboardActivityFeed.tsx:38 title="Activité Runtime"
C:\Users\Admin\terragest\src\components\erp\dashboard\ERPDashboardActivityFeed.tsx:39 description="Flux d'activité centralisé du runtime ERP."
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:1 import type { ERPAction } from "@/runtime/actions/ERPAction";
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:3 import { ERPActionRegistry } from "@/runtime/actions";
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:5 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:6 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:7 import { ERPRuntimeFieldValue } from "@/components/erp/runtime/ERPRuntimeFieldValue";
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:8 import type { ERPModuleField } from "@/runtime/modules/schemas/ERPModuleSchema";
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:67 <ERPRuntimeFieldValue field={field} value={row[column.key]} />
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeConsolidationPanel.tsx:1 import { EnterpriseRuntimePerformancePanel } from "./EnterpriseRuntimePerformancePanel";
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeConsolidationPanel.tsx:2 import { EnterpriseRuntimeDiagnosticsPanel } from "./EnterpriseRuntimeDiagnosticsPanel";
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeConsolidationPanel.tsx:3 import { EnterpriseRuntimeLifecyclePanel } from "./EnterpriseRuntimeLifecyclePanel";
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeConsolidationPanel.tsx:4 import { EnterpriseRuntimeGovernancePanel } from "./EnterpriseRuntimeGovernancePanel";
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeConsolidationPanel.tsx:6 export function EnterpriseRuntimeConsolidationPanel() {
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeConsolidationPanel.tsx:11 Enterprise Runtime Consolidation
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeConsolidationPanel.tsx:18 <EnterpriseRuntimePerformancePanel />
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeConsolidationPanel.tsx:21 <EnterpriseRuntimeDiagnosticsPanel />
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeConsolidationPanel.tsx:22 <EnterpriseRuntimeLifecyclePanel />
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeConsolidationPanel.tsx:23 <EnterpriseRuntimeGovernancePanel />
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeDiagnosticsPanel.tsx:2 import { EnterpriseRuntimeDiagnostics } from "@/runtime/enterprise-runtime";
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeDiagnosticsPanel.tsx:4 export function EnterpriseRuntimeDiagnosticsPanel() {
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeDiagnosticsPanel.tsx:5 const diagnostics = EnterpriseRuntimeDiagnostics.summary();
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeDiagnosticsPanel.tsx:12 Diagnostics runtime
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeGovernancePanel.tsx:2 import { EnterpriseRuntimeGovernance } from "@/runtime/enterprise-runtime";
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeGovernancePanel.tsx:4 export function EnterpriseRuntimeGovernancePanel() {
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeGovernancePanel.tsx:5 const checks = EnterpriseRuntimeGovernance.checks();
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeLifecyclePanel.tsx:2 import { EnterpriseRuntimeLifecycle } from "@/runtime/enterprise-runtime";
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeLifecyclePanel.tsx:4 export function EnterpriseRuntimeLifecyclePanel() {
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeLifecyclePanel.tsx:5 const steps = EnterpriseRuntimeLifecycle.steps();
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimePerformancePanel.tsx:1 import { EnterpriseRuntimePerformance } from "@/runtime/enterprise-runtime";
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimePerformancePanel.tsx:3 export function EnterpriseRuntimePerformancePanel() {
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimePerformancePanel.tsx:4 const metrics = EnterpriseRuntimePerformance.metrics();
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\index.ts:1 export { EnterpriseRuntimeDiagnosticsPanel } from "./EnterpriseRuntimeDiagnosticsPanel";
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\index.ts:2 export { EnterpriseRuntimeLifecyclePanel } from "./EnterpriseRuntimeLifecyclePanel";
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\index.ts:3 export { EnterpriseRuntimeGovernancePanel } from "./EnterpriseRuntimeGovernancePanel";
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\index.ts:4 export { EnterpriseRuntimePerformancePanel } from "./EnterpriseRuntimePerformancePanel";
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\index.ts:5 export { EnterpriseRuntimeConsolidationPanel } from "./EnterpriseRuntimeConsolidationPanel";
C:\Users\Admin\terragest\src\components\erp\errors\ERPErrorBoundary.tsx:5 import { RuntimeErrorReporter } from "@/runtime/production";
C:\Users\Admin\terragest\src\components\erp\errors\ERPErrorBoundary.tsx:33 RuntimeErrorReporter.capture(error, "ui-error-boundary");
C:\Users\Admin\terragest\src\components\erp\errors\ERPErrorBoundary.tsx:45 Le runtime ERP a intercepte une erreur afin de proteger l'interface.
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:5 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:7 ERPEventRuntimeBus,
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:8 ERPEventRuntimeOrchestrator,
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:9 ERPEventRuntimeSubscriptionRegistry,
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:10 type ERPEventRuntimeEvent,
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:11 } from "@/runtime/event-runtime";
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:13 interface ERPEventRuntimePanelProps {
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:17 export function ERPEventRuntimePanel({
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:19 }: ERPEventRuntimePanelProps) {
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:21 useState<ERPEventRuntimeEvent[]>(
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:22 ERPEventRuntimeBus.replay(module.metadata.key)
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:26 ERPEventRuntimeSubscriptionRegistry.forModule(
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:32 ...ERPEventRuntimeBus.replay(module.metadata.key),
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:37 ERPEventRuntimeOrchestrator.simulateMaterielBreakdown();
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:42 ERPEventRuntimeOrchestrator.simulateStockCritical();
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:47 ERPEventRuntimeOrchestrator.simulateWorkflowCompleted();
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:56 Event runtime cross-modules
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:113 Aucun evenement runtime.
C:\Users\Admin\terragest\src\components\erp\event-runtime\index.ts:1 export { ERPEventRuntimePanel } from "./ERPEventRuntimePanel";
C:\Users\Admin\terragest\src\components\erp\executive-dashboard\ERPExecutiveDashboard.tsx:33 <div className="text-sm text-gray-500">Santé runtime</div>
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:12 from "@/runtime/forms/DynamicFormRegistry";
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:15 RuntimeContextEngine,
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:17 from "@/runtime/context/RuntimeContextEngine";
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:22 from "@/runtime/selects/ERPDynamicSelect";
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:39 const runtimeContext =
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:42 return RuntimeContextEngine
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:55 runtimeContext
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:60 runtimeContext,
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:107 ...runtimeContext,
C:\Users\Admin\terragest\src\components\erp\forms\ERPFormRenderer.tsx:3 import type { ERPGeneratedSchema } from "@/runtime/ui-generation";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:6 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:7 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:8 import { RuntimeDataBinding } from "@/runtime/data-binding";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:18 RuntimeValidationEngine,
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:19 } from "@/runtime/validation/RuntimeValidationEngine";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:22 RuntimeVisibilityEngine,
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:23 } from "@/runtime/visibility/RuntimeVisibilityEngine";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:26 RuntimeComputedEngine,
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:27 } from "@/runtime/computed/RuntimeComputedEngine";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:30 RuntimeValidationError,
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:31 } from "@/runtime/validation/RuntimeValidationTypes";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:34 erpRuntimeValidationBridge,
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:35 } from "@/runtime/rules/ERPRuntimeValidationBridge";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:51 useState<RuntimeValidationError[]>([]);
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:72 RuntimeComputedEngine.compute(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:89 RuntimeVisibilityEngine.isVisible(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:153 RuntimeValidationEngine.validate(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:173 erpRuntimeValidationBridge.validate(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:201 await RuntimeDataBinding.create(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:209 await RuntimeDataBinding.update(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:260 Formulaire métier connecté au binding runtime.
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormActions.tsx:3 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:4 import type { ERPModuleField } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:5 import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx:3 import type { ERPModuleField } from "@/runtime/modules/schemas/ERPModuleSchema";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:8 } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:11 RuntimeVisibilityEngine,
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:12 } from "@/runtime/visibility/RuntimeVisibilityEngine";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:50 RuntimeVisibilityEngine.isVisible(
C:\Users\Admin\terragest\src\components\erp\generic\GenericCreatePage.tsx:1 import { ERPRuntimePage } from "@/components/erp/runtime";
C:\Users\Admin\terragest\src\components\erp\generic\GenericCreatePage.tsx:2 import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericCreatePage.tsx:3 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericCreatePage.tsx:14 const runtimeModule =
C:\Users\Admin\terragest\src\components\erp\generic\GenericCreatePage.tsx:18 return <ERPRuntimePage module={runtimeModule} type="create" />;
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:5 import { ERPRuntimePage } from "@/components/erp/runtime";
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:6 import { coreERPModules } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:7 import { RuntimeDataBinding } from "@/runtime/data-binding";
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:9 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:24 const runtimeModule =
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:30 const [runtimeRecord, setRuntimeRecord] =
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:38 if (!runtimeModule || !id) {
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:45 await RuntimeDataBinding.detail(
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:46 runtimeModule,
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:50 setRuntimeRecord(
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:59 setRuntimeRecord(undefined);
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:66 }, [runtimeModule, id]);
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:69 <ERPRuntimePage
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:70 module={runtimeModule}
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:75 : runtimeRecord ?? undefined
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:4 import { ERPRuntimePage } from "@/components/erp/runtime";
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:5 import { coreERPModules } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:6 import { RuntimeDataBinding } from "@/runtime/data-binding";
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:7 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:22 const runtimeModule =
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:26 const [runtimeRecord, setRuntimeRecord] =
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:33 if (!runtimeModule || !id) {
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:40 await RuntimeDataBinding.detail(runtimeModule, id);
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:42 setRuntimeRecord(loadedRecord ?? undefined);
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:45 setRuntimeRecord(undefined);
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:52 }, [runtimeModule, id]);
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:55 <ERPRuntimePage
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:56 module={runtimeModule}
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:58 record={loading ? undefined : runtimeRecord ?? undefined}
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:5 import { ERPRuntimePage } from "@/components/erp/runtime";
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:6 import { coreERPModules } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:7 import { RuntimeDataBinding } from "@/runtime/data-binding";
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:9 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:10 import type { RuntimeRecord } from "@/runtime/data-binding";
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:21 const runtimeModule =
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:28 useState<RuntimeRecord[]>([]);
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:35 if (!runtimeModule) {
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:42 await RuntimeDataBinding.list(
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:43 runtimeModule
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:48 runtimeModule.metadata.key,
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:64 }, [runtimeModule]);
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:67 <ERPRuntimePage
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:68 module={runtimeModule}
C:\Users\Admin\terragest\src\components\erp\layout\ERPCommandPanel.tsx:13 Fonctions activÃ©es depuis la dÃ©finition runtime du module.
C:\Users\Admin\terragest\src\components\erp\layout\ERPRuntimeHealthPanel.tsx:1 export function ERPRuntimeHealthPanel() {
C:\Users\Admin\terragest\src\components\erp\layout\index.ts:4 export { ERPRuntimeHealthPanel } from "./ERPRuntimeHealthPanel";
C:\Users\Admin\terragest\src\components\erp\live-operational\ERPLiveOperationalPanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\modules\ERPModuleEnterprisePage.tsx:26 label: "Runtime",
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPErrorAnalyticsPanel.tsx:34 Aucune alerte runtime.
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPErrorAnalyticsPanel.tsx:44 {alert.title ?? "Alerte runtime"}
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPHealthPanel.tsx:2 import type { getERPMonitoringSnapshot } from "@/runtime/monitoring";
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPMonitoringDashboard.tsx:2 import { getERPMonitoringSnapshot } from "@/runtime/monitoring";
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPMonitoringDashboard.tsx:17 description="Health checks, topology, runtime metrics, dependency graph et error analytics."
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPMonitoringMetricsGrid.tsx:2 import type { getERPMonitoringSnapshot } from "@/runtime/monitoring";
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPMonitoringMetricsGrid.tsx:18 <ERPStatCard label="Tenants" value={metrics.tenants} helper="SaaS runtime" />
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPSystemHealth.tsx:10 ["Runtime", "healthy"],
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPTopologyPanel.tsx:2 import type { getERPMonitoringSnapshot } from "@/runtime/monitoring";
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPTopologyPanel.tsx:17 Runtime Topology
C:\Users\Admin\terragest\src\components\erp\navigation\ERPActionButton.tsx:3 import type { ERPAction } from "@/runtime/actions";
C:\Users\Admin\terragest\src\components\erp\navigation\ERPActionToolbar.tsx:1 import type { ERPAction } from "@/runtime/actions";
C:\Users\Admin\terragest\src\components\erp\navigation\ERPBreadcrumbs.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\observability\ERPAlertsPanel.tsx:3 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\components\erp\observability\ERPEventsTimeline.tsx:3 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\components\erp\observability\ERPObservabilityCenter.tsx:10 label: "Logs runtime",
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:7 seedERPRuntimeObservability,
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:8 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:22 seedERPRuntimeObservability();
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:24 export function ERPRuntimeObservabilityDashboard() {
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:31 title="Runtime Timeline"
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:32 description="Timeline centralisee des events, traces et alertes runtime."
C:\Users\Admin\terragest\src\components\erp\observability\ERPTracesPanel.tsx:3 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\components\erp\observability\index.ts:7 export * from "./ERPRuntimeObservabilityDashboard";
C:\Users\Admin\terragest\src\components\erp\os\ERPCommandPalette.tsx:2 import { ERPCommandCenter } from "@/runtime/os-enterprise";
C:\Users\Admin\terragest\src\components\erp\os\ERPNotificationCenter.tsx:2 import { ERPNotificationCenter as NotificationRuntime } from "@/runtime/os-enterprise";
C:\Users\Admin\terragest\src\components\erp\os\ERPNotificationCenter.tsx:5 const notifications = NotificationRuntime.notifications();
C:\Users\Admin\terragest\src\components\erp\os\ERPSavedViewsPanel.tsx:2 import { ERPSavedViews } from "@/runtime/os-enterprise";
C:\Users\Admin\terragest\src\components\erp\os\ERPWorkspaceSwitcher.tsx:2 import { ERPUserContextProvider } from "@/runtime/os-enterprise";
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:9 seedERPPersistenceRuntime,
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:10 } from "@/runtime/persistence";
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:13 await seedERPPersistenceRuntime();
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:33 title="Persistence Runtime Enterprise"
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:34 description="Repository runtime tenant-aware pour events, traces, alerts, workflows, queue jobs et audit."
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:43 helper="Persisted runtime"
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:51 Collections runtime
C:\Users\Admin\terragest\src\components\erp\production\ERPProductionCloudPanel.tsx:2 import type { getERPProductionReadinessSnapshot } from "@/runtime/production";
C:\Users\Admin\terragest\src\components\erp\production\ERPProductionDashboard.tsx:2 import { getERPProductionReadinessSnapshot } from "@/runtime/production";
C:\Users\Admin\terragest\src\components\erp\production\ERPProductionDashboard.tsx:17 description="Gouvernance SaaS, readiness cloud, quotas tenant, rate limits, backup et policies runtime."
C:\Users\Admin\terragest\src\components\erp\production\ERPProductionMetricsGrid.tsx:2 import type { getERPProductionReadinessSnapshot } from "@/runtime/production";
C:\Users\Admin\terragest\src\components\erp\production\ERPProductionMetricsGrid.tsx:18 <ERPStatCard label="Rate Limits" value={metrics.limits} helper="Runtime limits" />
C:\Users\Admin\terragest\src\components\erp\production\ERPProductionMetricsGrid.tsx:21 <ERPStatCard label="Runtime" value="Governed" helper="SaaS policies" />
C:\Users\Admin\terragest\src\components\erp\production\ERPProductionPoliciesPanel.tsx:2 import type { getERPProductionReadinessSnapshot } from "@/runtime/production";
C:\Users\Admin\terragest\src\components\erp\production\ERPProductionPoliciesPanel.tsx:18 Gouvernance runtime SaaS.
C:\Users\Admin\terragest\src\components\erp\production\ERPProductionQuotasPanel.tsx:2 import type { getERPProductionReadinessSnapshot } from "@/runtime/production";
C:\Users\Admin\terragest\src\components\erp\production\ProductionHardeningPanel.tsx:8 } from "@/runtime/production";
C:\Users\Admin\terragest\src\components\erp\production\ProductionHardeningPanel.tsx:22 Gouvernance production, readiness cloud, quotas, backups et limites runtime.
C:\Users\Admin\terragest\src\components\erp\production\ProductionLogsPanel.tsx:2 import { ProductionLogger } from "@/runtime/production";
C:\Users\Admin\terragest\src\components\erp\production\ProductionLogsPanel.tsx:11 <h2 className="text-lg font-black text-slate-950">Logs runtime</h2>
C:\Users\Admin\terragest\src\components\erp\production\ProductionReadinessPanel.tsx:2 import { ProductionReadiness } from "@/runtime/production";
C:\Users\Admin\terragest\src\components\erp\production\readiness.ts:1 // src/runtime/production/readiness.ts
C:\Users\Admin\terragest\src\components\erp\production\readiness.ts:35 id: "runtime",
C:\Users\Admin\terragest\src\components\erp\production\readiness.ts:36 label: "Runtime Next.js",
C:\Users\Admin\terragest\src\components\erp\production\RuntimeHealthPanel.tsx:18 key: "runtime-registry",
C:\Users\Admin\terragest\src\components\erp\production\RuntimeHealthPanel.tsx:20 label: "Runtime Registry",
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:2 import type { getERPRealtimeSnapshot } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:20 Flux des messages runtime en temps reel.
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:2 import type { getERPRealtimeSnapshot } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:22 <ERPStatCard label="System" value={snapshot.system} helper="Runtime" />
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:2 import type { getERPRealtimeSnapshot } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:17 Presence runtime
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:20 Utilisateurs et services connectes au runtime.
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:14 } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:17 FirestoreRuntimeRealtime,
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:18 } from "@/runtime/firestore";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:34 FirestoreRuntimeRealtime.subscribe(
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:4 seedERPRealtimeRuntime,
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:5 } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:11 seedERPRealtimeRuntime();
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:13 export function ERPRuntimeRealtimeDashboard() {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:19 eyebrow="ERP Realtime Runtime"
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:21 description="Supervision des messages live, channels, subscriptions et presence runtime."
C:\Users\Admin\terragest\src\components\erp\realtime\index.ts:4 export * from "./ERPRuntimeRealtimeDashboard";
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:5 import type { ERPModuleField } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:8 from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
C:\Users\Admin\terragest\src\components\erp\resilience\ERPDLQPanel.tsx:2 import { ERPDeadLetterStore } from "@/runtime/resilience";
C:\Users\Admin\terragest\src\components\erp\resilience\ERPQueuePanel.tsx:2 import { ERPQueueStore } from "@/runtime/resilience";
C:\Users\Admin\terragest\src\components\erp\resilience\ERPQueuePanel.tsx:11 Queue runtime
C:\Users\Admin\terragest\src\components\erp\resilience\ERPQueuePanel.tsx:14 Jobs asynchrones traites par le runtime ERP.
C:\Users\Admin\terragest\src\components\erp\resilience\ERPResilienceMetrics.tsx:6 } from "@/runtime/resilience";
C:\Users\Admin\terragest\src\components\erp\resilience\ERPResilienceMetrics.tsx:24 <ERPStatCard label="Runtime" value="Actif" helper="Worker simulation" />
C:\Users\Admin\terragest\src\components\erp\resilience\ERPRuntimeResilienceDashboard.tsx:2 import { seedERPRuntimeResilience } from "@/runtime/resilience";
C:\Users\Admin\terragest\src\components\erp\resilience\ERPRuntimeResilienceDashboard.tsx:8 seedERPRuntimeResilience();
C:\Users\Admin\terragest\src\components\erp\resilience\ERPRuntimeResilienceDashboard.tsx:10 export function ERPRuntimeResilienceDashboard() {
C:\Users\Admin\terragest\src\components\erp\resilience\ERPRuntimeResilienceDashboard.tsx:15 title="Queue, Retry & DLQ Runtime"
C:\Users\Admin\terragest\src\components\erp\resilience\index.ts:4 export * from "./ERPRuntimeResilienceDashboard";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeAlertsPanel.tsx:9 interface ERPRuntimeAlert {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeAlertsPanel.tsx:21 interface ERPRuntimeAlertsPanelProps {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeAlertsPanel.tsx:24 ERPRuntimeAlert[];
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeAlertsPanel.tsx:27 export function ERPRuntimeAlertsPanel({
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeAlertsPanel.tsx:29 }: ERPRuntimeAlertsPanelProps) {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeAlertsPanel.tsx:34 title="Runtime Alerts"
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeAlertsPanel.tsx:35 description="Alertes et supervision du runtime."
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDeadLetterPanel.tsx:9 interface ERPRuntimeDeadLetter {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDeadLetterPanel.tsx:18 interface ERPRuntimeDeadLetterPanelProps {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDeadLetterPanel.tsx:21 ERPRuntimeDeadLetter[];
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDeadLetterPanel.tsx:24 export function ERPRuntimeDeadLetterPanel({
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDeadLetterPanel.tsx:26 }: ERPRuntimeDeadLetterPanelProps) {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDeadLetterPanel.tsx:32 description="Événements runtime en erreur."
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:3 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:4 import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:6 interface ERPRuntimeDetailsProps {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:11 export function ERPRuntimeDetails({
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:14 }: ERPRuntimeDetailsProps) {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:20 description="Vue détail générée automatiquement par le Runtime ERP."
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:33 <ERPRuntimeFieldValue
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeFieldValue.tsx:2 import type { ERPModuleField } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeFieldValue.tsx:4 interface ERPRuntimeFieldValueProps {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeFieldValue.tsx:9 export function ERPRuntimeFieldValue({
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeFieldValue.tsx:12 }: ERPRuntimeFieldValueProps) {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:3 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:5 interface ERPRuntimeFormProps {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:9 export function ERPRuntimeForm({ module }: ERPRuntimeFormProps) {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:15 description="Formulaire généré automatiquement par le Runtime ERP."
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeMetricsPanel.tsx:9 interface ERPRuntimeMetric {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeMetricsPanel.tsx:18 interface ERPRuntimeMetricsPanelProps {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeMetricsPanel.tsx:21 ERPRuntimeMetric[];
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeMetricsPanel.tsx:24 export function ERPRuntimeMetricsPanel({
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeMetricsPanel.tsx:26 }: ERPRuntimeMetricsPanelProps) {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeMetricsPanel.tsx:31 title="Runtime Metrics"
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeMetricsPanel.tsx:32 description="Indicateurs du runtime ERP."
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:12 ERPRuntimeStatusPanel,
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:13 ERPRuntimeMetricsPanel,
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:14 ERPRuntimeAlertsPanel,
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:15 ERPRuntimeQueuesPanel,
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:16 ERPRuntimeWorkersPanel,
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:17 ERPRuntimeRetryPanel,
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:18 ERPRuntimeDeadLetterPanel,
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:21 export function ERPRuntimeOverviewPage() {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:26 title="Runtime ERP"
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:27 description="Cockpit runtime enterprise centralisé."
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:33 <ERPRuntimeStatusPanel
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:34 runtime={{
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:43 <ERPRuntimeMetricsPanel
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:48 helper: "Runtime events",
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:58 helper: "Workers runtime",
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:68 <ERPRuntimeAlertsPanel
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:79 <ERPRuntimeQueuesPanel
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:94 <ERPRuntimeWorkersPanel
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:109 <ERPRuntimeRetryPanel
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:119 <ERPRuntimeDeadLetterPanel
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:11 import { ERPRuntimeDetails } from "./ERPRuntimeDetails";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:12 import { ERPRuntimeTable } from "./ERPRuntimeTable";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:14 import type { ERPModule } from "@/runtime/modules/ERPModule";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:16 interface ERPRuntimePageProps {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:25 export function ERPRuntimePage({
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:32 }: ERPRuntimePageProps) {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:48 "Page générée automatiquement par le Runtime ERP."
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:81 <ERPRuntimeDetails
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:102 <ERPRuntimeTable
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:112 description="Aucun module runtime n'a été trouvé."
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeQueuesPanel.tsx:9 interface ERPRuntimeQueuesPanelProps {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeQueuesPanel.tsx:17 export function ERPRuntimeQueuesPanel({
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeQueuesPanel.tsx:19 }: ERPRuntimeQueuesPanelProps) {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeQueuesPanel.tsx:22 title="Runtime Queues"
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeQueuesPanel.tsx:23 description="État des files runtime."
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeRetryPanel.tsx:9 interface ERPRuntimeRetry {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeRetryPanel.tsx:21 interface ERPRuntimeRetryPanelProps {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeRetryPanel.tsx:24 ERPRuntimeRetry[];
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeRetryPanel.tsx:27 export function ERPRuntimeRetryPanel({
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeRetryPanel.tsx:29 }: ERPRuntimeRetryPanelProps) {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeRetryPanel.tsx:34 title="Runtime Retries"
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeRetryPanel.tsx:35 description="Suivi des retries runtime."
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatus.tsx:6 export function ERPRuntimeStatus() {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:9 interface ERPRuntimeStatusPanelProps {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:11 runtime: {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:25 export function ERPRuntimeStatusPanel({
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:26 runtime,
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:27 }: ERPRuntimeStatusPanelProps) {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:32 title="Runtime ERP"
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:33 description="État global du runtime enterprise."
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:38 runtime.status === "healthy"
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:43 {runtime.status}
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:52 value: runtime.modules,
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:56 value: runtime.workers,
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:60 value: runtime.queues,
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:64 value: runtime.retries,
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:3 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:4 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:5 import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:6 import type { ERPModuleField } from "@/runtime/modules/schemas/ERPModuleSchema";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:8 interface ERPRuntimeTableProps {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:39 export function ERPRuntimeTable({
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:42 }: ERPRuntimeTableProps) {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:56 <ERPRuntimeFieldValue field={field} value={row[column.key]} />
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:112 {/*  ACTIONS RUNTIME */}
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeWorkersPanel.tsx:9 interface ERPRuntimeWorker {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeWorkersPanel.tsx:21 interface ERPRuntimeWorkersPanelProps {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeWorkersPanel.tsx:24 ERPRuntimeWorker[];
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeWorkersPanel.tsx:27 export function ERPRuntimeWorkersPanel({
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeWorkersPanel.tsx:29 }: ERPRuntimeWorkersPanelProps) {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeWorkersPanel.tsx:34 title="Runtime Workers"
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeWorkersPanel.tsx:35 description="Workers et exécuteurs runtime."
C:\Users\Admin\terragest\src\components\erp\runtime\index.ts:1 export * from "./ERPRuntimePage";
C:\Users\Admin\terragest\src\components\erp\runtime\index.ts:2 export * from "./ERPRuntimeOverviewPage";
C:\Users\Admin\terragest\src\components\erp\runtime\index.ts:3 export * from "./ERPRuntimeStatusPanel";
C:\Users\Admin\terragest\src\components\erp\runtime\index.ts:4 export * from "./ERPRuntimeAlertsPanel";
C:\Users\Admin\terragest\src\components\erp\runtime\index.ts:5 export * from "./ERPRuntimeMetricsPanel";
C:\Users\Admin\terragest\src\components\erp\runtime\index.ts:6 export * from "./ERPRuntimeQueuesPanel";
C:\Users\Admin\terragest\src\components\erp\runtime\index.ts:7 export * from "./ERPRuntimeWorkersPanel";
C:\Users\Admin\terragest\src\components\erp\runtime\index.ts:8 export * from "./ERPRuntimeRetryPanel";
C:\Users\Admin\terragest\src\components\erp\runtime\index.ts:9 export * from "./ERPRuntimeDeadLetterPanel";
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:13 subscribeRuntimeChannel,
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:14 } from "@/core/realtime/runtime-realtime-channel";
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:16 export function ERPRuntimeTimeline() {
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:24 subscribeRuntimeChannel(
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:42 Runtime Activity
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:49 Aucune activité runtime.
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:78 Runtime Event
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPDataTableRuntime.tsx:1 import type { ERPGeneratedSchema } from "@/runtime/ui-generation";
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPDataTableRuntime.tsx:4 type ERPDataTableRuntimeProps = {
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPDataTableRuntime.tsx:9 export function ERPDataTableRuntime({
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPDataTableRuntime.tsx:12 }: ERPDataTableRuntimeProps) {
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPDataTableRuntime.tsx:17 description="Aucune donnee pour le moment. La table runtime est prete a recevoir les donnees reelles."
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeModulePage.tsx:8 import { ERPDataTableRuntime } from "./ERPDataTableRuntime";
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeModulePage.tsx:12 } from "@/runtime/ui-generation";
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeModulePage.tsx:14 type ERPRuntimeModulePageProps = {
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeModulePage.tsx:20 export function ERPRuntimeModulePage({
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeModulePage.tsx:24 }: ERPRuntimeModulePageProps) {
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeModulePage.tsx:34 eyebrow="Runtime UI Generation"
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeModulePage.tsx:38 "Module genere par le runtime ERP."
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeModulePage.tsx:44 <ERPStatCard label="Mode" value={mode} helper="Template runtime" />
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeModulePage.tsx:46 <ERPStatCard label="Runtime" value="Pret" helper="Generation active" />
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeModulePage.tsx:53 <ERPDataTableRuntime schema={schema} rows={rows} />
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:9 } from "@/runtime/registry";
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:11 export function ERPRuntimeRegistryDashboard() {
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:23 eyebrow="ERP Runtime"
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:24 title="Central Runtime Registry"
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:39 helper="Routes runtime"
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:51 helper="Runtime ERP"
C:\Users\Admin\terragest\src\components\erp\runtime-ui\index.ts:1 export * from "./ERPDataTableRuntime";
C:\Users\Admin\terragest\src\components\erp\runtime-ui\index.ts:3 export * from "./ERPRuntimeModulePage";
C:\Users\Admin\terragest\src\components\erp\runtime-ui\index.ts:5 export * from "./ERPRuntimeRegistryDashboard";
C:\Users\Admin\terragest\src\components\erp\security\ERPPoliciesPanel.tsx:2 import type { getERPSecuritySnapshot } from "@/runtime/security";
C:\Users\Admin\terragest\src\components\erp\security\ERPRolesPanel.tsx:2 import type { getERPSecuritySnapshot } from "@/runtime/security";
C:\Users\Admin\terragest\src\components\erp\security\ERPRolesPanel.tsx:20 Roles globaux disponibles dans le runtime.
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityAuditPanel.tsx:2 import type { getERPSecuritySnapshot } from "@/runtime/security";
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityAuditPanel.tsx:20 Traces des controles d'acces runtime.
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityDashboard.tsx:4 seedERPSecurityRuntime,
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityDashboard.tsx:5 } from "@/runtime/security";
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityDashboard.tsx:12 seedERPSecurityRuntime();
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityDashboard.tsx:22 description="Roles, permissions, policies, guards, session runtime et audit securite."
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityMetrics.tsx:2 import type { getERPSecuritySnapshot } from "@/runtime/security";
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityMetrics.tsx:22 <ERPStatCard label="Runtime" value="Actif" helper="Access guard" />
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPProtectedAction.tsx:4 import type { ERPAction } from "@/runtime/actions";
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPProtectedAction.tsx:5 import { RuntimeActionGuard } from "@/runtime/security-runtime";
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPProtectedAction.tsx:16 if (!RuntimeActionGuard.canExecute(action)) {
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPRuntimeSecurityBadge.tsx:2 import { RuntimeSecurityContext } from "@/runtime/security-runtime";
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPRuntimeSecurityBadge.tsx:4 export function ERPRuntimeSecurityBadge() {
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPRuntimeSecurityBadge.tsx:5 const user = RuntimeSecurityContext.currentUser();
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:3 RuntimeSecurityContext,
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:4 runtimeRolePermissions,
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:5 } from "@/runtime/security-runtime";
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:8 const user = RuntimeSecurityContext.currentUser();
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:9 const permissions = runtimeRolePermissions[user.role];
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:19 Permissions runtime appliquees aux actions et workflows.
C:\Users\Admin\terragest\src\components\erp\security-runtime\index.ts:1 export { ERPRuntimeSecurityBadge } from "./ERPRuntimeSecurityBadge";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartAnomaliesPanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartAnomaliesPanel.tsx:2 import { SmartAnomalyDetector } from "@/runtime/smart-intelligence";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartOperationalIntelligencePanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartPredictionsPanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartPredictionsPanel.tsx:2 import { SmartPredictionEngine } from "@/runtime/smart-intelligence";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartRecommendationsPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartRecommendationsPanel.tsx:3 import { SmartRecommendationEngine } from "@/runtime/smart-intelligence";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartRiskBadge.tsx:2 import type { SmartRiskLevel } from "@/runtime/smart-intelligence";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartScorePanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartScorePanel.tsx:2 import { SmartScoringEngine } from "@/runtime/smart-intelligence";
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartInsightsPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartInsightsPanel.tsx:3 import { ERPSmartRuntimeEngine } from "@/runtime/smart-runtime";
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartInsightsPanel.tsx:14 ERPSmartRuntimeEngine.analyse(module);
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartInsightsPanel.tsx:25 Analyse operationnelle du runtime ERP.
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartPriorityPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartPriorityPanel.tsx:3 import { ERPSmartPriorityEngine } from "@/runtime/smart-runtime";
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartRecommendationsPanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartRecommendationsPanel.tsx:2 import { ERPSmartRecommendations } from "@/runtime/smart-runtime";
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartRecommendationsPanel.tsx:24 Suggestions generees par le runtime intelligent.
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartRuntimePanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartRuntimePanel.tsx:6 interface ERPSmartRuntimePanelProps {
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartRuntimePanel.tsx:10 export function ERPSmartRuntimePanel({
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartRuntimePanel.tsx:12 }: ERPSmartRuntimePanelProps) {
C:\Users\Admin\terragest\src\components\erp\smart-runtime\index.ts:1 export { ERPSmartRuntimePanel } from "./ERPSmartRuntimePanel";
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsChannelsPanel.tsx:7 } from "@/runtime/streams";
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsChannelsPanel.tsx:32 Canaux realtime runtime.
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsDashboard.tsx:7 seedERPStreamsRuntime,
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsDashboard.tsx:8 } from "@/runtime/streams";
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsDashboard.tsx:22 seedERPStreamsRuntime();
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsDashboard.tsx:33 eyebrow="ERP Live Runtime"
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsDashboard.tsx:35 description="Live runtime streams, realtime events, workers feeds et observability timeline."
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsMetricsGrid.tsx:7 } from "@/runtime/streams";
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsTimelinePanel.tsx:7 } from "@/runtime/streams";
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsTimelinePanel.tsx:32 Flux temps reel du runtime ERP.
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:11 } from "@/runtime/ui-generation";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:122 <ERPStatCard label="Runtime" value="Pret" helper="Generation UI active" />
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:131 description="Cette page est stabilisee et prete pour le branchement des donnees runtime reelles."
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActivityPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleDashboardTemplate.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleHeader.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleHeader.tsx:5 import { ERPUIComposer } from "@/runtime/ui/ERPUIComposition";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleKpiGrid.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleKpiGrid.tsx:2 import { ERPUIComposer } from "@/runtime/ui/ERPUIComposition";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleListTemplate.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleTabs.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleTabs.tsx:2 import { ERPUIComposer } from "@/runtime/ui/ERPUIComposition";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantDashboard.tsx:7 seedERPTenantRuntime,
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantDashboard.tsx:8 } from "@/runtime/tenant";
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantDashboard.tsx:22 seedERPTenantRuntime();
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantDashboard.tsx:34 title="Tenant Runtime Dashboard"
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantDashboard.tsx:35 description="Isolation tenant, contexte runtime, modules, quotas et activite SaaS."
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsGrid.tsx:5 } from "@/runtime/tenant";
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsPanel.tsx:8 } from "@/runtime/tenant";
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsPanel.tsx:36 Activite runtime du tenant courant.
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantRegistryPanel.tsx:7 } from "@/runtime/tenant";
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingDashboard.tsx:8 } from "@/runtime/testing";
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingDashboard.tsx:35 description="Validation runtime, workflows, workers, securite, multi-tenant et observability."
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingHistoryPanel.tsx:7 } from "@/runtime/testing";
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingMetricsGrid.tsx:7 } from "@/runtime/testing";
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingMetricsGrid.tsx:31 helper="Runtime tests"
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingMetricsGrid.tsx:49 helper="Qualite runtime"
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingRegistryPanel.tsx:7 } from "@/runtime/testing";
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingRegistryPanel.tsx:28 Runtime Tests
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingRegistryPanel.tsx:32 Validation des couches runtime.
C:\Users\Admin\terragest\src\components\erp\timeline\ERPEventTimeline.tsx:19 title: "Synchronisation runtime",
C:\Users\Admin\terragest\src\components\erp\workers\ERPSchedulerPanel.tsx:7 } from "@/runtime/workers";
C:\Users\Admin\terragest\src\components\erp\workers\ERPSchedulerPanel.tsx:32 Taches cron runtime.
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkerHistoryPanel.tsx:7 } from "@/runtime/workers";
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkersDashboard.tsx:7 seedERPWorkersRuntime,
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkersDashboard.tsx:8 } from "@/runtime/workers";
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkersDashboard.tsx:26 seedERPWorkersRuntime();
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkersDashboard.tsx:37 eyebrow="ERP Distributed Runtime"
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkersDashboard.tsx:39 description="Workers distribues, scheduler runtime, batch processing et orchestration longue duree."
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkersMetricsGrid.tsx:7 } from "@/runtime/workers";
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkersRegistryPanel.tsx:7 } from "@/runtime/workers";
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkersRegistryPanel.tsx:32 Workers runtime distribues.
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:15 description="Anomalie détectée par le runtime ERP."
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:80 "runtime"
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:203 Workflow Runtime
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:5 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:7 WorkflowRuntimeEngine,
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:8 WorkflowRuntimeRegistry,
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:9 type WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:10 } from "@/runtime/workflow-runtime";
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:11 import { RuntimeWorkflowGuard } from "@/runtime/security-runtime";
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:13 interface ERPWorkflowRuntimePanelProps {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:18 export function ERPWorkflowRuntimePanel({
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:21 }: ERPWorkflowRuntimePanelProps) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:22 const workflows = WorkflowRuntimeRegistry.forModule(module.metadata.key);
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:26 useState<WorkflowRuntimeInstance | null>(null);
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:48 if (!RuntimeWorkflowGuard.canStart()) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:53 WorkflowRuntimeEngine.start(workflow.key, recordId)
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:58 if (requiresValidation && !RuntimeWorkflowGuard.canValidate()) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:62 if (!RuntimeWorkflowGuard.canTransition()) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:67 WorkflowRuntimeEngine.transition(workflow.key, recordId, to)
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:76 Workflow runtime
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:109 {!instance && RuntimeWorkflowGuard.canStart() && (
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:118 !RuntimeWorkflowGuard.canValidate();
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:120 if (hidden || !RuntimeWorkflowGuard.canTransition()) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\index.ts:1 export { ERPWorkflowRuntimePanel } from "./ERPWorkflowRuntimePanel";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:2 import { seedERPRuntimeWorkflows } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:9 seedERPRuntimeWorkflows();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:11 export function ERPRuntimeWorkflowDashboard() {
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:17 description="Orchestration des processus metier, executions, timelines, events et traces runtime."
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:2 import { ERPWorkflowEngine } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowExecutionsPanel.tsx:2 import { ERPWorkflowExecutionStore } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowExecutionsPanel.tsx:12 Executions runtime
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:6 } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:24 <ERPStatCard label="Executions" value={executions.length} helper="Instances runtime" />
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowTimelinePanel.tsx:2 import { ERPWorkflowTimelineStore } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\index.ts:5 export * from "./ERPRuntimeWorkflowDashboard";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceActivity.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:3 import { ERPWorkflowRuntimePanel } from "@/components/erp/workflow-runtime";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:4 import { ERPAutomationRuntimePanel } from "@/components/erp/automation-runtime";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:5 import { ERPEventRuntimePanel } from "@/components/erp/event-runtime";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:32 <ERPWorkflowRuntimePanel module={module} />
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:34 <ERPAutomationRuntimePanel module={module} />
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:36 <ERPEventRuntimePanel module={module} />
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceContextPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceContextPanel.tsx:3 import { ERPSecurityContextPanel } from "@/components/erp/security-runtime";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceLayout.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceLayout.tsx:11 import { ERPSmartRuntimePanel } from "@/components/erp/smart-runtime";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceLayout.tsx:31 <ERPSmartRuntimePanel module={module} />
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceQuickActions.tsx:2 import { ERPActionRegistry } from "@/runtime/actions";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceQuickActions.tsx:3 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:14 import { ModuleRuntime }
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:15 from "@/platform/modules/runtime/ModuleRuntime";
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:35 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:14 import { ModuleRuntime }
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:15 from "@/platform/modules/runtime/ModuleRuntime";
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:35 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:14 import { ModuleRuntime }
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:15 from "@/platform/modules/runtime/ModuleRuntime";
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:42 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\components\operations\OperationsTimeline.tsx:39 Activité runtime
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:14 import { ModuleRuntime }
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:15 from "@/platform/modules/runtime/ModuleRuntime";
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:43 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:3 import { pushRuntimeEntry } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:30 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:70 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:85 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:97 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:104 "Audit runtime enregistré",
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:114 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:121 "Supervision runtime mise à jour",
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:7 } from "@/runtime/automation/engine/ERPAutomationEngine";
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:10 TerragestDomainRuntimeBridge,
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:11 } from "@/runtime/domain/TerragestDomainRuntimeBridge";
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:13 let runtimeStarted =
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:17 if (runtimeStarted) {
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:21 runtimeStarted = true;
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:24 "ERP RUNTIME BOOTSTRAP STARTED"
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:29 await TerragestDomainRuntimeBridge.boot();
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:34 "ERP RUNTIME ACTIVE"
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:1 export type RuntimePresence = {
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:16 RuntimePresence[] = [];
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:18 export function joinRuntime(
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:19 presence: RuntimePresence
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:37 "ERP USER JOINED RUNTIME",
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:42 export function leaveRuntime(
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:60 "ERP USER LEFT RUNTIME",
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:65 export function updateRuntimeActivity(
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:84 export function getRuntimePresence() {
C:\Users\Admin\terragest\src\core\dead-letter\dead-letter-queue.ts:6 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\dead-letter\dead-letter-queue.ts:7 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\dead-letter\dead-letter-queue.ts:17 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\dead-letter\dead-letter-queue.ts:57 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\event-bus\event-bus.ts:47 "runtimeEvents"
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:10 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:11 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:63 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:102 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:139 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\jobs\job-queue.ts:40 const runtimeJob:
C:\Users\Admin\terragest\src\core\jobs\job-queue.ts:55 jobQueue.push(runtimeJob);
C:\Users\Admin\terragest\src\core\jobs\job-queue.ts:59 runtimeJob
C:\Users\Admin\terragest\src\core\jobs\job-queue.ts:62 return runtimeJob;
C:\Users\Admin\terragest\src\core\jobs\job-worker.ts:6 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\jobs\job-worker.ts:7 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\jobs\job-worker.ts:19 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\jobs\job-worker.ts:37 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\layout\Sidebar.tsx:31 Enterprise Runtime
C:\Users\Admin\terragest\src\core\lifecycle\job-lifecycle.ts:6 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\lifecycle\job-lifecycle.ts:7 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\lifecycle\job-lifecycle.ts:17 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\metrics\metrics-engine.ts:12 runtimeEvents: number;
C:\Users\Admin\terragest\src\core\metrics\metrics-engine.ts:27 runtimeEvents: 0,
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:3 } from "@/runtime/modules";
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:12 runtimeMetrics?: boolean;
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:45 runtimeMetrics: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:70 runtimeMetrics: true,
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:1 export type RuntimeJob = any;
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:3 export type RuntimeEvent = any;
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:5 export type RuntimeMetric = any;
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:7 export type RuntimeTimelineEntry =
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:10 export type RuntimeTransaction =
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:15 job: RuntimeJob
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:19 RuntimeJob[]
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:23 event: RuntimeEvent
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:27 RuntimeEvent[]
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:31 metric: RuntimeMetric
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:35 RuntimeMetric[]
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:39 entry: RuntimeTimelineEntry
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:43 RuntimeTimelineEntry[]
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:47 transaction: RuntimeTransaction
C:\Users\Admin\terragest\src\core\persistence\persistence-provider.ts:51 RuntimeTransaction[]
C:\Users\Admin\terragest\src\core\persistence\runtime-persistence.ts:2 ERPRuntimeEntry,
C:\Users\Admin\terragest\src\core\persistence\runtime-persistence.ts:3 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\persistence\runtime-persistence.ts:5 const persistedRuntime:
C:\Users\Admin\terragest\src\core\persistence\runtime-persistence.ts:6 ERPRuntimeEntry[] = [];
C:\Users\Admin\terragest\src\core\persistence\runtime-persistence.ts:8 export async function persistRuntimeEntry(
C:\Users\Admin\terragest\src\core\persistence\runtime-persistence.ts:9 entry: ERPRuntimeEntry
C:\Users\Admin\terragest\src\core\persistence\runtime-persistence.ts:11 persistedRuntime.unshift(entry);
C:\Users\Admin\terragest\src\core\persistence\runtime-persistence.ts:14 "ERP RUNTIME PERSISTED",
C:\Users\Admin\terragest\src\core\persistence\runtime-persistence.ts:21 export async function getPersistedRuntime() {
C:\Users\Admin\terragest\src\core\persistence\runtime-persistence.ts:22 return persistedRuntime;
C:\Users\Admin\terragest\src\core\persistence\runtime-persistence.ts:25 export async function getPersistedModuleRuntime(
C:\Users\Admin\terragest\src\core\persistence\runtime-persistence.ts:28 return persistedRuntime.filter(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:3 RuntimeEvent,
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:4 RuntimeJob,
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:5 RuntimeMetric,
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:6 RuntimeTimelineEntry,
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:7 RuntimeTransaction,
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:24 job: RuntimeJob
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:29 "erp_runtime_jobs"
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:40 "erp_runtime_jobs"
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:53 event: RuntimeEvent
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:58 "erp_runtime_events"
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:69 "erp_runtime_events"
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:82 metric: RuntimeMetric
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:87 "erp_runtime_metrics"
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:98 "erp_runtime_metrics"
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:111 entry: RuntimeTimelineEntry
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:116 "erp_runtime_timeline"
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:127 "erp_runtime_timeline"
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:140 transaction: RuntimeTransaction
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:145 "erp_runtime_transactions"
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:156 "erp_runtime_transactions"
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:1 type RuntimeListener = (
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:5 const runtimeChannels =
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:8 RuntimeListener[]
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:11 export function subscribeRuntimeChannel(
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:13 listener: RuntimeListener
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:16 !runtimeChannels.has(
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:20 runtimeChannels.set(
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:26 runtimeChannels
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:37 runtimeChannels.get(
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:41 runtimeChannels.set(
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:51 export function publishRuntimeEvent(
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:56 runtimeChannels.get(
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:70 export function getRuntimeChannels() {
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:71 return runtimeChannels;
C:\Users\Admin\terragest\src\core\retry\retry-engine.ts:10 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\retry\retry-engine.ts:11 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\retry\retry-engine.ts:31 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\retry\retry-engine.ts:58 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\router\worker-router.ts:13 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\router\worker-router.ts:14 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\router\worker-router.ts:64 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\router\worker-router.ts:78 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:6 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:7 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:30 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:64 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:97 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:1 import { persistRuntimeEntry } from "@/core/persistence/runtime-persistence";
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:3 export type ERPRuntimeEntry = {
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:31 const runtimeTimeline:
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:32 ERPRuntimeEntry[] = [];
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:34 export function pushRuntimeEntry(
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:36 ERPRuntimeEntry,
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:40 const runtimeEntry:
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:41 ERPRuntimeEntry = {
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:49 runtimeTimeline.unshift(
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:50 runtimeEntry
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:54 "ERP RUNTIME ENTRY",
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:55 runtimeEntry
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:58 persistRuntimeEntry(
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:59 runtimeEntry
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:62 return runtimeEntry;
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:65 export function getRuntimeTimeline() {
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:66 return runtimeTimeline;
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:72 return runtimeTimeline.filter(
C:\Users\Admin\terragest\src\core\transitions\transition-engine.ts:6 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\transitions\transition-engine.ts:7 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\transitions\transition-engine.ts:36 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\transitions\transition-engine.ts:54 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\worker-loop\worker-loop.ts:27 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\worker-loop\worker-loop.ts:28 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\worker-loop\worker-loop.ts:34 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\workers\analytics-worker.ts:6 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\workers\analytics-worker.ts:7 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\workers\analytics-worker.ts:12 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\workers\export-worker.ts:6 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\workers\export-worker.ts:7 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\workers\export-worker.ts:12 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\workers\maintenance-worker.ts:6 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\workers\maintenance-worker.ts:7 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\workers\maintenance-worker.ts:12 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\workers\notification-worker.ts:6 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\workers\notification-worker.ts:7 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\workers\notification-worker.ts:12 pushRuntimeEntry({
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:10 pushRuntimeEntry,
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:11 } from "@/core/runtime/runtime-timeline";
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:16 pushRuntimeEntry({
C:\Users\Admin\terragest\src\domains\paiement\rules\registerPaiementRules.ts:3 import { RulePipelineRuntime }
C:\Users\Admin\terragest\src\domains\paiement\rules\registerPaiementRules.ts:4 from "@/platform/rules/runtime/RulePipelineRuntime";
C:\Users\Admin\terragest\src\domains\paiement\rules\registerPaiementRules.ts:11 RulePipelineRuntime.register(
C:\Users\Admin\terragest\src\domains\stock\rules\registerStockRules.ts:3 import { RulePipelineRuntime }
C:\Users\Admin\terragest\src\domains\stock\rules\registerStockRules.ts:4 from "@/platform/rules/runtime/RulePipelineRuntime";
C:\Users\Admin\terragest\src\domains\stock\rules\registerStockRules.ts:11 RulePipelineRuntime.register(
C:\Users\Admin\terragest\src\domains\stock\services\StockService.ts:3 import { ModuleRuntime }
C:\Users\Admin\terragest\src\domains\stock\services\StockService.ts:4 from "@/platform/modules/runtime/ModuleRuntime";
C:\Users\Admin\terragest\src\domains\stock\services\StockService.ts:15 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\features\achats\achats.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\analytics\services\DashboardAnalyticsService.ts:11 runtimeHealth: "healthy",
C:\Users\Admin\terragest\src\features\clients\clients.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\commandes\commandes.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\depenses\depenses.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\devis\devis.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\employes\employes.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\exploitations\exploitations.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\factures\factures.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\fournisseurs\fournisseurs.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\fournisseurs\runtime\EnterpriseFournisseursFlow.ts:2 RuntimeModuleOrchestrator
C:\Users\Admin\terragest\src\features\fournisseurs\runtime\EnterpriseFournisseursFlow.ts:4 from "@/runtime/orchestration/RuntimeModuleOrchestrator";
C:\Users\Admin\terragest\src\features\fournisseurs\runtime\EnterpriseFournisseursFlow.ts:7 RuntimeEventRegistry
C:\Users\Admin\terragest\src\features\fournisseurs\runtime\EnterpriseFournisseursFlow.ts:9 from "@/runtime/events/RuntimeEventRegistry";
C:\Users\Admin\terragest\src\features\fournisseurs\runtime\EnterpriseFournisseursFlow.ts:13 new RuntimeModuleOrchestrator();
C:\Users\Admin\terragest\src\features\fournisseurs\runtime\EnterpriseFournisseursFlow.ts:20 RuntimeEventRegistry.FOURNISSEURS_CREATED,
C:\Users\Admin\terragest\src\features\incidents\incidents.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\interventions\interventions.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\intrants\intrants.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\livraisons\livraisons.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\materiels\materiels.feature.ts:15 "runtime",
C:\Users\Admin\terragest\src\features\materiels\dashboard\MaterielsDashboard.tsx:35 to runtime platform.
C:\Users\Admin\terragest\src\features\materiels\events\MaterielEvents.ts:2 RuntimeEventRegistry
C:\Users\Admin\terragest\src\features\materiels\events\MaterielEvents.ts:4 from "@/runtime/events/RuntimeEventRegistry";
C:\Users\Admin\terragest\src\features\materiels\events\MaterielEvents.ts:7 RuntimeEventRegistry
C:\Users\Admin\terragest\src\features\materiels\events\MaterielEvents.ts:9 from "@/runtime/events/RuntimeEventRegistry";
C:\Users\Admin\terragest\src\features\materiels\events\MaterielEvents.ts:16 } = RuntimeEventRegistry;
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:2 RuntimeRealtimeGateway
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:4 from "../../../runtime/realtime/gateway/RuntimeRealtimeGateway";
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:10 new RuntimeRealtimeGateway();
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:17 RuntimeModuleOrchestrator
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:19 from "@/runtime/orchestration/RuntimeModuleOrchestrator";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:24 from "@/runtime/workflows/engine/WorkflowExecutor";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:34 from "@/runtime/rules/registry/RuleRegistry";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:39 from "@/runtime/rules/engine/RuleExecutor";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:44 from "@/runtime/rules/MaterielCriticalRule";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:49 from "@/runtime/automation/runner/AutomationRunner";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:54 from "@/runtime/automation/scheduler/AutomationScheduler";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:58 RuntimeSecurityManager
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:60 from "@/runtime/security/RuntimeSecurityManager";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:71 from "@/runtime/automation/rules/MaterielBreakdownRule";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:74 RuntimeEvent
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:76 from "@/runtime/core/types/RuntimeEvent";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:81 new RuntimeModuleOrchestrator();
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:87 new RuntimeSecurityManager();
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:134 const runtimeEvent: RuntimeEvent = {
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:148 runtimeEvent
C:\Users\Admin\terragest\src\features\materiels\runtime\MaterielRuntimeHook.ts:2 PersistentRuntimePublisher
C:\Users\Admin\terragest\src\features\materiels\runtime\MaterielRuntimeHook.ts:4 from "../../../runtime/monitoring/PersistentRuntimePublisher";
C:\Users\Admin\terragest\src\features\materiels\runtime\MaterielRuntimeHook.ts:7 MaterielRuntimeHook {
C:\Users\Admin\terragest\src\features\materiels\runtime\MaterielRuntimeHook.ts:9 private runtime =
C:\Users\Admin\terragest\src\features\materiels\runtime\MaterielRuntimeHook.ts:10 new PersistentRuntimePublisher();
C:\Users\Admin\terragest\src\features\materiels\runtime\MaterielRuntimeHook.ts:17 await this.runtime.publish(
C:\Users\Admin\terragest\src\features\materiels\ui\MaterielsDashboard.tsx:35 to runtime platform.
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:4 from "@/runtime/workflows/types/WorkflowDefinition";
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:38 "REGISTER_RUNTIME_EVENT",
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:41 "Register Runtime Event",
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:48 "[Workflow] Register Runtime Event",
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\observability\components\RuntimeStatusCard.tsx:1 import { useRuntimeHealth }
C:\Users\Admin\terragest\src\features\observability\components\RuntimeStatusCard.tsx:2 from "../hooks/useRuntimeHealth";
C:\Users\Admin\terragest\src\features\observability\components\RuntimeStatusCard.tsx:5 RuntimeStatusCard() {
C:\Users\Admin\terragest\src\features\observability\components\RuntimeStatusCard.tsx:8 useRuntimeHealth();
C:\Users\Admin\terragest\src\features\observability\components\RuntimeStatusCard.tsx:22 Runtime Status
C:\Users\Admin\terragest\src\features\observability\dashboards\LiveRuntimeDashboard.tsx:3 export default function LiveRuntimeDashboard() {
C:\Users\Admin\terragest\src\features\observability\dashboards\LiveRuntimeDashboard.tsx:7 Live Runtime Dashboard
C:\Users\Admin\terragest\src\features\observability\dashboards\LiveRuntimeDashboard.tsx:11 Monitoring temps réel du runtime ERP Terragest.
C:\Users\Admin\terragest\src\features\observability\dashboards\RuntimeHealthDashboard.tsx:1 import RuntimeStatusCard
C:\Users\Admin\terragest\src\features\observability\dashboards\RuntimeHealthDashboard.tsx:2 from "../components/RuntimeStatusCard";
C:\Users\Admin\terragest\src\features\observability\dashboards\RuntimeHealthDashboard.tsx:14 RuntimeHealthDashboard() {
C:\Users\Admin\terragest\src\features\observability\dashboards\RuntimeHealthDashboard.tsx:25 <RuntimeStatusCard />
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:4 import type { RuntimeHealth }
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:5 from "../types/RuntimeHealth";
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:7 import { RuntimeObservabilityService }
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:8 from "../services/RuntimeObservabilityService";
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:10 export function useRuntimeHealth() {
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:13 useState<RuntimeHealth | null>(
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:20 new RuntimeObservabilityService();
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:23 .getRuntimeHealth()
C:\Users\Admin\terragest\src\features\observability\services\RuntimeObservabilityService.ts:1 import type { RuntimeHealth }
C:\Users\Admin\terragest\src\features\observability\services\RuntimeObservabilityService.ts:2 from "../types/RuntimeHealth";
C:\Users\Admin\terragest\src\features\observability\services\RuntimeObservabilityService.ts:4 export class RuntimeObservabilityService {
C:\Users\Admin\terragest\src\features\observability\services\RuntimeObservabilityService.ts:6 async getRuntimeHealth():
C:\Users\Admin\terragest\src\features\observability\services\RuntimeObservabilityService.ts:7 Promise<RuntimeHealth> {
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:15 type LiveRuntimeEvent,
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:34 subscribeToRuntimeEvents() {
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:36 const runtimeEventsQuery =
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:40 "runtime_events"
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:50 runtimeEventsQuery,
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:76 } satisfies LiveRuntimeEvent;
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:28 "runtime_workflow_executions"
C:\Users\Admin\terragest\src\features\observability\stores\observabilityStore.ts:3 runtimeStatus: "HEALTHY",
C:\Users\Admin\terragest\src\features\observability\stores\live\liveEventStore.ts:1 export type LiveRuntimeEvent = {
C:\Users\Admin\terragest\src\features\observability\stores\live\liveEventStore.ts:10 private events: LiveRuntimeEvent[] = [];
C:\Users\Admin\terragest\src\features\observability\stores\live\liveEventStore.ts:14 push(event: LiveRuntimeEvent) {
C:\Users\Admin\terragest\src\features\observability\stores\live\liveEventStore.ts:28 replaceAll(events: LiveRuntimeEvent[]) {
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:4 from "@/runtime/workflows/types/WorkflowExecution";
C:\Users\Admin\terragest\src\features\observability\types\RuntimeHealth.ts:1 export type RuntimeHealth = {
C:\Users\Admin\terragest\src\features\observability\widgets\EventStream.tsx:19 Runtime events will appear here.
C:\Users\Admin\terragest\src\features\observability\widgets\live\DeadLetterFeed.tsx:25 Failed runtime events
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:34 service.subscribeToRuntimeEvents();
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:73 Aucun événement runtime pour le moment.
C:\Users\Admin\terragest\src\features\parcelles\parcelles.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\platform\components\navigation\EnterpriseSidebar.tsx:15 "Runtime",
C:\Users\Admin\terragest\src\features\platform\components\notifications\NotificationCenter.tsx:26 Runtime notifications
C:\Users\Admin\terragest\src\features\platform\components\runtime\RealtimeActivityPanel.tsx:22 Realtime Runtime Stream
C:\Users\Admin\terragest\src\features\platform\components\runtime\RealtimeActivityPanel.tsx:26 Live runtime stream
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeActivityFeed.tsx:2 runtimeActivityStore
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeActivityFeed.tsx:4 from "./runtimeActivityStore";
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeActivityFeed.tsx:7 RuntimeActivityFeed() {
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeActivityFeed.tsx:10 runtimeActivityStore.getAll();
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeActivityFeed.tsx:30 Runtime Activity
C:\Users\Admin\terragest\src\features\platform\components\runtime\runtimeActivityStore.ts:1 export type RuntimeActivity = {
C:\Users\Admin\terragest\src\features\platform\components\runtime\runtimeActivityStore.ts:10 class RuntimeActivityStore {
C:\Users\Admin\terragest\src\features\platform\components\runtime\runtimeActivityStore.ts:13 RuntimeActivity[] = [];
C:\Users\Admin\terragest\src\features\platform\components\runtime\runtimeActivityStore.ts:16 activity: RuntimeActivity
C:\Users\Admin\terragest\src\features\platform\components\runtime\runtimeActivityStore.ts:30 export const runtimeActivityStore =
C:\Users\Admin\terragest\src\features\platform\components\runtime\runtimeActivityStore.ts:31 new RuntimeActivityStore();
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeConsole.tsx:5 RuntimeConsole() {
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeMetricsPanel.tsx:2 RuntimeMetricsPanel() {
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeMetricsPanel.tsx:21 Runtime Metrics
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:1 import RuntimeActivityFeed
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:2 from "../components/runtime/RuntimeActivityFeed";
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:5 from "../components/runtime/WorkflowStatusPanel";
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:7 import RuntimeMetricsPanel
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:8 from "../components/runtime/RuntimeMetricsPanel";
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:14 ConnectedRuntimeDashboard() {
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:27 <RuntimeMetricsPanel />
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:31 <RuntimeActivityFeed />
C:\Users\Admin\terragest\src\features\platform\dashboards\EnterpriseSupervisionDashboard.tsx:1 import LiveRuntimeDashboard
C:\Users\Admin\terragest\src\features\platform\dashboards\EnterpriseSupervisionDashboard.tsx:2 from "../../observability/dashboards/LiveRuntimeDashboard";
C:\Users\Admin\terragest\src\features\platform\dashboards\EnterpriseSupervisionDashboard.tsx:21 <LiveRuntimeDashboard />
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:1 import RuntimeMetricsPanel
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:2 from "../components/runtime/RuntimeMetricsPanel";
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:5 from "../components/runtime/WorkflowStatusPanel";
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:8 from "../components/runtime/RealtimeActivityPanel";
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:14 RealtimeRuntimeDashboard() {
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:27 <RuntimeMetricsPanel />
C:\Users\Admin\terragest\src\features\platform\workspace\ConnectedEnterpriseWorkspace.tsx:7 import ConnectedRuntimeDashboard
C:\Users\Admin\terragest\src\features\platform\workspace\ConnectedEnterpriseWorkspace.tsx:8 from "../dashboards/ConnectedRuntimeDashboard";
C:\Users\Admin\terragest\src\features\platform\workspace\ConnectedEnterpriseWorkspace.tsx:40 <ConnectedRuntimeDashboard />
C:\Users\Admin\terragest\src\features\produits\produits.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\recettes\recettes.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\recoltes\recoltes.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\runtime-supervision\RuntimeSupervisionDashboard.tsx:6 from "@/runtime/notifications/ERPNotificationsPanel";
C:\Users\Admin\terragest\src\features\runtime-supervision\RuntimeSupervisionDashboard.tsx:9 RuntimeLogsPanel,
C:\Users\Admin\terragest\src\features\runtime-supervision\RuntimeSupervisionDashboard.tsx:11 from "@/runtime/observability/RuntimeLogsPanel";
C:\Users\Admin\terragest\src\features\runtime-supervision\RuntimeSupervisionDashboard.tsx:13 export function RuntimeSupervisionDashboard() {
C:\Users\Admin\terragest\src\features\runtime-supervision\RuntimeSupervisionDashboard.tsx:32 Runtime Supervision
C:\Users\Admin\terragest\src\features\runtime-supervision\RuntimeSupervisionDashboard.tsx:41 Supervision temps réel du runtime ERP
C:\Users\Admin\terragest\src\features\runtime-supervision\RuntimeSupervisionDashboard.tsx:57 <RuntimeLogsPanel />
C:\Users\Admin\terragest\src\features\stocks\stocks.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\taches\taches.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\terrains\terrains.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\features\vehicules\vehicules.feature.ts:26 "runtime",
C:\Users\Admin\terragest\src\hooks\runtime\useRuntimeChannel.ts:9 subscribeRuntimeChannel,
C:\Users\Admin\terragest\src\hooks\runtime\useRuntimeChannel.ts:10 } from "@/core/realtime/runtime-realtime-channel";
C:\Users\Admin\terragest\src\hooks\runtime\useRuntimeChannel.ts:12 export function useRuntimeChannel(
C:\Users\Admin\terragest\src\hooks\runtime\useRuntimeChannel.ts:20 subscribeRuntimeChannel(
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:13 } from "@/runtime/modules";
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:56 "runtime",
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:86 function toRuntimeFeature(
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:137 const runtimeFeatures =
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:139 toRuntimeFeature
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:144 ...runtimeFeatures,
C:\Users\Admin\terragest\src\platform\factories\createModuleService.ts:3 import { ModuleRuntime }
C:\Users\Admin\terragest\src\platform\factories\createModuleService.ts:4 from "@/platform/modules/runtime/ModuleRuntime";
C:\Users\Admin\terragest\src\platform\factories\createModuleService.ts:19 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:1 // src/platform/governance/GovernanceRuntime.ts
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:14 import { RuntimePoliciesEngine }
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:15 from "@/platform/governance/policies/engine/RuntimePoliciesEngine";
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:17 export class GovernanceRuntime {
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:48 RuntimePoliciesEngine.validate(
C:\Users\Admin\terragest\src\platform\governance\registerPolicies.ts:6 import { DefaultRuntimePolicy }
C:\Users\Admin\terragest\src\platform\governance\registerPolicies.ts:7 from "@/platform/governance/policies/DefaultRuntimePolicy";
C:\Users\Admin\terragest\src\platform\governance\registerPolicies.ts:12 DefaultRuntimePolicy
C:\Users\Admin\terragest\src\platform\governance\policies\DefaultRuntimePolicy.ts:1 // src/platform/governance/policies/DefaultRuntimePolicy.ts
C:\Users\Admin\terragest\src\platform\governance\policies\DefaultRuntimePolicy.ts:4 RuntimePolicy
C:\Users\Admin\terragest\src\platform\governance\policies\DefaultRuntimePolicy.ts:6 from "@/platform/governance/policies/types/RuntimePolicy";
C:\Users\Admin\terragest\src\platform\governance\policies\DefaultRuntimePolicy.ts:8 export const DefaultRuntimePolicy:
C:\Users\Admin\terragest\src\platform\governance\policies\DefaultRuntimePolicy.ts:9 RuntimePolicy = {
C:\Users\Admin\terragest\src\platform\governance\policies\DefaultRuntimePolicy.ts:12 "default-runtime-policy",
C:\Users\Admin\terragest\src\platform\governance\policies\engine\RuntimePoliciesEngine.ts:1 // src/platform/governance/policies/engine/RuntimePoliciesEngine.ts
C:\Users\Admin\terragest\src\platform\governance\policies\engine\RuntimePoliciesEngine.ts:11 export class RuntimePoliciesEngine {
C:\Users\Admin\terragest\src\platform\governance\policies\registry\PolicyRegistry.ts:4 RuntimePolicy
C:\Users\Admin\terragest\src\platform\governance\policies\registry\PolicyRegistry.ts:6 from "@/platform/governance/policies/types/RuntimePolicy";
C:\Users\Admin\terragest\src\platform\governance\policies\registry\PolicyRegistry.ts:11 RuntimePolicy[] = [];
C:\Users\Admin\terragest\src\platform\governance\policies\registry\PolicyRegistry.ts:14 policy: RuntimePolicy
C:\Users\Admin\terragest\src\platform\governance\policies\types\RuntimePolicy.ts:1 // src/platform/governance/policies/types/RuntimePolicy.ts
C:\Users\Admin\terragest\src\platform\governance\policies\types\RuntimePolicy.ts:8 export interface RuntimePolicy {
C:\Users\Admin\terragest\src\platform\intelligence\OperationalIntelligenceScheduler.ts:3 import { RuntimeAnomalyDetector }
C:\Users\Admin\terragest\src\platform\intelligence\OperationalIntelligenceScheduler.ts:4 from "@/platform/intelligence/RuntimeAnomalyDetector";
C:\Users\Admin\terragest\src\platform\intelligence\OperationalIntelligenceScheduler.ts:20 RuntimeAnomalyDetector
C:\Users\Admin\terragest\src\platform\intelligence\RuntimeAnomalyDetector.ts:1 // src/platform/intelligence/RuntimeAnomalyDetector.ts
C:\Users\Admin\terragest\src\platform\intelligence\RuntimeAnomalyDetector.ts:6 export class RuntimeAnomalyDetector {
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:1 // src/platform/modules/runtime/ModuleRuntime.ts
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:11 import { RulePipelineRuntime }
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:12 from "@/platform/rules/runtime/RulePipelineRuntime";
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:17 import { WorkflowRuntime }
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:18 from "@/platform/workflows/runtime/WorkflowRuntime";
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:26 import { GovernanceRuntime }
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:27 from "@/platform/governance/GovernanceRuntime";
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:29 export class ModuleRuntime {
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:35 GovernanceRuntime.validate({
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:50 await RulePipelineRuntime.execute(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:123 await RulePipelineRuntime.execute(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:150 GovernanceRuntime.validate({
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:165 await RulePipelineRuntime.execute(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:199 await RulePipelineRuntime.execute(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:226 GovernanceRuntime.validate({
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:241 await RulePipelineRuntime.execute(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:275 await RulePipelineRuntime.execute(
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:1 // src/platform/persistence/RuntimePersistenceService.ts
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:6 import { RuntimeSnapshotStore }
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:7 from "@/platform/persistence/RuntimeSnapshotStore";
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:9 export class RuntimePersistenceService {
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:13 RuntimeSnapshotStore.save({
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:25 RuntimeSnapshotStore
C:\Users\Admin\terragest\src\platform\persistence\RuntimeRecoveryScheduler.ts:1 // src/platform/persistence/RuntimeRecoveryScheduler.ts
C:\Users\Admin\terragest\src\platform\persistence\RuntimeRecoveryScheduler.ts:3 import { RuntimePersistenceService }
C:\Users\Admin\terragest\src\platform\persistence\RuntimeRecoveryScheduler.ts:4 from "@/platform/persistence/RuntimePersistenceService";
C:\Users\Admin\terragest\src\platform\persistence\RuntimeRecoveryScheduler.ts:6 export class RuntimeRecoveryScheduler {
C:\Users\Admin\terragest\src\platform\persistence\RuntimeRecoveryScheduler.ts:17 RuntimePersistenceService
C:\Users\Admin\terragest\src\platform\persistence\RuntimeSnapshotStore.ts:1 // src/platform/persistence/RuntimeSnapshotStore.ts
C:\Users\Admin\terragest\src\platform\persistence\RuntimeSnapshotStore.ts:8 export interface RuntimeSnapshot {
C:\Users\Admin\terragest\src\platform\persistence\RuntimeSnapshotStore.ts:15 class RuntimeSnapshotStoreManager {
C:\Users\Admin\terragest\src\platform\persistence\RuntimeSnapshotStore.ts:18 RuntimeSnapshot[] = [];
C:\Users\Admin\terragest\src\platform\persistence\RuntimeSnapshotStore.ts:21 snapshot: RuntimeSnapshot
C:\Users\Admin\terragest\src\platform\persistence\RuntimeSnapshotStore.ts:45 export const RuntimeSnapshotStore =
C:\Users\Admin\terragest\src\platform\persistence\RuntimeSnapshotStore.ts:46 new RuntimeSnapshotStoreManager();
C:\Users\Admin\terragest\src\platform\policies\engine\PolicyEngine.ts:3 RuntimePolicyContext,
C:\Users\Admin\terragest\src\platform\policies\engine\PolicyEngine.ts:23 RuntimePolicyContext
C:\Users\Admin\terragest\src\platform\policies\rules\MaintenancePolicy.ts:3 RuntimePolicyContext,
C:\Users\Admin\terragest\src\platform\policies\rules\MaintenancePolicy.ts:19 RuntimePolicyContext
C:\Users\Admin\terragest\src\platform\policies\types\Policy.ts:1 export type RuntimePolicyContext = {
C:\Users\Admin\terragest\src\platform\policies\types\Policy.ts:16 context: RuntimePolicyContext
C:\Users\Admin\terragest\src\platform\registry\FeatureDefinition.ts:3 | "runtime"
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:1 // src/platform/rules/runtime/RulePipelineRuntime.ts
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:25 class RulePipelineRuntimeManager {
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:66 "[PIPELINE RUNTIME]",
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:120 export const RulePipelineRuntime =
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:121 new RulePipelineRuntimeManager();
C:\Users\Admin\terragest\src\platform\runtime\RuntimeBootstrap.ts:1 // src/platform/runtime/RuntimeBootstrap.ts
C:\Users\Admin\terragest\src\platform\runtime\RuntimeBootstrap.ts:6 export class RuntimeBootstrap {
C:\Users\Admin\terragest\src\platform\runtime\RuntimeBootstrap.ts:11 "[BOOTSTRAP] Runtime initialization"
C:\Users\Admin\terragest\src\platform\runtime\RuntimeBootstrap.ts:19 "[BOOTSTRAP] Runtime realtime ready"
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:22 "runtime",
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:1 // src/platform/workflows/runtime/WorkflowRuntime.ts
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:9 export class WorkflowRuntime {
C:\Users\Admin\terragest\src\runtime\production.ts:3 export type LegacyRuntimeStatus =
C:\Users\Admin\terragest\src\runtime\production.ts:9 export const RuntimeHealthMonitor = {
C:\Users\Admin\terragest\src\runtime\production.ts:13 key: "runtime",
C:\Users\Admin\terragest\src\runtime\production.ts:14 scope: "runtime",
C:\Users\Admin\terragest\src\runtime\production.ts:15 label: "Runtime ERP",
C:\Users\Admin\terragest\src\runtime\production.ts:17 message: "Runtime operationnel",
C:\Users\Admin\terragest\src\runtime\production.ts:18 description: "Runtime ERP operationnel.",
C:\Users\Admin\terragest\src\runtime\production.ts:34 description: "Security runtime actif.",
C:\Users\Admin\terragest\src\runtime\production.ts:48 key: "runtime-registry",
C:\Users\Admin\terragest\src\runtime\production.ts:50 label: "Runtime Registry",
C:\Users\Admin\terragest\src\runtime\production.ts:88 key: "runtime-backup",
C:\Users\Admin\terragest\src\runtime\production.ts:89 label: "Runtime Backup",
C:\Users\Admin\terragest\src\runtime\production.ts:90 target: "runtime collections",
C:\Users\Admin\terragest\src\runtime\production.ts:197 message: "Runtime monitoring active",
C:\Users\Admin\terragest\src\runtime\production.ts:234 export const RuntimeErrorReporter = {
C:\Users\Admin\terragest\src\runtime\production.ts:235 capture(error: unknown, source = "runtime") {
C:\Users\Admin\terragest\src\runtime\actions\ERPActionRegistry.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\ai\ERPAISnapshot.ts:4 import { searchERPRuntime } from "./search/ERPSemanticRuntimeSearch";
C:\Users\Admin\terragest\src\runtime\ai\ERPAISnapshot.ts:18 searchERPRuntime("materiels");
C:\Users\Admin\terragest\src\runtime\ai\index.ts:11 export * from "./search/ERPSemanticRuntimeSearch";
C:\Users\Admin\terragest\src\runtime\ai\anomalies\ERPAIAnomalyDetector.ts:1 import { getERPMonitoringSnapshot } from "@/runtime/monitoring";
C:\Users\Admin\terragest\src\runtime\ai\assistant\ERPAIAssistantEngine.ts:12 content: "AI Runtime Assistant initialise sur le contexte ERP Terragest.",
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsightEngine.ts:1 import { ERPRegistry } from "@/runtime/registry";
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsightEngine.ts:2 import { getERPMonitoringSnapshot } from "@/runtime/monitoring";
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsightEngine.ts:16 title: "Couverture runtime elevee",
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsightEngine.ts:18 module: "runtime",
C:\Users\Admin\terragest\src\runtime\ai\search\ERPSemanticRuntimeSearch.ts:1 import { ERPRegistry } from "@/runtime/registry";
C:\Users\Admin\terragest\src\runtime\ai\search\ERPSemanticRuntimeSearch.ts:4 export function searchERPRuntime(
C:\Users\Admin\terragest\src\runtime\ai\search\ERPSemanticRuntimeSearch.ts:19 source: "Runtime Registry",
C:\Users\Admin\terragest\src\runtime\ai\search\ERPSemanticRuntimeSearch.ts:23 "Module ERP runtime.",
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:3 } from "@/runtime/events/bus/ERPEventBus";
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:11 export function seedERPRuntimeAutomation() {
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:26 actor: "automation-runtime",
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:42 actor: "payments-runtime",
C:\Users\Admin\terragest\src\runtime\automation\index.ts:5 export * from "./seedERPRuntimeAutomation";
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomation.ts:1 export interface RuntimeAutomation {
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:2 runtimeAutomations,
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:4 from "@/runtime/automation/runtimeAutomations";
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:6 export class RuntimeAutomationEngine {
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:12 runtimeAutomations
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:2 RuntimeAutomation,
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:4 from "@/runtime/automation/RuntimeAutomation";
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:7 RuntimeNotificationEngine,
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:9 from "@/runtime/notifications/RuntimeNotificationEngine";
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:11 export const runtimeAutomations:
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:12 RuntimeAutomation[] = [
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:38 await RuntimeNotificationEngine
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:83 await RuntimeNotificationEngine
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:9 export function seedERPRuntimeAutomation() {
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:12 action: "Runtime automation initialized",
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:16 module: "runtime",
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:22 title: "Automation runtime",
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:23 message: "Le runtime automation ERP est initialisé.",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:3 } from "@/runtime/events/bus/ERPEventBus";
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:7 } from "@/runtime/events/ERPDomainEvent";
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:23 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:26 ERPRuntimeHooks,
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:27 } from "../hooks/ERPRuntimeHooks";
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:118 ERPRuntimeHooks.trigger(
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:3 } from "@/runtime/events/ERPDomainEvent";
C:\Users\Admin\terragest\src\runtime\automation\hooks\ERPRuntimeHooks.ts:3 } from "@/runtime/events/ERPDomainEvent";
C:\Users\Admin\terragest\src\runtime\automation\hooks\ERPRuntimeHooks.ts:5 type ERPRuntimeHook =
C:\Users\Admin\terragest\src\runtime\automation\hooks\ERPRuntimeHooks.ts:8 class ERPRuntimeHooksClass {
C:\Users\Admin\terragest\src\runtime\automation\hooks\ERPRuntimeHooks.ts:11 ERPRuntimeHook[] = [];
C:\Users\Admin\terragest\src\runtime\automation\hooks\ERPRuntimeHooks.ts:14 hook: ERPRuntimeHook
C:\Users\Admin\terragest\src\runtime\automation\hooks\ERPRuntimeHooks.ts:34 export const ERPRuntimeHooks =
C:\Users\Admin\terragest\src\runtime\automation\hooks\ERPRuntimeHooks.ts:35 new ERPRuntimeHooksClass();
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:7 RuntimeEventRegistry
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:9 from "@/runtime/events/RuntimeEventRegistry";
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:25 RuntimeEventRegistry.MATERIEL_CREATED,
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:3 RuntimeEvent
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:5 from "@/runtime/core/types/RuntimeEvent";
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:24 event: RuntimeEvent
C:\Users\Admin\terragest\src\runtime\automation\triggers\AutomationTrigger.ts:2 RuntimeEvent
C:\Users\Admin\terragest\src\runtime\automation\triggers\AutomationTrigger.ts:4 from "@/runtime/core/types/RuntimeEvent";
C:\Users\Admin\terragest\src\runtime\automation\triggers\AutomationTrigger.ts:15 event: RuntimeEvent
C:\Users\Admin\terragest\src\runtime\automation\types\Automation.ts:2 RuntimeEvent
C:\Users\Admin\terragest\src\runtime\automation\types\Automation.ts:4 from "@/runtime/core/types/RuntimeEvent";
C:\Users\Admin\terragest\src\runtime\automation\types\Automation.ts:7 event: RuntimeEvent;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:1 import { AutomationRuntimeRegistry } from "./AutomationRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:2 import { AutomationRuntimeTriggerEngine } from "./AutomationRuntimeTriggerEngine";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:3 import { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:4 import { AutomationRuntimeExecutor } from "./AutomationRuntimeExecutor";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:6 export class AutomationRuntimeEngine {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:11 const rules = AutomationRuntimeRegistry.forModule(moduleKey);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:15 AutomationRuntimeTriggerEngine.matches(rule, payload)
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:17 .map((rule) => AutomationRuntimeQueue.enqueue(rule));
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:23 const jobs = AutomationRuntimeQueue.pending();
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:26 await AutomationRuntimeExecutor.execute(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:29 return AutomationRuntimeQueue.all();
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:33 const rule = AutomationRuntimeRegistry.get(ruleKey);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:39 const job = AutomationRuntimeQueue.enqueue(rule);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:41 return AutomationRuntimeExecutor.execute(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:2 AutomationRuntimeAction,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:3 AutomationRuntimeJob,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:4 } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:5 import { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:7 export class AutomationRuntimeExecutor {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:9 action: AutomationRuntimeAction,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:10 job: AutomationRuntimeJob
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:20 static async execute(job: AutomationRuntimeJob): Promise<AutomationRuntimeJob> {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:24 AutomationRuntimeQueue.update(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:28 await AutomationRuntimeExecutor.executeAction(action, job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:34 return AutomationRuntimeQueue.update(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:40 return AutomationRuntimeQueue.moveToDeadLetter(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:45 return AutomationRuntimeQueue.update(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:2 AutomationRuntimeJob,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:3 AutomationRuntimeRule,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:4 } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:6 const queue: AutomationRuntimeJob[] = [];
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:7 const deadLetters: AutomationRuntimeJob[] = [];
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:9 export class AutomationRuntimeQueue {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:10 static enqueue(rule: AutomationRuntimeRule): AutomationRuntimeJob {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:13 const job: AutomationRuntimeJob = {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:30 static all(): AutomationRuntimeJob[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:34 static pending(): AutomationRuntimeJob[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:38 static update(job: AutomationRuntimeJob): AutomationRuntimeJob {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:50 static moveToDeadLetter(job: AutomationRuntimeJob): AutomationRuntimeJob {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:56 AutomationRuntimeQueue.update(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:61 static deadLetters(): AutomationRuntimeJob[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:1 import type { AutomationRuntimeRule } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:2 import { automationRuntimeRules } from "./AutomationRuntimeRules";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:4 export class AutomationRuntimeRegistry {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:5 static all(): AutomationRuntimeRule[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:6 return automationRuntimeRules;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:9 static forModule(moduleKey: string): AutomationRuntimeRule[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:10 return automationRuntimeRules.filter(
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:15 static get(ruleKey: string): AutomationRuntimeRule | undefined {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:16 return automationRuntimeRules.find((rule) => rule.key === ruleKey);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:1 import type { AutomationRuntimeRule } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:3 export const automationRuntimeRules: AutomationRuntimeRule[] = [
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeScheduler.ts:1 import { AutomationRuntimeEngine } from "./AutomationRuntimeEngine";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeScheduler.ts:3 export class AutomationRuntimeScheduler {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeScheduler.ts:5 return AutomationRuntimeEngine.runPending();
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:2 AutomationRuntimeRule,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:3 AutomationRuntimeTrigger,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:4 } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:8 operator: AutomationRuntimeTrigger["operator"],
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:30 export class AutomationRuntimeTriggerEngine {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:32 rule: AutomationRuntimeRule,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:1 export type AutomationRuntimeTriggerType =
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:8 export type AutomationRuntimeJobStatus =
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:15 export interface AutomationRuntimeTrigger {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:16 type: AutomationRuntimeTriggerType;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:22 export interface AutomationRuntimeAction {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:34 export interface AutomationRuntimeRule {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:39 trigger: AutomationRuntimeTrigger;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:40 actions: AutomationRuntimeAction[];
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:44 export interface AutomationRuntimeJob {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:48 status: AutomationRuntimeJobStatus;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:54 actions: AutomationRuntimeAction[];
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:2 AutomationRuntimeAction,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:3 AutomationRuntimeJob,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:4 AutomationRuntimeJobStatus,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:5 AutomationRuntimeRule,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:6 AutomationRuntimeTrigger,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:7 AutomationRuntimeTriggerType,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:8 } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:10 export { automationRuntimeRules } from "./AutomationRuntimeRules";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:11 export { AutomationRuntimeRegistry } from "./AutomationRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:12 export { AutomationRuntimeTriggerEngine } from "./AutomationRuntimeTriggerEngine";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:13 export { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:14 export { AutomationRuntimeExecutor } from "./AutomationRuntimeExecutor";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:15 export { AutomationRuntimeEngine } from "./AutomationRuntimeEngine";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:16 export { AutomationRuntimeScheduler } from "./AutomationRuntimeScheduler";
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:10 import { RuntimeMetrics }
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:11 from "../metrics/RuntimeMetrics";
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:32 bootstrapEnterpriseRuntime() {
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:35 "[EnterpriseRuntime] bootstrapping..."
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:48 new RuntimeMetrics();
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:71 "[EnterpriseRuntime] initialized"
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapRuntime.ts:8 bootstrapRuntime() {
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapRuntime.ts:17 "[Runtime] initialized"
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:18 initializeRuntime() {
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:35 "[Runtime] fully initialized"
C:\Users\Admin\terragest\src\runtime\bootstrap\registerBreakdownFlow.ts:31 "[Runtime] breakdown flow registered"
C:\Users\Admin\terragest\src\runtime\bootstrap\registerDomainEvents.ts:19 "[Runtime] handling breakdown",
C:\Users\Admin\terragest\src\runtime\bootstrap\registerDomainEvents.ts:26 "[Runtime] domain events registered"
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:18 "[Runtime] materiel workflows registered"
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:2 bootstrapEnterpriseRuntime
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:4 from "./bootstrapEnterpriseRuntime";
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:8 const runtime =
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:9 await bootstrapEnterpriseRuntime();
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:15 !!runtime.eventBus,
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:18 !!runtime.workflowRegistry,
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:21 !!runtime.ruleRegistry,
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:24 !!runtime.metrics,
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:27 !!runtime.analytics,
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:30 !!runtime.integrations,
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:33 !!runtime.governance,
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:36 !!runtime.supervision,
C:\Users\Admin\terragest\src\runtime\bootstrap\simulateBreakdown.ts:1 import { initializeRuntime }
C:\Users\Admin\terragest\src\runtime\bootstrap\simulateBreakdown.ts:2 from "./initializeRuntime";
C:\Users\Admin\terragest\src\runtime\bootstrap\simulateBreakdown.ts:11 const runtime =
C:\Users\Admin\terragest\src\runtime\bootstrap\simulateBreakdown.ts:12 await initializeRuntime();
C:\Users\Admin\terragest\src\runtime\bootstrap\simulateBreakdown.ts:14 runtime.eventBus.emit(
C:\Users\Admin\terragest\src\runtime\bootstrap\simulateBreakdownFlow.ts:2 bootstrapEnterpriseRuntime
C:\Users\Admin\terragest\src\runtime\bootstrap\simulateBreakdownFlow.ts:4 from "./bootstrapEnterpriseRuntime";
C:\Users\Admin\terragest\src\runtime\bootstrap\simulateBreakdownFlow.ts:18 const runtime =
C:\Users\Admin\terragest\src\runtime\bootstrap\simulateBreakdownFlow.ts:19 await bootstrapEnterpriseRuntime();
C:\Users\Admin\terragest\src\runtime\bootstrap\simulateBreakdownFlow.ts:22 runtime.eventBus
C:\Users\Admin\terragest\src\runtime\bootstrap\simulateBreakdownFlow.ts:25 runtime.eventBus.emit(
C:\Users\Admin\terragest\src\runtime\bootstrap\startEnterpriseRuntime.ts:2 bootstrapEnterpriseRuntime
C:\Users\Admin\terragest\src\runtime\bootstrap\startEnterpriseRuntime.ts:4 from "./bootstrapEnterpriseRuntime";
C:\Users\Admin\terragest\src\runtime\bootstrap\startEnterpriseRuntime.ts:8 const runtime =
C:\Users\Admin\terragest\src\runtime\bootstrap\startEnterpriseRuntime.ts:9 await bootstrapEnterpriseRuntime();
C:\Users\Admin\terragest\src\runtime\bootstrap\startEnterpriseRuntime.ts:12 "[Terragest Runtime Started]",
C:\Users\Admin\terragest\src\runtime\bootstrap\startEnterpriseRuntime.ts:13 runtime
C:\Users\Admin\terragest\src\runtime\bus\RuntimeEventBus.ts:3 class RuntimeEventBus {
C:\Users\Admin\terragest\src\runtime\bus\RuntimeEventBus.ts:23 export const runtimeEventBus =
C:\Users\Admin\terragest\src\runtime\bus\RuntimeEventBus.ts:24 new RuntimeEventBus();
C:\Users\Admin\terragest\src\runtime\business-rules\RuntimeBusinessRule.ts:1 export interface RuntimeBusinessRule {
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:2 RuntimeBusinessRule,
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:4 from "@/runtime/business-rules/RuntimeBusinessRule";
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:7 RuntimeNotificationEngine,
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:9 from "@/runtime/notifications/RuntimeNotificationEngine";
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:11 export const runtimeBusinessRules:
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:12 RuntimeBusinessRule[] = [
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:37 await RuntimeNotificationEngine
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:81 await RuntimeNotificationEngine
C:\Users\Admin\terragest\src\runtime\business-rules\RuntimeBusinessRulesEngine.ts:2 runtimeBusinessRules,
C:\Users\Admin\terragest\src\runtime\business-rules\RuntimeBusinessRulesEngine.ts:4 from "@/runtime/business-rules/runtimeBusinessRules";
C:\Users\Admin\terragest\src\runtime\business-rules\RuntimeBusinessRulesEngine.ts:6 export class RuntimeBusinessRulesEngine {
C:\Users\Admin\terragest\src\runtime\business-rules\RuntimeBusinessRulesEngine.ts:17 runtimeBusinessRules.filter(
C:\Users\Admin\terragest\src\runtime\cockpit\ERPCockpitSnapshot.ts:1 import { ERPRegistry } from "@/runtime/registry";
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:1 import type { ERPModuleDefinition } from "@/runtime/modules/ERPModuleDefinition";
C:\Users\Admin\terragest\src\runtime\computed\RuntimeComputedEngine.ts:1 export class RuntimeComputedEngine {
C:\Users\Admin\terragest\src\runtime\computed\RuntimeComputedEngine.ts:30 "RUNTIME COMPUTED ERROR",
C:\Users\Admin\terragest\src\runtime\context\RuntimeContextEngine.ts:1 export class RuntimeContextEngine {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:2 RuntimeModuleContract,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:3 RuntimeModuleId,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:4 } from "./RuntimeContracts";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:7 CoreModuleRuntimeAdapter,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:8 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";import {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:9 runtimeOrchestrator,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:10 } from "./RuntimeOrchestrator";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:13 runtimeLifecycle,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:14 } from "./RuntimeLifecycle";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:17 runtimeHealthRegistry,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:18 } from "./RuntimeHealthRegistry";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:21 runtimeAlertRegistry,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:22 } from "./RuntimeAlertRegistry";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:25 runtimeWorkerRegistry,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:26 } from "./RuntimeWorkerRegistry";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:29 runtimeQueueRegistry,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:30 } from "./RuntimeQueueRegistry";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:33 runtimeRetryRegistry,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:34 } from "./RuntimeRetryRegistry";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:37 runtimeDeadLetterQueue,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:38 } from "./RuntimeDeadLetterQueue";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:41 runtimeStreamRegistry,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:42 } from "./RuntimeStreamRegistry";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:45 runtimeScheduler,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:46 } from "./RuntimeScheduler";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:49 runtimeAuditRegistry,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:50 } from "./RuntimeAuditRegistry";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:53 runtimePolicyRegistry,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:54 } from "./RuntimePolicyRegistry";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:57 runtimeSecurityRegistry,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:58 } from "./RuntimeSecurityRegistry";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:60 export class CentralRuntimeRegistry {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:62 new Map<RuntimeModuleId, RuntimeModuleContract>();
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:67 CoreModuleRuntimeAdapter.toRuntimeModules()
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:73 registerModule(module: RuntimeModuleContract) {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:78 getModule(moduleId: RuntimeModuleId) {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:86 hasModule(moduleId: RuntimeModuleId) {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:94 getRuntimeOrchestrator() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:95 return runtimeOrchestrator;
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:98 getRuntimeLifecycle() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:100 status: runtimeLifecycle.getStatus(),
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:101 startedAt: runtimeLifecycle.getStartedAt(),
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:105 getRuntimeHealth() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:106 return runtimeHealthRegistry.getAll();
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:109 getRuntimeAlerts() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:110 return runtimeAlertRegistry.getAlerts();
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:113 getRuntimeWorkers() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:114 return runtimeWorkerRegistry.getWorkers();
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:117 getRuntimeQueues() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:118 return runtimeQueueRegistry.getJobs();
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:121 getRuntimeRetries() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:122 return runtimeRetryRegistry.getRetries();
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:125 getRuntimeDeadLetters() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:126 return runtimeDeadLetterQueue.getEvents();
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:129 getRuntimeStreams() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:130 return runtimeStreamRegistry.getStreams();
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:133 getRuntimeScheduler() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:134 return runtimeScheduler;
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:137 getRuntimeAudit() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:138 return runtimeAuditRegistry.getEntries();
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:141 getRuntimePolicies() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:142 return runtimePolicyRegistry.getPolicies();
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:145 getRuntimeSecurity() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:146 return runtimeSecurityRegistry.getRules();
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:150 export const centralRuntimeRegistry =
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:151 new CentralRuntimeRegistry();
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:153 centralRuntimeRegistry.initialize();
C:\Users\Admin\terragest\src\runtime\core\index.ts:1 export * from "./CentralRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\core\RuntimeAlertRegistry.ts:1 export interface RuntimeAlert {
C:\Users\Admin\terragest\src\runtime\core\RuntimeAlertRegistry.ts:15 export class RuntimeAlertRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeAlertRegistry.ts:18 RuntimeAlert[] = [];
C:\Users\Admin\terragest\src\runtime\core\RuntimeAlertRegistry.ts:21 alert: RuntimeAlert
C:\Users\Admin\terragest\src\runtime\core\RuntimeAlertRegistry.ts:49 export const runtimeAlertRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeAlertRegistry.ts:50 new RuntimeAlertRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeAuditRegistry.ts:1 export interface RuntimeAuditEntry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeAuditRegistry.ts:16 export class RuntimeAuditRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeAuditRegistry.ts:19 RuntimeAuditEntry[] = [];
C:\Users\Admin\terragest\src\runtime\core\RuntimeAuditRegistry.ts:22 entry: RuntimeAuditEntry
C:\Users\Admin\terragest\src\runtime\core\RuntimeAuditRegistry.ts:49 export const runtimeAuditRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeAuditRegistry.ts:50 new RuntimeAuditRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeBindings.ts:2 CoreModuleRuntimeAdapter,
C:\Users\Admin\terragest\src\runtime\core\RuntimeBindings.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\core\RuntimeBindings.ts:5 export interface RuntimeBinding {
C:\Users\Admin\terragest\src\runtime\core\RuntimeBindings.ts:14 export class RuntimeBindingsRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeBindings.ts:19 RuntimeBinding
C:\Users\Admin\terragest\src\runtime\core\RuntimeBindings.ts:27 CoreModuleRuntimeAdapter.toRuntimeBindings()
C:\Users\Admin\terragest\src\runtime\core\RuntimeBindings.ts:55 export const runtimeBindingsRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeBindings.ts:56 new RuntimeBindingsRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeBindings.ts:58 runtimeBindingsRegistry.initialize();
C:\Users\Admin\terragest\src\runtime\core\RuntimeCapabilities.ts:2 RuntimeCapability,
C:\Users\Admin\terragest\src\runtime\core\RuntimeCapabilities.ts:3 } from "./RuntimeContracts";
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:1 export type RuntimeModuleId = string;
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:3 export type RuntimeStatus =
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:10 export type RuntimeCapability =
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:28 export interface RuntimeModuleContract {
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:29 id: RuntimeModuleId;
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:33 status: RuntimeStatus;
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:34 capabilities: RuntimeCapability[];
C:\Users\Admin\terragest\src\runtime\core\RuntimeDeadLetterQueue.ts:14 export class RuntimeDeadLetterQueue {
C:\Users\Admin\terragest\src\runtime\core\RuntimeDeadLetterQueue.ts:47 export const runtimeDeadLetterQueue =
C:\Users\Admin\terragest\src\runtime\core\RuntimeDeadLetterQueue.ts:48 new RuntimeDeadLetterQueue();
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventBus.ts:2 runtimeEventStore,
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventBus.ts:3 } from "./RuntimeEventStore";
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventBus.ts:5 export interface RuntimeEvent {
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventBus.ts:16 type RuntimeEventHandler =
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventBus.ts:17 (event: RuntimeEvent) => void;
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventBus.ts:19 export class RuntimeEventBus {
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventBus.ts:24 RuntimeEventHandler[]
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventBus.ts:28 event: RuntimeEvent
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventBus.ts:31 runtimeEventStore.append(
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventBus.ts:48 handler: RuntimeEventHandler
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventBus.ts:72 export const runtimeEventBus =
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventBus.ts:73 new RuntimeEventBus();
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventStore.ts:2 RuntimeEvent,
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventStore.ts:3 } from "./RuntimeEventBus";
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventStore.ts:5 export class RuntimeEventStore {
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventStore.ts:8 RuntimeEvent[] = [];
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventStore.ts:11 event: RuntimeEvent
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventStore.ts:38 export const runtimeEventStore =
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventStore.ts:39 new RuntimeEventStore();
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventTopology.ts:2 GeneratedRuntimeTopology,
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventTopology.ts:3 } from "../generated/GeneratedRuntimeTopology";
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventTopology.ts:5 export interface RuntimeTopologyNode {
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventTopology.ts:10 export class RuntimeEventTopology {
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventTopology.ts:15 RuntimeTopologyNode
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventTopology.ts:23 GeneratedRuntimeTopology
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventTopology.ts:51 export const runtimeEventTopology =
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventTopology.ts:52 new RuntimeEventTopology();
C:\Users\Admin\terragest\src\runtime\core\RuntimeEventTopology.ts:54 runtimeEventTopology.initialize();
C:\Users\Admin\terragest\src\runtime\core\RuntimeExecutionRegistry.ts:1 export interface RuntimeExecution {
C:\Users\Admin\terragest\src\runtime\core\RuntimeExecutionRegistry.ts:20 export class RuntimeExecutionRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeExecutionRegistry.ts:23 RuntimeExecution[] = [];
C:\Users\Admin\terragest\src\runtime\core\RuntimeExecutionRegistry.ts:26 execution: RuntimeExecution
C:\Users\Admin\terragest\src\runtime\core\RuntimeExecutionRegistry.ts:58 export const runtimeExecutionRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeExecutionRegistry.ts:59 new RuntimeExecutionRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeHealthRegistry.ts:1 export interface RuntimeHealthEntry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeHealthRegistry.ts:15 export class RuntimeHealthRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeHealthRegistry.ts:20 RuntimeHealthEntry
C:\Users\Admin\terragest\src\runtime\core\RuntimeHealthRegistry.ts:24 entry: RuntimeHealthEntry
C:\Users\Admin\terragest\src\runtime\core\RuntimeHealthRegistry.ts:66 export const runtimeHealthRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeHealthRegistry.ts:67 new RuntimeHealthRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeLifecycle.ts:1 export type RuntimeLifecycleStatus =
C:\Users\Admin\terragest\src\runtime\core\RuntimeLifecycle.ts:8 export class RuntimeLifecycle {
C:\Users\Admin\terragest\src\runtime\core\RuntimeLifecycle.ts:11 RuntimeLifecycleStatus =
C:\Users\Admin\terragest\src\runtime\core\RuntimeLifecycle.ts:51 export const runtimeLifecycle =
C:\Users\Admin\terragest\src\runtime\core\RuntimeLifecycle.ts:52 new RuntimeLifecycle();
C:\Users\Admin\terragest\src\runtime\core\RuntimeMetricsRegistry.ts:1 export interface RuntimeMetric {
C:\Users\Admin\terragest\src\runtime\core\RuntimeMetricsRegistry.ts:10 export class RuntimeMetricsRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeMetricsRegistry.ts:13 RuntimeMetric[] = [];
C:\Users\Admin\terragest\src\runtime\core\RuntimeMetricsRegistry.ts:16 metric: RuntimeMetric
C:\Users\Admin\terragest\src\runtime\core\RuntimeMetricsRegistry.ts:38 export const runtimeMetricsRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeMetricsRegistry.ts:39 new RuntimeMetricsRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:2 RuntimeModuleContract,
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:3 } from "./RuntimeContracts";
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:6 RuntimeBinding,
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:7 } from "./RuntimeBindings";
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:9 export function connectRuntimeModule(
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:10 module: RuntimeModuleContract
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:11 ): RuntimeBinding {
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:1 export interface RuntimeObservabilityEntry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:12 export class RuntimeObservabilityRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:17 RuntimeObservabilityEntry
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:21 entry: RuntimeObservabilityEntry
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:47 export const runtimeObservabilityRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:48 new RuntimeObservabilityRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:2 runtimeEventBus,
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:3 } from "./RuntimeEventBus";
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:6 runtimeExecutionRegistry,
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:7 } from "./RuntimeExecutionRegistry";
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:10 runtimeQueueRegistry,
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:11 } from "./RuntimeQueueRegistry";
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:14 runtimeRetryRegistry,
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:15 } from "./RuntimeRetryRegistry";
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:18 runtimeDeadLetterQueue,
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:19 } from "./RuntimeDeadLetterQueue";
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:21 export class RuntimeOrchestrator {
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:32 runtimeExecutionRegistry.startExecution({
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:41 runtimeEventBus.emit({
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:61 runtimeQueueRegistry.enqueue({
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:75 runtimeRetryRegistry.registerRetry({
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:90 runtimeDeadLetterQueue.push({
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:101 export const runtimeOrchestrator =
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:102 new RuntimeOrchestrator();
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:2 CoreModuleRuntimeAdapter,
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:5 export class RuntimePermissionRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:18 CoreModuleRuntimeAdapter.toRuntimeBindings()
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:46 export const runtimePermissionRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:47 new RuntimePermissionRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:49 runtimePermissionRegistry.initialize();
C:\Users\Admin\terragest\src\runtime\core\RuntimePipeline.ts:1 export const ERP_RUNTIME_PIPELINE = [
C:\Users\Admin\terragest\src\runtime\core\RuntimePipeline.ts:12 export type ERPRuntimePipelineStep =
C:\Users\Admin\terragest\src\runtime\core\RuntimePipeline.ts:13 typeof ERP_RUNTIME_PIPELINE[number];
C:\Users\Admin\terragest\src\runtime\core\RuntimePolicyRegistry.ts:1 export interface RuntimePolicy {
C:\Users\Admin\terragest\src\runtime\core\RuntimePolicyRegistry.ts:14 export class RuntimePolicyRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimePolicyRegistry.ts:17 RuntimePolicy[] = [];
C:\Users\Admin\terragest\src\runtime\core\RuntimePolicyRegistry.ts:20 policy: RuntimePolicy
C:\Users\Admin\terragest\src\runtime\core\RuntimePolicyRegistry.ts:50 export const runtimePolicyRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimePolicyRegistry.ts:51 new RuntimePolicyRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeQueueRegistry.ts:1 export interface RuntimeQueueJob {
C:\Users\Admin\terragest\src\runtime\core\RuntimeQueueRegistry.ts:18 export class RuntimeQueueRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeQueueRegistry.ts:21 RuntimeQueueJob[] = [];
C:\Users\Admin\terragest\src\runtime\core\RuntimeQueueRegistry.ts:24 job: RuntimeQueueJob
C:\Users\Admin\terragest\src\runtime\core\RuntimeQueueRegistry.ts:62 export const runtimeQueueRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeQueueRegistry.ts:63 new RuntimeQueueRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeRetryRegistry.ts:1 export interface RuntimeRetryJob {
C:\Users\Admin\terragest\src\runtime\core\RuntimeRetryRegistry.ts:16 export class RuntimeRetryRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeRetryRegistry.ts:19 RuntimeRetryJob[] = [];
C:\Users\Admin\terragest\src\runtime\core\RuntimeRetryRegistry.ts:22 job: RuntimeRetryJob
C:\Users\Admin\terragest\src\runtime\core\RuntimeRetryRegistry.ts:50 export const runtimeRetryRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeRetryRegistry.ts:51 new RuntimeRetryRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeScheduler.ts:1 export interface RuntimeScheduledTask {
C:\Users\Admin\terragest\src\runtime\core\RuntimeScheduler.ts:14 export class RuntimeScheduler {
C:\Users\Admin\terragest\src\runtime\core\RuntimeScheduler.ts:17 RuntimeScheduledTask[] = [];
C:\Users\Admin\terragest\src\runtime\core\RuntimeScheduler.ts:20 task: RuntimeScheduledTask
C:\Users\Admin\terragest\src\runtime\core\RuntimeScheduler.ts:57 export const runtimeScheduler =
C:\Users\Admin\terragest\src\runtime\core\RuntimeScheduler.ts:58 new RuntimeScheduler();
C:\Users\Admin\terragest\src\runtime\core\RuntimeSecurityRegistry.ts:1 export interface RuntimeSecurityRule {
C:\Users\Admin\terragest\src\runtime\core\RuntimeSecurityRegistry.ts:22 export class RuntimeSecurityRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeSecurityRegistry.ts:25 RuntimeSecurityRule[] = [];
C:\Users\Admin\terragest\src\runtime\core\RuntimeSecurityRegistry.ts:28 rule: RuntimeSecurityRule
C:\Users\Admin\terragest\src\runtime\core\RuntimeSecurityRegistry.ts:58 export const runtimeSecurityRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeSecurityRegistry.ts:59 new RuntimeSecurityRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeStateRegistry.ts:2 CoreModuleRuntimeAdapter,
C:\Users\Admin\terragest\src\runtime\core\RuntimeStateRegistry.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\core\RuntimeStateRegistry.ts:5 export class RuntimeStateRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeStateRegistry.ts:18 CoreModuleRuntimeAdapter.toRuntimeBindings()
C:\Users\Admin\terragest\src\runtime\core\RuntimeStateRegistry.ts:46 export const runtimeStateRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeStateRegistry.ts:47 new RuntimeStateRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeStateRegistry.ts:49 runtimeStateRegistry.initialize();
C:\Users\Admin\terragest\src\runtime\core\RuntimeStreamRegistry.ts:1 export interface RuntimeStreamEvent {
C:\Users\Admin\terragest\src\runtime\core\RuntimeStreamRegistry.ts:12 export class RuntimeStreamRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeStreamRegistry.ts:17 RuntimeStreamEvent[]
C:\Users\Admin\terragest\src\runtime\core\RuntimeStreamRegistry.ts:22 event: RuntimeStreamEvent
C:\Users\Admin\terragest\src\runtime\core\RuntimeStreamRegistry.ts:53 export const runtimeStreamRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeStreamRegistry.ts:54 new RuntimeStreamRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:2 centralRuntimeRegistry,
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:3 } from "./CentralRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:5 export class RuntimeSupervisor {
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:10 "ERP Runtime Supervisor booting..."
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:15 centralRuntimeRegistry.getModuleCount()
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:20 centralRuntimeRegistry
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:33 centralRuntimeRegistry
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:34 .getRuntimeLifecycle(),
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:37 centralRuntimeRegistry
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:38 .getRuntimeHealth(),
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:41 centralRuntimeRegistry
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:42 .getRuntimeAlerts(),
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:45 centralRuntimeRegistry
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:46 .getRuntimeWorkers(),
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:49 centralRuntimeRegistry
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:50 .getRuntimeQueues(),
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:53 centralRuntimeRegistry
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:54 .getRuntimeRetries(),
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:57 centralRuntimeRegistry
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:58 .getRuntimeDeadLetters(),
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:63 export const runtimeSupervisor =
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:64 new RuntimeSupervisor();
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkerRegistry.ts:1 export interface RuntimeWorker {
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkerRegistry.ts:17 export class RuntimeWorkerRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkerRegistry.ts:20 RuntimeWorker[] = [];
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkerRegistry.ts:23 worker: RuntimeWorker
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkerRegistry.ts:53 export const runtimeWorkerRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkerRegistry.ts:54 new RuntimeWorkerRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:2 CoreModuleRuntimeAdapter,
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:5 export class RuntimeWorkflowRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:16 CoreModuleRuntimeAdapter.toRuntimeWorkflows()
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:41 export const runtimeWorkflowRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:42 new RuntimeWorkflowRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:44 runtimeWorkflowRegistry.initialize();
C:\Users\Admin\terragest\src\runtime\core\context\RuntimeContext.ts:1 export type RuntimeContext = {
C:\Users\Admin\terragest\src\runtime\core\executors\RuntimeExecutor.ts:1 import type { RuntimeEvent }
C:\Users\Admin\terragest\src\runtime\core\executors\RuntimeExecutor.ts:2 from "../types/RuntimeEvent";
C:\Users\Admin\terragest\src\runtime\core\executors\RuntimeExecutor.ts:4 import { RuntimeRegistry }
C:\Users\Admin\terragest\src\runtime\core\executors\RuntimeExecutor.ts:5 from "../registry/RuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\core\executors\RuntimeExecutor.ts:7 export class RuntimeExecutor {
C:\Users\Admin\terragest\src\runtime\core\executors\RuntimeExecutor.ts:10 private registry: RuntimeRegistry
C:\Users\Admin\terragest\src\runtime\core\executors\RuntimeExecutor.ts:14 event: RuntimeEvent
C:\Users\Admin\terragest\src\runtime\core\registry\RuntimeRegistry.ts:1 import type { RuntimeEvent }
C:\Users\Admin\terragest\src\runtime\core\registry\RuntimeRegistry.ts:2 from "../types/RuntimeEvent";
C:\Users\Admin\terragest\src\runtime\core\registry\RuntimeRegistry.ts:4 type RuntimeHandler =
C:\Users\Admin\terragest\src\runtime\core\registry\RuntimeRegistry.ts:5 (event: RuntimeEvent) => void | Promise<void>;
C:\Users\Admin\terragest\src\runtime\core\registry\RuntimeRegistry.ts:7 export class RuntimeRegistry {
C:\Users\Admin\terragest\src\runtime\core\registry\RuntimeRegistry.ts:10 new Map<string, RuntimeHandler[]>();
C:\Users\Admin\terragest\src\runtime\core\registry\RuntimeRegistry.ts:14 handler: RuntimeHandler
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:1 import { RuntimeEventPublisher }
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:2 from "../../monitoring/RuntimeEventPublisher";
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:4 import type { RuntimeContext }
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:5 from "../context/RuntimeContext";
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:7 import type { RuntimeEvent }
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:8 from "../types/RuntimeEvent";
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:10 export class RuntimePublisher {
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:13 new RuntimeEventPublisher();
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:16 event: Omit<RuntimeEvent, "timestamp">,
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:17 context?: RuntimeContext
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:20 const runtimeEvent: RuntimeEvent = {
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:31 runtimeEvent.type,
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:32 runtimeEvent
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:35 return runtimeEvent;
C:\Users\Admin\terragest\src\runtime\core\services\RuntimeSubscriber.ts:4 import type { RuntimeEvent }
C:\Users\Admin\terragest\src\runtime\core\services\RuntimeSubscriber.ts:5 from "../types/RuntimeEvent";
C:\Users\Admin\terragest\src\runtime\core\services\RuntimeSubscriber.ts:7 type RuntimeEventHandler =
C:\Users\Admin\terragest\src\runtime\core\services\RuntimeSubscriber.ts:8 (event: RuntimeEvent) => void | Promise<void>;
C:\Users\Admin\terragest\src\runtime\core\services\RuntimeSubscriber.ts:10 export class RuntimeSubscriber {
C:\Users\Admin\terragest\src\runtime\core\services\RuntimeSubscriber.ts:18 handler: RuntimeEventHandler
C:\Users\Admin\terragest\src\runtime\core\services\RuntimeSubscriber.ts:26 payload as RuntimeEvent
C:\Users\Admin\terragest\src\runtime\core\types\RuntimeEvent.ts:1 export type RuntimeEvent = {
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:2 import { RuntimeMutationEngine } from "@/runtime/mutations/RuntimeMutationEngine";
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:3 import { erpEventBus } from "@/runtime/events";
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:4 import { FirestoreRuntimeRepository } from "@/runtime/firestore/FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:8 const data = await RuntimeMutationEngine.create(module, payload);
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:24 const data = await RuntimeMutationEngine.update(module, id, payload);
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:36 await RuntimeMutationEngine.delete(module, id);
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:48 return FirestoreRuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\runtime\data\ERPModuleRuntimeDataBridge.ts:9 export class ERPModuleRuntimeDataBridge {
C:\Users\Admin\terragest\src\runtime\data\ERPModuleRuntimeDataBridge.ts:41 export const erpModuleRuntimeDataBridge =
C:\Users\Admin\terragest\src\runtime\data\ERPModuleRuntimeDataBridge.ts:42 new ERPModuleRuntimeDataBridge();
C:\Users\Admin\terragest\src\runtime\data\index.ts:3 export * from "./ERPModuleRuntimeDataBridge";
C:\Users\Admin\terragest\src\runtime\data-binding\index.ts:1 export type { RuntimeRecord } from "./RuntimeRecord";
C:\Users\Admin\terragest\src\runtime\data-binding\index.ts:2 export { RuntimeDataBinding } from "./RuntimeDataBinding";
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:3 } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:6 FirestoreRuntimeQuery,
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:7 FirestoreRuntimeMutation,
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:8 } from "@/runtime/firestore";
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:10 export class RuntimeDataBinding {
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:14 return FirestoreRuntimeQuery.list(
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:23 return FirestoreRuntimeQuery.detail(
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:33 return FirestoreRuntimeMutation.create(
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:44 return FirestoreRuntimeMutation.update(
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:55 return FirestoreRuntimeMutation.delete(
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeRecord.ts:1 export interface RuntimeRecord {
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:7 } from "@/runtime/events/bus/ERPEventBus";
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:11 } from "@/runtime/rules/ERPBusinessRuleEngine";
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:14 RuntimeNotificationEngine,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:15 } from "@/runtime/notifications/RuntimeNotificationEngine";
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:18 RuntimeObservabilityEngine,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:19 } from "@/runtime/observability/RuntimeObservabilityEngine";
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:23 } from "@/runtime/domain/adapters/TerragestBusinessRuleAdapter";
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:25 type RuntimeBridgeTarget = {
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:35 export type TerragestDomainRuntimeBridgeDependencies = {
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:36 businessRuleEngine?: RuntimeBridgeTarget;
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:37 ruleRegistry?: RuntimeBridgeTarget;
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:38 notificationEngine?: RuntimeBridgeTarget;
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:39 observabilityEngine?: RuntimeBridgeTarget;
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:40 eventBus?: RuntimeBridgeTarget;
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:43 type TerragestRuntimeBinding = {
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:49 function collectRuntimeBindings(
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:52 ): TerragestRuntimeBinding[] {
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:73 binding: TerragestRuntimeBinding
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:109 target: RuntimeBridgeTarget | undefined,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:110 binding: TerragestRuntimeBinding
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:145 target: RuntimeBridgeTarget | undefined,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:171 export function createTerragestDomainRuntimeBridge(
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:172 dependencies: TerragestDomainRuntimeBridgeDependencies = {}
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:182 RuntimeNotificationEngine,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:185 RuntimeObservabilityEngine,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:192 collectRuntimeBindings(
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:198 collectRuntimeBindings(
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:204 collectRuntimeBindings(
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:282 "TERRAGEST_DOMAIN_RUNTIME_BRIDGE_BOOTED",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:287 type: "domain-runtime",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:289 message: "Terragest domain connected to ERP runtime.",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:294 type: "runtime",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:296 title: "Terragest runtime bridge",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:297 message: "Domaine Terragest connecté au runtime ERP.",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:322 export const TerragestDomainRuntimeBridge =
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:323 createTerragestDomainRuntimeBridge();
C:\Users\Admin\terragest\src\runtime\domain\adapters\TerragestBusinessRuleAdapter.ts:1 import type { ERPBusinessRule } from "@/runtime/rules/ERPBusinessRuleEngine";
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeDiagnostics.ts:1 import { EnterpriseRuntimeKernel } from "./EnterpriseRuntimeKernel";
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeDiagnostics.ts:3 export class EnterpriseRuntimeDiagnostics {
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeDiagnostics.ts:5 const services = EnterpriseRuntimeKernel.status();
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeGovernance.ts:7 export class EnterpriseRuntimeGovernance {
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeGovernance.ts:16 key: "runtime-actions",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeGovernance.ts:21 key: "forms-runtime",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeGovernance.ts:26 key: "tables-runtime",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:1 export interface EnterpriseRuntimeKernelStatus {
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:7 export class EnterpriseRuntimeKernel {
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:8 static status(): EnterpriseRuntimeKernelStatus[] {
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:11 name: "Runtime Core",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:16 name: "Firestore Runtime",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:21 name: "Workflow Runtime",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:26 name: "Security Runtime",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:31 name: "Automation Runtime",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:36 name: "Event Runtime",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:1 export type EnterpriseRuntimeLifecycleStep =
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:12 export class EnterpriseRuntimeLifecycle {
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:14 key: EnterpriseRuntimeLifecycleStep;
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:19 { key: "bootstrap", label: "Bootstrap runtime", completed: true },
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:22 { key: "security", label: "Security runtime", completed: true },
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:23 { key: "workflow", label: "Workflow runtime", completed: true },
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:24 { key: "automation", label: "Automation runtime", completed: true },
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:25 { key: "events", label: "Event runtime", completed: true },
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimePerformance.ts:1 export class EnterpriseRuntimePerformance {
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimePerformance.ts:5 label: "Runtime score",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimePerformance.ts:7 helper: "Architecture runtime consolidee",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\index.ts:1 export { EnterpriseRuntimeKernel } from "./EnterpriseRuntimeKernel";
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\index.ts:2 export type { EnterpriseRuntimeKernelStatus } from "./EnterpriseRuntimeKernel";
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\index.ts:4 export { EnterpriseRuntimeDiagnostics } from "./EnterpriseRuntimeDiagnostics";
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\index.ts:5 export { EnterpriseRuntimeLifecycle } from "./EnterpriseRuntimeLifecycle";
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\index.ts:6 export type { EnterpriseRuntimeLifecycleStep } from "./EnterpriseRuntimeLifecycle";
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\index.ts:8 export { EnterpriseRuntimeGovernance } from "./EnterpriseRuntimeGovernance";
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\index.ts:9 export type { EnterpriseGovernanceCheck } from "./EnterpriseRuntimeGovernance";
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\index.ts:11 export { EnterpriseRuntimePerformance } from "./EnterpriseRuntimePerformance";
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:2 ERPEventRuntimeEvent,
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:3 ERPEventRuntimeLevel,
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:4 } from "./ERPEventRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:5 import { ERPEventRuntimeStore } from "./ERPEventRuntimeStore";
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:6 import { ERPEventRuntimeSubscriptionRegistry } from "./ERPEventRuntimeSubscriptionRegistry";
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:12 level?: ERPEventRuntimeLevel;
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:15 export class ERPEventRuntimeBus {
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:21 }: EmitOptions): ERPEventRuntimeEvent {
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:23 ERPEventRuntimeSubscriptionRegistry.forEvent(name);
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:25 const event: ERPEventRuntimeEvent = {
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:37 ERPEventRuntimeStore.push(event);
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:46 return ERPEventRuntimeStore.forModule(moduleKey);
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:49 return ERPEventRuntimeStore.all();
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:1 import { ERPEventRuntimeBus } from "./ERPEventRuntimeBus";
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:3 export class ERPEventRuntimeOrchestrator {
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:5 return ERPEventRuntimeBus.emit({
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:17 return ERPEventRuntimeBus.emit({
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:29 return ERPEventRuntimeBus.emit({
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeStore.ts:2 ERPEventRuntimeEvent,
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeStore.ts:3 } from "./ERPEventRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeStore.ts:5 const events: ERPEventRuntimeEvent[] = [];
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeStore.ts:7 export class ERPEventRuntimeStore {
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeStore.ts:8 static push(event: ERPEventRuntimeEvent) {
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptionRegistry.ts:1 import { erpEventRuntimeSubscriptions } from "./ERPEventRuntimeSubscriptions";
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptionRegistry.ts:3 export class ERPEventRuntimeSubscriptionRegistry {
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptionRegistry.ts:5 return erpEventRuntimeSubscriptions;
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptionRegistry.ts:9 return erpEventRuntimeSubscriptions.filter(
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptionRegistry.ts:15 return erpEventRuntimeSubscriptions.filter(
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptions.ts:2 ERPEventRuntimeSubscription,
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptions.ts:3 } from "./ERPEventRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptions.ts:5 export const erpEventRuntimeSubscriptions: ERPEventRuntimeSubscription[] = [
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeTypes.ts:1 export type ERPEventRuntimeLevel =
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeTypes.ts:7 export interface ERPEventRuntimeEvent {
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeTypes.ts:12 level: ERPEventRuntimeLevel;
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeTypes.ts:17 export interface ERPEventRuntimeSubscription {
C:\Users\Admin\terragest\src\runtime\event-runtime\index.ts:2 ERPEventRuntimeEvent,
C:\Users\Admin\terragest\src\runtime\event-runtime\index.ts:3 ERPEventRuntimeLevel,
C:\Users\Admin\terragest\src\runtime\event-runtime\index.ts:4 ERPEventRuntimeSubscription,
C:\Users\Admin\terragest\src\runtime\event-runtime\index.ts:5 } from "./ERPEventRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\event-runtime\index.ts:7 export { ERPEventRuntimeStore } from "./ERPEventRuntimeStore";
C:\Users\Admin\terragest\src\runtime\event-runtime\index.ts:8 export { erpEventRuntimeSubscriptions } from "./ERPEventRuntimeSubscriptions";
C:\Users\Admin\terragest\src\runtime\event-runtime\index.ts:9 export { ERPEventRuntimeSubscriptionRegistry } from "./ERPEventRuntimeSubscriptionRegistry";
C:\Users\Admin\terragest\src\runtime\event-runtime\index.ts:10 export { ERPEventRuntimeBus } from "./ERPEventRuntimeBus";
C:\Users\Admin\terragest\src\runtime\event-runtime\index.ts:11 export { ERPEventRuntimeOrchestrator } from "./ERPEventRuntimeOrchestrator";
C:\Users\Admin\terragest\src\runtime\events\ERPRuntimeEventOrchestrator.ts:11 export class ERPRuntimeEventOrchestrator {
C:\Users\Admin\terragest\src\runtime\events\ERPRuntimeEventOrchestrator.ts:30 `Runtime event ${event.type}`,
C:\Users\Admin\terragest\src\runtime\events\ERPRuntimeEventOrchestrator.ts:53 "ERP Runtime Event",
C:\Users\Admin\terragest\src\runtime\events\ERPRuntimeEventOrchestrator.ts:72 export const erpRuntimeEventOrchestrator =
C:\Users\Admin\terragest\src\runtime\events\ERPRuntimeEventOrchestrator.ts:73 new ERPRuntimeEventOrchestrator();
C:\Users\Admin\terragest\src\runtime\events\index.ts:3 export * from "./ERPRuntimeEventOrchestrator";
C:\Users\Admin\terragest\src\runtime\events\RuntimeEvent.ts:1 export interface RuntimeEvent {
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventBus.ts:2 RuntimeBusinessRulesEngine,
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventBus.ts:4 from "@/runtime/business-rules/RuntimeBusinessRulesEngine";
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventBus.ts:6 export class RuntimeEventBus {
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventBus.ts:39 "Runtime Event",
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventBus.ts:48 await RuntimeBusinessRulesEngine
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventBus.ts:72 export const runtimeEventBus =
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventBus.ts:73 new RuntimeEventBus();
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:1 export const RuntimeEventRegistry = {
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:59 // RUNTIME
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:62 RUNTIME_ERROR:
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:63 "RUNTIME_ERROR",
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:85 export type RuntimeEventType =
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:86 typeof RuntimeEventRegistry[
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:87 keyof typeof RuntimeEventRegistry
C:\Users\Admin\terragest\src\runtime\execution\RuntimeExecutor.ts:1 export class RuntimeExecutor {
C:\Users\Admin\terragest\src\runtime\execution\RuntimeExecutor.ts:8 "[RuntimeExecutor]",
C:\Users\Admin\terragest\src\runtime\firebase\runtime-firestore.ts:32 export const runtimeFirestore =
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:4 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:5 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:7 export class FirestoreRuntimeMutation {
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:12 return FirestoreRuntimeRepository.create(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:23 return FirestoreRuntimeRepository.update(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:34 return FirestoreRuntimeRepository.delete(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:4 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:5 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:7 export class FirestoreRuntimeQuery {
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:12 return FirestoreRuntimeRepository.findMany(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:21 return FirestoreRuntimeRepository.findById(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:6 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:9 runtimeFirestore,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:10 } from "@/runtime/firebase/runtime-firestore";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:12 export class FirestoreRuntimeRealtime {
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:23 runtimeFirestore,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:11 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:12 import type { RuntimeRecord } from "@/runtime/data-binding";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:14 import { runtimeFirestore } from "@/runtime/firebase/runtime-firestore";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:16 export class FirestoreRuntimeRepository {
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:19 ): Promise<RuntimeRecord[]> {
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:21 collection(runtimeFirestore, module.schema.collection)
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:33 ): Promise<RuntimeRecord | null> {
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:35 doc(runtimeFirestore, module.schema.collection, id)
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:53 collection(runtimeFirestore, module.schema.collection),
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:72 doc(runtimeFirestore, module.schema.collection, id),
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:90 doc(runtimeFirestore, module.schema.collection, id)
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:2 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:3 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:6 FirestoreRuntimeQuery,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:7 } from "./FirestoreRuntimeQuery";
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:10 FirestoreRuntimeMutation,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:11 } from "./FirestoreRuntimeMutation";
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:14 FirestoreRuntimeRealtime,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:15 } from "./FirestoreRuntimeRealtime";
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormDefinition.ts:5 from "@/runtime/forms/DynamicField";
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormEngine.ts:5 from "@/runtime/forms/DynamicField";
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:4 } from "@/runtime/forms/DynamicField";
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:9 } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:4 import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:31 type RuntimeFormModule = {
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:42 module: RuntimeFormModule;
C:\Users\Admin\terragest\src\runtime\generated\GeneratedRuntimeTopology.ts:1 export const GeneratedRuntimeTopology = {
C:\Users\Admin\terragest\src\runtime\generation\ERPModuleRuntimeFactory.tsx:12 erpModuleRuntimeDataBridge,
C:\Users\Admin\terragest\src\runtime\generation\ERPModuleRuntimeFactory.tsx:15 interface ERPModuleRuntimeFactoryProps {
C:\Users\Admin\terragest\src\runtime\generation\ERPModuleRuntimeFactory.tsx:26 export function ERPModuleRuntimeFactory({
C:\Users\Admin\terragest\src\runtime\generation\ERPModuleRuntimeFactory.tsx:29 }: ERPModuleRuntimeFactoryProps) {
C:\Users\Admin\terragest\src\runtime\generation\ERPModuleRuntimeFactory.tsx:41 erpModuleRuntimeDataBridge
C:\Users\Admin\terragest\src\runtime\generation\ERPPageGenerationEngine.tsx:42 description="Page générée automatiquement par le runtime ERP."
C:\Users\Admin\terragest\src\runtime\generation\index.ts:11 export * from "./ERPModuleRuntimeFactory";
C:\Users\Admin\terragest\src\runtime\governance\EnterpriseGovernanceEngine.ts:27 RuntimeContractValidator
C:\Users\Admin\terragest\src\runtime\governance\EnterpriseGovernanceEngine.ts:29 from "./contracts/RuntimeContractValidator";
C:\Users\Admin\terragest\src\runtime\governance\EnterpriseGovernanceEngine.ts:50 new RuntimeContractValidator();
C:\Users\Admin\terragest\src\runtime\governance\EnterpriseGovernanceEngine.ts:59 "PersistentRuntimePublisher"
C:\Users\Admin\terragest\src\runtime\governance\EnterpriseGovernanceEngine.ts:71 "RuntimeEventContract"
C:\Users\Admin\terragest\src\runtime\governance\contracts\RuntimeContractValidator.ts:2 RuntimeContractValidator {
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:9 import { runtimeEventBus }
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:10 from "@/runtime/bus/RuntimeEventBus";
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:15 from "@/runtime/events/MaintenanceEvents";
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:17 runtimeEventBus.on(
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:9 import { runtimeEventBus }
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:10 from "@/runtime/bus/RuntimeEventBus";
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:15 from "@/runtime/events/MaintenanceEvents";
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:17 runtimeEventBus.on(
C:\Users\Admin\terragest\src\runtime\metrics\RuntimeMetrics.ts:1 export class RuntimeMetrics {
C:\Users\Admin\terragest\src\runtime\modules\index.ts:24 type ERPModuleRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\modules\index.ts:28 export { RuntimePageFactory, type RuntimePageType } from "./factories/RuntimePageFactory";
C:\Users\Admin\terragest\src\runtime\modules\index.ts:29 export { RuntimeFormFactory } from "./factories/RuntimeFormFactory";
C:\Users\Admin\terragest\src\runtime\modules\index.ts:30 export { RuntimeTableFactory } from "./factories/RuntimeTableFactory";
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:4 RuntimeModuleContract,
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:5 } from "@/runtime/core/RuntimeContracts";
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:9 } from "@/runtime/ui-generation";
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:32 export class CoreModuleRuntimeAdapter {
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:33 static toRuntimeModules():
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:34 RuntimeModuleContract[] {
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:122 static toRuntimeBindings() {
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:152 static toRuntimeWorkflows() {
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:29 export interface ERPModuleRuntimeDefinition {
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:73 static buildRuntime(module: ERPModule): ERPModuleRuntimeDefinition {
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimeFormFactory.ts:4 export class RuntimeFormFactory {
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:4 export type RuntimePageType = "list" | "create" | "edit" | "details";
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:6 export class RuntimePageFactory {
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:7 static create(module: ERPModule, pageType: RuntimePageType) {
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:8 const runtime = ERPModuleBuilder.buildRuntime(module);
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:14 runtime,
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimeTableFactory.ts:4 export class RuntimeTableFactory {
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:1 import { RuntimeDataBinding } from "@/runtime/data-binding";
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:14 const records = await RuntimeDataBinding.list(module);
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleDetailRenderer.tsx:1 import type { ERPModuleDefinition } from "@/runtime/modules/ERPModuleDefinition";
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleDetailRenderer.tsx:17 DÃƒÂ©tail runtime du module {module.key}
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleListRenderer.tsx:3 import type { ERPModuleDefinition } from "@/runtime/modules/ERPModuleDefinition";
C:\Users\Admin\terragest\src\runtime\modules\renderers\ERPModuleRenderer.ts:2 import { RuntimePageFactory, type RuntimePageType } from "../factories/RuntimePageFactory";
C:\Users\Admin\terragest\src\runtime\modules\renderers\ERPModuleRenderer.ts:5 static renderPage(module: ERPModule, pageType: RuntimePageType) {
C:\Users\Admin\terragest\src\runtime\modules\renderers\ERPModuleRenderer.ts:6 return RuntimePageFactory.create(module, pageType);
C:\Users\Admin\terragest\src\runtime\monitoring\ConnectedRuntimeEventPublisher.ts:2 runtimeActivityStore
C:\Users\Admin\terragest\src\runtime\monitoring\ConnectedRuntimeEventPublisher.ts:4 from "../../features/platform/components/runtime/runtimeActivityStore";
C:\Users\Admin\terragest\src\runtime\monitoring\ConnectedRuntimeEventPublisher.ts:12 ConnectedRuntimeEventPublisher {
C:\Users\Admin\terragest\src\runtime\monitoring\ConnectedRuntimeEventPublisher.ts:26 runtimeActivityStore.push(
C:\Users\Admin\terragest\src\runtime\monitoring\ConnectedRuntimeEventPublisher.ts:35 "[ConnectedRuntimeEvent]",
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:1 import { ERPRegistry } from "@/runtime/registry";
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:2 import { ERPTenantRegistry } from "@/runtime/tenant";
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:3 import { ERPWorkerRegistry, ERPWorkerHistoryStore } from "@/runtime/workers";
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:4 import { ERPWorkflowExecutionStore } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:5 import { ERPQueueStore } from "@/runtime/resilience";
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:6 import { getERPRealtimeSnapshot } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:7 import { ERPSecurityAuditStore } from "@/runtime/security";
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:2 RuntimeEventRepository
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:4 from "../persistence/events/RuntimeEventRepository";
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:7 ConnectedRuntimeEventPublisher
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:9 from "./ConnectedRuntimeEventPublisher";
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:12 PersistentRuntimePublisher {
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:15 new RuntimeEventRepository();
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:18 new ConnectedRuntimeEventPublisher();
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:36 "[PersistentRuntimePublisher]",
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:15 export class RuntimeEventPublisher {
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:35 "runtime_events"
C:\Users\Admin\terragest\src\runtime\monitoring\simulateRuntimeActivity.ts:2 ConnectedRuntimeEventPublisher
C:\Users\Admin\terragest\src\runtime\monitoring\simulateRuntimeActivity.ts:4 from "./ConnectedRuntimeEventPublisher";
C:\Users\Admin\terragest\src\runtime\monitoring\simulateRuntimeActivity.ts:7 new ConnectedRuntimeEventPublisher();
C:\Users\Admin\terragest\src\runtime\monitoring\errors\ERPErrorAnalytics.ts:1 import { ERPAlertStore } from "@/runtime/observability";
C:\Users\Admin\terragest\src\runtime\monitoring\errors\ERPErrorAnalytics.ts:2 import { ERPDeadLetterStore } from "@/runtime/resilience";
C:\Users\Admin\terragest\src\runtime\monitoring\errors\ERPErrorAnalytics.ts:3 import { ERPWorkerHistoryStore } from "@/runtime/workers";
C:\Users\Admin\terragest\src\runtime\monitoring\errors\ERPErrorAnalytics.ts:4 import { ERPSecurityAuditStore } from "@/runtime/security";
C:\Users\Admin\terragest\src\runtime\monitoring\health\ERPHealthCenter.ts:1 import { ERPRegistry } from "@/runtime/registry";
C:\Users\Admin\terragest\src\runtime\monitoring\health\ERPHealthCenter.ts:2 import { ERPCircuitBreaker } from "@/runtime/resilience";
C:\Users\Admin\terragest\src\runtime\monitoring\health\ERPHealthCenter.ts:3 import { ERPTenantRegistry } from "@/runtime/tenant";
C:\Users\Admin\terragest\src\runtime\monitoring\health\ERPHealthCenter.ts:4 import { ERPWorkerRegistry } from "@/runtime/workers";
C:\Users\Admin\terragest\src\runtime\monitoring\health\ERPHealthCenter.ts:15 label: "Runtime Registry",
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:21 { id: "registry", label: "Runtime Registry", group: "core" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:22 { id: "ui", label: "Runtime UI", group: "ui" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:23 { id: "events", label: "Event Bus", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:24 { id: "observability", label: "Observability", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:25 { id: "automation", label: "Automation", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:26 { id: "workflows", label: "Workflows", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:27 { id: "queue", label: "Queue / DLQ", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:28 { id: "realtime", label: "Realtime", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:32 { id: "workers", label: "Workers", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\mutations\index.ts:1 export { RuntimeMutationEngine } from "./RuntimeMutationEngine";
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:2 import { FirestoreRuntimeMutation } from "@/runtime/firestore/FirestoreRuntimeMutation";
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:4 export class RuntimeMutationEngine {
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:9 return FirestoreRuntimeMutation.create(
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:20 return FirestoreRuntimeMutation.update(
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:31 return FirestoreRuntimeMutation.delete(
C:\Users\Admin\terragest\src\runtime\navigation\ERPRelationNavigation.tsx:7 RuntimeNavigationEngine,
C:\Users\Admin\terragest\src\runtime\navigation\ERPRelationNavigation.tsx:9 from "@/runtime/navigation/RuntimeNavigationEngine";
C:\Users\Admin\terragest\src\runtime\navigation\ERPRelationNavigation.tsx:27 RuntimeNavigationEngine
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:2 RuntimeRelationsEngine,
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:4 from "@/runtime/relations/RuntimeRelationsEngine";
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:7 RuntimeNavigationLink,
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:9 from "@/runtime/navigation/RuntimeNavigationLink";
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:11 export class RuntimeNavigationEngine {
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:16 ): RuntimeNavigationLink[] {
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:19 RuntimeRelationsEngine
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationLink.ts:1 export interface RuntimeNavigationLink {
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:38 "runtime_notifications"
C:\Users\Admin\terragest\src\runtime\notifications\RuntimeNotification.ts:1 export interface RuntimeNotification {
C:\Users\Admin\terragest\src\runtime\notifications\RuntimeNotificationEngine.ts:12 RuntimeNotification,
C:\Users\Admin\terragest\src\runtime\notifications\RuntimeNotificationEngine.ts:14 from "@/runtime/notifications/RuntimeNotification";
C:\Users\Admin\terragest\src\runtime\notifications\RuntimeNotificationEngine.ts:16 export class RuntimeNotificationEngine {
C:\Users\Admin\terragest\src\runtime\notifications\RuntimeNotificationEngine.ts:21 RuntimeNotification
C:\Users\Admin\terragest\src\runtime\notifications\RuntimeNotificationEngine.ts:34 "runtime_notifications"
C:\Users\Admin\terragest\src\runtime\observability\ERPAlertStore.ts:2 ERPBaseRuntimeRecord,
C:\Users\Admin\terragest\src\runtime\observability\ERPAlertStore.ts:3 } from "../shared/ERPRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\observability\ERPAlertStore.ts:6 extends ERPBaseRuntimeRecord {}
C:\Users\Admin\terragest\src\runtime\observability\ERPObservabilityTimeline.ts:2 ERPRuntimeEntity,
C:\Users\Admin\terragest\src\runtime\observability\ERPObservabilityTimeline.ts:3 } from "../shared/ERPRuntimeEntity";
C:\Users\Admin\terragest\src\runtime\observability\ERPObservabilityTimeline.ts:6 extends ERPRuntimeEntity {
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:7 erpRuntimeAuditTrail,
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:8 } from "./ERPRuntimeAuditTrail";
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:10 export class ERPRuntimeAuditBridge {
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:19 erpRuntimeAuditTrail
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:43 export const erpRuntimeAuditBridge =
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:44 new ERPRuntimeAuditBridge();
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:17 export class ERPRuntimeAuditTrail {
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:47 export const erpRuntimeAuditTrail =
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:48 new ERPRuntimeAuditTrail();
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:3 } from "@/runtime/events/bus/ERPEventBus";
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:15 export function seedERPRuntimeObservability() {
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:29 actor: "runtime",
C:\Users\Admin\terragest\src\runtime\observability\ERPTraceStore.ts:2 ERPBaseRuntimeRecord,
C:\Users\Admin\terragest\src\runtime\observability\ERPTraceStore.ts:3 } from "../shared/ERPRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\observability\ERPTraceStore.ts:6 extends ERPBaseRuntimeRecord {
C:\Users\Admin\terragest\src\runtime\observability\index.ts:1 export * from "./ERPRuntimeAuditTrail";
C:\Users\Admin\terragest\src\runtime\observability\index.ts:2 export * from "./ERPRuntimeAuditBridge";
C:\Users\Admin\terragest\src\runtime\observability\index.ts:4 export * from "./seedERPRuntimeObservability";
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLog.ts:1 export interface RuntimeLog {
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:24 export function RuntimeLogsPanel() {
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:38 "runtime_logs"
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:91 Runtime Logs
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:103 Aucun log runtime.
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:12 RuntimeLog,
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:14 from "@/runtime/observability/RuntimeLog";
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:16 export class RuntimeObservabilityEngine {
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:19 log: RuntimeLog
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:23 "ERP Runtime Log",
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:31 "runtime_logs"
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:5 export function seedERPRuntimeObservability() {
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:8 title: "Runtime observability initialized",
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:10 module: "runtime",
C:\Users\Admin\terragest\src\runtime\observability\timeline\ERPObservabilityTimeline.ts:3 } from "@/runtime/events/bus/ERPEventBus";
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:2 PersistentRuntimePublisher
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:4 from "../monitoring/PersistentRuntimePublisher";
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:30 new PersistentRuntimePublisher();
C:\Users\Admin\terragest\src\runtime\orchestration\RuntimeModuleOrchestrator.ts:2 RuntimePublisher
C:\Users\Admin\terragest\src\runtime\orchestration\RuntimeModuleOrchestrator.ts:4 from "../core/services/RuntimePublisher";
C:\Users\Admin\terragest\src\runtime\orchestration\RuntimeModuleOrchestrator.ts:7 RuntimeModuleOrchestrator {
C:\Users\Admin\terragest\src\runtime\orchestration\RuntimeModuleOrchestrator.ts:10 new RuntimePublisher();
C:\Users\Admin\terragest\src\runtime\orchestration\RuntimeModuleOrchestrator.ts:34 `[RuntimeModuleOrchestrator] ${type}`
C:\Users\Admin\terragest\src\runtime\os\tenants\RuntimeIsolationManager.ts:1 export class RuntimeIsolationManager {
C:\Users\Admin\terragest\src\runtime\permissions\ERPProtectedAction.tsx:4 RuntimePermissionsEngine,
C:\Users\Admin\terragest\src\runtime\permissions\ERPProtectedAction.tsx:6 from "@/runtime/permissions/RuntimePermissionsEngine";
C:\Users\Admin\terragest\src\runtime\permissions\ERPProtectedAction.tsx:33 RuntimePermissionsEngine.can(
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermission.ts:1 export interface RuntimePermission {
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:2 RuntimePermission,
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:4 from "@/runtime/permissions/RuntimePermission";
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:6 export const runtimePermissions:
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:7 RuntimePermission[] = [
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermissionsEngine.ts:2 runtimePermissions,
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermissionsEngine.ts:4 from "@/runtime/permissions/runtimePermissions";
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermissionsEngine.ts:6 export class RuntimePermissionsEngine {
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermissionsEngine.ts:19 runtimePermissions.find(
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermissionsEngine.ts:47 return runtimePermissions.filter(
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:2 ERPRuntimePersistenceService,
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:3 } from "./stores/ERPRuntimePersistenceService";
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:7 export async function seedERPPersistenceRuntime() {
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:14 await ERPRuntimePersistenceService.events.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:17 actor: "runtime",
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:20 await ERPRuntimePersistenceService.traces.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:26 await ERPRuntimePersistenceService.alerts.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:32 await ERPRuntimePersistenceService.workflows.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:37 await ERPRuntimePersistenceService.queueJobs.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:43 await ERPRuntimePersistenceService.audit.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:49 await ERPRuntimePersistenceService.securityAudit.save({
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:2 RuntimeEventRepository
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:4 from "./events/RuntimeEventRepository";
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:10 new RuntimeEventRepository();
C:\Users\Admin\terragest\src\runtime\persistence\index.ts:3 export * from "./repositories/ERPRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\persistence\index.ts:5 export * from "./stores/ERPRuntimePersistenceService";
C:\Users\Admin\terragest\src\runtime\persistence\analytics\AnalyticsRepository.ts:19 "runtime_analytics"
C:\Users\Admin\terragest\src\runtime\persistence\audit\AuditRepository.ts:19 "runtime_audit"
C:\Users\Admin\terragest\src\runtime\persistence\events\RuntimeEventRepository.ts:12 RuntimeEventRepository {
C:\Users\Admin\terragest\src\runtime\persistence\events\RuntimeEventRepository.ts:21 "runtime_events"
C:\Users\Admin\terragest\src\runtime\persistence\events\RuntimeEventRepository.ts:37 "runtime_events"
C:\Users\Admin\terragest\src\runtime\persistence\processes\ProcessRepository.ts:19 "runtime_processes"
C:\Users\Admin\terragest\src\runtime\persistence\projections\ProjectionRepository.ts:19 "runtime_projections"
C:\Users\Admin\terragest\src\runtime\persistence\repositories\ERPRuntimeRepository.ts:3 } from "@/runtime/tenant";
C:\Users\Admin\terragest\src\runtime\persistence\repositories\ERPRuntimeRepository.ts:18 export class ERPRuntimeRepository<T = unknown> {
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:2 ERPRuntimePersistenceService,
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:3 } from "../stores/ERPRuntimePersistenceService";
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:15 ERPRuntimePersistenceService.events.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:16 ERPRuntimePersistenceService.traces.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:17 ERPRuntimePersistenceService.alerts.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:18 ERPRuntimePersistenceService.workflows.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:19 ERPRuntimePersistenceService.queueJobs.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:20 ERPRuntimePersistenceService.audit.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:21 ERPRuntimePersistenceService.securityAudit.list(),
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPPersistenceCollections.ts:2 events: "runtime_events",
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPPersistenceCollections.ts:3 traces: "runtime_traces",
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPPersistenceCollections.ts:4 alerts: "runtime_alerts",
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPPersistenceCollections.ts:5 workflows: "runtime_workflows",
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPPersistenceCollections.ts:6 queueJobs: "runtime_queue_jobs",
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPPersistenceCollections.ts:7 audit: "runtime_audit",
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPPersistenceCollections.ts:8 securityAudit: "runtime_security_audit",
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:2 ERPRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:3 } from "../repositories/ERPRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:9 export const ERPRuntimePersistenceService = {
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:11 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:16 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:21 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:26 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:31 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:36 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:41 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:19 "runtime_workflows"
C:\Users\Admin\terragest\src\runtime\policies\ERPRuntimeAuthorizationBridge.ts:5 export class ERPRuntimeAuthorizationBridge {
C:\Users\Admin\terragest\src\runtime\policies\ERPRuntimeAuthorizationBridge.ts:23 export const erpRuntimeAuthorizationBridge =
C:\Users\Admin\terragest\src\runtime\policies\ERPRuntimeAuthorizationBridge.ts:24 new ERPRuntimeAuthorizationBridge();
C:\Users\Admin\terragest\src\runtime\policies\index.ts:2 export * from "./ERPRuntimeAuthorizationBridge";
C:\Users\Admin\terragest\src\runtime\production\ProductionLogger.ts:99 "Runtime monitoring active",
C:\Users\Admin\terragest\src\runtime\production\readiness.ts:18 key: "runtime-registry",
C:\Users\Admin\terragest\src\runtime\production\readiness.ts:20 label: "Runtime Registry",
C:\Users\Admin\terragest\src\runtime\production\RuntimeCache.ts:8 export class RuntimeCache {
C:\Users\Admin\terragest\src\runtime\production\RuntimeCache.ts:34 const existing = RuntimeCache.get<T>(key);
C:\Users\Admin\terragest\src\runtime\production\RuntimeCache.ts:40 return RuntimeCache.set(key, factory(), ttlMs);
C:\Users\Admin\terragest\src\runtime\production\RuntimeErrorReporter.ts:5 export type RuntimeErrorReport = {
C:\Users\Admin\terragest\src\runtime\production\RuntimeErrorReporter.ts:13 class RuntimeErrorReporterClass {
C:\Users\Admin\terragest\src\runtime\production\RuntimeErrorReporter.ts:14 private reports: RuntimeErrorReport[] = [];
C:\Users\Admin\terragest\src\runtime\production\RuntimeErrorReporter.ts:30 const report: RuntimeErrorReport = {
C:\Users\Admin\terragest\src\runtime\production\RuntimeErrorReporter.ts:34 source: info?.source ?? "runtime",
C:\Users\Admin\terragest\src\runtime\production\RuntimeErrorReporter.ts:51 source = "runtime"
C:\Users\Admin\terragest\src\runtime\production\RuntimeErrorReporter.ts:61 export const RuntimeErrorReporter =
C:\Users\Admin\terragest\src\runtime\production\RuntimeErrorReporter.ts:62 new RuntimeErrorReporterClass();
C:\Users\Admin\terragest\src\runtime\production\RuntimeHealthMonitor.ts:3 export class RuntimeHealthMonitor {
C:\Users\Admin\terragest\src\runtime\production\RuntimeRateLimiter.ts:3 export class RuntimeRateLimiter {
C:\Users\Admin\terragest\src\runtime\production\backup\ERPBackupPlanRegistry.ts:5 key: "firestore-runtime-backup",
C:\Users\Admin\terragest\src\runtime\production\backup\ERPBackupPlanRegistry.ts:6 label: "Firestore Runtime Backup",
C:\Users\Admin\terragest\src\runtime\production\backup\ERPBackupPlanRegistry.ts:7 target: "runtime collections",
C:\Users\Admin\terragest\src\runtime\production\cloud\ERPCloudReadinessRegistry.ts:14 description: "Firestore est present mais la persistance runtime doit etre branchee.",
C:\Users\Admin\terragest\src\runtime\production\governance\ERPProductionPolicyRegistry.ts:5 key: "runtime-registry",
C:\Users\Admin\terragest\src\runtime\production\governance\ERPProductionPolicyRegistry.ts:6 label: "Runtime Registry",
C:\Users\Admin\terragest\src\runtime\production\governance\ERPProductionPolicyRegistry.ts:33 key: "backup-runtime",
C:\Users\Admin\terragest\src\runtime\production\governance\ERPProductionPolicyRegistry.ts:34 label: "Backup Runtime",
C:\Users\Admin\terragest\src\runtime\production\governance\ERPProductionPolicyRegistry.ts:44 description: "Les limites runtime doivent etre appliquees par tenant.",
C:\Users\Admin\terragest\src\runtime\production\governance\ERPProductionPolicyRegistry.ts:58 description: "La plateforme de validation runtime est disponible.",
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:2 RuntimeValidator
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:4 from "../validation/RuntimeValidator";
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:17 RuntimeIntegrityCheck
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:19 from "../integrity/RuntimeIntegrityCheck";
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:29 private runtime =
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:30 new RuntimeValidator();
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:39 new RuntimeIntegrityCheck();
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:46 this.runtime.validate();
C:\Users\Admin\terragest\src\runtime\quality\integrity\RuntimeIntegrityCheck.ts:2 RuntimeIntegrityCheck {
C:\Users\Admin\terragest\src\runtime\quality\integrity\RuntimeIntegrityCheck.ts:7 "[Quality] runtime integrity verified"
C:\Users\Admin\terragest\src\runtime\quality\validation\RuntimeValidator.ts:2 RuntimeValidator {
C:\Users\Admin\terragest\src\runtime\quality\validation\RuntimeValidator.ts:7 "[Quality] runtime validated"
C:\Users\Admin\terragest\src\runtime\query\index.ts:1 export { RuntimeQueryEngine } from "./RuntimeQueryEngine";
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:2 import { RuntimeRepository } from "@/runtime/repositories/RuntimeRepository";
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:4 export class RuntimeQueryEngine {
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:6 return RuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:10 return RuntimeRepository.findById(module, id);
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:15 export function seedERPRealtimeRuntime() {
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:46 title: "Event runtime recu",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:90 title: "Runtime realtime actif",
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:2 RuntimeRealtimeGateway
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:4 from "./gateway/RuntimeRealtimeGateway";
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:7 new RuntimeRealtimeGateway();
C:\Users\Admin\terragest\src\runtime\realtime\channels\RuntimeChannelManager.ts:2 RuntimeChannelManager {
C:\Users\Admin\terragest\src\runtime\realtime\gateway\RuntimeRealtimeGateway.ts:2 RuntimeWebSocketServer
C:\Users\Admin\terragest\src\runtime\realtime\gateway\RuntimeRealtimeGateway.ts:4 from "../websocket/RuntimeWebSocketServer";
C:\Users\Admin\terragest\src\runtime\realtime\gateway\RuntimeRealtimeGateway.ts:12 RuntimeRealtimeGateway {
C:\Users\Admin\terragest\src\runtime\realtime\gateway\RuntimeRealtimeGateway.ts:15 new RuntimeWebSocketServer();
C:\Users\Admin\terragest\src\runtime\realtime\websocket\RuntimeWebSocketServer.ts:2 RuntimeWebSocketServer {
C:\Users\Admin\terragest\src\runtime\registry\types.ts:3 } from "@/runtime/ui-generation";
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:2 CoreModuleRuntimeAdapter,
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:7 } from "@/runtime/ui-generation";
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:14 CoreModuleRuntimeAdapter
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:18 CoreModuleRuntimeAdapter
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:19 .toRuntimeModules()
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:96 label: "Notifications runtime",
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelation.ts:1 export interface RuntimeRelation {
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:2 RuntimeRelation,
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:4 from "@/runtime/relations/RuntimeRelation";
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:6 export const runtimeRelations:
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:7 RuntimeRelation[] = [
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:2 runtimeRelations,
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:4 from "@/runtime/relations/runtimeRelations";
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:6 export class RuntimeRelationsEngine {
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:12 return runtimeRelations.filter(
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:28 return runtimeRelations.filter(
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:41 return runtimeRelations.filter(
C:\Users\Admin\terragest\src\runtime\repositories\index.ts:1 export { RuntimeRepository } from "./RuntimeRepository";
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:2 import type { RuntimeRecord } from "@/runtime/data-binding/RuntimeRecord";
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:4 const memoryStore = new Map<string, RuntimeRecord[]>();
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:6 function getStore(module: ERPModule): RuntimeRecord[] {
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:16 export class RuntimeRepository {
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:17 static async findMany(module: ERPModule): Promise<RuntimeRecord[]> {
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:24 return RuntimeRepository.seed(module);
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:30 ): Promise<RuntimeRecord | null> {
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:31 const rows = await RuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:39 ): Promise<RuntimeRecord> {
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:42 const record: RuntimeRecord = {
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:56 ): Promise<RuntimeRecord> {
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:79 static async seed(module: ERPModule): Promise<RuntimeRecord[]> {
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:81 const row: RuntimeRecord = {
C:\Users\Admin\terragest\src\runtime\resilience\ERPRuntimeResilienceSeed.ts:5 export function seedERPRuntimeResilience() {
C:\Users\Admin\terragest\src\runtime\resilience\index.ts:7 export * from "./ERPRuntimeResilienceSeed";
C:\Users\Admin\terragest\src\runtime\resilience\dlq\DeadLetterQueue.ts:27 "runtime_dead_letters"
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:3 } from "@/runtime/events/bus/ERPEventBus";
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:8 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:59 actor: "queue-runtime",
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:73 module: "runtime",
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:75 description: "Le worker runtime est temporairement bloque.",
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:100 throw new Error("Forced runtime failure");
C:\Users\Admin\terragest\src\runtime\rules\ERPRuntimeValidationBridge.ts:5 export class ERPRuntimeValidationBridge {
C:\Users\Admin\terragest\src\runtime\rules\ERPRuntimeValidationBridge.ts:20 export const erpRuntimeValidationBridge =
C:\Users\Admin\terragest\src\runtime\rules\ERPRuntimeValidationBridge.ts:21 new ERPRuntimeValidationBridge();
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeScheduler.ts:2 RuntimeAutomationEngine,
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeScheduler.ts:4 from "@/runtime/automation/RuntimeAutomationEngine";
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeScheduler.ts:6 export class RuntimeScheduler {
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeScheduler.ts:23 "ERP Runtime Scheduler started"
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeScheduler.ts:37 await RuntimeAutomationEngine
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeSchedulerBootstrap.tsx:9 RuntimeScheduler,
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeSchedulerBootstrap.tsx:11 from "@/runtime/scheduler/RuntimeScheduler";
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeSchedulerBootstrap.tsx:13 export function RuntimeSchedulerBootstrap() {
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeSchedulerBootstrap.tsx:17 RuntimeScheduler.start();
C:\Users\Admin\terragest\src\runtime\schemas\ERPBusinessSchemaRegistry.ts:2 CoreModuleRuntimeAdapter,
C:\Users\Admin\terragest\src\runtime\schemas\ERPBusinessSchemaRegistry.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\schemas\ERPBusinessSchemaRegistry.ts:31 return CoreModuleRuntimeAdapter
C:\Users\Admin\terragest\src\runtime\security\ERPSecuritySeed.ts:5 export function seedERPSecurityRuntime() {
C:\Users\Admin\terragest\src\runtime\security\RuntimeSecurityManager.ts:27 RuntimeSecurityManager {
C:\Users\Admin\terragest\src\runtime\security\permissions\ERPPermissionRegistry.ts:1 import { ERPRegistry } from "@/runtime/registry";
C:\Users\Admin\terragest\src\runtime\security\policies\ERPPolicyRegistry.ts:1 import { ERPRegistry } from "@/runtime/registry";
C:\Users\Admin\terragest\src\runtime\security-runtime\index.ts:1 export type { RuntimeRole, RuntimeUser } from "./RuntimeRole";
C:\Users\Admin\terragest\src\runtime\security-runtime\index.ts:2 export type { RuntimePermission } from "./RuntimePermission";
C:\Users\Admin\terragest\src\runtime\security-runtime\index.ts:4 export { RuntimeSecurityContext } from "./RuntimeSecurityContext";
C:\Users\Admin\terragest\src\runtime\security-runtime\index.ts:5 export { runtimeRolePermissions } from "./RuntimePolicyRegistry";
C:\Users\Admin\terragest\src\runtime\security-runtime\index.ts:6 export { RuntimePolicyEngine } from "./RuntimePolicyEngine";
C:\Users\Admin\terragest\src\runtime\security-runtime\index.ts:7 export { RuntimeActionPermissionMapper } from "./RuntimeActionPermissionMapper";
C:\Users\Admin\terragest\src\runtime\security-runtime\index.ts:8 export { RuntimeActionGuard } from "./RuntimeActionGuard";
C:\Users\Admin\terragest\src\runtime\security-runtime\index.ts:9 export { RuntimeWorkflowGuard } from "./RuntimeWorkflowGuard";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionGuard.ts:1 import type { ERPAction } from "@/runtime/actions";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionGuard.ts:2 import { RuntimeSecurityContext } from "./RuntimeSecurityContext";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionGuard.ts:3 import { RuntimePolicyEngine } from "./RuntimePolicyEngine";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionGuard.ts:4 import { RuntimeActionPermissionMapper } from "./RuntimeActionPermissionMapper";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionGuard.ts:6 export class RuntimeActionGuard {
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionGuard.ts:8 const user = RuntimeSecurityContext.currentUser();
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionGuard.ts:9 const permission = RuntimeActionPermissionMapper.permissionFor(action);
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionGuard.ts:15 return RuntimePolicyEngine.can(user, permission);
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionGuard.ts:20 RuntimeActionGuard.canExecute(action)
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:1 import type { ERPAction } from "@/runtime/actions";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:2 import type { RuntimePermission } from "./RuntimePermission";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:4 export class RuntimeActionPermissionMapper {
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:5 static permissionFor(action: ERPAction): RuntimePermission | undefined {
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePermission.ts:1 export type RuntimePermission =
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:1 import type { RuntimePermission } from "./RuntimePermission";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:2 import type { RuntimeUser } from "./RuntimeRole";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:3 import { runtimeRolePermissions } from "./RuntimePolicyRegistry";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:5 export class RuntimePolicyEngine {
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:7 user: RuntimeUser,
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:8 permission: RuntimePermission
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:10 return runtimeRolePermissions[user.role].includes(permission);
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:13 static filterByPermission<T extends { permission?: RuntimePermission }>(
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:14 user: RuntimeUser,
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:22 return RuntimePolicyEngine.can(user, item.permission);
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:1 import type { RuntimeRole } from "./RuntimeRole";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:2 import type { RuntimePermission } from "./RuntimePermission";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:4 export const runtimeRolePermissions: Record<RuntimeRole, RuntimePermission[]> = {
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeRole.ts:1 export type RuntimeRole =
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeRole.ts:7 export interface RuntimeUser {
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeRole.ts:10 role: RuntimeRole;
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeSecurityContext.ts:1 import type { RuntimeUser } from "./RuntimeRole";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeSecurityContext.ts:3 export class RuntimeSecurityContext {
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeSecurityContext.ts:4 static currentUser(): RuntimeUser {
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:1 import { RuntimeSecurityContext } from "./RuntimeSecurityContext";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:2 import { RuntimePolicyEngine } from "./RuntimePolicyEngine";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:4 export class RuntimeWorkflowGuard {
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:6 const user = RuntimeSecurityContext.currentUser();
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:8 return RuntimePolicyEngine.can(user, "workflow.start");
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:12 const user = RuntimeSecurityContext.currentUser();
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:14 return RuntimePolicyEngine.can(user, "workflow.transition");
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:18 const user = RuntimeSecurityContext.currentUser();
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:20 return RuntimePolicyEngine.can(user, "workflow.validate");
C:\Users\Admin\terragest\src\runtime\selects\DynamicSelectEngine.ts:5 from "@/runtime/selects/DynamicSelect.types";
C:\Users\Admin\terragest\src\runtime\selects\ERPDynamicSelect.tsx:12 from "@/runtime/selects/DynamicSelectEngine";
C:\Users\Admin\terragest\src\runtime\shared\ERPRuntimeCollection.ts:1 export class ERPRuntimeCollection<T> {
C:\Users\Admin\terragest\src\runtime\shared\ERPRuntimeEntity.ts:5 } from "./ERPRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\shared\ERPRuntimeEntity.ts:7 export interface ERPRuntimeEntity {
C:\Users\Admin\terragest\src\runtime\shared\ERPRuntimeStore.ts:1 export class ERPRuntimeStore<T> {
C:\Users\Admin\terragest\src\runtime\shared\ERPRuntimeTypes.ts:18 export interface ERPBaseRuntimeRecord {
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartAnomalyDetector.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartOperationalIntelligence.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartPredictionEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartRecommendationEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartScoringEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartScoringEngine.ts:29 "Score calcule a partir des signaux runtime, workflows, events et donnees metier.",
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartPriorityEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartRecommendations.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartRuntimeEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartRuntimeEngine.ts:4 export class ERPSmartRuntimeEngine {
C:\Users\Admin\terragest\src\runtime\smart-runtime\index.ts:6 export { ERPSmartRuntimeEngine } from "./ERPSmartRuntimeEngine";
C:\Users\Admin\terragest\src\runtime\state\ERPStateBadge.tsx:4 RuntimeStateEngine,
C:\Users\Admin\terragest\src\runtime\state\ERPStateBadge.tsx:6 from "@/runtime/state/RuntimeStateEngine";
C:\Users\Admin\terragest\src\runtime\state\ERPStateBadge.tsx:24 RuntimeStateEngine
C:\Users\Admin\terragest\src\runtime\state\RuntimeState.ts:1 export interface RuntimeState {
C:\Users\Admin\terragest\src\runtime\state\RuntimeStateEngine.ts:2 runtimeStates,
C:\Users\Admin\terragest\src\runtime\state\RuntimeStateEngine.ts:4 from "@/runtime/state/runtimeStates";
C:\Users\Admin\terragest\src\runtime\state\RuntimeStateEngine.ts:6 export class RuntimeStateEngine {
C:\Users\Admin\terragest\src\runtime\state\RuntimeStateEngine.ts:12 return runtimeStates.filter(
C:\Users\Admin\terragest\src\runtime\state\RuntimeStateEngine.ts:29 return runtimeStates.find(
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:2 RuntimeState,
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:4 from "@/runtime/state/RuntimeState";
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:6 export const runtimeStates:
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:7 RuntimeState[] = [
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:7 export function seedERPStreamsRuntime() {
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:16 module: "runtime",
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:18 message: "Runtime ERP initialise",
C:\Users\Admin\terragest\src\runtime\streams\channels\ERPStreamRegistry.ts:9 id: "stream_runtime",
C:\Users\Admin\terragest\src\runtime\streams\channels\ERPStreamRegistry.ts:10 key: "runtime",
C:\Users\Admin\terragest\src\runtime\streams\channels\ERPStreamRegistry.ts:11 label: "Runtime Stream",
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:7 export function seedERPTenantRuntime() {
C:\Users\Admin\terragest\src\runtime\testing\index.ts:4 export * from "./simulation/ERPRuntimeSimulation";
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:32 module: "runtime",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:59 id: "automation_runtime",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:60 label: "Automation Runtime",
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:3 } from "@/runtime/workers";
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:7 } from "@/runtime/security";
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:11 } from "@/runtime/automation";
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:13 export const ERPRuntimeSimulation = {
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:23 "worker_runtime_1",
C:\Users\Admin\terragest\src\runtime\ui\ERPUIComposition.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\ui\ERPUIComposition.ts:2 import { ERPActionRegistry } from "@/runtime/actions";
C:\Users\Admin\terragest\src\runtime\ui-generation\ERPDefaultSchemas.ts:11 CoreModuleRuntimeAdapter
C:\Users\Admin\terragest\src\runtime\ui-generation\ERPGeneratedSchemaResolver.ts:2 CoreModuleRuntimeAdapter,
C:\Users\Admin\terragest\src\runtime\ui-generation\ERPGeneratedSchemaResolver.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\ui-generation\ERPGeneratedSchemaResolver.ts:13 CoreModuleRuntimeAdapter
C:\Users\Admin\terragest\src\runtime\ui-generation\ERPGeneratedSchemaResolver.ts:23 description: "Module ERP runtime.",
C:\Users\Admin\terragest\src\runtime\validation\RuntimeFieldValidator.ts:2 RuntimeFieldValidation,
C:\Users\Admin\terragest\src\runtime\validation\RuntimeFieldValidator.ts:3 RuntimeValidationError,
C:\Users\Admin\terragest\src\runtime\validation\RuntimeFieldValidator.ts:4 } from "./RuntimeValidationTypes";
C:\Users\Admin\terragest\src\runtime\validation\RuntimeFieldValidator.ts:6 export class RuntimeFieldValidator {
C:\Users\Admin\terragest\src\runtime\validation\RuntimeFieldValidator.ts:10 validation?: RuntimeFieldValidation
C:\Users\Admin\terragest\src\runtime\validation\RuntimeFieldValidator.ts:11 ): RuntimeValidationError[] {
C:\Users\Admin\terragest\src\runtime\validation\RuntimeFieldValidator.ts:16 const errors: RuntimeValidationError[] = [];
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationEngine.ts:4 } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationEngine.ts:7 RuntimeFieldValidator,
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationEngine.ts:8 } from "./RuntimeFieldValidator";
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationEngine.ts:11 RuntimeValidationError,
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationEngine.ts:12 } from "./RuntimeValidationTypes";
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationEngine.ts:14 export class RuntimeValidationEngine {
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationEngine.ts:18 ): RuntimeValidationError[] {
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationEngine.ts:20 const errors: RuntimeValidationError[] = [];
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationEngine.ts:26 RuntimeFieldValidator.validate(
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationTypes.ts:1 export interface RuntimeFieldValidation {
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationTypes.ts:17 export interface RuntimeValidationError {
C:\Users\Admin\terragest\src\runtime\visibility\RuntimeVisibilityEngine.ts:1 export class RuntimeVisibilityEngine {
C:\Users\Admin\terragest\src\runtime\workers\ERPWorkersSeed.ts:7 export function seedERPWorkersRuntime() {
C:\Users\Admin\terragest\src\runtime\workers\ERPWorkersSeed.ts:16 "worker_runtime_1",
C:\Users\Admin\terragest\src\runtime\workers\ERPWorkersSeed.ts:28 "worker_runtime_1",
C:\Users\Admin\terragest\src\runtime\workers\registry\ERPWorkerRegistry.ts:7 id: "worker_runtime_1",
C:\Users\Admin\terragest\src\runtime\workers\registry\ERPWorkerRegistry.ts:8 label: "Runtime Worker 1",
C:\Users\Admin\terragest\src\runtime\workers\registry\ERPWorkerRegistry.ts:9 queue: "runtime",
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:14 from "@/runtime/workflow-persistence/WorkflowHistoryEntry";
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:4 from "@/runtime/workflow-persistence/WorkflowPersistenceEngine";
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:6 export class WorkflowRuntimeService {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:2 WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:3 WorkflowRuntimeHistoryEntry,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:4 WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:5 WorkflowRuntimeStatus,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:6 WorkflowRuntimeStep,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:7 WorkflowRuntimeTransition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:8 } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:10 export { workflowRuntimeDefinitions } from "./WorkflowRuntimeDefinitions";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:11 export { WorkflowRuntimeRegistry } from "./WorkflowRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:12 export { WorkflowRuntimeStore } from "./WorkflowRuntimeStore";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:13 export { WorkflowRuntimeValidator } from "./WorkflowRuntimeValidator";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:14 export { WorkflowRuntimeAudit } from "./WorkflowRuntimeAudit";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:15 export { WorkflowRuntimeEngine } from "./WorkflowRuntimeEngine";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:1 import type { WorkflowRuntimeInstance } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:3 export class WorkflowRuntimeAudit {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:4 static log(instance: WorkflowRuntimeInstance, label: string) {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:1 import type { WorkflowRuntimeDefinition } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:3 export const workflowRuntimeDefinitions: WorkflowRuntimeDefinition[] = [
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:1 import { WorkflowRuntimeRegistry } from "./WorkflowRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:2 import { WorkflowRuntimeStore } from "./WorkflowRuntimeStore";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:3 import { WorkflowRuntimeValidator } from "./WorkflowRuntimeValidator";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:4 import { WorkflowRuntimeAudit } from "./WorkflowRuntimeAudit";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:6 export class WorkflowRuntimeEngine {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:8 const definition = WorkflowRuntimeRegistry.get(workflowKey);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:14 const instance = WorkflowRuntimeStore.create(definition, recordId);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:16 WorkflowRuntimeAudit.log(instance, "Workflow demarre");
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:26 const definition = WorkflowRuntimeRegistry.get(workflowKey);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:32 const instance = WorkflowRuntimeStore.create(definition, recordId);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:35 WorkflowRuntimeValidator.findTransition(
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:66 WorkflowRuntimeStore.save(instance);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:67 WorkflowRuntimeAudit.log(instance, transition.label);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:1 import type { WorkflowRuntimeDefinition } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:2 import { workflowRuntimeDefinitions } from "./WorkflowRuntimeDefinitions";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:4 export class WorkflowRuntimeRegistry {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:5 static all(): WorkflowRuntimeDefinition[] {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:6 return workflowRuntimeDefinitions;
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:9 static forModule(moduleKey: string): WorkflowRuntimeDefinition[] {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:10 return workflowRuntimeDefinitions.filter(
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:15 static get(workflowKey: string): WorkflowRuntimeDefinition | undefined {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:16 return workflowRuntimeDefinitions.find(
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:2 WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:3 WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:4 } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:6 const instances = new Map<string, WorkflowRuntimeInstance>();
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:8 export class WorkflowRuntimeStore {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:10 definition: WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:12 ): WorkflowRuntimeInstance {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:21 const instance: WorkflowRuntimeInstance = {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:43 static get(id: string): WorkflowRuntimeInstance | undefined {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:47 static save(instance: WorkflowRuntimeInstance) {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:1 export type WorkflowRuntimeStatus =
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:9 export interface WorkflowRuntimeStep {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:13 status?: WorkflowRuntimeStatus;
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:16 export interface WorkflowRuntimeTransition {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:23 export interface WorkflowRuntimeDefinition {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:28 steps: WorkflowRuntimeStep[];
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:29 transitions: WorkflowRuntimeTransition[];
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:32 export interface WorkflowRuntimeInstance {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:38 status: WorkflowRuntimeStatus;
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:39 history: WorkflowRuntimeHistoryEntry[];
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:42 export interface WorkflowRuntimeHistoryEntry {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:2 WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:3 WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:4 WorkflowRuntimeTransition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:5 } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:7 export class WorkflowRuntimeValidator {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:9 definition: WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:10 instance: WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:12 ): WorkflowRuntimeTransition | undefined {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:21 definition: WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:22 instance: WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:26 WorkflowRuntimeValidator.findTransition(
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:4 WorkflowRuntimeEngine,
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:6 from "@/runtime/workflow-ui/WorkflowRuntimeEngine";
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:35 WorkflowRuntimeEngine
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:5 from "@/runtime/workflow-ui/Workflow.types";
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:4 from "@/runtime/workflow-ui/maintenance.workflow";
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:7 RuntimePermissionsEngine,
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:9 from "@/runtime/permissions/RuntimePermissionsEngine";
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:12 RuntimeStateEngine,
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:14 from "@/runtime/state/RuntimeStateEngine";
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:22 export class WorkflowRuntimeEngine {
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:57 RuntimeStateEngine
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:64 RuntimePermissionsEngine.can(
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:8 export class ERPWorkflowRuntimeEngine {
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:53 export const erpWorkflowRuntimeEngine =
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:54 new ERPWorkflowRuntimeEngine();
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:24 from "@/runtime/resilience/retry/RetryEngine";
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:29 from "@/runtime/resilience/dlq/DeadLetterQueue";
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:177 "workflow-runtime",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:7 export function seedERPRuntimeWorkflows() {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\index.ts:6 export * from "./ERPRuntimeWorkflowSeed";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:3 } from "@/runtime/events/bus/ERPEventBus";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:7 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:30 "runtime_workflow_executions"
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:56 "runtime_workflow_executions",
C:\Users\Admin\terragest\src\_quarantine\layout\Sidebar.tsx:156 Runtime Driven ERP
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\contrats.form.ts:4 from "@/runtime/forms/DynamicField";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\contrats.form.ts:9 from "@/runtime/forms/DynamicFormDefinition";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\exploitations.form.ts:5 from "@/runtime/forms/DynamicField";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\exploitations.form.ts:10 from "@/runtime/forms/DynamicFormDefinition";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\interventions.form.ts:5 from "@/runtime/forms/DynamicField";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\interventions.form.ts:10 from "@/runtime/forms/DynamicFormDefinition";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\maintenance.form.ts:5 from "@/runtime/forms/DynamicField";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\maintenance.form.ts:10 from "@/runtime/forms/DynamicFormDefinition";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\materiels.form.ts:5 from "@/runtime/forms/DynamicField";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\materiels.form.ts:10 from "@/runtime/forms/DynamicFormDefinition";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\paiements.form.ts:4 from "@/runtime/forms/DynamicField";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\paiements.form.ts:9 from "@/runtime/forms/DynamicFormDefinition";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\produits.form.ts:4 from "@/runtime/forms/DynamicField";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\produits.form.ts:9 from "@/runtime/forms/DynamicFormDefinition";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\stocks.form.ts:4 from "@/runtime/forms/DynamicField";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\stocks.form.ts:9 from "@/runtime/forms/DynamicFormDefinition";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\terrains.form.ts:5 from "@/runtime/forms/DynamicField";
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\terrains.form.ts:10 from "@/runtime/forms/DynamicFormDefinition";
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:1 export const GeneratedRuntimeBindings = {
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:2 RuntimeModuleContract,
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:3 } from "../core/RuntimeContracts";
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:5 export const GeneratedRuntimeModules:
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:6 RuntimeModuleContract[] = [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:1 export const GeneratedRuntimeWorkflows = {
```

## Workflow engines

```txt
C:\Users\Admin\terragest\src\analytics\aggregation\AggregationService.ts:5 totalWorkflows: 0,
C:\Users\Admin\terragest\src\analytics\services\AggregationService.ts:6 totalWorkflows: 0,
C:\Users\Admin\terragest\src\app\(private)\contrats\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\contrats\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\exploitations\details\page.tsx:98 Workflow maintenance exécuté automatiquement.
C:\Users\Admin\terragest\src\app\(private)\exploitations\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\exploitations\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:9 import { ERPWorkflowStep }
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:10 from "@/components/erp/workflow/ERPWorkflowStep";
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:12 export default function InterventionWorkflowPage() {
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:17 title="Workflow intervention"
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:21 <ERPWidgetCard title="Progression workflow">
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:25 <ERPWorkflowStep
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:31 <ERPWorkflowStep
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:34 description="Le workflow intervention a été déclenché."
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:37 <ERPWorkflowStep
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:43 <ERPWorkflowStep
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:49 <ERPWorkflowStep
C:\Users\Admin\terragest\src\app\(private)\interventions\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\interventions\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\maintenance\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\maintenance\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\materiels\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\materiels\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\operations\page.tsx:36 item.workflow
C:\Users\Admin\terragest\src\app\(private)\operations\page.tsx:57 `Intervention ${item.workflow}`
C:\Users\Admin\terragest\src\app\(private)\operations\page.tsx:104 workflowsActifs={
C:\Users\Admin\terragest\src\app\(private)\paiements\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\paiements\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\produits\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\produits\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\stocks\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\stocks\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\terrains\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\terrains\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\workflows-runtime\page.tsx:1 import { ERPRuntimeWorkflowDashboard } from "@/components/erp/workflows";
C:\Users\Admin\terragest\src\app\(private)\workflows-runtime\page.tsx:4 return <ERPRuntimeWorkflowDashboard />;
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:67 workflow:
C:\Users\Admin\terragest\src\components\erp\activity\ERPActivityFeed.tsx:8 description: "Workflow intervention déclenché sur TR-204.",
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIInsights.tsx:22 title: "Performance workflow",
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:13 action: "Modification workflow maintenance",
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:29 workflowBlocked: true,
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitHealthPanel.tsx:27 label: "Workflows declares",
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitHealthPanel.tsx:28 ok: snapshot.workflowsCount > 0,
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitMetricGrid.tsx:18 <ERPStatCard label="Workflows" value={snapshot.workflowsCount} helper="Processus metier" />
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:31 <th className="px-4 py-3 text-left font-semibold text-slate-600">Workflows</th>
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:44 <td className="px-4 py-3 text-slate-600">{module.workflows.length}</td>
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx:20 label: "Workflow monitoring",
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx:21 value: snapshot.workflowsCount,
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx:22 helper: "Workflows rattaches aux modules",
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpit.tsx:19 <ERPStatCard label="Workflows" value="Monitoring" />
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpitDashboard.tsx:17 description="Supervision centrale des modules, schemas, actions, workflows, events, automation, permissions et navigation."
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:43 const workflowCount =
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:46 entry.type === "workflow"
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:98 workflows, événements, règles métier et monitoring ERP.
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:115 Workflows
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:119 {workflowCount}
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:46 function simulateWorkflow() {
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:47 ERPEventRuntimeOrchestrator.simulateWorkflowCompleted();
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:77 <ERPButton variant="ghost" type="button" onClick={simulateWorkflow}>
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:78 Simuler workflow termine
C:\Users\Admin\terragest\src\components\erp\executive-dashboard\ERPExecutiveDashboard.tsx:23 <div className="text-sm text-gray-500">Workflows</div>
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx:43 <p>4. Declenchement possible du workflow</p>
C:\Users\Admin\terragest\src\components\erp\kpi\ERPKPIGrid.tsx:11 label: "Workflows actifs",
C:\Users\Admin\terragest\src\components\erp\layout\ERPActionBar.tsx:14 <ERPButton variant="ghost" type="button">Workflow</ERPButton>
C:\Users\Admin\terragest\src\components\erp\layout\ERPCommandPanel.tsx:32 Actions globales connectables aux workflows, rÃ¨gles et audit.
C:\Users\Admin\terragest\src\components\erp\layout\ERPCommandPanel.tsx:36 <ERPButton type="button">Lancer workflow</ERPButton>
C:\Users\Admin\terragest\src\components\erp\layout\ERPTabNavigation.tsx:4 "Workflows",
C:\Users\Admin\terragest\src\components\erp\live\ERPLiveEvents.tsx:8 label: "Workflow maintenance exécuté",
C:\Users\Admin\terragest\src\components\erp\modules\ERPModuleEnterprisePage.tsx:28 helper: "Events et workflows",
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPMonitoringMetricsGrid.tsx:20 <ERPStatCard label="Workflows" value={metrics.workflows} helper="Instances" />
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPSystemHealth.tsx:11 ["Workflows", "healthy"],
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:22 ["Workflows", snapshot.workflows.length],
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:34 description="Repository runtime tenant-aware pour events, traces, alerts, workflows, queue jobs et audit."
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:18 <ERPStatCard label="Workflows" value={snapshot.workflows} helper="Processus live" />
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatus.tsx:10 name: "Workflow Engine",
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:25 description="Source unique de verite ERP pour modules, schemas, actions, workflows, permissions et automation."
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:79 Workflows
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:109 {module.workflows.length}
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:19 Permissions runtime appliquees aux actions et workflows.
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:59 case "workflows":
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:60 return "Workflows";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActivityPanel.tsx:23 title: "Workflow disponible",
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleDashboardTemplate.tsx:5 import { ERPModuleWorkflowPanel } from "./ERPModuleWorkflowPanel";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleDashboardTemplate.tsx:21 <ERPModuleWorkflowPanel module={module} />
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleListTemplate.tsx:7 import { ERPModuleWorkflowPanel } from "./ERPModuleWorkflowPanel";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleListTemplate.tsx:28 <ERPModuleWorkflowPanel module={module} />
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleToolbar.tsx:21 <option>Vue workflow</option>
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:4 interface ERPModuleWorkflowPanelProps {
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:8 export function ERPModuleWorkflowPanel({
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:10 }: ERPModuleWorkflowPanelProps) {
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:11 const workflowsEnabled = module.metadata.features?.workflows === true;
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:22 Actions operationnelles, workflows et audit discret.
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:27 {workflowsEnabled && <ERPBadge tone="info">Workflows</ERPBadge>}
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:16 | "workflows";
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:50 workflows: GenericERPTemplate,
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsPanel.tsx:60 <p className="text-sm text-slate-500">Workflows</p>
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsPanel.tsx:62 {metrics.workflows}
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingDashboard.tsx:35 description="Validation runtime, workflows, workers, securite, multi-tenant et observability."
C:\Users\Admin\terragest\src\components\erp\timeline\ERPEventTimeline.tsx:7 title: "Workflow maintenance exécuté",
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:3 import { ERPWorkflowStep }
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:4 from "@/components/erp/workflow/ERPWorkflowStep";
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:6 export function ERPWorkflowBoard() {
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:12 <ERPWorkflowStep
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:18 <ERPWorkflowStep
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:21 description="Workflow intervention déclenché."
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:24 <ERPWorkflowStep
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:30 <ERPWorkflowStep
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:36 <ERPWorkflowStep
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:37 title="Clôture workflow"
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:39 description="Workflow non terminé."
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowStep.tsx:3 export function ERPWorkflowStep({
C:\Users\Admin\terragest\src\components\erp\workflow\WorkflowActions.tsx:1 // src/components/erp/workflow/WorkflowActions.tsx
C:\Users\Admin\terragest\src\components\erp\workflow\WorkflowActions.tsx:3 interface WorkflowActionsProps {
C:\Users\Admin\terragest\src\components\erp\workflow\WorkflowActions.tsx:10 export function WorkflowActions({
C:\Users\Admin\terragest\src\components\erp\workflow\WorkflowActions.tsx:15 }: WorkflowActionsProps) {
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:3 type WorkflowStep = {
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:11 type WorkflowTransition = {
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:20 steps: WorkflowStep[];
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:22 transitions: WorkflowTransition[];
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:25 export function ERPWorkflowDesigner({
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:123 Aucun workflow ERP.
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:7 type WorkflowStep = {
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:13 type WorkflowTransition = {
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:20 initialSteps?: WorkflowStep[];
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:22 initialTransitions?: WorkflowTransition[];
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:25 export function ERPVisualWorkflowEditor({
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:87 ERP Workflow Editor
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:91 Construisez visuellement vos workflows ERP.
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:203 Workflow Runtime
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:260 Aucun workflow défini.
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:7 WorkflowRuntimeEngine,
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:8 WorkflowRuntimeRegistry,
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:9 type WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:10 } from "@/runtime/workflow-runtime";
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:11 import { RuntimeWorkflowGuard } from "@/runtime/security-runtime";
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:13 interface ERPWorkflowRuntimePanelProps {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:18 export function ERPWorkflowRuntimePanel({
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:21 }: ERPWorkflowRuntimePanelProps) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:22 const workflows = WorkflowRuntimeRegistry.forModule(module.metadata.key);
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:23 const workflow = workflows[0];
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:26 useState<WorkflowRuntimeInstance | null>(null);
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:28 if (!workflow) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:32 Workflows
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:35 Aucun workflow declare pour ce module.
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:41 const currentStep = instance?.currentStep ?? workflow.initialStep;
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:43 const availableTransitions = workflow.transitions.filter(
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:47 function startWorkflow() {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:48 if (!RuntimeWorkflowGuard.canStart()) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:53 WorkflowRuntimeEngine.start(workflow.key, recordId)
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:58 if (requiresValidation && !RuntimeWorkflowGuard.canValidate()) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:62 if (!RuntimeWorkflowGuard.canTransition()) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:67 WorkflowRuntimeEngine.transition(workflow.key, recordId, to)
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:76 Workflow runtime
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:79 {workflow.label}
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:89 {workflow.steps.map((step) => {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:109 {!instance && RuntimeWorkflowGuard.canStart() && (
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:110 <ERPButton type="button" onClick={startWorkflow}>
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:111 Demarrer workflow
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:118 !RuntimeWorkflowGuard.canValidate();
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:120 if (hidden || !RuntimeWorkflowGuard.canTransition()) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\index.ts:1 export { ERPWorkflowRuntimePanel } from "./ERPWorkflowRuntimePanel";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:2 import { seedERPRuntimeWorkflows } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:4 import { ERPWorkflowMetricGrid } from "./ERPWorkflowMetricGrid";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:5 import { ERPWorkflowDefinitionsPanel } from "./ERPWorkflowDefinitionsPanel";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:6 import { ERPWorkflowExecutionsPanel } from "./ERPWorkflowExecutionsPanel";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:7 import { ERPWorkflowTimelinePanel } from "./ERPWorkflowTimelinePanel";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:9 seedERPRuntimeWorkflows();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:11 export function ERPRuntimeWorkflowDashboard() {
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:15 eyebrow="ERP Workflow Engine"
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:16 title="Workflow Engine Enterprise"
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:20 <ERPWorkflowMetricGrid />
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:23 <ERPWorkflowDefinitionsPanel />
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:24 <ERPWorkflowExecutionsPanel />
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:27 <ERPWorkflowTimelinePanel />
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:2 import { ERPWorkflowEngine } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:4 export function ERPWorkflowDefinitionsPanel() {
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:6 ERPWorkflowEngine.definitions();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:12 Definitions workflows
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:20 {definitions.map((workflow) => (
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:22 key={workflow.key}
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:28 {workflow.label}
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:31 {workflow.description}
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:36 {workflow.module}
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:41 {workflow.steps.map((step) => (
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowExecutionsPanel.tsx:2 import { ERPWorkflowExecutionStore } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowExecutionsPanel.tsx:4 export function ERPWorkflowExecutionsPanel() {
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowExecutionsPanel.tsx:6 ERPWorkflowExecutionStore.all();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowExecutionsPanel.tsx:15 Instances de workflows lancees par le moteur.
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowExecutionsPanel.tsx:28 {execution.workflowKey}
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:3 ERPWorkflowEngine,
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:4 ERPWorkflowExecutionStore,
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:5 ERPWorkflowTimelineStore,
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:6 } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:8 export function ERPWorkflowMetricGrid() {
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:10 ERPWorkflowEngine.definitions();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:13 ERPWorkflowExecutionStore.all();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:16 ERPWorkflowTimelineStore.all();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:23 <ERPStatCard label="Definitions" value={definitions.length} helper="Workflows declares" />
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:26 <ERPStatCard label="Timeline" value={timeline.length} helper="Evenements workflow" />
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowTimelinePanel.tsx:2 import { ERPWorkflowTimelineStore } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowTimelinePanel.tsx:4 export function ERPWorkflowTimelinePanel() {
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowTimelinePanel.tsx:6 ERPWorkflowTimelineStore.all();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowTimelinePanel.tsx:12 Timeline workflow
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowTimelinePanel.tsx:15 Evenements produits par le workflow engine.
C:\Users\Admin\terragest\src\components\erp\workflows\index.ts:1 export * from "./ERPWorkflowMetricGrid";
C:\Users\Admin\terragest\src\components\erp\workflows\index.ts:2 export * from "./ERPWorkflowDefinitionsPanel";
C:\Users\Admin\terragest\src\components\erp\workflows\index.ts:3 export * from "./ERPWorkflowExecutionsPanel";
C:\Users\Admin\terragest\src\components\erp\workflows\index.ts:4 export * from "./ERPWorkflowTimelinePanel";
C:\Users\Admin\terragest\src\components\erp\workflows\index.ts:5 export * from "./ERPRuntimeWorkflowDashboard";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceActivity.tsx:12 "Workflow disponible pour validation",
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:3 import { ERPWorkflowRuntimePanel } from "@/components/erp/workflow-runtime";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:32 <ERPWorkflowRuntimePanel module={module} />
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceTabs.tsx:5 "Workflows",
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:71 workflow:
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:67 workflow:
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:13 import { MaintenanceWorkflowService }
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:14 from "@/domains/maintenance/services/MaintenanceWorkflowService";
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:32 MaintenanceWorkflowService
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:45 MaintenanceWorkflowService
C:\Users\Admin\terragest\src\components\operations\OperationsMetrics.tsx:9 workflowsActifs: number;
C:\Users\Admin\terragest\src\components\operations\OperationsMetrics.tsx:18 workflowsActifs
C:\Users\Admin\terragest\src\components\operations\OperationsMetrics.tsx:44 "Workflows actifs",
C:\Users\Admin\terragest\src\components\operations\OperationsMetrics.tsx:47 workflowsActifs
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:85 workflow:
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:15 import { WorkflowStatus }
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:16 from "@/components/workflow/WorkflowStatus";
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:21 import { WorkflowActions }
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:22 from "@/components/erp/workflow/WorkflowActions";
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:41 function validateWorkflow() {
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:53 function approveWorkflow() {
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:98 <WorkflowStatus
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:100 stock.workflow
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:104 <WorkflowActions
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:107 validateWorkflow
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:111 approveWorkflow
C:\Users\Admin\terragest\src\components\workflow\WorkflowStatus.tsx:1 // src/components/workflow/WorkflowStatus.tsx
C:\Users\Admin\terragest\src\components\workflow\WorkflowStatus.tsx:3 interface WorkflowStatusProps {
C:\Users\Admin\terragest\src\components\workflow\WorkflowStatus.tsx:8 export function WorkflowStatus({
C:\Users\Admin\terragest\src\components\workflow\WorkflowStatus.tsx:11 }: WorkflowStatusProps) {
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:21 workflow?: string;
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:80 console.log("WORKFLOW EXECUTION", {
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:81 workflow:
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:82 `${payload.module}.${payload.action}.workflow`,
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:88 type: "workflow",
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:92 `Workflow ${payload.module}.${payload.action}.workflow`,
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:144 workflow:
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:145 `${payload.module}.${payload.action}.workflow`,
C:\Users\Admin\terragest\src\core\dead-letter\dead-letter-queue.ts:60 type: "workflow",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:21 "EVENT BUS : maintenance workflow"
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:66 type: "workflow",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:71 "Workflow maintenance déclenché via Event Bus",
C:\Users\Admin\terragest\src\core\hooks\register-hooks.ts:23 "WORKFLOW MAINTENANCE START"
C:\Users\Admin\terragest\src\core\hooks\register-hooks.ts:48 "WORKFLOW REAPPROVISIONNEMENT"
C:\Users\Admin\terragest\src\core\jobs\job-worker.ts:22 type: "workflow",
C:\Users\Admin\terragest\src\core\jobs\job-worker.ts:40 type: "workflow",
C:\Users\Admin\terragest\src\core\layout\Sidebar.tsx:11 ["Interventions", "/interventions/workflow"],
C:\Users\Admin\terragest\src\core\metrics\metrics-engine.ts:10 workflowExecutions: number;
C:\Users\Admin\terragest\src\core\metrics\metrics-engine.ts:25 workflowExecutions: 0,
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:17 workflow?: boolean;
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:132 workflow:
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:134 module.metadata.features?.workflows
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:2 workflows?: boolean;
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:35 workflows: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:60 workflows: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:83 workflows: true,
C:\Users\Admin\terragest\src\core\navigation\navigation-builder.ts:17 label: "Workflows",
C:\Users\Admin\terragest\src\core\navigation\navigation-builder.ts:18 href: "/workflows",
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:16 | "workflow"
C:\Users\Admin\terragest\src\core\retry\retry-engine.ts:61 type: "workflow",
C:\Users\Admin\terragest\src\core\router\worker-router.ts:51 return "workflow";
C:\Users\Admin\terragest\src\core\router\worker-router.ts:81 type: "workflow",
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:33 type: "workflow",
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:37 "Workflow maintenance critique déclenché",
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:14 | "workflow"
C:\Users\Admin\terragest\src\core\schemas\exploitations.schema.ts:77 workflow: true,
C:\Users\Admin\terragest\src\core\schemas\materiels.schema.ts:69 workflow: true,
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:69 workflow: true,
C:\Users\Admin\terragest\src\core\schemas\types.ts:43 workflow?: boolean;
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:80 module: "workflows",
C:\Users\Admin\terragest\src\core\throttling\throttling-engine.ts:24 workflow: {
C:\Users\Admin\terragest\src\core\transitions\transition-engine.ts:57 type: "workflow",
C:\Users\Admin\terragest\src\core\worker-loop\worker-loop.ts:37 type: "workflow",
C:\Users\Admin\terragest\src\core\workers\analytics-worker.ts:15 type: "workflow",
C:\Users\Admin\terragest\src\core\workers\export-worker.ts:15 type: "workflow",
C:\Users\Admin\terragest\src\core\workers\maintenance-worker.ts:15 type: "workflow",
C:\Users\Admin\terragest\src\core\workers\register-workers.ts:6 executeWorkflowWorker,
C:\Users\Admin\terragest\src\core\workers\register-workers.ts:7 } from "@/core/workers/workflow-worker";
C:\Users\Admin\terragest\src\core\workers\register-workers.ts:26 type: "workflow",
C:\Users\Admin\terragest\src\core\workers\register-workers.ts:28 executeWorkflowWorker,
C:\Users\Admin\terragest\src\core\workers\worker-registry.ts:6 | "workflow"
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:13 export async function executeWorkflowWorker(
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:18 action: "workflow-worker",
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:19 type: "workflow",
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:24 `Workflow worker exécuté : ${job.name}`,
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:28 "workflowExecutions"
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:32 "WORKFLOW WORKER",
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:1 export type ERPWorkflowExecution = {
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:2 workflow: string;
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:11 export async function executeWorkflow(
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:12 workflow: ERPWorkflowExecution
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:15 "ERP WORKFLOW START",
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:16 workflow
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:20 ...workflow,
C:\Users\Admin\terragest\src\domains\contrats\store\ContratsStore.ts:18 workflow: string;
C:\Users\Admin\terragest\src\domains\contrats\store\ContratsStore.ts:57 workflow: string
C:\Users\Admin\terragest\src\domains\contrats\store\ContratsStore.ts:68 item.workflow =
C:\Users\Admin\terragest\src\domains\contrats\store\ContratsStore.ts:69 workflow;
C:\Users\Admin\terragest\src\domains\contrats\store\ContratsStore.ts:77 `Workflow `,
C:\Users\Admin\terragest\src\domains\interventions\store\InterventionsStore.ts:11 workflow: string;
C:\Users\Admin\terragest\src\domains\maintenance\services\MaintenanceWorkflowService.ts:1 // src/domains/maintenance/services/MaintenanceWorkflowService.ts
C:\Users\Admin\terragest\src\domains\maintenance\services\MaintenanceWorkflowService.ts:9 export class MaintenanceWorkflowService {
C:\Users\Admin\terragest\src\domains\maintenance\services\MaintenanceWorkflowService.ts:34 workflow:
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:18 workflow: string;
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:57 workflow: string
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:68 item.workflow =
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:69 workflow;
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:77 `Workflow `,
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:1 // src/domains/paiement/workflows/PaiementWorkflow.ts
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:3 import { WorkflowRegistry }
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:4 from "@/platform/workflows/registry/WorkflowRegistry";
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:6 import { WorkflowState }
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:7 from "@/platform/workflows/states/WorkflowState";
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:9 export function registerPaiementWorkflow() {
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:11 WorkflowRegistry.register(
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:20 WorkflowState.DRAFT,
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:23 WorkflowState.VALIDATED
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:29 WorkflowState.VALIDATED,
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:32 WorkflowState.APPROVED
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:38 WorkflowState.APPROVED,
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:41 WorkflowState.COMPLETED
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:20 workflow: string;
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:64 workflow: string
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:75 item.workflow =
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:76 workflow;
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:84 `Workflow ${workflow}`,
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:92 "[STOCK WORKFLOW]",
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:93 workflow
C:\Users\Admin\terragest\src\features\achats\achats.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\analytics\services\DashboardAnalyticsService.ts:9 totalWorkflows: 0,
C:\Users\Admin\terragest\src\features\billing\types\FeatureFlags.ts:23 WORKFLOW: [
C:\Users\Admin\terragest\src\features\clients\clients.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\commandes\commandes.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\depenses\depenses.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\devis\devis.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\employes\employes.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\exploitations\exploitations.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\factures\factures.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\fournisseurs\fournisseurs.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\incidents\incidents.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\interventions\interventions.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\interventions\types\Intervention.ts:1 import { WorkflowStatus } from "@/features/workflow/types/WorkflowStatus";
C:\Users\Admin\terragest\src\features\interventions\types\Intervention.ts:13 status: WorkflowStatus;
C:\Users\Admin\terragest\src\features\interventions\workflows\BreakdownInterventionWorkflow.ts:4 export class BreakdownInterventionWorkflow {
C:\Users\Admin\terragest\src\features\intrants\intrants.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\livraisons\livraisons.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\materiels\materiels.feature.ts:16 "workflow",
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:22 WorkflowExecutor
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:24 from "@/runtime/workflows/engine/WorkflowExecutor";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:27 CreateMaterielWorkflow
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:29 from "../workflows/definitions/CreateMaterielWorkflow";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:83 private workflowExecutor =
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:84 new WorkflowExecutor();
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:123 await this.workflowExecutor.execute(
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:124 CreateMaterielWorkflow,
C:\Users\Admin\terragest\src\features\materiels\workflows\MaterielMaintenanceWorkflow.ts:1 export class MaterielMaintenanceWorkflow {
C:\Users\Admin\terragest\src\features\materiels\workflows\MaterielMaintenanceWorkflow.ts:6 "Materiel maintenance workflow"
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:2 WorkflowDefinition
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:4 from "@/runtime/workflows/types/WorkflowDefinition";
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:7 CreateMaterielWorkflow:
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:8 WorkflowDefinition = {
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:11 "CREATE_MATERIEL_WORKFLOW",
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:14 "Create Materiel Workflow",
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:30 "[Workflow] Validate Materiel",
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:48 "[Workflow] Register Runtime Event",
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:66 "[Workflow] Supervision",
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:84 "[Workflow] Notification",
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\observability\services\RuntimeObservabilityService.ts:12 workflows: 0,
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:14 workflowExecutionStore
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:16 from "../../stores/workflows/workflowExecutionStore";
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:19 WorkflowExecutionRealtimeService {
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:28 "runtime_workflow_executions"
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:54 workflowId:
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:56 data.workflowId
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:83 workflowExecutionStore.replaceAll(
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:2 WorkflowExecution
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:4 from "@/runtime/workflows/types/WorkflowExecution";
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:6 class WorkflowExecutionStore {
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:9 WorkflowExecution[] = [];
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:18 WorkflowExecution
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:30 WorkflowExecution[]
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:70 workflowExecutionStore =
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:71 new WorkflowExecutionStore();
C:\Users\Admin\terragest\src\features\observability\types\RuntimeHealth.ts:7 workflows: number;
C:\Users\Admin\terragest\src\features\observability\widgets\DeadLetterPanel.tsx:20 Failed workflows will appear here.
C:\Users\Admin\terragest\src\features\observability\widgets\live\WorkflowExecutionPanel.tsx:2 WorkflowExecutionPanel() {
C:\Users\Admin\terragest\src\features\observability\widgets\live\WorkflowExecutionPanel.tsx:21 Workflow Executions
C:\Users\Admin\terragest\src\features\observability\widgets\live\WorkflowExecutionPanel.tsx:25 Live workflow executions
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:10 workflowExecutionStore
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:12 from "../../stores/workflows/workflowExecutionStore";
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:15 WorkflowExecutionRealtimeService
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:17 from "../../services/workflows/WorkflowExecutionRealtimeService";
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:19 export default function WorkflowExecutionMonitor() {
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:24 new WorkflowExecutionRealtimeService();
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:38 workflowExecutionStore.subscribe.bind(
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:39 workflowExecutionStore
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:42 workflowExecutionStore.getAll.bind(
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:43 workflowExecutionStore
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:46 workflowExecutionStore.getAll.bind(
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:47 workflowExecutionStore
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:69 Workflow Executions
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:79 Aucun workflow exécuté.
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:99 `${execution.workflowId}-${execution.startedAt}-${index}`
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:114 execution.workflowId
C:\Users\Admin\terragest\src\features\parcelles\parcelles.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\platform\components\navigation\EnterpriseSidebar.tsx:12 "Workflows",
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeMetricsPanel.tsx:50 Workflows : 1
C:\Users\Admin\terragest\src\features\platform\components\runtime\WorkflowStatusPanel.tsx:2 WorkflowStatusPanel() {
C:\Users\Admin\terragest\src\features\platform\components\runtime\WorkflowStatusPanel.tsx:21 Workflow Status
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:4 import WorkflowStatusPanel
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:5 from "../components/runtime/WorkflowStatusPanel";
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:29 <WorkflowStatusPanel />
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:4 import WorkflowStatusPanel
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:5 from "../components/runtime/WorkflowStatusPanel";
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:29 <WorkflowStatusPanel />
C:\Users\Admin\terragest\src\features\produits\produits.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\recettes\recettes.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\recoltes\recoltes.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\stocks\stocks.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\taches\taches.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\terrains\terrains.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\vehicules\vehicules.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:1 import { WorkflowStatus } from "@/features/workflow/types/WorkflowStatus";
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:3 interface WorkflowActionsProps {
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:5 status: WorkflowStatus | string;
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:8 status: WorkflowStatus
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:12 export const WorkflowActions = ({
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:15 }: WorkflowActionsProps) => {
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:22 WorkflowStatus.BROUILLON && (
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:27 WorkflowStatus.VALIDE
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:44 WorkflowStatus.VALIDE && (
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:49 WorkflowStatus.EN_COURS
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:66 WorkflowStatus.EN_COURS && (
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:71 WorkflowStatus.TERMINE
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:88 WorkflowStatus.REJETE &&
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:91 WorkflowStatus.TERMINE && (
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:96 WorkflowStatus.REJETE
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:1 import { WorkflowStatus } from "@/features/workflow/types/WorkflowStatus";
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:3 interface WorkflowStatusBadgeProps {
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:5 status: WorkflowStatus | string;
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:8 export const WorkflowStatusBadge = ({
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:10 }: WorkflowStatusBadgeProps) => {
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:16 case WorkflowStatus.BROUILLON:
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:19 case WorkflowStatus.VALIDE:
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:22 case WorkflowStatus.EN_COURS:
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:25 case WorkflowStatus.TERMINE:
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:28 case WorkflowStatus.REJETE:
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:31 case WorkflowStatus.ANNULE:
C:\Users\Admin\terragest\src\features\workflow\types\WorkflowHistory.ts:1 export interface WorkflowHistory {
C:\Users\Admin\terragest\src\features\workflow\types\WorkflowStatus.ts:1 export enum WorkflowStatus {
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:1 interface WorkflowCardProps {
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:3 workflow: any;
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:6 export const WorkflowCard = ({
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:7 workflow,
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:8 }: WorkflowCardProps) => {
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:30 Workflow
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:38 {workflow.nom}
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:60 {workflow.description}
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:72 {workflow.steps?.length || 0}
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:3 import { WorkflowCard } from "@/features/workflow-engine/components/WorkflowCard";
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:5 const workflows = [
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:10 nom: "Purchase Workflow",
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:25 nom: "Maintenance Workflow",
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:39 nom: "Security Alert Workflow",
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:53 export const WorkflowDashboard = () => {
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:68 Workflow Orchestration
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:88 {workflows.map(
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:89 (workflow) => (
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:91 <WorkflowCard
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:92 key={workflow.id}
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:93 workflow={workflow}
C:\Users\Admin\terragest\src\features\workflow-engine\services\ProcessOrchestrator.ts:1 import { EventBus } from "@/features/workflow-engine/services/EventBus";
C:\Users\Admin\terragest\src\features\workflow-engine\services\ProcessOrchestrator.ts:14 "Trigger purchase workflow",
C:\Users\Admin\terragest\src\features\workflow-engine\services\ProcessOrchestrator.ts:27 "Trigger maintenance workflow",
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowAnalytics.ts:1 export const WorkflowAnalytics = {
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowEngine.ts:1 export const WorkflowEngine = {
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowEngine.ts:4 workflow: any,
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowEngine.ts:9 "Executing workflow",
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowEngine.ts:10 workflow.nom
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowEngine.ts:17 of workflow.steps
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowEngine.ts:30 "Workflow step",
C:\Users\Admin\terragest\src\features\workflow-engine\types\WorkflowDefinition.ts:1 export interface WorkflowDefinition {
C:\Users\Admin\terragest\src\features\workflow-engine\types\WorkflowDefinition.ts:13 steps: WorkflowStep[];
C:\Users\Admin\terragest\src\features\workflow-engine\types\WorkflowDefinition.ts:18 export interface WorkflowStep {
C:\Users\Admin\terragest\src\features\workflow-engine\types\WorkflowExecution.ts:1 export interface WorkflowExecution {
C:\Users\Admin\terragest\src\features\workflow-engine\types\WorkflowExecution.ts:5 workflowId: string;
C:\Users\Admin\terragest\src\platform\bootstrap\loadDomains.ts:18 "@/domains/paiement/workflows/PaiementWorkflow"
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:59 if (module.metadata.features?.workflows) {
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:60 capabilities.push("workflow");
C:\Users\Admin\terragest\src\platform\execution\WorkflowScheduler.ts:1 // src/platform/execution/WorkflowScheduler.ts
C:\Users\Admin\terragest\src\platform\execution\WorkflowScheduler.ts:3 import { WorkflowExecutor }
C:\Users\Admin\terragest\src\platform\execution\WorkflowScheduler.ts:4 from "@/platform/execution/executors/WorkflowExecutor";
C:\Users\Admin\terragest\src\platform\execution\WorkflowScheduler.ts:6 export class WorkflowScheduler {
C:\Users\Admin\terragest\src\platform\execution\WorkflowScheduler.ts:17 await WorkflowExecutor
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:1 // src/platform/execution/executors/WorkflowExecutor.ts
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:3 import { WorkflowQueue }
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:4 from "@/platform/execution/queue/WorkflowQueue";
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:6 import { WorkflowThrottler }
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:7 from "@/platform/throttling/WorkflowThrottler";
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:24 const workflowCircuitBreaker =
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:27 export class WorkflowExecutor {
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:32 !WorkflowThrottler.canExecute()
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:43 WorkflowQueue.dequeue();
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:56 job.workflow
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:62 workflow: job.workflow,
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:70 "workflow.denied",
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:77 WorkflowThrottler
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:83 "workflow.started",
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:87 await workflowCircuitBreaker.execute(
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:103 workflow: job.workflow,
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:113 "workflow.finished",
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:117 WorkflowThrottler
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:1 // src/platform/execution/queue/WorkflowQueue.ts
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:3 export interface WorkflowJob {
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:7 workflow: string;
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:14 class WorkflowQueueManager {
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:17 WorkflowJob[] = [];
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:20 job: WorkflowJob
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:25 job.workflow
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:48 export const WorkflowQueue =
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:49 new WorkflowQueueManager();
C:\Users\Admin\terragest\src\platform\intelligence\AutoHealingService.ts:18 job.workflow
C:\Users\Admin\terragest\src\platform\intelligence\WorkflowScoringEngine.ts:1 // src/platform/intelligence/WorkflowScoringEngine.ts
C:\Users\Admin\terragest\src\platform\intelligence\WorkflowScoringEngine.ts:3 export class WorkflowScoringEngine {
C:\Users\Admin\terragest\src\platform\intelligence\WorkflowScoringEngine.ts:6 workflow: string
C:\Users\Admin\terragest\src\platform\intelligence\WorkflowScoringEngine.ts:10 workflow.includes(
C:\Users\Admin\terragest\src\platform\intelligence\WorkflowScoringEngine.ts:19 workflow.includes(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:17 import { WorkflowRuntime }
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:18 from "@/platform/workflows/runtime/WorkflowRuntime";
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:20 import { WorkflowState }
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:21 from "@/platform/workflows/states/WorkflowState";
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:23 import { WorkflowStateStore }
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:24 from "@/platform/workflows/store/WorkflowStateStore";
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:78 WorkflowState.DRAFT;
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:83 WorkflowStateStore.setState(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:90 WorkflowStateStore.addHistory({
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:118 workflowState:
C:\Users\Admin\terragest\src\platform\orchestration\ERPOrchestrator.ts:3 import { initializeERPWorkflows }
C:\Users\Admin\terragest\src\platform\orchestration\ERPOrchestrator.ts:4 from "@/platform/workflows/ERPWorkflow";
C:\Users\Admin\terragest\src\platform\orchestration\ERPOrchestrator.ts:7 from "@/platform/workflows/ERPNotifications";
C:\Users\Admin\terragest\src\platform\orchestration\ERPOrchestrator.ts:10 from "@/platform/workflows/ERPAudit";
C:\Users\Admin\terragest\src\platform\orchestration\ERPOrchestrator.ts:23 initializeERPWorkflows();
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:3 import { WorkflowQueue }
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:4 from "@/platform/execution/queue/WorkflowQueue";
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:18 WorkflowQueue.getJobs()
C:\Users\Admin\terragest\src\platform\persistence\RuntimeSnapshotStore.ts:4 WorkflowJob
C:\Users\Admin\terragest\src\platform\persistence\RuntimeSnapshotStore.ts:6 from "@/platform/execution/queue/WorkflowQueue";
C:\Users\Admin\terragest\src\platform\persistence\RuntimeSnapshotStore.ts:12 jobs: WorkflowJob[];
C:\Users\Admin\terragest\src\platform\registry\FeatureDefinition.ts:4 | "workflow"
C:\Users\Admin\terragest\src\platform\resilience\DeadLetterQueue.ts:5 workflow: string;
C:\Users\Admin\terragest\src\platform\resilience\DeadLetterQueue.ts:22 job.workflow,
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:4 WorkflowJob
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:6 from "@/platform/execution/queue/WorkflowQueue";
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:11 Record<string, WorkflowJob[]>
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:16 job: WorkflowJob
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowPriority.ts:1 // src/platform/scheduling/WorkflowPriority.ts
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowPriority.ts:3 export enum WorkflowPriority {
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:1 // src/platform/scheduling/WorkflowSchedulerPolicy.ts
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:3 import { WorkflowPriority }
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:4 from "@/platform/scheduling/WorkflowPriority";
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:6 export class WorkflowSchedulerPolicy {
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:9 workflow: string
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:13 workflow.includes(
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:18 return WorkflowPriority
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:23 workflow.includes(
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:28 return WorkflowPriority
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:32 return WorkflowPriority
C:\Users\Admin\terragest\src\platform\security\ExecutionPolicy.ts:9 workflow: string;
C:\Users\Admin\terragest\src\platform\security\ExecutionPolicy.ts:26 context.workflow.includes(
C:\Users\Admin\terragest\src\platform\security\ExecutionPolicy.ts:32 "[SECURITY] critical workflow denied"
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:23 "workflow",
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:32 "workflow",
C:\Users\Admin\terragest\src\platform\throttling\WorkflowThrottler.ts:1 // src/platform/throttling/WorkflowThrottler.ts
C:\Users\Admin\terragest\src\platform\throttling\WorkflowThrottler.ts:3 class WorkflowThrottlerManager {
C:\Users\Admin\terragest\src\platform\throttling\WorkflowThrottler.ts:55 export const WorkflowThrottler =
C:\Users\Admin\terragest\src\platform\throttling\WorkflowThrottler.ts:56 new WorkflowThrottlerManager();
C:\Users\Admin\terragest\src\platform\workers\ERPWorker.ts:3 import { WorkflowExecutor }
C:\Users\Admin\terragest\src\platform\workers\ERPWorker.ts:4 from "@/platform/execution/executors/WorkflowExecutor";
C:\Users\Admin\terragest\src\platform\workers\ERPWorker.ts:23 await WorkflowExecutor
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:1 // src/platform/workflows/ERPAudit.ts
C:\Users\Admin\terragest\src\platform\workflows\ERPNotifications.ts:1 // src/platform/workflows/ERPNotifications.ts
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:1 // src/platform/workflows/ERPWorkflow.ts
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:6 export function initializeERPWorkflows() {
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:13 "[WORKFLOW] stock.created",
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:24 "[WORKFLOW] intervention.created",
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:35 "[WORKFLOW] paiement.created",
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:1 // src/platform/workflows/history/WorkflowHistoryEntry.ts
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:3 import { WorkflowState }
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:4 from "@/platform/workflows/states/WorkflowState";
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:6 export interface WorkflowHistoryEntry {
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:12 from?: WorkflowState;
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:14 to: WorkflowState;
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:1 // src/platform/workflows/registry/WorkflowRegistry.ts
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:6 from "@/platform/workflows/states/StateTransition";
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:8 class WorkflowRegistryManager {
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:27 "[WORKFLOW REGISTERED]",
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:44 export const WorkflowRegistry =
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:45 new WorkflowRegistryManager();
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:1 // src/platform/workflows/runtime/WorkflowRuntime.ts
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:3 import { WorkflowState }
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:4 from "@/platform/workflows/states/WorkflowState";
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:6 import { WorkflowRegistry }
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:7 from "@/platform/workflows/registry/WorkflowRegistry";
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:9 export class WorkflowRuntime {
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:15 from: WorkflowState,
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:17 to: WorkflowState
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:21 WorkflowRegistry
C:\Users\Admin\terragest\src\platform\workflows\states\StateTransition.ts:1 // src/platform/workflows/states/StateTransition.ts
C:\Users\Admin\terragest\src\platform\workflows\states\StateTransition.ts:3 import { WorkflowState }
C:\Users\Admin\terragest\src\platform\workflows\states\StateTransition.ts:4 from "@/platform/workflows/states/WorkflowState";
C:\Users\Admin\terragest\src\platform\workflows\states\StateTransition.ts:9 WorkflowState;
C:\Users\Admin\terragest\src\platform\workflows\states\StateTransition.ts:12 WorkflowState;
C:\Users\Admin\terragest\src\platform\workflows\states\WorkflowState.ts:1 // src/platform/workflows/states/WorkflowState.ts
C:\Users\Admin\terragest\src\platform\workflows\states\WorkflowState.ts:3 export enum WorkflowState {
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:1 // src/platform/workflows/store/WorkflowStateStore.ts
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:3 import { WorkflowState }
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:4 from "@/platform/workflows/states/WorkflowState";
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:7 WorkflowHistoryEntry
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:9 from "@/platform/workflows/history/WorkflowHistoryEntry";
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:11 class WorkflowStateStoreManager {
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:14 Record<string, WorkflowState>
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:18 WorkflowHistoryEntry[] = [];
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:24 state: WorkflowState
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:42 entry: WorkflowHistoryEntry
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:50 "[WORKFLOW HISTORY]",
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:69 export const WorkflowStateStore =
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:70 new WorkflowStateStoreManager();
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:1 // src/platform/workflows/supervision/WorkflowSupervision.ts
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:3 import { WorkflowStateStore }
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:4 from "@/platform/workflows/store/WorkflowStateStore";
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:6 class WorkflowSupervisionManager {
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:13 WorkflowStateStore
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:19 "[WORKFLOW STATE]",
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:26 export const WorkflowSupervision =
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:27 new WorkflowSupervisionManager();
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:1 // src/platform/workflows/timeline/WorkflowTimeline.ts
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:4 WorkflowTimelineEntry
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:6 from "@/platform/workflows/timeline/WorkflowTimelineEntry";
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:8 class WorkflowTimelineManager {
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:11 WorkflowTimelineEntry[] = [];
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:14 entry: WorkflowTimelineEntry
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:40 export const WorkflowTimeline =
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:41 new WorkflowTimelineManager();
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimelineEntry.ts:1 // src/platform/workflows/timeline/WorkflowTimelineEntry.ts
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimelineEntry.ts:3 export interface WorkflowTimelineEntry {
C:\Users\Admin\terragest\src\runtime\production.ts:117 maxWorkflowExecutionsPerDay: 5000,
C:\Users\Admin\terragest\src\runtime\actions\ERPAction.ts:8 | "workflow"
C:\Users\Admin\terragest\src\runtime\actions\ERPActionExecutor.ts:17 case "workflow":
C:\Users\Admin\terragest\src\runtime\actions\ERPActionExecutor.ts:18 toast.success("Ouverture du workflow");
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:45 key: "workflows",
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:46 label: "Workflows",
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:47 href: `${basePath}/workflows`,
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:31 type: "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:34 actor: "workflow-engine",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:60 // WORKFLOW CHECK
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:65 "workflow-monitoring",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:68 "Workflow Monitoring",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:80 "Running workflow monitoring..."
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:90 "workflow",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:93 "Surveillance workflows",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:96 "Contrôle automatique des workflows effectué.",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:19 trigger: "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:21 description: "Notification workflow maintenance.",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:35 trigger: "WORKFLOW_COMPLETED",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:8 | "WORKFLOW"
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:47 "[AUTOMATION] Maintenance workflow triggered",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:14 { type: "workflow", label: "Declencher workflow reapprovisionnement" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:31 key: "workflow-blocked-escalation",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:33 label: "Relance workflow bloque",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:34 description: "Relance automatiquement les workflows bloques.",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:36 trigger: { type: "workflow_blocked" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:72 trigger: { type: "workflow_blocked" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:87 { type: "workflow", label: "Lancer workflow maintenance" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:108 trigger: { type: "workflow_blocked" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:47 if (rule.trigger.type === "workflow_blocked") {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:48 return payload.workflowBlocked === true;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:3 | "workflow_blocked"
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:25 | "workflow"
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:4 import { WorkflowRegistry }
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:5 from "../registry/WorkflowRegistry";
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:22 import { WorkflowSupervisor }
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:23 from "../supervision/WorkflowSupervisor";
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:25 import { registerMaterielWorkflows }
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:26 from "./registerMaterielWorkflows";
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:41 const workflowRegistry =
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:42 new WorkflowRegistry();
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:60 new WorkflowSupervisor();
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:62 registerMaterielWorkflows(
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:63 workflowRegistry
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:78 workflowRegistry,
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapRuntime.ts:1 import { WorkflowRegistry }
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapRuntime.ts:2 from "../registry/WorkflowRegistry";
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapRuntime.ts:11 new WorkflowRegistry();
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:1 import { WorkflowRegistry }
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:2 from "../registry/WorkflowRegistry";
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:8 registerMaterielWorkflows
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:10 from "./registerMaterielWorkflows";
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:21 new WorkflowRegistry();
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:26 registerMaterielWorkflows(
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:1 import { WorkflowRegistry }
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:2 from "../registry/WorkflowRegistry";
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:4 import { MaterielMaintenanceWorkflow }
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:5 from "../../features/materiels/workflows/MaterielMaintenanceWorkflow";
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:8 registerMaterielWorkflows(
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:9 registry: WorkflowRegistry
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:14 new MaterielMaintenanceWorkflow()
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:18 "[Runtime] materiel workflows registered"
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:17 workflowRegistry:
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:18 !!runtime.workflowRegistry,
C:\Users\Admin\terragest\src\runtime\cockpit\ERPCockpitSnapshot.ts:10 workflowsCount: modules.reduce((total, module) => total + module.workflows.length, 0),
C:\Users\Admin\terragest\src\runtime\core\RuntimeBindings.ts:7 workflows: string[];
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:19 | "workflow"
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:36 workflows: string[];
C:\Users\Admin\terragest\src\runtime\core\RuntimeExecutionRegistry.ts:7 workflow: string;
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:15 workflows:
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:16 module.workflows,
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:23 executeWorkflow(
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:25 workflow: string,
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:35 workflow,
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:42 name: "workflow.started",
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:45 workflow,
C:\Users\Admin\terragest\src\runtime\core\RuntimePipeline.ts:4 "workflow",
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:19 "Registered workflows:",
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:24 module.workflows
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:5 export class RuntimeWorkflowRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:6 private workflows =
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:14 const [moduleId, workflows]
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:16 CoreModuleRuntimeAdapter.toRuntimeWorkflows()
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:19 this.workflows.set(
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:21 workflows
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:26 getModuleWorkflows(
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:29 return this.workflows.get(
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:34 getAllWorkflows() {
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:36 this.workflows.entries()
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:41 export const runtimeWorkflowRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:42 new RuntimeWorkflowRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:44 runtimeWorkflowRegistry.initialize();
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:15 | "workflow"
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:94 category: "workflow",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:205 category: "workflow",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:292 category: "workflow",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:21 name: "Workflow Runtime",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:6 | "workflow"
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:23 { key: "workflow", label: "Workflow runtime", completed: true },
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:28 static simulateWorkflowCompleted() {
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:30 name: "workflow.completed",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:34 workflowId: "WF-001",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptions.ts:25 id: "workflow-completed-to-audit",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptions.ts:27 eventName: "workflow.completed",
C:\Users\Admin\terragest\src\runtime\events\ERPDomainEvent.ts:5 | "WORKFLOW_STARTED"
C:\Users\Admin\terragest\src\runtime\events\ERPDomainEvent.ts:6 | "WORKFLOW_COMPLETED"
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:46 // WORKFLOWS
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:49 WORKFLOW_STARTED:
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:50 "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:52 WORKFLOW_COMPLETED:
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:53 "WORKFLOW_COMPLETED",
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:55 WORKFLOW_FAILED:
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:56 "WORKFLOW_FAILED",
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:2 WorkflowRepository
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:4 from "../persistence/workflows/WorkflowRepository";
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:7 PersistentWorkflowExecutor {
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:10 new WorkflowRepository();
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:13 workflow: string,
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:18 workflow,
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:23 "[PersistentWorkflow]",
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:24 workflow
C:\Users\Admin\terragest\src\runtime\execution\RuntimeExecutor.ts:4 workflow: string
C:\Users\Admin\terragest\src\runtime\execution\RuntimeExecutor.ts:9 workflow
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:1 export interface ERPGeneratedWorkflow {
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:8 export class ERPWorkflowGenerationEngine {
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:10 generateWorkflow(
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:12 ): ERPGeneratedWorkflow {
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:28 export const erpWorkflowGenerationEngine =
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:29 new ERPWorkflowGenerationEngine();
C:\Users\Admin\terragest\src\runtime\generation\index.ts:7 export * from "./ERPWorkflowGenerationEngine";
C:\Users\Admin\terragest\src\runtime\governance\EnterpriseGovernanceEngine.ts:67 "WorkflowExecutor"
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataGenerationBridge.ts:10 erpWorkflowGenerationEngine,
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataGenerationBridge.ts:55 workflow:
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataGenerationBridge.ts:56 erpWorkflowGenerationEngine.generateWorkflow(
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:21 export interface ERPModuleWorkflow {
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:77 workflows?: ERPModuleWorkflow[];
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:30 | "workflow"
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:33 workflow?: string;
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:53 workflows?: string[];
C:\Users\Admin\terragest\src\runtime\modules\index.ts:5 ERPModuleWorkflow,
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:54 "workflow",
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:67 workflows:
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:68 module.workflows?.map(
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:69 (workflow) => workflow.key
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:80 module.workflows?.flatMap(
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:81 (workflow) => workflow.states ?? []
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:127 workflows:
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:128 module.workflows?.map(
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:129 (workflow) => workflow.key
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:145 module.workflows?.flatMap(
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:146 (workflow) => workflow.states ?? []
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:152 static toRuntimeWorkflows() {
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:156 module.workflows?.map(
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:157 (workflow) => workflow.key
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:64 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:121 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:53 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:130 workflows: [
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:29 workflows?: boolean;
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:4 import { ERPWorkflowExecutionStore } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:22 workflows: ERPWorkflowExecutionStore.all().length,
C:\Users\Admin\terragest\src\runtime\monitoring\simulateRuntimeActivity.ts:18 "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\monitoring\simulateRuntimeActivity.ts:20 workflow:
C:\Users\Admin\terragest\src\runtime\monitoring\WorkflowAnalytics.ts:1 export const WorkflowAnalytics = {
C:\Users\Admin\terragest\src\runtime\monitoring\metrics\ERPMonitoringMetrics.ts:5 workflows: number;
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:26 { id: "workflows", label: "Workflows", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:39 { from: "automation", to: "workflows", label: "orchestrates" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:40 { from: "workflows", to: "queue", label: "async jobs" },
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:34 type: "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:37 actor: "workflow-engine",
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:7 BreakdownInterventionWorkflow
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:9 from "../../features/interventions/workflows/BreakdownInterventionWorkflow";
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:20 import { WorkflowSupervisor }
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:21 from "../supervision/WorkflowSupervisor";
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:26 private workflow =
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:27 new BreakdownInterventionWorkflow();
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:39 new WorkflowSupervisor();
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:55 await this.workflow.execute(
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:7 PersistentWorkflowExecutor
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:9 from "../execution/PersistentWorkflowExecutor";
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:32 private workflow =
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:33 new PersistentWorkflowExecutor();
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:53 await this.workflow.execute(
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:54 "BreakdownInterventionWorkflow",
C:\Users\Admin\terragest\src\runtime\orchestration\WorkflowDispatcher.ts:1 export class WorkflowDispatcher {
C:\Users\Admin\terragest\src\runtime\orchestration\WorkflowDispatcher.ts:4 workflow: string
C:\Users\Admin\terragest\src\runtime\orchestration\WorkflowDispatcher.ts:8 "[WorkflowDispatcher]",
C:\Users\Admin\terragest\src\runtime\orchestration\WorkflowDispatcher.ts:9 workflow
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:21 action: "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:32 await ERPRuntimePersistenceService.workflows.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:33 workflowKey: "maintenance-critical-flow",
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:10 workflows,
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:18 ERPRuntimePersistenceService.workflows.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:28 workflows,
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:36 workflows.length +
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPPersistenceCollections.ts:5 workflows: "runtime_workflows",
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:25 workflows:
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:27 ERPPersistenceCollections.workflows
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:10 export class WorkflowRepository {
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:13 workflow: unknown
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:19 "runtime_workflows"
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:22 workflow,
C:\Users\Admin\terragest\src\runtime\policies\generated\achats\achats.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\clients\clients.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\commandes\commandes.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\depenses\depenses.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\devis\devis.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\employes\employes.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\factures\factures.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\fournisseurs\fournisseurs.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\incidents\incidents.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\intrants\intrants.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\livraisons\livraisons.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\parcelles\parcelles.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\recettes\recettes.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\recoltes\recoltes.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\taches\taches.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\vehicules\vehicules.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\production\limits\ERPRateLimitRegistry.ts:11 key: "workflow-tenant-hour",
C:\Users\Admin\terragest\src\runtime\production\quotas\ERPTenantQuota.ts:6 maxWorkflowExecutionsPerDay: number;
C:\Users\Admin\terragest\src\runtime\production\quotas\ERPTenantQuotaRegistry.ts:9 maxWorkflowExecutionsPerDay: 5000,
C:\Users\Admin\terragest\src\runtime\production\quotas\ERPTenantQuotaRegistry.ts:17 maxWorkflowExecutionsPerDay: 1000,
C:\Users\Admin\terragest\src\runtime\production\quotas\ERPTenantQuotaRegistry.ts:25 maxWorkflowExecutionsPerDay: 200,
C:\Users\Admin\terragest\src\runtime\quality\checks\WorkflowConsistencyCheck.ts:2 WorkflowConsistencyCheck {
C:\Users\Admin\terragest\src\runtime\quality\checks\WorkflowConsistencyCheck.ts:7 "[Quality] workflow consistency verified"
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:22 WorkflowConsistencyCheck
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:24 from "../checks/WorkflowConsistencyCheck";
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:41 private workflows =
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:42 new WorkflowConsistencyCheck();
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:54 this.workflows.verify();
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:53 channel: "workflows",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:55 title: "Workflow en cours",
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:18 "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:20 workflow:
C:\Users\Admin\terragest\src\runtime\realtime\channels\ERPRealtimeChannel.ts:3 | "workflows"
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:19 workflows: ERPRealtimeBus.byChannel("workflows").length,
C:\Users\Admin\terragest\src\runtime\realtime\streams\LiveWorkflowUpdates.ts:2 LiveWorkflowUpdates {
C:\Users\Admin\terragest\src\runtime\realtime\streams\LiveWorkflowUpdates.ts:5 workflow: string
C:\Users\Admin\terragest\src\runtime\realtime\streams\LiveWorkflowUpdates.ts:9 "[Workflow Update]",
C:\Users\Admin\terragest\src\runtime\realtime\streams\LiveWorkflowUpdates.ts:10 workflow
C:\Users\Admin\terragest\src\runtime\registry\ERPRegistry.ts:55 workflows(
C:\Users\Admin\terragest\src\runtime\registry\ERPRegistry.ts:61 ?.workflows ?? []
C:\Users\Admin\terragest\src\runtime\registry\types.ts:20 export type ERPRegistryWorkflow = {
C:\Users\Admin\terragest\src\runtime\registry\types.ts:56 workflows: ERPRegistryWorkflow[];
C:\Users\Admin\terragest\src\runtime\registry\WorkflowRegistry.ts:1 export class WorkflowRegistry {
C:\Users\Admin\terragest\src\runtime\registry\WorkflowRegistry.ts:3 private workflows =
C:\Users\Admin\terragest\src\runtime\registry\WorkflowRegistry.ts:8 workflow: unknown
C:\Users\Admin\terragest\src\runtime\registry\WorkflowRegistry.ts:11 this.workflows.set(
C:\Users\Admin\terragest\src\runtime\registry\WorkflowRegistry.ts:13 workflow
C:\Users\Admin\terragest\src\runtime\registry\WorkflowRegistry.ts:19 return this.workflows.get(name);
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:86 workflows: [
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:89 label: "Workflow principal",
C:\Users\Admin\terragest\src\runtime\security-runtime\index.ts:9 export { RuntimeWorkflowGuard } from "./RuntimeWorkflowGuard";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:22 case "workflow":
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:23 return "workflow.start";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePermission.ts:8 | "workflow.start"
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePermission.ts:9 | "workflow.transition"
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePermission.ts:10 | "workflow.validate"
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:12 "workflow.start",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:13 "workflow.transition",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:14 "workflow.validate",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:25 "workflow.start",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:26 "workflow.transition",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:27 "workflow.validate",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:36 "workflow.start",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:37 "workflow.transition",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:4 export class RuntimeWorkflowGuard {
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:8 return RuntimePolicyEngine.can(user, "workflow.start");
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:14 return RuntimePolicyEngine.can(user, "workflow.transition");
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:20 return RuntimePolicyEngine.can(user, "workflow.validate");
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartRecommendationEngine.ts:26 actionLabel: "Lancer workflow",
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartScoringEngine.ts:29 "Score calcule a partir des signaux runtime, workflows, events et donnees metier.",
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartPriorityEngine.ts:17 value: "2 workflows ouverts",
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartRuntimeEngine.ts:14 "Verifier les workflows en attente.",
C:\Users\Admin\terragest\src\runtime\supervision\WorkflowSupervisor.ts:1 export class WorkflowSupervisor {
C:\Users\Admin\terragest\src\runtime\supervision\WorkflowSupervisor.ts:4 workflow: string
C:\Users\Admin\terragest\src\runtime\supervision\WorkflowSupervisor.ts:9 workflow
C:\Users\Admin\terragest\src\runtime\supervision\WorkflowSupervisor.ts:14 workflow: string,
C:\Users\Admin\terragest\src\runtime\supervision\WorkflowSupervisor.ts:20 workflow,
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:18 workflows: 24,
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:28 workflows: 8,
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:38 workflows: 1,
C:\Users\Admin\terragest\src\runtime\tenant\metrics\ERPTenantMetrics.ts:6 workflows: number;
C:\Users\Admin\terragest\src\runtime\testing\engine\ERPTestingTypes.ts:8 | "workflow"
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:9 id: "workflow_maintenance",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:10 label: "Workflow Maintenance",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:11 type: "workflow",
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:14 simulateWorkflow() {
C:\Users\Admin\terragest\src\runtime\ui\ERPUIComposition.ts:24 tabs: ["Vue generale", "Liste", "Activite", "Workflows", "Audit"],
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowHistoryEntry.ts:1 export interface WorkflowHistoryEntry {
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:12 WorkflowHistoryEntry,
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:14 from "@/runtime/workflow-persistence/WorkflowHistoryEntry";
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:16 export class WorkflowPersistenceEngine {
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:21 WorkflowHistoryEntry
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:29 "workflow_history"
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:2 WorkflowPersistenceEngine,
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:4 from "@/runtime/workflow-persistence/WorkflowPersistenceEngine";
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:6 export class WorkflowRuntimeService {
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:27 "Workflow Transition",
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:37 await WorkflowPersistenceEngine
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:2 WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:3 WorkflowRuntimeHistoryEntry,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:4 WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:5 WorkflowRuntimeStatus,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:6 WorkflowRuntimeStep,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:7 WorkflowRuntimeTransition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:8 } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:10 export { workflowRuntimeDefinitions } from "./WorkflowRuntimeDefinitions";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:11 export { WorkflowRuntimeRegistry } from "./WorkflowRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:12 export { WorkflowRuntimeStore } from "./WorkflowRuntimeStore";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:13 export { WorkflowRuntimeValidator } from "./WorkflowRuntimeValidator";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:14 export { WorkflowRuntimeAudit } from "./WorkflowRuntimeAudit";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:15 export { WorkflowRuntimeEngine } from "./WorkflowRuntimeEngine";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:1 import type { WorkflowRuntimeInstance } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:3 export class WorkflowRuntimeAudit {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:4 static log(instance: WorkflowRuntimeInstance, label: string) {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:5 console.log("WORKFLOW AUDIT", {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:6 workflow: instance.workflowKey,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:1 import type { WorkflowRuntimeDefinition } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:3 export const workflowRuntimeDefinitions: WorkflowRuntimeDefinition[] = [
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:7 label: "Workflow maintenance materiel",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:58 label: "Workflow alerte stock",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:1 import { WorkflowRuntimeRegistry } from "./WorkflowRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:2 import { WorkflowRuntimeStore } from "./WorkflowRuntimeStore";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:3 import { WorkflowRuntimeValidator } from "./WorkflowRuntimeValidator";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:4 import { WorkflowRuntimeAudit } from "./WorkflowRuntimeAudit";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:6 export class WorkflowRuntimeEngine {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:7 static start(workflowKey: string, recordId: string) {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:8 const definition = WorkflowRuntimeRegistry.get(workflowKey);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:11 throw new Error(`Workflow introuvable: ${workflowKey}`);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:14 const instance = WorkflowRuntimeStore.create(definition, recordId);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:16 WorkflowRuntimeAudit.log(instance, "Workflow demarre");
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:22 workflowKey: string,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:26 const definition = WorkflowRuntimeRegistry.get(workflowKey);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:29 throw new Error(`Workflow introuvable: ${workflowKey}`);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:32 const instance = WorkflowRuntimeStore.create(definition, recordId);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:35 WorkflowRuntimeValidator.findTransition(
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:66 WorkflowRuntimeStore.save(instance);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:67 WorkflowRuntimeAudit.log(instance, transition.label);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:1 import type { WorkflowRuntimeDefinition } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:2 import { workflowRuntimeDefinitions } from "./WorkflowRuntimeDefinitions";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:4 export class WorkflowRuntimeRegistry {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:5 static all(): WorkflowRuntimeDefinition[] {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:6 return workflowRuntimeDefinitions;
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:9 static forModule(moduleKey: string): WorkflowRuntimeDefinition[] {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:10 return workflowRuntimeDefinitions.filter(
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:11 (workflow) => workflow.moduleKey === moduleKey
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:15 static get(workflowKey: string): WorkflowRuntimeDefinition | undefined {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:16 return workflowRuntimeDefinitions.find(
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:17 (workflow) => workflow.key === workflowKey
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:2 WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:3 WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:4 } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:6 const instances = new Map<string, WorkflowRuntimeInstance>();
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:8 export class WorkflowRuntimeStore {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:10 definition: WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:12 ): WorkflowRuntimeInstance {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:21 const instance: WorkflowRuntimeInstance = {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:24 workflowKey: definition.key,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:32 label: "Workflow initialise",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:43 static get(id: string): WorkflowRuntimeInstance | undefined {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:47 static save(instance: WorkflowRuntimeInstance) {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:1 export type WorkflowRuntimeStatus =
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:9 export interface WorkflowRuntimeStep {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:13 status?: WorkflowRuntimeStatus;
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:16 export interface WorkflowRuntimeTransition {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:23 export interface WorkflowRuntimeDefinition {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:28 steps: WorkflowRuntimeStep[];
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:29 transitions: WorkflowRuntimeTransition[];
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:32 export interface WorkflowRuntimeInstance {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:35 workflowKey: string;
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:38 status: WorkflowRuntimeStatus;
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:39 history: WorkflowRuntimeHistoryEntry[];
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:42 export interface WorkflowRuntimeHistoryEntry {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:2 WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:3 WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:4 WorkflowRuntimeTransition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:5 } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:7 export class WorkflowRuntimeValidator {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:9 definition: WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:10 instance: WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:12 ): WorkflowRuntimeTransition | undefined {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:21 definition: WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:22 instance: WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:26 WorkflowRuntimeValidator.findTransition(
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:4 WorkflowRuntimeEngine,
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:6 from "@/runtime/workflow-ui/WorkflowRuntimeEngine";
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:22 export function ERPWorkflowActions({
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:35 WorkflowRuntimeEngine
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:2 WorkflowState,
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:3 WorkflowTransition,
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:5 from "@/runtime/workflow-ui/Workflow.types";
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:7 export const maintenanceWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:12 states: <WorkflowState[]> [
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:63 <WorkflowTransition[]> [
C:\Users\Admin\terragest\src\runtime\workflow-ui\Workflow.types.ts:1 export interface WorkflowState {
C:\Users\Admin\terragest\src\runtime\workflow-ui\Workflow.types.ts:12 export interface WorkflowTransition {
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:2 maintenanceWorkflow,
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:4 from "@/runtime/workflow-ui/maintenance.workflow";
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:19 maintenanceWorkflow,
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:22 export class WorkflowRuntimeEngine {
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:24 static getWorkflow(
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:43 const workflow =
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:44 this.getWorkflow(
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:48 if (!workflow) {
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:52 return workflow.transitions.filter(
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:1 export interface ERPWorkflowState {
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:8 export class ERPWorkflowRuntimeEngine {
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:10 private workflows:
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:11 ERPWorkflowState[] = [];
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:13 registerWorkflow(
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:14 workflow: ERPWorkflowState
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:17 this.workflows.push(
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:18 workflow
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:22 getWorkflow(
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:26 return this.workflows.find(
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:27 workflow =>
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:28 workflow.module === module
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:38 const workflow =
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:39 this.getWorkflow(module);
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:41 if (!workflow) {
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:47 workflow.states.includes(from)
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:48 && workflow.states.includes(to)
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:53 export const erpWorkflowRuntimeEngine =
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:54 new ERPWorkflowRuntimeEngine();
C:\Users\Admin\terragest\src\runtime\workflows\WorkflowEngine.ts:1 export class WorkflowEngine {
C:\Users\Admin\terragest\src\runtime\workflows\WorkflowEngine.ts:3 async run(workflow: string) {
C:\Users\Admin\terragest\src\runtime\workflows\WorkflowEngine.ts:5 console.log("[Workflow]", workflow);
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:2 WorkflowDefinition
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:4 from "../types/WorkflowDefinition";
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:7 WorkflowStateStore
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:9 from "../state/WorkflowStateStore";
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:12 workflowExecutionStore
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:14 from "@/features/observability/stores/workflows/workflowExecutionStore";
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:17 WorkflowExecutionPersistence
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:19 from "../persistence/WorkflowExecutionPersistence";
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:31 export class WorkflowExecutor {
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:34 new WorkflowStateStore();
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:37 new WorkflowExecutionPersistence();
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:46 workflow: WorkflowDefinition,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:51 workflowId:
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:52 workflow.id,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:65 workflowExecutionStore.push(
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:76 for (const step of workflow.steps) {
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:87 workflow.id,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:91 workflowExecutionStore.push({
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:129 workflow.id,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:133 workflowExecutionStore.push({
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:157 workflow.id,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:161 workflowExecutionStore.push({
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:174 workflow.id,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:177 "workflow-runtime",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:2 ERPWorkflowEngine,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:3 } from "./engine/ERPWorkflowEngine";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:7 export function seedERPRuntimeWorkflows() {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:15 ERPWorkflowEngine.start("maintenance-critical-flow");
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:17 ERPWorkflowEngine.start("stock-replenishment-flow");
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:19 ERPWorkflowEngine.start("payment-validation-flow");
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:22 ERPWorkflowEngine.complete(maintenanceExecution.id);
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\index.ts:1 export * from "./engine/ERPWorkflowTypes";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\index.ts:2 export * from "./engine/ERPWorkflowEngine";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\index.ts:3 export * from "./registry/ERPWorkflowRegistry";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\index.ts:4 export * from "./store/ERPWorkflowExecutionStore";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\index.ts:5 export * from "./timeline/ERPWorkflowTimelineStore";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\index.ts:6 export * from "./ERPRuntimeWorkflowSeed";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:10 ERPWorkflowRegistry,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:11 } from "../registry/ERPWorkflowRegistry";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:14 ERPWorkflowExecutionStore,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:15 } from "../store/ERPWorkflowExecutionStore";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:18 ERPWorkflowTimelineStore,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:19 } from "../timeline/ERPWorkflowTimelineStore";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:22 ERPWorkflowDefinition,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:23 ERPWorkflowExecution,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:24 } from "./ERPWorkflowTypes";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:30 export const ERPWorkflowEngine = {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:32 return ERPWorkflowRegistry;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:36 return ERPWorkflowRegistry.filter(
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:37 (workflow) => workflow.module === module
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:42 workflowKey: string,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:44 ): ERPWorkflowExecution | undefined {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:46 ERPWorkflowRegistry.find(
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:47 (workflow) => workflow.key === workflowKey
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:60 const execution: ERPWorkflowExecution = {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:62 workflowKey: definition.key,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:71 ERPWorkflowExecutionStore.add(execution);
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:73 ERPWorkflowTimelineStore.add({
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:75 workflowKey: definition.key,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:83 traceId: createId("trace_workflow"),
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:85 action: `WORKFLOW_STARTED:${definition.key}`,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:92 id: createId("evt_workflow"),
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:93 type: "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:96 actor: "workflow-engine",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:98 workflowKey: definition.key,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:110 ERPWorkflowExecutionStore.all().find(
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:121 ERPWorkflowExecutionStore.update(executionId, {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:126 ERPWorkflowTimelineStore.add({
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:128 workflowKey: execution.workflowKey,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:130 label: "Workflow termine",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:136 traceId: createId("trace_workflow"),
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:138 action: `WORKFLOW_COMPLETED:${execution.workflowKey}`,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:145 id: createId("evt_workflow"),
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:146 type: "WORKFLOW_COMPLETED",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:149 actor: "workflow-engine",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:151 workflowKey: execution.workflowKey,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:1 export type ERPWorkflowState =
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:12 export type ERPWorkflowStepType =
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:20 export type ERPWorkflowStep = {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:23 type: ERPWorkflowStepType;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:28 export type ERPWorkflowDefinition = {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:33 initialState: ERPWorkflowState;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:34 steps: ERPWorkflowStep[];
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:37 export type ERPWorkflowExecution = {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:39 workflowKey: string;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:41 state: ERPWorkflowState;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:2 ERPWorkflowDefinition,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:3 } from "../engine/ERPWorkflowTypes";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:5 export const ERPWorkflowRegistry: ERPWorkflowDefinition[] = [
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:10 description: "Workflow de traitement des maintenances critiques.",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:48 description: "Workflow de reapprovisionnement automatique.",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:75 description: "Workflow de validation des paiements.",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:2 ERPWorkflowExecution,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:3 } from "../engine/ERPWorkflowTypes";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:5 class ERPWorkflowExecutionStoreClass {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:6 private executions: ERPWorkflowExecution[] = [];
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:8 add(execution: ERPWorkflowExecution) {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:15 patch: Partial<ERPWorkflowExecution>
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:39 export const ERPWorkflowExecutionStore =
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:40 new ERPWorkflowExecutionStoreClass();
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:1 export type ERPWorkflowTimelineItem = {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:3 workflowKey: string;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:10 class ERPWorkflowTimelineStoreClass {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:11 private items: ERPWorkflowTimelineItem[] = [];
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:13 add(item: ERPWorkflowTimelineItem) {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:23 export const ERPWorkflowTimelineStore =
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:24 new ERPWorkflowTimelineStoreClass();
C:\Users\Admin\terragest\src\runtime\workflows\generated\achats\achats.workflow.ts:1 export const AchatsWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\achats\achats.workflow.ts:4 "achats_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\achats\achats.workflow.ts:7 "Achats Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\clients\clients.workflow.ts:1 export const ClientsWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\clients\clients.workflow.ts:4 "clients_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\clients\clients.workflow.ts:7 "Clients Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\commandes\commandes.workflow.ts:1 export const CommandesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\commandes\commandes.workflow.ts:4 "commandes_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\commandes\commandes.workflow.ts:7 "Commandes Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\depenses\depenses.workflow.ts:1 export const DepensesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\depenses\depenses.workflow.ts:4 "depenses_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\depenses\depenses.workflow.ts:7 "Depenses Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\devis\devis.workflow.ts:1 export const DevisWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\devis\devis.workflow.ts:4 "devis_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\devis\devis.workflow.ts:7 "Devis Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\employes\employes.workflow.ts:1 export const EmployesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\employes\employes.workflow.ts:4 "employes_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\employes\employes.workflow.ts:7 "Employes Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\factures\factures.workflow.ts:1 export const FacturesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\factures\factures.workflow.ts:4 "factures_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\factures\factures.workflow.ts:7 "Factures Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\fournisseurs\fournisseurs.workflow.ts:1 export const FournisseursWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\fournisseurs\fournisseurs.workflow.ts:4 "fournisseurs_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\fournisseurs\fournisseurs.workflow.ts:7 "Fournisseurs Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\incidents\incidents.workflow.ts:1 export const IncidentsWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\incidents\incidents.workflow.ts:4 "incidents_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\incidents\incidents.workflow.ts:7 "Incidents Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\intrants\intrants.workflow.ts:1 export const IntrantsWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\intrants\intrants.workflow.ts:4 "intrants_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\intrants\intrants.workflow.ts:7 "Intrants Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\livraisons\livraisons.workflow.ts:1 export const LivraisonsWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\livraisons\livraisons.workflow.ts:4 "livraisons_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\livraisons\livraisons.workflow.ts:7 "Livraisons Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\parcelles\parcelles.workflow.ts:1 export const ParcellesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\parcelles\parcelles.workflow.ts:4 "parcelles_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\parcelles\parcelles.workflow.ts:7 "Parcelles Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\recettes\recettes.workflow.ts:1 export const RecettesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\recettes\recettes.workflow.ts:4 "recettes_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\recettes\recettes.workflow.ts:7 "Recettes Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\recoltes\recoltes.workflow.ts:1 export const RecoltesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\recoltes\recoltes.workflow.ts:4 "recoltes_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\recoltes\recoltes.workflow.ts:7 "Recoltes Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\taches\taches.workflow.ts:1 export const TachesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\taches\taches.workflow.ts:4 "taches_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\taches\taches.workflow.ts:7 "Taches Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\vehicules\vehicules.workflow.ts:1 export const VehiculesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\vehicules\vehicules.workflow.ts:4 "vehicules_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\vehicules\vehicules.workflow.ts:7 "Vehicules Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:13 WorkflowExecution
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:15 from "../types/WorkflowExecution";
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:18 WorkflowExecutionPersistence {
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:22 WorkflowExecution
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:30 "runtime_workflow_executions"
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:49 Partial<WorkflowExecution>
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:56 "runtime_workflow_executions",
C:\Users\Admin\terragest\src\runtime\workflows\sagas\SagaCoordinator.ts:2 WorkflowDefinition
C:\Users\Admin\terragest\src\runtime\workflows\sagas\SagaCoordinator.ts:4 from "../types/WorkflowDefinition";
C:\Users\Admin\terragest\src\runtime\workflows\sagas\SagaCoordinator.ts:10 workflow:
C:\Users\Admin\terragest\src\runtime\workflows\sagas\SagaCoordinator.ts:11 WorkflowDefinition,
C:\Users\Admin\terragest\src\runtime\workflows\sagas\SagaCoordinator.ts:18 ...workflow.steps
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:2 WorkflowExecution
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:4 from "../types/WorkflowExecution";
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:7 WorkflowStateStore {
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:10 WorkflowExecution[] = [];
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:13 execution: WorkflowExecution
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:22 workflowId: string,
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:23 partial: Partial<WorkflowExecution>
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:29 item.workflowId === workflowId
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowDefinition.ts:2 WorkflowStep
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowDefinition.ts:4 from "./WorkflowStep";
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowDefinition.ts:6 export type WorkflowDefinition = {
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowDefinition.ts:9 steps: WorkflowStep[];
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowExecution.ts:1 export type WorkflowExecutionStatus =
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowExecution.ts:8 export type WorkflowExecution = {
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowExecution.ts:9 workflowId: string;
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowExecution.ts:12 WorkflowExecutionStatus;
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowStep.ts:1 export type WorkflowStep = {
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:4 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:5 "terrain-creation-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:20 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:34 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:49 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:64 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:65 "maintenance-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:79 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:80 "intervention-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:94 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:109 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:15 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:25 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:37 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:47 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:59 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:69 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:81 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:91 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:103 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:113 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:125 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:135 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:147 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:157 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:169 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:179 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:193 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:203 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:1 export const GeneratedRuntimeWorkflows = {
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:4 "terrain-creation-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:5 "terrain-update-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:13 "stock-monitoring-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:14 "stock-alert-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:18 "contract-validation-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:22 "maintenance-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:23 "preventive-maintenance-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:27 "intervention-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:32 "materiel-repair-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:36 "payment-validation-workflow",
C:\Users\Admin\terragest\src\_quarantine\sidebar\AppSidebar.tsx:45 label: "Workflow",
C:\Users\Admin\terragest\src\_quarantine\sidebar\AppSidebar.tsx:46 href: "/workflow-engine",
C:\Users\Admin\terragest\src\_quarantine\sidebar\ERPSidebar.tsx:30 "Workflows",
C:\Users\Admin\terragest\src\_quarantine\workflow\automations\WorkflowAutomation.ts:3 } from "@/workflow/services/EventBus";
C:\Users\Admin\terragest\src\_quarantine\workflow\automations\WorkflowAutomation.ts:8 } from "@/workflow/events/ProductEvents";
C:\Users\Admin\terragest\src\_quarantine\workflow\automations\WorkflowAutomation.ts:12 } from "@/workflow/rules/RulesEngine";
C:\Users\Admin\terragest\src\_quarantine\workflow\automations\WorkflowAutomation.ts:14 export const WorkflowAutomation = {
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\ProductCreatedListener.ts:3 } from "@/workflow/services/EventBus";
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\ProductCreatedListener.ts:7 } from "@/workflow/events/ProductEvents";
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\ProductCreatedListener.ts:11 } from "@/workflow/notifications/NotificationEngine";
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\StockAlertListener.ts:3 } from "@/workflow/services/EventBus";
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\StockAlertListener.ts:7 } from "@/workflow/events/ProductEvents";
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\StockAlertListener.ts:11 } from "@/workflow/notifications/NotificationEngine";
C:\Users\Admin\terragest\src\_quarantine\workflow\notifications\WorkflowNotificationCenter.tsx:8 export const WorkflowNotificationCenter =
C:\Users\Admin\terragest\src\_quarantine\workflow\notifications\WorkflowNotificationCenter.tsx:26 "Workflow actif",
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:11 WorkflowAutomation,
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:12 } from "@/workflow/automations/WorkflowAutomation";
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:14 export const WorkflowProductsRepository = {
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:31 WorkflowAutomation.onProductCreated(
```

## Automation engines

```txt
C:\Users\Admin\terragest\src\app\(private)\automation\page.tsx:2 ERPRuntimeAutomationDashboard,
C:\Users\Admin\terragest\src\app\(private)\automation\page.tsx:3 } from "@/components/erp/automation";
C:\Users\Admin\terragest\src\app\(private)\automation\page.tsx:8 <ERPRuntimeAutomationDashboard />
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:18 action: "Automation déclenchée",
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationCard.tsx:6 export function ERPAutomationCard({
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:3 export function ERPAutomationTimeline() {
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:5 const automations = [
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:28 {automations.map((automation) => (
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:31 key={`${automation.time}-${automation.label}`}
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:57 {automation.time}
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:66 {automation.label}
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimelinePanel.tsx:2 ERPAutomationTimelineStore,
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimelinePanel.tsx:3 } from "@/runtime/automation";
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimelinePanel.tsx:5 export function ERPAutomationTimelinePanel() {
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimelinePanel.tsx:8 ERPAutomationTimelineStore.all();
C:\Users\Admin\terragest\src\components\erp\automation\ERPNotificationsPanel.tsx:3 } from "@/runtime/automation";
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:7 seedERPRuntimeAutomation,
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:8 } from "@/runtime/automation";
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:11 ERPAutomationTimelinePanel,
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:12 } from "./ERPAutomationTimelinePanel";
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:18 seedERPRuntimeAutomation();
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:20 export function ERPRuntimeAutomationDashboard() {
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:26 eyebrow="ERP Automation"
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:27 title="Automation Runtime Engine"
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:28 description="Execution des automations, hooks runtime et notifications ERP."
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:38 Automation timeline
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:43 <ERPAutomationTimelinePanel />
C:\Users\Admin\terragest\src\components\erp\automation\index.ts:1 export * from "./ERPAutomationTimelinePanel";
C:\Users\Admin\terragest\src\components\erp\automation\index.ts:5 export * from "./ERPRuntimeAutomationDashboard";
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:7 AutomationRuntimeEngine,
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:8 AutomationRuntimeQueue,
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:9 AutomationRuntimeRegistry,
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:10 type AutomationRuntimeJob,
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:11 } from "@/runtime/automation-runtime";
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:13 interface ERPAutomationRuntimePanelProps {
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:17 export function ERPAutomationRuntimePanel({
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:19 }: ERPAutomationRuntimePanelProps) {
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:20 const rules = AutomationRuntimeRegistry.forModule(module.metadata.key);
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:23 useState<AutomationRuntimeJob[]>(AutomationRuntimeQueue.all());
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:26 AutomationRuntimeEngine.evaluate(module.metadata.key, {
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:32 setJobs([...AutomationRuntimeQueue.all()]);
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:36 await AutomationRuntimeEngine.runPending();
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:37 setJobs([...AutomationRuntimeQueue.all()]);
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:45 Automation runtime
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:58 Aucune automation declaree pour ce module.
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:97 Jobs automation
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:103 Aucun job automation.
C:\Users\Admin\terragest\src\components\erp\automation-runtime\index.ts:1 export { ERPAutomationRuntimePanel } from "./ERPAutomationRuntimePanel";
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitMetricGrid.tsx:20 <ERPStatCard label="Automation" value={snapshot.automationCount} helper="Automatisations" />
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:33 <th className="px-4 py-3 text-left font-semibold text-slate-600">Automation</th>
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:46 <td className="px-4 py-3 text-slate-600">{module.automation.length}</td>
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx:25 label: "Automation monitoring",
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx:26 value: snapshot.automationCount,
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpitDashboard.tsx:17 description="Supervision centrale des modules, schemas, actions, workflows, events, automation, permissions et navigation."
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:2 getAutomationsRegistry,
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:3 } from "@/core/automation/registry/automation-registry";
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:40 const automations =
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:41 getAutomationsRegistry();
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:221 ERP Automations
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:226 {automations.length === 0 && (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:232 {automations.map(
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:233 (automation) => (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:236 automation.rule.id
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:245 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:252 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:259 {automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:269 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:278 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:287 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:353 ERP Automations
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:358 {automations.length === 0 && (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:364 {automations.map(
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:365 (automation) => (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:368 automation.rule.id
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:377 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:384 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:391 {automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:401 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:410 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:419 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:529 ERP Automations
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:534 {automations.length === 0 && (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:540 {automations.map(
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:541 (automation) => (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:544 automation.rule.id
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:553 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:560 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:567 {automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:577 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:586 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:595 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:661 ERP Automations
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:666 {automations.length === 0 && (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:672 {automations.map(
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:673 (automation) => (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:676 automation.rule.id
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:685 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:692 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:699 {automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:709 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:718 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:727 automation
C:\Users\Admin\terragest\src\components\erp\executive-dashboard\ERPExecutiveDashboard.tsx:28 <div className="text-sm text-gray-500">Automations</div>
C:\Users\Admin\terragest\src\components\erp\kpi\ERPKPIGrid.tsx:15 label: "Automations",
C:\Users\Admin\terragest\src\components\erp\live\ERPLiveEvents.tsx:20 label: "Automation déclenchée",
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPSystemHealth.tsx:13 ["Automation", "healthy"],
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:19 <ERPStatCard label="Automation" value={snapshot.automation} helper="Triggers live" />
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatus.tsx:14 name: "Automation Runner",
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:25 description="Source unique de verite ERP pour modules, schemas, actions, workflows, permissions et automation."
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:49 label="Automation"
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:13 const automationEnabled = module.metadata.features?.automation === true;
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:29 {automationEnabled && <ERPBadge tone="warning">Automation</ERPBadge>}
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsPanel.tsx:67 <p className="text-sm text-slate-500">Automations</p>
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsPanel.tsx:69 {metrics.automations}
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkerQueue.tsx:25 name: "automation-worker",
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:4 import { ERPAutomationRuntimePanel } from "@/components/erp/automation-runtime";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:34 <ERPAutomationRuntimePanel module={module} />
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:1 export type AutomationRule = {
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:17 const automationRules:
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:18 AutomationRule[] = [];
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:20 export function registerAutomation(
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:21 rule: AutomationRule
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:23 automationRules.push(rule);
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:26 "ERP AUTOMATION REGISTERED",
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:31 export async function executeAutomations(
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:36 automationRules.filter(
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:45 "ERP AUTOMATION EXECUTED",
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:55 export function getAutomations() {
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:56 return automationRules;
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:2 AutomationRule,
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:3 } from "@/core/automation/automation-engine";
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:5 type AutomationMetadata = {
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:13 const automationRegistry =
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:17 rule: AutomationRule;
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:19 AutomationMetadata;
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:23 export function registerAutomationRule(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:24 rule: AutomationRule
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:26 automationRegistry.set(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:42 "ERP AUTOMATION REGISTRY",
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:47 export function incrementAutomationExecution(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:50 const automation =
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:51 automationRegistry.get(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:55 if (!automation) {
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:59 automation.metadata.executions += 1;
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:62 export function getAutomationsRegistry() {
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:64 automationRegistry.values()
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:68 export function disableAutomation(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:71 const automation =
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:72 automationRegistry.get(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:76 if (!automation) {
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:80 automation.metadata.enabled =
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:84 export function enableAutomation(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:87 const automation =
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:88 automationRegistry.get(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:92 if (!automation) {
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:96 automation.metadata.enabled =
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:6 initializeERPAutomationEngine,
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:7 } from "@/runtime/automation/engine/ERPAutomationEngine";
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:27 initializeERPAutomationEngine();
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:4 automations?: boolean;
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:37 automations: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:62 automations: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:85 automations: true,
C:\Users\Admin\terragest\src\features\achats\achats.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\clients\clients.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\commandes\commandes.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\depenses\depenses.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\devis\devis.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\employes\employes.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\exploitations\exploitations.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\factures\factures.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\fournisseurs\fournisseurs.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\incidents\incidents.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\interventions\interventions.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\intrants\intrants.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\livraisons\livraisons.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\materiels\materiels.feature.ts:18 "automation",
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:47 AutomationRunner
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:49 from "@/runtime/automation/runner/AutomationRunner";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:52 AutomationScheduler
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:54 from "@/runtime/automation/scheduler/AutomationScheduler";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:71 from "@/runtime/automation/rules/MaterielBreakdownRule";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:102 private automationRunner =
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:103 new AutomationRunner();
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:105 private automationScheduler =
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:106 new AutomationScheduler();
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:114 this.automationScheduler.register(
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:146 await this.automationRunner.run(
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:147 this.automationScheduler.getAll(),
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\parcelles\parcelles.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\produits\produits.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\recettes\recettes.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\recoltes\recoltes.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\stocks\stocks.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\taches\taches.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\terrains\terrains.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\vehicules\vehicules.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:75 BPM & process automation
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:1 // src/platform/automation/ERPAutomationEngine.ts
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:6 export interface ERPAutomation {
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:15 class ERPAutomationEngineManager {
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:17 private automations: ERPAutomation[] = [];
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:20 automation: ERPAutomation
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:24 `[AUTOMATION REGISTERED]
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:25 ${automation.name}`
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:28 this.automations.push(
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:29 automation
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:33 automation.trigger,
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:34 automation.run
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:38 getAutomations() {
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:40 return this.automations;
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:44 export const ERPAutomationEngine =
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:45 new ERPAutomationEngineManager();
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:1 // src/platform/automation/registerAutomations.ts
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:3 import { ERPAutomationEngine }
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:4 from "@/platform/automation/ERPAutomationEngine";
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:6 export function registerERPAutomations() {
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:8 ERPAutomationEngine.register({
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:17 "[AUTOMATION] stock alert triggered",
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:23 ERPAutomationEngine.register({
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:32 "[AUTOMATION] generate facture",
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:38 ERPAutomationEngine.register({
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:47 "[AUTOMATION] maintenance reminder",
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:63 if (module.metadata.features?.automation) {
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:64 capabilities.push("automation");
C:\Users\Admin\terragest\src\platform\registry\FeatureDefinition.ts:6 | "automation"
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:1 export interface ERPAutomation {
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:14 export class ERPAutomationEngine {
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:16 private automations:
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:17 ERPAutomation[] = [];
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:19 registerAutomation(
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:20 automation: ERPAutomation
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:23 this.automations.push(
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:24 automation
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:34 this.automations
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:36 automation =>
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:37 automation.module === module
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:38 && automation.trigger === trigger
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:41 automation =>
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:42 automation.action(data)
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:47 export const erpAutomationEngine =
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:48 new ERPAutomationEngine();
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:2 ERPAutomation,
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:3 } from "./ERPAutomationEngine";
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:5 export class ERPAutomationRegistry {
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:7 private static automations:
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:8 ERPAutomation[] = [];
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:11 automation: ERPAutomation
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:14 this.automations.push(
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:15 automation
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:21 return this.automations;
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationTimelineStore.ts:1 export interface ERPAutomationTimelineItem {
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationTimelineStore.ts:11 export class ERPAutomationTimelineStore {
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationTimelineStore.ts:12 private static items: ERPAutomationTimelineItem[] = [];
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationTimelineStore.ts:22 static addItem(item: ERPAutomationTimelineItem) {
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationTimelineStore.ts:27 export const erpAutomationTimelineStore =
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationTimelineStore.ts:28 new ERPAutomationTimelineStore();
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:6 initializeERPAutomationEngine,
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:7 } from "./engine/ERPAutomationEngine";
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:11 export function seedERPRuntimeAutomation() {
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:19 initializeERPAutomationEngine();
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:26 actor: "automation-runtime",
C:\Users\Admin\terragest\src\runtime\automation\index.ts:1 export * from "./ERPAutomationEngine";
C:\Users\Admin\terragest\src\runtime\automation\index.ts:2 export * from "./ERPAutomationTimelineStore";
C:\Users\Admin\terragest\src\runtime\automation\index.ts:4 export * from "./ERPAutomationRegistry";
C:\Users\Admin\terragest\src\runtime\automation\index.ts:5 export * from "./seedERPRuntimeAutomation";
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomation.ts:1 export interface RuntimeAutomation {
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:2 runtimeAutomations,
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:4 from "@/runtime/automation/runtimeAutomations";
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:6 export class RuntimeAutomationEngine {
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:11 const automation of
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:12 runtimeAutomations
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:16 automation.enabled ===
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:26 "Running automation",
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:27 automation.id
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:30 await automation.handler();
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:35 "Automation error",
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:36 automation.id,
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:2 RuntimeAutomation,
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:4 from "@/runtime/automation/RuntimeAutomation";
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:11 export const runtimeAutomations:
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:12 RuntimeAutomation[] = [
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:35 "Running stock automation..."
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:42 "automation",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:87 "automation",
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:2 ERPAutomationTimelineStore,
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:3 } from "./ERPAutomationTimelineStore";
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:9 export function seedERPRuntimeAutomation() {
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:10 ERPAutomationTimelineStore.addItem({
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:11 id: "automation-1",
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:12 action: "Runtime automation initialized",
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:13 label: "Initialisation automation",
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:22 title: "Automation runtime",
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:23 message: "Le runtime automation ERP est initialisé.",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:10 ERPAutomationRegistry,
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:11 } from "./ERPAutomationRegistry";
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:14 ERPAutomationTimelineStore,
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:15 } from "../timeline/ERPAutomationTimelineStore";
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:36 ERPAutomationRegistry.filter(
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:47 ERPAutomationTimelineStore.add({
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:81 "Automation notification",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:104 "Automation alert",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:123 export function initializeERPAutomationEngine() {
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:2 ERPAutomationRule,
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:3 } from "./ERPAutomationRule";
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:5 export const ERPAutomationRegistry:
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:6 ERPAutomationRule[] = [
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:5 export type ERPAutomationActionType =
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:12 export type ERPAutomationRule = {
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:20 action: ERPAutomationActionType;
C:\Users\Admin\terragest\src\runtime\automation\rules\AutomationRule.ts:1 export type AutomationRule = {
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:2 Automation
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:4 from "../types/Automation";
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:13 Automation = {
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:16 "AUTOMATION_MATERIEL_BREAKDOWN",
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:19 "Materiel Breakdown Automation",
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:22 "Automation matériel critique",
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:47 "[AUTOMATION] Maintenance workflow triggered",
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:8 Automation
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:10 from "../types/Automation";
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:13 AutomationTrigger
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:15 from "../triggers/AutomationTrigger";
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:17 export class AutomationRunner {
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:20 new AutomationTrigger();
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:23 automations: Automation[],
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:27 for (const automation of automations) {
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:31 automation,
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:40 `[Automation Triggered] ${automation.name}`
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:43 await automation.action({
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:2 Automation
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:4 from "../types/Automation";
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:6 export class AutomationScheduler {
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:8 private automations:
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:9 Automation[] = [];
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:12 automation: Automation
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:15 this.automations.push(
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:16 automation
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:22 return this.automations;
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationExecution.ts:1 export type ERPAutomationExecution = {
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:2 ERPAutomationExecution,
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:3 } from "./ERPAutomationExecution";
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:5 class ERPAutomationTimelineStoreClass {
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:8 ERPAutomationExecution[] = [];
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:11 execution: ERPAutomationExecution
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:28 export const ERPAutomationTimelineStore =
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:29 new ERPAutomationTimelineStoreClass();
C:\Users\Admin\terragest\src\runtime\automation\triggers\AutomationTrigger.ts:7 Automation
C:\Users\Admin\terragest\src\runtime\automation\triggers\AutomationTrigger.ts:9 from "../types/Automation";
C:\Users\Admin\terragest\src\runtime\automation\triggers\AutomationTrigger.ts:11 export class AutomationTrigger {
C:\Users\Admin\terragest\src\runtime\automation\triggers\AutomationTrigger.ts:14 automation: Automation,
C:\Users\Admin\terragest\src\runtime\automation\triggers\AutomationTrigger.ts:18 return automation.eventType === event.type;
C:\Users\Admin\terragest\src\runtime\automation\types\Automation.ts:6 export type AutomationContext = {
C:\Users\Admin\terragest\src\runtime\automation\types\Automation.ts:11 export type AutomationAction =
C:\Users\Admin\terragest\src\runtime\automation\types\Automation.ts:13 context: AutomationContext
C:\Users\Admin\terragest\src\runtime\automation\types\Automation.ts:16 export type Automation = {
C:\Users\Admin\terragest\src\runtime\automation\types\Automation.ts:21 action: AutomationAction;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:1 import { AutomationRuntimeRegistry } from "./AutomationRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:2 import { AutomationRuntimeTriggerEngine } from "./AutomationRuntimeTriggerEngine";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:3 import { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:4 import { AutomationRuntimeExecutor } from "./AutomationRuntimeExecutor";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:6 export class AutomationRuntimeEngine {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:11 const rules = AutomationRuntimeRegistry.forModule(moduleKey);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:15 AutomationRuntimeTriggerEngine.matches(rule, payload)
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:17 .map((rule) => AutomationRuntimeQueue.enqueue(rule));
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:23 const jobs = AutomationRuntimeQueue.pending();
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:26 await AutomationRuntimeExecutor.execute(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:29 return AutomationRuntimeQueue.all();
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:33 const rule = AutomationRuntimeRegistry.get(ruleKey);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:36 throw new Error(`Automation introuvable: ${ruleKey}`);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:39 const job = AutomationRuntimeQueue.enqueue(rule);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:41 return AutomationRuntimeExecutor.execute(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:2 AutomationRuntimeAction,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:3 AutomationRuntimeJob,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:4 } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:5 import { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:7 export class AutomationRuntimeExecutor {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:9 action: AutomationRuntimeAction,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:10 job: AutomationRuntimeJob
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:12 console.log("AUTOMATION ACTION", {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:20 static async execute(job: AutomationRuntimeJob): Promise<AutomationRuntimeJob> {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:24 AutomationRuntimeQueue.update(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:28 await AutomationRuntimeExecutor.executeAction(action, job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:34 return AutomationRuntimeQueue.update(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:37 error instanceof Error ? error.message : "Erreur automation";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:40 return AutomationRuntimeQueue.moveToDeadLetter(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:45 return AutomationRuntimeQueue.update(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:2 AutomationRuntimeJob,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:3 AutomationRuntimeRule,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:4 } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:6 const queue: AutomationRuntimeJob[] = [];
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:7 const deadLetters: AutomationRuntimeJob[] = [];
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:9 export class AutomationRuntimeQueue {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:10 static enqueue(rule: AutomationRuntimeRule): AutomationRuntimeJob {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:13 const job: AutomationRuntimeJob = {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:30 static all(): AutomationRuntimeJob[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:34 static pending(): AutomationRuntimeJob[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:38 static update(job: AutomationRuntimeJob): AutomationRuntimeJob {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:50 static moveToDeadLetter(job: AutomationRuntimeJob): AutomationRuntimeJob {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:56 AutomationRuntimeQueue.update(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:61 static deadLetters(): AutomationRuntimeJob[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:1 import type { AutomationRuntimeRule } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:2 import { automationRuntimeRules } from "./AutomationRuntimeRules";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:4 export class AutomationRuntimeRegistry {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:5 static all(): AutomationRuntimeRule[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:6 return automationRuntimeRules;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:9 static forModule(moduleKey: string): AutomationRuntimeRule[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:10 return automationRuntimeRules.filter(
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:15 static get(ruleKey: string): AutomationRuntimeRule | undefined {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:16 return automationRuntimeRules.find((rule) => rule.key === ruleKey);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:1 import type { AutomationRuntimeRule } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:3 export const automationRuntimeRules: AutomationRuntimeRule[] = [
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeScheduler.ts:1 import { AutomationRuntimeEngine } from "./AutomationRuntimeEngine";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeScheduler.ts:3 export class AutomationRuntimeScheduler {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeScheduler.ts:5 return AutomationRuntimeEngine.runPending();
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:2 AutomationRuntimeRule,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:3 AutomationRuntimeTrigger,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:4 } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:8 operator: AutomationRuntimeTrigger["operator"],
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:30 export class AutomationRuntimeTriggerEngine {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:32 rule: AutomationRuntimeRule,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:1 export type AutomationRuntimeTriggerType =
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:8 export type AutomationRuntimeJobStatus =
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:15 export interface AutomationRuntimeTrigger {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:16 type: AutomationRuntimeTriggerType;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:22 export interface AutomationRuntimeAction {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:34 export interface AutomationRuntimeRule {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:39 trigger: AutomationRuntimeTrigger;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:40 actions: AutomationRuntimeAction[];
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:44 export interface AutomationRuntimeJob {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:48 status: AutomationRuntimeJobStatus;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:54 actions: AutomationRuntimeAction[];
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:2 AutomationRuntimeAction,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:3 AutomationRuntimeJob,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:4 AutomationRuntimeJobStatus,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:5 AutomationRuntimeRule,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:6 AutomationRuntimeTrigger,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:7 AutomationRuntimeTriggerType,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:8 } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:10 export { automationRuntimeRules } from "./AutomationRuntimeRules";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:11 export { AutomationRuntimeRegistry } from "./AutomationRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:12 export { AutomationRuntimeTriggerEngine } from "./AutomationRuntimeTriggerEngine";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:13 export { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:14 export { AutomationRuntimeExecutor } from "./AutomationRuntimeExecutor";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:15 export { AutomationRuntimeEngine } from "./AutomationRuntimeEngine";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:16 export { AutomationRuntimeScheduler } from "./AutomationRuntimeScheduler";
C:\Users\Admin\terragest\src\runtime\cockpit\ERPCockpitSnapshot.ts:12 automationCount: modules.reduce((total, module) => total + module.automation.length, 0),
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:20 | "automation"
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:31 name: "Automation Runtime",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:7 | "automation"
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:24 { key: "automation", label: "Automation runtime", completed: true },
C:\Users\Admin\terragest\src\runtime\events\ERPDomainEvent.ts:7 | "AUTOMATION_TRIGGERED"
C:\Users\Admin\terragest\src\runtime\events\ERPEventAutomationBridge.ts:7 erpAutomationEngine,
C:\Users\Admin\terragest\src\runtime\events\ERPEventAutomationBridge.ts:8 } from "../automation";
C:\Users\Admin\terragest\src\runtime\events\ERPEventAutomationBridge.ts:10 export class ERPEventAutomationBridge {
C:\Users\Admin\terragest\src\runtime\events\ERPEventAutomationBridge.ts:19 erpAutomationEngine
C:\Users\Admin\terragest\src\runtime\events\ERPEventAutomationBridge.ts:30 export const erpEventAutomationBridge =
C:\Users\Admin\terragest\src\runtime\events\ERPEventAutomationBridge.ts:31 new ERPEventAutomationBridge();
C:\Users\Admin\terragest\src\runtime\events\ERPRuntimeEventOrchestrator.ts:7 ERPAutomationTimelineStore,
C:\Users\Admin\terragest\src\runtime\events\ERPRuntimeEventOrchestrator.ts:9 } from "../automation";
C:\Users\Admin\terragest\src\runtime\events\ERPRuntimeEventOrchestrator.ts:20 ERPAutomationTimelineStore
C:\Users\Admin\terragest\src\runtime\events\index.ts:2 export * from "./ERPEventAutomationBridge";
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:56 automations?: string[];
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:55 "automation",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:67 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:124 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:56 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:30 automation?: boolean;
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:25 { id: "automation", label: "Automation", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:38 { from: "events", to: "automation", label: "triggers" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:39 { from: "automation", to: "workflows", label: "orchestrates" },
C:\Users\Admin\terragest\src\runtime\production\limits\ERPRateLimitRegistry.ts:17 key: "automation-module-hour",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:62 channel: "automation",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:64 title: "Automation declenchee",
C:\Users\Admin\terragest\src\runtime\realtime\channels\ERPRealtimeChannel.ts:4 | "automation"
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:20 automation: ERPRealtimeBus.byChannel("automation").length,
C:\Users\Admin\terragest\src\runtime\registry\ERPRegistry.ts:65 automation(
C:\Users\Admin\terragest\src\runtime\registry\ERPRegistry.ts:71 ?.automation ?? []
C:\Users\Admin\terragest\src\runtime\registry\types.ts:25 export type ERPRegistryAutomation = {
C:\Users\Admin\terragest\src\runtime\registry\types.ts:58 automation: ERPRegistryAutomation[];
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:93 automation: [
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:56 type: "AUTOMATION_TRIGGERED",
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeScheduler.ts:2 RuntimeAutomationEngine,
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeScheduler.ts:4 from "@/runtime/automation/RuntimeAutomationEngine";
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeScheduler.ts:37 await RuntimeAutomationEngine
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:19 automations: 12,
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:29 automations: 4,
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:39 automations: 0,
C:\Users\Admin\terragest\src\runtime\tenant\metrics\ERPTenantMetrics.ts:8 automations: number;
C:\Users\Admin\terragest\src\runtime\testing\engine\ERPTestingTypes.ts:13 | "automation"
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:59 id: "automation_runtime",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:60 label: "Automation Runtime",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:61 type: "automation",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:62 module: "automation",
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:10 ERPAutomationRegistry,
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:11 } from "@/runtime/automation";
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:36 simulateAutomation() {
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:37 return ERPAutomationRegistry;
C:\Users\Admin\terragest\src\runtime\workers\ERPWorkersSeed.ts:22 "worker_automation_1",
C:\Users\Admin\terragest\src\runtime\workers\ERPWorkersSeed.ts:24 "LOW_STOCK_AUTOMATION"
C:\Users\Admin\terragest\src\runtime\workers\registry\ERPWorkerRegistry.ts:16 id: "worker_automation_1",
C:\Users\Admin\terragest\src\runtime\workers\registry\ERPWorkerRegistry.ts:17 label: "Automation Worker",
C:\Users\Admin\terragest\src\runtime\workers\registry\ERPWorkerRegistry.ts:18 queue: "automation",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:15 | "automation"
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:29 type: "automation",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:60 type: "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:16 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:38 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:60 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:82 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:104 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:126 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:148 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:170 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:194 "automation",
C:\Users\Admin\terragest\src\_quarantine\workflow\automations\WorkflowAutomation.ts:14 export const WorkflowAutomation = {
C:\Users\Admin\terragest\src\_quarantine\workflow\notifications\WorkflowNotificationCenter.tsx:29 "Automation exécutée",
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:11 WorkflowAutomation,
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:12 } from "@/workflow/automations/WorkflowAutomation";
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:31 WorkflowAutomation.onProductCreated(
```

## Observability engines

```txt
C:\Users\Admin\terragest\src\app\(private)\observability\page.tsx:2 ERPRuntimeObservabilityDashboard,
C:\Users\Admin\terragest\src\app\(private)\observability\page.tsx:3 } from "@/components/erp/observability";
C:\Users\Admin\terragest\src\app\(private)\observability\page.tsx:8 <ERPRuntimeObservabilityDashboard />
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:97 Observability, supervision, runtime timeline,
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPMonitoringDashboard.tsx:16 title="Advanced Observability"
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPSystemHealth.tsx:12 ["Observability", "warning"],
C:\Users\Admin\terragest\src\components\erp\observability\ERPAlertsPanel.tsx:2 ERPObservabilityTimeline,
C:\Users\Admin\terragest\src\components\erp\observability\ERPAlertsPanel.tsx:3 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\components\erp\observability\ERPAlertsPanel.tsx:8 ERPObservabilityTimeline.alerts();
C:\Users\Admin\terragest\src\components\erp\observability\ERPEventsTimeline.tsx:2 ERPObservabilityTimeline,
C:\Users\Admin\terragest\src\components\erp\observability\ERPEventsTimeline.tsx:3 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\components\erp\observability\ERPEventsTimeline.tsx:8 ERPObservabilityTimeline.events();
C:\Users\Admin\terragest\src\components\erp\observability\ERPObservabilityCenter.tsx:6 export function ERPObservabilityCenter() {
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:7 seedERPRuntimeObservability,
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:8 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:22 seedERPRuntimeObservability();
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:24 export function ERPRuntimeObservabilityDashboard() {
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:30 eyebrow="ERP Observability"
C:\Users\Admin\terragest\src\components\erp\observability\ERPTracesPanel.tsx:2 ERPObservabilityTimeline,
C:\Users\Admin\terragest\src\components\erp\observability\ERPTracesPanel.tsx:3 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\components\erp\observability\ERPTracesPanel.tsx:8 ERPObservabilityTimeline.traces();
C:\Users\Admin\terragest\src\components\erp\observability\index.ts:7 export * from "./ERPRuntimeObservabilityDashboard";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatus.tsx:18 name: "Observability",
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsDashboard.tsx:35 description="Live runtime streams, realtime events, workers feeds et observability timeline."
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingDashboard.tsx:35 description="Validation runtime, workflows, workers, securite, multi-tenant et observability."
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkerQueue.tsx:20 name: "observability-worker",
C:\Users\Admin\terragest\src\core\layout\Sidebar.tsx:15 ["Observability", "/observability"],
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:144 module.metadata.features?.observability
C:\Users\Admin\terragest\src\features\achats\achats.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\clients\clients.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\commandes\commandes.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\depenses\depenses.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\devis\devis.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\employes\employes.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\exploitations\exploitations.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\factures\factures.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\fournisseurs\fournisseurs.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\incidents\incidents.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\interventions\interventions.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\intrants\intrants.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\livraisons\livraisons.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\materiels\materiels.feature.ts:19 "observability",
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:6 export const ObservabilityFeature:
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:10 "observability",
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:13 "Observability",
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:22 "/observability",
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\observability\components\AuditTable.tsx:4 from "@/features/observability/hooks/useAuditEvents";
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:10 } from "@/features/observability/types/AuditEvent";
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:13 from "@/features/observability/services/AuditService";
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:7 import { RuntimeObservabilityService }
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:8 from "../services/RuntimeObservabilityService";
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:20 new RuntimeObservabilityService();
C:\Users\Admin\terragest\src\features\observability\services\AuditService.ts:3 } from "@/features/observability/types/AuditEvent";
C:\Users\Admin\terragest\src\features\observability\services\RuntimeObservabilityService.ts:4 export class RuntimeObservabilityService {
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:19 export class LiveObservabilityService {
C:\Users\Admin\terragest\src\features\observability\stores\observabilityStore.ts:1 export const observabilityStore = {
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:16 LiveObservabilityService
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:18 from "../../services/live/LiveObservabilityService";
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:31 new LiveObservabilityService();
C:\Users\Admin\terragest\src\features\parcelles\parcelles.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\platform\components\runtime\LiveActivityPanel.tsx:2 from "../../../observability/widgets/live/LiveEventStream";
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeConsole.tsx:2 from "../../../observability/widgets/live/EventReplayConsole";
C:\Users\Admin\terragest\src\features\platform\dashboards\EnterpriseSupervisionDashboard.tsx:2 from "../../observability/dashboards/LiveRuntimeDashboard";
C:\Users\Admin\terragest\src\features\produits\produits.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\recettes\recettes.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\recoltes\recoltes.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\runtime-supervision\RuntimeSupervisionDashboard.tsx:11 from "@/runtime/observability/RuntimeLogsPanel";
C:\Users\Admin\terragest\src\features\stocks\stocks.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\taches\taches.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\terrains\terrains.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\vehicules\vehicules.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:46 ObservabilityFeature
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:48 from "@/features/observability/observability.feature";
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:67 if (module.metadata.features?.observability) {
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:68 capabilities.push("observability");
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:134 ObservabilityFeature,
C:\Users\Admin\terragest\src\platform\events\DomainEvents.ts:4 from "@/platform/observability/EventStore";
C:\Users\Admin\terragest\src\platform\events\DomainEvents.ts:7 from "@/platform/observability/MetricsRegistry";
C:\Users\Admin\terragest\src\platform\intelligence\RuntimeAnomalyDetector.ts:4 from "@/platform/observability/MetricsRegistry";
C:\Users\Admin\terragest\src\platform\monitoring\ERPMonitoringService.ts:7 from "@/platform/observability/MetricsRegistry";
C:\Users\Admin\terragest\src\platform\monitoring\ERPMonitoringService.ts:10 from "@/platform/observability/EventStore";
C:\Users\Admin\terragest\src\platform\observability\ERPLogger.ts:1 // src/platform/observability/ERPLogger.ts
C:\Users\Admin\terragest\src\platform\observability\EventStore.ts:1 // src/platform/observability/EventStore.ts
C:\Users\Admin\terragest\src\platform\observability\MetricsRegistry.ts:1 // src/platform/observability/MetricsRegistry.ts
C:\Users\Admin\terragest\src\platform\registry\FeatureDefinition.ts:7 | "observability"
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:24 "observability",
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:61 "observability",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:23 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:89 if (!module.observabilityEnabled) {
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:93 code: "OBSERVABILITY_DISABLED",
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:95 recommendation: "Activer observabilityEnabled.",
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:26 | "observability";
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:1 export interface RuntimeObservabilityEntry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:12 export class RuntimeObservabilityRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:17 RuntimeObservabilityEntry
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:21 entry: RuntimeObservabilityEntry
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:30 getModuleObservability(
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:47 export const runtimeObservabilityRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:48 new RuntimeObservabilityRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimePipeline.ts:9 "observability",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:18 RuntimeObservabilityEngine,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:19 } from "@/runtime/observability/RuntimeObservabilityEngine";
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:39 observabilityEngine?: RuntimeBridgeTarget;
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:183 observabilityEngine:
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:184 dependencies.observabilityEngine ??
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:185 RuntimeObservabilityEngine,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:218 resolvedDependencies.observabilityEngine,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:286 await resolvedDependencies.observabilityEngine?.log?.({
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:59 observabilityEnabled?: boolean;
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:60 "observability",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:69 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:126 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:58 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:32 observability?: boolean;
C:\Users\Admin\terragest\src\runtime\monitoring\ConnectedRuntimeEventPublisher.ts:9 from "../../features/observability/stores/live/liveEventStore";
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:11 LiveObservabilityService
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:13 from "../../features/observability/services/live/LiveObservabilityService";
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:18 new LiveObservabilityService();
C:\Users\Admin\terragest\src\runtime\monitoring\errors\ERPErrorAnalytics.ts:1 import { ERPAlertStore } from "@/runtime/observability";
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:24 { id: "observability", label: "Observability", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:37 { from: "events", to: "observability", label: "timeline" },
C:\Users\Admin\terragest\src\runtime\observability\ERPObservabilityTimeline.ts:5 export interface ERPObservabilityTimelineItem
C:\Users\Admin\terragest\src\runtime\observability\ERPObservabilityTimeline.ts:13 export class ERPObservabilityTimeline {
C:\Users\Admin\terragest\src\runtime\observability\ERPObservabilityTimeline.ts:16 ERPObservabilityTimelineItem[] = [];
C:\Users\Admin\terragest\src\runtime\observability\ERPObservabilityTimeline.ts:40 ERPObservabilityTimelineItem
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:15 export function seedERPRuntimeObservability() {
C:\Users\Admin\terragest\src\runtime\observability\index.ts:3 export * from "./ERPObservabilityTimeline";
C:\Users\Admin\terragest\src\runtime\observability\index.ts:4 export * from "./seedERPRuntimeObservability";
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:14 from "@/runtime/observability/RuntimeLog";
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:16 export class RuntimeObservabilityEngine {
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:2 ERPObservabilityTimeline,
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:3 } from "./ERPObservabilityTimeline";
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:5 export function seedERPRuntimeObservability() {
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:6 ERPObservabilityTimeline.add({
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:7 id: "observability-1",
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:8 title: "Runtime observability initialized",
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:9 description: "Le module observability ERP est initialisé.",
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:11 action: "observability.bootstrap",
C:\Users\Admin\terragest\src\runtime\observability\generated\achats\achats.observability.ts:1 export const AchatsObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\clients\clients.observability.ts:1 export const ClientsObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\commandes\commandes.observability.ts:1 export const CommandesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\depenses\depenses.observability.ts:1 export const DepensesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\devis\devis.observability.ts:1 export const DevisObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\employes\employes.observability.ts:1 export const EmployesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\factures\factures.observability.ts:1 export const FacturesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\fournisseurs\fournisseurs.observability.ts:1 export const FournisseursObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\incidents\incidents.observability.ts:1 export const IncidentsObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\intrants\intrants.observability.ts:1 export const IntrantsObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\livraisons\livraisons.observability.ts:1 export const LivraisonsObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\parcelles\parcelles.observability.ts:1 export const ParcellesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\recettes\recettes.observability.ts:1 export const RecettesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\recoltes\recoltes.observability.ts:1 export const RecoltesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\taches\taches.observability.ts:1 export const TachesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\vehicules\vehicules.observability.ts:1 export const VehiculesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\timeline\ERPObservabilityTimeline.ts:13 export const ERPObservabilityTimeline = {
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:8 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:14 from "@/features/observability/stores/workflows/workflowExecutionStore";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:7 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\ui\theme\module.colors.ts:23 observability:
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:21 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:43 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:65 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:87 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:109 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:131 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:153 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:175 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:199 "observability",
```

## AI engines

```txt
C:\Users\Admin\terragest\src\analytics\kpi\KPIEngine.ts:33 const available =
C:\Users\Admin\terragest\src\analytics\kpi\KPIEngine.ts:45 available.length /
C:\Users\Admin\terragest\src\analytics\reporting\ReportingService.ts:6 await AggregationService.buildDashboardMetrics();
C:\Users\Admin\terragest\src\analytics\repositories\AnalyticsRepository.ts:15 await getDocs(
C:\Users\Admin\terragest\src\analytics\repositories\AnalyticsRepository.ts:36 await getDocs(
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\page.tsx:9 export default async function AchatDetailPage({
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\edit\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\edit\page.tsx:9 export default async function AchatDetailPage({
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\edit\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\ai-runtime\page.tsx:1 import { ERPAIDashboard } from "@/components/erp/ai";
C:\Users\Admin\terragest\src\app\(private)\ai-runtime\page.tsx:4 return <ERPAIDashboard />;
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\page.tsx:9 export default async function ClientDetailPage({
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\page.tsx:9 export default async function CommandeDetailPage({
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\contrats\[id]\page.tsx:7 type="details"
C:\Users\Admin\terragest\src\app\(private)\contrats\[id]\page.tsx:8 actionLabel="Details"
C:\Users\Admin\terragest\src\app\(private)\dashboard\page.tsx:12 description: "Pilotage des exploitations, terrains et ressources.",
C:\Users\Admin\terragest\src\app\(private)\dashboard\page.tsx:17 description: "Suivi des equipements, maintenance et disponibilite.",
C:\Users\Admin\terragest\src\app\(private)\dashboard\page.tsx:73 Acces rapide aux domaines metier.
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\page.tsx:9 export default async function DepensesDetailPage({
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\page.tsx:9 export default async function DevisDetailPage({
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\page.tsx:9 export default async function EmployesDetailPage({
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\exploitations\details\page.tsx:26 export default function ExploitationDetailsPage() {
C:\Users\Admin\terragest\src\app\(private)\exploitations\details\page.tsx:38 title="Terrains"
C:\Users\Admin\terragest\src\app\(private)\exploitations\details\page.tsx:76 subtitle="activité terrain"
C:\Users\Admin\terragest\src\app\(private)\exploitations\details\page.tsx:94 Maintenance planifiée
C:\Users\Admin\terragest\src\app\(private)\exploitations\details\page.tsx:98 Workflow maintenance exécuté automatiquement.
C:\Users\Admin\terragest\src\app\(private)\exploitations\details\page.tsx:136 label="Coût maintenance"
C:\Users\Admin\terragest\src\app\(private)\exploitations\[id]\page.tsx:7 type="details"
C:\Users\Admin\terragest\src\app\(private)\exploitations\[id]\page.tsx:8 actionLabel="Details"
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\page.tsx:9 export default async function FacturesDetailPage({
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\page.tsx:1 import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\page.tsx:11 export default async function FournisseursDetailPage({ params }: Props) {
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\page.tsx:12 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\page.tsx:22 return <GenericDetailPage module={erpModule} id={id} />;
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\edit\page.tsx:12 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\page.tsx:9 export default async function IncidentsDetailPage({
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:18 subtitle="Orchestration opérationnelle des interventions terrain."
C:\Users\Admin\terragest\src\app\(private)\interventions\[id]\page.tsx:7 type="details"
C:\Users\Admin\terragest\src\app\(private)\interventions\[id]\page.tsx:8 actionLabel="Details"
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\page.tsx:9 export default async function IntrantsDetailPage({
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\livraisons\page.tsx:9 export default function LivraisonsPage() {
C:\Users\Admin\terragest\src\app\(private)\livraisons\page.tsx:12 (m) => m.metadata.key === "livraisons"
C:\Users\Admin\terragest\src\app\(private)\livraisons\nouveau\page.tsx:9 export default function LivraisonsCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\livraisons\nouveau\page.tsx:12 (m) => m.metadata.key === "livraisons"
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\page.tsx:9 export default async function LivraisonsDetailPage({
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\page.tsx:18 (m) => m.metadata.key === "livraisons"
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\edit\page.tsx:9 export default async function LivraisonsEditPage({
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\edit\page.tsx:18 (m) => m.metadata.key === "livraisons"
C:\Users\Admin\terragest\src\app\(private)\maintenance\page.tsx:6 moduleLabel="Maintenance"
C:\Users\Admin\terragest\src\app\(private)\maintenance\audit\page.tsx:6 moduleLabel="Maintenance"
C:\Users\Admin\terragest\src\app\(private)\maintenance\export\page.tsx:6 moduleLabel="Maintenance"
C:\Users\Admin\terragest\src\app\(private)\maintenance\import\page.tsx:6 moduleLabel="Maintenance"
C:\Users\Admin\terragest\src\app\(private)\maintenance\nouveau\page.tsx:6 moduleLabel="Maintenance"
C:\Users\Admin\terragest\src\app\(private)\maintenance\relations\page.tsx:6 moduleLabel="Maintenance"
C:\Users\Admin\terragest\src\app\(private)\maintenance\workflows\page.tsx:6 moduleLabel="Maintenance"
C:\Users\Admin\terragest\src\app\(private)\maintenance\[id]\page.tsx:6 moduleLabel="Maintenance"
C:\Users\Admin\terragest\src\app\(private)\maintenance\[id]\page.tsx:7 type="details"
C:\Users\Admin\terragest\src\app\(private)\maintenance\[id]\page.tsx:8 actionLabel="Details"
C:\Users\Admin\terragest\src\app\(private)\maintenance\[id]\edit\page.tsx:6 moduleLabel="Maintenance"
C:\Users\Admin\terragest\src\app\(private)\materiels\[id]\page.tsx:7 type="details"
C:\Users\Admin\terragest\src\app\(private)\materiels\[id]\page.tsx:8 actionLabel="Details"
C:\Users\Admin\terragest\src\app\(private)\operations\page.tsx:13 from "@/domains/materiels/store/MaterielsStore";
C:\Users\Admin\terragest\src\app\(private)\operations\page.tsx:16 from "@/domains/interventions/store/InterventionsStore";
C:\Users\Admin\terragest\src\app\(private)\paiements\page.tsx:6 moduleLabel="Paiements"
C:\Users\Admin\terragest\src\app\(private)\paiements\audit\page.tsx:6 moduleLabel="Paiements"
C:\Users\Admin\terragest\src\app\(private)\paiements\export\page.tsx:6 moduleLabel="Paiements"
C:\Users\Admin\terragest\src\app\(private)\paiements\import\page.tsx:6 moduleLabel="Paiements"
C:\Users\Admin\terragest\src\app\(private)\paiements\nouveau\page.tsx:6 moduleLabel="Paiements"
C:\Users\Admin\terragest\src\app\(private)\paiements\relations\page.tsx:6 moduleLabel="Paiements"
C:\Users\Admin\terragest\src\app\(private)\paiements\workflows\page.tsx:6 moduleLabel="Paiements"
C:\Users\Admin\terragest\src\app\(private)\paiements\[id]\page.tsx:6 moduleLabel="Paiements"
C:\Users\Admin\terragest\src\app\(private)\paiements\[id]\page.tsx:7 type="details"
C:\Users\Admin\terragest\src\app\(private)\paiements\[id]\page.tsx:8 actionLabel="Details"
C:\Users\Admin\terragest\src\app\(private)\paiements\[id]\edit\page.tsx:6 moduleLabel="Paiements"
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\page.tsx:9 export default async function ParcellesDetailPage({
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\produits\[id]\page.tsx:1 import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\produits\[id]\page.tsx:3 export default function ProduitDetailPage({
C:\Users\Admin\terragest\src\app\(private)\produits\[id]\page.tsx:8 return <GenericDetailPage moduleKey="produits" id={params.id} />;
C:\Users\Admin\terragest\src\app\(private)\pwa\page.tsx:1 import { PWAInstallButton }
C:\Users\Admin\terragest\src\app\(private)\pwa\page.tsx:2 from "@/features/pwa/components/PWAInstallButton";
C:\Users\Admin\terragest\src\app\(private)\pwa\page.tsx:44 <PWAInstallButton />
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\page.tsx:9 export default async function RecettesDetailPage({
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\page.tsx:9 export default async function RecoltesDetailPage({
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:12 const { module } = await params;
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:20 <main className="p-8">
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:28 </main>
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:33 <main className="p-8">
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:35 </main>
C:\Users\Admin\terragest\src\app\(private)\stocks\[id]\page.tsx:7 type="details"
C:\Users\Admin\terragest\src\app\(private)\stocks\[id]\page.tsx:8 actionLabel="Details"
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\page.tsx:9 export default async function TachesDetailPage({
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\terrains\page.tsx:4 export default function TerrainsPage() {
C:\Users\Admin\terragest\src\app\(private)\terrains\page.tsx:5 return <GenericListPage moduleKey="terrains" />;
C:\Users\Admin\terragest\src\app\(private)\terrains\audit\page.tsx:6 moduleLabel="Terrains"
C:\Users\Admin\terragest\src\app\(private)\terrains\export\page.tsx:6 moduleLabel="Terrains"
C:\Users\Admin\terragest\src\app\(private)\terrains\import\page.tsx:6 moduleLabel="Terrains"
C:\Users\Admin\terragest\src\app\(private)\terrains\nouveau\page.tsx:3 export default function NouveauTerrainPage() {
C:\Users\Admin\terragest\src\app\(private)\terrains\nouveau\page.tsx:4 return <GenericCreatePage moduleKey="terrains" />;
C:\Users\Admin\terragest\src\app\(private)\terrains\relations\page.tsx:6 moduleLabel="Terrains"
C:\Users\Admin\terragest\src\app\(private)\terrains\workflows\page.tsx:6 moduleLabel="Terrains"
C:\Users\Admin\terragest\src\app\(private)\terrains\[id]\page.tsx:1 import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\terrains\[id]\page.tsx:3 export default async function TerrainDetailPage({
C:\Users\Admin\terragest\src\app\(private)\terrains\[id]\page.tsx:8 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\terrains\[id]\page.tsx:11 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\terrains\[id]\page.tsx:12 moduleKey="terrains"
C:\Users\Admin\terragest\src\app\(private)\terrains\[id]\edit\page.tsx:3 export default async function TerrainEditPage({
C:\Users\Admin\terragest\src\app\(private)\terrains\[id]\edit\page.tsx:8 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\terrains\[id]\edit\page.tsx:12 moduleKey="terrains"
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\page.tsx:3 import { GenericDetailPage }
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\page.tsx:4 from "@/components/erp/generic/GenericDetailPage";
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\page.tsx:9 export default async function VehiculesDetailPage({
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\page.tsx:26 <GenericDetailPage
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\edit\page.tsx:15 const { id } = await params;
C:\Users\Admin\terragest\src\app\api\stripe\checkout\route.ts:28 await request.json();
C:\Users\Admin\terragest\src\app\api\stripe\checkout\route.ts:60 await stripe.checkout.sessions
C:\Users\Admin\terragest\src\app\billing\success\page.tsx:33 Paiement rÃ©ussi
C:\Users\Admin\terragest\src\app\invitations\accept\[token]\page.tsx:23 await params;
C:\Users\Admin\terragest\src\app\invitations\accept\[token]\page.tsx:59 await InvitationService.accept(
C:\Users\Admin\terragest\src\app\login\page.tsx:19 const [email, setEmail] =
C:\Users\Admin\terragest\src\app\login\page.tsx:30 email,
C:\Users\Admin\terragest\src\app\login\page.tsx:89 type="email"
C:\Users\Admin\terragest\src\app\login\page.tsx:91 placeholder="Email"
C:\Users\Admin\terragest\src\app\login\page.tsx:93 value={email}
C:\Users\Admin\terragest\src\app\login\page.tsx:96 setEmail(
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:33 await RuntimeBootstrap
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:23 from "@/domains/contrats/store/ContratsStore";
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:35 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:37 domain:
C:\Users\Admin\terragest\src\components\dashboard\AlertsPanel.tsx:2 "Stock faible sur engrais",
C:\Users\Admin\terragest\src\components\dashboard\AlertsPanel.tsx:3 "Maintenance tracteur requise",
C:\Users\Admin\terragest\src\components\dashboard\RecentActivities.tsx:5 "Maintenance matÃ©riel",
C:\Users\Admin\terragest\src\components\dialogs\DeleteButton.tsx:31 await onDelete();
C:\Users\Admin\terragest\src\components\erp\activity\ERPActivityFeed.tsx:11 title: "Maintenance validée",
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIAnomaliesPanel.tsx:2 import type { getERPAISnapshot } from "@/runtime/ai";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIAnomaliesPanel.tsx:4 type Snapshot = ReturnType<typeof getERPAISnapshot>;
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIAnomaliesPanel.tsx:10 export function ERPAIAnomaliesPanel({
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:2 import { getERPAISnapshot } from "@/runtime/ai";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:4 import { ERPAIMetricsGrid } from "./ERPAIMetricsGrid";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:5 import { ERPAIInsightsPanel } from "./ERPAIInsightsPanel";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:6 import { ERPAIRecommendationsPanel } from "./ERPAIRecommendationsPanel";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:7 import { ERPAIAnomaliesPanel } from "./ERPAIAnomaliesPanel";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:8 import { ERPAISearchPanel } from "./ERPAISearchPanel";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:10 export function ERPAIDashboard() {
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:11 const snapshot = getERPAISnapshot();
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:17 title="Enterprise AI Runtime Layer"
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:21 <ERPAIMetricsGrid snapshot={snapshot} />
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:24 <ERPAIInsightsPanel snapshot={snapshot} />
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:25 <ERPAIRecommendationsPanel snapshot={snapshot} />
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:26 <ERPAIAnomaliesPanel snapshot={snapshot} />
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIDashboard.tsx:27 <ERPAISearchPanel snapshot={snapshot} />
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIInsights.tsx:3 export function ERPAIInsights() {
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIInsights.tsx:7 title: "Maintenance prédictive",
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIInsightsPanel.tsx:2 import type { getERPAISnapshot } from "@/runtime/ai";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIInsightsPanel.tsx:4 type Snapshot = ReturnType<typeof getERPAISnapshot>;
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIInsightsPanel.tsx:10 export function ERPAIInsightsPanel({
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIInsightsPanel.tsx:17 AI Insights
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIMetricsGrid.tsx:2 import type { getERPAISnapshot } from "@/runtime/ai";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIMetricsGrid.tsx:4 type Snapshot = ReturnType<typeof getERPAISnapshot>;
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIMetricsGrid.tsx:10 export function ERPAIMetricsGrid({
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIMetricsGrid.tsx:16 <ERPStatCard label="Recommendations" value={snapshot.metrics.recommendations} helper="AI guidance" />
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIRecommendationsPanel.tsx:2 import type { getERPAISnapshot } from "@/runtime/ai";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIRecommendationsPanel.tsx:4 type Snapshot = ReturnType<typeof getERPAISnapshot>;
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIRecommendationsPanel.tsx:10 export function ERPAIRecommendationsPanel({
C:\Users\Admin\terragest\src\components\erp\ai\ERPAISearchPanel.tsx:2 import type { getERPAISnapshot } from "@/runtime/ai";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAISearchPanel.tsx:4 type Snapshot = ReturnType<typeof getERPAISnapshot>;
C:\Users\Admin\terragest\src\components\erp\ai\ERPAISearchPanel.tsx:10 export function ERPAISearchPanel({
C:\Users\Admin\terragest\src\components\erp\ai\index.ts:1 export * from "./ERPAIMetricsGrid";
C:\Users\Admin\terragest\src\components\erp\ai\index.ts:2 export * from "./ERPAIInsightsPanel";
C:\Users\Admin\terragest\src\components\erp\ai\index.ts:3 export * from "./ERPAIRecommendationsPanel";
C:\Users\Admin\terragest\src\components\erp\ai\index.ts:4 export * from "./ERPAIAnomaliesPanel";
C:\Users\Admin\terragest\src\components\erp\ai\index.ts:5 export * from "./ERPAISearchPanel";
C:\Users\Admin\terragest\src\components\erp\ai\index.ts:6 export * from "./ERPAIDashboard";
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:3 export function ERPAuditTrail() {
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:13 action: "Modification workflow maintenance",
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:8 label: "Maintenance préventive déclenchée",
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:28 maintenanceOverdue: true,
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:36 await AutomationRuntimeEngine.runPending();
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitMetricGrid.tsx:19 <ERPStatCard label="Events" value={snapshot.eventsCount} helper="Evenements domaine" />
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx:17 helper: "Evenements domaine declares",
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:55 const failedCount =
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:58 entry.status === "failed"
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:135 Runtime Failures
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:139 {failedCount}
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:189 Failed Jobs
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:193 {metrics.failedJobs}
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:326 Failures : {circuit.failures}
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:497 Failed Jobs
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:501 {metrics.failedJobs}
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:634 Failures : {circuit.failures}
C:\Users\Admin\terragest\src\components\erp\details\EntityDetailsLayout.tsx:1 // src/components/erp/details/EntityDetailsLayout.tsx
C:\Users\Admin\terragest\src\components\erp\details\EntityDetailsLayout.tsx:8 interface EntityDetailsLayoutProps {
C:\Users\Admin\terragest\src\components\erp\details\EntityDetailsLayout.tsx:18 export function EntityDetailsLayout({
C:\Users\Admin\terragest\src\components\erp\details\EntityDetailsLayout.tsx:25 }: EntityDetailsLayoutProps) {
C:\Users\Admin\terragest\src\components\erp\finance\ERPFinancialOverview.tsx:15 label: "Maintenance",
C:\Users\Admin\terragest\src\components\erp\firestore\ERPFirestoreSync.tsx:10 "terrains",
C:\Users\Admin\terragest\src\components\erp\firestore\ERPFirestoreSync.tsx:13 "maintenance",
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:95 const mainFields =
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:180 "ERP BUSINESS RULE VALIDATION FAILED",
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:201 await RuntimeDataBinding.create(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:209 await RuntimeDataBinding.update(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:260 Formulaire métier connecté au binding runtime.
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:285 {mainFields.map((field) => (
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:43 await ERPRelationDataLoader.load(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:235 : field.type === "email"
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:236 ? "email"
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx:20 Controle du formulaire
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx:24 Ce formulaire est genere depuis le schema central du module.
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:11 interface GenericDetailPageProps {
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:18 export function GenericDetailPage({
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:23 }: GenericDetailPageProps) {
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:45 await RuntimeDataBinding.detail(
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:55 "ERP DETAIL LOAD ERROR",
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:71 type="detail"
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:40 await RuntimeDataBinding.detail(runtimeModule, id);
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:42 await RuntimeDataBinding.list(
C:\Users\Admin\terragest\src\components\erp\layout\ERPAppShell.tsx:9 { label: "Terrains", href: "/terrains" },
C:\Users\Admin\terragest\src\components\erp\layout\ERPAppShell.tsx:13 { label: "Maintenance", href: "/maintenance" },
C:\Users\Admin\terragest\src\components\erp\layout\ERPAppShell.tsx:14 { label: "Paiements", href: "/paiements" },
C:\Users\Admin\terragest\src\components\erp\layout\ERPAppShell.tsx:91 <main
C:\Users\Admin\terragest\src\components\erp\layout\ERPAppShell.tsx:97 </main>
C:\Users\Admin\terragest\src\components\erp\layout\ERPCockpitLayout.tsx:23 main: ReactNode;
C:\Users\Admin\terragest\src\components\erp\layout\ERPCockpitLayout.tsx:35 main,
C:\Users\Admin\terragest\src\components\erp\layout\ERPCockpitLayout.tsx:56 <ERPContentGrid main={main} side={side} />
C:\Users\Admin\terragest\src\components\erp\layout\ERPContentGrid.tsx:4 main: ReactNode;
C:\Users\Admin\terragest\src\components\erp\layout\ERPContentGrid.tsx:8 export function ERPContentGrid({ main, side }: ERPContentGridProps) {
C:\Users\Admin\terragest\src\components\erp\layout\ERPContentGrid.tsx:10 return <section>{main}</section>;
C:\Users\Admin\terragest\src\components\erp\layout\ERPContentGrid.tsx:15 <div>{main}</div>
C:\Users\Admin\terragest\src\components\erp\live\ERPLiveEvents.tsx:8 label: "Workflow maintenance exécuté",
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPErrorAnalyticsPanel.tsx:51 "Aucun détail disponible."}
C:\Users\Admin\terragest\src\components\erp\os\ERPSavedViewsPanel.tsx:14 Espaces de travail favoris.
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:13 await seedERPPersistenceRuntime();
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:16 await getERPPersistenceSnapshot();
C:\Users\Admin\terragest\src\components\erp\production\readiness.ts:7 details?: string;
C:\Users\Admin\terragest\src\components\erp\production\readiness.ts:27 details: "Impossible de lire la collection 'settings'.",
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:17 <ERPStatCard label="Events" value={snapshot.events} helper="Domain events" />
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:57 await ERPRelationDataLoader.load(
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:8 target: "Terrains",
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:11 source: "Terrains",
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:20 target: "Maintenance",
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:23 source: "Maintenance",
C:\Users\Admin\terragest\src\components\erp\resilience\ERPQueuePanel.tsx:14 Jobs asynchrones traites par le runtime ERP.
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDeadLetterPanel.tsx:53 failed
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDeadLetterPanel.tsx:64 status: "failed",
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:6 interface ERPRuntimeDetailsProps {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:11 export function ERPRuntimeDetails({
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:14 }: ERPRuntimeDetailsProps) {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:15 const details = ERPModuleBuilder.buildDetails(module);
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:19 title={`Détails ${module.metadata.label}`}
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:20 description="Vue détail générée automatiquement par le Runtime ERP."
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:23 {details.fields.map((field) => (
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:14 title={`Formulaire ${module.metadata.label}`}
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:15 description="Formulaire généré automatiquement par le Runtime ERP."
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:88 queue: "erp-mails",
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:103 module: "paiements",
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:123 event: "PAYMENT_FAILED",
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:11 import { ERPRuntimeDetails } from "./ERPRuntimeDetails";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:20 type?: "list" | "create" | "detail" | "edit" | string;
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:62 {/* FORMULAIRE DE CRÉATION */}
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:70 {/* FORMULAIRE D'ÉDITION */}
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:79 {/* PAGE DE DÉTAIL */}
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:80 {type === "detail" && module && record && (
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:81 <ERPRuntimeDetails
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeQueuesPanel.tsx:13 status: "pending" | "running" | "completed" | "failed";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeQueuesPanel.tsx:39 : status === "failed"
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeRetryPanel.tsx:17 | "failed"
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeModulePage.tsx:16 mode?: "list" | "create" | "edit" | "details";
C:\Users\Admin\terragest\src\components\erp\security\ERPPoliciesPanel.tsx:20 Extrait des regles RBAC par module.
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityAuditPanel.tsx:27 description="Les controles d'acces apparaitront ici."
C:\Users\Admin\terragest\src\components\erp\shell\ErpShell.tsx:18 <main className="flex-1 px-6 py-6 lg:px-8">
C:\Users\Admin\terragest\src\components\erp\shell\ErpShell.tsx:20 </main>
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartPriorityPanel.tsx:25 Actions prioritaires detectees.
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:44 case "details":
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:45 case "detail":
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:46 return "Details";
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:8 | "detail"
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:9 | "details"
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:42 detail: GenericERPTemplate,
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:43 details: GenericERPTemplate,
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsPanel.tsx:45 description="Les metriques tenant apparaitront ici."
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingMetricsGrid.tsx:41 label="Failed"
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingMetricsGrid.tsx:42 value={report.failed}
C:\Users\Admin\terragest\src\components\erp\timeline\ERPEventTimeline.tsx:7 title: "Workflow maintenance exécuté",
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkerQueue.tsx:10 name: "maintenance-worker",
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkersMetricsGrid.tsx:41 label="Failed"
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkersMetricsGrid.tsx:42 value={metrics.failedJobs}
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:43 const availableTransitions = workflow.transitions.filter(
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:115 {availableTransitions.map((transition) => {
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:23 from "@/domains/interventions/store/InterventionsStore";
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:35 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:37 domain:
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:1 // src/components/maintenance/MaintenanceForm.tsx
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:21 MaintenanceStore
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:23 from "@/domains/maintenance/store/MaintenanceStore";
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:25 export function MaintenanceForm() {
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:35 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:37 domain:
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:38 "maintenance",
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:61 MaintenanceStore.add({
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:78 "Maintenance créé",
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:88 `/maintenance/`
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:23 from "@/domains/materiels/store/MaterielsStore";
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:42 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:44 domain:
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:68 await MaterielsStore.add({
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:1 // src/components/materiels/details/MaterielDetails.tsx
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:11 from "@/domains/materiels/store/MaterielsStore";
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:13 import { MaintenanceWorkflowService }
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:14 from "@/domains/maintenance/services/MaintenanceWorkflowService";
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:16 interface MaterielDetailsProps {
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:22 export function MaterielDetails({
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:25 }: MaterielDetailsProps) {
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:32 MaintenanceWorkflowService
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:45 MaintenanceWorkflowService
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:98 Gestion maintenance matériel
C:\Users\Admin\terragest\src\components\shell\EnterpriseAppShell.tsx:39 <main className="
C:\Users\Admin\terragest\src\components\shell\EnterpriseAppShell.tsx:46 </main>
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:21 from "@/domains/stock/store/StockStore";
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:43 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:45 domain:
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:1 // src/components/stock/details/StockDetails.tsx
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:13 from "@/domains/stock/store/StockStore";
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:24 import { EntityDetailsLayout }
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:25 from "@/components/erp/details/EntityDetailsLayout";
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:27 interface StockDetailsProps {
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:33 export function StockDetails({
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:36 }: StockDetailsProps) {
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:67 <EntityDetailsLayout
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:74 Détail du stock ERP
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:177 </EntityDetailsLayout>
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:32 await ProductsRepository.create({
C:\Users\Admin\terragest\src\constants\collections.ts:7 TERRAINS: "terrains",
C:\Users\Admin\terragest\src\constants\routes.ts:7 TERRAINS: "/terrains",
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:47 await executeHooks(
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:60 await publishEvent({
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:68 console.log("DOMAIN EVENT", event);
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:77 `Domain event ${event}`,
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:109 await executeRules(
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:131 await executeHooks(
C:\Users\Admin\terragest\src\core\auth\auth-enterprise-layer.ts:32 user?.email
C:\Users\Admin\terragest\src\core\auth\auth-enterprise-layer.ts:64 await signOut(auth);
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:49 await rule.action(
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:10 TerragestDomainRuntimeBridge,
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:11 } from "@/runtime/domain/TerragestDomainRuntimeBridge";
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:29 await TerragestDomainRuntimeBridge.boot();
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:31 await startWorkerLoop();
C:\Users\Admin\terragest\src\core\circuit-breaker\circuit-breaker-engine.ts:7 failures: number;
C:\Users\Admin\terragest\src\core\circuit-breaker\circuit-breaker-engine.ts:13 lastFailure?: number;
C:\Users\Admin\terragest\src\core\circuit-breaker\circuit-breaker-engine.ts:29 failures: 0,
C:\Users\Admin\terragest\src\core\circuit-breaker\circuit-breaker-engine.ts:55 circuit.lastFailure &&
C:\Users\Admin\terragest\src\core\circuit-breaker\circuit-breaker-engine.ts:57 circuit.lastFailure >
C:\Users\Admin\terragest\src\core\circuit-breaker\circuit-breaker-engine.ts:72 export function registerFailure(
C:\Users\Admin\terragest\src\core\circuit-breaker\circuit-breaker-engine.ts:78 circuit.failures += 1;
C:\Users\Admin\terragest\src\core\circuit-breaker\circuit-breaker-engine.ts:80 circuit.lastFailure =
C:\Users\Admin\terragest\src\core\circuit-breaker\circuit-breaker-engine.ts:84 circuit.failures >=
C:\Users\Admin\terragest\src\core\circuit-breaker\circuit-breaker-engine.ts:97 circuit.failures = 0;
C:\Users\Admin\terragest\src\core\dead-letter\dead-letter-queue.ts:21 status: "failed",
C:\Users\Admin\terragest\src\core\event-bus\event-bus.ts:54 await handler(event);
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:21 "EVENT BUS : maintenance workflow"
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:26 "maintenance-critical-job",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:39 "notification-maintenance-job",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:52 "analytics-maintenance-job",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:71 "Workflow maintenance déclenché via Event Bus",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:110 "Alerte stock faible via Event Bus",
C:\Users\Admin\terragest\src\core\event-store\event-store.ts:82 await replayHandler(
C:\Users\Admin\terragest\src\core\events\domain-events.ts:1 export type ERPDomainEvent = {
C:\Users\Admin\terragest\src\core\events\domain-events.ts:8 export function createDomainEvent(
C:\Users\Admin\terragest\src\core\events\domain-events.ts:9 event: ERPDomainEvent
C:\Users\Admin\terragest\src\core\events\domain-events.ts:12 "ERP DOMAIN EVENT CREATED",
C:\Users\Admin\terragest\src\core\hooks\erp-hooks.ts:62 await hook(context);
C:\Users\Admin\terragest\src\core\hooks\register-hooks.ts:23 "WORKFLOW MAINTENANCE START"
C:\Users\Admin\terragest\src\core\hooks\register-hooks.ts:44 "HOOK ERP : stock faible"
C:\Users\Admin\terragest\src\core\jobs\job-queue.ts:21 | "failed";
C:\Users\Admin\terragest\src\core\jobs\job-worker.ts:30 await new Promise(
C:\Users\Admin\terragest\src\core\jobs\start-worker.ts:18 await executeJob(job);
C:\Users\Admin\terragest\src\core\layout\AppShell.tsx:18 <main className="p-8">
C:\Users\Admin\terragest\src\core\layout\AppShell.tsx:22 </main>
C:\Users\Admin\terragest\src\core\layout\Sidebar.tsx:8 ["Terrains", "/terrains"],
C:\Users\Admin\terragest\src\core\layout\Sidebar.tsx:10 ["Maintenance", "/maintenance"],
C:\Users\Admin\terragest\src\core\metrics\metrics-engine.ts:4 failedJobs: number;
C:\Users\Admin\terragest\src\core\metrics\metrics-engine.ts:19 failedJobs: 0,
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:33 details: (id: string) => string;
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:110 details:
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:112 `${routes?.details ?? `/${key}`}/${id}`,
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:4 | "gestionnaire"
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:39 gestionnaire: [
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:84 gestionnaire: [
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:26 await addDoc(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:37 await getDocs(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:55 await addDoc(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:66 await getDocs(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:84 await addDoc(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:95 await getDocs(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:113 await addDoc(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:124 await getDocs(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:142 await addDoc(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:153 await getDocs(
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:26 "terrains",
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:35 "Terrains de l’exploitation",
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:77 "paiements",
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:86 "Paiements du contrat",
C:\Users\Admin\terragest\src\core\retry\retry-engine.ts:21 job.status = "failed";
C:\Users\Admin\terragest\src\core\retry\retry-engine.ts:24 "failedJobs"
C:\Users\Admin\terragest\src\core\retry\retry-engine.ts:35 status: "failed",
C:\Users\Admin\terragest\src\core\router\worker-router.ts:21 "maintenance"
C:\Users\Admin\terragest\src\core\router\worker-router.ts:24 return "maintenance";
C:\Users\Admin\terragest\src\core\router\worker-router.ts:68 status: "failed",
C:\Users\Admin\terragest\src\core\router\worker-router.ts:89 await worker.execute(job);
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:27 "RULE ACTION : maintenance critique"
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:37 "Workflow maintenance critique déclenché",
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:48 "Détection stock faible",
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:61 "RULE ACTION : stock faible"
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:71 "Alerte stock faible détectée",
C:\Users\Admin\terragest\src\core\rules\rules-engine.ts:49 await rule.evaluate(data);
C:\Users\Admin\terragest\src\core\rules\rules-engine.ts:60 await rule.execute(data);
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:22 | "failed";
C:\Users\Admin\terragest\src\core\schemas\materiels.schema.ts:9 "Gestion des matÃ©riels, Ã©tats et maintenance.",
C:\Users\Admin\terragest\src\core\schemas\materiels.schema.ts:55 value: "maintenance",
C:\Users\Admin\terragest\src\core\schemas\materiels.schema.ts:56 label: "Maintenance",
C:\Users\Admin\terragest\src\core\schemas\schema-registry.ts:2 import { terrainsSchema } from "./terrains.schema";
C:\Users\Admin\terragest\src\core\schemas\schema-registry.ts:7 terrains: terrainsSchema,
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:3 export const terrainsSchema: ERPModuleSchema = {
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:4 module: "terrains",
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:6 title: "Terrains",
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:9 "Gestion des terrains et parcelles.",
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:61 value: "maintenance",
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:62 label: "Maintenance",
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:15 "maintenance",
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:21 value: "maintenance",
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:22 label: "Maintenance",
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:37 "maintenance",
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:90 "failed",
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:101 "failed",
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:114 value: "failed",
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:115 label: "Failed",
C:\Users\Admin\terragest\src\core\throttling\throttling-engine.ts:19 maintenance: {
C:\Users\Admin\terragest\src\core\transactions\business-transaction-engine.ts:34 await step.execute();
C:\Users\Admin\terragest\src\core\transitions\transition-engine.ts:40 status: "failed",
C:\Users\Admin\terragest\src\core\worker-loop\worker-loop.ts:42 `Traitement job ${job.name}`,
C:\Users\Admin\terragest\src\core\worker-loop\worker-loop.ts:45 await routeJob(job);
C:\Users\Admin\terragest\src\core\worker-loop\worker-loop.ts:59 job.status = "failed";
C:\Users\Admin\terragest\src\core\worker-loop\worker-loop.ts:62 await retryJob(job);
C:\Users\Admin\terragest\src\core\worker-loop\worker-loop.ts:84 await processJob(job);
C:\Users\Admin\terragest\src\core\workers\maintenance-worker.ts:9 export async function executeMaintenanceWorker(
C:\Users\Admin\terragest\src\core\workers\maintenance-worker.ts:14 action: "maintenance-worker",
C:\Users\Admin\terragest\src\core\workers\maintenance-worker.ts:20 `Maintenance worker exécuté : ${job.name}`,
C:\Users\Admin\terragest\src\core\workers\maintenance-worker.ts:24 "MAINTENANCE WORKER",
C:\Users\Admin\terragest\src\core\workers\register-workers.ts:18 executeMaintenanceWorker,
C:\Users\Admin\terragest\src\core\workers\register-workers.ts:19 } from "@/core/workers/maintenance-worker";
C:\Users\Admin\terragest\src\core\workers\register-workers.ts:44 type: "maintenance",
C:\Users\Admin\terragest\src\core\workers\register-workers.ts:46 executeMaintenanceWorker,
C:\Users\Admin\terragest\src\core\workers\worker-registry.ts:9 | "maintenance"
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:8 | "failed";
C:\Users\Admin\terragest\src\data-platform\etl\ETLPipeline.ts:21 await DataWarehouseService.store(
C:\Users\Admin\terragest\src\data-platform\services\DataOrchestrationService.ts:19 await ETLPipeline.process(
C:\Users\Admin\terragest\src\domains\contrats\store\ContratsStore.ts:1 // src/domains/contrats/store/ContratsStore.ts
C:\Users\Admin\terragest\src\domains\interventions\store\InterventionsStore.ts:1 // src/domains/interventions/store/InterventionsStore.ts
C:\Users\Admin\terragest\src\domains\maintenance\services\MaintenanceWorkflowService.ts:1 // src/domains/maintenance/services/MaintenanceWorkflowService.ts
C:\Users\Admin\terragest\src\domains\maintenance\services\MaintenanceWorkflowService.ts:4 from "@/domains/materiels/store/MaterielsStore";
C:\Users\Admin\terragest\src\domains\maintenance\services\MaintenanceWorkflowService.ts:7 from "@/domains/interventions/store/InterventionsStore";
C:\Users\Admin\terragest\src\domains\maintenance\services\MaintenanceWorkflowService.ts:9 export class MaintenanceWorkflowService {
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:1 // src/domains/maintenance/store/MaintenanceStore.ts
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:3 export interface MaintenanceTimelineEntry {
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:12 export interface MaintenanceItem {
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:21 MaintenanceTimelineEntry[];
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:24 class MaintenanceStoreManager {
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:27 MaintenanceItem[] = [];
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:30 item: MaintenanceItem
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:86 export const MaintenanceStore =
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:87 new MaintenanceStoreManager();
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:1 // src/domains/materiels/repositories/MaterielsRepository.ts
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:11 from "@/domains/materiels/store/MaterielsStore";
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:1 // src/domains/materiels/store/MaterielsStore.ts
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:6 from "@/domains/materiels/repositories/MaterielsRepository";
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:28 await materielsRepository
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:65 await materielsRepository
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:107 await materielsRepository
C:\Users\Admin\terragest\src\domains\paiement\events\PaiementEvents.ts:1 // src/domains/paiement/events/PaiementEvents.ts
C:\Users\Admin\terragest\src\domains\paiement\events\PaiementEvents.ts:3 export const PaiementEvents = {
C:\Users\Admin\terragest\src\domains\paiement\events\PaiementEvents.ts:6 "paiement.created",
C:\Users\Admin\terragest\src\domains\paiement\events\PaiementEvents.ts:9 "paiement.updated",
C:\Users\Admin\terragest\src\domains\paiement\events\PaiementEvents.ts:12 "paiement.deleted",
C:\Users\Admin\terragest\src\domains\paiement\events\PaiementEvents.ts:15 "paiement.validated",
C:\Users\Admin\terragest\src\domains\paiement\events\PaiementEvents.ts:18 "paiement.approved"
C:\Users\Admin\terragest\src\domains\paiement\rules\PaiementValidationRule.ts:1 // src/domains/paiement/rules/PaiementValidationRule.ts
C:\Users\Admin\terragest\src\domains\paiement\rules\PaiementValidationRule.ts:9 export const PaiementValidationRule =
C:\Users\Admin\terragest\src\domains\paiement\rules\PaiementValidationRule.ts:13 "paiement-validation",
C:\Users\Admin\terragest\src\domains\paiement\rules\PaiementValidationRule.ts:15 domain:
C:\Users\Admin\terragest\src\domains\paiement\rules\PaiementValidationRule.ts:16 "paiement",
C:\Users\Admin\terragest\src\domains\paiement\rules\PaiementValidationRule.ts:32 "[RULE] paiement validation",
C:\Users\Admin\terragest\src\domains\paiement\rules\registerPaiementRules.ts:1 // src/domains/paiement/rules/registerPaiementRules.ts
C:\Users\Admin\terragest\src\domains\paiement\rules\registerPaiementRules.ts:6 import { PaiementValidationRule }
C:\Users\Admin\terragest\src\domains\paiement\rules\registerPaiementRules.ts:7 from "@/domains/paiement/rules/PaiementValidationRule";
C:\Users\Admin\terragest\src\domains\paiement\rules\registerPaiementRules.ts:9 export function registerPaiementRules() {
C:\Users\Admin\terragest\src\domains\paiement\rules\registerPaiementRules.ts:13 PaiementValidationRule
C:\Users\Admin\terragest\src\domains\paiement\services\PaiementService.ts:1 // src/domains/paiement/services/PaiementService.ts
C:\Users\Admin\terragest\src\domains\paiement\services\PaiementService.ts:6 export const PaiementService =
C:\Users\Admin\terragest\src\domains\paiement\services\PaiementService.ts:8 "paiement"
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:1 // src/domains/paiement/workflows/PaiementWorkflow.ts
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:9 export function registerPaiementWorkflow() {
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:13 "paiement",
C:\Users\Admin\terragest\src\domains\stock\rules\PreventNegativeStockRule.ts:1 // src/domains/stock/rules/PreventNegativeStockRule.ts
C:\Users\Admin\terragest\src\domains\stock\rules\PreventNegativeStockRule.ts:17 domain:
C:\Users\Admin\terragest\src\domains\stock\rules\registerStockRules.ts:1 // src/domains/stock/rules/registerStockRules.ts
C:\Users\Admin\terragest\src\domains\stock\rules\registerStockRules.ts:7 from "@/domains/stock/rules/PreventNegativeStockRule";
C:\Users\Admin\terragest\src\domains\stock\services\StockService.ts:1 // src/domains/stock/services/StockService.ts
C:\Users\Admin\terragest\src\domains\stock\services\StockService.ts:15 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\domains\stock\services\StockService.ts:17 domain: "stock",
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:1 // src/domains/stock/store/StockStore.ts
C:\Users\Admin\terragest\src\enums\RoleUtilisateur.ts:5 GESTIONNAIRE = "GESTIONNAIRE",
C:\Users\Admin\terragest\src\features\alerts\services\AlertService.ts:42 "Stock faible",
C:\Users\Admin\terragest\src\features\alerts\services\AlertService.ts:44 `${product.nom} faible stock`,
C:\Users\Admin\terragest\src\features\analytics\components\KpiBarChart.tsx:9 ResponsiveContainer,
C:\Users\Admin\terragest\src\features\analytics\components\KpiBarChart.tsx:48 <ResponsiveContainer
C:\Users\Admin\terragest\src\features\analytics\components\KpiBarChart.tsx:65 </ResponsiveContainer>
C:\Users\Admin\terragest\src\features\analytics\components\KpiLineChart.tsx:9 ResponsiveContainer,
C:\Users\Admin\terragest\src\features\analytics\components\KpiLineChart.tsx:48 <ResponsiveContainer
C:\Users\Admin\terragest\src\features\analytics\components\KpiLineChart.tsx:68 </ResponsiveContainer>
C:\Users\Admin\terragest\src\features\analytics\components\KpiPieChart.tsx:7 ResponsiveContainer,
C:\Users\Admin\terragest\src\features\analytics\components\KpiPieChart.tsx:55 <ResponsiveContainer
C:\Users\Admin\terragest\src\features\analytics\components\KpiPieChart.tsx:95 </ResponsiveContainer>
C:\Users\Admin\terragest\src\features\analytics\components\ProductsCategoryChart.tsx:7 ResponsiveContainer,
C:\Users\Admin\terragest\src\features\analytics\components\ProductsCategoryChart.tsx:78 <ResponsiveContainer width="100%" height={280}>
C:\Users\Admin\terragest\src\features\analytics\components\ProductsCategoryChart.tsx:98 </ResponsiveContainer>
C:\Users\Admin\terragest\src\features\analytics\components\StockValueChart.tsx:9 ResponsiveContainer,
C:\Users\Admin\terragest\src\features\analytics\components\StockValueChart.tsx:60 <ResponsiveContainer width="100%" height={280}>
C:\Users\Admin\terragest\src\features\analytics\components\StockValueChart.tsx:73 </ResponsiveContainer>
C:\Users\Admin\terragest\src\features\audit\services\AuditService.ts:45 await getDocs(q);
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:20 const [email,
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:21 setEmail] =
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:45 await AuthService.login(
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:46 email,
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:59 "Email ou mot de passe incorrect"
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:92 placeholder="Email"
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:93 value={email}
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:95 setEmail(
C:\Users\Admin\terragest\src\features\auth\services\AuthService.ts:5 signInWithEmailAndPassword,
C:\Users\Admin\terragest\src\features\auth\services\AuthService.ts:24 email: string,
C:\Users\Admin\terragest\src\features\auth\services\AuthService.ts:30 return signInWithEmailAndPassword(
C:\Users\Admin\terragest\src\features\auth\services\AuthService.ts:34 email,
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:51 return await
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:60 return await
C:\Users\Admin\terragest\src\features\billing\types\BillingSubscription.ts:17 terrainsMax: number;
C:\Users\Admin\terragest\src\features\dashboard\widgets\DashboardActivityFeed.tsx:9 "Stock faible dÃ©tectÃ©",
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:79 proprietaire:
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:80 exploitation.proprietaire,
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:103 await ExploitationsRepository.update(
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:251 placeholder="Propriétaire"
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:253 "proprietaire"
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationForm.tsx:65 await ExploitationsService.create(
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:79 await getDocs(q);
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:151 await getDocs(q);
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationRepository.ts:38 const snapshot = await getDocs(q);
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:92 const constraints = [
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:110 constraints.push(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:125 ...constraints
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:39 await getDocs(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:67 await getDoc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:99 await updateDoc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:115 await deleteDoc(
C:\Users\Admin\terragest\src\features\exploitations\schemas\ExploitationSchema.ts:30 proprietaire:
C:\Users\Admin\terragest\src\features\exploitations\types\Exploitation.ts:18 proprietaire: string;
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:9 from "../domain/Fournisseurs";
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:18 from "../domain/Fournisseurs";
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:23 from "../domain/FournisseursRepository";
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:35 await getDocs(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:58 await getDoc(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:106 await updateDoc(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:122 await deleteDoc(
C:\Users\Admin\terragest\src\features\fournisseurs\runtime\EnterpriseFournisseursFlow.ts:18 await this.orchestrator.emit(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:39 await getDocs(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:67 await getDoc(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:99 await updateDoc(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:115 await deleteDoc(
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:13 const [email, setEmail] =
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:25 await InvitationService.create({
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:26 email,
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:40 setEmail("");
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:68 type="email"
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:69 placeholder="Email"
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:70 value={email}
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:72 setEmail(
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:16 if (!invitation.email) {
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:19 "Email obligatoire"
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:23 return await
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:33 return await
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:49 await InvitationsRepository.getAll()
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:86 await MembershipsRepository.create({
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:97 await InvitationsRepository.update(
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:109 return await
C:\Users\Admin\terragest\src\features\invitations\types\Invitation.ts:18 email: string;
C:\Users\Admin\terragest\src\features\livraisons\livraisons.feature.ts:6 export const LivraisonsFeature:
C:\Users\Admin\terragest\src\features\livraisons\livraisons.feature.ts:10 "livraisons",
C:\Users\Admin\terragest\src\features\livraisons\livraisons.feature.ts:13 "Livraisons",
C:\Users\Admin\terragest\src\features\livraisons\livraisons.feature.ts:22 "/livraisons",
C:\Users\Admin\terragest\src\features\materiels\analytics\MaterielAnalytics.ts:12 maintenances: 0,
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:15 from "../domain/Materiel";
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:39 await getDocs(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:67 await getDoc(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:99 await updateDoc(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:115 await deleteDoc(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:39 await getDocs(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:67 await getDoc(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:99 await updateDoc(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:115 await deleteDoc(
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:123 await this.workflowExecutor.execute(
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:128 await this.orchestrator.emit(
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:146 await this.automationRunner.run(
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:160 await this.ruleExecutor.execute(
C:\Users\Admin\terragest\src\features\materiels\runtime\MaterielRuntimeHook.ts:17 await this.runtime.publish(
C:\Users\Admin\terragest\src\features\materiels\runtime\simulateEnterpriseMaterielFlow.ts:11 await flow.create({
C:\Users\Admin\terragest\src\features\materiels\workflows\MaterielMaintenanceWorkflow.ts:1 export class MaterielMaintenanceWorkflow {
C:\Users\Admin\terragest\src\features\materiels\workflows\MaterielMaintenanceWorkflow.ts:6 "Materiel maintenance workflow"
C:\Users\Admin\terragest\src\features\memberships\services\MembershipService.ts:27 return await
C:\Users\Admin\terragest\src\features\memberships\services\MembershipService.ts:35 return await
C:\Users\Admin\terragest\src\features\mouvements\repositories\MouvementRepository.ts:43 const snapshot = await getDocs(q);
C:\Users\Admin\terragest\src\features\mouvements\services\MouvementService.ts:11 await MouvementRepository.create(data);
C:\Users\Admin\terragest\src\features\mouvements\services\MouvementService.ts:13 await StockService.applyMouvement(
C:\Users\Admin\terragest\src\features\mouvements\types\Mouvement.ts:25 commentaire: string;
C:\Users\Admin\terragest\src\features\notifications\hooks\useNotifications.ts:29 await NotificationService
C:\Users\Admin\terragest\src\features\notifications\services\createStockAlert.ts:10 await NotificationService.create({
C:\Users\Admin\terragest\src\features\notifications\services\createStockAlert.ts:13 "Stock faible",
C:\Users\Admin\terragest\src\features\notifications\services\createStockAlert.ts:16 `Le stock du produit ${productName} est faible.`,
C:\Users\Admin\terragest\src\features\notifications\services\NotificationService.ts:11 "Stock faible",
C:\Users\Admin\terragest\src\features\notifications\services\NotificationService.ts:14 "Le stock engrais est faible.",
C:\Users\Admin\terragest\src\features\observability\components\AuditTable.tsx:33 Audit Trail
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:29 await AuditService
C:\Users\Admin\terragest\src\features\observability\widgets\DeadLetterPanel.tsx:20 Failed workflows will appear here.
C:\Users\Admin\terragest\src\features\observability\widgets\live\DeadLetterFeed.tsx:25 Failed runtime events
C:\Users\Admin\terragest\src\features\offline\components\OfflineSyncCard.tsx:32 await SyncService.sync();
C:\Users\Admin\terragest\src\features\organisations\repositories\OrganisationRepository.ts:25 const snapshot = await getDocs(
C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts:28 await getDocs(
C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts:44 await getDoc(
C:\Users\Admin\terragest\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx:22 await OrganizationAnalyticsService
C:\Users\Admin\terragest\src\features\organization-analytics\components\PlanUsageCard.tsx:22 await OrganizationAnalyticsService
C:\Users\Admin\terragest\src\features\organizations\services\OrganizationService.ts:20 return await
C:\Users\Admin\terragest\src\features\organizations\services\OrganizationService.ts:28 return await
C:\Users\Admin\terragest\src\features\payments\components\CheckoutButton.tsx:33 await PaymentService
C:\Users\Admin\terragest\src\features\payments\services\PaymentService.ts:13 await fetch(
C:\Users\Admin\terragest\src\features\payments\services\PaymentService.ts:30 await response.json();
C:\Users\Admin\terragest\src\features\platform\components\navigation\EnterpriseSidebar.tsx:8 "Terrains",
C:\Users\Admin\terragest\src\features\platform\workspace\ConnectedEnterpriseWorkspace.tsx:34 <main
C:\Users\Admin\terragest\src\features\platform\workspace\ConnectedEnterpriseWorkspace.tsx:42 </main>
C:\Users\Admin\terragest\src\features\platform\workspace\EnterpriseWorkspace.tsx:34 <main
C:\Users\Admin\terragest\src\features\platform\workspace\EnterpriseWorkspace.tsx:42 </main>
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:61 await ProductsRepository.update(
C:\Users\Admin\terragest\src\features\produits\components\ProductForm.tsx:36 await ProductService.create({
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:69 await ProductsRepository.delete(
C:\Users\Admin\terragest\src\features\produits\repositories\ProduitRepository.ts:25 prixUnitaire: 0,
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:39 await getDocs(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:67 await getDoc(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:99 await updateDoc(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:115 await deleteDoc(
C:\Users\Admin\terragest\src\features\produits\services\ProductService.ts:27 return await ProductsRepository.create(
C:\Users\Admin\terragest\src\features\produits\services\ProductService.ts:34 return await ProductsRepository.getAll();
C:\Users\Admin\terragest\src\features\produits\types\Produit.ts:16 prixUnitaire: number;
C:\Users\Admin\terragest\src\features\pwa\components\PWAInstallButton.tsx:8 export const PWAInstallButton =
C:\Users\Admin\terragest\src\features\pwa\components\PWAInstallButton.tsx:49 await deferredPrompt.userChoice;
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:41 const snapshot = await getDocs(q);
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:60 await updateDoc(ref, {
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:73 const snapshot = await getDoc(ref);
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:32 const snapshot = await getDoc(
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:93 await getDocs(q);
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:50 await getDocs(
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:75 await getDoc(
C:\Users\Admin\terragest\src\features\superadmin\services\SuperAdminService.ts:17 ] = await Promise.all([
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:23 await TeamService.getMembers();
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:38 await TeamService.removeMember(
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:50 await TeamService.updateRole(
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:14 return await
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:22 return await
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:33 return await
C:\Users\Admin\terragest\src\features\terrains\terrains.feature.ts:6 export const TerrainsFeature:
C:\Users\Admin\terragest\src\features\terrains\terrains.feature.ts:10 "terrains",
C:\Users\Admin\terragest\src\features\terrains\terrains.feature.ts:13 "Terrains",
C:\Users\Admin\terragest\src\features\terrains\terrains.feature.ts:22 "/terrains",
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:11 import { Terrain } from "@/types/terrain";
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:13 const COLLECTION_NAME = "terrains";
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:15 export const TerrainRepository = {
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:17 async create(data: Terrain) {
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:38 const snapshot = await getDocs(q);
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:17 export const TerrainService = {
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:24 COLLECTIONS.TERRAINS
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:32 const snapshot = await getDoc(
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:35 COLLECTIONS.TERRAINS,
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:58 COLLECTIONS.TERRAINS,
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:70 COLLECTIONS.TERRAINS,
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:83 COLLECTIONS.TERRAINS
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:93 await getDocs(q);
C:\Users\Admin\terragest\src\features\terrains\types\Terrain.ts:1 export interface Terrain {
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:13 "Automatisation achat stock faible",
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:23 id: "maintenance",
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:25 nom: "Maintenance Workflow",
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:28 "Gestion maintenance IoT",
C:\Users\Admin\terragest\src\features\workflow-engine\services\ProcessOrchestrator.ts:27 "Trigger maintenance workflow",
C:\Users\Admin\terragest\src\hooks\useRealtime.ts:26 await callback();
C:\Users\Admin\terragest\src\infrastructure\firebase\firebase.ts:16 authDomain:
C:\Users\Admin\terragest\src\infrastructure\firebase\firebase.ts:17 process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:50 await getDocs(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:74 await getDoc(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:104 await updateDoc(
C:\Users\Admin\terragest\src\lib\firebase.ts:11 authDomain:
C:\Users\Admin\terragest\src\lib\firebase.ts:12 process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
C:\Users\Admin\terragest\src\lib\firebase\config.ts:8 authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:23 return await addDoc(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:44 return await updateDoc(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:60 return await deleteDoc(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:72 await getDoc(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:89 await getDocs(
C:\Users\Admin\terragest\src\modules\produits\produit.mock.ts:65 id: "prod_maison",
C:\Users\Admin\terragest\src\modules\produits\produit.mock.ts:66 code: "IMO-MAI-001",
C:\Users\Admin\terragest\src\modules\produits\produit.mock.ts:67 nom: "Maison",
C:\Users\Admin\terragest\src\modules\produits\produit.mock.ts:69 type: "maison",
C:\Users\Admin\terragest\src\modules\produits\produit.model.ts:11 | "mais"
C:\Users\Admin\terragest\src\modules\produits\produit.model.ts:14 | "lait"
C:\Users\Admin\terragest\src\modules\produits\produit.model.ts:17 | "maison"
C:\Users\Admin\terragest\src\modules\produits\produit.model.ts:41 agricole: ["igname", "manioc", "arachide", "mais"],
C:\Users\Admin\terragest\src\modules\produits\produit.model.ts:42 animal: ["viande", "oeufs", "lait"],
C:\Users\Admin\terragest\src\modules\produits\produit.model.ts:44 immobilier: ["maison", "appartement"],
C:\Users\Admin\terragest\src\modules\produits\produit.model.ts:58 mais: "Maïs",
C:\Users\Admin\terragest\src\modules\produits\produit.model.ts:61 lait: "Lait",
C:\Users\Admin\terragest\src\modules\produits\produit.model.ts:64 maison: "Maison",
C:\Users\Admin\terragest\src\platform\audit\AuditTrail.ts:1 // src/platform/audit/AuditTrail.ts
C:\Users\Admin\terragest\src\platform\audit\AuditTrail.ts:3 export class AuditTrail {
C:\Users\Admin\terragest\src\platform\auth\AuthService.ts:12 email: string,
C:\Users\Admin\terragest\src\platform\auth\AuthService.ts:19 email
C:\Users\Admin\terragest\src\platform\auth\AuthService.ts:27 email,
C:\Users\Admin\terragest\src\platform\auth\session\SessionStore.ts:7 email: string;
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:3 import { DomainEvents }
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:4 from "@/platform/events/DomainEvents";
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:32 DomainEvents.subscribe(
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:27 trigger: "paiement.created",
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:40 name: "auto-maintenance-reminder",
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:42 trigger: "maintenance.created",
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:47 "[AUTOMATION] maintenance reminder",
C:\Users\Admin\terragest\src\platform\bootstrap\bootstrapERP.ts:3 import { loadDomains }
C:\Users\Admin\terragest\src\platform\bootstrap\bootstrapERP.ts:4 from "@/platform/bootstrap/loadDomains";
C:\Users\Admin\terragest\src\platform\bootstrap\bootstrapERP.ts:17 await loadDomains();
C:\Users\Admin\terragest\src\platform\bootstrap\loadDomains.ts:1 // src/platform/bootstrap/loadDomains.ts
C:\Users\Admin\terragest\src\platform\bootstrap\loadDomains.ts:3 export async function loadDomains() {
C:\Users\Admin\terragest\src\platform\bootstrap\loadDomains.ts:6 "[DOMAIN LOADER] loading domains"
C:\Users\Admin\terragest\src\platform\bootstrap\loadDomains.ts:9 const domainModules = [
C:\Users\Admin\terragest\src\platform\bootstrap\loadDomains.ts:13 "@/domains/paiement/rules/registerPaiementRules"
C:\Users\Admin\terragest\src\platform\bootstrap\loadDomains.ts:18 "@/domains/paiement/workflows/PaiementWorkflow"
C:\Users\Admin\terragest\src\platform\bootstrap\loadDomains.ts:22 for (const load of domainModules) {
C:\Users\Admin\terragest\src\platform\bootstrap\loadDomains.ts:25 await load();
C:\Users\Admin\terragest\src\platform\bootstrap\loadDomains.ts:44 "[DOMAIN LOADER ERROR]",
C:\Users\Admin\terragest\src\platform\bootstrap\loadDomains.ts:53 "[DOMAIN LOADER] completed"
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:36 TerrainsFeature
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:38 from "@/features/terrains/terrains.feature";
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:132 TerrainsFeature,
C:\Users\Admin\terragest\src\platform\circuit-breaker\CircuitBreaker.ts:5 private failures = 0;
C:\Users\Admin\terragest\src\platform\circuit-breaker\CircuitBreaker.ts:28 await operation();
C:\Users\Admin\terragest\src\platform\circuit-breaker\CircuitBreaker.ts:30 this.failures = 0;
C:\Users\Admin\terragest\src\platform\circuit-breaker\CircuitBreaker.ts:34 this.failures++;
C:\Users\Admin\terragest\src\platform\circuit-breaker\CircuitBreaker.ts:37 "[CIRCUIT BREAKER] failure",
C:\Users\Admin\terragest\src\platform\circuit-breaker\CircuitBreaker.ts:38 this.failures,
C:\Users\Admin\terragest\src\platform\circuit-breaker\CircuitBreaker.ts:43 this.failures >= this.threshold
C:\Users\Admin\terragest\src\platform\circuit-breaker\CircuitBreaker.ts:59 this.failures = 0;
C:\Users\Admin\terragest\src\platform\circuit-breaker\CircuitBreaker.ts:69 getFailures(): number {
C:\Users\Admin\terragest\src\platform\circuit-breaker\CircuitBreaker.ts:71 return this.failures;
C:\Users\Admin\terragest\src\platform\dependencies\ModuleDependencies.ts:6 "terrains"
C:\Users\Admin\terragest\src\platform\dependencies\ModuleDependencies.ts:24 maintenance: [
C:\Users\Admin\terragest\src\platform\dependencies\ModuleDependencies.ts:28 paiements: [
C:\Users\Admin\terragest\src\platform\events\DomainEvents.ts:1 // src/platform/events/DomainEvents.ts
C:\Users\Admin\terragest\src\platform\events\DomainEvents.ts:18 class DomainEventsManager {
C:\Users\Admin\terragest\src\platform\events\DomainEvents.ts:61 await WebhookDispatcher.dispatch(
C:\Users\Admin\terragest\src\platform\events\DomainEvents.ts:66 await BusinessRulesEngine.execute({
C:\Users\Admin\terragest\src\platform\events\DomainEvents.ts:68 domain: "global",
C:\Users\Admin\terragest\src\platform\events\DomainEvents.ts:80 await handler(payload);
C:\Users\Admin\terragest\src\platform\events\DomainEvents.ts:85 export const DomainEvents =
C:\Users\Admin\terragest\src\platform\events\DomainEvents.ts:86 new DomainEventsManager();
C:\Users\Admin\terragest\src\platform\events\EventTypes.ts:8 PAIEMENT_CREATED:
C:\Users\Admin\terragest\src\platform\events\EventTypes.ts:9 "paiement.created",
C:\Users\Admin\terragest\src\platform\events\EventTypes.ts:11 MAINTENANCE_CREATED:
C:\Users\Admin\terragest\src\platform\events\EventTypes.ts:12 "maintenance.created",
C:\Users\Admin\terragest\src\platform\execution\WorkflowScheduler.ts:17 await WorkflowExecutor
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:87 await workflowCircuitBreaker.execute(
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:90 await RetryPolicy.execute(
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:93 await Promise.resolve();
C:\Users\Admin\terragest\src\platform\factories\createModuleService.ts:10 domain: string
C:\Users\Admin\terragest\src\platform\factories\createModuleService.ts:19 await ModuleRuntime.create({
C:\Users\Admin\terragest\src\platform\factories\createModuleService.ts:21 domain,
C:\Users\Admin\terragest\src\platform\factories\createPipelineRule.ts:15 domain: string;
C:\Users\Admin\terragest\src\platform\factories\createPipelineRule.ts:37 domain:
C:\Users\Admin\terragest\src\platform\factories\createPipelineRule.ts:38 options.domain,
C:\Users\Admin\terragest\src\platform\governance\GovernanceContext.ts:9 domain: string;
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:11 import { DomainPermissions }
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:12 from "@/platform/governance/permissions/DomainPermissions";
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:25 context.domain
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:31 `Feature disabled: ${context.domain}`
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:36 DomainPermissions
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:44 `Permission denied: ${context.domain}`
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:54 context.domain,
C:\Users\Admin\terragest\src\platform\governance\permissions\DomainPermissions.ts:1 // src/platform/governance/permissions/DomainPermissions.ts
C:\Users\Admin\terragest\src\platform\governance\permissions\DomainPermissions.ts:8 class DomainPermissionsManager {
C:\Users\Admin\terragest\src\platform\governance\permissions\DomainPermissions.ts:16 context.domain,
C:\Users\Admin\terragest\src\platform\governance\permissions\DomainPermissions.ts:24 export const DomainPermissions =
C:\Users\Admin\terragest\src\platform\governance\permissions\DomainPermissions.ts:25 new DomainPermissionsManager();
C:\Users\Admin\terragest\src\platform\governance\policies\DefaultRuntimePolicy.ts:23 context.domain
C:\Users\Admin\terragest\src\platform\governance\policies\engine\RuntimePoliciesEngine.ts:38 context.domain,
C:\Users\Admin\terragest\src\platform\integrations\registerWebhooks.ts:16 "paiement.created"
C:\Users\Admin\terragest\src\platform\integrations\WebhookDispatcher.ts:31 await Promise.resolve();
C:\Users\Admin\terragest\src\platform\intelligence\AutoHealingService.ts:8 static recoverFailedJobs() {
C:\Users\Admin\terragest\src\platform\intelligence\AutoHealingService.ts:10 const failedJobs =
C:\Users\Admin\terragest\src\platform\intelligence\AutoHealingService.ts:12 .getFailedJobs();
C:\Users\Admin\terragest\src\platform\intelligence\AutoHealingService.ts:14 for (const job of failedJobs) {
C:\Users\Admin\terragest\src\platform\intelligence\OperationalIntelligenceScheduler.ts:24 .recoverFailedJobs();
C:\Users\Admin\terragest\src\platform\intelligence\WorkflowScoringEngine.ts:20 "paiement"
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:14 import { DomainEvents }
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:15 from "@/platform/events/DomainEvents";
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:37 domain:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:38 context.domain,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:50 await RulePipelineRuntime.execute(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:55 domain:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:56 context.domain,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:74 context.domain
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:92 domain:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:93 context.domain,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:107 await DomainEvents.dispatch(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:109 `${context.domain}.created`,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:123 await RulePipelineRuntime.execute(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:128 domain:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:129 context.domain,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:152 domain:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:153 context.domain,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:165 await RulePipelineRuntime.execute(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:170 domain:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:171 context.domain,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:189 context.domain
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:192 await DomainEvents.dispatch(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:194 `${context.domain}.updated`,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:199 await RulePipelineRuntime.execute(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:204 domain:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:205 context.domain,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:228 domain:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:229 context.domain,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:241 await RulePipelineRuntime.execute(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:246 domain:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:247 context.domain,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:265 context.domain
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:268 await DomainEvents.dispatch(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:270 `${context.domain}.deleted`,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:275 await RulePipelineRuntime.execute(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:280 domain:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:281 context.domain,
C:\Users\Admin\terragest\src\platform\modules\types\ModuleContext.ts:8 domain: string;
C:\Users\Admin\terragest\src\platform\policies\engine\PolicyEngine.ts:36 await policy.evaluate(
C:\Users\Admin\terragest\src\platform\policies\rules\MaintenancePolicy.ts:8 MaintenancePolicy:
C:\Users\Admin\terragest\src\platform\policies\rules\MaintenancePolicy.ts:12 "MaintenancePolicy",
C:\Users\Admin\terragest\src\platform\policies\rules\MaintenancePolicy.ts:24 "maintenance"
C:\Users\Admin\terragest\src\platform\resilience\DeadLetterQueue.ts:3 export interface FailedJob {
C:\Users\Admin\terragest\src\platform\resilience\DeadLetterQueue.ts:14 private failedJobs: FailedJob[] = [];
C:\Users\Admin\terragest\src\platform\resilience\DeadLetterQueue.ts:17 job: FailedJob
C:\Users\Admin\terragest\src\platform\resilience\DeadLetterQueue.ts:26 this.failedJobs.push(job);
C:\Users\Admin\terragest\src\platform\resilience\DeadLetterQueue.ts:29 getFailedJobs() {
C:\Users\Admin\terragest\src\platform\resilience\DeadLetterQueue.ts:31 return this.failedJobs;
C:\Users\Admin\terragest\src\platform\resilience\DeadLetterQueue.ts:36 this.failedJobs = [];
C:\Users\Admin\terragest\src\platform\resilience\RetryPolicy.ts:18 await operation();
C:\Users\Admin\terragest\src\platform\rules\registerBusinessRules.ts:12 domain: "stock",
C:\Users\Admin\terragest\src\platform\rules\registerBusinessRules.ts:30 "paiement-validation-rule",
C:\Users\Admin\terragest\src\platform\rules\registerBusinessRules.ts:32 domain: "paiement",
C:\Users\Admin\terragest\src\platform\rules\registerBusinessRules.ts:41 "[RULE] paiement validation",
C:\Users\Admin\terragest\src\platform\rules\core\RuleExecutionContext.ts:5 domain: string;
C:\Users\Admin\terragest\src\platform\rules\engine\BusinessRulesEngine.ts:21 context.domain,
C:\Users\Admin\terragest\src\platform\rules\engine\BusinessRulesEngine.ts:28 context.domain,
C:\Users\Admin\terragest\src\platform\rules\engine\BusinessRulesEngine.ts:35 await rule.execute(
C:\Users\Admin\terragest\src\platform\rules\monitoring\RuleMonitoring.ts:25 static failed(
C:\Users\Admin\terragest\src\platform\rules\monitoring\RuleMonitoring.ts:33 "[RULE FAILED]",
C:\Users\Admin\terragest\src\platform\rules\registry\RuleRegistry.ts:33 domain: string,
C:\Users\Admin\terragest\src\platform\rules\registry\RuleRegistry.ts:41 rule.domain === domain
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:62 rule.domain === context.domain
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:67 context.domain,
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:96 await rule.execute(
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:106 RuleMonitoring.failed(
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:112 "rule.failed",
C:\Users\Admin\terragest\src\platform\rules\types\BusinessRule.ts:12 domain: string;
C:\Users\Admin\terragest\src\platform\rules\types\PipelineRule.ts:14 domain: string;
C:\Users\Admin\terragest\src\platform\runtime\RuntimeBootstrap.ts:4 from "@/domains/materiels/store/MaterielsStore";
C:\Users\Admin\terragest\src\platform\runtime\RuntimeBootstrap.ts:14 await MaterielsStore.load();
C:\Users\Admin\terragest\src\platform\sagas\registerSagas.ts:31 name: "paiement-facture-saga",
C:\Users\Admin\terragest\src\platform\sagas\registerSagas.ts:37 event: "paiement.created",
C:\Users\Admin\terragest\src\platform\sagas\SagaManager.ts:3 import { DomainEvents }
C:\Users\Admin\terragest\src\platform\sagas\SagaManager.ts:4 from "@/platform/events/DomainEvents";
C:\Users\Admin\terragest\src\platform\sagas\SagaManager.ts:37 DomainEvents.subscribe(
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:1 // src/platform/scheduling/DomainQueues.ts
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:8 class DomainQueuesManager {
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:15 domain: string,
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:19 if (!this.queues[domain]) {
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:21 this.queues[domain] = [];
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:24 this.queues[domain]
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:27 this.queues[domain]
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:35 `[DOMAIN QUEUE]
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:36 ${domain}
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:42 domain: string
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:45 return this.queues[domain]
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:55 export const DomainQueues =
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:56 new DomainQueuesManager();
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:24 "paiement"
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:29 role: "MAINTENANCE",
C:\Users\Admin\terragest\src\platform\security\roles\RoleDefinition.ts:4 | "MAINTENANCE"
C:\Users\Admin\terragest\src\platform\timeline\registerTimelineListeners.ts:3 import { DomainEvents }
C:\Users\Admin\terragest\src\platform\timeline\registerTimelineListeners.ts:4 from "@/platform/events/DomainEvents";
C:\Users\Admin\terragest\src\platform\timeline\registerTimelineListeners.ts:11 DomainEvents.subscribe(
C:\Users\Admin\terragest\src\platform\timeline\registerTimelineListeners.ts:28 DomainEvents.subscribe(
C:\Users\Admin\terragest\src\platform\timeline\registerTimelineListeners.ts:29 "paiement.created",
C:\Users\Admin\terragest\src\platform\timeline\registerTimelineListeners.ts:34 entity: "paiement",
C:\Users\Admin\terragest\src\platform\timeline\registerTimelineListeners.ts:36 action: "paiement.created",
C:\Users\Admin\terragest\src\platform\timeline\registerTimelineListeners.ts:45 DomainEvents.subscribe(
C:\Users\Admin\terragest\src\platform\timeline\registerTimelineListeners.ts:46 "maintenance.created",
C:\Users\Admin\terragest\src\platform\timeline\registerTimelineListeners.ts:51 entity: "maintenance",
C:\Users\Admin\terragest\src\platform\timeline\registerTimelineListeners.ts:53 action: "maintenance.created",
C:\Users\Admin\terragest\src\platform\workers\ERPWorker.ts:23 await WorkflowExecutor
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:3 import { DomainEvents }
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:4 from "@/platform/events/DomainEvents";
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:6 import { AuditTrail }
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:7 from "@/platform/audit/AuditTrail";
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:15 "maintenance.created",
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:16 "paiement.created",
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:22 DomainEvents.subscribe(
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:26 AuditTrail.log(
C:\Users\Admin\terragest\src\platform\workflows\ERPNotifications.ts:3 import { DomainEvents }
C:\Users\Admin\terragest\src\platform\workflows\ERPNotifications.ts:4 from "@/platform/events/DomainEvents";
C:\Users\Admin\terragest\src\platform\workflows\ERPNotifications.ts:11 DomainEvents.subscribe(
C:\Users\Admin\terragest\src\platform\workflows\ERPNotifications.ts:12 "maintenance.created",
C:\Users\Admin\terragest\src\platform\workflows\ERPNotifications.ts:16 "Nouvelle maintenance enregistrée"
C:\Users\Admin\terragest\src\platform\workflows\ERPNotifications.ts:21 DomainEvents.subscribe(
C:\Users\Admin\terragest\src\platform\workflows\ERPNotifications.ts:22 "paiement.created",
C:\Users\Admin\terragest\src\platform\workflows\ERPNotifications.ts:26 "Paiement enregistré"
C:\Users\Admin\terragest\src\platform\workflows\ERPNotifications.ts:31 DomainEvents.subscribe(
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:3 import { DomainEvents }
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:4 from "@/platform/events/DomainEvents";
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:8 DomainEvents.subscribe(
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:19 DomainEvents.subscribe(
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:30 DomainEvents.subscribe(
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:31 "paiement.created",
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:35 "[WORKFLOW] paiement.created",
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:8 domain: string;
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:16 domain: string,
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:23 domain
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:28 domain
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:33 domain: string
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:38 domain
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:13 domain: string,
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:23 domain
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:51 entry.domain,
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:23 entry.domain,
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimelineEntry.ts:7 domain: string;
C:\Users\Admin\terragest\src\runtime\production.ts:26 description: "Certaines connexions cloud restent a finaliser.",
C:\Users\Admin\terragest\src\runtime\production.ts:84 frequency: "daily",
C:\Users\Admin\terragest\src\runtime\production.ts:91 frequency: "daily",
C:\Users\Admin\terragest\src\runtime\actions\ERPAction.ts:4 | "details"
C:\Users\Admin\terragest\src\runtime\ai\ERPAISnapshot.ts:1 import { generateERPAIInsights } from "./insights/ERPAIInsightEngine";
C:\Users\Admin\terragest\src\runtime\ai\ERPAISnapshot.ts:2 import { generateERPAIRecommendations } from "./recommendations/ERPAIRecommendationEngine";
C:\Users\Admin\terragest\src\runtime\ai\ERPAISnapshot.ts:3 import { detectERPAIAnomalies } from "./anomalies/ERPAIAnomalyDetector";
C:\Users\Admin\terragest\src\runtime\ai\ERPAISnapshot.ts:5 import { getERPAIAssistantMessages } from "./assistant/ERPAIAssistantEngine";
C:\Users\Admin\terragest\src\runtime\ai\ERPAISnapshot.ts:7 export function getERPAISnapshot() {
C:\Users\Admin\terragest\src\runtime\ai\ERPAISnapshot.ts:9 generateERPAIInsights();
C:\Users\Admin\terragest\src\runtime\ai\ERPAISnapshot.ts:12 generateERPAIRecommendations();
C:\Users\Admin\terragest\src\runtime\ai\ERPAISnapshot.ts:15 detectERPAIAnomalies();
C:\Users\Admin\terragest\src\runtime\ai\ERPAISnapshot.ts:21 getERPAIAssistantMessages();
C:\Users\Admin\terragest\src\runtime\ai\index.ts:1 export * from "./insights/ERPAIInsight";
C:\Users\Admin\terragest\src\runtime\ai\index.ts:2 export * from "./insights/ERPAIInsightEngine";
C:\Users\Admin\terragest\src\runtime\ai\index.ts:4 export * from "./recommendations/ERPAIRecommendation";
C:\Users\Admin\terragest\src\runtime\ai\index.ts:5 export * from "./recommendations/ERPAIRecommendationEngine";
C:\Users\Admin\terragest\src\runtime\ai\index.ts:7 export * from "./anomalies/ERPAIAnomaly";
C:\Users\Admin\terragest\src\runtime\ai\index.ts:8 export * from "./anomalies/ERPAIAnomalyDetector";
C:\Users\Admin\terragest\src\runtime\ai\index.ts:13 export * from "./assistant/ERPAIAssistantMessage";
C:\Users\Admin\terragest\src\runtime\ai\index.ts:14 export * from "./assistant/ERPAIAssistantEngine";
C:\Users\Admin\terragest\src\runtime\ai\index.ts:16 export * from "./ERPAISnapshot";
C:\Users\Admin\terragest\src\runtime\ai\anomalies\ERPAIAnomaly.ts:1 export type ERPAIAnomaly = {
C:\Users\Admin\terragest\src\runtime\ai\anomalies\ERPAIAnomalyDetector.ts:2 import type { ERPAIAnomaly } from "./ERPAIAnomaly";
C:\Users\Admin\terragest\src\runtime\ai\anomalies\ERPAIAnomalyDetector.ts:8 export function detectERPAIAnomalies(): ERPAIAnomaly[] {
C:\Users\Admin\terragest\src\runtime\ai\anomalies\ERPAIAnomalyDetector.ts:10 const anomalies: ERPAIAnomaly[] = [];
C:\Users\Admin\terragest\src\runtime\ai\anomalies\ERPAIAnomalyDetector.ts:14 id: createId("ai_anomaly"),
C:\Users\Admin\terragest\src\runtime\ai\anomalies\ERPAIAnomalyDetector.ts:25 id: createId("ai_anomaly"),
C:\Users\Admin\terragest\src\runtime\ai\assistant\ERPAIAssistantEngine.ts:1 import type { ERPAIAssistantMessage } from "./ERPAIAssistantMessage";
C:\Users\Admin\terragest\src\runtime\ai\assistant\ERPAIAssistantEngine.ts:7 export function getERPAIAssistantMessages(): ERPAIAssistantMessage[] {
C:\Users\Admin\terragest\src\runtime\ai\assistant\ERPAIAssistantEngine.ts:10 id: createId("ai_msg"),
C:\Users\Admin\terragest\src\runtime\ai\assistant\ERPAIAssistantEngine.ts:12 content: "AI Runtime Assistant initialise sur le contexte ERP Terragest.",
C:\Users\Admin\terragest\src\runtime\ai\assistant\ERPAIAssistantEngine.ts:16 id: createId("ai_msg"),
C:\Users\Admin\terragest\src\runtime\ai\assistant\ERPAIAssistantMessage.ts:1 export type ERPAIAssistantMessage = {
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsight.ts:1 export type ERPAIInsightLevel =
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsight.ts:6 export type ERPAIInsight = {
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsight.ts:11 level: ERPAIInsightLevel;
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsightEngine.ts:3 import type { ERPAIInsight } from "./ERPAIInsight";
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsightEngine.ts:9 export function generateERPAIInsights(): ERPAIInsight[] {
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsightEngine.ts:15 id: createId("ai_insight"),
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsightEngine.ts:24 id: createId("ai_insight"),
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsightEngine.ts:33 id: createId("ai_insight"),
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendation.ts:1 export type ERPAIRecommendation = {
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts:1 import type { ERPAIRecommendation } from "./ERPAIRecommendation";
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts:7 export function generateERPAIRecommendations(): ERPAIRecommendation[] {
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts:10 id: createId("ai_reco"),
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts:19 id: createId("ai_reco"),
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts:28 id: createId("ai_reco"),
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:32 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:40 module: "paiements",
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:30 await automation.handler();
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:20 "daily-stock-check",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:23 "Daily Stock Check",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:38 await RuntimeNotificationEngine
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:83 await RuntimeNotificationEngine
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:6 ERPDomainEvent,
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:7 } from "@/runtime/events/ERPDomainEvent";
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:32 event: ERPDomainEvent
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:18 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:21 description: "Notification workflow maintenance.",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:26 module: "paiements",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:29 description: "Audit creation paiement.",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:2 ERPDomainEventType,
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:3 } from "@/runtime/events/ERPDomainEvent";
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:18 trigger: ERPDomainEventType;
C:\Users\Admin\terragest\src\runtime\automation\hooks\ERPRuntimeHooks.ts:2 ERPDomainEvent,
C:\Users\Admin\terragest\src\runtime\automation\hooks\ERPRuntimeHooks.ts:3 } from "@/runtime/events/ERPDomainEvent";
C:\Users\Admin\terragest\src\runtime\automation\hooks\ERPRuntimeHooks.ts:6 (event: ERPDomainEvent) => void;
C:\Users\Admin\terragest\src\runtime\automation\hooks\ERPRuntimeHooks.ts:21 event: ERPDomainEvent
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:47 "[AUTOMATION] Maintenance workflow triggered",
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:43 await automation.action({
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:26 await AutomationRuntimeExecutor.execute(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:28 await AutomationRuntimeExecutor.executeAction(action, job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:43 job.status = "failed";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:18 key: "materiel-maintenance-overdue",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:20 label: "Maintenance materiel en retard",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:21 description: "Cree une priorite lorsque la maintenance est depassee.",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:23 trigger: { type: "maintenance_overdue" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:25 { type: "alert", label: "Creer incident maintenance" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:43 key: "terrain-control-reminder",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:44 moduleKey: "terrains",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:45 label: "Controle terrain recommande",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:46 description: "Cree un rappel lorsqu'un terrain necessite un controle.",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:50 { type: "task", label: "Creer tache controle terrain" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:51 { type: "notify", label: "Notifier responsable terrain" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:79 key: "maintenance-critical-alert",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:80 moduleKey: "maintenance",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:81 label: "Maintenance critique",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:82 description: "Declenche un incident lorsqu'une maintenance devient critique.",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:84 trigger: { type: "maintenance_overdue" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:87 { type: "workflow", label: "Lancer workflow maintenance" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:98 { type: "notify", label: "Notifier gestionnaire contrat" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:103 key: "paiement-validation-reminder",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:104 moduleKey: "paiements",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:105 label: "Relance validation paiement",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:106 description: "Relance les paiements en attente de validation.",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:110 { type: "notify", label: "Notifier valideur paiement" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:111 { type: "audit", label: "Tracer relance paiement" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:51 if (rule.trigger.type === "maintenance_overdue") {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:52 return payload.maintenanceOverdue === true;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:4 | "maintenance_overdue"
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:12 | "failed"
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:28 import { registerDomainEvents }
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:29 from "./registerDomainEvents";
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:66 registerDomainEvents(
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:13 registerDomainEvents
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:15 from "./registerDomainEvents";
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:30 registerDomainEvents(
C:\Users\Admin\terragest\src\runtime\bootstrap\registerDomainEvents.ts:10 registerDomainEvents(
C:\Users\Admin\terragest\src\runtime\bootstrap\registerDomainEvents.ts:26 "[Runtime] domain events registered"
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:4 import { MaterielMaintenanceWorkflow }
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:5 from "../../features/materiels/workflows/MaterielMaintenanceWorkflow";
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:13 "materiel-maintenance",
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:14 new MaterielMaintenanceWorkflow()
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:9 await bootstrapEnterpriseRuntime();
C:\Users\Admin\terragest\src\runtime\bootstrap\simulateBreakdown.ts:12 await initializeRuntime();
C:\Users\Admin\terragest\src\runtime\bootstrap\simulateBreakdownFlow.ts:19 await bootstrapEnterpriseRuntime();
C:\Users\Admin\terragest\src\runtime\bootstrap\startEnterpriseRuntime.ts:9 await bootstrapEnterpriseRuntime();
C:\Users\Admin\terragest\src\runtime\bus\RuntimeEventBus.ts:18 await handler(payload);
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:15 // STOCK FAIBLE
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:37 await RuntimeNotificationEngine
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:47 "Stock faible",
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:50 `Le stock ${payload.produit} est faible.`,
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:59 // MAINTENANCE CRITIQUE
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:64 "maintenance-critical",
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:67 "maintenance",
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:70 "maintenance.created",
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:81 await RuntimeNotificationEngine
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:85 "maintenance.critical",
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:88 "maintenance",
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:91 "Maintenance critique",
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:94 `Maintenance critique sur ${payload.materiel}.`,
C:\Users\Admin\terragest\src\runtime\business-rules\RuntimeBusinessRulesEngine.ts:43 await rule.action(
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:31 domain: string;
C:\Users\Admin\terragest\src\runtime\core\RuntimeDeadLetterQueue.ts:11 failedAt: string;
C:\Users\Admin\terragest\src\runtime\core\RuntimeExecutionRegistry.ts:13 | "failed";
C:\Users\Admin\terragest\src\runtime\core\RuntimeExecutionRegistry.ts:49 getFailedExecutions() {
C:\Users\Admin\terragest\src\runtime\core\RuntimeExecutionRegistry.ts:53 execution.status === "failed"
C:\Users\Admin\terragest\src\runtime\core\RuntimeLifecycle.ts:35 fail() {
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:95 failedAt:
C:\Users\Admin\terragest\src\runtime\core\RuntimeQueueRegistry.ts:13 | "failed";
C:\Users\Admin\terragest\src\runtime\core\RuntimeQueueRegistry.ts:53 getFailedJobs() {
C:\Users\Admin\terragest\src\runtime\core\RuntimeQueueRegistry.ts:57 job.status === "failed"
C:\Users\Admin\terragest\src\runtime\core\RuntimeRetryRegistry.ts:12 | "failed"
C:\Users\Admin\terragest\src\runtime\core\RuntimeRetryRegistry.ts:33 getFailedRetries() {
C:\Users\Admin\terragest\src\runtime\core\RuntimeRetryRegistry.ts:37 job.status === "failed"
C:\Users\Admin\terragest\src\runtime\core\executors\RuntimeExecutor.ts:23 await handler(event);
C:\Users\Admin\terragest\src\runtime\core\services\RuntimePublisher.ts:30 await this.publisher.publish(
C:\Users\Admin\terragest\src\runtime\core\services\RuntimeSubscriber.ts:25 await handler(
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:8 const data = await RuntimeMutationEngine.create(module, payload);
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:24 const data = await RuntimeMutationEngine.update(module, id, payload);
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:36 await RuntimeMutationEngine.delete(module, id);
C:\Users\Admin\terragest\src\runtime\data\analytics\PersistentAnalyticsEngine.ts:17 await this.repository.save({
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:19 static async detail(
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:23 return FirestoreRuntimeQuery.detail(
C:\Users\Admin\terragest\src\runtime\domain\index.ts:1 export * from "./models/TerragestDomainModel";
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:1 import * as TerragestDomainModel from "./models/TerragestDomainModel";
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:23 } from "@/runtime/domain/adapters/TerragestBusinessRuleAdapter";
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:35 export type TerragestDomainRuntimeBridgeDependencies = {
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:128 domain: "terragest",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:171 export function createTerragestDomainRuntimeBridge(
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:172 dependencies: TerragestDomainRuntimeBridgeDependencies = {}
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:193 "TerragestDomainModel",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:194 TerragestDomainModel
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:215 function registerDomainModel() {
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:269 registerDomainModel();
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:282 "TERRAGEST_DOMAIN_RUNTIME_BRIDGE_BOOTED",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:286 await resolvedDependencies.observabilityEngine?.log?.({
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:287 type: "domain-runtime",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:289 message: "Terragest domain connected to ERP runtime.",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:293 await resolvedDependencies.notificationEngine?.notify?.({
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:297 message: "Domaine Terragest connecté au runtime ERP.",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:302 domain: "terragest",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:310 domain: "terragest",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:315 registerDomainModel,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:322 export const TerragestDomainRuntimeBridge =
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:323 createTerragestDomainRuntimeBridge();
C:\Users\Admin\terragest\src\runtime\domain\adapters\TerragestBusinessRuleAdapter.ts:24 * TERRAIN RULES
C:\Users\Admin\terragest\src\runtime\domain\adapters\TerragestBusinessRuleAdapter.ts:26 case "TERRAIN_SURFACE_POSITIVE":
C:\Users\Admin\terragest\src\runtime\domain\adapters\TerragestBusinessRuleAdapter.ts:48 * CAMPAIGN RULES
C:\Users\Admin\terragest\src\runtime\domain\adapters\TerragestBusinessRuleAdapter.ts:50 case "CAMPAIGN_END_AFTER_START": {
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:1 export const TerragestDomainModel = {
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:6 "proprietaireTerrains",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:12 "email",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:20 terrains: {
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:21 label: "Terrains",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:24 "proprietaireId",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:35 "proprietaireId",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:44 description: "Contrats liÃ©s aux terrains.",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:46 "terrainId",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:48 "paiements",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:51 "terrainId",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:66 "terrainId",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:72 "paiements",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:79 "terrainId",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:101 "paiements",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:120 "terrainId",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:127 "paiements",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:133 "terrainId",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:233 "maintenances",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:246 maintenance: {
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:247 label: "Maintenance",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:248 description: "Suivi des maintenances matÃ©riels, biens et infrastructures.",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:253 "paiementId",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:256 "typeMaintenance",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:273 "paiements",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:281 "prixUnitaire",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:283 "statutPaiement",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:287 paiements: {
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:288 label: "Paiements",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:296 "maintenanceId",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:303 "modePaiement",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:311 description: "Maisons, appartements, magasins ou immeubles exploitÃ©s.",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:316 "maintenance",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:317 "paiements",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:326 "nombreSallesBain",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:31 code: "TERRAIN_REQUIRES_OWNER",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:32 label: "Terrain avec propriÃ©taire obligatoire",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:33 module: "terrains",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:36 description: "Un terrain doit toujours avoir un propriÃ©taire utilisateur.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:37 event: "TERRAIN_OWNER_MISSING",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:40 code: "TERRAIN_SURFACE_POSITIVE",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:41 label: "Superficie terrain positive",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:42 module: "terrains",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:45 description: "La superficie d'un terrain doit Ãªtre supÃ©rieure Ã  zÃ©ro.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:48 code: "TERRAIN_VOCATION_COMPATIBLE_WITH_EXPLOITATION",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:50 module: "terrains",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:53 description: "La vocation du terrain doit Ãªtre compatible avec le type d'exploitation.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:54 event: "TERRAIN_EXPLOITATION_VOCATION_CONFLICT",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:57 code: "TERRAIN_CAPACITY_NOT_EXCEEDED",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:58 label: "CapacitÃ© terrain non dÃ©passÃ©e",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:59 module: "terrains",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:62 description: "La somme des surfaces exploitÃ©es ne doit pas dÃ©passer la superficie disponible du terrain.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:63 event: "TERRAIN_OVER_CAPACITY",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:67 code: "EXPLOITATION_REQUIRES_TERRAIN",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:68 label: "Terrain obligatoire",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:72 description: "Une exploitation doit Ãªtre rattachÃ©e Ã  un terrain.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:91 code: "EXPLOITATION_ACTIVE_REQUIRES_CAMPAIGN",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:97 event: "EXPLOITATION_WITHOUT_CAMPAIGN",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:144 code: "CAMPAIGN_REQUIRES_EXPLOITATION",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:152 code: "CAMPAIGN_REQUIRES_TERRAIN",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:153 label: "Terrain obligatoire",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:157 description: "Une campagne doit Ãªtre rattachÃ©e Ã  un terrain.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:160 code: "CAMPAIGN_REQUIRES_PRODUCT_OR_ASSET",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:168 code: "CAMPAIGN_END_AFTER_START",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:176 code: "CAMPAIGN_NO_IDENTICAL_OVERLAP",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:181 description: "Deux campagnes identiques ne peuvent pas se chevaucher sur le mÃªme terrain, la mÃªme exploitation et le mÃªme produit ou bien.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:182 event: "CAMPAIGN_OVERLAP_DETECTED",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:185 code: "CAMPAIGN_SURFACE_WITHIN_TERRAIN_CAPACITY",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:193 code: "CAMPAIGN_BUDGET_NOT_EXCEEDED",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:199 event: "CAMPAIGN_BUDGET_EXCEEDED",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:202 code: "CAMPAIGN_CLOSED_REQUIRES_RESULT",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:237 label: "Stock jamais nÃ©gatif",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:241 description: "Une opÃ©ration ne doit jamais rendre un stock nÃ©gatif.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:271 code: "OPERATION_COST_FEEDS_CAMPAIGN",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:280 code: "MATERIAL_UNAVAILABLE_CANNOT_BE_ASSIGNED",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:285 description: "Un matÃ©riel en panne ou maintenance ne peut pas Ãªtre affectÃ© Ã  une opÃ©ration.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:289 code: "MATERIAL_BREAKDOWN_CREATES_MAINTENANCE",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:290 label: "Panne crÃ©e maintenance",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:294 description: "Une panne matÃ©riel doit crÃ©er une intervention ou maintenance.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:311 description: "Le montant total doit Ãªtre cohÃ©rent avec quantitÃ© et prix unitaire.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:315 label: "Vente crÃ©e paiement attendu",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:319 description: "Une vente non payÃ©e doit crÃ©er un paiement attendu.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:325 label: "Montant paiement obligatoire",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:326 module: "paiements",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:329 description: "Un paiement doit avoir un montant.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:333 label: "Paiement rattachÃ©",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:334 module: "paiements",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:337 description: "Un paiement doit Ãªtre reliÃ© Ã  une vente, campagne, contrat, exploitation ou opÃ©ration.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:340 code: "PAYMENT_UPDATES_CAMPAIGN_RESULT",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:341 label: "Paiement met Ã  jour rÃ©sultat campagne",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:342 module: "paiements",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:345 description: "Un paiement liÃ© Ã  une campagne doit mettre Ã  jour le rÃ©sultat.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:371 description: "Toute action sensible doit Ãªtre auditÃ©e : contrat, paiement, stock, suppression, statut.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:3 from: "terrain",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:5 rule: "Une exploitation ne peut pas exister sans terrain.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:9 from: "terrain",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:11 rule: "La vocation du terrain doit accepter le type d'exploitation.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:40 to: "paiement",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:41 rule: "Une vente crÃ©e un paiement attendu.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:45 from: "paiement",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:47 rule: "Les paiements revenus/dÃ©penses doivent recalculer le rÃ©sultat de campagne.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:57 from: "maintenance",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:58 to: "paiement",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:59 rule: "Une maintenance terminÃ©e avec coÃ»t crÃ©e une dÃ©pense.",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeGovernance.ts:22 label: "Formulaires generes par schema",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptions.ts:7 id: "materiel-breakdown-to-maintenance",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptions.ts:10 handlerLabel: "Declencher maintenance",
C:\Users\Admin\terragest\src\runtime\events\ERPDomainEvent.ts:1 export type ERPDomainEventType =
C:\Users\Admin\terragest\src\runtime\events\ERPDomainEvent.ts:11 export type ERPDomainEvent = {
C:\Users\Admin\terragest\src\runtime\events\ERPDomainEvent.ts:14 type: ERPDomainEventType;
C:\Users\Admin\terragest\src\runtime\events\EventBus.ts:32 await handler(payload);
C:\Users\Admin\terragest\src\runtime\events\MaintenanceEvents.ts:1 export const MAINTENANCE_INCIDENT_CREATED =
C:\Users\Admin\terragest\src\runtime\events\MaintenanceEvents.ts:2 "MAINTENANCE_INCIDENT_CREATED";
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventBus.ts:48 await RuntimeBusinessRulesEngine
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventBus.ts:65 await callback(
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:55 WORKFLOW_FAILED:
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:56 "WORKFLOW_FAILED",
C:\Users\Admin\terragest\src\runtime\events\bus\ERPEventBus.ts:2 ERPDomainEvent,
C:\Users\Admin\terragest\src\runtime\events\bus\ERPEventBus.ts:3 } from "../ERPDomainEvent";
C:\Users\Admin\terragest\src\runtime\events\bus\ERPEventBus.ts:6 event: ERPDomainEvent
C:\Users\Admin\terragest\src\runtime\events\bus\ERPEventBus.ts:15 ERPDomainEvent[] = [];
C:\Users\Admin\terragest\src\runtime\events\bus\ERPEventBus.ts:18 event: ERPDomainEvent
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:17 await this.repository.save({
C:\Users\Admin\terragest\src\runtime\firebase\runtime-firestore.ts:11 authDomain:
C:\Users\Admin\terragest\src\runtime\firebase\runtime-firestore.ts:12 process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:17 static async detail(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:20 const snapshot = await getDocs(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:34 const snapshot = await getDoc(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:52 const result = await addDoc(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:71 await updateDoc(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:89 await deleteDoc(
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormEngine.ts:9 static buildMaintenanceForm(
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormEngine.ts:29 label: "Faible",
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:55 static getAvailableModules() {
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:80 await ERPRelationDataLoader.load(typeof targetModule === "string" ? targetModule : targetModule.module);
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:102 await onSubmit?.(values);
C:\Users\Admin\terragest\src\runtime\generated\GeneratedRuntimeTopology.ts:3 terrains: {
C:\Users\Admin\terragest\src\runtime\generated\GeneratedRuntimeTopology.ts:5 "terrain.created",
C:\Users\Admin\terragest\src\runtime\generated\GeneratedRuntimeTopology.ts:6 "terrain.updated",
C:\Users\Admin\terragest\src\runtime\generated\GeneratedRuntimeTopology.ts:16 "terrain.created",
C:\Users\Admin\terragest\src\runtime\generated\GeneratedRuntimeTopology.ts:36 maintenance: {
C:\Users\Admin\terragest\src\runtime\generated\GeneratedRuntimeTopology.ts:38 "maintenance.created",
C:\Users\Admin\terragest\src\runtime\generated\GeneratedRuntimeTopology.ts:50 "maintenance.created",
C:\Users\Admin\terragest\src\runtime\generated\GeneratedRuntimeTopology.ts:61 paiements: {
C:\Users\Admin\terragest\src\runtime\generated\GeneratedRuntimeTopology.ts:63 "paiement.created",
C:\Users\Admin\terragest\src\runtime\generation\ERPModuleRuntimeFactory.tsx:22 | "details"
C:\Users\Admin\terragest\src\runtime\generation\ERPPageGenerationEngine.tsx:25 | "details"
C:\Users\Admin\terragest\src\runtime\generation\ERPRoutesGenerationEngine.ts:10 | "details"
C:\Users\Admin\terragest\src\runtime\generation\ERPRoutesGenerationEngine.ts:34 page: "details",
C:\Users\Admin\terragest\src\runtime\governance\EnterpriseGovernanceEngine.ts:7 DomainBoundaryValidator
C:\Users\Admin\terragest\src\runtime\governance\EnterpriseGovernanceEngine.ts:9 from "./boundaries/DomainBoundaryValidator";
C:\Users\Admin\terragest\src\runtime\governance\EnterpriseGovernanceEngine.ts:38 new DomainBoundaryValidator();
C:\Users\Admin\terragest\src\runtime\governance\boundaries\DomainBoundaryValidator.ts:2 DomainBoundaryValidator {
C:\Users\Admin\terragest\src\runtime\governance\boundaries\DomainBoundaryValidator.ts:7 "[Governance] domain boundaries verified"
C:\Users\Admin\terragest\src\runtime\integrations\federation\FederationEngine.ts:4 domain: string
C:\Users\Admin\terragest\src\runtime\integrations\federation\FederationEngine.ts:9 domain
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:13 MAINTENANCE_INCIDENT_CREATED,
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:15 from "@/runtime/events/MaintenanceEvents";
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:18 MAINTENANCE_INCIDENT_CREATED,
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:22 await addDoc(
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:27 MAINTENANCE_INCIDENT_CREATED,
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:13 MAINTENANCE_INCIDENT_CREATED,
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:15 from "@/runtime/events/MaintenanceEvents";
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:18 MAINTENANCE_INCIDENT_CREATED,
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:22 await addDoc(
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:26 titre: "Incident maintenance",
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:29 type: "maintenance",
C:\Users\Admin\terragest\src\runtime\metadata\ERPModuleSchemas.ts:7 key: "terrains",
C:\Users\Admin\terragest\src\runtime\metadata\ERPModuleSchemas.ts:9 label: "Terrains",
C:\Users\Admin\terragest\src\runtime\metadata\ERPModuleSchemas.ts:11 route: "/terrains",
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:40 detail: string;
C:\Users\Admin\terragest\src\runtime\modules\index.ts:23 type ERPDetailsDefinition,
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:23 case "email":
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:42 domain:
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:23 export interface ERPDetailsDefinition {
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:33 details: ERPDetailsDefinition;
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:63 static buildDetails(module: ERPModule): ERPDetailsDefinition {
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:68 (field: ERPModuleField) => field.visibleInDetails !== false
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:78 details: this.buildDetails(module),
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:4 clientFields, commandeFields, utilisateurFields, tacheFields, incidentFields, maintenanceFields, interventionFields, fournisseurFields, terrainFields, recolteFields, parcelleFields, intrantFields, mouvementFields, stockFields, produitFields, vehiculeFields, employeFields, achatFields, livraisonFields, recetteFields, depenseFields, devisFields, factureFields,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:57 details: "/incidents",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:114 details: "/intrants",
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:4 export type RuntimePageType = "list" | "create" | "edit" | "details";
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:22 : module.metadata.routes?.details,
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:4 { key: "email", label: "Email", type: "email", searchable: true },
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:64 { label: "Maintenance", value: "maintenance" },
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:65 { label: "Salaire", value: "salaire" },
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:81 export const livraisonFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:218 export const terrainFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:226 key: "proprietaireId",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:227 label: "PropriÃ©taire",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:255 key: "terrainId",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:256 label: "Terrain",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:259 module: "terrains",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:260 collection: "terrains",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:311 "Engrais",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:312 "Traitement",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:368 export const maintenanceFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:46 details: `/${key}`,
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPModuleDependencyGraph.ts:9 terrains: [
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPModuleDependencyGraph.ts:17 maintenance: [
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPModuleDependencyGraph.ts:25 paiements: [
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:14 const records = await RuntimeDataBinding.list(module);
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:25 const email = String(record.email ?? "").trim();
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:35 if (email) return email;
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:21 details?: string;
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleDetailRenderer.tsx:8 export function ERPModuleDetailRenderer({
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleDetailRenderer.tsx:17 DÃƒÂ©tail runtime du module {module.key}
C:\Users\Admin\terragest\src\runtime\modules\renderers\ERPModuleRenderer.ts:21 static renderDetails(module: ERPModule) {
C:\Users\Admin\terragest\src\runtime\modules\renderers\ERPModuleRenderer.ts:22 return this.renderPage(module, "details");
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:24 | "email"
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:39 type: "min" | "max" | "regex" | "email" | "phone" | "custom";
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:50 email?: boolean;
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:78 visibleInDetails?: boolean;
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:25 await this.repository.append({
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:32 await addDoc(
C:\Users\Admin\terragest\src\runtime\monitoring\errors\ERPErrorAnalytics.ts:9 const failedWorkers = ERPWorkerHistoryStore.failed();
C:\Users\Admin\terragest\src\runtime\monitoring\errors\ERPErrorAnalytics.ts:15 failedWorkers,
C:\Users\Admin\terragest\src\runtime\monitoring\errors\ERPErrorAnalytics.ts:20 failedWorkers.length +
C:\Users\Admin\terragest\src\runtime\notifications\RuntimeNotificationEngine.ts:30 await addDoc(
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:7 erpRuntimeAuditTrail,
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:8 } from "./ERPRuntimeAuditTrail";
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:19 erpRuntimeAuditTrail
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:17 export class ERPRuntimeAuditTrail {
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:47 export const erpRuntimeAuditTrail =
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:48 new ERPRuntimeAuditTrail();
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:35 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:42 module: "paiements",
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:60 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:61 title: "Maintenance critique",
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:62 description: "Intervention prioritaire detectee.",
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:70 title: "Stock faible",
C:\Users\Admin\terragest\src\runtime\observability\index.ts:1 export * from "./ERPRuntimeAuditTrail";
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:27 await addDoc(
C:\Users\Admin\terragest\src\runtime\observability\generated\livraisons\livraisons.observability.ts:1 export const LivraisonsObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\livraisons\livraisons.observability.ts:4 "livraisons",
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:55 await this.workflow.execute(
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:48 await this.publisher.publish(
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:53 await this.workflow.execute(
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:58 await this.process.execute(
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:59 "MaterielMaintenanceProcess",
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:63 await this.analytics.analyze(
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:68 await this.audit.log(
C:\Users\Admin\terragest\src\runtime\orchestration\RuntimeModuleOrchestrator.ts:21 await this.publisher.publish({
C:\Users\Admin\terragest\src\runtime\orchestration\simulatePersistentBreakdownFlow.ts:11 await flow.execute({
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:17 await this.repository.save({
C:\Users\Admin\terragest\src\runtime\os-enterprise\ERPNotificationCenter.ts:11 time: "Maintenant",
C:\Users\Admin\terragest\src\runtime\os-enterprise\ERPSavedViews.ts:13 id: "view-maintenance",
C:\Users\Admin\terragest\src\runtime\os-enterprise\ERPSavedViews.ts:14 label: "Vue maintenance",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:10 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:16 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:22 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:28 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:34 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:40 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:48 roles: ["gestionnaire"],
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:54 roles: ["gestionnaire"],
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:60 roles: ["gestionnaire", "superviseur"],
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:14 await ERPRuntimePersistenceService.events.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:20 await ERPRuntimePersistenceService.traces.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:22 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:26 await ERPRuntimePersistenceService.alerts.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:27 title: "Stock faible",
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:32 await ERPRuntimePersistenceService.workflows.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:33 workflowKey: "maintenance-critical-flow",
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:37 await ERPRuntimePersistenceService.queueJobs.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:39 module: "paiements",
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:43 await ERPRuntimePersistenceService.audit.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:49 await ERPRuntimePersistenceService.securityAudit.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:50 module: "paiements",
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:13 await repository.getAll();
C:\Users\Admin\terragest\src\runtime\persistence\events\RuntimeEventRepository.ts:34 await getDocs(
C:\Users\Admin\terragest\src\runtime\persistence\repositories\ERPRuntimeRepository.ts:43 await this.driver.save(
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:14 ] = await Promise.all([
C:\Users\Admin\terragest\src\runtime\policies\generated\livraisons\livraisons.policy.ts:1 export const LivraisonsPolicy = {
C:\Users\Admin\terragest\src\runtime\policies\generated\livraisons\livraisons.policy.ts:4 "livraisons",
C:\Users\Admin\terragest\src\runtime\processes\PersistentProcessExecutor.ts:17 await this.repository.save({
C:\Users\Admin\terragest\src\runtime\processes\definitions\MaterielMaintenanceProcess.ts:5 MaterielMaintenanceProcess:
C:\Users\Admin\terragest\src\runtime\processes\definitions\MaterielMaintenanceProcess.ts:8 id: "PROC_MAT_MAINT",
C:\Users\Admin\terragest\src\runtime\processes\definitions\MaterielMaintenanceProcess.ts:11 "Materiel Maintenance",
C:\Users\Admin\terragest\src\runtime\production\backup\ERPBackupPlanRegistry.ts:8 frequency: "daily",
C:\Users\Admin\terragest\src\runtime\production\backup\ERPBackupPlanRegistry.ts:15 frequency: "daily",
C:\Users\Admin\terragest\src\runtime\production\cloud\ERPCloudReadinessRegistry.ts:8 description: "Les variables env existent mais doivent etre auditees.",
C:\Users\Admin\terragest\src\runtime\production\cloud\ERPCloudReadinessRegistry.ts:14 description: "Firestore est present mais la persistance runtime doit etre branchee.",
C:\Users\Admin\terragest\src\runtime\production\governance\ERPProductionPolicyRegistry.ts:30 description: "Le driver in-memory existe, mais le driver cloud reste a brancher.",
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:9 static async detail(module: ERPModule, id: string) {
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:38 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:54 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:56 description: "Maintenance critique en traitement.",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:65 description: "Alerte stock faible traitee.",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:72 module: "paiements",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:73 title: "Job queue traite",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:74 description: "Retry paiement execute.",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:81 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:14 "terrains",
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:28 "terrains",
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:37 "terrainId",
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:48 "maintenance",
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:62 "maintenance",
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:71 "maintenanceId",
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:31 const rows = await RuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\runtime\resilience\CircuitBreaker.ts:3 private failures = 0;
C:\Users\Admin\terragest\src\runtime\resilience\CircuitBreaker.ts:22 await callback();
C:\Users\Admin\terragest\src\runtime\resilience\CircuitBreaker.ts:24 this.failures = 0;
C:\Users\Admin\terragest\src\runtime\resilience\CircuitBreaker.ts:28 this.failures++;
C:\Users\Admin\terragest\src\runtime\resilience\CircuitBreaker.ts:31 this.failures >= this.threshold
C:\Users\Admin\terragest\src\runtime\resilience\ERPRuntimeResilienceSeed.ts:17 product: "ENGRAIS-001",
C:\Users\Admin\terragest\src\runtime\resilience\ERPRuntimeResilienceSeed.ts:23 module: "paiements",
C:\Users\Admin\terragest\src\runtime\resilience\ERPRuntimeResilienceSeed.ts:27 forceFailure: true,
C:\Users\Admin\terragest\src\runtime\resilience\ERPRuntimeResilienceSeed.ts:32 type: "MAINTENANCE_NOTIFICATION",
C:\Users\Admin\terragest\src\runtime\resilience\ERPRuntimeResilienceSeed.ts:33 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\resilience\RetryPolicy.ts:14 await callback();
C:\Users\Admin\terragest\src\runtime\resilience\circuit-breaker\ERPCircuitBreaker.ts:8 private failures = 0;
C:\Users\Admin\terragest\src\runtime\resilience\circuit-breaker\ERPCircuitBreaker.ts:12 this.failures = 0;
C:\Users\Admin\terragest\src\runtime\resilience\circuit-breaker\ERPCircuitBreaker.ts:16 recordFailure() {
C:\Users\Admin\terragest\src\runtime\resilience\circuit-breaker\ERPCircuitBreaker.ts:17 this.failures += 1;
C:\Users\Admin\terragest\src\runtime\resilience\circuit-breaker\ERPCircuitBreaker.ts:19 if (this.failures >= this.threshold) {
C:\Users\Admin\terragest\src\runtime\resilience\circuit-breaker\ERPCircuitBreaker.ts:33 this.failures = 0;
C:\Users\Admin\terragest\src\runtime\resilience\dlq\DeadLetterQueue.ts:24 await addDoc(
C:\Users\Admin\terragest\src\runtime\resilience\queue\ERPQueueJob.ts:5 | "failed"
C:\Users\Admin\terragest\src\runtime\resilience\retry\RetryEngine.ts:30 return await action();
C:\Users\Admin\terragest\src\runtime\resilience\retry\RetryEngine.ts:38 await new Promise(resolve =>
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:30 function shouldFail(job: ERPQueueJob) {
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:31 return Boolean(job.payload?.forceFailure);
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:75 description: "Le worker runtime est temporairement bloque.",
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:99 if (shouldFail(job)) {
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:100 throw new Error("Forced runtime failure");
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:124 const failedJob: ERPQueueJob = {
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:132 ERPQueueStore.update(job.id, failedJob);
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:133 ERPDeadLetterStore.add(failedJob);
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:134 ERPCircuitBreaker.recordFailure();
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:151 ERPCircuitBreaker.recordFailure();
C:\Users\Admin\terragest\src\runtime\rules\engine\RuleExecutor.ts:28 await this.evaluator.evaluate(
C:\Users\Admin\terragest\src\runtime\rules\engine\RuleExecutor.ts:43 await rule.action(
C:\Users\Admin\terragest\src\runtime\rules\evaluators\ConditionEvaluator.ts:19 return await condition(
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeScheduler.ts:37 await RuntimeAutomationEngine
C:\Users\Admin\terragest\src\runtime\schemas\ERPBusinessSchemaRegistry.ts:21 case "email":
C:\Users\Admin\terragest\src\runtime\security\ERPSecuritySeed.ts:14 ERPAccessGuard.can("paiements", "audit");
C:\Users\Admin\terragest\src\runtime\security\RuntimeSecurityManager.ts:7 MaintenancePolicy
C:\Users\Admin\terragest\src\runtime\security\RuntimeSecurityManager.ts:9 from "@/platform/policies/rules/MaintenancePolicy";
C:\Users\Admin\terragest\src\runtime\security\RuntimeSecurityManager.ts:38 MaintenancePolicy
C:\Users\Admin\terragest\src\runtime\security\RuntimeSecurityManager.ts:79 await this.policies.evaluate({
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:31 case "details":
C:\Users\Admin\terragest\src\runtime\selects\DynamicSelect.types.ts:18 terrainId?: string;
C:\Users\Admin\terragest\src\runtime\selects\DynamicSelectEngine.ts:28 case "terrain":
C:\Users\Admin\terragest\src\runtime\selects\DynamicSelectEngine.ts:30 return this.getTerrains(
C:\Users\Admin\terragest\src\runtime\selects\DynamicSelectEngine.ts:83 static async getTerrains(
C:\Users\Admin\terragest\src\runtime\selects\DynamicSelectEngine.ts:92 "Terrain Nord",
C:\Users\Admin\terragest\src\runtime\selects\DynamicSelectEngine.ts:95 "terrain-nord",
C:\Users\Admin\terragest\src\runtime\selects\DynamicSelectEngine.ts:100 "Terrain Sud",
C:\Users\Admin\terragest\src\runtime\selects\DynamicSelectEngine.ts:103 "terrain-sud",
C:\Users\Admin\terragest\src\runtime\selects\ERPDynamicSelect.tsx:49 await DynamicSelectEngine
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartAnomalyDetector.ts:21 "Certains niveaux de stock peuvent devenir critiques prochainement.",
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartAnomalyDetector.ts:30 id: "materiel-maintenance-risk",
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartAnomalyDetector.ts:32 title: "Maintenance sensible",
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartPredictionEngine.ts:26 "Risque d'immobilisation si aucune maintenance n'est planifiee.",
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartRecommendationEngine.ts:36 id: "materiel-maintenance-plan",
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartRecommendationEngine.ts:38 title: "Planifier une maintenance preventive",
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartRecommendationEngine.ts:40 "Les signaux indiquent une priorite de maintenance.",
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartScoringEngine.ts:17 terrains: 38,
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartRuntimeEngine.ts:23 "Maintenir les controles actuels.",
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartRuntimeEngine.ts:29 "Des automatisations supplementaires peuvent etre activees.",
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartRuntimeEngine.ts:32 "Activer les traitements automatiques.",
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:10 // MAINTENANCE
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:15 "maintenance",
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:32 "maintenance",
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:49 "maintenance",
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:66 "maintenance",
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:107 "maintenance",
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:110 "Maintenance",
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:156 "faible",
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:159 "Stock faible",
C:\Users\Admin\terragest\src\runtime\supervision\WorkflowSupervisor.ts:13 failure(
C:\Users\Admin\terragest\src\runtime\supervision\WorkflowSupervisor.ts:19 "[Supervisor Failure]",
C:\Users\Admin\terragest\src\runtime\tenant\registry\ERPTenant.ts:4 | "maintenance";
C:\Users\Admin\terragest\src\runtime\tenant\registry\ERPTenantRegistry.ts:13 "terrains",
C:\Users\Admin\terragest\src\runtime\tenant\registry\ERPTenantRegistry.ts:16 "maintenance",
C:\Users\Admin\terragest\src\runtime\tenant\registry\ERPTenantRegistry.ts:17 "paiements",
C:\Users\Admin\terragest\src\runtime\tenant\registry\ERPTenantRegistry.ts:39 status: "maintenance",
C:\Users\Admin\terragest\src\runtime\tenant\registry\ERPTenantRegistry.ts:43 "terrains",
C:\Users\Admin\terragest\src\runtime\testing\engine\ERPTestingTypes.ts:5 | "failed";
C:\Users\Admin\terragest\src\runtime\testing\engine\ERPTestingTypes.ts:30 failed: number;
C:\Users\Admin\terragest\src\runtime\testing\history\ERPTestingHistoryStore.ts:33 failed() {
C:\Users\Admin\terragest\src\runtime\testing\history\ERPTestingHistoryStore.ts:37 item.status === "failed"
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:9 id: "workflow_maintenance",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:10 label: "Workflow Maintenance",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:12 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:22 module: "paiements",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:43 status: "failed",
C:\Users\Admin\terragest\src\runtime\testing\reports\ERPTestingReportBuilder.ts:16 const failed =
C:\Users\Admin\terragest\src\runtime\testing\reports\ERPTestingReportBuilder.ts:19 test.status === "failed"
C:\Users\Admin\terragest\src\runtime\testing\reports\ERPTestingReportBuilder.ts:25 failed,
C:\Users\Admin\terragest\src\runtime\ui-generation\ERPDefaultSchemas.ts:8 Les schemas sont maintenant
C:\Users\Admin\terragest\src\runtime\ui-generation\ERPDefaultSchemas.ts:15 temporairement pour Ã©viter
C:\Users\Admin\terragest\src\runtime\validation\RuntimeFieldValidator.ts:68 * EMAIL
C:\Users\Admin\terragest\src\runtime\validation\RuntimeFieldValidator.ts:72 validation.email &&
C:\Users\Admin\terragest\src\runtime\validation\RuntimeFieldValidator.ts:75 const emailRegex =
C:\Users\Admin\terragest\src\runtime\validation\RuntimeFieldValidator.ts:78 if (!emailRegex.test(stringValue)) {
C:\Users\Admin\terragest\src\runtime\validation\RuntimeFieldValidator.ts:81 message: "Email invalide",
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationTypes.ts:12 email?: boolean;
C:\Users\Admin\terragest\src\runtime\workers\ERPWorkersSeed.ts:29 "paiements",
C:\Users\Admin\terragest\src\runtime\workers\engine\ERPWorkerEngine.ts:44 shouldFail = false
C:\Users\Admin\terragest\src\runtime\workers\engine\ERPWorkerEngine.ts:55 status: shouldFail
C:\Users\Admin\terragest\src\runtime\workers\engine\ERPWorkerEngine.ts:56 ? "failed"
C:\Users\Admin\terragest\src\runtime\workers\engine\ERPWorkerEngine.ts:95 failedJobs:
C:\Users\Admin\terragest\src\runtime\workers\engine\ERPWorkerEngine.ts:96 ERPWorkerHistoryStore.failed().length,
C:\Users\Admin\terragest\src\runtime\workers\engine\ERPWorkerTypes.ts:11 | "failed";
C:\Users\Admin\terragest\src\runtime\workers\history\ERPWorkerHistoryStore.ts:33 failed() {
C:\Users\Admin\terragest\src\runtime\workers\history\ERPWorkerHistoryStore.ts:37 job.status === "failed"
C:\Users\Admin\terragest\src\runtime\workers\metrics\ERPWorkerMetricsStore.ts:5 failedJobs: number;
C:\Users\Admin\terragest\src\runtime\workers\metrics\ERPWorkerMetricsStore.ts:13 failedJobs: 0,
C:\Users\Admin\terragest\src\runtime\workers\scheduler\ERPSchedulerRegistry.ts:17 label: "Retry paiements",
C:\Users\Admin\terragest\src\runtime\workers\scheduler\ERPSchedulerRegistry.ts:18 module: "paiements",
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:25 await addDoc(
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:37 await WorkflowPersistenceEngine
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:5 key: "materiel-maintenance",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:7 label: "Workflow maintenance materiel",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:8 initialStep: "available",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:10 { key: "available", label: "Disponible" },
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:11 { key: "maintenance", label: "Maintenance" },
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:13 { key: "repair", label: "Reparation" },
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:17 { from: "available", to: "maintenance", label: "Declencher maintenance" },
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:18 { from: "maintenance", to: "validation", label: "Demander validation", requiresValidation: true },
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:19 { from: "validation", to: "repair", label: "Valider reparation" },
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:20 { from: "repair", to: "service", label: "Retour en service" },
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:42 moduleKey: "terrains",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:43 label: "Validation terrain",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:107 key: "maintenance-lifecycle",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:108 moduleKey: "maintenance",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:109 label: "Cycle maintenance",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:141 key: "paiement-validation",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:142 moduleKey: "paiements",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:143 label: "Validation paiement",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:149 { key: "paid", label: "Paye" },
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:154 { from: "authorized", to: "paid", label: "Marquer paye" },
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:4 | "waiting"
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:36 .getAvailableActions(
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:7 export const maintenanceWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:10 "maintenance",
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:2 maintenanceWorkflow,
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:4 from "@/runtime/workflow-ui/maintenance.workflow";
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:18 maintenance:
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:19 maintenanceWorkflow,
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:33 static getAvailableActions(
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:70 await this.persistence.create(
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:96 await this.persistence.update(
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:101 await this.retryEngine.execute(
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:105 await step.execute(
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:138 await this.persistence.update(
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:145 const failedUpdate = {
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:147 "FAILED" as const,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:158 failedUpdate
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:163 ...failedUpdate,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:166 await this.persistence.update(
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:168 failedUpdate
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:171 await this.deadLetterQueue.store({
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:14 const maintenanceExecution =
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:15 ERPWorkflowEngine.start("maintenance-critical-flow");
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:21 if (maintenanceExecution) {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:22 ERPWorkflowEngine.complete(maintenanceExecution.id);
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:5 | "waiting_approval"
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:7 | "failed"
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:25 onFailure?: string;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:7 key: "maintenance-critical-flow",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:8 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:9 label: "Maintenance critique",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:10 description: "Workflow de traitement des maintenances critiques.",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:24 onFailure: "compensation",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:73 module: "paiements",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:74 label: "Validation paiement",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:75 description: "Workflow de validation des paiements.",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:80 label: "Controle paiement",
C:\Users\Admin\terragest\src\runtime\workflows\generated\livraisons\livraisons.workflow.ts:1 export const LivraisonsWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\livraisons\livraisons.workflow.ts:4 "livraisons_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\livraisons\livraisons.workflow.ts:7 "Livraisons Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:26 await addDoc(
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:52 await updateDoc(
C:\Users\Admin\terragest\src\runtime\workflows\sagas\SagaCoordinator.ts:27 await step.compensate(
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowExecution.ts:5 | "FAILED"
C:\Users\Admin\terragest\src\saas\features\FeatureFlagService.ts:9 "AI_ENGINE",
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:37 ai:
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:39 "AI_ENGINE"
C:\Users\Admin\terragest\src\services\AuthService.ts:4 email: string,
C:\Users\Admin\terragest\src\services\AuthService.ts:9 email,
C:\Users\Admin\terragest\src\services\UtilisateurService.ts:22 const snapshot = await getDoc(ref);
C:\Users\Admin\terragest\src\shared\api\ApiWrapper.ts:14 await callback();
C:\Users\Admin\terragest\src\shared\constants\firestoreCollections.ts:12 TERRAINS:
C:\Users\Admin\terragest\src\shared\constants\firestoreCollections.ts:13 "terrains",
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:41 await getDocs(
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:61 await getDoc(
C:\Users\Admin\terragest\src\shared\types\Equipment.ts:19 | "MAINTENANCE"
C:\Users\Admin\terragest\src\shared\types\Intervention.ts:14 terrainId?: string;
C:\Users\Admin\terragest\src\shared\types\Intervention.ts:22 commentaire?: string;
C:\Users\Admin\terragest\src\shared\types\Product.ts:17 prixUnitaire?: number;
C:\Users\Admin\terragest\src\shared\types\StockMovement.ts:18 commentaire?: string;
C:\Users\Admin\terragest\src\shared\types\Terrain.ts:1 export interface Terrain {
C:\Users\Admin\terragest\src\shared\types\User.ts:11 email: string;
C:\Users\Admin\terragest\src\shared\validators\ValidationService.ts:20 email(
C:\Users\Admin\terragest\src\shared\validators\ValidationService.ts:32 "Invalid email"
C:\Users\Admin\terragest\src\types\MOUVEMENT_STOCK.ts:8 quantite: number;           // tu peux ajouter un commentaire pour indiquer si elle doit toujours être > 0
C:\Users\Admin\terragest\src\types\MOUVEMENT_STOCK.ts:9 commentaire?: string;
C:\Users\Admin\terragest\src\types\STATUT_STOCK.ts:5 FAIBLE = "FAIBLE",
C:\Users\Admin\terragest\src\types\terrain.ts:1 export interface Terrain {
C:\Users\Admin\terragest\src\types\utilisateur.ts:11 email: string;
C:\Users\Admin\terragest\src\ui\theme\module.colors.ts:8 maintenance:
C:\Users\Admin\terragest\src\ui\theme\status.colors.ts:17 maintenance:
C:\Users\Admin\terragest\src\_quarantine\layout\ERPLayout.tsx:49 <main
C:\Users\Admin\terragest\src\_quarantine\layout\ERPLayout.tsx:56 </main>
C:\Users\Admin\terragest\src\_quarantine\layout\Sidebar.tsx:43 await loadFeatures();
C:\Users\Admin\terragest\src\_quarantine\layout\Topbar.tsx:20 await signOut(auth);
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\pages\[id]\page.tsx:1 export default function AlertesDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\pages\[id]\page.tsx:5 DÃ©tails Alertes
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\pages\[id]\page.tsx:1 export default function AnalyticsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\pages\[id]\page.tsx:5 DÃ©tails Analytics
C:\Users\Admin\terragest\src\_quarantine\modules\clients\pages\[id]\page.tsx:1 export default function ClientsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\pages\[id]\page.tsx:5 DÃ©tails Clients
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\pages\[id]\page.tsx:1 export default function ContratsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\pages\[id]\page.tsx:5 DÃ©tails Contrats
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\pages\[id]\page.tsx:1 export default function ExploitationsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\pages\[id]\page.tsx:5 DÃ©tails Exploitations
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\offlineQueue.ts:31 await processor(action);
C:\Users\Admin\terragest\src\_quarantine\modules\factures\pages\[id]\page.tsx:1 export default function FacturesDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\pages\[id]\page.tsx:5 DÃ©tails Factures
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\pages\[id]\page.tsx:1 export default function FournisseursDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\pages\[id]\page.tsx:5 DÃ©tails Fournisseurs
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\pages\[id]\page.tsx:1 export default function InterventionsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\pages\[id]\page.tsx:5 DÃ©tails Interventions
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\offlineQueue.ts:31 await processor(action);
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\index.ts:1 export * from "./dto/MaintenanceDTO";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\index.ts:2 export * from "./repositories/MaintenanceRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\index.ts:3 export * from "./services/MaintenanceService";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceBulkActions.tsx:9 export function MaintenanceBulkActions({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceChartWidget.tsx:7 export function MaintenanceChartWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceDashboardCard.tsx:9 export function MaintenanceDashboardCard({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceExportActions.tsx:11 export function MaintenanceExportActions({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceFilters.tsx:11 export function MaintenanceFilters({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:8 MaintenanceSchema,
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:9 MaintenanceSchemaType,
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:10 } from "../schemas/Maintenance.schema";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:12 import { useCreateMaintenance } from "../hooks/useCreateMaintenance";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:14 export function MaintenanceForm() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:16 useCreateMaintenance();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:18 const form = useForm<MaintenanceSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:20 MaintenanceSchema
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:25 data: MaintenanceSchemaType
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenancePagination.tsx:13 export function MaintenancePagination({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceRealtimeWidget.tsx:9 export function MaintenanceRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceSorting.tsx:13 export function MaintenanceSorting({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceTable.tsx:3 import { useMaintenance } from "../hooks/useMaintenance";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceTable.tsx:5 export function MaintenanceTable() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceTable.tsx:9 } = useMaintenance();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\dto\MaintenanceDTO.ts:3 export interface MaintenanceDTO extends BaseDTO {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useCreateMaintenance.ts:7 import { MaintenanceService } from "../services/MaintenanceService";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useCreateMaintenance.ts:9 const service = new MaintenanceService();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useCreateMaintenance.ts:11 export function useCreateMaintenance() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useCreateMaintenance.ts:18 queryKey: ["maintenance"],
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useDeleteMaintenance.ts:7 import { MaintenanceService } from "../services/MaintenanceService";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useDeleteMaintenance.ts:9 const service = new MaintenanceService();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useDeleteMaintenance.ts:11 export function useDeleteMaintenance() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useDeleteMaintenance.ts:18 queryKey: ["maintenance"],
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useMaintenance.ts:5 import { MaintenanceService } from "../services/MaintenanceService";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useMaintenance.ts:7 const service = new MaintenanceService();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useMaintenance.ts:9 export function useMaintenance() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useMaintenance.ts:11 queryKey: ["maintenance"],
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useUpdateMaintenance.ts:7 import { MaintenanceService } from "../services/MaintenanceService";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useUpdateMaintenance.ts:9 const service = new MaintenanceService();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useUpdateMaintenance.ts:11 export function useUpdateMaintenance() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useUpdateMaintenance.ts:24 queryKey: ["maintenance"],
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\pages\page.tsx:1 export default function MaintenancePage() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\pages\page.tsx:5 Maintenance
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\pages\nouveau\page.tsx:1 export default function NouveauMaintenancePage() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\pages\nouveau\page.tsx:5 Nouveau Maintenance
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\pages\[id]\page.tsx:1 export default function MaintenanceDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\pages\[id]\page.tsx:5 DÃ©tails Maintenance
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\pages\[id]\edit\page.tsx:1 export default function EditMaintenancePage() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\pages\[id]\edit\page.tsx:5 Modifier Maintenance
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\repositories\MaintenanceRepository.ts:2 import { MaintenanceDTO } from "../dto/MaintenanceDTO";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\repositories\MaintenanceRepository.ts:4 export class MaintenanceRepository extends FirestoreRepository<MaintenanceDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\repositories\MaintenanceRepository.ts:6 super("maintenance");
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\schemas\Maintenance.schema.ts:3 export const MaintenanceSchema = z.object({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\schemas\Maintenance.schema.ts:14 export type MaintenanceSchemaType =
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\schemas\Maintenance.schema.ts:15 z.infer<typeof MaintenanceSchema>;
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:1 import { MaintenanceRepository } from "../repositories/MaintenanceRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:3 export class MaintenanceService {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:5 new MaintenanceRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\offlineQueue.ts:31 await processor(action);
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\subscribeToMaintenance.ts:8 export function subscribeToMaintenance(
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\subscribeToMaintenance.ts:14 "maintenance"
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\tests\MaintenanceService.test.ts:3 describe("MaintenanceService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\pages\[id]\page.tsx:1 export default function MaterielsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\pages\[id]\page.tsx:5 DÃ©tails Materiels
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\offlineQueue.ts:31 await processor(action);
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\pages\[id]\page.tsx:1 export default function MobileDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\pages\[id]\page.tsx:5 DÃ©tails Mobile
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\offlineQueue.ts:31 await processor(action);
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\pages\[id]\page.tsx:1 export default function MonitoringDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\pages\[id]\page.tsx:5 DÃ©tails Monitoring
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\pages\[id]\page.tsx:1 export default function MouvementsStockDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\pages\[id]\page.tsx:5 DÃ©tails MouvementsStock
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\offlineQueue.ts:31 await processor(action);
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\index.ts:1 export * from "./dto/PaiementsDTO";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\index.ts:2 export * from "./repositories/PaiementsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\index.ts:3 export * from "./services/PaiementsService";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsBulkActions.tsx:9 export function PaiementsBulkActions({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsChartWidget.tsx:7 export function PaiementsChartWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsDashboardCard.tsx:9 export function PaiementsDashboardCard({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsExportActions.tsx:11 export function PaiementsExportActions({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsFilters.tsx:11 export function PaiementsFilters({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:8 PaiementsSchema,
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:9 PaiementsSchemaType,
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:10 } from "../schemas/Paiements.schema";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:12 import { useCreatePaiements } from "../hooks/useCreatePaiements";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:14 export function PaiementsForm() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:16 useCreatePaiements();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:18 const form = useForm<PaiementsSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:20 PaiementsSchema
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:25 data: PaiementsSchemaType
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsPagination.tsx:13 export function PaiementsPagination({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsRealtimeWidget.tsx:9 export function PaiementsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsSorting.tsx:13 export function PaiementsSorting({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsTable.tsx:3 import { usePaiements } from "../hooks/usePaiements";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsTable.tsx:5 export function PaiementsTable() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsTable.tsx:9 } = usePaiements();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\dto\PaiementsDTO.ts:3 export interface PaiementsDTO extends BaseDTO {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useCreatePaiements.ts:7 import { PaiementsService } from "../services/PaiementsService";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useCreatePaiements.ts:9 const service = new PaiementsService();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useCreatePaiements.ts:11 export function useCreatePaiements() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useCreatePaiements.ts:18 queryKey: ["paiements"],
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useDeletePaiements.ts:7 import { PaiementsService } from "../services/PaiementsService";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useDeletePaiements.ts:9 const service = new PaiementsService();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useDeletePaiements.ts:11 export function useDeletePaiements() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useDeletePaiements.ts:18 queryKey: ["paiements"],
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\usePaiements.ts:5 import { PaiementsService } from "../services/PaiementsService";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\usePaiements.ts:7 const service = new PaiementsService();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\usePaiements.ts:9 export function usePaiements() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\usePaiements.ts:11 queryKey: ["paiements"],
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useUpdatePaiements.ts:7 import { PaiementsService } from "../services/PaiementsService";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useUpdatePaiements.ts:9 const service = new PaiementsService();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useUpdatePaiements.ts:11 export function useUpdatePaiements() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useUpdatePaiements.ts:24 queryKey: ["paiements"],
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\pages\page.tsx:1 export default function PaiementsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\pages\page.tsx:5 Paiements
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\pages\nouveau\page.tsx:1 export default function NouveauPaiementsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\pages\nouveau\page.tsx:5 Nouveau Paiements
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\pages\[id]\page.tsx:1 export default function PaiementsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\pages\[id]\page.tsx:5 DÃ©tails Paiements
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\pages\[id]\edit\page.tsx:1 export default function EditPaiementsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\pages\[id]\edit\page.tsx:5 Modifier Paiements
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\repositories\PaiementsRepository.ts:2 import { PaiementsDTO } from "../dto/PaiementsDTO";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\repositories\PaiementsRepository.ts:4 export class PaiementsRepository extends FirestoreRepository<PaiementsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\repositories\PaiementsRepository.ts:6 super("paiements");
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\schemas\Paiements.schema.ts:3 export const PaiementsSchema = z.object({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\schemas\Paiements.schema.ts:14 export type PaiementsSchemaType =
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\schemas\Paiements.schema.ts:15 z.infer<typeof PaiementsSchema>;
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:1 import { PaiementsRepository } from "../repositories/PaiementsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:3 export class PaiementsService {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:5 new PaiementsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\subscribeToPaiements.ts:8 export function subscribeToPaiements(
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\subscribeToPaiements.ts:14 "paiements"
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\tests\PaiementsService.test.ts:3 describe("PaiementsService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\pages\[id]\page.tsx:1 export default function ParcellesDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\pages\[id]\page.tsx:5 DÃ©tails Parcelles
C:\Users\Admin\terragest\src\_quarantine\modules\productions\pages\[id]\page.tsx:1 export default function ProductionsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\pages\[id]\page.tsx:5 DÃ©tails Productions
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\offlineQueue.ts:31 await processor(action);
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\pages\[id]\page.tsx:1 export default function RecoltesDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\pages\[id]\page.tsx:5 DÃ©tails Recoltes
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\offlineQueue.ts:31 await processor(action);
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\pages\[id]\page.tsx:1 export default function StocksDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\pages\[id]\page.tsx:5 DÃ©tails Stocks
C:\Users\Admin\terragest\src\_quarantine\modules\sync\pages\[id]\page.tsx:1 export default function SyncDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\pages\[id]\page.tsx:5 DÃ©tails Sync
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\offlineQueue.ts:31 await processor(action);
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\index.ts:1 export * from "./dto/TerrainsDTO";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\index.ts:2 export * from "./repositories/TerrainsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\index.ts:3 export * from "./services/TerrainsService";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsBulkActions.tsx:9 export function TerrainsBulkActions({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsChartWidget.tsx:7 export function TerrainsChartWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsDashboardCard.tsx:9 export function TerrainsDashboardCard({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsExportActions.tsx:11 export function TerrainsExportActions({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsFilters.tsx:11 export function TerrainsFilters({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:8 TerrainsSchema,
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:9 TerrainsSchemaType,
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:10 } from "../schemas/Terrains.schema";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:12 import { useCreateTerrains } from "../hooks/useCreateTerrains";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:14 export function TerrainsForm() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:16 useCreateTerrains();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:18 const form = useForm<TerrainsSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:20 TerrainsSchema
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:25 data: TerrainsSchemaType
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsPagination.tsx:13 export function TerrainsPagination({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsRealtimeWidget.tsx:9 export function TerrainsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsSorting.tsx:13 export function TerrainsSorting({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsTable.tsx:3 import { useTerrains } from "../hooks/useTerrains";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsTable.tsx:5 export function TerrainsTable() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsTable.tsx:9 } = useTerrains();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\dto\TerrainsDTO.ts:3 export interface TerrainsDTO extends BaseDTO {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useCreateTerrains.ts:7 import { TerrainsService } from "../services/TerrainsService";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useCreateTerrains.ts:9 const service = new TerrainsService();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useCreateTerrains.ts:11 export function useCreateTerrains() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useCreateTerrains.ts:18 queryKey: ["terrains"],
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useDeleteTerrains.ts:7 import { TerrainsService } from "../services/TerrainsService";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useDeleteTerrains.ts:9 const service = new TerrainsService();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useDeleteTerrains.ts:11 export function useDeleteTerrains() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useDeleteTerrains.ts:18 queryKey: ["terrains"],
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useTerrains.ts:5 import { TerrainsService } from "../services/TerrainsService";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useTerrains.ts:7 const service = new TerrainsService();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useTerrains.ts:9 export function useTerrains() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useTerrains.ts:11 queryKey: ["terrains"],
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useUpdateTerrains.ts:7 import { TerrainsService } from "../services/TerrainsService";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useUpdateTerrains.ts:9 const service = new TerrainsService();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useUpdateTerrains.ts:11 export function useUpdateTerrains() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useUpdateTerrains.ts:24 queryKey: ["terrains"],
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\pages\page.tsx:1 export default function TerrainsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\pages\page.tsx:5 Terrains
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\pages\nouveau\page.tsx:1 export default function NouveauTerrainsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\pages\nouveau\page.tsx:5 Nouveau Terrains
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\pages\[id]\page.tsx:1 export default function TerrainsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\pages\[id]\page.tsx:5 DÃ©tails Terrains
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\pages\[id]\edit\page.tsx:1 export default function EditTerrainsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\pages\[id]\edit\page.tsx:5 Modifier Terrains
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\repositories\TerrainsRepository.ts:2 import { TerrainsDTO } from "../dto/TerrainsDTO";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\repositories\TerrainsRepository.ts:4 export class TerrainsRepository extends FirestoreRepository<TerrainsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\repositories\TerrainsRepository.ts:6 super("terrains");
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\schemas\Terrains.schema.ts:3 export const TerrainsSchema = z.object({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\schemas\Terrains.schema.ts:14 export type TerrainsSchemaType =
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\schemas\Terrains.schema.ts:15 z.infer<typeof TerrainsSchema>;
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\offlineQueue.ts:31 await processor(action);
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\subscribeToTerrains.ts:8 export function subscribeToTerrains(
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\subscribeToTerrains.ts:14 "terrains"
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:1 import { TerrainsRepository } from "../repositories/TerrainsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:3 export class TerrainsService {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:5 new TerrainsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\tests\TerrainsService.test.ts:3 describe("TerrainsService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\pages\[id]\page.tsx:1 export default function UtilisateursDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\pages\[id]\page.tsx:5 DÃ©tails Utilisateurs
C:\Users\Admin\terragest\src\_quarantine\navigation\Sidebar.tsx:9 "Terrains",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\contrats.form.ts:27 name: "prestataire",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\contrats.form.ts:28 label: "Prestataire",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\maintenance.form.ts:12 export const maintenanceForm:
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\maintenance.form.ts:15 module: "maintenance",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\paiements.form.ts:11 export const paiementsForm:
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\paiements.form.ts:14 module: "paiements",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\paiements.form.ts:28 name: "modePaiement",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\paiements.form.ts:29 label: "Mode paiement",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\terrains.form.ts:12 export const terrainsForm:
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\terrains.form.ts:15 module: "terrains",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\terrains.form.ts:24 label: "Nom du terrain",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\terrains.form.ts:30 label: "Type de terrain",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:3 terrains: {
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:5 "terrain-creation-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:8 "terrain.read",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:9 "terrain.create",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:10 "terrain.update",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:42 "available",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:63 maintenance: {
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:65 "maintenance-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:68 "maintenance.read",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:69 "maintenance.create",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:102 "available",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:103 "maintenance",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:108 paiements: {
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:113 "paiement.read",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:114 "paiement.create",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:118 "paid",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:119 "failed",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:9 id: "terrains",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:10 label: "terrains",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:11 domain: "terrains",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:33 domain: "exploitations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:55 domain: "stocks",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:77 domain: "contrats",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:97 id: "maintenance",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:98 label: "maintenance",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:99 domain: "maintenance",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:121 domain: "interventions",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:143 domain: "materiels",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:163 id: "paiements",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:164 label: "paiements",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:165 domain: "paiements",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:189 domain: "campagnes",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:3 terrains: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:4 "terrain-creation-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:5 "terrain-update-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:21 maintenance: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:22 "maintenance-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:23 "preventive-maintenance-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:32 "materiel-repair-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:35 paiements: [
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\TerrainsBusinessSchema.ts:5 export const TerrainsBusinessSchema:
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\TerrainsBusinessSchema.ts:8 module: "terrains",
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\TerrainsBusinessSchema.ts:10 label: "Terrains",
C:\Users\Admin\terragest\src\_quarantine\sidebar\AppSidebar.tsx:40 label: "AI Assistant",
C:\Users\Admin\terragest\src\_quarantine\sidebar\AppSidebar.tsx:41 href: "/ai-assistant",
C:\Users\Admin\terragest\src\_quarantine\sidebar\ERPSidebar.tsx:14 "Terrains",
C:\Users\Admin\terragest\src\_quarantine\sidebar\ERPSidebar.tsx:24 "Maintenance",
C:\Users\Admin\terragest\src\_quarantine\sidebar\ERPSidebar.tsx:28 "Paiements",
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\StockAlertListener.ts:25 `Stock faible pour ${payload.nom}`
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:21 await addDoc(
```

# MODULE FACTORIES


## createBusinessModule usages

```txt
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:3 createBusinessModule,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:9 createBusinessModule({
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:15 createBusinessModule({
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:21 createBusinessModule({
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:27 createBusinessModule({
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:33 createBusinessModule({
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:39 createBusinessModule({
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:85 createBusinessModule({
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:91 createBusinessModule({
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:96 createBusinessModule({
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:142 createBusinessModule({
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:148 createBusinessModule({
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:12 export function createBusinessModule(
C:\Users\Admin\terragest\src\runtime\modules\factory\index.ts:1 export * from "./createBusinessModule";
```

## businessFields usages

```txt
C:\Users\Admin\terragest\src\components\crud\EntityForm.tsx:10 fields: Field[];
C:\Users\Admin\terragest\src\components\crud\EntityForm.tsx:23 fields,
C:\Users\Admin\terragest\src\components\crud\EntityForm.tsx:39 {fields.map((field) => (
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:29 <th className="px-4 py-3 text-left font-semibold text-slate-600">Fields</th>
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:42 <td className="px-4 py-3 text-slate-600">{module.schema.fields.length}</td>
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:24 module.schema.fields.forEach((field: ERPModuleField) => {
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:58 const field = module.schema.fields.find(
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:49 const fields =
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:85 {fields.map((field) => (
C:\Users\Admin\terragest\src\components\erp\forms\ERPFormRenderer.tsx:15 {schema.fields.map((field) => (
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:66 form.fields.forEach((field) => {
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:85 }, [form.fields, formValues]);
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:87 const visibleFields =
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:88 form.fields.filter((field) =>
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:95 const mainFields =
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:96 visibleFields.filter(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:100 const relationFields =
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:101 visibleFields.filter(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:133 visibleFields.forEach((field) => {
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:285 {mainFields.map((field) => (
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:296 {relationFields.length > 0 && (
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:301 {relationFields.map((field) => (
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx:12 const requiredFields = module.schema.fields.filter(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx:28 <ERPBadge tone="info">{module.schema.fields.length} champs</ERPBadge>
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx:29 <ERPBadge tone="warning">{requiredFields.length} obligatoires</ERPBadge>
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:35 const fields =
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:36 module.schema.fields;
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:44 const visibleFields =
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:45 fields.filter(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:47 activeTabConfig?.fields.includes(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:92 {visibleFields.map((field) => (
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:103 {visibleFields.length === 0 ? (
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:23 {details.fields.map((field) => (
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:18 {form.fields.map((field) => {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:17 module.schema.fields.forEach((field: ERPModuleField) => {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:47 const field = module.schema.fields.find(
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPDataTableRuntime.tsx:27 {schema.fields.map((field) => (
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPDataTableRuntime.tsx:41 {schema.fields.map((field) => (
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeModulePage.tsx:43 <ERPStatCard label="Schema" value="OK" helper={`${schema.fields.length} champs`} />
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:71 Fields
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:101 {module.schema.fields.length}
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:121 <ERPStatCard label="Schema" value="OK" helper={`${schema.fields.length} champs`} />
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceContextPanel.tsx:31 <p className="mt-1 text-slate-950">{module.schema.fields.length}</p>
C:\Users\Admin\terragest\src\core\schemas\exploitations.schema.ts:11 fields: [
C:\Users\Admin\terragest\src\core\schemas\materiels.schema.ts:11 fields: [
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:11 fields: [
C:\Users\Admin\terragest\src\core\schemas\types.ts:37 fields: ERPField[];
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:80 fields={[
C:\Users\Admin\terragest\src\features\produits\components\ProductForm.tsx:46 fields={[
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:49 if (!module.fields || module.fields.length === 0) {
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:53 code: "MISSING_FIELDS",
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:55 recommendation: "Ajouter fields dans ERPModuleDefinition.",
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:10 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:28 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:50 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:74 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:103 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:129 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:156 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:176 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:197 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:217 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:235 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:255 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:275 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:298 fields: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:319 fields: [
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:83 code: "EXPLOITATION_TYPE_REQUIRES_DYNAMIC_FIELDS",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:100 code: "EXPLOITATION_CONTRACT_REQUIRED_FIELDS",
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormEngine.ts:13 const fields: DynamicField[] = [
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormEngine.ts:60 fields.push({
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormEngine.ts:74 fields.push({
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormEngine.ts:87 fields.push({
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormEngine.ts:95 return fields;
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:51 .fields
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:36 fields?: ERPField[];
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:38 fields?: ERPField[];
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:52 const fields = useMemo(() => {
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:53 return module?.schema?.fields ?? module?.fields ?? [];
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:64 const relationFields = fields.filter(
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:70 for (const field of relationFields) {
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:97 }, [fields]);
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:110 if (fields.length === 0) {
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:121 Champs détectés : {fields.length}
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:124 {fields.map((field) => (
C:\Users\Admin\terragest\src\runtime\generation\ERPFormGenerationEngine.ts:19 fields:
C:\Users\Admin\terragest\src\runtime\generation\ERPFormGenerationEngine.ts:27 fields: ERPFormField[]
C:\Users\Admin\terragest\src\runtime\generation\ERPFormGenerationEngine.ts:32 fields,
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataGenerationBridge.ts:29 module.fields
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataGenerationBridge.ts:36 module.fields.map(
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataRegistry.ts:25 fields:
C:\Users\Admin\terragest\src\runtime\metadata\ERPModuleSchemas.ts:15 fields: [
C:\Users\Admin\terragest\src\runtime\metadata\ERPModuleSchemas.ts:47 fields: [
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:53 fields: string[];
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:51 fields: ERPModuleField[];
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:103 fields:
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:104 module.schema.fields.map((field) => ({
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:20 fields: ERPModuleField[];
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:26 fields: ERPModuleField[];
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:41 columns: module.schema.fields
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:57 fields: module.schema.fields.filter(
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:67 fields: module.schema.fields.filter(
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:4 clientFields, commandeFields, utilisateurFields, tacheFields, incidentFields, maintenanceFields, interventionFields, fournisseurFields, terrainFields, recolteFields, parcelleFields, intrantFields, mouvementFields, stockFields, produitFields, vehiculeFields, employeFields, achatFields, livraisonFields, recetteFields, depenseFields, devisFields, factureFields,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:12 fields: utilisateurFields,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:18 fields: fournisseurFields,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:25 fields: clientFields,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:31 fields: devisFields,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:37 fields: achatFields,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:42 fields: tacheFields,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:75 fields: [
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:89 fields: vehiculeFields,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:94 fields: parcelleFields,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:99 fields: recolteFields,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:132 fields: [
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:146 fields: depenseFields,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:152 fields: recetteFields,
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:1 export const clientFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:15 export const commandeFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:27 export const factureFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:46 export const devisFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:59 export const depenseFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:73 export const recetteFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:81 export const livraisonFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:90 export const achatFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:99 export const employeFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:108 export const vehiculeFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:118 export const produitFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:158 export const stockFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:188 export const mouvementFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:218 export const terrainFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:253 export const parcelleFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:276 export const recolteFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:299 export const intrantFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:322 export const fournisseurFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:345 export const interventionFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:368 export const maintenanceFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:391 export const incidentFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:414 export const tacheFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:437 export const utilisateurFields = [
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:9 fields?: any[];
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:84 fields:
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:85 options.fields ??
C:\Users\Admin\terragest\src\runtime\modules\factory\index.ts:2 export * from "./businessFields";
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPModuleAuditor.ts:36 if (!module.schema.fields.length) {
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPModuleAuditor.ts:39 `[FIELDS_MISSING] ${moduleKey}`
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:24 return module.schema.fields.filter(
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:51 for (const field of module.schema.fields) {
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:42 fields: ERPModuleField[];
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleDetailRenderer.tsx:22 {module.fields.map((field) => (
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleListRenderer.tsx:14 const visibleFields = module.fields.slice(0, 6);
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleListRenderer.tsx:27 {visibleFields.map((field) => (
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleListRenderer.tsx:42 colSpan={visibleFields.length || 1}
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleListRenderer.tsx:52 {visibleFields.map((field) => (
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:145 fields: ERPModuleField[];
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:85 module.schema.fields.forEach((field) => {
C:\Users\Admin\terragest\src\runtime\schemas\ERPBusinessSchema.ts:23 fields:
C:\Users\Admin\terragest\src\runtime\schemas\ERPBusinessSchemaRegistry.ts:36 fields: schema.fields.map((field) => ({
C:\Users\Admin\terragest\src\runtime\ui\ERPDynamicFormFactory.tsx:28 schema.fields.map(
C:\Users\Admin\terragest\src\runtime\ui\ERPDynamicTableFactory.tsx:22 columns={schema.fields.map(field => ({
C:\Users\Admin\terragest\src\runtime\ui-generation\ERPGeneratedSchema.ts:7 fields: ERPFieldDefinition[];
C:\Users\Admin\terragest\src\runtime\ui-generation\ERPGeneratedSchemaResolver.ts:24 fields: [
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationEngine.ts:22 module.schema.fields.forEach(
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\exploitations.form.ts:21 const fields: DynamicField[] = [
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\exploitations.form.ts:43 fields.push({
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\exploitations.form.ts:50 return fields;
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\interventions.form.ts:21 const fields: DynamicField[] = [
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\interventions.form.ts:47 fields.push({
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\interventions.form.ts:55 return fields;
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\maintenance.form.ts:21 const fields: DynamicField[] = [
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\maintenance.form.ts:50 fields.push({
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\maintenance.form.ts:64 return fields;
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\materiels.form.ts:21 const fields: DynamicField[] = [
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\materiels.form.ts:43 fields.push({
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\materiels.form.ts:55 return fields;
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\terrains.form.ts:21 const fields: DynamicField[] = [
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\terrains.form.ts:48 fields.push({
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\terrains.form.ts:55 return fields;
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\ExploitationsBusinessSchema.ts:12 fields: [
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\MaterielsBusinessSchema.ts:12 fields: [
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\ProduitsBusinessSchema.ts:12 fields: [
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\StocksBusinessSchema.ts:12 fields: [
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\TerrainsBusinessSchema.ts:12 fields: [
```

# ARCHITECTURE RISKS


## Potential legacy module pages

```txt
C:\Users\Admin\terragest\src\app\layout.tsx:10 export default function RootLayout({
C:\Users\Admin\terragest\src\app\page.tsx:3 export default function HomePage() {
C:\Users\Admin\terragest\src\app\(private)\layout.tsx:9 export default function PrivateLayout({ children }: Props) {
C:\Users\Admin\terragest\src\app\(private)\page.tsx:3 export default function DashboardPage() {
C:\Users\Admin\terragest\src\app\(private)\achats\page.tsx:9 export default function AchatsPage() {
C:\Users\Admin\terragest\src\app\(private)\achats\nouveau\page.tsx:9 export default function AchatCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\ai-runtime\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\automation\page.tsx:5 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\billing\page.tsx:4 export default function BillingPage() {
C:\Users\Admin\terragest\src\app\(private)\clients\page.tsx:9 export default function ClientsPage() {
C:\Users\Admin\terragest\src\app\(private)\clients\nouveau\page.tsx:9 export default function ClientCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\commandes\page.tsx:9 export default function CommandesPage() {
C:\Users\Admin\terragest\src\app\(private)\commandes\nouveau\page.tsx:9 export default function CommandeCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\compliance\page.tsx:5 export default function CompliancePage() {
C:\Users\Admin\terragest\src\app\(private)\contrats\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\contrats\audit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\contrats\export\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\contrats\import\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\contrats\nouveau\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\contrats\relations\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\contrats\workflows\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\contrats\[id]\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\contrats\[id]\edit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\dashboard\page.tsx:32 export default function DashboardPage() {
C:\Users\Admin\terragest\src\app\(private)\depenses\page.tsx:9 export default function DepensesPage() {
C:\Users\Admin\terragest\src\app\(private)\depenses\nouveau\page.tsx:9 export default function DepensesCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\devis\page.tsx:9 export default function DevisPage() {
C:\Users\Admin\terragest\src\app\(private)\devis\nouveau\page.tsx:9 export default function DevisCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\employes\page.tsx:9 export default function EmployesPage() {
C:\Users\Admin\terragest\src\app\(private)\employes\nouveau\page.tsx:9 export default function EmployesCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\exploitations\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\exploitations\audit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\exploitations\details\page.tsx:26 export default function ExploitationDetailsPage() {
C:\Users\Admin\terragest\src\app\(private)\exploitations\export\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\exploitations\import\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\exploitations\nouveau\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\exploitations\relations\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\exploitations\workflows\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\exploitations\[id]\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\exploitations\[id]\edit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\factures\page.tsx:9 export default function FacturesPage() {
C:\Users\Admin\terragest\src\app\(private)\factures\nouveau\page.tsx:9 export default function FacturesCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\page.tsx:5 export default function FournisseursPage() {
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\nouveau\page.tsx:5 export default function CreateFournisseursPage() {
C:\Users\Admin\terragest\src\app\(private)\incidents\page.tsx:9 export default function IncidentsPage() {
C:\Users\Admin\terragest\src\app\(private)\incidents\nouveau\page.tsx:9 export default function IncidentsCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\interventions\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\interventions\audit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\interventions\export\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\interventions\import\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\interventions\nouveau\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\interventions\relations\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:12 export default function InterventionWorkflowPage() {
C:\Users\Admin\terragest\src\app\(private)\interventions\workflows\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\interventions\[id]\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\interventions\[id]\edit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\intrants\page.tsx:9 export default function IntrantsPage() {
C:\Users\Admin\terragest\src\app\(private)\intrants\nouveau\page.tsx:9 export default function IntrantsCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\livraisons\page.tsx:9 export default function LivraisonsPage() {
C:\Users\Admin\terragest\src\app\(private)\livraisons\nouveau\page.tsx:9 export default function LivraisonsCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\maintenance\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\maintenance\audit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\maintenance\export\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\maintenance\import\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\maintenance\nouveau\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\maintenance\relations\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\maintenance\workflows\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\maintenance\[id]\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\maintenance\[id]\edit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\materiels\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\materiels\audit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\materiels\export\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\materiels\import\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\materiels\nouveau\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\materiels\pannes\nouveau\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\materiels\relations\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\materiels\workflows\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\materiels\[id]\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\materiels\[id]\edit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\monitoring\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\notifications\page.tsx:4 export default function
C:\Users\Admin\terragest\src\app\(private)\observability\page.tsx:5 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\offline\page.tsx:7 export default function
C:\Users\Admin\terragest\src\app\(private)\operations\page.tsx:18 export default function OperationsPage() {
C:\Users\Admin\terragest\src\app\(private)\organization-analytics\page.tsx:7 export default function
C:\Users\Admin\terragest\src\app\(private)\paiements\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\paiements\audit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\paiements\export\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\paiements\import\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\paiements\nouveau\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\paiements\relations\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\paiements\workflows\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\paiements\[id]\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\paiements\[id]\edit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\parcelles\page.tsx:9 export default function ParcellesPage() {
C:\Users\Admin\terragest\src\app\(private)\parcelles\nouveau\page.tsx:9 export default function ParcellesCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\persistence\page.tsx:5 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\platform\page.tsx:5 export default function PlatformPage() {
C:\Users\Admin\terragest\src\app\(private)\production\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\produits\page.tsx:3 export default function ProduitsPage() {
C:\Users\Admin\terragest\src\app\(private)\produits\audit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\produits\export\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\produits\import\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\produits\nouveau\page.tsx:3 export default function NouveauProduitPage() {
C:\Users\Admin\terragest\src\app\(private)\produits\relations\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\produits\workflows\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\produits\[id]\page.tsx:3 export default function ProduitDetailPage({
C:\Users\Admin\terragest\src\app\(private)\produits\[id]\edit\page.tsx:3 export default function EditProduitPage({
C:\Users\Admin\terragest\src\app\(private)\pwa\page.tsx:7 export default function PWAPage() {
C:\Users\Admin\terragest\src\app\(private)\realtime\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\recettes\page.tsx:9 export default function RecettesPage() {
C:\Users\Admin\terragest\src\app\(private)\recettes\nouveau\page.tsx:9 export default function RecettesCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\recoltes\page.tsx:9 export default function RecoltesPage() {
C:\Users\Admin\terragest\src\app\(private)\recoltes\nouveau\page.tsx:9 export default function RecoltesCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\resilience\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\runtime-cockpit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\runtime-registry\page.tsx:5 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\runtime-supervision\page.tsx:6 export default function RuntimeSupervisionPage() {
C:\Users\Admin\terragest\src\app\(private)\security\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\stocks\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\stocks\audit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\stocks\export\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\stocks\import\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\stocks\new\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\stocks\nouveau\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\stocks\relations\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\stocks\workflows\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\stocks\[id]\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\stocks\[id]\edit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\streams\page.tsx:5 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\supervision\page.tsx:3 export default function SupervisionPage() {
C:\Users\Admin\terragest\src\app\(private)\taches\page.tsx:9 export default function TachesPage() {
C:\Users\Admin\terragest\src\app\(private)\taches\nouveau\page.tsx:9 export default function TachesCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\team\page.tsx:7 export default function TeamPage() {
C:\Users\Admin\terragest\src\app\(private)\tenants\page.tsx:5 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\terrains\page.tsx:4 export default function TerrainsPage() {
C:\Users\Admin\terragest\src\app\(private)\terrains\audit\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\terrains\export\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\terrains\import\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\terrains\nouveau\page.tsx:3 export default function NouveauTerrainPage() {
C:\Users\Admin\terragest\src\app\(private)\terrains\relations\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\terrains\workflows\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\testing\page.tsx:5 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\vehicules\page.tsx:9 export default function VehiculesPage() {
C:\Users\Admin\terragest\src\app\(private)\vehicules\nouveau\page.tsx:9 export default function VehiculesCreatePage() {
C:\Users\Admin\terragest\src\app\(private)\workers\page.tsx:5 export default function Page() {
C:\Users\Admin\terragest\src\app\(private)\workflows-runtime\page.tsx:3 export default function Page() {
C:\Users\Admin\terragest\src\app\billing\success\page.tsx:1 export default function
C:\Users\Admin\terragest\src\app\enterprise\page.tsx:1 export default function EnterprisePage() {
C:\Users\Admin\terragest\src\app\login\page.tsx:14 export default function LoginPage() {
C:\Users\Admin\terragest\src\components\auth\PrivateGuard.tsx:21 export default function PrivateGuard({
C:\Users\Admin\terragest\src\features\materiels\dashboard\MaterielsDashboard.tsx:1 export default function
C:\Users\Admin\terragest\src\features\materiels\ui\MaterielsDashboard.tsx:1 export default function
C:\Users\Admin\terragest\src\features\observability\components\RuntimeStatusCard.tsx:4 export default function
C:\Users\Admin\terragest\src\features\observability\dashboards\LiveRuntimeDashboard.tsx:3 export default function LiveRuntimeDashboard() {
C:\Users\Admin\terragest\src\features\observability\dashboards\RuntimeHealthDashboard.tsx:13 export default function
C:\Users\Admin\terragest\src\features\observability\widgets\DeadLetterPanel.tsx:1 export default function
C:\Users\Admin\terragest\src\features\observability\widgets\EventStream.tsx:1 export default function EventStream() {
C:\Users\Admin\terragest\src\features\observability\widgets\RetryMonitor.tsx:1 export default function RetryMonitor() {
C:\Users\Admin\terragest\src\features\observability\widgets\live\DeadLetterFeed.tsx:1 export default function
C:\Users\Admin\terragest\src\features\observability\widgets\live\EventReplayConsole.tsx:1 export default function
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:26 export default function LiveEventStream() {
C:\Users\Admin\terragest\src\features\observability\widgets\live\RetryActivityPanel.tsx:1 export default function
C:\Users\Admin\terragest\src\features\observability\widgets\live\WorkflowExecutionPanel.tsx:1 export default function
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:19 export default function WorkflowExecutionMonitor() {
C:\Users\Admin\terragest\src\features\platform\components\layout\EnterpriseTopbar.tsx:1 export default function EnterpriseTopbar() {
C:\Users\Admin\terragest\src\features\platform\components\navigation\EnterpriseSidebar.tsx:1 export default function
C:\Users\Admin\terragest\src\features\platform\components\notifications\NotificationCenter.tsx:1 export default function
C:\Users\Admin\terragest\src\features\platform\components\runtime\LiveActivityPanel.tsx:4 export default function
C:\Users\Admin\terragest\src\features\platform\components\runtime\RealtimeActivityPanel.tsx:1 export default function
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeActivityFeed.tsx:6 export default function
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeConsole.tsx:4 export default function
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeMetricsPanel.tsx:1 export default function
C:\Users\Admin\terragest\src\features\platform\components\runtime\WorkflowStatusPanel.tsx:1 export default function
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:13 export default function
C:\Users\Admin\terragest\src\features\platform\dashboards\EnterpriseSupervisionDashboard.tsx:7 export default function
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:13 export default function
C:\Users\Admin\terragest\src\features\platform\shell\EnterpriseShell.tsx:4 export default function
C:\Users\Admin\terragest\src\features\platform\workspace\ConnectedEnterpriseWorkspace.tsx:10 export default function
C:\Users\Admin\terragest\src\features\platform\workspace\EnterpriseWorkspace.tsx:10 export default function
C:\Users\Admin\terragest\src\shared\tables\EnterpriseDataTable.tsx:1 export default function EnterpriseDataTable() {
C:\Users\Admin\terragest\src\ui\shell\EnterpriseShell.tsx:1 export default function EnterpriseShell() {
C:\Users\Admin\terragest\src\_quarantine\layout\PrivateShell.tsx:12 export default function PrivateShell({
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\pages\page.tsx:1 export default function AlertesPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\pages\nouveau\page.tsx:1 export default function NouveauAlertesPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\pages\[id]\page.tsx:1 export default function AlertesDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\pages\[id]\edit\page.tsx:1 export default function EditAlertesPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\pages\page.tsx:1 export default function AnalyticsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\pages\nouveau\page.tsx:1 export default function NouveauAnalyticsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\pages\[id]\page.tsx:1 export default function AnalyticsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\pages\[id]\edit\page.tsx:1 export default function EditAnalyticsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\pages\page.tsx:1 export default function ClientsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\pages\nouveau\page.tsx:1 export default function NouveauClientsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\pages\[id]\page.tsx:1 export default function ClientsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\pages\[id]\edit\page.tsx:1 export default function EditClientsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\pages\page.tsx:1 export default function ContratsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\pages\nouveau\page.tsx:1 export default function NouveauContratsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\pages\[id]\page.tsx:1 export default function ContratsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\pages\[id]\edit\page.tsx:1 export default function EditContratsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\pages\page.tsx:1 export default function ExploitationsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\pages\nouveau\page.tsx:1 export default function NouveauExploitationsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\pages\[id]\page.tsx:1 export default function ExploitationsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\pages\[id]\edit\page.tsx:1 export default function EditExploitationsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\pages\page.tsx:1 export default function FacturesPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\pages\nouveau\page.tsx:1 export default function NouveauFacturesPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\pages\[id]\page.tsx:1 export default function FacturesDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\pages\[id]\edit\page.tsx:1 export default function EditFacturesPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\pages\page.tsx:1 export default function FournisseursPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\pages\nouveau\page.tsx:1 export default function NouveauFournisseursPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\pages\[id]\page.tsx:1 export default function FournisseursDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\pages\[id]\edit\page.tsx:1 export default function EditFournisseursPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\pages\page.tsx:1 export default function InterventionsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\pages\nouveau\page.tsx:1 export default function NouveauInterventionsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\pages\[id]\page.tsx:1 export default function InterventionsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\pages\[id]\edit\page.tsx:1 export default function EditInterventionsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\pages\page.tsx:1 export default function MaintenancePage() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\pages\nouveau\page.tsx:1 export default function NouveauMaintenancePage() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\pages\[id]\page.tsx:1 export default function MaintenanceDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\pages\[id]\edit\page.tsx:1 export default function EditMaintenancePage() {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\pages\page.tsx:1 export default function MaterielsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\pages\nouveau\page.tsx:1 export default function NouveauMaterielsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\pages\[id]\page.tsx:1 export default function MaterielsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\pages\[id]\edit\page.tsx:1 export default function EditMaterielsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\pages\page.tsx:1 export default function MobilePage() {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\pages\nouveau\page.tsx:1 export default function NouveauMobilePage() {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\pages\[id]\page.tsx:1 export default function MobileDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\pages\[id]\edit\page.tsx:1 export default function EditMobilePage() {
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\pages\page.tsx:1 export default function MonitoringPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\pages\nouveau\page.tsx:1 export default function NouveauMonitoringPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\pages\[id]\page.tsx:1 export default function MonitoringDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\pages\[id]\edit\page.tsx:1 export default function EditMonitoringPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\pages\page.tsx:1 export default function MouvementsStockPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\pages\nouveau\page.tsx:1 export default function NouveauMouvementsStockPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\pages\[id]\page.tsx:1 export default function MouvementsStockDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\pages\[id]\edit\page.tsx:1 export default function EditMouvementsStockPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\pages\page.tsx:1 export default function PaiementsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\pages\nouveau\page.tsx:1 export default function NouveauPaiementsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\pages\[id]\page.tsx:1 export default function PaiementsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\pages\[id]\edit\page.tsx:1 export default function EditPaiementsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\pages\page.tsx:1 export default function ParcellesPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\pages\nouveau\page.tsx:1 export default function NouveauParcellesPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\pages\[id]\page.tsx:1 export default function ParcellesDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\pages\[id]\edit\page.tsx:1 export default function EditParcellesPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\pages\page.tsx:1 export default function ProductionsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\pages\nouveau\page.tsx:1 export default function NouveauProductionsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\pages\[id]\page.tsx:1 export default function ProductionsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\pages\[id]\edit\page.tsx:1 export default function EditProductionsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\pages\page.tsx:1 export default function RecoltesPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\pages\nouveau\page.tsx:1 export default function NouveauRecoltesPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\pages\[id]\page.tsx:1 export default function RecoltesDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\pages\[id]\edit\page.tsx:1 export default function EditRecoltesPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\pages\page.tsx:1 export default function StocksPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\pages\nouveau\page.tsx:1 export default function NouveauStocksPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\pages\[id]\page.tsx:1 export default function StocksDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\pages\[id]\edit\page.tsx:1 export default function EditStocksPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\pages\page.tsx:1 export default function SyncPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\pages\nouveau\page.tsx:1 export default function NouveauSyncPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\pages\[id]\page.tsx:1 export default function SyncDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\pages\[id]\edit\page.tsx:1 export default function EditSyncPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\pages\page.tsx:1 export default function TerrainsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\pages\nouveau\page.tsx:1 export default function NouveauTerrainsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\pages\[id]\page.tsx:1 export default function TerrainsDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\pages\[id]\edit\page.tsx:1 export default function EditTerrainsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\pages\page.tsx:1 export default function UtilisateursPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\pages\nouveau\page.tsx:1 export default function NouveauUtilisateursPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\pages\[id]\page.tsx:1 export default function UtilisateursDetailsPage() {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\pages\[id]\edit\page.tsx:1 export default function EditUtilisateursPage() {
C:\Users\Admin\terragest\src\_quarantine\sidebar\sidebar\ERPSidebar.tsx:1 export default function ERPSidebar() {
C:\Users\Admin\terragest\src\_quarantine\topbar\topbar\ERPTopbar.tsx:1 export default function ERPTopbar() {
```

## Potential duplicated loaders

```txt
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:43 await ERPRelationDataLoader.load(
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:57 await ERPRelationDataLoader.load(
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:25 async load() {
C:\Users\Admin\terragest\src\features\notifications\hooks\useNotifications.ts:26 async function load() {
C:\Users\Admin\terragest\src\features\notifications\hooks\useNotifications.ts:35 load();
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:26 async function load() {
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:35 load();
C:\Users\Admin\terragest\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx:19 async function load() {
C:\Users\Admin\terragest\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx:28 load();
C:\Users\Admin\terragest\src\features\organization-analytics\components\PlanUsageCard.tsx:19 async function load() {
C:\Users\Admin\terragest\src\features\organization-analytics\components\PlanUsageCard.tsx:28 load();
C:\Users\Admin\terragest\src\hooks\useRealtime.ts:34 load();
C:\Users\Admin\terragest\src\platform\bootstrap\loadDomains.ts:25 await load();
C:\Users\Admin\terragest\src\platform\runtime\RuntimeBootstrap.ts:14 await MaterielsStore.load();
C:\Users\Admin\terragest\src\runtime\data\event-store\PersistentEventStore.ts:31 load(
C:\Users\Admin\terragest\src\runtime\data\event-store\PersistentEventStore.ts:46 this.load(stream);
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:80 await ERPRelationDataLoader.load(typeof targetModule === "string" ? targetModule : targetModule.module);
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:5 static async load(moduleKey: string) {
C:\Users\Admin\terragest\src\runtime\selects\ERPDynamicSelect.tsx:46 async function load() {
C:\Users\Admin\terragest\src\runtime\selects\ERPDynamicSelect.tsx:58 load();
```

## Potential duplicated repositories

```txt
C:\Users\Admin\terragest\src\analytics\repositories\AnalyticsRepository.ts:10 export const AnalyticsRepository = {
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:34 description="Repository runtime tenant-aware pour events, traces, alerts, workflows, queue jobs et audit."
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:8 ProductsRepository,
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:9 } from "@/lib/firestore/repositories/ProductsRepository";
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:32 await ProductsRepository.create({
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:1 // src/domains/materiels/repositories/MaterielsRepository.ts
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:4 BaseFirestoreRepository
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:6 from "@/infrastructure/repositories/firestore/BaseFirestoreRepository";
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:13 export class MaterielsRepository
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:14 extends BaseFirestoreRepository<MaterielItem> {
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:24 export const materielsRepository =
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:25 new MaterielsRepository();
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:4 materielsRepository
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:6 from "@/domains/materiels/repositories/MaterielsRepository";
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:28 await materielsRepository
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:42 materielsRepository.subscribe(
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:65 await materielsRepository
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:107 await materielsRepository
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:7 class BillingRepositoryClass
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:8 extends BaseRepository<Subscription> {
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:16 export const BillingRepository =
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:17 new BillingRepositoryClass();
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:4 import { BillingRepository }
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:5 from "@/features/billing/repositories/BillingRepository";
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:52 BillingRepository.getAll();
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:61 BillingRepository.update(
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:21 ExploitationsRepository,
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:22 } from "@/features/exploitations/repositories/ExploitationsRepository";
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:103 await ExploitationsRepository.update(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationRepository.ts:15 export const ExploitationRepository = {
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:26 export const ExploitationsRepository = {
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:21 FirestoreExploitationRepository {
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:2 FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:4 from "../repositories/firestore/FirestoreExploitationRepository";
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:15 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:21 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:29 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:41 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:49 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationsService.ts:6 ExploitationsRepository,
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationsService.ts:7 } from "@/features/exploitations/repositories/ExploitationsRepository";
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationsService.ts:20 return ExploitationsRepository.create(
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:2 FirestoreFournisseursRepository
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:4 from "../infrastructure/FirestoreFournisseursRepository";
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:15 return FirestoreFournisseursRepository.create(
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:21 return FirestoreFournisseursRepository.getAll();
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:27 return FirestoreFournisseursRepository.getById(
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:36 return FirestoreFournisseursRepository.update(
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:45 return FirestoreFournisseursRepository.delete(
C:\Users\Admin\terragest\src\features\fournisseurs\domain\FournisseursRepository.ts:6 export interface FournisseursRepository {
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:21 FournisseursRepository
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:23 from "../domain/FournisseursRepository";
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:25 class FirestoreRepository
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:27 FournisseursRepository {
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:134 FirestoreFournisseursRepository =
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:135 new FirestoreRepository();
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:21 FirestoreInterventionRepository {
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:2 FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:4 from "../repositories/firestore/FirestoreInterventionRepository";
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:15 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:21 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:29 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:41 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:49 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:7 class InvitationsRepositoryClass
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:8 extends BaseRepository<Invitation> {
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:16 export const InvitationsRepository =
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:17 new InvitationsRepositoryClass();
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:4 import { InvitationsRepository }
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:5 from "@/features/invitations/repositories/InvitationsRepository";
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:7 import { MembershipsRepository }
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:8 from "@/features/memberships/repositories/MembershipsRepository";
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:24 InvitationsRepository.create(
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:34 InvitationsRepository.update(
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:49 await InvitationsRepository.getAll()
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:86 await MembershipsRepository.create({
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:97 await InvitationsRepository.update(
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:110 InvitationsRepository.getAll();
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:2 FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:4 from "../repositories/firestore/FirestoreMaterielRepository";
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:15 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:21 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:29 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:41 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:49 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\domain\MaterielRepository.ts:4 export interface MaterielRepository {
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:21 FirestoreMaterielRepository {
C:\Users\Admin\terragest\src\features\materiels\repositories\MaterielRepository.ts:4 export interface MaterielRepository {
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:21 FirestoreMaterielRepository {
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:2 FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:4 from "../repositories/firestore/FirestoreMaterielRepository";
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:15 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:21 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:29 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:41 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:49 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:7 class MembershipsRepositoryClass
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:8 extends BaseRepository<Membership> {
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:16 export const MembershipsRepository =
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:17 new MembershipsRepositoryClass();
C:\Users\Admin\terragest\src\features\memberships\services\MembershipService.ts:4 import { MembershipsRepository }
C:\Users\Admin\terragest\src\features\memberships\services\MembershipService.ts:5 from "@/features/memberships/repositories/MembershipsRepository";
C:\Users\Admin\terragest\src\features\memberships\services\MembershipService.ts:28 MembershipsRepository.create(
C:\Users\Admin\terragest\src\features\memberships\services\MembershipService.ts:36 MembershipsRepository.getAll();
C:\Users\Admin\terragest\src\features\mouvements\repositories\MouvementRepository.ts:16 export const MouvementRepository = {
C:\Users\Admin\terragest\src\features\mouvements\services\MouvementService.ts:1 import { MouvementRepository } from "../repositories/MouvementRepository";
C:\Users\Admin\terragest\src\features\mouvements\services\MouvementService.ts:11 await MouvementRepository.create(data);
C:\Users\Admin\terragest\src\features\mouvements\services\MouvementService.ts:25 return MouvementRepository.getAllByOrganisation(
C:\Users\Admin\terragest\src\features\organisations\repositories\OrganisationRepository.ts:13 export const OrganisationRepository = {
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:7 class OrganizationsRepositoryClass
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:8 extends BaseRepository<Organization> {
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:16 export const OrganizationsRepository =
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:17 new OrganizationsRepositoryClass();
C:\Users\Admin\terragest\src\features\organizations\services\OrganizationService.ts:4 import { OrganizationsRepository }
C:\Users\Admin\terragest\src\features\organizations\services\OrganizationService.ts:5 from "@/features/organizations/repositories/OrganizationsRepository";
C:\Users\Admin\terragest\src\features\organizations\services\OrganizationService.ts:21 OrganizationsRepository.create(
C:\Users\Admin\terragest\src\features\organizations\services\OrganizationService.ts:29 OrganizationsRepository.getAll();
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:17 import { ProductsRepository }
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:18 from "@/features/produits/repositories/ProductsRepository";
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:61 await ProductsRepository.update(
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:25 import { ProductsRepository }
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:26 from "@/features/produits/repositories/ProductsRepository";
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:69 await ProductsRepository.delete(
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:7 class ProductsRepositoryClass
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:8 extends BaseRepository<Product> {
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:16 export const ProductsRepository =
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:17 new ProductsRepositoryClass();
C:\Users\Admin\terragest\src\features\produits\repositories\ProduitRepository.ts:7 export class ProduitRepository {
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:21 FirestoreProduitRepository {
C:\Users\Admin\terragest\src\features\produits\services\ProductService.ts:4 import { ProductsRepository }
C:\Users\Admin\terragest\src\features\produits\services\ProductService.ts:5 from "@/features/produits/repositories/ProductsRepository";
C:\Users\Admin\terragest\src\features\produits\services\ProductService.ts:27 return await ProductsRepository.create(
C:\Users\Admin\terragest\src\features\produits\services\ProductService.ts:34 return await ProductsRepository.getAll();
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:2 FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:4 from "../repositories/firestore/FirestoreProduitRepository";
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:15 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:23 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:31 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:43 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:51 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:18 export const RessourceRepository = {
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:29 FirestoreStockRepository = {
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:3 FirestoreStockRepository
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:5 } from "@/features/stocks/repositories/firestore/FirestoreStockRepository";
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:14 return FirestoreStockRepository
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:20 return FirestoreStockRepository
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:7 import { MembershipsRepository }
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:8 from "@/features/memberships/repositories/MembershipsRepository";
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:15 MembershipsRepository.getAll();
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:23 MembershipsRepository.delete(
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:34 MembershipsRepository.update(
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:15 export const TerrainRepository = {
C:\Users\Admin\terragest\src\hooks\useCollection.ts:8 import { BaseRepository }
C:\Users\Admin\terragest\src\hooks\useCollection.ts:9 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\hooks\useCollection.ts:23 const repository =
C:\Users\Admin\terragest\src\hooks\useCollection.ts:24 new BaseRepository<T>(
C:\Users\Admin\terragest\src\hooks\useCollection.ts:29 repository.subscribe(
C:\Users\Admin\terragest\src\infrastructure\firebase\FirestoreRepository.ts:1 export class FirestoreRepository<T> {
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:1 // src/infrastructure/repositories/firestore/BaseFirestoreRepository.ts
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:24 export class BaseFirestoreRepository<T> {
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\FirestoreMaterielRepository.ts:4 import type { MaterielRepository }
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\FirestoreMaterielRepository.ts:5 from "../../../features/materiels/repositories/MaterielRepository";
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\FirestoreMaterielRepository.ts:7 export class FirestoreMaterielRepository
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\FirestoreMaterielRepository.ts:8 implements MaterielRepository {
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:15 export class BaseRepository<T> {
C:\Users\Admin\terragest\src\lib\firestore\repositories\ProductsRepository.ts:1 export const ProductsRepository = {
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:4 import { FirestoreRuntimeRepository } from "@/runtime/firestore/FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:48 return FirestoreRuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\runtime\data\ERPDataRepository.ts:9 export class ERPDataRepository {
C:\Users\Admin\terragest\src\runtime\data\ERPDataRepository.ts:97 export const erpDataRepository =
C:\Users\Admin\terragest\src\runtime\data\ERPDataRepository.ts:98 new ERPDataRepository();
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:2 erpDataRepository,
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:4 } from "./ERPDataRepository";
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:12 return erpDataRepository
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:21 return erpDataRepository
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:33 return erpDataRepository
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:46 return erpDataRepository
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:59 return erpDataRepository
C:\Users\Admin\terragest\src\runtime\data\index.ts:1 export * from "./ERPDataRepository";
C:\Users\Admin\terragest\src\runtime\data\analytics\PersistentAnalyticsEngine.ts:2 AnalyticsRepository
C:\Users\Admin\terragest\src\runtime\data\analytics\PersistentAnalyticsEngine.ts:4 from "../../persistence/analytics/AnalyticsRepository";
C:\Users\Admin\terragest\src\runtime\data\analytics\PersistentAnalyticsEngine.ts:9 private repository =
C:\Users\Admin\terragest\src\runtime\data\analytics\PersistentAnalyticsEngine.ts:10 new AnalyticsRepository();
C:\Users\Admin\terragest\src\runtime\data\analytics\PersistentAnalyticsEngine.ts:17 await this.repository.save({
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:2 WorkflowRepository
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:4 from "../persistence/workflows/WorkflowRepository";
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:9 private repository =
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:10 new WorkflowRepository();
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:17 await this.repository.save({
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:4 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:5 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:12 return FirestoreRuntimeRepository.create(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:23 return FirestoreRuntimeRepository.update(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:34 return FirestoreRuntimeRepository.delete(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:4 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:5 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:12 return FirestoreRuntimeRepository.findMany(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:21 return FirestoreRuntimeRepository.findById(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:16 export class FirestoreRuntimeRepository {
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:2 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:3 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\governance\EnterpriseGovernanceEngine.ts:63 "RepositoryPattern"
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:2 RuntimeEventRepository
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:4 from "../persistence/events/RuntimeEventRepository";
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:14 private repository =
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:15 new RuntimeEventRepository();
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:25 await this.repository.append({
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:2 AuditRepository
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:4 from "../../persistence/audit/AuditRepository";
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:9 private repository =
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:10 new AuditRepository();
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:17 await this.repository.save({
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:2 RuntimeEventRepository
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:4 from "./events/RuntimeEventRepository";
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:9 const repository =
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:10 new RuntimeEventRepository();
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:13 await repository.getAll();
C:\Users\Admin\terragest\src\runtime\persistence\index.ts:3 export * from "./repositories/ERPRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\persistence\analytics\AnalyticsRepository.ts:10 export class AnalyticsRepository {
C:\Users\Admin\terragest\src\runtime\persistence\audit\AuditRepository.ts:10 export class AuditRepository {
C:\Users\Admin\terragest\src\runtime\persistence\events\RuntimeEventRepository.ts:12 RuntimeEventRepository {
C:\Users\Admin\terragest\src\runtime\persistence\processes\ProcessRepository.ts:10 export class ProcessRepository {
C:\Users\Admin\terragest\src\runtime\persistence\projections\ProjectionRepository.ts:10 export class ProjectionRepository {
C:\Users\Admin\terragest\src\runtime\persistence\repositories\ERPRuntimeRepository.ts:18 export class ERPRuntimeRepository<T = unknown> {
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:2 ERPRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:3 } from "../repositories/ERPRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:11 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:16 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:21 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:26 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:31 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:36 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:41 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:10 export class WorkflowRepository {
C:\Users\Admin\terragest\src\runtime\processes\PersistentProcessExecutor.ts:2 ProcessRepository
C:\Users\Admin\terragest\src\runtime\processes\PersistentProcessExecutor.ts:4 from "../persistence/processes/ProcessRepository";
C:\Users\Admin\terragest\src\runtime\processes\PersistentProcessExecutor.ts:9 private repository =
C:\Users\Admin\terragest\src\runtime\processes\PersistentProcessExecutor.ts:10 new ProcessRepository();
C:\Users\Admin\terragest\src\runtime\processes\PersistentProcessExecutor.ts:17 await this.repository.save({
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:2 import { RuntimeRepository } from "@/runtime/repositories/RuntimeRepository";
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:6 return RuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:10 return RuntimeRepository.findById(module, id);
C:\Users\Admin\terragest\src\runtime\repositories\index.ts:1 export { RuntimeRepository } from "./RuntimeRepository";
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:16 export class RuntimeRepository {
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:24 return RuntimeRepository.seed(module);
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:31 const rows = await RuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\services\StockService.ts:2 FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:4 from "@/features/stocks/repositories/firestore/FirestoreStockRepository";
C:\Users\Admin\terragest\src\services\StockService.ts:15 return FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:21 return FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:29 return FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:41 return FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:49 return FirestoreStockRepository
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:13 export class BaseRepository<T> {
C:\Users\Admin\terragest\src\shared\repositories\ProductRepository.ts:1 import { BaseRepository } from "@/shared/repositories/BaseRepository";
C:\Users\Admin\terragest\src\shared\repositories\ProductRepository.ts:5 export class ProductRepository
C:\Users\Admin\terragest\src\shared\repositories\ProductRepository.ts:6 extends BaseRepository<Product> {
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:3 repository: any;
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:6 repository: any
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:9 this.repository =
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:10 repository;
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:17 return this.repository.create(
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:24 return this.repository.getAll();
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:31 return this.repository.getById(
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:41 return this.repository.update(
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:51 return this.repository.delete(
C:\Users\Admin\terragest\src\shared\services\ProductService.ts:3 import { ProductRepository } from "@/shared/repositories/ProductRepository";
C:\Users\Admin\terragest\src\shared\services\ProductService.ts:13 new ProductRepository()
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\index.ts:2 export * from "./repositories/AlertesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\repositories\AlertesRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\repositories\AlertesRepository.ts:4 export class AlertesRepository extends FirestoreRepository<AlertesDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:1 import { AlertesRepository } from "../repositories/AlertesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:5 new AlertesRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\index.ts:2 export * from "./repositories/AnalyticsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\repositories\AnalyticsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\repositories\AnalyticsRepository.ts:4 export class AnalyticsRepository extends FirestoreRepository<AnalyticsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:1 import { AnalyticsRepository } from "../repositories/AnalyticsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:5 new AnalyticsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\clients\index.ts:2 export * from "./repositories/ClientsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\repositories\ClientsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\repositories\ClientsRepository.ts:4 export class ClientsRepository extends FirestoreRepository<ClientsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:1 import { ClientsRepository } from "../repositories/ClientsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:5 new ClientsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\index.ts:2 export * from "./repositories/ContratsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\repositories\ContratsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\repositories\ContratsRepository.ts:4 export class ContratsRepository extends FirestoreRepository<ContratsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\repositories\Repository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\repositories\Repository.ts:4 export class Repository extends FirestoreRepository<DTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:1 import { ContratsRepository } from "../repositories/ContratsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:5 new ContratsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\Service.ts:1 import { Repository } from "../repositories/Repository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\Service.ts:4 private repository = new Repository();
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\index.ts:2 export * from "./repositories/ExploitationsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\repositories\ExploitationsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\repositories\ExploitationsRepository.ts:4 export class ExploitationsRepository extends FirestoreRepository<ExploitationsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:1 import { ExploitationsRepository } from "../repositories/ExploitationsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:5 new ExploitationsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\factures\index.ts:2 export * from "./repositories/FacturesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\repositories\FacturesRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\repositories\FacturesRepository.ts:4 export class FacturesRepository extends FirestoreRepository<FacturesDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:1 import { FacturesRepository } from "../repositories/FacturesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:5 new FacturesRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\index.ts:2 export * from "./repositories/FournisseursRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\repositories\FournisseursRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\repositories\FournisseursRepository.ts:4 export class FournisseursRepository extends FirestoreRepository<FournisseursDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\repositories\Repository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\repositories\Repository.ts:4 export class Repository extends FirestoreRepository<DTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:1 import { FournisseursRepository } from "../repositories/FournisseursRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:5 new FournisseursRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\Service.ts:1 import { Repository } from "../repositories/Repository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\Service.ts:4 private repository = new Repository();
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\index.ts:2 export * from "./repositories/InterventionsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\repositories\InterventionsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\repositories\InterventionsRepository.ts:4 export class InterventionsRepository extends FirestoreRepository<InterventionsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:1 import { InterventionsRepository } from "../repositories/InterventionsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:5 new InterventionsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\index.ts:2 export * from "./repositories/MaintenanceRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\repositories\MaintenanceRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\repositories\MaintenanceRepository.ts:4 export class MaintenanceRepository extends FirestoreRepository<MaintenanceDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:1 import { MaintenanceRepository } from "../repositories/MaintenanceRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:5 new MaintenanceRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\index.ts:2 export * from "./repositories/MaterielsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\repositories\MaterielsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\repositories\MaterielsRepository.ts:4 export class MaterielsRepository extends FirestoreRepository<MaterielsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:1 import { MaterielsRepository } from "../repositories/MaterielsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:5 new MaterielsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\index.ts:2 export * from "./repositories/MobileRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\repositories\MobileRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\repositories\MobileRepository.ts:4 export class MobileRepository extends FirestoreRepository<MobileDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:1 import { MobileRepository } from "../repositories/MobileRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:5 new MobileRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\index.ts:2 export * from "./repositories/MonitoringRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\repositories\MonitoringRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\repositories\MonitoringRepository.ts:4 export class MonitoringRepository extends FirestoreRepository<MonitoringDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:1 import { MonitoringRepository } from "../repositories/MonitoringRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:5 new MonitoringRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\index.ts:2 export * from "./repositories/MouvementsStockRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\repositories\MouvementsStockRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\repositories\MouvementsStockRepository.ts:4 export class MouvementsStockRepository extends FirestoreRepository<MouvementsStockDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:1 import { MouvementsStockRepository } from "../repositories/MouvementsStockRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:5 new MouvementsStockRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\index.ts:2 export * from "./repositories/PaiementsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\repositories\PaiementsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\repositories\PaiementsRepository.ts:4 export class PaiementsRepository extends FirestoreRepository<PaiementsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:1 import { PaiementsRepository } from "../repositories/PaiementsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:5 new PaiementsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\index.ts:2 export * from "./repositories/ParcellesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\repositories\ParcellesRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\repositories\ParcellesRepository.ts:4 export class ParcellesRepository extends FirestoreRepository<ParcellesDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\services\ParcellesService.ts:1 import { ParcellesRepository } from "../repositories/ParcellesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\services\ParcellesService.ts:4 private repository = new ParcellesRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\productions\index.ts:2 export * from "./repositories/ProductionsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\repositories\ProductionsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\repositories\ProductionsRepository.ts:4 export class ProductionsRepository extends FirestoreRepository<ProductionsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:1 import { ProductionsRepository } from "../repositories/ProductionsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:5 new ProductionsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\index.ts:2 export * from "./repositories/RecoltesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\repositories\RecoltesRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\repositories\RecoltesRepository.ts:4 export class RecoltesRepository extends FirestoreRepository<RecoltesDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:1 import { RecoltesRepository } from "../repositories/RecoltesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:5 new RecoltesRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\index.ts:2 export * from "./repositories/StocksRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\repositories\StocksRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\repositories\StocksRepository.ts:4 export class StocksRepository extends FirestoreRepository<StocksDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:1 import { StocksRepository } from "../repositories/StocksRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:5 new StocksRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\sync\index.ts:2 export * from "./repositories/SyncRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\repositories\SyncRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\repositories\SyncRepository.ts:4 export class SyncRepository extends FirestoreRepository<SyncDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:1 import { SyncRepository } from "../repositories/SyncRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:5 new SyncRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\index.ts:2 export * from "./repositories/TerrainsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\repositories\TerrainsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\repositories\TerrainsRepository.ts:4 export class TerrainsRepository extends FirestoreRepository<TerrainsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:1 import { TerrainsRepository } from "../repositories/TerrainsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:5 new TerrainsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\index.ts:2 export * from "./repositories/UtilisateursRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\repositories\UtilisateursRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\repositories\UtilisateursRepository.ts:4 export class UtilisateursRepository extends FirestoreRepository<UtilisateursDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:1 import { UtilisateursRepository } from "../repositories/UtilisateursRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:5 new UtilisateursRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:14 export const WorkflowProductsRepository = {
```

# FINAL ANALYSIS

- Runtime normalization status :
- Runtime consistency status :
- Remaining legacy patterns :
- Remaining architectural risks :
- Priority consolidations :
- Runtime industrialization maturity :
