# Q2-I-J-C-D — Invoice summary visual validation

## Scope

- Page: `/facturesauto`
- Invoice: `FAC-ATELIER-Q2I-001` / `q2i-atelier-facture-001`
- Goal: validate metadata-driven root summary in the graphical operational tree.
- No business page patch.

## Static audit summary

- OK: 13
- FAIL: 0

## Static checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: erpModule | src/runtime/modules/ERPModule.ts |
| OK | File exists: resolver | src/runtime/operational/RuntimeOperationalTreeResolver.ts |
| OK | File exists: treeView | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | File exists: factures | src/runtime/modules/generated/facturesauto/facturesauto.module.ts |
| OK | ERPModule exposes generic summary metadata config | Metadata can declare tree summary badges and metrics. |
| OK | Resolver maps metadata summary into runtime nodes | RuntimeOperationalTreeNode.summary is built from module metadata and record values. |
| OK | TreeView renders summary generically | Renderer consumes generic summary only. |
| OK | TreeView has no invoice hardcode | Invoice fields stay in metadata, not in the generic component. |
| OK | facturesauto declares summary badges | Invoice badges are metadata-driven. |
| OK | facturesauto declares financial metrics | Invoice financial summary is metadata-driven. |
| OK | Summary is root-only | Invoice summary should enrich the root invoice node without overloading children. |
| OK | No direct Firestore access in TreeView | Rendering remains presentation-only. |
| OK | No hardcoded AMARKHYS context in generic runtime files | Generic runtime remains tenant/domain agnostic. |

## Manual visual validation

| Result | Check | Details |
|---|---|---|
| OK | Badges visibles | FACTURE ATELIER / ÉMISE / PAIEMENT PARTIEL visible. |
| OK | Métriques visibles | HT / TVA / TTC / Payé / Reste visible. |
| OK | Arbre graphique toujours visible | The graphical hierarchy remains visible. |
| OK | Source intervention toujours visible | Source intervention remains readable. |
| OK | Lignes facture visibles | Invoice lines remain visible. |
| OK | Encaissement visible | Payment branch remains visible. |
| OK | Échéance visible | Payment schedule branch remains visible. |
| OK | Relances visibles | Invoice and schedule reminders remain visible. |
| OK | Bouton Ouvrir fonctionne | Open navigation works after dev server restart. |
| OK | Retour contextuel fonctionne | Return context remains preserved. |
| OK | Pas de crash | No runtime crash observed. |
| OK | Aucun patch page métier | Validation uses generic runtime/metadata wiring. |

## Decision

Q2-I-J-C-D is validated. The invoice root summary is visible and metadata-driven: badges, financial metrics, source, tree children and contextual navigation all remain functional.

Q2-I-J-C can be closed after build, backup cleanup and commit.