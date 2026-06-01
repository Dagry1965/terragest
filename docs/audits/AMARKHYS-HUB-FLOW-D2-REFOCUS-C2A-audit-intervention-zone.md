# AMARKHYS-HUB-FLOW-D2-REFOCUS-C2A — Audit intervention zone

Target: `src\components\erp\hub\ERPClientOperationalSheet.tsx`

## Goal

Find the real state/variable names used by the intervention zone before applying C2B.

## Hits

### Interventions liées au rendez-vous — line 659

```tsx
 651:                         </div>
 652:                       ) : (
 653:                         <EmptyCard>Aucun rendez-vous trouvé pour ce véhicule.</EmptyCard>
 654:                       )}
 655:                     </section>
 656: 
 657:                     <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
 658:                       <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
 659:                         2. Interventions liées au rendez-vous
 660:                       </p>
 661:                       <p className="mt-1 text-xs font-medium text-slate-500">
 662:                         Les interventions ci-dessous sont filtrées par le rendez-vous sélectionné.
 663:                       </p>
 664: 
 665:                       {selectedRendezvous ? (
 666:                         <p className="mt-1 text-sm text-slate-500">
 667:                           Filtre actif : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
 668:                         </p>
 669:                       ) : null}
 670: 
 671:                       {interventionsForSelectedRendezvous.length > 0 ? (
 672:                         <div className="mt-4 grid gap-3">
 673:                           {interventionsForSelectedRendezvous.map((intervention) => {
 674:                             const isSelected =
 675:                               recordId(intervention) === recordId(selectedIntervention);
 676: 
```

### selectedRendezvous — line 229

```tsx
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
```

### selectedRendezvous — line 345

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
```

### selectedRendezvous — line 347

```tsx
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
```

### selectedRendezvous — line 351

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
```

### selectedRendezvous — line 354

```tsx
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

### selectedRendezvous — line 358

```tsx
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
 374:         (item) => recordId(item) === selectedInterventionId
 375:       ) ??
```

### selectedRendezvous — line 369

```tsx
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
```

### selectedRendezvous — line 603

```tsx
 595:                                 <th className="px-4 py-3">Service</th>
 596:                                 <th className="px-4 py-3">Statut</th>
 597:                                 <th className="px-4 py-3">Action</th>
 598:                               </tr>
 599:                             </thead>
 600:                             <tbody className="divide-y divide-slate-100 bg-white">
 601:                               {rendezvous.map((appointment) => {
 602:                                 const isSelected =
 603:                                   recordId(appointment) === recordId(selectedRendezvous);
 604: 
 605:                                 return (
 606:                                   <tr
 607:                                     key={recordId(appointment)}
 608:                                     onClick={() => {
 609:                                       setSelectedRendezvousId(recordId(appointment));
 610:                                       setSelectedInterventionId(null);
 611:                                     }}
 612:                                     className={[
 613:                                       "cursor-pointer transition",
 614:                                       isSelected ? "bg-emerald-50" : "hover:bg-slate-50",
 615:                                     ].join(" ")}
 616:                                   >
 617:                                     <td className="px-4 py-3 font-semibold text-slate-950">
 618:                                       {text(appointment, ["dateRendezVous", "date", "activityDate"])}
 619:                                     </td>
 620:                                     <td className="px-4 py-3 text-slate-600">
```

### selectedRendezvous — line 665

```tsx
 657:                     <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
 658:                       <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
 659:                         2. Interventions liées au rendez-vous
 660:                       </p>
 661:                       <p className="mt-1 text-xs font-medium text-slate-500">
 662:                         Les interventions ci-dessous sont filtrées par le rendez-vous sélectionné.
 663:                       </p>
 664: 
 665:                       {selectedRendezvous ? (
 666:                         <p className="mt-1 text-sm text-slate-500">
 667:                           Filtre actif : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
 668:                         </p>
 669:                       ) : null}
 670: 
 671:                       {interventionsForSelectedRendezvous.length > 0 ? (
 672:                         <div className="mt-4 grid gap-3">
 673:                           {interventionsForSelectedRendezvous.map((intervention) => {
 674:                             const isSelected =
 675:                               recordId(intervention) === recordId(selectedIntervention);
 676: 
 677:                             return (
 678:                               <div
 679:                                 key={recordId(intervention)}
 680:                                 data-q2-hub-client-final-c2="Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES"
 681:                                 className={[
 682:                                   "rounded-[1.5rem] border transition",
```

### selectedRendezvous — line 667

```tsx
 659:                         2. Interventions liées au rendez-vous
 660:                       </p>
 661:                       <p className="mt-1 text-xs font-medium text-slate-500">
 662:                         Les interventions ci-dessous sont filtrées par le rendez-vous sélectionné.
 663:                       </p>
 664: 
 665:                       {selectedRendezvous ? (
 666:                         <p className="mt-1 text-sm text-slate-500">
 667:                           Filtre actif : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
 668:                         </p>
 669:                       ) : null}
 670: 
 671:                       {interventionsForSelectedRendezvous.length > 0 ? (
 672:                         <div className="mt-4 grid gap-3">
 673:                           {interventionsForSelectedRendezvous.map((intervention) => {
 674:                             const isSelected =
 675:                               recordId(intervention) === recordId(selectedIntervention);
 676: 
 677:                             return (
 678:                               <div
 679:                                 key={recordId(intervention)}
 680:                                 data-q2-hub-client-final-c2="Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES"
 681:                                 className={[
 682:                                   "rounded-[1.5rem] border transition",
 683:                                   isSelected
 684:                                     ? "border-emerald-400 bg-emerald-50"
```

### selectedInterventionId — line 233

```tsx
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
```

### selectedInterventionId — line 374

```tsx
 366:     });
 367: 
 368:     return filtered.length > 0 ? filtered : interventions;
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
```

### selectedInterventionId — line 379

```tsx
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
```

### setSelectedInterventionId — line 233

```tsx
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
```

### setSelectedInterventionId — line 610

```tsx
 602:                                 const isSelected =
 603:                                   recordId(appointment) === recordId(selectedRendezvous);
 604: 
 605:                                 return (
 606:                                   <tr
 607:                                     key={recordId(appointment)}
 608:                                     onClick={() => {
 609:                                       setSelectedRendezvousId(recordId(appointment));
 610:                                       setSelectedInterventionId(null);
 611:                                     }}
 612:                                     className={[
 613:                                       "cursor-pointer transition",
 614:                                       isSelected ? "bg-emerald-50" : "hover:bg-slate-50",
 615:                                     ].join(" ")}
 616:                                   >
 617:                                     <td className="px-4 py-3 font-semibold text-slate-950">
 618:                                       {text(appointment, ["dateRendezVous", "date", "activityDate"])}
 619:                                     </td>
 620:                                     <td className="px-4 py-3 text-slate-600">
 621:                                       {text(appointment, ["heureRendezVous", "heure", "startAt"])}
 622:                                     </td>
 623:                                     <td className="px-4 py-3 text-slate-600">
 624:                                       {text(appointment, ["typeService", "service", "displayLabel"])}
 625:                                     </td>
 626:                                     <td className="px-4 py-3 text-slate-600">
 627:                                       {text(appointment, ["statut", "status"], "suivi")}
```

### setSelectedInterventionId — line 634

```tsx
 626:                                     <td className="px-4 py-3 text-slate-600">
 627:                                       {text(appointment, ["statut", "status"], "suivi")}
 628:                                     </td>
 629:                                     <td className="px-4 py-3">
 630:                                       <button
 631:                                         type="button"
 632:                                         onClick={() => {
 633:                                           setSelectedRendezvousId(recordId(appointment));
 634:                                           setSelectedInterventionId(null);
 635:                                         }}
 636:                                         className={[
 637:                                           "rounded-full px-3 py-1.5 text-xs font-bold",
 638:                                           isSelected
 639:                                             ? "bg-emerald-700 text-white"
 640:                                             : "bg-slate-100 text-slate-900",
 641:                                         ].join(" ")}
 642:                                       >
 643:                                         {isSelected ? "Sélectionné" : "Sélectionner"}
 644:                                       </button>
 645:                                     </td>
 646:                                   </tr>
 647:                                 );
 648:                               })}
 649:                             </tbody>
 650:                           </table>
 651:                         </div>
```

### setSelectedInterventionId — line 690

```tsx
 682:                                   "rounded-[1.5rem] border transition",
 683:                                   isSelected
 684:                                     ? "border-emerald-400 bg-emerald-50"
 685:                                     : "border-slate-200 bg-slate-50",
 686:                                 ].join(" ")}
 687:                               >
 688:                                 <button
 689:                                   type="button"
 690:                                   onClick={() => setSelectedInterventionId(recordId(intervention))}
 691:                                   className="w-full cursor-pointer p-4 text-left focus:outline-none focus:ring-4 focus:ring-emerald-100"
 692:                                 >
 693:                                   <div className="flex flex-wrap items-start justify-between gap-3">
 694:                                     <div>
 695:                                       <p className="font-extrabold text-slate-950">
 696:                                         {text(intervention, ["displayLabel", "dateIntervention", "titre", "numeroIntervention"])}
 697:                                       </p>
 698:                                       <p className="mt-1 text-sm text-slate-500">
 699:                                         {text(intervention, ["statut", "status"], "suivi")} · {text(intervention, ["montantTTC", "montantHT"], "0")}
 700:                                       </p>
 701:                                     </div>
 702: 
 703:                                     <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-900 ring-1 ring-slate-200">
 704:                                       {isSelected ? "Masquer les lignes" : "Voir les lignes"}
 705:                                     </span>
 706:                                   </div>
 707:                                 </button>
```

### .map((intervention — line 673

```tsx
 665:                       {selectedRendezvous ? (
 666:                         <p className="mt-1 text-sm text-slate-500">
 667:                           Filtre actif : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
 668:                         </p>
 669:                       ) : null}
 670: 
 671:                       {interventionsForSelectedRendezvous.length > 0 ? (
 672:                         <div className="mt-4 grid gap-3">
 673:                           {interventionsForSelectedRendezvous.map((intervention) => {
 674:                             const isSelected =
 675:                               recordId(intervention) === recordId(selectedIntervention);
 676: 
 677:                             return (
 678:                               <div
 679:                                 key={recordId(intervention)}
 680:                                 data-q2-hub-client-final-c2="Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES"
 681:                                 className={[
 682:                                   "rounded-[1.5rem] border transition",
 683:                                   isSelected
 684:                                     ? "border-emerald-400 bg-emerald-50"
 685:                                     : "border-slate-200 bg-slate-50",
 686:                                 ].join(" ")}
 687:                               >
 688:                                 <button
 689:                                   type="button"
 690:                                   onClick={() => setSelectedInterventionId(recordId(intervention))}
```

### interventionsFor — line 353

```tsx
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
```

### interventionsFor — line 373

```tsx
 365:       ].some((field) => String(intervention[field] ?? "") === rendezvousId);
 366:     });
 367: 
 368:     return filtered.length > 0 ? filtered : interventions;
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
```

### interventionsFor — line 376

```tsx
 368:     return filtered.length > 0 ? filtered : interventions;
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
```

### interventionsFor — line 379

```tsx
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
```

### interventionsFor — line 671

```tsx
 663:                       </p>
 664: 
 665:                       {selectedRendezvous ? (
 666:                         <p className="mt-1 text-sm text-slate-500">
 667:                           Filtre actif : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
 668:                         </p>
 669:                       ) : null}
 670: 
 671:                       {interventionsForSelectedRendezvous.length > 0 ? (
 672:                         <div className="mt-4 grid gap-3">
 673:                           {interventionsForSelectedRendezvous.map((intervention) => {
 674:                             const isSelected =
 675:                               recordId(intervention) === recordId(selectedIntervention);
 676: 
 677:                             return (
 678:                               <div
 679:                                 key={recordId(intervention)}
 680:                                 data-q2-hub-client-final-c2="Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES"
 681:                                 className={[
 682:                                   "rounded-[1.5rem] border transition",
 683:                                   isSelected
 684:                                     ? "border-emerald-400 bg-emerald-50"
 685:                                     : "border-slate-200 bg-slate-50",
 686:                                 ].join(" ")}
 687:                               >
 688:                                 <button
```

### interventionsFor — line 673

```tsx
 665:                       {selectedRendezvous ? (
 666:                         <p className="mt-1 text-sm text-slate-500">
 667:                           Filtre actif : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
 668:                         </p>
 669:                       ) : null}
 670: 
 671:                       {interventionsForSelectedRendezvous.length > 0 ? (
 672:                         <div className="mt-4 grid gap-3">
 673:                           {interventionsForSelectedRendezvous.map((intervention) => {
 674:                             const isSelected =
 675:                               recordId(intervention) === recordId(selectedIntervention);
 676: 
 677:                             return (
 678:                               <div
 679:                                 key={recordId(intervention)}
 680:                                 data-q2-hub-client-final-c2="Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES"
 681:                                 className={[
 682:                                   "rounded-[1.5rem] border transition",
 683:                                   isSelected
 684:                                     ? "border-emerald-400 bg-emerald-50"
 685:                                     : "border-slate-200 bg-slate-50",
 686:                                 ].join(" ")}
 687:                               >
 688:                                 <button
 689:                                   type="button"
 690:                                   onClick={() => setSelectedInterventionId(recordId(intervention))}
```

### rendezvous — line 12

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
```

### rendezvous — line 160

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
```

### rendezvous — line 161

```tsx
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
```

### rendezvous — line 164

```tsx
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
 181:   mode: "readonly",
```

### rendezvous — line 274

```tsx
 266:   });
 267: 
 268:   const fullActivityHref = queryHref("/clientsauto/hub", {
 269:     clientId,
 270:     selectedVehicleId: selectedVehicleRecordId,
 271:     view: "activity",
 272:   }) + "#activite-recente";
 273: 
 274:   const allAppointmentsHref = queryHref("/rendezvous", {
 275:     clientId,
 276:     vehiculeId: selectedVehicleRecordId,
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
```

### rendezvous — line 326

```tsx
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
```

### rendezvous — line 347

```tsx
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
```

### rendezvous — line 348

```tsx
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

### rendezvous — line 351

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
```

### rendezvous — line 358

```tsx
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
 374:         (item) => recordId(item) === selectedInterventionId
 375:       ) ??
```

### rendezvous — line 363

```tsx
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
 374:         (item) => recordId(item) === selectedInterventionId
 375:       ) ??
 376:       interventionsForSelectedRendezvous[0] ??
 377:       null
 378:     );
 379:   }, [interventionsForSelectedRendezvous, selectedInterventionId]);
 380: 
```

### rendezvous — line 365

```tsx
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
 374:         (item) => recordId(item) === selectedInterventionId
 375:       ) ??
 376:       interventionsForSelectedRendezvous[0] ??
 377:       null
 378:     );
 379:   }, [interventionsForSelectedRendezvous, selectedInterventionId]);
 380: 
 381:   const facturesForSelectedIntervention = useMemo(() => {
 382:     if (!selectedIntervention) {
```

### rendezvous — line 588

```tsx
 580:                         <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
 581:                           1. Choisir un rendez-vous
 582:                         </p>
 583:                         <h3 className="mt-1 text-lg font-extrabold text-slate-950">
 584:                           Rendez-vous du véhicule
 585:                         </h3>
 586:                       </div>
 587: 
 588:                       {rendezvous.length > 0 ? (
 589:                         <div className="overflow-x-auto">
 590:                           <table className="min-w-full text-left text-sm">
 591:                             <thead className="bg-slate-950 text-xs uppercase tracking-wide text-white">
 592:                               <tr>
 593:                                 <th className="px-4 py-3">Date</th>
 594:                                 <th className="px-4 py-3">Heure</th>
 595:                                 <th className="px-4 py-3">Service</th>
 596:                                 <th className="px-4 py-3">Statut</th>
 597:                                 <th className="px-4 py-3">Action</th>
 598:                               </tr>
 599:                             </thead>
 600:                             <tbody className="divide-y divide-slate-100 bg-white">
 601:                               {rendezvous.map((appointment) => {
 602:                                 const isSelected =
 603:                                   recordId(appointment) === recordId(selectedRendezvous);
 604: 
 605:                                 return (
```

### rendezvous — line 601

```tsx
 593:                                 <th className="px-4 py-3">Date</th>
 594:                                 <th className="px-4 py-3">Heure</th>
 595:                                 <th className="px-4 py-3">Service</th>
 596:                                 <th className="px-4 py-3">Statut</th>
 597:                                 <th className="px-4 py-3">Action</th>
 598:                               </tr>
 599:                             </thead>
 600:                             <tbody className="divide-y divide-slate-100 bg-white">
 601:                               {rendezvous.map((appointment) => {
 602:                                 const isSelected =
 603:                                   recordId(appointment) === recordId(selectedRendezvous);
 604: 
 605:                                 return (
 606:                                   <tr
 607:                                     key={recordId(appointment)}
 608:                                     onClick={() => {
 609:                                       setSelectedRendezvousId(recordId(appointment));
 610:                                       setSelectedInterventionId(null);
 611:                                     }}
 612:                                     className={[
 613:                                       "cursor-pointer transition",
 614:                                       isSelected ? "bg-emerald-50" : "hover:bg-slate-50",
 615:                                     ].join(" ")}
 616:                                   >
 617:                                     <td className="px-4 py-3 font-semibold text-slate-950">
 618:                                       {text(appointment, ["dateRendezVous", "date", "activityDate"])}
```

### rendezvous — line 874

```tsx
 866:                         {text(selectedVehicle, ["displayLabel", "immatriculation", "marque"])}
 867:                       </p>
 868:                       <p className="mt-1 text-sm text-slate-600">
 869:                         {text(selectedVehicle, ["marque"])} · {text(selectedVehicle, ["modele", "modèle"])}
 870:                       </p>
 871:                     </div>
 872: 
 873:                     <div className="grid gap-3">
 874:                       <EmptyCard>Rendez-vous liés : {rendezvous.length}</EmptyCard>
 875:                       <EmptyCard>Interventions liées : {interventions.length}</EmptyCard>
 876:                       <EmptyCard>Factures liées : {factures.length}</EmptyCard>
 877:                       <EmptyCard>Encaissements liés : {encaissements.length}</EmptyCard>
 878:                     </div>
 879:                   </div>
 880:                 ) : (
 881:                   <EmptyCard>Aucun véhicule sélectionné.</EmptyCard>
 882:                 )}
 883:               </section>
 884:             </aside>
 885:           </div>
 886:         </section>
 887:       </div>
 888:     </main>
 889:   );
 890: }
 891: 
```

### rdv — line 364

```tsx
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
 374:         (item) => recordId(item) === selectedInterventionId
 375:       ) ??
 376:       interventionsForSelectedRendezvous[0] ??
 377:       null
 378:     );
 379:   }, [interventionsForSelectedRendezvous, selectedInterventionId]);
 380: 
 381:   const facturesForSelectedIntervention = useMemo(() => {
```

