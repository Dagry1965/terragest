const fs = require("fs");
const path = require("path");

const root = process.cwd();

function writeFile(filePath, content) {
  const absolutePath = path.join(root, filePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, "utf8");
  console.log("WRITTEN", filePath);
}

writeFile(
  "src/components/erp/dashboard/generic/ERPDashboardRenderer.tsx",
`"use client";

import type {
  ERPDashboardConfig,
  ERPDashboardWidgetResult,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

import {
  registerDashboardWidgets,
} from "./registerDashboardWidgets";

import {
  ERPDashboardWidgetRegistry,
} from "./registry/ERPDashboardWidgetRegistry";

interface Props {
  config: ERPDashboardConfig;
  widgets: ERPDashboardWidgetResult[];
}

registerDashboardWidgets();

function getWidgetSpanClassName(
  widget: ERPDashboardWidgetResult
): string {
  if (widget.type === "funnel") {
    return "md:col-span-2 xl:col-span-4";
  }

  if (widget.type === "quickActions") {
    return "md:col-span-2 xl:col-span-2";
  }

  if (
    widget.type === "alert" ||
    widget.type === "timeline" ||
    widget.type === "activity"
  ) {
    return "md:col-span-2 xl:col-span-2";
  }

  return "";
}

export function ERPDashboardRenderer({
  config,
  widgets,
}: Props) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-emerald-400/[0.06] p-6 shadow-2xl md:p-8">
          <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute -bottom-20 left-12 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-300">
                Tableau de bord métier
              </p>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                {config.title}
              </h1>

              {config.subtitle ? (
                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 md:text-base">
                  {config.subtitle}
                </p>
              ) : null}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
              {widgets.length.toLocaleString("fr-FR")} widgets actifs
            </div>
          </div>
        </section>

        <section className="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-4">
          {widgets.map((widget) => {
            const Component =
              ERPDashboardWidgetRegistry.get(widget.type);

            if (!Component) {
              return (
                <div
                  key={widget.key}
                  className="rounded-3xl border border-red-400/30 bg-red-500/10 p-5 text-sm font-semibold text-red-100"
                >
                  Widget inconnu : {widget.type}
                </div>
              );
            }

            return (
              <div
                key={widget.key}
                className={getWidgetSpanClassName(widget)}
              >
                <Component widget={widget} />
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
`
);

writeFile(
  "src/components/erp/dashboard/generic/widgets/ERPKPIWidget.tsx",
`import Link from "next/link";

import type {
  ERPDashboardWidgetProps,
} from "../registry/ERPDashboardWidgetRegistry";

function formatValue(
  value: number,
  suffix?: string
): string {
  const formatted =
    value.toLocaleString("fr-FR");

  if (suffix) {
    return formatted + " " + suffix;
  }

  return formatted;
}

export function ERPKPIWidget({
  widget,
}: ERPDashboardWidgetProps) {
  const content = (
    <div className="group flex h-full min-h-[190px] flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl transition duration-200 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-400/10">
      <div>
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-bold leading-5 text-slate-300">
            {widget.title}
          </p>

          <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-200">
            KPI
          </span>
        </div>

        <h2 className="mt-5 break-words text-3xl font-black tracking-tight text-white md:text-4xl">
          {formatValue(widget.value ?? 0, widget.valueSuffix)}
        </h2>
      </div>

      {widget.description ? (
        <p className="mt-5 text-sm leading-6 text-slate-400">
          {widget.description}
        </p>
      ) : null}
    </div>
  );

  if (widget.href) {
    return (
      <Link
        href={widget.href}
        className="block h-full"
      >
        {content}
      </Link>
    );
  }

  return content;
}
`
);

writeFile(
  "src/components/erp/dashboard/generic/widgets/ERPListWidget.tsx",
`import Link from "next/link";

import type {
  ERPDashboardWidgetProps,
} from "../registry/ERPDashboardWidgetRegistry";

function formatDashboardDate(
  value: unknown
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "";
  }

  if (
    typeof value === "object" &&
    value &&
    "seconds" in value
  ) {
    const seconds =
      Number(
        (value as { seconds: number }).seconds
      );

    const date =
      new Date(seconds * 1000);

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("fr-FR");
    }
  }

  const text =
    String(value);

  const firestoreTimestampMatch =
    text.match(/seconds=(\\d+)/);

  if (firestoreTimestampMatch?.[1]) {
    const date =
      new Date(
        Number(firestoreTimestampMatch[1]) * 1000
      );

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("fr-FR");
    }
  }

  const date =
    new Date(text);

  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleDateString("fr-FR");
  }

  return text;
}

function levelClassName(
  level?: "info" | "warning" | "critical"
): string {
  if (level === "critical") {
    return "border-red-400/30 bg-red-500/10 text-red-100";
  }

  if (level === "warning") {
    return "border-amber-400/30 bg-amber-500/10 text-amber-100";
  }

  return "border-white/10 bg-black/20 text-slate-100";
}

function levelLabel(
  level?: "info" | "warning" | "critical"
): string {
  if (level === "critical") {
    return "Critique";
  }

  if (level === "warning") {
    return "Attention";
  }

  return "Info";
}

function widgetBadgeLabel(
  type: string
): string {
  if (type === "alert") {
    return "Alertes";
  }

  if (type === "timeline") {
    return "Planning";
  }

  if (type === "activity") {
    return "Activité";
  }

  return "Liste";
}

export function ERPListWidget({
  widget,
}: ERPDashboardWidgetProps) {
  const items =
    widget.items ?? [];

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white">
            {widget.title}
          </h2>

          {widget.description ? (
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {widget.description}
            </p>
          ) : null}
        </div>

        <span className="shrink-0 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-slate-300">
          {widgetBadgeLabel(widget.type)}
        </span>
      </div>

      <div className="flex-1 space-y-3">
        {items.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm font-semibold text-slate-400">
            Aucune donnée.
          </p>
        ) : (
          items.slice(0, 8).map((item) => {
            const formattedDate =
              formatDashboardDate(item.date);

            const content = (
              <div
                className={\`
                  rounded-2xl
                  border
                  p-4
                  text-sm
                  transition
                  duration-200
                  hover:border-emerald-300/40
                  hover:bg-emerald-400/10
                  \${levelClassName(item.level)}
                \`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="truncate font-bold text-white">
                      {item.title}
                    </div>

                    {item.description ? (
                      <div className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-slate-400">
                        {item.description}
                      </div>
                    ) : null}

                    {formattedDate ? (
                      <div className="mt-2 text-xs font-bold text-slate-500">
                        {formattedDate}
                      </div>
                    ) : null}
                  </div>

                  <span className="shrink-0 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-slate-300">
                    {levelLabel(item.level)}
                  </span>
                </div>
              </div>
            );

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="block"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div key={item.id}>
                {content}
              </div>
            );
          })
        )}
      </div>

      {widget.href ? (
        <Link
          href={widget.href}
          className="mt-5 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-300 transition hover:border-emerald-300/40 hover:bg-emerald-400/10 hover:text-emerald-100"
        >
          Voir le module
        </Link>
      ) : null}
    </div>
  );
}
`
);

writeFile(
  "src/components/erp/dashboard/generic/widgets/ERPQuickActionsWidget.tsx",
`import Link from "next/link";

import type {
  ERPDashboardWidgetProps,
} from "../registry/ERPDashboardWidgetRegistry";

function actionClassName(
  tone?: "primary" | "secondary" | "danger"
): string {
  if (tone === "danger") {
    return "rounded-2xl border border-red-300/30 bg-red-500/10 px-5 py-4 text-red-50 transition duration-200 hover:-translate-y-1 hover:bg-red-500/20";
  }

  if (tone === "primary") {
    return "rounded-2xl border border-emerald-300/40 bg-emerald-400/15 px-5 py-4 text-emerald-50 transition duration-200 hover:-translate-y-1 hover:bg-emerald-400/20";
  }

  return "rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-slate-100 transition duration-200 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-400/10";
}

export function ERPQuickActionsWidget({
  widget,
}: ERPDashboardWidgetProps) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white">
            {widget.title}
          </h2>

          {widget.description ? (
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {widget.description}
            </p>
          ) : null}
        </div>

        <span className="shrink-0 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-200">
          Actions
        </span>
      </div>

      <div className="grid flex-1 gap-3 sm:grid-cols-2">
        {(widget.actions ?? []).map((action) => {
          return (
            <Link
              key={action.href}
              href={action.href}
              className={actionClassName(action.tone)}
            >
              <p className="text-sm font-black">
                {action.label}
              </p>

              {action.description ? (
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  {action.description}
                </p>
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
`
);

writeFile(
  "src/components/erp/dashboard/generic/widgets/ERPFunnelWidget.tsx",
`import Link from "next/link";

import type {
  ERPDashboardWidgetProps,
} from "../registry/ERPDashboardWidgetRegistry";

function formatPercent(value?: number): string {
  if (value === undefined) {
    return "Départ";
  }

  return value + "%";
}

export function ERPFunnelWidget({
  widget,
}: ERPDashboardWidgetProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-emerald-400/[0.05] p-6 shadow-2xl">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
            Funnel
          </p>

          <h2 className="mt-2 text-xl font-black text-white">
            {widget.title}
          </h2>

          {widget.description ? (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              {widget.description}
            </p>
          ) : null}
        </div>

        <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-sm font-black text-emerald-200">
          Conversion globale : {widget.value ?? 0}{widget.valueSuffix ?? "%"}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {(widget.steps ?? []).map((step, index) => {
          const content = (
            <div className="h-full rounded-3xl border border-white/10 bg-black/20 p-5 transition duration-200 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-400/10">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                Étape {index + 1}
              </p>

              <h3 className="mt-3 text-base font-black text-white">
                {step.label}
              </h3>

              <p className="mt-4 text-4xl font-black text-white">
                {step.value.toLocaleString("fr-FR")}
              </p>

              <p className="mt-3 text-sm font-bold text-slate-400">
                {formatPercent(step.conversionRate)}
              </p>
            </div>
          );

          if (step.href) {
            return (
              <Link
                key={step.key}
                href={step.href}
                className="block h-full"
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={step.key}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
`
);

console.log("PASS 2N-B OK: generic dashboard UI polished.");