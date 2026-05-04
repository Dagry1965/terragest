// src/components/layout/ERPLayout.tsx

"use client";

import {
  ReactNode
}
from "react";

import { ERPSidebar }
from "@/components/sidebar/ERPSidebar";

import { ERPTopbar }
from "@/components/topbar/ERPTopbar";

interface ERPLayoutProps {

  children:
    ReactNode;
}

export function ERPLayout({

  children
}: ERPLayoutProps) {

  return (

    <div
      className="
        flex
        min-h-screen
        bg-zinc-100
      "
    >

      <ERPSidebar />

      <div
        className="
          flex-1
          flex
          flex-col
        "
      >

        <ERPTopbar />

        <main
          className="
            flex-1
            p-6
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
