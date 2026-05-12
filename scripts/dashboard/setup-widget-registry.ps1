$ErrorActionPreference = "Stop"

$Root =
"C:\Users\Admin\terragest"

function Ensure-Dir($Path) {

  if (!(Test-Path $Path)) {

    New-Item `
      -ItemType Directory `
      -Path $Path `
      -Force | Out-Null
  }
}

function Write-File(
  $Path,
  $Content
) {

  $Dir =
    Split-Path $Path -Parent

  Ensure-Dir $Dir

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN $Path"
}

Ensure-Dir `
"$Root\src\components\erp\dashboard\generic\widgets"

Ensure-Dir `
"$Root\src\components\erp\dashboard\generic\registry"

$Registry = @'
import type {
  ComponentType,
}
from "react";

import type {
  ERPDashboardWidgetResult,
}
from "@/runtime/dashboard/generic/ERPDashboardTypes";

export interface ERPDashboardWidgetProps {
  widget:
    ERPDashboardWidgetResult;
}

export class ERPDashboardWidgetRegistry {

  private static widgets:
    Record<
      string,
      ComponentType<
        ERPDashboardWidgetProps
      >
    > = {};

  static register(
    type: string,

    component:
      ComponentType<
        ERPDashboardWidgetProps
      >
  ) {

    this.widgets[type] =
      component;
  }

  static get(
    type: string
  ) {

    return (
      this.widgets[type]
      ?? null
    );
  }
}
'@

$KPIWidget = @'
import Link
from "next/link";

import type {
  ERPDashboardWidgetProps,
}
from "../registry/ERPDashboardWidgetRegistry";

export function ERPKPIWidget({
  widget,
}: ERPDashboardWidgetProps) {

  const content = (

    <div
      className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
      "
    >

      <p
        className="
          text-sm
          text-slate-500
        "
      >
        {widget.title}
      </p>

      <h2
        className="
          mt-3
          text-4xl
          font-bold
          text-slate-950
        "
      >
        {widget.value ?? 0}
      </h2>

    </div>
  );

  if (widget.href) {

    return (

      <Link href={widget.href}>
        {content}
      </Link>
    );
  }

  return content;
}
'@

$ListWidget = @'
import type {
  ERPDashboardWidgetProps,
}
from "../registry/ERPDashboardWidgetRegistry";

export function ERPListWidget({
  widget,
}: ERPDashboardWidgetProps) {

  return (

    <div
      className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
      "
    >

      <h2
        className="
          text-lg
          font-semibold
          text-slate-950
        "
      >
        {widget.title}
      </h2>

      <div
        className="
          mt-5
          space-y-3
        "
      >

        {(widget.items ?? [])
          .length === 0 ? (

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Aucune donnée.
          </p>

        ) : (

          widget.items?.map(
            (item) => (

              <div
                key={item.id}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-4
                  text-sm
                "
              >

                <div
                  className="
                    font-semibold
                    text-slate-950
                  "
                >
                  {item.title}
                </div>

                {item.date ? (

                  <div
                    className="
                      mt-1
                      text-xs
                      text-slate-500
                    "
                  >
                    {item.date}
                  </div>

                ) : null}

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}
'@

$RegisterWidgets = @'
import {
  ERPDashboardWidgetRegistry,
}
from "./registry/ERPDashboardWidgetRegistry";

import {
  ERPKPIWidget,
}
from "./widgets/ERPKPIWidget";

import {
  ERPListWidget,
}
from "./widgets/ERPListWidget";

export function registerDashboardWidgets() {

  ERPDashboardWidgetRegistry.register(
    "kpi",
    ERPKPIWidget
  );

  ERPDashboardWidgetRegistry.register(
    "alert",
    ERPListWidget
  );

  ERPDashboardWidgetRegistry.register(
    "timeline",
    ERPListWidget
  );
}
'@

$Renderer = @'
"use client";

import {
  useEffect,
}
from "react";

import type {
  ERPDashboardConfig,
  ERPDashboardWidgetResult,
}
from "@/runtime/dashboard/generic/ERPDashboardTypes";

import {
  registerDashboardWidgets,
}
from "./registerDashboardWidgets";

import {
  ERPDashboardWidgetRegistry,
}
from "./registry/ERPDashboardWidgetRegistry";

interface Props {

  config:
    ERPDashboardConfig;

  widgets:
    ERPDashboardWidgetResult[];
}

export function ERPDashboardRenderer({
  config,
  widgets,
}: Props) {

  useEffect(() => {

    registerDashboardWidgets();

  }, []);

  return (

    <main
      className="
        space-y-8
        p-8
      "
    >

      <section
        className="
          rounded-3xl
          border
          bg-white
          p-8
          shadow-sm
        "
      >

        <p
          className="
            text-sm
            font-medium
            text-emerald-700
          "
        >
          Tableau de bord ERP
        </p>

        <h1
          className="
            mt-2
            text-3xl
            font-bold
            text-slate-950
          "
        >
          {config.title}
        </h1>

        {config.subtitle ? (

          <p
            className="
              mt-3
              max-w-3xl
              text-slate-600
            "
          >
            {config.subtitle}
          </p>

        ) : null}

      </section>

      <section
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {widgets.map(
          (widget) => {

            const Component =
              ERPDashboardWidgetRegistry
                .get(
                  widget.type
                );

            if (!Component) {

              return (

                <div
                  key={widget.key}
                >
                  Widget inconnu :
                  {widget.type}
                </div>
              );
            }

            return (

              <Component
                key={widget.key}
                widget={widget}
              />
            );
          }
        )}

      </section>

    </main>
  );
}
'@

Write-File `
"$Root\src\components\erp\dashboard\generic\registry\ERPDashboardWidgetRegistry.ts" `
$Registry

Write-File `
"$Root\src\components\erp\dashboard\generic\widgets\ERPKPIWidget.tsx" `
$KPIWidget

Write-File `
"$Root\src\components\erp\dashboard\generic\widgets\ERPListWidget.tsx" `
$ListWidget

Write-File `
"$Root\src\components\erp\dashboard\generic\registerDashboardWidgets.ts" `
$RegisterWidgets

Write-File `
"$Root\src\components\erp\dashboard\generic\ERPDashboardRenderer.tsx" `
$Renderer

Write-Host ""
Write-Host "DONE WIDGET REGISTRY"
Write-Host ""
Write-Host "NEXT:"
Write-Host "pnpm build"