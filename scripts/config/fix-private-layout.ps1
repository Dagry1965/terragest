Write-Host "Fixing private layout..." -ForegroundColor Cyan

# =====================================================
# ROOT
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
  useAuth,
} from "@/providers/AuthProvider";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router =
    useRouter();

  const {
    user,
  } = useAuth();

  useEffect(() => {

    if (!user) {

      router.push(
        "/login"
      );
    }

  }, [
    user,
    router,
  ]);

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
Write-Host "Private layout fixed successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Restart app with:"
Write-Host "pnpm dev"
Write-Host ""