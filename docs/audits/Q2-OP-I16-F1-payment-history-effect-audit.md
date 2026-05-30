# Q2-OP-I16-F1 — Audit effet historique encaissementsauto

Objectif : vérifier si l’effet métier `historique` existe déjà pour `encaissementsauto`, notamment via l’historique des paiements facture.

## Résumé

- OK : 33
- WARN : 6
- WARN HIGH : 0
- FAIL : 0
- FAIL HIGH : 0

## Checks

| Area | Status | Severity | File | Lines | Message |
|---|---:|---:|---|---|---|
| file | OK | MEDIUM | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` |  | src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts found |
| file | OK | LOW | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts` |  | src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts found |
| file | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` |  | src/runtime/modules/generated/facturesauto/facturesauto.module.ts found |
| file | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` |  | src/runtime/modules/generated/facturesauto/facturesauto.actions.ts found |
| file | OK | MEDIUM | `src/components/erp/billing/InvoicePaymentsHistory.tsx` |  | src/components/erp/billing/InvoicePaymentsHistory.tsx found |
| file | OK | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx found |
| file | OK | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` |  | src/runtime/business-rules/runtimeBusinessRules.ts found |
| file | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` |  | src/runtime/actions/RuntimeActionEngine.ts found |
| file | OK | MEDIUM | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | src/components/erp/runtime/ERPRuntimePage.tsx found |
| encaissement-module | OK | LOW | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` | 33, 194, 206, 286, 289, 290, 296 | factureId found |
| encaissement-module | OK | LOW | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` | 67, 68, 195, 207, 290 | montant found |
| encaissement-module | OK | LOW | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` | 75, 196, 208, 290 | datePaiement found |
| encaissement-module | OK | LOW | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` | 107, 108, 129, 130, 199, 211, 239, 251, 290, 300, 330 | statut found |
| encaissement-module | OK | LOW | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` | 110, 113, 353, 372, 373 | valide found |
| facture-payment-fields | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 134, 277, 288, 543, 597 | montantPaye found |
| facture-payment-fields | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 142, 278, 289, 483, 495, 544 | resteAPayer found |
| facture-payment-fields | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 49, 230, 241, 384, 403, 405 | statutFacture found |
| facture-payment-fields | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 554 | encaissementsauto found |
| payment-history-component | OK | MEDIUM | `src/components/erp/billing/InvoicePaymentsHistory.tsx` | 20, 294, 299 | InvoicePaymentsHistory found |
| payment-history-component | OK | MEDIUM | `src/components/erp/billing/InvoicePaymentsHistory.tsx` | 387 | historique found |
| payment-history-component | OK | MEDIUM | `src/components/erp/billing/InvoicePaymentsHistory.tsx` | 11, 12, 18, 27, 63, 73, 75, 110, 134, 223, 301, 318, 324, 387, 447 | encaissement found |
| payment-history-component | OK | MEDIUM | `src/components/erp/billing/InvoicePaymentsHistory.tsx` | 21, 29, 94, 96, 100, 105, 111, 117, 122, 130, 221, 224, 229, 287, 287, 295, 323, 323, 336, 343, 376, 460, 460, 504, 512, 512 | factureId found |
| payment-history-component | OK | MEDIUM | `src/components/erp/billing/InvoicePaymentsHistory.tsx` | 31, 66, 115, 254, 483 | datePaiement found |
| form-payment-history | OK | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 60, 61, 1745 | InvoicePaymentsHistory found |
| form-payment-history | OK | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1744 | data-invoice-payments-history found |
| form-payment-history | OK | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 241, 262, 270, 1746, 1755 | factureId found |
| form-payment-history | OK | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 247, 248, 257, 373, 374, 383, 389, 1705, 1759, 1759 | montantPaye found |
| form-payment-history | OK | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 250, 251, 254, 255, 376, 377, 380, 381, 390, 1714, 1760, 1760 | resteAPayer found |
| runtime-rules-payment-history | OK | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` | 990, 993, 1014, 1239, 1242, 1263 | encaissementsauto found |
| runtime-rules-payment-history | OK | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` | 238, 634, 866, 894, 897, 922, 945, 962, 1007, 1215, 1256, 1464 | facturesauto found |
| runtime-rules-payment-history | OK | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` | 832, 1155, 1170, 1175, 1177, 1197, 1221, 1404, 1419, 1424, 1426, 1446, 1470, 1563, 1565, 1570, 1723, 1725, 1730 | montantPaye found |
| runtime-rules-payment-history | OK | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` | 835, 1168, 1198, 1221, 1417, 1447, 1470 | resteAPayer found |
| runtime-rules-payment-history | WARN | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` |  | historique not found |
| action-engine-payment | WARN | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` |  | encaissementsauto not found |
| action-engine-payment | WARN | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` |  | facturesauto not found |
| action-engine-payment | WARN | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` |  | historique not found |
| action-engine-payment | WARN | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` |  | montantPaye not found |
| action-engine-payment | WARN | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` |  | resteAPayer not found |
| business-effect-detection | OK | HIGH |  |  | encaissementsauto historique effect detected across runtime files |

## Contextes utiles

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: factureId :: line 33

```ts
   27: 
   28:   schema: {
   29:     collection: "encaissementsauto",
   30: 
   31:     fields: [
   32: {
   33:         key: "factureId",
   34:         label: "Facture",
   35:         type: "relation",
   36:         relation: {
   37:           module: "facturesauto",
   38:         },
   39:         required: true,
   40:         searchable: true,
   41:         list: { visible: true, order: 1 },
   42:         grid: { cols: 6 },
   43:       },
   44: {
   45:         key: "clientId",
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: factureId :: line 194

```ts
  188: 
  189:     tabs: [
  190:       {
  191:         key: "paiement",
  192:         label: "Paiement",
  193:         fields: [
  194:           "factureId",
  195:           "montant",
  196:           "datePaiement",
  197:           "modePaiement",
  198:           "referenceTransaction",
  199:           "statut",
  200:         ],
  201:         sections: [
  202:           {
  203:             key: "infos",
  204:             title: "Informations paiement",
  205:             fields: [
  206:               "factureId",
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: factureId :: line 206

```ts
  200:         ],
  201:         sections: [
  202:           {
  203:             key: "infos",
  204:             title: "Informations paiement",
  205:             fields: [
  206:               "factureId",
  207:               "montant",
  208:               "datePaiement",
  209:               "modePaiement",
  210:               "referenceTransaction",
  211:               "statut",
  212:             ],
  213:           },
  214:         ],
  215:       },
  216:       {
  217:         key: "relations",
  218:         label: "Relations",
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: factureId :: line 286

```ts
  280:     // Q21E_C_PAYMENT_RELATIONSHIP_COMPOSITION
  281:     // Encaissement belongs to a facture and inherits invoice context.
  282:     requiresParentContext: true,
  283:     allowedParents: [
  284:       {
  285:         moduleKey: "facturesauto",
  286:         foreignKey: "factureId",
  287:       },
  288:     ],
  289:     lockedFields: ["factureId", "clientId", "vehiculeId"],
  290:     labelFields: ["factureId", "numeroRecu", "montant", "datePaiement", "statut"],
  291: 
  292:     contextBanner: {
  293:       title: "Contexte encaissement",
  294:       items: [
  295:         {
  296:           relationField: "factureId",
  297:           moduleKey: "facturesauto",
  298:           labelFields: [
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: factureId :: line 289

```ts
  283:     allowedParents: [
  284:       {
  285:         moduleKey: "facturesauto",
  286:         foreignKey: "factureId",
  287:       },
  288:     ],
  289:     lockedFields: ["factureId", "clientId", "vehiculeId"],
  290:     labelFields: ["factureId", "numeroRecu", "montant", "datePaiement", "statut"],
  291: 
  292:     contextBanner: {
  293:       title: "Contexte encaissement",
  294:       items: [
  295:         {
  296:           relationField: "factureId",
  297:           moduleKey: "facturesauto",
  298:           labelFields: [
  299:             "numeroFacture",
  300:             "statutPaiement",
  301:             "resteAPayer",
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: montant :: line 67

```ts
   61:         },
   62:         searchable: true,
   63:         list: { visible: false },
   64:         grid: { cols: 6 },
   65:       },
   66: {
   67:         key: "montant",
   68:         label: "Montant encaissé",
   69:         type: "number",
   70:         required: true,
   71:         list: { visible: true, order: 3 },
   72:         grid: { cols: 6 },
   73:       },
   74: {
   75:         key: "datePaiement",
   76:         label: "Date paiement",
   77:         type: "date",
   78:         required: true,
   79:         list: { visible: true, order: 4 },
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: montant :: line 68

```ts
   62:         searchable: true,
   63:         list: { visible: false },
   64:         grid: { cols: 6 },
   65:       },
   66: {
   67:         key: "montant",
   68:         label: "Montant encaissé",
   69:         type: "number",
   70:         required: true,
   71:         list: { visible: true, order: 3 },
   72:         grid: { cols: 6 },
   73:       },
   74: {
   75:         key: "datePaiement",
   76:         label: "Date paiement",
   77:         type: "date",
   78:         required: true,
   79:         list: { visible: true, order: 4 },
   80:         grid: { cols: 6 },
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: montant :: line 195

```ts
  189:     tabs: [
  190:       {
  191:         key: "paiement",
  192:         label: "Paiement",
  193:         fields: [
  194:           "factureId",
  195:           "montant",
  196:           "datePaiement",
  197:           "modePaiement",
  198:           "referenceTransaction",
  199:           "statut",
  200:         ],
  201:         sections: [
  202:           {
  203:             key: "infos",
  204:             title: "Informations paiement",
  205:             fields: [
  206:               "factureId",
  207:               "montant",
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: montant :: line 207

```ts
  201:         sections: [
  202:           {
  203:             key: "infos",
  204:             title: "Informations paiement",
  205:             fields: [
  206:               "factureId",
  207:               "montant",
  208:               "datePaiement",
  209:               "modePaiement",
  210:               "referenceTransaction",
  211:               "statut",
  212:             ],
  213:           },
  214:         ],
  215:       },
  216:       {
  217:         key: "relations",
  218:         label: "Relations",
  219:         fields: [
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: montant :: line 290

```ts
  284:       {
  285:         moduleKey: "facturesauto",
  286:         foreignKey: "factureId",
  287:       },
  288:     ],
  289:     lockedFields: ["factureId", "clientId", "vehiculeId"],
  290:     labelFields: ["factureId", "numeroRecu", "montant", "datePaiement", "statut"],
  291: 
  292:     contextBanner: {
  293:       title: "Contexte encaissement",
  294:       items: [
  295:         {
  296:           relationField: "factureId",
  297:           moduleKey: "facturesauto",
  298:           labelFields: [
  299:             "numeroFacture",
  300:             "statutPaiement",
  301:             "resteAPayer",
  302:           ],
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: datePaiement :: line 75

```ts
   69:         type: "number",
   70:         required: true,
   71:         list: { visible: true, order: 3 },
   72:         grid: { cols: 6 },
   73:       },
   74: {
   75:         key: "datePaiement",
   76:         label: "Date paiement",
   77:         type: "date",
   78:         required: true,
   79:         list: { visible: true, order: 4 },
   80:         grid: { cols: 6 },
   81:       },
   82: {
   83:         key: "modePaiement",
   84:         label: "Mode paiement",
   85:         type: "select",
   86:         defaultValue: "mobile_money",
   87:         options: [
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: datePaiement :: line 196

```ts
  190:       {
  191:         key: "paiement",
  192:         label: "Paiement",
  193:         fields: [
  194:           "factureId",
  195:           "montant",
  196:           "datePaiement",
  197:           "modePaiement",
  198:           "referenceTransaction",
  199:           "statut",
  200:         ],
  201:         sections: [
  202:           {
  203:             key: "infos",
  204:             title: "Informations paiement",
  205:             fields: [
  206:               "factureId",
  207:               "montant",
  208:               "datePaiement",
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: datePaiement :: line 208

```ts
  202:           {
  203:             key: "infos",
  204:             title: "Informations paiement",
  205:             fields: [
  206:               "factureId",
  207:               "montant",
  208:               "datePaiement",
  209:               "modePaiement",
  210:               "referenceTransaction",
  211:               "statut",
  212:             ],
  213:           },
  214:         ],
  215:       },
  216:       {
  217:         key: "relations",
  218:         label: "Relations",
  219:         fields: [
  220:           "clientId",
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: datePaiement :: line 290

```ts
  284:       {
  285:         moduleKey: "facturesauto",
  286:         foreignKey: "factureId",
  287:       },
  288:     ],
  289:     lockedFields: ["factureId", "clientId", "vehiculeId"],
  290:     labelFields: ["factureId", "numeroRecu", "montant", "datePaiement", "statut"],
  291: 
  292:     contextBanner: {
  293:       title: "Contexte encaissement",
  294:       items: [
  295:         {
  296:           relationField: "factureId",
  297:           moduleKey: "facturesauto",
  298:           labelFields: [
  299:             "numeroFacture",
  300:             "statutPaiement",
  301:             "resteAPayer",
  302:           ],
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: statut :: line 107

```ts
  101:         type: "text",
  102:         searchable: true,
  103:         list: { visible: false },
  104:         grid: { cols: 6 },
  105:       },
  106: {
  107:         key: "statut",
  108:         label: "Statut",
  109:         type: "select",
  110:         defaultValue: "valide",
  111:         options: [
  112:           { label: "En attente", value: "en_attente" },
  113:           { label: "Validé", value: "valide" },
  114:           { label: "Rejeté", value: "rejete" },
  115:           { label: "Annulé", value: "annule" },
  116:         ],
  117:         list: { visible: true, order: 6 },
  118:         grid: { cols: 6 },
  119:       },
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: statut :: line 108

```ts
  102:         searchable: true,
  103:         list: { visible: false },
  104:         grid: { cols: 6 },
  105:       },
  106: {
  107:         key: "statut",
  108:         label: "Statut",
  109:         type: "select",
  110:         defaultValue: "valide",
  111:         options: [
  112:           { label: "En attente", value: "en_attente" },
  113:           { label: "Validé", value: "valide" },
  114:           { label: "Rejeté", value: "rejete" },
  115:           { label: "Annulé", value: "annule" },
  116:         ],
  117:         list: { visible: true, order: 6 },
  118:         grid: { cols: 6 },
  119:       },
  120: {
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: statut :: line 129

```ts
  123:         type: "text",
  124:         searchable: true,
  125:         list: { visible: false },
  126:         grid: { cols: 6 },
  127:       },
  128: {
  129:         key: "statutEnvoiRecu",
  130:         label: "Statut envoi reçu",
  131:         type: "select",
  132:         defaultValue: "non_envoye",
  133:         options: [
  134:           { label: "Non envoyé", value: "non_envoye" },
  135:           { label: "Envoyé", value: "envoye" },
  136:           { label: "Échec envoi", value: "echec" },
  137:         ],
  138:         list: { visible: false },
  139:         grid: { cols: 6 },
  140:       },
  141: {
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: statut :: line 130

```ts
  124:         searchable: true,
  125:         list: { visible: false },
  126:         grid: { cols: 6 },
  127:       },
  128: {
  129:         key: "statutEnvoiRecu",
  130:         label: "Statut envoi reçu",
  131:         type: "select",
  132:         defaultValue: "non_envoye",
  133:         options: [
  134:           { label: "Non envoyé", value: "non_envoye" },
  135:           { label: "Envoyé", value: "envoye" },
  136:           { label: "Échec envoi", value: "echec" },
  137:         ],
  138:         list: { visible: false },
  139:         grid: { cols: 6 },
  140:       },
  141: {
  142:         key: "dernierEnvoiRecuAt",
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: statut :: line 199

```ts
  193:         fields: [
  194:           "factureId",
  195:           "montant",
  196:           "datePaiement",
  197:           "modePaiement",
  198:           "referenceTransaction",
  199:           "statut",
  200:         ],
  201:         sections: [
  202:           {
  203:             key: "infos",
  204:             title: "Informations paiement",
  205:             fields: [
  206:               "factureId",
  207:               "montant",
  208:               "datePaiement",
  209:               "modePaiement",
  210:               "referenceTransaction",
  211:               "statut",
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: valide :: line 110

```ts
  104:         grid: { cols: 6 },
  105:       },
  106: {
  107:         key: "statut",
  108:         label: "Statut",
  109:         type: "select",
  110:         defaultValue: "valide",
  111:         options: [
  112:           { label: "En attente", value: "en_attente" },
  113:           { label: "Validé", value: "valide" },
  114:           { label: "Rejeté", value: "rejete" },
  115:           { label: "Annulé", value: "annule" },
  116:         ],
  117:         list: { visible: true, order: 6 },
  118:         grid: { cols: 6 },
  119:       },
  120: {
  121:         key: "numeroRecu",
  122:         label: "Numéro reçu",
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: valide :: line 113

```ts
  107:         key: "statut",
  108:         label: "Statut",
  109:         type: "select",
  110:         defaultValue: "valide",
  111:         options: [
  112:           { label: "En attente", value: "en_attente" },
  113:           { label: "Validé", value: "valide" },
  114:           { label: "Rejeté", value: "rejete" },
  115:           { label: "Annulé", value: "annule" },
  116:         ],
  117:         list: { visible: true, order: 6 },
  118:         grid: { cols: 6 },
  119:       },
  120: {
  121:         key: "numeroRecu",
  122:         label: "Numéro reçu",
  123:         type: "text",
  124:         searchable: true,
  125:         list: { visible: false },
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: valide :: line 353

```ts
  347:         {
  348:           key: "en_attente",
  349:           label: "En attente",
  350:           color: "warning",
  351:         },
  352:         {
  353:           key: "valide",
  354:           label: "Validé",
  355:           color: "success",
  356:         },
  357:         {
  358:           key: "rejete",
  359:           label: "Rejeté",
  360:           color: "danger",
  361:         },
  362:         {
  363:           key: "annule",
  364:           label: "Annulé",
  365:           color: "default",
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: valide :: line 372

```ts
  366:         },
  367:       ],
  368: 
  369:       transitions: [
  370:         {
  371:           from: "en_attente",
  372:           to: "valide",
  373:           action: "Valider",
  374:         },
  375:         {
  376:           from: "en_attente",
  377:           to: "rejete",
  378:           action: "Rejeter",
  379:         },
  380:         {
  381:           from: "en_attente",
  382:           to: "annule",
  383:           action: "Annuler",
  384:         },
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: valide :: line 373

```ts
  367:       ],
  368: 
  369:       transitions: [
  370:         {
  371:           from: "en_attente",
  372:           to: "valide",
  373:           action: "Valider",
  374:         },
  375:         {
  376:           from: "en_attente",
  377:           to: "rejete",
  378:           action: "Rejeter",
  379:         },
  380:         {
  381:           from: "en_attente",
  382:           to: "annule",
  383:           action: "Annuler",
  384:         },
  385:       ],
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

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: encaissementsauto :: line 554

```ts
  548:       "nombreEnvoisFacture",
  549:     ],
  550: 
  551:     children: [
  552:       {
  553:         key: "encaissements-facture",
  554:         moduleKey: "encaissementsauto",
  555:         foreignKey: "factureId",
  556:         title: "Encaissements",
  557:         description: "Paiements enregistrés pour cette facture.",
  558:         displayIn: ["detail", "edit"],
  559:         lazy: true,
  560:         position: "after",
  561:         allowCreate: true,
  562:         createLabel: "Ajouter un encaissement",
  563:         openLabel: "Ouvrir encaissement",
  564:         labelFields: ["numeroRecu", "montant", "datePaiement", "statut"],
  565:         subtitleFields: ["clientId", "vehiculeId", "modePaiement", "referenceTransaction"],
  566:         totalField: "montant",
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: InvoicePaymentsHistory :: line 20

```ts
   14: import {
   15:   PaymentReceiptActions,
   16: } from "./PaymentReceiptActions";
   17: 
   18: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
   19: 
   20: interface InvoicePaymentsHistoryProps {
   21:   factureId: string;
   22:   montantTTC?: number;
   23:   clientId?: string;
   24:   vehiculeId?: string;
   25: }
   26: 
   27: type Encaissement = {
   28:   id?: string;
   29:   factureId?: string;
   30:   montant?: number;
   31:   datePaiement?: string;
   32:   modePaiement?: string;
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: InvoicePaymentsHistory :: line 294

```ts
  288:         />
  289:       </div>
  290:     </article>
  291:   );
  292: }
  293: 
  294: export function InvoicePaymentsHistory({
  295:   factureId,
  296:   montantTTC = 0,
  297:   clientId,
  298:   vehiculeId,
  299: }: InvoicePaymentsHistoryProps) {
  300:   const [items, setItems] =
  301:     useState<Encaissement[]>([]);
  302: 
  303:   const [loading, setLoading] =
  304:     useState(true);
  305: 
  306:   const [sortDirection, setSortDirection] =
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: InvoicePaymentsHistory :: line 299

```ts
  293: 
  294: export function InvoicePaymentsHistory({
  295:   factureId,
  296:   montantTTC = 0,
  297:   clientId,
  298:   vehiculeId,
  299: }: InvoicePaymentsHistoryProps) {
  300:   const [items, setItems] =
  301:     useState<Encaissement[]>([]);
  302: 
  303:   const [loading, setLoading] =
  304:     useState(true);
  305: 
  306:   const [sortDirection, setSortDirection] =
  307:     useState<PaymentSortDirection>("asc");
  308: 
  309:   useEffect(() => {
  310:     let mounted = true;
  311: 
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: historique :: line 387

```ts
  381: 
  382:   return (
  383:     <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
  384:       <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
  385:         <div>
  386:           <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
  387:             Historique des encaissements
  388:           </p>
  389: 
  390:           <h2 className="mt-2 text-2xl font-black text-slate-950">
  391:             Paiements enregistrés
  392:           </h2>
  393: 
  394:           <p className="mt-2 text-sm text-slate-600">
  395:             Liste des paiements liés à cette facture.
  396:           </p>
  397:         </div>
  398: 
  399:         <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: encaissement :: line 11

```ts
    5: 
    6: import {
    7:   RuntimeDataBinding,
    8: } from "@/runtime/data-binding";
    9: 
   10: import {
   11:   encaissementsautoModule,
   12: } from "@/runtime/modules/generated/encaissementsauto";
   13: 
   14: import {
   15:   PaymentReceiptActions,
   16: } from "./PaymentReceiptActions";
   17: 
   18: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
   19: 
   20: interface InvoicePaymentsHistoryProps {
   21:   factureId: string;
   22:   montantTTC?: number;
   23:   clientId?: string;
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: encaissement :: line 12

```ts
    6: import {
    7:   RuntimeDataBinding,
    8: } from "@/runtime/data-binding";
    9: 
   10: import {
   11:   encaissementsautoModule,
   12: } from "@/runtime/modules/generated/encaissementsauto";
   13: 
   14: import {
   15:   PaymentReceiptActions,
   16: } from "./PaymentReceiptActions";
   17: 
   18: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
   19: 
   20: interface InvoicePaymentsHistoryProps {
   21:   factureId: string;
   22:   montantTTC?: number;
   23:   clientId?: string;
   24:   vehiculeId?: string;
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: encaissement :: line 18

```ts
   12: } from "@/runtime/modules/generated/encaissementsauto";
   13: 
   14: import {
   15:   PaymentReceiptActions,
   16: } from "./PaymentReceiptActions";
   17: 
   18: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
   19: 
   20: interface InvoicePaymentsHistoryProps {
   21:   factureId: string;
   22:   montantTTC?: number;
   23:   clientId?: string;
   24:   vehiculeId?: string;
   25: }
   26: 
   27: type Encaissement = {
   28:   id?: string;
   29:   factureId?: string;
   30:   montant?: number;
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: encaissement :: line 27

```ts
   21:   factureId: string;
   22:   montantTTC?: number;
   23:   clientId?: string;
   24:   vehiculeId?: string;
   25: }
   26: 
   27: type Encaissement = {
   28:   id?: string;
   29:   factureId?: string;
   30:   montant?: number;
   31:   datePaiement?: string;
   32:   modePaiement?: string;
   33:   referenceTransaction?: string;
   34:   statut?: string;
   35: };
   36: 
   37: type PaymentSortDirection = "asc" | "desc";
   38: 
   39: function formatMoney(
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: encaissement :: line 63

```ts
   57:   }
   58: 
   59:   return date.toLocaleDateString("fr-FR");
   60: }
   61: 
   62: function getPaymentSortValue(
   63:   item: Encaissement
   64: ): string {
   65:   return String(
   66:     item.datePaiement ??
   67:       item.id ??
   68:       ""
   69:   );
   70: }
   71: 
   72: function sortPaymentsByBusinessDate(
   73:   items: Encaissement[],
   74:   direction: PaymentSortDirection
   75: ): Encaissement[] {
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: factureId :: line 21

```ts
   15:   PaymentReceiptActions,
   16: } from "./PaymentReceiptActions";
   17: 
   18: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
   19: 
   20: interface InvoicePaymentsHistoryProps {
   21:   factureId: string;
   22:   montantTTC?: number;
   23:   clientId?: string;
   24:   vehiculeId?: string;
   25: }
   26: 
   27: type Encaissement = {
   28:   id?: string;
   29:   factureId?: string;
   30:   montant?: number;
   31:   datePaiement?: string;
   32:   modePaiement?: string;
   33:   referenceTransaction?: string;
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: factureId :: line 29

```ts
   23:   clientId?: string;
   24:   vehiculeId?: string;
   25: }
   26: 
   27: type Encaissement = {
   28:   id?: string;
   29:   factureId?: string;
   30:   montant?: number;
   31:   datePaiement?: string;
   32:   modePaiement?: string;
   33:   referenceTransaction?: string;
   34:   statut?: string;
   35: };
   36: 
   37: type PaymentSortDirection = "asc" | "desc";
   38: 
   39: function formatMoney(
   40:   value: number
   41: ): string {
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: factureId :: line 94

```ts
   88:       ? comparison
   89:       : -comparison;
   90:   });
   91: }
   92: 
   93: function buildInvoiceReturnTo(
   94:   factureId: string
   95: ): string {
   96:   return "/facturesauto/" + encodeURIComponent(factureId) + "/edit";
   97: }
   98: 
   99: function buildCreatePaymentHref({
  100:   factureId,
  101:   clientId,
  102:   vehiculeId,
  103:   montant,
  104: }: {
  105:   factureId: string;
  106:   clientId?: string;
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: factureId :: line 96

```ts
   90:   });
   91: }
   92: 
   93: function buildInvoiceReturnTo(
   94:   factureId: string
   95: ): string {
   96:   return "/facturesauto/" + encodeURIComponent(factureId) + "/edit";
   97: }
   98: 
   99: function buildCreatePaymentHref({
  100:   factureId,
  101:   clientId,
  102:   vehiculeId,
  103:   montant,
  104: }: {
  105:   factureId: string;
  106:   clientId?: string;
  107:   vehiculeId?: string;
  108:   montant?: unknown;
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: factureId :: line 100

```ts
   94:   factureId: string
   95: ): string {
   96:   return "/facturesauto/" + encodeURIComponent(factureId) + "/edit";
   97: }
   98: 
   99: function buildCreatePaymentHref({
  100:   factureId,
  101:   clientId,
  102:   vehiculeId,
  103:   montant,
  104: }: {
  105:   factureId: string;
  106:   clientId?: string;
  107:   vehiculeId?: string;
  108:   montant?: unknown;
  109: }): string {
  110:   return buildRuntimeFactureEncaissementCreateHref({
  111:     factureId,
  112:     clientId,
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: datePaiement :: line 31

```ts
   25: }
   26: 
   27: type Encaissement = {
   28:   id?: string;
   29:   factureId?: string;
   30:   montant?: number;
   31:   datePaiement?: string;
   32:   modePaiement?: string;
   33:   referenceTransaction?: string;
   34:   statut?: string;
   35: };
   36: 
   37: type PaymentSortDirection = "asc" | "desc";
   38: 
   39: function formatMoney(
   40:   value: number
   41: ): string {
   42:   return value.toLocaleString("fr-FR") + " FCFA";
   43: }
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: datePaiement :: line 66

```ts
   60: }
   61: 
   62: function getPaymentSortValue(
   63:   item: Encaissement
   64: ): string {
   65:   return String(
   66:     item.datePaiement ??
   67:       item.id ??
   68:       ""
   69:   );
   70: }
   71: 
   72: function sortPaymentsByBusinessDate(
   73:   items: Encaissement[],
   74:   direction: PaymentSortDirection
   75: ): Encaissement[] {
   76:   return [...items].sort((left, right) => {
   77:     const comparison =
   78:       getPaymentSortValue(left).localeCompare(
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: datePaiement :: line 115

```ts
  109: }): string {
  110:   return buildRuntimeFactureEncaissementCreateHref({
  111:     factureId,
  112:     clientId,
  113:     vehiculeId,
  114:     montant,
  115:     datePaiement: new Date().toISOString().slice(0, 10),
  116:     statut: "valide",
  117:     returnTo: buildInvoiceReturnTo(factureId),
  118:   });
  119: }
  120: function buildEditPaymentHref(
  121:   paymentId: string | undefined,
  122:   factureId: string
  123: ): string {
  124:   if (!paymentId) {
  125:     return "#";
  126:   }
  127: 
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: datePaiement :: line 254

```ts
  248:       <div className="mt-4 grid gap-3 text-sm">
  249:         <div className="rounded-2xl bg-slate-50 p-3">
  250:           <p className="text-xs font-black uppercase tracking-wide text-slate-400">
  251:             Date
  252:           </p>
  253:           <p className="mt-1 font-bold text-slate-800">
  254:             {formatDate(item.datePaiement)}
  255:           </p>
  256:         </div>
  257: 
  258:         <div className="rounded-2xl bg-slate-50 p-3">
  259:           <p className="text-xs font-black uppercase tracking-wide text-slate-400">
  260:             Mode
  261:           </p>
  262:           <p className="mt-1 font-bold text-slate-800">
  263:             {formatMode(item.modePaiement)}
  264:           </p>
  265:         </div>
  266: 
```

### src/components/erp/billing/InvoicePaymentsHistory.tsx :: datePaiement :: line 483

```ts
  477:                 {sortedItems.map((item, index) => (
  478:                   <div
  479:                     key={item.id ?? index}
  480:                     className="grid grid-cols-[1fr_1fr_1fr_1.4fr_1fr_1.8fr] gap-4 px-4 py-4 text-sm text-slate-700"
  481:                   >
  482:                     <div className="font-semibold">
  483:                       {formatDate(item.datePaiement)}
  484:                     </div>
  485: 
  486:                     <div className="font-black text-slate-950">
  487:                       {formatMoney(Number(item.montant ?? 0))}
  488:                     </div>
  489: 
  490:                     <div>
  491:                       {formatMode(item.modePaiement)}
  492:                     </div>
  493: 
  494:                     <div className="truncate">
  495:                       {item.referenceTransaction || "-"}
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: InvoicePaymentsHistory :: line 60

```ts
   54: import {
   55: recomputeTerrainSurfaceDisponible,
   56: }
   57: from "@/runtime/business/exploitations/recomputeTerrainSurfaceDisponible";
   58: 
   59: import {
   60:   InvoicePaymentsHistory,
   61: } from "@/components/erp/billing/InvoicePaymentsHistory";
   62: 
   63: import {
   64:   InvoicePaymentSchedule,
   65: } from "@/components/erp/billing/InvoicePaymentSchedule";
   66: 
   67: import {
   68:   InvoiceDocumentActions,
   69: } from "@/components/erp/billing/InvoiceDocumentActions";
   70: 
   71: import {
   72:   RuntimeUniqueConstraintEngine,
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: InvoicePaymentsHistory :: line 61

```ts
   55: recomputeTerrainSurfaceDisponible,
   56: }
   57: from "@/runtime/business/exploitations/recomputeTerrainSurfaceDisponible";
   58: 
   59: import {
   60:   InvoicePaymentsHistory,
   61: } from "@/components/erp/billing/InvoicePaymentsHistory";
   62: 
   63: import {
   64:   InvoicePaymentSchedule,
   65: } from "@/components/erp/billing/InvoicePaymentSchedule";
   66: 
   67: import {
   68:   InvoiceDocumentActions,
   69: } from "@/components/erp/billing/InvoiceDocumentActions";
   70: 
   71: import {
   72:   RuntimeUniqueConstraintEngine,
   73: } from "@/runtime/validation/RuntimeUniqueConstraintEngine";
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: InvoicePaymentsHistory :: line 1745

```ts
 1739:           </div>
 1740:         </section>
 1741:       ) : null}
 1742: 
 1743:       {isInvoiceEditForm ? (
 1744:         <div data-invoice-payments-history>
 1745:           <InvoicePaymentsHistory
 1746:             factureId={String(initialData.id ?? initialData._id ?? "")}
 1747:             montantTTC={Number(initialData.montantTTC ?? 0)}
 1748:           />
 1749:         </div>
 1750:       ) : null}
 1751: 
 1752:       {isInvoiceEditForm ? (
 1753:         <div data-invoice-payment-schedule>
 1754:           <InvoicePaymentSchedule
 1755:             factureId={String(initialData.id ?? initialData._id ?? "")}
 1756:             clientId={initialData.clientId ? String(initialData.clientId) : undefined}
 1757:             vehiculeId={initialData.vehiculeId ? String(initialData.vehiculeId) : undefined}
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: data-invoice-payments-history :: line 1744

```ts
 1738:             </a>
 1739:           </div>
 1740:         </section>
 1741:       ) : null}
 1742: 
 1743:       {isInvoiceEditForm ? (
 1744:         <div data-invoice-payments-history>
 1745:           <InvoicePaymentsHistory
 1746:             factureId={String(initialData.id ?? initialData._id ?? "")}
 1747:             montantTTC={Number(initialData.montantTTC ?? 0)}
 1748:           />
 1749:         </div>
 1750:       ) : null}
 1751: 
 1752:       {isInvoiceEditForm ? (
 1753:         <div data-invoice-payment-schedule>
 1754:           <InvoicePaymentSchedule
 1755:             factureId={String(initialData.id ?? initialData._id ?? "")}
 1756:             clientId={initialData.clientId ? String(initialData.clientId) : undefined}
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: factureId :: line 241

```ts
  235:   recalculate?: boolean;
  236: }
  237: 
  238: function buildInvoicePaymentHref(
  239:   invoice: Record<string, unknown>
  240: ): string {
  241:   const factureId =
  242:     String(invoice.id ?? invoice._id ?? "");
  243: 
  244:   const montantTTC =
  245:     Number(invoice.montantTTC ?? 0);
  246: 
  247:   const montantPaye =
  248:     Number(invoice.montantPaye ?? 0);
  249: 
  250:   const resteAPayer =
  251:     Number(invoice.resteAPayer ?? 0);
  252: 
  253:   const montant =
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: factureId :: line 262

```ts
  256:       : Math.max(
  257:           montantTTC - montantPaye,
  258:           0
  259:         );
  260: 
  261:   return buildRuntimeFactureEncaissementCreateHref({
  262:     factureId,
  263:     clientId: invoice.clientId ? String(invoice.clientId) : undefined,
  264:     vehiculeId: invoice.vehiculeId ? String(invoice.vehiculeId) : undefined,
  265:     montant: montant > 0 ? montant : undefined,
  266:     datePaiement: new Date()
  267:       .toISOString()
  268:       .split("T")[0],
  269:     statut: "valide",
  270:     returnTo: "/facturesauto/" + factureId + "/edit",
  271:   });
  272: }
  273: 
  274: async function syncInterventionTotalsFromLines(
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: factureId :: line 270

```ts
  264:     vehiculeId: invoice.vehiculeId ? String(invoice.vehiculeId) : undefined,
  265:     montant: montant > 0 ? montant : undefined,
  266:     datePaiement: new Date()
  267:       .toISOString()
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: factureId :: line 1746

```ts
 1740:         </section>
 1741:       ) : null}
 1742: 
 1743:       {isInvoiceEditForm ? (
 1744:         <div data-invoice-payments-history>
 1745:           <InvoicePaymentsHistory
 1746:             factureId={String(initialData.id ?? initialData._id ?? "")}
 1747:             montantTTC={Number(initialData.montantTTC ?? 0)}
 1748:           />
 1749:         </div>
 1750:       ) : null}
 1751: 
 1752:       {isInvoiceEditForm ? (
 1753:         <div data-invoice-payment-schedule>
 1754:           <InvoicePaymentSchedule
 1755:             factureId={String(initialData.id ?? initialData._id ?? "")}
 1756:             clientId={initialData.clientId ? String(initialData.clientId) : undefined}
 1757:             vehiculeId={initialData.vehiculeId ? String(initialData.vehiculeId) : undefined}
 1758:             montantTTC={Number(initialData.montantTTC ?? 0)}
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: factureId :: line 1755

```ts
 1749:         </div>
 1750:       ) : null}
 1751: 
 1752:       {isInvoiceEditForm ? (
 1753:         <div data-invoice-payment-schedule>
 1754:           <InvoicePaymentSchedule
 1755:             factureId={String(initialData.id ?? initialData._id ?? "")}
 1756:             clientId={initialData.clientId ? String(initialData.clientId) : undefined}
 1757:             vehiculeId={initialData.vehiculeId ? String(initialData.vehiculeId) : undefined}
 1758:             montantTTC={Number(initialData.montantTTC ?? 0)}
 1759:             montantPaye={Number(initialData.montantPaye ?? 0)}
 1760:             resteAPayer={Number(initialData.resteAPayer ?? 0)}
 1761:           />
 1762:         </div>
 1763:       ) : null}
 1764: 
 1765:       {/* Workflow actions are rendered by ERPRuntimeActionBar in ERPRuntimePage. */}
 1766:       <section className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] shadow-sm">
 1767:         <div className="bg-gradient-to-r from-white via-white to-[var(--erp-primary-soft)] px-8 py-8 text-[var(--erp-text)]">
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: montantPaye :: line 247

```ts
  241:   const factureId =
  242:     String(invoice.id ?? invoice._id ?? "");
  243: 
  244:   const montantTTC =
  245:     Number(invoice.montantTTC ?? 0);
  246: 
  247:   const montantPaye =
  248:     Number(invoice.montantPaye ?? 0);
  249: 
  250:   const resteAPayer =
  251:     Number(invoice.resteAPayer ?? 0);
  252: 
  253:   const montant =
  254:     resteAPayer > 0
  255:       ? resteAPayer
  256:       : Math.max(
  257:           montantTTC - montantPaye,
  258:           0
  259:         );
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: montantPaye :: line 248

```ts
  242:     String(invoice.id ?? invoice._id ?? "");
  243: 
  244:   const montantTTC =
  245:     Number(invoice.montantTTC ?? 0);
  246: 
  247:   const montantPaye =
  248:     Number(invoice.montantPaye ?? 0);
  249: 
  250:   const resteAPayer =
  251:     Number(invoice.resteAPayer ?? 0);
  252: 
  253:   const montant =
  254:     resteAPayer > 0
  255:       ? resteAPayer
  256:       : Math.max(
  257:           montantTTC - montantPaye,
  258:           0
  259:         );
  260: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: montantPaye :: line 257

```ts
  251:     Number(invoice.resteAPayer ?? 0);
  252: 
  253:   const montant =
  254:     resteAPayer > 0
  255:       ? resteAPayer
  256:       : Math.max(
  257:           montantTTC - montantPaye,
  258:           0
  259:         );
  260: 
  261:   return buildRuntimeFactureEncaissementCreateHref({
  262:     factureId,
  263:     clientId: invoice.clientId ? String(invoice.clientId) : undefined,
  264:     vehiculeId: invoice.vehiculeId ? String(invoice.vehiculeId) : undefined,
  265:     montant: montant > 0 ? montant : undefined,
  266:     datePaiement: new Date()
  267:       .toISOString()
  268:       .split("T")[0],
  269:     statut: "valide",
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: montantPaye :: line 373

```ts
  367: function getInvoiceAmountSummary(
  368:   invoice: Record<string, unknown>
  369: ) {
  370:   const montantTTC =
  371:     Number(invoice.montantTTC ?? 0);
  372: 
  373:   const montantPaye =
  374:     Number(invoice.montantPaye ?? 0);
  375: 
  376:   const resteAPayer =
  377:     Number(invoice.resteAPayer ?? 0);
  378: 
  379:   const computedReste =
  380:     resteAPayer > 0
  381:       ? resteAPayer
  382:       : Math.max(
  383:           montantTTC - montantPaye,
  384:           0
  385:         );
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: montantPaye :: line 374

```ts
  368:   invoice: Record<string, unknown>
  369: ) {
  370:   const montantTTC =
  371:     Number(invoice.montantTTC ?? 0);
  372: 
  373:   const montantPaye =
  374:     Number(invoice.montantPaye ?? 0);
  375: 
  376:   const resteAPayer =
  377:     Number(invoice.resteAPayer ?? 0);
  378: 
  379:   const computedReste =
  380:     resteAPayer > 0
  381:       ? resteAPayer
  382:       : Math.max(
  383:           montantTTC - montantPaye,
  384:           0
  385:         );
  386: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: resteAPayer :: line 250

```ts
  244:   const montantTTC =
  245:     Number(invoice.montantTTC ?? 0);
  246: 
  247:   const montantPaye =
  248:     Number(invoice.montantPaye ?? 0);
  249: 
  250:   const resteAPayer =
  251:     Number(invoice.resteAPayer ?? 0);
  252: 
  253:   const montant =
  254:     resteAPayer > 0
  255:       ? resteAPayer
  256:       : Math.max(
  257:           montantTTC - montantPaye,
  258:           0
  259:         );
  260: 
  261:   return buildRuntimeFactureEncaissementCreateHref({
  262:     factureId,
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: resteAPayer :: line 251

```ts
  245:     Number(invoice.montantTTC ?? 0);
  246: 
  247:   const montantPaye =
  248:     Number(invoice.montantPaye ?? 0);
  249: 
  250:   const resteAPayer =
  251:     Number(invoice.resteAPayer ?? 0);
  252: 
  253:   const montant =
  254:     resteAPayer > 0
  255:       ? resteAPayer
  256:       : Math.max(
  257:           montantTTC - montantPaye,
  258:           0
  259:         );
  260: 
  261:   return buildRuntimeFactureEncaissementCreateHref({
  262:     factureId,
  263:     clientId: invoice.clientId ? String(invoice.clientId) : undefined,
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: resteAPayer :: line 254

```ts
  248:     Number(invoice.montantPaye ?? 0);
  249: 
  250:   const resteAPayer =
  251:     Number(invoice.resteAPayer ?? 0);
  252: 
  253:   const montant =
  254:     resteAPayer > 0
  255:       ? resteAPayer
  256:       : Math.max(
  257:           montantTTC - montantPaye,
  258:           0
  259:         );
  260: 
  261:   return buildRuntimeFactureEncaissementCreateHref({
  262:     factureId,
  263:     clientId: invoice.clientId ? String(invoice.clientId) : undefined,
  264:     vehiculeId: invoice.vehiculeId ? String(invoice.vehiculeId) : undefined,
  265:     montant: montant > 0 ? montant : undefined,
  266:     datePaiement: new Date()
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: resteAPayer :: line 255

```ts
  249: 
  250:   const resteAPayer =
  251:     Number(invoice.resteAPayer ?? 0);
  252: 
  253:   const montant =
  254:     resteAPayer > 0
  255:       ? resteAPayer
  256:       : Math.max(
  257:           montantTTC - montantPaye,
  258:           0
  259:         );
  260: 
  261:   return buildRuntimeFactureEncaissementCreateHref({
  262:     factureId,
  263:     clientId: invoice.clientId ? String(invoice.clientId) : undefined,
  264:     vehiculeId: invoice.vehiculeId ? String(invoice.vehiculeId) : undefined,
  265:     montant: montant > 0 ? montant : undefined,
  266:     datePaiement: new Date()
  267:       .toISOString()
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: resteAPayer :: line 376

```ts
  370:   const montantTTC =
  371:     Number(invoice.montantTTC ?? 0);
  372: 
  373:   const montantPaye =
  374:     Number(invoice.montantPaye ?? 0);
  375: 
  376:   const resteAPayer =
  377:     Number(invoice.resteAPayer ?? 0);
  378: 
  379:   const computedReste =
  380:     resteAPayer > 0
  381:       ? resteAPayer
  382:       : Math.max(
  383:           montantTTC - montantPaye,
  384:           0
  385:         );
  386: 
  387:   return {
  388:     montantTTC,
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: encaissementsauto :: line 990

```ts
  984: 
  985: {
  986:   id:
  987:     "amarkhys-encaissement-recompute-facture",
  988: 
  989:   module:
  990:     "encaissementsauto",
  991: 
  992:   event:
  993:     "encaissementsauto.created",
  994: 
  995:   condition:
  996:     (payload) =>
  997:       Boolean(
  998:         payload.factureId
  999:       ),
 1000: 
 1001:   action:
 1002:     async (payload) => {
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: encaissementsauto :: line 993

```ts
  987:     "amarkhys-encaissement-recompute-facture",
  988: 
  989:   module:
  990:     "encaissementsauto",
  991: 
  992:   event:
  993:     "encaissementsauto.created",
  994: 
  995:   condition:
  996:     (payload) =>
  997:       Boolean(
  998:         payload.factureId
  999:       ),
 1000: 
 1001:   action:
 1002:     async (payload) => {
 1003:       const facturesModule =
 1004:         coreERPModules.find(
 1005:           module =>
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: encaissementsauto :: line 1014

```ts
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

### src/runtime/business-rules/runtimeBusinessRules.ts :: encaissementsauto :: line 1239

```ts
 1233: 
 1234: {
 1235:   id:
 1236:     "amarkhys-encaissement-updated-recompute-facture",
 1237: 
 1238:   module:
 1239:     "encaissementsauto",
 1240: 
 1241:   event:
 1242:     "encaissementsauto.updated",
 1243: 
 1244:   condition:
 1245:     (payload) =>
 1246:       Boolean(
 1247:         payload.factureId
 1248:       ),
 1249: 
 1250:   action:
 1251:     async (payload) => {
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: encaissementsauto :: line 1242

```ts
 1236:     "amarkhys-encaissement-updated-recompute-facture",
 1237: 
 1238:   module:
 1239:     "encaissementsauto",
 1240: 
 1241:   event:
 1242:     "encaissementsauto.updated",
 1243: 
 1244:   condition:
 1245:     (payload) =>
 1246:       Boolean(
 1247:         payload.factureId
 1248:       ),
 1249: 
 1250:   action:
 1251:     async (payload) => {
 1252:       const facturesModule =
 1253:         coreERPModules.find(
 1254:           module =>
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: facturesauto :: line 238

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
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: facturesauto :: line 634

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
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: facturesauto :: line 866

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
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: facturesauto :: line 894

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
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: facturesauto :: line 897

```ts
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
  908:       RuntimeMetrics.sum(
  909: 
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: montantPaye :: line 832

```ts
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
  837: 
  838:             statutPaiement:
  839:               "en_attente"
  840: 
  841:           }
  842: 
  843:         );
  844: 
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: montantPaye :: line 1155

```ts
 1149:             String(encaissement.factureId) ===
 1150:               String(payload.factureId) &&
 1151:             encaissement.statut ===
 1152:               "valide"
 1153:         );
 1154: 
 1155:       const montantPaye =
 1156:         encaissementsValides.reduce(
 1157:           (total: number, encaissement: any) =>
 1158:             total +
 1159:             Number(
 1160:               encaissement.montant ?? 0
 1161:             ),
 1162:           0
 1163:         );
 1164: 
 1165:       const montantTTC =
 1166:         repairedMontantTTC;
 1167: 
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: montantPaye :: line 1170

```ts
 1164: 
 1165:       const montantTTC =
 1166:         repairedMontantTTC;
 1167: 
 1168:       const resteAPayer =
 1169:         Math.max(
 1170:           montantTTC - montantPaye,
 1171:           0
 1172:         );
 1173: 
 1174:       const statutPaiement =
 1175:         montantPaye <= 0
 1176:           ? "en_attente"
 1177:           : montantPaye < montantTTC
 1178:             ? "partiel"
 1179:             : "paye";
 1180: 
 1181:       await RuntimeDataBinding.update(
 1182:         facturesModule,
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: montantPaye :: line 1175

```ts
 1169:         Math.max(
 1170:           montantTTC - montantPaye,
 1171:           0
 1172:         );
 1173: 
 1174:       const statutPaiement =
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
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: montantPaye :: line 1177

```ts
 1171:           0
 1172:         );
 1173: 
 1174:       const statutPaiement =
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
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: resteAPayer :: line 835

```ts
  829: 
  830:             montantTTC,
  831: 
  832:             montantPaye:
  833:               0,
  834: 
  835:             resteAPayer:
  836:               montantTTC,
  837: 
  838:             statutPaiement:
  839:               "en_attente"
  840: 
  841:           }
  842: 
  843:         );
  844: 
  845: RuntimeMetrics.increment(
  846:   "amarkhys.interventions.completed",
  847:   {
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: resteAPayer :: line 1168

```ts
 1162:           0
 1163:         );
 1164: 
 1165:       const montantTTC =
 1166:         repairedMontantTTC;
 1167: 
 1168:       const resteAPayer =
 1169:         Math.max(
 1170:           montantTTC - montantPaye,
 1171:           0
 1172:         );
 1173: 
 1174:       const statutPaiement =
 1175:         montantPaye <= 0
 1176:           ? "en_attente"
 1177:           : montantPaye < montantTTC
 1178:             ? "partiel"
 1179:             : "paye";
 1180: 
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: resteAPayer :: line 1198

```ts
 1192:             repairedTVARate,
 1193: 
 1194:           montantTTC:
 1195:             repairedMontantTTC,
 1196: 
 1197:           montantPaye,
 1198:           resteAPayer,
 1199:           statutPaiement,
 1200:           dernierEncaissementAt:
 1201:             new Date().toISOString(),
 1202:         },
 1203:         {
 1204:           systemMutation: true,
 1205:           mutationSource: "runtime:billing",
 1206:         }
 1207:       );
 1208: 
 1209:       await RuntimeNotificationEngine
 1210:         .notify({
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: resteAPayer :: line 1221

```ts
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
 1229: // =====================================================
 1230: // AMARKHYS
 1231: // ENCAISSEMENT MIS A JOUR -> RECALCUL FACTURE
 1232: // =====================================================
 1233: 
```

### src/runtime/business-rules/runtimeBusinessRules.ts :: resteAPayer :: line 1417

```ts
 1411:           0
 1412:         );
 1413: 
 1414:       const montantTTC =
 1415:         repairedMontantTTC;
 1416: 
 1417:       const resteAPayer =
 1418:         Math.max(
 1419:           montantTTC - montantPaye,
 1420:           0
 1421:         );
 1422: 
 1423:       const statutPaiement =
 1424:         montantPaye <= 0
 1425:           ? "en_attente"
 1426:           : montantPaye < montantTTC
 1427:             ? "partiel"
 1428:             : "paye";
 1429: 
```

## Conclusion

L’effet `historique` est présent dans le runtime/UI facture, mais il n’est pas encore suffisamment visible pour l’audit prioritaire.

Prochaine passe recommandée : rendre l’audit prioritaire `encaissementsauto` aware des composants/services d’historique paiement.