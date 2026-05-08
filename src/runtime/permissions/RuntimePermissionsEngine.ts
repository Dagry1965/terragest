import {
  runtimePermissions,
}
from "@/runtime/permissions/runtimePermissions";

export class RuntimePermissionsEngine {

  static can(

    role: string,

    module: string,

    action: string,

  ) {

    const permission =
      runtimePermissions.find(

        (item) =>

          item.module ===
            module &&

          item.action ===
            action
      );

    if (!permission) {
      return false;
    }

    return permission.roles.includes(
      role
    );
  }

  static getAllowedActions(

    role: string,

    module: string,

  ) {

    return runtimePermissions.filter(

      (item) =>

        item.module ===
          module &&

        item.roles.includes(
          role
        )
    );
  }
}
