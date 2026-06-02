# AMARKHYS-HUB-SIDEBAR-CONTEXT-FIX

## Objectif

Stabiliser la sidebar AMARKHYS quand on navigue depuis la fiche client opérationnelle.

## Correction

- Centralisation des routes AMARKHYS dans AMARKHYS_ROUTE_PREFIXES.
- Ajout /lignesinterventionauto.
- Ajout /encaissementsauto.
- Ajout /echeancespaiementauto.
- Conservation des routes client, véhicule, RDV, intervention, facture, stock et commandes.

## Validation attendue

- La sidebar reste AMARKHYS sur les pages ouvertes depuis la fiche client opérationnelle.
- Véhicule, RDV, intervention, ligne, facture, encaissement restent dans le contexte AMARKHYS.

## Checks

- OK — prefixes added
- OK — clientsauto route
- OK — vehicules route
- OK — rendezvous route
- OK — interventionsauto route
- OK — lignesinterventionauto route
- OK — facturesauto route
- OK — encaissementsauto route
- OK — prefix detection
