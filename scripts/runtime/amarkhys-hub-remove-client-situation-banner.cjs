const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "src", "components", "erp", "hub", "ERPClientOperationalSheet.tsx");
const REPORT = path.join(ROOT, "docs", "audits", "AMARKHYS-HUB-REMOVE-CLIENT-SITUATION-BANNER.md");
const BACKUP = TARGET + ".bak-remove-client-situation-banner";

function fail(message) {
  console.error("[FAIL] " + message);
  process.exit(1);
}

function ok(message) {
  console.log("[OK] " + message);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

console.log("[AMARKHYS-HUB-REMOVE-CLIENT-SITUATION-BANNER] Remove situation banner and move alert to KPI");

if (!fs.existsSync(TARGET)) {
  fail("Missing target: " + TARGET);
}

const before = read(TARGET);
write(BACKUP, before);
ok("Backup written: " + path.relative(ROOT, BACKUP));

let after = before;

/**
 * 1. Replace KPI cards block so Impayés client owns the alert color.
 */
const oldKpiBlock = `              <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Interventions en cours", text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0")],
                  ["Impayés client", money(unpaidAmount)],
                  ["CA cumulé", money(revenueTotal)],
                  ["Prochain RDV", text(rootRecord, ["nextAppointment", "prochainRendezVous"])],
                ].map(([label, value]) => (
                  <article
                    key={label}
                    className="min-h-[112px] rounded-[1.75rem] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
                    <p className="mt-3 text-xl font-black leading-tight text-slate-950 md:text-2xl">{value}</p>
                  </article>
                ))}
              </section>`;

const newKpiBlock = `              <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    label: "Interventions en cours",
                    value: text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0"),
                    alert: false,
                  },
                  {
                    label: "Impayés client",
                    value: money(unpaidAmount),
                    alert: unpaidAmount > 0,
                  },
                  {
                    label: "CA cumulé",
                    value: money(revenueTotal),
                    alert: false,
                  },
                  {
                    label: "Prochain RDV",
                    value: text(rootRecord, ["nextAppointment", "prochainRendezVous"]),
                    alert: false,
                  },
                ].map((item) => (
                  <article
                    key={item.label}
                    data-amarkhys-kpi={item.label}
                    className={[
                      "min-h-[112px] rounded-[1.75rem] px-5 py-5 shadow-sm ring-1 transition",
                      item.alert
                        ? "bg-orange-50/70 ring-orange-200"
                        : "bg-white ring-slate-200",
                    ].join(" ")}
                  >
                    <p
                      className={[
                        "text-[10px] font-black uppercase tracking-[0.14em]",
                        item.alert ? "text-orange-600" : "text-slate-500",
                      ].join(" ")}
                    >
                      {item.label}
                    </p>
                    <p
                      className={[
                        "mt-3 text-xl font-black leading-tight md:text-2xl",
                        item.alert ? "text-orange-800" : "text-slate-950",
                      ].join(" ")}
                    >
                      {item.value}
                    </p>
                  </article>
                ))}
              </section>`;

if (!after.includes(oldKpiBlock)) {
  fail("KPI block not found.");
}

after = after.replace(oldKpiBlock, newKpiBlock);

/**
 * 2. Remove the whole Situation client banner.
 */
const situationRegex = /[ \t]*<section className="rounded-\[1\.75rem\] bg-white px-6 py-5 shadow-sm ring-1 ring-slate-200">\s*<div className="flex flex-wrap items-center justify-between gap-4">\s*<div>\s*<p className="text-\[10px\] font-black uppercase tracking-\[0\.16em\] text-emerald-700">\s*Situation client\s*<\/p>[\s\S]*?<\/section>\s*/m;

if (!situationRegex.test(after)) {
  fail("Situation client banner not found.");
}

after = after.replace(situationRegex, "");

/**
 * 3. Checks.
 */
const checks = [
  ["component changed", after !== before],
  ["situation banner removed", !after.includes("Situation client")],
  ["relance badge removed", !after.includes("À relancer")],
  ["kpi alert connected", after.includes("alert: unpaidAmount > 0")],
  ["impaid kpi preserved", after.includes('label: "Impayés client"')],
  ["orange alert on kpi", after.includes("bg-orange-50/70")],
  ["kpi marker added", after.includes("data-amarkhys-kpi")],
];

const failed = checks.filter(([, passed]) => !passed);

if (failed.length > 0) {
  fail("Checks failed: " + failed.map(([name]) => name).join(", "));
}

write(TARGET, after);
ok("Written: " + path.relative(ROOT, TARGET));

const report = [
  "# AMARKHYS-HUB-REMOVE-CLIENT-SITUATION-BANNER",
  "",
  "## Objectif",
  "",
  "- Supprimer le bandeau Situation client.",
  "- Supprimer le badge À relancer.",
  "- Connecter l’alerte au KPI Impayés client.",
  "- Si unpaidAmount > 0, le KPI Impayés client devient orange.",
  "",
  "## Checks",
  "",
  ...checks.map(([name, passed]) => "- " + (passed ? "OK" : "FAIL") + " — " + name),
  "",
].join("\\n");

write(REPORT, report);
ok("Report: " + path.relative(ROOT, REPORT));

console.log("[AMARKHYS-HUB-REMOVE-CLIENT-SITUATION-BANNER] DONE");
console.log("[NEXT] pnpm build");