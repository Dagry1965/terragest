Write-Host "Generating Terragest Mobile App Foundation..." -ForegroundColor Cyan

# =====================================================
# MOBILE ROOT
# =====================================================

mkdir "mobile" -Force

Set-Location "mobile"

# =====================================================
# EXPO INIT
# =====================================================

npx create-expo-app@latest terragest-mobile

Set-Location "terragest-mobile"

# =====================================================
# INSTALL DEPENDENCIES
# =====================================================

npm install firebase

npm install @react-navigation/native

npm install @react-navigation/native-stack

npm install react-native-screens

npm install react-native-safe-area-context

npm install react-native-gesture-handler

npm install react-native-reanimated

npm install react-native-svg

npm install react-native-chart-kit

npm install expo-secure-store

# =====================================================
# MOBILE FOLDERS
# =====================================================

mkdir "src" -Force

mkdir "src\services" -Force
mkdir "src\screens" -Force
mkdir "src\components" -Force
mkdir "src\hooks" -Force
mkdir "src\types" -Force
mkdir "src\navigation" -Force

# =====================================================
# FIREBASE CONFIG
# =====================================================

$firebaseConfig = @'
import { initializeApp } from "firebase/app";

import {
  getAuth,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {

  apiKey:
    process.env.EXPO_PUBLIC_FIREBASE_API_KEY,

  authDomain:
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,

  projectId:
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,

  storageBucket:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,

  messagingSenderId:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

  appId:
    process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app =
  initializeApp(
    firebaseConfig
  );

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);
'@

Set-Content `
"src\services\firebase.ts" `
$firebaseConfig

# =====================================================
# API CLIENT
# =====================================================

$apiClient = @'
const API_URL =
  "http://localhost:3000/api";

const API_KEY =
  "terrageest_super_secret_key_2026";

export const apiClient = {

  async get(
    endpoint: string
  ) {

    const response =
      await fetch(
        `${API_URL}${endpoint}`,
        {
          headers: {
            "x-api-key":
              API_KEY,
          },
        }
      );

    return response.json();
  },
};
'@

Set-Content `
"src\services\apiClient.ts" `
$apiClient

# =====================================================
# PRODUCTS SCREEN
# =====================================================

$productsScreen = @'
import {
  useEffect,
  useState,
} from "react";

import {
  FlatList,
  Text,
  View,
} from "react-native";

import { apiClient } from "@/services/apiClient";

export default function ProductsScreen() {

  const [produits,
    setProduits] =
    useState<any[]>([]);

  useEffect(() => {

    loadProduits();

  }, []);

  const loadProduits =
    async () => {

      try {

        const response =
          await apiClient.get(
            "/produits?organisationId=ORG_ID"
          );

        setProduits(
          response.data || []
        );

      } catch (err) {

        console.error(err);
      }
    };

  return (

    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >

      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Produits
      </Text>

      <FlatList
        data={produits}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (

          <View
            style={{
              backgroundColor:
                "white",

              padding: 16,

              borderRadius: 16,

              marginBottom: 12,
            }}
          >

            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {item.nom}
            </Text>

            <Text>
              {item.categorie}
            </Text>

          </View>

        )}
      />

    </View>
  );
}
'@

Set-Content `
"src\screens\ProductsScreen.tsx" `
$productsScreen

# =====================================================
# APP TSX
# =====================================================

$appTsx = @'
import ProductsScreen from "./src/screens/ProductsScreen";

export default function App() {

  return <ProductsScreen />;
}
'@

Set-Content `
"App.tsx" `
$appTsx

# =====================================================
# ENV TEMPLATE
# =====================================================

$envMobile = @'
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
'@

Set-Content `
".env" `
$envMobile

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Mobile App Foundation generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Expo mobile app"
Write-Host "- Firebase mobile"
Write-Host "- API client"
Write-Host "- Products mobile screen"
Write-Host "- Mobile SaaS foundation"
Write-Host ""