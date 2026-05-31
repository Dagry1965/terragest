# AMARKHYS-REBUILD-06A — Audit interventionsauto

Date: 2026-05-31T20:59:42.119Z

## Objectif

Auditer interventionsauto après clôture rendezvous : actions, statuts, relations RDV/client/véhicule, lignes d'intervention, verrouillages et calculs.

## Synthèse

- OK: 23
- FAIL: 0

## Checks

### Fichiers

- OK — interventionsauto.module.ts existe
- OK — interventionsauto.actions.ts existe

### Actions

- OK — interventionsauto.actions.ts contient des actions
- OK — actions métier intervention détectées

### Statut

- OK — champ statut présent
- OK — statut verrouillé par readonlyIf ou gouvernance

### Champs

- OK — champ attendu présent: rendezVousId
- OK — champ attendu présent: clientId
- OK — champ attendu présent: vehiculeId
- OK — champ attendu présent: mecanicienId
- OK — champ attendu présent: statut
- OK — champ attendu présent: montantHT
- OK — champ attendu présent: montantTTC

### Relations

- OK — relation/concept attendu présent: rendezvous
- OK — relation/concept attendu présent: clientsauto
- OK — relation/concept attendu présent: vehicules
- OK — relation/concept attendu présent: lignesinterventionauto
- OK — relation RDV vers intervention présente
- OK — enfants lignesinterventionauto déclarés

### Calculs

- OK — totaux intervention calculés ou référencés

### Verrouillage contexte

- OK — champs hérités RDV/client/véhicule verrouillés ou lockFields présents

### Interdits

- OK — pas de champs directs paiement/encaissement/stock dans intervention

### Runtime

- OK — ERPRelatedRecordsPanel existe et peut afficher les lignes

## Actions détectées

- Demarrer intervention — L8: label: "Demarrer intervention",
- Ouvrir facture — L664: openLabel: "Ouvrir facture",

## Interdits détectés

- Aucun interdit détecté.

## Bloc statut intervention

### key: "statut" — ligne 145

  137:         key: "montantHT",
  138:         label: "Montant HT",
  139:         type: "number",
  140:         list: { visible: true, order: 7 },
  141:         grid: { cols: 4 },
  142:         helperText: "Montant calculé depuis les lignes validées. Ancien équivalent legacy : coutTotal.",
  143:       },
  144: {
  145:         key: "statut",
  146:         label: "Statut",
  147:         readonlyIf: {
  148:           field: "statut",
  149:           operator: "in",
  150:           values: ["ouverte", "diagnostic", "en_cours", "terminee", "facturee", "annulee"],
  151:         },
  152:         helperText: "Statut piloté par les actions. Utilisez les boutons d’action pour changer l’état de l’intervention.",
  153:         type: "select",
  154:         defaultValue: "ouverte",
  155:         options: [
  156:           { label: "Ouverte", value: "ouverte" },
  157:           { label: "Diagnostic", value: "diagnostic" },
  158:           { label: "En cours", value: "en_cours" },
  159:           { label: "Terminée", value: "terminee" },
  160:           { label: "Facturée", value: "facturee" },
  161:           { label: "Annulée", value: "annulee" },
  162:         ],
  163:         list: { visible: true, order: 5 },
  164:         grid: { cols: 6 },
  165:       }
  166:     ],
  167:   },
  168: 
  169:   form: {
  170:     layout: "tabs",
  171: 
  172:     tabs: [
  173:       {
  174:         key: "contexte",
  175:         label: "Contexte",
  176: 
  177:         fields: [
  178:           "clientId",
  179:           "vehiculeId",
  180:           "rendezVousId",

### key: "statut" — ligne 304

  296:         field: "statut",
  297:         equals: "annulee",
  298:         tone: "gray",
  299:         icon: "x",
  300:       },
  301:     ],
  302:     filters: [
  303:       {
  304:         key: "statut",
  305:         label: "Statut",
  306:         field: "statut",
  307:         type: "select",
  308:         options: [
  309:           { label: "Ouverte", value: "ouverte" },
  310:           { label: "Diagnostic", value: "diagnostic" },
  311:           { label: "En cours", value: "en_cours" },
  312:           { label: "Terminée", value: "terminee" },
  313:           { label: "Facturée", value: "facturee" },
  314:           { label: "Annulée", value: "annulee" },
  315:         ],
  316:       },
  317:       {
  318:         key: "typeIntervention",
  319:         label: "Type intervention",
  320:         field: "typeIntervention",
  321:         type: "select",
  322:         options: [
  323:           { label: "Vidange", value: "vidange" },
  324:           { label: "Diagnostic", value: "diagnostic" },
  325:           { label: "Réparation", value: "reparation" },
  326:           { label: "Pneumatiques", value: "pneumatiques" },
  327:           { label: "Contrôle", value: "controle" },
  328:           { label: "Autre", value: "autre" },
  329:         ],
  330:       },
  331:       {
  332:         key: "clientId",
  333:         label: "Client",
  334:         field: "clientId",
  335:         type: "relation",
  336:       },
  337:     ],
  338:     table: {
  339:       enableSearch: true,

## Blocs relation RDV

### rendezVousId — ligne 54

   46:         type: "relation",
   47:         relation: { module: "vehicules" },
   48:         required: true,
   49:         searchable: true,
   50:         list: { visible: true, order: 2 },
   51:         grid: { cols: 6 },
   52:       },
   53: {
   54:         key: "rendezVousId",
   55:         label: "Rendez-vous",
   56:         type: "relation",
   57:         relation: { module: "rendezvous" },
   58:         searchable: true,
   59:         list: { visible: false },
   60:         grid: { cols: 6 },
   61:       },
   62:       {
   63:         key: "mecanicienId",
   64:         label: "Mécanicien responsable",
   65:         type: "relation",
   66:         relation: { module: "employes" },
   67:         searchable: true,
   68:         list: { visible: true, order: 5 },
   69:         grid: { cols: 6 },
   70:       },
   71: {
   72:         key: "dateIntervention",
   73:         label: "Date intervention",
   74:         type: "date",
   75:         required: true,
   76:         list: { visible: true, order: 3 },
   77:         grid: { cols: 6 },
   78:       },
   79: {

### rendezVousId — ligne 180

  172:     tabs: [
  173:       {
  174:         key: "contexte",
  175:         label: "Contexte",
  176: 
  177:         fields: [
  178:           "clientId",
  179:           "vehiculeId",
  180:           "rendezVousId",
  181:           "dateIntervention",
  182:           "typeIntervention",
  183:           "kilometrage",
  184:           "statut",
  185:         ],
  186: 
  187:         sections: [
  188:           {
  189:             key: "infos",
  190:             title: "Informations intervention",
  191:             fields: [
  192:               "clientId",
  193:               "vehiculeId",
  194:               "rendezVousId",
  195:               "dateIntervention",
  196:               "typeIntervention",
  197:               "kilometrage",
  198:               "statut",
  199:             ],
  200:           },
  201:         ],
  202:       },
  203: 
  204:       {
  205:         key: "atelier",

### rendezVousId — ligne 194

  186: 
  187:         sections: [
  188:           {
  189:             key: "infos",
  190:             title: "Informations intervention",
  191:             fields: [
  192:               "clientId",
  193:               "vehiculeId",
  194:               "rendezVousId",
  195:               "dateIntervention",
  196:               "typeIntervention",
  197:               "kilometrage",
  198:               "statut",
  199:             ],
  200:           },
  201:         ],
  202:       },
  203: 
  204:       {
  205:         key: "atelier",
  206:         label: "Atelier",
  207: 
  208:         fields: [
  209:           "diagnostic",
  210:           "travauxEffectues",
  211:         ],
  212: 
  213:         sections: [
  214:           {
  215:             key: "travaux",
  216:             title: "Diagnostic et travaux",
  217:             fields: [
  218:               "diagnostic",
  219:               "travauxEffectues",

### rendezVousId — ligne 362

  354:           "prenom",
  355:           "telephone",
  356:         ],
  357:         vehiculeId: [
  358:           "marque",
  359:           "modele",
  360:           "immatriculation",
  361:         ],
  362:         rendezVousId: [
  363:           "dateRendezVous",
  364:           "heureRendezVous",
  365:           "typeService",
  366:         ],
  367:       },
  368:       hiddenFields: [
  369:         "id",
  370:         "_id",
  371:         "uid",
  372:         "tenantId",
  373:         "workspaceId",
  374:         "createdAt",
  375:         "updatedAt",
  376:         "removedAt",
  377:       ],
  378:     },
  379:     rightPanel: {
  380:       enabled: true,
  381:       title: "Atelier aujourd'hui",
  382:       type: "summary",
  383:       metrics: [
  384:         {
  385:           key: "total",
  386:           label: "Interventions affichées",
  387:           type: "count",

### rendezVousId — ligne 436

  428:           labelFields: [
  429:             "marque",
  430:             "modele",
  431:             "immatriculation",
  432:           ],
  433:           tone: "vehicle",
  434:         },
  435:         {
  436:           relationField: "rendezVousId",
  437:           moduleKey: "rendezvous",
  438:           labelFields: [
  439:             "dateRendezVous",
  440:             "heureRendezVous",
  441:             "typeService",
  442:             "statut",
  443:           ],
  444:           tone: "workshop",
  445:         },
  446:       ],
  447:     },
  448: 
  449:     labelFields: [
  450:       "dateIntervention",
  451:       "typeIntervention",
  452:       "statut",
  453:     ],
  454: 
  455:     breadcrumbs: [
  456:       {
  457:         field: "clientId",
  458:         moduleKey: "clientsauto",
  459:         labelFields: [
  460:           "nom",
  461:           "prenoms",

### rendezVousId — ligne 475

  467:         moduleKey: "vehicules",
  468:         labelFields: [
  469:           "marque",
  470:           "modele",
  471:           "immatriculation",
  472:         ],
  473:       },
  474:       {
  475:         field: "rendezVousId",
  476:         moduleKey: "rendezvous",
  477:         labelFields: [
  478:           "dateRendezVous",
  479:           "heureRendezVous",
  480:           "motif",
  481:         ],
  482:       },
  483:     ],
  484: 
  485:     relations: [
  486:       {
  487:         field: "clientId",
  488:         moduleKey: "clientsauto",
  489:         labelFields: [
  490:           "nom",
  491:           "prenoms",
  492:           "telephone",
  493:         ],
  494:         snapshotFields: [
  495:           "nom",
  496:           "prenoms",
  497:           "telephone",
  498:           "email",
  499:         ],
  500:         displayAs: "card",

### rendezVousId — ligne 521

  513:           "modele",
  514:           "immatriculation",
  515:           "clientId",
  516:         ],
  517:         displayAs: "card",
  518:         lockDerivedFields: true,
  519:       },
  520:       {
  521:         field: "rendezVousId",
  522:         moduleKey: "rendezvous",
  523:         labelFields: [
  524:           "dateRendezVous",
  525:           "heureRendezVous",
  526:           "motif",
  527:         ],
  528:         snapshotFields: [
  529:           "dateRendezVous",
  530:           "heureRendezVous",
  531:           "motif",
  532:           "clientId",
  533:           "vehiculeId",
  534:         ],
  535:         displayAs: "inline",
  536:         lockDerivedFields: true,
  537:       },
  538:     ],
  539: 
  540:     lockedFields: [
  541:       "clientId",
  542:       "vehiculeId",
  543:       "rendezVousId",
  544:       "coutPieces",
  545:       "coutMainOeuvre",
  546:       "coutTotal",

### rendezVousId — ligne 543

  535:         displayAs: "inline",
  536:         lockDerivedFields: true,
  537:       },
  538:     ],
  539: 
  540:     lockedFields: [
  541:       "clientId",
  542:       "vehiculeId",
  543:       "rendezVousId",
  544:       "coutPieces",
  545:       "coutMainOeuvre",
  546:       "coutTotal",
  547:     ],
  548: 
  549:     readOnlyFields: [
  550:       "dateIntervention",
  551:           "clientId",
  552:       "vehiculeId",
  553:       "rendezVousId",
  554:       "coutPieces",
  555:       "coutMainOeuvre",
  556:       "coutTotal",
  557:       "montantHT",
  558:       "montantTTC",
  559: ],
  560: 
  561:     children: [
  562:       {
  563:         key: "lignes",
  564:         moduleKey: "lignesinterventionauto",
  565:         foreignKey: "interventionId",
  566:         title: "Lignes de l’intervention",
  567:         createLabel: "Ajouter une ligne",
  568:         openLabel: "Ouvrir ligne",

### rendezVousId — ligne 553

  545:       "coutMainOeuvre",
  546:       "coutTotal",
  547:     ],
  548: 
  549:     readOnlyFields: [
  550:       "dateIntervention",
  551:           "clientId",
  552:       "vehiculeId",
  553:       "rendezVousId",
  554:       "coutPieces",
  555:       "coutMainOeuvre",
  556:       "coutTotal",
  557:       "montantHT",
  558:       "montantTTC",
  559: ],
  560: 
  561:     children: [
  562:       {
  563:         key: "lignes",
  564:         moduleKey: "lignesinterventionauto",
  565:         foreignKey: "interventionId",
  566:         title: "Lignes de l’intervention",
  567:         createLabel: "Ajouter une ligne",
  568:         openLabel: "Ouvrir ligne",
  569:         displayIn: [
  570:           "detail",
  571:           "edit",
  572:         ],
  573:         position: "after",
  574:         lazy: true,
  575: 
  576:         // Q20H5E_B1_CLEAN_LINE_PANEL_LABELS
  577:         // Affichage métier lisible des lignes liées :
  578:         // titre non dupliqué + statut/quantité/montant en informations secondaires.

### rendezvous — ligne 57

   49:         searchable: true,
   50:         list: { visible: true, order: 2 },
   51:         grid: { cols: 6 },
   52:       },
   53: {
   54:         key: "rendezVousId",
   55:         label: "Rendez-vous",
   56:         type: "relation",
   57:         relation: { module: "rendezvous" },
   58:         searchable: true,
   59:         list: { visible: false },
   60:         grid: { cols: 6 },
   61:       },
   62:       {
   63:         key: "mecanicienId",
   64:         label: "Mécanicien responsable",
   65:         type: "relation",
   66:         relation: { module: "employes" },
   67:         searchable: true,
   68:         list: { visible: true, order: 5 },
   69:         grid: { cols: 6 },
   70:       },
   71: {
   72:         key: "dateIntervention",
   73:         label: "Date intervention",
   74:         type: "date",
   75:         required: true,
   76:         list: { visible: true, order: 3 },
   77:         grid: { cols: 6 },
   78:       },
   79: {
   80:         key: "typeIntervention",
   81:         label: "Type intervention",
   82:         type: "select",

### rendezvous — ligne 437

  429:             "marque",
  430:             "modele",
  431:             "immatriculation",
  432:           ],
  433:           tone: "vehicle",
  434:         },
  435:         {
  436:           relationField: "rendezVousId",
  437:           moduleKey: "rendezvous",
  438:           labelFields: [
  439:             "dateRendezVous",
  440:             "heureRendezVous",
  441:             "typeService",
  442:             "statut",
  443:           ],
  444:           tone: "workshop",
  445:         },
  446:       ],
  447:     },
  448: 
  449:     labelFields: [
  450:       "dateIntervention",
  451:       "typeIntervention",
  452:       "statut",
  453:     ],
  454: 
  455:     breadcrumbs: [
  456:       {
  457:         field: "clientId",
  458:         moduleKey: "clientsauto",
  459:         labelFields: [
  460:           "nom",
  461:           "prenoms",
  462:           "telephone",

### rendezvous — ligne 476

  468:         labelFields: [
  469:           "marque",
  470:           "modele",
  471:           "immatriculation",
  472:         ],
  473:       },
  474:       {
  475:         field: "rendezVousId",
  476:         moduleKey: "rendezvous",
  477:         labelFields: [
  478:           "dateRendezVous",
  479:           "heureRendezVous",
  480:           "motif",
  481:         ],
  482:       },
  483:     ],
  484: 
  485:     relations: [
  486:       {
  487:         field: "clientId",
  488:         moduleKey: "clientsauto",
  489:         labelFields: [
  490:           "nom",
  491:           "prenoms",
  492:           "telephone",
  493:         ],
  494:         snapshotFields: [
  495:           "nom",
  496:           "prenoms",
  497:           "telephone",
  498:           "email",
  499:         ],
  500:         displayAs: "card",
  501:         lockDerivedFields: true,

### rendezvous — ligne 522

  514:           "immatriculation",
  515:           "clientId",
  516:         ],
  517:         displayAs: "card",
  518:         lockDerivedFields: true,
  519:       },
  520:       {
  521:         field: "rendezVousId",
  522:         moduleKey: "rendezvous",
  523:         labelFields: [
  524:           "dateRendezVous",
  525:           "heureRendezVous",
  526:           "motif",
  527:         ],
  528:         snapshotFields: [
  529:           "dateRendezVous",
  530:           "heureRendezVous",
  531:           "motif",
  532:           "clientId",
  533:           "vehiculeId",
  534:         ],
  535:         displayAs: "inline",
  536:         lockDerivedFields: true,
  537:       },
  538:     ],
  539: 
  540:     lockedFields: [
  541:       "clientId",
  542:       "vehiculeId",
  543:       "rendezVousId",
  544:       "coutPieces",
  545:       "coutMainOeuvre",
  546:       "coutTotal",
  547:     ],

## Blocs lignes intervention

### lignesinterventionauto — ligne 564

  554:       "coutPieces",
  555:       "coutMainOeuvre",
  556:       "coutTotal",
  557:       "montantHT",
  558:       "montantTTC",
  559: ],
  560: 
  561:     children: [
  562:       {
  563:         key: "lignes",
  564:         moduleKey: "lignesinterventionauto",
  565:         foreignKey: "interventionId",
  566:         title: "Lignes de l’intervention",
  567:         createLabel: "Ajouter une ligne",
  568:         openLabel: "Ouvrir ligne",
  569:         displayIn: [
  570:           "detail",
  571:           "edit",
  572:         ],
  573:         position: "after",
  574:         lazy: true,
  575: 
  576:         // Q20H5E_B1_CLEAN_LINE_PANEL_LABELS
  577:         // Affichage métier lisible des lignes liées :
  578:         // titre non dupliqué + statut/quantité/montant en informations secondaires.
  579:         labelFields: [
  580:           "designation",
  581:         ],
  582:         subtitleFields: [
  583:           "statut",
  584:           "quantite",
  585:           "typeLigne",
  586:           "montantTotal",
  587:           "stockId",
  588:         ],
  589: 
  590:         totalField: "montantTotal",
  591:         relations: [
  592:           {
  593:             field: "produitId",
  594:             moduleKey: "produitsauto",
  595:             labelFields: [
  596:               "nom",
  597:               "reference",
  598:               "code",
  599:             ],

### children — ligne 561

  551:           "clientId",
  552:       "vehiculeId",
  553:       "rendezVousId",
  554:       "coutPieces",
  555:       "coutMainOeuvre",
  556:       "coutTotal",
  557:       "montantHT",
  558:       "montantTTC",
  559: ],
  560: 
  561:     children: [
  562:       {
  563:         key: "lignes",
  564:         moduleKey: "lignesinterventionauto",
  565:         foreignKey: "interventionId",
  566:         title: "Lignes de l’intervention",
  567:         createLabel: "Ajouter une ligne",
  568:         openLabel: "Ouvrir ligne",
  569:         displayIn: [
  570:           "detail",
  571:           "edit",
  572:         ],
  573:         position: "after",
  574:         lazy: true,
  575: 
  576:         // Q20H5E_B1_CLEAN_LINE_PANEL_LABELS
  577:         // Affichage métier lisible des lignes liées :
  578:         // titre non dupliqué + statut/quantité/montant en informations secondaires.
  579:         labelFields: [
  580:           "designation",
  581:         ],
  582:         subtitleFields: [
  583:           "statut",
  584:           "quantite",
  585:           "typeLigne",
  586:           "montantTotal",
  587:           "stockId",
  588:         ],
  589: 
  590:         totalField: "montantTotal",
  591:         relations: [
  592:           {
  593:             field: "produitId",
  594:             moduleKey: "produitsauto",
  595:             labelFields: [
  596:               "nom",

## Blocs montants intervention

### montantHT — ligne 137

  129: {
  130:         key: "coutTotal",
  131:         label: "Coût total",
  132:         type: "number",
  133:         list: { visible: true, order: 6 },
  134:         grid: { cols: 4 },
  135:       },
  136:       {
  137:         key: "montantHT",
  138:         label: "Montant HT",
  139:         type: "number",
  140:         list: { visible: true, order: 7 },
  141:         grid: { cols: 4 },
  142:         helperText: "Montant calculé depuis les lignes validées. Ancien équivalent legacy : coutTotal.",
  143:       },
  144: {
  145:         key: "statut",
  146:         label: "Statut",
  147:         readonlyIf: {
  148:           field: "statut",
  149:           operator: "in",
  150:           values: ["ouverte", "diagnostic", "en_cours", "terminee", "facturee", "annulee"],
  151:         },
  152:         helperText: "Statut piloté par les actions. Utilisez les boutons d’action pour changer l’état de l’intervention.",
  153:         type: "select",
  154:         defaultValue: "ouverte",
  155:         options: [
  156:           { label: "Ouverte", value: "ouverte" },
  157:           { label: "Diagnostic", value: "diagnostic" },
  158:           { label: "En cours", value: "en_cours" },
  159:           { label: "Terminée", value: "terminee" },
  160:           { label: "Facturée", value: "facturee" },
  161:           { label: "Annulée", value: "annulee" },
  162:         ],

### montantHT — ligne 557

  549:     readOnlyFields: [
  550:       "dateIntervention",
  551:           "clientId",
  552:       "vehiculeId",
  553:       "rendezVousId",
  554:       "coutPieces",
  555:       "coutMainOeuvre",
  556:       "coutTotal",
  557:       "montantHT",
  558:       "montantTTC",
  559: ],
  560: 
  561:     children: [
  562:       {
  563:         key: "lignes",
  564:         moduleKey: "lignesinterventionauto",
  565:         foreignKey: "interventionId",
  566:         title: "Lignes de l’intervention",
  567:         createLabel: "Ajouter une ligne",
  568:         openLabel: "Ouvrir ligne",
  569:         displayIn: [
  570:           "detail",
  571:           "edit",
  572:         ],
  573:         position: "after",
  574:         lazy: true,
  575: 
  576:         // Q20H5E_B1_CLEAN_LINE_PANEL_LABELS
  577:         // Affichage métier lisible des lignes liées :
  578:         // titre non dupliqué + statut/quantité/montant en informations secondaires.
  579:         labelFields: [
  580:           "designation",
  581:         ],
  582:         subtitleFields: [

### montantTTC — ligne 558

  550:       "dateIntervention",
  551:           "clientId",
  552:       "vehiculeId",
  553:       "rendezVousId",
  554:       "coutPieces",
  555:       "coutMainOeuvre",
  556:       "coutTotal",
  557:       "montantHT",
  558:       "montantTTC",
  559: ],
  560: 
  561:     children: [
  562:       {
  563:         key: "lignes",
  564:         moduleKey: "lignesinterventionauto",
  565:         foreignKey: "interventionId",
  566:         title: "Lignes de l’intervention",
  567:         createLabel: "Ajouter une ligne",
  568:         openLabel: "Ouvrir ligne",
  569:         displayIn: [
  570:           "detail",
  571:           "edit",
  572:         ],
  573:         position: "after",
  574:         lazy: true,
  575: 
  576:         // Q20H5E_B1_CLEAN_LINE_PANEL_LABELS
  577:         // Affichage métier lisible des lignes liées :
  578:         // titre non dupliqué + statut/quantité/montant en informations secondaires.
  579:         labelFields: [
  580:           "designation",
  581:         ],
  582:         subtitleFields: [
  583:           "statut",

### montantTTC — ligne 633

  625:         position: "after",
  626:         allowCreate: true,
  627:         prefillFromParent: {
  628:           interventionId: "id",
  629:           clientId: "clientId",
  630:           vehiculeId: "vehiculeId",
  631:         },
  632:         lockFields: ["interventionId", "clientId", "vehiculeId"],
  633:         labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
  634:         subtitleFields: ["clientId", "vehiculeId", "dateFacture"],
  635:         totalField: "montantTTC",
  636:         relations: [
  637:           {
  638:             field: "clientId",
  639:             moduleKey: "clientsauto",
  640:             labelFields: ["prenom", "nom", "telephone"],
  641:           },
  642:           {
  643:             field: "vehiculeId",
  644:             moduleKey: "vehicules",
  645:             labelFields: ["marque", "modele", "immatriculation"],
  646:           },
  647:         ],
  648:       }],
  649:   },
  650: 
  651:   actions: interventionsautoActions,
  652: 
  653:   workflows: [
  654:     {
  655:       key: "intervention",
  656:       label: "Cycle intervention",
  657:       initialState: "ouverte",
  658: 

### montantTTC — ligne 635

  627:         prefillFromParent: {
  628:           interventionId: "id",
  629:           clientId: "clientId",
  630:           vehiculeId: "vehiculeId",
  631:         },
  632:         lockFields: ["interventionId", "clientId", "vehiculeId"],
  633:         labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
  634:         subtitleFields: ["clientId", "vehiculeId", "dateFacture"],
  635:         totalField: "montantTTC",
  636:         relations: [
  637:           {
  638:             field: "clientId",
  639:             moduleKey: "clientsauto",
  640:             labelFields: ["prenom", "nom", "telephone"],
  641:           },
  642:           {
  643:             field: "vehiculeId",
  644:             moduleKey: "vehicules",
  645:             labelFields: ["marque", "modele", "immatriculation"],
  646:           },
  647:         ],
  648:       }],
  649:   },
  650: 
  651:   actions: interventionsautoActions,
  652: 
  653:   workflows: [
  654:     {
  655:       key: "intervention",
  656:       label: "Cycle intervention",
  657:       initialState: "ouverte",
  658: 
  659:       states: [
  660:         { key: "ouverte", label: "Ouverte", color: "default" },

## Lecture recommandée

- Corriger uniquement les FAIL.
- Le statut intervention doit être visible mais non modifiable si piloté par actions runtime.
- Les champs hérités RDV/client/véhicule doivent être verrouillés en contexte enfant.
- Intervention doit porter mecanicienId comme responsable réel.
- Les lignes d'intervention doivent porter les pièces/services/main-d'œuvre et alimenter les totaux.
- Facture/encaissement doivent rester dans leurs modules/contexte contrôlé.
