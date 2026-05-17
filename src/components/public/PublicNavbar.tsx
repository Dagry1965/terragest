"use client";

import Link from "next/link";
import { Car, Menu, Phone } from "lucide-react";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Performance", href: "#performance" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050A0A]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00A19C]/40 bg-[#00A19C]/10 shadow-[0_0_40px_rgba(0,161,156,0.25)]">
            <Car className="h-5 w-5 text-[#7FFFE8]" />
          </div>

          <div>
            <p className="text-sm font-black tracking-[0.28em] text-white">
              AMARKHYS
            </p>
            <p className="text-xs font-semibold text-slate-400">
              Garage premium digitalisé
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-300 transition hover:text-[#7FFFE8]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+000000000"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-[#00A19C]/60 hover:bg-[#00A19C]/10"
          >
            <Phone className="h-4 w-4 text-[#7FFFE8]" />
            Appeler
          </a>

          <Link
            href="/rdv"
            className="rounded-2xl bg-[#00A19C] px-5 py-2.5 text-sm font-black text-[#021111] shadow-[0_0_35px_rgba(0,161,156,0.35)] transition hover:bg-[#7FFFE8]"
          >
            Prendre RDV
          </Link>
        </div>

        <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
