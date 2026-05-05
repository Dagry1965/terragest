import {
  AuditRepository
}
from "../../persistence/audit/AuditRepository";

export class
PersistentAuditStream {

  private repository =
    new AuditRepository();

  async log(
    event: string,
    payload?: unknown
  ) {

    await this.repository.save({
      event,
      payload,
    });

    console.log(
      "[PersistentAudit]",
      event
    );
  }
}
