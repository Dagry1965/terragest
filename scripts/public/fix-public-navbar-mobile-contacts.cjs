const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function write(relativePath, content) {
  const file = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("WRITTEN", relativePath);
}

write(
  "src/components/public/publicContactConfig.ts",
`export const publicContactConfig = {
  phoneDisplay: "+000000000",
  phoneHref: "tel:+000000000",
  whatsappHref: "https://wa.me/",
  address: "Adresse garage",
  hours: "Lundi - Samedi",
};
`
);

write(
  "src/components/public/PublicNavbar.tsx",
`"use client";

import Link from "next/link";
import { useState } from "react";
import { Car, Menu, Phone, X } from "lucide-react";

import {
  publicContactConfig,
} from "./publicContactConfig";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Performance", href: "#performance" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050A0A]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
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
            href={publicContactConfig.phoneHref}
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

        <button
          type="button"
          onClick={() => setMobileOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 md:hidden"
          aria-label="Ouvrir le menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-[#050A0A]/95 px-6 py-5 backdrop-blur-2xl md:hidden">
          <div className="mx-auto grid max-w-7xl gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-[#00A19C]/60 hover:text-[#7FFFE8]"
              >
                {item.label}
              </a>
            ))}

            <a
              href={publicContactConfig.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-white"
            >
              <Phone className="h-4 w-4 text-[#7FFFE8]" />
              Appeler
            </a>

            <Link
              href="/rdv"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center rounded-2xl bg-[#00A19C] px-5 py-3 text-sm font-black text-[#021111]"
            >
              Prendre RDV
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
`
);

write(
  "src/components/public/PublicContact.tsx",
`"use client";

import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import {
  publicContactConfig,
} from "./publicContactConfig";

const contacts = [
  {
    icon: Phone,
    title: "Téléphone",
    value: publicContactConfig.phoneDisplay,
    href: publicContactConfig.phoneHref,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Disponible",
    href: publicContactConfig.whatsappHref,
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: publicContactConfig.address,
    href: "#contact",
  },
  {
    icon: Clock,
    title: "Horaires",
    value: publicContactConfig.hours,
    href: "#contact",
  },
];

export function PublicContact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#7FFFE8]">
          Contact
        </p>

        <h2 className="mt-4 text-4xl font-black tracking-tight text-white">
          Un atelier proche, un suivi plus intelligent.
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        {contacts.map((contact) => {
          const Icon = contact.icon;

          return (
            <a
              key={contact.title}
              href={contact.href}
              className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#00A19C]/40 hover:bg-[#00A19C]/10"
            >
              <Icon className="h-6 w-6 text-[#7FFFE8]" />

              <h3 className="mt-5 font-black text-white">
                {contact.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {contact.value}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
}
`
);

write(
  "src/components/public/PublicCTA.tsx",
`"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import {
  publicContactConfig,
} from "./publicContactConfig";

export function PublicCTA() {
  return (
    <section id="performance" className="mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[#00A19C]/25 bg-[#00A19C]/10 p-8 shadow-[0_0_90px_rgba(0,161,156,0.16)] md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,255,232,0.22),transparent_35%)]" />

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#7FFFE8]">
              Performance moteur
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
              Un entretien premium pour préserver la performance.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Lubrifiants PETRONAS disponibles, diagnostic clair et suivi digital : AMARKHYS donne à votre véhicule une expérience d’entretien plus moderne.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href="/rdv"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#00A19C] px-6 py-4 text-sm font-black text-[#021111] transition hover:bg-[#7FFFE8]"
            >
              Prendre rendez-vous
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={publicContactConfig.whatsappHref}
              target="_blank"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-black text-white transition hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4 text-[#7FFFE8]" />
              WhatsApp
            </a>

            <a
              href={publicContactConfig.phoneHref}
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-black text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-[#7FFFE8]" />
              Appeler
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
`
);

console.log("");
console.log("Public navbar mobile + contacts fixed.");
console.log("Done.");