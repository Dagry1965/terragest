# Q2-I-A2 — Audit modèle facture / échéances / relances pour arbre opérationnel

OK: 66
FAIL: 0
RULE: 5
DECISION: 1
RECOMMEND: 0

## Règles confirmées

- Les lignes facture définissent le détail économique et les montants agrégés de facture.
- Les échéances découpent le reste à payer de la facture globale ; elles ne sont pas enfants des lignes facture par défaut.
- Les encaissements réduisent le reste à payer de la facture.
- Les relances se rattachent à une facture ou à une échéance si le modèle expose les clés correspondantes.
- La facture peut apparaître comme enfant d’une intervention atelier, mais doit aussi être représentable comme document financier autonome avec sourceModule/sourceRecordId.

## Checks

- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose typeFacture
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose sourceScope
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose sourceType
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose sourceModule
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose sourceRecordId
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose sourceLabel
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose numeroFacture
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose clientId
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose vehiculeId
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose interventionId
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose montantHT
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose montantTTC
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose montantPaye
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose resteAPayer
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose statutPaiement
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto déclare readOnlyFields
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto verrouille ou référence montantTTC
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto verrouille ou référence montantPaye
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto verrouille ou référence resteAPayer
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto verrouille ou référence statutPaiement
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto verrouille ou référence sourceModule
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto verrouille ou référence sourceRecordId
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto verrouille ou référence sourceLabel
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto composition.children expose lignesfactureauto
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto composition.children expose encaissementsauto
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto composition.children expose echeancespaiementauto
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto expose rappels/relances comme enfant direct si disponible
- [OK] src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts — lignesfactureauto expose factureId
- [OK] src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts — lignesfactureauto expose designation
- [OK] src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts — lignesfactureauto expose quantite
- [OK] src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts — lignesfactureauto expose prixUnitaireHT
- [OK] src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts — lignesfactureauto expose montantHT
- [OK] src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts — lignesfactureauto expose montantTTC
- [OK] src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts — lignesfactureauto peut tracer la source sourceModule
- [OK] src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts — lignesfactureauto peut tracer la source sourceRecordId
- [OK] src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts — lignesfactureauto peut tracer la source sourceLineId
- [OK] src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts — encaissementsauto expose factureId
- [OK] src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts — encaissementsauto expose clientId
- [OK] src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts — encaissementsauto expose vehiculeId
- [OK] src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts — encaissementsauto expose montant
- [OK] src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts — encaissementsauto expose modePaiement
- [OK] src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts — encaissementsauto expose statut
- [OK] src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts — echeancespaiementauto expose factureId
- [OK] src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts — echeancespaiementauto expose clientId
- [OK] src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts — echeancespaiementauto expose vehiculeId
- [OK] src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts — echeancespaiementauto expose montantPrevu
- [OK] src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts — echeancespaiementauto expose montantPaye
- [OK] src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts — echeancespaiementauto expose dateEcheance
- [OK] src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts — echeancespaiementauto expose statut
- [OK] src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts — rappelsauto existe et déclare schema
- [OK] src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts — rappelsauto expose clientId
- [OK] src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts — rappelsauto expose vehiculeId
- [OK] src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts — rappelsauto expose typeRappel
- [OK] src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts — rappelsauto expose dateRappel
- [OK] src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts — rappelsauto expose canal
- [OK] src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts — rappelsauto expose message
- [OK] src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts — rappelsauto expose statut
- [OK] src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts — rappelsauto peut être lié à une facture
- [OK] src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts — rappelsauto peut être lié à une échéance
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto peut exposer facturesauto comme document lié
- [OK] src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts — interventionsauto → facturesauto utilise interventionId
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto conserve interventionId pour compatibilité atelier
- [OK] src/runtime/modules/generated/facturesauto/facturesauto.module.ts — facturesauto utilise sourceModule pour ne pas limiter la facture à interventionId
- [OK] src/runtime/operational/RuntimeOperationalChildrenResolver.ts — ChildrenResolver existant disponible pour enfants déclarés
- [OK] src/runtime/operational/RuntimeOperationalDataResolver.ts — DataResolver disponible pour labels
- [OK] docs/audits/Q2-I-A-operational-tree-runtime-readiness-audit.md — Q2-I-A readiness arbre validée

## Findings

- [RULE] Billing tree model — Les lignes facture définissent le détail économique et les montants agrégés de facture.
- [RULE] Billing tree model — Les échéances découpent le reste à payer de la facture globale ; elles ne sont pas enfants des lignes facture par défaut.
- [RULE] Billing tree model — Les encaissements réduisent le reste à payer de la facture.
- [RULE] Billing tree model — Les relances se rattachent à une facture ou à une échéance si le modèle expose les clés correspondantes.
- [RULE] Billing tree model — La facture peut apparaître comme enfant d’une intervention atelier, mais doit aussi être représentable comme document financier autonome avec sourceModule/sourceRecordId.
- [DECISION] Q2-I-B — RuntimeOperationalTreeResolver doit supporter composition.children et liens source documentaire sourceModule/sourceRecordId sans hardcoder intervention → facture.

## Décision

Le modèle facture / échéances / relances est suffisamment cadré pour créer RuntimeOperationalTreeResolver en tenant compte des sources documentaires.
