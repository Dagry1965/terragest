import Link from "next/link";

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
