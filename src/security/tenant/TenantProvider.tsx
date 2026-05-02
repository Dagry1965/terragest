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
