\# ERP Terragest - Core Framework



\## Objectif



Définir le framework officiel de génération et d’industrialisation ERP Terragest.



\---



\# 1. Générateur Officiel



Le générateur officiel ERP est :



Generate-EnterpriseModule.ps1



Ce script devient le point d’entrée unique pour :

\- la génération de domaines

\- les services

\- les repositories

\- les hooks

\- les validators

\- les tests

\- les adapters

\- les composants realtime

\- les composants offline



\---



\# 2. Shared Core



Le socle partagé officiel est composé de :



\- filesystem.ps1

\- logging.ps1

\- naming.ps1

\- template-engine.ps1

\- validation.ps1



Ces composants ne doivent pas être dupliqués.



Toute logique commune doit être mutualisée dans ce socle.



\---



\# 3. Templates Officiels



Les templates officiels incluent :



\## Backend



\- service.template.txt

\- repository.template.txt

\- schema.template.txt

\- dto.template.txt



\## Frontend



\- form.template.txt

\- table.template.txt

\- list-page.template.txt

\- details-page.template.txt



\## React Query



\- query-hook.template.txt

\- create-mutation.template.txt

\- update-mutation.template.txt

\- delete-mutation.template.txt



\## Realtime



\- realtime-listener.template.txt

\- realtime-widget.template.txt



\## Offline



\- indexeddb-storage.template.txt

\- offline-queue.template.txt



\## QA



\- test.template.txt



\---



\# 4. Structure Officielle des Modules



Tous les domaines ERP doivent suivre :



application/

domain/

infrastructure/

presentation/

tests/



\---



\# 5. Pipeline Officiel



Exemple :



Generate-EnterpriseModule.ps1 `

&#x20; -Domain "stocks" `

&#x20; -Features Crud,Realtime,Offline,Tests



\---



\# 6. Règles de Gouvernance



Avant toute nouvelle implémentation :



\- vérifier l’existant

\- mutualiser avant créer

\- éviter les scripts spécialisés isolés

\- privilégier les générateurs officiels

\- éviter les duplications



\---



\# 7. Objectif Long Terme



Construire une plateforme ERP :

\- scalable

\- industrialisée

\- maintenable

\- observable

\- testable

\- event-driven

\- offline-first



\---



\# 8. Orientation Architecture



Terragest doit évoluer comme :



\- une plateforme ERP SaaS

\- un framework métier industrialisé

\- une architecture pilotée par domaines

\- une plateforme événementielle extensible

