"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  Car,
  CheckCircle2,
  Clock3,
  Headphones,
  LockKeyhole,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Wrench,
  Zap,
} from "lucide-react";

import { createPublicAppointment } from "@/components/public/PublicAppointmentService";

import {
  getPublicSchedulingAvailabilityAction,
} from "@/runtime/scheduling/public";

type PublicRuntimeSlot = {
  date: string;
  startTime: string;
  endTime: string;
  label: string;
  available: boolean;
  remainingCapacity?: number;
  reason?: string;
};

type PublicRuntimeDay = {
  date: string;
  label: string;
  slots: PublicRuntimeSlot[];
};

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

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function TopPill({
  active,
  gold,
  children,
}: {
  active?: boolean;
  gold?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-black shadow-sm backdrop-blur-xl",
        active
          ? "border-[#23ead4]/30 bg-white/[0.075] text-white"
          : "border-white/10 bg-white/[0.045] text-slate-200",
        gold
          ? "border-[#d7a83f]/50 bg-[#2c2309]/45 text-[#f8d479] shadow-[0_0_24px_rgba(215,168,63,0.12)]"
          : ""
      )}
    >
      {children}
    </span>
  );
}

function MetricCard({
  icon: Icon,
  title,
  description,
  gold,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gold?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[1.45rem] border p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)] transition duration-300 hover:-translate-y-1",
        gold
          ? "border-[#d7a83f]/35 bg-gradient-to-br from-[#1c1809] via-[#083f38] to-[#03130f]"
          : "border-[#21d7c4]/22 bg-gradient-to-br from-[#075f53] via-[#06443d] to-[#041b18]"
      )}
    >
      <div className="absolute right-5 top-5 h-20 w-20 rounded-full bg-[#23ead4]/10 blur-2xl transition group-hover:bg-[#d7a83f]/15" />

      <div
        className={cn(
          "mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_0_34px_rgba(0,0,0,0.22)]",
          gold
            ? "border-[#d7a83f]/55 bg-[#2f260c] text-[#f8d479]"
            : "border-[#23ead4]/35 bg-[#063f39] text-[#23ead4]"
        )}
      >
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="text-xl font-black text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-cyan-50/75">
        {description}
      </p>

      <ArrowRight
        className={cn(
          "absolute bottom-6 right-6 h-7 w-7 transition group-hover:translate-x-1",
          gold ? "text-[#f8d479]" : "text-[#23ead4]"
        )}
      />
    </div>
  );
}

function BottomInfo({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d7a83f]/35 bg-[#2a2108]/55 text-[#f8d479] shadow-[0_0_28px_rgba(215,168,63,0.12)]">
        <Icon className="h-6 w-6" />
      </span>

      <div>
        <p className="text-sm font-black uppercase tracking-[0.12em] text-[#f8d479]">
          {title}
        </p>

        <p className="mt-1 text-sm text-slate-300">
          {description}
        </p>
      </div>
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
    <div className="flex items-center rounded-xl border border-white/13 bg-black/20 px-4 shadow-inner shadow-black/20 transition focus-within:border-[#23ead4]/50 focus-within:shadow-[0_0_0_4px_rgba(35,234,212,0.08)]">
      <Icon className="h-4 w-4 shrink-0 text-[#23ead4]/80" />
      {children}
    </div>
  );
}

export function AmarkhysPublicAppointmentLanding() {
  const [form, setForm] = useState<AppointmentForm>(initialForm);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [availabilityDays, setAvailabilityDays] = useState<PublicRuntimeDay[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(true);
  const [availabilityError, setAvailabilityError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<PublicRuntimeSlot | null>(null);

  function updateField(key: keyof AppointmentForm, value: string) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    if (error) {
      setError("");
    }
  }  useEffect(() => {
    let cancelled = false;

    async function loadAvailability() {
      setLoadingAvailability(true);
      setAvailabilityError("");

      try {
        const result = await getPublicSchedulingAvailabilityAction({
          moduleKey: "rendezvous",
          days: 7,
        });

        if (cancelled) {
          return;
        }

        setAvailabilityDays(result.days);
      } catch (loadError) {
        console.error("PUBLIC_SCHEDULING_AVAILABILITY_ERROR", loadError);

        if (!cancelled) {
          setAvailabilityError(
            "Impossible de charger les disponibilités pour le moment."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingAvailability(false);
        }
      }
    }

    loadAvailability();

    return () => {
      cancelled = true;
    };
  }, []);

  const availableSlots = useMemo(
    () =>
      availabilityDays.flatMap((day) =>
        day.slots.filter((slot) => slot.available)
      ),
    [availabilityDays]
  );

  function selectRuntimeSlot(slot: PublicRuntimeSlot) {
    if (!slot.available) {
      return;
    }

    setSelectedSlot(slot);
    updateField("dateSouhaitee", slot.date);
    updateField("heureSouhaitee", slot.startTime);
  }



  function validateForm() {
    if (!form.nom.trim()) return "Indiquez votre nom.";
    if (!form.telephone.trim()) return "Indiquez votre numéro de téléphone.";
    if (!form.vehicule.trim()) return "Indiquez votre véhicule.";
    if (!form.immatriculation.trim()) return "Indiquez l’immatriculation.";
    if (!form.dateSouhaitee.trim() || !form.heureSouhaitee.trim()) {
      return "Choisissez un créneau disponible.";
    }
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
      dateSouhaitee: form.dateSouhaitee,
        heureSouhaitee: form.heureSouhaitee,
        durationMinutes: selectedSlot
          ? Math.max(
              1,
              Math.round(
                (new Date(selectedSlot.date + "T" + selectedSlot.endTime + ":00").getTime() -
                  new Date(selectedSlot.date + "T" + selectedSlot.startTime + ":00").getTime()) /
                  60000
              )
            )
          : 60,
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
  }  const days = availabilityDays;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020807] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(35,234,212,0.10),transparent_30%),radial-gradient(circle_at_84%_8%,rgba(215,168,63,0.10),transparent_24%),radial-gradient(circle_at_70%_80%,rgba(7,95,83,0.34),transparent_34%),linear-gradient(135deg,#020807_0%,#03130f_50%,#020807_100%)]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:46px_46px]" />

      <div className="relative mx-auto max-w-[1460px] px-5 py-7 sm:px-8 lg:px-10">
        <header className="mb-9 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-end gap-4">
              <h1 className="text-5xl font-black uppercase tracking-tight text-white sm:text-6xl">
                AMARKHYS
              </h1>

              <span className="pb-2 text-2xl font-black text-slate-300">
                Garage
              </span>
            </div>

            <h2 className="mt-7 text-3xl font-black text-white sm:text-4xl">
              Prendre rendez-vous atelier
            </h2>

            <p className="mt-2 max-w-2xl text-base text-slate-300">
              Réservez votre créneau et profitez d’un service premium pour votre véhicule.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <div className="flex flex-wrap gap-3">
              <TopPill active>KPI</TopPill>
              <TopPill>Atelier</TopPill>
              <TopPill>Stock</TopPill>
              <TopPill>Alertes</TopPill>
            </div>

            <div className="flex flex-wrap gap-3">
              <TopPill gold>
                <CalendarPlus className="h-4 w-4" />
                Nouveau RDV
              </TopPill>
              <TopPill>
                <User className="h-4 w-4 text-[#23ead4]" />
                Mes RDV
              </TopPill>
              <TopPill>Services</TopPill>
              <TopPill>Interventions</TopPill>
              <TopPill>Factures</TopPill>
            </div>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="overflow-hidden rounded-[1.6rem] border border-[#d7a83f]/20 bg-[#05110f] shadow-[0_38px_110px_rgba(0,0,0,0.55)] ring-1 ring-[#23ead4]/12">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/amarkhys/rdv-hero-premium.png"
                  alt="Atelier premium AMARKHYS"
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020807] via-[#020807]/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020807]/22 via-transparent to-[#020807]/12" />

                <div className="absolute bottom-4 left-4 right-4 rounded-[1.45rem] border border-[#d7a83f]/24 bg-black/62 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-[#23ead4]">
                        Agenda atelier
                      </p>

                      <h3 className="mt-2 text-2xl font-black text-white">
                        Créneaux disponibles cette semaine
                      </h3>
                    </div>

                    <button
                      type="button"
                      className="hidden rounded-xl border border-[#d7a83f]/45 bg-[#2b2208]/70 px-4 py-3 text-sm font-black text-[#f8d479] shadow-[0_0_24px_rgba(215,168,63,0.12)] sm:inline-flex"
                    >
                      Voir calendrier
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                    {loadingAvailability ? (
                      <div className="col-span-full rounded-xl border border-white/10 bg-white/[0.035] p-4 text-center text-sm font-semibold text-slate-300">
                        Chargement des disponibilités...
                      </div>
                    ) : availabilityError ? (
                      <div className="col-span-full rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-center text-sm font-semibold text-red-100">
                        {availabilityError}
                      </div>
                    ) : days.length === 0 ? (
                      <div className="col-span-full rounded-xl border border-white/10 bg-white/[0.035] p-4 text-center text-sm font-semibold text-slate-300">
                        Aucun créneau disponible pour le moment.
                      </div>
                    ) : (
                      days.map((day) => {
                        const dayAvailableSlots = day.slots.filter(
                          (slot) => slot.available
                        );

                        return (
                          <div
                            key={day.date}
                            className="rounded-xl border border-white/10 bg-white/[0.035] p-4 text-center"
                          >
                            <p className="text-xs font-black text-slate-300">
                              {day.label}
                            </p>

                            <p className="mt-2 text-sm font-black text-white">
                              {day.date}
                            </p>

                            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                              {dayAvailableSlots.slice(0, 4).map((slot) => {
                                const active =
                                  selectedSlot?.date === slot.date &&
                                  selectedSlot?.startTime === slot.startTime;

                                return (
                                  <button
                                    key={slot.date + "-" + slot.startTime}
                                    type="button"
                                    onClick={() => selectRuntimeSlot(slot)}
                                    className={cn(
                                      "rounded-full border px-2.5 py-1 text-[11px] font-black transition",
                                      active
                                        ? "border-[#f8d479]/80 bg-[#f8d479]/20 text-[#f8d479]"
                                        : "border-[#23ead4]/35 bg-[#23ead4]/10 text-[#bffcf6] hover:border-[#23ead4]/70 hover:bg-[#23ead4]/20"
                                    )}
                                  >
                                    {slot.startTime}
                                  </button>
                                );
                              })}

                              {dayAvailableSlots.length === 0 ? (
                                <span className="text-xs font-semibold text-slate-500">
                                  Complet
                                </span>
                              ) : null}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <MetricCard
                icon={Zap}
                title="Réponse rapide"
                description="Votre demande est transmise instantanément au garage."
              />

              <MetricCard
                icon={CalendarDays}
                title="Créneau confirmé"
                description="Nous vous recontactons rapidement pour valider votre passage."
                gold
              />

              <MetricCard
                icon={Headphones}
                title="Suivi personnalisé"
                description="Votre véhicule est pris en charge avec un suivi complet."
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="rounded-[1.6rem] border border-[#23ead4]/25 bg-gradient-to-br from-[#075f53] via-[#053d36] to-[#031612] p-6 shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#23ead4]/12">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#23ead4]/35 bg-[#052e2a] text-[#23ead4] shadow-[0_0_45px_rgba(35,234,212,0.12)]">
                    <CalendarPlus className="h-8 w-8" />
                  </span>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-[#23ead4]">
                      Demande de rendez-vous
                    </p>

                    <h3 className="mt-2 text-3xl font-black text-white">
                      Réserver un créneau
                    </h3>
                  </div>
                </div>

                <div className="hidden rounded-xl border border-[#d7a83f]/45 bg-[#2b2208]/60 px-4 py-3 text-sm font-black text-[#f8d479] sm:block">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Service premium
                  </div>
                  <p className="mt-1 text-xs text-[#f8d479]/75">
                    AMARKHYS
                  </p>
                </div>
              </div>

              {success ? (
                <div className="rounded-3xl border border-[#23ead4]/25 bg-black/25 p-6">
                  <CheckCircle2 className="h-10 w-10 text-[#23ead4]" />

                  <h4 className="mt-4 text-2xl font-black text-white">
                    Demande envoyée
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-cyan-50/75">
                    Votre demande a bien été transmise à AMARKHYS Garage.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="mt-6 rounded-xl bg-[#18d5c0] px-5 py-3 text-sm font-black text-[#021111] transition hover:bg-[#37ffe4]"
                  >
                    Faire une autre demande
                  </button>
                </div>
              ) : (
                <div className="grid gap-5">
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
                          className="w-full bg-transparent px-3 py-3.5 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
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
                          placeholder="+225 07 12 34 56 78"
                          className="w-full bg-transparent px-3 py-3.5 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
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
                          className="w-full bg-transparent px-3 py-3.5 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
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
                          className="w-full bg-transparent px-3 py-3.5 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
                        />
                      </InputShell>
                    </label>
                  </div>

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
                        placeholder="Vidange, diagnostic, entretien..."
                        className="w-full bg-transparent px-3 py-3.5 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
                      />
                    </InputShell>
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-black text-white">
                        Date souhaitée
                      </span>
                      <InputShell icon={CalendarDays}>
                        <input
                          value={form.dateSouhaitee}
                          onChange={(event) =>
                            updateField("dateSouhaitee", event.target.value)
                          }
                          placeholder="JJ / MM / AAAA"
                          className="w-full bg-transparent px-3 py-3.5 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
                        />
                      </InputShell>
                    </label>

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
                          placeholder="--:--"
                          className="w-full bg-transparent px-3 py-3.5 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
                        />
                      </InputShell>
                    </label>
                  </div>

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
                      className="w-full rounded-xl border border-white/13 bg-black/20 px-4 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-400 transition focus:border-[#23ead4]/50 focus:shadow-[0_0_0_4px_rgba(35,234,212,0.08)]"
                    />
                  </label>

                  {error ? (
                    <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100">
                      {error}
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#f5c04a] via-[#d7a83f] to-[#9a6a17] px-6 py-4 text-sm font-black uppercase tracking-wide text-[#0b0b05] shadow-[0_0_60px_rgba(215,168,63,0.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <CalendarPlus className="h-5 w-5" />
                    {saving ? "Envoi en cours..." : "Demander un rendez-vous"}
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#23ead4]/24 bg-black/18 px-5 py-4 text-sm font-black text-white transition hover:bg-black/28"
                    >
                      <MessageCircle className="h-5 w-5 text-[#23ead4]" />
                      WhatsApp
                    </a>

                    <a
                      href="tel:+2250700000000"
                      className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#23ead4]/24 bg-black/18 px-5 py-4 text-sm font-black text-white transition hover:bg-black/28"
                    >
                      <Phone className="h-5 w-5 text-[#23ead4]" />
                      Appeler
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <footer className="mt-7 rounded-[1.45rem] border border-[#d7a83f]/24 bg-gradient-to-r from-[#1a1608]/78 via-[#061915]/84 to-[#1a1608]/78 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
          <div className="grid gap-6 lg:grid-cols-4">
            <BottomInfo
              icon={ShieldCheck}
              title="Données sécurisées"
              description="Vos informations restent confidentielles."
            />

            <BottomInfo
              icon={Clock3}
              title="Réponse rapide"
              description="Confirmation sous 1h ouvrée."
            />

            <BottomInfo
              icon={CheckCircle2}
              title="Atelier certifié"
              description="Service premium et suivi structuré."
            />

            <BottomInfo
              icon={LockKeyhole}
              title="Confidentialité"
              description="Votre demande est traitée avec soin."
            />
          </div>
        </footer>
      </div>
    </section>
  );
}
