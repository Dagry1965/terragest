# AMARKHYS-REBUILD-02A — Audit ciblé clientsauto

Date: 2026-05-31T14:58:58.527Z
Root: C:\Users\Admin\terragest

## 1. Fichiers candidats directs

- OK src/runtime/modules/generated/clientsauto/clientsauto.module.ts
- OK src/runtime/modules/generated/clientsauto/clientsauto.actions.ts
- MISSING src/runtime/modules/generated/clientsauto/actions.ts
- OK src/runtime/modules/generated/clientsauto/index.ts
- MISSING src/runtime/modules/generated/clientsauto/clientsauto.schema.ts
- OK src/runtime/modules/generated/clientsauto/clientsauto.workflows.ts
- MISSING src/runtime/modules/generated/clientsauto/clientsauto.business-rules.ts
- MISSING src/runtime/modules/generated/clientsauto/clientsauto.rules.ts
- MISSING src/runtime/modules/generated/clientsauto/clientsauto.metadata.ts
- MISSING src/runtime/modules/generated/clientsauto/clientsauto.navigation.ts
- MISSING src/runtime/modules/generated/clientsauto/clientsauto.routes.ts

## 2. Fichiers clients détectés

- src/app/(private)/clientsauto/[id]/edit/page.tsx
- src/app/(private)/clientsauto/[id]/page.tsx
- src/app/(private)/clientsauto/analytics/page.tsx
- src/app/(private)/clientsauto/audit/page.tsx
- src/app/(private)/clientsauto/dashboard/page.tsx
- src/app/(private)/clientsauto/export/page.tsx
- src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx
- src/app/(private)/clientsauto/hub/page.tsx
- src/app/(private)/clientsauto/import/page.tsx
- src/app/(private)/clientsauto/nouveau/page.tsx
- src/app/(private)/clientsauto/page.tsx
- src/app/(private)/clientsauto/relations/page.tsx
- src/app/(private)/clientsauto/workflows/page.tsx
- src/app/(private)/produitsauto/hub/ProductStockOperationalHubClient.tsx
- src/app/(private)/vehicules/hub/VehicleOperationalHubClient.tsx
- src/components/erp/hub/ClientOperationalSearchBox.tsx
- src/components/erp/hub/ClientOperationalTodayCards.tsx
- src/components/erp/hub/ERPClientOperationalSheet.tsx
- src/components/erp/relations/ClientVehiclesReadonlyCard.tsx
- src/runtime/modules/generated/clientsauto/clientsauto.actions.ts
- src/runtime/modules/generated/clientsauto/clientsauto.automation.ts
- src/runtime/modules/generated/clientsauto/clientsauto.dashboard.ts
- src/runtime/modules/generated/clientsauto/clientsauto.module.ts
- src/runtime/modules/generated/clientsauto/clientsauto.permissions.ts
- src/runtime/modules/generated/clientsauto/clientsauto.workflows.ts
- src/runtime/modules/generated/clientsauto/index.ts
- src/runtime/workflows/generated/clients/clients.workflow.ts

## 3. Inspection détaillée

### src/app/(private)/clientsauto/[id]/edit/page.tsx

- lignes: 23
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L3: export const dynamic = "force-dynamic";
- L11: export default async function EditClientsautoPage({


### src/app/(private)/clientsauto/[id]/page.tsx

- lignes: 23
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L3: export const dynamic = "force-dynamic";
- L11: export default async function ClientsautoDetailPage({


### src/app/(private)/clientsauto/analytics/page.tsx

- lignes: 11
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L3: export default function ClientsautoAnalyticsPage() {


### src/app/(private)/clientsauto/audit/page.tsx

- lignes: 11
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L3: export default function ClientsautoAuditPage() {


### src/app/(private)/clientsauto/dashboard/page.tsx

- lignes: 11
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L3: export default function ClientsautoDashboardPage() {


### src/app/(private)/clientsauto/export/page.tsx

- lignes: 11
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L3: export default function ClientsautoExportPage() {


### src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx

- lignes: 101
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L23: export function ClientOperationalSheetClient({


### src/app/(private)/clientsauto/hub/page.tsx

- lignes: 296
- actions property: YES
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L203: export default async function ClientOperationalHubPage({

Marqueurs actions/workflows/href:
- L93: actions: [
- L99: hrefTemplate: "/vehicules/{id}",
- L113: actions: [
- L119: hrefTemplate: "/rendezvous/{id}",
- L132: actions: [
- L138: hrefTemplate: "/interventionsauto/{id}",
- L151: actions: [
- L157: hrefTemplate: "/lignesinterventionauto/{id}",
- L170: actions: [
- L176: hrefTemplate: "/facturesauto/{id}",
- L189: actions: [
- L195: hrefTemplate: "/encaissementsauto/{id}",

Éléments potentiellement interdits / locaux:
- ERPEnterpriseForm action/workflow coupling
  - L93: actions: [
  - L113: actions: [
  - L132: actions: [
  - L151: actions: [
  - L170: actions: [
  - L189: actions: [


### src/app/(private)/clientsauto/import/page.tsx

- lignes: 11
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L3: export default function ClientsautoImportPage() {


### src/app/(private)/clientsauto/nouveau/page.tsx

- lignes: 11
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L3: export const dynamic = "force-dynamic";
- L5: export default function CreateClientsautoPage() {


### src/app/(private)/clientsauto/page.tsx

- lignes: 11
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L3: export const dynamic = "force-dynamic";
- L5: export default function ClientsautoPage() {


### src/app/(private)/clientsauto/relations/page.tsx

- lignes: 11
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L3: export default function ClientsautoRelationsPage() {


### src/app/(private)/clientsauto/workflows/page.tsx

- lignes: 11
- actions property: NO
- runtimeOnly: NO
- workflow marker: YES
- href marker: NO

Exports:
- L3: export default function ClientsautoWorkflowsPage() {

Marqueurs actions/workflows/href:
- L3: export default function ClientsautoWorkflowsPage() {
- L7: type="workflows"
- L8: actionLabel="Workflows"

Éléments potentiellement interdits / locaux:
- local status transition
  - L3: export default function ClientsautoWorkflowsPage() {
  - L7: type="workflows"
  - L8: actionLabel="Workflows"


### src/app/(private)/produitsauto/hub/ProductStockOperationalHubClient.tsx

- lignes: 140
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L22: export function ProductStockOperationalHubClient({


### src/app/(private)/vehicules/hub/VehicleOperationalHubClient.tsx

- lignes: 101
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L23: export function VehicleOperationalHubClient({


### src/components/erp/hub/ClientOperationalSearchBox.tsx

- lignes: 143
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L25: export function ClientOperationalSearchBox({

Marqueurs actions/workflows/href:
- L14: function resultHref(item: ClientOperationalSearchItem): string {
- L78: router.push(resultHref(item));

Éléments potentiellement interdits / locaux:
- local page action rendering
  - L4: import { useRouter } from "next/navigation";
  - L28: const router = useRouter();
  - L78: router.push(resultHref(item));
  - L109: <button
  - L111: type="button"
  - L130: </button>


### src/components/erp/hub/ClientOperationalTodayCards.tsx

- lignes: 123
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L10: export function ClientOperationalTodayCards() {

Marqueurs actions/workflows/href:
- L63: href={card.href}
- L102: href={item.href}

Éléments potentiellement interdits / locaux:
- local status transition
  - L64: className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"


### src/components/erp/hub/ERPClientOperationalSheet.tsx

- lignes: 896
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L218: export function ERPClientOperationalSheet({

Marqueurs actions/workflows/href:
- L77: function href(modulePath: string, record: ERPRecordHubRecord | null | undefined): string {
- L82: function queryHref(
- L255: const clientReturnTo = queryHref("/clientsauto/hub", {
- L260: const addVehicleHref = queryHref("/vehicules/nouveau", {
- L265: const fullActivityHref = queryHref("/clientsauto/hub", {
- L271: const allAppointmentsHref = queryHref("/rendezvous", {
- L276: const interventionsHref = queryHref("/interventionsauto", {
- L281: const invoicesHref = queryHref("/facturesauto", {
- L286: const paymentsHref = queryHref("/encaissementsauto", {
- L291: const vehicleDetailHref = queryHref(href("/vehicules", selectedVehicle), {
- L296: const interventionDetailHref = queryHref("/interventionsauto", {
- L301: const invoiceDetailHref = queryHref("/facturesauto", {
- L306: const paymentDetailHref = queryHref("/encaissementsauto", {
- L457: href={addVehicleHref}
- L818: href={vehicleDetailHref}
- L825: href={interventionDetailHref}
- L832: href={invoiceDetailHref}
- L839: href={paymentDetailHref}

Éléments potentiellement interdits / locaux:
- local page action rendering
  - L474: <button
  - L476: type="button"
  - L477: onClick={() => setLocalSelectedVehicleId(recordId(vehicle))}
  - L517: </button>
  - L544: <button
  - L545: type="button"
  - L546: onClick={() => setLocalSelectedVehicleId(recordId(vehicle))}
  - L550: </button>
  - L610: onClick={() => {
  - L632: <button
  - L633: type="button"
  - L634: onClick={() => {
  - L646: </button>
  - L687: <button
  - L688: type="button"
  - L689: onClick={() => setSelectedInterventionId(recordId(intervention))}
  - L706: </button>
- local status transition
  - L479: "cursor-pointer rounded-[1.75rem] border p-5 text-left shadow-sm transition focus:outline-none focus:ring-4 focus:ring-emerald-100",
  - L615: "cursor-pointer transition",
  - L681: "rounded-[1.5rem] border transition",


### src/runtime/modules/generated/clientsauto/clientsauto.actions.ts

- lignes: 1
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L1: export const clientsautoActions = [];

Marqueurs actions/workflows/href:
- L1: export const clientsautoActions = [];


### src/runtime/modules/generated/clientsauto/clientsauto.automation.ts

- lignes: 1
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L1: export const clientsautoAutomation = [];


### src/runtime/modules/generated/clientsauto/clientsauto.dashboard.ts

- lignes: 1
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L1: export const clientsautoDashboard = {};


### src/runtime/modules/generated/clientsauto/clientsauto.module.ts

- lignes: 540
- actions property: YES
- runtimeOnly: NO
- workflow marker: YES
- href marker: YES

Exports:
- L3: export const clientsautoModule: ERPModule = {

Marqueurs actions/workflows/href:
- L21: workflows: true,
- L489: actions: [
- L494: href: "/rendezvous/nouveau",
- L500: href: "/client360-demo",
- L503: workflows:[

Mots-clés actions attendues détectés:
- activer — L534: action:"Désactiver"
- désactiver — L534: action:"Désactiver"

Éléments potentiellement interdits / locaux:
- ERPEnterpriseForm action/workflow coupling
  - L489: actions: [
- local status transition
  - L21: workflows: true,
  - L503: workflows:[
  - L525: transitions:[


### src/runtime/modules/generated/clientsauto/clientsauto.permissions.ts

- lignes: 1
- actions property: NO
- runtimeOnly: NO
- workflow marker: NO
- href marker: NO

Exports:
- L1: export const clientsautoPermissions = [];


### src/runtime/modules/generated/clientsauto/clientsauto.workflows.ts

- lignes: 1
- actions property: NO
- runtimeOnly: NO
- workflow marker: YES
- href marker: NO

Exports:
- L1: export const clientsautoWorkflows = [];

Marqueurs actions/workflows/href:
- L1: export const clientsautoWorkflows = [];

Éléments potentiellement interdits / locaux:
- local status transition
  - L1: export const clientsautoWorkflows = [];


### src/runtime/modules/generated/clientsauto/index.ts

- lignes: 6
- actions property: NO
- runtimeOnly: NO
- workflow marker: YES
- href marker: NO

Exports:
- L1: export * from "./clientsauto.module";
- L2: export * from "./clientsauto.actions";
- L3: export * from "./clientsauto.workflows";
- L4: export * from "./clientsauto.permissions";
- L5: export * from "./clientsauto.automation";
- L6: export * from "./clientsauto.dashboard";

Marqueurs actions/workflows/href:
- L3: export * from "./clientsauto.workflows";

Éléments potentiellement interdits / locaux:
- local status transition
  - L3: export * from "./clientsauto.workflows";


## 4. Synthèse

- fichiers inspectés: 25
- occurrences actions attendues: 2
- occurrences interdites/locales candidates: 42

## 5. Décision de reprise recommandée

À ce stade, ne pas corriger encore au hasard.
La passe suivante doit :
1. confirmer le fichier officiel d’actions runtime clientsauto ;
2. brancher les actions dans la metadata/module runtime ;
3. garder les actions visibles via ERPRuntimePage / ERPRuntimeActionBar ;
4. ne rien ajouter dans ERPEnterpriseForm ;
5. relancer build + audit recadrage.
