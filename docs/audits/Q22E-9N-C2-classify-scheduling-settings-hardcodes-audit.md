# Q22E-9N-C2 — Classify scheduling settings hardcode findings

Date: 2026-05-26T15:25:47.090Z

## Objectif

Classifier les findings Q22E-9N-C pour distinguer les vrais hardcodes runtime des mentions normales dans les modules/routes consommateurs.

Doctrine:

- AMARKHYS/garage ne doivent jamais apparaître comme logique dans le runtime générique.
- rendezvous peut apparaître dans un module consommateur ou une route consommateur.
- rendezvous ne doit pas devenir une règle interne du moteur scheduling.
- vehiculeId/typeService ne doivent pas apparaître dans le moteur générique scheduling.

## Résumé

- Checks: 4
- OK: 2
- FAIL: 2
- FAIL_HIGH: 2
- FAIL_INFO: 0

## Tous les fichiers inspectés

- `docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md`
- `docs/audits/Q22E-9N-C3-scheduling-field-mapping-audit.md`
- `scripts/runtime/audit-q22e9n-c-scheduling-settings-service-action-readiness.cjs`
- `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs`
- `scripts/runtime/audit-q22e9n-c3-scheduling-field-mapping.cjs`
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
- `src/app/(private)/rendezvous/[id]/edit/page.tsx`
- `src/app/(private)/rendezvous/[id]/page.tsx`
- `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx`
- `src/components/erp/runtime/ERPRuntimeAlertsPanel.tsx`
- `src/components/erp/runtime/ERPRuntimeDeadLetterPanel.tsx`
- `src/components/erp/runtime/ERPRuntimeDetails.tsx`
- `src/components/erp/runtime/ERPRuntimeFieldValue.tsx`
- `src/components/erp/runtime/ERPRuntimeForm.tsx`
- `src/components/erp/runtime/ERPRuntimeMetricsPanel.tsx`
- `src/components/erp/runtime/ERPRuntimeOverviewPage.tsx`
- `src/components/erp/runtime/ERPRuntimePage.tsx`
- `src/components/erp/runtime/ERPRuntimeQueuesPanel.tsx`
- `src/components/erp/runtime/ERPRuntimeRetryPanel.tsx`
- `src/components/erp/runtime/ERPRuntimeStatus.tsx`
- `src/components/erp/runtime/ERPRuntimeStatusPanel.tsx`
- `src/components/erp/runtime/ERPRuntimeTable.tsx`
- `src/components/erp/runtime/ERPRuntimeWorkersPanel.tsx`
- `src/components/erp/runtime/index.ts`
- `src/components/erp/runtime-timeline/ERPRuntimeTimeline.tsx`
- `src/components/erp/runtime-ui/ERPDataTableRuntime.tsx`
- `src/components/erp/runtime-ui/ERPRuntimeModulePage.tsx`
- `src/components/erp/runtime-ui/ERPRuntimeRegistryDashboard.tsx`
- `src/components/erp/runtime-ui/index.ts`
- `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx`
- `src/components/erp/scheduling/index.ts`
- `src/runtime/guards/processRuntimeBeforeMutationGuards.ts`
- `src/runtime/guards/RuntimeChronologyGuard.ts`
- `src/runtime/modules/generated/rendezvous/index.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.automation.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.dashboard.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.permissions.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.workflows.ts`
- `src/runtime/relations/index.ts`
- `src/runtime/relations/RuntimeRelation.ts`
- `src/runtime/relations/RuntimeRelationFilterEngine.ts`
- `src/runtime/relations/RuntimeRelationLabelEngine.ts`
- `src/runtime/relations/RuntimeRelationLabelResolver.ts`
- `src/runtime/relations/runtimeRelations.ts`
- `src/runtime/relations/RuntimeRelationsEngine.ts`
- `src/runtime/scheduling/index.ts`
- `src/runtime/scheduling/RuntimeOpeningHours.ts`
- `src/runtime/scheduling/RuntimeSchedulingEngine.ts`
- `src/runtime/scheduling/RuntimeSchedulingTypes.ts`
- `src/runtime/scheduling/SchedulingSlotPolicy.ts`
- `src/runtime/scheduling/settings/index.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts`

## Matches runtime génériques

- `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:192` — if (childModuleKey === "rendezvous") {
- `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:195` — record.dateRendezVous,
- `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:196` — record.heureRendezVous,
- `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:233` — record.dateRendezVous,
- `src/components/erp/runtime/ERPRuntimeDetails.tsx:68` — if (data.vehiculeId) {
- `src/components/erp/runtime/ERPRuntimeDetails.tsx:70` — "vehiculeId",
- `src/components/erp/runtime/ERPRuntimeDetails.tsx:71` — String(data.vehiculeId)
- `src/components/erp/runtime/ERPRuntimeDetails.tsx:101` — "factureId,clientId,vehiculeId"
- `src/components/erp/runtime/ERPRuntimePage.tsx:62` — if (record.vehiculeId) {
- `src/components/erp/runtime/ERPRuntimePage.tsx:64` — "vehiculeId",
- `src/components/erp/runtime/ERPRuntimePage.tsx:65` — String(record.vehiculeId)
- `src/components/erp/runtime/ERPRuntimePage.tsx:93` — "factureId,clientId,vehiculeId"
- `src/components/erp/runtime/ERPRuntimePage.tsx:181` — module?.metadata?.key === "rendezvous"
- `src/components/erp/runtime/ERPRuntimePage.tsx:226` — // The first consumer is rendezvous, but this remains runtime-driven.
- `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:371` — // This remains generic: rendezvous provides date/time/duration, the engine validates the slot.
- `src/runtime/guards/RuntimeChronologyGuard.ts:133` — const rendezVousId =
- `src/runtime/guards/RuntimeChronologyGuard.ts:134` — asString(record.rendezVousId);
- `src/runtime/guards/RuntimeChronologyGuard.ts:136` — if (!rendezVousId) {
- `src/runtime/guards/RuntimeChronologyGuard.ts:140` — const rendezvous =
- `src/runtime/guards/RuntimeChronologyGuard.ts:142` — "rendezvous",
- `src/runtime/guards/RuntimeChronologyGuard.ts:143` — rendezVousId
- `src/runtime/guards/RuntimeChronologyGuard.ts:146` — if (!rendezvous) {
- `src/runtime/guards/RuntimeChronologyGuard.ts:153` — const dateRendezVous =
- `src/runtime/guards/RuntimeChronologyGuard.ts:154` — asDateOnly(rendezvous.dateRendezVous);
- `src/runtime/guards/RuntimeChronologyGuard.ts:158` — dateRendezVous &&
- `src/runtime/guards/RuntimeChronologyGuard.ts:159` — compareDateOnly(dateIntervention, dateRendezVous) < 0
- `src/runtime/guards/RuntimeChronologyGuard.ts:275` — ["dateIntervention", "rendezVousId"]

## Matches tolérés metadata/routes/scripts/docs

- `docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:17` — - Pas de hardcode AMARKHYS/garage/rendezvous dans une couche générique.
- `docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:118` — - `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`
- `docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:179` — - Label: Aucune couche action/service ne hardcode AMARKHYS/garage autour du scheduling settings
- `docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:181` — - Details: src/components/erp/runtime/ERPRuntimePage.tsx, src/components/erp/scheduling/ERPSchedulingPlanningView.tsx, src/runtime/guards/processRuntimeBeforeMutationGuards.ts, src/runtime/modules/generated/rendezvous/rendezvous.module.ts, src/runtime/relations/RuntimeRelationLabelResolver.ts, src/runtime/scheduling/RuntimeSchedulingEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts
- `docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:185` — - Label: Aucune couche action/service ne hardcode rendezvous comme moteur générique
- `docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:187` — - Details: src/components/erp/runtime/ERPRuntimePage.tsx, src/components/erp/scheduling/ERPSchedulingPlanningView.tsx, src/runtime/guards/processRuntimeBeforeMutationGuards.ts, src/runtime/modules/generated/rendezvous/rendezvous.module.ts, src/runtime/relations/RuntimeRelationLabelResolver.ts, src/runtime/scheduling/RuntimeSchedulingEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:11` — - AMARKHYS/garage ne doivent jamais apparaître comme logique dans le runtime générique.
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:12` — - rendezvous peut apparaître dans un module consommateur ou une route consommateur.
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:13` — - rendezvous ne doit pas devenir une règle interne du moteur scheduling.
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:14` — - vehiculeId/typeService ne doivent pas apparaître dans le moteur générique scheduling.
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:29` — - `src/app/(private)/rendezvous/analytics/page.tsx`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:30` — - `src/app/(private)/rendezvous/audit/page.tsx`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:31` — - `src/app/(private)/rendezvous/dashboard/page.tsx`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:32` — - `src/app/(private)/rendezvous/export/page.tsx`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:33` — - `src/app/(private)/rendezvous/import/page.tsx`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:34` — - `src/app/(private)/rendezvous/nouveau/page.tsx`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:35` — - `src/app/(private)/rendezvous/page.tsx`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:36` — - `src/app/(private)/rendezvous/planning/page.tsx`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:37` — - `src/app/(private)/rendezvous/relations/page.tsx`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:38` — - `src/app/(private)/rendezvous/workflows/page.tsx`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:39` — - `src/app/(private)/rendezvous/[id]/edit/page.tsx`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:40` — - `src/app/(private)/rendezvous/[id]/page.tsx`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:66` — - `src/runtime/modules/generated/rendezvous/index.ts`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:67` — - `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:68` — - `src/runtime/modules/generated/rendezvous/rendezvous.automation.ts`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:69` — - `src/runtime/modules/generated/rendezvous/rendezvous.dashboard.ts`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:70` — - `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:71` — - `src/runtime/modules/generated/rendezvous/rendezvous.permissions.ts`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:72` — - `src/runtime/modules/generated/rendezvous/rendezvous.workflows.ts`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:93` — - `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:192` — if (childModuleKey === "rendezvous") {
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:94` — - `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:195` — record.dateRendezVous,
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:95` — - `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:196` — record.heureRendezVous,
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:96` — - `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:233` — record.dateRendezVous,
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:97` — - `src/components/erp/runtime/ERPRuntimeDetails.tsx:68` — if (data.vehiculeId) {
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:98` — - `src/components/erp/runtime/ERPRuntimeDetails.tsx:70` — "vehiculeId",
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:99` — - `src/components/erp/runtime/ERPRuntimeDetails.tsx:71` — String(data.vehiculeId)
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:100` — - `src/components/erp/runtime/ERPRuntimeDetails.tsx:101` — "factureId,clientId,vehiculeId"
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:101` — - `src/components/erp/runtime/ERPRuntimePage.tsx:62` — if (record.vehiculeId) {
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:102` — - `src/components/erp/runtime/ERPRuntimePage.tsx:64` — "vehiculeId",
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:103` — - `src/components/erp/runtime/ERPRuntimePage.tsx:65` — String(record.vehiculeId)
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:104` — - `src/components/erp/runtime/ERPRuntimePage.tsx:93` — "factureId,clientId,vehiculeId"
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:105` — - `src/components/erp/runtime/ERPRuntimePage.tsx:181` — module?.metadata?.key === "rendezvous"
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:106` — - `src/components/erp/runtime/ERPRuntimePage.tsx:226` — // The first consumer is rendezvous, but this remains runtime-driven.
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:107` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:176` — function isRendezvousModule(module: ERPModule): boolean {
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:108` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:177` — return module.metadata.key === "rendezvous";
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:109` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:201` — asString(record.dateRendezVous) &&
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:110` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:202` — asString(record.heureRendezVous)
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:111` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:224` — function assertRendezvousServiceType(record: RuntimeRecord): void {
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:112` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:225` — const typeService =
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:113` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:226` — asString(record.typeService);
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:114` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:228` — if (!typeService) {
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:115` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:271` — async function loadExistingRendezvousForConflictCheck(
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:116` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:304` — async function guardRendezvousMutation(
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:117` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:339` — assertRendezvousServiceType(mergedRecord);
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:118` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:357` — // This remains generic: rendezvous provides date/time/duration, the engine validates the slot.
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:119` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:358` — date: asString(mergedRecord.dateRendezVous),
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:120` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:359` — time: asString(mergedRecord.heureRendezVous),
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:121` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:382` — await loadExistingRendezvousForConflictCheck(
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:122` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:466` — date: asString(mergedRecord.dateRendezVous),
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:123` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:479` — asString(mergedRecord.heureRendezVous);
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:124` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:525` — if (isRendezvousModule(module)) {
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:125` — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:527` — await guardRendezvousMutation(
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:126` — - `src/runtime/guards/RuntimeChronologyGuard.ts:133` — const rendezVousId =
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:127` — - `src/runtime/guards/RuntimeChronologyGuard.ts:134` — asString(record.rendezVousId);
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:128` — - `src/runtime/guards/RuntimeChronologyGuard.ts:136` — if (!rendezVousId) {
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:129` — - `src/runtime/guards/RuntimeChronologyGuard.ts:140` — const rendezvous =
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:130` — - `src/runtime/guards/RuntimeChronologyGuard.ts:142` — "rendezvous",
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:131` — - `src/runtime/guards/RuntimeChronologyGuard.ts:143` — rendezVousId
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:132` — - `src/runtime/guards/RuntimeChronologyGuard.ts:146` — if (!rendezvous) {
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:133` — - `src/runtime/guards/RuntimeChronologyGuard.ts:153` — const dateRendezVous =
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:134` — - `src/runtime/guards/RuntimeChronologyGuard.ts:154` — asDateOnly(rendezvous.dateRendezVous);
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:135` — - `src/runtime/guards/RuntimeChronologyGuard.ts:158` — dateRendezVous &&
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:136` — - `src/runtime/guards/RuntimeChronologyGuard.ts:159` — compareDateOnly(dateIntervention, dateRendezVous) < 0
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:137` — - `src/runtime/guards/RuntimeChronologyGuard.ts:275` — ["dateIntervention", "rendezVousId"]
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:138` — - `src/runtime/scheduling/RuntimeSchedulingEngine.ts:27` — dateField: "dateRendezVous",
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:139` — - `src/runtime/scheduling/RuntimeSchedulingEngine.ts:28` — timeField: "heureRendezVous",
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:140` — - `src/runtime/scheduling/RuntimeSchedulingEngine.ts:120` — const dateRendezVous = asString(record.dateRendezVous);
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:141` — - `src/runtime/scheduling/RuntimeSchedulingEngine.ts:121` — const heureRendezVous = asString(record.heureRendezVous);
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:142` — - `src/runtime/scheduling/RuntimeSchedulingEngine.ts:123` — return Boolean(dateRendezVous && heureRendezVous);
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:143` — - `src/runtime/scheduling/RuntimeSchedulingEngine.ts:610` — "Impossible de calculer le créneau : dateRendezVous et heureRendezVous sont obligatoires."
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:147` — - `docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:17` — - Pas de hardcode AMARKHYS/garage/rendezvous dans une couche générique.
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:148` — - `docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:118` — - `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:149` — - `docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:179` — - Label: Aucune couche action/service ne hardcode AMARKHYS/garage autour du scheduling settings
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:150` — - `docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:181` — - Details: src/components/erp/runtime/ERPRuntimePage.tsx, src/components/erp/scheduling/ERPSchedulingPlanningView.tsx, src/runtime/guards/processRuntimeBeforeMutationGuards.ts, src/runtime/modules/generated/rendezvous/rendezvous.module.ts, src/runtime/relations/RuntimeRelationLabelResolver.ts, src/runtime/scheduling/RuntimeSchedulingEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:151` — - `docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:185` — - Label: Aucune couche action/service ne hardcode rendezvous comme moteur générique
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:152` — - `docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:187` — - Details: src/components/erp/runtime/ERPRuntimePage.tsx, src/components/erp/scheduling/ERPSchedulingPlanningView.tsx, src/runtime/guards/processRuntimeBeforeMutationGuards.ts, src/runtime/modules/generated/rendezvous/rendezvous.module.ts, src/runtime/relations/RuntimeRelationLabelResolver.ts, src/runtime/scheduling/RuntimeSchedulingEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:153` — - `scripts/runtime/audit-q22e9n-c-scheduling-settings-service-action-readiness.cjs:247` — "Aucune couche action/service ne hardcode AMARKHYS/garage autour du scheduling settings",
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:154` — - `scripts/runtime/audit-q22e9n-c-scheduling-settings-service-action-readiness.cjs:249` — has(read(file), /amarkhys|garage/i)
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:155` — - `scripts/runtime/audit-q22e9n-c-scheduling-settings-service-action-readiness.cjs:257` — "Aucune couche action/service ne hardcode rendezvous comme moteur générique",
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:156` — - `scripts/runtime/audit-q22e9n-c-scheduling-settings-service-action-readiness.cjs:259` — has(read(file), /rendezvous/i) && !/src\/app\/\(private\)\/rendezvous/.test(file)
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:157` — - `scripts/runtime/audit-q22e9n-c-scheduling-settings-service-action-readiness.cjs:330` — - Pas de hardcode AMARKHYS/garage/rendezvous dans une couche générique.
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:158` — - `scripts/runtime/audit-q22e9n-c-scheduling-settings-service-action-readiness.cjs:427` — - Elle ne devra pas contenir de logique AMARKHYS/garage/rendezvous.
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:159` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:92` — /src\/runtime\/modules\/generated\/rendezvous\/rendezvous\.module\.ts$/.test(file) ||
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:160` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:93` — /src\/app\/\(private\)\/rendezvous\//.test(file) ||
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:161` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:94` — /src\/app\/\(private\)\/rendezvous\/planning\/page\.tsx$/.test(file) ||
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:162` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:113` — return /amarkhys|garage|vehiculeId|typeService/i.test(match.text);
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:163` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:116` — function isSuspiciousRendezvousInGenericRuntime(match) {
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:164` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:119` — if (!/rendezvous/i.test(match.text)) return false;
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:165` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:141` — /src\/runtime\/scheduling|src\/runtime\/guards|src\/runtime\/relations|src\/components\/erp\/scheduling|src\/components\/erp\/runtime|src\/runtime\/modules\/generated\/rendezvous|src\/app\/\(private\)\/rendezvous|docs\/audits\/Q22E-9N-C|scripts\/runtime\/audit-q22e9n-c/i.test(
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:166` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:148` — /amarkhys/i,
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:167` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:149` — /garage/i,
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:168` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:150` — /rendezvous/i,
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:169` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:151` — /vehiculeId/i,
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:170` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:152` — /typeService/i,
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:171` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:159` — const suspiciousRendezvousMatches = matches.filter(isSuspiciousRendezvousInGenericRuntime);
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:172` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:168` — "Aucun hardcode AMARKHYS/garage/vehiculeId/typeService dans runtime générique scheduling",
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:173` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:178` — "Aucun rendezvous suspect codé comme règle générique",
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:174` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:179` — suspiciousRendezvousMatches.length === 0,
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:175` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:180` — suspiciousRendezvousMatches
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:176` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:188` — "Les mentions rendezvous dans metadata/routes consommatrices sont tolérées",
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:177` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:219` — - AMARKHYS/garage ne doivent jamais apparaître comme logique dans le runtime générique.
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:178` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:220` — - rendezvous peut apparaître dans un module consommateur ou une route consommateur.
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:179` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:221` — - rendezvous ne doit pas devenir une règle interne du moteur scheduling.
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:180` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:222` — - vehiculeId/typeService ne doivent pas apparaître dans le moteur générique scheduling.
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:181` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:267` — ## Rendezvous suspects potentiels
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:182` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:270` — suspiciousRendezvousMatches.length
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:183` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:271` — ? suspiciousRendezvousMatches
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:184` — - `scripts/runtime/audit-q22e9n-c2-classify-scheduling-settings-hardcodes.cjs:274` — : "- Aucun rendezvous suspect détecté."
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:185` — - `src/app/(private)/rendezvous/analytics/page.tsx:3` — export default function RendezvousAnalyticsPage() {
- `docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:186` — - `src/app/(private)/rendezvous/analytics/page.tsx:6` — module="rendezvous"

## Vrais matches interdits potentiels

- `src/components/erp/runtime/ERPRuntimeDetails.tsx:68` — if (data.vehiculeId) {
- `src/components/erp/runtime/ERPRuntimeDetails.tsx:70` — "vehiculeId",
- `src/components/erp/runtime/ERPRuntimeDetails.tsx:71` — String(data.vehiculeId)
- `src/components/erp/runtime/ERPRuntimeDetails.tsx:101` — "factureId,clientId,vehiculeId"
- `src/components/erp/runtime/ERPRuntimePage.tsx:62` — if (record.vehiculeId) {
- `src/components/erp/runtime/ERPRuntimePage.tsx:64` — "vehiculeId",
- `src/components/erp/runtime/ERPRuntimePage.tsx:65` — String(record.vehiculeId)
- `src/components/erp/runtime/ERPRuntimePage.tsx:93` — "factureId,clientId,vehiculeId"

## Rendezvous suspects potentiels

- `src/components/erp/runtime/ERPRuntimePage.tsx:226` — // The first consumer is rendezvous, but this remains runtime-driven.
- `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:371` — // This remains generic: rendezvous provides date/time/duration, the engine validates the slot.
- `src/runtime/guards/RuntimeChronologyGuard.ts:133` — const rendezVousId =
- `src/runtime/guards/RuntimeChronologyGuard.ts:136` — if (!rendezVousId) {
- `src/runtime/guards/RuntimeChronologyGuard.ts:140` — const rendezvous =
- `src/runtime/guards/RuntimeChronologyGuard.ts:142` — "rendezvous",
- `src/runtime/guards/RuntimeChronologyGuard.ts:143` — rendezVousId
- `src/runtime/guards/RuntimeChronologyGuard.ts:146` — if (!rendezvous) {
- `src/runtime/guards/RuntimeChronologyGuard.ts:153` — const dateRendezVous =
- `src/runtime/guards/RuntimeChronologyGuard.ts:154` — asDateOnly(rendezvous.dateRendezVous);
- `src/runtime/guards/RuntimeChronologyGuard.ts:158` — dateRendezVous &&
- `src/runtime/guards/RuntimeChronologyGuard.ts:159` — compareDateOnly(dateIntervention, dateRendezVous) < 0
- `src/runtime/guards/RuntimeChronologyGuard.ts:275` — ["dateIntervention", "rendezVousId"]

## Checks détaillés


### FAIL — Q22E-9N-C2-01

- Label: Aucun hardcode AMARKHYS/garage/vehiculeId/typeService dans runtime générique scheduling
- Severity: HIGH
- Details:
src/components/erp/runtime/ERPRuntimeDetails.tsx:68 — if (data.vehiculeId) {
src/components/erp/runtime/ERPRuntimeDetails.tsx:70 — "vehiculeId",
src/components/erp/runtime/ERPRuntimeDetails.tsx:71 — String(data.vehiculeId)
src/components/erp/runtime/ERPRuntimeDetails.tsx:101 — "factureId,clientId,vehiculeId"
src/components/erp/runtime/ERPRuntimePage.tsx:62 — if (record.vehiculeId) {
src/components/erp/runtime/ERPRuntimePage.tsx:64 — "vehiculeId",
src/components/erp/runtime/ERPRuntimePage.tsx:65 — String(record.vehiculeId)
src/components/erp/runtime/ERPRuntimePage.tsx:93 — "factureId,clientId,vehiculeId"

### FAIL — Q22E-9N-C2-02

- Label: Aucun rendezvous suspect codé comme règle générique
- Severity: HIGH
- Details:
src/components/erp/runtime/ERPRuntimePage.tsx:226 — // The first consumer is rendezvous, but this remains runtime-driven.
src/runtime/guards/processRuntimeBeforeMutationGuards.ts:371 — // This remains generic: rendezvous provides date/time/duration, the engine validates the slot.
src/runtime/guards/RuntimeChronologyGuard.ts:133 — const rendezVousId =
src/runtime/guards/RuntimeChronologyGuard.ts:136 — if (!rendezVousId) {
src/runtime/guards/RuntimeChronologyGuard.ts:140 — const rendezvous =
src/runtime/guards/RuntimeChronologyGuard.ts:142 — "rendezvous",
src/runtime/guards/RuntimeChronologyGuard.ts:143 — rendezVousId
src/runtime/guards/RuntimeChronologyGuard.ts:146 — if (!rendezvous) {
src/runtime/guards/RuntimeChronologyGuard.ts:153 — const dateRendezVous =
src/runtime/guards/RuntimeChronologyGuard.ts:154 — asDateOnly(rendezvous.dateRendezVous);
src/runtime/guards/RuntimeChronologyGuard.ts:158 — dateRendezVous &&
src/runtime/guards/RuntimeChronologyGuard.ts:159 — compareDateOnly(dateIntervention, dateRendezVous) < 0
src/runtime/guards/RuntimeChronologyGuard.ts:275 — ["dateIntervention", "rendezVousId"]

### OK — Q22E-9N-C2-03

- Label: Les mentions rendezvous dans metadata/routes consommatrices sont tolérées
- Severity: INFO
- Details:
docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:17 — - Pas de hardcode AMARKHYS/garage/rendezvous dans une couche générique.
docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:118 — - `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`
docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:179 — - Label: Aucune couche action/service ne hardcode AMARKHYS/garage autour du scheduling settings
docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:181 — - Details: src/components/erp/runtime/ERPRuntimePage.tsx, src/components/erp/scheduling/ERPSchedulingPlanningView.tsx, src/runtime/guards/processRuntimeBeforeMutationGuards.ts, src/runtime/modules/generated/rendezvous/rendezvous.module.ts, src/runtime/relations/RuntimeRelationLabelResolver.ts, src/runtime/scheduling/RuntimeSchedulingEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts
docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:185 — - Label: Aucune couche action/service ne hardcode rendezvous comme moteur générique
docs/audits/Q22E-9N-C-scheduling-settings-service-action-readiness-audit.md:187 — - Details: src/components/erp/runtime/ERPRuntimePage.tsx, src/components/erp/scheduling/ERPSchedulingPlanningView.tsx, src/runtime/guards/processRuntimeBeforeMutationGuards.ts, src/runtime/modules/generated/rendezvous/rendezvous.module.ts, src/runtime/relations/RuntimeRelationLabelResolver.ts, src/runtime/scheduling/RuntimeSchedulingEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:11 — - AMARKHYS/garage ne doivent jamais apparaître comme logique dans le runtime générique.
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:12 — - rendezvous peut apparaître dans un module consommateur ou une route consommateur.
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:13 — - rendezvous ne doit pas devenir une règle interne du moteur scheduling.
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:14 — - vehiculeId/typeService ne doivent pas apparaître dans le moteur générique scheduling.
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:29 — - `src/app/(private)/rendezvous/analytics/page.tsx`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:30 — - `src/app/(private)/rendezvous/audit/page.tsx`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:31 — - `src/app/(private)/rendezvous/dashboard/page.tsx`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:32 — - `src/app/(private)/rendezvous/export/page.tsx`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:33 — - `src/app/(private)/rendezvous/import/page.tsx`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:34 — - `src/app/(private)/rendezvous/nouveau/page.tsx`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:35 — - `src/app/(private)/rendezvous/page.tsx`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:36 — - `src/app/(private)/rendezvous/planning/page.tsx`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:37 — - `src/app/(private)/rendezvous/relations/page.tsx`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:38 — - `src/app/(private)/rendezvous/workflows/page.tsx`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:39 — - `src/app/(private)/rendezvous/[id]/edit/page.tsx`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:40 — - `src/app/(private)/rendezvous/[id]/page.tsx`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:66 — - `src/runtime/modules/generated/rendezvous/index.ts`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:67 — - `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:68 — - `src/runtime/modules/generated/rendezvous/rendezvous.automation.ts`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:69 — - `src/runtime/modules/generated/rendezvous/rendezvous.dashboard.ts`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:70 — - `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:71 — - `src/runtime/modules/generated/rendezvous/rendezvous.permissions.ts`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:72 — - `src/runtime/modules/generated/rendezvous/rendezvous.workflows.ts`
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:93 — - `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:192` — if (childModuleKey === "rendezvous") {
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:94 — - `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:195` — record.dateRendezVous,
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:95 — - `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:196` — record.heureRendezVous,
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:96 — - `src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:233` — record.dateRendezVous,
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:97 — - `src/components/erp/runtime/ERPRuntimeDetails.tsx:68` — if (data.vehiculeId) {
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:98 — - `src/components/erp/runtime/ERPRuntimeDetails.tsx:70` — "vehiculeId",
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:99 — - `src/components/erp/runtime/ERPRuntimeDetails.tsx:71` — String(data.vehiculeId)
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:100 — - `src/components/erp/runtime/ERPRuntimeDetails.tsx:101` — "factureId,clientId,vehiculeId"
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:101 — - `src/components/erp/runtime/ERPRuntimePage.tsx:62` — if (record.vehiculeId) {
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:102 — - `src/components/erp/runtime/ERPRuntimePage.tsx:64` — "vehiculeId",
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:103 — - `src/components/erp/runtime/ERPRuntimePage.tsx:65` — String(record.vehiculeId)
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:104 — - `src/components/erp/runtime/ERPRuntimePage.tsx:93` — "factureId,clientId,vehiculeId"
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:105 — - `src/components/erp/runtime/ERPRuntimePage.tsx:181` — module?.metadata?.key === "rendezvous"
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:106 — - `src/components/erp/runtime/ERPRuntimePage.tsx:226` — // The first consumer is rendezvous, but this remains runtime-driven.
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:107 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:176` — function isRendezvousModule(module: ERPModule): boolean {
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:108 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:177` — return module.metadata.key === "rendezvous";
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:109 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:201` — asString(record.dateRendezVous) &&
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:110 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:202` — asString(record.heureRendezVous)
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:111 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:224` — function assertRendezvousServiceType(record: RuntimeRecord): void {
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:112 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:225` — const typeService =
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:113 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:226` — asString(record.typeService);
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:114 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:228` — if (!typeService) {
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:115 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:271` — async function loadExistingRendezvousForConflictCheck(
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:116 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:304` — async function guardRendezvousMutation(
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:117 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:339` — assertRendezvousServiceType(mergedRecord);
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:118 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:357` — // This remains generic: rendezvous provides date/time/duration, the engine validates the slot.
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:119 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:358` — date: asString(mergedRecord.dateRendezVous),
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:120 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:359` — time: asString(mergedRecord.heureRendezVous),
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:121 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:382` — await loadExistingRendezvousForConflictCheck(
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:122 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:466` — date: asString(mergedRecord.dateRendezVous),
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:123 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:479` — asString(mergedRecord.heureRendezVous);
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:124 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:525` — if (isRendezvousModule(module)) {
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:125 — - `src/runtime/guards/processRuntimeBeforeMutationGuards.ts:527` — await guardRendezvousMutation(
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:126 — - `src/runtime/guards/RuntimeChronologyGuard.ts:133` — const rendezVousId =
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:127 — - `src/runtime/guards/RuntimeChronologyGuard.ts:134` — asString(record.rendezVousId);
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:128 — - `src/runtime/guards/RuntimeChronologyGuard.ts:136` — if (!rendezVousId) {
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:129 — - `src/runtime/guards/RuntimeChronologyGuard.ts:140` — const rendezvous =
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:130 — - `src/runtime/guards/RuntimeChronologyGuard.ts:142` — "rendezvous",
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:131 — - `src/runtime/guards/RuntimeChronologyGuard.ts:143` — rendezVousId
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:132 — - `src/runtime/guards/RuntimeChronologyGuard.ts:146` — if (!rendezvous) {
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:133 — - `src/runtime/guards/RuntimeChronologyGuard.ts:153` — const dateRendezVous =
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:134 — - `src/runtime/guards/RuntimeChronologyGuard.ts:154` — asDateOnly(rendezvous.dateRendezVous);
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:135 — - `src/runtime/guards/RuntimeChronologyGuard.ts:158` — dateRendezVous &&
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:136 — - `src/runtime/guards/RuntimeChronologyGuard.ts:159` — compareDateOnly(dateIntervention, dateRendezVous) < 0
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:137 — - `src/runtime/guards/RuntimeChronologyGuard.ts:275` — ["dateIntervention", "rendezVousId"]
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:138 — - `src/runtime/scheduling/RuntimeSchedulingEngine.ts:27` — dateField: "dateRendezVous",
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:139 — - `src/runtime/scheduling/RuntimeSchedulingEngine.ts:28` — timeField: "heureRendezVous",
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:140 — - `src/runtime/scheduling/RuntimeSchedulingEngine.ts:120` — const dateRendezVous = asString(record.dateRendezVous);
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:141 — - `src/runtime/scheduling/RuntimeSchedulingEngine.ts:121` — const heureRendezVous = asString(record.heureRendezVous);
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:142 — - `src/runtime/scheduling/RuntimeSchedulingEngine.ts:123` — return Boolean(dateRendezVous && heureRendezVous);
docs/audits/Q22E-9N-C2-classify-scheduling-settings-hardcodes-audit.md:143 — - `src/runtime/scheduling/RuntimeSchedulingEngine.ts:610` — "Impossible de calculer le créneau : dateRendezVous et heureRendezVous sont obligatoires."

### OK — Q22E-9N-C2-04

- Label: Les fichiers runtime génériques scannés sont identifiés
- Severity: INFO
- Details:
src/components/erp/runtime/ERPRelatedRecordsPanel.tsx
src/components/erp/runtime/ERPRuntimeDetails.tsx
src/components/erp/runtime/ERPRuntimePage.tsx
src/runtime/guards/processRuntimeBeforeMutationGuards.ts
src/runtime/guards/RuntimeChronologyGuard.ts

## Décision recommandée

Des hardcodes runtime génériques sont confirmés ou suspects.

Suite recommandée:
- Q22E-9N-C3 — corriger les hardcodes confirmés avant de créer une couche service/action.
