const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function ensureDir(rel) {
  fs.mkdirSync(p(rel), { recursive: true });
}

function backup(rel, suffix) {
  const source = p(rel);
  const target = source + suffix;

  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", rel + suffix);
  }
}

function write(rel, content) {
  ensureDir(path.dirname(rel));
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

const suffix = ".bak-q19h11a-public-home-theme";

[
  "src/app/page.tsx",
  "src/components/public/PublicLayout.tsx",
  "src/components/public/PublicNavbar.tsx",
  "src/components/public/PublicFooter.tsx",
  "src/components/public/PublicHero.tsx",
  "src/components/public/PublicServices.tsx",
  "src/components/public/PublicWhy.tsx",
  "src/components/public/PublicTrust.tsx",
  "src/components/public/PublicCTA.tsx",
  "src/components/public/PublicContact.tsx",
].forEach((file) => backup(file, suffix));

write("src/components/public/PublicLayout.tsx", String.raw`import type { ReactNode } from "react";

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
`);

write("src/components/public/PublicNavbar.tsx", String.raw`"use client";

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
`);

write("src/components/public/PublicHero.tsx", String.raw`"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  Car,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

function Pill({
  children,
  gold,
}: {
  children: React.ReactNode;
  gold?: boolean;
}) {
  return (
    <span
      className={
        gold
          ? "inline-flex items-center gap-2 rounded-xl border border-[#d7a83f]/45 bg-[#2b2208]/60 px-4 py-2 text-xs font-black text-[#f8d479] shadow-[0_0_24px_rgba(215,168,63,0.12)]"
          : "inline-flex items-center gap-2 rounded-xl border border-[#23ead4]/24 bg-white/[0.045] px-4 py-2 text-xs font-black text-white backdrop-blur-xl"
      }
    >
      {children}
    </span>
  );
}

export function PublicHero() {
  return (
    <section className="relative overflow-hidden bg-[#020807]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(35,234,212,0.10),transparent_30%),radial-gradient(circle_at_84%_8%,rgba(215,168,63,0.10),transparent_24%),radial-gradient(circle_at_70%_80%,rgba(7,95,83,0.34),transparent_34%),linear-gradient(135deg,#020807_0%,#03130f_50%,#020807_100%)]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:46px_46px]" />

      <div className="relative mx-auto grid max-w-[1460px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="lg:col-span-6"
        >
          <div className="flex flex-wrap gap-3">
            <Pill>
              <Sparkles className="h-4 w-4 text-[#23ead4]" />
              Garage premium
            </Pill>

            <Pill gold>
              <CalendarPlus className="h-4 w-4" />
              Prise de rendez-vous
            </Pill>
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            L’excellence automobile au service de votre véhicule.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            AMARKHYS Garage vous accompagne du diagnostic à l’entretien, avec un suivi atelier clair, une prise de rendez-vous simple et une expérience client premium.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/rdv"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#f5c04a] via-[#d7a83f] to-[#9a6a17] px-6 py-4 text-sm font-black uppercase tracking-wide text-[#0b0b05] shadow-[0_0_60px_rgba(215,168,63,0.22)] transition hover:scale-[1.01]"
            >
              Réserver un rendez-vous
              <ArrowRight className="h-5 w-5" />
            </Link>

            <a
              href="tel:+2250700000000"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#23ead4]/24 bg-black/18 px-6 py-4 text-sm font-black text-white transition hover:bg-black/28"
            >
              Appeler le garage
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Réponse rapide", "Confirmation par téléphone ou WhatsApp."],
              ["Suivi atelier", "Dossier client et véhicule structuré."],
              ["Service premium", "Diagnostic, facture et reçu numériques."],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-[1.25rem] border border-[#d7a83f]/20 bg-gradient-to-br from-[#1a1608]/78 via-[#061915]/84 to-[#041b18] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.34)]"
              >
                <CheckCircle2 className="h-6 w-6 text-[#f8d479]" />
                <p className="mt-4 text-sm font-black text-white">{title}</p>
                <p className="mt-2 text-xs leading-5 text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
          className="lg:col-span-6"
        >
          <div className="overflow-hidden rounded-[1.6rem] border border-[#d7a83f]/20 bg-[#05110f] shadow-[0_38px_110px_rgba(0,0,0,0.55)] ring-1 ring-[#23ead4]/12">
            <div className="relative aspect-[16/11]">
              <Image
                src="/images/amarkhys/rdv-hero-premium.png"
                alt="Atelier premium AMARKHYS"
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#020807] via-[#020807]/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020807]/22 via-transparent to-[#020807]/12" />

              <div className="absolute left-4 top-4 flex flex-wrap gap-3">
                <Pill>
                  <Car className="h-4 w-4 text-[#23ead4]" />
                  Atelier automobile
                </Pill>

                <Pill gold>
                  <ShieldCheck className="h-4 w-4" />
                  Premium
                </Pill>
              </div>

              <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
                {[
                  [Zap, "Rapide"],
                  [CalendarDays, "Planifié"],
                  [Wrench, "Suivi"],
                ].map(([Icon, label]) => {
                  const IconComponent = Icon as typeof Zap;

                  return (
                    <div
                      key={String(label)}
                      className="rounded-xl border border-white/10 bg-black/62 p-4 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                    >
                      <IconComponent className="mx-auto h-5 w-5 text-[#23ead4]" />
                      <p className="mt-2 text-sm font-black text-white">{String(label)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
`);

write("src/components/public/PublicServices.tsx", String.raw`import {
  Car,
  Gauge,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: Gauge,
    title: "Diagnostic",
    description:
      "Identification claire des besoins du véhicule avant intervention.",
  },
  {
    icon: Wrench,
    title: "Entretien",
    description:
      "Suivi atelier, prestations, main d’œuvre et contrôle des opérations.",
  },
  {
    icon: Car,
    title: "Réparation",
    description:
      "Prise en charge structurée du véhicule jusqu’à la restitution.",
  },
  {
    icon: ShieldCheck,
    title: "Suivi digital",
    description:
      "Facture, encaissement et reçu client dans un parcours cohérent.",
  },
];

export function PublicServices() {
  return (
    <section id="services" className="bg-[#020807] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1460px]">
        <div className="mb-9">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-[#23ead4]">
            Services atelier
          </p>

          <h2 className="mt-3 text-4xl font-black text-white">
            Un garage moderne, structuré et premium.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className={
                  index === 1
                    ? "rounded-[1.45rem] border border-[#d7a83f]/35 bg-gradient-to-br from-[#1c1809] via-[#083f38] to-[#03130f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
                    : "rounded-[1.45rem] border border-[#21d7c4]/22 bg-gradient-to-br from-[#075f53] via-[#06443d] to-[#041b18] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
                }
              >
                <div
                  className={
                    index === 1
                      ? "mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#d7a83f]/55 bg-[#2f260c] text-[#f8d479]"
                      : "mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#23ead4]/35 bg-[#063f39] text-[#23ead4]"
                  }
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-black text-white">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-cyan-50/75">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
`);

write("src/components/public/PublicWhy.tsx", String.raw`import {
  CalendarCheck,
  FileCheck2,
  Receipt,
} from "lucide-react";

const items = [
  {
    icon: CalendarCheck,
    title: "Rendez-vous rapide",
    description:
      "Le client envoie sa demande et le garage confirme le passage.",
  },
  {
    icon: FileCheck2,
    title: "Intervention suivie",
    description:
      "Le dossier client, le véhicule et l’intervention restent structurés.",
  },
  {
    icon: Receipt,
    title: "Facture et reçu",
    description:
      "La chaîne client peut aller jusqu’au paiement et au reçu numérique.",
  },
];

export function PublicWhy() {
  return (
    <section className="bg-[#020807] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1460px] gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-[#f8d479]">
            Pourquoi AMARKHYS
          </p>

          <h2 className="mt-3 text-4xl font-black text-white">
            Une expérience client cohérente du premier contact au règlement.
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-300">
            AMARKHYS ne se limite pas à un formulaire : le rendez-vous ouvre un workflow garage complet.
          </p>
        </div>

        <div className="grid gap-5 lg:col-span-7">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="flex gap-5 rounded-[1.45rem] border border-[#d7a83f]/24 bg-gradient-to-r from-[#1a1608]/78 via-[#061915]/84 to-[#041b18] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38)]"
              >
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d7a83f]/35 bg-[#2a2108]/55 text-[#f8d479]">
                  <Icon className="h-6 w-6" />
                </span>

                <div>
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
`);

write("src/components/public/PublicTrust.tsx", String.raw`import {
  Clock3,
  LockKeyhole,
  ShieldCheck,
  Star,
} from "lucide-react";

const trust = [
  {
    icon: ShieldCheck,
    title: "Données sécurisées",
    description: "Vos informations restent confidentielles.",
  },
  {
    icon: Clock3,
    title: "Réponse rapide",
    description: "Confirmation sous 1h ouvrée.",
  },
  {
    icon: Star,
    title: "Service premium",
    description: "Accueil, suivi, facture et reçu.",
  },
  {
    icon: LockKeyhole,
    title: "Confidentialité",
    description: "Votre demande est traitée avec soin.",
  },
];

export function PublicTrust() {
  return (
    <section className="bg-[#020807] px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1460px] rounded-[1.45rem] border border-[#d7a83f]/24 bg-gradient-to-r from-[#1a1608]/78 via-[#061915]/84 to-[#1a1608]/78 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trust.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d7a83f]/35 bg-[#2a2108]/55 text-[#f8d479]">
                  <Icon className="h-6 w-6" />
                </span>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-[#f8d479]">
                    {item.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
`);

write("src/components/public/PublicCTA.tsx", String.raw`import Link from "next/link";
import {
  ArrowRight,
  CalendarPlus,
  MessageCircle,
} from "lucide-react";

const whatsappHref =
  "https://wa.me/2250700000000?text=Bonjour%20AMARKHYS%2C%20je%20souhaite%20prendre%20rendez-vous%20pour%20mon%20v%C3%A9hicule.";

export function PublicCTA() {
  return (
    <section className="bg-[#020807] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1460px] overflow-hidden rounded-[1.6rem] border border-[#d7a83f]/26 bg-gradient-to-br from-[#075f53] via-[#053d36] to-[#031612] p-8 shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#23ead4]/12 lg:p-12">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#f8d479]">
              Prêt à réserver ?
            </p>

            <h2 className="mt-3 text-4xl font-black text-white">
              Demandez votre rendez-vous atelier maintenant.
            </h2>

            <p className="mt-4 text-base leading-7 text-cyan-50/75">
              Un conseiller AMARKHYS vous recontacte rapidement pour confirmer le créneau.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Link
              href="/rdv"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#f5c04a] via-[#d7a83f] to-[#9a6a17] px-6 py-4 text-sm font-black uppercase tracking-wide text-[#0b0b05] shadow-[0_0_60px_rgba(215,168,63,0.22)] transition hover:scale-[1.01]"
            >
              <CalendarPlus className="h-5 w-5" />
              Prendre RDV
              <ArrowRight className="h-5 w-5" />
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#23ead4]/24 bg-black/18 px-6 py-4 text-sm font-black text-white transition hover:bg-black/28"
            >
              <MessageCircle className="h-5 w-5 text-[#23ead4]" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

write("src/components/public/PublicContact.tsx", String.raw`import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const items = [
  {
    icon: Phone,
    title: "Téléphone",
    value: "+2250700000000",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+2250700000000",
  },
  {
    icon: Mail,
    title: "Email",
    value: "contact@amarkhys.com",
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "Abidjan, Côte d’Ivoire",
  },
];

export function PublicContact() {
  return (
    <section id="contact" className="bg-[#020807] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1460px]">
        <div className="mb-9">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-[#23ead4]">
            Contact
          </p>

          <h2 className="mt-3 text-4xl font-black text-white">
            AMARKHYS Garage, à votre écoute.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={
                  index === 1
                    ? "rounded-[1.35rem] border border-[#d7a83f]/35 bg-gradient-to-br from-[#1c1809] via-[#083f38] to-[#03130f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
                    : "rounded-[1.35rem] border border-[#21d7c4]/22 bg-gradient-to-br from-[#075f53] via-[#06443d] to-[#041b18] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
                }
              >
                <div
                  className={
                    index === 1
                      ? "mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d7a83f]/55 bg-[#2f260c] text-[#f8d479]"
                      : "mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#23ead4]/35 bg-[#063f39] text-[#23ead4]"
                  }
                >
                  <Icon className="h-6 w-6" />
                </div>

                <p className="text-sm font-black uppercase tracking-[0.12em] text-slate-300">
                  {item.title}
                </p>

                <p className="mt-2 text-base font-black text-white">
                  {item.value}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
`);

write("src/components/public/PublicFooter.tsx", String.raw`import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#020807] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1460px] flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-black text-white">
            AMARKHYS Garage
          </p>

          <p className="mt-1">
            L’excellence automobile au service de votre véhicule.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/" className="hover:text-white">
            Accueil
          </Link>

          <Link href="/rdv" className="hover:text-white">
            Rendez-vous
          </Link>

          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
`);

write("src/app/page.tsx", String.raw`import {
  PublicContact,
  PublicCTA,
  PublicHero,
  PublicLayout,
  PublicServices,
  PublicTrust,
  PublicWhy,
} from "@/components/public";

export default function HomePage() {
  return (
    <PublicLayout>
      <PublicHero />
      <PublicServices />
      <PublicWhy />
      <PublicTrust />
      <PublicCTA />
      <PublicContact />
    </PublicLayout>
  );
}
`);

console.log("");
console.log("[Q19H11A_DONE] Public home theme aligned with AMARKHYS RDV identity.");
console.log("");
console.log("Next:");
console.log("  pnpm build");