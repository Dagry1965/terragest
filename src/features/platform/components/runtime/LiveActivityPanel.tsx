import LiveEventStream
from "../../../observability/widgets/live/LiveEventStream";

export default function
LiveActivityPanel() {

  return (

    <div
      className="
        rounded-2xl
        overflow-hidden
      "
    >

      <LiveEventStream />

    </div>
  );
}
