"use client";

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
