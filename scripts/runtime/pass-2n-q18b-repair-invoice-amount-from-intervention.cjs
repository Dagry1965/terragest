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

function replaceAll(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[${label}] pattern introuvable`);
  }

  return content.split(from).join(to);
}

function main() {
  const file = p(
    "src",
    "runtime",
    "business-rules",
    "runtimeBusinessRules.ts"
  );

  backup(file, "q18b-repair-invoice-amount-from-intervention");

  let content = read(file);

  const oldModuleBlock = `      const encaissementsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "encaissementsauto"
        );

      if (
        !facturesModule ||
        !encaissementsModule
      ) {
        return;
      }`;

  const newModuleBlock = `      const encaissementsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "encaissementsauto"
        );

      const interventionsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "interventionsauto"
        );

      if (
        !facturesModule ||
        !encaissementsModule
      ) {
        return;
      }`;

  content = replaceAll(
    content,
    oldModuleBlock,
    newModuleBlock,
    "add interventionsModule in encaissement recompute rules"
  );

  const oldAmountBlock = `      const encaissements =
        await RuntimeDataBinding.list(
          encaissementsModule
        );`;

  const newAmountBlock = `      const asRuntimeNumber =
        (value: unknown): number => {
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
        };

      const roundMoney =
        (value: number): number =>
          Math.round(value * 100) / 100;

      const linkedIntervention =
        interventionsModule &&
        facture.interventionId
          ? await RuntimeDataBinding.detail(
              interventionsModule,
              String(facture.interventionId)
            )
          : null;

      const invoiceMontantHT =
        asRuntimeNumber(facture.montantHT);

      const invoiceMontantTVA =
        asRuntimeNumber(facture.montantTVA);

      const invoiceMontantTTC =
        asRuntimeNumber(
          facture.montantTTC ??
          facture.totalTTC ??
          facture.montantTotal ??
          facture.total
        );

      const interventionMontantHT =
        asRuntimeNumber(
          linkedIntervention?.montantHT ??
          linkedIntervention?.coutTotal
        );

      const interventionMontantTVA =
        asRuntimeNumber(
          linkedIntervention?.montantTVA
        );

      const interventionMontantTTC =
        asRuntimeNumber(
          linkedIntervention?.montantTTC
        );

      const repairedMontantHT =
        roundMoney(
          invoiceMontantHT > 0
            ? invoiceMontantHT
            : interventionMontantHT
        );

      const repairedMontantTVA =
        roundMoney(
          invoiceMontantTVA > 0
            ? invoiceMontantTVA
            : interventionMontantTVA
        );

      const repairedMontantTTC =
        roundMoney(
          invoiceMontantTTC > 0
            ? invoiceMontantTTC
            : interventionMontantTTC > 0
              ? interventionMontantTTC
              : repairedMontantHT + repairedMontantTVA
        );

      const repairedTVARate =
        repairedMontantHT > 0 && repairedMontantTVA > 0
          ? roundMoney(
              repairedMontantTVA /
              repairedMontantHT *
              100
            )
          : asRuntimeNumber(facture.tva) || 18;

      const encaissements =
        await RuntimeDataBinding.list(
          encaissementsModule
        );`;

  content = replaceAll(
    content,
    oldAmountBlock,
    newAmountBlock,
    "insert invoice amount repair before encaissement list"
  );

  const oldMontantTTCBlock = `      const montantTTC =
        Number(
          facture.montantTTC ??
          facture.totalTTC ??
          facture.montantTotal ??
          facture.total ??
          0
        );`;

  const newMontantTTCBlock = `      const montantTTC =
        repairedMontantTTC;`;

  content = replaceAll(
    content,
    oldMontantTTCBlock,
    newMontantTTCBlock,
    "replace montantTTC with repaired amount"
  );

  const oldUpdatePayload = `        {
          montantPaye,
          resteAPayer,
          statutPaiement,
          dernierEncaissementAt:
            new Date().toISOString(),
        }`;

  const newUpdatePayload = `        {
          montantHT:
            repairedMontantHT,

          montantTVA:
            repairedMontantTVA,

          tva:
            repairedTVARate,

          montantTTC:
            repairedMontantTTC,

          montantPaye,
          resteAPayer,
          statutPaiement,
          dernierEncaissementAt:
            new Date().toISOString(),
        }`;

  content = replaceAll(
    content,
    oldUpdatePayload,
    newUpdatePayload,
    "persist repaired invoice amounts"
  );

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q18B_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  refaire le test facture avec montantTTC à 0 mais intervention liée");
}

main();