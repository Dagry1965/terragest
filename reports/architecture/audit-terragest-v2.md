# TERRAGEST V2 - AUDIT ARCHITECTURE

Generated : 05/08/2026 09:21:48


# CANONICAL STRUCTURE

âœ… app
âœ… core
âœ… runtime
âœ… infrastructure
âœ… shared
âœ… ui
âœ… features

# DUPLICATED STRUCTURES

âš ï¸ Duplicate structure detected : domains
âš ï¸ Duplicate structure detected : components\layout
âš ï¸ Duplicate structure detected : components\sidebar
âš ï¸ Duplicate structure detected : components\topbar
âš ï¸ Duplicate structure detected : core\layout

# FIRESTORE DIRECT ACCESS INSIDE UI

âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\audit\services\AuditService.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationRepository.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\mouvements\repositories\MouvementRepository.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\organisations\repositories\OrganisationRepository.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\superadmin\services\SuperAdminService.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts
âš ï¸ Possible Firestore direct access : C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts

# RUNTIME VIOLATIONS

âŒ JSX inside runtime : C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx
âŒ JSX inside runtime : C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleDetailRenderer.tsx
âŒ JSX inside runtime : C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleListRenderer.tsx
âŒ JSX inside runtime : C:\Users\Admin\terragest\src\runtime\navigation\ERPRelationNavigation.tsx
âŒ JSX inside runtime : C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx
âŒ JSX inside runtime : C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx
âŒ JSX inside runtime : C:\Users\Admin\terragest\src\runtime\permissions\ERPProtectedAction.tsx
âŒ JSX inside runtime : C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeSchedulerBootstrap.tsx
âŒ JSX inside runtime : C:\Users\Admin\terragest\src\runtime\selects\ERPDynamicSelect.tsx
âŒ JSX inside runtime : C:\Users\Admin\terragest\src\runtime\state\ERPStateBadge.tsx
âŒ JSX inside runtime : C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx

# WORKFLOW ENGINE

âš ï¸ workflow-engine still inside features/
Target : src/runtime/

# SIDEBAR DUPLICATION

âš ï¸ Sidebar found : C:\Users\Admin\terragest\src\components\erp\shell\ErpSidebar.tsx
âš ï¸ Sidebar found : C:\Users\Admin\terragest\src\components\sidebar\AppSidebar.tsx
âš ï¸ Sidebar found : C:\Users\Admin\terragest\src\core\layout\Sidebar.tsx
âš ï¸ Sidebar found : C:\Users\Admin\terragest\src\features\platform\components\navigation\EnterpriseSidebar.tsx
âš ï¸ Sidebar found : C:\Users\Admin\terragest\src\ui\sidebar\ERPSidebar.tsx
âš ï¸ Sidebar found : C:\Users\Admin\terragest\src\_quarantine\layout\Sidebar.tsx
âš ï¸ Sidebar found : C:\Users\Admin\terragest\src\_quarantine\navigation\Sidebar.tsx
âš ï¸ Sidebar found : C:\Users\Admin\terragest\src\_quarantine\sidebar\sidebar\ERPSidebar.tsx
âš ï¸ Sidebar found : C:\Users\Admin\terragest\src\_quarantine\sidebar\AppSidebar.tsx
âš ï¸ Sidebar found : C:\Users\Admin\terragest\src\_quarantine\sidebar\ERPSidebar.tsx

# TOPBAR DUPLICATION

âš ï¸ Topbar found : C:\Users\Admin\terragest\src\components\erp\layout\ERPTopBar.tsx
âš ï¸ Topbar found : C:\Users\Admin\terragest\src\components\erp\shell\ErpTopbar.tsx
âš ï¸ Topbar found : C:\Users\Admin\terragest\src\components\topbar\AppTopbar.tsx
âš ï¸ Topbar found : C:\Users\Admin\terragest\src\core\layout\Topbar.tsx
âš ï¸ Topbar found : C:\Users\Admin\terragest\src\features\platform\components\layout\EnterpriseTopbar.tsx
âš ï¸ Topbar found : C:\Users\Admin\terragest\src\ui\topbar\ERPTopbar.tsx
âš ï¸ Topbar found : C:\Users\Admin\terragest\src\_quarantine\layout\Topbar.tsx
âš ï¸ Topbar found : C:\Users\Admin\terragest\src\_quarantine\navigation\Topbar.tsx
âš ï¸ Topbar found : C:\Users\Admin\terragest\src\_quarantine\topbar\topbar\ERPTopbar.tsx
âš ï¸ Topbar found : C:\Users\Admin\terragest\src\_quarantine\topbar\AppTopbar.tsx
âš ï¸ Topbar found : C:\Users\Admin\terragest\src\_quarantine\topbar\ERPTopbar.tsx

# DATATABLE DUPLICATION

âš ï¸ DataTable found : C:\Users\Admin\terragest\src\components\crud\DataTable.tsx
âš ï¸ DataTable found : C:\Users\Admin\terragest\src\components\data-table\DataTable.tsx
âš ï¸ DataTable found : C:\Users\Admin\terragest\src\components\erp\datatable\ERPDataTable.tsx
âš ï¸ DataTable found : C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx
âš ï¸ DataTable found : C:\Users\Admin\terragest\src\components\ui\DataTable.tsx
âš ï¸ DataTable found : C:\Users\Admin\terragest\src\shared\tables\EnterpriseDataTable.tsx

# FEATURES HEALTH


## alerts
âœ… components
âœ… hooks
âœ… services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## analytics
âœ… components
âœ… hooks
âœ… services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## api
âš ï¸ Missing : components
âš ï¸ Missing : hooks
âœ… services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## audit
âš ï¸ Missing : components
âš ï¸ Missing : hooks
âœ… services
âš ï¸ Missing : repositories
âœ… types

## auth
âœ… components
âœ… hooks
âœ… services
âš ï¸ Missing : repositories
âœ… types

## billing
âœ… components
âœ… hooks
âœ… services
âœ… repositories
âœ… types

## dashboard
âœ… components
âš ï¸ Missing : hooks
âš ï¸ Missing : services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## exploitations
âœ… components
âœ… hooks
âœ… services
âœ… repositories
âœ… types

## exports
âœ… components
âš ï¸ Missing : hooks
âœ… services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## fournisseurs
âš ï¸ Missing : components
âš ï¸ Missing : hooks
âš ï¸ Missing : services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## interventions
âš ï¸ Missing : components
âš ï¸ Missing : hooks
âœ… services
âœ… repositories
âœ… types

## invitations
âœ… components
âœ… hooks
âœ… services
âœ… repositories
âœ… types

## materiels
âš ï¸ Missing : components
âš ï¸ Missing : hooks
âœ… services
âœ… repositories
âœ… types

## memberships
âš ï¸ Missing : components
âœ… hooks
âœ… services
âœ… repositories
âœ… types

## mouvements
âš ï¸ Missing : components
âš ï¸ Missing : hooks
âœ… services
âœ… repositories
âœ… types

## notifications
âœ… components
âœ… hooks
âœ… services
âš ï¸ Missing : repositories
âœ… types

## observability
âœ… components
âœ… hooks
âœ… services
âš ï¸ Missing : repositories
âœ… types

## offline
âœ… components
âœ… hooks
âš ï¸ Missing : services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## organisations
âœ… components
âš ï¸ Missing : hooks
âœ… services
âœ… repositories
âœ… types

## organization-analytics
âœ… components
âš ï¸ Missing : hooks
âœ… services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## organizations
âš ï¸ Missing : components
âœ… hooks
âœ… services
âœ… repositories
âœ… types

## payments
âœ… components
âš ï¸ Missing : hooks
âœ… services
âš ï¸ Missing : repositories
âœ… types

## platform
âœ… components
âš ï¸ Missing : hooks
âš ï¸ Missing : services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## platform-monitoring
âœ… components
âš ï¸ Missing : hooks
âš ï¸ Missing : services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## produits
âœ… components
âœ… hooks
âœ… services
âœ… repositories
âœ… types

## pwa
âœ… components
âš ï¸ Missing : hooks
âš ï¸ Missing : services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## ressources
âš ï¸ Missing : components
âš ï¸ Missing : hooks
âœ… services
âœ… repositories
âœ… types

## runtime-supervision
âš ï¸ Missing : components
âš ï¸ Missing : hooks
âš ï¸ Missing : services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## stocks
âš ï¸ Missing : components
âš ï¸ Missing : hooks
âœ… services
âœ… repositories
âœ… types

## superadmin
âœ… components
âš ï¸ Missing : hooks
âœ… services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## teams
âœ… components
âš ï¸ Missing : hooks
âœ… services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## tenancy
âœ… components
âœ… hooks
âœ… services
âš ï¸ Missing : repositories
âš ï¸ Missing : types

## terrains
âš ï¸ Missing : components
âš ï¸ Missing : hooks
âœ… services
âœ… repositories
âœ… types

## workflow
âœ… components
âš ï¸ Missing : hooks
âš ï¸ Missing : services
âš ï¸ Missing : repositories
âœ… types

## workflow-engine
âœ… components
âš ï¸ Missing : hooks
âœ… services
âš ï¸ Missing : repositories
âœ… types
