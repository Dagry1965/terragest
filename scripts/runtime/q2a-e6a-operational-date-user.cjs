const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/components/erp/operational/ERPOperationalModulePage.tsx";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

fs.writeFileSync(
  file + ".bak-q2a-e6a-date-user-operational-header",
  original,
  "utf8"
);

/**
 * 1. Importer useAuth.
 */
if (!content.includes('import { useAuth } from "@/contexts/AuthContext";')) {
  content = content.replace(
    'import Link from "next/link";',
    'import Link from "next/link";\nimport { useAuth } from "@/contexts/AuthContext";'
  );
}

/**
 * 2. Ajouter helpers date/utilisateur.
 */
if (!content.includes("function formatOperationalDate")) {
  const marker = "function normalize(value: unknown): string {";

  const helper = `
function formatOperationalDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getOperationalUserLabel(
  user: {
    displayName?: string | null;
    email?: string | null;
  } | null
): string {
  if (!user) {
    return "Utilisateur";
  }

  return String(user.displayName ?? user.email ?? "Utilisateur").trim();
}

`;

  const index = content.indexOf(marker);

  if (index < 0) {
    throw new Error("Point insertion introuvable: normalize");
  }

  content = content.slice(0, index) + helper + content.slice(index);
}

/**
 * 3. Utiliser useAuth dans le composant.
 */
if (!content.includes("const { user } = useAuth();")) {
  content = content.replace(
    `export function ERPOperationalModulePage({
  module,
  data,
}: ERPOperationalModulePageProps) {
  const config = module.operational;`,
    `export function ERPOperationalModulePage({
  module,
  data,
}: ERPOperationalModulePageProps) {
  const config = module.operational;
  const { user } = useAuth();`
  );
}

/**
 * 4. Ajouter variables date/user après title/subtitle.
 */
if (!content.includes("const todayLabel = formatOperationalDate")) {
  content = content.replace(
    `  const subtitle =
    config?.subtitle ??
    module.metadata.description ??
    "Vue opérationnelle générée par le Runtime ERP.";

  const activeFiltersCount =`,
    `  const subtitle =
    config?.subtitle ??
    module.metadata.description ??
    "Vue opérationnelle générée par le Runtime ERP.";

  const todayLabel = formatOperationalDate(new Date());
  const userLabel = getOperationalUserLabel(user);

  const activeFiltersCount =`
  );
}

/**
 * 5. Ajouter affichage sous le badge AMARKHYS.
 */
if (!content.includes("Connecté :")) {
  content = content.replace(
    `<div className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700 shadow-sm">
              AMARKHYS · Runtime ERP
            </div>`,
    `<div className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700 shadow-sm">
              AMARKHYS · Runtime ERP
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-100">
                Aujourd’hui · {todayLabel}
              </span>
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-100">
                Connecté : {userLabel}
              </span>
            </div>`
  );
}

const problems = [];

if (!content.includes('import { useAuth } from "@/contexts/AuthContext";')) {
  problems.push("import useAuth absent");
}

if (!content.includes("const { user } = useAuth();")) {
  problems.push("useAuth non utilisé");
}

if (!content.includes("formatOperationalDate")) {
  problems.push("formatOperationalDate absent");
}

if (!content.includes("getOperationalUserLabel")) {
  problems.push("getOperationalUserLabel absent");
}

if (!content.includes("Aujourd’hui · {todayLabel}")) {
  problems.push("date du jour non affichée");
}

if (!content.includes("Connecté : {userLabel}")) {
  problems.push("utilisateur connecté non affiché");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) console.log(" - " + problem);
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-A-E6A date du jour + utilisateur connecté ajoutés.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("pnpm build");
