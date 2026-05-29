# Q2-OG — Client Operational Hub Product Review

- Date: 2026-05-29T02:02:27.720Z
- Root: `C:\Users\Admin\terragest`

## Objectif

Valider visuellement et fonctionnellement le Client Operational Hub : `/clientsauto/hub`.

Cette passe ne modifie pas le produit. Elle sert à décider si le hub client est démontrable ou s’il nécessite une correction ciblée.

## Résumé technique

- OK: 25
- INFO: 7
- WARN: 0
- FAIL: 0
- HIGH FAIL: 0

## Checklist visuelle manuelle

### Route
- [ ] Ouvrir `/clientsauto/hub`
- [ ] Ouvrir `/clientsauto/hub?clientId=<id-client>`
- [ ] Ouvrir `/clientsauto/hub?clientId=<id-client>&selectedVehicleId=<id-vehicule>`

### En-tête client
- [ ] Nom / prénom ou raison sociale lisibles
- [ ] Type client visible
- [ ] Statut visible
- [ ] Informations client non cassées si champ absent

### Véhicules
- [ ] Véhicules filtrés par client
- [ ] Particulier : affichage cartes si typeClient correspond
- [ ] Flotte / Entreprise : affichage tableau si typeClient correspond
- [ ] Sélection véhicule claire
- [ ] Bouton `Fiche véhicule` visible et fonctionnel

### Détails contextuels
- [ ] Le panneau `Dossier sélectionné` affiche le véhicule sélectionné
- [ ] Les interventions liées au véhicule apparaissent
- [ ] Les factures liées au véhicule apparaissent
- [ ] Les boutons `Fiche intervention` et `Facture complète` apparaissent si données présentes

### UX générale
- [ ] Page utilise correctement la largeur
- [ ] Page dense mais pas surchargée
- [ ] Lecture agréable
- [ ] Responsive acceptable
- [ ] Aucun bloc vide gênant

## Checks techniques

| Scope | Status | Severity | Message |
|---|---:|---:|---|
| files | OK | HIGH | Found src/app/(private)/clientsauto/hub/page.tsx |
| files | OK | HIGH | Found src/runtime/hub/RuntimeClientOperationalHubLoader.ts |
| files | OK | HIGH | Found src/components/erp/hub/ERPRecordHubPage.tsx |
| files | OK | HIGH | Found src/components/erp/hub/ERPRecordHubHeader.tsx |
| files | OK | HIGH | Found src/components/erp/hub/ERPRecordHubKpiStrip.tsx |
| files | OK | HIGH | Found src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx |
| files | OK | HIGH | Found src/components/erp/hub/ERPRecordHubSelectedDetails.tsx |
| files | OK | HIGH | Found src/runtime/hub/RuntimeHubTypes.ts |
| files | OK | HIGH | Found src/runtime/hub/RuntimeHubRelationResolver.ts |
| product-markers | OK | MEDIUM | Route exposes Client Operational Hub label |
| product-markers | OK | MEDIUM | Route supports selectedVehicleId |
| product-markers | OK | MEDIUM | Route config uses selectionQueryParam |
| product-markers | OK | MEDIUM | Route config has vehicle navigation action |
| product-markers | OK | MEDIUM | Route config has intervention navigation action |
| product-markers | OK | MEDIUM | Route config has invoice navigation action |
| product-markers | OK | MEDIUM | Loader uses interventions module |
| product-markers | OK | MEDIUM | Loader uses invoices module |
| product-markers | OK | MEDIUM | Loader fills interventions section |
| product-markers | OK | MEDIUM | Loader fills invoices section |
| product-markers | OK | MEDIUM | Hub page synchronizes selection with URL |
| product-markers | OK | MEDIUM | Hub uses wider layout |
| product-markers | OK | MEDIUM | Route config exposes vehicle navigation label |
| product-markers | OK | MEDIUM | Selected details has contextual title |
| product-markers | OK | MEDIUM | Selected details renders actions from metadata |
| manual-review | INFO | LOW | Open /clientsauto/hub |
| manual-review | INFO | LOW | Verify client header shows real client identity |
| manual-review | INFO | LOW | Verify vehicle cards/table are readable |
| manual-review | INFO | LOW | Click a vehicle and verify selectedVehicleId changes in URL |
| manual-review | INFO | LOW | Verify interventions and factures update for selected vehicle |
| manual-review | INFO | LOW | Verify buttons: Fiche véhicule, Fiche intervention, Facture complète |
| manual-review | INFO | LOW | Verify layout is comfortable on wide screen and not overloaded |
| cleanup | OK | HIGH | No Q2-OG backup detected |

## Décision

Q2-OG est prêt pour revue visuelle manuelle. Si la checklist est OK, le Client Operational Hub est démontrable.