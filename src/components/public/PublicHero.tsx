"use client";

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
