import type {
  ERPBusinessAlert,
}
from "./ERPBusinessAlerts";

import { RuntimeDataBinding }
from "@/runtime/data-binding";

import {
  allERPModules,
}
from "@/runtime/modules/definitions/coreModules";

import type {
  ERPModule,
}
from "@/runtime/modules";

function getModule(
  moduleKey: string
): ERPModule | null {

  return (
    allERPModules.find(
      (module) =>
        module.metadata.key === moduleKey
    ) ?? null
  );
}

async function listModule(
  moduleKey: string
): Promise<any[]> {

  const module =
    getModule(moduleKey);

  if (!module) {
    return [];
  }

  return RuntimeDataBinding.list(module);
}

function daysBetween(
  date: Date
): number {

  const now =
    new Date();

  const diff =
    date.getTime() - now.getTime();

  return Math.ceil(
    diff / (1000 * 60 * 60 * 24)
  );
}

export class ERPBusinessAlertEngine {

  static async load():
    Promise<ERPBusinessAlert[]> {

    const alerts:
      ERPBusinessAlert[] = [];

    const contrats =
      await listModule("contrats");

    const stocks =
      await listModule("stocks");

    const actifs =
      await listModule("actifs");

    const campagnes =
      await listModule("campagnes");

    for (const contrat of contrats) {

      if (
        !contrat.dateFin
      ) {
        continue;
      }

      const days =
        daysBetween(
          new Date(
            contrat.dateFin
          )
        );

      if (
        days <= 30 &&
        contrat.statutContrat === "Actif"
      ) {

        alerts.push({
          id:
            "contrat-" +
            contrat.id,

          level:
            days <= 7
              ? "critical"
              : "warning",

          title:
            "Contrat proche expiration",

          message:
            contrat.nom ??
            contrat.code ??
            "Contrat" +
            " expire dans " +
            days +
            " jours.",

          entityType:
            "contrats",

          entityId:
            contrat.id,
        });
      }
    }

    for (const stock of stocks) {

      if (
        stock.statutStock === "Bas"
      ) {

        alerts.push({
          id:
            "stock-" +
            stock.id,

          level:
            "warning",

          title:
            "Stock critique",

          message:
            stock.nom ??
            "Stock sous seuil minimum.",

          entityType:
            "stocks",

          entityId:
            stock.id,
        });
      }
    }

    for (const actif of actifs) {

      if (
        actif.statutActif ===
        "Maintenance"
      ) {

        alerts.push({
          id:
            "actif-" +
            actif.id,

          level:
            "warning",

          title:
            "Actif maintenance",

          message:
            actif.nom ??
            "Actif en maintenance.",

          entityType:
            "actifs",

          entityId:
            actif.id,
        });
      }
    }

    for (const campagne of campagnes) {

      if (
        campagne.statutCampagne ===
        "Suspendue"
      ) {

        alerts.push({
          id:
            "campagne-" +
            campagne.id,

          level:
            "critical",

          title:
            "Campagne suspendue",

          message:
            campagne.nom ??
            "Campagne suspendue.",

          entityType:
            "campagnes",

          entityId:
            campagne.id,
        });
      }
    }

    return alerts;
  }
}