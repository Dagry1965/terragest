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

function main() {
  const file = p(
    "src",
    "runtime",
    "business-rules",
    "runtimeBusinessRules.ts"
  );

  backup(file, "q16c4a-intervention-invoice-totals");

  let content = read(file);

  const oldBlock = `      await RuntimeDataBinding
        .create(

          facturesModule,

          {

            numeroFacture:
              \`FAC-\${Date.now()}\`,

            dateFacture:
              new Date()
                .toISOString()
                .split("T")[0],

            clientId:
              payload.clientId,

            vehiculeId:
              payload.vehiculeId,

            interventionId:
              payload.id,

            montantHT:
              payload.coutTotal ?? 0,

            tva:
              18,

            statutPaiement:
              "en_attente"

          }

        );`;

  const newBlock = `      const interventionsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "interventionsauto"
        );

      const interventionId =
        String(
          payload.id ??
          payload._id ??
          ""
        );

      const persistedIntervention =
        interventionsModule && interventionId
          ? await RuntimeDataBinding.detail(
              interventionsModule,
              interventionId
            )
          : null;

      const intervention = {
        ...(persistedIntervention ?? {}),
        ...payload,
      };

      const existingFactures =
        await RuntimeDataBinding.list(
          facturesModule
        );

      const alreadyCreated =
        existingFactures.some(
          facture =>
            String(facture.interventionId ?? "") ===
              interventionId &&
            String(facture.statutFacture ?? "") !==
              "annulee"
        );

      if (alreadyCreated) {
        return;
      }

      const asNumber =
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

      const montantHT =
        roundMoney(
          asNumber(intervention.montantHT) ||
          asNumber(intervention.coutTotal)
        );

      const montantTVA =
        roundMoney(
          asNumber(intervention.montantTVA)
        );

      const tauxTVA =
        montantHT > 0 && montantTVA > 0
          ? roundMoney((montantTVA / montantHT) * 100)
          : 18;

      const montantTTC =
        roundMoney(
          asNumber(intervention.montantTTC) ||
          (
            montantHT +
            (
              montantTVA > 0
                ? montantTVA
                : montantHT * tauxTVA / 100
            )
          )
        );

      await RuntimeDataBinding
        .create(

          facturesModule,

          {

            numeroFacture:
              \`FAC-\${Date.now()}\`,

            dateFacture:
              new Date()
                .toISOString()
                .split("T")[0],

            statutFacture:
              "emise",

            clientId:
              intervention.clientId,

            vehiculeId:
              intervention.vehiculeId,

            interventionId,

            montantHT,

            tva:
              tauxTVA,

            montantTTC,

            montantPaye:
              0,

            resteAPayer:
              montantTTC,

            statutPaiement:
              "en_attente"

          }

        );`;

  content = replaceOnce(
    content,
    oldBlock,
    newBlock,
    "replace intervention invoice creation"
  );

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q16C4A_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester intervention terminée -> facture");
}

main();