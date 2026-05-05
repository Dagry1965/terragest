import {
  liveEventStore
}
from "../../stores/live/liveEventStore";

export default function
LiveEventStream() {

  const events =
    liveEventStore.getAll();

  return (

    <div
      className="
        bg-black
        text-green-400
        rounded-2xl
        p-6
        overflow-auto
      "
    >

      <h2
        className="
          text-xl
          font-bold
          mb-4
        "
      >
        Live Event Stream
      </h2>

      <div
        className="
          flex
          flex-col
          gap-2
        "
      >

        {events.map(
          (
            event,
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
                {event.type}
              </div>

              <div
                className="
                  text-xs
                  opacity-70
                "
              >
                {
                  new Date(
                    event.timestamp
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
