# Q2-OP-I14-A — Audit du rendu legacy runtimeActions.map dans ERPRuntimePage

Objectif : identifier les bornes exactes du rendu legacy direct des actions métier afin de le supprimer sans casser `ERPRuntimePage`.

## Marker: legacyCondition

Pattern: `{type === "detail" && runtimeActions.length > 0 && (`
Occurrences: 1

- Line 417

## Marker: legacyMap

Pattern: `runtimeActions.map`
Occurrences: 1

- Line 419

## Marker: legacyButton

Pattern: `<button`
Occurrences: 1

- Line 420

## Marker: legacyOnClick

Pattern: `handleRuntimeAction(action)`
Occurrences: 1

- Line 424

## Marker: actionBar

Pattern: `ERPRuntimeActionBar`
Occurrences: 6

- Line 14
- Line 15
- Line 16
- Line 43
- Line 88
- Line 478

## Marker: actionBarPlacement

Pattern: `data-runtime-action-bar-placement="runtime-page"`
Occurrences: 1

- Line 477

## Marker: createForm

Pattern: `{type === "create" && module && (`
Occurrences: 1

- Line 475

## Marker: editForm

Pattern: `{type === "edit" && module && currentRecord && (`
Occurrences: 1

- Line 493

## Marker: details

Pattern: `{type === "detail" && module && currentRecord && (`
Occurrences: 1

- Line 502

## Bloc legacy équilibré détecté

- Start line: 417
- End line: 446
- Contains runtimeActions.map: yes
- Contains handleRuntimeAction(action): yes
- Contains <button: yes

### Contexte bloc legacy

```tsx
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
  438:                         : "bg-[var(--erp-table-head)] text-[var(--erp-table-head-text)] hover:bg-[#007F6D]"
  439:                   }
  440:                 `}
  441:               >
  442:                 {action.label}
  443:               </button>
  444:             ))}
  445:           </div>
  446:         )}
  447: 
  448:         {loading && type === "list" ? (
  449:           <div className="rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4 text-sm text-[var(--erp-text-muted)]">
  450:             Chargement des données...
  451:           </div>
  452:         ) : null}
  453: 
  454:         {module && currentRecord && (type === "detail" || type === "edit") ? (
```

## Contexte RuntimeActionBar / formulaires

```tsx
  397:             <Link
  398:               href={createActionHref}
  399:               className="
  400:                 rounded-2xl
  401:                 bg-[var(--erp-table-head)]
  402:                 px-5
  403:                 py-3
  404:                 text-sm
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
  436:                       : action.type === "secondary"
  437:                         ? "bg-slate-200 text-[var(--erp-text)] hover:bg-slate-300"
  438:                         : "bg-[var(--erp-table-head)] text-[var(--erp-table-head-text)] hover:bg-[#007F6D]"
  439:                   }
  440:                 `}
  441:               >
  442:                 {action.label}
  443:               </button>
  444:             ))}
  445:           </div>
  446:         )}
  447: 
  448:         {loading && type === "list" ? (
  449:           <div className="rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4 text-sm text-[var(--erp-text-muted)]">
  450:             Chargement des données...
  451:           </div>
  452:         ) : null}
  453: 
  454:         {module && currentRecord && (type === "detail" || type === "edit") ? (
  455:           <ERPContextBanner
  456:             module={module}
  457:             record={currentRecord}
  458:             mode={type}
  459:           />
  460:         ) : null}
  461: 
  462:         <div data-erp-related-children-before className="space-y-4">
  463:           {module && currentRecord && relatedChildrenBefore.map((child) => (
  464:             <ERPRelatedRecordsPanel
  465:               key={child.key}
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
  497:             initialData={currentRecord}
  498:             forceReadOnlyBecauseRemoved={isRemovedRecord}
  499:           />
  500:         )}
  501: 
  502:         {type === "detail" && module && currentRecord && (
  503:           <ERPRuntimeDetails
  504:             module={module}
  505:             data={currentRecord}
  506:           />
  507:         )}
  508: 
  509:         <div data-erp-related-children-after className="space-y-4">
  510:           {module && currentRecord && relatedChildrenAfter.map((child) => (
  511:             <ERPRelatedRecordsPanel
  512:               key={child.key}
  513:               parentModule={module}
  514:               parentRecord={currentRecord}
  515:               child={child}
  516:               mode={type as "detail" | "edit"}
  517:             />
  518:           ))}
  519:         </div>
  520: 
```

## Décision recommandée

- Le bloc legacy direct est précisément détecté.
- Prochaine passe : supprimer uniquement ce bloc.
- Attention : `ERPRuntimeActionBar` doit recevoir des actions avec `onClick` pour conserver l'exécution.