# REPOSITORY GOVERNANCE AUDIT

Date : 05/12/2026 16:31:35

## collection() usages

Count : 106

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
