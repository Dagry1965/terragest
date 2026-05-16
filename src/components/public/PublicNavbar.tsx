"use client";

import Link from "next/link";

export function PublicNavbar() {
  return (
    <nav className="flex items-center justify-between p-6">
      <Link href="/" className="font-bold text-xl">
        AMARKHYS
      </Link>

      <div className="flex gap-4 text-sm">
        <Link href="/services">Services</Link>
        <Link href="/rdv">Rendez-vous</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/login">Connexion</Link>
      </div>
    </nav>
  );
}