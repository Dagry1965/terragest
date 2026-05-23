"use client";

import Link from "next/link";
import {
  CalendarPlus,
  Car,
  Phone,
  Sparkles,
} from "lucide-react";

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020807]/82 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1460px] items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-end gap-3">
          <span className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
            AMARKHYS
          </span>

          <span className="pb-1 text-sm font-black text-slate-300">
            Garage
          </span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black text-slate-200 transition hover:border-[#23ead4]/30 hover:text-white"
          >
            Accueil
          </Link>

          <a
            href="#services"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black text-slate-200 transition hover:border-[#23ead4]/30 hover:text-white"
          >
            Services
          </a>

          <a
            href="#contact"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black text-slate-200 transition hover:border-[#23ead4]/30 hover:text-white"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+2250700000000"
            className="hidden items-center gap-2 rounded-xl border border-[#23ead4]/24 bg-black/18 px-4 py-2 text-xs font-black text-white transition hover:bg-black/28 sm:inline-flex"
          >
            <Phone className="h-4 w-4 text-[#23ead4]" />
            Appeler
          </a>

          <Link
            href="/rdv"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#f5c04a] via-[#d7a83f] to-[#9a6a17] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#0b0b05] shadow-[0_0_34px_rgba(215,168,63,0.18)] transition hover:scale-[1.01]"
          >
            <CalendarPlus className="h-4 w-4" />
            RDV
          </Link>
        </div>
      </div>
    </header>
  );
}
