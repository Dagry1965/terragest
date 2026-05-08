import EventReplayConsole
from "../../../observability/widgets/live/EventReplayConsole";

export default function
RuntimeConsole() {

  return (

    <div
      className="
        rounded-2xl
        overflow-hidden
      "
    >

      <EventReplayConsole />

    </div>
  );
}
