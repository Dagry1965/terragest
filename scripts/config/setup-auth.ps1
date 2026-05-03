$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "====================================="
Write-Host " TERRAGEST AUTH SETUP"
Write-Host "====================================="
Write-Host ""

# -----------------------------
# DOSSIERS
# -----------------------------

$folders = @(
  "lib/firebase",
  "contexts",
  "app/login"
)

foreach ($folder in $folders) {
  if (!(Test-Path $folder)) {
    New-Item -ItemType Directory -Path $folder -Force | Out-Null
    Write-Host "Created folder: $folder"
  }
}

# -----------------------------
# FIREBASE CONFIG
# -----------------------------

$firebaseConfig = @'
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
'@

Set-Content `
  -Path "lib/firebase/config.ts" `
  -Value $firebaseConfig `
  -Encoding UTF8

Write-Host "Created: lib/firebase/config.ts"

# -----------------------------
# AUTH CONTEXT
# -----------------------------

$authContext = @'
"use client";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth } from "@/lib/firebase/config";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {
          setUser(user);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);
'@

Set-Content `
  -Path "contexts/AuthContext.tsx" `
  -Value $authContext `
  -Encoding UTF8

Write-Host "Created: contexts/AuthContext.tsx"

# -----------------------------
# LOGIN PAGE
# -----------------------------

$loginPage = @'
"use client";

import { useState } from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/lib/firebase/config";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Connexion Terragest
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border p-3 rounded-lg"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
'@

Set-Content `
  -Path "app/login/page.tsx" `
  -Value $loginPage `
  -Encoding UTF8

Write-Host "Created: app/login/page.tsx"

Write-Host ""
Write-Host "====================================="
Write-Host " AUTH SETUP COMPLETE"
Write-Host "====================================="
Write-Host ""
Write-Host "NEXT STEPS:"
Write-Host "1. Update app/layout.tsx"
Write-Host "2. pnpm build"
Write-Host "3. firebase deploy"
Write-Host ""