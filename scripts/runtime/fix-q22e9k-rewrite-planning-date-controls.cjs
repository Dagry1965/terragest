/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const planningPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

if (!fs.existsSync(planningPath)) {
  fail("ERPSchedulingPlanningView.tsx introuvable");
}

let content = fs.readFileSync(planningPath, "utf8");

if (!content.includes("Date du planning")) {
  fail("Bloc Date du planning introuvable");
}

if (!content.includes("function addDays(")) {
  fail("addDays() introuvable");
}

const dateControlsRegex =
  /<div className="mt-3 flex flex-wrap items-center gap-2">[\s\S]*?<\/div>\s*\n\s*<p className="mt-3 text-sm font-semibold capitalize text-teal-100">/m;

if (!dateControlsRegex.test(content)) {
  fail("Bloc contrôles date introuvable");
}

const replacement = `<div className="relative z-20 mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  aria-label="Jour precedent"
                  onClick={() => {
                    setSelectedDate((current) => addDays(current, -1));
                  }}
                  className="pointer-events-auto rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/15"
                >
                  Precedent
                </button>

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => {
                    setSelectedDate(event.target.value);
                  }}
                  className="pointer-events-auto rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-black text-slate-950 outline-none"
                />

                <button
                  type="button"
                  aria-label="Jour suivant"
                  onClick={() => {
                    setSelectedDate((current) => addDays(current, 1));
                  }}
                  className="pointer-events-auto rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/15"
                >
                  Suivant
                </button>

                <button
                  type="button"
                  aria-label="Aujourd'hui"
                  onClick={() => {
                    setSelectedDate(toDateOnly());
                  }}
                  className="pointer-events-auto rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                >
                  Aujourd'hui
                </button>
              </div>

              <p className="mt-3 text-sm font-semibold capitalize text-teal-100">`;

content = content.replace(dateControlsRegex, replacement);

if (!content.includes("setSelectedDate((current) => addDays(current, 1))")) {
  fail("Bouton Suivant non corrigé");
}

if (!content.includes(">Suivant<") && !content.includes("Suivant")) {
  fail("Label Suivant absent");
}

fs.writeFileSync(planningPath, content, "utf8");

ok("Bloc date planning réécrit avec boutons texte robustes");
console.log("");
console.log("[Q22E9K_DATE_CONTROLS_REWRITE_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm dev");