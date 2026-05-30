# Q2-OP-I13 — Audit centralisation des boutons métier côté Runtime Action Bar

Objectif : vérifier que les boutons workflow/actions métier ne sont plus rendus par `ERPEnterpriseForm`, et que la responsabilité est centralisée côté `ERPRuntimePage` / `ERPRuntimeActionBar`.

## Résumé

- OK : 22
- INFO : 7
- WARN : 4
- WARN HIGH : 1
- FAIL : 5
- FAIL HIGH : 5

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
| form-forbidden | FAIL | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 223, 405, 1821, 1833 | workflowActions still exists in ERPEnterpriseForm |
| form-forbidden | FAIL | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1833 | workflowActions.map still exists in ERPEnterpriseForm |
| form-forbidden | FAIL | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 16, 16, 1407 | RuntimeActionEngine still exists in ERPEnterpriseForm |
| form-forbidden | FAIL | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1407 | RuntimeActionEngine.execute still exists in ERPEnterpriseForm |
| form-forbidden | FAIL | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 413, 1182, 1273, 1413, 1455, 1838 | pendingWorkflowActionRef still exists in ERPEnterpriseForm |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | handleRuntimeAction absent from ERPEnterpriseForm |
| form-allowed-ui | INFO | LOW | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 2094 | type="submit" present in ERPEnterpriseForm |
| form-allowed-ui | INFO | LOW | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1478, 2133 | handleDeleteRecord present in ERPEnterpriseForm |
| form-allowed-ui | INFO | LOW | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1591, 2066 | handleBusinessStatusAction present in ERPEnterpriseForm |
| form-allowed-ui | INFO | LOW | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1447, 1493, 2107 | router.push( present in ERPEnterpriseForm |
| form-allowed-ui | INFO | LOW | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 22, 2093, 2100, 2102, 2115, 2129, 2136 | ERPButton present in ERPEnterpriseForm |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 31, 32, 209, 273 | RuntimeActionEngine present in ERPRuntimePage |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 273 | RuntimeActionEngine.getAvailableActions present in ERPRuntimePage |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 209 | RuntimeActionEngine.execute present in ERPRuntimePage |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 42, 44, 267, 417, 419, 481 | runtimeActions present in ERPRuntimePage |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 203, 424 | handleRuntimeAction present in ERPRuntimePage |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 14, 15, 16, 43, 88, 478 | ERPRuntimeActionBar present in ERPRuntimePage |
| runtime-page-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 41, 481 | mapRuntimeActionsToActionBarActions present in ERPRuntimePage |
| runtime-page-forbidden | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | workflowActions={ absent from ERPRuntimePage |
| runtime-page-forbidden | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | workflowActions= absent from ERPRuntimePage |
| action-bar-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 6, 14, 22, 27, 30, 36, 42, 67, 102, 108 | ERPRuntimeActionBar present in ERPRuntimeActionBar |
| action-bar-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 14, 30, 67 | ERPRuntimeActionBarAction present in ERPRuntimeActionBar |
| action-bar-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 122 | data-runtime-action-bar present in ERPRuntimeActionBar |
| action-bar-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 81, 83 | action.href present in ERPRuntimeActionBar |
| action-bar-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 95 | action.onClick present in ERPRuntimeActionBar |
| action-bar-required | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 64, 139 | RuntimeActionButton present in ERPRuntimeActionBar |
| runtime-page-legacy | WARN | MEDIUM | `src/components/erp/runtime/ERPRuntimePage.tsx` | 419 | runtimeActions.map still present in ERPRuntimePage |
| runtime-page-legacy | WARN | MEDIUM | `src/components/erp/runtime/ERPRuntimePage.tsx` | 420 | <button still present in ERPRuntimePage |
| runtime-page-legacy | WARN | MEDIUM | `src/components/erp/runtime/ERPRuntimePage.tsx` | 424 | handleRuntimeAction(action) still present in ERPRuntimePage |
| duplicate-risk | WARN | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | ERPRuntimePage has both ERPRuntimeActionBar and legacy runtimeActions.map. Possible duplicate action buttons. |
| payment-related-buttons | INFO | MEDIUM | `src/components/erp/runtime/ERPRuntimeDetails.tsx / src/components/erp/runtime/ERPRelatedRecordsPanel.tsx` | 140, 174, 177, 169 | encaissement occurrences in details/panels: 4 |
| payment-related-buttons | INFO | MEDIUM | `src/components/erp/runtime/ERPRuntimeDetails.tsx / src/components/erp/runtime/ERPRelatedRecordsPanel.tsx` | 136, 140, 179 | paiement occurrences in details/panels: 3 |
| payment-related-buttons | OK | MEDIUM | `src/components/erp/runtime/ERPRuntimeDetails.tsx / src/components/erp/runtime/ERPRelatedRecordsPanel.tsx` |  | buildRuntimeFactureEncaissementCreateHref occurrences in details/panels: 0 |

## Contextes utiles

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions :: line 223

```tsx
 217: }
 218: 
 219: interface ERPEnterpriseFormProps {
 220:   module: ERPModule;
 221:   mode?: "create" | "edit";
 222:   initialData?: Record<string, unknown>;
 223:   workflowActions?: ERPModuleAction[];
 224:   forceReadOnlyBecauseRemoved?: boolean;
 225: }
 226: 
 227: interface ERPFormRelationChangeContext {
 228:   field?: {
 229:     key: string;
 230:     relation?: unknown;
 231:     autoFill?: RuntimeRelationAutoFillConfig;
 232:   };
 233:   selectedOption?: {
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions :: line 405

```tsx
 399: }
 400: 
 401: export function ERPEnterpriseForm({
 402:   module,
 403:   mode = "create",
 404:   initialData = {},
 405:   workflowActions = [],
 406:   forceReadOnlyBecauseRemoved = false,
 407: }: ERPEnterpriseFormProps) {
 408:   const router = useRouter();
 409: 
 410:   const formRef =
 411:     useRef<HTMLFormElement | null>(null);
 412: 
 413:   const pendingWorkflowActionRef =
 414:     useRef<ERPModuleAction | null>(null);
 415:   const searchParams = useSearchParams();
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions :: line 1821

```tsx
1815:             montantPaye={Number(initialData.montantPaye ?? 0)}
1816:             resteAPayer={Number(initialData.resteAPayer ?? 0)}
1817:           />
1818:         </div>
1819:       ) : null}
1820: 
1821:       {mode === "edit" && !isRemovedRecord && workflowActions.length > 0 && (
1822:         <section className="rounded-2xl sm:rounded-3xl border border-[#D5E4E8] bg-[#F8FAFC] p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
1823:           <div className="mb-3">
1824:             <p className="text-xs font-black uppercase tracking-wide text-[#334155]">
1825:               Workflow
1826:             </p>
1827:             <p className="text-sm text-[#111827]">
1828:               Ces actions enregistrent d'abord le formulaire, puis executent le workflow.low.
1829:             </p>
1830:           </div>
1831: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions :: line 1833

```tsx
1827:             <p className="text-sm text-[#111827]">
1828:               Ces actions enregistrent d'abord le formulaire, puis executent le workflow.low.
1829:             </p>
1830:           </div>
1831: 
1832:           <div className="flex flex-wrap gap-3">
1833:             {workflowActions.map((action) => (
1834:               <button
1835:                 key={action.key}
1836:                 type="button"
1837:                 onClick={() => {
1838:                   pendingWorkflowActionRef.current = action;
1839:                   formRef.current?.requestSubmit();
1840:                 }}
1841:                 className={`
1842:                   rounded-2xl
1843:                   px-4
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions.map :: line 1833

```tsx
1827:             <p className="text-sm text-[#111827]">
1828:               Ces actions enregistrent d'abord le formulaire, puis executent le workflow.low.
1829:             </p>
1830:           </div>
1831: 
1832:           <div className="flex flex-wrap gap-3">
1833:             {workflowActions.map((action) => (
1834:               <button
1835:                 key={action.key}
1836:                 type="button"
1837:                 onClick={() => {
1838:                   pendingWorkflowActionRef.current = action;
1839:                   formRef.current?.requestSubmit();
1840:                 }}
1841:                 className={`
1842:                   rounded-2xl
1843:                   px-4
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: RuntimeActionEngine :: line 16

```tsx
  10: import type { ERPModuleAction } from "@/runtime/modules/ERPModule";
  11: import { ERPModuleBuilder } from "@/runtime/modules";
  12: import { RuntimeDataBinding } from "@/runtime/data-binding";
  13: import { RuntimeStatusGovernanceEngine } from "@/runtime/status";
  14: import { RuntimeComputedFieldsEngine } from "@/runtime/computed";
  15: import { RuntimeAutoFillEngine } from "@/runtime/autofill";
  16: import { RuntimeActionEngine } from "@/runtime/actions/RuntimeActionEngine";
  17: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
  18: import {
  19:   RuntimeNotificationCenter,
  20: } from "@/runtime/notifications/RuntimeNotificationCenter";
  21: 
  22: import { ERPButton } from "@/components/erp/ui";
  23: 
  24: import { ERPFormField } from "./ERPFormField";
  25: import { ERPFormSection } from "./ERPFormSection";
  26: import { ERPFormSummaryPanel } from "./ERPFormSummaryPanel";
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: RuntimeActionEngine :: line 16

```tsx
  10: import type { ERPModuleAction } from "@/runtime/modules/ERPModule";
  11: import { ERPModuleBuilder } from "@/runtime/modules";
  12: import { RuntimeDataBinding } from "@/runtime/data-binding";
  13: import { RuntimeStatusGovernanceEngine } from "@/runtime/status";
  14: import { RuntimeComputedFieldsEngine } from "@/runtime/computed";
  15: import { RuntimeAutoFillEngine } from "@/runtime/autofill";
  16: import { RuntimeActionEngine } from "@/runtime/actions/RuntimeActionEngine";
  17: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
  18: import {
  19:   RuntimeNotificationCenter,
  20: } from "@/runtime/notifications/RuntimeNotificationCenter";
  21: 
  22: import { ERPButton } from "@/components/erp/ui";
  23: 
  24: import { ERPFormField } from "./ERPFormField";
  25: import { ERPFormSection } from "./ERPFormSection";
  26: import { ERPFormSummaryPanel } from "./ERPFormSummaryPanel";
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: RuntimeActionEngine :: line 1407

```tsx
1401:         }
1402: 
1403:       }
1404: 
1405:       if (workflowAction && savedRecord) {
1406:         const workflowResult =
1407:           await RuntimeActionEngine.execute({
1408:             module,
1409:             action: workflowAction,
1410:             record: savedRecord,
1411:           });
1412: 
1413:         pendingWorkflowActionRef.current = null;
1414: 
1415:         if (!workflowResult?.success) {
1416:           RuntimeNotificationCenter.workflowError({
1417:             module,
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: RuntimeActionEngine.execute :: line 1407

```tsx
1401:         }
1402: 
1403:       }
1404: 
1405:       if (workflowAction && savedRecord) {
1406:         const workflowResult =
1407:           await RuntimeActionEngine.execute({
1408:             module,
1409:             action: workflowAction,
1410:             record: savedRecord,
1411:           });
1412: 
1413:         pendingWorkflowActionRef.current = null;
1414: 
1415:         if (!workflowResult?.success) {
1416:           RuntimeNotificationCenter.workflowError({
1417:             module,
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: pendingWorkflowActionRef :: line 413

```tsx
 407: }: ERPEnterpriseFormProps) {
 408:   const router = useRouter();
 409: 
 410:   const formRef =
 411:     useRef<HTMLFormElement | null>(null);
 412: 
 413:   const pendingWorkflowActionRef =
 414:     useRef<ERPModuleAction | null>(null);
 415:   const searchParams = useSearchParams();
 416: 
 417:   const queryInitialValuesAppliedRef =
 418:     useRef(false);
 419: 
 420:   const queryValues =
 421:     Object.fromEntries(
 422:       Array.from(searchParams.entries()).filter(
 423:         ([key]) =>
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: pendingWorkflowActionRef :: line 1182

```tsx
1176:     event.preventDefault();
1177:     setSaving(true);
1178: 
1179:     
1180: 
1181:     const workflowAction =
1182:       pendingWorkflowActionRef.current;
1183: const formData =
1184:       new FormData(event.currentTarget);
1185: 
1186:     const payload: Record<string, unknown> = {
1187:       ...formValues,
1188:     };
1189: 
1190:     form.fields
1191:       .filter(
1192:         (field) =>
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: pendingWorkflowActionRef :: line 1273

```tsx
1267:       ...uniqueConstraintErrors,
1268:     ];
1269: 
1270:     setErrors(allValidationErrors);
1271: 
1272:     if (allValidationErrors.length > 0) {
1273:       pendingWorkflowActionRef.current = null;
1274:       setSaving(false);
1275:       return;
1276:     }
1277: 
1278:     const businessRulesValid =
1279:       erpRuntimeValidationBridge.validate(
1280:         module.metadata.key,
1281:         preparedPayload
1282:       );
1283: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: pendingWorkflowActionRef :: line 1413

```tsx
1407:           await RuntimeActionEngine.execute({
1408:             module,
1409:             action: workflowAction,
1410:             record: savedRecord,
1411:           });
1412: 
1413:         pendingWorkflowActionRef.current = null;
1414: 
1415:         if (!workflowResult?.success) {
1416:           RuntimeNotificationCenter.workflowError({
1417:             module,
1418:             action: workflowAction,
1419:             record: savedRecord,
1420:             result: workflowResult,
1421:           });
1422: 
1423:           setErrors([
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="submit" :: line 2094

```tsx
2088: 
2089: 
2090: 
2091:             {!isRemovedRecord ? (
2092:               <>
2093:                 <ERPButton
2094:                   type="submit"
2095:                   disabled={saving}
2096:                 >
2097:                   {saving
2098:                     ? "Enregistrement..."
2099:                     : "Enregistrer"}
2100:                 </ERPButton>
2101: 
2102:                 <ERPButton
2103:                   variant="secondary"
2104:                   type="button"
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: handleDeleteRecord :: line 1478

```tsx
1472:       ]);
1473:     } finally {
1474:       setSaving(false);
1475:     }
1476:   }
1477: 
1478:   async function handleDeleteRecord() {
1479:     const confirmed = window.confirm(
1480:       "Supprimer cet element ?"
1481:     );
1482: 
1483:     if (!confirmed) {
1484:       return;
1485:     }
1486: 
1487:     try {
1488:       await RuntimeDataBinding.delete(
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: handleDeleteRecord :: line 2133

```tsx
2127: 
2128: {mode === "edit" && Boolean(initialData?.id) && !sensitiveBusinessModule ? (
2129:               <ERPButton
2130:                 type="button"
2131:                 variant="danger"
2132:                 disabled={saving || isRemovedRecord}
2133:                 onClick={handleDeleteRecord}
2134:               >
2135:                 Supprimer
2136:               </ERPButton>
2137:             ) : null}
2138:           </div>
2139:         </div>
2140: 
2141:         <ERPFormSummaryPanel module={module} />
2142:       </section>
2143:     </form>
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: handleBusinessStatusAction :: line 1591

```tsx
1585:       };
1586:     }
1587: 
1588:     return null;
1589:   }
1590: 
1591:   async function handleBusinessStatusAction() {
1592:     const action = getBusinessStatusAction();
1593: 
1594:     if (!action || !initialData?.id) {
1595:       return;
1596:     }
1597: 
1598:     const confirmed = window.confirm(action.confirmMessage);
1599: 
1600:     if (!confirmed) {
1601:       return;
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: handleBusinessStatusAction :: line 2066

```tsx
2060:                     type="button"
2061: 
2062: 
2063:                     disabled={saving}
2064: 
2065: 
2066:                     onClick={handleBusinessStatusAction}
2067: 
2068: 
2069:                     className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-black text-[var(--erp-text)] shadow-sm transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
2070: 
2071: 
2072:                   >
2073: 
2074: 
2075:                     {businessStatusAction.label}
2076: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: router.push( :: line 1447

```tsx
1441:           action: workflowAction,
1442:           record: savedRecord,
1443:           result: workflowResult,
1444:         });
1445:       }
1446: 
1447:       router.push(
1448:         returnTo ??
1449:           module.metadata.routes?.list ??
1450:           `/${module.metadata.key}`
1451:       );
1452: 
1453:       router.refresh();
1454:     } catch (error) {
1455:       pendingWorkflowActionRef.current = null;
1456: 
1457:       const message =
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: router.push( :: line 1493

```tsx
1487:     try {
1488:       await RuntimeDataBinding.delete(
1489:         module,
1490:         String(initialData.id)
1491:       );
1492: 
1493:       router.push(
1494:         module.metadata.routes?.list ??
1495:           `/${module.metadata.key}`
1496:       );
1497:     } catch (error) {
1498:       const message =
1499:         error instanceof Error
1500:           ? error.message
1501:           : "Suppression impossible.";
1502: 
1503:       setErrors([
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: router.push( :: line 2107

```tsx
2101: 
2102:                 <ERPButton
2103:                   variant="secondary"
2104:                   type="button"
2105:                   disabled={saving}
2106:                   onClick={() =>
2107:                     router.push(
2108:                       returnTo ??
2109:                         module.metadata.routes?.list ??
2110:                         `/${module.metadata.key}`
2111:                     )
2112:                   }
2113:                 >
2114:                   Annuler
2115:                 </ERPButton>
2116:               </>
2117:             ) : null}
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 22

```tsx
  16: import { RuntimeActionEngine } from "@/runtime/actions/RuntimeActionEngine";
  17: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
  18: import {
  19:   RuntimeNotificationCenter,
  20: } from "@/runtime/notifications/RuntimeNotificationCenter";
  21: 
  22: import { ERPButton } from "@/components/erp/ui";
  23: 
  24: import { ERPFormField } from "./ERPFormField";
  25: import { ERPFormSection } from "./ERPFormSection";
  26: import { ERPFormSummaryPanel } from "./ERPFormSummaryPanel";
  27: import { ERPFormTabs } from "./ERPFormTabs";
  28: 
  29: import {
  30:   RuntimePermissionEngine,
  31: } from "@/runtime/permissions/RuntimePermissionEngine";
  32: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2093

```tsx
2087:             ) : null}
2088: 
2089: 
2090: 
2091:             {!isRemovedRecord ? (
2092:               <>
2093:                 <ERPButton
2094:                   type="submit"
2095:                   disabled={saving}
2096:                 >
2097:                   {saving
2098:                     ? "Enregistrement..."
2099:                     : "Enregistrer"}
2100:                 </ERPButton>
2101: 
2102:                 <ERPButton
2103:                   variant="secondary"
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2100

```tsx
2094:                   type="submit"
2095:                   disabled={saving}
2096:                 >
2097:                   {saving
2098:                     ? "Enregistrement..."
2099:                     : "Enregistrer"}
2100:                 </ERPButton>
2101: 
2102:                 <ERPButton
2103:                   variant="secondary"
2104:                   type="button"
2105:                   disabled={saving}
2106:                   onClick={() =>
2107:                     router.push(
2108:                       returnTo ??
2109:                         module.metadata.routes?.list ??
2110:                         `/${module.metadata.key}`
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2102

```tsx
2096:                 >
2097:                   {saving
2098:                     ? "Enregistrement..."
2099:                     : "Enregistrer"}
2100:                 </ERPButton>
2101: 
2102:                 <ERPButton
2103:                   variant="secondary"
2104:                   type="button"
2105:                   disabled={saving}
2106:                   onClick={() =>
2107:                     router.push(
2108:                       returnTo ??
2109:                         module.metadata.routes?.list ??
2110:                         `/${module.metadata.key}`
2111:                     )
2112:                   }
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
  42:   runtimeActions: ERPRuntimePageActionSource[] = []
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 209

```tsx
 203:   async function handleRuntimeAction(action: NonNullable<ERPModule["actions"]>[number]) {
 204:     if (!module || !currentRecord) {
 205:       return;
 206:     }
 207: 
 208:     const actionResult =
 209:       await RuntimeActionEngine.execute({
 210:         module,
 211:         action,
 212:         record: currentRecord,
 213:       });
 214: 
 215:     const recordId =
 216:       String(
 217:         currentRecord.id ??
 218:         currentRecord._id ??
 219:         currentRecord.uid ??
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 273

```tsx
 267:   const runtimeActions =
 268: 
 269: 
 270:     (type === "detail" || type === "edit") && !isRemovedRecord
 271: 
 272: 
 273:       ? RuntimeActionEngine.getAvailableActions({
 274:           actions: module?.actions ?? [],
 275:           workflow: module?.workflows?.[0],
 276:           record: currentRecord,
 277:           })
 278:         : [];
 279: 
 280:   const moduleHrefActions =
 281:     // Q22E4B_LIST_NAVIGATION_ACTIONS
 282:     // Generic runtime: list pages may expose module actions with href.
 283:     type === "list"
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine.getAvailableActions :: line 273

```tsx
 267:   const runtimeActions =
 268: 
 269: 
 270:     (type === "detail" || type === "edit") && !isRemovedRecord
 271: 
 272: 
 273:       ? RuntimeActionEngine.getAvailableActions({
 274:           actions: module?.actions ?? [],
 275:           workflow: module?.workflows?.[0],
 276:           record: currentRecord,
 277:           })
 278:         : [];
 279: 
 280:   const moduleHrefActions =
 281:     // Q22E4B_LIST_NAVIGATION_ACTIONS
 282:     // Generic runtime: list pages may expose module actions with href.
 283:     type === "list"
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine.execute :: line 209

```tsx
 203:   async function handleRuntimeAction(action: NonNullable<ERPModule["actions"]>[number]) {
 204:     if (!module || !currentRecord) {
 205:       return;
 206:     }
 207: 
 208:     const actionResult =
 209:       await RuntimeActionEngine.execute({
 210:         module,
 211:         action,
 212:         record: currentRecord,
 213:       });
 214: 
 215:     const recordId =
 216:       String(
 217:         currentRecord.id ??
 218:         currentRecord._id ??
 219:         currentRecord.uid ??
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 42

```tsx
  36: } from "@/runtime/data-binding/RuntimeDataBinding";
  37: 
  38: import { ERPOperationalModulePage } from "@/components/erp/operational";
  39: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
  40: 
  41: function mapRuntimeActionsToActionBarActions(
  42:   runtimeActions: ERPRuntimePageActionSource[] = []
  43: ): ERPRuntimeActionBarAction[] {
  44:   return runtimeActions
  45:     .map((action) => {
  46:       const runtimeAction = action as ERPRuntimePageActionSource;
  47: 
  48:       const key = String(runtimeAction.key ?? runtimeAction.label ?? "");
  49:       const label = String(runtimeAction.label ?? key);
  50: 
  51:       if (!key || !label) {
  52:         return null;
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 44

```tsx
  38: import { ERPOperationalModulePage } from "@/components/erp/operational";
  39: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
  40: 
  41: function mapRuntimeActionsToActionBarActions(
  42:   runtimeActions: ERPRuntimePageActionSource[] = []
  43: ): ERPRuntimeActionBarAction[] {
  44:   return runtimeActions
  45:     .map((action) => {
  46:       const runtimeAction = action as ERPRuntimePageActionSource;
  47: 
  48:       const key = String(runtimeAction.key ?? runtimeAction.label ?? "");
  49:       const label = String(runtimeAction.label ?? key);
  50: 
  51:       if (!key || !label) {
  52:         return null;
  53:       }
  54: 
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 267

```tsx
 261:       : "#";
 262: 
 263:   const isRemovedRecord = Boolean(currentRecord?.removedAt);
 264: 
 265: 
 266: 
 267:   const runtimeActions =
 268: 
 269: 
 270:     (type === "detail" || type === "edit") && !isRemovedRecord
 271: 
 272: 
 273:       ? RuntimeActionEngine.getAvailableActions({
 274:           actions: module?.actions ?? [],
 275:           workflow: module?.workflows?.[0],
 276:           record: currentRecord,
 277:           })
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 417

```tsx
 411:             >
 412:               {createActionLabel}
 413:             </Link>
 414:           </div>
 415:         )}
 416: 
 417:         {type === "detail" && runtimeActions.length > 0 && (
 418:           <div className="flex flex-wrap gap-3">
 419:             {runtimeActions.map((action) => (
 420:               <button
 421:                 key={action.key}
 422:                 type="button"
 423:                 onClick={() => {
 424:                     void handleRuntimeAction(action);
 425:                   }}
 426:                 className={`
 427:                   rounded-2xl
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 419

```tsx
 413:             </Link>
 414:           </div>
 415:         )}
 416: 
 417:         {type === "detail" && runtimeActions.length > 0 && (
 418:           <div className="flex flex-wrap gap-3">
 419:             {runtimeActions.map((action) => (
 420:               <button
 421:                 key={action.key}
 422:                 type="button"
 423:                 onClick={() => {
 424:                     void handleRuntimeAction(action);
 425:                   }}
 426:                 className={`
 427:                   rounded-2xl
 428:                   px-4
 429:                   py-2
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 481

```tsx
 475:         {type === "create" && module && (
 476:           <>
 477:             <div data-runtime-action-bar-placement="runtime-page">
 478:               <ERPRuntimeActionBar
 479:                 title="Actions métier"
 480:                 description="Actions runtime disponibles pour cet enregistrement. Les formulaires resteront progressivement limités aux champs."
 481:                 actions={mapRuntimeActionsToActionBarActions(runtimeActions as ERPRuntimePageActionSource[])}
 482:                 compact
 483:               />
 484:             </div>
 485: 
 486:             <ERPEnterpriseForm
 487:               module={module}
 488:               mode="create"
 489:             />
 490:           </>
 491:         )}
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: handleRuntimeAction :: line 203

```tsx
 197:     }
 198: 
 199:     loadData();
 200:   }, [module, type]);
 201: 
 202: 
 203:   async function handleRuntimeAction(action: NonNullable<ERPModule["actions"]>[number]) {
 204:     if (!module || !currentRecord) {
 205:       return;
 206:     }
 207: 
 208:     const actionResult =
 209:       await RuntimeActionEngine.execute({
 210:         module,
 211:         action,
 212:         record: currentRecord,
 213:       });
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: handleRuntimeAction :: line 424

```tsx
 418:           <div className="flex flex-wrap gap-3">
 419:             {runtimeActions.map((action) => (
 420:               <button
 421:                 key={action.key}
 422:                 type="button"
 423:                 onClick={() => {
 424:                     void handleRuntimeAction(action);
 425:                   }}
 426:                 className={`
 427:                   rounded-2xl
 428:                   px-4
 429:                   py-2
 430:                   text-sm
 431:                   font-bold
 432:                   transition
 433:                   ${
 434:                     action.type === "danger"
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

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 43

```tsx
  37: 
  38: import { ERPOperationalModulePage } from "@/components/erp/operational";
  39: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
  40: 
  41: function mapRuntimeActionsToActionBarActions(
  42:   runtimeActions: ERPRuntimePageActionSource[] = []
  43: ): ERPRuntimeActionBarAction[] {
  44:   return runtimeActions
  45:     .map((action) => {
  46:       const runtimeAction = action as ERPRuntimePageActionSource;
  47: 
  48:       const key = String(runtimeAction.key ?? runtimeAction.label ?? "");
  49:       const label = String(runtimeAction.label ?? key);
  50: 
  51:       if (!key || !label) {
  52:         return null;
  53:       }
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 88

```tsx
  82:         description:
  83:           typeof runtimeAction.description === "string"
  84:             ? runtimeAction.description
  85:             : undefined,
  86:       };
  87:     })
  88:     .filter(Boolean) as ERPRuntimeActionBarAction[];
  89: }
  90: 
  91: function buildInvoicePaymentHref(
  92:   record: Record<string, unknown>
  93: ): string {
  94:   const factureId =
  95:     String(record.id ?? record._id ?? "");
  96: 
  97:   const montantTTC =
  98:     Number(record.montantTTC ?? 0);
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 478

```tsx
 472:         </div>
 473: 
 474: 
 475:         {type === "create" && module && (
 476:           <>
 477:             <div data-runtime-action-bar-placement="runtime-page">
 478:               <ERPRuntimeActionBar
 479:                 title="Actions métier"
 480:                 description="Actions runtime disponibles pour cet enregistrement. Les formulaires resteront progressivement limités aux champs."
 481:                 actions={mapRuntimeActionsToActionBarActions(runtimeActions as ERPRuntimePageActionSource[])}
 482:                 compact
 483:               />
 484:             </div>
 485: 
 486:             <ERPEnterpriseForm
 487:               module={module}
 488:               mode="create"
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
  42:   runtimeActions: ERPRuntimePageActionSource[] = []
  43: ): ERPRuntimeActionBarAction[] {
  44:   return runtimeActions
  45:     .map((action) => {
  46:       const runtimeAction = action as ERPRuntimePageActionSource;
  47: 
  48:       const key = String(runtimeAction.key ?? runtimeAction.label ?? "");
  49:       const label = String(runtimeAction.label ?? key);
  50: 
  51:       if (!key || !label) {
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: mapRuntimeActionsToActionBarActions :: line 481

```tsx
 475:         {type === "create" && module && (
 476:           <>
 477:             <div data-runtime-action-bar-placement="runtime-page">
 478:               <ERPRuntimeActionBar
 479:                 title="Actions métier"
 480:                 description="Actions runtime disponibles pour cet enregistrement. Les formulaires resteront progressivement limités aux champs."
 481:                 actions={mapRuntimeActionsToActionBarActions(runtimeActions as ERPRuntimePageActionSource[])}
 482:                 compact
 483:               />
 484:             </div>
 485: 
 486:             <ERPEnterpriseForm
 487:               module={module}
 488:               mode="create"
 489:             />
 490:           </>
 491:         )}
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

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions.map :: line 419

```tsx
 413:             </Link>
 414:           </div>
 415:         )}
 416: 
 417:         {type === "detail" && runtimeActions.length > 0 && (
 418:           <div className="flex flex-wrap gap-3">
 419:             {runtimeActions.map((action) => (
 420:               <button
 421:                 key={action.key}
 422:                 type="button"
 423:                 onClick={() => {
 424:                     void handleRuntimeAction(action);
 425:                   }}
 426:                 className={`
 427:                   rounded-2xl
 428:                   px-4
 429:                   py-2
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: <button :: line 420

```tsx
 414:           </div>
 415:         )}
 416: 
 417:         {type === "detail" && runtimeActions.length > 0 && (
 418:           <div className="flex flex-wrap gap-3">
 419:             {runtimeActions.map((action) => (
 420:               <button
 421:                 key={action.key}
 422:                 type="button"
 423:                 onClick={() => {
 424:                     void handleRuntimeAction(action);
 425:                   }}
 426:                 className={`
 427:                   rounded-2xl
 428:                   px-4
 429:                   py-2
 430:                   text-sm
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: handleRuntimeAction(action) :: line 424

```tsx
 418:           <div className="flex flex-wrap gap-3">
 419:             {runtimeActions.map((action) => (
 420:               <button
 421:                 key={action.key}
 422:                 type="button"
 423:                 onClick={() => {
 424:                     void handleRuntimeAction(action);
 425:                   }}
 426:                 className={`
 427:                   rounded-2xl
 428:                   px-4
 429:                   py-2
 430:                   text-sm
 431:                   font-bold
 432:                   transition
 433:                   ${
 434:                     action.type === "danger"
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

La centralisation n’est pas encore validée : il reste des responsabilités workflow/action dans le formulaire ou des props workflowActions passées au formulaire.

## Prochaine passe recommandée

- Si `runtimeActions.map` existe encore dans `ERPRuntimePage`, faire `Q2-OP-I14` pour supprimer le rendu legacy direct et ne garder que `ERPRuntimeActionBar`.
- Sinon, passer à la formalisation des workflows metadata prioritaire : `rendezvous`, `interventionsauto`, `lignesinterventionauto`, `facturesauto`, `encaissementsauto`.