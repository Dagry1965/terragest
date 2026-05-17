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

export function ERPListWidget({
  widget,
}: ERPDashboardWidgetProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl">
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

      <div className="space-y-3">
        {(widget.items ?? []).length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold text-slate-400">
            Aucune donnée.
          </p>
        ) : (
          widget.items?.slice(0, 8).map((item) => {
            const formattedDate =
              formatDashboardDate(item.date);

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm transition hover:border-emerald-300/40 hover:bg-emerald-400/10"
              >
                <div className="font-bold text-white">
                  {item.title}
                </div>

                {formattedDate ? (
                  <div className="mt-1 text-xs font-semibold text-slate-500">
                    {formattedDate}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
