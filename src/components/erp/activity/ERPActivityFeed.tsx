"use client";

export function ERPActivityFeed() {

  const activities = [
    {
      title: "Intervention créée",
      description: "Workflow intervention déclenché sur TR-204.",
    },
    {
      title: "Maintenance validée",
      description: "Validation superviseur enregistrée.",
    },
    {
      title: "Stock critique détecté",
      description: "Réapprovisionnement recommandé.",
    },
  ];

  return (

    <div className="space-y-4">

      {activities.map((activity) => (

        <div
          key={activity.title}
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
          "
        >

          <p
            className="
              text-sm
              font-semibold
              text-slate-900
            "
          >
            {activity.title}
          </p>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            {activity.description}
          </p>

        </div>

      ))}

    </div>

  );
}