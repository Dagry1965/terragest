// src/platform/workflows/timeline/WorkflowTimeline.ts

import {
  WorkflowTimelineEntry
}
from "@/platform/workflows/timeline/WorkflowTimelineEntry";

class WorkflowTimelineManager {

  private entries:
    WorkflowTimelineEntry[] = [];

  add(
    entry: WorkflowTimelineEntry
  ) {

    this.entries.push(
      entry
    );

    console.log(
      "[TIMELINE]",
      entry.domain,
      entry.action
    );
  }

  getByEntity(
    entityId: string
  ) {

    return this.entries.filter(
      entry =>
        entry.entityId
        === entityId
    );
  }
}

export const WorkflowTimeline =
  new WorkflowTimelineManager();
