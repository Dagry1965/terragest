# AMARKHYS-HUB-FLOW-D2-REFOCUS — Audit master/detail intervention table

Date: 2026-06-01T03:10:07.250Z

## Objectif

- Supprimer la carte verte Véhicule sélectionné.
- Remplacer le rendu interventions par un tableau maître/détail.
- Préparer une ligne détail pleine largeur sous l’intervention ouverte.

## Checks

- OK — carte véhicule sélectionné localisée
- OK — rendu interventions actuel localisé
- OK — expandedInterventionId existe
- OK — toggleExpandedIntervention existe
- OK — lignes disponibles
- OK — factures disponibles
- OK — encaissements disponibles
- OK — ancienne expansion D2 déjà présente ou absente à confirmer

## Synthèse

- OK: 8
- FAIL: 0

## Hits

- L188 — lignes — const lignesInterventionChild = buildOperationalChild({
- L189 — lignes — key: "client-sheet-lignes-intervention",
- L191 — lignes — description: "Lignes liées à l’intervention sélectionnée. Le total ne compte que les lignes validées.",
- L192 — lignes — moduleKey: "lignesinterventionauto",
- L230 — expandedInterventionId — const [expandedInterventionId, setExpandedInterventionId] = useState<string | null>(null);
- L289 — encaissements — const paymentsHref = queryHref("/encaissementsauto", {
- L309 — encaissements — const paymentDetailHref = queryHref("/encaissementsauto", {
- L327 — lignes — const lignes = relatedRecordsBySection.lignes ?? [];
- L329 — encaissements — const encaissements = relatedRecordsBySection.encaissements ?? [];
- L333 — toggleExpandedIntervention — const toggleExpandedIntervention = (id: string) => {
- L381 — facturesForSelectedIntervention — const facturesForSelectedIntervention = useMemo(() => {
- L395 — facturesForSelectedIntervention — const selectedInvoice = facturesForSelectedIntervention[0] ?? null;
- L413 — encaissements — Vue 360° du client depuis ses véhicules jusqu’aux factures et encaissements.
- L481 — encaissements — Selectionnez un vehicule pour afficher ses rendez-vous, interventions, lignes, factures et encaissements.
- L481 — lignes — Selectionnez un vehicule pour afficher ses rendez-vous, interventions, lignes, factures et encaissements.
- L578 — selectedVehicle ? — {selectedVehicle ? (
- L582 — Véhicule sélectionné — Véhicule sélectionné
- L585 — text(selectedVehicle — {text(selectedVehicle, ["displayLabel", "immatriculation", "marque"])}
- L588 — text(selectedVehicle — {text(selectedVehicle, ["marque"])} · {text(selectedVehicle, ["modele", "modèle"])}
- L687 — interventionsForSelectedRendezvous.map — {interventionsForSelectedRendezvous.map((intervention) => {
- L694 — data-q2-hub-client-final-c2 — data-q2-hub-client-final-c2="Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES"
- L718 — lignes — {isSelected ? "Masquer les lignes" : "Voir les lignes"}
- L728 — lignes — child={lignesInterventionChild}
- L765 — encaissements — <EmptyCard>Aucune facture sélectionnée pour afficher les encaissements.</EmptyCard>
- L783 — text(selectedVehicle — ? text(selectedVehicle, ["displayLabel", "immatriculation"])
- L787 — lignes — ["3. Détail intervention", `${lignes.length} ligne(s)`],
- L789 — encaissements — ["5. Encaissements", `${encaissements.length} encaissement(s)`],
- L857 — encaissements — 💳 Historique encaissements
- L882 — selectedVehicle ? — {selectedVehicle ? (
- L886 — text(selectedVehicle — {text(selectedVehicle, ["displayLabel", "immatriculation", "marque"])}
- L889 — text(selectedVehicle — {text(selectedVehicle, ["marque"])} · {text(selectedVehicle, ["modele", "modèle"])}
- L897 — encaissements — <EmptyCard>Encaissements liés : {encaissements.length}</EmptyCard>

## Contextes clés

### L188 — lignes

```tsx
176:   title: "Interventions du véhicule",
177:   description: "Les interventions rattachées au véhicule sélectionné.",
178:   moduleKey: "interventionsauto",
179:   foreignKey: "vehiculeId",
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
```

### L189 — lignes

```tsx
177:   description: "Les interventions rattachées au véhicule sélectionné.",
178:   moduleKey: "interventionsauto",
179:   foreignKey: "vehiculeId",
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
```

### L191 — lignes

```tsx
179:   foreignKey: "vehiculeId",
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

### L192 — lignes

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

### L230 — expandedInterventionId

```tsx
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
230:   const [expandedInterventionId, setExpandedInterventionId] = useState<string | null>(null);
231:   const [expandedFactureId, setExpandedFactureId] = useState<string | null>(null);
232:   const [expandedEncaissementId, setExpandedEncaissementId] = useState<string | null>(null);
233:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
234: 
235:   const selectedVehicle = useMemo(() => {
236:     return (
237:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
238:       vehicles[0] ??
239:       null
240:     );
241:   }, [vehicles, localSelectedVehicleId]);
242: 
243:   const clientName = text(
244:     rootRecord,
245:     ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
246:     "Client"
247:   );
248: 
249:   const clientType = text(
250:     rootRecord,
251:     ["clientType", "typeClient", "categorieClient", "type"],
252:     "Particulier"
253:   );
254: 
255:   const clientId = recordId(rootRecord);
256:   const selectedVehicleRecordId = recordId(selectedVehicle);
257: 
258:   const clientReturnTo = queryHref("/clientsauto/hub", {
259:     clientId,
260:     selectedVehicleId: selectedVehicleRecordId,
```

### L289 — encaissements

```tsx
277:   });
278: 
279:   const interventionsHref = queryHref("/interventionsauto", {
280:     clientId,
281:     vehiculeId: selectedVehicleRecordId,
282:   });
283: 
284:   const invoicesHref = queryHref("/facturesauto", {
285:     clientId,
286:     vehiculeId: selectedVehicleRecordId,
287:   });
288: 
289:   const paymentsHref = queryHref("/encaissementsauto", {
290:     clientId,
291:     vehiculeId: selectedVehicleRecordId,
292:   });
293: 
294:   const vehicleDetailHref = queryHref(href("/vehicules", selectedVehicle), {
295:     clientId,
296:     returnTo: clientReturnTo,
297:   });
298: 
299:   const interventionDetailHref = queryHref("/interventionsauto", {
300:     clientId,
301:     vehiculeId: selectedVehicleRecordId,
302:   });
303: 
304:   const invoiceDetailHref = queryHref("/facturesauto", {
305:     clientId,
306:     vehiculeId: selectedVehicleRecordId,
307:   });
308: 
309:   const paymentDetailHref = queryHref("/encaissementsauto", {
310:     clientId,
311:     vehiculeId: selectedVehicleRecordId,
312:   });
313: 
314:   const unpaidAmount = numberValue(rootRecord, [
315:     "unpaidInvoicesAmount",
316:     "montantImpayees",
317:   ]);
318: 
319:   const revenueTotal = numberValue(rootRecord, [
```

### L309 — encaissements

```tsx
297:   });
298: 
299:   const interventionDetailHref = queryHref("/interventionsauto", {
300:     clientId,
301:     vehiculeId: selectedVehicleRecordId,
302:   });
303: 
304:   const invoiceDetailHref = queryHref("/facturesauto", {
305:     clientId,
306:     vehiculeId: selectedVehicleRecordId,
307:   });
308: 
309:   const paymentDetailHref = queryHref("/encaissementsauto", {
310:     clientId,
311:     vehiculeId: selectedVehicleRecordId,
312:   });
313: 
314:   const unpaidAmount = numberValue(rootRecord, [
315:     "unpaidInvoicesAmount",
316:     "montantImpayees",
317:   ]);
318: 
319:   const revenueTotal = numberValue(rootRecord, [
320:     "revenueTotal",
321:     "chiffreAffaires",
322:     "caCumule",
323:   ]);
324: 
325:   const interventions = relatedRecordsBySection.interventions ?? [];
326:   const rendezvous = relatedRecordsBySection.rendezvous ?? [];
327:   const lignes = relatedRecordsBySection.lignes ?? [];
328:   const factures = relatedRecordsBySection.factures ?? [];
329:   const encaissements = relatedRecordsBySection.encaissements ?? [];
330:   const recentActivity = relatedRecordsBySection.recentActivity ?? [];
331:   const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];
332: 
333:   const toggleExpandedIntervention = (id: string) => {
334:     setExpandedInterventionId((current) => (current === id ? null : id));
335:   };
336: 
337:   const toggleExpandedFacture = (id: string) => {
338:     setExpandedFactureId((current) => (current === id ? null : id));
339:   };
```

### L327 — lignes

```tsx
315:     "unpaidInvoicesAmount",
316:     "montantImpayees",
317:   ]);
318: 
319:   const revenueTotal = numberValue(rootRecord, [
320:     "revenueTotal",
321:     "chiffreAffaires",
322:     "caCumule",
323:   ]);
324: 
325:   const interventions = relatedRecordsBySection.interventions ?? [];
326:   const rendezvous = relatedRecordsBySection.rendezvous ?? [];
327:   const lignes = relatedRecordsBySection.lignes ?? [];
328:   const factures = relatedRecordsBySection.factures ?? [];
329:   const encaissements = relatedRecordsBySection.encaissements ?? [];
330:   const recentActivity = relatedRecordsBySection.recentActivity ?? [];
331:   const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];
332: 
333:   const toggleExpandedIntervention = (id: string) => {
334:     setExpandedInterventionId((current) => (current === id ? null : id));
335:   };
336: 
337:   const toggleExpandedFacture = (id: string) => {
338:     setExpandedFactureId((current) => (current === id ? null : id));
339:   };
340: 
341:   const toggleExpandedEncaissement = (id: string) => {
342:     setExpandedEncaissementId((current) => (current === id ? null : id));
343:   };
344: 
345:   const selectedRendezvous = useMemo(() => {
346:     return (
347:       rendezvous.find((item) => recordId(item) === selectedRendezvousId) ??
348:       rendezvous[0] ??
349:       null
350:     );
351:   }, [rendezvous, selectedRendezvousId]);
352: 
353:   const interventionsForSelectedRendezvous = useMemo(() => {
354:     if (!selectedRendezvous) {
355:       return interventions;
356:     }
357: 
```

### L329 — encaissements

```tsx
317:   ]);
318: 
319:   const revenueTotal = numberValue(rootRecord, [
320:     "revenueTotal",
321:     "chiffreAffaires",
322:     "caCumule",
323:   ]);
324: 
325:   const interventions = relatedRecordsBySection.interventions ?? [];
326:   const rendezvous = relatedRecordsBySection.rendezvous ?? [];
327:   const lignes = relatedRecordsBySection.lignes ?? [];
328:   const factures = relatedRecordsBySection.factures ?? [];
329:   const encaissements = relatedRecordsBySection.encaissements ?? [];
330:   const recentActivity = relatedRecordsBySection.recentActivity ?? [];
331:   const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];
332: 
333:   const toggleExpandedIntervention = (id: string) => {
334:     setExpandedInterventionId((current) => (current === id ? null : id));
335:   };
336: 
337:   const toggleExpandedFacture = (id: string) => {
338:     setExpandedFactureId((current) => (current === id ? null : id));
339:   };
340: 
341:   const toggleExpandedEncaissement = (id: string) => {
342:     setExpandedEncaissementId((current) => (current === id ? null : id));
343:   };
344: 
345:   const selectedRendezvous = useMemo(() => {
346:     return (
347:       rendezvous.find((item) => recordId(item) === selectedRendezvousId) ??
348:       rendezvous[0] ??
349:       null
350:     );
351:   }, [rendezvous, selectedRendezvousId]);
352: 
353:   const interventionsForSelectedRendezvous = useMemo(() => {
354:     if (!selectedRendezvous) {
355:       return interventions;
356:     }
357: 
358:     const rendezvousId = recordId(selectedRendezvous);
359: 
```

### L333 — toggleExpandedIntervention

```tsx
321:     "chiffreAffaires",
322:     "caCumule",
323:   ]);
324: 
325:   const interventions = relatedRecordsBySection.interventions ?? [];
326:   const rendezvous = relatedRecordsBySection.rendezvous ?? [];
327:   const lignes = relatedRecordsBySection.lignes ?? [];
328:   const factures = relatedRecordsBySection.factures ?? [];
329:   const encaissements = relatedRecordsBySection.encaissements ?? [];
330:   const recentActivity = relatedRecordsBySection.recentActivity ?? [];
331:   const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];
332: 
333:   const toggleExpandedIntervention = (id: string) => {
334:     setExpandedInterventionId((current) => (current === id ? null : id));
335:   };
336: 
337:   const toggleExpandedFacture = (id: string) => {
338:     setExpandedFactureId((current) => (current === id ? null : id));
339:   };
340: 
341:   const toggleExpandedEncaissement = (id: string) => {
342:     setExpandedEncaissementId((current) => (current === id ? null : id));
343:   };
344: 
345:   const selectedRendezvous = useMemo(() => {
346:     return (
347:       rendezvous.find((item) => recordId(item) === selectedRendezvousId) ??
348:       rendezvous[0] ??
349:       null
350:     );
351:   }, [rendezvous, selectedRendezvousId]);
352: 
353:   const interventionsForSelectedRendezvous = useMemo(() => {
354:     if (!selectedRendezvous) {
355:       return interventions;
356:     }
357: 
358:     const rendezvousId = recordId(selectedRendezvous);
359: 
360:     const filtered = interventions.filter((intervention) => {
361:       return [
362:         "rendezVousId",
363:         "rendezvousId",
```

### L381 — facturesForSelectedIntervention

```tsx
369:   }, [interventions, selectedRendezvous]);
370: 
371:   const selectedIntervention = useMemo(() => {
372:     return (
373:       interventionsForSelectedRendezvous.find(
374:         (item) => recordId(item) === selectedInterventionId
375:       ) ??
376:       interventionsForSelectedRendezvous[0] ??
377:       null
378:     );
379:   }, [interventionsForSelectedRendezvous, selectedInterventionId]);
380: 
381:   const facturesForSelectedIntervention = useMemo(() => {
382:     if (!selectedIntervention) {
383:       return [];
384:     }
385: 
386:     const interventionId = recordId(selectedIntervention);
387: 
388:     const filtered = factures.filter((facture) => {
389:       return String(facture.interventionId ?? "") === interventionId;
390:     });
391: 
392:     return filtered.length > 0 ? filtered : factures;
393:   }, [factures, selectedIntervention]);
394: 
395:   const selectedInvoice = facturesForSelectedIntervention[0] ?? null;
396: 
397:   const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());
398: 
399:   return (
400:     <main className="min-h-screen bg-slate-100">
401:       <div className="mx-auto max-w-[2040px] px-8 py-10 xl:px-12 2xl:px-16">
402:         <section className="space-y-8">
403:           <div>
404:             <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
405:               Clients / Fiche client
406:             </p>
407: 
408:             <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 xl:text-4xl">
409:               FICHE CLIENT OPÉRATIONNELLE
410:             </h1>
411: 
```

### L395 — facturesForSelectedIntervention

```tsx
383:       return [];
384:     }
385: 
386:     const interventionId = recordId(selectedIntervention);
387: 
388:     const filtered = factures.filter((facture) => {
389:       return String(facture.interventionId ?? "") === interventionId;
390:     });
391: 
392:     return filtered.length > 0 ? filtered : factures;
393:   }, [factures, selectedIntervention]);
394: 
395:   const selectedInvoice = facturesForSelectedIntervention[0] ?? null;
396: 
397:   const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());
398: 
399:   return (
400:     <main className="min-h-screen bg-slate-100">
401:       <div className="mx-auto max-w-[2040px] px-8 py-10 xl:px-12 2xl:px-16">
402:         <section className="space-y-8">
403:           <div>
404:             <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
405:               Clients / Fiche client
406:             </p>
407: 
408:             <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 xl:text-4xl">
409:               FICHE CLIENT OPÉRATIONNELLE
410:             </h1>
411: 
412:             <p className="mt-3 max-w-5xl text-base leading-7 text-slate-600">
413:               Vue 360° du client depuis ses véhicules jusqu’aux factures et encaissements.
414:               Une interface adaptative selon le type de client (Particulier, Flotte, Entreprise).
415:             </p>
416: 
417:             <ClientOperationalSearchBox className="mt-6 max-w-5xl" />
418:           </div>
419: 
420:           <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_460px]">
421:             <div className="space-y-8">
422:               <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
423:                 <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
424:                   <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-emerald-100 text-4xl font-black text-emerald-800">
425:                     {clientName.slice(0, 2).toUpperCase()}
```

