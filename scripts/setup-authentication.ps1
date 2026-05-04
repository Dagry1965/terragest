# =========================================================
# TERRAGEST - AUTHENTICATION SETUP
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " AUTHENTICATION SETUP"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\app\login",

  ".\src\components\auth",

  ".\src\platform\auth",

  ".\src\platform\auth\guards",

  ".\src\platform\auth\session"
)

foreach ($directory in $directories) {

  if (!(Test-Path $directory)) {

    New-Item `
      -ItemType Directory `
      -Path $directory `
      | Out-Null

    Write-Host "[CREATED] $directory"

  } else {

    Write-Host "[EXISTS]  $directory"
  }
}

# =========================================================
# LOGIN PAGE
# =========================================================

$loginPage = @'
// src/app/login/page.tsx

"use client";

import { useState }
from "react";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-zinc-100
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          shadow-sm
          p-8
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Connexion ERP
        </h1>

        <div
          className="
            flex
            flex-col
            gap-4
          "
        >

          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={event =>
              setEmail(
                event.target.value
              )
            }

            className="
              border
              rounded-xl
              px-4
              py-3
            "
          />

          <input

            type="password"

            placeholder="Mot de passe"

            value={password}

            onChange={event =>
              setPassword(
                event.target.value
              )
            }

            className="
              border
              rounded-xl
              px-4
              py-3
            "
          />

          <button
            className="
              bg-black
              text-white
              rounded-xl
              py-3
              font-medium
            "
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}
'@

Set-Content `
  ".\src\app\login\page.tsx" `
  $loginPage

Write-Host ""
Write-Host "[CREATED] Login page"

# =========================================================
# SESSION STORE
# =========================================================

$sessionStore = @'
// src/platform/auth/session/SessionStore.ts

export interface UserSession {

  userId: string;

  email: string;

  role: string;

  tenant: string;
}

class SessionStoreManager {

  private session?:
    UserSession;

  setSession(
    session: UserSession
  ) {

    this.session =
      session;
  }

  getSession() {

    return this.session;
  }

  clear() {

    this.session =
      undefined;
  }

  isAuthenticated() {

    return !!this.session;
  }
}

export const SessionStore =
  new SessionStoreManager();
'@

Set-Content `
  ".\src\platform\auth\session\SessionStore.ts" `
  $sessionStore

Write-Host "[CREATED] SessionStore.ts"

# =========================================================
# AUTH SERVICE
# =========================================================

$authService = @'
// src/platform/auth/AuthService.ts

import {
  SessionStore
}
from "@/platform/auth/session/SessionStore";

export class AuthService {

  static login(

    email: string,

    password: string
  ) {

    console.log(
      "[LOGIN]",
      email
    );

    SessionStore.setSession({

      userId:
        crypto.randomUUID(),

      email,

      role:
        "admin",

      tenant:
        "default"
    });

    return true;
  }

  static logout() {

    SessionStore.clear();

    console.log(
      "[LOGOUT]"
    );
  }

  static session() {

    return SessionStore
      .getSession();
  }
}
'@

Set-Content `
  ".\src\platform\auth\AuthService.ts" `
  $authService

Write-Host "[CREATED] AuthService.ts"

# =========================================================
# AUTH GUARD
# =========================================================

$authGuard = @'
// src/platform/auth/guards/AuthGuard.ts

import { SessionStore }
from "@/platform/auth/session/SessionStore";

export class AuthGuard {

  static check() {

    return SessionStore
      .isAuthenticated();
  }
}
'@

Set-Content `
  ".\src\platform\auth\guards\AuthGuard.ts" `
  $authGuard

Write-Host "[CREATED] AuthGuard.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " AUTH READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-authentication.ps1"
Write-Host "pnpm build"
Write-Host ""