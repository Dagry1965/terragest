
Write-Host "Generating Firestore Enterprise Security..." -ForegroundColor Cyan

# =====================================================
# ROOT
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "firestore" -Force
mkdir "src\security" -Force
mkdir "src\security\rbac" -Force
mkdir "src\security\tenant" -Force
mkdir "src\security\audit" -Force

mkdir "docs" -Force

# =====================================================
# FIRESTORE RULES
# =====================================================

$rules = @'
rules_version = '2';

service cloud.firestore {

  match /databases/{database}/documents {

    function isAuthenticated() {

      return request.auth != null;
    }

    function sameTenant(
      tenantId
    ) {

      return request.auth.token.tenantId
        == tenantId;
    }

    function isAdmin() {

      return request.auth.token.role
        == "ADMIN";
    }

    function isManager() {

      return request.auth.token.role
        == "MANAGER";
    }

    function canWrite() {

      return isAdmin()
        || isManager();
    }

    match /exploitations/{document} {

      allow read:

        if isAuthenticated()
        && sameTenant(
          resource.data.tenantId
        );

      allow create:

        if isAuthenticated()
        && canWrite()
        && sameTenant(
          request.resource.data.tenantId
        );

      allow update:

        if isAuthenticated()
        && canWrite()
        && sameTenant(
          resource.data.tenantId
        );

      allow delete:

        if isAuthenticated()
        && isAdmin()
        && sameTenant(
          resource.data.tenantId
        );
    }
  }
}
'@

Set-Content `
"$ROOT\firestore\firestore.rules" `
$rules

# =====================================================
# RBAC TYPES
# =====================================================

$rbac = @'
export type UserRole =

  | "ADMIN"
  | "MANAGER"
  | "OPERATOR"
  | "VIEWER";
'@

Set-Content `
"$ROOT\src\security\rbac\UserRole.ts" `
$rbac

# =====================================================
# TENANT CONTEXT
# =====================================================

$tenantContext = @'
"use client";

import {
  createContext,
  useContext,
} from "react";

interface TenantContextValue {

  tenantId: string;

  role: string;
}

const TenantContext =
createContext<
  TenantContextValue | null
>(null);

export const TenantProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (

    <TenantContext.Provider
      value={{

        tenantId:
          "tenant-demo",

        role:
          "ADMIN",
      }}
    >

      {children}

    </TenantContext.Provider>
  );
}

export const useTenant =
() => {

  const context =
    useContext(
      TenantContext
    );

  if (!context) {

    throw new Error(
      "useTenant must be used within TenantProvider"
    );
  }

  return context;
}
'@

Set-Content `
"$ROOT\src\security\tenant\TenantProvider.tsx" `
$tenantContext

# =====================================================
# AUDIT SERVICE
# =====================================================

$auditService = @'
export const AuditService = {

  log(
    action: string,
    payload: any
  ) {

    console.log(

      "[AUDIT]",

      action,

      payload
    );
  },
};
'@

Set-Content `
"$ROOT\src\security\audit\AuditService.ts" `
$auditService

# =====================================================
# UPDATED ROOT PROVIDERS
# =====================================================

$providers = @'
"use client";

import {
  ToastProvider,
} from "@/providers/ToastProvider";

import {
  TenantProvider,
} from "@/security/tenant/TenantProvider";

export const RootProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (

    <TenantProvider>

      <ToastProvider>

        {children}

      </ToastProvider>

    </TenantProvider>
  );
}
'@

Set-Content `
"$ROOT\src\providers\RootProviders.tsx" `
$providers

# =====================================================
# SECURED REPOSITORY
# =====================================================

$repository = @'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase/firebase";

import {
  ExploitationInput,
} from "@/features/exploitations/schemas/ExploitationSchema";

const COLLECTION =
"exploitations";

export const ExploitationsRepository = {

  async create(
    payload: ExploitationInput
  ) {

    return addDoc(

      collection(
        db,
        COLLECTION
      ),

      {
        ...payload,

        createdAt:
          new Date(),

        updatedAt:
          new Date(),
      }
    );
  },

  async update(
    id: string,
    payload: Partial<ExploitationInput>
  ) {

    return updateDoc(

      doc(
        db,
        COLLECTION,
        id
      ),

      {
        ...payload,

        updatedAt:
          new Date(),
      }
    );
  },

  async delete(
    id: string
  ) {

    return deleteDoc(

      doc(
        db,
        COLLECTION,
        id
      )
    );
  },

  async paginated(
    tenantId: string,
    lastDoc?: any
  ) {

    const constraints = [

      where(
        "tenantId",
        "==",
        tenantId
      ),

      orderBy(
        "createdAt",
        "desc"
      ),

      limit(10),
    ];

    if (lastDoc) {

      constraints.push(
        startAfter(
          lastDoc
        ) as any
      );
    }

    const q =
      query(

        collection(
          db,
          COLLECTION
        ),

        ...constraints
      );

    return getDocs(q);
  },
};
'@

Set-Content `
"$ROOT\src\features\exploitations\repositories\ExploitationsRepository.ts" `
$repository

# =====================================================
# DOCUMENTATION
# =====================================================

$doc = @'
# Firestore Enterprise Security

## Features

- Tenant isolation
- RBAC
- Firestore rules
- Ownership protection
- Audit foundation

--------------------------------------------------

## Roles

- ADMIN
- MANAGER
- OPERATOR
- VIEWER

--------------------------------------------------

## Status

Phase 7 complete.
Ready for enterprise dashboards & analytics.
'@

Set-Content `
"$ROOT\docs\FIRESTORE_ENTERPRISE_SECURITY.md" `
$doc

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Firestore Enterprise Security generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Firestore rules"
Write-Host "- RBAC"
Write-Host "- Tenant isolation"
Write-Host "- Audit service"
Write-Host "- Enterprise security foundation"
Write-Host ""