import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
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
          id: `client:${id}`,
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
          id: `vehicle:${vehicleId}`,
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
