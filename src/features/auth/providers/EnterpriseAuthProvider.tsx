"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthService }
from "@/features/auth/services/AuthService";

const AuthContext =
  createContext<any>(null);

export const EnterpriseAuthProvider = ({
  children,
}: any) => {

  const [user,
    setUser] =
    useState<any>(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      AuthService.subscribe(
        (
          currentUser: any
        ) => {

          setUser(
            currentUser
          );

          setLoading(
            false
          );
        }
      );

    return () =>
      unsubscribe();

  }, []);

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useEnterpriseAuth =
  () => useContext(AuthContext);
