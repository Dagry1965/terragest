# AMARKHYS-REBUILD-05C — Suppression actions métier internes ERPEnterpriseForm

Date: 2026-05-31T16:34:18.648Z

## Décision ERP

ERPEnterpriseForm doit rester un composant formulaire. Les boutons métier / workflow / statut doivent être rendus par ERPRuntimePage / ERPRuntimeActionBar.

## Correction appliquée

- getBusinessStatusAction() neutralisée.
- businessStatusAction protégé explicitement en mode create.
- Aucun patch local sur /rendezvous/nouveau.

## Checks

- OK — getBusinessStatusAction neutralisée
- OK — businessStatusAction guard create présent
- OK — anciens labels RDV absents du formulaire
- OK — anciens labels clients/vehicules absents du formulaire
- OK — fichier modifié

## Synthèse

- OK: 5
- FAIL: 0
