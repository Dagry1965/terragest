# Q21E — Runtime Relationship Process Map

Mode: REPORT ONLY. Cet audit ne modifie aucun fichier runtime.

## Synthèse

- Modules scannés: 20
- Modules avec enfants: 7
- Modules avec contexte parent: 3
- Modules avec labelFields: 12
- Modules avec relation.filterBy: 3
- Modules avec relation.excludeUsedBy: 0
- Modules avec relation.autoFill: 1
- Modules avec computedFields: 1

## Familles de processus ERP

### intervention-rdv-facture

- Modules trouvés: lignesinterventionauto, interventionsauto, facturesauto, encaissementsauto, rendezvous, echeancespaiementauto
- Modules manquants: aucun

#### lignesinterventionauto

- Fichier: `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts`
- Score relationnel: 6/10
- Parent context: oui
- Children: oui (1)
- labelFields: oui
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `lignesinterventionauto` → `interventionsauto`
- `produitId` → `produitsauto`
- `stockId` → `stocksauto`
- `produitCode` → `mouvementsstockauto`

Enfants déclarés:

- `lignesinterventionauto` → `interventionsauto` via `interventionId` (labelFields)

#### interventionsauto

- Fichier: `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts`
- Score relationnel: 5/10
- Parent context: non
- Children: oui (1)
- labelFields: oui
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `interventionsauto` → `clientsauto`
- `vehiculeId` → `vehicules`
- `rendezVousId` → `rendezvous`

Enfants déclarés:

- `interventionsauto` → `clientsauto` via `interventionId` (labelFields, subtitleFields, relations)

#### facturesauto

- Fichier: `src/runtime/modules/generated/facturesauto/facturesauto.module.ts`
- Score relationnel: 4/10
- Parent context: non
- Children: non (0)
- labelFields: oui
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `facturesauto` → `clientsauto`
- `vehiculeId` → `vehicules`
- `interventionId` → `interventionsauto`

#### encaissementsauto

- Fichier: `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts`
- Score relationnel: 3/10
- Parent context: non
- Children: non (0)
- labelFields: oui
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `encaissementsauto` → `facturesauto`
- `clientId` → `clientsauto`
- `vehiculeId` → `vehicules`

#### rendezvous

- Fichier: `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`
- Score relationnel: 3/10
- Parent context: non
- Children: non (0)
- labelFields: non
- relation.filterBy: oui
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `rendezvous` → `clientsauto`
- `vehiculeId` → `vehicules` (filterBy)
- `dateRendezVous` → `interventionsauto`

#### echeancespaiementauto

- Fichier: `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts`
- Score relationnel: 2/10
- Parent context: non
- Children: non (0)
- labelFields: non
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `echeancespaiementauto` → `facturesauto`
- `clientId` → `clientsauto`
- `vehiculeId` → `vehicules`

### stock-fournisseur-reception

- Modules trouvés: lignescommandestockauto, receptionsstockauto, commandesstockauto, mouvementsstockauto, stocksauto, fournisseursauto, produitsauto
- Modules manquants: aucun

#### lignescommandestockauto

- Fichier: `src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts`
- Score relationnel: 9/10
- Parent context: oui
- Children: oui (2)
- labelFields: oui
- relation.filterBy: oui
- relation.excludeUsedBy: non
- relation.autoFill: oui
- computedFields: oui

Relations:

- `lignescommandestockauto` → `commandesstockauto`
- `produitId` → `produitsauto` (autoFill)
- `stockId` → `stocksauto` (filterBy)

Enfants déclarés:

- `lignescommandestockauto` → `commandesstockauto` via `commandeId`
- `receptions-ligne-commande` → `receptionsstockauto` via `ligneCommandeId` (labelFields, subtitleFields, relations)

#### receptionsstockauto

- Fichier: `src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts`
- Score relationnel: 7/10
- Parent context: oui
- Children: oui (2)
- labelFields: oui
- relation.filterBy: oui
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `receptionsstockauto` → `commandesstockauto`
- `ligneCommandeId` → `lignescommandestockauto` (filterBy)
- `produitId` → `produitsauto`
- `stockId` → `stocksauto` (filterBy)
- `quantiteRecue` → `mouvementsstockauto`

Enfants déclarés:

- `receptionsstockauto` → `commandesstockauto` via `commandeId`
- `mouvements-stock-reception` → `mouvementsstockauto` via `sourceId` (labelFields, subtitleFields, relations)

#### commandesstockauto

- Fichier: `src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts`
- Score relationnel: 4/10
- Parent context: non
- Children: oui (2)
- labelFields: oui
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `commandesstockauto` → `fournisseursauto`

Enfants déclarés:

- `commandesstockauto` → `lignescommandestockauto` via `commandeId` (labelFields, subtitleFields, relations)
- `receptions-stock` → `receptionsstockauto` via `commandeId` (labelFields, subtitleFields, relations)

#### mouvementsstockauto

- Fichier: `src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts`
- Score relationnel: 3/10
- Parent context: non
- Children: non (0)
- labelFields: oui
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `mouvementsstockauto` → `stocksauto`
- `produitId` → `produitsauto`
- `quantite` → `interventionsauto`
- `ligneInterventionId` → `lignesinterventionauto`

#### stocksauto

- Fichier: `src/runtime/modules/generated/stocksauto/stocksauto.module.ts`
- Score relationnel: 3/10
- Parent context: non
- Children: non (0)
- labelFields: oui
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `stocksauto` → `produitsauto`

#### fournisseursauto

- Fichier: `src/runtime/modules/generated/fournisseursauto/fournisseursauto.module.ts`
- Score relationnel: 2/10
- Parent context: non
- Children: non (0)
- labelFields: oui
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

#### produitsauto

- Fichier: `src/runtime/modules/generated/produitsauto/produitsauto.module.ts`
- Score relationnel: 2/10
- Parent context: non
- Children: non (0)
- labelFields: non
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `produitsauto` → `produitsauto`

### client-vehicule

- Modules trouvés: vehicules, clientsauto
- Modules manquants: vehiculesauto

#### vehicules

- Fichier: `src/runtime/modules/generated/vehicules/vehicules.module.ts`
- Score relationnel: 5/10
- Parent context: non
- Children: oui (2)
- labelFields: oui
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `vehicules` → `clientsauto`

Enfants déclarés:

- `vehicules` → `clientsauto` via `vehiculeId` (labelFields, relations, prefillFromParent)
- `interventions` → `interventionsauto` via `vehiculeId` (prefillFromParent)

#### clientsauto

- Fichier: `src/runtime/modules/generated/clientsauto/clientsauto.module.ts`
- Score relationnel: 3/10
- Parent context: non
- Children: oui (1)
- labelFields: oui
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Enfants déclarés:

- `clientsauto` → `vehicules` via `clientId` (labelFields, subtitleFields)

### paiement-recouvrement

- Modules trouvés: facturesauto, encaissementsauto, echeancespaiementauto
- Modules manquants: aucun

#### facturesauto

- Fichier: `src/runtime/modules/generated/facturesauto/facturesauto.module.ts`
- Score relationnel: 4/10
- Parent context: non
- Children: non (0)
- labelFields: oui
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `facturesauto` → `clientsauto`
- `vehiculeId` → `vehicules`
- `interventionId` → `interventionsauto`

#### encaissementsauto

- Fichier: `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts`
- Score relationnel: 3/10
- Parent context: non
- Children: non (0)
- labelFields: oui
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `encaissementsauto` → `facturesauto`
- `clientId` → `clientsauto`
- `vehiculeId` → `vehicules`

#### echeancespaiementauto

- Fichier: `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts`
- Score relationnel: 2/10
- Parent context: non
- Children: non (0)
- labelFields: non
- relation.filterBy: non
- relation.excludeUsedBy: non
- relation.autoFill: non
- computedFields: non

Relations:

- `echeancespaiementauto` → `facturesauto`
- `clientId` → `clientsauto`
- `vehiculeId` → `vehicules`

## Modules triés par maturité relationnelle

- 9/10 — `lignescommandestockauto` — src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts
- 7/10 — `receptionsstockauto` — src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts
- 6/10 — `lignesinterventionauto` — src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts
- 5/10 — `interventionsauto` — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts
- 5/10 — `vehicules` — src/runtime/modules/generated/vehicules/vehicules.module.ts
- 4/10 — `commandesstockauto` — src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts
- 4/10 — `facturesauto` — src/runtime/modules/generated/facturesauto/facturesauto.module.ts
- 3/10 — `clientsauto` — src/runtime/modules/generated/clientsauto/clientsauto.module.ts
- 3/10 — `encaissementsauto` — src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts
- 3/10 — `mouvementsstockauto` — src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts
- 3/10 — `rendezvous` — src/runtime/modules/generated/rendezvous/rendezvous.module.ts
- 3/10 — `stocksauto` — src/runtime/modules/generated/stocksauto/stocksauto.module.ts
- 2/10 — `echeancespaiementauto` — src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts
- 2/10 — `fournisseursauto` — src/runtime/modules/generated/fournisseursauto/fournisseursauto.module.ts
- 2/10 — `produitsauto` — src/runtime/modules/generated/produitsauto/produitsauto.module.ts
- 2/10 — `rappelsauto` — src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts
- 1/10 — `budgets` — src/runtime/modules/generated/budgets/budgets.module.ts
- 1/10 — `campagnes` — src/runtime/modules/generated/campagnes/campagnes.module.ts
- 1/10 — `contrats` — src/runtime/modules/generated/contrats/contrats.module.ts
- 1/10 — `facturations` — src/runtime/modules/generated/facturations/facturations.module.ts