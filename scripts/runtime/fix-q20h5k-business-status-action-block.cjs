const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q20h5k-business-status-action-block`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q20h5k-business-status-action-block`);
}

let content = fs.readFileSync(file, "utf8");

const startMarker = `  function getBusinessStatusAction() {`;
const endMarker = `  async function handleBusinessStatusAction() {`;

const start = content.indexOf(startMarker);
const end = content.indexOf(endMarker);

if (start === -1 || end === -1 || end <= start) {
  console.error("[ERROR] Could not locate getBusinessStatusAction block.");
  process.exit(1);
}

const cleanBlock = `  function getBusinessStatusAction() {
    if (mode !== "edit") {
      return null;
    }

    const moduleKey = module.metadata.key;
    const currentStatus = String(formValues.statut ?? "");

    if (moduleKey === "clientsauto" && currentStatus !== "archive") {
      return {
        label: "Archiver client",
        nextStatus: "archive",
        confirmMessage:
          "Archiver ce client ? Il ne sera pas supprime et son historique sera conserve.",
      };
    }

    if (moduleKey === "vehicules" && currentStatus !== "archive") {
      return {
        label: "Archiver vehicule",
        nextStatus: "archive",
        confirmMessage:
          "Archiver ce vehicule ? Il ne sera pas supprime et son historique sera conserve.",
      };
    }

    const currentInvoiceStatus =
      String(formValues.statutFacture ?? "");

    if (
      moduleKey === "facturesauto" &&
      currentInvoiceStatus !== "annulee"
    ) {
      return {
        label: "Annuler facture",
        nextStatus: "annulee",
        statusField: "statutFacture",
        confirmMessage:
          "Annuler cette facture ? Les paiements, echeances et historiques seront conserves.",
      };
    }

    if (moduleKey === "encaissementsauto" && currentStatus !== "annule") {
      return {
        label: "Annuler encaissement",
        nextStatus: "annule",
        confirmMessage:
          "Annuler cet encaissement ? Le paiement restera conserve dans l'historique.",
      };
    }

    if (moduleKey === "echeancespaiementauto" && currentStatus !== "annulee") {
      return {
        label: "Annuler echeance",
        nextStatus: "annulee",
        confirmMessage:
          "Annuler cette echeance ? Elle restera conservee dans l'historique.",
      };
    }

    return null;
  }

`;

content =
  content.slice(0, start) +
  cleanBlock +
  content.slice(end);

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] getBusinessStatusAction block repaired safely.");
console.log("Next: pnpm build");