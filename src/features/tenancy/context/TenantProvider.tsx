"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from "react";

import {
  TenantService,
  TenantContextType,
} from "@/features/tenancy/services/TenantService";

const TenantContext =
  createContext<TenantContextType>({
    organization: null,
    membership: null,
    tenantId: null,
    organizationId: null,
    role: null,
  });

type Props = {

  children: ReactNode;
};

export const TenantProvider = ({
  children,
}: Props) => {

  // MOCK DATA
  // Replace later with Firebase user context

  const organization = {
    id: "org-demo",
    tenantId: "tenant-demo",
    name: "Terragest Demo",
  } as any;

  const membership = {
    role: "admin",
  } as any;

  const value =
    useMemo(() => {

      return TenantService
        .buildContext(
          organization,
          membership
        );

    }, []);

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