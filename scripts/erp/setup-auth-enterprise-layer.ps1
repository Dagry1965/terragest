Write-Host "=== TERRAGEST_V2 - SETUP ERP AUTH ENTERPRISE LAYER ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/auth" | Out-Null

@'
import {
  User,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  auth,
} from "@/lib/firebase";

type AuthListener = (
  user: User | null
) => void;

let currentUser:
  User | null = null;

const listeners:
  AuthListener[] = [];

onAuthStateChanged(
  auth,
  (user) => {
    currentUser = user;

    for (const listener of listeners) {
      listener(user);
    }

    console.log(
      "ERP AUTH STATE CHANGED",
      user?.email
    );
  }
);

export function getCurrentUser() {
  return currentUser;
}

export function subscribeAuth(
  listener: AuthListener
) {
  listeners.push(listener);

  listener(currentUser);

  return () => {
    const index =
      listeners.indexOf(
        listener
      );

    if (index >= 0) {
      listeners.splice(
        index,
        1
      );
    }
  };
}

export async function logout() {
  await signOut(auth);
}
'@ | Set-Content "src/core/auth/auth-enterprise-layer.ts"

Write-Host "=== ERP AUTH ENTERPRISE LAYER créé avec succès ===" -ForegroundColor Green