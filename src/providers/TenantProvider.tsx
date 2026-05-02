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
