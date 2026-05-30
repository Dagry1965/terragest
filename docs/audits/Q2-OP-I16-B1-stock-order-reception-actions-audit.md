# Q2-OP-I16-B1 — Audit actions commandes/réceptions stock

Objectif : vérifier précisément les actions runtime manquantes dans `commandesstockauto` et `receptionsstockauto` avant enrichissement metadata.

## Résumé

- OK : 28
- WARN : 1
- WARN HIGH : 0
- FAIL : 0
- FAIL HIGH : 0

## Checks

| Area | Status | Severity | File | Lines | Message |
|---|---:|---:|---|---|---|
| module-file | OK | HIGH | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto module file found |
| actions-block | OK | HIGH | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 24 | receptionsstockauto actions block found |
| expected-action-key | OK | MEDIUM | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 26 | receptionsstockauto expected action key valider-reception found |
| expected-action-label | WARN | LOW | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto expected action label "Valider réception" missing |
| expected-action-label | OK | LOW | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 27 | receptionsstockauto expected action label "Valider reception" found |
| expected-status | OK | LOW | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 152, 154, 161 | receptionsstockauto status marker brouillon found |
| expected-status | OK | LOW | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 155, 162 | receptionsstockauto status marker validee found |
| expected-field | OK | LOW | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 127 | receptionsstockauto field marker mouvementStockId found |
| expected-field | OK | LOW | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 149, 188, 202, 222, 246 | receptionsstockauto field marker statut found |
| expected-field | OK | LOW | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 72, 110, 186, 200, 222 | receptionsstockauto field marker quantiteRecue found |
| expected-field | OK | LOW | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 93, 185, 199, 222, 235, 244 | receptionsstockauto field marker stockId found |
| expected-field | OK | LOW | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 71, 71, 83, 99, 100, 184, 198, 222, 235, 239, 246 | receptionsstockauto field marker produitId found |
| runtime-action-contract | OK | MEDIUM | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 29 | receptionsstockauto runtimeOnly marker found |
| action-type-contract | OK | LOW | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 28, 41, 51, 85, 95, 112, 121, 129, 137, 144, 151, 168 | receptionsstockauto action/type markers found |
| module-file | OK | HIGH | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto module file found |
| actions-block | OK | HIGH | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 24 | commandesstockauto actions block found |
| expected-action-key | OK | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 26 | commandesstockauto expected action key envoyer-commande found |
| expected-action-key | OK | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 32 | commandesstockauto expected action key annuler-commande found |
| expected-action-label | OK | LOW | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 27 | commandesstockauto expected action label "Envoyer commande" found |
| expected-action-label | OK | LOW | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 33 | commandesstockauto expected action label "Annuler commande" found |
| expected-status | OK | LOW | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 97, 99 | commandesstockauto status marker brouillon found |
| expected-status | OK | LOW | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 100 | commandesstockauto status marker envoyee found |
| expected-status | OK | LOW | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 103 | commandesstockauto status marker annulee found |
| expected-field | OK | LOW | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 53, 126, 140, 157 | commandesstockauto field marker fournisseurId found |
| expected-field | OK | LOW | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 94, 131, 145, 157, 169, 189, 195, 205 | commandesstockauto field marker statut found |
| expected-field | OK | LOW | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 78, 129, 143, 170 | commandesstockauto field marker montantHT found |
| expected-field | OK | LOW | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 86, 130, 144, 170, 171 | commandesstockauto field marker montantTTC found |
| runtime-action-contract | OK | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 29, 35 | commandesstockauto runtimeOnly marker found |
| action-type-contract | OK | LOW | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 28, 34, 47, 55, 65, 73, 80, 88, 96, 111 | commandesstockauto action/type markers found |

## Contextes utiles

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: actions :: line 24

```ts
   18:       observability: true,
   19:       audit: true,
   20:       realtime: true,
   21:     },
   22:   },
   23: 
   24:   actions: [
   25:     {
   26:       key: "valider-reception",
   27:       label: "Valider reception",
   28:       type: "primary",
   29:       runtimeOnly: true,
   30:     },
   31:   ],
   32: 
   33: 
   34: 
   35:   schema: {
   36:     collection: "receptionsstockauto",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: valider-reception :: line 26

```ts
   20:       realtime: true,
   21:     },
   22:   },
   23: 
   24:   actions: [
   25:     {
   26:       key: "valider-reception",
   27:       label: "Valider reception",
   28:       type: "primary",
   29:       runtimeOnly: true,
   30:     },
   31:   ],
   32: 
   33: 
   34: 
   35:   schema: {
   36:     collection: "receptionsstockauto",
   37:     fields: [
   38: {
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: Valider reception :: line 27

```ts
   21:     },
   22:   },
   23: 
   24:   actions: [
   25:     {
   26:       key: "valider-reception",
   27:       label: "Valider reception",
   28:       type: "primary",
   29:       runtimeOnly: true,
   30:     },
   31:   ],
   32: 
   33: 
   34: 
   35:   schema: {
   36:     collection: "receptionsstockauto",
   37:     fields: [
   38: {
   39:         key: "commandeId",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: brouillon :: line 152

```ts
  146:         list: { visible: false },
  147:       },
  148: {
  149:         key: "statut",
  150:         label: "Statut",
  151:         type: "select",
  152:         defaultValue: "brouillon",
  153:         options: [
  154:           { label: "Brouillon", value: "brouillon" },
  155:           { label: "Validee", value: "validee" },
  156:         ],
  157:         list: { visible: true, order: 7 },
  158:         grid: { cols: 4 },
  159:         // Q21D_RECEPTION_STATUS_RULE
  160:         // Statuts visibles volontairement limites :
  161:         // brouillon = preparation sans impact stock
  162:         // validee = entree stock traitee par runtime
  163:         // annulation = future action controlee avec mouvement inverse
  164:       },
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: brouillon :: line 154

```ts
  148: {
  149:         key: "statut",
  150:         label: "Statut",
  151:         type: "select",
  152:         defaultValue: "brouillon",
  153:         options: [
  154:           { label: "Brouillon", value: "brouillon" },
  155:           { label: "Validee", value: "validee" },
  156:         ],
  157:         list: { visible: true, order: 7 },
  158:         grid: { cols: 4 },
  159:         // Q21D_RECEPTION_STATUS_RULE
  160:         // Statuts visibles volontairement limites :
  161:         // brouillon = preparation sans impact stock
  162:         // validee = entree stock traitee par runtime
  163:         // annulation = future action controlee avec mouvement inverse
  164:       },
  165: {
  166:         key: "notes",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: brouillon :: line 161

```ts
  155:           { label: "Validee", value: "validee" },
  156:         ],
  157:         list: { visible: true, order: 7 },
  158:         grid: { cols: 4 },
  159:         // Q21D_RECEPTION_STATUS_RULE
  160:         // Statuts visibles volontairement limites :
  161:         // brouillon = preparation sans impact stock
  162:         // validee = entree stock traitee par runtime
  163:         // annulation = future action controlee avec mouvement inverse
  164:       },
  165: {
  166:         key: "notes",
  167:         label: "Notes",
  168:         type: "textarea",
  169:         list: { visible: false },
  170:         grid: { cols: 12 },
  171:       }
  172:     ],
  173:   },
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: validee :: line 155

```ts
  149:         key: "statut",
  150:         label: "Statut",
  151:         type: "select",
  152:         defaultValue: "brouillon",
  153:         options: [
  154:           { label: "Brouillon", value: "brouillon" },
  155:           { label: "Validee", value: "validee" },
  156:         ],
  157:         list: { visible: true, order: 7 },
  158:         grid: { cols: 4 },
  159:         // Q21D_RECEPTION_STATUS_RULE
  160:         // Statuts visibles volontairement limites :
  161:         // brouillon = preparation sans impact stock
  162:         // validee = entree stock traitee par runtime
  163:         // annulation = future action controlee avec mouvement inverse
  164:       },
  165: {
  166:         key: "notes",
  167:         label: "Notes",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: validee :: line 162

```ts
  156:         ],
  157:         list: { visible: true, order: 7 },
  158:         grid: { cols: 4 },
  159:         // Q21D_RECEPTION_STATUS_RULE
  160:         // Statuts visibles volontairement limites :
  161:         // brouillon = preparation sans impact stock
  162:         // validee = entree stock traitee par runtime
  163:         // annulation = future action controlee avec mouvement inverse
  164:       },
  165: {
  166:         key: "notes",
  167:         label: "Notes",
  168:         type: "textarea",
  169:         list: { visible: false },
  170:         grid: { cols: 12 },
  171:       }
  172:     ],
  173:   },
  174: 
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: mouvementStockId :: line 127

```ts
  121:         type: "date",
  122:         required: true,
  123:         list: { visible: true, order: 6 },
  124:         grid: { cols: 4 },
  125:       },
  126: {
  127:         key: "mouvementStockId",
  128:         label: "Mouvement stock",
  129:         type: "relation",
  130:         relation: { module: "mouvementsstockauto" },
  131:         grid: { cols: 4 },
  132:         list: { visible: false },
  133:       },
  134: {
  135:         key: "stockProcessedAt",
  136:         label: "Date traitement stock",
  137:         type: "date",
  138:         grid: { cols: 4 },
  139:         list: { visible: false },
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: statut :: line 149

```ts
  143:         label: "Quantite traitee stock",
  144:         type: "number",
  145:         grid: { cols: 4 },
  146:         list: { visible: false },
  147:       },
  148: {
  149:         key: "statut",
  150:         label: "Statut",
  151:         type: "select",
  152:         defaultValue: "brouillon",
  153:         options: [
  154:           { label: "Brouillon", value: "brouillon" },
  155:           { label: "Validee", value: "validee" },
  156:         ],
  157:         list: { visible: true, order: 7 },
  158:         grid: { cols: 4 },
  159:         // Q21D_RECEPTION_STATUS_RULE
  160:         // Statuts visibles volontairement limites :
  161:         // brouillon = preparation sans impact stock
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: statut :: line 188

```ts
  182:           "commandeId",
  183:           "ligneCommandeId",
  184:           "produitId",
  185:           "stockId",
  186:           "quantiteRecue",
  187:           "dateReception",
  188:           "statut",
  189:           "notes",
  190:         ],
  191:         sections: [
  192:           {
  193:             key: "general",
  194:             title: "Reception stock",
  195:             fields: [
  196:               "commandeId",
  197:               "ligneCommandeId",
  198:               "produitId",
  199:               "stockId",
  200:               "quantiteRecue",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: statut :: line 202

```ts
  196:               "commandeId",
  197:               "ligneCommandeId",
  198:               "produitId",
  199:               "stockId",
  200:               "quantiteRecue",
  201:               "dateReception",
  202:                   "statut",
  203:               "notes",
  204:             ],
  205:           },
  206:         ],
  207:       },
  208:     ],
  209:   },
  210: 
  211:   composition: {
  212:     // Q21E_B_RECEPTION_RELATIONSHIP_COMPOSITION
  213:     // Réception knows its parent command and generated stock movements.
  214:     requiresParentContext: true,
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: statut :: line 222

```ts
  216:       {
  217:         moduleKey: "commandesstockauto",
  218:         foreignKey: "commandeId",
  219:       },
  220:     ],
  221:     lockedFields: ["commandeId"],
  222:     labelFields: ["ligneCommandeId", "produitId", "stockId", "quantiteRecue", "dateReception", "statut"],
  223: 
  224:     children: [
  225:       {
  226:         key: "mouvements-stock-reception",
  227:         moduleKey: "mouvementsstockauto",
  228:         foreignKey: "sourceId",
  229:         title: "Mouvements stock générés",
  230:         description: "Mouvements stock créés automatiquement depuis cette réception.",
  231:         displayIn: ["detail", "edit"],
  232:         lazy: true,
  233:         position: "after",
  234:         allowCreate: false,
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: statut :: line 246

```ts
  240:             moduleKey: "produitsauto",
  241:             labelFields: ["reference", "nom", "designation", "marque"],
  242:           },
  243:           {
  244:             field: "stockId",
  245:             moduleKey: "stocksauto",
  246:             labelFields: ["produitId", "emplacement", "typeStock", "quantite", "statut"],
  247:           },
  248:         ],
  249:       },
  250:     ],
  251:   },
  252: };
  253: 
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: quantiteRecue :: line 72

```ts
   66:           // Q21D3D_LINE_COMMAND_AUTOFILL_PRODUCT
   67:           // The selected order line carries the product and ordered quantity.
   68:           // RuntimeAutoFillEngine applies this generically from relation metadata.
   69:           autoFill: {
   70:             map: {
   71:               produitId: ["produitId"],
   72:               quantiteRecue: ["quantiteCommandee"],
   73:             },
   74:             recalculate: true,
   75:           },
   76:         },
   77:         required: true,
   78:         searchable: true,
   79:         list: { visible: true, order: 2 },
   80:         grid: { cols: 4 },
   81:       },
   82: {
   83:         key: "produitId",
   84:         label: "Produit",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: quantiteRecue :: line 110

```ts
  104:         required: true,
  105:         searchable: true,
  106:         list: { visible: true, order: 4 },
  107:         grid: { cols: 4 },
  108:       },
  109: {
  110:         key: "quantiteRecue",
  111:         label: "Quantite recue",
  112:         type: "number",
  113:         required: true,
  114:         defaultValue: 1,
  115:         list: { visible: true, order: 5 },
  116:         grid: { cols: 4 },
  117:       },
  118: {
  119:         key: "dateReception",
  120:         label: "Date reception",
  121:         type: "date",
  122:         required: true,
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: quantiteRecue :: line 186

```ts
  180:         label: "Reception",
  181:         fields: [
  182:           "commandeId",
  183:           "ligneCommandeId",
  184:           "produitId",
  185:           "stockId",
  186:           "quantiteRecue",
  187:           "dateReception",
  188:           "statut",
  189:           "notes",
  190:         ],
  191:         sections: [
  192:           {
  193:             key: "general",
  194:             title: "Reception stock",
  195:             fields: [
  196:               "commandeId",
  197:               "ligneCommandeId",
  198:               "produitId",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: quantiteRecue :: line 200

```ts
  194:             title: "Reception stock",
  195:             fields: [
  196:               "commandeId",
  197:               "ligneCommandeId",
  198:               "produitId",
  199:               "stockId",
  200:               "quantiteRecue",
  201:               "dateReception",
  202:                   "statut",
  203:               "notes",
  204:             ],
  205:           },
  206:         ],
  207:       },
  208:     ],
  209:   },
  210: 
  211:   composition: {
  212:     // Q21E_B_RECEPTION_RELATIONSHIP_COMPOSITION
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: quantiteRecue :: line 222

```ts
  216:       {
  217:         moduleKey: "commandesstockauto",
  218:         foreignKey: "commandeId",
  219:       },
  220:     ],
  221:     lockedFields: ["commandeId"],
  222:     labelFields: ["ligneCommandeId", "produitId", "stockId", "quantiteRecue", "dateReception", "statut"],
  223: 
  224:     children: [
  225:       {
  226:         key: "mouvements-stock-reception",
  227:         moduleKey: "mouvementsstockauto",
  228:         foreignKey: "sourceId",
  229:         title: "Mouvements stock générés",
  230:         description: "Mouvements stock créés automatiquement depuis cette réception.",
  231:         displayIn: ["detail", "edit"],
  232:         lazy: true,
  233:         position: "after",
  234:         allowCreate: false,
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: stockId :: line 93

```ts
   87:         required: true,
   88:         searchable: true,
   89:         list: { visible: true, order: 3 },
   90:         grid: { cols: 4 },
   91:       },
   92: {
   93:         key: "stockId",
   94:         label: "Stock destination",
   95:         type: "relation",
   96:         relation: {
   97:           module: "stocksauto",
   98:           filterBy: {
   99:             sourceField: "produitId",
  100:             targetField: "produitId",
  101:             includeEmptyTarget: false,
  102:           },
  103:         },
  104:         required: true,
  105:         searchable: true,
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: stockId :: line 185

```ts
  179:         key: "reception",
  180:         label: "Reception",
  181:         fields: [
  182:           "commandeId",
  183:           "ligneCommandeId",
  184:           "produitId",
  185:           "stockId",
  186:           "quantiteRecue",
  187:           "dateReception",
  188:           "statut",
  189:           "notes",
  190:         ],
  191:         sections: [
  192:           {
  193:             key: "general",
  194:             title: "Reception stock",
  195:             fields: [
  196:               "commandeId",
  197:               "ligneCommandeId",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: stockId :: line 199

```ts
  193:             key: "general",
  194:             title: "Reception stock",
  195:             fields: [
  196:               "commandeId",
  197:               "ligneCommandeId",
  198:               "produitId",
  199:               "stockId",
  200:               "quantiteRecue",
  201:               "dateReception",
  202:                   "statut",
  203:               "notes",
  204:             ],
  205:           },
  206:         ],
  207:       },
  208:     ],
  209:   },
  210: 
  211:   composition: {
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: stockId :: line 222

```ts
  216:       {
  217:         moduleKey: "commandesstockauto",
  218:         foreignKey: "commandeId",
  219:       },
  220:     ],
  221:     lockedFields: ["commandeId"],
  222:     labelFields: ["ligneCommandeId", "produitId", "stockId", "quantiteRecue", "dateReception", "statut"],
  223: 
  224:     children: [
  225:       {
  226:         key: "mouvements-stock-reception",
  227:         moduleKey: "mouvementsstockauto",
  228:         foreignKey: "sourceId",
  229:         title: "Mouvements stock générés",
  230:         description: "Mouvements stock créés automatiquement depuis cette réception.",
  231:         displayIn: ["detail", "edit"],
  232:         lazy: true,
  233:         position: "after",
  234:         allowCreate: false,
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: stockId :: line 235

```ts
  229:         title: "Mouvements stock générés",
  230:         description: "Mouvements stock créés automatiquement depuis cette réception.",
  231:         displayIn: ["detail", "edit"],
  232:         lazy: true,
  233:         position: "after",
  234:         allowCreate: false,
  235:         labelFields: ["typeMouvement", "produitId", "quantite", "stockId"],
  236:         subtitleFields: ["dateMouvement", "sourceModule"],
  237:         relations: [
  238:           {
  239:             field: "produitId",
  240:             moduleKey: "produitsauto",
  241:             labelFields: ["reference", "nom", "designation", "marque"],
  242:           },
  243:           {
  244:             field: "stockId",
  245:             moduleKey: "stocksauto",
  246:             labelFields: ["produitId", "emplacement", "typeStock", "quantite", "statut"],
  247:           },
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: produitId :: line 71

```ts
   65: 
   66:           // Q21D3D_LINE_COMMAND_AUTOFILL_PRODUCT
   67:           // The selected order line carries the product and ordered quantity.
   68:           // RuntimeAutoFillEngine applies this generically from relation metadata.
   69:           autoFill: {
   70:             map: {
   71:               produitId: ["produitId"],
   72:               quantiteRecue: ["quantiteCommandee"],
   73:             },
   74:             recalculate: true,
   75:           },
   76:         },
   77:         required: true,
   78:         searchable: true,
   79:         list: { visible: true, order: 2 },
   80:         grid: { cols: 4 },
   81:       },
   82: {
   83:         key: "produitId",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: produitId :: line 71

```ts
   65: 
   66:           // Q21D3D_LINE_COMMAND_AUTOFILL_PRODUCT
   67:           // The selected order line carries the product and ordered quantity.
   68:           // RuntimeAutoFillEngine applies this generically from relation metadata.
   69:           autoFill: {
   70:             map: {
   71:               produitId: ["produitId"],
   72:               quantiteRecue: ["quantiteCommandee"],
   73:             },
   74:             recalculate: true,
   75:           },
   76:         },
   77:         required: true,
   78:         searchable: true,
   79:         list: { visible: true, order: 2 },
   80:         grid: { cols: 4 },
   81:       },
   82: {
   83:         key: "produitId",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: produitId :: line 83

```ts
   77:         required: true,
   78:         searchable: true,
   79:         list: { visible: true, order: 2 },
   80:         grid: { cols: 4 },
   81:       },
   82: {
   83:         key: "produitId",
   84:         label: "Produit",
   85:         type: "relation",
   86:         relation: { module: "produitsauto" },
   87:         required: true,
   88:         searchable: true,
   89:         list: { visible: true, order: 3 },
   90:         grid: { cols: 4 },
   91:       },
   92: {
   93:         key: "stockId",
   94:         label: "Stock destination",
   95:         type: "relation",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: produitId :: line 99

```ts
   93:         key: "stockId",
   94:         label: "Stock destination",
   95:         type: "relation",
   96:         relation: {
   97:           module: "stocksauto",
   98:           filterBy: {
   99:             sourceField: "produitId",
  100:             targetField: "produitId",
  101:             includeEmptyTarget: false,
  102:           },
  103:         },
  104:         required: true,
  105:         searchable: true,
  106:         list: { visible: true, order: 4 },
  107:         grid: { cols: 4 },
  108:       },
  109: {
  110:         key: "quantiteRecue",
  111:         label: "Quantite recue",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: produitId :: line 100

```ts
   94:         label: "Stock destination",
   95:         type: "relation",
   96:         relation: {
   97:           module: "stocksauto",
   98:           filterBy: {
   99:             sourceField: "produitId",
  100:             targetField: "produitId",
  101:             includeEmptyTarget: false,
  102:           },
  103:         },
  104:         required: true,
  105:         searchable: true,
  106:         list: { visible: true, order: 4 },
  107:         grid: { cols: 4 },
  108:       },
  109: {
  110:         key: "quantiteRecue",
  111:         label: "Quantite recue",
  112:         type: "number",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: runtimeOnly :: line 29

```ts
   23: 
   24:   actions: [
   25:     {
   26:       key: "valider-reception",
   27:       label: "Valider reception",
   28:       type: "primary",
   29:       runtimeOnly: true,
   30:     },
   31:   ],
   32: 
   33: 
   34: 
   35:   schema: {
   36:     collection: "receptionsstockauto",
   37:     fields: [
   38: {
   39:         key: "commandeId",
   40:         label: "Commande",
   41:         type: "relation",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: type: :: line 28

```ts
   22:   },
   23: 
   24:   actions: [
   25:     {
   26:       key: "valider-reception",
   27:       label: "Valider reception",
   28:       type: "primary",
   29:       runtimeOnly: true,
   30:     },
   31:   ],
   32: 
   33: 
   34: 
   35:   schema: {
   36:     collection: "receptionsstockauto",
   37:     fields: [
   38: {
   39:         key: "commandeId",
   40:         label: "Commande",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: type: :: line 41

```ts
   35:   schema: {
   36:     collection: "receptionsstockauto",
   37:     fields: [
   38: {
   39:         key: "commandeId",
   40:         label: "Commande",
   41:         type: "relation",
   42:         relation: { module: "commandesstockauto" },
   43:         required: true,
   44:         searchable: true,
   45:         list: { visible: true, order: 1 },
   46:         grid: { cols: 4 },
   47:       },
   48: {
   49:         key: "ligneCommandeId",
   50:         label: "Ligne commande",
   51:         type: "relation",
   52:         relation: {
   53:           module: "lignescommandestockauto",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: type: :: line 51

```ts
   45:         list: { visible: true, order: 1 },
   46:         grid: { cols: 4 },
   47:       },
   48: {
   49:         key: "ligneCommandeId",
   50:         label: "Ligne commande",
   51:         type: "relation",
   52:         relation: {
   53:           module: "lignescommandestockauto",
   54:           filterBy: {
   55:             sourceField: "commandeId",
   56:             targetField: "commandeId",
   57:             includeEmptyTarget: false,
   58:           },
   59:           // Q21D3C3A_EXCLUDE_USED_BY
   60:           // Exclude order lines already used in an existing reception.
   61:           excludeUsedBy: {
   62:             module: "receptionsstockauto",
   63:             field: "ligneCommandeId",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: type: :: line 85

```ts
   79:         list: { visible: true, order: 2 },
   80:         grid: { cols: 4 },
   81:       },
   82: {
   83:         key: "produitId",
   84:         label: "Produit",
   85:         type: "relation",
   86:         relation: { module: "produitsauto" },
   87:         required: true,
   88:         searchable: true,
   89:         list: { visible: true, order: 3 },
   90:         grid: { cols: 4 },
   91:       },
   92: {
   93:         key: "stockId",
   94:         label: "Stock destination",
   95:         type: "relation",
   96:         relation: {
   97:           module: "stocksauto",
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: type: :: line 95

```ts
   89:         list: { visible: true, order: 3 },
   90:         grid: { cols: 4 },
   91:       },
   92: {
   93:         key: "stockId",
   94:         label: "Stock destination",
   95:         type: "relation",
   96:         relation: {
   97:           module: "stocksauto",
   98:           filterBy: {
   99:             sourceField: "produitId",
  100:             targetField: "produitId",
  101:             includeEmptyTarget: false,
  102:           },
  103:         },
  104:         required: true,
  105:         searchable: true,
  106:         list: { visible: true, order: 4 },
  107:         grid: { cols: 4 },
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: actions :: line 24

```ts
   18:       observability: true,
   19:       audit: true,
   20:       realtime: true,
   21:     },
   22:   },
   23: 
   24:   actions: [
   25:     {
   26:       key: "envoyer-commande",
   27:       label: "Envoyer commande",
   28:       type: "primary",
   29:       runtimeOnly: true,
   30:     },
   31:     {
   32:       key: "annuler-commande",
   33:       label: "Annuler commande",
   34:       type: "danger",
   35:       runtimeOnly: true,
   36:     },
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: envoyer-commande :: line 26

```ts
   20:       realtime: true,
   21:     },
   22:   },
   23: 
   24:   actions: [
   25:     {
   26:       key: "envoyer-commande",
   27:       label: "Envoyer commande",
   28:       type: "primary",
   29:       runtimeOnly: true,
   30:     },
   31:     {
   32:       key: "annuler-commande",
   33:       label: "Annuler commande",
   34:       type: "danger",
   35:       runtimeOnly: true,
   36:     },
   37:   ],
   38: 
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: annuler-commande :: line 32

```ts
   26:       key: "envoyer-commande",
   27:       label: "Envoyer commande",
   28:       type: "primary",
   29:       runtimeOnly: true,
   30:     },
   31:     {
   32:       key: "annuler-commande",
   33:       label: "Annuler commande",
   34:       type: "danger",
   35:       runtimeOnly: true,
   36:     },
   37:   ],
   38: 
   39: 
   40: 
   41:   schema: {
   42:     collection: "commandesstockauto",
   43:     fields: [
   44: {
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: Envoyer commande :: line 27

```ts
   21:     },
   22:   },
   23: 
   24:   actions: [
   25:     {
   26:       key: "envoyer-commande",
   27:       label: "Envoyer commande",
   28:       type: "primary",
   29:       runtimeOnly: true,
   30:     },
   31:     {
   32:       key: "annuler-commande",
   33:       label: "Annuler commande",
   34:       type: "danger",
   35:       runtimeOnly: true,
   36:     },
   37:   ],
   38: 
   39: 
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: Annuler commande :: line 33

```ts
   27:       label: "Envoyer commande",
   28:       type: "primary",
   29:       runtimeOnly: true,
   30:     },
   31:     {
   32:       key: "annuler-commande",
   33:       label: "Annuler commande",
   34:       type: "danger",
   35:       runtimeOnly: true,
   36:     },
   37:   ],
   38: 
   39: 
   40: 
   41:   schema: {
   42:     collection: "commandesstockauto",
   43:     fields: [
   44: {
   45:         key: "numeroCommande",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: brouillon :: line 97

```ts
   91:         grid: { cols: 4 },
   92:       },
   93: {
   94:         key: "statut",
   95:         label: "Statut",
   96:         type: "select",
   97:         defaultValue: "brouillon",
   98:         options: [
   99:           { label: "Brouillon", value: "brouillon" },
  100:           { label: "Envoyee", value: "envoyee" },
  101:           { label: "Partiellement recue", value: "partiellement_recue" },
  102:           { label: "Recue", value: "recue" },
  103:           { label: "Annulee", value: "annulee" },
  104:         ],
  105:         list: { visible: true, order: 5 },
  106:         grid: { cols: 4 },
  107:       },
  108: {
  109:         key: "notes",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: brouillon :: line 99

```ts
   93: {
   94:         key: "statut",
   95:         label: "Statut",
   96:         type: "select",
   97:         defaultValue: "brouillon",
   98:         options: [
   99:           { label: "Brouillon", value: "brouillon" },
  100:           { label: "Envoyee", value: "envoyee" },
  101:           { label: "Partiellement recue", value: "partiellement_recue" },
  102:           { label: "Recue", value: "recue" },
  103:           { label: "Annulee", value: "annulee" },
  104:         ],
  105:         list: { visible: true, order: 5 },
  106:         grid: { cols: 4 },
  107:       },
  108: {
  109:         key: "notes",
  110:         label: "Notes",
  111:         type: "textarea",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: envoyee :: line 100

```ts
   94:         key: "statut",
   95:         label: "Statut",
   96:         type: "select",
   97:         defaultValue: "brouillon",
   98:         options: [
   99:           { label: "Brouillon", value: "brouillon" },
  100:           { label: "Envoyee", value: "envoyee" },
  101:           { label: "Partiellement recue", value: "partiellement_recue" },
  102:           { label: "Recue", value: "recue" },
  103:           { label: "Annulee", value: "annulee" },
  104:         ],
  105:         list: { visible: true, order: 5 },
  106:         grid: { cols: 4 },
  107:       },
  108: {
  109:         key: "notes",
  110:         label: "Notes",
  111:         type: "textarea",
  112:         list: { visible: false },
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: annulee :: line 103

```ts
   97:         defaultValue: "brouillon",
   98:         options: [
   99:           { label: "Brouillon", value: "brouillon" },
  100:           { label: "Envoyee", value: "envoyee" },
  101:           { label: "Partiellement recue", value: "partiellement_recue" },
  102:           { label: "Recue", value: "recue" },
  103:           { label: "Annulee", value: "annulee" },
  104:         ],
  105:         list: { visible: true, order: 5 },
  106:         grid: { cols: 4 },
  107:       },
  108: {
  109:         key: "notes",
  110:         label: "Notes",
  111:         type: "textarea",
  112:         list: { visible: false },
  113:         grid: { cols: 12 },
  114:       }
  115:     ],
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: fournisseurId :: line 53

```ts
   47:         type: "text",
   48:         searchable: true,
   49:         list: { visible: true, order: 1 },
   50:         grid: { cols: 4 },
   51:       },
   52: {
   53:         key: "fournisseurId",
   54:         label: "Fournisseur",
   55:         type: "relation",
   56:         relation: { module: "fournisseursauto" },
   57:         required: true,
   58:         searchable: true,
   59:         list: { visible: true, order: 2 },
   60:         grid: { cols: 4 },
   61:       },
   62: {
   63:         key: "dateCommande",
   64:         label: "Date commande",
   65:         type: "date",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: fournisseurId :: line 126

```ts
  120:     tabs: [
  121:       {
  122:         key: "commande",
  123:         label: "Commande",
  124:         fields: [
  125:           "numeroCommande",
  126:           "fournisseurId",
  127:           "dateCommande",
  128:           "dateLivraisonPrevue",
  129:           "montantHT",
  130:           "montantTTC",
  131:           "statut",
  132:           "notes",
  133:         ],
  134:         sections: [
  135:           {
  136:             key: "general",
  137:             title: "Commande fournisseur",
  138:             fields: [
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: fournisseurId :: line 140

```ts
  134:         sections: [
  135:           {
  136:             key: "general",
  137:             title: "Commande fournisseur",
  138:             fields: [
  139:               "numeroCommande",
  140:               "fournisseurId",
  141:               "dateCommande",
  142:               "dateLivraisonPrevue",
  143:               "montantHT",
  144:               "montantTTC",
  145:               "statut",
  146:               "notes",
  147:             ],
  148:           },
  149:         ],
  150:       },
  151:     ],
  152:   },
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: fournisseurId :: line 157

```ts
  151:     ],
  152:   },
  153: 
  154:   composition: {
  155:     // Q21E_B_STOCK_ORDER_RELATIONSHIP_COMPOSITION
  156:     // Commande stock knows its lines and receptions.
  157:     labelFields: ["numeroCommande", "fournisseurId", "statut"],
  158: 
  159:     children: [
  160:       {
  161:         key: "lignes-commandestock",
  162:         moduleKey: "lignescommandestockauto",
  163:         foreignKey: "commandeId",
  164:         title: "Lignes de commande",
  165:         displayIn: ["detail", "edit"],
  166:         lazy: true,
  167:         position: "after",
  168:         allowCreate: true,
  169:         labelFields: ["produitId", "quantiteCommandee", "prixUnitaireHT", "statut"],
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: statut :: line 94

```ts
   88:         type: "number",
   89:         defaultValue: 0,
   90:         list: { visible: true, order: 4 },
   91:         grid: { cols: 4 },
   92:       },
   93: {
   94:         key: "statut",
   95:         label: "Statut",
   96:         type: "select",
   97:         defaultValue: "brouillon",
   98:         options: [
   99:           { label: "Brouillon", value: "brouillon" },
  100:           { label: "Envoyee", value: "envoyee" },
  101:           { label: "Partiellement recue", value: "partiellement_recue" },
  102:           { label: "Recue", value: "recue" },
  103:           { label: "Annulee", value: "annulee" },
  104:         ],
  105:         list: { visible: true, order: 5 },
  106:         grid: { cols: 4 },
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: statut :: line 131

```ts
  125:           "numeroCommande",
  126:           "fournisseurId",
  127:           "dateCommande",
  128:           "dateLivraisonPrevue",
  129:           "montantHT",
  130:           "montantTTC",
  131:           "statut",
  132:           "notes",
  133:         ],
  134:         sections: [
  135:           {
  136:             key: "general",
  137:             title: "Commande fournisseur",
  138:             fields: [
  139:               "numeroCommande",
  140:               "fournisseurId",
  141:               "dateCommande",
  142:               "dateLivraisonPrevue",
  143:               "montantHT",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: statut :: line 145

```ts
  139:               "numeroCommande",
  140:               "fournisseurId",
  141:               "dateCommande",
  142:               "dateLivraisonPrevue",
  143:               "montantHT",
  144:               "montantTTC",
  145:               "statut",
  146:               "notes",
  147:             ],
  148:           },
  149:         ],
  150:       },
  151:     ],
  152:   },
  153: 
  154:   composition: {
  155:     // Q21E_B_STOCK_ORDER_RELATIONSHIP_COMPOSITION
  156:     // Commande stock knows its lines and receptions.
  157:     labelFields: ["numeroCommande", "fournisseurId", "statut"],
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: statut :: line 157

```ts
  151:     ],
  152:   },
  153: 
  154:   composition: {
  155:     // Q21E_B_STOCK_ORDER_RELATIONSHIP_COMPOSITION
  156:     // Commande stock knows its lines and receptions.
  157:     labelFields: ["numeroCommande", "fournisseurId", "statut"],
  158: 
  159:     children: [
  160:       {
  161:         key: "lignes-commandestock",
  162:         moduleKey: "lignescommandestockauto",
  163:         foreignKey: "commandeId",
  164:         title: "Lignes de commande",
  165:         displayIn: ["detail", "edit"],
  166:         lazy: true,
  167:         position: "after",
  168:         allowCreate: true,
  169:         labelFields: ["produitId", "quantiteCommandee", "prixUnitaireHT", "statut"],
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: statut :: line 169

```ts
  163:         foreignKey: "commandeId",
  164:         title: "Lignes de commande",
  165:         displayIn: ["detail", "edit"],
  166:         lazy: true,
  167:         position: "after",
  168:         allowCreate: true,
  169:         labelFields: ["produitId", "quantiteCommandee", "prixUnitaireHT", "statut"],
  170:         subtitleFields: ["designation", "montantHT", "montantTTC"],
  171:         totalField: "montantTTC",
  172:         relations: [
  173:           {
  174:             field: "produitId",
  175:             moduleKey: "produitsauto",
  176:             labelFields: ["reference", "nom", "designation", "marque"],
  177:           },
  178:         ],
  179:       },
  180:       {
  181:         key: "receptions-stock",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: montantHT :: line 78

```ts
   72:         label: "Date livraison prevue",
   73:         type: "date",
   74:         list: { visible: false },
   75:         grid: { cols: 4 },
   76:       },
   77: {
   78:         key: "montantHT",
   79:         label: "Montant HT",
   80:         type: "number",
   81:         defaultValue: 0,
   82:         list: { visible: false },
   83:         grid: { cols: 4 },
   84:       },
   85: {
   86:         key: "montantTTC",
   87:         label: "Montant TTC",
   88:         type: "number",
   89:         defaultValue: 0,
   90:         list: { visible: true, order: 4 },
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: montantHT :: line 129

```ts
  123:         label: "Commande",
  124:         fields: [
  125:           "numeroCommande",
  126:           "fournisseurId",
  127:           "dateCommande",
  128:           "dateLivraisonPrevue",
  129:           "montantHT",
  130:           "montantTTC",
  131:           "statut",
  132:           "notes",
  133:         ],
  134:         sections: [
  135:           {
  136:             key: "general",
  137:             title: "Commande fournisseur",
  138:             fields: [
  139:               "numeroCommande",
  140:               "fournisseurId",
  141:               "dateCommande",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: montantHT :: line 143

```ts
  137:             title: "Commande fournisseur",
  138:             fields: [
  139:               "numeroCommande",
  140:               "fournisseurId",
  141:               "dateCommande",
  142:               "dateLivraisonPrevue",
  143:               "montantHT",
  144:               "montantTTC",
  145:               "statut",
  146:               "notes",
  147:             ],
  148:           },
  149:         ],
  150:       },
  151:     ],
  152:   },
  153: 
  154:   composition: {
  155:     // Q21E_B_STOCK_ORDER_RELATIONSHIP_COMPOSITION
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: montantHT :: line 170

```ts
  164:         title: "Lignes de commande",
  165:         displayIn: ["detail", "edit"],
  166:         lazy: true,
  167:         position: "after",
  168:         allowCreate: true,
  169:         labelFields: ["produitId", "quantiteCommandee", "prixUnitaireHT", "statut"],
  170:         subtitleFields: ["designation", "montantHT", "montantTTC"],
  171:         totalField: "montantTTC",
  172:         relations: [
  173:           {
  174:             field: "produitId",
  175:             moduleKey: "produitsauto",
  176:             labelFields: ["reference", "nom", "designation", "marque"],
  177:           },
  178:         ],
  179:       },
  180:       {
  181:         key: "receptions-stock",
  182:         moduleKey: "receptionsstockauto",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: montantTTC :: line 86

```ts
   80:         type: "number",
   81:         defaultValue: 0,
   82:         list: { visible: false },
   83:         grid: { cols: 4 },
   84:       },
   85: {
   86:         key: "montantTTC",
   87:         label: "Montant TTC",
   88:         type: "number",
   89:         defaultValue: 0,
   90:         list: { visible: true, order: 4 },
   91:         grid: { cols: 4 },
   92:       },
   93: {
   94:         key: "statut",
   95:         label: "Statut",
   96:         type: "select",
   97:         defaultValue: "brouillon",
   98:         options: [
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: montantTTC :: line 130

```ts
  124:         fields: [
  125:           "numeroCommande",
  126:           "fournisseurId",
  127:           "dateCommande",
  128:           "dateLivraisonPrevue",
  129:           "montantHT",
  130:           "montantTTC",
  131:           "statut",
  132:           "notes",
  133:         ],
  134:         sections: [
  135:           {
  136:             key: "general",
  137:             title: "Commande fournisseur",
  138:             fields: [
  139:               "numeroCommande",
  140:               "fournisseurId",
  141:               "dateCommande",
  142:               "dateLivraisonPrevue",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: montantTTC :: line 144

```ts
  138:             fields: [
  139:               "numeroCommande",
  140:               "fournisseurId",
  141:               "dateCommande",
  142:               "dateLivraisonPrevue",
  143:               "montantHT",
  144:               "montantTTC",
  145:               "statut",
  146:               "notes",
  147:             ],
  148:           },
  149:         ],
  150:       },
  151:     ],
  152:   },
  153: 
  154:   composition: {
  155:     // Q21E_B_STOCK_ORDER_RELATIONSHIP_COMPOSITION
  156:     // Commande stock knows its lines and receptions.
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: montantTTC :: line 170

```ts
  164:         title: "Lignes de commande",
  165:         displayIn: ["detail", "edit"],
  166:         lazy: true,
  167:         position: "after",
  168:         allowCreate: true,
  169:         labelFields: ["produitId", "quantiteCommandee", "prixUnitaireHT", "statut"],
  170:         subtitleFields: ["designation", "montantHT", "montantTTC"],
  171:         totalField: "montantTTC",
  172:         relations: [
  173:           {
  174:             field: "produitId",
  175:             moduleKey: "produitsauto",
  176:             labelFields: ["reference", "nom", "designation", "marque"],
  177:           },
  178:         ],
  179:       },
  180:       {
  181:         key: "receptions-stock",
  182:         moduleKey: "receptionsstockauto",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: montantTTC :: line 171

```ts
  165:         displayIn: ["detail", "edit"],
  166:         lazy: true,
  167:         position: "after",
  168:         allowCreate: true,
  169:         labelFields: ["produitId", "quantiteCommandee", "prixUnitaireHT", "statut"],
  170:         subtitleFields: ["designation", "montantHT", "montantTTC"],
  171:         totalField: "montantTTC",
  172:         relations: [
  173:           {
  174:             field: "produitId",
  175:             moduleKey: "produitsauto",
  176:             labelFields: ["reference", "nom", "designation", "marque"],
  177:           },
  178:         ],
  179:       },
  180:       {
  181:         key: "receptions-stock",
  182:         moduleKey: "receptionsstockauto",
  183:         foreignKey: "commandeId",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: runtimeOnly :: line 29

```ts
   23: 
   24:   actions: [
   25:     {
   26:       key: "envoyer-commande",
   27:       label: "Envoyer commande",
   28:       type: "primary",
   29:       runtimeOnly: true,
   30:     },
   31:     {
   32:       key: "annuler-commande",
   33:       label: "Annuler commande",
   34:       type: "danger",
   35:       runtimeOnly: true,
   36:     },
   37:   ],
   38: 
   39: 
   40: 
   41:   schema: {
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: runtimeOnly :: line 35

```ts
   29:       runtimeOnly: true,
   30:     },
   31:     {
   32:       key: "annuler-commande",
   33:       label: "Annuler commande",
   34:       type: "danger",
   35:       runtimeOnly: true,
   36:     },
   37:   ],
   38: 
   39: 
   40: 
   41:   schema: {
   42:     collection: "commandesstockauto",
   43:     fields: [
   44: {
   45:         key: "numeroCommande",
   46:         label: "Numero commande",
   47:         type: "text",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: type: :: line 28

```ts
   22:   },
   23: 
   24:   actions: [
   25:     {
   26:       key: "envoyer-commande",
   27:       label: "Envoyer commande",
   28:       type: "primary",
   29:       runtimeOnly: true,
   30:     },
   31:     {
   32:       key: "annuler-commande",
   33:       label: "Annuler commande",
   34:       type: "danger",
   35:       runtimeOnly: true,
   36:     },
   37:   ],
   38: 
   39: 
   40: 
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: type: :: line 34

```ts
   28:       type: "primary",
   29:       runtimeOnly: true,
   30:     },
   31:     {
   32:       key: "annuler-commande",
   33:       label: "Annuler commande",
   34:       type: "danger",
   35:       runtimeOnly: true,
   36:     },
   37:   ],
   38: 
   39: 
   40: 
   41:   schema: {
   42:     collection: "commandesstockauto",
   43:     fields: [
   44: {
   45:         key: "numeroCommande",
   46:         label: "Numero commande",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: type: :: line 47

```ts
   41:   schema: {
   42:     collection: "commandesstockauto",
   43:     fields: [
   44: {
   45:         key: "numeroCommande",
   46:         label: "Numero commande",
   47:         type: "text",
   48:         searchable: true,
   49:         list: { visible: true, order: 1 },
   50:         grid: { cols: 4 },
   51:       },
   52: {
   53:         key: "fournisseurId",
   54:         label: "Fournisseur",
   55:         type: "relation",
   56:         relation: { module: "fournisseursauto" },
   57:         required: true,
   58:         searchable: true,
   59:         list: { visible: true, order: 2 },
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: type: :: line 55

```ts
   49:         list: { visible: true, order: 1 },
   50:         grid: { cols: 4 },
   51:       },
   52: {
   53:         key: "fournisseurId",
   54:         label: "Fournisseur",
   55:         type: "relation",
   56:         relation: { module: "fournisseursauto" },
   57:         required: true,
   58:         searchable: true,
   59:         list: { visible: true, order: 2 },
   60:         grid: { cols: 4 },
   61:       },
   62: {
   63:         key: "dateCommande",
   64:         label: "Date commande",
   65:         type: "date",
   66:         required: true,
   67:         list: { visible: true, order: 3 },
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: type: :: line 65

```ts
   59:         list: { visible: true, order: 2 },
   60:         grid: { cols: 4 },
   61:       },
   62: {
   63:         key: "dateCommande",
   64:         label: "Date commande",
   65:         type: "date",
   66:         required: true,
   67:         list: { visible: true, order: 3 },
   68:         grid: { cols: 4 },
   69:       },
   70: {
   71:         key: "dateLivraisonPrevue",
   72:         label: "Date livraison prevue",
   73:         type: "date",
   74:         list: { visible: false },
   75:         grid: { cols: 4 },
   76:       },
   77: {
```

## Prochaine passe

- Ajouter `actions` metadata dans `receptionsstockauto` si absentes.
- Ajouter `actions` metadata dans `commandesstockauto` si absentes.
- Ne pas toucher aux formulaires.
- Ne pas ajouter de logique locale page par page.