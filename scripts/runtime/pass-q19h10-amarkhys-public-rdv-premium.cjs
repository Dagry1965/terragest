const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function ensureDir(rel) {
  fs.mkdirSync(p(rel), { recursive: true });
}

function write(rel, content) {
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

function backup(rel, suffix) {
  const source = p(rel);
  const target = source + suffix;

  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", rel + suffix);
  }
}

ensureDir("src/components/public");

const componentPath =
  "src/components/public/AmarkhysPublicAppointmentLanding.tsx";

backup(componentPath, ".bak-q19h10-public-rdv-premium");

write(componentPath, `"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Car,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";

import { createPublicAppointment } from "@/components/public/PublicAppointmentService";

type AppointmentForm = {
  nom: string;
  telephone: string;
  vehicule: string;
  immatriculation: string;
};

const initialForm: AppointmentForm = {
  nom: "",
  telephone: "",
  vehicule: "",
  immatriculation: "",
};

const whatsappHref =
  "https://wa.me/2250700000000?text=Bonjour%20AMARKHYS%2C%20je%20souhaite%20prendre%20rendez-vous%20pour%20mon%20v%C3%A9hicule.";

const benefits = [
  {
    icon: Gauge,
    title: "Diagnostic clair",
    description:
      "Votre demande arrive directement dans le workflow atelier AMARKHYS.",
  },
  {
    icon: ClipboardCheck,
    title: "Suivi atelier",
    description:
      "Client, véhicule, rendez-vous et dossier atelier sont structurés dès le premier contact.",
  },
  {
    icon: ShieldCheck,
    title: "Facture et reçu numériques",
    description:
      "Le parcours peut aller jusqu’à la facture, l’encaissement et le reçu client.",
  },
];

const steps = [
  "Vous envoyez la demande",
  "AMARKHYS confirme le créneau",
  "Le véhicule est pris en charge",
];

function PremiumBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100 shadow-sm backdrop-blur-xl">
      {children}
    </span>
  );
}

function FieldLabel({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-2 text-sm font-black text-slate-100">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-cyan-200 ring-1 ring-white/10">
        <Icon className="h-4 w-4" />
      </span>
      {children}
    </span>
  );
}

export function AmarkhysPublicAppointmentLanding() {
  const [form, setForm] = useState<AppointmentForm>(initialForm);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function updateField(key: keyof AppointmentForm, value: string) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setError("");
  }

  function validateForm() {
    if (!form.nom.trim()) {
      return "Indiquez votre nom.";
    }

    if (!form.telephone.trim()) {
      return "Indiquez votre numéro de téléphone.";
    }

    if (!form.vehicule.trim()) {
      return "Indiquez la marque ou le modèle du véhicule.";
    }

    if (!form.immatriculation.trim()) {
      return "Indiquez l’immatriculation du véhicule.";
    }

    return "";
  }

  async function submit() {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError("");

    try {
      await createPublicAppointment(form);
      setSuccess(true);
      setForm(initialForm);
    } catch (submitError) {
      console.error("PUBLIC APPOINTMENT ERROR", submitError);
      setError(
        "Impossible d’envoyer la demande pour le moment. Veuillez réessayer."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(0,161,156,0.34),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.18),transparent_30%),linear-gradient(135deg,#020617_0%,#08111f_45%,#020617_100%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="flex flex-wrap gap-3">
            <PremiumBadge>
              <Sparkles className="h-4 w-4" />
              AMARKHYS Garage
            </PremiumBadge>

            <PremiumBadge>
              <MapPin className="h-4 w-4" />
              Abidjan
            </PremiumBadge>
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Prenez rendez-vous pour votre véhicule en quelques minutes.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Diagnostic, entretien, réparation ou contrôle : envoyez votre demande
            et AMARKHYS prépare votre dossier atelier avec un suivi clair.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-300 px-6 py-4 text-sm font-black text-slate-950 shadow-[0_22px_55px_rgba(45,212,191,0.24)] transition hover:scale-[1.01]"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp direct
            </a>

            <a
              href="tel:+2250700000000"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/15"
            >
              <Phone className="h-5 w-5" />
              Appeler le garage
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl"
              >
                <p className="text-sm font-black text-cyan-200">
                  0{index + 1}
                </p>

                <p className="mt-3 text-sm font-bold leading-6 text-white">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-sm backdrop-blur-xl"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h2 className="font-black text-white">
                      {benefit.title}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[3rem] bg-cyan-400/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.075] p-5 shadow-2xl backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-8">
            <div className="absolute right-6 top-6 hidden rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-black text-emerald-100 sm:block">
              Réponse rapide
            </div>

            <div className="mb-8">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">
                Demande de rendez-vous
              </p>

              <h2 className="mt-3 text-3xl font-black text-white">
                Votre passage atelier
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Remplissez ces informations. AMARKHYS vous recontacte pour
                confirmer le créneau.
              </p>
            </div>

            {success ? (
              <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6">
                <CheckCircle2 className="h-10 w-10 text-emerald-300" />

                <h3 className="mt-5 text-2xl font-black text-white">
                  Demande envoyée.
                </h3>

                <p className="mt-3 text-sm leading-7 text-emerald-50/80">
                  Votre demande de rendez-vous a été transmise à AMARKHYS. Le
                  garage pourra confirmer votre passage et préparer le suivi
                  atelier.
                </p>

                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.01]"
                >
                  Faire une autre demande
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                <label className="space-y-2">
                  <FieldLabel icon={User}>Nom complet</FieldLabel>

                  <input
                    value={form.nom}
                    onChange={(event) =>
                      updateField("nom", event.target.value)
                    }
                    placeholder="Votre nom"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
                  />
                </label>

                <label className="space-y-2">
                  <FieldLabel icon={Phone}>Téléphone</FieldLabel>

                  <input
                    value={form.telephone}
                    onChange={(event) =>
                      updateField("telephone", event.target.value)
                    }
                    placeholder="+225 ..."
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
                  />
                </label>

                <label className="space-y-2">
                  <FieldLabel icon={Car}>Marque / modèle véhicule</FieldLabel>

                  <input
                    value={form.vehicule}
                    onChange={(event) =>
                      updateField("vehicule", event.target.value)
                    }
                    placeholder="Toyota Corolla, Mercedes, Hyundai..."
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
                  />
                </label>

                <label className="space-y-2">
                  <FieldLabel icon={BadgeCheck}>Immatriculation</FieldLabel>

                  <input
                    value={form.immatriculation}
                    onChange={(event) =>
                      updateField("immatriculation", event.target.value)
                    }
                    placeholder="AB-123-CD"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
                  />
                </label>

                {error ? (
                  <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100">
                    {error}
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={submit}
                  disabled={saving}
                  className="mt-2 inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-300 px-6 py-4 text-sm font-black text-slate-950 shadow-[0_0_45px_rgba(45,212,191,0.28)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer la demande
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-6 text-slate-500">
                  En envoyant ce formulaire, vous transmettez une demande de
                  contact à AMARKHYS Garage pour planifier votre rendez-vous.
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-white backdrop-blur-xl">
              <CalendarClock className="mx-auto h-5 w-5 text-cyan-200" />
              <p className="mt-2 text-xs font-bold text-slate-300">
                Créneau confirmé
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-white backdrop-blur-xl">
              <Wrench className="mx-auto h-5 w-5 text-cyan-200" />
              <p className="mt-2 text-xs font-bold text-slate-300">
                Suivi atelier
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-white backdrop-blur-xl">
              <BadgeCheck className="mx-auto h-5 w-5 text-cyan-200" />
              <p className="mt-2 text-xs font-bold text-slate-300">
                Service premium
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
`);

const pagePath = "src/app/rdv/page.tsx";
backup(pagePath, ".bak-q19h10-public-rdv-premium");

write(pagePath, `"use client";

import { PublicLayout } from "@/components/public";
import { AmarkhysPublicAppointmentLanding } from "@/components/public/AmarkhysPublicAppointmentLanding";

export default function RDVPage() {
  return (
    <PublicLayout>
      <AmarkhysPublicAppointmentLanding />
    </PublicLayout>
  );
}
`);

console.log("");
console.log("[Q19H10_DONE] AMARKHYS public RDV premium landing installed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");