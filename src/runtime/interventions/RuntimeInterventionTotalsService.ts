import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import type { ERPModule } from "@/runtime/modules/ERPModule";

type RuntimeRecord = Record<string, unknown>;

interface SyncInterventionTotalsParams {
  interventionId: string;
}

interface InterventionTotals {
  coutPieces: number;
  coutMainOeuvre: number;
  coutTotal: number;
  montantHT: number;
  montantTVA: number;
  montantTTC: number;
}

function getModule(moduleKey: string): ERPModule | undefined {
  return allERPModules.find(
    (module) => module.metadata.key === moduleKey
  );
}

function asNumber(value: unknown): number {
  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }

  if (typeof value === "string") {
    const parsed =
      Number(
        value
          .replace(",", ".")
          .trim()
      );

    return Number.isFinite(parsed)
      ? parsed
      : 0;
  }

  return 0;
}

function asText(value: unknown): string {
  return String(value ?? "").trim();
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function isCountableLine(line: RuntimeRecord): boolean {
  // Q20H5D_VALIDATED_LINES_ONLY
  // Une ligne est comptabilisée uniquement lorsqu'elle est validée
  // et qu'elle n'a pas été retirée techniquement.
  return (
    asText(line.statut) === "validee" &&
    !line.removedAt
  );
}

function getLineHT(line: RuntimeRecord): number {
  const montantHT =
    asNumber(line.montantHT);

  if (montantHT !== 0) {
    return montantHT;
  }

  const montantTotal =
    asNumber(line.montantTotal);

  if (montantTotal !== 0) {
    return montantTotal;
  }

  return asNumber(line.quantite) * asNumber(line.prixUnitaire);
}

function getLineTVA(line: RuntimeRecord, montantHT: number): number {
  const montantTVA =
    asNumber(line.montantTVA);

  if (montantTVA !== 0) {
    return montantTVA;
  }

  const tauxTVA =
    asNumber(line.tauxTVA);

  if (tauxTVA <= 0) {
    return 0;
  }

  return montantHT * tauxTVA / 100;
}

function getLineTTC(
  line: RuntimeRecord,
  montantHT: number,
  montantTVA: number
): number {
  const montantTTC =
    asNumber(line.montantTTC);

  if (montantTTC !== 0) {
    return montantTTC;
  }

  return montantHT + montantTVA;
}

function computeTotals(lines: RuntimeRecord[]): InterventionTotals {
  return lines.reduce<InterventionTotals>(
    (totals, line) => {
      if (!isCountableLine(line)) {
        return totals;
      }

      const typeLigne =
        asText(line.typeLigne || line.typeArticle);

      const rawHT =
        getLineHT(line);

      const rawTVA =
        getLineTVA(line, rawHT);

      const rawTTC =
        getLineTTC(
          line,
          rawHT,
          rawTVA
        );

      const isDiscount =
        typeLigne === "remise";

      const montantHT =
        isDiscount
          ? -Math.abs(rawHT)
          : rawHT;

      const montantTVA =
        isDiscount
          ? -Math.abs(rawTVA)
          : rawTVA;

      const montantTTC =
        isDiscount
          ? -Math.abs(rawTTC)
          : rawTTC;

      if (typeLigne === "piece") {
        totals.coutPieces += montantHT;
      } else if (
        typeLigne === "main_oeuvre" ||
        typeLigne === "service"
      ) {
        totals.coutMainOeuvre += montantHT;
      }

      totals.montantHT += montantHT;
      totals.montantTVA += montantTVA;
      totals.montantTTC += montantTTC;

      // Compatibilité historique AMARKHYS : coutTotal reste le total HT métier.
      totals.coutTotal += montantHT;

      return totals;
    },
    {
      coutPieces: 0,
      coutMainOeuvre: 0,
      coutTotal: 0,
      montantHT: 0,
      montantTVA: 0,
      montantTTC: 0,
    }
  );
}

function roundTotals(
  totals: InterventionTotals
): InterventionTotals {
  return {
    coutPieces: roundMoney(totals.coutPieces),
    coutMainOeuvre: roundMoney(totals.coutMainOeuvre),
    coutTotal: roundMoney(totals.coutTotal),
    montantHT: roundMoney(totals.montantHT),
    montantTVA: roundMoney(totals.montantTVA),
    montantTTC: roundMoney(totals.montantTTC),
  };
}

export const RuntimeInterventionTotalsService = {
  async syncInterventionTotals({
    interventionId,
  }: SyncInterventionTotalsParams): Promise<InterventionTotals | null> {
    const normalizedInterventionId =
      String(interventionId ?? "").trim();

    if (!normalizedInterventionId) {
      return null;
    }

    const lineModule =
      getModule("lignesinterventionauto");

    const interventionModule =
      getModule("interventionsauto");

    if (!lineModule || !interventionModule) {
      return null;
    }

    const lines =
      await RuntimeDataBinding.list(lineModule);

    const interventionLines =
      lines.filter(
        (line) =>
          asText(line.interventionId) === normalizedInterventionId
      );

    const totals =
      roundTotals(
        computeTotals(interventionLines)
      );

    const intervention =
      await RuntimeDataBinding.detail(
        interventionModule,
        normalizedInterventionId
      );

    if (!intervention) {
      return totals;
    }

    await RuntimeDataBinding.update(
      interventionModule,
      normalizedInterventionId,
      {
        ...intervention,
        coutPieces: totals.coutPieces,
        coutMainOeuvre: totals.coutMainOeuvre,
        coutTotal: totals.coutTotal,

        // Nouveaux montants propres pour facturation.
        montantHT: totals.montantHT,
        montantTVA: totals.montantTVA,
        montantTTC: totals.montantTTC,

        updatedAt: new Date().toISOString(),
      }
    );

    return totals;
  },
};
