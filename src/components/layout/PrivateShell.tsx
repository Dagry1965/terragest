"use client";

import {

  AuthProvider

} from "@/providers/AuthProvider";

import PrivateGuard
from "@/components/auth/PrivateGuard";

export default function PrivateShell({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <AuthProvider>

      <PrivateGuard>

        <div>

          {children}

        </div>

      </PrivateGuard>

    </AuthProvider>
  );
}
