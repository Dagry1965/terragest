const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const COMPONENT = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPHubReturnBanner.tsx"
);

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "AMARKHYS-HUB-RETURN-BANNER.md"
);

const TARGETS = [
  path.join(ROOT, "src", "components", "erp", "generic", "GenericDetailPage.tsx"),
  path.join(ROOT, "src", "components", "erp", "generic", "GenericEditPage.tsx"),
  path.join(ROOT, "src", "components", "erp", "generic", "GenericCreatePage.tsx"),
];

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function exists(file) {
  return fs.existsSync(file);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

function backup(file) {
  if (!exists(file)) return;
  const backupPath = `${file}.bak-return-banner`;
  write(backupPath, read(file));
  ok(`Backup written: ${path.relative(ROOT, backupPath)}`);
}

console.log("[AMARKHYS-HUB-RETURN-BANNER] Install return banner");

const componentContent = `"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

function safeReturnTo(value: string | null): string {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();

  if (!trimmed.startsWith("/")) {
    return "";
  }

  if (trimmed.startsWith("//")) {
    return "";
  }

  return trimmed;
}

export function ERPHubReturnBanner() {
  const searchParams = useSearchParams();

  const returnTo = useMemo(
    () => safeReturnTo(searchParams.get("returnTo")),
    [searchParams]
  );

  const clientId = searchParams.get("clientId");
  const vehicleId =
    searchParams.get("selectedVehicleId") ?? searchParams.get("vehiculeId");
  const interventionId = searchParams.get("selectedInterventionId");
  const factureId = searchParams.get("selectedFactureId");

  if (!returnTo) {
    return null;
  }

  return (
    <section
      data-amarkhys-hub-return-banner="true"
      className="mb-5 rounded-[1.75rem] border border-emerald-100 bg-emerald-50/60 px-5 py-4 shadow-sm"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
            Contexte fiche client opérationnelle
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            Vous consultez un élément ouvert depuis la fiche client. Le retour conserve le client, le véhicule et le parcours sélectionnés.
          </p>

          <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-bold text-slate-500">
            {clientId ? <span>Client lié</span> : null}
            {vehicleId ? <span>Véhicule lié</span> : null}
            {interventionId ? <span>Intervention liée</span> : null}
            {factureId ? <span>Facture liée</span> : null}
          </div>
        </div>

        <Link
          href={returnTo}
          className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-emerald-800 shadow-sm ring-1 ring-emerald-100 transition hover:bg-emerald-50"
        >
          ← Retour à la fiche client opérationnelle
        </Link>
      </div>
    </section>
  );
}
`;

write(COMPONENT, componentContent);
ok(`Written: ${path.relative(ROOT, COMPONENT)}`);

const patched = [];
const missing = [];

for (const target of TARGETS) {
  if (!exists(target)) {
    missing.push(path.relative(ROOT, target));
    continue;
  }

  backup(target);

  let content = read(target);
  const before = content;

  if (!content.includes("ERPHubReturnBanner")) {
    const importAnchor = `import { ERPRuntimePage } from "@/components/erp/runtime/ERPRuntimePage";`;

    if (content.includes(importAnchor)) {
      content = content.replace(
        importAnchor,
        `${importAnchor}\nimport { ERPHubReturnBanner } from "@/components/erp/runtime/ERPHubReturnBanner";`
      );
    } else {
      content = content.replace(
        /^/,
        `import { ERPHubReturnBanner } from "@/components/erp/runtime/ERPHubReturnBanner";\n`
      );
    }
  }

  if (!content.includes("<ERPHubReturnBanner />")) {
    // Cas le plus fréquent : page retourne directement ERPRuntimePage.
    content = content.replace(
      /return\s*\(\s*<ERPRuntimePage/,
      "return (\n    <>\n      <ERPHubReturnBanner />\n      <ERPRuntimePage"
    );

    content = content.replace(
      /\n\s*\);\s*$/m,
      "\n    </>\n  );"
    );
  }

  if (content !== before) {
    write(target, content);
    patched.push(path.relative(ROOT, target));
    ok(`Patched: ${path.relative(ROOT, target)}`);
  }
}

const checks = [
  ["component written", exists(COMPONENT)],
  ["generic detail patched or missing", patched.some((item) => item.includes("GenericDetailPage")) || missing.some((item) => item.includes("GenericDetailPage"))],
  ["generic edit patched or missing", patched.some((item) => item.includes("GenericEditPage")) || missing.some((item) => item.includes("GenericEditPage"))],
  ["generic create patched or missing", patched.some((item) => item.includes("GenericCreatePage")) || missing.some((item) => item.includes("GenericCreatePage"))],
];

const failed = checks.filter(([, passed]) => !passed);

if (failed.length > 0) {
  fail(`Checks failed: ${failed.map(([name]) => name).join(", ")}`);
}

const report = [
  "# AMARKHYS-HUB-RETURN-BANNER",
  "",
  "## Objectif",
  "",
  "Afficher un bouton de retour vers la fiche client opérationnelle sur les pages ouvertes depuis le hub via returnTo.",
  "",
  "## Composant ajouté",
  "",
  `- \`${path.relative(ROOT, COMPONENT)}\``,
  "",
  "## Pages patchées",
  "",
  ...patched.map((item) => `- \`${item}\``),
  "",
  "## Pages introuvables",
  "",
  ...(missing.length ? missing.map((item) => `- \`${item}\``) : ["- Aucune"]),
  "",
  "## Fonctionnement",
  "",
  "- Le composant lit returnTo depuis l’URL.",
  "- Il ignore les returnTo non relatifs pour éviter les redirections externes.",
  "- Il affiche un lien vers la fiche client opérationnelle.",
  "- Il conserve clientId, selectedVehicleId, selectedInterventionId et selectedFactureId déjà transportés dans returnTo.",
  "",
  "## Checks",
  "",
  ...checks.map(([name, passed]) => `- ${passed ? "OK" : "FAIL"} — ${name}`),
  "",
].join("\n");

write(REPORT, report);
ok(`Report: ${path.relative(ROOT, REPORT)}`);

console.log("[AMARKHYS-HUB-RETURN-BANNER] DONE");
console.log("[NEXT] pnpm build");