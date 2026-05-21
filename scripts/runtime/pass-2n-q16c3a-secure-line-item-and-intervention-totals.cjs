/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file, suffix) {
  const target = `${file}.bak-${suffix}`;

  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[${label}] pattern introuvable`);
  }

  return content.replace(from, to);
}

function patchRuntimeLineItemEngine() {
  const file = p(
    "src",
    "runtime",
    "line-items",
    "RuntimeLineItemEngine.ts"
  );

  backup(file, "q16c3a-secure-price-snapshot");

  let content = read(file);

  const oldBlock = `    const quantity = toNumber(next.quantite, 1);
    const productPrice = getProductUnitPrice(product);

    const unitPriceHT =
      toNumber(
        next.prixUnitaireHT ?? next.prixUnitaire,
        productPrice ?? 0
      );

    const taxRate =
      toNumber(next.tauxTVA, toNumber(product?.tauxTVA, 18));

    const montantHT = quantity * unitPriceHT;
    const montantTVA = montantHT * taxRate / 100;
    const montantTTC = montantHT + montantTVA;`;

  const newBlock = `    const quantity = toNumber(next.quantite, 1);
    const productPrice = getProductUnitPrice(product);

    const currentUnitPrice =
      toNumber(
        next.prixUnitaireHT ?? next.prixUnitaire,
        Number.NaN
      );

    // Le produit porte le prix de référence.
    // Si le formulaire transmet 0/vide par défaut, on prend le prix produit.
    // Si un prix manuel positif existe, on le conserve comme snapshot volontaire.
    const unitPriceHT =
      Number.isFinite(currentUnitPrice) && currentUnitPrice > 0
        ? currentUnitPrice
        : productPrice ?? 0;

    const productTaxRate =
      toNumber(product?.tauxTVA, 18);

    const currentTaxRate =
      toNumber(next.tauxTVA, Number.NaN);

    const taxRate =
      Number.isFinite(currentTaxRate) && currentTaxRate >= 0
        ? currentTaxRate
        : productTaxRate;

    const montantHT =
      Math.round(quantity * unitPriceHT * 100) / 100;

    const montantTVA =
      Math.round((montantHT * taxRate / 100) * 100) / 100;

    const montantTTC =
      Math.round((montantHT + montantTVA) * 100) / 100;`;

  if (content.includes(oldBlock)) {
    content = content.replace(oldBlock, newBlock);
  } else if (!content.includes("Le produit porte le prix de référence")) {
    throw new Error("[RuntimeLineItemEngine] bloc prix introuvable");
  }

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function patchRuntimeInterventionTotalsService() {
  const file = p(
    "src",
    "runtime",
    "interventions",
    "RuntimeInterventionTotalsService.ts"
  );

  backup(file, "q16c3a-ht-tva-ttc-totals");

  const content = `import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
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

function isCancelled(line: RuntimeRecord): boolean {
  return asText(line.statut) === "annulee";
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
      if (isCancelled(line)) {
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
`;

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function main() {
  console.log("");
  console.log("[PASS] 2N-Q16C3A - Secure line item snapshots and intervention totals");

  patchRuntimeLineItemEngine();
  patchRuntimeInterventionTotalsService();

  console.log("");
  console.log("[Q16C3A_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester ligne intervention -> produit -> quantite -> sauvegarde -> totaux intervention");
}

main();