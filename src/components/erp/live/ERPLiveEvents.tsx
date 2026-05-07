"use client";

export function ERPLiveEvents() {

  const events = [
    {
      time: "10:02",
      label: "Workflow maintenance exécuté",
    },
    {
      time: "10:07",
      label: "Synchronisation Firestore",
    },
    {
      time: "10:11",
      label: "Intervention validée",
    },
    {
      time: "10:14",
      label: "Automation déclenchée",
    },
  ];

  return (

    <div className="space-y-3">

      {events.map((event) => (

        <div
          key={`${event.time}-${event.label}`}
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-4
            shadow-sm
          "
        >

          <div
            className="
              rounded-lg
              bg-slate-900
              px-3
              py-1
              text-xs
              font-semibold
              text-white
            "
          >
            {event.time}
          </div>

          <p
            className="
              text-sm
              text-slate-700
            "
          >
            {event.label}
          </p>

        </div>

      ))}

    </div>

  );
}