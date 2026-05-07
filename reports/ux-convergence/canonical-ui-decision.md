# Terragest ERP - UI Canonical Decision

## CANONICAL

Sidebar:
src/core/layout/Sidebar.tsx

Topbar:
src/core/layout/Topbar.tsx

Shell:
src/core/layout/AppShell.tsx

DataTable:
src/components/erp/datatable/ERPDataTable.tsx

Card:
src/components/erp/theme/ERPCard.tsx

Timeline:
src/components/erp/runtime-timeline/ERPRuntimeTimeline.tsx

Workflow UI:
src/runtime/workflow-ui/*

## DEPRECATED LAYOUT DUPLICATES

src/components/layout/Sidebar.tsx
src/components/navigation/Sidebar.tsx
src/components/sidebar/AppSidebar.tsx
src/components/sidebar/ERPSidebar.tsx
src/ui/sidebar/ERPSidebar.tsx
src/components/layout/Topbar.tsx
src/components/navigation/Topbar.tsx
src/components/topbar/AppTopbar.tsx
src/components/topbar/ERPTopbar.tsx
src/ui/topbar/ERPTopbar.tsx

## RULE

Do not delete yet.
Do not create new UI duplicates.
All new ERP screens must use the canonical components.
