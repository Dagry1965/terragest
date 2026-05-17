"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from "lucide-react";

const guarantees = [
  {
    icon: FileCheck2,
    title: "Devis lisible",
    description:
      "Chaque intervention est expliquée avant validation pour éviter les mauvaises surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Contrôle sécurité",
    description:
      "Les points sensibles du véhicule sont traités avec méthode et priorité.",
  },
  {
    icon: TimerReset,
    title: "Suivi après service",
    description:
      "Les rappels d’entretien permettent d’anticiper les prochaines échéances.",
  },
];

const proofItems = [
  "Diagnostic structuré",
  "Rendez-vous tracé",
  "Suivi client digital",
  "Historique véhicule",
];

export function PublicTrust() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-xl md:p-12">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#00A19C]/20 blur-[100px]" />

        <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00A19C]/30 bg-[#00A19C]/10 px-4 py-2 text-sm font-bold text-[#7FFFE8]">
              <Sparkles className="h-4 w-4" />
              Confiance atelier
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-white md:text-5xl">
              Une expérience garage plus transparente et plus rassurante.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-400">
              Le premium ne vient pas seulement du design : il vient surtout de la clarté, du suivi, de la qualité d’exécution et de la relation client.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {proofItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                >
                  <BadgeCheck className="h-5 w-5 text-[#7FFFE8]" />
                  <span className="text-sm font-bold text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon;

              return (
                <motion.article
                  key={guarantee.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-3xl border border-white/10 bg-black/25 p-6 transition hover:border-[#00A19C]/40 hover:bg-[#00A19C]/10"
                >
                  <Icon className="h-7 w-7 text-[#7FFFE8]" />

                  <h3 className="mt-5 text-xl font-black text-white">
                    {guarantee.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {guarantee.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
