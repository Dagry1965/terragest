import Link from "next/link";

import type {
  ERPDashboardWidgetProps,
} from "../registry/ERPDashboardWidgetRegistry";

export function ERPKPIWidget({
  widget,
}: ERPDashboardWidgetProps) {
  const content = (
    <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-400/10">
      <p className="text-sm font-bold text-slate-400">
        {widget.title}
      </p>

      <h2 className="mt-4 text-5xl font-black tracking-tight text-white">
        {widget.value ?? 0}
      </h2>

      {widget.description ? (
        <p className="mt-4 text-sm leading-6 text-slate-500">
          {widget.description}
        </p>
      ) : null}
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
