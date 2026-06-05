# Q2-I-E-A — Operational tree UX/runtime audit

## Scope

- Goal: evaluate the operational tree after generic wiring.
- No code modification in this pass.
- Focus: UX weight, generic runtime architecture, invoice/source/document behavior.

## Summary

- OK: 26
- WARN: 2
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: expandedChildren | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | File exists: recordTree | src/components/erp/operational/ERPOperationalRecordTree.tsx |
| OK | File exists: treeView | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | File exists: treeResolver | src/runtime/operational/RuntimeOperationalTreeResolver.ts |
| OK | File exists: factures | src/runtime/modules/generated/facturesauto/facturesauto.module.ts |
| OK | File exists: lignesFacture | src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts |
| OK | File exists: encaissements | src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts |
| OK | File exists: echeances | src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts |
| OK | File exists: rappels | src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts |
| OK | Operational tree is mounted in generic expanded children flow | The tree must not be wired inside business pages. |
| OK | Tree receives generic parent module and record context | This confirms runtime-driven wiring. |
| OK | Record tree delegates loading to RuntimeOperationalTreeResolver | The UI wrapper must not rebuild tree traversal. |
| OK | Record tree delegates rendering to ERPOperationalTreeView | Presentation remains separated from resolution. |
| OK | Tree links preserve return context | The visual test validated contextual return. |
| OK | Existing expanded children remain runtime-driven | The tree must not replace the existing operational child blocks. |
| OK | No RuntimeDataBinding.list in tree UI stack | Data loading must remain behind runtime resolvers. |
| OK | No direct Firestore access in tree UI stack | UI components must remain runtime consumers. |
| OK | No hardcoded AMARKHYS context | The operational tree must stay tenant/workspace generic. |
| OK | Tree resolver supports source/documentary metadata | Required for invoices beyond intervention-only child model. |
| OK | facturesauto exposes source/documentary fields | Invoice should be representable as autonomous financial document. |
| OK | facturesauto exposes invoice lines as composition children | Invoice economic details should be readable under invoice. |
| OK | facturesauto exposes payments as composition children | Payments should reduce invoice remaining amount. |
| OK | facturesauto exposes payment schedules as composition children | Schedules should split the invoice remaining amount. |
| OK | Invoice reminders are linked to facturesauto | Reminders should be attachable to invoice. |
| OK | Schedule reminders are linked to echeancespaiementauto | Reminders should be attachable to payment schedule. |
| WARN | Tree title is currently hardcoded in the mount | Consider metadata/config driven label later if UX needs workspace-specific wording. |
| WARN | Tree default expanded depth is fixed in mount | Consider metadata-driven display settings if the tree becomes visually heavy. |
| OK | Tree is displayed before existing child blocks | This is acceptable but may be visually heavy; visual validation should decide whether it belongs collapsed/lower. |

## Recommendations

| Recommendation | Details |
|---|---|
| Keep tree as navigation/documentary structure | Existing expanded children should remain the main operational reading surface. |
| Do not add page-specific wiring | Future refinements must stay in metadata/runtime/config, not in rendezvous/interventions/factures pages. |
| Consider metadata-driven tree display options | Possible future fields: operational.tree.enabled, defaultExpandedDepth, placement, title, collapsedByDefault. |
| Review invoice source semantics | Factura must stay autonomous and source-aware: atelier, boutique, mixed, or other facturable source. |

## Decision

Q2-I-E-A is validated with warnings only if any. The operational tree is generically wired and should now be refined through metadata/runtime display policy, not page-specific patches.

Recommended next step: Q2-I-E-B introduce a generic display policy for the operational tree if the current placement or expanded depth is visually too heavy.