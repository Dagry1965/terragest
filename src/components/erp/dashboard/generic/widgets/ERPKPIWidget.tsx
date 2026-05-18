import Link from "next/link";

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
