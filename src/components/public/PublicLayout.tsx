"use client";

import type { PropsWithChildren } from "react";

import {
  PublicNavbar,
} from "./PublicNavbar";

import {
  PublicFooter,
} from "./PublicFooter";

export function PublicLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <PublicNavbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}