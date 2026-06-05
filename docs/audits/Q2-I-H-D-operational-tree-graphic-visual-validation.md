# Q2-I-H-D — Operational tree graphic visual validation

## Scope

- Goal: validate the new graphical tree rendering visually.
- Component: `ERPOperationalTreeView`.
- No resolver, data loading, metadata, or business page changes.

## Static audit summary

- OK: 13
- FAIL: 0

## Static checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: treeView | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | File exists: recordTree | src/components/erp/operational/ERPOperationalRecordTree.tsx |
| OK | File exists: expandedChildren | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | Graphic branch rendering is present | Vertical and horizontal tree branch connectors are present. |
| OK | Tree remains recursive | The graphical refactor keeps recursive rendering. |
| OK | Expand/collapse remains local | The tree still supports local expand/collapse. |
| OK | Source display remains available | Source metadata remains visible in the graphical tree. |
| OK | Open links preserve return context | Open links still preserve contextual navigation. |
| OK | Record tree still delegates to resolver | The graphical change does not affect runtime tree resolution. |
| OK | Tree display remains metadata-policy driven | The tree still follows operational.tree display policy. |
| OK | No direct Firestore access in tree UI stack | UI stack must not read Firestore directly. |
| OK | No RuntimeDataBinding.list in tree UI stack | UI stack must not call RuntimeDataBinding.list. |
| OK | No hardcoded AMARKHYS context | Graphic tree remains generic. |

## Manual visual validation

| Result | Check | Details |
|---|---|---|
| OK | Arbre plus lisible graphiquement | Validated visually after Q2-I-H-B2. |
| OK | Branches verticales/horizontales visibles | Graphical connectors are visible. |
| OK | Hiérarchie parent/enfant claire | The tree no longer feels like simple expandable lists. |
| OK | Boutons + / − fonctionnels | Expand/collapse validated. |
| OK | Boutons Ouvrir fonctionnels | Open links validated. |
| OK | Retour contextuel OK | Return context preserved. |
| OK | Source métier toujours visible | Source summary remains visible. |
| OK | Enfants existants hors arbre toujours visibles | Existing expanded children remain visible. |
| OK | Pas de crash | No runtime crash observed. |
| OK | Pas de page métier modifiée | No business page-specific code was added. |

## Decision

Q2-I-H-D is validated. The operational tree now has a clearer graphical hierarchy with branch connectors, while preserving generic runtime architecture, metadata display policy and contextual return.

Next step: continue with atelier invoice data/validation only after this graphical foundation is committed.