// src/platform/audit/AuditTrail.ts

export class AuditTrail {

  static log(
    event: string,
    payload?: unknown
  ) {

    console.log("[AUDIT]", {
      event,
      payload,
      timestamp: new Date()
    });
  }
}