"use client";

export function ERPEventTimeline() {

  const events = [
    {
      title: "Workflow maintenance exécuté",
      date: "08:42",
    },
    {
      title: "Intervention validée",
      date: "09:15",
    },
    {
      title: "Stock critique détecté",
      date: "09:48",
    },
    {
      title: "Synchronisation runtime",
      date: "10:02",
    },
  ];

  return (

    <div className="space-y-4">

      {events.map((event) => (

        <div
          key={event.title}
          className="
            flex
            items-start
            gap-4
          "
        >

          <div
            className="
              mt-1
              h-3
              w-3
              rounded-full
              bg-slate-900
            "
          />

          <div
            className="
              flex-1
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
            "
          >

            <div className="flex items-center justify-between">

              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-900
                "
              >
                {event.title}
              </p>

              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                {event.date}
              </p>

            </div>

          </div>

        </div>

      ))}

    </div>

  );
}