const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET =
  "src/components/public/AmarkhysPublicAppointmentLanding.tsx";

const targetPath = path.join(ROOT, TARGET);

if (!fs.existsSync(targetPath)) {
  throw new Error(`Fichier introuvable: ${TARGET}`);
}

const backupPath = `${targetPath}.bak-qpublic-sched-db4-targeted`;
fs.copyFileSync(targetPath, backupPath);

let content = fs.readFileSync(targetPath, "utf8");

function replaceOrThrow(pattern, replacement, label) {
  if (typeof pattern === "string") {
    if (!content.includes(pattern)) {
      throw new Error(`Bloc introuvable: ${label}`);
    }

    content = content.replace(pattern, replacement);
    return;
  }

  if (!pattern.test(content)) {
    throw new Error(`Pattern introuvable: ${label}`);
  }

  content = content.replace(pattern, replacement);
}

replaceOrThrow(
  /import\s+\{\s*useState\s*\}\s+from\s+"react";/,
  `import { useEffect, useMemo, useState } from "react";`,
  "import React useEffect/useMemo"
);

if (!content.includes("getPublicSchedulingAvailabilityAction")) {
  replaceOrThrow(
    /import\s+\{\s*createPublicAppointment\s*\}\s+from\s+"@\/components\/public\/PublicAppointmentService";/,
    `import { createPublicAppointment } from "@/components/public/PublicAppointmentService";

import {
  getPublicSchedulingAvailabilityAction,
} from "@/runtime/scheduling/public";`,
    "import public scheduling availability action"
  );
}

if (!content.includes("type PublicRuntimeSlot")) {
  replaceOrThrow(
    /type\s+AppointmentForm\s*=\s*\{/,
    `type PublicRuntimeSlot = {
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

type AppointmentForm = {`,
    "insert public runtime availability types"
  );
}

if (!content.includes("availabilityDays")) {
  replaceOrThrow(
    /(\s*const\s+\[error,\s*setError\]\s*=\s*useState\(""\);)/,
    `$1
  const [availabilityDays, setAvailabilityDays] = useState<PublicRuntimeDay[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(true);
  const [availabilityError, setAvailabilityError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<PublicRuntimeSlot | null>(null);`,
    "insert availability states"
  );
}

if (!content.includes("function selectRuntimeSlot")) {
  replaceOrThrow(
    /(\s*function\s+validateForm\(\)\s*\{)/,
    `  useEffect(() => {
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

$1`,
    "insert availability effect before validateForm"
  );
}

replaceOrThrow(
  /\s*const\s+days\s*=\s*\[[\s\S]*?\n\s*\];/,
  `  const days = availabilityDays;`,
  "replace static days by runtime availability days"
);

const oldDaysBlock = `                    {days.map((day) => (
                      <div
                        key={day.label}
                        className={cn(
                          "rounded-xl border p-4 text-center",
                          day.active
                            ? "border-[#23ead4]/70 bg-[#0b7569]/60 shadow-[0_0_30px_rgba(35,234,212,0.14)]"
                            : day.gold
                              ? "border-[#d7a83f]/30 bg-[#2b2208]/35"
                              : "border-white/10 bg-white/[0.035]"
                        )}
                      >
                        <p className="text-xs font-black text-slate-300">
                          {day.label}
                        </p>

                        <p className="mt-2 text-sm font-black text-white">
                          {day.date}
                        </p>

                        <div className="mt-4 flex justify-center gap-1.5">
                          {[0, 1, 2].map((index) => (
                            <span
                              key={index}
                              className={cn(
                                "h-2.5 w-2.5 rounded-full",
                                index < day.dots
                                  ? day.gold
                                    ? "bg-[#f8d479]"
                                    : "bg-[#23ead4]"
                                  : "bg-slate-600"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    ))}`;

const newDaysBlock = `                    {loadingAvailability ? (
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
                    )}`;

replaceOrThrow(oldDaysBlock, newDaysBlock, "replace exact static days JSX block");

if (!content.includes("Chargement des disponibilités")) {
  throw new Error("Le bloc runtime availability n'a pas été inséré.");
}

if (content.includes("day.dots") || content.includes("day.gold")) {
  throw new Error("Il reste des références aux anciens jours statiques.");
}

fs.writeFileSync(targetPath, content, "utf8");

console.log("");
console.log("[Q-PUBLIC-SCHED-D-B4] DONE");
console.log(`[BACKUP] ${path.relative(ROOT, backupPath).replace(/\\\\/g, "/")}`);
console.log(`[UPDATED] ${TARGET}`);
console.log("");
console.log("Next:");
console.log("pnpm build");