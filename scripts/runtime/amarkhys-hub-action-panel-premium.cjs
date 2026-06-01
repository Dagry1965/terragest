const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "hub",
  "ERPClientOperationalSheet.tsx"
);

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "AMARKHYS-HUB-ACTION-PANEL-PREMIUM.md"
);

const BACKUP = `${TARGET}.bak-action-panel-premium`;

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

console.log("[AMARKHYS-HUB-ACTION-PANEL-PREMIUM] Transform client actions panel");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = read(TARGET);
write(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

let after = before;

const required = [
  "hubActions",
  "RuntimeHubActionContextAdapter",
  'SectionTitle title="ACTIONS CLIENT"',
];

for (const marker of required) {
  if (!after.includes(marker)) {
    fail(`Missing marker before patch: ${marker}`);
  }
}

/**
 * 1. Add visual helpers.
 */
if (!after.includes("function hubActionIcon")) {
  const anchor = `function buildOperationalChild(
  child: ERPCompositionChild
): ERPCompositionChild {`;

  const helpers = `function hubActionIcon(actionKey: string): string {
  if (actionKey.includes("relancer-client")) return "☎";
  if (actionKey.includes("relancer-facture")) return "▤";
  if (actionKey.includes("enregistrer-paiement")) return "$";
  if (actionKey.includes("ouvrir-intervention")) return "⚒";
  if (actionKey.includes("ouvrir-facture")) return "▣";
  if (actionKey.includes("voir-encaissements")) return "☷";

  return "•";
}

function hubActionClassName(actionKey: string): string {
  const base =
    "group flex w-full items-center gap-4 rounded-[1.35rem] px-4 py-4 text-left text-sm font-black shadow-sm ring-1 transition hover:-translate-y-0.5 hover:shadow-md";

  if (
    actionKey.includes("relancer-client") ||
    actionKey.includes("relancer-facture")
  ) {
    return [
      base,
      "bg-gradient-to-r from-orange-500 to-orange-400 text-white ring-orange-300",
    ].join(" ");
  }

  if (actionKey.includes("enregistrer-paiement")) {
    return [
      base,
      "bg-gradient-to-r from-emerald-700 to-teal-600 text-white ring-emerald-300",
    ].join(" ");
  }

  if (
    actionKey.includes("ouvrir-intervention") ||
    actionKey.includes("ouvrir-facture")
  ) {
    return [
      base,
      "bg-gradient-to-r from-slate-600 to-slate-500 text-white ring-slate-300",
    ].join(" ");
  }

  return [
    base,
    "bg-slate-100 text-slate-950 ring-slate-200 hover:bg-slate-200",
  ].join(" ");
}

`;

  if (!after.includes(anchor)) {
    fail("buildOperationalChild anchor not found.");
  }

  after = after.replace(anchor, helpers + anchor);
}

/**
 * 2. Replace ERPRuntimeActionBar with vertical premium panel.
 */
if (after.includes("<ERPRuntimeActionBar")) {
  const oldActionBarRegex = /<ERPRuntimeActionBar[\s\S]*?actions=\{hubActions\}[\s\S]*?\/>/;

  const newPremiumPanel = `                <div className="space-y-3">
                  {hubActions.map((action) => {
                    const content = (
                      <>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black">
                          {hubActionIcon(action.key)}
                        </span>

                        <span className="min-w-0 flex-1 leading-tight">
                          {action.label}
                        </span>
                      </>
                    );

                    if (action.href && !action.disabled) {
                      return (
                        <Link
                          key={action.key}
                          href={action.href}
                          className={hubActionClassName(action.key)}
                          title={action.description}
                        >
                          {content}
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={action.key}
                        type="button"
                        disabled={action.disabled}
                        className={[
                          hubActionClassName(action.key),
                          action.disabled ? "cursor-not-allowed opacity-50" : "",
                        ].join(" ")}
                        title={action.description}
                      >
                        {content}
                      </button>
                    );
                  })}
                </div>`;

  if (!oldActionBarRegex.test(after)) {
    fail("ERPRuntimeActionBar with hubActions not found.");
  }

  after = after.replace(oldActionBarRegex, newPremiumPanel);
}

/**
 * 3. Remove unused import if present.
 */
after = after.replace(
  'import { ERPRuntimeActionBar } from "@/components/erp/runtime/ERPRuntimeActionBar";\n',
  ""
);
after = after.replace(
  'import { ERPRuntimeActionBar } from "@/components/erp/runtime/ERPRuntimeActionBar";\r\n',
  ""
);

/**
 * 4. Improve action section container.
 */
after = after.replace(
  '              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-orange-200 bg-orange-50/40">',
  '              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">'
);

after = after.replace(
  '              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 bg-orange-50/40">',
  '              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">'
);

/**
 * 5. Checks.
 */
const checks = [
  ["component changed", after !== before],
  ["helpers added", after.includes("function hubActionIcon")],
  ["premium class added", after.includes("hubActionClassName(action.key)")],
  ["actions map rendered", after.includes("hubActions.map((action)")],
  ["old actionbar removed", !after.includes("<ERPRuntimeActionBar")],
  ["runtime adapter preserved", after.includes("RuntimeHubActionContextAdapter")],
  ["right panel title preserved", after.includes('SectionTitle title="ACTIONS CLIENT"')],
  ["orange relance style", after.includes("from-orange-500 to-orange-400")],
  ["green payment style", after.includes("from-emerald-700 to-teal-600")],
  ["slate open style", after.includes("from-slate-600 to-slate-500")],
];

const failed = checks.filter(([, passed]) => !passed);

if (failed.length > 0) {
  fail(`Checks failed: ${failed.map(([name]) => name).join(", ")}`);
}

write(TARGET, after);
ok(`Written: ${path.relative(ROOT, TARGET)}`);

const report = [
  "# AMARKHYS-HUB-ACTION-PANEL-PREMIUM",
  "",
  "## Objectif",
  "",
  "Transformer le bloc Actions client en panneau vertical premium AMARKHYS.",
  "",
  "## Résultat attendu",
  "",
  "- Actions client reste dans la colonne droite.",
  "- Les actions sont affichées en grands boutons verticaux.",
  "- Relances en orange.",
  "- Paiement en vert.",
  "- Ouvertures intervention/facture en bleu-gris.",
  "- Voir encaissements en gris clair.",
  "- Les actions restent alimentées par RuntimeHubActionContextAdapter.",
  "",
  "## Checks",
  "",
  ...checks.map(([name, passed]) => `- ${passed ? "OK" : "FAIL"} — ${name}`),
  "",
].join("\n");

write(REPORT, report);
ok(`Report: ${path.relative(ROOT, REPORT)}`);

console.log("[AMARKHYS-HUB-ACTION-PANEL-PREMIUM] DONE");
console.log("[NEXT] pnpm build");