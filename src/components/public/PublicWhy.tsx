"use client";

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
