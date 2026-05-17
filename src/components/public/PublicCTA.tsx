"use client";

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
