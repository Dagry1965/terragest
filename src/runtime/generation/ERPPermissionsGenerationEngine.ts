export interface ERPGeneratedPermission {

  module: string;

  permissions: string[];
}

export class ERPPermissionsGenerationEngine {

  generatePermissions(
    module: string
  ): ERPGeneratedPermission {

    return {

      module,

      permissions: [
        "create",
        "read",
        "update",
        "delete",
        "approve",
        "export",
      ],
    };
  }
}

export const erpPermissionsGenerationEngine =
  new ERPPermissionsGenerationEngine();