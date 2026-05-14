$ErrorActionPreference = "Stop"

$path = "C:\Users\Admin\terragest\src\runtime\security\sessions\ERPSessionRuntime.ts"

$content = @'
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

    this.session = {
      ...session,
      role: session.role.toLowerCase(),
    };
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

  static isAdmin() {

    return (
      this.session.role.toLowerCase() === "admin"
      ||
      this.hasPermission("*")
    );
  }

  static hasPermission(
    permission: string
  ) {

    return this.session.permissions.some(
      (item) =>
        item.key === permission
        ||
        item.key === "*"
    );
  }

  static canAccessWorkspace(
    workspace: string
  ) {

    return (
      this.isAdmin()
      ||
      this.session.workspaces.includes("*")
      ||
      this.session.workspaces.includes(workspace)
    );
  }

  static canAccessModule(
    module: string
  ) {

    return (
      this.isAdmin()
      ||
      this.session.modules.includes("*")
      ||
      this.session.modules.includes(module)
    );
  }
}
'@

[System.IO.File]::WriteAllText(
  $path,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - ERPSessionRuntime access fixed."
Write-Host "Run: pnpm build"