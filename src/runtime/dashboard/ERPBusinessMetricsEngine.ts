import type {
  ERPBusinessDashboardMetrics,
} from "./ERPDashboardMetrics";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import {
  RuntimeMetrics,
} from "@/runtime/metrics/RuntimeMetrics";

import {
  allERPModules,
} from "@/runtime/modules/definitions/coreModules";

import type {
  ERPModule,
} from "@/runtime/modules";

type RuntimeRecord = Record<string, unknown>;

function getModule(
  moduleKey: string
): ERPModule | null {
  return (
    allERPModules.find(
      (module) => module.metadata.key === moduleKey
    ) ?? null
  );
}

async function listModule(
  moduleKey: string
): Promise<RuntimeRecord[]> {
  const module = getModule(moduleKey);

  if (!module) {
    return [];
  }

  return RuntimeDataBinding.list(module);
}

function valueOf(
  record: RuntimeRecord,
  key: string
): string {
  return String(record[key] ?? "").trim();
}

function countByStatus(
  records: RuntimeRecord[],
  expectedStatus: string
): number {
  return records.filter(
    (record) => valueOf(record, "statut") === expectedStatus
  ).length;
}

function sumFields(
  records: RuntimeRecord[],
  keys: string[]
): number {
  return records.reduce((total, record) => {
    for (const key of keys) {
      const value = Number(record[key] ?? 0);

      if (!Number.isNaN(value) && value > 0) {
        return total + value;
      }
    }

    return total;
  }, 0);
}

export class ERPBusinessMetricsEngine {
  static async load(
    workspace = "agri"
  ): Promise<ERPBusinessDashboardMetrics> {
    if (workspace === "amarkhys") {
      const clients =
        await listModule("clientsauto");

      const vehicules =
        await listModule("vehicules");

      const rdv =
        await listModule("rendezvous");

      const interventions =
        await listModule("interventionsauto");

      const factures =
        await listModule("facturesauto");

      const rappels =
        await listModule("rappelsauto");

      const rdvPlanifies =
        countByStatus(rdv, "planifie");

      const rdvConfirmes =
        countByStatus(rdv, "confirme");

      const rdvAnnules =
        countByStatus(rdv, "annule");

      const interventionsEnCours =
        countByStatus(interventions, "en_cours");

      const interventionsTerminees =
        countByStatus(interventions, "termine");

      const facturesCreees =
        factures.length;

      const facturesPayeesFromData =
        countByStatus(factures, "payee");

      const facturesPaidFromMetrics =
        RuntimeMetrics.count(
          "amarkhys.factures.paid",
          { workspace: "amarkhys" }
        );

      const facturesPayees =
        Math.max(
          facturesPayeesFromData,
          facturesPaidFromMetrics
        );

      const chiffreAffairesFromData =
        sumFields(
          factures,
          [
            "montantTTC",
            "totalTTC",
            "montantTotal",
            "total",
          ]
        );

      const chiffreAffairesFromMetrics =
        RuntimeMetrics.aggregateSum(
          "amarkhys.revenue.real",
          { workspace: "amarkhys" }
        );

      const chiffreAffaires =
        Math.max(
          chiffreAffairesFromData,
          chiffreAffairesFromMetrics
        );

      const caPrevisionnel =
        RuntimeMetrics.aggregateSum(
          "amarkhys.revenue.predicted",
          { workspace: "amarkhys" }
        );

      const rappelsActifs =
        rappels.filter((rappel) => {
          const statut = valueOf(rappel, "statut");

          return (
            statut === "" ||
            statut === "actif" ||
            statut === "planifie" ||
            statut === "a_envoyer"
          );
        }).length;

      return {
        workspace: "amarkhys",

        metrics: [
          {
            key: "clients",
            label: "Clients",
            value: clients.length,
            href: "/clientsauto",
          },
          {
            key: "vehicules",
            label: "Véhicules",
            value: vehicules.length,
            href: "/vehicules",
          },
          {
            key: "rdvPlanifies",
            label: "RDV planifiés",
            value: rdvPlanifies,
            href: "/rendezvous",
          },
          {
            key: "rdvConfirmes",
            label: "RDV confirmés",
            value: rdvConfirmes,
            href: "/rendezvous",
          },
          {
            key: "rdvAnnules",
            label: "RDV annulés",
            value: rdvAnnules,
            href: "/rendezvous",
          },
          {
            key: "interventionsEnCours",
            label: "Interventions en cours",
            value: interventionsEnCours,
            href: "/interventionsauto",
          },
          {
            key: "interventionsTerminees",
            label: "Interventions terminées",
            value: interventionsTerminees,
            href: "/interventionsauto",
          },
          {
            key: "facturesCreees",
            label: "Factures créées",
            value: facturesCreees,
            href: "/facturesauto",
          },
          {
            key: "facturesPayees",
            label: "Factures payées",
            value: facturesPayees,
            href: "/facturesauto",
          },
          {
            key: "chiffreAffaires",
            label: "Chiffre d'affaires",
            value: chiffreAffaires,
            href: "/facturesauto",
          },
          {
            key: "caPrevisionnel",
            label: "CA prévisionnel",
            value: caPrevisionnel,
            href: "/facturesauto",
          },
          {
            key: "rappelsActifs",
            label: "Rappels actifs",
            value: rappelsActifs,
            href: "/rappelsauto",
          },
        ],
      };
    }

    const terrains =
      await listModule("terrains");

    const exploitations =
      await listModule("exploitations");

    return {
      workspace: "agri",

      metrics: [
        {
          key: "terrains",
          label: "Terrains",
          value: terrains.length,
          href: "/terrains",
        },
        {
          key: "exploitations",
          label: "Exploitations",
          value: exploitations.length,
          href: "/exploitations",
        },
      ],
    };
  }
}