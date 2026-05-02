Write-Host "Fixing Terragest private authentication layout..." -ForegroundColor Cyan

# =====================================================
# ROOT PATH
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# TARGET FILE
# =====================================================

$layoutPath =
"$ROOT\src\app\(private)\layout.tsx"

# =====================================================
# NEW CONTENT
# =====================================================

$newContent = @'
"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  AppLayout,
} from "@/components/layout/AppLayout";

import {
  useEnterpriseAuth,
} from "@/features/auth/providers/EnterpriseAuthProvider";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router =
    useRouter();

  const {
    user,
    loading,
  } =
    useEnterpriseAuth();

  useEffect(() => {

    if (
      !loading &&
      !user
    ) {

      router.push(
        "/login"
      );
    }

  }, [
    user,
    loading,
    router,
  ]);

  if (loading) {

    return (

      <div className="
        p-10
      ">

        Loading...

      </div>
    );
  }

  if (!user) {

    return null;
  }

  return (

    <AppLayout>

      {children}

    </AppLayout>
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
Write-Host "Private authentication layout fixed successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Fixed:" -ForegroundColor Yellow
Write-Host "- Firebase auth session handling"
Write-Host "- Loading state"
Write-Host "- Redirect loop"
Write-Host "- Enterprise auth guard"
Write-Host ""
Write-Host "Restart application with:" -ForegroundColor Cyan
Write-Host "pnpm dev"
Write-Host ""