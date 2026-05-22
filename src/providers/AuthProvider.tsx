"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  auth,
} from "@/lib/firebase/config";

import {
  ERPUserProfileService,
} from "@/runtime/security/users/ERPUserProfileService";

import {
  ERPSessionRuntime,
} from "@/runtime/security/sessions/ERPSessionRuntime";

import {
  ERPSessionContext,
} from "@/runtime/security/sessions/ERPSessionContext";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext =
  createContext<AuthContextType>({
    user: null,
    loading: true,
  });

function syncSecuritySessionContext({
  userId,
  displayName,
  role,
  tenant,
}: {
  userId: string;
  displayName: string;
  role: string;
  tenant: string;
}) {
  ERPSessionContext.set({
    userId,
    displayName,
    role: role as any,
    tenantId: tenant,
  });
}

function syncGuestSessionContext() {
  ERPSessionRuntime.setSession({
    user: null,
    role: "guest",
    tenant: "default",
    permissions: [],
    workspaces: [],
    modules: [],
  });

  syncSecuritySessionContext({
    userId: "guest",
    displayName: "Invité",
    role: "guest",
    tenant: "default",
  });
}

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    user,
    setUser,
  ] = useState<User | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {
          setUser(user);

          if (user) {
            console.log(
              "AUTH USER",
              user.uid,
              user.email
            );

            const profile =
              await ERPUserProfileService.getProfile(
                user.uid
              );

            console.log(
              "PROFILE",
              profile
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

              syncSecuritySessionContext({
                userId:
                  profile.id,

                displayName:
                  profile.displayName ??
                  profile.email,

                role:
                  profile.role,

                tenant:
                  profile.tenant,
              });

            } else if (
              user.email ===
              "admin@terragest.com"
            ) {
              ERPSessionRuntime.setSession({
                user: {
                  id: user.uid,
                  email:
                    user.email ?? "",
                  displayName:
                    "Admin",
                },

                role: "admin",

                tenant:
                  "ORG_ABC_001",

                permissions: [
                  {
                    key: "*",
                  },
                ],

                workspaces: ["*"],

                modules: ["*"],
              });

              syncSecuritySessionContext({
                userId:
                  user.uid,

                displayName:
                  "Admin",

                role:
                  "admin",

                tenant:
                  "ORG_ABC_001",
              });

              console.log(
                "ADMIN FALLBACK SESSION ENABLED"
              );

            } else {
              syncGuestSessionContext();
            }

          } else {
            syncGuestSessionContext();
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