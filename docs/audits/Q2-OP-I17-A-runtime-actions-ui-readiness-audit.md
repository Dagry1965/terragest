# Q2-OP-I17-A — Audit UI readiness des actions runtime sur fiches réelles

Objectif : vérifier que les actions métier prioritaires peuvent être rendues et exécutées depuis `ERPRuntimeActionBar`, sans rendu legacy ni workflow dans le formulaire.

## Résumé

- OK : 59
- WARN : 0
- WARN HIGH : 0
- FAIL : 0
- FAIL HIGH : 0

## Modules prioritaires

- `rendezvous`
- `interventionsauto`
- `facturesauto`
- `commandesstockauto`
- `receptionsstockauto`

## Routes à tester manuellement

- http://localhost:3000/rendezvous
- http://localhost:3000/rendezvous/[id]
- http://localhost:3000/rendezvous/[id]/edit
- http://localhost:3000/interventionsauto
- http://localhost:3000/interventionsauto/[id]
- http://localhost:3000/interventionsauto/[id]/edit
- http://localhost:3000/facturesauto
- http://localhost:3000/facturesauto/[id]
- http://localhost:3000/facturesauto/[id]/edit
- http://localhost:3000/commandesstockauto
- http://localhost:3000/commandesstockauto/[id]
- http://localhost:3000/commandesstockauto/[id]/edit
- http://localhost:3000/receptionsstockauto
- http://localhost:3000/receptionsstockauto/[id]
- http://localhost:3000/receptionsstockauto/[id]/edit

## Checks

| Area | Status | Severity | File | Lines | Message |
|---|---:|---:|---|---|---|
| file | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | src/components/erp/runtime/ERPRuntimePage.tsx found |
| file | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` |  | src/components/erp/runtime/ERPRuntimeActionBar.tsx found |
| file | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx found |
| file | OK | HIGH | `src/runtime/actions/RuntimeActionEngine.ts` |  | src/runtime/actions/RuntimeActionEngine.ts found |
| runtime-page-actionbar | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 14, 15, 16, 44, 93, 451 | ERPRuntimeActionBar present |
| runtime-page-actionbar | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 450 | data-runtime-action-bar-placement="runtime-page" present |
| runtime-page-execution | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 214 | RuntimeActionEngine.execute present |
| runtime-page-execution | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 208, 457 | handleRuntimeAction present |
| runtime-page-execution | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 457 | void handleRuntimeAction present |
| runtime-page-refresh | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 230 | RuntimeDataBinding.detail present |
| runtime-page-refresh | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` | 236 | setCurrentRecord(freshRecord) present |
| runtime-page-forbidden | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | runtimeActions.map absent |
| runtime-page-forbidden | OK | HIGH | `src/components/erp/runtime/ERPRuntimePage.tsx` |  | handleRuntimeAction(action) absent |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | workflowActions absent |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | RuntimeActionEngine absent |
| form-forbidden | OK | HIGH | `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx` |  | workflowActions.map absent |
| actionbar-capability | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 81, 83 | action.href present |
| actionbar-capability | OK | HIGH | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 95 | action.onClick present |
| actionbar-capability | OK | MEDIUM | `src/components/erp/runtime/ERPRuntimeActionBar.tsx` | 19, 37, 57, 78, 81, 93, 93 | disabled present |
| runtime-action-engine | OK | HIGH | `src/runtime/actions/RuntimeActionEngine.ts` | 43 | getAvailableActions present |
| runtime-action-engine | OK | HIGH | `src/runtime/actions/RuntimeActionEngine.ts` | 103, 232 | execute present |
| runtime-action-engine | OK | MEDIUM | `src/runtime/actions/RuntimeActionEngine.ts` | 82, 87 | runtimeOnly present |
| priority-module-file | OK | HIGH | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous module file found |
| priority-actions-source | OK | HIGH | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` |  | rendezvous actions source found |
| priority-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` |  | rendezvous runtimeOnly found |
| priority-expected-action | OK | HIGH | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` |  | rendezvous expected action reporter-rdv found |
| priority-module-file | OK | HIGH | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto module file found |
| priority-actions-source | OK | HIGH | `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` |  | interventionsauto actions source found |
| priority-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` |  | interventionsauto runtimeOnly found |
| priority-expected-action | OK | HIGH | `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` |  | interventionsauto expected action demarrer-intervention found |
| priority-module-file | OK | HIGH | `src/runtime/modules/generated/facturesauto/facturesauto.module.ts` |  | facturesauto module file found |
| priority-actions-source | OK | HIGH | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` |  | facturesauto actions source found |
| priority-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` |  | facturesauto runtimeOnly found |
| priority-expected-action | OK | HIGH | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` |  | facturesauto expected action envoyer-facture found |
| priority-expected-action | OK | HIGH | `src/runtime/modules/generated/facturesauto/facturesauto.actions.ts` |  | facturesauto expected action annuler-facture found |
| priority-module-file | OK | HIGH | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto module file found |
| priority-actions-source | OK | HIGH | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto actions source found |
| priority-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto runtimeOnly found |
| priority-expected-action | OK | HIGH | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto expected action envoyer-commande found |
| priority-expected-action | OK | HIGH | `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts` |  | commandesstockauto expected action annuler-commande found |
| priority-module-file | OK | HIGH | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto module file found |
| priority-actions-source | OK | HIGH | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto actions source found |
| priority-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto runtimeOnly found |
| priority-expected-action | OK | HIGH | `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts` |  | receptionsstockauto expected action valider-reception found |
| route-readiness | OK | LOW | `src/app/(private)/rendezvous/page.tsx` |  | src/app/(private)/rendezvous/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/rendezvous/[id]/page.tsx` |  | src/app/(private)/rendezvous/[id]/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/rendezvous/[id]/edit/page.tsx` |  | src/app/(private)/rendezvous/[id]/edit/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/interventionsauto/page.tsx` |  | src/app/(private)/interventionsauto/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/interventionsauto/[id]/page.tsx` |  | src/app/(private)/interventionsauto/[id]/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/interventionsauto/[id]/edit/page.tsx` |  | src/app/(private)/interventionsauto/[id]/edit/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/facturesauto/page.tsx` |  | src/app/(private)/facturesauto/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/facturesauto/[id]/page.tsx` |  | src/app/(private)/facturesauto/[id]/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/facturesauto/[id]/edit/page.tsx` |  | src/app/(private)/facturesauto/[id]/edit/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/commandesstockauto/page.tsx` |  | src/app/(private)/commandesstockauto/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/commandesstockauto/[id]/page.tsx` |  | src/app/(private)/commandesstockauto/[id]/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/commandesstockauto/[id]/edit/page.tsx` |  | src/app/(private)/commandesstockauto/[id]/edit/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/receptionsstockauto/page.tsx` |  | src/app/(private)/receptionsstockauto/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/receptionsstockauto/[id]/page.tsx` |  | src/app/(private)/receptionsstockauto/[id]/page.tsx found |
| route-readiness | OK | LOW | `src/app/(private)/receptionsstockauto/[id]/edit/page.tsx` |  | src/app/(private)/receptionsstockauto/[id]/edit/page.tsx found |

## Contextes utiles

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 14

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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 15

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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: ERPRuntimeActionBar :: line 16

```tsx
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

### src/components/erp/runtime/ERPRuntimePage.tsx :: data-runtime-action-bar-placement="runtime-page" :: line 450

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
```

### src/components/erp/runtime/ERPRuntimePage.tsx :: RuntimeActionEngine.execute :: line 214

```tsx
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

### src/components/erp/runtime/ERPRuntimePage.tsx :: handleRuntimeAction :: line 208

```tsx
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

### src/components/erp/runtime/ERPRuntimePage.tsx :: void handleRuntimeAction :: line 457

```tsx
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

### src/components/erp/runtime/ERPRuntimeActionBar.tsx :: disabled :: line 81

```tsx
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

### src/runtime/actions/RuntimeActionEngine.ts :: getAvailableActions :: line 43

```tsx
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

## Conclusion

Audit structurel validé : l’UI runtime est prête pour les tests manuels sur fiches réelles.