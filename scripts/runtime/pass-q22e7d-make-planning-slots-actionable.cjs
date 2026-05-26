const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetPath = path.join(
  root,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

const backupPath = `${targetPath}.bak-q22e7d-actionable-planning-slots`;

function fail(message) {
  console.error(`\n[ERROR] ${message}`);
  process.exit(1);
}

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`File not found: ${filePath}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, filePath)}`);
}

function backup() {
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(targetPath, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${path.relative(root, backupPath)}`);
  }
}

let content = read(targetPath);
const original = content;

backup();

if (content.includes("buildSlotCreateHref") && content.includes("Créer sur ce créneau")) {
  console.log("\n[SKIP] Q22E-7D semble déjà appliqué.");
  process.exit(0);
}

/**
 * Q22E-7D
 * Make planning slots actionable in a generic way.
 *
 * Rule:
 * - available slot => navigate to module create route with scheduling query params
 * - full/unavailable slot => disabled visual state
 * - no AMARKHYS/garage/rendezvous-specific logic inside the generic component
 */

if (!content.includes(`import Link from "next/link";`)) {
  const reactImportPattern = /import\s+.*?\s+from\s+"react";/s;

  if (!reactImportPattern.test(content)) {
    fail("React import not found. Cannot safely insert Link import.");
  }

  content = content.replace(
    reactImportPattern,
    (match) => `${match}\nimport Link from "next/link";`
  );
}

const helperAnchor = `function formatDayLabel(dateOnly: string)`;
if (!content.includes(helperAnchor)) {
  fail(`Expected helper anchor not found: ${helperAnchor}`);
}

const helperBlock = `function buildSlotCreateHref(params: {
  module: ERPModule;
  dateOnly: string;
  slot: {
    label?: string;
    startAt?: string;
    endAt?: string;
    durationMinutes?: number;
  };
}) {
  const { module, dateOnly, slot } = params;
  const scheduling = module.scheduling;

  const createHref =
    module.routes?.create ||
    module.routes?.new ||
    \`/\${module.key}/nouveau\`;

  const searchParams = new URLSearchParams();

  if (scheduling?.dateField) {
    searchParams.set(scheduling.dateField, dateOnly);
  }

  if (scheduling?.timeField) {
    const timeValue =
      typeof slot.label === "string" && slot.label.includes(":")
        ? slot.label.slice(0, 5)
        : typeof slot.startAt === "string"
          ? slot.startAt.slice(11, 16)
          : "";

    if (timeValue) {
      searchParams.set(scheduling.timeField, timeValue);
    }
  }

  if (scheduling?.startField && typeof slot.startAt === "string") {
    searchParams.set(scheduling.startField, slot.startAt);
  }

  if (scheduling?.endField && typeof slot.endAt === "string") {
    searchParams.set(scheduling.endField, slot.endAt);
  }

  if (scheduling?.durationField && typeof slot.durationMinutes === "number") {
    searchParams.set(scheduling.durationField, String(slot.durationMinutes));
  }

  const query = searchParams.toString();

  return query ? \`\${createHref}?\${query}\` : createHref;
}

`;

content = content.replace(helperAnchor, `${helperBlock}${helperAnchor}`);

const oldWeekSlotBlock = `                {day.slots.slice(0, 8).map((slot) => (
                  <div
                    key={slot.startAt}
                    className={\`rounded-2xl border p-2.5 text-xs shadow-sm \${
                      slot.available
                        ? "border-emerald-100 bg-emerald-50 text-emerald-800"
                        : "border-rose-100 bg-rose-50 text-rose-800"
                    }\`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold">{slot.label}</span>
                      <span className="font-semibold">
                        {slot.available ? "Disponible" : "Complet"}
                      </span>
                    </div>

                    {typeof slot.remainingCapacity === "number" ? (
                      <p className="mt-1 text-[11px] opacity-80">
                        {slot.remainingCapacity} place(s) restante(s)
                      </p>
                    ) : null}
                  </div>
                ))}`;

const newWeekSlotBlock = `                {day.slots.slice(0, 8).map((slot) => {
                  const slotHref = buildSlotCreateHref({
                    module,
                    dateOnly: day.dateOnly,
                    slot,
                  });

                  const slotClassName = \`block rounded-2xl border p-2.5 text-xs shadow-sm transition \${
                    slot.available
                      ? "border-emerald-100 bg-emerald-50 text-emerald-800 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-100 hover:shadow-md"
                      : "cursor-not-allowed border-rose-100 bg-rose-50 text-rose-800 opacity-80"
                  }\`;

                  const slotContent = (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold">{slot.label}</span>
                        <span className="font-semibold">
                          {slot.available ? "Disponible" : "Complet"}
                        </span>
                      </div>

                      {typeof slot.remainingCapacity === "number" ? (
                        <p className="mt-1 text-[11px] opacity-80">
                          {slot.remainingCapacity} place(s) restante(s)
                        </p>
                      ) : null}

                      {slot.available ? (
                        <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                          Créer sur ce créneau
                        </p>
                      ) : (
                        <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-rose-700">
                          Créneau indisponible
                        </p>
                      )}
                    </>
                  );

                  return slot.available ? (
                    <Link
                      key={slot.startAt}
                      href={slotHref}
                      className={slotClassName}
                    >
                      {slotContent}
                    </Link>
                  ) : (
                    <div key={slot.startAt} className={slotClassName}>
                      {slotContent}
                    </div>
                  );
                })}`;

if (!content.includes(oldWeekSlotBlock)) {
  fail("Expected week slot rendering block not found. The file shape may have changed.");
}

content = content.replace(oldWeekSlotBlock, newWeekSlotBlock);

if (content === original) {
  fail("No changes applied.");
}

write(targetPath, content);

console.log(`
[Q22E7D_DONE] Créneaux planning rendus actionnables.

Scope:
  - generic scheduling planning only
  - available slot links to module create route
  - query params are derived from module.scheduling metadata
  - unavailable/full slots stay disabled
  - no AMARKHYS/garage-specific logic

Next:
  pnpm build
  tester /rendezvous/planning
  cliquer sur un créneau disponible
  vérifier navigation vers /rendezvous/nouveau?... 
  git status --short
  git add src/components/erp/scheduling/ERPSchedulingPlanningView.tsx scripts/runtime/pass-q22e7d-make-planning-slots-actionable.cjs
  git commit -m "feat(runtime): make scheduling planning slots actionable"
  git tag q22e7d-scheduling-actionable-slots
`);
