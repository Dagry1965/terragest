"use client";

import type { PropsWithChildren } from "react";
import { PublicNavbar } from "./PublicNavbar";
import { PublicFooter } from "./PublicFooter";

export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050A0A] text-slate-50">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#00A19C]/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[520px] rounded-full bg-cyan-400/10 blur-[130px]" />
      </div>

      <PublicNavbar />

      <main>
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}
