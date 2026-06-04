const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "runtime",
  "business-rules",
  "runtimeBusinessRules.ts"
);

const reportPath = path.join(
  root,
  "docs",
  "audits",
  "BILLING-MODEL-D-B-create-invoice-lines-from-intervention-lines.md"
);

const passName = "BILLING-MODEL-D-B";

function fail(message) {
  console.error(`[${passName}] FAIL: ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[${passName}] OK: ${message}`);
}

if (!fs.existsSync(target)) {
  fail(`Target not found: ${target}`);
}

let source = fs.readFileSync(target, "utf8");

const backup = `${target}.bak-billing-model-d-b-create-invoice-lines`;
if (!fs.existsSync(backup)) {
  fs.writeFileSync(backup, source, "utf8");
  ok(`Backup created: ${backup}`);
}

const ruleStart = source.indexOf('payload.statut ===\n        "terminee"');
if (ruleStart === -1) {
  fail('Could not find intervention completed rule marker: payload.statut === "terminee"');
}

const ruleEnd = source.indexOf('RuntimeMetrics.increment(', ruleStart);
if (ruleEnd === -1) {
  fail("Could not find RuntimeMetrics.increment marker after invoice creation.");
}

let rule = source.slice(ruleStart, ruleEnd);

if (rule.includes('module.metadata.key ===\n              "lignesfactureauto"')) {
  ok("Invoice lines logic already appears to be installed. Nothing changed.");
} else {
  const interventionsModuleBlock = `      const interventionsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "interventionsauto"
        );
`;

  const modulesInsertion = `      const interventionsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "interventionsauto"
        );

      const lignesInterventionModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "lignesinterventionauto"
        );

      const lignesFactureModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "lignesfactureauto"
        );
`;

  if (!rule.includes(interventionsModuleBlock)) {
    fail("Could not find interventionsModule block to add invoice line modules.");
  }

  rule = rule.replace(interventionsModuleBlock, modulesInsertion);

  const createStartMarker = `      await RuntimeDataBinding
        .create(

          facturesModule,

          {

            numeroFacture:
              \`FAC-\${Date.now()}\`,`;

  if (!rule.includes(createStartMarker)) {
    fail("Could not find invoice create block marker.");
  }

  const invoiceNumberInsertion = `      const numeroFacture =
        \`FAC-\${Date.now()}\`;

      const createdFacture =
        await RuntimeDataBinding
        .create(

          facturesModule,

          {

            numeroFacture,`;

  rule = rule.replace(createStartMarker, invoiceNumberInsertion);

  const createEndMarker = `            statutPaiement:
              "en_attente"

          }

        );
`;

  const afterCreateInsertion = `            statutPaiement:
              "en_attente",

            typeFacture:
              "atelier",

            sourceScope:
              "single",

            sourceType:
              "atelier",

            sourceModule:
              "interventionsauto",

            sourceRecordId:
              interventionId,

            sourceLabel:
              String(
                intervention.numeroIntervention ??
                intervention.code ??
                intervention.titre ??
                interventionId
              )

          }

        );

      const createdFactureId =
        String(
          (createdFacture as any)?.id ??
          (createdFacture as any)?._id ??
          (createdFacture as any)?.recordId ??
          (createdFacture as any)?.docId ??
          ""
        );

      let factureIdForLines =
        createdFactureId;

      if (
        !factureIdForLines
      ) {
        const refreshedFactures =
          await RuntimeDataBinding.list(
            facturesModule
          );

        const createdFromList =
          refreshedFactures.find(
            facture =>
              String(facture.numeroFacture ?? "") ===
                numeroFacture ||
              (
                String(facture.interventionId ?? "") ===
                  interventionId &&
                String(facture.statutFacture ?? "") !==
                  "annulee"
              )
          );

        factureIdForLines =
          String(
            createdFromList?.id ??
            createdFromList?._id ??
            ""
          );
      }

      if (
        factureIdForLines &&
        lignesInterventionModule &&
        lignesFactureModule &&
        interventionId
      ) {
        const lignesIntervention =
          await RuntimeDataBinding.list(
            lignesInterventionModule
          );

        const lignesFacturables =
          lignesIntervention.filter(
            ligne => {
              const lineInterventionId =
                String(ligne.interventionId ?? "");

              const removedAt =
                String(ligne.removedAt ?? "").trim();

              const statutLigne =
                String(
                  ligne.statutLigne ??
                  ligne.statut ??
                  ""
                );

              return (
                lineInterventionId === interventionId &&
                !removedAt &&
                statutLigne !== "annulee" &&
                statutLigne !== "retiree"
              );
            }
          );

        for (
          const ligne of lignesFacturables
        ) {
          const lineMontantHT =
            roundMoney(
              asNumber(ligne.montantHT) ||
              asNumber(ligne.totalHT) ||
              asNumber(ligne.montant)
            );

          const lineTauxTVA =
            asNumber(ligne.tauxTVA) ||
            asNumber(ligne.tva) ||
            tauxTVA;

          const lineMontantTVA =
            roundMoney(
              asNumber(ligne.montantTVA) ||
              (
                lineMontantHT > 0
                  ? lineMontantHT * lineTauxTVA / 100
                  : 0
              )
            );

          const lineMontantTTC =
            roundMoney(
              asNumber(ligne.montantTTC) ||
              asNumber(ligne.montantTotal) ||
              (
                lineMontantHT +
                lineMontantTVA
              )
            );

          await RuntimeDataBinding.create(
            lignesFactureModule,
            {
              factureId:
                factureIdForLines,

              designation:
                String(
                  ligne.designation ??
                  ligne.produitNom ??
                  ligne.libelle ??
                  ligne.nom ??
                  "Ligne intervention"
                ),

              description:
                String(
                  ligne.description ??
                  ligne.observations ??
                  ""
                ),

              quantite:
                asNumber(ligne.quantite) || 1,

              prixUnitaireHT:
                asNumber(ligne.prixUnitaireHT) ||
                asNumber(ligne.prixUnitaire) ||
                lineMontantHT,

              montantHT:
                lineMontantHT,

              tauxTVA:
                lineTauxTVA,

              montantTVA:
                lineMontantTVA,

              montantTTC:
                lineMontantTTC,

              statutLigne:
                "validee",

              sourceType:
                "atelier",

              sourceModule:
                "lignesinterventionauto",

              sourceRecordId:
                interventionId,

              sourceLineId:
                String(
                  ligne.id ??
                  ligne._id ??
                  ""
                ),

              clientId:
                intervention.clientId ??
                ligne.clientId,

              vehiculeId:
                intervention.vehiculeId ??
                ligne.vehiculeId,

              interventionId,

              produitId:
                ligne.produitId,

              tenantId:
                intervention.tenantId ??
                payload.tenantId,

              workspace:
                intervention.workspace ??
                payload.workspace ??
                "amarkhys"
            }
          );
        }
      }
`;

  if (!rule.includes(createEndMarker)) {
    fail("Could not find invoice create end marker.");
  }

  rule = rule.replace(createEndMarker, afterCreateInsertion);

  source = source.slice(0, ruleStart) + rule + source.slice(ruleEnd);

  fs.writeFileSync(target, source, "utf8");

  ok("Installed invoice line creation after automatic invoice creation.");
}

let report = "# BILLING-MODEL-D-B — Création des lignes facture depuis lignes intervention\n\n";
report += "## Résultat\n\n";
report += "- Le flux `intervention terminée → facture` dans `runtimeBusinessRules.ts` est renforcé.\n";
report += "- Après création de `facturesauto`, le runtime tente de récupérer l'identifiant de la facture créée.\n";
report += "- Les lignes `lignesinterventionauto` sont filtrées strictement par `interventionId`.\n";
report += "- Une ligne `lignesfactureauto` est créée par ligne intervention facturable.\n";
report += "- Aucun fallback global n'est introduit.\n\n";
report += "## Garde-fous\n\n";
report += "- Si `factureIdForLines` est introuvable, aucune ligne facture n'est créée.\n";
report += "- Si `lignesinterventionauto` ou `lignesfactureauto` est absent du registry, aucune ligne facture n'est créée.\n";
report += "- Les lignes retirées ou annulées sont ignorées.\n";
report += "- L'anti-doublon facture existant reste conservé.\n\n";
report += "## Prochaine étape\n\n";
report += "BILLING-MODEL-D-C : build, audit statique ciblé, puis test fonctionnel sur intervention terminée.\n";

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

ok(`Report written: ${path.relative(root, reportPath)}`);
ok("Next: run npm run build.");
