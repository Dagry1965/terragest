$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"

function Write-FileUtf8($Path, $Content) {
  $Dir = Split-Path $Path -Parent

  if (-not (Test-Path $Dir)) {
    New-Item -ItemType Directory -Path $Dir -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.Encoding]::UTF8
  )

  Write-Host "WRITTEN $Path" -ForegroundColor Green
}

Write-FileUtf8 `
"$Root\src\components\erp\ui\ERPWidgetCard.tsx" `
@'
import { ReactNode } from "react";

type ERPWidgetCardProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function ERPWidgetCard({
  title,
  description,
  children,
  className = "",
}: ERPWidgetCardProps) {
  return (
    <section
      className={[
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
        "dark:border-slate-800 dark:bg-slate-950",
        className,
      ].join(" ")}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
          )}

          {description && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}
'@

Write-FileUtf8 `
"$Root\src\components\erp\ui\ERPStatusBadge.tsx" `
@'
type ERPStatusBadgeProps = {
  status?: string;
  label?: string;
  tone?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
};

const toneClasses: Record<NonNullable<ERPStatusBadgeProps["tone"]>, string> = {
  default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  danger: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

export function ERPStatusBadge({
  status,
  label,
  tone = "default",
  className = "",
}: ERPStatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className,
      ].join(" ")}
    >
      {label ?? status ?? "Statut"}
    </span>
  );
}
'@

$IndexPath = "$Root\src\components\erp\ui\index.ts"
$Index = [System.IO.File]::ReadAllText($IndexPath)

if ($Index -notmatch 'ERPWidgetCard') {
  $Index += "`r`nexport * from `"./ERPWidgetCard`";"
}

if ($Index -notmatch 'ERPStatusBadge') {
  $Index += "`r`nexport * from `"./ERPStatusBadge`";"
}

[System.IO.File]::WriteAllText(
  $IndexPath,
  $Index,
  [System.Text.Encoding]::UTF8
)

Write-Host ""
Write-Host "OK - Missing UI wrappers fixed." -ForegroundColor Green