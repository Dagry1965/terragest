Write-Host "Generating Terragest Enterprise Authentication Platform..." -ForegroundColor Cyan

# =====================================================
# ROOT PATH
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\auth" -Force
mkdir "src\features\auth\services" -Force
mkdir "src\features\auth\hooks" -Force
mkdir "src\features\auth\guards" -Force
mkdir "src\features\auth\components" -Force
mkdir "src\features\auth\providers" -Force

# =====================================================
# FIREBASE AUTH SERVICE
# =====================================================

$authService = @'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth }
from "@/lib/firebase/firebase";

export const AuthService = {

  async login(
    email: string,
    password: string
  ) {

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  },

  async logout() {

    return signOut(auth);
  },

  subscribe(
    callback: any
  ) {

    return onAuthStateChanged(
      auth,
      callback
    );
  },
};
'@

Set-Content `
"$ROOT\src\features\auth\services\AuthService.ts" `
$authService

# =====================================================
# AUTH PROVIDER
# =====================================================

$authProvider = @'
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthService }
from "@/features/auth/services/AuthService";

const AuthContext =
  createContext<any>(null);

export const EnterpriseAuthProvider = ({
  children,
}: any) => {

  const [user,
    setUser] =
    useState<any>(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      AuthService.subscribe(
        (
          currentUser: any
        ) => {

          setUser(
            currentUser
          );

          setLoading(
            false
          );
        }
      );

    return () =>
      unsubscribe();

  }, []);

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useEnterpriseAuth =
  () => useContext(AuthContext);
'@

Set-Content `
"$ROOT\src\features\auth\providers\EnterpriseAuthProvider.tsx" `
$authProvider

# =====================================================
# RBAC ENGINE
# =====================================================

$rbacEngine = @'
export const RBACEngine = {

  hasRole(
    role: string,
    allowedRoles: string[]
  ) {

    return allowedRoles.includes(
      role
    );
  },

  canAccess(
    permissions: string[],
    permission: string
  ) {

    return permissions.includes(
      permission
    );
  },
};
'@

Set-Content `
"$ROOT\src\features\auth\services\RBACEngine.ts" `
$rbacEngine

# =====================================================
# AUTH GUARD
# =====================================================

$authGuard = @'
"use client";

import { useRouter }
from "next/navigation";

import {
  useEffect,
} from "react";

import {
  useEnterpriseAuth,
} from "@/features/auth/providers/EnterpriseAuthProvider";

export const AuthGuard = ({
  children,
}: any) => {

  const router =
    useRouter();

  const {
    user,
    loading,
  } =
    useEnterpriseAuth();

  useEffect(() => {

    if (
      !loading &&
      !user
    ) {

      router.push(
        "/login"
      );
    }

  }, [
    user,
    loading,
  ]);

  if (
    loading
  ) {

    return <div>
      Loading...
    </div>;
  }

  if (
    !user
  ) {

    return null;
  }

  return children;
}
'@

Set-Content `
"$ROOT\src\features\auth\guards\AuthGuard.tsx" `
$authGuard

# =====================================================
# LOGIN FORM
# =====================================================

$loginForm = @'
"use client";

import {
  useState,
} from "react";

import {
  AuthService,
} from "@/features/auth/services/AuthService";

export const LoginForm = () => {

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleLogin =
    async () => {

      try {

        setLoading(true);

        await AuthService.login(
          email,
          password
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="
      w-full
      max-w-md
      bg-white
      rounded-2xl
      shadow-lg
      p-8
    ">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Login
      </h1>

      <div className="
        space-y-4
      ">

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            bg-black
            text-white
            py-3
            rounded-xl
          "
        >

          {loading
            ? "Connexion..."
            : "Connexion"}

        </button>

      </div>

    </div>
  );
}
'@

Set-Content `
"$ROOT\src\features\auth\components\LoginForm.tsx" `
$loginForm

# =====================================================
# LOGIN PAGE
# =====================================================

$loginPage = @'
import {
  LoginForm,
} from "@/features/auth/components/LoginForm";

export default function LoginPage() {

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
    ">

      <LoginForm />

    </div>
  );
}
'@

mkdir `
"$ROOT\src\app\login" `
-Force

Set-Content `
"$ROOT\src\app\login\page.tsx" `
$loginPage

# =====================================================
# PROTECTED DASHBOARD
# =====================================================

$protectedDashboard = @'
"use client";

import {
  AuthGuard,
} from "@/features/auth/guards/AuthGuard";

export default function ProtectedDashboard() {

  return (

    <AuthGuard>

      <div className="
        p-10
      ">

        <h1 className="
          text-5xl
          font-bold
        ">
          Enterprise Dashboard
        </h1>

      </div>

    </AuthGuard>
  );
}
'@

mkdir `
"$ROOT\src\app\enterprise" `
-Force

Set-Content `
"$ROOT\src\app\enterprise\page.tsx" `
$protectedDashboard

# =====================================================
# USE PERMISSIONS HOOK
# =====================================================

$permissionsHook = @'
"use client";

import {
  RBACEngine,
} from "@/features/auth/services/RBACEngine";

export const usePermissions =
(
  permissions: string[]
) => {

  return {

    canAccess:
      (
        permission: string
      ) =>

        RBACEngine.canAccess(
          permissions,
          permission
        ),
  };
}
'@

Set-Content `
"$ROOT\src\features\auth\hooks\usePermissions.ts" `
$permissionsHook

# =====================================================
# SESSION STORE
# =====================================================

$sessionStore = @'
import { create }
from "zustand";

interface SessionStore {

  token?: string;

  setToken:
    (
      token: string
    ) => void;
}

export const useSessionStore =
create<SessionStore>(
  (set) => ({

    token: undefined,

    setToken:
      (
        token
      ) =>

        set({
          token,
        }),
  })
);
'@

Set-Content `
"$ROOT\src\features\auth\hooks\useSessionStore.ts" `
$sessionStore

# =====================================================
# DOCUMENTATION
# =====================================================

$authDoc = @'
# Terragest Enterprise Authentication

## Features

- Firebase Authentication
- EnterpriseAuthProvider
- RBAC Engine
- AuthGuard
- Session management
- Protected routes

--------------------------------------------------

## Security

- Multi-user
- Role-based access
- Session handling
- Enterprise auth architecture

--------------------------------------------------

## Architecture

- AuthService
- Providers
- Guards
- Hooks
- RBAC
'@

Set-Content `
"$ROOT\docs\ENTERPRISE_AUTH.md" `
$authDoc

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Enterprise Authentication Platform generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Firebase Authentication"
Write-Host "- Auth provider"
Write-Host "- RBAC engine"
Write-Host "- Protected routes"
Write-Host "- Session management"
Write-Host "- Enterprise authentication architecture"
Write-Host ""