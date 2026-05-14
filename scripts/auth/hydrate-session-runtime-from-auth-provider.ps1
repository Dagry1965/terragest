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

$providerPath = Join-Path `
  $root `
  "src\providers\AuthProvider.tsx"

$content = @'
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

} from "@/lib/firebase/config";

import {

  ERPUserProfileService,

} from "@/runtime/security/users/ERPUserProfileService";

import {

  ERPSessionRuntime,

} from "@/runtime/security/sessions/ERPSessionRuntime";

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

        async (user) => {

          setUser(user);

          if (user) {

            const profile =

              await ERPUserProfileService.getProfile(
                user.uid
              );

            if (profile) {

              ERPSessionRuntime.setSession({

                user: {
                  id: profile.id,
                  email: profile.email,
                  displayName:
                    profile.displayName,
                },

                role:
                  profile.role,

                tenant:
                  profile.tenant,

                permissions:
                  profile.permissions.map(
                    (permission) => ({
                      key: permission,
                    })
                  ),

                workspaces:
                  profile.workspaces,

                modules:
                  profile.modules,
              });
            }

          } else {

            ERPSessionRuntime.setSession({

              user: null,

              role: "guest",

              tenant: "default",

              permissions: [],

              workspaces: [],

              modules: [],
            });
          }

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

Write-Utf8NoBom `
  -Path $providerPath `
  -Content $content

Write-Host ""
Write-Host "OK - AuthProvider hydrates ERPSessionRuntime."
Write-Host "Run: pnpm build"