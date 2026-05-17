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
  "src/components/public/PublicServices.tsx",
`"use client";

import { motion } from "framer-motion";
import {
  BatteryCharging,
  CarFront,
  Fan,
  Gauge,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Vidange & lubrification",
    description:
      "Entretien moteur avec produits premium et suivi clair de l’intervention.",
  },
  {
    icon: Gauge,
    title: "Diagnostic électronique",
    description:
      "Lecture, analyse et orientation technique pour identifier la bonne action.",
  },
  {
    icon: ShieldCheck,
    title: "Freinage & sécurité",
    description:
      "Contrôle des organes sensibles pour rouler avec confiance.",
  },
  {
    icon: Fan,
    title: "Climatisation",
    description:
      "Contrôle, entretien et remise en performance du confort intérieur.",
  },
  {
    icon: CarFront,
    title: "Révision complète",
    description:
      "Une prise en charge globale pour garder le véhicule fiable et performant.",
  },
  {
    icon: BatteryCharging,
    title: "Flottes & entreprises",
    description:
      "Suivi digital des véhicules professionnels, rappels et interventions.",
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
import {
  BellRing,
  ClipboardCheck,
  ScanLine,
  Smartphone,
} from "lucide-react";

const reasons = [
  {
    icon: ScanLine,
    title: "Diagnostic clair",
    description:
      "Vous comprenez les priorités avant d’engager une intervention.",
  },
  {
    icon: ClipboardCheck,
    title: "Devis transparent",
    description:
      "Les travaux sont structurés, suivis et validés étape par étape.",
  },
  {
    icon: Smartphone,
    title: "Suivi digital",
    description:
      "Le rendez-vous, l’intervention et la facturation restent traçables.",
  },
  {
    icon: BellRing,
    title: "Rappels intelligents",
    description:
      "Vidanges, entretiens et échéances ne sont plus oubliés.",
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
  "src/components/public/PublicTrust.tsx",
`"use client";

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
`
);

const indexPath = path.join(ROOT, "src/components/public/index.ts");
let index = fs.readFileSync(indexPath, "utf8");

if (!index.includes('export * from "./PublicTrust";')) {
  index += '\nexport * from "./PublicTrust";\n';
  fs.writeFileSync(indexPath, index, "utf8");
  console.log("UPDATED src/components/public/index.ts");
}

const pagePath = path.join(ROOT, "src/app/page.tsx");
let page = fs.readFileSync(pagePath, "utf8");

page = page.replace(
  `  PublicCTA,`,
  `  PublicCTA,
  PublicTrust,`
);

page = page.replace(
  `      <PublicWhy />
      <PublicCTA />`,
  `      <PublicWhy />
      <PublicTrust />
      <PublicCTA />`
);

fs.writeFileSync(pagePath, page, "utf8");
console.log("UPDATED src/app/page.tsx");

console.log("");
console.log("Public trust section installed.");