# Q2-OP-I16-C1 — Audit actions rendezvous / interventionsauto

Objectif : vérifier précisément les actions runtime manquantes dans `rendezvous` et `interventionsauto` avant enrichissement metadata.

## Résumé

- OK : 20
- WARN : 13
- WARN HIGH : 0
- FAIL : 0
- FAIL HIGH : 0

## Checks

| Area | Status | Severity | File | Lines | Message |
|---|---:|---:|---|---|---|
| module-file | OK | HIGH | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous module file found |
| actions-block | OK | HIGH | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 5, 230 | rendezvous actions block found |
| expected-action-key | WARN | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous expected action marker "reporter-rdv" missing |
| expected-action-key | WARN | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous expected action marker "reporter" missing |
| expected-action-label | WARN | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous expected action label "Reporter RDV" missing |
| expected-action-label | WARN | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous expected action label "Reporter rendez-vous" missing |
| expected-status | WARN | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous status marker "demande" missing |
| expected-status | OK | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 161, 251, 254, 283, 358, 362, 388, 468, 475, 476, 479 | rendezvous status marker "confirme" found |
| expected-status | OK | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 164, 267, 270, 286, 471, 478, 479, 480 | rendezvous status marker "annule" found |
| expected-status | WARN | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous status marker "realise" missing |
| expected-field | OK | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 79, 183, 197, 315, 381, 401 | rendezvous field marker "dateRendezVous" found |
| expected-field | OK | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 87, 184, 198, 316, 382, 401 | rendezvous field marker "heureRendezVous" found |
| expected-field | OK | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 95, 185, 199, 383 | rendezvous field marker "durationMinutes" found |
| expected-field | OK | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 126, 186, 200, 290, 292, 319, 401 | rendezvous field marker "typeService" found |
| expected-field | OK | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 62, 182, 196, 303, 305, 318, 328, 387, 401, 413, 437, 437, 439, 441, 450 | rendezvous field marker "vehiculeId" found |
| expected-field | OK | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 52, 68, 69, 181, 195, 317, 323, 401, 407, 436, 436, 439, 441, 445 | rendezvous field marker "clientId" found |
| runtime-action-contract | WARN | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous runtimeOnly marker not found |
| module-file | OK | HIGH | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto module file found |
| actions-block | OK | HIGH | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 5, 620 | interventionsauto actions block found |
| expected-action-key | WARN | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto expected action marker "demarrer-intervention" missing |
| expected-action-key | WARN | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto expected action marker "demarrer" missing |
| expected-action-label | WARN | LOW | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto expected action label "Demarrer intervention" missing |
| expected-action-label | WARN | LOW | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto expected action label "Démarrer intervention" missing |
| expected-status | WARN | LOW | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto status marker "planifiee" missing |
| expected-status | OK | LOW | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 135, 255, 258, 288, 368, 372, 631, 639, 640 | interventionsauto status marker "en_cours" found |
| expected-status | OK | LOW | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 136, 263, 266, 289, 632, 640, 641 | interventionsauto status marker "terminee" found |
| expected-status | OK | LOW | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 138, 271, 274, 291, 634, 642 | interventionsauto status marker "annulee" found |
| expected-field | OK | LOW | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 34, 155, 169, 309, 311, 320, 329, 393, 434, 464, 492, 509, 518, 598, 598, 601, 603, 607 | interventionsauto field marker "clientId" found |
| expected-field | OK | LOW | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 44, 156, 170, 321, 334, 403, 443, 481, 510, 519, 599, 599, 601, 603, 612 | interventionsauto field marker "vehiculeId" found |
| expected-field | OK | LOW | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 63, 158, 172, 322, 427, 527 | interventionsauto field marker "dateIntervention" found |
| expected-field | OK | LOW | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 121, 209, 219, 325, 379, 523 | interventionsauto field marker "coutTotal" found |
| expected-field | OK | LOW | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 128, 161, 175, 249, 257, 265, 273, 281, 283, 326, 371, 419, 429, 547, 552, 602 | interventionsauto field marker "statut" found |
| runtime-action-contract | WARN | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto runtimeOnly marker not found |

## Contextes utiles

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: actions :: line 5

```ts
    1: import type { ERPModule } from "@/runtime/modules/ERPModule";
    2: 
    3: import {
    4:   rendezvousActions,
    5: } from "./rendezvous.actions";
    6: 
    7: export const rendezvousModule: ERPModule = {
    8:   metadata: {
    9:     businessCode: {
   10:       field: "codeRendezVous",
   11:       prefix: "RDV",
   12:       sequenceScope: "year",
   13:       padLength: 6,
   14:       readonly: true,
   15:       required: true,
   16:     },
   17:     key: "rendezvous",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: actions :: line 230

```ts
  224:           },
  225:         ],
  226:       },
  227:     ],
  228:   },
  229: 
  230:   actions: rendezvousActions,
  231: 
  232:   operational: {
  233:     enabled: true,
  234:     title: "Rendez-vous",
  235:     subtitle: "Vue opérationnelle des rendez-vous atelier.",
  236:     branding: {
  237:       brandName: "AMARKHYS",
  238:       runtimeLabel: "Runtime ERP",
  239:       eyebrow: "AMARKHYS · Runtime ERP",
  240:     },
  241:     kpis: [
  242:       {
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: confirme :: line 161

```ts
  155:         key: "statut",
  156:         label: "Statut",
  157:         type: "select",
  158:         defaultValue: "planifie",
  159:         options: [
  160:           { label: "Planifié", value: "planifie" },
  161:           { label: "Confirmé", value: "confirme" },
  162:           { label: "En cours", value: "en_cours" },
  163:           { label: "Terminé", value: "termine" },
  164:           { label: "Annulé", value: "annule" },
  165:         ],
  166:         list: { visible: true, order: 7 },
  167:         grid: { cols: 6 },
  168:       }
  169:     ],
  170:   },
  171: 
  172:   form: {
  173:     layout: "tabs",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: confirme :: line 251

```ts
  245:         count: true,
  246:         tone: "blue",
  247:         icon: "calendar",
  248:         description: "Nombre total de rendez-vous affichés.",
  249:       },
  250:       {
  251:         key: "confirmes",
  252:         label: "Confirmés",
  253:         field: "statut",
  254:         equals: "confirme",
  255:         tone: "green",
  256:         icon: "check",
  257:       },
  258:       {
  259:         key: "en_cours",
  260:         label: "En cours",
  261:         field: "statut",
  262:         equals: "en_cours",
  263:         tone: "orange",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: confirme :: line 254

```ts
  248:         description: "Nombre total de rendez-vous affichés.",
  249:       },
  250:       {
  251:         key: "confirmes",
  252:         label: "Confirmés",
  253:         field: "statut",
  254:         equals: "confirme",
  255:         tone: "green",
  256:         icon: "check",
  257:       },
  258:       {
  259:         key: "en_cours",
  260:         label: "En cours",
  261:         field: "statut",
  262:         equals: "en_cours",
  263:         tone: "orange",
  264:         icon: "clock",
  265:       },
  266:       {
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: confirme :: line 283

```ts
  277:         key: "statut",
  278:         label: "Statut",
  279:         field: "statut",
  280:         type: "select",
  281:         options: [
  282:           { label: "Planifié", value: "planifie" },
  283:           { label: "Confirmé", value: "confirme" },
  284:           { label: "En cours", value: "en_cours" },
  285:           { label: "Terminé", value: "termine" },
  286:           { label: "Annulé", value: "annule" },
  287:         ],
  288:       },
  289:       {
  290:         key: "typeService",
  291:         label: "Type de service",
  292:         field: "typeService",
  293:         type: "select",
  294:         options: [
  295:           { label: "Vidange", value: "vidange" },
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: confirme :: line 358

```ts
  352:           key: "total",
  353:           label: "Rendez-vous affichés",
  354:           type: "count",
  355:           format: "number",
  356:         },
  357:         {
  358:           key: "confirmes",
  359:           label: "Confirmés",
  360:           type: "countWhere",
  361:           field: "statut",
  362:           equals: "confirme",
  363:           format: "number",
  364:         },
  365:         {
  366:           key: "en_cours",
  367:           label: "En cours",
  368:           type: "countWhere",
  369:           field: "statut",
  370:           equals: "en_cours",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: annule :: line 164

```ts
  158:         defaultValue: "planifie",
  159:         options: [
  160:           { label: "Planifié", value: "planifie" },
  161:           { label: "Confirmé", value: "confirme" },
  162:           { label: "En cours", value: "en_cours" },
  163:           { label: "Terminé", value: "termine" },
  164:           { label: "Annulé", value: "annule" },
  165:         ],
  166:         list: { visible: true, order: 7 },
  167:         grid: { cols: 6 },
  168:       }
  169:     ],
  170:   },
  171: 
  172:   form: {
  173:     layout: "tabs",
  174: 
  175:     tabs: [
  176:       {
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: annule :: line 267

```ts
  261:         field: "statut",
  262:         equals: "en_cours",
  263:         tone: "orange",
  264:         icon: "clock",
  265:       },
  266:       {
  267:         key: "annules",
  268:         label: "Annulés",
  269:         field: "statut",
  270:         equals: "annule",
  271:         tone: "gray",
  272:         icon: "x",
  273:       },
  274:     ],
  275:     filters: [
  276:       {
  277:         key: "statut",
  278:         label: "Statut",
  279:         field: "statut",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: annule :: line 270

```ts
  264:         icon: "clock",
  265:       },
  266:       {
  267:         key: "annules",
  268:         label: "Annulés",
  269:         field: "statut",
  270:         equals: "annule",
  271:         tone: "gray",
  272:         icon: "x",
  273:       },
  274:     ],
  275:     filters: [
  276:       {
  277:         key: "statut",
  278:         label: "Statut",
  279:         field: "statut",
  280:         type: "select",
  281:         options: [
  282:           { label: "Planifié", value: "planifie" },
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: annule :: line 286

```ts
  280:         type: "select",
  281:         options: [
  282:           { label: "Planifié", value: "planifie" },
  283:           { label: "Confirmé", value: "confirme" },
  284:           { label: "En cours", value: "en_cours" },
  285:           { label: "Terminé", value: "termine" },
  286:           { label: "Annulé", value: "annule" },
  287:         ],
  288:       },
  289:       {
  290:         key: "typeService",
  291:         label: "Type de service",
  292:         field: "typeService",
  293:         type: "select",
  294:         options: [
  295:           { label: "Vidange", value: "vidange" },
  296:           { label: "Diagnostic", value: "diagnostic" },
  297:           { label: "Réparation", value: "reparation" },
  298:           { label: "Contrôle", value: "controle" },
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: annule :: line 471

```ts
  465: 
  466:       states: [
  467:         { key: "planifie", label: "Planifié", color: "default" },
  468:         { key: "confirme", label: "Confirmé", color: "success" },
  469:         { key: "en_cours", label: "En cours", color: "warning" },
  470:         { key: "termine", label: "Terminé", color: "success" },
  471:         { key: "annule", label: "Annulé", color: "danger" },
  472:       ],
  473: 
  474:       transitions: [
  475:         { from: "planifie", to: "confirme", action: "Confirmer" },
  476:         { from: "confirme", to: "en_cours", action: "Démarrer" },
  477:         { from: "en_cours", to: "termine", action: "Terminer" },
  478:         { from: "planifie", to: "annule", action: "Annuler" },
  479:         { from: "confirme", to: "annule", action: "Annuler" },
  480:         { from: "en_cours", to: "annule", action: "Annuler" },
  481:       ],
  482:     },
  483:   ],
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: dateRendezVous :: line 79

```ts
   73:         required: true,
   74:         searchable: true,
   75:         list: { visible: true, order: 3 },
   76:         grid: { cols: 6 },
   77:       },
   78: {
   79:         key: "dateRendezVous",
   80:         label: "Date rendez-vous",
   81:         type: "date",
   82:         required: true,
   83:         list: { visible: true, order: 4 },
   84:         grid: { cols: 4 },
   85:       },
   86: {
   87:         key: "heureRendezVous",
   88:         label: "Heure",
   89:         type: "text",
   90:         required: true,
   91:         list: { visible: true, order: 5 },
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: dateRendezVous :: line 183

```ts
  177:         key: "planification",
  178:         label: "Planification",
  179: 
  180:         fields: [
  181:           "clientId",
  182:           "vehiculeId",
  183:           "dateRendezVous",
  184:           "heureRendezVous",
  185:           "durationMinutes",
  186:           "typeService",
  187:           "statut",
  188:         ],
  189: 
  190:         sections: [
  191:           {
  192:             key: "rdv",
  193:             title: "Rendez-vous",
  194:             fields: [
  195:               "clientId",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: dateRendezVous :: line 197

```ts
  191:           {
  192:             key: "rdv",
  193:             title: "Rendez-vous",
  194:             fields: [
  195:               "clientId",
  196:               "vehiculeId",
  197:               "dateRendezVous",
  198:               "heureRendezVous",
  199:               "durationMinutes",
  200:               "typeService",
  201:               "statut",
  202:             ],
  203:           },
  204:         ],
  205:       },
  206: 
  207:       {
  208:         key: "details",
  209:         label: "Détails",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: dateRendezVous :: line 315

```ts
  309:     table: {
  310:       enableSearch: true,
  311:       enableSelection: true,
  312:       enableDensityToggle: true,
  313:       fields: [
  314:         "codeRendezVous",
  315:         "dateRendezVous",
  316:         "heureRendezVous",
  317:         "clientId",
  318:         "vehiculeId",
  319:         "typeService",
  320:         "statut",
  321:       ],
  322:       relationLabelFields: {
  323:         clientId: [
  324:           "nom",
  325:           "prenom",
  326:           "telephone",
  327:         ],
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: dateRendezVous :: line 381

```ts
  375:   },
  376: 
  377:   scheduling: {
  378:     // Q22D3A_RENDEZVOUS_SCHEDULING_METADATA
  379:     // First consumer of the generic ERP Scheduling Runtime.
  380:     enabled: true,
  381:     dateField: "dateRendezVous",
  382:     timeField: "heureRendezVous",
  383:     durationField: "durationMinutes",
  384:     startField: "startAt",
  385:     endField: "endAt",
  386:     statusField: "statut",
  387:     resourceField: "vehiculeId",
  388:     blockingStatuses: ["planifie", "confirme", "en_cours"],
  389:     bufferMinutes: 15,
  390:     capacity: 1,
  391: 
  392:     calendarExceptions: [
  393:       // Q22F2A_RENDEZVOUS_CALENDAR_EXCEPTIONS_EXAMPLE
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: heureRendezVous :: line 87

```ts
   81:         type: "date",
   82:         required: true,
   83:         list: { visible: true, order: 4 },
   84:         grid: { cols: 4 },
   85:       },
   86: {
   87:         key: "heureRendezVous",
   88:         label: "Heure",
   89:         type: "text",
   90:         required: true,
   91:         list: { visible: true, order: 5 },
   92:         grid: { cols: 4 },
   93:       },
   94: {
   95:         key: "durationMinutes",
   96:         label: "Durée prévue",
   97:         type: "number",
   98:         defaultValue: 60,
   99:         list: { visible: false },
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: heureRendezVous :: line 184

```ts
  178:         label: "Planification",
  179: 
  180:         fields: [
  181:           "clientId",
  182:           "vehiculeId",
  183:           "dateRendezVous",
  184:           "heureRendezVous",
  185:           "durationMinutes",
  186:           "typeService",
  187:           "statut",
  188:         ],
  189: 
  190:         sections: [
  191:           {
  192:             key: "rdv",
  193:             title: "Rendez-vous",
  194:             fields: [
  195:               "clientId",
  196:               "vehiculeId",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: heureRendezVous :: line 198

```ts
  192:             key: "rdv",
  193:             title: "Rendez-vous",
  194:             fields: [
  195:               "clientId",
  196:               "vehiculeId",
  197:               "dateRendezVous",
  198:               "heureRendezVous",
  199:               "durationMinutes",
  200:               "typeService",
  201:               "statut",
  202:             ],
  203:           },
  204:         ],
  205:       },
  206: 
  207:       {
  208:         key: "details",
  209:         label: "Détails",
  210: 
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: heureRendezVous :: line 316

```ts
  310:       enableSearch: true,
  311:       enableSelection: true,
  312:       enableDensityToggle: true,
  313:       fields: [
  314:         "codeRendezVous",
  315:         "dateRendezVous",
  316:         "heureRendezVous",
  317:         "clientId",
  318:         "vehiculeId",
  319:         "typeService",
  320:         "statut",
  321:       ],
  322:       relationLabelFields: {
  323:         clientId: [
  324:           "nom",
  325:           "prenom",
  326:           "telephone",
  327:         ],
  328:         vehiculeId: [
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: heureRendezVous :: line 382

```ts
  376: 
  377:   scheduling: {
  378:     // Q22D3A_RENDEZVOUS_SCHEDULING_METADATA
  379:     // First consumer of the generic ERP Scheduling Runtime.
  380:     enabled: true,
  381:     dateField: "dateRendezVous",
  382:     timeField: "heureRendezVous",
  383:     durationField: "durationMinutes",
  384:     startField: "startAt",
  385:     endField: "endAt",
  386:     statusField: "statut",
  387:     resourceField: "vehiculeId",
  388:     blockingStatuses: ["planifie", "confirme", "en_cours"],
  389:     bufferMinutes: 15,
  390:     capacity: 1,
  391: 
  392:     calendarExceptions: [
  393:       // Q22F2A_RENDEZVOUS_CALENDAR_EXCEPTIONS_EXAMPLE
  394:       // Exemple générique désactivé : à remplacer plus tard par une configuration tenant/workspace.
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: durationMinutes :: line 95

```ts
   89:         type: "text",
   90:         required: true,
   91:         list: { visible: true, order: 5 },
   92:         grid: { cols: 4 },
   93:       },
   94: {
   95:         key: "durationMinutes",
   96:         label: "Durée prévue",
   97:         type: "number",
   98:         defaultValue: 60,
   99:         list: { visible: false },
  100:         grid: { cols: 4 },
  101:       },
  102: {
  103:         key: "startAt",
  104:         label: "Début créneau",
  105:         type: "text",
  106:         list: { visible: false },
  107:         grid: { cols: 4 },
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: durationMinutes :: line 185

```ts
  179: 
  180:         fields: [
  181:           "clientId",
  182:           "vehiculeId",
  183:           "dateRendezVous",
  184:           "heureRendezVous",
  185:           "durationMinutes",
  186:           "typeService",
  187:           "statut",
  188:         ],
  189: 
  190:         sections: [
  191:           {
  192:             key: "rdv",
  193:             title: "Rendez-vous",
  194:             fields: [
  195:               "clientId",
  196:               "vehiculeId",
  197:               "dateRendezVous",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: durationMinutes :: line 199

```ts
  193:             title: "Rendez-vous",
  194:             fields: [
  195:               "clientId",
  196:               "vehiculeId",
  197:               "dateRendezVous",
  198:               "heureRendezVous",
  199:               "durationMinutes",
  200:               "typeService",
  201:               "statut",
  202:             ],
  203:           },
  204:         ],
  205:       },
  206: 
  207:       {
  208:         key: "details",
  209:         label: "Détails",
  210: 
  211:         fields: [
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: durationMinutes :: line 383

```ts
  377:   scheduling: {
  378:     // Q22D3A_RENDEZVOUS_SCHEDULING_METADATA
  379:     // First consumer of the generic ERP Scheduling Runtime.
  380:     enabled: true,
  381:     dateField: "dateRendezVous",
  382:     timeField: "heureRendezVous",
  383:     durationField: "durationMinutes",
  384:     startField: "startAt",
  385:     endField: "endAt",
  386:     statusField: "statut",
  387:     resourceField: "vehiculeId",
  388:     blockingStatuses: ["planifie", "confirme", "en_cours"],
  389:     bufferMinutes: 15,
  390:     capacity: 1,
  391: 
  392:     calendarExceptions: [
  393:       // Q22F2A_RENDEZVOUS_CALENDAR_EXCEPTIONS_EXAMPLE
  394:       // Exemple générique désactivé : à remplacer plus tard par une configuration tenant/workspace.
  395:       // { date: "2026-01-01", isClosed: true, reason: "Jour fermé" },
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: typeService :: line 126

```ts
  120:         relation: { module: "interventionsauto" },
  121:         searchable: true,
  122:         list: { visible: false },
  123:         grid: { cols: 4 },
  124:       },
  125: {
  126:         key: "typeService",
  127:         label: "Type service",
  128:       required: true,
  129:         type: "select",
  130:         options: [
  131:           { label: "Vidange", value: "vidange" },
  132:           { label: "Diagnostic", value: "diagnostic" },
  133:           { label: "Réparation", value: "reparation" },
  134:           { label: "Contrôle", value: "controle" },
  135:           { label: "Autre", value: "autre" },
  136:         ],
  137:         list: { visible: true, order: 6 },
  138:         grid: { cols: 4 },
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: typeService :: line 186

```ts
  180:         fields: [
  181:           "clientId",
  182:           "vehiculeId",
  183:           "dateRendezVous",
  184:           "heureRendezVous",
  185:           "durationMinutes",
  186:           "typeService",
  187:           "statut",
  188:         ],
  189: 
  190:         sections: [
  191:           {
  192:             key: "rdv",
  193:             title: "Rendez-vous",
  194:             fields: [
  195:               "clientId",
  196:               "vehiculeId",
  197:               "dateRendezVous",
  198:               "heureRendezVous",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: typeService :: line 200

```ts
  194:             fields: [
  195:               "clientId",
  196:               "vehiculeId",
  197:               "dateRendezVous",
  198:               "heureRendezVous",
  199:               "durationMinutes",
  200:               "typeService",
  201:               "statut",
  202:             ],
  203:           },
  204:         ],
  205:       },
  206: 
  207:       {
  208:         key: "details",
  209:         label: "Détails",
  210: 
  211:         fields: [
  212:           "motif",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: typeService :: line 290

```ts
  284:           { label: "En cours", value: "en_cours" },
  285:           { label: "Terminé", value: "termine" },
  286:           { label: "Annulé", value: "annule" },
  287:         ],
  288:       },
  289:       {
  290:         key: "typeService",
  291:         label: "Type de service",
  292:         field: "typeService",
  293:         type: "select",
  294:         options: [
  295:           { label: "Vidange", value: "vidange" },
  296:           { label: "Diagnostic", value: "diagnostic" },
  297:           { label: "Réparation", value: "reparation" },
  298:           { label: "Contrôle", value: "controle" },
  299:           { label: "Autre", value: "autre" },
  300:         ],
  301:       },
  302:       {
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: typeService :: line 292

```ts
  286:           { label: "Annulé", value: "annule" },
  287:         ],
  288:       },
  289:       {
  290:         key: "typeService",
  291:         label: "Type de service",
  292:         field: "typeService",
  293:         type: "select",
  294:         options: [
  295:           { label: "Vidange", value: "vidange" },
  296:           { label: "Diagnostic", value: "diagnostic" },
  297:           { label: "Réparation", value: "reparation" },
  298:           { label: "Contrôle", value: "controle" },
  299:           { label: "Autre", value: "autre" },
  300:         ],
  301:       },
  302:       {
  303:         key: "vehiculeId",
  304:         label: "Véhicule",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: vehiculeId :: line 62

```ts
   56:         required: true,
   57:         searchable: true,
   58:         list: { visible: true, order: 2 },
   59:         grid: { cols: 6 },
   60:       },
   61: {
   62:         key: "vehiculeId",
   63:         label: "Véhicule",
   64:         type: "relation",
   65:         relation: {
   66:           module: "vehicules",
   67:           filterBy: {
   68:             sourceField: "clientId",
   69:             targetField: "clientId",
   70:             includeEmptyTarget: true,
   71:           },
   72:         },
   73:         required: true,
   74:         searchable: true,
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: vehiculeId :: line 182

```ts
  176:       {
  177:         key: "planification",
  178:         label: "Planification",
  179: 
  180:         fields: [
  181:           "clientId",
  182:           "vehiculeId",
  183:           "dateRendezVous",
  184:           "heureRendezVous",
  185:           "durationMinutes",
  186:           "typeService",
  187:           "statut",
  188:         ],
  189: 
  190:         sections: [
  191:           {
  192:             key: "rdv",
  193:             title: "Rendez-vous",
  194:             fields: [
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: vehiculeId :: line 196

```ts
  190:         sections: [
  191:           {
  192:             key: "rdv",
  193:             title: "Rendez-vous",
  194:             fields: [
  195:               "clientId",
  196:               "vehiculeId",
  197:               "dateRendezVous",
  198:               "heureRendezVous",
  199:               "durationMinutes",
  200:               "typeService",
  201:               "statut",
  202:             ],
  203:           },
  204:         ],
  205:       },
  206: 
  207:       {
  208:         key: "details",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: vehiculeId :: line 303

```ts
  297:           { label: "Réparation", value: "reparation" },
  298:           { label: "Contrôle", value: "controle" },
  299:           { label: "Autre", value: "autre" },
  300:         ],
  301:       },
  302:       {
  303:         key: "vehiculeId",
  304:         label: "Véhicule",
  305:         field: "vehiculeId",
  306:         type: "relation",
  307:       },
  308:     ],
  309:     table: {
  310:       enableSearch: true,
  311:       enableSelection: true,
  312:       enableDensityToggle: true,
  313:       fields: [
  314:         "codeRendezVous",
  315:         "dateRendezVous",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: vehiculeId :: line 305

```ts
  299:           { label: "Autre", value: "autre" },
  300:         ],
  301:       },
  302:       {
  303:         key: "vehiculeId",
  304:         label: "Véhicule",
  305:         field: "vehiculeId",
  306:         type: "relation",
  307:       },
  308:     ],
  309:     table: {
  310:       enableSearch: true,
  311:       enableSelection: true,
  312:       enableDensityToggle: true,
  313:       fields: [
  314:         "codeRendezVous",
  315:         "dateRendezVous",
  316:         "heureRendezVous",
  317:         "clientId",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: clientId :: line 52

```ts
   46:         unique: true,
   47:         searchable: true,
   48:         list: { visible: true, order: 1 },
   49:         grid: { cols: 4 },
   50:       },
   51: {
   52:         key: "clientId",
   53:         label: "Client",
   54:         type: "relation",
   55:         relation: { module: "clientsauto" },
   56:         required: true,
   57:         searchable: true,
   58:         list: { visible: true, order: 2 },
   59:         grid: { cols: 6 },
   60:       },
   61: {
   62:         key: "vehiculeId",
   63:         label: "Véhicule",
   64:         type: "relation",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: clientId :: line 68

```ts
   62:         key: "vehiculeId",
   63:         label: "Véhicule",
   64:         type: "relation",
   65:         relation: {
   66:           module: "vehicules",
   67:           filterBy: {
   68:             sourceField: "clientId",
   69:             targetField: "clientId",
   70:             includeEmptyTarget: true,
   71:           },
   72:         },
   73:         required: true,
   74:         searchable: true,
   75:         list: { visible: true, order: 3 },
   76:         grid: { cols: 6 },
   77:       },
   78: {
   79:         key: "dateRendezVous",
   80:         label: "Date rendez-vous",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: clientId :: line 69

```ts
   63:         label: "Véhicule",
   64:         type: "relation",
   65:         relation: {
   66:           module: "vehicules",
   67:           filterBy: {
   68:             sourceField: "clientId",
   69:             targetField: "clientId",
   70:             includeEmptyTarget: true,
   71:           },
   72:         },
   73:         required: true,
   74:         searchable: true,
   75:         list: { visible: true, order: 3 },
   76:         grid: { cols: 6 },
   77:       },
   78: {
   79:         key: "dateRendezVous",
   80:         label: "Date rendez-vous",
   81:         type: "date",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: clientId :: line 181

```ts
  175:     tabs: [
  176:       {
  177:         key: "planification",
  178:         label: "Planification",
  179: 
  180:         fields: [
  181:           "clientId",
  182:           "vehiculeId",
  183:           "dateRendezVous",
  184:           "heureRendezVous",
  185:           "durationMinutes",
  186:           "typeService",
  187:           "statut",
  188:         ],
  189: 
  190:         sections: [
  191:           {
  192:             key: "rdv",
  193:             title: "Rendez-vous",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: clientId :: line 195

```ts
  189: 
  190:         sections: [
  191:           {
  192:             key: "rdv",
  193:             title: "Rendez-vous",
  194:             fields: [
  195:               "clientId",
  196:               "vehiculeId",
  197:               "dateRendezVous",
  198:               "heureRendezVous",
  199:               "durationMinutes",
  200:               "typeService",
  201:               "statut",
  202:             ],
  203:           },
  204:         ],
  205:       },
  206: 
  207:       {
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: actions :: line 5

```ts
    1: import type { ERPModule } from "@/runtime/modules/ERPModule";
    2: 
    3: import {
    4:   interventionsautoActions,
    5: } from "./interventionsauto.actions";
    6: 
    7: export const interventionsautoModule: ERPModule = {
    8:   metadata: {
    9:     key: "interventionsauto",
   10:     label: "Interventions",
   11:     description: "Interventions atelier AMARKHYS",
   12:     icon: "wrench",
   13:     category: "amarkhys",
   14: 
   15:     features: {
   16:       dashboard: true,
   17:       analytics: true,
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: actions :: line 620

```ts
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: en_cours :: line 135

```ts
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: en_cours :: line 255

```ts
  249:         field: "statut",
  250:         equals: "ouverte",
  251:         tone: "blue",
  252:         icon: "calendar",
  253:       },
  254:       {
  255:         key: "en_cours",
  256:         label: "En cours",
  257:         field: "statut",
  258:         equals: "en_cours",
  259:         tone: "orange",
  260:         icon: "clock",
  261:       },
  262:       {
  263:         key: "terminees",
  264:         label: "Terminées",
  265:         field: "statut",
  266:         equals: "terminee",
  267:         tone: "green",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: en_cours :: line 258

```ts
  252:         icon: "calendar",
  253:       },
  254:       {
  255:         key: "en_cours",
  256:         label: "En cours",
  257:         field: "statut",
  258:         equals: "en_cours",
  259:         tone: "orange",
  260:         icon: "clock",
  261:       },
  262:       {
  263:         key: "terminees",
  264:         label: "Terminées",
  265:         field: "statut",
  266:         equals: "terminee",
  267:         tone: "green",
  268:         icon: "check",
  269:       },
  270:       {
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: en_cours :: line 288

```ts
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: en_cours :: line 368

```ts
  362:           key: "total",
  363:           label: "Interventions affichées",
  364:           type: "count",
  365:           format: "number",
  366:         },
  367:         {
  368:           key: "en_cours",
  369:           label: "En cours",
  370:           type: "countWhere",
  371:           field: "statut",
  372:           equals: "en_cours",
  373:           format: "number",
  374:         },
  375:         {
  376:           key: "cout_total",
  377:           label: "Coût total",
  378:           type: "sum",
  379:           field: "coutTotal",
  380:           format: "currency",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: terminee :: line 136

```ts
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: terminee :: line 263

```ts
  257:         field: "statut",
  258:         equals: "en_cours",
  259:         tone: "orange",
  260:         icon: "clock",
  261:       },
  262:       {
  263:         key: "terminees",
  264:         label: "Terminées",
  265:         field: "statut",
  266:         equals: "terminee",
  267:         tone: "green",
  268:         icon: "check",
  269:       },
  270:       {
  271:         key: "annulees",
  272:         label: "Annulées",
  273:         field: "statut",
  274:         equals: "annulee",
  275:         tone: "gray",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: terminee :: line 266

```ts
  260:         icon: "clock",
  261:       },
  262:       {
  263:         key: "terminees",
  264:         label: "Terminées",
  265:         field: "statut",
  266:         equals: "terminee",
  267:         tone: "green",
  268:         icon: "check",
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: terminee :: line 289

```ts
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: terminee :: line 632

```ts
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
  641:         { from: "terminee", to: "facturee", action: "Facturer" },
  642:         { from: "ouverte", to: "annulee", action: "Annuler" },
  643:       ],
  644:     },
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: annulee :: line 138

```ts
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: annulee :: line 271

```ts
  265:         field: "statut",
  266:         equals: "terminee",
  267:         tone: "green",
  268:         icon: "check",
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: annulee :: line 274

```ts
  268:         icon: "check",
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: annulee :: line 291

```ts
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: annulee :: line 634

```ts
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
  641:         { from: "terminee", to: "facturee", action: "Facturer" },
  642:         { from: "ouverte", to: "annulee", action: "Annuler" },
  643:       ],
  644:     },
  645:   ],
  646: };
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: clientId :: line 34

```ts
   28: 
   29:   schema: {
   30:     collection: "interventionsauto",
   31: 
   32:     fields: [
   33: {
   34:         key: "clientId",
   35:         label: "Client",
   36:         type: "relation",
   37:         relation: { module: "clientsauto" },
   38:         required: true,
   39:         searchable: true,
   40:         list: { visible: true, order: 1 },
   41:         grid: { cols: 6 },
   42:       },
   43: {
   44:         key: "vehiculeId",
   45:         label: "Véhicule",
   46:         type: "relation",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: clientId :: line 155

```ts
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
  164:         sections: [
  165:           {
  166:             key: "infos",
  167:             title: "Informations intervention",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: clientId :: line 169

```ts
  163: 
  164:         sections: [
  165:           {
  166:             key: "infos",
  167:             title: "Informations intervention",
  168:             fields: [
  169:               "clientId",
  170:               "vehiculeId",
  171:               "rendezVousId",
  172:               "dateIntervention",
  173:               "typeIntervention",
  174:               "kilometrage",
  175:               "statut",
  176:             ],
  177:           },
  178:         ],
  179:       },
  180: 
  181:       {
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: clientId :: line 309

```ts
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
  317:       enableSelection: true,
  318:       enableDensityToggle: true,
  319:       fields: [
  320:         "clientId",
  321:         "vehiculeId",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: clientId :: line 311

```ts
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
  317:       enableSelection: true,
  318:       enableDensityToggle: true,
  319:       fields: [
  320:         "clientId",
  321:         "vehiculeId",
  322:         "dateIntervention",
  323:         "typeIntervention",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: vehiculeId :: line 44

```ts
   38:         required: true,
   39:         searchable: true,
   40:         list: { visible: true, order: 1 },
   41:         grid: { cols: 6 },
   42:       },
   43: {
   44:         key: "vehiculeId",
   45:         label: "Véhicule",
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: vehiculeId :: line 156

```ts
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
  164:         sections: [
  165:           {
  166:             key: "infos",
  167:             title: "Informations intervention",
  168:             fields: [
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: vehiculeId :: line 170

```ts
  164:         sections: [
  165:           {
  166:             key: "infos",
  167:             title: "Informations intervention",
  168:             fields: [
  169:               "clientId",
  170:               "vehiculeId",
  171:               "rendezVousId",
  172:               "dateIntervention",
  173:               "typeIntervention",
  174:               "kilometrage",
  175:               "statut",
  176:             ],
  177:           },
  178:         ],
  179:       },
  180: 
  181:       {
  182:         key: "atelier",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: vehiculeId :: line 321

```ts
  315:     table: {
  316:       enableSearch: true,
  317:       enableSelection: true,
  318:       enableDensityToggle: true,
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: vehiculeId :: line 334

```ts
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
  338:         ],
  339:         rendezVousId: [
  340:           "dateRendezVous",
  341:           "heureRendezVous",
  342:           "typeService",
  343:         ],
  344:       },
  345:       hiddenFields: [
  346:         "id",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: dateIntervention :: line 63

```ts
   57:         relation: { module: "rendezvous" },
   58:         searchable: true,
   59:         list: { visible: false },
   60:         grid: { cols: 6 },
   61:       },
   62: {
   63:         key: "dateIntervention",
   64:         label: "Date intervention",
   65:         type: "date",
   66:         required: true,
   67:         list: { visible: true, order: 3 },
   68:         grid: { cols: 6 },
   69:       },
   70: {
   71:         key: "typeIntervention",
   72:         label: "Type intervention",
   73:         type: "select",
   74:         options: [
   75:           { label: "Vidange", value: "vidange" },
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: dateIntervention :: line 158

```ts
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
  164:         sections: [
  165:           {
  166:             key: "infos",
  167:             title: "Informations intervention",
  168:             fields: [
  169:               "clientId",
  170:               "vehiculeId",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: dateIntervention :: line 172

```ts
  166:             key: "infos",
  167:             title: "Informations intervention",
  168:             fields: [
  169:               "clientId",
  170:               "vehiculeId",
  171:               "rendezVousId",
  172:               "dateIntervention",
  173:               "typeIntervention",
  174:               "kilometrage",
  175:               "statut",
  176:             ],
  177:           },
  178:         ],
  179:       },
  180: 
  181:       {
  182:         key: "atelier",
  183:         label: "Atelier",
  184: 
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: dateIntervention :: line 322

```ts
  316:       enableSearch: true,
  317:       enableSelection: true,
  318:       enableDensityToggle: true,
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: dateIntervention :: line 427

```ts
  421:           tone: "workshop",
  422:         },
  423:       ],
  424:     },
  425: 
  426:     labelFields: [
  427:       "dateIntervention",
  428:       "typeIntervention",
  429:       "statut",
  430:     ],
  431: 
  432:     breadcrumbs: [
  433:       {
  434:         field: "clientId",
  435:         moduleKey: "clientsauto",
  436:         labelFields: [
  437:           "nom",
  438:           "prenoms",
  439:           "telephone",
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

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: statut :: line 128

```ts
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: statut :: line 161

```ts
  155:           "clientId",
  156:           "vehiculeId",
  157:           "rendezVousId",
  158:           "dateIntervention",
  159:           "typeIntervention",
  160:           "kilometrage",
  161:           "statut",
  162:         ],
  163: 
  164:         sections: [
  165:           {
  166:             key: "infos",
  167:             title: "Informations intervention",
  168:             fields: [
  169:               "clientId",
  170:               "vehiculeId",
  171:               "rendezVousId",
  172:               "dateIntervention",
  173:               "typeIntervention",
```

## Prochaine passe

- Ajouter `reporter-rdv` dans `rendezvous` si absent.
- Ajouter `demarrer-intervention` dans `interventionsauto` si absent.
- Ne pas toucher aux formulaires.
- Ne pas créer de logique page par page.