Write-Host "Generating Terragest Multi-Organisation Enterprise Layer..." -ForegroundColor Cyan

# =====================================================
# GO TO WEB ERP ROOT
# =====================================================

Set-Location "..\..\"

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\multi-tenant" -Force
mkdir "src\features\multi-tenant\types" -Force
mkdir "src\features\multi-tenant\services" -Force
mkdir "src\features\multi-tenant\components" -Force
mkdir "src\features\multi-tenant\hooks" -Force

# =====================================================
# ORGANISATION TYPE
# =====================================================

$organisationType = @'
export interface Organisation {

  id: string;

  nom: string;

  type?: string;

  parentOrganisationId?: string;

  actif: boolean;

  pays?: string;

  devise?: string;

  timezone?: string;

  createdAt: string;
}
'@

Set-Content `
"src\features\multi-tenant\types\Organisation.ts" `
$organisationType

# =====================================================
# TENANT CONTEXT TYPE
# =====================================================

$tenantContext = @'
export interface TenantContext {

  organisationId: string;

  organisationNom: string;

  role: string;

  permissions: string[];
}
'@

Set-Content `
"src\features\multi-tenant\types\TenantContext.ts" `
$tenantContext

# =====================================================
# ORGANISATION SERVICE
# =====================================================

$organisationService = @'
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const OrganisationService = {

  async create(
    data: any
  ) {

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

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  },

  async getChildren(
    parentOrganisationId: string
  ) {

    const q =
      query(
        collection(
          db,
          "organisations"
        ),

        where(
          "parentOrganisationId",
          "==",
          parentOrganisationId
        )
      );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  },
};
'@

Set-Content `
"src\features\multi-tenant\services\OrganisationService.ts" `
$organisationService

# =====================================================
# TENANT SECURITY SERVICE
# =====================================================

$tenantSecurity = @'
export const TenantSecurityService = {

  canAccess(
    userOrganisationId: string,
    resourceOrganisationId: string
  ) {

    return (
      userOrganisationId ===
      resourceOrganisationId
    );
  },

  filterByTenant(
    items: any[],
    organisationId: string
  ) {

    return items.filter(
      (item) =>
        item.organisationId ===
        organisationId
    );
  },
};
'@

Set-Content `
"src\features\multi-tenant\services\TenantSecurityService.ts" `
$tenantSecurity

# =====================================================
# TENANT HOOK
# =====================================================

$tenantHook = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

export const useTenant =
  () => {

    const [tenant,
      setTenant] =
      useState<any>(null);

    useEffect(() => {

      setTenant({

        organisationId:
          "ORG_DEMO",

        organisationNom:
          "Terragest Enterprise",

        role:
          "ADMIN",

        permissions: [
          "READ",
          "WRITE",
          "DELETE",
          "MANAGE",
        ],
      });

    }, []);

    return tenant;
  };
'@

Set-Content `
"src\features\multi-tenant\hooks\useTenant.ts" `
$tenantHook

# =====================================================
# ORGANISATION CARD
# =====================================================

$organisationCard = @'
interface OrganisationCardProps {

  organisation: any;
}

export const OrganisationCard = ({
  organisation,
}: OrganisationCardProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <p className="
        text-gray-500
      ">
        {organisation.type ||
         "Organisation"}
      </p>

      <h2 className="
        text-2xl
        font-bold
        mt-2
      ">
        {organisation.nom}
      </h2>

      <div className="
        mt-6
        space-y-2
      ">

        <p className="
          text-sm
          text-gray-500
        ">
          Pays :
          {organisation.pays || "-"}
        </p>

        <p className="
          text-sm
          text-gray-500
        ">
          Devise :
          {organisation.devise || "-"}
        </p>

        <p className="
          text-sm
          text-gray-500
        ">
          Timezone :
          {organisation.timezone || "-"}
        </p>

      </div>

    </div>
  );
}
'@

Set-Content `
"src\features\multi-tenant\components\OrganisationCard.tsx" `
$organisationCard

# =====================================================
# ORGANISATION DASHBOARD
# =====================================================

$organisationDashboard = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import { OrganisationService } from "@/features/multi-tenant/services/OrganisationService";

import { OrganisationCard } from "@/features/multi-tenant/components/OrganisationCard";

export const OrganisationDashboard = () => {

  const [organisations,
    setOrganisations] =
    useState<any[]>([]);

  useEffect(() => {

    load();

  }, []);

  const load =
    async () => {

      const data =
        await OrganisationService.getAll();

      setOrganisations(
        data
      );
    };

  return (

    <div className="
      space-y-6
    ">

      <div>

        <h2 className="
          text-3xl
          font-bold
        ">
          Multi-Organisation
        </h2>

        <p className="
          text-gray-500
          mt-2
        ">
          Gouvernance enterprise SaaS
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        {organisations.map(
          (organisation) => (

            <OrganisationCard
              key={organisation.id}
              organisation={organisation}
            />

          )
        )}

      </div>

    </div>
  );
}
'@

Set-Content `
"src\features\multi-tenant\components\OrganisationDashboard.tsx" `
$organisationDashboard

# =====================================================
# CROSS TENANT ANALYTICS
# =====================================================

$crossTenant = @'
export const CrossTenantAnalytics = {

  aggregate(
    organisations: any[]
  ) {

    return {

      totalOrganisations:
        organisations.length,

      totalRevenue:
        0,

      totalUsers:
        0,

      activeSensors:
        0,
    };
  },
};
'@

Set-Content `
"src\features\multi-tenant\services\CrossTenantAnalytics.ts" `
$crossTenant

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Multi-Organisation Enterprise Layer generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Multi-organisation"
Write-Host "- Tenant isolation"
Write-Host "- Enterprise governance"
Write-Host "- Cross-tenant analytics"
Write-Host "- SaaS enterprise foundation"
Write-Host ""
