import RuntimeStatusCard
from "../components/RuntimeStatusCard";

import EventStream
from "../widgets/EventStream";

import DeadLetterPanel
from "../widgets/DeadLetterPanel";

import RetryMonitor
from "../widgets/RetryMonitor";

export default function
RuntimeHealthTableau de bord() {

  return (

    <div
      className="
        grid
        gap-6
      "
    >

      <RuntimeStatusCard />

      <EventStream />

      <DeadLetterPanel />

      <RetryMonitor />

    </div>
  );
}
