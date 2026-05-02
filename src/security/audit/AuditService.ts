export const AuditService = {

  log(
    action: string,
    payload: any
  ) {

    console.log(

      "[AUDIT]",

      action,

      payload
    );
  },
};
