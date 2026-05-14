import type {
  ERPSessionContext,
} from "./ERPSessionTypes";

export class ERPSessionRuntime {

  private static session:
    ERPSessionContext = {

    user: null,

    role: "guest",

    tenant: "default",

    permissions: [],

    workspaces: [],

    modules: [],
  };

  static setSession(
    session: ERPSessionContext
  ) {

    this.session =
      session;
  }

  static getSession():
    ERPSessionContext {

    return this.session;
  }

  static getCurrentUser() {

    return this.session.user;
  }

  static getCurrentRole() {

    return this.session.role;
  }

  static getCurrentTenant() {

    return this.session.tenant;
  }

  static getPermissions() {

    return this.session.permissions;
  }

  static hasPermission(
    permission: string
  ) {

    return this.session.permissions.some(
      (item) =>
        item.key === permission
    );
  }

  static canAccessWorkspace(
    workspace: string
  ) {

    return (
      this.session.workspaces.includes(
        workspace
      )
      ||
      this.session.role === "admin"
    );
  }

  static canAccessModule(
    module: string
  ) {

    return (
      this.session.modules.includes(
        module
      )
      ||
      this.session.role === "admin"
    );
  }
}