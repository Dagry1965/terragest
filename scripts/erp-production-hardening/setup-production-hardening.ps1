$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function WriteFile {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Host "=== ERP PRODUCTION HARDENING ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "$projectRoot\src\runtime\production" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\production" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\errors" | Out-Null

WriteFile "src\runtime\production\ProductionLogger.ts" @'
export type ProductionLogLevel =
  | "info"
  | "warning"
  | "error"
  | "critical";

export interface ProductionLogEntry {
  id: string;
  level: ProductionLogLevel;
  scope: string;
  message: string;
  payload?: Record<string, unknown>;
  createdAt: string;
}

const logs: ProductionLogEntry[] = [];

export class ProductionLogger {
  static log(
    level: ProductionLogLevel,
    scope: string,
    message: string,
    payload?: Record<string, unknown>
  ) {
    const entry: ProductionLogEntry = {
      id: `${scope}-${Date.now()}`,
      level,
      scope,
      message,
      payload,
      createdAt: new Date().toISOString(),
    };

    logs.unshift(entry);

    if (level === "error" || level === "critical") {
      console.error("[ERP]", entry);
    } else {
      console.log("[ERP]", entry);
    }

    return entry;
  }

  static info(scope: string, message: string, payload?: Record<string, unknown>) {
    return ProductionLogger.log("info", scope, message, payload);
  }

  static warning(scope: string, message: string, payload?: Record<string, unknown>) {
    return ProductionLogger.log("warning", scope, message, payload);
  }

  static error(scope: string, message: string, payload?: Record<string, unknown>) {
    return ProductionLogger.log("error", scope, message, payload);
  }

  static all() {
    return logs;
  }
}
'@

WriteFile "src\runtime\production\RuntimeErrorReporter.ts" @'
import { ProductionLogger } from "./ProductionLogger";

export class RuntimeErrorReporter {
  static capture(error: unknown, scope = "runtime") {
    const message =
      error instanceof Error
        ? error.message
        : "Erreur inconnue";

    return ProductionLogger.error(scope, message, {
      error,
    });
  }
}
'@

WriteFile "src\runtime\production\RuntimeCache.ts" @'
interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

export class RuntimeCache {
  static set<T>(key: string, value: T, ttlMs = 60_000) {
    cache.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    });

    return value;
  }

  static get<T>(key: string): T | null {
    const entry = cache.get(key);

    if (!entry) {
      return null;
    }

    if (entry.expiresAt < Date.now()) {
      cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  static remember<T>(key: string, factory: () => T, ttlMs = 60_000): T {
    const existing = RuntimeCache.get<T>(key);

    if (existing) {
      return existing;
    }

    return RuntimeCache.set(key, factory(), ttlMs);
  }

  static clear() {
    cache.clear();
  }
}
'@

WriteFile "src\runtime\production\RuntimeHealthMonitor.ts" @'
import { ProductionLogger } from "./ProductionLogger";

export class RuntimeHealthMonitor {
  static check() {
    const logs = ProductionLogger.all();

    const errors = logs.filter(
      (log) => log.level === "error" || log.level === "critical"
    );

    return {
      status: errors.length > 0 ? "warning" : "healthy",
      logs: logs.length,
      errors: errors.length,
      checkedAt: new Date().toISOString(),
    };
  }
}
'@

WriteFile "src\runtime\production\RuntimeRateLimiter.ts" @'
const hits = new Map<string, number[]>();

export class RuntimeRateLimiter {
  static allow(key: string, limit = 30, windowMs = 60_000): boolean {
    const now = Date.now();
    const entries = hits.get(key) ?? [];

    const fresh = entries.filter((timestamp) => now - timestamp < windowMs);

    if (fresh.length >= limit) {
      hits.set(key, fresh);
      return false;
    }

    fresh.push(now);
    hits.set(key, fresh);

    return true;
  }
}
'@

WriteFile "src\runtime\production\ProductionReadiness.ts" @'
export interface ProductionReadinessCheck {
  key: string;
  label: string;
  status: "ready" | "warning" | "todo";
}

export class ProductionReadiness {
  static checks(): ProductionReadinessCheck[] {
    return [
      {
        key: "error-boundary",
        label: "Error boundaries globaux",
        status: "ready",
      },
      {
        key: "logging",
        label: "Logging structure",
        status: "ready",
      },
      {
        key: "cache",
        label: "Cache runtime",
        status: "ready",
      },
      {
        key: "rate-limit",
        label: "Rate limiting runtime",
        status: "ready",
      },
      {
        key: "tenant",
        label: "Isolation tenant reelle",
        status: "warning",
      },
      {
        key: "ci-cd",
        label: "CI/CD enterprise",
        status: "todo",
      },
      {
        key: "security-audit",
        label: "Audit securite production",
        status: "warning",
      },
    ];
  }
}
'@

WriteFile "src\runtime\production\index.ts" @'
export type {
  ProductionLogEntry,
  ProductionLogLevel,
} from "./ProductionLogger";

export { ProductionLogger } from "./ProductionLogger";
export { RuntimeErrorReporter } from "./RuntimeErrorReporter";
export { RuntimeCache } from "./RuntimeCache";
export { RuntimeHealthMonitor } from "./RuntimeHealthMonitor";
export { RuntimeRateLimiter } from "./RuntimeRateLimiter";

export type { ProductionReadinessCheck } from "./ProductionReadiness";
export { ProductionReadiness } from "./ProductionReadiness";
'@

WriteFile "src\components\erp\errors\ERPErrorBoundary.tsx" @'
"use client";

import type { ReactNode } from "react";
import { Component } from "react";
import { RuntimeErrorReporter } from "@/runtime/production";
import { ERPButton } from "@/components/erp/ui";

interface ERPErrorBoundaryProps {
  children: ReactNode;
}

interface ERPErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

export class ERPErrorBoundary extends Component<
  ERPErrorBoundaryProps,
  ERPErrorBoundaryState
> {
  state: ERPErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): ERPErrorBoundaryState {
    return {
      hasError: true,
      message: error.message,
    };
  }

  componentDidCatch(error: Error) {
    RuntimeErrorReporter.capture(error, "ui-error-boundary");
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm">
          <h1 className="text-2xl font-black text-red-950">
            Une erreur est survenue
          </h1>

          <p className="mt-3 text-sm text-red-700">
            Le runtime ERP a intercepte une erreur afin de proteger l'interface.
          </p>

          {this.state.message && (
            <p className="mt-4 rounded-2xl bg-white p-4 text-sm font-medium text-red-700">
              {this.state.message}
            </p>
          )}

          <div className="mt-6">
            <ERPButton
              type="button"
              onClick={() => {
                this.setState({
                  hasError: false,
                  message: undefined,
                });
              }}
            >
              Reessayer
            </ERPButton>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
'@

WriteFile "src\components\erp\production\ProductionLogsPanel.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import { ProductionLogger } from "@/runtime/production";

export function ProductionLogsPanel() {
  const logs = ProductionLogger.all().slice(0, 8);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Logs runtime
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Journal structure production.
          </p>
        </div>

        <ERPBadge tone="info">{logs.length}</ERPBadge>
      </div>

      <div className="space-y-3">
        {logs.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucun log pour le moment.
          </p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">
                    {log.scope}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {log.message}
                  </p>
                </div>

                <ERPBadge
                  tone={
                    log.level === "error" || log.level === "critical"
                      ? "danger"
                      : log.level === "warning"
                        ? "warning"
                        : "info"
                  }
                >
                  {log.level}
                </ERPBadge>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\production\ProductionReadinessPanel.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import { ProductionReadiness } from "@/runtime/production";

export function ProductionReadinessPanel() {
  const checks = ProductionReadiness.checks();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Production readiness
      </h2>

      <div className="mt-5 space-y-3">
        {checks.map((check) => (
          <div
            key={check.key}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
          >
            <span className="text-sm font-bold text-slate-700">
              {check.label}
            </span>

            <ERPBadge
              tone={
                check.status === "ready"
                  ? "success"
                  : check.status === "warning"
                    ? "warning"
                    : "info"
              }
            >
              {check.status}
            </ERPBadge>
          </div>
        ))}
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\production\RuntimeHealthPanel.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import { RuntimeHealthMonitor } from "@/runtime/production";

export function RuntimeHealthPanel() {
  const health = RuntimeHealthMonitor.check();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Health runtime
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Surveillance production globale.
          </p>
        </div>

        <ERPBadge tone={health.status === "healthy" ? "success" : "warning"}>
          {health.status}
        </ERPBadge>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase text-slate-400">
            Logs
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {health.logs}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase text-slate-400">
            Erreurs
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {health.errors}
          </p>
        </div>
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\production\ProductionHardeningPanel.tsx" @'
import { RuntimeHealthPanel } from "./RuntimeHealthPanel";
import { ProductionLogsPanel } from "./ProductionLogsPanel";
import { ProductionReadinessPanel } from "./ProductionReadinessPanel";

export function ProductionHardeningPanel() {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">
          Production hardening
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Protections runtime, monitoring, cache, readiness et stabilisation.
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-3">
        <RuntimeHealthPanel />
        <ProductionReadinessPanel />
        <ProductionLogsPanel />
      </section>
    </section>
  );
}
'@

WriteFile "src\components\erp\production\index.ts" @'
export { RuntimeHealthPanel } from "./RuntimeHealthPanel";
export { ProductionLogsPanel } from "./ProductionLogsPanel";
export { ProductionReadinessPanel } from "./ProductionReadinessPanel";
export { ProductionHardeningPanel } from "./ProductionHardeningPanel";
'@

WriteFile "src\app\(private)\layout.tsx" @'
import { ReactNode } from "react";
import { ErpShell } from "@/components/erp/shell/ErpShell";
import { ERPErrorBoundary } from "@/components/erp/errors/ERPErrorBoundary";

type Props = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: Props) {
  return (
    <ERPErrorBoundary>
      <ErpShell>{children}</ErpShell>
    </ERPErrorBoundary>
  );
}
'@

WriteFile "src\app\(private)\dashboard\page.tsx" @'
"use client";

import Link from "next/link";
import { ERPBadge, ERPButton } from "@/components/erp/ui";
import { ERPEnterpriseOSPanel } from "@/components/erp/os";
import { EnterpriseRuntimeConsolidationPanel } from "@/components/erp/enterprise-runtime";
import { ProductionHardeningPanel } from "@/components/erp/production";

const modules = [
  {
    title: "Exploitations",
    description: "Pilotage des exploitations, terrains et ressources.",
    href: "/exploitations",
  },
  {
    title: "Materiels",
    description: "Suivi des equipements, maintenance et disponibilite.",
    href: "/materiels",
  },
  {
    title: "Stocks",
    description: "Gestion des flux, niveaux et alertes de stock.",
    href: "/stocks",
  },
  {
    title: "Produits",
    description: "Catalogue des produits, intrants et references.",
    href: "/produits",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-10 text-white">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <ERPBadge tone="info">Production Hardening</ERPBadge>
                <ERPBadge tone="success">Runtime protege</ERPBadge>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight">
                Tableau de bord Terragest
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
                Vue globale du runtime, de la consolidation enterprise et de la readiness production.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ERPButton type="button">Diagnostic</ERPButton>
              <ERPButton variant="secondary" type="button">Exporter</ERPButton>
            </div>
          </div>
        </div>
      </section>

      <ProductionHardeningPanel />

      <EnterpriseRuntimeConsolidationPanel />

      <ERPEnterpriseOSPanel />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-black text-slate-950">
            Modules principaux
          </h2>
          <p className="text-sm text-slate-500">
            Acces rapide aux domaines metier.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <h3 className="text-lg font-black text-slate-950">
                {module.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {module.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
'@

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== ERP PRODUCTION HARDENING TERMINE ===" -ForegroundColor Green