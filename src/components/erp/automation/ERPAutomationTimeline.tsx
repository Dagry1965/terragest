"use client";

export function ERPAutomationTimeline() {

  const automations = [
    {
      time: "10:21",
      label: "Maintenance préventive déclenchée",
    },
    {
      time: "10:28",
      label: "Analyse stock critique exécutée",
    },
    {
      time: "10:34",
      label: "Synchronisation runtime effectuée",
    },
    {
      time: "10:42",
      label: "Notification superviseur envoyée",
    },
  ];

  return (

    <div className="space-y-3">

      {automations.map((automation) => (

        <div
          key={`${automation.time}-${automation.label}`}
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
              bg-emerald-600
              px-3
              py-1
              text-xs
              font-semibold
              text-white
            "
          >
            {automation.time}
          </div>

          <p
            className="
              text-sm
              text-slate-700
            "
          >
            {automation.label}
          </p>

        </div>

      ))}

    </div>

  );
}