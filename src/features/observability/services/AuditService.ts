import {
  AuditEvent,
} from "@/features/observability/types/AuditEvent";

const events:
AuditEvent[] = [];

export const AuditService = {

  async log(
    event: AuditEvent
  ) {

    events.unshift({
      ...event,

      id:
        crypto.randomUUID(),

      createdAt:
        new Date().toISOString(),
    });

    console.log(
      "[AUDIT]",
      event
    );

    return true;
  },

  async getEvents():
  Promise<AuditEvent[]> {

    return events;
  },
};