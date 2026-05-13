"use client";

type ERPEventTimelineEntry = {
  title?: string;
  label?: string;
  date?: string;
  time?: string;
  description?: string;
};

type ERPEventTimelineProps = {
  entries?: ERPEventTimelineEntry[];
};

export function ERPEventTimeline({
  entries = [],
}: ERPEventTimelineProps) {
  const events =
    entries.length > 0
      ? entries
      : [
          {
            title: "Aucun événement",
            date: "",
            description: "Aucune activité enregistrée.",
          },
        ];

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div
          key={`${event.title ?? event.label ?? "event"}-${index}`}
          className="flex items-start gap-4"
        >
          <div className="mt-1 h-3 w-3 rounded-full bg-slate-900" />

          <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-900">
                {event.title ?? event.label ?? "Evénement"}
              </p>

              {(event.date || event.time) && (
                <p className="text-xs text-slate-400">
                  {event.date ?? event.time}
                </p>
              )}
            </div>

            {event.description && (
              <p className="mt-2 text-sm text-slate-500">
                {event.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}