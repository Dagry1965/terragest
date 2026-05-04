// src/features/platform-monitoring/components/graphs/EventTimeline.tsx

"use client";

interface EventItem {

  event: string;

  timestamp?: string;
}

interface Props {

  events: EventItem[];
}

export function EventTimeline({
  events
}: Props) {

  return (

    <div className="space-y-3">

      <h3 className="text-lg font-semibold">
        Event Timeline
      </h3>

      <div className="space-y-2">

        {events.map(
          (event, index) => (

            <div
              key={index}
              className="
                border
                rounded
                p-3
              "
            >

              <p className="font-medium">
                {event.event}
              </p>

              <p className="text-sm opacity-70">
                {event.timestamp}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}