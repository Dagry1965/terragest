Write-Host "Fixing root auth provider..." -ForegroundColor Cyan

# =====================================================
# ROOT PATH
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# ROOT LAYOUT
# =====================================================

$layoutPath =
"$ROOT\src\app\layout.tsx"

# =====================================================
# NEW CONTENT
# =====================================================

$newContent = @'
import "./globals.css";

import {
  RootProviders,
} from "@/providers/RootProviders";

import {
  EnterpriseAuthProvider,
} from "@/features/auth/providers/EnterpriseAuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="fr">

      <body>

        <EnterpriseAuthProvider>

          <RootProviders>

            {children}

          </RootProviders>

        </EnterpriseAuthProvider>

      </body>

    </html>
  );
}
'@

# =====================================================
# WRITE FILE
# =====================================================

Set-Content `
$layoutPath `
$newContent

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Root auth provider fixed successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Restart application with:" -ForegroundColor Cyan
Write-Host "pnpm dev"
Write-Host ""