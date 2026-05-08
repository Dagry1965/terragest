import { PermissionEngine }
from "../permissions/PermissionEngine";

export class AccessController {

  private permissions =
    new PermissionEngine();

  authorize(
    action: string
  ) {

    return this.permissions.can(
      action
    );
  }
}
