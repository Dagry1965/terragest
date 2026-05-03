# =====================================================
# TERRAGEST
# AUTH + ROLES + PRIVATE ROUTES SAFE SSR
# =====================================================

Set-Location `
"C:\Users\Admin\terragest"

# =====================================================
# USER ROLE TYPE
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path `
"src\features\auth\types"

$userRole = @'
export type USER_ROLE =

  | "ADMIN"

  | "MANAGER"

  | "OPERATEUR";
'@

Set-Content `
-Path `
"src\features\auth\types\USER_ROLE.ts" `
-Value $userRole

# =====================================================
# AUTH SERVICE
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path `
"src\features\auth\services"

$authService = @'
"use client";

import {

  signInWithEmailAndPassword,

  signOut

} from "firebase/auth";

import {

  auth

} from "@/lib/firebase/firebase";

export const
AuthService = {

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
};
'@

Set-Content `
-Path `
"src\features\auth\services\AuthService.ts" `
-Value $authService

# =====================================================
# PRIVATE GUARD
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path `
"src\components\auth"

$guard = @'
"use client";

import {

  useEffect

} from "react";

import {

  useRouter

} from "next/navigation";

import {

  useAuth

} from "@/providers/AuthProvider";

export default function PrivateGuard({

  children,

}: {

  children: React.ReactNode;

}) {

  const {

    user,

    loading

  } = useAuth();

  const router =
    useRouter();

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

    router
  ]);

  if (
    loading
  ) {

    return (

      <div
        className="
          p-10
        "
      >
        Chargement...
      </div>
    );
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
-Path `
"src\components\auth\PrivateGuard.tsx" `
-Value $guard

# =====================================================
# PRIVATE SHELL
# =====================================================

$privateShell = @'
"use client";

import {

  AuthProvider

} from "@/providers/AuthProvider";

import PrivateGuard
from "@/components/auth/PrivateGuard";

export default function PrivateShell({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <AuthProvider>

      <PrivateGuard>

        <div>

          {children}

        </div>

      </PrivateGuard>

    </AuthProvider>
  );
}
'@

Set-Content `
-Path `
"src\components\layout\PrivateShell.tsx" `
-Value $privateShell

# =====================================================
# LOGIN PAGE
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path `
"src\app\login"

$login = @'
"use client";

import {

  useState

} from "react";

import {

  useRouter

} from "next/navigation";

import {

  AuthService

} from "@/features/auth/services/AuthService";

export default function LoginPage() {

  const router =
    useRouter();

  const [

    email,

    setEmail

  ] = useState("");

  const [

    password,

    setPassword

  ] = useState("");

  const [

    loading,

    setLoading

  ] = useState(false);

  const submit =
    async () => {

      try {

        setLoading(true);

        await AuthService.login(

          email,

          password
        );

        router.push(
          "/dashboard"
        );

      } catch (

        error

      ) {

        console.error(
          error
        );

        alert(
          "Connexion refusée"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
      "
    >

      <div
        className="
          bg-white
          rounded-2xl
          shadow-xl
          p-10
          w-full
          max-w-md
          space-y-6
        "
      >

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Connexion
        </h1>

        <input

          type="email"

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
            p-3
          "
        />

        <input

          type="password"

          placeholder="Mot de passe"

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
            p-3
          "
        />

        <button

          onClick={submit}

          disabled={loading}

          className="
            w-full
            bg-green-600
            text-white
            rounded-xl
            p-3
          "
        >

          {
            loading
              ? "Connexion..."
              : "Se connecter"
          }

        </button>

      </div>

    </div>
  );
}
'@

Set-Content `
-Path `
"src\app\login\page.tsx" `
-Value $login

# =====================================================
# BUILD
# =====================================================

Write-Host ""
Write-Host "Running build..." `
-ForegroundColor Cyan

pnpm build

Write-Host ""
Write-Host "Deploy after success:" `
-ForegroundColor Green

Write-Host "firebase deploy"