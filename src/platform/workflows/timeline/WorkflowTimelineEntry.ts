// src/platform/workflows/timeline/WorkflowTimelineEntry.ts

export interface WorkflowTimelineEntry {

  entityId: string;

  domain: string;

  action: string;

  timestamp: Date;

  user?: string;

  metadata?: Record<
    string,
    unknown
  >;
}
