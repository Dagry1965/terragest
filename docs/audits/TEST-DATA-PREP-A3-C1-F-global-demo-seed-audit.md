# TEST-DATA-PREP-A3-C1-F â€” Global demo seed audit

## Summary

- OK: 159
- FAIL: 0

## Collection counts

- fournisseursauto: 3
- produitsauto: 26
- stocksauto: 23
- clientsauto: 20
- vehicules: 20
- commandesstockauto: 3
- lignescommandestockauto: 10
- receptionsstockauto: 8
- mouvementsstockauto: 16
- rendezvous: 7
- interventionsauto: 5
- lignesinterventionauto: 12
- facturesauto: 0
- encaissementsauto: 0
- rappelsauto: 0

### Rendez-vous by statut

- annule: 1
- planifie: 1
- en_cours: 1
- confirme: 1
- termine: 3

### Interventions by statut

- en_cours: 1
- ouverte: 1
- terminee: 3

### Lignes intervention by statut

- validee: 12

### Mouvements stock by type

- entree: 8
- sortie: 8

## Checks

- OK â€” fournisseursauto count â€” expected=3, actual=3
- OK â€” produitsauto count â€” expected=26, actual=26
- OK â€” stocksauto count â€” expected=23, actual=23
- OK â€” clientsauto count â€” expected=20, actual=20
- OK â€” vehicules count â€” expected=20, actual=20
- OK â€” commandesstockauto count â€” expected=3, actual=3
- OK â€” lignescommandestockauto count â€” expected=10, actual=10
- OK â€” receptionsstockauto count â€” expected=8, actual=8
- OK â€” rendezvous count â€” expected=7, actual=7
- OK â€” interventionsauto count â€” expected=5, actual=5
- OK â€” lignesinterventionauto count â€” expected=12, actual=12
- OK â€” facturesauto count â€” expected=0, actual=0
- OK â€” encaissementsauto count â€” expected=0, actual=0
- OK â€” rappelsauto count â€” expected=0, actual=0
- OK â€” vehicule demo-vehicle-new-001 has valid clientId â€” demo-client-new-001
- OK â€” vehicule demo-vehicle-new-002 has valid clientId â€” demo-client-new-002
- OK â€” vehicule demo-vehicle-new-003 has valid clientId â€” demo-client-new-003
- OK â€” vehicule demo-vehicle-new-004 has valid clientId â€” demo-client-new-004
- OK â€” vehicule demo-vehicle-new-005 has valid clientId â€” demo-client-new-005
- OK â€” vehicule demo-vehicle-new-006 has valid clientId â€” demo-client-new-006
- OK â€” vehicule demo-vehicle-new-007 has valid clientId â€” demo-client-new-007
- OK â€” vehicule demo-vehicle-new-008 has valid clientId â€” demo-client-new-008
- OK â€” vehicule demo-vehicle-new-009 has valid clientId â€” demo-client-new-009
- OK â€” vehicule demo-vehicle-new-010 has valid clientId â€” demo-client-new-010
- OK â€” vehicule demo-vehicle-old-001 has valid clientId â€” demo-client-old-001
- OK â€” vehicule demo-vehicle-old-002 has valid clientId â€” demo-client-old-002
- OK â€” vehicule demo-vehicle-old-003 has valid clientId â€” demo-client-old-003
- OK â€” vehicule demo-vehicle-old-004 has valid clientId â€” demo-client-old-004
- OK â€” vehicule demo-vehicle-old-005 has valid clientId â€” demo-client-old-005
- OK â€” vehicule demo-vehicle-old-006 has valid clientId â€” demo-client-old-006
- OK â€” vehicule demo-vehicle-old-007 has valid clientId â€” demo-client-old-007
- OK â€” vehicule demo-vehicle-old-008 has valid clientId â€” demo-client-old-008
- OK â€” vehicule demo-vehicle-old-009 has valid clientId â€” demo-client-old-009
- OK â€” vehicule demo-vehicle-old-010 has valid clientId â€” demo-client-old-010
- OK â€” rdv demo-rdv-cancel-001 has valid clientId â€” demo-client-new-008
- OK â€” rdv demo-rdv-cancel-001 has valid vehiculeId â€” demo-vehicle-new-008
- OK â€” rdv demo-rdv-future-001 has valid clientId â€” demo-client-new-007
- OK â€” rdv demo-rdv-future-001 has valid vehiculeId â€” demo-vehicle-new-007
- OK â€” rdv demo-rdv-new-001 has valid clientId â€” demo-client-new-002
- OK â€” rdv demo-rdv-new-001 has valid vehiculeId â€” demo-vehicle-new-002
- OK â€” rdv demo-rdv-new-002 has valid clientId â€” demo-client-new-005
- OK â€” rdv demo-rdv-new-002 has valid vehiculeId â€” demo-vehicle-new-005
- OK â€” rdv demo-rdv-old-001 has valid clientId â€” demo-client-old-001
- OK â€” rdv demo-rdv-old-001 has valid vehiculeId â€” demo-vehicle-old-001
- OK â€” rdv demo-rdv-old-002 has valid clientId â€” demo-client-old-002
- OK â€” rdv demo-rdv-old-002 has valid vehiculeId â€” demo-vehicle-old-002
- OK â€” rdv demo-rdv-old-003 has valid clientId â€” demo-client-old-003
- OK â€” rdv demo-rdv-old-003 has valid vehiculeId â€” demo-vehicle-old-003
- OK â€” intervention demo-intervention-new-001 has valid clientId â€” demo-client-new-002
- OK â€” intervention demo-intervention-new-001 has valid vehiculeId â€” demo-vehicle-new-002
- OK â€” intervention demo-intervention-new-001 has valid rendezVousId â€” demo-rdv-new-001
- OK â€” intervention demo-intervention-new-002 has valid clientId â€” demo-client-new-005
- OK â€” intervention demo-intervention-new-002 has valid vehiculeId â€” demo-vehicle-new-005
- OK â€” intervention demo-intervention-new-002 has valid rendezVousId â€” demo-rdv-new-002
- OK â€” intervention demo-intervention-old-001 has valid clientId â€” demo-client-old-001
- OK â€” intervention demo-intervention-old-001 has valid vehiculeId â€” demo-vehicle-old-001
- OK â€” intervention demo-intervention-old-001 has valid rendezVousId â€” demo-rdv-old-001
- OK â€” intervention demo-intervention-old-002 has valid clientId â€” demo-client-old-002
- OK â€” intervention demo-intervention-old-002 has valid vehiculeId â€” demo-vehicle-old-002
- OK â€” intervention demo-intervention-old-002 has valid rendezVousId â€” demo-rdv-old-002
- OK â€” intervention demo-intervention-old-003 has valid clientId â€” demo-client-old-003
- OK â€” intervention demo-intervention-old-003 has valid vehiculeId â€” demo-vehicle-old-003
- OK â€” intervention demo-intervention-old-003 has valid rendezVousId â€” demo-rdv-old-003
- OK â€” line demo-intervention-new-001-line-001 has valid interventionId â€” demo-intervention-new-001
- OK â€” line demo-intervention-new-001-line-001 has valid produitId â€” demo-product-air-filter
- OK â€” line demo-intervention-new-001-line-001 has valid stockId â€” demo-stock-main-air-filter
- OK â€” line demo-intervention-new-001-line-002 has valid interventionId â€” demo-intervention-new-001
- OK â€” line demo-intervention-new-001-line-002 has valid produitId â€” demo-service-labor
- OK â€” line demo-intervention-old-001-line-001 has valid interventionId â€” demo-intervention-old-001
- OK â€” line demo-intervention-old-001-line-001 has valid produitId â€” demo-product-oil-5w30
- OK â€” line demo-intervention-old-001-line-001 has valid stockId â€” demo-stock-main-oil-5w30
- OK â€” line demo-intervention-old-001-line-002 has valid interventionId â€” demo-intervention-old-001
- OK â€” line demo-intervention-old-001-line-002 has valid produitId â€” demo-product-oil-filter
- OK â€” line demo-intervention-old-001-line-002 has valid stockId â€” demo-stock-main-oil-filter
- OK â€” line demo-intervention-old-001-line-003 has valid interventionId â€” demo-intervention-old-001
- OK â€” line demo-intervention-old-001-line-003 has valid produitId â€” demo-product-drain-plug-seal
- OK â€” line demo-intervention-old-001-line-003 has valid stockId â€” demo-stock-main-drain-plug-seal
- OK â€” line demo-intervention-old-001-line-004 has valid interventionId â€” demo-intervention-old-001
- OK â€” line demo-intervention-old-001-line-004 has valid produitId â€” demo-service-oil-change
- OK â€” line demo-intervention-old-002-line-001 has valid interventionId â€” demo-intervention-old-002
- OK â€” line demo-intervention-old-002-line-001 has valid produitId â€” demo-product-front-brake-pads
- OK â€” line demo-intervention-old-002-line-001 has valid stockId â€” demo-stock-main-front-brake-pads
- OK â€” line demo-intervention-old-002-line-002 has valid interventionId â€” demo-intervention-old-002
- OK â€” line demo-intervention-old-002-line-002 has valid produitId â€” demo-product-brake-fluid-dot4
- OK â€” line demo-intervention-old-002-line-002 has valid stockId â€” demo-stock-main-brake-fluid-dot4
- OK â€” line demo-intervention-old-002-line-003 has valid interventionId â€” demo-intervention-old-002
- OK â€” line demo-intervention-old-002-line-003 has valid produitId â€” demo-product-brake-cleaner
- OK â€” line demo-intervention-old-002-line-003 has valid stockId â€” demo-stock-main-brake-cleaner
- OK â€” line demo-intervention-old-002-line-004 has valid interventionId â€” demo-intervention-old-002
- OK â€” line demo-intervention-old-002-line-004 has valid produitId â€” demo-service-labor
- OK â€” line demo-intervention-old-003-line-001 has valid interventionId â€” demo-intervention-old-003
- OK â€” line demo-intervention-old-003-line-001 has valid produitId â€” demo-service-diagnostic
- OK â€” line demo-intervention-old-003-line-002 has valid interventionId â€” demo-intervention-old-003
- OK â€” line demo-intervention-old-003-line-002 has valid produitId â€” demo-product-injector-cleaner
- OK â€” line demo-intervention-old-003-line-002 has valid stockId â€” demo-stock-main-injector-cleaner
- OK â€” order line demo-order-new-001-line-001 has valid commandeId â€” demo-order-new-001
- OK â€” order line demo-order-new-001-line-001 has valid produitId â€” demo-product-front-brake-pads
- OK â€” order line demo-order-new-001-line-001 has valid stockId â€” demo-stock-main-front-brake-pads
- OK â€” order line demo-order-new-001-line-002 has valid commandeId â€” demo-order-new-001
- OK â€” order line demo-order-new-001-line-002 has valid produitId â€” demo-product-rear-brake-pads
- OK â€” order line demo-order-new-001-line-002 has valid stockId â€” demo-stock-main-rear-brake-pads
- OK â€” order line demo-order-new-001-line-003 has valid commandeId â€” demo-order-new-001
- OK â€” order line demo-order-new-001-line-003 has valid produitId â€” demo-product-front-brake-discs
- OK â€” order line demo-order-new-001-line-003 has valid stockId â€” demo-stock-main-front-brake-discs
- OK â€” order line demo-order-old-001-line-001 has valid commandeId â€” demo-order-old-001
- OK â€” order line demo-order-old-001-line-001 has valid produitId â€” demo-product-oil-5w30
- OK â€” order line demo-order-old-001-line-001 has valid stockId â€” demo-stock-main-oil-5w30
- OK â€” order line demo-order-old-001-line-002 has valid commandeId â€” demo-order-old-001
- OK â€” order line demo-order-old-001-line-002 has valid produitId â€” demo-product-oil-10w40
- OK â€” order line demo-order-old-001-line-002 has valid stockId â€” demo-stock-main-oil-10w40
- OK â€” order line demo-order-old-001-line-003 has valid commandeId â€” demo-order-old-001
- OK â€” order line demo-order-old-001-line-003 has valid produitId â€” demo-product-oil-filter
- OK â€” order line demo-order-old-001-line-003 has valid stockId â€” demo-stock-main-oil-filter
- OK â€” order line demo-order-old-001-line-004 has valid commandeId â€” demo-order-old-001
- OK â€” order line demo-order-old-001-line-004 has valid produitId â€” demo-product-drain-plug-seal
- OK â€” order line demo-order-old-001-line-004 has valid stockId â€” demo-stock-main-drain-plug-seal
- OK â€” order line demo-order-old-001-line-005 has valid commandeId â€” demo-order-old-001
- OK â€” order line demo-order-old-001-line-005 has valid produitId â€” demo-product-brake-fluid-dot4
- OK â€” order line demo-order-old-001-line-005 has valid stockId â€” demo-stock-main-brake-fluid-dot4
- OK â€” order line demo-order-open-001-line-001 has valid commandeId â€” demo-order-open-001
- OK â€” order line demo-order-open-001-line-001 has valid produitId â€” demo-product-battery-45ah
- OK â€” order line demo-order-open-001-line-001 has valid stockId â€” demo-stock-main-battery-45ah
- OK â€” order line demo-order-open-001-line-002 has valid commandeId â€” demo-order-open-001
- OK â€” order line demo-order-open-001-line-002 has valid produitId â€” demo-product-battery-60ah
- OK â€” order line demo-order-open-001-line-002 has valid stockId â€” demo-stock-main-battery-60ah
- OK â€” reception demo-reception-new-001-line-001 has valid commandeId â€” demo-order-new-001
- OK â€” reception demo-reception-new-001-line-001 has valid ligneCommandeId â€” demo-order-new-001-line-001
- OK â€” reception demo-reception-new-001-line-001 has valid produitId â€” demo-product-front-brake-pads
- OK â€” reception demo-reception-new-001-line-001 has valid stockId â€” demo-stock-main-front-brake-pads
- OK â€” reception demo-reception-new-001-line-002 has valid commandeId â€” demo-order-new-001
- OK â€” reception demo-reception-new-001-line-002 has valid ligneCommandeId â€” demo-order-new-001-line-002
- OK â€” reception demo-reception-new-001-line-002 has valid produitId â€” demo-product-rear-brake-pads
- OK â€” reception demo-reception-new-001-line-002 has valid stockId â€” demo-stock-main-rear-brake-pads
- OK â€” reception demo-reception-new-001-line-003 has valid commandeId â€” demo-order-new-001
- OK â€” reception demo-reception-new-001-line-003 has valid ligneCommandeId â€” demo-order-new-001-line-003
- OK â€” reception demo-reception-new-001-line-003 has valid produitId â€” demo-product-front-brake-discs
- OK â€” reception demo-reception-new-001-line-003 has valid stockId â€” demo-stock-main-front-brake-discs
- OK â€” reception demo-reception-old-001-line-001 has valid commandeId â€” demo-order-old-001
- OK â€” reception demo-reception-old-001-line-001 has valid ligneCommandeId â€” demo-order-old-001-line-001
- OK â€” reception demo-reception-old-001-line-001 has valid produitId â€” demo-product-oil-5w30
- OK â€” reception demo-reception-old-001-line-001 has valid stockId â€” demo-stock-main-oil-5w30
- OK â€” reception demo-reception-old-001-line-002 has valid commandeId â€” demo-order-old-001
- OK â€” reception demo-reception-old-001-line-002 has valid ligneCommandeId â€” demo-order-old-001-line-002
- OK â€” reception demo-reception-old-001-line-002 has valid produitId â€” demo-product-oil-10w40
- OK â€” reception demo-reception-old-001-line-002 has valid stockId â€” demo-stock-main-oil-10w40
- OK â€” reception demo-reception-old-001-line-003 has valid commandeId â€” demo-order-old-001
- OK â€” reception demo-reception-old-001-line-003 has valid ligneCommandeId â€” demo-order-old-001-line-003
- OK â€” reception demo-reception-old-001-line-003 has valid produitId â€” demo-product-oil-filter
- OK â€” reception demo-reception-old-001-line-003 has valid stockId â€” demo-stock-main-oil-filter
- OK â€” reception demo-reception-old-001-line-004 has valid commandeId â€” demo-order-old-001
- OK â€” reception demo-reception-old-001-line-004 has valid ligneCommandeId â€” demo-order-old-001-line-004
- OK â€” reception demo-reception-old-001-line-004 has valid produitId â€” demo-product-drain-plug-seal
- OK â€” reception demo-reception-old-001-line-004 has valid stockId â€” demo-stock-main-drain-plug-seal
- OK â€” reception demo-reception-old-001-line-005 has valid commandeId â€” demo-order-old-001
- OK â€” reception demo-reception-old-001-line-005 has valid ligneCommandeId â€” demo-order-old-001-line-005
- OK â€” reception demo-reception-old-001-line-005 has valid produitId â€” demo-product-brake-fluid-dot4
- OK â€” reception demo-reception-old-001-line-005 has valid stockId â€” demo-stock-main-brake-fluid-dot4
- OK â€” stock entries count â€” expected=8, actual=8
- OK â€” stock sorties exist â€” actual=8