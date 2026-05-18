const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

/**
 * 1) Ajouter facturesauto dans getBusinessStatusAction().
 * Pour facture, on lit statutFacture et non statut.
 */
if (!content.includes('moduleKey === "facturesauto"')) {
  const marker = `    if (moduleKey === "encaissementsauto" && currentStatus !== "annule") {`;

  const block = `    const currentInvoiceStatus =
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
          "Annuler cette facture ? Les paiements, échéances et historiques seront conservés.",
      };
    }

`;

  if (!content.includes(marker)) {
    console.error("encaissementsauto marker not found");
    process.exit(1);
  }

  content = content.replace(marker, block + marker);
}

/**
 * 2) Faire utiliser statusField si fourni.
 * Les autres actions continuent à utiliser statut.
 */
content = content.replace(
  `        {
          statut: action.nextStatus,
        }`,
  `        {
          [action.statusField ?? "statut"]: action.nextStatus,
        }`
);

content = content.replace(
  `        statut: action.nextStatus,`,
  `        [action.statusField ?? "statut"]: action.nextStatus,`
);

if (content === before) {
  console.log("NO CHANGE");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED ERPEnterpriseForm cancel invoice business action");