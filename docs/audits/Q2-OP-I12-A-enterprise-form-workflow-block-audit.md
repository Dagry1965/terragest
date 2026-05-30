# Q2-OP-I12-A — Audit du bloc workflow dans ERPEnterpriseForm

Objectif : identifier précisément ce qui doit être déplacé du formulaire vers la barre d’actions runtime.

## Résumé

- OK : 11
- WARN : 8
- WARN HIGH : 5
- FAIL : 0
- FAIL HIGH : 0

## Doctrine

- `ERPEnterpriseForm` doit conserver le submit et les champs.
- `ERPEnterpriseForm` ne doit plus rendre les boutons workflow.
- `ERPRuntimePage` doit donner les actions à `ERPRuntimeActionBar`.
- `ERPRuntimeActionBar` doit savoir afficher href et onClick.

## Checks

| Area | Status | Severity | File | Lines | Message |
|---|---:|---:|---|---|---|
| file | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm found |
| file | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | ERPRuntimePage found |
| file | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` |  | ERPRuntimeActionBar found |
| form-marker | WARN | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 223, 405, 1821, 1833 | workflowActions found 4 time(s) |
| form-marker | WARN | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1833 | workflowActions.map found 1 time(s) |
| form-marker | WARN | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 16, 16, 1407 | RuntimeActionEngine found 3 time(s) |
| form-marker | OK | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | handleWorkflow not found |
| form-marker | OK | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | handleRuntimeAction not found |
| form-marker | OK | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | executeAction not found |
| form-marker | WARN | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1837, 2066, 2106, 2133 | onClick found 4 time(s) |
| form-marker | WARN | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1836, 2060, 2104, 2130 | type="button" found 4 time(s) |
| runtime-page-marker | OK | MEDIUM | `src/components/erp/runtime/ERPRuntimePage.tsx` | 14, 15, 16, 43, 88, 478 | ERPRuntimeActionBar found 6 time(s) |
| runtime-page-marker | OK | MEDIUM | `src/components/erp/runtime/ERPRuntimePage.tsx` | 41, 481 | mapRuntimeActionsToActionBarActions found 2 time(s) |
| runtime-page-marker | WARN | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 498 | workflowActions={ found 1 time(s) |
| runtime-page-marker | WARN | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 498 | workflowActions= found 1 time(s) |
| runtime-page-marker | OK | MEDIUM | `src/components/erp/runtime/ERPRuntimePage.tsx` | 42, 44, 267, 417, 419, 481, 498 | runtimeActions found 7 time(s) |
| action-bar-capability | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` |  | ERPRuntimeActionBar can render onClick actions |
| action-bar-capability | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` |  | ERPRuntimeActionBar can render href actions |
| decision | WARN | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx / src/components/erp/runtime/ERPRuntimePage.tsx` |  | Extraction still required: form renders workflowActions and runtime page still passes workflowActions |

## Contextes

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions :: line 223

```tsx
 211:     if (timeOnly) {
 212:       nextValues[timeField] = timeOnly;
 213:     }
 214:   }
 215: 
 216:   return nextValues;
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
 234:     id: string;
 235:     label: string;
 236:     record?: Record<string, unknown>;
 237:   };
 238: }
 239: 
 240: interface RuntimeRelationAutoFillConfig {
 241:   map?: Record<string, string[] | string>;
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions :: line 405

```tsx
 393: 
 394:   return {
 395:     montantTTC,
 396:     montantPaye,
 397:     resteAPayer: computedReste,
 398:   };
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
 416: 
 417:   const queryInitialValuesAppliedRef =
 418:     useRef(false);
 419: 
 420:   const queryValues =
 421:     Object.fromEntries(
 422:       Array.from(searchParams.entries()).filter(
 423:         ([key]) =>
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions :: line 1821

```tsx
1809:         <div data-invoice-payment-schedule>
1810:           <InvoicePaymentSchedule
1811:             factureId={String(initialData.id ?? initialData._id ?? "")}
1812:             clientId={initialData.clientId ? String(initialData.clientId) : undefined}
1813:             vehiculeId={initialData.vehiculeId ? String(initialData.vehiculeId) : undefined}
1814:             montantTTC={Number(initialData.montantTTC ?? 0)}
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
1832:           <div className="flex flex-wrap gap-3">
1833:             {workflowActions.map((action) => (
1834:               <button
1835:                 key={action.key}
1836:                 type="button"
1837:                 onClick={() => {
1838:                   pendingWorkflowActionRef.current = action;
1839:                   formRef.current?.requestSubmit();
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions :: line 1833

```tsx
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
1845:                   text-sm
1846:                   font-bold
1847:                   transition
1848:                   ${
1849:                     action.type === "danger"
1850:                       ? "bg-red-600 text-[var(--erp-text)] hover:bg-red-700"
1851:                       : action.type === "secondary"
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflowActions.map :: line 1833

```tsx
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
1845:                   text-sm
1846:                   font-bold
1847:                   transition
1848:                   ${
1849:                     action.type === "danger"
1850:                       ? "bg-red-600 text-[var(--erp-text)] hover:bg-red-700"
1851:                       : action.type === "secondary"
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: RuntimeActionEngine :: line 16

```tsx
   4: import {
   5:   useRouter,
   6:   useSearchParams,
   7: } from "next/navigation";
   8: 
   9: import type { ERPModule } from "@/runtime/modules";
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
  27: import { ERPFormTabs } from "./ERPFormTabs";
  28: 
  29: import {
  30:   RuntimePermissionEngine,
  31: } from "@/runtime/permissions/RuntimePermissionEngine";
  32: 
  33: import {
  34:   RuntimeValidationEngine,
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: RuntimeActionEngine :: line 16

```tsx
   4: import {
   5:   useRouter,
   6:   useSearchParams,
   7: } from "next/navigation";
   8: 
   9: import type { ERPModule } from "@/runtime/modules";
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
  27: import { ERPFormTabs } from "./ERPFormTabs";
  28: 
  29: import {
  30:   RuntimePermissionEngine,
  31: } from "@/runtime/permissions/RuntimePermissionEngine";
  32: 
  33: import {
  34:   RuntimeValidationEngine,
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: RuntimeActionEngine :: line 1407

```tsx
1395:             formValues.interventionId ??
1396:             ""
1397:           );
1398: 
1399:         if (interventionId) {
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

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: onClick :: line 1837

```tsx
1825:               Workflow
1826:             </p>
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
1844:                   py-2
1845:                   text-sm
1846:                   font-bold
1847:                   transition
1848:                   ${
1849:                     action.type === "danger"
1850:                       ? "bg-red-600 text-[var(--erp-text)] hover:bg-red-700"
1851:                       : action.type === "secondary"
1852:                         ? "bg-slate-200 text-[var(--erp-text)] hover:bg-slate-300"
1853:                         : "bg-[var(--erp-surface)] text-[var(--erp-text)] hover:bg-[#1F2937] hover:border-[#00A68A]"
1854:                   }
1855:                 `}
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: onClick :: line 2066

```tsx
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
2077: 
2078:                   </button>
2079: 
2080: 
2081:                 </div>
2082: 
2083: 
2084:               </div>
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: onClick :: line 2106

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
2124:                 Suppression masquee pour preserver l'historique. Utilisez l'action metier adaptee, comme "Retirer la ligne", afin que le stock, les totaux et la tracabilite soient corriges proprement.
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: onClick :: line 2133

```tsx
2121:                 data-sensitive-delete-hidden-notice
2122:                 className="w-full rounded-2xl border border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)] px-4 py-3 text-sm text-[var(--erp-text-muted)]"
2123:               >
2124:                 Suppression masquee pour preserver l'historique. Utilisez l'action metier adaptee, comme "Retirer la ligne", afin que le stock, les totaux et la tracabilite soient corriges proprement.
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
2138:           </div>
2139:         </div>
2140: 
2141:         <ERPFormSummaryPanel module={module} />
2142:       </section>
2143:     </form>
2144:   );
2145: }
2146: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="button" :: line 1836

```tsx
1824:             <p className="text-xs font-black uppercase tracking-wide text-[#334155]">
1825:               Workflow
1826:             </p>
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
1844:                   py-2
1845:                   text-sm
1846:                   font-bold
1847:                   transition
1848:                   ${
1849:                     action.type === "danger"
1850:                       ? "bg-red-600 text-[var(--erp-text)] hover:bg-red-700"
1851:                       : action.type === "secondary"
1852:                         ? "bg-slate-200 text-[var(--erp-text)] hover:bg-slate-300"
1853:                         : "bg-[var(--erp-surface)] text-[var(--erp-text)] hover:bg-[#1F2937] hover:border-[#00A68A]"
1854:                   }
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="button" :: line 2060

```tsx
2048:                     </p>
2049: 
2050: 
2051:                   </div>
2052: 
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
2077: 
2078:                   </button>
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="button" :: line 2104

```tsx
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
2118: 
2119:                         {mode === "edit" && Boolean(initialData?.id) && sensitiveBusinessModule ? (
2120:               <div
2121:                 data-sensitive-delete-hidden-notice
2122:                 className="w-full rounded-2xl border border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)] px-4 py-3 text-sm text-[var(--erp-text-muted)]"
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="button" :: line 2130

```tsx
2118: 
2119:                         {mode === "edit" && Boolean(initialData?.id) && sensitiveBusinessModule ? (
2120:               <div
2121:                 data-sensitive-delete-hidden-notice
2122:                 className="w-full rounded-2xl border border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)] px-4 py-3 text-sm text-[var(--erp-text-muted)]"
2123:               >
2124:                 Suppression masquee pour preserver l'historique. Utilisez l'action metier adaptee, comme "Retirer la ligne", afin que le stock, les totaux et la tracabilite soient corriges proprement.
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
2138:           </div>
2139:         </div>
2140: 
2141:         <ERPFormSummaryPanel module={module} />
2142:       </section>
2143:     </form>
2144:   );
2145: }
2146: 
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 14

```tsx
   2: 
   3: import { useEffect, useState } from "react";
   4: import Link from "next/link";
   5: 
   6: import {
   7:   ERPPage,
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
  25: import { ERPRelatedRecordsPanel } from "./ERPRelatedRecordsPanel";
  26: import { ERPContextBanner } from "@/components/erp/context/ERPContextBanner";
  27: 
  28: import type { ERPModule, ERPModuleAction } from "@/runtime/modules/ERPModule";
  29: 
  30: import {
  31:   RuntimeActionEngine,
  32: } from "@/runtime/actions/RuntimeActionEngine";
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 15

```tsx
   3: import { useEffect, useState } from "react";
   4: import Link from "next/link";
   5: 
   6: import {
   7:   ERPPage,
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
  25: import { ERPRelatedRecordsPanel } from "./ERPRelatedRecordsPanel";
  26: import { ERPContextBanner } from "@/components/erp/context/ERPContextBanner";
  27: 
  28: import type { ERPModule, ERPModuleAction } from "@/runtime/modules/ERPModule";
  29: 
  30: import {
  31:   RuntimeActionEngine,
  32: } from "@/runtime/actions/RuntimeActionEngine";
  33: 
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 16

```tsx
   4: import Link from "next/link";
   5: 
   6: import {
   7:   ERPPage,
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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 43

```tsx
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
  55:       const href =
  56:         typeof runtimeAction.href === "string"
  57:           ? runtimeAction.href
  58:           : undefined;
  59: 
  60:       const disabled =
  61:         typeof runtimeAction.disabled === "boolean"
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 88

```tsx
  76:       return {
  77:         key,
  78:         label,
  79:         href,
  80:         disabled,
  81:         tone,
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
  99: 
 100:   const montantPaye =
 101:     Number(record.montantPaye ?? 0);
 102: 
 103:   const resteAPayer =
 104:     Number(record.resteAPayer ?? 0);
 105: 
 106:   const montant =
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 478

```tsx
 466:               parentModule={module}
 467:               parentRecord={currentRecord}
 468:               child={child}
 469:               mode={type as "detail" | "edit"}
 470:             />
 471:           ))}
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
 489:             />
 490:           </>
 491:         )}
 492: 
 493:         {type === "edit" && module && currentRecord && (
 494:           <ERPEnterpriseForm
 495:             module={module}
 496:             mode="edit"
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: mapRuntimeActionsToActionBarActions :: line 41

```tsx
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
  55:       const href =
  56:         typeof runtimeAction.href === "string"
  57:           ? runtimeAction.href
  58:           : undefined;
  59: 
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: mapRuntimeActionsToActionBarActions :: line 481

```tsx
 469:               mode={type as "detail" | "edit"}
 470:             />
 471:           ))}
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
 489:             />
 490:           </>
 491:         )}
 492: 
 493:         {type === "edit" && module && currentRecord && (
 494:           <ERPEnterpriseForm
 495:             module={module}
 496:             mode="edit"
 497:             initialData={currentRecord}
 498:             workflowActions={isRemovedRecord ? [] : runtimeActions}
 499:             forceReadOnlyBecauseRemoved={isRemovedRecord}
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: workflowActions={ :: line 498

```tsx
 486:             <ERPEnterpriseForm
 487:               module={module}
 488:               mode="create"
 489:             />
 490:           </>
 491:         )}
 492: 
 493:         {type === "edit" && module && currentRecord && (
 494:           <ERPEnterpriseForm
 495:             module={module}
 496:             mode="edit"
 497:             initialData={currentRecord}
 498:             workflowActions={isRemovedRecord ? [] : runtimeActions}
 499:             forceReadOnlyBecauseRemoved={isRemovedRecord}
 500:           />
 501:         )}
 502: 
 503:         {type === "detail" && module && currentRecord && (
 504:           <ERPRuntimeDetails
 505:             module={module}
 506:             data={currentRecord}
 507:           />
 508:         )}
 509: 
 510:         <div data-erp-related-children-after className="space-y-4">
 511:           {module && currentRecord && relatedChildrenAfter.map((child) => (
 512:             <ERPRelatedRecordsPanel
 513:               key={child.key}
 514:               parentModule={module}
 515:               parentRecord={currentRecord}
 516:               child={child}
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: workflowActions= :: line 498

```tsx
 486:             <ERPEnterpriseForm
 487:               module={module}
 488:               mode="create"
 489:             />
 490:           </>
 491:         )}
 492: 
 493:         {type === "edit" && module && currentRecord && (
 494:           <ERPEnterpriseForm
 495:             module={module}
 496:             mode="edit"
 497:             initialData={currentRecord}
 498:             workflowActions={isRemovedRecord ? [] : runtimeActions}
 499:             forceReadOnlyBecauseRemoved={isRemovedRecord}
 500:           />
 501:         )}
 502: 
 503:         {type === "detail" && module && currentRecord && (
 504:           <ERPRuntimeDetails
 505:             module={module}
 506:             data={currentRecord}
 507:           />
 508:         )}
 509: 
 510:         <div data-erp-related-children-after className="space-y-4">
 511:           {module && currentRecord && relatedChildrenAfter.map((child) => (
 512:             <ERPRelatedRecordsPanel
 513:               key={child.key}
 514:               parentModule={module}
 515:               parentRecord={currentRecord}
 516:               child={child}
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 42

```tsx
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
  55:       const href =
  56:         typeof runtimeAction.href === "string"
  57:           ? runtimeAction.href
  58:           : undefined;
  59: 
  60:       const disabled =
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 44

```tsx
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
  55:       const href =
  56:         typeof runtimeAction.href === "string"
  57:           ? runtimeAction.href
  58:           : undefined;
  59: 
  60:       const disabled =
  61:         typeof runtimeAction.disabled === "boolean"
  62:           ? runtimeAction.disabled
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 267

```tsx
 255:       ? "Nouveau rendez-vous"
 256:       : `Nouveau ${moduleLabel}`;
 257: 
 258:   const createActionHref =
 259:     module
 260:       ? `/${module.metadata.key}/nouveau`
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
 278:         : [];
 279: 
 280:   const moduleHrefActions =
 281:     // Q22E4B_LIST_NAVIGATION_ACTIONS
 282:     // Generic runtime: list pages may expose module actions with href.
 283:     type === "list"
 284:       ? (module?.actions ?? []).filter((action) =>
 285:           Boolean(action.href)
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 417

```tsx
 405:                 font-bold
 406:                 text-[var(--erp-table-head-text)]
 407:                 shadow-[0_14px_40px_rgba(15,23,42,0.07)]
 408:                 transition
 409:                 hover:bg-[#007F6D]
 410:               "
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
 428:                   px-4
 429:                   py-2
 430:                   text-sm
 431:                   font-bold
 432:                   transition
 433:                   ${
 434:                     action.type === "danger"
 435:                       ? "bg-red-600 text-[var(--erp-table-head-text)] hover:bg-red-700"
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 419

```tsx
 407:                 shadow-[0_14px_40px_rgba(15,23,42,0.07)]
 408:                 transition
 409:                 hover:bg-[#007F6D]
 410:               "
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
 428:                   px-4
 429:                   py-2
 430:                   text-sm
 431:                   font-bold
 432:                   transition
 433:                   ${
 434:                     action.type === "danger"
 435:                       ? "bg-red-600 text-[var(--erp-table-head-text)] hover:bg-red-700"
 436:                       : action.type === "secondary"
 437:                         ? "bg-slate-200 text-[var(--erp-text)] hover:bg-slate-300"
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 481

```tsx
 469:               mode={type as "detail" | "edit"}
 470:             />
 471:           ))}
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
 489:             />
 490:           </>
 491:         )}
 492: 
 493:         {type === "edit" && module && currentRecord && (
 494:           <ERPEnterpriseForm
 495:             module={module}
 496:             mode="edit"
 497:             initialData={currentRecord}
 498:             workflowActions={isRemovedRecord ? [] : runtimeActions}
 499:             forceReadOnlyBecauseRemoved={isRemovedRecord}
```

## Décision pour I12-B

La prochaine passe doit :

1. Construire dans `ERPRuntimePage` des actions avec `onClick` si l’action n’a pas de `href`.
2. Afficher ces actions dans `ERPRuntimeActionBar`.
3. Ne plus passer `workflowActions` au formulaire.
4. Garder le bouton submit du formulaire.
5. Ne pas supprimer les handlers métier tant que l’action bar ne les remplace pas.