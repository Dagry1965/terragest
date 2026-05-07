Write-Host "=== TERRAGEST_V2 - SETUP GENERIC LIST PAGE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/components/erp/generic" | Out-Null

New-Item -ItemType Directory -Force "src/app/(private)/exploitations" | Out-Null
New-Item -ItemType Directory -Force "src/app/(private)/terrains" | Out-Null
New-Item -ItemType Directory -Force "src/app/(private)/materiels" | Out-Null

@'
import { getSchema } from "@/core/schemas/schema-registry";
import { getModuleByKey } from "@/core/modules/module-registry";

type Props = {
  moduleKey: string;
};

const mockRows: Record<string, any[]> = {
  exploitations: [
    {
      nom: "Exploitation Nord",
      type: "Agricole",
      responsable: "Jean Dupont",
      surface: 120,
      status: "active",
    },

    {
      nom: "Ferme Centrale",
      type: "Élevage",
      responsable: "Marie Koffi",
      surface: 85,
      status: "warning",
    },
  ],

  terrains: [
    {
      nom: "Terrain A1",
      localisation: "Bouaké",
      surface: 40,
      status: "disponible",
    },

    {
      nom: "Terrain B2",
      localisation: "Yamoussoukro",
      surface: 65,
      status: "maintenance",
    },
  ],

  materiels: [
    {
      nom: "Tracteur MF-240",
      categorie: "Tracteur",
      etat: "operationnel",
      cout: 15000000,
    },

    {
      nom: "Pompe PX-90",
      categorie: "Pompe",
      etat: "panne",
      cout: 250000,
    },
  ],
};

function getStatusColor(color?: string) {
  switch (color) {
    case "green":
      return "bg-emerald-100 text-emerald-700";

    case "yellow":
      return "bg-amber-100 text-amber-700";

    case "red":
      return "bg-red-100 text-red-700";

    case "blue":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function GenericListPage({
  moduleKey,
}: Props) {
  const schema = getSchema(moduleKey);

  const module = getModuleByKey(moduleKey);

  if (!schema || !module) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        Module ERP introuvable : {moduleKey}
      </div>
    );
  }

  const fields = schema.fields.filter(
    (field) => field.list
  );

  const rows = mockRows[moduleKey] || [];

  return (
    <div className="space-y-6">
      <section className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            {schema.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {schema.description}
          </p>
        </div>

        <button
          className="
            rounded-xl
            bg-slate-900
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-slate-700
          "
        >
          Nouveau
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Module ERP
          </div>

          <div className="mt-2 text-2xl font-bold text-slate-950">
            {module.pluralLabel}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Workflow
          </div>

          <div className="mt-2 text-2xl font-bold text-slate-950">
            {module.features?.workflow ? "Actif" : "Inactif"}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Audit
          </div>

          <div className="mt-2 text-2xl font-bold text-slate-950">
            {module.features?.audit ? "Activé" : "Désactivé"}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                {fields.map((field) => (
                  <th
                    key={field.key}
                    className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-slate-500
                    "
                  >
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50"
                >
                  {fields.map((field) => {
                    const value = row[field.key];

                    if (
                      field.type === "status"
                    ) {
                      const status =
                        schema.statuses?.find(
                          (s) => s.value === value
                        );

                      return (
                        <td
                          key={field.key}
                          className="px-6 py-4"
                        >
                          <span
                            className={[
                              "rounded-full px-3 py-1 text-xs font-medium",
                              getStatusColor(
                                status?.color
                              ),
                            ].join(" ")}
                          >
                            {status?.label || value}
                          </span>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={field.key}
                        className="
                          px-6
                          py-4
                          text-sm
                          text-slate-700
                        "
                      >
                        {value?.toString()}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
'@ | Set-Content -Encoding UTF8 "src/components/erp/generic/GenericListPage.tsx"

@'
import { GenericListPage } from "@/components/erp/generic/GenericListPage";

export default function ExploitationsPage() {
  return (
    <GenericListPage moduleKey="exploitations" />
  );
}
'@ | Set-Content -Encoding UTF8 "src/app/(private)/exploitations/page.tsx"

@'
import { GenericListPage } from "@/components/erp/generic/GenericListPage";

export default function TerrainsPage() {
  return (
    <GenericListPage moduleKey="terrains" />
  );
}
'@ | Set-Content -Encoding UTF8 "src/app/(private)/terrains/page.tsx"

@'
import { GenericListPage } from "@/components/erp/generic/GenericListPage";

export default function MaterielsPage() {
  return (
    <GenericListPage moduleKey="materiels" />
  );
}
'@ | Set-Content -Encoding UTF8 "src/app/(private)/materiels/page.tsx"

Write-Host "=== GENERIC LIST PAGE créée avec succès ===" -ForegroundColor Green