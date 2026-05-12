# AUDIT TERRAGEST_V2 - ERP ENTERPRISE RUNTIME

Date audit : 2026-05-12 14:55:39

Objectif : connaÃ®tre l'Ã©tat exact d'avancement de l'application.

# 1. Structure principale

```txt
Structure du dossier
Le numÚro de sÚrie du volume est A0A2-4E35
C:\USERS\ADMIN\TERRAGEST\SRC
ª   middleware.ts
ª   
+---analytics
ª   +---aggregation
ª   ª       AggregationService.ts
ª   ª       
ª   +---dashboards
ª   ª       KPICard.tsx
ª   ª       
ª   +---kpi
ª   ª       KPIEngine.ts
ª   ª       
ª   +---predictive
ª   ª       PredictiveEngine.ts
ª   ª       
ª   +---reporting
ª   ª       ReportingService.ts
ª   ª       
ª   +---repositories
ª   ª       AnalyticsRepository.ts
ª   ª       
ª   +---services
ª           AggregationService.ts
ª           
+---app
ª   ª   favicon.ico
ª   ª   globals.css
ª   ª   layout.tsx
ª   ª   page.tsx
ª   ª   
ª   +---(private)
ª   ª   ª   layout.tsx
ª   ª   ª   page.tsx
ª   ª   ª   
ª   ª   +---achats
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---ai-runtime
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---automation
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---billing
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---clients
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---commandes
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---compliance
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---contrats
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---dashboard
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---depenses
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---devis
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---employes
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---exploitations
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---details
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---factures
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---fournisseurs
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   page.tsx.bak
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       page.tsx.bak
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   page.tsx.bak
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               page.tsx.bak
ª   ª   ª               
ª   ª   +---incidents
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---interventions
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflow
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---intrants
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---livraisons
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---maintenance
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---materiels
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   page.tsx.bak
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---pannes
ª   ª   ª   ª   +---nouveau
ª   ª   ª   ª           page.tsx
ª   ª   ª   ª           
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---monitoring
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---notifications
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---observability
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---offline
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---operations
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---organization-analytics
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---paiements
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---parcelles
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---persistence
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---platform
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---production
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---produits
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---pwa
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---realtime
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---recettes
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---recoltes
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---resilience
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---runtime
ª   ª   ª   +---[module]
ª   ª   ª           page.tsx
ª   ª   ª           
ª   ª   +---runtime-cockpit
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---runtime-registry
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---runtime-supervision
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---security
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---stocks
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---new
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---streams
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---supervision
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---taches
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---team
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---tenants
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---terrains
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---testing
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---vehicules
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---workers
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---workflows-runtime
ª   ª           page.tsx
ª   ª           
ª   +---api
ª   ª   +---health
ª   ª   ª       route.ts
ª   ª   ª       
ª   ª   +---platform
ª   ª   ª   +---status
ª   ª   ª           route.ts
ª   ª   ª           
ª   ª   +---stripe
ª   ª       +---checkout
ª   ª       ª       route.ts
ª   ª       ª       
ª   ª       +---webhook
ª   ª               route.ts
ª   ª               
ª   +---billing
ª   ª   +---success
ª   ª           page.tsx
ª   ª           
ª   +---enterprise
ª   ª       page.tsx
ª   ª       
ª   +---invitations
ª   ª   +---accept
ª   ª       +---[token]
ª   ª               page.tsx
ª   ª               
ª   +---login
ª           page.tsx
ª           
+---components
ª   +---auth
ª   ª       PrivateGuard.tsx
ª   ª       
ª   +---bootstrap
ª   ª       RuntimeBootstrapProvider.tsx
ª   ª       
ª   +---contrats
ª   ª       ContratsForm.tsx
ª   ª       
ª   +---crud
ª   ª       ConfirmDialog.tsx
ª   ª       DataTable.tsx
ª   ª       EmptyState.tsx
ª   ª       EntityForm.tsx
ª   ª       PageHeader.tsx
ª   ª       SearchBar.tsx
ª   ª       
ª   +---dashboard
ª   ª       ActivityFeed.tsx
ª   ª       AlertsPanel.tsx
ª   ª       DashboardAnalytics.tsx
ª   ª       KPICard.tsx
ª   ª       RealtimeActivityFeed.tsx
ª   ª       RealtimeKpiCard.tsx
ª   ª       RecentActivities.tsx
ª   ª       
ª   +---data-table
ª   ª       DataTable.tsx
ª   ª       
ª   +---dialogs
ª   ª       ConfirmDialog.tsx
ª   ª       DeleteButton.tsx
ª   ª       
ª   +---erp
ª   ª   +---actions
ª   ª   ª       ERPActionButton.tsx
ª   ª   ª       ERPActionToolbar.tsx
ª   ª   ª       ERPRowActions.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---activity
ª   ª   ª       ERPActivityFeed.tsx
ª   ª   ª       
ª   ª   +---ai
ª   ª   ª       ERPAIAnomaliesPanel.tsx
ª   ª   ª       ERPAIDashboard.tsx
ª   ª   ª       ERPAIInsights.tsx
ª   ª   ª       ERPAIInsightsPanel.tsx
ª   ª   ª       ERPAIMetricsGrid.tsx
ª   ª   ª       ERPAIRecommendationsPanel.tsx
ª   ª   ª       ERPAISearchPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---analytics
ª   ª   ª       ERPAnalyticsCard.tsx
ª   ª   ª       
ª   ª   +---audit
ª   ª   ª       ERPAuditTrail.tsx
ª   ª   ª       
ª   ª   +---automation
ª   ª   ª       ERPAutomationCard.tsx
ª   ª   ª       ERPAutomationTimeline.tsx
ª   ª   ª       ERPAutomationTimelinePanel.tsx
ª   ª   ª       ERPNotificationsPanel.tsx
ª   ª   ª       ERPRuntimeAutomationDashboard.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---automation-runtime
ª   ª   ª       ERPAutomationRuntimePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---badges
ª   ª   ª       ERPHealthBadge.tsx
ª   ª   ª       
ª   ª   +---charts
ª   ª   ª       ERPTrendCard.tsx
ª   ª   ª       
ª   ª   +---cockpit
ª   ª   ª       ERPCockpitHealthPanel.tsx
ª   ª   ª       ERPCockpitMetricGrid.tsx
ª   ª   ª       ERPCockpitModuleMatrix.tsx
ª   ª   ª       ERPCockpitStreamsPanel.tsx
ª   ª   ª       ERPRuntimeCockpit.tsx
ª   ª   ª       ERPRuntimeCockpitDashboard.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---command-center
ª   ª   ª       ERPCommandCenter.tsx
ª   ª   ª       
ª   ª   +---dashboard
ª   ª   ª       ErpDashboard.tsx
ª   ª   ª       ERPDashboardActivityFeed.tsx
ª   ª   ª       ERPDashboardMetrics.tsx
ª   ª   ª       ERPDashboardPanel.tsx
ª   ª   ª       ERPDashboardQuickActions.tsx
ª   ª   ª       ERPDashboardSection.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---datatable
ª   ª   ª       ERPDataTable.tsx
ª   ª   ª       ERPEnterpriseDataTable.tsx
ª   ª   ª       ERPTable.tsx
ª   ª   ª       
ª   ª   +---design-system
ª   ª   ª       erp-theme-tokens.ts
ª   ª   ª       
ª   ª   +---details
ª   ª   ª       EntityDetailsLayout.tsx
ª   ª   ª       
ª   ª   +---enterprise-runtime
ª   ª   ª       EnterpriseRuntimeConsolidationPanel.tsx
ª   ª   ª       EnterpriseRuntimeDiagnosticsPanel.tsx
ª   ª   ª       EnterpriseRuntimeGovernancePanel.tsx
ª   ª   ª       EnterpriseRuntimeLifecyclePanel.tsx
ª   ª   ª       EnterpriseRuntimePerformancePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---errors
ª   ª   ª       ERPErrorBoundary.tsx
ª   ª   ª       
ª   ª   +---event-runtime
ª   ª   ª       ERPEventRuntimePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---executive-dashboard
ª   ª   ª       ERPExecutiveDashboard.tsx
ª   ª   ª       
ª   ª   +---filters
ª   ª   ª       ERPFilterBar.tsx
ª   ª   ª       
ª   ª   +---finance
ª   ª   ª       ERPFinancialOverview.tsx
ª   ª   ª       
ª   ª   +---firestore
ª   ª   ª       ERPFirestoreSync.tsx
ª   ª   ª       
ª   ª   +---forms
ª   ª   ª   ª   ERPButton.tsx
ª   ª   ª   ª   ERPDynamicForm.tsx
ª   ª   ª   ª   ERPFormRenderer.tsx
ª   ª   ª   ª   ERPFormSection.tsx
ª   ª   ª   ª   ERPInput.tsx
ª   ª   ª   ª   index.ts
ª   ª   ª   ª   
ª   ª   ª   +---enterprise
ª   ª   ª           ERPEnterpriseForm.tsx
ª   ª   ª           ERPFormActions.tsx
ª   ª   ª           ERPFormField.tsx
ª   ª   ª           ERPFormSection.tsx
ª   ª   ª           ERPFormSummaryPanel.tsx
ª   ª   ª           ERPFormTabs.tsx
ª   ª   ª           index.ts
ª   ª   ª           
ª   ª   +---generic
ª   ª   ª       GenericCreatePage.tsx
ª   ª   ª       GenericDetailPage.tsx
ª   ª   ª       GenericEditPage.tsx
ª   ª   ª       GenericListPage.tsx
ª   ª   ª       
ª   ª   +---kpi
ª   ª   ª       ERPKPIGrid.tsx
ª   ª   ª       
ª   ª   +---layout
ª   ª   ª       ERPActionBar.tsx
ª   ª   ª       ERPAppShell.tsx
ª   ª   ª       ERPCockpitLayout.tsx
ª   ª   ª       ERPCommandPanel.tsx
ª   ª   ª       ERPContentArea.tsx
ª   ª   ª       ERPContentGrid.tsx
ª   ª   ª       ERPDashboardLayout.tsx
ª   ª   ª       ERPKpiGrid.tsx
ª   ª   ª       ERPPageHero.tsx
ª   ª   ª       ERPQuickFilters.tsx
ª   ª   ª       ERPRuntimeHealthPanel.tsx
ª   ª   ª       ERPSidebarSection.tsx
ª   ª   ª       ERPTabNavigation.tsx
ª   ª   ª       ERPTopBar.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---lists
ª   ª   ª       ERPDataList.tsx
ª   ª   ª       
ª   ª   +---live
ª   ª   ª       ERPLiveEvents.tsx
ª   ª   ª       
ª   ª   +---live-operational
ª   ª   ª       ERPLiveOperationalPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---modules
ª   ª   ª       ERPModuleEnterprisePage.tsx
ª   ª   ª       ERPModulePageShell.tsx
ª   ª   ª       ERPModulePlaceholder.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---monitoring
ª   ª   ª       ERPErrorAnalyticsPanel.tsx
ª   ª   ª       ERPHealthPanel.tsx
ª   ª   ª       ERPMonitoringDashboard.tsx
ª   ª   ª       ERPMonitoringMetricsGrid.tsx
ª   ª   ª       ERPSystemHealth.tsx
ª   ª   ª       ERPTopologyPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---navigation
ª   ª   ª       ERPActionButton.tsx
ª   ª   ª       ERPActionToolbar.tsx
ª   ª   ª       ERPBreadcrumbs.tsx
ª   ª   ª       ERPModuleCard.tsx
ª   ª   ª       
ª   ª   +---notifications
ª   ª   ª       ERPNotificationCard.tsx
ª   ª   ª       
ª   ª   +---observability
ª   ª   ª       ERPAlertsPanel.tsx
ª   ª   ª       ERPEventsTimeline.tsx
ª   ª   ª       ERPObservabilityCenter.tsx
ª   ª   ª       ERPRuntimeObservabilityDashboard.tsx
ª   ª   ª       ERPTracesPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---os
ª   ª   ª       ERPCommandPalette.tsx
ª   ª   ª       ERPEnterpriseOSPanel.tsx
ª   ª   ª       ERPNotificationCenter.tsx
ª   ª   ª       ERPSavedViewsPanel.tsx
ª   ª   ª       ERPWorkspaceSwitcher.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---page
ª   ª   ª       ERPEmptyState.tsx
ª   ª   ª       ERPMetricCard.tsx
ª   ª   ª       ERPPage.tsx
ª   ª   ª       ERPQuickAction.tsx
ª   ª   ª       ERPSection.tsx
ª   ª   ª       ERPStatCard.tsx
ª   ª   ª       ERPStatusBadge.tsx
ª   ª   ª       ERPWidgetCard.tsx
ª   ª   ª       
ª   ª   +---panels
ª   ª   ª       ERPInfoPanel.tsx
ª   ª   ª       
ª   ª   +---persistence
ª   ª   ª       ERPPersistenceDashboard.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---production
ª   ª   ª       ERPProductionCloudPanel.tsx
ª   ª   ª       ERPProductionDashboard.tsx
ª   ª   ª       ERPProductionMetricsGrid.tsx
ª   ª   ª       ERPProductionPoliciesPanel.tsx
ª   ª   ª       ERPProductionQuotasPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       ProductionHardeningPanel.tsx
ª   ª   ª       ProductionLogsPanel.tsx
ª   ª   ª       ProductionReadinessPanel.tsx
ª   ª   ª       readiness.ts
ª   ª   ª       RuntimeHealthPanel.tsx
ª   ª   ª       
ª   ª   +---realtime
ª   ª   ª       ERPRealtimeFeed.tsx
ª   ª   ª       ERPRealtimeMetrics.tsx
ª   ª   ª       ERPRealtimePresencePanel.tsx
ª   ª   ª       ERPRealtimeSyncBadge.tsx
ª   ª   ª       ERPRuntimeRealtimeDashboard.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---relation-graph
ª   ª   ª       ERPRelationGraph.tsx
ª   ª   ª       
ª   ª   +---relations
ª   ª   ª       ERPRelationField.tsx
ª   ª   ª       ERPRelationsGraph.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---resilience
ª   ª   ª       ERPDLQPanel.tsx
ª   ª   ª       ERPQueuePanel.tsx
ª   ª   ª       ERPResilienceMetrics.tsx
ª   ª   ª       ERPRuntimeResilienceDashboard.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---runtime
ª   ª   ª       ERPRuntimeAlertsPanel.tsx
ª   ª   ª       ERPRuntimeDeadLetterPanel.tsx
ª   ª   ª       ERPRuntimeDetails.tsx
ª   ª   ª       ERPRuntimeFieldValue.tsx
ª   ª   ª       ERPRuntimeForm.tsx
ª   ª   ª       ERPRuntimeMetricsPanel.tsx
ª   ª   ª       ERPRuntimeOverviewPage.tsx
ª   ª   ª       ERPRuntimePage.tsx
ª   ª   ª       ERPRuntimeQueuesPanel.tsx
ª   ª   ª       ERPRuntimeRetryPanel.tsx
ª   ª   ª       ERPRuntimeStatus.tsx
ª   ª   ª       ERPRuntimeStatusPanel.tsx
ª   ª   ª       ERPRuntimeTable.tsx
ª   ª   ª       ERPRuntimeWorkersPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---runtime-timeline
ª   ª   ª       ERPRuntimeTimeline.tsx
ª   ª   ª       
ª   ª   +---runtime-ui
ª   ª   ª       ERPDataTableRuntime.tsx
ª   ª   ª       ERPRuntimeModulePage.tsx
ª   ª   ª       ERPRuntimeRegistryDashboard.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---security
ª   ª   ª       ERPPoliciesPanel.tsx
ª   ª   ª       ERPRolesPanel.tsx
ª   ª   ª       ERPSecurityAuditPanel.tsx
ª   ª   ª       ERPSecurityDashboard.tsx
ª   ª   ª       ERPSecurityMetrics.tsx
ª   ª   ª       ERPSecurityPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---security-runtime
ª   ª   ª       ERPProtectedAction.tsx
ª   ª   ª       ERPRuntimeSecurityBadge.tsx
ª   ª   ª       ERPSecurityContextPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---shell
ª   ª   ª       ErpShell.tsx
ª   ª   ª       ErpSidebar.tsx
ª   ª   ª       ErpTopbar.tsx
ª   ª   ª       
ª   ª   +---smart-intelligence
ª   ª   ª       index.ts
ª   ª   ª       SmartAnomaliesPanel.tsx
ª   ª   ª       SmartOperationalIntelligencePanel.tsx
ª   ª   ª       SmartPredictionsPanel.tsx
ª   ª   ª       SmartRecommendationsPanel.tsx
ª   ª   ª       SmartRiskBadge.tsx
ª   ª   ª       SmartScorePanel.tsx
ª   ª   ª       
ª   ª   +---smart-runtime
ª   ª   ª       ERPSmartInsightsPanel.tsx
ª   ª   ª       ERPSmartPriorityPanel.tsx
ª   ª   ª       ERPSmartRecommendationsPanel.tsx
ª   ª   ª       ERPSmartRuntimePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---stats
ª   ª   ª       ERPStatTile.tsx
ª   ª   ª       
ª   ª   +---streams
ª   ª   ª       ERPStreamsChannelsPanel.tsx
ª   ª   ª       ERPStreamsDashboard.tsx
ª   ª   ª       ERPStreamsMetricsGrid.tsx
ª   ª   ª       ERPStreamsTimelinePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---templates
ª   ª   ª       ERPModuleActionPageTemplate.tsx
ª   ª   ª       ERPModuleActivityPanel.tsx
ª   ª   ª       ERPModuleDashboardTemplate.tsx
ª   ª   ª       ERPModuleHeader.tsx
ª   ª   ª       ERPModuleKpiGrid.tsx
ª   ª   ª       ERPModuleListTemplate.tsx
ª   ª   ª       ERPModuleTabs.tsx
ª   ª   ª       ERPModuleToolbar.tsx
ª   ª   ª       ERPModuleWorkflowPanel.tsx
ª   ª   ª       ERPPageTemplateRegistry.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---tenant
ª   ª   ª       ERPTenantDashboard.tsx
ª   ª   ª       ERPTenantMetricsGrid.tsx
ª   ª   ª       ERPTenantMetricsPanel.tsx
ª   ª   ª       ERPTenantRegistryPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---testing
ª   ª   ª       ERPTestingDashboard.tsx
ª   ª   ª       ERPTestingHistoryPanel.tsx
ª   ª   ª       ERPTestingMetricsGrid.tsx
ª   ª   ª       ERPTestingRegistryPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---theme
ª   ª   ª       ERPCard.tsx
ª   ª   ª       ERPSeverityBadge.tsx
ª   ª   ª       ERPStatusBadge.tsx
ª   ª   ª       ERPTable.tsx
ª   ª   ª       ERPTheme.ts
ª   ª   ª       ERPThemeProvider.tsx
ª   ª   ª       tokens.ts
ª   ª   ª       
ª   ª   +---timeline
ª   ª   ª       ERPEventTimeline.tsx
ª   ª   ª       
ª   ª   +---ui
ª   ª   ª   ª   ERPBadge.tsx
ª   ª   ª   ª   ERPButton.tsx
ª   ª   ª   ª   ERPCard.tsx
ª   ª   ª   ª   ERPChartCard.tsx
ª   ª   ª   ª   ERPDataList.tsx
ª   ª   ª   ª   ERPDrawer.tsx
ª   ª   ª   ª   ERPEmptyState.tsx
ª   ª   ª   ª   ERPGrid.tsx
ª   ª   ª   ª   ERPInput.tsx
ª   ª   ª   ª   ERPMetricCard.tsx
ª   ª   ª   ª   ERPModal.tsx
ª   ª   ª   ª   ERPPage.tsx
ª   ª   ª   ª   ERPPageHeader.tsx
ª   ª   ª   ª   ERPPanel.tsx
ª   ª   ª   ª   ERPSection.tsx
ª   ª   ª   ª   ERPSelect.tsx
ª   ª   ª   ª   ERPSkeleton.tsx
ª   ª   ª   ª   ERPStack.tsx
ª   ª   ª   ª   ERPStatCard.tsx
ª   ª   ª   ª   ERPTable.tsx
ª   ª   ª   ª   ERPTabs.tsx
ª   ª   ª   ª   ERPTheme.ts
ª   ª   ª   ª   ERPToast.tsx
ª   ª   ª   ª   ERPToolbar.tsx
ª   ª   ª   ª   index.ts
ª   ª   ª   ª   
ª   ª   ª   +---table
ª   ª   ª           ERPTable.tsx
ª   ª   ª           index.ts
ª   ª   ª           
ª   ª   +---workers
ª   ª   ª       ERPSchedulerPanel.tsx
ª   ª   ª       ERPWorkerHistoryPanel.tsx
ª   ª   ª       ERPWorkerQueue.tsx
ª   ª   ª       ERPWorkersDashboard.tsx
ª   ª   ª       ERPWorkersMetricsGrid.tsx
ª   ª   ª       ERPWorkersRegistryPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---workflow
ª   ª   ª       ERPWorkflowBoard.tsx
ª   ª   ª       ERPWorkflowStep.tsx
ª   ª   ª       WorkflowActions.tsx
ª   ª   ª       
ª   ª   +---workflow-designer
ª   ª   ª       ERPWorkflowDesigner.tsx
ª   ª   ª       
ª   ª   +---workflow-editor
ª   ª   ª       ERPVisualWorkflowEditor.tsx
ª   ª   ª       
ª   ª   +---workflow-runtime
ª   ª   ª       ERPWorkflowRuntimePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---workflows
ª   ª   ª       ERPRuntimeWorkflowDashboard.tsx
ª   ª   ª       ERPWorkflowDefinitionsPanel.tsx
ª   ª   ª       ERPWorkflowExecutionsPanel.tsx
ª   ª   ª       ERPWorkflowMetricGrid.tsx
ª   ª   ª       ERPWorkflowTimelinePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---workspace
ª   ª           ERPWorkspaceActivity.tsx
ª   ª           ERPWorkspaceCommandCenter.tsx
ª   ª           ERPWorkspaceContextPanel.tsx
ª   ª           ERPWorkspaceLayout.tsx
ª   ª           ERPWorkspaceQuickActions.tsx
ª   ª           ERPWorkspaceTabs.tsx
ª   ª           index.ts
ª   ª           
ª   +---form
ª   ª       FormField.tsx
ª   ª       SelectField.tsx
ª   ª       TextAreaField.tsx
ª   ª       
ª   +---interventions
ª   ª       InterventionsForm.tsx
ª   ª       
ª   +---layout
ª   ª       ERPLayout.tsx
ª   ª       
ª   +---maintenance
ª   ª       MaintenanceForm.tsx
ª   ª       
ª   +---materiels
ª   ª   ª   MaterielsForm.tsx
ª   ª   ª   
ª   ª   +---details
ª   ª           MaterielDetails.tsx
ª   ª           
ª   +---notifications
ª   ª       NotificationCenter.tsx
ª   ª       
ª   +---operations
ª   ª       OperationsMetrics.tsx
ª   ª       OperationsTimeline.tsx
ª   ª       
ª   +---shell
ª   ª       EnterpriseAppShell.tsx
ª   ª       
ª   +---sidebar
ª   ª       AppSidebar.tsx
ª   ª       
ª   +---stock
ª   ª   ª   StockForm.tsx
ª   ª   ª   
ª   ª   +---details
ª   ª           StockDetails.tsx
ª   ª           
ª   +---timeline
ª   ª       Timeline.tsx
ª   ª       Timeline.tsx.bak
ª   ª       
ª   +---topbar
ª   ª       AppTopbar.tsx
ª   ª       
ª   +---ui
ª   ª       Button.tsx
ª   ª       Card.tsx
ª   ª       DataTable.tsx
ª   ª       EmptyState.tsx
ª   ª       EnterpriseForm.tsx
ª   ª       Input.tsx
ª   ª       KPICard.tsx
ª   ª       ProductRealtimeForm.tsx
ª   ª       SkeletonCard.tsx
ª   ª       Table.tsx
ª   ª       
ª   +---workflow
ª           WorkflowStatus.tsx
ª           
+---constants
ª       collections.ts
ª       routes.ts
ª       
+---contexts
ª       AuthContext.tsx
ª       
+---core
ª   +---actions
ª   ª       erp-action-engine.ts
ª   ª       
ª   +---audit
ª   ª       audit-service.ts
ª   ª       
ª   +---auth
ª   ª       auth-enterprise-layer.ts
ª   ª       
ª   +---automation
ª   ª   ª   automation-engine.ts
ª   ª   ª   
ª   ª   +---registry
ª   ª           automation-registry.ts
ª   ª           
ª   +---bootstrap
ª   ª       runtime-bootstrap.ts
ª   ª       
ª   +---circuit-breaker
ª   ª       circuit-breaker-engine.ts
ª   ª       
ª   +---collaboration
ª   ª       collaborative-runtime.ts
ª   ª       
ª   +---config
ª   ª       env.ts
ª   ª       
ª   +---constants
ª   ª       app.constants.ts
ª   ª       
ª   +---dead-letter
ª   ª       dead-letter-queue.ts
ª   ª       
ª   +---dto
ª   ª       BaseDTO.ts
ª   ª       
ª   +---errors
ª   ª       AppError.ts
ª   ª       BaseError.ts
ª   ª       
ª   +---event-bus
ª   ª       event-bus.ts
ª   ª       register-event-subscribers.ts
ª   ª       
ª   +---event-store
ª   ª       event-store.ts
ª   ª       
ª   +---events
ª   ª       domain-events.ts
ª   ª       
ª   +---hooks
ª   ª       erp-hooks.ts
ª   ª       register-hooks.ts
ª   ª       
ª   +---jobs
ª   ª       job-queue.ts
ª   ª       job-worker.ts
ª   ª       start-worker.ts
ª   ª       
ª   +---layout
ª   ª       AppShell.tsx
ª   ª       Sidebar.tsx
ª   ª       Topbar.tsx
ª   ª       
ª   +---lifecycle
ª   ª       job-lifecycle.ts
ª   ª       
ª   +---metrics
ª   ª       metrics-engine.ts
ª   ª       
ª   +---modules
ª   ª   ª   module-registry.ts
ª   ª   ª   module-registry.ts.bak
ª   ª   ª   
ª   ª   +---capabilities
ª   ª           module-capabilities-engine.ts
ª   ª           
ª   +---navigation
ª   ª       navigation-builder.ts
ª   ª       
ª   +---permissions
ª   ª       permission-engine.ts
ª   ª       permissions.ts
ª   ª       
ª   +---persistence
ª   ª   ª   persistence-provider.ts
ª   ª   ª   runtime-persistence.ts
ª   ª   ª   
ª   ª   +---providers
ª   ª           firestore-persistence-provider.ts
ª   ª           
ª   +---priority
ª   ª       priority-engine.ts
ª   ª       
ª   +---realtime
ª   ª       runtime-realtime-channel.ts
ª   ª       
ª   +---relations
ª   ª       relation-engine.ts
ª   ª       
ª   +---retry
ª   ª       retry-engine.ts
ª   ª       
ª   +---router
ª   ª       worker-router.ts
ª   ª       
ª   +---rules
ª   ª       register-rules.ts
ª   ª       rules-engine.ts
ª   ª       
ª   +---runtime
ª   ª       runtime-timeline.ts
ª   ª       
ª   +---schemas
ª   ª       exploitations.schema.ts
ª   ª       materiels.schema.ts
ª   ª       schema-registry.ts
ª   ª       terrains.schema.ts
ª   ª       types.ts
ª   ª       
ª   +---security-audit
ª   ª       security-audit-engine.ts
ª   ª       
ª   +---status
ª   ª       register-statuses.ts
ª   ª       status-engine.ts
ª   ª       
ª   +---supervision
ª   ª       supervision-service.ts
ª   ª       
ª   +---tenant
ª   ª       tenant-isolation-engine.ts
ª   ª       
ª   +---throttling
ª   ª       throttling-engine.ts
ª   ª       
ª   +---transactions
ª   ª       business-transaction-engine.ts
ª   ª       
ª   +---transitions
ª   ª       transition-engine.ts
ª   ª       
ª   +---types
ª   ª       Result.ts
ª   ª       
ª   +---utils
ª   ª       date.ts
ª   ª       formatFirestoreDate.ts
ª   ª       
ª   +---worker-loop
ª   ª       worker-loop.ts
ª   ª       
ª   +---workers
ª   ª       analytics-worker.ts
ª   ª       export-worker.ts
ª   ª       maintenance-worker.ts
ª   ª       notification-worker.ts
ª   ª       register-workers.ts
ª   ª       worker-registry.ts
ª   ª       workflow-worker.ts
ª   ª       
ª   +---workflows
ª           workflow-engine.ts
ª           
+---data-platform
ª   +---bi
ª   ª       BIService.ts
ª   ª       
ª   +---etl
ª   ª       ETLPipeline.ts
ª   ª       
ª   +---historical
ª   ª       HistoricalAnalyticsService.ts
ª   ª       
ª   +---services
ª   ª       DataOrchestrationService.ts
ª   ª       
ª   +---streaming
ª   ª       EventStreamingService.ts
ª   ª       
ª   +---warehouse
ª           DataWarehouseService.ts
ª           
+---domains
ª   +---achats
ª   +---clients
ª   +---commandes
ª   +---contrats
ª   ª   +---store
ª   ª           ContratsStore.ts
ª   ª           
ª   +---depenses
ª   +---devis
ª   +---employes
ª   +---factures
ª   +---fournisseurs
ª   +---incidents
ª   +---interventions
ª   ª   +---store
ª   ª           InterventionsStore.ts
ª   ª           
ª   +---intrants
ª   +---livraisons
ª   +---maintenance
ª   ª   +---services
ª   ª   ª       MaintenanceWorkflowService.ts
ª   ª   ª       
ª   ª   +---store
ª   ª           MaintenanceStore.ts
ª   ª           
ª   +---materiels
ª   ª   +---repositories
ª   ª   ª       MaterielsRepository.ts
ª   ª   ª       
ª   ª   +---store
ª   ª           MaterielsStore.ts
ª   ª           
ª   +---paiement
ª   ª   +---events
ª   ª   ª       PaiementEvents.ts
ª   ª   ª       
ª   ª   +---rules
ª   ª   ª       PaiementValidationRule.ts
ª   ª   ª       registerPaiementRules.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       PaiementService.ts
ª   ª   ª       
ª   ª   +---workflows
ª   ª           PaiementWorkflow.ts
ª   ª           
ª   +---parcelles
ª   +---recettes
ª   +---recoltes
ª   +---stock
ª   ª   +---rules
ª   ª   ª       PreventNegativeStockRule.ts
ª   ª   ª       registerStockRules.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       StockService.ts
ª   ª   ª       
ª   ª   +---store
ª   ª           StockStore.ts
ª   ª           
ª   +---taches
ª   +---vehicules
+---enums
ª       MouvementCategorie.ts
ª       MouvementSens.ts
ª       RoleUtilisateur.ts
ª       StatutStandard.ts
ª       Unite.ts
ª       
+---features
ª   +---achats
ª   ª       achats.feature.ts
ª   ª       
ª   +---alerts
ª   ª   +---components
ª   ª   ª       AlertsPanel.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useAlerts.ts
ª   ª   ª       
ª   ª   +---services
ª   ª           AlertService.ts
ª   ª           
ª   +---analytics
ª   ª   +---components
ª   ª   ª       AnalyticsCards.tsx
ª   ª   ª       analyticsHelpers.ts
ª   ª   ª       DashboardBarChart.tsx
ª   ª   ª       KpiBarChart.tsx
ª   ª   ª       KpiLineChart.tsx
ª   ª   ª       KpiPieChart.tsx
ª   ª   ª       ProductsCategoryChart.tsx
ª   ª   ª       StockAlerts.tsx
ª   ª   ª       StockValueChart.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useAnalytics.ts
ª   ª   ª       useDashboardStats.ts
ª   ª   ª       
ª   ª   +---services
ª   ª           DashboardAnalyticsService.ts
ª   ª           
ª   +---api
ª   ª   +---middleware
ª   ª   ª       apiAuth.ts
ª   ª   ª       
ª   ª   +---services
ª   ª           apiResponse.ts
ª   ª           
ª   +---audit
ª   ª   +---services
ª   ª   ª       AuditService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           AuditLog.ts
ª   ª           
ª   +---auth
ª   ª   +---components
ª   ª   ª       LoginForm.tsx
ª   ª   ª       RoleBadge.tsx
ª   ª   ª       RoleGuard.tsx
ª   ª   ª       
ª   ª   +---guards
ª   ª   ª       AuthGuard.tsx
ª   ª   ª       RoleGuard.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       usePermission.ts
ª   ª   ª       usePermissions.ts
ª   ª   ª       useSessionStore.ts
ª   ª   ª       
ª   ª   +---providers
ª   ª   ª       EnterpriseAuthProvider.tsx
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       AuthService.ts
ª   ª   ª       PermissionService.ts
ª   ª   ª       RBACEngine.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Permissions.ts
ª   ª           UserRole.ts
ª   ª           USER_ROLE.ts
ª   ª           
ª   +---billing
ª   ª   +---components
ª   ª   ª       BillingPlans.tsx
ª   ª   ª       FeatureGuard.tsx
ª   ª   ª       SubscriptionBadge.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useSubscriptions.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª       BillingRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       BillingService.ts
ª   ª   ª       hasFeatureAccess.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           BillingSubscription.ts
ª   ª           FeatureFlags.ts
ª   ª           Subscription.ts
ª   ª           SubscriptionPlan.ts
ª   ª           
ª   +---clients
ª   ª       clients.feature.ts
ª   ª       
ª   +---commandes
ª   ª       commandes.feature.ts
ª   ª       
ª   +---dashboard
ª   ª   +---components
ª   ª   ª       DashboardKPICards.tsx
ª   ª   ª       
ª   ª   +---widgets
ª   ª           DashboardActivityFeed.tsx
ª   ª           DashboardAlertCenter.tsx
ª   ª           DashboardAnalyticsPanel.tsx
ª   ª           
ª   +---depenses
ª   ª       depenses.feature.ts
ª   ª       
ª   +---devis
ª   ª       devis.feature.ts
ª   ª       
ª   +---employes
ª   ª       employes.feature.ts
ª   ª       
ª   +---exploitations
ª   ª   ª   exploitations.feature.ts
ª   ª   ª   
ª   ª   +---components
ª   ª   ª       ExploitationEditModal.tsx
ª   ª   ª       ExploitationForm.tsx
ª   ª   ª       ExploitationsEnterpriseTable.tsx
ª   ª   ª       ExploitationsFilterBar.tsx
ª   ª   ª       ExploitationsSearchBar.tsx
ª   ª   ª       ExploitationsTable.tsx
ª   ª   ª       LoadMoreButton.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useExploitations.ts
ª   ª   ª       usePaginatedExploitations.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª   ª   ExploitationRepository.ts
ª   ª   ª   ª   ExploitationsRepository.ts
ª   ª   ª   ª   
ª   ª   ª   +---firestore
ª   ª   ª           FirestoreExploitationRepository.ts
ª   ª   ª           
ª   ª   +---schemas
ª   ª   ª       ExploitationSchema.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       ExploitationService.ts
ª   ª   ª       ExploitationsService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Exploitation.ts
ª   ª           
ª   +---exports
ª   ª   +---components
ª   ª   ª       ExportButtons.tsx
ª   ª   ª       
ª   ª   +---services
ª   ª           ExportService.ts
ª   ª           
ª   +---factures
ª   ª       factures.feature.ts
ª   ª       
ª   +---fournisseurs
ª   ª   ª   fournisseurs.feature.ts
ª   ª   ª   
ª   ª   +---application
ª   ª   ª       FournisseursService.ts
ª   ª   ª       
ª   ª   +---domain
ª   ª   ª       Fournisseurs.ts
ª   ª   ª       FournisseursRepository.ts
ª   ª   ª       
ª   ª   +---infrastructure
ª   ª   ª       FirestoreFournisseursRepository.ts
ª   ª   ª       
ª   ª   +---runtime
ª   ª           EnterpriseFournisseursFlow.ts
ª   ª           
ª   +---incidents
ª   ª       incidents.feature.ts
ª   ª       
ª   +---interventions
ª   ª   ª   interventions.feature.ts
ª   ª   ª   
ª   ª   +---events
ª   ª   ª       InterventionEvents.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª   +---firestore
ª   ª   ª           FirestoreInterventionRepository.ts
ª   ª   ª           
ª   ª   +---services
ª   ª   ª       InterventionService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª   ª       Intervention.ts
ª   ª   ª       
ª   ª   +---workflows
ª   ª           BreakdownInterventionWorkflow.ts
ª   ª           
ª   +---intrants
ª   ª       intrants.feature.ts
ª   ª       
ª   +---invitations
ª   ª   +---components
ª   ª   ª       InvitationForm.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useInvitations.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª       InvitationsRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       InvitationService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Invitation.ts
ª   ª           
ª   +---livraisons
ª   ª       livraisons.feature.ts
ª   ª       
ª   +---materiels
ª   ª   ª   materiels.feature.ts
ª   ª   ª   
ª   ª   +---analytics
ª   ª   ª       MaterielAnalytics.ts
ª   ª   ª       
ª   ª   +---application
ª   ª   ª       MaterielService.ts
ª   ª   ª       
ª   ª   +---dashboard
ª   ª   ª       MaterielsDashboard.tsx
ª   ª   ª       
ª   ª   +---domain
ª   ª   ª       Materiel.ts
ª   ª   ª       MaterielRepository.ts
ª   ª   ª       
ª   ª   +---events
ª   ª   ª       MaterielEvents.ts
ª   ª   ª       
ª   ª   +---infrastructure
ª   ª   ª       FirestoreMaterielRepository.ts
ª   ª   ª       
ª   ª   +---policies
ª   ª   ª       MaterielPolicies.ts
ª   ª   ª       
ª   ª   +---realtime
ª   ª   ª       MaterielRealtimeGateway.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª   ª   MaterielRepository.ts
ª   ª   ª   ª   
ª   ª   ª   +---firestore
ª   ª   ª           FirestoreMaterielRepository.ts
ª   ª   ª           
ª   ª   +---runtime
ª   ª   ª       EnterpriseMaterielFlow.ts
ª   ª   ª       MaterielRuntimeHook.ts
ª   ª   ª       simulateEnterpriseMaterielFlow.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       MaterielService.ts
ª   ª   ª       
ª   ª   +---supervision
ª   ª   ª       MaterielSupervisionService.ts
ª   ª   ª       
ª   ª   +---tests
ª   ª   ª       MaterielService.test.ts
ª   ª   ª       
ª   ª   +---types
ª   ª   ª       Materiel.ts
ª   ª   ª       
ª   ª   +---ui
ª   ª   ª       MaterielsDashboard.tsx
ª   ª   ª       
ª   ª   +---workflows
ª   ª       ª   MaterielMaintenanceWorkflow.ts
ª   ª       ª   
ª   ª       +---definitions
ª   ª               CreateMaterielWorkflow.ts
ª   ª               
ª   +---memberships
ª   ª   +---hooks
ª   ª   ª       useMemberships.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª       MembershipsRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       MembershipService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Membership.ts
ª   ª           
ª   +---mouvements
ª   ª   +---repositories
ª   ª   ª       MouvementRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       MouvementService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Mouvement.ts
ª   ª           
ª   +---notifications
ª   ª   +---components
ª   ª   ª       NotificationBadge.tsx
ª   ª   ª       NotificationCenter.tsx
ª   ª   ª       RealtimeNotifications.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useNotifications.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       createStockAlert.ts
ª   ª   ª       NotificationService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Notification.ts
ª   ª           
ª   +---observability
ª   ª   ª   observability.feature.ts
ª   ª   ª   
ª   ª   +---components
ª   ª   ª       AuditTable.tsx
ª   ª   ª       RuntimeStatusCard.tsx
ª   ª   ª       
ª   ª   +---dashboards
ª   ª   ª       LiveRuntimeDashboard.tsx
ª   ª   ª       RuntimeHealthDashboard.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useAuditEvents.ts
ª   ª   ª       useRuntimeHealth.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª   ª   AuditService.ts
ª   ª   ª   ª   RuntimeObservabilityService.ts
ª   ª   ª   ª   
ª   ª   ª   +---live
ª   ª   ª   ª       LiveObservabilityService.ts
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª           WorkflowExecutionRealtimeService.ts
ª   ª   ª           
ª   ª   +---stores
ª   ª   ª   ª   observabilityStore.ts
ª   ª   ª   ª   
ª   ª   ª   +---live
ª   ª   ª   ª       liveEventStore.ts
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª           workflowExecutionStore.ts
ª   ª   ª           
ª   ª   +---types
ª   ª   ª       AuditEvent.ts
ª   ª   ª       RuntimeHealth.ts
ª   ª   ª       
ª   ª   +---widgets
ª   ª       ª   DeadLetterPanel.tsx
ª   ª       ª   EventStream.tsx
ª   ª       ª   RetryMonitor.tsx
ª   ª       ª   
ª   ª       +---live
ª   ª       ª       DeadLetterFeed.tsx
ª   ª       ª       EventReplayConsole.tsx
ª   ª       ª       LiveEventStream.tsx
ª   ª       ª       LiveEventStream.tsx.bak
ª   ª       ª       RetryActivityPanel.tsx
ª   ª       ª       WorkflowExecutionPanel.tsx
ª   ª       ª       
ª   ª       +---workflows
ª   ª               WorkflowExecutionMonitor.tsx
ª   ª               
ª   +---offline
ª   ª   +---components
ª   ª   ª       OfflineSyncCard.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useOfflineStatus.ts
ª   ª   ª       
ª   ª   +---queue
ª   ª   ª       OfflineQueue.ts
ª   ª   ª       
ª   ª   +---storage
ª   ª   ª       OfflineStorage.ts
ª   ª   ª       
ª   ª   +---sync
ª   ª           SyncService.ts
ª   ª           
ª   +---organisations
ª   ª   +---components
ª   ª   ª       OrganisationSwitcher.tsx
ª   ª   ª       SuperAdminBadge.tsx
ª   ª   ª       TenantGuard.tsx
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª       OrganisationRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       OrganisationService.ts
ª   ª   ª       tenantHelpers.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Organisation.ts
ª   ª           
ª   +---organization-analytics
ª   ª   +---components
ª   ª   ª       OrganizationAnalyticsCards.tsx
ª   ª   ª       PlanUsageCard.tsx
ª   ª   ª       
ª   ª   +---services
ª   ª           OrganizationAnalyticsService.ts
ª   ª           
ª   +---organizations
ª   ª   +---hooks
ª   ª   ª       useOrganizations.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª       OrganizationsRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       OrganizationService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Organization.ts
ª   ª           
ª   +---parcelles
ª   ª       parcelles.feature.ts
ª   ª       
ª   +---payments
ª   ª   +---components
ª   ª   ª       CheckoutButton.tsx
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       PaymentService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Checkout.ts
ª   ª           
ª   +---platform
ª   ª   +---components
ª   ª   ª   +---layout
ª   ª   ª   ª       EnterpriseTopbar.tsx
ª   ª   ª   ª       
ª   ª   ª   +---navigation
ª   ª   ª   ª       EnterpriseSidebar.tsx
ª   ª   ª   ª       
ª   ª   ª   +---notifications
ª   ª   ª   ª       NotificationCenter.tsx
ª   ª   ª   ª       
ª   ª   ª   +---runtime
ª   ª   ª           LiveActivityPanel.tsx
ª   ª   ª           RealtimeActivityPanel.tsx
ª   ª   ª           RuntimeActivityFeed.tsx
ª   ª   ª           runtimeActivityStore.ts
ª   ª   ª           RuntimeConsole.tsx
ª   ª   ª           RuntimeMetricsPanel.tsx
ª   ª   ª           WorkflowStatusPanel.tsx
ª   ª   ª           
ª   ª   +---dashboards
ª   ª   ª       ConnectedRuntimeDashboard.tsx
ª   ª   ª       EnterpriseSupervisionDashboard.tsx
ª   ª   ª       RealtimeRuntimeDashboard.tsx
ª   ª   ª       
ª   ª   +---shell
ª   ª   ª       EnterpriseShell.tsx
ª   ª   ª       
ª   ª   +---workspace
ª   ª           ConnectedEnterpriseWorkspace.tsx
ª   ª           EnterpriseWorkspace.tsx
ª   ª           
ª   +---platform-monitoring
ª   ª   +---components
ª   ª       ª   ERPStatusDashboard.tsx
ª   ª       ª   
ª   ª       +---graphs
ª   ª               EventTimeline.tsx
ª   ª               EventTimeline.tsx.bak
ª   ª               MetricsPanel.tsx
ª   ª               
ª   +---produits
ª   ª   ª   produits.feature.ts
ª   ª   ª   
ª   ª   +---components
ª   ª   ª       ProductEditForm.tsx
ª   ª   ª       ProductForm.tsx
ª   ª   ª       ProductsTable.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useProducts.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª   ª   ProductsRepository.ts
ª   ª   ª   ª   ProduitRepository.ts
ª   ª   ª   ª   
ª   ª   ª   +---firestore
ª   ª   ª           FirestoreProduitRepository.ts
ª   ª   ª           
ª   ª   +---services
ª   ª   ª       ProductService.ts
ª   ª   ª       ProduitService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Product.ts
ª   ª           Produit.ts
ª   ª           UNITE.ts
ª   ª           
ª   +---pwa
ª   ª   +---components
ª   ª           OfflineStatusCard.tsx
ª   ª           PWAInstallButton.tsx
ª   ª           
ª   +---recettes
ª   ª       recettes.feature.ts
ª   ª       
ª   +---recoltes
ª   ª       recoltes.feature.ts
ª   ª       
ª   +---ressources
ª   ª   +---repositories
ª   ª   ª       RessourceRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       RessourceService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Ressource.ts
ª   ª           
ª   +---runtime-supervision
ª   ª       RuntimeSupervisionDashboard.tsx
ª   ª       
ª   +---stocks
ª   ª   ª   stocks.feature.ts
ª   ª   ª   
ª   ª   +---repositories
ª   ª   ª   +---firestore
ª   ª   ª           FirestoreStockRepository.ts
ª   ª   ª           
ª   ª   +---services
ª   ª   ª       StockService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           MOUVEMENT_STOCK.ts
ª   ª           
ª   +---superadmin
ª   ª   +---components
ª   ª   ª       OrganisationsTable.tsx
ª   ª   ª       PlatformKpiCard.tsx
ª   ª   ª       
ª   ª   +---services
ª   ª           SuperAdminService.ts
ª   ª           
ª   +---taches
ª   ª       taches.feature.ts
ª   ª       
ª   +---teams
ª   ª   +---components
ª   ª   ª       TeamMembersTable.tsx
ª   ª   ª       
ª   ª   +---services
ª   ª           TeamService.ts
ª   ª           
ª   +---tenancy
ª   ª   +---components
ª   ª   ª       OrganizationSwitcher.tsx
ª   ª   ª       
ª   ª   +---context
ª   ª   ª       TenantProvider.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useTenant.ts
ª   ª   ª       
ª   ª   +---services
ª   ª           TenantService.ts
ª   ª           
ª   +---terrains
ª   ª   ª   terrains.feature.ts
ª   ª   ª   
ª   ª   +---repositories
ª   ª   ª       TerrainRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       TerrainService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Terrain.ts
ª   ª           
ª   +---vehicules
ª   ª       vehicules.feature.ts
ª   ª       
ª   +---workflow
ª   ª   +---components
ª   ª   ª       WorkflowActions.tsx
ª   ª   ª       WorkflowStatusBadge.tsx
ª   ª   ª       
ª   ª   +---types
ª   ª           WorkflowHistory.ts
ª   ª           WorkflowStatus.ts
ª   ª           
ª   +---workflow-engine
ª       +---components
ª       ª       WorkflowCard.tsx
ª       ª       WorkflowDashboard.tsx
ª       ª       
ª       +---services
ª       ª       EventBus.ts
ª       ª       ProcessOrchestrator.ts
ª       ª       WorkflowAnalytics.ts
ª       ª       WorkflowEngine.ts
ª       ª       
ª       +---types
ª               WorkflowDefinition.ts
ª               WorkflowExecution.ts
ª               
+---hooks
ª   ª   useCollection.ts
ª   ª   useDocument.ts
ª   ª   useProducts.ts
ª   ª   useRealtime.ts
ª   ª   useRealtimeCollection.ts
ª   ª   useToast.ts
ª   ª   
ª   +---runtime
ª           useRuntimeChannel.ts
ª           
+---infrastructure
ª   +---firebase
ª   ª       firebase.ts
ª   ª       FirestoreRepository.ts
ª   ª       
ª   +---repositories
ª       +---firestore
ª               BaseFirestoreRepository.ts
ª               FirestoreMaterielRepository.ts
ª               
+---lib
ª   ª   firebase.ts
ª   ª   
ª   +---api
ª   ª       apiClient.ts
ª   ª       
ª   +---auth
ª   ª       session.ts
ª   ª       
ª   +---firebase
ª   ª       config.ts
ª   ª       
ª   +---firestore
ª   ª   ª   BaseRepository.ts
ª   ª   ª   
ª   ª   +---repositories
ª   ª           ProductsRepository.ts
ª   ª           
ª   +---stripe
ª           client.ts
ª           
+---modules
ª   ª   disable-module.ps1
ª   ª   
ª   +---produits
ª           produit.mock.ts
ª           produit.model.ts
ª           produit.rules.ts
ª           
+---platform
ª   +---audit
ª   ª       AuditTrail.ts
ª   ª       
ª   +---auth
ª   ª   ª   AuthService.ts
ª   ª   ª   
ª   ª   +---guards
ª   ª   ª       AuthGuard.ts
ª   ª   ª       
ª   ª   +---session
ª   ª           SessionStore.ts
ª   ª           
ª   +---automation
ª   ª       ERPAutomationEngine.ts
ª   ª       registerAutomations.ts
ª   ª       
ª   +---bootstrap
ª   ª       bootstrapERP.ts
ª   ª       loadDomains.ts
ª   ª       loadFeatures.ts
ª   ª       loadFeatures.ts.bak
ª   ª       
ª   +---circuit-breaker
ª   ª       CircuitBreaker.ts
ª   ª       
ª   +---dependencies
ª   ª       DependencyValidator.ts
ª   ª       ModuleDependencies.ts
ª   ª       
ª   +---events
ª   ª       DomainEvents.ts
ª   ª       EventTypes.ts
ª   ª       
ª   +---execution
ª   ª   ª   WorkflowScheduler.ts
ª   ª   ª   
ª   ª   +---executors
ª   ª   ª       WorkflowExecutor.ts
ª   ª   ª       
ª   ª   +---queue
ª   ª           WorkflowQueue.ts
ª   ª           
ª   +---factories
ª   ª       createModuleService.ts
ª   ª       createPipelineRule.ts
ª   ª       
ª   +---governance
ª   ª   ª   GovernanceContext.ts
ª   ª   ª   GovernanceRuntime.ts
ª   ª   ª   registerPolicies.ts
ª   ª   ª   
ª   ª   +---features
ª   ª   ª       FeatureFlags.ts
ª   ª   ª       
ª   ª   +---permissions
ª   ª   ª       DomainPermissions.ts
ª   ª   ª       
ª   ª   +---policies
ª   ª   ª   ª   DefaultRuntimePolicy.ts
ª   ª   ª   ª   
ª   ª   ª   +---engine
ª   ª   ª   ª       RuntimePoliciesEngine.ts
ª   ª   ª   ª       
ª   ª   ª   +---registry
ª   ª   ª   ª       PolicyRegistry.ts
ª   ª   ª   ª       
ª   ª   ª   +---types
ª   ª   ª           RuntimePolicy.ts
ª   ª   ª           
ª   ª   +---tenants
ª   ª           TenantRegistry.ts
ª   ª           
ª   +---health
ª   ª       ERPHealthCheck.ts
ª   ª       
ª   +---integrations
ª   ª       registerWebhooks.ts
ª   ª       WebhookDispatcher.ts
ª   ª       WebhookRegistry.ts
ª   ª       
ª   +---intelligence
ª   ª       AutoHealingService.ts
ª   ª       OperationalIntelligenceScheduler.ts
ª   ª       RuntimeAnomalyDetector.ts
ª   ª       WorkflowScoringEngine.ts
ª   ª       
ª   +---modules
ª   ª   +---runtime
ª   ª   ª       ModuleRuntime.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           ExecutionMode.ts
ª   ª           ModuleContext.ts
ª   ª           
ª   +---monitoring
ª   ª       ERPMonitoringService.ts
ª   ª       
ª   +---navigation
ª   ª       buildNavigation.ts
ª   ª       
ª   +---notifications
ª   ª       NotificationBus.ts
ª   ª       
ª   +---observability
ª   ª       ERPLogger.ts
ª   ª       EventStore.ts
ª   ª       MetricsRegistry.ts
ª   ª       
ª   +---orchestration
ª   ª       ERPOrchestrator.ts
ª   ª       
ª   +---persistence
ª   ª       RuntimePersistenceService.ts
ª   ª       RuntimeRecoveryScheduler.ts
ª   ª       RuntimeSnapshotStore.ts
ª   ª       
ª   +---policies
ª   ª   +---engine
ª   ª   ª       PolicyEngine.ts
ª   ª   ª       
ª   ª   +---rules
ª   ª   ª       MaintenancePolicy.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Policy.ts
ª   ª           
ª   +---registry
ª   ª       FeatureDefinition.ts
ª   ª       FeatureRegistry.ts
ª   ª       ModuleRegistry.ts
ª   ª       
ª   +---resilience
ª   ª       DeadLetterQueue.ts
ª   ª       RetryPolicy.ts
ª   ª       
ª   +---rules
ª   ª   ª   registerBusinessRules.ts
ª   ª   ª   
ª   ª   +---audit
ª   ª   ª       RuleAudit.ts
ª   ª   ª       
ª   ª   +---core
ª   ª   ª       RuleExecutionContext.ts
ª   ª   ª       
ª   ª   +---engine
ª   ª   ª       BusinessRulesEngine.ts
ª   ª   ª       
ª   ª   +---monitoring
ª   ª   ª       RuleMonitoring.ts
ª   ª   ª       
ª   ª   +---pipelines
ª   ª   ª       PipelineType.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª   ª       RuleRegistry.ts
ª   ª   ª       
ª   ª   +---runtime
ª   ª   ª       RulePipelineRuntime.ts
ª   ª   ª       
ª   ª   +---security
ª   ª   ª       RuleSecurityPolicy.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           BusinessRule.ts
ª   ª           PipelineRule.ts
ª   ª           
ª   +---runtime
ª   ª       RuntimeBootstrap.ts
ª   ª       
ª   +---sagas
ª   ª       registerSagas.ts
ª   ª       SagaManager.ts
ª   ª       
ª   +---scheduling
ª   ª       DomainQueues.ts
ª   ª       WorkflowPriority.ts
ª   ª       WorkflowSchedulerPolicy.ts
ª   ª       
ª   +---security
ª   ª   ª   ExecutionPolicy.ts
ª   ª   ª   SecurityAudit.ts
ª   ª   ª   
ª   ª   +---guards
ª   ª   ª       FeatureGuard.ts
ª   ª   ª       
ª   ª   +---permissions
ª   ª   ª       PermissionEngine.ts
ª   ª   ª       
ª   ª   +---roles
ª   ª           RoleDefinition.ts
ª   ª           
ª   +---throttling
ª   ª       WorkflowThrottler.ts
ª   ª       
ª   +---timeline
ª   ª       ERPTimeline.ts
ª   ª       registerTimelineListeners.ts
ª   ª       
ª   +---workers
ª   ª       ERPWorker.ts
ª   ª       WorkerPool.ts
ª   ª       
ª   +---workflows
ª       ª   ERPAudit.ts
ª       ª   ERPNotifications.ts
ª       ª   ERPWorkflow.ts
ª       ª   
ª       +---history
ª       ª       WorkflowHistoryEntry.ts
ª       ª       
ª       +---registry
ª       ª       WorkflowRegistry.ts
ª       ª       
ª       +---runtime
ª       ª       WorkflowRuntime.ts
ª       ª       
ª       +---states
ª       ª       StateTransition.ts
ª       ª       WorkflowState.ts
ª       ª       
ª       +---store
ª       ª       WorkflowStateStore.ts
ª       ª       
ª       +---supervision
ª       ª       WorkflowSupervision.ts
ª       ª       
ª       +---timeline
ª               WorkflowTimeline.ts
ª               WorkflowTimelineEntry.ts
ª               
+---providers
ª       AppQueryProvider.tsx
ª       AuthProvider.tsx
ª       RootProviders.tsx
ª       TenantProvider.tsx
ª       ToastProvider.tsx
ª       
+---runtime
ª   ª   production.ts
ª   ª   README.md
ª   ª   test-file.txt
ª   ª   
ª   +---actions
ª   ª       ERPAction.ts
ª   ª       ERPActionExecutor.ts
ª   ª       ERPActionRegistry.ts
ª   ª       ERPActionResolver.ts
ª   ª       index.ts
ª   ª       
ª   +---ai
ª   ª   ª   ERPAISnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---anomalies
ª   ª   ª       ERPAIAnomaly.ts
ª   ª   ª       ERPAIAnomalyDetector.ts
ª   ª   ª       
ª   ª   +---assistant
ª   ª   ª       ERPAIAssistantEngine.ts
ª   ª   ª       ERPAIAssistantMessage.ts
ª   ª   ª       
ª   ª   +---insights
ª   ª   ª       ERPAIInsight.ts
ª   ª   ª       ERPAIInsightEngine.ts
ª   ª   ª       
ª   ª   +---recommendations
ª   ª   ª       ERPAIRecommendation.ts
ª   ª   ª       ERPAIRecommendationEngine.ts
ª   ª   ª       
ª   ª   +---search
ª   ª           ERPSemanticRuntimeSearch.ts
ª   ª           ERPSemanticSearchResult.ts
ª   ª           
ª   +---automation
ª   ª   ª   ERPAutomationEngine.ts
ª   ª   ª   ERPAutomationRegistry.ts
ª   ª   ª   ERPAutomationTimelineStore.ts
ª   ª   ª   ERPNotificationCenter.ts
ª   ª   ª   ERPRuntimeAutomationSeed.ts
ª   ª   ª   index.ts
ª   ª   ª   RuntimeAutomation.ts
ª   ª   ª   RuntimeAutomationEngine.ts
ª   ª   ª   runtimeAutomations.ts
ª   ª   ª   seedERPRuntimeAutomation.ts
ª   ª   ª   
ª   ª   +---actions
ª   ª   ª       ActionExecutor.ts
ª   ª   ª       
ª   ª   +---conditions
ª   ª   ª       ConditionEvaluator.ts
ª   ª   ª       
ª   ª   +---cron
ª   ª   ª       CronManager.ts
ª   ª   ª       
ª   ª   +---engine
ª   ª   ª       ERPAutomationEngine.ts
ª   ª   ª       ERPAutomationRegistry.ts
ª   ª   ª       ERPAutomationRule.ts
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       ERPRuntimeHooks.ts
ª   ª   ª       
ª   ª   +---notifications
ª   ª   ª       ERPNotificationCenter.ts
ª   ª   ª       
ª   ª   +---pipelines
ª   ª   ª       PipelineEngine.ts
ª   ª   ª       
ª   ª   +---rules
ª   ª   ª       AutomationRule.ts
ª   ª   ª       MaterielBreakdownRule.ts
ª   ª   ª       
ª   ª   +---runner
ª   ª   ª       AutomationRunner.ts
ª   ª   ª       
ª   ª   +---sagas
ª   ª   ª       SagaCoordinator.ts
ª   ª   ª       
ª   ª   +---scheduler
ª   ª   ª       AutomationScheduler.ts
ª   ª   ª       Scheduler.ts
ª   ª   ª       
ª   ª   +---timeline
ª   ª   ª       ERPAutomationExecution.ts
ª   ª   ª       ERPAutomationTimelineStore.ts
ª   ª   ª       
ª   ª   +---triggers
ª   ª   ª       AutomationTrigger.ts
ª   ª   ª       TriggerEngine.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Automation.ts
ª   ª           
ª   +---automation-runtime
ª   ª       AutomationRuntimeEngine.ts
ª   ª       AutomationRuntimeExecutor.ts
ª   ª       AutomationRuntimeQueue.ts
ª   ª       AutomationRuntimeRegistry.ts
ª   ª       AutomationRuntimeRules.ts
ª   ª       AutomationRuntimeScheduler.ts
ª   ª       AutomationRuntimeTriggerEngine.ts
ª   ª       AutomationRuntimeTypes.ts
ª   ª       index.ts
ª   ª       
ª   +---bootstrap
ª   ª       bootstrapEnterpriseRuntime.ts
ª   ª       bootstrapRuntime.ts
ª   ª       initializeRuntime.ts
ª   ª       registerBreakdownFlow.ts
ª   ª       registerDomainEvents.ts
ª   ª       registerMaterielWorkflows.ts
ª   ª       runtimeHealthCheck.ts
ª   ª       simulateBreakdown.ts
ª   ª       simulateBreakdownFlow.ts
ª   ª       startEnterpriseRuntime.ts
ª   ª       
ª   +---bus
ª   ª       RuntimeEventBus.ts
ª   ª       
ª   +---business-rules
ª   ª       RuntimeBusinessRule.ts
ª   ª       runtimeBusinessRules.ts
ª   ª       RuntimeBusinessRulesEngine.ts
ª   ª       
ª   +---cockpit
ª   ª       ERPCockpitSnapshot.ts
ª   ª       index.ts
ª   ª       
ª   +---compliance
ª   ª       ERPComplianceChecker.ts
ª   ª       ERPComplianceTypes.ts
ª   ª       
ª   +---computed
ª   ª       RuntimeComputedEngine.ts
ª   ª       
ª   +---context
ª   ª       RuntimeContextEngine.ts
ª   ª       
ª   +---core
ª   ª   ª   CentralRuntimeRegistry.ts
ª   ª   ª   index.ts
ª   ª   ª   RuntimeAlertRegistry.ts
ª   ª   ª   RuntimeAuditRegistry.ts
ª   ª   ª   RuntimeBindings.ts
ª   ª   ª   RuntimeBindings.ts.bak
ª   ª   ª   RuntimeCapabilities.ts
ª   ª   ª   RuntimeContracts.ts
ª   ª   ª   RuntimeDeadLetterQueue.ts
ª   ª   ª   RuntimeEventBus.ts
ª   ª   ª   RuntimeEventStore.ts
ª   ª   ª   RuntimeEventTopology.ts
ª   ª   ª   RuntimeExecutionRegistry.ts
ª   ª   ª   RuntimeHealthRegistry.ts
ª   ª   ª   RuntimeLifecycle.ts
ª   ª   ª   RuntimeMetricsRegistry.ts
ª   ª   ª   RuntimeModuleConnector.ts
ª   ª   ª   RuntimeObservabilityRegistry.ts
ª   ª   ª   RuntimeOrchestrator.ts
ª   ª   ª   RuntimePermissionRegistry.ts
ª   ª   ª   RuntimePermissionRegistry.ts.bak
ª   ª   ª   RuntimePipeline.ts
ª   ª   ª   RuntimePolicyRegistry.ts
ª   ª   ª   RuntimeQueueRegistry.ts
ª   ª   ª   RuntimeRetryRegistry.ts
ª   ª   ª   RuntimeScheduler.ts
ª   ª   ª   RuntimeSecurityRegistry.ts
ª   ª   ª   RuntimeStateRegistry.ts
ª   ª   ª   RuntimeStateRegistry.ts.bak
ª   ª   ª   RuntimeStreamRegistry.ts
ª   ª   ª   RuntimeSupervisor.ts
ª   ª   ª   RuntimeWorkerRegistry.ts
ª   ª   ª   RuntimeWorkflowRegistry.ts
ª   ª   ª   RuntimeWorkflowRegistry.ts.bak
ª   ª   ª   
ª   ª   +---context
ª   ª   ª       RuntimeContext.ts
ª   ª   ª       
ª   ª   +---executors
ª   ª   ª       RuntimeExecutor.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª   ª       RuntimeRegistry.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       RuntimePublisher.ts
ª   ª   ª       RuntimeSubscriber.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           RuntimeEvent.ts
ª   ª           
ª   +---data
ª   ª   ª   ERPDataEngine.ts
ª   ª   ª   ERPDataRepository.ts
ª   ª   ª   ERPModuleDataService.ts
ª   ª   ª   ERPModuleRuntimeDataBridge.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---adapters
ª   ª   ª       ERPStorageAdapter.ts
ª   ª   ª       MemoryERPStorageAdapter.ts
ª   ª   ª       
ª   ª   +---analytics
ª   ª   ª       AnalyticsEngine.ts
ª   ª   ª       PersistentAnalyticsEngine.ts
ª   ª   ª       
ª   ª   +---cqrs
ª   ª   ª       CQRSBus.ts
ª   ª   ª       
ª   ª   +---event-store
ª   ª   ª   ª   EventStore.ts
ª   ª   ª   ª   PersistentEventStore.ts
ª   ª   ª   ª   
ª   ª   ª   +---dispatchers
ª   ª   ª   ª       ProjectionDispatcher.ts
ª   ª   ª   ª       
ª   ª   ª   +---replay
ª   ª   ª   ª       ReplayEngine.ts
ª   ª   ª   ª       
ª   ª   ª   +---serialization
ª   ª   ª   ª       EventSerializer.ts
ª   ª   ª   ª       
ª   ª   ª   +---snapshots
ª   ª   ª   ª       SnapshotManager.ts
ª   ª   ª   ª       
ª   ª   ª   +---streams
ª   ª   ª           StreamManager.ts
ª   ª   ª           
ª   ª   +---forecast
ª   ª   ª       ForecastEngine.ts
ª   ª   ª       
ª   ª   +---projections
ª   ª   ª       ProjectionEngine.ts
ª   ª   ª       
ª   ª   +---read-models
ª   ª   ª       ReadModelBuilder.ts
ª   ª   ª       
ª   ª   +---reporting
ª   ª   ª       ReportingEngine.ts
ª   ª   ª       
ª   ª   +---warehouse
ª   ª           DataWarehouseConnector.ts
ª   ª           
ª   +---data-binding
ª   ª       index.ts
ª   ª       RuntimeDataBinding.ts
ª   ª       RuntimeRecord.ts
ª   ª       
ª   +---dead-letter
ª   ª       DeadLetterQueue.ts
ª   ª       
ª   +---domain
ª   ª   ª   index.ts
ª   ª   ª   TerragestDomainRuntimeBridge.ts
ª   ª   ª   
ª   ª   +---adapters
ª   ª   ª       TerragestBusinessRuleAdapter.ts
ª   ª   ª       
ª   ª   +---models
ª   ª   ª       TerragestDomainModel.ts
ª   ª   ª       
ª   ª   +---rules
ª   ª           TerragestBusinessRules.ts
ª   ª           TerragestInterModuleRules.ts
ª   ª           
ª   +---enterprise-runtime
ª   ª       EnterpriseRuntimeDiagnostics.ts
ª   ª       EnterpriseRuntimeGovernance.ts
ª   ª       EnterpriseRuntimeKernel.ts
ª   ª       EnterpriseRuntimeLifecycle.ts
ª   ª       EnterpriseRuntimePerformance.ts
ª   ª       index.ts
ª   ª       
ª   +---event-runtime
ª   ª       ERPEventRuntimeBus.ts
ª   ª       ERPEventRuntimeOrchestrator.ts
ª   ª       ERPEventRuntimeStore.ts
ª   ª       ERPEventRuntimeSubscriptionRegistry.ts
ª   ª       ERPEventRuntimeSubscriptions.ts
ª   ª       ERPEventRuntimeTypes.ts
ª   ª       index.ts
ª   ª       
ª   +---events
ª   ª   ª   ERPDomainEvent.ts
ª   ª   ª   ERPEventAutomationBridge.ts
ª   ª   ª   ERPEventBus.ts
ª   ª   ª   ERPRuntimeEventOrchestrator.ts
ª   ª   ª   EventBus.ts
ª   ª   ª   EventPipeline.ts
ª   ª   ª   index.ts
ª   ª   ª   MaintenanceEvents.ts
ª   ª   ª   RuntimeEvent.ts
ª   ª   ª   RuntimeEventBus.ts
ª   ª   ª   RuntimeEventRegistry.ts
ª   ª   ª   
ª   ª   +---bus
ª   ª   ª       ERPEventBus.ts
ª   ª   ª       
ª   ª   +---store
ª   +---execution
ª   ª       PersistentWorkflowExecutor.ts
ª   ª       RuntimeExecutor.ts
ª   ª       
ª   +---firebase
ª   ª       runtime-firestore.ts
ª   ª       
ª   +---firestore
ª   ª   ª   FirestoreRuntimeMutation.ts
ª   ª   ª   FirestoreRuntimeQuery.ts
ª   ª   ª   FirestoreRuntimeRealtime.ts
ª   ª   ª   FirestoreRuntimeRepository.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---generated
ª   ª       +---achats
ª   ª       +---clients
ª   ª       +---commandes
ª   ª       +---depenses
ª   ª       +---devis
ª   ª       +---employes
ª   ª       +---factures
ª   ª       +---fournisseurs
ª   ª       +---incidents
ª   ª       +---intrants
ª   ª       +---livraisons
ª   ª       +---parcelles
ª   ª       +---recettes
ª   ª       +---recoltes
ª   ª       +---taches
ª   ª       +---vehicules
ª   +---forms
ª   ª       DynamicField.ts
ª   ª       DynamicFormDefinition.ts
ª   ª       DynamicFormEngine.ts
ª   ª       DynamicFormRegistry.ts
ª   ª       DynamicFormRegistry.ts.bak
ª   ª       ERPFormEngine.tsx
ª   ª       
ª   +---generated
ª   ª       GeneratedRuntimeTopology.ts
ª   ª       
ª   +---generation
ª   ª       ERPDashboardGenerationEngine.ts
ª   ª       ERPFormGenerationEngine.ts
ª   ª       ERPMenuGenerationEngine.ts
ª   ª       ERPModuleGenerationEngine.ts
ª   ª       ERPModuleRuntimeFactory.tsx
ª   ª       ERPPageGenerationEngine.tsx
ª   ª       ERPPermissionsGenerationEngine.ts
ª   ª       ERPRoutesGenerationEngine.ts
ª   ª       ERPTableGenerationEngine.ts
ª   ª       ERPWorkflowGenerationEngine.ts
ª   ª       index.ts
ª   ª       
ª   +---governance
ª   ª   ª   EnterpriseGovernanceEngine.ts
ª   ª   ª   simulateGovernance.ts
ª   ª   ª   
ª   ª   +---boundaries
ª   ª   ª       DomainBoundaryValidator.ts
ª   ª   ª       
ª   ª   +---contracts
ª   ª   ª       RuntimeContractValidator.ts
ª   ª   ª       
ª   ª   +---duplication
ª   ª   ª       AntiDuplicationGuard.ts
ª   ª   ª       
ª   ª   +---naming
ª   ª   ª       NamingConventionChecker.ts
ª   ª   ª       
ª   ª   +---patterns
ª   ª   ª       SharedPatternRegistry.ts
ª   ª   ª       
ª   ª   +---policies
ª   ª           ArchitecturePolicyEngine.ts
ª   ª           
ª   +---integrations
ª   ª   +---adapters
ª   ª   ª       ProviderAdapter.ts
ª   ª   ª       
ª   ª   +---api
ª   ª   ª       ApiGateway.ts
ª   ª   ª       
ª   ª   +---bridges
ª   ª   ª       ExternalEventBridge.ts
ª   ª   ª       IntegrationBus.ts
ª   ª   ª       
ª   ª   +---connectors
ª   ª   ª       ConnectorRegistry.ts
ª   ª   ª       
ª   ª   +---federation
ª   ª   ª       FederationEngine.ts
ª   ª   ª       
ª   ª   +---sync
ª   ª   ª       SyncEngine.ts
ª   ª   ª       
ª   ª   +---webhooks
ª   ª           WebhookManager.ts
ª   ª           
ª   +---listeners
ª   ª       MaintenanceAuditListener.ts
ª   ª       MaintenanceNotificationListener.ts
ª   ª       
ª   +---metadata
ª   ª       ERPMetadataGenerationBridge.ts
ª   ª       ERPMetadataRegistry.ts
ª   ª       ERPModuleSchemas.ts
ª   ª       
ª   +---metrics
ª   ª       RuntimeMetrics.ts
ª   ª       
ª   +---modules
ª   ª   ª   ERPModule.ts
ª   ª   ª   ERPModuleDefinition.ts
ª   ª   ª   ERPModuleRegistry.ts
ª   ª   ª   index.ts
ª   ª   ª   registerCoreERPModules.ts
ª   ª   ª   registerCoreERPModules.ts.bak
ª   ª   ª   
ª   ª   +---adapters
ª   ª   ª       CoreModuleRuntimeAdapter.ts
ª   ª   ª       CoreModuleRuntimeAdapter.ts.bak
ª   ª   ª       
ª   ª   +---builders
ª   ª   ª       ERPModuleBuilder.ts
ª   ª   ª       
ª   ª   +---definitions
ª   ª   ª       coreModules.ts
ª   ª   ª       coreModules.ts.bak
ª   ª   ª       
ª   ª   +---factories
ª   ª   ª       RuntimeFormFactory.ts
ª   ª   ª       RuntimePageFactory.ts
ª   ª   ª       RuntimeTableFactory.ts
ª   ª   ª       
ª   ª   +---factory
ª   ª   ª       businessFields.ts
ª   ª   ª       createBusinessModule.ts
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---generated
ª   ª   ª   +---achats
ª   ª   ª   +---clients
ª   ª   ª   +---commandes
ª   ª   ª   +---depenses
ª   ª   ª   +---devis
ª   ª   ª   +---employes
ª   ª   ª   +---factures
ª   ª   ª   +---fournisseurs
ª   ª   ª   +---incidents
ª   ª   ª   +---intrants
ª   ª   ª   +---livraisons
ª   ª   ª   +---parcelles
ª   ª   ª   +---recettes
ª   ª   ª   +---recoltes
ª   ª   ª   +---taches
ª   ª   ª   +---vehicules
ª   ª   +---lifecycle
ª   ª   ª       ERPModuleAuditor.ts
ª   ª   ª       ERPModuleDependencyGraph.ts
ª   ª   ª       ERPModuleLifecycleManager.ts
ª   ª   ª       ERPRelationDataLoader.ts
ª   ª   ª       ERPRelationResolver.ts
ª   ª   ª       
ª   ª   +---metadata
ª   ª   ª       ERPModuleMetadata.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª   ª       registerCoreModules.ts
ª   ª   ª       
ª   ª   +---renderer
ª   ª   ª       ERPModuleDetailRenderer.tsx
ª   ª   ª       ERPModuleListRenderer.tsx
ª   ª   ª       
ª   ª   +---renderers
ª   ª   ª       ERPModuleRenderer.ts
ª   ª   ª       
ª   ª   +---schemas
ª   ª           ERPModuleSchema.ts
ª   ª           
ª   +---monitoring
ª   ª   ª   ConnectedRuntimeEventPublisher.ts
ª   ª   ª   ERPMonitoringSnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   PersistentRuntimePublisher.ts
ª   ª   ª   RuntimeEventPublisher.ts
ª   ª   ª   simulateRuntimeActivity.ts
ª   ª   ª   WorkflowAnalytics.ts
ª   ª   ª   
ª   ª   +---errors
ª   ª   ª       ERPErrorAnalytics.ts
ª   ª   ª       
ª   ª   +---health
ª   ª   ª       ERPHealthCenter.ts
ª   ª   ª       ERPHealthCheck.ts
ª   ª   ª       
ª   ª   +---metrics
ª   ª   ª       ERPMonitoringMetrics.ts
ª   ª   ª       
ª   ª   +---topology
ª   ª           ERPDependencyGraph.ts
ª   ª           
ª   +---mutations
ª   ª       index.ts
ª   ª       RuntimeMutationEngine.ts
ª   ª       
ª   +---navigation
ª   ª       ERPRelationNavigation.tsx
ª   ª       RuntimeNavigationEngine.ts
ª   ª       RuntimeNavigationLink.ts
ª   ª       
ª   +---notifications
ª   ª       ERPNotificationsPanel.tsx
ª   ª       RuntimeNotification.ts
ª   ª       RuntimeNotificationEngine.ts
ª   ª       
ª   +---observability
ª   ª   ª   ERPAlertStore.ts
ª   ª   ª   ERPObservabilityTimeline.ts
ª   ª   ª   ERPRuntimeAuditBridge.ts
ª   ª   ª   ERPRuntimeAuditTrail.ts
ª   ª   ª   ERPRuntimeSeed.ts
ª   ª   ª   ERPTraceStore.ts
ª   ª   ª   index.ts
ª   ª   ª   RuntimeLog.ts
ª   ª   ª   RuntimeLogsPanel.tsx
ª   ª   ª   RuntimeObservabilityEngine.ts
ª   ª   ª   seedERPRuntimeObservability.ts
ª   ª   ª   
ª   ª   +---alerts
ª   ª   ª       ERPAlert.ts
ª   ª   ª       ERPAlertStore.ts
ª   ª   ª       
ª   ª   +---generated
ª   ª   ª   +---achats
ª   ª   ª   ª       achats.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---clients
ª   ª   ª   ª       clients.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---commandes
ª   ª   ª   ª       commandes.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---depenses
ª   ª   ª   ª       depenses.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---devis
ª   ª   ª   ª       devis.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---employes
ª   ª   ª   ª       employes.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---factures
ª   ª   ª   ª       factures.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---fournisseurs
ª   ª   ª   ª       fournisseurs.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---incidents
ª   ª   ª   ª       incidents.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---intrants
ª   ª   ª   ª       intrants.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---livraisons
ª   ª   ª   ª       livraisons.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---parcelles
ª   ª   ª   ª       parcelles.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---recettes
ª   ª   ª   ª       recettes.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---recoltes
ª   ª   ª   ª       recoltes.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---taches
ª   ª   ª   ª       taches.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---vehicules
ª   ª   ª           vehicules.observability.ts
ª   ª   ª           
ª   ª   +---timeline
ª   ª   ª       ERPObservabilityTimeline.ts
ª   ª   ª       
ª   ª   +---traces
ª   ª           ERPTrace.ts
ª   ª           ERPTraceStore.ts
ª   ª           
ª   +---orchestration
ª   ª       MaterielBreakdownFlow.ts
ª   ª       PersistentMaterielBreakdownFlow.ts
ª   ª       ProcessOrchestrator.ts
ª   ª       RuntimeModuleOrchestrator.ts
ª   ª       simulatePersistentBreakdownFlow.ts
ª   ª       WorkflowDispatcher.ts
ª   ª       
ª   +---os
ª   ª   +---access
ª   ª   ª       AccessController.ts
ª   ª   ª       
ª   ª   +---audit
ª   ª   ª       AuditStream.ts
ª   ª   ª       PersistentAuditStream.ts
ª   ª   ª       
ª   ª   +---context
ª   ª   ª       OrganizationContext.ts
ª   ª   ª       
ª   ª   +---governance
ª   ª   ª       GovernanceEngine.ts
ª   ª   ª       
ª   ª   +---permissions
ª   ª   ª       PermissionEngine.ts
ª   ª   ª       
ª   ª   +---security
ª   ª   ª       SecurityPolicy.ts
ª   ª   ª       
ª   ª   +---tenants
ª   ª           RuntimeIsolationManager.ts
ª   ª           TenantManager.ts
ª   ª           
ª   +---os-enterprise
ª   ª       ERPCommand.ts
ª   ª       ERPCommandCenter.ts
ª   ª       ERPNotification.ts
ª   ª       ERPNotificationCenter.ts
ª   ª       ERPSavedView.ts
ª   ª       ERPSavedViews.ts
ª   ª       ERPUserContext.ts
ª   ª       index.ts
ª   ª       
ª   +---permissions
ª   ª       ERPProtectedAction.tsx
ª   ª       RuntimePermission.ts
ª   ª       runtimePermissions.ts
ª   ª       RuntimePermissionsEngine.ts
ª   ª       
ª   +---persistence
ª   ª   ª   ERPPersistenceSeed.ts
ª   ª   ª   FirestoreHealthCheck.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---analytics
ª   ª   ª       AnalyticsRepository.ts
ª   ª   ª       
ª   ª   +---audit
ª   ª   ª       AuditRepository.ts
ª   ª   ª       
ª   ª   +---drivers
ª   ª   ª       ERPInMemoryPersistenceDriver.ts
ª   ª   ª       ERPPersistenceDriver.ts
ª   ª   ª       
ª   ª   +---events
ª   ª   ª       RuntimeEventRepository.ts
ª   ª   ª       
ª   ª   +---processes
ª   ª   ª       ProcessRepository.ts
ª   ª   ª       
ª   ª   +---projections
ª   ª   ª       ProjectionRepository.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª       ERPRuntimeRepository.ts
ª   ª   ª       
ª   ª   +---snapshots
ª   ª   ª       ERPPersistenceSnapshot.ts
ª   ª   ª       
ª   ª   +---stores
ª   ª   ª       ERPPersistenceCollections.ts
ª   ª   ª       ERPRuntimePersistenceService.ts
ª   ª   ª       
ª   ª   +---workflows
ª   ª           WorkflowRepository.ts
ª   ª           
ª   +---policies
ª   ª   ª   ERPPolicyEngine.ts
ª   ª   ª   ERPRuntimeAuthorizationBridge.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---generated
ª   ª       +---achats
ª   ª       ª       achats.policy.ts
ª   ª       ª       
ª   ª       +---clients
ª   ª       ª       clients.policy.ts
ª   ª       ª       
ª   ª       +---commandes
ª   ª       ª       commandes.policy.ts
ª   ª       ª       
ª   ª       +---depenses
ª   ª       ª       depenses.policy.ts
ª   ª       ª       
ª   ª       +---devis
ª   ª       ª       devis.policy.ts
ª   ª       ª       
ª   ª       +---employes
ª   ª       ª       employes.policy.ts
ª   ª       ª       
ª   ª       +---factures
ª   ª       ª       factures.policy.ts
ª   ª       ª       
ª   ª       +---fournisseurs
ª   ª       ª       fournisseurs.policy.ts
ª   ª       ª       
ª   ª       +---incidents
ª   ª       ª       incidents.policy.ts
ª   ª       ª       
ª   ª       +---intrants
ª   ª       ª       intrants.policy.ts
ª   ª       ª       
ª   ª       +---livraisons
ª   ª       ª       livraisons.policy.ts
ª   ª       ª       
ª   ª       +---parcelles
ª   ª       ª       parcelles.policy.ts
ª   ª       ª       
ª   ª       +---recettes
ª   ª       ª       recettes.policy.ts
ª   ª       ª       
ª   ª       +---recoltes
ª   ª       ª       recoltes.policy.ts
ª   ª       ª       
ª   ª       +---taches
ª   ª       ª       taches.policy.ts
ª   ª       ª       
ª   ª       +---vehicules
ª   ª               vehicules.policy.ts
ª   ª               
ª   +---processes
ª   ª   ª   PersistentProcessExecutor.ts
ª   ª   ª   
ª   ª   +---approvals
ª   ª   ª       ApprovalEngine.ts
ª   ª   ª       
ª   ª   +---definitions
ª   ª   ª       MaterielMaintenanceProcess.ts
ª   ª   ª       ProcessDefinition.ts
ª   ª   ª       
ª   ª   +---escalations
ª   ª   ª       EscalationManager.ts
ª   ª   ª       
ª   ª   +---human-tasks
ª   ª   ª       HumanTaskManager.ts
ª   ª   ª       
ª   ª   +---lifecycle
ª   ª   ª       LifecycleManager.ts
ª   ª   ª       
ª   ª   +---sla
ª   ª   ª       SLAEngine.ts
ª   ª   ª       
ª   ª   +---state-machine
ª   ª   ª       StateMachine.ts
ª   ª   ª       
ª   ª   +---transitions
ª   ª           TransitionManager.ts
ª   ª           
ª   +---production
ª   ª   ª   index.ts
ª   ª   ª   ProductionLogger.ts
ª   ª   ª   ProductionReadiness.ts
ª   ª   ª   readiness.ts
ª   ª   ª   RuntimeCache.ts
ª   ª   ª   RuntimeErrorReporter.ts
ª   ª   ª   RuntimeHealthMonitor.ts
ª   ª   ª   RuntimeRateLimiter.ts
ª   ª   ª   
ª   ª   +---backup
ª   ª   ª       ERPBackupPlan.ts
ª   ª   ª       ERPBackupPlanRegistry.ts
ª   ª   ª       
ª   ª   +---cloud
ª   ª   ª       ERPCloudReadinessCheck.ts
ª   ª   ª       ERPCloudReadinessRegistry.ts
ª   ª   ª       
ª   ª   +---governance
ª   ª   ª       ERPProductionPolicy.ts
ª   ª   ª       ERPProductionPolicyRegistry.ts
ª   ª   ª       
ª   ª   +---limits
ª   ª   ª       ERPRateLimit.ts
ª   ª   ª       ERPRateLimitRegistry.ts
ª   ª   ª       
ª   ª   +---quotas
ª   ª   ª       ERPTenantQuota.ts
ª   ª   ª       ERPTenantQuotaRegistry.ts
ª   ª   ª       
ª   ª   +---readiness
ª   ª           ERPProductionReadinessSnapshot.ts
ª   ª           
ª   +---quality
ª   ª   ª   simulateQualityPlatform.ts
ª   ª   ª   
ª   ª   +---build
ª   ª   ª       EnterpriseBuildPipeline.ts
ª   ª   ª       
ª   ª   +---checks
ª   ª   ª       WorkflowConsistencyCheck.ts
ª   ª   ª       
ª   ª   +---gates
ª   ª   ª       QualityGateEngine.ts
ª   ª   ª       
ª   ª   +---health
ª   ª   ª       DependencyHealthChecker.ts
ª   ª   ª       
ª   ª   +---integrity
ª   ª   ª       RuntimeIntegrityCheck.ts
ª   ª   ª       
ª   ª   +---validation
ª   ª           RuntimeValidator.ts
ª   ª           
ª   +---query
ª   ª       index.ts
ª   ª       RuntimeQueryEngine.ts
ª   ª       
ª   +---realtime
ª   ª   ª   ERPRealtimeSeed.ts
ª   ª   ª   index.ts
ª   ª   ª   simulateRealtimeRuntime.ts
ª   ª   ª   
ª   ª   +---bus
ª   ª   ª       ERPRealtimeBus.ts
ª   ª   ª       
ª   ª   +---channels
ª   ª   ª       ERPRealtimeChannel.ts
ª   ª   ª       RuntimeChannelManager.ts
ª   ª   ª       
ª   ª   +---gateway
ª   ª   ª       RuntimeRealtimeGateway.ts
ª   ª   ª       
ª   ª   +---metrics
ª   ª   ª       LiveMetricsStream.ts
ª   ª   ª       
ª   ª   +---notifications
ª   ª   ª       LiveNotificationService.ts
ª   ª   ª       
ª   ª   +---presence
ª   ª   ª       ERPRealtimePresence.ts
ª   ª   ª       
ª   ª   +---snapshots
ª   ª   ª       ERPRealtimeSnapshot.ts
ª   ª   ª       
ª   ª   +---streams
ª   ª   ª       LiveWorkflowUpdates.ts
ª   ª   ª       
ª   ª   +---websocket
ª   ª           RuntimeWebSocketServer.ts
ª   ª           
ª   +---registry
ª   ª   ª   ERPRegistry.ts
ª   ª   ª   index.ts
ª   ª   ª   types.ts
ª   ª   ª   WorkflowRegistry.ts
ª   ª   ª   
ª   ª   +---actions
ª   ª   +---automation
ª   ª   +---events
ª   ª   +---modules
ª   ª   ª       ERPRegistryModules.ts
ª   ª   ª       ERPRegistryModules.ts.bak
ª   ª   ª       
ª   ª   +---navigation
ª   ª   +---permissions
ª   ª   +---schemas
ª   ª   +---workflows
ª   +---relations
ª   ª       RuntimeRelation.ts
ª   ª       runtimeRelations.ts
ª   ª       RuntimeRelationsEngine.ts
ª   ª       
ª   +---repositories
ª   ª       index.ts
ª   ª       RuntimeRepository.ts
ª   ª       
ª   +---resilience
ª   ª   ª   CircuitBreaker.ts
ª   ª   ª   ERPRuntimeResilienceSeed.ts
ª   ª   ª   index.ts
ª   ª   ª   RetryPolicy.ts
ª   ª   ª   
ª   ª   +---circuit-breaker
ª   ª   ª       ERPCircuitBreaker.ts
ª   ª   ª       
ª   ª   +---dlq
ª   ª   ª       DeadLetterQueue.ts
ª   ª   ª       ERPDeadLetterStore.ts
ª   ª   ª       
ª   ª   +---queue
ª   ª   ª       ERPQueueJob.ts
ª   ª   ª       ERPQueueStore.ts
ª   ª   ª       
ª   ª   +---retry
ª   ª   ª       ERPRetryPolicy.ts
ª   ª   ª       RetryEngine.ts
ª   ª   ª       
ª   ª   +---worker
ª   ª           ERPQueueWorker.ts
ª   ª           
ª   +---rules
ª   ª   ª   BusinessRule.ts
ª   ª   ª   ERPBusinessRuleEngine.ts
ª   ª   ª   ERPRuntimeValidationBridge.ts
ª   ª   ª   index.ts
ª   ª   ª   MaterielCriticalRule.ts
ª   ª   ª   
ª   ª   +---context
ª   ª   ª       ContextResolver.ts
ª   ª   ª       
ª   ª   +---decisions
ª   ª   ª       DecisionEngine.ts
ª   ª   ª       
ª   ª   +---engine
ª   ª   ª       RuleExecutor.ts
ª   ª   ª       
ª   ª   +---evaluators
ª   ª   ª       ConditionEvaluator.ts
ª   ª   ª       RuleEvaluator.ts
ª   ª   ª       
ª   ª   +---pipelines
ª   ª   ª       RulePipeline.ts
ª   ª   ª       
ª   ª   +---policies
ª   ª   ª       PolicyEngine.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª   ª       RuleRegistry.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Rule.ts
ª   ª           
ª   +---scheduler
ª   ª       RuntimeScheduler.ts
ª   ª       RuntimeSchedulerBootstrap.tsx
ª   ª       
ª   +---schemas
ª   ª       ERPBusinessSchema.ts
ª   ª       ERPBusinessSchemaRegistry.ts
ª   ª       ERPBusinessSchemaRegistry.ts.bak
ª   ª       index.ts
ª   ª       
ª   +---security
ª   ª   ª   ERPSecuritySeed.ts
ª   ª   ª   ERPSecuritySnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   RuntimeSecurityManager.ts
ª   ª   ª   
ª   ª   +---audit
ª   ª   ª       ERPSecurityAuditLog.ts
ª   ª   ª       ERPSecurityAuditStore.ts
ª   ª   ª       
ª   ª   +---guards
ª   ª   ª       ERPAccessGuard.ts
ª   ª   ª       
ª   ª   +---permissions
ª   ª   ª       ERPPermission.ts
ª   ª   ª       ERPPermissionRegistry.ts
ª   ª   ª       
ª   ª   +---policies
ª   ª   ª       ERPPolicy.ts
ª   ª   ª       ERPPolicyRegistry.ts
ª   ª   ª       
ª   ª   +---roles
ª   ª   ª       ERPRole.ts
ª   ª   ª       ERPRoleRegistry.ts
ª   ª   ª       
ª   ª   +---sessions
ª   ª           ERPSecuritySession.ts
ª   ª           ERPSessionContext.ts
ª   ª           
ª   +---security-runtime
ª   ª       index.ts
ª   ª       RuntimeActionGuard.ts
ª   ª       RuntimeActionPermissionMapper.ts
ª   ª       RuntimePermission.ts
ª   ª       RuntimePolicyEngine.ts
ª   ª       RuntimePolicyRegistry.ts
ª   ª       RuntimeRole.ts
ª   ª       RuntimeSecurityContext.ts
ª   ª       RuntimeWorkflowGuard.ts
ª   ª       
ª   +---selects
ª   ª       DynamicSelect.types.ts
ª   ª       DynamicSelectEngine.ts
ª   ª       ERPDynamicSelect.tsx
ª   ª       
ª   +---shared
ª   ª       ERPRuntimeCollection.ts
ª   ª       ERPRuntimeEntity.ts
ª   ª       ERPRuntimeStore.ts
ª   ª       ERPRuntimeStore.ts$
ª   ª       ERPRuntimeTypes.ts
ª   ª       
ª   +---smart-intelligence
ª   ª       index.ts
ª   ª       SmartAnomalyDetector.ts
ª   ª       SmartIntelligenceTypes.ts
ª   ª       SmartOperationalIntelligence.ts
ª   ª       SmartPredictionEngine.ts
ª   ª       SmartRecommendationEngine.ts
ª   ª       SmartScoringEngine.ts
ª   ª       
ª   +---smart-runtime
ª   ª       ERPSmartInsight.ts
ª   ª       ERPSmartPriorityEngine.ts
ª   ª       ERPSmartRecommendations.ts
ª   ª       ERPSmartRuntimeEngine.ts
ª   ª       index.ts
ª   ª       
ª   +---state
ª   ª       ERPStateBadge.tsx
ª   ª       RuntimeState.ts
ª   ª       RuntimeStateEngine.ts
ª   ª       runtimeStates.ts
ª   ª       
ª   +---streams
ª   ª   ª   ERPStreamsSeed.ts
ª   ª   ª   ERPStreamsSnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---channels
ª   ª   ª       ERPStreamChannel.ts
ª   ª   ª       ERPStreamRegistry.ts
ª   ª   ª       
ª   ª   +---events
ª   ª   ª       ERPStreamEvent.ts
ª   ª   ª       
ª   ª   +---gateway
ª   ª   ª       ERPRealtimeGateway.ts
ª   ª   ª       
ª   ª   +---history
ª   ª   ª       ERPStreamHistoryStore.ts
ª   ª   ª       
ª   ª   +---metrics
ª   ª           ERPStreamMetricsStore.ts
ª   ª           
ª   +---supervision
ª   ª       WorkflowSupervisor.ts
ª   ª       
ª   +---tenant
ª   ª   ª   ERPTenantSeed.ts
ª   ª   ª   ERPTenantSnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---context
ª   ª   ª       ERPTenantContext.ts
ª   ª   ª       
ª   ª   +---isolation
ª   ª   ª       ERPTenantIsolation.ts
ª   ª   ª       
ª   ª   +---metrics
ª   ª   ª       ERPTenantMetrics.ts
ª   ª   ª       ERPTenantMetricsStore.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª           ERPTenant.ts
ª   ª           ERPTenantRegistry.ts
ª   ª           
ª   +---testing
ª   ª   ª   ERPTestingSeed.ts
ª   ª   ª   ERPTestingSnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---engine
ª   ª   ª       ERPTestingEngine.ts
ª   ª   ª       ERPTestingTypes.ts
ª   ª   ª       
ª   ª   +---history
ª   ª   ª       ERPTestingHistoryStore.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª   ª       ERPTestingRegistry.ts
ª   ª   ª       
ª   ª   +---reports
ª   ª   ª       ERPTestingReportBuilder.ts
ª   ª   ª       
ª   ª   +---simulation
ª   ª           ERPRuntimeSimulation.ts
ª   ª           
ª   +---tests
ª   ª   +---generated
ª   ª       +---achats
ª   ª       +---clients
ª   ª       +---commandes
ª   ª       +---depenses
ª   ª       +---devis
ª   ª       +---employes
ª   ª       +---factures
ª   ª       +---fournisseurs
ª   ª       +---incidents
ª   ª       +---intrants
ª   ª       +---livraisons
ª   ª       +---parcelles
ª   ª       +---recettes
ª   ª       +---recoltes
ª   ª       +---taches
ª   ª       +---vehicules
ª   +---tracing
ª   ª       ExecutionTrace.ts
ª   ª       
ª   +---ui
ª   ª       ERPDynamicFormFactory.tsx
ª   ª       ERPDynamicTableFactory.tsx
ª   ª       ERPUIComposition.ts
ª   ª       index.ts
ª   ª       
ª   +---ui-generation
ª   ª       ERPDefaultSchemas.ts
ª   ª       ERPDefaultSchemas.ts.bak
ª   ª       ERPFieldDefinition.ts
ª   ª       ERPGeneratedSchema.ts
ª   ª       ERPGeneratedSchemaResolver.ts
ª   ª       ERPGeneratedSchemaResolver.ts.bak
ª   ª       index.ts
ª   ª       
ª   +---validation
ª   ª       RuntimeFieldValidator.ts
ª   ª       RuntimeValidationEngine.ts
ª   ª       RuntimeValidationTypes.ts
ª   ª       
ª   +---visibility
ª   ª       RuntimeVisibilityEngine.ts
ª   ª       
ª   +---workers
ª   ª   ª   ERPWorkersSeed.ts
ª   ª   ª   ERPWorkersSnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---engine
ª   ª   ª       ERPWorkerEngine.ts
ª   ª   ª       ERPWorkerTypes.ts
ª   ª   ª       
ª   ª   +---history
ª   ª   ª       ERPWorkerHistoryStore.ts
ª   ª   ª       
ª   ª   +---metrics
ª   ª   ª       ERPWorkerMetricsStore.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª   ª       ERPWorkerRegistry.ts
ª   ª   ª       
ª   ª   +---scheduler
ª   ª           ERPSchedulerRegistry.ts
ª   ª           
ª   +---workflow-persistence
ª   ª       WorkflowHistoryEntry.ts
ª   ª       WorkflowPersistenceEngine.ts
ª   ª       WorkflowRuntimeService.ts
ª   ª       
ª   +---workflow-runtime
ª   ª       index.ts
ª   ª       WorkflowRuntimeAudit.ts
ª   ª       WorkflowRuntimeDefinitions.ts
ª   ª       WorkflowRuntimeEngine.ts
ª   ª       WorkflowRuntimeRegistry.ts
ª   ª       WorkflowRuntimeStore.ts
ª   ª       WorkflowRuntimeTypes.ts
ª   ª       WorkflowRuntimeValidator.ts
ª   ª       
ª   +---workflow-ui
ª   ª       ERPWorkflowActions.tsx
ª   ª       maintenance.workflow.ts
ª   ª       Workflow.types.ts
ª   ª       WorkflowRuntimeEngine.ts
ª   ª       
ª   +---workflows
ª       ª   ERPWorkflowRuntimeEngine.ts
ª       ª   WorkflowEngine.ts
ª       ª   
ª       +---engine
ª       ª       WorkflowExecutor.ts
ª       ª       
ª       +---enterprise
ª       ª   ª   ERPRuntimeWorkflowSeed.ts
ª       ª   ª   index.ts
ª       ª   ª   
ª       ª   +---engine
ª       ª   ª       ERPWorkflowEngine.ts
ª       ª   ª       ERPWorkflowTypes.ts
ª       ª   ª       
ª       ª   +---registry
ª       ª   ª       ERPWorkflowRegistry.ts
ª       ª   ª       
ª       ª   +---store
ª       ª   ª       ERPWorkflowExecutionStore.ts
ª       ª   ª       
ª       ª   +---timeline
ª       ª           ERPWorkflowTimelineStore.ts
ª       ª           
ª       +---generated
ª       ª   +---achats
ª       ª   ª       achats.workflow.ts
ª       ª   ª       
ª       ª   +---clients
ª       ª   ª       clients.workflow.ts
ª       ª   ª       
ª       ª   +---commandes
ª       ª   ª       commandes.workflow.ts
ª       ª   ª       
ª       ª   +---depenses
ª       ª   ª       depenses.workflow.ts
ª       ª   ª       
ª       ª   +---devis
ª       ª   ª       devis.workflow.ts
ª       ª   ª       
ª       ª   +---employes
ª       ª   ª       employes.workflow.ts
ª       ª   ª       
ª       ª   +---factures
ª       ª   ª       factures.workflow.ts
ª       ª   ª       
ª       ª   +---fournisseurs
ª       ª   ª       fournisseurs.workflow.ts
ª       ª   ª       
ª       ª   +---incidents
ª       ª   ª       incidents.workflow.ts
ª       ª   ª       
ª       ª   +---intrants
ª       ª   ª       intrants.workflow.ts
ª       ª   ª       
ª       ª   +---livraisons
ª       ª   ª       livraisons.workflow.ts
ª       ª   ª       
ª       ª   +---parcelles
ª       ª   ª       parcelles.workflow.ts
ª       ª   ª       
ª       ª   +---recettes
ª       ª   ª       recettes.workflow.ts
ª       ª   ª       
ª       ª   +---recoltes
ª       ª   ª       recoltes.workflow.ts
ª       ª   ª       
ª       ª   +---taches
ª       ª   ª       taches.workflow.ts
ª       ª   ª       
ª       ª   +---vehicules
ª       ª           vehicules.workflow.ts
ª       ª           
ª       +---persistence
ª       ª       WorkflowExecutionPersistence.ts
ª       ª       
ª       +---sagas
ª       ª       SagaCoordinator.ts
ª       ª       
ª       +---state
ª       ª       WorkflowStateStore.ts
ª       ª       
ª       +---types
ª               WorkflowDefinition.ts
ª               WorkflowExecution.ts
ª               WorkflowStep.ts
ª               
+---saas
ª   +---billing
ª   ª       BillingEngine.ts
ª   ª       
ª   +---deployment
ª   ª       DeploymentService.ts
ª   ª       
ª   +---features
ª   ª       FeatureFlagService.ts
ª   ª       
ª   +---monitoring
ª   ª       CloudMonitoringService.ts
ª   ª       MonitoringService.ts
ª   ª       
ª   +---services
ª   ª       SaaSOrchestrationService.ts
ª   ª       
ª   +---subscriptions
ª   ª       SubscriptionService.ts
ª   ª       
ª   +---tenants
ª           TenantService.ts
ª           
+---security
ª   +---audit
ª   ª       AuditService.ts
ª   ª       
ª   +---rbac
ª   ª       UserRole.ts
ª   ª       
ª   +---tenant
ª           TenantProvider.tsx
ª           
+---services
ª       AuthService.ts
ª       StockService.ts
ª       UtilisateurService.ts
ª       
+---shared
ª   ª   README.md
ª   ª   
ª   +---api
ª   ª   ª   ApiWrapper.ts
ª   ª   ª   
ª   ª   +---logging
ª   ª   ª       ApiLogger.ts
ª   ª   ª       
ª   ª   +---middlewares
ª   ª   ª       AuthMiddleware.ts
ª   ª   ª       LoggingMiddleware.ts
ª   ª   ª       TenantMiddleware.ts
ª   ª   ª       
ª   ª   +---responses
ª   ª   ª       ApiResponse.ts
ª   ª   ª       
ª   ª   +---versioning
ª   ª           ApiVersion.ts
ª   ª           
ª   +---constants
ª   ª       firestoreCollections.ts
ª   ª       
ª   +---errors
ª   ª       AppError.ts
ª   ª       ErrorHandler.ts
ª   ª       
ª   +---hooks
ª   ª       useDebounce.ts
ª   ª       useFilters.ts
ª   ª       usePagination.ts
ª   ª       
ª   +---lib
ª   ª   +---filters
ª   ª   ª       filter.types.ts
ª   ª   ª       
ª   ª   +---pagination
ª   ª   ª       pagination.types.ts
ª   ª   ª       
ª   ª   +---query
ª   ª   ª       AppQueryProvider.tsx
ª   ª   ª       query-client.ts
ª   ª   ª       query-keys.ts
ª   ª   ª       
ª   ª   +---sorting
ª   ª   ª       sort.types.ts
ª   ª   ª       
ª   ª   +---validation
ª   ª           base-schema.ts
ª   ª           
ª   +---repositories
ª   ª       BaseRepository.ts
ª   ª       ProductRepository.ts
ª   ª       
ª   +---services
ª   ª       BaseCrudService.ts
ª   ª       ProductService.ts
ª   ª       
ª   +---tables
ª   ª       EnterpriseDataTable.tsx
ª   ª       
ª   +---types
ª   ª       api-response.ts
ª   ª       Equipment.ts
ª   ª       Exploitation.ts
ª   ª       filters.ts
ª   ª       Intervention.ts
ª   ª       Organisation.ts
ª   ª       pagination.ts
ª   ª       Product.ts
ª   ª       StockMovement.ts
ª   ª       Terrain.ts
ª   ª       User.ts
ª   ª       
ª   +---utils
ª   ª       FilterUtils.ts
ª   ª       PaginationUtils.ts
ª   ª       SortUtils.ts
ª   ª       
ª   +---validators
ª           ValidationService.ts
ª           
+---store
ª       useAppStore.ts
ª       
+---theme
ª   ª   ERPTheme.ts
ª   ª   theme.ts
ª   ª   
ª   +---store
ª           useAppStore.ts
ª           
+---types
ª       BaseEntity.ts
ª       mouvement-stock.type.ts
ª       MOUVEMENT_STOCK.ts
ª       organisation.ts
ª       STATUT_STOCK.ts
ª       terrain.ts
ª       utilisateur.ts
ª       
+---ui
ª   ª   index.ts
ª   ª   README.md
ª   ª   
ª   +---shell
ª   ª       EnterpriseShell.tsx
ª   ª       
ª   +---sidebar
ª   ª       ERPSidebar.tsx
ª   ª       
ª   +---theme
ª   ª       module.colors.ts
ª   ª       severity.colors.ts
ª   ª       status.colors.ts
ª   ª       theme.tokens.ts
ª   ª       ThemeProvider.tsx
ª   ª       
ª   +---topbar
ª           ERPTopbar.tsx
ª           
+---utils
ª   +---validation
ª           validators.ts
ª           
+---_quarantine
    +---layout
    ª       AppLayout.tsx
    ª       ERPLayout.tsx
    ª       PrivateShell.tsx
    ª       Sidebar.tsx
    ª       Topbar.tsx
    ª       
    +---modules
    ª   +---alertes
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       AlertesBulkActions.tsx
    ª   ª   ª       AlertesChartWidget.tsx
    ª   ª   ª       AlertesDashboardCard.tsx
    ª   ª   ª       AlertesExportActions.tsx
    ª   ª   ª       AlertesFilters.tsx
    ª   ª   ª       AlertesForm.tsx
    ª   ª   ª       AlertesPagination.tsx
    ª   ª   ª       AlertesRealtimeWidget.tsx
    ª   ª   ª       AlertesSorting.tsx
    ª   ª   ª       AlertesTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       AlertesDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useAlertes.ts
    ª   ª   ª       useCreateAlertes.ts
    ª   ª   ª       useDeleteAlertes.ts
    ª   ª   ª       useUpdateAlertes.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       AlertesRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Alertes.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       AlertesService.ts
    ª   ª   ª       subscribeToAlertes.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           AlertesService.test.ts
    ª   ª           
    ª   +---analytics
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       AnalyticsBulkActions.tsx
    ª   ª   ª       AnalyticsChartWidget.tsx
    ª   ª   ª       AnalyticsDashboardCard.tsx
    ª   ª   ª       AnalyticsExportActions.tsx
    ª   ª   ª       AnalyticsFilters.tsx
    ª   ª   ª       AnalyticsForm.tsx
    ª   ª   ª       AnalyticsPagination.tsx
    ª   ª   ª       AnalyticsSorting.tsx
    ª   ª   ª       AnalyticsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       AnalyticsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useAnalytics.ts
    ª   ª   ª       useCreateAnalytics.ts
    ª   ª   ª       useDeleteAnalytics.ts
    ª   ª   ª       useUpdateAnalytics.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       AnalyticsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Analytics.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       AnalyticsService.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           AnalyticsService.test.ts
    ª   ª           
    ª   +---clients
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       ClientsBulkActions.tsx
    ª   ª   ª       ClientsChartWidget.tsx
    ª   ª   ª       ClientsDashboardCard.tsx
    ª   ª   ª       ClientsExportActions.tsx
    ª   ª   ª       ClientsFilters.tsx
    ª   ª   ª       ClientsForm.tsx
    ª   ª   ª       ClientsPagination.tsx
    ª   ª   ª       ClientsRealtimeWidget.tsx
    ª   ª   ª       ClientsSorting.tsx
    ª   ª   ª       ClientsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       ClientsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useClients.ts
    ª   ª   ª       useCreateClients.ts
    ª   ª   ª       useDeleteClients.ts
    ª   ª   ª       useUpdateClients.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       ClientsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Clients.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       ClientsService.ts
    ª   ª   ª       subscribeToClients.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           ClientsService.test.ts
    ª   ª           
    ª   +---contrats
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       ContratsBulkActions.tsx
    ª   ª   ª       ContratsChartWidget.tsx
    ª   ª   ª       ContratsDashboardCard.tsx
    ª   ª   ª       ContratsExportActions.tsx
    ª   ª   ª       ContratsFilters.tsx
    ª   ª   ª       ContratsForm.tsx
    ª   ª   ª       ContratsPagination.tsx
    ª   ª   ª       ContratsRealtimeWidget.tsx
    ª   ª   ª       ContratsSorting.tsx
    ª   ª   ª       ContratsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       ContratsDTO.ts
    ª   ª   ª       DTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useContrats.ts
    ª   ª   ª       useCreateContrats.ts
    ª   ª   ª       useDeleteContrats.ts
    ª   ª   ª       useUpdateContrats.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       ContratsRepository.ts
    ª   ª   ª       Repository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Contrats.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       ContratsService.ts
    ª   ª   ª       Service.ts
    ª   ª   ª       subscribeToContrats.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           ContratsService.test.ts
    ª   ª           Service.test.ts
    ª   ª           
    ª   +---exploitations
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       ExploitationsBulkActions.tsx
    ª   ª   ª       ExploitationsChartWidget.tsx
    ª   ª   ª       ExploitationsDashboardCard.tsx
    ª   ª   ª       ExploitationsExportActions.tsx
    ª   ª   ª       ExploitationsFilters.tsx
    ª   ª   ª       ExploitationsForm.tsx
    ª   ª   ª       ExploitationsPagination.tsx
    ª   ª   ª       ExploitationsRealtimeWidget.tsx
    ª   ª   ª       ExploitationsSorting.tsx
    ª   ª   ª       ExploitationsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       ExploitationsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateExploitations.ts
    ª   ª   ª       useDeleteExploitations.ts
    ª   ª   ª       useExploitations.ts
    ª   ª   ª       useUpdateExploitations.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       ExploitationsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Exploitations.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       ExploitationsService.ts
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToExploitations.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           ExploitationsService.test.ts
    ª   ª           
    ª   +---factures
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       FacturesBulkActions.tsx
    ª   ª   ª       FacturesChartWidget.tsx
    ª   ª   ª       FacturesDashboardCard.tsx
    ª   ª   ª       FacturesExportActions.tsx
    ª   ª   ª       FacturesFilters.tsx
    ª   ª   ª       FacturesForm.tsx
    ª   ª   ª       FacturesPagination.tsx
    ª   ª   ª       FacturesRealtimeWidget.tsx
    ª   ª   ª       FacturesSorting.tsx
    ª   ª   ª       FacturesTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       FacturesDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateFactures.ts
    ª   ª   ª       useDeleteFactures.ts
    ª   ª   ª       useFactures.ts
    ª   ª   ª       useUpdateFactures.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       FacturesRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Factures.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       FacturesService.ts
    ª   ª   ª       subscribeToFactures.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           FacturesService.test.ts
    ª   ª           
    ª   +---fournisseurs
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       FournisseursBulkActions.tsx
    ª   ª   ª       FournisseursChartWidget.tsx
    ª   ª   ª       FournisseursDashboardCard.tsx
    ª   ª   ª       FournisseursExportActions.tsx
    ª   ª   ª       FournisseursFilters.tsx
    ª   ª   ª       FournisseursForm.tsx
    ª   ª   ª       FournisseursPagination.tsx
    ª   ª   ª       FournisseursRealtimeWidget.tsx
    ª   ª   ª       FournisseursSorting.tsx
    ª   ª   ª       FournisseursTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       DTO.ts
    ª   ª   ª       FournisseursDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateFournisseurs.ts
    ª   ª   ª       useDeleteFournisseurs.ts
    ª   ª   ª       useFournisseurs.ts
    ª   ª   ª       useUpdateFournisseurs.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       FournisseursRepository.ts
    ª   ª   ª       Repository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Fournisseurs.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       FournisseursService.ts
    ª   ª   ª       Service.ts
    ª   ª   ª       subscribeToFournisseurs.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           FournisseursService.test.ts
    ª   ª           Service.test.ts
    ª   ª           
    ª   +---interventions
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       InterventionsBulkActions.tsx
    ª   ª   ª       InterventionsChartWidget.tsx
    ª   ª   ª       InterventionsDashboardCard.tsx
    ª   ª   ª       InterventionsExportActions.tsx
    ª   ª   ª       InterventionsFilters.tsx
    ª   ª   ª       InterventionsForm.tsx
    ª   ª   ª       InterventionsPagination.tsx
    ª   ª   ª       InterventionsRealtimeWidget.tsx
    ª   ª   ª       InterventionsSorting.tsx
    ª   ª   ª       InterventionsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       InterventionsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateInterventions.ts
    ª   ª   ª       useDeleteInterventions.ts
    ª   ª   ª       useInterventions.ts
    ª   ª   ª       useUpdateInterventions.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       InterventionsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Interventions.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       InterventionsService.ts
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToInterventions.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           InterventionsService.test.ts
    ª   ª           
    ª   +---maintenance
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       MaintenanceBulkActions.tsx
    ª   ª   ª       MaintenanceChartWidget.tsx
    ª   ª   ª       MaintenanceDashboardCard.tsx
    ª   ª   ª       MaintenanceExportActions.tsx
    ª   ª   ª       MaintenanceFilters.tsx
    ª   ª   ª       MaintenanceForm.tsx
    ª   ª   ª       MaintenancePagination.tsx
    ª   ª   ª       MaintenanceRealtimeWidget.tsx
    ª   ª   ª       MaintenanceSorting.tsx
    ª   ª   ª       MaintenanceTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       MaintenanceDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateMaintenance.ts
    ª   ª   ª       useDeleteMaintenance.ts
    ª   ª   ª       useMaintenance.ts
    ª   ª   ª       useUpdateMaintenance.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       MaintenanceRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Maintenance.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       MaintenanceService.ts
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToMaintenance.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           MaintenanceService.test.ts
    ª   ª           
    ª   +---materiels
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       MaterielsBulkActions.tsx
    ª   ª   ª       MaterielsChartWidget.tsx
    ª   ª   ª       MaterielsDashboardCard.tsx
    ª   ª   ª       MaterielsExportActions.tsx
    ª   ª   ª       MaterielsFilters.tsx
    ª   ª   ª       MaterielsForm.tsx
    ª   ª   ª       MaterielsPagination.tsx
    ª   ª   ª       MaterielsRealtimeWidget.tsx
    ª   ª   ª       MaterielsSorting.tsx
    ª   ª   ª       MaterielsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       MaterielsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateMateriels.ts
    ª   ª   ª       useDeleteMateriels.ts
    ª   ª   ª       useMateriels.ts
    ª   ª   ª       useUpdateMateriels.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       MaterielsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Materiels.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       MaterielsService.ts
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToMateriels.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           MaterielsService.test.ts
    ª   ª           
    ª   +---mobile
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       MobileBulkActions.tsx
    ª   ª   ª       MobileChartWidget.tsx
    ª   ª   ª       MobileDashboardCard.tsx
    ª   ª   ª       MobileExportActions.tsx
    ª   ª   ª       MobileFilters.tsx
    ª   ª   ª       MobileForm.tsx
    ª   ª   ª       MobilePagination.tsx
    ª   ª   ª       MobileRealtimeWidget.tsx
    ª   ª   ª       MobileSorting.tsx
    ª   ª   ª       MobileTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       MobileDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateMobile.ts
    ª   ª   ª       useDeleteMobile.ts
    ª   ª   ª       useMobile.ts
    ª   ª   ª       useUpdateMobile.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       MobileRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Mobile.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       MobileService.ts
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToMobile.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           MobileService.test.ts
    ª   ª           
    ª   +---monitoring
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       MonitoringBulkActions.tsx
    ª   ª   ª       MonitoringChartWidget.tsx
    ª   ª   ª       MonitoringDashboardCard.tsx
    ª   ª   ª       MonitoringExportActions.tsx
    ª   ª   ª       MonitoringFilters.tsx
    ª   ª   ª       MonitoringForm.tsx
    ª   ª   ª       MonitoringPagination.tsx
    ª   ª   ª       MonitoringRealtimeWidget.tsx
    ª   ª   ª       MonitoringSorting.tsx
    ª   ª   ª       MonitoringTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       MonitoringDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateMonitoring.ts
    ª   ª   ª       useDeleteMonitoring.ts
    ª   ª   ª       useMonitoring.ts
    ª   ª   ª       useUpdateMonitoring.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       MonitoringRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Monitoring.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       MonitoringService.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           MonitoringService.test.ts
    ª   ª           
    ª   +---mouvements-stock
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       MouvementsStockBulkActions.tsx
    ª   ª   ª       MouvementsStockChartWidget.tsx
    ª   ª   ª       MouvementsStockDashboardCard.tsx
    ª   ª   ª       MouvementsStockExportActions.tsx
    ª   ª   ª       MouvementsStockFilters.tsx
    ª   ª   ª       MouvementsStockForm.tsx
    ª   ª   ª       MouvementsStockPagination.tsx
    ª   ª   ª       MouvementsStockRealtimeWidget.tsx
    ª   ª   ª       MouvementsStockSorting.tsx
    ª   ª   ª       MouvementsStockTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       MouvementsStockDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateMouvementsStock.ts
    ª   ª   ª       useDeleteMouvementsStock.ts
    ª   ª   ª       useMouvementsStock.ts
    ª   ª   ª       useUpdateMouvementsStock.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       MouvementsStockRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       MouvementsStock.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       MouvementsStockService.ts
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToMouvementsStock.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           MouvementsStockService.test.ts
    ª   ª           
    ª   +---p-ro-du-it-s
    ª   ª   +---dto
    ª   ª           ProduitsDTO.ts
    ª   ª           
    ª   +---paiements
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       PaiementsBulkActions.tsx
    ª   ª   ª       PaiementsChartWidget.tsx
    ª   ª   ª       PaiementsDashboardCard.tsx
    ª   ª   ª       PaiementsExportActions.tsx
    ª   ª   ª       PaiementsFilters.tsx
    ª   ª   ª       PaiementsForm.tsx
    ª   ª   ª       PaiementsPagination.tsx
    ª   ª   ª       PaiementsRealtimeWidget.tsx
    ª   ª   ª       PaiementsSorting.tsx
    ª   ª   ª       PaiementsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       PaiementsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreatePaiements.ts
    ª   ª   ª       useDeletePaiements.ts
    ª   ª   ª       usePaiements.ts
    ª   ª   ª       useUpdatePaiements.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       PaiementsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Paiements.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       PaiementsService.ts
    ª   ª   ª       subscribeToPaiements.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           PaiementsService.test.ts
    ª   ª           
    ª   +---parcelles
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---dto
    ª   ª   ª       ParcellesDTO.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       ParcellesRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Parcelles.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       ParcellesService.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           ParcellesService.test.ts
    ª   ª           
    ª   +---productions
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       ProductionsBulkActions.tsx
    ª   ª   ª       ProductionsChartWidget.tsx
    ª   ª   ª       ProductionsDashboardCard.tsx
    ª   ª   ª       ProductionsExportActions.tsx
    ª   ª   ª       ProductionsFilters.tsx
    ª   ª   ª       ProductionsForm.tsx
    ª   ª   ª       ProductionsPagination.tsx
    ª   ª   ª       ProductionsRealtimeWidget.tsx
    ª   ª   ª       ProductionsSorting.tsx
    ª   ª   ª       ProductionsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       ProductionsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateProductions.ts
    ª   ª   ª       useDeleteProductions.ts
    ª   ª   ª       useProductions.ts
    ª   ª   ª       useUpdateProductions.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       ProductionsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Productions.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       ProductionsService.ts
    ª   ª   ª       subscribeToProductions.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           ProductionsService.test.ts
    ª   ª           
    ª   +---recoltes
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       RecoltesBulkActions.tsx
    ª   ª   ª       RecoltesChartWidget.tsx
    ª   ª   ª       RecoltesDashboardCard.tsx
    ª   ª   ª       RecoltesExportActions.tsx
    ª   ª   ª       RecoltesFilters.tsx
    ª   ª   ª       RecoltesForm.tsx
    ª   ª   ª       RecoltesPagination.tsx
    ª   ª   ª       RecoltesRealtimeWidget.tsx
    ª   ª   ª       RecoltesSorting.tsx
    ª   ª   ª       RecoltesTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       RecoltesDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateRecoltes.ts
    ª   ª   ª       useDeleteRecoltes.ts
    ª   ª   ª       useRecoltes.ts
    ª   ª   ª       useUpdateRecoltes.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       RecoltesRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Recoltes.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       RecoltesService.ts
    ª   ª   ª       subscribeToRecoltes.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           RecoltesService.test.ts
    ª   ª           
    ª   +---stocks
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       StocksBulkActions.tsx
    ª   ª   ª       StocksDashboardCard.tsx
    ª   ª   ª       StocksExportActions.tsx
    ª   ª   ª       StocksFilters.tsx
    ª   ª   ª       StocksForm.tsx
    ª   ª   ª       StocksPagination.tsx
    ª   ª   ª       StocksSorting.tsx
    ª   ª   ª       StocksTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       DTO.ts
    ª   ª   ª       StocksDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateStocks.ts
    ª   ª   ª       useDeleteStocks.ts
    ª   ª   ª       useStocks.ts
    ª   ª   ª       useUpdateStocks.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       StocksRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Stocks.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       StocksService.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           StocksService.test.ts
    ª   ª           
    ª   +---sync
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       SyncBulkActions.tsx
    ª   ª   ª       SyncChartWidget.tsx
    ª   ª   ª       SyncDashboardCard.tsx
    ª   ª   ª       SyncExportActions.tsx
    ª   ª   ª       SyncFilters.tsx
    ª   ª   ª       SyncForm.tsx
    ª   ª   ª       SyncPagination.tsx
    ª   ª   ª       SyncRealtimeWidget.tsx
    ª   ª   ª       SyncSorting.tsx
    ª   ª   ª       SyncTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       SyncDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateSync.ts
    ª   ª   ª       useDeleteSync.ts
    ª   ª   ª       useSync.ts
    ª   ª   ª       useUpdateSync.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       SyncRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Sync.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToSync.ts
    ª   ª   ª       SyncService.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           SyncService.test.ts
    ª   ª           
    ª   +---terrains
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       TerrainsBulkActions.tsx
    ª   ª   ª       TerrainsChartWidget.tsx
    ª   ª   ª       TerrainsDashboardCard.tsx
    ª   ª   ª       TerrainsExportActions.tsx
    ª   ª   ª       TerrainsFilters.tsx
    ª   ª   ª       TerrainsForm.tsx
    ª   ª   ª       TerrainsPagination.tsx
    ª   ª   ª       TerrainsRealtimeWidget.tsx
    ª   ª   ª       TerrainsSorting.tsx
    ª   ª   ª       TerrainsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       TerrainsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateTerrains.ts
    ª   ª   ª       useDeleteTerrains.ts
    ª   ª   ª       useTerrains.ts
    ª   ª   ª       useUpdateTerrains.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       TerrainsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Terrains.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToTerrains.ts
    ª   ª   ª       TerrainsService.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           TerrainsService.test.ts
    ª   ª           
    ª   +---utilisateurs
    ª       ª   index.ts
    ª       ª   
    ª       +---components
    ª       ª       UtilisateursBulkActions.tsx
    ª       ª       UtilisateursChartWidget.tsx
    ª       ª       UtilisateursDashboardCard.tsx
    ª       ª       UtilisateursExportActions.tsx
    ª       ª       UtilisateursFilters.tsx
    ª       ª       UtilisateursForm.tsx
    ª       ª       UtilisateursPagination.tsx
    ª       ª       UtilisateursRealtimeWidget.tsx
    ª       ª       UtilisateursSorting.tsx
    ª       ª       UtilisateursTable.tsx
    ª       ª       
    ª       +---dto
    ª       ª       UtilisateursDTO.ts
    ª       ª       
    ª       +---hooks
    ª       ª       useCreateUtilisateurs.ts
    ª       ª       useDeleteUtilisateurs.ts
    ª       ª       useUpdateUtilisateurs.ts
    ª       ª       useUtilisateurs.ts
    ª       ª       
    ª       +---pages
    ª       ª   ª   page.tsx
    ª       ª   ª   
    ª       ª   +---nouveau
    ª       ª   ª       page.tsx
    ª       ª   ª       
    ª       ª   +---[id]
    ª       ª       ª   page.tsx
    ª       ª       ª   
    ª       ª       +---edit
    ª       ª               page.tsx
    ª       ª               
    ª       +---repositories
    ª       ª       UtilisateursRepository.ts
    ª       ª       
    ª       +---schemas
    ª       ª       Utilisateurs.schema.ts
    ª       ª       
    ª       +---services
    ª       ª       subscribeToUtilisateurs.ts
    ª       ª       UtilisateursService.ts
    ª       ª       
    ª       +---tests
    ª               UtilisateursService.test.ts
    ª               
    +---navigation
    ª       Sidebar.tsx
    ª       Topbar.tsx
    ª       
    +---runtime-forms
    ª   +---definitions
    ª           contrats.form.ts
    ª           exploitations.form.ts
    ª           interventions.form.ts
    ª           maintenance.form.ts
    ª           materiels.form.ts
    ª           paiements.form.ts
    ª           produits.form.ts
    ª           stocks.form.ts
    ª           terrains.form.ts
    ª           
    +---runtime-generated
    ª       GeneratedRuntimeBindings.ts
    ª       GeneratedRuntimeModules.ts
    ª       GeneratedRuntimeWorkflows.ts
    ª       
    +---runtime-schemas
    ª       ExploitationsBusinessSchema.ts
    ª       MaterielsBusinessSchema.ts
    ª       ProduitsBusinessSchema.ts
    ª       StocksBusinessSchema.ts
    ª       TerrainsBusinessSchema.ts
    ª       
    +---sidebar
    ª   ª   AppSidebar.tsx
    ª   ª   ERPSidebar.tsx
    ª   ª   
    ª   +---sidebar
    ª           ERPSidebar.tsx
    ª           
    +---topbar
    ª   ª   AppTopbar.tsx
    ª   ª   ERPTopbar.tsx
    ª   ª   
    ª   +---topbar
    ª           ERPTopbar.tsx
    ª           
    +---workflow
        +---automations
        ª       WorkflowAutomation.ts
        ª       
        +---events
        ª       ProductEvents.ts
        ª       
        +---listeners
        ª       ProductCreatedListener.ts
        ª       StockAlertListener.ts
        ª       
        +---notifications
        ª       NotificationEngine.ts
        ª       WorkflowNotificationCenter.tsx
        ª       
        +---rules
        ª       RulesEngine.ts
        ª       
        +---services
                EventBus.ts
                WorkflowProductsRepository.ts
                
```

# 2. Factory runtime modules

## factory/index.ts

```ts
export * from "./createBusinessModule";
export * from "./businessFields";
```

## factory/createBusinessModule.ts

```ts
import type { ERPModule } from "../ERPModule";

type BusinessModuleOptions = {
  key: string;
  label: string;
  description?: string;
  category?: string;
  icon?: string;
  fields?: any[];
};

export function createBusinessModule(
  options: BusinessModuleOptions
): ERPModule {

  const key =
    options.key;

  const label =
    options.label;

  return {

    metadata: {
      key,
      label,

      description:
        options.description ??
        `Module ERP ${label}.`,

      icon:
        options.icon ??
        "package",

      category:
        options.category ??
        "Metier",

      enabled: true,
      visible: true,

      routes: {
        list: `/${key}`,
        create: `/${key}/nouveau`,
        details: `/${key}`,
        edit: `/${key}`,
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    permissions: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },

    persistence: {
      firestore: true,
      timestamps: true,
      softDelete: true,
    },

    schema: {
      module: key,

      collection: key,

      timestamps: true,

      softDelete: true,

      fields:
        options.fields ??
        [
          {
            key: "nom",
            label: "Nom",
            type: "text",
            required: true,
            searchable: true,
            sortable: true,
          },

          {
            key: "statut",
            label: "Statut",
            type: "status",
            required: true,
            filterable: true,
          },
        ],
    },

    actions: [
      {
        key: "create",
        label: "Créer",
        type: "primary",
        href: `/${key}/nouveau`,
        event: `${key.toUpperCase()}_CREATED`,
      },

      {
        key: "edit",
        label: "Modifier",
        type: "secondary",
        event: `${key.toUpperCase()}_UPDATED`,
      },

      {
        key: "archive",
        label: "Archiver",
        type: "danger",
        event: `${key.toUpperCase()}_ARCHIVED`,
      },
    ],

    workflows: [
      {
        key: `create-${key}`,

        label:
          `Création ${label}`,

        initialState: "draft",

        states: [
          "draft",
          "validated",
          "active",
          "archived",
        ],
      },
    ],
  };
}
```

## factory/businessFields.ts

```ts
export const clientFields = [
  { key: "code", label: "Code client", type: "text", required: true, searchable: true, sortable: true },
  { key: "nom", label: "Nom", type: "text", required: true, searchable: true, sortable: true },
  { key: "email", label: "Email", type: "email", searchable: true },
  { key: "telephone", label: "Téléphone", type: "text", searchable: true },
  { key: "adresse", label: "Adresse", type: "textarea" },
  { key: "typeClient", label: "Type client", type: "select", filterable: true, options: [
    { label: "Particulier", value: "particulier" },
    { label: "Entreprise", value: "entreprise" },
    { label: "Coopérative", value: "cooperative" },
  ] },
  { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
];

export const commandeFields = [
  { key: "numero", label: "Numéro commande", type: "text", required: true, searchable: true, sortable: true },
  { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
  { key: "dateCommande", label: "Date commande", type: "date", required: true, sortable: true },
  { key: "montantTotal", label: "Montant total", type: "number", sortable: true },
  { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
];

export const factureFields = [
  { key: "numero", label: "Numéro facture", type: "text", required: true, searchable: true, sortable: true },
  { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
  { key: "commandeId", label: "Commande", type: "relation", relation: "commandes" },
  { key: "dateFacture", label: "Date facture", type: "date", required: true, sortable: true },
  { key: "montantHT", label: "Montant HT", type: "number", sortable: true },
  { key: "montantTTC", label: "Montant TTC", type: "number", sortable: true },
  { key: "statut", label: "Statut", type: "status", required: true, filterable: true },

];

export const devisFields = [
  { key: "numero", label: "Numéro devis", type: "text", required: true, searchable: true, sortable: true },
  { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
  { key: "dateDevis", label: "Date devis", type: "date", required: true, sortable: true },
  { key: "dateValidite", label: "Date validité", type: "date", sortable: true },
  { key: "montantTotal", label: "Montant total", type: "number", sortable: true },
  { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
];

export const depenseFields = [
  { key: "libelle", label: "Libellé", type: "text", required: true, searchable: true, sortable: true },
  { key: "categorie", label: "Catégorie", type: "select", filterable: true, options: [
    { label: "Achat", value: "achat" },
    { label: "Transport", value: "transport" },
    { label: "Maintenance", value: "maintenance" },
    { label: "Salaire", value: "salaire" },
    { label: "Autre", value: "autre" },
  ] },
  { key: "montant", label: "Montant", type: "number", required: true, sortable: true },
  { key: "dateDepense", label: "Date dépense", type: "date", required: true, sortable: true },
  { key: "statut", label: "Statut", type: "status", filterable: true },
];

export const recetteFields = [
  { key: "libelle", label: "Libellé", type: "text", required: true, searchable: true, sortable: true },
  { key: "source", label: "Source", type: "text", searchable: true },
  { key: "montant", label: "Montant", type: "number", required: true, sortable: true },
  { key: "dateRecette", label: "Date recette", type: "date", required: true, sortable: true },
  { key: "statut", label: "Statut", type: "status", filterable: true },
];

```

# 3. DÃ©finition centrale des modules

## coreModules.ts

```ts
import type { ERPModule } from "../ERPModule";
import {
  createBusinessModule,
  clientFields, commandeFields,
}
from "../factory";

export const coreERPModules: ERPModule[] = [
  {
    metadata: {
      key: "utilisateurs",
      label: "Utilisateurs",
      description: "RÃƒÂ©fÃƒÂ©rentiel des utilisateurs et propriÃƒÂ©taires.",
      icon: "users",
      category: "Administration",
      dashboard: false,
    },
    permissions: {
      create: true,
      read: true,
      update: true,
      delete: false,
    },
    persistence: {
      firestore: true,
      timestamps: true,
      softDelete: false,
    },
    schema: {
      collection: "utilisateurs",
      timestamps: true,
      softDelete: false,
      fields: [
        { key: "prenom", label: "PrÃƒÂ©nom", type: "text", searchable: true },
        { key: "nom", label: "Nom", type: "text", searchable: true, sortable: true },
        { key: "email", label: "Email", type: "email", searchable: true },
        { key: "role", label: "RÃƒÂ´le", type: "text", filterable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
    actions: [
      { key: "view", label: "Voir", type: "primary", event: "UTILISATEUR_VIEWED" },
      { key: "edit", label: "Modifier", type: "secondary", event: "UTILISATEUR_UPDATED" },
    ],
    relations: [
      { key: "terrains", label: "Terrains possÃƒÂ©dÃƒÂ©s", targetModule: "terrains", type: "one-to-many" },
    ],
  },

  {
    metadata: {
      key: "produits",
      label: "Produits",
      description: "RÃƒÂ©fÃƒÂ©rentiel central des produits agricoles, animaux, piscicoles et immobiliers.",
      icon: "package",
      category: "RÃƒÂ©fÃƒÂ©rentiel",
      enabled: true,
      visible: true,
      order: 10,
      routes: {
        list: "/produits",
        create: "/produits/nouveau",
        details: "/produits",
        edit: "/produits",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
      },
    },
    schema: {
      module: "produits",
      collection: "produits",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Produit", type: "text", required: true, searchable: true, sortable: true },
        { key: "categorie", label: "CatÃƒÂ©gorie", type: "select", required: true, filterable: true, options: [{ label: "Agricole", value: "agricole" }, { label: "Animal", value: "animal" }, { label: "Piscicole", value: "piscicole" }, { label: "Immobilier", value: "immobilier" }] },
        { key: "type", label: "Type", type: "select", required: true, filterable: true, options: [{ label: "Igname", value: "igname" }, { label: "Manioc", value: "manioc" }, { label: "Arachide", value: "arachide" }, { label: "MaÃƒÂ¯s", value: "mais" }, { label: "Viande", value: "viande" }, { label: "Ã…â€™ufs", value: "oeufs" }, { label: "Lait", value: "lait" }, { label: "Tilapia", value: "tilapia" }, { label: "Silure", value: "silure" }, { label: "Maison", value: "maison" }, { label: "Appartement", value: "appartement" }] },
        { key: "modeStock", label: "Gestion de stock", type: "select", required: true, filterable: true, options: [{ label: "Stockable", value: "stockable" }, { label: "Non stockable", value: "non_stockable" }] },
        { key: "unite", label: "UnitÃƒÂ©", type: "text" },
        { key: "seuilMinimum", label: "Seuil minimum", type: "number", sortable: true },
        { key: "prixAchat", label: "Prix achat", type: "number", sortable: true },
        { key: "prixVente", label: "Prix vente", type: "number", sortable: true },
        { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
      ],
    },
    actions: [
      { key: "create", label: "CrÃƒÂ©er", type: "primary", href: "/produits/nouveau", event: "PRODUIT_CREATED" },
      { key: "edit", label: "Modifier", type: "secondary", event: "PRODUIT_UPDATED" },
      { key: "archive", label: "Archiver", type: "danger", event: "PRODUIT_ARCHIVED" },
    ],
    relations: [
      { key: "stocks", label: "Stocks liÃƒÂ©s", targetModule: "stocks", type: "one-to-many" },
      { key: "mouvements", label: "Mouvements de stock", targetModule: "mouvements", type: "one-to-many" },
      { key: "maintenance", label: "Maintenance", targetModule: "maintenance", type: "one-to-many" },
      { key: "interventions", label: "Interventions", targetModule: "interventions", type: "one-to-many" },
    ],
    workflows: [
      {
        key: "create-produit",
        label: "CrÃƒÂ©ation produit",
        initialState: "draft",
        states: ["draft", "validated", "active", "archived"],
      },
    ],
  },

  {
    metadata: {
      key: "stocks",
      label: "Stocks",
      description: "Suivi des stocks, niveaux, seuils et valorisation.",
      icon: "boxes",
      category: "Logistique",
      enabled: true,
      visible: true,
      order: 20,
      routes: {
        list: "/stocks",
        create: "/stocks/nouveau",
        details: "/stocks",
        edit: "/stocks",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        automation: true,
        notifications: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "stocks",
      collection: "stocks",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "produitId", label: "Produit", type: "relation", relation: "produits", required: true, filterable: true },
        { key: "quantite", label: "QuantitÃƒÂ©", type: "number", required: true, sortable: true },
        { key: "unite", label: "UnitÃƒÂ©", type: "text" },
        { key: "seuilAlerte", label: "Seuil alerte", type: "number", sortable: true },
        { key: "emplacement", label: "Emplacement", type: "text", searchable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },

  {
    metadata: {
      key: "mouvements",
      label: "Mouvements",
      description: "EntrÃƒÂ©es, sorties, corrections et transferts de stock.",
      icon: "repeat",
      category: "Logistique",
      enabled: true,
      visible: true,
      order: 30,
      routes: {
        list: "/mouvements",
        create: "/mouvements/nouveau",
        details: "/mouvements",
        edit: "/mouvements",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
      },
    },
    schema: {
      module: "mouvements",
      collection: "mouvements",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "produitId", label: "Produit", type: "relation", relation: "produits", required: true, filterable: true },
        { key: "stockId", label: "Stock", type: "relation", relation: "stocks", required: true },
        { key: "type", label: "Type mouvement", type: "select", required: true, filterable: true, options: [{ label: "EntrÃƒÂ©e", value: "entree" }, { label: "Sortie", value: "sortie" }, { label: "Transfert", value: "transfert" }, { label: "Correction", value: "correction" }] },
        { key: "quantite", label: "QuantitÃƒÂ©", type: "number", required: true, sortable: true },
        { key: "motif", label: "Motif", type: "text", searchable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },

  {
    metadata: {
      key: "maintenance",
      label: "Maintenance",
      description: "Maintenance prÃƒÂ©ventive, corrective et critique.",
      icon: "settings",
      category: "OpÃƒÂ©rations",
      enabled: true,
      visible: true,
      order: 40,
      routes: {
        list: "/maintenance",
        create: "/maintenance/nouveau",
        details: "/maintenance",
        edit: "/maintenance",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        automation: true,
        notifications: true,
        observability: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "maintenance",
      collection: "maintenance",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "titre", label: "Maintenance", type: "text", required: true, searchable: true, sortable: true },
        { key: "materielId", label: "MatÃƒÂ©riel", type: "relation", relation: "materiels" },
        { key: "produitId", label: "Produit consommÃƒÂ©", type: "relation", relation: "produits" },
        { key: "priorite", label: "PrioritÃƒÂ©", type: "select", filterable: true, options: [{ label: "Basse", value: "basse" }, { label: "Normale", value: "normale" }, { label: "Haute", value: "haute" }, { label: "Critique", value: "critique" }] },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },

  {
    metadata: {
      key: "interventions",
      label: "Interventions",
      description: "Suivi des interventions terrain, affectations et clÃƒÂ´tures.",
      icon: "wrench",
      category: "OpÃƒÂ©rations",
      enabled: true,
      visible: true,
      order: 50,
      routes: {
        list: "/interventions",
        create: "/interventions/nouveau",
        details: "/interventions",
        edit: "/interventions",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        automation: true,
        notifications: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "interventions",
      collection: "interventions",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "titre", label: "Intervention", type: "text", required: true, searchable: true, sortable: true },
        { key: "materielId", label: "MatÃƒÂ©riel", type: "relation", relation: "materiels" },
        { key: "produitId", label: "Produit utilisÃƒÂ©", type: "relation", relation: "produits" },
        { key: "responsable", label: "Responsable", type: "text", searchable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },

  {
    metadata: {
      key: "terrains",
      label: "Terrains",
      description: "Gestion agro-fonciÃƒÂ¨re des terrains, propriÃƒÂ©taires, vocations, surfaces, contrats et exploitations liÃƒÂ©es.",
      icon: "map",
      category: "Foncier",
      enabled: true,
      visible: true,
      order: 60,
      routes: {
        list: "/terrains",
        create: "/terrains/nouveau",
        details: "/terrains",
        edit: "/terrains",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
      },
    },
    schema: {
      module: "terrains",
      collection: "terrains",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Terrain", type: "text", required: true, searchable: true, sortable: true },

        { key: "proprietaireId", label: "PropriÃƒÂ©taire", type: "relation", relation: "utilisateurs", required: true, filterable: true },

        { key: "vocationTerrain", label: "Terrain ÃƒÂ  vocation", type: "select", required: true, filterable: true, options: [
          { label: "Agricole", value: "agricole" },
          { label: "Habitation", value: "habitation" },
          { label: "Piscicole", value: "piscicole" },
          { label: "Ãƒâ€°levage", value: "elevage" },
          { label: "Mixte", value: "mixte" },
          { label: "RÃƒÂ©serve fonciÃƒÂ¨re", value: "reserve_fonciere" },
        ] },

        { key: "surfaceTotale", label: "Surface totale", type: "number", required: true, sortable: true },

        //  VisibilitÃƒÂ© conditionnelle ajoutÃƒÂ©e sur les champs demandÃƒÂ©s
        { 
          key: "surfaceAgricole", 
          label: "Surface agricole", 
          type: "number", 
          sortable: true,
          visibility: {
            field: "vocationTerrain",
            equals: "agricole",
          },
        },
        { 
          key: "surfaceHabitation", 
          label: "Surface habitation", 
          type: "number", 
          sortable: true,
          visibility: {
            field: "vocationTerrain",
            equals: "habitation",
          },
        },

	  //  Champ computed ajoutÃƒÂ©
  {
    key: "surfaceDisponible",
    label: "Surface disponible",
    type: "number",
    sortable: true,

    computed: {
      formula: "surfaceTotale - surfaceOccupee",
      dependsOn: ["surfaceTotale", "surfaceOccupee"],
    },
  },


        { key: "prixAcquisition", label: "Prix d'acquisition", type: "number", sortable: true },
        { key: "dateAcquisition", label: "Date d'acquisition", type: "date", sortable: true },

        { key: "typeContratFoncier", label: "Type de contrat foncier", type: "select", filterable: true, options: [
          { label: "Achat", value: "achat" },
          { label: "Location", value: "location" },
          { label: "Bail rural", value: "bail_rural" },
          { label: "Concession", value: "concession" },
          { label: "Donation", value: "donation" },
          { label: "HÃƒÂ©ritage", value: "heritage" },
        ] },

        { key: "referenceContrat", label: "RÃƒÂ©fÃƒÂ©rence contrat", type: "text", searchable: true },

        { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
      ],
    },

    form: {
      layout: "tabs",

      tabs: [
        {
          key: "general",
          label: "Informations",
          fields: [
            "nom",
            "proprietaireId",
            "vocationTerrain",
            "statut",
          ],
        },

        {
          key: "surfaces",
          label: "Surfaces",
          fields: [
            "surfaceTotale",
            "surfaceDisponible",
            "surfaceAgricole",
            "surfaceHabitation",
          ],
        },

        {
          key: "contrat",
          label: "Contrat foncier",
          fields: [
            "typeContratFoncier",
            "referenceContrat",
            "prixAcquisition",
            "dateAcquisition",
          ],
        },
      ],
    },

    // VisibilitÃƒÂ© au niveau du module (conservÃƒÂ©e de la demande prÃƒÂ©cÃƒÂ©dente)
    visibility: {
      field: "vocationTerrain",
      equals: "agricole",
    },

    actions: [
      { key: "create", label: "CrÃƒÂ©er", type: "primary", href: "/terrains/nouveau", event: "TERRAIN_CREATED" },
      { key: "edit", label: "Modifier", type: "secondary", event: "TERRAIN_UPDATED" },
      { key: "archive", label: "Archiver", type: "danger", event: "TERRAIN_ARCHIVED" },
    ],
    relations: [
      { key: "proprietaire", label: "PropriÃƒÂ©taire", targetModule: "utilisateurs", type: "many-to-one" },
      { key: "exploitations", label: "Exploitations liÃƒÂ©es", targetModule: "exploitations", type: "one-to-many" },
      { key: "contrats", label: "Contrats fonciers", targetModule: "contrats", type: "one-to-many" },
    ],
    workflows: [
      {
        key: "create-terrain",
        label: "CrÃƒÂ©ation terrain",
        initialState: "draft",
        states: ["draft", "validated", "active", "archived"],
      },
    ],
  }
  ,

  {
    metadata: {
      key: "fournisseurs",
      label: "Fournisseurs",
      description: "Gestion des fournisseurs, partenaires et prestataires.",
      icon: "building",
      category: "RÃ©fÃ©rentiel",
      enabled: true,
      visible: true,
      order: 90,
      routes: {
        list: "/fournisseurs",
        create: "/fournisseurs/nouveau",
        details: "/fournisseurs",
        edit: "/fournisseurs",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        automation: true,
        notifications: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "fournisseurs",
      collection: "fournisseurs",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Nom", type: "text", required: true, searchable: true, sortable: true },
        { key: "email", label: "Email", type: "email", searchable: true },
        { key: "telephone", label: "TÃ©lÃ©phone", type: "text", searchable: true },
        {
          key: "categorie",
          label: "CatÃ©gorie",
          type: "select",
          options: [
            { label: "Agricole", value: "agricole" },
            { label: "MatÃ©riel", value: "materiel" },
            { label: "Service", value: "service" },
            { label: "Transport", value: "transport" },
            { label: "Autre", value: "autre" },
          ],
        },
        { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
      ],
    },
    actions: [
      { key: "create", label: "CrÃ©er", type: "primary", href: "/fournisseurs/nouveau", event: "FOURNISSEUR_CREATED" },
      { key: "edit", label: "Modifier", type: "secondary", event: "FOURNISSEUR_UPDATED" },
      { key: "archive", label: "Archiver", type: "danger", event: "FOURNISSEUR_ARCHIVED" },
    ],
    workflows: [
      {
        key: "create-fournisseur",
        label: "CrÃ©ation fournisseur",
        initialState: "draft",
        states: ["draft", "validated", "active", "archived"],
      },
    ],
  },


  {
    metadata: {
      key: "clients",
      label: "Clients",
      description: "Module ERP Clients.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/clients",
        create: "/clients/nouveau",
        details: "/clients",
        edit: "/clients",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
  collection: "clients",
timestamps: true,
  softDelete: true,
  fields: [
    { key: "code", label: "Code client", type: "text", required: true, searchable: true, sortable: true },
    { key: "nom", label: "Nom", type: "text", required: true, searchable: true, sortable: true },
    { key: "email", label: "Email", type: "email", searchable: true },
    { key: "telephone", label: "Téléphone", type: "text", searchable: true },
    { key: "adresse", label: "Adresse", type: "textarea" },
    { key: "typeClient", label: "Type client", type: "select", filterable: true, options: [{ label: "Particulier", value: "particulier" }, { label: "Entreprise", value: "entreprise" }, { label: "Coopérative", value: "cooperative" }] },
    { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
  ],
},
  },
  createBusinessModule({
    key: "commandes",
    label: "Commandes",
    description: "Gestion centralisée des commandes clients.",
    fields: commandeFields,
  }),

  {
    metadata: {
      key: "factures",
      label: "Factures",
      description: "Module ERP Factures.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/factures",
        create: "/factures/nouveau",
        details: "/factures",
        edit: "/factures",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "factures",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "devis",
      label: "Devis",
      description: "Module ERP Devis.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/devis",
        create: "/devis/nouveau",
        details: "/devis",
        edit: "/devis",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
  collection: "devis",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "achats",
      label: "Achats",
      description: "Module ERP Achats.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/achats",
        create: "/achats/nouveau",
        details: "/achats",
        edit: "/achats",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "achats",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "livraisons",
      label: "Livraisons",
      description: "Module ERP Livraisons.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/livraisons",
        create: "/livraisons/nouveau",
        details: "/livraisons",
        edit: "/livraisons",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "livraisons",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "employes",
      label: "Employes",
      description: "Module ERP Employes.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/employes",
        create: "/employes/nouveau",
        details: "/employes",
        edit: "/employes",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
  collection: "employes",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "taches",
      label: "Taches",
      description: "Module ERP Taches.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/taches",
        create: "/taches/nouveau",
        details: "/taches",
        edit: "/taches",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
  collection: "taches",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "incidents",
      label: "Incidents",
      description: "Module ERP Incidents.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/incidents",
        create: "/incidents/nouveau",
        details: "/incidents",
        edit: "/incidents",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "incidents",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "vehicules",
      label: "Vehicules",
      description: "Module ERP Vehicules.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/vehicules",
        create: "/vehicules/nouveau",
        details: "/vehicules",
        edit: "/vehicules",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "vehicules",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "parcelles",
      label: "Parcelles",
      description: "Module ERP Parcelles.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/parcelles",
        create: "/parcelles/nouveau",
        details: "/parcelles",
        edit: "/parcelles",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
  collection: "parcelles",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "recoltes",
      label: "Recoltes",
      description: "Module ERP Recoltes.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/recoltes",
        create: "/recoltes/nouveau",
        details: "/recoltes",
        edit: "/recoltes",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "recoltes",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "intrants",
      label: "Intrants",
      description: "Module ERP Intrants.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/intrants",
        create: "/intrants/nouveau",
        details: "/intrants",
        edit: "/intrants",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
  collection: "intrants",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "depenses",
      label: "Depenses",
      description: "Module ERP Depenses.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/depenses",
        create: "/depenses/nouveau",
        details: "/depenses",
        edit: "/depenses",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "depenses",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "recettes",
      label: "Recettes",
      description: "Module ERP Recettes.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/recettes",
        create: "/recettes/nouveau",
        details: "/recettes",
        edit: "/recettes",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
  collection: "recettes",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },
];
```

# 4. Registry runtime

## ERPModule.ts

```ts
import type { ERPModuleMetadata } from "./metadata/ERPModuleMetadata";
import type { ERPModuleSchema } from "./schemas/ERPModuleSchema";

export interface ERPModuleAction {
  key: string;
  label: string;
  type?: "primary" | "secondary" | "danger" | "ghost";
  permission?: string;
  event?: string;
  href?: string;
}

export interface ERPModuleRelation {
  key: string;
  label: string;
  targetModule?: string;
  targetmodule?: string;
  type: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many";
}

export interface ERPModuleWorkflow {
  key: string;
  label: string;
  initialState?: string;
  states?: string[];
}

export interface ERPModuleVisibility {
  field: string;
  equals?: string | number | boolean;
  notEquals?: string | number | boolean;
  in?: Array<string | number | boolean>;
}

export interface ERPModulePersistence {
  firestore?: boolean;
  timestamps?: boolean;
  softDelete?: boolean;
}

export interface ERPModulePermissions {
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
  import?: boolean;
  export?: boolean;
}

export interface ERPModuleFormTab {
  key: string;
  label: string;
  fields: string[];
}

export interface ERPModuleFormConfig {
  layout?: "sections" | "tabs" | "stepper";
  tabs?: ERPModuleFormTab[];
}

export interface ERPModule {
  metadata: ERPModuleMetadata;
  schema: ERPModuleSchema;

  permissions?: ERPModulePermissions;

  persistence?: ERPModulePersistence;

  visibility?: ERPModuleVisibility;

  form?: ERPModuleFormConfig;

  actions?: ERPModuleAction[];

  relations?: ERPModuleRelation[];

  workflows?: ERPModuleWorkflow[];
}
```

## ERPModuleRegistry.ts

```ts
import type { ERPModuleDefinition } from "./ERPModuleDefinition";

export type ERPAnyModule = ERPModuleDefinition | any;

class ERPModuleRegistryClass {
  private modules = new Map<string, ERPAnyModule>();

  private getModuleKey(module: ERPAnyModule): string {
    return (
      module.key ??
      module.id ??
      module.name ??
      module.metadata?.key ??
      module.metadata?.id ??
      module.metadata?.name
    );
  }

  register(module: ERPAnyModule) {
    const key = this.getModuleKey(module);

    if (!key) {
      throw new Error("ERPModuleRegistry: module key is missing");
    }

    this.modules.set(key, module);
    return module;
  }

  registerMany(modules: ERPAnyModule[]) {
    modules.forEach((module) => this.register(module));
    return this.all();
  }

  get(moduleKey: string) {
    return this.modules.get(moduleKey);
  }

  all() {
    return Array.from(this.modules.values());
  }

  getAll() {
    return this.all();
  }

  has(moduleKey: string) {
    return this.modules.has(moduleKey);
  }

  clear() {
    this.modules.clear();
  }
}

export const ERPModuleRegistry = new ERPModuleRegistryClass();

```

## ERPModuleBuilder.ts

**Fichier introuvable :** C:\Users\Admin\terragest\src\runtime\modules\ERPModuleBuilder.ts

## registerCoreERPModules.ts

```ts
import {
  coreERPModules,
} from "./definitions/coreModules";

import {
  ERPModuleRegistry,
} from "./ERPModuleRegistry";

export function registerCoreERPModules() {
  ERPModuleRegistry.clear();

  ERPModuleRegistry.registerMany(
    coreERPModules
  );

  return ERPModuleRegistry.all();
}
```

# 5. Pages gÃ©nÃ©riques runtime

## GenericListPage.tsx

**Fichier introuvable :** C:\Users\Admin\terragest\src\runtime\modules\pages\GenericListPage.tsx

## GenericCreatePage.tsx

**Fichier introuvable :** C:\Users\Admin\terragest\src\runtime\modules\pages\GenericCreatePage.tsx

## GenericEditPage.tsx

**Fichier introuvable :** C:\Users\Admin\terragest\src\runtime\modules\pages\GenericEditPage.tsx

## GenericDetailPage.tsx

**Fichier introuvable :** C:\Users\Admin\terragest\src\runtime\modules\pages\GenericDetailPage.tsx

# 6. Forms runtime

## ERPEnterpriseForm.tsx

```ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding";

import { ERPButton } from "@/components/erp/ui";

import { ERPFormField } from "./ERPFormField";
import { ERPFormSection } from "./ERPFormSection";
import { ERPFormSummaryPanel } from "./ERPFormSummaryPanel";
import { ERPFormTabs } from "./ERPFormTabs";

import {
  RuntimeValidationEngine,
} from "@/runtime/validation/RuntimeValidationEngine";

import {
  RuntimeVisibilityEngine,
} from "@/runtime/visibility/RuntimeVisibilityEngine";

import {
  RuntimeComputedEngine,
} from "@/runtime/computed/RuntimeComputedEngine";

import type {
  RuntimeValidationError,
} from "@/runtime/validation/RuntimeValidationTypes";

import {
  erpRuntimeValidationBridge,
} from "@/runtime/rules/ERPRuntimeValidationBridge";

interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
  initialData?: Record<string, unknown>;
}

export function ERPEnterpriseForm({
  module,
  mode = "create",
  initialData = {},
}: ERPEnterpriseFormProps) {
  const [saving, setSaving] = useState(false);

  const [errors, setErrors] =
    useState<RuntimeValidationError[]>([]);

  const [formValues, setFormValues] =
    useState<Record<string, unknown>>(initialData);

  const router = useRouter();

  const form =
    ERPModuleBuilder.buildForm(module);

  useEffect(() => {
    const computedValues: Record<string, unknown> = {
      ...formValues,
    };

    form.fields.forEach((field) => {
      if (!field.computed) {
        return;
      }

      computedValues[field.key] =
        RuntimeComputedEngine.compute(
          field.computed.formula,
          computedValues
        );
    });

    const hasChanged =
      JSON.stringify(computedValues) !==
      JSON.stringify(formValues);

    if (hasChanged) {
      setFormValues(computedValues);
    }
  }, [form.fields, formValues]);

  const visibleFields =
    form.fields.filter((field) =>
      RuntimeVisibilityEngine.isVisible(
        field,
        formValues
      )
    );

  const mainFields =
    visibleFields.filter(
      (field) => field.type !== "relation"
    );

  const relationFields =
    visibleFields.filter(
      (field) => field.type === "relation"
    );

  function handleFormChange(
    event: React.FormEvent<HTMLFormElement>
  ) {
    const formData =
      new FormData(event.currentTarget);

    const values =
      Object.fromEntries(formData.entries());

    setFormValues((currentValues) => ({
      ...currentValues,
      ...values,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setSaving(true);

    const formData =
      new FormData(event.currentTarget);

    const payload: Record<string, unknown> = {
      ...formValues,
    };

    visibleFields.forEach((field) => {
      let value: unknown =
        formData.get(field.key) ??
        formValues[field.key];

      if (
        field.type === "number" &&
        value !== null
      ) {
        value =
          value === ""
            ? null
            : Number(value);
      }

      payload[field.key] =
        value ?? "";
    });

    const validationErrors =
      RuntimeValidationEngine.validate(
        module,
        payload
      );

    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      console.log(
        "ERP VALIDATION ERRORS",
        validationErrors
      );



      setSaving(false);
      return;
    }

const businessRulesValid =
  erpRuntimeValidationBridge.validate(
    module.metadata.key,
    payload
  );

if (!businessRulesValid) {
  console.error(
    "ERP BUSINESS RULE VALIDATION FAILED",
    {
      module: module.metadata.key,
      payload,
    }
  );

  setErrors([
    {
      field: "businessRules",
      message:
        "Les règles métier ERP bloquent cet enregistrement.",
    },
  ]);

  setSaving(false);
  return;
}

    try {
      if (mode === "create") {
        await RuntimeDataBinding.create(
          module,
          payload
        );
      } else if (
        mode === "edit" &&
        initialData.id
      ) {
        await RuntimeDataBinding.update(
          module,
          String(initialData.id),
          payload
        );
      }

      router.push(
        module.metadata.routes?.list ??
          `/${module.metadata.key}`
      );

      router.refresh();

      console.log(
        "ERP ENTERPRISE FORM SAVED",
        {
          module: module.metadata.key,
          mode,
          payload,
        }
      );
    } catch (error) {
      console.error(
        "ERP ENTERPRISE FORM ERROR",
        error
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleFormChange}
      className="space-y-8"
    >
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-8 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-200">
            {mode === "create"
              ? "Création"
              : "Modification"}
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            {module.metadata.label}
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
            Formulaire métier connecté au binding runtime.
          </p>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="rounded-xl bg-yellow-50 p-4 text-sm text-slate-900">
            layout: {module.form?.layout ?? "aucun"}
            <br />
            tabs: {module.form?.tabs?.length ?? 0}
          </div>

          {module.form?.layout === "tabs" ? (
            <ERPFormTabs
              module={module}
              initialData={formValues}
              formValues={formValues}
            />
          ) : (
            <>
              <ERPFormSection
                title="Informations principales"
                description="Renseigne les champs principaux du module."
              >
                {mainFields.map((field) => (
                  <ERPFormField
                    key={field.key}
                    field={field}
                    initialValue={
                      formValues[field.key]
                    }
                  />
                ))}
              </ERPFormSection>

              {relationFields.length > 0 && (
                <ERPFormSection
                  title="Relations"
                  description="Associe cet élément aux autres objets métier."
                >
                  {relationFields.map((field) => (
                    <ERPFormField
                      key={field.key}
                      field={field}
                      initialValue={
                        formValues[field.key]
                      }
                    />
                  ))}
                </ERPFormSection>
              )}
            </>
          )}

          <div className="flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            {errors.length > 0 && (
              <div className="w-full rounded-3xl border border-red-200 bg-red-50 p-5">
                <h3 className="text-sm font-black text-red-700">
                  Validation métier
                </h3>

                <div className="mt-3 space-y-2">
                  {errors.map((error, index) => (
                    <div
                      key={index}
                      className="text-sm text-red-600"
                    >
                      • {error.field} : {error.message}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ERPButton
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Enregistrement..."
                : "Enregistrer"}
            </ERPButton>

            <ERPButton
              variant="secondary"
              type="button"
              disabled={saving}
              onClick={() => {
                console.log(
                  "Enregistrer et continuer cliqué"
                );
              }}
            >
              Enregistrer et continuer
            </ERPButton>

            <ERPButton
              variant="secondary"
              type="button"
              disabled={saving}
              onClick={() =>
                router.push(
                  module.metadata.routes?.list ??
                    `/${module.metadata.key}`
                )
              }
            >
              Annuler
            </ERPButton>
          </div>
        </div>

        <ERPFormSummaryPanel module={module} />
      </section>
    </form>
  );
}
```

## ERPFormTabs.tsx

```ts
"use client";

import { useState } from "react";

import type {
  ERPModule,
  ERPModuleField,
} from "@/runtime/modules";

import {
  RuntimeVisibilityEngine,
} from "@/runtime/visibility/RuntimeVisibilityEngine";

import { ERPFormField } from "./ERPFormField";

interface ERPFormTabsProps {
  module: ERPModule;
  initialData?: Record<string, unknown>;
  formValues?: Record<string, unknown>;
}

export function ERPFormTabs({
  module,
  initialData = {},
  formValues = {},
}: ERPFormTabsProps) {
  const [activeTab, setActiveTab] =
    useState(
      module.form?.tabs?.[0]?.key ?? ""
    );

  const tabs =
    module.form?.tabs ?? [];

  const fields =
    module.schema.fields;

  const activeTabConfig =
    tabs.find(
      (tab) =>
        tab.key === activeTab
    );

  const visibleFields =
    fields.filter(
      (field: ERPModuleField) =>
        activeTabConfig?.fields.includes(
          field.key
        ) &&
        RuntimeVisibilityEngine.isVisible(
          field,
          formValues
        )
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-4">
        {tabs.map((tab) => {
          const active =
            tab.key === activeTab;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() =>
                setActiveTab(tab.key)
              }
              className={`
                rounded-2xl
                px-5
                py-3
                text-sm
                font-bold
                transition
                ${
                  active
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          {visibleFields.map((field) => (
            <ERPFormField
              key={field.key}
              field={field}
              initialValue={
                initialData[field.key]
              }
            />
          ))}
        </div>

        {visibleFields.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucun champ à afficher pour cet onglet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
```

## ERPFormField.tsx

```ts
"use client";

import { useEffect, useState } from "react";
import type { ERPModuleField } from "@/runtime/modules";
import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";

type RelationOption = {
  id: string;
  label: string;
};

interface ERPFormFieldProps {
  field: ERPModuleField;
  initialValue?: unknown;
}

export function ERPFormField({
  field,
  initialValue,
}: ERPFormFieldProps) {
  const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);

  useEffect(() => {
    async function loadRelation() {
      if (field.type !== "relation") {
        return;
      }

      const targetModule =
        field.references?.module ??
        field.relation;

      if (!targetModule) {
        return;
      }

      try {
        const options =
          await ERPRelationDataLoader.load(
            targetModule
          );

        setRelationOptions(options);
      } catch (error) {
        console.error(
          "ERP RELATION LOAD ERROR",
          error
        );

        setRelationOptions([]);
      }
    }

    loadRelation();
  }, [field]);

  const label = (
    <span className="text-sm font-bold text-slate-700">
      {field.label}
      {field.required ? " *" : ""}
    </span>
  );

  const className =
    "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500";

  /*
   * RELATION
   */

  if (field.type === "relation") {
    return (
      <label className="block space-y-2">
        {label}

        <select
          key={`${field.key}-${String(initialValue ?? "")}-${relationOptions.length}`}
          name={field.key}
          required={field.required}
          defaultValue={String(initialValue ?? "")}
          className={className}
        >
          <option value="">
            Sélectionner
          </option>

          {relationOptions.map((option) => (
            <option
              key={option.id}
              value={option.id}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  /*
   * SELECT / STATUS
   */

  if (
    field.type === "select" ||
    field.type === "status"
  ) {
    return (
      <label className="block space-y-2">
        {label}

        <select
          name={field.key}
          required={field.required}
          defaultValue={String(initialValue ?? "")}
          className={className}
        >
          <option value="">
            Sélectionner
          </option>

          {(field.options ?? [
            {
              label: "Actif",
              value: "actif",
            },
            {
              label: "En suivi",
              value: "en-suivi",
            },
            {
              label: "À contrôler",
              value: "a-controler",
            },
          ]).map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  /*
   * BOOLEAN
   */

  if (field.type === "boolean") {
    return (
      <label className="block space-y-2">
        {label}

        <select
          name={field.key}
          required={field.required}
          defaultValue={String(initialValue ?? "")}
          className={className}
        >
          <option value="">
            Sélectionner
          </option>

          <option value="true">
            Oui
          </option>

          <option value="false">
            Non
          </option>
        </select>
      </label>
    );
  }

  /*
   * TEXTAREA
   */

  if (field.type === "textarea") {
    return (
      <label className="block space-y-2">
        {label}

        <textarea
          name={field.key}
          required={field.required}
          defaultValue={String(initialValue ?? "")}
          placeholder={field.label}
          className="
            min-h-32
            w-full
            rounded-2xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            text-sm
            text-slate-900
            placeholder:text-slate-400
            outline-none
            transition
            focus:border-blue-500
          "
        />
      </label>
    );
  }

  /*
   * INPUTS
   */

  return (
    <label className="block space-y-2">
      {label}

      <input
        name={field.key}
        required={field.required}
        defaultValue={String(initialValue ?? "")}
        type={
          field.type === "number"
            ? "number"
            : field.type === "date"
              ? "date"
              : field.type === "email"
                ? "email"
                : "text"
        }
        placeholder={field.label}
        className={className}
      />
    </label>
  );
}
```

# 7. Data binding / Firestore runtime

## RuntimeDataBinding.ts

```ts
import type {
  ERPModule,
} from "@/runtime/modules";

import {
  FirestoreRuntimeQuery,
  FirestoreRuntimeMutation,
} from "@/runtime/firestore";

export class RuntimeDataBinding {
  static async list(
    module: ERPModule
  ) {
    return FirestoreRuntimeQuery.list(
      module
    );
  }

  static async detail(
    module: ERPModule,
    id: string
  ) {
    return FirestoreRuntimeQuery.detail(
      module,
      id
    );
  }

  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeMutation.create(
      module,
      data
    );
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeMutation.update(
      module,
      id,
      data
    );
  }

  static async delete(
    module: ERPModule,
    id: string
  ) {
    return FirestoreRuntimeMutation.delete(
      module,
      id
    );
  }
}
```

## FirestoreRuntimeRepository.ts

**Fichier introuvable :** C:\Users\Admin\terragest\src\runtime\firebase\runtime-firestore\FirestoreRuntimeRepository.ts

## FirestoreRuntimeMutation.ts

**Fichier introuvable :** C:\Users\Admin\terragest\src\runtime\firebase\runtime-firestore\FirestoreRuntimeMutation.ts

# 8. Recherche des mÃ©canismes existants

## Recherche : defaultFeatures

```txt
```

## Recherche : features:

```txt
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:131 features: {
C:\Users\Admin\terragest\src\core\schemas\exploitations.schema.ts:75 features: {
C:\Users\Admin\terragest\src\core\schemas\materiels.schema.ts:67 features: {
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:67 features: {
C:\Users\Admin\terragest\src\features\billing\components\BillingPlans.tsx:11 features: [
C:\Users\Admin\terragest\src\features\billing\components\BillingPlans.tsx:20 features: [
C:\Users\Admin\terragest\src\features\billing\components\BillingPlans.tsx:30 features: [
C:\Users\Admin\terragest\src\platform\registry\FeatureRegistry.ts:9 private features:
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:35 allowedFeatures: [
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:46 allowedFeatures: [
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:66 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:130 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:172 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:213 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:255 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:296 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:463 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:529 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:579 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:620 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:661 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:702 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:743 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:784 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:825 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:866 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:907 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:948 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:989 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1030 features: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1071 features: {
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:50 features: {
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:35 features: {
```

## Recherche : routes:

```txt
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:30 routes: {
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:101 routes: {
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataGenerationBridge.ts:50 routes:
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:50 routes: ERPModuleRoute;
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:60 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:124 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:166 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:207 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:249 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:290 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:457 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:522 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:572 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:613 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:654 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:695 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:736 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:777 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:818 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:859 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:900 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:941 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:982 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1023 routes: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1064 routes: {
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:43 routes: {
```

## Recherche : permissions

```txt
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitMetricGrid.tsx:21 <ERPStatCard label="Permissions" value={snapshot.permissionsCount} helper="Controle acces" />
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:34 <th className="px-4 py-3 text-left font-semibold text-slate-600">Permissions</th>
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:47 <td className="px-4 py-3 text-slate-600">{module.permissions.length}</td>
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpitDashboard.tsx:17 description="Supervision centrale des modules, schemas, actions, workflows, events, automation, permissions et navigation."
C:\Users\Admin\terragest\src\components\erp\layout\ERPCommandPanel.tsx:39 <ERPButton variant="ghost" type="button">Permissions</ERPButton>
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:25 description="Source unique de verite ERP pour modules, schemas, actions, workflows, permissions et automation."
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityDashboard.tsx:22 description="Roles, permissions, policies, guards, session runtime et audit securite."
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityMetrics.tsx:16 <ERPStatCard label="Permissions" value={snapshot.permissionsCount} helper="Actions securisees" />
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityPanel.tsx:14 label: "Permissions",
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:4 runtimeRolePermissions,
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:9 const permissions = runtimeRolePermissions[user.role];
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:19 Permissions runtime appliquees aux actions et workflows.
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:43 {permissions.slice(0, 6).map((permission) => (
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:28 <ERPButton variant="ghost" type="button">Controler permissions</ERPButton>
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:36 permissions?: string[];
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:119 permissions:
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:120 module.permissions
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:121 ? Object.entries(module.permissions)
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:14 permissions?: boolean;
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:47 permissions: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:72 permissions: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:93 permissions: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:108 permissions: true,
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:107 const permissions =
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:112 if (!permissions) {
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:116 return permissions.includes(
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:121 export function getPermissions(
C:\Users\Admin\terragest\src\core\permissions\permissions.ts:1 export const PERMISSIONS = {
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:9 import { usePermissions }
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:10 from "@/features/auth/hooks/usePermissions";
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:17 typeof usePermissions
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:29 const permissions =
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:30 usePermissions(role);
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:32 if (!permissions[permission]) {
C:\Users\Admin\terragest\src\features\auth\hooks\usePermission.ts:1 import { Permissions } from "@/features/auth/types/Permissions";
C:\Users\Admin\terragest\src\features\auth\hooks\usePermission.ts:5 permission: keyof typeof Permissions
C:\Users\Admin\terragest\src\features\auth\hooks\usePermission.ts:12 return Permissions[
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:1 import { PermissionService } from "@/features/auth/services/PermissionService";
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:3 export function usePermissions(role: string) {
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:6 PermissionService.canViewDashboard(role),
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:9 PermissionService.canViewModules(role),
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:12 PermissionService.canManageUsers(role),
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:16 export default usePermissions;
C:\Users\Admin\terragest\src\features\auth\services\PermissionService.ts:1 export const PermissionService = {
C:\Users\Admin\terragest\src\features\auth\services\PermissionService.ts:15 export default PermissionService;
C:\Users\Admin\terragest\src\features\auth\services\RBACEngine.ts:14 permissions: string[],
C:\Users\Admin\terragest\src\features\auth\services\RBACEngine.ts:18 return permissions.includes(
C:\Users\Admin\terragest\src\features\auth\types\Permissions.ts:4 export const Permissions = {
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:11 import { DomainPermissions }
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:12 from "@/platform/governance/permissions/DomainPermissions";
C:\Users\Admin\terragest\src\platform\governance\GovernanceRuntime.ts:36 DomainPermissions
C:\Users\Admin\terragest\src\platform\governance\permissions\DomainPermissions.ts:1 // src/platform/governance/permissions/DomainPermissions.ts
C:\Users\Admin\terragest\src\platform\governance\permissions\DomainPermissions.ts:8 class DomainPermissionsManager {
C:\Users\Admin\terragest\src\platform\governance\permissions\DomainPermissions.ts:24 export const DomainPermissions =
C:\Users\Admin\terragest\src\platform\governance\permissions\DomainPermissions.ts:25 new DomainPermissionsManager();
C:\Users\Admin\terragest\src\platform\security\guards\FeatureGuard.ts:9 from "../permissions/PermissionEngine";
C:\Users\Admin\terragest\src\platform\security\guards\FeatureGuard.ts:18 private permissions =
C:\Users\Admin\terragest\src\platform\security\guards\FeatureGuard.ts:26 return this.permissions.canAccessFeature(
C:\Users\Admin\terragest\src\runtime\actions\ERPAction.ts:11 | "permissions";
C:\Users\Admin\terragest\src\runtime\actions\ERPActionExecutor.ts:29 case "permissions":
C:\Users\Admin\terragest\src\runtime\actions\ERPActionExecutor.ts:30 toast.success("Chargement des permissions");
C:\Users\Admin\terragest\src\runtime\cockpit\ERPCockpitSnapshot.ts:13 permissionsCount: modules.reduce((total, module) => total + module.permissions.length, 0),
C:\Users\Admin\terragest\src\runtime\core\RuntimeBindings.ts:9 permissions: string[];
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:23 | "permissions"
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:37 permissions: string[];
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:18 permissions:
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:19 module.permissions,
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:7 private permissions =
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:22 this.permissions.set(
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:24 binding.permissions
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:29 getModulePermissions(
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:33 return this.permissions.get(
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:38 getAllPermissions() {
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:41 this.permissions.entries()
C:\Users\Admin\terragest\src\runtime\generation\ERPModuleGenerationEngine.ts:49 generatePermissions() {
C:\Users\Admin\terragest\src\runtime\generation\ERPModuleGenerationEngine.ts:54 permissions: [
C:\Users\Admin\terragest\src\runtime\generation\ERPPermissionsGenerationEngine.ts:5 permissions: string[];
C:\Users\Admin\terragest\src\runtime\generation\ERPPermissionsGenerationEngine.ts:8 export class ERPPermissionsGenerationEngine {
C:\Users\Admin\terragest\src\runtime\generation\ERPPermissionsGenerationEngine.ts:10 generatePermissions(
C:\Users\Admin\terragest\src\runtime\generation\ERPPermissionsGenerationEngine.ts:18 permissions: [
C:\Users\Admin\terragest\src\runtime\generation\ERPPermissionsGenerationEngine.ts:30 export const erpPermissionsGenerationEngine =
C:\Users\Admin\terragest\src\runtime\generation\ERPPermissionsGenerationEngine.ts:31 new ERPPermissionsGenerationEngine();
C:\Users\Admin\terragest\src\runtime\generation\index.ts:8 export * from "./ERPPermissionsGenerationEngine";
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataGenerationBridge.ts:11 erpPermissionsGenerationEngine,
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataGenerationBridge.ts:60 permissions:
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataGenerationBridge.ts:61 erpPermissionsGenerationEngine.generatePermissions(
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:41 export interface ERPModulePermissions {
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:65 permissions?: ERPModulePermissions;
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:57 "permissions",
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:72 permissions:
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:73 module.permissions
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:74 ? Object.entries(module.permissions)
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:132 permissions:
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:133 module.permissions
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:134 ? Object.entries(module.permissions)
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:18 permissions: {
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:62 permissions: {
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:15 permissions?: string[];
C:\Users\Admin\terragest\src\runtime\os\access\AccessController.ts:2 from "../permissions/PermissionEngine";
C:\Users\Admin\terragest\src\runtime\os\access\AccessController.ts:6 private permissions =
C:\Users\Admin\terragest\src\runtime\os\access\AccessController.ts:13 return this.permissions.can(
C:\Users\Admin\terragest\src\runtime\permissions\ERPProtectedAction.tsx:4 RuntimePermissionsEngine,
C:\Users\Admin\terragest\src\runtime\permissions\ERPProtectedAction.tsx:6 from "@/runtime/permissions/RuntimePermissionsEngine";
C:\Users\Admin\terragest\src\runtime\permissions\ERPProtectedAction.tsx:33 RuntimePermissionsEngine.can(
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:4 from "@/runtime/permissions/RuntimePermission";
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:6 export const runtimePermissions:
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermissionsEngine.ts:2 runtimePermissions,
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermissionsEngine.ts:4 from "@/runtime/permissions/runtimePermissions";
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermissionsEngine.ts:6 export class RuntimePermissionsEngine {
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermissionsEngine.ts:19 runtimePermissions.find(
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermissionsEngine.ts:47 return runtimePermissions.filter(
C:\Users\Admin\terragest\src\runtime\policies\generated\achats\achats.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\clients\clients.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\commandes\commandes.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\depenses\depenses.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\devis\devis.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\employes\employes.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\factures\factures.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\fournisseurs\fournisseurs.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\incidents\incidents.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\intrants\intrants.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\livraisons\livraisons.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\parcelles\parcelles.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\recettes\recettes.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\recoltes\recoltes.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\taches\taches.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\policies\generated\vehicules\vehicules.policy.ts:6 permissions: [
C:\Users\Admin\terragest\src\runtime\production\governance\ERPProductionPolicyRegistry.ts:16 description: "La couche roles, permissions et policies existe.",
C:\Users\Admin\terragest\src\runtime\registry\ERPRegistry.ts:45 permissions(
C:\Users\Admin\terragest\src\runtime\registry\ERPRegistry.ts:51 ?.permissions ?? []
C:\Users\Admin\terragest\src\runtime\registry\types.ts:54 permissions: ERPRegistryPermission[];
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:71 permissions: [
C:\Users\Admin\terragest\src\runtime\security\ERPSecuritySnapshot.ts:2 import { ERPPermissionRegistry } from "./permissions/ERPPermissionRegistry";
C:\Users\Admin\terragest\src\runtime\security\ERPSecuritySnapshot.ts:13 permissions: ERPPermissionRegistry,
C:\Users\Admin\terragest\src\runtime\security\ERPSecuritySnapshot.ts:18 permissionsCount: ERPPermissionRegistry.length,
C:\Users\Admin\terragest\src\runtime\security\index.ts:3 export * from "./permissions/ERPPermission";
C:\Users\Admin\terragest\src\runtime\security\index.ts:4 export * from "./permissions/ERPPermissionRegistry";
C:\Users\Admin\terragest\src\runtime\security\guards\ERPAccessGuard.ts:1 import type { ERPPermissionAction } from "../permissions/ERPPermission";
C:\Users\Admin\terragest\src\runtime\security\policies\ERPPolicy.ts:2 import type { ERPPermissionAction } from "../permissions/ERPPermission";
C:\Users\Admin\terragest\src\runtime\security-runtime\index.ts:5 export { runtimeRolePermissions } from "./RuntimePolicyRegistry";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:3 import { runtimeRolePermissions } from "./RuntimePolicyRegistry";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:10 return runtimeRolePermissions[user.role].includes(permission);
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:4 export const runtimeRolePermissions: Record<RuntimeRole, RuntimePermission[]> = {
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:7 RuntimePermissionsEngine,
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:9 from "@/runtime/permissions/RuntimePermissionsEngine";
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:64 RuntimePermissionsEngine.can(
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:7 permissions: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:23 permissions: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:37 permissions: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:52 permissions: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:67 permissions: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:82 permissions: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:97 permissions: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:112 permissions: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:18 "permissions",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:26 permissions: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:40 "permissions",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:48 permissions: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:62 "permissions",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:70 permissions: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:84 "permissions",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:92 permissions: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:106 "permissions",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:114 permissions: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:128 "permissions",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:136 permissions: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:150 "permissions",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:158 permissions: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:172 "permissions",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:180 permissions: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:196 "permissions",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:204 permissions: [],
```

## Recherche : workflow

```txt
C:\Users\Admin\terragest\src\analytics\aggregation\AggregationService.ts:5 totalWorkflows: 0,
C:\Users\Admin\terragest\src\analytics\services\AggregationService.ts:6 totalWorkflows: 0,
C:\Users\Admin\terragest\src\app\(private)\contrats\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\contrats\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\exploitations\details\page.tsx:98 Workflow maintenance exécuté automatiquement.
C:\Users\Admin\terragest\src\app\(private)\exploitations\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\exploitations\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:9 import { ERPWorkflowStep }
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:10 from "@/components/erp/workflow/ERPWorkflowStep";
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:12 export default function InterventionWorkflowPage() {
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:17 title="Workflow intervention"
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:21 <ERPWidgetCard title="Progression workflow">
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:25 <ERPWorkflowStep
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:31 <ERPWorkflowStep
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:34 description="Le workflow intervention a été déclenché."
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:37 <ERPWorkflowStep
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:43 <ERPWorkflowStep
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:49 <ERPWorkflowStep
C:\Users\Admin\terragest\src\app\(private)\interventions\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\interventions\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\maintenance\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\maintenance\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\materiels\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\materiels\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\operations\page.tsx:36 item.workflow
C:\Users\Admin\terragest\src\app\(private)\operations\page.tsx:57 `Intervention ${item.workflow}`
C:\Users\Admin\terragest\src\app\(private)\operations\page.tsx:104 workflowsActifs={
C:\Users\Admin\terragest\src\app\(private)\paiements\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\paiements\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\produits\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\produits\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\stocks\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\stocks\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\terrains\workflows\page.tsx:7 type="workflows"
C:\Users\Admin\terragest\src\app\(private)\terrains\workflows\page.tsx:8 actionLabel="Workflows"
C:\Users\Admin\terragest\src\app\(private)\workflows-runtime\page.tsx:1 import { ERPRuntimeWorkflowDashboard } from "@/components/erp/workflows";
C:\Users\Admin\terragest\src\app\(private)\workflows-runtime\page.tsx:4 return <ERPRuntimeWorkflowDashboard />;
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:67 workflow:
C:\Users\Admin\terragest\src\components\erp\activity\ERPActivityFeed.tsx:8 description: "Workflow intervention déclenché sur TR-204.",
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIInsights.tsx:22 title: "Performance workflow",
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:13 action: "Modification workflow maintenance",
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:29 workflowBlocked: true,
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitHealthPanel.tsx:27 label: "Workflows declares",
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitHealthPanel.tsx:28 ok: snapshot.workflowsCount > 0,
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitMetricGrid.tsx:18 <ERPStatCard label="Workflows" value={snapshot.workflowsCount} helper="Processus metier" />
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:31 <th className="px-4 py-3 text-left font-semibold text-slate-600">Workflows</th>
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:44 <td className="px-4 py-3 text-slate-600">{module.workflows.length}</td>
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx:20 label: "Workflow monitoring",
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx:21 value: snapshot.workflowsCount,
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx:22 helper: "Workflows rattaches aux modules",
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpit.tsx:19 <ERPStatCard label="Workflows" value="Monitoring" />
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpitDashboard.tsx:17 description="Supervision centrale des modules, schemas, actions, workflows, events, automation, permissions et navigation."
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:43 const workflowCount =
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:46 entry.type === "workflow"
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:98 workflows, événements, règles métier et monitoring ERP.
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:115 Workflows
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:119 {workflowCount}
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:46 function simulateWorkflow() {
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:47 ERPEventRuntimeOrchestrator.simulateWorkflowCompleted();
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:77 <ERPButton variant="ghost" type="button" onClick={simulateWorkflow}>
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:78 Simuler workflow termine
C:\Users\Admin\terragest\src\components\erp\executive-dashboard\ERPExecutiveDashboard.tsx:23 <div className="text-sm text-gray-500">Workflows</div>
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx:43 <p>4. Declenchement possible du workflow</p>
C:\Users\Admin\terragest\src\components\erp\kpi\ERPKPIGrid.tsx:11 label: "Workflows actifs",
C:\Users\Admin\terragest\src\components\erp\layout\ERPActionBar.tsx:14 <ERPButton variant="ghost" type="button">Workflow</ERPButton>
C:\Users\Admin\terragest\src\components\erp\layout\ERPCommandPanel.tsx:32 Actions globales connectables aux workflows, rÃ¨gles et audit.
C:\Users\Admin\terragest\src\components\erp\layout\ERPCommandPanel.tsx:36 <ERPButton type="button">Lancer workflow</ERPButton>
C:\Users\Admin\terragest\src\components\erp\layout\ERPTabNavigation.tsx:4 "Workflows",
C:\Users\Admin\terragest\src\components\erp\live\ERPLiveEvents.tsx:8 label: "Workflow maintenance exécuté",
C:\Users\Admin\terragest\src\components\erp\modules\ERPModuleEnterprisePage.tsx:28 helper: "Events et workflows",
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPMonitoringMetricsGrid.tsx:20 <ERPStatCard label="Workflows" value={metrics.workflows} helper="Instances" />
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPSystemHealth.tsx:11 ["Workflows", "healthy"],
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:22 ["Workflows", snapshot.workflows.length],
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:34 description="Repository runtime tenant-aware pour events, traces, alerts, workflows, queue jobs et audit."
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:18 <ERPStatCard label="Workflows" value={snapshot.workflows} helper="Processus live" />
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatus.tsx:10 name: "Workflow Engine",
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:25 description="Source unique de verite ERP pour modules, schemas, actions, workflows, permissions et automation."
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:79 Workflows
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:109 {module.workflows.length}
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:19 Permissions runtime appliquees aux actions et workflows.
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:59 case "workflows":
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:60 return "Workflows";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActivityPanel.tsx:23 title: "Workflow disponible",
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleDashboardTemplate.tsx:5 import { ERPModuleWorkflowPanel } from "./ERPModuleWorkflowPanel";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleDashboardTemplate.tsx:21 <ERPModuleWorkflowPanel module={module} />
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleListTemplate.tsx:7 import { ERPModuleWorkflowPanel } from "./ERPModuleWorkflowPanel";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleListTemplate.tsx:28 <ERPModuleWorkflowPanel module={module} />
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleToolbar.tsx:21 <option>Vue workflow</option>
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:4 interface ERPModuleWorkflowPanelProps {
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:8 export function ERPModuleWorkflowPanel({
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:10 }: ERPModuleWorkflowPanelProps) {
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:11 const workflowsEnabled = module.metadata.features?.workflows === true;
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:22 Actions operationnelles, workflows et audit discret.
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:27 {workflowsEnabled && <ERPBadge tone="info">Workflows</ERPBadge>}
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:16 | "workflows";
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:50 workflows: GenericERPTemplate,
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsPanel.tsx:60 <p className="text-sm text-slate-500">Workflows</p>
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsPanel.tsx:62 {metrics.workflows}
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingDashboard.tsx:35 description="Validation runtime, workflows, workers, securite, multi-tenant et observability."
C:\Users\Admin\terragest\src\components\erp\timeline\ERPEventTimeline.tsx:7 title: "Workflow maintenance exécuté",
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:3 import { ERPWorkflowStep }
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:4 from "@/components/erp/workflow/ERPWorkflowStep";
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:6 export function ERPWorkflowBoard() {
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:12 <ERPWorkflowStep
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:18 <ERPWorkflowStep
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:21 description="Workflow intervention déclenché."
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:24 <ERPWorkflowStep
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:30 <ERPWorkflowStep
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:36 <ERPWorkflowStep
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:37 title="Clôture workflow"
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:39 description="Workflow non terminé."
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowStep.tsx:3 export function ERPWorkflowStep({
C:\Users\Admin\terragest\src\components\erp\workflow\WorkflowActions.tsx:1 // src/components/erp/workflow/WorkflowActions.tsx
C:\Users\Admin\terragest\src\components\erp\workflow\WorkflowActions.tsx:3 interface WorkflowActionsProps {
C:\Users\Admin\terragest\src\components\erp\workflow\WorkflowActions.tsx:10 export function WorkflowActions({
C:\Users\Admin\terragest\src\components\erp\workflow\WorkflowActions.tsx:15 }: WorkflowActionsProps) {
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:3 type WorkflowStep = {
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:11 type WorkflowTransition = {
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:20 steps: WorkflowStep[];
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:22 transitions: WorkflowTransition[];
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:25 export function ERPWorkflowDesigner({
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:123 Aucun workflow ERP.
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:7 type WorkflowStep = {
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:13 type WorkflowTransition = {
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:20 initialSteps?: WorkflowStep[];
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:22 initialTransitions?: WorkflowTransition[];
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:25 export function ERPVisualWorkflowEditor({
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:87 ERP Workflow Editor
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:91 Construisez visuellement vos workflows ERP.
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:203 Workflow Runtime
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:260 Aucun workflow défini.
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:7 WorkflowRuntimeEngine,
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:8 WorkflowRuntimeRegistry,
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:9 type WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:10 } from "@/runtime/workflow-runtime";
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:11 import { RuntimeWorkflowGuard } from "@/runtime/security-runtime";
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:13 interface ERPWorkflowRuntimePanelProps {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:18 export function ERPWorkflowRuntimePanel({
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:21 }: ERPWorkflowRuntimePanelProps) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:22 const workflows = WorkflowRuntimeRegistry.forModule(module.metadata.key);
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:23 const workflow = workflows[0];
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:26 useState<WorkflowRuntimeInstance | null>(null);
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:28 if (!workflow) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:32 Workflows
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:35 Aucun workflow declare pour ce module.
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:41 const currentStep = instance?.currentStep ?? workflow.initialStep;
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:43 const availableTransitions = workflow.transitions.filter(
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:47 function startWorkflow() {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:48 if (!RuntimeWorkflowGuard.canStart()) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:53 WorkflowRuntimeEngine.start(workflow.key, recordId)
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:58 if (requiresValidation && !RuntimeWorkflowGuard.canValidate()) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:62 if (!RuntimeWorkflowGuard.canTransition()) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:67 WorkflowRuntimeEngine.transition(workflow.key, recordId, to)
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:76 Workflow runtime
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:79 {workflow.label}
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:89 {workflow.steps.map((step) => {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:109 {!instance && RuntimeWorkflowGuard.canStart() && (
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:110 <ERPButton type="button" onClick={startWorkflow}>
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:111 Demarrer workflow
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:118 !RuntimeWorkflowGuard.canValidate();
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:120 if (hidden || !RuntimeWorkflowGuard.canTransition()) {
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\index.ts:1 export { ERPWorkflowRuntimePanel } from "./ERPWorkflowRuntimePanel";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:2 import { seedERPRuntimeWorkflows } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:4 import { ERPWorkflowMetricGrid } from "./ERPWorkflowMetricGrid";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:5 import { ERPWorkflowDefinitionsPanel } from "./ERPWorkflowDefinitionsPanel";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:6 import { ERPWorkflowExecutionsPanel } from "./ERPWorkflowExecutionsPanel";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:7 import { ERPWorkflowTimelinePanel } from "./ERPWorkflowTimelinePanel";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:9 seedERPRuntimeWorkflows();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:11 export function ERPRuntimeWorkflowDashboard() {
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:15 eyebrow="ERP Workflow Engine"
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:16 title="Workflow Engine Enterprise"
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:20 <ERPWorkflowMetricGrid />
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:23 <ERPWorkflowDefinitionsPanel />
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:24 <ERPWorkflowExecutionsPanel />
C:\Users\Admin\terragest\src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx:27 <ERPWorkflowTimelinePanel />
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:2 import { ERPWorkflowEngine } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:4 export function ERPWorkflowDefinitionsPanel() {
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:6 ERPWorkflowEngine.definitions();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:12 Definitions workflows
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:20 {definitions.map((workflow) => (
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:22 key={workflow.key}
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:28 {workflow.label}
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:31 {workflow.description}
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:36 {workflow.module}
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx:41 {workflow.steps.map((step) => (
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowExecutionsPanel.tsx:2 import { ERPWorkflowExecutionStore } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowExecutionsPanel.tsx:4 export function ERPWorkflowExecutionsPanel() {
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowExecutionsPanel.tsx:6 ERPWorkflowExecutionStore.all();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowExecutionsPanel.tsx:15 Instances de workflows lancees par le moteur.
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowExecutionsPanel.tsx:28 {execution.workflowKey}
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:3 ERPWorkflowEngine,
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:4 ERPWorkflowExecutionStore,
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:5 ERPWorkflowTimelineStore,
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:6 } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:8 export function ERPWorkflowMetricGrid() {
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:10 ERPWorkflowEngine.definitions();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:13 ERPWorkflowExecutionStore.all();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:16 ERPWorkflowTimelineStore.all();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:23 <ERPStatCard label="Definitions" value={definitions.length} helper="Workflows declares" />
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowMetricGrid.tsx:26 <ERPStatCard label="Timeline" value={timeline.length} helper="Evenements workflow" />
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowTimelinePanel.tsx:2 import { ERPWorkflowTimelineStore } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowTimelinePanel.tsx:4 export function ERPWorkflowTimelinePanel() {
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowTimelinePanel.tsx:6 ERPWorkflowTimelineStore.all();
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowTimelinePanel.tsx:12 Timeline workflow
C:\Users\Admin\terragest\src\components\erp\workflows\ERPWorkflowTimelinePanel.tsx:15 Evenements produits par le workflow engine.
C:\Users\Admin\terragest\src\components\erp\workflows\index.ts:1 export * from "./ERPWorkflowMetricGrid";
C:\Users\Admin\terragest\src\components\erp\workflows\index.ts:2 export * from "./ERPWorkflowDefinitionsPanel";
C:\Users\Admin\terragest\src\components\erp\workflows\index.ts:3 export * from "./ERPWorkflowExecutionsPanel";
C:\Users\Admin\terragest\src\components\erp\workflows\index.ts:4 export * from "./ERPWorkflowTimelinePanel";
C:\Users\Admin\terragest\src\components\erp\workflows\index.ts:5 export * from "./ERPRuntimeWorkflowDashboard";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceActivity.tsx:12 "Workflow disponible pour validation",
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:3 import { ERPWorkflowRuntimePanel } from "@/components/erp/workflow-runtime";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:32 <ERPWorkflowRuntimePanel module={module} />
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceTabs.tsx:5 "Workflows",
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:71 workflow:
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:67 workflow:
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:13 import { MaintenanceWorkflowService }
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:14 from "@/domains/maintenance/services/MaintenanceWorkflowService";
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:32 MaintenanceWorkflowService
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:45 MaintenanceWorkflowService
C:\Users\Admin\terragest\src\components\operations\OperationsMetrics.tsx:9 workflowsActifs: number;
C:\Users\Admin\terragest\src\components\operations\OperationsMetrics.tsx:18 workflowsActifs
C:\Users\Admin\terragest\src\components\operations\OperationsMetrics.tsx:44 "Workflows actifs",
C:\Users\Admin\terragest\src\components\operations\OperationsMetrics.tsx:47 workflowsActifs
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:85 workflow:
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:15 import { WorkflowStatus }
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:16 from "@/components/workflow/WorkflowStatus";
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:21 import { WorkflowActions }
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:22 from "@/components/erp/workflow/WorkflowActions";
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:41 function validateWorkflow() {
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:53 function approveWorkflow() {
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:98 <WorkflowStatus
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:100 stock.workflow
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:104 <WorkflowActions
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:107 validateWorkflow
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:111 approveWorkflow
C:\Users\Admin\terragest\src\components\workflow\WorkflowStatus.tsx:1 // src/components/workflow/WorkflowStatus.tsx
C:\Users\Admin\terragest\src\components\workflow\WorkflowStatus.tsx:3 interface WorkflowStatusProps {
C:\Users\Admin\terragest\src\components\workflow\WorkflowStatus.tsx:8 export function WorkflowStatus({
C:\Users\Admin\terragest\src\components\workflow\WorkflowStatus.tsx:11 }: WorkflowStatusProps) {
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:21 workflow?: string;
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:80 console.log("WORKFLOW EXECUTION", {
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:81 workflow:
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:82 `${payload.module}.${payload.action}.workflow`,
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:88 type: "workflow",
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:92 `Workflow ${payload.module}.${payload.action}.workflow`,
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:144 workflow:
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:145 `${payload.module}.${payload.action}.workflow`,
C:\Users\Admin\terragest\src\core\dead-letter\dead-letter-queue.ts:60 type: "workflow",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:21 "EVENT BUS : maintenance workflow"
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:66 type: "workflow",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:71 "Workflow maintenance déclenché via Event Bus",
C:\Users\Admin\terragest\src\core\hooks\register-hooks.ts:23 "WORKFLOW MAINTENANCE START"
C:\Users\Admin\terragest\src\core\hooks\register-hooks.ts:48 "WORKFLOW REAPPROVISIONNEMENT"
C:\Users\Admin\terragest\src\core\jobs\job-worker.ts:22 type: "workflow",
C:\Users\Admin\terragest\src\core\jobs\job-worker.ts:40 type: "workflow",
C:\Users\Admin\terragest\src\core\layout\Sidebar.tsx:11 ["Interventions", "/interventions/workflow"],
C:\Users\Admin\terragest\src\core\metrics\metrics-engine.ts:10 workflowExecutions: number;
C:\Users\Admin\terragest\src\core\metrics\metrics-engine.ts:25 workflowExecutions: 0,
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:17 workflow?: boolean;
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:132 workflow:
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:134 module.metadata.features?.workflows
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:2 workflows?: boolean;
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:35 workflows: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:60 workflows: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:83 workflows: true,
C:\Users\Admin\terragest\src\core\navigation\navigation-builder.ts:17 label: "Workflows",
C:\Users\Admin\terragest\src\core\navigation\navigation-builder.ts:18 href: "/workflows",
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:16 | "workflow"
C:\Users\Admin\terragest\src\core\retry\retry-engine.ts:61 type: "workflow",
C:\Users\Admin\terragest\src\core\router\worker-router.ts:51 return "workflow";
C:\Users\Admin\terragest\src\core\router\worker-router.ts:81 type: "workflow",
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:33 type: "workflow",
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:37 "Workflow maintenance critique déclenché",
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:14 | "workflow"
C:\Users\Admin\terragest\src\core\schemas\exploitations.schema.ts:77 workflow: true,
C:\Users\Admin\terragest\src\core\schemas\materiels.schema.ts:69 workflow: true,
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:69 workflow: true,
C:\Users\Admin\terragest\src\core\schemas\types.ts:43 workflow?: boolean;
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:80 module: "workflows",
C:\Users\Admin\terragest\src\core\throttling\throttling-engine.ts:24 workflow: {
C:\Users\Admin\terragest\src\core\transitions\transition-engine.ts:57 type: "workflow",
C:\Users\Admin\terragest\src\core\worker-loop\worker-loop.ts:37 type: "workflow",
C:\Users\Admin\terragest\src\core\workers\analytics-worker.ts:15 type: "workflow",
C:\Users\Admin\terragest\src\core\workers\export-worker.ts:15 type: "workflow",
C:\Users\Admin\terragest\src\core\workers\maintenance-worker.ts:15 type: "workflow",
C:\Users\Admin\terragest\src\core\workers\register-workers.ts:6 executeWorkflowWorker,
C:\Users\Admin\terragest\src\core\workers\register-workers.ts:7 } from "@/core/workers/workflow-worker";
C:\Users\Admin\terragest\src\core\workers\register-workers.ts:26 type: "workflow",
C:\Users\Admin\terragest\src\core\workers\register-workers.ts:28 executeWorkflowWorker,
C:\Users\Admin\terragest\src\core\workers\worker-registry.ts:6 | "workflow"
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:13 export async function executeWorkflowWorker(
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:18 action: "workflow-worker",
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:19 type: "workflow",
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:24 `Workflow worker exécuté : ${job.name}`,
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:28 "workflowExecutions"
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:32 "WORKFLOW WORKER",
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:1 export type ERPWorkflowExecution = {
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:2 workflow: string;
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:11 export async function executeWorkflow(
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:12 workflow: ERPWorkflowExecution
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:15 "ERP WORKFLOW START",
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:16 workflow
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:20 ...workflow,
C:\Users\Admin\terragest\src\domains\contrats\store\ContratsStore.ts:18 workflow: string;
C:\Users\Admin\terragest\src\domains\contrats\store\ContratsStore.ts:57 workflow: string
C:\Users\Admin\terragest\src\domains\contrats\store\ContratsStore.ts:68 item.workflow =
C:\Users\Admin\terragest\src\domains\contrats\store\ContratsStore.ts:69 workflow;
C:\Users\Admin\terragest\src\domains\contrats\store\ContratsStore.ts:77 `Workflow `,
C:\Users\Admin\terragest\src\domains\interventions\store\InterventionsStore.ts:11 workflow: string;
C:\Users\Admin\terragest\src\domains\maintenance\services\MaintenanceWorkflowService.ts:1 // src/domains/maintenance/services/MaintenanceWorkflowService.ts
C:\Users\Admin\terragest\src\domains\maintenance\services\MaintenanceWorkflowService.ts:9 export class MaintenanceWorkflowService {
C:\Users\Admin\terragest\src\domains\maintenance\services\MaintenanceWorkflowService.ts:34 workflow:
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:18 workflow: string;
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:57 workflow: string
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:68 item.workflow =
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:69 workflow;
C:\Users\Admin\terragest\src\domains\maintenance\store\MaintenanceStore.ts:77 `Workflow `,
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:1 // src/domains/paiement/workflows/PaiementWorkflow.ts
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:3 import { WorkflowRegistry }
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:4 from "@/platform/workflows/registry/WorkflowRegistry";
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:6 import { WorkflowState }
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:7 from "@/platform/workflows/states/WorkflowState";
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:9 export function registerPaiementWorkflow() {
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:11 WorkflowRegistry.register(
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:20 WorkflowState.DRAFT,
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:23 WorkflowState.VALIDATED
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:29 WorkflowState.VALIDATED,
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:32 WorkflowState.APPROVED
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:38 WorkflowState.APPROVED,
C:\Users\Admin\terragest\src\domains\paiement\workflows\PaiementWorkflow.ts:41 WorkflowState.COMPLETED
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:20 workflow: string;
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:64 workflow: string
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:75 item.workflow =
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:76 workflow;
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:84 `Workflow ${workflow}`,
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:92 "[STOCK WORKFLOW]",
C:\Users\Admin\terragest\src\domains\stock\store\StockStore.ts:93 workflow
C:\Users\Admin\terragest\src\features\achats\achats.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\analytics\services\DashboardAnalyticsService.ts:9 totalWorkflows: 0,
C:\Users\Admin\terragest\src\features\billing\types\FeatureFlags.ts:23 WORKFLOW: [
C:\Users\Admin\terragest\src\features\clients\clients.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\commandes\commandes.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\depenses\depenses.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\devis\devis.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\employes\employes.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\exploitations\exploitations.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\factures\factures.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\fournisseurs\fournisseurs.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\incidents\incidents.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\interventions\interventions.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\interventions\types\Intervention.ts:1 import { WorkflowStatus } from "@/features/workflow/types/WorkflowStatus";
C:\Users\Admin\terragest\src\features\interventions\types\Intervention.ts:13 status: WorkflowStatus;
C:\Users\Admin\terragest\src\features\interventions\workflows\BreakdownInterventionWorkflow.ts:4 export class BreakdownInterventionWorkflow {
C:\Users\Admin\terragest\src\features\intrants\intrants.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\livraisons\livraisons.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\materiels\materiels.feature.ts:16 "workflow",
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:22 WorkflowExecutor
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:24 from "@/runtime/workflows/engine/WorkflowExecutor";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:27 CreateMaterielWorkflow
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:29 from "../workflows/definitions/CreateMaterielWorkflow";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:83 private workflowExecutor =
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:84 new WorkflowExecutor();
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:123 await this.workflowExecutor.execute(
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:124 CreateMaterielWorkflow,
C:\Users\Admin\terragest\src\features\materiels\workflows\MaterielMaintenanceWorkflow.ts:1 export class MaterielMaintenanceWorkflow {
C:\Users\Admin\terragest\src\features\materiels\workflows\MaterielMaintenanceWorkflow.ts:6 "Materiel maintenance workflow"
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:2 WorkflowDefinition
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:4 from "@/runtime/workflows/types/WorkflowDefinition";
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:7 CreateMaterielWorkflow:
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:8 WorkflowDefinition = {
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:11 "CREATE_MATERIEL_WORKFLOW",
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:14 "Create Materiel Workflow",
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:30 "[Workflow] Validate Materiel",
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:48 "[Workflow] Register Runtime Event",
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:66 "[Workflow] Supervision",
C:\Users\Admin\terragest\src\features\materiels\workflows\definitions\CreateMaterielWorkflow.ts:84 "[Workflow] Notification",
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\observability\services\RuntimeObservabilityService.ts:12 workflows: 0,
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:14 workflowExecutionStore
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:16 from "../../stores/workflows/workflowExecutionStore";
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:19 WorkflowExecutionRealtimeService {
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:28 "runtime_workflow_executions"
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:54 workflowId:
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:56 data.workflowId
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:83 workflowExecutionStore.replaceAll(
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:2 WorkflowExecution
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:4 from "@/runtime/workflows/types/WorkflowExecution";
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:6 class WorkflowExecutionStore {
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:9 WorkflowExecution[] = [];
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:18 WorkflowExecution
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:30 WorkflowExecution[]
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:70 workflowExecutionStore =
C:\Users\Admin\terragest\src\features\observability\stores\workflows\workflowExecutionStore.ts:71 new WorkflowExecutionStore();
C:\Users\Admin\terragest\src\features\observability\types\RuntimeHealth.ts:7 workflows: number;
C:\Users\Admin\terragest\src\features\observability\widgets\DeadLetterPanel.tsx:20 Failed workflows will appear here.
C:\Users\Admin\terragest\src\features\observability\widgets\live\WorkflowExecutionPanel.tsx:2 WorkflowExecutionPanel() {
C:\Users\Admin\terragest\src\features\observability\widgets\live\WorkflowExecutionPanel.tsx:21 Workflow Executions
C:\Users\Admin\terragest\src\features\observability\widgets\live\WorkflowExecutionPanel.tsx:25 Live workflow executions
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:10 workflowExecutionStore
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:12 from "../../stores/workflows/workflowExecutionStore";
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:15 WorkflowExecutionRealtimeService
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:17 from "../../services/workflows/WorkflowExecutionRealtimeService";
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:19 export default function WorkflowExecutionMonitor() {
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:24 new WorkflowExecutionRealtimeService();
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:38 workflowExecutionStore.subscribe.bind(
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:39 workflowExecutionStore
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:42 workflowExecutionStore.getAll.bind(
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:43 workflowExecutionStore
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:46 workflowExecutionStore.getAll.bind(
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:47 workflowExecutionStore
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:69 Workflow Executions
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:79 Aucun workflow exécuté.
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:99 `${execution.workflowId}-${execution.startedAt}-${index}`
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:114 execution.workflowId
C:\Users\Admin\terragest\src\features\parcelles\parcelles.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\platform\components\navigation\EnterpriseSidebar.tsx:12 "Workflows",
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeMetricsPanel.tsx:50 Workflows : 1
C:\Users\Admin\terragest\src\features\platform\components\runtime\WorkflowStatusPanel.tsx:2 WorkflowStatusPanel() {
C:\Users\Admin\terragest\src\features\platform\components\runtime\WorkflowStatusPanel.tsx:21 Workflow Status
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:4 import WorkflowStatusPanel
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:5 from "../components/runtime/WorkflowStatusPanel";
C:\Users\Admin\terragest\src\features\platform\dashboards\ConnectedRuntimeDashboard.tsx:29 <WorkflowStatusPanel />
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:4 import WorkflowStatusPanel
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:5 from "../components/runtime/WorkflowStatusPanel";
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:29 <WorkflowStatusPanel />
C:\Users\Admin\terragest\src\features\produits\produits.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\recettes\recettes.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\recoltes\recoltes.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\stocks\stocks.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\taches\taches.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\terrains\terrains.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\vehicules\vehicules.feature.ts:27 "workflow",
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:1 import { WorkflowStatus } from "@/features/workflow/types/WorkflowStatus";
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:3 interface WorkflowActionsProps {
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:5 status: WorkflowStatus | string;
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:8 status: WorkflowStatus
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:12 export const WorkflowActions = ({
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:15 }: WorkflowActionsProps) => {
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:22 WorkflowStatus.BROUILLON && (
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:27 WorkflowStatus.VALIDE
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:44 WorkflowStatus.VALIDE && (
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:49 WorkflowStatus.EN_COURS
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:66 WorkflowStatus.EN_COURS && (
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:71 WorkflowStatus.TERMINE
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:88 WorkflowStatus.REJETE &&
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:91 WorkflowStatus.TERMINE && (
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowActions.tsx:96 WorkflowStatus.REJETE
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:1 import { WorkflowStatus } from "@/features/workflow/types/WorkflowStatus";
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:3 interface WorkflowStatusBadgeProps {
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:5 status: WorkflowStatus | string;
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:8 export const WorkflowStatusBadge = ({
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:10 }: WorkflowStatusBadgeProps) => {
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:16 case WorkflowStatus.BROUILLON:
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:19 case WorkflowStatus.VALIDE:
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:22 case WorkflowStatus.EN_COURS:
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:25 case WorkflowStatus.TERMINE:
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:28 case WorkflowStatus.REJETE:
C:\Users\Admin\terragest\src\features\workflow\components\WorkflowStatusBadge.tsx:31 case WorkflowStatus.ANNULE:
C:\Users\Admin\terragest\src\features\workflow\types\WorkflowHistory.ts:1 export interface WorkflowHistory {
C:\Users\Admin\terragest\src\features\workflow\types\WorkflowStatus.ts:1 export enum WorkflowStatus {
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:1 interface WorkflowCardProps {
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:3 workflow: any;
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:6 export const WorkflowCard = ({
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:7 workflow,
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:8 }: WorkflowCardProps) => {
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:30 Workflow
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:38 {workflow.nom}
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:60 {workflow.description}
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowCard.tsx:72 {workflow.steps?.length || 0}
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:3 import { WorkflowCard } from "@/features/workflow-engine/components/WorkflowCard";
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:5 const workflows = [
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:10 nom: "Purchase Workflow",
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:25 nom: "Maintenance Workflow",
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:39 nom: "Security Alert Workflow",
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:53 export const WorkflowDashboard = () => {
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:68 Workflow Orchestration
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:88 {workflows.map(
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:89 (workflow) => (
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:91 <WorkflowCard
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:92 key={workflow.id}
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:93 workflow={workflow}
C:\Users\Admin\terragest\src\features\workflow-engine\services\ProcessOrchestrator.ts:1 import { EventBus } from "@/features/workflow-engine/services/EventBus";
C:\Users\Admin\terragest\src\features\workflow-engine\services\ProcessOrchestrator.ts:14 "Trigger purchase workflow",
C:\Users\Admin\terragest\src\features\workflow-engine\services\ProcessOrchestrator.ts:27 "Trigger maintenance workflow",
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowAnalytics.ts:1 export const WorkflowAnalytics = {
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowEngine.ts:1 export const WorkflowEngine = {
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowEngine.ts:4 workflow: any,
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowEngine.ts:9 "Executing workflow",
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowEngine.ts:10 workflow.nom
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowEngine.ts:17 of workflow.steps
C:\Users\Admin\terragest\src\features\workflow-engine\services\WorkflowEngine.ts:30 "Workflow step",
C:\Users\Admin\terragest\src\features\workflow-engine\types\WorkflowDefinition.ts:1 export interface WorkflowDefinition {
C:\Users\Admin\terragest\src\features\workflow-engine\types\WorkflowDefinition.ts:13 steps: WorkflowStep[];
C:\Users\Admin\terragest\src\features\workflow-engine\types\WorkflowDefinition.ts:18 export interface WorkflowStep {
C:\Users\Admin\terragest\src\features\workflow-engine\types\WorkflowExecution.ts:1 export interface WorkflowExecution {
C:\Users\Admin\terragest\src\features\workflow-engine\types\WorkflowExecution.ts:5 workflowId: string;
C:\Users\Admin\terragest\src\platform\bootstrap\loadDomains.ts:18 "@/domains/paiement/workflows/PaiementWorkflow"
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:59 if (module.metadata.features?.workflows) {
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:60 capabilities.push("workflow");
C:\Users\Admin\terragest\src\platform\execution\WorkflowScheduler.ts:1 // src/platform/execution/WorkflowScheduler.ts
C:\Users\Admin\terragest\src\platform\execution\WorkflowScheduler.ts:3 import { WorkflowExecutor }
C:\Users\Admin\terragest\src\platform\execution\WorkflowScheduler.ts:4 from "@/platform/execution/executors/WorkflowExecutor";
C:\Users\Admin\terragest\src\platform\execution\WorkflowScheduler.ts:6 export class WorkflowScheduler {
C:\Users\Admin\terragest\src\platform\execution\WorkflowScheduler.ts:17 await WorkflowExecutor
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:1 // src/platform/execution/executors/WorkflowExecutor.ts
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:3 import { WorkflowQueue }
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:4 from "@/platform/execution/queue/WorkflowQueue";
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:6 import { WorkflowThrottler }
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:7 from "@/platform/throttling/WorkflowThrottler";
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:24 const workflowCircuitBreaker =
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:27 export class WorkflowExecutor {
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:32 !WorkflowThrottler.canExecute()
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:43 WorkflowQueue.dequeue();
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:56 job.workflow
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:62 workflow: job.workflow,
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:70 "workflow.denied",
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:77 WorkflowThrottler
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:83 "workflow.started",
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:87 await workflowCircuitBreaker.execute(
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:103 workflow: job.workflow,
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:113 "workflow.finished",
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:117 WorkflowThrottler
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:1 // src/platform/execution/queue/WorkflowQueue.ts
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:3 export interface WorkflowJob {
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:7 workflow: string;
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:14 class WorkflowQueueManager {
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:17 WorkflowJob[] = [];
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:20 job: WorkflowJob
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:25 job.workflow
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:48 export const WorkflowQueue =
C:\Users\Admin\terragest\src\platform\execution\queue\WorkflowQueue.ts:49 new WorkflowQueueManager();
C:\Users\Admin\terragest\src\platform\intelligence\AutoHealingService.ts:18 job.workflow
C:\Users\Admin\terragest\src\platform\intelligence\WorkflowScoringEngine.ts:1 // src/platform/intelligence/WorkflowScoringEngine.ts
C:\Users\Admin\terragest\src\platform\intelligence\WorkflowScoringEngine.ts:3 export class WorkflowScoringEngine {
C:\Users\Admin\terragest\src\platform\intelligence\WorkflowScoringEngine.ts:6 workflow: string
C:\Users\Admin\terragest\src\platform\intelligence\WorkflowScoringEngine.ts:10 workflow.includes(
C:\Users\Admin\terragest\src\platform\intelligence\WorkflowScoringEngine.ts:19 workflow.includes(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:17 import { WorkflowRuntime }
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:18 from "@/platform/workflows/runtime/WorkflowRuntime";
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:20 import { WorkflowState }
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:21 from "@/platform/workflows/states/WorkflowState";
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:23 import { WorkflowStateStore }
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:24 from "@/platform/workflows/store/WorkflowStateStore";
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:78 WorkflowState.DRAFT;
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:83 WorkflowStateStore.setState(
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:90 WorkflowStateStore.addHistory({
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:118 workflowState:
C:\Users\Admin\terragest\src\platform\orchestration\ERPOrchestrator.ts:3 import { initializeERPWorkflows }
C:\Users\Admin\terragest\src\platform\orchestration\ERPOrchestrator.ts:4 from "@/platform/workflows/ERPWorkflow";
C:\Users\Admin\terragest\src\platform\orchestration\ERPOrchestrator.ts:7 from "@/platform/workflows/ERPNotifications";
C:\Users\Admin\terragest\src\platform\orchestration\ERPOrchestrator.ts:10 from "@/platform/workflows/ERPAudit";
C:\Users\Admin\terragest\src\platform\orchestration\ERPOrchestrator.ts:23 initializeERPWorkflows();
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:3 import { WorkflowQueue }
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:4 from "@/platform/execution/queue/WorkflowQueue";
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:18 WorkflowQueue.getJobs()
C:\Users\Admin\terragest\src\platform\persistence\RuntimeSnapshotStore.ts:4 WorkflowJob
C:\Users\Admin\terragest\src\platform\persistence\RuntimeSnapshotStore.ts:6 from "@/platform/execution/queue/WorkflowQueue";
C:\Users\Admin\terragest\src\platform\persistence\RuntimeSnapshotStore.ts:12 jobs: WorkflowJob[];
C:\Users\Admin\terragest\src\platform\registry\FeatureDefinition.ts:4 | "workflow"
C:\Users\Admin\terragest\src\platform\resilience\DeadLetterQueue.ts:5 workflow: string;
C:\Users\Admin\terragest\src\platform\resilience\DeadLetterQueue.ts:22 job.workflow,
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:4 WorkflowJob
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:6 from "@/platform/execution/queue/WorkflowQueue";
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:11 Record<string, WorkflowJob[]>
C:\Users\Admin\terragest\src\platform\scheduling\DomainQueues.ts:16 job: WorkflowJob
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowPriority.ts:1 // src/platform/scheduling/WorkflowPriority.ts
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowPriority.ts:3 export enum WorkflowPriority {
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:1 // src/platform/scheduling/WorkflowSchedulerPolicy.ts
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:3 import { WorkflowPriority }
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:4 from "@/platform/scheduling/WorkflowPriority";
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:6 export class WorkflowSchedulerPolicy {
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:9 workflow: string
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:13 workflow.includes(
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:18 return WorkflowPriority
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:23 workflow.includes(
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:28 return WorkflowPriority
C:\Users\Admin\terragest\src\platform\scheduling\WorkflowSchedulerPolicy.ts:32 return WorkflowPriority
C:\Users\Admin\terragest\src\platform\security\ExecutionPolicy.ts:9 workflow: string;
C:\Users\Admin\terragest\src\platform\security\ExecutionPolicy.ts:26 context.workflow.includes(
C:\Users\Admin\terragest\src\platform\security\ExecutionPolicy.ts:32 "[SECURITY] critical workflow denied"
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:23 "workflow",
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:32 "workflow",
C:\Users\Admin\terragest\src\platform\throttling\WorkflowThrottler.ts:1 // src/platform/throttling/WorkflowThrottler.ts
C:\Users\Admin\terragest\src\platform\throttling\WorkflowThrottler.ts:3 class WorkflowThrottlerManager {
C:\Users\Admin\terragest\src\platform\throttling\WorkflowThrottler.ts:55 export const WorkflowThrottler =
C:\Users\Admin\terragest\src\platform\throttling\WorkflowThrottler.ts:56 new WorkflowThrottlerManager();
C:\Users\Admin\terragest\src\platform\workers\ERPWorker.ts:3 import { WorkflowExecutor }
C:\Users\Admin\terragest\src\platform\workers\ERPWorker.ts:4 from "@/platform/execution/executors/WorkflowExecutor";
C:\Users\Admin\terragest\src\platform\workers\ERPWorker.ts:23 await WorkflowExecutor
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:1 // src/platform/workflows/ERPAudit.ts
C:\Users\Admin\terragest\src\platform\workflows\ERPNotifications.ts:1 // src/platform/workflows/ERPNotifications.ts
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:1 // src/platform/workflows/ERPWorkflow.ts
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:6 export function initializeERPWorkflows() {
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:13 "[WORKFLOW] stock.created",
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:24 "[WORKFLOW] intervention.created",
C:\Users\Admin\terragest\src\platform\workflows\ERPWorkflow.ts:35 "[WORKFLOW] paiement.created",
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:1 // src/platform/workflows/history/WorkflowHistoryEntry.ts
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:3 import { WorkflowState }
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:4 from "@/platform/workflows/states/WorkflowState";
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:6 export interface WorkflowHistoryEntry {
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:12 from?: WorkflowState;
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:14 to: WorkflowState;
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:1 // src/platform/workflows/registry/WorkflowRegistry.ts
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:6 from "@/platform/workflows/states/StateTransition";
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:8 class WorkflowRegistryManager {
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:27 "[WORKFLOW REGISTERED]",
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:44 export const WorkflowRegistry =
C:\Users\Admin\terragest\src\platform\workflows\registry\WorkflowRegistry.ts:45 new WorkflowRegistryManager();
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:1 // src/platform/workflows/runtime/WorkflowRuntime.ts
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:3 import { WorkflowState }
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:4 from "@/platform/workflows/states/WorkflowState";
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:6 import { WorkflowRegistry }
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:7 from "@/platform/workflows/registry/WorkflowRegistry";
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:9 export class WorkflowRuntime {
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:15 from: WorkflowState,
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:17 to: WorkflowState
C:\Users\Admin\terragest\src\platform\workflows\runtime\WorkflowRuntime.ts:21 WorkflowRegistry
C:\Users\Admin\terragest\src\platform\workflows\states\StateTransition.ts:1 // src/platform/workflows/states/StateTransition.ts
C:\Users\Admin\terragest\src\platform\workflows\states\StateTransition.ts:3 import { WorkflowState }
C:\Users\Admin\terragest\src\platform\workflows\states\StateTransition.ts:4 from "@/platform/workflows/states/WorkflowState";
C:\Users\Admin\terragest\src\platform\workflows\states\StateTransition.ts:9 WorkflowState;
C:\Users\Admin\terragest\src\platform\workflows\states\StateTransition.ts:12 WorkflowState;
C:\Users\Admin\terragest\src\platform\workflows\states\WorkflowState.ts:1 // src/platform/workflows/states/WorkflowState.ts
C:\Users\Admin\terragest\src\platform\workflows\states\WorkflowState.ts:3 export enum WorkflowState {
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:1 // src/platform/workflows/store/WorkflowStateStore.ts
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:3 import { WorkflowState }
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:4 from "@/platform/workflows/states/WorkflowState";
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:7 WorkflowHistoryEntry
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:9 from "@/platform/workflows/history/WorkflowHistoryEntry";
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:11 class WorkflowStateStoreManager {
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:14 Record<string, WorkflowState>
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:18 WorkflowHistoryEntry[] = [];
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:24 state: WorkflowState
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:42 entry: WorkflowHistoryEntry
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:50 "[WORKFLOW HISTORY]",
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:69 export const WorkflowStateStore =
C:\Users\Admin\terragest\src\platform\workflows\store\WorkflowStateStore.ts:70 new WorkflowStateStoreManager();
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:1 // src/platform/workflows/supervision/WorkflowSupervision.ts
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:3 import { WorkflowStateStore }
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:4 from "@/platform/workflows/store/WorkflowStateStore";
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:6 class WorkflowSupervisionManager {
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:13 WorkflowStateStore
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:19 "[WORKFLOW STATE]",
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:26 export const WorkflowSupervision =
C:\Users\Admin\terragest\src\platform\workflows\supervision\WorkflowSupervision.ts:27 new WorkflowSupervisionManager();
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:1 // src/platform/workflows/timeline/WorkflowTimeline.ts
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:4 WorkflowTimelineEntry
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:6 from "@/platform/workflows/timeline/WorkflowTimelineEntry";
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:8 class WorkflowTimelineManager {
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:11 WorkflowTimelineEntry[] = [];
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:14 entry: WorkflowTimelineEntry
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:40 export const WorkflowTimeline =
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimeline.ts:41 new WorkflowTimelineManager();
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimelineEntry.ts:1 // src/platform/workflows/timeline/WorkflowTimelineEntry.ts
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimelineEntry.ts:3 export interface WorkflowTimelineEntry {
C:\Users\Admin\terragest\src\runtime\production.ts:117 maxWorkflowExecutionsPerDay: 5000,
C:\Users\Admin\terragest\src\runtime\actions\ERPAction.ts:8 | "workflow"
C:\Users\Admin\terragest\src\runtime\actions\ERPActionExecutor.ts:17 case "workflow":
C:\Users\Admin\terragest\src\runtime\actions\ERPActionExecutor.ts:18 toast.success("Ouverture du workflow");
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:45 key: "workflows",
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:46 label: "Workflows",
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:47 href: `${basePath}/workflows`,
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:31 type: "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:34 actor: "workflow-engine",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:60 // WORKFLOW CHECK
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:65 "workflow-monitoring",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:68 "Workflow Monitoring",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:80 "Running workflow monitoring..."
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:90 "workflow",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:93 "Surveillance workflows",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:96 "Contrôle automatique des workflows effectué.",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:19 trigger: "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:21 description: "Notification workflow maintenance.",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:35 trigger: "WORKFLOW_COMPLETED",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:8 | "WORKFLOW"
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:47 "[AUTOMATION] Maintenance workflow triggered",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:14 { type: "workflow", label: "Declencher workflow reapprovisionnement" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:31 key: "workflow-blocked-escalation",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:33 label: "Relance workflow bloque",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:34 description: "Relance automatiquement les workflows bloques.",
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:36 trigger: { type: "workflow_blocked" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:72 trigger: { type: "workflow_blocked" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:87 { type: "workflow", label: "Lancer workflow maintenance" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:108 trigger: { type: "workflow_blocked" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:47 if (rule.trigger.type === "workflow_blocked") {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:48 return payload.workflowBlocked === true;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:3 | "workflow_blocked"
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:25 | "workflow"
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:4 import { WorkflowRegistry }
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:5 from "../registry/WorkflowRegistry";
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:22 import { WorkflowSupervisor }
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:23 from "../supervision/WorkflowSupervisor";
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:25 import { registerMaterielWorkflows }
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:26 from "./registerMaterielWorkflows";
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:41 const workflowRegistry =
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:42 new WorkflowRegistry();
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:60 new WorkflowSupervisor();
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:62 registerMaterielWorkflows(
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:63 workflowRegistry
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapEnterpriseRuntime.ts:78 workflowRegistry,
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapRuntime.ts:1 import { WorkflowRegistry }
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapRuntime.ts:2 from "../registry/WorkflowRegistry";
C:\Users\Admin\terragest\src\runtime\bootstrap\bootstrapRuntime.ts:11 new WorkflowRegistry();
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:1 import { WorkflowRegistry }
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:2 from "../registry/WorkflowRegistry";
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:8 registerMaterielWorkflows
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:10 from "./registerMaterielWorkflows";
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:21 new WorkflowRegistry();
C:\Users\Admin\terragest\src\runtime\bootstrap\initializeRuntime.ts:26 registerMaterielWorkflows(
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:1 import { WorkflowRegistry }
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:2 from "../registry/WorkflowRegistry";
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:4 import { MaterielMaintenanceWorkflow }
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:5 from "../../features/materiels/workflows/MaterielMaintenanceWorkflow";
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:8 registerMaterielWorkflows(
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:9 registry: WorkflowRegistry
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:14 new MaterielMaintenanceWorkflow()
C:\Users\Admin\terragest\src\runtime\bootstrap\registerMaterielWorkflows.ts:18 "[Runtime] materiel workflows registered"
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:17 workflowRegistry:
C:\Users\Admin\terragest\src\runtime\bootstrap\runtimeHealthCheck.ts:18 !!runtime.workflowRegistry,
C:\Users\Admin\terragest\src\runtime\cockpit\ERPCockpitSnapshot.ts:10 workflowsCount: modules.reduce((total, module) => total + module.workflows.length, 0),
C:\Users\Admin\terragest\src\runtime\core\RuntimeBindings.ts:7 workflows: string[];
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:19 | "workflow"
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:36 workflows: string[];
C:\Users\Admin\terragest\src\runtime\core\RuntimeExecutionRegistry.ts:7 workflow: string;
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:15 workflows:
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:16 module.workflows,
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:23 executeWorkflow(
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:25 workflow: string,
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:35 workflow,
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:42 name: "workflow.started",
C:\Users\Admin\terragest\src\runtime\core\RuntimeOrchestrator.ts:45 workflow,
C:\Users\Admin\terragest\src\runtime\core\RuntimePipeline.ts:4 "workflow",
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:19 "Registered workflows:",
C:\Users\Admin\terragest\src\runtime\core\RuntimeSupervisor.ts:24 module.workflows
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:5 export class RuntimeWorkflowRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:6 private workflows =
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:14 const [moduleId, workflows]
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:16 CoreModuleRuntimeAdapter.toRuntimeWorkflows()
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:19 this.workflows.set(
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:21 workflows
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:26 getModuleWorkflows(
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:29 return this.workflows.get(
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:34 getAllWorkflows() {
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:36 this.workflows.entries()
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:41 export const runtimeWorkflowRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:42 new RuntimeWorkflowRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:44 runtimeWorkflowRegistry.initialize();
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:15 | "workflow"
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:94 category: "workflow",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:205 category: "workflow",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:292 category: "workflow",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:21 name: "Workflow Runtime",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:6 | "workflow"
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:23 { key: "workflow", label: "Workflow runtime", completed: true },
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:28 static simulateWorkflowCompleted() {
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:30 name: "workflow.completed",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:34 workflowId: "WF-001",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptions.ts:25 id: "workflow-completed-to-audit",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptions.ts:27 eventName: "workflow.completed",
C:\Users\Admin\terragest\src\runtime\events\ERPDomainEvent.ts:5 | "WORKFLOW_STARTED"
C:\Users\Admin\terragest\src\runtime\events\ERPDomainEvent.ts:6 | "WORKFLOW_COMPLETED"
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:46 // WORKFLOWS
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:49 WORKFLOW_STARTED:
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:50 "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:52 WORKFLOW_COMPLETED:
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:53 "WORKFLOW_COMPLETED",
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:55 WORKFLOW_FAILED:
C:\Users\Admin\terragest\src\runtime\events\RuntimeEventRegistry.ts:56 "WORKFLOW_FAILED",
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:2 WorkflowRepository
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:4 from "../persistence/workflows/WorkflowRepository";
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:7 PersistentWorkflowExecutor {
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:10 new WorkflowRepository();
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:13 workflow: string,
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:18 workflow,
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:23 "[PersistentWorkflow]",
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:24 workflow
C:\Users\Admin\terragest\src\runtime\execution\RuntimeExecutor.ts:4 workflow: string
C:\Users\Admin\terragest\src\runtime\execution\RuntimeExecutor.ts:9 workflow
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:1 export interface ERPGeneratedWorkflow {
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:8 export class ERPWorkflowGenerationEngine {
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:10 generateWorkflow(
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:12 ): ERPGeneratedWorkflow {
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:28 export const erpWorkflowGenerationEngine =
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:29 new ERPWorkflowGenerationEngine();
C:\Users\Admin\terragest\src\runtime\generation\index.ts:7 export * from "./ERPWorkflowGenerationEngine";
C:\Users\Admin\terragest\src\runtime\governance\EnterpriseGovernanceEngine.ts:67 "WorkflowExecutor"
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataGenerationBridge.ts:10 erpWorkflowGenerationEngine,
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataGenerationBridge.ts:55 workflow:
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataGenerationBridge.ts:56 erpWorkflowGenerationEngine.generateWorkflow(
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:21 export interface ERPModuleWorkflow {
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:77 workflows?: ERPModuleWorkflow[];
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:30 | "workflow"
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:33 workflow?: string;
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:53 workflows?: string[];
C:\Users\Admin\terragest\src\runtime\modules\index.ts:5 ERPModuleWorkflow,
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:54 "workflow",
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:67 workflows:
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:68 module.workflows?.map(
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:69 (workflow) => workflow.key
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:80 module.workflows?.flatMap(
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:81 (workflow) => workflow.states ?? []
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:127 workflows:
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:128 module.workflows?.map(
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:129 (workflow) => workflow.key
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:145 module.workflows?.flatMap(
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:146 (workflow) => workflow.states ?? []
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:152 static toRuntimeWorkflows() {
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:156 module.workflows?.map(
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:157 (workflow) => workflow.key
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:69 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:104 workflows: [
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:133 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:175 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:216 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:258 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:299 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:436 workflows: [
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:466 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:502 workflows: [
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:532 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:582 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:623 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:664 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:705 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:746 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:787 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:828 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:869 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:910 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:951 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:992 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1033 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1074 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:53 workflows: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:130 workflows: [
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:29 workflows?: boolean;
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:4 import { ERPWorkflowExecutionStore } from "@/runtime/workflows/enterprise";
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:22 workflows: ERPWorkflowExecutionStore.all().length,
C:\Users\Admin\terragest\src\runtime\monitoring\simulateRuntimeActivity.ts:18 "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\monitoring\simulateRuntimeActivity.ts:20 workflow:
C:\Users\Admin\terragest\src\runtime\monitoring\WorkflowAnalytics.ts:1 export const WorkflowAnalytics = {
C:\Users\Admin\terragest\src\runtime\monitoring\metrics\ERPMonitoringMetrics.ts:5 workflows: number;
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:26 { id: "workflows", label: "Workflows", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:39 { from: "automation", to: "workflows", label: "orchestrates" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:40 { from: "workflows", to: "queue", label: "async jobs" },
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:34 type: "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:37 actor: "workflow-engine",
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:7 BreakdownInterventionWorkflow
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:9 from "../../features/interventions/workflows/BreakdownInterventionWorkflow";
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:20 import { WorkflowSupervisor }
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:21 from "../supervision/WorkflowSupervisor";
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:26 private workflow =
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:27 new BreakdownInterventionWorkflow();
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:39 new WorkflowSupervisor();
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:55 await this.workflow.execute(
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:7 PersistentWorkflowExecutor
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:9 from "../execution/PersistentWorkflowExecutor";
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:32 private workflow =
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:33 new PersistentWorkflowExecutor();
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:53 await this.workflow.execute(
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:54 "BreakdownInterventionWorkflow",
C:\Users\Admin\terragest\src\runtime\orchestration\WorkflowDispatcher.ts:1 export class WorkflowDispatcher {
C:\Users\Admin\terragest\src\runtime\orchestration\WorkflowDispatcher.ts:4 workflow: string
C:\Users\Admin\terragest\src\runtime\orchestration\WorkflowDispatcher.ts:8 "[WorkflowDispatcher]",
C:\Users\Admin\terragest\src\runtime\orchestration\WorkflowDispatcher.ts:9 workflow
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:21 action: "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:32 await ERPRuntimePersistenceService.workflows.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:33 workflowKey: "maintenance-critical-flow",
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:10 workflows,
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:18 ERPRuntimePersistenceService.workflows.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:28 workflows,
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:36 workflows.length +
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPPersistenceCollections.ts:5 workflows: "runtime_workflows",
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:25 workflows:
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:27 ERPPersistenceCollections.workflows
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:10 export class WorkflowRepository {
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:13 workflow: unknown
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:19 "runtime_workflows"
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:22 workflow,
C:\Users\Admin\terragest\src\runtime\policies\generated\achats\achats.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\clients\clients.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\commandes\commandes.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\depenses\depenses.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\devis\devis.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\employes\employes.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\factures\factures.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\fournisseurs\fournisseurs.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\incidents\incidents.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\intrants\intrants.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\livraisons\livraisons.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\parcelles\parcelles.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\recettes\recettes.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\recoltes\recoltes.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\taches\taches.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\policies\generated\vehicules\vehicules.policy.ts:12 "workflow"
C:\Users\Admin\terragest\src\runtime\production\limits\ERPRateLimitRegistry.ts:11 key: "workflow-tenant-hour",
C:\Users\Admin\terragest\src\runtime\production\quotas\ERPTenantQuota.ts:6 maxWorkflowExecutionsPerDay: number;
C:\Users\Admin\terragest\src\runtime\production\quotas\ERPTenantQuotaRegistry.ts:9 maxWorkflowExecutionsPerDay: 5000,
C:\Users\Admin\terragest\src\runtime\production\quotas\ERPTenantQuotaRegistry.ts:17 maxWorkflowExecutionsPerDay: 1000,
C:\Users\Admin\terragest\src\runtime\production\quotas\ERPTenantQuotaRegistry.ts:25 maxWorkflowExecutionsPerDay: 200,
C:\Users\Admin\terragest\src\runtime\quality\checks\WorkflowConsistencyCheck.ts:2 WorkflowConsistencyCheck {
C:\Users\Admin\terragest\src\runtime\quality\checks\WorkflowConsistencyCheck.ts:7 "[Quality] workflow consistency verified"
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:22 WorkflowConsistencyCheck
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:24 from "../checks/WorkflowConsistencyCheck";
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:41 private workflows =
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:42 new WorkflowConsistencyCheck();
C:\Users\Admin\terragest\src\runtime\quality\gates\QualityGateEngine.ts:54 this.workflows.verify();
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:53 channel: "workflows",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:55 title: "Workflow en cours",
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:18 "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:20 workflow:
C:\Users\Admin\terragest\src\runtime\realtime\channels\ERPRealtimeChannel.ts:3 | "workflows"
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:19 workflows: ERPRealtimeBus.byChannel("workflows").length,
C:\Users\Admin\terragest\src\runtime\realtime\streams\LiveWorkflowUpdates.ts:2 LiveWorkflowUpdates {
C:\Users\Admin\terragest\src\runtime\realtime\streams\LiveWorkflowUpdates.ts:5 workflow: string
C:\Users\Admin\terragest\src\runtime\realtime\streams\LiveWorkflowUpdates.ts:9 "[Workflow Update]",
C:\Users\Admin\terragest\src\runtime\realtime\streams\LiveWorkflowUpdates.ts:10 workflow
C:\Users\Admin\terragest\src\runtime\registry\ERPRegistry.ts:55 workflows(
C:\Users\Admin\terragest\src\runtime\registry\ERPRegistry.ts:61 ?.workflows ?? []
C:\Users\Admin\terragest\src\runtime\registry\types.ts:20 export type ERPRegistryWorkflow = {
C:\Users\Admin\terragest\src\runtime\registry\types.ts:56 workflows: ERPRegistryWorkflow[];
C:\Users\Admin\terragest\src\runtime\registry\WorkflowRegistry.ts:1 export class WorkflowRegistry {
C:\Users\Admin\terragest\src\runtime\registry\WorkflowRegistry.ts:3 private workflows =
C:\Users\Admin\terragest\src\runtime\registry\WorkflowRegistry.ts:8 workflow: unknown
C:\Users\Admin\terragest\src\runtime\registry\WorkflowRegistry.ts:11 this.workflows.set(
C:\Users\Admin\terragest\src\runtime\registry\WorkflowRegistry.ts:13 workflow
C:\Users\Admin\terragest\src\runtime\registry\WorkflowRegistry.ts:19 return this.workflows.get(name);
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:86 workflows: [
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:89 label: "Workflow principal",
C:\Users\Admin\terragest\src\runtime\security-runtime\index.ts:9 export { RuntimeWorkflowGuard } from "./RuntimeWorkflowGuard";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:22 case "workflow":
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:23 return "workflow.start";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePermission.ts:8 | "workflow.start"
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePermission.ts:9 | "workflow.transition"
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePermission.ts:10 | "workflow.validate"
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:12 "workflow.start",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:13 "workflow.transition",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:14 "workflow.validate",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:25 "workflow.start",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:26 "workflow.transition",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:27 "workflow.validate",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:36 "workflow.start",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:37 "workflow.transition",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:4 export class RuntimeWorkflowGuard {
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:8 return RuntimePolicyEngine.can(user, "workflow.start");
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:14 return RuntimePolicyEngine.can(user, "workflow.transition");
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:20 return RuntimePolicyEngine.can(user, "workflow.validate");
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartRecommendationEngine.ts:26 actionLabel: "Lancer workflow",
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartScoringEngine.ts:29 "Score calcule a partir des signaux runtime, workflows, events et donnees metier.",
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartPriorityEngine.ts:17 value: "2 workflows ouverts",
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartRuntimeEngine.ts:14 "Verifier les workflows en attente.",
C:\Users\Admin\terragest\src\runtime\supervision\WorkflowSupervisor.ts:1 export class WorkflowSupervisor {
C:\Users\Admin\terragest\src\runtime\supervision\WorkflowSupervisor.ts:4 workflow: string
C:\Users\Admin\terragest\src\runtime\supervision\WorkflowSupervisor.ts:9 workflow
C:\Users\Admin\terragest\src\runtime\supervision\WorkflowSupervisor.ts:14 workflow: string,
C:\Users\Admin\terragest\src\runtime\supervision\WorkflowSupervisor.ts:20 workflow,
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:18 workflows: 24,
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:28 workflows: 8,
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:38 workflows: 1,
C:\Users\Admin\terragest\src\runtime\tenant\metrics\ERPTenantMetrics.ts:6 workflows: number;
C:\Users\Admin\terragest\src\runtime\testing\engine\ERPTestingTypes.ts:8 | "workflow"
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:9 id: "workflow_maintenance",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:10 label: "Workflow Maintenance",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:11 type: "workflow",
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:14 simulateWorkflow() {
C:\Users\Admin\terragest\src\runtime\ui\ERPUIComposition.ts:24 tabs: ["Vue generale", "Liste", "Activite", "Workflows", "Audit"],
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowHistoryEntry.ts:1 export interface WorkflowHistoryEntry {
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:12 WorkflowHistoryEntry,
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:14 from "@/runtime/workflow-persistence/WorkflowHistoryEntry";
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:16 export class WorkflowPersistenceEngine {
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:21 WorkflowHistoryEntry
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:29 "workflow_history"
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:2 WorkflowPersistenceEngine,
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:4 from "@/runtime/workflow-persistence/WorkflowPersistenceEngine";
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:6 export class WorkflowRuntimeService {
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:27 "Workflow Transition",
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:37 await WorkflowPersistenceEngine
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:2 WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:3 WorkflowRuntimeHistoryEntry,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:4 WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:5 WorkflowRuntimeStatus,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:6 WorkflowRuntimeStep,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:7 WorkflowRuntimeTransition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:8 } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:10 export { workflowRuntimeDefinitions } from "./WorkflowRuntimeDefinitions";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:11 export { WorkflowRuntimeRegistry } from "./WorkflowRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:12 export { WorkflowRuntimeStore } from "./WorkflowRuntimeStore";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:13 export { WorkflowRuntimeValidator } from "./WorkflowRuntimeValidator";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:14 export { WorkflowRuntimeAudit } from "./WorkflowRuntimeAudit";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:15 export { WorkflowRuntimeEngine } from "./WorkflowRuntimeEngine";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:1 import type { WorkflowRuntimeInstance } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:3 export class WorkflowRuntimeAudit {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:4 static log(instance: WorkflowRuntimeInstance, label: string) {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:5 console.log("WORKFLOW AUDIT", {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:6 workflow: instance.workflowKey,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:1 import type { WorkflowRuntimeDefinition } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:3 export const workflowRuntimeDefinitions: WorkflowRuntimeDefinition[] = [
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:7 label: "Workflow maintenance materiel",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:58 label: "Workflow alerte stock",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:1 import { WorkflowRuntimeRegistry } from "./WorkflowRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:2 import { WorkflowRuntimeStore } from "./WorkflowRuntimeStore";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:3 import { WorkflowRuntimeValidator } from "./WorkflowRuntimeValidator";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:4 import { WorkflowRuntimeAudit } from "./WorkflowRuntimeAudit";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:6 export class WorkflowRuntimeEngine {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:7 static start(workflowKey: string, recordId: string) {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:8 const definition = WorkflowRuntimeRegistry.get(workflowKey);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:11 throw new Error(`Workflow introuvable: ${workflowKey}`);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:14 const instance = WorkflowRuntimeStore.create(definition, recordId);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:16 WorkflowRuntimeAudit.log(instance, "Workflow demarre");
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:22 workflowKey: string,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:26 const definition = WorkflowRuntimeRegistry.get(workflowKey);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:29 throw new Error(`Workflow introuvable: ${workflowKey}`);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:32 const instance = WorkflowRuntimeStore.create(definition, recordId);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:35 WorkflowRuntimeValidator.findTransition(
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:66 WorkflowRuntimeStore.save(instance);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:67 WorkflowRuntimeAudit.log(instance, transition.label);
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:1 import type { WorkflowRuntimeDefinition } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:2 import { workflowRuntimeDefinitions } from "./WorkflowRuntimeDefinitions";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:4 export class WorkflowRuntimeRegistry {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:5 static all(): WorkflowRuntimeDefinition[] {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:6 return workflowRuntimeDefinitions;
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:9 static forModule(moduleKey: string): WorkflowRuntimeDefinition[] {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:10 return workflowRuntimeDefinitions.filter(
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:11 (workflow) => workflow.moduleKey === moduleKey
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:15 static get(workflowKey: string): WorkflowRuntimeDefinition | undefined {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:16 return workflowRuntimeDefinitions.find(
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts:17 (workflow) => workflow.key === workflowKey
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:2 WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:3 WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:4 } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:6 const instances = new Map<string, WorkflowRuntimeInstance>();
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:8 export class WorkflowRuntimeStore {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:10 definition: WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:12 ): WorkflowRuntimeInstance {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:21 const instance: WorkflowRuntimeInstance = {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:24 workflowKey: definition.key,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:32 label: "Workflow initialise",
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:43 static get(id: string): WorkflowRuntimeInstance | undefined {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeStore.ts:47 static save(instance: WorkflowRuntimeInstance) {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:1 export type WorkflowRuntimeStatus =
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:9 export interface WorkflowRuntimeStep {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:13 status?: WorkflowRuntimeStatus;
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:16 export interface WorkflowRuntimeTransition {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:23 export interface WorkflowRuntimeDefinition {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:28 steps: WorkflowRuntimeStep[];
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:29 transitions: WorkflowRuntimeTransition[];
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:32 export interface WorkflowRuntimeInstance {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:35 workflowKey: string;
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:38 status: WorkflowRuntimeStatus;
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:39 history: WorkflowRuntimeHistoryEntry[];
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts:42 export interface WorkflowRuntimeHistoryEntry {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:2 WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:3 WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:4 WorkflowRuntimeTransition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:5 } from "./WorkflowRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:7 export class WorkflowRuntimeValidator {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:9 definition: WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:10 instance: WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:12 ): WorkflowRuntimeTransition | undefined {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:21 definition: WorkflowRuntimeDefinition,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:22 instance: WorkflowRuntimeInstance,
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts:26 WorkflowRuntimeValidator.findTransition(
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:4 WorkflowRuntimeEngine,
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:6 from "@/runtime/workflow-ui/WorkflowRuntimeEngine";
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:22 export function ERPWorkflowActions({
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:35 WorkflowRuntimeEngine
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:2 WorkflowState,
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:3 WorkflowTransition,
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:5 from "@/runtime/workflow-ui/Workflow.types";
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:7 export const maintenanceWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:12 states: <WorkflowState[]> [
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:63 <WorkflowTransition[]> [
C:\Users\Admin\terragest\src\runtime\workflow-ui\Workflow.types.ts:1 export interface WorkflowState {
C:\Users\Admin\terragest\src\runtime\workflow-ui\Workflow.types.ts:12 export interface WorkflowTransition {
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:2 maintenanceWorkflow,
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:4 from "@/runtime/workflow-ui/maintenance.workflow";
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:19 maintenanceWorkflow,
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:22 export class WorkflowRuntimeEngine {
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:24 static getWorkflow(
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:43 const workflow =
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:44 this.getWorkflow(
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:48 if (!workflow) {
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:52 return workflow.transitions.filter(
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:1 export interface ERPWorkflowState {
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:8 export class ERPWorkflowRuntimeEngine {
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:10 private workflows:
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:11 ERPWorkflowState[] = [];
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:13 registerWorkflow(
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:14 workflow: ERPWorkflowState
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:17 this.workflows.push(
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:18 workflow
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:22 getWorkflow(
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:26 return this.workflows.find(
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:27 workflow =>
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:28 workflow.module === module
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:38 const workflow =
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:39 this.getWorkflow(module);
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:41 if (!workflow) {
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:47 workflow.states.includes(from)
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:48 && workflow.states.includes(to)
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:53 export const erpWorkflowRuntimeEngine =
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:54 new ERPWorkflowRuntimeEngine();
C:\Users\Admin\terragest\src\runtime\workflows\WorkflowEngine.ts:1 export class WorkflowEngine {
C:\Users\Admin\terragest\src\runtime\workflows\WorkflowEngine.ts:3 async run(workflow: string) {
C:\Users\Admin\terragest\src\runtime\workflows\WorkflowEngine.ts:5 console.log("[Workflow]", workflow);
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:2 WorkflowDefinition
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:4 from "../types/WorkflowDefinition";
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:7 WorkflowStateStore
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:9 from "../state/WorkflowStateStore";
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:12 workflowExecutionStore
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:14 from "@/features/observability/stores/workflows/workflowExecutionStore";
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:17 WorkflowExecutionPersistence
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:19 from "../persistence/WorkflowExecutionPersistence";
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:31 export class WorkflowExecutor {
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:34 new WorkflowStateStore();
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:37 new WorkflowExecutionPersistence();
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:46 workflow: WorkflowDefinition,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:51 workflowId:
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:52 workflow.id,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:65 workflowExecutionStore.push(
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:76 for (const step of workflow.steps) {
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:87 workflow.id,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:91 workflowExecutionStore.push({
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:129 workflow.id,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:133 workflowExecutionStore.push({
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:157 workflow.id,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:161 workflowExecutionStore.push({
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:174 workflow.id,
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:177 "workflow-runtime",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:2 ERPWorkflowEngine,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:3 } from "./engine/ERPWorkflowEngine";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:7 export function seedERPRuntimeWorkflows() {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:15 ERPWorkflowEngine.start("maintenance-critical-flow");
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:17 ERPWorkflowEngine.start("stock-replenishment-flow");
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:19 ERPWorkflowEngine.start("payment-validation-flow");
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts:22 ERPWorkflowEngine.complete(maintenanceExecution.id);
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\index.ts:1 export * from "./engine/ERPWorkflowTypes";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\index.ts:2 export * from "./engine/ERPWorkflowEngine";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\index.ts:3 export * from "./registry/ERPWorkflowRegistry";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\index.ts:4 export * from "./store/ERPWorkflowExecutionStore";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\index.ts:5 export * from "./timeline/ERPWorkflowTimelineStore";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\index.ts:6 export * from "./ERPRuntimeWorkflowSeed";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:10 ERPWorkflowRegistry,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:11 } from "../registry/ERPWorkflowRegistry";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:14 ERPWorkflowExecutionStore,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:15 } from "../store/ERPWorkflowExecutionStore";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:18 ERPWorkflowTimelineStore,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:19 } from "../timeline/ERPWorkflowTimelineStore";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:22 ERPWorkflowDefinition,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:23 ERPWorkflowExecution,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:24 } from "./ERPWorkflowTypes";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:30 export const ERPWorkflowEngine = {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:32 return ERPWorkflowRegistry;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:36 return ERPWorkflowRegistry.filter(
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:37 (workflow) => workflow.module === module
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:42 workflowKey: string,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:44 ): ERPWorkflowExecution | undefined {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:46 ERPWorkflowRegistry.find(
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:47 (workflow) => workflow.key === workflowKey
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:60 const execution: ERPWorkflowExecution = {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:62 workflowKey: definition.key,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:71 ERPWorkflowExecutionStore.add(execution);
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:73 ERPWorkflowTimelineStore.add({
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:75 workflowKey: definition.key,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:83 traceId: createId("trace_workflow"),
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:85 action: `WORKFLOW_STARTED:${definition.key}`,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:92 id: createId("evt_workflow"),
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:93 type: "WORKFLOW_STARTED",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:96 actor: "workflow-engine",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:98 workflowKey: definition.key,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:110 ERPWorkflowExecutionStore.all().find(
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:121 ERPWorkflowExecutionStore.update(executionId, {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:126 ERPWorkflowTimelineStore.add({
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:128 workflowKey: execution.workflowKey,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:130 label: "Workflow termine",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:136 traceId: createId("trace_workflow"),
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:138 action: `WORKFLOW_COMPLETED:${execution.workflowKey}`,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:145 id: createId("evt_workflow"),
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:146 type: "WORKFLOW_COMPLETED",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:149 actor: "workflow-engine",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:151 workflowKey: execution.workflowKey,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:1 export type ERPWorkflowState =
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:12 export type ERPWorkflowStepType =
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:20 export type ERPWorkflowStep = {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:23 type: ERPWorkflowStepType;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:28 export type ERPWorkflowDefinition = {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:33 initialState: ERPWorkflowState;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:34 steps: ERPWorkflowStep[];
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:37 export type ERPWorkflowExecution = {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:39 workflowKey: string;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:41 state: ERPWorkflowState;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:2 ERPWorkflowDefinition,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:3 } from "../engine/ERPWorkflowTypes";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:5 export const ERPWorkflowRegistry: ERPWorkflowDefinition[] = [
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:10 description: "Workflow de traitement des maintenances critiques.",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:48 description: "Workflow de reapprovisionnement automatique.",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:75 description: "Workflow de validation des paiements.",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:2 ERPWorkflowExecution,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:3 } from "../engine/ERPWorkflowTypes";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:5 class ERPWorkflowExecutionStoreClass {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:6 private executions: ERPWorkflowExecution[] = [];
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:8 add(execution: ERPWorkflowExecution) {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:15 patch: Partial<ERPWorkflowExecution>
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:39 export const ERPWorkflowExecutionStore =
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:40 new ERPWorkflowExecutionStoreClass();
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:1 export type ERPWorkflowTimelineItem = {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:3 workflowKey: string;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:10 class ERPWorkflowTimelineStoreClass {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:11 private items: ERPWorkflowTimelineItem[] = [];
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:13 add(item: ERPWorkflowTimelineItem) {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:23 export const ERPWorkflowTimelineStore =
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:24 new ERPWorkflowTimelineStoreClass();
C:\Users\Admin\terragest\src\runtime\workflows\generated\achats\achats.workflow.ts:1 export const AchatsWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\achats\achats.workflow.ts:4 "achats_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\achats\achats.workflow.ts:7 "Achats Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\clients\clients.workflow.ts:1 export const ClientsWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\clients\clients.workflow.ts:4 "clients_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\clients\clients.workflow.ts:7 "Clients Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\commandes\commandes.workflow.ts:1 export const CommandesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\commandes\commandes.workflow.ts:4 "commandes_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\commandes\commandes.workflow.ts:7 "Commandes Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\depenses\depenses.workflow.ts:1 export const DepensesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\depenses\depenses.workflow.ts:4 "depenses_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\depenses\depenses.workflow.ts:7 "Depenses Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\devis\devis.workflow.ts:1 export const DevisWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\devis\devis.workflow.ts:4 "devis_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\devis\devis.workflow.ts:7 "Devis Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\employes\employes.workflow.ts:1 export const EmployesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\employes\employes.workflow.ts:4 "employes_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\employes\employes.workflow.ts:7 "Employes Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\factures\factures.workflow.ts:1 export const FacturesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\factures\factures.workflow.ts:4 "factures_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\factures\factures.workflow.ts:7 "Factures Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\fournisseurs\fournisseurs.workflow.ts:1 export const FournisseursWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\fournisseurs\fournisseurs.workflow.ts:4 "fournisseurs_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\fournisseurs\fournisseurs.workflow.ts:7 "Fournisseurs Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\incidents\incidents.workflow.ts:1 export const IncidentsWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\incidents\incidents.workflow.ts:4 "incidents_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\incidents\incidents.workflow.ts:7 "Incidents Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\intrants\intrants.workflow.ts:1 export const IntrantsWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\intrants\intrants.workflow.ts:4 "intrants_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\intrants\intrants.workflow.ts:7 "Intrants Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\livraisons\livraisons.workflow.ts:1 export const LivraisonsWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\livraisons\livraisons.workflow.ts:4 "livraisons_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\livraisons\livraisons.workflow.ts:7 "Livraisons Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\parcelles\parcelles.workflow.ts:1 export const ParcellesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\parcelles\parcelles.workflow.ts:4 "parcelles_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\parcelles\parcelles.workflow.ts:7 "Parcelles Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\recettes\recettes.workflow.ts:1 export const RecettesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\recettes\recettes.workflow.ts:4 "recettes_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\recettes\recettes.workflow.ts:7 "Recettes Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\recoltes\recoltes.workflow.ts:1 export const RecoltesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\recoltes\recoltes.workflow.ts:4 "recoltes_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\recoltes\recoltes.workflow.ts:7 "Recoltes Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\taches\taches.workflow.ts:1 export const TachesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\taches\taches.workflow.ts:4 "taches_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\taches\taches.workflow.ts:7 "Taches Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\vehicules\vehicules.workflow.ts:1 export const VehiculesWorkflow = {
C:\Users\Admin\terragest\src\runtime\workflows\generated\vehicules\vehicules.workflow.ts:4 "vehicules_workflow",
C:\Users\Admin\terragest\src\runtime\workflows\generated\vehicules\vehicules.workflow.ts:7 "Vehicules Workflow",
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:13 WorkflowExecution
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:15 from "../types/WorkflowExecution";
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:18 WorkflowExecutionPersistence {
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:22 WorkflowExecution
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:30 "runtime_workflow_executions"
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:49 Partial<WorkflowExecution>
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:56 "runtime_workflow_executions",
C:\Users\Admin\terragest\src\runtime\workflows\sagas\SagaCoordinator.ts:2 WorkflowDefinition
C:\Users\Admin\terragest\src\runtime\workflows\sagas\SagaCoordinator.ts:4 from "../types/WorkflowDefinition";
C:\Users\Admin\terragest\src\runtime\workflows\sagas\SagaCoordinator.ts:10 workflow:
C:\Users\Admin\terragest\src\runtime\workflows\sagas\SagaCoordinator.ts:11 WorkflowDefinition,
C:\Users\Admin\terragest\src\runtime\workflows\sagas\SagaCoordinator.ts:18 ...workflow.steps
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:2 WorkflowExecution
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:4 from "../types/WorkflowExecution";
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:7 WorkflowStateStore {
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:10 WorkflowExecution[] = [];
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:13 execution: WorkflowExecution
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:22 workflowId: string,
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:23 partial: Partial<WorkflowExecution>
C:\Users\Admin\terragest\src\runtime\workflows\state\WorkflowStateStore.ts:29 item.workflowId === workflowId
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowDefinition.ts:2 WorkflowStep
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowDefinition.ts:4 from "./WorkflowStep";
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowDefinition.ts:6 export type WorkflowDefinition = {
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowDefinition.ts:9 steps: WorkflowStep[];
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowExecution.ts:1 export type WorkflowExecutionStatus =
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowExecution.ts:8 export type WorkflowExecution = {
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowExecution.ts:9 workflowId: string;
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowExecution.ts:12 WorkflowExecutionStatus;
C:\Users\Admin\terragest\src\runtime\workflows\types\WorkflowStep.ts:1 export type WorkflowStep = {
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:4 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:5 "terrain-creation-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:20 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:34 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:49 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:64 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:65 "maintenance-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:79 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:80 "intervention-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:94 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeBindings.ts:109 workflows: [
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:15 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:25 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:37 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:47 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:59 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:69 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:81 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:91 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:103 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:113 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:125 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:135 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:147 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:157 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:169 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:179 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:193 "workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:203 workflows: [],
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:1 export const GeneratedRuntimeWorkflows = {
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:4 "terrain-creation-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:5 "terrain-update-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:13 "stock-monitoring-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:14 "stock-alert-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:18 "contract-validation-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:22 "maintenance-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:23 "preventive-maintenance-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:27 "intervention-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:32 "materiel-repair-workflow",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeWorkflows.ts:36 "payment-validation-workflow",
C:\Users\Admin\terragest\src\_quarantine\sidebar\AppSidebar.tsx:45 label: "Workflow",
C:\Users\Admin\terragest\src\_quarantine\sidebar\AppSidebar.tsx:46 href: "/workflow-engine",
C:\Users\Admin\terragest\src\_quarantine\sidebar\ERPSidebar.tsx:30 "Workflows",
C:\Users\Admin\terragest\src\_quarantine\workflow\automations\WorkflowAutomation.ts:3 } from "@/workflow/services/EventBus";
C:\Users\Admin\terragest\src\_quarantine\workflow\automations\WorkflowAutomation.ts:8 } from "@/workflow/events/ProductEvents";
C:\Users\Admin\terragest\src\_quarantine\workflow\automations\WorkflowAutomation.ts:12 } from "@/workflow/rules/RulesEngine";
C:\Users\Admin\terragest\src\_quarantine\workflow\automations\WorkflowAutomation.ts:14 export const WorkflowAutomation = {
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\ProductCreatedListener.ts:3 } from "@/workflow/services/EventBus";
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\ProductCreatedListener.ts:7 } from "@/workflow/events/ProductEvents";
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\ProductCreatedListener.ts:11 } from "@/workflow/notifications/NotificationEngine";
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\StockAlertListener.ts:3 } from "@/workflow/services/EventBus";
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\StockAlertListener.ts:7 } from "@/workflow/events/ProductEvents";
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\StockAlertListener.ts:11 } from "@/workflow/notifications/NotificationEngine";
C:\Users\Admin\terragest\src\_quarantine\workflow\notifications\WorkflowNotificationCenter.tsx:8 export const WorkflowNotificationCenter =
C:\Users\Admin\terragest\src\_quarantine\workflow\notifications\WorkflowNotificationCenter.tsx:26 "Workflow actif",
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:11 WorkflowAutomation,
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:12 } from "@/workflow/automations/WorkflowAutomation";
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:14 export const WorkflowProductsRepository = {
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:31 WorkflowAutomation.onProductCreated(
```

## Recherche : automation

```txt
C:\Users\Admin\terragest\src\app\(private)\automation\page.tsx:2 ERPRuntimeAutomationDashboard,
C:\Users\Admin\terragest\src\app\(private)\automation\page.tsx:3 } from "@/components/erp/automation";
C:\Users\Admin\terragest\src\app\(private)\automation\page.tsx:8 <ERPRuntimeAutomationDashboard />
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:18 action: "Automation déclenchée",
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationCard.tsx:6 export function ERPAutomationCard({
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:3 export function ERPAutomationTimeline() {
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:5 const automations = [
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:28 {automations.map((automation) => (
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:31 key={`${automation.time}-${automation.label}`}
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:57 {automation.time}
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:66 {automation.label}
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimelinePanel.tsx:2 ERPAutomationTimelineStore,
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimelinePanel.tsx:3 } from "@/runtime/automation";
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimelinePanel.tsx:5 export function ERPAutomationTimelinePanel() {
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimelinePanel.tsx:8 ERPAutomationTimelineStore.all();
C:\Users\Admin\terragest\src\components\erp\automation\ERPNotificationsPanel.tsx:3 } from "@/runtime/automation";
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:7 seedERPRuntimeAutomation,
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:8 } from "@/runtime/automation";
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:11 ERPAutomationTimelinePanel,
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:12 } from "./ERPAutomationTimelinePanel";
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:18 seedERPRuntimeAutomation();
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:20 export function ERPRuntimeAutomationDashboard() {
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:26 eyebrow="ERP Automation"
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:27 title="Automation Runtime Engine"
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:28 description="Execution des automations, hooks runtime et notifications ERP."
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:38 Automation timeline
C:\Users\Admin\terragest\src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx:43 <ERPAutomationTimelinePanel />
C:\Users\Admin\terragest\src\components\erp\automation\index.ts:1 export * from "./ERPAutomationTimelinePanel";
C:\Users\Admin\terragest\src\components\erp\automation\index.ts:5 export * from "./ERPRuntimeAutomationDashboard";
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:7 AutomationRuntimeEngine,
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:8 AutomationRuntimeQueue,
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:9 AutomationRuntimeRegistry,
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:10 type AutomationRuntimeJob,
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:11 } from "@/runtime/automation-runtime";
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:13 interface ERPAutomationRuntimePanelProps {
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:17 export function ERPAutomationRuntimePanel({
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:19 }: ERPAutomationRuntimePanelProps) {
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:20 const rules = AutomationRuntimeRegistry.forModule(module.metadata.key);
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:23 useState<AutomationRuntimeJob[]>(AutomationRuntimeQueue.all());
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:26 AutomationRuntimeEngine.evaluate(module.metadata.key, {
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:32 setJobs([...AutomationRuntimeQueue.all()]);
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:36 await AutomationRuntimeEngine.runPending();
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:37 setJobs([...AutomationRuntimeQueue.all()]);
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:45 Automation runtime
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:58 Aucune automation declaree pour ce module.
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:97 Jobs automation
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:103 Aucun job automation.
C:\Users\Admin\terragest\src\components\erp\automation-runtime\index.ts:1 export { ERPAutomationRuntimePanel } from "./ERPAutomationRuntimePanel";
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitMetricGrid.tsx:20 <ERPStatCard label="Automation" value={snapshot.automationCount} helper="Automatisations" />
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:33 <th className="px-4 py-3 text-left font-semibold text-slate-600">Automation</th>
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx:46 <td className="px-4 py-3 text-slate-600">{module.automation.length}</td>
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx:25 label: "Automation monitoring",
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx:26 value: snapshot.automationCount,
C:\Users\Admin\terragest\src\components\erp\cockpit\ERPRuntimeCockpitDashboard.tsx:17 description="Supervision centrale des modules, schemas, actions, workflows, events, automation, permissions et navigation."
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:2 getAutomationsRegistry,
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:3 } from "@/core/automation/registry/automation-registry";
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:40 const automations =
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:41 getAutomationsRegistry();
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:221 ERP Automations
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:226 {automations.length === 0 && (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:232 {automations.map(
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:233 (automation) => (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:236 automation.rule.id
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:245 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:252 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:259 {automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:269 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:278 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:287 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:353 ERP Automations
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:358 {automations.length === 0 && (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:364 {automations.map(
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:365 (automation) => (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:368 automation.rule.id
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:377 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:384 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:391 {automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:401 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:410 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:419 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:529 ERP Automations
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:534 {automations.length === 0 && (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:540 {automations.map(
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:541 (automation) => (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:544 automation.rule.id
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:553 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:560 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:567 {automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:577 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:586 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:595 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:661 ERP Automations
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:666 {automations.length === 0 && (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:672 {automations.map(
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:673 (automation) => (
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:676 automation.rule.id
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:685 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:692 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:699 {automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:709 automation.rule
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:718 automation
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:727 automation
C:\Users\Admin\terragest\src\components\erp\executive-dashboard\ERPExecutiveDashboard.tsx:28 <div className="text-sm text-gray-500">Automations</div>
C:\Users\Admin\terragest\src\components\erp\kpi\ERPKPIGrid.tsx:15 label: "Automations",
C:\Users\Admin\terragest\src\components\erp\live\ERPLiveEvents.tsx:20 label: "Automation déclenchée",
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPSystemHealth.tsx:13 ["Automation", "healthy"],
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:19 <ERPStatCard label="Automation" value={snapshot.automation} helper="Triggers live" />
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatus.tsx:14 name: "Automation Runner",
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:25 description="Source unique de verite ERP pour modules, schemas, actions, workflows, permissions et automation."
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx:49 label="Automation"
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:13 const automationEnabled = module.metadata.features?.automation === true;
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:29 {automationEnabled && <ERPBadge tone="warning">Automation</ERPBadge>}
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsPanel.tsx:67 <p className="text-sm text-slate-500">Automations</p>
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsPanel.tsx:69 {metrics.automations}
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkerQueue.tsx:25 name: "automation-worker",
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:4 import { ERPAutomationRuntimePanel } from "@/components/erp/automation-runtime";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:34 <ERPAutomationRuntimePanel module={module} />
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:1 export type AutomationRule = {
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:17 const automationRules:
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:18 AutomationRule[] = [];
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:20 export function registerAutomation(
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:21 rule: AutomationRule
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:23 automationRules.push(rule);
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:26 "ERP AUTOMATION REGISTERED",
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:31 export async function executeAutomations(
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:36 automationRules.filter(
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:45 "ERP AUTOMATION EXECUTED",
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:55 export function getAutomations() {
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:56 return automationRules;
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:2 AutomationRule,
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:3 } from "@/core/automation/automation-engine";
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:5 type AutomationMetadata = {
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:13 const automationRegistry =
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:17 rule: AutomationRule;
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:19 AutomationMetadata;
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:23 export function registerAutomationRule(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:24 rule: AutomationRule
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:26 automationRegistry.set(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:42 "ERP AUTOMATION REGISTRY",
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:47 export function incrementAutomationExecution(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:50 const automation =
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:51 automationRegistry.get(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:55 if (!automation) {
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:59 automation.metadata.executions += 1;
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:62 export function getAutomationsRegistry() {
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:64 automationRegistry.values()
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:68 export function disableAutomation(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:71 const automation =
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:72 automationRegistry.get(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:76 if (!automation) {
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:80 automation.metadata.enabled =
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:84 export function enableAutomation(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:87 const automation =
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:88 automationRegistry.get(
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:92 if (!automation) {
C:\Users\Admin\terragest\src\core\automation\registry\automation-registry.ts:96 automation.metadata.enabled =
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:6 initializeERPAutomationEngine,
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:7 } from "@/runtime/automation/engine/ERPAutomationEngine";
C:\Users\Admin\terragest\src\core\bootstrap\runtime-bootstrap.ts:27 initializeERPAutomationEngine();
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:4 automations?: boolean;
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:37 automations: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:62 automations: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:85 automations: true,
C:\Users\Admin\terragest\src\features\achats\achats.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\clients\clients.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\commandes\commandes.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\depenses\depenses.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\devis\devis.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\employes\employes.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\exploitations\exploitations.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\factures\factures.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\fournisseurs\fournisseurs.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\incidents\incidents.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\interventions\interventions.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\intrants\intrants.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\livraisons\livraisons.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\materiels\materiels.feature.ts:18 "automation",
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:47 AutomationRunner
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:49 from "@/runtime/automation/runner/AutomationRunner";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:52 AutomationScheduler
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:54 from "@/runtime/automation/scheduler/AutomationScheduler";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:71 from "@/runtime/automation/rules/MaterielBreakdownRule";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:102 private automationRunner =
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:103 new AutomationRunner();
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:105 private automationScheduler =
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:106 new AutomationScheduler();
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:114 this.automationScheduler.register(
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:146 await this.automationRunner.run(
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:147 this.automationScheduler.getAll(),
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\parcelles\parcelles.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\produits\produits.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\recettes\recettes.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\recoltes\recoltes.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\stocks\stocks.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\taches\taches.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\terrains\terrains.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\vehicules\vehicules.feature.ts:29 "automation",
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:75 BPM & process automation
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:1 // src/platform/automation/ERPAutomationEngine.ts
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:6 export interface ERPAutomation {
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:15 class ERPAutomationEngineManager {
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:17 private automations: ERPAutomation[] = [];
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:20 automation: ERPAutomation
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:24 `[AUTOMATION REGISTERED]
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:25 ${automation.name}`
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:28 this.automations.push(
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:29 automation
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:33 automation.trigger,
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:34 automation.run
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:38 getAutomations() {
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:40 return this.automations;
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:44 export const ERPAutomationEngine =
C:\Users\Admin\terragest\src\platform\automation\ERPAutomationEngine.ts:45 new ERPAutomationEngineManager();
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:1 // src/platform/automation/registerAutomations.ts
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:3 import { ERPAutomationEngine }
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:4 from "@/platform/automation/ERPAutomationEngine";
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:6 export function registerERPAutomations() {
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:8 ERPAutomationEngine.register({
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:17 "[AUTOMATION] stock alert triggered",
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:23 ERPAutomationEngine.register({
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:32 "[AUTOMATION] generate facture",
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:38 ERPAutomationEngine.register({
C:\Users\Admin\terragest\src\platform\automation\registerAutomations.ts:47 "[AUTOMATION] maintenance reminder",
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:63 if (module.metadata.features?.automation) {
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:64 capabilities.push("automation");
C:\Users\Admin\terragest\src\platform\registry\FeatureDefinition.ts:6 | "automation"
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:1 export interface ERPAutomation {
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:14 export class ERPAutomationEngine {
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:16 private automations:
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:17 ERPAutomation[] = [];
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:19 registerAutomation(
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:20 automation: ERPAutomation
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:23 this.automations.push(
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:24 automation
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:34 this.automations
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:36 automation =>
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:37 automation.module === module
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:38 && automation.trigger === trigger
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:41 automation =>
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:42 automation.action(data)
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:47 export const erpAutomationEngine =
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:48 new ERPAutomationEngine();
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:2 ERPAutomation,
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:3 } from "./ERPAutomationEngine";
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:5 export class ERPAutomationRegistry {
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:7 private static automations:
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:8 ERPAutomation[] = [];
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:11 automation: ERPAutomation
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:14 this.automations.push(
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:15 automation
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationRegistry.ts:21 return this.automations;
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationTimelineStore.ts:1 export interface ERPAutomationTimelineItem {
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationTimelineStore.ts:11 export class ERPAutomationTimelineStore {
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationTimelineStore.ts:12 private static items: ERPAutomationTimelineItem[] = [];
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationTimelineStore.ts:22 static addItem(item: ERPAutomationTimelineItem) {
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationTimelineStore.ts:27 export const erpAutomationTimelineStore =
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationTimelineStore.ts:28 new ERPAutomationTimelineStore();
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:6 initializeERPAutomationEngine,
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:7 } from "./engine/ERPAutomationEngine";
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:11 export function seedERPRuntimeAutomation() {
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:19 initializeERPAutomationEngine();
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:26 actor: "automation-runtime",
C:\Users\Admin\terragest\src\runtime\automation\index.ts:1 export * from "./ERPAutomationEngine";
C:\Users\Admin\terragest\src\runtime\automation\index.ts:2 export * from "./ERPAutomationTimelineStore";
C:\Users\Admin\terragest\src\runtime\automation\index.ts:4 export * from "./ERPAutomationRegistry";
C:\Users\Admin\terragest\src\runtime\automation\index.ts:5 export * from "./seedERPRuntimeAutomation";
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomation.ts:1 export interface RuntimeAutomation {
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:2 runtimeAutomations,
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:4 from "@/runtime/automation/runtimeAutomations";
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:6 export class RuntimeAutomationEngine {
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:11 const automation of
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:12 runtimeAutomations
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:16 automation.enabled ===
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:26 "Running automation",
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:27 automation.id
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:30 await automation.handler();
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:35 "Automation error",
C:\Users\Admin\terragest\src\runtime\automation\RuntimeAutomationEngine.ts:36 automation.id,
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:2 RuntimeAutomation,
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:4 from "@/runtime/automation/RuntimeAutomation";
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:11 export const runtimeAutomations:
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:12 RuntimeAutomation[] = [
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:35 "Running stock automation..."
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:42 "automation",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:87 "automation",
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:2 ERPAutomationTimelineStore,
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:3 } from "./ERPAutomationTimelineStore";
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:9 export function seedERPRuntimeAutomation() {
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:10 ERPAutomationTimelineStore.addItem({
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:11 id: "automation-1",
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:12 action: "Runtime automation initialized",
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:13 label: "Initialisation automation",
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:22 title: "Automation runtime",
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:23 message: "Le runtime automation ERP est initialisé.",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:10 ERPAutomationRegistry,
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:11 } from "./ERPAutomationRegistry";
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:14 ERPAutomationTimelineStore,
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:15 } from "../timeline/ERPAutomationTimelineStore";
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:36 ERPAutomationRegistry.filter(
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:47 ERPAutomationTimelineStore.add({
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:81 "Automation notification",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:104 "Automation alert",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:123 export function initializeERPAutomationEngine() {
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:2 ERPAutomationRule,
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:3 } from "./ERPAutomationRule";
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:5 export const ERPAutomationRegistry:
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:6 ERPAutomationRule[] = [
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:5 export type ERPAutomationActionType =
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:12 export type ERPAutomationRule = {
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:20 action: ERPAutomationActionType;
C:\Users\Admin\terragest\src\runtime\automation\rules\AutomationRule.ts:1 export type AutomationRule = {
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:2 Automation
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:4 from "../types/Automation";
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:13 Automation = {
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:16 "AUTOMATION_MATERIEL_BREAKDOWN",
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:19 "Materiel Breakdown Automation",
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:22 "Automation matériel critique",
C:\Users\Admin\terragest\src\runtime\automation\rules\MaterielBreakdownRule.ts:47 "[AUTOMATION] Maintenance workflow triggered",
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:8 Automation
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:10 from "../types/Automation";
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:13 AutomationTrigger
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:15 from "../triggers/AutomationTrigger";
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:17 export class AutomationRunner {
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:20 new AutomationTrigger();
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:23 automations: Automation[],
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:27 for (const automation of automations) {
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:31 automation,
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:40 `[Automation Triggered] ${automation.name}`
C:\Users\Admin\terragest\src\runtime\automation\runner\AutomationRunner.ts:43 await automation.action({
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:2 Automation
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:4 from "../types/Automation";
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:6 export class AutomationScheduler {
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:8 private automations:
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:9 Automation[] = [];
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:12 automation: Automation
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:15 this.automations.push(
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:16 automation
C:\Users\Admin\terragest\src\runtime\automation\scheduler\AutomationScheduler.ts:22 return this.automations;
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationExecution.ts:1 export type ERPAutomationExecution = {
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:2 ERPAutomationExecution,
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:3 } from "./ERPAutomationExecution";
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:5 class ERPAutomationTimelineStoreClass {
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:8 ERPAutomationExecution[] = [];
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:11 execution: ERPAutomationExecution
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:28 export const ERPAutomationTimelineStore =
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationTimelineStore.ts:29 new ERPAutomationTimelineStoreClass();
C:\Users\Admin\terragest\src\runtime\automation\triggers\AutomationTrigger.ts:7 Automation
C:\Users\Admin\terragest\src\runtime\automation\triggers\AutomationTrigger.ts:9 from "../types/Automation";
C:\Users\Admin\terragest\src\runtime\automation\triggers\AutomationTrigger.ts:11 export class AutomationTrigger {
C:\Users\Admin\terragest\src\runtime\automation\triggers\AutomationTrigger.ts:14 automation: Automation,
C:\Users\Admin\terragest\src\runtime\automation\triggers\AutomationTrigger.ts:18 return automation.eventType === event.type;
C:\Users\Admin\terragest\src\runtime\automation\types\Automation.ts:6 export type AutomationContext = {
C:\Users\Admin\terragest\src\runtime\automation\types\Automation.ts:11 export type AutomationAction =
C:\Users\Admin\terragest\src\runtime\automation\types\Automation.ts:13 context: AutomationContext
C:\Users\Admin\terragest\src\runtime\automation\types\Automation.ts:16 export type Automation = {
C:\Users\Admin\terragest\src\runtime\automation\types\Automation.ts:21 action: AutomationAction;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:1 import { AutomationRuntimeRegistry } from "./AutomationRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:2 import { AutomationRuntimeTriggerEngine } from "./AutomationRuntimeTriggerEngine";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:3 import { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:4 import { AutomationRuntimeExecutor } from "./AutomationRuntimeExecutor";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:6 export class AutomationRuntimeEngine {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:11 const rules = AutomationRuntimeRegistry.forModule(moduleKey);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:15 AutomationRuntimeTriggerEngine.matches(rule, payload)
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:17 .map((rule) => AutomationRuntimeQueue.enqueue(rule));
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:23 const jobs = AutomationRuntimeQueue.pending();
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:26 await AutomationRuntimeExecutor.execute(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:29 return AutomationRuntimeQueue.all();
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:33 const rule = AutomationRuntimeRegistry.get(ruleKey);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:36 throw new Error(`Automation introuvable: ${ruleKey}`);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:39 const job = AutomationRuntimeQueue.enqueue(rule);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeEngine.ts:41 return AutomationRuntimeExecutor.execute(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:2 AutomationRuntimeAction,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:3 AutomationRuntimeJob,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:4 } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:5 import { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:7 export class AutomationRuntimeExecutor {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:9 action: AutomationRuntimeAction,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:10 job: AutomationRuntimeJob
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:12 console.log("AUTOMATION ACTION", {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:20 static async execute(job: AutomationRuntimeJob): Promise<AutomationRuntimeJob> {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:24 AutomationRuntimeQueue.update(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:28 await AutomationRuntimeExecutor.executeAction(action, job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:34 return AutomationRuntimeQueue.update(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:37 error instanceof Error ? error.message : "Erreur automation";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:40 return AutomationRuntimeQueue.moveToDeadLetter(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeExecutor.ts:45 return AutomationRuntimeQueue.update(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:2 AutomationRuntimeJob,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:3 AutomationRuntimeRule,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:4 } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:6 const queue: AutomationRuntimeJob[] = [];
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:7 const deadLetters: AutomationRuntimeJob[] = [];
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:9 export class AutomationRuntimeQueue {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:10 static enqueue(rule: AutomationRuntimeRule): AutomationRuntimeJob {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:13 const job: AutomationRuntimeJob = {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:30 static all(): AutomationRuntimeJob[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:34 static pending(): AutomationRuntimeJob[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:38 static update(job: AutomationRuntimeJob): AutomationRuntimeJob {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:50 static moveToDeadLetter(job: AutomationRuntimeJob): AutomationRuntimeJob {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:56 AutomationRuntimeQueue.update(job);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeQueue.ts:61 static deadLetters(): AutomationRuntimeJob[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:1 import type { AutomationRuntimeRule } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:2 import { automationRuntimeRules } from "./AutomationRuntimeRules";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:4 export class AutomationRuntimeRegistry {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:5 static all(): AutomationRuntimeRule[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:6 return automationRuntimeRules;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:9 static forModule(moduleKey: string): AutomationRuntimeRule[] {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:10 return automationRuntimeRules.filter(
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:15 static get(ruleKey: string): AutomationRuntimeRule | undefined {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRegistry.ts:16 return automationRuntimeRules.find((rule) => rule.key === ruleKey);
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:1 import type { AutomationRuntimeRule } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:3 export const automationRuntimeRules: AutomationRuntimeRule[] = [
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeScheduler.ts:1 import { AutomationRuntimeEngine } from "./AutomationRuntimeEngine";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeScheduler.ts:3 export class AutomationRuntimeScheduler {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeScheduler.ts:5 return AutomationRuntimeEngine.runPending();
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:2 AutomationRuntimeRule,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:3 AutomationRuntimeTrigger,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:4 } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:8 operator: AutomationRuntimeTrigger["operator"],
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:30 export class AutomationRuntimeTriggerEngine {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts:32 rule: AutomationRuntimeRule,
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:1 export type AutomationRuntimeTriggerType =
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:8 export type AutomationRuntimeJobStatus =
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:15 export interface AutomationRuntimeTrigger {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:16 type: AutomationRuntimeTriggerType;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:22 export interface AutomationRuntimeAction {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:34 export interface AutomationRuntimeRule {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:39 trigger: AutomationRuntimeTrigger;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:40 actions: AutomationRuntimeAction[];
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:44 export interface AutomationRuntimeJob {
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:48 status: AutomationRuntimeJobStatus;
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:54 actions: AutomationRuntimeAction[];
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:2 AutomationRuntimeAction,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:3 AutomationRuntimeJob,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:4 AutomationRuntimeJobStatus,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:5 AutomationRuntimeRule,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:6 AutomationRuntimeTrigger,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:7 AutomationRuntimeTriggerType,
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:8 } from "./AutomationRuntimeTypes";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:10 export { automationRuntimeRules } from "./AutomationRuntimeRules";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:11 export { AutomationRuntimeRegistry } from "./AutomationRuntimeRegistry";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:12 export { AutomationRuntimeTriggerEngine } from "./AutomationRuntimeTriggerEngine";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:13 export { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:14 export { AutomationRuntimeExecutor } from "./AutomationRuntimeExecutor";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:15 export { AutomationRuntimeEngine } from "./AutomationRuntimeEngine";
C:\Users\Admin\terragest\src\runtime\automation-runtime\index.ts:16 export { AutomationRuntimeScheduler } from "./AutomationRuntimeScheduler";
C:\Users\Admin\terragest\src\runtime\cockpit\ERPCockpitSnapshot.ts:12 automationCount: modules.reduce((total, module) => total + module.automation.length, 0),
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:20 | "automation"
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:31 name: "Automation Runtime",
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:7 | "automation"
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeLifecycle.ts:24 { key: "automation", label: "Automation runtime", completed: true },
C:\Users\Admin\terragest\src\runtime\events\ERPDomainEvent.ts:7 | "AUTOMATION_TRIGGERED"
C:\Users\Admin\terragest\src\runtime\events\ERPEventAutomationBridge.ts:7 erpAutomationEngine,
C:\Users\Admin\terragest\src\runtime\events\ERPEventAutomationBridge.ts:8 } from "../automation";
C:\Users\Admin\terragest\src\runtime\events\ERPEventAutomationBridge.ts:10 export class ERPEventAutomationBridge {
C:\Users\Admin\terragest\src\runtime\events\ERPEventAutomationBridge.ts:19 erpAutomationEngine
C:\Users\Admin\terragest\src\runtime\events\ERPEventAutomationBridge.ts:30 export const erpEventAutomationBridge =
C:\Users\Admin\terragest\src\runtime\events\ERPEventAutomationBridge.ts:31 new ERPEventAutomationBridge();
C:\Users\Admin\terragest\src\runtime\events\ERPRuntimeEventOrchestrator.ts:7 ERPAutomationTimelineStore,
C:\Users\Admin\terragest\src\runtime\events\ERPRuntimeEventOrchestrator.ts:9 } from "../automation";
C:\Users\Admin\terragest\src\runtime\events\ERPRuntimeEventOrchestrator.ts:20 ERPAutomationTimelineStore
C:\Users\Admin\terragest\src\runtime\events\index.ts:2 export * from "./ERPEventAutomationBridge";
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:56 automations?: string[];
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:55 "automation",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:72 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:134 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:178 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:217 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:259 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:302 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:467 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:535 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:585 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:626 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:667 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:708 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:749 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:790 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:831 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:872 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:913 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:954 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:995 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1036 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1077 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:56 automation: true,
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:30 automation?: boolean;
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:25 { id: "automation", label: "Automation", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:38 { from: "events", to: "automation", label: "triggers" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:39 { from: "automation", to: "workflows", label: "orchestrates" },
C:\Users\Admin\terragest\src\runtime\production\limits\ERPRateLimitRegistry.ts:17 key: "automation-module-hour",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:62 channel: "automation",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:64 title: "Automation declenchee",
C:\Users\Admin\terragest\src\runtime\realtime\channels\ERPRealtimeChannel.ts:4 | "automation"
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:20 automation: ERPRealtimeBus.byChannel("automation").length,
C:\Users\Admin\terragest\src\runtime\registry\ERPRegistry.ts:65 automation(
C:\Users\Admin\terragest\src\runtime\registry\ERPRegistry.ts:71 ?.automation ?? []
C:\Users\Admin\terragest\src\runtime\registry\types.ts:25 export type ERPRegistryAutomation = {
C:\Users\Admin\terragest\src\runtime\registry\types.ts:58 automation: ERPRegistryAutomation[];
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:93 automation: [
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:56 type: "AUTOMATION_TRIGGERED",
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeScheduler.ts:2 RuntimeAutomationEngine,
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeScheduler.ts:4 from "@/runtime/automation/RuntimeAutomationEngine";
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeScheduler.ts:37 await RuntimeAutomationEngine
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:19 automations: 12,
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:29 automations: 4,
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:39 automations: 0,
C:\Users\Admin\terragest\src\runtime\tenant\metrics\ERPTenantMetrics.ts:8 automations: number;
C:\Users\Admin\terragest\src\runtime\testing\engine\ERPTestingTypes.ts:13 | "automation"
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:59 id: "automation_runtime",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:60 label: "Automation Runtime",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:61 type: "automation",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:62 module: "automation",
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:10 ERPAutomationRegistry,
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:11 } from "@/runtime/automation";
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:36 simulateAutomation() {
C:\Users\Admin\terragest\src\runtime\testing\simulation\ERPRuntimeSimulation.ts:37 return ERPAutomationRegistry;
C:\Users\Admin\terragest\src\runtime\workers\ERPWorkersSeed.ts:22 "worker_automation_1",
C:\Users\Admin\terragest\src\runtime\workers\ERPWorkersSeed.ts:24 "LOW_STOCK_AUTOMATION"
C:\Users\Admin\terragest\src\runtime\workers\registry\ERPWorkerRegistry.ts:16 id: "worker_automation_1",
C:\Users\Admin\terragest\src\runtime\workers\registry\ERPWorkerRegistry.ts:17 label: "Automation Worker",
C:\Users\Admin\terragest\src\runtime\workers\registry\ERPWorkerRegistry.ts:18 queue: "automation",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:15 | "automation"
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:29 type: "automation",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:60 type: "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:16 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:38 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:60 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:82 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:104 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:126 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:148 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:170 "automation",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:194 "automation",
C:\Users\Admin\terragest\src\_quarantine\workflow\automations\WorkflowAutomation.ts:14 export const WorkflowAutomation = {
C:\Users\Admin\terragest\src\_quarantine\workflow\notifications\WorkflowNotificationCenter.tsx:29 "Automation exécutée",
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:11 WorkflowAutomation,
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:12 } from "@/workflow/automations/WorkflowAutomation";
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:31 WorkflowAutomation.onProductCreated(
```

## Recherche : audit

```txt
C:\Users\Admin\terragest\src\app\(private)\contrats\audit\page.tsx:7 type="audit"
C:\Users\Admin\terragest\src\app\(private)\contrats\audit\page.tsx:8 actionLabel="Audit"
C:\Users\Admin\terragest\src\app\(private)\exploitations\audit\page.tsx:7 type="audit"
C:\Users\Admin\terragest\src\app\(private)\exploitations\audit\page.tsx:8 actionLabel="Audit"
C:\Users\Admin\terragest\src\app\(private)\interventions\audit\page.tsx:7 type="audit"
C:\Users\Admin\terragest\src\app\(private)\interventions\audit\page.tsx:8 actionLabel="Audit"
C:\Users\Admin\terragest\src\app\(private)\maintenance\audit\page.tsx:7 type="audit"
C:\Users\Admin\terragest\src\app\(private)\maintenance\audit\page.tsx:8 actionLabel="Audit"
C:\Users\Admin\terragest\src\app\(private)\materiels\audit\page.tsx:7 type="audit"
C:\Users\Admin\terragest\src\app\(private)\materiels\audit\page.tsx:8 actionLabel="Audit"
C:\Users\Admin\terragest\src\app\(private)\paiements\audit\page.tsx:7 type="audit"
C:\Users\Admin\terragest\src\app\(private)\paiements\audit\page.tsx:8 actionLabel="Audit"
C:\Users\Admin\terragest\src\app\(private)\produits\audit\page.tsx:7 type="audit"
C:\Users\Admin\terragest\src\app\(private)\produits\audit\page.tsx:8 actionLabel="Audit"
C:\Users\Admin\terragest\src\app\(private)\stocks\audit\page.tsx:7 type="audit"
C:\Users\Admin\terragest\src\app\(private)\stocks\audit\page.tsx:8 actionLabel="Audit"
C:\Users\Admin\terragest\src\app\(private)\terrains\audit\page.tsx:7 type="audit"
C:\Users\Admin\terragest\src\app\(private)\terrains\audit\page.tsx:8 actionLabel="Audit"
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:21 "audit_logs",
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:3 export function ERPAuditTrail() {
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx:42 <p>3. Mise a jour de l'audit</p>
C:\Users\Admin\terragest\src\components\erp\layout\ERPActionBar.tsx:15 <ERPButton variant="ghost" type="button">Audit</ERPButton>
C:\Users\Admin\terragest\src\components\erp\layout\ERPCommandPanel.tsx:32 Actions globales connectables aux workflows, rÃ¨gles et audit.
C:\Users\Admin\terragest\src\components\erp\layout\ERPCommandPanel.tsx:37 <ERPButton variant="secondary" type="button">Journal audit</ERPButton>
C:\Users\Admin\terragest\src\components\erp\layout\ERPTabNavigation.tsx:5 "Audit",
C:\Users\Admin\terragest\src\components\erp\modules\ERPModuleEnterprisePage.tsx:36 label: "Audit",
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPMonitoringMetricsGrid.tsx:23 <ERPStatCard label="Security" value={metrics.securityAudits} helper="Audit logs" />
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:24 ["Audit", snapshot.audit.length],
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:25 ["Security Audit", snapshot.securityAudit.length],
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:34 description="Repository runtime tenant-aware pour events, traces, alerts, workflows, queue jobs et audit."
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityAuditPanel.tsx:6 type ERPSecurityAuditPanelProps = {
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityAuditPanel.tsx:10 export function ERPSecurityAuditPanel({
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityAuditPanel.tsx:12 }: ERPSecurityAuditPanelProps) {
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityAuditPanel.tsx:17 Audit securite
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityAuditPanel.tsx:24 {snapshot.audit.length === 0 ? (
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityAuditPanel.tsx:26 title="Aucun audit"
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityAuditPanel.tsx:31 {snapshot.audit.map((entry) => (
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityDashboard.tsx:10 import { ERPSecurityAuditPanel } from "./ERPSecurityAuditPanel";
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityDashboard.tsx:22 description="Roles, permissions, policies, guards, session runtime et audit securite."
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityDashboard.tsx:30 <ERPSecurityAuditPanel snapshot={snapshot} />
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityMetrics.tsx:18 <ERPStatCard label="Audit" value={snapshot.auditCount} helper="Controles traces" />
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityPanel.tsx:18 label: "Audit logs",
C:\Users\Admin\terragest\src\components\erp\security\index.ts:4 export * from "./ERPSecurityAuditPanel";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:51 case "audit":
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:52 return "Audit";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleToolbar.tsx:22 <option>Vue audit</option>
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:12 const auditEnabled = module.metadata.features?.audit === true;
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:22 Actions operationnelles, workflows et audit discret.
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:28 {auditEnabled && <ERPBadge tone="success">Audit</ERPBadge>}
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:12 | "audit"
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:46 audit: GenericERPTemplate,
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceTabs.tsx:6 "Audit",
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:22 auditId?: string;
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:95 console.log("AUDIT ENTRY CREATED");
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:100 type: "audit",
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:104 "Audit runtime enregistré",
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:146 auditId:
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:147 `AUDIT-${Date.now()}`,
C:\Users\Admin\terragest\src\core\audit\audit-service.ts:1 export type AuditEntry = {
C:\Users\Admin\terragest\src\core\audit\audit-service.ts:7 export function createAuditEntry(
C:\Users\Admin\terragest\src\core\audit\audit-service.ts:8 entry: AuditEntry
C:\Users\Admin\terragest\src\core\audit\audit-service.ts:11 "ERP AUDIT ENTRY",
C:\Users\Admin\terragest\src\core\audit\audit-service.ts:16 id: `AUDIT-${Date.now()}`,
C:\Users\Admin\terragest\src\core\lifecycle\job-lifecycle.ts:20 type: "audit",
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:18 audit?: boolean;
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:137 audit:
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:139 module.metadata.features?.audit
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:15 | "audit"
C:\Users\Admin\terragest\src\core\schemas\exploitations.schema.ts:76 audit: true,
C:\Users\Admin\terragest\src\core\schemas\materiels.schema.ts:68 audit: true,
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:68 audit: true,
C:\Users\Admin\terragest\src\core\schemas\types.ts:42 audit?: boolean;
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:1 export type SecurityAuditEntry = {
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:28 const auditEntries:
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:29 SecurityAuditEntry[] = [];
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:31 export function logSecurityAudit(
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:33 SecurityAuditEntry,
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:37 const auditEntry:
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:38 SecurityAuditEntry = {
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:48 auditEntries.unshift(
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:49 auditEntry
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:53 "ERP SECURITY AUDIT",
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:54 auditEntry.type
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:57 return auditEntry;
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:60 export function getSecurityAudits() {
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:61 return auditEntries;
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:64 export function getAuditsByTenant(
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:67 return auditEntries.filter(
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:74 export function getAuditsByUser(
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:77 return auditEntries.filter(
C:\Users\Admin\terragest\src\features\audit\services\AuditService.ts:13 export const AuditService = {
C:\Users\Admin\terragest\src\features\audit\services\AuditService.ts:18 collection(db, "audit_logs"),
C:\Users\Admin\terragest\src\features\audit\services\AuditService.ts:28 collection(db, "audit_logs"),
C:\Users\Admin\terragest\src\features\audit\types\AuditLog.ts:1 export interface AuditLog {
C:\Users\Admin\terragest\src\features\billing\types\Subscription.ts:2 BaseAuditEntity,
C:\Users\Admin\terragest\src\features\billing\types\Subscription.ts:18 BaseAuditEntity & {
C:\Users\Admin\terragest\src\features\invitations\types\Invitation.ts:2 BaseAuditEntity,
C:\Users\Admin\terragest\src\features\invitations\types\Invitation.ts:16 BaseAuditEntity & {
C:\Users\Admin\terragest\src\features\memberships\types\Membership.ts:2 BaseAuditEntity,
C:\Users\Admin\terragest\src\features\memberships\types\Membership.ts:10 BaseAuditEntity & {
C:\Users\Admin\terragest\src\features\observability\components\AuditTable.tsx:3 import { useAuditEvents }
C:\Users\Admin\terragest\src\features\observability\components\AuditTable.tsx:4 from "@/features/observability/hooks/useAuditEvents";
C:\Users\Admin\terragest\src\features\observability\components\AuditTable.tsx:6 export const AuditTable =
C:\Users\Admin\terragest\src\features\observability\components\AuditTable.tsx:10 useAuditEvents();
C:\Users\Admin\terragest\src\features\observability\components\AuditTable.tsx:33 Audit Trail
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:9 AuditEvent,
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:10 } from "@/features/observability/types/AuditEvent";
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:12 import { AuditService }
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:13 from "@/features/observability/services/AuditService";
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:15 export function useAuditEvents() {
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:21 AuditEvent[]
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:29 await AuditService
C:\Users\Admin\terragest\src\features\observability\services\AuditService.ts:2 AuditEvent,
C:\Users\Admin\terragest\src\features\observability\services\AuditService.ts:3 } from "@/features/observability/types/AuditEvent";
C:\Users\Admin\terragest\src\features\observability\services\AuditService.ts:6 AuditEvent[] = [];
C:\Users\Admin\terragest\src\features\observability\services\AuditService.ts:8 export const AuditService = {
C:\Users\Admin\terragest\src\features\observability\services\AuditService.ts:11 event: AuditEvent
C:\Users\Admin\terragest\src\features\observability\services\AuditService.ts:25 "[AUDIT]",
C:\Users\Admin\terragest\src\features\observability\services\AuditService.ts:33 Promise<AuditEvent[]> {
C:\Users\Admin\terragest\src\features\observability\types\AuditEvent.ts:1 export type AuditSeverity =
C:\Users\Admin\terragest\src\features\observability\types\AuditEvent.ts:6 export type AuditEvent = {
C:\Users\Admin\terragest\src\features\observability\types\AuditEvent.ts:21 AuditSeverity;
C:\Users\Admin\terragest\src\features\organizations\types\Organization.ts:2 BaseAuditEntity,
C:\Users\Admin\terragest\src\features\organizations\types\Organization.ts:12 BaseAuditEntity & {
C:\Users\Admin\terragest\src\features\produits\types\Product.ts:2 BaseAuditEntity,
C:\Users\Admin\terragest\src\features\produits\types\Product.ts:7 BaseAuditEntity & {
C:\Users\Admin\terragest\src\platform\audit\AuditTrail.ts:1 // src/platform/audit/AuditTrail.ts
C:\Users\Admin\terragest\src\platform\audit\AuditTrail.ts:3 export class AuditTrail {
C:\Users\Admin\terragest\src\platform\audit\AuditTrail.ts:11 "[AUDIT]",
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:21 import { SecurityAudit }
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:22 from "@/platform/security/SecurityAudit";
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:69 SecurityAudit.log(
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:82 SecurityAudit.log(
C:\Users\Admin\terragest\src\platform\execution\executors\WorkflowExecutor.ts:112 SecurityAudit.log(
C:\Users\Admin\terragest\src\platform\orchestration\ERPOrchestrator.ts:9 import { initializeERPAudit }
C:\Users\Admin\terragest\src\platform\orchestration\ERPOrchestrator.ts:10 from "@/platform/workflows/ERPAudit";
C:\Users\Admin\terragest\src\platform\orchestration\ERPOrchestrator.ts:27 initializeERPAudit();
C:\Users\Admin\terragest\src\platform\rules\audit\RuleAudit.ts:1 // src/platform/rules/audit/RuleAudit.ts
C:\Users\Admin\terragest\src\platform\rules\audit\RuleAudit.ts:3 export class RuleAudit {
C:\Users\Admin\terragest\src\platform\rules\audit\RuleAudit.ts:13 "[RULE AUDIT]",
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:19 import { RuleAudit }
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:20 from "@/platform/rules/audit/RuleAudit";
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:91 RuleAudit.log(
C:\Users\Admin\terragest\src\platform\rules\runtime\RulePipelineRuntime.ts:111 RuleAudit.log(
C:\Users\Admin\terragest\src\platform\security\SecurityAudit.ts:1 // src/platform/security/SecurityAudit.ts
C:\Users\Admin\terragest\src\platform\security\SecurityAudit.ts:3 export class SecurityAudit {
C:\Users\Admin\terragest\src\platform\security\SecurityAudit.ts:13 "[SECURITY AUDIT]",
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:1 // src/platform/workflows/ERPAudit.ts
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:6 import { AuditTrail }
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:7 from "@/platform/audit/AuditTrail";
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:9 export function initializeERPAudit() {
C:\Users\Admin\terragest\src\platform\workflows\ERPAudit.ts:26 AuditTrail.log(
C:\Users\Admin\terragest\src\runtime\actions\ERPAction.ts:9 | "audit"
C:\Users\Admin\terragest\src\runtime\actions\ERPActionExecutor.ts:21 case "audit":
C:\Users\Admin\terragest\src\runtime\actions\ERPActionExecutor.ts:22 toast.success("Consultation audit");
C:\Users\Admin\terragest\src\runtime\actions\ERPActionRegistry.ts:49 key: "audit",
C:\Users\Admin\terragest\src\runtime\actions\ERPActionRegistry.ts:50 label: "Audit",
C:\Users\Admin\terragest\src\runtime\actions\ERPActionRegistry.ts:51 href: `${basePath}/${safeId}/audit`,
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:39 key: "audit",
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:40 label: "Audit",
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:41 href: `${basePath}/audit`,
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:28 action: "AUDIT",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:29 description: "Audit creation paiement.",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:9 | "AUDIT"
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:39 { type: "audit", label: "Tracer relance automatique" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:62 { type: "audit", label: "Tracer modification produit" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeRules.ts:111 { type: "audit", label: "Tracer relance paiement" },
C:\Users\Admin\terragest\src\runtime\automation-runtime\AutomationRuntimeTypes.ts:26 | "audit"
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:69 if (!module.auditEnabled) {
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:73 code: "AUDIT_DISABLED",
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:74 message: "Audit ERP dÃ©sactivÃ©.",
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:75 recommendation: "Activer auditEnabled.",
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:49 runtimeAuditRegistry,
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:50 } from "./RuntimeAuditRegistry";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:137 getRuntimeAudit() {
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:138 return runtimeAuditRegistry.getEntries();
C:\Users\Admin\terragest\src\runtime\core\RuntimeAuditRegistry.ts:1 export interface RuntimeAuditEntry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeAuditRegistry.ts:16 export class RuntimeAuditRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeAuditRegistry.ts:19 RuntimeAuditEntry[] = [];
C:\Users\Admin\terragest\src\runtime\core\RuntimeAuditRegistry.ts:22 entry: RuntimeAuditEntry
C:\Users\Admin\terragest\src\runtime\core\RuntimeAuditRegistry.ts:49 export const runtimeAuditRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeAuditRegistry.ts:50 new RuntimeAuditRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:18 | "audit"
C:\Users\Admin\terragest\src\runtime\core\RuntimeSecurityRegistry.ts:12 | "audit";
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:4 | "audit";
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:16 | "audit"
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:257 category: "audit",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:275 severity: "audit",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:318 severity: "audit",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:344 severity: "audit",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:366 code: "AUDIT_SENSITIVE_ACTIONS",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:367 label: "Audit des actions sensibles",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:368 module: "audit",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:369 category: "audit",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:370 severity: "audit",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:371 description: "Toute action sensible doit Ãªtre auditÃ©e : contrat, paiement, stock, suppression, statut.",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:36 severity: "audit",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:42 severity: "audit",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:48 severity: "audit",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestInterModuleRules.ts:60 severity: "audit",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptions.ts:25 id: "workflow-completed-to-audit",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeSubscriptions.ts:28 handlerLabel: "Tracer audit exploitation",
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:23 collection(db, "audit_logs"),
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:57 auditEnabled?: boolean;
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:56 "audit",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:70 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:136 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:176 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:220 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:261 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:300 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:469 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:533 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:583 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:624 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:665 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:706 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:747 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:788 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:829 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:870 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:911 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:952 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:993 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1034 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1075 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:54 audit: true,
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPModuleAuditor.ts:4 export class ERPModuleAuditor {
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPModuleAuditor.ts:6 static audit() {
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:33 audit?: boolean;
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:7 import { ERPSecurityAuditStore } from "@/runtime/security";
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:25 securityAudits: ERPSecurityAuditStore.all().length,
C:\Users\Admin\terragest\src\runtime\monitoring\errors\ERPErrorAnalytics.ts:4 import { ERPSecurityAuditStore } from "@/runtime/security";
C:\Users\Admin\terragest\src\runtime\monitoring\errors\ERPErrorAnalytics.ts:10 const denied = ERPSecurityAuditStore.denied();
C:\Users\Admin\terragest\src\runtime\monitoring\metrics\ERPMonitoringMetrics.ts:8 securityAudits: number;
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:7 erpRuntimeAuditTrail,
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:8 } from "./ERPRuntimeAuditTrail";
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:10 export class ERPRuntimeAuditBridge {
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:19 erpRuntimeAuditTrail
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:43 export const erpRuntimeAuditBridge =
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:44 new ERPRuntimeAuditBridge();
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:1 export interface ERPAuditEntry {
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:17 export class ERPRuntimeAuditTrail {
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:20 ERPAuditEntry[] = [];
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:23 entry: ERPAuditEntry
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:47 export const erpRuntimeAuditTrail =
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:48 new ERPRuntimeAuditTrail();
C:\Users\Admin\terragest\src\runtime\observability\index.ts:1 export * from "./ERPRuntimeAuditTrail";
C:\Users\Admin\terragest\src\runtime\observability\index.ts:2 export * from "./ERPRuntimeAuditBridge";
C:\Users\Admin\terragest\src\runtime\observability\generated\achats\achats.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\clients\clients.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\commandes\commandes.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\depenses\depenses.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\devis\devis.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\employes\employes.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\factures\factures.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\fournisseurs\fournisseurs.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\incidents\incidents.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\intrants\intrants.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\livraisons\livraisons.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\parcelles\parcelles.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\recettes\recettes.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\recoltes\recoltes.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\taches\taches.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\observability\generated\vehicules\vehicules.observability.ts:10 audit: true,
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:14 import { AuditStream }
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:15 from "../os/audit/AuditStream";
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:32 private audit =
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:33 new AuditStream();
C:\Users\Admin\terragest\src\runtime\orchestration\MaterielBreakdownFlow.ts:59 this.audit.log(
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:22 PersistentAuditStream
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:24 from "../os/audit/PersistentAuditStream";
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:41 private audit =
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:42 new PersistentAuditStream();
C:\Users\Admin\terragest\src\runtime\orchestration\PersistentMaterielBreakdownFlow.ts:68 await this.audit.log(
C:\Users\Admin\terragest\src\runtime\os\audit\AuditStream.ts:1 export class AuditStream {
C:\Users\Admin\terragest\src\runtime\os\audit\AuditStream.ts:9 "[Audit]",
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:2 AuditRepository
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:4 from "../../persistence/audit/AuditRepository";
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:7 PersistentAuditStream {
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:10 new AuditRepository();
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:23 "[PersistentAudit]",
C:\Users\Admin\terragest\src\runtime\os-enterprise\ERPCommandCenter.ts:35 id: "audit",
C:\Users\Admin\terragest\src\runtime\os-enterprise\ERPCommandCenter.ts:36 label: "Consulter les audits",
C:\Users\Admin\terragest\src\runtime\os-enterprise\ERPCommandCenter.ts:38 href: "/exploitations/audit",
C:\Users\Admin\terragest\src\runtime\os-enterprise\ERPUserContext.ts:4 workspaceMode: "operations" | "direction" | "audit";
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:43 await ERPRuntimePersistenceService.audit.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:49 await ERPRuntimePersistenceService.securityAudit.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:51 action: "audit",
C:\Users\Admin\terragest\src\runtime\persistence\audit\AuditRepository.ts:10 export class AuditRepository {
C:\Users\Admin\terragest\src\runtime\persistence\audit\AuditRepository.ts:13 audit: unknown
C:\Users\Admin\terragest\src\runtime\persistence\audit\AuditRepository.ts:19 "runtime_audit"
C:\Users\Admin\terragest\src\runtime\persistence\audit\AuditRepository.ts:22 audit,
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:12 audit,
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:13 securityAudit,
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:20 ERPRuntimePersistenceService.audit.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:21 ERPRuntimePersistenceService.securityAudit.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:30 audit,
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:31 securityAudit,
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:38 audit.length +
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:39 securityAudit.length,
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPPersistenceCollections.ts:7 audit: "runtime_audit",
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPPersistenceCollections.ts:8 securityAudit: "runtime_security_audit",
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:35 audit:
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:37 ERPPersistenceCollections.audit
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:40 securityAudit:
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:42 ERPPersistenceCollections.securityAudit
C:\Users\Admin\terragest\src\runtime\policies\generated\achats\achats.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\clients\clients.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\commandes\commandes.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\depenses\depenses.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\devis\devis.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\employes\employes.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\factures\factures.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\fournisseurs\fournisseurs.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\incidents\incidents.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\intrants\intrants.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\livraisons\livraisons.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\parcelles\parcelles.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\recettes\recettes.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\recoltes\recoltes.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\taches\taches.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\policies\generated\vehicules\vehicules.policy.ts:11 "audit",
C:\Users\Admin\terragest\src\runtime\production\backup\ERPBackupPlanRegistry.ts:19 key: "audit-log-backup",
C:\Users\Admin\terragest\src\runtime\production\backup\ERPBackupPlanRegistry.ts:20 label: "Audit Log Backup",
C:\Users\Admin\terragest\src\runtime\production\backup\ERPBackupPlanRegistry.ts:21 target: "security and business audit",
C:\Users\Admin\terragest\src\runtime\production\cloud\ERPCloudReadinessRegistry.ts:8 description: "Les variables env existent mais doivent etre auditees.",
C:\Users\Admin\terragest\src\runtime\security\ERPSecuritySeed.ts:14 ERPAccessGuard.can("paiements", "audit");
C:\Users\Admin\terragest\src\runtime\security\ERPSecuritySnapshot.ts:4 import { ERPSecurityAuditStore } from "./audit/ERPSecurityAuditStore";
C:\Users\Admin\terragest\src\runtime\security\ERPSecuritySnapshot.ts:8 const audit = ERPSecurityAuditStore.all();
C:\Users\Admin\terragest\src\runtime\security\ERPSecuritySnapshot.ts:15 audit,
C:\Users\Admin\terragest\src\runtime\security\ERPSecuritySnapshot.ts:16 denied: ERPSecurityAuditStore.denied(),
C:\Users\Admin\terragest\src\runtime\security\ERPSecuritySnapshot.ts:20 auditCount: audit.length,
C:\Users\Admin\terragest\src\runtime\security\ERPSecuritySnapshot.ts:21 deniedCount: ERPSecurityAuditStore.denied().length,
C:\Users\Admin\terragest\src\runtime\security\index.ts:9 export * from "./audit/ERPSecurityAuditLog";
C:\Users\Admin\terragest\src\runtime\security\index.ts:10 export * from "./audit/ERPSecurityAuditStore";
C:\Users\Admin\terragest\src\runtime\security\audit\ERPSecurityAuditLog.ts:1 export type ERPSecurityAuditLevel =
C:\Users\Admin\terragest\src\runtime\security\audit\ERPSecurityAuditLog.ts:6 export type ERPSecurityAuditEntry = {
C:\Users\Admin\terragest\src\runtime\security\audit\ERPSecurityAuditLog.ts:13 level: ERPSecurityAuditLevel;
C:\Users\Admin\terragest\src\runtime\security\audit\ERPSecurityAuditStore.ts:1 import type { ERPSecurityAuditEntry } from "./ERPSecurityAuditLog";
C:\Users\Admin\terragest\src\runtime\security\audit\ERPSecurityAuditStore.ts:3 class ERPSecurityAuditStoreClass {
C:\Users\Admin\terragest\src\runtime\security\audit\ERPSecurityAuditStore.ts:4 private entries: ERPSecurityAuditEntry[] = [];
C:\Users\Admin\terragest\src\runtime\security\audit\ERPSecurityAuditStore.ts:6 add(entry: ERPSecurityAuditEntry) {
C:\Users\Admin\terragest\src\runtime\security\audit\ERPSecurityAuditStore.ts:20 export const ERPSecurityAuditStore =
C:\Users\Admin\terragest\src\runtime\security\audit\ERPSecurityAuditStore.ts:21 new ERPSecurityAuditStoreClass();
C:\Users\Admin\terragest\src\runtime\security\guards\ERPAccessGuard.ts:6 import { ERPSecurityAuditStore } from "../audit/ERPSecurityAuditStore";
C:\Users\Admin\terragest\src\runtime\security\guards\ERPAccessGuard.ts:28 ERPSecurityAuditStore.add({
C:\Users\Admin\terragest\src\runtime\security\guards\ERPAccessGuard.ts:29 id: createId("sec_audit"),
C:\Users\Admin\terragest\src\runtime\security\permissions\ERPPermission.ts:9 | "audit"
C:\Users\Admin\terragest\src\runtime\security\permissions\ERPPermissionRegistry.ts:12 "audit",
C:\Users\Admin\terragest\src\runtime\security\policies\ERPPolicyRegistry.ts:12 "audit",
C:\Users\Admin\terragest\src\runtime\security\policies\ERPPolicyRegistry.ts:23 "audit",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:25 case "audit":
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:26 return "audit.read";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePermission.ts:11 | "audit.read"
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:15 "audit.read",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:28 "audit.read",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:43 "audit.read",
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartRecommendationEngine.ts:8 id: `${module.metadata.key}-audit-review`,
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartRecommendationEngine.ts:10 title: "Verifier l'audit recent",
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartRecommendationEngine.ts:13 actionLabel: "Ouvrir audit",
C:\Users\Admin\terragest\src\runtime\ui\ERPUIComposition.ts:24 tabs: ["Vue generale", "Liste", "Activite", "Workflows", "Audit"],
C:\Users\Admin\terragest\src\runtime\workflow-runtime\index.ts:14 export { WorkflowRuntimeAudit } from "./WorkflowRuntimeAudit";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:3 export class WorkflowRuntimeAudit {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts:5 console.log("WORKFLOW AUDIT", {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:4 import { WorkflowRuntimeAudit } from "./WorkflowRuntimeAudit";
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:16 WorkflowRuntimeAudit.log(instance, "Workflow demarre");
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts:67 WorkflowRuntimeAudit.log(instance, transition.label);
C:\Users\Admin\terragest\src\security\audit\AuditService.ts:1 export const AuditService = {
C:\Users\Admin\terragest\src\security\audit\AuditService.ts:10 "[AUDIT]",
C:\Users\Admin\terragest\src\types\BaseEntity.ts:9 export type BaseAuditEntity =
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:17 "audit",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:39 "audit",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:61 "audit",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:83 "audit",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:105 "audit",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:127 "audit",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:149 "audit",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:171 "audit",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:195 "audit",
```

## Recherche : realtime

```txt
C:\Users\Admin\terragest\src\app\(private)\realtime\page.tsx:1 import { ERPRuntimeRealtimeDashboard } from "@/components/erp/realtime";
C:\Users\Admin\terragest\src\app\(private)\realtime\page.tsx:4 return <ERPRuntimeRealtimeDashboard />;
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:5 import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:12 export const RealtimeActivityFeed = ({
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:18 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\components\dashboard\RealtimeKpiCard.tsx:3 import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
C:\Users\Admin\terragest\src\components\dashboard\RealtimeKpiCard.tsx:14 export const RealtimeKpiCard = ({
C:\Users\Admin\terragest\src\components\dashboard\RealtimeKpiCard.tsx:22 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPMonitoringMetricsGrid.tsx:22 <ERPStatCard label="Realtime" value={metrics.realtimeMessages} helper="Messages" />
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:2 import type { getERPRealtimeSnapshot } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:4 type Snapshot = ReturnType<typeof getERPRealtimeSnapshot>;
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:6 type ERPRealtimeFeedProps = {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:10 export function ERPRealtimeFeed({
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:12 }: ERPRealtimeFeedProps) {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeFeed.tsx:17 Realtime feed
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:2 import type { getERPRealtimeSnapshot } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:4 type Snapshot = ReturnType<typeof getERPRealtimeSnapshot>;
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:6 type ERPRealtimeMetricsProps = {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:10 export function ERPRealtimeMetrics({
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:12 }: ERPRealtimeMetricsProps) {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:15 <ERPStatCard label="Messages" value={snapshot.totalMessages} helper="Flux realtime" />
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:2 import type { getERPRealtimeSnapshot } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:4 type Snapshot = ReturnType<typeof getERPRealtimeSnapshot>;
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:6 type ERPRealtimePresencePanelProps = {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:10 export function ERPRealtimePresencePanel({
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:12 }: ERPRealtimePresencePanelProps) {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:17 FirestoreRuntimeRealtime,
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:20 interface ERPRealtimeSyncBadgeProps {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:24 export function ERPRealtimeSyncBadge({
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:26 }: ERPRealtimeSyncBadgeProps) {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:34 FirestoreRuntimeRealtime.subscribe(
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:3 getERPRealtimeSnapshot,
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:4 seedERPRealtimeRuntime,
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:5 } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:7 import { ERPRealtimeMetrics } from "./ERPRealtimeMetrics";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:8 import { ERPRealtimeFeed } from "./ERPRealtimeFeed";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:9 import { ERPRealtimePresencePanel } from "./ERPRealtimePresencePanel";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:11 seedERPRealtimeRuntime();
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:13 export function ERPRuntimeRealtimeDashboard() {
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:14 const snapshot = getERPRealtimeSnapshot();
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:19 eyebrow="ERP Realtime Runtime"
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:20 title="Realtime Mission Control"
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:24 <ERPRealtimeMetrics snapshot={snapshot} />
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:27 <ERPRealtimeFeed snapshot={snapshot} />
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx:28 <ERPRealtimePresencePanel snapshot={snapshot} />
C:\Users\Admin\terragest\src\components\erp\realtime\index.ts:1 export * from "./ERPRealtimeMetrics";
C:\Users\Admin\terragest\src\components\erp\realtime\index.ts:2 export * from "./ERPRealtimeFeed";
C:\Users\Admin\terragest\src\components\erp\realtime\index.ts:3 export * from "./ERPRealtimePresencePanel";
C:\Users\Admin\terragest\src\components\erp\realtime\index.ts:4 export * from "./ERPRuntimeRealtimeDashboard";
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:14 } from "@/core/realtime/runtime-realtime-channel";
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsChannelsPanel.tsx:32 Canaux realtime runtime.
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsDashboard.tsx:34 title="Realtime Live Stream Platform"
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsDashboard.tsx:35 description="Live runtime streams, realtime events, workers feeds et observability timeline."
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsMetricsGrid.tsx:31 helper="Realtime channels"
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:11 export const ProductRealtimeForm = () => {
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:31 "ERP REALTIME SUBSCRIBED",
C:\Users\Admin\terragest\src\core\realtime\runtime-realtime-channel.ts:61 "ERP REALTIME EVENT",
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:50 "[MATERIELS REALTIME]",
C:\Users\Admin\terragest\src\features\achats\achats.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:20 realtime: false,
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:28 realtime: true,
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:36 realtime: true,
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:44 realtime: false,
C:\Users\Admin\terragest\src\features\billing\types\FeatureFlags.ts:15 REALTIME: [
C:\Users\Admin\terragest\src\features\clients\clients.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\commandes\commandes.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\depenses\depenses.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\devis\devis.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\employes\employes.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\exploitations\exploitations.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\factures\factures.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\fournisseurs\fournisseurs.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\incidents\incidents.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\interventions\interventions.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\intrants\intrants.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\livraisons\livraisons.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\materiels\materiels.feature.ts:20 "realtime",
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:2 RuntimeRealtimeGateway
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:4 from "../../../runtime/realtime/gateway/RuntimeRealtimeGateway";
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:7 MaterielRealtimeGateway {
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:9 private realtime =
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:10 new RuntimeRealtimeGateway();
C:\Users\Admin\terragest\src\features\materiels\realtime\MaterielRealtimeGateway.ts:17 this.realtime.publish(
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:7 MaterielRealtimeGateway
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:9 from "../realtime/MaterielRealtimeGateway";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:90 private realtime =
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:91 new MaterielRealtimeGateway();
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:151 this.realtime.publish(
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:9 import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:16 export const RealtimeNotifications = ({
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:22 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:19 WorkflowExecutionRealtimeService {
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:15 WorkflowExecutionRealtimeService
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:17 from "../../services/workflows/WorkflowExecutionRealtimeService";
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:24 new WorkflowExecutionRealtimeService();
C:\Users\Admin\terragest\src\features\parcelles\parcelles.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\platform\components\runtime\RealtimeActivityPanel.tsx:2 RealtimeActivityPanel() {
C:\Users\Admin\terragest\src\features\platform\components\runtime\RealtimeActivityPanel.tsx:22 Realtime Runtime Stream
C:\Users\Admin\terragest\src\features\platform\components\runtime\RealtimeActivityPanel.tsx:27 connected to realtime gateway.
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:7 import RealtimeActivityPanel
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:8 from "../components/runtime/RealtimeActivityPanel";
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:14 RealtimeRuntimeDashboard() {
C:\Users\Admin\terragest\src\features\platform\dashboards\RealtimeRuntimeDashboard.tsx:31 <RealtimeActivityPanel />
C:\Users\Admin\terragest\src\features\produits\produits.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\recettes\recettes.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\recoltes\recoltes.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\stocks\stocks.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\taches\taches.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\terrains\terrains.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\features\vehicules\vehicules.feature.ts:31 "realtime",
C:\Users\Admin\terragest\src\hooks\useRealtime.ts:8 export const useRealtime =
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:17 interface RealtimeOptions {
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:24 export const useRealtimeCollection = ({
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:27 }: RealtimeOptions) => {
C:\Users\Admin\terragest\src\hooks\runtime\useRuntimeChannel.ts:10 } from "@/core/realtime/runtime-realtime-channel";
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:71 if (module.metadata.features?.realtime) {
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:72 capabilities.push("realtime");
C:\Users\Admin\terragest\src\platform\registry\FeatureDefinition.ts:8 | "realtime"
C:\Users\Admin\terragest\src\platform\runtime\RuntimeBootstrap.ts:19 "[BOOTSTRAP] Runtime realtime ready"
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:25 "realtime",
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:33 "realtime",
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:55 "realtime",
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:62 "realtime",
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts:30 description: "Connecter le Realtime Gateway a Firebase, WebSocket ou SSE.",
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:22 | "realtime"
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:18 description: "Repositories, queries, mutations et realtime sont branches.",
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:12 export class FirestoreRuntimeRealtime {
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:14 FirestoreRuntimeRealtime,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:15 } from "./FirestoreRuntimeRealtime";
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:60 realtimeEnabled?: boolean;
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:61 "realtime",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:71 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:137 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:177 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:221 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:262 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:301 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:470 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:534 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:584 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:625 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:666 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:707 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:748 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:789 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:830 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:871 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:912 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:953 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:994 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1035 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1076 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:55 realtime: true,
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:34 realtime?: boolean;
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:6 import { getERPRealtimeSnapshot } from "@/runtime/realtime";
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:14 const realtime = getERPRealtimeSnapshot();
C:\Users\Admin\terragest\src\runtime\monitoring\ERPMonitoringSnapshot.ts:24 realtimeMessages: realtime.totalMessages,
C:\Users\Admin\terragest\src\runtime\monitoring\metrics\ERPMonitoringMetrics.ts:7 realtimeMessages: number;
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:28 { id: "realtime", label: "Realtime", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:42 { from: "events", to: "realtime", label: "streams" },
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:2 ERPRealtimeBus,
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:3 } from "./bus/ERPRealtimeBus";
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:6 ERPRealtimePresenceStore,
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:7 } from "./presence/ERPRealtimePresence";
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:15 export function seedERPRealtimeRuntime() {
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:24 ERPRealtimePresenceStore.upsert({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:33 ERPRealtimePresenceStore.upsert({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:42 ERPRealtimeBus.publish({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:51 ERPRealtimeBus.publish({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:60 ERPRealtimeBus.publish({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:69 ERPRealtimeBus.publish({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:78 ERPRealtimeBus.publish({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:87 ERPRealtimeBus.publish({
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:90 title: "Runtime realtime actif",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:91 description: "Bus interne realtime initialise.",
C:\Users\Admin\terragest\src\runtime\realtime\index.ts:1 export * from "./channels/ERPRealtimeChannel";
C:\Users\Admin\terragest\src\runtime\realtime\index.ts:2 export * from "./bus/ERPRealtimeBus";
C:\Users\Admin\terragest\src\runtime\realtime\index.ts:3 export * from "./presence/ERPRealtimePresence";
C:\Users\Admin\terragest\src\runtime\realtime\index.ts:4 export * from "./snapshots/ERPRealtimeSnapshot";
C:\Users\Admin\terragest\src\runtime\realtime\index.ts:5 export * from "./ERPRealtimeSeed";
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:2 RuntimeRealtimeGateway
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:4 from "./gateway/RuntimeRealtimeGateway";
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:6 const realtime =
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:7 new RuntimeRealtimeGateway();
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:9 realtime.publish(
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:17 realtime.publish(
C:\Users\Admin\terragest\src\runtime\realtime\simulateRealtimeRuntime.ts:25 realtime.publish(
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:2 ERPRealtimeMessage,
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:3 ERPRealtimeChannelType,
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:4 } from "../channels/ERPRealtimeChannel";
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:6 type ERPRealtimeSubscriber = (
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:7 message: ERPRealtimeMessage
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:10 class ERPRealtimeBusClass {
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:11 private messages: ERPRealtimeMessage[] = [];
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:12 private subscribers: ERPRealtimeSubscriber[] = [];
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:14 publish(message: ERPRealtimeMessage) {
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:23 subscribe(subscriber: ERPRealtimeSubscriber) {
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:36 byChannel(channel: ERPRealtimeChannelType) {
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:43 export const ERPRealtimeBus =
C:\Users\Admin\terragest\src\runtime\realtime\bus\ERPRealtimeBus.ts:44 new ERPRealtimeBusClass();
C:\Users\Admin\terragest\src\runtime\realtime\channels\ERPRealtimeChannel.ts:1 export type ERPRealtimeChannelType =
C:\Users\Admin\terragest\src\runtime\realtime\channels\ERPRealtimeChannel.ts:10 export type ERPRealtimeMessage = {
C:\Users\Admin\terragest\src\runtime\realtime\channels\ERPRealtimeChannel.ts:12 channel: ERPRealtimeChannelType;
C:\Users\Admin\terragest\src\runtime\realtime\gateway\RuntimeRealtimeGateway.ts:12 RuntimeRealtimeGateway {
C:\Users\Admin\terragest\src\runtime\realtime\gateway\RuntimeRealtimeGateway.ts:36 "[Realtime Gateway]",
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:1 export type ERPRealtimePresence = {
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:10 class ERPRealtimePresenceStoreClass {
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:11 private users: ERPRealtimePresence[] = [];
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:13 upsert(user: ERPRealtimePresence) {
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:33 export const ERPRealtimePresenceStore =
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:34 new ERPRealtimePresenceStoreClass();
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:2 ERPRealtimeBus,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:3 } from "../bus/ERPRealtimeBus";
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:6 ERPRealtimePresenceStore,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:7 } from "../presence/ERPRealtimePresence";
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:9 export function getERPRealtimeSnapshot() {
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:10 const messages = ERPRealtimeBus.all();
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:11 const presence = ERPRealtimePresenceStore.all();
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:18 events: ERPRealtimeBus.byChannel("events").length,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:19 workflows: ERPRealtimeBus.byChannel("workflows").length,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:20 automation: ERPRealtimeBus.byChannel("automation").length,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:21 queue: ERPRealtimeBus.byChannel("queue").length,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:22 alerts: ERPRealtimeBus.byChannel("alerts").length,
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:23 system: ERPRealtimeBus.byChannel("system").length,
C:\Users\Admin\terragest\src\runtime\realtime\websocket\RuntimeWebSocketServer.ts:7 "[Realtime] WebSocket server started"
C:\Users\Admin\terragest\src\runtime\realtime\websocket\RuntimeWebSocketServer.ts:17 "[Realtime Broadcast]",
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:2 ERPRealtimeGateway,
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:3 } from "./gateway/ERPRealtimeGateway";
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:15 ERPRealtimeGateway.publish({
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:22 ERPRealtimeGateway.publish({
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:29 ERPRealtimeGateway.publish({
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:36 ERPRealtimeGateway.publish({
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:43 ERPRealtimeGateway.refreshMetrics();
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSnapshot.ts:2 ERPRealtimeGateway,
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSnapshot.ts:3 } from "./gateway/ERPRealtimeGateway";
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSnapshot.ts:18 ERPRealtimeGateway.channels(),
C:\Users\Admin\terragest\src\runtime\streams\index.ts:10 export * from "./gateway/ERPRealtimeGateway";
C:\Users\Admin\terragest\src\runtime\streams\gateway\ERPRealtimeGateway.ts:24 export const ERPRealtimeGateway = {
C:\Users\Admin\terragest\src\saas\features\FeatureFlagService.ts:11 "REALTIME",
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:42 realtime:
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:44 "REALTIME"
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesRealtimeWidget.tsx:9 export function AlertesRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsRealtimeWidget.tsx:9 export function ClientsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsRealtimeWidget.tsx:9 export function ContratsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsRealtimeWidget.tsx:9 export function ExploitationsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesRealtimeWidget.tsx:9 export function FacturesRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursRealtimeWidget.tsx:9 export function FournisseursRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsRealtimeWidget.tsx:9 export function InterventionsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceRealtimeWidget.tsx:9 export function MaintenanceRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsRealtimeWidget.tsx:9 export function MaterielsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileRealtimeWidget.tsx:9 export function MobileRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringRealtimeWidget.tsx:9 export function MonitoringRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockRealtimeWidget.tsx:9 export function MouvementsStockRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsRealtimeWidget.tsx:9 export function PaiementsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsRealtimeWidget.tsx:9 export function ProductionsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesRealtimeWidget.tsx:9 export function RecoltesRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncRealtimeWidget.tsx:9 export function SyncRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsRealtimeWidget.tsx:9 export function TerrainsRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursRealtimeWidget.tsx:9 export function UtilisateursRealtimeWidget({
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursRealtimeWidget.tsx:26 Realtime data placeholder
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:22 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:44 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:66 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:88 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:110 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:132 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:154 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:176 "realtime"
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:200 "realtime"
```

## Recherche : observability

```txt
C:\Users\Admin\terragest\src\app\(private)\observability\page.tsx:2 ERPRuntimeObservabilityDashboard,
C:\Users\Admin\terragest\src\app\(private)\observability\page.tsx:3 } from "@/components/erp/observability";
C:\Users\Admin\terragest\src\app\(private)\observability\page.tsx:8 <ERPRuntimeObservabilityDashboard />
C:\Users\Admin\terragest\src\components\erp\command-center\ERPCommandCenter.tsx:97 Observability, supervision, runtime timeline,
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPMonitoringDashboard.tsx:16 title="Advanced Observability"
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPSystemHealth.tsx:12 ["Observability", "warning"],
C:\Users\Admin\terragest\src\components\erp\observability\ERPAlertsPanel.tsx:2 ERPObservabilityTimeline,
C:\Users\Admin\terragest\src\components\erp\observability\ERPAlertsPanel.tsx:3 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\components\erp\observability\ERPAlertsPanel.tsx:8 ERPObservabilityTimeline.alerts();
C:\Users\Admin\terragest\src\components\erp\observability\ERPEventsTimeline.tsx:2 ERPObservabilityTimeline,
C:\Users\Admin\terragest\src\components\erp\observability\ERPEventsTimeline.tsx:3 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\components\erp\observability\ERPEventsTimeline.tsx:8 ERPObservabilityTimeline.events();
C:\Users\Admin\terragest\src\components\erp\observability\ERPObservabilityCenter.tsx:6 export function ERPObservabilityCenter() {
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:7 seedERPRuntimeObservability,
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:8 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:22 seedERPRuntimeObservability();
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:24 export function ERPRuntimeObservabilityDashboard() {
C:\Users\Admin\terragest\src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx:30 eyebrow="ERP Observability"
C:\Users\Admin\terragest\src\components\erp\observability\ERPTracesPanel.tsx:2 ERPObservabilityTimeline,
C:\Users\Admin\terragest\src\components\erp\observability\ERPTracesPanel.tsx:3 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\components\erp\observability\ERPTracesPanel.tsx:8 ERPObservabilityTimeline.traces();
C:\Users\Admin\terragest\src\components\erp\observability\index.ts:7 export * from "./ERPRuntimeObservabilityDashboard";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatus.tsx:18 name: "Observability",
C:\Users\Admin\terragest\src\components\erp\streams\ERPStreamsDashboard.tsx:35 description="Live runtime streams, realtime events, workers feeds et observability timeline."
C:\Users\Admin\terragest\src\components\erp\testing\ERPTestingDashboard.tsx:35 description="Validation runtime, workflows, workers, securite, multi-tenant et observability."
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkerQueue.tsx:20 name: "observability-worker",
C:\Users\Admin\terragest\src\core\layout\Sidebar.tsx:15 ["Observability", "/observability"],
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:144 module.metadata.features?.observability
C:\Users\Admin\terragest\src\features\achats\achats.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\clients\clients.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\commandes\commandes.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\depenses\depenses.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\devis\devis.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\employes\employes.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\exploitations\exploitations.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\factures\factures.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\fournisseurs\fournisseurs.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\incidents\incidents.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\interventions\interventions.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\intrants\intrants.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\livraisons\livraisons.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\materiels\materiels.feature.ts:19 "observability",
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:6 export const ObservabilityFeature:
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:10 "observability",
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:13 "Observability",
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:22 "/observability",
C:\Users\Admin\terragest\src\features\observability\observability.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\observability\components\AuditTable.tsx:4 from "@/features/observability/hooks/useAuditEvents";
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:10 } from "@/features/observability/types/AuditEvent";
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:13 from "@/features/observability/services/AuditService";
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:7 import { RuntimeObservabilityService }
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:8 from "../services/RuntimeObservabilityService";
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:20 new RuntimeObservabilityService();
C:\Users\Admin\terragest\src\features\observability\services\AuditService.ts:3 } from "@/features/observability/types/AuditEvent";
C:\Users\Admin\terragest\src\features\observability\services\RuntimeObservabilityService.ts:4 export class RuntimeObservabilityService {
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:19 export class LiveObservabilityService {
C:\Users\Admin\terragest\src\features\observability\stores\observabilityStore.ts:1 export const observabilityStore = {
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:16 LiveObservabilityService
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:18 from "../../services/live/LiveObservabilityService";
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:31 new LiveObservabilityService();
C:\Users\Admin\terragest\src\features\parcelles\parcelles.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\platform\components\runtime\LiveActivityPanel.tsx:2 from "../../../observability/widgets/live/LiveEventStream";
C:\Users\Admin\terragest\src\features\platform\components\runtime\RuntimeConsole.tsx:2 from "../../../observability/widgets/live/EventReplayConsole";
C:\Users\Admin\terragest\src\features\platform\dashboards\EnterpriseSupervisionDashboard.tsx:2 from "../../observability/dashboards/LiveRuntimeDashboard";
C:\Users\Admin\terragest\src\features\produits\produits.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\recettes\recettes.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\recoltes\recoltes.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\runtime-supervision\RuntimeSupervisionDashboard.tsx:11 from "@/runtime/observability/RuntimeLogsPanel";
C:\Users\Admin\terragest\src\features\stocks\stocks.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\taches\taches.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\terrains\terrains.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\features\vehicules\vehicules.feature.ts:30 "observability",
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:46 ObservabilityFeature
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:48 from "@/features/observability/observability.feature";
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:67 if (module.metadata.features?.observability) {
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:68 capabilities.push("observability");
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:134 ObservabilityFeature,
C:\Users\Admin\terragest\src\platform\events\DomainEvents.ts:4 from "@/platform/observability/EventStore";
C:\Users\Admin\terragest\src\platform\events\DomainEvents.ts:7 from "@/platform/observability/MetricsRegistry";
C:\Users\Admin\terragest\src\platform\intelligence\RuntimeAnomalyDetector.ts:4 from "@/platform/observability/MetricsRegistry";
C:\Users\Admin\terragest\src\platform\monitoring\ERPMonitoringService.ts:7 from "@/platform/observability/MetricsRegistry";
C:\Users\Admin\terragest\src\platform\monitoring\ERPMonitoringService.ts:10 from "@/platform/observability/EventStore";
C:\Users\Admin\terragest\src\platform\observability\ERPLogger.ts:1 // src/platform/observability/ERPLogger.ts
C:\Users\Admin\terragest\src\platform\observability\EventStore.ts:1 // src/platform/observability/EventStore.ts
C:\Users\Admin\terragest\src\platform\observability\MetricsRegistry.ts:1 // src/platform/observability/MetricsRegistry.ts
C:\Users\Admin\terragest\src\platform\registry\FeatureDefinition.ts:7 | "observability"
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:24 "observability",
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:61 "observability",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:23 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:89 if (!module.observabilityEnabled) {
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:93 code: "OBSERVABILITY_DISABLED",
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:95 recommendation: "Activer observabilityEnabled.",
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:26 | "observability";
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:1 export interface RuntimeObservabilityEntry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:12 export class RuntimeObservabilityRegistry {
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:17 RuntimeObservabilityEntry
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:21 entry: RuntimeObservabilityEntry
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:30 getModuleObservability(
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:47 export const runtimeObservabilityRegistry =
C:\Users\Admin\terragest\src\runtime\core\RuntimeObservabilityRegistry.ts:48 new RuntimeObservabilityRegistry();
C:\Users\Admin\terragest\src\runtime\core\RuntimePipeline.ts:9 "observability",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:18 RuntimeObservabilityEngine,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:19 } from "@/runtime/observability/RuntimeObservabilityEngine";
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:39 observabilityEngine?: RuntimeBridgeTarget;
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:183 observabilityEngine:
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:184 dependencies.observabilityEngine ??
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:185 RuntimeObservabilityEngine,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:218 resolvedDependencies.observabilityEngine,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:286 await resolvedDependencies.observabilityEngine?.log?.({
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:59 observabilityEnabled?: boolean;
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:60 "observability",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:219 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:537 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:587 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:628 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:669 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:710 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:751 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:792 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:833 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:874 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:915 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:956 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:997 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1038 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1079 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:58 observability: true,
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:32 observability?: boolean;
C:\Users\Admin\terragest\src\runtime\monitoring\ConnectedRuntimeEventPublisher.ts:9 from "../../features/observability/stores/live/liveEventStore";
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:11 LiveObservabilityService
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:13 from "../../features/observability/services/live/LiveObservabilityService";
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:18 new LiveObservabilityService();
C:\Users\Admin\terragest\src\runtime\monitoring\errors\ERPErrorAnalytics.ts:1 import { ERPAlertStore } from "@/runtime/observability";
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:24 { id: "observability", label: "Observability", group: "runtime" },
C:\Users\Admin\terragest\src\runtime\monitoring\topology\ERPDependencyGraph.ts:37 { from: "events", to: "observability", label: "timeline" },
C:\Users\Admin\terragest\src\runtime\observability\ERPObservabilityTimeline.ts:5 export interface ERPObservabilityTimelineItem
C:\Users\Admin\terragest\src\runtime\observability\ERPObservabilityTimeline.ts:13 export class ERPObservabilityTimeline {
C:\Users\Admin\terragest\src\runtime\observability\ERPObservabilityTimeline.ts:16 ERPObservabilityTimelineItem[] = [];
C:\Users\Admin\terragest\src\runtime\observability\ERPObservabilityTimeline.ts:40 ERPObservabilityTimelineItem
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:15 export function seedERPRuntimeObservability() {
C:\Users\Admin\terragest\src\runtime\observability\index.ts:3 export * from "./ERPObservabilityTimeline";
C:\Users\Admin\terragest\src\runtime\observability\index.ts:4 export * from "./seedERPRuntimeObservability";
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:14 from "@/runtime/observability/RuntimeLog";
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:16 export class RuntimeObservabilityEngine {
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:2 ERPObservabilityTimeline,
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:3 } from "./ERPObservabilityTimeline";
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:5 export function seedERPRuntimeObservability() {
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:6 ERPObservabilityTimeline.add({
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:7 id: "observability-1",
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:8 title: "Runtime observability initialized",
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:9 description: "Le module observability ERP est initialisé.",
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:11 action: "observability.bootstrap",
C:\Users\Admin\terragest\src\runtime\observability\generated\achats\achats.observability.ts:1 export const AchatsObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\clients\clients.observability.ts:1 export const ClientsObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\commandes\commandes.observability.ts:1 export const CommandesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\depenses\depenses.observability.ts:1 export const DepensesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\devis\devis.observability.ts:1 export const DevisObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\employes\employes.observability.ts:1 export const EmployesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\factures\factures.observability.ts:1 export const FacturesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\fournisseurs\fournisseurs.observability.ts:1 export const FournisseursObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\incidents\incidents.observability.ts:1 export const IncidentsObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\intrants\intrants.observability.ts:1 export const IntrantsObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\livraisons\livraisons.observability.ts:1 export const LivraisonsObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\parcelles\parcelles.observability.ts:1 export const ParcellesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\recettes\recettes.observability.ts:1 export const RecettesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\recoltes\recoltes.observability.ts:1 export const RecoltesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\taches\taches.observability.ts:1 export const TachesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\generated\vehicules\vehicules.observability.ts:1 export const VehiculesObservability = {
C:\Users\Admin\terragest\src\runtime\observability\timeline\ERPObservabilityTimeline.ts:13 export const ERPObservabilityTimeline = {
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:8 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\runtime\workflows\engine\WorkflowExecutor.ts:14 from "@/features/observability/stores/workflows/workflowExecutionStore";
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:7 } from "@/runtime/observability";
C:\Users\Admin\terragest\src\ui\theme\module.colors.ts:23 observability:
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:21 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:43 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:65 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:87 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:109 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:131 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:153 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:175 "observability",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:199 "observability",
```

## Recherche : createBusinessModule

```txt
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:3 createBusinessModule,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:556 createBusinessModule({
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:12 export function createBusinessModule(
C:\Users\Admin\terragest\src\runtime\modules\factory\index.ts:1 export * from "./createBusinessModule";
```

## Recherche : ERPModuleBuilder

```txt
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:5 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:54 const table = ERPModuleBuilder.buildTable(module);
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:7 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:59 ERPModuleBuilder.buildForm(module);
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:3 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:15 const details = ERPModuleBuilder.buildDetails(module);
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:3 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:10 const form = ERPModuleBuilder.buildForm(module);
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:4 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:43 const table = ERPModuleBuilder.buildTable(module);
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:8 ERPModuleBuilder,
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:49 return ERPModuleBuilder
C:\Users\Admin\terragest\src\runtime\modules\index.ts:20 ERPModuleBuilder,
C:\Users\Admin\terragest\src\runtime\modules\index.ts:25 } from "./builders/ERPModuleBuilder";
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:36 export class ERPModuleBuilder {
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimeFormFactory.ts:2 import { ERPModuleBuilder } from "../builders/ERPModuleBuilder";
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimeFormFactory.ts:6 return ERPModuleBuilder.buildForm(module);
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:2 import { ERPModuleBuilder } from "../builders/ERPModuleBuilder";
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:8 const runtime = ERPModuleBuilder.buildRuntime(module);
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimeTableFactory.ts:2 import { ERPModuleBuilder } from "../builders/ERPModuleBuilder";
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimeTableFactory.ts:6 return ERPModuleBuilder.buildTable(module);
```

## Recherche : businessFields

```txt
C:\Users\Admin\terragest\src\runtime\modules\factory\index.ts:2 export * from "./businessFields";
```

## Recherche : schema:

```txt
C:\Users\Admin\terragest\src\components\erp\forms\ERPFormRenderer.tsx:6 schema: ERPGeneratedSchema;
C:\Users\Admin\terragest\src\components\erp\runtime-ui\ERPDataTableRuntime.tsx:5 schema: ERPGeneratedSchema;
C:\Users\Admin\terragest\src\core\schemas\exploitations.schema.ts:3 export const exploitationsSchema: ERPModuleSchema = {
C:\Users\Admin\terragest\src\core\schemas\materiels.schema.ts:3 export const materielsSchema: ERPModuleSchema = {
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:3 export const terrainsSchema: ERPModuleSchema = {
C:\Users\Admin\terragest\src\runtime\generation\ERPPageGenerationEngine.tsx:19 schema:
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:63 schema: ERPModuleSchema;
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:29 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:76 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:140 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:181 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:224 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:265 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:306 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:473 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:541 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:591 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:632 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:673 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:714 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:755 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:796 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:837 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:878 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:919 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:960 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1001 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1042 schema: {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1083 schema: {
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:13 schema: module.schema,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:75 schema: {
C:\Users\Admin\terragest\src\runtime\registry\types.ts:48 schema: ERPGeneratedSchema;
C:\Users\Admin\terragest\src\runtime\schemas\ERPBusinessSchemaRegistry.ts:52 schema: ERPBusinessSchema
C:\Users\Admin\terragest\src\runtime\ui\ERPDynamicFormFactory.tsx:15 schema:
C:\Users\Admin\terragest\src\runtime\ui\ERPDynamicTableFactory.tsx:12 schema: ERPBusinessSchema;
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\ExploitationsBusinessSchema.ts:5 export const ExploitationsBusinessSchema:
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\MaterielsBusinessSchema.ts:5 export const MaterielsBusinessSchema:
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\ProduitsBusinessSchema.ts:5 export const ProduitsBusinessSchema:
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\StocksBusinessSchema.ts:5 export const StocksBusinessSchema:
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\TerrainsBusinessSchema.ts:5 export const TerrainsBusinessSchema:
```

## Recherche : collection:

```txt
C:\Users\Admin\terragest\src\runtime\data\adapters\ERPStorageAdapter.ts:3 collection: string,
C:\Users\Admin\terragest\src\runtime\data\adapters\ERPStorageAdapter.ts:8 collection: string,
C:\Users\Admin\terragest\src\runtime\data\adapters\ERPStorageAdapter.ts:14 collection: string,
C:\Users\Admin\terragest\src\runtime\data\adapters\ERPStorageAdapter.ts:19 collection: string
C:\Users\Admin\terragest\src\runtime\data\adapters\MemoryERPStorageAdapter.ts:12 collection: string,
C:\Users\Admin\terragest\src\runtime\data\adapters\MemoryERPStorageAdapter.ts:26 collection: string,
C:\Users\Admin\terragest\src\runtime\data\adapters\MemoryERPStorageAdapter.ts:45 collection: string,
C:\Users\Admin\terragest\src\runtime\data\adapters\MemoryERPStorageAdapter.ts:59 collection: string
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:48 collection: string;
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:7 collection: string;
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:19 collection: string;
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:25 collection: string;
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:40 collection: module.schema.collection,
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:56 collection: module.schema.collection,
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:66 collection: module.schema.collection,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:30 collection: "utilisateurs",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:78 collection: "produits",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:142 collection: "stocks",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:183 collection: "mouvements",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:226 collection: "maintenance",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:267 collection: "interventions",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:308 collection: "terrains",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:475 collection: "fournisseurs",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:542 collection: "clients",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:592 collection: "factures",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:633 collection: "devis",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:674 collection: "achats",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:715 collection: "livraisons",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:756 collection: "employes",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:797 collection: "taches",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:838 collection: "incidents",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:879 collection: "vehicules",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:920 collection: "parcelles",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:961 collection: "recoltes",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1002 collection: "intrants",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1043 collection: "depenses",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:1084 collection: "recettes",
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:78 collection: key,
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:39 collection: string;
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:138 collection: string;
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPInMemoryPersistenceDriver.ts:13 collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPInMemoryPersistenceDriver.ts:46 collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPInMemoryPersistenceDriver.ts:57 collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPPersistenceDriver.ts:4 collection: string;
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPPersistenceDriver.ts:12 collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPPersistenceDriver.ts:17 collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPPersistenceDriver.ts:22 collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\repositories\ERPRuntimeRepository.ts:20 private readonly collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\repositories\ERPRuntimeRepository.ts:37 collection: this.collection,
```

## Recherche : timestamps

```txt
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:37 timestamps?: boolean;
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:26 timestamps: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:31 timestamps: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:79 timestamps: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:143 timestamps: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:184 timestamps: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:227 timestamps: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:268 timestamps: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:309 timestamps: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:476 timestamps: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:543 timestamps: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:71 timestamps: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:80 timestamps: true,
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:40 timestamps?: boolean;
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:140 timestamps?: boolean;
```

## Recherche : softDelete

```txt
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:38 softDelete?: boolean;
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:27 softDelete: false,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:32 softDelete: false,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:80 softDelete: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:144 softDelete: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:185 softDelete: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:228 softDelete: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:269 softDelete: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:310 softDelete: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:477 softDelete: true,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:544 softDelete: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:72 softDelete: true,
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:82 softDelete: true,
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:41 softDelete?: boolean;
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:141 softDelete?: boolean;
```

# 9. Analyse automatique des modules

## Modules manuels dÃ©tectÃ©s

- utilisateurs
- produits
- stocks
- mouvements
- maintenance
- interventions
- terrains
- fournisseurs
- clients
- factures
- devis
- achats
- livraisons
- employes
- taches
- incidents
- vehicules
- parcelles
- recoltes
- intrants
- depenses
- recettes

## Modules normalisÃ©s avec createBusinessModule

- commandes

# 10. SynthÃ¨se

- Ce qui existe dÃ©jÃ  :
- Ce qui est dupliquÃ© :
- Ce qui doit Ãªtre consolidÃ© :
- Ce qui ne doit pas Ãªtre recrÃ©Ã© :
- Prochaine migration recommandÃ©e :
