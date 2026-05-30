# Q2-OP-I16-D1 — Audit actions facturesauto

Objectif : vérifier précisément les actions runtime `envoyer-facture` et `annuler-facture` dans `facturesauto`, en lisant module + fichier actions.

## Résumé

- OK : 21
- WARN : 1
- WARN HIGH : 0
- FAIL : 0
- FAIL HIGH : 0

## Checks

| Area | Status | Severity | File | Lines | Message |
|---|---:|---:|---|---|---|
| module-file | OK | HIGH | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` |  | facturesauto module file found |
| actions-file | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` |  | facturesauto actions file found |
| module-actions-binding | OK | HIGH | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 621 | facturesauto module binding actions: facturesautoActions found |
| module-inline-actions | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` |  | facturesauto inline actions block absent |
| expected-action-key | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` | 44 | facturesauto expected action key envoyer-facture found |
| expected-action-label | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` | 45 | facturesauto expected action label "Envoyer facture" found |
| expected-action-key | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` | 51 | facturesauto expected action key annuler-facture found |
| expected-action-label | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` | 52 | facturesauto expected action label "Annuler facture" found |
| runtime-action-contract | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` | 47, 54 | facturesauto runtimeOnly marker found |
| action-type-contract | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` |  | facturesauto unsupported marker description: absent in actions file/module |
| action-type-contract | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` |  | facturesauto unsupported marker visibleWhen: absent in actions file/module |
| expected-status | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 54, 408 | facturesauto status marker brouillon found |
| expected-status | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 166, 168, 169 | facturesauto status marker envoyee found |
| expected-status | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 56, 382, 385, 410 | facturesauto status marker annulee found |
| expected-status | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 374 | facturesauto status marker payee found |
| expected-status | WARN | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` |  | facturesauto status marker partiellement_payee missing |
| expected-field | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 49, 230, 241, 384, 403, 405 | facturesauto field marker statutFacture found |
| expected-field | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 123, 276, 287, 429, 475, 495, 542 | facturesauto field marker montantTTC found |
| expected-field | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 134, 277, 288, 543, 597 | facturesauto field marker montantPaye found |
| expected-field | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 142, 278, 289, 483, 495, 544 | facturesauto field marker resteAPayer found |
| expected-field | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 75, 253, 262, 414, 416, 427, 433, 495, 501, 535, 565, 568, 568, 571, 574, 598, 601, 601, 604, 607 | facturesauto field marker clientId found |
| expected-field | OK | LOW | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 86, 254, 263, 428, 438, 511, 536, 565, 569, 569, 571, 579, 598, 602, 602, 604, 612 | facturesauto field marker vehiculeId found |

## Contextes utiles

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: actions: facturesautoActions :: line 621

```ts
  615:           },
  616:         ],
  617:       },
  618:     ],
  619:   },
  620: 
  621:   actions: facturesautoActions,
  622: 
  623:   workflows: [
  624:     {
  625:       key: "facture",
  626:       label: "Cycle facture",
  627:       initialState: "en_attente",
  628:       states: [
  629:         {
  630:           key: "en_attente",
  631:           label: "En attente",
  632:           color: "warning",
  633:         },
```

### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts :: envoyer-facture :: line 44

```ts
   38:     label: "Annuler",
   39:     type: "danger",
   40:     permission: "facturesauto.workflow",
   41:   },
   42: ,
   43:   {
   44:     key: "envoyer-facture",
   45:     label: "Envoyer facture",
   46:     type: "primary",
   47:     runtimeOnly: true,
   48:   }
   49: ,
   50:   {
   51:     key: "annuler-facture",
   52:     label: "Annuler facture",
   53:     type: "danger",
   54:     runtimeOnly: true,
   55:   }
   56: ];
```

### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts :: Envoyer facture :: line 45

```ts
   39:     type: "danger",
   40:     permission: "facturesauto.workflow",
   41:   },
   42: ,
   43:   {
   44:     key: "envoyer-facture",
   45:     label: "Envoyer facture",
   46:     type: "primary",
   47:     runtimeOnly: true,
   48:   }
   49: ,
   50:   {
   51:     key: "annuler-facture",
   52:     label: "Annuler facture",
   53:     type: "danger",
   54:     runtimeOnly: true,
   55:   }
   56: ];
```

### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts :: annuler-facture :: line 51

```ts
   45:     label: "Envoyer facture",
   46:     type: "primary",
   47:     runtimeOnly: true,
   48:   }
   49: ,
   50:   {
   51:     key: "annuler-facture",
   52:     label: "Annuler facture",
   53:     type: "danger",
   54:     runtimeOnly: true,
   55:   }
   56: ];
```

### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts :: Annuler facture :: line 52

```ts
   46:     type: "primary",
   47:     runtimeOnly: true,
   48:   }
   49: ,
   50:   {
   51:     key: "annuler-facture",
   52:     label: "Annuler facture",
   53:     type: "danger",
   54:     runtimeOnly: true,
   55:   }
   56: ];
```

### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts :: runtimeOnly: true :: line 47

```ts
   41:   },
   42: ,
   43:   {
   44:     key: "envoyer-facture",
   45:     label: "Envoyer facture",
   46:     type: "primary",
   47:     runtimeOnly: true,
   48:   }
   49: ,
   50:   {
   51:     key: "annuler-facture",
   52:     label: "Annuler facture",
   53:     type: "danger",
   54:     runtimeOnly: true,
   55:   }
   56: ];
```

### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts :: runtimeOnly: true :: line 54

```ts
   48:   }
   49: ,
   50:   {
   51:     key: "annuler-facture",
   52:     label: "Annuler facture",
   53:     type: "danger",
   54:     runtimeOnly: true,
   55:   }
   56: ];
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: brouillon :: line 54

```ts
   48: {
   49:         key: "statutFacture",
   50:         label: "Statut facture",
   51:         type: "select",
   52:         defaultValue: "emise",
   53:         options: [
   54:           { label: "Brouillon", value: "brouillon" },
   55:           { label: "Émise", value: "emise" },
   56:           { label: "Annulée", value: "annulee" },
   57:         ],
   58:         list: { visible: false },
   59:         grid: { cols: 4 },
   60:       },
   61: {
   62:         key: "statutPaiement",
   63:         label: "Statut paiement",
   64:         type: "select",
   65:         defaultValue: "en_attente",
   66:         options: [
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: brouillon :: line 408

```ts
  402:       {
  403:         key: "statutFacture",
  404:         label: "Statut facture",
  405:         field: "statutFacture",
  406:         type: "select",
  407:         options: [
  408:           { label: "Brouillon", value: "brouillon" },
  409:           { label: "Émise", value: "emise" },
  410:           { label: "Annulée", value: "annulee" },
  411:         ],
  412:       },
  413:       {
  414:         key: "clientId",
  415:         label: "Client",
  416:         field: "clientId",
  417:         type: "relation",
  418:       },
  419:     ],
  420:     table: {
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: envoyee :: line 166

```ts
  160:         grid: { cols: 6 },
  161:       },
  162: {
  163:         key: "statutEnvoiFacture",
  164:         label: "Statut envoi facture",
  165:         type: "select",
  166:         defaultValue: "non_envoyee",
  167:         options: [
  168:           { label: "Non envoyée", value: "non_envoyee" },
  169:           { label: "Envoyée", value: "envoyee" },
  170:           { label: "Échec envoi", value: "echec" },
  171:         ],
  172:         list: { visible: false },
  173:         grid: { cols: 4 },
  174:       },
  175: {
  176:         key: "dernierEnvoiFactureAt",
  177:         label: "Dernier envoi facture",
  178:         type: "datetime",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: envoyee :: line 168

```ts
  162: {
  163:         key: "statutEnvoiFacture",
  164:         label: "Statut envoi facture",
  165:         type: "select",
  166:         defaultValue: "non_envoyee",
  167:         options: [
  168:           { label: "Non envoyée", value: "non_envoyee" },
  169:           { label: "Envoyée", value: "envoyee" },
  170:           { label: "Échec envoi", value: "echec" },
  171:         ],
  172:         list: { visible: false },
  173:         grid: { cols: 4 },
  174:       },
  175: {
  176:         key: "dernierEnvoiFactureAt",
  177:         label: "Dernier envoi facture",
  178:         type: "datetime",
  179:         list: { visible: false },
  180:         grid: { cols: 4 },
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: envoyee :: line 169

```ts
  163:         key: "statutEnvoiFacture",
  164:         label: "Statut envoi facture",
  165:         type: "select",
  166:         defaultValue: "non_envoyee",
  167:         options: [
  168:           { label: "Non envoyée", value: "non_envoyee" },
  169:           { label: "Envoyée", value: "envoyee" },
  170:           { label: "Échec envoi", value: "echec" },
  171:         ],
  172:         list: { visible: false },
  173:         grid: { cols: 4 },
  174:       },
  175: {
  176:         key: "dernierEnvoiFactureAt",
  177:         label: "Dernier envoi facture",
  178:         type: "datetime",
  179:         list: { visible: false },
  180:         grid: { cols: 4 },
  181:       },
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: annulee :: line 56

```ts
   50:         label: "Statut facture",
   51:         type: "select",
   52:         defaultValue: "emise",
   53:         options: [
   54:           { label: "Brouillon", value: "brouillon" },
   55:           { label: "Émise", value: "emise" },
   56:           { label: "Annulée", value: "annulee" },
   57:         ],
   58:         list: { visible: false },
   59:         grid: { cols: 4 },
   60:       },
   61: {
   62:         key: "statutPaiement",
   63:         label: "Statut paiement",
   64:         type: "select",
   65:         defaultValue: "en_attente",
   66:         options: [
   67:           { label: "En attente", value: "en_attente" },
   68:           { label: "Partiel", value: "partiel" },
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: annulee :: line 382

```ts
  376:         field: "statutPaiement",
  377:         equals: "paye",
  378:         tone: "green",
  379:         icon: "check",
  380:       },
  381:       {
  382:         key: "annulees",
  383:         label: "Annulées",
  384:         field: "statutFacture",
  385:         equals: "annulee",
  386:         tone: "gray",
  387:         icon: "x",
  388:       },
  389:     ],
  390:     filters: [
  391:       {
  392:         key: "statutPaiement",
  393:         label: "Statut paiement",
  394:         field: "statutPaiement",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: annulee :: line 385

```ts
  379:         icon: "check",
  380:       },
  381:       {
  382:         key: "annulees",
  383:         label: "Annulées",
  384:         field: "statutFacture",
  385:         equals: "annulee",
  386:         tone: "gray",
  387:         icon: "x",
  388:       },
  389:     ],
  390:     filters: [
  391:       {
  392:         key: "statutPaiement",
  393:         label: "Statut paiement",
  394:         field: "statutPaiement",
  395:         type: "select",
  396:         options: [
  397:           { label: "En attente", value: "en_attente" },
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: annulee :: line 410

```ts
  404:         label: "Statut facture",
  405:         field: "statutFacture",
  406:         type: "select",
  407:         options: [
  408:           { label: "Brouillon", value: "brouillon" },
  409:           { label: "Émise", value: "emise" },
  410:           { label: "Annulée", value: "annulee" },
  411:         ],
  412:       },
  413:       {
  414:         key: "clientId",
  415:         label: "Client",
  416:         field: "clientId",
  417:         type: "relation",
  418:       },
  419:     ],
  420:     table: {
  421:       enableSearch: true,
  422:       enableSelection: true,
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: payee :: line 374

```ts
  368:         field: "statutPaiement",
  369:         equals: "partiel",
  370:         tone: "purple",
  371:         icon: "activity",
  372:       },
  373:       {
  374:         key: "payees",
  375:         label: "Payées",
  376:         field: "statutPaiement",
  377:         equals: "paye",
  378:         tone: "green",
  379:         icon: "check",
  380:       },
  381:       {
  382:         key: "annulees",
  383:         label: "Annulées",
  384:         field: "statutFacture",
  385:         equals: "annulee",
  386:         tone: "gray",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: statutFacture :: line 49

```ts
   43:         required: true,
   44:         unique: true,
   45:         list: { visible: true, order: 4 },
   46:         grid: { cols: 4 },
   47:       },
   48: {
   49:         key: "statutFacture",
   50:         label: "Statut facture",
   51:         type: "select",
   52:         defaultValue: "emise",
   53:         options: [
   54:           { label: "Brouillon", value: "brouillon" },
   55:           { label: "Émise", value: "emise" },
   56:           { label: "Annulée", value: "annulee" },
   57:         ],
   58:         list: { visible: false },
   59:         grid: { cols: 4 },
   60:       },
   61: {
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: statutFacture :: line 230

```ts
  224:       {
  225:         key: "facture",
  226:         label: "Facture",
  227:         fields: [
  228:           "numeroFacture",
  229:           "dateFacture",
  230:           "statutFacture",
  231:           "statutPaiement",
  232:           "modePaiement",
  233:         ],
  234:         sections: [
  235:           {
  236:             key: "infos",
  237:             title: "Informations facture",
  238:             fields: [
  239:               "numeroFacture",
  240:               "dateFacture",
  241:               "statutFacture",
  242:               "statutPaiement",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: statutFacture :: line 241

```ts
  235:           {
  236:             key: "infos",
  237:             title: "Informations facture",
  238:             fields: [
  239:               "numeroFacture",
  240:               "dateFacture",
  241:               "statutFacture",
  242:               "statutPaiement",
  243:               "modePaiement",
  244:             ],
  245:           },
  246:         ],
  247:       },
  248: 
  249:       {
  250:         key: "relations",
  251:         label: "Relations",
  252:         fields: [
  253:           "clientId",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: statutFacture :: line 384

```ts
  378:         tone: "green",
  379:         icon: "check",
  380:       },
  381:       {
  382:         key: "annulees",
  383:         label: "Annulées",
  384:         field: "statutFacture",
  385:         equals: "annulee",
  386:         tone: "gray",
  387:         icon: "x",
  388:       },
  389:     ],
  390:     filters: [
  391:       {
  392:         key: "statutPaiement",
  393:         label: "Statut paiement",
  394:         field: "statutPaiement",
  395:         type: "select",
  396:         options: [
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: statutFacture :: line 403

```ts
  397:           { label: "En attente", value: "en_attente" },
  398:           { label: "Partiel", value: "partiel" },
  399:           { label: "Payé", value: "paye" },
  400:         ],
  401:       },
  402:       {
  403:         key: "statutFacture",
  404:         label: "Statut facture",
  405:         field: "statutFacture",
  406:         type: "select",
  407:         options: [
  408:           { label: "Brouillon", value: "brouillon" },
  409:           { label: "Émise", value: "emise" },
  410:           { label: "Annulée", value: "annulee" },
  411:         ],
  412:       },
  413:       {
  414:         key: "clientId",
  415:         label: "Client",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: montantTTC :: line 123

```ts
  117:         type: "number",
  118:         defaultValue: 18,
  119:         list: { visible: false },
  120:         grid: { cols: 4 },
  121:       },
  122: {
  123:         key: "montantTTC",
  124:         label: "Montant TTC",
  125:         type: "number",
  126:         computed: {
  127:           formula: "montantHT + (montantHT * tva / 100)",
  128:           dependsOn: ["montantHT", "tva"],
  129:         },
  130:         list: { visible: true, order: 5 },
  131:         grid: { cols: 4 },
  132:       },
  133: {
  134:         key: "montantPaye",
  135:         label: "Montant payé",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: montantTTC :: line 276

```ts
  270:       {
  271:         key: "finance",
  272:         label: "Finance",
  273:         fields: [
  274:           "montantHT",
  275:           "tva",
  276:           "montantTTC",
  277:           "montantPaye",
  278:           "resteAPayer",
  279:         ],
  280:         sections: [
  281:           {
  282:             key: "couts",
  283:             title: "Montants",
  284:             fields: [
  285:               "montantHT",
  286:               "tva",
  287:               "montantTTC",
  288:               "montantPaye",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: montantTTC :: line 287

```ts
  281:           {
  282:             key: "couts",
  283:             title: "Montants",
  284:             fields: [
  285:               "montantHT",
  286:               "tva",
  287:               "montantTTC",
  288:               "montantPaye",
  289:               "resteAPayer",
  290:             ],
  291:           },
  292:         ],
  293:       },
  294: 
  295:       {
  296:         key: "envoi",
  297:         label: "Envoi",
  298:         fields: [
  299:           "statutEnvoiFacture",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: montantTTC :: line 429

```ts
  423:       enableDensityToggle: true,
  424:       fields: [
  425:         "numeroFacture",
  426:         "dateFacture",
  427:         "clientId",
  428:         "vehiculeId",
  429:         "montantTTC",
  430:         "statut",
  431:       ],
  432:       relationLabelFields: {
  433:         clientId: [
  434:           "nom",
  435:           "prenom",
  436:           "telephone",
  437:         ],
  438:         vehiculeId: [
  439:           "marque",
  440:           "modele",
  441:           "immatriculation",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: montantTTC :: line 475

```ts
  469:           format: "number",
  470:         },
  471:         {
  472:           key: "montant_ttc",
  473:           label: "Montant TTC",
  474:           type: "sum",
  475:           field: "montantTTC",
  476:           format: "currency",
  477:           currency: "FCFA",
  478:         },
  479:         {
  480:           key: "reste_a_payer",
  481:           label: "Reste à payer",
  482:           type: "sum",
  483:           field: "resteAPayer",
  484:           format: "currency",
  485:           currency: "FCFA",
  486:         },
  487:       ],
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: montantPaye :: line 134

```ts
  128:           dependsOn: ["montantHT", "tva"],
  129:         },
  130:         list: { visible: true, order: 5 },
  131:         grid: { cols: 4 },
  132:       },
  133: {
  134:         key: "montantPaye",
  135:         label: "Montant payé",
  136:         type: "number",
  137:         defaultValue: 0,
  138:         list: { visible: false },
  139:         grid: { cols: 4 },
  140:       },
  141: {
  142:         key: "resteAPayer",
  143:         label: "Reste à payer",
  144:         type: "number",
  145:         defaultValue: 0,
  146:         list: { visible: true, order: 6 },
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: montantPaye :: line 277

```ts
  271:         key: "finance",
  272:         label: "Finance",
  273:         fields: [
  274:           "montantHT",
  275:           "tva",
  276:           "montantTTC",
  277:           "montantPaye",
  278:           "resteAPayer",
  279:         ],
  280:         sections: [
  281:           {
  282:             key: "couts",
  283:             title: "Montants",
  284:             fields: [
  285:               "montantHT",
  286:               "tva",
  287:               "montantTTC",
  288:               "montantPaye",
  289:               "resteAPayer",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: montantPaye :: line 288

```ts
  282:             key: "couts",
  283:             title: "Montants",
  284:             fields: [
  285:               "montantHT",
  286:               "tva",
  287:               "montantTTC",
  288:               "montantPaye",
  289:               "resteAPayer",
  290:             ],
  291:           },
  292:         ],
  293:       },
  294: 
  295:       {
  296:         key: "envoi",
  297:         label: "Envoi",
  298:         fields: [
  299:           "statutEnvoiFacture",
  300:           "dernierEnvoiFactureAt",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: montantPaye :: line 543

```ts
  537:       "interventionId",
  538:     ],
  539: 
  540:     readOnlyFields: [
  541:       "statutPaiement",
  542:       "montantTTC",
  543:       "montantPaye",
  544:       "resteAPayer",
  545:       "dernierEnvoiFactureAt",
  546:       "canalDernierEnvoiFacture",
  547:       "destinataireDernierEnvoiFacture",
  548:       "nombreEnvoisFacture",
  549:     ],
  550: 
  551:     children: [
  552:       {
  553:         key: "encaissements-facture",
  554:         moduleKey: "encaissementsauto",
  555:         foreignKey: "factureId",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: montantPaye :: line 597

```ts
  591:         displayIn: ["detail", "edit"],
  592:         lazy: true,
  593:         position: "after",
  594:         allowCreate: true,
  595:         createLabel: "Ajouter une échéance",
  596:         openLabel: "Ouvrir échéance",
  597:         labelFields: ["montantPrevu", "montantPaye", "dateEcheance", "statut"],
  598:         subtitleFields: ["clientId", "vehiculeId", "canalRelance"],
  599:         totalField: "montantPrevu",
  600:         prefillFromParent: {
  601:           clientId: "clientId",
  602:           vehiculeId: "vehiculeId",
  603:         },
  604:         lockFields: ["factureId", "clientId", "vehiculeId"],
  605:         relations: [
  606:           {
  607:             field: "clientId",
  608:             moduleKey: "clientsauto",
  609:             labelFields: ["prenom", "nom", "telephone"],
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: resteAPayer :: line 142

```ts
  136:         type: "number",
  137:         defaultValue: 0,
  138:         list: { visible: false },
  139:         grid: { cols: 4 },
  140:       },
  141: {
  142:         key: "resteAPayer",
  143:         label: "Reste à payer",
  144:         type: "number",
  145:         defaultValue: 0,
  146:         list: { visible: true, order: 6 },
  147:         grid: { cols: 4 },
  148:       },
  149: {
  150:         key: "modePaiement",
  151:         label: "Mode paiement",
  152:         type: "select",
  153:         options: [
  154:           { label: "Espèces", value: "especes" },
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: resteAPayer :: line 278

```ts
  272:         label: "Finance",
  273:         fields: [
  274:           "montantHT",
  275:           "tva",
  276:           "montantTTC",
  277:           "montantPaye",
  278:           "resteAPayer",
  279:         ],
  280:         sections: [
  281:           {
  282:             key: "couts",
  283:             title: "Montants",
  284:             fields: [
  285:               "montantHT",
  286:               "tva",
  287:               "montantTTC",
  288:               "montantPaye",
  289:               "resteAPayer",
  290:             ],
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: resteAPayer :: line 289

```ts
  283:             title: "Montants",
  284:             fields: [
  285:               "montantHT",
  286:               "tva",
  287:               "montantTTC",
  288:               "montantPaye",
  289:               "resteAPayer",
  290:             ],
  291:           },
  292:         ],
  293:       },
  294: 
  295:       {
  296:         key: "envoi",
  297:         label: "Envoi",
  298:         fields: [
  299:           "statutEnvoiFacture",
  300:           "dernierEnvoiFactureAt",
  301:           "canalDernierEnvoiFacture",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: resteAPayer :: line 483

```ts
  477:           currency: "FCFA",
  478:         },
  479:         {
  480:           key: "reste_a_payer",
  481:           label: "Reste à payer",
  482:           type: "sum",
  483:           field: "resteAPayer",
  484:           format: "currency",
  485:           currency: "FCFA",
  486:         },
  487:       ],
  488:     },
  489:   },
  490: 
  491: 
  492:   composition: {
  493:     // Q21E_C_BILLING_RELATIONSHIP_COMPOSITION
  494:     // Facture knows its payments and payment schedules.
  495:     labelFields: ["numeroFacture", "clientId", "montantTTC", "resteAPayer", "statutPaiement"],
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: resteAPayer :: line 495

```ts
  489:   },
  490: 
  491: 
  492:   composition: {
  493:     // Q21E_C_BILLING_RELATIONSHIP_COMPOSITION
  494:     // Facture knows its payments and payment schedules.
  495:     labelFields: ["numeroFacture", "clientId", "montantTTC", "resteAPayer", "statutPaiement"],
  496: 
  497:     contextBanner: {
  498:       title: "Contexte facture",
  499:       items: [
  500:         {
  501:           relationField: "clientId",
  502:           moduleKey: "clientsauto",
  503:           labelFields: [
  504:             "prenom",
  505:             "nom",
  506:             "telephone",
  507:           ],
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: clientId :: line 75

```ts
   69:           { label: "Payé", value: "paye" },
   70:         ],
   71:         list: { visible: true, order: 7 },
   72:         grid: { cols: 4 },
   73:       },
   74: {
   75:         key: "clientId",
   76:         label: "Client",
   77:         type: "relation",
   78:         relation: {
   79:           module: "clientsauto",
   80:         },
   81:         searchable: true,
   82:         list: { visible: true, order: 2 },
   83:         grid: { cols: 6 },
   84:       },
   85: {
   86:         key: "vehiculeId",
   87:         label: "Véhicule",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: clientId :: line 253

```ts
  247:       },
  248: 
  249:       {
  250:         key: "relations",
  251:         label: "Relations",
  252:         fields: [
  253:           "clientId",
  254:           "vehiculeId",
  255:           "interventionId",
  256:         ],
  257:         sections: [
  258:           {
  259:             key: "liens",
  260:             title: "Relations métier",
  261:             fields: [
  262:               "clientId",
  263:               "vehiculeId",
  264:               "interventionId",
  265:             ],
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: clientId :: line 262

```ts
  256:         ],
  257:         sections: [
  258:           {
  259:             key: "liens",
  260:             title: "Relations métier",
  261:             fields: [
  262:               "clientId",
  263:               "vehiculeId",
  264:               "interventionId",
  265:             ],
  266:           },
  267:         ],
  268:       },
  269: 
  270:       {
  271:         key: "finance",
  272:         label: "Finance",
  273:         fields: [
  274:           "montantHT",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: clientId :: line 414

```ts
  408:           { label: "Brouillon", value: "brouillon" },
  409:           { label: "Émise", value: "emise" },
  410:           { label: "Annulée", value: "annulee" },
  411:         ],
  412:       },
  413:       {
  414:         key: "clientId",
  415:         label: "Client",
  416:         field: "clientId",
  417:         type: "relation",
  418:       },
  419:     ],
  420:     table: {
  421:       enableSearch: true,
  422:       enableSelection: true,
  423:       enableDensityToggle: true,
  424:       fields: [
  425:         "numeroFacture",
  426:         "dateFacture",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: clientId :: line 416

```ts
  410:           { label: "Annulée", value: "annulee" },
  411:         ],
  412:       },
  413:       {
  414:         key: "clientId",
  415:         label: "Client",
  416:         field: "clientId",
  417:         type: "relation",
  418:       },
  419:     ],
  420:     table: {
  421:       enableSearch: true,
  422:       enableSelection: true,
  423:       enableDensityToggle: true,
  424:       fields: [
  425:         "numeroFacture",
  426:         "dateFacture",
  427:         "clientId",
  428:         "vehiculeId",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: vehiculeId :: line 86

```ts
   80:         },
   81:         searchable: true,
   82:         list: { visible: true, order: 2 },
   83:         grid: { cols: 6 },
   84:       },
   85: {
   86:         key: "vehiculeId",
   87:         label: "Véhicule",
   88:         type: "relation",
   89:         relation: {
   90:           module: "vehicules",
   91:         },
   92:         searchable: true,
   93:         list: { visible: true, order: 3 },
   94:         grid: { cols: 6 },
   95:       },
   96: {
   97:         key: "interventionId",
   98:         label: "Intervention",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: vehiculeId :: line 254

```ts
  248: 
  249:       {
  250:         key: "relations",
  251:         label: "Relations",
  252:         fields: [
  253:           "clientId",
  254:           "vehiculeId",
  255:           "interventionId",
  256:         ],
  257:         sections: [
  258:           {
  259:             key: "liens",
  260:             title: "Relations métier",
  261:             fields: [
  262:               "clientId",
  263:               "vehiculeId",
  264:               "interventionId",
  265:             ],
  266:           },
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: vehiculeId :: line 263

```ts
  257:         sections: [
  258:           {
  259:             key: "liens",
  260:             title: "Relations métier",
  261:             fields: [
  262:               "clientId",
  263:               "vehiculeId",
  264:               "interventionId",
  265:             ],
  266:           },
  267:         ],
  268:       },
  269: 
  270:       {
  271:         key: "finance",
  272:         label: "Finance",
  273:         fields: [
  274:           "montantHT",
  275:           "tva",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: vehiculeId :: line 428

```ts
  422:       enableSelection: true,
  423:       enableDensityToggle: true,
  424:       fields: [
  425:         "numeroFacture",
  426:         "dateFacture",
  427:         "clientId",
  428:         "vehiculeId",
  429:         "montantTTC",
  430:         "statut",
  431:       ],
  432:       relationLabelFields: {
  433:         clientId: [
  434:           "nom",
  435:           "prenom",
  436:           "telephone",
  437:         ],
  438:         vehiculeId: [
  439:           "marque",
  440:           "modele",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: vehiculeId :: line 438

```ts
  432:       relationLabelFields: {
  433:         clientId: [
  434:           "nom",
  435:           "prenom",
  436:           "telephone",
  437:         ],
  438:         vehiculeId: [
  439:           "marque",
  440:           "modele",
  441:           "immatriculation",
  442:         ],
  443:         interventionId: [
  444:           "dateIntervention",
  445:           "typeIntervention",
  446:           "statut",
  447:         ],
  448:       },
  449:       hiddenFields: [
  450:         "id",
```

## Prochaine passe

- Si `facturesauto.actions.ts` existe : ajouter les actions dans ce fichier.
- Si le module n'utilise pas de fichier actions : ajouter les actions au niveau racine du module.
- Ne pas toucher au formulaire.
- Ne pas utiliser `description` ou `visibleWhen` tant que `ERPModuleAction` ne les type pas.