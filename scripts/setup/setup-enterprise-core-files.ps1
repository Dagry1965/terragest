Write-Host ""
Write-Host "=== TERRAGEST CORE FILES SETUP ==="
Write-Host ""

# ============================================
# BASE ERROR
# ============================================

@'
export class BaseError extends Error {
  constructor(message: string) {
    super(message);

    this.name = this.constructor.name;
  }
}
'@ | Out-File -LiteralPath "src/core/errors/BaseError.ts" -Encoding utf8

Write-Host "[OK] BaseError created"

# ============================================
# APP ERROR
# ============================================

@'
import { BaseError } from "./BaseError";

export class AppError extends BaseError {
  constructor(
    message: string,
    public code?: string
  ) {
    super(message);
  }
}
'@ | Out-File -LiteralPath "src/core/errors/AppError.ts" -Encoding utf8

Write-Host "[OK] AppError created"

# ============================================
# RESULT TYPE
# ============================================

@'
export type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };
'@ | Out-File -LiteralPath "src/core/types/Result.ts" -Encoding utf8

Write-Host "[OK] Result type created"

# ============================================
# APP CONSTANTS
# ============================================

@'
export const APP_NAME = "Terragest";

export const DEFAULT_LANGUAGE = "fr";

export const DEFAULT_TIMEZONE = "Europe/Zurich";
'@ | Out-File -LiteralPath "src/core/constants/app.constants.ts" -Encoding utf8

Write-Host "[OK] App constants created"

# ============================================
# PERMISSIONS
# ============================================

@'
export const PERMISSIONS = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  USER: "USER",
};
'@ | Out-File -LiteralPath "src/core/permissions/permissions.ts" -Encoding utf8

Write-Host "[OK] Permissions created"

# ============================================
# ENV CONFIG
# ============================================

@'
export const env = {
  appName: "Terragest",
  timezone: "Europe/Zurich",
};
'@ | Out-File -LiteralPath "src/core/config/env.ts" -Encoding utf8

Write-Host "[OK] Env config created"

# ============================================
# DATE UTILS
# ============================================

@'
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR").format(date);
}
'@ | Out-File -LiteralPath "src/core/utils/date.ts" -Encoding utf8

Write-Host "[OK] Date utils created"

Write-Host ""
Write-Host "=== CORE FILES SETUP COMPLETED ==="
Write-Host ""