# Q2-OP-I16-A — Audit fonctionnel des workflows métier prioritaires depuis ERPRuntimeActionBar

Objectif : vérifier que les workflows/actions métier prioritaires peuvent être pilotés par `ERPRuntimeActionBar`, avec `ERPRuntimePage` comme orchestrateur d’exécution.

## Résumé

- OK : 86
- INFO : 0
- WARN : 11
- WARN HIGH : 0
- FAIL : 0
- FAIL HIGH : 0

## Modules prioritaires

- `rendezvous`
- `interventionsauto`
- `lignesinterventionauto`
- `facturesauto`
- `encaissementsauto`
- `commandesstockauto`
- `receptionsstockauto`

## Checks

| Area | Status | Severity | File | Lines | Message |
|---|---:|---:|---|---|---|
| file | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | src/components/erp/runtime/ERPRuntimePage.tsx found |
| file | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` |  | src/components/erp/runtime/ERPRuntimeActionBar.tsx found |
| file | OK | HIGH | `src/runtime/actions/RuntimeActionEngine.ts` |  | src/runtime/actions/RuntimeActionEngine.ts found |
| file | OK | HIGH | `src/runtime/business-rules/runtimeBusinessRules.ts` |  | src/runtime/business-rules/runtimeBusinessRules.ts found |
| file | OK | HIGH | `src/runtime/modules/definitions/coreModules.ts` |  | src/runtime/modules/definitions/coreModules.ts found |
| file | OK | HIGH | `src/runtime/modules/generated` |  | src/runtime/modules/generated found |
| file | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx found |
| runtime-actionbar-execution | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 214 | RuntimeActionEngine.execute present |
| runtime-actionbar-execution | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 278 | RuntimeActionEngine.getAvailableActions present |
| runtime-actionbar-execution | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 208, 457 | handleRuntimeAction present |
| runtime-actionbar-execution | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 14, 15, 16, 44, 93, 451 | ERPRuntimeActionBar present |
| runtime-actionbar-execution | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 457 | void handleRuntimeAction present |
| runtime-actionbar-execution | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 230 | RuntimeDataBinding.detail present |
| runtime-actionbar-execution | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 236 | setCurrentRecord(freshRecord) present |
| runtime-page-forbidden | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | runtimeActions.map absent |
| runtime-page-forbidden | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | workflowActions absent |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | RuntimeActionEngine absent |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | workflowActions absent |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | workflowActions.map absent |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | pendingWorkflowActionRef absent |
| actionbar-capability | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 81, 83 | action.href present |
| actionbar-capability | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 95 | action.onClick present |
| actionbar-capability | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 19, 37, 57, 78, 81, 93, 93 | disabled present |
| module-file | OK | HIGH | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous module definition found |
| module-actions | OK | HIGH | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 5, 228 | rendezvous actions declaration found |
| module-workflow | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 26, 458 | rendezvous workflow/states/transitions markers found |
| module-expected-action | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous expected action marker "confirmer" found |
| module-expected-action | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous expected action marker "annuler" found |
| module-expected-action | WARN | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous expected action marker "reporter" not found |
| module-expected-action | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 118, 398, 421, 422, 430, 431 | rendezvous expected action marker "intervention" found |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous expected effect marker "confirme" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous expected effect marker "intervention" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous expected effect marker "consumedByInterventionId" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous expected effect marker "planning" found in module/rules/action engine |
| module-file | OK | HIGH | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto module definition found |
| module-actions | OK | HIGH | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 5, 618 | interventionsauto actions declaration found |
| module-workflow | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 18, 620 | interventionsauto workflow/states/transitions markers found |
| module-expected-action | WARN | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto expected action marker "demarrer" not found |
| module-expected-action | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto expected action marker "terminer" found |
| module-expected-action | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 135, 288, 584, 585, 588, 589, 631, 639 | interventionsauto expected action marker "facture" found |
| module-expected-action | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto expected action marker "annuler" found |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto expected effect marker "terminee" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto expected effect marker "facture" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto expected effect marker "facturesauto" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto expected effect marker "coutTotal" found in module/rules/action engine |
| module-file | OK | HIGH | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` |  | lignesinterventionauto module definition found |
| module-actions | OK | HIGH | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 186, 451 | lignesinterventionauto actions declaration found |
| module-workflow | OK | MEDIUM | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 14, 461, 468 | lignesinterventionauto workflow/states/transitions markers found |
| module-expected-action | OK | MEDIUM | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` |  | lignesinterventionauto expected action marker "valider" found |
| module-expected-action | OK | MEDIUM | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` | 453 | lignesinterventionauto expected action marker "retirer" found |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` |  | lignesinterventionauto expected effect marker "retirer-ligne" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` |  | lignesinterventionauto expected effect marker "RuntimeLineRemovalService" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` |  | lignesinterventionauto expected effect marker "stock" found in module/rules/action engine |
| business-effect-marker | WARN | MEDIUM | `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts` |  | lignesinterventionauto expected effect marker "totaux" not found in module/rules/action engine |
| module-file | OK | HIGH | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` |  | facturesauto module definition found |
| module-actions | OK | HIGH | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 5, 621 | facturesauto actions declaration found |
| module-workflow | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 17, 623 | facturesauto workflow/states/transitions markers found |
| module-expected-action | WARN | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` |  | facturesauto expected action marker "envoyer" not found |
| module-expected-action | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 63, 151, 393, 587, 589, 590 | facturesauto expected action marker "paiement" found |
| module-expected-action | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` | 553, 554, 562, 563 | facturesauto expected action marker "encaissement" found |
| module-expected-action | WARN | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` |  | facturesauto expected action marker "annuler" not found |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` |  | facturesauto expected effect marker "encaissementsauto" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` |  | facturesauto expected effect marker "resteAPayer" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` |  | facturesauto expected effect marker "montantPaye" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` |  | facturesauto expected effect marker "statutFacture" found in module/rules/action engine |
| module-file | OK | HIGH | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` |  | encaissementsauto module definition found |
| module-actions | OK | HIGH | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` | 5, 338 | encaissementsauto actions declaration found |
| module-workflow | OK | MEDIUM | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` | 19, 340 | encaissementsauto workflow/states/transitions markers found |
| module-expected-action | OK | MEDIUM | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` |  | encaissementsauto expected action marker "valider" found |
| module-expected-action | OK | MEDIUM | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` |  | encaissementsauto expected action marker "annuler" found |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` |  | encaissementsauto expected effect marker "factureId" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/business-rules/runtimeBusinessRules.ts` |  | encaissementsauto expected effect marker "montantPaye" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` |  | encaissementsauto expected effect marker "resteAPayer" found in module/rules/action engine |
| business-effect-marker | WARN | MEDIUM | `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts` |  | encaissementsauto expected effect marker "historique" not found in module/rules/action engine |
| module-file | OK | HIGH | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto module definition found |
| module-actions | WARN | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto actions declaration not clearly found |
| module-workflow | OK | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 13 | commandesstockauto workflow/states/transitions markers found |
| module-expected-action | WARN | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto expected action marker "envoyer" not found |
| module-expected-action | OK | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` | 137, 162, 163 | commandesstockauto expected action marker "reception" found |
| module-expected-action | WARN | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto expected action marker "annuler" not found |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto expected effect marker "lignescommandestockauto" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto expected effect marker "receptionsstockauto" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto expected effect marker "fournisseurId" found in module/rules/action engine |
| module-file | OK | HIGH | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto module definition found |
| module-actions | WARN | MEDIUM | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto actions declaration not clearly found |
| module-workflow | OK | MEDIUM | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` | 13 | receptionsstockauto workflow/states/transitions markers found |
| module-expected-action | WARN | MEDIUM | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto expected action marker "valider" not found |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto expected effect marker "mouvementsstockauto" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto expected effect marker "stock" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto expected effect marker "mouvementStockId" found in module/rules/action engine |
| business-effect-marker | OK | MEDIUM | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto expected effect marker "quantite" found in module/rules/action engine |
| runtime-action-engine | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | 43 | RuntimeActionEngine marker "getAvailableActions" found |
| runtime-action-engine | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | 103, 232 | RuntimeActionEngine marker "execute" found |
| runtime-action-engine | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | 82, 87 | RuntimeActionEngine marker "runtimeOnly" found |
| runtime-action-engine | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | 86, 135, 146, 243 | RuntimeActionEngine marker "action.key" found |
| runtime-action-engine | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | 25, 32, 32, 36, 36, 47, 52, 57, 61, 66, 109, 119, 137, 147, 154, 155, 164, 189, 198, 204, 209, 210, 211, 218, 227, 240, 253 | RuntimeActionEngine marker "record" found |
| runtime-action-engine | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | 6, 105, 115, 126, 131, 132, 145, 218, 234 | RuntimeActionEngine marker "module" found |

## Contextes utiles

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine.execute :: line 214

```tsx
  208:   async function handleRuntimeAction(action: NonNullable<ERPModule["actions"]>[number]) {
  209:     if (!module || !currentRecord) {
  210:       return;
  211:     }
  212: 
  213:     const actionResult =
  214:       await RuntimeActionEngine.execute({
  215:         module,
  216:         action,
  217:         record: currentRecord,
  218:       });
  219: 
  220:     const recordId =
  221:       String(
  222:         currentRecord.id ??
  223:         currentRecord._id ??
  224:         currentRecord.uid ??
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine.getAvailableActions :: line 278

```tsx
  272:   const runtimeActions =
  273: 
  274: 
  275:     (type === "detail" || type === "edit") && !isRemovedRecord
  276: 
  277: 
  278:       ? RuntimeActionEngine.getAvailableActions({
  279:           actions: module?.actions ?? [],
  280:           workflow: module?.workflows?.[0],
  281:           record: currentRecord,
  282:           })
  283:         : [];
  284: 
  285:   const moduleHrefActions =
  286:     // Q22E4B_LIST_NAVIGATION_ACTIONS
  287:     // Generic runtime: list pages may expose module actions with href.
  288:     type === "list"
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: handleRuntimeAction :: line 208

```tsx
  202:     }
  203: 
  204:     loadData();
  205:   }, [module, type]);
  206: 
  207: 
  208:   async function handleRuntimeAction(action: NonNullable<ERPModule["actions"]>[number]) {
  209:     if (!module || !currentRecord) {
  210:       return;
  211:     }
  212: 
  213:     const actionResult =
  214:       await RuntimeActionEngine.execute({
  215:         module,
  216:         action,
  217:         record: currentRecord,
  218:       });
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: handleRuntimeAction :: line 457

```tsx
  451:             <ERPRuntimeActionBar
  452:               title="Actions métier"
  453:               description="Actions runtime disponibles pour cet enregistrement."
  454:               actions={mapRuntimeActionsToActionBarActions(
  455:                 runtimeActions as ERPRuntimePageActionSource[],
  456:                 (runtimeAction) => {
  457:                   void handleRuntimeAction(runtimeAction);
  458:                 }
  459:               )}
  460:               compact
  461:             />
  462:           </div>
  463:         ) : null}
  464: 
  465:         {type === "create" && module && (
  466:           <ERPEnterpriseForm
  467:             module={module}
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 14

```tsx
    8:   ERPEmptyState,
    9: } from "../ui";
   10: 
   11: import { ERPEnterpriseForm } from "@/components/erp/forms/enterprise/ERPEnterpriseForm";
   12: import { ERPRuntimeDetails } from "./ERPRuntimeDetails";
   13: import {
   14:   ERPRuntimeActionBar,
   15:   type ERPRuntimeActionBarAction,
   16: } from "@/components/erp/runtime/ERPRuntimeActionBar";
   17: 
   18: type ERPRuntimePageActionSource = ERPModuleAction & {
   19:   href?: string;
   20:   disabled?: boolean;
   21:   variant?: string;
   22:   description?: string;
   23: };
   24: import { ERPRuntimeTable } from "./ERPRuntimeTable";
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 15

```tsx
    9: } from "../ui";
   10: 
   11: import { ERPEnterpriseForm } from "@/components/erp/forms/enterprise/ERPEnterpriseForm";
   12: import { ERPRuntimeDetails } from "./ERPRuntimeDetails";
   13: import {
   14:   ERPRuntimeActionBar,
   15:   type ERPRuntimeActionBarAction,
   16: } from "@/components/erp/runtime/ERPRuntimeActionBar";
   17: 
   18: type ERPRuntimePageActionSource = ERPModuleAction & {
   19:   href?: string;
   20:   disabled?: boolean;
   21:   variant?: string;
   22:   description?: string;
   23: };
   24: import { ERPRuntimeTable } from "./ERPRuntimeTable";
   25: import { ERPRelatedRecordsPanel } from "./ERPRelatedRecordsPanel";
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 16

```tsx
   10: 
   11: import { ERPEnterpriseForm } from "@/components/erp/forms/enterprise/ERPEnterpriseForm";
   12: import { ERPRuntimeDetails } from "./ERPRuntimeDetails";
   13: import {
   14:   ERPRuntimeActionBar,
   15:   type ERPRuntimeActionBarAction,
   16: } from "@/components/erp/runtime/ERPRuntimeActionBar";
   17: 
   18: type ERPRuntimePageActionSource = ERPModuleAction & {
   19:   href?: string;
   20:   disabled?: boolean;
   21:   variant?: string;
   22:   description?: string;
   23: };
   24: import { ERPRuntimeTable } from "./ERPRuntimeTable";
   25: import { ERPRelatedRecordsPanel } from "./ERPRelatedRecordsPanel";
   26: import { ERPContextBanner } from "@/components/erp/context/ERPContextBanner";
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 44

```tsx
   38: import { ERPOperationalModulePage } from "@/components/erp/operational";
   39: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
   40: 
   41: function mapRuntimeActionsToActionBarActions(
   42:   runtimeActions: ERPRuntimePageActionSource[] = [],
   43:   onAction?: (action: ERPRuntimePageActionSource) => void
   44: ): ERPRuntimeActionBarAction[] {
   45:   return runtimeActions
   46:     .map((action) => {
   47:       const runtimeAction = action as ERPRuntimePageActionSource;
   48: 
   49:       const key = String(runtimeAction.key ?? runtimeAction.label ?? "");
   50:       const label = String(runtimeAction.label ?? key);
   51: 
   52:       if (!key || !label) {
   53:         return null;
   54:       }
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: void handleRuntimeAction :: line 457

```tsx
  451:             <ERPRuntimeActionBar
  452:               title="Actions métier"
  453:               description="Actions runtime disponibles pour cet enregistrement."
  454:               actions={mapRuntimeActionsToActionBarActions(
  455:                 runtimeActions as ERPRuntimePageActionSource[],
  456:                 (runtimeAction) => {
  457:                   void handleRuntimeAction(runtimeAction);
  458:                 }
  459:               )}
  460:               compact
  461:             />
  462:           </div>
  463:         ) : null}
  464: 
  465:         {type === "create" && module && (
  466:           <ERPEnterpriseForm
  467:             module={module}
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeDataBinding.detail :: line 230

```tsx
  224:         currentRecord.uid ??
  225:         ""
  226:       );
  227: 
  228:     if (recordId) {
  229:       const freshRecord =
  230:         await RuntimeDataBinding.detail(
  231:           module,
  232:           recordId
  233:         );
  234: 
  235:       if (freshRecord) {
  236:         setCurrentRecord(freshRecord);
  237:       }
  238:     }
  239: 
  240:     return actionResult;
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: setCurrentRecord(freshRecord) :: line 236

```tsx
  230:         await RuntimeDataBinding.detail(
  231:           module,
  232:           recordId
  233:         );
  234: 
  235:       if (freshRecord) {
  236:         setCurrentRecord(freshRecord);
  237:       }
  238:     }
  239: 
  240:     return actionResult;
  241:   }
  242: 
  243: 
  244:   const shouldUseOperationalPage =
  245:     type === "list" &&
  246:     Boolean(module?.operational?.enabled);
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: action.href :: line 81

```tsx
   75: 
   76:   const className = actionClassName(
   77:     action.tone ?? "default",
   78:     action.disabled || action.loading
   79:   );
   80: 
   81:   if (action.href && !action.disabled && !action.loading) {
   82:     return (
   83:       <Link href={action.href} className={className} title={action.description}>
   84:         {content}
   85:       </Link>
   86:     );
   87:   }
   88: 
   89:   return (
   90:     <button
   91:       type="button"
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: action.href :: line 83

```tsx
   77:     action.tone ?? "default",
   78:     action.disabled || action.loading
   79:   );
   80: 
   81:   if (action.href && !action.disabled && !action.loading) {
   82:     return (
   83:       <Link href={action.href} className={className} title={action.description}>
   84:         {content}
   85:       </Link>
   86:     );
   87:   }
   88: 
   89:   return (
   90:     <button
   91:       type="button"
   92:       className={className}
   93:       disabled={action.disabled || action.loading}
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: action.onClick :: line 95

```tsx
   89:   return (
   90:     <button
   91:       type="button"
   92:       className={className}
   93:       disabled={action.disabled || action.loading}
   94:       title={action.description}
   95:       onClick={action.onClick}
   96:     >
   97:       {content}
   98:     </button>
   99:   );
  100: }
  101: 
  102: export function ERPRuntimeActionBar({
  103:   title = "Actions métier",
  104:   description,
  105:   actions = [],
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: disabled :: line 19

```tsx
   13: 
   14: export type ERPRuntimeActionBarAction = {
   15:   key: string;
   16:   label: string;
   17:   description?: string;
   18:   href?: string;
   19:   disabled?: boolean;
   20:   loading?: boolean;
   21:   hidden?: boolean;
   22:   tone?: ERPRuntimeActionBarTone;
   23:   icon?: ReactNode;
   24:   onClick?: () => void | Promise<void>;
   25: };
   26: 
   27: export type ERPRuntimeActionBarProps = {
   28:   title?: string;
   29:   description?: string;
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: disabled :: line 37

```tsx
   31:   compact?: boolean;
   32:   className?: string;
   33: };
   34: 
   35: function actionClassName(
   36:   tone: ERPRuntimeActionBarTone = "default",
   37:   disabled?: boolean
   38: ): string {
   39:   const base =
   40:     "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-offset-2";
   41: 
   42:   const tones: Record<ERPRuntimeActionBarTone, string> = {
   43:     default:
   44:       "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-300",
   45:     primary:
   46:       "border border-slate-950 bg-slate-950 text-white hover:bg-slate-800 focus:ring-slate-400",
   47:     success:
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: disabled :: line 57

```tsx
   51:     danger:
   52:       "border border-rose-600 bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-300",
   53:     muted:
   54:       "border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 focus:ring-slate-300",
   55:   };
   56: 
   57:   const state = disabled
   58:     ? " pointer-events-none cursor-not-allowed opacity-50"
   59:     : "";
   60: 
   61:   return [base, tones[tone], state].join(" ");
   62: }
   63: 
   64: function RuntimeActionButton({
   65:   action,
   66: }: {
   67:   action: ERPRuntimeActionBarAction;
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: disabled :: line 78

```tsx
   72:       <span>{action.loading ? "Traitement..." : action.label}</span>
   73:     </>
   74:   );
   75: 
   76:   const className = actionClassName(
   77:     action.tone ?? "default",
   78:     action.disabled || action.loading
   79:   );
   80: 
   81:   if (action.href && !action.disabled && !action.loading) {
   82:     return (
   83:       <Link href={action.href} className={className} title={action.description}>
   84:         {content}
   85:       </Link>
   86:     );
   87:   }
   88: 
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: actions :: line 5

```tsx
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
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: actions :: line 228

```tsx
  222:           },
  223:         ],
  224:       },
  225:     ],
  226:   },
  227: 
  228:   actions: rendezvousActions,
  229: 
  230:   operational: {
  231:     enabled: true,
  232:     title: "Rendez-vous",
  233:     subtitle: "Vue opérationnelle des rendez-vous atelier.",
  234:     branding: {
  235:       brandName: "AMARKHYS",
  236:       runtimeLabel: "Runtime ERP",
  237:       eyebrow: "AMARKHYS · Runtime ERP",
  238:     },
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: workflow :: line 26

```tsx
   20:     icon: "calendar",
   21:     category: "amarkhys",
   22: 
   23:     features: {
   24:       dashboard: true,
   25:       analytics: true,
   26:       workflows: true,
   27:       automation: true,
   28:       notifications: true,
   29:       observability: true,
   30:       audit: true,
   31:       realtime: true,
   32:     },
   33:   },
   34: 
   35:   schema: {
   36:     collection: "rendezvous",
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: workflow :: line 458

```tsx
  452:         ],
  453:       },
  454:     ],
  455:   },
  456: 
  457: 
  458:   workflows: [
  459:     {
  460:       key: "rendezvous",
  461:       label: "Cycle rendez-vous",
  462:       initialState: "planifie",
  463: 
  464:       states: [
  465:         { key: "planifie", label: "Planifié", color: "default" },
  466:         { key: "confirme", label: "Confirmé", color: "success" },
  467:         { key: "en_cours", label: "En cours", color: "warning" },
  468:         { key: "termine", label: "Terminé", color: "success" },
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: intervention :: line 118

```tsx
  112:         grid: { cols: 4 },
  113:       },
  114: {
  115:         key: "consumedByInterventionId",
  116:         label: "Intervention liée",
  117:         type: "relation",
  118:         relation: { module: "interventionsauto" },
  119:         searchable: true,
  120:         list: { visible: false },
  121:         grid: { cols: 4 },
  122:       },
  123: {
  124:         key: "typeService",
  125:         label: "Type service",
  126:       required: true,
  127:         type: "select",
  128:         options: [
```

### src/runtime/modules/generated/rendezvous/rendezvous.module.ts :: intervention :: line 398

```tsx
  392:       // Exemple générique désactivé : à remplacer plus tard par une configuration tenant/workspace.
  393:       // { date: "2026-01-01", isClosed: true, reason: "Jour fermé" },
  394:     ],
  395:   },
  396:   composition: {
  397:     // Q21E_D_APPOINTMENT_RELATIONSHIP_COMPOSITION
  398:     // Rendez-vous knows its client, vehicle and generated intervention.
  399:     labelFields: ["clientId", "vehiculeId", "dateRendezVous", "heureRendezVous", "typeService", "statut"],
  400: 
  401:     contextBanner: {
  402:       title: "Contexte rendez-vous",
  403:       items: [
  404:         {
  405:           relationField: "clientId",
  406:           moduleKey: "clientsauto",
  407:           labelFields: ["prenom", "nom", "telephone"],
  408:           tone: "client",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: actions :: line 5

```tsx
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
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: actions :: line 618

```tsx
  612:             labelFields: ["marque", "modele", "immatriculation"],
  613:           },
  614:         ],
  615:       }],
  616:   },
  617: 
  618:   actions: interventionsautoActions,
  619: 
  620:   workflows: [
  621:     {
  622:       key: "intervention",
  623:       label: "Cycle intervention",
  624:       initialState: "ouverte",
  625: 
  626:       states: [
  627:         { key: "ouverte", label: "Ouverte", color: "default" },
  628:         { key: "diagnostic", label: "Diagnostic", color: "warning" },
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: workflow :: line 18

```tsx
   12:     icon: "wrench",
   13:     category: "amarkhys",
   14: 
   15:     features: {
   16:       dashboard: true,
   17:       analytics: true,
   18:       workflows: true,
   19:       automation: true,
   20:       notifications: true,
   21:       observability: true,
   22:       audit: true,
   23:       realtime: true,
   24:     },
   25:   },
   26: 
   27:   schema: {
   28:     collection: "interventionsauto",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: workflow :: line 620

```tsx
  614:         ],
  615:       }],
  616:   },
  617: 
  618:   actions: interventionsautoActions,
  619: 
  620:   workflows: [
  621:     {
  622:       key: "intervention",
  623:       label: "Cycle intervention",
  624:       initialState: "ouverte",
  625: 
  626:       states: [
  627:         { key: "ouverte", label: "Ouverte", color: "default" },
  628:         { key: "diagnostic", label: "Diagnostic", color: "warning" },
  629:         { key: "en_cours", label: "En cours", color: "warning" },
  630:         { key: "terminee", label: "Terminée", color: "success" },
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: facture :: line 135

```tsx
  129:         defaultValue: "ouverte",
  130:         options: [
  131:           { label: "Ouverte", value: "ouverte" },
  132:           { label: "Diagnostic", value: "diagnostic" },
  133:           { label: "En cours", value: "en_cours" },
  134:           { label: "Terminée", value: "terminee" },
  135:           { label: "Facturée", value: "facturee" },
  136:           { label: "Annulée", value: "annulee" },
  137:         ],
  138:         list: { visible: true, order: 5 },
  139:         grid: { cols: 6 },
  140:       }
  141:     ],
  142:   },
  143: 
  144:   form: {
  145:     layout: "tabs",
```

### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts :: facture :: line 288

```tsx
  282:         type: "select",
  283:         options: [
  284:           { label: "Ouverte", value: "ouverte" },
  285:           { label: "Diagnostic", value: "diagnostic" },
  286:           { label: "En cours", value: "en_cours" },
  287:           { label: "Terminée", value: "terminee" },
  288:           { label: "Facturée", value: "facturee" },
  289:           { label: "Annulée", value: "annulee" },
  290:         ],
  291:       },
  292:       {
  293:         key: "typeIntervention",
  294:         label: "Type intervention",
  295:         field: "typeIntervention",
  296:         type: "select",
  297:         options: [
  298:           { label: "Vidange", value: "vidange" },
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: actions :: line 186

```tsx
  180:         key: "statut",
  181:         label: "Statut",
  182:         type: "select",
  183:         defaultValue: "brouillon",
  184:         // Q20H3_SIMPLIFIED_LINE_STATUSES
  185:         // Côté utilisateur, une ligne est seulement préparée ou confirmée.
  186:         // Facturation/retrait sont gérés par relations/actions runtime, pas par statut manuel.
  187:         options: [
  188:           { label: "Brouillon", value: "brouillon" },
  189:           { label: "Validée", value: "validee" },
  190:         ],
  191:         list: { order: 8 },
  192:         grid: { cols: 4 },
  193:       },
  194:       {
  195:         key: "stockMovementId",
  196:         label: "Mouvement stock",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: actions :: line 451

```tsx
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
  457:       permission: "lignesinterventionauto:update",
  458:     },
  459:   ],
  460: 
  461:   workflows: [
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: workflow :: line 14

```tsx
    8:     icon: "list-checks",
    9:     category: "amarkhys",
   10: 
   11:     features: {
   12:       dashboard: true,
   13:       analytics: true,
   14:       workflows: true,
   15:       automation: true,
   16:       notifications: true,
   17:       observability: true,
   18:       audit: true,
   19:       realtime: true,
   20:     },
   21:   },
   22: 
   23:   schema: {
   24:     collection: "lignesinterventionauto",
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: workflow :: line 461

```tsx
  455:       type: "danger",
  456:       runtimeOnly: true,
  457:       permission: "lignesinterventionauto:update",
  458:     },
  459:   ],
  460: 
  461:   workflows: [
  462:     {
  463:       key: "ligne-intervention",
  464:       label: "Cycle ligne intervention",
  465:       initialState: "brouillon",
  466: 
  467:       // Q20H3_SIMPLIFIED_LINE_WORKFLOW
  468:       // Le workflow visible reste volontairement simple.
  469:       // Les états de facturation, retrait ou neutralisation sont techniques.
  470:       states: [
  471:         { key: "brouillon", label: "Brouillon", color: "default" },
```

### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts :: retirer :: line 453

```tsx
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
  457:       permission: "lignesinterventionauto:update",
  458:     },
  459:   ],
  460: 
  461:   workflows: [
  462:     {
  463:       key: "ligne-intervention",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: actions :: line 5

```tsx
    1: import type { ERPModule } from "@/runtime/modules/ERPModule";
    2: 
    3: import {
    4:   facturesautoActions,
    5: } from "./facturesauto.actions";
    6: 
    7: export const facturesautoModule: ERPModule = {
    8:   metadata: {
    9:     key: "facturesauto",
   10:     label: "Factures",
   11:     description: "Facturation atelier AMARKHYS",
   12:     icon: "receipt",
   13:     category: "amarkhys",
   14:     features: {
   15:       dashboard: true,
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: actions :: line 621

```tsx
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
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: workflow :: line 17

```tsx
   11:     description: "Facturation atelier AMARKHYS",
   12:     icon: "receipt",
   13:     category: "amarkhys",
   14:     features: {
   15:       dashboard: true,
   16:       analytics: true,
   17:       workflows: true,
   18:       automation: true,
   19:       notifications: true,
   20:       observability: true,
   21:       audit: true,
   22:       realtime: true,
   23:     },
   24:   },
   25: 
   26:   schema: {
   27:     collection: "facturesauto",
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: workflow :: line 623

```tsx
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

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: paiement :: line 63

```tsx
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
   69:           { label: "Payé", value: "paye" },
   70:         ],
   71:         list: { visible: true, order: 7 },
   72:         grid: { cols: 4 },
   73:       },
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: paiement :: line 151

```tsx
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
  155:           { label: "Carte", value: "carte" },
  156:           { label: "Virement", value: "virement" },
  157:           { label: "Mobile Money", value: "mobile_money" },
  158:         ],
  159:         list: { visible: false },
  160:         grid: { cols: 6 },
  161:       },
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: encaissement :: line 553

```tsx
  547:       "destinataireDernierEnvoiFacture",
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
```

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts :: encaissement :: line 554

```tsx
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
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: actions :: line 5

```tsx
    1: import type { ERPModule } from "@/runtime/modules/ERPModule";
    2: 
    3: import {
    4:   encaissementsautoActions,
    5: } from "./encaissementsauto.actions";
    6: 
    7: export const encaissementsautoModule: ERPModule = {
    8:   metadata: {
    9:     key: "encaissementsauto",
   10:     label: "Encaissements",
   11:     description:
   12:       "Suivi des paiements clients, paiements partiels et encaissements AMARKHYS.",
   13:     icon: "wallet",
   14:     category: "amarkhys",
   15: 
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: actions :: line 338

```tsx
  332:       "canalDernierEnvoiRecu",
  333:       "destinataireDernierEnvoiRecu",
  334:       "nombreEnvoisRecu",
  335:     ],
  336:   },
  337: 
  338:   actions: encaissementsautoActions,
  339: 
  340:   workflows: [
  341:     {
  342:       key: "encaissement",
  343:       label: "Cycle encaissement",
  344:       initialState: "en_attente",
  345: 
  346:       states: [
  347:         {
  348:           key: "en_attente",
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: workflow :: line 19

```tsx
   13:     icon: "wallet",
   14:     category: "amarkhys",
   15: 
   16:     features: {
   17:       dashboard: true,
   18:       analytics: true,
   19:       workflows: true,
   20:       automation: true,
   21:       notifications: true,
   22:       observability: true,
   23:       audit: true,
   24:       realtime: true,
   25:     },
   26:   },
   27: 
   28:   schema: {
   29:     collection: "encaissementsauto",
```

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts :: workflow :: line 340

```tsx
  334:       "nombreEnvoisRecu",
  335:     ],
  336:   },
  337: 
  338:   actions: encaissementsautoActions,
  339: 
  340:   workflows: [
  341:     {
  342:       key: "encaissement",
  343:       label: "Cycle encaissement",
  344:       initialState: "en_attente",
  345: 
  346:       states: [
  347:         {
  348:           key: "en_attente",
  349:           label: "En attente",
  350:           color: "warning",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: workflow :: line 13

```tsx
    7:     description: "Commandes fournisseurs pour pieces et consommables AMARKHYS",
    8:     icon: "shopping-cart",
    9:     category: "amarkhys",
   10:     features: {
   11:       dashboard: true,
   12:       analytics: true,
   13:       workflows: true,
   14:       automation: true,
   15:       notifications: true,
   16:       observability: true,
   17:       audit: true,
   18:       realtime: true,
   19:     },
   20:   },
   21: 
   22:   schema: {
   23:     collection: "commandesstockauto",
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: reception :: line 137

```tsx
  131:       },
  132:     ],
  133:   },
  134: 
  135:   composition: {
  136:     // Q21E_B_STOCK_ORDER_RELATIONSHIP_COMPOSITION
  137:     // Commande stock knows its lines and receptions.
  138:     labelFields: ["numeroCommande", "fournisseurId", "statut"],
  139: 
  140:     children: [
  141:       {
  142:         key: "lignes-commandestock",
  143:         moduleKey: "lignescommandestockauto",
  144:         foreignKey: "commandeId",
  145:         title: "Lignes de commande",
  146:         displayIn: ["detail", "edit"],
  147:         lazy: true,
```

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts :: reception :: line 162

```tsx
  156:             moduleKey: "produitsauto",
  157:             labelFields: ["reference", "nom", "designation", "marque"],
  158:           },
  159:         ],
  160:       },
  161:       {
  162:         key: "receptions-stock",
  163:         moduleKey: "receptionsstockauto",
  164:         foreignKey: "commandeId",
  165:         title: "Réceptions",
  166:         displayIn: ["detail", "edit"],
  167:         lazy: true,
  168:         position: "after",
  169:         allowCreate: true,
  170:         labelFields: ["ligneCommandeId", "produitId", "quantiteRecue", "dateReception", "statut"],
  171:         subtitleFields: ["stockId", "mouvementStockId"],
  172:         relations: [
```

### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts :: workflow :: line 13

```tsx
    7:     description: "Receptions fournisseurs et entrees stock AMARKHYS",
    8:     icon: "inbox",
    9:     category: "amarkhys",
   10:     features: {
   11:       dashboard: true,
   12:       analytics: true,
   13:       workflows: true,
   14:       automation: true,
   15:       notifications: true,
   16:       observability: true,
   17:       audit: true,
   18:       realtime: true,
   19:     },
   20:   },
   21: 
   22:   schema: {
   23:     collection: "receptionsstockauto",
```

### src/runtime/actions/RuntimeActionEngine.ts :: getAvailableActions :: line 43

```tsx
   37:       return "statut";
   38:     }
   39: 
   40:     return "status";
   41:   }
   42: 
   43:   static getAvailableActions({
   44:     actions = [],
   45:     userPermissions = ["*"],
   46:     workflow,
   47:     record,
   48:   }: {
   49:     actions?: ERPModuleAction[];
   50:     userPermissions?: string[];
   51:     workflow?: ERPModuleWorkflow;
   52:     record?: Record<string, unknown>;
   53:   }): ERPModuleAction[] {
```

### src/runtime/actions/RuntimeActionEngine.ts :: execute :: line 103

```tsx
   97:         userPermissions.includes("*") ||
   98:         userPermissions.includes(action.permission)
   99:       );
  100:     });
  101:   }
  102: 
  103:   static async execute({
  104: 
  105:     module,
  106: 
  107:     action,
  108: 
  109:     record,
  110: 
  111:     user,
  112: 
  113:   }: {
```

### src/runtime/actions/RuntimeActionEngine.ts :: execute :: line 232

```tsx
  226:             action,
  227:             record,
  228:           };
  229:         }
  230: 
  231:         return WorkflowRuntimeService
  232:           .executeTransition({
  233: 
  234:             module,
  235: 
  236:             workflow,
  237: 
  238:             entityId,
  239: 
  240:             record,
  241: 
  242:             action:
```

### src/runtime/actions/RuntimeActionEngine.ts :: runtimeOnly :: line 82

```tsx
   76:           )
   77:           .map((transition) => transition.action);
   78:     }
   79: 
   80:     return actions.filter((action) => {
   81:       // Q20H5C_RUNTIME_ONLY_ACTIONS
   82:       // Une action runtimeOnly est une action métier contrôlée
   83:       // qui ne correspond pas forcément à une transition de statut.
   84:       if (
   85:         allowedActionKeys &&
   86:         !allowedActionKeys.includes(action.key) &&
   87:         !action.runtimeOnly
   88:       ) {
   89:         return false;
   90:       }
   91: 
   92:       if (!action.permission) {
```

### src/runtime/actions/RuntimeActionEngine.ts :: runtimeOnly :: line 87

```tsx
   81:       // Q20H5C_RUNTIME_ONLY_ACTIONS
   82:       // Une action runtimeOnly est une action métier contrôlée
   83:       // qui ne correspond pas forcément à une transition de statut.
   84:       if (
   85:         allowedActionKeys &&
   86:         !allowedActionKeys.includes(action.key) &&
   87:         !action.runtimeOnly
   88:       ) {
   89:         return false;
   90:       }
   91: 
   92:       if (!action.permission) {
   93:         return true;
   94:       }
   95: 
   96:       return (
   97:         userPermissions.includes("*") ||
```

### src/runtime/actions/RuntimeActionEngine.ts :: action.key :: line 86

```tsx
   80:     return actions.filter((action) => {
   81:       // Q20H5C_RUNTIME_ONLY_ACTIONS
   82:       // Une action runtimeOnly est une action métier contrôlée
   83:       // qui ne correspond pas forcément à une transition de statut.
   84:       if (
   85:         allowedActionKeys &&
   86:         !allowedActionKeys.includes(action.key) &&
   87:         !action.runtimeOnly
   88:       ) {
   89:         return false;
   90:       }
   91: 
   92:       if (!action.permission) {
   93:         return true;
   94:       }
   95: 
   96:       return (
```

### src/runtime/actions/RuntimeActionEngine.ts :: action.key :: line 135

```tsx
  129:       "ERP ACTION EXECUTED",
  130:       {
  131:         module:
  132:           module?.metadata?.key,
  133: 
  134:         action:
  135:           action.key,
  136: 
  137:         record,
  138:       }
  139:     );
  140: 
  141:     // Q20H5C_B2_REMOVE_LINE_ACTION
  142:     // Action métier non-transitionnelle : retirer proprement une ligne
  143:     // sans réintroduire un statut utilisateur "annulée".
  144:     if (
  145:       module?.metadata?.key === "lignesinterventionauto" &&
```

### src/runtime/actions/RuntimeActionEngine.ts :: action.key :: line 146

```tsx
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
```

### src/runtime/actions/RuntimeActionEngine.ts :: action.key :: line 243

```tsx
  237: 
  238:             entityId,
  239: 
  240:             record,
  241: 
  242:             action:
  243:               action.key,
  244: 
  245:             user,
  246:           });
  247:       }
  248:     }
  249: 
  250:     return {
  251:       success: true,
  252:       action,
  253:       record,
```

### src/runtime/actions/RuntimeActionEngine.ts :: record :: line 25

```tsx
   19: } from "@/runtime/validation/RuntimeValidationEngine";
   20: 
   21: export class RuntimeActionEngine {
   22: 
   23:   static resolveStateField(
   24:     workflow: ERPModuleWorkflow,
   25:     record?: Record<string, unknown>
   26:   ): string {
   27: 
   28:     if (workflow.stateField) {
   29:       return workflow.stateField;
   30:     }
   31: 
   32:     if (record && "workflowState" in record) {
   33:       return "workflowState";
   34:     }
   35: 
```

### src/runtime/actions/RuntimeActionEngine.ts :: record :: line 32

```tsx
   26:   ): string {
   27: 
   28:     if (workflow.stateField) {
   29:       return workflow.stateField;
   30:     }
   31: 
   32:     if (record && "workflowState" in record) {
   33:       return "workflowState";
   34:     }
   35: 
   36:     if (record && "statut" in record) {
   37:       return "statut";
   38:     }
   39: 
   40:     return "status";
   41:   }
   42: 
```

### src/runtime/actions/RuntimeActionEngine.ts :: record :: line 32

```tsx
   26:   ): string {
   27: 
   28:     if (workflow.stateField) {
   29:       return workflow.stateField;
   30:     }
   31: 
   32:     if (record && "workflowState" in record) {
   33:       return "workflowState";
   34:     }
   35: 
   36:     if (record && "statut" in record) {
   37:       return "statut";
   38:     }
   39: 
   40:     return "status";
   41:   }
   42: 
```

### src/runtime/actions/RuntimeActionEngine.ts :: record :: line 36

```tsx
   30:     }
   31: 
   32:     if (record && "workflowState" in record) {
   33:       return "workflowState";
   34:     }
   35: 
   36:     if (record && "statut" in record) {
   37:       return "statut";
   38:     }
   39: 
   40:     return "status";
   41:   }
   42: 
   43:   static getAvailableActions({
   44:     actions = [],
   45:     userPermissions = ["*"],
   46:     workflow,
```

### src/runtime/actions/RuntimeActionEngine.ts :: module :: line 6

```tsx
    1: import type {
    2:   ERPModule,
    3:   ERPModuleAction,
    4:   ERPModuleWorkflow,
    5: }
    6: from "@/runtime/modules/ERPModule";
    7: 
    8: import {
    9:   WorkflowRuntimeService,
   10: }
   11: from "@/runtime/workflow-persistence/WorkflowRuntimeService";
   12: 
   13: import {
   14:   RuntimeWorkflowEngine,
   15: } from "@/runtime/workflows/RuntimeWorkflowEngine";
   16: 
```

### src/runtime/actions/RuntimeActionEngine.ts :: module :: line 105

```tsx
   99:       );
  100:     });
  101:   }
  102: 
  103:   static async execute({
  104: 
  105:     module,
  106: 
  107:     action,
  108: 
  109:     record,
  110: 
  111:     user,
  112: 
  113:   }: {
  114: 
  115:     module?: ERPModule;
```

### src/runtime/actions/RuntimeActionEngine.ts :: module :: line 115

```tsx
  109:     record,
  110: 
  111:     user,
  112: 
  113:   }: {
  114: 
  115:     module?: ERPModule;
  116: 
  117:     action: ERPModuleAction;
  118: 
  119:     record?: Record<string, unknown>;
  120: 
  121:     user?: unknown;
  122: 
  123:   }) {
  124: 
  125:     const workflow =
```

### src/runtime/actions/RuntimeActionEngine.ts :: module :: line 126

```tsx
  120: 
  121:     user?: unknown;
  122: 
  123:   }) {
  124: 
  125:     const workflow =
  126:       module?.workflows?.[0];
  127: 
  128:     console.log(
  129:       "ERP ACTION EXECUTED",
  130:       {
  131:         module:
  132:           module?.metadata?.key,
  133: 
  134:         action:
  135:           action.key,
  136: 
```

## Conclusion

Architecture d’exécution validée, mais certains modules/actions/effets métier attendus ne sont pas encore suffisamment déclarés ou détectables.

## Prochaine passe recommandée

- Si WARN sur actions manquantes : enrichir les modules générés concernés.
- Si WARN sur effets métier manquants : brancher `RuntimeActionEngine` vers les services/règles runtime existants.
- Puis tester manuellement les parcours : RDV confirmé → intervention, intervention terminée → facture, retirer ligne, réception stock validée.