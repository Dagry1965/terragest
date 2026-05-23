const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function ensureDir(rel) {
  fs.mkdirSync(p(rel), { recursive: true });
}

function backup(rel, suffix) {
  const source = p(rel);
  const target = source + suffix;

  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", rel + suffix);
  }
}

function write(rel, content) {
  ensureDir(path.dirname(rel));
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

const componentPath =
  "src/components/public/AmarkhysPublicAppointmentLanding.tsx";

const pagePath = "src/app/rdv/page.tsx";

backup(componentPath, ".bak-q19h10c-integrate-premium-rdv-image");
backup(pagePath, ".bak-q19h10c-integrate-premium-rdv-image");

write(
  componentPath,
  `"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  Car,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";

// Adapte cet import si ton service actuel est ailleurs.
import { createPublicAppointment } from "@/components/public/PublicAppointmentService";

type AppointmentForm = {
  nom: string;
  telephone: string;
  vehicule: string;
  immatriculation: string;
  service: string;
  dateSouhaitee: string;
  heureSouhaitee: string;
  message: string;
};

const initialForm: AppointmentForm = {
  nom: "",
  telephone: "",
  vehicule: "",
  immatriculation: "",
  service: "",
  dateSouhaitee: "",
  heureSouhaitee: "",
  message: "",
};

const whatsappHref =
  "https://wa.me/2250700000000?text=Bonjour%20AMARKHYS%2C%20je%20souhaite%20prendre%20rendez-vous%20pour%20mon%20v%C3%A9hicule.";

function BenefitCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20">
        <CheckCircle2 className="h-5 w-5" />
      </div>

      <h3 className="text-base font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
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

    if (error) {
      setError("");
    }
  }

  function validateForm() {
    if (!form.nom.trim()) return "Indiquez votre nom.";
    if (!form.telephone.trim()) return "Indiquez votre numéro de téléphone.";
    if (!form.vehicule.trim()) return "Indiquez votre véhicule.";
    if (!form.immatriculation.trim()) return "Indiquez l’immatriculation.";
    return "";
  }

  async function handleSubmit() {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError("");

    try {
      await createPublicAppointment({
        nom: form.nom,
        telephone: form.telephone,
        vehicule: form.vehicule,
        immatriculation: form.immatriculation,
      });

      setSuccess(true);
      setForm(initialForm);
    } catch (submitError) {
      console.error("PUBLIC_APPOINTMENT_ERROR", submitError);
      setError(
        "Impossible d’envoyer la demande pour le moment. Veuillez réessayer."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(6,182,212,0.16),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(16,185,129,0.16),transparent_28%),linear-gradient(135deg,#020617_0%,#07131e_40%,#041018_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              AMARKHYS Garage
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-slate-200 backdrop-blur-xl">
              <MapPin className="h-4 w-4 text-cyan-300" />
              Abidjan
            </span>
          </div>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Prenez rendez-vous pour votre véhicule avec une expérience premium.
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Nous gardons l’identité visuelle AMARKHYS et nous l’appliquons à une
            vraie page de prise de rendez-vous : atelier premium, image réaliste,
            agenda, formulaire élégant et contact rapide.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-cyan-950/30">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/amarkhys/rdv-hero-premium.png"
                  alt="Visuel premium AMARKHYS pour la prise de rendez-vous"
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/55 via-transparent to-[#020617]/10" />
              </div>

              <div className="absolute left-5 top-5 right-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/35 px-4 py-2 text-sm font-bold text-white backdrop-blur-xl">
                  <CalendarClock className="h-4 w-4 text-cyan-300" />
                  Agenda atelier
                </span>

                <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/35 px-4 py-2 text-sm font-bold text-white backdrop-blur-xl">
                  <ShieldCheck className="h-4 w-4 text-cyan-300" />
                  Service premium
                </span>
              </div>

              <div className="absolute left-5 right-5 bottom-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
                      Réponse rapide
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      Confirmation par téléphone ou WhatsApp.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
                      Suivi atelier
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      Une prise en charge structurée dès le premier contact.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
                      Atelier premium
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      L’image du site reflète la qualité AMARKHYS.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <BenefitCard
                title="Créneau confirmé"
                description="Le client envoie sa demande et reçoit une prise en charge rapide."
              />

              <BenefitCard
                title="Diagnostic et entretien"
                description="L’atelier peut orienter la demande selon le besoin du véhicule."
              />

              <BenefitCard
                title="Suivi digital"
                description="La page publique ouvre vers le workflow AMARKHYS interne."
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-white/[0.06] p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl sm:p-7">
              <div className="mb-6">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
                  Demande de rendez-vous
                </p>

                <h2 className="mt-3 text-3xl font-black text-white">
                  Réserver un créneau
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Remplissez le formulaire. AMARKHYS vous recontacte rapidement
                  pour confirmer le passage atelier.
                </p>
              </div>

              {success ? (
                <div className="rounded-3xl border border-emerald-400/25 bg-emerald-500/10 p-6">
                  <CheckCircle2 className="h-10 w-10 text-emerald-300" />

                  <h3 className="mt-4 text-2xl font-black text-white">
                    Demande envoyée
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-emerald-50/80">
                    Votre demande a bien été transmise à AMARKHYS Garage.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="mt-5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-300 px-5 py-3 text-sm font-black text-slate-950"
                  >
                    Faire une autre demande
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-black text-slate-100">
                        Nom complet *
                      </span>
                      <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-4">
                        <User className="h-4 w-4 text-slate-500" />
                        <input
                          value={form.nom}
                          onChange={(event) =>
                            updateField("nom", event.target.value)
                          }
                          placeholder="Votre nom complet"
                          className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                        />
                      </div>
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-black text-slate-100">
                        Téléphone *
                      </span>
                      <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-4">
                        <Phone className="h-4 w-4 text-slate-500" />
                        <input
                          value={form.telephone}
                          onChange={(event) =>
                            updateField("telephone", event.target.value)
                          }
                          placeholder="+225 07 ..."
                          className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                        />
                      </div>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-black text-slate-100">
                        Véhicule *
                      </span>
                      <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-4">
                        <Car className="h-4 w-4 text-slate-500" />
                        <input
                          value={form.vehicule}
                          onChange={(event) =>
                            updateField("vehicule", event.target.value)
                          }
                          placeholder="Marque, modèle, version"
                          className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                        />
                      </div>
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-black text-slate-100">
                        Immatriculation *
                      </span>
                      <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-4">
                        <ShieldCheck className="h-4 w-4 text-slate-500" />
                        <input
                          value={form.immatriculation}
                          onChange={(event) =>
                            updateField("immatriculation", event.target.value)
                          }
                          placeholder="AA-123-CD"
                          className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                        />
                      </div>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-black text-slate-100">
                        Service souhaité
                      </span>
                      <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-4">
                        <Wrench className="h-4 w-4 text-slate-500" />
                        <input
                          value={form.service}
                          onChange={(event) =>
                            updateField("service", event.target.value)
                          }
                          placeholder="Vidange, diagnostic..."
                          className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                        />
                      </div>
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-black text-slate-100">
                        Date souhaitée
                      </span>
                      <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-4">
                        <CalendarClock className="h-4 w-4 text-slate-500" />
                        <input
                          value={form.dateSouhaitee}
                          onChange={(event) =>
                            updateField("dateSouhaitee", event.target.value)
                          }
                          placeholder="JJ/MM/AAAA"
                          className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                        />
                      </div>
                    </label>
                  </div>

                  <label className="space-y-2">
                    <span className="text-sm font-black text-slate-100">
                      Heure souhaitée
                    </span>
                    <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-4">
                      <Clock3 className="h-4 w-4 text-slate-500" />
                      <input
                        value={form.heureSouhaitee}
                        onChange={(event) =>
                          updateField("heureSouhaitee", event.target.value)
                        }
                        placeholder="10:00"
                        className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                      />
                    </div>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-black text-slate-100">
                      Message (optionnel)
                    </span>
                    <textarea
                      value={form.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      placeholder="Précisez votre demande, un symptôme, une remarque..."
                      rows={4}
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                    />
                  </label>

                  {error ? (
                    <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100">
                      {error}
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-300 px-6 py-4 text-sm font-black text-slate-950 shadow-[0_0_45px_rgba(45,212,191,0.25)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Envoi en cours..." : "Demander un rendez-vous"}
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/[0.08]"
                    >
                      <MessageCircle className="h-5 w-5 text-cyan-300" />
                      WhatsApp
                    </a>

                    <a
                      href="tel:+2250700000000"
                      className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/[0.08]"
                    >
                      <Phone className="h-5 w-5 text-cyan-300" />
                      Appeler
                    </a>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-xl">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
                        Réponse rapide
                      </p>
                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        Sous 1h ouvrée
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-xl">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
                        Confirmation
                      </p>
                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        Téléphone ou WhatsApp
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-xl">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
                        Suivi atelier
                      </p>
                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        Parcours digitalisé
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
`
);

write(
  pagePath,
  `"use client";

import { PublicLayout } from "@/components/public";
import { AmarkhysPublicAppointmentLanding } from "@/components/public/AmarkhysPublicAppointmentLanding";

export default function RDVPage() {
  return (
    <PublicLayout>
      <AmarkhysPublicAppointmentLanding />
    </PublicLayout>
  );
}
`
);

console.log("");
console.log("[Q19H10C_DONE] Premium RDV page integrated with hero image.");
console.log("");
console.log("Important:");
console.log("  Place the chosen image here:");
console.log("  public/images/amarkhys/rdv-hero-premium.png");
console.log("");
console.log("Next:");
console.log("  node .\\\\scripts\\\\runtime\\\\pass-q19h10c-integrate-premium-rdv-image.cjs");
console.log("  pnpm build");