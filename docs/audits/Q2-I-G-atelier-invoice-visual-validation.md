# Q2-I-G — Atelier invoice visual validation

## Scope

- Page: `/facturesauto`
- Seeded invoice: `FAC-ATELIER-Q2I-001` / `q2i-atelier-facture-001`
- Source intervention: `demo-intervention-old-001`
- Scope: atelier invoice only. Boutique and mixed invoices are excluded.
- Goal: validate the graphical operational tree on a real atelier invoice scenario.

## Static audit summary

- OK: 14
- FAIL: 0

## Static checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: treeView | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | File exists: recordTree | src/components/erp/operational/ERPOperationalRecordTree.tsx |
| OK | File exists: expandedChildren | src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| OK | File exists: resolver | src/runtime/operational/RuntimeOperationalTreeResolver.ts |
| OK | Graphic tree rendering remains present | The atelier invoice validation used the graphical hierarchy. |
| OK | Tree preserves source metadata display | Source atelier/intervention remains visible in the tree. |
| OK | Tree preserves return context | Open links keep contextual return. |
| OK | Record tree delegates to RuntimeOperationalTreeResolver | Data loading remains runtime-driven. |
| OK | Expanded children mounts record tree generically | No business page-specific wiring. |
| OK | Expanded children consumes operational.tree policy | Tree display remains metadata-policy driven. |
| OK | Resolver supports source metadata | Required for atelier invoice source representation. |
| OK | No direct Firestore access in tree UI stack | UI stack must not read Firestore directly. |
| OK | No RuntimeDataBinding.list in tree UI stack | UI stack must not call RuntimeDataBinding.list. |
| OK | No hardcoded AMARKHYS context in tree UI stack | Tree remains generic. |

## Manual visual validation

| Result | Check | Details |
|---|---|---|
| OK | Facture atelier visible dans la liste | Validated on /facturesauto with FAC-ATELIER-Q2I-001. |
| OK | Expand facture | Invoice expansion works. |
| OK | Arbre graphique visible | Graphical hierarchy is displayed. |
| OK | Source atelier/intervention visible | Source intervention context is readable. |
| OK | Lignes facture visibles dans l’arbre | Invoice lines are visible. |
| OK | Encaissement visible | Payment child is visible. |
| OK | Échéance visible | Payment schedule child is visible. |
| OK | Relance facture visible | Invoice reminder is visible. |
| OK | Relance échéance visible | Schedule reminder is visible. |
| OK | Boutons + / − fonctionnels | Expand/collapse works. |
| OK | Boutons Ouvrir fonctionnels | Open links work. |
| OK | Retour contextuel OK | Return context is preserved. |
| OK | Enfants existants hors arbre visibles | Existing expanded child blocks remain visible. |
| OK | Pas de crash | No runtime crash observed. |
| OK | Pas de page métier modifiée | Validation used generic runtime wiring. |

## Decision

Q2-I-G is validated. The atelier invoice is correctly represented in the graphical operational tree with source intervention, invoice lines, payment, schedule and reminders.

Next step: close Q2-I-G after build and commit. Future boutique/mixed invoices remain out of scope until explicitly reopened.