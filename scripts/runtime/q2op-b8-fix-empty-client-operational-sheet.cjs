const fs = require("fs");
const path = require("path");

const root = process.cwd();
const pagePath = "src/app/(private)/clientsauto/hub/page.tsx";
const fullPath = path.join(root, pagePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", pagePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-b8-empty-sheet`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let content = fs.readFileSync(fullPath, "utf8");

/**
 * Fix visible escaped unicode in source, for example:
 * Fiche Client Op\u00e9rationnelle -> Fiche Client Opérationnelle
 */
content = content.replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => {
  return String.fromCharCode(parseInt(code, 16));
});

/**
 * Ensure search box import exists.
 */
if (!content.includes("ClientOperationalSearchBox")) {
  content = content.replace(
    `import { ClientOperationalSheetClient } from "./ClientOperationalSheetClient";`,
    `import { ClientOperationalSheetClient } from "./ClientOperationalSheetClient";
import { ClientOperationalSearchBox } from "@/components/erp/hub/ClientOperationalSearchBox";`
  );
}

/**
 * Replace empty state with a real operational search landing.
 */
const emptyStateRegex = /if \(!clientId\) \{[\s\S]*?\n  \}\n\n  return \(/m;

const nextEmptyState = `if (!clientId) {
    return (
      <main className="min-h-screen bg-slate-100">
        <div className="mx-auto max-w-[2040px] px-8 py-10 xl:px-12 2xl:px-16">
          <section className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Clients / Fiche client
              </p>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 xl:text-4xl">
                FICHE CLIENT OPÉRATIONNELLE
              </h1>

              <p className="mt-3 max-w-5xl text-base leading-7 text-slate-600">
                Vue 360° du client depuis ses véhicules jusqu’aux factures et encaissements.
                Recherchez un client, une voiture, une immatriculation, un téléphone, un email ou un code client.
              </p>
            </div>

            <section className="rounded-[2.25rem] border border-dashed border-slate-300 bg-white p-8 shadow-sm">
              <div className="mx-auto max-w-5xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  Recherche opérationnelle
                </p>

                <h2 className="mt-3 text-2xl font-extrabold text-slate-950">
                  Rechercher un client ou une voiture
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  La fiche client s’affichera automatiquement après sélection.
                  Si vous choisissez une voiture, le client propriétaire sera ouvert avec cette voiture déjà sélectionnée.
                </p>

                <ClientOperationalSearchBox className="mt-8" />
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
              <article className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-2xl">👤</p>
                <h3 className="mt-3 text-base font-extrabold text-slate-950">
                  Recherche client
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Nom, prénom, raison sociale, téléphone, email ou code client.
                </p>
              </article>

              <article className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-2xl">🚗</p>
                <h3 className="mt-3 text-base font-extrabold text-slate-950">
                  Recherche voiture
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Immatriculation, marque, modèle, numéro de châssis ou véhicule lié au client.
                </p>
              </article>

              <article className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-2xl">🧾</p>
                <h3 className="mt-3 text-base font-extrabold text-slate-950">
                  Parcours opérationnel
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Client → véhicules → rendez-vous → interventions → factures → encaissements.
                </p>
              </article>
            </section>
          </section>
        </div>
      </main>
    );
  }

  return (`;

if (!emptyStateRegex.test(content)) {
  console.error("[PATCH_FAILED] Empty client state block not found.");
  process.exit(1);
}

content = content.replace(emptyStateRegex, nextEmptyState);

const required = [
  "FICHE CLIENT OPÉRATIONNELLE",
  "Recherche opérationnelle",
  "ClientOperationalSearchBox",
  "Rechercher un client ou une voiture",
  "La fiche client s’affichera automatiquement après sélection",
];

for (const marker of required) {
  if (!content.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, content, "utf8");

console.log("[WRITTEN]", pagePath);
console.log("[Q2-OP-B8] Empty Client Operational Sheet fixed.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");