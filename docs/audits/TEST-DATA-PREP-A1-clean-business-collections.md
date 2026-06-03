# TEST-DATA-PREP-A1 — Nettoyage collections métier Firestore

## Objectif

Préparer un environnement de test/démonstration propre pour Terragest_V2 / AMARKHYS, sans supprimer les données utilisateurs ni employés.

## Projet Firestore

- Projet : `terragest-dev`
- Mode initial : dry-run
- Suppression réelle : confirmée explicitement avec `--confirm-delete-business-data`

## Collections métier ciblées

Les collections suivantes ont été nettoyées :

- `clientsauto`
- `vehicules`
- `rendezvous`
- `interventionsauto`
- `lignesinterventionauto`
- `facturesauto`
- `encaissementsauto`
- `produitsauto`
- `stocksauto`
- `fournisseursauto`
- `commandesstockauto`
- `lignescommandestockauto`
- `receptionsstockauto`
- `mouvementsstockauto`

## Résultat suppression

Total supprimé : **207 documents métier**.

Détail :

- `clientsauto` : 20
- `vehicules` : 22
- `rendezvous` : 33
- `interventionsauto` : 17
- `lignesinterventionauto` : 31
- `facturesauto` : 11
- `encaissementsauto` : 16
- `produitsauto` : 23
- `stocksauto` : 4
- `fournisseursauto` : 1
- `commandesstockauto` : 3
- `lignescommandestockauto` : 4
- `receptionsstockauto` : 3
- `mouvementsstockauto` : 19

## Collections protégées

Les collections suivantes ont été conservées :

- `utilisateurs` : 3 documents
- `employes` : 1 document

## Contrôle post-nettoyage

Dry-run exécuté après suppression :

- Documents ciblés restants : **0**
- Aucune suppression complémentaire nécessaire
- Les collections métier ciblées sont vides ou absentes
- Les collections protégées sont toujours présentes

## Sécurité

Le nettoyage est volontairement limité à une liste fermée de collections métier.  
Aucune collection hors liste n’est supprimée par le script.

Les credentials Firebase Admin sont locaux et doivent rester exclus de Git via `.gitignore`.

## Conclusion

Nettoyage TEST-DATA-PREP-A1 validé.  
L’environnement est prêt pour la prochaine étape : génération d’un jeu de données démo cohérent depuis les metadata/modules.