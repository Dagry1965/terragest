# Q2-OP-I9 — Audit précis des boutons workflow/actions dans ERPEnterpriseForm

Objectif : identifier précisément si le formulaire enterprise porte encore des boutons workflow/actions, handlers ou moteurs runtime qui doivent être déplacés vers une barre d’actions runtime.

## Résumé

- OK : 15
- INFO : 1
- WARN : 9
- WARN HIGH : 4
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
| form-props | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm references workflowActions. Not found. |
| runtime-engine | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm imports or calls RuntimeActionEngine. Not found. |
| runtime-engine | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm imports or calls RuntimeWorkflowEngine. Not found. |
| runtime-workflow | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm may execute workflow transitions. Not found. |
| runtime-action | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm may execute runtime actions. Not found. |
| handler | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm contains a workflow handler. Not found. |
| handler | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm contains a runtime action handler. Not found. |
| ui-buttons | WARN | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1969, 2009, 2036 | ERPEnterpriseForm contains clickable handlers. Count=3. |
| ui-buttons | WARN | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1960 | ERPEnterpriseForm renders native buttons. Count=1. |
| ui-buttons | WARN | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 16, 1996, 2003, 2005, 2018, 2032, 2039 | ERPEnterpriseForm renders ERPButton. Count=7. |
| submit | INFO | LOW | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1997 | ERPEnterpriseForm renders submit button. Count=1. |
| ui-buttons | WARN | MEDIUM | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 1963, 2007, 2033 | ERPEnterpriseForm renders non-submit buttons. Count=3. |
| runtime-page-pass | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | ERPRuntimePage passes workflowActions into ERPEnterpriseForm. Not found. |
| runtime-page-pass | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | ERPRuntimePage passes workflowActions prop. Not found. |
| runtime-page-form | WARN | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 466, 473 | ERPRuntimePage renders ERPEnterpriseForm. Count=2. |
| runtime-page-actions | WARN | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 31, 32, 214, 278 | ERPRuntimePage uses RuntimeActionEngine. Count=4. |
| runtime-page-actions | WARN | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 42, 45, 272, 449, 455 | ERPRuntimePage has runtimeActions. Count=5. |
| runtime-page-payment | WARN | MEDIUM | `src/components/erp/runtime/ERPRuntimePage.tsx` | 96, 328 | ERPRuntimePage still has invoice payment action helper. Count=2. |
| suspicious-rendering | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | No suspicious form workflow/action rendering marker: workflow map rendering. |
| suspicious-rendering | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | No suspicious form workflow/action rendering marker: runtime action map rendering. |
| suspicious-rendering | WARN | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` | 266, 1473, 1476, 1506, 1510, 1516, 1519, 1523, 1525, 1528, 1591, 1683, 1687, 1734, 1737, 1972, 2017, 2027 | Suspicious form workflow/action rendering marker: workflow/action button labels. Count=18. |
| target-architecture | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | ERPEnterpriseForm has no high-level forbidden workflow/action markers. |
| target-architecture | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | ERPRuntimePage does not pass workflowActions into ERPEnterpriseForm. |

## Contextes importants

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: onClick :: line 1969

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: onClick :: line 2009

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: onClick :: line 2036

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: <button :: line 1960

```tsx
1956: 
1957:             
1958: 
1959: 
1960:                   <button
1961: 
1962: 
1963:                     type="button"
1964: 
1965: 
1966:                     disabled={saving}
1967: 
1968: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 16

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 1996

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2003

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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2005

```tsx
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

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2018

```tsx
2014:                     )
2015:                   }
2016:                 >
2017:                   Annuler
2018:                 </ERPButton>
2019:               </>
2020:             ) : null}
2021: 
2022:                         {mode === "edit" && Boolean(initialData?.id) && sensitiveBusinessModule ? (
2023:               <div
2024:                 data-sensitive-delete-hidden-notice
2025:                 className="w-full rounded-2xl border border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)] px-4 py-3 text-sm text-[var(--erp-text-muted)]"
2026:               >
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: ERPButton :: line 2032

```tsx
2028:               </div>
2029:             ) : null}
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="submit" :: line 1997

```tsx
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
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="button" :: line 1963

```tsx
1959: 
1960:                   <button
1961: 
1962: 
1963:                     type="button"
1964: 
1965: 
1966:                     disabled={saving}
1967: 
1968: 
1969:                     onClick={handleBusinessStatusAction}
1970: 
1971: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="button" :: line 2007

```tsx
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

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: type="button" :: line 2033

```tsx
2029:             ) : null}
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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: <ERPEnterpriseForm :: line 466

```tsx
 462:           </div>
 463:         ) : null}
 464: 
 465:         {type === "create" && module && (
 466:           <ERPEnterpriseForm
 467:             module={module}
 468:             mode="create"
 469:           />
 470:         )}
 471: 
 472:         {type === "edit" && module && currentRecord && (
 473:           <ERPEnterpriseForm
 474:             module={module}
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: <ERPEnterpriseForm :: line 473

```tsx
 469:           />
 470:         )}
 471: 
 472:         {type === "edit" && module && currentRecord && (
 473:           <ERPEnterpriseForm
 474:             module={module}
 475:             mode="edit"
 476:             initialData={currentRecord}
 477:             forceReadOnlyBecauseRemoved={isRemovedRecord}
 478:           />
 479:         )}
 480: 
 481:         {type === "detail" && module && currentRecord && (
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 31

```tsx
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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 32

```tsx
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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 214

```tsx
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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine :: line 278

```tsx
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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 42

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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 45

```tsx
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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 272

```tsx
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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 449

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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: runtimeActions :: line 455

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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: buildInvoicePaymentHref :: line 96

```tsx
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
 104: 
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: buildInvoicePaymentHref :: line 328

```tsx
 324:     Boolean(currentRecord?.id ?? currentRecord?._id);
 325: 
 326:   const invoicePaymentHref =
 327:     isInvoiceDetailPage && currentRecord
 328:       ? buildInvoicePaymentHref(currentRecord)
 329:       : "#";
 330: 
 331:   const relatedChildren =
 332:     module?.composition?.children?.filter((child) => {
 333:       if (!currentRecord) {
 334:           return false;
 335:         }
 336: 
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 266

```tsx
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
 275:   interventionId: string
 276: ) {
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 1473

```tsx
1468:     const currentStatus = String(formValues.statut ?? "");
1469: 
1470:     if (moduleKey === "receptionsstockauto" && currentStatus === "brouillon") {
1471:       return {
1472:         // Q21D1C_VALIDATE_RECEPTION_ACTION
1473:         label: "Valider reception",
1474:         nextStatus: "validee",
1475:         confirmMessage:
1476:           "Valider cette reception ? Une entree stock sera creee automatiquement et les champs critiques seront verrouilles.",
1477:       };
1478:     }
1479: 
1480:     if (moduleKey === "clientsauto" && currentStatus !== "archive") {
1481:       return {
1482:         label: "Archiver client",
1483:         nextStatus: "archive",
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 1476

```tsx
1471:       return {
1472:         // Q21D1C_VALIDATE_RECEPTION_ACTION
1473:         label: "Valider reception",
1474:         nextStatus: "validee",
1475:         confirmMessage:
1476:           "Valider cette reception ? Une entree stock sera creee automatiquement et les champs critiques seront verrouilles.",
1477:       };
1478:     }
1479: 
1480:     if (moduleKey === "clientsauto" && currentStatus !== "archive") {
1481:       return {
1482:         label: "Archiver client",
1483:         nextStatus: "archive",
1484:         confirmMessage:
1485:           "Archiver ce client ? Il ne sera pas supprime et son historique sera conserve.",
1486:       };
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 1506

```tsx
1501:     if (
1502:       moduleKey === "facturesauto" &&
1503:       currentInvoiceStatus !== "annulee"
1504:     ) {
1505:       return {
1506:         label: "Annuler facture",
1507:         nextStatus: "annulee",
1508:         statusField: "statutFacture",
1509:         confirmMessage:
1510:           "Annuler cette facture ? Les paiements, echeances et historiques seront conserves.",
1511:       };
1512:     }
1513: 
1514:     if (moduleKey === "encaissementsauto" && currentStatus !== "annule") {
1515:       return {
1516:         label: "Annuler encaissement",
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 1510

```tsx
1505:       return {
1506:         label: "Annuler facture",
1507:         nextStatus: "annulee",
1508:         statusField: "statutFacture",
1509:         confirmMessage:
1510:           "Annuler cette facture ? Les paiements, echeances et historiques seront conserves.",
1511:       };
1512:     }
1513: 
1514:     if (moduleKey === "encaissementsauto" && currentStatus !== "annule") {
1515:       return {
1516:         label: "Annuler encaissement",
1517:         nextStatus: "annule",
1518:         confirmMessage:
1519:           "Annuler cet encaissement ? Le paiement restera conserve dans l'historique.",
1520:       };
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 1516

```tsx
1511:       };
1512:     }
1513: 
1514:     if (moduleKey === "encaissementsauto" && currentStatus !== "annule") {
1515:       return {
1516:         label: "Annuler encaissement",
1517:         nextStatus: "annule",
1518:         confirmMessage:
1519:           "Annuler cet encaissement ? Le paiement restera conserve dans l'historique.",
1520:       };
1521:     }
1522: 
1523:     if (moduleKey === "echeancespaiementauto" && currentStatus !== "annulee") {
1524:       return {
1525:         label: "Annuler echeance",
1526:         nextStatus: "annulee",
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 1519

```tsx
1514:     if (moduleKey === "encaissementsauto" && currentStatus !== "annule") {
1515:       return {
1516:         label: "Annuler encaissement",
1517:         nextStatus: "annule",
1518:         confirmMessage:
1519:           "Annuler cet encaissement ? Le paiement restera conserve dans l'historique.",
1520:       };
1521:     }
1522: 
1523:     if (moduleKey === "echeancespaiementauto" && currentStatus !== "annulee") {
1524:       return {
1525:         label: "Annuler echeance",
1526:         nextStatus: "annulee",
1527:         confirmMessage:
1528:           "Annuler cette echeance ? Elle restera conservee dans l'historique.",
1529:       };
```

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx :: workflow/action button labels :: line 1523

```tsx
1518:         confirmMessage:
1519:           "Annuler cet encaissement ? Le paiement restera conserve dans l'historique.",
1520:       };
1521:     }
1522: 
1523:     if (moduleKey === "echeancespaiementauto" && currentStatus !== "annulee") {
1524:       return {
1525:         label: "Annuler echeance",
1526:         nextStatus: "annulee",
1527:         confirmMessage:
1528:           "Annuler cette echeance ? Elle restera conservee dans l'historique.",
1529:       };
1530:     }
1531: 
1532:     return null;
1533:   }
```

## Conclusion

Le formulaire porte encore des traces de workflow/action ou reçoit encore des props d’action. La prochaine passe doit créer une barre d’actions runtime et déplacer ces responsabilités hors formulaire.

## Prochaine passe recommandée

Q2-OP-I10 — Créer `ERPRuntimeActionBar` générique sans modifier encore les workflows.

Puis Q2-OP-I11 — Déplacer l’affichage des actions hors `ERPEnterpriseForm`.