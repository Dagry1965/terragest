# AMARKHYS-HUB-FLOW-A — Audit client/vehicle operational flow

Date: 2026-06-01T02:24:13.313Z

## Objectif

Auditer la fiche client opérationnelle avant refonte hiérarchique expandable.

## Règle cible

- Véhicule : carte propre, sans année/carburant/cadre gris vide.
- Rendez-vous : liste sélectionnable, non expandable.
- Interventions : filtrées par rendez-vous sélectionné, expandables.
- Expansion intervention : synthèse, lignes d’intervention, totaux, actions.
- Factures : expandables.
- Encaissements : expandables.
- Ne pas mélanger les niveaux métier.

## Synthèse

- OK: 9
- FAIL: 0
- Files scanned: 76
- Hits: 1233
- Strong hits: 393

## Checks

- OK — composant hub client/véhicule localisé
- OK — sélection véhicule détectée
- OK — rendez-vous détectés
- OK — interventions détectées
- OK — lignes intervention détectées
- OK — factures détectées
- OK — encaissements détectés
- OK — logique expandable existante ou absente à confirmer
- OK — champs véhicule à masquer localisés

## Fichiers probablement concernés

- src/components/erp/hub/ERPClientOperationalSheet.tsx — hits=175 — selectedVehicle=true — selectedRdv=true — expanded=true — interventions=true — lines=true — invoices=true — payments=true
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts — hits=140 — selectedVehicle=true — selectedRdv=false — expanded=false — interventions=true — lines=true — invoices=true — payments=true
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts — hits=111 — selectedVehicle=false — selectedRdv=true — expanded=false — interventions=true — lines=true — invoices=true — payments=true
- src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — hits=86 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=true — lines=true — invoices=true — payments=false
- src/runtime/modules/generated/facturesauto/facturesauto.module.ts — hits=82 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=true — lines=false — invoices=true — payments=true
- src/app/(private)/vehicules/hub/page.tsx — hits=61 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=true — lines=true — invoices=true — payments=true
- src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx — hits=61 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=true — lines=false — invoices=true — payments=true
- src/app/(private)/clientsauto/hub/page.tsx — hits=60 — selectedVehicle=true — selectedRdv=false — expanded=false — interventions=true — lines=true — invoices=true — payments=true
- src/runtime/modules/generated/vehicules/vehicules.module.ts — hits=45 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=true — lines=false — invoices=true — payments=false
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts — hits=42 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=true — lines=false — invoices=true — payments=false
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts — hits=42 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=true — lines=false — invoices=false — payments=false
- src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts — hits=42 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=false — lines=false — invoices=true — payments=true
- src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts — hits=38 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=true — lines=true — invoices=false — payments=false
- src/runtime/modules/generated/facturesauto/facturesauto.actions.ts — hits=22 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=false — lines=false — invoices=true — payments=false
- src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx — hits=12 — selectedVehicle=true — selectedRdv=false — expanded=false — interventions=false — lines=false — invoices=false — payments=false
- src/runtime/modules/generated/lignesinterventionauto/index.ts — hits=12 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=false — lines=true — invoices=false — payments=false
- src/runtime/modules/generated/facturesauto/index.ts — hits=12 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=false — lines=false — invoices=true — payments=false
- src/components/erp/hub/ClientOperationalSearchBox.tsx — hits=9 — selectedVehicle=true — selectedRdv=false — expanded=false — interventions=false — lines=false — invoices=false — payments=false
- src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts — hits=7 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=true — lines=false — invoices=false — payments=false
- src/runtime/modules/generated/vehicules/vehicules.actions.ts — hits=6 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=true — lines=false — invoices=false — payments=false
- src/runtime/modules/generated/interventionsauto/index.ts — hits=6 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=true — lines=false — invoices=false — payments=false
- src/runtime/modules/generated/encaissementsauto/encaissementsauto.permissions.ts — hits=6 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=false — lines=false — invoices=false — payments=true
- src/runtime/modules/generated/encaissementsauto/index.ts — hits=6 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=false — lines=false — invoices=false — payments=true
- src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts — hits=4 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=false — lines=false — invoices=false — payments=true
- src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.actions.ts — hits=2 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=false — lines=true — invoices=false — payments=false
- src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.automation.ts — hits=2 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=false — lines=true — invoices=false — payments=false
- src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.dashboard.ts — hits=2 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=false — lines=true — invoices=false — payments=false
- src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.permissions.ts — hits=2 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=false — lines=true — invoices=false — payments=false
- src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.workflows.ts — hits=2 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=false — lines=true — invoices=false — payments=false
- src/runtime/modules/generated/facturesauto/facturesauto.automation.ts — hits=2 — selectedVehicle=false — selectedRdv=false — expanded=false — interventions=false — lines=false — invoices=true — payments=false

## Strong hits

- src/components/erp/hub/ClientOperationalSearchBox.tsx:19 — selectedVehicle — params.set("selectedVehicleId", item.vehicleId);
- src/components/erp/hub/ERPClientOperationalSheet.tsx:12 — rendezvous — import { rendezvousModule } from "@/runtime/modules/generated/rendezvous/rendezvous.module";
- src/components/erp/hub/ERPClientOperationalSheet.tsx:14 — interventionsauto — import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
- src/components/erp/hub/ERPClientOperationalSheet.tsx:17 — ERPClientOperationalSheet — type ERPClientOperationalSheetProps = {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:21 — relatedRecordsBySection — relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
- src/components/erp/hub/ERPClientOperationalSheet.tsx:22 — selectedVehicle — selectedVehicleId?: string | null;
- src/components/erp/hub/ERPClientOperationalSheet.tsx:160 — rendezvous — const rendezvousChild = buildOperationalChild({
- src/components/erp/hub/ERPClientOperationalSheet.tsx:161 — rendezvous — key: "client-sheet-rendezvous",
- src/components/erp/hub/ERPClientOperationalSheet.tsx:164 — rendezvous — moduleKey: "rendezvous",
- src/components/erp/hub/ERPClientOperationalSheet.tsx:178 — interventionsauto — moduleKey: "interventionsauto",
- src/components/erp/hub/ERPClientOperationalSheet.tsx:184 — rendezVous — subtitleFields: ["montantTTC", "montantHT", "rendezVousId"],
- src/components/erp/hub/ERPClientOperationalSheet.tsx:192 — lignesinterventionauto — moduleKey: "lignesinterventionauto",
- src/components/erp/hub/ERPClientOperationalSheet.tsx:207 — facturesauto — moduleKey: "facturesauto",
- src/components/erp/hub/ERPClientOperationalSheet.tsx:218 — ERPClientOperationalSheet — export function ERPClientOperationalSheet({
- src/components/erp/hub/ERPClientOperationalSheet.tsx:222 — relatedRecordsBySection — relatedRecordsBySection,
- src/components/erp/hub/ERPClientOperationalSheet.tsx:223 — selectedVehicle — selectedVehicleId = null,
- src/components/erp/hub/ERPClientOperationalSheet.tsx:224 — ERPClientOperationalSheet — }: ERPClientOperationalSheetProps) {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:226 — selectedVehicle — selectedVehicleId ?? recordId(vehicles[0]) ?? null
- src/components/erp/hub/ERPClientOperationalSheet.tsx:229 — selectedRendez — const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
- src/components/erp/hub/ERPClientOperationalSheet.tsx:230 — expanded — const [expandedInterventionId, setExpandedInterventionId] = useState<string | null>(null);
- src/components/erp/hub/ERPClientOperationalSheet.tsx:231 — expanded — const [expandedFactureId, setExpandedFactureId] = useState<string | null>(null);
- src/components/erp/hub/ERPClientOperationalSheet.tsx:232 — expanded — const [expandedEncaissementId, setExpandedEncaissementId] = useState<string | null>(null);
- src/components/erp/hub/ERPClientOperationalSheet.tsx:235 — selectedVehicle — const selectedVehicle = useMemo(() => {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:256 — selectedVehicle — const selectedVehicleRecordId = recordId(selectedVehicle);
- src/components/erp/hub/ERPClientOperationalSheet.tsx:260 — selectedVehicle — selectedVehicleId: selectedVehicleRecordId,
- src/components/erp/hub/ERPClientOperationalSheet.tsx:270 — selectedVehicle — selectedVehicleId: selectedVehicleRecordId,
- src/components/erp/hub/ERPClientOperationalSheet.tsx:274 — rendezvous — const allAppointmentsHref = queryHref("/rendezvous", {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:276 — selectedVehicle — vehiculeId: selectedVehicleRecordId,
- src/components/erp/hub/ERPClientOperationalSheet.tsx:279 — interventionsauto — const interventionsHref = queryHref("/interventionsauto", {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:281 — selectedVehicle — vehiculeId: selectedVehicleRecordId,
- src/components/erp/hub/ERPClientOperationalSheet.tsx:284 — facturesauto — const invoicesHref = queryHref("/facturesauto", {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:286 — selectedVehicle — vehiculeId: selectedVehicleRecordId,
- src/components/erp/hub/ERPClientOperationalSheet.tsx:289 — encaissementsauto — const paymentsHref = queryHref("/encaissementsauto", {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:291 — selectedVehicle — vehiculeId: selectedVehicleRecordId,
- src/components/erp/hub/ERPClientOperationalSheet.tsx:294 — selectedVehicle — const vehicleDetailHref = queryHref(href("/vehicules", selectedVehicle), {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:299 — interventionsauto — const interventionDetailHref = queryHref("/interventionsauto", {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:301 — selectedVehicle — vehiculeId: selectedVehicleRecordId,
- src/components/erp/hub/ERPClientOperationalSheet.tsx:304 — facturesauto — const invoiceDetailHref = queryHref("/facturesauto", {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:306 — selectedVehicle — vehiculeId: selectedVehicleRecordId,
- src/components/erp/hub/ERPClientOperationalSheet.tsx:309 — encaissementsauto — const paymentDetailHref = queryHref("/encaissementsauto", {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:311 — selectedVehicle — vehiculeId: selectedVehicleRecordId,
- src/components/erp/hub/ERPClientOperationalSheet.tsx:325 — relatedRecordsBySection — const interventions = relatedRecordsBySection.interventions ?? [];
- src/components/erp/hub/ERPClientOperationalSheet.tsx:326 — rendezvous — const rendezvous = relatedRecordsBySection.rendezvous ?? [];
- src/components/erp/hub/ERPClientOperationalSheet.tsx:326 — relatedRecordsBySection — const rendezvous = relatedRecordsBySection.rendezvous ?? [];
- src/components/erp/hub/ERPClientOperationalSheet.tsx:327 — relatedRecordsBySection — const lignes = relatedRecordsBySection.lignes ?? [];
- src/components/erp/hub/ERPClientOperationalSheet.tsx:328 — relatedRecordsBySection — const factures = relatedRecordsBySection.factures ?? [];
- src/components/erp/hub/ERPClientOperationalSheet.tsx:329 — relatedRecordsBySection — const encaissements = relatedRecordsBySection.encaissements ?? [];
- src/components/erp/hub/ERPClientOperationalSheet.tsx:330 — relatedRecordsBySection — const recentActivity = relatedRecordsBySection.recentActivity ?? [];
- src/components/erp/hub/ERPClientOperationalSheet.tsx:331 — relatedRecordsBySection — const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];
- src/components/erp/hub/ERPClientOperationalSheet.tsx:345 — selectedRendez — const selectedRendezvous = useMemo(() => {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:347 — selectedRendez — rendezvous.find((item) => recordId(item) === selectedRendezvousId) ??
- src/components/erp/hub/ERPClientOperationalSheet.tsx:347 — rendezvous — rendezvous.find((item) => recordId(item) === selectedRendezvousId) ??
- src/components/erp/hub/ERPClientOperationalSheet.tsx:348 — rendezvous — rendezvous[0] ??
- src/components/erp/hub/ERPClientOperationalSheet.tsx:351 — selectedRendez — }, [rendezvous, selectedRendezvousId]);
- src/components/erp/hub/ERPClientOperationalSheet.tsx:351 — rendezvous — }, [rendezvous, selectedRendezvousId]);
- src/components/erp/hub/ERPClientOperationalSheet.tsx:354 — selectedRendez — if (!selectedRendezvous) {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:358 — selectedRendez — const rendezvousId = recordId(selectedRendezvous);
- src/components/erp/hub/ERPClientOperationalSheet.tsx:358 — rendezvous — const rendezvousId = recordId(selectedRendezvous);
- src/components/erp/hub/ERPClientOperationalSheet.tsx:362 — rendezVous — "rendezVousId",
- src/components/erp/hub/ERPClientOperationalSheet.tsx:363 — rendezvous — "rendezvousId",
- src/components/erp/hub/ERPClientOperationalSheet.tsx:365 — rendezvous — ].some((field) => String(intervention[field] ?? "") === rendezvousId);
- src/components/erp/hub/ERPClientOperationalSheet.tsx:369 — selectedRendez — }, [interventions, selectedRendezvous]);
- src/components/erp/hub/ERPClientOperationalSheet.tsx:495 — selectedVehicle — recordId(vehicle) === recordId(selectedVehicle)
- src/components/erp/hub/ERPClientOperationalSheet.tsx:579 — selectedVehicle — {selectedVehicle ? (
- src/components/erp/hub/ERPClientOperationalSheet.tsx:586 — selectedVehicle — {text(selectedVehicle, ["displayLabel", "immatriculation", "marque"])}
- src/components/erp/hub/ERPClientOperationalSheet.tsx:589 — selectedVehicle — {text(selectedVehicle, ["marque"])} · {text(selectedVehicle, ["modele", "modèle"])}
- src/components/erp/hub/ERPClientOperationalSheet.tsx:603 — rendezvous — {rendezvous.length > 0 ? (
- src/components/erp/hub/ERPClientOperationalSheet.tsx:616 — rendezvous — {rendezvous.map((appointment) => {
- src/components/erp/hub/ERPClientOperationalSheet.tsx:618 — selectedRendez — recordId(appointment) === recordId(selectedRendezvous);
- src/components/erp/hub/ERPClientOperationalSheet.tsx:677 — selectedRendez — {selectedRendezvous ? (
- src/components/erp/hub/ERPClientOperationalSheet.tsx:679 — selectedRendez — Rendez-vous sélectionné : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
- src/components/erp/hub/ERPClientOperationalSheet.tsx:724 — interventionsauto — parentModule={interventionsautoModule}
- src/components/erp/hub/ERPClientOperationalSheet.tsx:742 — interventionsauto — parentModule={interventionsautoModule}
- src/components/erp/hub/ERPClientOperationalSheet.tsx:759 — selectedVehicle — vehiculeId={selectedVehicleRecordId}
- src/components/erp/hub/ERPClientOperationalSheet.tsx:780 — selectedVehicle — selectedVehicle
- src/components/erp/hub/ERPClientOperationalSheet.tsx:781 — selectedVehicle — ? text(selectedVehicle, ["displayLabel", "immatriculation"])
- src/components/erp/hub/ERPClientOperationalSheet.tsx:880 — selectedVehicle — {selectedVehicle ? (
- src/components/erp/hub/ERPClientOperationalSheet.tsx:884 — selectedVehicle — {text(selectedVehicle, ["displayLabel", "immatriculation", "marque"])}
- src/components/erp/hub/ERPClientOperationalSheet.tsx:887 — selectedVehicle — {text(selectedVehicle, ["marque"])} · {text(selectedVehicle, ["modele", "modèle"])}
- src/components/erp/hub/ERPClientOperationalSheet.tsx:892 — rendezvous — <EmptyCard>Rendez-vous liés : {rendezvous.length}</EmptyCard>
- src/components/erp/hub/ERPRecordHubPage.tsx:19 — relatedRecordsBySection — relatedRecordsBySection?: Record<string, ERPRecordHubRecord[]>;
- src/components/erp/hub/ERPRecordHubPage.tsx:27 — relatedRecordsBySection — relatedRecordsBySection = {},
- src/components/erp/hub/ERPRecordHubPage.tsx:91 — relatedRecordsBySection — relatedRecordsBySection={relatedRecordsBySection}
- src/components/erp/hub/ERPRecordHubSelectedDetails.tsx:66 — relatedRecordsBySection — relatedRecordsBySection?: Record<string, ERPRecordHubRecord[]>;
- src/components/erp/hub/ERPRecordHubSelectedDetails.tsx:72 — relatedRecordsBySection — relatedRecordsBySection = {},
- src/components/erp/hub/ERPRecordHubSelectedDetails.tsx:94 — relatedRecordsBySection — const records = relatedRecordsBySection[section.key] ?? [];
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:4 — rendezvous — import { rendezvousModule } from "@/runtime/modules/generated/rendezvous/rendezvous.module";
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:5 — interventionsauto — import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:6 — lignesinterventionauto — import { lignesinterventionautoModule } from "@/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module";
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:7 — facturesauto — import { facturesautoModule } from "@/runtime/modules/generated/facturesauto/facturesauto.module";
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:8 — encaissementsauto — import { encaissementsautoModule } from "@/runtime/modules/generated/encaissementsauto/encaissementsauto.module";
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:19 — relatedRecordsBySection — relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:25 — selectedVehicle — selectedVehicleId?: string | null;
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:442 — relatedRecordsBySection — relatedRecordsBySection: {
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:443 — rendezvous — rendezvous: [],
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:487 — rendezvous — safeList(rendezvousModule),
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:488 — interventionsauto — safeList(interventionsautoModule),
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:489 — lignesinterventionauto — safeList(lignesinterventionautoModule),
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:490 — facturesauto — safeList(facturesautoModule),
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:491 — encaissementsauto — safeList(encaissementsautoModule)
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:551 — selectedVehicle — const selectedVehicle =
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:552 — selectedVehicle — findById(vehicles, input.selectedVehicleId) ?? vehicles[0] ?? null;
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:554 — selectedVehicle — const selectedVehicleId = String(
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:555 — selectedVehicle — selectedVehicle?.id ?? input.selectedVehicleId ?? ""
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:558 — selectedVehicle — const selectedVehicleInterventions = selectedVehicleId
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:559 — selectedVehicle — ? filterByAnyKey(interventions, ["vehiculeId", "vehicleId"], selectedVehicleId)
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:562 — selectedVehicle — const selectedVehicleAppointments = selectedVehicleId
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:563 — selectedVehicle — ? filterByAnyKey(appointments, ["vehiculeId", "vehicleId"], selectedVehicleId)
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:566 — selectedVehicle — const selectedVehicleInvoices = selectedVehicleId
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:569 — selectedVehicle — (key) => String(invoice[key] ?? "") === selectedVehicleId
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:572 — selectedVehicle — const interventionMatch = selectedVehicleInterventions.some(
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:582 — selectedVehicle — selectedVehicleInterventions.map((record) => String(record.id ?? "")).filter(Boolean)
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:586 — selectedVehicle — selectedVehicleInvoices.map((record) => String(record.id ?? "")).filter(Boolean)
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:589 — selectedVehicle — const selectedVehicleLines = linesRaw
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:593 — selectedVehicle — const selectedVehiclePayments = payments.filter((record) => {
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:608 — rendezvous — buildActivityRecord("rendezvous", record, "Rendez-vous")
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:636 — relatedRecordsBySection — relatedRecordsBySection: {
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:637 — selectedVehicle — rendezvous: selectedVehicleAppointments,
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:637 — rendezvous — rendezvous: selectedVehicleAppointments,
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:638 — selectedVehicle — interventions: selectedVehicleInterventions,
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:639 — selectedVehicle — lignes: selectedVehicleLines,
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:640 — selectedVehicle — factures: selectedVehicleInvoices,
- src/runtime/hub/RuntimeClientOperationalHubLoader.ts:641 — selectedVehicle — encaissements: selectedVehiclePayments,
- src/runtime/hub/RuntimeClientOperationalSearchLoader.ts:160 — annee — readFirstString(vehicle, ["annee", "année"]),
- src/runtime/hub/RuntimeClientOperationalSearchLoader.ts:161 — carburant — readFirstString(vehicle, ["carburant"]),
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:2 — rendezvous — import { rendezvousModule } from "@/runtime/modules/generated/rendezvous/rendezvous.module";
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:3 — interventionsauto — import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:4 — facturesauto — import { facturesautoModule } from "@/runtime/modules/generated/facturesauto/facturesauto.module";
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:22 — rendezvous — type: "rendezvous" | "intervention" | "facture" | "vehicule";
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:215 — rendezvous — safeList(rendezvousModule),
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:216 — interventionsauto — safeList(interventionsautoModule),
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:217 — facturesauto — safeList(facturesautoModule),
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:245 — rendezvous — href: "/rendezvous",
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:253 — interventionsauto — href: "/interventionsauto",
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:261 — facturesauto — href: "/facturesauto",
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:276 — rendezvous — type: "rendezvous" as const,
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:279 — rendezvous — href: `/rendezvous/${recordId(record)}`,
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:286 — interventionsauto — href: `/interventionsauto/${recordId(record)}`,
- src/runtime/hub/RuntimeClientOperationalTodayLoader.ts:293 — facturesauto — href: `/facturesauto/${recordId(record)}`,
- src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts:17 — relatedRecordsBySection — relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
- src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts:322 — relatedRecordsBySection — relatedRecordsBySection: {
- src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts:337 — relatedRecordsBySection — relatedRecordsBySection: {
- src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts:353 — relatedRecordsBySection — const relatedRecordsBySection: Record<string, ERPRecordHubRecord[]> = {
- src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts:369 — relatedRecordsBySection — relatedRecordsBySection.mouvements = (
- src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts:375 — relatedRecordsBySection — relatedRecordsBySection.commandes = productOrders.map((record) =>
- src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts:379 — relatedRecordsBySection — relatedRecordsBySection.receptions = (
- src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts:397 — relatedRecordsBySection — relatedRecordsBySection,
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:4 — rendezvous — import { rendezvousModule } from "@/runtime/modules/generated/rendezvous/rendezvous.module";
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:5 — interventionsauto — import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:6 — lignesinterventionauto — import { lignesinterventionautoModule } from "@/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module";
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:7 — facturesauto — import { facturesautoModule } from "@/runtime/modules/generated/facturesauto/facturesauto.module";
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:8 — encaissementsauto — import { encaissementsautoModule } from "@/runtime/modules/generated/encaissementsauto/encaissementsauto.module";
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:19 — relatedRecordsBySection — relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:213 — rendezvous — rendezvousCount: appointmentsCount,
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:234 — relatedRecordsBySection — relatedRecordsBySection: {
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:235 — rendezvous — rendezvous: [],
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:268 — rendezvous — safeList(rendezvousModule),
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:269 — interventionsauto — safeList(interventionsautoModule),
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:270 — lignesinterventionauto — safeList(lignesinterventionautoModule),
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:271 — facturesauto — safeList(facturesautoModule),
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:272 — encaissementsauto — safeList(encaissementsautoModule)
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:306 — selectedRendez — const selectedRendezVousId = String(
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:307 — rendezVous — selectedIntervention?.rendezVousId ??
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:308 — rendezvous — selectedIntervention?.rendezvousId ??
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:361 — selectedRendez — const relatedRendezvous = selectedRendezVousId
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:363 — selectedRendez — (record) => String(record.id ?? "") === selectedRendezVousId
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:380 — relatedRecordsBySection — relatedRecordsBySection: {
- src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts:381 — rendezvous — rendezvous: relatedRendezvous,
- src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx:9 — ERPClientOperationalSheet — import { ERPClientOperationalSheet } from "@/components/erp/hub/ERPClientOperationalSheet";
- src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx:14 — selectedVehicle — selectedVehicleId?: string | null;
- src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx:20 — relatedRecordsBySection — relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
- src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx:26 — selectedVehicle — selectedVehicleId = null,
- src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx:41 — selectedVehicle — selectedVehicleId,
- src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx:49 — relatedRecordsBySection — relatedRecordsBySection: result.relatedRecordsBySection,
- src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx:69 — selectedVehicle — }, [config, clientId, selectedVehicleId]);
- src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx:92 — ERPClientOperationalSheet — <ERPClientOperationalSheet
- src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx:96 — relatedRecordsBySection — relatedRecordsBySection={state.relatedRecordsBySection}
- src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx:97 — selectedVehicle — selectedVehicleId={selectedVehicleId}
- src/app/(private)/clientsauto/hub/page.tsx:9 — selectedVehicle — selectedVehicleId?: string;
- src/app/(private)/clientsauto/hub/page.tsx:88 — selectedVehicle — selectionQueryParam: "selectedVehicleId",
- src/app/(private)/clientsauto/hub/page.tsx:90 — annee — subtitleFields: ["annee", "carburant", "kilometrage", "statut"],
- src/app/(private)/clientsauto/hub/page.tsx:90 — carburant — subtitleFields: ["annee", "carburant", "kilometrage", "statut"],
- src/app/(private)/clientsauto/hub/page.tsx:91 — annee — cardFields: ["displayLabel", "immatriculation", "annee", "carburant", "kilometrage", "statut"],
- src/app/(private)/clientsauto/hub/page.tsx:91 — carburant — cardFields: ["displayLabel", "immatriculation", "annee", "carburant", "kilometrage", "statut"],
- src/app/(private)/clientsauto/hub/page.tsx:92 — annee — tableFields: ["immatriculation", "marque", "modele", "annee", "statut"],
- src/app/(private)/clientsauto/hub/page.tsx:106 — rendezvous — key: "rendezvous",
- src/app/(private)/clientsauto/hub/page.tsx:108 — rendezvous — moduleKey: "rendezvous",
- src/app/(private)/clientsauto/hub/page.tsx:118 — rendezvous — moduleKey: "rendezvous",
- src/app/(private)/clientsauto/hub/page.tsx:119 — rendezvous — hrefTemplate: "/rendezvous/{id}",
- src/app/(private)/clientsauto/hub/page.tsx:127 — interventionsauto — moduleKey: "interventionsauto",
- src/app/(private)/clientsauto/hub/page.tsx:131 — rendezVous — subtitleFields: ["rendezVousId"],
- src/app/(private)/clientsauto/hub/page.tsx:137 — interventionsauto — moduleKey: "interventionsauto",
- src/app/(private)/clientsauto/hub/page.tsx:138 — interventionsauto — hrefTemplate: "/interventionsauto/{id}",
- src/app/(private)/clientsauto/hub/page.tsx:146 — lignesinterventionauto — moduleKey: "lignesinterventionauto",
- src/app/(private)/clientsauto/hub/page.tsx:156 — lignesinterventionauto — moduleKey: "lignesinterventionauto",
- src/app/(private)/clientsauto/hub/page.tsx:157 — lignesinterventionauto — hrefTemplate: "/lignesinterventionauto/{id}",
- src/app/(private)/clientsauto/hub/page.tsx:165 — facturesauto — moduleKey: "facturesauto",
- src/app/(private)/clientsauto/hub/page.tsx:175 — facturesauto — moduleKey: "facturesauto",
- src/app/(private)/clientsauto/hub/page.tsx:176 — facturesauto — hrefTemplate: "/facturesauto/{id}",
- src/app/(private)/clientsauto/hub/page.tsx:184 — encaissementsauto — moduleKey: "encaissementsauto",
- src/app/(private)/clientsauto/hub/page.tsx:194 — encaissementsauto — moduleKey: "encaissementsauto",
- src/app/(private)/clientsauto/hub/page.tsx:195 — encaissementsauto — hrefTemplate: "/encaissementsauto/{id}",
- src/app/(private)/clientsauto/hub/page.tsx:208 — selectedVehicle — const selectedVehicleId = params.selectedVehicleId ?? null;
- src/app/(private)/clientsauto/hub/page.tsx:292 — selectedVehicle — selectedVehicleId={selectedVehicleId}
- src/app/(private)/vehicules/hub/page.tsx:58 — interventionsauto — moduleKey: "interventionsauto",
- src/app/(private)/vehicules/hub/page.tsx:64 — rendezVous — subtitleFields: ["montantTTC", "rendezVousId"],
- src/app/(private)/vehicules/hub/page.tsx:66 — rendezVous — tableFields: ["dateIntervention", "statut", "montantTTC", "rendezVousId"],
- src/app/(private)/vehicules/hub/page.tsx:72 — interventionsauto — moduleKey: "interventionsauto",
- src/app/(private)/vehicules/hub/page.tsx:73 — interventionsauto — hrefTemplate: "/interventionsauto/{id}",
- src/app/(private)/vehicules/hub/page.tsx:80 — rendezvous — key: "rendezvous",
- src/app/(private)/vehicules/hub/page.tsx:82 — rendezvous — moduleKey: "rendezvous",
- src/app/(private)/vehicules/hub/page.tsx:89 — rendezvous — key: "open-rendezvous",
- src/app/(private)/vehicules/hub/page.tsx:92 — rendezvous — moduleKey: "rendezvous",
- src/app/(private)/vehicules/hub/page.tsx:93 — rendezvous — hrefTemplate: "/rendezvous/{id}",
- src/app/(private)/vehicules/hub/page.tsx:101 — lignesinterventionauto — moduleKey: "lignesinterventionauto",
- src/app/(private)/vehicules/hub/page.tsx:111 — lignesinterventionauto — moduleKey: "lignesinterventionauto",
- src/app/(private)/vehicules/hub/page.tsx:112 — lignesinterventionauto — hrefTemplate: "/lignesinterventionauto/{id}",
- src/app/(private)/vehicules/hub/page.tsx:120 — facturesauto — moduleKey: "facturesauto",
- src/app/(private)/vehicules/hub/page.tsx:130 — facturesauto — moduleKey: "facturesauto",
- src/app/(private)/vehicules/hub/page.tsx:131 — facturesauto — hrefTemplate: "/facturesauto/{id}",
- src/app/(private)/vehicules/hub/page.tsx:139 — encaissementsauto — moduleKey: "encaissementsauto",
- src/app/(private)/vehicules/hub/page.tsx:149 — encaissementsauto — moduleKey: "encaissementsauto",
- src/app/(private)/vehicules/hub/page.tsx:150 — encaissementsauto — hrefTemplate: "/encaissementsauto/{id}",
- src/app/(private)/vehicules/hub/VehicleOperationalHubClient.tsx:20 — relatedRecordsBySection — relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
- src/app/(private)/vehicules/hub/VehicleOperationalHubClient.tsx:49 — relatedRecordsBySection — relatedRecordsBySection: result.relatedRecordsBySection,
- src/app/(private)/vehicules/hub/VehicleOperationalHubClient.tsx:96 — relatedRecordsBySection — relatedRecordsBySection={state.relatedRecordsBySection}
- src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:63 — rendezvous — { label: "Nouveau RDV", href: "/rendezvous/nouveau" },
- src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:65 — interventionsauto — { label: "Interventions", href: "/interventionsauto" },
- src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:66 — facturesauto — { label: "Factures", href: "/facturesauto" },
- src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:121 — facturesauto — href: ca?.href ?? "/facturesauto",
- src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:135 — facturesauto — href: "/facturesauto",
- src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:149 — rendezvous — href: "/rendezvous",
- src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:349 — rendezvous — fallbackHref: "/rendezvous",
- src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:357 — facturesauto — fallbackHref: "/facturesauto",
- src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:381 — interventionsauto — fallbackHref: "/interventionsauto",
- src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:963 — encaissementsauto — href="/encaissementsauto"
- src/runtime/modules/generated/clientsauto/clientsauto.module.ts:374 — rendezvous — key: "rendezvous-client",
- src/runtime/modules/generated/clientsauto/clientsauto.module.ts:375 — rendezvous — moduleKey: "rendezvous",
- src/runtime/modules/generated/vehicules/vehicules.actions.ts:90 — rendezvous — href: "/rendezvous/nouveau",
- src/runtime/modules/generated/vehicules/vehicules.actions.ts:91 — rendezvous — targetModuleKey: "rendezvous",
- src/runtime/modules/generated/vehicules/vehicules.actions.ts:103 — interventionsauto — href: "/interventionsauto/nouveau",
- src/runtime/modules/generated/vehicules/vehicules.actions.ts:104 — interventionsauto — targetModuleKey: "interventionsauto",
- src/runtime/modules/generated/vehicules/vehicules.module.ts:83 — annee — key:"annee",
- src/runtime/modules/generated/vehicules/vehicules.module.ts:97 — carburant — key:"carburant",
- src/runtime/modules/generated/vehicules/vehicules.module.ts:234 — annee — "annee",
- src/runtime/modules/generated/vehicules/vehicules.module.ts:236 — carburant — "carburant",
- src/runtime/modules/generated/vehicules/vehicules.module.ts:252 — annee — "annee",
- src/runtime/modules/generated/vehicules/vehicules.module.ts:254 — carburant — "carburant",
- src/runtime/modules/generated/vehicules/vehicules.module.ts:508 — rendezvous — key: "rendezvous",
- src/runtime/modules/generated/vehicules/vehicules.module.ts:509 — rendezvous — moduleKey: "rendezvous",
- src/runtime/modules/generated/vehicules/vehicules.module.ts:545 — interventionsauto — moduleKey: "interventionsauto",
- src/runtime/modules/generated/vehicules/vehicules.module.ts:582 — facturesauto — moduleKey: "facturesauto",
- src/runtime/modules/generated/vehicules/vehicules.module.ts:606 — interventionsauto — moduleKey: "interventionsauto",
- src/runtime/modules/generated/rendezvous/index.ts:1 — rendezvous — export * from "./rendezvous.module";
- src/runtime/modules/generated/rendezvous/index.ts:2 — rendezvous — export * from "./rendezvous.actions";
- src/runtime/modules/generated/rendezvous/index.ts:3 — rendezvous — export * from "./rendezvous.workflows";
- src/runtime/modules/generated/rendezvous/index.ts:4 — rendezvous — export * from "./rendezvous.permissions";
- src/runtime/modules/generated/rendezvous/index.ts:5 — rendezvous — export * from "./rendezvous.automation";
- src/runtime/modules/generated/rendezvous/index.ts:6 — rendezvous — export * from "./rendezvous.dashboard";
- src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:5 — rendezvous — export const rendezvousActions: ERPModuleAction[] = [
- src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:16 — rendezvous — permission: "rendezvous.workflow",
- src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:22 — rendezvous — permission: "rendezvous.workflow",
- src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:28 — rendezvous — permission: "rendezvous.workflow",
- src/runtime/modules/generated/rendezvous/rendezvous.actions.ts:34 — rendezvous — permission: "rendezvous.workflow",
- src/runtime/modules/generated/rendezvous/rendezvous.automation.ts:1 — rendezvous — export const rendezvousAutomation = [];
- src/runtime/modules/generated/rendezvous/rendezvous.dashboard.ts:1 — rendezvous — export const rendezvousDashboard = {};
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts:4 — rendezvous — rendezvousActions,
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts:5 — rendezvous — } from "./rendezvous.actions";
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts:7 — rendezvous — export const rendezvousModule: ERPModule = {
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts:17 — rendezvous — key: "rendezvous",
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts:38 — rendezvous — collection: "rendezvous",
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts:120 — interventionsauto — relation: { module: "interventionsauto" },
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts:236 — rendezvous — actions: rendezvousActions,
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts:429 — rendezvous — key: "interventions-rendezvous",
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts:430 — interventionsauto — moduleKey: "interventionsauto",
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts:431 — rendezVous — foreignKey: "rendezVousId",
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts:441 — rendezVous — rendezVousId: "id",
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts:445 — rendezVous — lockFields: ["rendezVousId", "clientId", "vehiculeId"],
- src/runtime/modules/generated/rendezvous/rendezvous.module.ts:468 — rendezvous — key: "rendezvous",
- src/runtime/modules/generated/rendezvous/rendezvous.permissions.ts:1 — rendezvous — export const rendezvousPermissions = [];
- src/runtime/modules/generated/rendezvous/rendezvous.workflows.ts:1 — rendezvous — export const rendezvousWorkflows = [];
- src/runtime/modules/generated/interventionsauto/index.ts:1 — interventionsauto — export * from "./interventionsauto.module";
- src/runtime/modules/generated/interventionsauto/index.ts:2 — interventionsauto — export * from "./interventionsauto.actions";
- src/runtime/modules/generated/interventionsauto/index.ts:3 — interventionsauto — export * from "./interventionsauto.workflows";
- src/runtime/modules/generated/interventionsauto/index.ts:4 — interventionsauto — export * from "./interventionsauto.permissions";
- src/runtime/modules/generated/interventionsauto/index.ts:5 — interventionsauto — export * from "./interventionsauto.automation";
- src/runtime/modules/generated/interventionsauto/index.ts:6 — interventionsauto — export * from "./interventionsauto.dashboard";
- src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:5 — interventionsauto — export const interventionsautoActions: ERPModuleAction[] = [
- src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:16 — interventionsauto — permission: "interventionsauto.workflow",
- src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:22 — interventionsauto — permission: "interventionsauto.workflow",
- src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:28 — interventionsauto — permission: "interventionsauto.workflow",
- src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:34 — interventionsauto — permission: "interventionsauto.workflow",
- src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:40 — interventionsauto — permission: "interventionsauto.workflow",
- src/runtime/modules/generated/interventionsauto/interventionsauto.automation.ts:1 — interventionsauto — export const interventionsautoAutomation = [];
- src/runtime/modules/generated/interventionsauto/interventionsauto.dashboard.ts:1 — interventionsauto — export const interventionsautoDashboard = {};
- src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:4 — interventionsauto — interventionsautoActions,
- src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:5 — interventionsauto — } from "./interventionsauto.actions";
- src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:7 — interventionsauto — export const interventionsautoModule: ERPModule = {
- src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:9 — interventionsauto — key: "interventionsauto",
- src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:30 — interventionsauto — collection: "interventionsauto",

## Extraits clés

### src/components/erp/hub/ERPClientOperationalSheet.tsx

```ts
2: 
3: import { useMemo, useState } from "react";
4: import Link from "next/link";
5: import type {
6:   ERPRecordHubConfig,
7:   ERPRecordHubRecord,
8: } from "@/runtime/hub";
9: import { ClientOperationalSearchBox } from "./ClientOperationalSearchBox";
10: import { ERPRelatedRecordsPanel } from "@/components/erp/runtime/ERPRelatedRecordsPanel";
11: import { InvoicePaymentsHistory } from "@/components/erp/billing/InvoicePaymentsHistory";
12: import { rendezvousModule } from "@/runtime/modules/generated/rendezvous/rendezvous.module";
13: import { vehiculesModule } from "@/runtime/modules/generated/vehicules/vehicules.module";
14: import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
15: import type { ERPCompositionChild } from "@/runtime/modules/ERPModule";
16: 
17: type ERPClientOperationalSheetProps = {
18:   config: ERPRecordHubConfig;
19:   rootRecord: ERPRecordHubRecord | null;
20:   vehicles: ERPRecordHubRecord[];
21:   relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
22:   selectedVehicleId?: string | null;
23: };
24: 
25: function text(
26:   record: ERPRecordHubRecord | null | undefined,
27:   fields: string[],
28:   fallback = "-"
29: ): string {
30:   if (!record) return fallback;
```

### src/runtime/hub/RuntimeClientOperationalHubLoader.ts

```ts
1: import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
2: import { clientsautoModule } from "@/runtime/modules/generated/clientsauto/clientsauto.module";
3: import { vehiculesModule } from "@/runtime/modules/generated/vehicules/vehicules.module";
4: import { rendezvousModule } from "@/runtime/modules/generated/rendezvous/rendezvous.module";
5: import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
6: import { lignesinterventionautoModule } from "@/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module";
7: import { facturesautoModule } from "@/runtime/modules/generated/facturesauto/facturesauto.module";
8: import { encaissementsautoModule } from "@/runtime/modules/generated/encaissementsauto/encaissementsauto.module";
9: import type { ERPModule } from "@/runtime/modules/ERPModule";
10: import type {
11:   ERPRecordHubConfig,
12:   ERPRecordHubRecord,
13: } from "./RuntimeHubTypes";
14: 
15: export type RuntimeClientOperationalHubLoadResult = {
16:   config: ERPRecordHubConfig;
17:   rootRecord: ERPRecordHubRecord | null;
18:   primaryRecords: ERPRecordHubRecord[];
19:   relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
20: };
21: 
22: export type RuntimeClientOperationalHubLoaderInput = {
```

### src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts

```ts
1: import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
2: import { vehiculesModule } from "@/runtime/modules/generated/vehicules/vehicules.module";
3: import { clientsautoModule } from "@/runtime/modules/generated/clientsauto/clientsauto.module";
4: import { rendezvousModule } from "@/runtime/modules/generated/rendezvous/rendezvous.module";
5: import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
6: import { lignesinterventionautoModule } from "@/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module";
7: import { facturesautoModule } from "@/runtime/modules/generated/facturesauto/facturesauto.module";
8: import { encaissementsautoModule } from "@/runtime/modules/generated/encaissementsauto/encaissementsauto.module";
9: import type { ERPModule } from "@/runtime/modules/ERPModule";
10: import type {
11:   ERPRecordHubConfig,
12:   ERPRecordHubRecord,
13: } from "./RuntimeHubTypes";
14: 
15: export type RuntimeVehicleOperationalHubLoadResult = {
16:   config: ERPRecordHubConfig;
17:   rootRecord: ERPRecordHubRecord | null;
18:   primaryRecords: ERPRecordHubRecord[];
19:   relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
20: };
21: 
22: export type RuntimeVehicleOperationalHubLoaderInput = {
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts

```ts
1: import type { ERPModule } from "@/runtime/modules/ERPModule";
2: 
3: import {
4:   interventionsautoActions,
5: } from "./interventionsauto.actions";
6: 
7: export const interventionsautoModule: ERPModule = {
8:   metadata: {
9:     key: "interventionsauto",
10:     label: "Interventions",
11:     description: "Interventions atelier AMARKHYS",
12:     icon: "wrench",
13:     category: "amarkhys",
14: 
15:     features: {
16:       dashboard: true,
17:       analytics: true,
18:       workflows: true,
19:       automation: true,
20:       notifications: true,
21:       observability: true,
22:       audit: true,
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts

```ts
1: import type { ERPModule } from "@/runtime/modules/ERPModule";
2: 
3: import {
4:   facturesautoActions,
5: } from "./facturesauto.actions";
6: 
7: export const facturesautoModule: ERPModule = {
8:   metadata: {
9:     key: "facturesauto",
10:     label: "Factures",
11:     description: "Facturation atelier AMARKHYS",
12:     icon: "receipt",
13:     category: "amarkhys",
14:     features: {
15:       dashboard: true,
16:       analytics: true,
17:       workflows: true,
18:       automation: true,
19:       notifications: true,
20:       observability: true,
21:       audit: true,
22:       realtime: true,
```

### src/app/(private)/vehicules/hub/page.tsx

```ts
48:     },
49:     {
50:       key: "revenueTotal",
51:       label: "CA v\u00e9hicule",
52:       source: "computed",
53:       field: "revenueTotal",
54:       format: "number",
55:     },
56:   ],
57:   primaryCollection: {
58:     moduleKey: "interventionsauto",
59:     foreignKey: "vehiculeId",
60:     label: "Interventions du v\u00e9hicule",
61:     defaultDisplayMode: "table",
62:     selectionQueryParam: "selectedInterventionId",
63:     labelFields: ["displayLabel", "titre", "numero", "dateIntervention", "statut"],
64:     subtitleFields: ["montantTTC", "rendezVousId"],
65:     cardFields: ["displayLabel", "dateIntervention", "montantTTC", "statut"],
66:     tableFields: ["dateIntervention", "statut", "montantTTC", "rendezVousId"],
67:     actions: [
68:       {
69:         key: "open-intervention",
70:         label: "Fiche intervention",
71:         kind: "open-record",
72:         moduleKey: "interventionsauto",
73:         hrefTemplate: "/interventionsauto/{id}",
74:         variant: "secondary",
75:       },
76:     ],
```

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx

```ts
53: };
54: 
55: type NotificationView = {
56:  title: string;
57:  description: string;
58:  tone: "warning" | "alert" | "info";
59:  href?: string;
60: };
61: 
62: const quickActions = [
63:  { label: "Nouveau RDV", href: "/rendezvous/nouveau" },
64:  { label: "Clients", href: "/clientsauto" },
65:  { label: "Interventions", href: "/interventionsauto" },
66:  { label: "Factures", href: "/facturesauto" },
67: ];
68: 
69: const serviceBars = [
70:  { label: "Vidange", primary: 42, secondary: 62 },
71:  { label: "Moteur", primary: 28, secondary: 18 },
72:  { label: "Pneus", primary: 74, secondary: 36 },
73:  { label: "Diag.", primary: 82, secondary: 48 },
74:  { label: "Freins", primary: 35, secondary: 30 },
75:  { label: "Entretien", primary: 95, secondary: 22 },
76:  { label: "Clim.", primary: 52, secondary: 26 },
77: ];
78: 
79: function formatValue(value?: number, suffix?: string): string {
80:  const amount = Number(value ?? 0);
81: 
```

### src/app/(private)/clientsauto/hub/page.tsx

```ts
1: import type { ERPRecordHubConfig } from "@/runtime/hub";
2: import { ClientOperationalSheetClient } from "./ClientOperationalSheetClient";
3: import { ClientOperationalSearchBox } from "@/components/erp/hub/ClientOperationalSearchBox";
4: import { ClientOperationalTodayCards } from "@/components/erp/hub/ClientOperationalTodayCards";
5: 
6: type ClientOperationalHubPageProps = {
7:   searchParams?: Promise<{
8:     clientId?: string;
9:     selectedVehicleId?: string;
10:   }>;
11: };
12: 
13: const clientOperationalSheetConfig: ERPRecordHubConfig = {
14:   enabled: true,
15:   key: "clientsauto-operational-sheet",
16:   label: "Fiche Client Opérationnelle",
17:   rootModule: "clientsauto",
18:   layout: "wide",
19:   search: {
20:     placeholder: "Rechercher un client...",
21:     filterFields: ["typeClient", "categorieClient", "statut"],
22:     searchFields: ["nom", "prenom", "raisonSociale", "telephone", "email", "codeClient"],
23:   },
24:   header: {
25:     titleFields: ["displayLabel", "raisonSociale", "nom", "prenom"],
26:     subtitleFields: ["typeClient", "telephone", "email", "codeClient"],
27:     badgeFields: ["typeClient", "statut"],
```

## Décision attendue après audit

- Identifier le composant exact à modifier.
- Ne pas créer un composant AMARKHYS isolé si le hub générique peut être renforcé.
- Préférer une structure expandable générique : parent → selected child → expandable grandchildren.
- Faire une correction progressive : véhicule clean, puis séparation RDV/interventions, puis expansion intervention, puis factures/encaissements.
