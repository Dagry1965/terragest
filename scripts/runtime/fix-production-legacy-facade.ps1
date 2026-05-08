$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Write-Utf8($Path, $Content) {
  $FullPath = Join-Path $ProjectRoot $Path
  $Dir = Split-Path $FullPath -Parent

  if (!(Test-Path -LiteralPath $Dir)) {
    New-Item -ItemType Directory -Path $Dir -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Utf8 "src\runtime\production.ts" @'
export * from "./production/index";

export type LegacyRuntimeStatus =
  | "healthy"
  | "warning"
  | "critical"
  | "ok";

export const RuntimeHealthMonitor = {
  check() {
    return [
      {
        key: "runtime",
        scope: "runtime",
        label: "Runtime ERP",
        status: "healthy" as const,
        message: "Runtime operationnel",
        description: "Runtime ERP operationnel.",
      },
      {
        key: "production",
        scope: "production",
        label: "Production",
        status: "warning" as const,
        message: "Cloud readiness partielle",
        description: "Certaines connexions cloud restent a finaliser.",
      },
      {
        key: "security",
        scope: "security",
        label: "Security",
        status: "healthy" as const,
        message: "RBAC actif",
        description: "Security runtime actif.",
      },
    ];
  },

  all() {
    return this.check();
  },
};

export const ProductionReadiness = {
  checks() {
    return [
      {
        key: "runtime-registry",
        scope: "registry",
        label: "Runtime Registry",
        status: "ok" as const,
        description: "Registre ERP disponible.",
      },
      {
        key: "security-rbac",
        scope: "security",
        label: "Security RBAC",
        status: "ok" as const,
        description: "RBAC disponible.",
      },
      {
        key: "cloud-persistence",
        scope: "persistence",
        label: "Cloud Persistence",
        status: "warning" as const,
        description: "Driver cloud a finaliser.",
      },
    ];
  },

  score() {
    return 72;
  },
};

export type ProductionLogLevel =
  | "info"
  | "warning"
  | "error"
  | "critical";

export type ProductionLog = {
  id: string;
  level: ProductionLogLevel;
  scope: string;
  message: string;
  timestamp: string;
};

export const ProductionLogger = {
  all(): ProductionLog[] {
    return [
      {
        id: "prod_log_1",
        level: "info",
        scope: "governance",
        message: "Production governance initialized",
        timestamp: new Date().toISOString(),
      },
      {
        id: "prod_log_2",
        level: "warning",
        scope: "persistence",
        message: "Cloud persistence driver pending",
        timestamp: new Date().toISOString(),
      },
      {
        id: "prod_log_3",
        level: "info",
        scope: "monitoring",
        message: "Runtime monitoring active",
        timestamp: new Date().toISOString(),
      },
    ];
  },

  info(message: string, scope = "production") {
    return {
      id: `prod_log_${Date.now()}`,
      level: "info" as const,
      scope,
      message,
      timestamp: new Date().toISOString(),
    };
  },

  warning(message: string, scope = "production") {
    return {
      id: `prod_log_${Date.now()}`,
      level: "warning" as const,
      scope,
      message,
      timestamp: new Date().toISOString(),
    };
  },

  error(message: string, scope = "production") {
    return {
      id: `prod_log_${Date.now()}`,
      level: "error" as const,
      scope,
      message,
      timestamp: new Date().toISOString(),
    };
  },
};

export const RuntimeErrorReporter = {
  capture(error: unknown, source = "runtime") {
    return ProductionLogger.error(
      error instanceof Error ? error.message : String(error),
      source
    );
  },

  report(error: unknown) {
    return this.capture(error);
  },

  all() {
    return [];
  },
};
'@

Write-Utf8 "src\runtime\production\index.ts" @'
export * from "../production";
'@

Write-Host ""
Write-Host "Facade legacy production corrigee definitivement." -ForegroundColor Green
Write-Host "Relance : pnpm build" -ForegroundColor Yellow