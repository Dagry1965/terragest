const fs = require("fs");
const path = require("path");

const root = process.cwd();

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, file)}`);
}

const cardFile = path.join(
  root,
  "src",
  "components",
  "erp",
  "relations",
  "ClientVehiclesReadonlyCard.tsx"
);

const formFile = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

write(
  cardFile,
  `"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import {
  vehiculesModule,
} from "@/runtime/modules/generated/vehicules";

type VehicleRecord = {
  id?: string;
  marque?: string;
  modele?: string;
  immatriculation?: string;
  statut?: string;
  kilometrage?: number;
  clientId?: string;
};

interface ClientVehiclesReadonlyCardProps {
  clientId: string;
}

function formatVehicleLabel(
  vehicle: VehicleRecord
): string {
  return [
    vehicle.marque,
    vehicle.modele,
  ]
    .filter(Boolean)
    .join(" ")
    .trim() || "Véhicule";
}

function formatStatus(
  statut?: string
): string {
  const labels: Record<string, string> = {
    actif: "Actif",
    entretien: "Entretien requis",
    immobilise: "Immobilisé",
    archive: "Archivé",
  };

  return labels[statut ?? ""] ?? statut ?? "Non renseigné";
}

export function ClientVehiclesReadonlyCard({
  clientId,
}: ClientVehiclesReadonlyCardProps) {
  const [vehicles, setVehicles] =
    useState<VehicleRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadVehicles() {
      try {
        setLoading(true);

        const rows =
          await RuntimeDataBinding.list(
            vehiculesModule
          );

        const linkedVehicles =
          rows.filter((row: Record<string, unknown>) =>
            String(row.clientId ?? "") === String(clientId)
          ) as VehicleRecord[];

        if (mounted) {
          setVehicles(linkedVehicles);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (clientId) {
      loadVehicles();
    }

    return () => {
      mounted = false;
    };
  }, [clientId]);

  const title =
    useMemo(
      () =>
        vehicles.length > 1
          ? vehicles.length + " véhicules liés"
          : vehicles.length === 1
            ? "1 véhicule lié"
            : "Aucun véhicule lié",
      [vehicles.length]
    );

  return (
    <section className="rounded-3xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-blue-700">
            Relation en lecture seule
          </p>

          <h3 className="mt-1 text-xl font-black text-slate-950">
            Véhicules du client
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Source de vérité : le champ Client dans chaque fiche véhicule.
            Cette section affiche les véhicules liés sans modifier la relation.
          </p>
        </div>

        <span className="rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-black text-blue-700">
          {title}
        </span>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="rounded-2xl border border-blue-100 bg-white p-4 text-sm text-slate-500">
            Chargement des véhicules...
          </div>
        ) : vehicles.length === 0 ? (
          <div className="rounded-2xl border border-blue-100 bg-white p-4 text-sm text-slate-500">
            Aucun véhicule n’est actuellement rattaché à ce client.
          </div>
        ) : (
          <div className="grid gap-3">
            {vehicles.map((vehicle, index) => {
              const id =
                String(vehicle.id ?? "");

              return (
                <article
                  key={id || index}
                  className="rounded-2xl border border-blue-100 bg-white p-4"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-base font-black text-slate-950">
                        {formatVehicleLabel(vehicle)}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                        <span className="rounded-full bg-slate-100 px-3 py-1">
                          {vehicle.immatriculation || "Immatriculation non renseignée"}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1">
                          {formatStatus(vehicle.statut)}
                        </span>

                        {vehicle.kilometrage !== undefined ? (
                          <span className="rounded-full bg-slate-100 px-3 py-1">
                            {Number(vehicle.kilometrage).toLocaleString("fr-FR")} km
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {id ? (
                      <Link
                        href={\`/vehicules/\${id}/edit\`}
                        className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-slate-800"
                      >
                        Ouvrir véhicule
                      </Link>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
`
);

if (!fs.existsSync(formFile)) {
  console.error(`MISSING ${formFile}`);
  process.exit(1);
}

let form = read(formFile);

if (!form.includes("ClientVehiclesReadonlyCard")) {
  form = form.replace(
    `import {
  InvoicePaymentSchedule,
} from "@/components/erp/billing/InvoicePaymentSchedule";`,
    `import {
  InvoicePaymentSchedule,
} from "@/components/erp/billing/InvoicePaymentSchedule";

import {
  ClientVehiclesReadonlyCard,
} from "@/components/erp/relations/ClientVehiclesReadonlyCard";`
  );
}

if (!form.includes("data-client-vehicles-readonly-card")) {
  form = form.replace(
    `          <div className="flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">`,
    `          {mode === "edit" &&
          module.metadata.key === "clientsauto" &&
          Boolean(initialData?.id) ? (
            <div data-client-vehicles-readonly-card>
              <ClientVehiclesReadonlyCard
                clientId={String(initialData.id)}
              />
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">`
  );
}

form = form
  .replaceAll("CrÃ©ation", "Création")
  .replaceAll("connectÃ©", "connecté")
  .replaceAll("mÃ©tier", "métier")
  .replaceAll("exÃ©cutent", "exécutent")
  .replaceAll("Associe cet Ã©lÃ©ment", "Associe cet élément")
  .replaceAll("Validation mÃ©tier", "Validation métier")
  .replaceAll("â€¢", "•");

write(formFile, form);

console.log("DONE install client vehicles readonly card");