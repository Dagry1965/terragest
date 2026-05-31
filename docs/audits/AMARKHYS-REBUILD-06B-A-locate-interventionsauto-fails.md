# AMARKHYS-REBUILD-06B-A — Locate interventionsauto FAILs

Date: 2026-05-31T20:49:48.432Z

## Objectif

Localiser précisément les 4 FAIL de 06A avant correction : statut non verrouillé, mecanicienId absent, montantHT absent, totaux non reconnus.

## Hits module — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts

- interventionsauto — L4: interventionsautoActions,
- interventionsauto — L5: } from "./interventionsauto.actions";
- interventionsauto — L7: export const interventionsautoModule: ERPModule = {
- interventionsauto — L9: key: "interventionsauto",
- interventionsauto — L30: collection: "interventionsauto",
- coutPieces — L107: key: "coutPieces",
- coutMainOeuvre — L114: key: "coutMainOeuvre",
- coutTotal — L121: key: "coutTotal",
- statut — L128: key: "statut",
- statut — L161: "statut",
- statut — L175: "statut",
- coutPieces — L207: "coutPieces",
- coutMainOeuvre — L208: "coutMainOeuvre",
- coutTotal — L209: "coutTotal",
- coutPieces — L217: "coutPieces",
- coutMainOeuvre — L218: "coutMainOeuvre",
- coutTotal — L219: "coutTotal",
- statut — L249: field: "statut",
- statut — L257: field: "statut",
- statut — L265: field: "statut",
- statut — L273: field: "statut",
- statut — L281: key: "statut",
- statut — L283: field: "statut",
- coutTotal — L325: "coutTotal",
- statut — L326: "statut",
- statut — L371: field: "statut",
- coutTotal — L379: field: "coutTotal",
- statut — L419: "statut",
- statut — L429: "statut",
- coutPieces — L521: "coutPieces",
- coutMainOeuvre — L522: "coutMainOeuvre",
- coutTotal — L523: "coutTotal",
- lignesinterventionauto — L533: moduleKey: "lignesinterventionauto",
- statut — L547: // titre non dupliqué + statut/quantité/montant en informations secondaires.
- statut — L552: "statut",
- statut — L602: labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
- montantTTC — L602: labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
- montantTTC — L604: totalField: "montantTTC",
- interventionsauto — L620: actions: interventionsautoActions,

## Hits actions — src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts

- interventionsauto — L5: export const interventionsautoActions: ERPModuleAction[] = [
- interventionsauto — L16: permission: "interventionsauto.workflow",
- interventionsauto — L22: permission: "interventionsauto.workflow",
- interventionsauto — L28: permission: "interventionsauto.workflow",
- interventionsauto — L34: permission: "interventionsauto.workflow",
- interventionsauto — L40: permission: "interventionsauto.workflow",

## Hits business rules — src/runtime/business-rules/runtimeBusinessRules.ts

- interventionsauto — L133: "interventionsauto",
- interventionsauto — L136: "interventionsauto.created",
- statut — L197: statut:
- coutTotal — L230: payload.coutTotal ?? 0
- interventionsauto — L251: "interventionsauto",
- statut — L294: payload.statut ===
- interventionsauto — L303: "interventionsauto"
- interventionsauto — L352: "interventionsauto",
- interventionsauto — L427: "interventionsauto",
- statut — L455: payload.statut ===
- interventionsauto — L464: "interventionsauto"
- interventionsauto — L513: "interventionsauto",
- interventionsauto — L588: "interventionsauto",
- interventionsauto — L613: "interventionsauto",
- interventionsauto — L616: "interventionsauto.updated",
- statut — L621: payload.statut ===
- interventionsauto — L649: "interventionsauto"
- statut — L682: String(facture.statutFacture ?? "") !==
- montantHT — L719: const montantHT =
- montantHT — L721: asNumber(intervention.montantHT) ||
- coutTotal — L722: asNumber(intervention.coutTotal)
- montantHT — L731: montantHT > 0 && montantTVA > 0
- montantHT — L732: ? roundMoney((montantTVA / montantHT) * 100)
- montantTTC — L788: const montantTTC =
- montantTTC — L790: asNumber(intervention.montantTTC) ||
- montantHT — L792: montantHT +
- montantHT — L796: : montantHT * tauxTVA / 100
- statut — L814: statutFacture:
- montantHT — L825: montantHT,
- montantTTC — L830: montantTTC,
- montantTTC — L836: montantTTC,
- statut — L838: statutPaiement:
- interventionsauto — L852: "interventionsauto",
- statut — L902: payload.statutPaiement ===
- montantTTC — L913: payload.montantTTC ?? 0
- montantTTC — L969: `Paiement reçu : ${payload.montantTTC}`,
- interventionsauto — L1021: "interventionsauto"
- montantHT — L1080: asRuntimeNumber(facture.montantHT);
- montantTTC — L1087: facture.montantTTC ??
- montantHT — L1095: linkedIntervention?.montantHT ??
- coutTotal — L1096: linkedIntervention?.coutTotal
- montantTTC — L1106: linkedIntervention?.montantTTC
- statut — L1151: encaissement.statut ===
- montantTTC — L1165: const montantTTC =
- montantTTC — L1170: montantTTC - montantPaye,
- statut — L1174: const statutPaiement =
- montantTTC — L1177: : montantPaye < montantTTC
- montantHT — L1185: montantHT:
- montantTTC — L1194: montantTTC:
- statut — L1199: statutPaiement,
- interventionsauto — L1270: "interventionsauto"
- montantHT — L1329: asRuntimeNumber(facture.montantHT);
- montantTTC — L1336: facture.montantTTC ??
- montantHT — L1344: linkedIntervention?.montantHT ??
- coutTotal — L1345: linkedIntervention?.coutTotal
- montantTTC — L1355: linkedIntervention?.montantTTC
- statut — L1400: encaissement.statut ===
- montantTTC — L1414: const montantTTC =
- montantTTC — L1419: montantTTC - montantPaye,
- statut — L1423: const statutPaiement =
- montantTTC — L1426: : montantPaye < montantTTC
- montantHT — L1434: montantHT:
- montantTTC — L1443: montantTTC:
- statut — L1448: statutPaiement,
- statut — L1504: payload.statut === "payee" ||
- statut — L1505: payload.statut === "annulee"
- statut — L1595: statut:
- statut — L1608: statut:
- statut — L1663: payload.statut === "payee" ||
- statut — L1664: payload.statut === "annulee" ||
- statut — L1665: payload.statut === "en_retard"
- statut — L1755: statut:
- statut — L1768: statut:
- statut — L1817: if (businessRuleAsString(rendezvous.statut).toLowerCase() === "annule") {
- statut — L1867: statut: {

## Hits mutation — src/runtime/firebase/FirestoreRuntimeMutation.ts

- Aucun hit.

## Hits status governance — src/runtime/status/RuntimeStatusGovernanceEngine.ts

- RuntimeStatusGovernance — L4: RuntimeStatusGovernanceContext,
- RuntimeStatusGovernance — L5: RuntimeStatusGovernancePolicy,
- RuntimeStatusGovernance — L6: RuntimeStatusGovernanceResult,
- RuntimeStatusGovernance — L8: } from "./RuntimeStatusGovernanceTypes";
- RuntimeStatusGovernance — L10: const runtimeStatusPolicies: RuntimeStatusGovernancePolicy[] = [
- lignesinterventionauto — L12: moduleKey: "lignesinterventionauto",
- statut — L13: statusField: "statut",
- statut — L36: "État technique remplacé par une relation facture/document. Non exposé comme statut utilisateur.",
- statut — L96: statusField: "statut",
- statut — L131: statusField: "statut",
- RuntimeStatusGovernance — L251: function getPolicy(moduleKey: string): RuntimeStatusGovernancePolicy | undefined {
- RuntimeStatusGovernance — L258: policy: RuntimeStatusGovernancePolicy,
- statut — L261: const statusField = policy.statusField ?? "statut";
- RuntimeStatusGovernance — L291: export const RuntimeStatusGovernanceEngine = {
- RuntimeStatusGovernance — L294: listPolicies(): RuntimeStatusGovernancePolicy[] {
- RuntimeStatusGovernance — L299: context: RuntimeStatusGovernanceContext
- RuntimeStatusGovernance — L300: ): RuntimeStatusGovernanceResult | null {
- statut — L311: statusField: policy.statusField ?? "statut",

## Blocs champs critiques interventionsauto.module.ts

### key: "statut" — ligne 128

  116:         type: "number",
  117:         list: { visible: false },
  118:         grid: { cols: 4 },
  119:       },
  120: {
  121:         key: "coutTotal",
  122:         label: "Coût total",
  123:         type: "number",
  124:         list: { visible: true, order: 6 },
  125:         grid: { cols: 4 },
  126:       },
  127: {
  128:         key: "statut",
  129:         label: "Statut",
  130:         type: "select",
  131:         defaultValue: "ouverte",
  132:         options: [
  133:           { label: "Ouverte", value: "ouverte" },
  134:           { label: "Diagnostic", value: "diagnostic" },
  135:           { label: "En cours", value: "en_cours" },
  136:           { label: "Terminée", value: "terminee" },
  137:           { label: "Facturée", value: "facturee" },
  138:           { label: "Annulée", value: "annulee" },
  139:         ],
  140:         list: { visible: true, order: 5 },
  141:         grid: { cols: 6 },
  142:       }
  143:     ],
  144:   },
  145: 
  146:   form: {
  147:     layout: "tabs",
  148: 
  149:     tabs: [
  150:       {
  151:         key: "contexte",
  152:         label: "Contexte",
  153: 
  154:         fields: [
  155:           "clientId",
  156:           "vehiculeId",
  157:           "rendezVousId",
  158:           "dateIntervention",
  159:           "typeIntervention",
  160:           "kilometrage",
  161:           "statut",
  162:         ],
  163: 

### key: "statut" — ligne 281

  269:       },
  270:       {
  271:         key: "annulees",
  272:         label: "Annulées",
  273:         field: "statut",
  274:         equals: "annulee",
  275:         tone: "gray",
  276:         icon: "x",
  277:       },
  278:     ],
  279:     filters: [
  280:       {
  281:         key: "statut",
  282:         label: "Statut",
  283:         field: "statut",
  284:         type: "select",
  285:         options: [
  286:           { label: "Ouverte", value: "ouverte" },
  287:           { label: "Diagnostic", value: "diagnostic" },
  288:           { label: "En cours", value: "en_cours" },
  289:           { label: "Terminée", value: "terminee" },
  290:           { label: "Facturée", value: "facturee" },
  291:           { label: "Annulée", value: "annulee" },
  292:         ],
  293:       },
  294:       {
  295:         key: "typeIntervention",
  296:         label: "Type intervention",
  297:         field: "typeIntervention",
  298:         type: "select",
  299:         options: [
  300:           { label: "Vidange", value: "vidange" },
  301:           { label: "Diagnostic", value: "diagnostic" },
  302:           { label: "Réparation", value: "reparation" },
  303:           { label: "Pneumatiques", value: "pneumatiques" },
  304:           { label: "Contrôle", value: "controle" },
  305:           { label: "Autre", value: "autre" },
  306:         ],
  307:       },
  308:       {
  309:         key: "clientId",
  310:         label: "Client",
  311:         field: "clientId",
  312:         type: "relation",
  313:       },
  314:     ],
  315:     table: {
  316:       enableSearch: true,

### key: "coutPieces" — ligne 107

   95:         type: "textarea",
   96:         list: { visible: false },
   97:         grid: { cols: 12 },
   98:       },
   99: {
  100:         key: "travauxEffectues",
  101:         label: "Travaux effectués",
  102:         type: "textarea",
  103:         list: { visible: false },
  104:         grid: { cols: 12 },
  105:       },
  106: {
  107:         key: "coutPieces",
  108:         label: "Coût pièces",
  109:         type: "number",
  110:         list: { visible: false },
  111:         grid: { cols: 4 },
  112:       },
  113: {
  114:         key: "coutMainOeuvre",
  115:         label: "Coût main d'oeuvre",
  116:         type: "number",
  117:         list: { visible: false },
  118:         grid: { cols: 4 },
  119:       },
  120: {
  121:         key: "coutTotal",
  122:         label: "Coût total",
  123:         type: "number",
  124:         list: { visible: true, order: 6 },
  125:         grid: { cols: 4 },
  126:       },
  127: {
  128:         key: "statut",
  129:         label: "Statut",
  130:         type: "select",
  131:         defaultValue: "ouverte",
  132:         options: [
  133:           { label: "Ouverte", value: "ouverte" },
  134:           { label: "Diagnostic", value: "diagnostic" },
  135:           { label: "En cours", value: "en_cours" },
  136:           { label: "Terminée", value: "terminee" },
  137:           { label: "Facturée", value: "facturee" },
  138:           { label: "Annulée", value: "annulee" },
  139:         ],
  140:         list: { visible: true, order: 5 },
  141:         grid: { cols: 6 },
  142:       }

### key: "coutMainOeuvre" — ligne 114

  102:         type: "textarea",
  103:         list: { visible: false },
  104:         grid: { cols: 12 },
  105:       },
  106: {
  107:         key: "coutPieces",
  108:         label: "Coût pièces",
  109:         type: "number",
  110:         list: { visible: false },
  111:         grid: { cols: 4 },
  112:       },
  113: {
  114:         key: "coutMainOeuvre",
  115:         label: "Coût main d'oeuvre",
  116:         type: "number",
  117:         list: { visible: false },
  118:         grid: { cols: 4 },
  119:       },
  120: {
  121:         key: "coutTotal",
  122:         label: "Coût total",
  123:         type: "number",
  124:         list: { visible: true, order: 6 },
  125:         grid: { cols: 4 },
  126:       },
  127: {
  128:         key: "statut",
  129:         label: "Statut",
  130:         type: "select",
  131:         defaultValue: "ouverte",
  132:         options: [
  133:           { label: "Ouverte", value: "ouverte" },
  134:           { label: "Diagnostic", value: "diagnostic" },
  135:           { label: "En cours", value: "en_cours" },
  136:           { label: "Terminée", value: "terminee" },
  137:           { label: "Facturée", value: "facturee" },
  138:           { label: "Annulée", value: "annulee" },
  139:         ],
  140:         list: { visible: true, order: 5 },
  141:         grid: { cols: 6 },
  142:       }
  143:     ],
  144:   },
  145: 
  146:   form: {
  147:     layout: "tabs",
  148: 
  149:     tabs: [

### key: "coutTotal" — ligne 121

  109:         type: "number",
  110:         list: { visible: false },
  111:         grid: { cols: 4 },
  112:       },
  113: {
  114:         key: "coutMainOeuvre",
  115:         label: "Coût main d'oeuvre",
  116:         type: "number",
  117:         list: { visible: false },
  118:         grid: { cols: 4 },
  119:       },
  120: {
  121:         key: "coutTotal",
  122:         label: "Coût total",
  123:         type: "number",
  124:         list: { visible: true, order: 6 },
  125:         grid: { cols: 4 },
  126:       },
  127: {
  128:         key: "statut",
  129:         label: "Statut",
  130:         type: "select",
  131:         defaultValue: "ouverte",
  132:         options: [
  133:           { label: "Ouverte", value: "ouverte" },
  134:           { label: "Diagnostic", value: "diagnostic" },
  135:           { label: "En cours", value: "en_cours" },
  136:           { label: "Terminée", value: "terminee" },
  137:           { label: "Facturée", value: "facturee" },
  138:           { label: "Annulée", value: "annulee" },
  139:         ],
  140:         list: { visible: true, order: 5 },
  141:         grid: { cols: 6 },
  142:       }
  143:     ],
  144:   },
  145: 
  146:   form: {
  147:     layout: "tabs",
  148: 
  149:     tabs: [
  150:       {
  151:         key: "contexte",
  152:         label: "Contexte",
  153: 
  154:         fields: [
  155:           "clientId",
  156:           "vehiculeId",

## Blocs relations/enfants interventionsauto.module.ts

### lignesinterventionauto — ligne 533

  521:       "coutPieces",
  522:       "coutMainOeuvre",
  523:       "coutTotal",
  524:     ],
  525: 
  526:     readOnlyFields: [
  527:       "dateIntervention",
  528:     ],
  529: 
  530:     children: [
  531:       {
  532:         key: "lignes",
  533:         moduleKey: "lignesinterventionauto",
  534:         foreignKey: "interventionId",
  535:         title: "Lignes de l’intervention",
  536:         createLabel: "Ajouter une ligne",
  537:         openLabel: "Ouvrir ligne",
  538:         displayIn: [
  539:           "detail",
  540:           "edit",
  541:         ],
  542:         position: "after",
  543:         lazy: true,
  544: 
  545:         // Q20H5E_B1_CLEAN_LINE_PANEL_LABELS
  546:         // Affichage métier lisible des lignes liées :
  547:         // titre non dupliqué + statut/quantité/montant en informations secondaires.
  548:         labelFields: [
  549:           "designation",
  550:         ],
  551:         subtitleFields: [
  552:           "statut",
  553:           "quantite",
  554:           "typeLigne",
  555:           "montantTotal",
  556:           "stockId",
  557:         ],
  558: 
  559:         totalField: "montantTotal",
  560:         relations: [
  561:           {
  562:             field: "produitId",
  563:             moduleKey: "produitsauto",
  564:             labelFields: [
  565:               "nom",
  566:               "reference",
  567:               "code",
  568:             ],

### children — ligne 530

  518:       "clientId",
  519:       "vehiculeId",
  520:       "rendezVousId",
  521:       "coutPieces",
  522:       "coutMainOeuvre",
  523:       "coutTotal",
  524:     ],
  525: 
  526:     readOnlyFields: [
  527:       "dateIntervention",
  528:     ],
  529: 
  530:     children: [
  531:       {
  532:         key: "lignes",
  533:         moduleKey: "lignesinterventionauto",
  534:         foreignKey: "interventionId",
  535:         title: "Lignes de l’intervention",
  536:         createLabel: "Ajouter une ligne",
  537:         openLabel: "Ouvrir ligne",
  538:         displayIn: [
  539:           "detail",
  540:           "edit",
  541:         ],
  542:         position: "after",
  543:         lazy: true,
  544: 
  545:         // Q20H5E_B1_CLEAN_LINE_PANEL_LABELS
  546:         // Affichage métier lisible des lignes liées :
  547:         // titre non dupliqué + statut/quantité/montant en informations secondaires.
  548:         labelFields: [
  549:           "designation",
  550:         ],
  551:         subtitleFields: [
  552:           "statut",
  553:           "quantite",
  554:           "typeLigne",
  555:           "montantTotal",
  556:           "stockId",
  557:         ],
  558: 
  559:         totalField: "montantTotal",
  560:         relations: [
  561:           {
  562:             field: "produitId",
  563:             moduleKey: "produitsauto",
  564:             labelFields: [
  565:               "nom",

### relations: — ligne 462

  450:       },
  451:       {
  452:         field: "rendezVousId",
  453:         moduleKey: "rendezvous",
  454:         labelFields: [
  455:           "dateRendezVous",
  456:           "heureRendezVous",
  457:           "motif",
  458:         ],
  459:       },
  460:     ],
  461: 
  462:     relations: [
  463:       {
  464:         field: "clientId",
  465:         moduleKey: "clientsauto",
  466:         labelFields: [
  467:           "nom",
  468:           "prenoms",
  469:           "telephone",
  470:         ],
  471:         snapshotFields: [
  472:           "nom",
  473:           "prenoms",
  474:           "telephone",
  475:           "email",
  476:         ],
  477:         displayAs: "card",
  478:         lockDerivedFields: true,
  479:       },
  480:       {
  481:         field: "vehiculeId",
  482:         moduleKey: "vehicules",
  483:         labelFields: [
  484:           "marque",
  485:           "modele",
  486:           "immatriculation",
  487:         ],
  488:         snapshotFields: [
  489:           "marque",
  490:           "modele",
  491:           "immatriculation",
  492:           "clientId",
  493:         ],
  494:         displayAs: "card",
  495:         lockDerivedFields: true,
  496:       },
  497:       {

### relations: — ligne 560

  548:         labelFields: [
  549:           "designation",
  550:         ],
  551:         subtitleFields: [
  552:           "statut",
  553:           "quantite",
  554:           "typeLigne",
  555:           "montantTotal",
  556:           "stockId",
  557:         ],
  558: 
  559:         totalField: "montantTotal",
  560:         relations: [
  561:           {
  562:             field: "produitId",
  563:             moduleKey: "produitsauto",
  564:             labelFields: [
  565:               "nom",
  566:               "reference",
  567:               "code",
  568:             ],
  569:             displayAs: "inline",
  570:           },
  571:           {
  572:             field: "stockId",
  573:             moduleKey: "stocksauto",
  574:             labelFields: [
  575:               "nom",
  576:               "emplacement",
  577:               "reference",
  578:             ],
  579:             displayAs: "inline",
  580:           },
  581:         ],
  582:       },
  583: 
  584:       // Q21E_D_INTERVENTION_BILLING_CHILDREN
  585:       {
  586:         key: "factures-intervention",
  587:         moduleKey: "facturesauto",
  588:         foreignKey: "interventionId",
  589:         title: "Factures de l'intervention",
  590:         createLabel: "Ajouter une facture",
  591:         openLabel: "Ouvrir facture",
  592:         displayIn: ["detail", "edit"],
  593:         lazy: true,
  594:         position: "after",
  595:         allowCreate: true,

### relations: — ligne 605

  593:         lazy: true,
  594:         position: "after",
  595:         allowCreate: true,
  596:         prefillFromParent: {
  597:           interventionId: "id",
  598:           clientId: "clientId",
  599:           vehiculeId: "vehiculeId",
  600:         },
  601:         lockFields: ["interventionId", "clientId", "vehiculeId"],
  602:         labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
  603:         subtitleFields: ["clientId", "vehiculeId", "dateFacture"],
  604:         totalField: "montantTTC",
  605:         relations: [
  606:           {
  607:             field: "clientId",
  608:             moduleKey: "clientsauto",
  609:             labelFields: ["prenom", "nom", "telephone"],
  610:           },
  611:           {
  612:             field: "vehiculeId",
  613:             moduleKey: "vehicules",
  614:             labelFields: ["marque", "modele", "immatriculation"],
  615:           },
  616:         ],
  617:       }],
  618:   },
  619: 
  620:   actions: interventionsautoActions,
  621: 
  622:   workflows: [
  623:     {
  624:       key: "intervention",
  625:       label: "Cycle intervention",
  626:       initialState: "ouverte",
  627: 
  628:       states: [
  629:         { key: "ouverte", label: "Ouverte", color: "default" },
  630:         { key: "diagnostic", label: "Diagnostic", color: "warning" },
  631:         { key: "en_cours", label: "En cours", color: "warning" },
  632:         { key: "terminee", label: "Terminée", color: "success" },
  633:         { key: "facturee", label: "Facturée", color: "success" },
  634:         { key: "annulee", label: "Annulée", color: "danger" },
  635:       ],
  636: 
  637:       transitions: [
  638:         { from: "ouverte", to: "diagnostic", action: "Diagnostiquer" },
  639:         { from: "diagnostic", to: "en_cours", action: "Démarrer" },
  640:         { from: "en_cours", to: "terminee", action: "Terminer" },

### lockedFields — ligne 517

  505:         snapshotFields: [
  506:           "dateRendezVous",
  507:           "heureRendezVous",
  508:           "motif",
  509:           "clientId",
  510:           "vehiculeId",
  511:         ],
  512:         displayAs: "inline",
  513:         lockDerivedFields: true,
  514:       },
  515:     ],
  516: 
  517:     lockedFields: [
  518:       "clientId",
  519:       "vehiculeId",
  520:       "rendezVousId",
  521:       "coutPieces",
  522:       "coutMainOeuvre",
  523:       "coutTotal",
  524:     ],
  525: 
  526:     readOnlyFields: [
  527:       "dateIntervention",
  528:     ],
  529: 
  530:     children: [
  531:       {
  532:         key: "lignes",
  533:         moduleKey: "lignesinterventionauto",
  534:         foreignKey: "interventionId",
  535:         title: "Lignes de l’intervention",
  536:         createLabel: "Ajouter une ligne",
  537:         openLabel: "Ouvrir ligne",
  538:         displayIn: [
  539:           "detail",
  540:           "edit",
  541:         ],
  542:         position: "after",
  543:         lazy: true,
  544: 
  545:         // Q20H5E_B1_CLEAN_LINE_PANEL_LABELS
  546:         // Affichage métier lisible des lignes liées :
  547:         // titre non dupliqué + statut/quantité/montant en informations secondaires.
  548:         labelFields: [
  549:           "designation",
  550:         ],
  551:         subtitleFields: [
  552:           "statut",

### readOnlyFields — ligne 526

  514:       },
  515:     ],
  516: 
  517:     lockedFields: [
  518:       "clientId",
  519:       "vehiculeId",
  520:       "rendezVousId",
  521:       "coutPieces",
  522:       "coutMainOeuvre",
  523:       "coutTotal",
  524:     ],
  525: 
  526:     readOnlyFields: [
  527:       "dateIntervention",
  528:     ],
  529: 
  530:     children: [
  531:       {
  532:         key: "lignes",
  533:         moduleKey: "lignesinterventionauto",
  534:         foreignKey: "interventionId",
  535:         title: "Lignes de l’intervention",
  536:         createLabel: "Ajouter une ligne",
  537:         openLabel: "Ouvrir ligne",
  538:         displayIn: [
  539:           "detail",
  540:           "edit",
  541:         ],
  542:         position: "after",
  543:         lazy: true,
  544: 
  545:         // Q20H5E_B1_CLEAN_LINE_PANEL_LABELS
  546:         // Affichage métier lisible des lignes liées :
  547:         // titre non dupliqué + statut/quantité/montant en informations secondaires.
  548:         labelFields: [
  549:           "designation",
  550:         ],
  551:         subtitleFields: [
  552:           "statut",
  553:           "quantite",
  554:           "typeLigne",
  555:           "montantTotal",
  556:           "stockId",
  557:         ],
  558: 
  559:         totalField: "montantTotal",
  560:         relations: [
  561:           {

## Lecture attendue

- Si coutTotal est l'ancien total HT, décider s'il faut le conserver comme legacy et ajouter montantHT calculé.
- Ajouter mecanicienId comme responsable réel de l'intervention si absent.
- Verrouiller statut avec readonlyIf, comme rendezvous.
- Ne corriger que les 4 FAIL.
