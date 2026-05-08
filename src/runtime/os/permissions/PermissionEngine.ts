export class PermissionEngine {

  can(
    action: string
  ) {

    console.log(
      "[Permission]",
      action
    );

    return true;
  }
}
