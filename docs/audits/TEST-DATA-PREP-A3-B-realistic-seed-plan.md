\# TEST-DATA-PREP-A3-B — Plan précis du seed réaliste AMARKHYS



\## Objectif



Définir précisément le jeu de données de démonstration AMARKHYS avant écriture dans Firestore.



Cette étape ne modifie pas Firestore.



Le seed doit être :



\- réaliste

\- cohérent avec les metadata/modules

\- rejouable

\- déterministe

\- proche de situations réelles de garage

\- exploitable pour la présentation



\## Périmètre



Modules couverts :



\- `clientsauto`

\- `vehicules`

\- `rendezvous`

\- `interventionsauto`

\- `lignesinterventionauto`

\- `facturesauto`

\- `encaissementsauto`

\- `produitsauto`

\- `stocksauto`

\- `fournisseursauto`

\- `commandesstockauto`

\- `lignescommandestockauto`

\- `receptionsstockauto`

\- `mouvementsstockauto`

\- `rappelsauto`



\## Règles de seed



\### IDs stables



Tous les IDs doivent être stables et préfixés par `demo-`.



Exemples :



\- `demo-client-old-001`

\- `demo-client-new-001`

\- `demo-vehicle-old-001`

\- `demo-product-oil-5w30`

\- `demo-stock-main`

\- `demo-invoice-overdue-001`



\### Dates



Utiliser une date de référence dans le script :



```js

const REFERENCE\_DATE = new Date();

