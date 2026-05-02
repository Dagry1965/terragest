# =====================================================
# TERRAGEST
# CLIENT AUTH SAFE SSR
# =====================================================

Set-Location `
"C:\Users\Admin\terragest"

# =====================================================
# PROVIDERS
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path "src\providers"

# =====================================================
# AUTH PROVIDER
# =====================================================

$authProvider = @'
"use client";

import {

  createContext,

  useContext,

  useEffect,

  useState

} from "react";

import {

  onAuthStateChanged,

  User

} from "firebase/auth";

import {

  auth

} from "@/lib/firebase/firebase";

interface AuthContextType {

  user: User | null;

  loading: boolean;
}

const AuthContext =
  createContext<AuthContextType>({

    user: null,

    loading: true,
  });

export function AuthProvider({

  children,

}: {

  children: React.ReactNode;

}) {

  const [

    user,

    setUser

  ] = useState<User | null>(
    null
  );

  const [

    loading,

    setLoading

  ] = useState(true);

  useEffect(() => {

    const unsubscribe =

      onAuthStateChanged(

        auth,

        (user) => {

          setUser(user);

          setLoading(false);
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
}

export function useAuth() {

  return useContext(
    AuthContext
  );
}
'@

Set-Content `
-Path "src\providers\AuthProvider.tsx" `
-Value $authProvider

# =====================================================
# PRIVATE SHELL
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path "src\components\layout"

$privateShell = @'
"use client";

import {

  AuthProvider

} from "@/providers/AuthProvider";

export default function PrivateShell({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <AuthProvider>

      <div>

        {children}

      </div>

    </AuthProvider>
  );
}
'@

Set-Content `
-Path `
"src\components\layout\PrivateShell.tsx" `
-Value $privateShell

# =====================================================
# PRIVATE LAYOUT
# =====================================================

$privateLayout = @'
"use client";

import dynamic
from "next/dynamic";

const PrivateShell =
  dynamic(

    () => import(
      "@/components/layout/PrivateShell"
    ),

    {
      ssr: false,
    }
  );

export default function Layout({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <PrivateShell>

      {children}

    </PrivateShell>
  );
}
'@

Set-Content `
-Path `
"src\app\(private)\layout.tsx" `
-Value $privateLayout

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

Write-Host ""