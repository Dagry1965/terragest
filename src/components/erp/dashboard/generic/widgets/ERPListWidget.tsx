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
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">
        {widget.title}
      </h2>

      <div className="mt-5 space-y-3">
        {(widget.items ?? []).length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucune donnée.
          </p>
        ) : (
          widget.items?.map((item) => {
            const formattedDate =
              formatDashboardDate(item.date);

            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm"
              >
                <div className="font-semibold text-slate-950">
                  {item.title}
                </div>

                {formattedDate ? (
                  <div className="mt-1 text-xs text-slate-500">
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