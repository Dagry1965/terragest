Write-Host ""
Write-Host "================================="
Write-Host " ERP MODULE AUDIT"
Write-Host "================================="
Write-Host ""

pnpm exec tsx -e "import { ERPModuleAuditor } from './src/runtime/modules/lifecycle/ERPModuleAuditor'; console.log(ERPModuleAuditor.audit())"

Write-Host ""
Write-Host "Audit terminé."
Write-Host ""