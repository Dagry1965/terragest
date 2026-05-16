"use client";

const ACTIVITIES = [

  "Nouvelle exploitation crÃ©Ã©e",

  "Intervention terminÃ©e",

  "Stock faible dÃ©tectÃ©",

  "Rapport IA gÃ©nÃ©rÃ©",

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

          ActivitÃ© rÃ©cente

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
