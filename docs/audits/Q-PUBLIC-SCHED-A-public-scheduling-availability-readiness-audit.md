# Q-PUBLIC-SCHED-A — Public scheduling availability readiness audit

Date: 2026-05-26T20:29:13.400Z

## Objectif

Auditer la readiness pour permettre à la page publique /rdv d'afficher les disponibilités réelles du RuntimeSchedulingEngine.

Doctrine:
- La page publique ne calcule pas les slots.
- La page publique ne lit pas Firestore.
- La page publique ne reçoit pas d'identifiants internes.
- Le runtime scheduling calcule.
- Une couche public availability retourne un DTO public.

## Résumé

- Checks: 15
- OK: 13
- FAIL: 2
- FAIL_HIGH: 0
- FAIL_INFO: 2

## Fichiers inspectés

- `src/app/rdv/page.tsx`
- `src/components/public/AmarkhysPublicAppointmentLanding.tsx`
- `src/components/public/PublicAppointmentService.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts`
- `src/runtime/scheduling/SchedulingSlotPolicy.ts`
- `src/runtime/scheduling/RuntimeSchedulingEngine.ts`
- `src/runtime/scheduling/RuntimeSchedulingTypes.ts`
- `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx`
- `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`

## Candidats public scheduling existants

- `src/components/amarkhys/public/AmarkhysAppointmentCalendar.tsx`
- `src/components/erp/forms/enterprise/ERPFormField.tsx`
- `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx`
- `src/runtime/guards/processRuntimeBeforeMutationGuards.ts`
- `src/runtime/scheduling/RuntimeSchedulingEngine.ts`
- `src/runtime/scheduling/RuntimeSchedulingTypes.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts`

## Accès Firestore direct public

- Aucun.

## Risques de fuite interne

- `src/components/public/PublicAppointmentService.ts`

## Checks détaillés


### OK — Q-PUBLIC-SCHED-A-01

- Label: Page publique /rdv existe
- Severity: HIGH
- Details: src/app/rdv/page.tsx

### OK — Q-PUBLIC-SCHED-A-02

- Label: Page /rdv utilise le composant public RDV
- Severity: HIGH
- Details: src/app/rdv/page.tsx

### OK — Q-PUBLIC-SCHED-A-03

- Label: Composant public RDV existe
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-A-04

- Label: Service public RDV existe
- Severity: HIGH
- Details: src/components/public/PublicAppointmentService.ts

### OK — Q-PUBLIC-SCHED-A-05

- Label: Le service public crée actuellement des records internes client/véhicule/rdv
- Severity: INFO
- Details: src/components/public/PublicAppointmentService.ts

### OK — Q-PUBLIC-SCHED-A-06

- Label: Le service public ne doit pas retourner de record runtime complet
- Severity: HIGH
- Details: src/components/public/PublicAppointmentService.ts

### OK — Q-PUBLIC-SCHED-A-07

- Label: Aucun accès Firestore direct dans page/landing/service public
- Severity: HIGH
- Details: OK

### OK — Q-PUBLIC-SCHED-A-08

- Label: La page publique ne calcule pas encore les slots via runtime availability
- Severity: INFO
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-A-09

- Label: Le composant public contient encore des jours/créneaux statiques à remplacer
- Severity: INFO
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-A-10

- Label: Settings resolver scheduling existe
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts

### OK — Q-PUBLIC-SCHED-A-11

- Label: Scheduling engine runtime existe et reste générique
- Severity: HIGH
- Details: src/runtime/scheduling/RuntimeSchedulingEngine.ts

### OK — Q-PUBLIC-SCHED-A-12

- Label: Planning view privé consomme déjà le resolver/settings runtime
- Severity: HIGH
- Details: src/components/erp/scheduling/ERPSchedulingPlanningView.tsx

### OK — Q-PUBLIC-SCHED-A-13

- Label: Module rendezvous déclare la configuration scheduling
- Severity: HIGH
- Details: src/runtime/modules/generated/rendezvous/rendezvous.module.ts

### FAIL — Q-PUBLIC-SCHED-A-14

- Label: Aucune couche public scheduling availability dédiée n'existe encore
- Severity: INFO
- Details: src/components/amarkhys/public/AmarkhysAppointmentCalendar.tsx, src/components/erp/forms/enterprise/ERPFormField.tsx, src/components/erp/scheduling/ERPSchedulingPlanningView.tsx, src/runtime/guards/processRuntimeBeforeMutationGuards.ts, src/runtime/scheduling/RuntimeSchedulingEngine.ts, src/runtime/scheduling/RuntimeSchedulingTypes.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts

### FAIL — Q-PUBLIC-SCHED-A-15

- Label: Risque de fuite interne public détecté à traiter avant branchement complet
- Severity: INFO
- Details: src/components/public/PublicAppointmentService.ts

## Décision recommandée

Aucun échec HIGH bloquant pour démarrer la conception.

Suite recommandée:
1. Q-PUBLIC-SCHED-B — corriger le DTO public de createPublicAppointment.
2. Q-PUBLIC-SCHED-C — créer une couche Public Scheduling Availability service/action.
3. Q-PUBLIC-SCHED-D — connecter /rdv à cette availability.
4. Q-PUBLIC-SCHED-E — envoyer le créneau choisi dans createPublicAppointment.
