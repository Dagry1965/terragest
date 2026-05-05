import {
  runtimeActivityStore
}
from "./runtimeActivityStore";

export default function
RuntimeActivityFeed() {

  const activities =
    runtimeActivityStore.getAll();

  return (

    <div
      className="
        bg-slate-950
        text-green-400
        rounded-2xl
        p-6
      "
    >

      <h2
        className="
          text-xl
          font-bold
          mb-4
        "
      >
        Runtime Activity
      </h2>

      <div
        className="
          flex
          flex-col
          gap-3
        "
      >

        {activities.map(
          (
            activity,
            index
          ) => (

            <div
              key={index}
              className="
                border-b
                border-green-700
                pb-2
              "
            >

              <div>
                {activity.type}
              </div>

              <div
                className="
                  text-xs
                  opacity-70
                "
              >
                {
                  new Date(
                    activity.timestamp
                  ).toLocaleString()
                }
              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}
