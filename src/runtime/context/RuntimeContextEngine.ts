export class RuntimeContextEngine {

  static buildContext(
    data: any
  ) {

    return {

      role:
        data.role,

      module:
        data.module,

      entityType:
        data.entityType,

      criticite:
        data.criticite,

      exploitationType:
        data.exploitationType,

      materielType:
        data.materielType,
    };
  }
}
