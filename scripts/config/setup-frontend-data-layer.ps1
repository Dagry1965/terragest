Write-Host "Generating Terragest Frontend Data Layer..." -ForegroundColor Cyan

# =====================================================
# ROOT PATH
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\providers" -Force
mkdir "src\hooks" -Force
mkdir "src\lib\api" -Force
mkdir "src\store" -Force

# =====================================================
# API CLIENT
# =====================================================

$apiClient = @'
const API_URL =
process.env.NEXT_PUBLIC_API_URL;

const API_KEY =
process.env.NEXT_PUBLIC_API_KEY;

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
              API_KEY || "",
          },
        }
      );

    return response.json();
  },

  async post(
    endpoint: string,
    payload: any
  ) {

    const response =
      await fetch(
        `${API_URL}${endpoint}`,
        {
          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            "x-api-key":
              API_KEY || "",
          },

          body:
            JSON.stringify(
              payload
            ),
        }
      );

    return response.json();
  },
};
'@

Set-Content `
"$ROOT\src\lib\api\apiClient.ts" `
$apiClient

# =====================================================
# QUERY PROVIDER
# =====================================================

$queryProvider = @'
"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient =
  new QueryClient();

interface Props {

  children: React.ReactNode;
}

export const AppQueryProvider = ({
  children,
}: Props) => {

  return (

    <QueryClientProvider
      client={queryClient}
    >

      {children}

    </QueryClientProvider>
  );
}
'@

Set-Content `
"$ROOT\src\providers\AppQueryProvider.tsx" `
$queryProvider

# =====================================================
# AUTH PROVIDER
# =====================================================

$authProvider = @'
"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext =
  createContext<any>(null);

export const AuthProvider = ({
  children,
}: any) => {

  const [user,
    setUser] =
    useState<any>(null);

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useAuth =
  () => useContext(AuthContext);
'@

Set-Content `
"$ROOT\src\providers\AuthProvider.tsx" `
$authProvider

# =====================================================
# TENANT PROVIDER
# =====================================================

$tenantProvider = @'
"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

const TenantContext =
  createContext<any>(null);

export const TenantProvider = ({
  children,
}: any) => {

  const [tenant,
    setTenant] =
    useState({

      organisationId:
        "ORG_001",

      organisationNom:
        "Terragest Enterprise",
    });

  return (

    <TenantContext.Provider
      value={{
        tenant,
        setTenant,
      }}
    >

      {children}

    </TenantContext.Provider>
  );
};

export const useTenant =
  () => useContext(TenantContext);
'@

Set-Content `
"$ROOT\src\providers\TenantProvider.tsx" `
$tenantProvider

# =====================================================
# REALTIME HOOK
# =====================================================

$realtimeHook = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

export const useRealtime =
<T>(
  callback: () => Promise<T>,
  interval = 5000
) => {

  const [data,
    setData] =
    useState<T | null>(null);

  useEffect(() => {

    let mounted = true;

    const load =
      async () => {

        const result =
          await callback();

        if (mounted) {

          setData(result);
        }
      };

    load();

    const timer =
      setInterval(
        load,
        interval
      );

    return () => {

      mounted = false;

      clearInterval(timer);
    };

  }, []);

  return data;
}
'@

Set-Content `
"$ROOT\src\hooks\useRealtime.ts" `
$realtimeHook

# =====================================================
# PRODUCT QUERY HOOK
# =====================================================

$productHook = @'
"use client";

import { useQuery }
from "@tanstack/react-query";

import { apiClient }
from "@/lib/api/apiClient";

export const useProducts =
() => {

  return useQuery({

    queryKey: [
      "products",
    ],

    queryFn:
      async () => {

        return apiClient.get(
          "/v1/products?organisationId=ORG_001"
        );
      },
  });
};
'@

Set-Content `
"$ROOT\src\hooks\useProducts.ts" `
$productHook

# =====================================================
# GLOBAL STORE
# =====================================================

$globalStore = @'
import { create }
from "zustand";

interface AppStore {

  loading: boolean;

  setLoading:
    (
      loading: boolean
    ) => void;
}

export const useAppStore =
create<AppStore>(
  (set) => ({

    loading: false,

    setLoading:
      (
        loading
      ) =>

        set({
          loading,
        }),
  })
);
'@

Set-Content `
"$ROOT\src\store\useAppStore.ts" `
$globalStore

# =====================================================
# ROOT PROVIDERS
# =====================================================

$rootProviders = @'
"use client";

import { AppQueryProvider }
from "@/providers/AppQueryProvider";

import { AuthProvider }
from "@/providers/AuthProvider";

import { TenantProvider }
from "@/providers/TenantProvider";

export const RootProviders = ({
  children,
}: any) => {

  return (

    <AppQueryProvider>

      <AuthProvider>

        <TenantProvider>

          {children}

        </TenantProvider>

      </AuthProvider>

    </AppQueryProvider>
  );
}
'@

Set-Content `
"$ROOT\src\providers\RootProviders.tsx" `
$rootProviders

# =====================================================
# DASHBOARD CONNECTION EXAMPLE
# =====================================================

$dashboardExample = @'
"use client";

import { useProducts }
from "@/hooks/useProducts";

export default function ProductsDashboard() {

  const {
    data,
    isLoading,
  } = useProducts();

  if (isLoading) {

    return <div>
      Loading...
    </div>;
  }

  return (

    <div className="
      p-10
    ">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Products
      </h1>

      <pre>

        {JSON.stringify(
          data,
          null,
          2
        )}

      </pre>

    </div>
  );
}
'@

mkdir `
"$ROOT\src\app\products" `
-Force

Set-Content `
"$ROOT\src\app\products\page.tsx" `
$dashboardExample

# =====================================================
# DOCUMENTATION
# =====================================================

$dataLayerDoc = @'
# Terragest Frontend Data Layer

## Components

- apiClient
- AppQueryProvider
- AuthProvider
- TenantProvider
- useRealtime
- Zustand store

--------------------------------------------------

## Architecture

- React Query
- Context providers
- Global state
- Realtime hooks

--------------------------------------------------

## Benefits

- API standardization
- Realtime sync
- Shared auth state
- Tenant-aware frontend
- Scalable frontend architecture
'@

Set-Content `
"$ROOT\docs\FRONTEND_DATA_LAYER.md" `
$dataLayerDoc

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Frontend Data Layer generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- API client"
Write-Host "- React Query integration"
Write-Host "- Auth provider"
Write-Host "- Tenant provider"
Write-Host "- Realtime hooks"
Write-Host "- Global app state"
Write-Host ""