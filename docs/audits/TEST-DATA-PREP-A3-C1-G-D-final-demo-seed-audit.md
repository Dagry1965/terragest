# TEST-DATA-PREP-A3-C1-G-D — Final demo seed audit

## Summary

- OK: 205
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
- facturesauto: 5
- encaissementsauto: 4
- rappelsauto: 3

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

### Factures by statutPaiement

- partiel: 2
- en_attente: 1
- paye: 2

### Encaissements by statut

- valide: 4

### Rappels by statut

- planifie: 2
- envoye: 1

### Mouvements stock by type

- entree: 8
- sortie: 8

## Checks

- OK — fournisseursauto count — expected=3, actual=3
- OK — produitsauto count — expected=26, actual=26
- OK — stocksauto count — expected=23, actual=23
- OK — clientsauto count — expected=20, actual=20
- OK — vehicules count — expected=20, actual=20
- OK — commandesstockauto count — expected=3, actual=3
- OK — lignescommandestockauto count — expected=10, actual=10
- OK — receptionsstockauto count — expected=8, actual=8
- OK — mouvementsstockauto count — expected=16, actual=16
- OK — rendezvous count — expected=7, actual=7
- OK — interventionsauto count — expected=5, actual=5
- OK — lignesinterventionauto count — expected=12, actual=12
- OK — facturesauto count — expected=5, actual=5
- OK — encaissementsauto count — expected=4, actual=4
- OK — rappelsauto count — expected=3, actual=3
- OK — vehicule demo-vehicle-new-001 clientId — demo-client-new-001
- OK — vehicule demo-vehicle-new-002 clientId — demo-client-new-002
- OK — vehicule demo-vehicle-new-003 clientId — demo-client-new-003
- OK — vehicule demo-vehicle-new-004 clientId — demo-client-new-004
- OK — vehicule demo-vehicle-new-005 clientId — demo-client-new-005
- OK — vehicule demo-vehicle-new-006 clientId — demo-client-new-006
- OK — vehicule demo-vehicle-new-007 clientId — demo-client-new-007
- OK — vehicule demo-vehicle-new-008 clientId — demo-client-new-008
- OK — vehicule demo-vehicle-new-009 clientId — demo-client-new-009
- OK — vehicule demo-vehicle-new-010 clientId — demo-client-new-010
- OK — vehicule demo-vehicle-old-001 clientId — demo-client-old-001
- OK — vehicule demo-vehicle-old-002 clientId — demo-client-old-002
- OK — vehicule demo-vehicle-old-003 clientId — demo-client-old-003
- OK — vehicule demo-vehicle-old-004 clientId — demo-client-old-004
- OK — vehicule demo-vehicle-old-005 clientId — demo-client-old-005
- OK — vehicule demo-vehicle-old-006 clientId — demo-client-old-006
- OK — vehicule demo-vehicle-old-007 clientId — demo-client-old-007
- OK — vehicule demo-vehicle-old-008 clientId — demo-client-old-008
- OK — vehicule demo-vehicle-old-009 clientId — demo-client-old-009
- OK — vehicule demo-vehicle-old-010 clientId — demo-client-old-010
- OK — rdv demo-rdv-cancel-001 clientId — demo-client-new-008
- OK — rdv demo-rdv-cancel-001 vehiculeId — demo-vehicle-new-008
- OK — rdv demo-rdv-future-001 clientId — demo-client-new-007
- OK — rdv demo-rdv-future-001 vehiculeId — demo-vehicle-new-007
- OK — rdv demo-rdv-new-001 clientId — demo-client-new-002
- OK — rdv demo-rdv-new-001 vehiculeId — demo-vehicle-new-002
- OK — rdv demo-rdv-new-002 clientId — demo-client-new-005
- OK — rdv demo-rdv-new-002 vehiculeId — demo-vehicle-new-005
- OK — rdv demo-rdv-old-001 clientId — demo-client-old-001
- OK — rdv demo-rdv-old-001 vehiculeId — demo-vehicle-old-001
- OK — rdv demo-rdv-old-002 clientId — demo-client-old-002
- OK — rdv demo-rdv-old-002 vehiculeId — demo-vehicle-old-002
- OK — rdv demo-rdv-old-003 clientId — demo-client-old-003
- OK — rdv demo-rdv-old-003 vehiculeId — demo-vehicle-old-003
- OK — intervention demo-intervention-new-001 clientId — demo-client-new-002
- OK — intervention demo-intervention-new-001 vehiculeId — demo-vehicle-new-002
- OK — intervention demo-intervention-new-001 rendezVousId — demo-rdv-new-001
- OK — intervention demo-intervention-new-002 clientId — demo-client-new-005
- OK — intervention demo-intervention-new-002 vehiculeId — demo-vehicle-new-005
- OK — intervention demo-intervention-new-002 rendezVousId — demo-rdv-new-002
- OK — intervention demo-intervention-old-001 clientId — demo-client-old-001
- OK — intervention demo-intervention-old-001 vehiculeId — demo-vehicle-old-001
- OK — intervention demo-intervention-old-001 rendezVousId — demo-rdv-old-001
- OK — intervention demo-intervention-old-002 clientId — demo-client-old-002
- OK — intervention demo-intervention-old-002 vehiculeId — demo-vehicle-old-002
- OK — intervention demo-intervention-old-002 rendezVousId — demo-rdv-old-002
- OK — intervention demo-intervention-old-003 clientId — demo-client-old-003
- OK — intervention demo-intervention-old-003 vehiculeId — demo-vehicle-old-003
- OK — intervention demo-intervention-old-003 rendezVousId — demo-rdv-old-003
- OK — line demo-intervention-new-001-line-001 interventionId — demo-intervention-new-001
- OK — line demo-intervention-new-001-line-001 produitId — demo-product-air-filter
- OK — line demo-intervention-new-001-line-001 stockId — demo-stock-main-air-filter
- OK — line demo-intervention-new-001-line-002 interventionId — demo-intervention-new-001
- OK — line demo-intervention-new-001-line-002 produitId — demo-service-labor
- OK — line demo-intervention-old-001-line-001 interventionId — demo-intervention-old-001
- OK — line demo-intervention-old-001-line-001 produitId — demo-product-oil-5w30
- OK — line demo-intervention-old-001-line-001 stockId — demo-stock-main-oil-5w30
- OK — line demo-intervention-old-001-line-002 interventionId — demo-intervention-old-001
- OK — line demo-intervention-old-001-line-002 produitId — demo-product-oil-filter
- OK — line demo-intervention-old-001-line-002 stockId — demo-stock-main-oil-filter
- OK — line demo-intervention-old-001-line-003 interventionId — demo-intervention-old-001
- OK — line demo-intervention-old-001-line-003 produitId — demo-product-drain-plug-seal
- OK — line demo-intervention-old-001-line-003 stockId — demo-stock-main-drain-plug-seal
- OK — line demo-intervention-old-001-line-004 interventionId — demo-intervention-old-001
- OK — line demo-intervention-old-001-line-004 produitId — demo-service-oil-change
- OK — line demo-intervention-old-002-line-001 interventionId — demo-intervention-old-002
- OK — line demo-intervention-old-002-line-001 produitId — demo-product-front-brake-pads
- OK — line demo-intervention-old-002-line-001 stockId — demo-stock-main-front-brake-pads
- OK — line demo-intervention-old-002-line-002 interventionId — demo-intervention-old-002
- OK — line demo-intervention-old-002-line-002 produitId — demo-product-brake-fluid-dot4
- OK — line demo-intervention-old-002-line-002 stockId — demo-stock-main-brake-fluid-dot4
- OK — line demo-intervention-old-002-line-003 interventionId — demo-intervention-old-002
- OK — line demo-intervention-old-002-line-003 produitId — demo-product-brake-cleaner
- OK — line demo-intervention-old-002-line-003 stockId — demo-stock-main-brake-cleaner
- OK — line demo-intervention-old-002-line-004 interventionId — demo-intervention-old-002
- OK — line demo-intervention-old-002-line-004 produitId — demo-service-labor
- OK — line demo-intervention-old-003-line-001 interventionId — demo-intervention-old-003
- OK — line demo-intervention-old-003-line-001 produitId — demo-service-diagnostic
- OK — line demo-intervention-old-003-line-002 interventionId — demo-intervention-old-003
- OK — line demo-intervention-old-003-line-002 produitId — demo-product-injector-cleaner
- OK — line demo-intervention-old-003-line-002 stockId — demo-stock-main-injector-cleaner
- OK — order line demo-order-new-001-line-001 commandeId — demo-order-new-001
- OK — order line demo-order-new-001-line-001 produitId — demo-product-front-brake-pads
- OK — order line demo-order-new-001-line-001 stockId — demo-stock-main-front-brake-pads
- OK — order line demo-order-new-001-line-002 commandeId — demo-order-new-001
- OK — order line demo-order-new-001-line-002 produitId — demo-product-rear-brake-pads
- OK — order line demo-order-new-001-line-002 stockId — demo-stock-main-rear-brake-pads
- OK — order line demo-order-new-001-line-003 commandeId — demo-order-new-001
- OK — order line demo-order-new-001-line-003 produitId — demo-product-front-brake-discs
- OK — order line demo-order-new-001-line-003 stockId — demo-stock-main-front-brake-discs
- OK — order line demo-order-old-001-line-001 commandeId — demo-order-old-001
- OK — order line demo-order-old-001-line-001 produitId — demo-product-oil-5w30
- OK — order line demo-order-old-001-line-001 stockId — demo-stock-main-oil-5w30
- OK — order line demo-order-old-001-line-002 commandeId — demo-order-old-001
- OK — order line demo-order-old-001-line-002 produitId — demo-product-oil-10w40
- OK — order line demo-order-old-001-line-002 stockId — demo-stock-main-oil-10w40
- OK — order line demo-order-old-001-line-003 commandeId — demo-order-old-001
- OK — order line demo-order-old-001-line-003 produitId — demo-product-oil-filter
- OK — order line demo-order-old-001-line-003 stockId — demo-stock-main-oil-filter
- OK — order line demo-order-old-001-line-004 commandeId — demo-order-old-001
- OK — order line demo-order-old-001-line-004 produitId — demo-product-drain-plug-seal
- OK — order line demo-order-old-001-line-004 stockId — demo-stock-main-drain-plug-seal
- OK — order line demo-order-old-001-line-005 commandeId — demo-order-old-001
- OK — order line demo-order-old-001-line-005 produitId — demo-product-brake-fluid-dot4
- OK — order line demo-order-old-001-line-005 stockId — demo-stock-main-brake-fluid-dot4
- OK — order line demo-order-open-001-line-001 commandeId — demo-order-open-001
- OK — order line demo-order-open-001-line-001 produitId — demo-product-battery-45ah
- OK — order line demo-order-open-001-line-001 stockId — demo-stock-main-battery-45ah
- OK — order line demo-order-open-001-line-002 commandeId — demo-order-open-001
- OK — order line demo-order-open-001-line-002 produitId — demo-product-battery-60ah
- OK — order line demo-order-open-001-line-002 stockId — demo-stock-main-battery-60ah
- OK — reception demo-reception-new-001-line-001 commandeId — demo-order-new-001
- OK — reception demo-reception-new-001-line-001 ligneCommandeId — demo-order-new-001-line-001
- OK — reception demo-reception-new-001-line-001 produitId — demo-product-front-brake-pads
- OK — reception demo-reception-new-001-line-001 stockId — demo-stock-main-front-brake-pads
- OK — reception demo-reception-new-001-line-002 commandeId — demo-order-new-001
- OK — reception demo-reception-new-001-line-002 ligneCommandeId — demo-order-new-001-line-002
- OK — reception demo-reception-new-001-line-002 produitId — demo-product-rear-brake-pads
- OK — reception demo-reception-new-001-line-002 stockId — demo-stock-main-rear-brake-pads
- OK — reception demo-reception-new-001-line-003 commandeId — demo-order-new-001
- OK — reception demo-reception-new-001-line-003 ligneCommandeId — demo-order-new-001-line-003
- OK — reception demo-reception-new-001-line-003 produitId — demo-product-front-brake-discs
- OK — reception demo-reception-new-001-line-003 stockId — demo-stock-main-front-brake-discs
- OK — reception demo-reception-old-001-line-001 commandeId — demo-order-old-001
- OK — reception demo-reception-old-001-line-001 ligneCommandeId — demo-order-old-001-line-001
- OK — reception demo-reception-old-001-line-001 produitId — demo-product-oil-5w30
- OK — reception demo-reception-old-001-line-001 stockId — demo-stock-main-oil-5w30
- OK — reception demo-reception-old-001-line-002 commandeId — demo-order-old-001
- OK — reception demo-reception-old-001-line-002 ligneCommandeId — demo-order-old-001-line-002
- OK — reception demo-reception-old-001-line-002 produitId — demo-product-oil-10w40
- OK — reception demo-reception-old-001-line-002 stockId — demo-stock-main-oil-10w40
- OK — reception demo-reception-old-001-line-003 commandeId — demo-order-old-001
- OK — reception demo-reception-old-001-line-003 ligneCommandeId — demo-order-old-001-line-003
- OK — reception demo-reception-old-001-line-003 produitId — demo-product-oil-filter
- OK — reception demo-reception-old-001-line-003 stockId — demo-stock-main-oil-filter
- OK — reception demo-reception-old-001-line-004 commandeId — demo-order-old-001
- OK — reception demo-reception-old-001-line-004 ligneCommandeId — demo-order-old-001-line-004
- OK — reception demo-reception-old-001-line-004 produitId — demo-product-drain-plug-seal
- OK — reception demo-reception-old-001-line-004 stockId — demo-stock-main-drain-plug-seal
- OK — reception demo-reception-old-001-line-005 commandeId — demo-order-old-001
- OK — reception demo-reception-old-001-line-005 ligneCommandeId — demo-order-old-001-line-005
- OK — reception demo-reception-old-001-line-005 produitId — demo-product-brake-fluid-dot4
- OK — reception demo-reception-old-001-line-005 stockId — demo-stock-main-brake-fluid-dot4
- OK — facture demo-invoice-new-001 clientId — demo-client-new-002
- OK — facture demo-invoice-new-001 vehiculeId — demo-vehicle-new-002
- OK — facture demo-invoice-new-001 interventionId — demo-intervention-new-001
- OK — facture demo-invoice-new-001 payment balance — montantTTC=20650, montantPaye=10325, resteAPayer=10325
- OK — facture demo-invoice-new-002 clientId — demo-client-new-005
- OK — facture demo-invoice-new-002 vehiculeId — demo-vehicle-new-005
- OK — facture demo-invoice-new-002 interventionId — demo-intervention-new-002
- OK — facture demo-invoice-new-002 payment balance — montantTTC=0, montantPaye=0, resteAPayer=0
- OK — facture demo-invoice-old-001 clientId — demo-client-old-001
- OK — facture demo-invoice-old-001 vehiculeId — demo-vehicle-old-001
- OK — facture demo-invoice-old-001 interventionId — demo-intervention-old-001
- OK — facture demo-invoice-old-001 payment balance — montantTTC=37170, montantPaye=37170, resteAPayer=0
- OK — facture demo-invoice-old-002 clientId — demo-client-old-002
- OK — facture demo-invoice-old-002 vehiculeId — demo-vehicle-old-002
- OK — facture demo-invoice-old-002 interventionId — demo-intervention-old-002
- OK — facture demo-invoice-old-002 payment balance — montantTTC=56640, montantPaye=56640, resteAPayer=0
- OK — facture demo-invoice-old-003 clientId — demo-client-old-003
- OK — facture demo-invoice-old-003 vehiculeId — demo-vehicle-old-003
- OK — facture demo-invoice-old-003 interventionId — demo-intervention-old-003
- OK — facture demo-invoice-old-003 payment balance — montantTTC=23010, montantPaye=9204, resteAPayer=13806
- OK — encaissement demo-payment-new-001-a factureId — demo-invoice-new-001
- OK — encaissement demo-payment-new-001-a clientId — demo-client-new-002
- OK — encaissement demo-payment-new-001-a vehiculeId — demo-vehicle-new-002
- OK — encaissement demo-payment-new-001-a montant — 10325
- OK — encaissement demo-payment-old-001-a factureId — demo-invoice-old-001
- OK — encaissement demo-payment-old-001-a clientId — demo-client-old-001
- OK — encaissement demo-payment-old-001-a vehiculeId — demo-vehicle-old-001
- OK — encaissement demo-payment-old-001-a montant — 37170
- OK — encaissement demo-payment-old-002-a factureId — demo-invoice-old-002
- OK — encaissement demo-payment-old-002-a clientId — demo-client-old-002
- OK — encaissement demo-payment-old-002-a vehiculeId — demo-vehicle-old-002
- OK — encaissement demo-payment-old-002-a montant — 56640
- OK — encaissement demo-payment-old-003-a factureId — demo-invoice-old-003
- OK — encaissement demo-payment-old-003-a clientId — demo-client-old-003
- OK — encaissement demo-payment-old-003-a vehiculeId — demo-vehicle-old-003
- OK — encaissement demo-payment-old-003-a montant — 9204
- OK — rappel demo-reminder-new-001-a clientId — demo-client-new-002
- OK — rappel demo-reminder-new-001-a vehiculeId — demo-vehicle-new-002
- OK — rappel demo-reminder-new-001-a typeRappel — facture_impayee
- OK — rappel demo-reminder-new-002-a clientId — demo-client-new-005
- OK — rappel demo-reminder-new-002-a vehiculeId — demo-vehicle-new-005
- OK — rappel demo-reminder-new-002-a typeRappel — facture_impayee
- OK — rappel demo-reminder-old-003-a clientId — demo-client-old-003
- OK — rappel demo-reminder-old-003-a vehiculeId — demo-vehicle-old-003
- OK — rappel demo-reminder-old-003-a typeRappel — facture_impayee
- OK — stock entries count — expected=8, actual=8
- OK — stock sorties count — expected=8, actual=8