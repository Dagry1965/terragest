import {
  ERPObservabilityTimeline,
} from "@/runtime/observability";

export function ERPEventsTimeline() {

  const events =
    ERPObservabilityTimeline.events();

  return (
    <div className="space-y-4">

      {events.map((event) => (

        <div
          key={event.id}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-slate-900">
                {event.type}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Module : {event.module}
              </p>

            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {event.actor ?? "system"}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}