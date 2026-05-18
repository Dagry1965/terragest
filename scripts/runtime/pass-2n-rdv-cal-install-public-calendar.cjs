const fs = require("fs");
const path = require("path");

const root = process.cwd();

function writeFile(filePath, content) {
  const absolutePath = path.join(root, filePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, "utf8");
  console.log("WRITTEN", filePath);
}

writeFile(
  "src/components/amarkhys/public/AmarkhysAppointmentCalendar.tsx",
`"use client";

import { useMemo, useState } from "react";

export type AmarkhysAppointmentSlot = {
  date: string;
  time: string;
};

interface AmarkhysAppointmentCalendarProps {
  value?: AmarkhysAppointmentSlot;
  onChange: (value: AmarkhysAppointmentSlot) => void;
  disabledDates?: string[];
  unavailableSlots?: Record<string, string[]>;
}

const weekDays = [
  "Lun",
  "Mar",
  "Mer",
  "Jeu",
  "Ven",
  "Sam",
  "Dim",
];

const defaultSlots = [
  "08:30",
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

function toDateKey(date: Date): string {
  const year =
    date.getFullYear();

  const month =
    String(date.getMonth() + 1).padStart(2, "0");

  const day =
    String(date.getDate()).padStart(2, "0");

  return \`\${year}-\${month}-\${day}\`;
}

function getMonthDays(currentDate: Date): Date[] {
  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();

  const firstDay =
    new Date(year, month, 1);

  const lastDay =
    new Date(year, month + 1, 0);

  const days: Date[] = [];

  const mondayBasedStart =
    firstDay.getDay() === 0
      ? 6
      : firstDay.getDay() - 1;

  for (let index = mondayBasedStart; index > 0; index -= 1) {
    days.push(
      new Date(year, month, 1 - index)
    );
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(
      new Date(year, month, day)
    );
  }

  while (days.length % 7 !== 0) {
    const last =
      days[days.length - 1];

    days.push(
      new Date(
        last.getFullYear(),
        last.getMonth(),
        last.getDate() + 1
      )
    );
  }

  return days;
}

function formatMonth(date: Date): string {
  return new Intl.DateTimeFormat(
    "fr-FR",
    {
      month: "long",
      year: "numeric",
    }
  ).format(date);
}

function isSameDay(
  first: Date,
  second: Date
): boolean {
  return toDateKey(first) === toDateKey(second);
}

export function AmarkhysAppointmentCalendar({
  value,
  onChange,
  disabledDates = [],
  unavailableSlots = {},
}: AmarkhysAppointmentCalendarProps) {
  const today =
    new Date();

  const [currentMonth, setCurrentMonth] =
    useState(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

  const selectedDate =
    value?.date
      ? new Date(value.date)
      : null;

  const monthDays =
    useMemo(
      () => getMonthDays(currentMonth),
      [currentMonth]
    );

  function previousMonth() {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  }

  function nextMonth() {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  }

  function selectDate(date: Date) {
    const dateKey =
      toDateKey(date);

    onChange({
      date: dateKey,
      time: value?.time ?? "",
    });
  }

  function selectTime(time: string) {
    if (!value?.date) {
      return;
    }

    onChange({
      date: value.date,
      time,
    });
  }

  const unavailableForSelectedDate =
    value?.date
      ? unavailableSlots[value.date] ?? []
      : [];

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#061412] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,255,232,0.18),transparent_36%),linear-gradient(135deg,rgba(2,8,7,0.95),rgba(6,20,18,0.96)_45%,rgba(11,43,38,0.92))]" />

      <div className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#7FFFE8]">
              Créneau atelier
            </p>

            <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              Choisissez votre rendez-vous
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
              Sélectionnez une date puis un horaire disponible. AMARKHYS confirme ensuite votre passage à l’atelier.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={previousMonth}
              className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 text-xl font-black text-white transition hover:border-[#7FFFE8]/40 hover:bg-[#00A99D]/20"
              aria-label="Mois précédent"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextMonth}
              className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 text-xl font-black text-white transition hover:border-[#7FFFE8]/40 hover:bg-[#00A99D]/20"
              aria-label="Mois suivant"
            >
              ›
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 backdrop-blur">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-black capitalize text-white">
                {formatMonth(currentMonth)}
              </p>

              {value?.date ? (
                <p className="rounded-full border border-[#7FFFE8]/30 bg-[#00A99D]/10 px-3 py-1 text-xs font-bold text-[#7FFFE8]">
                  {value.date}
                  {value.time ? \` · \${value.time}\` : ""}
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="pb-2 text-[11px] font-black uppercase text-slate-500"
                >
                  {day}
                </div>
              ))}

              {monthDays.map((date) => {
                const dateKey =
                  toDateKey(date);

                const isCurrentMonth =
                  date.getMonth() === currentMonth.getMonth();

                const isPast =
                  new Date(dateKey).getTime() <
                  new Date(toDateKey(today)).getTime();

                const isSunday =
                  date.getDay() === 0;

                const disabled =
                  isPast ||
                  isSunday ||
                  !isCurrentMonth ||
                  disabledDates.includes(dateKey);

                const selected =
                  selectedDate
                    ? isSameDay(date, selectedDate)
                    : false;

                return (
                  <button
                    key={dateKey}
                    type="button"
                    disabled={disabled}
                    onClick={() => selectDate(date)}
                    className={[
                      "h-11 rounded-2xl text-sm font-black transition sm:h-12",
                      selected
                        ? "bg-[#00A99D] text-[#02110F] shadow-[0_12px_26px_rgba(0,169,157,0.24)]"
                        : "border border-white/10 bg-white/[0.04] text-white hover:border-[#7FFFE8]/40 hover:bg-[#00A99D]/10",
                      disabled
                        ? "cursor-not-allowed opacity-25 hover:border-white/10 hover:bg-white/[0.04]"
                        : "",
                    ].join(" ")}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#7FFFE8]">
              Horaires disponibles
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              Les créneaux sont indicatifs. Le garage vous recontacte pour confirmation.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {defaultSlots.map((slot) => {
                const disabled =
                  !value?.date ||
                  unavailableForSelectedDate.includes(slot);

                const selected =
                  value?.time === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={disabled}
                    onClick={() => selectTime(slot)}
                    className={[
                      "rounded-2xl border px-4 py-3 text-sm font-black transition",
                      selected
                        ? "border-[#7FFFE8] bg-[#00A99D] text-[#02110F] shadow-[0_12px_26px_rgba(0,169,157,0.22)]"
                        : "border-white/10 bg-black/20 text-white hover:border-[#7FFFE8]/40 hover:bg-[#00A99D]/10",
                      disabled
                        ? "cursor-not-allowed opacity-40"
                        : "",
                    ].join(" ")}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-[#7FFFE8]/20 bg-[#00A99D]/10 p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7FFFE8]">
                Votre sélection
              </p>

              <p className="mt-2 text-sm font-bold text-white">
                {value?.date
                  ? value.time
                    ? \`\${value.date} à \${value.time}\`
                    : \`\${value.date} · choisissez un horaire\`
                  : "Aucune date sélectionnée"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`
);

console.log("PASS 2N-RDV-CAL OK: premium public appointment calendar component installed.");