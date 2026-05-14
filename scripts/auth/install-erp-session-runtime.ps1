$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

function Write-Utf8NoBom {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path -Parent

  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN $Path"
}

# =========================================================
# ERPSessionTypes.ts
# =========================================================

$typesPath = Join-Path `
  $root `
  "src\runtime\security\sessions\ERPSessionTypes.ts"

$typesContent = @'
export type ERPRuntimePermission = {
  key: string;
};

export interface ERPSessionUser {
  id: string;
  email: string;
  displayName?: string;
}

export interface ERPSessionContext {
  user: ERPSessionUser | null;

  role: string;

  tenant: string;

  permissions:
    ERPRuntimePermission[];

  workspaces:
    string[];

  modules:
    string[];
}
'@

# =========================================================
# ERPSessionRuntime.ts
# =========================================================

$runtimePath = Join-Path `
  $root `
  "src\runtime\security\sessions\ERPSessionRuntime.ts"

$runtimeContent = @'
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
'@

Write-Utf8NoBom `
  -Path $typesPath `
  -Content $typesContent

Write-Utf8NoBom `
  -Path $runtimePath `
  -Content $runtimeContent

Write-Host ""
Write-Host "OK - ERPSessionRuntime installed."
Write-Host "Run: pnpm build"