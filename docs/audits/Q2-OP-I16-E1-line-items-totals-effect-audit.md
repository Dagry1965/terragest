# Q2-OP-I16-E1 — Audit effet totaux lignesinterventionauto

Objectif : vérifier si l’effet métier `totaux` existe déjà pour `lignesinterventionauto`, et s’il est détectable par les audits runtime.

## Résumé

- OK : 28
- WARN : 8
- WARN HIGH : 0
- FAIL : 0
- FAIL HIGH : 0

## Checks

| Area | Status | Severity | File | Lines | Message |
|---|---:|---:|---|---|---|
| file | OK | MEDIUM | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` |  | src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts found |
| file | OK | LOW | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.actions.ts` |  | src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.actions.ts found |
| file | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts found |
| file | OK | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx found |
| file | OK | MEDIUM | `src/runtime/line-items/RuntimeLineRemovalService.ts` |  | src/runtime/line-items/RuntimeLineRemovalService.ts found |
| file | OK | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` |  | src/runtime/business-rules/runtimeBusinessRules.ts found |
| file | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` |  | src/runtime/actions/RuntimeActionEngine.ts found |
| line-module-fields | OK | LOW | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 28, 232, 256, 318, 356, 368, 380, 420 | interventionId found |
| line-module-fields | OK | LOW | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 169, 247, 284, 429, 444 | montantTotal found |
| line-module-fields | OK | LOW | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 151, 244, 281, 426, 441 | montantHT found |
| line-module-fields | OK | LOW | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 163, 246, 283, 428, 443 | montantTTC found |
| line-module-fields | OK | LOW | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 119, 173, 174, 240, 277, 342 | quantite found |
| line-module-fields | OK | LOW | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 49, 49, 49, 50, 50, 50, 128, 137, 173, 174, 241, 242, 278, 279, 424, 439 | prixUnitaire found |
| intervention-module-totals | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 121, 209, 219, 325, 379, 523 | coutTotal found |
| intervention-module-totals | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 107, 207, 217, 521 | coutPieces found |
| intervention-module-totals | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 114, 208, 218, 522 | coutMainOeuvre found |
| form-total-sync | OK | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 274, 1387 | syncInterventionTotalsFromLines found |
| form-total-sync | OK | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1376 | AMARKHYS_SYNC_INTERVENTION_TOTALS_AFTER_SAVE found |
| form-total-sync | OK | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 344, 356 | coutTotal found |
| line-removal-totals | OK | MEDIUM | `src/runtime/line-items/RuntimeLineRemovalService.ts` | 75 | RuntimeLineRemovalService found |
| line-removal-totals | WARN | MEDIUM | `src/runtime/line-items/RuntimeLineRemovalService.ts` |  | recompute not found |
| line-removal-totals | WARN | MEDIUM | `src/runtime/line-items/RuntimeLineRemovalService.ts` |  | total not found |
| line-removal-totals | WARN | MEDIUM | `src/runtime/line-items/RuntimeLineRemovalService.ts` |  | totaux not found |
| line-removal-totals | WARN | MEDIUM | `src/runtime/line-items/RuntimeLineRemovalService.ts` |  | coutTotal not found |
| line-removal-totals | OK | MEDIUM | `src/runtime/line-items/RuntimeLineRemovalService.ts` | 126, 126, 163, 164 | interventionId found |
| runtime-rules-totals | WARN | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` |  | lignesinterventionauto not found |
| runtime-rules-totals | OK | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` | 133, 136, 251, 303, 352, 427, 464, 513, 588, 613, 616, 649, 852, 1021, 1270 | interventionsauto found |
| runtime-rules-totals | OK | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` | 230, 722, 1096, 1345 | coutTotal found |
| runtime-rules-totals | WARN | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` |  | totaux not found |
| runtime-rules-totals | OK | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` | 230, 722, 1088, 1089, 1090, 1096, 1157, 1158, 1337, 1338, 1339, 1345, 1406, 1407 | total found |
| action-engine-line-actions | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | 146 | retirer-ligne found |
| action-engine-line-actions | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | 145 | lignesinterventionauto found |
| action-engine-line-actions | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | 149, 169 | RuntimeLineRemovalService found |
| action-engine-line-actions | WARN | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` |  | totaux not found |
| action-engine-line-actions | WARN | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` |  | coutTotal not found |
| business-effect-detection | OK | HIGH |  |  | lignesinterventionauto totals effect detected across runtime files |

## Contextes utiles

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: interventionId :: line 28

```ts
   22: 
   23:   schema: {
   24:     collection: "lignesinterventionauto",
   25: 
   26:     fields: [
   27:       {
   28:         key: "interventionId",
   29:         label: "Intervention",
   30:         type: "relation",
   31:         relation: { module: "interventionsauto" },
   32:         required: true,
   33:         searchable: true,
   34:         list: { order: 1 },
   35:         grid: { cols: 6 },
   36:       },
   37:       {
   38:         key: "produitId",
   39:         label: "Produit / pièce",
   40:         type: "relation",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: interventionId :: line 232

```ts
  226:     tabs: [
  227:       {
  228:         key: "ligne",
  229:         label: "Ligne",
  230: 
  231:         fields: [
  232:           "interventionId",
  233:           "designation",
  234:           "typeLigne",
  235:           "produitId",
  236:           "stockId",
  237:           "produitCode",
  238:           "produitNom",
  239:           "typeArticle",
  240:           "quantite",
  241:           "prixUnitaire",
  242:           "prixUnitaireHT",
  243:           "tauxTVA",
  244:           "montantHT",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: interventionId :: line 256

```ts
  250: 
  251:         sections: [
  252:           {
  253:             key: "infos",
  254:             title: "Informations ligne",
  255:             fields: [
  256:               "interventionId",
  257:               "designation",
  258:               "typeLigne",
  259:               "statut",
  260:             ],
  261:           },
  262:           {
  263:             key: "relations",
  264:             title: "Produit et stock",
  265:             fields: [
  266:               "produitId",
  267:               "stockId",
  268:               "produitCode",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: interventionId :: line 318

```ts
  312: 
  313:   composition: {
  314:     contextBanner: {
  315:       title: "Contexte ligne intervention",
  316:       items: [
  317:         {
  318:           relationField: "interventionId",
  319:           moduleKey: "interventionsauto",
  320:           labelFields: [
  321:             "typeIntervention",
  322:             "dateIntervention",
  323:             "statut",
  324:           ],
  325:           tone: "workshop",
  326:         },
  327:         {
  328:           relationField: "produitId",
  329:           moduleKey: "produitsauto",
  330:           labelFields: [
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: interventionId :: line 356

```ts
  350:     // Q15F_B_REQUIRED_PARENT_CONTEXT
  351:     // Une ligne d'intervention doit toujours être créée dans le contexte d'une intervention parente.
  352:     requiresParentContext: true,
  353:     allowedParents: [
  354:       {
  355:         moduleKey: "interventionsauto",
  356:         foreignKey: "interventionId",
  357:       },
  358:     ],
  359: 
  360:     labelFields: [
  361:       "designation",
  362:       "typeLigne",
  363:       "statut",
  364:     ],
  365: 
  366:     breadcrumbs: [
  367:       {
  368:         field: "interventionId",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantTotal :: line 169

```ts
  163:         key: "montantTTC",
  164:         label: "Montant TTC",
  165:         type: "number",
  166:         grid: { cols: 4 },
  167:       },
  168:       {
  169:         key: "montantTotal",
  170:         label: "Montant total",
  171:         type: "number",
  172:         computed: {
  173:           formula: "quantite * prixUnitaire",
  174:           dependsOn: ["quantite", "prixUnitaire"],
  175:         },
  176:         list: { order: 7 },
  177:         grid: { cols: 4 },
  178:       },
  179:       {
  180:         key: "statut",
  181:         label: "Statut",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantTotal :: line 247

```ts
  241:           "prixUnitaire",
  242:           "prixUnitaireHT",
  243:           "tauxTVA",
  244:           "montantHT",
  245:           "montantTVA",
  246:           "montantTTC",
  247:           "montantTotal",
  248:           "statut",
  249:         ],
  250: 
  251:         sections: [
  252:           {
  253:             key: "infos",
  254:             title: "Informations ligne",
  255:             fields: [
  256:               "interventionId",
  257:               "designation",
  258:               "typeLigne",
  259:               "statut",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantTotal :: line 284

```ts
  278:               "prixUnitaire",
  279:               "prixUnitaireHT",
  280:               "tauxTVA",
  281:               "montantHT",
  282:               "montantTVA",
  283:               "montantTTC",
  284:               "montantTotal",
  285:             ],
  286:           },
  287:         ],
  288:       },
  289: 
  290:       {
  291:         key: "notes",
  292:         label: "Notes",
  293: 
  294:         fields: [
  295:           "observations",
  296:         ],
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantTotal :: line 429

```ts
  423:       "typeArticle",
  424:       "prixUnitaireHT",
  425:       "tauxTVA",
  426:       "montantHT",
  427:       "montantTVA",
  428:       "montantTTC",
  429:       "montantTotal",
  430:       "stockMovementId",
  431:       "stockProcessedAt",
  432:       "stockProcessedQuantity",
  433:     ],
  434: 
  435:     readOnlyFields: [
  436:       "produitCode",
  437:       "produitNom",
  438:       "typeArticle",
  439:       "prixUnitaireHT",
  440:       "tauxTVA",
  441:       "montantHT",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantTotal :: line 444

```ts
  438:       "typeArticle",
  439:       "prixUnitaireHT",
  440:       "tauxTVA",
  441:       "montantHT",
  442:       "montantTVA",
  443:       "montantTTC",
  444:       "montantTotal",
  445:       "stockMovementId",
  446:       "stockProcessedAt",
  447:       "stockProcessedQuantity",
  448:     ],
  449:   },
  450: 
  451:   actions: [
  452:     {
  453:       key: "retirer-ligne",
  454:       label: "Retirer la ligne",
  455:       type: "danger",
  456:       runtimeOnly: true,
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantHT :: line 151

```ts
  145:         label: "TVA (%)",
  146:         type: "number",
  147:         defaultValue: 18,
  148:         grid: { cols: 4 },
  149:       },
  150:       {
  151:         key: "montantHT",
  152:         label: "Montant HT",
  153:         type: "number",
  154:         grid: { cols: 4 },
  155:       },
  156:       {
  157:         key: "montantTVA",
  158:         label: "Montant TVA",
  159:         type: "number",
  160:         grid: { cols: 4 },
  161:       },
  162:       {
  163:         key: "montantTTC",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantHT :: line 244

```ts
  238:           "produitNom",
  239:           "typeArticle",
  240:           "quantite",
  241:           "prixUnitaire",
  242:           "prixUnitaireHT",
  243:           "tauxTVA",
  244:           "montantHT",
  245:           "montantTVA",
  246:           "montantTTC",
  247:           "montantTotal",
  248:           "statut",
  249:         ],
  250: 
  251:         sections: [
  252:           {
  253:             key: "infos",
  254:             title: "Informations ligne",
  255:             fields: [
  256:               "interventionId",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantHT :: line 281

```ts
  275:             title: "Quantité et montant",
  276:             fields: [
  277:               "quantite",
  278:               "prixUnitaire",
  279:               "prixUnitaireHT",
  280:               "tauxTVA",
  281:               "montantHT",
  282:               "montantTVA",
  283:               "montantTTC",
  284:               "montantTotal",
  285:             ],
  286:           },
  287:         ],
  288:       },
  289: 
  290:       {
  291:         key: "notes",
  292:         label: "Notes",
  293: 
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantHT :: line 426

```ts
  420:       "interventionId",
  421:       "produitCode",
  422:       "produitNom",
  423:       "typeArticle",
  424:       "prixUnitaireHT",
  425:       "tauxTVA",
  426:       "montantHT",
  427:       "montantTVA",
  428:       "montantTTC",
  429:       "montantTotal",
  430:       "stockMovementId",
  431:       "stockProcessedAt",
  432:       "stockProcessedQuantity",
  433:     ],
  434: 
  435:     readOnlyFields: [
  436:       "produitCode",
  437:       "produitNom",
  438:       "typeArticle",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantHT :: line 441

```ts
  435:     readOnlyFields: [
  436:       "produitCode",
  437:       "produitNom",
  438:       "typeArticle",
  439:       "prixUnitaireHT",
  440:       "tauxTVA",
  441:       "montantHT",
  442:       "montantTVA",
  443:       "montantTTC",
  444:       "montantTotal",
  445:       "stockMovementId",
  446:       "stockProcessedAt",
  447:       "stockProcessedQuantity",
  448:     ],
  449:   },
  450: 
  451:   actions: [
  452:     {
  453:       key: "retirer-ligne",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantTTC :: line 163

```ts
  157:         key: "montantTVA",
  158:         label: "Montant TVA",
  159:         type: "number",
  160:         grid: { cols: 4 },
  161:       },
  162:       {
  163:         key: "montantTTC",
  164:         label: "Montant TTC",
  165:         type: "number",
  166:         grid: { cols: 4 },
  167:       },
  168:       {
  169:         key: "montantTotal",
  170:         label: "Montant total",
  171:         type: "number",
  172:         computed: {
  173:           formula: "quantite * prixUnitaire",
  174:           dependsOn: ["quantite", "prixUnitaire"],
  175:         },
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantTTC :: line 246

```ts
  240:           "quantite",
  241:           "prixUnitaire",
  242:           "prixUnitaireHT",
  243:           "tauxTVA",
  244:           "montantHT",
  245:           "montantTVA",
  246:           "montantTTC",
  247:           "montantTotal",
  248:           "statut",
  249:         ],
  250: 
  251:         sections: [
  252:           {
  253:             key: "infos",
  254:             title: "Informations ligne",
  255:             fields: [
  256:               "interventionId",
  257:               "designation",
  258:               "typeLigne",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantTTC :: line 283

```ts
  277:               "quantite",
  278:               "prixUnitaire",
  279:               "prixUnitaireHT",
  280:               "tauxTVA",
  281:               "montantHT",
  282:               "montantTVA",
  283:               "montantTTC",
  284:               "montantTotal",
  285:             ],
  286:           },
  287:         ],
  288:       },
  289: 
  290:       {
  291:         key: "notes",
  292:         label: "Notes",
  293: 
  294:         fields: [
  295:           "observations",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantTTC :: line 428

```ts
  422:       "produitNom",
  423:       "typeArticle",
  424:       "prixUnitaireHT",
  425:       "tauxTVA",
  426:       "montantHT",
  427:       "montantTVA",
  428:       "montantTTC",
  429:       "montantTotal",
  430:       "stockMovementId",
  431:       "stockProcessedAt",
  432:       "stockProcessedQuantity",
  433:     ],
  434: 
  435:     readOnlyFields: [
  436:       "produitCode",
  437:       "produitNom",
  438:       "typeArticle",
  439:       "prixUnitaireHT",
  440:       "tauxTVA",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: montantTTC :: line 443

```ts
  437:       "produitNom",
  438:       "typeArticle",
  439:       "prixUnitaireHT",
  440:       "tauxTVA",
  441:       "montantHT",
  442:       "montantTVA",
  443:       "montantTTC",
  444:       "montantTotal",
  445:       "stockMovementId",
  446:       "stockProcessedAt",
  447:       "stockProcessedQuantity",
  448:     ],
  449:   },
  450: 
  451:   actions: [
  452:     {
  453:       key: "retirer-ligne",
  454:       label: "Retirer la ligne",
  455:       type: "danger",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: quantite :: line 119

```ts
  113:           { label: "Remise", value: "remise" },
  114:         ],
  115:         list: { order: 4 },
  116:         grid: { cols: 4 },
  117:       },
  118:       {
  119:         key: "quantite",
  120:         label: "Quantité",
  121:         type: "number",
  122:         defaultValue: 1,
  123:         required: true,
  124:         list: { order: 5 },
  125:         grid: { cols: 4 },
  126:       },
  127:       {
  128:         key: "prixUnitaire",
  129:         label: "Prix unitaire",
  130:         type: "number",
  131:         defaultValue: 0,
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: quantite :: line 173

```ts
  167:       },
  168:       {
  169:         key: "montantTotal",
  170:         label: "Montant total",
  171:         type: "number",
  172:         computed: {
  173:           formula: "quantite * prixUnitaire",
  174:           dependsOn: ["quantite", "prixUnitaire"],
  175:         },
  176:         list: { order: 7 },
  177:         grid: { cols: 4 },
  178:       },
  179:       {
  180:         key: "statut",
  181:         label: "Statut",
  182:         type: "select",
  183:         defaultValue: "brouillon",
  184:         // Q20H3_SIMPLIFIED_LINE_STATUSES
  185:         // Côté utilisateur, une ligne est seulement préparée ou confirmée.
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: quantite :: line 174

```ts
  168:       {
  169:         key: "montantTotal",
  170:         label: "Montant total",
  171:         type: "number",
  172:         computed: {
  173:           formula: "quantite * prixUnitaire",
  174:           dependsOn: ["quantite", "prixUnitaire"],
  175:         },
  176:         list: { order: 7 },
  177:         grid: { cols: 4 },
  178:       },
  179:       {
  180:         key: "statut",
  181:         label: "Statut",
  182:         type: "select",
  183:         defaultValue: "brouillon",
  184:         // Q20H3_SIMPLIFIED_LINE_STATUSES
  185:         // Côté utilisateur, une ligne est seulement préparée ou confirmée.
  186:         // Facturation/retrait sont gérés par relations/actions runtime, pas par statut manuel.
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: quantite :: line 240

```ts
  234:           "typeLigne",
  235:           "produitId",
  236:           "stockId",
  237:           "produitCode",
  238:           "produitNom",
  239:           "typeArticle",
  240:           "quantite",
  241:           "prixUnitaire",
  242:           "prixUnitaireHT",
  243:           "tauxTVA",
  244:           "montantHT",
  245:           "montantTVA",
  246:           "montantTTC",
  247:           "montantTotal",
  248:           "statut",
  249:         ],
  250: 
  251:         sections: [
  252:           {
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: quantite :: line 277

```ts
  271:             ],
  272:           },
  273:           {
  274:             key: "montants",
  275:             title: "Quantité et montant",
  276:             fields: [
  277:               "quantite",
  278:               "prixUnitaire",
  279:               "prixUnitaireHT",
  280:               "tauxTVA",
  281:               "montantHT",
  282:               "montantTVA",
  283:               "montantTTC",
  284:               "montantTotal",
  285:             ],
  286:           },
  287:         ],
  288:       },
  289: 
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: prixUnitaire :: line 49

```ts
   43:           map: {
   44:             produitCode: ["code", "reference"],
   45:             produitNom: ["nom", "designation"],
   46:             designation: ["nom", "designation"],
   47:             typeArticle: ["typeArticle"],
   48:             typeLigne: ["typeArticle"],
   49:             prixUnitaireHT: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
   50:             prixUnitaire: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
   51:             tauxTVA: ["tauxTVA"],
   52:           },
   53:           recalculate: true,
   54:         },
   55:         searchable: true,
   56:         list: { order: 2 },
   57:         grid: { cols: 6 },
   58:       },
   59:       {
   60:         key: "stockId",
   61:         label: "Stock source",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: prixUnitaire :: line 49

```ts
   43:           map: {
   44:             produitCode: ["code", "reference"],
   45:             produitNom: ["nom", "designation"],
   46:             designation: ["nom", "designation"],
   47:             typeArticle: ["typeArticle"],
   48:             typeLigne: ["typeArticle"],
   49:             prixUnitaireHT: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
   50:             prixUnitaire: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
   51:             tauxTVA: ["tauxTVA"],
   52:           },
   53:           recalculate: true,
   54:         },
   55:         searchable: true,
   56:         list: { order: 2 },
   57:         grid: { cols: 6 },
   58:       },
   59:       {
   60:         key: "stockId",
   61:         label: "Stock source",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: prixUnitaire :: line 49

```ts
   43:           map: {
   44:             produitCode: ["code", "reference"],
   45:             produitNom: ["nom", "designation"],
   46:             designation: ["nom", "designation"],
   47:             typeArticle: ["typeArticle"],
   48:             typeLigne: ["typeArticle"],
   49:             prixUnitaireHT: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
   50:             prixUnitaire: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
   51:             tauxTVA: ["tauxTVA"],
   52:           },
   53:           recalculate: true,
   54:         },
   55:         searchable: true,
   56:         list: { order: 2 },
   57:         grid: { cols: 6 },
   58:       },
   59:       {
   60:         key: "stockId",
   61:         label: "Stock source",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: prixUnitaire :: line 50

```ts
   44:             produitCode: ["code", "reference"],
   45:             produitNom: ["nom", "designation"],
   46:             designation: ["nom", "designation"],
   47:             typeArticle: ["typeArticle"],
   48:             typeLigne: ["typeArticle"],
   49:             prixUnitaireHT: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
   50:             prixUnitaire: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
   51:             tauxTVA: ["tauxTVA"],
   52:           },
   53:           recalculate: true,
   54:         },
   55:         searchable: true,
   56:         list: { order: 2 },
   57:         grid: { cols: 6 },
   58:       },
   59:       {
   60:         key: "stockId",
   61:         label: "Stock source",
   62:         type: "relation",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: prixUnitaire :: line 50

```ts
   44:             produitCode: ["code", "reference"],
   45:             produitNom: ["nom", "designation"],
   46:             designation: ["nom", "designation"],
   47:             typeArticle: ["typeArticle"],
   48:             typeLigne: ["typeArticle"],
   49:             prixUnitaireHT: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
   50:             prixUnitaire: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
   51:             tauxTVA: ["tauxTVA"],
   52:           },
   53:           recalculate: true,
   54:         },
   55:         searchable: true,
   56:         list: { order: 2 },
   57:         grid: { cols: 6 },
   58:       },
   59:       {
   60:         key: "stockId",
   61:         label: "Stock source",
   62:         type: "relation",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: coutTotal :: line 121

```ts
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: coutTotal :: line 209

```ts
  203:         key: "couts",
  204:         label: "Coûts",
  205: 
  206:         fields: [
  207:           "coutPieces",
  208:           "coutMainOeuvre",
  209:           "coutTotal",
  210:         ],
  211: 
  212:         sections: [
  213:           {
  214:             key: "financier",
  215:             title: "Coûts intervention",
  216:             fields: [
  217:               "coutPieces",
  218:               "coutMainOeuvre",
  219:               "coutTotal",
  220:             ],
  221:           },
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: coutTotal :: line 219

```ts
  213:           {
  214:             key: "financier",
  215:             title: "Coûts intervention",
  216:             fields: [
  217:               "coutPieces",
  218:               "coutMainOeuvre",
  219:               "coutTotal",
  220:             ],
  221:           },
  222:         ],
  223:       },
  224:     ],
  225:   },
  226: 
  227: 
  228:   operational: {
  229:     enabled: true,
  230:     title: "Interventions",
  231:     subtitle: "Vue opérationnelle des interventions atelier.",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: coutTotal :: line 325

```ts
  319:       fields: [
  320:         "clientId",
  321:         "vehiculeId",
  322:         "dateIntervention",
  323:         "typeIntervention",
  324:         "kilometrage",
  325:         "coutTotal",
  326:         "statut",
  327:       ],
  328:       relationLabelFields: {
  329:         clientId: [
  330:           "nom",
  331:           "prenom",
  332:           "telephone",
  333:         ],
  334:         vehiculeId: [
  335:           "marque",
  336:           "modele",
  337:           "immatriculation",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: coutTotal :: line 379

```ts
  373:           format: "number",
  374:         },
  375:         {
  376:           key: "cout_total",
  377:           label: "Coût total",
  378:           type: "sum",
  379:           field: "coutTotal",
  380:           format: "currency",
  381:           currency: "FCFA",
  382:         },
  383:       ],
  384:     },
  385:   },
  386: 
  387: 
  388:   composition: {
  389:     contextBanner: {
  390:       title: "Contexte intervention",
  391:       items: [
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: coutPieces :: line 107

```ts
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: coutPieces :: line 207

```ts
  201: 
  202:       {
  203:         key: "couts",
  204:         label: "Coûts",
  205: 
  206:         fields: [
  207:           "coutPieces",
  208:           "coutMainOeuvre",
  209:           "coutTotal",
  210:         ],
  211: 
  212:         sections: [
  213:           {
  214:             key: "financier",
  215:             title: "Coûts intervention",
  216:             fields: [
  217:               "coutPieces",
  218:               "coutMainOeuvre",
  219:               "coutTotal",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: coutPieces :: line 217

```ts
  211: 
  212:         sections: [
  213:           {
  214:             key: "financier",
  215:             title: "Coûts intervention",
  216:             fields: [
  217:               "coutPieces",
  218:               "coutMainOeuvre",
  219:               "coutTotal",
  220:             ],
  221:           },
  222:         ],
  223:       },
  224:     ],
  225:   },
  226: 
  227: 
  228:   operational: {
  229:     enabled: true,
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: coutPieces :: line 521

```ts
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: coutMainOeuvre :: line 114

```ts
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: coutMainOeuvre :: line 208

```ts
  202:       {
  203:         key: "couts",
  204:         label: "Coûts",
  205: 
  206:         fields: [
  207:           "coutPieces",
  208:           "coutMainOeuvre",
  209:           "coutTotal",
  210:         ],
  211: 
  212:         sections: [
  213:           {
  214:             key: "financier",
  215:             title: "Coûts intervention",
  216:             fields: [
  217:               "coutPieces",
  218:               "coutMainOeuvre",
  219:               "coutTotal",
  220:             ],
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: coutMainOeuvre :: line 218

```ts
  212:         sections: [
  213:           {
  214:             key: "financier",
  215:             title: "Coûts intervention",
  216:             fields: [
  217:               "coutPieces",
  218:               "coutMainOeuvre",
  219:               "coutTotal",
  220:             ],
  221:           },
  222:         ],
  223:       },
  224:     ],
  225:   },
  226: 
  227: 
  228:   operational: {
  229:     enabled: true,
  230:     title: "Interventions",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: coutMainOeuvre :: line 522

```ts
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: syncInterventionTotalsFromLines :: line 274

```ts
  268:       .split("T")[0],
  269:     statut: "valide",
  270:     returnTo: "/facturesauto/" + factureId + "/edit",
  271:   });
  272: }
  273: 
  274: async function syncInterventionTotalsFromLines(
  275:   interventionId: string
  276: ) {
  277:   if (!interventionId) {
  278:     return;
  279:   }
  280: 
  281:   try {
  282:     const { allERPModules } =
  283:       await import("@/runtime/modules/definitions/coreModules");
  284: 
  285:     const linesModule =
  286:       allERPModules.find(
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: syncInterventionTotalsFromLines :: line 1387

```ts
 1381:             savedRecord?.interventionId ??
 1382:             formValues.interventionId ??
 1383:             ""
 1384:           );
 1385: 
 1386:         if (interventionId) {
 1387:           await syncInterventionTotalsFromLines(interventionId);
 1388:         }
 1389: 
 1390:       }
 1391: 
 1392:       router.push(
 1393:         returnTo ??
 1394:           module.metadata.routes?.list ??
 1395:           `/${module.metadata.key}`
 1396:       );
 1397: 
 1398:       router.refresh();
 1399:     } catch (error) {
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: AMARKHYS_SYNC_INTERVENTION_TOTALS_AFTER_SAVE :: line 1376

```ts
 1370:             ...preparedPayload,
 1371:             id: recordId,
 1372:           });
 1373:         }
 1374:       }
 1375: 
 1376:       // AMARKHYS_SYNC_INTERVENTION_TOTALS_AFTER_SAVE
 1377:       if (module.metadata.key === "lignesinterventionauto") {
 1378:         const interventionId =
 1379:           String(
 1380:             preparedPayload.interventionId ??
 1381:             savedRecord?.interventionId ??
 1382:             formValues.interventionId ??
 1383:             ""
 1384:           );
 1385: 
 1386:         if (interventionId) {
 1387:           await syncInterventionTotalsFromLines(interventionId);
 1388:         }
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: coutTotal :: line 344

```ts
  338:           mainOeuvre: 0,
  339:           remises: 0,
  340:           autres: 0,
  341:         }
  342:       );
  343: 
  344:     const coutTotal =
  345:       totals.pieces +
  346:       totals.mainOeuvre +
  347:       totals.autres -
  348:       totals.remises;
  349: 
  350:     await RuntimeDataBinding.update(
  351:       interventionModule,
  352:       interventionId,
  353:       {
  354:         coutPieces: totals.pieces,
  355:         coutMainOeuvre: totals.mainOeuvre + totals.autres,
  356:         coutTotal,
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: coutTotal :: line 356

```ts
  350:     await RuntimeDataBinding.update(
  351:       interventionModule,
  352:       interventionId,
  353:       {
  354:         coutPieces: totals.pieces,
  355:         coutMainOeuvre: totals.mainOeuvre + totals.autres,
  356:         coutTotal,
  357:       }
  358:     );
  359:   } catch (error) {
  360:     console.error(
  361:       "[AMARKHYS_SYNC_INTERVENTION_TOTALS_ERROR]",
  362:       error
  363:     );
  364:   }
  365: }
  366: 
  367: function getInvoiceAmountSummary(
  368:   invoice: Record<string, unknown>
```

### src/runtime/line-items/RuntimeLineRemovalService.ts :: RuntimeLineRemovalService :: line 75

```ts
   69:   stockId: string
   70: ): Promise<RuntimeRecord | null> {
   71:   const stocks = await RuntimeDataBinding.list(stockModule);
   72:   return stocks.find((stock) => getRecordId(stock) === stockId) ?? null;
   73: }
   74: 
   75: export const RuntimeLineRemovalService = {
   76:   async removeInterventionLine({
   77:     lineId,
   78:     reason = "Ligne retirée par l'utilisateur.",
   79:     userId = "system",
   80:   }: RuntimeLineRemovalParams): Promise<RuntimeLineRemovalResult> {
   81:     const lineModule = getModule("lignesinterventionauto");
   82:     const stockModule = getModule("stocksauto");
   83:     const movementModule = getModule("mouvementsstockauto");
   84: 
   85:     if (!lineModule || !stockModule || !movementModule) {
   86:       return {
   87:         removed: false,
```

### src/runtime/line-items/RuntimeLineRemovalService.ts :: interventionId :: line 126

```ts
  120:     const removedFromStatus = String(line.statut ?? "");
  121:     let stockReversalMovementId = "";
  122: 
  123:     if (hasStockImpact(line)) {
  124:       const stockId = String(line.stockId ?? "");
  125:       const produitId = String(line.produitId ?? "");
  126:       const interventionId = String(line.interventionId ?? "");
  127:       const quantity =
  128:         getNumber(line.stockProcessedQuantity) ||
  129:         getNumber(line.quantite);
  130: 
  131:       if (!stockId || !produitId || quantity <= 0) {
  132:         return {
  133:           removed: false,
  134:           reason: "missing-stock-product-or-quantity",
  135:           lineId,
  136:         };
  137:       }
  138: 
```

### src/runtime/line-items/RuntimeLineRemovalService.ts :: interventionId :: line 126

```ts
  120:     const removedFromStatus = String(line.statut ?? "");
  121:     let stockReversalMovementId = "";
  122: 
  123:     if (hasStockImpact(line)) {
  124:       const stockId = String(line.stockId ?? "");
  125:       const produitId = String(line.produitId ?? "");
  126:       const interventionId = String(line.interventionId ?? "");
  127:       const quantity =
  128:         getNumber(line.stockProcessedQuantity) ||
  129:         getNumber(line.quantite);
  130: 
  131:       if (!stockId || !produitId || quantity <= 0) {
  132:         return {
  133:           removed: false,
  134:           reason: "missing-stock-product-or-quantity",
  135:           lineId,
  136:         };
  137:       }
  138: 
```

### src/runtime/line-items/RuntimeLineRemovalService.ts :: interventionId :: line 163

```ts
  157:           produitId,
  158:           quantite: quantity,
  159:           quantiteAvant: quantityBefore,
  160:           quantiteApres: quantityAfter,
  161:           sourceModule: "lignesinterventionauto",
  162:           sourceId: lineId,
  163:           interventionId,
  164:           ligneInterventionId: lineId,
  165:           originalStockMovementId: String(line.stockMovementId ?? ""),
  166:           motif:
  167:             "Réintégration automatique liée au retrait d'une ligne d'intervention.",
  168:           statut: "valide",
  169:           dateMouvement: todayIsoDate(),
  170:           createdAt: removedAt,
  171:         }
  172:       );
  173: 
  174:       stockReversalMovementId = getRecordId(reversalMovement);
  175: 
```

### src/runtime/line-items/RuntimeLineRemovalService.ts :: interventionId :: line 164

```ts
  158:           quantite: quantity,
  159:           quantiteAvant: quantityBefore,
  160:           quantiteApres: quantityAfter,
  161:           sourceModule: "lignesinterventionauto",
  162:           sourceId: lineId,
  163:           interventionId,
  164:           ligneInterventionId: lineId,
  165:           originalStockMovementId: String(line.stockMovementId ?? ""),
  166:           motif:
  167:             "Réintégration automatique liée au retrait d'une ligne d'intervention.",
  168:           statut: "valide",
  169:           dateMouvement: todayIsoDate(),
  170:           createdAt: removedAt,
  171:         }
  172:       );
  173: 
  174:       stockReversalMovementId = getRecordId(reversalMovement);
  175: 
  176:       await RuntimeDataBinding.update(stockModule, stockId, {
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: interventionsauto :: line 133

```ts
  127: {
  128: 
  129:   id:
  130:     "amarkhys-vidange-reminder",
  131: 
  132:   module:
  133:     "interventionsauto",
  134: 
  135:   event:
  136:     "interventionsauto.created",
  137: 
  138:   condition:
  139:     (payload) =>
  140: 
  141:       payload.typeIntervention ===
  142:         "vidange"
  143: 
  144:       &&
  145: 
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: interventionsauto :: line 136

```ts
  130:     "amarkhys-vidange-reminder",
  131: 
  132:   module:
  133:     "interventionsauto",
  134: 
  135:   event:
  136:     "interventionsauto.created",
  137: 
  138:   condition:
  139:     (payload) =>
  140: 
  141:       payload.typeIntervention ===
  142:         "vidange"
  143: 
  144:       &&
  145: 
  146:       payload.kilometrage,
  147: 
  148:   action:
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: interventionsauto :: line 251

```ts
  245:         .notify({
  246: 
  247:           type:
  248:             "amarkhys.vidange",
  249: 
  250:           module:
  251:             "interventionsauto",
  252: 
  253:           title:
  254:             "Rappel vidange créé",
  255: 
  256:           message:
  257: 
  258:             `Rappel automatique créé pour ${prochainKm} km`,
  259: 
  260:           severity:
  261:             "info"
  262: 
  263:         });
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: interventionsauto :: line 303

```ts
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

### src/runtime/business-rules/runtimeBusinessRules.ts :: interventionsauto :: line 352

```ts
  346:         await RuntimeNotificationEngine
  347:           .notify({
  348:             type:
  349:               "amarkhys.intervention.skipped",
  350: 
  351:             module:
  352:               "interventionsauto",
  353: 
  354:             title:
  355:               "Intervention non créée",
  356: 
  357:             message:
  358:               validation.reason ??
  359:               "Impossible de créer l'intervention depuis ce rendez-vous.",
  360: 
  361:             severity:
  362:               "warning",
  363:           });
  364: 
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: coutTotal :: line 230

```ts
  224: 
  225:         );
  226: 	RuntimeMetrics.sum(
  227:   "amarkhys.revenue.predicted",
  228: 
  229:   Number(
  230:     payload.coutTotal ?? 0
  231:   ),
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
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: coutTotal :: line 722

```ts
  716:         (value: number): number =>
  717:           Math.round(value * 100) / 100;
  718: 
  719:       const montantHT =
  720:         roundMoney(
  721:           asNumber(intervention.montantHT) ||
  722:           asNumber(intervention.coutTotal)
  723:         );
  724: 
  725:       const montantTVA =
  726:         roundMoney(
  727:           asNumber(intervention.montantTVA)
  728:         );
  729: 
  730:       const tauxTVA =
  731:         montantHT > 0 && montantTVA > 0
  732:           ? roundMoney((montantTVA / montantHT) * 100)
  733:           : 18;
  734: 
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: coutTotal :: line 1096

```ts
 1090:           facture.total
 1091:         );
 1092: 
 1093:       const interventionMontantHT =
 1094:         asRuntimeNumber(
 1095:           linkedIntervention?.montantHT ??
 1096:           linkedIntervention?.coutTotal
 1097:         );
 1098: 
 1099:       const interventionMontantTVA =
 1100:         asRuntimeNumber(
 1101:           linkedIntervention?.montantTVA
 1102:         );
 1103: 
 1104:       const interventionMontantTTC =
 1105:         asRuntimeNumber(
 1106:           linkedIntervention?.montantTTC
 1107:         );
 1108: 
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: coutTotal :: line 1345

```ts
 1339:           facture.total
 1340:         );
 1341: 
 1342:       const interventionMontantHT =
 1343:         asRuntimeNumber(
 1344:           linkedIntervention?.montantHT ??
 1345:           linkedIntervention?.coutTotal
 1346:         );
 1347: 
 1348:       const interventionMontantTVA =
 1349:         asRuntimeNumber(
 1350:           linkedIntervention?.montantTVA
 1351:         );
 1352: 
 1353:       const interventionMontantTTC =
 1354:         asRuntimeNumber(
 1355:           linkedIntervention?.montantTTC
 1356:         );
 1357: 
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: total :: line 230

```ts
  224: 
  225:         );
  226: 	RuntimeMetrics.sum(
  227:   "amarkhys.revenue.predicted",
  228: 
  229:   Number(
  230:     payload.coutTotal ?? 0
  231:   ),
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
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: total :: line 722

```ts
  716:         (value: number): number =>
  717:           Math.round(value * 100) / 100;
  718: 
  719:       const montantHT =
  720:         roundMoney(
  721:           asNumber(intervention.montantHT) ||
  722:           asNumber(intervention.coutTotal)
  723:         );
  724: 
  725:       const montantTVA =
  726:         roundMoney(
  727:           asNumber(intervention.montantTVA)
  728:         );
  729: 
  730:       const tauxTVA =
  731:         montantHT > 0 && montantTVA > 0
  732:           ? roundMoney((montantTVA / montantHT) * 100)
  733:           : 18;
  734: 
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: total :: line 1088

```ts
 1082:       const invoiceMontantTVA =
 1083:         asRuntimeNumber(facture.montantTVA);
 1084: 
 1085:       const invoiceMontantTTC =
 1086:         asRuntimeNumber(
 1087:           facture.montantTTC ??
 1088:           facture.totalTTC ??
 1089:           facture.montantTotal ??
 1090:           facture.total
 1091:         );
 1092: 
 1093:       const interventionMontantHT =
 1094:         asRuntimeNumber(
 1095:           linkedIntervention?.montantHT ??
 1096:           linkedIntervention?.coutTotal
 1097:         );
 1098: 
 1099:       const interventionMontantTVA =
 1100:         asRuntimeNumber(
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: total :: line 1089

```ts
 1083:         asRuntimeNumber(facture.montantTVA);
 1084: 
 1085:       const invoiceMontantTTC =
 1086:         asRuntimeNumber(
 1087:           facture.montantTTC ??
 1088:           facture.totalTTC ??
 1089:           facture.montantTotal ??
 1090:           facture.total
 1091:         );
 1092: 
 1093:       const interventionMontantHT =
 1094:         asRuntimeNumber(
 1095:           linkedIntervention?.montantHT ??
 1096:           linkedIntervention?.coutTotal
 1097:         );
 1098: 
 1099:       const interventionMontantTVA =
 1100:         asRuntimeNumber(
 1101:           linkedIntervention?.montantTVA
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: total :: line 1090

```ts
 1084: 
 1085:       const invoiceMontantTTC =
 1086:         asRuntimeNumber(
 1087:           facture.montantTTC ??
 1088:           facture.totalTTC ??
 1089:           facture.montantTotal ??
 1090:           facture.total
 1091:         );
 1092: 
 1093:       const interventionMontantHT =
 1094:         asRuntimeNumber(
 1095:           linkedIntervention?.montantHT ??
 1096:           linkedIntervention?.coutTotal
 1097:         );
 1098: 
 1099:       const interventionMontantTVA =
 1100:         asRuntimeNumber(
 1101:           linkedIntervention?.montantTVA
 1102:         );
```

### src/runtime/actions/RuntimeActionEngine.ts :: retirer-ligne :: line 146

```ts
  140: 
  141:     // Q20H5C_B2_REMOVE_LINE_ACTION
  142:     // Action métier non-transitionnelle : retirer proprement une ligne
  143:     // sans réintroduire un statut utilisateur "annulée".
  144:     if (
  145:       module?.metadata?.key === "lignesinterventionauto" &&
  146:       action.key === "retirer-ligne" &&
  147:       record
  148:     ) {
  149:       const { RuntimeLineRemovalService } =
  150:         await import("@/runtime/line-items");
  151: 
  152:       const lineId =
  153:         String(
  154:           (record as any)?.id ??
  155:           (record as any)?._id ??
  156:           ""
  157:         );
  158: 
```

### src/runtime/actions/RuntimeActionEngine.ts :: lignesinterventionauto :: line 145

```ts
  139:     );
  140: 
  141:     // Q20H5C_B2_REMOVE_LINE_ACTION
  142:     // Action métier non-transitionnelle : retirer proprement une ligne
  143:     // sans réintroduire un statut utilisateur "annulée".
  144:     if (
  145:       module?.metadata?.key === "lignesinterventionauto" &&
  146:       action.key === "retirer-ligne" &&
  147:       record
  148:     ) {
  149:       const { RuntimeLineRemovalService } =
  150:         await import("@/runtime/line-items");
  151: 
  152:       const lineId =
  153:         String(
  154:           (record as any)?.id ??
  155:           (record as any)?._id ??
  156:           ""
  157:         );
```

### src/runtime/actions/RuntimeActionEngine.ts :: RuntimeLineRemovalService :: line 149

```ts
  143:     // sans réintroduire un statut utilisateur "annulée".
  144:     if (
  145:       module?.metadata?.key === "lignesinterventionauto" &&
  146:       action.key === "retirer-ligne" &&
  147:       record
  148:     ) {
  149:       const { RuntimeLineRemovalService } =
  150:         await import("@/runtime/line-items");
  151: 
  152:       const lineId =
  153:         String(
  154:           (record as any)?.id ??
  155:           (record as any)?._id ??
  156:           ""
  157:         );
  158: 
  159:       if (!lineId) {
  160:         return {
  161:           success: false,
```

### src/runtime/actions/RuntimeActionEngine.ts :: RuntimeLineRemovalService :: line 169

```ts
  163:           action,
  164:           record,
  165:         };
  166:       }
  167: 
  168:       const result =
  169:         await RuntimeLineRemovalService.removeInterventionLine({
  170:           lineId,
  171:           reason: "Ligne retirée depuis l'action métier.",
  172:         });
  173: 
  174:       if (!result.removed) {
  175:         return {
  176:           success: false,
  177:           message:
  178:             result.reason === "line-linked-to-invoice"
  179:               ? "Cette ligne est déjà liée à une facture. Elle ne peut pas être retirée directement."
  180:               : result.reason === "already-removed"
  181:                 ? "Cette ligne a déjà été retirée."
```

## Conclusion

L’effet `totaux` est présent dans le runtime, mais il peut ne pas être suffisamment exposé/détectable par l’audit prioritaire.

Prochaine passe recommandée : ajouter un marqueur metadata/runtime explicite `totaux` sans déplacer la logique métier vers le formulaire.