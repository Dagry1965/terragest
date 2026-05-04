// src/platform/timeline/ERPTimeline.ts

export interface TimelineEntry {

  entity: string;

  action: string;

  timestamp: Date;

  payload?: unknown;
}

class ERPTimelineManager {

  private entries:
    TimelineEntry[] = [];

  add(
    entry: TimelineEntry
  ) {

    this.entries.push(entry);

    console.log(
      "[TIMELINE]",
      entry.action
    );
  }

  getEntries() {

    return this.entries;
  }

  getEntityTimeline(
    entity: string
  ) {

    return this.entries.filter(
      item => item.entity === entity
    );
  }
}

export const ERPTimeline =
  new ERPTimelineManager();