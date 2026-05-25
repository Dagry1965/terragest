const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22e5-polish-scheduling-planning-day-ui";

const targetFile =
  "src/components/erp/scheduling/ERPSchedulingPlanningView.tsx";

const target = path.join(ROOT, targetFile);

if (!fs.existsSync(target)) {
  throw new Error(`[MISSING] ${targetFile}`);
}

const backup = `${target}.bak-${TAG}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(target, backup);
  console.log(`[BACKUP] ${targetFile}.bak-${TAG}`);
}

let content = fs.readFileSync(target, "utf8");

if (content.includes("Q22E5_PLANNING_DAY_UI_POLISH")) {
  console.log("[SKIP] Q22E-5 already installed.");
  process.exit(0);
}

const marker = `  if (!schedulingConfig) {
    return (`;

const summaryBlock = `  const totalSlots =
    planning.slots.length;

  const availableSlots =
    planning.slots.filter((slot) => slot.available).length;

  const fullSlots =
    totalSlots - availableSlots;

  const totalBookings =
    Array.from(planning.bookingsBySlot.values()).reduce(
      (total, items) => total + items.length,
      0
    );

`;

if (!content.includes(marker)) {
  throw new Error("[MISSING] no scheduling config marker");
}

content = content.replace(marker, summaryBlock + marker);

const headerMarker = `          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[var(--erp-primary)]">
              ERP Scheduling Runtime
            </p>

            <h1 className="mt-2 text-3xl font-black text-[var(--erp-text)]">
              Planning {module.metadata.label}
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--erp-text-muted)]">
              Vue générique basée sur module.scheduling : horaires, buffer,
              exceptions calendrier, capacité et réservations existantes.
            </p>
          </div>`;

const headerReplacement = `          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[var(--erp-primary)]">
              ERP Scheduling Runtime
            </p>

            <h1 className="mt-2 text-3xl font-black text-[var(--erp-text)]">
              Planning {module.metadata.label}
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--erp-text-muted)]">
              Vue générique basée sur module.scheduling : horaires, buffer,
              exceptions calendrier, capacité et réservations existantes.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={"/" + module.metadata.key}
                className="rounded-2xl border border-[var(--erp-border)] bg-white px-4 py-2 text-sm font-black text-[var(--erp-text)] shadow-sm transition hover:bg-slate-50"
              >
                Retour liste
              </Link>

              <Link
                href={
                  module.metadata.routes?.create ??
                  "/" + module.metadata.key + "/nouveau"
                }
                className="rounded-2xl bg-[var(--erp-primary)] px-4 py-2 text-sm font-black text-[var(--erp-table-head-text)] shadow-sm transition hover:brightness-110"
              >
                Nouveau rendez-vous
              </Link>
            </div>
          </div>`;

if (!content.includes(headerMarker)) {
  throw new Error("[MISSING] planning header block");
}

content = content.replace(headerMarker, headerReplacement);

const beforePlanningListMarker = `      <div className="rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4 shadow-sm">
        {loading ? (`;

const metricsBlock = `      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--erp-text-muted)]">
            Créneaux
          </p>
          <p className="mt-2 text-3xl font-black text-[var(--erp-text)]">
            {totalSlots}
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
            Disponibles
          </p>
          <p className="mt-2 text-3xl font-black text-emerald-900">
            {availableSlots}
          </p>
        </div>

        <div className="rounded-3xl border border-rose-100 bg-rose-50 p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-rose-700">
            Complets
          </p>
          <p className="mt-2 text-3xl font-black text-rose-900">
            {fullSlots}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">
            Réservations
          </p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {totalBookings}
          </p>
        </div>
      </div>

      <div
        // Q22E5_PLANNING_DAY_UI_POLISH
        className="rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4 shadow-sm"
      >
        {loading ? (`;

if (!content.includes(beforePlanningListMarker)) {
  throw new Error("[MISSING] planning list container marker");
}

content = content.replace(beforePlanningListMarker, metricsBlock);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22E5_DONE] Scheduling planning day UI polished.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  test /rendezvous/planning");