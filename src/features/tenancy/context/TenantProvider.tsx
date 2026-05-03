"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  TenantService,
  TenantContextType,
} from "@/features/tenancy/services/TenantService";

const mockOrganizations = [
  {
    id: "org-demo",
    tenantId: "tenant-demo",
    name: "Terragest Demo",
    ownerId: "owner-1",
    plan: "enterprise",
    active: true,
  },
  {
    id: "org-farm",
    tenantId: "tenant-farm",
    name: "Farm Group",
    ownerId: "owner-2",
    plan: "pro",
    active: true,
  },
] as any;

const TenantContext =
  createContext<any>(null);

type Props = {

  children: ReactNode;
};

export const TenantProvider = ({
  children,
}: Props) => {

  const [
    activeOrganization,
    setActiveOrganization,
  ] = useState(
    mockOrganizations[0]
  );

  const membership = {
    role: "admin",
  } as any;

  const value =
    useMemo(() => {

      return {

        ...TenantService.buildContext(
          activeOrganization,
          membership
        ),

        organizations:
          mockOrganizations,

        setActiveOrganization,
      };

    }, [activeOrganization]);

  return (
    <TenantContext.Provider
      value={value}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenantContext =
() => {

  return useContext(
    TenantContext
  );
};