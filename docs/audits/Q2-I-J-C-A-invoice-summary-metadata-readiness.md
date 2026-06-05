# Q2-I-J-C-A — Invoice summary metadata readiness audit

## Scope

- Goal: prepare metadata-driven invoice root summary for the operational tree.
- No code modification in this pass.
- Target invoice example: `FAC-ATELIER-Q2I-001`.
- Generic renderer must stay invoice-agnostic.

## Target summary

```text
FAC-ATELIER-Q2I-001
[FACTURE ATELIER] [EMISE] [PARTIEL]
HT 140 000 | TVA 25 200 | TTC 165 200 | Paye 90 000 | Reste 75 200
```

## Summary

- OK: 16
- WARN: 1
- FAIL: 0

## Checks

| Status | Check | Details |
|---|---|---|
| OK | File exists: erpModule | src/runtime/modules/ERPModule.ts |
| OK | File exists: resolver | src/runtime/operational/RuntimeOperationalTreeResolver.ts |
| OK | File exists: treeView | src/components/erp/operational/ERPOperationalTreeView.tsx |
| OK | File exists: factures | src/runtime/modules/generated/facturesauto/facturesauto.module.ts |
| true | OK | Runtime node summary contract exists |
| true | OK | Tree view renders summary badges and metrics |
| true | OK | Operational tree config exists |
| WARN | No typed summary metadata config detected yet | Q2-I-J-C-B can add it generically. |
| OK | facturesauto field available: typeFacture | Required for FAC-ATELIER-Q2I-001 summary. |
| OK | facturesauto field available: statutFacture | Required for FAC-ATELIER-Q2I-001 summary. |
| OK | facturesauto field available: statutPaiement | Required for FAC-ATELIER-Q2I-001 summary. |
| OK | facturesauto field available: montantHT | Required for FAC-ATELIER-Q2I-001 summary. |
| OK | facturesauto field available: tva | Required for FAC-ATELIER-Q2I-001 summary. |
| OK | facturesauto field available: montantTTC | Required for FAC-ATELIER-Q2I-001 summary. |
| OK | facturesauto field available: montantPaye | Required for FAC-ATELIER-Q2I-001 summary. |
| OK | facturesauto field available: resteAPayer | Required for FAC-ATELIER-Q2I-001 summary. |
| OK | facturesauto has operational metadata block | If absent, Q2-I-J-C-B must create or extend it carefully. |
| OK | Generic TreeView has no invoice field hardcode | Invoice fields must stay in metadata/resolver mapping. |
| OK | Generic TreeView has no direct Firestore access | Summary rendering must remain presentation-only. |
| OK | No hardcoded AMARKHYS context | Summary config must remain generic. |

## Decision

Q2-I-J-C-A is validated. Invoice summary can be configured through metadata and mapped into `RuntimeOperationalTreeNode.summary`.

Next step: Q2-I-J-C-B add generic summary metadata config and consume it in `RuntimeOperationalTreeResolver`.