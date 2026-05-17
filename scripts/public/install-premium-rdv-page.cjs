const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rdvPagePath = path.join(ROOT, "src/app/rdv/page.tsx");
const servicePath = path.join(
  ROOT,
  "src/components/public/PublicAppointmentService.ts"
);

if (fs.existsSync(servicePath)) {
  let service = fs.readFileSync(servicePath, "utf8");

  service = service
    .split("TÃ©lÃ©phone").join("Téléphone")
    .split("VÃ©hicule").join("Véhicule")
    .split("demandÃ©").join("demandé")
    .split("PrÃ©parer").join("Préparer")
    .split("aprÃ¨s").join("après");

  fs.writeFileSync(servicePath, service, "utf8");
  console.log("FIXED src/components/public/PublicAppointmentService.ts");
}

const rdvPage = `"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Car,
  CheckCircle2,
  Gauge,
  Loader2,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

import { PublicLayout } from "@/components/public";
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

const benefits = [
  {
    icon: Gauge,
    title: "Diagnostic clair",
    description: "Votre demande arrive directement dans le workflow atelier.",
  },
  {
    icon: ShieldCheck,
    title: "Suivi sécurisé",
    description: "Client, véhicule, rendez-vous et rappels sont créés automatiquement.",
  },
  {
    icon: BadgeCheck,
    title: "Service premium",
    description: "Une prise en charge AMARKHYS cohérente dès le premier contact.",
  },
];

export default function RDVPage() {
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
    if (!form.nom.trim()) return "Indiquez votre nom.";
    if (!form.telephone.trim()) return "Indiquez votre numéro de téléphone.";
    if (!form.vehicule.trim()) return "Indiquez la marque ou le modèle du véhicule.";
    if (!form.immatriculation.trim()) return "Indiquez l’immatriculation du véhicule.";

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
      setError("Impossible d’envoyer la demande pour le moment. Veuillez réessayer.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <PublicLayout>
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-[#00A19C]/50 hover:text-[#7FFFE8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour accueil
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#00A19C]/30 bg-[#00A19C]/10 px-4 py-2 text-sm font-bold text-[#7FFFE8]">
            <Car className="h-4 w-4" />
            Rendez-vous atelier
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-black tracking-tight text-white md:text-6xl">
            Réservez votre passage chez AMARKHYS.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Envoyez votre demande en quelques secondes. AMARKHYS crée automatiquement votre dossier client, votre véhicule et votre rendez-vous dans le suivi atelier.
          </p>

          <div className="mt-10 grid gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#00A19C]/15 text-[#7FFFE8]">
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
          <div className="absolute -inset-6 rounded-[3rem] bg-[#00A19C]/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.065] p-6 shadow-2xl backdrop-blur-2xl md:p-8">
            <div className="mb-8">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#7FFFE8]">
                Demande rapide
              </p>

              <h2 className="mt-3 text-3xl font-black text-white">
                Vos informations véhicule
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Un conseiller AMARKHYS vous recontactera pour confirmer le créneau.
              </p>
            </div>

            {success ? (
              <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6">
                <CheckCircle2 className="h-10 w-10 text-emerald-300" />

                <h3 className="mt-5 text-2xl font-black text-white">
                  Demande envoyée.
                </h3>

                <p className="mt-3 text-sm leading-7 text-emerald-50/80">
                  Votre demande de rendez-vous a été transmise à AMARKHYS. Le dossier client et véhicule est maintenant prêt pour le suivi atelier.
                </p>

                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-6 rounded-2xl bg-[#00A19C] px-5 py-3 text-sm font-black text-[#021111] transition hover:bg-[#7FFFE8]"
                >
                  Faire une autre demande
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                <label className="space-y-2">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-200">
                    <User className="h-4 w-4 text-[#7FFFE8]" />
                    Nom complet
                  </span>

                  <input
                    value={form.nom}
                    onChange={(event) => updateField("nom", event.target.value)}
                    placeholder="Votre nom"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-[#00A19C]/70"
                  />
                </label>

                <label className="space-y-2">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-200">
                    <Phone className="h-4 w-4 text-[#7FFFE8]" />
                    Téléphone
                  </span>

                  <input
                    value={form.telephone}
                    onChange={(event) => updateField("telephone", event.target.value)}
                    placeholder="+225 ..."
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-[#00A19C]/70"
                  />
                </label>

                <label className="space-y-2">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-200">
                    <Car className="h-4 w-4 text-[#7FFFE8]" />
                    Marque / modèle véhicule
                  </span>

                  <input
                    value={form.vehicule}
                    onChange={(event) => updateField("vehicule", event.target.value)}
                    placeholder="Toyota Corolla, Mercedes, Hyundai..."
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-[#00A19C]/70"
                  />
                </label>

                <label className="space-y-2">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-200">
                    <BadgeCheck className="h-4 w-4 text-[#7FFFE8]" />
                    Immatriculation
                  </span>

                  <input
                    value={form.immatriculation}
                    onChange={(event) => updateField("immatriculation", event.target.value)}
                    placeholder="AB-123-CD"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-[#00A19C]/70"
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
                  className="mt-2 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#00A19C] px-6 py-4 text-sm font-black text-[#021111] shadow-[0_0_45px_rgba(0,161,156,0.28)] transition hover:bg-[#7FFFE8] disabled:cursor-not-allowed disabled:opacity-60"
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
                  En envoyant ce formulaire, vous transmettez une demande de contact à AMARKHYS pour planifier votre rendez-vous.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </PublicLayout>
  );
}
`;

fs.writeFileSync(rdvPagePath, rdvPage, "utf8");

console.log("WRITTEN src/app/rdv/page.tsx");
console.log("Premium RDV page installed.");