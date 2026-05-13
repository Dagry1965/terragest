import type {
  ERPBusinessDashboardMetrics,
}
from "./ERPDashboardMetrics";

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

function getModule(moduleKey: string): ERPModule | null {

  return (
    allERPModules.find(
      (module) =>
        module.metadata.key === moduleKey
    ) ?? null
  );
}

async function listModule(moduleKey: string): Promise<any[]> {

  const module =
    getModule(moduleKey);

  if (!module) {
    console.warn(
      "[ERPBusinessMetricsEngine] Module introuvable:",
      moduleKey
    );

    return [];
  }

  return RuntimeDataBinding.list(module);
}

export class ERPBusinessMetricsEngine {

  static async load():
    Promise<ERPBusinessDashboardMetrics> {

    const terrains =
      await listModule("terrains");

    const exploitations =
      await listModule("exploitations");

    const contrats =
      await listModule("contrats");

    const campagnes =
      await listModule("campagnes");

    const stocks =
      await listModule("stocks");

    const actifs =
      await listModule("actifs");

    const contratsActifs =
      contrats.filter(
        (c: any) =>
          c.statutContrat === "Actif"
      );

    const campagnesActives =
      campagnes.filter(
        (c: any) =>
          c.statutCampagne === "En cours"
      );

    const stocksBas =
      stocks.filter(
        (s: any) =>
          s.statutStock === "Bas"
      );

    const actifsMaintenance =
      actifs.filter(
        (a: any) =>
          a.statutActif === "Maintenance"
      );

    return {
      terrains: terrains.length,
      exploitations: exploitations.length,
      contratsActifs: contratsActifs.length,
      campagnesActives: campagnesActives.length,
      stocksBas: stocksBas.length,
      actifsMaintenance: actifsMaintenance.length,
    };
  }
}