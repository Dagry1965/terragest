# Q-PUBLIC-SCHED-E — Public RDV runtime scheduling flow audit

Date: 2026-05-26T21:34:16.665Z

## Objectif

Auditer le flux public complet avant test manuel réel.

Flux attendu:
- /rdv charge les disponibilités runtime.
- L'utilisateur sélectionne un créneau public.
- La soumission envoie date/heure/durée.
- PublicAppointmentService crée le RDV avec ce créneau.
- Aucun identifiant interne n'est exposé au public.

## Résumé

- Checks: 15
- OK: 15
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers inspectés

- `src/app/rdv/page.tsx`
- `src/components/public/AmarkhysPublicAppointmentLanding.tsx`
- `src/components/public/PublicAppointmentService.ts`
- `src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityTypes.ts`
- `src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts`
- `src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts`
- `src/runtime/scheduling/public/index.ts`
- `src/runtime/scheduling/RuntimeSchedulingEngine.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`

## Checks détaillés


### OK — Q-PUBLIC-SCHED-E-A-01

- Label: Route publique /rdv existe
- Severity: HIGH
- Details: src/app/rdv/page.tsx

### OK — Q-PUBLIC-SCHED-E-A-02

- Label: Landing charge les disponibilités via action publique
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-E-A-03

- Label: Landing affiche des créneaux runtime sélectionnables
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-E-A-04

- Label: Landing exige un créneau avant soumission
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-E-A-05

- Label: Landing transmet date/heure/durée à createPublicAppointment
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-E-A-06

- Label: PublicAppointmentService accepte les champs créneau
- Severity: HIGH
- Details: src/components/public/PublicAppointmentService.ts

### OK — Q-PUBLIC-SCHED-E-A-07

- Label: PublicAppointmentService crée le rendez-vous avec le créneau choisi
- Severity: HIGH
- Details: src/components/public/PublicAppointmentService.ts

### OK — Q-PUBLIC-SCHED-E-A-08

- Label: PublicAppointmentService retourne un DTO public sécurisé
- Severity: HIGH
- Details: src/components/public/PublicAppointmentService.ts

### OK — Q-PUBLIC-SCHED-E-A-09

- Label: Availability service utilise le moteur planning runtime
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts

### OK — Q-PUBLIC-SCHED-E-A-10

- Label: DTO public availability n'expose pas d'identifiants internes
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityTypes.ts

### OK — Q-PUBLIC-SCHED-E-A-11

- Label: Landing ne touche pas Firestore directement
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-E-A-12

- Label: Landing ne rend pas d'identifiants internes
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-E-A-13

- Label: Jours statiques supprimés
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-E-A-14

- Label: Action publique availability exportée
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts, src/runtime/scheduling/public/index.ts

### OK — Q-PUBLIC-SCHED-E-A-15

- Label: RuntimeSchedulingEngine expose toujours getAvailableSlotsWithBookings
- Severity: HIGH
- Details: src/runtime/scheduling/RuntimeSchedulingEngine.ts

## Test manuel recommandé

Aucun échec HIGH. Test manuel recommandé:

1. Ouvrir /rdv.
2. Vérifier que les créneaux se chargent depuis le runtime.
3. Sélectionner un créneau disponible.
4. Vérifier que dateSouhaitee / heureSouhaitee sont alimentées dans le formulaire.
5. Soumettre une demande test.
6. Vérifier dans /rendezvous que le RDV créé porte la date et l'heure choisies.
7. Vérifier qu'aucun codeClient/clientId/rendezvousId n'est affiché côté public.
