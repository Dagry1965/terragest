# AMARKHYS-HUB-CLIENT-RELANCE-MODAL-A

## Objectif

Créer une modale de relance AMARKHYS et brancher les actions Relancer client / Relancer facture dessus.

## Résultat attendu

- Relancer le client ouvre une modale.
- Relancer cette facture ouvre une modale.
- La modale affiche client, téléphone, véhicule, montant et message proposé.
- Canaux disponibles : WhatsApp, SMS, Appel, Email, Copier message.
- Les actions restent alimentées par RuntimeHubActionContextAdapter.

## Checks

- OK — component changed
- OK — modal state added
- OK — modal context added
- OK — relance actions intercepted
- OK — modal rendered
- OK — whatsapp action added
- OK — sms action added
- OK — appel action added
- OK — email action added
- OK — copy action added
- OK — runtime adapter preserved
- OK — premium panel preserved
