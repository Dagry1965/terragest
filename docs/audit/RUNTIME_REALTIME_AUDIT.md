# TERRAGEST ERP RUNTIME REALTIME AUDIT

Date : 2026-05-12 16:36:25


## onSnapshot usages

```txt
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:10 onSnapshot,
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:50 onSnapshot(
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:4 onSnapshot,
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:49 return onSnapshot(
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:4 onSnapshot,
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:39 return onSnapshot(
C:\Users\Admin\terragest\src\hooks\useDocument.ts:5 onSnapshot,
C:\Users\Admin\terragest\src\hooks\useDocument.ts:35 onSnapshot(
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:5 onSnapshot,
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:63 onSnapshot(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:15 onSnapshot,
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:121 return onSnapshot(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:8 onSnapshot,
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:108 return onSnapshot(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:21 return onSnapshot(
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:10 onSnapshot,
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:48 onSnapshot(
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:10 onSnapshot,
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:48 onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\subscribeToAlertes.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\subscribeToAlertes.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\subscribeToClients.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\subscribeToClients.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\subscribeToContrats.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\subscribeToContrats.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\subscribeToExploitations.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\subscribeToExploitations.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\subscribeToFactures.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\subscribeToFactures.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\subscribeToFournisseurs.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\subscribeToFournisseurs.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\subscribeToInterventions.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\subscribeToInterventions.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\subscribeToMaintenance.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\subscribeToMaintenance.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\subscribeToMateriels.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\subscribeToMateriels.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\subscribeToMobile.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\subscribeToMobile.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\subscribeToMouvementsStock.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\subscribeToMouvementsStock.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\subscribeToPaiements.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\subscribeToPaiements.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\subscribeToProductions.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\subscribeToProductions.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\subscribeToRecoltes.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\subscribeToRecoltes.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\subscribeToSync.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\subscribeToSync.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\subscribeToTerrains.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\subscribeToTerrains.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\subscribeToUtilisateurs.ts:3 onSnapshot,
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\subscribeToUtilisateurs.ts:11 return onSnapshot(
```

## subscribeTo usages

```txt
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:34 subscribeToRuntimeEvents() {
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:34 service.subscribeToRuntimeEvents();
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\subscribeToAlertes.ts:8 export function subscribeToAlertes(
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\subscribeToClients.ts:8 export function subscribeToClients(
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\subscribeToContrats.ts:8 export function subscribeToContrats(
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\subscribeToExploitations.ts:8 export function subscribeToExploitations(
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\subscribeToFactures.ts:8 export function subscribeToFactures(
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\subscribeToFournisseurs.ts:8 export function subscribeToFournisseurs(
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\subscribeToInterventions.ts:8 export function subscribeToInterventions(
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\subscribeToMaintenance.ts:8 export function subscribeToMaintenance(
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\subscribeToMateriels.ts:8 export function subscribeToMateriels(
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\subscribeToMobile.ts:8 export function subscribeToMobile(
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\subscribeToMouvementsStock.ts:8 export function subscribeToMouvementsStock(
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\subscribeToPaiements.ts:8 export function subscribeToPaiements(
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\subscribeToProductions.ts:8 export function subscribeToProductions(
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\subscribeToRecoltes.ts:8 export function subscribeToRecoltes(
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\subscribeToSync.ts:8 export function subscribeToSync(
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\subscribeToTerrains.ts:8 export function subscribeToTerrains(
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\subscribeToUtilisateurs.ts:8 export function subscribeToUtilisateurs(
```

## useRealtimeCollection usages

```txt
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:5 import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:18 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\components\dashboard\RealtimeKpiCard.tsx:3 import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
C:\Users\Admin\terragest\src\components\dashboard\RealtimeKpiCard.tsx:22 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:9 import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:22 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:24 export const useRealtimeCollection = ({
```

## Realtime references

```txt
C:\Users\Admin\terragest\src\app\(private)\realtime\page.tsx:1 import { ERPRuntimeRealtimeDashboard } from "@/components/erp/realtime";
C:\Users\Admin\terragest\src\app\(private)\realtime\page.tsx:4 return <ERPRuntimeRealtimeDashboard />;
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:5 import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:12 export const RealtimeActivityFeed = ({
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:18 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\components\dashboard\RealtimeKpiCard.tsx:3 import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
C:\Users\Admin\terragest\src\components\dashboard\RealtimeKpiCard.tsx:14 export const RealtimeKpiCard = ({
C:\Users\Admin\terragest\src\components\dashboard\RealtimeKpiCard.tsx:22 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPMonitoringMetricsGrid.tsx:22 <ERPStatCard label="Realtime" value={metrics.realtimeMessages} helper="Messages" />
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:2 import type { getERPRealtimeSnapshot } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:4 type Snapshot = ReturnType<typeof getERPRealtimeSnapshot>;
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:6 type ERPRealtimeFeedProps = {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:10 export function ERPRealtimeFeed({
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:12 }: ERPRealtimeFeedProps) {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:17 Realtime feed
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:2 import type { getERPRealtimeSnapshot } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:4 type Snapshot = ReturnType<typeof getERPRealtimeSnapshot>;
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:6 type ERPRealtimeMetricsProps = {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:10 export function ERPRealtimeMetrics({
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:12 }: ERPRealtimeMetricsProps) {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:15 <ERPStatCard label="Messages" value={snapshot.totalMessages} helper="Flux realtime" />
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:2 import type { getERPRealtimeSnapshot } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:4 type Snapshot = ReturnType<typeof getERPRealtimeSnapshot>;
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:6 type ERPRealtimePresencePanelProps = {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:10 export function ERPRealtimePresencePanel({
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:12 }: ERPRealtimePresencePanelProps) {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:17 FirestoreRuntimeRealtime,
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:20 interface ERPRealtimeSyncBadgeProps {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:24 export function ERPRealtimeSyncBadge({
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:26 }: ERPRealtimeSyncBadgeProps) {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:34 FirestoreRuntimeRealtime.subscribe(
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:3 getERPRealtimeSnapshot,
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:4 seedERPRealtimeRuntime,
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:5 } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:7 import { ERPRealtimeMetrics } from "./ERPRealtimeMetrics";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:8 import { ERPRealtimeFeed } from "./ERPRealtimeFeed";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:9 import { ERPRealtimePresencePanel } from "./ERPRealtimePresencePanel";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:11 seedERPRealtimeRuntime();
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:13 export function ERPRuntimeRealtimeDashboard() {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:14 const snapshot = getERPRealtimeSnapshot();
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:19 eyebrow="ERP Realtime Runtime"
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:20 title="Realtime Mission Control"
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:24 <ERPRealtimeMetrics snapshot={snapshot} />
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:27 <ERPRealtimeFeed snapshot={snapshot} />
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:28 <ERPRealtimePresencePanel snapshot={snapshot} />
C:\Users\Admin\terragest\src\components\erp\realtime\index.ts:1 export * from "./ERPRealtimeMetrics";
C:\Users\Admin\terragest\src\components\erp\realtime\index.ts:2 export * from "./ERPRealtimeFeed";
C:\Users\Admin\terragest\src\components\erp\realtime\index.ts:3 export * from "./ERPRealtimePresencePanel";
C:\Users\Admin\terragest\src\components\erp\realtime\index.ts:4 export * from "./ERPRuntimeRealtimeDashboard";
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:14 } from "@/core/realtime/runtime-realtime-channel";
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsChannelsPanel.tsx:32 Canaux realtime runtime.
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsDashboard.tsx:34 title="Realtime Live Stream Platform"
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsDashboard.tsx:35 description="Live runtime streams, realtime events, workers feeds et observability timeline."
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsMetricsGrid.tsx:31 helper="Realtime channels"
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:11 export const ProductRealtimeForm = () => {
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:31 "ERP REALTIME SUBSCRIBED",
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:61 "ERP REALTIME EVENT",
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:50 "[MATERIELS REALTIME]",
C:\Users\Admin\terragest\src\features\achats\achats.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:20 realtime: false,
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:28 realtime: true,
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:36 realtime: true,
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:44 realtime: false,
C:\Users\Admin\terragest\src\features\billing\types\FeatureFlags.ts:15 REALTIME: [
C:\Users\Admin\terragest\src\features\clients\clients.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\commandes\commandes.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\depenses\depenses.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\devis\devis.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\employes\employes.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\exploitations\exploitations.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\factures\factures.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\fournisseurs\fournisseurs.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\incidents\incidents.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\interventions\interventions.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\intrants\intrants.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\livraisons\livraisons.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\materiels\materiels.feature.ts:20 "realtime",
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:2 RuntimeRealtimeGateway
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:4 from "../../../runtime/realtime/gateway/RuntimeRealtimeGateway";
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:7 MaterielRealtimeGateway {
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:9 private realtime =
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:10 new RuntimeRealtimeGateway();
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:17 this.realtime.publish(
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:7 MaterielRealtimeGateway
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:9 from "../realtime/MaterielRealtimeGateway";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:90 private realtime =
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:91 new MaterielRealtimeGateway();
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:151 this.realtime.publish(
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:9 import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:16 export const RealtimeNotifications = ({
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:22 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:19 WorkflowExecutionRealtimeService {
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:15 WorkflowExecutionRealtimeService
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:17 from "../../services/workflows/WorkflowExecutionRealtimeService";
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:24 new WorkflowExecutionRealtimeService();
C:\Users\Admin\terragest\src\features\parcelles\parcelles.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\platform\components\runtime\RealtimeActivityPanel.tsx:2 RealtimeActivityPanel() {
C:\Users\Admin\terragest\src\features\platform\components\runtime\RealtimeActivityPanel.tsx:22 Realtime Runtime Stream
C:\Users\Admin\terragest\src\features\platform\components\runtime\RealtimeActivityPanel.tsx:27 connected to realtime gateway.
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:7 import RealtimeActivityPanel
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:8 from "../components/runtime/RealtimeActivityPanel";
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:14 RealtimeRuntimeDashboard() {
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:31 <RealtimeActivityPanel />
C:\Users\Admin\terragest\src\features\produits\produits.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\recettes\recettes.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\recoltes\recoltes.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\stocks\stocks.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\taches\taches.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\terrains\terrains.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\vehicules\vehicules.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\hooks\useRealtime.ts:8 export const useRealtime =
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:17 interface RealtimeOptions {
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:24 export const useRealtimeCollection = ({
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:27 }: RealtimeOptions) => {
C:\Users\Admin\terragest\src\hooks\runtime\useRuntimeChannel.ts:10 } from "@/core/realtime/runtime-realtime-channel";
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:71 if (module.metadata.features?.realtime) {
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:72 capabilities.push("realtime");
C:\Users\Admin\terragest\src\platform\registry\FeatureDefinition.ts:8 | "realtime"
C:\Users\Admin\terragest\src\platform\runtime\RuntimeBootstrap.ts:19 "[BOOTSTRAP] Runtime realtime ready"
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:25 "realtime",
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:33 "realtime",
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:55 "realtime",
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:62 "realtime",
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts:30 description: "Connecter le Realtime Gateway a Firebase, WebSocket ou SSE.",
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:22 | "realtime"
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:18 description: "Repositories, queries, mutations et realtime sont branches.",
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:12 export class FirestoreRuntimeRealtime {
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:14 FirestoreRuntimeRealtime,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:15 } from "./FirestoreRuntimeRealtime";
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:60 realtimeEnabled?: boolean;
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:61 "realtime",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:66 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:123 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:55 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:34 realtime?: boolean;
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:6 import { getERPRealtimeSnapshot } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:14 const realtime = getERPRealtimeSnapshot();
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:24 realtimeMessages: realtime.totalMessages,
C:\Users\Admin\terragest\src\runtime\monitoring\metrics\ERPMonitoringMetrics.ts:7 realtimeMessages: number;
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:28 { id: "realtime", label: "Realtime", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:42 { from: "events", to: "realtime", label: "streams" },
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:2 ERPRealtimeBus,
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:3 } from "./bus/ERPRealtimeBus";
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:6 ERPRealtimePresenceStore,
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:7 } from "./presence/ERPRealtimePresence";
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:15 export function seedERPRealtimeRuntime() {
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:24 ERPRealtimePresenceStore.upsert({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:33 ERPRealtimePresenceStore.upsert({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:42 ERPRealtimeBus.publish({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:51 ERPRealtimeBus.publish({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:60 ERPRealtimeBus.publish({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:69 ERPRealtimeBus.publish({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:78 ERPRealtimeBus.publish({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:87 ERPRealtimeBus.publish({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:90 title: "Runtime realtime actif",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:91 description: "Bus interne realtime initialise.",
C:\Users\Admin\terragest\src\runtime\realtime\index.ts:1 export * from "./channels/ERPRealtimeChannel";
C:\Users\Admin\terragest\src\runtime\realtime\index.ts:2 export * from "./bus/ERPRealtimeBus";
C:\Users\Admin\terragest\src\runtime\realtime\index.ts:3 export * from "./presence/ERPRealtimePresence";
C:\Users\Admin\terragest\src\runtime\realtime\index.ts:4 export * from "./snapshots/ERPRealtimeSnapshot";
C:\Users\Admin\terragest\src\runtime\realtime\index.ts:5 export * from "./ERPRealtimeSeed";
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:2 RuntimeRealtimeGateway
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:4 from "./gateway/RuntimeRealtimeGateway";
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:6 const realtime =
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:7 new RuntimeRealtimeGateway();
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:9 realtime.publish(
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:17 realtime.publish(
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:25 realtime.publish(
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:2 ERPRealtimeMessage,
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:3 ERPRealtimeChannelType,
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:4 } from "../channels/ERPRealtimeChannel";
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:6 type ERPRealtimeSubscriber = (
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:7 message: ERPRealtimeMessage
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:10 class ERPRealtimeBusClass {
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:11 private messages: ERPRealtimeMessage[] = [];
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:12 private subscribers: ERPRealtimeSubscriber[] = [];
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:14 publish(message: ERPRealtimeMessage) {
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:23 subscribe(subscriber: ERPRealtimeSubscriber) {
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:36 byChannel(channel: ERPRealtimeChannelType) {
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:43 export const ERPRealtimeBus =
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:44 new ERPRealtimeBusClass();
C:\Users\Admin\terragest\src\runtime\realtime\channels\ERPRealtimeChannel.ts:1 export type ERPRealtimeChannelType =
C:\Users\Admin\terragest\src\runtime\realtime\channels\ERPRealtimeChannel.ts:10 export type ERPRealtimeMessage = {
C:\Users\Admin\terragest\src\runtime\realtime\channels\ERPRealtimeChannel.ts:12 channel: ERPRealtimeChannelType;
C:\Users\Admin\terragest\src\runtime\realtime\gateway\RuntimeRealtimeGateway.ts:12 RuntimeRealtimeGateway {
C:\Users\Admin\terragest\src\runtime\realtime\gateway\RuntimeRealtimeGateway.ts:36 "[Realtime Gateway]",
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:1 export type ERPRealtimePresence = {
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:10 class ERPRealtimePresenceStoreClass {
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:11 private users: ERPRealtimePresence[] = [];
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:13 upsert(user: ERPRealtimePresence) {
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:33 export const ERPRealtimePresenceStore =
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:34 new ERPRealtimePresenceStoreClass();
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:2 ERPRealtimeBus,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:3 } from "../bus/ERPRealtimeBus";
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:6 ERPRealtimePresenceStore,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:7 } from "../presence/ERPRealtimePresence";
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:9 export function getERPRealtimeSnapshot() {
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:10 const messages = ERPRealtimeBus.all();
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:11 const presence = ERPRealtimePresenceStore.all();
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:18 events: ERPRealtimeBus.byChannel("events").length,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:19 workflows: ERPRealtimeBus.byChannel("workflows").length,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:20 automation: ERPRealtimeBus.byChannel("automation").length,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:21 queue: ERPRealtimeBus.byChannel("queue").length,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:22 alerts: ERPRealtimeBus.byChannel("alerts").length,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:23 system: ERPRealtimeBus.byChannel("system").length,
C:\Users\Admin\terragest\src\runtime\realtime\websocket\RuntimeWebSocketServer.ts:7 "[Realtime] WebSocket server started"
C:\Users\Admin\terragest\src\runtime\realtime\websocket\RuntimeWebSocketServer.ts:17 "[Realtime Broadcast]",
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:2 ERPRealtimeGateway,
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:3 } from "./gateway/ERPRealtimeGateway";
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:15 ERPRealtimeGateway.publish({
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:22 ERPRealtimeGateway.publish({
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:29 ERPRealtimeGateway.publish({
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:36 ERPRealtimeGateway.publish({
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:43 ERPRealtimeGateway.refreshMetrics();
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSnapshot.ts:2 ERPRealtimeGateway,
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSnapshot.ts:3 } from "./gateway/ERPRealtimeGateway";
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSnapshot.ts:18 ERPRealtimeGateway.channels(),
C:\Users\Admin\terragest\src\runtime\streams\index.ts:10 export * from "./gateway/ERPRealtimeGateway";
C:\Users\Admin\terragest\src\runtime\streams\gateway\ERPRealtimeGateway.ts:24 export const ERPRealtimeGateway = {
C:\Users\Admin\terragest\src\saas\features\FeatureFlagService.ts:11 "REALTIME",
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:42 realtime:
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:44 "REALTIME"
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesRealtimeWidget.tsx:9 export function AlertesRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsRealtimeWidget.tsx:9 export function ClientsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsRealtimeWidget.tsx:9 export function ContratsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsRealtimeWidget.tsx:9 export function ExploitationsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesRealtimeWidget.tsx:9 export function FacturesRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursRealtimeWidget.tsx:9 export function FournisseursRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsRealtimeWidget.tsx:9 export function InterventionsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceRealtimeWidget.tsx:9 export function MaintenanceRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsRealtimeWidget.tsx:9 export function MaterielsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileRealtimeWidget.tsx:9 export function MobileRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringRealtimeWidget.tsx:9 export function MonitoringRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockRealtimeWidget.tsx:9 export function MouvementsStockRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsRealtimeWidget.tsx:9 export function PaiementsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsRealtimeWidget.tsx:9 export function ProductionsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesRealtimeWidget.tsx:9 export function RecoltesRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncRealtimeWidget.tsx:9 export function SyncRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsRealtimeWidget.tsx:9 export function TerrainsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursRealtimeWidget.tsx:9 export function UtilisateursRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:22 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:44 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:66 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:88 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:110 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:132 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:154 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:176 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:200 "realtime"
```

## FirestoreRuntimeRealtime

```txt
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:17 FirestoreRuntimeRealtime,
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:34 FirestoreRuntimeRealtime.subscribe(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:12 export class FirestoreRuntimeRealtime {
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:14 FirestoreRuntimeRealtime,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:15 } from "./FirestoreRuntimeRealtime";
```

## Runtime realtime components

```txt
C:\Users\Admin\terragest\src\app\(private)\realtime\page.tsx:1 import { ERPRuntimeRealtimeDashboard } from "@/components/erp/realtime";
C:\Users\Admin\terragest\src\app\(private)\realtime\page.tsx:4 return <ERPRuntimeRealtimeDashboard />;
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:17 FirestoreRuntimeRealtime,
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:34 FirestoreRuntimeRealtime.subscribe(
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:13 export function ERPRuntimeRealtimeDashboard() {
C:\Users\Admin\terragest\src\components\erp\realtime\index.ts:4 export * from "./ERPRuntimeRealtimeDashboard";
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:2 RuntimeRealtimeGateway
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:4 from "../../../runtime/realtime/gateway/RuntimeRealtimeGateway";
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:10 new RuntimeRealtimeGateway();
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:12 export class FirestoreRuntimeRealtime {
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:14 FirestoreRuntimeRealtime,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:15 } from "./FirestoreRuntimeRealtime";
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:2 RuntimeRealtimeGateway
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:4 from "./gateway/RuntimeRealtimeGateway";
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:7 new RuntimeRealtimeGateway();
C:\Users\Admin\terragest\src\runtime\realtime\gateway\RuntimeRealtimeGateway.ts:12 RuntimeRealtimeGateway {
```

# RÃ©sumÃ©

- onSnapshot : 54
- subscribeTo : 19
- useRealtimeCollection : 7
- Realtime references : 268
- FirestoreRuntimeRealtime : 5
- RuntimeRealtime : 16

# Cible

```txt
UI
â†’ RuntimeRealtimeEngine
â†’ FirestoreRuntimeRealtime
â†’ Firestore onSnapshot
```
