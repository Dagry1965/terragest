"use client";

import { useRouter }
from "next/navigation";

import {
  useEffect,
} from "react";

import {
  useEnterpriseAuth,
} from "@/features/auth/providers/EnterpriseAuthProvider";

export const AuthGuard = ({
  children,
}: any) => {

  const router =
    useRouter();

  const {
    user,
    loading,
  } =
    useEnterpriseAuth();

  useEffect(() => {

    if (
      !loading &&
      !user
    ) {

      router.push(
        "/login"
      );
    }

  }, [
    user,
    loading,
  ]);

  if (
    loading
  ) {

    return <div>
      Loading...
    </div>;
  }

  if (
    !user
  ) {

    return null;
  }

  return children;
}
