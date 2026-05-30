# Q2-HUB-CLIENT-FINAL-C1 — Checklist test visuel parcours complet fiche client

Objectif : valider visuellement le parcours opérationnel central après polish du hub client.

Base récente :

- `40aff876 style(hub): polish client operational flow`
- `e3eeb9f9 test(runtime): document runtime action governance audit`

## Route à tester

```text
http://localhost:3000/clientsauto/hub?id=<ID_CLIENT>
```

## Préconditions

- [ ] Le client de test possède au moins un véhicule.
- [ ] Le véhicule possède au moins un rendez-vous.
- [ ] Le rendez-vous possède au moins une intervention liée.
- [ ] L’intervention possède idéalement des lignes.
- [ ] Une facture et/ou un encaissement lié existe si disponible.

## Test visuel global

- [ ] Les KPI haut gauche sont plus grands et lisibles.
- [ ] Le bloc véhicule a moins de vide.
- [ ] La carte véhicule paraît clairement cliquable.
- [ ] Le message d’aide de sélection véhicule est visible.
- [ ] Le panneau droit `Dossier véhicule sélectionné` est visible.

## Parcours Client → Véhicule

- [ ] Cliquer sur une carte véhicule sélectionne le véhicule.
- [ ] Le véhicule sélectionné est mis en évidence.
- [ ] Le bloc `Véhicule sélectionné` affiche le bon véhicule.
- [ ] Le panneau droit se met à jour avec le même véhicule.

## Parcours Véhicule → RDV

- [ ] La liste `Rendez-vous du véhicule` apparaît après sélection véhicule.
- [ ] Les RDV affichés correspondent au véhicule sélectionné.
- [ ] Cliquer sur une ligne RDV sélectionne le RDV.
- [ ] Le bouton/état `Sélectionné` apparaît sur le RDV actif.

## Parcours RDV → Intervention

- [ ] Le bloc `Interventions du rendez-vous sélectionné` affiche le RDV actif.
- [ ] Les interventions affichées correspondent au RDV sélectionné.
- [ ] Cliquer sur une intervention la sélectionne.
- [ ] L’intervention sélectionnée est mise en évidence.

## Parcours Intervention → Lignes

- [ ] Les lignes d’intervention apparaissent après sélection intervention.
- [ ] Les lignes affichées correspondent à l’intervention sélectionnée.
- [ ] Les lignes retirées/invalides ne polluent pas la lecture si la logique existe déjà.

## Parcours Intervention → Facture

- [ ] La facture liée est visible si elle existe.
- [ ] La navigation rapide `Facture complète` pointe vers la facture pertinente.
- [ ] Les montants facture restent lisibles.

## Parcours Facture → Encaissements

- [ ] Les encaissements liés sont visibles si disponibles.
- [ ] La navigation rapide `Historique encaissements` pointe vers le contexte pertinent.
- [ ] Le panneau droit affiche des compteurs cohérents.

## Résultat à reporter

```text
KPI : OK / KO + remarque
Véhicule sélection : OK / KO + remarque
RDV filtrés/sélection : OK / KO + remarque
Interventions filtrées/sélection : OK / KO + remarque
Lignes intervention : OK / KO + remarque
Facture liée : OK / KO + remarque
Encaissements liés : OK / KO + remarque
Panneau droit : OK / KO + remarque
Navigation rapide : OK / KO + remarque
Console navigateur : OK / KO + remarque
```
