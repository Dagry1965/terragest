# BILLING-MODEL-D-A — Audit intervention vers facture

## Objectif

Identifier précisément le flux runtime actuel qui crée une facture depuis une intervention terminée, avant de le renforcer pour créer aussi des lignes de facture.

## Fichier audité

- `src/runtime/business-rules/runtimeBusinessRules.ts`

## Résumé du diagnostic

- Le flux intervention terminée → facture est dans `runtimeBusinessRules.ts`.
- La facture est créée via `RuntimeDataBinding.create(facturesModule, {...})`.
- Un contrôle anti-doublon existe déjà via `existingFactures` et `interventionId`.
- Le modèle actuel crée une facture entête avec montants globaux.
- La prochaine passe doit créer les `lignesfactureauto` depuis `lignesinterventionauto`, sans logique UI et sans fallback global.

## Points détectés

### Ligne 17

```ts
11: 
12: import {
13:   RuntimeMetrics,
14: }
15: from "@/runtime/metrics/RuntimeMetrics";
16: 
17: import { RuntimeDataBinding }
18: from "@/runtime/data-binding";
19: 
20: import {
21:   coreERPModules
22: }
23: from "@/runtime/modules/definitions/coreModules";
24: 
25: import {
26:   RuntimeSchedulingEngine,
27: }
28: from "@/runtime/scheduling/RuntimeSchedulingEngine";
29: 
30: 
```

### Ligne 156

```ts
150: 
151:       const rappelsModule =
152:         coreERPModules.find(
153: 
154:           module =>
155: 
156:             module.metadata.key ===
157:               "rappelsauto"
158: 
159:         );
160: 
161:       if (
162:         !rappelsModule
163:       ) {
164: 
165:         return;
166:       }
167: 
168:       const prochainKm =
169: 
```

### Ligne 178

```ts
172:         )
173: 
174:         +
175: 
176:         5000;
177: 
178:       await RuntimeDataBinding
179:         .create(
180: 
181:           rappelsModule,
182: 
183:           {
184: 
185:             clientId:
186:               payload.clientId,
187: 
188:             vehiculeId:
189:               payload.vehiculeId,
190: 
191:             typeRappel:
```

### Ligne 179

```ts
173: 
174:         +
175: 
176:         5000;
177: 
178:       await RuntimeDataBinding
179:         .create(
180: 
181:           rappelsModule,
182: 
183:           {
184: 
185:             clientId:
186:               payload.clientId,
187: 
188:             vehiculeId:
189:               payload.vehiculeId,
190: 
191:             typeRappel:
192:               "vidange",
```

### Ligne 238

```ts
232: 
233:   {
234:     workspace:
235:       "amarkhys",
236: 
237:     moduleKey:
238:       "facturesauto",
239: 
240:     tenantId:
241:       payload.tenantId,
242:   }
243: );
244:       await RuntimeNotificationEngine
245:         .notify({
246: 
247:           type:
248:             "amarkhys.vidange",
249: 
250:           module:
251:             "interventionsauto",
```

### Ligne 302

```ts
296: 
297:   action:
298:     async (payload) => {
299:       const interventionsModule =
300:         coreERPModules.find(
301:           module =>
302:             module.metadata.key ===
303:               "interventionsauto"
304:         );
305: 
306:       const rendezvousModule =
307:         coreERPModules.find(
308:           module =>
309:             module.metadata.key ===
310:               "rendezvous"
311:         );
312: 
313:       if (
314:         !interventionsModule ||
315:         !rendezvousModule
```

### Ligne 309

```ts
303:               "interventionsauto"
304:         );
305: 
306:       const rendezvousModule =
307:         coreERPModules.find(
308:           module =>
309:             module.metadata.key ===
310:               "rendezvous"
311:         );
312: 
313:       if (
314:         !interventionsModule ||
315:         !rendezvousModule
316:       ) {
317:         return;
318:       }
319: 
320:       const rendezvousRecord =
321:         payload.id
322:           ? await RuntimeDataBinding.detail(
```

### Ligne 322

```ts
316:       ) {
317:         return;
318:       }
319: 
320:       const rendezvousRecord =
321:         payload.id
322:           ? await RuntimeDataBinding.detail(
323:               rendezvousModule,
324:               String(payload.id)
325:             )
326:           : payload;
327: 
328:       const effectiveRendezvous = {
329:         ...payload,
330:         ...(rendezvousRecord ?? {}),
331:         id:
332:           rendezvousRecord?.id ??
333:           payload.id,
334:       };
335: 
```

### Ligne 374

```ts
368:       const interventionPayload =
369:         buildInterventionFromRendezvousRecord(
370:             effectiveRendezvous
371:           );
372: 
373:       const createdIntervention =
374:         await RuntimeDataBinding
375:           .create(
376:             interventionsModule,
377:             {
378:               ...interventionPayload,
379: 
380:               tenantId:
381:                 effectiveRendezvous.tenantId ??
382:                 payload.tenantId,
383: 
384:               workspace:
385:                 effectiveRendezvous.workspace ??
386:                 payload.workspace ??
387:                 "amarkhys",
```

### Ligne 375

```ts
369:         buildInterventionFromRendezvousRecord(
370:             effectiveRendezvous
371:           );
372: 
373:       const createdIntervention =
374:         await RuntimeDataBinding
375:           .create(
376:             interventionsModule,
377:             {
378:               ...interventionPayload,
379: 
380:               tenantId:
381:                 effectiveRendezvous.tenantId ??
382:                 payload.tenantId,
383: 
384:               workspace:
385:                 effectiveRendezvous.workspace ??
386:                 payload.workspace ??
387:                 "amarkhys",
388: 
```

### Ligne 407

```ts
401:           : "";
402: 
403:       if (
404:         createdInterventionId &&
405:         effectiveRendezvous.id
406:       ) {
407:         await RuntimeDataBinding
408:           .update(
409:             rendezvousModule,
410:             String(effectiveRendezvous.id),
411:             {
412:               consumedByInterventionId:
413:                 createdInterventionId,
414: 
415:               consumedAt:
416:                 new Date().toISOString(),
417:             }
418:           );
419:       }
420: 
```

### Ligne 463

```ts
457: 
458:   action:
459:     async (payload) => {
460:       const interventionsModule =
461:         coreERPModules.find(
462:           module =>
463:             module.metadata.key ===
464:               "interventionsauto"
465:         );
466: 
467:       const rendezvousModule =
468:         coreERPModules.find(
469:           module =>
470:             module.metadata.key ===
471:               "rendezvous"
472:         );
473: 
474:       if (
475:         !interventionsModule ||
476:         !rendezvousModule
```

### Ligne 470

```ts
464:               "interventionsauto"
465:         );
466: 
467:       const rendezvousModule =
468:         coreERPModules.find(
469:           module =>
470:             module.metadata.key ===
471:               "rendezvous"
472:         );
473: 
474:       if (
475:         !interventionsModule ||
476:         !rendezvousModule
477:       ) {
478:         return;
479:       }
480: 
481:       const rendezvousRecord =
482:         payload.id
483:           ? await RuntimeDataBinding.detail(
```

### Ligne 483

```ts
477:       ) {
478:         return;
479:       }
480: 
481:       const rendezvousRecord =
482:         payload.id
483:           ? await RuntimeDataBinding.detail(
484:               rendezvousModule,
485:               String(payload.id)
486:             )
487:           : payload;
488: 
489:       const effectiveRendezvous = {
490:         ...payload,
491:         ...(rendezvousRecord ?? {}),
492:         id:
493:           rendezvousRecord?.id ??
494:           payload.id,
495:       };
496: 
```

### Ligne 535

```ts
529:       const interventionPayload =
530:         buildInterventionFromRendezvousRecord(
531:             effectiveRendezvous
532:           );
533: 
534:       const createdIntervention =
535:         await RuntimeDataBinding
536:           .create(
537:             interventionsModule,
538:             {
539:               ...interventionPayload,
540: 
541:               tenantId:
542:                 effectiveRendezvous.tenantId ??
543:                 payload.tenantId,
544: 
545:               workspace:
546:                 effectiveRendezvous.workspace ??
547:                 payload.workspace ??
548:                 "amarkhys",
```

### Ligne 536

```ts
530:         buildInterventionFromRendezvousRecord(
531:             effectiveRendezvous
532:           );
533: 
534:       const createdIntervention =
535:         await RuntimeDataBinding
536:           .create(
537:             interventionsModule,
538:             {
539:               ...interventionPayload,
540: 
541:               tenantId:
542:                 effectiveRendezvous.tenantId ??
543:                 payload.tenantId,
544: 
545:               workspace:
546:                 effectiveRendezvous.workspace ??
547:                 payload.workspace ??
548:                 "amarkhys",
549: 
```

### Ligne 568

```ts
562:           : "";
563: 
564:       if (
565:         createdInterventionId &&
566:         effectiveRendezvous.id
567:       ) {
568:         await RuntimeDataBinding
569:           .update(
570:             rendezvousModule,
571:             String(effectiveRendezvous.id),
572:             {
573:               consumedByInterventionId:
574:                 createdInterventionId,
575: 
576:               consumedAt:
577:                 new Date().toISOString(),
578:             }
579:           );
580:       }
581: 
```

### Ligne 633

```ts
627:       const facturesModule =
628: 
629:         coreERPModules.find(
630: 
631:           module =>
632: 
633:             module.metadata.key ===
634:               "facturesauto"
635: 
636:         );
637: 
638:       if (
639:         !facturesModule
640:       ) {
641: 
642:         return;
643:       }
644: 
645:       const interventionsModule =
646:         coreERPModules.find(
```

### Ligne 634

```ts
628: 
629:         coreERPModules.find(
630: 
631:           module =>
632: 
633:             module.metadata.key ===
634:               "facturesauto"
635: 
636:         );
637: 
638:       if (
639:         !facturesModule
640:       ) {
641: 
642:         return;
643:       }
644: 
645:       const interventionsModule =
646:         coreERPModules.find(
647:           module =>
```

### Ligne 648

```ts
642:         return;
643:       }
644: 
645:       const interventionsModule =
646:         coreERPModules.find(
647:           module =>
648:             module.metadata.key ===
649:               "interventionsauto"
650:         );
651: 
652:       const interventionId =
653:         String(
654:           payload.id ??
655:           payload._id ??
656:           ""
657:         );
658: 
659:       const persistedIntervention =
660:         interventionsModule && interventionId
661:           ? await RuntimeDataBinding.detail(
```

### Ligne 652

```ts
646:         coreERPModules.find(
647:           module =>
648:             module.metadata.key ===
649:               "interventionsauto"
650:         );
651: 
652:       const interventionId =
653:         String(
654:           payload.id ??
655:           payload._id ??
656:           ""
657:         );
658: 
659:       const persistedIntervention =
660:         interventionsModule && interventionId
661:           ? await RuntimeDataBinding.detail(
662:               interventionsModule,
663:               interventionId
664:             )
665:           : null;
```

### Ligne 660

```ts
654:           payload.id ??
655:           payload._id ??
656:           ""
657:         );
658: 
659:       const persistedIntervention =
660:         interventionsModule && interventionId
661:           ? await RuntimeDataBinding.detail(
662:               interventionsModule,
663:               interventionId
664:             )
665:           : null;
666: 
667:       const intervention = {
668:         ...(persistedIntervention ?? {}),
669:         ...payload,
670:       };
671: 
672:       const existingFactures =
673:         await RuntimeDataBinding.list(
```

### Ligne 661

```ts
655:           payload._id ??
656:           ""
657:         );
658: 
659:       const persistedIntervention =
660:         interventionsModule && interventionId
661:           ? await RuntimeDataBinding.detail(
662:               interventionsModule,
663:               interventionId
664:             )
665:           : null;
666: 
667:       const intervention = {
668:         ...(persistedIntervention ?? {}),
669:         ...payload,
670:       };
671: 
672:       const existingFactures =
673:         await RuntimeDataBinding.list(
674:           facturesModule
```

### Ligne 663

```ts
657:         );
658: 
659:       const persistedIntervention =
660:         interventionsModule && interventionId
661:           ? await RuntimeDataBinding.detail(
662:               interventionsModule,
663:               interventionId
664:             )
665:           : null;
666: 
667:       const intervention = {
668:         ...(persistedIntervention ?? {}),
669:         ...payload,
670:       };
671: 
672:       const existingFactures =
673:         await RuntimeDataBinding.list(
674:           facturesModule
675:         );
676: 
```

### Ligne 672

```ts
666: 
667:       const intervention = {
668:         ...(persistedIntervention ?? {}),
669:         ...payload,
670:       };
671: 
672:       const existingFactures =
673:         await RuntimeDataBinding.list(
674:           facturesModule
675:         );
676: 
677:       const alreadyCreated =
678:         existingFactures.some(
679:           facture =>
680:             String(facture.interventionId ?? "") ===
681:               interventionId &&
682:             String(facture.statutFacture ?? "") !==
683:               "annulee"
684:         );
685: 
```

### Ligne 673

```ts
667:       const intervention = {
668:         ...(persistedIntervention ?? {}),
669:         ...payload,
670:       };
671: 
672:       const existingFactures =
673:         await RuntimeDataBinding.list(
674:           facturesModule
675:         );
676: 
677:       const alreadyCreated =
678:         existingFactures.some(
679:           facture =>
680:             String(facture.interventionId ?? "") ===
681:               interventionId &&
682:             String(facture.statutFacture ?? "") !==
683:               "annulee"
684:         );
685: 
686:       if (alreadyCreated) {
```

### Ligne 677

```ts
671: 
672:       const existingFactures =
673:         await RuntimeDataBinding.list(
674:           facturesModule
675:         );
676: 
677:       const alreadyCreated =
678:         existingFactures.some(
679:           facture =>
680:             String(facture.interventionId ?? "") ===
681:               interventionId &&
682:             String(facture.statutFacture ?? "") !==
683:               "annulee"
684:         );
685: 
686:       if (alreadyCreated) {
687:         return;
688:       }
689: 
690:       const asNumber =
```

### Ligne 678

```ts
672:       const existingFactures =
673:         await RuntimeDataBinding.list(
674:           facturesModule
675:         );
676: 
677:       const alreadyCreated =
678:         existingFactures.some(
679:           facture =>
680:             String(facture.interventionId ?? "") ===
681:               interventionId &&
682:             String(facture.statutFacture ?? "") !==
683:               "annulee"
684:         );
685: 
686:       if (alreadyCreated) {
687:         return;
688:       }
689: 
690:       const asNumber =
691:         (value: unknown): number => {
```

### Ligne 680

```ts
674:           facturesModule
675:         );
676: 
677:       const alreadyCreated =
678:         existingFactures.some(
679:           facture =>
680:             String(facture.interventionId ?? "") ===
681:               interventionId &&
682:             String(facture.statutFacture ?? "") !==
683:               "annulee"
684:         );
685: 
686:       if (alreadyCreated) {
687:         return;
688:       }
689: 
690:       const asNumber =
691:         (value: unknown): number => {
692:           if (
693:             typeof value === "number" &&
```

### Ligne 681

```ts
675:         );
676: 
677:       const alreadyCreated =
678:         existingFactures.some(
679:           facture =>
680:             String(facture.interventionId ?? "") ===
681:               interventionId &&
682:             String(facture.statutFacture ?? "") !==
683:               "annulee"
684:         );
685: 
686:       if (alreadyCreated) {
687:         return;
688:       }
689: 
690:       const asNumber =
691:         (value: unknown): number => {
692:           if (
693:             typeof value === "number" &&
694:             Number.isFinite(value)
```

### Ligne 686

```ts
680:             String(facture.interventionId ?? "") ===
681:               interventionId &&
682:             String(facture.statutFacture ?? "") !==
683:               "annulee"
684:         );
685: 
686:       if (alreadyCreated) {
687:         return;
688:       }
689: 
690:       const asNumber =
691:         (value: unknown): number => {
692:           if (
693:             typeof value === "number" &&
694:             Number.isFinite(value)
695:           ) {
696:             return value;
697:           }
698: 
699:           if (typeof value === "string") {
```

### Ligne 801

```ts
795:                 ? montantTVA
796:                 : montantHT * tauxTVA / 100
797:             )
798:           )
799:         );
800: 
801:       await RuntimeDataBinding
802:         .create(
803: 
804:           facturesModule,
805: 
806:           {
807: 
808:             numeroFacture:
809:               `FAC-${Date.now()}`,
810: 
811:             dateFacture:
812:               resolveAutoInvoiceDate(),
813: 
814:             statutFacture:
```

### Ligne 802

```ts
796:                 : montantHT * tauxTVA / 100
797:             )
798:           )
799:         );
800: 
801:       await RuntimeDataBinding
802:         .create(
803: 
804:           facturesModule,
805: 
806:           {
807: 
808:             numeroFacture:
809:               `FAC-${Date.now()}`,
810: 
811:             dateFacture:
812:               resolveAutoInvoiceDate(),
813: 
814:             statutFacture:
815:               "emise",
```

### Ligne 808

```ts
802:         .create(
803: 
804:           facturesModule,
805: 
806:           {
807: 
808:             numeroFacture:
809:               `FAC-${Date.now()}`,
810: 
811:             dateFacture:
812:               resolveAutoInvoiceDate(),
813: 
814:             statutFacture:
815:               "emise",
816: 
817:             clientId:
818:               intervention.clientId,
819: 
820:             vehiculeId:
821:               intervention.vehiculeId,
```

### Ligne 811

```ts
805: 
806:           {
807: 
808:             numeroFacture:
809:               `FAC-${Date.now()}`,
810: 
811:             dateFacture:
812:               resolveAutoInvoiceDate(),
813: 
814:             statutFacture:
815:               "emise",
816: 
817:             clientId:
818:               intervention.clientId,
819: 
820:             vehiculeId:
821:               intervention.vehiculeId,
822: 
823:             interventionId,
824: 
```

### Ligne 823

```ts
817:             clientId:
818:               intervention.clientId,
819: 
820:             vehiculeId:
821:               intervention.vehiculeId,
822: 
823:             interventionId,
824: 
825:             montantHT,
826: 
827:             tva:
828:               tauxTVA,
829: 
830:             montantTTC,
831: 
832:             montantPaye:
833:               0,
834: 
835:             resteAPayer:
836:               montantTTC,
```

### Ligne 866

```ts
860:         .notify({
861: 
862:           type:
863:             "amarkhys.facture",
864: 
865:           module:
866:             "facturesauto",
867: 
868:           title:
869:             "Facture créée",
870: 
871:           message:
872:             "Facture générée depuis intervention terminée",
873: 
874:           severity:
875:             "info"
876: 
877:         });
878: 
879:     }
```

### Ligne 869

```ts
863:             "amarkhys.facture",
864: 
865:           module:
866:             "facturesauto",
867: 
868:           title:
869:             "Facture créée",
870: 
871:           message:
872:             "Facture générée depuis intervention terminée",
873: 
874:           severity:
875:             "info"
876: 
877:         });
878: 
879:     }
880: 
881: },
882: 
```

### Ligne 872

```ts
866:             "facturesauto",
867: 
868:           title:
869:             "Facture créée",
870: 
871:           message:
872:             "Facture générée depuis intervention terminée",
873: 
874:           severity:
875:             "info"
876: 
877:         });
878: 
879:     }
880: 
881: },
882: 
883: // =====================================================
884: // FACTURE PAYEE
885: // -> KPI CA REEL
```

### Ligne 894

```ts
888: {
889: 
890:   id:
891:     "amarkhys-facture-paid-revenue",
892: 
893:   module:
894:     "facturesauto",
895: 
896:   event:
897:     "facturesauto.updated",
898: 
899:   condition:
900:     (payload) =>
901: 
902:       payload.statutPaiement ===
903:         "paye",
904: 
905:   action:
906:     async (payload) => {
907: 
```

### Ligne 922

```ts
916:         {
917: 
918:           workspace:
919:             "amarkhys",
920: 
921:           moduleKey:
922:             "facturesauto",
923: 
924:           tenantId:
925:             payload.tenantId,
926: 
927:           userId:
928:             payload.userId,
929: 
930:         }
931: 
932:       );
933: 
934: 
935:       RuntimeMetrics.increment(
```

### Ligne 945

```ts
939:         {
940: 
941:           workspace:
942:             "amarkhys",
943: 
944:           moduleKey:
945:             "facturesauto",
946: 
947:           tenantId:
948:             payload.tenantId,
949: 
950:         }
951: 
952:       );
953: 
954: 
955:       await RuntimeNotificationEngine
956:         .notify({
957: 
958:           type:
```

### Ligne 962

```ts
956:         .notify({
957: 
958:           type:
959:             "amarkhys.revenue",
960: 
961:           module:
962:             "facturesauto",
963: 
964:           title:
965:             "CA mis Ã  jour",
966: 
967:           message:
968: 
969:             `Paiement reçu : ${payload.montantTTC}`,
970: 
971:           severity:
972:             "info",
973: 
974:         });
975: 
```

### Ligne 1006

```ts
1000: 
1001:   action:
1002:     async (payload) => {
1003:       const facturesModule =
1004:         coreERPModules.find(
1005:           module =>
1006:             module.metadata.key ===
1007:               "facturesauto"
1008:         );
1009: 
1010:       const encaissementsModule =
1011:         coreERPModules.find(
1012:           module =>
1013:             module.metadata.key ===
1014:               "encaissementsauto"
1015:         );
1016: 
1017:       const interventionsModule =
1018:         coreERPModules.find(
1019:           module =>
```

### Ligne 1007

```ts
1001:   action:
1002:     async (payload) => {
1003:       const facturesModule =
1004:         coreERPModules.find(
1005:           module =>
1006:             module.metadata.key ===
1007:               "facturesauto"
1008:         );
1009: 
1010:       const encaissementsModule =
1011:         coreERPModules.find(
1012:           module =>
1013:             module.metadata.key ===
1014:               "encaissementsauto"
1015:         );
1016: 
1017:       const interventionsModule =
1018:         coreERPModules.find(
1019:           module =>
1020:             module.metadata.key ===
```

### Ligne 1013

```ts
1007:               "facturesauto"
1008:         );
1009: 
1010:       const encaissementsModule =
1011:         coreERPModules.find(
1012:           module =>
1013:             module.metadata.key ===
1014:               "encaissementsauto"
1015:         );
1016: 
1017:       const interventionsModule =
1018:         coreERPModules.find(
1019:           module =>
1020:             module.metadata.key ===
1021:               "interventionsauto"
1022:         );
1023: 
1024:       if (
1025:         !facturesModule ||
1026:         !encaissementsModule
```

### Ligne 1020

```ts
1014:               "encaissementsauto"
1015:         );
1016: 
1017:       const interventionsModule =
1018:         coreERPModules.find(
1019:           module =>
1020:             module.metadata.key ===
1021:               "interventionsauto"
1022:         );
1023: 
1024:       if (
1025:         !facturesModule ||
1026:         !encaissementsModule
1027:       ) {
1028:         return;
1029:       }
1030: 
1031:       const facture =
1032:         await RuntimeDataBinding.detail(
1033:           facturesModule,
```

### Ligne 1032

```ts
1026:         !encaissementsModule
1027:       ) {
1028:         return;
1029:       }
1030: 
1031:       const facture =
1032:         await RuntimeDataBinding.detail(
1033:           facturesModule,
1034:           String(payload.factureId)
1035:         );
1036: 
1037:       if (!facture) {
1038:         return;
1039:       }
1040: 
1041:       const asRuntimeNumber =
1042:         (value: unknown): number => {
1043:           if (
1044:             typeof value === "number" &&
1045:             Number.isFinite(value)
```

### Ligne 1072

```ts
1066:       const roundMoney =
1067:         (value: number): number =>
1068:           Math.round(value * 100) / 100;
1069: 
1070:       const linkedIntervention =
1071:         interventionsModule &&
1072:         facture.interventionId
1073:           ? await RuntimeDataBinding.detail(
1074:               interventionsModule,
1075:               String(facture.interventionId)
1076:             )
1077:           : null;
1078: 
1079:       const invoiceMontantHT =
1080:         asRuntimeNumber(facture.montantHT);
1081: 
1082:       const invoiceMontantTVA =
1083:         asRuntimeNumber(facture.montantTVA);
1084: 
1085:       const invoiceMontantTTC =
```

### Ligne 1073

```ts
1067:         (value: number): number =>
1068:           Math.round(value * 100) / 100;
1069: 
1070:       const linkedIntervention =
1071:         interventionsModule &&
1072:         facture.interventionId
1073:           ? await RuntimeDataBinding.detail(
1074:               interventionsModule,
1075:               String(facture.interventionId)
1076:             )
1077:           : null;
1078: 
1079:       const invoiceMontantHT =
1080:         asRuntimeNumber(facture.montantHT);
1081: 
1082:       const invoiceMontantTVA =
1083:         asRuntimeNumber(facture.montantTVA);
1084: 
1085:       const invoiceMontantTTC =
1086:         asRuntimeNumber(
```

### Ligne 1075

```ts
1069: 
1070:       const linkedIntervention =
1071:         interventionsModule &&
1072:         facture.interventionId
1073:           ? await RuntimeDataBinding.detail(
1074:               interventionsModule,
1075:               String(facture.interventionId)
1076:             )
1077:           : null;
1078: 
1079:       const invoiceMontantHT =
1080:         asRuntimeNumber(facture.montantHT);
1081: 
1082:       const invoiceMontantTVA =
1083:         asRuntimeNumber(facture.montantTVA);
1084: 
1085:       const invoiceMontantTTC =
1086:         asRuntimeNumber(
1087:           facture.montantTTC ??
1088:           facture.totalTTC ??
```

### Ligne 1142

```ts
1136:               repairedMontantHT *
1137:               100
1138:             )
1139:           : asRuntimeNumber(facture.tva) || 18;
1140: 
1141:       const encaissements =
1142:         await RuntimeDataBinding.list(
1143:           encaissementsModule
1144:         );
1145: 
1146:       const encaissementsValides =
1147:         encaissements.filter(
1148:           (encaissement: any) =>
1149:             String(encaissement.factureId) ===
1150:               String(payload.factureId) &&
1151:             encaissement.statut ===
1152:               "valide"
1153:         );
1154: 
1155:       const montantPaye =
```

### Ligne 1181

```ts
1175:         montantPaye <= 0
1176:           ? "en_attente"
1177:           : montantPaye < montantTTC
1178:             ? "partiel"
1179:             : "paye";
1180: 
1181:       await RuntimeDataBinding.update(
1182:         facturesModule,
1183:         String(payload.factureId),
1184:         {
1185:           montantHT:
1186:             repairedMontantHT,
1187: 
1188:           montantTVA:
1189:             repairedMontantTVA,
1190: 
1191:           tva:
1192:             repairedTVARate,
1193: 
1194:           montantTTC:
```

### Ligne 1215

```ts
1209:       await RuntimeNotificationEngine
1210:         .notify({
1211:           type:
1212:             "amarkhys.facture.recomputed",
1213: 
1214:           module:
1215:             "facturesauto",
1216: 
1217:           title:
1218:             "Facture recalculée",
1219: 
1220:           message:
1221:             `Paiement reçu : ${montantPaye}. Reste à payer : ${resteAPayer}.`,
1222: 
1223:           severity:
1224:             "info",
1225:         });
1226:     }
1227: },
1228: 
```

### Ligne 1255

```ts
1249: 
1250:   action:
1251:     async (payload) => {
1252:       const facturesModule =
1253:         coreERPModules.find(
1254:           module =>
1255:             module.metadata.key ===
1256:               "facturesauto"
1257:         );
1258: 
1259:       const encaissementsModule =
1260:         coreERPModules.find(
1261:           module =>
1262:             module.metadata.key ===
1263:               "encaissementsauto"
1264:         );
1265: 
1266:       const interventionsModule =
1267:         coreERPModules.find(
1268:           module =>
```

### Ligne 1256

```ts
1250:   action:
1251:     async (payload) => {
1252:       const facturesModule =
1253:         coreERPModules.find(
1254:           module =>
1255:             module.metadata.key ===
1256:               "facturesauto"
1257:         );
1258: 
1259:       const encaissementsModule =
1260:         coreERPModules.find(
1261:           module =>
1262:             module.metadata.key ===
1263:               "encaissementsauto"
1264:         );
1265: 
1266:       const interventionsModule =
1267:         coreERPModules.find(
1268:           module =>
1269:             module.metadata.key ===
```

### Ligne 1262

```ts
1256:               "facturesauto"
1257:         );
1258: 
1259:       const encaissementsModule =
1260:         coreERPModules.find(
1261:           module =>
1262:             module.metadata.key ===
1263:               "encaissementsauto"
1264:         );
1265: 
1266:       const interventionsModule =
1267:         coreERPModules.find(
1268:           module =>
1269:             module.metadata.key ===
1270:               "interventionsauto"
1271:         );
1272: 
1273:       if (
1274:         !facturesModule ||
1275:         !encaissementsModule
```

### Ligne 1269

```ts
1263:               "encaissementsauto"
1264:         );
1265: 
1266:       const interventionsModule =
1267:         coreERPModules.find(
1268:           module =>
1269:             module.metadata.key ===
1270:               "interventionsauto"
1271:         );
1272: 
1273:       if (
1274:         !facturesModule ||
1275:         !encaissementsModule
1276:       ) {
1277:         return;
1278:       }
1279: 
1280:       const facture =
1281:         await RuntimeDataBinding.detail(
1282:           facturesModule,
```

### Ligne 1281

```ts
1275:         !encaissementsModule
1276:       ) {
1277:         return;
1278:       }
1279: 
1280:       const facture =
1281:         await RuntimeDataBinding.detail(
1282:           facturesModule,
1283:           String(payload.factureId)
1284:         );
1285: 
1286:       if (!facture) {
1287:         return;
1288:       }
1289: 
1290:       const asRuntimeNumber =
1291:         (value: unknown): number => {
1292:           if (
1293:             typeof value === "number" &&
1294:             Number.isFinite(value)
```

### Ligne 1321

```ts
1315:       const roundMoney =
1316:         (value: number): number =>
1317:           Math.round(value * 100) / 100;
1318: 
1319:       const linkedIntervention =
1320:         interventionsModule &&
1321:         facture.interventionId
1322:           ? await RuntimeDataBinding.detail(
1323:               interventionsModule,
1324:               String(facture.interventionId)
1325:             )
1326:           : null;
1327: 
1328:       const invoiceMontantHT =
1329:         asRuntimeNumber(facture.montantHT);
1330: 
1331:       const invoiceMontantTVA =
1332:         asRuntimeNumber(facture.montantTVA);
1333: 
1334:       const invoiceMontantTTC =
```

### Ligne 1322

```ts
1316:         (value: number): number =>
1317:           Math.round(value * 100) / 100;
1318: 
1319:       const linkedIntervention =
1320:         interventionsModule &&
1321:         facture.interventionId
1322:           ? await RuntimeDataBinding.detail(
1323:               interventionsModule,
1324:               String(facture.interventionId)
1325:             )
1326:           : null;
1327: 
1328:       const invoiceMontantHT =
1329:         asRuntimeNumber(facture.montantHT);
1330: 
1331:       const invoiceMontantTVA =
1332:         asRuntimeNumber(facture.montantTVA);
1333: 
1334:       const invoiceMontantTTC =
1335:         asRuntimeNumber(
```

### Ligne 1324

```ts
1318: 
1319:       const linkedIntervention =
1320:         interventionsModule &&
1321:         facture.interventionId
1322:           ? await RuntimeDataBinding.detail(
1323:               interventionsModule,
1324:               String(facture.interventionId)
1325:             )
1326:           : null;
1327: 
1328:       const invoiceMontantHT =
1329:         asRuntimeNumber(facture.montantHT);
1330: 
1331:       const invoiceMontantTVA =
1332:         asRuntimeNumber(facture.montantTVA);
1333: 
1334:       const invoiceMontantTTC =
1335:         asRuntimeNumber(
1336:           facture.montantTTC ??
1337:           facture.totalTTC ??
```

### Ligne 1391

```ts
1385:               repairedMontantHT *
1386:               100
1387:             )
1388:           : asRuntimeNumber(facture.tva) || 18;
1389: 
1390:       const encaissements =
1391:         await RuntimeDataBinding.list(
1392:           encaissementsModule
1393:         );
1394: 
1395:       const encaissementsValides =
1396:         encaissements.filter(
1397:           (encaissement: any) =>
1398:             String(encaissement.factureId) ===
1399:               String(payload.factureId) &&
1400:             encaissement.statut ===
1401:               "valide"
1402:         );
1403: 
1404:       const montantPaye =
```

### Ligne 1430

```ts
1424:         montantPaye <= 0
1425:           ? "en_attente"
1426:           : montantPaye < montantTTC
1427:             ? "partiel"
1428:             : "paye";
1429: 
1430:       await RuntimeDataBinding.update(
1431:         facturesModule,
1432:         String(payload.factureId),
1433:         {
1434:           montantHT:
1435:             repairedMontantHT,
1436: 
1437:           montantTVA:
1438:             repairedMontantTVA,
1439: 
1440:           tva:
1441:             repairedTVARate,
1442: 
1443:           montantTTC:
```

### Ligne 1464

```ts
1458:       await RuntimeNotificationEngine
1459:         .notify({
1460:           type:
1461:             "amarkhys.facture.recomputed",
1462: 
1463:           module:
1464:             "facturesauto",
1465: 
1466:           title:
1467:             "Facture recalculée",
1468: 
1469:           message:
1470:             `Encaissement mis à jour. Payé : ${montantPaye}. Reste : ${resteAPayer}.`,
1471: 
1472:           severity:
1473:             "info",
1474:         });
1475:     }
1476: },
1477: 
```

### Ligne 1540

```ts
1534: 
1535:   action:
1536:     async (payload) => {
1537:       const rappelsModule =
1538:         coreERPModules.find(
1539:           module =>
1540:             module.metadata.key ===
1541:               "rappelsauto"
1542:         );
1543: 
1544:       const echeancesModule =
1545:         coreERPModules.find(
1546:           module =>
1547:             module.metadata.key ===
1548:               "echeancespaiementauto"
1549:         );
1550: 
1551:       if (
1552:         !rappelsModule ||
1553:         !echeancesModule
```

### Ligne 1547

```ts
1541:               "rappelsauto"
1542:         );
1543: 
1544:       const echeancesModule =
1545:         coreERPModules.find(
1546:           module =>
1547:             module.metadata.key ===
1548:               "echeancespaiementauto"
1549:         );
1550: 
1551:       if (
1552:         !rappelsModule ||
1553:         !echeancesModule
1554:       ) {
1555:         return;
1556:       }
1557: 
1558:       const montantPrevu =
1559:         Number(
1560:           payload.montantPrevu ?? 0
```

### Ligne 1574

```ts
1568:       const reste =
1569:         Math.max(
1570:           montantPrevu - montantPaye,
1571:           0
1572:         );
1573: 
1574:       await RuntimeDataBinding.create(
1575:         rappelsModule,
1576:         {
1577:           clientId:
1578:             payload.clientId,
1579: 
1580:           vehiculeId:
1581:             payload.vehiculeId,
1582: 
1583:           typeRappel:
1584:             "facture_impayee",
1585: 
1586:           dateRappel:
1587:             new Date()
```

### Ligne 1604

```ts
1598:           message:
1599:             `Échéance de paiement en retard. Facture : ${payload.factureId}. Reste attendu : ${reste} FCFA.`,
1600:         }
1601:       );
1602: 
1603:       if (payload.id) {
1604:         await RuntimeDataBinding.update(
1605:           echeancesModule,
1606:           String(payload.id),
1607:           {
1608:             statut:
1609:               "en_retard",
1610: 
1611:             dernierRappelAt:
1612:               new Date()
1613:                 .toISOString()
1614:                 .split("T")[0],
1615:           }
1616:         );
1617:       }
```

### Ligne 1700

```ts
1694: 
1695:   action:
1696:     async (payload) => {
1697:       const rappelsModule =
1698:         coreERPModules.find(
1699:           module =>
1700:             module.metadata.key ===
1701:               "rappelsauto"
1702:         );
1703: 
1704:       const echeancesModule =
1705:         coreERPModules.find(
1706:           module =>
1707:             module.metadata.key ===
1708:               "echeancespaiementauto"
1709:         );
1710: 
1711:       if (
1712:         !rappelsModule ||
1713:         !echeancesModule
```

### Ligne 1707

```ts
1701:               "rappelsauto"
1702:         );
1703: 
1704:       const echeancesModule =
1705:         coreERPModules.find(
1706:           module =>
1707:             module.metadata.key ===
1708:               "echeancespaiementauto"
1709:         );
1710: 
1711:       if (
1712:         !rappelsModule ||
1713:         !echeancesModule
1714:       ) {
1715:         return;
1716:       }
1717: 
1718:       const montantPrevu =
1719:         Number(
1720:           payload.montantPrevu ?? 0
```

### Ligne 1734

```ts
1728:       const reste =
1729:         Math.max(
1730:           montantPrevu - montantPaye,
1731:           0
1732:         );
1733: 
1734:       await RuntimeDataBinding.create(
1735:         rappelsModule,
1736:         {
1737:           clientId:
1738:             payload.clientId,
1739: 
1740:           vehiculeId:
1741:             payload.vehiculeId,
1742: 
1743:           typeRappel:
1744:             "facture_impayee",
1745: 
1746:           dateRappel:
1747:             new Date()
```

### Ligne 1764

```ts
1758:           message:
1759:             `Échéance de paiement en retard. Facture : ${payload.factureId}. Reste attendu : ${reste} FCFA.`,
1760:         }
1761:       );
1762: 
1763:       if (payload.id) {
1764:         await RuntimeDataBinding.update(
1765:           echeancesModule,
1766:           String(payload.id),
1767:           {
1768:             statut:
1769:               "en_retard",
1770: 
1771:             dernierRappelAt:
1772:               new Date()
1773:                 .toISOString()
1774:                 .split("T")[0],
1775:           }
1776:         );
1777:       }
```

## Décision pour BILLING-MODEL-D-B

- Trouver `lignesfactureautoModule` dans `coreERPModules`.
- Trouver `lignesinterventionautoModule` dans `coreERPModules`.
- Après création de la facture, récupérer l'identifiant de la facture créée.
- Lister les lignes intervention strictement liées à `interventionId`.
- Créer une ligne `lignesfactureauto` par ligne intervention validée ou facturable.
- Remplir `factureId`, `designation`, `quantite`, `prixUnitaireHT`, `montantHT`, `tauxTVA`, `montantTVA`, `montantTTC`, `clientId`, `vehiculeId`, `interventionId`, `sourceType`, `sourceModule`, `sourceRecordId`, `sourceLineId`.
- Ne jamais créer de lignes depuis toute la collection si `interventionId` est absent.
- Garder l'anti-doublon facture existant.
