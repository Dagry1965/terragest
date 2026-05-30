# Q2-OP-I13 — Audit centralisation des boutons métier côté Runtime Action Bar

Objectif : vérifier que les boutons workflow/actions métier ne sont plus rendus par `ERPEnterpriseForm`, et que la responsabilité est centralisée côté `ERPRuntimePage` / `ERPRuntimeActionBar`.

## Résumé

- OK : 31
- INFO : 7
- WARN : 0
- WARN HIGH : 0
- FAIL : 0
- FAIL HIGH : 0

## Doctrine cible

- `ERPEnterpriseForm` = champs, validation, submit, annuler, supprimer.
- `ERPEnterpriseForm` ne doit pas connaître `RuntimeActionEngine`.
- `ERPEnterpriseForm` ne doit plus recevoir `workflowActions`.
- `ERPRuntimePage` orchestre le module, le record, les permissions et les actions.
- `ERPRuntimeActionBar` rend les boutons métier.

## Checks

| Area | Status | Severity | File | Lines | Message |
|---|---:|---:|---|---|---|
| file | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx found |
| file | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | src/components/erp/runtime/ERPRuntimePage.tsx found |
| file | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` |  | src/components/erp/runtime/ERPRuntimeActionBar.tsx found |
| file | OK | HIGH | `src/components/erp/runtime/ERPRuntimeDetails.tsx` |  | src/components/erp/runtime/ERPRuntimeDetails.tsx found |
| file | OK | HIGH | `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx` |  | src/components/erp/runtime/ERPRelatedRecordsPanel.tsx found |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | workflowActions absent from ERPEnterpriseForm |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | workflowActions.map absent from ERPEnterpriseForm |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | RuntimeActionEngine absent from ERPEnterpriseForm |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | RuntimeActionEngine.execute absent from ERPEnterpriseForm |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | pendingWorkflowActionRef absent from ERPEnterpriseForm |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | handleRuntimeAction absent from ERPEnterpriseForm |
| form-allowed-ui | INFO | LOW | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1997 | type="submit" present in ERPEnterpriseForm |
| form-allowed-ui | INFO | LOW | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1422, 2036 | handleDeleteRecord present in ERPEnterpriseForm |
| form-allowed-ui | INFO | LOW | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1535, 1969 | handleBusinessStatusAction present in ERPEnterpriseForm |
| form-allowed-ui | INFO | LOW | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1392, 1437, 2010 | router.push( present in ERPEnterpriseForm |
| form-allowed-ui | INFO | LOW | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 16, 1996, 2003, 2005, 2018, 2032, 2039 | ERPButton present in ERPEnterpriseForm |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 31, 32, 214, 278 | RuntimeActionEngine present in ERPRuntimePage |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 278 | RuntimeActionEngine.getAvailableActions present in ERPRuntimePage |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 214 | RuntimeActionEngine.execute present in ERPRuntimePage |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 42, 45, 272, 449, 455 | runtimeActions present in ERPRuntimePage |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 208, 457 | handleRuntimeAction present in ERPRuntimePage |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 14, 15, 16, 44, 93, 451 | ERPRuntimeActionBar present in ERPRuntimePage |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 41, 454 | mapRuntimeActionsToActionBarActions present in ERPRuntimePage |
| runtime-page-forbidden | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | workflowActions={ absent from ERPRuntimePage |
| runtime-page-forbidden | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | workflowActions= absent from ERPRuntimePage |
| action-bar-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 6, 14, 22, 27, 30, 36, 42, 67, 102, 108 | ERPRuntimeActionBar present in ERPRuntimeActionBar |
| action-bar-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 14, 30, 67 | ERPRuntimeActionBarAction present in ERPRuntimeActionBar |
| action-bar-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 122 | data-runtime-action-bar present in ERPRuntimeActionBar |
| action-bar-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 81, 83 | action.href present in ERPRuntimeActionBar |
| action-bar-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 95 | action.onClick present in ERPRuntimeActionBar |
| action-bar-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 64, 139 | RuntimeActionButton present in ERPRuntimeActionBar |
| runtime-page-legacy | OK | LOW | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | runtimeActions.map absent in ERPRuntimePage |
| runtime-page-legacy | OK | LOW | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | <button absent in ERPRuntimePage |
| runtime-page-legacy | OK | LOW | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | handleRuntimeAction(action) absent in ERPRuntimePage |
| duplicate-risk | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | Runtime action rendering appears centralized through ERPRuntimeActionBar. |
| payment-related-buttons | INFO | MEDIUM | `src/components/erp/runtime/ERPRuntimeDetails.tsx / src/components/erp/runtime/ERPRelatedRecordsPanel.tsx` | 140, 174, 177, 169 | encaissement occurrences in details/panels: 4 |
| payment-related-buttons | INFO | MEDIUM | `src/components/erp/runtime/ERPRuntimeDetails.tsx / src/components/erp/runtime/ERPRelatedRecordsPanel.tsx` | 136, 140, 179 | paiement occurrences in details/panels: 3 |
| payment-related-buttons | OK | MEDIUM | `src/components/erp/runtime/ERPRuntimeDetails.tsx / src/components/erp/runtime/ERPRelatedRecordsPanel.tsx` |  | buildRuntimeFactureEncaissementCreateHref occurrences in details/panels: 0 |

## Contextes utiles

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="submit" :: line 1997

```tsx
1991: 
1992: 
1993: 
1994:             {!isRemovedRecord ? (
1995:               <>
1996:                 <ERPButton
1997:                   type="submit"
1998:                   disabled={saving}
1999:                 >
2000:                   {saving
2001:                     ? "Enregistrement..."
2002:                     : "Enregistrer"}
2003:                 </ERPButton>
2004: 
2005:                 <ERPButton
2006:                   variant="secondary"
2007:                   type="button"
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: handleDeleteRecord :: line 1422

```tsx
1416:       ]);
1417:     } finally {
1418:       setSaving(false);
1419:     }
1420:   }
1421: 
1422:   async function handleDeleteRecord() {
1423:     const confirmed = window.confirm(
1424:       "Supprimer cet element ?"
1425:     );
1426: 
1427:     if (!confirmed) {
1428:       return;
1429:     }
1430: 
1431:     try {
1432:       await RuntimeDataBinding.delete(
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: handleDeleteRecord :: line 2036

```tsx
2030: 
2031: {mode === "edit" && Boolean(initialData?.id) && !sensitiveBusinessModule ? (
2032:               <ERPButton
2033:                 type="button"
2034:                 variant="danger"
2035:                 disabled={saving || isRemovedRecord}
2036:                 onClick={handleDeleteRecord}
2037:               >
2038:                 Supprimer
2039:               </ERPButton>
2040:             ) : null}
2041:           </div>
2042:         </div>
2043: 
2044:         <ERPFormSummaryPanel module={module} />
2045:       </section>
2046:     </form>
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: handleBusinessStatusAction :: line 1535

```tsx
1529:       };
1530:     }
1531: 
1532:     return null;
1533:   }
1534: 
1535:   async function handleBusinessStatusAction() {
1536:     const action = getBusinessStatusAction();
1537: 
1538:     if (!action || !initialData?.id) {
1539:       return;
1540:     }
1541: 
1542:     const confirmed = window.confirm(action.confirmMessage);
1543: 
1544:     if (!confirmed) {
1545:       return;
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: handleBusinessStatusAction :: line 1969

```tsx
1963:                     type="button"
1964: 
1965: 
1966:                     disabled={saving}
1967: 
1968: 
1969:                     onClick={handleBusinessStatusAction}
1970: 
1971: 
1972:                     className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-black text-[var(--erp-text)] shadow-sm transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
1973: 
1974: 
1975:                   >
1976: 
1977: 
1978:                     {businessStatusAction.label}
1979: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: router.push( :: line 1392

```tsx
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
1400: 
1401:       const message =
1402:         toFriendlyRuntimeErrorMessage(
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: router.push( :: line 1437

```tsx
1431:     try {
1432:       await RuntimeDataBinding.delete(
1433:         module,
1434:         String(initialData.id)
1435:       );
1436: 
1437:       router.push(
1438:         module.metadata.routes?.list ??
1439:           `/${module.metadata.key}`
1440:       );
1441:     } catch (error) {
1442:       const message =
1443:         error instanceof Error
1444:           ? error.message
1445:           : "Suppression impossible.";
1446: 
1447:       setErrors([
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: router.push( :: line 2010

```tsx
2004: 
2005:                 <ERPButton
2006:                   variant="secondary"
2007:                   type="button"
2008:                   disabled={saving}
2009:                   onClick={() =>
2010:                     router.push(
2011:                       returnTo ??
2012:                         module.metadata.routes?.list ??
2013:                         `/${module.metadata.key}`
2014:                     )
2015:                   }
2016:                 >
2017:                   Annuler
2018:                 </ERPButton>
2019:               </>
2020:             ) : null}
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 16

```tsx
  10: import { ERPModuleBuilder } from "@/runtime/modules";
  11: import { RuntimeDataBinding } from "@/runtime/data-binding";
  12: import { RuntimeStatusGovernanceEngine } from "@/runtime/status";
  13: import { RuntimeComputedFieldsEngine } from "@/runtime/computed";
  14: import { RuntimeAutoFillEngine } from "@/runtime/autofill";
  15: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
  16: import { ERPButton } from "@/components/erp/ui";
  17: 
  18: import { ERPFormField } from "./ERPFormField";
  19: import { ERPFormSection } from "./ERPFormSection";
  20: import { ERPFormSummaryPanel } from "./ERPFormSummaryPanel";
  21: import { ERPFormTabs } from "./ERPFormTabs";
  22: 
  23: import {
  24:   RuntimePermissionEngine,
  25: } from "@/runtime/permissions/RuntimePermissionEngine";
  26: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 1996

```tsx
1990:             ) : null}
1991: 
1992: 
1993: 
1994:             {!isRemovedRecord ? (
1995:               <>
1996:                 <ERPButton
1997:                   type="submit"
1998:                   disabled={saving}
1999:                 >
2000:                   {saving
2001:                     ? "Enregistrement..."
2002:                     : "Enregistrer"}
2003:                 </ERPButton>
2004: 
2005:                 <ERPButton
2006:                   variant="secondary"
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2003

```tsx
1997:                   type="submit"
1998:                   disabled={saving}
1999:                 >
2000:                   {saving
2001:                     ? "Enregistrement..."
2002:                     : "Enregistrer"}
2003:                 </ERPButton>
2004: 
2005:                 <ERPButton
2006:                   variant="secondary"
2007:                   type="button"
2008:                   disabled={saving}
2009:                   onClick={() =>
2010:                     router.push(
2011:                       returnTo ??
2012:                         module.metadata.routes?.list ??
2013:                         `/${module.metadata.key}`
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2005

```tsx
1999:                 >
2000:                   {saving
2001:                     ? "Enregistrement..."
2002:                     : "Enregistrer"}
2003:                 </ERPButton>
2004: 
2005:                 <ERPButton
2006:                   variant="secondary"
2007:                   type="button"
2008:                   disabled={saving}
2009:                   onClick={() =>
2010:                     router.push(
2011:                       returnTo ??
2012:                         module.metadata.routes?.list ??
2013:                         `/${module.metadata.key}`
2014:                     )
2015:                   }
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 31

```tsx
  25: import { ERPRelatedRecordsPanel } from "./ERPRelatedRecordsPanel";
  26: import { ERPContextBanner } from "@/components/erp/context/ERPContextBanner";
  27: 
  28: import type { ERPModule, ERPModuleAction } from "@/runtime/modules/ERPModule";
  29: 
  30: import {
  31:   RuntimeActionEngine,
  32: } from "@/runtime/actions/RuntimeActionEngine";
  33: 
  34: import {
  35:   RuntimeDataBinding,
  36: } from "@/runtime/data-binding/RuntimeDataBinding";
  37: 
  38: import { ERPOperationalModulePage } from "@/components/erp/operational";
  39: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
  40: 
  41: function mapRuntimeActionsToActionBarActions(
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 32

```tsx
  26: import { ERPContextBanner } from "@/components/erp/context/ERPContextBanner";
  27: 
  28: import type { ERPModule, ERPModuleAction } from "@/runtime/modules/ERPModule";
  29: 
  30: import {
  31:   RuntimeActionEngine,
  32: } from "@/runtime/actions/RuntimeActionEngine";
  33: 
  34: import {
  35:   RuntimeDataBinding,
  36: } from "@/runtime/data-binding/RuntimeDataBinding";
  37: 
  38: import { ERPOperationalModulePage } from "@/components/erp/operational";
  39: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
  40: 
  41: function mapRuntimeActionsToActionBarActions(
  42:   runtimeActions: ERPRuntimePageActionSource[] = [],
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 214

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

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 278

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

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 42

```tsx
  36: } from "@/runtime/data-binding/RuntimeDataBinding";
  37: 
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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 45

```tsx
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
  55: 
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 272

```tsx
 266:       : "#";
 267: 
 268:   const isRemovedRecord = Boolean(currentRecord?.removedAt);
 269: 
 270: 
 271: 
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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 449

```tsx
 443:               mode={type as "detail" | "edit"}
 444:             />
 445:           ))}
 446:         </div>
 447: 
 448: 
 449:         {(type === "detail" || type === "edit") && runtimeActions.length > 0 ? (
 450:           <div data-runtime-action-bar-placement="runtime-page">
 451:             <ERPRuntimeActionBar
 452:               title="Actions métier"
 453:               description="Actions runtime disponibles pour cet enregistrement."
 454:               actions={mapRuntimeActionsToActionBarActions(
 455:                 runtimeActions as ERPRuntimePageActionSource[],
 456:                 (runtimeAction) => {
 457:                   void handleRuntimeAction(runtimeAction);
 458:                 }
 459:               )}
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 455

```tsx
 449:         {(type === "detail" || type === "edit") && runtimeActions.length > 0 ? (
 450:           <div data-runtime-action-bar-placement="runtime-page">
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

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 93

```tsx
  87:         description:
  88:           typeof runtimeAction.description === "string"
  89:             ? runtimeAction.description
  90:             : undefined,
  91:       };
  92:     })
  93:     .filter(Boolean) as ERPRuntimeActionBarAction[];
  94: }
  95: 
  96: function buildInvoicePaymentHref(
  97:   record: Record<string, unknown>
  98: ): string {
  99:   const factureId =
 100:     String(record.id ?? record._id ?? "");
 101: 
 102:   const montantTTC =
 103:     Number(record.montantTTC ?? 0);
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 451

```tsx
 445:           ))}
 446:         </div>
 447: 
 448: 
 449:         {(type === "detail" || type === "edit") && runtimeActions.length > 0 ? (
 450:           <div data-runtime-action-bar-placement="runtime-page">
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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: mapRuntimeActionsToActionBarActions :: line 41

```tsx
  35:   RuntimeDataBinding,
  36: } from "@/runtime/data-binding/RuntimeDataBinding";
  37: 
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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: mapRuntimeActionsToActionBarActions :: line 454

```tsx
 448: 
 449:         {(type === "detail" || type === "edit") && runtimeActions.length > 0 ? (
 450:           <div data-runtime-action-bar-placement="runtime-page">
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
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: ERPRuntimeActionBar :: line 6

```tsx
   1: "use client";
   2: 
   3: import Link from "next/link";
   4: import type { ReactNode } from "react";
   5: 
   6: export type ERPRuntimeActionBarTone =
   7:   | "default"
   8:   | "primary"
   9:   | "success"
  10:   | "warning"
  11:   | "danger"
  12:   | "muted";
  13: 
  14: export type ERPRuntimeActionBarAction = {
  15:   key: string;
  16:   label: string;
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: ERPRuntimeActionBar :: line 14

```tsx
   8:   | "primary"
   9:   | "success"
  10:   | "warning"
  11:   | "danger"
  12:   | "muted";
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
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: ERPRuntimeActionBar :: line 22

```tsx
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
  30:   actions?: ERPRuntimeActionBarAction[];
  31:   compact?: boolean;
  32:   className?: string;
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: ERPRuntimeActionBar :: line 27

```tsx
  21:   hidden?: boolean;
  22:   tone?: ERPRuntimeActionBarTone;
  23:   icon?: ReactNode;
  24:   onClick?: () => void | Promise<void>;
  25: };
  26: 
  27: export type ERPRuntimeActionBarProps = {
  28:   title?: string;
  29:   description?: string;
  30:   actions?: ERPRuntimeActionBarAction[];
  31:   compact?: boolean;
  32:   className?: string;
  33: };
  34: 
  35: function actionClassName(
  36:   tone: ERPRuntimeActionBarTone = "default",
  37:   disabled?: boolean
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: ERPRuntimeActionBarAction :: line 14

```tsx
   8:   | "primary"
   9:   | "success"
  10:   | "warning"
  11:   | "danger"
  12:   | "muted";
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
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: ERPRuntimeActionBarAction :: line 30

```tsx
  24:   onClick?: () => void | Promise<void>;
  25: };
  26: 
  27: export type ERPRuntimeActionBarProps = {
  28:   title?: string;
  29:   description?: string;
  30:   actions?: ERPRuntimeActionBarAction[];
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
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: ERPRuntimeActionBarAction :: line 67

```tsx
  61:   return [base, tones[tone], state].join(" ");
  62: }
  63: 
  64: function RuntimeActionButton({
  65:   action,
  66: }: {
  67:   action: ERPRuntimeActionBarAction;
  68: }) {
  69:   const content = (
  70:     <>
  71:       {action.icon ? <span className="shrink-0">{action.icon}</span> : null}
  72:       <span>{action.loading ? "Traitement..." : action.label}</span>
  73:     </>
  74:   );
  75: 
  76:   const className = actionClassName(
  77:     action.tone ?? "default",
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: data-runtime-action-bar :: line 122

```tsx
 116:     <section
 117:       className={[
 118:         "rounded-[2rem] border border-slate-200 bg-white shadow-sm",
 119:         compact ? "p-4" : "p-5",
 120:         className,
 121:       ].join(" ")}
 122:       data-runtime-action-bar="true"
 123:     >
 124:       <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
 125:         <div className="min-w-0">
 126:           <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
 127:             Runtime
 128:           </p>
 129:           <h2 className="mt-1 text-lg font-black text-slate-950">{title}</h2>
 130:           {description ? (
 131:             <p className="mt-1 max-w-3xl text-sm text-slate-500">
 132:               {description}
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

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: RuntimeActionButton :: line 64

```tsx
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
  68: }) {
  69:   const content = (
  70:     <>
  71:       {action.icon ? <span className="shrink-0">{action.icon}</span> : null}
  72:       <span>{action.loading ? "Traitement..." : action.label}</span>
  73:     </>
  74:   );
```

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: RuntimeActionButton :: line 139

```tsx
 133:             </p>
 134:           ) : null}
 135:         </div>
 136: 
 137:         <div className="flex flex-wrap items-center gap-2">
 138:           {visibleActions.map((action) => (
 139:             <RuntimeActionButton key={action.key} action={action} />
 140:           ))}
 141:         </div>
 142:       </div>
 143:     </section>
 144:   );
 145: }
 146: 
```

### src/components/erp/runtime/ERPRuntimeDetails.tsx :: encaissement :: line 140

```tsx
 134: 
 135:               <h2 className="mt-2 text-2xl font-black text-[var(--erp-table-head-text)] min-w-[220px] justify-center self-end mt-auto mb-0 lg:self-end shadow-[0_12px_30px_rgba(0,166,138,0.22)]">
 136:               Synthèse paiement facture
 137:               </h2>
 138: 
 139:               <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
 140:                 Crée un encaissement lié à cette facture. Le montant payé, le reste à payer et le statut de paiement seront recalculés automatiquement.
 141:               </p>
 142: 
 143:               <div className="mt-5 grid gap-3 md:grid-cols-3">
 144:                 <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
 145:                   <p className="text-xs font-bold uppercase tracking-wide text-[var(--erp-text-muted)]">
 146:                     Total TTC
 147:                   </p>
 148:                   <p className="mt-1 text-xl font-black text-[var(--erp-table-head-text)]">
 149:                     {amountSummary.montantTTC.toLocaleString("fr-FR")} FCFA
 150:                   </p>
```

### src/components/erp/runtime/ERPRuntimeDetails.tsx :: encaissement :: line 174

```tsx
 168:                   </p>
 169:                 </div>
 170:               </div>
 171:             </div>
 172: 
 173:             <a
 174:               href="#historique-encaissements"
 175:               className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:bg-white/15 min-w-[220px] self-end lg:self-end mt-auto mb-0"
 176:             >
 177:               Voir l'historique des encaissements
 178:             </a>
 179:           </div>
 180:         </section>
 181:       ) : null}
 182: 
 183:       <ERPCard
 184:         title={`Détails ${module.metadata.label}`}
```

### src/components/erp/runtime/ERPRuntimeDetails.tsx :: encaissement :: line 177

```tsx
 171:             </div>
 172: 
 173:             <a
 174:               href="#historique-encaissements"
 175:               className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:bg-white/15 min-w-[220px] self-end lg:self-end mt-auto mb-0"
 176:             >
 177:               Voir l'historique des encaissements
 178:             </a>
 179:           </div>
 180:         </section>
 181:       ) : null}
 182: 
 183:       <ERPCard
 184:         title={`Détails ${module.metadata.label}`}
 185:         description="Vue détail générée automatiquement par le Runtime ERP."
 186:       >
 187:         <div className="grid gap-4 md:grid-cols-2">
```

### src/components/erp/runtime/ERPRelatedRecordsPanel.tsx :: encaissement :: line 169

```tsx
 163: }
 164: 
 165: function getBusinessSortCandidates(
 166:   record: Record<string, unknown>,
 167:   childModuleKey?: string
 168: ): unknown[] {
 169:   if (childModuleKey === "encaissementsauto") {
 170:     return [
 171:       record.datePaiement,
 172:       record.createdAt,
 173:       record.id,
 174:       record._id,
 175:     ];
 176:   }
 177: 
 178:   if (
 179:     childModuleKey === "echeancespaiementauto" ||
```

### src/components/erp/runtime/ERPRuntimeDetails.tsx :: paiement :: line 136

```tsx
 130:             <div>
 131:               <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
 132:                 Encaissement facture
 133:               </p>
 134: 
 135:               <h2 className="mt-2 text-2xl font-black text-[var(--erp-table-head-text)] min-w-[220px] justify-center self-end mt-auto mb-0 lg:self-end shadow-[0_12px_30px_rgba(0,166,138,0.22)]">
 136:               Synthèse paiement facture
 137:               </h2>
 138: 
 139:               <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
 140:                 Crée un encaissement lié à cette facture. Le montant payé, le reste à payer et le statut de paiement seront recalculés automatiquement.
 141:               </p>
 142: 
 143:               <div className="mt-5 grid gap-3 md:grid-cols-3">
 144:                 <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
 145:                   <p className="text-xs font-bold uppercase tracking-wide text-[var(--erp-text-muted)]">
 146:                     Total TTC
```

### src/components/erp/runtime/ERPRuntimeDetails.tsx :: paiement :: line 140

```tsx
 134: 
 135:               <h2 className="mt-2 text-2xl font-black text-[var(--erp-table-head-text)] min-w-[220px] justify-center self-end mt-auto mb-0 lg:self-end shadow-[0_12px_30px_rgba(0,166,138,0.22)]">
 136:               Synthèse paiement facture
 137:               </h2>
 138: 
 139:               <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
 140:                 Crée un encaissement lié à cette facture. Le montant payé, le reste à payer et le statut de paiement seront recalculés automatiquement.
 141:               </p>
 142: 
 143:               <div className="mt-5 grid gap-3 md:grid-cols-3">
 144:                 <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
 145:                   <p className="text-xs font-bold uppercase tracking-wide text-[var(--erp-text-muted)]">
 146:                     Total TTC
 147:                   </p>
 148:                   <p className="mt-1 text-xl font-black text-[var(--erp-table-head-text)]">
 149:                     {amountSummary.montantTTC.toLocaleString("fr-FR")} FCFA
 150:                   </p>
```

### src/components/erp/runtime/ERPRelatedRecordsPanel.tsx :: paiement :: line 179

```tsx
 173:       record.id,
 174:       record._id,
 175:     ];
 176:   }
 177: 
 178:   if (
 179:     childModuleKey === "echeancespaiementauto" ||
 180:     childModuleKey === "echeancesauto"
 181:   ) {
 182:     return [
 183:       record.dateEcheance,
 184:       record.datePrevue,
 185:       record.datePaiement,
 186:       record.createdAt,
 187:       record.id,
 188:       record._id,
 189:     ];
```

## Conclusion

La centralisation des boutons métier côté runtime action bar est validée.

## Prochaine passe recommandée

- Si `runtimeActions.map` existe encore dans `ERPRuntimePage`, faire `Q2-OP-I14` pour supprimer le rendu legacy direct et ne garder que `ERPRuntimeActionBar`.
- Sinon, passer à la formalisation des workflows metadata prioritaire : `rendezvous`, `interventionsauto`, `lignesinterventionauto`, `facturesauto`, `encaissementsauto`.