import {
  PublicRuntimeServerReadRepository,
} from "@/runtime/public-read";

import {
  produitsautoModule,
} from "@/runtime/modules/generated/produitsauto/produitsauto.module";

import type {
  PublicServiceCatalogItem,
  PublicServicesCatalogResult,
} from "./PublicServicesCatalogTypes";

type RuntimeRecord =
  Record<string, unknown>;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown, fallback = 0): number {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

function asBoolean(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return ["true", "1", "oui", "yes", "actif"].includes(
      value.trim().toLowerCase()
    );
  }

  return false;
}

function normalizeCode(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function isPublicServiceRecord(record: RuntimeRecord): boolean {
  const typeArticle =
    asString(record.typeArticle) ||
    asString(record.typeProduit) ||
    asString(record.typeLigne) ||
    asString(record.categorie);

  const isServiceLike =
    [
      "service",
      "prestation",
      "main_oeuvre",
      "main-d-oeuvre",
      "forfait",
    ].includes(
      typeArticle
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    );

  const publicFlag =
    asBoolean(record.actifPublic) ||
    asBoolean(record.publicVisible) ||
    asBoolean(record.publicEnabled) ||
    asBoolean(record.isPublic);

  return isServiceLike && publicFlag;
}

function toPublicService(record: RuntimeRecord): PublicServiceCatalogItem {
  const label =
    asString(record.nom) ||
    asString(record.label) ||
    asString(record.designation) ||
    asString(record.libelle) ||
    "Service atelier";

  const code =
    asString(record.code) ||
    asString(record.reference) ||
    normalizeCode(label);

  return {
    id:
      asString(record.id) ||
      code,
    code,
    label,
    category:
      asString(record.categorie) ||
      asString(record.sousCategorie) ||
      undefined,
    description:
      asString(record.descriptionPublic) ||
      asString(record.description) ||
      undefined,
    durationMinutes:
      asNumber(
        record.dureeStandardMinutes ??
          record.durationMinutes ??
          record.dureeMinutes,
        60
      ),
    price:
      asNumber(
        record.prixReference ??
          record.prixVente ??
          record.prixTTC,
        0
      ) || undefined,
    order:
      asNumber(record.ordrePublic, 999),
  };
}

function fallbackServices(): PublicServiceCatalogItem[] {
  return [
    {
      id: "diagnostic",
      code: "diagnostic",
      label: "Diagnostic",
      category: "Diagnostic",
      description: "Contrôle et identification du besoin avant intervention.",
      durationMinutes: 60,
      order: 10,
    },
    {
      id: "vidange",
      code: "vidange",
      label: "Vidange",
      category: "Entretien",
      description: "Vidange moteur et vérifications courantes.",
      durationMinutes: 60,
      order: 20,
    },
    {
      id: "freinage",
      code: "freinage",
      label: "Freinage",
      category: "Sécurité",
      description: "Contrôle ou intervention sur le système de freinage.",
      durationMinutes: 75,
      order: 30,
    },
    {
      id: "climatisation",
      code: "climatisation",
      label: "Climatisation",
      category: "Confort",
      description: "Diagnostic ou entretien du système de climatisation.",
      durationMinutes: 60,
      order: 40,
    },
  ];
}

export class PublicServicesCatalogService {
  static async listPublicServices(): Promise<PublicServicesCatalogResult> {
    const records =
      await PublicRuntimeServerReadRepository.findMany(
        produitsautoModule
      );

    const services =
      records
        .filter(isPublicServiceRecord)
        .map(toPublicService)
        .sort((a, b) =>
          a.order - b.order ||
          a.label.localeCompare(b.label)
        );

    return {
      ok: true,
      services:
        services.length > 0
          ? services
          : fallbackServices(),
    };
  }
}
