const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
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
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

const componentPath =
  "src/components/public/AmarkhysPublicAppointmentLanding.tsx";

backup(componentPath, ".bak-q19h10d-rdv-dashboard-identity");

write(componentPath, `"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  Car,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Phone,
  ShieldCheck,
  User,
  Wrench,
  Zap,
} from "lucide-react";

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

function DashboardPill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.055] px-4 py-2 text-xs font-black text-white shadow-sm backdrop-blur-xl">
      {children}
    </span>
  );
}

function DashboardMetric({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.35rem] border border-[#17d9c3]/20 bg-gradient-to-br from-[#075f53] via-[#064c43] to-[#042a26] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.35)]">
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#2cf5df]/25 bg-[#063f39] text-[#37ffe4] shadow-[0_0_30px_rgba(45,245,223,0.12)]">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="text-base font-black text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-cyan-50/75">
        {description}
      </p>
    </div>
  );
}

function InputShell({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center rounded-2xl border border-white/10 bg-black/25 px-4 shadow-inner shadow-black/20 transition focus-within:border-[#37ffe4]/50 focus-within:shadow-[0_0_0_4px_rgba(55,255,228,0.08)]">
      <Icon className="h-4 w-4 shrink-0 text-[#37ffe4]/70" />
      {children}
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
    <section className="relative min-h-screen overflow-hidden bg-[#020807] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(18,245,210,0.12),transparent_30%),radial-gradient(circle_at_80%_5%,rgba(20,184,166,0.12),transparent_25%),linear-gradient(135deg,#020807_0%,#03130f_50%,#020807_100%)]" />
      <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-9 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-end gap-3">
              <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
                AMARKHYS
              </h1>

              <span className="pb-1 text-xl font-black text-slate-300">
                Garage
              </span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="h-16 w-2 rounded-full bg-[#25e6d2] shadow-[0_0_35px_rgba(37,230,210,0.5)]" />

              <div>
                <h2 className="text-3xl font-black text-white sm:text-4xl">
                  Prendre rendez-vous atelier
                </h2>

                <p className="mt-2 text-base font-medium text-slate-300">
                  Réservez votre passage chez AMARKHYS avec une expérience premium.
                </p>
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3">
            <DashboardPill>
              <Wrench className="h-4 w-4 text-[#25e6d2]" />
              Services
            </DashboardPill>

            <DashboardPill>
              <Car className="h-4 w-4 text-[#25e6d2]" />
              Atelier
            </DashboardPill>

            <DashboardPill>
              <Phone className="h-4 w-4 text-[#25e6d2]" />
              Contact
            </DashboardPill>
          </nav>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="overflow-hidden rounded-[2rem] border border-[#1dd8c2]/25 bg-[#05110f] shadow-[0_35px_90px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/amarkhys/rdv-hero-premium.png"
                  alt="Atelier premium AMARKHYS"
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020807] via-[#020807]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020807]/35 via-transparent to-[#020807]/15" />

                <div className="absolute left-5 right-5 top-5 flex flex-wrap gap-3">
                  <DashboardPill>
                    <CalendarClock className="h-4 w-4 text-[#25e6d2]" />
                    Agenda atelier
                  </DashboardPill>

                  <DashboardPill>
                    <ShieldCheck className="h-4 w-4 text-[#25e6d2]" />
                    Service premium
                  </DashboardPill>
                </div>

                <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/55 p-5 shadow-2xl backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#37ffe4]">
                        Agenda atelier
                      </p>

                      <p className="mt-1 text-lg font-black text-white">
                        Créneaux disponibles cette semaine
                      </p>
                    </div>

                    <span className="rounded-full border border-[#37ffe4]/25 bg-[#063f39] px-3 py-1 text-xs font-black text-[#37ffe4]">
                      Aujourd’hui
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
                      (day, index) => (
                        <div
                          key={day}
                          className={\`
                            rounded-2xl border p-3 text-center
                            \${
                              index === 2
                                ? "border-[#37ffe4]/50 bg-[#0b7569]/60"
                                : "border-white/10 bg-white/[0.04]"
                            }
                          \`}
                        >
                          <p className="text-xs font-black text-slate-300">
                            {day}
                          </p>

                          <p className="mt-1 text-lg font-black text-white">
                            {26 + index}
                          </p>

                          <div className="mt-3 flex justify-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-[#37ffe4]" />
                            <span className="h-2 w-2 rounded-full bg-[#37ffe4]/70" />
                            <span className="h-2 w-2 rounded-full bg-slate-500" />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <DashboardMetric
                icon={Zap}
                title="Réponse rapide"
                description="Votre demande est transmise au garage pour confirmation."
              />

              <DashboardMetric
                icon={CalendarClock}
                title="Créneau confirmé"
                description="AMARKHYS vous rappelle pour valider le passage atelier."
              />

              <DashboardMetric
                icon={ShieldCheck}
                title="Suivi atelier"
                description="Votre dossier client et véhicule est préparé proprement."
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="rounded-[2rem] border border-[#1dd8c2]/25 bg-gradient-to-br from-[#074e45] via-[#063b35] to-[#041715] p-5 shadow-[0_35px_90px_rgba(0,0,0,0.45)] sm:p-7">
              <div className="mb-7">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#37ffe4]/30 bg-[#052e2a] text-[#37ffe4] shadow-[0_0_45px_rgba(55,255,228,0.12)]">
                  <CalendarClock className="h-7 w-7" />
                </div>

                <h3 className="text-3xl font-black text-white">
                  Demande de rendez-vous
                </h3>

                <p className="mt-2 text-sm leading-6 text-cyan-50/75">
                  Remplissez le formulaire et nous vous recontacterons rapidement.
                </p>
              </div>

              {success ? (
                <div className="rounded-3xl border border-[#37ffe4]/25 bg-black/25 p-6">
                  <CheckCircle2 className="h-10 w-10 text-[#37ffe4]" />

                  <h4 className="mt-4 text-2xl font-black text-white">
                    Demande envoyée
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-cyan-50/75">
                    Votre demande a bien été transmise à AMARKHYS Garage.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="mt-6 rounded-2xl bg-[#18d5c0] px-5 py-3 text-sm font-black text-[#021111] transition hover:bg-[#37ffe4]"
                  >
                    Faire une autre demande
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-black text-white">
                        Nom complet *
                      </span>
                      <InputShell icon={User}>
                        <input
                          value={form.nom}
                          onChange={(event) =>
                            updateField("nom", event.target.value)
                          }
                          placeholder="Votre nom complet"
                          className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
                        />
                      </InputShell>
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-black text-white">
                        Téléphone *
                      </span>
                      <InputShell icon={Phone}>
                        <input
                          value={form.telephone}
                          onChange={(event) =>
                            updateField("telephone", event.target.value)
                          }
                          placeholder="+225 07 ..."
                          className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
                        />
                      </InputShell>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-black text-white">
                        Véhicule *
                      </span>
                      <InputShell icon={Car}>
                        <input
                          value={form.vehicule}
                          onChange={(event) =>
                            updateField("vehicule", event.target.value)
                          }
                          placeholder="Marque, modèle"
                          className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
                        />
                      </InputShell>
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-black text-white">
                        Immatriculation *
                      </span>
                      <InputShell icon={ShieldCheck}>
                        <input
                          value={form.immatriculation}
                          onChange={(event) =>
                            updateField("immatriculation", event.target.value)
                          }
                          placeholder="AA-123-CD"
                          className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
                        />
                      </InputShell>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-black text-white">
                        Service souhaité
                      </span>
                      <InputShell icon={Wrench}>
                        <input
                          value={form.service}
                          onChange={(event) =>
                            updateField("service", event.target.value)
                          }
                          placeholder="Diagnostic, entretien..."
                          className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
                        />
                      </InputShell>
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-black text-white">
                        Date souhaitée
                      </span>
                      <InputShell icon={CalendarClock}>
                        <input
                          value={form.dateSouhaitee}
                          onChange={(event) =>
                            updateField("dateSouhaitee", event.target.value)
                          }
                          placeholder="JJ/MM/AAAA"
                          className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
                        />
                      </InputShell>
                    </label>
                  </div>

                  <label className="space-y-2">
                    <span className="text-sm font-black text-white">
                      Heure souhaitée
                    </span>
                    <InputShell icon={Clock3}>
                      <input
                        value={form.heureSouhaitee}
                        onChange={(event) =>
                          updateField("heureSouhaitee", event.target.value)
                        }
                        placeholder="10:00"
                        className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
                      />
                    </InputShell>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-black text-white">
                      Message (optionnel)
                    </span>

                    <textarea
                      value={form.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      placeholder="Précisez votre demande, un symptôme, une remarque..."
                      rows={4}
                      className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-400 transition focus:border-[#37ffe4]/50 focus:shadow-[0_0_0_4px_rgba(55,255,228,0.08)]"
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
                    className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#18d5c0] px-6 py-4 text-sm font-black text-[#021111] shadow-[0_0_55px_rgba(24,213,192,0.24)] transition hover:bg-[#37ffe4] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Envoi en cours..." : "Demander un rendez-vous"}
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#37ffe4]/20 bg-black/20 px-5 py-4 text-sm font-black text-white transition hover:bg-black/30"
                    >
                      <MessageCircle className="h-5 w-5 text-[#37ffe4]" />
                      WhatsApp
                    </a>

                    <a
                      href="tel:+2250700000000"
                      className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#37ffe4]/20 bg-black/20 px-5 py-4 text-sm font-black text-white transition hover:bg-black/30"
                    >
                      <Phone className="h-5 w-5 text-[#37ffe4]" />
                      Appeler
                    </a>
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
`);

console.log("");
console.log("[Q19H10D_DONE] RDV page aligned with AMARKHYS dashboard identity.");
console.log("");
console.log("Next:");
console.log("  pnpm build");