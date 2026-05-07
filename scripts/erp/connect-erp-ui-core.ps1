Write-Host "=== TERRAGEST_V2 - CONNECT ERP UI CORE ===" -ForegroundColor Cyan

$privateDir = "src/app/(private)"

New-Item -ItemType Directory -Force $privateDir | Out-Null

@'
import { ReactNode } from "react";
import { ErpShell } from "@/components/erp/shell/ErpShell";

type Props = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: Props) {
  return <ErpShell>{children}</ErpShell>;
}
'@ | Set-Content -Encoding UTF8 "$privateDir/layout.tsx"

@'
import { ErpDashboard } from "@/components/erp/dashboard/ErpDashboard";

export default function DashboardPage() {
  return <ErpDashboard />;
}
'@ | Set-Content -Encoding UTF8 "$privateDir/page.tsx"

Write-Host "Layout ERP + Dashboard branchés avec succès." -ForegroundColor Green
Write-Host "Lance maintenant : pnpm build" -ForegroundColor Yellow