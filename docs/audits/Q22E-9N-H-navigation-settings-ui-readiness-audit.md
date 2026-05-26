# Q22E-9N-H — Navigation/settings UI runtime usage readiness audit

Date: 2026-05-26T16:41:46.939Z

## Objectif

Auditer l'intégration de l'UI paramètres planning dans la navigation avant modification.

Doctrine:
- Ne pas patcher localement un menu au hasard.
- Identifier le bon point de navigation existant.
- Garder l'UI générique.
- Aucun accès Firestore/repository depuis l'UI.
- Accès uniquement via server actions.

## Résumé

- Checks: 10
- OK: 10
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers inspectés

- `src/app/(private)/settings/scheduling/page.tsx`
- `src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts`

## Références existantes à /settings/scheduling

- Aucune.

## Candidats navigation

- `src/app/(private)/dashboard/amarkhys/page.tsx`
- `src/app/(private)/dashboard/page.tsx`
- `src/app/(private)/dashboard/[dashboardKey]/page.tsx`
- `src/app/(private)/operations/page.tsx`
- `src/app/(private)/page.tsx`
- `src/app/(private)/settings/scheduling/page.tsx`
- `src/app/(private)/supervision/page.tsx`
- `src/app/(private)/workspaces/[workspace]/page.tsx`
- `src/app/api/stripe/checkout/route.ts`
- `src/app/facture/[token]/details/page.tsx`
- `src/app/facture/[token]/page.tsx`
- `src/app/login/page.tsx`
- `src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx`
- `src/components/auth/PrivateGuard.tsx`
- `src/components/contrats/ContratsForm.tsx`
- `src/components/erp/billing/InvoicePaymentsHistory.tsx`
- `src/components/erp/cockpit/ERPCockpitHealthPanel.tsx`
- `src/components/erp/cockpit/ERPCockpitMetricGrid.tsx`
- `src/components/erp/cockpit/ERPCockpitStreamsPanel.tsx`
- `src/components/erp/cockpit/ERPRuntimeCockpitDashboard.tsx`
- `src/components/erp/context/ERPContextBanner.tsx`
- `src/components/erp/dashboard/business/ERPBusinessAmarkhysDashboard.tsx`
- `src/components/erp/dashboard/business/ERPBusinessDashboard.tsx`
- `src/components/erp/dashboard/business/widgets/ERPAlertPanel.tsx`
- `src/components/erp/dashboard/ERPDashboardQuickActions.tsx`
- `src/components/erp/dashboard/generic/ERPDashboardRenderer.tsx`
- `src/components/erp/dashboard/generic/registry/ERPDashboardWidgetRegistry.ts`
- `src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx`
- `src/components/erp/forms/enterprise/ERPFormField.tsx`
- `src/components/erp/layout/ERPAppShell.tsx`
- `src/components/erp/layout/ERPCockpitLayout.tsx`
- `src/components/erp/layout/ERPDashboardLayout.tsx`
- `src/components/erp/layout/ERPKpiGrid.tsx`
- `src/components/erp/layout/ERPSidebarSection.tsx`
- `src/components/erp/layout/ERPTopBar.tsx`
- `src/components/erp/layout/index.ts`
- `src/components/erp/monitoring/ERPMonitoringDashboard.tsx`
- `src/components/erp/monitoring/ERPTopologyPanel.tsx`
- `src/components/erp/monitoring/index.ts`
- `src/components/erp/navigation/ERPBreadcrumbs.tsx`
- `src/components/erp/navigation/ERPModuleCard.tsx`
- `src/components/erp/navigation/ERPReturnBreadcrumb.tsx`
- `src/components/erp/runtime/ERPRuntimePage.tsx`
- `src/components/erp/runtime/ERPRuntimeTable.tsx`
- `src/components/erp/runtime-ui/ERPRuntimeRegistryDashboard.tsx`
- `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx`
- `src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx`
- `src/components/erp/shell/ErpShell.tsx`
- `src/components/erp/shell/ErpSidebar.tsx`
- `src/components/erp/templates/ERPModuleHeader.tsx`
- `src/components/erp/ui/ERPDataList.tsx`
- `src/components/erp/workspace/ERPWorkspaceRuntimeWidgets.tsx`
- `src/components/erp/workspace/ERPWorkspaceWidgetCard.tsx`
- `src/components/interventions/InterventionsForm.tsx`
- `src/components/maintenance/MaintenanceForm.tsx`
- `src/components/materiels/details/MaterielDetails.tsx`
- `src/components/materiels/MaterielsForm.tsx`
- `src/components/sidebar/AppSidebar.tsx`
- `src/components/stock/details/StockDetails.tsx`
- `src/components/stock/StockForm.tsx`
- `src/constants/routes.ts`
- `src/core/layout/AppShell.tsx`
- `src/core/layout/Sidebar.tsx`
- `src/core/navigation/navigation-builder.ts`
- `src/domains/contrats/store/ContratsStore.ts`
- `src/domains/interventions/store/InterventionsStore.ts`
- `src/domains/maintenance/store/MaintenanceStore.ts`
- `src/domains/materiels/store/MaterielsStore.ts`
- `src/domains/stock/store/StockStore.ts`
- `src/features/analytics/components/analyticsHelpers.ts`
- `src/features/auth/components/LoginForm.tsx`
- `src/features/auth/guards/AuthGuard.tsx`
- `src/features/platform/components/navigation/EnterpriseSidebar.tsx`
- `src/features/platform/dashboards/EnterpriseSupervisionDashboard.tsx`
- `src/features/platform/workspace/ConnectedEnterpriseWorkspace.tsx`
- `src/features/platform/workspace/EnterpriseWorkspace.tsx`
- `src/lib/auth/session.ts`
- `src/middleware.ts`
- `src/runtime/actions/ERPActionRegistry.ts`
- `src/runtime/actions/ERPActionResolver.ts`
- `src/runtime/automation/ERPAutomationTimelineStore.ts`
- `src/runtime/cockpit/ERPCockpitSnapshot.ts`
- `src/runtime/dashboard/ERPBusinessMetricsEngine.ts`
- `src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts`
- `src/runtime/dashboard/generic/ERPBusinessDashboardConfig.ts`
- `src/runtime/dashboard/generic/ERPDashboardTypes.ts`
- `src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts`
- `src/runtime/generation/ERPMenuGenerationEngine.ts`
- `src/runtime/generation/ERPModuleGenerationEngine.ts`
- `src/runtime/guards/processRuntimeBeforeMutationGuards.ts`
- `src/runtime/metadata/ERPMetadataGenerationBridge.ts`
- `src/runtime/modules/ERPModule.ts`
- `src/runtime/modules/factory/createBusinessModule.ts`
- `src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts`
- `src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts`
- `src/runtime/modules/generated/facturesauto/facturesauto.module.ts`
- `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts`
- `src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`
- `src/runtime/modules/generated/vehicules/vehicules.module.ts`
- `src/runtime/modules/lifecycle/ERPRelationDataLoader.ts`
- `src/runtime/navigation/ERPNavigationEngine.ts`
- `src/runtime/navigation/ERPRelationNavigation.tsx`
- `src/runtime/navigation/RuntimeNavigationEngine.ts`
- `src/runtime/navigation/RuntimeNavigationLink.ts`
- `src/runtime/observability/ERPAlertStore.ts`
- `src/runtime/observability/ERPObservabilityTimeline.ts`
- `src/runtime/observability/ERPTraceStore.ts`
- `src/runtime/os-enterprise/ERPCommandCenter.ts`
- `src/runtime/os-enterprise/ERPSavedView.ts`
- `src/runtime/os-enterprise/ERPSavedViews.ts`
- `src/runtime/registry/ERPRegistry.ts`
- `src/runtime/registry/modules/ERPRegistryModules.ts`
- `src/runtime/registry/types.ts`
- `src/runtime/security-runtime/RuntimePolicyEngine.ts`
- `src/runtime/shared/ERPRuntimeCollection.ts`
- `src/runtime/shared/ERPRuntimeStore.ts`
- `src/runtime/workflows/enterprise/timeline/ERPWorkflowTimelineStore.ts`
- `src/runtime/workspaces/ERPWorkspaceContext.ts`
- `src/runtime/workspaces/ERPWorkspaceContextResolver.ts`

## Candidats settings/configuration

- `src/app/(private)/settings/scheduling/page.tsx`
- `src/components/erp/production/readiness.ts`
- `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx`
- `src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx`
- `src/runtime/guards/processRuntimeBeforeMutationGuards.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`
- `src/runtime/scheduling/settings/index.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts`

## Checks détaillés


### OK — Q22E-9N-H-01

- Label: Route /settings/scheduling existe
- Severity: HIGH
- Details: src/app/(private)/settings/scheduling/page.tsx

### OK — Q22E-9N-H-02

- Label: Route utilise le panel générique
- Severity: HIGH
- Details: src/app/(private)/settings/scheduling/page.tsx

### OK — Q22E-9N-H-03

- Label: Panel utilise les server actions
- Severity: HIGH
- Details: src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx

### OK — Q22E-9N-H-04

- Label: Route/panel ne touchent pas Firestore directement
- Severity: HIGH
- Details: OK

### OK — Q22E-9N-H-05

- Label: Route/panel ne consomment pas le repository directement
- Severity: HIGH
- Details: OK

### OK — Q22E-9N-H-06

- Label: Server actions et service existent encore
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts

### OK — Q22E-9N-H-07

- Label: Aucune référence navigation vers /settings/scheduling pour l'instant
- Severity: INFO
- Details: Aucune référence détectée

### OK — Q22E-9N-H-08

- Label: Candidats navigation détectés pour insertion contrôlée
- Severity: INFO
- Details: src/app/(private)/dashboard/amarkhys/page.tsx, src/app/(private)/dashboard/page.tsx, src/app/(private)/dashboard/[dashboardKey]/page.tsx, src/app/(private)/operations/page.tsx, src/app/(private)/page.tsx, src/app/(private)/settings/scheduling/page.tsx, src/app/(private)/supervision/page.tsx, src/app/(private)/workspaces/[workspace]/page.tsx, src/app/api/stripe/checkout/route.ts, src/app/facture/[token]/details/page.tsx, src/app/facture/[token]/page.tsx, src/app/login/page.tsx, src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx, src/components/auth/PrivateGuard.tsx, src/components/contrats/ContratsForm.tsx, src/components/erp/billing/InvoicePaymentsHistory.tsx, src/components/erp/cockpit/ERPCockpitHealthPanel.tsx, src/components/erp/cockpit/ERPCockpitMetricGrid.tsx, src/components/erp/cockpit/ERPCockpitStreamsPanel.tsx, src/components/erp/cockpit/ERPRuntimeCockpitDashboard.tsx, src/components/erp/context/ERPContextBanner.tsx, src/components/erp/dashboard/business/ERPBusinessAmarkhysDashboard.tsx, src/components/erp/dashboard/business/ERPBusinessDashboard.tsx, src/components/erp/dashboard/business/widgets/ERPAlertPanel.tsx, src/components/erp/dashboard/ERPDashboardQuickActions.tsx, src/components/erp/dashboard/generic/ERPDashboardRenderer.tsx, src/components/erp/dashboard/generic/registry/ERPDashboardWidgetRegistry.ts, src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx, src/components/erp/forms/enterprise/ERPFormField.tsx, src/components/erp/layout/ERPAppShell.tsx, src/components/erp/layout/ERPCockpitLayout.tsx, src/components/erp/layout/ERPDashboardLayout.tsx, src/components/erp/layout/ERPKpiGrid.tsx, src/components/erp/layout/ERPSidebarSection.tsx, src/components/erp/layout/ERPTopBar.tsx, src/components/erp/layout/index.ts, src/components/erp/monitoring/ERPMonitoringDashboard.tsx, src/components/erp/monitoring/ERPTopologyPanel.tsx, src/components/erp/monitoring/index.ts, src/components/erp/navigation/ERPBreadcrumbs.tsx, src/components/erp/navigation/ERPModuleCard.tsx, src/components/erp/navigation/ERPReturnBreadcrumb.tsx, src/components/erp/runtime/ERPRuntimePage.tsx, src/components/erp/runtime/ERPRuntimeTable.tsx, src/components/erp/runtime-ui/ERPRuntimeRegistryDashboard.tsx, src/components/erp/scheduling/ERPSchedulingPlanningView.tsx, src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx, src/components/erp/shell/ErpShell.tsx, src/components/erp/shell/ErpSidebar.tsx, src/components/erp/templates/ERPModuleHeader.tsx, src/components/erp/ui/ERPDataList.tsx, src/components/erp/workspace/ERPWorkspaceRuntimeWidgets.tsx, src/components/erp/workspace/ERPWorkspaceWidgetCard.tsx, src/components/interventions/InterventionsForm.tsx, src/components/maintenance/MaintenanceForm.tsx, src/components/materiels/details/MaterielDetails.tsx, src/components/materiels/MaterielsForm.tsx, src/components/sidebar/AppSidebar.tsx, src/components/stock/details/StockDetails.tsx, src/components/stock/StockForm.tsx, src/constants/routes.ts, src/core/layout/AppShell.tsx, src/core/layout/Sidebar.tsx, src/core/navigation/navigation-builder.ts, src/domains/contrats/store/ContratsStore.ts, src/domains/interventions/store/InterventionsStore.ts, src/domains/maintenance/store/MaintenanceStore.ts, src/domains/materiels/store/MaterielsStore.ts, src/domains/stock/store/StockStore.ts, src/features/analytics/components/analyticsHelpers.ts, src/features/auth/components/LoginForm.tsx, src/features/auth/guards/AuthGuard.tsx, src/features/platform/components/navigation/EnterpriseSidebar.tsx, src/features/platform/dashboards/EnterpriseSupervisionDashboard.tsx, src/features/platform/workspace/ConnectedEnterpriseWorkspace.tsx, src/features/platform/workspace/EnterpriseWorkspace.tsx, src/lib/auth/session.ts, src/middleware.ts, src/runtime/actions/ERPActionRegistry.ts, src/runtime/actions/ERPActionResolver.ts

### OK — Q22E-9N-H-09

- Label: Candidats settings/configuration détectés
- Severity: INFO
- Details: src/app/(private)/settings/scheduling/page.tsx, src/components/erp/production/readiness.ts, src/components/erp/scheduling/ERPSchedulingPlanningView.tsx, src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx, src/runtime/guards/processRuntimeBeforeMutationGuards.ts, src/runtime/modules/generated/rendezvous/rendezvous.module.ts, src/runtime/scheduling/settings/index.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts, src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts

### OK — Q22E-9N-H-10

- Label: Pas de hardcode AMARKHYS/garage dans l'UI settings scheduling
- Severity: HIGH
- Details: src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx, src/app/(private)/settings/scheduling/page.tsx

## Décision recommandée

Aucun échec HIGH. La route et l'UI sont prêtes.

Suite recommandée:
- Inspecter les candidats navigation listés.
- Connecter /settings/scheduling au point de navigation le plus générique.
- Éviter un lien AMARKHYS/garage.
