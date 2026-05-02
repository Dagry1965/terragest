Write-Host "Generating Terragest Multi-Tenant SaaS..." -ForegroundColor Cyan

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\organisations" -Force
mkdir "src\features\organisations\types" -Force
mkdir "src\features\organisations\services" -Force
mkdir "src\features\organisations\components" -Force

# =====================================================
# ORGANISATION TYPE
# =====================================================

$organisationType = @'
export interface Organisation {

  id: string;

  nom: string;

  code: string;

  actif: boolean;

  logo?: string;

  secteur?: string;

  createdAt: string;
}
'@

Set-Content `
"src\features\organisations\types\Organisation.ts" `
$organisationType

# =====================================================
# ORGANISATION SERVICE
# =====================================================

$organisationService = @'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const OrganisationService = {

  async create(data: any) {

    return addDoc(
      collection(
        db,
        "organisations"
      ),
      data
    );
  },

  async getAll() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "organisations"
        )
      );

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async getById(id: string) {

    const snapshot =
      await getDoc(
        doc(
          db,
          "organisations",
          id
        )
      );

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  },

  async update(
    id: string,
    data: any
  ) {

    return updateDoc(
      doc(
        db,
        "organisations",
        id
      ),
      data
    );
  },
};
'@

Set-Content `
"src\features\organisations\services\OrganisationService.ts" `
$organisationService

# =====================================================
# ORGANISATION SWITCHER
# =====================================================

$organisationSwitcher = @'
"use client";

interface OrganisationSwitcherProps {

  organisations: any[];

  currentOrganisationId?: string;

  onChange: (
    organisationId: string
  ) => void;
}

export const OrganisationSwitcher = ({
  organisations,
  currentOrganisationId,
  onChange,
}: OrganisationSwitcherProps) => {

  return (

    <select
      value={currentOrganisationId}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
      className="
        border
        rounded-xl
        px-4
        py-3
        bg-white
      "
    >

      {organisations.map(
        (organisation) => (

          <option
            key={organisation.id}
            value={organisation.id}
          >

            {organisation.nom}

          </option>

        )
      )}

    </select>
  );
}
'@

Set-Content `
"src\features\organisations\components\OrganisationSwitcher.tsx" `
$organisationSwitcher

# =====================================================
# SUPER ADMIN BADGE
# =====================================================

$superAdminBadge = @'
export const SuperAdminBadge = () => {

  return (

    <div className="
      inline-flex
      items-center
      px-4
      py-2
      rounded-full
      bg-black
      text-white
      text-sm
      font-bold
    ">

      SUPER ADMIN

    </div>
  );
}
'@

Set-Content `
"src\features\organisations\components\SuperAdminBadge.tsx" `
$superAdminBadge

# =====================================================
# TENANT GUARD
# =====================================================

$tenantGuard = @'
interface TenantGuardProps {

  utilisateurOrganisationId?: string;

  resourceOrganisationId?: string;

  children: React.ReactNode;
}

export const TenantGuard = ({
  utilisateurOrganisationId,
  resourceOrganisationId,
  children,
}: TenantGuardProps) => {

  if (
    utilisateurOrganisationId !==
    resourceOrganisationId
  ) {

    return (

      <div className="
        p-6
        bg-red-50
        border
        border-red-300
        rounded-2xl
        text-red-700
      ">

        Accès refusé

      </div>
    );
  }

  return <>{children}</>;
}
'@

Set-Content `
"src\features\organisations\components\TenantGuard.tsx" `
$tenantGuard

# =====================================================
# MULTI TENANT HELPERS
# =====================================================

$tenantHelpers = @'
export const isSameTenant = (
  utilisateurOrganisationId?: string,
  resourceOrganisationId?: string
) => {

  return (
    utilisateurOrganisationId ===
    resourceOrganisationId
  );
}
'@

Set-Content `
"src\features\organisations\services\tenantHelpers.ts" `
$tenantHelpers

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Multi-Tenant SaaS generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- OrganisationService"
Write-Host "- OrganisationSwitcher"
Write-Host "- TenantGuard"
Write-Host "- SuperAdminBadge"
Write-Host "- SaaS multi-tenant foundation"
Write-Host ""