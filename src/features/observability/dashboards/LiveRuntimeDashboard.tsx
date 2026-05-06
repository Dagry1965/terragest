import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";
import LiveEventStream
from "../widgets/live/LiveEventStream";

import WorkflowExecutionPanel
from "../widgets/live/WorkflowExecutionPanel";

import RetryActivityPanel
from "../widgets/live/RetryActivityPanel";

import DeadLetterFeed
from "../widgets/live/DeadLetterFeed";

import EventReplayConsole
from "../widgets/live/EventReplayConsole";

export default function
LiveRuntimeDashboard() {

  return (

    <div
      className="
        grid
        gap-6
      "
    >

      <LiveEventStream />

      <WorkflowExecutionPanel />

      <RetryActivityPanel />

      <DeadLetterFeed />

      <EventReplayConsole />

    </div>
  );
}


