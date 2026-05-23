"use client";

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
