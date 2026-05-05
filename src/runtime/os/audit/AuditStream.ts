export class AuditStream {

  log(
    event: string,
    payload?: unknown
  ) {

    console.log(
      "[Audit]",
      event,
      payload
    );
  }
}
