Write-Host "Terragest Firebase Core Setup..." -ForegroundColor Cyan

# =====================================================
# FIREBASE.TS
# =====================================================

$firebaseTs = @'
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
'@

Set-Content "src\lib\firebase\firebase.ts" $firebaseTs

# =====================================================
# AUTH.TS
# =====================================================

$authTs = @'
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

export const login = async (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return signOut(auth);
};
'@

Set-Content "src\lib\firebase\auth.ts" $authTs

# =====================================================
# FIRESTORE.TS
# =====================================================

$firestoreTs = @'
import { db } from "./firebase";

export { db };
'@

Set-Content "src\lib\firebase\firestore.ts" $firestoreTs

# =====================================================
# STORAGE.TS
# =====================================================

$storageTs = @'
import { storage } from "./firebase";

export { storage };
'@

Set-Content "src\lib\firebase\storage.ts" $storageTs

# =====================================================
# UTILISATEUR TYPE
# =====================================================

$utilisateurType = @'
export interface Utilisateur {
  id: string;
  organisationId: string;
  nom: string;
  email: string;
  role: "ADMIN" | "GESTIONNAIRE";
  actif: boolean;
}
'@

Set-Content "src\types\utilisateur.ts" $utilisateurType

# =====================================================
# ORGANISATION TYPE
# =====================================================

$organisationType = @'
export interface Organisation {
  id: string;
  nom: string;
  plan: "FREE" | "PRO" | "ENTERPRISE";
  statut: "ACTIVE" | "SUSPENDUE";
  createdAt: string;
}
'@

Set-Content "src\types\organisation.ts" $organisationType

# =====================================================
# TERRAIN TYPE
# =====================================================

$terrainType = @'
export interface Terrain {
  id: string;
  organisationId: string;
  nom: string;
  surfaceTotale: number;
  statut: string;
}
'@

Set-Content "src\types\terrain.ts" $terrainType

# =====================================================
# AUTH PROVIDER
# =====================================================

New-Item -ItemType Directory -Force -Path "src\providers"

$authProvider = @'
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

import { auth } from "@/lib/firebase/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();

  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
'@

Set-Content "src\providers\AuthProvider.tsx" $authProvider

# =====================================================
# AUTH SERVICE
# =====================================================

$authService = @'
import {
  login,
  logout,
} from "@/lib/firebase/auth";

export const AuthService = {
  login,
  logout,
};
'@

Set-Content "src\services\AuthService.ts" $authService

# =====================================================
# FIN
# =====================================================

Write-Host ""
Write-Host "Terragest Firebase Core generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Fill .env.local"
Write-Host "2. Run pnpm dev"
Write-Host "3. Build login page"
Write-Host ""