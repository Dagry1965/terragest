const fs = require("fs");
const path = require("path");

const root = process.cwd();

function full(relativePath) {
  return path.join(root, relativePath);
}

function ensureDir(relativePath) {
  fs.mkdirSync(full(relativePath), { recursive: true });
}

function write(relativePath, content) {
  ensureDir(path.dirname(relativePath));
  fs.writeFileSync(full(relativePath), content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

function backup(relativePath, suffix) {
  const source = full(relativePath);
  if (!fs.existsSync(source)) return;

  const target = `${source}.${suffix}`;
  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", path.relative(root, target));
  }
}

const searchLoaderPath = "src/runtime/hub/RuntimeClientOperationalSearchLoader.ts";
const searchBoxPath = "src/components/erp/hub/ClientOperationalSearchBox.tsx";
const pagePath = "src/app/(private)/clientsauto/hub/page.tsx";
const sheetPath = "src/components/erp/hub/ERPClientOperationalSheet.tsx";

backup(pagePath, "bak-q2op-b6-search");
backup(sheetPath, "bak-q2op-b6-search");

const searchLoader = `import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { clientsautoModule } from "@/runtime/modules/generated/clientsauto/clientsauto.module";
import { vehiculesModule } from "@/runtime/modules/generated/vehicules/vehicules.module";
import type { ERPRecordHubRecord } from "./RuntimeHubTypes";

export type ClientOperationalSearchItem = {
  id: string;
  type: "client" | "vehicle";
  label: string;
  subtitle: string;
  clientId: string;
  vehicleId?: string;
  searchableText: string;
};

function normalizeRecords(records: unknown): ERPRecordHubRecord[] {
  if (!Array.isArray(records)) {
    return [];
  }

  return records.filter((record): record is ERPRecordHubRecord => {
    return !!record && typeof record === "object";
  });
}

async function safeList(module: unknown): Promise<ERPRecordHubRecord[]> {
  try {
    return normalizeRecords(await RuntimeDataBinding.list(module as never));
  } catch (error) {
    console.warn("[RuntimeClientOperationalSearchLoader] list failed", error);
    return [];
  }
}

function readFirstString(record: ERPRecordHubRecord, fields: string[]): string {
  for (const field of fields) {
    const value = record[field];

    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return "";
}

function recordId(record: ERPRecordHubRecord): string {
  return String(record.id ?? "");
}

function buildClientLabel(client: ERPRecordHubRecord): string {
  const company = readFirstString(client, ["raisonSociale", "societe", "société"]);

  if (company) {
    return company;
  }

  const firstName = readFirstString(client, ["prenom", "prénom"]);
  const lastName = readFirstString(client, ["nom"]);
  const fullName = [lastName, firstName].filter(Boolean).join(" ").trim();

  return (
    fullName ||
    readFirstString(client, ["displayLabel", "label", "codeClient", "code"]) ||
    "Client"
  );
}

function buildVehicleLabel(vehicle: ERPRecordHubRecord): string {
  const immatriculation = readFirstString(vehicle, ["immatriculation"]);
  const brand = readFirstString(vehicle, ["marque"]);
  const model = readFirstString(vehicle, ["modele", "modèle"]);

  return [immatriculation, brand, model].filter(Boolean).join(" · ") || "Véhicule";
}

function buildSearchText(parts: Array<string | undefined>): string {
  return parts
    .filter((part): part is string => typeof part === "string" && part.trim().length > 0)
    .join(" ")
    .toLowerCase();
}

function clientRelationId(vehicle: ERPRecordHubRecord): string {
  return readFirstString(vehicle, [
    "clientId",
    "proprietaireId",
    "propriétaireId",
    "ownerId",
  ]);
}

export class RuntimeClientOperationalSearchLoader {
  static async load(): Promise<ClientOperationalSearchItem[]> {
    const [clients, vehicles] = await Promise.all([
      safeList(clientsautoModule),
      safeList(vehiculesModule),
    ]);

    const clientsById = new Map<string, ERPRecordHubRecord>();

    for (const client of clients) {
      const id = recordId(client);

      if (id) {
        clientsById.set(id, client);
      }
    }

    const clientItems: ClientOperationalSearchItem[] = clients
      .map((client) => {
        const id = recordId(client);
        const label = buildClientLabel(client);

        const subtitle = [
          readFirstString(client, ["codeClient", "code"]),
          readFirstString(client, ["telephone", "téléphone"]),
          readFirstString(client, ["email"]),
          readFirstString(client, ["typeClient", "categorieClient", "type"]),
        ]
          .filter(Boolean)
          .join(" · ");

        return {
          id: \`client:\${id}\`,
          type: "client" as const,
          label,
          subtitle,
          clientId: id,
          searchableText: buildSearchText([
            label,
            subtitle,
            readFirstString(client, ["nom"]),
            readFirstString(client, ["prenom", "prénom"]),
            readFirstString(client, ["raisonSociale"]),
            readFirstString(client, ["telephone", "téléphone"]),
            readFirstString(client, ["email"]),
            readFirstString(client, ["codeClient", "code"]),
          ]),
        };
      })
      .filter((item) => item.clientId.length > 0);

    const vehicleItems: ClientOperationalSearchItem[] = vehicles
      .map((vehicle) => {
        const vehicleId = recordId(vehicle);
        const clientId = clientRelationId(vehicle);
        const client = clientsById.get(clientId) ?? null;

        const vehicleLabel = buildVehicleLabel(vehicle);
        const clientLabel = client ? buildClientLabel(client) : "";

        const subtitle = [
          clientLabel,
          readFirstString(vehicle, ["statut"]),
          readFirstString(vehicle, ["annee", "année"]),
          readFirstString(vehicle, ["carburant"]),
        ]
          .filter(Boolean)
          .join(" · ");

        return {
          id: \`vehicle:\${vehicleId}\`,
          type: "vehicle" as const,
          label: vehicleLabel,
          subtitle,
          clientId,
          vehicleId,
          searchableText: buildSearchText([
            vehicleLabel,
            subtitle,
            clientLabel,
            readFirstString(vehicle, ["immatriculation"]),
            readFirstString(vehicle, ["marque"]),
            readFirstString(vehicle, ["modele", "modèle"]),
            readFirstString(vehicle, ["vin", "numeroChassis"]),
          ]),
        };
      })
      .filter((item) => item.clientId.length > 0 && item.vehicleId);

    return [...clientItems, ...vehicleItems];
  }
}
`;

const searchBox = `"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RuntimeClientOperationalSearchLoader,
  type ClientOperationalSearchItem,
} from "@/runtime/hub/RuntimeClientOperationalSearchLoader";

type ClientOperationalSearchBoxProps = {
  className?: string;
};

function resultHref(item: ClientOperationalSearchItem): string {
  const params = new URLSearchParams();
  params.set("clientId", item.clientId);

  if (item.vehicleId) {
    params.set("selectedVehicleId", item.vehicleId);
  }

  return \`/clientsauto/hub?\${params.toString()}\`;
}

export function ClientOperationalSearchBox({
  className = "",
}: ClientOperationalSearchBoxProps) {
  const router = useRouter();

  const [items, setItems] = useState<ClientOperationalSearchItem[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      setIsLoading(true);

      try {
        const result = await RuntimeClientOperationalSearchLoader.load();

        if (!active) return;

        setItems(result);
      } catch (error) {
        console.error("[ClientOperationalSearchBox] load failed", error);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return items.slice(0, 8);
    }

    return items
      .filter((item) => item.searchableText.includes(normalized))
      .slice(0, 10);
  }, [items, query]);

  function openItem(item: ClientOperationalSearchItem) {
    setIsOpen(false);
    setQuery("");
    router.push(resultHref(item));
  }

  return (
    <div className={["relative", className].filter(Boolean).join(" ")}>
      <div className="flex items-center gap-3 rounded-[1.5rem] bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200">
        <span className="text-lg">🔎</span>
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Rechercher un client, une voiture, une immatriculation, un téléphone..."
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
        />
        {isLoading ? (
          <span className="text-xs font-semibold text-slate-400">Chargement...</span>
        ) : (
          <span className="text-xs font-semibold text-slate-400">
            {items.length} résultat(s)
          </span>
        )}
      </div>

      {isOpen ? (
        <div className="absolute left-0 right-0 z-30 mt-3 overflow-hidden rounded-[1.5rem] bg-white shadow-xl ring-1 ring-slate-200">
          {filteredItems.length > 0 ? (
            <div className="max-h-[420px] overflow-auto p-2">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    openItem(item);
                  }}
                  className="flex w-full items-start gap-3 rounded-[1.25rem] px-4 py-3 text-left hover:bg-emerald-50"
                >
                  <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-lg">
                    {item.type === "client" ? "👤" : "🚗"}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-extrabold text-slate-950">
                      {item.label}
                    </span>
                    <span className="mt-1 block truncate text-xs text-slate-500">
                      {item.type === "client" ? "Client" : "Véhicule"} · {item.subtitle || "Aucun détail"}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-5 text-sm text-slate-500">
              Aucun client ou véhicule trouvé.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
`;

write(searchLoaderPath, searchLoader);
write(searchBoxPath, searchBox);

/**
 * Patch page no-client state.
 */
let page = fs.readFileSync(full(pagePath), "utf8");

if (!page.includes("ClientOperationalSearchBox")) {
  page = page.replace(
    `import { ClientOperationalSheetClient } from "./ClientOperationalSheetClient";`,
    `import { ClientOperationalSheetClient } from "./ClientOperationalSheetClient";
import { ClientOperationalSearchBox } from "@/components/erp/hub/ClientOperationalSearchBox";`
  );
}

if (!page.includes("<ClientOperationalSearchBox")) {
  page = page.replace(
    `<p className="mt-2 max-w-3xl text-sm text-slate-500">
            {"S\\u00e9lectionnez un client pour afficher la vue 360\\u00b0 depuis ses v\\u00e9hicules jusqu\\u2019aux factures et encaissements."}
          </p>`,
    `<p className="mt-2 max-w-3xl text-sm text-slate-500">
            {"S\\u00e9lectionnez un client pour afficher la vue 360\\u00b0 depuis ses v\\u00e9hicules jusqu\\u2019aux factures et encaissements."}
          </p>

          <ClientOperationalSearchBox className="mt-8 max-w-4xl" />`
  );
}

write(pagePath, page);

/**
 * Patch sheet top section.
 */
let sheet = fs.readFileSync(full(sheetPath), "utf8");

if (!sheet.includes("ClientOperationalSearchBox")) {
  sheet = sheet.replace(
    `import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";`,
    `import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";
import { ClientOperationalSearchBox } from "./ClientOperationalSearchBox";`
  );
}

if (!sheet.includes('className="mt-6 max-w-5xl"')) {
  sheet = sheet.replace(
    `<p className="mt-3 max-w-5xl text-base leading-7 text-slate-600">
              Vue 360° du client depuis ses véhicules jusqu’aux factures et encaissements.
              Une interface adaptative selon le type de client (Particulier, Flotte, Entreprise).
            </p>`,
    `<p className="mt-3 max-w-5xl text-base leading-7 text-slate-600">
              Vue 360° du client depuis ses véhicules jusqu’aux factures et encaissements.
              Une interface adaptative selon le type de client (Particulier, Flotte, Entreprise).
            </p>

            <ClientOperationalSearchBox className="mt-6 max-w-5xl" />`
  );
}

write(sheetPath, sheet);

const required = [
  "RuntimeClientOperationalSearchLoader",
  "ClientOperationalSearchBox",
  "selectedVehicleId",
  "immatriculation",
  "telephone",
  "clientId",
];

for (const marker of required) {
  const scope = searchLoader + searchBox + page + sheet;
  if (!scope.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

console.log("[Q2-OP-B6] Client + vehicle operational search installed.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");