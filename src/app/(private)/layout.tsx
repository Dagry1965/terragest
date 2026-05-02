"use client";

import dynamic
from "next/dynamic";

const PrivateShell =
  dynamic(

    () => import(
      "@/components/layout/PrivateShell"
    ),

    {
      ssr: false,
    }
  );

export default function Layout({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <PrivateShell>

      {children}

    </PrivateShell>
  );
}