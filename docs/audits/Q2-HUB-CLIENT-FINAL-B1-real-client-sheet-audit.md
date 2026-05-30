# Q2-HUB-CLIENT-FINAL-B1 — Audit composant réel fiche client opérationnelle

Fichier cible : `src/components/erp/hub/ERPClientOperationalSheet.tsx`

Objectif : localiser précisément les blocs KPI, véhicules, listes RDV/interventions/lignes/factures/encaissements avant patch.

## Marqueurs

## Interventions actives

- Count : 1
- Lines : 436

```tsx
  426:                       <p><span className="font-semibold text-slate-900">Création :</span> {text(rootRecord, ["dateCreation", "createdAt"])}</p>
  427:                       <p><span className="font-semibold text-slate-900">Dernière visite :</span> {text(rootRecord, ["lastVisit", "derniereVisite"])}</p>
  428:                       <p><span className="font-semibold text-slate-900">Prochain RDV :</span> {text(rootRecord, ["nextAppointment", "prochainRendezVous"])}</p>
  429:                     </div>
  430:                   </div>
  431:                 </div>
  432:               </section>
  433: 
  434:               <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
  435:                 {[
  436:                   ["Interventions actives", text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0")],
  437:                   ["Factures impayées", `${text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0")} impayée(s) · ${money(unpaidAmount)}`],
  438:                   ["CA cumulé", money(revenueTotal)],
  439:                   ["Dernière visite", text(rootRecord, ["lastVisit", "derniereVisite"])],
  440:                   ["Prochain RDV", text(rootRecord, ["nextAppointment", "prochainRendezVous"])],
  441:                 ].map(([label, value]) => (
  442:                   <article
  443:                     key={label}
  444:                     className="rounded-[1.75rem] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200"
  445:                   >
  446:                     <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
  447:                     <p className="mt-2 text-2xl font-extrabold leading-tight text-slate-950">{value}</p>
  448:                   </article>
  449:                 ))}
  450:               </section>
  451: 
  452:               <section className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
  453:                 <SectionTitle
  454:                   title="🚗 VÉHICULES DU CLIENT"
```

## Factures impay

- Count : 1
- Lines : 437

```tsx
  427:                       <p><span className="font-semibold text-slate-900">Dernière visite :</span> {text(rootRecord, ["lastVisit", "derniereVisite"])}</p>
  428:                       <p><span className="font-semibold text-slate-900">Prochain RDV :</span> {text(rootRecord, ["nextAppointment", "prochainRendezVous"])}</p>
  429:                     </div>
  430:                   </div>
  431:                 </div>
  432:               </section>
  433: 
  434:               <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
  435:                 {[
  436:                   ["Interventions actives", text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0")],
  437:                   ["Factures impayées", `${text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0")} impayée(s) · ${money(unpaidAmount)}`],
  438:                   ["CA cumulé", money(revenueTotal)],
  439:                   ["Dernière visite", text(rootRecord, ["lastVisit", "derniereVisite"])],
  440:                   ["Prochain RDV", text(rootRecord, ["nextAppointment", "prochainRendezVous"])],
  441:                 ].map(([label, value]) => (
  442:                   <article
  443:                     key={label}
  444:                     className="rounded-[1.75rem] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200"
  445:                   >
  446:                     <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
  447:                     <p className="mt-2 text-2xl font-extrabold leading-tight text-slate-950">{value}</p>
  448:                   </article>
  449:                 ))}
  450:               </section>
  451: 
  452:               <section className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
  453:                 <SectionTitle
  454:                   title="🚗 VÉHICULES DU CLIENT"
  455:                   action={
```

## CA cum

- Count : 1
- Lines : 438

```tsx
  428:                       <p><span className="font-semibold text-slate-900">Prochain RDV :</span> {text(rootRecord, ["nextAppointment", "prochainRendezVous"])}</p>
  429:                     </div>
  430:                   </div>
  431:                 </div>
  432:               </section>
  433: 
  434:               <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
  435:                 {[
  436:                   ["Interventions actives", text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0")],
  437:                   ["Factures impayées", `${text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0")} impayée(s) · ${money(unpaidAmount)}`],
  438:                   ["CA cumulé", money(revenueTotal)],
  439:                   ["Dernière visite", text(rootRecord, ["lastVisit", "derniereVisite"])],
  440:                   ["Prochain RDV", text(rootRecord, ["nextAppointment", "prochainRendezVous"])],
  441:                 ].map(([label, value]) => (
  442:                   <article
  443:                     key={label}
  444:                     className="rounded-[1.75rem] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200"
  445:                   >
  446:                     <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
  447:                     <p className="mt-2 text-2xl font-extrabold leading-tight text-slate-950">{value}</p>
  448:                   </article>
  449:                 ))}
  450:               </section>
  451: 
  452:               <section className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
  453:                 <SectionTitle
  454:                   title="🚗 VÉHICULES DU CLIENT"
  455:                   action={
  456:                     <Link
```

## Derniere visite

- Count : 0
- Lines : -

## Dernière visite

- Count : 2
- Lines : 427, 439

```tsx
  417:                         {clientType}
  418:                       </span>
  419:                     </div>
  420: 
  421:                     <div className="mt-5 grid gap-x-8 gap-y-3 text-sm text-slate-600 md:grid-cols-2 xl:grid-cols-4">
  422:                       <p><span className="font-semibold text-slate-900">Code client :</span> {text(rootRecord, ["codeClient", "code"])}</p>
  423:                       <p><span className="font-semibold text-slate-900">Téléphone :</span> {text(rootRecord, ["telephone", "téléphone"])}</p>
  424:                       <p><span className="font-semibold text-slate-900">Email :</span> {text(rootRecord, ["email"])}</p>
  425:                       <p><span className="font-semibold text-slate-900">Adresse :</span> {text(rootRecord, ["adresse"])}</p>
  426:                       <p><span className="font-semibold text-slate-900">Création :</span> {text(rootRecord, ["dateCreation", "createdAt"])}</p>
  427:                       <p><span className="font-semibold text-slate-900">Dernière visite :</span> {text(rootRecord, ["lastVisit", "derniereVisite"])}</p>
  428:                       <p><span className="font-semibold text-slate-900">Prochain RDV :</span> {text(rootRecord, ["nextAppointment", "prochainRendezVous"])}</p>
  429:                     </div>
  430:                   </div>
  431:                 </div>
  432:               </section>
  433: 
  434:               <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
  435:                 {[
  436:                   ["Interventions actives", text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0")],
  437:                   ["Factures impayées", `${text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0")} impayée(s) · ${money(unpaidAmount)}`],
  438:                   ["CA cumulé", money(revenueTotal)],
  439:                   ["Dernière visite", text(rootRecord, ["lastVisit", "derniereVisite"])],
  440:                   ["Prochain RDV", text(rootRecord, ["nextAppointment", "prochainRendezVous"])],
  441:                 ].map(([label, value]) => (
  442:                   <article
  443:                     key={label}
  444:                     className="rounded-[1.75rem] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200"
  445:                   >
```

```tsx
  429:                     </div>
  430:                   </div>
  431:                 </div>
  432:               </section>
  433: 
  434:               <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
  435:                 {[
  436:                   ["Interventions actives", text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0")],
  437:                   ["Factures impayées", `${text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0")} impayée(s) · ${money(unpaidAmount)}`],
  438:                   ["CA cumulé", money(revenueTotal)],
  439:                   ["Dernière visite", text(rootRecord, ["lastVisit", "derniereVisite"])],
  440:                   ["Prochain RDV", text(rootRecord, ["nextAppointment", "prochainRendezVous"])],
  441:                 ].map(([label, value]) => (
  442:                   <article
  443:                     key={label}
  444:                     className="rounded-[1.75rem] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200"
  445:                   >
  446:                     <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
  447:                     <p className="mt-2 text-2xl font-extrabold leading-tight text-slate-950">{value}</p>
  448:                   </article>
  449:                 ))}
  450:               </section>
  451: 
  452:               <section className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
  453:                 <SectionTitle
  454:                   title="🚗 VÉHICULES DU CLIENT"
  455:                   action={
  456:                     <Link
  457:                       href={addVehicleHref}
```

## Prochain RDV

- Count : 2
- Lines : 428, 440

```tsx
  418:                       </span>
  419:                     </div>
  420: 
  421:                     <div className="mt-5 grid gap-x-8 gap-y-3 text-sm text-slate-600 md:grid-cols-2 xl:grid-cols-4">
  422:                       <p><span className="font-semibold text-slate-900">Code client :</span> {text(rootRecord, ["codeClient", "code"])}</p>
  423:                       <p><span className="font-semibold text-slate-900">Téléphone :</span> {text(rootRecord, ["telephone", "téléphone"])}</p>
  424:                       <p><span className="font-semibold text-slate-900">Email :</span> {text(rootRecord, ["email"])}</p>
  425:                       <p><span className="font-semibold text-slate-900">Adresse :</span> {text(rootRecord, ["adresse"])}</p>
  426:                       <p><span className="font-semibold text-slate-900">Création :</span> {text(rootRecord, ["dateCreation", "createdAt"])}</p>
  427:                       <p><span className="font-semibold text-slate-900">Dernière visite :</span> {text(rootRecord, ["lastVisit", "derniereVisite"])}</p>
  428:                       <p><span className="font-semibold text-slate-900">Prochain RDV :</span> {text(rootRecord, ["nextAppointment", "prochainRendezVous"])}</p>
  429:                     </div>
  430:                   </div>
  431:                 </div>
  432:               </section>
  433: 
  434:               <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
  435:                 {[
  436:                   ["Interventions actives", text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0")],
  437:                   ["Factures impayées", `${text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0")} impayée(s) · ${money(unpaidAmount)}`],
  438:                   ["CA cumulé", money(revenueTotal)],
  439:                   ["Dernière visite", text(rootRecord, ["lastVisit", "derniereVisite"])],
  440:                   ["Prochain RDV", text(rootRecord, ["nextAppointment", "prochainRendezVous"])],
  441:                 ].map(([label, value]) => (
  442:                   <article
  443:                     key={label}
  444:                     className="rounded-[1.75rem] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200"
  445:                   >
  446:                     <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
```

```tsx
  430:                   </div>
  431:                 </div>
  432:               </section>
  433: 
  434:               <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
  435:                 {[
  436:                   ["Interventions actives", text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0")],
  437:                   ["Factures impayées", `${text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0")} impayée(s) · ${money(unpaidAmount)}`],
  438:                   ["CA cumulé", money(revenueTotal)],
  439:                   ["Dernière visite", text(rootRecord, ["lastVisit", "derniereVisite"])],
  440:                   ["Prochain RDV", text(rootRecord, ["nextAppointment", "prochainRendezVous"])],
  441:                 ].map(([label, value]) => (
  442:                   <article
  443:                     key={label}
  444:                     className="rounded-[1.75rem] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200"
  445:                   >
  446:                     <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
  447:                     <p className="mt-2 text-2xl font-extrabold leading-tight text-slate-950">{value}</p>
  448:                   </article>
  449:                 ))}
  450:               </section>
  451: 
  452:               <section className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
  453:                 <SectionTitle
  454:                   title="🚗 VÉHICULES DU CLIENT"
  455:                   action={
  456:                     <Link
  457:                       href={addVehicleHref}
  458:                       className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white"
```

## Vehicules du client

- Count : 0
- Lines : -

## Véhicules du client

- Count : 1
- Lines : 454

```tsx
  444:                     className="rounded-[1.75rem] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200"
  445:                   >
  446:                     <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
  447:                     <p className="mt-2 text-2xl font-extrabold leading-tight text-slate-950">{value}</p>
  448:                   </article>
  449:                 ))}
  450:               </section>
  451: 
  452:               <section className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
  453:                 <SectionTitle
  454:                   title="🚗 VÉHICULES DU CLIENT"
  455:                   action={
  456:                     <Link
  457:                       href={addVehicleHref}
  458:                       className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white"
  459:                     >
  460:                       Ajouter un véhicule
  461:                     </Link>
  462:                   }
  463:                 />
  464: 
  465:                 {vehicles.length === 0 ? (
  466:                   <EmptyCard>Aucun véhicule lié à ce client.</EmptyCard>
  467:                 ) : isCardMode ? (
  468:                   <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
  469:                     {vehicles.map((vehicle) => (
  470:                       <button
  471:                         key={recordId(vehicle)}
  472:                         type="button"
```

## selectedVehicle

- Count : 36
- Lines : 22, 223, 225, 225, 226, 232, 234, 238, 253, 253, 257, 257

```tsx
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
   31: 
   32:   for (const field of fields) {
   33:     const value = record[field];
   34: 
   35:     if (typeof value === "string" && value.trim().length > 0) {
   36:       return value.trim();
   37:     }
   38: 
   39:     if (typeof value === "number" && Number.isFinite(value)) {
   40:       return String(value);
```

```tsx
  213:   labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
  214:   subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
  215:   relations: [],
  216: });
  217: 
  218: export function ERPClientOperationalSheet({
  219:   config: _config,
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
  224: }: ERPClientOperationalSheetProps) {
  225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
  226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
  227:   );
  228: 
  229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  230:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
  231: 
  232:   const selectedVehicle = useMemo(() => {
  233:     return (
  234:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
  235:       vehicles[0] ??
  236:       null
  237:     );
  238:   }, [vehicles, localSelectedVehicleId]);
  239: 
  240:   const clientName = text(
  241:     rootRecord,
```

```tsx
  215:   relations: [],
  216: });
  217: 
  218: export function ERPClientOperationalSheet({
  219:   config: _config,
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
  224: }: ERPClientOperationalSheetProps) {
  225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
  226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
  227:   );
  228: 
  229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  230:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
  231: 
  232:   const selectedVehicle = useMemo(() => {
  233:     return (
  234:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
  235:       vehicles[0] ??
  236:       null
  237:     );
  238:   }, [vehicles, localSelectedVehicleId]);
  239: 
  240:   const clientName = text(
  241:     rootRecord,
  242:     ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
  243:     "Client"
```

```tsx
  215:   relations: [],
  216: });
  217: 
  218: export function ERPClientOperationalSheet({
  219:   config: _config,
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
  224: }: ERPClientOperationalSheetProps) {
  225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
  226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
  227:   );
  228: 
  229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  230:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
  231: 
  232:   const selectedVehicle = useMemo(() => {
  233:     return (
  234:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
  235:       vehicles[0] ??
  236:       null
  237:     );
  238:   }, [vehicles, localSelectedVehicleId]);
  239: 
  240:   const clientName = text(
  241:     rootRecord,
  242:     ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
  243:     "Client"
```

## selectedVehicleId

- Count : 11
- Lines : 22, 223, 225, 225, 226, 234, 238, 257, 267, 473, 542

```tsx
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
   31: 
   32:   for (const field of fields) {
   33:     const value = record[field];
   34: 
   35:     if (typeof value === "string" && value.trim().length > 0) {
   36:       return value.trim();
   37:     }
   38: 
   39:     if (typeof value === "number" && Number.isFinite(value)) {
   40:       return String(value);
```

```tsx
  213:   labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
  214:   subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
  215:   relations: [],
  216: });
  217: 
  218: export function ERPClientOperationalSheet({
  219:   config: _config,
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
  224: }: ERPClientOperationalSheetProps) {
  225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
  226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
  227:   );
  228: 
  229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  230:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
  231: 
  232:   const selectedVehicle = useMemo(() => {
  233:     return (
  234:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
  235:       vehicles[0] ??
  236:       null
  237:     );
  238:   }, [vehicles, localSelectedVehicleId]);
  239: 
  240:   const clientName = text(
  241:     rootRecord,
```

```tsx
  215:   relations: [],
  216: });
  217: 
  218: export function ERPClientOperationalSheet({
  219:   config: _config,
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
  224: }: ERPClientOperationalSheetProps) {
  225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
  226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
  227:   );
  228: 
  229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  230:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
  231: 
  232:   const selectedVehicle = useMemo(() => {
  233:     return (
  234:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
  235:       vehicles[0] ??
  236:       null
  237:     );
  238:   }, [vehicles, localSelectedVehicleId]);
  239: 
  240:   const clientName = text(
  241:     rootRecord,
  242:     ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
  243:     "Client"
```

```tsx
  215:   relations: [],
  216: });
  217: 
  218: export function ERPClientOperationalSheet({
  219:   config: _config,
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
  224: }: ERPClientOperationalSheetProps) {
  225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
  226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
  227:   );
  228: 
  229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  230:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
  231: 
  232:   const selectedVehicle = useMemo(() => {
  233:     return (
  234:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
  235:       vehicles[0] ??
  236:       null
  237:     );
  238:   }, [vehicles, localSelectedVehicleId]);
  239: 
  240:   const clientName = text(
  241:     rootRecord,
  242:     ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
  243:     "Client"
```

## selectedRendezVous

- Count : 19
- Lines : 229, 229, 330, 332, 336, 338, 339, 343, 354, 358, 361, 364

```tsx
  219:   config: _config,
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
  224: }: ERPClientOperationalSheetProps) {
  225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
  226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
  227:   );
  228: 
  229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  230:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
  231: 
  232:   const selectedVehicle = useMemo(() => {
  233:     return (
  234:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
  235:       vehicles[0] ??
  236:       null
  237:     );
  238:   }, [vehicles, localSelectedVehicleId]);
  239: 
  240:   const clientName = text(
  241:     rootRecord,
  242:     ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
  243:     "Client"
  244:   );
  245: 
  246:   const clientType = text(
  247:     rootRecord,
```

```tsx
  219:   config: _config,
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
  224: }: ERPClientOperationalSheetProps) {
  225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
  226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
  227:   );
  228: 
  229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  230:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
  231: 
  232:   const selectedVehicle = useMemo(() => {
  233:     return (
  234:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
  235:       vehicles[0] ??
  236:       null
  237:     );
  238:   }, [vehicles, localSelectedVehicleId]);
  239: 
  240:   const clientName = text(
  241:     rootRecord,
  242:     ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
  243:     "Client"
  244:   );
  245: 
  246:   const clientType = text(
  247:     rootRecord,
```

```tsx
  320:   ]);
  321: 
  322:   const interventions = relatedRecordsBySection.interventions ?? [];
  323:   const rendezvous = relatedRecordsBySection.rendezvous ?? [];
  324:   const lignes = relatedRecordsBySection.lignes ?? [];
  325:   const factures = relatedRecordsBySection.factures ?? [];
  326:   const encaissements = relatedRecordsBySection.encaissements ?? [];
  327:   const recentActivity = relatedRecordsBySection.recentActivity ?? [];
  328:   const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];
  329: 
  330:   const selectedRendezvous = useMemo(() => {
  331:     return (
  332:       rendezvous.find((item) => recordId(item) === selectedRendezvousId) ??
  333:       rendezvous[0] ??
  334:       null
  335:     );
  336:   }, [rendezvous, selectedRendezvousId]);
  337: 
  338:   const interventionsForSelectedRendezvous = useMemo(() => {
  339:     if (!selectedRendezvous) {
  340:       return interventions;
  341:     }
  342: 
  343:     const rendezvousId = recordId(selectedRendezvous);
  344: 
  345:     const filtered = interventions.filter((intervention) => {
  346:       return [
  347:         "rendezVousId",
  348:         "rendezvousId",
```

```tsx
  322:   const interventions = relatedRecordsBySection.interventions ?? [];
  323:   const rendezvous = relatedRecordsBySection.rendezvous ?? [];
  324:   const lignes = relatedRecordsBySection.lignes ?? [];
  325:   const factures = relatedRecordsBySection.factures ?? [];
  326:   const encaissements = relatedRecordsBySection.encaissements ?? [];
  327:   const recentActivity = relatedRecordsBySection.recentActivity ?? [];
  328:   const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];
  329: 
  330:   const selectedRendezvous = useMemo(() => {
  331:     return (
  332:       rendezvous.find((item) => recordId(item) === selectedRendezvousId) ??
  333:       rendezvous[0] ??
  334:       null
  335:     );
  336:   }, [rendezvous, selectedRendezvousId]);
  337: 
  338:   const interventionsForSelectedRendezvous = useMemo(() => {
  339:     if (!selectedRendezvous) {
  340:       return interventions;
  341:     }
  342: 
  343:     const rendezvousId = recordId(selectedRendezvous);
  344: 
  345:     const filtered = interventions.filter((intervention) => {
  346:       return [
  347:         "rendezVousId",
  348:         "rendezvousId",
  349:         "rdvId",
  350:       ].some((field) => String(intervention[field] ?? "") === rendezvousId);
```

## selectedIntervention

- Count : 17
- Lines : 230, 230, 356, 359, 364, 366, 367, 371, 378, 380, 625, 663

```tsx
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
  224: }: ERPClientOperationalSheetProps) {
  225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
  226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
  227:   );
  228: 
  229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  230:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
  231: 
  232:   const selectedVehicle = useMemo(() => {
  233:     return (
  234:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
  235:       vehicles[0] ??
  236:       null
  237:     );
  238:   }, [vehicles, localSelectedVehicleId]);
  239: 
  240:   const clientName = text(
  241:     rootRecord,
  242:     ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
  243:     "Client"
  244:   );
  245: 
  246:   const clientType = text(
  247:     rootRecord,
  248:     ["clientType", "typeClient", "categorieClient", "type"],
```

```tsx
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
  224: }: ERPClientOperationalSheetProps) {
  225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
  226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
  227:   );
  228: 
  229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  230:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
  231: 
  232:   const selectedVehicle = useMemo(() => {
  233:     return (
  234:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
  235:       vehicles[0] ??
  236:       null
  237:     );
  238:   }, [vehicles, localSelectedVehicleId]);
  239: 
  240:   const clientName = text(
  241:     rootRecord,
  242:     ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
  243:     "Client"
  244:   );
  245: 
  246:   const clientType = text(
  247:     rootRecord,
  248:     ["clientType", "typeClient", "categorieClient", "type"],
```

```tsx
  346:       return [
  347:         "rendezVousId",
  348:         "rendezvousId",
  349:         "rdvId",
  350:       ].some((field) => String(intervention[field] ?? "") === rendezvousId);
  351:     });
  352: 
  353:     return filtered.length > 0 ? filtered : interventions;
  354:   }, [interventions, selectedRendezvous]);
  355: 
  356:   const selectedIntervention = useMemo(() => {
  357:     return (
  358:       interventionsForSelectedRendezvous.find(
  359:         (item) => recordId(item) === selectedInterventionId
  360:       ) ??
  361:       interventionsForSelectedRendezvous[0] ??
  362:       null
  363:     );
  364:   }, [interventionsForSelectedRendezvous, selectedInterventionId]);
  365: 
  366:   const facturesForSelectedIntervention = useMemo(() => {
  367:     if (!selectedIntervention) {
  368:       return [];
  369:     }
  370: 
  371:     const interventionId = recordId(selectedIntervention);
  372: 
  373:     const filtered = factures.filter((facture) => {
  374:       return String(facture.interventionId ?? "") === interventionId;
```

```tsx
  349:         "rdvId",
  350:       ].some((field) => String(intervention[field] ?? "") === rendezvousId);
  351:     });
  352: 
  353:     return filtered.length > 0 ? filtered : interventions;
  354:   }, [interventions, selectedRendezvous]);
  355: 
  356:   const selectedIntervention = useMemo(() => {
  357:     return (
  358:       interventionsForSelectedRendezvous.find(
  359:         (item) => recordId(item) === selectedInterventionId
  360:       ) ??
  361:       interventionsForSelectedRendezvous[0] ??
  362:       null
  363:     );
  364:   }, [interventionsForSelectedRendezvous, selectedInterventionId]);
  365: 
  366:   const facturesForSelectedIntervention = useMemo(() => {
  367:     if (!selectedIntervention) {
  368:       return [];
  369:     }
  370: 
  371:     const interventionId = recordId(selectedIntervention);
  372: 
  373:     const filtered = factures.filter((facture) => {
  374:       return String(facture.interventionId ?? "") === interventionId;
  375:     });
  376: 
  377:     return filtered.length > 0 ? filtered : factures;
```

## Rendez-vous du vehicule

- Count : 0
- Lines : -

## Rendez-vous du véhicule

- Count : 2
- Lines : 162, 579

```tsx
  152: ): ERPCompositionChild {
  153:   return {
  154:     ...child,
  155:     mode: child.mode ?? "readonly",
  156:     allowCreate: child.allowCreate ?? false,
  157:   };
  158: }
  159: 
  160: const rendezvousChild = buildOperationalChild({
  161:   key: "client-sheet-rendezvous",
  162:   title: "Rendez-vous du véhicule sélectionné",
  163:   description: "Les rendez-vous rattachés au véhicule sélectionné dans la fiche client.",
  164:   moduleKey: "rendezvous",
  165:   foreignKey: "vehiculeId",
  166:   badgeLabel: "rendez-vous",
  167:   mode: "readonly",
  168:   allowCreate: false,
  169:   labelFields: ["dateRendezVous", "heureRendezVous", "heure", "typeService", "statut"],
  170:   subtitleFields: ["service", "durationMinutes", "clientLabel"],
  171:   relations: [],
  172: });
  173: 
  174: const interventionsChild = buildOperationalChild({
  175:   key: "client-sheet-interventions",
  176:   title: "Interventions du véhicule",
  177:   description: "Les interventions rattachées au véhicule sélectionné.",
  178:   moduleKey: "interventionsauto",
  179:   foreignKey: "vehiculeId",
  180:   badgeLabel: "intervention(s)",
```

```tsx
  569:                         {text(selectedVehicle, ["displayLabel", "immatriculation", "marque"])}
  570:                       </p>
  571:                       <p className="mt-1 text-sm text-slate-600">
  572:                         {text(selectedVehicle, ["marque"])} · {text(selectedVehicle, ["modele", "modèle"])}
  573:                       </p>
  574:                     </div>
  575: 
  576:                     <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
  577:                       <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
  578:                         <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
  579:                           1. Rendez-vous du véhicule
  580:                         </p>
  581:                         <h3 className="mt-1 text-lg font-extrabold text-slate-950">
  582:                           Sélectionnez un rendez-vous
  583:                         </h3>
  584:                       </div>
  585: 
  586:                       {rendezvous.length > 0 ? (
  587:                         <div className="overflow-x-auto">
  588:                           <table className="min-w-full text-left text-sm">
  589:                             <thead className="bg-slate-950 text-xs uppercase tracking-wide text-white">
  590:                               <tr>
  591:                                 <th className="px-4 py-3">Date</th>
  592:                                 <th className="px-4 py-3">Heure</th>
  593:                                 <th className="px-4 py-3">Service</th>
  594:                                 <th className="px-4 py-3">Statut</th>
  595:                                 <th className="px-4 py-3">Action</th>
  596:                               </tr>
  597:                             </thead>
```

## Interventions du rendez-vous

- Count : 1
- Lines : 650

```tsx
  640:                             </tbody>
  641:                           </table>
  642:                         </div>
  643:                       ) : (
  644:                         <EmptyCard>Aucun rendez-vous lié au véhicule sélectionné.</EmptyCard>
  645:                       )}
  646:                     </section>
  647: 
  648:                     <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
  649:                       <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
  650:                         2. Interventions du rendez-vous sélectionné
  651:                       </p>
  652: 
  653:                       {selectedRendezvous ? (
  654:                         <p className="mt-1 text-sm text-slate-500">
  655:                           Rendez-vous sélectionné : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
  656:                         </p>
  657:                       ) : null}
  658: 
  659:                       {interventionsForSelectedRendezvous.length > 0 ? (
  660:                         <div className="mt-4 grid gap-3">
  661:                           {interventionsForSelectedRendezvous.map((intervention) => {
  662:                             const isSelected =
  663:                               recordId(intervention) === recordId(selectedIntervention);
  664: 
  665:                             return (
  666:                               <button
  667:                                 key={recordId(intervention)}
  668:                                 type="button"
```

## Lignes d

- Count : 1
- Lines : 190

```tsx
  180:   badgeLabel: "intervention(s)",
  181:   mode: "readonly",
  182:   allowCreate: false,
  183:   labelFields: ["dateIntervention", "titre", "numeroIntervention", "statut"],
  184:   subtitleFields: ["montantTTC", "montantHT", "rendezVousId"],
  185:   relations: [],
  186: });
  187: 
  188: const lignesInterventionChild = buildOperationalChild({
  189:   key: "client-sheet-lignes-intervention",
  190:   title: "Lignes d’intervention",
  191:   description: "Lignes liées à l’intervention sélectionnée. Le total ne compte que les lignes validées.",
  192:   moduleKey: "lignesinterventionauto",
  193:   foreignKey: "interventionId",
  194:   badgeLabel: "ligne(s)",
  195:   mode: "readonly",
  196:   allowCreate: false,
  197:   totalField: "montantTotal",
  198:   labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
  199:   subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
  200:   relations: [],
  201: });
  202: 
  203: const facturesChild = buildOperationalChild({
  204:   key: "client-sheet-factures",
  205:   title: "Factures liées",
  206:   description: "Factures liées à l’intervention sélectionnée.",
  207:   moduleKey: "facturesauto",
  208:   foreignKey: "interventionId",
```

## factures

- Count : 21
- Lines : 203, 204, 205, 206, 207, 281, 301, 325, 325, 366, 373, 377

```tsx
  193:   foreignKey: "interventionId",
  194:   badgeLabel: "ligne(s)",
  195:   mode: "readonly",
  196:   allowCreate: false,
  197:   totalField: "montantTotal",
  198:   labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
  199:   subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
  200:   relations: [],
  201: });
  202: 
  203: const facturesChild = buildOperationalChild({
  204:   key: "client-sheet-factures",
  205:   title: "Factures liées",
  206:   description: "Factures liées à l’intervention sélectionnée.",
  207:   moduleKey: "facturesauto",
  208:   foreignKey: "interventionId",
  209:   badgeLabel: "facture(s)",
  210:   mode: "readonly",
  211:   allowCreate: false,
  212:   totalField: "montantTTC",
  213:   labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
  214:   subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
  215:   relations: [],
  216: });
  217: 
  218: export function ERPClientOperationalSheet({
  219:   config: _config,
  220:   rootRecord,
  221:   vehicles,
```

```tsx
  194:   badgeLabel: "ligne(s)",
  195:   mode: "readonly",
  196:   allowCreate: false,
  197:   totalField: "montantTotal",
  198:   labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
  199:   subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
  200:   relations: [],
  201: });
  202: 
  203: const facturesChild = buildOperationalChild({
  204:   key: "client-sheet-factures",
  205:   title: "Factures liées",
  206:   description: "Factures liées à l’intervention sélectionnée.",
  207:   moduleKey: "facturesauto",
  208:   foreignKey: "interventionId",
  209:   badgeLabel: "facture(s)",
  210:   mode: "readonly",
  211:   allowCreate: false,
  212:   totalField: "montantTTC",
  213:   labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
  214:   subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
  215:   relations: [],
  216: });
  217: 
  218: export function ERPClientOperationalSheet({
  219:   config: _config,
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
```

```tsx
  195:   mode: "readonly",
  196:   allowCreate: false,
  197:   totalField: "montantTotal",
  198:   labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
  199:   subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
  200:   relations: [],
  201: });
  202: 
  203: const facturesChild = buildOperationalChild({
  204:   key: "client-sheet-factures",
  205:   title: "Factures liées",
  206:   description: "Factures liées à l’intervention sélectionnée.",
  207:   moduleKey: "facturesauto",
  208:   foreignKey: "interventionId",
  209:   badgeLabel: "facture(s)",
  210:   mode: "readonly",
  211:   allowCreate: false,
  212:   totalField: "montantTTC",
  213:   labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
  214:   subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
  215:   relations: [],
  216: });
  217: 
  218: export function ERPClientOperationalSheet({
  219:   config: _config,
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
```

```tsx
  196:   allowCreate: false,
  197:   totalField: "montantTotal",
  198:   labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
  199:   subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
  200:   relations: [],
  201: });
  202: 
  203: const facturesChild = buildOperationalChild({
  204:   key: "client-sheet-factures",
  205:   title: "Factures liées",
  206:   description: "Factures liées à l’intervention sélectionnée.",
  207:   moduleKey: "facturesauto",
  208:   foreignKey: "interventionId",
  209:   badgeLabel: "facture(s)",
  210:   mode: "readonly",
  211:   allowCreate: false,
  212:   totalField: "montantTTC",
  213:   labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
  214:   subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
  215:   relations: [],
  216: });
  217: 
  218: export function ERPClientOperationalSheet({
  219:   config: _config,
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
  224: }: ERPClientOperationalSheetProps) {
```

## encaissements

- Count : 12
- Lines : 286, 306, 326, 326, 398, 721, 732, 756, 756, 824, 864, 864

```tsx
  276:   const interventionsHref = queryHref("/interventionsauto", {
  277:     clientId,
  278:     vehiculeId: selectedVehicleRecordId,
  279:   });
  280: 
  281:   const invoicesHref = queryHref("/facturesauto", {
  282:     clientId,
  283:     vehiculeId: selectedVehicleRecordId,
  284:   });
  285: 
  286:   const paymentsHref = queryHref("/encaissementsauto", {
  287:     clientId,
  288:     vehiculeId: selectedVehicleRecordId,
  289:   });
  290: 
  291:   const vehicleDetailHref = queryHref(href("/vehicules", selectedVehicle), {
  292:     clientId,
  293:     returnTo: clientReturnTo,
  294:   });
  295: 
  296:   const interventionDetailHref = queryHref("/interventionsauto", {
  297:     clientId,
  298:     vehiculeId: selectedVehicleRecordId,
  299:   });
  300: 
  301:   const invoiceDetailHref = queryHref("/facturesauto", {
  302:     clientId,
  303:     vehiculeId: selectedVehicleRecordId,
  304:   });
```

```tsx
  296:   const interventionDetailHref = queryHref("/interventionsauto", {
  297:     clientId,
  298:     vehiculeId: selectedVehicleRecordId,
  299:   });
  300: 
  301:   const invoiceDetailHref = queryHref("/facturesauto", {
  302:     clientId,
  303:     vehiculeId: selectedVehicleRecordId,
  304:   });
  305: 
  306:   const paymentDetailHref = queryHref("/encaissementsauto", {
  307:     clientId,
  308:     vehiculeId: selectedVehicleRecordId,
  309:   });
  310: 
  311:   const unpaidAmount = numberValue(rootRecord, [
  312:     "unpaidInvoicesAmount",
  313:     "montantImpayees",
  314:   ]);
  315: 
  316:   const revenueTotal = numberValue(rootRecord, [
  317:     "revenueTotal",
  318:     "chiffreAffaires",
  319:     "caCumule",
  320:   ]);
  321: 
  322:   const interventions = relatedRecordsBySection.interventions ?? [];
  323:   const rendezvous = relatedRecordsBySection.rendezvous ?? [];
  324:   const lignes = relatedRecordsBySection.lignes ?? [];
```

```tsx
  316:   const revenueTotal = numberValue(rootRecord, [
  317:     "revenueTotal",
  318:     "chiffreAffaires",
  319:     "caCumule",
  320:   ]);
  321: 
  322:   const interventions = relatedRecordsBySection.interventions ?? [];
  323:   const rendezvous = relatedRecordsBySection.rendezvous ?? [];
  324:   const lignes = relatedRecordsBySection.lignes ?? [];
  325:   const factures = relatedRecordsBySection.factures ?? [];
  326:   const encaissements = relatedRecordsBySection.encaissements ?? [];
  327:   const recentActivity = relatedRecordsBySection.recentActivity ?? [];
  328:   const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];
  329: 
  330:   const selectedRendezvous = useMemo(() => {
  331:     return (
  332:       rendezvous.find((item) => recordId(item) === selectedRendezvousId) ??
  333:       rendezvous[0] ??
  334:       null
  335:     );
  336:   }, [rendezvous, selectedRendezvousId]);
  337: 
  338:   const interventionsForSelectedRendezvous = useMemo(() => {
  339:     if (!selectedRendezvous) {
  340:       return interventions;
  341:     }
  342: 
  343:     const rendezvousId = recordId(selectedRendezvous);
  344: 
```

```tsx
  316:   const revenueTotal = numberValue(rootRecord, [
  317:     "revenueTotal",
  318:     "chiffreAffaires",
  319:     "caCumule",
  320:   ]);
  321: 
  322:   const interventions = relatedRecordsBySection.interventions ?? [];
  323:   const rendezvous = relatedRecordsBySection.rendezvous ?? [];
  324:   const lignes = relatedRecordsBySection.lignes ?? [];
  325:   const factures = relatedRecordsBySection.factures ?? [];
  326:   const encaissements = relatedRecordsBySection.encaissements ?? [];
  327:   const recentActivity = relatedRecordsBySection.recentActivity ?? [];
  328:   const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];
  329: 
  330:   const selectedRendezvous = useMemo(() => {
  331:     return (
  332:       rendezvous.find((item) => recordId(item) === selectedRendezvousId) ??
  333:       rendezvous[0] ??
  334:       null
  335:     );
  336:   }, [rendezvous, selectedRendezvousId]);
  337: 
  338:   const interventionsForSelectedRendezvous = useMemo(() => {
  339:     if (!selectedRendezvous) {
  340:       return interventions;
  341:     }
  342: 
  343:     const rendezvousId = recordId(selectedRendezvous);
  344: 
```

## Dossier vehicule selectionne

- Count : 0
- Lines : -

## Dossier véhicule sélectionné

- Count : 1
- Lines : 847

```tsx
  837:                     "Décisions basées sur des données réelles",
  838:                   ].map((benefit) => (
  839:                     <li key={benefit} className="rounded-[1.25rem] bg-slate-50 p-4 font-medium">
  840:                       {benefit}
  841:                     </li>
  842:                   ))}
  843:                 </ul>
  844:               </section>
  845: 
  846:               <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
  847:                 <SectionTitle title="DOSSIER VÉHICULE SÉLECTIONNÉ" />
  848: 
  849:                 {selectedVehicle ? (
  850:                   <div className="space-y-4">
  851:                     <div className="rounded-[1.5rem] bg-emerald-50 p-4">
  852:                       <p className="text-lg font-black text-slate-950">
  853:                         {text(selectedVehicle, ["displayLabel", "immatriculation", "marque"])}
  854:                       </p>
  855:                       <p className="mt-1 text-sm text-slate-600">
  856:                         {text(selectedVehicle, ["marque"])} · {text(selectedVehicle, ["modele", "modèle"])}
  857:                       </p>
  858:                     </div>
  859: 
  860:                     <div className="grid gap-3">
  861:                       <EmptyCard>Rendez-vous liés : {rendezvous.length}</EmptyCard>
  862:                       <EmptyCard>Interventions liées : {interventions.length}</EmptyCard>
  863:                       <EmptyCard>Factures liées : {factures.length}</EmptyCard>
  864:                       <EmptyCard>Encaissements liés : {encaissements.length}</EmptyCard>
  865:                     </div>
```

## Navigation rapide

- Count : 1
- Lines : 797

```tsx
  787:                   <div className="rounded-[1.5rem] bg-slate-50 p-4">
  788:                     <p className="font-black text-slate-950">Entreprise</p>
  789:                     <p className="mt-1 text-slate-600">
  790:                       Tableau administratif avec affectation, contrat et statut.
  791:                     </p>
  792:                   </div>
  793:                 </div>
  794:               </section>
  795: 
  796:               <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
  797:                 <SectionTitle title="NAVIGATION RAPIDE" />
  798:                 <div className="grid gap-3">
  799:                   <Link
  800:                     href={vehicleDetailHref}
  801:                     className="rounded-[1.25rem] bg-slate-950 px-4 py-3 text-sm font-bold text-white"
  802:                   >
  803:                     🚗 Fiche véhicule complète
  804:                   </Link>
  805: 
  806:                   <Link
  807:                     href={interventionDetailHref}
  808:                     className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
  809:                   >
  810:                     🔧 Fiche intervention
  811:                   </Link>
  812: 
  813:                   <Link
  814:                     href={invoiceDetailHref}
  815:                     className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
```

## onClick

- Count : 4
- Lines : 473, 542, 623, 669

```tsx
  463:                 />
  464: 
  465:                 {vehicles.length === 0 ? (
  466:                   <EmptyCard>Aucun véhicule lié à ce client.</EmptyCard>
  467:                 ) : isCardMode ? (
  468:                   <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
  469:                     {vehicles.map((vehicle) => (
  470:                       <button
  471:                         key={recordId(vehicle)}
  472:                         type="button"
  473:                         onClick={() => setLocalSelectedVehicleId(recordId(vehicle))}
  474:                         className={[
  475:                           "rounded-[1.75rem] border p-5 text-left shadow-sm transition",
  476:                           recordId(vehicle) === recordId(selectedVehicle)
  477:                             ? "border-emerald-400 bg-emerald-50"
  478:                             : "border-slate-200 bg-white hover:border-emerald-200",
  479:                         ].join(" ")}
  480:                       >
  481:                         <div className="mb-5 h-44 rounded-[1.5rem] bg-gradient-to-br from-slate-200 to-slate-100" />
  482: 
  483:                         <div className="flex items-start justify-between gap-3">
  484:                           <div>
  485:                             <p className="text-lg font-extrabold text-slate-950">
  486:                               {text(vehicle, ["displayLabel", "immatriculation", "marque"])}
  487:                             </p>
  488:                             <p className="mt-1 text-sm text-slate-500">
  489:                               {text(vehicle, ["marque"])} · {text(vehicle, ["modele", "modèle"])}
  490:                             </p>
  491:                           </div>
```

```tsx
  532:                             </td>
  533:                             <td className="px-5 py-4 text-slate-600">
  534:                               {text(vehicle, ["immatriculation"])}
  535:                             </td>
  536:                             <td className="px-5 py-4 text-slate-600">
  537:                               {text(vehicle, ["statut"], "actif")}
  538:                             </td>
  539:                             <td className="px-5 py-4">
  540:                               <button
  541:                                 type="button"
  542:                                 onClick={() => setLocalSelectedVehicleId(recordId(vehicle))}
  543:                                 className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white"
  544:                               >
  545:                                 Sélectionner
  546:                               </button>
  547:                             </td>
  548:                           </tr>
  549:                         ))}
  550:                       </tbody>
  551:                     </table>
  552:                   </div>
  553:                 )}
  554:               </section>
  555: 
  556:               <section
  557:                 id="parcours-operationnel"
  558:                 className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200"
  559:               >
  560:                 <SectionTitle title="PARCOURS OPÉRATIONNEL : CLIENT → VÉHICULE → RENDEZ-VOUS → INTERVENTION → FACTURE" />
```

```tsx
  613:                                     </td>
  614:                                     <td className="px-4 py-3 text-slate-600">
  615:                                       {text(appointment, ["typeService", "service", "displayLabel"])}
  616:                                     </td>
  617:                                     <td className="px-4 py-3 text-slate-600">
  618:                                       {text(appointment, ["statut", "status"], "suivi")}
  619:                                     </td>
  620:                                     <td className="px-4 py-3">
  621:                                       <button
  622:                                         type="button"
  623:                                         onClick={() => {
  624:                                           setSelectedRendezvousId(recordId(appointment));
  625:                                           setSelectedInterventionId(null);
  626:                                         }}
  627:                                         className={[
  628:                                           "rounded-full px-3 py-1.5 text-xs font-bold",
  629:                                           isSelected
  630:                                             ? "bg-emerald-700 text-white"
  631:                                             : "bg-slate-100 text-slate-900",
  632:                                         ].join(" ")}
  633:                                       >
  634:                                         {isSelected ? "Sélectionné" : "Sélectionner"}
  635:                                       </button>
  636:                                     </td>
  637:                                   </tr>
  638:                                 );
  639:                               })}
  640:                             </tbody>
  641:                           </table>
```

```tsx
  659:                       {interventionsForSelectedRendezvous.length > 0 ? (
  660:                         <div className="mt-4 grid gap-3">
  661:                           {interventionsForSelectedRendezvous.map((intervention) => {
  662:                             const isSelected =
  663:                               recordId(intervention) === recordId(selectedIntervention);
  664: 
  665:                             return (
  666:                               <button
  667:                                 key={recordId(intervention)}
  668:                                 type="button"
  669:                                 onClick={() => setSelectedInterventionId(recordId(intervention))}
  670:                                 className={[
  671:                                   "rounded-[1.5rem] border p-4 text-left transition",
  672:                                   isSelected
  673:                                     ? "border-emerald-400 bg-emerald-50"
  674:                                     : "border-slate-200 bg-slate-50 hover:border-emerald-200",
  675:                                 ].join(" ")}
  676:                               >
  677:                                 <div className="flex flex-wrap items-start justify-between gap-3">
  678:                                   <div>
  679:                                     <p className="font-extrabold text-slate-950">
  680:                                       {text(intervention, ["displayLabel", "dateIntervention", "titre", "numeroIntervention"])}
  681:                                     </p>
  682:                                     <p className="mt-1 text-sm text-slate-500">
  683:                                       {text(intervention, ["statut", "status"], "suivi")} · {text(intervention, ["montantTTC", "montantHT"], "0")}
  684:                                     </p>
  685:                                   </div>
  686: 
  687:                                   <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-900 ring-1 ring-slate-200">
```

## setSelected

- Count : 5
- Lines : 229, 230, 624, 625, 669

```tsx
  219:   config: _config,
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
  224: }: ERPClientOperationalSheetProps) {
  225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
  226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
  227:   );
  228: 
  229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  230:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
  231: 
  232:   const selectedVehicle = useMemo(() => {
  233:     return (
  234:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
  235:       vehicles[0] ??
  236:       null
  237:     );
  238:   }, [vehicles, localSelectedVehicleId]);
  239: 
  240:   const clientName = text(
  241:     rootRecord,
  242:     ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
  243:     "Client"
  244:   );
  245: 
  246:   const clientType = text(
  247:     rootRecord,
```

```tsx
  220:   rootRecord,
  221:   vehicles,
  222:   relatedRecordsBySection,
  223:   selectedVehicleId = null,
  224: }: ERPClientOperationalSheetProps) {
  225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
  226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
  227:   );
  228: 
  229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  230:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
  231: 
  232:   const selectedVehicle = useMemo(() => {
  233:     return (
  234:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
  235:       vehicles[0] ??
  236:       null
  237:     );
  238:   }, [vehicles, localSelectedVehicleId]);
  239: 
  240:   const clientName = text(
  241:     rootRecord,
  242:     ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
  243:     "Client"
  244:   );
  245: 
  246:   const clientType = text(
  247:     rootRecord,
  248:     ["clientType", "typeClient", "categorieClient", "type"],
```

```tsx
  614:                                     <td className="px-4 py-3 text-slate-600">
  615:                                       {text(appointment, ["typeService", "service", "displayLabel"])}
  616:                                     </td>
  617:                                     <td className="px-4 py-3 text-slate-600">
  618:                                       {text(appointment, ["statut", "status"], "suivi")}
  619:                                     </td>
  620:                                     <td className="px-4 py-3">
  621:                                       <button
  622:                                         type="button"
  623:                                         onClick={() => {
  624:                                           setSelectedRendezvousId(recordId(appointment));
  625:                                           setSelectedInterventionId(null);
  626:                                         }}
  627:                                         className={[
  628:                                           "rounded-full px-3 py-1.5 text-xs font-bold",
  629:                                           isSelected
  630:                                             ? "bg-emerald-700 text-white"
  631:                                             : "bg-slate-100 text-slate-900",
  632:                                         ].join(" ")}
  633:                                       >
  634:                                         {isSelected ? "Sélectionné" : "Sélectionner"}
  635:                                       </button>
  636:                                     </td>
  637:                                   </tr>
  638:                                 );
  639:                               })}
  640:                             </tbody>
  641:                           </table>
  642:                         </div>
```

```tsx
  615:                                       {text(appointment, ["typeService", "service", "displayLabel"])}
  616:                                     </td>
  617:                                     <td className="px-4 py-3 text-slate-600">
  618:                                       {text(appointment, ["statut", "status"], "suivi")}
  619:                                     </td>
  620:                                     <td className="px-4 py-3">
  621:                                       <button
  622:                                         type="button"
  623:                                         onClick={() => {
  624:                                           setSelectedRendezvousId(recordId(appointment));
  625:                                           setSelectedInterventionId(null);
  626:                                         }}
  627:                                         className={[
  628:                                           "rounded-full px-3 py-1.5 text-xs font-bold",
  629:                                           isSelected
  630:                                             ? "bg-emerald-700 text-white"
  631:                                             : "bg-slate-100 text-slate-900",
  632:                                         ].join(" ")}
  633:                                       >
  634:                                         {isSelected ? "Sélectionné" : "Sélectionner"}
  635:                                       </button>
  636:                                     </td>
  637:                                   </tr>
  638:                                 );
  639:                               })}
  640:                             </tbody>
  641:                           </table>
  642:                         </div>
  643:                       ) : (
```

## Décision de patch attendue

1. Agrandir les KPI haut gauche.
2. Réduire/clarifier l'espace vide dans la carte véhicule.
3. Vérifier que le clic véhicule pilote bien `selectedVehicleId`.
4. Vérifier que les listes RDV/interventions/lignes/factures/encaissements sont déjà filtrées par sélection.
5. Corriger uniquement le composant existant, sans créer de nouveau hub.