"use client";

export function ERPAuditTrail() {

  const entries = [
    {
      user: "admin",
      action: "Validation intervention",
      time: "10:52",
    },
    {
      user: "supervisor",
      action: "Modification workflow maintenance",
      time: "10:58",
    },
    {
      user: "system",
      action: "Automation déclenchée",
      time: "11:03",
    },
    {
      user: "admin",
      action: "Synchronisation Firestore",
      time: "11:07",
    },
  ];

  return (

    <div className="space-y-3">

      {entries.map((entry) => (

        <div
          key={`${entry.user}-${entry.time}`}
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-4
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
              {entry.action}
            </p>

            <p
              className="
                text-xs
                text-slate-400
              "
            >
              {entry.time}
            </p>

          </div>

          <p
            className="
              mt-2
              text-xs
              text-slate-500
            "
          >
            {entry.user}
          </p>

        </div>

      ))}

    </div>

  );
}