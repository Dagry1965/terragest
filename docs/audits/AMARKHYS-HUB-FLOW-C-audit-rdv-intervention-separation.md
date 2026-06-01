# AMARKHYS-HUB-FLOW-C — Audit RDV / interventions separation

Date: 2026-06-01T02:38:40.177Z

## Objectif

- Vérifier la séparation existante entre rendez-vous sélectionnable et interventions filtrées.
- Préparer une correction visuelle sans refonte complète.

## Checks

- OK — section rendez-vous existante
- OK — section interventions existante
- OK — selectedRendezvousId existe
- OK — selectedRendezvous existe
- OK — interventions filtrées par rendez-vous existent
- OK — sélection RDV reset intervention
- OK — rendu intervention actuel localisé

## Synthèse

- OK: 7
- FAIL: 0

## Hits

- L14 — interventionsautoModule — import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
- L192 — lignesinterventionauto — moduleKey: "lignesinterventionauto",
- L229 — selectedRendezvous — const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
- L229 — selectedRendezvousId — const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
- L229 — setSelectedRendezvousId — const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
- L233 — setSelectedInterventionId — const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
- L345 — selectedRendezvous — const selectedRendezvous = useMemo(() => {
- L347 — selectedRendezvous — rendezvous.find((item) => recordId(item) === selectedRendezvousId) ??
- L347 — selectedRendezvousId — rendezvous.find((item) => recordId(item) === selectedRendezvousId) ??
- L351 — selectedRendezvous — }, [rendezvous, selectedRendezvousId]);
- L351 — selectedRendezvousId — }, [rendezvous, selectedRendezvousId]);
- L353 — interventionsForSelectedRendezvous — const interventionsForSelectedRendezvous = useMemo(() => {
- L354 — selectedRendezvous — if (!selectedRendezvous) {
- L358 — selectedRendezvous — const rendezvousId = recordId(selectedRendezvous);
- L369 — selectedRendezvous — }, [interventions, selectedRendezvous]);
- L373 — interventionsForSelectedRendezvous — interventionsForSelectedRendezvous.find(
- L376 — interventionsForSelectedRendezvous — interventionsForSelectedRendezvous[0] ??
- L379 — interventionsForSelectedRendezvous — }, [interventionsForSelectedRendezvous, selectedInterventionId]);
- L595 — 1. Rendez-vous du véhicule — 1. Rendez-vous du véhicule
- L598 — Sélectionnez un rendez-vous — Sélectionnez un rendez-vous
- L617 — selectedRendezvous — recordId(appointment) === recordId(selectedRendezvous);
- L623 — setSelectedRendezvousId — setSelectedRendezvousId(recordId(appointment));
- L624 — setSelectedInterventionId — setSelectedInterventionId(null);
- L647 — setSelectedRendezvousId — setSelectedRendezvousId(recordId(appointment));
- L648 — setSelectedInterventionId — setSelectedInterventionId(null);
- L673 — 2. Interventions du rendez-vous sélectionné — 2. Interventions du rendez-vous sélectionné
- L676 — selectedRendezvous — {selectedRendezvous ? (
- L678 — Rendez-vous sélectionné — Rendez-vous sélectionné : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
- L678 — selectedRendezvous — Rendez-vous sélectionné : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
- L682 — interventionsForSelectedRendezvous — {interventionsForSelectedRendezvous.length > 0 ? (
- L684 — interventionsForSelectedRendezvous — {interventionsForSelectedRendezvous.map((intervention) => {
- L701 — setSelectedInterventionId — onClick={() => setSelectedInterventionId(recordId(intervention))}
- L723 — interventionsautoModule — parentModule={interventionsautoModule}
- L723 — parentModule={interventionsautoModule} — parentModule={interventionsautoModule}
- L741 — interventionsautoModule — parentModule={interventionsautoModule}
- L741 — parentModule={interventionsautoModule} — parentModule={interventionsautoModule}

## Contextes clés

### L14 — interventionsautoModule

```tsx
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
31: 
32:   for (const field of fields) {
33:     const value = record[field];
34: 
```

### L192 — lignesinterventionauto

```tsx
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
```

### L229 — selectedRendezvous

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
```

### L229 — selectedRendezvousId

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
```

### L229 — setSelectedRendezvousId

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
```

### L233 — setSelectedInterventionId

```tsx
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
```

### L345 — selectedRendezvous

```tsx
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
364:         "rdvId",
365:       ].some((field) => String(intervention[field] ?? "") === rendezvousId);
```

### L347 — selectedRendezvous

```tsx
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
364:         "rdvId",
365:       ].some((field) => String(intervention[field] ?? "") === rendezvousId);
366:     });
367: 
```

### L347 — selectedRendezvousId

```tsx
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
364:         "rdvId",
365:       ].some((field) => String(intervention[field] ?? "") === rendezvousId);
366:     });
367: 
```

### L351 — selectedRendezvous

```tsx
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
364:         "rdvId",
365:       ].some((field) => String(intervention[field] ?? "") === rendezvousId);
366:     });
367: 
368:     return filtered.length > 0 ? filtered : interventions;
369:   }, [interventions, selectedRendezvous]);
370: 
371:   const selectedIntervention = useMemo(() => {
```

### L351 — selectedRendezvousId

```tsx
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
364:         "rdvId",
365:       ].some((field) => String(intervention[field] ?? "") === rendezvousId);
366:     });
367: 
368:     return filtered.length > 0 ? filtered : interventions;
369:   }, [interventions, selectedRendezvous]);
370: 
371:   const selectedIntervention = useMemo(() => {
```

### L353 — interventionsForSelectedRendezvous

```tsx
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
364:         "rdvId",
365:       ].some((field) => String(intervention[field] ?? "") === rendezvousId);
366:     });
367: 
368:     return filtered.length > 0 ? filtered : interventions;
369:   }, [interventions, selectedRendezvous]);
370: 
371:   const selectedIntervention = useMemo(() => {
372:     return (
373:       interventionsForSelectedRendezvous.find(
```

