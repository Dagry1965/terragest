import Link from "next/link";

import type {
  ERPDashboardWidgetProps,
} from "../registry/ERPDashboardWidgetRegistry";

export function ERPQuickActionsWidget({
  widget,
}: ERPDashboardWidgetProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl xl:col-span-2">
      <div className="mb-5">
        <h2 className="text-lg font-black text-white">
          {widget.title}
        </h2>

        {widget.description ? (
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {widget.description}
          </p>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {(widget.actions ?? []).map((action) => {
          const isPrimary =
            action.tone === "primary";

          const className =
            isPrimary
              ? "rounded-2xl border border-emerald-300/40 bg-emerald-400/15 px-5 py-4 text-emerald-50 transition hover:-translate-y-1"
              : "rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-slate-100 transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-400/10";

          return (
            <Link
              key={action.href}
              href={action.href}
              className={className}
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
