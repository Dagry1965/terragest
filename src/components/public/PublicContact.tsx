"use client";

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
