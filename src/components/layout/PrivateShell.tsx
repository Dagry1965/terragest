"use client";

import {

  AuthProvider

} from "@/providers/AuthProvider";

export default function PrivateShell({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <AuthProvider>

      <div>

        {children}

      </div>

    </AuthProvider>
  );
}
