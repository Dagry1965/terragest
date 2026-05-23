import type { ReactNode } from "react";

import { PublicFooter } from "./PublicFooter";
import { PublicNavbar } from "./PublicNavbar";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <main className="min-h-screen bg-[#020807] text-white">
      <PublicNavbar />
      {children}
      <PublicFooter />
    </main>
  );
}
