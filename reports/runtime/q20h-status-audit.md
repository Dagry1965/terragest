# Q20H — Audit global des statuts runtime

Modules analysés : 16

## Synthèse prioritaire

| Module | Priorité | Recommandation |
|---|---:|---|
| budgets | moyenne | À revoir : distinguer statut métier visible, statut technique et actions workflow. |
| campagnes | moyenne | À revoir : distinguer statut métier visible, statut technique et actions workflow. |
| clientsauto | moyenne | À revoir : distinguer statut métier visible, statut technique et actions workflow. |
| contrats | moyenne | À revoir : distinguer statut métier visible, statut technique et actions workflow. |
| echeancespaiementauto | haute | Conserver les statuts financiers visibles, mais éviter les changements manuels directs. Les paiements/factures doivent piloter les transitions. |
| encaissementsauto | haute | Conserver les statuts financiers visibles, mais éviter les changements manuels directs. Les paiements/factures doivent piloter les transitions. |
| facturations | moyenne | À revoir : distinguer statut métier visible, statut technique et actions workflow. |
| facturesauto | haute | Conserver les statuts financiers visibles, mais éviter les changements manuels directs. Les paiements/factures doivent piloter les transitions. |
| interventionsauto | moyenne | À revoir : distinguer statut métier visible, statut technique et actions workflow. |
| lignesinterventionauto | haute | Simplifier visible utilisateur à brouillon / validee. Masquer facturee / annulee. Facturation et retrait doivent devenir relations/actions techniques. |
| mouvementsstockauto | haute | Le stock ne doit pas être modifié directement. Les mouvements pilotent les quantités et les statuts disponible / stock_faible / rupture. |
| produitsauto | moyenne | À revoir : distinguer statut métier visible, statut technique et actions workflow. |
| rappelsauto | moyenne | À revoir : distinguer statut métier visible, statut technique et actions workflow. |
| rendezvous | moyenne | À revoir : distinguer statut métier visible, statut technique et actions workflow. |
| stocksauto | haute | Le stock ne doit pas être modifié directement. Les mouvements pilotent les quantités et les statuts disponible / stock_faible / rupture. |
| vehicules | moyenne | À revoir : distinguer statut métier visible, statut technique et actions workflow. |

## Détail par module

### budgets

Fichier : `src\runtime\modules\generated\budgets\budgets.module.ts`

Initial state : `non défini`

Options champ statut :
- Actif → `actif`
- Inactif → `inactif`

États workflow :
- Brouillon → `draft`
- Actif → `active`
- Archivé → `archived`

Transitions :
- `draft` → `active` : Valider
- `active` → `archived` : Archiver

Recommandation :
- À revoir : distinguer statut métier visible, statut technique et actions workflow.

Statuts visibles proposés : `actif`, `inactif`, `draft`, `active`, `archived`

### campagnes

Fichier : `src\runtime\modules\generated\campagnes\campagnes.module.ts`

Initial state : `non défini`

Options champ statut :
- Actif → `actif`
- Inactif → `inactif`

États workflow :
- Brouillon → `draft`
- Actif → `active`
- Archivé → `archived`

Transitions :
- `draft` → `active` : Valider
- `active` → `archived` : Archiver

Recommandation :
- À revoir : distinguer statut métier visible, statut technique et actions workflow.

Statuts visibles proposés : `actif`, `inactif`, `draft`, `active`, `archived`

### clientsauto

Fichier : `src\runtime\modules\generated\clientsauto\clientsauto.module.ts`

Initial state : `prospect`

Options champ statut :
- Actif → `actif`
- Prospect → `prospect`
- Inactif → `inactif`
- Archivé → `archive`

États workflow :
- Prospect → `prospect`
- Client → `active`
- Inactif → `inactive`

Transitions :
- `prospect` → `active` : Convertir
- `active` → `inactive` : Désactiver

Recommandation :
- À revoir : distinguer statut métier visible, statut technique et actions workflow.

Statuts visibles proposés : `actif`, `prospect`, `inactif`, `archive`, `active`, `inactive`

### contrats

Fichier : `src\runtime\modules\generated\contrats\contrats.module.ts`

Initial state : `non défini`

Options champ statut :
- Actif → `actif`
- Inactif → `inactif`

États workflow :
- Brouillon → `draft`
- Actif → `active`
- Archivé → `archived`

Transitions :
- `draft` → `active` : Valider
- `active` → `archived` : Archiver

Recommandation :
- À revoir : distinguer statut métier visible, statut technique et actions workflow.

Statuts visibles proposés : `actif`, `inactif`, `draft`, `active`, `archived`

### echeancespaiementauto

Fichier : `src\runtime\modules\generated\echeancespaiementauto\echeancespaiementauto.module.ts`

Initial state : `a_venir`

Options champ statut :
- À venir → `a_venir`
- En retard → `en_retard`
- Partiellement payée → `partiellement_payee`
- Payée → `payee`
- Annulée → `annulee`

États workflow :
- À venir → `a_venir`
- En retard → `en_retard`
- Partiellement payée → `partiellement_payee`
- Payée → `payee`
- Annulée → `annulee`

Transitions :
- `a_venir` → `en_retard` : Marquer en retard
- `a_venir` → `payee` : Marquer payée
- `en_retard` → `payee` : Marquer payée
- `a_venir` → `annulee` : Annuler

Recommandation :
- Conserver les statuts financiers visibles, mais éviter les changements manuels directs. Les paiements/factures doivent piloter les transitions.

Statuts visibles proposés : `a_venir`, `en_retard`, `partiellement_payee`, `payee`, `annulee`
États/relations techniques : `computed payment state`, `invoice/payment linkage`

### encaissementsauto

Fichier : `src\runtime\modules\generated\encaissementsauto\encaissementsauto.module.ts`

Initial state : `en_attente`

Options champ statut :
- En attente → `en_attente`
- Validé → `valide`
- Rejeté → `rejete`
- Annulé → `annule`

États workflow :
- En attente → `en_attente`
- Validé → `valide`
- Rejeté → `rejete`
- Annulé → `annule`

Transitions :
- `en_attente` → `valide` : Valider
- `en_attente` → `rejete` : Rejeter
- `en_attente` → `annule` : Annuler

Recommandation :
- Conserver les statuts financiers visibles, mais éviter les changements manuels directs. Les paiements/factures doivent piloter les transitions.

Statuts visibles proposés : `en_attente`, `valide`, `rejete`, `annule`
États/relations techniques : `computed payment state`, `invoice/payment linkage`

### facturations

Fichier : `src\runtime\modules\generated\facturations\facturations.module.ts`

Initial state : `non défini`

Options champ statut :
- Actif → `actif`
- Inactif → `inactif`

États workflow :
- Brouillon → `draft`
- Actif → `active`
- Archivé → `archived`

Transitions :
- `draft` → `active` : Valider
- `active` → `archived` : Archiver

Recommandation :
- À revoir : distinguer statut métier visible, statut technique et actions workflow.

Statuts visibles proposés : `actif`, `inactif`, `draft`, `active`, `archived`

### facturesauto

Fichier : `src\runtime\modules\generated\facturesauto\facturesauto.module.ts`

Initial state : `en_attente`

Options champ statut :
- aucune option visible détectée

États workflow :
- En attente → `en_attente`
- Paiement partiel → `partiel`
- Payé → `paye`

Transitions :
- `en_attente` → `partiel` : Paiement partiel
- `partiel` → `paye` : Finaliser

Recommandation :
- Conserver les statuts financiers visibles, mais éviter les changements manuels directs. Les paiements/factures doivent piloter les transitions.

Statuts visibles proposés : `en_attente`, `partiel`, `paye`
États/relations techniques : `computed payment state`, `invoice/payment linkage`

### interventionsauto

Fichier : `src\runtime\modules\generated\interventionsauto\interventionsauto.module.ts`

Initial state : `ouverte`

Options champ statut :
- Ouverte → `ouverte`
- Diagnostic → `diagnostic`
- En cours → `en_cours`
- Terminée → `terminee`
- Facturée → `facturee`
- Annulée → `annulee`

États workflow :
- Ouverte → `ouverte`
- Diagnostic → `diagnostic`
- En cours → `en_cours`
- Terminée → `terminee`
- Facturée → `facturee`
- Annulée → `annulee`

Transitions :
- `ouverte` → `diagnostic` : Diagnostiquer
- `diagnostic` → `en_cours` : Démarrer
- `en_cours` → `terminee` : Terminer
- `terminee` → `facturee` : Facturer
- `ouverte` → `annulee` : Annuler

Recommandation :
- À revoir : distinguer statut métier visible, statut technique et actions workflow.

Statuts visibles proposés : `ouverte`, `diagnostic`, `en_cours`, `terminee`, `facturee`, `annulee`

### lignesinterventionauto

Fichier : `src\runtime\modules\generated\lignesinterventionauto\lignesinterventionauto.module.ts`

Initial state : `brouillon`

Options champ statut :
- Brouillon → `brouillon`
- Validée → `validee`
- Facturée → `facturee`
- Annulée → `annulee`

États workflow :
- Brouillon → `brouillon`
- Validée → `validee`
- Facturée → `facturee`
- Annulée → `annulee`

Transitions :
- `brouillon` → `validee` : Valider
- `validee` → `facturee` : Marquer facturée
- `brouillon` → `annulee` : Annuler
- `validee` → `annulee` : Annuler

Recommandation :
- Simplifier visible utilisateur à brouillon / validee. Masquer facturee / annulee. Facturation et retrait doivent devenir relations/actions techniques.

Statuts visibles proposés : `brouillon`, `validee`
États/relations techniques : `facturee`, `annulee`, `stockMovementId`, `factureId`, `removedAt`

### mouvementsstockauto

Fichier : `src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts`

Initial state : `valide`

Options champ statut :
- Brouillon → `brouillon`
- Validé → `valide`
- Annulé → `annule`

États workflow :
- Brouillon → `brouillon`
- Validé → `valide`
- Annulé → `annule`

Transitions :
- `brouillon` → `valide` : Valider
- `valide` → `annule` : Annuler

Recommandation :
- Le stock ne doit pas être modifié directement. Les mouvements pilotent les quantités et les statuts disponible / stock_faible / rupture.

Statuts visibles proposés : `brouillon`, `valide`, `annule`
États/relations techniques : `quantiteAvant`, `quantiteApres`, `sourceModule`, `sourceId`

### produitsauto

Fichier : `src\runtime\modules\generated\produitsauto\produitsauto.module.ts`

Initial state : `actif`

Options champ statut :
- Actif → `actif`
- Rupture → `rupture`
- Inactif → `inactif`
- Archivé → `archive`

États workflow :
- Actif → `actif`
- Rupture → `rupture`
- Inactif → `inactif`
- Archivé → `archive`

Transitions :
- `actif` → `rupture` : Déclarer rupture
- `rupture` → `actif` : Réapprovisionner
- `actif` → `inactif` : Désactiver
- `inactif` → `archive` : Archiver

Recommandation :
- À revoir : distinguer statut métier visible, statut technique et actions workflow.

Statuts visibles proposés : `actif`, `rupture`, `inactif`, `archive`

### rappelsauto

Fichier : `src\runtime\modules\generated\rappelsauto\rappelsauto.module.ts`

Initial state : `planifie`

Options champ statut :
- Planifié → `planifie`
- Envoyé → `envoye`
- Échoué → `echoue`
- Annulé → `annule`

États workflow :
- Planifié → `planifie`
- Envoyé → `envoye`
- Échoué → `echoue`
- Annulé → `annule`

Transitions :
- `planifie` → `envoye` : Marquer envoyé
- `planifie` → `echoue` : Marquer échoué
- `planifie` → `annule` : Annuler
- `echoue` → `planifie` : Replanifier

Recommandation :
- À revoir : distinguer statut métier visible, statut technique et actions workflow.

Statuts visibles proposés : `planifie`, `envoye`, `echoue`, `annule`

### rendezvous

Fichier : `src\runtime\modules\generated\rendezvous\rendezvous.module.ts`

Initial state : `planifie`

Options champ statut :
- Planifié → `planifie`
- Confirmé → `confirme`
- En cours → `en_cours`
- Terminé → `termine`
- Facturé → `facture`
- Annulé → `annule`

États workflow :
- Planifié → `planifie`
- Confirmé → `confirme`
- En cours → `en_cours`
- Terminé → `termine`
- Facturé → `facture`
- Annulé → `annule`

Transitions :
- `planifie` → `confirme` : Confirmer
- `confirme` → `en_cours` : Démarrer
- `en_cours` → `termine` : Terminer
- `termine` → `facture` : Facturer
- `planifie` → `annule` : Annuler

Recommandation :
- À revoir : distinguer statut métier visible, statut technique et actions workflow.

Statuts visibles proposés : `planifie`, `confirme`, `en_cours`, `termine`, `facture`, `annule`

### stocksauto

Fichier : `src\runtime\modules\generated\stocksauto\stocksauto.module.ts`

Initial state : `disponible`

Options champ statut :
- Disponible → `disponible`
- Stock faible → `stock_faible`
- Rupture → `rupture`
- Archivé → `archive`

États workflow :
- Disponible → `disponible`
- Stock faible → `stock_faible`
- Rupture → `rupture`
- Archivé → `archive`

Transitions :
- `disponible` → `stock_faible` : Déclarer stock faible
- `stock_faible` → `rupture` : Déclarer rupture
- `rupture` → `disponible` : Réapprovisionner
- `disponible` → `archive` : Archiver

Recommandation :
- Le stock ne doit pas être modifié directement. Les mouvements pilotent les quantités et les statuts disponible / stock_faible / rupture.

Statuts visibles proposés : `disponible`, `stock_faible`, `rupture`, `archive`
États/relations techniques : `quantiteAvant`, `quantiteApres`, `sourceModule`, `sourceId`

### vehicules

Fichier : `src\runtime\modules\generated\vehicules\vehicules.module.ts`

Initial state : `actif`

Options champ statut :
- Actif → `actif`
- Entretien requis → `entretien`
- Immobilisé → `immobilise`
- Archivé → `archive`

États workflow :
- Actif → `actif`
- Entretien requis → `entretien`
- Immobilisé → `immobilise`
- Archivé → `archive`

Transitions :
- `actif` → `entretien` : Planifier entretien
- `entretien` → `actif` : Réparer
- `actif` → `immobilise` : Immobiliser

Recommandation :
- À revoir : distinguer statut métier visible, statut technique et actions workflow.

Statuts visibles proposés : `actif`, `entretien`, `immobilise`, `archive`
