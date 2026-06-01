# AMARKHYS-HUB-RETURN-TO-CONTEXT

## Objectif

Faire en sorte que les liens ouverts depuis la fiche client opérationnelle transportent le contexte de départ.

## Contexte transporté

- clientId
- selectedVehicleId
- selectedRendezvousId
- selectedInterventionId
- selectedFactureId
- returnTo

## Liens concernés

- RDV détail
- RDV modification
- Fiche véhicule
- Fiche intervention
- Facture complète
- Historique encaissements
- Actions client via RuntimeHubActionContextAdapter

## Note

Cette passe prépare le retour au point de départ. Les pages de destination devront ensuite lire returnTo pour afficher un bouton Retour fiche opérationnelle.

## Checks

- OK — component changed
- OK — withReturnTo helper added
- OK — hubReturnTo strengthened
- OK — rdv open link patched
- OK — rdv edit link patched
- OK — adapter returnTo preserved
- OK — vehicle href contextual
- OK — intervention href contextual
- OK — invoice href contextual
- OK — payment href contextual
