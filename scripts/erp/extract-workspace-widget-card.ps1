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

$cardPath = Join-Path `
  $root `
  "src\components\erp\workspace\ERPWorkspaceWidgetCard.tsx"

$cardContent = @'
import type {
  ERPDashboardWidgetResult,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

interface ERPWorkspaceWidgetCardProps {
  widget: ERPDashboardWidgetResult;
}

export function ERPWorkspaceWidgetCard({
  widget,
}: ERPWorkspaceWidgetCardProps) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-100
        bg-slate-50
        p-5
      "
    >

      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        {widget.type}
      </p>

      <h3
        className="
          mt-2
          text-sm
          font-semibold
          text-slate-950
        "
      >
        {widget.title}
      </h3>

      {widget.value !== undefined ? (

        <p
          className="
            mt-4
            text-3xl
            font-bold
            tracking-tight
            text-slate-950
          "
        >
          {widget.value}
        </p>

      ) : null}

      {widget.items ? (

        <div className="mt-4 space-y-2">

          {widget.items.slice(0, 5).map((item) => (

            <div
              key={item.id}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-3
              "
            >

              <p
                className="
                  text-sm
                  font-medium
                  text-slate-900
                "
              >
                {item.title}
              </p>

              {item.date ? (

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                  "
                >
                  {item.date}
                </p>

              ) : null}

            </div>

          ))}

        </div>

      ) : null}

    </div>

  );
}
'@

$widgetsPath = Join-Path `
  $root `
  "src\components\erp\workspace\ERPWorkspaceRuntimeWidgets.tsx"

$content = Get-Content $widgetsPath -Raw

$content = $content.Replace(
'import {
  ERPDashboardWidgetEngine,
} from "@/runtime/dashboard/generic/ERPDashboardWidgetEngine";',
'import {
  ERPDashboardWidgetEngine,
} from "@/runtime/dashboard/generic/ERPDashboardWidgetEngine";

import {
  ERPWorkspaceWidgetCard,
} from "./ERPWorkspaceWidgetCard";'
)

$oldBlock = @'
        {results.map((result) => (

          <div
            key={result.key}
            className="
              rounded-2xl
              border
              border-slate-100
              bg-slate-50
              p-5
            "
          >

            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-slate-500
              "
            >
              {result.type}
            </p>

            <h3
              className="
                mt-2
                text-sm
                font-semibold
                text-slate-950
              "
            >
              {result.title}
            </h3>

            {result.value !== undefined ? (

              <p
                className="
                  mt-4
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-950
                "
              >
                {result.value}
              </p>

            ) : null}

            {result.items ? (

              <div className="mt-4 space-y-2">

                {result.items.slice(0, 5).map((item) => (

                  <div
                    key={item.id}
                    className="
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      p-3
                    "
                  >

                    <p
                      className="
                        text-sm
                        font-medium
                        text-slate-900
                      "
                    >
                      {item.title}
                    </p>

                    {item.date ? (

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                        "
                      >
                        {item.date}
                      </p>

                    ) : null}

                  </div>

                ))}

              </div>

            ) : null}

          </div>

        ))}
'@

$newBlock = @'
        {results.map((result) => (

          <ERPWorkspaceWidgetCard
            key={result.key}
            widget={result}
          />

        ))}
'@

$content = $content.Replace(
  $oldBlock,
  $newBlock
)

Write-Utf8NoBom `
  -Path $cardPath `
  -Content $cardContent

Write-Utf8NoBom `
  -Path $widgetsPath `
  -Content $content

Write-Host ""
Write-Host "OK - ERPWorkspaceWidgetCard extracted."
Write-Host "Run: pnpm build"