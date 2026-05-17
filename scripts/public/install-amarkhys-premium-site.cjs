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
  "src/components/public/PublicLayout.tsx",
`"use client";

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
`
);

write(
  "src/components/public/PublicNavbar.tsx",
`"use client";

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
`
);

write(
  "src/components/public/PublicHero.tsx",
`"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Gauge, ShieldCheck, Sparkles, Wrench } from "lucide-react";

const stats = [
  { label: "Suivi digital", value: "100%" },
  { label: "Diagnostic", value: "Clair" },
  { label: "Entretien", value: "Premium" },
];

export function PublicHero() {
  return (
    <section className="relative isolate mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00A19C]/30 bg-[#00A19C]/10 px-4 py-2 text-sm font-bold text-[#7FFFE8]">
          <Sparkles className="h-4 w-4" />
          Garage premium • Performance • Suivi digital
        </div>

        <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
          L’entretien automobile entre dans une nouvelle dimension.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          AMARKHYS associe diagnostic, vidange, entretien, suivi atelier et expérience digitale pour donner à votre véhicule un service précis, rapide et haut de gamme.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/rdv"
            className="inline-flex items-center gap-3 rounded-2xl bg-[#00A19C] px-6 py-4 text-sm font-black text-[#021111] shadow-[0_0_45px_rgba(0,161,156,0.35)] transition hover:bg-[#7FFFE8]"
          >
            Prendre rendez-vous
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href="#services"
            className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-black text-white backdrop-blur transition hover:border-[#00A19C]/60 hover:bg-[#00A19C]/10"
          >
            Découvrir les services
          </a>
        </div>

        <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
            >
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute -inset-8 rounded-[3rem] bg-[#00A19C]/20 blur-3xl" />

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl">
          <div className="relative h-[460px] overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#0f172a,#020617)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,161,156,0.42),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(125,255,232,0.18),transparent_32%)]" />

            <div className="absolute inset-x-8 top-10 rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#7FFFE8]">
                  AMARKHYS Care
                </p>
                <BadgeCheck className="h-5 w-5 text-[#7FFFE8]" />
              </div>

              <p className="mt-4 text-3xl font-black text-white">
                Diagnostic atelier
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Chaque intervention suit un parcours clair : rendez-vous, diagnostic, devis, exécution et livraison.
              </p>
            </div>

            <div className="absolute bottom-8 left-8 right-8 grid gap-3">
              {[
                { icon: Gauge, label: "Performance moteur" },
                { icon: Wrench, label: "Intervention suivie" },
                { icon: ShieldCheck, label: "Sécurité & transparence" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00A19C]/20">
                      <Icon className="h-5 w-5 text-[#7FFFE8]" />
                    </div>

                    <p className="font-bold text-white">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
`
);

write(
  "src/components/public/PublicServices.tsx",
`"use client";

import { motion } from "framer-motion";
import { BatteryCharging, CarFront, Fan, Gauge, ShieldCheck, Wrench } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Vidange & lubrification",
    description: "Entretien moteur avec produits premium et suivi clair de l’intervention.",
  },
  {
    icon: Gauge,
    title: "Diagnostic électronique",
    description: "Lecture, analyse et orientation technique pour identifier la bonne action.",
  },
  {
    icon: ShieldCheck,
    title: "Freinage & sécurité",
    description: "Contrôle des organes sensibles pour rouler avec confiance.",
  },
  {
    icon: Fan,
    title: "Climatisation",
    description: "Contrôle, entretien et remise en performance du confort intérieur.",
  },
  {
    icon: CarFront,
    title: "Révision complète",
    description: "Une prise en charge globale pour garder le véhicule fiable et performant.",
  },
  {
    icon: BatteryCharging,
    title: "Flottes & entreprises",
    description: "Suivi digital des véhicules professionnels, rappels et interventions.",
  },
];

export function PublicServices() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#7FFFE8]">
          Services
        </p>

        <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
          Des prestations garage avec une exigence premium.
        </h2>

        <p className="mt-5 text-base leading-8 text-slate-400">
          Chaque service est pensé pour être clair, traçable et orienté performance véhicule.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#00A19C]/40 hover:bg-[#00A19C]/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00A19C]/15 text-[#7FFFE8]">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-xl font-black text-white">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {service.description}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
`
);

write(
  "src/components/public/PublicWhy.tsx",
`"use client";

import { motion } from "framer-motion";
import { BellRing, ClipboardCheck, ScanLine, Smartphone } from "lucide-react";

const reasons = [
  {
    icon: ScanLine,
    title: "Diagnostic clair",
    description: "Vous comprenez les priorités avant d’engager une intervention.",
  },
  {
    icon: ClipboardCheck,
    title: "Devis transparent",
    description: "Les travaux sont structurés, suivis et validés étape par étape.",
  },
  {
    icon: Smartphone,
    title: "Suivi digital",
    description: "Le rendez-vous, l’intervention et la facturation restent traçables.",
  },
  {
    icon: BellRing,
    title: "Rappels intelligents",
    description: "Vidanges, entretiens et échéances ne sont plus oubliés.",
  },
];

export function PublicWhy() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-6 py-24">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#7FFFE8]">
              Pourquoi AMARKHYS
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">
              Un garage pensé comme une plateforme de suivi.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-400">
              AMARKHYS connecte la relation client, le rendez-vous, l’intervention et la facturation dans un parcours digital cohérent.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-3xl border border-white/10 bg-black/20 p-5"
                >
                  <Icon className="h-6 w-6 text-[#7FFFE8]" />

                  <h3 className="mt-4 font-black text-white">
                    {reason.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {reason.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
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
              href="https://wa.me/"
              target="_blank"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-black text-white transition hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4 text-[#7FFFE8]" />
              WhatsApp
            </a>

            <a
              href="tel:+000000000"
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

write(
  "src/components/public/PublicContact.tsx",
`"use client";

import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

const contacts = [
  { icon: Phone, title: "Téléphone", value: "+000000000" },
  { icon: MessageCircle, title: "WhatsApp", value: "Disponible" },
  { icon: MapPin, title: "Adresse", value: "Adresse garage" },
  { icon: Clock, title: "Horaires", value: "Lundi - Samedi" },
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
            <div
              key={contact.title}
              className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
            >
              <Icon className="h-6 w-6 text-[#7FFFE8]" />

              <h3 className="mt-5 font-black text-white">
                {contact.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {contact.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
`
);

write(
  "src/components/public/PublicFooter.tsx",
`"use client";

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-slate-400">
          © {new Date().getFullYear()} AMARKHYS. Garage premium digitalisé.
        </p>

        <p>
          Diagnostic • Entretien • Performance • Suivi atelier
        </p>
      </div>
    </footer>
  );
}
`
);

write(
  "src/app/page.tsx",
`import {
  PublicHero,
  PublicLayout,
  PublicServices,
  PublicWhy,
  PublicCTA,
  PublicContact,
} from "@/components/public";

export default function HomePage() {
  return (
    <PublicLayout>
      <PublicHero />
      <PublicServices />
      <PublicWhy />
      <PublicCTA />
      <PublicContact />
    </PublicLayout>
  );
}
`
);

console.log("");
console.log("AMARKHYS premium public site installed.");
console.log("Done.");