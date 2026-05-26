# Q22E-9L — Anti-local Scheduling Audit

## 1. Objectif

Cet audit vérifie que le scheduling reste ERP générique, runtime-driven et metadata-driven.

Il détecte :

- les hardcodes métier hors metadata ;
- les références directes à `rendezvous`, `vehiculeId`, `amarkhys`, `garage`, `typeService` ;
- la logique de buffer/capacity/slot generation potentiellement placée dans une vue ;
- les responsabilités qui devraient appartenir à `RuntimeSchedulingEngine`, `SchedulingSlotPolicy`, settings/resolver/guards/repositories.

Aucun fichier applicatif n’est modifié par cet audit.

## 2. Doctrine appliquée

Question obligatoire :

```text
Est-ce vraiment UI ou est-ce une règle runtime ?
```

Rappel :

- Les modules déclarent.
- Les vues affichent.
- Les engines calculent.
- Les resolvers résolvent.
- Les settings configurent.
- Les guards protègent.
- Les repositories persistent.

## 3. Dossiers inspectés

- `src/runtime/scheduling`
- `src/runtime/scheduling/settings`
- `src/components/erp/scheduling`
- `src/runtime/modules/generated/rendezvous`
- `src/runtime/modules/definitions`
- `src/runtime/guards`
- `src/runtime/repositories`
- `src/runtime/business-rules`
- `src/app`

## 4. Dossiers absents

_Aucun._

## 5. Fichiers scannés

- `src/app/(private)/achats/[id]/edit/page.tsx`
- `src/app/(private)/achats/[id]/page.tsx`
- `src/app/(private)/achats/audit/page.tsx`
- `src/app/(private)/achats/export/page.tsx`
- `src/app/(private)/achats/import/page.tsx`
- `src/app/(private)/achats/nouveau/page.tsx`
- `src/app/(private)/achats/page.tsx`
- `src/app/(private)/achats/relations/page.tsx`
- `src/app/(private)/achats/workflows/page.tsx`
- `src/app/(private)/actifs/[id]/edit/page.tsx`
- `src/app/(private)/actifs/[id]/page.tsx`
- `src/app/(private)/actifs/nouveau/page.tsx`
- `src/app/(private)/actifs/page.tsx`
- `src/app/(private)/ai-runtime/page.tsx`
- `src/app/(private)/automation/page.tsx`
- `src/app/(private)/billing/page.tsx`
- `src/app/(private)/budgets/[id]/edit/page.tsx`
- `src/app/(private)/budgets/[id]/page.tsx`
- `src/app/(private)/budgets/nouveau/page.tsx`
- `src/app/(private)/budgets/page.tsx`
- `src/app/(private)/campagnes/[id]/edit/page.tsx`
- `src/app/(private)/campagnes/[id]/page.tsx`
- `src/app/(private)/campagnes/analytics/page.tsx`
- `src/app/(private)/campagnes/audit/page.tsx`
- `src/app/(private)/campagnes/dashboard/page.tsx`
- `src/app/(private)/campagnes/export/page.tsx`
- `src/app/(private)/campagnes/import/page.tsx`
- `src/app/(private)/campagnes/nouveau/page.tsx`
- `src/app/(private)/campagnes/page.tsx`
- `src/app/(private)/campagnes/relations/page.tsx`
- `src/app/(private)/campagnes/workflows/page.tsx`
- `src/app/(private)/clients/[id]/edit/page.tsx`
- `src/app/(private)/clients/[id]/page.tsx`
- `src/app/(private)/clients/audit/page.tsx`
- `src/app/(private)/clients/export/page.tsx`
- `src/app/(private)/clients/import/page.tsx`
- `src/app/(private)/clients/nouveau/page.tsx`
- `src/app/(private)/clients/page.tsx`
- `src/app/(private)/clients/relations/page.tsx`
- `src/app/(private)/clients/workflows/page.tsx`
- `src/app/(private)/clientsauto/[id]/edit/page.tsx`
- `src/app/(private)/clientsauto/[id]/page.tsx`
- `src/app/(private)/clientsauto/analytics/page.tsx`
- `src/app/(private)/clientsauto/audit/page.tsx`
- `src/app/(private)/clientsauto/dashboard/page.tsx`
- `src/app/(private)/clientsauto/export/page.tsx`
- `src/app/(private)/clientsauto/import/page.tsx`
- `src/app/(private)/clientsauto/nouveau/page.tsx`
- `src/app/(private)/clientsauto/page.tsx`
- `src/app/(private)/clientsauto/relations/page.tsx`
- `src/app/(private)/clientsauto/workflows/page.tsx`
- `src/app/(private)/commandes/[id]/edit/page.tsx`
- `src/app/(private)/commandes/[id]/page.tsx`
- `src/app/(private)/commandes/audit/page.tsx`
- `src/app/(private)/commandes/export/page.tsx`
- `src/app/(private)/commandes/import/page.tsx`
- `src/app/(private)/commandes/nouveau/page.tsx`
- `src/app/(private)/commandes/page.tsx`
- `src/app/(private)/commandes/relations/page.tsx`
- `src/app/(private)/commandes/workflows/page.tsx`
- `src/app/(private)/commandesstockauto/[id]/edit/page.tsx`
- `src/app/(private)/commandesstockauto/[id]/page.tsx`
- `src/app/(private)/commandesstockauto/analytics/page.tsx`
- `src/app/(private)/commandesstockauto/audit/page.tsx`
- `src/app/(private)/commandesstockauto/dashboard/page.tsx`
- `src/app/(private)/commandesstockauto/export/page.tsx`
- `src/app/(private)/commandesstockauto/import/page.tsx`
- `src/app/(private)/commandesstockauto/nouveau/page.tsx`
- `src/app/(private)/commandesstockauto/page.tsx`
- `src/app/(private)/commandesstockauto/relations/page.tsx`
- `src/app/(private)/commandesstockauto/workflows/page.tsx`
- `src/app/(private)/compliance/page.tsx`
- `src/app/(private)/contrats/[id]/edit/page.tsx`
- `src/app/(private)/contrats/[id]/page.tsx`
- `src/app/(private)/contrats/analytics/page.tsx`
- `src/app/(private)/contrats/audit/page.tsx`
- `src/app/(private)/contrats/dashboard/page.tsx`
- `src/app/(private)/contrats/export/page.tsx`
- `src/app/(private)/contrats/import/page.tsx`
- `src/app/(private)/contrats/nouveau/page.tsx`
- `src/app/(private)/contrats/page.tsx`
- `src/app/(private)/contrats/relations/page.tsx`
- `src/app/(private)/contrats/workflows/page.tsx`
- `src/app/(private)/cultures/[id]/edit/page.tsx`
- `src/app/(private)/cultures/[id]/page.tsx`
- `src/app/(private)/cultures/audit/page.tsx`
- `src/app/(private)/cultures/export/page.tsx`
- `src/app/(private)/cultures/import/page.tsx`
- `src/app/(private)/cultures/nouveau/page.tsx`
- `src/app/(private)/cultures/page.tsx`
- `src/app/(private)/cultures/relations/page.tsx`
- `src/app/(private)/cultures/workflows/page.tsx`
- `src/app/(private)/dashboard/[dashboardKey]/page.tsx`
- `src/app/(private)/dashboard/amarkhys/page.tsx`
- `src/app/(private)/dashboard/page.tsx`
- `src/app/(private)/depenses/[id]/edit/page.tsx`
- `src/app/(private)/depenses/[id]/page.tsx`
- `src/app/(private)/depenses/audit/page.tsx`
- `src/app/(private)/depenses/export/page.tsx`
- `src/app/(private)/depenses/import/page.tsx`
- `src/app/(private)/depenses/nouveau/page.tsx`
- `src/app/(private)/depenses/page.tsx`
- `src/app/(private)/depenses/relations/page.tsx`
- `src/app/(private)/depenses/workflows/page.tsx`
- `src/app/(private)/devis/[id]/edit/page.tsx`
- `src/app/(private)/devis/[id]/page.tsx`
- `src/app/(private)/devis/audit/page.tsx`
- `src/app/(private)/devis/export/page.tsx`
- `src/app/(private)/devis/import/page.tsx`
- `src/app/(private)/devis/nouveau/page.tsx`
- `src/app/(private)/devis/page.tsx`
- `src/app/(private)/devis/relations/page.tsx`
- `src/app/(private)/devis/workflows/page.tsx`
- `src/app/(private)/echeancespaiementauto/[id]/edit/page.tsx`
- `src/app/(private)/echeancespaiementauto/[id]/page.tsx`
- `src/app/(private)/echeancespaiementauto/nouveau/page.tsx`
- `src/app/(private)/echeancespaiementauto/page.tsx`
- `src/app/(private)/employes/[id]/edit/page.tsx`
- `src/app/(private)/employes/[id]/page.tsx`
- `src/app/(private)/employes/audit/page.tsx`
- `src/app/(private)/employes/export/page.tsx`
- `src/app/(private)/employes/import/page.tsx`
- `src/app/(private)/employes/nouveau/page.tsx`
- `src/app/(private)/employes/page.tsx`
- `src/app/(private)/employes/relations/page.tsx`
- `src/app/(private)/employes/workflows/page.tsx`
- `src/app/(private)/encaissementsauto/[id]/edit/page.tsx`
- `src/app/(private)/encaissementsauto/[id]/page.tsx`
- `src/app/(private)/encaissementsauto/nouveau/page.tsx`
- `src/app/(private)/encaissementsauto/page.tsx`
- `src/app/(private)/exploitations/[id]/edit/page.tsx`
- `src/app/(private)/exploitations/[id]/page.tsx`
- `src/app/(private)/exploitations/audit/page.tsx`
- `src/app/(private)/exploitations/details/page.tsx`
- `src/app/(private)/exploitations/export/page.tsx`
- `src/app/(private)/exploitations/import/page.tsx`
- `src/app/(private)/exploitations/nouveau/page.tsx`
- `src/app/(private)/exploitations/page.tsx`
- `src/app/(private)/exploitations/relations/page.tsx`
- `src/app/(private)/exploitations/workflows/page.tsx`
- `src/app/(private)/facturations/[id]/edit/page.tsx`
- `src/app/(private)/facturations/[id]/page.tsx`
- `src/app/(private)/facturations/analytics/page.tsx`
- `src/app/(private)/facturations/audit/page.tsx`
- `src/app/(private)/facturations/dashboard/page.tsx`
- `src/app/(private)/facturations/export/page.tsx`
- `src/app/(private)/facturations/import/page.tsx`
- `src/app/(private)/facturations/nouveau/page.tsx`
- `src/app/(private)/facturations/page.tsx`
- `src/app/(private)/facturations/relations/page.tsx`
- `src/app/(private)/facturations/workflows/page.tsx`
- `src/app/(private)/factures/[id]/edit/page.tsx`
- `src/app/(private)/factures/[id]/page.tsx`
- `src/app/(private)/factures/audit/page.tsx`
- `src/app/(private)/factures/export/page.tsx`
- `src/app/(private)/factures/import/page.tsx`
- `src/app/(private)/factures/nouveau/page.tsx`
- `src/app/(private)/factures/page.tsx`
- `src/app/(private)/factures/relations/page.tsx`
- `src/app/(private)/factures/workflows/page.tsx`
- `src/app/(private)/facturesauto/[id]/edit/page.tsx`
- `src/app/(private)/facturesauto/[id]/page.tsx`
- `src/app/(private)/facturesauto/analytics/page.tsx`
- `src/app/(private)/facturesauto/audit/page.tsx`
- `src/app/(private)/facturesauto/dashboard/page.tsx`
- `src/app/(private)/facturesauto/export/page.tsx`
- `src/app/(private)/facturesauto/import/page.tsx`
- `src/app/(private)/facturesauto/nouveau/page.tsx`
- `src/app/(private)/facturesauto/page.tsx`
- `src/app/(private)/facturesauto/relations/page.tsx`
- `src/app/(private)/facturesauto/workflows/page.tsx`
- `src/app/(private)/fournisseurs/[id]/edit/page.tsx`
- `src/app/(private)/fournisseurs/[id]/page.tsx`
- `src/app/(private)/fournisseurs/audit/page.tsx`
- `src/app/(private)/fournisseurs/export/page.tsx`
- `src/app/(private)/fournisseurs/import/page.tsx`
- `src/app/(private)/fournisseurs/nouveau/page.tsx`
- `src/app/(private)/fournisseurs/page.tsx`
- `src/app/(private)/fournisseurs/relations/page.tsx`
- `src/app/(private)/fournisseurs/workflows/page.tsx`
- `src/app/(private)/fournisseursauto/[id]/edit/page.tsx`
- `src/app/(private)/fournisseursauto/[id]/page.tsx`
- `src/app/(private)/fournisseursauto/analytics/page.tsx`
- `src/app/(private)/fournisseursauto/audit/page.tsx`
- `src/app/(private)/fournisseursauto/dashboard/page.tsx`
- `src/app/(private)/fournisseursauto/export/page.tsx`
- `src/app/(private)/fournisseursauto/import/page.tsx`
- `src/app/(private)/fournisseursauto/nouveau/page.tsx`
- `src/app/(private)/fournisseursauto/page.tsx`
- `src/app/(private)/fournisseursauto/relations/page.tsx`
- `src/app/(private)/fournisseursauto/workflows/page.tsx`
- `src/app/(private)/incidents/[id]/edit/page.tsx`
- `src/app/(private)/incidents/[id]/page.tsx`
- `src/app/(private)/incidents/audit/page.tsx`
- `src/app/(private)/incidents/export/page.tsx`
- `src/app/(private)/incidents/import/page.tsx`
- `src/app/(private)/incidents/nouveau/page.tsx`
- `src/app/(private)/incidents/page.tsx`
- `src/app/(private)/incidents/relations/page.tsx`
- `src/app/(private)/incidents/workflows/page.tsx`
- `src/app/(private)/interventions/[id]/edit/page.tsx`
- `src/app/(private)/interventions/[id]/page.tsx`
- `src/app/(private)/interventions/audit/page.tsx`
- `src/app/(private)/interventions/export/page.tsx`
- `src/app/(private)/interventions/import/page.tsx`
- `src/app/(private)/interventions/nouveau/page.tsx`
- `src/app/(private)/interventions/page.tsx`
- `src/app/(private)/interventions/relations/page.tsx`
- `src/app/(private)/interventions/workflow/page.tsx`
- `src/app/(private)/interventions/workflows/page.tsx`
- `src/app/(private)/interventionsauto/[id]/edit/page.tsx`
- `src/app/(private)/interventionsauto/[id]/page.tsx`
- `src/app/(private)/interventionsauto/analytics/page.tsx`
- `src/app/(private)/interventionsauto/audit/page.tsx`
- `src/app/(private)/interventionsauto/dashboard/page.tsx`
- `src/app/(private)/interventionsauto/export/page.tsx`
- `src/app/(private)/interventionsauto/import/page.tsx`
- `src/app/(private)/interventionsauto/nouveau/page.tsx`
- `src/app/(private)/interventionsauto/page.tsx`
- `src/app/(private)/interventionsauto/relations/page.tsx`
- `src/app/(private)/interventionsauto/workflows/page.tsx`
- `src/app/(private)/intrants/[id]/edit/page.tsx`
- `src/app/(private)/intrants/[id]/page.tsx`
- `src/app/(private)/intrants/audit/page.tsx`
- `src/app/(private)/intrants/export/page.tsx`
- `src/app/(private)/intrants/import/page.tsx`
- `src/app/(private)/intrants/nouveau/page.tsx`
- `src/app/(private)/intrants/page.tsx`
- `src/app/(private)/intrants/relations/page.tsx`
- `src/app/(private)/intrants/workflows/page.tsx`
- `src/app/(private)/layout.tsx`
- `src/app/(private)/lignescommandestockauto/[id]/edit/page.tsx`
- `src/app/(private)/lignescommandestockauto/[id]/page.tsx`
- `src/app/(private)/lignescommandestockauto/analytics/page.tsx`
- `src/app/(private)/lignescommandestockauto/audit/page.tsx`
- `src/app/(private)/lignescommandestockauto/dashboard/page.tsx`
- `src/app/(private)/lignescommandestockauto/export/page.tsx`
- `src/app/(private)/lignescommandestockauto/import/page.tsx`
- `src/app/(private)/lignescommandestockauto/nouveau/page.tsx`
- `src/app/(private)/lignescommandestockauto/page.tsx`
- `src/app/(private)/lignescommandestockauto/relations/page.tsx`
- `src/app/(private)/lignescommandestockauto/workflows/page.tsx`
- `src/app/(private)/lignesinterventionauto/[id]/edit/page.tsx`
- `src/app/(private)/lignesinterventionauto/[id]/page.tsx`
- `src/app/(private)/lignesinterventionauto/nouveau/page.tsx`
- `src/app/(private)/lignesinterventionauto/page.tsx`
- `src/app/(private)/livraisons/[id]/edit/page.tsx`
- `src/app/(private)/livraisons/[id]/page.tsx`
- `src/app/(private)/livraisons/audit/page.tsx`
- `src/app/(private)/livraisons/export/page.tsx`
- `src/app/(private)/livraisons/import/page.tsx`
- `src/app/(private)/livraisons/nouveau/page.tsx`
- `src/app/(private)/livraisons/page.tsx`
- `src/app/(private)/livraisons/relations/page.tsx`
- `src/app/(private)/livraisons/workflows/page.tsx`
- `src/app/(private)/maintenance/[id]/edit/page.tsx`
- `src/app/(private)/maintenance/[id]/page.tsx`
- `src/app/(private)/maintenance/audit/page.tsx`
- `src/app/(private)/maintenance/export/page.tsx`
- `src/app/(private)/maintenance/import/page.tsx`
- `src/app/(private)/maintenance/nouveau/page.tsx`
- `src/app/(private)/maintenance/page.tsx`
- `src/app/(private)/maintenance/relations/page.tsx`
- `src/app/(private)/maintenance/workflows/page.tsx`
- `src/app/(private)/materiels/[id]/edit/page.tsx`
- `src/app/(private)/materiels/[id]/page.tsx`
- `src/app/(private)/materiels/audit/page.tsx`
- `src/app/(private)/materiels/export/page.tsx`
- `src/app/(private)/materiels/import/page.tsx`
- `src/app/(private)/materiels/nouveau/page.tsx`
- `src/app/(private)/materiels/page.tsx`
- `src/app/(private)/materiels/pannes/nouveau/page.tsx`
- `src/app/(private)/materiels/relations/page.tsx`
- `src/app/(private)/materiels/workflows/page.tsx`
- `src/app/(private)/monitoring/page.tsx`
- `src/app/(private)/mouvements/[id]/edit/page.tsx`
- `src/app/(private)/mouvements/[id]/page.tsx`
- `src/app/(private)/mouvements/audit/page.tsx`
- `src/app/(private)/mouvements/export/page.tsx`
- `src/app/(private)/mouvements/import/page.tsx`
- `src/app/(private)/mouvements/nouveau/page.tsx`
- `src/app/(private)/mouvements/page.tsx`
- `src/app/(private)/mouvements/relations/page.tsx`
- `src/app/(private)/mouvements/workflows/page.tsx`
- `src/app/(private)/mouvementsstockauto/[id]/edit/page.tsx`
- `src/app/(private)/mouvementsstockauto/[id]/page.tsx`
- `src/app/(private)/mouvementsstockauto/analytics/page.tsx`
- `src/app/(private)/mouvementsstockauto/audit/page.tsx`
- `src/app/(private)/mouvementsstockauto/dashboard/page.tsx`
- `src/app/(private)/mouvementsstockauto/export/page.tsx`
- `src/app/(private)/mouvementsstockauto/import/page.tsx`
- `src/app/(private)/mouvementsstockauto/nouveau/page.tsx`
- `src/app/(private)/mouvementsstockauto/page.tsx`
- `src/app/(private)/mouvementsstockauto/relations/page.tsx`
- `src/app/(private)/mouvementsstockauto/workflows/page.tsx`
- `src/app/(private)/notifications/page.tsx`
- `src/app/(private)/observability/page.tsx`
- `src/app/(private)/offline/page.tsx`
- `src/app/(private)/operations/page.tsx`
- `src/app/(private)/organization-analytics/page.tsx`
- `src/app/(private)/page.tsx`
- `src/app/(private)/paiements/[id]/edit/page.tsx`
- `src/app/(private)/paiements/[id]/page.tsx`
- `src/app/(private)/paiements/audit/page.tsx`
- `src/app/(private)/paiements/export/page.tsx`
- `src/app/(private)/paiements/import/page.tsx`
- `src/app/(private)/paiements/nouveau/page.tsx`
- `src/app/(private)/paiements/page.tsx`
- `src/app/(private)/paiements/relations/page.tsx`
- `src/app/(private)/paiements/workflows/page.tsx`
- `src/app/(private)/parcelles/[id]/edit/page.tsx`
- `src/app/(private)/parcelles/[id]/page.tsx`
- `src/app/(private)/parcelles/audit/page.tsx`
- `src/app/(private)/parcelles/export/page.tsx`
- `src/app/(private)/parcelles/import/page.tsx`
- `src/app/(private)/parcelles/nouveau/page.tsx`
- `src/app/(private)/parcelles/page.tsx`
- `src/app/(private)/parcelles/relations/page.tsx`
- `src/app/(private)/parcelles/workflows/page.tsx`
- `src/app/(private)/persistence/page.tsx`
- `src/app/(private)/platform/page.tsx`
- `src/app/(private)/production/page.tsx`
- `src/app/(private)/produits/[id]/edit/page.tsx`
- `src/app/(private)/produits/[id]/page.tsx`
- `src/app/(private)/produits/audit/page.tsx`
- `src/app/(private)/produits/export/page.tsx`
- `src/app/(private)/produits/import/page.tsx`
- `src/app/(private)/produits/nouveau/page.tsx`
- `src/app/(private)/produits/page.tsx`
- `src/app/(private)/produits/relations/page.tsx`
- `src/app/(private)/produits/workflows/page.tsx`
- `src/app/(private)/produitsauto/[id]/edit/page.tsx`
- `src/app/(private)/produitsauto/[id]/page.tsx`
- `src/app/(private)/produitsauto/analytics/page.tsx`
- `src/app/(private)/produitsauto/audit/page.tsx`
- `src/app/(private)/produitsauto/dashboard/page.tsx`
- `src/app/(private)/produitsauto/export/page.tsx`
- `src/app/(private)/produitsauto/import/page.tsx`
- `src/app/(private)/produitsauto/nouveau/page.tsx`
- `src/app/(private)/produitsauto/page.tsx`
- `src/app/(private)/produitsauto/relations/page.tsx`
- `src/app/(private)/produitsauto/workflows/page.tsx`
- `src/app/(private)/pwa/page.tsx`
- `src/app/(private)/rappelsauto/[id]/edit/page.tsx`
- `src/app/(private)/rappelsauto/[id]/page.tsx`
- `src/app/(private)/rappelsauto/analytics/page.tsx`
- `src/app/(private)/rappelsauto/audit/page.tsx`
- `src/app/(private)/rappelsauto/dashboard/page.tsx`
- `src/app/(private)/rappelsauto/export/page.tsx`
- `src/app/(private)/rappelsauto/import/page.tsx`
- `src/app/(private)/rappelsauto/nouveau/page.tsx`
- `src/app/(private)/rappelsauto/page.tsx`
- `src/app/(private)/rappelsauto/relations/page.tsx`
- `src/app/(private)/rappelsauto/workflows/page.tsx`
- `src/app/(private)/realtime/page.tsx`
- `src/app/(private)/receptionsstockauto/[id]/edit/page.tsx`
- `src/app/(private)/receptionsstockauto/[id]/page.tsx`
- `src/app/(private)/receptionsstockauto/analytics/page.tsx`
- `src/app/(private)/receptionsstockauto/audit/page.tsx`
- `src/app/(private)/receptionsstockauto/dashboard/page.tsx`
- `src/app/(private)/receptionsstockauto/export/page.tsx`
- `src/app/(private)/receptionsstockauto/import/page.tsx`
- `src/app/(private)/receptionsstockauto/nouveau/page.tsx`
- `src/app/(private)/receptionsstockauto/page.tsx`
- `src/app/(private)/receptionsstockauto/relations/page.tsx`
- `src/app/(private)/receptionsstockauto/workflows/page.tsx`
- `src/app/(private)/recettes/[id]/edit/page.tsx`
- `src/app/(private)/recettes/[id]/page.tsx`
- `src/app/(private)/recettes/audit/page.tsx`
- `src/app/(private)/recettes/export/page.tsx`
- `src/app/(private)/recettes/import/page.tsx`
- `src/app/(private)/recettes/nouveau/page.tsx`
- `src/app/(private)/recettes/page.tsx`
- `src/app/(private)/recettes/relations/page.tsx`
- `src/app/(private)/recettes/workflows/page.tsx`
- `src/app/(private)/recoltes/[id]/edit/page.tsx`
- `src/app/(private)/recoltes/[id]/page.tsx`
- `src/app/(private)/recoltes/audit/page.tsx`
- `src/app/(private)/recoltes/export/page.tsx`
- `src/app/(private)/recoltes/import/page.tsx`
- `src/app/(private)/recoltes/nouveau/page.tsx`
- `src/app/(private)/recoltes/page.tsx`
- `src/app/(private)/recoltes/relations/page.tsx`
- `src/app/(private)/recoltes/workflows/page.tsx`
- `src/app/(private)/rendezvous/[id]/edit/page.tsx`
- `src/app/(private)/rendezvous/[id]/page.tsx`
- `src/app/(private)/rendezvous/analytics/page.tsx`
- `src/app/(private)/rendezvous/audit/page.tsx`
- `src/app/(private)/rendezvous/dashboard/page.tsx`
- `src/app/(private)/rendezvous/export/page.tsx`
- `src/app/(private)/rendezvous/import/page.tsx`
- `src/app/(private)/rendezvous/nouveau/page.tsx`
- `src/app/(private)/rendezvous/page.tsx`
- `src/app/(private)/rendezvous/planning/page.tsx`
- `src/app/(private)/rendezvous/relations/page.tsx`
- `src/app/(private)/rendezvous/workflows/page.tsx`
- `src/app/(private)/resilience/page.tsx`
- `src/app/(private)/runtime-cockpit/page.tsx`
- `src/app/(private)/runtime-registry/page.tsx`
- `src/app/(private)/runtime-supervision/page.tsx`
- `src/app/(private)/runtime/[module]/page.tsx`
- `src/app/(private)/security/page.tsx`
- `src/app/(private)/stocks/[id]/edit/page.tsx`
- `src/app/(private)/stocks/[id]/page.tsx`
- `src/app/(private)/stocks/audit/page.tsx`
- `src/app/(private)/stocks/export/page.tsx`
- `src/app/(private)/stocks/import/page.tsx`
- `src/app/(private)/stocks/new/page.tsx`
- `src/app/(private)/stocks/nouveau/page.tsx`
- `src/app/(private)/stocks/page.tsx`
- `src/app/(private)/stocks/relations/page.tsx`
- `src/app/(private)/stocks/workflows/page.tsx`
- `src/app/(private)/stocksauto/[id]/edit/page.tsx`
- `src/app/(private)/stocksauto/[id]/page.tsx`
- `src/app/(private)/stocksauto/analytics/page.tsx`
- `src/app/(private)/stocksauto/audit/page.tsx`
- `src/app/(private)/stocksauto/dashboard/page.tsx`
- `src/app/(private)/stocksauto/export/page.tsx`
- `src/app/(private)/stocksauto/import/page.tsx`
- `src/app/(private)/stocksauto/nouveau/page.tsx`
- `src/app/(private)/stocksauto/page.tsx`
- `src/app/(private)/stocksauto/relations/page.tsx`
- `src/app/(private)/stocksauto/workflows/page.tsx`
- `src/app/(private)/streams/page.tsx`
- `src/app/(private)/supervision/page.tsx`
- `src/app/(private)/taches/[id]/edit/page.tsx`
- `src/app/(private)/taches/[id]/page.tsx`
- `src/app/(private)/taches/audit/page.tsx`
- `src/app/(private)/taches/export/page.tsx`
- `src/app/(private)/taches/import/page.tsx`
- `src/app/(private)/taches/nouveau/page.tsx`
- `src/app/(private)/taches/page.tsx`
- `src/app/(private)/taches/relations/page.tsx`
- `src/app/(private)/taches/workflows/page.tsx`
- `src/app/(private)/team/page.tsx`
- `src/app/(private)/tenants/page.tsx`
- `src/app/(private)/terrains/[id]/edit/page.tsx`
- `src/app/(private)/terrains/[id]/page.tsx`
- `src/app/(private)/terrains/audit/page.tsx`
- `src/app/(private)/terrains/export/page.tsx`
- `src/app/(private)/terrains/import/page.tsx`
- `src/app/(private)/terrains/nouveau/page.tsx`
- `src/app/(private)/terrains/page.tsx`
- `src/app/(private)/terrains/relations/page.tsx`
- `src/app/(private)/terrains/workflows/page.tsx`
- `src/app/(private)/testing/page.tsx`
- `src/app/(private)/vehicules/[id]/edit/page.tsx`
- `src/app/(private)/vehicules/[id]/page.tsx`
- `src/app/(private)/vehicules/analytics/page.tsx`
- `src/app/(private)/vehicules/audit/page.tsx`
- `src/app/(private)/vehicules/dashboard/page.tsx`
- `src/app/(private)/vehicules/export/page.tsx`
- `src/app/(private)/vehicules/import/page.tsx`
- `src/app/(private)/vehicules/nouveau/page.tsx`
- `src/app/(private)/vehicules/page.tsx`
- `src/app/(private)/vehicules/relations/page.tsx`
- `src/app/(private)/vehicules/workflows/page.tsx`
- `src/app/(private)/workers/page.tsx`
- `src/app/(private)/workflows-runtime/page.tsx`
- `src/app/(private)/workspaces/[workspace]/page.tsx`
- `src/app/api/health/route.ts`
- `src/app/api/platform/status/route.ts`
- `src/app/api/stripe/checkout/route.ts`
- `src/app/api/stripe/webhook/route.ts`
- `src/app/billing/success/page.tsx`
- `src/app/enterprise/page.tsx`
- `src/app/facture/[token]/details/page.tsx`
- `src/app/facture/[token]/page.tsx`
- `src/app/invitations/accept/[token]/page.tsx`
- `src/app/layout.tsx`
- `src/app/login/page.tsx`
- `src/app/page.tsx`
- `src/app/rdv/page.tsx`
- `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx`
- `src/components/erp/scheduling/index.ts`
- `src/runtime/business-rules/RuntimeBusinessRule.ts`
- `src/runtime/business-rules/RuntimeBusinessRulesEngine.ts`
- `src/runtime/business-rules/runtimeBusinessRules.ts`
- `src/runtime/guards/RuntimeChronologyGuard.ts`
- `src/runtime/guards/processRuntimeBeforeMutationGuards.ts`
- `src/runtime/modules/definitions/coreModules.ts`
- `src/runtime/modules/definitions/generated/campagnes.module.ts`
- `src/runtime/modules/definitions/generated/commandes.module.ts`
- `src/runtime/modules/definitions/generated/contrats.module.ts`
- `src/runtime/modules/definitions/generated/cultures.module.ts`
- `src/runtime/modules/definitions/generated/employes.module.ts`
- `src/runtime/modules/definitions/generated/exploitations.module.ts`
- `src/runtime/modules/definitions/generated/factures.module.ts`
- `src/runtime/modules/definitions/generated/generatedModules.ts`
- `src/runtime/modules/definitions/generated/interventions.module.ts`
- `src/runtime/modules/definitions/generated/livraisons.module.ts`
- `src/runtime/modules/definitions/generated/maintenance.module.ts`
- `src/runtime/modules/definitions/generated/materiels.module.ts`
- `src/runtime/modules/definitions/generated/mouvements.module.ts`
- `src/runtime/modules/definitions/generated/paiements.module.ts`
- `src/runtime/modules/definitions/generated/produits.module.ts`
- `src/runtime/modules/definitions/generated/stocks.module.ts`
- `src/runtime/modules/definitions/generated/terrains.module.ts`
- `src/runtime/modules/generated/rendezvous/index.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.automation.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.dashboard.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.permissions.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.workflows.ts`
- `src/runtime/repositories/RuntimeRepository.ts`
- `src/runtime/repositories/index.ts`
- `src/runtime/scheduling/RuntimeOpeningHours.ts`
- `src/runtime/scheduling/RuntimeSchedulingEngine.ts`
- `src/runtime/scheduling/RuntimeSchedulingTypes.ts`
- `src/runtime/scheduling/index.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts`
- `src/runtime/scheduling/settings/index.ts`

## 6. Résumé

- Total findings : 394
- HIGH : 53
- WARN : 203
- INFO : 138

## 7. Findings HIGH

| Sévérité | Niveau | Motif | Fichier | Ligne | Extrait | Décision |
|---|---|---|---|---:|---|---|
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 664 | `rendezvous: RuntimeRecord` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 666 | `if (!rendezvous) {` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 673 | `if (isCancelledAppointment(rendezvous)) {` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 680 | `if (asString(rendezvous.consumedByInterventionId)) {` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 688 | `if (!asString(rendezvous.clientId)) {` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 695 | `if (!asString(rendezvous.vehiculeId)) {` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 702 | `if (!asString(rendezvous.id)) {` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 712 | `static buildInterventionFromRendezvous(rendezvous: RuntimeRecord): RuntimeRecord {` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 714 | `rendezvous` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 722 | `clientId: rendezvous.clientId,` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 723 | `vehiculeId: rendezvous.vehiculeId,` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 724 | `rendezVousId: rendezvous.id,` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 725 | `typeIntervention: rendezvous.typeService \|\| "autre",` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 726 | `dateIntervention: rendezvous.dateRendezVous,` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Module metadata / Runtime audit | vehiculeId | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 204 | `const vehicleA = asString(a.vehiculeId);` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Module metadata / Runtime audit | vehiculeId | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 205 | `const vehicleB = asString(b.vehiculeId);` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Module metadata / Runtime audit | vehiculeId | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 695 | `if (!asString(rendezvous.vehiculeId)) {` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Module metadata / Runtime audit | vehiculeId | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 698 | `reason: "Impossible de créer une intervention : vehiculeId manquant.",` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Module metadata / Runtime audit | vehiculeId | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 723 | `vehiculeId: rendezvous.vehiculeId,` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Module metadata / Runtime audit | vehiculeId | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 723 | `vehiculeId: rendezvous.vehiculeId,` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Module metadata / Runtime audit | typeService | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 725 | `typeIntervention: rendezvous.typeService \|\| "autre",` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Engine + Settings | bufferMinutes | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 361 | `// The visible appointment duration must stay independent from bufferMinutes.` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine + Settings | bufferMinutes | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 362 | `// bufferMinutes protects availability but must not stretch labels like 08:00-09:15.` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine + Settings | bufferMinutes | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 606 | `bufferMinutes: schedulingConfig.bufferMinutes,` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine + Settings | bufferMinutes | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 606 | `bufferMinutes: schedulingConfig.bufferMinutes,` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine + Guard | capacity | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 608 | `capacity: schedulingConfig.capacity,` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine + Guard | capacity | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 608 | `capacity: schedulingConfig.capacity,` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine + Guard | capacity | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 840 | `? slot.remainingCapacity !== undefined && slot.capacity && slot.capacity > 1` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine + Guard | capacity | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 840 | `? slot.remainingCapacity !== undefined && slot.capacity && slot.capacity > 1` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine / SchedulingSlotPolicy | generate slot | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 616 | `buildPlanningDateTime(selectedDate, slot.start).getTime();` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine / SchedulingSlotPolicy | generate slot | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 619 | `buildPlanningDateTime(selectedDate, slot.end).getTime();` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine / SchedulingSlotPolicy | slot loop | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 229 | `for (const field of relationFields) {` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine / SchedulingSlotPolicy | slot loop | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 270 | `for (const relatedRecord of relatedRecords) {` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine / SchedulingSlotPolicy | slot loop | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 377 | `for (const candidate of candidates) {` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine / SchedulingSlotPolicy | slot loop | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 614 | `for (const slot of slots) {` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine / Date policy | date math | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 25 | `return formatLocalDateOnly(new Date());` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine / Date policy | date math | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 351 | `const date = new Date(`${dateOnly}T00:00:00`);` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine / Date policy | date math | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 389 | `return new Date(`${dateOnly}T${timeOnly}:00`);` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine / Date policy | date math | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 399 | `const timestamp = new Date(text).getTime();` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Engine / Date policy | date math | `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx` | 429 | `}).format(new Date(`${dateOnly}T00:00:00`));` | Suspect fort : cette logique semble dans une vue. Elle doit probablement remonter vers Engine/Policy/Settings. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | 176 | `return module.metadata.key === "rendezvous";` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | 347 | `// This remains generic: rendezvous provides date/time/duration, the engine validates the slot.` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Module metadata / Runtime audit | typeService | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | 224 | `const typeService =` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Module metadata / Runtime audit | typeService | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | 225 | `asString(record.typeService);` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Module metadata / Runtime audit | typeService | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | 227 | `if (!typeService) {` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/guards/RuntimeChronologyGuard.ts` | 140 | `const rendezvous =` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/guards/RuntimeChronologyGuard.ts` | 142 | `"rendezvous",` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/guards/RuntimeChronologyGuard.ts` | 146 | `if (!rendezvous) {` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | rendezvous | `src/runtime/guards/RuntimeChronologyGuard.ts` | 154 | `asDateOnly(rendezvous.dateRendezVous);` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | interventionsauto | `src/runtime/guards/RuntimeChronologyGuard.ts` | 179 | `"interventionsauto",` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | interventionsauto | `src/runtime/guards/RuntimeChronologyGuard.ts` | 271 | `module.metadata.key === "interventionsauto" &&` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | facturesauto | `src/runtime/guards/RuntimeChronologyGuard.ts` | 216 | `"facturesauto",` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |
| HIGH | Architecture / Runtime audit | facturesauto | `src/runtime/guards/RuntimeChronologyGuard.ts` | 282 | `module.metadata.key === "facturesauto" &&` | Suspect fort : un moteur/resolver/guard/repository générique ne doit pas hardcoder cette valeur. |


## 8. Findings WARN

| Sévérité | Niveau | Motif | Fichier | Ligne | Extrait | Décision |
|---|---|---|---|---:|---|---|
| WARN | Engine + Guard | capacity | `src/runtime/scheduling/RuntimeSchedulingTypes.ts` | 43 | `capacity?: number;` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine + Guard | capacity | `src/runtime/scheduling/RuntimeSchedulingTypes.ts` | 60 | `capacity?: number;` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Settings + Resolver + Engine | working hours | `src/runtime/scheduling/RuntimeSchedulingTypes.ts` | 82 | `// Generic ERP calendar exception: close or override opening periods for a specific date.` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/index.ts` | 1 | `export * from "./rendezvous.module";` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/index.ts` | 2 | `export * from "./rendezvous.actions";` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/index.ts` | 3 | `export * from "./rendezvous.workflows";` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/index.ts` | 4 | `export * from "./rendezvous.permissions";` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/index.ts` | 5 | `export * from "./rendezvous.automation";` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/index.ts` | 6 | `export * from "./rendezvous.dashboard";` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` | 10 | `permission: "rendezvous.workflow",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` | 16 | `permission: "rendezvous.workflow",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` | 22 | `permission: "rendezvous.workflow",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` | 28 | `permission: "rendezvous.workflow",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` | 34 | `permission: "rendezvous.workflow",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Engine + Settings | bufferMinutes | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 225 | `bufferMinutes: 15,` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine + Guard | capacity | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 226 | `capacity: 1,` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / SchedulingSlotPolicy | slot loop | `src/runtime/modules/definitions/coreModules.ts` | 196 | `for (const module of generatedModules) {` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / SchedulingSlotPolicy | slot loop | `src/runtime/modules/definitions/coreModules.ts` | 200 | `for (const module of coreModules) {` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / SchedulingSlotPolicy | slot loop | `src/runtime/modules/definitions/coreModules.ts` | 215 | `for (const module of mergedERPModules) {` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/business-rules/runtimeBusinessRules.ts` | 286 | `"rendezvous",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/business-rules/runtimeBusinessRules.ts` | 289 | `"rendezvous.created",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/business-rules/runtimeBusinessRules.ts` | 309 | `"rendezvous"` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/business-rules/runtimeBusinessRules.ts` | 449 | `"rendezvous",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/business-rules/runtimeBusinessRules.ts` | 452 | `"rendezvous.updated",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | rendezvous | `src/runtime/business-rules/runtimeBusinessRules.ts` | 472 | `"rendezvous"` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Module metadata / Runtime audit | vehiculeId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 187 | `vehiculeId:` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Module metadata / Runtime audit | vehiculeId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 188 | `payload.vehiculeId,` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Module metadata / Runtime audit | vehiculeId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 823 | `vehiculeId:` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Module metadata / Runtime audit | vehiculeId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 824 | `intervention.vehiculeId,` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Module metadata / Runtime audit | vehiculeId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1583 | `vehiculeId:` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Module metadata / Runtime audit | vehiculeId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1584 | `payload.vehiculeId,` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Module metadata / Runtime audit | vehiculeId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1743 | `vehiculeId:` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Module metadata / Runtime audit | vehiculeId | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1744 | `payload.vehiculeId,` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 123 | `// AMARKHYS - VIDANGE -> RAPPEL` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 129 | `"amarkhys-vidange-reminder",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 226 | `"amarkhys.revenue.predicted",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 234 | `"amarkhys",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 247 | `"amarkhys.vidange",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 269 | `// AMARKHYS` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 272 | `// AMARKHYS` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 277 | `// AMARKHYS` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 283 | `"amarkhys-rdv-create-intervention-on-create",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 349 | `"amarkhys.intervention.skipped",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 388 | `"amarkhys",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 425 | `"amarkhys.intervention",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 446 | `"amarkhys-rdv-create-intervention",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 512 | `"amarkhys.intervention.skipped",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 551 | `"amarkhys",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 588 | `"amarkhys.intervention",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 613 | `"amarkhys-intervention-create-facture",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 849 | `"amarkhys.interventions.completed",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 852 | `"amarkhys",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 866 | `"amarkhys.facture",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 894 | `"amarkhys-facture-paid-revenue",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 913 | `"amarkhys.revenue.real",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 922 | `"amarkhys",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 940 | `"amarkhys.factures.paid",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 945 | `"amarkhys",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 962 | `"amarkhys.revenue",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 984 | `// AMARKHYS` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 990 | `"amarkhys-encaissement-recompute-facture",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1215 | `"amarkhys.facture.recomputed",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1233 | `// AMARKHYS` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1239 | `"amarkhys-encaissement-updated-recompute-facture",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1464 | `"amarkhys.facture.recomputed",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1483 | `// AMARKHYS` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1489 | `"amarkhys-echeance-overdue-reminder",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1624 | `"amarkhys.echeance.overdue",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1642 | `// AMARKHYS` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1648 | `"amarkhys-echeance-updated-overdue-reminder",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | amarkhys | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1784 | `"amarkhys.echeance.overdue",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 132 | `"interventionsauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 135 | `"interventionsauto.created",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 250 | `"interventionsauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 302 | `"interventionsauto"` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 352 | `"interventionsauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 428 | `"interventionsauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 465 | `"interventionsauto"` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 515 | `"interventionsauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 591 | `"interventionsauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 616 | `"interventionsauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 619 | `"interventionsauto.updated",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 652 | `"interventionsauto"` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 855 | `"interventionsauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1024 | `"interventionsauto"` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1273 | `"interventionsauto"` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | facturesauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 237 | `"facturesauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | facturesauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 637 | `"facturesauto"` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | facturesauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 869 | `"facturesauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | facturesauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 897 | `"facturesauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | facturesauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 900 | `"facturesauto.updated",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | facturesauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 925 | `"facturesauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | facturesauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 948 | `"facturesauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | facturesauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 965 | `"facturesauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | facturesauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1010 | `"facturesauto"` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | facturesauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1218 | `"facturesauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | facturesauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1259 | `"facturesauto"` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Architecture / Runtime audit | facturesauto | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1467 | `"facturesauto",` | À vérifier : référence métier potentiellement locale hors metadata. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 200 | `new Date(` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 417 | `new Date().toISOString(),` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 580 | `new Date().toISOString(),` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 751 | `new Date(raw);` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 767 | `new Date()` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1204 | `new Date().toISOString(),` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1453 | `new Date().toISOString(),` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1514 | `new Date();` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1516 | `today.setHours(` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1524 | `new Date(` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1528 | `dateEcheance.setHours(` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1590 | `new Date()` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1615 | `new Date()` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1674 | `new Date();` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1676 | `today.setHours(` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1684 | `new Date(` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1688 | `dateEcheance.setHours(` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1750 | `new Date()` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Engine / Date policy | date math | `src/runtime/business-rules/runtimeBusinessRules.ts` | 1775 | `new Date()` | À vérifier : responsabilité potentiellement runtime. |
| WARN | Architecture / Runtime audit | clientsauto | `src/app/(private)/clientsauto/analytics/page.tsx` | 6 | `module="clientsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | clientsauto | `src/app/(private)/clientsauto/audit/page.tsx` | 6 | `module="clientsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | clientsauto | `src/app/(private)/clientsauto/dashboard/page.tsx` | 6 | `module="clientsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | clientsauto | `src/app/(private)/clientsauto/export/page.tsx` | 6 | `module="clientsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | clientsauto | `src/app/(private)/clientsauto/import/page.tsx` | 6 | `module="clientsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | clientsauto | `src/app/(private)/clientsauto/nouveau/page.tsx` | 8 | `moduleKey="clientsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | clientsauto | `src/app/(private)/clientsauto/page.tsx` | 8 | `moduleKey="clientsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | clientsauto | `src/app/(private)/clientsauto/relations/page.tsx` | 6 | `module="clientsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | clientsauto | `src/app/(private)/clientsauto/workflows/page.tsx` | 6 | `module="clientsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | clientsauto | `src/app/(private)/clientsauto/[id]/edit/page.tsx` | 19 | `moduleKey="clientsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | clientsauto | `src/app/(private)/clientsauto/[id]/page.tsx` | 19 | `moduleKey="clientsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/(private)/dashboard/amarkhys/page.tsx` | 1 | `import { AmarkhysPremiumCockpit } from "@/components/amarkhys/dashboard/AmarkhysPremiumCockpit";` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | facturesauto | `src/app/(private)/facturesauto/analytics/page.tsx` | 6 | `module="facturesauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | facturesauto | `src/app/(private)/facturesauto/audit/page.tsx` | 6 | `module="facturesauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | facturesauto | `src/app/(private)/facturesauto/dashboard/page.tsx` | 6 | `module="facturesauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | facturesauto | `src/app/(private)/facturesauto/export/page.tsx` | 6 | `module="facturesauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | facturesauto | `src/app/(private)/facturesauto/import/page.tsx` | 6 | `module="facturesauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | facturesauto | `src/app/(private)/facturesauto/nouveau/page.tsx` | 8 | `moduleKey="facturesauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | facturesauto | `src/app/(private)/facturesauto/page.tsx` | 8 | `moduleKey="facturesauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | facturesauto | `src/app/(private)/facturesauto/relations/page.tsx` | 6 | `module="facturesauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | facturesauto | `src/app/(private)/facturesauto/workflows/page.tsx` | 6 | `module="facturesauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | facturesauto | `src/app/(private)/facturesauto/[id]/edit/page.tsx` | 19 | `moduleKey="facturesauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | facturesauto | `src/app/(private)/facturesauto/[id]/page.tsx` | 19 | `moduleKey="facturesauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/app/(private)/interventionsauto/analytics/page.tsx` | 6 | `module="interventionsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/app/(private)/interventionsauto/audit/page.tsx` | 6 | `module="interventionsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/app/(private)/interventionsauto/dashboard/page.tsx` | 6 | `module="interventionsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/app/(private)/interventionsauto/export/page.tsx` | 6 | `module="interventionsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/app/(private)/interventionsauto/import/page.tsx` | 6 | `module="interventionsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/app/(private)/interventionsauto/nouveau/page.tsx` | 8 | `moduleKey="interventionsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/app/(private)/interventionsauto/page.tsx` | 8 | `moduleKey="interventionsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/app/(private)/interventionsauto/relations/page.tsx` | 6 | `module="interventionsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/app/(private)/interventionsauto/workflows/page.tsx` | 6 | `module="interventionsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/app/(private)/interventionsauto/[id]/edit/page.tsx` | 19 | `moduleKey="interventionsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/app/(private)/interventionsauto/[id]/page.tsx` | 19 | `moduleKey="interventionsauto"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | rendezvous | `src/app/(private)/rendezvous/analytics/page.tsx` | 6 | `module="rendezvous"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | rendezvous | `src/app/(private)/rendezvous/audit/page.tsx` | 6 | `module="rendezvous"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | rendezvous | `src/app/(private)/rendezvous/dashboard/page.tsx` | 6 | `module="rendezvous"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | rendezvous | `src/app/(private)/rendezvous/export/page.tsx` | 6 | `module="rendezvous"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | rendezvous | `src/app/(private)/rendezvous/import/page.tsx` | 6 | `module="rendezvous"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | rendezvous | `src/app/(private)/rendezvous/nouveau/page.tsx` | 8 | `moduleKey="rendezvous"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | rendezvous | `src/app/(private)/rendezvous/page.tsx` | 8 | `moduleKey="rendezvous"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | rendezvous | `src/app/(private)/rendezvous/planning/page.tsx` | 2 | `import { rendezvousModule } from "@/runtime/modules/generated/rendezvous";` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | rendezvous | `src/app/(private)/rendezvous/relations/page.tsx` | 6 | `module="rendezvous"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | rendezvous | `src/app/(private)/rendezvous/workflows/page.tsx` | 6 | `module="rendezvous"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | rendezvous | `src/app/(private)/rendezvous/[id]/edit/page.tsx` | 19 | `moduleKey="rendezvous"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | rendezvous | `src/app/(private)/rendezvous/[id]/page.tsx` | 19 | `moduleKey="rendezvous"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Module metadata / Runtime audit | vehiculeId | `src/app/facture/[token]/details/page.tsx` | 311 | `value(loadedInvoice, "vehiculeId")` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/facture/[token]/details/page.tsx` | 47 | `} from "@/runtime/workspaces/amarkhys/amarkhysBusinessIdentity";` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/facture/[token]/details/page.tsx` | 380 | `"Je consulte le détail de ma facture AMARKHYS : " +` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/facture/[token]/details/page.tsx` | 390 | `AMARKHYS` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/facture/[token]/details/page.tsx` | 412 | `Retour au site AMARKHYS` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/facture/[token]/details/page.tsx` | 437 | `AMARKHYS` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/facture/[token]/details/page.tsx` | 555 | `AMARKHYS peut vous communiquer le détail technique complet si nécessaire.` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | garage | `src/app/facture/[token]/details/page.tsx` | 441 | `Garage` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | clientsauto | `src/app/facture/[token]/details/page.tsx` | 30 | `} from "@/runtime/modules/generated/clientsauto";` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/app/facture/[token]/details/page.tsx` | 38 | `} from "@/runtime/modules/generated/interventionsauto";` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | facturesauto | `src/app/facture/[token]/details/page.tsx` | 26 | `} from "@/runtime/modules/generated/facturesauto";` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Module metadata / Runtime audit | vehiculeId | `src/app/facture/[token]/page.tsx` | 500 | `value(loadedInvoice, "vehiculeId")` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/facture/[token]/page.tsx` | 47 | `} from "@/runtime/workspaces/amarkhys/amarkhysBusinessIdentity";` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/facture/[token]/page.tsx` | 571 | `"Je consulte ma facture AMARKHYS : " + summary.numero,` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/facture/[token]/page.tsx` | 616 | `Retour au site AMARKHYS` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/facture/[token]/page.tsx` | 641 | `AMARKHYS` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/facture/[token]/page.tsx` | 652 | `: "Votre facture AMARKHYS"}` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | garage | `src/app/facture/[token]/page.tsx` | 645 | `Garage` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | garage | `src/app/facture/[token]/page.tsx` | 727 | `Cette facture est conservée pour historique. Les paiements et échéanciers associés restent consultables par le garage.` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | garage | `src/app/facture/[token]/page.tsx` | 873 | `Appeler le garage` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | clientsauto | `src/app/facture/[token]/page.tsx` | 33 | `} from "@/runtime/modules/generated/clientsauto";` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | interventionsauto | `src/app/facture/[token]/page.tsx` | 41 | `} from "@/runtime/modules/generated/interventionsauto";` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | facturesauto | `src/app/facture/[token]/page.tsx` | 29 | `} from "@/runtime/modules/generated/facturesauto";` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/layout.tsx` | 4 | `title: "AMARKHYS — Garage premium digitalisé",` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/layout.tsx` | 6 | `"AMARKHYS est un garage automobile premium pour diagnostic, vidange, entretien, suivi atelier et rendez-vous digital.",` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/layout.tsx` | 8 | `"AMARKHYS",` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | garage | `src/app/layout.tsx` | 4 | `title: "AMARKHYS — Garage premium digitalisé",` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | garage | `src/app/layout.tsx` | 6 | `"AMARKHYS est un garage automobile premium pour diagnostic, vidange, entretien, suivi atelier et rendez-vous digital.",` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | garage | `src/app/layout.tsx` | 9 | `"garage premium",` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | garage | `src/app/layout.tsx` | 10 | `"garage automobile",` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/login/page.tsx` | 158 | `"/dashboard/amarkhys"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/login/page.tsx` | 192 | `Cockpit AMARKHYS` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/login/page.tsx` | 207 | `factures, encaissements et reçus dans l’espace AMARKHYS.` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/login/page.tsx` | 240 | `AMARKHYS Garage` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/login/page.tsx` | 266 | `placeholder="demo@amarkhys.com"` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/login/page.tsx` | 308 | `: "Se connecter à AMARKHYS"}` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | amarkhys | `src/app/login/page.tsx` | 314 | `Accès réservé aux utilisateurs autorisés du cockpit AMARKHYS.` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | garage | `src/app/login/page.tsx` | 202 | `Connectez-vous au cockpit garage.` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | garage | `src/app/login/page.tsx` | 240 | `AMARKHYS Garage` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |
| WARN | Architecture / Runtime audit | garage | `src/app/login/page.tsx` | 248 | `Accédez au cockpit garage, aux rendez-vous, interventions,` | À vérifier : route ou page. Acceptable pour navigation déclarative, suspect si règle métier. |


## 9. Findings INFO

| Sévérité | Niveau | Motif | Fichier | Ligne | Extrait | Décision |
|---|---|---|---|---:|---|---|
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 389 | `bufferMinutes?: number;` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 395 | `const bufferMinutes = Math.max(` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 397 | `asNumber(params.bufferMinutes, 0)` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 409 | `visibleDurationMinutes + bufferMinutes;` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 463 | `bufferMinutes * 60 * 1000` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 474 | `// The visible booking ends at endAt, but the blocked range may include bufferMinutes.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 391 | `capacity?: number;` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 418 | `const capacity = Math.max(` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 420 | `asNumber(params.capacity, 1)` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 485 | `Math.max(capacity - usedCapacity, 0);` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 494 | `capacity,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / SchedulingSlotPolicy | slot loop | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 358 | `for (const period of periods) {` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / SchedulingSlotPolicy | slot loop | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 362 | `for (` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Settings + Resolver + Engine | working hours | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 350 | `// Calendar exception can override the standard opening periods for this date.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Settings + Resolver + Engine | working hours | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 394 | `// Generic ERP availability: opening-hours slots minus existing bookings.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Settings + Resolver + Engine | working hours | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 540 | `"Le créneau sélectionné est en dehors des horaires d'ouverture.",` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 49 | `return new Date(` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 96 | `const date = new Date(trimmed);` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 152 | `const date = new Date(trimmed);` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 156 | `String(date.getHours()).padStart(2, "0") +` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 158 | `String(date.getMinutes()).padStart(2, "0")` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 182 | `const date = new Date(` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 225 | `: new Date(left.startAt).getTime();` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 230 | `: new Date(left.endAt).getTime();` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 235 | `: new Date(right.startAt).getTime();` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 240 | `: new Date(right.endAt).getTime();` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 305 | `const startDate = new Date(startAt);` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 306 | `const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 333 | `const date = new Date(normalizedDate + "T00:00:00");` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 455 | `new Date(asString(booking.startAt));` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 458 | `new Date(asString(booking.endAt));` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 461 | `new Date(` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / Date policy | date math | `src/runtime/scheduling/RuntimeSchedulingEngine.ts` | 570 | `const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 133 | `bufferMinutes: 0,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 174 | `bufferMinutes:` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 175 | `moduleScheduling.bufferMinutes ??` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 176 | `RuntimeSchedulingSettingsEngine.engineDefaults.bufferMinutes,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 224 | `const bufferMinutes =` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 226 | `editable.bufferMinutes,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 227 | `RuntimeSchedulingSettingsEngine.engineDefaults.bufferMinutes` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 250 | `bufferMinutes,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 302 | `if (config.bufferMinutes < 0) {` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 304 | `field: "bufferMinutes",` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 134 | `capacity: 1,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 177 | `capacity:` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 178 | `moduleScheduling.capacity ??` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 179 | `RuntimeSchedulingSettingsEngine.engineDefaults.capacity,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 230 | `const capacity =` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 234 | `editable.capacity,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 235 | `RuntimeSchedulingSettingsEngine.engineDefaults.capacity` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 251 | `capacity,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 310 | `if (config.capacity < 1) {` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 312 | `field: "capacity",` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / SchedulingSlotPolicy | slot loop | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 318 | `for (const day of config.openingHoursProfile?.days ?? []) {` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / SchedulingSlotPolicy | slot loop | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 319 | `for (const period of day.periods ?? []) {` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Settings + Resolver + Engine | working hours | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 335 | `message: "Une période d'ouverture doit finir après son début.",` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 61 | `* This must not include bufferMinutes.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 68 | `bufferMinutes?: number;` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 147 | `bufferMinutes: number;` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 73 | `capacity?: number;` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 96 | `* Advanced setting. Used later for resource-specific capacity.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 150 | `* Final slot capacity used by availability/guards.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 152 | `capacity: number;` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Settings + Resolver + Engine | working hours | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 81 | `* Opening hours configurable by tenant/workspace/module.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Settings + Resolver + Engine | working hours | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 155 | `* Final opening hours profile accepted by RuntimeSchedulingEngine.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 133 | `bufferMinutes: 0,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 174 | `bufferMinutes:` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 175 | `moduleScheduling.bufferMinutes ??` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 176 | `RuntimeSchedulingSettingsEngine.engineDefaults.bufferMinutes,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 224 | `const bufferMinutes =` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 226 | `editable.bufferMinutes,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 227 | `RuntimeSchedulingSettingsEngine.engineDefaults.bufferMinutes` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 250 | `bufferMinutes,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 302 | `if (config.bufferMinutes < 0) {` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 304 | `field: "bufferMinutes",` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 134 | `capacity: 1,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 177 | `capacity:` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 178 | `moduleScheduling.capacity ??` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 179 | `RuntimeSchedulingSettingsEngine.engineDefaults.capacity,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 230 | `const capacity =` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 234 | `editable.capacity,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 235 | `RuntimeSchedulingSettingsEngine.engineDefaults.capacity` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 251 | `capacity,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 310 | `if (config.capacity < 1) {` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 312 | `field: "capacity",` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / SchedulingSlotPolicy | slot loop | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 318 | `for (const day of config.openingHoursProfile?.days ?? []) {` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / SchedulingSlotPolicy | slot loop | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 319 | `for (const period of day.periods ?? []) {` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Settings + Resolver + Engine | working hours | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts` | 335 | `message: "Une période d'ouverture doit finir après son début.",` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 61 | `* This must not include bufferMinutes.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 68 | `bufferMinutes?: number;` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 147 | `bufferMinutes: number;` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 73 | `capacity?: number;` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 96 | `* Advanced setting. Used later for resource-specific capacity.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 150 | `* Final slot capacity used by availability/guards.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 152 | `capacity: number;` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Settings + Resolver + Engine | working hours | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 81 | `* Opening hours configurable by tenant/workspace/module.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Settings + Resolver + Engine | working hours | `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts` | 155 | `* Final opening hours profile accepted by RuntimeSchedulingEngine.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 5 | `} from "./rendezvous.actions";` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 9 | `key: "rendezvous",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 28 | `collection: "rendezvous",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 259 | `key: "interventions-rendezvous",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | rendezvous | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 297 | `key: "rendezvous",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | vehiculeId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 42 | `key: "vehiculeId",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | vehiculeId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 163 | `"vehiculeId",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | vehiculeId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 177 | `"vehiculeId",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | vehiculeId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 223 | `resourceField: "vehiculeId",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | vehiculeId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 237 | `labelFields: ["clientId", "vehiculeId", "dateRendezVous", "heureRendezVous", "typeService", "statut"],` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | vehiculeId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 249 | `relationField: "vehiculeId",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | vehiculeId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 272 | `vehiculeId: "vehiculeId",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | vehiculeId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 272 | `vehiculeId: "vehiculeId",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | vehiculeId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 274 | `lockFields: ["rendezVousId", "clientId", "vehiculeId"],` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | vehiculeId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 276 | `subtitleFields: ["clientId", "vehiculeId", "coutTotal"],` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | vehiculeId | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 285 | `field: "vehiculeId",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | amarkhys | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 11 | `description: "Gestion des rendez-vous atelier AMARKHYS",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | amarkhys | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 13 | `category: "amarkhys",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | typeService | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 106 | `key: "typeService",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | typeService | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 167 | `"typeService",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | typeService | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 181 | `"typeService",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Module metadata / Runtime audit | typeService | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 237 | `labelFields: ["clientId", "vehiculeId", "dateRendezVous", "heureRendezVous", "typeService", "statut"],` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | clientsauto | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 35 | `relation: { module: "clientsauto" },` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | clientsauto | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 244 | `moduleKey: "clientsauto",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | clientsauto | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 281 | `moduleKey: "clientsauto",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | interventionsauto | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 100 | `relation: { module: "interventionsauto" },` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | interventionsauto | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 260 | `moduleKey: "interventionsauto",` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | rendezvous | `src/runtime/modules/definitions/coreModules.ts` | 14 | `import { rendezvousModule } from "@/runtime/modules/generated/rendezvous";` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | amarkhys | `src/runtime/modules/definitions/coreModules.ts` | 223 | `* AMARKHYS modules must win over older generic modules.` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | clientsauto | `src/runtime/modules/definitions/coreModules.ts` | 16 | `import { clientsautoModule } from "@/runtime/modules/generated/clientsauto";` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | interventionsauto | `src/runtime/modules/definitions/coreModules.ts` | 12 | `import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto";` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Architecture / Runtime audit | facturesauto | `src/runtime/modules/definitions/coreModules.ts` | 11 | `import { facturesautoModule } from "@/runtime/modules/generated/facturesauto";` | Probablement acceptable si c’est une déclaration metadata et non une logique impérative. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | 469 | `bufferMinutes:` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Settings | bufferMinutes | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | 470 | `schedulingConfig?.bufferMinutes,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | 377 | `const capacity =` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | 380 | `Number(schedulingConfig?.capacity ?? 1) \|\| 1` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | 383 | `if (capacity <= 1) {` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | 425 | `// Generic ERP scheduling guard: capacity is enforced before persistence.` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine + Guard | capacity | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | 473 | `capacity,` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Settings + Resolver + Engine | working hours | `src/runtime/guards/processRuntimeBeforeMutationGuards.ts` | 362 | `"Créneau indisponible selon les horaires d'ouverture."` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |
| INFO | Engine / SchedulingSlotPolicy | slot loop | `src/runtime/business-rules/RuntimeBusinessRulesEngine.ts` | 25 | `for (` | Probablement acceptable dans une couche runtime, à confirmer selon responsabilité exacte. |


## 10. Lecture attendue

### HIGH

À traiter en priorité. Indique généralement une logique runtime ou métier placée au mauvais endroit.

### WARN

À examiner manuellement. Peut être acceptable selon contexte.

### INFO

Souvent acceptable si la logique est déclarative, metadata-driven ou déjà dans une couche runtime correcte.

## 11. Décision attendue après audit

Après lecture du rapport, classer chaque anomalie en :

- UI / Vue ;
- Module metadata ;
- Settings ;
- Resolver ;
- Engine ;
- Guard ;
- Repository.

Puis décider seulement ensuite des corrections.

## 12. Prochaine étape proposée

Après cet audit :

1. identifier les `HIGH` réellement problématiques ;
2. décider ce qui remonte dans `RuntimeSchedulingEngine` ;
3. décider si une `SchedulingSlotPolicy` générique est nécessaire ;
4. décider ce qui reste dans `ERPSchedulingPlanningView` ;
5. préparer une passe corrective séparée, sans patch local AMARKHYS.
