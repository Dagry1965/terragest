# AMARKHYS-HUB-FLOW-B2 — Audit empty vehicle gray box

Date: 2026-06-01T02:28:53.214Z

## Objectif

Localiser le cadre gris vide restant dans la carte véhicule.

## Gray hits

- L122 — bg-slate-100 — return "bg-slate-100 text-slate-700 ring-slate-200";
- L144 — bg-slate-50 — <div className="rounded-[1.5rem] bg-slate-50 px-5 py-4 text-sm text-slate-500 ring-1 ring-slate-100">
- L400 — bg-slate-100 — <main className="min-h-screen bg-slate-100">
- L497 — border-slate-200 — : "border-slate-200 bg-white hover:border-emerald-200",
- L534 — border-slate-200 — <div className="overflow-hidden rounded-[1.75rem] border border-slate-200">
- L536 — bg-slate-50 — <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
- L593 — border-slate-200 — <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
- L594 — bg-slate-50 — <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
- L629 — bg-slate-50 — isSelected ? "bg-emerald-50" : "hover:bg-slate-50",
- L655 — bg-slate-100 — : "bg-slate-100 text-slate-900",
- L672 — border-slate-200 — <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
- L697 — bg-slate-50 — : "border-slate-200 bg-slate-50",
- L697 — border-slate-200 — : "border-slate-200 bg-slate-50",
- L750 — border-slate-200 — <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
- L789 — bg-slate-50 — <article key={title} className="rounded-[1.5rem] bg-slate-50 p-5">
- L811 — bg-slate-50 — <div className="rounded-[1.5rem] bg-slate-50 p-4">
- L818 — bg-slate-50 — <div className="rounded-[1.5rem] bg-slate-50 p-4">
- L839 — bg-slate-100 — className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
- L846 — bg-slate-100 — className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
- L853 — bg-slate-100 — className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
- L870 — bg-slate-50 — <li key={benefit} className="rounded-[1.25rem] bg-slate-50 p-4 font-medium">

## Contextes

### L122 — bg-slate-100

```tsx
114:   ) {
115:     return "bg-rose-100 text-rose-800 ring-rose-200";
116:   }
117: 
118:   if (normalized.includes("cours") || normalized.includes("brouillon")) {
119:     return "bg-amber-100 text-amber-800 ring-amber-200";
120:   }
121: 
122:   return "bg-slate-100 text-slate-700 ring-slate-200";
123: }
124: 
125: function SectionTitle({
126:   title,
127:   action,
128: }: {
129:   title: string;
130:   action?: React.ReactNode;
131: }) {
132:   return (
133:     <div className="mb-5 flex items-center justify-between gap-3">
134:       <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-900">
```

### L144 — bg-slate-50

```tsx
136:       </h2>
137:       {action}
138:     </div>
139:   );
140: }
141: 
142: function EmptyCard({ children }: { children: React.ReactNode }) {
143:   return (
144:     <div className="rounded-[1.5rem] bg-slate-50 px-5 py-4 text-sm text-slate-500 ring-1 ring-slate-100">
145:       {children}
146:     </div>
147:   );
148: }
149: 
150: function buildOperationalChild(
151:   child: ERPCompositionChild
152: ): ERPCompositionChild {
153:   return {
154:     ...child,
155:     mode: child.mode ?? "readonly",
156:     allowCreate: child.allowCreate ?? false,
```

### L400 — bg-slate-100

```tsx
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
```

### L497 — border-slate-200

```tsx
489:                       <button
490:                         key={recordId(vehicle)}
491:                         type="button"
492:                         onClick={() => setLocalSelectedVehicleId(recordId(vehicle))}
493:                         className={[
494:                           "cursor-pointer rounded-[1.75rem] border p-5 text-left shadow-sm transition focus:outline-none focus:ring-4 focus:ring-emerald-100",
495:                           recordId(vehicle) === recordId(selectedVehicle)
496:                             ? "border-emerald-400 bg-emerald-50"
497:                             : "border-slate-200 bg-white hover:border-emerald-200",
498:                         ].join(" ")}
499:                       >
500:                         <div className="mb-4 flex h-28 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-slate-200 to-slate-100 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Vehicule</div>
501: 
502:                         <div className="flex items-start justify-between gap-3">
503:                           <div>
504:                             <p className="text-lg font-extrabold text-slate-950">
505:                               {text(vehicle, ["displayLabel", "immatriculation", "marque"])}
506:                             </p>
507:                             <p className="mt-1 text-sm text-slate-500">
508:                               {text(vehicle, ["marque"])} · {text(vehicle, ["modele", "modèle"])}
509:                             </p>
```

### L534 — border-slate-200

```tsx
526: 
527:                         <span className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 ring-1 ring-slate-200">
528:                           Voir la fiche véhicule
529:                         </span>
530:                       </button>
531:                     ))}
532:                   </div>
533:                 ) : (
534:                   <div className="overflow-hidden rounded-[1.75rem] border border-slate-200">
535:                     <table className="min-w-full text-left text-sm">
536:                       <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
537:                         <tr>
538:                           <th className="px-5 py-4">Véhicule</th>
539:                           <th className="px-5 py-4">Immatriculation</th>
540:                           <th className="px-5 py-4">Statut</th>
541:                           <th className="px-5 py-4">Action</th>
542:                         </tr>
543:                       </thead>
544:                       <tbody className="divide-y divide-slate-100 bg-white">
545:                         {vehicles.map((vehicle) => (
546:                           <tr key={recordId(vehicle)}>
```

### L536 — bg-slate-50

```tsx
528:                           Voir la fiche véhicule
529:                         </span>
530:                       </button>
531:                     ))}
532:                   </div>
533:                 ) : (
534:                   <div className="overflow-hidden rounded-[1.75rem] border border-slate-200">
535:                     <table className="min-w-full text-left text-sm">
536:                       <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
537:                         <tr>
538:                           <th className="px-5 py-4">Véhicule</th>
539:                           <th className="px-5 py-4">Immatriculation</th>
540:                           <th className="px-5 py-4">Statut</th>
541:                           <th className="px-5 py-4">Action</th>
542:                         </tr>
543:                       </thead>
544:                       <tbody className="divide-y divide-slate-100 bg-white">
545:                         {vehicles.map((vehicle) => (
546:                           <tr key={recordId(vehicle)}>
547:                             <td className="px-5 py-4 font-semibold text-slate-900">
548:                               {text(vehicle, ["displayLabel", "marque"])}
```

### L593 — border-slate-200

```tsx
585:                       <p className="mt-2 text-lg font-extrabold text-slate-950">
586:                         {text(selectedVehicle, ["displayLabel", "immatriculation", "marque"])}
587:                       </p>
588:                       <p className="mt-1 text-sm text-slate-600">
589:                         {text(selectedVehicle, ["marque"])} · {text(selectedVehicle, ["modele", "modèle"])}
590:                       </p>
591:                     </div>
592: 
593:                     <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
594:                       <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
595:                         <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
596:                           1. Rendez-vous du véhicule
597:                         </p>
598:                         <h3 className="mt-1 text-lg font-extrabold text-slate-950">
599:                           Sélectionnez un rendez-vous
600:                         </h3>
601:                       </div>
602: 
603:                       {rendezvous.length > 0 ? (
604:                         <div className="overflow-x-auto">
605:                           <table className="min-w-full text-left text-sm">
```

### L594 — bg-slate-50

```tsx
586:                         {text(selectedVehicle, ["displayLabel", "immatriculation", "marque"])}
587:                       </p>
588:                       <p className="mt-1 text-sm text-slate-600">
589:                         {text(selectedVehicle, ["marque"])} · {text(selectedVehicle, ["modele", "modèle"])}
590:                       </p>
591:                     </div>
592: 
593:                     <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
594:                       <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
595:                         <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
596:                           1. Rendez-vous du véhicule
597:                         </p>
598:                         <h3 className="mt-1 text-lg font-extrabold text-slate-950">
599:                           Sélectionnez un rendez-vous
600:                         </h3>
601:                       </div>
602: 
603:                       {rendezvous.length > 0 ? (
604:                         <div className="overflow-x-auto">
605:                           <table className="min-w-full text-left text-sm">
606:                             <thead className="bg-slate-950 text-xs uppercase tracking-wide text-white">
```

### L629 — bg-slate-50

```tsx
621:                                   <tr
622:                                     key={recordId(appointment)}
623:                                     onClick={() => {
624:                                       setSelectedRendezvousId(recordId(appointment));
625:                                       setSelectedInterventionId(null);
626:                                     }}
627:                                     className={[
628:                                       "cursor-pointer transition",
629:                                       isSelected ? "bg-emerald-50" : "hover:bg-slate-50",
630:                                     ].join(" ")}
631:                                   >
632:                                     <td className="px-4 py-3 font-semibold text-slate-950">
633:                                       {text(appointment, ["dateRendezVous", "date", "activityDate"])}
634:                                     </td>
635:                                     <td className="px-4 py-3 text-slate-600">
636:                                       {text(appointment, ["heureRendezVous", "heure", "startAt"])}
637:                                     </td>
638:                                     <td className="px-4 py-3 text-slate-600">
639:                                       {text(appointment, ["typeService", "service", "displayLabel"])}
640:                                     </td>
641:                                     <td className="px-4 py-3 text-slate-600">
```

### L655 — bg-slate-100

```tsx
647:                                         onClick={() => {
648:                                           setSelectedRendezvousId(recordId(appointment));
649:                                           setSelectedInterventionId(null);
650:                                         }}
651:                                         className={[
652:                                           "rounded-full px-3 py-1.5 text-xs font-bold",
653:                                           isSelected
654:                                             ? "bg-emerald-700 text-white"
655:                                             : "bg-slate-100 text-slate-900",
656:                                         ].join(" ")}
657:                                       >
658:                                         {isSelected ? "Sélectionné" : "Sélectionner"}
659:                                       </button>
660:                                     </td>
661:                                   </tr>
662:                                 );
663:                               })}
664:                             </tbody>
665:                           </table>
666:                         </div>
667:                       ) : (
```

### L672 — border-slate-200

```tsx
664:                             </tbody>
665:                           </table>
666:                         </div>
667:                       ) : (
668:                         <EmptyCard>Aucun rendez-vous lié au véhicule sélectionné.</EmptyCard>
669:                       )}
670:                     </section>
671: 
672:                     <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
673:                       <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
674:                         2. Interventions du rendez-vous sélectionné
675:                       </p>
676: 
677:                       {selectedRendezvous ? (
678:                         <p className="mt-1 text-sm text-slate-500">
679:                           Rendez-vous sélectionné : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
680:                         </p>
681:                       ) : null}
682: 
683:                       {interventionsForSelectedRendezvous.length > 0 ? (
684:                         <div className="mt-4 grid gap-3">
```

### L697 — bg-slate-50

```tsx
689:                             return (
690:                               <div
691:                                 key={recordId(intervention)}
692:                                 data-q2-hub-client-final-c2="Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES"
693:                                 className={[
694:                                   "rounded-[1.5rem] border transition",
695:                                   isSelected
696:                                     ? "border-emerald-400 bg-emerald-50"
697:                                     : "border-slate-200 bg-slate-50",
698:                                 ].join(" ")}
699:                               >
700:                                 <button
701:                                   type="button"
702:                                   onClick={() => setSelectedInterventionId(recordId(intervention))}
703:                                   className="w-full cursor-pointer p-4 text-left focus:outline-none focus:ring-4 focus:ring-emerald-100"
704:                                 >
705:                                   <div className="flex flex-wrap items-start justify-between gap-3">
706:                                     <div>
707:                                       <p className="font-extrabold text-slate-950">
708:                                         {text(intervention, ["displayLabel", "dateIntervention", "titre", "numeroIntervention"])}
709:                                       </p>
```

