"use client";

const ACTIVITIES = [

  "Nouvelle exploitation créée",

  "Intervention terminée",

  "Stock faible détecté",

  "Rapport IA généré",

  "Nouvelle inspection mobile",
];

export const DashboardActivityFeed =
() => {

  return (

    <div className="
      bg-white
      rounded-3xl
      shadow-md
      p-6
      space-y-4
    ">

      <div>

        <h2 className="
          text-2xl
          font-bold
        ">

          Activité récente

        </h2>

      </div>

      {ACTIVITIES.map(
        (
          activity
        ) => (

          <div
            key={activity}
            className="
              border-b
              pb-4
              text-gray-700
            "
          >

            {activity}

          </div>

        )
      )}

    </div>
  );
}
