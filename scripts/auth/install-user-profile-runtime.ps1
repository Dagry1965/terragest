$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

function Write-Utf8NoBom {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path -Parent

  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN $Path"
}

# =========================================================
# ERPUserProfile.ts
# =========================================================

$profilePath = Join-Path `
  $root `
  "src\runtime\security\users\ERPUserProfile.ts"

$profileContent = @'
export interface ERPUserProfile {

  id: string;

  email: string;

  displayName?: string;

  role: string;

  tenant: string;

  permissions: string[];

  workspaces: string[];

  modules: string[];
}
'@

# =========================================================
# ERPUserProfileService.ts
# =========================================================

$servicePath = Join-Path `
  $root `
  "src\runtime\security\users\ERPUserProfileService.ts"

$serviceContent = @'
import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase/config";

import type {
  ERPUserProfile,
} from "./ERPUserProfile";

export class ERPUserProfileService {

  static async getProfile(
    userId: string
  ): Promise<ERPUserProfile | null> {

    const reference =
      doc(
        db,
        "utilisateurs",
        userId
      );

    const snapshot =
      await getDoc(
        reference
      );

    if (
      !snapshot.exists()
    ) {

      return null;
    }

    const data =
      snapshot.data();

    return {

      id:
        snapshot.id,

      email:
        data.email ?? "",

      displayName:
        data.displayName,

      role:
        data.role ?? "user",

      tenant:
        data.tenant ?? "default",

      permissions:
        data.permissions ?? [],

      workspaces:
        data.workspaces ?? [],

      modules:
        data.modules ?? [],
    };
  }
}
'@

Write-Utf8NoBom `
  -Path $profilePath `
  -Content $profileContent

Write-Utf8NoBom `
  -Path $servicePath `
  -Content $serviceContent

Write-Host ""
Write-Host "OK - ERP User Profile Runtime installed."
Write-Host "Run: pnpm build"