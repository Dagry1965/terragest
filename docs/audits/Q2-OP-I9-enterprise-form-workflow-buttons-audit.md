# Q2-OP-I9 — Audit précis des boutons workflow/actions dans ERPEnterpriseForm

Objectif : identifier précisément si le formulaire enterprise porte encore des boutons workflow/actions, handlers ou moteurs runtime qui doivent être déplacés vers une barre d’actions runtime.

## Résumé

- OK : 8
- INFO : 1
- WARN : 16
- WARN HIGH : 11
- FAIL : 0
- FAIL HIGH : 0

## Doctrine cible

- `ERPEnterpriseForm` doit afficher/saisir les champs.
- `ERPEnterpriseForm` ne doit pas rendre les boutons workflow.
- `ERPEnterpriseForm` ne doit pas déclencher RuntimeActionEngine / RuntimeWorkflowEngine.
- Les actions doivent être rendues dans une future `ERPRuntimeActionBar` contrôlée par `ERPRuntimePage`.

## Checks

| Area | Status | Severity | File | Lines | Message |
|---|---:|---:|---|---|---|
| file | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm file found. |
| file | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | ERPRuntimePage file found. |
| form-props | WARN | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 223, 405, 1821, 1833 | ERPEnterpriseForm references workflowActions. Count=4. |
| runtime-engine | WARN | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 16, 1407 | ERPEnterpriseForm imports or calls RuntimeActionEngine. Count=3. |
| runtime-engine | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm imports or calls RuntimeWorkflowEngine. Not found. |
| runtime-workflow | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm may execute workflow transitions. Not found. |
| runtime-action | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm may execute runtime actions. Not found. |
| handler | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm contains a workflow handler. Not found. |
| handler | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm contains a runtime action handler. Not found. |
| ui-buttons | WARN | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1837, 2066, 2106, 2133 | ERPEnterpriseForm contains clickable handlers. Count=4. |
| ui-buttons | WARN | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1834, 2057 | ERPEnterpriseForm renders native buttons. Count=2. |
| ui-buttons | WARN | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 22, 2093, 2100, 2102, 2115, 2129, 2136 | ERPEnterpriseForm renders ERPButton. Count=7. |
| submit | INFO | LOW | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 2094 | ERPEnterpriseForm renders submit button. Count=1. |
| ui-buttons | WARN | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1836, 2060, 2104, 2130 | ERPEnterpriseForm renders non-submit buttons. Count=4. |
| runtime-page-pass | WARN | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 485 | ERPRuntimePage passes workflowActions into ERPEnterpriseForm. Count=1. |
| runtime-page-pass | WARN | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 485 | ERPRuntimePage passes workflowActions prop. Count=1. |
| runtime-page-form | WARN | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 474, 481 | ERPRuntimePage renders ERPEnterpriseForm. Count=2. |
| runtime-page-actions | WARN | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 20, 21, 196, 260 | ERPRuntimePage uses RuntimeActionEngine. Count=4. |
| runtime-page-actions | WARN | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 31, 33, 254, 318, 406, 408, 485 | ERPRuntimePage has runtimeActions. Count=7. |
| runtime-page-payment | WARN | MEDIUM | `src/components/erp/runtime/ERPRuntimePage.tsx` | 78, 310 | ERPRuntimePage still has invoice payment action helper. Count=2. |
| suspicious-rendering | WARN | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1833 | Suspicious form workflow/action rendering marker: workflow map rendering. Count=1. |
| suspicious-rendering | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | No suspicious form workflow/action rendering marker: runtime action map rendering. |
| suspicious-rendering | WARN | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 223, 273, 405, 1181, 1405, 1409, 1415, 1416, 1418, 1420, 1425, 1427, 1428, 1429, 1431, 1439, 1441, 1443, 1529, 1532, 1562, 1566, 1572, 1575, 1579, 1581, 1584, 1647, 1739, 1743, 1790, 1793, 1821, 1828, 1833, 1847, 2069, 2114, 2124 | Suspicious form workflow/action rendering marker: workflow/action button labels. Count=39. |
| target-architecture | WARN | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm violates target architecture. Forbidden markers: RuntimeActionEngine, workflowActions.map |
| target-architecture | WARN | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | ERPRuntimePage still passes workflowActions into ERPEnterpriseForm. Target is ERPRuntimeActionBar outside form. |

## Contextes importants

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions :: line 223

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions :: line 405

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions :: line 1821

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions :: line 1833

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: RuntimeActionEngine :: line 16

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: RuntimeActionEngine :: line 1407

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: onClick :: line 1837

```tsx
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
1844:                   py-2
1845:                   text-sm
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: onClick :: line 2066

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: onClick :: line 2106

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: onClick :: line 2133

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: <button :: line 1834

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: <button :: line 2057

```tsx
2053: 
2054:             
2055: 
2056: 
2057:                   <button
2058: 
2059: 
2060:                     type="button"
2061: 
2062: 
2063:                     disabled={saving}
2064: 
2065: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 22

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2093

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2100

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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2102

```tsx
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

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2115

```tsx
2111:                     )
2112:                   }
2113:                 >
2114:                   Annuler
2115:                 </ERPButton>
2116:               </>
2117:             ) : null}
2118: 
2119:                         {mode === "edit" && Boolean(initialData?.id) && sensitiveBusinessModule ? (
2120:               <div
2121:                 data-sensitive-delete-hidden-notice
2122:                 className="w-full rounded-2xl border border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)] px-4 py-3 text-sm text-[var(--erp-text-muted)]"
2123:               >
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2129

```tsx
2125:               </div>
2126:             ) : null}
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="submit" :: line 2094

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="button" :: line 1836

```tsx
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
1844:                   py-2
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="button" :: line 2060

```tsx
2056: 
2057:                   <button
2058: 
2059: 
2060:                     type="button"
2061: 
2062: 
2063:                     disabled={saving}
2064: 
2065: 
2066:                     onClick={handleBusinessStatusAction}
2067: 
2068: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="button" :: line 2104

```tsx
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

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="button" :: line 2130

```tsx
2126:             ) : null}
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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: workflowActions={ :: line 485

```tsx
 481:           <ERPEnterpriseForm
 482:             module={module}
 483:             mode="edit"
 484:             initialData={currentRecord}
 485:             workflowActions={isRemovedRecord ? [] : runtimeActions}
 486:             forceReadOnlyBecauseRemoved={isRemovedRecord}
 487:           />
 488:         )}
 489: 
 490:         {type === "detail" && module && currentRecord && (
 491:           <ERPRuntimeDetails
 492:             module={module}
 493:             data={currentRecord}
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: workflowActions= :: line 485

```tsx
 481:           <ERPEnterpriseForm
 482:             module={module}
 483:             mode="edit"
 484:             initialData={currentRecord}
 485:             workflowActions={isRemovedRecord ? [] : runtimeActions}
 486:             forceReadOnlyBecauseRemoved={isRemovedRecord}
 487:           />
 488:         )}
 489: 
 490:         {type === "detail" && module && currentRecord && (
 491:           <ERPRuntimeDetails
 492:             module={module}
 493:             data={currentRecord}
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: <ERPEnterpriseForm :: line 474

```tsx
 470:                 compact
 471:               />
 472:             </div>
 473: 
 474:             <ERPEnterpriseForm
 475:             module={module}
 476:             mode="create"
 477:           />
 478:         )}
 479: 
 480:         {type === "edit" && module && currentRecord && (
 481:           <ERPEnterpriseForm
 482:             module={module}
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: <ERPEnterpriseForm :: line 481

```tsx
 477:           />
 478:         )}
 479: 
 480:         {type === "edit" && module && currentRecord && (
 481:           <ERPEnterpriseForm
 482:             module={module}
 483:             mode="edit"
 484:             initialData={currentRecord}
 485:             workflowActions={isRemovedRecord ? [] : runtimeActions}
 486:             forceReadOnlyBecauseRemoved={isRemovedRecord}
 487:           />
 488:         )}
 489: 
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 20

```tsx
  16: 
  17: import type { ERPModule } from "@/runtime/modules/ERPModule";
  18: 
  19: import {
  20:   RuntimeActionEngine,
  21: } from "@/runtime/actions/RuntimeActionEngine";
  22: 
  23: import {
  24:   RuntimeDataBinding,
  25: } from "@/runtime/data-binding/RuntimeDataBinding";
  26: 
  27: import { ERPOperationalModulePage } from "@/components/erp/operational";
  28: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 21

```tsx
  17: import type { ERPModule } from "@/runtime/modules/ERPModule";
  18: 
  19: import {
  20:   RuntimeActionEngine,
  21: } from "@/runtime/actions/RuntimeActionEngine";
  22: 
  23: import {
  24:   RuntimeDataBinding,
  25: } from "@/runtime/data-binding/RuntimeDataBinding";
  26: 
  27: import { ERPOperationalModulePage } from "@/components/erp/operational";
  28: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
  29: 
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 196

```tsx
 192:       return;
 193:     }
 194: 
 195:     const actionResult =
 196:       await RuntimeActionEngine.execute({
 197:         module,
 198:         action,
 199:         record: currentRecord,
 200:       });
 201: 
 202:     const recordId =
 203:       String(
 204:         currentRecord.id ??
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 260

```tsx
 256: 
 257:     (type === "detail" || type === "edit") && !isRemovedRecord
 258: 
 259: 
 260:       ? RuntimeActionEngine.getAvailableActions({
 261:           actions: module?.actions ?? [],
 262:           workflow: module?.workflows?.[0],
 263:           record: currentRecord,
 264:           })
 265:         : [];
 266: 
 267:   const moduleHrefActions =
 268:     // Q22E4B_LIST_NAVIGATION_ACTIONS
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 31

```tsx
  27: import { ERPOperationalModulePage } from "@/components/erp/operational";
  28: import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
  29: 
  30: function mapRuntimeActionsToActionBarActions(
  31:   runtimeActions: Array<Record<string, unknown>> = []
  32: ): ERPRuntimeActionBarAction[] {
  33:   return runtimeActions
  34:     .map((action) => {
  35:       const key = String(action.key ?? action.id ?? action.label ?? "");
  36:       const label = String(action.label ?? action.title ?? key);
  37: 
  38:       if (!key || !label) {
  39:         return null;
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 33

```tsx
  29: 
  30: function mapRuntimeActionsToActionBarActions(
  31:   runtimeActions: Array<Record<string, unknown>> = []
  32: ): ERPRuntimeActionBarAction[] {
  33:   return runtimeActions
  34:     .map((action) => {
  35:       const key = String(action.key ?? action.id ?? action.label ?? "");
  36:       const label = String(action.label ?? action.title ?? key);
  37: 
  38:       if (!key || !label) {
  39:         return null;
  40:       }
  41: 
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 254

```tsx
 250:   const isRemovedRecord = Boolean(currentRecord?.removedAt);
 251: 
 252: 
 253: 
 254:   const runtimeActions =
 255: 
 256: 
 257:     (type === "detail" || type === "edit") && !isRemovedRecord
 258: 
 259: 
 260:       ? RuntimeActionEngine.getAvailableActions({
 261:           actions: module?.actions ?? [],
 262:           workflow: module?.workflows?.[0],
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 318

```tsx
 314:     module?.composition?.children?.filter((child) => {
 315:       if (!currentRecord) {
 316:           return false;
 317: 
 318:   const runtimeActionBarActions = mapRuntimeActionsToActionBarActions(runtimeActions);
 319:         }
 320: 
 321:       if (type !== "detail" && type !== "edit") {
 322:         return false;
 323:       }
 324: 
 325:       return (child.displayIn ?? ["detail"]).includes(
 326:         type as "detail" | "edit"
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 406

```tsx
 402:             </Link>
 403:           </div>
 404:         )}
 405: 
 406:         {type === "detail" && runtimeActions.length > 0 && (
 407:           <div className="flex flex-wrap gap-3">
 408:             {runtimeActions.map((action) => (
 409:               <button
 410:                 key={action.key}
 411:                 type="button"
 412:                 onClick={() => {
 413:                     void handleRuntimeAction(action);
 414:                   }}
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 408

```tsx
 404:         )}
 405: 
 406:         {type === "detail" && runtimeActions.length > 0 && (
 407:           <div className="flex flex-wrap gap-3">
 408:             {runtimeActions.map((action) => (
 409:               <button
 410:                 key={action.key}
 411:                 type="button"
 412:                 onClick={() => {
 413:                     void handleRuntimeAction(action);
 414:                   }}
 415:                 className={`
 416:                   rounded-2xl
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: buildInvoicePaymentHref :: line 78

```tsx
  74:     })
  75:     .filter(Boolean) as ERPRuntimeActionBarAction[];
  76: }
  77: 
  78: function buildInvoicePaymentHref(
  79:   record: Record<string, unknown>
  80: ): string {
  81:   const factureId =
  82:     String(record.id ?? record._id ?? "");
  83: 
  84:   const montantTTC =
  85:     Number(record.montantTTC ?? 0);
  86: 
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: buildInvoicePaymentHref :: line 310

```tsx
 306:     Boolean(currentRecord?.id ?? currentRecord?._id);
 307: 
 308:   const invoicePaymentHref =
 309:     isInvoiceDetailPage && currentRecord
 310:       ? buildInvoicePaymentHref(currentRecord)
 311:       : "#";
 312: 
 313:   const relatedChildren =
 314:     module?.composition?.children?.filter((child) => {
 315:       if (!currentRecord) {
 316:           return false;
 317: 
 318:   const runtimeActionBarActions = mapRuntimeActionsToActionBarActions(runtimeActions);
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow map rendering :: line 1833

```tsx
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

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 223

```tsx
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

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 273

```tsx
 268:   return buildRuntimeFactureEncaissementCreateHref({
 269:     factureId,
 270:     clientId: invoice.clientId ? String(invoice.clientId) : undefined,
 271:     vehiculeId: invoice.vehiculeId ? String(invoice.vehiculeId) : undefined,
 272:     montant: montant > 0 ? montant : undefined,
 273:     datePaiement: new Date()
 274:       .toISOString()
 275:       .split("T")[0],
 276:     statut: "valide",
 277:     returnTo: "/facturesauto/" + factureId + "/edit",
 278:   });
 279: }
 280: 
 281: async function syncInterventionTotalsFromLines(
 282:   interventionId: string
 283: ) {
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 405

```tsx
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

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 1181

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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 1405

```tsx
1400:           await syncInterventionTotalsFromLines(interventionId);
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 1409

```tsx
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
1418:             action: workflowAction,
1419:             record: savedRecord,
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 1415

```tsx
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
1424:             {
1425:               field: "workflow",
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 1416

```tsx
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
1424:             {
1425:               field: "workflow",
1426:               message:
```

## Conclusion

Le formulaire porte encore des traces de workflow/action ou reçoit encore des props d’action. La prochaine passe doit créer une barre d’actions runtime et déplacer ces responsabilités hors formulaire.

## Prochaine passe recommandée

Q2-OP-I10 — Créer `ERPRuntimeActionBar` générique sans modifier encore les workflows.

Puis Q2-OP-I11 — Déplacer l’affichage des actions hors `ERPEnterpriseForm`.