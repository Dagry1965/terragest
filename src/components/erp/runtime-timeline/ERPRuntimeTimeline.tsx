"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getStoredEvents,
} from "@/core/event-store/event-store";

import {
  subscribeRuntimeChannel,
} from "@/core/realtime/runtime-realtime-channel";

export function ERPRuntimeTimeline() {
  const [events, setEvents] =
    useState<any[]>(
      getStoredEvents()
    );

  useEffect(() => {
    const unsubscribe =
      subscribeRuntimeChannel(
        "breakdowns",
        () => {
          setEvents([
            ...getStoredEvents(),
          ]);
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Runtime Activity
        </h2>
      </div>

      <div className="divide-y divide-slate-100">
        {events.length === 0 && (
          <div className="p-6 text-sm text-slate-500">
            Aucune activité runtime.
          </div>
        )}

        {events.map((event: any) => (
          <div
            key={event.id}
            className="p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  {event.event?.name}
                </div>

                <div className="mt-2 text-xs text-slate-500">
                  {event.createdAt}
                </div>

                <pre className="mt-3 overflow-auto rounded-2xl bg-slate-100 p-3 text-xs text-slate-700">
                  {JSON.stringify(
                    event.event?.payload,
                    null,
                    2
                  )}
                </pre>
              </div>

              <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                Runtime Event
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
