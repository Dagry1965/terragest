const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const root = "C:\\Users\\Admin\\terragest";
const passName = "BILLING-MODEL-D-D3-D";

const interventionIds = [
  "billing-dd1-intervention",
  "billing-dd2-intervention",
];

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;

    const i = t.indexOf("=");
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");

    if (!process.env[k]) process.env[k] = v;
  }
}

function asNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string") {
    const parsed = Number(value.replace(",", ".").trim());
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function money(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

async function main() {
  loadEnvLocal();

  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    process.env.GCLOUD_PROJECT;

  if (!projectId) throw new Error("Missing Firebase project id");

  if (!admin.apps.length) {
    admin.initializeApp({ projectId });
  }

  const db = admin.firestore();

  console.log(`[${passName}] Project: ${projectId}`);

  const results = [];

  for (const interventionId of interventionIds) {
    const interventionDoc = await db
      .collection("interventionsauto")
      .doc(interventionId)
      .get();

    if (!interventionDoc.exists) {
      results.push({
        interventionId,
        status: "SKIP_INTERVENTION_NOT_FOUND",
      });
      continue;
    }

    const intervention = {
      id: interventionDoc.id,
      ...interventionDoc.data(),
    };

    const factureSnap = await db
      .collection("facturesauto")
      .where("interventionId", "==", interventionId)
      .get();

    const activeFactures = factureSnap.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((facture) => String(facture.statutFacture ?? "") !== "annulee");

    if (activeFactures.length !== 1) {
      results.push({
        interventionId,
        status: "SKIP_EXPECTED_ONE_ACTIVE_FACTURE",
        factures: activeFactures.length,
      });
      continue;
    }

    const facture = activeFactures[0];
    const factureId = facture.id;

    const existingLinesSnap = await db
      .collection("lignesfactureauto")
      .where("factureId", "==", factureId)
      .get();

    if (!existingLinesSnap.empty) {
      results.push({
        interventionId,
        factureId,
        status: "SKIP_LINES_ALREADY_EXIST",
        existingLines: existingLinesSnap.size,
      });
      continue;
    }

    const sourceLinesSnap = await db
      .collection("lignesinterventionauto")
      .where("interventionId", "==", interventionId)
      .get();

    const sourceLines = sourceLinesSnap.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((line) => {
        const removedAt = String(line.removedAt ?? "").trim();
        const statutLigne = String(line.statutLigne ?? line.statut ?? "");
        return !removedAt && statutLigne !== "annulee" && statutLigne !== "retiree";
      });

    const batch = db.batch();
    let created = 0;

    for (const line of sourceLines) {
      const lineMontantHT = money(
        asNumber(line.montantHT) ||
        asNumber(line.totalHT) ||
        asNumber(line.montant)
      );

      const lineTauxTVA =
        asNumber(line.tauxTVA) ||
        asNumber(line.tva) ||
        asNumber(facture.tva) ||
        18;

      const lineMontantTVA = money(
        asNumber(line.montantTVA) ||
        (lineMontantHT > 0 ? lineMontantHT * lineTauxTVA / 100 : 0)
      );

      const lineMontantTTC = money(
        asNumber(line.montantTTC) ||
        asNumber(line.montantTotal) ||
        (lineMontantHT + lineMontantTVA)
      );

      const invoiceLineId = `repair-${factureId}-${line.id}`;

      batch.set(
        db.collection("lignesfactureauto").doc(invoiceLineId),
        {
          factureId,

          parentModuleKey: "facturesauto",
          parentRecordId: factureId,
          parentForeignKey: "factureId",

          designation: String(
            line.designation ??
            line.produitNom ??
            line.libelle ??
            line.nom ??
            "Ligne intervention"
          ),

          description: String(
            line.description ??
            line.observations ??
            ""
          ),

          quantite: asNumber(line.quantite) || 1,

          prixUnitaireHT:
            asNumber(line.prixUnitaireHT) ||
            asNumber(line.prixUnitaire) ||
            lineMontantHT,

          montantHT: lineMontantHT,
          tauxTVA: lineTauxTVA,
          montantTVA: lineMontantTVA,
          montantTTC: lineMontantTTC,

          statutLigne: "validee",

          sourceType: "atelier",
          sourceModule: "lignesinterventionauto",
          sourceRecordId: interventionId,
          sourceLineId: line.id,

          clientId: intervention.clientId ?? line.clientId,
          vehiculeId: intervention.vehiculeId ?? line.vehiculeId,
          interventionId,
          ...(line.produitId ? { produitId: line.produitId } : {}),

          tenantId: intervention.tenantId ?? facture.tenantId,
          workspace: intervention.workspace ?? facture.workspace ?? "amarkhys",
          userId: intervention.userId ?? facture.userId,

          billingModelRepairScenario: "D-D3-D",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      created++;
    }

    await batch.commit();

    results.push({
      interventionId,
      factureId,
      status: "REPAIRED",
      sourceLines: sourceLines.length,
      createdLines: created,
    });
  }

  console.table(results);

  const reportPath = path.join(
    root,
    "docs",
    "audits",
    "BILLING-MODEL-D-D3-D-repair-missing-invoice-lines.md"
  );

  let report = "# BILLING-MODEL-D-D3-D — Réparation lignes facture manquantes\n\n";

  report += "## Objectif\n\n";
  report += "Créer uniquement les lignes facture manquantes pour les scénarios D-D1 et D-D2, sans recréer les factures existantes.\n\n";

  report += "## Résultat\n\n";
  for (const item of results) {
    report += `- ${item.interventionId}: ${item.status}`;
    if (item.factureId) report += ` / factureId=${item.factureId}`;
    if (item.createdLines !== undefined) report += ` / lignes créées=${item.createdLines}`;
    report += "\n";
  }

  report += "\n## Garde-fous\n\n";
  report += "- Aucune facture n'est créée par cette passe.\n";
  report += "- Les lignes sont créées uniquement si une facture active unique existe.\n";
  report += "- Les lignes existantes ne sont pas dupliquées.\n";
  report += "- Chaque ligne facture reçoit le contexte parent `facturesauto`.\n";

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, report, "utf8");

  console.log(`[${passName}] Report: ${path.relative(root, reportPath)}`);
}

main().catch((error) => {
  console.error(`[${passName}] FAIL`, error);
  process.exit(1);
});
