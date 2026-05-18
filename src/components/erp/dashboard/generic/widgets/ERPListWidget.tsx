import Link from "next/link";

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
    text.match(/seconds=(\d+)/);

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
                className={`
                  rounded-2xl
                  border
                  p-4
                  text-sm
                  transition
                  duration-200
                  hover:border-emerald-300/40
                  hover:bg-emerald-400/10
                  ${levelClassName(item.level)}
                `}
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
